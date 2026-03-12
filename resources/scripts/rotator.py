#!/usr/bin/env python3
"""
rotator.py — Ambisonic Rotator (Dual Mode)

MODE A — Offline File Render (legacy, used by AmbiRotate export handler):
  rotator.py <input.wav> <output.wav> --yaw <deg> --pitch <deg> --roll <deg>

MODE B — Streaming Pipe (new, used by OBR live-preview pipeline):
  rotator.py --channels <N> --yaw <deg> --pitch <deg> --roll <deg>
  stdin  → interleaved Float32 PCM (f32le, multi-channel ambisonic)
  stdout → interleaved Float32 PCM (f32le, same layout, rotated)

The mode is detected automatically:
  - If positional args `input` and `output` are present → MODE A (file)
  - Otherwise                                           → MODE B (streaming)
"""

import sys
import os
import argparse
import numpy as np
from scipy.spatial.transform import Rotation
from scipy.special import sph_harm

# ──────────────────────────────────────────────────────────────────────────────
# Spherical Harmonic Rotation (Real ACN/SN3D)
# Based on Ivanic & Ruedenberg (1996, 1998) — Point Projection Method
# ──────────────────────────────────────────────────────────────────────────────

def compute_sh_matrix(N, points):
    """Compute Real SH (ACN/SN3D) for N orders at given unit-sphere points (K×3).
    Returns shape (K, (N+1)^2).
    """
    K = len(points)
    num_coeffs = (N + 1) ** 2
    Y = np.zeros((K, num_coeffs))

    r = np.linalg.norm(points, axis=1)
    r[r == 0] = 1.0
    z = np.clip(points[:, 2] / r, -1, 1)
    phi   = np.arccos(z)
    theta = np.arctan2(points[:, 1], points[:, 0])

    idx = 0
    for l in range(N + 1):
        for m in range(-l, l + 1):
            y_c = sph_harm(m, l, theta, phi)
            if m == 0:
                val = np.real(y_c)
            elif m > 0:
                val = np.sqrt(2) * np.real(y_c)
            else:
                val = np.sqrt(2) * np.imag(y_c)
            val = val / np.sqrt(2 * l + 1)  # N3D → SN3D
            Y[:, idx] = val
            idx += 1
    return Y


def get_rotation_matrix_for_order(order, R_mat_3x3):
    """Build the (order+1)^2 × (order+1)^2 SH rotation matrix via point projection."""
    N = order
    num_coeffs = (N + 1) ** 2
    K = 2 * num_coeffs

    indices = np.arange(K, dtype=float) + 0.5
    phi_f   = np.arccos(1 - 2 * indices / K)
    theta_f = np.pi * (1 + 5 ** 0.5) * indices

    x = np.sin(phi_f) * np.cos(theta_f)
    y = np.sin(phi_f) * np.sin(theta_f)
    z = np.cos(phi_f)
    points = np.stack([x, y, z], axis=1)

    Y     = compute_sh_matrix(N, points)
    r_inv = Rotation.from_matrix(R_mat_3x3.T)
    Y_rot = compute_sh_matrix(N, r_inv.apply(points))

    M = np.linalg.pinv(Y) @ Y_rot
    return M.astype(np.float32)


def build_rotation_matrix(channels, yaw, pitch, roll):
    """Determine order from channel count and return the SH rotation matrix."""
    sqrt_ch = np.sqrt(channels)
    if float(sqrt_ch) == int(sqrt_ch):
        order = int(sqrt_ch) - 1
        used_channels = channels
    else:
        order = int(np.floor(sqrt_ch)) - 1
        used_channels = (order + 1) ** 2

    if order < 0:
        raise ValueError(f"Channel count {channels} yields order < 0")

    # ZYX intrinsic Euler: yaw=Z, pitch=Y, roll=X
    r = Rotation.from_euler('zyx', [yaw, pitch, roll], degrees=True)
    R_mat = r.as_matrix()
    M = get_rotation_matrix_for_order(order, R_mat)
    return M, order, used_channels


# ──────────────────────────────────────────────────────────────────────────────
# MODE A: File-based offline render (legacy / export)
# ──────────────────────────────────────────────────────────────────────────────

def run_file_mode(input_path, output_path, yaw, pitch, roll):
    import soundfile as sf

    with sf.SoundFile(input_path) as infile:
        sr         = infile.samplerate
        subtype    = infile.subtype
        channels   = infile.channels
        total_frames = infile.frames

        M, order, used_channels = build_rotation_matrix(channels, yaw, pitch, roll)

        blocksize = 8192
        with sf.SoundFile(output_path, 'w', samplerate=sr, channels=channels, subtype=subtype) as outfile:
            processed = 0
            for block in infile.blocks(blocksize=blocksize, always_2d=True):
                proc = block[:, :used_channels]
                out  = proc @ M.T

                if used_channels < channels:
                    pad = block[:, used_channels:]
                    out = np.hstack([out, pad])

                outfile.write(out)
                processed += len(block)

                if total_frames > 0:
                    pct = int((processed / total_frames) * 100)
                    print(f"PROGRESS: {pct}")
                    sys.stdout.flush()

    print(f"Success. Rotated Order {order}.")


# ──────────────────────────────────────────────────────────────────────────────
# MODE B: Streaming pipe  (Dec → rotator → OBR → Enc)
# ──────────────────────────────────────────────────────────────────────────────

BLOCK_SIZE = 512  # must match obr_stream kBlockSize


def run_stream_mode(channels, yaw, pitch, roll):
    # ── Identity fast-path ─────────────────────────────────────────────────
    if yaw == 0.0 and pitch == 0.0 and roll == 0.0:
        try:
            chunk = channels * BLOCK_SIZE * 4  # bytes
            in_buf  = sys.stdin.buffer
            out_buf = sys.stdout.buffer
            while True:
                data = in_buf.read(chunk)
                if not data:
                    break
                out_buf.write(data)
            out_buf.flush()
        except BrokenPipeError:
            pass
        return

    M, order, used_channels = build_rotation_matrix(channels, yaw, pitch, roll)

    sys.stderr.write(
        f"[rotator] Streaming: order={order}, ch={channels}, used={used_channels}, "
        f"yaw={yaw}, pitch={pitch}, roll={roll}\n"
    )
    sys.stderr.flush()

    if sys.platform == "win32":
        import msvcrt
        msvcrt.setmode(sys.stdin.fileno(),  0x8000)  # _O_BINARY
        msvcrt.setmode(sys.stdout.fileno(), 0x8000)

    in_buf  = sys.stdin.buffer
    out_buf = sys.stdout.buffer
    bytes_per_block = channels * BLOCK_SIZE * 4  # float32

    try:
        while True:
            raw = in_buf.read(bytes_per_block)
            if not raw:
                break

            n_floats = len(raw) // 4
            n_frames = n_floats // channels
            if n_frames == 0:
                break

            block = np.frombuffer(
                raw[: n_frames * channels * 4], dtype=np.float32
            ).reshape(n_frames, channels)

            rotated = block[:, :used_channels] @ M.T

            if used_channels < channels:
                out_block = block.copy()
                out_block[:, :used_channels] = rotated
            else:
                out_block = rotated

            out_buf.write(out_block.astype(np.float32).tobytes())

        out_buf.flush()
    except BrokenPipeError:
        pass  # Normal: downstream closed its stdin (e.g. obr_stream exited)


# ──────────────────────────────────────────────────────────────────────────────
# Entry Point
# ──────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Ambisonic Rotator — file mode or streaming pipe mode"
    )
    # Positional args for file mode (optional)
    parser.add_argument("input",  nargs="?", default=None, help="[file mode] Input WAV path")
    parser.add_argument("output", nargs="?", default=None, help="[file mode] Output WAV path")
    # Shared rotation args
    parser.add_argument("--yaw",      type=float, default=0,  help="Yaw in degrees (Z-axis)")
    parser.add_argument("--pitch",    type=float, default=0,  help="Pitch in degrees (Y-axis)")
    parser.add_argument("--roll",     type=float, default=0,  help="Roll in degrees (X-axis)")
    # Streaming-mode only
    parser.add_argument("--channels", type=int,   default=4,
                        help="[stream mode] Ambisonic channel count (4, 9, 16, 25)")

    args = parser.parse_args()

    if args.input and args.output:
        # MODE A: file-based offline render
        run_file_mode(args.input, args.output, args.yaw, args.pitch, args.roll)
    else:
        # MODE B: streaming stdin→stdout
        run_stream_mode(args.channels, args.yaw, args.pitch, args.roll)


if __name__ == "__main__":
    main()

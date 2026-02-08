import sys
import os
import argparse
import numpy as np
import soundfile as sf
from scipy.spatial.transform import Rotation
from scipy.special import sph_harm

# --------------------------------------------------------------------------------
# Recursive Wigner-D (Real Spherical Harmonics)
# Based on Ivanic and Ruedenberg (1996, 1998)
# --------------------------------------------------------------------------------

def compute_sh_matrix(N, points):
    """
    Compute Real SH (ACN/SN3D) for N orders at given points (K x 3).
    Returns (K, (N+1)^2).
    """
    K = len(points)
    num_coeffs = (N+1)**2
    Y = np.zeros((K, num_coeffs))
    
    # Convert points to spherical
    r = np.linalg.norm(points, axis=1)
    # Safety for r=0
    r[r==0] = 1.0 
    
    z = points[:, 2] / r
    z = np.clip(z, -1, 1)
    phi = np.arccos(z) # Polar: 0 to pi
    
    theta = np.arctan2(points[:, 1], points[:, 0]) # Azimuthal: -pi to pi
    
    # Loop over l, m
    idx = 0
    for l in range(N + 1):
        for m in range(-l, l + 1):
            # Compute Complex SH via Scipy
            # sph_harm(m, n, azimuthal, polar)
            y_c = sph_harm(m, l, theta, phi)
            
            # Convert to Real (SN3D)
            # ACN/SN3D Definition:
            # m > 0: sqrt(2) * Re(Y_lm)
            # m < 0: sqrt(2) * Im(Y_lm)
            # m = 0: Y_lm (Real)
            
            if m == 0:
                val = np.real(y_c)
            elif m > 0:
                val = np.sqrt(2) * np.real(y_c) 
            else: # m < 0
                val = np.sqrt(2) * np.imag(y_c)
                
            # Normalize N3D -> SN3D
            # Scipy sph_harm is N3D (Orthonormal)
            # SN3D = N3D / sqrt(2*l + 1)
            val = val / np.sqrt(2*l + 1)
            
            Y[:, idx] = val
            idx += 1
            
    return Y

def get_rotation_matrix_for_order(order, R_mat_3x3):
    """
    Generate (order+1)^2 x (order+1)^2 rotation matrix using the Point Projection method.
    """
    N = order
    num_coeffs = (N+1)**2
    
    # 1. Generate Sampling Points (Fibonacci Sphere-ish)
    # Need K >= num_coeffs. Use 2 * num_coeffs for stability.
    K = 2 * num_coeffs
    
    indices = np.arange(0, K, dtype=float) + 0.5
    phi = np.arccos(1 - 2*indices/K) # Polar angle (0..pi)
    theta = np.pi * (1 + 5**0.5) * indices # Azimuthal (0..2pi)
    
    # Points on sphere
    x = np.sin(phi) * np.cos(theta)
    y = np.sin(phi) * np.sin(theta)
    z = np.cos(phi)
    
    points = np.stack([x, y, z], axis=1) # K x 3
    
    # 2. Compute Y matrix (Base) at points
    Y = compute_sh_matrix(N, points)
    
    # 3. Rotate Points Inverse
    r_inv = Rotation.from_matrix(R_mat_3x3.T)
    points_lookup = r_inv.apply(points)

    Y_rot = compute_sh_matrix(N, points_lookup)
    
    # 4. Solve M
    M = np.linalg.pinv(Y) @ Y_rot
    
    return M

# --------------------------------------------------------------------------------
# Main Processing
# --------------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Rotate Ambisonic File (Arbitrary Order)")
    parser.add_argument("input", help="Input WAV file")
    parser.add_argument("output", help="Output WAV file")
    parser.add_argument("--yaw", type=float, default=0, help="Yaw in degrees")
    parser.add_argument("--pitch", type=float, default=0, help="Pitch in degrees")
    parser.add_argument("--roll", type=float, default=0, help="Roll in degrees")
    
    args = parser.parse_args()
    
    # 1. Open Input and Determine Info
    try:
        with sf.SoundFile(args.input) as infile:
            sr = infile.samplerate
            subtype = infile.subtype
            channels = infile.channels
            total_frames = infile.frames
            
            # 2. Determine Order
            sqrt_ch = np.sqrt(channels)
            if not sqrt_ch.is_integer():
                # Fallback for non-square channel counts
                order = int(np.floor(np.sqrt(channels))) - 1
                used_channels = (order + 1)**2
            else:
                order = int(sqrt_ch) - 1
                used_channels = channels
                
            if order < 0:
                print("Error: Less than 1 channel?")
                sys.exit(1)

            # 3. Compute Rotation Matrix
            # ZYX intrinsic rotation
            r = Rotation.from_euler('zyx', [args.yaw, args.pitch, args.roll], degrees=True)
            R_mat_3x3 = r.as_matrix()
            
            # Generate SH Rotation Matrix
            M = get_rotation_matrix_for_order(order, R_mat_3x3)
            
            # 4. CHUNKED PROCESSING
            blocksize = 8192
            
            with sf.SoundFile(args.output, 'w', samplerate=sr, channels=channels, subtype=subtype) as outfile:
                processed_frames = 0
                
                # We need to read blocks using the same infile context
                for block in infile.blocks(blocksize=blocksize, always_2d=True):
                    # block is (frames, channels)
                    
                    # Apply Rotation
                    proc_audio = block[:, :used_channels]
                    out_audio = proc_audio @ M.T
                    
                    if used_channels < channels:
                        pad = block[:, used_channels:]
                        out_audio = np.hstack([out_audio, pad])
                        
                    outfile.write(out_audio)
                    
                    processed_frames += len(block)
                    if total_frames > 0:
                        progress = int((processed_frames / total_frames) * 100)
                        print(f"PROGRESS: {progress}")
                        sys.stdout.flush()

        print(f"Success. Rotated Order {order}. Preserved subtype: {subtype}")

    except Exception as e:
        print(f"Error processing wav: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

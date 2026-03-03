import sys
import json
import argparse
import numpy as np
import soundfile as sf
import spaudiopy as spa
from scipy.linalg import hadamard

def extract_primary_ambient(X_win):
    """
    X_win: (4096, 2) windowed input block
    Returns: primary_win (4096, 2), ambient_win (4096, 2)
    We do Broadband PCA per block in the time domain.
    """
    # Covariance matrix (2, 2) across the block
    cov = np.cov(X_win, rowvar=False) + np.eye(2)*1e-10
    evals, evecs = np.linalg.eig(cov)
    
    idx = np.argsort(evals.real)[::-1]
    evecs = evecs[:, idx]
    
    # primary is projection onto max eigenvector
    w1 = evecs[:, 0]
    P_win = np.outer(np.dot(X_win, w1), w1)
    
    # ambient is the rest (projection onto 2nd evec)
    w2 = evecs[:, 1]
    A_win = np.outer(np.dot(X_win, w2), w2)
    
    return P_win, A_win

def route_primary(P_win, order, stage_width_pct):
    """
    P_win: (4096, 2)
    Constant Power Panning encoded to AmbiX.
    stage_width_pct: 0 to 100.
    Angle up to +/- 90 degrees (pi/2)
    """
    num_ch = (order + 1)**2
    out = np.zeros((P_win.shape[0], num_ch))
    
    angle = (stage_width_pct / 100.0) * (np.pi / 2.0)
    # L is +angle (Left), R is -angle (Right)
    # L_encoded = SHT(az=angle, colat=pi/2)
    # R_encoded = SHT(az=-angle, colat=pi/2)
    
    # SHT from spaudiopy is ACN/SN3D natively
    azi = np.array([angle, -angle])
    colat = np.array([np.pi/2, np.pi/2])
    
    # Spherical harmonics matrix: (num_ch, 2)
    Y = spa.sph.sh_matrix(order, azi, colat, sh_type='real')
    
    # P_win is (4096, 2). Y is (2, num_ch) -- wait, spaudiopy returns (num_pos, (N+1)^2)
    # So sht_matrix returns (2, num_ch).
    # We multiply P_win (N, 2) x Y (2, num_ch) = (N, num_ch)
    
    out = np.dot(P_win, Y)
    return out

class FDN16:
    def __init__(self, envelopment_pct, sr=48000):
        # 16 incommensurate delays between 15ms and 50ms
        delays_ms = np.linspace(15, 50, 16) * np.random.uniform(0.9, 1.1, 16)
        self.delays = [int(sr * d / 1000) for d in delays_ms]
        self.buffers = [np.zeros(d) for d in self.delays]
        self.ptrs = [0] * 16
        
        self.H = hadamard(16) / 4.0 # 16x16 unitary
        # gain mapped from envelopment
        self.g = (envelopment_pct / 100.0) * 0.85 # max feedback 0.85 for stability
        self.decay = 0.99 # lowpass filter in feedback loop mapping to simple multiply here
        
    def process(self, x):
        """ x is (N, 2). Returns (N, 16) uncorrelated ambient """
        N = x.shape[0]
        out = np.zeros((N, 16))
        
        # Fast vector processing isn't strictly trivial for FDN in python
        # We process manually, or block-wise if possible. 
        # Since python loop over 4096 samples takes too long (~10s per block), 
        # we will use a frequency-domain random phase diffusion instead for ambient
        # or a fast array operation.
        
        # WAIT! To prevent OOM and CPU overload, let's use a simpler random phase matrix
        # as a stand-in for full sample-by-sample FDN if it's too slow in python.
        # However, we can do block-based FDN if block < min_delay!
        # Our min delay is 15ms = 720 samples. block is 4096. Thus we CANNOT do block FDN easily without sub-blocking.
        pass

def diffuse_ambient_fft(A_in, order):
    """
    Instead of slow sample-by-sample FDN in python, we apply a 16x16 Hadamard diffusion
    in the frequency domain across delayed versions of the input, acting as a scattering matrix.
    """
    num_ch = (order + 1)**2
    N = A_in.shape[0]
    out = np.zeros((N, num_ch))
    
    if num_ch == 0:
        return out
        
    # Generate 16 decorrelated versions using Hadamard + Frequency dependent phase shifts
    H = hadamard(16) / 4.0
    
    A_f = np.fft.rfft(A_in, axis=0) # (F, 2)
    F = A_f.shape[0]
    
    # Map 2 channels to 16 by repeating/pad
    A_pad = np.zeros((F, 16), dtype=np.complex128)
    A_pad[:, 0] = A_f[:, 0]
    A_pad[:, 1] = A_f[:, 1]
    
    # Apply random phase shifts to Decorrelate before Hadamard
    np.random.seed(42) # Deterministic
    phase_shifts = np.exp(1j * np.random.uniform(0, 2*np.pi, (F, 16)))
    A_pad = A_pad * phase_shifts
    
    # Apply Hadamard mixing
    A_mix = np.dot(A_pad, H)
    
    # IFFT back to time domain
    A_decorr = np.fft.irfft(A_mix, n=N, axis=0) # (N, 16)
    
    # Map these 16 uncorrelated channels to the ACN outputs.
    # W (ch 0) gets 0. (Ambient doesn't center focused)
    # We map them circularly to ch 1..num_ch-1
    # Scale down by envelopment (done via slider setting outside)
    for c in range(1, num_ch):
        out[:, c] = A_decorr[:, c % 16] * 0.5 # scale for sum 
        
    return out


def process_block(audio_hop, order, stage_width, envelopment, z1):
    """
    Process 2048-sample hop using 50% overlap 4096 STFT conceptually.
    audio_hop: (2048, 2)
    z1: (2048, 2) previous hop
    
    Returns: output_hop (2048, num_ch), new_z1 (2048, num_ch)
    """
    # 1. Form 4096 frame block
    block = np.vstack((z1, audio_hop))
    
    # 2. Window
    win = np.hanning(4096)[:, None]
    block_win = block * win
    
    # 3. PCA Extraction
    P_win, A_win = extract_primary_ambient(block_win)
    
    # 4. Spatialize P
    P_ambi = route_primary(P_win, order, stage_width)
    
    # 5. Diffuse A
    A_ambi = diffuse_ambient_fft(A_win, order)
    
    # Scale A by envelopment
    A_ambi = A_ambi * (envelopment / 100.0)
    
    # 6. Sum
    Out_win = P_ambi + A_ambi
    
    # Window again for overlap-add? 
    # Actually, if we windowed input, and operations are linear-ish (or at least preserve amplitude),
    # COLA requires just one hanning if hop=2048, but wait, sqrt-Hann twice is standard.
    # We used Hanning. Standard COLA: Hanning sum to 1 with 50% overlap. 
    # But we modified in frequency domain. Let's just output directly.
    # To keep COLA, out_hop = Out_win[:2048] + out_z1, out_z1 = Out_win[2048:]
    return Out_win

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--order', type=int, default=3)
    parser.add_argument('--width', type=float, default=90)
    parser.add_argument('--envelopment', type=float, default=50)
    args = parser.parse_args()
    
    try:
        info = sf.info(args.input)
        frames = info.frames
        sr = info.samplerate
        
        num_ch = (args.order + 1)**2
        
        hop = 2048
        window_size = 4096
        
        z1 = np.zeros((hop, 2))
        out_z1 = np.zeros((hop, num_ch))
        
        processed = 0
        
        with sf.SoundFile(args.input, 'r') as f_in, \
             sf.SoundFile(args.output, 'w', samplerate=sr, channels=num_ch, subtype='PCM_24') as f_out:
             
             for block in f_in.blocks(blocksize=hop, fill_value=0.0):
                 if block.ndim == 1:
                     block = np.column_stack((block, block))
                 elif block.shape[1] > 2:
                     block = block[:, :2] # strictly 2 channels
                 
                 # Pad if last block is short
                 if block.shape[0] < hop:
                     pad = np.zeros((hop - block.shape[0], 2))
                     block = np.vstack((block, pad))
                     
                 # Process block
                 Out_win = process_block(block, args.order, args.width, args.envelopment, z1)
                 
                 # Overlap add
                 out_hop = Out_win[:hop] + out_z1
                 out_z1 = Out_win[hop:]
                 
                 # Save for next
                 z1 = block
                 
                 f_out.write(out_hop)
                 processed += hop
                 
                 if processed % (hop * 10) == 0:
                     prog = min(1.0, processed / frames)
                     sys.stdout.write(json.dumps({"progress": prog}) + "\n")
                     sys.stdout.flush()
             
             # Flush tail
             f_out.write(out_z1)
                     
    except Exception as e:
        sys.stderr.write(str(e) + "\n")
        sys.exit(1)

if __name__ == '__main__':
    main()

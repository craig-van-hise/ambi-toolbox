import sys
import json
import argparse
import numpy as np
import soundfile as sf
import spaudiopy as spa
from scipy.linalg import hadamard
from scipy.signal import stft, istft

def diffuse_ambient_stft(A_f, order):
    """
    Diffuses Ambient STFT spectrogram using frequency-dependent phase shifts and a Hadamard matrix.
    A_f: (F, T, 2)
    Returns: A_ambi (F, T, num_ch)
    """
    F, T, _ = A_f.shape
    num_ch = (order + 1)**2
    out = np.zeros((F, T, num_ch), dtype=np.complex128)
    
    if num_ch == 0:
        return out
        
    H = hadamard(16) / 4.0
    
    A_pad = np.zeros((F, T, 16), dtype=np.complex128)
    A_pad[:, :, 0] = A_f[:, :, 0]
    A_pad[:, :, 1] = A_f[:, :, 1]
    
    # Generate random phase shift matrix exactly *once* for the entire spectrogram
    np.random.seed(42) # Deterministic
    phase_shifts = np.exp(1j * np.random.uniform(0, 2*np.pi, (F, 16)))
    
    # Broadcast phase_shifts (F, 16) to (F, T, 16)
    A_pad = A_pad * phase_shifts[:, None, :]
    
    # Apply Hadamard mixing
    # A_pad is (F, T, 16). H is (16, 16).
    A_mix = np.dot(A_pad, H) # Result is (F, T, 16)
    
    for c in range(1, num_ch):
        out[:, :, c] = A_mix[:, :, c % 16] * 0.5
        
    return out

def route_primary_stft(P_f, order, stage_width_pct):
    """
    Routes Direct STFT spectrogram to AmbiX channels.
    P_f: (F, T, 2)
    Returns: P_ambi (F, T, num_ch)
    """
    num_ch = (order + 1)**2
    if num_ch == 0:
        return np.zeros((P_f.shape[0], P_f.shape[1], 0), dtype=np.complex128)
        
    angle = (stage_width_pct / 100.0) * (np.pi / 2.0)
    
    azi = np.array([angle, -angle])
    colat = np.array([np.pi/2, np.pi/2])
    
    # (2, num_ch)
    Y = spa.sph.sh_matrix(order, azi, colat, sh_type='real')
    
    # P_f is (F, T, 2), dot with (2, num_ch) -> (F, T, num_ch)
    out = np.dot(P_f, Y)
    return out

def extract_primary_ambient_stft(Zxx):
    """
    Performs true STFT PCA with temporal smoothing.
    Zxx: (F, T, 2)
    Returns: P_f (F, T, 2), A_f (F, T, 2)
    """
    F, T, C = Zxx.shape
    P_f = np.zeros_like(Zxx)
    A_f = np.zeros_like(Zxx)
    
    R_smooth = np.zeros((F, 2, 2), dtype=np.complex128)
    
    for m in range(T):
        X_m = Zxx[:, m, :] # (F, 2)
        
        # Outer product X * X^H per frequency bin
        R_m = np.einsum('fi,fj->fij', X_m, X_m.conj())
        
        # Recursive temporal smoothing
        # R_smooth(k, m) = 0.85 * R_smooth(k, m-1) + 0.15 * R(k, m)
        R_smooth = 0.85 * R_smooth + 0.15 * R_m
        
        # Eigendecomposition of R_smooth (F, 2, 2)
        # eigh returns eigenvalues in ascending order
        evals, evecs = np.linalg.eigh(R_smooth)
        
        w1 = evecs[..., 1] # primary eigenvector (F, 2)
        w2 = evecs[..., 0] # secondary eigenvector (F, 2)
        
        # Project STFT bin
        comp_P = np.einsum('fi,fi->f', w1.conj(), X_m)
        P_f[:, m, :] = w1 * comp_P[:, None]
        
        comp_A = np.einsum('fi,fi->f', w2.conj(), X_m)
        A_f[:, m, :] = w2 * comp_A[:, None]
        
    return P_f, A_f

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--order', type=int, default=3)
    parser.add_argument('--width', type=float, default=90)
    parser.add_argument('--envelopment', type=float, default=50)
    args = parser.parse_args()
    
    try:
        # Task 1: Nuke the Time-Domain Loop & Import entire stereo file
        data, sr = sf.read(args.input)
        
        if data.ndim == 1:
            data = np.column_stack((data, data))
        elif data.shape[1] > 2:
            data = data[:, :2]
            
        # Transpose data to (2, N) for fast channel-wise STFT processing
        data = data.T
        N_samples = data.shape[1]
        
        sys.stdout.write(json.dumps({"info": f"Loaded {N_samples} samples, {sr}Hz", "progress": 0.1}) + "\n")
        sys.stdout.flush()
        
        # Task 2: Implement True STFT PCA
        # stft along the time axis (axis=-1)
        f, t_frames, Zxx = stft(data, fs=sr, window='hann', nperseg=4096, noverlap=2048)
        
        # Zxx is (2, F, T) -> Transpose to (F, T, 2)
        Zxx = np.transpose(Zxx, (1, 2, 0))
        
        sys.stdout.write(json.dumps({"info": "Extacting PCA components...", "progress": 0.3}) + "\n")
        sys.stdout.flush()
        
        P_f, A_f = extract_primary_ambient_stft(Zxx)
        
        sys.stdout.write(json.dumps({"info": "Routing & Diffusing...", "progress": 0.6}) + "\n")
        sys.stdout.flush()
        
        num_ch = (args.order + 1)**2
        
        # Task 4: Reconstruct and Output
        P_ambi = route_primary_stft(P_f, args.order, args.width)
        
        # Task 3: Continuous Frequency-Domain Diffusion
        A_ambi = diffuse_ambient_stft(A_f, args.order)
        A_ambi = A_ambi * (args.envelopment / 100.0)
        
        Out_f = P_ambi + A_ambi # (F, T, num_ch)
        
        # Transpose back to (num_ch, F, T) for istft
        Out_f_t = np.transpose(Out_f, (2, 0, 1))
        
        sys.stdout.write(json.dumps({"info": "Reconstructing Time Domain...", "progress": 0.8}) + "\n")
        sys.stdout.flush()
        
        # Inverse STFT
        # istft preserves COLA compliance with hann, nperseg=4096, noverlap=2048
        _, out_time = istft(Out_f_t, fs=sr, window='hann', nperseg=4096, noverlap=2048)
        
        # istft returns (num_ch, N_out). Transpose to (N_out, num_ch)
        out_time = out_time.T 
        
        # Truncate to exact original length
        if out_time.shape[0] > N_samples:
            out_time = out_time[:N_samples, :]
        elif out_time.shape[0] < N_samples:
            pad = np.zeros((N_samples - out_time.shape[0], num_ch))
            out_time = np.vstack((out_time, pad))
            
        sys.stdout.write(json.dumps({"info": "Writing file...", "progress": 0.9}) + "\n")
        sys.stdout.flush()
            
        with sf.SoundFile(args.output, 'w', samplerate=sr, channels=num_ch, subtype='PCM_24') as f_out:
            f_out.write(out_time)
            
        sys.stdout.write(json.dumps({"progress": 1.0}) + "\n")
        sys.stdout.flush()
            
    except Exception as e:
        sys.stderr.write(json.dumps({"error": str(e)}) + "\n")
        sys.exit(1)

if __name__ == '__main__':
    main()

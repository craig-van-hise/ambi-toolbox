import os
import sys
import numpy as np
import soundfile as sf
import netCDF4
from scipy.fft import rfft, irfft
from scipy.special import sph_harm
from scipy.ndimage import shift as nd_shift

class SAFRenderer:
    def __init__(self):
        self.sh_hrtfs = None  # Prepared filters: (n_sh, 2, n_samples)
        self.sofa_data = {
            'ir': None,
            'pos': None,
            'fs': 48000.0,
            'delay': None
        }
        self.current_order = -1
        self.current_sofa_path = None

    def load_sofa(self, sofa_path):
        """Loads a SOFA file and extracts Impulse Responses and metadata."""
        if self.current_sofa_path == sofa_path:
            return

        print(f"[SAFRenderer] Loading SOFA: {sofa_path}")
        try:
            ds = netCDF4.Dataset(sofa_path, 'r')
            self.sofa_data['ir'] = np.array(ds.variables['Data.IR'][:], dtype=np.float32)
            self.sofa_data['pos'] = np.array(ds.variables['SourcePosition'][:], dtype=np.float32)
            
            sr = ds.variables['Data.SamplingRate'][:]
            self.sofa_data['fs'] = float(sr.flat[0]) if isinstance(sr, np.ndarray) else float(sr)

            if 'Data.Delay' in ds.variables:
                d = np.array(ds.variables['Data.Delay'][:], dtype=np.float32)
                self.sofa_data['delay'] = d if np.max(np.abs(d)) > 1e-9 else None
            
            ds.close()
            self.current_sofa_path = sofa_path
            self.current_order = -1 
            print(f"[SAFRenderer] SOFA Loaded. FS: {self.sofa_data['fs']} Hz")
        except Exception as e:
            print(f"[SAFRenderer] Critical Error loading SOFA: {e}")
            raise

    def _compute_sn3d_sh(self, order, azi_rad, ele_rad):
        """Computes SN3D-normalized Real Spherical Harmonics."""
        n_dirs = len(azi_rad)
        n_sh = (order + 1)**2
        Y = np.zeros((n_dirs, n_sh), dtype=np.float32)
        
        theta = azi_rad
        phi = np.pi/2 - ele_rad  # Colatitude
        
        idx = 0
        for n in range(order + 1):
            sn3d_factor = np.sqrt(4 * np.pi / (2*n + 1))
            for m in range(-n, n + 1):
                m_abs = abs(m)
                Y_c = sph_harm(m_abs, n, theta, phi)
                if m == 0:
                    val = np.real(Y_c)
                elif m > 0:
                    val = np.sqrt(2) * np.real(Y_c)
                    if m % 2 == 1: val = -val
                else:
                    val = np.sqrt(2) * np.imag(Y_c)
                    if m_abs % 2 == 1: val = -val
                
                Y[:, idx] = val * sn3d_factor
                idx += 1
        return Y

    def _get_max_re_weights(self, order):
        """Computes Tapering weights to reduce high-order side-lobes."""
        weights = []
        for n in range(order + 1):
            g_n = np.cos(n * np.pi / (2 * order + 2))
            for _ in range(-n, n + 1):
                weights.append(g_n)
        return np.array(weights, dtype=np.float32)

    def prepare(self, order):
        """Builds the Modal HRTF Filters for the specified Ambisonic order."""
        if self.current_order == order:
            return

        print(f"[SAFRenderer] Preparing {order}th-Order Modal Filters...")
        hrirs = self.sofa_data['ir']
        sofa_pos = self.sofa_data['pos']
        fs = self.sofa_data['fs']

        # 1. Coordinate Normalization
        azi = np.deg2rad(sofa_pos[:, 0]) if np.max(np.abs(sofa_pos[:, 0])) > 2*np.pi else sofa_pos[:, 0]
        ele = np.deg2rad(sofa_pos[:, 1]) if np.max(np.abs(sofa_pos[:, 1])) > 2*np.pi else sofa_pos[:, 1]
        
        # 2. Virtual Speaker Grid (Fibonacci Sphere)
        n_sh = (order + 1)**2
        n_virt = n_sh * 2 + 8 
        indices = np.arange(0, n_virt, dtype=float) + 0.5
        phi_v = np.arccos(1 - 2*indices/n_virt)
        theta_v = (np.pi * (1 + 5**0.5) * indices % (2*np.pi)) - np.pi
        
        # 3. Virtual Speaker Mapping (Nearest Neighbor from SOFA)
        sofa_cart = np.vstack([np.cos(ele)*np.cos(azi), np.cos(ele)*np.sin(azi), np.sin(ele)]).T
        virt_cart = np.vstack([np.sin(phi_v)*np.cos(theta_v), np.sin(phi_v)*np.sin(theta_v), np.cos(phi_v)]).T
        
        hrir_len = hrirs.shape[2]
        virt_hrirs = np.zeros((n_virt, 2, hrir_len), dtype=np.float32)
        
        for v in range(n_virt):
            idx_nearest = np.argmax(sofa_cart @ virt_cart[v])
            virt_hrirs[v] = hrirs[idx_nearest]

        # 4. Least-Squares Modal Projection
        v_ele = np.pi/2 - phi_v
        Y_virt = self._compute_sn3d_sh(order, theta_v, v_ele)
        D_dec = np.linalg.pinv(Y_virt.T) # (N_virt, N_sh)
        
        # Final SH-Domain Filters
        self.sh_hrtfs = np.einsum('vs, vrl -> srl', D_dec, virt_hrirs)
        
        # Apply Max-rE weights
        weights = self._get_max_re_weights(order)
        for s in range(n_sh):
            self.sh_hrtfs[s] *= weights[s]

        self.current_order = order

    def render(self, input_path, output_path, block_size=4096):
        """Two-Pass Transparent Render."""
        with sf.SoundFile(input_path) as f:
            fs = f.samplerate
            n_ch = f.channels
            n_samples = len(f)
            order = int(np.sqrt(n_ch) - 1)

        self.prepare(order)
        n_sh = (order + 1)**2
        hrir_len = self.sh_hrtfs.shape[2]
        fft_len = 2**int(np.ceil(np.log2(block_size + hrir_len - 1)))
        H_sh_freq = rfft(self.sh_hrtfs, n=fft_len, axis=2)

        last_progress_int = 0
        total_batches = 2 * (n_samples // block_size + 1) # 2 passes
        current_batch = 0

        # PASS 1: Peak Detection
        print("[SAFRenderer] Pass 1: Analyzing peaks...")
        global_peak = 0.0
        with sf.SoundFile(input_path) as f_in:
            ola_buf = np.zeros((fft_len, 2), dtype=np.float32)
            for block in f_in.blocks(blocksize=block_size, dtype='float32'):
                # Progress Update
                current_batch += 1
                prog = int(current_batch / total_batches * 100)
                if prog > last_progress_int:
                    print(f"PROGRESS:{prog/100:.2f}")
                    sys.stdout.flush()
                    last_progress_int = prog

                if block.shape[1] != n_sh: block = np.pad(block, ((0,0),(0, n_sh-block.shape[1])))[:,:n_sh]
                
                block_f = rfft(block.T, n=fft_len, axis=1)
                out_f = np.einsum('sk, srk -> rk', block_f, H_sh_freq)
                out_t = irfft(out_f, n=fft_len, axis=1).T
                out_t += ola_buf
                ola_buf = np.pad(out_t[block.shape[0]:, :], ((0, block.shape[0]), (0, 0)))[:fft_len]
                
                global_peak = max(global_peak, np.max(np.abs(out_t[:block.shape[0], :])))

        gain = 0.98 / global_peak if global_peak > 0.98 else 1.0
        print(f"[SAFRenderer] Pass 2: Rendering with {20*np.log10(gain):.2f}dB adjustment.")

        # PASS 2: Final Write
        with sf.SoundFile(input_path) as f_in:
            with sf.SoundFile(output_path, 'w', samplerate=fs, channels=2) as f_out:
                ola_buf = np.zeros((fft_len, 2), dtype=np.float32)
                for block in f_in.blocks(blocksize=block_size, dtype='float32'):
                    # Progress Update
                    current_batch += 1
                    prog = int(current_batch / total_batches * 100)
                    if prog > last_progress_int:
                        print(f"PROGRESS:{prog/100:.2f}")
                        sys.stdout.flush()
                        last_progress_int = prog
                        
                    n_blk = block.shape[0]
                    if block.shape[1] != n_sh: block = np.pad(block, ((0,0),(0, n_sh-block.shape[1])))[:,:n_sh]
                    
                    block_f = rfft(block.T, n=fft_len, axis=1)
                    out_f = np.einsum('sk, srk -> rk', block_f, H_sh_freq)
                    out_t = irfft(out_f, n=fft_len, axis=1).T
                    out_t += ola_buf
                    ola_buf = np.zeros_like(ola_buf)
                    ola_buf[:fft_len - n_blk, :] = out_t[n_blk:, :]
                    
                    f_out.write(out_t[:n_blk, :] * gain)

        # Force 100%
        print("PROGRESS:1.0")
        sys.stdout.flush()
        print("[SAFRenderer] Done.")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="SAF Renderer Worker")
    parser.add_argument("--input", required=True, help="Input Ambisonic file")
    parser.add_argument("--output", required=True, help="Output Binaural file")
    parser.add_argument("--sofa", required=True, help="SOFA Head Model file")
    
    # Support both flagged (App) and positional (Legacy/Manual) arguments for flexibility
    # Note: If positional args are detected, we map them manually to simulate flags if needed, 
    # but argparse handles mixed nicely if we configure it right. 
    # However, strictly supporting flags is safer for the App interaction.
    # To support the legacy usage `python saf_wrapper.py in out sofa`, we can check sys.argv.
    
    # Simple Heuristic: If we see flags, use argparse. If not, use positional.
    if len(sys.argv) > 1 and sys.argv[1].startswith("-"):
        args = parser.parse_args()
        engine = SAFRenderer()
        engine.load_sofa(args.sofa)
        engine.render(args.input, args.output)
    elif len(sys.argv) >= 4:
        # Legacy positional mode
        engine = SAFRenderer()
        engine.load_sofa(sys.argv[3])
        engine.render(sys.argv[1], sys.argv[2])
    else:
        parser.print_help()
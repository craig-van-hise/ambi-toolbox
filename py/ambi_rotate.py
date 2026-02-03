import sys
import argparse
import numpy as np
import soundfile as sf
import json
import math

def get_rotation_matrix_1st_order(yaw, pitch, roll):
    # Convert degrees to radians
    a, b, g = np.radians(yaw), np.radians(pitch), np.radians(roll)
    
    ca, sa = np.cos(a), np.sin(a)
    cb, sb = np.cos(b), np.sin(b)
    cg, sg = np.cos(g), np.sin(g)
    
    # Standard 3x3 Rotation Matrix (Rz * Ry * Rx)
    # x' = r00*x + r01*y + r02*z
    # y' = r10*x + r11*y + r12*z
    # z' = r20*x + r21*y + r22*z
    
    r00 = ca*cb
    r01 = ca*sb*sg - sa*cg
    r02 = ca*sb*cg + sa*sg
    
    r10 = sa*cb
    r11 = sa*sb*sg + ca*cg
    r12 = sa*sb*cg - ca*sg
    
    r20 = -sb
    r21 = cb*sg
    r22 = cb*cg
    
    return np.array([
        [r11, r12, r10], # Y-row (ACN 1) inputs Y, Z, X
        [r21, r22, r20], # Z-row (ACN 2) inputs Y, Z, X
        [r01, r02, r00]  # X-row (ACN 3) inputs Y, Z, X
    ])

def process_file(input_path, yaw, pitch, roll):
    print(f"Processing: {input_path}")
    
    try:
        # 1. Load Audio with High Fidelity
        # 'always_2d=True' ensures shape is (frames, channels)
        data, samplerate = sf.read(input_path, always_2d=True)
        info = sf.info(input_path)
        
        frames, channels = data.shape
        print(f"Loaded: {channels}ch @ {samplerate}Hz ({info.subtype})")
        
        # 2. Apply Processing (In-Place to save RAM)
        
        # --- PHASE A: 3-Axis Rotation for Order 1 (Ch 1-3) ---
        if channels >= 4:
            # Extract ACN 1,2,3 (Y,Z,X)
            # data[:, 1:4] is a view of columns 1, 2, 3
            core = data[:, 1:4].copy() # Copy to avoid overwrite issues during calc
            
            # Get 3x3 Matrix
            mat = get_rotation_matrix_1st_order(yaw, pitch, roll)
            
            # Apply Matrix: New = Core dot Matrix.T
            # We treat the sample vector as row vector v. v' = vR
            rotated_core = np.dot(core, mat.T)
            
            # Write back
            data[:, 1:4] = rotated_core

        # --- PHASE B: Yaw (Z) Rotation for Higher Orders (Ch 4+) ---
        # "Sectorial Rotation" Logic for Arbitrary Orders
        yaw_rad = np.radians(yaw)
        
        for i in range(4, channels):
            l = int(math.floor(math.sqrt(i)))
            m = i - (l * l) - l
            
            if m > 0:
                # This is a positive sectorial harmonic. Find its negative partner.
                partner_idx = (l * l) + l - m
                
                # Check bounds (partner must exist)
                if partner_idx < channels:
                    # We have a pair: data[:, i] (Pos) and data[:, partner_idx] (Neg)
                    # Rotate the pair by (m * yaw)
                    angle = m * yaw_rad
                    c = math.cos(angle)
                    s = math.sin(angle)
                    
                    # Store copies
                    pos = data[:, i].copy()
                    neg = data[:, partner_idx].copy()
                    
                    # Apply Rotation Matrix
                    # Pos' = Pos*c - Neg*s
                    # Neg' = Pos*s + Neg*c
                    data[:, i]           = (pos * c) - (neg * s)
                    data[:, partner_idx] = (pos * s) + (neg * c)

        # 3. Export
        # Suffix the filename
        output_path = input_path.replace('.wav', '_rotated.wav')
        if output_path == input_path:
            output_path = input_path + "_rotated.wav"
            
        print(f"Writing to: {output_path} as {info.subtype}")
        
        # FORCE the original subtype (e.g. PCM_24) to prevent size loss
        sf.write(output_path, data, samplerate, subtype=info.subtype)
        
        return output_path

    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        raise e

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--files', required=True)
    parser.add_argument('--yaw', type=float, default=0)
    parser.add_argument('--pitch', type=float, default=0)
    parser.add_argument('--roll', type=float, default=0)
    
    args = parser.parse_args()
    
    # Parse file list
    try:
        file_list = json.loads(args.files)
    except:
        file_list = [args.files] # Handle single file string case
        
    results = []
    
    for f in file_list:
        out = process_file(f, args.yaw, args.pitch, args.roll)
        results.append(out)
        
    print("BATCH COMPLETE")

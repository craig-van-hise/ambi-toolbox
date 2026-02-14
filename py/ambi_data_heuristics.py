#!/usr/bin/env python3
"""
AmbiData Heuristics Engine
Analyzes ambisonic audio files to detect format, normalization, and channel sequence
"""

import sys
import json
import numpy as np
import soundfile as sf
from pathlib import Path


def analyze_signal(file_path: str, duration: float = 5.0) -> dict:
    """
    Analyze ambisonic audio signal to detect format characteristics
    
    Args:
        file_path: Path to audio file
        duration: Seconds of audio to analyze (default: 5.0)
    
    Returns:
        Dictionary with format, normalization, sequence, and confidence
    """
    try:
        # Read first N seconds of audio
        data, sample_rate = sf.read(file_path, frames=int(duration * 48000), always_2d=True)
        
        if data.shape[1] < 4:
            return {
                "format": "Unknown",
                "normalization": "Unknown",
                "sequence": "Unknown",
                "confidence": 0.0,
                "error": "File has fewer than 4 channels - not ambisonic"
            }
        
        # Calculate RMS per channel
        rms = np.sqrt(np.mean(data ** 2, axis=0))
        
        # A-Format vs B-Format Detection
        # A-Format: Channel 1 (mic capsule) >> other channels (near-zero)
        # B-Format: All channels have comparable energy
        ch1_rms = rms[0]
        other_rms_mean = np.mean(rms[1:4])
        
        if other_rms_mean > 0:
            energy_ratio = ch1_rms / other_rms_mean
        else:
            energy_ratio = float('inf')
        
        # If Ch1 is much louder, likely A-Format (raw mic)
        if energy_ratio > 10.0:
            format_type = "A-Format"
            format_confidence = 0.85
        else:
            format_type = "B-Format"
            format_confidence = 0.90
        
        # Normalization Detection (B-Format only)
        # SN3D (AmbiX): W channel ≈ 0.707x (√2 less) than other channels
        # MaxN (FuMa): W channel ≈ same power as other channels
        normalization = "Unknown"
        norm_confidence = 0.0
        
        if format_type == "B-Format" and len(rms) >= 4:
            w_channel = rms[0]
            xyz_mean = np.mean(rms[1:4])
            
            if xyz_mean > 0:
                w_ratio = w_channel / xyz_mean
                
                # SN3D: W should be ~0.707 but can vary significantly (0.5-1.2 due to content)
                # MaxN/FuMa: W should be ~1.0 but can also vary
                # For practical detection, if W is significantly lower, likely SN3D
                if w_ratio < 0.85:
                    normalization = "SN3D"
                    norm_confidence = min(0.90, 0.60 + (0.85 - w_ratio))
                # If W is roughly equal or higher, likely MaxN
                elif 0.85 <= w_ratio <= 1.5:
                    normalization = "MaxN"
                    norm_confidence = 0.70
                else:
                    # Very high W ratio - unusual but default to SN3D as most common
                    normalization = "SN3D"
                    norm_confidence = 0.50
        
        # Channel Sequence Detection
        # ACN: W, Y, Z, X (AmbiX standard)
        # FuMa: W, X, Y, Z
        # Simple heuristic: check if channels 1-3 are correlated with expected patterns
        sequence = "ACN"  # Default to ACN (modern standard)
        seq_confidence = 0.70  # Medium confidence without deep phase analysis
        
        # If MaxN normalization detected, likely FuMa sequence
        if normalization == "MaxN":
            sequence = "FuMa"
            seq_confidence = 0.75
        
        # Overall confidence (weighted average)
        overall_confidence = (format_confidence * 0.5 + norm_confidence * 0.3 + seq_confidence * 0.2)
        
        return {
            "format": format_type,
            "normalization": normalization,
            "sequence": sequence,
            "confidence": round(overall_confidence, 2),
            "details": {
                "ch1_rms": float(ch1_rms),
                "other_rms_mean": float(other_rms_mean),
                "energy_ratio": float(energy_ratio) if energy_ratio != float('inf') else "inf",
                "w_ratio": float(w_channel / xyz_mean) if format_type == "B-Format" and xyz_mean > 0 else None
            }
        }
        
    except Exception as e:
        return {
            "format": "Unknown",
            "normalization": "Unknown",
            "sequence": "Unknown",
            "confidence": 0.0,
            "error": str(e)
        }


def main():
    """Main entry point for command-line usage"""
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python3 ambi_data_heuristics.py <file_path>"}))
        sys.exit(1)
    
    file_path = sys.argv[1]
    
    if not Path(file_path).exists():
        print(json.dumps({"error": f"File not found: {file_path}"}))
        sys.exit(1)
    
    result = analyze_signal(file_path)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()

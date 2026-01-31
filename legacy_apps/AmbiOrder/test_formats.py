import soundfile as sf
import numpy as np
import os

def test_formats():
    print("Testing Format Support...")
    
    # Create test data (3rd order ambisonic = 16 channels, short duration)
    data = np.zeros((48000, 16)) # 1 sec Silence (or near it)
    sr = 48000
    
    # 1. Test CAF Write/Read
    caf_file = "test_ambisonic.caf"
    try:
        print(f"Testing CAF Write: {caf_file}...")
        sf.write(caf_file, data, sr, format='CAF', subtype='PCM_16')
        print("  Write Success.")
        
        print("Testing CAF Read...")
        d, s = sf.read(caf_file)
        print(f"  Read Success: {d.shape} @ {s}Hz")
        if d.shape[1] == 16:
            print("  Channel count match.")
        else:
            print(f"  Channel count MISMATCH: {d.shape[1]}")
            
    except Exception as e:
        print(f"CAF Failed: {e}")

    # 2. Test OPUS Write/Read
    # Note: Opus usually supported via OGG container
    opus_file = "test_ambisonic.opus"
    try:
        print(f"\nTesting OPUS Write: {opus_file}...")
        # Opus mapping for 16 channels might be tricky for libsndfile/opusenc
        # We'll try. 
        # If 16ch fails, we'll try 4ch (1st order) just to verify format support at least.
        try:
             sf.write(opus_file, data, sr, format='OGG', subtype='OPUS')
             print("  Write Success (16ch).")
        except Exception as e:
             print(f"  Write 16ch Failed ({e}). Trying 4ch...")
             data_4ch = data[:, :4]
             sf.write(opus_file, data_4ch, sr, format='OGG', subtype='OPUS')
             print("  Write Success (4ch).")

        print("Testing OPUS Read...")
        d, s = sf.read(opus_file)
        print(f"  Read Success: {d.shape} @ {s}Hz")
        
    except Exception as e:
        print(f"OPUS Failed: {e}")
        
    # Cleanup
    if os.path.exists(caf_file): os.remove(caf_file)
    if os.path.exists(opus_file): os.remove(opus_file)

if __name__ == "__main__":
    test_formats()

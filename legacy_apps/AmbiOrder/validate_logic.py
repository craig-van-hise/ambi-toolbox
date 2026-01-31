import os
import soundfile as sf

def get_ambisonic_order(channels):
    """
    Returns the order based on channel count (ACN/SN3D usually assumes (N+1)^2 channels).
    1st Order = 4 channels
    2nd Order = 9 channels
    3rd Order = 16 channels
    4th Order = 25 channels
    ...
    Returns None if not a standard ambisonic channel count.
    """
    # Order N has (N+1)^2 channels
    # sqrt(channels) - 1 = Order
    root = (channels ** 0.5)
    if root.is_integer() and root > 0:
        return int(root - 1)
    return None

def get_valid_targets(source_order):
    """
    Returns a list of valid lower orders to downmix to.
    """
    if source_order is None or source_order <= 0:
        return []
    
    targets = []
    # Can go down to 1st order (order 1)
    for i in range(source_order - 1, 0, -1):
        targets.append(i)
    return targets

def scan_files():
    print("--- Ambitrim Logic Validation Report ---")
    current_dir = os.getcwd()
    files = [f for f in os.listdir(current_dir) if f.lower().endswith('.wav')]
    files.sort()

    if not files:
        print(f"No .wav files found in {current_dir}")
        return

    for filename in files:
        try:
            info = sf.info(filename)
            channels = info.channels
            order = get_ambisonic_order(channels)
            
            print(f"\nFile: {filename}")
            print(f"  Channels: {channels}")
            
            if order is not None:
                order_str = f"{order}th Order"
                if order == 1: order_str = "1st Order"
                elif order == 2: order_str = "2nd Order"
                elif order == 3: order_str = "3rd Order"
                
                print(f"  Detected: {channels}ch ({order_str})")
                
                targets = get_valid_targets(order)
                if targets:
                    target_strs = []
                    for t in targets:
                        ts = f"{t}th"
                        if t == 1: ts = "1st"
                        elif t == 2: ts = "2nd"
                        elif t == 3: ts = "3rd"
                        target_strs.append(ts)
                    print(f"  Valid Targets: {', '.join(target_strs)}")
                else:
                    print("  Valid Targets: None (Already 1st Order or invalid)")
            else:
                print(f"  Detected: {channels}ch (Not a standard Ambisonic count)")
                
        except Exception as e:
            print(f"\nFile: {filename}")
            print(f"  Error reading file: {e}")

if __name__ == "__main__":
    scan_files()

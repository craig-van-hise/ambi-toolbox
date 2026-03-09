import math
import subprocess
import json
import sys
import os

# --- Functions to Test (Implementation Stub - INTENDED TO PASS) ---

def calculate_ambisonic_order(channels):
    # Fix 1: Guardrail: If channels is 0, None, or invalid, do not perform math
    if not channels or int(channels) <= 0:
        return "Unknown"
    
    try:
        # Calculate Order = sqrt(channels) - 1
        order_float = math.sqrt(int(channels)) - 1
        order_int = int(order_float)
        
        # Format for UI
        if order_int == 1: return "1st"
        elif order_int == 2: return "2nd"
        elif order_int == 3: return "3rd"
        else: return f"{order_int}th"
        
    except ValueError:
        return "Unknown"

def deduplicate_obu_sequence(parsed_obus):
    # Fix 2: OBU Deduplication using dictionary keys
    unique_obus = {}
    
    for obu in parsed_obus:
        obu_id = obu.get('id')
        # Dictionary keys must be unique, which automatically ignores duplicates
        if obu_id not in unique_obus:
            unique_obus[obu_id] = obu
            
    # Return it back as a list for the UI to iterate over
    return list(unique_obus.values())

def get_raw_duration(file_path):
    # Fix 3: Deep probe for raw bitstreams
    
    # Try to find ffprobe in local assets (dev mode)
    ffprobe_path = os.path.join(os.getcwd(), 'assets', 'bin', 'ffprobe')
    if not os.path.exists(ffprobe_path):
        # Fallback to global path
        ffprobe_path = 'ffprobe'

    # We need to construct the command exactly as requested:
    command = [
        ffprobe_path, 
        '-v', 'quiet', 
        '-print_format', 'json', 
        '-show_format', 
        '-analyzeduration', '100000000',  # Force deep analysis
        '-probesize', '100000000',        # Force deep analysis
        file_path
    ]
    
    try:
        result = subprocess.check_output(command)
        data = json.loads(result)
        
        # Safely extract duration
        duration_str = data.get('format', {}).get('duration')
        if duration_str:
            return float(duration_str)
        else:
            return "Unknown (Raw Stream)"
            
    except Exception as e:
        # If ffprobe fails (common for raw OBU streams without container),
        # we return the fallback string as per requirements.
        return "Unknown (Raw Stream)"

# --- Test Suite ---

def run_tests():
    print("Running IAMF Parser Tests...\n")
    failures = 0
    
    # TEST 1: Ambisonic Order Guardrail
    print("[TEST 1] Ambisonic Order Guardrail")
    try:
        result = calculate_ambisonic_order(0)
        if result == "Unknown":
            print("  PASS: calculate_ambisonic_order(0) returned 'Unknown'")
        else:
            print(f"  FAIL: Expected 'Unknown', got '{result}'")
            failures += 1
    except Exception as e:
        print(f"  FAIL: Crashed with {e}")
        failures += 1
        
    print("-" * 30)

    # TEST 2: OBU Deduplication
    print("[TEST 2] OBU Deduplication")
    test_obus = [
        {'id': 32, 'type': 'Scene-Based', 'norm': 'SN3D'},
        {'id': 10, 'type': 'Channel-Based'},
        {'id': 32, 'type': 'Scene-Based', 'norm': 'SN3D'}, # Duplicate
        {'id': 10, 'type': 'Channel-Based'}                 # Duplicate
    ]
    try:
        unique_obus = deduplicate_obu_sequence(test_obus)
        if len(unique_obus) == 2:
            print(f"  PASS: Input len {len(test_obus)} -> Output len {len(unique_obus)}")
        else:
            print(f"  FAIL: Expected 2 unique items, got {len(unique_obus)}")
            failures += 1
    except Exception as e:
        print(f"  FAIL: Crashed with {e}")
        failures += 1
    
    print("-" * 30)

    # TEST 3: Raw Bitstream Duration
    print("[TEST 3] Raw Bitstream Duration Fallback")
    test_file = os.path.join(os.path.dirname(__file__), "fixtures", "test_000007.iamf")
    if not os.path.exists(test_file):
        print(f"  SKIP: {test_file} not found")
        failures += 1
    else:
        try:
            duration = get_raw_duration(test_file)
            # We expect a valid float > 0 OR the specific string "Unknown (Raw Stream)"
            # receiving 0.0 or "0:00" is a failure.
            if isinstance(duration, float) and duration > 0:
                 print(f"  PASS: Got valid duration {duration}s")
            elif duration == "Unknown (Raw Stream)":
                 print("  PASS: Got expected fallback string")
            else:
                 print(f"  FAIL: Got {duration} (Expected > 0s or fallback string)")
                 failures += 1
        except Exception as e:
            print(f"  FAIL: Crashed with {e}")
            failures += 1

    print("\n" + "="*30)
    if failures == 0:
        print("ALL TESTS PASSED")
    else:
        print(f"{failures} TESTING FAILURES DETECTED")
        sys.exit(1)

if __name__ == "__main__":
    run_tests()

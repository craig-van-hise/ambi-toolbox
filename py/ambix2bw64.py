import sys
import argparse
import json
import os

try:
    # This is the core function from the EAR library in version 2.1.0+
    from ear.cmdline.ambix_to_bwf import ambix_to_bwf
except ImportError:
    print("Error: The 'ear' Python package is not installed or missing dependencies. Please install it using 'pip install ear'.", file=sys.stderr)
    sys.exit(1)

def process_file(input_path, output_path, norm, nfc_dist):
    print(f"Converting: {os.path.basename(input_path)} -> {os.path.basename(output_path)}")
    try:
        # Create a mock Namespace object to pass to the ear function
        class Args:
            pass
        
        args = Args()
        args.input = input_path
        args.output = output_path
        args.norm = norm
        args.nfcDist = nfc_dist if nfc_dist != 0.0 else None
        args.screenRef = False

        args.chna_only = False # Default according to ear docs
        
        # EAR Utility conversion
        ambix_to_bwf(args)
        print(f"Success: Created {output_path}")
        return True
    except Exception as e:
        print(f"Error converting {input_path}: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ambix to BW64/ADM converter using EBU ADM Renderer (ear-utils)")
    parser.add_argument('--files', required=True, help="JSON array of input file paths")
    parser.add_argument('--outDir', help="Optional output directory")
    parser.add_argument('--norm', default='SN3D', choices=['SN3D', 'N3D'], help="Ambisonic normalization")
    parser.add_argument('--nfcDist', type=float, default=0.0, help="NFC distance in meters")

    args = parser.parse_args()

    try:
        file_list = json.loads(args.files)
    except Exception as e:
        print(f"Error parsing file list: {e}", file=sys.stderr)
        sys.exit(1)

    success_count = 0
    for f in file_list:
        # Determine output path
        filename = os.path.basename(f)
        name, _ = os.path.splitext(filename)
        out_filename = f"{name}_ADM.wav"

        if args.outDir:
            target = os.path.join(args.outDir, out_filename)
        else:
            target = os.path.join(os.path.dirname(f), out_filename)

        if process_file(f, target, args.norm, args.nfcDist):
            success_count += 1

    print(f"BATCH COMPLETE: {success_count}/{len(file_list)} files converted.")

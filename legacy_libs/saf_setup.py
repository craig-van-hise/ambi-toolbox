import os
import subprocess
import shutil
import sys
import platform

def run_command(cmd, cwd=None):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=cwd, text=True)
    if result.returncode != 0:
        print(f"Error: Command failed with code {result.returncode}")
        sys.exit(1)

def main():
    libs_dir = os.path.dirname(os.path.abspath(__file__))
    saf_dir = os.path.join(libs_dir, "Spatial_Audio_Framework")
    build_dir = os.path.join(saf_dir, "build")
    
    # 1. Clone SAF if not exists
    if not os.path.exists(saf_dir):
        print("Cloning Spatial Audio Framework...")
        run_command(["git", "clone", "https://github.com/leomccormack/Spatial_Audio_Framework.git", saf_dir])
    else:
        print("SAF directory exists, pulling latest changes...")
        run_command(["git", "pull"], cwd=saf_dir)
        
    # 2. Configure CMake
    if not os.path.exists(build_dir):
        os.makedirs(build_dir)
        
    print("Configuring CMake...")
    
    # Define CMake arguments
    cmake_args = [
        "cmake", "..",
        "-DSAF_ENABLE_SOFA_READER_MODULE=ON",
        "-DSAF_ENABLE_HOA_MODULE=ON",
        "-DBUILD_SHARED_LIBS=ON",
        # SAF performance options (optional but recommended)
        "-DSAF_PERFORMANCE_LIB=SAF_USE_APPLE_ACCELERATE" if sys.platform == 'darwin' else "-DSAF_PERFORMANCE_LIB=SAF_USE_INTEL_MKL_LP64" 
    ]
    
    # On macOS, we might want to specify architecture if needed, but auto-detect usually works.
    
    run_command(cmake_args, cwd=build_dir)
    
    # 3. Build
    print("Building...")
    run_command(["cmake", "--build", ".", "--target", "saf", "--config", "Release"], cwd=build_dir)
    
    # 4. Copy Shared Library to libs root for easy access
    print("Copying shared library...")
    
    if sys.platform == 'darwin':
        lib_name = "libsaf.dylib"
    elif sys.platform == 'win32':
        lib_name = "saf.dll" # or libsaf.dll check output
    else:
        lib_name = "libsaf.so"
        
    # Find the library in build folder (it might be in Release subdirectory)
    found_lib = None
    for root, dirs, files in os.walk(build_dir):
        if lib_name in files:
            found_lib = os.path.join(root, lib_name)
            break
            
    if found_lib:
        dest = os.path.join(libs_dir, lib_name)
        shutil.copy2(found_lib, dest)
        print(f"Success! Library copied to: {dest}")
    else:
        print(f"Error: Could not find built library {lib_name} in {build_dir}")
        sys.exit(1)

if __name__ == "__main__":
    main()

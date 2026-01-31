# Ambix2Bin - Project State

**Status:** ✅ **Production Ready**
**Last Update:** Dec 17, 2025 (CLI Wrapper Fixes)

## 1. Overview
**Ambix2Bin** is a high-precision Ambisonic-to-Binaural preview tool. It allows users to drag-and-drop AmbiX (SN3D) files and instantly render them to Binaural Stereo for headphone monitoring.

## 2. Technical Architecture
The application uses a **Multi-Process Architecture** to ensure UI responsiveness and crash safety.

*   **GUI Process (`app_ambix2bin.py`)**: PyQt6-based interface. Handles file management, playback, and user interaction.
*   **Worker Process (`saf_wrapper.py`)**: A pure-Python CLI worker that performs the heavy DSP. Updated to use `argparse` for robust argument handling (flags & positional).

## 3. Rendering Engine V2 (The "Fix")
We recently replaced the initial Modal Renderer with a robust **Virtual Speaker Engine** to address spatial and gain issues.

### 🟢 Key Technologies Implemented:
1.  **Loader Stability (NetCDF4):**
    *   **Problem:** The C-based `libsaf` SOFA loader was causing random `SIGTRAP` crashes and failed to read metadata correctly.
    *   **Fix:** Switched to `netCDF4` (Pure Python) for rock-solid loading of HRTF data.

2.  **Gain Staging (Virtual Speakers):**
    *   **Problem:** The previous Modal approach boosted Side channels by +7dB, causing distortion and timbral harshness.
    *   **Fix:** Implemented a **Least Squares Decoder** targeting a Fibonacci Sphere of Virtual Speakers. This guarantees mathematically correct gain relationships between Omni, Front, and Side channels.

3.  **Aliasing Control (Max-rE):**
    *   Applied Max-rE weighting to the Spherical Harmonic coefficients to eliminate high-frequency spatial aliasing.

## 4. Performance
*   **Spatial Balance:** Verified via Rotation Sweep to be within expected ILD bounds (Front -10dB / Side -6dB).
*   **Efficiency:** Uses `scipy.signal.fftconvolve` for efficient block-based processing.
*   **Latency:** Offline rendering (faster than realtime for typical files).

## 6. Recent Updates (Dec 17 2025)
*   **HRTF Selection**: Added a ComboBox to the UI allowing users to select any `.sofa` file located in the `assets/hrtf` directory. The application scans this folder on startup.
*   **Crash Fix**: Resolved a `NameError` crash that occurred when converting with specific HRTF files.

## 5. Outstanding Issues
*   None. Usage verified.

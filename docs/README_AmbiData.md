# AmbiData Tool - Documentation

**AmbiData** is a comprehensive file analysis and metadata inspection utility designed specifically for spatial audio workflows. It acts as a "microscope" for your audio assets, providing deep insights into technical specifications, signal health, and spatial format compliance that go far beyond standard operating system inspectors.

It combines the power of **FFprobe**, **EBUR128** loudness analysis, and custom **Python Heuristics** to detect likely Ambisonic formats (AmbiX vs. FuMa) even when metadata is missing.

---

## 🔍 Features

*   **Deep Metadata Inspection**: Reads internal codec details, stream configurations, and container-specific tags.
*   **Loudness & Dynamics**: Calculates Integrated Loudness (LUFS), Loudness Range (LRA), and True Peak (dBTP) to ensure broadcast compliance.
*   **Signal Health Check**: Automatically detects clipping (samples hitting 0dBFS) and DC Offset issues that could ruin a mix.
*   **Spatial Format Prediction**: Uses signal analysis to guess the Ambisonic format (ACN/SN3D vs. FuMa/MaxN) with a confidence score.
*   **Multi-Stream Support**: Inspects complex files like IAMF or MP4s with multiple audio tracks.
*   **Video Support**: Displays video codec, resolution, and projection metadata for VR video files.

---

## 📊 Displayed Data Fields

The AmbiData Inspector is divided into three logical cards. Below is a detailed list of every value displayed to the user.

### 1. File Identity & Core Specs
*Provides the fundamental "vital signs" of the file.*

*   **File Name & Extension**: The complete filename (e.g., `Ambisonic_Mix_01.wav`).
*   **File Location Path**: The absolute path to the file on the local disk.
*   **Container Format**: The specific container type (e.g., `WAV`, `Ogg`, `QuickTime / MOV`, `Matroska`).
*   **File Size**: The file size in MB.
*   **Precise Duration**: Exact length of the media (e.g., `01:04:23`).
*   **Overall Bit Rate**: The total data rate of the file (e.g., `2304 kbps`).
*   **Codec**: The audio codec used (e.g., `pcm_s24le`, `opus`, `aac`).
*   **Sample Rate**: The audio sampling frequency (e.g., `48.0 kHz`, `96.0 kHz`).
*   **Bit Depth**: The resolution of the audio samples (e.g., `16-bit`, `24-bit`, `32-bit float`).
*   **Channels**: Total number of audio channels (e.g., `4`, `16`).
*   **Ambisonic Order**: The calculated Ambisonic order based on channel count (e.g., `1st` for 4ch, `3rd` for 16ch).

#### Internal Streams (If applicable)
*Visible for multi-stream files (e.g., IAMF).*
*   **Stream Index**: ID of the internal stream (e.g., `#0`, `#1`).
*   **Codec**: Codec for that specific stream.
*   **Sample Rate**: Sample rate for that specific stream.
*   **Bit Depth**: Bit depth for that specific stream.
*   **Channels**: Channel count for that specific stream.

#### Video Specs (If Video)
*   **Video Codec**: e.g., `h264`, `hevc`, `vp9`.
*   **Resolution**: Pixel dimensions (e.g., `3840x2160`).
*   **Frame Rate**: Frames per second (e.g., `30 fps`, `59.94 fps`).

### 2. Dynamics & Signal Health
*Analysis of the audio signal's volume and quality.*

*   **Integrated Loudness**: The overall loudness average over the entire file, measured in **LUFS** (Loudness Units Full Scale).
*   **Loudness Range (LRA)**: The dynamic range of the material, measured in **LU**.
*   **True Peak Max (dBTP)**: The highest inter-sample peak level detected.
    *   *Indicator*: Turns **Orange/Red** if > -1.0 dBTP (potential clipping in lossy encoding).
*   **Raw Clipping Count**: The number of samples that hit exactly 0 dBFS.
    *   *Indicator*: Turns **Red** if > 0.
*   **DC Offset Warning**: Detects if the signal is not centered around the zero axis (which reduces headroom and causes clicks).
    *   *Display*: "DETECTED" or "None".
*   **Empty Stream Warning**: Detects if channels are completely silent (digital zero).
    *   *Display*: "DETECTED" or "None".

### 3. Spatial Metadata & Heuristics
*Analysis of spatial audio properties and container-specific metadata tags.*

*   **Format Type Prediction**: The estimated format based on Python signal analysis (e.g., `AmbiX`, `FuMa`, or `Unknown`).
*   **Ordering/Normalization**: The predicted component ordering and normalization scheme.
    *   *Example*: `ACN/SN3D (AmbiX)` or `FuMa/MaxN (FuMa)`.

#### Container-Specific Fields

**For WAV / BWF Files:**
*   **Is Ambisonic GUID present?**: Checks for the `WAVEFORMATEXTENSIBLE` SubFormat GUID that explicitly identifies Ambisonics.
    *   *Display*: "Yes (WAVEFORMATEXTENSIBLE)" or "No".
*   **BEXT Description**: Displays the Broadcast Wave Format (BWF) description tag.

**For Opus / Ogg / WebM / MKV Files:**
*   **Channel Mapping Family**: The Opus Channel Mapping Family index.
    *   *Values*: `Family 0` (Mono/Stereo), `Family 1` (Surround), `Family 2` (Ambisonics), `Family 3` (Discrete).
*   **Header Gain**: The Output Gain value stored in the Opus header (in dB).

**For MP4 / MOV / CAF Files:**
*   **Core Audio Layout Tag**: The Apple Core Audio channel layout identifier.
    *   *Values*: `HOA_ACN_SN3D`, `HOA_ACN_N3D`, `Ambisonic_B_Format`, `Use Channel Bitmap`.
*   **SA3D Atom Present**: Checks for the `SA3D` (Spatial Audio 3D) atom required for YouTube spatial audio in MP4 containers.
    *   *Display*: "Yes" or "No".

**For Video Files:**
*   **Projection Type**: The 360° video projection format.
    *   *Values*: `Equirectangular`, `Cubemap`, `Mesh`, `None (Flat)`.
*   **Stereo Mode**: The 3D stereoscopic layout.
    *   *Values*: `Monoscopic (2D)`, `Stereoscopic Top-Bottom`, `Stereoscopic Left-Right`.

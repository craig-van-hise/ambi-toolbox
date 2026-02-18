# Ambix2Bin Binaural Decoding Report

## Overview
This report details the binaural decoding algorithm implemented in the **Ambix2Bin** tool within AmbiToolbox. The tool converts Ambisonic B-Format audio (AmbiX / SN3D) into Binaural Stereo using a **Virtual Speaker Approach (VSA)** with **Least-Squares Modal Projection**.

## key Characteristics
- **Input Format**: AmbiX (ACN channel ordering, SN3D normalization).
- **Output Format**: Binaural Stereo (WAV).
- **Method**: Frequency-Domain Virtual Speaker Decoding.
- **HRTF Basis**: SOFA (Spatially Oriented Format for Acoustics) files.
- **Optimization**: Two-Pass Normalization and Max-rE Weighting.

## Algorithm Breakdown

The decoding process is handled by the `saf_wrapper.py` script and follows these stages:

### 1. Initialization & SOFA Loading
- The user selects an HRTF profile (points to a `.sofa` file).
- The script loads the Impulse Responses (IRs) and Source Positions from the SOFA file.
- **Coordinate System**: Converts SOFA coordinates to Radians (Azimuth, Elevation).

### 2. Decoder Generation (Preparation)
The tool dynamically generates a decoding matrix based on the input Ambisonic Order ($N$), where $N = \sqrt{Channels} - 1$.

#### A. Virtual Speaker Grid
A **Fibonacci Sphere** distribution is used to create a uniform grid of virtual speakers.
- **Number of Virtual Speakers ($V$)**: Formula used is $V = (N+1)^2 \times 2 + 8$.
- This ensures an over-determined system for stable projection.

#### B. HRTF Matching
For each virtual speaker position, the algorithm searches the loaded SOFA data for the **Nearest Neighbor** HRTF measurement.

#### C. Spherical Harmonic Projection (The Core)
The algorithm projects the virtual speaker HRTFs into the Spherical Harmonic (SH) domain.
1. Computes the SH matrix ($Y_{virt}$) for the virtual speaker positions.
2. Calculates the **Pseudo-Inverse** ($D_{dec}$) of $Y_{virt}$.
3. Projects the Virtual HRTFs into the SH domain:
   $$ H_{SH} = D_{dec} \times H_{virt} $$
   This results in a set of **Modal HRTF Filters** ($H_{SH}$) that represent the HRTF set as Spherical Harmonics.

#### D. Max-rE Weighting
To improve spatial localization and reduce high-order side-lobes (which can cause phasey artifacts), **Max-rE weighting** is applied to the SH-domain filters.
- Weights are calculated as $g_n = \cos(n \pi / (2N + 2))$.
- These are applied per order $n$.

### 3. Audio Processing (Two-Pass Render)

The actual audio processing simulates the binaural signal by convolving the input Ambisonics with the Modal HRTFs in the frequency domain.

#### Pass 1: Analysis & Peak Detection
- The input audio is processed in blocks (default 4096 samples).
- **FFT Convolution**:
  - Input block $\xrightarrow{FFT}$ Frequency Domain.
  - Multiplied by the Modal HRTFs ($H_{SH}$).
  - $\xrightarrow{IFFT}$ Time Domain.
- **Peak Tracking**: The maximum absolute amplitude of the rendered signal is tracked globally.

#### Pass 2: Rendering & Normalization
- The Gain factor is calculated to normalize the global peak to **-0.2 dB** (0.98 linear).
  $$ Gain = 0.98 / Peak_{global} $$
- The audio is processed again effectively identical to Pass 1.
- The output is scaled by the calculated `Gain`.
- Written to disk as a 2-channel WAV file.

## Technical Summary
| Feature | Implementation Detail |
| :--- | :--- |
| **Language** | Python (NumPy, SciPy) |
| **FFT Implementation** | `scipy.fft.rfft` / `irfft` |
| **Ambisonic Norm** | SN3D |
| **Decoding Matrix** | Least-Squares (Pseudo-Inverse) |
| **Spatial Tapering** | Max-rE |
| **Latency** | None (File-based offline processing) |

## Conclusion
The Ambix2Bin tool uses a robust, scientifically standard approach to binaural decoding. By projecting HRTFs into the Spherical Harmonic domain and using a dense virtual speaker grid, it achieves a stable and high-quality binauralization that adapts automatically to the input order of the Ambisonic file. The addition of Max-rE weighting ensures focused localization, while the two-pass normalization guarantees a distortion-free output.

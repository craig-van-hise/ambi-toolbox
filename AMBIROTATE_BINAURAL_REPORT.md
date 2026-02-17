# AmbiRotate: Binaural Playback & Monitoring Report

This report details the technical implementation of audio monitoring and binaural rendering within the **AmbiRotate** tool and the closely related **Ambix2Bin** engine.

## 1. Real-Time Monitoring (AmbiRotate)

The real-time monitoring experienced while using the AmbiRotate sliders is handled natively in the browser/Electron renderer via the Web Audio API.

*   **Implementation File:** `src/tools/AmbiRotate/NativeRotator.ts`
*   **Method:** **Mid-Side (W-Y) Stereo Downmix**
*   **HRTF Usage:** **NONE**
*   **Technical Detail:** 
    The "Binaural Monitor" in the UI actually implements a simplified First-Order Ambisonics (FOA) to Stereo decode. It creates two virtual cardioid microphones pointing Left and Right:
    - **Left Channel:** $W + Y$
    - **Right Channel:** $W - Y$
    - *Note:* While effective for checking rotation (Yaw/Pitch/Roll), it does not provide true spatial height or rear-imaging provided by HRTFs.

## 2. Offline Binaural Conversion (Ambix2Bin)

When a "Render" or "Convert" action is triggered for binaural output, the application switches to a high-fidelity Python-based rendering engine.

*   **Implementation File:** `electron/handlers/scripts/saf_wrapper.py`
*   **Method:** **Least-Squares (LS) Modal Projection**
*   **HRTF Usage:** **YES (SOFA Files)**
    - Uses **Neumann KU100** or **MIT KEMAR** profiles by default.
    - Supports custom `.sofa` file loading.

### Algorithm Details
The rendering method used is a standard **SH-Domain (Modal) HRTF projection**:
1.  **Virtual Speaker Grid:** A Fibonacci Sphere is used to generate a distribution of virtual speaker points.
2.  **Least-Squares Projection:** The engine solves for a decoding matrix ($D$) using the pseudo-inverse of the Spherical Harmonic base at those virtual points: $D = (Y_{virt}^T)^{-1}$.
3.  **Modal Filter Generation:** Modal filters are built by projecting the HRIRs into the SH domain using the Least-Squares matrix.
4.  **Tapering (Max-rE):** To reduce high-order side-lobes and improve internal consistency, **Max-rE weights** are applied to the modal filters.

### Regarding TA and MagLS
- **MagLS (Magnitude Least Squares):** This specific term is **not found** in the codebase. The current implementation uses a complex linear least-squares projection rather than an optimization targeting magnitude response.
- **TA (Time Alignment):** This specific term is **not found** in the codebase. The engine relies on the raw phase/delay information contained within the SOFA IRs.

---
**Report Generated:** February 17, 2026
**Status:** Implementation Verified via Code Audit.

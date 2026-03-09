# FAILURE REPORT: Binaural DSP & Spatialization (PRP #79)

**Date:** 2026-02-17
**Related PRPs:** #75, #76, #77, #78, #79

## 1. Goal
Achieve mathematically accurate, standard-volume binaural decoding of 3rd Order Ambisonics (16 channels) using FFmpeg's `pan` and `sofalizer` filters. The rendering must effectively map 16 ACN/SN3D channels to a 14-point Lebedev spherical grid (plus padding) and convolve them with HRTF data (`.sofa`) without spatial distortion or volume loss.

## 2. Current State
**User Report:**
*   **Volume:** "Very low in apparent volume."
*   **Spatialization:** "Wrong (folded around like a pretzel)."

**Technical Configuration:**
*   **Grid:** 14-point Lebedev + 2 Silent Padding Channels (TFL, TFR).
*   **Input Layout:** Forced `-ch_layout 16c` to prevent FFmpeg from guessing `hexadecagonal` and remapping channels.
*   **Math:** Hardcoded SN3D weights (sin/cos based on node Az/El) with pre-calculated trig values.
*   **Normalization:** Two-pass "Pre-Scale" algorithm implemented to prevent FFmpeg from auto-normalizing the `pan` filter.
    *   Pass 1: Find max absolute sum of weights.
    *   Pass 2: Scale all weights so sum <= 1.0.
    *   Compensation: Global `volume` filter applied after `sofalizer` (`scaleFactor * 2.5`).
*   **HRTF Gain:** `gain=12` parameter added to `sofalizer`.
*   **Test Status:** `scripts/test-binaural.js` passes (transcodes successfully), but perceptual output is incorrect.

## 3. Attempted Fixes (Chronological)

### Attempt 1: 14-Point Lebedev Grid (PRP #75)
*   **Action:** Moved from 26-channel grid (unsupported by local FFmpeg) to 16-channel `hexadecagonal` layout using 14 Lebedev nodes + 2 silent padding channels.
*   **Result:** FFmpeg accepted the syntax, but spatialization was likely incorrect due to layout guessing.

### Attempt 2: Input Override & SN3D Math (PRP #76)
*   **Action:** Added `-ac 16` to force input channel count.
*   **Action:** Verified/Enforced degree-to-radian conversion in `matrix_utils.ts`.
*   **Result:** Pipeline stable, but still potentially incorrect mapping.

### Attempt 3: Hardcoded Math (PRP #77)
*   **Action:** Replaced dynamic SH generation loops with hardcoded Order 0-3 formulas to prevent "hallucinated trig" or algorithm errors.
*   **Result:** Math verified as strictly SN3D compliant.

### Attempt 4: Layout Unmapping & Gain (PRP #78)
*   **Action:** Replaced `-ac 16` with `-ch_layout 16c` (placed *before* `-i`) to stop FFmpeg from guessing `hexadecagonal` and shuffling channels (e.g., LFE mapping).
*   **Action:** Added `gain=12` to `sofalizer` filter.
*   **Result:** FFmpeg log showed "Guessed Channel Layout" disappeared. Volume still reportedly low/wrong.

### Attempt 5: Bypass Pan Normalization (PRP #79)
*   **Action:** Implemented two-pass normalization bypass.
    *   Calculated `maxAbsSum` of weights.
    *   Scaled `pan` weights down to avoid FFmpeg auto-attenuation.
    *   Added `volume` filter at the end of the chain to restore level.
*   **Result:** User reports audio is still "low" and "folded pretzel" spatialization. This suggests the fundamental mapping of ACN channels to the virtual speakers, or the `sofalizer`'s interpretation of those speakers, remains flawed.

## 4. Potential Root Causes (Hypothesis)
*   **Sofalizer Speaker Mapping:** Even if we feed correct 16 channels, `sofalizer` might be expecting a standard layout (like 9.1.6 or similar) for its input, or ignoring our implicit speaker positions if not explicitly mapped in a way it understands.
*   **Lebedev Grid Mismatch:** The 14-point grid might not align with valid HRTF interpolation points in the specific SOFA file being used, or `sofalizer` is failing to interpolate correctly between them.
*   **Phase/Sign Error:** Despite correct magnitudes, a sign flip in one axis (Y/Z/X) could cause the "pretzel" folding effect.
*   **Double Processing:** Is the `volume` filter or `gain=12` interacting poorly?
*   **Channel Ordering:** Is `-ch_layout 16c` truly preserving ACN 0-15 order, or is there still an underlying reordering happening at the decoder level?


Based on FAILURE_REPORT_PRP79.md and PRP #79, here are the scripts relevant to the binaural DSP normalization failure:

1. Core Logic (Backend)
electron/handlers/matrix_utils.ts
Role: Generates the FFmpeg filter graph.
Relevance: Contains the getPanFilter function, the Lebedev Grid definition, the hardcoded SN3D math, and the (currently implemented) two-pass normalization logic.
2. Implementation (Main Process)
electron/main.ts
Role: Runs the HTTP "Binaural Streaming Server" (lines 77-200).
Relevance: Consumes getPanFilter, spawns the live FFmpeg process, and applies the final volume filter based on the returned scaleFactor.
3. Verification
scripts/test-binaural.js
Role: Standalone test harness.
Relevance: Mocks the filter graph generation to isolate and verify FFmpeg behavior outside of the Electron app. Used to reproduce the "Volume" and "Spatialization" issues.
4. Helpers (Context)
electron/handlers/common.ts
Role: Utilities for paths.
Relevance: Provides getFfmpegPath and getSofaAssetPath used by main.ts and matrix_utils.ts.
Good
Bad
Review Changes






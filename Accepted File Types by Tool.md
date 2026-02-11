# Accepted File Types by Tool

## Overview

The AmbiToolbox employs a "funnel" approach to file acceptance:
1.  **Frontend (UI):** The `SmartDropZone` component acts as the first gatekeeper.
2.  **Backend (Handlers):** The Electron main process handles the actual processing, often relying on FFmpeg or specific binaries.

### Frontend Acceptance (Universal)

Currently, **all tools** share the same input validation logic in the user interface.
The `SmartDropZone` component accepts the following extensions by default:

*   `.wav`
*   `.amb` (Ambisonic exchange format, typically WAV with specific metadata)
*   `.caf` (Core Audio Format)
*   `.opus`
*   `.ogg`
*   `.mp3`
*   `.aac`
*   `.flac`

> **Note:** While the UI allows these files to be dropped, the success of the operation depends on the backend tool's capability to read them.

---

## Tool-Specific Backend Capabilities

### 1. FFmpeg-Based Tools (High Compatibility)
These tools use a custom build of FFmpeg (v6.1 LGPL) for processing. They inherit FFmpeg's broad input compatibility and **can accept virtually any audio format** passed from the frontend (WAV, FLAC, MP3, AAC, OGG, OPUS, CAF), provided the file contains valid audio streams.

*   **Ambix2Opus**
    *   **Input:** Any FFmpeg-supported audio.
    *   **Constraint:** Requires multi-channel input (>=4 channels) for Ambisonic mapping, but will process stereo/mono as discrete channels.
*   **AmbiOrder**
    *   **Input:** Any FFmpeg-supported audio.
    *   **Constraint:** Requires enough channels to match the target order (e.g., must have >4 channels to reduce to 1st Order).
*   **AmbiSwap**
    *   **Input:** Any FFmpeg-supported audio.
    *   **Constraint:** Logic rigidly expects 4, 9, or 16 channels. Intermediate channel counts (e.g., 6) will trigger an error.
*   **Ambix2CAF**
    *   **Input:** Any FFmpeg-supported audio.
*   **Ambix2Ogg**
    *   **Input:** Any FFmpeg-supported audio.
    *   **Special Behavior:** If input is `.opus` or `.ogg`, it performs a **stream copy** (remux) instead of transcoding.
*   **AmbiTrim**
    *   **Input:** Any FFmpeg-supported audio.
    *   **Constraint:** Uses `stream copy` (`-c copy`). This requires the output container to support the input codec. Since the tool preserves the input file extension, this is generally safe.

### 2. Python-Based Tools (Medium Compatibility)
These tools use Python scripts with the `soundfile` library (based on `libsndfile`) and `numpy`.

*   **Ambix2Bin**
    *   **Input:** WAV, FLAC, OGG, MAT.
    *   **Constraint:** `libsndfile` is robust but supports fewer exotic formats than FFmpeg (e.g., might struggle with specific MP3 implementations or AAC without extra libraries). **Recommended: WAV / FLAC / CAF.**
*   **AmbiRotate**
    *   **Input:** WAV, FLAC, OGG.
    *   **Constraint:** Similar to Ambix2Bin. Heavily optimized for PCM data (WAV).

### 3. Binary-Specific Tools (Stricter Compatibility)
These tools rely on external binaries provided by third parties (Google, Apple).

*   **Ambix2IAMF**
    *   **Backend:** `iamf-enc` (Google)
    *   **Input:** **WAV (PCM) Recommended.**
    *   **Risk:** The handler passes the input directory directly to the encoder. `iamf-enc` is strictly designed for WAV input. Passing compressed formats (MP3, AAC) will likely result in a failure.
*   **Ambix2APAC**
    *   **Backend:** `apac-enc` (Apple / wrapper around usage of AVFoundation)
    *   **Input:** **WAV / CAF (PCM) Recommended.**
    *   **Risk:** Relies on Apple's Core Audio/AVFoundation. While it can decode many formats, the encoder expects clean PCM data for high-order Ambisonics.

## Summary Table

| Tool | Frontend Validation | Backend Engine | Best Practice Input | Capable of converting MP3/AAC? |
| :--- | :--- | :--- | :--- | :--- |
| **Ambix2Opus** | Standard* | FFmpeg | WAV/CAF/FLAC | ✅ Yes |
| **Ambix2Bin** | Standard* | Python (`soundfile`) | WAV/FLAC | ⚠️ Likely (libsndfile dependent) |
| **Ambix2IAMF** | Standard* | `iamf-enc` | **WAV Only** | ❌ No (Likely Fail) |
| **AmbiOrder** | Standard* | FFmpeg | Any | ✅ Yes |
| **AmbiSwap** | Standard* | FFmpeg | Any | ✅ Yes |
| **AmbiRotate** | Standard* | Python (`soundfile`) | WAV/FLAC | ⚠️ Likely |
| **Ambix2CAF** | Standard* | FFmpeg | Any | ✅ Yes |
| **Ambix2APAC** | Standard* | `apac-enc` (Apple) | WAV/CAF | ⚠️ System Dependent |
| **Ambix2Ogg** | Standard* | FFmpeg | Any | ✅ Yes |
| **AmbiTrim** | Standard* | FFmpeg (Copy) | Any | ✅ Yes |

*\*Standard = .wav, .amb, .caf, .opus, .mp3, .aac, .flac, .ogg*

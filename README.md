# AmbiToolbox (Electron Monolith)

**AmbiToolbox** is a unified spatial audio utility suite for macOS, built with **Electron, React, and TypeScript**.
It consolidates multiple audio conversion tools into a single, modular application.

## 🛠 Features

### Ready & Active
1.  **Ambix2Opus**: Convert Ambisonics (.wav/.amb) to Opus (.opus) with proper channel mapping (Family 2).
    -   Supports 1st, 2nd, 3rd, 4th Order.
    -   Configurable quality.
2.  **Ambix2Bin**: Render Ambisonics to Binaural Stereo using SOFA HRTF files.
    -   Built-in Neumann KU100 and KEMAR profiles.
3.  **Ambix2IAMF**: Encode Ambisonics to IAMF (Immersive Audio Model and Formats).
    -   Generates Type 2 (Ombisonic) IAMF streams.
4.  **Ambix2CAF**: Convert to Apple CAF format (Discrete or HOA/ACN Layouts).
5.  **Ambix2APAC**: Encode Ambisonics to Apple Spatial Audio Codec (APAC) for visionOS.
    -   Native macOS 14+ encoder.
6.  **AmbiOrder**: Reduce Ambisonic Order (e.g., 3rd -> 1st) with dynamic input detection.
7.  **AmbiSwap**: Convert between ACN/SN3D (AmbiX) and FuMa (MaxN).
    -   *Crucial*: Enforced 24-bit PCM output to prevent gain-normalization data loss.
8.  **AmbiRotate**: Real-time Rotation Preview.
    -   **Hybrid Native Engine**: 
        -   **Order 1 (Ch 1-3)**: Full 3-Axis Matrix (Yaw/Pitch/Roll).
        -   **Order >1 (Ch 4+)**: Infinite-Order Sectorial Yaw (Optimized).
    -   **Monitoring**: Binaural stereo downmix for instant feedback.
9.  **Smart Persistence**: Remembers your last active tool and tool-specific settings (bitrate, HRTF, rotation) between sessions.
    -   **Crash-Safe**: Robust legacy settings handling.
    -   **Queue Safety**: File queue is explicitly cleared on relaunch.

## 🚀 Getting Started

### Prerequisites
-   **Node.js** (v18+)
-   **Python 3** (for Ambix2Bin binaural rendering backend)

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running in Development
```bash
npm run dev
```
(Binaries for ffmpeg/ffprobe/iamf-enc are expected in `assets/bin/`)

### Building for Production
```bash
npm run build
```
The output can be found in `release/` or `dist/`.

## 🏗 Architecture

-   **Frontend**: React + TypeScript + TailwindCSS (`src/`)
-   **Backend**: Electron Main Process (`electron/`)
    -   **Handlers**: `electron/handlers/` (Business logic for each tool)
    -   **Bridge**: `electron/preload.ts` (Unified Bridge: `window.electron` and `window.electronAPI`)
    -   **Python Extension**: `py/ambi_rotate.py` (Active backend for AmbiRotate)
-   **Cleanup**: Legacy/Vestigial files moved to `xCleanup/` (Gitignored).

## 🧪 Testing

Run integration tests for the backend logic:
```bash
npm run test
```

---

##  Ambix2APAC: Apple Dependencies & Requirements

The **Ambix2APAC** tool utilizes the native Apple Positional Audio Codec (APAC) to provide high-fidelity spatial audio compression optimized for the Apple Vision Pro and visionOS ecosystem. Because this tool relies on proprietary Apple frameworks, the following requirements must be met:

### 1. Operating System Requirements

* **Encoding (macOS):** Requires **macOS 14.0 (Sonoma)** or later. The system-level APAC encoder was officially introduced to support visionOS development workflows.
* **Playback (Target Devices):**
* **Apple Vision Pro:** Supported natively on all versions of visionOS.
* **iOS/iPadOS:** Requires **iOS 17.0+** or **iPadOS 17.0+** for native APAC decoding.
* **macOS:** Requires **macOS 14.0+** for playback via AVFoundation-based applications.

### 2. Technical Capabilities

* **Ambisonic Orders:** The native system encoder currently supports **1st (4ch), 2nd (9ch), and 3rd (16ch)** order Ambisonics. Support for up to **5th order (36ch)** is available in specific profiles.
* **Channel Layout:** This tool strictly enforces the **HOA_ACN_SN3D** (High-Order Ambisonics, ACN ordering, SN3D normalization) layout tag, which is the mandatory metadata standard for Apple's spatial audio rendering.
* **Recommended Bitrates:** * **1st Order:** ~384 kbps (total).
* **3rd Order:** ~768 kbps (total).
* *Note: Our implementation uses a "Per-Channel" logic (e.g., 96kbps/ch) to maintain consistent quality across all orders.*

### 3. Build & Development Requirements

* **Swift Environment:** Compilation of the `apac-enc` sidecar requires **Xcode 15.0+** or the **Command Line Tools for Xcode 15.0+** to access the necessary Core Audio headers.
* **Frameworks Used:** * `AVFoundation`: For high-level media writing (`AVAssetWriter`).
* `AudioToolbox`: For low-level codec identifiers and channel layout tagging.

### 4. Hardware Support

* **Apple Silicon Recommended:** While Intel Macs running macOS 14+ can technically encode APAC, **Apple Silicon (M1/M2/M3/M5)** is highly recommended for optimal performance when processing high-order (3rd+) spatial audio files.
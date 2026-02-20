
# AmbiToolbox

**AmbiToolbox** is a unified spatial audio utility suite for macOS, built with **Electron, React, and TypeScript**.
It consolidates multiple audio conversion tools into a single, modular application.

## 🎯 Purpose & Workflow

AmbiToolbox is designed to act as a "Swiss Army Knife" for spatial audio production pipelines. While Ambisonics is a powerful format, working with it often requires opening heavy Digital Audio Workstations (DAWs) for simple tasks or memorizing complex FFmpeg arguments in the command line.

This suite eliminates those bottlenecks, allowing audio engineers to process, convert, and QC spatial audio assets in a standalone environment. It is built to save time on repetitive tasks and ensure interoperability between different spatial audio standards.

### Common Use Cases

* **Vision Pro & Apple Ecosystem Delivery:** Rapidly encode master files into the **APAC** codec (Apple Spatial Audio) or **CAF** containers without navigating Xcode scripts or DAW render queues.
* **Web & VR Optimization:** Compress high-order Ambisonics into **Opus** (Ogg) using **Ambix2Opus** with correct channel mapping for web-based VR players, reducing file size while maintaining spatial fidelity.
* **Instant Quality Control (QC):** Quickly render a binaural downmix using **Ambix2Bin** to check a mix on headphones without loading a DAW session or setting up a routing matrix.
* **Format Rescue:** Solve "wrong channel order" or "wrong normalization" issues by instantly swapping between **AmbiX (ACN/SN3D)** and **FuMa** formats using **AmbiSwap** without data loss.
* **Next-Gen Streaming Delivery:** Prepare assets for modern open-standard streaming (like YouTube or Samsung devices) by encoding to **IAMF** (Immersive Audio Model and Formats) using **Ambix2IAMF**.
* **Asset Downscaling:** Use **AmbiOrder** to reduce a 3rd Order master file into 1st Order for mobile game engines (Unity/Unreal) or hardware with limited channel counts.
* **Orientation Correction:** Fix recordings made with a misaligned or upside-down microphone by applying 3-axis rotation (Yaw/Pitch/Roll) in real-time with **AmbiRotate** before committing to a new file.
* **Lossless Trimming:** Use **AmbiTrim** to cut unwanted sections from massive multi-channel master files without re-encoding, preserving the original audio data bit-for-bit.
* **Unified Transport Flow:** Seamlessly switch between tracks with **"Double-Click to Play"** and **Previous/Next** navigation. Features a surgical transport reset logic and **Scrubber Auto-Resume** to ensure a fluid monitoring experience.


---

## 🛠 Features

### Tools

1. **Ambix2Opus**: Convert Ambisonics (.wav/.amb) to Opus (.opus) with proper channel mapping (Family 2).
* Supports 1st, 2nd, 3rd, 4th Order.
* Configurable quality.


2. **Ambix2Bin**: Render Ambisonics to Binaural Stereo using SOFA HRTF files.
* Built-in Neumann KU100 and KEMAR profiles (fixed path resolution).
* Powered by custom FFmpeg build with `sofalizer` support.


3. **Ambix2IAMF**: Encode Ambisonics to IAMF (Immersive Audio Model and Formats).
* Generates Type 2 (Ombisonic) IAMF streams.


4. **Ambix2CAF**: Convert to Apple CAF format (Discrete or HOA/ACN Layouts).
5. **Ambix2APAC**: Encode Ambisonics to Apple Spatial Audio Codec (APAC) for visionOS.
* Native macOS 14+ encoder.


6. **AmbiOrder**: Reduce Ambisonic Order (e.g., 3rd -> 1st) with dynamic input detection.
7. **AmbiSwap**: Convert between ACN/SN3D (AmbiX) and FuMa (MaxN).
* *Crucial*: Enforced 24-bit PCM output to prevent gain-normalization data loss.


8. **AmbiRotate**: Real-time Rotation Preview.
* **Hybrid Native Engine**:
* **Order 1 (Ch 1-3)**: Full 3-Axis Matrix (Yaw/Pitch/Roll).
* **Order >1 (Ch 4+)**: Infinite-Order Sectorial Yaw (Optimized).
* *Monitoring*: Real-time **Binaural Rendering** (Google OBR) via internal HTTP streaming server.


9. **AmbiTrim**: Lossless trimming for high-channel-count files.
* Proxy workflow (Mid-Side stereo) for instant waveform editing.
* **Stream Copy**: Output uses `-c copy` to preserve original codec and bit depth.


10. **AmbiData**: Comprehensive file analysis and metadata inspection.
*   **Adaptive UI**: 5-Card Layout with dynamic stream selection.
*   **IAMF Support**: Deep analysis of IAMF OBU structures (Scene-Based/Channel-Based).
*   **Metrics**: EBUR128 loudness (Integrated, LRA, True Peak) and signal health (clipping, DC offset).
*   **Heuristics**: Python-based spatial format prediction (AmbiX/FuMa) for WAV/AmbiX.


11. **Ambix2Ogg**: Ambisonic Ogg/Opus Wrapper.
* **Smart Transcode**: Converts WAV/AMB to Opus with mapping family 2.
* **Instant Remux**: Detects existing Opus files and wraps them in Ogg container without re-encoding (Pass-Through).


## 🚀 Getting Started

### Prerequisites

* **Node.js** (v18+)
* **Python 3** (for Ambix2Bin binaural rendering backend)

### Installation

1. Clone the repository.
2. Install dependencies:
```bash
npm install

```



### Running in Development

```bash
npm run dev

```

(Binaries for ffmpeg/ffprobe/iamf-enc/obr_stream are expected in `assets/bin/`)

### Building for Production

```bash
npm run build
```

The output can be found in `release/` (DMG/Installer) or `dist/` (Web bundle).

## 🏗 Architecture

* **Frontend**: React + TypeScript + TailwindCSS (`src/`)
* **Backend**: Electron Main Process (`electron/`)
* **Handlers**: `electron/handlers/` (Modular Handler Pattern)
* **Bridge**: `electron/preload.ts` (Unified Bridge: `window.electron` and `window.electronAPI`)
* **Sidecars**: `src/cpp/` (C++ Native Addons/Binaries - Google OBR)
* **Python Subsystem**: `resources/scripts/` (NumPy/Audio Processing scripts)
* **Unified UI Pattern**: All tools use a shared resizable partition system in `src/components/ToolViews.tsx` and a consolidated **Unified FileQueue** in `src/components/FileQueue.tsx`.
* **Streaming Engine**: Precise 3-stage OBR pipeline (`Decoder` -> `OBR` -> `Encoder`) with EPIPE-hardened inter-process piping.

* **Cleanup**: Legacy/Vestigial files moved to `xCleanup/` (Gitignored).
* **Workflows**: Extensive automation workflows available in `.agent/workflows/` for project management and CI tasks.

## 📂 Project Structure

```text
|  ├── main.tsx
|  ├── tools
|  ├── types.ts
|  ├── utils
|  └── vite-env.d.ts
├── tailwind.config.js
├── test_000007.iamf
├── test_iamf_parser.py
├── test_output
|  └── trim_tests
├── test_output.webm
├── tests
|  ├── 3rd Order Ambi Clock Test.wav
|  ├── check_hrtf_delay.py
|  ├── check_hrtf_energy.py
|  ├── check_netcdf_clean.py
|  ├── debug_rotation_sweep.py
|  ├── gen_test_signal.py
|  ├── handlers.test.ts
|  ├── manual_test_out.wav
|  ├── sweep_in.wav
|  ├── sweep_out.wav
|  ├── test_16ch.wav
|  ├── test_coords.py
|  ├── test_math.py
|  ├── test_saf.py
|  ├── transport_sm.test.ts
|  └── trim.test.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
└── xCleanup
   ├── legacy_apps
   └── legacy_libs
```

## 🧪 Testing

Run integration tests for the backend logic:

```bash
npm run test

```

---

##  Ambix2APAC: Apple Dependencies & Requirements

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
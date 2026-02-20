
/Users/vv2024/Documents/AI Projects/Spatial Audio/AmbiToolbox
├── ### The "Clean Blueprint" Infographic Style Guide.md
├── 2026-02-07_REPO_REPORT.md
├── AMBIROTATE_BINAURAL_REPORT.md
├── AMBIX2BIN_REPORT.md
├── Accepted File Types by Tool.md
├── AmbiData file types list.md
├── EULA.md
├── FAILURE_REPORT_PRP79.md
├── LICENSE
├── NOTICE.txt
├── PROJECT_CONTEXT_BUNDLE.md
├── PROJECT_STATE.md
├── PROJECT_STATE_AmbiData.md
├── README.md
├── README_AmbiData.md
├── assets
|  ├── Jost-700-Bold.ttf
|  ├── MaterialIcons-Regular.ttf
|  ├── Montserrat-Variable.ttf
|  ├── Roboto-Regular.ttf
|  ├── ambisonics_icon.svg
|  ├── bin
|  |  ├── __MACOSX
|  |  ├── apac-enc
|  |  ├── ffmpeg
|  |  ├── ffprobe
|  |  ├── iamf-enc
|  |  └── obr_stream
|  ├── bin_evermeet
|  |  └── ffmpeg
|  ├── ffmpeg80arm.zip
|  ├── ffmpeg_evermeet.zip
|  ├── hrtf
|  |  ├── H3_48K_24bit_256tap_FIR_SOFA.sofa
|  |  ├── MIT_KEMAR_Normal.sofa
|  |  └── Neumann_KU100_48k.sofa
|  ├── ic_check.svg
|  ├── ic_dark_mode.svg
|  ├── ic_error.svg
|  ├── ic_folder_open.svg
|  ├── ic_folder_upload.svg
|  ├── ic_light_mode.svg
|  ├── ic_music.svg
|  ├── ic_settings.svg
|  └── vv_logo.png
├── electron
|  ├── electron-env.d.ts
|  ├── handlers
|  |  ├── AmbiData.ts
|  |  ├── AmbiOrder.ts
|  |  ├── AmbiRotate.ts
|  |  ├── AmbiSwap.ts
|  |  ├── Ambix2APAC.ts
|  |  ├── Ambix2Bin.ts
|  |  ├── Ambix2CAF.ts
|  |  ├── Ambix2IAMF.ts
|  |  ├── Ambix2Ogg.ts
|  |  ├── Ambix2Opus.ts
|  |  ├── IamfParser.ts
|  |  ├── ObrHandler.ts
|  |  ├── WaveParser.ts
|  |  ├── common.ts
|  |  ├── iamf-config-generator.ts
|  |  ├── index.ts
|  |  ├── scripts
|  |  |  ├── requirements.txt
|  |  |  └── saf_wrapper.py
|  |  └── trim.ts
|  ├── main.ts
|  ├── preload.ts
|  └── shim.ts
├── electron-builder.json5
├── guides
|  ├── IAMF (Immersive Audio Model and Formats) : Eclipsa Audio Ecosystem.png
|  ├── IAMF Metadata.png
|  ├── IAMF Muxing Workflow.png
|  └── iamf.html
├── index.html
├── llms.txt
├── make_repo_map.py
├── native
|  └── apac-enc
|     └── main.swift
├── package-lock.json
├── package.json
├── postcss.config.js
├── project_tree.txt
├── public
|  ├── ambisonics.js
|  ├── electron-vite.animate.svg
|  ├── electron-vite.svg
|  ├── js
|  |  └── JSAmbisonics.min.js
|  └── vite.svg
├── py
|  ├── ambi_data_heuristics.py
|  └── ambi_rotate.py
├── repo-map.md
├── resources
|  └── scripts
|     └── rotator.py
├── scripts
|  ├── test-auto-resume.ts
|  ├── test-binary-paths.ts
|  ├── test-binaural.js
|  ├── test-file-switch-autoplay.ts
|  ├── test-frontend-url.ts
|  ├── test-hard-swap.ts
|  ├── test-obr-pipeline.js
|  ├── test-queue-click.ts
|  ├── test-seek-accuracy.ts
|  ├── test-seek-debounce.ts
|  ├── test-server.ts
|  ├── test-stream-start.ts
|  └── verify-stream-endpoint.js
├── src
|  ├── App.css
|  ├── App.tsx
|  ├── assets
|  |  └── react.svg
|  ├── components
|  |  ├── DropZone.tsx
|  |  ├── FileQueue.tsx
|  |  ├── Modal.tsx
|  |  ├── SettingsModal.tsx
|  |  ├── Sidebar.tsx
|  |  ├── SmartDropZone.tsx
|  |  ├── ToolViews.tsx
|  |  ├── Transport.tsx
|  |  └── tools
|  |     ├── AmbiTrim.css
|  |     ├── AmbiTrim.tsx
|  |     └── TimeInput.tsx
|  ├── constants.ts
|  ├── contexts
|  |  ├── PlaybackContext.tsx
|  |  ├── SettingsContext.tsx
|  |  └── ToolStateContext.tsx
|  ├── cpp
|  |  ├── CMakeLists.txt
|  |  ├── obr_stream.cc
|  |  └── vendor
|  |     └── obr
|  |        ├── BUILD
|  |        ├── CMakeLists.txt
|  |        ├── CONTRIBUTING.md
|  |        ├── LICENSE
|  |        ├── MODULE.bazel
|  |        ├── PATENTS
|  |        ├── README.md
|  |        ├── WORKSPACE
|  |        ├── docs
|  |        ├── external
|  |        └── obr
|  ├── index.css
|  ├── main.tsx
|  ├── tools
|  |  ├── AmbiData
|  |  |  ├── components
|  |  |  |  ├── Inspector.tsx
|  |  |  |  └── InspectorComponents.tsx
|  |  |  ├── index.tsx
|  |  |  ├── index.tsx.bak
|  |  |  └── types.ts
|  |  └── AmbiRotate
|  |     ├── NativeRotator.ts
|  |     ├── components
|  |     |  ├── Knob.tsx
|  |     |  └── Timeline.tsx
|  |     └── index.tsx
|  ├── types.ts
|  ├── utils
|  |  ├── WavDecoder.ts
|  |  └── time-formatters.ts
|  └── vite-env.d.ts
├── tailwind.config.js
├── test_000007.iamf
├── test_iamf_parser.py
├── test_output
|  └── trim_tests
|     └── output
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
|  ├── obr_pipeline.test.ts
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
└── vitest.config.ts

directory: 1579 file: 10875 symboliclink: 4

ignored: directory (193)


[2K[1G# AmbiToolbox - Project State Report

**Date:** February 20, 2026 (Updated 17:58)
**Architecture:** Electron Modular Monolith

## 1. Executive Summary
The **AmbiToolbox** has been successfully re-architected into a unified **Electron application**. This move consolidates the previously disparate Python and Swift utilities into a single, cohesive interface built with **React** (Frontend) and **TypeScript** (Backend Handlers).

**Global Status:** 🟢 **Operational / In Active Development**

## 2. Component Status

| Component | Status | Backend Implementation | Notes |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | 🟢 Ready | React + Tailwind | Scoped Progress, Auto-Scroll, Drag & Drop. |
| **Transport UI** | 🟢 Ready | `src/components/Transport.tsx` | **Frontend Complete**: Condensed UI, Icons, Settings Modal. **Backend Ready**: Playback logic wired to `electron/main.ts` streaming server (Stereo Downmix). |
| **Ambix2Opus** | 🟢 Ready | `electron/handlers/Ambix2Opus.ts` | Uses `ffprobe` for robust channel detection. |
| **Ambix2Bin** | 🟢 Ready | `electron/handlers/Ambix2Bin.ts` | Uses **Neumann KU100 (CC-BY)** & **MIT KEMAR** HRTFs. Fixed static path resolution and enum alignment. |
| **Ambix2IAMF** | 🟢 Ready | `electron/handlers/Ambix2IAMF.ts` | Generates textproto config and runs `iamf-enc`. |
| **AmbiOrder** | 🟢 Ready | `electron/handlers/AmbiOrder.ts` | Uses `channelmap` filter. Dynamic Order Detection. Fixed FFmpeg syntax. |
| **AmbiSwap** | 🟢 Ready | `electron/handlers/AmbiSwap.ts` | Supports 1st-3rd Order. Enforces 24-bit PCM. |
| **AmbiRotate** | 🟢 Ready | `py/ambi_rotate.py` (NumPy) | Chunked Processing for Memory Efficiency. Real-time Progress. **Fixed Infinite Loop** |
| **Ambix2CAF** | 🟢 Ready | `electron/handlers/Ambix2CAF.ts` | Supports Discrete & HOA Layouts. |
| **Ambix2Ogg** | 🟢 Ready | `electron/handlers/Ambix2Ogg.ts` | Smart Transcode/Remux. Permission Checks. |
| **AmbiTrim** | 🟢 Ready | `electron/handlers/trim.ts` | Proxy Workflow (Mid-Side), Lossless Cut (`-c copy`), WaveSurfer Regions. |
| **AmbiData** | 🟡 In Dev | `electron/handlers/AmbiData.ts` | **Active Development**: Requires extensive work on progressive reporting and UI stability. |
| **Persistence** | 🟢 Ready | `src/contexts/SettingsContext.tsx` | Saves active tool, bitrates, layouts, and rotation values. |
| **Global Queue** | 🟢 Ready | `src/components/FileQueue.tsx` | **Unified**: Single shared component for all tools with folding/play indicators. |

## 3. Directory Structure (Architecture)

```text
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
|  ├── ambisonics.js
|  ├── electron-vite.animate.svg
|  ├── electron-vite.svg
|  ├── js
|  └── vite.svg
├── py
|  ├── ambi_data_heuristics.py
|  └── ambi_rotate.py
├── repo-map.md
├── resources
|  └── scripts
├── scripts
|  ├── test-auto-resume.ts
|  ├── test-binary-paths.ts
|  ├── test-binaural.js
|  ├── test-file-switch-autoplay.ts
|  ├── test-frontend-url.ts
|  ├── test-hard-swap.ts
|  ├── test-obr-pipeline.js
|  ├── test-queue-click.ts
|  ├── test-seek-accuracy.ts
|  ├── test-seek-debounce.ts
|  ├── test-server.ts
|  ├── test-stream-start.ts
|  └── verify-stream-endpoint.js
├── src
|  ├── App.css
|  ├── App.tsx
|  ├── assets
|  ├── components
|  ├── constants.ts
|  ├── contexts
|  ├── cpp
|  ├── index.css
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
|  ├── obr_pipeline.test.ts
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

-   **`src/`**: Frontend Source (React/Vite).
    -   `components/ToolViews.tsx`: Main UI for all tools (Consumes Global State).
    -   `components/FileQueue.tsx`: **Unified Queue** component (Merged Styles & Interaction).
    -   `components/Transport.tsx`: Audio transport controls (Play/Pause, Seek, Volume).
    -   `contexts/PlaybackContext.tsx`: Global audio state management.
-   **`electron/`**: Main Process Source.
    -   `handlers/`: Individual tool backend logic (Modular Handler Pattern).
    -   `main.ts`: Application entry point and IPC router.
    -   `shim.ts`: Bridge imports for handlers.
-   **`resources/scripts/`**: Python Subsystem.
    -   `ambi_rotate.py`: Ambisonic Rotation Script (NumPy + Scipy + SoundFile).
-   **`assets/`**: Static Resources (`bin/`, `hrtf/`).
-   **`xCleanup/`**: Quantined legacy files (Gitignored).
-   **`PRPs/`**: Project Rollout Proposals and historical logs.

## 4. Recent Logic Changes
-   **Transport Component Integration**:
    -   Added a compact, sticky footer for audio playback controls (`Transport.tsx`).
    -   Detailed UI features: Play/Pause/Stop/Seek, Volume Slider, **Settings Cog** (HRTF Profile), and **Headphones** toggle (Blue highlight).
    -   **Backend Ready**: `PlaybackContext` (Audio Element) streams from `http://localhost:45455/stream`. Currently provides robust **Stereo Downmix** (FFmpeg Native) for monitoring.
-   **Global Playback Context**: Created `PlaybackContext` to manage audio state (playing, looping, time, volume, hrtf) across the entire application.
-   **Global File Queue (Context)**: Implemented `ToolStateContext` to manage a unified file queue. Files dropped in AmbiData are now accessible in other tools and vice-versa.
-   **AmbiRotate Stability**: Fixed a critical infinite loop in `ToolViews.tsx` caused by redundant state updates. Memoized file array references for stability.
-   **AmbiData Refinements**:
    -   **Auto-Select**: Automatically selects the first file upon import.
    -   **UI Polish**: Replaced "Trash" icon with "CLEAR" text button. Standardized list item formatting (`filename.ext [Size]`).
    -   **Persistence**: Now uses the global file queue.
-   **Build System**: Restored missing `electron/shim.ts` to ensure successful builds.
-   **Ambix2Bin Custom HRTF**: Implemented "Load Custom .sofa..." feature. Users can now select arbitrary `.sofa` files via system dialog. Selection is persisted in `localStorage`.
-   **UI Refinements (Double Border/Colors)**: Implemented double-border effect for active sidebar tabs (White Outer + Tool Color Inner). Updated `Ambix2Ogg` to Pink and fixed `Ambix2Bin` dropdown focus color (White).
-   **Asset Compliance (PRP #73)**: Purged non-commercial HRTF files. Added **Neumann KU100** (CC-BY 4.0) and **MIT KEMAR** assets.
- **FFmpeg Recompilation (PRP #71)**: Recompiled custom **LGPL v2.1** build (Release 6.1) with `sofalizer` filter support (via local `libmysofa` build).
- **Ambix2Bin HRTF Fix**: Corrected SOFA path resolution (now points to `assets/hrtf`) and aligned frontend profile labels with backend logic.
- **AmbiTrim Repair (PRP #72)**: Verified backend functionality (stream copy/opus) manually after integration test flaw.
- **Settings Persistence**: Implemented `SettingsContext` to persist user preferences (HRTF, Bitrate, Rotation).
-   **Ambix2Ogg Implementation**: Added new tool for wrapping Ambisonics in Ogg containers. Supports both transcoding (Opus) and direct remuxing (Stream Copy).
-   **DropZone Label Refinement**: Updated all tool drop zones to display explicit, tool-specific file extension acceptance lists (e.g., ".wav, .opus accepted") instead of generic text.
-   **AmbiData IAMF Integration (PRP #85/86)**:
    -   Implemented robust OBU (Open Bitstream Unit) parser for IAMF files.
    -   **Adaptive UI**: Stream Selector now lists parsed OBU IDs (e.g. ID 108) instead of generic streams.
    -   **Data Binding**: Core specs (Channels, Order) now bind directly to the selected OBU's metadata, resolving "0 channel" bugs.
-   **Backend Demolition (PRP #81)**:
    -   **Removed**: Custom DSP matrix generation (`matrix_utils.ts`) and complex FFmpeg filter graphs (`pan`, `sofalizer`).
    -   **Simplified**: Streaming server now provides a safe, standard **Stereo Downmix** for all channel layouts to ensure stability.
-   **OBR Integration (PRP #82 - #89)**:
    -   **New Sidecar**: Integrated `obr_stream` (C++ binary based on Google OBR) for real-time binaural rendering.
    -   **Pipeline**: Implemented robust 3-stage pipeline (`Decoder` -> `OBR` -> `Encoder`) in `ObrHandler.ts`.
    -   **Stability**: Fixed deadlocks via `stdio` management and strict process cleanup.
    -   **Integration**: Wired `PlaybackContext` to use dynamic metadata probing for correct stream configuration.
-   **Unified Queue & Stability (PRP #89 - #91)**:
    -   **Unified FileQueue**: Consolidated generic and AmbiData queues into a single `src/components/FileQueue.tsx` with folding, file type icons, and live play indicators.
    -   **Interaction**: Implemented "Double-Click to Play" and auto-selection logic across all tools.
    -   **EPIPE Hardening**: Resolved fatal process crashes by adding robust error handlers to inter-process pipes and ensuring explicit unpiping during teardown.
    -   **Surgical Reset**: Eliminated track-switching lag and the "starting mid-file" bug by forcing FFmpeg seek (`-ss 0`) and implementing the "Source Purge" lifecycle in `PlaybackContext`.
    -   **TDD Verification**: Added `scripts/test-server.ts` and `scripts/test-stream-start.ts` for automated pipeline verification.
- **Linear State Machine & Scrubber Sync (PRP #98 - #102)**:
    - **3-Step Pipeline**: Refactored playback into a linear state machine (`Step 1: Intent` -> `Step 2: Probe` -> `Step 3: Commit`). This decoupling prevents race conditions and ensures metadata is valid before the stream starts.
    - **Intent Persistence**: Introduced `playbackIntentRef` to preserve user play intent across asynchronous probing phases, ensuring reliable auto-play after track swaps.
    - **Scrubber Auto-Resume**: The `seek` handler now captures `wasPlaying` state and automatically resumes playback once the new stream offset is loaded.
    - **Queue Navigation**: Implemented Previous/Next track navigation.
    - **Circular Dependency Resolution**: De-coupled `PlaybackContext` from `ToolStateContext` by moving queue-aware logic to `ToolViews.tsx`. This resolved a critical module execution error ("black screen") and improved architectural cleanliness.
- **Transport State Machine V3 & Cleanups (PRP #105, #106, #104, #102)**:
    - **Transport V3**: Implemented decoupling of visual scrubbing from backend seek commands for smoother UI.
    - **LOCKED_REBUILDING State**: Added logic to handle audio pipeline resets during critical parameter changes.
    - **Deterministic Looping (PRP #106)**: Implemented `seekNonce` (cache-busting) mechanism in `PlayerState` to force React state machine rebuilds on loop iterations, fixing the "second loop failure" bug.
    - **AmbiData Status**: Corrected documentation and tool status to reflect active development status.
    - **General Cleanup**: Removed vestigial logic and fixed test suites for `AmbiSwap`, `AmbiOrder`, and `Ambix2Opus` handlers.
- **Buffering & Burst Encoding (PRP #111 - #114)**:
    - **Deep Buffering (PRP #111)**: Implemented 10MB `highWaterMark` allocations for all IPC pipes and the HTTP response stream to eliminate micro-stutters.
    - **Prime Buffer (PRP #113)**: Introduced a custom `PrimeBuffer` Transform stream that holds 48KB (~1.5s) of encoded Opus data before initial transmission, ensuring the browser's media buffer is never starved at startup.
    - **Burst Encoding (PRP #114)**: Removed the `-re` (real-time) throttling flag from both OBR and Legacy pipelines, allowing the CPU to burst-fill the buffers instantly on play or seek.
- **Stereo Monitoring Filter (PRP #108)**:
    - **M/S Stereo Folddown**: Replaced standard channel-summing with a specialized cardioid-based stereo downmix for Ambisonic previews (monitoring mode). This prevents rear-hemisphere phase cancellation when listening without headphones.
- **7th-Order Truncation & Pipeline Hardening (PRP #116 - #118)**:
    - **Robust Truncation**: Implemented discrete `channelmap` filtering in `ObrHandler.ts` to successfully downscale 7th-order (64ch) files to the renderer's 4th-order (25ch) limit. This bypasses FFmpeg's layout constraints.
    - **Error Hardening**: Enhanced pipeline cleanup logic to explicitly reap child processes and destroy response sockets upon encoder failure, preventing UI "waiting" hangs.
    - **Buffer Safety**: Capped browser-side `WavDecoder` to 32 channels for UI visualization to ensure stability with high-channel files.


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
* *Monitoring*: Real-time **Binaural Rendering** (Google OBR) via internal HTTP streaming server. Supports up to **4th Order (25ch)** natively, with automatic truncation for higher-order files (7th Order/64ch).


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

├── package.json
├── package-lock.json
├── postcss.config.js
├── public
|  ├── ambisonics.js
|  ├── electron-vite.animate.svg
|  ├── electron-vite.svg
|  ├── js
|  └── vite.svg
├── py
|  ├── ambi_data_heuristics.py
|  └── ambi_rotate.py
├── repo-map.md
├── resources
|  └── scripts
├── scripts
|  ├── test-auto-resume.ts
|  ├── test-binary-paths.ts
|  ├── test-binaural.js
|  ├── test-file-switch-autoplay.ts
|  ├── test-frontend-url.ts
|  ├── test-hard-swap.ts
|  ├── test-obr-pipeline.js
|  ├── test-queue-click.ts
|  ├── test-seek-accuracy.ts
|  ├── test-seek-debounce.ts
|  ├── test-server.ts
|  ├── test-stream-start.ts
|  └── verify-stream-endpoint.js
├── src
|  ├── App.css
|  ├── App.tsx
|  ├── assets
|  ├── components
|  ├── constants.ts
|  ├── contexts
|  ├── cpp
|  ├── index.css
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
|  ├── obr_pipeline.test.ts
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
# AmbiToolbox - Project State Report

**Date:** March 5, 2026 (Updated)
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
| **Ambix2BW64** | 🟢 Ready | `electron/handlers/Ambix2BW64.ts` | **Complete**: Integrated `ear-utils` via standalone binary for ADM metadata. |
| **Ambix2Bin** | 🟢 Ready | `electron/handlers/Ambix2Bin.ts` | Uses **Neumann KU100 (CC-BY)** & **MIT KEMAR** HRTFs. Fixed static path resolution and enum alignment. |
| **Ambix2IAMF** | 🟢 Ready | `electron/handlers/Ambix2IAMF.ts` | Generates textproto config and runs `iamf-enc`. |
| **AmbiOrder** | 🟢 Ready | `electron/handlers/AmbiOrder.ts` | Uses `channelmap` filter. Dynamic Order Detection. Fixed FFmpeg syntax. |
| **AmbiSwap** | 🟢 Ready | `electron/handlers/AmbiSwap.ts` | Supports 1st-3rd Order. Enforces 24-bit PCM. |
| **AmbiRotate** | 🟢 Ready | `py/ambi_rotate.py` (NumPy) | Chunked Processing for Memory Efficiency. Real-time Progress. **Fixed Infinite Loop** |
| **Ambix2CAF** | 🟢 Ready | `electron/handlers/Ambix2CAF.ts` | Supports Discrete & HOA Layouts. |
| **Ambix2Ogg** | 🟢 Ready | `electron/handlers/Ambix2Ogg.ts` | Smart Transcode/Remux. Permission Checks. |
| **AmbiTrim** | 🟢 Ready | `electron/handlers/trim.ts` | Proxy Workflow (Mid-Side), Lossless Cut (`-c copy`), WaveSurfer Regions. |
| **AmbiData** | 🟢 Ready | `electron/handlers/AmbiData.ts` | **Complete**: Native IAMF parsing, loudness analysis and UI cards integrated. |
| **Stereo2Ambix** | 🟢 Ready | `electron/handlers/Stereo2Ambix.ts` | **Complete**: Adaptive PCA-based upmixing using STFT and frequency-domain diffusion. |
| **AmbiLevel** | 🟢 Ready | `electron/handlers/AmbiLevel.ts` | **Complete**: Linked-gain normalization and manual offset tool. |
| **Persistence** | 🟢 Ready | `src/contexts/SettingsContext.tsx` | Saves active tool, bitrates, layouts, and rotation values. |
| **Global Queue** | 🟢 Ready | `src/components/FileQueue.tsx` | **Unified**: Single shared component for all tools with folding/play indicators. |

## 3. Status (PRP Hierarchy)
- **PRP 0 - 100**: Completed (Legacy Migration)
- **PRP #101 - #120**: Completed (Core Pipeline Hardening)
- **PRP #121**: Decoder Pipeline Refactor (Completed)
- **PRP #122**: Proprietary Format Router (Completed)
- **PRP #123**: Native Apple Ingestion (Completed)
- **PRP #124**: Direct OBU Parsing (Completed)
- **PRP #125**: Playback & Ingestion Stabilization (Completed)
- **PRP #126**: Stereo2Ambix Implementation (Completed)
- **PRP #127**: Stereo2Ambix DSP Engine Overhaul (Completed)
- **PRP #128**: AmbiLevel Tool Integration (Completed)
- **PRP #129**: Ambix2BW64 Integration (Completed)
- **Phase: Maintenance**: Active

## 4. Directory Structure (Architecture)

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
|  ├── AmbiData.ts
|  ├── AmbiOrder.ts
|  ├── AmbiRotate.ts
|  ├── AmbiSwap.ts
|  ├── Ambix2APAC.ts
|  ├── Ambix2Bin.ts
|  ├── Ambix2CAF.ts
|  ├── Ambix2IAMF.ts
|  ├── Ambix2Ogg.ts
|  ├── Ambix2Opus.ts
|  ├── Stereo2Ambix.ts
|  ├── common.ts
|  ├── index.ts
|  └── trim.ts
├── main.ts
├── preload.ts
└── shim.ts
|
├── py
|  ├── ambi_data_heuristics.py
|  ├── ambi_rotate.py
|  ├── format_decoder.py
|  └── stereo_to_ambix.py
|
├── tests
|  ├── handlers.test.ts
|  ├── iamf_recursive.test.ts
|  ├── ingestion.test.ts
|  ├── ingestion_router.test.ts
|  ├── obr_pipeline.test.ts
|  ├── settings_merge.test.ts
|  ├── stereo2ambix.test.ts
|  ├── test_stereo2ambix.py
|  ├── transport_sm.test.ts
|  └── trim.test.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
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

## 5. Recent Logic Changes
- **Ambix2BW64 Tool Integration (PRP #129)**:
    - **Standalone Binary Provisioning**: Packaged the `ear-utils` Python library into an `arm64` macOS executable using PyInstaller, eliminating the need for a local Python environment for ADM conversion.
    - **ADM Metadata Injection**: Integrated EBU ADM Renderer logic to convert Ambisonic (AmbiX) PCM streams into BW64 containers with standard-compliant ADM metadata blocks.
    - **Batch Processing Handler**: Implemented a robust backend handler that spawns the internal binary with JSON-encoded file lists and normalization toggles, supporting real-time status reporting to the UI.
- **AmbiLevel Tool Integration (PRP #128)**:
    - **Linked-Gain Logic**: Implemented a core requirement for Ambisonic normalization: applying the exact same gain offset to all channels simultaneously to preserve spherical soundfield phase.
    - **Dual-Pass Normalization**: Developed a two-pass FFmpeg workflow using `volumedetect` for interleaved max-volume analysis followed by a precision `volume` application to hit target True Peak (dBTP).
    - **Output Strictness**: Enforced 24-bit PCM WAV rendering across all gain operations to prevent quantization noise artifacts in high-order masters.
- **Stereo2Ambix DSP Overhaul (PRP #127)**:
    - **STFT Processing**: Replaced the primitive time-domain PCA loop with a full short-time Fourier transform (STFT) pipeline using 4096-sample Hann windows for frequency-dependent spatial extraction.
    - **Temporal Smoothing**: Implemented recursive smoothing of the bin-wise covariance matrix to eliminate "flicker" and gating artifacts in the upmixed signal.
    - **Continuous Diffusion**: Replaced block-reset random seeds with a stable frequency-domain scattering matrix to ensure phase continuity across the diffused ambient field.
- **Stereo2Ambix Upmixing (PRP #126)**:
    - **Adaptive PCA Decomposition**: Implemented freq-domain Primary/Ambient extraction using Eigen-decomposition of the bin-wise covariance matrix.
    - **Deterministic Caching**: Integrated MD5-based ingestion hashing (mtime + size + params) to instantly bypass redundant computational overhead.
    - **Stabilization**: Fixed Python I/O tail-flush bug and implemented 2ch fallback for the OBR preview pipeline to prevent crashes.
- **Playback & Ingestion Stabilization (PRP #125)**:
    - **Recursive OBU Scanning**: Hardened `IamfParser.ts` directly resolving the "0 channel" playback issue when reading nested Immersive Audio Model and Formats (`.iamf`) payload streams.
    - **Deterministic Ingestion Caching**: Integrated stat-based (`path` + `size` + `mtime`) `md5` hashing into `IngestionRouter` assuring unique deterministic proxy cache hits. This eliminates playback "ghosting" when manipulating identically named target files.
    - **FileQueue Race Condition Resolution**: Isolated `onClick` from `onDoubleClick` events inside `FileQueue` utilizing strict `preventDefault` propagation. Eliminated aggressive asynchronous UI clobbering within `ToolViews.tsx` that previously nuked playback buffers indiscriminately upon single-click browsing.
    - **Double-Click Same File Bug**: Fixed `setCurrentFile` bug forcing full buffer purge when double-clicking currently active streams; streams now properly re-initialize playback. Fixed `AmbiData` component Transport Next/Prev navigation.
- **Decoder Pipeline Refactor (PRP #121)**:
    - **Strict HOA/Discrete Separation**: Refactored the decoder pipeline to strictly apply the `-map 0:a:0` argument only to container formats (e.g., `.aivu`, `.mp4`, `.mkv`, `.mov`, `.webm`, `.m4a`) while preserving raw files like `.wav` and `.amb`.
- **Native Apple Ingestion (PRP #123)**:
    - **afconvert Proxying**: Implemented re-routing of Apple Immersive Video (`.aivu`) files through macOS's native `/usr/bin/afconvert` utility. This bypasses FFmpeg's `apac` decoder limitations and generates a high-fidelity 32-bit Float `.wav` proxy for the streaming pipeline.
    - **Adaptive Pipeline**: Updated `ObrHandler.ts` and `main.ts` to strictly handle standard video containers while allowing proxy `.wav` files to stream with 1-to-1 discrete mapping.
    - **Infrastructure Stability**: Eliminated the `no decoder found` crashes previously caused by proprietary Apple spatial audio formats. Verified via `tests/ingestion.test.ts`.
- **7th-Order Truncation & Pipeline Hardening (PRP #116 - #118)**:
    - **Robust Truncation**: Implemented discrete `channelmap` filtering in `ObrHandler.ts` to successfully downscale 7th-order (64ch) files to the renderer's 4th-order (25ch) limit. This bypasses FFmpeg's layout constraints.
    - **Error Hardening**: Enhanced pipeline cleanup logic to explicitly reap child processes and destroy response sockets upon encoder failure, preventing UI "waiting" hangs.
    - **Buffer Safety**: Capped browser-side `WavDecoder` to 32 channels for UI visualization to ensure stability with high-channel files.
- **Buffering & Burst Encoding (PRP #111 - #114)**:
    - **Deep Buffering (PRP #111)**: Implemented 10MB `highWaterMark` allocations for all IPC pipes and the HTTP response stream to eliminate micro-stutters.
    - **Prime Buffer (PRP #113)**: Introduced a custom `PrimeBuffer` Transform stream that holds 48KB (~1.5s) of encoded Opus data before initial transmission, ensuring the browser's media buffer is never starved at startup.
    - **Burst Encoding (PRP #114)**: Removed the `-re` (real-time) throttling flag from both OBR and Legacy pipelines, allowing the CPU to burst-fill the buffers instantly on play or seek.
- **Stereo Monitoring Filter (PRP #108)**:
    - **M/S Stereo Folddown**: Replaced standard channel-summing with a specialized cardioid-based stereo downmix for Ambisonic previews (monitoring mode). This prevents rear-hemisphere phase cancellation when listening without headphones.


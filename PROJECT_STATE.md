# AmbiToolbox - Project State Report

**Date:** February 23, 2026 (Updated)
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
|  ├── ambi_rotate.py
|  └── format_decoder.py
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
├── test_output.webm
├── tests
|  ├── 3rd Order Ambi Clock Test.wav
|  ├── check_hrtf_delay.py
|  ├── check_hrtf_energy.py
|  ├── check_netcdf_clean.py
|  ├── debug_rotation_sweep.py
|  ├── gen_test_signal.py
|  ├── handlers.test.ts
|  ├── iamf_recursive.test.ts
|  ├── ingestion.test.ts
|  ├── ingestion_router.test.ts
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
- **Decoder Pipeline Refactor (PRP #121)**:
    - **Strict HOA/Discrete Separation**: Refactored the decoder pipeline to strictly apply the `-map 0:a:0` argument only to container formats (e.g., `.aivu`, `.mp4`, `.mkv`, `.mov`, `.webm`, `.m4a`) while preserving raw files like `.wav` and `.amb`.
- **Native Apple Ingestion (PRP #123)**:
    - **afconvert Proxying**: Implemented re-routing of Apple Immersive Video (`.aivu`) files through macOS's native `/usr/bin/afconvert` utility. This bypasses FFmpeg's `apac` decoder limitations and generates a high-fidelity 32-bit Float `.wav` proxy for the streaming pipeline.
    - **Adaptive Pipeline**: Updated `ObrHandler.ts` and `main.ts` to strictly handle standard video containers while allowing proxy `.wav` files to stream with 1-to-1 discrete mapping.
    - **Infrastructure Stability**: Eliminated the `no decoder found` crashes previously caused by proprietary Apple spatial audio formats. Verified via `tests/ingestion.test.ts`.
- **Playback & Ingestion Stabilization (PRP #125)**:
    - **Recursive OBU Scanning**: Hardened `IamfParser.ts` directly resolving the "0 channel" playback issue when reading nested Immersive Audio Model and Formats (`.iamf`) payload streams.
    - **Deterministic Ingestion Caching**: Integrated stat-based (`path` + `size` + `mtime`) `md5` hashing into `IngestionRouter` assuring unique deterministic proxy cache hits. This eliminates playback "ghosting" when manipulating identically named target files.
    - **FileQueue Race Condition Resolution**: Isolated `onClick` from `onDoubleClick` events inside `FileQueue` utilizing strict `preventDefault` propagation. Eliminated aggressive asynchronous UI clobbering within `ToolViews.tsx` that previously nuked playback buffers indiscriminately upon single-click browsing.
    - **Double-Click Same File Bug**: Fixed `setCurrentFile` bug forcing full buffer purge when double-clicking currently active streams; streams now properly re-initialize playback. Fixed `AmbiData` component Transport Next/Prev navigation.

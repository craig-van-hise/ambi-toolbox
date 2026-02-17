# AmbiToolbox - Project State Report

**Date:** February 16, 2026 (Updated 14:15)
**Architecture:** Electron Modular Monolith

## 1. Executive Summary
The **AmbiToolbox** has been successfully re-architected into a unified **Electron application**. This move consolidates the previously disparate Python and Swift utilities into a single, cohesive interface built with **React** (Frontend) and **TypeScript** (Backend Handlers).

**Global Status:** 🟢 **Operational / In Active Development**

## 2. Component Status

| Component | Status | Backend Implementation | Notes |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | 🟢 Ready | React + Tailwind | Scoped Progress, Auto-Scroll, Drag & Drop. |
| **Transport UI** | 🟡 Partial | `src/components/Transport.tsx` | **Frontend Complete**: Condensed UI, Icons, Settings Modal. **Backend Pending**: Playback logic not yet fully wired to audio output. |
| **Ambix2Opus** | 🟢 Ready | `electron/handlers/Ambix2Opus.ts` | Uses `ffprobe` for robust channel detection. |
| **Ambix2Bin** | 🟢 Ready | `electron/handlers/Ambix2Bin.ts` | Uses **Neumann KU100 (CC-BY)** & **MIT KEMAR** HRTFs. Fixed static path resolution and enum alignment. |
| **Ambix2IAMF** | 🟢 Ready | `electron/handlers/Ambix2IAMF.ts` | Generates textproto config and runs `iamf-enc`. |
| **AmbiOrder** | 🟢 Ready | `electron/handlers/AmbiOrder.ts` | Uses `channelmap` filter. Dynamic Order Detection. Fixed FFmpeg syntax. |
| **AmbiSwap** | 🟢 Ready | `electron/handlers/AmbiSwap.ts` | Supports 1st-3rd Order. Enforces 24-bit PCM. |
| **AmbiRotate** | 🟢 Ready | `py/ambi_rotate.py` (NumPy) | Chunked Processing for Memory Efficiency. Real-time Progress. **Fixed Infinite Loop** |
| **Ambix2CAF** | 🟢 Ready | `electron/handlers/Ambix2CAF.ts` | Supports Discrete & HOA Layouts. |
| **Ambix2Ogg** | 🟢 Ready | `electron/handlers/Ambix2Ogg.ts` | Smart Transcode/Remux. Permission Checks. |
| **AmbiTrim** | 🟢 Ready | `electron/handlers/trim.ts` | Proxy Workflow (Mid-Side), Lossless Cut (`-c copy`), WaveSurfer Regions. |
| **AmbiData** | 🟡 In Progress | `electron/handlers/AmbiData.ts` | **Expansion Required**: Backend logic needs significant work to accommodate complex containers (MP4/MOV) and diverse spatial audio file types. Flicker Kill-Switch implemented. |
| **Persistence** | 🟢 Ready | `src/contexts/SettingsContext.tsx` | Saves active tool, bitrates, layouts, and rotation values. |
| **Global Queue** | 🟢 New | `src/contexts/ToolStateContext.tsx` | Files persist across tools (AmbiData <-> Others). |

## 3. Directory Structure (Key Paths)

-   **`src/`**: Frontend Source (React/Vite).
    -   `components/ToolViews.tsx`: Main UI for all tools (Consumes Global State).
    -   `components/Transport.tsx`: Audio transport controls (Play/Pause, Seek, Volume).
    -   `contexts/PlaybackContext.tsx`: Global audio state management (WaveSurfer).
-   **`electron/`**: Main Process Source.
    -   `handlers/`: Individual tool backend logic (Modular Handler Pattern).
    -   `main.ts`: Application entry point and IPC router.
    -   `shim.ts`: Bridge imports for handlers.
-   **`resources/scripts/`**: Python Subsystem.
    -   `rotator.py`: Ambisonic Rotation Script (NumPy + Scipy + SoundFile).
-   **`assets/`**: Static Resources (`bin/`, `hrtf/`).
-   **`xCleanup/`**: Quantined legacy files (Gitignored).

## 4. Recent Logic Changes
-   **Transport Component Integration**:
    -   Added a compact, sticky footer for audio playback controls (`Transport.tsx`).
    -   Detailed UI features: Play/Pause/Stop/Seek, Volume Slider, **Settings Cog** (HRTF Profile), and **Headphones** toggle (Blue highlight).
    -   **Backend Note**: While the UI and `PlaybackContext` (WaveSurfer) are implemented, the robust backend audio routing for full playback support is **pending implementation**.
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
-   **File Type Audit**: Conducted comprehensive audit of all backend handlers to determine exact file support, resulting in the "Accepted File Types by Tool.md" documentation.

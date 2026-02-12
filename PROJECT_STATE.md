# AmbiToolbox - Project State Report

**Date:** February 11, 2026 (Updated 19:50)
**Architecture:** Electron Modular Monolith

## 1. Executive Summary
The **AmbiToolbox** has been successfully re-architected into a unified **Electron application**. This move consolidates the previously disparate Python and Swift utilities into a single, cohesive interface built with **React** (Frontend) and **TypeScript** (Backend Handlers).

**Global Status:** 🟢 **Operational / In Active Development**

## 2. Component Status

| Component | Status | Backend Implementation | Notes |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | 🟢 Ready | React + Tailwind | Scoped Progress, Auto-Scroll, Drag & Drop. |
| **Ambix2Opus** | 🟢 Ready | `electron/handlers/Ambix2Opus.ts` | Uses `ffprobe` for robust channel detection. |
| **Ambix2Bin** | 🟢 Ready | `electron/handlers/Ambix2Bin.ts` | Uses **Neumann KU100 (CC-BY)** & **MIT KEMAR** HRTFs. Custom SOFA Loading. |
| **Ambix2IAMF** | 🟢 Ready | `electron/handlers/Ambix2IAMF.ts` | Generates textproto config and runs `iamf-enc`. |
| **AmbiOrder** | 🟢 Ready | `electron/handlers/AmbiOrder.ts` | Uses `channelmap` filter. Dynamic Order Detection. Fixed FFmpeg syntax. |
| **AmbiSwap** | 🟢 Ready | `electron/handlers/AmbiSwap.ts` | Supports 1st-3rd Order. Enforces 24-bit PCM. |
| **AmbiRotate** | 🟢 Ready | `py/ambi_rotate.py` (NumPy) | Chunked Processing for Memory Efficiency. Real-time Progress. |
| **Ambix2CAF** | 🟢 Ready | `electron/handlers/Ambix2CAF.ts` | Supports Discrete & HOA Layouts. |
| **Ambix2Ogg** | 🟢 Ready | `electron/handlers/Ambix2Ogg.ts` | Smart Transcode/Remux. Permission Checks. |
| **AmbiTrim** | 🟢 Ready | `electron/handlers/trim.ts` | Proxy Workflow (Mid-Side), Lossless Cut (`-c copy`), WaveSurfer Regions. |
| **Persistence** | 🟢 Ready | `src/contexts/SettingsContext.tsx` | Saves active tool, bitrates, layouts, and rotation values. |

## 3. Directory Structure (Key Paths)

-   **`src/`**: Frontend Source (React/Vite).
    -   `components/ToolViews.tsx`: Main UI for all tools.
-   **`electron/`**: Main Process Source.
    -   `handlers/`: Individual tool backend logic (Modular Handler Pattern).
    -   `main.ts`: Application entry point and IPC router.
-   **`resources/scripts/`**: Python Subsystem.
    -   `rotator.py`: Ambisonic Rotation Script (NumPy + Scipy + SoundFile).
-   **`assets/`**: Static Resources (`bin/`, `hrtf/`).
-   **`xCleanup/`**: Quantined legacy files (Gitignored).

## 4. Recent Logic Changes
-   **Ambix2Bin Custom HRTF**: Implemented "Load Custom .sofa..." feature. Users can now select arbitrary `.sofa` files via system dialog. Selection is persisted in `localStorage` across sessions.
-   **UI Refinements (Double Border/Colors)**: Implemented double-border effect for active sidebar tabs (White Outer + Tool Color Inner). Updated `Ambix2Ogg` to Pink and fixed `Ambix2Bin` dropdown focus color (White).
-   **Asset Compliance (PRP #73)**: Purged non-commercial HRTF files. Added **Neumann KU100** (CC-BY 4.0) and **MIT KEMAR** assets to `assets/hrtf/`. Updated `NOTICE.txt`.
-   **FFmpeg Migration (PRP #71/72)**: Replaced binary with custom **LGPL v2.1** build (Release 6.1) supporting Opus. Verified compliance (`--disable-gpl`, `--disable-libx264`).
-   **AmbiTrim Repair (PRP #72)**: Verified backend functionality (stream copy/opus) manually after integration test flaw.
-   **Settings Persistence**: Implemented `SettingsContext` to persist user preferences (HRTF, Bitrate, Rotation) using `localStorage`. secure merge strategy handles legacy settings to prevent crashes.
-   **Ambix2Ogg Implementation**: Added new tool for wrapping Ambisonics in Ogg containers. Supports both transcoding (Opus) and direct remuxing (Stream Copy). Includes write permission verification.
-   **DropZone Label Refinement**: Updated all tool drop zones to display explicit, tool-specific file extension acceptance lists (e.g., ".wav, .opus accepted") instead of generic text.
-   **File Type Audit**: Conducted comprehensive audit of all backend handlers to determine exact file support, resulting in the "Accepted File Types by Tool.md" documentation.


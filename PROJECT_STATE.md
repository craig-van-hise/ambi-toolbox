# AmbiToolbox - Project State Report

**Date:** February 8, 2026
**Architecture:** Electron Modular Monolith (Transitioned from Python/PyQt)

## 1. Executive Summary
The **AmbiToolbox** has been successfully re-architected into a unified **Electron application**. This move consolidates the previously disparate Python and Swift utilities into a single, cohesive interface built with **React** (Frontend) and **TypeScript** (Backend Handlers).

**Global Status:** 🟢 **Operational / In Active Development**

## 2. Component Status

| Component | Status | Backend Implementation | Notes |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | 🟢 Ready | React + Tailwind | Scoped Progress, Auto-Scroll, Drag & Drop. |
| **Ambix2Opus** | 🟢 Ready | `electron/handlers/Ambix2Opus.ts` | Uses `ffprobe` for robust channel detection. |
| **Ambix2Bin** | 🟢 Ready | `electron/handlers/Ambix2Bin.ts` | Wraps legacy `saf_wrapper.py` for binaural rendering. |
| **Ambix2IAMF** | 🟢 Ready | `electron/handlers/Ambix2IAMF.ts` | Generates textproto config and runs `iamf-enc`. |
| **AmbiOrder** | 🟢 Ready | `electron/handlers/AmbiOrder.ts` | Uses `channelmap` filter. Dynamic Order Detection. Fixed FFmpeg syntax. |
| **AmbiSwap** | 🟢 Ready | `electron/handlers/AmbiSwap.ts` | Supports 1st-3rd Order. Enforces 24-bit PCM. |
| **AmbiRotate** | 🟢 Ready | `py/ambi_rotate.py` (NumPy) | Chunked Processing for Memory Efficiency. Real-time Progress. |
| **Ambix2CAF** | 🟢 Ready | `electron/handlers/Ambix2CAF.ts` | Supports Discrete & HOA Layouts. |
| **Persistence** | 🟢 Ready | `src/contexts/SettingsContext.tsx` | Saves active tool, bitrates, layouts, and rotation values. |

## 3. Directory Structure (Key Paths)

-   **`src/`**: Frontend Source (React/Vite).
    -   `components/ToolViews.tsx`: Main UI for all tools.
-   **`electron/`**: Main Process Source.
    -   `handlers/`: Individual tool backend logic (Modular Handler Pattern).
    -   `main.ts`: Application entry point and IPC router.
-   **`resources/scripts/`**: Python Subsystem.
    -   `rotator.py`: Ambisonic Rotation Script (NumPy + Scipy + SoundFile).
-   **`assets/`**: Static Resources (`bin/`, `sofa/`).
-   **`xCleanup/`**: Quantined legacy files (Gitignored).

## 4. Recent Logic Changes
-   **AmbiRotate Repair**: Restored `rotator.py` to `resources/scripts/`. Implemented chunked processing (8192 frames) for low memory usage and real-time `PROGRESS: XX` reporting via stdout. Frontend now displays fluid progress bar.
-   **AmbiOrder Fix**: Corrected FFmpeg `channelmap` filter syntax to resolve Exit Code 234. Added defensive `probeAudio` checks.
-   **Cleanup**: Removed legacy `legacy_apps` and `legacy_libs`.
-   **UI Refinement**: Implemented scoped progress bars to prevent cross-tool ghosting. Added auto-scroll behavior for Queue and Progress visibility.
-   **Robust Probing**: Switched from regex-based FFmpeg parsing to JSON-based `ffprobe` output to handle diverse channel layouts.
-   **IAMF Config**: Ported TypeScript config generator from legacy to `electron/handlers/iamf-config-generator.ts`.
-   **Native DSP Engine**: Implemented `NativeRotator.ts` "Hybrid Engine": Full 3x3 Matrix for 1st Order (Yaw/Pitch/Roll) + Sectorial Logic for Higher Orders (Yaw only).
-   **Architecture Restoration**: Restored Legacy Bridge (`window.electron`) alongside New Bridge (`window.electronAPI`) in `preload.ts` to ensure backward compatibility for all tools (PRP #39/#40).
-   **Batch Processing**: All tools updated to support batch processing (Array inputs) with queue UI.
-   **Settings Persistence**: Implemented `SettingsContext` to persist user preferences (HRTF, Bitrate, Rotation) using `localStorage`. secure merge strategy handles legacy settings to prevent crashes.

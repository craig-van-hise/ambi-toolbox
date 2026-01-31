# AmbiToolbox - Project State Report

**Date:** January 31, 2026
**Architecture:** Electron Modular Monolith (Transitioned from Python/PyQt)

## 1. Executive Summary
The **AmbiToolbox** has been successfully re-architected into a unified **Electron application**. This move consolidates the previously disparate Python and Swift utilities into a single, cohesive interface built with React and TypeScript.

**Global Status:** 🟢 **Operational / In Active Development**

## 2. Component Status

| Component | Status | Backend Implementation | Notes |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | 🟢 Ready | React + Tailwind | Supports Drag & Drop, Tool Switching. |
| **Ambix2Opus** | 🟢 Ready | `electron/handlers/Ambix2Opus.ts` | Uses `ffprobe` for robust channel detection. |
| **Ambix2Bin** | 🟢 Ready | `electron/handlers/Ambix2Bin.ts` | Wraps legacy `saf_wrapper.py` for binaural rendering. |
| **Ambix2IAMF** | 🟢 Ready | `electron/handlers/Ambix2IAMF.ts` | Generates textproto config and runs `iamf-enc`. |
| **AmbiOrder** | 🟢 Ready | `electron/handlers/AmbiOrder.ts` | Uses `channelmap` filter. Dynamic Order Detection. |
| **AmbiSwap** | 🔴 Pending | *None* | UI implemented. Backend logic needed. |
| **AmbiRotate** | 🔴 Pending | *None* | UI implemented. Backend logic needed. |
| **Ambix2CAF** | 🟢 Ready | `electron/handlers/Ambix2CAF.ts` | Supports Discrete & HOA Layouts. |

## 3. Directory Structure (Key Paths)

-   **`src/`**: Frontend Source (React/Vite).
    -   `components/ToolViews.tsx`: Main UI for all tools.
-   **`electron/`**: Main Process Source.
    -   `handlers/`: Individual tool backend logic (Modular Handler Pattern).
    -   `main.ts`: Application entry point and IPC router.
-   **`assets/`**: Static Resources.
    -   `bin/`: Bundled binaries (`ffmpeg`, `ffprobe`, `iamf-enc`).
    -   `sofa/`: HRTF files for binaural rendering.
-   **`legacy_apps/`**: Archived Python/Swift implementations.

## 4. Recent Logic Changes
-   **Robust Probing**: Switched from regex-based FFmpeg parsing to JSON-based `ffprobe` output to handle diverse channel layouts (e.g. "4.0", "16ch").
-   **IAMF Config**: Ported TypeScript config generator from legacy to `electron/handlers/iamf-config-generator.ts`.
-   **Tailwind v4**: Updated PostCSS configuration for compatibility.
-   **AmbiOrder Logic**: Implemented using `channelmap` filter to support arbitrary order reduction (1st-7th Order) without layout strictness.
-   **File Inspection**: Added `inspect-file` IPC channel for frontend probing of dropped files.

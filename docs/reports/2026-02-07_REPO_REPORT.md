# 2026-02-07_REPO_REPORT.md

## 1. Executive Summary

**Project:** AmbiToolbox (Electron Monolith)
**Architecture:** Electron + React + TypeScript + Python (Sidecar)
**Date:** 2026-02-07
**Auditor:** Lead Software Architect (Agent)

The **AmbiToolbox** has undergone a significant cleanup operation. The codebase is now a lean, modern Electron application. The legacy "Monolith" of Python/Swift scripts has been quarantined into `xCleanup/`.

The application relies on a "Handler Pattern" in the Electron Main process to dispatch tasks to specific conversion tools. The architecture is clean, with the main process (`electron/`) handling system interactions and the renderer (`src/`) managing the UI.

## 2. Detailed Tree & Architecture Explanation

### 2.1 Core Application Structure

The "Live" application resides entirely within the following directories:

*   **`src/` (Frontend)**
    *   Built with **React**, **TypeScript**, and **TailwindCSS**.
    *   **Entry Point:** `src/main.tsx` -> `src/App.tsx`.
    *   **UI Logic:** `src/components/ToolViews.tsx` is the central component that dynamically renders the interface for the active tool.
    *   **State:** Local React state drives the UI.

*   **`electron/` (Backend)**
    *   **Entry Point:** `electron/main.ts`. Initializes the window and registers IPC handlers.
    *   **Bridge:** `electron/preload.ts`. Exposes `window.electron` and `window.electronAPI`.
    *   **Business Logic:** `electron/handlers/`. Contains active tool logic (`Ambix2Opus.ts`, `AmbiRotate.ts`, etc.).

*   **`py/` (Extensions)**
    *   Contains `ambi_rotate.py`, the active Python backend for the `AmbiRotate` tool. Spurred by `electron/handlers/AmbiRotate.ts`.

*   **`assets/` (Dependencies)**
    *   Contains bundled binaries (`ffmpeg`, `iamf-enc`) and SOFA files.

*   **`tests/`**
    *   Contains active integration tests (`handlers.test.ts`) and Python validity checks for rotation logic.

### 2.2 Quarantined Archives

*   **`xCleanup/`**: This directory contains all legacy code, unused libraries (`Spatial_Audio_Framework`), and potential reference implementations. It is ignored by git.

## 3. Component Interaction Analysis

### Data Flow Pattern

1.  **User Action**: User interacts with the React UI (`ToolViews.tsx`).
2.  **IPC Request**: Frontend calls `window.electronAPI.runTask(...)` or `window.electronAPI.processAmbiRotate(...)`.
3.  **Main Dispatch**:
    *   `electron/main.ts` delegates to `electron/handlers/index.ts` or directly handles the event.
4.  **Execution**:
    *   **FFmpeg/IAMF**: Handlers construct command strings and spawn child processes (`assets/bin/*`).
    *   **AmbiRotate**: Spawns `python3` with `py/ambi_rotate.py`.
5.  **Feedback**: React receives progress updates via IPC listeners.

## 4. Vestigial File Report

### 🔴 High Confidence (Dead / Reference Code)

*   **`xCleanup/`**: Contains all previously identified dead code.
    *   `legacy_apps/`
    *   `legacy_libs/`
    *   `legacy_src/`
    *   `resources/` (Old assets folder, replaced by `assets/` and `py/`)

### 🟡 Medium Confidence (Review Needed)

*   **`tests/`**: While likely useful, some Python scripts here (`debug_rotation_sweep.py`, `manual_test_out.wav`) might be temporary artifacts from development.
*   **`.adk/`**: Unknown directory (likely Agent Development Kit or similar). Ensure it contains only necessary configs.

### 🟢 Low Confidence (Likely Useful)

*   **`PRPs/`**: Project Requirement Proposals. Good for documentation history.
*   **`py/ambi_rotate.py`**: Validated as active.

## 5. Conclusion

The repository is in excellent shape following the cleanup. The distinction between active code (`src`, `electron`, `py`) and legacy code (`xCleanup`) is clear.

**Recommendations:**
1.  **Maintain Hygiene**: Do not import anything from `xCleanup` back into the main project.
2.  **Python Environment**: Ensure the end-user environment has the necessary Python dependencies (`numpy`, `soundfile`) since `py/ambi_rotate.py` relies on them.

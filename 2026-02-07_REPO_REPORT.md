# 2026-02-07_REPO_REPORT.md

## 1. Executive Summary

**Project:** AmbiToolbox (Electron Monolith)
**Architecture:** Electron + React + TypeScript + Python (Sidecar)
**Date:** 2026-02-07
**Auditor:** Lead Software Architect (Agent)

The **AmbiToolbox** is a specialized spatial audio utility suite that has been re-architected from a collection of disparate Python/Swift scripts into a unified **Electron application**. The codebase is currently in an **Active State**, with a clear separation between the modern "Monolith" (`src/`, `electron/`) and the "Legacy" archive (`legacy_apps/`, `legacy_libs/`).

The application relies on a "Handler Pattern" in the Electron Main process to dispatch tasks to specific conversion tools, most of which wrap external binaries (`ffmpeg`, `iamf-enc`) or custom Python scripts.

## 2. Detailed Tree & Architecture Explanation

### 2.1 Core Application Structure

The "Live" application resides entirely within the following directories:

*   **`src/` (Frontend)**
    *   Built with **React**, **TypeScript**, and **TailwindCSS**.
    *   **Entry Point:** `src/main.tsx` -> `src/App.tsx`.
    *   **UI Logic:** `src/components/ToolViews.tsx` is the massive dispatcher component that renders the UI for every tool (`Ambix2Opus`, `AmbiRotate`, etc.) based on the active `ToolId`.
    *   **State:** Local React state drives the UI; no global store (Redux/Zustand) observed, which is appropriate for this scale.

*   **`electron/` (Backend)**
    *   **Entry Point:** `electron/main.ts`. Initializes the window and registers IPC handlers.
    *   **Bridge:** `electron/preload.ts`. Exposes two bridges:
        *   `window.electron` (Legacy/Compat)
        *   `window.electronAPI` (Modern, used by AmbiRotate and newer features).
    *   **Business Logic:** `electron/handlers/`. This directory contains the specific logic for each tool.
        *   `properties`: `Ambix2Opus.ts`, `AmbiOrder.ts`, `AmbiRotate.ts`, etc.
        *   `dispatch`: `index.ts` maps `toolId` strings to these handler functions.

*   **`assets/` (Dependencies)**
    *   Contains the **Critical Binaries** required for operation: `ffmpeg`, `ffprobe`, `iamf-enc` in `assets/bin/`.
    *   Contains HRTF SOFA files in `assets/sofa/`.

*   **`py/` (Extensions)**
    *   Contains `ambi_rotate.py`, the active Python backend for the `AmbiRotate` tool. This script is spawned directly by `electron/main.ts`.

### 2.2 Testing & Configuration

*   **`tests/`**: Contains active integration tests (`handlers.test.ts`) and Python validity checks. This is the **Active** test suite.
*   **`package.json`**: Defines the build pipeline (`vite`, `electron-builder`).
*   **`electron-builder.json5`**: Configures the packaging. Notably, it packages `dist` and `dist-electron`. *Warning: It does not explicitly list `py/` or `assets/` in the `files` array, although they are referenced by the code. This may rely on implicit behavior or manual copying during the build process.*

## 3. Component Interaction Analysis

### Data Flow Pattern

1.  **User Action**: User drops files or changes settings in the React Frontend (`ToolViews.tsx`).
2.  **IPC Request**: Frontend calls `window.electronAPI.runTask(...)` or `window.electronAPI.processAmbiRotate(...)`.
3.  **Main Dispatch**:
    *   `electron/main.ts` receives the event.
    *   For standard tools: It delegates to `electron/handlers/index.ts` -> `dispatchTask()`.
    *   For `AmbiRotate`: It directly handles `process-ambi-rotate` and spawns the Python child process.
4.  **Execution**:
    *   **Handlers (`electron/handlers/*.ts`)**: Most handlers construct a command line string for `ffmpeg` or `iamf-enc` and execute it using `child_process`.
    *   **Python (`py/ambi_rotate.py`)**: Runs pure NumPy/SciPy operations for rotation and writes a new WAV file.
5.  **Feedback**: Progress and Status updates are sent back via `webContents.send('task-progress')` or similar channels, which hook into React state to update the UI bars.

### Key Interactions

*   **`main.ts` <-> `py/ambi_rotate.py`**: Direct spawning interaction. Ensure `python3` is available in the user's environment.
*   **`handlers/Ambix2IAMF.ts` <-> `handlers/iamf-config-generator.ts`**: Tight coupling to generate the complex `.textproto` config files required by the IAMF encoder.

## 4. Vestigial File Report

The following directories and files have been identified as disconnected from the main build pipeline and application logic.

### 🔴 High Confidence (Dead / Reference Code)

| Path | Description | Action Recommendation |
| :--- | :--- | :--- |
| **`legacy_apps/`** | massive collection (1000+ files) of old Python/Swift apps. | **Keep as Archive** (do not delete, but exclude from VSCode search if possible). |
| **`legacy_libs/`** | Old C++/Python libraries (Spatial_Audio_Framework). | **Keep as Archive**. |
| **`legacy_src/`** | Older source files not imported by `src` or `electron`. | **Delete** or Move to `legacy_apps`. |
| **`Front End Design From AI Studio/`** | Prototype React code. | **Delete** (Functionality is merged into `src`). |

### 🟡 Medium Confidence (Review Needed)

| Path | Description | Reason for Flagging |
| :--- | :--- | :--- |
| **`resources/`** | Contains `scripts/rotate_ambisonics.py`. | **Duplicate Logic**. The active app uses `py/ambi_rotate.py`. Check if `resources` is used by the `electron-builder` as an "extraResource". If not, this folder is likely obsolete. |
| **`test_setup.py`** | Root level script. | Unclear if part of the `vitest` pipeline or an old manual script. |
| **`py/`** | Folder itself. | **Critical Warning**: While `ambi_rotate.py` is used, the folder is NOT listed in `electron-builder.json5`. Ensure this works in the packaged build. |

### 🟢 Low Confidence (Likely Useful)

| Path | Description |
| :--- | :--- |
| **`PRPs/`** | Project Requirement Proposals. | Documentation. Keep. |
| **`tests/`** | Integration tests. | Keep. |

## 5. Conclusion

AmbiToolbox is in a healthy state of transition. The core Electron monolith is well-structured and modular. The primary technical debt lies in the large amount of vestigial code (`legacy_*`) that co-exists with the active source, potentially confusing global searches and static analysis.

**Immediate Recommendations:**
1.  **Verify Packaging**: Confirm that `py/` and `assets/` are correctly included in the final `.dmg` / `.exe` produced by `npm run build`.
2.  **Prune**: Delete `Front End Design From AI Studio` and consolidat `legacy_src` into `legacy_apps`.

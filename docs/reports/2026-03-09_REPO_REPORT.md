# 2026-03-09_REPO_REPORT.md

## 1. Executive Summary

**Project:** AmbiToolbox (Electron Unified Spatial Utility)
**Architecture:** Electron Modular Monolith + Python Sidecars + Native Binaries
**Date:** 2026-03-09
**Auditor:** Lead Software Architect (Agent)

The **AmbiToolbox** has evolved from its initial cleanup phase into a high-performance, professional-grade spatial audio suite. The architecture centers around a robust **Handler Pattern** in the Electron Main process, communicating with a **React-driven Frontend** via a unified IPC bridge.

The most significant architectural shift since the last report is the introduction of the **Ingestion Router** and the **OBR (Object-Based Renderer) Preview Engine**, which allows for real-time binaural monitoring of high-order Ambisonics through a custom C++ streaming backend.

## 2. Changes Since Last Key Report (2026-02-07)

The project has advanced significantly in the past month, moving from "legacy migration" to "core feature expansion."

### 2.1 New Core Tools
*   **AmbiLevel**: Implemented linked-gain normalization to preserve spatial soundfield integrity.
*   **Ambix2BW64**: Added broadcast WAV output with ADM metadata support using a packaged `ear-utils` binary.
*   **Stereo2Ambix**: Introduced an adaptive PCA-based upmixer with frequency-domain diffusion.
*   **AmbiData**: A deep metadata inspection tool for IAMF, HOA, and Loudness metrics.

### 2.2 Infrastructure Hardening
*   **IngestionRouter.ts**: A centralized hub for qualifying incoming files. Handles proxying for proprietary formats (Apple `.aivu` via `afconvert`) and provides deterministic caching via MD5 hashing.
*   **Binaural Monitoring**: The `ObrHandler.ts` now manages an internal HTTP streaming server that decodes AU/WAV/IAMF formats and renders them to binaural stereo using **Google OBR**.
*   **Binary Consolidation**: Added `ear-utils-mac-arm64` (Python-packaged binary) and `apac-enc` (native Swift encoder) to `assets/bin/`, further reducing local environment dependencies.

### 2.3 UI/UX Unification
*   **Unified FileQueue**: Merged disparate tool queues into a single shared component (`src/components/FileQueue.tsx`) with integrated status tracking and playback triggers.
*   **Unified Transport**: Centralized playback controls (`src/components/Transport.tsx`) connected to the internal streaming engine.

## 3. Detailed Tree & Architecture Explanation

### 3.1 Core Directory Structure

*   **/electron/**: The "Brain" of the application.
    *   `main.ts`: Application entry point; initializes global IPC listeners.
    *   `preload.ts`: Secure bridge exposing `electronAPI` to the frontend.
    *   `handlers/`: Modular business logic for every tool. Each file corresponds to a specific utility (e.g., `Ambix2IAMF.ts`, `AmbiSwap.ts`).
    *   `IngestionRouter.ts`: Critical logic for file ingestion, proxy generation, and caching.

*   **/src/**: The "Face" of the application.
    *   `components/ToolViews.tsx`: The primary container that switches between tool UIs.
    *   `components/FileQueue.tsx`: Shared drag-and-drop ingestion and status monitoring.
    *   `contexts/`: Global state management for Playback, Settings, and Tool State.

*   **/assets/bin/**: The "Engine Room".
    *   Contains performance-critical binaries: `ffmpeg`, `ear-utils`, `iamf-enc`, `apac-enc`, and `obr_stream`.

*   **/py/**: Spatial Math & Extensions.
    *   `ambi_rotate.py` and `stereo_to_ambix.py` handle complex NumPy-based DSP operations triggered by the Electron handlers.

## 4. Component Interaction Analysis

The system follows a strict **Request-Response-Stream** model:

1.  **Ingestion**: Files dropped into `DropZone.tsx` are sent to `IngestionRouter.ts`. It decides if the file is natively playable, needs a proxy (e.g., Apple `.aivu` -> `WAV`), or needs recursive OBU parsing (IAMF).
2.  **State Management**: `ToolStateContext.tsx` tracks active tool selections, queue status, and processing progress.
3.  **Task Execution**: User clicks "Run". The React UI sends an IPC message to `electron/handlers/`. The handler initiates a child process (e.g., `ffmpeg` or `python3`).
4.  **Feedback Loop**: `stdout` and `stderr` are parsed in the handler to send real-time percentage updates back to the UI.
5.  **Monitoring**: If the user hits Play, `ObrHandler.ts` spawns a decoding pipeline that pipes PCM data into the `obr_stream` binary, which serves a binaural stereo stream back to the `<audio>` element in the frontend.

## 5. Vestigial File Report

### 🔴 High Confidence (Dead / Reference Code)
*   **`xCleanup/`**: Remains the primary quarantine zone for legacy `Spatial_Audio_Framework` and old Python apps.
*   **`GEMINI_CONTEXT.log`**, **`terminal.log`**, **`dev-debug.log`**: Standard developer clutter that should be excluded from production.
*   **`test_output.webm`**: A transient test recording.

### 🟡 Medium Confidence (Review Needed)
*   **`make_repo_map.py`**: A utility script in the root; consider moving to `scripts/`.
*   **`test_iamf_parser.py`**, **`test_stereo_to_ambix.py`**: Root-level test scripts. Should be migrated to the `/tests` folder for better repo hygiene.
*   **`parse_debug.ts`**: Likely a temporary debugging script in the root.
*   **`Accepted File Types by Tool.md`**: Potentially outdated documentation.

### 🟢 Low Confidence (Likely Useful)
*   **`PRPs/`**: Project Rollout Proposals. Crucial for understanding the project's evolution and specific technical decisions.
*   **`guides/`**: Visual aids for IAMF metadata and workflows.
*   **`parse_debug.ts`**: If it's used for active bug reporting, keep it, but relocate it out of the root.

## 6. Conclusion & Recommendations

The AmbiToolbox is now a mature "Swiss Army Knife" for spatial audio professionals. The implementation of the Ingestion Router significantly lowered the barrier for handling proprietary and complex spatial formats.

**Recommendations:**
1.  **Root Hygiene**: Move all standalone `.py` and `.ts` utility scripts from the root into `scripts/` or `tests/`.
2.  **Binary Versioning**: Ensure `assets/bin/` is monitored for version drift, particularly for `ffmpeg` and `ear-utils`.
3.  **Documentation Sync**: Update the `README.md` to reflect the newly integrated tools (`AmbiLevel`, `Stereo2Ambix`, etc.) if not already fully detailed.

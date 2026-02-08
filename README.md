# AmbiToolbox

**AmbiToolbox** is a comprehensive suite of spatial audio tools, now unified into a single **Electron** application. It provides a modern, user-friendly interface for converting, manipulating, and rendering Ambisonic audio files.

## Features

*   **Ambix2Opus**: Convert Ambisonic files to Opus format for web streaming.
*   **Ambix2Bin**: Binaural rendering of Ambisonic content using HRTF profiles (Neumann KU100, KEMAR).
*   **Ambix2IAMF**: Generate Immersive Audio Model and Formats (IAMF) files.
*   **AmbiOrder**: Change Ambisonic order (e.g., 3rd -> 1st) using intelligent channel mapping.
*   **AmbiSwap**: Convert between AmbiX (ACN/SN3D) and FuMa conventions.
*   **AmbiRotate**: Rotate the soundfield (Yaw/Pitch/Roll) with real-time progress tracking.
*   **Ambix2CAF**: Convert to Apple's Core Audio Format (CAF) with support for spatially aware channel layouts.

## Tech Stack

*   **Frontend**: React (v18), TypeScript, Tailwind CSS (v4), Vite.
*   **Backend**: Electron (v30), Node.js.
*   **Audio Engine**:
    *   **FFmpeg/FFprobe**: Core conversion and analysis engine.
    *   **Python (NumPy/SciPy)**: Advanced DSP for rotation (via `rotator.py`).
    *   **IAMF Tools**: `iamf-enc` for IAMF generation.

## Installation

1.  **Prerequisites**: Ensure you have Node.js (v18+) and Python 3 installed.
2.  **Dependencies**:
    ```bash
    npm install
    # Python dependencies for rotation
    pip install numpy scipy soundfile
    ```
3.  **Development**:
    ```bash
    npm run dev
    ```

## Project Structure

```
AmbiToolbox/
├── src/                # React Frontend
│   ├── components/     # UI Components (ToolViews, DropZone)
│   ├── tools/          # Tool-specific logic (AmbiRotate, etc.)
│   └── types.ts        # Shared TypeScript interfaces
├── electron/           # Electron Main Process
│   ├── main.ts         # Entry point & IPC
│   ├── preload.ts      # Context Bridge
│   └── handlers/       # Task implementation (AmbiOrder, IAMF, etc.)
├── resources/          # Native scripts & assets
│   └── scripts/        # Python scripts (rotator.py)
└── xCleanup/           # Legacy code archive
```

## Recent Updates (Feb 2026)

*   **Unified Architecture**: Migrated from disparate Python scripts to a single Electron app.
*   **AmbiRotate**: Fixed script pathing and implemented chunked processing for smooth progress bars.
*   **AmbiOrder**: Resolved FFmpeg filter syntax errors for reliable order conversion.
*   **UI Polish**: Enhanced dark mode UI with Tailwind CSS, ensuring responsive layout and feedback.
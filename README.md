# AmbiToolbox (Electron Monolith)

**AmbiToolbox** is a unified spatial audio utility suite for macOS, built with **Electron, React, and TypeScript**.
It consolidates multiple audio conversion tools into a single, modular application.

## 🛠 Features

### Ready & Active
1.  **Ambix2Opus**: Convert Ambisonics (.wav/.amb) to Opus (.opus) with proper channel mapping (Family 2).
    -   Supports 1st, 2nd, 3rd, 4th Order.
    -   Configurable quality.
2.  **Ambix2Bin**: Render Ambisonics to Binaural Stereo using SOFA HRTF files.
    -   Built-in Neumann KU100 and KEMAR profiles.
3.  **Ambix2IAMF**: Encode Ambisonics to IAMF (Immersive Audio Model and Formats).
    -   Generates Type 2 (Ombisonic) IAMF streams.
4.  **Ambix2CAF**: Convert to Apple CAF format (Discrete or HOA/ACN Layouts).
5.  **AmbiOrder**: Reduce Ambisonic Order (e.g., 3rd -> 1st) with dynamic input detection.

6.  **AmbiSwap**: Convert between ACN/SN3D (AmbiX) and FuMa (MaxN).
    -   *Crucial*: Enforced 24-bit PCM output to prevent gain-normalization data loss.

### Construction Zone (UI Ready, Backend Pending)
-   **AmbiRotate**: Apply Yaw/Pitch/Roll rotation to the soundfield.

## 🚀 Getting Started

### Prerequisites
-   **Node.js** (v18+)
-   **Python 3** (for Ambix2Bin binaural rendering backend)

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running in Development
```bash
npm run dev
```
(Binaries for ffmpeg/ffprobe/iamf-enc are expected in `assets/bin/`)

### Building for Production
```bash
npm run build
```
The output can be found in `release/` or `dist/`.

## 🏗 Architecture

-   **Frontend**: React + TypeScript + TailwindCSS (`src/`)
-   **Backend**: Electron Main Process (`electron/`)
    -   **Handlers**: `electron/handlers/` (Business logic for each tool)
    -   **Bridge**: `electron/preload.ts` (API exposed to window.electron)
-   **Legacy**: Old Python/Swift apps are archived in `legacy_apps/`.

## 🧪 Testing

Run integration tests for the backend logic:
```bash
npm run test
```

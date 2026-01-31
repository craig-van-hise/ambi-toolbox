# Ambi IAMF Converter

A desktop application for converting Ambisonic audio files (WAV) to the Immersive Audio Model and Formats (IAMF) standard.

## Features
- **Drag & Drop Interface:** Simple, user-friendly UI.
- **Ambisonics Support:** Specifically designed for 3rd Order (16-channel) Scene-based Ambisonics.
- **High Quality Encoding:** Uses Google's `iamf-tools` (`iamf-enc`) for compliant IAMF generation.
- **Quality Control:** Selectable quality presets (Low, Medium, High, Highest) controlling per-channel bitrate (32kbps - 128kbps).
- **Hybrid Workflow:** Leverages FFmpeg for robust file probing and `iamf-enc` for precise Ambisonic encoding.

## Tech Stack
- **Electron** (Process management)
- **Vite** (Build tool)
- **React** (UI)
- **TypeScript** (Language)
- **Tailwind CSS** (Styling)

## Requirements
- **macOS** (Project is currently configured and binary-bundled for macOS).
- **Binaries:** Requires `ffmpeg` and `iamf-enc` placed in `resources/bin/` (handled by build process).

## Usage
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Dev Mode:**
    ```bash
    npm run dev
    ```
3.  **Build:**
    ```bash
    npm run build
    ```

## Development
- **Main Process:** `electron/main.ts`
- **Frontend:** `src/App.tsx`
- **Conversion Logic:** `electron/ffmpeg-helper.ts` (Orchestrates `iamf-enc` execution).
- **Configuration:** `electron/iamf-config-generator.ts` (Generates protobuf configs on-the-fly).

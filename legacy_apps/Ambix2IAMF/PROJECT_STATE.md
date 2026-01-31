# PROJECT_STATE
**Date:** 2026-01-30

## 1. Architecture
Top-level directory structure:
```
.
├── PRPs/                 # Product Requirement Papers
├── dist-electron/        # Compiled Electron backend
├── electron/             # Source: Main process, Preload, FFmpeg helpers
│   ├── main.ts           # App entry point, IPC handlers
│   ├── preload.ts        # Context Bridge (API exposure)
│   ├── ffmpeg-helper.ts  # Conversion orchestration (FFmpeg + iamf-enc)
│   └── iamf-config-generator.ts # Dynamic IAMF configuration logic
├── iamf-tools/           # AOMedia IAMF Tools source/build
├── resources/            # Bundled resources
│   └── bin/              # Binaries: ffmpeg, iamf-enc
├── src/                  # Source: Frontend (React)
│   ├── App.tsx           # Main UI (Drag & Drop, Quality Selector)
│   └── main.tsx          # React entry point
├── tests/                # Unit tests
└── package.json          # Dependencies & Scripts
```

## 2. Tech Stack
- **Framework:** Electron + Vite + React + TypeScript
- **Styling:** Tailwind CSS
- **Core Tools:**
    - **FFmpeg:** Input probing and pre-processing.
    - **iamf-tools (iamf-enc):** Ambisonics to IAMF encoding (Scene-based, Order 3).
- **Languages:** TypeScript, C++ (iamf-tools source).

## 3. Status
- **Core Functionality:** Implemented.
    - Drag & Drop interface.
    - Hybrid conversion workflow (FFmpeg probe -> iamf-enc encode).
    - Dynamic `.textproto` generation for IAMF configuration.
- **Features:**
    - **Ambisonics Support:** 16-channel (3rd Order) Scene-based Ambisonics.
    - **Quality Selector:** User-selectable bitrate (Low/Med/High/Highest) affecting per-channel encoding quality.
- **Build System:** `electron-builder` configured for macOS.

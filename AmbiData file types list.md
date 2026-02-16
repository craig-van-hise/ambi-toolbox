# AmbiData - Supported File Types for Inspection

Based on the documentation and current codebase configuration, **AmbiData** accepts the following file formats for analysis:

## 🎵 Audio Containers
*   **`.wav`**: Waveform Audio File Format (Standard / BWF / RF64)
*   **`.amb`**: Ambisonic Exchange (WAV-based container)
*   **`.opus`**: Ogg Opus (Vorbis comment metadata)
*   **`.ogg`**: Ogg Container (Vorbis/Opus)
*   **`.caf`**: Core Audio Format (Apple Spatial Audio)
*   **`.m4a`**: MPEG-4 Audio (AAC/ALAC)

## 📦 Spatial & Raw Bitstreams
*   **`.iamf`**: Immersive Audio Model and Formats (Raw OBU Bitstreams)
*   **`.aivu`**: Internal/Proprietary Spatial Format (Video/Audio container)

## 🎬 Video Containers (Multimedia)
*   **`.mp4`**: MPEG-4 Part 14 (Standard Video/Audio)
*   **`.mov`**: QuickTime Movie (Apple ProRes / H.264 / HEVC)
*   **`.mkv`**: Matroska Video (Flexible container)
*   **`.webm`**: WebM (VP8/VP9/AV1 Video + Opus Audio)

---

**Note:** While AmbiData can *inspect* these files, deep spatial metadata analysis (like Ambisonic Order detection or channel mapping) is most robust for `.wav`, `.amb`, `.opus`, and `.iamf` files.

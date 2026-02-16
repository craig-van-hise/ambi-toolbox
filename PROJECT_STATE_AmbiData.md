# AmbiData - Component Status Report
**Last Updated:** February 16, 2026
**Status:** 🟡 Advanced Beta (Active Development)

## 1. Executive Summary
**AmbiData** is the dedicated file analysis and inspection module within AmbiToolbox. It replaces the need for external tools like `ffprobe` or `MediaInfo` by providing a unified, visual interface for inspecting spatial audio assets. It uses a **hybrid backend** combining FFmpeg/FFprobe, custom binary parsers (IAMF/WAV), and Python heuristics to deliver deep insights into complex 3D audio formats.

## 2. Core Architecture

### **Frontend (Adaptive UI)**
*   **Component:** `src/tools/AmbiData/components/Inspector.tsx`
*   **Layout:** **5-Card Vertical Stack**
    1.  **File Identity:** Container format, Size, Duration (Precise).
    2.  **Stream Selector:** Dynamic dropdown. Lists generic streams for containers (MP4/MOV) or **Parsed OBUs** for IAMF.
    3.  **Core Specs:** Codec, Sample Rate, Bit Depth, Channel Count, Ambisonic Order (Bound to selected stream).
    4.  **Signal Health & Dynamics:** EBUR128 Loudness (Integrated, LRA, True Peak) and Health (Clipping, DC Offset).
    5.  **Spatial Metadata:** Format prediction (AmbiX/FuMa) and metadata inspection.
*   **Progressive Loading:**
    *   **Phase 1 (Basic/Fast):** Instant render via `WaveParser.ts` (milliseconds).
    *   **Phase 2 (Metadata):** FFprobe / IAMF Parser execution.
    *   **Phase 3 (Loudness):** Async EBUR128 analysis.
    *   **Phase 4 (Health):** Async Signal Health analysis.
    *   **Phase 5 (Spatial):** Python Heuristics (for WAV/AmbiX).

### **Backend (Handlers)**
*   **Primary Handler:** `electron/handlers/AmbiData.ts`
*   **Parsers:**
    *   `IamfParser.ts`: Custom **OBU (Open Bitstream Unit)** parser. Reads Leb128 integers to extract Audio Elements, Parameter Definitions, and Mix Presentations directly from raw bitstreams.
    *   `WaveParser.ts`: Light-weight binary reader for instant WAV header parsing (bypasses FFmpeg startup cost).
*   **Analysis Engines:**
    *   **FFprobe:** JSON-based metadata extraction.
    *   **FFmpeg Filters:** `ebur128` (Loudness), `astats` (Signal Health).
    *   **Python:** Scipy/NumPy-based channel correlation for heuristics.

## 3. Feature Compatibility Matrix

| Feature | WAV / AmbiX | IAMF (Raw) | MP4 / MOV / MKV |
| :--- | :--- | :--- | :--- |
| **Basic Info** | ✅ Instant (`WaveParser`) | ✅ (Calculated) | ✅ (FFprobe) |
| **Structure** | Single Stream | **Multi-OBU** (Scene/Channel) | Multi-Track |
| **Stream Select** | N/A (Main) | ✅ **OBU Selector** | ✅ Track Selector |
| **Ambisonic Order** | ✅ Calculated | ✅ **Extracted from OBU** | ✅ Calculated |
| **Loudness** | ✅ EBUR128 | ⚠️ **Embedded Metadata** | ✅ EBUR128 |
| **Signal Health** | ✅ Clipping/DC | ⚠️ **Embedded Metadata** | ✅ Clipping/DC |
| **Spatial Format** | ✅ **Heuristics** (Python) | ✅ **Metadata** (OBU Type) | ⚠️ Layout Tag |

*Note: For IAMF, we prioritize Embedded Metadata for Loudness/Health because raw bitstreams often require specific rendering pipelines that standard EBUR128 filters don't support natively without decoding.*

## 4. Recent Implementation Highlights (PRP #83 - #86)

### **IAMF Integration**
*   **OBU-Level Analysis:** We no longer rely on FFmpeg to "guess" IAMF structure. We parse the `Audio Element OBUs` directly.
*   **Correct Channel Mapping:** Resolved "0 Channel" bugs by extracting `outputChannelCount` from the OBU's `ambisonics_config` or `scalable_channel_layout_config`.
*   **Instant Switching (PRP #86):** Changing the selected OBU in the UI instantly updates the displayed specs (Channels/Order) by querying the pre-parsed metadata, bypassing expensive and unnecessary backend re-analysis.

### **Adaptive Data Binding**
*   The Inspector cards are no longer static. They bind dynamically to `activeStream` or `selectedObu`.
*   **Guardrails:**
    *   **Channel-Based IAMF:** Explicitly displays "N/A (Channel-Based)" for Ambisonic Order to prevent mathematical errors.
    *   **Raw Bitstreams:** Displays "Unknown (Raw Bitstream)" for duration if the container header is missing.

## 5. Roadmap & Known Issues
*   **APAC Support:** Apple Spatial Audio Codec analysis is currently basic. Deep inspection of APAC chunks in CAF containers is planned.
*   **IAMF Refinements:** Further support for "Mix Presentation" sub-elements and user-selectable render targets.
*   **Visualizers:** Future integration of channel-energy heatmaps (currently available in heuristics backend but not visualized).

# Product Requirement Prompt: AmbiMonitor

**Role:** Senior Python Developer (PyQt6 & FFmpeg Expert)
**Project:** AmbiToolbox
**Component:** App #1 - AmbiMonitor

## 1. Context & Objective
You are building **AmbiMonitor**, a drag-and-drop utility that allows audio engineers to quickly preview Ambisonics files (`.wav`, `.amb`, `.opus`, `.caf`) by converting them to a standard stereo format.

**Key Feature:** The user can toggle between two monitoring modes:
1.  **Headphones (Binaural):** Simulates a 3D sound field over stereo headphones.
2.  **Speakers (Stereo):** Decodes to a standard stereo pair (virtual microphone array) for playback on monitors.

## 2. Technical Specifications
* **Reference Document:** **READ** the file `AmbiToolbox_Boilerplate.md` in the project root. You must strictly adhere to the class structure and design system defined there.
* **Base Class:** You MUST inherit from `AmbiToolboxApp` (defined in `src/common_ui.py`).
* **Accent Color:** `#2ecc71` (Signal Green).
* **Output Format:** Always outputs a `.wav` file (PCM 16-bit or 24-bit) in the same directory as the source, appended with `_binaural` or `_stereo`.

## 3. UI Requirements
You need to implement the `options_area` with the following widgets (using `qtawesome` icons where appropriate):

1.  **Mode Toggle:** A segmented control or two exclusive buttons:
    * [Icon: `mdi.headphones`] **"Binaural"** (Default)
    * [Icon: `mdi.speaker`] **"Stereo"**
2.  **Process Button:** A large, clearly visible button labeled "CONVERT & PREVIEW".
    * *Behavior:* Initially disabled until a file is dropped.

## 4. Audio Processing Logic (FFmpeg)
Use `subprocess` to call FFmpeg.

**Logic for Mode A: Binaural (Headphones)**
Use the `v360` filter to render a binaural approximation.
`ffmpeg -i "input.wav" -af "v360=input=ambix:output=binaural" "input_binaural.wav"`

**Logic for Mode B: Stereo (Speakers)**
Use the `v360` filter to render a virtual stereo microphone pair (90-degree field of view).
`ffmpeg -i "input.wav" -af "v360=input=ambix:output=stereo:w_fov=90" "input_stereo.wav"`

*Note: Ensure you handle filenames with spaces by quoting them in the command construction.*

## 5. Implementation Task List
The agent should perform these steps:

- [ ] **Setup:** Create `src/app_ambix2bin.py` and import `AmbiToolboxApp` from `common_ui`.
- [ ] **UI Construction:**
    - Initialize the app with Name "AmbiMonitor" and Color `#2ecc71`.
    - Add the Headphone/Speaker toggle switches.
    - Add the "Convert" button.
- [ ] **State Management:**
    - Store the `current_file_path`.
    - Update `current_mode` variable when toggles change.
- [ ] **Processing Logic:**
    - Implement `process_file(self, file_path)` to store the path and enable the Convert button.
    - Implement `run_conversion()`:
        - Construct the FFmpeg command based on `current_mode`.
        - Run via `subprocess.run`.
        - Update the status label (e.g., "Converting...", "Done! Saved to...").
- [ ] **Validation:**
    - Create a "Dry Run" test that prints the exact FFmpeg command string to the console for verification.

## 6. Validation Criteria (Manual Check)
1.  Run the app.
2.  Verify the Title Bar says "AmbiToolbox | AmbiMonitor".
3.  Verify the Accent Color is Green.
4.  Drop a file: Does the "DROP FILE HERE" text change to the filename?
5.  Click Convert: Does the status update?
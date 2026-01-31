

### Master Prompt: Ambitrim (Corrected Specification)

**Role:** You are an expert Python Audio Applications Engineer (PyQt6 Specialist).

**Project:** **Ambitrim**
**Objective:** Build a desktop utility that lists Ambisonic audio files, detects their specific order, and offers per-file options to trim them to a lower order.

**Tech Stack:** Python 3.x, PyQt6, `soundfile`/`numpy`.

---

### I. The Corrected UI/UX Workflow (Strict Requirements)

**1. The "List-First" Workflow (NO Auto-Processing)**
* **Behavior:** When files are dragged and dropped (or opened) into the app, **NOTHING** happens to the audio data yet.
* **Action:** The app simply reads the file header to detect channel count and adds the file to a **Queue/List View**.

**2. The File List Interface**
The main window must feature a dynamic list (e.g., `QTableWidget` or scrollable layout) where *each row* represents a loaded file. Each row must contain:
1.  **Filename:** Display the name of the file.
2.  **Detected Order:** Display the source order based on channel count (e.g., "3rd Order (16ch)").
    * *Logic:* 16ch = 3rd, 9ch = 2nd, 4ch = 1st.
3.  **Target Dropdown (Crucial):** A specific `QComboBox` for *this file only*.
    * **Logic:** This dropdown must **dynamically** populate with only valid *lower* orders.
    * *Example:* If I drop a 3rd Order file, the box offers: ["2nd Order", "1st Order"].
    * *Example:* If I drop a 2nd Order file, the box offers: ["1st Order"].
4.  **Remove Button:** To clear the file from the list.

**3. Execution**
* **Process Button:** A main "Export" or "Process All" button at the bottom.
* **Action:** When clicked, the app iterates through the list, applies the specific trim selected in each row's dropdown, and saves the new files (appending `_[TargetOrder]` to the filename).

---

### II. Mandatory Development Workflow

**Step 1: Project Management (`TASKS.md`)**
* **IMMEDIATE ACTION:** Create `TASKS.md`.
* **Content:** List steps for:
    1.  Setup.
    2.  Logic (Channel/Order Math).
    3.  **Test Suite:** scanning local folder for validation.
    4.  **UI Construction:** specifically the "Row Widget" logic for the list.
* **Rule:** Check off items as you go.

**Step 2: Validation (Test-Driven Logic)**
* **Context:** I have placed valid Ambisonic files in the project root.
* **Task:** Create a script that scans these files and prints a report:
    * "File A: Detected 16ch (3rd Order). Valid Targets: 2nd, 1st."
* **Run this script first** to prove the detection and "valid target" logic works before building the GUI.

**Step 3: The Build**
* Build the GUI using the strict "Row-Based" design defined in Section I.
* Launch the app so I can drag files in to test the listing and dropdown logic.

---

### III. Execution

Start by generating `TASKS.md` and then run the validation script on the files currently in my folder.
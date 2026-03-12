status: ✅ Completed

# Product Requirements Prompt (PRP): Automated Unified Logging System

## Objective
status: ✅ Completed
Implement an automated logging system for this Electron + Vite project that captures both Terminal (Main Process) and DevTools (Renderer Process) output into a single, concatenated `dev-debug.log` file in the project root.

## Technical Requirements
1. **Dependency:** Install `electron-log` via npm.
2. **Main Process Integration:**
   - Configure `electron-log` in the Main process entry point.
   - Set the log file transport path to the absolute project root (e.g., `path.join(__dirname, '../../dev-debug.log')`).
   - Ensure the log file is overwritten or cleared on every `npm run dev` start to prevent context bloat for Gemini.
3. **Renderer Process Integration:**
   - Use `electron-log/renderer` to intercept all `console` methods (`log`, `warn`, `error`) in the DevTools.
   - Ensure these logs are piped back to the Main process and written to the same `dev-debug.log`.
4. **Vite Terminal Output:**
   - Update the `dev` script in `package.json` to use the `tee` command (or a cross-platform equivalent) to ensure Vite's terminal output is also mirrored to a file named `terminal.log`.
5. **Final Concatenation (The "App Quit" Trigger):**
   - Create a small Node or Python utility script that triggers when the Electron app closes.
   - This script should merge `terminal.log` and `dev-debug.log` into one final `GEMINI_CONTEXT.log` file.

## Execution Steps for Agent
- **Step 1:** Scan the project structure to identify the Main and Renderer entry points.
- **Step 2:** Install `electron-log`.
- **Step 3:** Inject the logging configuration into the Main and Renderer processes.
- **Step 4:** Modify `package.json` to handle the file piping.
- **Step 5:** Create a cleanup script to ensure the logs are fresh for every new debugging session.

## Success Criteria
- Upon quitting the Electron app, a single file named `GEMINI_CONTEXT.log` should exist in the project root containing both the terminal output and the browser console logs.
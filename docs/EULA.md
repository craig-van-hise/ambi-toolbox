# End User License Agreement for AmbiToolbox

**IMPORTANT: PLEASE READ THIS AGREEMENT CAREFULLY.**

This End User License Agreement ("EULA") is a legal agreement between you (either an individual or a single entity) and the Author ("Licensor") of AmbiToolbox.

## 1. GRANT OF LICENSE
The Licensor grants you a non-exclusive, non-transferable license to use the executable code of AmbiToolbox. Use of the software is permitted for personal and commercial audio production workflows.

## 2. PROPRIETARY RIGHTS
The software (including source code in `src/`, `electron/`, and `py/`) is proprietary and confidential. You may not distribute, modify, or create derivative works of the source code without express written permission.

## 3. RESTRICTIONS
You may not reverse engineer, decompile, or disassemble the Software, except as explicitly permitted by applicable law or the terms of the third-party licenses listed in `NOTICE.txt`.

### LGPL REVERSE ENGINEERING EXCEPTION
This software links to FFmpeg libraries licensed under the LGPL v2.1. In accordance with the LGPL, you have the right to:
1.  Reverse engineer the portions of this Software that interface with FFmpeg for the sole purpose of debugging your modifications to FFmpeg.
2.  Replace the bundled `ffmpeg` executables in `assets/bin/` with your own compatible versions.

## 4. NO WARRANTY
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY.

### THIRD PARTY EXECUTABLES
This software bundles several third-party binaries:
1. FFmpeg & FFprobe (LGPL v2.1)
2. APAC Encoder (Proprietary Apple)
3. IAMF Encoder (BSD-3-Clause)
4. EBU ADM Renderer (BSD-3-Clause-Clear)

You may replace these binaries in `assets/bin/` with your own compatible versions, provided you comply with their respective licenses.


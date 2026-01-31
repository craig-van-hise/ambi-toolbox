import { IpcMainInvokeEvent, app } from 'electron';
import path from 'node:path';
import { spawn } from 'node:child_process';
import fs from 'node:fs';

// Helper to get script path
function getScriptPath(scriptName: string): string {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'scripts', scriptName);
    }
    return path.join(process.cwd(), 'electron', 'handlers', 'scripts', scriptName);
}

// Helper to get asset path
function getSofaPath(filename: string): string {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'sofa', filename);
    }
    return path.join(process.cwd(), 'assets', 'sofa', filename);
}

export async function handleAmbix2Bin(event: IpcMainInvokeEvent, options: {
    inputPath: string;
    hrtfProfile: string; // "Neumann", "Kemar", "Custom"
    customSofaPath?: string;
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { inputPath, hrtfProfile, customSofaPath } = options;

    try {
        // 1. Determine SOFA Path
        let sofaPath = '';
        console.log(`[Ambix2Bin] Profile requested: ${hrtfProfile}`);

        if (hrtfProfile.includes('Neumann')) {
            sofaPath = getSofaPath('HRIR_L2702.sofa');
        } else if (hrtfProfile.includes('Kemar')) {
            sofaPath = getSofaPath('mit_kemar_normal_pinna.sofa');
        } else if (hrtfProfile.includes('Custom')) {
            if (customSofaPath && fs.existsSync(customSofaPath)) {
                sofaPath = customSofaPath;
            } else {
                // If no custom path provided (e.g. from UI file picker which is not yet in types),
                // we might need to ask frontend or fail. 
                // Currently UI in ToolViews.tsx doesn't have file picker for custom SOFA implemented fully
                // (it just sends 'Custom' enum). 
                // We'll throw for now if missing.
                throw new Error("Custom SOFA path not provided.");
            }
        } else {
            // Default
            sofaPath = getSofaPath('HRIR_L2702.sofa');
        }

        if (!fs.existsSync(sofaPath)) {
            throw new Error(`SOFA file not found at: ${sofaPath}`);
        }

        // 2. Output Path (replace with .bin.wav)
        const outputPath = inputPath.replace(/\.[^/.]+$/, "") + "_binaural.wav";

        // 3. Spawn Python Script
        // We assume 'python3' is available in env or .venv
        // If packaged, we might need a bundled python or expect sys python.
        // For now, assume 'python3'.

        const scriptPath = getScriptPath('saf_wrapper.py');
        const pythonArgs = [
            scriptPath,
            '--input', inputPath,
            '--output', outputPath,
            '--sofa', sofaPath
        ];

        console.log(`[Ambix2Bin] Spawning python3 ${pythonArgs.join(' ')}`);

        return new Promise((resolve) => {
            const child = spawn('python3', pythonArgs);
            let stdout = '';
            let stderr = '';

            child.stdout.on('data', d => stdout += d.toString());
            child.stderr.on('data', d => stderr += d.toString());

            child.on('close', (code) => {
                if (code === 0) {
                    event.sender.send('task-progress', 1.0);
                    resolve({ success: true, data: { outputPath } });
                } else {
                    console.error("[Ambix2Bin] Python Error:", stderr);
                    resolve({ success: false, error: `Python script failed (code ${code}). Error: ${stderr}` });
                }
            });

            child.on('error', (err) => {
                resolve({ success: false, error: `Failed to spawn python3: ${err.message}` });
            });
        });

    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

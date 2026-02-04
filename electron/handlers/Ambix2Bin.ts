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
    files: string[];
    hrtfProfile: string; // "Neumann", "Kemar", "Custom"
    customSofaPath?: string;
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, hrtfProfile, customSofaPath } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        // 1. Determine SOFA Path (Once for all files)
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
                throw new Error("Custom SOFA path not provided.");
            }
        } else {
            sofaPath = getSofaPath('HRIR_L2702.sofa');
        }

        if (!fs.existsSync(sofaPath)) {
            throw new Error(`SOFA file not found at: ${sofaPath}`);
        }

        const scriptPath = getScriptPath('saf_wrapper.py');
        const results = [];

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];
            const outputPath = inputPath.replace(/\.[^/.]+$/, "") + "_binaural.wav";

            console.log(`[Ambix2Bin] Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`);

            const pythonArgs = [
                scriptPath,
                '--input', inputPath,
                '--output', outputPath,
                '--sofa', sofaPath
            ];

            await new Promise<void>((resolve, reject) => {
                const child = spawn('python3', pythonArgs);
                let stderr = '';

                child.stderr.on('data', d => stderr += d.toString());

                child.on('close', (code) => {
                    if (code === 0) resolve();
                    else reject(new Error(`Python script failed (code ${code}). Error: ${stderr}`));
                });

                child.on('error', (err) => reject(new Error(`Failed to spawn python3: ${err.message}`)));
            });

            results.push(outputPath);
            event.sender.send('task-progress', (i + 1) / files.length); // Simple progress
        }

        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        console.error("[Ambix2Bin] Error:", e);
        return { success: false, error: e.message };
    }
}

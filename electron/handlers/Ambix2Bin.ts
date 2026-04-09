import { IpcMainInvokeEvent, app } from '../shim';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { determineOutputPath, getSofaAssetPath } from './common';
import fs from 'node:fs';

// Helper to get script path
function getScriptPath(scriptName: string): string {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'scripts', scriptName);
    }
    return path.join(process.cwd(), 'electron', 'handlers', 'scripts', scriptName);
}



export async function handleAmbix2Bin(event: IpcMainInvokeEvent, options: {
    files: string[];
    hrtfSelection: { type: string; customPath?: string };
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, hrtfSelection, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        // 1. Determine SOFA Path (Once for all files)
        let sofaPath = '';
        console.log(`[Ambix2Bin] Selection requested: ${JSON.stringify(hrtfSelection)}`);

        const hrtfFileMap: Record<string, string> = {
            'neumann': 'Neumann_KU100_48k.sofa',
            'kemar': 'MIT_KEMAR_Normal.sofa',
            'h3': 'H3_48K_24bit_256tap_FIR_SOFA.sofa'
        };

        if (hrtfSelection.type === 'custom') {
            if (hrtfSelection.customPath && fs.existsSync(hrtfSelection.customPath)) {
                sofaPath = hrtfSelection.customPath;
            } else {
                throw new Error(`Custom SOFA file not found at: ${hrtfSelection.customPath}`);
            }
        } else {
            const filename = hrtfFileMap[hrtfSelection.type];
            if (!filename) throw new Error(`Unknown HRTF profile ID: ${hrtfSelection.type}`);
            
            sofaPath = getSofaAssetPath(filename);
            
            if (!fs.existsSync(sofaPath)) {
                throw new Error(`Built-in SOFA file not found at: ${sofaPath}`);
            }
        }


        const scriptPath = getScriptPath('saf_wrapper.py');
        const results = [];

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];

            const outputPath = determineOutputPath(inputPath, settings, 'Binaural', '_Binaural.wav');

            const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
            console.log(`[Ambix2Bin] ${statusMsg}`);
            event.sender.send('task-status', { msg: statusMsg, toolId: 'ambix2bin' });

            const pythonArgs = [
                scriptPath,
                '--input', inputPath,
                '--output', outputPath,
                '--sofa', sofaPath
            ];

            await new Promise<void>((resolve, reject) => {
                const child = spawn('python3', pythonArgs);
                let stderr = '';

                child.stdout.on('data', (d) => {
                    const lines = d.toString().split('\n');
                    for (const line of lines) {
                        if (line.startsWith('PROGRESS:')) {
                            const p = parseFloat(line.split(':')[1]);
                            if (!isNaN(p)) {
                                const totalProgress = (i + p) / files.length;
                                event.sender.send('task-progress', { progress: totalProgress, toolId: 'ambix2bin' });
                            }
                        } else if (line.trim()) {
                            console.log(`[Ambix2Bin] Py: ${line.trim()}`);
                        }
                    }
                });

                child.stderr.on('data', d => stderr += d.toString());

                child.on('close', (code) => {
                    if (code === 0) resolve();
                    else reject(new Error(`Python script failed (code ${code}). Error: ${stderr}`));
                });

                child.on('error', (err) => reject(new Error(`Failed to spawn python3: ${err.message}`)));
            });

            results.push(outputPath);
            event.sender.send('task-progress', { progress: (i + 1) / files.length, toolId: 'ambix2bin' });
        }

        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        console.error("[Ambix2Bin] Error:", e);
        return { success: false, error: e.message };
    }
}

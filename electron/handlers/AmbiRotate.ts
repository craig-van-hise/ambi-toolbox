import { IpcMainInvokeEvent, app } from '../shim';
import path from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { determineOutputPath } from './common';

// Helper to get script path
function getScriptPath(scriptName: string): string {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'scripts', scriptName);
    }
    return path.join(process.cwd(), 'resources', 'scripts', scriptName);
}

export async function handleAmbiRotate(event: IpcMainInvokeEvent, options: {
    files: string[];
    yaw: number;
    pitch: number;
    roll: number;
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, yaw, pitch, roll, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        const scriptName = 'rotator.py';
        const scriptPath = getScriptPath(scriptName);

        if (!fs.existsSync(scriptPath)) {
            throw new Error(`Rotation script not found at: ${scriptPath}`);
        }

        const results = [];

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];
            const outputPath = determineOutputPath(inputPath, settings, 'Rotated', '_Rotated.wav');
            const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;

            console.log(`[AmbiRotate] ${statusMsg}`);
            event.sender.send('task-status', { msg: statusMsg, toolId: 'ambirotate' });

            // Spawn Python
            const pythonArgs = [
                scriptPath,
                inputPath,
                outputPath,
                '--yaw', yaw.toString(),
                '--pitch', pitch.toString(),
                '--roll', roll.toString()
            ];

            // console.log(`[AmbiRotate] Spawning python3 ${pythonArgs.join(' ')}`);

            await new Promise<void>((resolve, reject) => {
                const child = spawn('python3', pythonArgs);
                let stdout = '';
                let stderr = '';

                child.stdout.on('data', d => {
                    const str = d.toString();
                    stdout += str;

                    // Parse Progress
                    const lines = str.split('\n');
                    for (const line of lines) {
                        const match = line.match(/PROGRESS:\s*(\d+)/);
                        if (match) {
                            const percent = parseInt(match[1], 10);
                            const fileFraction = percent / 100.0;
                            const overall = (i + fileFraction) / files.length;
                            event.sender.send('task-progress', { progress: overall, toolId: 'ambirotate' });
                        }
                    }
                });
                child.stderr.on('data', d => stderr += d.toString());

                child.on('close', (code) => {
                    if (code === 0) {
                        resolve();
                    } else {
                        console.error("[AmbiRotate] Error:", stderr);
                        reject(new Error(`Rotate script failed (code ${code}). ${stderr}`));
                    }
                });

                child.on('error', (err) => {
                    reject(new Error(`Failed to spawn python3: ${err.message}`));
                });
            });

            results.push(outputPath);
            event.sender.send('task-progress', { progress: (i + 1) / files.length, toolId: 'ambirotate' });
        }

        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

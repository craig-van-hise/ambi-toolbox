import { IpcMainInvokeEvent, app } from 'electron';
import path from 'node:path';
import { spawn } from 'node:child_process';
import fs from 'node:fs';

// Helper to get script path
function getScriptPath(scriptName: string): string {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'scripts', scriptName);
    }
    return path.join(process.cwd(), 'resources', 'scripts', scriptName);
}

export async function handleAmbiRotate(event: IpcMainInvokeEvent, options: {
    inputPath: string;
    yaw: number;
    pitch: number;
    roll: number;
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { inputPath, yaw, pitch, roll } = options;

    try {
        const scriptName = 'rotate_ambisonics.py';
        const scriptPath = getScriptPath(scriptName);

        if (!fs.existsSync(scriptPath)) {
            // Fallback for dev environment if path differs
            // In dev: resources/scripts
            // Check if it exists
            throw new Error(`Rotation script not found at: ${scriptPath}`);
        }

        // Output Path
        const outputPath = inputPath.replace(/\.[^/.]+$/, "") + "_Rotated.wav";

        // Spawn Python
        const pythonArgs = [
            scriptPath,
            inputPath,
            outputPath,
            '--yaw', yaw.toString(),
            '--pitch', pitch.toString(),
            '--roll', roll.toString()
        ];

        console.log(`[AmbiRotate] Spawning python3 ${pythonArgs.join(' ')}`);

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
                    console.error("[AmbiRotate] Error:", stderr);
                    resolve({ success: false, error: `Rotate script failed (code ${code}). ${stderr}` });
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

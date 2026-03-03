import { IpcMainInvokeEvent } from '../shim';
import path from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import { determineOutputPath } from './common';
import { app } from 'electron';

// Helper to get script path
function getScriptPath(scriptName: string): string {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'scripts', scriptName);
    }
    return path.join(process.cwd(), 'py', scriptName);
}

const VALID_ORDERS: Record<string, string> = {
    '1st Order': '1',
    '2nd Order': '2',
    '3rd Order': '3',
    '3rd Order (16 Channels)': '3',
    '4th Order': '4',
    '4th Order (25 Channels)': '4',
    '5th Order': '5',
    '5th Order (36 Channels)': '5',
    '6th Order': '6',
    '6th Order (49 Channels)': '6',
    '7th Order': '7',
    '7th Order (64 Channels)': '7',
};

// Deterministic Caching directory setup
const CACHE_DIR = path.join(app.getPath('userData'), 'AmbiToolbox', '.cache');
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function getCachePath(hash: string): string {
    return path.join(CACHE_DIR, `stereo2ambix_${hash}.json`);
}

export async function handleStereo2Ambix(event: IpcMainInvokeEvent, options: {
    files: string[];
    targetOrder: string;
    stageWidth: number;
    envelopment: number;
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, targetOrder, stageWidth, envelopment, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        // Validate Parameters
        if (!VALID_ORDERS[targetOrder]) {
            return { success: false, error: "Invalid target order. Must be between 1st and 7th Order." };
        }

        if (typeof stageWidth !== 'number' || stageWidth < 0 || stageWidth > 100) {
            return { success: false, error: "Stage width must be between 0 and 100." };
        }

        if (typeof envelopment !== 'number' || envelopment < 0 || envelopment > 100) {
            return { success: false, error: "Envelopment must be between 0 and 100." };
        }

        const scriptPath = getScriptPath('stereo_to_ambix.py');
        const results: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];
            const outputPath = determineOutputPath(inputPath, settings, 'Stereo2Ambix', `_AmbiX_${VALID_ORDERS[targetOrder]}O.wav`);

            // Generate MD5 cache hash
            const fileStat = await fs.promises.stat(inputPath);
            const hashPayload = JSON.stringify({
                path: inputPath,
                mtime: fileStat.mtimeMs,
                size: fileStat.size,
                targetOrder: VALID_ORDERS[targetOrder],
                stageWidth,
                envelopment
            });
            const hash = crypto.createHash('md5').update(hashPayload).digest('hex');
            const cacheFile = getCachePath(hash);

            if (fs.existsSync(cacheFile)) {
                const cacheData = JSON.parse(await fs.promises.readFile(cacheFile, 'utf-8'));
                // Verify that the cached output file actually still exists on disk
                if (fs.existsSync(cacheData.outputPath)) {
                    console.log(`[Stereo2Ambix] Cache Hit! Instantly skipping ${path.basename(inputPath)}`);
                    results.push(cacheData.outputPath);
                    event.sender.send('task-progress', { progress: (i + 1) / files.length, toolId: 'stereo2ambix' });
                    continue; // instantly bypass redundant computational overhead
                }
            }

            const statusMsg = `Upmixing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
            console.log(`[Stereo2Ambix] ${statusMsg}`);
            event.sender.send('task-status', { msg: statusMsg, toolId: 'stereo2ambix' });

            const pythonArgs = [
                scriptPath,
                '--input', inputPath,
                '--output', outputPath,
                '--order', VALID_ORDERS[targetOrder],
                '--width', stageWidth.toString(),
                '--envelopment', envelopment.toString()
            ];

            await new Promise<void>((resolve, reject) => {
                const child = spawn('python3', pythonArgs);
                let stderr = '';

                child.stdout.on('data', (d) => {
                    const lines = d.toString().split('\n');
                    for (const line of lines) {
                        if (!line.trim()) continue;
                        try {
                            // Continuously parse the standard output (stdout) stream for JSON-formatted progress updates
                            const json = JSON.parse(line.trim());
                            if (json && typeof json.progress === 'number') {
                                const totalProgress = (i + json.progress) / files.length;
                                event.sender.send('task-progress', { progress: totalProgress, toolId: 'stereo2ambix' });
                            }
                        } catch (err) {
                            if (line.includes('PROGRESS')) {
                                // fallback backward compatibility if they did 'PROGRESS:0.5'
                                const p = parseFloat(line.split(':')[1]);
                                if (!isNaN(p)) {
                                    const totalProgress = (i + p) / files.length;
                                    event.sender.send('task-progress', { progress: totalProgress, toolId: 'stereo2ambix' });
                                }
                            } else {
                                console.log(`[Stereo2Ambix] Py: ${line.trim()}`);
                            }
                        }
                    }
                });

                child.stderr.on('data', d => stderr += d.toString());

                child.on('close', async (code) => {
                    if (code === 0) {
                        try {
                            // Save success cache
                            await fs.promises.writeFile(cacheFile, JSON.stringify({ outputPath }));
                        } catch (e) {
                            console.error("[Stereo2Ambix] Cache save error:", e);
                        }
                        resolve();
                    } else {
                        reject(new Error(`Python script failed (code ${code}). Error: ${stderr}`));
                    }
                });

                child.on('error', (err) => reject(new Error(`Failed to spawn python3: ${err.message}`)));
            });

            results.push(outputPath);
            event.sender.send('task-progress', { progress: (i + 1) / files.length, toolId: 'stereo2ambix' });
        }

        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        console.error("[Stereo2Ambix] Error:", e);
        return { success: false, error: e.message };
    }
}

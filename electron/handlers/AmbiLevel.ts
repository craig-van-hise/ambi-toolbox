import { IpcMainInvokeEvent } from '../shim';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { getFfmpegPath, probeAudio, determineOutputPath } from './common';

export async function handleAmbiLevel(event: IpcMainInvokeEvent, options: {
    files: string[];
    mode: 'manual' | 'normalize';
    targetDb: number;
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, mode, targetDb, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        const results: string[] = [];
        const ffmpegPath = getFfmpegPath();

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];

            // Progress per file
            const progressBase = i / files.length;
            const progressScale = 1.0 / files.length;

            const info = await probeAudio(inputPath);
            if (info.channels === 0) throw new Error(`Could not detect channel count for ${path.basename(inputPath)}`);

            const outputPath = determineOutputPath(inputPath, settings, 'Level', '.wav');

            let applyDb = targetDb;

            // Pass 1: Analysis for Normalize mode
            if (mode === 'normalize') {
                const statusMsg = `Analyzing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
                console.log(`[AmbiLevel] ${statusMsg}`);
                event.sender.send('task-status', statusMsg);

                const args1 = [
                    '-y',
                    '-i', inputPath,
                    '-af', 'volumedetect',
                    '-f', 'null',
                    process.platform === 'win32' ? 'NUL' : '/dev/null'
                ];

                const maxVolumeStr = await new Promise<string>((resolve, reject) => {
                    const child = spawn(ffmpegPath, args1);
                    let stderr = '';

                    child.stderr.on('data', d => {
                        const chunk = d.toString();
                        stderr += chunk;

                        const timeMatch = chunk.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
                        if (timeMatch && info.duration > 0) {
                            const h = parseFloat(timeMatch[1]);
                            const m = parseFloat(timeMatch[2]);
                            const s = parseFloat(timeMatch[3]);
                            const currentSeconds = h * 3600 + m * 60 + s;
                            const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);

                            // Analysis takes first 50% of the file's overall progress chunk
                            const totalProgress = progressBase + (fileProgress * progressScale * 0.5);
                            event.sender.send('task-progress', totalProgress);
                        }
                    });

                    child.on('close', code => {
                        if (code !== 0) return reject(new Error(`Analysis failed with code ${code}`));

                        // Parse max_volume from stderr
                        const match = stderr.match(/max_volume:\s+(-?\d+\.?\d*)\s+dB/);
                        if (match && match[1]) {
                            resolve(match[1]);
                        } else {
                            reject(new Error("Could not detect max_volume in analysis"));
                        }
                    });

                    child.on('error', err => reject(err));
                });

                const maxVolume = parseFloat(maxVolumeStr);
                applyDb = targetDb - maxVolume;
                console.log(`[AmbiLevel] Detected max_volume: ${maxVolume} dB. Calculated adjustment: ${applyDb} dB (Target: ${targetDb} dBTP).`);
            }

            // Pass 2: Application
            const pass2Label = mode === 'normalize' ? 'Applying Normalization' : 'Applying Gain';
            const statusMsg = `${pass2Label} ${i + 1}/${files.length}: ${path.basename(inputPath)} (${applyDb > 0 ? '+' : ''}${applyDb.toFixed(2)}dB)`;
            console.log(`[AmbiLevel] ${statusMsg}`);
            event.sender.send('task-status', statusMsg);

            const args2 = [
                '-y',
                '-i', inputPath,
                '-af', `volume=${applyDb}dB`,
                '-c:a', 'pcm_s24le',
                outputPath
            ];

            await new Promise<void>((resolve, reject) => {
                const child = spawn(ffmpegPath, args2);

                child.stderr.on('data', d => {
                    const chunk = d.toString();
                    const timeMatch = chunk.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
                    if (timeMatch && info.duration > 0) {
                        const h = parseFloat(timeMatch[1]);
                        const m = parseFloat(timeMatch[2]);
                        const s = parseFloat(timeMatch[3]);
                        const currentSeconds = h * 3600 + m * 60 + s;
                        const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);

                        // If normalize, pass 2 is the 2nd half of progress. If manual, it's the whole progress.
                        const progressOffset = mode === 'normalize' ? 0.5 : 0;
                        const progressMultiplier = mode === 'normalize' ? 0.5 : 1.0;

                        const totalProgress = progressBase + ((progressOffset + (fileProgress * progressMultiplier)) * progressScale);
                        event.sender.send('task-progress', totalProgress);
                    }
                });

                child.on('close', code => {
                    if (code === 0) resolve();
                    else reject(new Error(`Gain application failed with code ${code}`));
                });

                child.on('error', err => reject(err));
            });

            results.push(outputPath);
        }

        event.sender.send('task-progress', 1.0);
        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        console.error("[AmbiLevel] Error:", e);
        return { success: false, error: e.message };
    }
}

import { IpcMainInvokeEvent } from 'electron';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { getFfmpegPath, probeAudio, determineOutputPath } from './common';

export async function handleAmbiSwap(event: IpcMainInvokeEvent, options: {
    files: string[];
    direction: string; // "AmbiX -> FuMa" or "FuMa -> AmbiX"
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, direction, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        const results = [];
        const ffmpegPath = getFfmpegPath();

        // Constants (Gain, Indices) - same for all files if logic holds
        const gainToFuMa = "0.70710678";
        const gainToAmbiX = "1.41421356";
        const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
        const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
        const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
        const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];
            const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
            console.log(`[AmbiSwap] ${statusMsg}`);
            event.sender.send('task-status', { msg: statusMsg, toolId: 'ambiswap' });

            // 1. Probe File
            const stats = await probeAudio(inputPath);
            const channels = stats.channels;
            const progressBase = i / files.length;
            const progressScale = 1.0 / files.length;

            // 2. Validate FuMa Limits
            if (direction === "AmbixToFuMa" && channels > 16) {
                throw new Error(`FuMa format supports max 16 channels. File has ${channels}.`);
            }

            let filter = "";

            if (channels === 4) {
                if (direction === "AmbixToFuMa") {
                    filter = `pan=4c|c0=${gainToFuMa}*c0|c1=c3|c2=c1|c3=c2`;
                } else {
                    filter = `pan=4c|c0=${gainToAmbiX}*c0|c1=c2|c2=c3|c3=c1`;
                }
            } else if (channels === 9 || channels === 16) {
                let parts = [`c0=${gain}*c${mapIndices[0]}`]; // W channel gain
                for (let j = 1; j < channels; j++) {
                    parts.push(`c${j}=c${mapIndices[j]}`);
                }
                filter = `pan=${channels}c|${parts.join('|')}`;
            } else {
                throw new Error(`Unsupported channel count: ${channels}`);
            }

            const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
            const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
            const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);

            const args = [
                '-y',
                '-i', inputPath,
                '-c:a', 'pcm_s24le',
                '-filter_complex', filter,
                outputPath
            ];

            await new Promise<void>((resolve, reject) => {
                const child = spawn(ffmpegPath, args);

                child.stderr.on('data', (d) => {
                    const line = d.toString();
                    const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
                    if (timeMatch && stats.duration > 0) {
                        const h = parseFloat(timeMatch[1]);
                        const m = parseFloat(timeMatch[2]);
                        const s = parseFloat(timeMatch[3]);
                        const currentSeconds = h * 3600 + m * 60 + s;
                        const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
                        const totalProgress = progressBase + (fileProgress * progressScale);
                        event.sender.send('task-progress', { progress: totalProgress, toolId: 'ambiswap' });
                    }
                });

                child.on('close', (code) => {
                    if (code === 0) resolve();
                    else reject(new Error(`FFmpeg exited with code ${code}`));
                });
                child.on('error', (err) => reject(new Error(err.message)));
            });

            results.push(outputPath);
            event.sender.send('task-progress', { progress: (i + 1) / files.length, toolId: 'ambiswap' });
        }

        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

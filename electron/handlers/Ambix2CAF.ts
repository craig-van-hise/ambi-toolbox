import { IpcMainInvokeEvent } from '../shim';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { getFfmpegPath, probeAudio, determineOutputPath } from './common';

export async function handleAmbix2CAF(event: IpcMainInvokeEvent, options: {
    files: string[];
    layout?: string; // "Discrete" or "Ambisonics" (default)
    bitDepth?: string; // "24", "16", "32"
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, layout, bitDepth, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        const results = [];
        const ffmpegPath = getFfmpegPath();

        // 2. Codec Selection
        let codec = 'pcm_s24le';
        if (bitDepth === '32') codec = 'pcm_f32le';
        if (bitDepth === '16') codec = 'pcm_s16le';

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];
            const outputPath = determineOutputPath(inputPath, settings, 'CAF', '.caf');

            // 1. Probe (Added for Progress)
            const info = await probeAudio(inputPath);
            const progressBase = i / files.length;
            const progressScale = 1.0 / files.length;

            const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
            console.log(`[Ambix2CAF] ${statusMsg}`);
            event.sender.send('task-status', { msg: statusMsg, toolId: 'ambix2caf' });

            const args = [
                '-y',
                '-i', inputPath,
                '-c:a', codec,
                '-f', 'caf',
                outputPath
            ];

            // 4. Handle Layout (Silent logic)
            if (layout === 'hoa') {
                // Warning only logged once per batch or just here is fine
            }

            console.log(`[Ambix2CAF] Spawning: ${ffmpegPath} ${args.join(' ')}`);

            await new Promise<void>((resolve, reject) => {
                const child = spawn(ffmpegPath, args);

                child.stderr.on('data', (d) => {
                    const line = d.toString();
                    const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
                    if (timeMatch && info.duration > 0) {
                        const h = parseFloat(timeMatch[1]);
                        const m = parseFloat(timeMatch[2]);
                        const s = parseFloat(timeMatch[3]);
                        const currentSeconds = h * 3600 + m * 60 + s;
                        const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
                        const totalProgress = progressBase + (fileProgress * progressScale);
                        event.sender.send('task-progress', { progress: totalProgress, toolId: 'ambix2caf' });
                    }
                });

                child.on('close', (code) => {
                    if (code === 0) resolve();
                    else reject(new Error(`FFmpeg exited with code ${code}`));
                });

                child.on('error', (err) => reject(new Error(err.message)));
            });

            results.push(outputPath);
            event.sender.send('task-progress', { progress: (i + 1) / files.length, toolId: 'ambix2caf' });
        }

        return { success: true, data: { outputPaths: results } };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

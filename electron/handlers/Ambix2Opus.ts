import { IpcMainInvokeEvent } from '../shim';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { getFfmpegPath, probeAudio, determineOutputPath } from './common';

export async function handleAmbix2Opus(event: IpcMainInvokeEvent, options: {
    files: string[];
    bitrate: string; // "High (96kbps)"
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, bitrate, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        // 1. Parse Bitrate option (per channel)
        const match = bitrate.match(/(\d+)kbps/);
        const kbpsPerCh = match ? parseInt(match[1]) : 64; // default medium

        const results = [];
        const ffmpegPath = getFfmpegPath();

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];

            // Progress per file
            const progressBase = i / files.length;
            const progressScale = 1.0 / files.length;

            // 2. Probe File
            const info = await probeAudio(inputPath);
            if (info.channels === 0) throw new Error(`Could not detect channel count for ${path.basename(inputPath)}`);

            // 3. Logic (from Swift)
            const totalBitrate = info.channels * kbpsPerCh;

            // Check for Ambisonics: sqrt(channels) is integer && ch >= 4
            const sqrtCh = Math.sqrt(info.channels);
            const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;

            // Mapping Family 2 (Ambisonics) vs 255 (Discrete)
            const mappingFamily = isAmbisonics ? '2' : '255';

            // Output Path
            const outputPath = determineOutputPath(inputPath, settings, 'Opus', '.opus');

            // 4. Run FFmpeg
            const args = [
                '-y',
                '-i', inputPath,
                '-c:a', 'libopus',
                '-b:a', `${totalBitrate}k`,
                '-mapping_family', mappingFamily,
                outputPath
            ];

            const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
            console.log(`[Ambix2Opus] ${statusMsg}`);
            event.sender.send('task-status', statusMsg);

            await new Promise<void>((resolve, reject) => {
                const child = spawn(ffmpegPath, args);

                child.stderr.on('data', (d) => {
                    // Parse progress (time=...)
                    const line = d.toString();
                    if (line.includes("time=")) {
                        console.log(`[Ambix2Opus] FFmpeg Line: ${line.trim()}`);
                    }
                    const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
                    if (timeMatch && info.duration > 0) {
                        const h = parseFloat(timeMatch[1]);
                        const m = parseFloat(timeMatch[2]);
                        const s = parseFloat(timeMatch[3]);
                        const currentSeconds = h * 3600 + m * 60 + s;
                        const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);

                        // Calculate total batch progress
                        const totalProgress = progressBase + (fileProgress * progressScale);
                        event.sender.send('task-progress', totalProgress);
                    }
                });

                child.on('close', (code) => {
                    if (code === 0) resolve();
                    else reject(new Error(`FFmpeg exited with code ${code}`));
                });

                child.on('error', (err) => reject(err));
            });

            results.push(outputPath);
        }

        event.sender.send('task-progress', 1.0);
        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        console.error("[Ambix2Opus] Error:", e);
        return { success: false, error: e.message };
    }
}

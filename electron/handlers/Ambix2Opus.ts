import { IpcMainInvokeEvent } from 'electron';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { getFfmpegPath, probeAudio } from './common';

export async function handleAmbix2Opus(event: IpcMainInvokeEvent, options: {
    inputPath: string;
    bitrate: string; // "High (96kbps)"
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { inputPath, bitrate } = options;

    try {
        // 1. Parse Bitrate option (per channel)
        // Extract number from "High (96kbps)" -> 96
        const match = bitrate.match(/(\d+)kbps/);
        const kbpsPerCh = match ? parseInt(match[1]) : 64; // default medium

        // 2. Probe File
        const info = await probeAudio(inputPath);
        if (info.channels === 0) throw new Error("Could not detect channel count.");

        // 3. Logic (from Swift)
        const totalBitrate = info.channels * kbpsPerCh;

        // Check for Ambisonics: sqrt(channels) is integer && ch >= 4
        const sqrtCh = Math.sqrt(info.channels);
        const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;

        // Mapping Family 2 (Ambisonics) vs 255 (Discrete)
        const mappingFamily = isAmbisonics ? '2' : '255';

        // Output Path: replace ext with .opus
        const outputPath = inputPath.replace(/\.[^/.]+$/, "") + ".opus";

        // 4. Run FFmpeg
        const ffmpegPath = getFfmpegPath();
        const args = [
            '-y',
            '-i', inputPath,
            '-c:a', 'libopus',
            '-b:a', `${totalBitrate}k`,
            '-mapping_family', mappingFamily,
            outputPath
        ];

        console.log(`[Ambix2Opus] Spawning: ${ffmpegPath} ${args.join(' ')}`);

        return new Promise((resolve) => {
            const child = spawn(ffmpegPath, args);
            let stderr = '';

            child.stderr.on('data', (d) => {
                const line = d.toString();
                stderr += line;

                // Parse progress (time=...)
                const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
                if (timeMatch && info.duration > 0) {
                    const h = parseFloat(timeMatch[1]);
                    const m = parseFloat(timeMatch[2]);
                    const s = parseFloat(timeMatch[3]);
                    const currentSeconds = h * 3600 + m * 60 + s;
                    const progress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);

                    // Send progress to renderer
                    event.sender.send('task-progress', progress);
                }
            });

            child.on('close', (code) => {
                if (code === 0) {
                    event.sender.send('task-progress', 1.0);
                    resolve({ success: true, data: { outputPath } });
                } else {
                    resolve({ success: false, error: `FFmpeg exited with code ${code}. Log: ${stderr.substring(stderr.length - 500)}` });
                }
            });

            child.on('error', (err) => {
                resolve({ success: false, error: err.message });
            });
        });

    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

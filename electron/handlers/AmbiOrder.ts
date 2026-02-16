import { IpcMainInvokeEvent } from '../shim';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { getFfmpegPath, probeAudio, determineOutputPath } from './common';

export async function handleAmbiOrder(event: IpcMainInvokeEvent, options: {
    files: string[];
    targetOrder: string; // "1st Order", "2nd Order", "3rd Order"
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, targetOrder, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        const results = [];
        const ffmpegPath = getFfmpegPath();

        // Map target order to channel count
        // 1st -> 4ch, 2nd -> 9ch, 3rd -> 16ch
        const orderMap: Record<string, number> = {
            "1st Order": 4,
            "2nd Order": 9,
            "3rd Order": 16,
            "0th Order": 1,
            "Zero Order": 1,
            "4th Order": 25,
            "5th Order": 36,
            "6th Order": 49,
            "7th Order": 64,
        };
        const targetChannels = orderMap[targetOrder];
        if (!targetChannels) throw new Error(`Invalid target order: ${targetOrder} `);

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];

            // Output suffix
            const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
            const outputPath = determineOutputPath(inputPath, settings, 'Order_Converter', suffix);

            // Use channelmap filter to truncate channels without downmixing
            // Syntax: channelmap=map=0|1|2|3...
            const indices = Array.from({ length: targetChannels }, (_, k) => k).join('|');
            const filterStr = `channelmap=map=${indices}`;

            const args = [
                '-y',
                '-i', inputPath,
                '-filter_complex', filterStr,
                outputPath
            ];

            const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
            // Probe for duration
            let info;
            try {
                info = await probeAudio(inputPath);
            } catch (e) {
                console.warn(`Could not probe ${inputPath}, progress may be inaccurate.`);
                info = { duration: 0 };
            }

            const progressBase = i / files.length;
            const progressScale = 1.0 / files.length;

            console.log(`[AmbiOrder] ${statusMsg}`);
            event.sender.send('task-status', { msg: statusMsg, toolId: 'ambiorder' });

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
                        event.sender.send('task-progress', { progress: totalProgress, toolId: 'ambiorder' });
                    }
                });

                child.on('close', (code) => {
                    if (code === 0) resolve();
                    else reject(new Error(`FFmpeg exited with code ${code}`));
                });

                child.on('error', (err) => reject(new Error(err.message)));
            });

            results.push(outputPath);
            event.sender.send('task-progress', { progress: (i + 1) / files.length, toolId: 'ambiorder' });
        }

        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

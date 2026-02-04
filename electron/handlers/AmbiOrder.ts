import { IpcMainInvokeEvent } from 'electron';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { getFfmpegPath } from './common';

export async function handleAmbiOrder(event: IpcMainInvokeEvent, options: {
    files: string[];
    targetOrder: string; // "1st", "2nd", "3rd"
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, targetOrder } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        const results = [];
        const ffmpegPath = getFfmpegPath();

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];

            // Clean suffix: "2nd Order" -> "2nd_Order"
            const cleanOrder = targetOrder.replace(/\s+/g, "_").replace(/_Order$/, "");
            const outputPath = inputPath.replace(/\.[^/.]+$/, "") + `_${cleanOrder}_Order.wav`;

            let targetChannels = 4;
            if (targetOrder.includes('1st')) targetChannels = 4;
            else if (targetOrder.includes('2nd')) targetChannels = 9;
            else if (targetOrder.includes('3rd')) targetChannels = 16;
            else if (targetOrder.includes('0th') || targetOrder.includes('Zero')) targetChannels = 1;
            else if (targetOrder.includes('4th')) targetChannels = 25;
            else if (targetOrder.includes('5th')) targetChannels = 36;
            else if (targetOrder.includes('6th')) targetChannels = 49;
            else if (targetOrder.includes('7th')) targetChannels = 64;

            // Use channelmap filter to truncate channels without downmixing
            let mapStr = '';
            const limit = targetChannels;
            for (let j = 0; j < limit; j++) {
                mapStr += `${j}`;
                if (j < limit - 1) mapStr += '|';
            }

            const args = [
                '-y',
                '-i', inputPath,
                '-filter_complex', `channelmap=${mapStr}`,
                outputPath
            ];

            console.log(`[AmbiOrder] Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`);

            await new Promise<void>((resolve, reject) => {
                const child = spawn(ffmpegPath, args);
                let stderr = '';
                child.stderr.on('data', d => stderr += d.toString());

                child.on('close', (code) => {
                    if (code === 0) resolve();
                    else reject(new Error(`FFmpeg exited with code ${code}. Log: ${stderr}`));
                });

                child.on('error', (err) => reject(new Error(err.message)));
            });

            results.push(outputPath);
            event.sender.send('task-progress', (i + 1) / files.length);
        }

        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

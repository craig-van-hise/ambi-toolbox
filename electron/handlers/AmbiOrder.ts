import { IpcMainInvokeEvent } from 'electron';
import { spawn } from 'node:child_process';
import { getFfmpegPath } from './common';

export async function handleAmbiOrder(event: IpcMainInvokeEvent, options: {
    inputPath: string;
    targetOrder: string; // "1st", "2nd", "3rd"
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { inputPath, targetOrder } = options;

    try {
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
        // Syntax: channelmap=0|1|2|3...
        // This is index-based and agnostic of channel naming/layout.
        let mapStr = '';
        const limit = targetChannels;
        for (let i = 0; i < limit; i++) {
            mapStr += `${i}`;
            if (i < limit - 1) mapStr += '|';
        }

        const ffmpegPath = getFfmpegPath();
        const args = [
            '-y',
            '-i', inputPath,
            '-filter_complex', `channelmap=${mapStr}`,
            outputPath
        ];

        console.log(`[AmbiOrder] Spawning: ${ffmpegPath} ${args.join(' ')}`);

        return new Promise((resolve) => {
            const child = spawn(ffmpegPath, args);
            let stderr = '';

            child.stderr.on('data', d => stderr += d.toString());

            child.on('close', (code) => {
                if (code === 0) {
                    event.sender.send('task-progress', 1.0);
                    resolve({ success: true, data: { outputPath } });
                } else {
                    resolve({ success: false, error: `FFmpeg exited with code ${code}. Log: ${stderr}` });
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

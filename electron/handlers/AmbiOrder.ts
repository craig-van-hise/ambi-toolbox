import { IpcMainInvokeEvent } from '../shim';
import { probeAudio, determineOutputPath } from './common';
import { FfWrapper } from '../utils/FfWrapper';

export async function handleAmbiOrder(event: IpcMainInvokeEvent, options: {
    files: string[];
    targetOrder: string; // "1st Order", "2nd Order", "3rd Order"
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, targetOrder, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        const results = [];

        // Map target order to channel count
        // 1st -> 4ch, 2nd -> 9ch, 3rd -> 16ch
        const orderMap: Record<string, number> = {
            "1st Order": 4,
            "2nd Order": 9,
            "3rd Order": 16,
            "3rd Order (16 Channels)": 16,
            "0th Order": 1,
            "0th Order (Omni)": 1,
            "Zero Order": 1,
            "4th Order": 25,
            "4th Order (25 Channels)": 25,
            "5th Order": 36,
            "5th Order (36 Channels)": 36,
            "6th Order": 49,
            "6th Order (49 Channels)": 49,
            "7th Order": 64,
            "7th Order (64 Channels)": 64,
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

            const statusMsg = `Processing ${i + 1}/${files.length}: ${inputPath.split(/[\\/]/).pop()}`;
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

            await FfWrapper.run({
                args,
                duration: info.duration,
                event,
                toolId: 'ambiorder',
                progressBase,
                progressScale
            });

            results.push(outputPath);
            event.sender.send('task-progress', { progress: (i + 1) / files.length, toolId: 'ambiorder' });
        }

        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

import { IpcMainInvokeEvent } from 'electron';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { getFfmpegPath, probeAudio } from './common';

export async function handleAmbiSwap(event: IpcMainInvokeEvent, options: {
    files: string[];
    direction: "AmbixToFuMa" | "FuMaToAmbix";
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, direction } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        const results = [];
        const ffmpegPath = getFfmpegPath();

        // Constants (Gain, Indices) - same for all files if logic holds
        const gainToFuMa = "0.70710678";
        const gainToAmbiX = "1.41421356";
        const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
        const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
        const mapIndices = direction === "AmbixToFuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
        const gain = direction === "AmbixToFuMa" ? gainToFuMa : gainToAmbiX;

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];
            console.log(`[AmbiSwap] Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`);

            // 1. Probe File
            const stats = await probeAudio(inputPath);
            const channels = stats.channels;

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

            const suffix = direction === "AmbixToFuMa" ? "_FuMa" : "_AmbiX";
            const outputPath = inputPath.replace(/\.[^/.]+$/, "") + `${suffix}.wav`;

            const args = [
                '-y',
                '-i', inputPath,
                '-c:a', 'pcm_s24le',
                '-filter_complex', filter,
                outputPath
            ];

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

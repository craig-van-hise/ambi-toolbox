import { IpcMainInvokeEvent } from 'electron';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { getFfmpegPath } from './common';

export async function handleAmbix2CAF(event: IpcMainInvokeEvent, options: {
    files: string[];
    layout: 'discrete' | 'hoa';
    bitDepth: '16' | '24' | '32';
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, layout, bitDepth } = options;

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
            const outputPath = inputPath.replace(/\.[^/.]+$/, "") + ".caf";

            console.log(`[Ambix2CAF] Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`);

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

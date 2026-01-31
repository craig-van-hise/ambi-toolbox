import { IpcMainInvokeEvent } from 'electron';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { getFfmpegPath } from './common';

export async function handleAmbix2CAF(event: IpcMainInvokeEvent, options: {
    inputPath: string;
    layout: 'discrete' | 'hoa';
    bitDepth: '16' | '24' | '32';
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { inputPath, layout, bitDepth } = options;

    try {
        // 1. Determine Output Path
        const outputPath = inputPath.replace(/\.[^/.]+$/, "") + ".caf";

        // 2. Codec Selection
        let codec = 'pcm_s24le';
        if (bitDepth === '32') codec = 'pcm_f32le';
        if (bitDepth === '16') codec = 'pcm_s16le';

        // 3. Construct FFmpeg Args
        const ffmpegPath = getFfmpegPath();
        const args = [
            '-y',
            '-i', inputPath,
            '-c:a', codec,
            '-f', 'caf' // explicitly set format to Core Audio Format
        ];

        // 4. Handle Layout
        // discrete/hoa: FFmpeg tries to guess layout from channel count.
        // For > 8 channels, it often sets "unknown" or specific ambisonic tags if detected.
        // To force 1:1 mapping and avoid "stereo downmix" or errors:
        // We generally don't need to force -map unless input is complex.
        // But preventing unwanted channel reordering is key.
        // For CAF, standard behaviour is usually fine for multichannel. 

        // If "Discrete" is requested, we might want to ensure no channel layout tag is forced that messes things up.
        // `-channel_layout unknown` can sometimes help preserve "uncorrelated" channels.
        if (layout === 'discrete') {
            // Forcing unknown might be safer to prevent FFmpeg trying to resolve "5.1" or "7.1" if channel count matches.
            // args.push('-channel_layout', 'unknown'); 
            // Note: FFmpeg support for -channel_layout unknown varies.
            // A safer bet for generic multichannel copy is usually implicit.
        }

        if (layout === 'hoa') {
            console.warn('[Ambix2CAF] HOA metadata tagging requested but FFmpeg support is limited. Proceeding with discrete mapping.');
        }

        // Output file
        args.push(outputPath);

        console.log(`[Ambix2CAF] Spawning: ${ffmpegPath} ${args.join(' ')}`);

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

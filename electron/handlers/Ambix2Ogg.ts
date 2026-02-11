import { IpcMainInvokeEvent } from 'electron';
import path from 'node:path';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { getFfmpegPath, probeAudio, determineOutputPath } from './common';

export async function handleAmbix2Ogg(event: IpcMainInvokeEvent, options: {
    files: string[];
    bitrate: string; // "High (96kbps)" - ignored if input is .opus
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, bitrate, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        // 1. Parse Bitrate option (per channel) - only used for transcoding
        const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
        const kbpsPerCh = match ? parseInt(match[1]) : 64; // default medium

        const results = [];
        const ffmpegPath = getFfmpegPath();

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];
            const ext = path.extname(inputPath).toLowerCase();
            const isOpusInput = ext === '.opus' || ext === '.ogg';

            // Progress per file
            const progressBase = i / files.length;
            const progressScale = 1.0 / files.length;

            // 2. Probe File
            const info = await probeAudio(inputPath);
            if (info.channels === 0) throw new Error(`Could not detect channel count for ${path.basename(inputPath)}`);

            // 3. Logic
            const totalBitrate = info.channels * kbpsPerCh;

            // Check for Ambisonics: sqrt(channels) is integer && ch >= 4
            const sqrtCh = Math.sqrt(info.channels);
            const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;

            // Mapping Family 2 (Ambisonics) vs 255 (Discrete)
            const mappingFamily = isAmbisonics ? '2' : '255';

            // Output Path
            const outputPath = determineOutputPath(inputPath, settings, 'Ogg', '.ogg');

            // NEW: Verify Output Directory Access
            const outputDir = path.dirname(outputPath);
            try {
                // Try to write a temp file to verify permissions
                const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
                fs.writeFileSync(testFile, '');
                fs.unlinkSync(testFile);
            } catch (err: any) {
                console.error(`[Ambix2Ogg] Output directory not writable: ${outputDir}`, err);
                throw new Error(`Output directory is read-only or invalid: ${outputDir}`);
            }

            // 4. Construct FFmpeg Args
            let args: string[] = [];

            if (isOpusInput) {
                // WORKFLOW B: Remux (Stream Copy)
                args = [
                    '-y',
                    '-i', inputPath,
                    '-c:a', 'copy', // Stream copy
                    outputPath
                ];
                console.log(`[Ambix2Ogg] Remuxing ${path.basename(inputPath)} to Ogg container...`);
            } else {
                // WORKFLOW A: Transcode to Opus
                args = [
                    '-y',
                    '-i', inputPath,
                    '-c:a', 'libopus',
                    '-b:a', `${totalBitrate}k`,
                    '-mapping_family', mappingFamily,
                    outputPath
                ];
                console.log(`[Ambix2Ogg] Transcoding ${path.basename(inputPath)} to Opus/Ogg...`);
            }

            const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? 'Remux' : 'Encode'})`;
            console.log(`[Ambix2Ogg] ${statusMsg}`);
            event.sender.send('task-status', statusMsg);

            await new Promise<void>((resolve, reject) => {
                const child = spawn(ffmpegPath, args);

                child.stderr.on('data', (d) => {
                    const line = d.toString();
                    // Log non-progress lines for debugging
                    if (!line.includes("time=") && !line.includes("frame=")) {
                        console.log(`[Ambix2Ogg] FFmpeg Stderr: ${line.trim()}`);
                    }

                    if (line.includes("time=")) {
                        const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
                        if (timeMatch && info.duration > 0) {
                            const h = parseFloat(timeMatch[1]);
                            const m = parseFloat(timeMatch[2]);
                            const s = parseFloat(timeMatch[3]);
                            const currentSeconds = h * 3600 + m * 60 + s;
                            const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);

                            // Calculate total batch progress
                            const totalProgress = progressBase + (fileProgress * progressScale);
                            // Clip to 99% until done
                            event.sender.send('task-progress', Math.min(totalProgress, 0.99));
                        }
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
        console.error("[Ambix2Ogg] Error:", e);
        return { success: false, error: e.message };
    }
}

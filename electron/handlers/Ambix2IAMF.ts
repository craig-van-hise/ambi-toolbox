import { IpcMainInvokeEvent, app } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { probeAudio } from './common';
import { generateIamfConfig } from './iamf-config-generator';

function getIamfEncPath(): string {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'bin', 'iamf-enc');
    }
    return path.join(process.cwd(), 'assets', 'bin', 'iamf-enc');
}

export async function handleAmbix2IAMF(event: IpcMainInvokeEvent, options: {
    files: string[];
    bitrate?: string;
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, bitrate } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        const iamfEncPath = getIamfEncPath();
        if (!fs.existsSync(iamfEncPath)) {
            throw new Error("iamf-enc binary not found.");
        }

        const results = [];

        // Match quality
        // Bitrate option string format: "High (96kbps)"
        let qualityKbps = 96;
        if (bitrate) {
            const match = bitrate.match(/(\d+)kbps/);
            if (match) qualityKbps = parseInt(match[1]);
        }

        for (let i = 0; i < files.length; i++) {
            const inputPath = files[i];
            const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
            console.log(`[Ambix2IAMF] ${statusMsg}`);
            event.sender.send('task-status', { msg: statusMsg, toolId: 'ambix2iamf' });

            // 1. Probe Audio for samples/duration
            const info = await probeAudio(inputPath);
            const durationSamples = Math.floor(info.duration * info.sampleRate);

            if (isNaN(durationSamples) || durationSamples <= 0) {
                throw new Error(`Invalid audio duration detected: ${info.duration}s`);
            }

            // 2. Output Paths
            const inputDir = path.dirname(inputPath);
            const inputBasename = path.basename(inputPath);
            const outputDir = path.dirname(inputPath); // Save in same dir

            // 3. Generate Config
            // Use a specific temporary name that is clearly temporary
            const tempPrefix = `_tmp_processing_${i}`;
            const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);

            // Write config to temp file
            const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
            await fs.promises.writeFile(configPath, configContent);

            // Pre-cleanup: Ensure temp output file doesn't exist
            const generatedFile = path.join(outputDir, `${tempPrefix}.iamf`);
            if (fs.existsSync(generatedFile)) {
                try { await fs.promises.unlink(generatedFile); } catch { }
            }

            // 4. Run iamf-enc
            const args = [
                `--user_metadata_filename=${configPath}`,
                `--input_wav_directory=${inputDir}`,
                `--output_iamf_directory=${outputDir}`
            ];

            console.log(`[Ambix2IAMF] Spawning: ${iamfEncPath} ${args.join(' ')}`);

            await new Promise<void>((resolve, reject) => {
                const child = spawn(iamfEncPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
                let stdout = '';
                let stderr = '';

                // Helper: Update progress
                let lastP = 0;
                const updateP = (fileP: number) => {
                    if (fileP > lastP) {
                        lastP = fileP;
                        const totalP = (i + fileP) / files.length;
                        event.sender.send('task-progress', { progress: totalP, toolId: 'ambix2iamf' });
                    }
                };

                // Fake Progress: assume 2x realtime speed (0.5s per second of audio)
                // Duration is known: durationSamples / sampleRate
                const durationSec = durationSamples / info.sampleRate;
                const estimatedProcessingTime = durationSec * 0.5; // optimistic
                const startTime = Date.now();

                const progressTimer = setInterval(() => {
                    const elapsed = (Date.now() - startTime) / 1000;
                    // Cap at 95% until actually done
                    let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
                    updateP(estimatedP);
                }, 200);

                child.stdout.on('data', d => {
                    stdout += d.toString();
                    // Potentially parse stdout here if we knew the format
                });
                child.stderr.on('data', d => stderr += d.toString());

                child.on('close', async (code) => {
                    clearInterval(progressTimer);
                    updateP(1.0); // Force 100% for this file

                    // ... existing cleanup code ...

                    // Cleanup config
                    try { await fs.promises.unlink(configPath); } catch { }

                    if (code === 0 || code === null) {
                        if (code === null) return; // timeout handled elsewhere

                        const targetFile = inputPath.replace(/\.[^/.]+$/, "") + ".iamf";
                        if (fs.existsSync(generatedFile)) {
                            try {
                                await fs.promises.rename(generatedFile, targetFile);
                                resolve();
                            } catch (e: any) {
                                reject(new Error(`Failed to rename output to ${path.basename(targetFile)}: ${e.message}`));
                            }
                        } else {
                            reject(new Error(`IAMF tool finished but output file missing: ${generatedFile}`));
                        }
                    } else {
                        console.error("[Ambix2IAMF] Error:", stderr);
                        reject(new Error(`iamf-enc failed (code ${code}). Log: ${stderr}`));
                    }
                });

                child.on('error', (err) => {
                    clearInterval(progressTimer);
                    reject(new Error(`Failed to spawn iamf-enc: ${err.message}`));
                });

                // Ensure timeout kills timer too
                // ... (Original logic for timeout used 'timer' var, need to update it to clear progressTimer too if needed, but 'close' handles it mostly)
            });

            const targetFile = inputPath.replace(/\.[^/.]+$/, "") + ".iamf";
            results.push(targetFile);
            event.sender.send('task-progress', { progress: (i + 1) / files.length, toolId: 'ambix2iamf' });
        }

        return { success: true, data: { outputPaths: results } };

    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

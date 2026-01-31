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
    inputPath: string;
    bitrate?: string;
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { inputPath, bitrate } = options;

    try {
        const iamfEncPath = getIamfEncPath();
        if (!fs.existsSync(iamfEncPath)) {
            throw new Error("iamf-enc binary not found.");
        }

        // 1. Probe Audio for samples/duration
        // Use probeAudio from common which uses ffmpeg (must be efficient)
        // We need sample count. probeAudio returns duration in seconds.
        // We should update probeAudio or calculate manually: samples = duration * rate
        const info = await probeAudio(inputPath);
        const durationSamples = Math.floor(info.duration * info.sampleRate);

        // Match quality
        // Bitrate option string format: "High (96kbps)"
        let qualityKbps = 96;
        if (bitrate) {
            const match = bitrate.match(/(\d+)kbps/);
            if (match) qualityKbps = parseInt(match[1]);
        }

        // 2. Output Paths
        const inputDir = path.dirname(inputPath);
        const inputBasename = path.basename(inputPath);
        const outputDir = path.dirname(inputPath); // Save in same dir

        // 3. Generate Config
        const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps);

        // Write config to temp file
        const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}.textproto`);
        await fs.promises.writeFile(configPath, configContent);

        // 4. Run iamf-enc
        const args = [
            `--user_metadata_filename=${configPath}`,
            `--input_wav_directory=${inputDir}`,
            `--output_iamf_directory=${outputDir}`
        ];

        console.log(`[Ambix2IAMF] Spawning: ${iamfEncPath} ${args.join(' ')}`);

        return new Promise((resolve) => {
            const child = spawn(iamfEncPath, args);
            let stdout = '';
            let stderr = '';

            child.stdout.on('data', d => stdout += d.toString());
            child.stderr.on('data', d => stderr += d.toString());

            child.on('close', async (code) => {
                // Cleanup config
                try { await fs.promises.unlink(configPath); } catch { }

                if (code === 0) {
                    // Success.
                    // The IAMF tool creates a file based on 'file_name_prefix' in config.
                    // Config says "output", so it creates "output.iamf" in outputDir.
                    // We should rename it to match input filename.
                    const generatedFile = path.join(outputDir, 'output.iamf');
                    const targetFile = inputPath.replace(/\.[^/.]+$/, "") + ".iamf";

                    if (fs.existsSync(generatedFile)) {
                        await fs.promises.rename(generatedFile, targetFile);
                        event.sender.send('task-progress', 1.0);
                        resolve({ success: true, data: { outputPath: targetFile } });
                    } else {
                        // Maybe success but different name? Or failed silently?
                        resolve({ success: false, error: "IAMF file was not created at expected location." });
                    }
                } else {
                    console.error("[Ambix2IAMF] Error:", stderr);
                    resolve({ success: false, error: `iamf-enc failed (code ${code}). Log: ${stderr}` });
                }
            });

            child.on('error', (err) => {
                resolve({ success: false, error: `Failed to spawn iamf-enc: ${err.message}` });
            });
        });

    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

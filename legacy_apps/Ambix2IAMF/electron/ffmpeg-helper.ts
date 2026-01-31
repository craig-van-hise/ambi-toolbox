import { spawn } from 'cross-spawn'
import { app } from 'electron'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import { generateIamfConfig } from './iamf-config-generator'

function getBinaryPath(name: string, customPath?: string): string {
    if (customPath) return customPath;

    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'bin', name);
    }

    return path.join(process.cwd(), 'resources', 'bin', name);
}

function getFfmpegPath(customPath?: string): string {
    return getBinaryPath('ffmpeg', customPath);
}

function getIamfEncPath(): string {
    return getBinaryPath('iamf-enc');
}

// Helper to get duration and sample rate
function probeAudio(filePath: string, ffmpegPath: string): Promise<{ durationSamples: number, sampleRate: number }> {
    return new Promise((resolve, reject) => {
        const args = ['-i', filePath, '-hide_banner'];
        console.log(`Probing audio: ${ffmpegPath} ${args.join(' ')}`);

        const ffmpeg = spawn(ffmpegPath, args);
        let stderr = '';
        ffmpeg.stderr.on('data', d => stderr += d);

        ffmpeg.on('error', (err) => {
            console.error('Probing failed to start:', err);
            reject(new Error(`FFmpeg failed to start: ${err.message}`));
        });

        ffmpeg.on('close', (code) => {
            // Parse stderr for Duration and Stream info
            // Duration: 00:03:24.57, ...
            // Stream #0:0... 48000 Hz ...

            const durationMatch = stderr.match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d{2})/);
            const rateMatch = stderr.match(/(\d+) Hz/);

            if (durationMatch && rateMatch) {
                const hours = parseFloat(durationMatch[1]);
                const minutes = parseFloat(durationMatch[2]);
                const seconds = parseFloat(durationMatch[3]);
                const rate = parseInt(rateMatch[1], 10);

                const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
                // Rounding? Floor?
                const durationSamples = Math.floor(totalSeconds * rate);
                console.log(`Probe success: ${durationSamples} samples, ${rate} Hz`);
                resolve({ durationSamples, sampleRate: rate });
            } else {
                console.error("Probe failed. Stderr output:\n", stderr);
                reject(new Error(`Could not probe audio file duration/rate. Code: ${code}. Output: ${stderr.substring(0, 500)}...`));
            }
        });
    });
}

export function convertFileWithFFmpeg(filePath: string, customFfmpegPath?: string, qualityKbps?: number): Promise<string> {
    const output = filePath.replace(/\.[^/.]+$/, "") + ".iamf";

    // If output is IAMF, use Iamf Tools workflow
    if (output.endsWith('.iamf')) {
        return convertToIamf(filePath, output, qualityKbps, customFfmpegPath);
    }

    return convertToGeneric(filePath, output, customFfmpegPath);
}

async function convertToIamf(inputFile: string, outputFile: string, qualityKbps: number = 96, customFfmpegPath?: string): Promise<string> {
    const ffmpegPath = getFfmpegPath(customFfmpegPath);
    const iamfEncPath = getIamfEncPath();

    // 1. Probe Input
    const { durationSamples, sampleRate } = await probeAudio(inputFile, ffmpegPath);

    // 2. Generate Config
    const inputDir = path.dirname(inputFile);
    const inputBasename = path.basename(inputFile);
    const configContent = generateIamfConfig(inputBasename, durationSamples, sampleRate, qualityKbps);

    const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}.textproto`);
    await fs.promises.writeFile(configPath, configContent);

    // 3. Run iamf-enc
    return new Promise((resolve, reject) => {
        // iamf-enc args:
        // --user_metadata_filename <config>
        // --input_wav_directory <dir>
        // --output_iamf_directory <dir>
        // The config refers to "output" filename prefix.
        // We need to match that. generateIamfConfig uses "output" prefix.
        // So output file will be <outputDir>/output.iamf
        // We want standard naming.

        const outputDir = path.dirname(outputFile);
        // We might need to rename the result later.

        const args = [
            `--user_metadata_filename=${configPath}`,
            `--input_wav_directory=${inputDir}`,
            `--output_iamf_directory=${outputDir}`
        ];

        console.log(`Spawning iamf-enc: ${iamfEncPath}`, args);
        const process = spawn(iamfEncPath, args);

        let stdout = '';
        let stderr = '';

        process.stdout.on('data', d => stdout += d);
        process.stderr.on('data', d => stderr += d);

        process.on('close', async (code) => {
            if (code === 0) {
                // Success. The file created is 'output.iamf' (based on textproto prefix).
                // Rename it to expected outputFile
                const generatedFile = path.join(outputDir, 'output.iamf');
                if (generatedFile !== outputFile) {
                    try {
                        await fs.promises.rename(generatedFile, outputFile);
                    } catch (e) {
                        console.error("Rename failed", e);
                    }
                }
                resolve(outputFile);
            } else {
                reject(new Error(`iamf-enc failed with code ${code}\nStdout: ${stdout}\nStderr: ${stderr}`));
            }
        });
    });
}

function convertToGeneric(filePath: string, output: string, customFfmpegPath?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const ffmpegPath = getFfmpegPath(customFfmpegPath);
        const args = [
            '-y',
            '-i', filePath,
            '-mapping_family', '2',
            '-c:a', 'libopus',
            '-b:a', '2560k',
            output
        ];

        console.log(`Spawning FFmpeg: ${ffmpegPath} with args:`, args);

        const ffmpeg = spawn(ffmpegPath, args);

        let stderrData = '';
        ffmpeg.stderr.on('data', (data) => {
            stderrData += data.toString();
            console.error(`FFmpeg stderr: ${data}`);
        });

        ffmpeg.on('close', (code: number | null) => {
            if (code === 0) {
                resolve(output);
            } else {
                reject(new Error(`FFmpeg process exited with code ${code}. Error: ${stderrData}`));
            }
        });

        ffmpeg.on('error', (err: Error) => {
            reject(err);
        });
    });
}

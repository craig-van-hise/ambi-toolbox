import { app } from '../shim';
import path from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';

// Get Binary Paths
export function getBinaryPath(name: string): string {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'bin', name);
    }
    return path.join(process.cwd(), 'assets', 'bin', name);
}

export function getFfmpegPath() { return getBinaryPath('ffmpeg'); }
export function getFfprobePath() { return getBinaryPath('ffprobe'); }

export interface AudioProbeResult {
    duration: number; // seconds
    channels: number;
    sampleRate: number;
}

// Helper: Determine Output Path based on Settings
export function determineOutputPath(
    inputPath: string,
    settings?: { outputDir?: string; autoCreateFolder?: boolean },
    formatName?: string,
    extension?: string
): string {
    const inputDir = path.dirname(inputPath);
    const fileName = path.basename(inputPath, path.extname(inputPath));
    const ext = extension || path.extname(inputPath); // Use provided extension or keep original

    // Determine Base Directory (Custom or Input)
    let outputDir = (settings && settings.outputDir) ? settings.outputDir : inputDir;

    // Auto-Create Subfolder (e.g. "Output/Opus/" or "Input/Opus/")
    if (settings && settings.autoCreateFolder && formatName) {
        outputDir = path.join(outputDir, formatName);
        if (!fs.existsSync(outputDir)) {
            try {
                fs.mkdirSync(outputDir, { recursive: true });
            } catch (err) {
                console.error(`[Common] Failed to create auto-folder: ${outputDir}`, err);
                // Fallback to base dir if mkdir fails
                outputDir = (settings && settings.outputDir) ? settings.outputDir : inputDir;
            }
        }
    }

    return path.join(outputDir, `${fileName}${ext}`);
}

// Robust Probe using FFPROBE JSON (Primary)
export function probeAudio(filePath: string): Promise<AudioProbeResult> {
    return new Promise((resolve, reject) => {
        const ffprobePath = getFfprobePath();

        // Validation
        if (!fs.existsSync(ffprobePath)) {
            return reject(new Error(`FFprobe binary missing at: ${ffprobePath}`));
        }
        if (!fs.existsSync(filePath)) {
            return reject(new Error(`Input file missing at: ${filePath}`));
        }

        // Use JSON output for guaranteed parsing
        const args = [
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_streams',
            '-show_format',
            '-select_streams', 'a:0', // only audio
            filePath
        ];

        console.log(`[Probe] Spawning: ${ffprobePath} ${args.join(' ')}`);
        const process = spawn(ffprobePath, args);

        let stdout = '';
        let stderr = '';

        process.stdout.on('data', d => stdout += d.toString());
        process.stderr.on('data', d => stderr += d.toString());

        process.on('close', (code) => {
            if (code !== 0) {
                console.error(`[Probe] Failed. Code: ${code}`);
                console.error(`[Probe] Stderr: ${stderr}`);
                console.error(`[Probe] Args:`, args);
                return reject(new Error(`FFprobe failed (code ${code}): ${stderr}`));
            }

            try {
                const data = JSON.parse(stdout);
                const stream = data.streams?.[0];
                const format = data.format;

                if (!stream) throw new Error("No audio stream found");

                const channels = parseInt(stream.channels);
                const sampleRate = parseInt(stream.sample_rate);
                const duration = parseFloat(format.duration || stream.duration || "0");

                if (isNaN(channels)) throw new Error("Invalid channel count");

                console.log(`[Probe] Success: ${channels}ch, ${sampleRate}Hz, ${duration}s`);
                resolve({ duration, channels, sampleRate });
            } catch (e: any) {
                reject(new Error(`Failed to parse FFprobe JSON: ${e.message}\nRaw: ${stdout.substring(0, 200)}`));
            }
        });

        process.on('error', (err) => {
            // Fallback to ffmpeg-regex probe if ffprobe is missing?
            // Since we bundle ffprobe, we should rely on it.
            reject(new Error(`Failed to spawn ffprobe: ${err.message}`));
        });
    });
}

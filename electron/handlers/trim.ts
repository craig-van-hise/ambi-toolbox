import { app } from '../shim';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto'; // Add this import
import { FfWrapper } from '../utils/FfWrapper';

// Add deterministic hash function
function getHash(filePath: string): string {
    const stats = fs.statSync(filePath);
    return crypto.createHash('md5')
        .update(`${filePath}-${stats.size}-${stats.mtimeMs}`)
        .digest('hex');
}

/**
 * Generates a stereo MP3 proxy for waveform visualization.
 * Downmixes multichannel audio to stereo.
 */
// PRP #61: Return Buffer for Frontend Diagnostic
export async function generateProxy(inputPath: string): Promise<Buffer> {
    // VALIDATION: Fixes potential Code 8 by ensuring path exists and is a string
    if (!inputPath || typeof inputPath !== 'string') {
        throw new Error(`[AmbiTrim] Invalid input path provided: ${inputPath}`);
    }

    const tempDir = app.getPath('temp');
    const proxyId = getHash(inputPath); // Replace UUID with deterministic hash
    const outputPath = path.join(tempDir, `ambitrim_proxy_${proxyId}.wav`);

    // Check Cache: Bypass FFmpeg if proxy already exists
    if (fs.existsSync(outputPath)) {
        console.log(`[AmbiTrim Proxy]: Cache hit for: ${path.basename(inputPath)}`);
        return fs.readFileSync(outputPath);
    }

    // PRP #145: Migration to PCM WAV for universal compatibility
    const args = [
        '-y',
        '-i', inputPath,
        '-filter_complex', '[0:a:0]pan=stereo|c0=0.5*c0+0.5*c1|c1=0.5*c0-0.5*c1[out]',
        '-map', '[out]',
        '-ar', '44100',          
        '-c:a', 'pcm_s16le',    
        '-map_metadata', '-1',   
        outputPath
    ];

    try {
        await FfWrapper.run({
            args,
            onLog: (line) => console.log(`[AmbiTrim Proxy]: ${line}`)
        });

        console.log(`[AmbiTrim] Proxy generated successfully.`);

        // PRP #61: Return Buffer
        const fileBuffer = fs.readFileSync(outputPath);
        return fileBuffer;
    } catch (err: any) {
        console.error(`[AmbiTrim] Proxy generation failed: ${err.message}`);
        throw err;
    }
}


/**
 * Executes a lossless trim on the original file.
 */
export async function executeTrim(
    filePath: string,
    startTime: number,
    endTime: number,
    outputDir: string
): Promise<string> {
    const fileName = path.basename(filePath, path.extname(filePath));
    const ext = path.extname(filePath);
    const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1000)}${ext}`;
    const outputPath = path.join(outputDir, outputFileName);

    // Calculate duration for -to (or use -t)
    // Using -ss before -i for fast seek, then -to (relative to file start if after -i, or absolute? wait)
    // If -ss is BEFORE -i, the timestamps are reset. So -to should be duration (endTime - startTime).
    // Let's use -ss <start> -t <duration> which is safer with input seeking.

    // Actually, the common pattern for fast seek is:
    // ffmpeg -ss <start> -i <input> -t <duration> -c copy <output>
    // However, for stream copy, keyframes matter. For audio (PCM/WAV) it doesn't matter much.
    // But for compressed formats it might be slightly inaccurate.
    // Since we are targeting Ambisonics (usually WAV/CAF), stream copy is sample-accurate enough or perfect.

    const duration = endTime - startTime;

    console.log(`[AmbiTrim] Trimming file: ${filePath}`);
    console.log(`[AmbiTrim] Start: ${startTime}, Duration: ${duration}`);
    console.log(`[AmbiTrim] Output: ${outputPath}`);

    const args = [
        '-ss', startTime.toString(),
        '-i', filePath,
        '-map', '0:a:0',
        '-t', duration.toString(),
        '-c', 'copy',
        '-y',
        outputPath
    ];

    // NOTE: If we use -to instead of -t with input seeking (-ss before -i), 
    // -to refers to the position in the *output* stream (which starts at 0).
    // So -t <duration> is equivalent to -to <duration> when using input seeking.
    // Reference: https://trac.ffmpeg.org/wiki/Seeking

    try {
        await FfWrapper.run({
            args,
            onLog: (line) => console.log(`[AmbiTrim Cut]: ${line}`)
        });

        console.log(`[AmbiTrim] Trim successful.`);
        return outputPath;
    } catch (err: any) {
        console.error(`[AmbiTrim] Trim failed: ${err.message}`);
        throw err;
    }
}

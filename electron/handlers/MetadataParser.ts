import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getFfmpegPath, getFfprobePath } from './common';

/**
 * MetadataParser
 * Handles audio/video metadata extraction using FFprobe and FFmpeg filters.
 */

export async function getBasicFileInfo(filePath: string) {
    const stat = await fs.stat(filePath);
    const extension = path.extname(filePath);
    const nameWithoutExt = path.basename(filePath, extension);

    return {
        id: filePath,
        name: nameWithoutExt,
        extension,
        path: filePath,
        size: formatFileSize(stat.size)
    };
}

export async function runFFprobe(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const ffprobePath = getFfprobePath();
        const args = [
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            filePath
        ];

        const child = spawn(ffprobePath, args);
        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data: Buffer) => { stdout += data.toString(); });
        child.stderr.on('data', (data: Buffer) => { stderr += data.toString(); });

        child.on('close', (code: number) => {
            if (code === 0) {
                try {
                    resolve(JSON.parse(stdout));
                } catch (e) {
                    reject(new Error(`Failed to parse FFprobe output: ${e}`));
                }
            } else {
                reject(new Error(`FFprobe failed: ${stderr}`));
            }
        });

        child.on('error', (err: Error) => reject(err));
    });
}

export async function analyzeLoudness(filePath: string, channelCount: number, streamIndex: number = 0): Promise<{ integrated: number; range: number; truePeak: number }> {
    return new Promise((resolve) => {
        const ffmpegPath = getFfmpegPath();
        const mapArg = `0:a:${streamIndex}`;

        let args: string[];
        if (channelCount > 2) {
            args = [
                '-i', filePath,
                '-filter_complex', `[${mapArg}]pan=stereo|c0=0.5*c0+0.5*c1|c1=0.5*c0-0.5*c1,ebur128=peak=true[out]`,
                '-map', '[out]',
                '-f', 'null', '-'
            ];
        } else {
            args = [
                '-i', filePath,
                '-map', mapArg,
                '-filter:a', 'ebur128=peak=true',
                '-f', 'null', '-'
            ];
        }

        const child = spawn(ffmpegPath, args);
        let stderr = '';

        child.stderr.on('data', (data: Buffer) => { stderr += data.toString(); });

        child.on('close', () => {
            try {
                const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
                const summaryText = summaryMatch ? summaryMatch[1] : stderr;

                const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
                const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
                const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);

                const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
                const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
                let truePeak = 0;
                if (truePeakMatch) {
                    const peakStr = truePeakMatch[1];
                    truePeak = peakStr === '-inf' ? -100 : parseFloat(peakStr);
                }

                resolve({ integrated, range, truePeak });
            } catch (e) {
                console.error('[MetadataParser] Failed to parse loudness:', e);
                resolve({ integrated: 0, range: 0, truePeak: 0 });
            }
        });

        child.on('error', (err: Error) => {
            console.error('[MetadataParser] FFmpeg spawn error:', err);
            resolve({ integrated: 0, range: 0, truePeak: 0 });
        });
    });
}

export async function analyzeSignalHealth(filePath: string, streamIndex: number = 0): Promise<{ clippingCount: number; dcOffsetWarning: boolean; emptyStreamWarning: boolean }> {
    return new Promise((resolve) => {
        const ffmpegPath = getFfmpegPath();
        const mapArg = `0:a:${streamIndex}`;

        const args = [
            '-i', filePath,
            '-map', mapArg,
            '-filter:a', 'astats=measure_overall=Peak_level:measure_perchannel=DC_offset:metadata=1',
            '-f', 'null', '-'
        ];

        const child = spawn(ffmpegPath, args);
        let stderr = '';

        child.stderr.on('data', (data: Buffer) => { stderr += data.toString(); });

        child.on('close', (code: number | null) => {
            if (code !== 0 && code !== 1) {
                console.warn(`[MetadataParser] Health analysis failed with code ${code}`);
                resolve({ clippingCount: 0, dcOffsetWarning: false, emptyStreamWarning: false });
                return;
            }

            try {
                let clippingCount = 0;
                let dcOffsetWarning = false;
                const emptyStreamWarning = false;

                const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
                for (const match of peakMatches) {
                    if (parseFloat(match[1]) >= 0) clippingCount++;
                }

                const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
                for (const match of dcMatches) {
                    if (Math.abs(parseFloat(match[1])) > 0.01) {
                        dcOffsetWarning = true;
                        break;
                    }
                }

                resolve({ clippingCount, dcOffsetWarning, emptyStreamWarning });
            } catch (e) {
                console.error('[MetadataParser] Failed to parse health data:', e);
                resolve({ clippingCount: 0, dcOffsetWarning: false, emptyStreamWarning: false });
            }
        });

        child.on('error', (err: Error) => {
            console.error('[MetadataParser] astats spawn error:', err);
            resolve({ clippingCount: 0, dcOffsetWarning: false, emptyStreamWarning: false });
        });
    });
}

/**
 * Utility: Format file size in MB
 */
export function formatFileSize(bytes: number): string {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Utility: Format duration as MM:SS or HH:MM:SS
 */
export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Utility: Parse FFprobe frame rate string (e.g., "30000/1001")
 */
export function parseFrameRate(rateStr: string): number {
    if (!rateStr || rateStr === '0/1') return 0;
    const parts = rateStr.split('/');
    if (parts.length === 2) {
        return parseFloat(parts[0]) / parseFloat(parts[1]);
    }
    return parseFloat(rateStr);
}

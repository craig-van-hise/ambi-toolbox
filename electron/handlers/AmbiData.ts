import { IpcMainInvokeEvent, app } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { getFfmpegPath, getFfprobePath } from './common';

// Helper to get Python script path
function getPythonScriptPath(scriptName: string): string {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'py', scriptName);
    }
    return path.join(process.cwd(), 'py', scriptName);
}

/**
 * AmbiData File Analysis Handler
 * Analyzes audio/video files and returns comprehensive metadata
 */
export async function analyzeAmbiFile(event: IpcMainInvokeEvent, filePath: string): Promise<any> {
    try {
        console.log(`[AmbiData] Starting analysis: ${filePath}`);

        // PHASE 1: Basic metadata (ffprobe)
        const probeData = await runFFprobe(filePath);
        const audioStream = probeData.streams?.find((s: any) => s.codec_type === 'audio');
        const videoStream = probeData.streams?.find((s: any) => s.codec_type === 'video');

        if (!audioStream) {
            throw new Error('No audio stream found in file');
        }

        const stat = await fs.stat(filePath);
        const extension = path.extname(filePath);
        const nameWithoutExt = path.basename(filePath, extension);

        const channelCount = audioStream.channels || 0;
        const ambisonicOrder = Math.floor(Math.sqrt(channelCount)) - 1;

        const result: any = {
            id: filePath,
            name: nameWithoutExt,
            extension,
            path: filePath,
            size: formatFileSize(stat.size),
            containerFormat: probeData.format?.format_name || 'Unknown',
            duration: formatDuration(parseFloat(probeData.format?.duration || '0')),
            bitRate: probeData.format?.bit_rate ? `${Math.round(parseInt(probeData.format.bit_rate) / 1000)} kbps` : 'Unknown',
            type: videoStream ? 'Video' : 'Audio',
            audio: {
                codec: audioStream.codec_name || 'Unknown',
                sampleRate: parseInt(audioStream.sample_rate || '0'),
                bitDepth: audioStream.bits_per_sample || 16,
                channelCount,
                ambisonicOrder
            },
            loudness: { integrated: 0, range: 0, truePeak: 0 },
            health: { clippingCount: 0, dcOffsetWarning: false, emptyStreamWarning: false },
            spatial: {
                formatPrediction: 'Unknown',
                normalizationPrediction: 'Unknown',
                sequencePrediction: 'Unknown',
                confidence: 0,
                hasAmbisonicGUID: false,
                channelMappingFamily: undefined,
                headerGain: undefined,
                coreAudioLayoutTag: undefined,
                hasSA3DAtom: false
            }
        };

        if (videoStream) {
            result.video = {
                codec: videoStream.codec_name || 'Unknown',
                resolution: `${videoStream.width || 0}x${videoStream.height || 0}`,
                frameRate: parseFrameRate(videoStream.r_frame_rate || '0/1'),
                projectionType: undefined,
                stereoMode: undefined
            };
        }

        // Send Phase 1 complete
        event.sender.send('ambi-data-progress', { filePath, phase: 'metadata', data: result });

        // PHASE 2: Loudness analysis
        const loudnessData = await analyzeLoudness(filePath, channelCount);
        result.loudness = loudnessData;
        event.sender.send('ambi-data-progress', { filePath, phase: 'loudness', data: result });

        // PHASE 3: Signal health
        const healthData = await analyzeSignalHealth(filePath);
        result.health = healthData;
        event.sender.send('ambi-data-progress', { filePath, phase: 'health', data: result });

        // PHASE 4: Python heuristics
        const heuristicsData = await runPythonHeuristics(filePath);

        // PHASE 5: Container metadata
        const spatialMetadata = await extractSpatialMetadata(filePath, audioStream.codec_name || '');

        result.spatial = {
            formatPrediction: heuristicsData.format || 'Unknown',
            normalizationPrediction: heuristicsData.normalization || 'Unknown',
            sequencePrediction: heuristicsData.sequence || 'Unknown',
            confidence: heuristicsData.confidence || 0,
            ...spatialMetadata,
            hasAmbisonicGUID: false,
            channelMappingFamily: undefined,
            headerGain: undefined,
            coreAudioLayoutTag: undefined,
            hasSA3DAtom: false
        };

        event.sender.send('ambi-data-progress', { filePath, phase: 'spatial', data: result });

        console.log(`[AmbiData] Analysis complete: ${channelCount} channels, ${ambisonicOrder}th order`);
        return result;

    } catch (error: any) {
        console.error('[AmbiData] Analysis failed:', error);
        throw error;
    }
}

/**
 * Run FFprobe and parse JSON output
 */
async function runFFprobe(filePath: string): Promise<any> {
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

        child.stdout.on('data', (data) => { stdout += data.toString(); });
        child.stderr.on('data', (data) => { stderr += data.toString(); });

        child.on('close', (code) => {
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

        child.on('error', (err) => reject(err));
    });
}

/**
 * Analyze loudness using FFmpeg's ebur128 filter
 */
async function analyzeLoudness(filePath: string, channelCount: number): Promise<{ integrated: number; range: number; truePeak: number }> {
    return new Promise((resolve) => {
        const ffmpegPath = getFfmpegPath();

        let args: string[];
        if (channelCount > 2) {
            args = [
                '-i', filePath,
                '-filter_complex', '[0:a]pan=stereo|c0=0.5*c0+0.5*c1|c1=0.5*c0-0.5*c1,ebur128=peak=true[out]',
                '-map', '[out]',
                '-f', 'null', '-'
            ];
        } else {
            args = [
                '-i', filePath,
                '-filter:a', 'ebur128=peak=true',
                '-f', 'null', '-'
            ];
        }

        const child = spawn(ffmpegPath, args);
        let stderr = '';

        child.stderr.on('data', (data) => { stderr += data.toString(); });

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
                console.error('[AmbiData] Failed to parse loudness:', e);
                resolve({ integrated: 0, range: 0, truePeak: 0 });
            }
        });

        child.on('error', (err) => {
            console.error('[AmbiData] FFmpeg spawn error:', err);
            resolve({ integrated: 0, range: 0, truePeak: 0 });
        });
    });
}

/**
 * Analyze signal health using FFmpeg's astats filter
 */
async function analyzeSignalHealth(filePath: string): Promise<{ clippingCount: number; dcOffsetWarning: boolean; emptyStreamWarning: boolean }> {
    return new Promise((resolve) => {
        const ffmpegPath = getFfmpegPath();
        const args = [
            '-i', filePath,
            '-filter:a', 'astats=measure_overall=Peak_level:measure_perchannel=DC_offset:metadata=1',
            '-f', 'null', '-'
        ];

        const child = spawn(ffmpegPath, args);
        let stderr = '';

        child.stderr.on('data', (data) => { stderr += data.toString(); });

        child.on('close', (code) => {
            if (code !== 0 && code !== 1) {
                console.warn(`[AmbiData] Health analysis failed with code ${code}`);
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
                console.error('[AmbiData] Failed to parse health data:', e);
                resolve({ clippingCount: 0, dcOffsetWarning: false, emptyStreamWarning: false });
            }
        });

        child.on('error', (err) => {
            console.error('[AmbiData] astats spawn error:', err);
            resolve({ clippingCount: 0, dcOffsetWarning: false, emptyStreamWarning: false });
        });
    });
}

/**
 * Run Python heuristics for format detection
 */
async function runPythonHeuristics(filePath: string): Promise<any> {
    return new Promise((resolve) => {
        const scriptPath = getPythonScriptPath('ambi_data_heuristics.py');
        const child = spawn('python3', [scriptPath, filePath]);

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => { stdout += data.toString(); });
        child.stderr.on('data', (data) => { stderr += data.toString(); });

        child.on('close', (code) => {
            if (code === 0) {
                try {
                    resolve(JSON.parse(stdout));
                } catch (e) {
                    console.error('[AmbiData] Failed to parse Python output:', e);
                    resolve({ format: 'Unknown', normalization: 'Unknown', sequence: 'Unknown', confidence: 0 });
                }
            } else {
                console.error('[AmbiData] Python script failed:', stderr);
                resolve({ format: 'Unknown', normalization: 'Unknown', sequence: 'Unknown', confidence: 0 });
            }
        });

        child.on('error', (err) => {
            console.error('[AmbiData] Python spawn error:', err);
            resolve({ format: 'Unknown', normalization: 'Unknown', sequence: 'Unknown', confidence: 0 });
        });
    });
}

/**
 * Extract container-specific spatial metadata
 */
async function extractSpatialMetadata(filePath: string, codecName: string): Promise<any> {
    // Placeholder - can be expanded for specific containers like Opus, MP4, etc.
    return {};
}

/**
 * Format file size in MB
 */
function formatFileSize(bytes: number): string {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Format duration as MM:SS or HH:MM:SS
 */
function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Parse FFprobe frame rate string (e.g., "30000/1001")
 */
function parseFrameRate(rateStr: string): number {
    if (!rateStr || rateStr === '0/1') return 0;
    const parts = rateStr.split('/');
    if (parts.length === 2) {
        return parseFloat(parts[0]) / parseFloat(parts[1]);
    }
    return parseFloat(rateStr);
}

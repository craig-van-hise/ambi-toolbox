import { IpcMainInvokeEvent, app } from '../shim';
import path from 'node:path';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { getFfmpegPath, getFfprobePath } from './common';

import { parseWavHeader } from './WaveParser';

import { parseIamfFile } from './IamfParser';
// ... (imports remain)

// ...

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
export async function analyzeAmbiFile(event: IpcMainInvokeEvent, filePath: string, options?: { streamIndex?: number }): Promise<any> {
    try {
        const streamIndex = options?.streamIndex ?? 0;
        console.log(`[AmbiData] Starting analysis: ${filePath} (Stream: ${streamIndex})`);

        // PHASE 1a: Basic File Info (Instant)
        const stat = await fs.stat(filePath);
        const extension = path.extname(filePath);
        const nameWithoutExt = path.basename(filePath, extension);
        const sizeFormatted = formatFileSize(stat.size);

        // Try fast WAV parsing
        const fastAudioData = await parseWavHeader(filePath);
        let basicData: any = {
            id: filePath,
            name: nameWithoutExt,
            extension,
            path: filePath,
            size: sizeFormatted,
            selectedStreamIndex: streamIndex
        };

        if (fastAudioData) {
            // Strict Guard: Ensure channel count is valid
            let channelCount = Number(fastAudioData.channels);
            if (isNaN(channelCount) || channelCount <= 0) channelCount = 0;

            // Strict Guard: Calculate Ambisonic Order
            let ambisonicOrder = -1;
            if (channelCount > 0) {
                ambisonicOrder = Math.floor(Math.sqrt(channelCount)) - 1;
            }

            basicData.audio = {
                codec: fastAudioData.codec,
                sampleRate: fastAudioData.sampleRate,
                bitDepth: fastAudioData.bitDepth,
                channelCount,
                ambisonicOrder
            };
            basicData.containerFormat = 'WAV (Fast Check)';
        }

        // Send basic info immediately
        event.sender.send('ambi-data-progress', {
            filePath,
            phase: 'basic',
            data: basicData
        });

        // PHASE 1b: Detailed Metadata (FFprobe)
        let probeData: any = {};
        let audioStreams: any[] = [];
        let videoStream: any = undefined;

        try {
            probeData = await runFFprobe(filePath);
            audioStreams = probeData.streams?.filter((s: any) => s.codec_type === 'audio') || [];
            videoStream = probeData.streams?.find((s: any) => s.codec_type === 'video');
        } catch (err) {
            console.warn(`[AmbiData] FFprobe failed for ${filePath}:`, err);
            if (extension.toLowerCase() !== '.iamf') throw err;
            console.log('[AmbiData] Proceeding with IAMF native parser only...');
        }

        // Parse IAMF if applicable
        let iamfData = undefined;
        if (extension.toLowerCase() === '.iamf') {
            console.log('[AmbiData] Parsing IAMF structure...');
            iamfData = await parseIamfFile(filePath);
        }

        // Output Construction
        if (audioStreams.length === 0 && iamfData) {
            audioStreams = [{
                codec_name: 'IAMF (OBU)',
                sample_rate: fastAudioData?.sampleRate || 48000,
                channels: fastAudioData?.channels || 0,
                bits_per_sample: fastAudioData?.bitDepth || 16
            }];
        } else if (audioStreams.length === 0) {
            throw new Error('No audio stream found in file');
        }

        // Validate Stream Index
        if (streamIndex < 0 || streamIndex >= audioStreams.length) {
            console.warn(`[AmbiData] Invalid stream index ${streamIndex}, defaulting to 0`);
            // We don't change the requested index but we use 0 for data lookup safely
        }
        const activeStream = audioStreams[streamIndex] || audioStreams[0];

        // Strict Guard: Channels
        let channelCount = Number(activeStream.channels);
        if (isNaN(channelCount) || channelCount <= 0) channelCount = 0;

        // Strict Guard: Order
        let ambisonicOrder = -1; // Default to -1 (N/A)
        if (channelCount > 0) {
            ambisonicOrder = Math.floor(Math.sqrt(channelCount)) - 1;
        }

        // Duration Implementation
        let durationStr = formatDuration(parseFloat(probeData.format?.duration || '0'));
        if (extension.toLowerCase() === '.iamf') {
            // If raw IAMF has 0 duration in probe, marked as Unknown per PRP #83
            if (!probeData.format?.duration || parseFloat(probeData.format.duration) === 0) {
                durationStr = "Unknown (Raw Bitstream)";
            }
        } else if (!durationStr || durationStr === "0:00") {
            durationStr = "0:00"; // Fallback
        }

        const result: any = {
            id: filePath,
            name: nameWithoutExt,
            extension,
            path: filePath,
            size: sizeFormatted,
            containerFormat: probeData.format?.format_name || 'IAMF (Raw OBU)',
            duration: durationStr,
            bitRate: probeData.format?.bit_rate ? `${Math.round(parseInt(probeData.format.bit_rate) / 1000)} kbps` : 'Unknown',
            type: videoStream ? 'Video' : 'Audio',
            selectedStreamIndex: streamIndex,
            // Bind stats to SELECTED stream
            audio: {
                codec: activeStream.codec_name || 'Unknown',
                sampleRate: parseInt(activeStream.sample_rate || '0'),
                bitDepth: activeStream.bits_per_sample || 16,
                channelCount,
                ambisonicOrder
            },
            audioStreams: audioStreams.map((s: any, idx: number) => {
                let sChannels = Number(s.channels);
                if (isNaN(sChannels) || sChannels <= 0) sChannels = 0;
                return {
                    index: idx,
                    codec: s.codec_name || 'Unknown',
                    sampleRate: parseInt(s.sample_rate || '0'),
                    bitDepth: s.bits_per_sample || 16,
                    channelCount: sChannels,
                    ambisonicOrder: (sChannels > 0) ? Math.floor(Math.sqrt(sChannels)) - 1 : 0
                };
            }),
            iamf: iamfData,
            loudness: { integrated: 0, range: 0, truePeak: 0 },
            health: { clippingCount: 0, dcOffsetWarning: false, emptyStreamWarning: false },
            spatial: {
                formatPrediction: 'Unknown',
                confidence: 0,
                // ... defaults
                hasAmbisonicGUID: false,
                hasSA3DAtom: false
            }
        };

        if (videoStream) {
            result.video = {
                codec: videoStream.codec_name || 'Unknown',
                resolution: `${videoStream.width || 0}x${videoStream.height || 0}`,
                frameRate: parseFrameRate(videoStream.r_frame_rate || '0/1')
            };
        }

        // Send Metadata Phase complete
        console.log('[AmbiData Backend] 📤 Sending metadata phase event');
        event.sender.send('ambi-data-progress', { filePath, phase: 'metadata', data: result });

        // Skip heuristics analysis for IAMF per PRP #83
        if (iamfData) {
            const firstElement = iamfData.audioElements?.[0];
            result.spatial.formatPrediction = firstElement?.type || 'IAMF Scene-Based';
            result.spatial.normalizationPrediction = firstElement?.normalization || 'SN3D';
            result.spatial.confidence = 100;
            // No heuristics for IAMF
            event.sender.send('ambi-data-progress', { filePath, phase: 'spatial-final', data: result });
        } else {
            // Trigger Python heuristics for non-IAMF
            // ... Code omitted for brevity in replacement, but logically we keep existing flow
            // Actually, I must preserve existing flow.
            // PHASE 5: Python heuristics (runs in background)
            // PHASE 5: Python heuristics (runs in background)
            runPythonHeuristics(filePath).then(async (heuristicsData) => {
                // PHASE 6: Container metadata
                const spatialMetadata = await extractSpatialMetadata();

                result.spatial = {
                    ...result.spatial,
                    formatPrediction: heuristicsData.format || 'Unknown',
                    normalizationPrediction: heuristicsData.normalization || 'Unknown',
                    sequencePrediction: heuristicsData.sequence || 'Unknown',
                    confidence: heuristicsData.confidence || 0,
                    ...spatialMetadata
                };
                event.sender.send('ambi-data-progress', { filePath, phase: 'spatial-final', data: result });
            });
        }


        // PHASE 2: Loudness analysis (Targeted Stream)
        console.log(`[AmbiData Backend] Starting loudness analysis (Stream ${streamIndex})...`);
        const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
        result.loudness = loudnessData;
        event.sender.send('ambi-data-progress', { filePath, phase: 'loudness', data: result });

        // PHASE 3: Signal health (Targeted Stream)
        console.log(`[AmbiData Backend] Starting health analysis (Stream ${streamIndex})...`);
        const healthData = await analyzeSignalHealth(filePath, streamIndex);
        result.health = healthData;
        event.sender.send('ambi-data-progress', { filePath, phase: 'health', data: result });

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
async function analyzeLoudness(filePath: string, channelCount: number, streamIndex: number = 0): Promise<{ integrated: number; range: number; truePeak: number }> {
    return new Promise((resolve) => {
        const ffmpegPath = getFfmpegPath();

        // Construct map argument
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
async function analyzeSignalHealth(filePath: string, streamIndex: number = 0): Promise<{ clippingCount: number; dcOffsetWarning: boolean; emptyStreamWarning: boolean }> {
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
async function extractSpatialMetadata(): Promise<any> {
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

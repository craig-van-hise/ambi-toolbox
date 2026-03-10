import { IpcMainInvokeEvent } from '../shim';
import path from 'node:path';
import { parseWavHeader } from './WaveParser';
import { parseIamfFile } from './IamfParser';
import {
    getBasicFileInfo,
    runFFprobe,
    analyzeLoudness,
    analyzeSignalHealth,
    formatDuration,
    parseFrameRate
} from './MetadataParser';
import { runPythonHeuristics, extractSpatialMetadata } from './PythonHeuristics';

/**
 * AmbiData File Analysis Handler
 * Orchestrates multiple analysis phases and sends progress updates to the renderer.
 */
export async function analyzeAmbiFile(event: IpcMainInvokeEvent, filePath: string, options?: { streamIndex?: number }): Promise<any> {
    try {
        const streamIndex = options?.streamIndex ?? 0;
        const extension = path.extname(filePath).toLowerCase();

        console.log(`[AmbiData] Starting analysis: ${filePath} (Stream: ${streamIndex})`);

        // PHASE 1a: Basic File Info (Instant)
        const basicInfo = await getBasicFileInfo(filePath);
        const fastAudioData = await parseWavHeader(filePath);

        let basicData: any = {
            ...basicInfo,
            selectedStreamIndex: streamIndex
        };

        if (fastAudioData) {
            let channelCount = Number(fastAudioData.channels);
            if (isNaN(channelCount) || channelCount <= 0) channelCount = 0;

            let ambisonicOrder = channelCount > 0 ? Math.floor(Math.sqrt(channelCount)) - 1 : -1;

            basicData.audio = {
                codec: fastAudioData.codec,
                sampleRate: fastAudioData.sampleRate,
                bitDepth: fastAudioData.bitDepth,
                channelCount,
                ambisonicOrder
            };
            basicData.containerFormat = 'WAV (Fast Check)';
        }

        event.sender.send('ambi-data-progress', { filePath, phase: 'basic', data: basicData });

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
            if (extension !== '.iamf') throw err;
        }

        // Parse IAMF if applicable
        let iamfData = undefined;
        if (extension === '.iamf') {
            iamfData = await parseIamfFile(filePath);
        }

        // Output Construction
        if (audioStreams.length === 0 && iamfData) {
            const maxChannels = iamfData.audioElements?.reduce((max: number, el: any) =>
                Math.max(max, el.outputChannelCount || 0), 0) || 0;

            audioStreams = [{
                codec_name: 'IAMF (OBU)',
                sample_rate: fastAudioData?.sampleRate || 48000,
                channels: maxChannels,
                bits_per_sample: fastAudioData?.bitDepth || 16
            }];
        } else if (audioStreams.length === 0) {
            throw new Error('No audio stream found in file');
        }

        const activeStream = audioStreams[streamIndex] || audioStreams[0];
        let channelCount = Number(activeStream.channels);
        if (isNaN(channelCount) || channelCount <= 0) channelCount = 0;
        let ambisonicOrder = channelCount > 0 ? Math.floor(Math.sqrt(channelCount)) - 1 : -1;

        let durationStr = formatDuration(parseFloat(probeData.format?.duration || '0'));
        if (extension === '.iamf' && (!probeData.format?.duration || parseFloat(probeData.format.duration) === 0)) {
            durationStr = "Unknown (Raw Bitstream)";
        }

        const result: any = {
            ...basicData,
            containerFormat: probeData.format?.format_name || 'IAMF (Raw OBU)',
            duration: durationStr,
            bitRate: probeData.format?.bit_rate ? `${Math.round(parseInt(probeData.format.bit_rate) / 1000)} kbps` : 'Unknown',
            type: videoStream ? 'Video' : 'Audio',
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

        event.sender.send('ambi-data-progress', { filePath, phase: 'metadata', data: result });

        // PHASE 5: Python heuristics (runs in background)
        if (iamfData) {
            result.spatial.formatPrediction = iamfData.profile || iamfData.audioElements?.[0]?.type || 'IAMF Scene-Based';
            result.spatial.normalizationPrediction = iamfData.audioElements?.[0]?.normalization || 'SN3D';
            result.spatial.confidence = 100;
            event.sender.send('ambi-data-progress', { filePath, phase: 'spatial-final', data: result });
        } else {
            runPythonHeuristics(filePath).then(async (heuristicsData) => {
                const spatialMetadata = await extractSpatialMetadata();
                result.spatial = {
                    ...result.spatial,
                    formatPrediction: heuristicsData.format || 'Unknown',
                    normalizationPrediction: heuristicsData.normalization || 'Unknown',
                    sequencePrediction: heuristicsData.sequence || 'Unknown',
                    confidence: heuristicsData.confidence || 0,
                    hasADM: heuristicsData.chunks?.has_axml || heuristicsData.chunks?.has_chna,
                    ...spatialMetadata
                };

                if ((result.spatial.hasADM || heuristicsData.chunks?.is_bw64 || heuristicsData.chunks?.is_rf64) &&
                    result.containerFormat.toLowerCase().includes('wav')) {
                    result.containerFormat = 'BW64 / ADM (WAV)';
                }

                event.sender.send('ambi-data-progress', { filePath, phase: 'spatial-final', data: result });
            });
        }

        // PHASE 2 & 3: Loudness & Signal health (Targeted Stream)
        const [loudnessData, healthData] = await Promise.all([
            analyzeLoudness(filePath, channelCount, streamIndex),
            analyzeSignalHealth(filePath, streamIndex)
        ]);

        result.loudness = loudnessData;
        event.sender.send('ambi-data-progress', { filePath, phase: 'loudness', data: result });

        result.health = healthData;
        event.sender.send('ambi-data-progress', { filePath, phase: 'health', data: result });

        return result;

    } catch (error: any) {
        console.error('[AmbiData] Analysis failed:', error);
        throw error;
    }
}

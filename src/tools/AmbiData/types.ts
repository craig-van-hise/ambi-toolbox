export enum FileType {
    Audio = 'Audio',
    Video = 'Video',
}

export interface AudioStreamInfo {
    codec: string;
    sampleRate: number; // Hz
    bitDepth: number; // bits
    channelCount: number;
    ambisonicOrder: number;
}

export interface VideoStreamInfo {
    codec: string;
    resolution: string;
    frameRate: number;
    projectionType?: string; // Editable
    stereoMode?: string; // Editable
}

export interface LoudnessMetrics {
    integrated: number; // LUFS
    range: number; // LU
    truePeak: number; // dBTP
}

export interface SignalHealth {
    clippingCount: number;
    dcOffsetWarning: boolean;
    emptyStreamWarning: boolean;
}

export interface SpatialMetadata {
    formatPrediction: string;
    normalizationPrediction: string;
    sequencePrediction?: string;

    // Container Specific - WAV/BWF
    hasAmbisonicGUID?: boolean;
    bextDescription?: string; // Editable

    // Container Specific - Opus/Ogg/WebM/MKV
    channelMappingFamily?: string; // Editable
    headerGain?: number; // Editable

    // Container Specific - MP4/MOV/CAF
    coreAudioLayoutTag?: string; // Editable
    hasSA3DAtom?: boolean;
}

export interface MediaFile {
    id: string;
    name: string;
    extension: string;
    path: string;
    size: string;
    containerFormat: string;
    duration: string;
    bitRate: string;
    type: FileType;
    isAnalyzing?: boolean; // True while backend analysis is in progress

    audio: AudioStreamInfo;
    video?: VideoStreamInfo;

    loudness: LoudnessMetrics;
    health: SignalHealth;
    spatial: SpatialMetadata;
}

// Payload structure for IPC communication
export interface AmbiDataPayload {
    // File Identity
    name: string;
    extension: string;
    path: string;
    size: string;
    containerFormat: string;
    duration: string;
    bitRate: string;
    type: FileType;

    // Core Specs
    audio: AudioStreamInfo;
    video?: VideoStreamInfo;

    // Dynamics (Phase 4)
    loudness?: LoudnessMetrics;
    health?: SignalHealth;

    // Spatial Metadata (Phase 5)
    spatial?: SpatialMetadata;
}

export enum FileType {
    Audio = 'Audio',
    Video = 'Video',
}

export interface AudioStreamInfo {
    index?: number;
    codec: string;
    sampleRate: number; // Hz
    bitDepth: number; // bits
    channelCount: number;
    ambisonicOrder: number;
}

export interface IamfMetadata {
    profile?: string;
    primaryProfile?: string;
    additionalProfile?: string;
    mixPresentation?: {
        loudness?: number; // LUFS
        truePeak?: number; // dBTP
    };
    audioElements?: {
        id: number;
        type: string; // 'Scene-Based' | 'Channel-Based'
        ambisonicOrder?: number;
        normalization?: string;
        outputChannelCount?: number;
    }[];
    mixTargets?: string[];
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
    hasADM?: boolean;
    admVersion?: string;
    bextDescription?: string; // Editable


    // Container Specific - Opus/Ogg/WebM/MKV
    channelMappingFamily?: string; // Editable
    headerGain?: number; // Editable

    // Container Specific - MP4/MOV/CAF
    coreAudioLayoutTag?: string; // Editable
    hasSA3DAtom?: boolean;

    confidence?: number; // Heuristic confidence score (0-100)
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
    loadedPhases: string[]; // Tracks which analysis phases have completed
    selectedStreamIndex?: number; // Adaptive UI: Currently selected stream index for analysis


    audio: AudioStreamInfo;
    audioStreams?: AudioStreamInfo[]; // For multi-stream files (IAMF)
    iamf?: IamfMetadata; // IAMF-specific metadata

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

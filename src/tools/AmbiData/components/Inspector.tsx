import React from 'react';
import { MediaFile, FileType } from '../types';
import { InspectorCard, DataField, HorizontalRow } from './InspectorComponents';

interface InspectorProps {
    file: MediaFile | undefined;
    activeEdits: Record<string, any>;
    onEdit: (path: string, value: any) => void;
}

export const Inspector: React.FC<InspectorProps> = ({ file, activeEdits, onEdit }) => {
    if (!file) {
        return (
            <div className="h-full flex items-center justify-center text-neutral-600">
                Select a file to inspect
            </div>
        );
    }

    // Helper to get value from edits or fallback to file
    const getValue = (path: string, fallback: any) => {
        return activeEdits[path] !== undefined ? activeEdits[path] : fallback;
    };

    // Helper to add ordinal suffix (1st, 2nd, 3rd, etc.)
    const getOrdinalSuffix = (num: number) => {
        if (num === 0) return '0';
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) return `${num}st`;
        if (j === 2 && k !== 12) return `${num}nd`;
        if (j === 3 && k !== 13) return `${num}rd`;
        return `${num}th`;
    };

    return (
        <div className="h-full overflow-y-auto p-6 pb-24">
            {/* CARD 1: File Identity & Core Specs */}
            <InspectorCard title="File Identity & Core Specs" defaultOpen={true}>
                <div className="mb-3">
                    <DataField label="File Name & Extension" value={`${file.name}${file.extension}`} />
                </div>
                <div className="mb-3">
                    <DataField label="File Location Path" value={file.path} />
                </div>

                <HorizontalRow>
                    <DataField label="Container Format" value={file.containerFormat} isAnalyzing={!file.loadedPhases.includes('metadata') && file.containerFormat === 'Unknown'} />
                    <DataField label="File Size" value={file.size} isAnalyzing={!file.loadedPhases.includes('basic')} />
                    <DataField label="Precise Duration" value={file.duration} isAnalyzing={!file.loadedPhases.includes('metadata')} />
                    <DataField label="Overall Bit Rate" value={file.bitRate} isAnalyzing={!file.loadedPhases.includes('metadata')} />
                </HorizontalRow>

                <HorizontalRow>
                    <DataField label="Codec" value={file.audio.codec} isAnalyzing={!file.loadedPhases.includes('metadata') && file.audio.codec === 'Unknown'} />
                    <DataField label="Sample Rate" value={`${(file.audio.sampleRate / 1000).toFixed(1)} kHz`} isAnalyzing={!file.loadedPhases.includes('metadata') && file.audio.sampleRate === 0} />
                    <DataField label="Bit Depth" value={`${file.audio.bitDepth}-bit`} isAnalyzing={!file.loadedPhases.includes('metadata') && file.audio.bitDepth === 0} />
                    <DataField label="Channels" value={file.audio.channelCount} isAnalyzing={!file.loadedPhases.includes('metadata') && file.audio.channelCount === 0} />
                    <DataField label="Ambisonic Order" value={(() => {
                        const order = file.audio.ambisonicOrder;
                        const suffix = order === 1 ? 'st' : order === 2 ? 'nd' : order === 3 ? 'rd' : 'th';
                        return `${order}${suffix}`;
                    })()} isAnalyzing={!file.loadedPhases.includes('metadata') && file.audio.channelCount === 0} />
                </HorizontalRow>

                {file.type === FileType.Video && file.video && (
                    <div className="mt-4 pt-4 border-t border-white/5 border-dashed">
                        <HorizontalRow>
                            <DataField label="Video Codec" value={file.video.codec} />
                            <DataField label="Resolution" value={file.video.resolution} />
                            <DataField label="Frame Rate" value={`${file.video.frameRate} fps`} />
                        </HorizontalRow>
                    </div>
                )}
            </InspectorCard>

            {/* CARD 2: Dynamics & Signal Health */}
            <InspectorCard title="Dynamics & Signal Health" defaultOpen={true}>
                <HorizontalRow>
                    <DataField label="Integrated Loudness" value={`${file.loudness.integrated.toFixed(1)} LUFS`} isAnalyzing={!file.loadedPhases.includes('loudness')} />
                    <DataField label="Loudness Range (LRA)" value={`${file.loudness.range.toFixed(1)} LU`} isAnalyzing={!file.loadedPhases.includes('loudness')} />
                    <DataField
                        label="True Peak Max (dBTP)"
                        value={`${file.loudness.truePeak.toFixed(1)} dBTP`}
                        warningLevel={file.loudness.truePeak > -1.0 ? 'warning' : 'success'}
                        isAnalyzing={!file.loadedPhases.includes('loudness')}
                    />
                    <DataField
                        label="Raw Clipping Count"
                        value={file.health.clippingCount}
                        warningLevel={file.health.clippingCount > 0 ? 'error' : 'success'}
                        isAnalyzing={!file.loadedPhases.includes('health')}
                    />
                    <DataField
                        label="DC Offset Warning"
                        value={file.health.dcOffsetWarning ? "DETECTED" : "None"}
                        warningLevel={file.health.dcOffsetWarning ? 'warning' : 'success'}
                        isAnalyzing={!file.loadedPhases.includes('health')}
                    />
                    <DataField
                        label="Empty Stream Warning"
                        value={file.health.emptyStreamWarning ? "DETECTED" : "None"}
                        warningLevel={file.health.emptyStreamWarning ? 'error' : 'success'}
                        isAnalyzing={!file.loadedPhases.includes('health')}
                    />
                </HorizontalRow>
            </InspectorCard>

            {/* CARD 3: Spatial Metadata & Heuristics */}
            <InspectorCard title="Spatial Metadata & Heuristics" defaultOpen={true}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <DataField label="Format Type Prediction" value={file.spatial.formatPrediction} isAnalyzing={!file.loadedPhases.includes('spatial')} />
                    <DataField
                        label="Ordering/Normalization"
                        value={(() => {
                            const seq = file.spatial.sequencePrediction || 'Unknown';
                            const norm = file.spatial.normalizationPrediction || 'Unknown';
                            const base = `${seq}/${norm}`;
                            // Add format name suffix
                            if (seq === 'ACN' && norm === 'SN3D') {
                                return `${base} (AmbiX)`;
                            } else if (seq === 'FuMa' && norm === 'MaxN') {
                                return `${base} (FuMa)`;
                            }
                            return base;
                        })()}
                        isAnalyzing={!file.loadedPhases.includes('spatial')}
                    />
                </div>

                {/* WAV/BWF */}
                {file.containerFormat.includes('WAVE') && (
                    <div className="mt-3 flex flex-col gap-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            <DataField
                                label="Is Ambisonic GUID present?"
                                value={file.spatial.hasAmbisonicGUID ? "Yes (WAVEFORMATEXTENSIBLE)" : "No"}
                                warningLevel={file.spatial.hasAmbisonicGUID ? 'success' : 'warning'}
                            />
                        </div>
                        <div className="w-full">
                            <DataField
                                label="BEXT Description"
                                value={getValue('spatial.bextDescription', file.spatial.bextDescription || "")}
                                isEditable
                                type="textarea"
                                onChange={(val) => onEdit('spatial.bextDescription', val)}
                            />
                        </div>
                    </div>
                )}

                {/* Opus/Ogg/WebM/MKV */}
                {(file.containerFormat.includes('Ogg') || file.containerFormat.includes('WebM') || file.containerFormat.includes('Matroska')) && (
                    <div className="mt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <DataField
                                label="Channel Mapping Family"
                                value={getValue('spatial.channelMappingFamily', file.spatial.channelMappingFamily || "Family 0")}
                                isEditable
                                type="select"
                                options={["Family 0", "Family 1", "Family 2", "Family 3"]}
                                onChange={(val) => onEdit('spatial.channelMappingFamily', val)}
                            />
                            <DataField
                                label="Header Gain / Output Gain"
                                value={getValue('spatial.headerGain', file.spatial.headerGain ?? 0)}
                                isEditable
                                type="number"
                                onChange={(val) => onEdit('spatial.headerGain', val)}
                            />
                        </div>
                    </div>
                )}

                {/* MP4/MOV/CAF */}
                {(file.containerFormat.includes('MPEG-4') || file.containerFormat.includes('QuickTime')) && (
                    <div className="mt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <DataField
                                label="Core Audio Layout Tag"
                                value={getValue('spatial.coreAudioLayoutTag', file.spatial.coreAudioLayoutTag || "Use Channel Bitmap")}
                                isEditable
                                type="select"
                                options={["Use Channel Bitmap", "HOA_ACN_SN3D", "HOA_ACN_N3D", "Ambisonic_B_Format"]}
                                onChange={(val) => onEdit('spatial.coreAudioLayoutTag', val)}
                            />
                            <DataField
                                label="SA3D Atom Present"
                                value={file.spatial.hasSA3DAtom ? "Yes" : "No"}
                                warningLevel={file.spatial.hasSA3DAtom ? 'success' : 'warning'}
                            />
                        </div>
                    </div>
                )}

                {/* Video Spatial Metadata */}
                {file.type === FileType.Video && file.video && (
                    <div className="mt-4 pt-4 border-t border-white/5 border-dashed grid grid-cols-1 md:grid-cols-2 gap-3">
                        <DataField
                            label="Projection Type"
                            value={getValue('video.projectionType', file.video.projectionType || "None (Flat)")}
                            isEditable
                            type="select"
                            options={["None (Flat)", "Equirectangular", "Cubemap", "Mesh"]}
                            onChange={(val) => onEdit('video.projectionType', val)}
                        />
                        <DataField
                            label="Stereo Mode"
                            value={getValue('video.stereoMode', file.video.stereoMode || "Monoscopic (2D)")}
                            isEditable
                            type="select"
                            options={["Monoscopic (2D)", "Stereoscopic Top-Bottom (3D)", "Stereoscopic Left-Right (3D)"]}
                            onChange={(val) => onEdit('video.stereoMode', val)}
                        />
                    </div>
                )}

            </InspectorCard>

            <div className="h-10" /> {/* Spacer for bottom bar */}
        </div>
    );
};

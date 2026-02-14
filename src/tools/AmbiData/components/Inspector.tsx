import React from 'react';
import { MediaFile, FileType } from '../types';
import { InspectorCard, DataField, HorizontalRow } from './InspectorComponents';
import { Activity, Globe, Layers } from 'lucide-react';

interface InspectorProps {
    file: MediaFile | undefined;
    activeEdits: Record<string, any>;
    onEdit: (path: string, value: any) => void;
    onStreamSelect: (fileId: string, streamIndex: number) => void;
}

export const Inspector: React.FC<InspectorProps> = ({ file, activeEdits, onEdit, onStreamSelect }) => {
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
        if (num < 0) return 'N/A'; // Strict Guard fallback
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) return `${num}st`;
        if (j === 2 && k !== 12) return `${num}nd`;
        if (j === 3 && k !== 13) return `${num}rd`;
        return `${num}th`;
    };

    // Determine Active Stream Data
    const isIAMF = file.extension.toLowerCase() === '.iamf';
    const selection = file.selectedStreamIndex ?? 0;

    let activeStream = {
        codec: 'Unknown',
        sampleRate: 0,
        bitDepth: 0,
        channelCount: 0,
        ambisonicOrder: -1 // N/A
    };

    // Flag for Channel-Based OBUs (e.g. 5.1, 7.1)
    let isChannelBased = false;

    if (isIAMF) {
        // Map Selection to OBU ID
        const obu = file.iamf?.audioElements?.find((e: any) => e.id === selection) || file.iamf?.audioElements?.[0];

        if (obu) {
            activeStream.codec = `IAMF OBU (ID ${obu.id})`;
            activeStream.sampleRate = 48000; // Default for IAMF
            activeStream.bitDepth = 16;
            activeStream.channelCount = obu.outputChannelCount || 0;

            if (obu.type === 'Scene-Based') {
                if (activeStream.channelCount > 0) {
                    // Standard Ambisonic Order Calculation
                    activeStream.ambisonicOrder = Math.floor(Math.sqrt(activeStream.channelCount)) - 1;
                }
            } else {
                isChannelBased = true;
            }
        }
    } else {
        // Standard Behavior
        const stream = (file.audioStreams && file.audioStreams[selection])
            ? file.audioStreams[selection]
            : file.audio;
        activeStream = { ...stream };
    }

    return (
        <div className="h-full overflow-y-auto p-6 pb-24">
            {/* CARD 1: File Identity (Container Only) */}
            <InspectorCard title="File Identity" defaultOpen={true}>
                <div className="mb-3">
                    <DataField label="File Name & Extension" value={`${file.name}${file.extension}`} />
                </div>
                <div className="mb-3">
                    <DataField label="File Location Path" value={file.path} />
                </div>

                <HorizontalRow>
                    <DataField label="Container Format" value={file.containerFormat} isAnalyzing={!file.loadedPhases.includes('metadata') && file.containerFormat === 'Unknown'} />
                    <DataField label="File Size" value={file.size} isAnalyzing={!file.loadedPhases.includes('basic')} />
                </HorizontalRow>
            </InspectorCard>

            {/* CARD 2: Stream Selector (New) */}
            {file.audioStreams && file.audioStreams.length > 0 && (
                <div className="mb-5 bg-studio-bg-lighter border border-indigo-500/30 rounded-lg p-4 shadow-lg shadow-indigo-900/10">
                    <div className="flex items-center gap-2 mb-3">
                        <Layers className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Target Stream Selector</h3>
                    </div>

                    <select
                        value={selection}
                        onChange={(e) => onStreamSelect(file.id, parseInt(e.target.value))}
                        className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                        {isIAMF ? (
                            file.iamf?.audioElements?.map((obu: any) => (
                                <option key={obu.id} value={obu.id}>
                                    ID {obu.id}: {obu.type} ({obu.outputChannelCount || '?'}ch)
                                </option>
                            ))
                        ) : (
                            file.audioStreams?.map((s) => (
                                <option key={s.index} value={s.index}>
                                    Stream #{s.index} (Main Audio) - {s.codec} ({s.channelCount}ch)
                                </option>
                            ))
                        )}
                    </select>
                    <p className="text-xs text-gray-400 mt-2">
                        {isIAMF ? "Select an OBU stream to analyze." : "Select an internal track to analyze."}
                    </p>
                </div>
            )}


            {/* CARD 3: Core Specs (Bound to Active Stream) */}
            <InspectorCard title="Core Audio Specs" defaultOpen={true}>
                <HorizontalRow>
                    <DataField label="Codec" value={activeStream.codec} isAnalyzing={!file.loadedPhases.includes('metadata') && activeStream.codec === 'Unknown'} />
                    <DataField label="Sample Rate" value={`${(activeStream.sampleRate / 1000).toFixed(1)} kHz`} isAnalyzing={!file.loadedPhases.includes('metadata') && activeStream.sampleRate === 0} />
                    <DataField label="Bit Depth" value={`${activeStream.bitDepth}-bit`} isAnalyzing={!file.loadedPhases.includes('metadata') && activeStream.bitDepth === 0} />
                </HorizontalRow>
                <HorizontalRow>
                    <DataField label="Channels" value={activeStream.channelCount === 0 ? "Unknown" : activeStream.channelCount} isAnalyzing={!file.loadedPhases.includes('metadata') && activeStream.channelCount === 0} />
                    <DataField label="Ambisonic Order" value={isChannelBased ? "N/A (Channel-Based)" : getOrdinalSuffix(activeStream.ambisonicOrder)} isAnalyzing={!file.loadedPhases.includes('metadata') && activeStream.channelCount === 0} />
                    <DataField label="Precise Duration" value={file.duration} isAnalyzing={!file.loadedPhases.includes('metadata')} />
                </HorizontalRow>
                <div className="mt-3">
                    <DataField label="Overall Bit Rate" value={file.bitRate} isAnalyzing={!file.loadedPhases.includes('metadata')} />
                </div>
            </InspectorCard>


            {/* CARD 4: DYNAMICS & HEALTH (Bound to Active Stream) */}
            <InspectorCard
                title="Dynamics & Signal Health"
                icon={<Activity className="w-5 h-5 text-indigo-400" />}
                loading={file.isAnalyzing && !file.loadedPhases.includes('loudness') && !file.loadedPhases.includes('health')}
            >
                <HorizontalRow>
                    <DataField
                        label="Integrated Loudness"
                        value={file.loudness.integrated === 0 ? "Analysis Unavailable" : `${file.loudness.integrated.toFixed(1)} LUFS`}
                        isAnalyzing={!file.loadedPhases.includes('loudness')}
                        warningLevel={
                            file.loudness.integrated > -14 ? 'error' :
                                file.loudness.integrated > -24 ? 'warning' : 'success'
                        }
                    />
                    <DataField
                        label="Loudness Range"
                        value={file.loudness.range === 0 ? "--" : `${file.loudness.range.toFixed(1)} LU`}
                        isAnalyzing={!file.loadedPhases.includes('loudness')}
                    />
                    <DataField
                        label="True Peak Max"
                        value={file.loudness.truePeak === 0 ? "--" : `${file.loudness.truePeak.toFixed(1)} dBTP`}
                        isAnalyzing={!file.loadedPhases.includes('loudness')}
                        warningLevel={file.loudness.truePeak > -1.0 ? 'error' : 'success'}
                    />

                </HorizontalRow>

                {/* IAMF Embedded Loudness (Always Visible for IAMF) */}
                {file.iamf && file.iamf.mixPresentation && (
                    <div className={`mt-4 px-3 py-2 rounded border ${file.loudness.integrated === 0 ? 'bg-green-500/10 border-green-500/30' : 'bg-indigo-500/10 border-indigo-500/20'}`}>
                        <div className="flex justify-between items-center mb-1">
                            <span className={`text-[10px] uppercase tracking-wider font-bold ${file.loudness.integrated === 0 ? 'text-green-400' : 'text-indigo-300'}`}>
                                Embedded Metadata (Mix Presentation)
                            </span>
                            {file.loudness.integrated === 0 && <span className="text-[10px] text-green-400 font-bold bg-green-500/20 px-2 rounded">PRIMARY SOURCE</span>}
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <span className="text-xs text-gray-400 block">Loudness</span>
                                <span className="text-sm font-mono text-white">{file.iamf.mixPresentation.loudness ?? '--'} LUFS</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block">True Peak</span>
                                <span className="text-sm font-mono text-white">{file.iamf.mixPresentation.truePeak ?? '--'} dBTP</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-4 pt-4 border-t border-white/5 border-dashed">
                    <HorizontalRow>
                        <DataField
                            label="Clipping Events"
                            value={file.health.clippingCount}
                            isAnalyzing={!file.loadedPhases.includes('health')}
                            warningLevel={file.health.clippingCount > 0 ? 'error' : 'success'}
                        />
                        <DataField
                            label="DC Offset Detected"
                            value={file.health.dcOffsetWarning ? "YES" : "No"}
                            isAnalyzing={!file.loadedPhases.includes('health')}
                            warningLevel={file.health.dcOffsetWarning ? 'warning' : 'success'}
                        />
                        <DataField
                            label="Silent/Empty Streams"
                            value={file.health.emptyStreamWarning ? "Detected" : "None"}
                            isAnalyzing={!file.loadedPhases.includes('health')}
                            warningLevel={file.health.emptyStreamWarning ? 'warning' : 'success'}
                        />
                    </HorizontalRow>
                </div>
            </InspectorCard>

            {/* CARD 3: SPATIAL METADATA */}
            <InspectorCard
                title="Spatial Metadata & Heuristics"
                icon={<Globe className="w-5 h-5 text-indigo-400" />}
                loading={file.isAnalyzing && !file.loadedPhases.includes('spatial') && !file.loadedPhases.includes('spatial-final')}
            >
                {/* RESTORED FIELDS: Format Type & Ordering/Norm (Mapped for IAMF) */}
                <div className="mb-4 p-3 bg-white/5 rounded border border-white/10">
                    <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Spatial Configuration</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="block text-xs text-gray-500 mb-1">Format Type</span>
                            <span className={`text-lg font-mono ${(file.spatial.confidence ?? 0) > 80 || isIAMF ? 'text-green-400' : 'text-yellow-400'}`}>
                                {isIAMF
                                    ? (file.iamf?.audioElements?.some(e => e.type === 'Scene-Based') ? 'AmbiX' : 'Channel-Based')
                                    : (file.spatial.formatPrediction || "Unknown")}
                            </span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 mb-1">Ordering / Norm</span>
                            <span className="text-lg font-mono text-white">
                                {isIAMF
                                    ? "ACN / SN3D" // IAMF standard mapped to user terms
                                    : (file.spatial.normalizationPrediction || "Unknown")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* IAMF Profile Display */}
                {file.iamf && (
                    <div className="mb-4 p-3 bg-indigo-500/10 rounded border border-indigo-500/20">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="block text-xs text-indigo-300 mb-1">IAMF Profile</span>
                                <span className="text-sm font-mono text-white">
                                    {file.iamf.profile}
                                    {file.iamf.additionalProfile && <span className="text-gray-500 ml-2">({file.iamf.additionalProfile})</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <HorizontalRow>
                    <DataField
                        label="Channel Sequence (Heuristic)"
                        value={file.spatial.sequencePrediction || "Unknown"}
                        isAnalyzing={!file.loadedPhases.includes('spatial-final')}
                    />
                </HorizontalRow>

                <div className="mt-4 border-t border-white/10 pt-4">
                    <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3">Container-Specific Fields</h4>
                </div>

                {/* IAMF / OBU Sequences */}
                {file.iamf && (
                    <div className="mt-3 mb-4">
                        <h5 className="text-xs font-bold text-indigo-400 mb-2">IAMF / OBU Sequences</h5>
                        <div className="grid grid-cols-1 gap-2">
                            {file.iamf.audioElements?.map(el => (
                                <div key={el.id} className="bg-white/5 p-2 rounded text-xs flex justify-between">
                                    <span className="text-gray-300">ID {el.id}: {el.type}</span>
                                    {el.normalization && <span className="text-gray-400">{el.normalization}</span>}
                                </div>
                            ))}
                            {(!file.iamf.audioElements || file.iamf.audioElements.length === 0) && (
                                <span className="text-xs text-gray-500 italic">No Audio Element OBUs found</span>
                            )}
                        </div>
                    </div>
                )}

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

import React, { useState } from 'react';
import { FileType } from '../tools/AmbiData/types';
// Note: MediaFile might need to be shared eventually, but importing from AmbiData/types for now is fine since they are compatible
import { Music, Film, ChevronDown, ChevronRight, Play } from 'lucide-react';

interface FileQueueProps {
    files: any[]; // Using any[] to accept both MediaFile and the ad-hoc objects in ToolViews until types are unified
    selectedId: string;
    onSelect: (id: string) => void;
    onPlay?: (id: string, shouldPlay?: boolean) => void;
    onClear: () => void;
    playingFileId?: string | null;
    isPlaying?: boolean;
}

export const FileQueue: React.FC<FileQueueProps> = ({
    files,
    selectedId,
    onSelect,
    onPlay,
    onClear,
    playingFileId,
    isPlaying
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    // If collapsed, we could show just the active one, or nothing. 
    // AmbiData showed selected. Generic queue didn't have collapse.
    // We will show just list container collapse.

    return (
        <div className="bg-[#1E1E1E] rounded-lg border border-studio-border flex flex-col shadow-lg p-2 transition-all duration-300">

            {/* Header */}
            <div className="flex justify-between items-center mb-2 px-2 pt-1 flex-none select-none">
                <div
                    onClick={toggleExpand}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">Queue</h3>

                    {/* Collapsible Arrow (from AmbiData preference) */}
                    <div className="text-gray-500 group-hover:text-gray-300">
                        {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Count (Optional, user didn't explicitly ban it, but said 'no (2)', so maybe hide or keep subtle? User said NO (2). Hidden.) */}

                    <button
                        onClick={(e) => { e.stopPropagation(); onClear(); }}
                        className="text-[10px] text-red-500 hover:text-red-400 font-bold uppercase tracking-wider"
                    >
                        CLEAR
                    </button>
                </div>
            </div>

            {/* List */}
            <div className={`
                overflow-y-auto px-1 custom-scrollbar space-y-1 transition-all duration-300 ease-in-out
                ${isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
            `}>
                {files.map((f, i) => {
                    // Safe accessors for different file object shapes
                    const id = f.id || f.path;
                    const name = f.name;
                    const isSelected = id === selectedId;
                    const isNowPlaying = isPlaying && playingFileId === id;

                    // Determine Type Icon
                    // Check extension/type property
                    const isVideo = f.type === FileType.Video || (f.extension && ['.mp4', '.mov', '.webm'].includes(f.extension)) || (f.path && ['.mp4', '.mov', '.webm'].some(ext => f.path.endsWith(ext)));

                    return (
                        <div
                            key={id || i}
                            onClick={() => onSelect(id)}
                            onDoubleClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (onPlay) onPlay(id, true);
                            }}
                            className={`
                                flex items-center justify-between text-xs py-1.5 px-2 rounded cursor-pointer transition-colors select-none
                                ${isSelected
                                    ? 'bg-blue-900/40 text-blue-200 border border-blue-800/50'
                                    : 'hover:bg-gray-800 text-gray-400 border border-transparent'}
                            `}
                        >
                            <div className="flex items-center gap-2 overflow-hidden">
                                {/* Icon Section */}
                                <div className={`shrink-0 flex items-center justify-center w-4 ${isSelected ? 'text-blue-300' : 'text-gray-500'}`}>
                                    {isNowPlaying ? (
                                        <Play size={12} className="fill-current animate-pulse text-brand-green" />
                                    ) : (
                                        isVideo ? <Film size={12} /> : <Music size={12} />
                                    )}
                                </div>

                                <span className={`truncate font-mono ${isNowPlaying ? 'text-brand-green' : ''}`}>
                                    {name}
                                </span>
                            </div>

                            {/* Size or Status could go here if present in object */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

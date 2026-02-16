import React, { useState } from 'react';
import { MediaFile, FileType } from '../types';
import { Music, Film, ChevronDown, ChevronRight } from './Icons';

interface FileQueueProps {
    files: MediaFile[];
    selectedId: string;
    onSelect: (id: string) => void;
    onClear: () => void;
}

export const FileQueue: React.FC<FileQueueProps> = ({ files, selectedId, onSelect, onClear }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    // If collapsed, show just the selected one, or the top one if nothing selected
    const selectedFile = files.find(f => f.id === selectedId) || files[0];

    const renderItem = (file: MediaFile, isActive: boolean) => (
        <div
            key={file.id}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(file.id);
                if (!isExpanded) setIsExpanded(true);
            }}
            className={`
        flex items-center justify-between px-4 py-2 cursor-pointer border-b border-white/5 last:border-0
        transition-colors duration-150
        ${isActive ? 'bg-white/5 border-l-4 border-l-indigo-400' : 'hover:bg-white/5 border-l-4 border-l-transparent'}
      `}
        >
            <div className="flex items-center overflow-hidden min-w-0 mr-4">
                <div className={`mr-3 shrink-0 ${isActive ? 'text-indigo-400' : 'text-neutral-500'}`}>
                    {file.type === FileType.Audio ? <Music size={16} /> : <Film size={16} />}
                </div>
                <span className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                    {file.name}{file.extension}
                </span>
            </div>

            <span className={`text-xs font-mono ml-2 whitespace-nowrap ${isActive ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {file.size}
            </span>
        </div>
    );

    return (
        <div className="flex flex-col border border-white rounded-md bg-studio-bg-lighter overflow-hidden shadow-sm">
            {/* Header / Toggle */}
            <div
                className="flex items-center justify-between px-3 py-2 bg-studio-bg-lighter cursor-pointer hover:bg-white/5 transition-colors select-none group"
            >
                <div onClick={toggleExpand} className="flex items-center flex-1">
                    <span className="text-xs font-bold text-neutral-400 tracking-wider mr-2">QUEUE {files.length > 0 && `(${files.length})`}</span>
                    {isExpanded ? <ChevronDown size={14} className="text-neutral-400" /> : <ChevronRight size={14} className="text-neutral-400" />}
                </div>

                {/* Clear Button */}
                {files.length > 0 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClear();
                        }}
                        className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-wider px-2 py-1 rounded hover:bg-white/5 transition-colors"
                        title="Clear Queue"
                    >
                        CLEAR
                    </button>
                )}
            </div>

            {/* List Container */}
            <div className={`
        flex flex-col bg-studio-bg-lighter transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-64 overflow-y-auto' : 'max-h-[66px] overflow-hidden'}
      `}>
                {isExpanded ? (
                    files.map(file => renderItem(file, file.id === selectedId))
                ) : (
                    selectedFile ? renderItem(selectedFile, true) : <div className="p-4 text-neutral-500 text-sm">No files in queue</div>
                )}
            </div>
        </div>
    );
};

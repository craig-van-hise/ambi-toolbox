import React, { useState } from 'react';
import { MediaFile, FileType } from '../types';
import { Music, Film, ChevronDown, ChevronRight } from './Icons';

interface FileQueueProps {
    files: MediaFile[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export const FileQueue: React.FC<FileQueueProps> = ({ files, selectedId, onSelect }) => {
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
        flex items-center px-4 py-3 cursor-pointer border-b border-white/5 last:border-0
        transition-colors duration-150
        ${isActive ? 'bg-white/5 border-l-4 border-l-indigo-400' : 'hover:bg-white/5 border-l-4 border-l-transparent'}
      `}
        >
            <div className={`mr-3 ${isActive ? 'text-indigo-400' : 'text-neutral-500'}`}>
                {file.type === FileType.Audio ? <Music size={18} /> : <Film size={18} />}
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                    {file.name}
                </span>
                <span className="text-xs text-neutral-500 font-mono truncate">
                    {file.containerFormat} • {file.size}
                </span>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col border border-white/20 rounded-md bg-studio-bg-lighter overflow-hidden shadow-sm">
            {/* Header / Toggle */}
            <div
                onClick={toggleExpand}
                className="flex items-center justify-between px-3 py-2 bg-studio-bg-lighter cursor-pointer hover:bg-white/5 transition-colors select-none"
            >
                <span className="text-xs font-bold text-neutral-400 tracking-wider">QUEUE {files.length > 0 && `(${files.length})`}</span>
                {isExpanded ? <ChevronDown size={14} className="text-neutral-400" /> : <ChevronRight size={14} className="text-neutral-400" />}
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

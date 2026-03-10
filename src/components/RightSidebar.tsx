import React, { useRef, useEffect } from 'react';
import { ToolDefinition, ToolId } from '../types';
import { useFileQueue } from '../hooks/useFileQueue';
import { useTransport } from '../contexts/TransportContext';
import { SmartDropZone } from './SmartDropZone';
import { FileQueue } from './FileQueue';

interface RightSidebarProps {
    tool: ToolDefinition;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ tool }) => {
    const {
        queue: globalFiles,
        addFiles,
        clearQueue,
        setActiveFile,
        selectedFileId
    } = useFileQueue();

    const {
        isPlaying,
        currentFile: playingFileId,
        setCurrentFile
    } = useTransport();

    // Map global MediaFile[] back to File[] for compatibility
    const files = React.useMemo(() => globalFiles.map(mf => {
        const f = new File([], mf.name + mf.extension);
        Object.defineProperty(f, 'path', { value: mf.id });
        return f;
    }), [globalFiles]);

    const processedFiles = files.map((f, i) => ({
        name: f.name,
        path: (f as any).path || 'Memory File',
        index: i
    }));

    const queueRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (files.length > 0 && queueRef.current) {
            setTimeout(() => {
                queueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [files.length]);

    const dropZoneAllowedExts = (() => {
        switch (tool.id) {
            case ToolId.Ambix2IAMF: return ['.wav'];
            case ToolId.Ambix2APAC: return ['.wav', '.caf'];
            case ToolId.Ambix2Bin:
            case ToolId.AmbiRotate: return ['.wav', '.flac', '.ogg', '.caf'];
            case ToolId.Ambix2Opus: return ['.wav', '.amb', '.caf', '.flac', '.mp3'];
            default: return ['.wav', '.amb', '.caf', '.opus', '.mp3', '.aac', '.flac', '.ogg'];
        }
    })();

    const dropZoneLabel = (() => {
        switch (tool.id) {
            case ToolId.Ambix2IAMF: return ".wav accepted";
            case ToolId.Ambix2APAC: return ".wav, .caf accepted";
            case ToolId.Ambix2Bin:
            case ToolId.AmbiRotate: return ".wav, .flac, .ogg, .caf accepted";
            case ToolId.Ambix2Opus: return ".wav, .amb, .caf, .flac, .mp3 accepted";
            case ToolId.Ambix2Ogg: return ".wav, .amb, .caf, .flac, .mp3, .opus, .ogg accepted";
            default: return ".wav, .amb, .caf, .opus, .mp3, .aac, .flac, .ogg accepted";
        }
    })();

    return (
        <aside
            data-testid="right-sidebar"
            className="w-full h-full bg-[#0c0c0e] border-l border-white flex flex-col overflow-hidden"
        >
            {/* Sticky Drop Zone at top */}
            <div className="shrink-0 p-4 border-b border-white bg-[#0c0c0e]/80 backdrop-blur-sm z-20">
                <div className={`${files.length > 0 ? 'h-24' : 'h-48'} transition-all duration-300`}>
                    <SmartDropZone
                        className="h-full w-full"
                        allowedExtensions={dropZoneAllowedExts}
                        label={dropZoneLabel}
                        compact={files.length > 0}
                        onFilesLoaded={(loadedFiles) => {
                            const processed = loadedFiles.map(f => typeof f === 'string' ? { name: f.split('/').pop() || f, path: f } : f);
                            addFiles(processed as File[]);
                        }}
                        onDrop={(e) => {
                            if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files));
                        }}
                    />
                </div>
            </div>

            {/* Scrollable File Queue */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                {files.length > 0 ? (
                    <div ref={queueRef}>
                        <FileQueue
                            files={processedFiles}
                            selectedId={selectedFileId}
                            onSelect={setActiveFile}
                            onPlay={(id, shouldPlay) => {
                                setActiveFile(id);
                                setCurrentFile(id, shouldPlay ?? true);
                            }}
                            onClear={clearQueue}
                            playingFileId={playingFileId}
                            isPlaying={isPlaying}
                        />
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600 text-center px-4">
                        <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm font-light italic">No files in queue</p>
                        <p className="text-xs mt-2 opacity-50">Drop audio files here to begin</p>
                    </div>
                )}
            </div>
        </aside>
    );
};

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useToolState } from '../../contexts/ToolStateContext';
import { FileQueue } from './components/FileQueue';
import { Inspector } from './components/Inspector';
import { MediaFile, FileType } from './types';
import { SmartDropZone } from '../../components/SmartDropZone';
import { ToolDefinition } from '../../types';

interface AmbiDataToolProps {
    tool: ToolDefinition;
    files: any[];
    isProcessing: boolean;
}

const MIN_HEIGHT_PERCENT = 10;
const MAX_HEIGHT_PERCENT = 90;

// Helper to get nested value for comparison
const getOriginalValue = (file: MediaFile, path: string) => {
    const parts = path.split('.');
    let current: any = file;
    for (const part of parts) {
        if (current === undefined || current === null) return undefined;
        current = current[part];
    }
    return current;
};

export const AmbiDataTool: React.FC<AmbiDataToolProps> = ({ tool }) => {
    // State
    const [topHeightPercent, setTopHeightPercent] = useState(60);
    const [isDragging, setIsDragging] = useState(false);
    const { globalFiles: files, setGlobalFiles: setFiles } = useToolState();
    const [selectedFileId, setSelectedFileId] = useState<string>('');
    const [activeEdits, setActiveEdits] = useState<Record<string, any>>({});

    // Refs for dragging calculation
    const containerRef = useRef<HTMLDivElement>(null);

    // Derived state
    const selectedFile = files.find(f => f.id === selectedFileId);

    // Debug: Log when selectedFile changes
    useEffect(() => {
        if (selectedFile) {
            console.log('[AmbiData] selectedFile updated:', {
                name: selectedFile.name,
                loudness: selectedFile.loudness,
                isAnalyzing: selectedFile.isAnalyzing
            });
        }
    }, [selectedFile]);

    const hasChanges = Object.keys(activeEdits).length > 0;

    // Clear edits when file changes
    useEffect(() => {
        setActiveEdits({});
    }, [selectedFileId]);

    // Auto-select first file if none selected
    useEffect(() => {
        if (!selectedFileId && files.length > 0) {
            setSelectedFileId(files[0].id);
        }
    }, [files.length, selectedFileId]); // Re-run when count changes or selection is cleared

    // Set up IPC progress listener on component mount
    useEffect(() => {
        const unsubscribe = window.electronAPI.on('ambi-data-progress', (data: any) => {
            const { filePath: updatedPath, phase, data: partialData } = data;
            const tReceived = Date.now();
            console.log(`[AmbiData Frontend] [${tReceived}] ⚡ Phase "${phase}" received:`, updatedPath);

            // Force immediate render - prevent React from batching updates
            flushSync(() => {
                setFiles(prev => prev.map(f => {
                    if (f.id === updatedPath) {
                        return {
                            ...f,
                            ...partialData,
                            isAnalyzing: phase !== 'spatial' && phase !== 'spatial-final', // Turn off on spatial or final
                            loadedPhases: [...(f.loadedPhases || []), phase] // Append new phase
                        };
                    }
                    return f;
                }));
            });
        });

        // Cleanup on unmount
        return () => {
            unsubscribe();
        };
    }, []); // Empty deps - run once on mount

    // Handle file drop - Convert paths to MediaFile stub objects
    const handleFilesLoaded = (pathsOrFiles: string[] | File[]) => {
        const newFiles: MediaFile[] = pathsOrFiles.map((item) => {
            const path = typeof item === 'string' ? item : (item as any).path;
            const name = typeof item === 'string' ? path.split('/').pop() || path : item.name;
            const extension = name.includes('.') ? '.' + name.split('.').pop() : '';

            // Determine file type from extension
            const videoExtensions = ['.mp4', '.mov', '.webm', '.mkv', '.avi', '.m4v', '.aivu'];
            const type = videoExtensions.includes(extension.toLowerCase()) ? FileType.Video : FileType.Audio;

            return {
                id: path, // Use full path as unique ID
                name: name.replace(extension, ''),
                extension,
                path,
                type,
                // Stub values - Phase 3 will populate these from backend
                size: 'Analyzing...',
                containerFormat: 'Unknown',
                duration: '--:--',
                bitRate: '--',
                audio: {
                    codec: 'Unknown',
                    sampleRate: 0,
                    bitDepth: 0,
                    channelCount: 0,
                    ambisonicOrder: 0
                },
                loudness: {
                    integrated: 0,
                    range: 0,
                    truePeak: 0
                },
                health: {
                    clippingCount: 0,
                    dcOffsetWarning: false,
                    emptyStreamWarning: false
                },
                spatial: {
                    formatPrediction: 'Unknown',
                    normalizationPrediction: 'Unknown',
                    hasAmbisonicGUID: false,
                    bextDescription: undefined,
                    channelMappingFamily: undefined,
                    headerGain: undefined,
                    coreAudioLayoutTag: undefined,
                    hasSA3DAtom: false
                },
                isAnalyzing: true, // Start in analyzing state
                loadedPhases: [] // Start with no phases loaded
            };
        });

        // Add new files to state (avoid duplicates)
        setFiles(prev => {
            const existingIds = new Set(prev.map(f => f.id));
            const uniqueNewFiles = newFiles.filter(f => !existingIds.has(f.id));
            return [...prev, ...uniqueNewFiles];
        });


        // Auto-select the first file if none selected
        if (!selectedFileId && newFiles.length > 0) {
            setSelectedFileId(newFiles[0].id);
        }

        // Trigger backend analysis for each file
        newFiles.forEach(async (file) => {
            try {
                // Initial analysis defaults to stream 0
                const result = await window.electronAPI.analyzeAmbiFile(file.path, { streamIndex: 0 });

                // Final update with complete data (in case progress events were missed)
                setFiles(prev => prev.map(f =>
                    f.id === file.id ? {
                        ...f,
                        ...result,
                        isAnalyzing: false,
                        selectedStreamIndex: 0 // Initialize to 0
                    } : f
                ));
            } catch (error) {
                console.error(`Failed to analyze ${file.path}:`, error);
                // Mark as not analyzing even on error
                setFiles(prev => prev.map(f =>
                    f.id === file.id ? { ...f, isAnalyzing: false } : f
                ));
            }
        });
    };

    // Handle Stream Selection (Adaptive UI)
    const handleStreamSelect = async (fileId: string, streamIndex: number) => {
        const file = files.find(f => f.id === fileId);
        if (!file) return;

        console.log(`[AmbiData] Switching to stream ${streamIndex} for ${file.name}`);

        // PRP #86: IAMF Guardrail - Skip Backend Analysis
        // Identity check: If IAMF, we strictly update state and RETURN.
        // We do NOT trigger re-analysis because OBU metadata is already parsed.
        if (file.extension.toLowerCase() === '.iamf') {
            setFiles(prev => prev.map(f =>
                f.id === fileId ? { ...f, selectedStreamIndex: streamIndex } : f
            ));
            return;
        }

        // 1. Optimistically update selected index
        setFiles(prev => prev.map(f =>
            f.id === fileId ? { ...f, selectedStreamIndex: streamIndex, isAnalyzing: true, loadedPhases: [] } : f
        ));

        // 2. Trigger backend re-analysis with new stream index
        try {
            // We don't wait for result to update state here because we listen to 'ambi-data-progress'
            // But we do need to catch errors
            await window.electronAPI.analyzeAmbiFile(file.path, { streamIndex });
        } catch (error) {
            console.error(`Failed to re-analyze stream ${streamIndex}:`, error);
            setFiles(prev => prev.map(f =>
                f.id === fileId ? { ...f, isAnalyzing: false } : f
            ));
        }
    };


    // Handle Edit Logic
    const handleEdit = (path: string, newValue: any) => {
        if (!selectedFile) return;

        const originalValue = getOriginalValue(selectedFile, path);

        if (newValue === originalValue || (originalValue === undefined && newValue === "")) {
            const newEdits = { ...activeEdits };
            delete newEdits[path];
            setActiveEdits(newEdits);
        } else {
            setActiveEdits(prev => ({ ...prev, [path]: newValue }));
        }
    };

    // Apply Changes Handler (Phase 6)
    const handleApplyChanges = () => {
        console.log('Applying changes:', activeEdits);
        // Phase 6: IPC call to backend
    };


    // Drag Handlers for Resizable Divider
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const relativeY = e.clientY - containerRect.top;
        const newPercent = (relativeY / containerRect.height) * 100;

        const clampedPercent = Math.max(MIN_HEIGHT_PERCENT, Math.min(newPercent, MAX_HEIGHT_PERCENT));
        setTopHeightPercent(clampedPercent);
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Global event listeners for drag
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'row-resize';
            document.body.style.userSelect = 'none';
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#18181b]">
            {/* Main Split Container */}
            <div
                ref={containerRef}
                className="flex-1 flex flex-col relative overflow-hidden"
            >
                {/* UPPER PARTITION */}
                <div
                    style={{ height: `${topHeightPercent}%` }}
                    className="w-full flex flex-col bg-studio-bg min-h-0 relative"
                >
                    <div className="flex-1 overflow-y-auto pt-8 pb-4 flex flex-col relative">
                        {/* TOOL HEADER */}
                        <div className="px-8 mb-6 flex-none">
                            <header>
                                <h2 className={`text-3xl font-bold mb-2 ${tool.colorClass}`}>
                                    {tool.label}
                                </h2>
                                <p className="text-gray-400 text-lg font-light">
                                    {tool.description}
                                </p>
                            </header>
                        </div>

                        {/* INPUT SECTION */}
                        <div className="px-8 flex-none flex flex-col gap-4 relative z-10">
                            <div className={`${files.length > 0 ? 'h-20' : 'h-48'} ${isDragging ? '' : 'transition-all duration-300'}`}>
                                <SmartDropZone
                                    onFilesLoaded={handleFilesLoaded}
                                    allowedExtensions={['.wav', '.amb', '.opus', '.ogg', '.mp4', '.mov', '.m4a', '.caf', '.webm', '.mkv', '.iamf', '.aivu']}
                                    label=".wav, .iamf, .aivu, .amb, .opus, .ogg, .mp4, .mov ... accepted"
                                    compact={files.length > 0}
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="mt-0">
                                <FileQueue
                                    files={files}
                                    selectedId={selectedFileId}
                                    onSelect={setSelectedFileId}
                                    onClear={() => {
                                        setFiles([]);
                                        setSelectedFileId('');
                                    }}
                                />
                            </div>
                        </div>

                        {/* Spacer for bottom scrolling */}
                        <div className="h-8 flex-none"></div>
                    </div>
                </div>

                {/* DRAGGABLE DIVIDER */}
                <div
                    onMouseDown={handleMouseDown}
                    className="h-0 w-full border-t border-studio-border relative z-50 group hover:border-indigo-500/50 transition-colors cursor-row-resize shrink-0"
                >
                    {/* Invisible Hit Area */}
                    <div className="absolute top-[-6px] bottom-[-6px] left-0 right-0 z-50 cursor-row-resize"></div>
                </div>

                {/* LOWER PARTITION */}
                <div
                    style={{ height: `${100 - topHeightPercent}%` }}
                    className="w-full bg-[#18181b] flex flex-col min-h-0 relative"
                >
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-hidden relative">
                        <Inspector
                            file={selectedFile}
                            activeEdits={activeEdits}
                            onEdit={handleEdit}
                            onStreamSelect={handleStreamSelect}
                        />
                    </div>

                    {/* Persistent Action Bar */}
                    <div className="flex-none p-4 bg-[#18181b] border-t border-white/10 z-30">
                        <button
                            disabled={!hasChanges}
                            onClick={handleApplyChanges}
                            className={`
                w-full py-3 font-bold text-sm uppercase tracking-wider rounded shadow-lg transition-all transform
                ${hasChanges
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 active:scale-[0.99] cursor-pointer'
                                    : 'bg-white/5 text-neutral-500 cursor-not-allowed opacity-50'
                                }
              `}
                        >
                            Apply Changes {hasChanges && `(${Object.keys(activeEdits).length})`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

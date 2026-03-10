import React, { useState, useRef, useCallback, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useToolState } from '../../contexts/ToolStateContext';
import { FileQueue } from '../../components/FileQueue';
import { Inspector } from './components/Inspector';
import { MediaFile, FileType } from './types';
import { SmartDropZone } from '../../components/SmartDropZone';
import { ToolDefinition } from '../../types';
import { useTransport } from '../../contexts/TransportContext';
import { useAudioEngine } from '../../contexts/AudioEngineContext';
import { Transport } from '../../components/Transport';

interface AmbiDataToolProps {
    tool: ToolDefinition;
    files: MediaFile[];
    isProcessing: boolean;
}

const MIN_HEIGHT_PERCENT = 10;
const MAX_HEIGHT_PERCENT = 90;

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
    const [topHeightPercent, setTopHeightPercent] = useState(60);
    const [isDragging, setIsDragging] = useState(false);
    const { globalFiles: files, setGlobalFiles: setFiles, selectedFileId, setSelectedFileId } = useToolState();

    const {
        isPlaying,
        currentFile: playingFileId,
        setCurrentFile
    } = useTransport();

    // Engine state is handled internally by Transport
    useAudioEngine();

    const [activeEdits, setActiveEdits] = useState<Record<string, any>>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedFile = files.find(f => f.id === selectedFileId);

    useEffect(() => {
        if (!selectedFileId && files.length > 0) {
            setSelectedFileId(files[0].id);
        }
    }, [files.length, selectedFileId, setSelectedFileId]);

    useEffect(() => {
        const unsubscribe = window.electronAPI.on('ambi-data-progress', (data: any) => {
            const { filePath: updatedPath, phase, data: partialData } = data;
            flushSync(() => {
                setFiles(prev => prev.map(f => {
                    if (f.id === updatedPath) {
                        return {
                            ...f,
                            ...partialData,
                            isAnalyzing: phase !== 'spatial' && phase !== 'spatial-final',
                            loadedPhases: [...(f.loadedPhases || []), phase]
                        };
                    }
                    return f;
                }));
            });
        });
        return () => unsubscribe();
    }, [setFiles]);

    const handleFilesLoaded = (pathsOrFiles: string[] | File[]) => {
        const newFiles: MediaFile[] = pathsOrFiles.map((item) => {
            const path = typeof item === 'string' ? item : (item as any).path;
            const name = typeof item === 'string' ? path.split('/').pop() || path : item.name;
            const extension = name.includes('.') ? '.' + name.split('.').pop() : '';
            const videoExtensions = ['.mp4', '.mov', '.webm', '.mkv', '.avi', '.m4v', '.aivu'];
            const type = videoExtensions.includes(extension.toLowerCase()) ? FileType.Video : FileType.Audio;

            return {
                id: path,
                name: name.replace(extension, ''),
                extension,
                path,
                type,
                size: 'Analyzing...',
                containerFormat: 'Unknown',
                duration: '--:--',
                bitRate: '--',
                audio: { codec: 'Unknown', sampleRate: 0, bitDepth: 0, channelCount: 0, ambisonicOrder: 0 },
                loudness: { integrated: 0, range: 0, truePeak: 0 },
                health: { clippingCount: 0, dcOffsetWarning: false, emptyStreamWarning: false },
                spatial: {
                    formatPrediction: 'Unknown',
                    normalizationPrediction: 'Unknown',
                    hasAmbisonicGUID: false,
                    hasSA3DAtom: false
                },
                isAnalyzing: true,
                loadedPhases: []
            };
        });

        setFiles(prev => {
            const existingIds = new Set(prev.map(f => f.id));
            const uniqueNewFiles = newFiles.filter(f => !existingIds.has(f.id));
            return [...prev, ...uniqueNewFiles];
        });

        if (newFiles.length > 0) setSelectedFileId(newFiles[0].id);

        newFiles.forEach(async (file) => {
            try {
                const result = await window.electronAPI.analyzeAmbiFile(file.path, { streamIndex: 0 });
                setFiles(prev => prev.map(f =>
                    f.id === file.id ? { ...f, ...result, isAnalyzing: false, selectedStreamIndex: 0 } : f
                ));
            } catch (error) {
                console.error(`Failed to analyze ${file.path}:`, error);
                setFiles(prev => prev.map(f => f.id === file.id ? { ...f, isAnalyzing: false } : f));
            }
        });
    };

    const handleStreamSelect = async (fileId: string, streamIndex: number) => {
        const file = files.find(f => f.id === fileId);
        if (!file) return;

        if (file.extension.toLowerCase() === '.iamf') {
            setFiles(prev => prev.map(f => f.id === fileId ? { ...f, selectedStreamIndex: streamIndex } : f));
            return;
        }

        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, selectedStreamIndex: streamIndex, isAnalyzing: true, loadedPhases: [] } : f));

        try {
            await window.electronAPI.analyzeAmbiFile(file.path, { streamIndex });
        } catch (error) {
            console.error(`Failed to re-analyze stream ${streamIndex}:`, error);
            setFiles(prev => prev.map(f => f.id === fileId ? { ...f, isAnalyzing: false } : f));
        }
    };

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

    const handleApplyChanges = () => {
        console.log('Applying changes:', activeEdits);
    };

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const relativeY = e.clientY - containerRect.top;
        const newPercent = (relativeY / containerRect.height) * 100;
        setTopHeightPercent(Math.max(MIN_HEIGHT_PERCENT, Math.min(newPercent, MAX_HEIGHT_PERCENT)));
    }, [isDragging]);

    const handleMouseUp = useCallback(() => setIsDragging(false), []);

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

    const currentIndex = files.findIndex(f => f.id === selectedFileId);
    const canNext = currentIndex >= 0 && currentIndex < files.length - 1;
    const canPrev = currentIndex > 0;

    const handleNext = () => {
        if (canNext) {
            const nextId = files[currentIndex + 1].id;
            setSelectedFileId(nextId);
            setCurrentFile(nextId, true);
        }
    };

    const handlePrev = () => {
        if (canPrev) {
            const prevId = files[currentIndex - 1].id;
            setSelectedFileId(prevId);
            setCurrentFile(prevId, true);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#18181b]">
            <div ref={containerRef} className="flex-1 flex flex-col relative overflow-hidden">
                <div style={{ height: `${topHeightPercent}%` }} className="w-full flex flex-col bg-studio-bg min-h-0 relative">
                    <div className="flex-1 overflow-y-auto pt-8 pb-4 flex flex-col relative">
                        <div className="px-8 mb-6 flex-none">
                            <header>
                                <h2 className={`text-3xl font-bold mb-2 ${tool.colorClass}`}>{tool.label}</h2>
                                <p className="text-gray-400 text-lg font-light">{tool.description}</p>
                            </header>
                        </div>
                        <div className="px-8 flex-none flex flex-col gap-4 relative z-10">
                            <div className={`${files.length > 0 ? 'h-20' : 'h-48'} transition-all duration-300`}>
                                <SmartDropZone
                                    onFilesLoaded={handleFilesLoaded}
                                    allowedExtensions={['.wav', '.amb', '.opus', '.ogg', '.mp4', '.mov', '.m4a', '.caf', '.webm', '.mkv', '.iamf', '.aivu']}
                                    label=".wav, .iamf, .aivu, .amb, .opus, .ogg ... accepted"
                                    compact={files.length > 0}
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="mt-0">
                                <FileQueue
                                    files={files as any}
                                    selectedId={selectedFileId}
                                    onSelect={setSelectedFileId}
                                    onPlay={(id, shouldPlay) => {
                                        setSelectedFileId(id);
                                        setCurrentFile(id, shouldPlay ?? true);
                                    }}
                                    onClear={() => {
                                        setFiles([]);
                                        setSelectedFileId('');
                                    }}
                                    playingFileId={playingFileId}
                                    isPlaying={isPlaying}
                                />
                            </div>
                            {files.length > 0 && (
                                <Transport
                                    onNext={handleNext}
                                    onPrev={handlePrev}
                                    canNext={canNext}
                                    canPrev={canPrev}
                                />
                            )}
                        </div>
                        <div className="h-8 flex-none"></div>
                    </div>
                </div>
                <div onMouseDown={handleMouseDown} className="h-0 w-full border-t border-studio-border relative group hover:border-indigo-500/50 transition-colors cursor-row-resize shrink-0">
                    <div className="absolute top-[-6px] bottom-[-6px] left-0 right-0 z-10 cursor-row-resize"></div>
                </div>
                <div style={{ height: `${100 - topHeightPercent}%` }} className="w-full bg-[#18181b] flex flex-col min-h-0 relative">
                    <div className="flex-1 overflow-hidden relative">
                        <Inspector
                            file={selectedFile}
                            activeEdits={activeEdits}
                            onEdit={handleEdit}
                            onStreamSelect={handleStreamSelect}
                        />
                    </div>
                    <div className="flex-none p-4 bg-[#18181b] border-t border-white/10 z-30">
                        <button
                            disabled={Object.keys(activeEdits).length === 0}
                            onClick={handleApplyChanges}
                            className={`w-full py-3 font-bold text-sm uppercase tracking-wider rounded shadow-lg transition-all transform ${Object.keys(activeEdits).length > 0 ? 'bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 active:scale-[0.99] cursor-pointer' : 'bg-white/5 text-neutral-500 cursor-not-allowed opacity-50'}`}
                        >
                            Apply Changes {Object.keys(activeEdits).length > 0 && `(${Object.keys(activeEdits).length})`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

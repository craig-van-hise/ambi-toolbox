import { useEffect } from 'react';
import { useToolState } from '../contexts/ToolStateContext';
import { MediaFile, FileType } from '../tools/AmbiData/types';

export const useFileQueue = () => {
    const { globalFiles, setGlobalFiles, selectedFileId, setSelectedFileId } = useToolState();
    const activeFile = globalFiles.find(f => f.id === selectedFileId) || null;

    useEffect(() => {
        // If we have files in the queue, but no active file is selected, select the first one.
        if (globalFiles.length > 0 && !selectedFileId) {
            setSelectedFileId(globalFiles[0].id);
        }
    }, [globalFiles, selectedFileId, setSelectedFileId]);

    const addFiles = (newFiles: File[]) => {
        const newMediaFiles: MediaFile[] = newFiles.map((f: File) => {
            const path = (f as any).path;
            const name = f.name;
            const extension = name.includes('.') ? '.' + name.split('.').pop() : '';

            const videoExtensions = ['.mp4', '.mov', '.webm', '.mkv', '.avi', '.m4v', '.aivu'];
            const type = videoExtensions.includes(extension.toLowerCase()) ? FileType.Video : FileType.Audio;

            return {
                id: path,
                name: name.replace(extension, ''),
                extension,
                path,
                type,
                size: 'Pending...',
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
                isAnalyzing: false,
                loadedPhases: []
            };
        });

        setGlobalFiles(prev => {
            const existingIds = new Set(prev.map(f => f.id));
            const uniqueNewFiles = newMediaFiles.filter(f => !existingIds.has(f.id));
            return [...prev, ...uniqueNewFiles];
        });
    };

    const removeFile = (id: string) => {
        setGlobalFiles(prev => prev.filter(f => f.id !== id));
        if (selectedFileId === id) {
            setSelectedFileId('');
        }
    };

    const clearQueue = () => {
        setGlobalFiles([]);
        setSelectedFileId('');
    };

    const setActiveFile = (id: string) => {
        setSelectedFileId(id);
    };


    return {
        queue: globalFiles,
        activeFile,
        addFiles,
        removeFile,
        clearQueue,
        setActiveFile,
        selectedFileId
    };
};

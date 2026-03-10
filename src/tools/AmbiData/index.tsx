import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { flushSync } from 'react-dom';
import { useToolState } from '../../contexts/ToolStateContext';
import { Inspector } from './components/Inspector';
import { MediaFile } from './types';
import { ToolDefinition } from '../../types';

interface AmbiDataToolProps {
    tool: ToolDefinition;
}

export interface AmbiDataHandle {
    applyChanges: () => void;
}

const getOriginalValue = (file: MediaFile, path: string) => {
    const parts = path.split('.');
    let current: any = file;
    for (const part of parts) {
        if (current === undefined || current === null) return undefined;
        current = current[part];
    }
    return current;
};

export const AmbiDataTool = forwardRef<AmbiDataHandle, AmbiDataToolProps>((_props, ref) => {
    const { globalFiles: files, setGlobalFiles: setFiles, selectedFileId, setSelectedFileId } = useToolState();

    const [activeEdits, setActiveEdits] = useState<Record<string, any>>({});
    const selectedFile = files.find(f => f.id === selectedFileId);

    useImperativeHandle(ref, () => ({
        applyChanges: handleApplyChanges
    }));

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
        console.log('Applying changes from handle:', activeEdits);
    };


    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <Inspector
                file={selectedFile}
                activeEdits={activeEdits}
                onEdit={handleEdit}
                onStreamSelect={handleStreamSelect}
            />
        </div>
    );
});

AmbiDataTool.displayName = 'AmbiDataTool';

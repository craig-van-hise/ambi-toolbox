import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';

const DEFAULT_EXTENSIONS = ['.wav', '.amb', '.caf', '.opus', '.mp3', '.aac', '.flac', '.ogg'];

interface SmartDropZoneProps {
    /** Compatible legacy handler (raw event) */
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
    /** Modern handler receiving resolved file paths or File objects */
    onFilesLoaded?: (files: string[] | File[]) => void;
    /** List of allowed extensions (lowercase, with dot). Defaults to audio formats. */
    allowedExtensions?: string[];
    /** Optional. Override specific label text (e.g. "WAV (PCM) Only"). */
    label?: string;
    children?: React.ReactNode;
    className?: string;
    compact?: boolean;
}

export const SmartDropZone: React.FC<SmartDropZoneProps> = ({
    onDrop,
    onFilesLoaded,
    allowedExtensions = DEFAULT_EXTENSIONS,
    label,
    children,
    className = '',
    compact = false
}) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const isValidExtension = (filename: string) => {
        const ext = '.' + filename.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(ext);
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        // Priority 1: Modern Handler (Smart Logic)
        if (onFilesLoaded && window.electronAPI && window.electronAPI.expandPaths) {
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                // Collect raw paths
                const rawPaths = Array.from(e.dataTransfer.files).map((f: any) => f.path); // 'path' exists on Electron File object

                try {
                    // Expand directories
                    const ExpandedPaths = await window.electronAPI.expandPaths(rawPaths);

                    // Filter by extension
                    const validFiles = ExpandedPaths.filter(p => isValidExtension(p));

                    if (validFiles.length > 0) {
                        onFilesLoaded(validFiles);
                    }
                } catch (error) {
                    console.error("SmartDropZone: Failed to expand paths", error);
                }
            }
            return;
        }

        // Priority 2: Legacy Handler
        if (onDrop) {
            onDrop(e);
        }
    }, [onDrop, onFilesLoaded, allowedExtensions]);

    const handleClick = useCallback(async () => {
        if (onFilesLoaded && window.electronAPI && window.electronAPI.selectFiles) {
            try {
                const selectedPaths = await window.electronAPI.selectFiles();
                if (selectedPaths && selectedPaths.length > 0) {
                    // Filter just in case, though dialog often handles it
                    const validFiles = selectedPaths.filter(p => isValidExtension(p));
                    if (validFiles.length > 0) {
                        onFilesLoaded(validFiles);
                    }
                }
            } catch (error) {
                console.error("SmartDropZone: Failed to select files", error);
            }
        }
    }, [onFilesLoaded, allowedExtensions]);

    // Styles reused from DropZone.tsx for consistency
    const containerClasses = `
    border-2 border-dashed rounded-lg
    flex flex-col items-center justify-center text-center
    transition-all duration-300 cursor-pointer
    group
    ${isDragOver
            ? 'border-studio-text bg-[#2A2A2B]'
            : 'border-studio-border hover:border-studio-text hover:bg-[#2A2A2B]'}
    ${compact ? 'h-20 p-0' : 'p-4 h-full'}
    overflow-hidden
    ${className}
  `;

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={containerClasses}
        >
            {children ? children : (
                <div className={`flex flex-col items-center justify-center transition-all ${compact ? 'gap-0' : 'gap-3'}`}>
                    <div className={`p-2 bg-[#1E1E1E] rounded-full transition-transform ${isDragOver ? 'scale-110' : 'group-hover:scale-110'} ${compact ? 'p-1.5' : 'p-3 mb-1'}`}>
                        <Upload className={`${compact ? 'w-5 h-5' : 'w-6 h-6'} ${isDragOver ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    {!compact && (
                        <>
                            <p className="text-sm font-medium text-studio-text transition-opacity duration-200">
                                {isDragOver ? 'Drop Files Now' : 'Drag Audio Files or Click to Browse'}
                            </p>
                            <p className="text-xs text-gray-500 mt-2 transition-opacity duration-200">
                                {label || `${allowedExtensions.slice(0, 4).join(', ')} supported`}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

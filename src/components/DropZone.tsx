import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  compact?: boolean;
  onFilesDropped?: (files: File[]) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ compact = false, onFilesDropped }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      // Filter for valid extensions here if needed, or let parent handle it
      onFilesDropped?.(droppedFiles);
    }
  }, [onFilesDropped]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg
        flex flex-col items-center justify-center text-center
        transition-colors duration-200 cursor-pointer
        group
        ${isDragOver
          ? 'border-studio-text bg-[#2A2A2B]'
          : 'border-studio-border hover:border-studio-text hover:bg-[#2A2A2B]'}
        ${compact ? 'p-4 h-32' : 'p-12 h-64'}
      `}
    >
      <div className={`p-3 bg-[#1E1E1E] rounded-full mb-3 transition-transform ${isDragOver ? 'scale-110' : 'group-hover:scale-110'}`}>
        <Upload className={`w-6 h-6 ${isDragOver ? 'text-white' : 'text-gray-400'}`} />
      </div>
      <p className="text-sm font-medium text-studio-text">
        {isDragOver ? 'Drop Files Now' : 'Drag Audio Files Here'}
      </p>
      {!compact && (
        <p className="text-xs text-gray-500 mt-2">
          Universal media ingest (+ proprietary) supported
        </p>
      )}
    </div>
  );
};
import React from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  compact?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ compact = false }) => {
  return (
    <div
      className={`
        border-2 border-dashed border-studio-border rounded-lg
        flex flex-col items-center justify-center text-center
        transition-colors duration-200 hover:border-studio-text hover:bg-[#2A2A2B] cursor-pointer
        group
        ${compact ? 'p-4 h-32' : 'p-12 h-64'}
      `}
    >
      <div className="p-3 bg-[#1E1E1E] rounded-full mb-3 group-hover:scale-110 transition-transform">
        <Upload className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-sm font-medium text-studio-text">
        Drag Audio Files Here
      </p>
      {!compact && (
        <p className="text-xs text-gray-500 mt-2">
          .wav, .amb, .caf supported
        </p>
      )}
    </div>
  );
};
import React, { createContext, useContext, useState } from 'react';
import { MediaFile } from '../tools/AmbiData/types';

interface ToolStateContextType {
    globalFiles: MediaFile[];
    setGlobalFiles: React.Dispatch<React.SetStateAction<MediaFile[]>>;
    selectedFileId: string;
    setSelectedFileId: (id: string) => void;
}

const ToolStateContext = createContext<ToolStateContextType | undefined>(undefined);

export const ToolStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [globalFiles, setGlobalFiles] = useState<MediaFile[]>([]);
    const [selectedFileId, setSelectedFileId] = useState<string>('');

    return (
        <ToolStateContext.Provider value={{ globalFiles, setGlobalFiles, selectedFileId, setSelectedFileId }}>
            {children}
        </ToolStateContext.Provider>
    );
};

export const useToolState = () => {
    const context = useContext(ToolStateContext);
    if (!context) {
        throw new Error('useToolState must be used within a ToolStateProvider');
    }
    return context;
};

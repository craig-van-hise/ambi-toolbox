import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';

enum BitrateOption {
    Low = 'Moderate (64 kbps)',
    Medium = 'Standard (128 kbps)',
    High = 'Ultra (256 kbps)'
}

interface Ambix2OggViewProps {
    tool: ToolDefinition;
    files: File[];
}

export const Ambix2OggView: React.FC<Ambix2OggViewProps> = ({ tool, files }) => {
    const { settings, updateSettings } = useSettings();
    const [bitrate, setBitrate] = useState<BitrateOption>(() => {
        return settings.toolSettings?.[tool.id]?.bitrate || BitrateOption.High;
    });

    const isPassthrough = useMemo(() => {
        if (files.length === 0) return false;
        const name = files[0].name.toLowerCase();
        return name.endsWith('.ogg') || name.endsWith('.opus');
    }, [files]);

    const handleBitrateChange = (val: BitrateOption) => {
        setBitrate(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], bitrate: val }
            }
        });
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 mb-4">
                <div className={`w-full ${isPassthrough ? 'opacity-40 pointer-events-none' : ''}`}>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Conversion Quality</label>
                    <div className="relative">
                        <select
                            value={bitrate}
                            onChange={(e) => handleBitrateChange(e.target.value as BitrateOption)}
                            className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-teal-500 appearance-none text-white"
                        >
                            {Object.values(BitrateOption).map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                    {isPassthrough && (
                        <p className="text-[10px] text-teal-400 mt-1 font-mono">
                            * Source is already Opus/Ogg. Stream copy enabled (Lossless).
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

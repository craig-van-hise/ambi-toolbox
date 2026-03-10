import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition, BitrateOption } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';
import { BITRATE_OPTIONS } from '../../constants';

interface BitrateConverterViewProps {
    tool: ToolDefinition;
}

export const BitrateConverterView: React.FC<BitrateConverterViewProps> = ({ tool }) => {
    const { settings, updateSettings } = useSettings();
    const [bitrate, setBitrate] = useState<string>(() => {
        return settings.toolSettings?.[tool.id]?.bitrate || BitrateOption.High;
    });

    const handleBitrateChange = (val: string) => {
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
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">TARGET BITRATE (PER CHANNEL)</label>
                    <div className="relative">
                        <select
                            value={bitrate}
                            onChange={(e) => handleBitrateChange(e.target.value)}
                            className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 appearance-none text-white"
                        >
                            {BITRATE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

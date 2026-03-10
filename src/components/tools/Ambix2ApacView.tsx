import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';

interface Ambix2ApacViewProps {
    tool: ToolDefinition;
}

export const Ambix2ApacView: React.FC<Ambix2ApacViewProps> = ({ tool }) => {
    const { settings, updateSettings } = useSettings();
    const [bitrate, setBitrate] = useState<string>(() => {
        return settings.toolSettings?.[tool.id]?.bitrate || '96000';
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

    const options = [
        { label: 'Low (64 kbps/ch)', value: '64000' },
        { label: 'Medium (96 kbps/ch)', value: '96000' },
        { label: 'High (128 kbps/ch)', value: '128000' },
        { label: 'Pro (192 kbps/ch)', value: '192000' },
        { label: 'Archival (256 kbps/ch)', value: '256000' }
    ];

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 mb-4">
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">TARGET BITRATE (PER CHANNEL)</label>
                    <div className="relative">
                        <select
                            value={bitrate}
                            onChange={(e) => handleBitrateChange(e.target.value)}
                            className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 appearance-none text-white"
                        >
                            {options.map((opt) => (
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

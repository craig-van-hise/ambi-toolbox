import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition, BitrateOption } from '../../types';
import { BITRATE_OPTIONS } from '../../constants';
import { useSettings } from '../../contexts/SettingsContext';

interface BitrateConverterViewProps {
    tool: ToolDefinition;
    onRun: (opts: any) => void;
    isProcessing: boolean;
}

export const BitrateConverterView: React.FC<BitrateConverterViewProps> = ({ tool, onRun, isProcessing }) => {
    const { settings, updateSettings } = useSettings();
    const [bitrate, setBitrate] = useState<BitrateOption>(() => {
        return settings.toolSettings?.[tool.id]?.bitrate || BitrateOption.High;
    });

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
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Target Bitrate (per channel)</label>
                    <div className="relative">
                        <select
                            value={bitrate}
                            onChange={(e) => handleBitrateChange(e.target.value as BitrateOption)}
                            className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none text-white"
                        >
                            {BITRATE_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                </div>

                <button
                    onClick={() => onRun({ bitrate })}
                    disabled={isProcessing}
                    className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
                >
                    {isProcessing ? 'Converting...' : 'Convert'}
                </button>
            </div>
        </div>
    );
};

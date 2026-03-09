import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition, BitrateOption } from '../../types';
import { BITRATE_OPTIONS } from '../../constants';
import { useSettings } from '../../contexts/SettingsContext';

interface Ambix2OggViewProps {
    tool: ToolDefinition;
    files: File[];
    onRun: (opts: any) => void;
    isProcessing: boolean;
}

export const Ambix2OggView: React.FC<Ambix2OggViewProps> = ({ tool, files, onRun, isProcessing }) => {
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

    const [isPassthrough, setIsPassthrough] = useState(false);

    useEffect(() => {
        if (files.length > 0) {
            const hasOpus = files.some(f => f.name.toLowerCase().endsWith('.opus') || f.name.toLowerCase().endsWith('.ogg'));
            setIsPassthrough(hasOpus);
        } else {
            setIsPassthrough(false);
        }
    }, [files]);

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 mb-4">
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                        {isPassthrough ? 'Target Bitrate (Passthrough Active)' : 'Target Bitrate (per channel)'}
                    </label>
                    <div className="relative">
                        <select
                            value={bitrate}
                            onChange={(e) => handleBitrateChange(e.target.value as BitrateOption)}
                            disabled={isPassthrough}
                            className={`w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-teal-500 appearance-none text-white transition-opacity ${isPassthrough ? 'opacity-50 cursor-not-allowed text-gray-500' : ''}`}
                        >
                            {BITRATE_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        {!isPassthrough && <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />}
                    </div>
                    {isPassthrough && (
                        <p className="text-[10px] text-teal-400 mt-1 font-mono">
                            * Source is already Opus/Ogg. Stream copy enabled (Lossless).
                        </p>
                    )}
                </div>

                <button
                    onClick={() => onRun({ bitrate: isPassthrough ? null : bitrate })}
                    disabled={isProcessing}
                    className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
                >
                    {isProcessing ? 'Processing...' : (isPassthrough ? 'Wrap to Ogg' : 'Convert to Ogg')}
                </button>
            </div>
        </div>
    );
};

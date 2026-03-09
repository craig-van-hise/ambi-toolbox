import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';

interface Ambix2CafViewProps {
    tool: ToolDefinition;
    onRun: (opts: any) => void;
    isProcessing: boolean;
}

export const Ambix2CafView: React.FC<Ambix2CafViewProps> = ({ tool, onRun, isProcessing }) => {
    const { settings, updateSettings } = useSettings();
    const [layout, setLayout] = useState(() => {
        return settings.toolSettings?.[tool.id]?.layout || 'discrete';
    });
    const [bitDepth, setBitDepth] = useState(() => {
        return settings.toolSettings?.[tool.id]?.bitDepth || '24';
    });

    const handleLayoutChange = (val: string) => {
        setLayout(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], layout: val }
            }
        });
    };

    const handleBitDepthChange = (val: string) => {
        setBitDepth(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], bitDepth: val }
            }
        });
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Layout Tag</label>
                <div className="relative">
                    <select
                        value={layout}
                        onChange={(e) => handleLayoutChange(e.target.value)}
                        className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-500 appearance-none text-white"
                    >
                        <option value="discrete">Discrete (Default)</option>
                        <option value="hoa">HOA ACN SN3D</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
            </div>

            <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Bit Depth</label>
                <div className="relative">
                    <select
                        value={bitDepth}
                        onChange={(e) => handleBitDepthChange(e.target.value)}
                        className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-500 appearance-none text-white"
                    >
                        <option value="24">24-bit</option>
                        <option value="32">32-bit</option>
                        <option value="16">16-bit</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
            </div>

            <button
                onClick={() => onRun({ layout, bitDepth })}
                disabled={isProcessing}
                className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
            >
                {isProcessing ? 'Converting...' : 'Convert'}
            </button>
        </div>
    );
};

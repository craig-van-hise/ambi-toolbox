import React, { useState } from 'react';
import { ToolDefinition } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';
import { ChevronDown } from 'lucide-react';

export const Ambix2BW64Tool: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
    const { settings, updateSettings } = useSettings();

    const [normalization, setNormalization] = useState<'SN3D' | 'N3D'>(() => {
        return settings.toolSettings?.[tool.id]?.normalization || 'SN3D';
    });

    const [nfcDistance, setNfcDistance] = useState<number>(() => {
        return settings.toolSettings?.[tool.id]?.nfcDistance || 0.0;
    });

    const handleNormalizationChange = (val: 'SN3D' | 'N3D') => {
        setNormalization(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], normalization: val }
            }
        });
    };

    const handleNfcDistanceChange = (val: number) => {
        setNfcDistance(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], nfcDistance: val }
            }
        });
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Normalization</label>
                <div className="relative">
                    <select
                        value={normalization}
                        onChange={(e) => handleNormalizationChange(e.target.value as 'SN3D' | 'N3D')}
                        className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-yellow-500 appearance-none text-white"
                    >
                        <option value="SN3D">AmbiX (SN3D + ACN)</option>
                        <option value="N3D">N3D</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
            </div>

            <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                    NFC Reference Distance (m)
                </label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={nfcDistance}
                    onChange={(e) => handleNfcDistanceChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-yellow-500 text-white font-mono"
                />
                <p className="text-[10px] text-yellow-400 mt-1 font-mono">
                    * Set to 0.0 to disable Near-Field Compensation metadata.
                </p>
            </div>

            <button
                onClick={() => onRun({ normalization, nfcDistance })}
                disabled={isProcessing}
                className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
            >
                {isProcessing ? 'Converting...' : 'Process Audio'}
            </button>
        </div>
    );
};

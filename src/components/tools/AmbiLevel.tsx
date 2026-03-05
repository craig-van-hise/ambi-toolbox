import React, { useState } from 'react';
import { ToolDefinition } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';
import { ChevronDown } from 'lucide-react';

export const AmbiLevelTool: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
    const { settings, updateSettings } = useSettings();

    const [mode, setMode] = useState<'manual' | 'normalize'>(() => {
        return settings.toolSettings?.[tool.id]?.mode || 'manual';
    });

    const [targetDb, setTargetDb] = useState<number>(() => {
        return settings.toolSettings?.[tool.id]?.targetDb || 0;
    });

    const handleModeChange = (val: 'manual' | 'normalize') => {
        setMode(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], mode: val }
            }
        });
    };

    const handleTargetDbChange = (val: number) => {
        setTargetDb(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], targetDb: val }
            }
        });
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Processing Mode</label>
                <div className="relative">
                    <select
                        value={mode}
                        onChange={(e) => handleModeChange(e.target.value as 'manual' | 'normalize')}
                        className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-fuchsia-500 appearance-none text-white"
                    >
                        <option value="manual">Manual Gain Offset (Linked)</option>
                        <option value="normalize">Normalize to True Peak (Linked)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
            </div>

            <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                    {mode === 'manual' ? 'Gain Offset (dB)' : 'Target True Peak (dBTP)'}
                </label>
                <input
                    type="number"
                    step="0.1"
                    value={targetDb || ''}
                    placeholder="0.0"
                    onChange={(e) => handleTargetDbChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-fuchsia-500 text-white font-mono"
                />
                <p className="text-[10px] text-fuchsia-400 mt-1 font-mono">
                    * Exact gain value will be applied uniformly to ALL channels to preserve spatial phase.
                </p>
            </div>

            <button
                onClick={() => onRun({ mode, targetDb })}
                disabled={isProcessing || isNaN(targetDb)}
                className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
            >
                {isProcessing ? 'Processing...' : 'Process Audio'}
            </button>
        </div>
    );
};

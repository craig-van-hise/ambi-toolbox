import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition, HrtfProfile } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';

interface Ambix2BinViewProps {
    tool: ToolDefinition;
    onRun: (opts: any) => void;
    isProcessing: boolean;
}

export const Ambix2BinView: React.FC<Ambix2BinViewProps> = ({ tool, onRun, isProcessing }) => {
    const { settings, updateSettings } = useSettings();
    const [profile, setProfile] = useState<HrtfProfile>(() => {
        return settings.toolSettings?.[tool.id]?.hrtfProfile || HrtfProfile.Neumann;
    });
    const [customSofaPath, setCustomSofaPath] = useState<string | null>(() => {
        return settings.toolSettings?.[tool.id]?.customSofaPath || null;
    });

    const handleProfileChange = async (val: HrtfProfile) => {
        if (val === HrtfProfile.Custom) {
            try {
                const lastDir = settings.toolSettings?.globalPlayback?.lastSofaDir || undefined;
                const result = await window.electronAPI.selectFiles({
                    properties: ['openFile'],
                    defaultPath: lastDir,
                    filters: [
                        { name: 'SOFA Files', extensions: ['sofa'] },
                        { name: 'All Files', extensions: ['*'] }
                    ]
                });

                if (result && result.length > 0) {
                    const selectedPath = result[0];
                    setCustomSofaPath(selectedPath);
                    setProfile(HrtfProfile.Custom);

                    const dirPath = selectedPath.includes('/')
                        ? selectedPath.substring(0, selectedPath.lastIndexOf('/'))
                        : '';

                    updateSettings(prev => ({
                        toolSettings: {
                            ...prev.toolSettings,
                            globalPlayback: {
                                ...prev.toolSettings?.globalPlayback,
                                lastSofaDir: dirPath
                            },
                            [tool.id]: {
                                ...prev.toolSettings?.[tool.id],
                                hrtfProfile: val,
                                customSofaPath: selectedPath
                            }
                        }
                    }));
                }
            } catch (err) {
                console.error("Failed to select custom SOFA:", err);
            }
        } else {
            setProfile(val);
            updateSettings(prev => ({
                toolSettings: {
                    ...prev.toolSettings,
                    [tool.id]: {
                        ...prev.toolSettings?.[tool.id],
                        hrtfProfile: val
                    }
                }
            }));
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 mb-4">
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">HRTF Profile</label>
                    <div className="relative">
                        <select
                            value={profile}
                            onChange={(e) => handleProfileChange(e.target.value as HrtfProfile)}
                            className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-white appearance-none text-white"
                        >
                            <option value={HrtfProfile.Neumann}>{HrtfProfile.Neumann}</option>
                            <option value={HrtfProfile.Kemar}>{HrtfProfile.Kemar}</option>
                            <option value={HrtfProfile.Custom}>{HrtfProfile.Custom}</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                    {profile === HrtfProfile.Custom && customSofaPath && (
                        <p className="text-[10px] text-green-400 mt-1 font-mono break-all">
                            Using: {customSofaPath.split('/').pop()}
                        </p>
                    )}
                </div>

                <button
                    onClick={() => onRun({ hrtfProfile: profile === HrtfProfile.Custom ? customSofaPath : profile })}
                    disabled={isProcessing || (profile === HrtfProfile.Custom && !customSofaPath)}
                    className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
                >
                    {isProcessing ? 'Converting...' : 'Convert'}
                </button>
            </div>
        </div>
    );
};

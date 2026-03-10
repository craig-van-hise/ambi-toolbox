import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition, HrtfProfile } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';

interface Ambix2BinViewProps {
    tool: ToolDefinition;
}

export const Ambix2BinView: React.FC<Ambix2BinViewProps> = ({ tool }) => {
    const { settings, updateSettings } = useSettings();
    const [profile, setProfile] = useState<HrtfProfile>(() => {
        return settings.toolSettings?.[tool.id]?.hrtfProfile || HrtfProfile.Neumann;
    });
    const [customSofaPath, setCustomSofaPath] = useState<string>(() => {
        return settings.toolSettings?.[tool.id]?.customSofaPath || '';
    });

    const handleProfileChange = async (val: HrtfProfile) => {
        if (val === HrtfProfile.Custom) {
            const result = await (window as any).electronAPI.selectSofaFile();
            if (result && !result.canceled) {
                const path = result.filePaths[0];
                setCustomSofaPath(path);
                setProfile(val);
                updateSettings({
                    toolSettings: {
                        ...settings.toolSettings,
                        [tool.id]: {
                            ...settings.toolSettings?.[tool.id],
                            hrtfProfile: val,
                            customSofaPath: path
                        }
                    }
                });
            }
        } else {
            setProfile(val);
            updateSettings({
                toolSettings: {
                    ...settings.toolSettings,
                    [tool.id]: {
                        ...settings.toolSettings?.[tool.id],
                        hrtfProfile: val
                    }
                }
            });
        }
    };

    const profiles = [
        { label: 'Neumann KU100 (48k)', value: HrtfProfile.Neumann },
        { label: 'MIT KEMAR (Normal)', value: HrtfProfile.Kemar },
        { label: 'H3 FIR (256tap)', value: HrtfProfile.H3 },
        { label: 'Custom (.sofa)...', value: HrtfProfile.Custom }
    ];

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 mb-4">
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">HRTF Profile</label>
                    <div className="relative">
                        <select
                            value={profile}
                            onChange={(e) => handleProfileChange(e.target.value as HrtfProfile)}
                            className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-studio-accent appearance-none text-white"
                        >
                            {profiles.map((p) => (
                                <option key={p.value} value={p.value}>{p.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                    {profile === HrtfProfile.Custom && customSofaPath && (
                        <p className="text-[10px] text-green-400 mt-1 font-mono break-all">
                            Using: {customSofaPath.split('/').pop()}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

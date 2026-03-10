import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';

interface Ambix2CafViewProps {
    tool: ToolDefinition;
}

export const Ambix2CafView: React.FC<Ambix2CafViewProps> = ({ tool }) => {
    const { settings, updateSettings } = useSettings();
    const [layout, setLayout] = useState(() => {
        return settings.toolSettings?.[tool.id]?.layout || 'discrete';
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

    const options = [
        { label: 'Discrete (Multi-channel)', value: 'discrete' },
        { label: 'Standard (Matrixed)', value: 'standard' }
    ];

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 mb-4">
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">CAF Channel Layout</label>
                    <div className="relative">
                        <select
                            value={layout}
                            onChange={(e) => handleLayoutChange(e.target.value)}
                            className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-amber-500 appearance-none text-white"
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

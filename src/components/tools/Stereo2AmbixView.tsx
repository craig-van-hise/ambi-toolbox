import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition, AmbisonicOrder } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';

interface Stereo2AmbixViewProps {
    tool: ToolDefinition;
    onRun: (opts: any) => void;
    isProcessing: boolean;
}

export const Stereo2AmbixView: React.FC<Stereo2AmbixViewProps> = ({ tool, onRun, isProcessing }) => {
    const { settings, updateSettings } = useSettings();
    const [targetOrder, setTargetOrder] = useState<string>(() => {
        return settings.toolSettings?.[tool.id]?.targetOrder || AmbisonicOrder.Third;
    });
    const [stageWidth, setStageWidth] = useState<number>(() => {
        return settings.toolSettings?.[tool.id]?.stageWidth ?? 90;
    });
    const [envelopment, setEnvelopment] = useState<number>(() => {
        return settings.toolSettings?.[tool.id]?.envelopment ?? 50;
    });

    const handleOrderChange = (val: string) => {
        setTargetOrder(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], targetOrder: val }
            }
        });
    };

    const handleWidthChange = (val: number) => {
        setStageWidth(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], stageWidth: val }
            }
        });
    };

    const handleEnvelopmentChange = (val: number) => {
        setEnvelopment(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], envelopment: val }
            }
        });
    };

    const options = [
        AmbisonicOrder.First,
        AmbisonicOrder.Second,
        AmbisonicOrder.Third,
        AmbisonicOrder.Fourth,
        AmbisonicOrder.Fifth,
        AmbisonicOrder.Sixth,
        AmbisonicOrder.Seventh,
    ];

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Target HOA Order</label>
                <div className="relative">
                    <select
                        value={targetOrder}
                        onChange={(e) => handleOrderChange(e.target.value)}
                        className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 appearance-none text-white"
                    >
                        {options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
            </div>

            <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Stage Width</label>
                    <span className="text-xs font-mono text-gray-300">{stageWidth}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={stageWidth}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500 hover:accent-emerald-400 transition-all cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 uppercase mt-1">
                    <span>Mono</span>
                    <span>Wide</span>
                </div>
            </div>

            <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">3D Envelopment (FDN)</label>
                    <span className="text-xs font-mono text-gray-300">{envelopment}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={envelopment}
                    onChange={(e) => handleEnvelopmentChange(parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500 hover:accent-emerald-400 transition-all cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 uppercase mt-1">
                    <span>Dry</span>
                    <span>Immersive</span>
                </div>
            </div>

            <button
                onClick={() => onRun({ targetOrder, stageWidth, envelopment })}
                disabled={isProcessing}
                className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
            >
                {isProcessing ? 'Upmixing...' : 'Upmix to AmbiX'}
            </button>
        </div>
    );
};

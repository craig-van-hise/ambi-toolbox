import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolDefinition, AmbisonicOrder } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';

interface AmbiOrderViewProps {
    tool: ToolDefinition;
    files: File[];
}

export const AmbiOrderView: React.FC<AmbiOrderViewProps> = ({ tool, files }) => {
    const { settings, updateSettings } = useSettings();
    const [targetOrder, setTargetOrder] = useState<string>(() => {
        return settings.toolSettings?.[tool.id]?.targetOrder || AmbisonicOrder.Second;
    });
    const [detectedOrder, setDetectedOrder] = useState<string>('Unknown');

    const handleOrderChange = (val: string) => {
        setTargetOrder(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], targetOrder: val }
            }
        });
    };

    useEffect(() => {
        if (files.length > 0) {
            const path = (files[0] as any).path;
            window.electronAPI.analyzeAmbiFile(path)
                .then((result: any) => {
                    if (result && result.audio) {
                        const ch = result.audio.channelCount;
                        if (ch === 4) setDetectedOrder(AmbisonicOrder.First);
                        else if (ch === 9) setDetectedOrder(AmbisonicOrder.Second);
                        else if (ch === 16) setDetectedOrder(AmbisonicOrder.Third);
                        else if (ch === 25) setDetectedOrder(AmbisonicOrder.Fourth);
                        else if (ch === 36) setDetectedOrder('5th');
                        else if (ch === 49) setDetectedOrder('6th');
                        else setDetectedOrder('Custom/Unknown');
                    }
                })
                .catch((err: any) => {
                    console.error("Analysis failed", err);
                    setDetectedOrder('Unknown');
                });
        } else {
            setDetectedOrder('None');
        }
    }, [files]);

    const options = [
        AmbisonicOrder.Third,
        AmbisonicOrder.Second,
        AmbisonicOrder.First,
        AmbisonicOrder.Zero
    ].filter(opt => {
        if (detectedOrder === 'Unknown' || detectedOrder === 'None') return true;

        const orderMap: Record<string, number> = {
            [AmbisonicOrder.Zero]: 0,
            [AmbisonicOrder.First]: 1,
            [AmbisonicOrder.Second]: 2,
            [AmbisonicOrder.Third]: 3,
            [AmbisonicOrder.Fourth]: 4
        };

        const current = orderMap[detectedOrder];
        const target = orderMap[opt];
        if (current === undefined) return true;
        return target < current;
    });

    return (
        <div className="w-full flex flex-col gap-4">
            <div className={`w-full px-4 py-2 rounded border flex flex-col justify-center h-[42px] ${detectedOrder !== 'Unknown' && detectedOrder !== 'None' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-[#1E1E1E] border-studio-border'}`}>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-500 uppercase leading-none">Detected</span>
                    <span className="text-sm font-bold text-white leading-none">{detectedOrder}</span>
                </div>
            </div>

            <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Output Order</label>
                <div className="relative">
                    <select
                        value={targetOrder}
                        onChange={(e) => handleOrderChange(e.target.value)}
                        className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none text-white"
                    >
                        {options.length > 0 ? options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        )) : <option disabled>No lower orders available</option>}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

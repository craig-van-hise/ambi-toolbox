import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ToolDefinition, AmbiFormat } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';

interface AmbiSwapViewProps {
    tool: ToolDefinition;
    onRun: (opts: any) => void;
    isProcessing: boolean;
}

export const AmbiSwapView: React.FC<AmbiSwapViewProps> = ({ tool, onRun, isProcessing }) => {
    const { settings, updateSettings } = useSettings();
    const [inputFormat, setInputFormat] = useState<AmbiFormat>(() => {
        return settings.toolSettings?.[tool.id]?.inputFormat || AmbiFormat.AmbiX;
    });

    const handleFormatChange = (val: AmbiFormat) => {
        setInputFormat(val);
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                [tool.id]: { ...settings.toolSettings?.[tool.id], inputFormat: val }
            }
        });
    };

    const isAmbixInput = inputFormat === AmbiFormat.AmbiX;

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex bg-[#1E1E1E] rounded-md border border-studio-border p-1 w-full justify-center">
                <button
                    onClick={() => handleFormatChange(AmbiFormat.AmbiX)}
                    className={`flex-1 px-3 py-1.5 rounded text-xs font-bold transition-all ${isAmbixInput ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    AmbiX
                </button>
                <button
                    onClick={() => handleFormatChange(AmbiFormat.FuMa)}
                    className={`flex-1 px-3 py-1.5 rounded text-xs font-bold transition-all ${!isAmbixInput ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    FuMa
                </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                <span>{isAmbixInput ? 'AmbiX' : 'FuMa'}</span>
                <ArrowRight size={14} />
                <span>{isAmbixInput ? 'FuMa' : 'AmbiX'}</span>
            </div>

            <button
                onClick={() => onRun({ direction: isAmbixInput ? 'AmbixToFuMa' : 'FuMaToAmbix' })}
                disabled={isProcessing}
                className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
            >
                {isProcessing ? 'Swapping...' : 'Swap Format'}
            </button>
        </div>
    );
};

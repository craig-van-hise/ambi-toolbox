import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { AmbiRotateToolProps } from '../../types';
import { Knob } from './components/Knob';
import { Trash2 } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { useTransport } from '../../contexts/TransportContext';

export interface AmbiRotateHandle {
    runRotation: () => Promise<string | null>;
}

interface ExtendedAmbiRotateToolProps extends AmbiRotateToolProps {
    activeIndex?: number;
    onIndexChange?: (index: number) => void;
    isVisible?: boolean; // New prop for visibility control
}

export const AmbiRotateTool = forwardRef<AmbiRotateHandle, ExtendedAmbiRotateToolProps>(({
    files,
}, ref) => {
    // ------------------------------------------------------------------
    // STATE
    // ------------------------------------------------------------------

    if (!files) {
        return null;
    }

    const { settings, updateSettings } = useSettings();
    const { isPlaying, currentTime, commitSeek } = useTransport();

    // Rotation Attributes (Core)
    const [yaw, setYaw] = useState(() => {
        return settings.toolSettings['ambirotate']?.yaw || 0;
    });
    const [pitch, setPitch] = useState(() => {
        return settings.toolSettings['ambirotate']?.pitch || 0;
    });
    const [roll, setRoll] = useState(() => {
        return settings.toolSettings['ambirotate']?.roll || 0;
    });

    const updateRotationSettings = (y: number, p: number, r: number) => {
        updateSettings({
            toolSettings: {
                ...settings.toolSettings,
                ['ambirotate']: {
                    ...settings.toolSettings?.['ambirotate'],
                    yaw: y,
                    pitch: p,
                    roll: r
                }
            }
        });
    };

    const handleYawChange = (val: number) => {
        setYaw(val);
        updateRotationSettings(val, pitch, roll);
    };

    const handlePitchChange = (val: number) => {
        setPitch(val);
        updateRotationSettings(yaw, val, roll);
    };

    const handleRollChange = (val: number) => {
        setRoll(val);
        updateRotationSettings(yaw, pitch, val);
    };

    // Real-time Audio Preview Rebuild
    useEffect(() => {
        if (!isPlaying) return; // Only rebuild if audio is currently active
        
        const timer = setTimeout(() => {
            // Triggering a seek to the exact current time forces the AudioEngine 
            // to rebuild the HTTP stream with the newly updated Rotation settings.
            commitSeek(currentTime);
        }, 150); // 150ms debounce — tight response for live rotation feel

        return () => clearTimeout(timer);
    }, [yaw, pitch, roll]);

    // RENDER LOGIC (Backend Wiring)
    const handleRender = async (): Promise<string | null> => {
        if (files.length === 0) return null;
        try {
            const backendSettings = {
                outputDir: settings.outputMode === 'custom' ? settings.customOutputDir : undefined,
                autoCreateFolder: settings.autoCreateFolder
            };

            const result = await window.electronAPI.convertAmbiRotate(
                files.map((f: any) => f.path),
                { yaw, pitch, roll },
                backendSettings
            );

            if (result && !result.success) {
                throw new Error(result.error || "Unknown backend error");
            }

            console.log("Render Complete:", result);
            return result.outputPaths?.[0] || "Success";
        } catch (error) {
            console.error("Render Failed:", error);
            throw error;
        }
    };

    useImperativeHandle(ref, () => ({
        runRotation: handleRender
    }));

    const doUpsideDown = () => handleRollChange(Math.abs(roll - 180) < 1 ? 0 : 180);
    const doRotate180 = () => handleYawChange(Math.abs(yaw - 180) < 1 ? 0 : 180);
    const doLayFlat = () => handlePitchChange(Math.abs(pitch - 90) < 1 ? 0 : 90);
    const doReset = () => { handleYawChange(0); handlePitchChange(0); handleRollChange(0); };

    return (
        <div className="relative bg-[#0a0a0a] rounded-lg px-6 py-4 border border-studio-border shadow-xl flex flex-col w-full h-fit select-none text-white overflow-hidden">
            {/* GRADIENT GLOW BACKGROUND */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none" />

            <div className="flex flex-col w-full space-y-3 z-10">

                {/* ROW 1: HEADER */}
                <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">

                    {/* PRESETS (MOVED LEFT) */}
                    <div className="flex gap-2">
                        <button
                            onClick={doUpsideDown}
                            className={`px-3 py-1 border rounded text-xs transition ${Math.abs(Math.abs(roll) - 180) < 5 ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'border-gray-600 text-gray-400 hover:bg-gray-800 hover:border-gray-500'}`}
                        >
                            Upside Down
                        </button>
                        <button
                            onClick={doRotate180}
                            className={`px-3 py-1 border rounded text-xs transition ${Math.abs(Math.abs(yaw) - 180) < 5 ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'border-gray-600 text-gray-400 hover:bg-gray-800 hover:border-gray-500'}`}
                        >
                            Rotate 180
                        </button>
                        <button
                            onClick={doLayFlat}
                            className={`px-3 py-1 border rounded text-xs transition ${Math.abs(Math.abs(pitch) - 90) < 5 ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'border-gray-600 text-gray-400 hover:bg-gray-800 hover:border-gray-500'}`}
                        >
                            Lay Flat
                        </button>
                    </div>

                    {/* RESET (RIGHT) */}
                    <button onClick={doReset} className="px-3 py-1 border border-red-900/50 text-red-400 rounded text-xs hover:bg-red-900/20 transition flex items-center gap-1">
                        <Trash2 size={12} /> Reset
                    </button>
                </div>

                {/* ROW 2: 3D CARDS — restored from git a5ea12e + Phase 2 layout constraints */}
                <div className="flex flex-wrap justify-center gap-4">

                    {/* YAW CARD — Horizontal Slider (native input[type=range]) */}
                    <div className="w-[120px] shrink-0 bg-[#111111] border border-gray-800 rounded-xl p-3 flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden group min-h-[75px]">
                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <label className="text-gray-400 font-bold text-xs tracking-wider z-10">YAW</label>

                        <div className="flex-1 flex items-center justify-center z-10 my-1">
                            <span className={`font-bold text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all ${`${Math.round(yaw)}°`.length >= 5 ? 'text-lg' :
                                    `${Math.round(yaw)}°`.length >= 4 ? 'text-xl' :
                                        `${Math.round(yaw)}°`.length >= 3 ? 'text-2xl' : 'text-3xl'
                                }`}>
                                {Math.round(yaw)}°
                            </span>
                        </div>

                        <div className="w-full flex justify-center z-10 my-1">
                            <input
                                type="range"
                                min="-180" max="180"
                                value={yaw}
                                onChange={(e) => handleYawChange(Number(e.target.value))}
                                className="w-[calc(100%-16px)] mx-auto h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                            />
                        </div>
                    </div>

                    {/* PITCH CARD — Vertical Slider (native input[type=range] rotated -90deg) */}
                    <div className="w-[120px] shrink-0 bg-[#111111] border border-gray-800 rounded-xl p-3 flex flex-row items-center justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden group min-h-[75px]">
                        <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="flex flex-col justify-between h-full z-10">
                            <label className="text-gray-400 font-bold text-xs tracking-wider">PITCH</label>
                            <span className={`font-bold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-all ${`${Math.round(pitch)}°`.length >= 5 ? 'text-lg' :
                                    `${Math.round(pitch)}°`.length >= 4 ? 'text-xl' :
                                        `${Math.round(pitch)}°`.length >= 3 ? 'text-2xl' : 'text-3xl'
                                }`}>
                                {Math.round(pitch)}°
                            </span>
                            <div className="h-2" />
                        </div>

                        <div className="h-full flex flex-col items-center justify-center py-1 z-10">
                            <div className="h-[60px] flex items-center">
                                <input
                                    type="range"
                                    min="-90" max="90"
                                    value={pitch}
                                    onChange={(e) => handlePitchChange(Number(e.target.value))}
                                    className="w-[calc(60px-16px)] mx-auto h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-green-500 -rotate-90 hover:accent-green-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ROLL CARD — Radial Knob SVG */}
                    <div className="w-[120px] shrink-0 bg-[#111111] border border-gray-800 rounded-xl p-3 flex flex-row items-center justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden group min-h-[75px]">
                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="flex flex-col justify-between h-full z-10">
                            <label className="text-gray-400 font-bold text-xs tracking-wider">ROLL</label>
                            <span className={`font-bold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all ${`${Math.round(roll)}°`.length >= 5 ? 'text-lg' :
                                    `${Math.round(roll)}°`.length >= 4 ? 'text-xl' :
                                        `${Math.round(roll)}°`.length >= 3 ? 'text-2xl' : 'text-3xl'
                                }`}>
                                {Math.round(roll)}°
                            </span>
                            <div className="h-2" />
                        </div>

                        <div className="relative z-10 pr-2">
                            <Knob
                                value={roll}
                                min={-180} max={180}
                                onChange={handleRollChange}
                                size={45}
                                color="#ef4444"
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
});

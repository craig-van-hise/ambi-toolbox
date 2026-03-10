import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { AmbiRotateToolProps } from '../../types';
import { NativeRotator } from './NativeRotator';
import { WavDecoder } from '../../utils/WavDecoder';
import { Knob } from './components/Knob';
import { Trash2 } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

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
    activeIndex = 0,
    onIndexChange,
    isVisible = true
}, ref) => {
    // ------------------------------------------------------------------
    // STATE
    // ------------------------------------------------------------------

    if (!files) {
        return null;
    }

    // Use props for index control if available, else local state (fallback)
    const [localIndex, setLocalIndex] = useState(0);
    const currentFileIndex = onIndexChange ? activeIndex : localIndex;

    const setSafeCurrentIndex = (idx: number) => {
        if (onIndexChange) {
            onIndexChange(idx);
        } else {
            setLocalIndex(idx);
        }
    };

    const { settings, updateSettings } = useSettings();

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

    // Playback State
    const [isReady, setIsReady] = useState(false); // File Loaded & Decoded
    const [isPlaying, setIsPlaying] = useState(false);

    // Timeline / Transport
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0); // Tracks playback position (used by engine; no longer displayed)

    // Loop State
    const [isLooping, setIsLooping] = useState(false);
    const [loopIn, setLoopIn] = useState(0);
    const [loopOut, setLoopOut] = useState(0);

    // Loading & Processing State
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState("");

    // Refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const nativeRotatorRef = useRef<NativeRotator | null>(null);
    const gainRef = useRef<GainNode | null>(null);

    // Timing Refs
    const startTimeRef = useRef(0);
    const pauseTimeRef = useRef(0); // Holds the offset when paused/stopped

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

    // ------------------------------------------------------------------
    // 1. FILE LOADING
    // ------------------------------------------------------------------
    // Watch currentFileIndex (Effectively watching props.activeIndex if provided)
    useEffect(() => {
        if (files.length > 0) {
            performStop(true);
            if (currentFileIndex < files.length) {
                loadAudioFile(files[currentFileIndex]);
            }
        } else {
            performStop(true);
            setIsReady(false);
        }
    }, [files, currentFileIndex]);

    const loadTrack = async (index: number) => {
        if (index < 0 || index >= files.length) return;
        // Just update state/prop, effect will handle loading
        setSafeCurrentIndex(index);
    };

    const loadAudioFile = async (file: any) => {
        if (!file) return;

        setIsLoading(true);
        setLoadingProgress(0);
        performStop(true);
        setIsReady(false);

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        try {
            const filePath = file.path;

            // Check if file object has path (memory files might not)
            if (!filePath) {
                console.warn("File has no path:", file);
                setLoadingMessage("Error: File not found (Memory Object?)");
                setIsLoading(false);
                return;
            }

            console.log(`Loading file: ${filePath}`);

            let totalSize = 0;
            try {
                totalSize = await window.electronAPI.getFileSize(filePath);
            } catch (fsErr: any) {
                console.error("File Size Check Failed:", fsErr);
                if (fsErr.message.includes('ENOENT')) {
                    setLoadingMessage("Error: File Not Found on Disk");
                } else {
                    setLoadingMessage(`Error Accessing File: ${fsErr.message}`);
                }
                setIsLoading(false);
                return;
            }

            const CHUNK_SIZE = 50 * 1024 * 1024;
            let offset = 0;
            const chunks: ArrayBuffer[] = [];

            while (offset < totalSize) {
                const sizeToRead = Math.min(CHUNK_SIZE, totalSize - offset);
                // Progress Feedback
                const percent = Math.round((offset / totalSize) * 100);
                setLoadingProgress(percent);
                setLoadingMessage(`Loading... ${percent}%`);

                try {
                    const chunk = await window.electronAPI.readChunk(filePath, offset, sizeToRead);
                    chunks.push(chunk);
                    offset += sizeToRead;
                } catch (readErr: any) {
                    console.error("Chunk Read Failed:", readErr);
                    setLoadingMessage("Error: Read Interrupted");
                    setIsLoading(false);
                    return;
                }
            }

            // Decode
            setLoadingMessage("Decoding...");
            const totalBuffer = new Uint8Array(totalSize);
            let writeOffset = 0;
            for (const chunk of chunks) {
                totalBuffer.set(new Uint8Array(chunk), writeOffset);
                writeOffset += chunk.byteLength;
            }

            const rawBuffer = totalBuffer.buffer;
            let buffer: AudioBuffer;

            try {
                // Try manual high-channel WAV decoder first (for Ambisonics)
                buffer = WavDecoder.decode(rawBuffer, audioContextRef.current);
            } catch (decodeErr) {
                console.warn("Manual WavDecoder failed, falling back to Web Audio API:", decodeErr);
                try {
                    // Fallback to native decoder for standard formats (mp3, mp4-audio, etc.)
                    buffer = await audioContextRef.current.decodeAudioData(rawBuffer);
                } catch (nativeErr) {
                    console.error("Native decode failed:", nativeErr);
                    throw new Error("Unsupported audio format or corrupted file.");
                }
            }

            audioBufferRef.current = buffer;
            setDuration(buffer.duration);
            setLoopOut(buffer.duration);

            // Init Engine
            initEngine(buffer.numberOfChannels);

            setLoadingProgress(100);
            setIsLoading(false);
            setIsReady(true);

        } catch (err: any) {
            console.error(err);
            setLoadingMessage(`Critical Error: ${err.message}`);
            setIsLoading(false);
        }
    };

    const initEngine = (channels: number) => {
        if (!audioContextRef.current) return;
        try {
            nativeRotatorRef.current = new NativeRotator(audioContextRef.current, channels);

            // Gain Node for Fade In/Out
            gainRef.current = audioContextRef.current.createGain();
            gainRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);

            nativeRotatorRef.current.output.connect(gainRef.current);
            gainRef.current.connect(audioContextRef.current.destination);
            nativeRotatorRef.current.setRotation(yaw, pitch, roll);
        } catch (e) {
            console.error("Engine Init Failed", e);
        }
    };

    // ------------------------------------------------------------------
    // 2. TRANSPORT LOGIC
    // ------------------------------------------------------------------

    const stopSourceNode = (ctx: AudioContext, fadeOut = true) => {
        if (!sourceNodeRef.current) return;
        try {
            if (fadeOut && gainRef.current) {
                gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
                gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, ctx.currentTime);
                gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.01);
                sourceNodeRef.current.stop(ctx.currentTime + 0.01);
            } else {
                sourceNodeRef.current.stop();
            }
        } catch (e) { }
        sourceNodeRef.current = null;
    };

    const playAudio = async (startOffset: number) => {
        if (!audioBufferRef.current || !nativeRotatorRef.current || !audioContextRef.current || !gainRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') await ctx.resume();

        if (sourceNodeRef.current) {
            try { sourceNodeRef.current.stop(); } catch (e) { }
            sourceNodeRef.current = null;
        }

        gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainRef.current.gain.setValueAtTime(0, ctx.currentTime);

        const source = ctx.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.loop = isLooping;
        source.loopStart = loopIn;
        source.loopEnd = loopOut || audioBufferRef.current.duration;

        source.connect(nativeRotatorRef.current.input);

        source.start(0, startOffset);
        sourceNodeRef.current = source;

        gainRef.current.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.02);
        startTimeRef.current = ctx.currentTime - startOffset;
        setIsPlaying(true);
    };

    const performPause = () => {
        if (!audioContextRef.current || !isPlaying) return;
        const ctx = audioContextRef.current;

        let current = ctx.currentTime - startTimeRef.current;
        if (isLooping && loopOut > 0) {
            const length = loopOut - loopIn;
            if (length > 0) {
                if (current >= loopOut) {
                    const offset = (current - loopIn) % length;
                    current = loopIn + offset;
                }
            }
        }
        current = Math.max(0, Math.min(current, duration));
        pauseTimeRef.current = current;
        setProgress(current);
        stopSourceNode(ctx, true);
        setIsPlaying(false);
    };

    const performStop = (fullReset = false) => {
        if (audioContextRef.current) {
            stopSourceNode(audioContextRef.current, true);
        }
        setIsPlaying(false);
        const resetPoint = isLooping ? loopIn : 0;
        const target = fullReset ? 0 : resetPoint;
        setProgress(target);
        pauseTimeRef.current = target;
    };

    const togglePlayPause = async () => {
        if (!isReady) return;
        if (isPlaying) {
            performPause();
        } else {
            playAudio(pauseTimeRef.current);
        }
    };

    // ------------------------------------------------------------------
    // AUTO-PAUSE ON VISIBILITY CHANGE
    // ------------------------------------------------------------------
    useEffect(() => {
        if (!isVisible && isPlaying) {
            performPause();
        }
    }, [isVisible]);

    // ------------------------------------------------------------------
    // KEYBOARD SHORTCUTS (Spacebar Play/Pause)
    // ------------------------------------------------------------------
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                // Ignore if focus is on an input element
                const activeTag = document.activeElement?.tagName.toLowerCase();
                if (activeTag === 'input' || activeTag === 'textarea') return;

                e.preventDefault(); // Prevent scrolling
                togglePlayPause();
            }
        };

        if (isVisible) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible, isPlaying, isReady, togglePlayPause]); // togglePlayPause deps are handled by its definition scope

    // ------------------------------------------------------------------
    // 3. UPDATES & ANIMATION
    // ------------------------------------------------------------------

    useEffect(() => {
        let frameId: number;
        const tick = () => {
            if (isPlaying && audioContextRef.current) {
                const ctx = audioContextRef.current;
                let current = ctx.currentTime - startTimeRef.current;
                if (isLooping && loopOut > 0) {
                    const length = loopOut - loopIn;
                    if (length > 0 && current >= loopOut) {
                        const offset = (current - loopIn) % length;
                        current = loopIn + offset;
                    }
                } else if (!isLooping && current > duration && duration > 0) {
                    performStop(false);
                    return;
                }
                setProgress(current);
            }
            frameId = requestAnimationFrame(tick);
        };
        if (isPlaying) { tick(); }
        return () => cancelAnimationFrame(frameId);
    }, [isPlaying, isLooping, loopIn, loopOut, duration]);

    // Rotation Updates
    useEffect(() => {
        if (nativeRotatorRef.current) {
            nativeRotatorRef.current.setRotation(yaw, pitch, roll);
        }
    }, [yaw, pitch, roll]);

    // Loop Change Handlers
    const handleLoopChange = (inTime: number, outTime: number) => {
        setLoopIn(inTime);
        setLoopOut(outTime);
        if (sourceNodeRef.current) {
            sourceNodeRef.current.loopStart = inTime;
            sourceNodeRef.current.loopEnd = outTime;
        }
    };

    const handleLoopToggle = () => {
        const newVal = !isLooping;
        setIsLooping(newVal);
        if (sourceNodeRef.current) sourceNodeRef.current.loop = newVal;
    };

    const doUpsideDown = () => handleRollChange(Math.abs(roll - 180) < 1 ? 0 : 180);
    const doRotate180 = () => handleYawChange(Math.abs(yaw - 180) < 1 ? 0 : 180);
    const doLayFlat = () => handlePitchChange(Math.abs(pitch - 90) < 1 ? 0 : 90);
    const doReset = () => { handleYawChange(0); handlePitchChange(0); handleRollChange(0); };



    return (
        <div className="relative bg-[#0a0a0a] rounded-lg px-6 pt-6 pb-2 border border-studio-border shadow-xl flex flex-col w-full h-fit select-none text-white overflow-hidden">
            {/* GRADIENT GLOW BACKGROUND */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none" />

            {/* LOADING OVERLAY */}
            {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300 z-10 py-12">
                    <div className="text-blue-400 font-mono text-xl animate-pulse">SYSTEM LOADING</div>
                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-75" style={{ width: `${loadingProgress}%` }} />
                    </div>
                    <div className="text-xs text-gray-500 font-mono">{loadingMessage}</div>
                </div>
            ) : (
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
                        <div className="w-[160px] shrink-0 bg-[#111111] border border-gray-800 rounded-xl p-3 flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden group min-h-[100px]">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <label className="text-gray-400 font-bold text-xs tracking-wider z-10">YAW</label>

                            <div className="flex-1 flex items-center justify-center z-10 my-1">
                                <span className={`font-bold text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all ${`${Math.round(yaw)}°`.length >= 5 ? 'text-xl' :
                                        `${Math.round(yaw)}°`.length >= 4 ? 'text-2xl' :
                                            `${Math.round(yaw)}°`.length >= 3 ? 'text-3xl' : 'text-4xl'
                                    }`}>
                                    {Math.round(yaw)}°
                                </span>
                            </div>

                            <div className="flex items-center gap-2 z-10 px-2">
                                <input
                                    type="range"
                                    min="-180" max="180"
                                    value={yaw}
                                    onChange={(e) => handleYawChange(Number(e.target.value))}
                                    className="flex-1 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                                />
                            </div>
                        </div>

                        {/* PITCH CARD — Vertical Slider (native input[type=range] rotated -90deg) */}
                        <div className="w-[160px] shrink-0 bg-[#111111] border border-gray-800 rounded-xl p-3 flex flex-row items-center justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden group min-h-[100px]">
                            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="flex flex-col justify-between h-full z-10">
                                <label className="text-gray-400 font-bold text-xs tracking-wider">PITCH</label>
                                <span className={`font-bold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-all ${`${Math.round(pitch)}°`.length >= 5 ? 'text-xl' :
                                        `${Math.round(pitch)}°`.length >= 4 ? 'text-2xl' :
                                            `${Math.round(pitch)}°`.length >= 3 ? 'text-3xl' : 'text-4xl'
                                    }`}>
                                    {Math.round(pitch)}°
                                </span>
                                <div className="h-2" />
                            </div>

                            <div className="h-full flex flex-col items-center justify-center py-1 z-10">
                                <div className="h-20 flex items-center">
                                    <input
                                        type="range"
                                        min="-90" max="90"
                                        value={pitch}
                                        onChange={(e) => handlePitchChange(Number(e.target.value))}
                                        className="w-20 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-green-500 -rotate-90 hover:accent-green-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ROLL CARD — Radial Knob SVG */}
                        <div className="w-[160px] shrink-0 bg-[#111111] border border-gray-800 rounded-xl p-3 flex flex-row items-center justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden group min-h-[100px]">
                            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="flex flex-col justify-between h-full z-10">
                                <label className="text-gray-400 font-bold text-xs tracking-wider">ROLL</label>
                                <span className={`font-bold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all ${`${Math.round(roll)}°`.length >= 5 ? 'text-xl' :
                                        `${Math.round(roll)}°`.length >= 4 ? 'text-2xl' :
                                            `${Math.round(roll)}°`.length >= 3 ? 'text-3xl' : 'text-4xl'
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
                                    size={60}
                                    color="#ef4444"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            )}
        </div>
    );
});

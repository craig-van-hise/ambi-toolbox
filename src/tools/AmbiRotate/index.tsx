import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { AmbiRotateToolProps } from '../../types';
import { NativeRotator } from './NativeRotator';
import { WavDecoder } from '../../utils/WavDecoder';
import { Timeline } from './components/Timeline';
import {
    Play, Pause, Square, Repeat,
    RotateCw, Disc, MoveHorizontal,
    Trash2,
    SkipBack, SkipForward
} from 'lucide-react';

export interface AmbiRotateHandle {
    handleRender: () => void;
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

    // Rotation Attributes (Core)
    const [yaw, setYaw] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [roll, setRoll] = useState(0);

    // Playback State
    const [isReady, setIsReady] = useState(false); // File Loaded & Decoded
    const [isPlaying, setIsPlaying] = useState(false);

    // Timeline / Transport
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);

    // Loop State
    const [isLooping, setIsLooping] = useState(false);
    const [loopIn, setLoopIn] = useState(0);
    const [loopOut, setLoopOut] = useState(0);

    // Loading & Processing State
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const nativeRotatorRef = useRef<NativeRotator | null>(null);
    const gainRef = useRef<GainNode | null>(null);

    // Timing Refs
    const startTimeRef = useRef(0);
    const pauseTimeRef = useRef(0); // Holds the offset when paused/stopped

    // ------------------------------------------------------------------
    // EXPOSE METHODS
    // ------------------------------------------------------------------
    // RENDER LOGIC (Backend Wiring)
    // RENDER LOGIC (Backend Wiring)
    const handleRender = async () => {
        if (files.length === 0) return;
        setIsProcessing(true);
        try {
            // Call the Backend to process the file with current Yaw/Pitch/Roll
            // We pass the rotation values to the Python backend
            const result = await window.electronAPI.processAmbiRotate(
                files.map((f: any) => f.path),
                { yaw, pitch, roll }
            );
            console.log("Render Complete:", result);
            // Optionally could show a success notification here
            console.log("Render Success");
        } catch (error) {
            console.error("Render Failed:", error);
            throw error; // RETHROW so parent can display it
        } finally {
            setIsProcessing(false);
        }
    };

    useImperativeHandle(ref, () => ({
        handleRender
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
            const buffer = WavDecoder.decode(rawBuffer, audioContextRef.current);

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

    // Timeline Handlers
    const handleSeek = (time: number) => {
        setProgress(time);
        pauseTimeRef.current = time;
        if (isPlaying) playAudio(time);
    };

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

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 10);
        return `${m}:${s.toString().padStart(2, '0')}.${ms}`;
    };

    const doUpsideDown = () => setRoll(Math.abs(roll - 180) < 1 ? 0 : 180);
    const doRotate180 = () => setYaw(Math.abs(yaw - 180) < 1 ? 0 : 180);
    const doLayFlat = () => setPitch(Math.abs(pitch - 90) < 1 ? 0 : 90);
    const doReset = () => { setYaw(0); setPitch(0); setRoll(0); };

    const getBtnClass = (isActive: boolean) =>
        `px-3 py-1.5 rounded text-xs font-bold transition-all border ${isActive
            ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]'
            : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
        }`;

    return (
        <div className="relative bg-[#1E1E1E] rounded-lg p-6 border border-studio-border shadow-xl h-full flex flex-col overflow-y-auto">
            {/* LOADING OVERLAY */}
            {/* LOADING STATE - Replaces Content */}
            {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">

                    <div className="text-blue-400 font-mono text-xl animate-pulse">SYSTEM LOADING</div>
                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-75" style={{ width: `${loadingProgress}%` }} />
                    </div>
                    <div className="text-xs text-gray-500 font-mono">{loadingMessage}</div>
                </div>
            ) : (
                <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">

                    {/* TRACK INFO & CONTROLS */}
                    <div>
                        {/* Track Info (Moved Up) */}
                        <div className="mb-4 text-sm text-gray-400 truncate font-mono">
                            {files.length > 0 ? (
                                <span>
                                    <span className="text-gray-500 mr-2">TRACK {currentFileIndex + 1}/{files.length}:</span>
                                    <span className="text-gray-300">{files[currentFileIndex].name}</span>
                                </span>
                            ) : "NO MEDIA"}
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                            <div className="flex gap-2 flex-1">
                                <button onClick={doUpsideDown} className={getBtnClass(Math.abs(roll - 180) < 1)}>Upside Down</button>
                                <button onClick={doRotate180} className={getBtnClass(Math.abs(yaw - 180) < 1)}>Rotate 180</button>
                                <button onClick={doLayFlat} className={getBtnClass(Math.abs(pitch - 90) < 1)}>Lay Flat</button>
                            </div>
                            <button onClick={doReset} className="bg-red-900/30 hover:bg-red-900/50 text-xs px-3 py-1.5 rounded text-red-300 border border-red-900/50 transition flex items-center gap-1">
                                <Trash2 size={12} /> Reset
                            </button>
                        </div>
                    </div>

                    {/* ROTATORS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* YAW */}
                        <div className="bg-[#252526] p-4 rounded border border-studio-border">
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold text-gray-400">YAW (Z)</label>
                                <span className="text-xs text-blue-400 font-mono">{yaw}°</span>
                            </div>
                            <input type="range" min="-180" max="180" value={yaw} onChange={(e) => setYaw(Number(e.target.value))} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                        </div>
                        {/* PITCH */}
                        <div className="bg-[#252526] p-4 rounded border border-studio-border">
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold text-gray-400">PITCH (Y)</label>
                                <span className="text-xs text-green-400 font-mono">{pitch}°</span>
                            </div>
                            <input type="range" min="-90" max="90" value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
                        </div>
                        {/* ROLL */}
                        <div className="bg-[#252526] p-4 rounded border border-studio-border">
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold text-gray-400">ROLL (X)</label>
                                <span className="text-xs text-red-400 font-mono">{roll}°</span>
                            </div>
                            <input type="range" min="-180" max="180" value={roll} onChange={(e) => setRoll(Number(e.target.value))} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500" />
                        </div>
                    </div>

                    {/* TIMELINE */}
                    <div className="bg-[#252526] p-4 rounded border border-studio-border select-none">
                        <div className="mb-4">
                            <Timeline
                                duration={duration}
                                currentTime={progress}
                                loopIn={loopIn}
                                loopOut={loopOut}
                                isLooping={isLooping}
                                onSeek={handleSeek}
                                onLoopChange={handleLoopChange}
                            />
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => loadTrack(currentFileIndex - 1)}
                                    disabled={currentFileIndex === 0}
                                    className={`p-2 rounded-full transition-colors ${currentFileIndex === 0 ? 'text-gray-700' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                                >
                                    <SkipBack size={20} fill="currentColor" />
                                </button>

                                <button
                                    onClick={togglePlayPause}
                                    disabled={!isReady}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${!isReady ? 'bg-gray-800 text-gray-600 cursor-not-allowed' :
                                        isPlaying
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500'
                                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                        }`}
                                >
                                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                                </button>

                                <button
                                    onClick={() => loadTrack(currentFileIndex + 1)}
                                    disabled={currentFileIndex >= files.length - 1}
                                    className={`p-2 rounded-full transition-colors ${currentFileIndex >= files.length - 1 ? 'text-gray-700' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                                >
                                    <SkipForward size={20} fill="currentColor" />
                                </button>

                                <button
                                    onClick={() => performStop(false)}
                                    disabled={!isReady}
                                    className="w-10 h-10 rounded-full bg-gray-700 text-gray-400 hover:bg-gray-600 flex items-center justify-center hover:text-red-400 transition ml-2"
                                >
                                    <Square size={16} fill="currentColor" />
                                </button>

                                <div className="text-xs font-mono text-gray-500 ml-2">
                                    {formatTime(progress)} / {formatTime(duration)}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-[#1E1E1E] p-1 rounded-lg border border-studio-border">
                                <span className="text-[10px] font-bold text-gray-600 uppercase px-2">Looping</span>
                                <button
                                    onClick={handleLoopToggle}
                                    className={`p-2 rounded transition-colors ${isLooping ? 'bg-green-900/30 text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    <Repeat size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* STATUS BAR */}
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono px-2">
                        <span className="flex items-center gap-1"><Disc size={10} /> BINAURAL MONITOR</span>
                        <span className="flex items-center gap-1"><MoveHorizontal size={10} /> STATUS: {isReady ? "READY" : "WAITING"}</span>
                    </div>
                </div>
            )}
        </div>
    );
});

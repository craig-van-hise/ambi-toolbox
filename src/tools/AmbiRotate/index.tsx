import React, { useState, useEffect, useRef } from 'react';
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

export const AmbiRotateTool: React.FC<AmbiRotateToolProps> = ({
    files
}) => {
    // ------------------------------------------------------------------
    // STATE
    // ------------------------------------------------------------------
    // Queue State
    const [currentFileIndex, setCurrentFileIndex] = useState(0);

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
    // 1. FILE LOADING
    // ------------------------------------------------------------------
    useEffect(() => {
        if (files.length > 0) {
            setCurrentFileIndex(0);
            loadAudioFile(files[0]);
        }
        return () => performStop(true);
    }, [files]);

    const loadTrack = async (index: number) => {
        if (index < 0 || index >= files.length) return;

        performStop(true);
        setCurrentFileIndex(index);
        await loadAudioFile(files[index]);
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
            const totalSize = await window.electronAPI.getFileSize(filePath);
            const CHUNK_SIZE = 50 * 1024 * 1024;
            let offset = 0;
            const chunks: ArrayBuffer[] = [];

            while (offset < totalSize) {
                const sizeToRead = Math.min(CHUNK_SIZE, totalSize - offset);
                // Progress Feedback
                const percent = Math.round((offset / totalSize) * 100);
                setLoadingProgress(percent);
                setLoadingMessage(`Loading... ${percent}%`);

                const chunk = await window.electronAPI.readChunk(filePath, offset, sizeToRead);
                chunks.push(chunk);
                offset += sizeToRead;
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
            setLoadingMessage(`Error: ${err.message}`);
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
    // 2. TRANSPORT LOGIC (REPAIRED)
    // ------------------------------------------------------------------

    // Internal Helper: Stop Source with optional Fade Out
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

        // 1. SAFETY: Ensure any running source is stopped properly
        if (sourceNodeRef.current) {
            // Stop immediately (no fade) because we are about to restart
            try { sourceNodeRef.current.stop(); } catch (e) { }
            sourceNodeRef.current = null;
        }

        // 2. RESET GAIN (Silence before start)
        gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainRef.current.gain.setValueAtTime(0, ctx.currentTime);

        // 3. CREATE SOURCE
        const source = ctx.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.loop = isLooping;
        source.loopStart = loopIn;
        source.loopEnd = loopOut || audioBufferRef.current.duration;

        source.connect(nativeRotatorRef.current.input);

        // 4. START PLAYBACK
        // Use the startOffset explicitly
        source.start(0, startOffset);
        sourceNodeRef.current = source;

        // 5. FADE IN (Anti-Pop)
        gainRef.current.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.02);

        // 6. SYNC
        startTimeRef.current = ctx.currentTime - startOffset;
        setIsPlaying(true);
    };

    const performPause = () => {
        if (!audioContextRef.current || !isPlaying) return;
        const ctx = audioContextRef.current;

        // Calculate where we stopped
        let current = ctx.currentTime - startTimeRef.current;

        // Handle Loop Math for Offset Capture
        if (isLooping && loopOut > 0) {
            const length = loopOut - loopIn;
            if (length > 0) {
                // Naive unwrap
                if (current >= loopOut) {
                    const offset = (current - loopIn) % length;
                    current = loopIn + offset;
                } else if (current < loopIn && current > 0.1) {
                    // Usually shouldn't happen unless we started before loopIn
                }
            }
        }

        // Clamp to duration
        current = Math.max(0, Math.min(current, duration));

        // Save position
        pauseTimeRef.current = current;
        setProgress(current);

        // Stop with Fade
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
    // 3. UPDATES & ANIMATION (Robust Loop)
    // ------------------------------------------------------------------

    useEffect(() => {
        let frameId: number;
        const tick = () => {
            if (isPlaying && audioContextRef.current) {
                const ctx = audioContextRef.current;
                let current = ctx.currentTime - startTimeRef.current;

                // Visual Loop Logic
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

        if (isPlaying) {
            tick();
        }
        return () => cancelAnimationFrame(frameId);
    }, [isPlaying, isLooping, loopIn, loopOut, duration]);

    // Rotation Updates
    useEffect(() => {
        if (nativeRotatorRef.current) {
            nativeRotatorRef.current.setRotation(yaw, pitch, roll);
        }
    }, [yaw, pitch, roll]);


    // ------------------------------------------------------------------
    // EVENT HANDLERS (Timeline)
    // ------------------------------------------------------------------
    const handleSeek = (time: number) => {
        // 1. Update UI
        setProgress(time);

        // 2. Update Internal State
        pauseTimeRef.current = time;

        // 3. If playing, restart immediately at new time (Responsive Seek)
        if (isPlaying) {
            playAudio(time);
        }
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
        if (sourceNodeRef.current) {
            sourceNodeRef.current.loop = newVal;
        }
    };

    // ------------------------------------------------------------------
    // RENDER LOGIC (Backend Wiring)
    // ------------------------------------------------------------------
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
            // alert("Render Failed. See console.");
        } finally {
            setIsProcessing(false);
        }
    };

    // ------------------------------------------------------------------
    // UI HELPERS
    // ------------------------------------------------------------------
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 10);
        return `${m}:${s.toString().padStart(2, '0')}.${ms}`;
    };

    // ------------------------------------------------------------------
    // QUICK ACTIONS
    // ------------------------------------------------------------------
    const doUpsideDown = () => setRoll(Math.abs(roll - 180) < 1 ? 0 : 180);
    const doRotate180 = () => setYaw(Math.abs(yaw - 180) < 1 ? 0 : 180);
    const doLayFlat = () => setPitch(Math.abs(pitch - 90) < 1 ? 0 : 90);
    const doReset = () => { setYaw(0); setPitch(0); setRoll(0); };

    const getBtnClass = (isActive: boolean) =>
        `px-3 py-1.5 rounded text-xs font-bold transition-all border ${isActive
            ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]'
            : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
        }`;

    // ------------------------------------------------------------------
    // RENDER
    // ------------------------------------------------------------------
    return (
        <div className="relative bg-[#1E1E1E] rounded-lg p-6 border border-studio-border shadow-xl">
            {/* LOADING OVERLAY */}
            {isLoading && (
                <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
                    <div className="text-blue-400 font-mono text-xl mb-4 animate-pulse">SYSTEM LOADING</div>
                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-75" style={{ width: `${loadingProgress}%` }} />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">{loadingMessage}</div>
                </div>
            )}

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <RotateCw className="w-5 h-5 text-blue-400" />
                    <h2 className="text-lg font-bold text-white">AmbiRotate <span className="text-xs font-normal text-gray-500 ml-2">PRO</span></h2>
                </div>
                <div className="text-xs font-mono text-gray-500">
                    {files.length > 0 ? (
                        <span>
                            <span className="text-gray-600 mr-2">TRACK {currentFileIndex + 1}/{files.length}:</span>
                            {files[currentFileIndex].name}
                        </span>
                    ) : (
                        "NO MEDIA"
                    )}
                </div>
            </div>

            <div className={`space-y-6 transition-opacity duration-300 ${isLoading ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>

                {/* 1. QUICK ACTIONS */}
                <div className="flex gap-2">
                    <button onClick={doUpsideDown} className={getBtnClass(Math.abs(roll - 180) < 1)}>Upside Down</button>
                    <button onClick={doRotate180} className={getBtnClass(Math.abs(yaw - 180) < 1)}>Rotate 180</button>
                    <button onClick={doLayFlat} className={getBtnClass(Math.abs(pitch - 90) < 1)}>Lay Flat</button>
                    <button onClick={doReset} className="ml-auto bg-red-900/30 hover:bg-red-900/50 text-xs px-3 py-1.5 rounded text-red-300 border border-red-900/50 transition flex items-center gap-1">
                        <Trash2 size={12} /> Reset
                    </button>
                </div>

                {/* 2. SLIDERS */}
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

                {/* 3. PRO TIMELINE */}
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
                            {/* Prev */}
                            <button
                                onClick={() => loadTrack(currentFileIndex - 1)}
                                disabled={currentFileIndex === 0}
                                className={`p-2 rounded-full transition-colors ${currentFileIndex === 0 ? 'text-gray-700' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                            >
                                <SkipBack size={20} fill="currentColor" />
                            </button>

                            {/* Play/Pause */}
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

                            {/* Next */}
                            <button
                                onClick={() => loadTrack(currentFileIndex + 1)}
                                disabled={currentFileIndex >= files.length - 1}
                                className={`p-2 rounded-full transition-colors ${currentFileIndex >= files.length - 1 ? 'text-gray-700' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                            >
                                <SkipForward size={20} fill="currentColor" />
                            </button>

                            {/* Stop */}
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

                        {/* Loop */}
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

                {/* --- ACTION AREA (RESTORED) --- */}
                <div className="mt-8 pt-6 border-t border-studio-panel-light flex items-center justify-between">

                    {/* Status Text */}
                    <div className="text-sm text-gray-400">
                        <span>{files.length > 0 ? `${files.length} file(s) ready` : 'No files loaded'}</span>
                    </div>

                    {/* RENDER BUTTON (Red) */}
                    <button
                        onClick={handleRender}
                        disabled={files.length === 0 || isProcessing}
                        className={`
                            px-8 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2 transition-all
                            ${files.length === 0 || isProcessing
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-500 text-white hover:scale-105 active:scale-95 shadow-red-900/50'
                            }
                        `}
                    >
                        {isProcessing ? (
                            <>
                                {/* Spinner SVG */}
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Rendering...
                            </>
                        ) : (
                            <>
                                {/* Download/Export Icon */}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Render Rotated File(s)
                            </>
                        )}
                    </button>
                </div>

                {/* FOOTER */}
                <div className="flex justify-between text-[10px] text-gray-500 font-mono px-2">
                    <span className="flex items-center gap-1"><Disc size={10} /> STEREO MONITOR</span>
                    <span className="flex items-center gap-1"><MoveHorizontal size={10} /> STATUS: {isReady ? "READY" : "WAITING"}</span>
                </div>
            </div>
        </div>
    );
};

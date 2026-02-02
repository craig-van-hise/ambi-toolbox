import React, { useState, useEffect, useRef } from 'react';
import { ToolDefinition } from '../../types';
import { RotateCw, Play, Square, Compass } from 'lucide-react';
import { WavDecoder } from '../../utils/WavDecoder';
import { NativeRotator } from './NativeRotator';


interface AmbiRotateToolProps {
    tool: ToolDefinition;
    files: File[]; // Received from parent
    onRun: (options: any) => void;
    isProcessing: boolean;
}

export const AmbiRotateTool: React.FC<AmbiRotateToolProps> = ({ tool, files, onRun, isProcessing }) => {
    // Rotation States
    const [yaw, setYaw] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [roll, setRoll] = useState(0);

    // Derived States for Buttons (Two-Way Binding)
    const isUpsideDown = Math.abs(roll) === 180;
    const isRotated180 = Math.abs(yaw) === 180;
    const isLayingFlat = Math.abs(pitch) === 90;

    // Audio State
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New Loading State
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLooping, setIsLooping] = useState(false);

    // Audio Graph Refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const nativeRotatorRef = useRef<NativeRotator | null>(null); // Native DSP
    const gainRef = useRef<GainNode | null>(null);

    const startTimeRef = useRef<number>(0);
    const pauseTimeRef = useRef<number>(0);
    const animationFrameRef = useRef<number>(0);
    const audioBufferRef = useRef<AudioBuffer | null>(null);

    // Debug Diagnostics (PRP #12)
    const [debugLogs, setDebugLogs] = useState<string[]>([]);

    const logDebug = (msg: string) => {
        console.log(msg);
        setDebugLogs(prev => [...prev.slice(-49), `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    const runTestTone = () => {
        logDebug("--- Test Tone Triggered ---");
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            logDebug(`Test Context Created: ${ctx.state}`);

            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.connect(ctx.destination);
            osc.start();
            logDebug("Oscillator Started (440Hz)");

            setTimeout(() => {
                osc.stop();
                logDebug("Oscillator Stopped");
                ctx.close();
            }, 500);
        } catch (e: any) {
            logDebug(`Test Tone Error: ${e.message}`);
        }
    };



    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopAudio();
            cancelAnimationFrame(animationFrameRef.current);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const stopAudio = () => {
        if (sourceNodeRef.current) {
            try {
                sourceNodeRef.current.stop();
                sourceNodeRef.current.disconnect();
            } catch (e) { }
            sourceNodeRef.current = null;
        }
        setIsPlaying(false);
        cancelAnimationFrame(animationFrameRef.current);
    };

    // ------------------------------------------------------------------
    // 1. File Loading Logic (Immediate on Drop)
    // ------------------------------------------------------------------
    useEffect(() => {
        if (files.length > 0) {
            loadAudioFile(files[0]);
        }
    }, [files]);

    const loadAudioFile = async (file: any) => {
        if (!file) return;

        setIsLoading(true);
        stopAudio();
        setDebugLogs([]); // Clear previous logs

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        try {
            const filePath = file.path;
            logDebug(`Starting load for: ${file.name}`);

            // 1. Chunked Read
            const totalSize = await window.electron.getFileSize(filePath);
            const CHUNK_SIZE = 50 * 1024 * 1024; // 50MB
            let offset = 0;
            const chunks: ArrayBuffer[] = [];

            while (offset < totalSize) {
                const sizeToRead = Math.min(CHUNK_SIZE, totalSize - offset);
                setDebugLogs(prev => [`Reading ${Math.round((offset / totalSize) * 100)}%...`, ...prev]);
                const chunk = await window.electron.readChunk(filePath, offset, sizeToRead);
                chunks.push(chunk);
                offset += sizeToRead;
            }

            // 2. Reassemble
            logDebug("Reassembling buffer...");
            const totalBuffer = new Uint8Array(totalSize);
            let writeOffset = 0;
            for (const chunk of chunks) {
                totalBuffer.set(new Uint8Array(chunk), writeOffset);
                writeOffset += chunk.byteLength;
            }
            const rawBuffer = totalBuffer.buffer;

            // 3. Decode (Manual)
            logDebug("Decoding (WavDecoder)...");
            const buffer = WavDecoder.decode(rawBuffer, audioContextRef.current);
            logDebug(`Decode Parsed: ${buffer.numberOfChannels}ch, ${buffer.duration.toFixed(2)}s`);

            // 4. Use Full Buffer (PRP #26 Update)
            audioBufferRef.current = buffer;
            setDuration(buffer.duration);

            // 5. Initialize Native Spatial Engine (Arbitrary Order)
            // Note: We use the ACTUAL buffer channel count.
            // NativeRotator will automatically compute pairs.
            logDebug(`Initializing Native DSP Engine (Order agnostic, ${buffer.numberOfChannels}ch)...`);

            try {
                // Instantiating NativeRotator with full channel count
                nativeRotatorRef.current = new NativeRotator(audioContextRef.current, buffer.numberOfChannels);
                logDebug("NativeRotator Initialized.");

                // Initialize Rotation
                nativeRotatorRef.current.setRotation(yaw);

            } catch (e: any) {
                console.error("Native Engine Crash:", e);
                logDebug(`❌ Native Engine Failed: ${e.message}`);
                // Fallback to null?
                nativeRotatorRef.current = null;
            }

            logDebug("Ready to Play (Infinite Order Native DSP).");

        } catch (err: any) {
            logDebug(`Error: ${err.message}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // ------------------------------------------------------------------
    // 2. Live Rotation Logic (The "Link")
    // ------------------------------------------------------------------
    useEffect(() => {
        if (nativeRotatorRef.current) {
            // NativeRotator uses Degrees directly
            nativeRotatorRef.current.setRotation(yaw);
        }
    }, [yaw]); // Pitch/Roll ignored by NativeRotator (Yaw-only)

    // ------------------------------------------------------------------
    // 3. Playback Logic (Graph Injection)
    // ------------------------------------------------------------------
    const playAudio = async (startOffset = 0) => {
        if (!audioBufferRef.current || !audioContextRef.current) return;

        if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        stopAudio();

        const ctx = audioContextRef.current;
        const source = ctx.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.loop = isLooping;

        // --- Build Graph: Source -> NativeRotator -> Gain -> Dest ---

        // Ensure Gain Node exists
        if (!gainRef.current) {
            gainRef.current = ctx.createGain();
            gainRef.current.gain.value = 1.0;
        }

        if (nativeRotatorRef.current) {
            logDebug("Routing[Native]: Source -> Rotator -> Monitor -> Gain -> Out");

            source.connect(nativeRotatorRef.current.input);
            nativeRotatorRef.current.output.connect(gainRef.current);
            gainRef.current.connect(ctx.destination);

        } else {
            // Fallback (Direct Mono - W Channel only)
            logDebug("Routing[Fallback]: Source -> Splitter(W) -> Gain -> Out (No Spatial)");

            const splitter = ctx.createChannelSplitter(Math.min(audioBufferRef.current.numberOfChannels, 4));
            // Safely split at least 1 channel
            source.connect(splitter);

            const monoGain = ctx.createGain();
            monoGain.gain.value = 0.707;

            splitter.connect(monoGain, 0); // W-channel
            monoGain.connect(gainRef.current);
            gainRef.current.connect(ctx.destination);
        }

        source.onended = () => {
            // Only stop if natural end and not looping
            // (Logic handled in animation loop usually)
        };

        const scheduledTime = ctx.currentTime;
        source.start(scheduledTime, startOffset);
        sourceNodeRef.current = source;
        startTimeRef.current = scheduledTime - startOffset;

        setIsPlaying(true);

        // Animation Loop
        const update = () => {
            if (ctx.state !== 'running' || !sourceNodeRef.current) return;

            const current = ctx.currentTime - startTimeRef.current;
            let displayTime = current;

            if (isLooping && duration > 0) {
                displayTime = current % duration;
            } else if (displayTime > duration) {
                setIsPlaying(false);
                setProgress(duration);
                stopAudio();
                return;
            }

            setProgress(displayTime);
            animationFrameRef.current = requestAnimationFrame(update);
        };
        animationFrameRef.current = requestAnimationFrame(update);
    };

    const togglePlayback = () => {
        if (isPlaying) {
            // Pause
            stopAudio();
            pauseTimeRef.current = progress; // Store current pos
        } else {
            // Play
            playAudio(pauseTimeRef.current >= duration ? 0 : pauseTimeRef.current);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        pauseTimeRef.current = time;
        setProgress(time);
        if (isPlaying) {
            playAudio(time);
        }
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
        if (sourceNodeRef.current) {
            sourceNodeRef.current.loop = !isLooping;
        }
    };



    // Preset Toggle Logic (Macro)
    const toggleMacro = (currentVal: number, targetVal: number, setter: (v: number) => void) => {
        if (Math.abs(currentVal) === targetVal) {
            setter(0);
        } else {
            setter(targetVal);
        }
    };

    const formatTime = (t: number) => {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        const ms = Math.floor((t % 1) * 1000);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    };

    const SliderControl = ({ label, value, min, max, onChange }: any) => (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">{label}</label>
                <span className="text-xs font-mono text-white bg-[#1E1E1E] px-2 py-0.5 rounded border border-studio-border">
                    {value > 0 ? '+' : ''}{value}°
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1E1E1E] rounded-lg appearance-none cursor-pointer accent-red-500"
            />
        </div>
    );

    return (
        <div className="flex flex-col h-full relative">
            <div className="flex-1 overflow-y-auto pb-24">
                <div className="max-w-xl">
                    <div className="bg-[#252526] p-6 rounded-lg border border-studio-border mb-6">

                        {/* Header & Reset */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Rotation Parameters</h3>
                            <div className="flex items-center">
                                <button
                                    onClick={() => {
                                        setYaw(0); setPitch(0); setRoll(0);
                                    }}
                                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                                >
                                    <RotateCw className="w-3 h-3" /> Reset
                                </button>
                                <button
                                    onClick={runTestTone}
                                    className="ml-4 text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition-colors border border-yellow-500/30 px-2 py-0.5 rounded"
                                >
                                    🔊 Test Tone
                                </button>
                            </div>
                        </div>

                        {/* Visualizer (Use Effective Values) */}
                        <div className="flex justify-center mb-8 relative">
                            <div className="w-24 h-24 rounded-full border-2 border-gray-600 flex items-center justify-center relative bg-[#1E1E1E]"
                                style={{ transform: `rotate(${-yaw}deg)` }}>
                                <Compass className="w-12 h-12 text-gray-400 opacity-20" />
                                {/* Tick Mark for Front */}
                                <div className="absolute top-0 w-1 h-3 bg-red-500"></div>
                            </div>
                            {/* Roll/Pitch Indicators (Abstract) */}
                            <div className="absolute top-0 right-0 text-[10px] text-gray-500 font-mono">
                                <div>P: {pitch}°</div>
                                <div>R: {roll}°</div>
                            </div>
                        </div>

                        {/* Sliders (Base Values) */}
                        <SliderControl label="Yaw (Z-Axis)" value={yaw} min={-180} max={180} onChange={setYaw} />
                        <SliderControl label="Pitch (Y-Axis)" value={pitch} min={-90} max={90} onChange={setPitch} />
                        <SliderControl label="Roll (X-Axis)" value={roll} min={-180} max={180} onChange={setRoll} />

                        {/* Macro Toggles */}
                        <div className="grid grid-cols-3 gap-2 mt-6">
                            <button
                                onClick={() => toggleMacro(roll, 180, setRoll)}
                                className={`px-3 py-2 border border-studio-border rounded text-xs transition-colors ${isUpsideDown ? 'bg-red-500 text-white border-red-500' : 'bg-[#1E1E1E] text-gray-300 hover:bg-white/5'}`}
                            >
                                Upside Down
                            </button>
                            <button
                                onClick={() => toggleMacro(yaw, 180, setYaw)}
                                className={`px-3 py-2 border border-studio-border rounded text-xs transition-colors ${isRotated180 ? 'bg-red-500 text-white border-red-500' : 'bg-[#1E1E1E] text-gray-300 hover:bg-white/5'}`}
                            >
                                Rotate 180°
                            </button>
                            <button
                                onClick={() => toggleMacro(pitch, 90, setPitch)}
                                className={`px-3 py-2 border border-studio-border rounded text-xs transition-colors ${isLayingFlat ? 'bg-red-500 text-white border-red-500' : 'bg-[#1E1E1E] text-gray-300 hover:bg-white/5'}`}
                            >
                                Lay Flat
                            </button>
                        </div>

                    </div>

                    <button
                        onClick={() => onRun({
                            inputPath: files[0] ? (files[0] as any).path : '',
                            yaw: yaw,
                            pitch: pitch,
                            roll: roll
                        })}
                        disabled={isProcessing || isLoading || files.length === 0}
                        className={`w-full py-3 rounded font-medium text-white transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}>
                        {isLoading ? 'Decoding Audio...' : isProcessing ? 'Rendering Export...' : 'Render Rotated File'}
                    </button>

                    {/* Debug Logs (PRP #12) */}
                    <div className="mt-8 p-4 bg-black/50 rounded border border-red-500/30 font-mono text-[10px] text-red-300 h-48 overflow-y-auto">
                        <div className="flex justify-between mb-2 border-b border-red-500/20 pb-1">
                            <strong>Diagnostics Log</strong>
                            <span>Native DSP: Active (Infinite)</span>
                        </div>
                        {debugLogs.map((log, i) => (
                            <div key={i} className="whitespace-pre-wrap font-mono opacity-80 border-b border-white/5 py-0.5">{log}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Transport Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#252526] border-t border-red-500/30 p-4 shadow-2xl">
                <div className="flex flex-col gap-2 max-w-2xl">
                    {/* Scrubber */}
                    <input
                        type="range"
                        min={0}
                        max={duration || 1}
                        step={0.01}
                        value={progress}
                        onChange={handleSeek}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={stopAudio}
                                className="p-2 rounded-full hover:bg-white/10 text-white"
                                title="Stop"
                            >
                                <Square className="w-4 h-4 fill-current" />
                            </button>
                            <button
                                onClick={togglePlayback}
                                className="p-3 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg"
                                title={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <Square className="w-5 h-5 fill-current ml-0.5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                            </button>
                            <button
                                onClick={toggleLoop}
                                className={`p-2 rounded-full transition-colors ${isLooping ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/10 text-gray-400'}`}
                                title="Toggle Loop"
                            >
                                <RotateCw className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 flex justify-between text-[10px] text-gray-400 font-mono">
                            <span>{formatTime(progress)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>

                        <div className="text-xs font-bold text-red-500 uppercase tracking-wider">
                            {files.length > 0 ? "Preview Active" : "No Media"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

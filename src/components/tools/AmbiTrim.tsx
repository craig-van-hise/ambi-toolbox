
import React, { useState, useRef, useEffect } from 'react';
import { ToolDefinition } from '../../types';
import { SmartDropZone } from '../SmartDropZone';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin, { Region } from 'wavesurfer.js/dist/plugins/regions.js';
import { useSettings } from '../../contexts/SettingsContext';
import './AmbiTrim.css'; // PRP #62/63: Custom Styles (kept for fallback)
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { TimeInput } from './TimeInput';

interface AmbiTrimProps {
    tool: ToolDefinition;
}

export const AmbiTrim: React.FC<AmbiTrimProps> = ({ tool: _tool }) => {
    const { settings } = useSettings();
    const [file, setFile] = useState<File | null>(null);
    const [proxyPath, setProxyPath] = useState<string | null>(null);
    const [isGeneratingProxy, setIsGeneratingProxy] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [statusMsg, setStatusMsg] = useState<string | null>(null);

    // PRP #63: Editor State
    const [zoomLevel, setZoomLevel] = useState(0); // 0 = Fit to Screen
    const [isPlaying, setIsPlaying] = useState(false);

    // WaveSurfer refs
    const containerRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const regions = useRef<RegionsPlugin | null>(null);

    // Region State
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [_duration, setDuration] = useState(0);

    // -------------------------------------------------------------------------
    // PRP #70: PRECISION NUCLEAR STYLING (JS + Geometry Correction)
    // -------------------------------------------------------------------------
    const styleRegion = (region: Region) => {
        // 1. Get the main region element
        const el = region.element;
        if (!el) return;

        // 2. FORCE KILL BORDERS (Ghost Line Fix)
        el.style.border = '0';
        el.style.borderLeft = '0';
        el.style.borderRight = '0';
        el.style.backgroundColor = 'rgba(20, 184, 166, 0.25)'; // Visible Teal

        // 3. Find and Style Handles
        // We look for elements with the 'part' attribute containing 'region-handle'
        const handles = el.querySelectorAll('[part*="region-handle"]');

        handles.forEach((handleNode) => {
            const handle = handleNode as HTMLElement;
            // Identify side based on class or part attribute
            // WaveSurfer regions usually have 'region-handle-left' or 'region-handle-right' in the part string
            const partAttr = handle.getAttribute('part') || '';
            const isLeft = partAttr.includes('left') || handle.dataset.regionHandle === 'start';
            const isRight = partAttr.includes('right') || handle.dataset.regionHandle === 'end';

            // A. Handle Container (Hit Zone) - Transparent & 24px
            handle.style.width = '24px';
            handle.style.backgroundColor = 'transparent'; // KILL DARK STRIP
            handle.style.border = '0';
            handle.style.outline = 'none';
            handle.style.cursor = 'ew-resize';

            // Clear previous injections
            handle.innerHTML = '';

            // B. The Pole (White Line)
            const pole = document.createElement('div');
            pole.style.position = 'absolute';
            pole.style.top = '0';
            pole.style.bottom = '0';
            pole.style.width = '2px';
            pole.style.backgroundColor = 'white';
            pole.style.pointerEvents = 'none';
            pole.style.zIndex = '15';

            // C. The Flag (Triangle)
            const flag = document.createElement('div');
            flag.style.position = 'absolute';
            flag.style.top = '0';
            flag.style.width = '14px';
            flag.style.height = '14px';
            flag.style.backgroundColor = '#14b8a6'; // Teal
            flag.style.pointerEvents = 'none';
            flag.style.zIndex = '20';
            flag.style.transition = 'transform 0.1s, background-color 0.1s';

            // D. GEOMETRY CORRECTION (PRP #69 Logic applied in JS)
            if (isLeft) {
                // ALIGN TO LEFT (Start)
                pole.style.left = '0';
                pole.style.right = 'auto';
                pole.style.transform = 'none';

                flag.style.left = '0';
                flag.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)'; // Point Right
            } else if (isRight) {
                // ALIGN TO RIGHT (End)
                pole.style.right = '0';
                pole.style.left = 'auto';
                pole.style.transform = 'none';

                flag.style.right = '0';
                flag.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)'; // Point Left
            }

            // Hover Effects
            handle.onmouseenter = () => {
                flag.style.backgroundColor = 'white';
                flag.style.transform = 'scale(1.1)';
                // Pole stays white
            };
            handle.onmouseleave = () => {
                flag.style.backgroundColor = '#14b8a6';
                flag.style.transform = 'scale(1)';
            };

            handle.appendChild(pole);
            handle.appendChild(flag);
        });
    };
    // -------------------------------------------------------------------------


    // PRP #63: Zoom Logic (Fit to Screen)
    const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!wavesurfer.current || !containerRef.current) return;

        const value = Number(e.target.value); // 0 to 100
        setZoomLevel(value);

        const duration = wavesurfer.current.getDuration();
        const width = containerRef.current.clientWidth;

        if (value === 0) {
            // FIT TO SCREEN MODE: pxPerSec = containerWidth / duration
            if (duration > 0) {
                const fitRatio = width / duration;
                wavesurfer.current.zoom(fitRatio);
            }
        } else {
            // ZOOMED MODE: Scale up exponentially
            wavesurfer.current.zoom(value * 5);
        }
    };

    const togglePlay = () => {
        wavesurfer.current?.playPause();
    };

    // Initialize WaveSurfer when proxyPath is ready
    useEffect(() => {
        if (!proxyPath || !containerRef.current) return;

        let active = true;
        let ws: WaveSurfer | null = null;
        let resizeTimeout: any;

        // Cleanup previous instance if it exists (safeguard)
        if (wavesurfer.current) {
            try {
                wavesurfer.current.destroy();
            } catch (e) {
                console.warn("Cleanup error:", e);
            }
            wavesurfer.current = null;
        }

        try {
            // Create Regions Plugin
            const wsRegions = RegionsPlugin.create();
            regions.current = wsRegions;

            // PRP #63: Interaction Config
            requestAnimationFrame(() => {
                if (!active || !containerRef.current) return;

                ws = WaveSurfer.create({
                    container: containerRef.current,
                    waveColor: '#2DD4BF', // Teal-400
                    progressColor: '#115E59', // Teal-800
                    cursorColor: '#FF0000', // RED Playhead
                    cursorWidth: 2,
                    barWidth: 2,
                    height: containerRef.current.clientHeight || 128,
                    minPxPerSec: 0,
                    fillParent: true,
                    interact: true,
                    dragToSeek: true,
                    autoScroll: true,
                    autoCenter: true,
                    normalize: true,
                    backend: 'WebAudio',
                    plugins: [wsRegions],
                });

                ws.on('error', (err: any) => {
                    console.error("Wavesurfer Error:", err);
                    if (active) setStatusMsg("Waveform Error: " + (err.message || err));
                });

                ws.on('play', () => { if (active) setIsPlaying(true); });
                ws.on('pause', () => { if (active) setIsPlaying(false); });
                ws.on('finish', () => { if (active) setIsPlaying(false); });

                wavesurfer.current = ws;

                // Load audio
                ws.load(proxyPath);

                // On Ready
                ws.on('ready', () => {
                    if (!active || !ws) return;
                    const dur = ws.getDuration();
                    setDuration(dur);

                    // PRP #64: Force Default Region
                    wsRegions.clearRegions();

                    // Create Region (Full Range)
                    const newRegion = wsRegions.addRegion({
                        start: 0,
                        end: dur,
                        color: 'rgba(45, 212, 191, 0.3)', // Teal-400 transparent
                        drag: true,
                        resize: true,
                    });

                    // APPLY PRECISION NUCLEAR STYLING
                    styleRegion(newRegion);

                    setStartTime(0);
                    setEndTime(dur);

                    // Initial Fit-To-Screen check if accessible
                    if (containerRef.current) {
                        try {
                            const width = containerRef.current.clientWidth;
                            if (dur > 0) ws.zoom(width / dur);
                        } catch (e) { console.warn("Zoom error during ready:", e); }
                    }
                });

                // Listen for any new regions (style them immediately)
                wsRegions.on('region-created', (region) => {
                    styleRegion(region);
                });

                wsRegions.on('region-updated', (region) => {
                    if (active) {
                        setStartTime(region.start);
                        setEndTime(region.end);
                    }
                });
            });

        } catch (e: any) {
            console.error("WaveSurfer Init Error:", e);
            setStatusMsg("Init Error: " + e.message);
        }

        // ResizeObserver
        const observer = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (active && wavesurfer.current && containerRef.current) {
                    try {
                        const instance = wavesurfer.current as any;
                        if (instance && !instance.isDestroyed) {
                            instance.setOptions({ height: containerRef.current.clientHeight });
                        }
                    } catch (e) {
                        console.warn("Resize error", e);
                    }
                }
            }, 100);
        });

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            active = false;
            observer.disconnect();
            clearTimeout(resizeTimeout);
            if (wavesurfer.current) {
                try {
                    wavesurfer.current.destroy();
                } catch (e) {
                    console.error("Destroy error:", e);
                }
                wavesurfer.current = null;
            }
        };
    }, [proxyPath]);

    const handleFilesDropped = async (files: File[]) => {
        if (files.length === 0) return;
        const f = files[0];
        setFile(f);
        setStatusMsg(null);
        setIsGeneratingProxy(true);

        try {
            const path = (f as any).path;
            if (!path) throw new Error("File has no path (browser limitation?)");

            // Call Backend
            const rawData = await window.electronAPI.trim.generateProxy(path) as any;
            const isUint8 = rawData instanceof Uint8Array;

            // Blob creation
            let blob: Blob;
            if (isUint8) {
                blob = new Blob([rawData as any], { type: 'audio/mp3' });
            } else {
                blob = new Blob([new Uint8Array(rawData)], { type: 'audio/mp3' });
            }

            setProxyPath(URL.createObjectURL(blob));

        } catch (err: any) {
            console.error("Proxy Gen Error:", err);
            setStatusMsg("Error: " + err.message);
            setFile(null);
        } finally {
            setIsGeneratingProxy(false);
        }
    };

    const handleExport = async () => {
        if (!file || !startTime || !endTime) return;
        setIsExporting(true);
        setStatusMsg("Exporting...");

        try {
            const originalPath = (file as any).path;
            const outputDir = settings.outputMode === 'custom' ? settings.customOutputDir : undefined;

            await window.electronAPI.trim.executeTrim(
                originalPath,
                startTime,
                endTime,
                outputDir || (originalPath.split('/').slice(0, -1).join('/'))
            );

            setStatusMsg("Success! File trimmed.");
        } catch (err: any) {
            console.error("Trim Error:", err);
            setStatusMsg("Export Failed: " + err.message);
        } finally {
            setIsExporting(false);
        }
    };

    // Time formatting helper


    return (
        <div className="flex flex-col h-full bg-[#18181b] text-white">

            {/* PRP #70: CSS Fallbacks (mostly generic) */}
            <style>{`
              #waveform-container ::part(cursor) {
                width: 2px !important;
                background-color: #ff0000 !important;
              }
              /* We handle the tricky region/handle stuff in JS now */
            `}</style>

            {/* ... Rest of JSX same as before ... */}

            {/* SECTION A: HEADER (Static) */}
            <div className="px-8 pt-8 pb-6">
                <header>
                    <h2 className="text-3xl font-bold mb-2 text-teal-400">
                        AmbiTrim
                    </h2>
                    <p className="text-gray-400 text-lg font-light">
                        Lossless trimming for Ambisonic master files.
                    </p>
                </header>
            </div>

            {/* SECTION B: THE WORKSPACE (Dynamic - Flex Grow) */}
            <div className="flex-1 relative min-h-0 w-full flex flex-col px-8 pb-4">
                {!file ? (
                    // STATE 1: Empty DropZone
                    <div className="h-full border-2 border-dashed border-studio-border rounded-xl flex items-center justify-center bg-[#1E1E1E] overflow-hidden">
                        <SmartDropZone
                            className="w-full h-full border-none"
                            label=".wav, .amb, .caf, .opus, .ogg, .mp3, .flac, .aac accepted"
                            onFilesLoaded={(files) => {
                                const processed = files.map(f => {
                                    if (typeof f === 'string') {
                                        return { name: window.electronAPI ? f.split(/[/\\]/).pop() : f, path: f } as any as File;
                                    }
                                    return f;
                                });
                                handleFilesDropped(processed as File[]);
                            }}
                            onDrop={(e) => {
                                if (e.dataTransfer.files) handleFilesDropped(Array.from(e.dataTransfer.files));
                            }}
                        />
                    </div>
                ) : (
                    // STATE 2: SANDWICH EDITOR INTERFACE (PRP #63)
                    <div className="w-full h-full flex flex-col bg-[#1E1E1E] rounded-lg shadow-inner border border-studio-border overflow-hidden">

                        {/* 1. TOP BAR: Info & Zoom */}
                        <div className="flex-none flex justify-between items-center px-4 py-2 border-b border-studio-border bg-[#27272a]">
                            <div className="flex items-center gap-6">
                                <span className="font-mono text-sm text-teal-300 truncate max-w-[200px]">{file.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400 font-bold uppercase">Zoom</span>
                                    <input
                                        type="range" min="0" max="100" value={zoomLevel}
                                        onChange={handleZoom}
                                        className="w-32 accent-teal-500 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                        title="0 = Fit to Screen"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setFile(null);
                                    setProxyPath(null);
                                    if (wavesurfer.current) wavesurfer.current.destroy();
                                }}
                                className="text-xs text-red-400 hover:text-red-300 underline"
                            >
                                CLOSE
                            </button>
                        </div>

                        {/* 2. MIDDLE: The Waveform (Flex-Grow) */}
                        <div className="flex-1 relative bg-[#18181b] overflow-hidden">
                            {isGeneratingProxy ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-20 bg-[#18181b]/80">
                                    <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-teal-300 font-medium animate-pulse">Generating Waveform...</span>
                                </div>
                            ) : null}

                            {/* The Canvas Container */}
                            <div ref={containerRef} className="w-full h-full" id="waveform-container"></div>
                        </div>

                        {/* 3. BOTTOM BAR: Transport & Time */}
                        <div className="flex-none p-4 bg-[#27272a] border-t border-studio-border">
                            <div className="flex justify-center mb-4">
                                <button
                                    onClick={togglePlay}
                                    className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition-colors shadow-lg"
                                >
                                    {isPlaying ? (
                                        <PauseIcon className="w-6 h-6" />
                                    ) : (
                                        <PlayIcon className="w-6 h-6" />
                                    )}
                                </button>
                            </div>

                            {/* Time Inputs */}
                            <div className="grid grid-cols-2 gap-4">
                                <TimeInput
                                    label="Start Time"
                                    value={startTime}
                                    min={0}
                                    max={endTime}
                                    onChange={(val) => {
                                        setStartTime(val);
                                        // Update Region
                                        if (regions.current) {
                                            const r = regions.current.getRegions()[0];
                                            if (r) {
                                                r.setOptions({ start: val, end: endTime });
                                                styleRegion(r); // Re-apply styles if needed
                                            }
                                        }
                                    }}
                                />
                                <TimeInput
                                    label="End Time"
                                    value={endTime}
                                    min={startTime}
                                    max={_duration}
                                    onChange={(val) => {
                                        setEndTime(val);
                                        // Update Region
                                        if (regions.current) {
                                            const r = regions.current.getRegions()[0];
                                            if (r) {
                                                r.setOptions({ start: startTime, end: val });
                                                styleRegion(r);
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* SECTION C: THE CONTROL DECK (Main Export Button) */}
            <div className="flex-none shadow-[0_-4px_20px_rgba(0,0,0,0.5)] border-t border-studio-border bg-[#18181b] p-6 z-30">
                <div className="max-w-4xl mx-auto flex flex-col gap-6">
                    {/* Status Bar */}
                    {statusMsg && (
                        <div className={`p-3 rounded text-sm font-mono border text-center ${statusMsg.includes("Success") ? "bg-green-900/20 border-green-900/50 text-green-300" : statusMsg.includes("Error") || statusMsg.includes("Failed") ? "bg-red-900/20 border-red-900/50 text-red-300" : "bg-blue-900/20 border-blue-900/50 text-blue-300"}`}>
                            {statusMsg}
                        </div>
                    )}

                    <button
                        onClick={handleExport}
                        disabled={!file || isGeneratingProxy || isExporting}
                        className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                        ${!file || isGeneratingProxy || isExporting
                                ? 'bg-gray-700 text-gray-500'
                                : 'bg-teal-600 hover:bg-teal-700'
                            }`}
                    >
                        {isExporting ? 'Exporting...' : 'Export Trimmed File'}
                    </button>
                </div>
            </div>
        </div>
    );
};

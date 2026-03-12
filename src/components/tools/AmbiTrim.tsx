
import React, { useState, useRef, useEffect } from 'react';
import { ToolDefinition } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';
import { useTransport } from '../../contexts/TransportContext';
import { useFileQueue } from '../../hooks/useFileQueue';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin, { Region } from 'wavesurfer.js/dist/plugins/regions.js';
import './AmbiTrim.css'; 


export interface AmbiTrimProps {
    tool: ToolDefinition;
}

export interface AmbiTrimHandle {
    executeTrim: () => Promise<void>;
}

export const AmbiTrim = React.forwardRef<AmbiTrimHandle, AmbiTrimProps>(({ tool: _tool }, ref) => {
    const { settings } = useSettings();
    const { currentTime, isPlaying, commitSeek } = useTransport();
    const { activeFile } = useFileQueue();
    const [proxyPath, setProxyPath] = useState<string | null>(null);
    const [isGeneratingProxy, setIsGeneratingProxy] = useState(false);
    const [statusMsg, setStatusMsg] = useState<string | null>(null);

    const [zoomLevel, setZoomLevel] = useState(0); // 0 = Fit to Screen
    const [isDragging, setIsDragging] = useState(false);


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
        el.style.backgroundColor = 'rgba(168, 85, 247, 0.25)'; // Visible Purple

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
            flag.style.backgroundColor = '#a855f7'; // Purple
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
                flag.style.backgroundColor = '#a855f7';
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
                    waveColor: '#A855F7', // Purple-500
                    progressColor: '#6B21A8', // Purple-800
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
                    splitChannels: false,
                    backend: 'WebAudio',
                    mediaControls: false,
                    plugins: [wsRegions],
                } as any);

                ws.setVolume(0);

                ws.on('error', (err: any) => {
                    console.error("Wavesurfer Error:", err);
                    if (active) setStatusMsg("Waveform Error: " + (err.message || err));
                });

                ws.on('play', () => {});
                ws.on('pause', () => {});
                ws.on('finish', () => {});

                wavesurfer.current = ws;

                // Safely load and catch unhandled fetch aborts caused by rapid unmounting
                ws.load(proxyPath).catch((err: any) => {
                    if (active) {
                        console.warn("[AmbiTrim] WaveSurfer load aborted or failed:", err.message);
                    }
                });

                // PRP #147: Phase 3 - Seek Interception
                ws.on('interaction', (newTime: number) => {
                    commitSeek(newTime);
                    setIsDragging(false);
                });

                ws.on('drag', () => {
                    setIsDragging(true);
                });

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
                        color: 'rgba(168, 85, 247, 0.3)',
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

    // PRP #141: Auto-generate proxy when activeFile changes
    useEffect(() => {
        if (!activeFile) {
            setProxyPath(null);
            setStatusMsg(null);
            return;
        }

        const generateProxy = async () => {
            setStatusMsg(null);
            setIsGeneratingProxy(true);

            try {
                const path = activeFile.path;
                if (!path) throw new Error("File has no path");

                // Call Backend
                const rawData = await window.electronAPI.trim.generateProxy(path) as any;
                const isUint8 = rawData instanceof Uint8Array;

                // Blob creation from buffer (slice to avoid SharedArrayBuffer issues)
                const uint8 = isUint8 ? (rawData as Uint8Array) : new Uint8Array(rawData as number[]);
                const blob = new Blob([uint8.slice().buffer], { type: 'audio/wav' });

                setProxyPath(URL.createObjectURL(blob));

            } catch (err: any) {
                console.error("Proxy Gen Error:", err);
                setStatusMsg("Error: " + err.message);
            } finally {
                setIsGeneratingProxy(false);
            }
        };

        generateProxy();

        return () => {
            if (proxyPath && proxyPath.startsWith('blob:')) {
                URL.revokeObjectURL(proxyPath);
            }
        };
    }, [activeFile, proxyPath]);

    // PRP #148: Phase 1 - Mirror Transport Play/Pause for smooth 60fps internal rendering
    useEffect(() => {
        if (!wavesurfer.current) return;

        if (isPlaying) {
            // Only play if we are not at the absolute end of the file
            wavesurfer.current.play().catch(() => { });
        } else {
            wavesurfer.current.pause();
        }
    }, [isPlaying]);

    // PRP #148: Phase 2 - Global Master Clock Sync & Drift Correction
    useEffect(() => {
        if (!wavesurfer.current || isDragging) return;

        try {
            const wsTime = wavesurfer.current.getCurrentTime();
            const timeDifference = Math.abs(wsTime - currentTime);

            // If the visualizer drifts more than 300ms from the master clock, snap it.
            // This prevents the 4Hz timeupdate event from making the playhead stutter.
            if (timeDifference > 0.3) {
                wavesurfer.current.setTime(currentTime);
            }
        } catch (e) {
            // Ignore minor out-of-bounds errors during stream rebuilds
        }
    }, [currentTime, isDragging]);


    const handleExport = async () => {
        if (!activeFile || !startTime || !endTime) return;
        setStatusMsg("Exporting...");

        try {
            const originalPath = activeFile.path;
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
            throw err; // Rethrow for parent to handle if needed
        } finally {
            // Processing state is handled by parent via ref
        }
    };

    React.useImperativeHandle(ref, () => ({
        executeTrim: handleExport
    }));

    // Time formatting helper
    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        const ms = Math.floor((time % 1) * 100);
        return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col flex-1 gap-4 min-h-[400px]">

            {/* PRP #70: CSS Fallbacks (mostly generic) */}
            <style>{`
              #waveform-container ::part(cursor) {
                width: 2px !important;
                background-color: #ff0000 !important;
              }
            `}</style>

            {/* SECTION B: THE WORKSPACE (Unconditional - PRP #143) */}
            <div className="flex-1 relative min-h-0 w-full flex flex-col">
                <div className="w-full flex-1 flex flex-col gap-6 bg-[#1E1E1E] rounded-xl p-6 shadow-2xl border border-studio-border overflow-hidden">
                    
                    {/* 1. TOP INFO: Filename */}
                    <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                        <span className="font-mono text-sm text-purple-300 truncate max-w-[400px]">
                            {activeFile?.name || "No File Selected"}
                        </span>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Active File</span>
                            <div className={`w-2 h-2 rounded-full ${activeFile ? 'bg-purple-500 animate-pulse' : 'bg-gray-700'}`}></div>
                        </div>
                    </div>

                    {/* 2. WAVEFORM: Fixed Container (PRP #143) */}
                    <div className="h-[200px] w-full relative bg-gray-900 rounded-md border border-gray-800 overflow-hidden">
                        {isGeneratingProxy && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-20 bg-gray-900/80">
                                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-purple-300 font-medium animate-pulse">Generating Waveform...</span>
                            </div>
                        )}

                        {/* The Canvas Container */}
                        <div ref={containerRef} className="w-full h-full" id="waveform-container"></div>
                    </div>

                    {/* 3. CONTROLS: Zoom & Time (Vertical Stack with gap-6) */}
                    <div className="flex flex-col gap-6">
                        
                        {/* Zoom Slider */}
                        <div className="flex items-center gap-6 bg-[#18181b] p-4 rounded-lg border border-gray-800">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest min-w-[60px]">Zoom</label>
                            <input
                                type="range" min="0" max="100" value={zoomLevel}
                                onChange={handleZoom}
                                className="flex-1 accent-purple-500 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer hover:accent-purple-400"
                                title="0 = Fit to Screen"
                            />
                            <span className="text-[10px] font-mono text-gray-500 w-12 text-right">
                                {zoomLevel === 0 ? 'FIT' : `${zoomLevel}%`}
                            </span>
                        </div>

                        {/* Time display: Start/End Markers (Transport removed per PRP #143) */}
                        <div className="flex flex-col gap-1.5 flex-1">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Trim Start</label>
                                    <div className="bg-[#18181b] border border-studio-border rounded-lg px-6 py-3 text-xl text-white font-mono text-center shadow-inner">
                                        {formatTime(startTime)}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Trim End</label>
                                    <div className="bg-[#18181b] border border-studio-border rounded-lg px-6 py-3 text-xl text-white font-mono text-center shadow-inner">
                                        {formatTime(endTime)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            {statusMsg && (
                <div className={`p-3 rounded text-sm font-mono border text-center ${statusMsg.includes("Success") ? "bg-green-900/20 border-green-900/50 text-green-300" : statusMsg.includes("Error") || statusMsg.includes("Failed") ? "bg-red-900/20 border-red-900/50 text-red-300" : "bg-blue-900/20 border-blue-900/50 text-blue-300"}`}>
                    {statusMsg}
                </div>
            )}
        </div>
    );
});

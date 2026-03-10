import React from 'react';
import { HrtfProfile } from '../types';
import { formatTime } from '../utils/time-formatters';
import { Headphones, ChevronDown, Settings } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useTransport } from '../contexts/TransportContext';
import { useAudioEngine } from '../contexts/AudioEngineContext';
import { Modal } from './Modal';

interface TransportProps {
    canNext: boolean;
    canPrev: boolean;
    onNext: () => void;
    onPrev: () => void;
}

// -- Custom Rounded Icons --

const IconPrev = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M7 6a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0V7a1 1 0 0 0-1-1zm3.21 6.74l7.52 5.38c.68.48 1.63 0 1.63-.84V6.72c0-.84-.95-1.32-1.63-.84l-7.52 5.38a1.03 1.03 0 0 0 0 1.68z" />
    </svg>
);

const IconStop = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect x="6" y="6" width="12" height="12" rx="3" ry="3" />
    </svg>
);

const IconPlay = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A1 1 0 0 0 8 6.82z" />
    </svg>
);

const IconPause = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect x="6" y="5" width="4" height="14" rx="2" />
        <rect x="14" y="5" width="4" height="14" rx="2" />
    </svg>
);

const IconNext = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M16 6a1 1 0 0 1 1 1v10a1 1 1 0 1 1-2 0V7a1 1 0 0 1 1-1zm-9.54-.02a1 1 0 0 0-1.54.84v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69l-8.14-5.17z" />
    </svg>
);

const IconLoop = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 21h5v-5" />
    </svg>
);

const IconVolume = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
);

const IconMute = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
);

export const Transport: React.FC<TransportProps> = ({
    canNext,
    canPrev,
    onNext,
    onPrev
}) => {
    const { settings, updateSettings } = useSettings();
    const {
        isPlaying,
        isLooping,
        volume,
        currentTime,
        duration,
        loopIn,
        loopOut,
        togglePlayPause,
        stop,
        seek,
        commitSeek,
        setVolume,
        toggleLoop,
        setLoopPoints
    } = useTransport();

    const {
        isRebuilding,
        isHeadphonesOn,
        hrtfProfile,
        customSofaPath,
        toggleHeadphones,
        setHrtfProfile,
        setCustomSofaPath
    } = useAudioEngine();

    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
    const [dragging, setDragging] = React.useState<'in' | 'out' | null>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
    const loopInPercent = duration > 0 ? (loopIn / duration) * 100 : 0;
    const loopOutPercent = duration > 0 ? (loopOut / duration) * 100 : 100;

    const getTimeFromEvent = (e: MouseEvent | React.MouseEvent) => {
        if (!trackRef.current) return 0;
        const rect = trackRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, x / rect.width));
        return pct * duration;
    };

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragging) return;
            const time = getTimeFromEvent(e);
            if (dragging === 'in') {
                setLoopPoints(Math.min(time, loopOut - 0.1), loopOut);
            } else if (dragging === 'out') {
                setLoopPoints(loopIn, Math.max(time, loopIn + 0.1));
            }
        };
        const handleMouseUp = () => setDragging(null);

        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, loopIn, loopOut, duration, setLoopPoints]);

    return (
        <div className="border border-brand-border rounded-lg p-3 bg-[#18181b] flex flex-col gap-2.5 shadow-lg select-none">

            {/* Top Row: Timeline */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[11px] font-medium text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                <div className="relative w-full h-5 flex items-center group">
                    <div ref={trackRef} className="absolute w-full h-1.5 bg-[#27272a] rounded-lg overflow-hidden group-hover:bg-[#323235] transition-colors">
                        {isLooping && (
                            <div
                                className="absolute top-0 h-full bg-green-500/20"
                                style={{
                                    left: `${loopInPercent}%`,
                                    width: `${loopOutPercent - loopInPercent}%`
                                }}
                            />
                        )}
                        <div
                            className="h-full bg-blue-400 rounded-lg"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>

                    {isLooping && (
                        <>
                            <div
                                className="absolute top-[-8px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-green-500 cursor-ew-resize hover:scale-125 transition-transform z-30"
                                style={{ left: `calc(${loopInPercent}% - 0px)` }}
                                onMouseDown={(e) => { e.stopPropagation(); setDragging('in'); }}
                                title="Loop Start"
                            />
                            <div
                                className="absolute top-[-8px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-green-500 cursor-ew-resize hover:scale-125 transition-transform z-30"
                                style={{ left: `calc(${loopOutPercent}% - 10px)` }}
                                onMouseDown={(e) => { e.stopPropagation(); setDragging('out'); }}
                                title="Loop End"
                            />
                        </>
                    )}

                    <div
                        className="absolute w-3 h-3 bg-white rounded-full shadow-md z-20 pointer-events-none"
                        style={{
                            left: `${progressPercent}%`,
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />

                    <input
                        type="range"
                        min={0}
                        max={duration || 1}
                        step={0.01}
                        value={currentTime}
                        onChange={(e) => seek(Number(e.target.value))}
                        onMouseUp={(e) => commitSeek(Number((e.target as HTMLInputElement).value))}
                        onTouchEnd={(e) => commitSeek(Number((e.target as HTMLInputElement).value))}
                        disabled={isRebuilding}
                        className={`absolute w-full h-full opacity-0 z-10 ${isRebuilding ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    />
                </div>

                {isRebuilding && (
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-bold tracking-widest animate-pulse mt-0.5">
                        <svg className="w-2.5 h-2.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        BUFFERING
                    </div>
                )}
            </div>

            {/* Bottom Row: Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={onPrev}
                        disabled={!canPrev || isRebuilding}
                        className={`w-9 h-9 flex items-center justify-center rounded-md transition-all active:scale-95 ${(!canPrev || isRebuilding)
                            ? 'bg-[#1E1E1E] text-gray-700 cursor-not-allowed'
                            : 'bg-[#27272a] hover:bg-[#3f3f46] text-gray-400 hover:text-white'
                            }`}
                        title="Previous"
                    >
                        <div className="w-5 h-5">
                            <IconPrev />
                        </div>
                    </button>

                    <button
                        onClick={stop}
                        className="w-9 h-9 flex items-center justify-center bg-[#27272a] hover:bg-[#3f3f46] text-gray-400 hover:text-white rounded-md transition-all active:scale-95"
                        title="Stop"
                    >
                        <div className="w-5 h-5">
                            <IconStop />
                        </div>
                    </button>

                    <button
                        onClick={isRebuilding ? undefined : togglePlayPause}
                        className={`w-11 h-9 flex items-center justify-center rounded-md transition-all active:scale-95 shadow-md ${isRebuilding
                            ? 'bg-amber-900/30 text-amber-500 cursor-not-allowed'
                            : isPlaying
                                ? 'bg-green-500 text-black hover:bg-green-400'
                                : 'bg-white text-black hover:bg-gray-200'
                            }`}
                        title={isRebuilding ? 'Buffering...' : (isPlaying ? 'Pause' : 'Play')}
                    >
                        <div className="w-6 h-6">
                            {isPlaying ? <IconPause /> : <IconPlay />}
                        </div>
                    </button>

                    <button
                        onClick={onNext}
                        disabled={!canNext || isRebuilding}
                        className={`w-9 h-9 flex items-center justify-center rounded-md transition-all active:scale-95 ${(!canNext || isRebuilding)
                            ? 'bg-[#1E1E1E] text-gray-700 cursor-not-allowed'
                            : 'bg-[#27272a] hover:bg-[#3f3f46] text-gray-400 hover:text-white'
                            }`}
                        title="Next"
                    >
                        <div className="w-5 h-5">
                            <IconNext />
                        </div>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 mr-1">
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                            title="Playback Settings"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            onClick={toggleHeadphones}
                            className={`p-1.5 rounded-md transition-all ${isHeadphonesOn ? 'bg-blue-400/20 text-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                            title="Binaural Monitoring"
                        >
                            <Headphones className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={toggleLoop}
                        className={`flex items-center justify-center w-8 h-8 transition-all rounded-md ${isLooping ? 'bg-brand-green/20 text-brand-green' : 'text-gray-500 hover:bg-[#27272a] hover:text-gray-300'}`}
                        title="Toggle Loop"
                    >
                        <div className="w-5 h-5">
                            <IconLoop />
                        </div>
                    </button>

                    <div className="flex items-center gap-2 bg-[#27272a] px-2.5 py-1 rounded-md">
                        <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)} className="text-gray-400 hover:text-white">
                            <div className="w-5 h-5">
                                {volume === 0 ? <IconMute /> : <IconVolume />}
                            </div>
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-16 accent-blue-400 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                title="Playback Settings"
            >
                <div className="space-y-4">
                    <div className="w-full">
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">HRTF Profile (Binaural Preview)</label>
                        <div className="relative">
                            <select
                                value={hrtfProfile}
                                onChange={async (e) => {
                                    const val = e.target.value;
                                    if (val === HrtfProfile.Custom) {
                                        try {
                                            const lastDir = settings.toolSettings?.globalPlayback?.lastSofaDir || undefined;
                                            const result = await window.electronAPI.selectFiles({
                                                properties: ['openFile'],
                                                defaultPath: lastDir,
                                                filters: [
                                                    { name: 'SOFA Files', extensions: ['sofa'] },
                                                    { name: 'All Files', extensions: ['*'] }
                                                ]
                                            });
                                            if (result && result.length > 0) {
                                                const selectedPath = result[0];
                                                setCustomSofaPath(selectedPath);
                                                const dirPath = selectedPath.substring(0, selectedPath.lastIndexOf('/'));
                                                updateSettings(prev => ({
                                                    toolSettings: {
                                                        ...prev.toolSettings,
                                                        globalPlayback: {
                                                            ...prev.toolSettings?.globalPlayback,
                                                            lastSofaDir: dirPath
                                                        }
                                                    }
                                                }));
                                            }
                                        } catch (err) {
                                            console.error("Failed to select custom SOFA:", err);
                                        }
                                    } else {
                                        setHrtfProfile(val);
                                    }
                                }}
                                className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-brand-green appearance-none text-white"
                            >
                                <option value={HrtfProfile.Neumann}>{HrtfProfile.Neumann}</option>
                                <option value={HrtfProfile.Kemar}>{HrtfProfile.Kemar}</option>
                                <option value={HrtfProfile.Custom}>{HrtfProfile.Custom}</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                        {hrtfProfile === HrtfProfile.Custom && customSofaPath && (
                            <p className="text-[10px] text-green-400 mt-1 font-mono break-all">
                                Using: {customSofaPath.split('/').pop()}
                            </p>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
};
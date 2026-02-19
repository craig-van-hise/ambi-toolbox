import React from 'react';
import { PlayerState, HrtfProfile } from '../types';
import { formatTime } from '../utils/time-formatters';
import { Modal } from './Modal';
import { Settings, Headphones, ChevronDown } from 'lucide-react';

interface TransportProps {
    state: PlayerState;
    onPlayPause: () => void;
    onStop: () => void;
    onNext: () => void;
    onPrev: () => void;
    onSeek: (time: number) => void;
    onVolumeChange: (vol: number) => void;
    onToggleLoop: () => void;
    onToggleHeadphones: () => void;
    onSetHrtfProfile: (profile: string) => void;
    canNext: boolean;
    canPrev: boolean;
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
        <path d="M16 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1zm-9.54-.02a1 1 0 0 0-1.54.84v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69l-8.14-5.17z" />
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
    state,
    onPlayPause,
    onStop,
    onNext,
    onPrev,
    onSeek,
    onVolumeChange,
    onToggleLoop,
    onToggleHeadphones,
    onSetHrtfProfile,
    canNext,
    canPrev
}) => {
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
    const progressPercent = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

    return (
        <div className="border border-brand-border rounded-lg p-3 bg-[#18181b] flex flex-col gap-2.5 shadow-lg select-none">

            {/* Top Row: Timeline */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[11px] font-medium text-gray-400">
                    <span>{formatTime(state.currentTime)}</span>
                    <span>{formatTime(state.duration)}</span>
                </div>
                <div className="relative w-full h-5 flex items-center group">
                    {/* Visual Track Background - Rounded */}
                    <div className="absolute w-full h-1.5 bg-[#27272a] rounded-lg overflow-hidden group-hover:bg-[#323235] transition-colors">
                        {/* Progress Fill - Rounded */}
                        <div
                            className="h-full bg-blue-400 rounded-lg"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>

                    {/* Handle - Circle (Always Visible) */}
                    <div
                        className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-md z-20 pointer-events-none"
                        style={{
                            left: `${progressPercent}%`,
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />

                    {/* Input */}
                    <input
                        type="range"
                        min={0}
                        max={state.duration}
                        value={state.currentTime}
                        onChange={(e) => onSeek(Number(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    />
                </div>
            </div>

            {/* Bottom Row: Controls */}
            <div className="flex items-center justify-between">

                {/* Playback Buttons - Rounded Rectangles */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onPrev}
                        disabled={!canPrev}
                        className={`w-9 h-9 flex items-center justify-center rounded-md transition-all active:scale-95 ${!canPrev
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
                        onClick={onStop}
                        className="w-9 h-9 flex items-center justify-center bg-[#27272a] hover:bg-[#3f3f46] text-gray-400 hover:text-white rounded-md transition-all active:scale-95"
                        title="Stop"
                    >
                        <div className="w-5 h-5">
                            <IconStop />
                        </div>
                    </button>

                    <button
                        onClick={onPlayPause}
                        className={`w-11 h-9 flex items-center justify-center rounded-md transition-all active:scale-95 shadow-md ${state.isPlaying
                            ? 'bg-brand-green text-black hover:bg-[#00b35a]'
                            : 'bg-white text-black hover:bg-gray-200'
                            }`}
                        title={state.isPlaying ? "Pause" : "Play"}
                    >
                        <div className="w-6 h-6">
                            {state.isPlaying ? <IconPause /> : <IconPlay />}
                        </div>
                    </button>

                    <button
                        onClick={onNext}
                        disabled={!canNext}
                        className={`w-9 h-9 flex items-center justify-center rounded-md transition-all active:scale-95 ${!canNext
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

                {/* Right Side: Settings, Loop & Volume */}
                <div className="flex items-center gap-3">
                    {/* Settings Cog and Headphones */}
                    <div className="flex items-center gap-1.5 mr-1">
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                            title="Playback Settings"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onToggleHeadphones}
                            className={`p-1.5 rounded-md transition-all ${state.isHeadphonesOn ? 'bg-blue-400/20 text-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                            title="Binaural Monitoring"
                        >
                            <Headphones className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={onToggleLoop}
                        className={`flex items-center justify-center w-8 h-8 transition-all rounded-md ${state.isLooping ? 'bg-brand-green/20 text-brand-green' : 'text-gray-500 hover:bg-[#27272a] hover:text-gray-300'}`}
                        title="Toggle Loop"
                    >
                        <div className="w-5 h-5">
                            <IconLoop />
                        </div>
                    </button>

                    <div className="flex items-center gap-2 bg-[#27272a] px-2.5 py-1 rounded-md">
                        <button onClick={() => onVolumeChange(state.volume === 0 ? 0.8 : 0)} className="text-gray-400 hover:text-white">
                            <div className="w-5 h-5">
                                {state.volume === 0 ? <IconMute /> : <IconVolume />}
                            </div>
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={state.volume}
                            onChange={(e) => onVolumeChange(Number(e.target.value))}
                            className="w-16 accent-blue-400 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Playback Settings Modal */}
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
                                value={state.hrtfProfile}
                                onChange={(e) => onSetHrtfProfile(e.target.value)}
                                className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-brand-green appearance-none text-white"
                            >
                                <option value={HrtfProfile.Neumann}>{HrtfProfile.Neumann}</option>
                                <option value={HrtfProfile.Kemar}>{HrtfProfile.Kemar}</option>
                                <option value={HrtfProfile.Custom}>{HrtfProfile.Custom}</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                        {state.hrtfProfile === HrtfProfile.Custom && (
                            <p className="text-[10px] text-brand-green mt-2 font-mono italic">
                                * Uses the same custom SOFA file configured in Ambix2Bin.
                            </p>
                        )}
                    </div>

                    <div className="pt-2">
                        <p className="text-xs text-gray-500 leading-relaxed">
                            These settings only affect the **real-time preview**. Rendering output settings are managed individually for each tool.
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
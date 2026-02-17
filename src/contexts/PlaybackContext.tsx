import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { PlayerState, HrtfProfile } from '../types';
import { useSettings } from './SettingsContext';

interface PlaybackContextType {
    state: PlayerState;
    togglePlayPause: () => void;
    stop: () => void;
    next: () => void;
    prev: () => void;
    seek: (time: number) => void;
    setVolume: (vol: number) => void;
    toggleLoop: () => void;
    toggleHeadphones: () => void;
    setHrtfProfile: (profile: string) => void;
    setCurrentFile: (filePath: string | null) => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { settings } = useSettings();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [state, setState] = useState<PlayerState>({
        currentTime: 0,
        duration: 0,
        isPlaying: false,
        isLooping: false,
        isHeadphonesOn: false, // Default off (listen to raw/stereo first)
        volume: 0.8,
        hrtfProfile: HrtfProfile.Neumann,
        currentFile: null
    });

    // 1. Initialize Audio Element
    useEffect(() => {
        const audio = new Audio();
        audio.preload = 'metadata';
        audioRef.current = audio;

        // Event Listeners
        const onTimeUpdate = () => {
            setState(prev => ({ ...prev, currentTime: audio.currentTime }));
        };
        const onLoadedMetadata = () => {
            setState(prev => ({
                ...prev,
                duration: isNaN(audio.duration) ? 0 : audio.duration
            }));
        };
        const onEnded = () => {
            // Loop handled by audio.loop property or manual re-seek
            setState(prev => {
                if (!prev.isLooping) {
                    return { ...prev, isPlaying: false, currentTime: 0 };
                }
                return prev;
            });
        };
        const onPlay = () => setState(prev => ({ ...prev, isPlaying: true }));
        const onPause = () => setState(prev => ({ ...prev, isPlaying: false }));
        const onError = (_e: Event) => {
            console.error("Audio Playback Error:", audio.error);
            setState(prev => ({ ...prev, isPlaying: false }));
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('error', onError);

        return () => {
            audio.pause();
            audio.src = '';
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('error', onError);
            audioRef.current = null;
        };
    }, []);

    // 2. Stream URL Construction & Safety
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (!state.currentFile) {
            // No file loaded
            return;
        }

        // Determine SOFA Path
        // If Custom, get from Settings (persisted per tool? Or generally from settings?)
        // The PlaybackContext is general. The ToolView saves custom paths to toolSettings.
        // We probably need to check `Ambix2Bin` settings specifically?
        // Or assume Playback uses a global setting?
        // Actually, ToolView updates settings. 
        // We can access `settings.toolSettings?.['ambix2bin']?.customSofaPath`.
        // This is coupled, but fine for now.
        let sofaPath = '';
        if (state.hrtfProfile === HrtfProfile.Custom) {
            sofaPath = settings.toolSettings?.['ambix2bin']?.customSofaPath || '';
        } else {
            // For presets, we pass the profile string directly?
            // Backend currently checks `fs.existsSync(sofaPath)`.
            // If I pass "Generic (Neumann...)", fs.exists will fail.
            // I need to update backend to handle presets if I want this to work.
            // OR I assume backend handles it.
            // Let's pass the profile string as `hrtfProfile` param, and `sofaPath` as empty/null.
            // Backend doesn't support `hrtfProfile` param logic yet (except logging).
            // I will update backend later. For now, let's pass it.
        }

        // Construct URL
        const params = new URLSearchParams();
        params.append('file', state.currentFile);
        params.append('binaural', state.isHeadphonesOn ? 'true' : 'false');
        if (sofaPath) params.append('sofaPath', sofaPath);
        params.append('hrtfProfile', state.hrtfProfile);

        // Add timestamp to prevent caching if settings change
        params.append('_t', Date.now().toString());

        const newSrc = `http://127.0.0.1:45455/stream?${params.toString()}`;

        // Only reload if valid changes
        // Optimization: Don't reload if just toggling loop/volume.
        // But binaural/hrtf toggle REQUIRES reload.

        // Save current time to restore after reload
        const ct = audio.currentTime;
        const wasPlaying = !audio.paused;

        // Ideally check if meaningful params changed. 
        // For simplicity, we assume this effect runs on dependencies.
        // But we need to handle Play/Pause separately to avoid reloading on play.

        // This effect depends on: currentFile, isHeadphonesOn, hrtfProfile.
        // It does NOT depend on isPlaying, volume, loop.

        if (audio.src !== newSrc) { // Basic check? No, src usually resolves to full URL.
            // Simple heuristic
            // If we rely on _t, it will ALWAYS change.
            // We should store 'lastParams' ref?
            // Let's rely on React dependency array for now.

            // Check if we are actually loading a new file or changing processing
            audio.src = newSrc;
            audio.currentTime = ct; // Restore time
            if (wasPlaying) {
                audio.play().catch(e => console.warn("Auto-resume failed", e));
            }
        }
    }, [state.currentFile, state.isHeadphonesOn, state.hrtfProfile, settings.toolSettings]);

    // 3. Playback Control Effects
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (state.isPlaying && audio.paused) {
            audio.play().catch(e => {
                console.warn("Play failed", e);
                setState(prev => ({ ...prev, isPlaying: false }));
            });
        } else if (!state.isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [state.isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = state.isLooping;
        }
    }, [state.isLooping]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = state.volume;
        }
    }, [state.volume]);


    // Handlers
    const togglePlayPause = () => setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    const stop = () => {
        setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };
    const next = () => console.log('Next track (stub)');
    const prev = () => console.log('Previous track (stub)');

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setState(prev => ({ ...prev, currentTime: time }));
        }
    };

    const setVolume = (vol: number) => setState(prev => ({ ...prev, volume: vol }));
    const toggleLoop = () => setState(prev => ({ ...prev, isLooping: !prev.isLooping }));
    const toggleHeadphones = () => setState(prev => ({ ...prev, isHeadphonesOn: !prev.isHeadphonesOn }));
    const setHrtfProfile = (profile: string) => setState(prev => ({ ...prev, hrtfProfile: profile }));
    const setCurrentFile = (filePath: string | null) => {
        // Only update if changed to avoid resets
        setState(prev => {
            if (prev.currentFile === filePath) return prev;
            return { ...prev, currentFile: filePath, currentTime: 0, isPlaying: false };
        });
    };

    return (
        <PlaybackContext.Provider value={{
            state,
            togglePlayPause,
            stop,
            next,
            prev,
            seek,
            setVolume,
            toggleLoop,
            toggleHeadphones,
            setHrtfProfile,
            setCurrentFile
        }}>
            {children}
        </PlaybackContext.Provider>
    );
};

export const usePlayback = () => {
    const context = useContext(PlaybackContext);
    if (context === undefined) {
        throw new Error('usePlayback must be used within a PlaybackProvider');
    }
    return context;
};

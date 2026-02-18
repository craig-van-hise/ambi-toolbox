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
        currentFile: null,
        channels: 0
    });

    // Solve Stale Closure for Event Listeners
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // 1. Initialize Audio Element
    useEffect(() => {
        const audio = new Audio();
        audio.preload = 'metadata';
        audioRef.current = audio;

        // Event Listeners
        const onTimeUpdate = () => {
            setState(prev => ({ ...prev, currentTime: audio.currentTime }));
        };
        const onLoadedMetadata = async () => {
            // Duration is now handled by the probe effect mostly, 
            // but the element might update it more accurately for the decoded stream?
            // Actually, we trust the probe for the *file* duration. 
            // The audio element duration might depend on the stream (infinity for chunks?).
            // Let's keep updating duration from audio.duration if it's valid, 
            // but we don't need to probe channels here anymore.

            const duration = audio.duration;
            setState(prev => ({
                ...prev,
                // Prefer probe duration if audio.duration is Infinity (stream)
                duration: (isNaN(duration) || duration === Infinity) ? prev.duration : duration
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


    // 2. Probe Metadata (Decoupled from Audio Element)
    useEffect(() => {
        const currentFile = state.currentFile;
        // Reset channels/duration when file changes
        // Note: setCurrentFile already resets them, but we ensure consistency here if needed.

        if (!currentFile) return;

        let isMounted = true;

        const probe = async () => {
            console.log(`[Playback] Probing: ${currentFile}`);
            try {
                // TODO: Port to configurable backend URL if needed
                const response = await fetch(`http://127.0.0.1:45455/probe-metadata?file=${encodeURIComponent(currentFile)}`);
                if (!response.ok) throw new Error("Probe failed");
                const data = await response.json();

                if (isMounted) {
                    console.log(`[Playback] Probe Success: ${data.channels}ch`);
                    setState(prev => ({
                        ...prev,
                        duration: (data.duration && !isNaN(data.duration)) ? data.duration : prev.duration,
                        channels: data.channels || 0
                    }));
                }
            } catch (error) {
                console.error("Failed to probe metadata:", error);
                // Fallback? If probe fails, maybe default to 2 or 16? 
                // Leaving as 0 might block playback if we enforce >0 checks.
                // Let's set a safe fallback if we must, or let user handle it.
                // For now, we log error. State remains 0 (or whatever it was).
                // If we want to force playback even if probe fails, we could set channels=4 here.
                if (isMounted) {
                    setState(prev => ({ ...prev, channels: 4 })); // Fallback
                }
            }
        };

        probe();

        return () => { isMounted = false; };
    }, [state.currentFile]);


    // 3. Stream URL Construction
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const { currentFile, hrtfProfile, channels } = state;

        if (!currentFile) {
            return;
        }

        // Wait for probe to complete (channels > 0)
        // This prevents requesting the stream with incorrect default channels
        if (!channels) {
            console.log('[Playback] Waiting for channels probe...');
            return;
        }

        // Map frontend profile to backend 'profile' enum (ambient, direct, reverberant)
        let backendProfile = 'ambient';
        if (hrtfProfile === HrtfProfile.Neumann || hrtfProfile === 'Neumann') backendProfile = 'ambient';
        if (hrtfProfile === 'Direct') backendProfile = 'direct';

        const params = new URLSearchParams();
        params.append('file', currentFile);
        params.append('channels', channels.toString());
        params.append('profile', backendProfile);

        // Add timestamp to prevent caching
        params.append('_t', Date.now().toString());

        const newSrc = `http://127.0.0.1:45455/obr-stream?${params.toString()}`;

        // Stream Health / Reconnection Logic
        const onStalled = () => console.warn('[Audio] Stream stalled');
        const onWaiting = () => console.log('[Audio] Buffering...');
        const onPlaying = () => console.log('[Audio] Resumed/Playing');
        const onStreamError = (_e: Event) => {
            console.error('[Audio] Stream Error', audio.error);
            setState(prev => ({ ...prev, isPlaying: false }));
        };

        audio.addEventListener('stalled', onStalled);
        audio.addEventListener('waiting', onWaiting);
        audio.addEventListener('playing', onPlaying);
        audio.addEventListener('error', onStreamError);

        // Update Source
        if (audio.src !== newSrc) {
            console.log(`[Audio] Switching stream: ${newSrc}`);
            const wasPlaying = !audio.paused;
            const currentTime = audio.currentTime;

            audio.src = newSrc;
            audio.load();
            audio.currentTime = currentTime;

            if (wasPlaying) {
                audio.play().catch(e => console.error("Resume failed after switch", e));
            }
        }

        return () => {
            audio.removeEventListener('stalled', onStalled);
            audio.removeEventListener('waiting', onWaiting);
            audio.removeEventListener('playing', onPlaying);
            audio.removeEventListener('error', onStreamError);
        };
    }, [state.currentFile, state.hrtfProfile, state.channels, settings.toolSettings]);


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
            return { ...prev, currentFile: filePath, currentTime: 0, isPlaying: false, channels: 0 };
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

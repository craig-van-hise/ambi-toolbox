import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { PlayerState, HrtfProfile } from '../types';

interface PlaybackContextType {
    state: PlayerState;
    togglePlayPause: () => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
    next: () => void;
    prev: () => void;
    seek: (time: number) => void;
    setVolume: (vol: number) => void;
    toggleLoop: () => void;
    toggleHeadphones: () => void;
    setHrtfProfile: (profile: string) => void;
    setCurrentFile: (filePath: string | null, shouldPlay?: boolean) => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [state, setState] = useState<PlayerState>({
        currentTime: 0,
        duration: 0,
        isPlaying: false,
        isLooping: false,
        isHeadphonesOn: true, // Default ON (Binaural)
        volume: 0.8,
        hrtfProfile: HrtfProfile.Neumann,
        currentFile: null,
        channels: 0,
        streamOffset: 0
    });

    const seekTimerRef = useRef<NodeJS.Timeout | null>(null);
    const playbackIntentRef = useRef(false);

    // Solve Stale Closure for Event Listeners
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // 1. Initialize Audio Element
    useEffect(() => {
        console.log('[PlaybackProvider] MOUNTED. Default State:', state);
        const audio = new Audio();
        audio.preload = 'none'; // Prevent auto-pipeline start
        audioRef.current = audio;

        // Event Listeners
        const onTimeUpdate = () => {
            if (seekTimerRef.current) return; // PRP #93: Don't let old stream update UI while seeking
            const virtualTime = (stateRef.current.streamOffset || 0) + audio.currentTime;
            setState(prev => ({ ...prev, currentTime: virtualTime }));
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
        const onPlay = () => {
            if (!stateRef.current.isPlaying) {
                console.log('[Audio] onPlay event detected - Syncing React state');
                setState(prev => ({ ...prev, isPlaying: true }));
            }
        };
        const onPause = () => {
            if (stateRef.current.isPlaying) {
                console.log('[Audio] onPause event detected - Syncing React state');
                setState(prev => ({ ...prev, isPlaying: false }));
            }
        };
        const onCanPlay = () => {
            // No reset needed anymore
        };
        const onError = (_e: Event) => {
            console.error("Audio Playback Error:", audio.error);
            setState(prev => ({ ...prev, isPlaying: false }));
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('canplay', onCanPlay);
        audio.addEventListener('error', onError);

        return () => {
            audio.pause();
            audio.src = '';
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('canplay', onCanPlay);
            audio.removeEventListener('error', onError);
            audioRef.current = null;
        };
    }, []);


    // 2. Step 2: The Probe (Decoupled from Audio Element)
    // Triggered when currentFile changes
    useEffect(() => {
        const currentFile = state.currentFile;
        if (!currentFile) return;

        let isMounted = true;

        const probe = async () => {
            console.log(`[Playback] [Step 2] Probing: ${currentFile}`);
            try {
                const response = await fetch(`http://127.0.0.1:45455/probe-metadata?file=${encodeURIComponent(currentFile)}`);
                if (!response.ok) throw new Error("Probe failed");
                const data = await response.json();

                if (isMounted) {
                    console.log(`[Playback] [Step 2] Probe Success: ${data.channels}ch`);
                    setState(prev => ({
                        ...prev,
                        duration: (data.duration && !isNaN(data.duration)) ? data.duration : prev.duration,
                        channels: data.channels || 0
                    }));
                }
            } catch (error) {
                console.error("[Playback] [Step 2] Probe failed:", error);
            }
        };

        probe();
        return () => { isMounted = false; };
    }, [state.currentFile]);


    // 3. Step 3: The Commit (Construction & Playback)
    // Triggered when channels or seek update, but ONLY if we have a file.
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !state.currentFile || state.channels === 0) return;

        const { currentFile, channels, requestedSeekTime, isHeadphonesOn } = state;
        const start = requestedSeekTime !== undefined ? requestedSeekTime : 0;

        const params = new URLSearchParams();
        if (currentFile) params.append('file', currentFile);
        params.append('channels', channels.toString());
        params.append('profile', 'ambient');
        params.append('start', start.toString());
        if (!isHeadphonesOn) params.append('render', 'stereo'); // Ensure channels handled in OBR
        params.append('_t', Date.now().toString());

        const newSrc = `http://127.0.0.1:45455/obr-stream?${params.toString()}`;

        if (audio.src !== newSrc) {
            console.log(`[Playback] [Step 3] Committing Stream: ${newSrc}`);

            audio.src = newSrc;
            audio.load();

            // Apply intent
            if (playbackIntentRef.current) {
                console.log('[Playback] [Step 3] Playback Intent detected - executing play()');
                audio.play().catch((e: any) => {
                    if (e.name !== 'AbortError') {
                        console.error("[Playback] [Step 3] Play blocked:", e);
                    }
                });
                // ONLY clear intentional playback. Don't let passive updates clear it.
                playbackIntentRef.current = false;
            }

            // Sync streamOffset state
            setState(prev => ({ ...prev, streamOffset: start }));
        }

    }, [state.currentFile, state.channels, state.requestedSeekTime, state.isHeadphonesOn]);


    // 4. Command Dispatcher Hooks
    // Watch isPlaying state and trigger native methods only if necessary
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audio.src) return;

        if (state.isPlaying && audio.paused) {
            console.log('[Playback] Dispatcher: Play triggered');
            audio.play().catch(e => {
                if (e.name !== 'AbortError') {
                    console.error("[Playback] Dispatcher: Play failed:", e);
                }
            });
        } else if (!state.isPlaying && !audio.paused) {
            console.log('[Playback] Dispatcher: Pause triggered');
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
        setState(prev => ({ ...prev, isPlaying: false, currentTime: 0, streamOffset: 0, requestedSeekTime: undefined }));
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            // Force reset src to stop backend pipeline
            const oldSrc = audioRef.current.src;
            audioRef.current.src = '';
            audioRef.current.src = oldSrc;
        }
    };

    const next = () => console.log('Next track (stub)');
    const prev = () => console.log('Previous track (stub)');

    const seek = (time: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        // 1. UI Optimism: Update playhead immediately
        setState(prev => ({ ...prev, currentTime: time }));

        // 2. Capture and Pause audio element while dragging/seeking to prevent ghost audio
        const wasPlaying = !audio.paused;
        console.log(`Seek initiated. Was playing: ${wasPlaying}`);

        if (wasPlaying) {
            playbackIntentRef.current = true;
            audio.pause();
        }

        // 3. Debounce the actual backend fetch (PRP #93)
        if (seekTimerRef.current) {
            clearTimeout(seekTimerRef.current);
        }

        seekTimerRef.current = setTimeout(() => {
            setState(prev => ({ ...prev, requestedSeekTime: time }));
            seekTimerRef.current = null;
        }, 400); // 400ms buffer to prevent "Scrubber DDOS"
    };
    const setVolume = (vol: number) => setState(prev => ({ ...prev, volume: vol }));
    const toggleLoop = () => setState(prev => ({ ...prev, isLooping: !prev.isLooping }));
    const toggleHeadphones = () => setState(prev => ({ ...prev, isHeadphonesOn: !prev.isHeadphonesOn }));
    const setHrtfProfile = (profile: string) => setState(prev => ({ ...prev, hrtfProfile: profile }));
    const setCurrentFile = (filePath: string | null, shouldPlay = false) => {
        console.log(`[Playback] [Step 1] Intent: ${filePath}, shouldPlay: ${shouldPlay}`);

        // PRP #100: Only update the ref if the intent is TRUE.
        // This prevents passive selection updates (which pass false) 
        // from clearing a previously set double-click intent.
        if (shouldPlay) {
            playbackIntentRef.current = true;
        }

        // Only update if changed to avoid resets
        setState(prev => {
            if (prev.currentFile === filePath) {
                // PRP #99: If already on this file and we WANT to play, 
                // but we are currently paused, force isPlaying: true 
                // to trigger the dispatcher hook.
                if (shouldPlay && !prev.isPlaying && prev.channels > 0) {
                    console.log('[Playback] [Step 1] Path identical but play intent received. Forcing play.');
                    return { ...prev, isPlaying: true };
                }
                return prev;
            }

            if (audioRef.current) {
                const audio = audioRef.current;
                audio.pause();
                audio.currentTime = 0;
            }

            // Capture intent in ref (Step 1)
            playbackIntentRef.current = shouldPlay;

            return {
                ...prev,
                currentFile: filePath,
                currentTime: 0,
                isPlaying: false, // UI remains paused during probe
                channels: 0, // Reset to trigger Step 2 -> Step 3 cascade
                requestedSeekTime: undefined,
                streamOffset: 0
            };
        });
    };


    return (
        <PlaybackContext.Provider value={{
            state,
            togglePlayPause,
            play: () => setState(prev => ({ ...prev, isPlaying: true })),
            pause: () => setState(prev => ({ ...prev, isPlaying: false })),
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

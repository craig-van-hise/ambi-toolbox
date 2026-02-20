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
    // Visual-only seek: updates UI position. Does NOT talk to backend.
    seek: (time: number) => void;
    // Commit seek: fires after mouseUp. Triggers actual backend stream rebuild.
    commitSeek: (time: number) => void;
    setVolume: (vol: number) => void;
    toggleLoop: () => void;
    toggleHeadphones: () => void;
    setHrtfProfile: (profile: string) => void;
    setLoopPoints: (inTime: number, outTime: number) => void;
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
        isHeadphonesOn: true,
        volume: 0.8,
        hrtfProfile: HrtfProfile.Neumann,
        currentFile: null,
        channels: 0,
        streamOffset: 0,
        loopIn: 0,
        loopOut: 0,
        isRebuilding: false,
        seekNonce: 0,
    });

    const playbackIntentRef = useRef(false);
    const rebuildTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Stale-closure guard for event listeners
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // ------------------------------------------------------------------
    // Rebuild Lock Helpers
    // ------------------------------------------------------------------

    /**
     * Clears the lock and the failsafe. Called on native 'playing' or 'canplay'
     * events once the new stream is confirmed ready.
     */
    const clearRebuildLock = () => {
        if (rebuildTimeoutRef.current) {
            clearTimeout(rebuildTimeoutRef.current);
            rebuildTimeoutRef.current = null;
        }
        setState(prev => ({ ...prev, isRebuilding: false }));
    };

    /**
     * Enters LOCKED_REBUILDING state and starts a 3000ms failsafe timer.
     * If the native audio event never fires, the lock is force-released and
     * transport falls back to PAUSED.
     * 
     * @param wasPlaying - if true, listen for 'playing'; if false, listen for 'canplay'/'loadeddata'.
     */
    const enterRebuildLock = (wasPlaying: boolean) => {
        // Cancel any previous failsafe
        if (rebuildTimeoutRef.current) {
            clearTimeout(rebuildTimeoutRef.current);
        }

        setState(prev => ({ ...prev, isRebuilding: true }));

        const audio = audioRef.current;
        if (!audio) return;

        // Choose the right native event for unlock
        const unlockEvent = wasPlaying ? 'playing' : 'canplay';

        const onUnlock = () => {
            console.log(`[Playback] [REBUILD] Unlocked via native '${unlockEvent}' event.`);
            audio.removeEventListener(unlockEvent, onUnlock);
            clearRebuildLock();
        };

        // loadeddata is a secondary fallback for the paused-scrub path
        const onLoadedData = () => {
            if (!wasPlaying) {
                console.log('[Playback] [REBUILD] Unlocked via native loadeddata (paused scrub fallback).');
                audio.removeEventListener('loadeddata', onLoadedData);
                clearRebuildLock();
            }
        };

        audio.addEventListener(unlockEvent, onUnlock, { once: true });
        if (!wasPlaying) {
            audio.addEventListener('loadeddata', onLoadedData, { once: true });
        }

        // Failsafe: force unlock after 3000ms
        rebuildTimeoutRef.current = setTimeout(() => {
            console.warn('[Playback] [REBUILD] Failsafe triggered — stream did not become playable in 3s. Forcing unlock + pause.');
            audio.removeEventListener(unlockEvent, onUnlock);
            audio.removeEventListener('loadeddata', onLoadedData);
            setState(prev => ({ ...prev, isRebuilding: false, isPlaying: false }));
            rebuildTimeoutRef.current = null;
        }, 3000);
    };

    // ------------------------------------------------------------------
    // 1. Initialize Audio Element
    // ------------------------------------------------------------------
    useEffect(() => {
        console.log('[PlaybackProvider] MOUNTED.');
        const audio = new Audio();
        audio.preload = 'none';
        audioRef.current = audio;

        const onTimeUpdate = () => {
            // Skip if we are mid-rebuild to prevent rapid-fire loop triggers
            if (stateRef.current.isRebuilding) return;

            const virtualTime = (stateRef.current.streamOffset || 0) + audio.currentTime;

            // Regional Loop Boundary Check
            if (
                stateRef.current.isLooping &&
                stateRef.current.loopOut > 0 &&
                virtualTime >= stateRef.current.loopOut
            ) {
                console.log('[Playback] Loop boundary reached. Jumping to:', stateRef.current.loopIn);
                // Loop seeks always resume playing
                commitSeekInternal(stateRef.current.loopIn, true);
                return;
            }

            setState(prev => ({ ...prev, currentTime: virtualTime }));
        };

        const onLoadedMetadata = () => {
            const duration = audio.duration;
            setState(prev => {
                const finalDuration = (isNaN(duration) || duration === Infinity) ? prev.duration : duration;
                return {
                    ...prev,
                    duration: finalDuration,
                    loopOut: (prev.loopOut === 0) ? finalDuration : prev.loopOut,
                };
            });
        };

        const onEnded = () => {
            setState(prev => {
                if (!prev.isLooping) {
                    return { ...prev, isPlaying: false, currentTime: 0 };
                }
                return prev;
            });
        };

        const onPlay = () => {
            if (!stateRef.current.isPlaying) {
                setState(prev => ({ ...prev, isPlaying: true }));
            }
        };

        const onPause = () => {
            if (stateRef.current.isPlaying) {
                setState(prev => ({ ...prev, isPlaying: false }));
            }
        };

        const onError = () => {
            console.error('Audio Playback Error:', audio.error);
            setState(prev => ({ ...prev, isPlaying: false, isRebuilding: false }));
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
            if (rebuildTimeoutRef.current) clearTimeout(rebuildTimeoutRef.current);
        };
    }, []);

    // ------------------------------------------------------------------
    // 2. Probe — triggered when currentFile changes
    // ------------------------------------------------------------------
    useEffect(() => {
        const currentFile = state.currentFile;
        if (!currentFile) return;

        let isMounted = true;

        const probe = async () => {
            console.log(`[Playback] [Step 2] Probing: ${currentFile}`);
            try {
                const res = await fetch(`http://127.0.0.1:45455/probe-metadata?file=${encodeURIComponent(currentFile)}`);
                if (!res.ok) throw new Error('Probe failed');
                const data = await res.json();

                if (isMounted) {
                    console.log(`[Playback] [Step 2] Probe Success: ${data.channels}ch`);
                    setState(prev => {
                        const finalDuration = (data.duration && !isNaN(data.duration)) ? data.duration : prev.duration;
                        return {
                            ...prev,
                            duration: finalDuration,
                            channels: data.channels || 0,
                            loopOut: (prev.loopOut === 0) ? finalDuration : prev.loopOut,
                        };
                    });
                }
            } catch (err) {
                console.error('[Playback] [Step 2] Probe failed:', err);
            }
        };

        probe();
        return () => { isMounted = false; };
    }, [state.currentFile]);

    // ------------------------------------------------------------------
    // 3. Commit — build/rebuild stream when requestedSeekTime or file changes
    // ------------------------------------------------------------------
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !state.currentFile || state.channels === 0) return;

        const { currentFile, channels, requestedSeekTime, isHeadphonesOn } = state;
        const start = requestedSeekTime !== undefined ? requestedSeekTime : 0;

        const params = new URLSearchParams();
        params.append('file', currentFile);
        params.append('channels', channels.toString());
        params.append('profile', 'ambient');
        params.append('start', start.toString());
        if (!isHeadphonesOn) params.append('render', 'stereo');
        params.append('_t', Date.now().toString());

        const newSrc = `http://127.0.0.1:45455/obr-stream?${params.toString()}`;

        if (audio.src !== newSrc) {
            console.log(`[Playback] [Step 3] Committing Stream: ${newSrc}`);
            audio.src = newSrc;
            audio.load();

            if (playbackIntentRef.current) {
                console.log('[Playback] [Step 3] Intent detected — executing play()');
                audio.play().catch((e: any) => {
                    if (e.name !== 'AbortError') console.error('[Playback] [Step 3] Play blocked:', e);
                });
                playbackIntentRef.current = false;
            }

            setState(prev => ({ ...prev, streamOffset: start }));
        }
    }, [state.currentFile, state.channels, state.requestedSeekTime, state.isHeadphonesOn, state.seekNonce]);

    // ------------------------------------------------------------------
    // 4. Dispatcher — keeps native audio element in sync with React state
    // ------------------------------------------------------------------
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audio.src) return;

        if (state.isPlaying && audio.paused) {
            audio.play().catch(e => {
                if (e.name !== 'AbortError') console.error('[Playback] Dispatcher: Play failed:', e);
            });
        } else if (!state.isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [state.isPlaying]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.loop = state.isLooping;
    }, [state.isLooping]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = state.volume;
    }, [state.volume]);

    // ------------------------------------------------------------------
    // Handlers
    // ------------------------------------------------------------------

    const togglePlayPause = () => {
        if (state.isRebuilding) return; // Locked — no-op
        setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    };

    const stop = () => {
        if (rebuildTimeoutRef.current) clearTimeout(rebuildTimeoutRef.current);
        setState(prev => ({ ...prev, isPlaying: false, currentTime: 0, streamOffset: 0, requestedSeekTime: undefined, isRebuilding: false }));
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            const oldSrc = audio.src;
            audio.src = '';
            audio.src = oldSrc;
        }
    };

    const next = () => console.log('Next track (stub)');
    const prev = () => console.log('Previous track (stub)');

    /**
     * Visual-only seek. Updates the UI playhead position.
     * Does NOT trigger IPC or backend rebuild.
     */
    const seek = (time: number) => {
        setState(prev => ({ ...prev, currentTime: time }));
    };

    /**
     * Internal seek used by the loop boundary trigger.
     * Always fires immediately (no debounce).
     */
    const commitSeekInternal = (time: number, wasPlaying: boolean) => {
        const audio = audioRef.current;
        if (!audio) return;

        if (wasPlaying) {
            playbackIntentRef.current = true;
            audio.pause();
        }

        // Update visual position immediately
        setState(prev => ({ ...prev, currentTime: time }));

        // Enter locked state BEFORE triggering the backend commit
        enterRebuildLock(wasPlaying);

        // Commit triggers Step 3 useEffect
        setState(prev => ({ ...prev, requestedSeekTime: time, seekNonce: Date.now() }));
    };

    /**
     * Committed seek — triggered on mouseUp/touchEnd.
     * This is the only function that talks to the backend.
     */
    const commitSeek = (time: number) => {
        if (state.isRebuilding) return; // Already rebuilding — no-op

        const audio = audioRef.current;
        if (!audio) return;

        const wasPlaying = !audio.paused;
        if (wasPlaying) {
            playbackIntentRef.current = true;
            audio.pause();
        }

        // Update UI position
        setState(prev => ({ ...prev, currentTime: time }));

        // Enter lock (different events depending on playback intent)
        enterRebuildLock(wasPlaying);

        // Trigger backend commit
        setState(prev => ({ ...prev, requestedSeekTime: time, seekNonce: Date.now() }));
    };

    const setLoopPoints = (inTime: number, outTime: number) => {
        setState(prev => ({ ...prev, loopIn: inTime, loopOut: outTime }));
    };

    const setVolume = (vol: number) => setState(prev => ({ ...prev, volume: vol }));

    const toggleLoop = () => setState(prev => ({ ...prev, isLooping: !prev.isLooping }));

    const toggleHeadphones = () => setState(prev => ({ ...prev, isHeadphonesOn: !prev.isHeadphonesOn }));

    const setHrtfProfile = (profile: string) => setState(prev => ({ ...prev, hrtfProfile: profile }));

    const setCurrentFile = (filePath: string | null, shouldPlay = false) => {
        console.log(`[Playback] [Step 1] Intent: ${filePath}, shouldPlay: ${shouldPlay}`);

        if (shouldPlay) {
            playbackIntentRef.current = true;
        }

        setState(prev => {
            if (prev.currentFile === filePath) {
                if (shouldPlay && !prev.isPlaying && prev.channels > 0) {
                    return { ...prev, isPlaying: true };
                }
                return prev;
            }

            const audio = audioRef.current;
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }

            playbackIntentRef.current = shouldPlay;

            return {
                ...prev,
                currentFile: filePath,
                currentTime: 0,
                isPlaying: false,
                channels: 0,
                requestedSeekTime: undefined,
                streamOffset: 0,
                loopIn: 0,
                loopOut: 0,
                isRebuilding: false,
                seekNonce: 0,
            };
        });
    };

    return (
        <PlaybackContext.Provider value={{
            state,
            togglePlayPause,
            play: () => { if (!state.isRebuilding) setState(prev => ({ ...prev, isPlaying: true })); },
            pause: () => setState(prev => ({ ...prev, isPlaying: false })),
            stop,
            next,
            prev,
            seek,
            commitSeek,
            setVolume,
            toggleLoop,
            setLoopPoints,
            toggleHeadphones,
            setHrtfProfile,
            setCurrentFile,
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

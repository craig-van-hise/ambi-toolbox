import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useAudioEngine } from './AudioEngineContext';

interface TransportContextType {
    isPlaying: boolean;
    isLooping: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    currentFile: string | null;
    loopIn: number;
    loopOut: number;

    // Actions
    play: () => void;
    pause: () => void;
    stop: () => void;
    togglePlayPause: () => void;
    toggleLoop: () => void;
    setVolume: (vol: number) => void;
    setLoopPoints: (inTime: number, outTime: number) => void;
    setCurrentFile: (file: string | null, shouldPlay?: boolean) => void;
    seek: (time: number) => void;
    commitSeek: (time: number) => void;
}

const TransportContext = createContext<TransportContextType | undefined>(undefined);

export const TransportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        audioInstance,
        isRebuilding,
        duration,
        channels,
        commitStream,
        cleanupAudio,
        probeFile
    } = useAudioEngine();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentFile, setCurrentFileState] = useState<string | null>(null);
    const [loopIn, setLoopIn] = useState(0);
    const [loopOut, setLoopOut] = useState(0);
    const [streamOffset, setStreamOffset] = useState(0);

    const stateRef = useRef({ isPlaying, isLooping, loopIn, loopOut, streamOffset, isRebuilding });

    const stop = useCallback(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setStreamOffset(0);
        cleanupAudio();
    }, [cleanupAudio]);

    const commitSeekInternal = (time: number, resume: boolean) => {
        if (!currentFile) {
            console.warn('[Transport] commitSeekInternal: no currentFile, seek aborted.');
            return;
        }
        setStreamOffset(time);
        setCurrentTime(time);
        commitStream(currentFile, channels, time, Date.now());
        if (resume) setIsPlaying(true);
    };

    const play = () => {
        if (isRebuilding || !currentFile) return;

        if (!audioInstance || !audioInstance.src || audioInstance.src === 'about:blank') {
            // Re-commit stream with fresh cache-buster if it was purged by stop/EOF
            commitStream(currentFile, channels, currentTime, Date.now());
        }
        setIsPlaying(true);
    };

    const pause = () => setIsPlaying(false);

    useEffect(() => {
        stateRef.current = { isPlaying, isLooping, loopIn, loopOut, streamOffset, isRebuilding };
    }, [isPlaying, isLooping, loopIn, loopOut, streamOffset, isRebuilding]);

    // Handle Audio Events
    useEffect(() => {
        const audio = audioInstance;
        if (!audio) return;

        console.log('[Transport] Attaching listeners to new audio instance');

        const onTimeUpdate = () => {
            if (stateRef.current.isRebuilding) return;
            const virtualTime = stateRef.current.streamOffset + audio.currentTime;

            // Loop Check
            if (stateRef.current.isLooping && stateRef.current.loopOut > 0 && virtualTime >= stateRef.current.loopOut) {
                commitSeekInternal(stateRef.current.loopIn, true);
                return;
            }
            setCurrentTime(virtualTime);
        };

        const onEnded = () => {
            if (!stateRef.current.isLooping) {
                stop();
            }
        };

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onError = (e: any) => {
            console.error('[Transport] Audio Element Error:', audio.error || e);
            // Fatal error: cleanup and reset
            stop();
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('error', onError);

        return () => {
            console.log('[Transport] Detaching listeners from old audio instance');
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('error', onError);
        };
    }, [audioInstance, stop]);

    // Volume Sync
    useEffect(() => {
        if (audioInstance) audioInstance.volume = volume;
    }, [volume, audioInstance]);

    // Play/Pause Sync
    useEffect(() => {
        const audio = audioInstance;
        // Ensure we don't try to play an empty source
        if (!audio || !audio.src || audio.src === 'about:blank') return;

        // If we want to play, BUT the engine is rebuilding, do nothing. 
        // Wait for the canplay event to clear the isRebuilding lock.
        if (isPlaying && !isRebuilding && audio.paused) {
            audio.play().catch(e => {
                if (e.name !== 'AbortError') {
                    console.error('[Transport] Play failed:', e);
                    // If it's a source error, trigger stop to clean up
                    if (e.name === 'NotSupportedError' || e.message.includes('supported sources')) {
                        stop();
                    }
                }
            });
        } else if (!isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [isPlaying, isRebuilding, audioInstance, stop]);

    const togglePlayPause = () => {
        if (isRebuilding) return;
        if (!currentFile || !audioInstance?.src || audioInstance.src === 'about:blank') {
            // If stopped, but we have a file, trigger play which handles commit
            if (currentFile) play();
            return;
        }
        setIsPlaying(prev => !prev);
    };
    const toggleLoop = () => setIsLooping(prev => !prev);
    const setLoopPoints = (inTime: number, outTime: number) => {
        setLoopIn(inTime);
        setLoopOut(outTime);
    };

    const seek = (time: number) => setCurrentTime(time);
    const commitSeek = (time: number) => {
        if (isRebuilding) return;
        commitSeekInternal(time, isPlaying);
    };

    const setCurrentFile = useCallback(async (file: string | null, shouldPlay = false) => {
        if (currentFile === file) {
            if (shouldPlay) setIsPlaying(true);
            return;
        }

        if (audioInstance) {
            cleanupAudio();
        }

        setCurrentFileState(file);
        setCurrentTime(0);
        setStreamOffset(0);
        setIsPlaying(false);
        setLoopIn(0);
        setLoopOut(0);

        if (file) {
            const { duration: d, channels: c } = await probeFile(file);
            setLoopOut(d);
            commitStream(file, c, 0, Date.now());
            if (shouldPlay) setIsPlaying(true);
        }
    }, [currentFile, audioInstance, probeFile, commitStream, cleanupAudio, channels]);

    return (
        <TransportContext.Provider value={{
            isPlaying,
            isLooping,
            volume,
            currentTime,
            duration,
            currentFile,
            loopIn,
            loopOut,
            play,
            pause,
            stop,
            togglePlayPause,
            toggleLoop,
            setVolume,
            setLoopPoints,
            setCurrentFile,
            seek,
            commitSeek
        }}>
            {children}
        </TransportContext.Provider>
    );
};

export const useTransport = () => {
    const context = useContext(TransportContext);
    if (!context) throw new Error('useTransport must be used within TransportProvider');
    return context;
};

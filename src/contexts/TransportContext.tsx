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
        audioRef,
        isRebuilding,
        duration,
        channels,
        commitStream,
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

    useEffect(() => {
        stateRef.current = { isPlaying, isLooping, loopIn, loopOut, streamOffset, isRebuilding };
    }, [isPlaying, isLooping, loopIn, loopOut, streamOffset, isRebuilding]);

    // Handle Audio Events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

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
                setIsPlaying(false);
                setCurrentTime(0);
            }
        };

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
        };
    }, [audioRef]);

    // Volume Sync
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume, audioRef]);

    // Play/Pause Sync
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audio.src) return;

        if (isPlaying && audio.paused) {
            audio.play().catch(e => {
                if (e.name !== 'AbortError') console.error('[Transport] Play failed:', e);
            });
        } else if (!isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [isPlaying, audioRef]);

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
        if (!isRebuilding && currentFile && audioRef.current?.src && audioRef.current.src !== 'about:blank') {
            setIsPlaying(true);
        }
    };
    const pause = () => setIsPlaying(false);
    const stop = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setStreamOffset(0);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = 'about:blank';
            audioRef.current.currentTime = 0;
        }
    };

    const togglePlayPause = () => {
        if (isRebuilding) return;
        if (!currentFile || !audioRef.current?.src || audioRef.current.src === 'about:blank') return;
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

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = 'about:blank';
            audioRef.current.currentTime = 0;
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
    }, [currentFile, audioRef, probeFile, commitStream, channels]);

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

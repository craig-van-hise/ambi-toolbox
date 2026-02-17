import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlayerState, HrtfProfile } from '../types';

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
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<PlayerState>({
        currentTime: 0,
        duration: 0,
        isPlaying: false,
        isLooping: false,
        isHeadphonesOn: false,
        volume: 0.8,
        hrtfProfile: HrtfProfile.Neumann
    });

    const togglePlayPause = () => {
        setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    };

    const stop = () => {
        setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    };

    const next = () => {
        console.log('Next track (stub)');
    };

    const prev = () => {
        console.log('Previous track (stub)');
    };

    const seek = (time: number) => {
        setState(prev => ({ ...prev, currentTime: time }));
    };

    const setVolume = (vol: number) => {
        setState(prev => ({ ...prev, volume: vol }));
    };

    const toggleLoop = () => {
        setState(prev => ({ ...prev, isLooping: !prev.isLooping }));
    };

    const toggleHeadphones = () => {
        setState(prev => ({ ...prev, isHeadphonesOn: !prev.isHeadphonesOn }));
    };

    const setHrtfProfile = (profile: string) => {
        setState(prev => ({ ...prev, hrtfProfile: profile }));
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
            setHrtfProfile
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

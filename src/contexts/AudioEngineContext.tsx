import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { HrtfProfile, ToolId } from '../types';
import { useSettings } from './SettingsContext';

interface AudioEngineContextType {
    isRebuilding: boolean;
    isHeadphonesOn: boolean;
    hrtfProfile: HrtfProfile;
    customSofaPath: string | null;
    duration: number;
    channels: number;

    // Actions
    toggleHeadphones: () => void;
    setHrtfProfile: (profile: string) => void;
    setCustomSofaPath: (path: string | null) => void;

    // Internal use for Transport
    audioRef: React.RefObject<HTMLAudioElement>;
    commitStream: (file: string, channels: number, start: number, nonce: number) => void;
    probeFile: (file: string) => Promise<{ duration: number, channels: number }>;
}

const AudioEngineContext = createContext<AudioEngineContextType | undefined>(undefined);

export const AudioEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { settings, updateSettings } = useSettings();

    const [isRebuilding, setIsRebuilding] = useState(false);
    const [isHeadphonesOn, setIsHeadphonesOn] = useState(true);
    const [hrtfProfile, setHrtfProfileState] = useState<HrtfProfile>(HrtfProfile.Neumann);
    const [customSofaPath, setCustomSofaPathState] = useState<string | null>(null);
    const [duration, setDuration] = useState(0);
    const [channels, setChannels] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(new Audio());
    const rebuildTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const playbackIntentRef = useRef(false);

    // Boot Hydration
    useEffect(() => {
        const globalSettings = settings.toolSettings?.globalPlayback;
        if (globalSettings) {
            if (globalSettings.hrtfProfile) setHrtfProfileState(globalSettings.hrtfProfile as HrtfProfile);
            if (globalSettings.customSofaPath) setCustomSofaPathState(globalSettings.customSofaPath);
        }
    }, [settings.toolSettings?.globalPlayback]);

    const clearRebuildLock = () => {
        if (rebuildTimeoutRef.current) {
            clearTimeout(rebuildTimeoutRef.current);
            rebuildTimeoutRef.current = null;
        }
        setIsRebuilding(false);
    };

    const enterRebuildLock = (wasPlaying: boolean) => {
        if (rebuildTimeoutRef.current) clearTimeout(rebuildTimeoutRef.current);
        setIsRebuilding(true);

        const audio = audioRef.current;
        const unlockEvent = wasPlaying ? 'playing' : 'canplay';

        const onUnlock = () => {
            audio.removeEventListener(unlockEvent, onUnlock);
            clearRebuildLock();
        };

        const onLoadedData = () => {
            if (!wasPlaying) {
                audio.removeEventListener('loadeddata', onLoadedData);
                clearRebuildLock();
            }
        };

        audio.addEventListener(unlockEvent, onUnlock, { once: true });
        if (!wasPlaying) audio.addEventListener('loadeddata', onLoadedData, { once: true });

        rebuildTimeoutRef.current = setTimeout(() => {
            audio.removeEventListener(unlockEvent, onUnlock);
            audio.removeEventListener('loadeddata', onLoadedData);
            setIsRebuilding(false);
            rebuildTimeoutRef.current = null;
        }, 3000);
    };

    const probeFile = async (file: string) => {
        try {
            const res = await fetch(`http://127.0.0.1:45455/probe-metadata?file=${encodeURIComponent(file)}`);
            if (!res.ok) throw new Error('Probe failed');
            const data = await res.json();
            setDuration(data.duration || 0);
            setChannels(data.channels || 0);
            return { duration: data.duration || 0, channels: data.channels || 0 };
        } catch (err) {
            console.error('[AudioEngine] Probe failed:', err);
            return { duration: 0, channels: 0 };
        }
    };

    const commitStream = (file: string, ch: number, start: number, nonce: number) => {
        const audio = audioRef.current;
        if (!audio || !file || ch === 0) return;

        const wasPlaying = !audio.paused;
        if (wasPlaying) {
            playbackIntentRef.current = true;
            audio.pause();
        }

        enterRebuildLock(wasPlaying);

        const params = new URLSearchParams();
        params.append('file', file);
        params.append('channels', ch.toString());
        params.append('profile', 'ambient');
        params.append('hrtfProfile', hrtfProfile);
        if (hrtfProfile === HrtfProfile.Custom && customSofaPath) {
            params.append('sofaPath', customSofaPath);
        }
        params.append('start', start.toString());
        params.append('_t', nonce.toString());

        // Apply Rotation ONLY if AmbiRotate is the active tool
        if (settings.lastActiveTool === ToolId.AmbiRotate) {
            const rot = settings.toolSettings?.['ambirotate'] || { yaw: 0, pitch: 0, roll: 0 };
            params.append('yaw', rot.yaw.toString());
            params.append('pitch', rot.pitch.toString());
            params.append('roll', rot.roll.toString());
        }

        if (!isHeadphonesOn) params.append('render', 'stereo');

        const endpoint = (isHeadphonesOn && ch >= 4) ? 'obr-stream' : 'stream';
        const newSrc = `http://127.0.0.1:45455/${endpoint}?${params.toString()}`;

        console.log(`[AudioEngine] Committing Stream: ${newSrc}`);
        audio.src = newSrc;
        audio.load();

        if (playbackIntentRef.current) {
            audio.play().catch(e => {
                if (e.name !== 'AbortError') console.error('[AudioEngine] Play blocked:', e);
            });
            playbackIntentRef.current = false;
        }
    };

    const toggleHeadphones = () => setIsHeadphonesOn(prev => !prev);

    const setHrtfProfile = (profile: string) => {
        setHrtfProfileState(profile as HrtfProfile);
        updateSettings(prev => ({
            ...prev,
            toolSettings: {
                ...prev.toolSettings,
                globalPlayback: { ...prev.toolSettings?.globalPlayback, hrtfProfile: profile }
            }
        }));
    };

    const setCustomSofaPath = (path: string | null) => {
        setCustomSofaPathState(path);
        if (path) setHrtfProfileState(HrtfProfile.Custom);
        updateSettings(prev => ({
            ...prev,
            toolSettings: {
                ...prev.toolSettings,
                globalPlayback: {
                    ...prev.toolSettings?.globalPlayback,
                    hrtfProfile: path ? HrtfProfile.Custom : hrtfProfile,
                    customSofaPath: path
                }
            }
        }));
    };

    return (
        <AudioEngineContext.Provider value={{
            isRebuilding,
            isHeadphonesOn,
            hrtfProfile,
            customSofaPath,
            duration,
            channels,
            toggleHeadphones,
            setHrtfProfile,
            setCustomSofaPath,
            audioRef,
            commitStream,
            probeFile
        }}>
            {children}
        </AudioEngineContext.Provider>
    );
};

export const useAudioEngine = () => {
    const context = useContext(AudioEngineContext);
    if (!context) throw new Error('useAudioEngine must be used within AudioEngineProvider');
    return context;
};

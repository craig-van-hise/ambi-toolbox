import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mocking some browser globals for the test
if (typeof HTMLAudioElement === 'undefined') {
    (global as any).HTMLAudioElement = class {};
}

describe('Ephemeral Audio Lifecycle', () => {
    let audioInstances: any[] = [];
    
    // Mock for new Audio()
    const MockAudio = vi.fn().mockImplementation(() => {
        const instance = {
            play: vi.fn().mockResolvedValue(undefined),
            pause: vi.fn(),
            load: vi.fn(),
            removeAttribute: vi.fn(),
            src: '',
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        };
        audioInstances.push(instance);
        return instance;
    });

    beforeEach(() => {
        audioInstances = [];
        vi.stubGlobal('Audio', MockAudio);
    });

    it('should create a new instance on every commit', () => {
        // Simulation of AudioEngineProvider logic
        let audioRef: { current: any } = { current: null };
        
        const commitStream = (url: string) => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeAttribute('src');
                audioRef.current.load();
                audioRef.current = null;
            }
            const newAudio = new Audio(url);
            audioRef.current = newAudio;
        };

        commitStream('url1');
        expect(audioInstances.length).toBe(1);
        const firstInstance = audioInstances[0];

        commitStream('url2');
        expect(audioInstances.length).toBe(2);
        expect(firstInstance.pause).toHaveBeenCalled();
        expect(firstInstance.removeAttribute).toHaveBeenCalledWith('src');
        expect(audioRef.current).not.toBe(firstInstance);
        expect(audioRef.current).toBe(audioInstances[1]);
    });

    it('should cleanup correctly on stop', () => {
        let audioRef: { current: any } = { current: new Audio('url1') };
        
        const cleanupAudio = () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeAttribute('src');
                audioRef.current.load();
                audioRef.current = null;
            }
        };

        cleanupAudio();
        expect(audioRef.current).toBeNull();
        expect(audioInstances[0].pause).toHaveBeenCalled();
        expect(audioInstances[0].removeAttribute).toHaveBeenCalledWith('src');
    });
});

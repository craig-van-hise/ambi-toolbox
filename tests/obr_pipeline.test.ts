
import { describe, it, expect, vi } from 'vitest';
import { createObrPipeline } from '../electron/handlers/ObrHandler';
import { spawn } from 'child_process';

// Mock child_process and common
vi.mock('child_process', () => ({
    spawn: vi.fn(() => ({
        on: vi.fn(),
        stdout: { on: vi.fn(), pipe: vi.fn(() => ({ pipe: vi.fn() })) },
        stderr: { on: vi.fn() },
        stdin: { on: vi.fn() }
    }))
}));

vi.mock('../electron/handlers/common', () => ({
    getFfmpegPath: () => 'ffmpeg',
    getFfprobePath: () => 'ffprobe',
    getBinaryPath: (name: string) => name,
    getSofaAssetPath: (name: string) => name
}));

describe('OBR Pipeline Hardening', () => {
    it('should force libopus decoder and use discrete channel mapping for .opus files', () => {
        const inputPath = 'test_audio.opus';
        const channels = 16;
        const profile = 'ambient';

        createObrPipeline(inputPath, channels, profile);

        const spawnCalls = vi.mocked(spawn).mock.calls;
        const decoderArgs = spawnCalls[0][1];

        // Phase 1 requirements:
        // 1. '-c:a', 'libopus' should be at the start
        expect(decoderArgs[0]).toBe('-c:a');
        expect(decoderArgs[1]).toBe('libopus');
        expect(decoderArgs).toContain('-i');

        // 2. channelmap=map=0|1|...|15
        const expectedMap = Array.from({ length: 16 }, (_, i) => i).join('|');
        expect(decoderArgs).toContain(`channelmap=map=${expectedMap}`);

        // 3. -strict experimental
        expect(decoderArgs).toContain('-strict');
        expect(decoderArgs).toContain('experimental');
    });

    it('should use normal decoding for .wav files but still use channelmap', () => {
        const inputPath = 'test_audio.wav';
        const channels = 4;
        const profile = 'ambient';

        createObrPipeline(inputPath, channels, profile);

        const spawnCalls = vi.mocked(spawn).mock.calls;
        // The second call (index 3 because of previous test) - wait, Vitest resets mocks?
        // Let's use the last call or clear.
        const lastCallArgs = spawnCalls[spawnCalls.length - 3][1]; // 3 processes per pipeline

        expect(lastCallArgs).not.toContain('libopus');
        const expectedMap = '0|1|2|3';
        expect(lastCallArgs).toContain(`channelmap=map=${expectedMap}`);
    });
});

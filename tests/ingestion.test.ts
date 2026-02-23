import { describe, it, expect, vi } from 'vitest';
import { prepareStreamTarget } from '../electron/handlers/IngestionRouter';
import path from 'path';

// Mock dependencies
vi.mock('node:child_process', () => ({
    spawn: vi.fn(() => ({
        stdout: { on: vi.fn() },
        stderr: { on: vi.fn() },
        on: vi.fn((event, cb) => {
            if (event === 'close') cb(0);
        })
    }))
}));

vi.mock('node:fs', async () => {
    const actual = await vi.importActual<any>('node:fs');
    return {
        ...actual,
        default: {
            ...actual,
            existsSync: vi.fn((p) => p.includes('exists') || p.includes('.ambi_tmp.wav')),
            statSync: vi.fn(() => ({ size: 1024, mtimeMs: 1600000000000 }))
        },
        existsSync: vi.fn((p) => p.includes('exists') || p.includes('.ambi_tmp.wav')),
        statSync: vi.fn(() => ({ size: 1024, mtimeMs: 1600000000000 }))
    };
});

describe('IngestionRouter', () => {
    it('should return a proxy path for .aivu files via afconvert (PRP #123)', async () => {
        const input = '/test/Desert_Extreme.aivu';
        const result = await prepareStreamTarget(input);
        expect(result).not.toBe(input);
        expect(result).toContain('.ambi_tmp.wav');
    });

    it('should return original path for standard .wav files', async () => {
        const input = '/test/audio.wav';
        const result = await prepareStreamTarget(input);
        expect(result).toBe(input);
    });

    it('should trigger transcoding for .iamf files', async () => {
        const input = '/test/somefile.iamf';
        // Mock spawn for this test specifically if needed, but the mock above triggers on('close') which is enough
        const result = await prepareStreamTarget(input);

        // Since it's a proprietary extension, it should attempt to transcode.
        // It'll return a temp path.
        expect(result).not.toBe(input);
        expect(result).toContain('.ambi_tmp.wav');
    });
});

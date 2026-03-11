import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import path from 'path';
import fs from 'fs';

// Mock electron app.getPath BEFORE importing the handler
vi.mock('../electron/shim', () => ({
    app: {
        getPath: vi.fn().mockReturnValue('/tmp'),
    },
}));

// Mock FfWrapper to inspect args
import { FfWrapper } from '../electron/utils/FfWrapper';
vi.mock('../electron/utils/FfWrapper', () => ({
    FfWrapper: {
        run: vi.fn().mockResolvedValue(undefined)
    }
}));

// Mock fs.readFileSync
vi.mock('fs', async (importOriginal) => {
    const actual = await importOriginal() as any;
    return {
        ...actual,
        default: {
            ...actual.default,
            readFileSync: vi.fn().mockReturnValue(Buffer.from('mock audio data')),
        },
        readFileSync: vi.fn().mockReturnValue(Buffer.from('mock audio data')),
        existsSync: actual.existsSync,
    };
});

import { generateProxy } from '../electron/handlers/trim';

describe('AmbiTrim Backend Logic (PRP #145)', () => {
    
    it('generateProxy should request a PCM WAV proxy with correct FFmpeg args', async () => {
        const inputPath = '/path/to/input.wav';
        
        await generateProxy(inputPath);

        const lastCall = vi.mocked(FfWrapper.run).mock.calls[0][0];
        const args = lastCall.args as string[];

        // Check for WAV extension in output path (last arg)
        const outputPath = args[args.length - 1];
        expect(outputPath.endsWith('.wav')).toBe(true);
        expect(outputPath).toContain('ambitrim_proxy_');

        // Check for PCM encoder
        expect(args).toContain('pcm_s16le');
        expect(args).toContain('-c:a');

        // Ensure MP3 residues are GONE
        expect(args).not.toContain('libmp3lame');
        expect(args).not.toContain('-b:a');
        expect(args).not.toContain('192k');
    });
});

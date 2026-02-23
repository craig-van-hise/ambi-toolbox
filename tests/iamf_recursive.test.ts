import { describe, it, expect, vi } from 'vitest';
import { analyzeAmbiFile } from '../electron/handlers/AmbiData';
import fs from 'node:fs';
import path from 'node:path';

// Mock dependencies
vi.mock('electron', () => ({
    app: { isPackaged: false },
    ipcMain: { handle: vi.fn() }
}));

vi.mock('node:child_process', () => ({
    spawn: vi.fn(() => ({
        stdout: { on: vi.fn() },
        stderr: { on: vi.fn() },
        on: vi.fn((event, cb) => {
            if (event === 'close') cb(0);
        })
    }))
}));

// Mock probeAudio to return 16 channels as a baseline
vi.mock('../electron/handlers/common', async (importOriginal) => {
    const actual = await importOriginal() as any;
    return {
        ...actual,
        getFfmpegPath: () => '/mock/bin/ffmpeg',
        getFfprobePath: () => '/mock/bin/ffprobe',
        probeAudio: vi.fn().mockResolvedValue({
            duration: 1,
            channels: 16,
            sampleRate: 48000
        }),
    };
});

describe('AmbiData Phase 2 Verification (PRP #125)', () => {
    it('should detect 16 channels from a nested IAMF OBU', async () => {
        const testFile = path.join(process.cwd(), 'phase2_test.iamf');

        // Create a dummy IAMF file with an Audio Element OBU (Type 32)
        const buffer = Buffer.alloc(100);
        let offset = 0;

        // OBU Type 32 (Audio Element)
        buffer[offset++] = 32;
        // Size
        buffer[offset++] = 10;

        // Payload start
        // Element ID (Leb128)
        buffer[offset++] = 1;
        // Type + Reserved (Top 3 bits: 1 for Scene-Based)
        buffer[offset++] = (1 << 5);
        // Ambisonic Mode (Leb128: 1 for Projection)
        buffer[offset++] = 1;
        // Output Channel Count (Leb128: 16)
        buffer[offset++] = 16;

        fs.writeFileSync(testFile, buffer);

        const mockEvent = {
            sender: { send: vi.fn() }
        };

        try {
            const result = await analyzeAmbiFile(mockEvent as any, testFile);
            expect(result.audio.channelCount).toBe(16);
            expect(result.spatial.formatPrediction).toBe('Generic Scene-Based (16ch)');
        } finally {
            if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
        }
    });
});

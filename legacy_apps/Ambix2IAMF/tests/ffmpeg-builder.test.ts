import { describe, it, expect, vi } from 'vitest';
import { convertFileWithFFmpeg } from '../electron/ffmpeg-helper';
import { spawn } from 'cross-spawn';
import type { ChildProcess } from 'child_process';
import { EventEmitter } from 'events';

// Mock cross-spawn
vi.mock('cross-spawn', () => ({
    spawn: vi.fn(),
}));

describe('FFmpeg Builder', () => {
    it('should call spawn with exact arguments', async () => {
        // Mock spawn return value
        const mockProcess = new EventEmitter() as ChildProcess;
        // @ts-ignore
        mockProcess.stdout = new EventEmitter();
        // @ts-ignore
        mockProcess.stderr = new EventEmitter();

        (spawn as any).mockReturnValue(mockProcess);

        const promise = convertFileWithFFmpeg('/path/to/input.wav');

        // Simulate close event
        setTimeout(() => {
            mockProcess.emit('close', 0);
        }, 10);

        await promise;

        expect(spawn).toHaveBeenCalledWith('ffmpeg', [
            '-y',
            '-i', '/path/to/input.wav',
            '-af', 'aformat=channel_layouts=ambisonic',
            '-c:a', 'libopus',
            '-b:a', '2560k',
            '-f', 'iamf',
            '/path/to/input.iamf'
        ]);
    });
});

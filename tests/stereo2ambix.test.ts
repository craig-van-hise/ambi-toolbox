import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleStereo2Ambix } from '../electron/handlers/Stereo2Ambix';
import { IpcMainInvokeEvent } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

// Mock dependencies
vi.mock('electron', () => ({
    app: { isPackaged: false, getPath: vi.fn(() => '/mock/userData') },
    ipcMain: { handle: vi.fn() }
}));

vi.mock('../electron/shim', () => ({
    app: { isPackaged: false, getPath: vi.fn(() => '/mock/userData') }
}));

vi.mock('node:child_process', () => ({
    spawn: vi.fn(() => ({
        stdout: { on: vi.fn() },
        stderr: { on: vi.fn() },
        on: vi.fn((event, cb) => {
            if (event === 'close') cb(0); // auto succeed
        })
    }))
}));

// Mock common utilities
vi.mock('../electron/handlers/common', async (importOriginal) => {
    return {
        getBinaryPath: (name: string) => `/mock/bin/${name}`,
        determineOutputPath: (input: string, settings: any, folder: string, suffix: string) => input.replace(/\.[^/.]+$/, "") + suffix
    };
});

// Mock FS
vi.mock('node:fs', async () => {
    const actual = await vi.importActual<any>('node:fs');
    return {
        ...actual,
        default: {
            ...actual,
            existsSync: vi.fn(() => true),
            mkdirSync: vi.fn(),
            promises: {
                ...actual.promises,
                writeFile: vi.fn(),
                readFile: vi.fn(),
                stat: vi.fn().mockResolvedValue({
                    mtimeMs: 123456789,
                    size: 1024
                })
            }
        },
        existsSync: vi.fn(() => true),
        mkdirSync: vi.fn(),
        promises: {
            ...actual.promises,
            writeFile: vi.fn(),
            readFile: vi.fn(),
            stat: vi.fn().mockResolvedValue({
                mtimeMs: 123456789,
                size: 1024
            })
        }
    };
});

describe('Stereo2Ambix Handler', () => {
    let mockEvent: IpcMainInvokeEvent;
    let spawnMock: any;

    beforeEach(async () => {
        spawnMock = (await import('node:child_process')).spawn;
        spawnMock.mockClear();

        mockEvent = {
            sender: {
                send: vi.fn()
            }
        } as any;

        // Clear all mock calls on fs
        vi.mocked(fs.existsSync).mockClear();
    });

    it('should validate parameters and fail on invalid targetOrder', async () => {
        const result = await handleStereo2Ambix(mockEvent, {
            files: ['/test/input.wav'],
            targetOrder: '8th Order', // Invalid
            stageWidth: 50,
            envelopment: 50
        });

        expect(result.success).toBe(false);
        expect(result.error).toContain('Invalid target order');
        expect(spawnMock).not.toHaveBeenCalled();
    });

    it('should fail on invalid stageWidth', async () => {
        const result = await handleStereo2Ambix(mockEvent, {
            files: ['/test/input.wav'],
            targetOrder: '3rd Order',
            stageWidth: 150, // Invalid (0-100)
            envelopment: 50
        });

        expect(result.success).toBe(false);
        expect(result.error).toContain('Stage width must be between 0 and 100');
        expect(spawnMock).not.toHaveBeenCalled();
    });

    it('should spawn python script with correct args', async () => {
        // First run - cache miss
        vi.mocked(fs.existsSync).mockImplementation((path: any) => {
            if (path.includes('.cache')) return false; // Force cache miss
            return true;
        });

        const result = await handleStereo2Ambix(mockEvent, {
            files: ['/test/input.wav'],
            targetOrder: '3rd Order',
            stageWidth: 70,
            envelopment: 30
        });

        expect(result.success).toBe(true);
        expect(spawnMock).toHaveBeenCalledTimes(1);

        const call = spawnMock.mock.calls[0];
        const cmd = call[0];
        const args = call[1];

        expect(cmd).toBe('python3');
        expect(args).toContain('--input');
        expect(args).toContain('--order');
        expect(args[args.indexOf('--order') + 1]).toBe('3');
        expect(args).toContain('--width');
        expect(args[args.indexOf('--width') + 1]).toBe('70');
        expect(args).toContain('--envelopment');
        expect(args[args.indexOf('--envelopment') + 1]).toBe('30');
    });

    it('should hit cache for identical parameters and file state', async () => {
        // Second run - cache hit
        vi.mocked(fs.existsSync).mockImplementation((path: any) => {
            if (path.includes('.cache')) return true; // Force cache hit
            return true;
        });

        // Assume file generated successfully and exists
        (fs.promises.readFile as any).mockResolvedValueOnce(JSON.stringify({
            outputPath: '/test/input_Stereo2Ambix.wav'
        }));

        const result = await handleStereo2Ambix(mockEvent, {
            files: ['/test/input.wav'],
            targetOrder: '3rd Order',
            stageWidth: 70,
            envelopment: 30
        });

        expect(result.success).toBe(true);
        expect(result.data.outputPaths[0]).toBe('/test/input_Stereo2Ambix.wav');
        expect(spawnMock).not.toHaveBeenCalled(); // Should not run python script
    });
});

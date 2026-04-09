import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleAmbix2Opus } from '../electron/handlers/Ambix2Opus';
import { handleAmbix2Bin } from '../electron/handlers/Ambix2Bin';
import { handleAmbix2IAMF } from '../electron/handlers/Ambix2IAMF';
import { handleAmbix2CAF } from '../electron/handlers/Ambix2CAF';
import { handleAmbiOrder } from '../electron/handlers/AmbiOrder';
import { handleAmbiSwap } from '../electron/handlers/AmbiSwap';
import { IpcMainInvokeEvent } from 'electron';

// Mock dependencies
vi.mock('electron', () => ({
    app: { isPackaged: false },
    ipcMain: { handle: vi.fn() }
}));

vi.mock('../electron/shim', () => ({
    app: { isPackaged: false }
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
        getFfmpegPath: () => '/mock/bin/ffmpeg',
        getFfprobePath: () => '/mock/bin/ffprobe',
        probeAudio: vi.fn().mockResolvedValue({
            duration: 10,
            channels: 16,
            sampleRate: 48000
        }),
        determineOutputPath: (input: string, _settings: any, _format: string, suffix: string) => input.replace(/\.[^/.]+$/, "") + suffix
    };
});

// Mock FS globally
vi.mock('node:fs', async () => {
    const actual = await vi.importActual<any>('node:fs');
    return {
        ...actual,
        default: {
            ...actual,
            existsSync: () => true, // Always exist
            promises: {
                ...actual.promises,
                writeFile: vi.fn(),
                unlink: vi.fn(),
                rename: vi.fn(),
            }
        },
        existsSync: () => true,
        promises: {
            ...actual.promises,
            writeFile: vi.fn(),
            unlink: vi.fn(),
            rename: vi.fn(),
        }
    };
});


describe('Backend Handlers', () => {
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
    });

    describe('Ambix2Opus', () => {
        it('should generate correct FFmpeg args for High Quality 3rd Order', async () => {
            const result = await handleAmbix2Opus(mockEvent, {
                files: ['/test/input.wav'],
                bitrate: 'High (96kbps)'
            });

            expect(result.success).toBe(true);

            // Check Spawn Args
            expect(spawnMock).toHaveBeenCalledWith('/mock/bin/ffmpeg', expect.arrayContaining(['-b:a', '1536k', '-mapping_family', '2']));
        });

        it('should use mapping family 255 for stereo (non-ambisonics)', async () => {
            // Override probe for this test
            const common = await import('../electron/handlers/common');
            vi.mocked(common.probeAudio).mockResolvedValueOnce({
                duration: 10,
                channels: 2,
                sampleRate: 48000
            });

            await handleAmbix2Opus(mockEvent, {
                files: ['/test/stereo.wav'],
                bitrate: 'Medium (64kbps)'
            });

            expect(spawnMock).toHaveBeenCalledWith('/mock/bin/ffmpeg', expect.arrayContaining(['-b:a', '128k', '-mapping_family', '255']));
        });
    });

    describe('Ambix2Bin', () => {
        it('should spawn python script with correct args for Neumann profile', async () => {
            await handleAmbix2Bin(mockEvent, {
                files: ['/test/input.wav'],
                hrtfSelection: { type: 'neumann' }
            });

            expect(spawnMock).toHaveBeenCalledTimes(1);
            const call = spawnMock.mock.calls[0];
            const cmd = call[0];
            const args = call[1];

            expect(cmd).toBe('python3');
            expect(args).toContain('--input');
            // Check that the resolved path contains the expected filename
            expect(args).toContain('/test/input.wav');
            const hrtfArg = args[args.indexOf('--sofa') + 1];
            expect(hrtfArg).toContain('Neumann_KU100_48k.sofa');
        });

        it('should throw error if custom SOFA file is missing', async () => {
            const fs = await import('node:fs');
            // We need to mock existsSync to return false for the custom path
            // Since it's mocked to return true by default, we force false here
            vi.spyOn(fs, 'existsSync').mockReturnValueOnce(true) // files[0] check if any
                .mockReturnValueOnce(false); // customPath check

            const result = await handleAmbix2Bin(mockEvent, {
                files: ['/test/input.wav'],
                hrtfSelection: { type: 'custom', customPath: '/non/existent.sofa' }
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Custom SOFA file not found');
        });
    });

    describe('Ambix2IAMF', () => {
        it('should generate config and spawn iamf-enc', async () => {
            await handleAmbix2IAMF(mockEvent, {
                files: ['/test/input.wav'],
                bitrate: 'High (96kbps)'
            });

            // Should invoke spawn for iamf-enc
            const call = spawnMock.mock.calls.find((c: any) => c[0].includes('iamf-enc'));
            expect(call).toBeDefined();
            const args = call[1];
            expect(args[0]).toContain('--user_metadata_filename=');
            expect(args[1]).toBe('--input_wav_directory=/test');
        });
    });

    describe('AmbiOrder', () => {
        it('should generate correct pan filter for 2nd Order (9ch)', async () => {
            const result = await handleAmbiOrder(mockEvent, {
                files: ['/test/input.wav'],
                targetOrder: '2nd Order'
            });

            expect(result.success).toBe(true);
            const call = spawnMock.mock.calls.find((c: any) => c[1].includes('-filter_complex'));
            expect(call).toBeDefined();
            const args = call[1];
            // Expect channelmap=0|1|...|8
            const filter = args[args.indexOf('-filter_complex') + 1];
            expect(filter).toContain('channelmap=map=0|1|2');
            expect(filter).toContain('|8');
            // Should NOT contain c9=c9
            expect(filter).not.toContain('c9=c9');
        });

        it('should generate correct pan filter for 1st Order (4ch)', async () => {
            const result = await handleAmbiOrder(mockEvent, {
                files: ['/test/input.wav'],
                targetOrder: '1st Order'
            });
            const call = spawnMock.mock.calls.find((c: any) => c[1].some((arg: string) => arg.includes('channelmap=map=0|1|2|3')));
            expect(call).toBeDefined();
        });
    });

    describe('Ambix2CAF', () => {
        it('should spawn ffmpeg with pcm_s24le and caf format', async () => {
            const result = await handleAmbix2CAF(mockEvent, {
                files: ['/test/input.wav'],
                layout: 'discrete',
                bitDepth: '24'
            });

            expect(result.success).toBe(true);
            const call = spawnMock.mock.calls.find((c: any) => c[1].includes('caf'));
            expect(call).toBeDefined();
            const args = call[1];
            expect(args).toContain('pcm_s24le');
            expect(args).toContain('caf');
            expect(args).toContain('-f');
        });

        it('should use pcm_f32le for 32-bit float', async () => {
            await handleAmbix2CAF(mockEvent, {
                files: ['/test/input.wav'],
                layout: 'discrete',
                bitDepth: '32'
            });
            const call = spawnMock.mock.calls.find((c: any) => c[1].includes('pcm_f32le'));
            expect(call).toBeDefined();
        });
    });

    describe('AmbiSwap', () => {
        it('should apply 0.707 gain to W channel when converting AmbiX -> FuMa (1st Order)', async () => {
            const common = await import('../electron/handlers/common');
            vi.mocked(common.probeAudio).mockResolvedValueOnce({
                duration: 10,
                channels: 4,
                sampleRate: 48000
            });

            const result = await handleAmbiSwap(mockEvent, {
                files: ['/test/input.wav'],
                direction: 'AmbixToFuMa'
            });

            expect(result.success).toBe(true);
            const call = spawnMock.mock.calls.find((c: any) => c[1].includes('-filter_complex'));

            // Expect Codec 24-bit
            expect(call[1]).toContain('pcm_s24le');

            const filter = call[1][call[1].indexOf('-filter_complex') + 1];

            // Expect Gain 0.70710678 for c0
            expect(filter).toContain('pan=4c|c0=0.70710678*c0');
            // Expect Mapping: 0, 3, 1, 2
            // Index 3 (AmbiX X) -> Index 1 (FuMa X)
            expect(filter).toContain('c1=c3');
        });

        it('should apply 1.414 gain to W channel when converting FuMa -> AmbiX (1st Order)', async () => {
            const common = await import('../electron/handlers/common');
            vi.mocked(common.probeAudio).mockResolvedValueOnce({
                duration: 10,
                channels: 4,
                sampleRate: 48000
            });

            const result = await handleAmbiSwap(mockEvent, {
                files: ['/test/input.wav'],
                direction: 'FuMaToAmbix'
            });

            expect(result.success).toBe(true);
            const call = spawnMock.mock.calls.find((c: any) => c[1].includes('-filter_complex'));
            const filter = call[1][call[1].indexOf('-filter_complex') + 1];

            // Expect Gain 1.41421356 for c0
            expect(filter).toContain('pan=4c|c0=1.41421356*c0');
            // Expect Mapping: 0, 2, 3, 1
            // FuMa X (1) -> AmbiX X (3) maps to c3=c1
            expect(filter).toContain('c3=c1');
        });

        it('should error if converting >16ch file to FuMa', async () => {
            const common = await import('../electron/handlers/common');
            vi.mocked(common.probeAudio).mockResolvedValueOnce({
                duration: 10,
                channels: 25, // 4th Order
                sampleRate: 48000
            });

            const result = await handleAmbiSwap(mockEvent, {
                files: ['/test/input.wav'],
                direction: 'AmbixToFuMa'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('max 16 channels');
        });
    });
});

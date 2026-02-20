import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createObrPipeline } from '../electron/handlers/ObrHandler';

// Mock dependencies
vi.mock('node:child_process', () => ({
    spawn: vi.fn(() => ({
        stdout: { on: vi.fn(), pipe: vi.fn(() => ({ pipe: vi.fn() })) },
        stderr: { on: vi.fn() },
        stdin: { on: vi.fn() },
        on: vi.fn(),
        kill: vi.fn()
    }))
}));

vi.mock('../electron/handlers/common', () => ({
    getBinaryPath: (name: string) => `/mock/bin/${name}`,
    getFfmpegPath: () => '/mock/bin/ffmpeg'
}));

describe('ObrHandler - createObrPipeline', () => {
    let spawnMock: any;

    beforeEach(async () => {
        const cp = await import('node:child_process');
        spawnMock = cp.spawn;
        spawnMock.mockClear();
    });

    it('should use discrete channelmap for 7th-order truncation and omit -ac', () => {
        // 64 channels (7th order)
        createObrPipeline('/test/64ch.wav', 64, 'ambient', 0);

        // find the decoder spawn (the first one)
        const decoderCall = spawnMock.mock.calls.find((call: any) =>
            call[1].includes('-i') && call[1].includes('/test/64ch.wav')
        );

        expect(decoderCall).toBeDefined();
        const args = decoderCall[1];

        // Should NOT contain -ac 64
        expect(args).not.toContain('-ac');

        const afIndex = args.indexOf('-af');
        expect(afIndex).not.toBe(-1);
        const filter = args[afIndex + 1];

        expect(filter).toBe('channelmap=map=0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24');
    });

    it('should pass --channels 25 to OBR process for 7th-order file', () => {
        createObrPipeline('/test/64ch.wav', 64, 'ambient', 0);

        const obrCall = spawnMock.mock.calls.find((call: any) =>
            call[0].includes('obr_stream')
        );

        expect(obrCall).toBeDefined();
        const args = obrCall[1];
        const channelsIndex = args.indexOf('--channels');
        expect(args[channelsIndex + 1]).toBe('25');
    });

    it('should NOT use truncation filter for 1st-order (4ch) file', () => {
        createObrPipeline('/test/4ch.wav', 4, 'ambient', 0);

        const decoderCall = spawnMock.mock.calls.find((call: any) =>
            call[1].includes('-i') && call[1].includes('/test/4ch.wav')
        );

        const args = decoderCall[1];
        expect(args).not.toContain('-af');
        expect(args).toContain('-ac');
        expect(args[args.indexOf('-ac') + 1]).toBe('4');
    });
    it('should register close handlers that trigger kill', () => {
        const procs = createObrPipeline('/test/file.wav', 4, 'ambient', 0);
        const [decoder, obr, encoder] = procs;

        // Find the 'close' listener registration
        const decoderCloseHandler = (decoder.on as any).mock.calls.find((c: any) => c[0] === 'close')?.[1];
        expect(decoderCloseHandler).toBeDefined();

        // Triggering decoder exit 1 should kill others
        decoderCloseHandler(1);

        expect(obr.kill).toHaveBeenCalledWith('SIGKILL');
        expect(encoder.kill).toHaveBeenCalledWith('SIGKILL');
    });
});

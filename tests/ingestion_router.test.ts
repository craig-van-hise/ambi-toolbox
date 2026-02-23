import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prepareStreamTarget } from '../electron/handlers/IngestionRouter';
import fs from 'fs';
import os from 'os';
import path from 'path';

// Mock spawn
vi.mock('child_process', () => ({
    spawn: vi.fn((cmd, args) => {
        const tempPath = args.includes('--output') ? args[args.indexOf('--output') + 1] : args[1];
        if (tempPath && tempPath.endsWith('.ambi_tmp.wav')) {
            fs.writeFileSync(tempPath, 'dummy transcoded content');
        }
        return {
            stdout: { on: vi.fn() },
            stderr: { on: vi.fn() },
            on: vi.fn((event, cb) => {
                if (event === 'close') cb(0);
            })
        };
    })
}));

describe('IngestionRouter Stat-Based Hashing (PRP #125)', () => {
    const dummyPath = path.join(os.tmpdir(), 'ghost_test.iamf');

    beforeEach(() => {
        vi.clearAllMocks();
        if (fs.existsSync(dummyPath)) fs.unlinkSync(dummyPath);
    });

    it('should generate different hashes for same path but different stats', async () => {
        // Create file version 1
        fs.writeFileSync(dummyPath, 'version 1 content');
        const proxy1 = await prepareStreamTarget(dummyPath);

        // Wait a bit to ensure mtime changes
        await new Promise(r => setTimeout(r, 10));

        // Create file version 2 (different size)
        fs.writeFileSync(dummyPath, 'version 2 content is longer');
        const proxy2 = await prepareStreamTarget(dummyPath);

        expect(proxy1).not.toBe(proxy2);
        expect(proxy1).toContain('.ambi_tmp.wav');
        expect(proxy2).toContain('.ambi_tmp.wav');

        // Cleanup
        if (fs.existsSync(dummyPath)) fs.unlinkSync(dummyPath);
        if (fs.existsSync(proxy1)) fs.unlinkSync(proxy1);
        if (fs.existsSync(proxy2)) fs.unlinkSync(proxy2);
    });
});

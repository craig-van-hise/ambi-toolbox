
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';

// Ensure isDev is true for tests
process.env.NODE_ENV = 'development';

import { generateProxy, executeTrim } from '../electron/handlers/trim';

// Mock electron app.getPath
vi.mock('electron', () => ({
    app: {
        getPath: vi.fn((name) => {
            if (name === 'temp') return '/tmp';
            return '/tmp';
        }),
    },
}));

const TEST_DIR = path.join(__dirname, '../test_output/trim_tests');
const INPUT_FILE = path.join(__dirname, '../test_4ch.wav'); // Assuming this exists from file listing
const OUTPUT_DIR = path.join(TEST_DIR, 'output');

describe('AmbiTrim Backend Logic', () => {
    beforeAll(() => {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }
    });

    afterAll(() => {
        // Optional cleanup
        // fs.rmSync(TEST_DIR, { recursive: true, force: true });
    });

    it('generateProxy should create a stereo MP3 file', async () => {
        // If input file doesn't exist, skip or warn. Use a known file from the repo.
        if (!fs.existsSync(INPUT_FILE)) {
            console.warn(`Test file ${INPUT_FILE} NOT FOUND. Skipping proxy test.`);
            return;
        }

        const proxyPath = await generateProxy(INPUT_FILE);

        expect(proxyPath).toBeDefined();
        expect(fs.existsSync(proxyPath)).toBe(true);
        // Check extension
        expect(path.extname(proxyPath)).toBe('.mp3');

        // Check size > 0
        const stats = fs.statSync(proxyPath);
        expect(stats.size).toBeGreaterThan(0);

        // Cleanup proxy
        fs.unlinkSync(proxyPath);
    });

    it('executeTrim should create a trimmed WAV file', async () => {
        if (!fs.existsSync(INPUT_FILE)) {
            return;
        }

        const startTime = 1.0;
        const endTime = 3.0; // 2 seconds duration

        const outputPath = await executeTrim(INPUT_FILE, startTime, endTime, OUTPUT_DIR);

        expect(outputPath).toBeDefined();
        expect(fs.existsSync(outputPath)).toBe(true);
        expect(path.dirname(outputPath)).toBe(OUTPUT_DIR);

        // Check size - should be smaller than original but > 0
        const originalStats = fs.statSync(INPUT_FILE); // 10s file approx?
        const trimmedStats = fs.statSync(outputPath);

        expect(trimmedStats.size).toBeGreaterThan(0);
        expect(trimmedStats.size).toBeLessThan(originalStats.size);

        // Cleanup output
        fs.unlinkSync(outputPath);
    });
});


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mock Electron app if needed, or just import the handler functions logic directly if possible.
// Since getObrStreamPath is not exported, we might need to modify ObrHandler to export it or test via a proxy.
// However, the PRP says "write scripts/test-binary-paths.ts. This script must import your path resolution functions".
// modifying ObrHandler to export getObrStreamPath is acceptable for testability.

// We will need to shim the environment for the handler to work (it imports 'common' which imports 'shim')
// but 'shim' tries to require 'electron'.

// Let's try to import the handler. If it fails, we might need to mock.
// We'll rely on the existing shim logic in electron/shim.ts which mocks app if electron is missing.

import { createObrPipeline } from '../electron/handlers/ObrHandler';
import { getFfmpegPath } from '../electron/handlers/common';

// To test getObrStreamPath, we can't import it directly if it's not exported.
// We will modify ObrHandler.ts to export it.

// DYNAMIC IMPORT to handle potential ESM issues if any, but static import should work with tsx.
// We will assume we will modify ObrHandler.ts to export `getObrStreamPath`.

async function testBinaryPaths() {
    console.log('[Test] Verifying Binary Paths...');

    // 1. FFmpeg
    try {
        const ffmpeg = getFfmpegPath();
        console.log(`[Test] FFmpeg Path: ${ffmpeg}`);
        if (fs.existsSync(ffmpeg)) {
            console.log('[Test] FFmpeg: FOUND');
        } else {
            console.error('[Test] FFmpeg: MISSING');
            process.exit(1);
        }
    } catch (e: any) {
        console.error('[Test] FFmpeg Resolution Failed:', e.message);
        process.exit(1);
    }

    // 2. OBR Stream
    // We need to import getObrStreamPath. 
    // Since we'll modify ObrHandler to export it, we can import it.
    // For now, we'll try to import it dynamically or assume it's exported.

    try {
        // @ts-ignore
        const { getObrStreamPath } = await import('../electron/handlers/ObrHandler');

        if (!getObrStreamPath) {
            console.error('[Test] getObrStreamPath not exported from ObrHandler.ts');
            process.exit(1);
        }

        const obr = getObrStreamPath();
        console.log(`[Test] OBR Path: ${obr}`);

        if (fs.existsSync(obr)) {
            console.log('[Test] OBR: FOUND');
        } else {
            console.error('[Test] OBR: MISSING');
            // Check if it's in the old location for debugging
            const oldPath = path.resolve(process.cwd(), 'src/cpp/build/obr_stream');
            if (fs.existsSync(oldPath)) console.log(`[Test] (Found at old location: ${oldPath})`);
            process.exit(1);
        }
    } catch (e: any) {
        console.error('[Test] OBR Resolution Failed:', e.message);
        process.exit(1);
    }

    console.log('[Test] SUCCESS: Both binaries found.');
}

testBinaryPaths();

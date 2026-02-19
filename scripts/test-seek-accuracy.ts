import http from 'http';
import path from 'path';
import fs from 'fs';

const PORT = 45455;
const HOST = '127.0.0.1';

async function captureStream(file: string, startSec: number, durationMs: number = 2000): Promise<Buffer> {
    const absPath = path.resolve(file);
    const url = `http://${HOST}:${PORT}/obr-stream?file=${encodeURIComponent(absPath)}&start=${startSec}&channels=16&profile=ambient`;
    console.log(`[Test] Requesting: ${url}`);

    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        let totalSize = 0;

        const req = http.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed with status ${res.statusCode} for ${file}`));
                return;
            }

            res.on('data', (chunk) => {
                chunks.push(chunk);
                totalSize += chunk.length;
            });

            const timer = setTimeout(() => {
                console.log(`[Test] Captured ${totalSize} bytes at offset ${startSec}s`);
                req.destroy();
                resolve(Buffer.concat(chunks));
            }, durationMs);

            req.on('close', () => clearTimeout(timer));
        });

        req.on('error', (e) => {
            if ((e as any).code === 'ECONNRESET') return;
            reject(e);
        });
    });
}

async function runTest() {
    const testFile = './tests/3rd Order Ambi Clock Test.wav';
    const SEEK_TIME = 10;

    console.log(`\n--- SEEK TEST: Start from ${SEEK_TIME}s ---`);
    const data = await captureStream(testFile, SEEK_TIME);

    // 1. Verify Header
    const EBML_HEADER = Buffer.from([0x1A, 0x45, 0xDF, 0xA3]);
    const actualHeader = data.subarray(0, 4);

    console.log(`[Test] Header (Hex): ${actualHeader.toString('hex')}`);

    if (actualHeader.equals(EBML_HEADER)) {
        console.log('✅ SUCCESS: Seeked stream started with a valid WebM header.');
    } else {
        console.error('❌ FAILURE: Seeked stream did NOT start with a valid WebM header.');
        process.exit(1);
    }

    // 2. Save for manual inspection if needed
    const dumpPath = './temp_seek_test.webm';
    fs.writeFileSync(dumpPath, data);
    console.log(`[Test] Stream saved to ${dumpPath} for verification.`);

    console.log('\n[Test] To verify seek accuracy manually, check if the audio starts at 10s.');
}

runTest().catch((err) => {
    console.error('[Test] Fatal Error:', err);
    process.exit(1);
});

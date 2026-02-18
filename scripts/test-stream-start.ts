import http from 'http';
import path from 'path';

const PORT = 45455;
const HOST = '127.0.0.1';

async function captureStream(file: string, durationMs: number = 1000): Promise<Buffer> {
    const absPath = path.resolve(file);
    const url = `http://${HOST}:${PORT}/obr-stream?file=${encodeURIComponent(absPath)}&channels=16&profile=ambient`;
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

            // Timeout to simulate track switch
            const timer = setTimeout(() => {
                console.log(`[Test] Captured ${totalSize} bytes for ${path.basename(file)}`);
                req.destroy();
                resolve(Buffer.concat(chunks));
            }, durationMs);

            req.on('close', () => clearTimeout(timer));
        });

        req.on('error', (e) => {
            if ((e as any).code === 'ECONNRESET') return; // Expected on destroy
            reject(e);
        });
    });
}

async function runTest() {
    const fileA = './tests/3rd Order Ambi Clock Test.wav';
    const fileB = './tests/test_16ch.wav';

    console.log('\n--- PHASE 1: START CLOCK TEST ---');
    const startA = Date.now();
    const dataA = await captureStream(fileA, 1500);
    console.log(`[Test] Phase 1 Duration: ${Date.now() - startA}ms`);

    console.log('\n--- PHASE 2: SWITCH TO 16CH TEST ---');
    const startB = Date.now();
    const dataB = await captureStream(fileB, 1500);
    console.log(`[Test] Phase 2 Duration: ${Date.now() - startB}ms`);

    // VERIFICATION: Check for WebM EBML Header at the start of the second stream
    // EBML header is [0x1A, 0x45, 0xDF, 0xA3]
    const EBML_HEADER = Buffer.from([0x1A, 0x45, 0xDF, 0xA3]);
    const actualHeader = dataB.subarray(0, 4);

    console.log(`\n[Test] Data B Header (Hex): ${actualHeader.toString('hex')}`);

    if (actualHeader.equals(EBML_HEADER)) {
        console.log('✅ SUCCESS: Stream B started with a fresh WebM header.');
    } else {
        console.error('❌ FAILURE: Stream B did NOT start with a fresh WebM header.');
        console.error('Possible "Buffer Pollution" or residual data leak.');
        process.exit(1);
    }

    // Additional check: Does it contain data from track A?
    // We can't easily check PCM content here without decoding, but the lack of header is the smoking gun.
}

runTest().catch((err) => {
    console.error('[Test] Fatal Error:', err);
    process.exit(1);
});

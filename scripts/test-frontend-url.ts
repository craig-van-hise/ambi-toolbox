
import http from 'http';

// Mock State
let state = {
    currentFile: '/Users/vv2024/Desktop/16ch_ambisonic.wav',
    channels: 0
};

// Mock Backend Probe Response
const MOCK_PROBE_RESPONSE = {
    duration: 30,
    channels: 16,
    sampleRate: 48000
};

// Start a temporary mock server for the probe
const PORT = 45455;
const server = http.createServer((req, res) => {
    if (req.url?.startsWith('/probe-metadata')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(MOCK_PROBE_RESPONSE));
    } else {
        res.writeHead(404);
        res.end();
    }
});

async function testFrontendUrlLogic() {
    return new Promise<void>((resolve, reject) => {
        server.listen(PORT, async () => {
            try {
                console.log('[Test] logical flow simulation started.');

                // 1. Initial State
                console.log(`[Test] Initial State: channels=${state.channels}`);

                // Old Logic simulation (what we suspect happens):
                // URL generated immediately with default 4
                let url = generateUrl(state);
                console.log(`[Test] Initial URL (Pre-Probe): ${url}`);
                if (url.includes('channels=4')) {
                    console.log('[Test] CONFIRMED: Initial URL uses default channels=4 (Regression)');
                }

                // 2. Proposed Fix Logic:
                // Trigger Probe independently of Audio Element
                console.log('[Test] Triggering Probe...');
                const data = await fetchProbe(state.currentFile);
                console.log(`[Test] Probe Result: channels=${data.channels}`);

                // 3. Update State
                state.channels = data.channels;
                console.log(`[Test] State Updated: channels=${state.channels}`);

                // 4. Generate URL again
                url = generateUrl(state);
                console.log(`[Test] Final URL: ${url}`);

                // ASSERTION
                if (url.includes('channels=16')) {
                    console.log('[Test] PASSED: Final URL contains channels=16');
                    server.close();
                    resolve();
                } else {
                    console.error('[Test] FAILED: Final URL does not contain channels=16');
                    server.close();
                    process.exit(1);
                }

            } catch (e) {
                console.error(e);
                server.close();
                process.exit(1);
            }
        });
    });
}

// Logic extracted from PlaybackContext.tsx (Simplified)
function generateUrl(currentState: typeof state) {
    const params = new URLSearchParams();
    params.append('file', currentState.currentFile);
    // Mimic the bug/fix: if 0, what do we do?
    // Current code: (channels || 4)
    params.append('channels', (currentState.channels || 4).toString());
    params.append('profile', 'ambient');
    return `http://127.0.0.1:${PORT}/obr-stream?${params.toString()}`;
}

async function fetchProbe(file: string) {
    const res = await fetch(`http://127.0.0.1:${PORT}/probe-metadata?file=${encodeURIComponent(file)}`);
    return await res.json();
}

testFrontendUrlLogic();

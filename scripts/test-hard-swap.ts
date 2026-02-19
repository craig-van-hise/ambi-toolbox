
/**
 * scripts/test-hard-swap.ts
 * 
 * Verifies the "Hard Swap" sequence:
 * 1. Hard Stop (pause, clear src, load)
 * 2. Delay (yield to event loop)
 * 3. Hard Play (set new src, load, play)
 */

class MockAudio {
    public src: string = 'old-track.wav';
    public playCalled = 0;
    public pauseCalled = 0;
    public loadCalled = 0;
    public paused: boolean = false;
    public attributes: Record<string, string> = { src: 'old-track.wav' };

    public play() {
        this.playCalled++;
        this.paused = false;
        return Promise.resolve();
    }

    public pause() {
        this.pauseCalled++;
        this.paused = true;
    }

    public load() {
        this.loadCalled++;
    }

    public removeAttribute(attr: string) {
        delete this.attributes[attr];
        if (attr === 'src') this.src = '';
    }

    public setAttribute(attr: string, val: string) {
        this.attributes[attr] = val;
        if (attr === 'src') this.src = val;
    }
}

async function runTest() {
    console.log('--- STARTING HARD SWAP TDD TEST ---');
    const audio = new MockAudio();
    let isPlayingState = true;

    const hardSwap = async (newFile: string) => {
        console.log('[Test] [Hard Swap] Stopping current playback...');
        // 1. Hard Stop
        audio.pause();
        audio.src = '';
        audio.removeAttribute('src');
        audio.load();
        isPlayingState = false;

        console.log('[Test] [Hard Swap] Yielding to event loop...');
        // 2. Yield
        await new Promise(resolve => setTimeout(resolve, 50));

        console.log(`[Test] [Hard Swap] Applying new file: ${newFile}`);
        // 3. Hard Play
        audio.src = `stream?file=${newFile}`;
        audio.load();
        try {
            await audio.play();
            isPlayingState = true;
            console.log('[Test] [Hard Swap] Playback started successfully.');
        } catch (err) {
            console.error('[Test] [Hard Swap Error]', err);
        }
    };

    const startTime = Date.now();
    const swapPromise = hardSwap('new-track.wav');

    // Immediate check (after start but during yield)
    if (audio.pauseCalled === 1 && audio.src === '' && audio.loadCalled === 1) {
        console.log('✅ Hard Stop Verified (Immediate)');
    } else {
        console.error('❌ Hard Stop FAILED');
        process.exit(1);
    }

    await swapPromise;
    const duration = Date.now() - startTime;

    // Final check
    if (audio.src.includes('new-track.wav') && audio.playCalled === 1 && isPlayingState) {
        console.log('✅ Hard Play Verified');
    } else {
        console.error('❌ Hard Play FAILED');
        process.exit(1);
    }

    if (duration >= 50) {
        console.log(`✅ Delay Verified (${duration}ms)`);
    } else {
        console.error(`❌ Delay FAILED (${duration}ms)`);
        process.exit(1);
    }

    console.log('\n--- HARD SWAP TEST SUCCESS ---');
}

runTest().catch(console.error);


/**
 * scripts/test-auto-resume.ts
 * 
 * Mocks the PlaybackContext logic to verify that wasPlaying state 
 * is correctly captured and play() is called after stream reload.
 */

class MockAudio {
    public src: string = '';
    public paused: boolean = true;
    public playCalled = false;
    public loadCalled = false;

    public play() {
        this.playCalled = true;
        this.paused = false;
        return Promise.resolve();
    }

    public pause() {
        this.paused = true;
    }

    public load() {
        this.loadCalled = true;
    }

    // Simulate event firing
    public trigger(event: string) {
        if (this.onEvents[event]) {
            this.onEvents[event]();
        }
    }

    private onEvents: Record<string, () => void> = {};
    public addEventListener(event: string, cb: () => void) {
        this.onEvents[event] = cb;
    }
}

class MockPlaybackContext {
    private audio = new MockAudio();
    private isPlaying = false;
    private wasPlayingBeforeSeek = false;

    constructor() {
        // Setup internal sequence similar to Audio element in React
        this.audio.addEventListener('canplay', () => {
            if (this.wasPlayingBeforeSeek) {
                console.log('[Mock] Auto-resuming playback...');
                this.audio.play();
                this.isPlaying = true;
            }
        });
    }

    public setPlaying(val: boolean) {
        this.isPlaying = val;
        this.audio.paused = !val;
    }

    public seek(newTime: number) {
        console.log(`[Mock] Seeking to ${newTime}s...`);

        // 1. Capture State
        this.wasPlayingBeforeSeek = this.isPlaying;

        // 2. Apply URL (simulated)
        this.audio.pause();
        this.audio.src = `stream?start=${newTime}`;
        this.audio.load();

        console.log(`[Mock] captured wasPlaying: ${this.wasPlayingBeforeSeek}`);
    }

    public getAudio() {
        return this.audio;
    }
}

async function runTest() {
    console.log('--- STARTING AUTO-RESUME TEST ---');
    const context = new MockPlaybackContext();

    console.log('\nScenario A: Seek while PLAYING');
    context.setPlaying(true);
    context.seek(30);

    console.log('Simulating "canplay" event...');
    context.getAudio().trigger('canplay');

    if (context.getAudio().playCalled) {
        console.log('✅ SUCCESS: Audio resumed automatically.');
    } else {
        console.error('❌ FAILURE: Audio DID NOT resume.');
        process.exit(1);
    }

    console.log('\nScenario B: Seek while PAUSED');
    const contextB = new MockPlaybackContext();
    contextB.setPlaying(false);
    contextB.seek(60);

    console.log('Simulating "canplay" event...');
    contextB.getAudio().trigger('canplay');

    if (!contextB.getAudio().playCalled) {
        console.log('✅ SUCCESS: Audio remained paused.');
    } else {
        console.error('❌ FAILURE: Audio resumed even though it was paused.');
        process.exit(1);
    }
}

runTest().catch(console.error);

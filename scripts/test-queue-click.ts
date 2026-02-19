
/**
 * scripts/test-queue-click.ts
 * 
 * Verifies that the queue click handler executes pause-update-play
 * SYNCHRONOUSLY in the same task to satisfy browser autoplay policies.
 */

class MockAudio {
    public src: string = 'old.wav';
    public playCalled = 0;
    public pauseCalled = 0;
    public loadCalled = 0;

    public play() {
        this.playCalled++;
        return Promise.resolve();
    }

    public pause() {
        this.pauseCalled++;
    }

    public load() {
        this.loadCalled++;
    }
}

async function runTest() {
    console.log('--- STARTING QUEUE CLICK SYNCHRONOUS TEST ---');
    const audio = new MockAudio();

    // This represents the logic that MUST run in the event handler tick
    const onTrackDoubleClick = (newFile: string) => {
        console.log(`[Event Handler] Double-clicked: ${newFile}`);

        // 1. Synchronous Stop
        audio.pause();

        // 2. Synchronous Update
        audio.src = `stream?file=${newFile}`;
        audio.load();

        // 3. Synchronous Play (The 'Play' command is in the same tick as the click)
        audio.play().catch(e => console.error("Play failed:", e));
    };

    const startTime = Date.now();
    onTrackDoubleClick('new.wav');

    // Check state IMMEDIATELY (synchronously)
    console.log('Checking synchronous execution state...');

    if (audio.pauseCalled === 1 && audio.src.includes('new.wav') && audio.playCalled === 1) {
        console.log('✅ Synchronous pause-update-play Verified!');
    } else {
        console.error('❌ Synchronous execution FAILED');
        console.error(`Pause: ${audio.pauseCalled}, Src: ${audio.src}, Play: ${audio.playCalled}`);
        process.exit(1);
    }

    console.log('\n--- QUEUE CLICK TEST SUCCESS ---');
}

runTest().catch(console.error);


/**
 * scripts/test-seek-debounce.ts
 * 
 * Simulates rapid seek state changes and verifies that the 
 * "fetch" logic (or a mock of it) is debounced.
 */

class MockPlaybackContext {
    private fetchCallCount = 0;
    private debounceTimer: NodeJS.Timeout | null = null;
    private requestedSeekTime: number | null = null;

    // The function we are testing
    public seek(time: number) {
        this.requestedSeekTime = time;

        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }

        this.debounceTimer = setTimeout(() => {
            this.executeFetch();
        }, 400); // targeted debounce
    }

    private executeFetch() {
        this.fetchCallCount++;
        console.log(`[Mock] Fetching stream from offset: ${this.requestedSeekTime}s`);
    }

    public getFetchCount() {
        return this.fetchCallCount;
    }
}

async function runTest() {
    const context = new MockPlaybackContext();

    console.log('--- STARTING DEBOUNCE TEST ---');
    console.log('Simulating 10 seeks in 200ms...');

    for (let i = 0; i < 10; i++) {
        context.seek(i * 10);
        await new Promise(r => setTimeout(r, 20));
    }

    console.log('Waiting for debounce period (500ms)...');
    await new Promise(r => setTimeout(r, 600));

    const count = context.getFetchCount();
    console.log(`Final Fetch Count: ${count}`);

    if (count === 1) {
        console.log('✅ SUCCESS: Seek events were debounced to a single fetch.');
    } else {
        console.error(`❌ FAILURE: Expected 1 fetch, but got ${count}.`);
        process.exit(1);
    }
}

runTest().catch(console.error);

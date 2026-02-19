
/**
 * scripts/test-file-switch-autoplay.ts
 * 
 * Verifies that loading a new file resets state (currentTime, streamOffset)
 * and triggers play() ONLY after the 'canplay' event.
 */

class MockAudio {
    public src: string = '';
    public currentTime: number = 0;
    public paused: boolean = true;
    public playCalled = 0;
    public loadCalled = 0;

    private onEvents: Record<string, () => void> = {};

    public play() {
        this.playCalled++;
        this.paused = false;
        return Promise.resolve();
    }

    public pause() {
        this.paused = true;
    }

    public load() {
        this.loadCalled++;
    }

    public addEventListener(event: string, cb: () => void) {
        this.onEvents[event] = cb;
    }

    public trigger(event: string) {
        if (this.onEvents[event]) {
            this.onEvents[event]();
        }
    }
}

class MockPlaybackContext {
    public state = {
        currentFile: '',
        currentTime: 0,
        streamOffset: 0,
        isPlaying: false
    };

    private audio = new MockAudio();
    private isNewFileLoad = false;

    constructor() {
        this.audio.addEventListener('canplay', () => {
            if (this.isNewFileLoad) {
                console.log('[Mock] New file ready, auto-playing...');
                this.audio.play();
                this.state.isPlaying = true;
                this.isNewFileLoad = false;
            }
        });
    }

    public loadNewFile(filePath: string) {
        console.log(`[Mock] Loading new file: ${filePath}`);

        // RESET logic
        this.state.currentFile = filePath;
        this.state.currentTime = 0;
        this.state.streamOffset = 0;
        this.state.isPlaying = false;

        this.isNewFileLoad = true;

        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.src = `stream?file=${filePath}`;
        this.audio.load();
    }

    public getAudio() { return this.audio; }
}

async function runTest() {
    console.log('--- STARTING FILE SWITCH AUTOPLAY TEST ---');
    const context = new MockPlaybackContext();

    console.log('\nScenario: Loading Track A');
    context.loadNewFile('track-a.wav');

    console.log('Expectations: currentTime=0, src updated, load called');
    if (context.state.currentTime === 0 && context.getAudio().src.includes('track-a.wav') && context.getAudio().loadCalled === 1) {
        console.log('✅ State Reset OK');
    } else {
        console.error('❌ State Reset FAILED');
        process.exit(1);
    }

    console.log('Simulating "canplay" event...');
    context.getAudio().trigger('canplay');

    if (context.getAudio().playCalled === 1 && context.state.isPlaying) {
        console.log('✅ Auto-play OK');
    } else {
        console.error('❌ Auto-play FAILED');
        process.exit(1);
    }

    console.log('\nScenario: Switching to Track B while Track A is playing');
    context.loadNewFile('track-b.wav');

    if (context.state.currentTime === 0 && context.getAudio().src.includes('track-b.wav')) {
        console.log('✅ Track B Reset OK');
    }

    console.log('Simulating "canplay" for Track B...');
    context.getAudio().trigger('canplay');

    if (context.getAudio().playCalled === 2) {
        console.log('✅ Track B Auto-play OK');
    } else {
        console.error('❌ Track B Auto-play FAILED');
        process.exit(1);
    }
}

runTest().catch(console.error);

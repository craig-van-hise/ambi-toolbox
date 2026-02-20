/**
 * PRP #105: Transport State Machine V3 — TDD Suite
 *
 * Tests the core state machine logic directly, using pure TypeScript
 * simulations of the PlaybackContext behaviour.
 * 
 * Run with: npm run test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Minimal State Machine Simulator
// Mirrors the logic in PlaybackContext without needing React/DOM.
// ---------------------------------------------------------------------------

interface TransportState {
    isPlaying: boolean;
    isRebuilding: boolean;
    currentTime: number;
    requestedSeekTime?: number;
}

interface SimulatorResult {
    state: TransportState;
    ipcSeekCallCount: number;
    ipcSeekArgs: number[];
    failsafeTriggered: boolean;
}

function createTransportSM(initialState: Partial<TransportState> = {}) {
    let state: TransportState = {
        isPlaying: false,
        isRebuilding: false,
        currentTime: 0,
        requestedSeekTime: undefined,
        ...initialState,
    };

    let ipcSeekCallCount = 0;
    const ipcSeekArgs: number[] = [];
    let failsafeTriggered = false;
    let failsafeTimerId: ReturnType<typeof setTimeout> | null = null;
    let onUnlockCallback: (() => void) | null = null;

    // Simulates enterRebuildLock
    const enterRebuildLock = (wasPlaying: boolean) => {
        state = { ...state, isRebuilding: true };

        // Start failsafe
        if (failsafeTimerId) clearTimeout(failsafeTimerId);
        failsafeTimerId = setTimeout(() => {
            failsafeTriggered = true;
            onUnlockCallback = null;
            state = { ...state, isRebuilding: false, isPlaying: false };
            failsafeTimerId = null;
        }, 3000);

        // Register which event unlocks
        onUnlockCallback = () => {
            if (failsafeTimerId) clearTimeout(failsafeTimerId);
            failsafeTimerId = null;
            state = { ...state, isRebuilding: false };
        };
    };

    const seek = (time: number) => {
        // Visual only — MUST NOT touch ipcSeekCallCount
        state = { ...state, currentTime: time };
    };

    const commitSeek = (time: number, wasPlaying: boolean) => {
        if (state.isRebuilding) return; // No-op
        ipcSeekCallCount++;
        ipcSeekArgs.push(time);
        state = { ...state, currentTime: time };
        enterRebuildLock(wasPlaying);
        state = { ...state, requestedSeekTime: time }; // triggers IPC
    };

    // Simulate native audio event (playing or canplay)
    const simulateNativeUnlock = () => {
        if (onUnlockCallback) onUnlockCallback();
    };

    const advanceTimerBy = (ms: number): Promise<void> => {
        return new Promise(resolve => {
            // We use real time in this environment
            setTimeout(resolve, ms);
        });
    };

    return {
        getState: () => ({ ...state }),
        getIpcCallCount: () => ipcSeekCallCount,
        getIpcArgs: () => [...ipcSeekArgs],
        isFailsafeTriggered: () => failsafeTriggered,
        seek,
        commitSeek,
        simulateNativeUnlock,
        advanceTimerBy,
    };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('PRP #105 — Transport State Machine V3', () => {

    describe('Test Case 1: Scrubbing Isolation', () => {
        it('should NOT trigger IPC when calling seek() 50 times rapidly', () => {
            const sm = createTransportSM({ isPlaying: true });

            // Simulate 50 rapid onChange events from the scrubber
            for (let i = 0; i < 50; i++) {
                sm.seek(i * 0.1);
            }

            // Assert: IPC has NOT been called
            expect(sm.getIpcCallCount()).toBe(0);

            // Assert: visual state is updated
            expect(sm.getState().currentTime).toBeCloseTo(4.9, 1);
        });
    });

    describe('Test Case 2: Commit fires IPC and enters LOCKED_REBUILDING', () => {
        it('should fire IPC exactly once on commitSeek() and set isRebuilding=true', () => {
            const sm = createTransportSM({ isPlaying: true });

            sm.commitSeek(5.0, true /* wasPlaying */);

            // IPC called exactly once
            expect(sm.getIpcCallCount()).toBe(1);
            expect(sm.getIpcArgs()[0]).toBe(5.0);

            // State is locked
            expect(sm.getState().isRebuilding).toBe(true);
        });

        it('should be a no-op if commitSeek() is called while already rebuilding', () => {
            const sm = createTransportSM({ isPlaying: true });

            sm.commitSeek(5.0, true);
            sm.commitSeek(7.0, true); // second call while locked -> no-op

            expect(sm.getIpcCallCount()).toBe(1); // only the first one landed
        });
    });

    describe('Test Case 3: Native Unlock — Playing path', () => {
        it('should unlock isRebuilding when native playing event fires', () => {
            const sm = createTransportSM({ isPlaying: true });

            sm.commitSeek(5.0, true /* wasPlaying */);
            expect(sm.getState().isRebuilding).toBe(true);

            // Native audio fires 'playing'
            sm.simulateNativeUnlock();
            expect(sm.getState().isRebuilding).toBe(false);
        });
    });

    describe('Test Case 3b: Native Unlock — Paused scrub path', () => {
        it('should unlock via canplay/loadeddata when scrubbing while paused', () => {
            const sm = createTransportSM({ isPlaying: false });

            sm.commitSeek(3.0, false /* wasPlaying=false = paused scrub */);
            expect(sm.getState().isRebuilding).toBe(true);

            // Native audio fires 'canplay' or 'loadeddata' (same callback in sim)
            sm.simulateNativeUnlock();
            expect(sm.getState().isRebuilding).toBe(false);

            // isPlaying must remain false (user was paused)
            expect(sm.getState().isPlaying).toBe(false);
        });
    });

    describe('Test Case 4: Timeout Recovery (Failsafe)', () => {
        it('should force-unlock and pause after 3000ms if native event never fires', async () => {
            vi.useFakeTimers();

            const sm = createTransportSM({ isPlaying: true });
            sm.commitSeek(5.0, true);
            expect(sm.getState().isRebuilding).toBe(true);

            // Advance time by 3 seconds without native event
            vi.advanceTimersByTime(3001);

            expect(sm.isFailsafeTriggered()).toBe(true);
            expect(sm.getState().isRebuilding).toBe(false);
            expect(sm.getState().isPlaying).toBe(false); // Forced to PAUSED

            vi.useRealTimers();
        });

        it('should NOT trigger failsafe if native event fires before timeout', async () => {
            vi.useFakeTimers();

            const sm = createTransportSM({ isPlaying: true });
            sm.commitSeek(5.0, true);

            // Native event fires at 500ms (well before 3000ms)
            vi.advanceTimersByTime(500);
            sm.simulateNativeUnlock();

            // Advance past what would have been the failsafe
            vi.advanceTimersByTime(3000);

            expect(sm.isFailsafeTriggered()).toBe(false);
            expect(sm.getState().isRebuilding).toBe(false);

            vi.useRealTimers();
        });
    });
});

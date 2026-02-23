import { describe, it, expect } from 'vitest';

// Simulating the current SettingsContext updateSettings behavior
function legacyUpdateSettings(prev: any, newSettings: any) {
    const updated = { ...prev, ...newSettings };
    if (newSettings.toolSettings) {
        updated.toolSettings = { ...prev.toolSettings, ...newSettings.toolSettings };
    }
    return updated;
}

// Simulating the new functional update deep-merge behavior that we will implement
function fixedUpdateSettings(prev: any, newSettingsOrUpdater: any) {
    const newSettings = typeof newSettingsOrUpdater === 'function' ? newSettingsOrUpdater(prev) : newSettingsOrUpdater;
    const updated = { ...prev, ...newSettings };
    if (newSettings.toolSettings) {
        // Deep merge toolSettings
        updated.toolSettings = { ...prev.toolSettings };
        for (const key of Object.keys(newSettings.toolSettings)) {
            updated.toolSettings[key] = {
                ...(prev.toolSettings[key] || {}),
                ...newSettings.toolSettings[key]
            };
        }
    }
    return updated;
}

describe('Settings Context State Merge TDD', () => {

    it('Legacy update wipes out globalPlayback customSofaPath when Transport overwrites lastSofaDir (Stale Closure)', () => {
        // 1. Initial boot state loaded from disk
        const initialState = {
            toolSettings: {
                globalPlayback: { hrtfProfile: 'Neumann', customSofaPath: null }
            }
        };

        // 2. PlaybackContext executes immediately when file selected, providing new profile
        const playBackStateAfterPick = legacyUpdateSettings(initialState, {
            toolSettings: {
                ...initialState.toolSettings,
                globalPlayback: {
                    ...initialState.toolSettings.globalPlayback,
                    hrtfProfile: 'Custom',
                    customSofaPath: '/path/to/my_file.sofa'
                }
            }
        });

        // Verify PlaybackContext correctly saved it 
        expect(playBackStateAfterPick.toolSettings.globalPlayback.customSofaPath).toBe('/path/to/my_file.sofa');

        // 3. Transport.tsx is synchronously continuing its execution using the STALE 'initialState'
        //    because it captured 'settings' in its closure before React re-rendered!
        const transportStateAfterPick = legacyUpdateSettings(playBackStateAfterPick, {
            toolSettings: {
                ...initialState.toolSettings, // spreading STALE root settings!
                globalPlayback: {
                    ...initialState.toolSettings.globalPlayback, // spreading STALE playback settings!
                    lastSofaDir: '/path/to'
                }
            }
        });

        // Uh oh. The customSofaPath is wiped back to null because Transport spread the stale initialState object.
        expect(transportStateAfterPick.toolSettings.globalPlayback.customSofaPath).toBeNull();
    });

    it('Functional update with Deep Merge preserves correctly (The Fix)', () => {
        const initialState = {
            toolSettings: {
                globalPlayback: { hrtfProfile: 'Neumann', customSofaPath: null }
            }
        };

        // PlaybackContext updates
        const playBackState = fixedUpdateSettings(initialState, (prev: any) => ({
            toolSettings: {
                globalPlayback: {
                    hrtfProfile: 'Custom',
                    customSofaPath: '/path/to/my_file.sofa'
                }
            }
        }));

        // Transport synchronously updates using the 'prev' callback
        const finalState = fixedUpdateSettings(playBackState, (prev: any) => ({
            toolSettings: {
                globalPlayback: {
                    lastSofaDir: '/path/to'
                }
            }
        }));

        // Now BOTH persist safely.
        expect(finalState.toolSettings.globalPlayback.customSofaPath).toBe('/path/to/my_file.sofa');
        expect(finalState.toolSettings.globalPlayback.lastSofaDir).toBe('/path/to');
    });

});

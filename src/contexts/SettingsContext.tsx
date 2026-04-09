import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppSettings {
    outputMode: 'input' | 'custom';
    customOutputDir: string;
    autoCreateFolder: boolean;
    lastActiveTool: string;
    toolSettings: Record<string, any>;
}

interface SettingsContextType {
    settings: AppSettings;
    updateSettings: (updater: Partial<AppSettings> | ((prev: AppSettings) => Partial<AppSettings>)) => void;
}

const defaultSettings: AppSettings = {
    outputMode: 'input',
    customOutputDir: '',
    autoCreateFolder: false,
    lastActiveTool: 'ambix2bin' as any, // Will be cast to ToolId
    toolSettings: {}
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>(() => {
        try {
            const saved = localStorage.getItem('ambi_settings');

            if (saved) {
                const parsed = JSON.parse(saved);

                // Sanitize legacy Ambix2Bin settings
                if (parsed.toolSettings && parsed.toolSettings.ambix2bin) {
                    const currentProfile = parsed.toolSettings.ambix2bin.hrtfProfile;
                    if (typeof currentProfile === 'string' && currentProfile.includes('.sofa')) {
                        console.warn('[SettingsContext] Migrating legacy HRTF profile string to ID format.');
                        parsed.toolSettings.ambix2bin.hrtfProfile = 'neumann'; // Default to ID
                    }
                }
                const merged = {
                    ...defaultSettings,
                    ...parsed,
                    toolSettings: {
                        ...defaultSettings.toolSettings,
                        ...parsed.toolSettings
                    }
                };
                return merged;
            }
        } catch (e) {
            console.error('[SettingsContext] Failed to load settings:', e);
        }
        return defaultSettings;
    });

    useEffect(() => {
        try {
            localStorage.setItem('ambi_settings', JSON.stringify(settings));
        } catch (e) {
            console.error('[SettingsContext] Failed to save settings:', e);
        }
    }, [settings]);

    const updateSettings = (updater: Partial<AppSettings> | ((prev: AppSettings) => Partial<AppSettings>)) => {
        setSettings((prev) => {
            const newSettings = typeof updater === 'function' ? updater(prev) : updater;
            const updated = { ...prev, ...newSettings };

            // Ensure deep merge for toolSettings if present
            if (newSettings.toolSettings) {
                updated.toolSettings = { ...prev.toolSettings };
                for (const key of Object.keys(newSettings.toolSettings)) {
                    updated.toolSettings[key] = {
                        ...(prev.toolSettings[key] || {}),
                        ...newSettings.toolSettings[key]
                    };
                }
            }
            return updated;
        });
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

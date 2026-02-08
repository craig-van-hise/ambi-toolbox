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
    updateSettings: (newSettings: Partial<AppSettings>) => void;
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

    const updateSettings = (newSettings: Partial<AppSettings>) => {
        setSettings((prev) => {
            const updated = { ...prev, ...newSettings };
            // Ensure deep merge for toolSettings if present
            if (newSettings.toolSettings) {
                updated.toolSettings = { ...prev.toolSettings, ...newSettings.toolSettings };
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

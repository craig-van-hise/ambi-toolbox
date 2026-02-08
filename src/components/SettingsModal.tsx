import React from 'react';
import { Modal } from './Modal';
import { useSettings } from '../contexts/SettingsContext';
import { FolderOpen } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { settings, updateSettings } = useSettings();

    const handleChooseFolder = async () => {
        try {
            // @ts-ignore - accessing electron API
            const paths = await window.electron.selectFolder();
            if (paths && paths.length > 0) {
                updateSettings({
                    customOutputDir: paths[0],
                    outputMode: 'custom' // Auto-switch to custom mode when folder is picked
                });
            }
        } catch (error) {
            console.error("Failed to select folder:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Settings">
            <div className="space-y-6">

                {/* Output Destination Section */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">Output Destination</label>

                    <div className="space-y-2">
                        {/* Option: Input Folder */}
                        <label className="flex items-center gap-3 p-3 rounded-md bg-[#232324] border border-transparent hover:border-gray-600 cursor-pointer transition-all">
                            <input
                                type="radio"
                                name="outputMode"
                                checked={settings.outputMode === 'input'}
                                onChange={() => updateSettings({ outputMode: 'input' })}
                                className="w-4 h-4 text-indigo-500 bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:ring-offset-gray-800"
                            />
                            <span className="text-gray-200">Same as Input Folder</span>
                        </label>

                        {/* Option: Custom Folder */}
                        <label className="flex items-center gap-3 p-3 rounded-md bg-[#232324] border border-transparent hover:border-gray-600 cursor-pointer transition-all">
                            <input
                                type="radio"
                                name="outputMode"
                                checked={settings.outputMode === 'custom'}
                                onChange={() => updateSettings({ outputMode: 'custom' })}
                                className="w-4 h-4 text-indigo-500 bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:ring-offset-gray-800"
                            />
                            <span className="text-gray-200">Custom Output Folder</span>
                        </label>

                        {/* Custom Folder Selector (Conditional) */}
                        <div className={`pl-7 transition-all ${settings.outputMode === 'custom' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={settings.customOutputDir}
                                    readOnly
                                    placeholder="No folder selected..."
                                    className="flex-1 bg-black/30 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 font-mono truncate"
                                />
                                <button
                                    onClick={handleChooseFolder}
                                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md flex items-center gap-2 text-sm font-medium transition-colors"
                                >
                                    <FolderOpen className="w-4 h-4" />
                                    Browse
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Auto-Create Folder Section */}
                <div className="pt-4 border-t border-studio-border space-y-3">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">Auto-create Subfolders</span>
                            <p className="text-xs text-gray-500">Creates a folder for the output type (e.g. "Binaural", "Opus")</p>
                        </div>

                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={settings.autoCreateFolder}
                                onChange={(e) => updateSettings({ autoCreateFolder: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </div>
                    </label>
                </div>

            </div>
        </Modal>
    );
};

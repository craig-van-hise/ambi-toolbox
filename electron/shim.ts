let electronApp: any;
try {
    const electron = require('electron');
    electronApp = electron.app;
} catch (e) {
    // Mock for Node.js testing
    electronApp = {
        isPackaged: false,
        getPath: () => '/tmp',
        getName: () => 'AmbiToolbox'
    };
}

export const app = electronApp;
export type IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

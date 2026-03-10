import { ipcMain, dialog } from 'electron';

/**
 * DialogHandler
 * Handles native file and directory selection dialogs.
 */

export function registerDialogHandlers() {
    // Open File Dialog
    ipcMain.handle('dialog:openFile', async (_event, options: Electron.OpenDialogOptions = {}) => {
        const defaultProps: any[] = ['openFile', 'multiSelections'];
        const result = await dialog.showOpenDialog({
            properties: options.properties || defaultProps,
            filters: options.filters
        });
        return result.canceled ? null : result.filePaths;
    });

    // Open Directory Dialog
    ipcMain.handle('dialog:openDirectory', async () => {
        const result = await dialog.showOpenDialog({
            properties: ['openDirectory', 'createDirectory']
        });
        return result.canceled ? null : result.filePaths;
    });
}

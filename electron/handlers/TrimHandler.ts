import { ipcMain } from 'electron';
import { generateProxy, executeTrim } from './trim';

/**
 * TrimHandler
 * Handles IPC calls for AmbiTrim (proxy generation and trimming).
 */

export function registerTrimHandlers() {
    ipcMain.handle('trim:generateProxy', async (_event, filePath: string) => {
        return await generateProxy(filePath);
    });

    ipcMain.handle('trim:executeTrim', async (_event, filePath: string, start: number, end: number, outputDir: string) => {
        return await executeTrim(filePath, start, end, outputDir);
    });
}

import { ipcMain } from 'electron';
import fs from 'node:fs/promises';
import path from 'node:path';
import { probeAudio } from './common';
import { prepareStreamTarget } from './IngestionRouter';

/**
 * FileHandler
 * Handles file system related IPC calls.
 */

export function registerFileHandlers() {
    // Expose File Inspection
    ipcMain.handle('inspect-file', async (_event, filePath: string) => {
        try {
            const targetPath = await prepareStreamTarget(filePath);
            const info = await probeAudio(targetPath);
            return { success: true, data: info };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    });

    // Expose File Reading (ArrayBuffer) - Legacy (Full)
    ipcMain.handle('read-file', async (_event, filePath: string) => {
        try {
            const buffer = await fs.readFile(filePath);
            return buffer.buffer;
        } catch (error: any) {
            console.error(`[FileHandler] Error reading file ${filePath}:`, error);
            throw error;
        }
    });

    // Chunked Loading Support
    ipcMain.handle('get-file-size', async (_event, filePath: string) => {
        try {
            const stats = await fs.stat(filePath);
            return stats.size;
        } catch (error: any) {
            console.error(`[FileHandler] Error getting size for ${filePath}:`, error);
            throw error;
        }
    });

    ipcMain.handle('read-chunk', async (_event, filePath: string, offset: number, length: number) => {
        try {
            const fileHandle = await fs.open(filePath, 'r');
            const buffer = Buffer.alloc(length);
            const { bytesRead } = await fileHandle.read(buffer, 0, length, offset);
            await fileHandle.close();

            if (bytesRead < length) {
                return buffer.subarray(0, bytesRead).buffer;
            }
            return buffer.buffer;
        } catch (error: any) {
            console.error(`[FileHandler] Error reading chunk from ${filePath}:`, error);
            throw error;
        }
    });

    // Recursive Path Expansion
    ipcMain.handle('app:expandPaths', async (_event, paths: string[]) => {
        async function getFilesRecursively(dir: string): Promise<string[]> {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            const files: string[] = [];
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    files.push(...await getFilesRecursively(fullPath));
                } else {
                    files.push(fullPath);
                }
            }
            return files;
        }

        const allFiles: string[] = [];
        for (const p of paths) {
            try {
                const stats = await fs.stat(p);
                if (stats.isDirectory()) {
                    allFiles.push(...await getFilesRecursively(p));
                } else {
                    allFiles.push(p);
                }
            } catch (err) {
                console.warn(`[FileHandler] Failed to expand path: ${p}`, err);
            }
        }
        return allFiles;
    });
}

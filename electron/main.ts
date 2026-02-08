import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { dispatchTask } from './handlers/index'
import { probeAudio } from './handlers/common'
import { spawn } from 'child_process';

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  // Register IPC Handlers
  ipcMain.handle('run-task', async (event, toolId, options) => {
    return await dispatchTask(event, toolId, options);
  })

  // Expose File Inspection
  ipcMain.handle('inspect-file', async (event, path) => {
    try {
      const info = await probeAudio(path);
      return { success: true, data: info };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  })

  // Expose File Reading (ArrayBuffer) - Legacy (Full)
  ipcMain.handle('read-file', async (event, filePath) => {
    // ... existing implementation ...
    // Keeping this for backward compatibility or small files if needed
    try {
      const buffer = await import('node:fs/promises').then(fs => fs.readFile(filePath));
      return buffer.buffer;
    } catch (error: any) {
      throw error;
    }
  })

  // NEW: Chunked Loading Support (PRP #18)
  ipcMain.handle('get-file-size', async (event, filePath) => {
    try {
      const stats = await import('node:fs/promises').then(fs => fs.stat(filePath));
      return stats.size;
    } catch (error: any) {
      console.error(`[MAIN] Error getting size for ${filePath}:`, error);
      throw error;
    }
  });

  ipcMain.handle('read-chunk', async (event, filePath, offset, length) => {
    try {
      const fs = await import('node:fs/promises');
      const fileHandle = await fs.open(filePath, 'r');
      const buffer = Buffer.alloc(length);
      const { bytesRead } = await fileHandle.read(buffer, 0, length, offset);
      await fileHandle.close();

      // If bytesRead < length, slice the buffer (EOF case)
      if (bytesRead < length) {
        return buffer.subarray(0, bytesRead).buffer;
      }
      return buffer.buffer;
    } catch (error: any) {
      console.error(`[MAIN] Error reading chunk from ${filePath}:`, error);
      throw error;
    }
  });

  // NEW: Native File Dialog (PRP #42-1)
  ipcMain.handle('dialog:openFile', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    });
    return result.canceled ? null : result.filePaths;
  });

  // NEW: Directory Selection (Settings Menu)
  ipcMain.handle('dialog:openDirectory', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory']
    });
    return result.canceled ? null : result.filePaths;
  });

  // NEW: Recursive Path Expansion (PRP #42-1)
  ipcMain.handle('app:expandPaths', async (_event, paths: string[]) => {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');

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
        console.warn(`[MAIN] Failed to expand path: ${p}`, err);
      }
    }
    return allFiles;
  });

  // ------------------------------------------------------------------
  // PYTHON INTEGRATION (AmbiRotate)
  // ------------------------------------------------------------------

  ipcMain.handle('process-ambi-rotate', async (event, filePaths: string[], rotation) => {
    console.log("MAIN: Starting Rotation Render...", { filePaths, rotation });

    // Locate the Python Script (Adjust path relative to 'dist-electron')
    const scriptPath = path.join(__dirname, '../py/ambi_rotate.py');

    return new Promise((resolve, reject) => {
      const python = spawn('python3', [
        scriptPath,
        '--files', JSON.stringify(filePaths),
        '--yaw', rotation.yaw.toString(),
        '--pitch', rotation.pitch.toString(),
        '--roll', rotation.roll.toString()
      ]);

      let output = '';
      let errorOutput = '';

      python.stdout.on('data', (data) => {
        console.log(`PYTHON: ${data}`);
        output += data.toString();
      });

      python.stderr.on('data', (data) => {
        console.error(`PYTHON ERR: ${data}`);
        errorOutput += data.toString();
      });

      python.on('close', (code) => {
        if (code === 0) {
          console.log("MAIN: Rotation Render Success.");
          resolve({ success: true, log: output });
        } else {
          console.error("MAIN: Rotation Render Failed.", code);
          reject(new Error(`Python script failed with code ${code}: ${errorOutput}`));
        }
      });
    });
  });

  createWindow()
})

import { app, BrowserWindow, ipcMain, dialog, protocol, net } from 'electron'
// import { createRequire } from 'node:module' // Unused
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import { dispatchTask } from './handlers/index'
import { probeAudio } from './handlers/common'
import { generateProxy, executeTrim } from './handlers/trim'

import { spawn } from 'child_process';
import http from 'http';
import fs from 'node:fs';
import { getPanFilter } from './handlers/matrix_utils';
import { getFfmpegPath, getSofaAssetPath } from './handlers/common';


// const require = createRequire(import.meta.url) // Unused
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// 1. REGISTER SCHEME (Must be done before app.on('ready'))
protocol.registerSchemesAsPrivileged([
  { scheme: 'media', privileges: { secure: true, supportFetchAPI: true, bypassCSP: true } }
]);

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

  // ------------------------------------------------------------------
  // BINAURAL STREAMING SERVER (PRP #72)
  // ------------------------------------------------------------------
  const server = http.createServer((req, res) => {
    // Only handle /stream
    if (!req.url?.startsWith('/stream')) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const filePath = url.searchParams.get('file');
    const binaural = url.searchParams.get('binaural') === 'true';
    let sofaPath = url.searchParams.get('sofaPath');
    const hrtfProfile = url.searchParams.get('hrtfProfile');

    // Resolve Preset Paths if sofaPath is missing but profile is known
    if (binaural && !sofaPath && hrtfProfile) {
      if (hrtfProfile.includes('Neumann')) {
        sofaPath = getSofaAssetPath('Neumann_KU100_48k.sofa');
      } else if (hrtfProfile.includes('KEMAR')) {
        sofaPath = getSofaAssetPath('MIT_KEMAR_Normal.sofa');
      }
    }

    if (!filePath || !fs.existsSync(filePath)) {
      res.writeHead(400);
      res.end('Invalid File Path');
      return;
    }

    console.log(`[Stream] Request: ${path.basename(filePath)}, Binaural: ${binaural}, SOFA: ${path.basename(sofaPath || '')}`);

    // Headers for WebM/Opus Stream
    res.writeHead(200, {
      'Content-Type': 'audio/webm',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // Construct FFmpeg Arguments
    const ffmpegPath = getFfmpegPath();
    const args: string[] = [
      '-re', // Real-time reading
      '-i', filePath
    ];

    // Filter Logic
    if (binaural && sofaPath && fs.existsSync(sofaPath)) {
      try {
        const filterComplex = getPanFilter(3, sofaPath); // Hardcoded 3rd Order
        args.push('-filter_complex', filterComplex);
      } catch (err) {
        console.error(`[Stream] Filter Generation Error:`, err);
        args.push('-ac', '2'); // Fallback
      }
    } else {
      args.push('-ac', '2'); // Stereo Downmix
    }

    // Output Format: WebM / Opus
    args.push(
      '-f', 'webm',
      '-c:a', 'libopus',
      '-b:a', '192k',
      '-ac', '2',
      'pipe:1'
    );

    console.log(`[Stream] Spawning FFmpeg...`);

    const ffmpeg = spawn(ffmpegPath, args);

    // Pipe Stdout to Response
    ffmpeg.stdout.pipe(res);

    // Handle Client Disconnect
    req.on('close', () => {
      console.log(`[Stream] Client disconnected. Killing...`);
      ffmpeg.kill();
    });

    ffmpeg.on('close', (_code) => {
      if (!res.writableEnded) res.end();
    });

    ffmpeg.stderr.on('data', (_d) => {
      // Optional: console.log(`[Stream Log]: ${d}`);
    });
  });

  server.listen(45455, '127.0.0.1', () => {
    console.log('[Stream] Server listening on http://127.0.0.1:45455/stream');
  });

  // 2. HANDLE MEDIA REQUESTS
  protocol.handle('media', (request) => {
    // Convert "media://path/to/file.mp3" -> "file:///path/to/file.mp3"
    const filePath = request.url.replace('media://', '');

    // Decoding is crucial for paths with spaces or special chars
    const decodedPath = decodeURIComponent(filePath);

    // Normalize path just in case (optional but safe)
    // const normalizedPath = path.normalize(decodedPath);

    // Return the file response safely
    return net.fetch(pathToFileURL(decodedPath).toString());
  });

  // Register IPC Handlers
  ipcMain.handle('run-task', async (event, toolId, options) => {
    return await dispatchTask(event, toolId, options);
  })

  // Expose File Inspection
  ipcMain.handle('inspect-file', async (_event, path) => {
    try {
      const info = await probeAudio(path);
      return { success: true, data: info };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  })

  // Expose File Reading (ArrayBuffer) - Legacy (Full)
  ipcMain.handle('read-file', async (_event, filePath) => {
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
  ipcMain.handle('get-file-size', async (_event, filePath) => {
    try {
      const stats = await import('node:fs/promises').then(fs => fs.stat(filePath));
      return stats.size;
    } catch (error: any) {
      console.error(`[MAIN] Error getting size for ${filePath}:`, error);
      throw error;
    }
  });

  ipcMain.handle('read-chunk', async (_event, filePath, offset, length) => {
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
  ipcMain.handle('dialog:openFile', async (_event, options: Electron.OpenDialogOptions = {}) => {
    const defaultProps: any[] = ['openFile', 'multiSelections'];
    // Merge provided properties if any, otherwise stick to defaults
    // If options.properties is provided, we use it. If not, we use default.
    const result = await dialog.showOpenDialog({
      properties: options.properties || defaultProps,
      filters: options.filters
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

  ipcMain.handle('process-ambi-rotate', async (_event, filePaths: string[], rotation) => {
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

  // ------------------------------------------------------------------
  // AmbiTrim Handlers
  // ------------------------------------------------------------------
  ipcMain.handle('trim:generateProxy', async (_event, filePath: string) => {
    return await generateProxy(filePath);
  });

  ipcMain.handle('trim:executeTrim', async (_event, filePath: string, start: number, end: number, outputDir: string) => {
    return await executeTrim(filePath, start, end, outputDir);
  });

  // ------------------------------------------------------------------
  // AmbiData Handler
  // ------------------------------------------------------------------  // AmbiData analysis
  ipcMain.handle('analyze-ambi-file', async (event, filePath: string) => {
    const { analyzeAmbiFile } = await import('./handlers/AmbiData');
    return await analyzeAmbiFile(event, filePath);
  });

  createWindow()
})

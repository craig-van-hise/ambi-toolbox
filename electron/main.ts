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
import { getFfmpegPath, getSofaAssetPath } from './handlers/common';
import { createObrPipeline } from './handlers/ObrHandler';


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
    const server = http.createServer(async (req, res) => {
        // PROBE METADATA ENDPOINT
        if (req.url?.startsWith('/probe-metadata') || req.url?.startsWith('/probe-duration')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const filePath = url.searchParams.get('file');

            if (!filePath || !fs.existsSync(filePath)) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid File' }));
                return;
            }

            const info = await probeAudio(filePath).catch(() => null);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({
                duration: info?.duration || 0,
                channels: info?.channels || 0,
                sampleRate: info?.sampleRate || 0
            }));
            return;
        }

        // STREAM ENDPOINT HANDLING (Restructured for Exclusive Routing)
        const isLegacyStream = req.url?.startsWith('/stream');
        const isObrStream = req.url?.startsWith('/obr-stream');

        if (isLegacyStream) {
            // ... (Legacy /stream logic) ...
            const url = new URL(req.url!, `http://${req.headers.host}`);
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
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*'
            });

            // Construct FFmpeg Arguments
            const ffmpegPath = getFfmpegPath();
            const args: string[] = [
                '-re', // Real-time reading
                '-i', filePath,
                '-ac', '2', // Stereo Downmix
                '-f', 'webm',
                '-c:a', 'libopus',
                '-b:a', '192k',
                'pipe:1'
            ];

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

            ffmpeg.stderr.on('data', (d) => {
                console.log(`[FFmpeg]: ${d.toString()}`);
            });
            return;

        } else if (isObrStream) {
            // ... (OBR /obr-stream logic) ...
            const url = new URL(req.url!, `http://${req.headers.host}`);
            const filePath = url.searchParams.get('file');
            const channels = parseInt(url.searchParams.get('channels') || '0', 10);
            const profile = url.searchParams.get('profile') || 'ambient';

            if (!filePath || !fs.existsSync(filePath) || !channels) {
                res.writeHead(400);
                res.end('Invalid Parameters');
                return;
            }

            console.log(`[OBR] Request: ${path.basename(filePath)} (${channels}ch, ${profile})`);

            res.writeHead(200, {
                'Content-Type': 'audio/webm',
                'Transfer-Encoding': 'chunked',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*'
            });

            try {
                const [decoder, obr, encoder] = createObrPipeline(filePath, channels, profile);

                if (!encoder.stdout) {
                    throw new Error("Encoder stdout is null");
                }

                // Pipe Final Output (Encoder) to Response
                encoder.stdout.pipe(res);

                // Handle Encoder Stdout errors (specifically EPIPE)
                encoder.stdout.on('error', (err: any) => {
                    if (err.code === 'EPIPE') {
                        console.log('[OBR] Client disconnected (EPIPE). Pipeline will be reaped.');
                    } else {
                        console.error('[OBR] Encoder stdout error:', err);
                    }
                });

                // Handle Client Disconnect
                req.on('close', () => {
                    console.log(`[OBR] Client disconnected. Cleaning up pipeline...`);
                    try { if (encoder.stdout) encoder.stdout.unpipe(); } catch (e) { }
                    decoder.kill('SIGKILL');
                    obr.kill('SIGKILL');
                    encoder.kill('SIGKILL');
                });

                encoder.on('close', () => {
                    if (!res.writableEnded) res.end();
                });

            } catch (err: any) {
                console.error(`[OBR] Pipeline Error:`, err);
                // Too late to writeHead 500 if 200 was sent? 
                // We should just destroy if headers sent.
                if (!res.headersSent) {
                    res.writeHead(500);
                    res.end('Pipeline Error');
                } else {
                    res.destroy();
                }
            }
            return;
        } else {
            // 404
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
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

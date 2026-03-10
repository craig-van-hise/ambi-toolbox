import { app, BrowserWindow, protocol, net } from 'electron'
import log from 'electron-log/main'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import os from 'node:os';
import fs from 'node:fs';
import { registerAllHandlers } from './handlers/index'
import { startStreamServer } from './StreamServer';

/**
 * main.ts
 * Main process entry point for AmbiToolbox.
 * Handles window creation, basic app lifecycle, and core protocol registration.
 * Specialized logic is modularized into handlers and utility modules.
 */

// 🚧 Environment Setup
const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// ------------------------------------------------------------------
// LOGGING CONFIGURATION
// ------------------------------------------------------------------
log.initialize();
log.transports.file.level = false; // Disable file transport
log.transports.console.level = 'silly';
log.transports.ipc.level = 'silly';
Object.assign(console, log.functions);
// ------------------------------------------------------------------

// 1. REGISTER SCHEME (Must be done before app.on('ready'))
protocol.registerSchemesAsPrivileged([
    { scheme: 'media', privileges: { secure: true, supportFetchAPI: true, bypassCSP: true } }
]);

let win: BrowserWindow | null

function createWindow() {
    win = new BrowserWindow({
        minWidth: 800,
        minHeight: 500,
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    })

    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        win.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }
}

// App Lifecycle
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
    // MODULAR INITIALIZATION
    // ------------------------------------------------------------------

    // 1. Start Audio Streaming Server
    startStreamServer();

    // 2. Register all IPC Handlers (Unified)
    registerAllHandlers();

    // 3. Register 'media://' Protocol Handler
    protocol.handle('media', (request) => {
        const filePath = request.url.replace('media://', '');
        const decodedPath = decodeURIComponent(filePath);
        return net.fetch(pathToFileURL(decodedPath).toString());
    });

    createWindow()
})

// ------------------------------------------------------------------
// CLEANUP ON EXIT
// ------------------------------------------------------------------
app.on('quit', () => {
    console.log('[Main] Cleaning up temporary files...');
    const tempDir = os.tmpdir();
    try {
        const files = fs.readdirSync(tempDir);
        files.forEach(f => {
            if (f.endsWith('.ambi_tmp.wav')) {
                const fullPath = path.join(tempDir, f);
                try {
                    fs.unlinkSync(fullPath);
                    console.log(`[Main] Cleaned up: ${f}`);
                } catch (unlinkErr) {
                    console.warn(`[Main] Failed to delete ${f}:`, unlinkErr);
                }
            }
        });
    } catch (e) {
        console.error('[Main] Cleanup failed:', e);
    }
});

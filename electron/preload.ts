import { contextBridge, ipcRenderer } from 'electron';
import 'electron-log/preload';


// --- LEGACY BRIDGE (For EpicsToBin, MixToOpus, etc.) ---
contextBridge.exposeInMainWorld('electron', {
  // The critical function missing for legacy tools:
  runTask: (command: string, args: any[]) => ipcRenderer.invoke('run-task', command, args),

  // Legacy handlers
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  selectFile: () => ipcRenderer.invoke('dialog:openFile'),
  onLog: (callback: (event: any, msg: string) => void) => {
    const sub = (_: any, msg: string) => callback(_, msg);
    ipcRenderer.on('backend-log', sub);
    return () => ipcRenderer.removeListener('backend-log', sub);
  },
  // Missing method causing AmbiOrder crash (PRP #40)
  inspectFile: (path: string) => ipcRenderer.invoke('inspect-file', path)
});

// --- NEW BRIDGE (For AmbiRotate) ---
contextBridge.exposeInMainWorld('electronAPI', {
  // Dialogs
  selectFiles: (options?: any) => ipcRenderer.invoke('dialog:openFile', options),
  expandPaths: (paths: string[]) => ipcRenderer.invoke('app:expandPaths', paths),

  // IPC for AmbiRotate
  processAmbiRotate: (filePaths: string[], rotation: any) =>
    ipcRenderer.invoke('process-ambi-rotate', filePaths, rotation),

  // Progress Listener
  on: (channel: string, callback: (data: any) => void) => {
    const subscription = (_: any, data: any) => callback(data);
    ipcRenderer.on(channel, subscription);
    return () => ipcRenderer.removeListener(channel, subscription);
  },

  // Audio Processing Listener
  onProgress: (callback: (data: any) => void) => {
    const sub = (_: any, data: any) => callback(data);
    ipcRenderer.on('task-progress', sub);
    return () => ipcRenderer.removeListener('task-progress', sub);
  },

  // --- Added by Logic for AmbiRotate Compatibility (PRP #18/36) ---
  getFileSize: (path: string) => ipcRenderer.invoke('get-file-size', path),
  readChunk: (path: string, offset: number, size: number) => ipcRenderer.invoke('read-chunk', path, offset, size),
  inspectFile: (path: string) => ipcRenderer.invoke('inspect-file', path),

  // Conversion Methods (Mapped to 'run-task')
  convertBitrate: (filePaths: string[], bitrate: string, format: 'opus' | 'iamf', settings?: any) =>
    ipcRenderer.invoke('run-task', format === 'iamf' ? 'ambix2iamf' : 'ambix2opus', { files: filePaths, bitrate, settings }),

  convertAmbix2Bin: (filePaths: string[], hrtfProfile: string, settings?: any) =>
    ipcRenderer.invoke('run-task', 'ambix2bin', { files: filePaths, hrtfProfile, settings }),

  convertAmbiSwap: (filePaths: string[], direction: string, settings?: any) =>
    ipcRenderer.invoke('run-task', 'ambiswap', { files: filePaths, direction, settings }),

  convertAmbix2Caf: (filePaths: string[], layout?: string, bitDepth?: string, settings?: any) =>
    ipcRenderer.invoke('run-task', 'ambix2caf', { files: filePaths, layout, bitDepth, settings }),

  convertAmbiOrder: (filePaths: string[], targetOrder: string, settings?: any) =>
    ipcRenderer.invoke('run-task', 'ambiorder', { files: filePaths, targetOrder, settings }),

  convertAmbix2Apac: (filePaths: string[], bitrate: string, settings?: any) =>
    ipcRenderer.invoke('run-task', 'ambix2apac', { files: filePaths, bitrate, settings }),

  convertAmbix2Ogg: (filePaths: string[], bitrate: string, settings?: any) =>
    ipcRenderer.invoke('run-task', 'ambix2ogg', { files: filePaths, bitrate, settings }),

  convertAmbiRotate: (filePaths: string[], rotation: { yaw: number, pitch: number, roll: number }, settings?: any) =>
    ipcRenderer.invoke('run-task', 'ambirotate', { files: filePaths, ...rotation, settings }),

  convertStereo2Ambix: (filePaths: string[], targetOrder: string, stageWidth: number, envelopment: number, settings?: any) =>
    ipcRenderer.invoke('run-task', 'stereo2ambix', { files: filePaths, targetOrder, stageWidth, envelopment, settings }),

  processAmbiLevel: (filePaths: string[], mode: 'manual' | 'normalize', targetDb: number, settings?: any) =>
    ipcRenderer.invoke('run-task', 'ambilevel', { files: filePaths, mode, targetDb, settings }),

  convertAmbix2BW64: (filePaths: string[], normalization: 'SN3D' | 'N3D', nfcDistance?: number, settings?: any) =>
    ipcRenderer.invoke('run-task', 'ambix2bw64', { files: filePaths, normalization, nfcDistance, settings }),


  // AmbiTrim
  trim: {
    generateProxy: (filePath: string) => ipcRenderer.invoke('trim:generateProxy', filePath),
    executeTrim: (filePath: string, start: number, end: number, outputDir: string) =>
      ipcRenderer.invoke('trim:executeTrim', filePath, start, end, outputDir)
  },

  // AmbiData
  analyzeAmbiFile: (filePath: string) => ipcRenderer.invoke('analyze-ambi-file', filePath)
});

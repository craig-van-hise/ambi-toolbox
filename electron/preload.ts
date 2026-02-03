import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  processChunk: (filePath: string, options: any) => ipcRenderer.invoke('process-chunk', filePath, options),
  processAmbiRotate: (filePaths: string[], rotation: any) => ipcRenderer.invoke('process-ambi-rotate', filePaths, rotation),

  onProgress: (callback: (progress: number) => void) => {
    const subscription = (_event: any, progress: number) => callback(progress)
    ipcRenderer.on('task-progress', subscription)
    return () => ipcRenderer.removeListener('task-progress', subscription)
  },
  onStatus: (callback: (message: string) => void) => {
    const subscription = (_event: any, message: string) => callback(message)
    ipcRenderer.on('task-status', subscription)
    return () => ipcRenderer.removeListener('task-status', subscription)
  },
  onError: (callback: (error: string) => void) => {
    const subscription = (_event: any, error: string) => callback(error)
    ipcRenderer.on('task-error', subscription)
    return () => ipcRenderer.removeListener('task-error', subscription)
  },
  inspectFile: (path: string) => ipcRenderer.invoke('inspect-file', path),
  readFile: (path: string) => ipcRenderer.invoke('read-file', path),
  getFileSize: (path: string) => ipcRenderer.invoke('get-file-size', path),
  readChunk: (path: string, offset: number, size: number) => ipcRenderer.invoke('read-chunk', path, offset, size)
})

/// <reference types="vite/client" />
/// <reference types="vite-plugin-electron/electron-env" />

interface ElectronAPI {
    processChunk: (filePath: string, options: any) => Promise<any>
    processAmbiRotate: (filePaths: string[], rotation: { yaw: number, pitch: number, roll: number }) => Promise<any>
    onProgress: (callback: (progress: number) => void) => () => void
    onStatus: (callback: (message: string) => void) => () => void
    onError: (callback: (error: string) => void) => () => void
    inspectFile: (path: string) => Promise<{ success: boolean; data?: any; error?: string }>
    readFile: (path: string) => Promise<ArrayBuffer>
    getFileSize: (path: string) => Promise<number>
    readChunk: (path: string, offset: number, size: number) => Promise<ArrayBuffer>
}

declare interface Window {
    electron: ElectronAPI
    ambisonics: any
    JSAmbisonics: any
}


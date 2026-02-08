/// <reference types="vite/client" />
/// <reference types="vite-plugin-electron/electron-env" />

interface ElectronLegacy {
    runTask: (command: string, args: any[]) => Promise<any>
    selectFolder: () => Promise<any>
    selectFile: () => Promise<any>
    onLog: (callback: (event: any, msg: string) => void) => () => void
    inspectFile: (path: string) => Promise<any>
}

interface ElectronAPI {
    selectFiles: () => Promise<string[]>
    expandPaths: (paths: string[]) => Promise<string[]>
    processAmbiRotate: (filePaths: string[], rotation: { yaw: number, pitch: number, roll: number }) => Promise<any>
    on: (channel: string, callback: (data: any) => void) => () => void
    onProgress: (callback: (progress: number) => void) => () => void
    // Compatibility Methods
    getFileSize: (path: string) => Promise<number>
    readChunk: (path: string, offset: number, size: number) => Promise<ArrayBuffer>
    inspectFile: (path: string) => Promise<{ success: boolean; data?: any; error?: string }>

    // New Conversion Methods
    convertBitrate: (filePaths: string[], bitrate: string, format: 'opus' | 'iamf') => Promise<any>
    convertAmbix2Bin: (filePaths: string[], hrtfProfile: string) => Promise<any>
    convertAmbiSwap: (filePaths: string[], direction: string) => Promise<any>
    convertAmbix2Caf: (filePaths: string[], layout?: string, bitDepth?: string) => Promise<any>
    convertAmbiOrder: (filePaths: string[], targetOrder: string) => Promise<any>
    convertAmbix2Apac: (filePaths: string[], bitrate: string) => Promise<any>
}

declare interface Window {
    electron: ElectronLegacy
    electronAPI: ElectronAPI
    ambisonics: any
    JSAmbisonics: any
}



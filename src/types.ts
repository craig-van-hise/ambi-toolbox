export enum ToolId {
  Ambix2Opus = 'ambix2opus',
  Ambix2CAF = 'ambix2caf',
  AmbiOrder = 'ambiorder',
  AmbiSwap = 'ambiswap',
  AmbiRotate = 'ambirotate',
  Ambix2Bin = 'ambix2bin',
  Ambix2IAMF = 'ambix2iamf',
  Ambix2APAC = 'ambix2apac',
}

export interface ToolDefinition {
  id: ToolId;
  label: string;
  description: string;
  colorClass: string; // Tailwind text color class
  btnColorClass: string; // Tailwind bg color class for primary actions
}

export enum BitrateOption {
  Low = 'Low (32kbps)',
  Medium = 'Medium (64kbps)',
  High = 'High (96kbps)',
  Highest = 'Highest (128kbps)',
}

export enum HrtfProfile {
  Neumann = 'Generic (Neumann KU100)',
  Kemar = 'Generic (KEMAR)',
  Custom = 'Load Custom .sofa...',
}

export enum AmbisonicOrder {
  Third = '3rd Order (16 Channels)',
  Second = '2nd Order',
  First = '1st Order',
  Zero = '0th Order (Omni)',
  Fourth = '4th Order (25 Channels)',
  Fifth = '5th Order (36 Channels)',
  Sixth = '6th Order (49 Channels)',
  Seventh = '7th Order (64 Channels)',
}

export enum AmbiFormat {
  AmbiX = 'AmbiX (ACN/SN3D)',
  FuMa = 'FuMa (Furse-Malham)',
}

export interface AmbiRotateToolProps {
  tool: ToolDefinition;
  files: any[];
  isProcessing: boolean;
  onRun: (options: any) => void;
}

export interface ElectronAPI {
  readChunk: (filePath: string, offset: number, length: number) => Promise<ArrayBuffer>;
  processAmbiRotate: (filePaths: string[], rotation: { yaw: number, pitch: number, roll: number }) => Promise<any>;
  convertBitrate: (filePaths: string[], bitrate: string, format: 'opus' | 'iamf', settings?: any) => Promise<any>;
  convertAmbix2Bin: (filePaths: string[], hrtfProfile: string, settings?: any) => Promise<any>;
  convertAmbiSwap: (filePaths: string[], direction: string, settings?: any) => Promise<any>;
  convertAmbix2Caf: (filePaths: string[], layout?: string, bitDepth?: string, settings?: any) => Promise<any>;
  convertAmbiOrder: (filePaths: string[], targetOrder: string, settings?: any) => Promise<any>;
  convertAmbix2Apac: (filePaths: string[], bitrate: string, settings?: any) => Promise<any>;
  convertAmbiRotate: (filePaths: string[], rotation: { yaw: number, pitch: number, roll: number }, settings?: any) => Promise<any>;
  on: (channel: string, callback: (data: any) => void) => () => void;
  onProgress: (callback: (data: any) => void) => () => void;
}
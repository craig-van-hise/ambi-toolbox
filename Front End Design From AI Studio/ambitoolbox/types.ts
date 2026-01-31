export enum ToolId {
  Ambix2Opus = 'ambix2opus',
  Ambix2CAF = 'ambix2caf',
  AmbiOrder = 'ambiorder',
  AmbiSwap = 'ambiswap',
  AmbiRotate = 'ambirotate',
  Ambix2Bin = 'ambix2bin',
  Ambix2IAMF = 'ambix2iamf',
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
}

export enum AmbiFormat {
  AmbiX = 'AmbiX (ACN/SN3D)',
  FuMa = 'FuMa (Furse-Malham)',
}
import { ToolDefinition, ToolId, BitrateOption } from './types';


export const TOOLS: ToolDefinition[] = [
  {
    id: ToolId.Ambix2Bin,
    label: 'Ambix2Bin',
    description: 'Converts Ambisonics to Binaural using SOFA HRTF files.',
    colorClass: 'text-green-500',
    btnColorClass: 'bg-green-600 hover:bg-green-700',
  },
  {
    id: ToolId.Ambix2Opus,
    label: 'Ambix2Opus',
    description: 'Compresses .wav/.amb to Ogg Opus for Web/Unity.',
    colorClass: 'text-purple-500',
    btnColorClass: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: ToolId.Ambix2Ogg,
    label: 'Ambix2Ogg',
    description: 'Wraps Ambisonics into Ogg container (.ogg). Supports Opus transcoding or remuxing.',
    colorClass: 'text-pink-500',
    btnColorClass: 'bg-pink-600 hover:bg-pink-700',
  },
  {
    id: ToolId.Ambix2IAMF,
    label: 'Ambix2IAMF',
    description: 'Encodes Ambisonics to IAMF (Samsung/YouTube).',
    colorClass: 'text-yellow-500',
    btnColorClass: 'bg-yellow-600 hover:bg-yellow-700',
  },
  {
    id: ToolId.Ambix2CAF,
    label: 'Ambix2CAF',
    description: 'Converts to Apple Core Audio Format (.caf) with spatial tags.',
    colorClass: 'text-gray-300',
    btnColorClass: 'bg-gray-600 hover:bg-gray-700',
  },
  {
    id: ToolId.Ambix2APAC,
    label: 'Ambix2APAC',
    description: 'Encodes Ambisonics to Apple Spatial Audio Codec (APAC) for visionOS.',
    colorClass: 'text-cyan-500',
    btnColorClass: 'bg-cyan-600 hover:bg-cyan-700',
  },
  {
    id: ToolId.AmbiData,
    label: 'AmbiData',
    description: 'Analyze and edit spatial audio metadata & technical specs.',
    colorClass: 'text-indigo-400',
    btnColorClass: 'bg-indigo-600 hover:bg-indigo-700',
  },
  {
    id: ToolId.AmbiOrder,
    label: 'AmbiOrder',
    description: 'Reduces spatial resolution (e.g., 3rd Order → 1st Order).',
    colorClass: 'text-blue-500',
    btnColorClass: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: ToolId.AmbiSwap,
    label: 'AmbiSwap',
    description: 'Swaps formats between AmbiX (ACN/SN3D) and FuMa.',
    colorClass: 'text-orange-500',
    btnColorClass: 'bg-orange-600 hover:bg-orange-700',
  },
  {
    id: ToolId.AmbiRotate,
    label: 'AmbiRotate',
    description: 'Fixes orientation issues (Yaw/Pitch/Roll) with real-time preview.',
    colorClass: 'text-red-500',
    btnColorClass: 'bg-red-600 hover:bg-red-700',
  },
  {
    id: ToolId.AmbiTrim,
    label: 'AmbiTrim',
    description: 'Lossless trimming for Ambisonic master files.',
    colorClass: 'text-teal-400',
    btnColorClass: 'bg-teal-600 hover:bg-teal-700',
  }
];

export const BITRATE_OPTIONS = [
  BitrateOption.Low,
  BitrateOption.Medium,
  BitrateOption.High,
  BitrateOption.Highest,
];

export const ACCEPTED_AUDIO_FORMATS = [
  '.aac', '.aivu', '.amb', '.caf', '.flac', '.iamf', '.m4a', '.mat', '.mkv', '.mov', '.mp3', '.mp4', '.ogg', '.opus', '.wav', '.webm'
];
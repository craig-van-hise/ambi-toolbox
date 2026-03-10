import { ToolDefinition, ToolId, BitrateOption } from './types';


export const TOOLS: ToolDefinition[] = [
  {
    id: ToolId.Ambix2Bin,
    label: 'Ambix2Bin',
    description: 'Converts Ambisonics to Binaural using SOFA HRTF files.',
    actionLabel: 'Binauralize',
    colorClass: 'text-green-500',
    btnColorClass: 'bg-green-600 hover:bg-green-700',
  },
  {
    id: ToolId.Ambix2Opus,
    label: 'Ambix2Opus',
    description: 'Compresses .wav/.amb to Ogg Opus for Web/Unity.',
    actionLabel: 'Convert Opus',
    colorClass: 'text-purple-500',
    btnColorClass: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: ToolId.Ambix2Ogg,
    label: 'Ambix2Ogg',
    description: 'Wraps Ambisonics into Ogg container (.ogg). Supports Opus transcoding or remuxing.',
    actionLabel: 'Wrap Ogg',
    colorClass: 'text-pink-500',
    btnColorClass: 'bg-pink-600 hover:bg-pink-700',
  },
  {
    id: ToolId.Ambix2IAMF,
    label: 'Ambix2IAMF',
    description: 'Encodes Ambisonics to IAMF (Samsung/YouTube).',
    actionLabel: 'Encode IAMF',
    colorClass: 'text-yellow-500',
    btnColorClass: 'bg-yellow-600 hover:bg-yellow-700',
  },
  {
    id: ToolId.Ambix2CAF,
    label: 'Ambix2CAF',
    description: 'Converts to Apple Core Audio Format (.caf) with spatial tags.',
    actionLabel: 'Convert CAF',
    colorClass: 'text-gray-300',
    btnColorClass: 'bg-gray-600 hover:bg-gray-700',
  },
  {
    id: ToolId.Ambix2APAC,
    label: 'Ambix2APAC',
    description: 'Encodes Ambisonics to Apple Spatial Audio Codec (APAC) for visionOS.',
    actionLabel: 'Convert APAC',
    colorClass: 'text-cyan-500',
    btnColorClass: 'bg-cyan-600 hover:bg-cyan-700',
  },
  {
    id: ToolId.Stereo2Ambix,
    label: 'Stereo2Ambix',
    description: 'Upmixes 2ch stereo audio into high-order Ambisonics using adaptive PCA and FDN.',
    actionLabel: 'Upmix',
    colorClass: 'text-emerald-500',
    btnColorClass: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    id: ToolId.AmbiData,
    label: 'AmbiData',
    description: 'Analyze and edit spatial audio metadata & technical specs.',
    actionLabel: 'Apply Changes',
    colorClass: 'text-indigo-400',
    btnColorClass: 'bg-indigo-600 hover:bg-indigo-700',
  },
  {
    id: ToolId.AmbiOrder,
    label: 'AmbiOrder',
    description: 'Reduces spatial resolution (e.g., 3rd Order → 1st Order).',
    actionLabel: 'Reduce Order',
    colorClass: 'text-blue-500',
    btnColorClass: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: ToolId.AmbiSwap,
    label: 'AmbiSwap',
    description: 'Swaps formats between AmbiX (ACN/SN3D) and FuMa.',
    actionLabel: 'Swap Format',
    colorClass: 'text-orange-500',
    btnColorClass: 'bg-orange-600 hover:bg-orange-700',
  },
  {
    id: ToolId.AmbiRotate,
    label: 'AmbiRotate',
    description: 'Fixes orientation issues (Yaw/Pitch/Roll) with real-time preview.',
    actionLabel: 'Process Rotation',
    colorClass: 'text-red-500',
    btnColorClass: 'bg-red-600 hover:bg-red-700',
  },
  {
    id: ToolId.AmbiTrim,
    label: 'AmbiTrim',
    description: 'Lossless trimming for Ambisonic master files.',
    actionLabel: 'Trim',
    colorClass: 'text-teal-400',
    btnColorClass: 'bg-teal-600 hover:bg-teal-700',
  },
  {
    id: ToolId.AmbiLevel,
    label: 'AmbiLevel',
    description: 'Adjust gain or normalize Ambisonic audio safely (Linked Channels).',
    actionLabel: 'Level/Normalize',
    colorClass: 'text-fuchsia-400',
    btnColorClass: 'bg-fuchsia-600 hover:bg-fuchsia-700',
  },
  {
    id: ToolId.Ambix2BW64,
    label: 'Ambix2BW64',
    description: 'Converts AmbiX to BW64 with ADM metadata using EBU ADM Renderer.',
    actionLabel: 'Convert BW64',
    colorClass: 'text-yellow-400',
    btnColorClass: 'bg-yellow-600 hover:bg-yellow-700',
  },
];


export const BITRATE_OPTIONS = [
  { label: 'Low (32kbps)', value: BitrateOption.Low },
  { label: 'Medium (64kbps)', value: BitrateOption.Medium },
  { label: 'High (96kbps)', value: BitrateOption.High },
  { label: 'Ultra (128kbps)', value: BitrateOption.Ultra },
  { label: 'Technical Max (256kbps)', value: BitrateOption.TechMax }
];

export const ACCEPTED_AUDIO_FORMATS = [
  '.aac', '.aivu', '.amb', '.caf', '.flac', '.iamf', '.m4a', '.mat', '.mkv', '.mov', '.mp3', '.mp4', '.ogg', '.opus', '.wav', '.webm'
];
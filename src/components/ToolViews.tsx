import React, { useState, useRef, useEffect } from 'react';
import {
  ToolId,
  ToolDefinition,
  BitrateOption,
  AmbisonicOrder,
  AmbiFormat,
  HrtfProfile
} from '../types';
import { BITRATE_OPTIONS } from '../constants';
import { SmartDropZone } from './SmartDropZone';
import { AmbiRotateTool, AmbiRotateHandle } from '../tools/AmbiRotate';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { AmbiTrim } from '../components/tools/AmbiTrim';
import { AmbiDataTool } from '../tools/AmbiData';
import { FileQueue } from './FileQueue';

interface ToolViewProps {
  tool: ToolDefinition;
}

import { useSettings } from '../contexts/SettingsContext';
import { useToolState } from '../contexts/ToolStateContext';
import { usePlayback } from '../contexts/PlaybackContext';
import { MediaFile, FileType } from '../tools/AmbiData/types';
import { Transport } from './Transport';

// ----------------------------------------------------------------------
// SHARED COMPONENTS
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// TOOL SPECIFIC IMPLEMENTATIONS
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// TOOL SPECIFIC IMPLEMENTATIONS
// ----------------------------------------------------------------------

const BitrateConverter: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
  const { settings, updateSettings } = useSettings();
  const [bitrate, setBitrate] = useState<BitrateOption>(() => {
    return settings.toolSettings?.[tool.id]?.bitrate || BitrateOption.High;
  });

  const handleBitrateChange = (val: BitrateOption) => {
    setBitrate(val);
    updateSettings({
      toolSettings: {
        ...settings.toolSettings,
        [tool.id]: { ...settings.toolSettings?.[tool.id], bitrate: val }
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-4">
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Target Bitrate (per channel)</label>
          <div className="relative">
            <select
              value={bitrate}
              onChange={(e) => handleBitrateChange(e.target.value as BitrateOption)}
              className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none text-white"
            >
              {BITRATE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={() => onRun({ bitrate })}
          disabled={isProcessing}
          className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
        >
          {isProcessing ? 'Converting...' : 'Convert'}
        </button>
      </div>
    </div>
  );
};

const Ambix2ApacTool: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
  const { settings, updateSettings } = useSettings();
  const [bitrate, setBitrate] = useState<string>(() => {
    return settings.toolSettings[tool.id]?.bitrate || 'Medium (96 kbps)';
  });

  const handleBitrateChange = (val: string) => {
    setBitrate(val);
    updateSettings({
      toolSettings: {
        ...settings.toolSettings,
        [tool.id]: { ...settings.toolSettings[tool.id], bitrate: val }
      }
    });
  };

  const options = [
    'Low (64 kbps)',
    'Medium (96 kbps)',
    'High (128 kbps)',
    'Pro (192 kbps)'
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-4">
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Target Bitrate (per channel)</label>
          <div className="relative">
            <select
              value={bitrate}
              onChange={(e) => handleBitrateChange(e.target.value)}
              className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 appearance-none text-white"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={() => onRun({ bitrate })}
          disabled={isProcessing}
          className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
        >
          {isProcessing ? 'Encoding...' : 'Encode to APAC'}
        </button>
      </div>
    </div>
  );
};

const Ambix2BinTool: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
  const { settings, updateSettings } = useSettings();
  const [profile, setProfile] = useState<HrtfProfile>(() => {
    return settings.toolSettings?.[tool.id]?.hrtfProfile || HrtfProfile.Neumann;
  });
  // State to hold the path of the custom SOFA file
  const [customSofaPath, setCustomSofaPath] = useState<string | null>(() => {
    return settings.toolSettings?.[tool.id]?.customSofaPath || null;
  });

  const handleProfileChange = async (val: HrtfProfile) => {
    if (val === HrtfProfile.Custom) {
      // Trigger file dialog
      try {
        const result = await window.electronAPI.selectFiles({
          properties: ['openFile'],
          filters: [
            { name: 'SOFA Files', extensions: ['sofa'] },
            { name: 'All Files', extensions: ['*'] }
          ]
        });

        if (result && result.length > 0) {
          const selectedPath = result[0];
          setCustomSofaPath(selectedPath);
          setProfile(HrtfProfile.Custom); // Only set to Custom if file selected

          // Persist (store 'Custom' in settings, AND store path)
          updateSettings({
            toolSettings: {
              ...settings.toolSettings,
              [tool.id]: {
                ...settings.toolSettings?.[tool.id],
                hrtfProfile: val,
                customSofaPath: selectedPath
              }
            }
          });
        } else {
          // Cancelled: Do nothing? Or revert select? 
          // If we don't update state, select remains on old value naturally.
        }
      } catch (err) {
        console.error("Failed to select custom SOFA:", err);
      }
    } else {
      setProfile(val);
      // Don't clear custom path, just switch profile. User might switch back.

      updateSettings({
        toolSettings: {
          ...settings.toolSettings,
          [tool.id]: {
            ...settings.toolSettings?.[tool.id],
            hrtfProfile: val
            // customSofaPath is preserved in settings
          }
        }
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-4">
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">HRTF Profile</label>
          <div className="relative">
            <select
              value={profile}
              onChange={(e) => handleProfileChange(e.target.value as HrtfProfile)}
              className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-white appearance-none text-white"
            >
              <option value={HrtfProfile.Neumann}>{HrtfProfile.Neumann}</option>
              <option value={HrtfProfile.Kemar}>{HrtfProfile.Kemar}</option>
              <option value={HrtfProfile.Custom}>{HrtfProfile.Custom}</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          {/* Show selected file path if Custom */}
          {profile === HrtfProfile.Custom && customSofaPath && (
            <p className="text-[10px] text-green-400 mt-1 font-mono break-all">
              Using: {customSofaPath.split('/').pop()}
            </p>
          )}
        </div>

        <button
          onClick={() => onRun({ hrtfProfile: profile === HrtfProfile.Custom ? customSofaPath : profile })}
          disabled={isProcessing || (profile === HrtfProfile.Custom && !customSofaPath)}
          className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
        >
          {isProcessing ? 'Converting...' : 'Convert'}
        </button>
      </div>
    </div>
  );
};

const AmbiOrderTool: React.FC<{ tool: ToolDefinition, files: File[], onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, files, onRun, isProcessing }) => {
  const { settings, updateSettings } = useSettings();
  const [targetOrder, setTargetOrder] = useState<string>(() => {
    return settings.toolSettings?.[tool.id]?.targetOrder || AmbisonicOrder.Second;
  });
  const [detectedOrder, setDetectedOrder] = useState<string>('Unknown');

  const handleOrderChange = (val: string) => {
    setTargetOrder(val);
    updateSettings({
      toolSettings: {
        ...settings.toolSettings,
        [tool.id]: { ...settings.toolSettings?.[tool.id], targetOrder: val }
      }
    });
  };

  React.useEffect(() => {
    if (files.length > 0) {
      const path = (files[0] as any).path;
      // Use standard analyzeAmbiFile
      window.electronAPI.analyzeAmbiFile(path).then((result: any) => {
        if (result && result.audio) {
          const ch = result.audio.channelCount;
          if (ch === 4) setDetectedOrder(AmbisonicOrder.First);
          else if (ch === 9) setDetectedOrder(AmbisonicOrder.Second);
          else if (ch === 16) setDetectedOrder(AmbisonicOrder.Third);
          else if (ch === 25) setDetectedOrder(AmbisonicOrder.Fourth);
          else if (ch === 36) setDetectedOrder('5th');
          else if (ch === 49) setDetectedOrder('6th');
          else setDetectedOrder('Custom/Unknown');
        }
      }).catch((err: any) => {
        console.error("Analysis failed", err);
        setDetectedOrder('Unknown');
      });
    } else {
      setDetectedOrder('None');
    }
  }, [files]);

  // Dynamic Options
  const options = [
    AmbisonicOrder.Third,
    AmbisonicOrder.Second,
    AmbisonicOrder.First,
    AmbisonicOrder.Zero
  ].filter(opt => {
    if (detectedOrder === 'Unknown' || detectedOrder === 'None') return true;

    const orderMap: Record<string, number> = {
      [AmbisonicOrder.Zero]: 0,
      [AmbisonicOrder.First]: 1,
      [AmbisonicOrder.Second]: 2,
      [AmbisonicOrder.Third]: 3,
      [AmbisonicOrder.Fourth]: 4
    };

    const current = orderMap[detectedOrder];
    const target = orderMap[opt];
    if (current === undefined) return true;
    return target < current;
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Detection Info - Compact */}
      <div className={`w-full px-4 py-2 rounded border flex flex-col justify-center h-[42px] ${detectedOrder !== 'Unknown' && detectedOrder !== 'None' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-[#1E1E1E] border-studio-border'}`}>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-500 uppercase leading-none">Detected</span>
          <span className="text-sm font-bold text-white leading-none">{detectedOrder}</span>
        </div>
      </div>

      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Output Order</label>
        <div className="relative">
          <select
            value={targetOrder}
            onChange={(e) => handleOrderChange(e.target.value)}
            className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none text-white"
          >
            {options.length > 0 ? options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            )) : <option disabled>No lower orders available</option>}
          </select>
          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <button
        onClick={() => onRun({ targetOrder })}
        disabled={isProcessing || options.length === 0}
        className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
      >
        {isProcessing ? 'Reducing...' : 'Reduce'}
      </button>
    </div>
  );
};

const AmbiSwapTool: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
  const { settings, updateSettings } = useSettings();
  const [inputFormat, setInputFormat] = useState<AmbiFormat>(() => {
    return settings.toolSettings?.[tool.id]?.inputFormat || AmbiFormat.AmbiX;
  });

  const handleFormatChange = (val: AmbiFormat) => {
    setInputFormat(val);
    updateSettings({
      toolSettings: {
        ...settings.toolSettings,
        [tool.id]: { ...settings.toolSettings?.[tool.id], inputFormat: val }
      }
    });
  };

  const isAmbixInput = inputFormat === AmbiFormat.AmbiX;

  return (

    <div className="w-full flex flex-col gap-4">
      {/* Format Toggle */}
      <div className="flex bg-[#1E1E1E] rounded-md border border-studio-border p-1 w-full justify-center">
        <button
          onClick={() => handleFormatChange(AmbiFormat.AmbiX)}
          className={`flex-1 px-3 py-1.5 rounded text-xs font-bold transition-all ${isAmbixInput ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
        >
          AmbiX
        </button>
        <button
          onClick={() => handleFormatChange(AmbiFormat.FuMa)}
          className={`flex-1 px-3 py-1.5 rounded text-xs font-bold transition-all ${!isAmbixInput ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
        >
          FuMa
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
        <span>{isAmbixInput ? 'AmbiX' : 'FuMa'}</span>
        <ArrowRight size={14} />
        <span>{isAmbixInput ? 'FuMa' : 'AmbiX'}</span>
      </div>

      <button
        onClick={() => onRun({ direction: isAmbixInput ? 'AmbixToFuMa' : 'FuMaToAmbix' })}
        disabled={isProcessing}
        className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
      >
        {isProcessing ? 'Swapping...' : 'Swap Format'}
      </button>
    </div>
  );
};



const Ambix2CafTool: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
  const { settings, updateSettings } = useSettings();
  const [layout, setLayout] = useState(() => {
    return settings.toolSettings?.[tool.id]?.layout || 'discrete';
  });
  const [bitDepth, setBitDepth] = useState(() => {
    return settings.toolSettings?.[tool.id]?.bitDepth || '24';
  });

  const handleLayoutChange = (val: string) => {
    setLayout(val);
    updateSettings({
      toolSettings: {
        ...settings.toolSettings,
        [tool.id]: { ...settings.toolSettings?.[tool.id], layout: val }
      }
    });
  };

  const handleBitDepthChange = (val: string) => {
    setBitDepth(val);
    updateSettings({
      toolSettings: {
        ...settings.toolSettings,
        [tool.id]: { ...settings.toolSettings?.[tool.id], bitDepth: val }
      }
    });
  };


  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Layout Tag</label>
        <div className="relative">
          <select
            value={layout}
            onChange={(e) => handleLayoutChange(e.target.value)}
            className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-500 appearance-none text-white"
          >
            <option value="discrete">Discrete (Default)</option>
            <option value="hoa">HOA ACN SN3D</option>
          </select>
          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Bit Depth</label>
        <div className="relative">
          <select
            value={bitDepth}
            onChange={(e) => handleBitDepthChange(e.target.value)}
            className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-500 appearance-none text-white"
          >
            <option value="24">24-bit</option>
            <option value="32">32-bit</option>
            <option value="16">16-bit</option>
          </select>
          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <button
        onClick={() => onRun({ layout, bitDepth })}
        disabled={isProcessing}
        className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
      >
        {isProcessing ? 'Converting...' : 'Convert'}
      </button>
    </div>
  );
};

const Ambix2OggTool: React.FC<{ tool: ToolDefinition, files: File[], onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, files, onRun, isProcessing }) => {
  const { settings, updateSettings } = useSettings();
  const [bitrate, setBitrate] = useState<BitrateOption>(() => {
    return settings.toolSettings?.[tool.id]?.bitrate || BitrateOption.High;
  });

  const handleBitrateChange = (val: BitrateOption) => {
    setBitrate(val);
    updateSettings({
      toolSettings: {
        ...settings.toolSettings,
        [tool.id]: { ...settings.toolSettings?.[tool.id], bitrate: val }
      }
    });
  };

  // Logic: Check if any file is .opus/.ogg
  // If so, we force "Passthrough" mode and disable bitrate.
  const [isPassthrough, setIsPassthrough] = useState(false);

  useEffect(() => {
    if (files.length > 0) {
      const hasOpus = files.some(f => f.name.toLowerCase().endsWith('.opus') || f.name.toLowerCase().endsWith('.ogg'));
      setIsPassthrough(hasOpus);
    } else {
      setIsPassthrough(false);
    }
  }, [files]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-4">
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
            {isPassthrough ? 'Target Bitrate (Passthrough Active)' : 'Target Bitrate (per channel)'}
          </label>
          <div className="relative">
            <select
              value={bitrate}
              onChange={(e) => handleBitrateChange(e.target.value as BitrateOption)}
              disabled={isPassthrough}
              className={`w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-teal-500 appearance-none text-white transition-opacity ${isPassthrough ? 'opacity-50 cursor-not-allowed text-gray-500' : ''}`}
            >
              {BITRATE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {!isPassthrough && <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />}
          </div>
          {isPassthrough && (
            <p className="text-[10px] text-teal-400 mt-1 font-mono">
              * Source is already Opus/Ogg. Stream copy enabled (Lossless).
            </p>
          )}
        </div>

        <button
          onClick={() => onRun({ bitrate: isPassthrough ? null : bitrate })} // Pass null bitrate if passthrough
          disabled={isProcessing}
          className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
        >
          {isProcessing ? 'Processing...' : (isPassthrough ? 'Wrap to Ogg' : 'Convert to Ogg')}
        </button>
      </div>
    </div>
  );
};



// ----------------------------------------------------------------------
// MAIN SWITCHER
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// MAIN SWITCHER
// ----------------------------------------------------------------------

export const ToolView: React.FC<ToolViewProps> = ({ tool }) => {
  const { globalFiles, setGlobalFiles, selectedFileId, setSelectedFileId } = useToolState();
  const {
    state: playerState,
    togglePlayPause,
    stop,
    seek,
    setVolume,
    toggleLoop,
    toggleHeadphones,
    setHrtfProfile,
    setCurrentFile
  } = usePlayback();

  // Navigation Logic (moved from Context to break circularity)
  const currentIndex = globalFiles.findIndex(f => f.id === selectedFileId);
  const canNext = currentIndex >= 0 && currentIndex < globalFiles.length - 1;
  const canPrev = currentIndex > 0;

  const handleNext = () => {
    if (canNext) {
      const nextId = globalFiles[currentIndex + 1].id;
      setSelectedFileId(nextId);
      setCurrentFile(nextId, true);
    }
  };

  const handlePrev = () => {
    if (canPrev) {
      const prevId = globalFiles[currentIndex - 1].id;
      setSelectedFileId(prevId);
      setCurrentFile(prevId, true);
    }
  };
  // Map global MediaFile[] back to File[] for compatibility with existing components
  // We create synthetic File objects that have the properties we need
  const files = React.useMemo(() => globalFiles.map(mf => {
    // Create a dummy File object with the right path/name properties
    // The actual File object data isn't persisted, but path/name are what matters for backend
    const f = new File([], mf.name + mf.extension);
    Object.defineProperty(f, 'path', { value: mf.id }); // ID is the full path
    return f;
  }), [globalFiles]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Refs for scrolling
  const queueRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // RESIZABLE PARTITION STATE
  // Standard tools usually have a large top / small bottom.
  // AmbiRotate prefers a more balanced split.
  const [topHeightPercent, setTopHeightPercent] = useState(tool.id === ToolId.AmbiRotate ? 45 : 70);
  const [isDragging, setIsDragging] = useState(false);

  // Resize Handlers
  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeY = e.clientY - containerRect.top;
    const newPercent = (relativeY / containerRect.height) * 100;
    // Clamp between 10% and 90%
    const clamped = Math.max(10, Math.min(newPercent, 90));
    setTopHeightPercent(clamped);
  }, [isDragging]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (files.length > 0 && queueRef.current) {
      // Short delay to ensure rendering
      setTimeout(() => {
        queueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [files.length]);

  // Auto-scroll to Progress when processing starts
  useEffect(() => {
    if ((isProcessing || statusMsg) && progressRef.current) {
      setTimeout(() => {
        progressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [isProcessing, statusMsg]);

  useEffect(() => {
    const unsubProgress = window.electronAPI.onProgress((data: any) => {
      // PRO: Scope progress to tool
      // If scalar (legacy/AmbiRotate?), assume global or ignore? 
      // All our updated handlers send object { progress, toolId }
      // If we receive a number, it might be from a legacy path or AmbiRotate if it used this.
      // But AmbiRotate uses separate IPC.

      let p = 0;
      if (typeof data === 'number') {
        // Fallback for any missed handler or legacy behavior:
        // If we mistakenly get a number, we can't filter it. 
        // But we updated all. 
        p = data;
      } else if (data && typeof data === 'object') {
        if (data.toolId && data.toolId !== tool.id) return; // Ignore other tools
        p = data.progress;
      }

      console.log(`[ToolView:${tool.id}] Received Progress:`, p);
      setProgress(p);
    });

    // Listen for status updates from backend (e.g. "Processing 1/5: file.wav")
    const unsubStatus = window.electronAPI.on('task-status', (data: any) => {
      // Scope status msg
      let msg = '';
      if (typeof data === 'string') {
        // Fallback
        msg = data;
      } else if (data && typeof data === 'object') {
        if (data.toolId && data.toolId !== tool.id) return;
        msg = data.msg;
      }
      if (msg) {
        setStatusMsg(msg);
        // Also ensure processing state is true if we get a status
        setIsProcessing(true);
      }
    });

    return () => {
      unsubProgress();
      unsubStatus();
    };
  }, [tool.id]);

  // active file selection (linked to global context)
  const activeFileIndex = React.useMemo(() => {
    const idx = globalFiles.findIndex(f => f.id === selectedFileId);
    return idx === -1 ? 0 : idx;
  }, [globalFiles, selectedFileId]);

  const setActiveFileIndex = (index: number) => {
    if (globalFiles[index]) {
      setSelectedFileId(globalFiles[index].id);
    }
  };

  // Sync Current File to Playback Context
  useEffect(() => {
    const file = files[activeFileIndex];
    if (file) {
      // We cast to any because .path is a custom property we defined
      setCurrentFile((file as any).path);
    } else {
      setCurrentFile(null);
    }
  }, [activeFileIndex, files, setCurrentFile]);

  // Auto-selection logic: select first file if none selected
  useEffect(() => {
    if (!selectedFileId && globalFiles.length > 0) {
      setSelectedFileId(globalFiles[0].id);
    }
  }, [globalFiles.length, selectedFileId, setSelectedFileId]);

  // PRO FEATURE: Collapsible Input Section
  const [isInputExpanded, setInputExpanded] = useState(true);

  // Ref for Rotator (to trigger render from footer)
  const rotatorRef = useRef<AmbiRotateHandle>(null);

  // Handlers
  const handleFilesDropped = (newDropFiles: File[]) => {
    const newMediaFiles: MediaFile[] = newDropFiles.map((f: any) => {
      const path = f.path;
      const name = f.name;
      const extension = name.includes('.') ? '.' + name.split('.').pop() : '';

      // Determine file type from extension
      const videoExtensions = ['.mp4', '.mov', '.webm', '.mkv', '.avi', '.m4v', '.aivu'];
      const type = videoExtensions.includes(extension.toLowerCase()) ? FileType.Video : FileType.Audio;

      return {
        id: path,
        name: name.replace(extension, ''),
        extension,
        path,
        type,
        size: 'Pending...',
        containerFormat: 'Unknown',
        duration: '--:--',
        bitRate: '--',
        audio: { codec: 'Unknown', sampleRate: 0, bitDepth: 0, channelCount: 0, ambisonicOrder: 0 },
        loudness: { integrated: 0, range: 0, truePeak: 0 },
        health: { clippingCount: 0, dcOffsetWarning: false, emptyStreamWarning: false },
        spatial: {
          formatPrediction: 'Unknown',
          normalizationPrediction: 'Unknown',
          hasAmbisonicGUID: false,
          hasSA3DAtom: false
        },
        isAnalyzing: false,
        loadedPhases: []
      };
    });

    setGlobalFiles(prev => {
      const existingIds = new Set(prev.map(f => f.id));
      const uniqueNewFiles = newMediaFiles.filter(f => !existingIds.has(f.id));
      return [...prev, ...uniqueNewFiles];
    });
  };

  const handleClearFiles = () => {
    setGlobalFiles([]);
    setSelectedFileId('');
    setStatusMsg(null);
    setActiveFileIndex(0);
  };

  // Helper to sync AmbiRotate selection
  const handleSelectFile = (index: number) => {
    setActiveFileIndex(index);
    // Explicit click handler collapse logic is redundant with the effect below, 
    // but we can keep or remove. The effect is safer.
  };

  // Auto-collapse Input on File Change (Covers Queue Click & Transport Next/Prev)
  useEffect(() => {
    if (tool.id === ToolId.AmbiRotate && files.length > 0) {
      setInputExpanded(false);
    }
  }, [activeFileIndex, tool.id]);

  const { settings } = useSettings();

  const handleRunTask = async (options: any) => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setStatusMsg("Processing...");
    try {
      const filePaths = files.map(f => {
        const p = (f as any).path;
        if (!p) throw new Error(`File ${f.name} has no valid path. Try dropping it again.`);
        return p;
      });

      // Prepare Settings Object for Backend
      const backendSettings = {
        outputDir: settings.outputMode === 'custom' ? settings.customOutputDir : undefined,
        autoCreateFolder: settings.autoCreateFolder
      };

      let result;
      switch (tool.id) {
        case ToolId.Ambix2Ogg:
          // Just like Opus/IAMF but maps to our new handler
          result = await window.electronAPI.convertAmbix2Ogg(filePaths, options.bitrate, backendSettings);
          break;
        case ToolId.Ambix2Opus:
        case ToolId.Ambix2IAMF:
          result = await window.electronAPI.convertBitrate(filePaths, options.bitrate, tool.id === ToolId.Ambix2IAMF ? 'iamf' : 'opus', backendSettings);
          break;
        case ToolId.Ambix2APAC:
          result = await window.electronAPI.convertAmbix2Apac(filePaths, options.bitrate, backendSettings);
          break;
        case ToolId.Ambix2Bin:
          result = await window.electronAPI.convertAmbix2Bin(filePaths, options.hrtfProfile, backendSettings);
          break;
        case ToolId.AmbiSwap:
          result = await window.electronAPI.convertAmbiSwap(filePaths, options.direction, backendSettings);
          break;
        case ToolId.Ambix2CAF:
          result = await window.electronAPI.convertAmbix2Caf(filePaths, options.layout, options.bitDepth, backendSettings);
          break;
        case ToolId.AmbiOrder:
          result = await window.electronAPI.convertAmbiOrder(filePaths, options.targetOrder, backendSettings);
          break;
      }

      if (result && !result.success) {
        throw new Error(result.error || "Unknown backend error");
      }

      setStatusMsg("Success!");
    } catch (err: any) {
      console.error(err);
      setStatusMsg(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Safe file paths mapping for Queue
  const processedFiles = files.map((f, i) => ({
    name: f.name,
    path: (f as any).path || 'Memory File',
    index: i
  }));

  // PERSISTENCE LOGIC FOR AMBIROTATE - REMOVED (Redundant with global state)
  // The infinite loop was caused here by syncing 'files' (a new array ref every render) to 'ambiFiles'.
  // We now pass 'files' directly to AmbiRotateTool.

  // SPECIAL CASE: AmbiTrim handles its own full-screen layout (PRP #54/55)
  if (tool.id === ToolId.AmbiTrim) {
    return <AmbiTrim tool={tool} />;
  }

  // SPECIAL CASE: AmbiData has its own layout (PRP #76)
  if (tool.id === ToolId.AmbiData) {
    return <AmbiDataTool tool={tool} files={files as any[]} isProcessing={isProcessing} />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      <div ref={containerRef} className="flex-1 flex flex-col relative overflow-hidden">
        {/* TOP PARTITION (Input / Queue / Messages) */}
        <div
          style={{ height: `${topHeightPercent}%` }}
          className="w-full flex flex-col overflow-hidden relative bg-[#18181b]"
        >
          <div className="flex-1 overflow-y-auto pt-8 pb-4 flex flex-col relative">
            {/* TOOL HEADER */}
            <div className="px-8 mb-6 flex-none">
              <header>
                <h2 className={`text-3xl font-bold mb-2 ${tool.colorClass}`}>
                  {tool.label}
                </h2>
                <p className="text-gray-400 text-lg font-light">
                  {tool.description}
                </p>
              </header>
            </div>

            {/* INPUT SECTION (Collapsible for AmbiRotate) */}
            <div className="px-8 flex-none flex flex-col gap-4 relative z-10">
              {/* Collapse Header for AmbiRotate */}
              {tool.id === ToolId.AmbiRotate && files.length > 0 && (
                <div
                  onClick={() => setInputExpanded(!isInputExpanded)}
                  className="flex items-center justify-between bg-gray-600/20 p-2 rounded-t-lg cursor-pointer hover:bg-gray-600/40 transition select-none border border-white/10"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {isInputExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <span>Input Files ({files.length})</span>
                  </div>
                  {!isInputExpanded && (
                    <span className="text-xs text-gray-500 font-mono">
                      Active: {files[activeFileIndex]?.name}
                    </span>
                  )}
                </div>
              )}

              {/* The Actual Input Body */}
              <div className={`
                    flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out
                    ${tool.id === ToolId.AmbiRotate && files.length > 0
                  ? (isInputExpanded ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 border-none m-0 p-0')
                  : 'opacity-100'
                }
                    ${tool.id === ToolId.AmbiRotate && files.length > 0 && isInputExpanded ? 'bg-gray-900/30 p-4 rounded-b-lg border border-t-0 border-white/10' : ''}
                `}>
                {/* Drop Zone */}
                <div className={`${files.length > 0 ? 'h-20' : (tool.id === ToolId.AmbiRotate ? 'h-32' : 'h-48')} transition-all duration-300`}>
                  {(() => {
                    // DEFINE TOOL-SPECIFIC CONFIGURATION
                    let allowedExts = ['.wav', '.amb', '.caf', '.opus', '.mp3', '.aac', '.flac', '.ogg'];
                    let labelText: string | undefined = undefined;

                    if (tool.id === ToolId.Ambix2IAMF) {
                      allowedExts = ['.wav'];
                      labelText = ".wav accepted";
                    } else if (tool.id === ToolId.Ambix2APAC) {
                      allowedExts = ['.wav', '.caf'];
                      labelText = ".wav, .caf accepted";
                    } else if (tool.id === ToolId.Ambix2Bin || tool.id === ToolId.AmbiRotate) {
                      allowedExts = ['.wav', '.flac', '.ogg', '.caf'];
                      labelText = ".wav, .flac, .ogg, .caf accepted";
                    } else if (tool.id === ToolId.Ambix2Opus) {
                      allowedExts = ['.wav', '.amb', '.caf', '.flac', '.mp3'];
                      labelText = ".wav, .amb, .caf, .flac, .mp3 accepted";
                    } else if (tool.id === ToolId.Ambix2Ogg) {
                      labelText = ".wav, .amb, .caf, .flac, .mp3, .opus, .ogg accepted";
                    } else if (tool.id === ToolId.Ambix2CAF || tool.id === ToolId.AmbiOrder || tool.id === ToolId.AmbiSwap) {
                      // FFmpeg-based tools (highly flexible)
                      allowedExts = ['.wav', '.amb', '.caf', '.opus', '.mp3', '.aac', '.flac', '.ogg'];
                      labelText = ".wav, .amb, .caf, .opus, .mp3, .aac, .flac, .ogg accepted";
                    }

                    return (
                      <SmartDropZone
                        className="h-full w-full"
                        allowedExtensions={allowedExts}
                        label={labelText}
                        compact={files.length > 0}
                        onFilesLoaded={(loadedFiles) => {
                          const processed = loadedFiles.map(f => {
                            if (typeof f === 'string') {
                              const name = f.split('/').pop() || f;
                              return { name, path: f } as File;
                            }
                            return f;
                          });
                          handleFilesDropped(processed as File[]);
                        }}
                        onDrop={(e) => {
                          if (e.dataTransfer.files) {
                            handleFilesDropped(Array.from(e.dataTransfer.files));
                          }
                        }}
                      />
                    );
                  })()}
                </div>

                {/* Queue */}
                {files.length > 0 && (
                  <div ref={queueRef} className="mt-4">
                    <FileQueue
                      files={processedFiles}
                      selectedId={selectedFileId}
                      onSelect={(id) => {
                        // Handle selection mapping
                        const idx = processedFiles.findIndex(f => f.path === id);
                        if (idx >= 0) handleSelectFile(idx);
                      }}
                      onPlay={(id, shouldPlay) => {
                        const idx = processedFiles.findIndex(f => f.path === id);
                        if (idx >= 0) {
                          handleSelectFile(idx);
                          setCurrentFile(id, shouldPlay ?? true);
                        }
                      }}
                      onClear={handleClearFiles}
                      playingFileId={playerState.currentFile}
                      isPlaying={playerState.isPlaying}
                    />
                  </div>
                )}

                {/* Transport Section */}
                {files.length > 0 && (
                  <Transport
                    state={playerState}
                    onPlayPause={togglePlayPause}
                    onStop={stop}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onSeek={seek}
                    onVolumeChange={setVolume}
                    onToggleLoop={toggleLoop}
                    onToggleHeadphones={toggleHeadphones}
                    onSetHrtfProfile={setHrtfProfile}
                    canNext={canNext}
                    canPrev={canPrev}
                  />
                )}
              </div>
            </div>

            {/* MESSAGES & PROGRESS */}
            {(statusMsg || isProcessing) && (
              <div ref={progressRef} className="px-8 mt-4 flex flex-col gap-2 flex-none">
                {statusMsg && (
                  <div className={`p-3 rounded text-sm font-mono border ${statusMsg.includes("Error") ? "bg-red-900/20 border-red-900/50 text-red-300" : "bg-blue-900/20 border-blue-900/50 text-blue-300"}`}>
                    {statusMsg}
                  </div>
                )}

                {/* PROGRESS BAR */}
                {isProcessing && (
                  <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden border border-gray-700">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${Math.round(progress * 100)}%` }}
                    />
                  </div>
                )}
                {isProcessing && (
                  <div className="text-right text-[10px] text-gray-500 font-mono">
                    {Math.round(progress * 100)}%
                  </div>
                )}
              </div>
            )}

            {/* Spacer for bottom scrolling */}
            <div className="h-8 flex-none"></div>
          </div>
        </div>

        {/* DRAGGABLE DIVIDER */}

        <div
          onMouseDown={handleMouseDown}
          className="h-0 w-full border-t border-studio-border relative z-50 group hover:border-indigo-500/50 transition-colors cursor-row-resize shrink-0"
        >
          {/* Invisible Hit Area */}
          <div className="absolute top-[-6px] bottom-[-6px] left-0 right-0 z-50 cursor-row-resize"></div>
        </div>

        {/* BOTTOM PARTITION (Controls / AmbiRotate Visuals) */}
        <div
          style={{ height: `${100 - topHeightPercent}%` }}
          className="w-full bg-[#18181b] flex flex-col min-h-0 relative"
        >
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">

              {/* AMBIROTATE CONTROLS (Moved Here) */}
              {/* Persist AmbiRotateTool to keep state, just hide it */}
              <div className={`w-full ${tool.id === ToolId.AmbiRotate ? '' : 'hidden'}`}>
                <AmbiRotateTool
                  ref={rotatorRef}
                  tool={tool}
                  files={files}
                  activeIndex={activeFileIndex}
                  onIndexChange={(idx) => {
                    setActiveFileIndex(idx);
                  }}
                  onRun={handleRunTask}
                  isProcessing={isProcessing}
                  isVisible={tool.id === ToolId.AmbiRotate}
                />
              </div>

              {tool.id === ToolId.Ambix2Ogg && <Ambix2OggTool tool={tool} files={files} onRun={handleRunTask} isProcessing={isProcessing} />}
              {tool.id === ToolId.Ambix2Opus && <BitrateConverter tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
              {tool.id === ToolId.Ambix2IAMF && <BitrateConverter tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
              {tool.id === ToolId.Ambix2APAC && <Ambix2ApacTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
              {tool.id === ToolId.Ambix2Bin && <Ambix2BinTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
              {tool.id === ToolId.AmbiOrder && <AmbiOrderTool tool={tool} files={files} onRun={handleRunTask} isProcessing={isProcessing} />}
              {tool.id === ToolId.AmbiSwap && <AmbiSwapTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
              {tool.id === ToolId.Ambix2CAF && <Ambix2CafTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}

              {/* AMBIROTATE ACTION BUTTON */}
              {tool.id === ToolId.AmbiRotate && (
                <button
                  onClick={async () => {
                    if (!rotatorRef.current) return;
                    setIsProcessing(true);
                    try {
                      setStatusMsg("Processing Rotation...");
                      await rotatorRef.current.handleRender();
                      setStatusMsg("Success!");
                    } catch (err: any) {
                      console.error("Rotation UI Error:", err);
                      setStatusMsg(`Error: ${err.message}`);
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  disabled={isProcessing || files.length === 0}
                  className={`
                            w-full px-8 py-3 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 transition-all
                            ${isProcessing || files.length === 0
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-500 text-white hover:scale-[1.02] active:scale-95 shadow-red-900/50'
                    }
                        `}
                >
                  {isProcessing ? (
                    <>Rendering...</>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Render Rotated File(s)
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
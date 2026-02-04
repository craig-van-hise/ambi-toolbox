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
  ArrowLeftRight,
  ChevronDown,
  ChevronRight,
  ChevronUp
} from 'lucide-react';

interface ToolViewProps {
  tool: ToolDefinition;
}

// ----------------------------------------------------------------------
// SHARED COMPONENTS
// ----------------------------------------------------------------------

const SectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">{title}</h3>
);

// ----------------------------------------------------------------------
// TOOL SPECIFIC IMPLEMENTATIONS
// ----------------------------------------------------------------------

const BitrateConverter: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
  const [bitrate, setBitrate] = useState<BitrateOption>(BitrateOption.High);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-4">
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Target Bitrate</label>
          <div className="relative">
            <select
              value={bitrate}
              onChange={(e) => setBitrate(e.target.value as BitrateOption)}
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

const Ambix2BinTool: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
  const [profile, setProfile] = useState<HrtfProfile>(HrtfProfile.Neumann);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-4">
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">HRTF Profile</label>
          <div className="relative">
            <select
              value={profile}
              onChange={(e) => setProfile(e.target.value as HrtfProfile)}
              className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2 text-sm focus:outline-none focus:border-green-500 appearance-none text-white"
            >
              <option value={HrtfProfile.Neumann}>{HrtfProfile.Neumann}</option>
              <option value={HrtfProfile.Kemar}>{HrtfProfile.Kemar}</option>
              <option value={HrtfProfile.Custom}>{HrtfProfile.Custom}</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={() => onRun({ hrtfProfile: profile })}
          disabled={isProcessing}
          className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
        >
          {isProcessing ? 'Converting...' : 'Convert'}
        </button>
      </div>
    </div>
  );
};

const AmbiOrderTool: React.FC<{ tool: ToolDefinition, files: File[], onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, files, onRun, isProcessing }) => {
  const [targetOrder, setTargetOrder] = useState<string>(AmbisonicOrder.Second);
  const [detectedOrder, setDetectedOrder] = useState<string>('Unknown');
  const [detectedChannels, setDetectedChannels] = useState<number>(0);

  React.useEffect(() => {
    if (files.length > 0) {
      const path = (files[0] as any).path;
      window.electron.inspectFile(path).then((result) => {
        if (result.success && result.data) {
          const ch = result.data.channels;
          setDetectedChannels(ch);
          if (ch === 4) setDetectedOrder(AmbisonicOrder.First);
          else if (ch === 9) setDetectedOrder(AmbisonicOrder.Second);
          else if (ch === 16) setDetectedOrder(AmbisonicOrder.Third);
          else if (ch === 25) setDetectedOrder(AmbisonicOrder.Fourth);
          else if (ch === 36) setDetectedOrder('5th');
          else if (ch === 49) setDetectedOrder('6th');
          else setDetectedOrder('Custom/Unknown');
        }
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
            onChange={(e) => setTargetOrder(e.target.value)}
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
  const [inputFormat, setInputFormat] = useState<AmbiFormat>(AmbiFormat.AmbiX);

  const isAmbixInput = inputFormat === AmbiFormat.AmbiX;

  return (

    <div className="w-full flex flex-col gap-4">
      {/* Format Toggle */}
      <div className="flex bg-[#1E1E1E] rounded-md border border-studio-border p-1 w-full justify-center">
        <button
          onClick={() => setInputFormat(AmbiFormat.AmbiX)}
          className={`flex-1 px-3 py-1.5 rounded text-xs font-bold transition-all ${isAmbixInput ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
        >
          AmbiX
        </button>
        <button
          onClick={() => setInputFormat(AmbiFormat.FuMa)}
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
  const [layout, setLayout] = useState('discrete');
  const [bitDepth, setBitDepth] = useState('24');


  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Layout Tag</label>
        <div className="relative">
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
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
            onChange={(e) => setBitDepth(e.target.value)}
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

const GenericTool: React.FC<{ tool: ToolDefinition }> = ({ tool }) => (
  <div className="max-w-xl">
    <div className="bg-[#252526] p-6 rounded-lg border border-studio-border text-center py-12">
      <ArrowLeftRight className="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <h3 className="text-white font-medium mb-2">Standard Converter</h3>
      <p className="text-gray-500 text-sm mb-6">Convert your files to {tool.label} format using standard settings.</p>
      <button className={`w-full py-3 rounded font-medium text-white transition-colors ${tool.btnColorClass}`}>
        Convert
      </button>
    </div>
  </div>
);

// ----------------------------------------------------------------------
// MAIN SWITCHER
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// MAIN SWITCHER
// ----------------------------------------------------------------------

export const ToolView: React.FC<ToolViewProps> = ({ tool }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // standard "active file" selection (lifted for AmbiRotate)
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  // PRO FEATURE: Collapsible Input Section
  const [isInputExpanded, setInputExpanded] = useState(true);

  // Ref for Rotator (to trigger render from footer)
  const rotatorRef = useRef<AmbiRotateHandle>(null);

  // Handlers
  const handleFilesDropped = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleClearFiles = () => {
    setFiles([]);
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

      let result;
      switch (tool.id) {
        case ToolId.Ambix2Opus:
        case ToolId.Ambix2IAMF:
          result = await window.electronAPI.convertBitrate(filePaths, options.bitrate, tool.id === ToolId.Ambix2IAMF ? 'iamf' : 'opus');
          break;
        case ToolId.Ambix2Bin:
          result = await window.electronAPI.convertAmbix2Bin(filePaths, options.hrtfProfile);
          break;
        case ToolId.AmbiSwap:
          result = await window.electronAPI.convertAmbiSwap(filePaths, options.direction);
          break;
        case ToolId.Ambix2CAF:
          result = await window.electronAPI.convertAmbix2Caf(filePaths, options.layout, options.bitDepth);
          break;
        case ToolId.AmbiOrder:
          result = await window.electronAPI.convertAmbiOrder(filePaths, options.targetOrder);
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

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* 1. MIDDLE SECTION (Flexible) */}
      <div className="flex-1 min-h-0 overflow-y-auto pt-8 pb-4 flex flex-col relative">

        {/* TOOL HEADER */}
        <div className="px-8 mb-6">
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
            <div className={`${tool.id === ToolId.AmbiRotate ? 'h-32' : 'h-48'} transition-all`}>
              <SmartDropZone
                className="h-full w-full"
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
            </div>

            {/* Queue */}
            {files.length > 0 && (
              <div className="max-h-48 overflow-y-auto bg-[#1E1E1E] rounded-lg border border-studio-border flex flex-col shadow-lg p-2">
                <div className="flex justify-between items-center mb-2 px-2 pt-1 flex-none">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Queue</h3>
                  <button onClick={handleClearFiles} className="text-[10px] text-red-500 hover:text-red-400">CLEAR</button>
                </div>
                <div className="flex-1 overflow-y-auto px-1 custom-scrollbar space-y-1">
                  {processedFiles.map((f, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectFile(i)}
                      className={`
                                  flex items-center justify-between text-xs py-1.5 px-2 rounded cursor-pointer transition-colors
                                  ${i === activeFileIndex && tool.id === ToolId.AmbiRotate ? 'bg-blue-900/40 text-blue-200 border border-blue-800/50' : 'hover:bg-gray-800 text-gray-400'}
                              `}
                    >
                      <span className="truncate font-mono">{f.name}</span>
                      <span className="text-[10px] opacity-50">{f.path.includes('/') ? 'Local' : 'Mem'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MESSAGES */}
        {statusMsg && (
          <div className="px-8 mt-4">
            <div className={`p-3 rounded text-sm font-mono border ${statusMsg.includes("Error") ? "bg-red-900/20 border-red-900/50 text-red-300" : "bg-blue-900/20 border-blue-900/50 text-blue-300"}`}>
              {statusMsg}
            </div>
          </div>
        )}

        {/* 2. AMBIROTATE MAIN AREA (If active) */}
        {/* 2. AMBIROTATE MAIN AREA (Persisted) */}
        {files.length > 0 && (
          <div className={`flex-1 min-h-0 p-8 flex flex-col ${tool.id === ToolId.AmbiRotate ? '' : 'hidden'}`}>
            <AmbiRotateTool
              ref={rotatorRef}
              files={files}
              activeIndex={activeFileIndex}
              onIndexChange={setActiveFileIndex}
              onRun={handleRunTask}
              isProcessing={isProcessing}
              isVisible={tool.id === ToolId.AmbiRotate}
            />
          </div>
        )}

      </div>

      {/* 3. ACTION BAR (Bottom Fixed) */}
      <div className="flex-none border-t border-studio-border bg-[#18181b] p-6 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto">
          {tool.id === ToolId.Ambix2Opus && <BitrateConverter tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
          {tool.id === ToolId.Ambix2IAMF && <BitrateConverter tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
          {tool.id === ToolId.Ambix2Bin && <Ambix2BinTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
          {tool.id === ToolId.AmbiOrder && <AmbiOrderTool tool={tool} files={files} onRun={handleRunTask} isProcessing={isProcessing} />}
          {tool.id === ToolId.AmbiSwap && <AmbiSwapTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
          {tool.id === ToolId.Ambix2CAF && <Ambix2CafTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}

          {/* AMBIROTATE ACTION BUTTON (Moved here) */}
          {tool.id === ToolId.AmbiRotate && files.length > 0 && (
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
              disabled={isProcessing}
              className={`
                        w-full px-8 py-3 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 transition-all
                        ${isProcessing
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
  );
};
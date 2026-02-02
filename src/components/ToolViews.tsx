import React, { useState } from 'react';
import {
  ToolId,
  ToolDefinition,
  BitrateOption,
  AmbisonicOrder,
  AmbiFormat,
  HrtfProfile
} from '../types';
import { BITRATE_OPTIONS } from '../constants';
import { DropZone } from './DropZone';
import { AmbiRotateTool } from '../tools/AmbiRotate';
import {
  ArrowRight,
  ArrowLeftRight,
  ChevronDown
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
    <div className="max-w-xl">
      <div className="bg-[#252526] p-6 rounded-lg border border-studio-border">
        <SectionHeader title="Encoder Settings" />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Target Bitrate</label>
          <div className="relative">
            <select
              value={bitrate}
              onChange={(e) => setBitrate(e.target.value as BitrateOption)}
              className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 appearance-none text-white"
            >
              {BITRATE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={() => onRun({ bitrate })}
          disabled={isProcessing}
          className={`w-full py-3 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
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
    <div className="max-w-xl">
      <div className="bg-[#252526] p-6 rounded-lg border border-studio-border">
        <SectionHeader title="Binaural Decoder Settings" />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select HRTF/SOFA Profile</label>
          <div className="relative">
            <select
              value={profile}
              onChange={(e) => setProfile(e.target.value as HrtfProfile)}
              className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 appearance-none text-white"
            >
              <option value={HrtfProfile.Neumann}>{HrtfProfile.Neumann}</option>
              <option value={HrtfProfile.Kemar}>{HrtfProfile.Kemar}</option>
              <option value={HrtfProfile.Custom}>{HrtfProfile.Custom}</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={() => onRun({ hrtfProfile: profile })}
          disabled={isProcessing}
          className={`w-full py-3 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
        >
          {isProcessing ? 'Converting...' : 'Convert to Binaural WAV'}
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
    // Very simple filter: target should be less than detected? 
    // Or just show all descending.
    // If detected is 2nd (9ch), showing 3rd doesn't make sense for reduction.
    // But for now let's just show options <= detected or all if unknown.
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
    <div className="max-w-xl">
      <div className="bg-[#252526] p-6 rounded-lg border border-studio-border">
        <SectionHeader title="Order Reduction" />

        {/* Detection Display */}
        <div className={`mb-6 p-4 border rounded flex items-center justify-between ${detectedOrder !== 'Unknown' && detectedOrder !== 'None' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-[#1E1E1E] border-studio-border'}`}>
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Detected Input</span>
            {detectedChannels > 0 && <span className="text-[10px] text-gray-500">{detectedChannels} channels</span>}
          </div>
          <span className="text-white font-bold text-lg">{detectedOrder}</span>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Target Output Order</label>
          <div className="relative">
            <select
              value={targetOrder}
              onChange={(e) => setTargetOrder(e.target.value)}
              className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 appearance-none text-white"
            >
              {options.length > 0 ? options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              )) : <option disabled>No lower orders available</option>}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={() => onRun({ targetOrder })}
          disabled={isProcessing || options.length === 0}
          className={`w-full py-3 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
        >
          {isProcessing ? 'Reducing...' : 'Reduce Order'}
        </button>
      </div>
    </div>
  );
};

const AmbiSwapTool: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
  const [inputFormat, setInputFormat] = useState<AmbiFormat>(AmbiFormat.AmbiX);

  const isAmbixInput = inputFormat === AmbiFormat.AmbiX;

  return (
    <div className="max-w-xl">
      <div className="bg-[#252526] p-6 rounded-lg border border-studio-border">
        <SectionHeader title="Format Exchange" />

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-4">Input Format Source</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setInputFormat(AmbiFormat.AmbiX)}
              className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${isAmbixInput ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-[#1E1E1E] border-studio-border text-gray-400'
                }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isAmbixInput ? 'border-orange-500' : 'border-gray-500'}`}>
                {isAmbixInput && <div className="w-2 h-2 rounded-full bg-orange-500" />}
              </div>
              <span className="text-sm font-medium">AmbiX</span>
              <span className="text-xs opacity-60">ACN / SN3D</span>
            </button>

            <button
              onClick={() => setInputFormat(AmbiFormat.FuMa)}
              className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${!isAmbixInput ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-[#1E1E1E] border-studio-border text-gray-400'
                }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${!isAmbixInput ? 'border-orange-500' : 'border-gray-500'}`}>
                {!isAmbixInput && <div className="w-2 h-2 rounded-full bg-orange-500" />}
              </div>
              <span className="text-sm font-medium">FuMa</span>
              <span className="text-xs opacity-60">Furse-Malham</span>
            </button>
          </div>
        </div>

        {/* Visual Flow */}
        <div className="flex items-center justify-between bg-[#1E1E1E] p-4 rounded mb-6 border border-studio-border">
          <span className={`text-sm font-bold ${isAmbixInput ? 'text-orange-500' : 'text-gray-500'}`}>
            {isAmbixInput ? 'AmbiX' : 'FuMa'}
          </span>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Converting To</span>
            <ArrowRight className="text-gray-400" />
          </div>
          <span className={`text-sm font-bold ${!isAmbixInput ? 'text-orange-500' : 'text-gray-500'}`}>
            {isAmbixInput ? 'FuMa' : 'AmbiX'}
          </span>
        </div>

        <button
          onClick={() => onRun({ direction: isAmbixInput ? 'AmbixToFuMa' : 'FuMaToAmbix' })}
          disabled={isProcessing}
          className={`w-full py-3 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
        >
          {isProcessing ? 'Swapping...' : 'Swap Format'}
        </button>
      </div>
    </div>
  );
};



const Ambix2CafTool: React.FC<{ tool: ToolDefinition, onRun: (opts: any) => void, isProcessing: boolean }> = ({ tool, onRun, isProcessing }) => {
  const [layout, setLayout] = useState('discrete');
  const [bitDepth, setBitDepth] = useState('24');

  return (
    <div className="max-w-xl">
      <div className="bg-[#252526] p-6 rounded-lg border border-studio-border">
        <SectionHeader title="CAF Encoder Settings" />

        {/* Layout Tag */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Spatial Layout Tag</label>
          <div className="relative">
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-gray-500 appearance-none text-white"
            >
              <option value="discrete">Discrete (Recommended)</option>
              <option value="hoa">HOA ACN SN3D (Modern)</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {layout === 'discrete'
              ? "Safest. Labels as 16 channels, no specific order."
              : "For recent Apple workflows only."}
          </p>
        </div>

        {/* Bit Depth */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">Bit Depth</label>
          <div className="relative">
            <select
              value={bitDepth}
              onChange={(e) => setBitDepth(e.target.value)}
              className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-gray-500 appearance-none text-white"
            >
              <option value="24">24-bit Integer (Standard)</option>
              <option value="32">32-bit Float (Processing)</option>
              <option value="16">16-bit Integer (Space Saving)</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={() => onRun({ layout, bitDepth })}
          disabled={isProcessing}
          className={`w-full py-3 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
        >
          {isProcessing ? 'Converting...' : 'Convert to CAF'}
        </button>
      </div>
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
  const [statusMsg, setStatusMsg] = useState('');

  const handleFilesDropped = (droppedFiles: File[]) => {
    setFiles((prev) => [...prev, ...droppedFiles]);
    setStatusMsg(`Ready to process ${droppedFiles.length} new files.`);
  };

  const handleClearFiles = () => {
    setFiles([]);
    setStatusMsg('');
  };

  const handleRunTask = async (options: any) => {
    if (files.length === 0) {
      setStatusMsg("No files to process!");
      return;
    }

    setIsProcessing(true);
    setStatusMsg("Starting batch...");

    // Process sequentially for now (or parallel depending on backend capability)
    // We pass the list of file paths to the backend
    const filePaths = files.map(f => (f as any).path) // Electron File object has path

    try {
      // Flatten simple "one task per file" logic or "one batch task"
      // Let's iterate here and call runTask for each, for simplicity and progress tracking
      for (let i = 0; i < filePaths.length; i++) {
        setStatusMsg(`Processing ${i + 1}/${filePaths.length}: ${files[i].name}...`);
        const result = await window.electron.runTask(tool.id, {
          inputPath: filePaths[i],
          ...options // Tool specific options
        });

        if (!result.success) {
          console.error(`Error processing ${files[i].name}:`, result.error);
          setStatusMsg(`Error: ${result.error}`);
          return;
        }
      }
      setStatusMsg("Batch Complete!");
    } catch (e: any) {
      setStatusMsg(`Critical Error: ${e.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="mb-8 border-b border-studio-border pb-6">
        <h2 className={`text-3xl font-bold mb-2 ${tool.colorClass}`}>
          {tool.label}
        </h2>
        <p className="text-gray-400 text-lg font-light">
          {tool.description}
        </p>
      </header>

      <div className="mb-10">
        <DropZone onFilesDropped={handleFilesDropped} />

        {/* File List / Status Area */}
        {files.length > 0 && (
          <div className="mt-4 bg-[#1E1E1E] rounded p-4 border border-studio-border max-h-40 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-400">{files.length} Files Queued</span>
              <button onClick={handleClearFiles} className="text-xs text-red-400 hover:text-red-300">Clear</button>
            </div>
            <ul className="space-y-1">
              {files.map((f, i) => (
                <li key={i} className="text-xs text-gray-300 truncate font-mono">{f.name}</li>
              ))}
            </ul>
          </div>
        )}

        {statusMsg && (
          <div className={`mt-4 p-3 rounded text-sm font-mono ${statusMsg.includes("Error") ? "bg-red-900/50 text-red-200" : "bg-blue-900/50 text-blue-200"}`}>
            {statusMsg}
          </div>
        )}
      </div>

      <div className="flex-1 pb-10">
        {tool.id === ToolId.Ambix2Opus && <BitrateConverter tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
        {tool.id === ToolId.Ambix2IAMF && <BitrateConverter tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
        {tool.id === ToolId.Ambix2Bin && <Ambix2BinTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
        {tool.id === ToolId.AmbiOrder && <AmbiOrderTool tool={tool} files={files} onRun={handleRunTask} isProcessing={isProcessing} />}
        {tool.id === ToolId.AmbiSwap && <AmbiSwapTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
        {tool.id === ToolId.AmbiRotate && <AmbiRotateTool tool={tool} files={files} onRun={handleRunTask} isProcessing={isProcessing} />}
        {tool.id === ToolId.Ambix2CAF && <Ambix2CafTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />}
      </div>
    </div>
  );
};
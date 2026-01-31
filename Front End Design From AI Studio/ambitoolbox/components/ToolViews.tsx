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
import { 
  Play, 
  Pause, 
  Square, 
  RotateCw, 
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

const BitrateConverter: React.FC<{ tool: ToolDefinition }> = ({ tool }) => {
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

        <button className={`w-full py-3 rounded font-medium text-white transition-colors ${tool.btnColorClass}`}>
          Convert
        </button>
      </div>
    </div>
  );
};

const Ambix2BinTool: React.FC<{ tool: ToolDefinition }> = ({ tool }) => {
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

        <button className={`w-full py-3 rounded font-medium text-white transition-colors ${tool.btnColorClass}`}>
          Convert to Binaural WAV
        </button>
      </div>
    </div>
  );
};

const AmbiOrderTool: React.FC<{ tool: ToolDefinition }> = ({ tool }) => {
  const [targetOrder, setTargetOrder] = useState<string>(AmbisonicOrder.Second);

  return (
    <div className="max-w-xl">
      <div className="bg-[#252526] p-6 rounded-lg border border-studio-border">
        <SectionHeader title="Order Reduction" />
        
        {/* Detection Display */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded flex items-center justify-between">
            <span className="text-blue-200 text-sm font-medium">Detected Input</span>
            <span className="text-white font-bold">{AmbisonicOrder.Third}</span>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Target Output Order</label>
          <div className="relative">
            <select
              value={targetOrder}
              onChange={(e) => setTargetOrder(e.target.value)}
              className="w-full bg-[#1E1E1E] border border-studio-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 appearance-none text-white"
            >
              <option value={AmbisonicOrder.Second}>{AmbisonicOrder.Second}</option>
              <option value={AmbisonicOrder.First}>{AmbisonicOrder.First}</option>
              <option value={AmbisonicOrder.Zero}>{AmbisonicOrder.Zero}</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button className={`w-full py-3 rounded font-medium text-white transition-colors ${tool.btnColorClass}`}>
          Reduce Order
        </button>
      </div>
    </div>
  );
};

const AmbiSwapTool: React.FC<{ tool: ToolDefinition }> = ({ tool }) => {
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
              className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                isAmbixInput ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-[#1E1E1E] border-studio-border text-gray-400'
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
              className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                !isAmbixInput ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-[#1E1E1E] border-studio-border text-gray-400'
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

        <button className={`w-full py-3 rounded font-medium text-white transition-colors ${tool.btnColorClass}`}>
          Swap Format
        </button>
      </div>
    </div>
  );
};

const AmbiRotateTool: React.FC<{ tool: ToolDefinition }> = ({ tool }) => {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);

  const SliderControl = ({ label, value, min, max, onChange, color }: any) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">{label}</label>
        <span className="text-xs font-mono text-white bg-[#1E1E1E] px-2 py-0.5 rounded border border-studio-border">
            {value > 0 ? '+' : ''}{value}°
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-[#1E1E1E] rounded-lg appearance-none cursor-pointer accent-red-500"
      />
      <div className="flex justify-between mt-1 text-[10px] text-gray-600 font-mono">
        <span>{min}°</span>
        <span>0°</span>
        <span>+{max}°</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-xl">
            <div className="bg-[#252526] p-6 rounded-lg border border-studio-border mb-6">
                <div className="flex items-center justify-between mb-6">
                    <SectionHeader title="Rotation Parameters" />
                    <button 
                        onClick={() => { setYaw(0); setPitch(0); setRoll(0); }}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                        <RotateCw className="w-3 h-3" /> Reset
                    </button>
                </div>
                
                <SliderControl label="Yaw (Z-Axis)" value={yaw} min={-180} max={180} onChange={setYaw} />
                <SliderControl label="Pitch (Y-Axis)" value={pitch} min={-90} max={90} onChange={setPitch} />
                <SliderControl label="Roll (X-Axis)" value={roll} min={-180} max={180} onChange={setRoll} />
            </div>

            <button className={`w-full py-3 rounded font-medium text-white transition-colors shadow-lg ${tool.btnColorClass}`}>
                Render Rotated File
            </button>
        </div>
      </div>

      {/* Sticky Transport Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#252526] border-t border-red-500/30 p-4 shadow-2xl">
        <div className="flex items-center gap-4 max-w-2xl">
            <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-white/10 text-white"><Square className="w-4 h-4 fill-current" /></button>
                <button className="p-3 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg"><Play className="w-5 h-5 fill-current ml-0.5" /></button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
                 <div className="flex justify-between text-[10px] text-gray-400 font-mono mb-1">
                    <span>00:00.000</span>
                    <span>00:15.000</span>
                </div>
                <div className="h-1.5 bg-[#1E1E1E] rounded-full overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-600 opacity-50"></div>
                    <div className="absolute left-1/3 w-1 h-full bg-white shadow-[0_0_10px_white]"></div>
                </div>
            </div>

            <div className="text-xs font-bold text-red-500 uppercase tracking-wider">
                Preview Active
            </div>
        </div>
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
)

// ----------------------------------------------------------------------
// MAIN SWITCHER
// ----------------------------------------------------------------------

export const ToolView: React.FC<ToolViewProps> = ({ tool }) => {
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
        <DropZone />
      </div>

      <div className="flex-1">
        {tool.id === ToolId.Ambix2Opus && <BitrateConverter tool={tool} />}
        {tool.id === ToolId.Ambix2IAMF && <BitrateConverter tool={tool} />}
        {tool.id === ToolId.Ambix2Bin && <Ambix2BinTool tool={tool} />}
        {tool.id === ToolId.AmbiOrder && <AmbiOrderTool tool={tool} />}
        {tool.id === ToolId.AmbiSwap && <AmbiSwapTool tool={tool} />}
        {tool.id === ToolId.AmbiRotate && <AmbiRotateTool tool={tool} />}
        {tool.id === ToolId.Ambix2CAF && <GenericTool tool={tool} />}
      </div>
    </div>
  );
};
import React from 'react';
import { ToolId } from '../types';
import { TOOLS } from '../constants';
import { Boxes, AudioWaveform, Layers, Repeat, Compass, Headphones, Clapperboard } from 'lucide-react';

interface SidebarProps {
  activeTool: ToolId;
  onSelectTool: (id: ToolId) => void;
}

const getIcon = (id: ToolId) => {
  switch (id) {
    case ToolId.Ambix2Opus: return <AudioWaveform className="w-5 h-5" />;
    case ToolId.Ambix2CAF: return <Boxes className="w-5 h-5" />;
    case ToolId.AmbiOrder: return <Layers className="w-5 h-5" />;
    case ToolId.AmbiSwap: return <Repeat className="w-5 h-5" />;
    case ToolId.AmbiRotate: return <Compass className="w-5 h-5" />;
    case ToolId.Ambix2Bin: return <Headphones className="w-5 h-5" />;
    case ToolId.Ambix2IAMF: return <Clapperboard className="w-5 h-5" />;
    default: return <Boxes className="w-5 h-5" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ activeTool, onSelectTool }) => {
  return (
    <aside className="w-64 bg-studio-panel border-r border-studio-border flex flex-col h-screen select-none">
      {/* Header */}
      <div className="p-4 border-b border-studio-border">
        <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
          AmbiToolbox
        </h1>
        <p className="text-xs text-gray-500 mt-1">Spatial Audio Suite v1.0</p>
      </div>

      {/* Tool List */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-md text-left transition-all
                ${isActive 
                  ? 'bg-[#37373D] text-white shadow-sm' 
                  : 'text-gray-400 hover:bg-[#2D2D2E] hover:text-gray-200'
                }
              `}
            >
              <span className={`${tool.colorClass} ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {getIcon(tool.id)}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{tool.label}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
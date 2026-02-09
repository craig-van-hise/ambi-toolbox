import React, { useState } from 'react';
import { ToolId } from '../types';
import { TOOLS } from '../constants';
import { Boxes, AudioWaveform, Layers, Repeat, Compass, Headphones, Clapperboard, Settings, Scissors } from 'lucide-react';
import { SettingsModal } from './SettingsModal';

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
    case ToolId.AmbiTrim: return <Scissors className="w-5 h-5" />;
    default: return <Boxes className="w-5 h-5" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ activeTool, onSelectTool }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <aside className="w-64 bg-studio-panel border-r border-studio-border flex flex-col h-screen select-none">
        {/* Header */}
        <div className="p-4 border-b border-studio-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[linear-gradient(135deg,#2563eb,#7c3aed,#db2777,#ea580c,#eab308)] rounded-lg flex items-center justify-center shadow-md">
                <svg viewBox="0 0 200 200" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="100" cy="100" r="90" />
                  <circle cx="100" cy="55" r="45" />
                  <circle cx="100" cy="145" r="45" />
                  <circle cx="55" cy="100" r="45" />
                  <circle cx="145" cy="100" r="45" />
                </svg>
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                AmbiToolbox
              </h1>
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Ambisonics Audio Suite v1.0</p>
        </div>

        {/* ... existing util list ... */}
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

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
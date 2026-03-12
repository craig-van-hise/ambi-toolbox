import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ToolView } from './components/ToolViews';
import { RightSidebar } from './components/RightSidebar';
import { ToolId } from './types';
import { TOOLS } from './constants';

import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { ToolStateProvider } from './contexts/ToolStateContext';
import { AudioEngineProvider } from './contexts/AudioEngineContext';
import { TransportProvider } from './contexts/TransportContext';

const AppContent: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [activeToolId, setActiveToolId] = useState<ToolId>((settings.lastActiveTool as ToolId) || ToolId.Ambix2Bin);

  const DEFAULT_SIDEBAR_WIDTH = 220;
  const [leftWidth, setLeftWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [rightWidth, setRightWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [isDragging, setIsDragging] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging === 'left') {
        setLeftWidth(Math.max(150, Math.min(e.clientX, 400)));
      } else if (isDragging === 'right') {
        setRightWidth(Math.max(200, Math.min(window.innerWidth - e.clientX, 600)));
      }
    };
    const handleMouseUp = () => setIsDragging(null);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleSelectTool = (id: ToolId) => {
    setActiveToolId(id);
    updateSettings({ lastActiveTool: id });
  };

  const activeTool = TOOLS.find((t) => t.id === activeToolId) || TOOLS[0];

  return (
    <div
      className="grid h-screen w-screen bg-studio-bg text-studio-text overflow-hidden font-sans antialiased relative"
      style={{ gridTemplateColumns: `${leftWidth}px minmax(250px, 1fr) ${isRightOpen ? rightWidth + 'px' : '0px'}` }}
    >
      {/* Left Drag Handle */}
      <div
        className="w-2 cursor-col-resize z-50 absolute h-full top-0 -ml-1 hover:bg-white/10 transition-colors"
        style={{ left: leftWidth }}
        onMouseDown={() => setIsDragging('left')}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTool={activeToolId}
        onSelectTool={handleSelectTool}
      />

      {/* Main Content Area */}
      <main className="h-screen overflow-hidden flex flex-col relative border-l border-white">
        {/* Drawer Toggle Button */}
        <button
          onClick={() => setIsRightOpen(!isRightOpen)}
          className="absolute top-4 right-4 z-50 p-1.5 bg-[#1E1E1E] border border-gray-700 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors shadow-lg"
          title="Toggle File Queue"
        >
          {isRightOpen ? "▶" : "◀"}
        </button>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="flex-1 z-10 h-full flex flex-col">
          <ToolView tool={activeTool} />
        </div>
      </main>

      {/* Right Drag Handle */}
      {isRightOpen && (
        <div
          className="w-2 cursor-col-resize z-50 absolute h-full top-0 right-0 -mr-1 hover:bg-white/10 transition-colors"
          style={{ right: rightWidth }}
          onMouseDown={() => setIsDragging('right')}
        />
      )}

      {/* Right Sidebar */}
      <div className={`overflow-hidden transition-all duration-300 ${isRightOpen ? 'w-full' : 'w-0'}`}>
        <RightSidebar tool={activeTool} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <ToolStateProvider>
        <AudioEngineProvider>
          <TransportProvider>
            <AppContent />
          </TransportProvider>
        </AudioEngineProvider>
      </ToolStateProvider>
    </SettingsProvider>
  );
};

export default App;
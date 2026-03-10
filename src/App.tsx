import React, { useState } from 'react';
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

  const handleSelectTool = (id: ToolId) => {
    setActiveToolId(id);
    updateSettings({ lastActiveTool: id });
  };

  const activeTool = TOOLS.find((t) => t.id === activeToolId) || TOOLS[0];

  return (
    <div className="grid grid-cols-[250px_minmax(250px,1fr)_300px] h-screen w-screen bg-studio-bg text-studio-text overflow-hidden font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTool={activeToolId}
        onSelectTool={handleSelectTool}
      />

      {/* Main Content Area */}
      <main className="h-screen overflow-hidden flex flex-col relative border-l border-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="flex-1 z-10 h-full flex flex-col">
          <ToolView tool={activeTool} />
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar tool={activeTool} />
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
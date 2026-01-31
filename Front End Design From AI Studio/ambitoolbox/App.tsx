import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ToolView } from './components/ToolViews';
import { ToolId } from './types';
import { TOOLS } from './constants';

const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<ToolId>(ToolId.Ambix2Bin);

  const activeTool = TOOLS.find((t) => t.id === activeToolId) || TOOLS[0];

  return (
    <div className="flex h-screen bg-studio-bg text-studio-text overflow-hidden font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTool={activeToolId} 
        onSelectTool={setActiveToolId} 
      />

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-hidden flex flex-col relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="flex-1 overflow-y-auto p-8 z-10">
          <ToolView tool={activeTool} />
        </div>
      </main>
    </div>
  );
};

export default App;
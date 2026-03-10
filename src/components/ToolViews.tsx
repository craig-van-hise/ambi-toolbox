import React, { useState, useRef, useEffect } from 'react';
import {
  ToolId,
  ToolDefinition,
} from '../types';

// Contexts & Hooks
import { useSettings } from '../contexts/SettingsContext';
import { useTransport } from '../contexts/TransportContext';
import { useAudioEngine } from '../contexts/AudioEngineContext';
import { useFileQueue } from '../hooks/useFileQueue';

// Components
import { Transport } from './Transport';

// Tool Components
import { AmbiLevelTool } from '../components/tools/AmbiLevel';
import { Ambix2BW64Tool } from '../components/tools/Ambix2BW64';
import { AmbiDataTool, AmbiDataHandle } from '../tools/AmbiData';
import { AmbiTrim } from '../components/tools/AmbiTrim';
import { AmbiRotateTool, AmbiRotateHandle } from '../tools/AmbiRotate';

// Modularized Tool Views
import { BitrateConverterView } from './tools/BitrateConverterView';
import { Ambix2ApacView } from './tools/Ambix2ApacView';
import { Ambix2BinView } from './tools/Ambix2BinView';
import { AmbiOrderView } from './tools/AmbiOrderView';
import { AmbiSwapView } from './tools/AmbiSwapView';
import { Ambix2CafView } from './tools/Ambix2CafView';
import { Ambix2OggView } from './tools/Ambix2OggView';
import { Stereo2AmbixView } from './tools/Stereo2AmbixView';

interface ToolViewProps {
  tool: ToolDefinition;
}

export const ToolView: React.FC<ToolViewProps> = ({ tool }) => {
  const { settings } = useSettings();
  const { setCurrentFile } = useTransport();

  // Engine state is handled internally by Transport component
  useAudioEngine();

  const {
    queue: globalFiles,
    setActiveFile,
    selectedFileId
  } = useFileQueue();

  // Navigation Logic
  const currentIndex = globalFiles.findIndex(f => f.id === selectedFileId);
  // canNext: If no index (-1) but items exist OR if index is before last item
  const canNext = globalFiles.length > 0 && (currentIndex === -1 || currentIndex < globalFiles.length - 1);
  const canPrev = globalFiles.length > 0 && (currentIndex === -1 || currentIndex > 0);

  const handleNext = () => {
    if (canNext) {
      const nextIndex = currentIndex === -1 ? 0 : currentIndex + 1;
      const nextId = globalFiles[nextIndex].id;
      setActiveFile(nextId);
      setCurrentFile(nextId, true);
    }
  };

  const handlePrev = () => {
    if (canPrev) {
      const prevIndex = currentIndex === -1 ? globalFiles.length - 1 : currentIndex - 1;
      const prevId = globalFiles[prevIndex].id;
      setActiveFile(prevId);
      setCurrentFile(prevId, true);
    }
  };

  // Map global MediaFile[] back to File[] for compatibility
  const files = React.useMemo(() => globalFiles.map(mf => {
    const f = new File([], mf.name + mf.extension);
    Object.defineProperty(f, 'path', { value: mf.id });
    return f;
  }), [globalFiles]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Refs for scrolling
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((isProcessing || statusMsg) && progressRef.current) {
      setTimeout(() => {
        progressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [isProcessing, statusMsg]);

  useEffect(() => {
    if (!window.electronAPI) return;

    const unsubProgress = window.electronAPI.onProgress((data: any) => {
      let p = 0;
      if (typeof data === 'number') {
        p = data;
      } else if (data && typeof data === 'object') {
        if (data.toolId && data.toolId !== tool.id) return;
        p = data.progress;
      }
      setProgress(p);
    });

    const unsubStatus = window.electronAPI.on('task-status', (data: any) => {
      let msg = '';
      if (typeof data === 'string') {
        msg = data;
      } else if (data && typeof data === 'object') {
        if (data.toolId && data.toolId !== tool.id) return;
        msg = data.msg;
      }
      if (msg) {
        setStatusMsg(msg);
        setIsProcessing(true);
      }
    });

    return () => {
      unsubProgress();
      unsubStatus();
    };
  }, [tool.id]);

  const handleRunTask = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setStatusMsg("Processing...");
    try {
      const filePaths = files.map(f => {
        const p = (f as any).path;
        if (!p) throw new Error(`File ${f.name} has no valid path.`);
        return p;
      });

      const backendSettings = {
        outputDir: settings.outputMode === 'custom' ? settings.customOutputDir : undefined,
        autoCreateFolder: settings.autoCreateFolder
      };

      const options = settings.toolSettings?.[tool.id] || {};

      let result;
      switch (tool.id) {
        case ToolId.Ambix2Ogg:
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
        case ToolId.Stereo2Ambix:
          result = await window.electronAPI.convertStereo2Ambix(filePaths, options.targetOrder, options.stageWidth, options.envelopment, backendSettings);
          break;
        case ToolId.AmbiLevel:
          result = await window.electronAPI.processAmbiLevel(filePaths, options.mode, options.targetDb, backendSettings);
          break;
        case ToolId.Ambix2BW64:
          result = await window.electronAPI.convertAmbix2BW64(filePaths, options.normalization, options.nfcDistance, backendSettings);
          break;
      }

      if (result && !result.success) throw new Error(result.error || "Unknown error");
      setStatusMsg("Success!");
    } catch (err: any) {
      console.error(err);
      setStatusMsg(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const rotatorRef = useRef<AmbiRotateHandle>(null);
  const dataRef = useRef<AmbiDataHandle>(null);

  if (tool.id === ToolId.AmbiTrim) return <AmbiTrim tool={tool} />;

  const renderToolSpecificControls = () => {
    switch (tool.id) {
      case ToolId.AmbiData: return <AmbiDataTool ref={dataRef} tool={tool} />;
      case ToolId.Ambix2Ogg: return <Ambix2OggView tool={tool} files={files} />;
      case ToolId.Ambix2Opus:
      case ToolId.Ambix2IAMF: return <BitrateConverterView tool={tool} />;
      case ToolId.Ambix2APAC: return <Ambix2ApacView tool={tool} />;
      case ToolId.Ambix2Bin: return <Ambix2BinView tool={tool} />;
      case ToolId.AmbiOrder: return <AmbiOrderView tool={tool} files={files} />;
      case ToolId.AmbiSwap: return <AmbiSwapView tool={tool} />;
      case ToolId.Ambix2CAF: return <Ambix2CafView tool={tool} />;
      case ToolId.Stereo2Ambix: return <Stereo2AmbixView tool={tool} />;
      case ToolId.AmbiLevel: return <AmbiLevelTool tool={tool} />;
      case ToolId.Ambix2BW64: return <Ambix2BW64Tool tool={tool} />;
      case ToolId.AmbiRotate:
        return (
          <AmbiRotateTool
            ref={rotatorRef}
            tool={tool}
            files={files}
            activeIndex={currentIndex === -1 ? 0 : currentIndex}
            onIndexChange={(idx) => { if (globalFiles[idx]) setActiveFile(globalFiles[idx].id); }}
            isVisible={tool.id === ToolId.AmbiRotate}
          />
        );
      default: return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#121214]">
      <div className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${tool.colorClass}`}>{tool.label}</h2>
          <p className="text-gray-400 text-lg font-light">{tool.description}</p>
        </header>

        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {renderToolSpecificControls()}

          {(statusMsg || isProcessing) && (
            <div ref={progressRef} className="mt-4 flex flex-col gap-2">
              {statusMsg && (
                <div className={`p-3 rounded text-sm font-mono border ${statusMsg.includes("Error") ? "bg-red-900/20 border-red-900/50 text-red-300" : "bg-blue-900/20 border-blue-900/50 text-blue-300"}`}>
                  {statusMsg}
                </div>
              )}
              {isProcessing && (
                <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden border border-gray-700">
                  <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out" style={{ width: `${Math.round(progress * 100)}%` }} />
                </div>
              )}
              {isProcessing && <div className="text-right text-[10px] text-gray-500 font-mono">{Math.round(progress * 100)}%</div>}
            </div>
          )}
        </div>
      </div>

      <div data-testid="bottom-center-container" className="shrink-0 p-6 bg-[#0c0c0e] border-t border-white flex flex-col gap-4">
        {globalFiles.length > 0 && (
          <Transport
            onNext={handleNext}
            onPrev={handlePrev}
            canNext={canNext}
            canPrev={canPrev}
          />
        )}

        <button
          onClick={async () => {
            if (tool.id === ToolId.AmbiRotate) {
              if (!rotatorRef.current) return;
              setIsProcessing(true);
              const outPath = await rotatorRef.current.runRotation();
              setIsProcessing(false);
              if (outPath) setStatusMsg(`Success: ${outPath}`);
            } else if (tool.id === ToolId.AmbiData) {
              if (!dataRef.current) return;
              dataRef.current.applyChanges();
              setStatusMsg("Metadata Applied locally.");
            } else {
              handleRunTask();
            }
          }}
          disabled={isProcessing || globalFiles.length === 0}
          className={`w-full px-8 py-3 rounded-lg font-bold text-white shadow-xl transition-all active:scale-[0.98] disabled:opacity-30 disabled:grayscale ${tool.btnColorClass || 'bg-indigo-600 hover:bg-indigo-500'}`}
        >
          {isProcessing ? 'Processing...' : tool.actionLabel}
        </button>
      </div>
    </div>
  );
};
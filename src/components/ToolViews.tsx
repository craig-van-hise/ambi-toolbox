import React, { useState, useRef, useEffect } from 'react';
import {
  ToolId,
  ToolDefinition,
} from '../types';

// Contexts & Hooks
import { useSettings } from '../contexts/SettingsContext';
import { usePlayback } from '../contexts/PlaybackContext';
import { useFileQueue } from '../hooks/useFileQueue';

// Components
import { FileQueue } from './FileQueue';
import { Transport } from './Transport';
import { SmartDropZone } from './SmartDropZone';

// Tool Components
import { AmbiLevelTool } from '../components/tools/AmbiLevel';
import { Ambix2BW64Tool } from '../components/tools/Ambix2BW64';
import { AmbiDataTool } from '../tools/AmbiData';
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
  const {
    state: playerState,
    togglePlayPause,
    stop,
    seek,
    commitSeek,
    setVolume,
    toggleLoop,
    setLoopPoints,
    toggleHeadphones,
    setHrtfProfile,
    setCustomSofaPath,
    setCurrentFile
  } = usePlayback();

  const {
    queue: globalFiles,
    addFiles,
    clearQueue,
    setActiveFile,
    selectedFileId
  } = useFileQueue();

  // Navigation Logic
  const currentIndex = globalFiles.findIndex(f => f.id === selectedFileId);
  const canNext = currentIndex >= 0 && currentIndex < globalFiles.length - 1;
  const canPrev = currentIndex > 0;

  const handleNext = () => {
    if (canNext) {
      const nextId = globalFiles[currentIndex + 1].id;
      setActiveFile(nextId);
      setCurrentFile(nextId, true);
    }
  };

  const handlePrev = () => {
    if (canPrev) {
      const prevId = globalFiles[currentIndex - 1].id;
      setActiveFile(prevId);
      setCurrentFile(prevId, true);
    }
  };

  // Map global MediaFile[] back to File[] for compatibility with existing components
  const files = React.useMemo(() => globalFiles.map(mf => {
    const f = new File([], mf.name + mf.extension);
    Object.defineProperty(f, 'path', { value: mf.id });
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
    const clamped = Math.max(10, Math.min(newPercent, 90));
    setTopHeightPercent(clamped);
  }, [isDragging]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

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
      setTimeout(() => {
        queueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [files.length]);

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

      const backendSettings = {
        outputDir: settings.outputMode === 'custom' ? settings.customOutputDir : undefined,
        autoCreateFolder: settings.autoCreateFolder
      };

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

  const processedFiles = files.map((f, i) => ({
    name: f.name,
    path: (f as any).path || 'Memory File',
    index: i
  }));

  // Refs for Tool Integration
  const rotatorRef = useRef<AmbiRotateHandle>(null);

  // SPECIAL CASE: AmbiTrim handles its own full-screen layout
  if (tool.id === ToolId.AmbiTrim) {
    return <AmbiTrim tool={tool} />;
  }

  // SPECIAL CASE: AmbiData has its own layout
  if (tool.id === ToolId.AmbiData) {
    return <AmbiDataTool tool={tool} files={files as any[]} isProcessing={isProcessing} />;
  }

  const renderToolSpecificControls = () => {
    switch (tool.id) {
      case ToolId.Ambix2Ogg:
        return <Ambix2OggView tool={tool} files={files} onRun={handleRunTask} isProcessing={isProcessing} />;
      case ToolId.Ambix2Opus:
      case ToolId.Ambix2IAMF:
        return <BitrateConverterView tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />;
      case ToolId.Ambix2APAC:
        return <Ambix2ApacView tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />;
      case ToolId.Ambix2Bin:
        return <Ambix2BinView tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />;
      case ToolId.AmbiOrder:
        return <AmbiOrderView tool={tool} files={files} onRun={handleRunTask} isProcessing={isProcessing} />;
      case ToolId.AmbiSwap:
        return <AmbiSwapView tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />;
      case ToolId.Ambix2CAF:
        return <Ambix2CafView tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />;
      case ToolId.Stereo2Ambix:
        return <Stereo2AmbixView tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />;
      case ToolId.AmbiLevel:
        return <AmbiLevelTool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />;
      case ToolId.Ambix2BW64:
        return <Ambix2BW64Tool tool={tool} onRun={handleRunTask} isProcessing={isProcessing} />;
      case ToolId.AmbiRotate:
        return (
          <AmbiRotateTool
            ref={rotatorRef}
            tool={tool}
            files={files}
            activeIndex={currentIndex === -1 ? 0 : currentIndex}
            onIndexChange={(idx) => {
              if (globalFiles[idx]) setActiveFile(globalFiles[idx].id);
            }}
            onRun={handleRunTask}
            isProcessing={isProcessing}
            isVisible={tool.id === ToolId.AmbiRotate}
          />
        );
      default:
        return null;
    }
  };

  const dropZoneAllowedExts = (() => {
    switch (tool.id) {
      case ToolId.Ambix2IAMF: return ['.wav'];
      case ToolId.Ambix2APAC: return ['.wav', '.caf'];
      case ToolId.Ambix2Bin:
      case ToolId.AmbiRotate: return ['.wav', '.flac', '.ogg', '.caf'];
      case ToolId.Ambix2Opus: return ['.wav', '.amb', '.caf', '.flac', '.mp3'];
      default: return ['.wav', '.amb', '.caf', '.opus', '.mp3', '.aac', '.flac', '.ogg'];
    }
  })();

  const dropZoneLabel = (() => {
    switch (tool.id) {
      case ToolId.Ambix2IAMF: return ".wav accepted";
      case ToolId.Ambix2APAC: return ".wav, .caf accepted";
      case ToolId.Ambix2Bin:
      case ToolId.AmbiRotate: return ".wav, .flac, .ogg, .caf accepted";
      case ToolId.Ambix2Opus: return ".wav, .amb, .caf, .flac, .mp3 accepted";
      case ToolId.Ambix2Ogg: return ".wav, .amb, .caf, .flac, .mp3, .opus, .ogg accepted";
      default: return ".wav, .amb, .caf, .opus, .mp3, .aac, .flac, .ogg accepted";
    }
  })();

  return (
    <div className="h-screen flex flex-col overflow-hidden text-white">
      <div ref={containerRef} className="flex-1 flex flex-col relative overflow-hidden">
        {/* TOP PARTITION */}
        <div style={{ height: `${topHeightPercent}%` }} className="w-full flex flex-col overflow-hidden relative bg-[#18181b]">
          <div className="flex-1 overflow-y-auto pt-8 pb-4 flex flex-col relative">
            <div className="px-8 mb-6 flex-none">
              <header>
                <h2 className={`text-3xl font-bold mb-2 ${tool.colorClass}`}>{tool.label}</h2>
                <p className="text-gray-400 text-lg font-light">{tool.description}</p>
              </header>
            </div>

            <div className="px-8 flex-none flex flex-col gap-4 relative z-10">
              <div className="flex flex-col gap-4">
                <div className={`${files.length > 0 ? 'h-20' : (tool.id === ToolId.AmbiRotate ? 'h-32' : 'h-48')} transition-all duration-300`}>
                  <SmartDropZone
                    className="h-full w-full"
                    allowedExtensions={dropZoneAllowedExts}
                    label={dropZoneLabel}
                    compact={files.length > 0}
                    onFilesLoaded={(loadedFiles) => {
                      const processed = loadedFiles.map(f => typeof f === 'string' ? { name: f.split('/').pop() || f, path: f } : f);
                      addFiles(processed as File[]);
                    }}
                    onDrop={(e) => {
                      if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files));
                    }}
                  />
                </div>

                {files.length > 0 && (
                  <div ref={queueRef} className="mt-4">
                    <FileQueue
                      files={processedFiles}
                      selectedId={selectedFileId}
                      onSelect={setActiveFile}
                      onPlay={(id, shouldPlay) => {
                        setActiveFile(id);
                        setCurrentFile(id, shouldPlay ?? true);
                      }}
                      onClear={clearQueue}
                      playingFileId={playerState.currentFile}
                      isPlaying={playerState.isPlaying}
                    />
                  </div>
                )}

                {files.length > 0 && (
                  <Transport
                    state={playerState}
                    onPlayPause={() => !playerState.currentFile && selectedFileId ? setCurrentFile(selectedFileId, true) : togglePlayPause()}
                    onStop={stop}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onSeek={seek}
                    onCommitSeek={commitSeek}
                    onVolumeChange={setVolume}
                    onToggleLoop={toggleLoop}
                    onToggleHeadphones={toggleHeadphones}
                    onSetHrtfProfile={setHrtfProfile}
                    onSetCustomSofaPath={setCustomSofaPath}
                    onSetLoopPoints={setLoopPoints}
                    canNext={canNext}
                    canPrev={canPrev}
                  />
                )}
              </div>
            </div>

            {(statusMsg || isProcessing) && (
              <div ref={progressRef} className="px-8 mt-4 flex flex-col gap-2 flex-none">
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
            <div className="h-8 flex-none"></div>
          </div>
        </div>

        {/* DRAGGABLE DIVIDER */}
        <div onMouseDown={handleMouseDown} className="h-0 w-full border-t border-studio-border relative group hover:border-indigo-500/50 transition-colors cursor-row-resize shrink-0">
          <div className="absolute top-[-6px] bottom-[-6px] left-0 right-0 z-10 cursor-row-resize"></div>
        </div>

        {/* BOTTOM PARTITION */}
        <div style={{ height: `${100 - topHeightPercent}%` }} className="w-full bg-[#18181b] flex flex-col min-h-0 relative">
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              {renderToolSpecificControls()}

              {tool.id === ToolId.AmbiRotate && (
                <button
                  onClick={async () => {
                    if (!rotatorRef.current) return;
                    setIsProcessing(true);
                    const outPath = await rotatorRef.current.runRotation();
                    setIsProcessing(false);
                    if (outPath) setStatusMsg(`Success: ${outPath}`);
                  }}
                  disabled={isProcessing || files.length === 0}
                  className={`w-full px-8 py-2.5 rounded font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${tool.btnColorClass}`}
                >
                  {isProcessing ? 'Rotating...' : 'Process Rotation'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
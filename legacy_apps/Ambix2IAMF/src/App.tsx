import { useState } from 'react'

function App() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [quality, setQuality] = useState<number>(96); // Default High

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === 'processing') return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      // Electron adds 'path' to the File object
      const path = (file as any).path;

      if (!path) {
        setStatus('error');
        setMessage('Could not determine file path.');
        return;
      }

      setStatus('processing');
      setMessage('Converting...');

      try {
        const result = await window.api.convertFile(path, undefined, quality);
        setStatus('done');
        setMessage(`Success! File saved to: ${result}`);
      } catch (err: any) {
        setStatus('error');
        setMessage(`Error: ${err.message}`);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getBorderColor = () => {
    switch (status) {
      case 'processing': return 'border-yellow-500';
      case 'done': return 'border-green-500';
      case 'error': return 'border-red-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 gap-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`w-full max-w-2xl h-96 border-4 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors ${getBorderColor()} ${status === 'processing' ? 'animate-pulse' : ''} bg-gray-800`}
      >
        <div className="text-center space-y-4">

          {/* Quality Selector - Only show when idle or done/error (not processing) */}
          <div className="flex flex-col items-center gap-2 mb-4" onClick={(e) => e.stopPropagation()}>
            <label htmlFor="quality" className="text-gray-400 text-sm font-medium">Quality (Per Channel)</label>
            <select
              id="quality"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              disabled={status === 'processing'}
              className="bg-gray-800 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value={32}>Low (32 kbps)</option>
              <option value={64}>Medium (64 kbps)</option>
              <option value={96}>High (96 kbps)</option>
              <option value={128}>Highest (128 kbps)</option>
            </select>
          </div>

          <p className="text-2xl font-bold">
            {status === 'idle' && "Drag Ambisonics File Here"}
            {status === 'processing' && "Converting..."}
            {status === 'done' && "Success! File saved."}
            {status === 'error' && "Error Occurred"}
          </p>
          {message && <p className="text-gray-300 px-4">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default App

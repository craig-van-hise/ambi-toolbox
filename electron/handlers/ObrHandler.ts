import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import { getFfmpegPath, getBinaryPath } from './common';

// Helper to find the OBR sidecar binary
export function getObrStreamPath(): string {
  // Use the same logic as common.ts getBinaryPath to find it in assets/bin
  // We can't use getBinaryPath directly comfortably if "obr_stream" isn't in the allowed list or if we want custom handling,
  // but looking at common.ts, getBinaryPath is generic.
  // Let's import getBinaryPath from common.ts instead of duplicating logic?
  // common.ts exports getBinaryPath.

  // However, common.ts imports 'shim' which relies on 'electron'. 
  // Let's use the manually verified path logic to be safe and consistent with "assets/bin".

  return getBinaryPath('obr_stream');
}



// SIMPLIFIED APPROACH:
// We will export a function that spawns the *entire* pipeline and returns the final stdout stream
// that can be piped to the HTTP response.
export function createObrPipeline(
  inputPath: string,
  channels: number,
  profile: string,
  start: number = 0
): ChildProcess[] {
  console.log('[ObrHandler] Entered createObrPipeline');

  let ffmpegPath, obrPath;
  try {
    ffmpegPath = getFfmpegPath();
    console.log(`[ObrHandler] FFmpeg: ${ffmpegPath}`);
    obrPath = getObrStreamPath();
    console.log(`[ObrHandler] OBR: ${obrPath}`);
  } catch (e) {
    console.error('[ObrHandler] Path Resolution Error:', e);
    throw e;
  }

  console.log(`[Pipeline] Spawning 3-Stage Pipeline for: ${path.basename(inputPath)}`);

  // 1. Decode
  // Input: File -> Output: stdout (f32le)
  const decoder = spawn(ffmpegPath, [
    '-ss', start.toString(),
    '-re',
    '-i', inputPath,
    '-f', 'f32le',
    '-acodec', 'pcm_f32le',
    '-ar', '48000',
    '-ac', channels.toString(),
    'pipe:1'
  ], { stdio: ['ignore', 'pipe', 'pipe'] }); // ignore stdin for decoder (file input)

  // 2. Process
  // Input: stdin (f32le) -> Output: stdout (f32le)
  const obr = spawn(obrPath, [
    '--channels', channels.toString(),
    '--rate', '48000',
    '--profile', profile
  ], { stdio: ['pipe', 'pipe', 'pipe'] });

  // 3. Encode 
  // Input: stdin (f32le) -> Output: stdout (webm/opus)
  const encoder = spawn(ffmpegPath, [
    '-f', 'f32le',
    '-ar', '48000',
    '-ac', '2',
    '-i', 'pipe:0',
    '-c:a', 'libopus',
    '-b:a', '192k',
    '-f', 'webm',
    'pipe:1'
  ], { stdio: ['pipe', 'pipe', 'pipe'] });

  // --- PIPING ---

  // Decoder -> OBR
  if (decoder.stdout && obr.stdin) {
    decoder.stdout.pipe(obr.stdin);

    // Squashing EPIPE and other pipe errors
    decoder.stdout.on('error', e => console.error('[Dec-Stdout] Pipe Error:', e));
    obr.stdin.on('error', e => {
      // @ts-ignore
      if (e.code === 'EPIPE') return; // Expected when decoder finished or obr killed
      console.error('[OBR-Stdin] Pipe Error:', e);
    });
  } else {
    console.error('[Pipeline] Failed to pipe Decoder -> OBR');
  }

  // OBR -> Encoder
  if (obr.stdout && encoder.stdin) {
    obr.stdout.pipe(encoder.stdin);

    obr.stdout.on('error', e => console.error('[OBR-Stdout] Pipe Error:', e));
    encoder.stdin.on('error', e => {
      // @ts-ignore
      if (e.code === 'EPIPE') return;
      console.error('[Enc-Stdin] Pipe Error:', e);
    });
  } else {
    console.error('[Pipeline] Failed to pipe OBR -> Encoder');
  }

  // --- STDERR DRAINING (Prevent Deadlocks) ---
  const logStderr = (prefix: string, stream: NodeJS.ReadableStream | null) => {
    if (stream) {
      stream.on('data', d => process.stderr.write(`[${prefix}] ${d.toString()}`));
    }
  };

  logStderr('Dec', decoder.stderr);
  logStderr('OBR', obr.stderr);
  logStderr('Enc', encoder.stderr);

  // --- CLEANUP & ERROR HANDLING ---
  const killAll = () => {
    console.log('[Pipeline] Killing all processes and cleaning up pipes...');

    // Explicitly unpipe to prevent EPIPE writes during shutdown
    try { if (decoder.stdout) decoder.stdout.unpipe(); } catch (e) { }
    try { if (obr.stdout) obr.stdout.unpipe(); } catch (e) { }
    try { if (encoder.stdout) encoder.stdout.unpipe(); } catch (e) { }

    try {
      if (!decoder.killed) decoder.kill('SIGKILL');
    } catch (e) { }
    try {
      if (!obr.killed) obr.kill('SIGKILL');
    } catch (e) { }
    try {
      if (!encoder.killed) encoder.kill('SIGKILL');
    } catch (e) { }
  };

  // If any process errors or exits unexpectedly, kill the others
  const handleError = (procName: string, err: Error) => {
    console.error(`[Pipeline] ${procName} Error:`, err);
    killAll();
  };

  decoder.on('error', e => handleError('Decoder', e));
  obr.on('error', e => handleError('OBR', e));
  encoder.on('error', e => handleError('Encoder', e));

  // If one exits with error, kill all. 
  // Note: decoder exiting 0 is normal (EOF).
  decoder.on('close', code => {
    if (code !== 0) {
      console.error(`[Pipeline] Decoder exited with code ${code}`);
      killAll();
    } else {
      console.log('[Pipeline] Decoder finished (EOF).');
      // Allow OBR to finish processing remaining buffer
      // We don't kill immediately here.
    }
  });

  obr.on('close', code => {
    if (code !== 0) {
      console.error(`[Pipeline] OBR exited with code ${code}`);
      killAll();
    }
    // OBR finish -> Encoder should finish
  });

  // Return references
  // We attach a custom 'kill' method to the list/first item? 
  // No, the caller expects [decoder, obr, encoder]. 
  // We can attach killAll to one of them or rely on the caller to kill each.
  // But strictly, we should export a single object or handle cleanup.
  // The current signature returns ChildProcess[]. 
  // We'll stick to that, but ensure internal logic handles cascading failure.

  return [decoder, obr, encoder];
}

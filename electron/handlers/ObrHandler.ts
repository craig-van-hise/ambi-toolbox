import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import { PassThrough } from 'stream';
import { app } from '../shim';
import { getFfmpegPath, getBinaryPath } from './common';

// Resolves scripts that live in resources/scripts/ (Python tools)
function getScriptPath(scriptName: string): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'scripts', scriptName);
  }
  return path.join(process.cwd(), 'resources', 'scripts', scriptName);
}

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
  start: number = 0,
  rotation?: { yaw: number, pitch: number, roll: number }
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

  console.log(`[Pipeline] Spawning 4-Stage Pipeline (Dec→Rot→OBR→Enc) for: ${path.basename(inputPath)}`);

  const safeChannels = Math.min(channels, 25);

  // 1. Decode
  // Input: File -> Output: stdout (f32le)
  const ext = inputPath.toLowerCase();
  const isOpus = ext.endsWith('.ogg') || ext.endsWith('.opus');
  const isVideoContainer = ['.mp4', '.mov', '.mkv', '.webm'].some(e => ext.endsWith(e));

  const decoderArgs: string[] = [
    '-probesize', '32',
    '-analyzeduration', '0',
  ];

  if (isOpus) {
    decoderArgs.push('-c:a', 'libopus');
  }

  decoderArgs.push(
    '-ss', start.toString(),
    '-i', inputPath
  );

  if (isVideoContainer || isOpus) {
    decoderArgs.push('-map', '0:a:0');
  }

  decoderArgs.push(
    '-f', 'f32le',
    '-acodec', 'pcm_f32le',
    '-ar', '48000',
  );

  // ALWAYS use channelmap for 1-to-1 routing to avoid swresample layout panics
  const mapString = Array.from({ length: safeChannels }, (_, i) => i).join('|');
  decoderArgs.push('-af', `channelmap=map=${mapString}`);

  decoderArgs.push('-strict', 'experimental', '-max_muxing_queue_size', '9999', 'pipe:1');

  const decoder = spawn(ffmpegPath, decoderArgs, { stdio: ['ignore', 'pipe', 'pipe'] });

  // 2a. Rotate (Python rotator.py — stdin f32le → stdout f32le)
  // STRICT: rotation params MUST NOT be passed to obr_stream (unsupported flags → Code 1 crash)
  const rotatorPath = getScriptPath('rotator.py');
  const rotatorArgs = [
    rotatorPath,
    '--channels', safeChannels.toString(),
    '--yaw',     (rotation?.yaw   ?? 0).toString(),
    '--pitch',   (rotation?.pitch ?? 0).toString(),
    '--roll',    (rotation?.roll  ?? 0).toString(),
  ];
  const rotator = spawn('python3', rotatorArgs, { stdio: ['pipe', 'pipe', 'pipe'] });

  // 2b. Process (OBR Binaural — stdin f32le → stdout f32le stereo)
  // STRICT: NO --yaw/--pitch/--roll flags here — obr_stream does not support them
  const obrArgs = [
    '--channels', safeChannels.toString(),
    '--rate', '48000',
    '--profile', profile
  ];

  const obr = spawn(obrPath, obrArgs, { stdio: ['pipe', 'pipe', 'pipe'] });

  // 3. Encode
  // Input: stdin (f32le) -> Output: stdout (wav/pcm_s16le — zero latency)
  const encoder = spawn(ffmpegPath, [
    '-f', 'f32le',
    '-ar', '48000',
    '-ac', '2',
    '-i', 'pipe:0',
    '-f', 'wav',         // Output container: WAV
    '-c:a', 'pcm_s16le', // Codec: 16-bit PCM (Zero Latency)
    'pipe:1'
  ], { stdio: ['pipe', 'pipe', 'pipe'] });

  // --- PIPING WITH DEEP BUFFERS (PRP #111 / PRP #154) ---
  // Chain: Decoder → pcmBuffer1 → Rotator → pcmBuffer2 → OBR → pcmBuffer3 → Encoder

  const pcmBuffer1 = new PassThrough({ highWaterMark: 1024 * 1024 * 10 }); // 10MB
  const pcmBuffer2 = new PassThrough({ highWaterMark: 1024 * 1024 * 10 }); // 10MB
  const pcmBuffer3 = new PassThrough({ highWaterMark: 1024 * 1024 * 10 }); // 10MB

  // Stage 1: Decoder → Rotator
  if (decoder.stdout && rotator.stdin) {
    decoder.stdout.pipe(pcmBuffer1).pipe(rotator.stdin);

    decoder.stdout.on('error', e => console.error('[Dec-Stdout] Pipe Error:', e));
    pcmBuffer1.on('error',     e => console.error('[PCM-Buf1] Error:', e));
    rotator.stdin.on('error',  e => {
      // @ts-ignore
      if (e.code === 'EPIPE') return;
      console.error('[Rot-Stdin] Pipe Error:', e);
    });
  } else {
    console.error('[Pipeline] Failed to pipe Decoder → Rotator');
  }

  // Stage 2: Rotator → OBR
  if (rotator.stdout && obr.stdin) {
    rotator.stdout.pipe(pcmBuffer2).pipe(obr.stdin);

    rotator.stdout.on('error', e => console.error('[Rot-Stdout] Pipe Error:', e));
    pcmBuffer2.on('error',     e => console.error('[PCM-Buf2] Error:', e));
    obr.stdin.on('error',      e => {
      // @ts-ignore
      if (e.code === 'EPIPE') return;
      console.error('[OBR-Stdin] Pipe Error:', e);
    });
  } else {
    console.error('[Pipeline] Failed to pipe Rotator → OBR');
  }

  // Stage 3: OBR → Encoder
  if (obr.stdout && encoder.stdin) {
    obr.stdout.pipe(pcmBuffer3).pipe(encoder.stdin);

    obr.stdout.on('error',    e => console.error('[OBR-Stdout] Pipe Error:', e));
    pcmBuffer3.on('error',    e => console.error('[PCM-Buf3] Error:', e));
    encoder.stdin.on('error', e => {
      // @ts-ignore
      if (e.code === 'EPIPE') return;
      console.error('[Enc-Stdin] Pipe Error:', e);
    });
  } else {
    console.error('[Pipeline] Failed to pipe OBR → Encoder');
  }

  // --- STDERR DRAINING (Prevent Deadlocks) ---
  const logStderr = (prefix: string, stream: NodeJS.ReadableStream | null) => {
    if (stream) {
      stream.on('data', d => process.stderr.write(`[${prefix}] ${d.toString()}`));
    }
  };

  logStderr('Dec', decoder.stderr);
  logStderr('Rot', rotator.stderr);
  logStderr('OBR', obr.stderr);
  logStderr('Enc', encoder.stderr);

  // --- CLEANUP & ERROR HANDLING ---
  const killAll = () => {
    console.log('[Pipeline] Killing all processes and cleaning up pipes...');

    // Explicitly unpipe and destroy buffers to prevent memory leaks (PRP #111 / #154)
    try { if (decoder.stdout)  decoder.stdout.unpipe();  } catch (e) { }
    try { pcmBuffer1.destroy();                          } catch (e) { }
    try { if (rotator.stdout)  rotator.stdout.unpipe();  } catch (e) { }
    try { pcmBuffer2.destroy();                          } catch (e) { }
    try { if (obr.stdout)      obr.stdout.unpipe();      } catch (e) { }
    try { pcmBuffer3.destroy();                          } catch (e) { }
    try { if (encoder.stdout)  encoder.stdout.unpipe();  } catch (e) { }

    try { if (!decoder.killed)  decoder.kill('SIGKILL');  } catch (e) { }
    try { if (!rotator.killed)  rotator.kill('SIGKILL');  } catch (e) { }
    try { if (!obr.killed)      obr.kill('SIGKILL');      } catch (e) { }
    try { if (!encoder.killed)  encoder.kill('SIGKILL');  } catch (e) { }
  };

  // If any process errors or exits unexpectedly, kill the others
  const handleError = (procName: string, err: Error) => {
    console.error(`[Pipeline] ${procName} Error:`, err);
    killAll();
  };

  decoder.on('error',  e => handleError('Decoder',  e));
  rotator.on('error',  e => handleError('Rotator',  e));
  obr.on('error',      e => handleError('OBR',      e));
  encoder.on('error',  e => handleError('Encoder',  e));

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

  rotator.on('close', code => {
    if (code !== 0) {
      console.error(`[Pipeline] Rotator exited with code ${code}`);
      killAll();
    } else {
      console.log('[Pipeline] Rotator finished (EOF).');
    }
  });

  obr.on('close', code => {
    if (code !== 0) {
      console.error(`[Pipeline] OBR exited with code ${code}`);
      killAll();
    }
  });

  encoder.on('close', code => {
    if (code !== 0 && code !== null) {
      console.error(`[Pipeline] Encoder exited with code ${code}`);
      killAll();
    }
  });

  // Return references
  // We attach a custom 'kill' method to the list/first item? 
  // No, the caller expects [decoder, obr, encoder]. 
  // We can attach killAll to one of them or rely on the caller to kill each.
  // But strictly, we should export a single object or handle cleanup.
  // The current signature returns ChildProcess[]. 
  // We'll stick to that, but ensure internal logic handles cascading failure.

  return [decoder, rotator, obr, encoder];
}

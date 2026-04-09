import http from 'http';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { spawn } from 'child_process';
import { PassThrough, Transform } from 'stream';
import { getFfmpegPath, getSofaAssetPath, probeAudio } from './handlers/common';
import { createObrPipeline } from './handlers/ObrHandler';
import { prepareStreamTarget } from './handlers/IngestionRouter';
import { ChildProcess } from 'child_process';

const activeStreams = new Map<string, ChildProcess[]>();

function killActiveStream(id: string) {
    const processes = activeStreams.get(id);
    if (processes) {
        console.log(`[StreamServer] Hard-killing active stream: ${id}`);
        processes.forEach(p => {
            try {
                if (!p.killed) p.kill('SIGKILL');
            } catch (e) { }
        });
        activeStreams.delete(id);
    }
}

/**
 * PrimeBuffer
 * Buffers initial chunks of audio to prevent playback stutters.
 */
class PrimeBuffer extends Transform {
    private chunks: Buffer[] = [];
    private totalSize = 0;
    private primed = false;
    private primeThreshold = 4 * 1024; // 4KB (near-zero startup delay)

    _transform(chunk: any, encoding: BufferEncoding, callback: Function) {
        const bufferChunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);

        if (this.primed) {
            this.push(bufferChunk);
        } else {
            this.chunks.push(bufferChunk);
            this.totalSize += bufferChunk.length;
            if (this.totalSize >= this.primeThreshold) {
                this.primed = true;
                this.push(Buffer.concat(this.chunks));
                this.chunks = []; // Free memory
            }
        }
        callback();
    }

    _flush(callback: Function) {
        if (!this.primed && this.chunks.length > 0) {
            this.push(Buffer.concat(this.chunks));
        }
        callback();
    }
}

/**
 * StreamServer
 * Local HTTP server for binaural and OBR streaming.
 */
export function startStreamServer(port: number = 45455) {
    const server = http.createServer(async (req, res) => {
        console.log(`[StreamServer] Incoming request: ${req.url}`);

        // PROBE METADATA ENDPOINT
        if (req.url?.startsWith('/probe-metadata') || req.url?.startsWith('/probe-duration')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const filePath = url.searchParams.get('file');

            if (!filePath || !fs.existsSync(filePath)) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid File' }));
                return;
            }

            try {
                const targetPath = await prepareStreamTarget(filePath);
                const info = await probeAudio(targetPath).catch(() => null);
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({
                    duration: info?.duration || 0,
                    channels: info?.channels || 0,
                    sampleRate: info?.sampleRate || 0
                }));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Probe Error' }));
            }
            return;
        }

        const isLegacyStream = req.url?.startsWith('/stream');
        const isObrStream = req.url?.startsWith('/obr-stream');

        if (isLegacyStream) {
            const url = new URL(req.url!, `http://${req.headers.host}`);
            let filePath = url.searchParams.get('file');
            const binaural = url.searchParams.get('binaural') === 'true';
            let sofaPath = url.searchParams.get('sofaPath');
            const hrtfProfile = url.searchParams.get('hrtfProfile');
            const start = url.searchParams.get('start') || '0';
            const channels = parseInt(url.searchParams.get('channels') || '0', 10);
            const render = url.searchParams.get('render');

            if (binaural && !sofaPath && hrtfProfile) {
                const hrtfFileMap: Record<string, string> = {
                    'neumann': 'Neumann_KU100_48k.sofa',
                    'kemar': 'MIT_KEMAR_Normal.sofa',
                    'h3': 'H3_48K_24bit_256tap_FIR_SOFA.sofa'
                };
                const filename = hrtfFileMap[hrtfProfile];
                if (filename) {
                    sofaPath = getSofaAssetPath(filename);
                }
            }

            if (!filePath) {
                res.writeHead(400); res.end('Missing File Path'); return;
            }

            try {
                filePath = await prepareStreamTarget(filePath);
                if (!fs.existsSync(filePath)) throw new Error("File not found");
            } catch (err) {
                res.writeHead(500); res.end('Ingestion Error'); return;
            }

            res.writeHead(200, {
                'Content-Type': 'audio/ogg',
                'Transfer-Encoding': 'chunked',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'X-Content-Signature': crypto.createHash('md5').update(filePath || '').digest('hex')
            });

            const useCardioid = render === 'stereo' && channels >= 4;
            const ffmpegPath = getFfmpegPath();
            const ext = filePath.toLowerCase();
            const isOpus = ext.endsWith('.ogg') || ext.endsWith('.opus');
            const isVideoContainer = ['.mp4', '.mov', '.mkv', '.webm'].some(e => ext.endsWith(e));

            const args: string[] = [];
            if (isOpus) args.push('-c:a', 'libopus');
            args.push('-ss', start, '-fflags', '+genpts', '-i', filePath);
            if (isVideoContainer || isOpus) args.push('-map', '0:a:0');

            if (useCardioid) {
                args.push('-af', 'pan=stereo|c0=0.707*c0+0.707*c1|c1=0.707*c0-0.707*c1');
            } else {
                args.push('-af', 'pan=stereo|c0=c0|c1=c1');
            }

            args.push(
                '-max_muxing_queue_size', '9999',
                '-f', 'ogg',
                '-c:a', 'libopus',
                '-b:a', '256k',
                '-vbr', 'on',
                '-strict', 'experimental',
                'pipe:1'
            );

            const ffmpeg = spawn(ffmpegPath, args);
            const httpBuffer = new PassThrough({ highWaterMark: 1024 * 1024 * 10 });
            const primeBuffer = new PrimeBuffer();

            // Track this stream of one process
            const streamId = `legacy-${filePath}`;
            killActiveStream(streamId);
            activeStreams.set(streamId, [ffmpeg]);

            ffmpeg.stdout.pipe(primeBuffer).pipe(httpBuffer).pipe(res);

            req.on('close', () => {
                killActiveStream(streamId);
                primeBuffer.destroy();
                httpBuffer.destroy();
            });

            ffmpeg.on('close', () => { 
                if (!res.writableEnded) res.end();
                activeStreams.delete(streamId);
            });
            return;

        } else if (isObrStream) {
            const url = new URL(req.url!, `http://${req.headers.host}`);
            let filePath = url.searchParams.get('file');
            const channels = parseInt(url.searchParams.get('channels') || '0', 10);
            const profile = url.searchParams.get('profile') || 'ambient';
            const start = parseFloat(url.searchParams.get('start') || '0');

            if (!filePath || !channels) {
                res.writeHead(400); res.end('Invalid Parameters'); return;
            }

            try {
                filePath = await prepareStreamTarget(filePath);
                if (!fs.existsSync(filePath)) throw new Error("File not found");
            } catch (err) {
                res.writeHead(500); res.end('Ingestion Error'); return;
            }

            res.writeHead(200, {
                'Content-Type': 'audio/wav',
                'Transfer-Encoding': 'chunked',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'X-Content-Signature': crypto.createHash('md5').update(filePath || '').digest('hex')
            });

            try {
                const yaw = parseFloat(url.searchParams.get('yaw') || '0');
                const pitch = parseFloat(url.searchParams.get('pitch') || '0');
                const roll = parseFloat(url.searchParams.get('roll') || '0');

                const [decoder, rotator, obr, encoder] = createObrPipeline(filePath, channels, profile, start, { yaw, pitch, roll });
                if (!encoder.stdout) throw new Error("Encoder stdout is null");

                const streamId = `obr-${filePath}`;
                killActiveStream(streamId);
                activeStreams.set(streamId, [decoder, rotator, obr, encoder]);

                const httpBuffer = new PassThrough({ highWaterMark: 1024 * 1024 * 10 });
                const primeBuffer = new PrimeBuffer();

                encoder.stdout.pipe(primeBuffer).pipe(httpBuffer).pipe(res);

                req.on('close', () => {
                    killActiveStream(streamId);
                    primeBuffer.destroy();
                    httpBuffer.destroy();
                });

                encoder.on('close', (code) => {
                    activeStreams.delete(streamId);
                    if (!res.writableEnded) {
                        if (code !== 0 && code !== null) res.destroy();
                        else res.end();
                    }
                });
            } catch (err) {
                if (!res.headersSent) {
                    res.writeHead(500); res.end('Pipeline Error');
                } else {
                    res.destroy();
                }
            }
            return;
        } else {
            res.writeHead(404); res.end('Not Found'); return;
        }
    });

    server.listen(port, '127.0.0.1', () => {
        console.log(`[StreamServer] Listening on http://127.0.0.1:${port}/stream`);
    });

    return server;
}

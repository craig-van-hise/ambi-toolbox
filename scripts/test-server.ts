import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { createObrPipeline, getObrStreamPath } from '../electron/handlers/ObrHandler';
import { probeAudio } from '../electron/handlers/common';

const PORT = 45455;

const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url || '', true);
    const pathname = parsedUrl.pathname;

    console.log(`[Server] Request: ${req.method} ${req.url}`);

    if (pathname === '/probe-metadata') {
        const filePath = parsedUrl.query.file as string;
        if (!filePath) {
            res.writeHead(400);
            res.end('Missing file parameter');
            return;
        }

        try {
            console.log(`[Probe] Spawning: ${filePath}`);
            const meta = await probeAudio(filePath);
            console.log(`[Probe] Success: ${meta.channels}ch, ${meta.sampleRate}Hz, ${meta.duration}s`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(meta));
        } catch (err: any) {
            console.error(`[Probe] Error:`, err);
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    if (pathname === '/obr-stream') {
        const filePath = parsedUrl.query.file as string;
        const channels = parseInt(parsedUrl.query.channels as string) || 0;
        const profile = (parsedUrl.query.profile as string) || 'ambient';

        if (!filePath || !fs.existsSync(filePath)) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }

        console.log(`[OBR] Request: ${path.basename(filePath)} (${channels}ch, ${profile})`);

        res.writeHead(200, {
            'Content-Type': 'audio/webm',
            'Transfer-Encoding': 'chunked',
            'Connection': 'keep-alive'
        });

        const pipeline = createObrPipeline(filePath, channels, profile);
        const [decoder, obr, encoder] = pipeline;
        const finalStream = encoder.stdout;

        if (finalStream) {
            // Pipe to response
            finalStream.pipe(res);

            // Handle pipe errors (EPIPE happens here if client disconnects)
            finalStream.on('error', (err: any) => {
                if (err.code === 'EPIPE') {
                    console.log('[Server] Response stream closed (EPIPE). Client disconnected?');
                } else {
                    console.error('[Server] Encoder Stream Error:', err);
                }
            });

            res.on('error', (err: any) => {
                console.error('[Server] Response Error:', err);
            });

            // CLEANUP ON DISCONNECT
            req.on('close', () => {
                console.log('[Server] Client disconnected, cleaning up pipeline...');
                try { finalStream.unpipe(); } catch (e) { }
                // Kill all processes
                pipeline.forEach(p => {
                    if (!p.killed) p.kill('SIGKILL');
                });
            });

        } else {
            console.error('[Server] Failed to get encoder stdout');
            res.end();
            return;
        }

        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`[Stream] Server listening on http://127.0.0.1:${PORT}/stream`);
});

// Handle server errors
server.on('error', (err) => {
    console.error('[Server] Fatal Error:', err);
});

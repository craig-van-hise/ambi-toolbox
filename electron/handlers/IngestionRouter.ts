
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import crypto from 'crypto';

/**
 * IngestionRouter handles proprietary formats (.iamf, .mat, .aivu)
 * by transcoding them to a temporary WAV file using a Python sidecar.
 */

function getHash(input: string): string {
    return crypto.createHash('md5').update(input).digest('hex');
}

export async function prepareStreamTarget(originalPath: string): Promise<string> {
    const ext = path.extname(originalPath).toLowerCase();
    const proprietaryExtensions = ['.iamf', '.mat', '.aivu'];

    if (!proprietaryExtensions.includes(ext)) {
        return originalPath;
    }

    const hash = getHash(originalPath);
    const tempPath = path.join(os.tmpdir(), `${hash}.ambi_tmp.wav`);

    // Check cache
    if (fs.existsSync(tempPath)) {
        console.log(`[IngestionRouter] Cache hit for: ${path.basename(originalPath)}`);
        return tempPath;
    }

    if (ext === '.aivu') {
        console.log(`[IngestionRouter] Native Apple Immersive Video (.aivu) detected. Transcoding via afconvert...`);
        return new Promise((resolve, reject) => {
            const afconvert = spawn('/usr/bin/afconvert', [
                originalPath,
                tempPath,
                '-d', 'LEF32@48000',
                '-f', 'WAVE'
            ]);

            afconvert.on('close', (code) => {
                if (code === 0 && fs.existsSync(tempPath)) {
                    console.log(`[IngestionRouter] Successfully transcoded .aivu to proxy: ${tempPath}`);
                    resolve(tempPath);
                } else {
                    reject(new Error(`afconvert failed with code ${code}`));
                }
            });

            afconvert.on('error', (err) => {
                reject(new Error(`Failed to spawn afconvert: ${err.message}`));
            });
        });
    }

    console.log(`[IngestionRouter] Proprietary format detected (${ext}). Transcoding via Python sidecar...`);

    // Locate Python sidecar
    const scriptPath = path.join(process.cwd(), 'py', 'format_decoder.py');

    return new Promise((resolve, reject) => {
        const python = spawn('python3', [
            scriptPath,
            '--input', originalPath,
            '--output', tempPath
        ]);

        let errorOutput = '';
        python.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        python.on('close', (code) => {
            if (code === 0 && fs.existsSync(tempPath)) {
                console.log(`[IngestionRouter] Successfully transcoded to proxy: ${tempPath}`);
                resolve(tempPath);
            } else {
                console.error(`[IngestionRouter] Python transcoding failed (code ${code}): ${errorOutput}`);
                reject(new Error(`Transcoding failed: ${errorOutput}`));
            }
        });

        python.on('error', (err) => {
            reject(new Error(`Failed to spawn Python: ${err.message}`));
        });
    });
}

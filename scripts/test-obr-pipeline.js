
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OUTPUT_FILE = path.resolve(__dirname, '../test_obr_output.webm');
const OBR_BINARY = path.resolve(__dirname, '../src/cpp/build/obr_stream');
const FFMPEG = 'ffmpeg'; // Ensure this is in your PATH

function runTest() {
    console.log("Starting OBR Pipeline Test...");

    if (!fs.existsSync(OBR_BINARY)) {
        console.error(`OBR Binary not found at: ${OBR_BINARY}`);
        process.exit(1);
    }

    // 1. Decoder / Generator
    // Generates 4-channel Ambisonic noise
    // Fixed: 'nb' is not a valid color. Using 'white'.
    const decoderArgs = [
        '-f', 'lavfi',
        '-i', 'anoisesrc=c=white:d=5',
        '-filter_complex', '[0:a]channelsplit=channel_layout=mono[m];[m][m][m][m]join=inputs=4:channel_layout=quad[out]',
        '-map', '[out]',
        '-f', 'f32le',
        '-acodec', 'pcm_f32le',
        '-ar', '48000',
        '-ac', '4',
        'pipe:1'
    ];

    const decoder = spawn(FFMPEG, decoderArgs);

    // 2. OBR Sidecar
    const obrArgs = [
        '--channels', '4',
        '--rate', '48000',
        '--profile', 'ambient'
    ];
    const obr = spawn(OBR_BINARY, obrArgs);

    // 3. Encoder
    const encoderArgs = [
        '-f', 'f32le',
        '-ar', '48000',
        '-ac', '2', // OBR Output is always Stereo (Binaural)
        '-i', 'pipe:0',
        '-c:a', 'libopus',
        '-b:a', '192k',
        '-f', 'webm',
        '-y',
        OUTPUT_FILE
    ];
    const encoder = spawn(FFMPEG, encoderArgs);

    // PIPING
    decoder.stdout.pipe(obr.stdin);
    obr.stdout.pipe(encoder.stdin);

    // Logging
    obr.stderr.on('data', d => console.log(`[OBR]: ${d}`));
    decoder.stderr.on('data', d => console.log(`[DEC]: ${d}`));
    encoder.stderr.on('data', d => console.log(`[ENC]: ${d}`));

    encoder.on('close', (code) => {
        console.log(`Encoder finished with code ${code}`);
        if (code === 0 && fs.existsSync(OUTPUT_FILE)) {
            const stats = fs.statSync(OUTPUT_FILE);
            console.log(`Success! Generated WebM: ${stats.size} bytes`);
            if (stats.size > 50000) { // Should be ~100KB for 5s of audio
                console.log("TEST PASSED");
                process.exit(0);
            } else {
                console.error("TEST FAILED: File too small (" + stats.size + " bytes)");
                process.exit(1);
            }
        } else {
            console.error("TEST FAILED: Encoder error or file missing");
            process.exit(1);
        }
    });

    // Handle initial errors
    decoder.on('error', err => { console.error("Decoder Spawn Error:", err); });
    obr.on('error', err => { console.error("OBR Spawn Error:", err); });
}

runTest();

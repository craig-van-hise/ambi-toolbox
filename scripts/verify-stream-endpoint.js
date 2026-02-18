
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
// We need a valid file path to test. using test_000007.iamf as referenced before, or a dummy path if we mock it?
// The backend checks fs.existsSync(filePath).
// Let's use the one we used in the previous test task or any existing file.
// The previous test used `anoisesrc` generation but that was for the pipeline test script.
// The backend endpoint requires an existing file on disk.
// We can use `package.json` as a dummy file for existence check? 
// Wait, the backend passes this file to FFmpeg. FFmpeg needs to be able to read it. 
// A text file might cause FFmpeg to error out immediately, but we might get headers before that?
// Better to use a real audio file or create a dummy wav.

const TEST_FILE_PATH = path.resolve(__dirname, '../test_input.wav');

// Create a dummy WAV file if it doesn't exist
if (!fs.existsSync(TEST_FILE_PATH)) {
    // minimalist wav header? Or just use ffmpeg to gen one?
    // Let's assume the previous test might have left something? No it cleaned up.
    // Let's generate a quick test file using ffmpeg if possible, or just fail if not found.
    // Actually, we can use the `test_obr_output.webm` from previous step if we didn't delete it?
    // We deleted it.
    console.log("Creating dummy test file...");
    // We can't easily spawn ffmpeg here without importing dependencies, but we can try.
    // simpler: rely on `test_000007.iamf` which we saw in the file list earlier?
    // File list showed: `test_000007.iamf`.
}

const EXISTING_FILE = path.resolve(__dirname, '../test_000007.iamf');

if (!fs.existsSync(EXISTING_FILE)) {
    console.warn(`Warning: ${EXISTING_FILE} not found. Test might fail if backend behaves strictly.`);
}

// URL Params
const PORT = 45455;
const FILE_PARAM = encodeURIComponent(EXISTING_FILE);
const URL = `http://127.0.0.1:${PORT}/obr-stream?file=${FILE_PARAM}&channels=4&profile=ambient`;

console.log(`Verifying Stream Endpoint: ${URL}`);

const req = http.get(URL, (res) => {
    console.log(`Response Status: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);

    if (res.statusCode !== 200) {
        console.error("FAILED: Status not 200");
        process.exit(1);
    }

    if (res.headers['content-type'] !== 'audio/webm') {
        console.error(`FAILED: Content-Type is ${res.headers['content-type']}, expected audio/webm`);
        process.exit(1);
    }

    let data = Buffer.alloc(0);
    const MAX_BYTES = 100;

    res.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
        if (data.length >= 4) {
            // Check WebM Signature: 1A 45 DF A3
            if (data[0] === 0x1A && data[1] === 0x45 && data[2] === 0xDF && data[3] === 0xA3) {
                console.log("SUCCESS: WebM Signature found (1A 45 DF A3)");
                req.destroy(); // Stop request
                process.exit(0);
            } else {
                console.log("First 4 bytes:", data.subarray(0, 4).toString('hex'));
            }
        }

        if (data.length > MAX_BYTES) {
            console.error("FAILED: WebM Signature not found in first 100 bytes");
            console.log("First 4 bytes:", data.subarray(0, 4).toString('hex'));
            req.destroy();
            process.exit(1);
        }
    });

    res.on('end', () => {
        console.error("Stream ended validation without signature verification.");
        process.exit(1); // Should have exited earlier
    });

    res.on('error', (err) => {
        console.error("Stream Error:", err);
        process.exit(1);
    });
});

req.on('error', (err) => {
    console.error("Request Error:", err);
    console.error("Is the Electron Backend running?");
    process.exit(1);
});

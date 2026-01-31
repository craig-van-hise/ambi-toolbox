import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ffmpegPath = path.join(__dirname, 'snapshot/ffmpeg');
const outputFile = './test_order1.iamf';

const args = [
    '-y',
    '-f', 'lavfi',
    '-i', 'anullsrc=channel_layout=ambisonic 1:sample_rate=48000:duration=1',
    '-mapping_family', '2',
    '-c:a', 'libopus',
    '-b:a', '256k',
    '-f', 'iamf',
    outputFile
];

console.log(`Spawning FFmpeg Order 1 Test: ${ffmpegPath} with args:`, args);

const ffmpeg = spawn(ffmpegPath, args);

ffmpeg.stderr.on('data', (data) => {
    console.error(`FFmpeg stderr: ${data}`);
});

ffmpeg.on('close', (code) => {
    console.log(`FFmpeg exited with code ${code}`);
});

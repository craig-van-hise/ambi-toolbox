import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Use the snapshot ffmpeg
const ffmpegPath = path.join(__dirname, 'snapshot/ffmpeg');
// Use the file user provided in the logs
const inputFile = '/Volumes/TURBO-2024-1/Audio/Mock Up Mixes TURBO/#Ambisonics/Classical/A Furiosa (Maxixe) in TOA dry - 0018 - Group - TOA master.wav';
const outputFile = './test_output_snapshot.iamf';

const args = [
    '-y',
    '-channel_layout', 'ambisonic 3',
    '-i', inputFile,
    '-mapping_family', '2',
    '-c:a', 'libopus',
    '-b:a', '2560k',
    '-f', 'iamf',
    outputFile
];

console.log(`Spawning FFmpeg Snapshot: ${ffmpegPath} with args:`, args);

const ffmpeg = spawn(ffmpegPath, args);

ffmpeg.stderr.on('data', (data) => {
    console.error(`FFmpeg stderr: ${data}`);
});

ffmpeg.on('close', (code) => {
    console.log(`FFmpeg exited with code ${code}`);
});

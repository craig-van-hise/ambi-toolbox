import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ffmpegPath = path.join(__dirname, 'snapshot/ffmpeg');
const inputFile = '/Volumes/TURBO-2024-1/Audio/Mock Up Mixes TURBO/#Ambisonics/Classical/A Furiosa (Maxixe) in TOA dry - 0018 - Group - TOA master.wav';
const outputFile = './test_stream_group.iamf';

const args = [
    '-y',
    '-i', inputFile,
    '-c:a', 'libopus',
    '-b:a', '2560k',
    '-mapping_family', '2', // Still need to ensure encoding is correct
    '-f', 'iamf',
    '-stream_group', 'type=iamf_audio_element:id=1:st=0:audio_element_type=scene',
    outputFile
];

console.log(`Spawning FFmpeg Stream Group Test: ${ffmpegPath} with args:`, args);

const ffmpeg = spawn(ffmpegPath, args);

ffmpeg.stderr.on('data', (data) => {
    console.error(`FFmpeg stderr: ${data}`);
});

ffmpeg.on('close', (code) => {
    console.log(`FFmpeg exited with code ${code}`);
});

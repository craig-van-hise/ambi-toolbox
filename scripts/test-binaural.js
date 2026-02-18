
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const FFMPEG_PATH = path.join(__dirname, '../assets/bin/ffmpeg');
const INPUT_FILE = path.join(__dirname, '../tests/test_16ch.wav');
const OUTPUT_FILE = '/tmp/test-output.webm';
const SOFA_FILE = path.join(__dirname, '../assets/hrtf/Neumann_KU100_48k.sofa');

// PRP #75: 14-Point Lebedev Grid + 2 Padding
const HexadecagonalGrid = {
    channelCount: 16,
    speakerCount: 16,
    channels: ['FL', 'FR', 'FC', 'BL', 'BR', 'BC', 'SL', 'SR', 'WL', 'WR', 'TBL', 'TBC', 'TBR', 'TFC', 'TFL', 'TFR'],
    nodes: [
        { az: 0, el: 0 }, // FL
        { az: 180, el: 0 }, // FR
        { az: 90, el: 0 }, // FC
        { az: -90, el: 0 }, // BL
        { az: 0, el: 90 }, // BR (Top?) PRP says BR but posits 0,90. Actually 0,90 is usually Top Center or similar. Using PRP data.
        { az: 0, el: -90 }, // BC (Bottom?)
        { az: 45, el: 35.3 }, // SL
        { az: 135, el: 35.3 }, // SR
        { az: -135, el: 35.3 }, // WL
        { az: -45, el: 35.3 }, // WR
        { az: 45, el: -35.3 }, // TBL
        { az: 135, el: -35.3 }, // TBC
        { az: -135, el: -35.3 }, // TBR
        { az: -45, el: -35.3 }, // TFC
        // Padding
        { az: 0, el: 0 }, // TFL (Silence)
        { az: 0, el: 0 }  // TFR (Silence)
    ]
};

function generateFilterGraph() {
    // PRP #75 Requirement: pan=hexadecagonal|FL=...
    const grid = HexadecagonalGrid;
    let panParts = [];

    // We mock the weights here just to test syntax
    for (let i = 0; i < grid.channels.length; i++) {
        const chName = grid.channels[i];
        // Mock padding for TFL/TFR (last 2)
        if (chName === 'TFL' || chName === 'TFR') {
            panParts.push(`${chName}=0*c0`);
        } else {
            panParts.push(`${chName}=c0`);
        }
    }

    // Note: If TFL/TFR are silent, they naturally won't have input mapping in real code.
    // Here we map them to c0 just to ensure the SYNTAX of "TFL=..." is accepted by pan=hexadecagonal.

    const panFilter = `pan=hexadecagonal|${panParts.join('|')}`;

    // Sofalizer Syntax: speakers='FL 0 0|FR 180 0|...'
    const speakerDefs = grid.nodes.map((n, i) => {
        const chName = grid.channels[i];
        return `${chName} ${n.az} ${n.el}`;
    }).join('|');

    // PRP #79: Add volume compensation mock (scaleFactor=1.0 -> volume=2.5)
    return `${panFilter} [virt]; [virt] sofalizer=sofa='${SOFA_FILE}':gain=12:speakers='${speakerDefs}' [binaural]; [binaural] volume=2.5 [out]`;
}

if (!fs.existsSync(INPUT_FILE)) {
    console.error("Test input file missing:", INPUT_FILE);
    process.exit(1);
}

const filterComplex = generateFilterGraph();
console.log("Testing Filter Graph:\n", filterComplex);

const args = [
    '-y',
    '-ch_layout', '16c', // Override layout guess (PRP #78)
    '-i', INPUT_FILE,
    '-filter_complex', filterComplex,
    '-map', '[out]', // Map the labeled output from the graph
    '-c:a', 'libopus',
    '-f', 'webm',
    OUTPUT_FILE
];

console.log(`Spawning: ${FFMPEG_PATH} ${args.join(' ')}`);

const ffmpeg = spawn(FFMPEG_PATH, args);

let stderrBuffer = '';
let success = false;

ffmpeg.stderr.on('data', (data) => {
    const chunk = data.toString();
    stderrBuffer += chunk;
    process.stderr.write(chunk); // Stream output to user

    // Fail conditions
    if (chunk.includes('Failed to parse') || chunk.includes('Invalid argument') || chunk.includes('Conversion failed')) {
        console.error("\n❌ TEST FAILED: FFmpeg reported an error.");
        process.exit(1);
    }

    // Success condition
    if (chunk.includes('size=') && chunk.includes('time=')) {
        success = true;
    }
});

ffmpeg.on('close', (code) => {
    if (code === 0 || success) {
        console.log("\n✅ TEST PASSED: Transcoding successful.");
        process.exit(0);
    } else {
        console.error(`\n❌ TEST FAILED: Process exited with code ${code}`);
        process.exit(1);
    }
});

setTimeout(() => {
    if (success) {
        console.log("\n✅ TEST PASSED (Timeout Reached with active stream).");
        ffmpeg.kill();
        process.exit(0);
    } else {
        console.error("\n❌ TEST FAILED: Timeout without success.");
        ffmpeg.kill();
        process.exit(1);
    }
}, 5000);

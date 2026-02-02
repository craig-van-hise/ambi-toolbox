export class WavDecoder {
    static decode(buffer: ArrayBuffer, context: AudioContext): AudioBuffer {
        const view = new DataView(buffer);

        // 1. Sanity Checks
        const riff = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
        const wave = String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11));
        if (riff !== 'RIFF' || wave !== 'WAVE') throw new Error('Not a valid WAV file');

        // 2. Parse Format Chunk
        let offset = 12;
        while (offset < view.byteLength) {
            const chunkId = String.fromCharCode(view.getUint8(offset), view.getUint8(offset + 1), view.getUint8(offset + 2), view.getUint8(offset + 3));
            const chunkSize = view.getUint32(offset + 4, true);

            if (chunkId === 'fmt ') {
                // Parse Format
                const channels = view.getUint16(offset + 10, true);
                const sampleRate = view.getUint32(offset + 12, true);
                const bitDepth = view.getUint16(offset + 22, true);

                // Advance to data
                let dataOffset = offset + 8 + chunkSize;
                // Scan forward for 'data'
                while (dataOffset < view.byteLength) {
                    // Check boundaries
                    if (dataOffset + 8 > view.byteLength) break;

                    const dId = String.fromCharCode(view.getUint8(dataOffset), view.getUint8(dataOffset + 1), view.getUint8(dataOffset + 2), view.getUint8(dataOffset + 3));
                    const dSize = view.getUint32(dataOffset + 4, true);
                    if (dId === 'data') {
                        return this.extractPCM(view, dataOffset + 8, dSize, channels, sampleRate, bitDepth, context);
                    }
                    dataOffset += 8 + dSize;
                }
                break;
            }
            offset += 8 + chunkSize;
        }
        throw new Error('Could not find fmt or data chunk');
    }

    private static extractPCM(view: DataView, offset: number, length: number, channels: number, sampleRate: number, bitDepth: number, ctx: AudioContext): AudioBuffer {
        console.log(`Manual Decode: ${channels}ch @ ${sampleRate}Hz, ${bitDepth}-bit`);

        const frameCount = length / ((bitDepth / 8) * channels);
        const audioBuffer = ctx.createBuffer(channels, frameCount, sampleRate);

        for (let ch = 0; ch < channels; ch++) {
            const channelData = audioBuffer.getChannelData(ch);
            let readIndex = offset + (ch * (bitDepth / 8)); // Interleaved offset
            const step = (bitDepth / 8) * channels;

            for (let i = 0; i < frameCount; i++) {
                if (readIndex >= view.byteLength) break;

                let sample = 0;
                if (bitDepth === 16) {
                    const int16 = view.getInt16(readIndex, true);
                    sample = int16 / 32768.0;
                } else if (bitDepth === 24) {
                    const byte1 = view.getUint8(readIndex);
                    const byte2 = view.getUint8(readIndex + 1);
                    const byte3 = view.getUint8(readIndex + 2);
                    // Combine to 24-bit int
                    let val = (byte3 << 16) | (byte2 << 8) | byte1;
                    // Sign extension
                    if (val & 0x800000) val = val | -16777216;
                    sample = val / 8388608.0;
                } else if (bitDepth === 32) {
                    sample = view.getFloat32(readIndex, true);
                }

                channelData[i] = sample;
                readIndex += step;
            }
        }
        return audioBuffer;
    }
}

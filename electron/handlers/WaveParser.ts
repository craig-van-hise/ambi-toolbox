import fs from 'node:fs/promises';

export interface WavHeader {
    channels: number;
    sampleRate: number;
    bitDepth: number;
    codec: string;
}

/**
 * Fast WAV header parser
 * Reads only the first 128 bytes to extract fmt chunk data.
 */
export async function parseWavHeader(filePath: string): Promise<WavHeader | null> {
    let fileHandle;
    try {
        fileHandle = await fs.open(filePath, 'r');
        const buffer = Buffer.alloc(128);
        const { bytesRead } = await fileHandle.read(buffer, 0, 128, 0);

        if (bytesRead < 44) return null;

        // Check RIFF header
        // "RIFF" at 0, "WAVE" at 8
        if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WAVE') {
            return null;
        }

        // Find "fmt " chunk
        // Standard WAV often has "fmt " at 12
        let fmtOffset = 12;

        // Simple scanner for "fmt "
        while (fmtOffset < bytesRead - 8) {
            const chunkId = buffer.toString('ascii', fmtOffset, fmtOffset + 4);
            const chunkSize = buffer.readUInt32LE(fmtOffset + 4);

            if (chunkId === 'fmt ') {
                // Found fmt chunk
                const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
                const channels = buffer.readUInt16LE(fmtOffset + 10);
                const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
                // byteRate at 16
                // blockAlign at 20
                const bitDepth = buffer.readUInt16LE(fmtOffset + 22);

                let codec = 'PCM';
                if (audioFormat === 1) codec = 'PCM';
                else if (audioFormat === 3) codec = 'IEEE Float';
                else if (audioFormat === 65534) codec = 'Extensible';
                else codec = `Unknown (${audioFormat})`;

                return {
                    channels,
                    sampleRate,
                    bitDepth,
                    codec
                };
            }

            // Move to next chunk
            fmtOffset += 8 + chunkSize;
        }

        return null;
    } catch (e) {
        // Ignore errors, fall back to slow path
        return null;
    } finally {
        if (fileHandle) await fileHandle.close();
    }
}

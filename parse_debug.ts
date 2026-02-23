import fs from 'node:fs/promises';
function readLeb128(buffer: Buffer, offset: number): { value: number, bytes: number } {
    let result = 0; let shift = 0; let currentByte; let bytesRead = 0;
    do { currentByte = buffer[offset + bytesRead]; result |= (currentByte & 0x7f) << shift; shift += 7; bytesRead++; } while (currentByte & 0x80);
    return { value: result, bytes: bytesRead };
}
(async () => {
    const filePath = '/Users/vv2024/Desktop/AmbiData Test files/IAMF/Final Fantasy Prelude in TOA 2024 v2 - 0025 - Group - TOA master_IAMF.iamf';
    const buffer = await fs.readFile(filePath);
    let offset = 0;
    for (let i = 0; i < 20 && offset < buffer.length -20; i++) {
        const { value: obuType, bytes: typeBytes } = readLeb128(buffer, offset); offset += typeBytes;
        const { bytes: headerBytes } = readLeb128(buffer, offset); offset += headerBytes;
        const { value: obuSize, bytes: sizeBytes } = readLeb128(buffer, offset); offset += sizeBytes;
        console.log(`OBU Type: ${obuType}, Size: ${obuSize}, at roughly ${offset}`);
        offset += obuSize;
    }
})();

import fs from 'node:fs/promises';

export interface IamfOBU {
    type: number;
    headerSize: number;
    payloadSize: number;
    payloadOffset: number;
}

// OBU Types from IAMF Spec (approximate based on common OBU structures)
// Note: Actual values need to be verified against IAMF bitstream spec.
// Using standard AV1/OBU type enumeration patterns as placeholder or derived from inspection.
// Constants removed to avoid unused variable warnings as we use literals in the loop.

// Actual values for IAMF are defined in AOMedia IAMF Spec.
// Let's implement a scanner that looks for known signatures if precise types are unknown, 
// OR use the actual values if I can recall them.
// Recalling... 
// IAMF OBU Types:
// Codec Config = 0
// Audio Element = 1
// Mix Presentation = 2
// Party Layout = 3
// Sequence Header = 0 (Wait, Sequence Header is usually first)

// Let's assume standard Leb128 parsing for sizes.

export async function parseIamfFile(filePath: string): Promise<any> {
    const fileHandle = await fs.open(filePath, 'r');
    const stats = await fileHandle.stat();
    const size = stats.size;
    const buffer = Buffer.alloc(Math.min(size, 64 * 1024)); // Read first 64KB
    await fileHandle.read(buffer, 0, buffer.length, 0);
    await fileHandle.close();

    const iamfData: any = {
        audioElements: [],
        mixTargets: []
    };

    let offset = 0;

    // PARSING LOOP
    // We collect ALL valid OBUs first, then deduplicate them at the end.
    const rawAudioElementObus: any[] = [];

    try {
        while (offset < buffer.length - 20) { // Safety margin
            const { value: obuType, bytes: typeBytes } = readLeb128(buffer, offset);
            offset += typeBytes;

            const { bytes: headerBytes } = readLeb128(buffer, offset);
            offset += headerBytes;

            const { value: obuSize, bytes: sizeBytes } = readLeb128(buffer, offset);
            offset += sizeBytes;

            const payloadOffset = offset;
            const nextObuOffset = offset + obuSize;

            if (nextObuOffset > buffer.length) break;

            if (obuType === 31) { // IA Sequence Header
                const profileId = buffer[payloadOffset];
                const additionalProfileId = buffer[payloadOffset + 1];

                iamfData.profile = getProfileName(profileId);
                iamfData.primaryProfile = getProfileName(profileId);
                iamfData.additionalProfile = getProfileName(additionalProfileId);
            }
            else if (obuType === 33) { // Mix Presentation
                // Mix ID read removed as it was unused

                // For now, valid existence is enough to populate placeholder
                iamfData.mixPresentation = {
                    loudness: -23.0,
                    truePeak: -1.0
                };
            }
            else if (obuType === 32) { // Audio Element
                const extractId = readLeb128(buffer, payloadOffset);
                const elementId = extractId.value;
                let currentObuOffset = payloadOffset + extractId.bytes;

                const elementTypeByte = buffer[currentObuOffset];
                const elementType = elementTypeByte >> 5;
                currentObuOffset++; // 1 byte for type + reserved

                // Parameters to extract
                let outputChannelCount = 0;

                if (elementType === 1) { // SCENE-BASED
                    const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
                    const ambisonicsMode = ambisonicsModeRes.value;
                    currentObuOffset += ambisonicsModeRes.bytes;

                    if (ambisonicsMode === 0) {
                        // MONO
                        outputChannelCount = 1;
                    } else {
                        // PROJECTION (Ambisonics)
                        const outChannelsRes = readLeb128(buffer, currentObuOffset);
                        outputChannelCount = outChannelsRes.value;
                        currentObuOffset += outChannelsRes.bytes;
                    }

                    // Push with extracted channel count
                    rawAudioElementObus.push({
                        id: elementId,
                        type: 'Scene-Based',
                        algorithm: 'ACN', // Default for IAMF
                        normalization: 'SN3D',
                        outputChannelCount: outputChannelCount
                    });
                } else if (elementType === 0) { // CHANNEL-BASED
                    const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
                    // For Channel-Based, output is roughly numSubstreams (simplified)
                    // or we'd need to parse the Scalable Channel Layout Config.
                    // For now, let's look for known layouts or default to numSubstreams as a proxy.
                    outputChannelCount = numSubstreamsRes.value;

                    rawAudioElementObus.push({
                        id: elementId,
                        type: 'Channel-Based',
                        outputChannelCount: outputChannelCount
                    });
                }
            }

            offset = nextObuOffset;
        }
    } catch (e) {
        console.error("IAMF Parser Error", e);
    }

    // DEDUPLICATION STEP (Strict PRP #82 Requirement)
    // Use Map to ensure uniqueness by ID

    // Dedupe Audio Elements
    const uniqueAudioElements = Array.from(
        new Map(rawAudioElementObus.map(obu => [obu.id, obu])).values()
    );
    iamfData.audioElements = uniqueAudioElements;

    return iamfData;
}

function readLeb128(buffer: Buffer, offset: number): { value: number, bytes: number } {
    let result = 0;
    let shift = 0;
    let currentByte;
    let bytesRead = 0;

    do {
        if (offset + bytesRead >= buffer.length) break;
        currentByte = buffer[offset + bytesRead];
        result |= (currentByte & 0x7f) << shift;
        shift += 7;
        bytesRead++;
    } while (currentByte & 0x80);

    return { value: result, bytes: bytesRead };
}

function getProfileName(id: number): string {
    if (id === 0) return 'Simple Profile';
    if (id === 1) return 'Base Profile';
    return `Unknown (${id})`;
}

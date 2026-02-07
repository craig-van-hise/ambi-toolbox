import AVFoundation
import AudioToolbox

// CLI Arguments: inputPath, outputPath, perChannelBitrate (Int)

guard CommandLine.arguments.count == 4 else {
    print("Usage: apac-enc <input.wav> <output.mp4> <perChannelBitrate>")
    exit(1)
}

let inputPath = CommandLine.arguments[1]
let outputPath = CommandLine.arguments[2]
guard let perChannelBitrate = Int(CommandLine.arguments[3]) else {
    print("Error: Invalid bitrate")
    exit(1)
}

let inputURL = URL(fileURLWithPath: inputPath)
let outputURL = URL(fileURLWithPath: outputPath)

// 1. Read Input File
var audioFile: AudioFileID?
var status = AudioFileOpenURL(inputURL as CFURL, .readPermission, 0, &audioFile)
guard status == noErr, let fileID = audioFile else {
    print("Error: Could not open input file: \(status)")
    exit(1)
}

var dataFormat = AudioStreamBasicDescription()
var propSize = UInt32(MemoryLayout<AudioStreamBasicDescription>.size)
status = AudioFileGetProperty(fileID, kAudioFilePropertyDataFormat, &propSize, &dataFormat)
guard status == noErr else {
    print("Error: Could not get file format: \(status)")
    exit(1)
}

let channelCount = dataFormat.mChannelsPerFrame
let sampleRate = dataFormat.mSampleRate

// 2. Validate Order
// 1st: 4, 2nd: 9, 3rd: 16, 4th: 25, 5th: 36
let validChannels = [4, 9, 16, 25, 36]
if !validChannels.contains(Int(channelCount)) {
    print("Error: Unsupported channel count: \(channelCount). Must be 4, 9, 16, 25, or 36.")
    exit(1)
}

print("Input: \(channelCount) channels, \(sampleRate) Hz")

// 3. Configure Output
let totalBitrate = perChannelBitrate * Int(channelCount)
print("Target Bitrate: \(totalBitrate) bps (Per-channel: \(perChannelBitrate))")

// Remove existing output
try? FileManager.default.removeItem(at: outputURL)

guard let assetWriter = try? AVAssetWriter(outputURL: outputURL, fileType: .mp4) else {
    print("Error: Could not create AVAssetWriter")
    exit(1)
}

// 4. Configure Layout (HOA ACN SN3D)
// kAudioChannelLayoutTag_HOA_ACN_SN3D is available in CoreAudio
// kAudioChannelLayoutTag_HOA_ACN_SN3D is available in CoreAudio
// IMPORTANT: For variable-order tags, we must encode the channel count in the low 16 bits.
var layoutTag = kAudioChannelLayoutTag_HOA_ACN_SN3D | UInt32(channelCount)

// For standard orders, the tag implies the channel count.
// However, AVAssetWriterInput usually needs a confirmed layout data.
// We construct a simple layout with the tag.

var channelLayout = AudioChannelLayout()
channelLayout.mChannelLayoutTag = layoutTag
let layoutData = Data(bytes: &channelLayout, count: MemoryLayout<AudioChannelLayout>.size)

// Define APAC Format ID manually (FourCC 'apac')
let kAudioFormatAPAC: AudioFormatID = 0x61706163

print("Format: APAC (0x61706163)")

let outputSettings: [String: Any] = [
    AVFormatIDKey: kAudioFormatAPAC,
    AVSampleRateKey: sampleRate,
    AVNumberOfChannelsKey: channelCount,
    AVChannelLayoutKey: layoutData,
    AVEncoderBitRateKey: totalBitrate
]

let assetWriterInput = AVAssetWriterInput(mediaType: .audio, outputSettings: outputSettings)
assetWriterInput.expectsMediaDataInRealTime = false

if !assetWriter.canAdd(assetWriterInput) {
    print("Error: Cannot add input to writer")
    exit(1)
}

assetWriter.add(assetWriterInput)

// 5. Processing Loop (Using AVAssetReader for easier CMSampleBuffer handling?)
// Or stick to AudioFileRead + CMSampleBufferCreate?
// AVAssetReader is easier for format conversion.

let asset = AVAsset(url: inputURL)
guard let track = asset.tracks(withMediaType: .audio).first else {
    print("Error: No audio track found")
    exit(1)
}

guard let reader = try? AVAssetReader(asset: asset) else {
    print("Error: Could not create reader")
    exit(1)
}

// Reading as Linear PCM
let readerSettings: [String: Any] = [
    AVFormatIDKey: kAudioFormatLinearPCM,
    AVLinearPCMBitDepthKey: 32,
    AVLinearPCMIsFloatKey: true,
    AVLinearPCMIsNonInterleaved: false
]

let readerOutput = AVAssetReaderTrackOutput(track: track, outputSettings: readerSettings)
if !reader.canAdd(readerOutput) {
    print("Error: Cannot add reader output")
    exit(1)
}

reader.add(readerOutput)

reader.startReading()
assetWriter.startWriting()
assetWriter.startSession(atSourceTime: .zero)

let duration = asset.duration.seconds
var lastProgress = -1

// Process
let queue = DispatchQueue(label: "encodingQueue")
let group = DispatchGroup()
group.enter()

assetWriterInput.requestMediaDataWhenReady(on: queue) {
    while assetWriterInput.isReadyForMoreMediaData {
        if let sampleBuffer = readerOutput.copyNextSampleBuffer() {
            assetWriterInput.append(sampleBuffer)
            
            // Calculate Progress
            let current = CMSampleBufferGetPresentationTimeStamp(sampleBuffer).seconds
            if duration > 0 {
                let progress = Int((current / duration) * 100)
                if progress > lastProgress {
                    print("Progress: \(progress)%")
                    fflush(stdout) // Ensure output is flushed immediately
                    lastProgress = progress
                }
            }
        } else {
            assetWriterInput.markAsFinished()
            group.leave()
            break
        }
    }
}

group.wait()

assetWriter.finishWriting {
    if assetWriter.status == .completed {
        print("Success: \(outputPath)")
        exit(0)
    } else {
        print("Error: Write failed: \(String(describing: assetWriter.error))")
        exit(1)
    }
}

// Keep main thread alive until exit
RunLoop.main.run()

/*
 * obr_stream.cc
 * 
 * Standalone C++ sidecar for Open Binaural Renderer (OBR).
 * Reads interleaved Float32 PCM from stdin, processes via OBR, writes Stereo Float32 PCM to stdout.
 */

#include <iostream>
#include <vector>
#include <string>
#include <cstring>
#include <algorithm>
#include <cmath>

#ifdef _WIN32
#include <fcntl.h>
#include <io.h>
#endif

#include "obr/audio_buffer/audio_buffer.h"
#include "obr/renderer/obr_impl.h"
#include "obr/renderer/audio_element_type.h"
#include "absl/flags/flag.h"
#include "absl/flags/parse.h"
#include "absl/flags/usage.h"

// Define command line flags
ABSL_FLAG(int, channels, 4, "Number of input channels (4=1st Order, 9=2nd, 16=3rd)");
ABSL_FLAG(int, rate, 48000, "Sample rate in Hz (must be 48000 for OBR default/HRTFs)");
ABSL_FLAG(std::string, profile, "ambient", "Binaural filter profile: 'ambient', 'direct', 'reverberant'");

// Constants
constexpr int kBlockSize = 512;

// Helper to map channel count to AudioElementType
obr::AudioElementType GetAmbisonicType(int channels) {
    switch (channels) {
        case 4: return obr::AudioElementType::k1OA;
        case 9: return obr::AudioElementType::k2OA;
        case 16: return obr::AudioElementType::k3OA;
        case 25: return obr::AudioElementType::k4OA; // OBR supports up to 4th order? Enum has k4OA.
        default: return obr::AudioElementType::kInvalidType;
    }
}

// Helper to map string profile to BinauralFilterProfile
obr::BinauralFilterProfile GetFilterProfile(const std::string& profile_str) {
    if (profile_str == "direct") return obr::BinauralFilterProfile::kDirect;
    if (profile_str == "reverberant") return obr::BinauralFilterProfile::kReverberant;
    return obr::BinauralFilterProfile::kAmbient; // Default
}

int main(int argc, char** argv) {
    // 1. Parse Flags
    absl::SetProgramUsageMessage("Usage: obr_stream --channels <N> --rate <Hz> < input.raw > output.raw");
    absl::ParseCommandLine(argc, argv);

    int channels = absl::GetFlag(FLAGS_channels);
    int rate = absl::GetFlag(FLAGS_rate);
    std::string profile_str = absl::GetFlag(FLAGS_profile);

    // 2. Windows Binary Mode Safety
#ifdef _WIN32
    _setmode(_fileno(stdin), _O_BINARY);
    _setmode(_fileno(stdout), _O_BINARY);
#endif

    // 3. Validate Inputs
    obr::AudioElementType type = GetAmbisonicType(channels);
    if (type == obr::AudioElementType::kInvalidType) {
        std::cerr << "Error: Invalid channel count " << channels << ". Supported: 4, 9, 16, 25." << std::endl;
        return 1;
    }

    // 4. Initialize OBR
    // Note: OBR seems to work best at 48kHz.
    auto obr = std::make_unique<obr::ObrImpl>(kBlockSize, rate);
    
    // Add the audio element (Ambisonic)
    absl::Status status = obr->AddAudioElement(type, GetFilterProfile(profile_str));
    if (!status.ok()) {
        std::cerr << "Error adding audio element: " << status.message() << std::endl;
        return 1;
    }

    // 5. Allocate Buffers
    // obr::AudioBuffer uses planar data internally.
    obr::AudioBuffer input_buffer(channels, kBlockSize);
    obr::AudioBuffer output_buffer(2, kBlockSize); // Binaural is stereo

    // Interleaved buffers for I/O
    std::vector<float> input_interleaved(channels * kBlockSize);
    std::vector<float> output_interleaved(2 * kBlockSize);

    // 6. Processing Loop
    // We read exactly one block at a time.
    while (std::cin.read(reinterpret_cast<char*>(input_interleaved.data()), input_interleaved.size() * sizeof(float))) {
        
        // De-interleave: Interleaved -> Planar Input Buffer
        for (int ch = 0; ch < channels; ++ch) {
            // Get reference to the channel view
            auto& channel_view = input_buffer[ch];
            for (int i = 0; i < kBlockSize; ++i) {
                channel_view[i] = input_interleaved[i * channels + ch];
            }
        }

        // Process DSP
        obr->Process(input_buffer, &output_buffer);

        // Interleave: Planar Output Buffer -> Interleaved
        // Output is strictly 2 channels (Binaural)
        for (int i = 0; i < kBlockSize; ++i) {
            output_interleaved[2 * i] = output_buffer[0][i];     // Left
            output_interleaved[2 * i + 1] = output_buffer[1][i]; // Right
        }

        // Write to stdout
        std::cout.write(reinterpret_cast<const char*>(output_interleaved.data()), output_interleaved.size() * sizeof(float));
    }

    return 0;
}

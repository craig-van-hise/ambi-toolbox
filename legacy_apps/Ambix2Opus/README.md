# Ambix2Opus

[Support my work on GitHub Sponsors](https://github.com/sponsors/craig-van-hise)

Ambix2Opus is a native macOS application for converting Ambisonics audio files (Ambix format) to Opus.

## Attribution

This software uses the **Opus** codec library.
Copyright 2001-2011 Xiph.Org, Skype Limited, Octasic, Jean-Marc Valin, Timothy B. Terriberry, CSIRO, Gregory Maxwell, Mark Borgerding, Erik de Castro Lopo.

For full license details, see [LICENSE_OPUS.md](LICENSE_OPUS.md).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Installation & Usage
   
### For Users (Release)
1. Open the `Compiled` folder.
2. Double-click **Ambix2Opus.app** to run.

### For Developers (Source)
1. Open the `Source` folder in Terminal.
2. Run the build script:
   ```bash
   cd Source
   ./build_app.sh
   ```
   This will:
   - Compile the Swift code.
   - Generate the App Icon from `Assets/`.
   - Package everything into `../Compiled/Ambix2Opus.app`.
   
## Features
- Drag and drop interface
- Supports WAV, CAF, and AMB formats
- Configurable bitrate (256kbps - 1024kbps)
- **Mapping Family 2**: Strictly enforced for ALL Ambisonics orders (1st, 2nd, 3rd, 4th, 5th, etc.) to ensure proper spatial metadata.
- **Mapping Family 255**: Used only for non-Ambisonics inputs (stereo, discrete tracks, etc).

## Building

This project is a Swift Package Manager executable.

```bash
swift build
```

The resulting executable can be found in `.build/debug/Ambix2Opus`.

## Requirements
- macOS 13.0+
- FFmpeg and FFprobe binaries (included or expected in bundle/path)

## Author

**Craig Van Hise** - *Initial work* - (https://github.com/craig-van-hise)
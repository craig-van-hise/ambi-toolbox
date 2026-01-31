#!/bin/bash
set -e

SOURCE_ICON="../Assets/Ambix2OpusIcon.png"
ICONSET_DIR="Ambix2Opus.iconset"
OUTPUT_ICNS="AppIcon.icns"

if [ ! -f "$SOURCE_ICON" ]; then
    echo "❌ Error: Source icon $SOURCE_ICON not found!"
    exit 1
fi

echo "🎨 Creating iconset..."
mkdir -p "$ICONSET_DIR"

# Generate all required sizes
sips -s format png -z 16 16     "$SOURCE_ICON" --out "${ICONSET_DIR}/icon_16x16.png" > /dev/null
sips -s format png -z 32 32     "$SOURCE_ICON" --out "${ICONSET_DIR}/icon_16x16@2x.png" > /dev/null
sips -s format png -z 32 32     "$SOURCE_ICON" --out "${ICONSET_DIR}/icon_32x32.png" > /dev/null
sips -s format png -z 64 64     "$SOURCE_ICON" --out "${ICONSET_DIR}/icon_32x32@2x.png" > /dev/null
sips -s format png -z 128 128   "$SOURCE_ICON" --out "${ICONSET_DIR}/icon_128x128.png" > /dev/null
sips -s format png -z 256 256   "$SOURCE_ICON" --out "${ICONSET_DIR}/icon_128x128@2x.png" > /dev/null
sips -s format png -z 256 256   "$SOURCE_ICON" --out "${ICONSET_DIR}/icon_256x256.png" > /dev/null
sips -s format png -z 512 512   "$SOURCE_ICON" --out "${ICONSET_DIR}/icon_256x256@2x.png" > /dev/null
sips -s format png -z 512 512   "$SOURCE_ICON" --out "${ICONSET_DIR}/icon_512x512.png" > /dev/null
sips -s format png -z 1024 1024 "$SOURCE_ICON" --out "${ICONSET_DIR}/icon_512x512@2x.png" > /dev/null

echo "📦 Converting to .icns..."
iconutil -c icns "$ICONSET_DIR" -o "$OUTPUT_ICNS"

echo "🧹 Cleaning up..."
rm -rf "$ICONSET_DIR"

echo "✅ Generated $OUTPUT_ICNS"

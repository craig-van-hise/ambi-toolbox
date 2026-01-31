#!/bin/bash
set -e

APP_NAME="Ambix2Opus_Stage"
TARGET_NAME="Ambix2OpusEngine"
BUILD_DIR=".build/release"
# Resolve absolute path to project root (parent of current script dir)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
APP_BUNDLE="${PROJECT_ROOT}/Compiled/${APP_NAME}.app"

echo "📍 Debug Paths:"
echo "   Script: $SCRIPT_DIR"
echo "   Root:   $PROJECT_ROOT"
echo "   Output: $APP_BUNDLE"
CONTENTS_DIR="${APP_BUNDLE}/Contents"
MACOS_DIR="${CONTENTS_DIR}/MacOS"
RESOURCES_DIR="${CONTENTS_DIR}/Resources"

echo "🚀 Building ${APP_NAME} (RELEASE MODE)..."
swift build -c release

echo "📦 Packaging ${APP_NAME}.app..."
mkdir -p "../Compiled"
rm -rf "${APP_BUNDLE}"
mkdir -p "${MACOS_DIR}"
mkdir -p "${RESOURCES_DIR}"

# Run Icon Generation
echo "🎨 Generating Icon..."
cd Scripts
./create_icon.sh
cd ..

# Copy Binary
# Ensure strict overwrite
rm -f "${MACOS_DIR}/${APP_NAME}"
cp "${BUILD_DIR}/${TARGET_NAME}" "${MACOS_DIR}/${APP_NAME}"

# Copy Resources (FFmpeg binaries)
if [ -f "Vendor/ffmpeg" ]; then
    cp "Vendor/ffmpeg" "${RESOURCES_DIR}/"
    echo "   -> Copied ffmpeg from Vendor"
else
    echo "⚠️ Warning: ffmpeg not found in Vendor!"
fi

if [ -f "Vendor/ffprobe" ]; then
    cp "Vendor/ffprobe" "${RESOURCES_DIR}/"
    echo "   -> Copied ffprobe from Vendor"
else
    echo "⚠️ Warning: ffprobe not found in Vendor!"
fi

# Copy App Icon if exists (create_icon.sh creates it in Scripts folder? No, let's check create_icon.sh output)
# create_icon.sh outputs to OUTPUT_ICNS="AppIcon.icns" in current dir (Scripts).
if [ -f "Scripts/AppIcon.icns" ]; then
    cp "Scripts/AppIcon.icns" "${RESOURCES_DIR}/"
    echo "   -> Copied AppIcon.icns"
fi

# Create Info.plist
cat > "${CONTENTS_DIR}/Info.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>${APP_NAME}</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
    <key>CFBundleIdentifier</key>
    <string>com.example.Ambix2Opus.v7</string>
    <key>CFBundleName</key>
    <string>${APP_NAME}</string>
    <key>CFBundleShortVersionString</key>
    <string>4.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>LSMinimumSystemVersion</key>
    <string>13.0</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
EOF

# ... (previous code) ...

# Final Rename to user-requested name
# This defeats caching by compiling as a new name first
if [ -d "${PROJECT_ROOT}/Compiled/Ambix2Opus.app" ]; then
    rm -rf "${PROJECT_ROOT}/Compiled/Ambix2Opus.app"
fi
mv "${APP_BUNDLE}" "${PROJECT_ROOT}/Compiled/Ambix2Opus.app"

echo "✅ Done! Final App: ${PROJECT_ROOT}/Compiled/Ambix2Opus.app"

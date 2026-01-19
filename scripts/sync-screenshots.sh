#!/bin/bash
# Sync screenshots from BPSTracker iOS project to landing page

BPSTRACKER_PATH="/Users/coolthor/BPSTracker"
LANDING_PAGE_PATH="/Users/coolthor/ai-muninn-landing-page"
SCREENSHOTS_DIR="$LANDING_PAGE_PATH/public/screenshots"

echo "📱 Syncing screenshots from BPSTracker..."

# Check if BPSTracker repo exists
if [ ! -d "$BPSTRACKER_PATH" ]; then
    echo "❌ BPSTracker not found at $BPSTRACKER_PATH"
    exit 1
fi

# Create screenshots directory if it doesn't exist
mkdir -p "$SCREENSHOTS_DIR"

# Look for screenshots in common iOS project locations
SOURCES=(
    "$BPSTRACKER_PATH/Screenshots"
    "$BPSTRACKER_PATH/Assets/Screenshots"
    "$BPSTRACKER_PATH/BPSTracker/Screenshots"
)

FOUND=false
for SRC in "${SOURCES[@]}"; do
    if [ -d "$SRC" ]; then
        echo "✅ Found screenshots at: $SRC"
        cp -v "$SRC"/*.{png,PNG,jpg,JPG,jpeg,JPEG} "$SCREENSHOTS_DIR/" 2>/dev/null
        FOUND=true
        break
    fi
done

if [ "$FOUND" = false ]; then
    echo "⚠️  No screenshots folder found. Check these locations:"
    for SRC in "${SOURCES[@]}"; do
        echo "   - $SRC"
    done
    echo ""
    echo "💡 Tip: Export screenshots from iOS Simulator and place in one of the above folders"
fi

echo ""
echo "📁 Current screenshots in landing page:"
ls -la "$SCREENSHOTS_DIR/"

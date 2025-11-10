#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Kullanım: $0 /path/to/dmg"
  exit 1
fi

DMG_PATH="$1"
if [[ ! -f "$DMG_PATH" ]]; then
  echo "DMG bulunamadı: $DMG_PATH"
  exit 1
fi

echo "🔧 DMG mount ediliyor..."
MOUNT_DIR=$(hdiutil attach "$DMG_PATH" | grep Volumes | awk '{print $3}')

if [[ -z "$MOUNT_DIR" ]]; then
  echo "❌ DMG mount edilemedi"
  exit 1
fi

echo "📱 Uygulama bulunuyor..."
APP_PATH=$(find "$MOUNT_DIR" -name "*.app" -maxdepth 1 -type d | head -n 1)

if [[ -z "$APP_PATH" ]]; then
  echo "❌ Uygulama bulunamadı"
  hdiutil detach "$MOUNT_DIR"
  exit 1
fi

APP_NAME=$(basename "$APP_PATH")
echo "✅ Bulundu: $APP_NAME"

# Temporary directory for signed app
TEMP_DIR=$(mktemp -d)
SIGNED_APP="$TEMP_DIR/$APP_NAME"

echo "📋 Uygulama kopyalanıyor..."
cp -R "$APP_PATH" "$SIGNED_APP"

echo "📝 Ad-hoc imzalama yapılıyor..."
codesign --force --deep --sign - "$SIGNED_APP"

echo "💾 Yeni DMG oluşturuluyor..."
hdiutil detach "$MOUNT_DIR"

# Create new DMG name
DMG_DIR=$(dirname "$DMG_PATH")
DMG_BASENAME=$(basename "$DMG_PATH" .dmg)
NEW_DMG="$DMG_DIR/${DMG_BASENAME}-signed.dmg"

hdiutil create -volname "$APP_NAME" -srcfolder "$SIGNED_APP" -ov -format UDZO "$NEW_DMG"

echo "🧹 Temizlik..."
rm -rf "$TEMP_DIR"

echo "✅ Tamamlandı!"
echo "📦 İmzalı DMG: $NEW_DMG"
echo ""
echo "🔍 Doğrulama:"
echo "  codesign --verify --deep --verbose $NEW_DMG"

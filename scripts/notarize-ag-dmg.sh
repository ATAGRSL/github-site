#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Kullanım: $0 /path/to/AG\ Veri\ Maskeleme.dmg"
  exit 1
fi

DMG_PATH="$1"
if [[ ! -f "$DMG_PATH" ]]; then
  echo "DMG bulunamadı: $DMG_PATH"
  exit 1
fi

if [[ -z "${APPLE_ID:-}" || -z "${APPLE_TEAM_ID:-}" || -z "${APPLE_APP_PASSWORD:-}" ]]; then
  echo "Lütfen APPLE_ID, APPLE_TEAM_ID ve APPLE_APP_PASSWORD ortam değişkenlerini tanımlayın."
  exit 1
fi

xcrun notarytool submit "$DMG_PATH" \
  --apple-id "$APPLE_ID" \
  --team-id "$APPLE_TEAM_ID" \
  --password "$APPLE_APP_PASSWORD" \
  --wait

xcrun stapler staple "$DMG_PATH"
spctl --assess --type open -v "$DMG_PATH"

shasum -a 256 "$DMG_PATH"
echo ""
echo "DMG notarize edildi. Sitede yayınlamak için:"
echo "  node scripts/update-dmg.mjs \"$DMG_PATH\""

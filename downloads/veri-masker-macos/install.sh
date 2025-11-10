#!/usr/bin/env bash

set -euo pipefail

TARGET_DIR="/usr/local/bin"
BINARY_NAME="veri-masker"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_BIN="${SCRIPT_DIR}/${BINARY_NAME}"

print_usage() {
  cat <<'EOF'
Veri Masker Kurulum Scripti

Kullanım:
  ./install.sh [--target /custom/bin]

Opsiyonlar:
  --target    İkili dosyanın kopyalanacağı dizin (varsayılan: /usr/local/bin)

Script, veri-masker dosyasını belirtilen dizine kopyalar ve yürütme izni verir.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target)
      TARGET_DIR="$2"
      shift 2
      ;;
    -h|--help)
      print_usage
      exit 0
      ;;
    *)
      echo "Bilinmeyen argüman: $1"
      print_usage
      exit 1
      ;;
  esac
done

if [[ ! -f "${SOURCE_BIN}" ]]; then
  echo "Hata: ${SOURCE_BIN} bulunamadı."
  exit 1
fi

mkdir -p "${TARGET_DIR}"
cp "${SOURCE_BIN}" "${TARGET_DIR}/${BINARY_NAME}"
chmod +x "${TARGET_DIR}/${BINARY_NAME}"

echo "✅ ${BINARY_NAME} ${TARGET_DIR} dizinine kopyalandı."
echo "ℹ️  Kurulum doğrulaması için: ${BINARY_NAME} --version"
echo "⚠️  Komut bulunmazsa PATH değişkeninize ${TARGET_DIR} ekleyin."

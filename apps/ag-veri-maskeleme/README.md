# AG Veri Maskeleme (SwiftUI macOS Uygulaması)

SwiftUI tabanlı bu uygulama, CSV/JSON dosyalarındaki hassas alanları maskelemenizi sağlar. Electron sürümü yerine native bir deneyim sunar.

## Gereksinimler
- macOS 13 veya üstü
- Xcode 15+
- Apple Developer ID (DMG imzalama/notarization için)

## Çalıştırma
```bash
cd apps/ag-veri-maskeleme
swift run
```
Bu komut, Swift Package Manager ile uygulamayı debug modunda açar.

## Xcode Projesi
"File > Open" ile `Package.swift` dosyasını Xcode’da açıp run edebilirsiniz.

## DMG üretimi
1. Xcode’da "Product > Archive" yapın.
2. Organizer’da "Distribute App > Developer ID > Upload" adımlarını izleyin (notarization).  
   veya komut satırıyla:
   ```bash
   xcodebuild -scheme AGVeriMaskeleme -configuration Release
   xcrun notarytool submit "AG Veri Maskeleme.dmg" --apple-id <id> --team-id <team> --password <app-password> --wait
   xcrun stapler staple "AG Veri Maskeleme.dmg"
   ```
3. `node scripts/update-dmg.mjs /path/to/AG\ Veri\ Maskeleme.dmg` çalıştırarak DMG’yi `public/downloads/ag-veri-maskeleme.dmg` üzerine kopyalayın ve hash bilgisini güncelleyin.

## Özellikler
- Kolon bazlı stratejiler: Mask, Hash(SHA-256), Random, Redact.
- Demo datası yükleme, SHA kopyalama, otomatik Finder’da gösterme.
- SwiftUI arabirimi ve `MaskingService` ile yeniden kullanılabilir mantık.

## Notlar
- `Resources/SampleData` klasörü App bundle’a kopyalanır.
- Entitlements/notarization için Xcode proje ayarlarında “Hardened Runtime” aktif edilmelidir.

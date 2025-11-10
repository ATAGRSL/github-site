# AG Veri Maskeleme (SwiftUI macOS Uygulaması)

1. `AG Veri Maskeleme.dmg` dosyasını indirip açın.
2. `Veri Masker.app` simgesini `Applications` klasörüne sürükleyin.
3. Spotlight ile “Veri Masker”i açın ve CSV/JSON dosyanızı sürükleyin.

Özellikler:

- SwiftUI tabanlı native arayüz (drag & drop, canlı ön izleme, demo datası)
- Kolon bazlı stratejiler: Mask, Hash (SHA-256), Random, Redact
- Maskelenmiş dosyayı otomatik Finder’da açma, JSON ön izlemesini panoya kopyalama

Notarizasyon:

- Yayınladığınız DMG’yi her sürümde şu komutlarla doğrulayın:
  ```bash
  shasum -a 256 AG\ Veri\ Maskeleme.dmg
  xcrun notarytool submit AG\ Veri\ Maskeleme.dmg --apple-id <ID> --team-id <TEAM> --password <APP-PASS> --wait
  xcrun stapler staple AG\ Veri\ Maskeleme.dmg
  ```
- İndirdikten sonra doğrulama için:
  ```bash
  spctl --assess --type open --context context:primary-signature -v /Volumes/AG\ Veri\ Maskeleme/Veri\ Masker.app
  ```

- Siteye koymadan önce `node scripts/update-dmg.mjs /path/to/AG\ Veri\ Maskeleme.dmg` komutunu çalıştırarak DMG’yi `public/downloads/` altına kopyalayın ve hash bilgisini güncelleyin.

Gatekeeper:

- Notarize edilmiş DMG’yi indirirken Safari/Chrome yine de `com.apple.quarantine` ekler. Eğer “uygulama hasarlı” uyarısı görürseniz:
  1. `Sistem Ayarları > Gizlilik & Güvenlik` ekranında “Yine de Aç” butonu belirecektir.
  2. Alternatif olarak, Terminal’de `xattr -cr /Applications/"Veri Masker.app"` komutunu çalıştırıp uygulamayı yeniden başlatabilirsiniz.

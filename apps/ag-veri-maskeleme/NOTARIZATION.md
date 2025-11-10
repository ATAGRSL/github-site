# AG Veri Maskeleme Notarizasyon Rehberi

1. **Release build alın**
   ```bash
   cd apps/ag-veri-maskeleme
   xcodebuild -scheme AGVeriMaskelemeApp -configuration Release ARCHS=arm64
   ```
2. **DMG oluşturun** (Xcode Organizer veya `hdiutil create` kullanabilirsiniz).
3. **Environment değişkenlerini ayarlayın**
   ```bash
   export APPLE_ID="appleid@example.com"
   export APPLE_TEAM_ID="TEAMID"
   export APPLE_APP_PASSWORD="app-specific-password"
   ```
4. **`scripts/notarize-ag-dmg.sh` betiğini çalıştırın**
   ```bash
   ./scripts/notarize-ag-dmg.sh /path/to/AG\ Veri\ Maskeleme.dmg
   ```
5. Betik sırayla `notarytool submit`, `stapler stapler` ve `spctl --assess` komutlarını çalıştırır; en sonda SHA-256 hash çıktısını alırsınız.
6. **DMG’yi siteye kopyalayın**
   ```bash
   cp /path/to/AG\ Veri\ Maskeleme.dmg public/downloads/ag-veri-maskeleme.dmg
   shasum -a 256 public/downloads/ag-veri-maskeleme.dmg
   git add public/downloads/ag-veri-maskeleme.dmg
   git commit -m "Update notarized DMG"
   ```
7. İndirilen dosyada doğrulama yapmak için kullanıcılarınıza şu komutu önerebilirsiniz:
   ```bash
   spctl --assess --type open -v ~/Downloads/AG\ Veri\ Maskeleme.dmg
   ```

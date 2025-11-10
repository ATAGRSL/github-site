# DMG İmzalama Rehberi

## Sorun
macOS Gatekeeper, imzalanmamış DMG dosyalarını "hasarlı" olarak işaretler ve kullanıcıların açmasını engeller.

## Çözüm - Ad-hoc İmzalama

Ad-hoc imzalama, Apple Developer hesabı olmadan yerel geliştirme için kullanılabilir.

### Otomatik Yöntem

Mevcut DMG'yi ad-hoc imzalamak için:

```bash
./scripts/sign-dmg-adhoc.sh public/downloads/ag-veri-maskeleme.dmg
```

### Manuel Yöntem

1. **DMG'yi mount edin:**
   ```bash
   hdiutil attach public/downloads/ag-veri-maskeleme.dmg
   ```

2. **Uygulamayı kopyalayın:**
   ```bash
   cp -R "/Volumes/Veri Masker/Veri Masker.app" /tmp/
   ```

3. **Eski imzayı kaldırın:**
   ```bash
   codesign --remove-signature "/tmp/Veri Masker.app"
   ```

4. **Ad-hoc imzalayın:**
   ```bash
   codesign --force --deep --sign - "/tmp/Veri Masker.app"
   ```

5. **Doğrulayın:**
   ```bash
   codesign --verify --deep --verbose "/tmp/Veri Masker.app"
   ```

6. **Yeni DMG oluşturun:**
   ```bash
   hdiutil create -volname "Veri Masker" -srcfolder "/tmp/Veri Masker.app" -ov -format UDZO "/tmp/ag-veri-maskeleme-signed.dmg"
   ```

7. **Dosyayı yerine kopyalayın:**
   ```bash
   mv /tmp/ag-veri-maskeleme-signed.dmg public/downloads/ag-veri-maskeleme.dmg
   cp public/downloads/ag-veri-maskeleme.dmg dist/downloads/
   ```

8. **DMG'yi unmount edin:**
   ```bash
   hdiutil detach "/Volumes/Veri Masker"
   ```

## Üretim İçin Notarization

Ad-hoc imzalama yerel geliştirme için yeterlidir, ancak üretim dağıtımı için Apple Developer hesabı ile notarization gereklidir:

```bash
./scripts/notarize-ag-dmg.sh public/downloads/ag-veri-maskeleme.dmg
```

Gerekli environment değişkenleri:
- `APPLE_ID`: Apple Developer hesap e-postası
- `APPLE_TEAM_ID`: Team ID
- `APPLE_APP_PASSWORD`: App-specific password

## Durum

✅ DMG ad-hoc imzalanmış ve `public/downloads/` ve `dist/downloads/` klasörlerine yerleştirilmiştir.

Son güncelleme: 10 Kasım 2025

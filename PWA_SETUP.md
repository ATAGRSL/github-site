# PWA Icon Setup

## Required Icons

PWA için aşağıdaki iconları oluşturmanız gerekiyor. Hızlı başlangıç için `node scripts/generate-pwa-assets.mjs` komutunu çalıştırarak profil görselinden otomatik olarak tüm icon ve screenshot dosyalarını üretebilirsiniz.

### 1. icon-192.png (192x192px)
- Path: `/public/icon-192.png`
- Minimum boyut: 192x192px
- Format: PNG
- Purpose: Maskable icon (Android home screen)

### 2. icon-512.png (512x512px)
- Path: `/public/icon-512.png`
- Minimum boyut: 512x512px
- Format: PNG
- Purpose: High-resolution icon

### 3. screenshot-wide.png (1280x720px)
- Path: `/public/screenshot-wide.png`
- Boyut: 1280x720px
- Format: PNG
- Purpose: Desktop/tablet screenshot

### 4. screenshot-narrow.png (750x1334px)
- Path: `/public/screenshot-narrow.png`
- Boyut: 750x1334px
- Format: PNG
- Purpose: Mobile screenshot

## Hızlı Icon Oluşturma

### Seçenek 1: Mevcut Profil Fotoğrafını Kullan

```bash
# ImageMagick ile resize (eğer yüklüyse)
convert public/assets/profile.png -resize 192x192 public/icon-192.png
convert public/assets/profile.png -resize 512x512 public/icon-512.png
```

### Seçenek 2: Online Tools

1. **Favicon Generator:** https://realfavicongenerator.net/
2. **PWA Asset Generator:** https://www.pwabuilder.com/imageGenerator
3. **Canva:** https://www.canva.com/ (custom design)

### Seçenek 3: Figma/Sketch

1. Tasarımı yap (logo + background)
2. Export as PNG
3. Required sizes: 192x192, 512x512

## Screenshot Alma

### Desktop Screenshot
1. Tarayıcıyı tam ekran yap
2. Developer Tools ile 1280x720 set et
3. Screenshot al

### Mobile Screenshot  
1. Developer Tools > Device Toolbar
2. iPhone 6/7/8 Plus (414x736) veya custom
3. Screenshot al

## Test Etme

### Localhost'ta Test
1. `npm run build`
2. `npm run preview`
3. Chrome DevTools > Application > Manifest
4. "Add to Home Screen" butonunu test et

### Production Test
Deploy edildikten sonra:
1. https://atagursel.com.tr
2. Mobile'da "Add to Home Screen"
3. Offline mode test et

## Manifest Validation

https://manifest-validator.appspot.com/

Manifest.json'u validate edin.

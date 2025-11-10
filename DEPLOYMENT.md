# 🚀 Deployment Guide

Bu dosya, sitenizi GitHub Pages'e deploy etmek için adım adım talimatları içerir.

## Ön Gereksinimler

✅ Node.js 20+ yüklü olmalı
✅ Git yüklü olmalı
✅ GitHub hesabı olmalı

## Adım 1: GitHub Repository Ayarları

1. GitHub repository'nizde **Settings** > **Pages** bölümüne gidin
2. **Source** olarak **GitHub Actions** seçin
3. Ayarları kaydedin

## Adım 2: Değişiklikleri Commit & Push

```bash
# Değişiklikleri stage'e al
git add .

# Commit yap
git commit -m "feat: modern portfolio site with Astro, React, and Framer Motion"

# GitHub'a push et
git push origin main
```

## Adım 3: GitHub Actions Workflow

Push yaptıktan sonra:

1. Repository'nizde **Actions** sekmesine gidin
2. "Deploy to GitHub Pages" workflow'unun çalıştığını görmelisiniz
3. Workflow tamamlandığında (yeşil ✓) siteniz yayında olacak

## Adım 4: Site URL

Siteniz şu adreste yayında olacak:
```
https://atagursel.com.tr
```

## Sorun Giderme

### Build Hatası

Eğer Actions'da build hatası alırsanız:

```bash
# Local'de build test edin
npm run build

# Hatalar varsa düzeltin ve tekrar push edin
```

### 404 Hatası

Eğer sayfada 404 hatası alırsanız:

1. `astro.config.mjs` dosyasında `base` değerinin `/` olduğundan emin olun
2. Repository Settings > Pages'de **Branch** olarak `gh-pages` seçili olmalı (GitHub Actions workflow zaten bunu yönetiyor)

### Cache Sorunları

Eğer değişiklikler görünmüyorsa:

1. Tarayıcı cache'ini temizleyin (Ctrl/Cmd + Shift + R)
2. Birkaç dakika bekleyin (GitHub Pages'in güncellenmesi 1-5 dakika sürebilir)

## Manuel Build

İsterseniz manuel build alıp sonucu kontrol edebilirsiniz:

```bash
# Build al
npm run build

# Build önizlemesi
npm run preview
```

## Production Optimizasyonları

Site production için optimize edilmiştir:

✅ Minified JavaScript
✅ Optimized images
✅ CSS purging
✅ Static site generation (SSG)
✅ Fast page loads
✅ SEO friendly

## Güncelleme

Siteyi güncellemek için:

1. Değişikliklerinizi yapın
2. `git add .` ve `git commit -m "your message"`
3. `git push origin main`
4. GitHub Actions otomatik olarak deploy edecek

## İletişim

Sorularınız için: atagursel@yahoo.com

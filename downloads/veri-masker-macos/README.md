# Veri Masker macOS Beta v0.1.0

Hassas verileri (TC kimlik, e-posta, telefon vb.) yerel ortamda maskeleyip anonimleştirmek için geliştirdiğim hafif komut satırı aracının macOS paketidir. Araç CSV ve JSON dosyalarında seçtiğiniz kolonları maskeleme, hashleme veya rastgeleleştirme stratejileriyle işler ve KVKK/GDPR gibi regülasyonlara uygun paylaşılabilir çıktılar oluşturur.

## Gereksinimler

- macOS 12 (Monterey) ve üzeri
- Node.js 18+ (araç `#!/usr/bin/env node` üzerinden çalışır)
- Terminal erişimi

## Kurulum

1. Arşivi açın:
   ```bash
   unzip veri-masker-macos.zip
   cd veri-masker-macos
   ```
2. Çalıştırma izni verin (ilk kullanım için yeterli):
   ```bash
   chmod +x veri-masker
   ```
3. Sistem geneline kurmak isterseniz otomatik scripti kullanabilirsiniz:
   ```bash
   ./install.sh            # /usr/local/bin altına kopyalar
   ./install.sh --target ~/bin  # Özel dizine kopyalar
   ```
   Kurulum sonrası `veri-masker --version` komutu çalışmalı.

## Hızlı başlangıç

Örnek veri seti ile demo:
```bash
./veri-masker --demo --dry-run
```

Kendi CSV dosyanızı maskelemek:
```bash
./veri-masker --input data/musteriler.csv \
  --columns tc_kimlik,email,telefon \
  --strategy mask \
  --output dist/musteriler-masked.csv
```

JSON girdisi:
```bash
./veri-masker --input exports/customers.json --format json \
  --columns email,iban --strategy hash --salt "kvkk-2025"
```

Konfigürasyon dosyası kullanmak:
```bash
./veri-masker --profile config.sample.json
```

## Özellikler

- CSV/JSON format desteği, özelleştirilebilir ayırıcı
- `mask`, `hash`, `random`, `null` stratejileri
- Salt parametresi ile deterministik hash
- `--dry-run` ile rapor üretip dosya yazmadan kontrol
- Hazır demo datası (`sample-data/customers.csv`)
- Bun runtime uyumluluğu (`bun ./veri-masker ...`) — hızlı, all-in-one JS çalışma zamanı

## Konfigürasyon (config.sample.json)

```json
{
  "input": "sample-data/customers.csv",
  "output": "dist/customers-masked.csv",
  "columns": ["tc_kimlik", "email", "telefon"],
  "strategy": "mask",
  "format": "csv",
  "delimiter": ",",
  "salt": "kvkk-demo"
}
```

Kendi ayarlarınızı `config.prod.json` gibi bir dosyaya kopyalayıp `--profile` ile okuyabilirsiniz. CLI argümanları dosya değerlerinin üzerine yazar.

## Güvenlik notları

- Araç çevrimdışı çalışır, hiçbir veriyi ağ üzerinden iletmez.
- Maskelenmiş çıktıları paylaşmadan önce `shasum -a 256 <dosya>` ile bütünlük doğrulaması yapabilirsiniz.
- Bu sürüme ait SHA-256 değeri: `25c7599eee2c4c6ab7336f8ec8aa12ad750602ae5ee77786764a286b3a016f13`
- Hash stratejisi için güçlü bir `--salt` belirleyin.

## Geri bildirim

Sorun bildirmek veya özellik talep etmek için atagursel@yahoo.com adresine yazabilirsiniz. v0.1.0 beta sürümü geri bildirimlere göre güncellenecektir.

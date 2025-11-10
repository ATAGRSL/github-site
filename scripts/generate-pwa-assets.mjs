import sharp from 'sharp';
import { access } from 'node:fs/promises';

const profileImage = 'public/assets/profile.png';

async function ensureProfileImage() {
  try {
    await access(profileImage);
  } catch {
    throw new Error(`Profil görseli bulunamadı: ${profileImage}`);
  }
}

async function createIcons() {
  const icons = [
    { size: 192, output: 'public/icon-192.png' },
    { size: 512, output: 'public/icon-512.png' },
  ];

  await Promise.all(
    icons.map(({ size, output }) =>
      sharp(profileImage)
        .resize(size, size, { fit: 'cover' })
        .png()
        .toFile(output)
    )
  );
}

const createScreenshot = async (width, height, output, label) => {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="50%" stop-color="#115e59"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" rx="48" ry="48"/>
      <text x="50%" y="46%" fill="#2dd4bf" font-family="Inter, Arial, sans-serif" font-size="${Math.min(
        width,
        height
      ) * 0.08}" font-weight="700" text-anchor="middle">${label}</text>
      <text x="50%" y="58%" fill="#e2e8f0" font-family="Inter, Arial, sans-serif" font-size="${Math.min(
        width,
        height
      ) * 0.05}" text-anchor="middle">Modern Portfolio Preview</text>
      <rect x="${width * 0.18}" y="${height * 0.66}" width="${width * 0.64}" height="${height *
    0.15}" rx="${height * 0.03}" fill="#020617cc"/>
      <text x="50%" y="${height * 0.76}" fill="#f8fafc" font-family="Inter, Arial, sans-serif" font-size="${Math.min(
        width,
        height
      ) * 0.045}" font-weight="600" text-anchor="middle">atagursel.com.tr</text>
    </svg>
  `;

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: '#0f172a',
    },
  })
    .composite([{ input: Buffer.from(svg) }])
    .png()
    .toFile(output);
};

async function createScreenshots() {
  await Promise.all([
    createScreenshot(1280, 720, 'public/screenshot-wide.png', 'Ata Gürsel Portfolio'),
    createScreenshot(750, 1334, 'public/screenshot-narrow.png', 'Ata Gürsel Mobile'),
  ]);
}

async function main() {
  await ensureProfileImage();
  await createIcons();
  await createScreenshots();
  console.log('PWA icon ve screenshot dosyaları güncellendi.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

#!/usr/bin/env node
import { copyFileSync, createReadStream, readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';
import path from 'path';

const [, , inputPath] = process.argv;
if (!inputPath) {
  console.error('Kullanım: scripts/update-dmg.mjs /path/to/AG-Veri-Maskeleme.dmg');
  process.exit(1);
}

const root = new URL('..', import.meta.url).pathname;
const source = path.resolve(process.cwd(), inputPath);
const destination = path.join(root, 'public', 'downloads', 'ag-veri-maskeleme.dmg');

copyFileSync(source, destination);

const hash = await new Promise((resolve, reject) => {
  const hashStream = createHash('sha256');
  const stream = createReadStream(destination);
  stream.on('error', reject);
  stream.on('data', (chunk) => hashStream.update(chunk));
  stream.on('end', () => resolve(hashStream.digest('hex')));
});

const metaPath = path.join(root, 'src', 'data', 'ag-dmg.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
meta.sha256 = hash;
writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');

console.log('DMG güncellendi:', destination);
console.log('SHA-256:', hash);
console.log('Lütfen bu değişiklikleri commit etmeyi unutmayın.');

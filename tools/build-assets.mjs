// Convertit les assets UTILISÉS du pack en WebP optimisés -> public/gfx/
// Incrémental : ne retraite que les fichiers modifiés.
import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';

const SRC = 'assets';
const OUT = 'public/gfx';
// [dossier source, dossier de sortie, taille max (px), qualité (null = quasi sans perte)]
const RULES = [
  ['sprites/mobs', 'mobs', 192, null],
  ['sprites/bosses', 'bosses', 192, null],
  ['sprites/portraits', 'portraits', 200, null],
  ['sprites/classesicon', 'classes', 128, null],
  ['sprites/symphonie', 'partitions', 128, null],
  ['sprites/icons', 'icons', 96, null],
  ['sprites/ressources', 'res', 96, null],
  ['sprites/objets', 'obj', 96, null],
  ['sprites/potions', 'potions', 96, null],
  ['sprites/nourriture', 'food', 96, null],
  ['sprites/equipements', 'equip', 128, null],
  ['cards', 'cards', 160, null],
  ['background', 'bg', 1536, 72],
];
const SKIP = /\/old\//;
let done = 0, skipped = 0;
const jobs = [];
for (const [src, out, max, q] of RULES) {
  const dir = join(SRC, src);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory() || extname(f).toLowerCase() !== '.png' || SKIP.test(p)) continue;
    const name = basename(f, '.png').toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/_bg$/, '');
    const dest = join(OUT, out, name + '.webp');
    if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(p).mtimeMs) { skipped++; continue; }
    mkdirSync(dirname(dest), { recursive: true });
    const img = sharp(p).resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true, kernel: 'lanczos3' });
    jobs.push((q ? img.webp({ quality: q, effort: 5 }) : img.webp({ nearLossless: true, quality: 70, effort: 5 })).toFile(dest).then(() => done++));
  }
}
// logo
const logo = join(SRC, 'sprites/icons/logo.png');
if (existsSync(logo)) jobs.push(sharp(logo).resize(384).webp({ quality: 85 }).toFile(join(OUT, 'logo.webp')));
await Promise.all(jobs);
console.log(`[assets] ${done} convertis, ${skipped} à jour -> ${OUT}`);

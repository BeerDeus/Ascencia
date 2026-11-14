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
  ['sprites/garden/plants', 'garden', 112, null],
  ['sprites/garden/seasons', 'seasons', 128, null],
  ['sprites/icons', 'icons', 96, null],
  ['sprites/ressources', 'res', 96, null],
  ['sprites/objets', 'obj', 96, null],
  ['sprites/potions', 'potions', 96, null],
  ['sprites/nourriture', 'food', 96, null],
  ['sprites/equipements', 'equip', 128, null],
  ['cards', 'cards', 160, null],
  ['sprites/packs', 'packs', 160, null],
  ['background', 'bg', 1536, 72],
];
const SKIP = /\/old\//;
let done = 0, skipped = 0;

/** Ne recolore que les pixels rouges saturés (les gemmes), pas le bois des coffres. */
async function blueGems(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    if (!d || mx !== r) continue;
    let h = ((g - b) / d) % 6 * 60; if (h < 0) h += 360;
    const sat = d / mx;
    const red = (h >= 345 || h < 10) && ((mx >= 0.45 && sat > 0.5) || sat > 0.8);
    const glint = h < 24 && mx >= 0.85 && sat > 0.35;
    if (!red && !glint) continue;
    // rouge → bleu : on permute les canaux (R,G,B) → (B',G',R) en gardant la luminosité
    const nr = b * 0.6, ng = g + (r - g) * 0.45, nb = r;
    data[i] = nr * 255; data[i + 1] = ng * 255; data[i + 2] = nb * 255;
  }
  return sharp(data, { raw: info });
}
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
    let img = sharp(p);
    // Gemmes (monnaie premium) en bleu pour ne pas les confondre avec les Éclats d'Ascension (rouges)
    if (out === 'packs' && /^gem_pack/.test(name)) img = await blueGems(p);
    img = img.resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true, kernel: 'lanczos3' });
    jobs.push((q ? img.webp({ quality: q, effort: 5 }) : img.webp({ nearLossless: true, quality: 70, effort: 5 })).toFile(dest).then(() => done++));
  }
}
// logo
const logo = join(SRC, 'sprites/icons/logo.png');
if (existsSync(logo)) jobs.push(sharp(logo).resize(384).webp({ quality: 85 }).toFile(join(OUT, 'logo.webp')));
await Promise.all(jobs);
console.log(`[assets] ${done} convertis, ${skipped} à jour -> ${OUT}`);

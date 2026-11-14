// Compose le site déployé : site/ (vitrine) + dist/ (aperçu du jeu sous /preview/) + images utilisées.
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
const OUT = 'site-dist';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
cpSync('site', OUT, { recursive: true });
if (!existsSync('dist/index.html')) throw new Error('Lancer "npm run build" avant.');
cpSync('dist', `${OUT}/preview`, { recursive: true });
cpSync('dist/favicon.png', `${OUT}/favicon.png`);
console.log(`[site] prêt -> ${OUT}/`);

// Compose le site publié dans dist/ : vitrine (site/) à la racine, jeu (PWA) déjà compilé dans dist/jouer/.
// Hostinger publie dist/ tel quel ; Capacitor embarque uniquement dist/jouer/.
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs';
const OUT = 'dist';
if (!existsSync(`${OUT}/jouer/index.html`)) throw new Error('Jeu absent : lancer "vite build" avant.');
for (const f of readdirSync(OUT)) if (f !== 'jouer') rmSync(`${OUT}/${f}`, { recursive: true, force: true });
cpSync('site', OUT, { recursive: true });
cpSync(`${OUT}/jouer/favicon.png`, `${OUT}/favicon.png`);
console.log('[site] vitrine + jeu prêts -> dist/ (jeu sous /jouer/)');

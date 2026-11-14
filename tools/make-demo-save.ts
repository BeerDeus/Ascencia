// Génère une sauvegarde de démonstration (milieu de partie) pour tester l’interface.
// Usage : npx vite-node tools/make-demo-save.ts sortie.json
import * as E from '../src/game/engine';
import * as I from '../src/game/items';
import { writeFileSync } from 'node:fs';
const s = E.newGame(); s.classId = 'archer'; s.seenStory = ['start','floor:5','boss:10','kill:chef_gobelin','floor:21','kill:gardien_sanctuaire','floor:26','floor:35','kill:hydre','floor:45','boss:50','defeat:chef_doeuvre','ascension:1','floor:51','boss:20','kill:golem_mine'];
s.ascensions = 3; s.legende = 120; s.eclats = 40; s.ascensionUnlocked = true; s.bestFloor = 74; s.metal = 230;
s.arcanes = { empereur: 3, notos: 2, boreas: 1, zephyr: 1, eurus: 1, lune_sang: 4 };
s.constellations = { glaive_frappe: 4, glaive_crit: 2, meute_dps: 3, bourse_or: 2, sentier_volonte: 1 };
E.newRun(s, 62); s.run.maxFloor = 62; s.run.gold = 4.2e9; s.run.heroLevel = 140;
s.run.companions = s.run.companions.map((_, i) => i < 9 ? 120 - i * 10 : 0);
for (let k = 0; k < 18; k++) I.addItem(s, I.makeItem(s, 55 + k, Math.min(5, Math.floor(Math.random() * 5)), Math.random));
for (let k = 0; k < 12; k++) E.log(s, (['kill','boss','loot','larry','gold'] as const)[k % 5], 'Entrée de chronique numéro ' + k);
s.lastSave = Date.now();
writeFileSync(process.argv[2] ?? 'demo-save.json', E.serialize(s));

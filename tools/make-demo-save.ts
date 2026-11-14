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
if (process.argv[3] === 'late') {
  // fin de partie : Ancres en cours, 1 Résonance faite
  s.bestFloor = 296; s.legende = 120000; s.metal = 900; s.gems = 80;
  s.anchors.seedPlanted = Date.now() - 20 * 3600_000; s.anchors.hunts = { leviathan: true }; s.anchors.compass = { 255: true, 265: true };
  s.resonance.count = 1; s.resonance.total = 25; s.resonance.fragments = 9; s.resonance.nodes = { harmonique: 4, auto_achat: 1 };
  s.seenStory.push('floor:255', 'resonance:1', 'floor:251');
}
// métiers, Coffre, Jardin
s.jobs = { jardinier: 2600, alchimiste: 900, cuisinier: 500, chasseur: 1200, expedition: 300 };
s.res = { herbe_robuste: 6, gelee_slime: 4, racine_terreuse: 5, champignon_terreux: 3, queue_rat: 9, croc_loup: 7, pierre: 12, bois: 20, graine_solaire: 3, fleur_rosee: 2 };
s.garden.seeds = { herbe_robuste: 4, fleur_rosee: 2, graine_solaire: 3, champignon_terreux: 1 };
const pl: [number, string, number][] = [[0, 'herbe_robuste', 1], [2, 'fleur_rosee', 1], [1, 'trefle_dore', 0.5], [6, 'racine_terreuse', 0.7], [7, 'champignon_terreux', 1], [12, 'graine_solaire', 0.2], [13, 'racine_eponge', 1], [14, 'rose_sanguine', 0.9]];
for (const [i, id, pr] of pl) s.garden.plots[i] = { plant: id, progress: pr };
s.garden.plots[6]!.pest = true; s.garden.plots[13]!.dissonantSince = Date.now() - 3600_000; s.garden.plots[1]!.trait = 'doree'; s.garden.plots[1]!.mutant = true;
s.garden.known = ['herbe_robuste', 'fleur_rosee', 'trefle_dore', 'racine_terreuse', 'champignon_terreux', 'graine_solaire', 'racine_eponge', 'rose_sanguine'];
s.garden.lastTick = Date.now();
s.expeditions = [{ zone: 'mine', start: Date.now() - 2 * 3600_000, hours: 4 }];
s.lastSave = Date.now();
writeFileSync(process.argv[2] ?? 'demo-save.json', E.serialize(s));

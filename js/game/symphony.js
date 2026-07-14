// ===== Symphonie (Phase 3) : Notes, Mesure FIFO, Accords =====
// Module pur (aucun DOM). Le combat (game/combat.js) gère les bulles et applique
// les effets ; ici = données + logique de correspondance de patterns.
import { SETTINGS } from '../config.js';

// Notes de la gamme (id interne stable, label affiché, couleur).
export const NOTES = [
  { id: 'DO',  label: 'DO',  color: '#e0405a' },
  { id: 'RE',  label: 'RÉ',  color: '#e08b40' },
  { id: 'MI',  label: 'MI',  color: '#e0c840' },
  { id: 'FA',  label: 'FA',  color: '#6bbf59' },
  { id: 'SOL', label: 'SOL', color: '#4aa8d9' },
  { id: 'LA',  label: 'LA',  color: '#6a5ad9' },
  { id: 'SI',  label: 'SI',  color: '#b45ad9' },
];
export const noteById = (id) => NOTES.find((n) => n.id === id);
export const noteByLabel = (lbl) => NOTES.find((n) => n.label === lbl);

// Symphonies : objets équipables (max SETTINGS.symphonySlots) — butin/craft à venir.
// pattern = suffixe recherché dans la Mesure.
// effet : heal(frac PV max) | damage(mult d'Attaque) | buff(stat×mult, ms) | tempoEnemy | critNext
export const ACCORDS = [
  { id: 'soin',    name: 'Cantique de Soin',    icon: 'assets/sprites/symphonie/soin.png',    pattern: ['DO', 'DO', 'DO'],  effect: { type: 'heal', frac: 0.3 },                 desc: 'DO · DO · DO → restaure 30 % des PV max.' },
  { id: 'foudre',  name: 'Trille Foudroyant',   icon: 'assets/sprites/symphonie/foudre.png',  pattern: ['MI', 'FA', 'SOL'], effect: { type: 'damage', mult: 3 },                 desc: 'MI · FA · SOL → inflige 3× votre Attaque.' },
  { id: 'fureur',  name: 'Crescendo de Fureur', icon: 'assets/sprites/symphonie/fureur.png',  pattern: ['LA', 'LA'],        effect: { type: 'buff', stat: 'attaque', mult: 1.5, ms: 6000 }, desc: 'LA · LA → +50 % Attaque pendant 6 s.' },
  { id: 'vif',     name: 'Staccato Vif',        icon: 'assets/sprites/symphonie/vif.png',     pattern: ['RE', 'MI'],        effect: { type: 'tempoEnemy' },                       desc: 'RÉ · MI → réinitialise le Tempo ennemi.' },
  { id: 'parfait', name: 'Accord Parfait',      icon: 'assets/sprites/symphonie/parfait.png', pattern: ['DO', 'MI', 'SOL'], effect: { type: 'critNext' },                         desc: 'DO · MI · SOL → prochaine attaque critique garantie.' },
];
export const accordById = (id) => ACCORDS.find((a) => a.id === id);
export const SYMPHONY_SLOTS = SETTINGS.symphonySlots;
export const MESURE_SIZE = SETTINGS.mesureSize;

// Ajoute une note dans la Mesure (FIFO, max MESURE_SIZE). Mute le tableau passé.
export function pushNote(mesure, noteId) {
  mesure.push(noteId);
  while (mesure.length > MESURE_SIZE) mesure.shift();
}

// Progression d'un motif dans la Mesure : sous-séquence (ordre préservé, mais les
// notes n'ont pas besoin d'être consécutives — ex. LA·DO·LA satisfait le motif LA·LA,
// le DO au milieu ne bloque plus rien). Renvoie quelles notes du motif sont "allumées"
// (pour la coloration des boutons) + si le motif est complet (prêt à être casté).
export function accordProgress(mesure, pattern) {
  const lit = new Array(pattern.length).fill(false);
  let i = 0;
  for (const note of mesure) {
    if (i < pattern.length && note === pattern[i]) { lit[i] = true; i++; }
  }
  return { lit, ready: i === pattern.length };
}

// Le motif de l'accord est-il satisfait par la Mesure actuelle (sous-séquence) ?
export function accordMatches(mesure, accord) {
  return accordProgress(mesure, accord.pattern).ready;
}

// 1er accord équipé dont le pattern est un suffixe de la Mesure (null sinon).
export function matchAccord(mesure, equippedIds) {
  for (const id of equippedIds) {
    const a = accordById(id);
    if (a && accordMatches(mesure, a)) return a;
  }
  return null;
}

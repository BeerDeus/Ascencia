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

// Accords équipables (max SETTINGS.accordSlots). pattern = suffixe recherché dans la Mesure.
// effet : heal(frac PV max) | damage(mult d'Attaque) | buff(stat×mult, ms) | tempoEnemy | critNext
export const ACCORDS = [
  { id: 'soin',    name: 'Cantique de Soin',    icon: '💚', pattern: ['DO', 'DO', 'DO'],  effect: { type: 'heal', frac: 0.3 },                 desc: 'DO · DO · DO → restaure 30 % des PV max.' },
  { id: 'foudre',  name: 'Trille Foudroyant',   icon: '⚡', pattern: ['MI', 'FA', 'SOL'], effect: { type: 'damage', mult: 3 },                 desc: 'MI · FA · SOL → inflige 3× votre Attaque.' },
  { id: 'fureur',  name: 'Crescendo de Fureur', icon: '🔥', pattern: ['LA', 'LA'],        effect: { type: 'buff', stat: 'attaque', mult: 1.5, ms: 6000 }, desc: 'LA · LA → +50 % Attaque pendant 6 s.' },
  { id: 'vif',     name: 'Staccato Vif',        icon: '💨', pattern: ['RE', 'MI'],        effect: { type: 'tempoEnemy' },                       desc: 'RÉ · MI → réinitialise le Tempo ennemi.' },
  { id: 'parfait', name: 'Accord Parfait',      icon: '✦', pattern: ['DO', 'MI', 'SOL'],  effect: { type: 'critNext' },                         desc: 'DO · MI · SOL → prochaine attaque critique garantie.' },
];
export const accordById = (id) => ACCORDS.find((a) => a.id === id);
export const MAX_ACCORDS = SETTINGS.accordSlots;
export const MESURE_SIZE = SETTINGS.mesureSize;

// Ajoute une note dans la Mesure (FIFO, max MESURE_SIZE). Mute le tableau passé.
export function pushNote(mesure, noteId) {
  mesure.push(noteId);
  while (mesure.length > MESURE_SIZE) mesure.shift();
}

// 1er accord équipé dont le pattern est un suffixe de la Mesure (null sinon).
export function matchAccord(mesure, equippedIds) {
  for (const id of equippedIds) {
    const a = accordById(id);
    if (!a) continue;
    const p = a.pattern, m = mesure;
    if (m.length >= p.length && p.every((x, i) => m[m.length - p.length + i] === x)) return a;
  }
  return null;
}

// La Compagnie : une escouade de 3 compagnons choisis dans le roster.
//  • Meneur, Bras droit, Soutien : tous combattent ; chaque compagnon donne un bonus propre selon sa place.
//  • Niveau d'escouade = somme des 3 niveaux ; ses paliers débloquent des bonus variés.
//  • Relations : amis (la cohésion amplifie les paliers) ou rivaux (émulation : +frappe, mais paliers réduits).
//  • Synergies d'histoire (duos, trios) et combinaisons de rôles.
//  • Affinité : gagnée en combattant ensemble (permanente), débloque des souvenirs.
import type { GameState, CompType } from './types';
import { COMPANIONS, MILESTONES } from './data/heroes';
import { T } from './tuning';

export const ROLES: CompType[] = ['melee', 'distance', 'magie'];
export const ROLE_NAME: Record<CompType, string> = { melee: 'Mêlée', distance: 'Distance', magie: 'Magie' };
export const SLOTS = ['Meneur', 'Bras droit', 'Soutien'] as const;
export const SLOT_DESC = ['Mène l’attaque (dégâts renforcés) et donne son bonus de Meneur', 'Combat à ses côtés et donne son bonus de Bras droit', 'Combat aussi et donne son bonus de Soutien'];

// ---- Bonus de place : chaque compagnon a un bonus différent selon sa place (Meneur, Bras droit, Soutien).
//      Ils grandissent avec les paliers de niveau du compagnon (×(1 + paliers atteints)).
export type SlotStat = 'frappe' | 'comp' | 'gold' | 'crit' | 'critdmg' | 'volonte' | 'power';
export const STAT_PER: Record<SlotStat, number> = { frappe: 0.12, comp: 0.12, gold: 0.15, crit: 0.004, critdmg: 0.1, volonte: 0.25, power: 0.08 };
export const STAT_NAME: Record<SlotStat, string> = { frappe: 'Frappe', comp: 'Dégâts des compagnons', gold: 'Or', crit: 'Critique', critdmg: 'Dégâts critiques', volonte: 'Volonté', power: 'Partitions' };
export const fmtStat = (k: SlotStat, v: number) => k === 'volonte' ? `+${v.toFixed(1).replace('.', ',')} s de Volonté` : k === 'crit' ? `+${(v * 100).toFixed(1).replace('.', ',')} % de critique` : `${STAT_NAME[k]} +${Math.round(v * 100)} %`;
export const SLOT_BONUS: [SlotStat, SlotStat, SlotStat][] = [
  ['frappe', 'volonte', 'gold'], ['power', 'comp', 'gold'], ['frappe', 'comp', 'critdmg'], ['crit', 'comp', 'gold'],
  ['power', 'critdmg', 'volonte'], ['comp', 'power', 'gold'], ['frappe', 'gold', 'volonte'], ['critdmg', 'crit', 'comp'],
  ['power', 'frappe', 'critdmg'], ['frappe', 'critdmg', 'gold'], ['comp', 'frappe', 'power'], ['crit', 'critdmg', 'comp'],
  ['volonte', 'comp', 'frappe'], ['comp', 'volonte', 'crit'], ['gold', 'power', 'comp'], ['comp', 'crit', 'frappe'],
  ['frappe', 'volonte', 'comp'], ['critdmg', 'power', 'volonte'], ['comp', 'frappe', 'gold'], ['volonte', 'frappe', 'comp'],
  ['power', 'comp', 'crit'], ['volonte', 'critdmg', 'frappe'], ['comp', 'critdmg', 'power'], ['frappe', 'comp', 'gold'],
];
const msCount = (lv: number) => MILESTONES.filter(t => lv >= t).length;
/** Valeur du bonus de place du compagnon i (niveau lv) à la place k. */
export const slotBonusValue = (i: number, k: number, lv: number) => STAT_PER[SLOT_BONUS[i][k]] * (1 + msCount(lv));

/** Étage (record) où chaque compagnon rejoint le roster, au fil de l'histoire. */
export const COMP_UNLOCK = [1, 3, 8, 15, 24, 30, 38, 46, 54, 62, 70, 78, 88, 98, 108, 118, 132, 146, 160, 175, 195, 220, 245, 290];

// ---- Relations (paires) : 1 = amis, -1 = rivaux, 0 = neutres
const key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
const REL: Record<string, number> = {};
const friends = [[0, 1], [0, 2], [1, 2], [1, 4], [2, 12], [2, 19], [3, 11], [4, 8], [4, 20], [5, 6], [7, 15], [8, 20], [12, 13], [14, 23], [16, 21], [17, 22], [6, 9], [3, 7]];
const rivals = [[0, 9], [8, 16], [10, 17], [18, 22], [5, 10], [7, 14], [13, 19]];
for (const [a, b] of friends) REL[key(a, b)] = 1;
for (const [a, b] of rivals) REL[key(a, b)] = -1;
export const relation = (a: number, b: number) => REL[key(a, b)] ?? 0;
export const friendsOf = (i: number) => COMPANIONS.map((_, j) => j).filter(j => j !== i && relation(i, j) === 1);
export const rivalsOf = (i: number) => COMPANIONS.map((_, j) => j).filter(j => j !== i && relation(i, j) === -1);

// ---- Synergies d'histoire
export interface Synergy { ids: number[]; name: string; desc: string; fx: Partial<Effects> }
export const SYNERGIES: Synergy[] = [
  { ids: [0, 1, 2], name: 'Aubier', desc: 'Escouade ×1,3, +2 s de Volonté', fx: { squad: 0.3, volonte: 2 } },
  { ids: [4, 8, 20], name: 'Chœur du Silence', desc: 'Escouade ×1,5', fx: { squad: 0.5 } },
  { ids: [0, 1], name: 'Le Hameau tient bon', desc: '+2 s de Volonté', fx: { volonte: 2 } },
  { ids: [4, 8], name: 'L’Ordre du Silence', desc: 'Partitions +40 %', fx: { power: 0.4 } },
  { ids: [2, 12], name: 'Forge vivante', desc: 'Escouade ×1,25', fx: { squad: 0.25 } },
  { ids: [2, 19], name: 'Bronze et marteau', desc: 'Escouade ×1,3', fx: { squad: 0.3 } },
  { ids: [3, 11], name: 'Tir croisé', desc: '+4 % de critique', fx: { crit: 0.04 } },
  { ids: [7, 15], name: 'La Traque', desc: 'Dégâts critiques +50 %', fx: { critdmg: 0.5 } },
  { ids: [5, 6], name: 'Cuisine alchimique', desc: 'Or +40 %', fx: { gold: 0.4 } },
  { ids: [4, 20], name: 'Mélodie retrouvée', desc: 'Partitions +30 %', fx: { power: 0.3 } },
  { ids: [16, 21], name: 'Serments', desc: '+3 s de Volonté', fx: { volonte: 3 } },
  { ids: [14, 23], name: 'Éternels', desc: 'Or +50 %', fx: { gold: 0.5 } },
  { ids: [17, 22], name: 'Lumière froide', desc: 'Frappe +40 %', fx: { frappe: 0.4 } },
];
export const ROLE_COMBOS: { test: (r: CompType[]) => boolean; name: string; desc: string; fx: Partial<Effects> }[] = [
  { test: r => new Set(r).size === 3, name: 'Escouade équilibrée', desc: '+2 s de Volonté', fx: { volonte: 2 } },
  { test: r => r.every(x => x === 'melee'), name: 'Mur de boucliers', desc: 'Frappe +30 %', fx: { frappe: 0.3 } },
  { test: r => r.every(x => x === 'distance'), name: 'Pluie de traits', desc: '+5 % de critique', fx: { crit: 0.05 } },
  { test: r => r.every(x => x === 'magie'), name: 'Grand Concert', desc: 'Partitions +50 %', fx: { power: 0.5 } },
];

// ---- Paliers du niveau d'escouade (bonus variés, amplifiés par la cohésion)
export const SQUAD_TIERS: { lv: number; label: string; fx: Partial<Effects> }[] = [
  { lv: 50, label: 'Escouade ×1,15', fx: { squad: 0.15 } },
  { lv: 150, label: 'Bonus du Meneur +25 %', fx: { aura: 0.25 } },
  { lv: 300, label: 'Frappe +20 %', fx: { frappe: 0.2 } },
  { lv: 500, label: 'Bonus du Soutien +25 %', fx: { support: 0.25 } },
  { lv: 800, label: 'Escouade ×1,15', fx: { squad: 0.15 } },
  { lv: 1200, label: 'Or +25 %', fx: { gold: 0.25 } },
  { lv: 1800, label: 'Bonus du Meneur +25 %', fx: { aura: 0.25 } },
  { lv: 2500, label: 'Frappe +20 %', fx: { frappe: 0.2 } },
  { lv: 3500, label: 'Bonus du Soutien +25 %', fx: { support: 0.25 } },
  { lv: 5000, label: 'Escouade ×1,15', fx: { squad: 0.15 } },
];

export interface Effects { squad: number; comp: number; volonte: number; crit: number; critdmg: number; power: number; regen: number; gold: number; frappe: number; aura: number; support: number }
const zero = (): Effects => ({ squad: 0, comp: 0, volonte: 0, crit: 0, critdmg: 0, power: 0, regen: 0, gold: 0, frappe: 0, aura: 0, support: 0 });

// ---- État
const comp = (s: GameState) => (s.company ??= { leader: -1, affinity: {}, squad: [-1, -1, -1] });
export const squadOf = (s: GameState): number[] => { const c = comp(s); return (c.squad ??= [-1, -1, -1]); };
/** Membres actifs (recrutés dans cette vie). */
export const activeSquad = (s: GameState) => squadOf(s).map(i => (i >= 0 && (s.run?.companions[i] ?? 0) > 0 ? i : -1));
export const leaderOf = (s: GameState) => activeSquad(s)[0];
export const slotOf = (s: GameState, i: number) => squadOf(s).indexOf(i);
export const compUnlockedByStory = (s: GameState, i: number) => s.bestFloor >= COMP_UNLOCK[i];
export const canChangeSquad = (s: GameState) => s.run?.monster.kind !== 'boss';

export function setSlot(s: GameState, slot: number, i: number): boolean {
  if (!canChangeSquad(s) || slot < 0 || slot > 2) return false;
  const q = squadOf(s);
  if (i >= 0 && !(s.run.companions[i] > 0)) return false;
  const was = q.indexOf(i);
  if (i >= 0 && was >= 0) q[was] = q[slot];          // échange de places
  q[slot] = i;
  return true;
}
export const setLeader = (s: GameState, i: number) => setSlot(s, 0, i);
/** Composition automatique : les trois plus forts (le meilleur mène). */
export function autoSquad(s: GameState, raw: (i: number) => number) {
  const best = s.run.companions.map((l, i) => ({ i, d: l > 0 ? raw(i) : 0 })).filter(x => x.d > 0).sort((a, b) => b.d - a.d).slice(0, 3).map(x => x.i);
  comp(s).squad = [best[0] ?? -1, best[1] ?? -1, best[2] ?? -1];
}

export const squadLevel = (s: GameState) => activeSquad(s).reduce((t, i) => t + (i >= 0 ? s.run.companions[i] : 0), 0);
/** Cohésion : +1 par paire d'amis, -1 par paire de rivaux (de -3 à +3). */
export function cohesion(s: GameState) {
  const q = activeSquad(s).filter(i => i >= 0);
  let c = 0;
  for (let a = 0; a < q.length; a++) for (let b = a + 1; b < q.length; b++) c += relation(q[a], q[b]);
  return c;
}
export const rivalPairs = (s: GameState) => { const q = activeSquad(s).filter(i => i >= 0); let n = 0; for (let a = 0; a < q.length; a++) for (let b = a + 1; b < q.length; b++) if (relation(q[a], q[b]) < 0) n++; return n; };
/** Les paliers valent ×(1 + 25 % par paire d'amis) ou ×(1 - 25 % par paire de rivaux). */
export const cohesionMult = (s: GameState) => Math.max(0.25, 1 + 0.25 * cohesion(s));
export const tiersReached = (s: GameState) => SQUAD_TIERS.filter(t => squadLevel(s) >= t.lv);
export const activeSynergies = (s: GameState) => { const q = activeSquad(s); return SYNERGIES.filter(x => x.ids.every(id => q.includes(id))); };
export const activeCombo = (s: GameState) => {
  const q = activeSquad(s); if (q.some(i => i < 0)) return undefined;
  return ROLE_COMBOS.find(c => c.test(q.map(i => COMPANIONS[i].type)));
};

/** Tous les effets de l'escouade (paliers × cohésion, synergies, combinaison, Meneur, Soutien, rivalités). */
export function effects(s: GameState): Effects {
  const e = zero();
  if (!s.run?.companions) return e;
  const add = (fx: Partial<Effects>, k = 1) => { for (const [n, v] of Object.entries(fx)) (e as unknown as Record<string, number>)[n] += (v as number) * k; };
  const cm = cohesionMult(s);
  for (const t of tiersReached(s)) add(t.fx, cm);
  for (const x of activeSynergies(s)) add(x.fx);
  const combo = activeCombo(s); if (combo) add(combo.fx);
  e.frappe += 0.15 * rivalPairs(s);                 // émulation entre rivaux
  // bonus de place de chaque membre (Meneur et Soutien amplifiés par les paliers)
  const amp = [1 + e.aura, 1, 1 + e.support];
  activeSquad(s).forEach((i, k) => { if (i >= 0) e[SLOT_BONUS[i][k]] += slotBonusValue(i, k, s.run.companions[i]) * amp[k]; });
  return e;
}
/** Multiplicateur de place dans l'escouade (0 = hors escouade). */
export const slotMult = (s: GameState, i: number) => { const k = activeSquad(s).indexOf(i); return k === 0 ? T.slotLead : k === 1 ? T.slotRight : k === 2 ? T.slotSupport : 0; };

// ---- Affinité (permanente)
export const AFFINITY_STEPS = [15, 50, 120, 250, 450, 750, 1150, 1700, 2400, 3300];
export const affinityPts = (s: GameState, i: number) => s.company?.affinity[i] ?? 0;
export const affinityLevel = (pts: number) => AFFINITY_STEPS.filter(k => pts >= k).length;
/** Un boss vaincu : +1 d'Affinité pour chaque membre de l'escouade (+2 pour le Meneur). */
export function gainAffinity(s: GameState, n = 1) {
  const c = comp(s);
  activeSquad(s).forEach((i, k) => { if (i >= 0) c.affinity[i] = (c.affinity[i] ?? 0) + n * (k === 0 ? 2 : 1); });
}
export const affinityMult = (s: GameState, i: number) => 1 + T.affinityPer * affinityLevel(affinityPts(s, i));

/** Meilleure composition réelle : essaie toutes les escouades ordonnées parmi les 6 plus forts
 *  et garde celle qui maximise `value` (dégâts totaux, bonus de place, synergies et frappe compris). */
export function bestSquad(s: GameState, raw: (i: number) => number, value: () => number) {
  const pool = s.run.companions.map((l, i) => ({ i, d: l > 0 ? raw(i) : 0 })).filter(x => x.d > 0).sort((a, b) => b.d - a.d).slice(0, 6).map(x => x.i);
  const q = squadOf(s), keep = [...q];
  let best = keep, bv = -1;
  const opts = pool.length >= 3 ? pool : [...pool, -1, -1, -1].slice(0, 3);
  for (const a of opts) for (const b of opts) for (const c of opts) {
    if ((a === b && a >= 0) || (a === c && a >= 0) || (b === c && b >= 0)) continue;
    q[0] = a; q[1] = b; q[2] = c;
    const v = value();
    if (v > bv) { bv = v; best = [a, b, c]; }
  }
  for (let k = 0; k < 3; k++) q[k] = best[k];
}

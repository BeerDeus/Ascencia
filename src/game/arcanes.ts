// Arcanes : pioche, amélioration, effets.
import type { GameState } from './types';
import { ARCANES, ARCANE_BY_ID, EFFECTS, FAMILIES, FAMILY_BONUS, type ArcEffect, type Family } from './data/arcanes';

export const arcanesUnlocked = (s: GameState) => s.ascensions > 0;
export const owned = (s: GameState) => Object.keys(s.arcanes).filter(id => s.arcanes[id] > 0).length;

export function arc(s: GameState, eff: ArcEffect): number {
  let v = 0;
  for (const id in s.arcanes) {
    const a = ARCANE_BY_ID[id];
    if (a && a.effect === eff) v += Math.min(s.arcanes[id], EFFECTS[eff].max) * EFFECTS[eff].per;
  }
  return v;
}

export function completeFamilies(s: GameState): Family[] {
  return (Object.keys(FAMILIES) as Family[]).filter(f => ARCANES.filter(a => a.family === f).every(a => (s.arcanes[a.id] ?? 0) > 0));
}
export const familyMult = (s: GameState) => 1 + FAMILY_BONUS * completeFamilies(s).length;

export const drawCost = (s: GameState) => Math.ceil(3 * 1.4 ** owned(s));
export function draw(s: GameState, rnd: () => number): string | null {
  const pool = ARCANES.filter(a => !(s.arcanes[a.id] > 0));
  const c = drawCost(s);
  if (!pool.length || c > s.eclats) return null;
  const a = pool[Math.floor(rnd() * pool.length)];
  s.eclats -= c;
  s.arcanes[a.id] = 1;
  return a.id;
}

export const isMaxed = (s: GameState, id: string) => (s.arcanes[id] ?? 0) >= EFFECTS[ARCANE_BY_ID[id].effect].max;
export const upgradeCost = (s: GameState, id: string) => Math.ceil(2 * 1.28 ** (s.arcanes[id] ?? 0));
export function upgradeArcane(s: GameState, id: string): boolean {
  const lv = s.arcanes[id] ?? 0;
  if (!lv || isMaxed(s, id)) return false;
  const c = upgradeCost(s, id);
  if (c > s.eclats) return false;
  s.eclats -= c;
  s.arcanes[id] = lv + 1;
  return true;
}

// ---- Synergies de classe : deux familles d'Arcanes favorites par classe ; famille complète = bonus propre à la classe
export const SYNERGIES: Record<'guerrier' | 'archer' | 'mage', { family: Family; desc: string; key: 'frappe' | 'ferveur' | 'crit' | 'critdmg' | 'cd' | 'power'; v: number }[]> = {
  guerrier: [{ family: 'betes', desc: 'Frappe ×1,5', key: 'frappe', v: 0.5 }, { family: 'reliques', desc: 'Ferveur +50 %', key: 'ferveur', v: 0.5 }],
  archer: [{ family: 'vents', desc: '+5 % de critique', key: 'crit', v: 0.05 }, { family: 'astres', desc: 'Dégâts critiques +50 %', key: 'critdmg', v: 0.5 }],
  mage: [{ family: 'temps', desc: 'Recharge des Partitions -15 %', key: 'cd', v: 0.15 }, { family: 'divins', desc: 'Puissance des Partitions +50 %', key: 'power', v: 0.5 }],
};
export function synergy(s: GameState) {
  const out = { frappe: 0, ferveur: 0, crit: 0, critdmg: 0, cd: 0, power: 0 };
  const list = s.classId ? SYNERGIES[s.classId as keyof typeof SYNERGIES] : undefined;
  if (!list) return out;
  const done = completeFamilies(s);
  for (const x of list) if (done.includes(x.family)) out[x.key] += x.v;
  return out;
}

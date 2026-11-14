// Formules d’économie (réglages : tuning.ts ; méthode : docs/EQUILIBRAGE.md)
import { MILESTONES } from './data/heroes';
import { T } from './tuning';
import { STORY_BOSSES } from './data/world';

export const MOBS_PER_FLOOR = 10;
export const HERO_COST_BASE = 5;
export const HERO_COST_GROWTH = 1.07;
export const COMP_COST_GROWTH = 1.075;

export function mobHp(floor: number): number {
  return T.hpBase * T.hpGrowth1 ** Math.min(floor - 1, T.hpBreak - 1) * T.hpGrowth2 ** Math.max(floor - T.hpBreak, 0);
}
export function bossHp(floor: number): number {
  return mobHp(floor) * T.bossHpMult;
}
export function mobGold(floor: number): number {
  return Math.max(1, mobHp(floor) * T.goldRatio);
}
/** PV d'un boss avant bonus : jamais moins que le dernier boss d'histoire franchi (pas de creux après un cap). */
export function bossFloorHp(floor: number): number {
  const sb = STORY_BOSSES.find(b => b.floor === floor);
  let hp = bossHp(floor) * (sb?.hpMult ?? 1);
  for (const b of STORY_BOSSES) if (b.floor < floor) hp = Math.max(hp, bossHp(b.floor) * b.hpMult);
  return hp;
}
export function bossGold(floor: number): number {
  return bossHp(floor) * T.goldRatio * 1.5;
}

// --- Héros (Frappe)
export function frappeBase(level: number): number {
  return 1 + level * 1.05 ** (level / 10);
}
export function heroCost(level: number, n = 1): number {
  return geomSum(HERO_COST_BASE * HERO_COST_GROWTH ** level, HERO_COST_GROWTH, n);
}

// --- Compagnons
export function compRecruit(i: number): number { return 40 * T.compCostGrowth ** i; }
export function compBaseDps(i: number): number { return 3 * T.compDpsGrowth ** i; }
export function milestoneMult(level: number): number {
  let m = 1;
  for (const t of MILESTONES) if (level >= t) m *= t < 200 ? 2.5 : 3;
  return m;
}
export function nextMilestone(level: number): number | undefined {
  return MILESTONES.find(t => t > level);
}
export function compDps(i: number, level: number): number {
  return level ? compBaseDps(i) * level * milestoneMult(level) : 0;
}
/** Coût pour passer du niveau `level` à `level + n` (le niveau 1 = recrutement). */
export function compCost(i: number, level: number, n = 1, discount = 0): number {
  return geomSum(compRecruit(i) * COMP_COST_GROWTH ** level, COMP_COST_GROWTH, n) * (1 - discount);
}

// --- Prestige
export function eclatsFor(maxFloor: number): number {
  if (maxFloor < T.eclatsMin) return 0;
  return T.eclatsMode === 'exp'
    ? Math.floor(T.eclatsK * (maxFloor / 30) * T.eclatsExp ** (maxFloor - 30))
    : Math.floor(T.eclatsK * (maxFloor / 10) ** T.eclatsPow);
}
export function legendeMult(legende: number): number {
  return 1 + T.legendPer * legende;
}
export function masteryLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 20));
}

// --- Utilitaires géométriques
export function geomSum(first: number, r: number, n: number): number {
  return n <= 0 ? 0 : first * (r ** n - 1) / (r - 1);
}
/** Nombre max d'achats d'une série géométrique avec `budget`. */
export function geomMax(first: number, r: number, budget: number): number {
  if (budget < first) return 0;
  return Math.max(0, Math.floor(Math.log(budget * (r - 1) / first + 1) / Math.log(r)));
}

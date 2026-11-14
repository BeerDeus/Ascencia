// Formules d'économie (cf. docs/GDD.md §17 et tools/balance_sim.py)
import { MILESTONES } from './data/heroes';

export const MOBS_PER_FLOOR = 10;
export const BOSS_HP_MULT = 8;
export const BOSS_TIME = 30;
export const GOLD_RATIO = 0.1;
export const HERO_COST_BASE = 5;
export const HERO_COST_GROWTH = 1.07;
export const COMP_COST_GROWTH = 1.075;

export function mobHp(floor: number): number {
  return 10 * 1.34 ** Math.min(floor - 1, 139) * 1.22 ** Math.max(floor - 140, 0);
}
export function bossHp(floor: number): number {
  return mobHp(floor) * BOSS_HP_MULT;
}
export function mobGold(floor: number): number {
  return Math.max(1, mobHp(floor) * GOLD_RATIO);
}
export function bossGold(floor: number): number {
  return bossHp(floor) * GOLD_RATIO * 1.5;
}

// --- Héros (Frappe)
export function frappeBase(level: number): number {
  return 1 + level * 1.05 ** (level / 10);
}
export function heroCost(level: number, n = 1): number {
  return geomSum(HERO_COST_BASE * HERO_COST_GROWTH ** level, HERO_COST_GROWTH, n);
}

// --- Compagnons
export function compRecruit(i: number): number { return 40 * 8 ** i; }
export function compBaseDps(i: number): number { return 3 * 6.2 ** i; }
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
  return maxFloor < 30 ? 0 : Math.floor(3 * (maxFloor / 30) * 1.03 ** (maxFloor - 30));
}
export function legendeMult(legende: number): number {
  return 1 + 0.05 * legende;
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

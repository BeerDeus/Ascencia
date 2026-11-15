// Métiers : XP, niveaux, Coffre de ressources.
import type { GameState } from './types';
import { JOB_MAX, JOB_STAT, type JobId } from './data/resources';

export const jobLevel = (xp: number) => Math.min(JOB_MAX, Math.floor(Math.sqrt(xp / 25)));
export const xpForLevel = (lv: number) => 25 * lv * lv;
export const level = (s: GameState, j: JobId) => jobLevel(s.jobs[j] ?? 0);

/** Ajoute de l'XP ; renvoie le nouveau niveau s'il a augmenté. */
export function addXp(s: GameState, j: JobId, xp: number): number | null {
  const before = level(s, j);
  s.jobs[j] = (s.jobs[j] ?? 0) + xp;
  const after = level(s, j);
  return after > before ? after : null;
}

export const has = (s: GameState, id: string) => s.res[id] ?? 0;
export function give(s: GameState, id: string, n = 1) { s.res[id] = (s.res[id] ?? 0) + n; if (s.stats) s.stats.gathered += n; }
export function take(s: GameState, cost: Record<string, number>): boolean {
  for (const [id, n] of Object.entries(cost)) if (has(s, id) < n) return false;
  for (const [id, n] of Object.entries(cost)) s.res[id] -= n;
  return true;
}
export const canPay = (s: GameState, cost: Record<string, number>) => Object.entries(cost).every(([id, n]) => has(s, id) >= n);

/** Multiplicateur du bonus permanent d'un métier (1 + 1 % par niveau). */
export const jobMult = (s: GameState, j: JobId) => (s.jobs ? 1 + level(s, j) * JOB_STAT[j].per : 1);

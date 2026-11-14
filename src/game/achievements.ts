import type { GameState } from './types';
import { ACHIEVEMENTS, type Achievement } from './data/achievements';

export const achDone = (s: GameState, a: Achievement) => a.value(s) >= a.target;
export const claimable = (s: GameState) => ACHIEVEMENTS.filter(a => !s.achievements[a.id] && achDone(s, a));
export function claimAch(s: GameState, id: string): number {
  const a = ACHIEVEMENTS.find(x => x.id === id);
  if (!a || s.achievements[id] || !achDone(s, a)) return 0;
  s.achievements[id] = 1;
  s.gems += a.gems;
  return a.gems;
}
/** Hauts faits atteints mais pas encore annoncés (pour le toast). */
export function newlyDone(s: GameState): Achievement[] {
  const out = claimable(s).filter(a => !s.achSeen.includes(a.id));
  for (const a of out) s.achSeen.push(a.id);
  return out;
}

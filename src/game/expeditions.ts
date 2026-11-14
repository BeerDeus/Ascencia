import type { GameState } from './types';
import { now } from './clock';
import { ZONES, DURATION_BONUS } from './data/expeditions';
import { addXp, give, level } from './jobs';

export interface Expedition { zone: string; start: number; hours: number }

export const slots = (s: GameState) => 1 + (level(s, 'expedition') >= 20 ? 1 : 0) + (level(s, 'expedition') >= 50 ? 1 : 0);
export const zoneOpen = (s: GameState, id: string) => s.bestFloor >= (ZONES.find(z => z.id === id)?.floor ?? Infinity);
export const doneAt = (e: Expedition) => e.start + e.hours * 3600_000;
export const isDone = (e: Expedition) => now() >= doneAt(e);

export function send(s: GameState, zone: string, hours: number): boolean {
  if (!zoneOpen(s, zone) || s.expeditions.length >= slots(s) || !DURATION_BONUS[hours]) return false;
  s.expeditions.push({ zone, start: now(), hours });
  return true;
}

/** Butin attendu (utilisé pour l'affichage et la récompense). */
export function lootFor(s: GameState, e: Expedition): { res: Record<string, number>; metal: number; xp: number } {
  const z = ZONES.find(x => x.id === e.zone)!;
  const m = e.hours * DURATION_BONUS[e.hours] * (1 + level(s, 'expedition') * 0.02);
  const res: Record<string, number> = {};
  for (const [id, r] of Object.entries(z.perHour)) { const n = Math.floor(r * m); if (n > 0) res[id] = n; }
  return { res, metal: Math.floor((z.metal ?? 0) * m), xp: Math.round(30 * e.hours) };
}

export function claim(s: GameState, i: number) {
  const e = s.expeditions[i];
  if (!e || !isDone(e)) return null;
  const loot = lootFor(s, e);
  for (const [id, n] of Object.entries(loot.res)) give(s, id, n);
  s.metal += loot.metal;
  addXp(s, 'expedition', loot.xp);
  s.expeditions.splice(i, 1); s.stats.expeditions++;
  return loot;
}

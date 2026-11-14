// Fief : Primes quotidiennes (Tableau de la garde) et Auberge de Gaston.
import { now } from './clock';
import type { GameState } from './types';
import { BOUNTY_TYPES, MEALS, MEAL_BY_ID, FIEF_UNLOCK, type Counter, type MealDef } from './data/fief';
import { mobGold } from './formulas';

export interface Bounty { c: Counter; target: number; reward: { kind: 'or' | 'metal' | 'eclats'; amount: number }; claimed: boolean }
export interface Daily { day: string; c: Record<Counter, number>; bounties: Bounty[]; chestClaimed: boolean; streak: number }

export const fiefUnlocked = (s: GameState) => s.bestFloor >= FIEF_UNLOCK || s.ascensions > 0;
export function dayKey(d = new Date(now())) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
const emptyCounters = (): Record<Counter, number> => ({ kills: 0, bosses: 0, taps: 0, golden: 0, partitions: 0, loot: 0 });

function seeded(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}

export function rollDaily(s: GameState, day: string): Daily {
  const r = seeded(day);
  const types = [...BOUNTY_TYPES].sort(() => r() - 0.5).slice(0, 3);
  const kinds: Bounty['reward']['kind'][] = s.ascensions > 0 ? ['or', 'metal', 'eclats'] : ['or', 'metal', 'or'];
  const prevDay = s.daily?.day;
  const yesterday = dayKey(new Date(now() - 86400000));
  const streak = prevDay === yesterday && s.daily?.chestClaimed ? (s.daily.streak ?? 0) + 1 : prevDay === day ? s.daily.streak : 0;
  return {
    day, c: emptyCounters(), chestClaimed: false, streak,
    bounties: types.map((t, i) => {
      const kind = kinds[i];
      const amount = kind === 'or' ? 400 : kind === 'metal' ? Math.round(25 * (1 + s.bestFloor / 20)) : Math.max(2, Math.round(2 + s.legende * 0.02));
      return { c: t.c, target: Math.round((t.min + r() * (t.max - t.min)) / 5) * 5 || t.min, reward: { kind, amount }, claimed: false };
    }),
  };
}

/** Change de jour si besoin (à appeler régulièrement). */
export function dailyCheck(s: GameState) {
  const day = dayKey();
  if (!s.daily || s.daily.day !== day) s.daily = rollDaily(s, day);
}

export function count(s: GameState, c: Counter, n = 1) { if (s.daily) s.daily.c[c] += n; }

/** Or : la récompense « or » vaut N monstres de l'étage courant. */
export function rewardValue(s: GameState, b: Bounty) { return b.reward.kind === 'or' ? mobGold(s.run.floor) * b.reward.amount : b.reward.amount; }

export function claimBounty(s: GameState, i: number): boolean {
  const b = s.daily?.bounties[i];
  if (!b || b.claimed || s.daily.c[b.c] < b.target) return false;
  b.claimed = true;
  const v = rewardValue(s, b);
  if (b.reward.kind === 'or') { s.run.gold += v; s.stats.goldEarned += v; }
  else if (b.reward.kind === 'metal') s.metal += v;
  else { s.eclats += v; s.legende += v; }
  return true;
}
export const chestReady = (s: GameState) => !!s.daily && !s.daily.chestClaimed && s.daily.bounties.every(b => b.claimed);

// ---- Auberge
export const mealActive = (s: GameState): MealDef | null => (s.meal && s.meal.until > now() ? MEAL_BY_ID[s.meal.id] : null);
export const mealCost = (s: GameState, m: MealDef) => mobGold(s.run.floor) * m.costKills;
export const mealUnlocked = (s: GameState, m: MealDef) => s.bestFloor >= m.unlock;
export function eat(s: GameState, id: string): boolean {
  const m = MEAL_BY_ID[id];
  if (!m || !mealUnlocked(s, m) || mealActive(s)) return false;
  const c = mealCost(s, m);
  if (c > s.run.gold) return false;
  s.run.gold -= c;
  s.meal = { id, until: now() + m.hours * 3600_000 };
  return true;
}
export { MEALS };

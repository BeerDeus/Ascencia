// Ateliers : Alchimiste (potions, bonus courts) et Cuisinier (repas, bonus longs actifs hors-ligne).
import type { GameState } from './types';
import { now } from './clock';
import { POTIONS, POTION_BY_ID, MEALS, MEAL_BY_ID, type MealRecipe, type PotionEffect } from './data/crafting';
import { addXp, canPay, level, take } from './jobs';

// ---- Alchimie
export const potionUnlocked = (s: GameState, id: string) => level(s, 'alchimiste') >= POTION_BY_ID[id].level;
export function brew(s: GameState, id: string, n = 1): number {
  const r = POTION_BY_ID[id];
  if (!r || !potionUnlocked(s, id)) return 0;
  let made = 0;
  for (; made < n && take(s, r.cost); made++) {
    s.potions[id] = (s.potions[id] ?? 0) + 1;
    addXp(s, 'alchimiste', r.xp); s.stats.brewed++;
  }
  return made;
}
export const potionMinutes = (s: GameState, id: string) => POTION_BY_ID[id].minutes * (1 + level(s, 'alchimiste') * 0.01);
export function drink(s: GameState, id: string): boolean {
  const r = POTION_BY_ID[id];
  if (!r || r.effect === 'purete' || (s.potions[id] ?? 0) <= 0) return false;
  s.potions[id]--; s.stats.drunk++;
  s.buffs[id] = Math.max(now(), s.buffs[id] ?? 0) + potionMinutes(s, id) * 60_000;
  return true;
}
/** Valeur cumulée des potions actives pour un effet. */
export function potion(s: GameState, effect: PotionEffect): number {
  let v = 0;
  if (!s.buffs) return 0;
  for (const id in s.buffs) if (s.buffs[id] > now() && POTION_BY_ID[id]?.effect === effect) v += POTION_BY_ID[id].value;
  return v;
}

// ---- Cuisine
export const mealUnlocked = (s: GameState, m: MealRecipe) => level(s, 'cuisinier') >= m.level;
export const mealActive = (s: GameState): MealRecipe | null => (s.meal && s.meal.until > now() ? MEAL_BY_ID[s.meal.id] ?? null : null);
export const canCook = (s: GameState, m: MealRecipe) => mealUnlocked(s, m) && canPay(s, m.cost) && !mealActive(s);
export function eat(s: GameState, id: string): boolean {
  const m = MEAL_BY_ID[id];
  if (!m || !mealUnlocked(s, m) || mealActive(s) || !take(s, m.cost)) return false;
  s.stats.meals++;
  addXp(s, 'cuisinier', m.xp);
  s.meal = { id, until: now() + m.hours * (1 + level(s, 'cuisinier') * 0.01) * 3600_000 };
  return true;
}
export { POTIONS, MEALS };

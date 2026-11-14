export type Counter = 'kills' | 'bosses' | 'taps' | 'golden' | 'partitions' | 'loot';

export const BOUNTY_TYPES: { c: Counter; text: (n: number) => string; min: number; max: number }[] = [
  { c: 'kills', text: n => `Vaincre ${n} monstres`, min: 150, max: 400 },
  { c: 'bosses', text: n => `Abattre ${n} boss`, min: 12, max: 35 },
  { c: 'taps', text: n => `Porter ${n} frappes`, min: 800, max: 2000 },
  { c: 'golden', text: n => `Attraper ${n} Gobelins dorés`, min: 3, max: 6 },
  { c: 'partitions', text: n => `Jouer ${n} Partitions`, min: 10, max: 25 },
  { c: 'loot', text: n => `Ramasser ${n} objets`, min: 4, max: 9 },
];

export interface MealDef { id: string; name: string; sprite: string; unlock: number; hours: number; desc: string;
  or?: number; frappe?: number; comp?: number; crit?: number; all?: number; volonte?: number; costKills: number }
export const MEALS: MealDef[] = [
  { id: 'soupe', name: 'Soupe du chef', sprite: 'food/soupe', unlock: 26, hours: 1, or: 0.6, desc: '+60 % or', costKills: 120 },
  { id: 'steak', name: 'Steak saignant', sprite: 'food/steak', unlock: 30, hours: 1, frappe: 0.6, desc: '+60 % Frappe', costKills: 150 },
  { id: 'cuisse', name: 'Cuisse rôtie', sprite: 'food/cuisse_poulet', unlock: 35, hours: 1, comp: 0.6, desc: '+60 % dégâts des Compagnons', costKills: 180 },
  { id: 'curry', name: 'Curry de la Croisée', sprite: 'food/curry', unlock: 45, hours: 2, crit: 0.05, desc: '+5 % critique', costKills: 250 },
  { id: 'riz', name: 'Riz doré', sprite: 'food/riz_dore', unlock: 60, hours: 2, or: 1, volonte: 3, desc: '+100 % or, +3 s de Volonté', costKills: 300 },
  { id: 'pizza', name: 'Pizza du Hameau', sprite: 'food/pizza', unlock: 80, hours: 2, all: 1, desc: '+100 % tous les dégâts', costKills: 400 },
];
export const MEAL_BY_ID = Object.fromEntries(MEALS.map(m => [m.id, m]));
export const FIEF_UNLOCK = 26;

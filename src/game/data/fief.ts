export type Counter = 'kills' | 'bosses' | 'taps' | 'golden' | 'partitions' | 'loot';

export const BOUNTY_TYPES: { c: Counter; text: (n: number) => string; min: number; max: number }[] = [
  { c: 'kills', text: n => `Vaincre ${n} monstres`, min: 150, max: 400 },
  { c: 'bosses', text: n => `Abattre ${n} boss`, min: 12, max: 35 },
  { c: 'taps', text: n => `Porter ${n} frappes`, min: 800, max: 2000 },
  { c: 'golden', text: n => `Attraper ${n} Gobelins dorés`, min: 3, max: 6 },
  { c: 'partitions', text: n => `Jouer ${n} Partitions`, min: 10, max: 25 },
  { c: 'loot', text: n => `Ramasser ${n} objets`, min: 4, max: 9 },
];

export const FIEF_UNLOCK = 26;
/** Le Fief s'ouvre par étapes (record d'étage). */
export const FIEF_TABS = { village: 26, coffre: 26, metiers: 26, jardin: 35, expeditions: 45, alchimie: 55, forge: 60 } as const;
export type FiefTab = keyof typeof FIEF_TABS;
export const fiefTabOpen = (s: { bestFloor: number }, id: FiefTab) => s.bestFloor >= FIEF_TABS[id];

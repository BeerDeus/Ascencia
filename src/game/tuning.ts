// Réglages d'équilibrage centralisés (modifiables par tools/balance.ts via la variable TUNE).
// Valeurs validées par simulation (voir docs/EQUILIBRAGE.md).
export const T = {
  // Monstres : PV ×1,34/étage jusqu'à 140, puis ×1,30
  hpBase: 10, hpGrowth1: 1.34, hpBreak: 140, hpGrowth2: 1.3,
  bossHpMult: 8, bossTime: 30, goldRatio: 0.1,
  // Compagnons : chaque nouveau compagnon coûte ×8 mais ne frappe que ×3,5
  // → la puissance achetable prend du retard sur les PV : c'est ce qui crée le mur d'une vie.
  compDpsGrowth: 3.5, compCostGrowth: 8,
  // Prestige : Éclats = 0,12 × (étage/10)^2,5 ; chaque Éclat de Légende = +3 % dégâts
  eclatsMin: 30, eclatsK: 0.12, eclatsMode: 'poly' as 'exp' | 'poly', eclatsExp: 1.03, eclatsPow: 2.5,
  legendPer: 0.03, seuilLegende: 4000,
  // Équipement
  gearBase: 0.5, gearIlvlDiv: 12,
  // Ferveur
  ferveurGain: 2, ferveurGainWar: 3, ferveurDecay: 20, crescendoDur: 8, crescendoMult: 2,
};
export type Tuning = typeof T;
export function applyTuning(over: Partial<Tuning>) { Object.assign(T, over); }

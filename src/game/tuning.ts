// Réglages d'équilibrage centralisés (modifiables par tools/balance.ts via la variable TUNE).
// Valeurs validées par simulation (voir docs/EQUILIBRAGE.md).
export const T = {
  // Monstres : PV ×1,34/étage jusqu’à 140, puis ×1,305
  hpBase: 10, hpGrowth1: 1.34, hpBreak: 140, hpGrowth2: 1.305,
  bossHpMult: 8, bossTime: 30, goldRatio: 0.1,
  // Compagnons : chaque nouveau compagnon coûte ×8 mais ne frappe que ×3,5
  // → la puissance achetable prend du retard sur les PV : c'est ce qui crée le mur d'une vie.
  compDpsGrowth: 3.5, compCostGrowth: 8,
  // Prestige : Éclats = 0,12 × (étage/10)^2,5 ; chaque Éclat de Légende = +3 % dégâts
  eclatsMin: 30, eclatsK: 0.12, eclatsMode: 'poly' as 'exp' | 'poly', eclatsExp: 1.03, eclatsPow: 2.5,
  legendPer: 0.03, seuilLegende: 4000,
  // Résonance
  // Fragments = 6 × √(Légende/1000) ; Harmoniques ×2,7 par niveau, coût ×1,25 ; Graine-Cœur 400 métal ; chasses = boss ×4
  fragK: 6, harmBase: 1, harmGrowth: 1.25, harmMult: 2.7, seedMetal: 400, huntHpMult: 4,
  // Équipement
  gearBase: 0.5, gearIlvlDiv: 12,
  // Ferveur
  // La Compagnie
  slotLead: 1.5, slotRight: 1.25, slotSupport: 1.05, affinityPer: 0.025, renownPer: 0.035, tierBoost: 1,
  ferveurGain: 2, ferveurGainWar: 3, ferveurDecay: 20, crescendoDur: 8, crescendoMult: 2,
};
export type Tuning = typeof T;
export function applyTuning(over: Partial<Tuning>) { Object.assign(T, over); }

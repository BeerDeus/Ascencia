// Recettes des ateliers : Alchimiste (potions) et Cuisinier (repas).
export type PotionEffect = 'frappe' | 'or' | 'regen' | 'crit' | 'volonte' | 'comp' | 'all' | 'all3' | 'eclats' | 'purete';

export interface Recipe { id: string; name: string; sprite: string; level: number; cost: Record<string, number>; xp: number; desc: string }
export interface PotionRecipe extends Recipe { effect: PotionEffect; minutes: number; value: number }

export const POTIONS: PotionRecipe[] = [
  { id: 'tisane', name: 'Tisane robuste', sprite: 'potions/potion_etoile_verte', level: 0, cost: { herbe_robuste: 3, gelee_slime: 1 }, xp: 15, effect: 'frappe', value: 0.5, minutes: 15, desc: 'Frappe +50 %' },
  { id: 'philtre_dore', name: 'Philtre doré', sprite: 'potions/potion_jaune', level: 3, cost: { graine_solaire: 2, queue_rat: 2 }, xp: 20, effect: 'or', value: 1, minutes: 20, desc: 'Or ×2' },
  { id: 'rosee', name: 'Essence de rosée', sprite: 'potions/potion_bleue_1', level: 6, cost: { fleur_rosee: 3, goutte_eau: 1 }, xp: 25, effect: 'regen', value: 2, minutes: 15, desc: 'Régénération de mana ×3' },
  { id: 'purete', name: 'Élixir de pureté', sprite: 'potions/potion_sarcelle', level: 8, cost: { racine_terreuse: 2, fleur_blanche: 1 }, xp: 25, effect: 'purete', value: 0, minutes: 0, desc: 'Soigne une plante dissonante (Jardin)' },
  { id: 'sang_basilic', name: 'Sang du basilic', sprite: 'potions/potion_rouge_2', level: 15, cost: { rose_sanguine: 2, basilic_blood: 1 }, xp: 40, effect: 'crit', value: 0.1, minutes: 20, desc: '+10 % de critique' },
  { id: 'larmes_givre', name: 'Larmes de givre', sprite: 'potions/potion_bleu_marine', level: 25, cost: { lys_givre: 2, essence_spectrale: 1 }, xp: 55, effect: 'volonte', value: 10, minutes: 30, desc: '+10 s de Volonté face aux boss' },
  { id: 'feu_liquide', name: 'Feu liquide', sprite: 'potions/potion_orange', level: 35, cost: { fleur_lave: 2, croc_loup: 3 }, xp: 70, effect: 'comp', value: 1, minutes: 20, desc: 'Dégâts des Compagnons ×2' },
  { id: 'dissonant', name: 'Élixir dissonant', sprite: 'potions/potion_violette', level: 45, cost: { essence_dissonante: 4, cristal_givre: 1 }, xp: 90, effect: 'all3', value: 2, minutes: 15, desc: 'Tous les dégâts ×3' },
  { id: 'radieux', name: 'Élixir radieux', sprite: 'potions/potion_etoile_jaune', level: 55, cost: { tournesol_radieux: 1, plume_griffon: 2 }, xp: 110, effect: 'all', value: 1, minutes: 30, desc: 'Tous les dégâts ×2' },
  { id: 'brume', name: 'Brume silencieuse', sprite: 'potions/potion_rose', level: 70, cost: { orchidee_silencieuse: 1, ame_demon: 1 }, xp: 140, effect: 'eclats', value: 0.25, minutes: 60, desc: '+25 % d’Éclats si vous ascensionnez pendant l’effet' },
];

export interface MealRecipe extends Recipe { hours: number; or?: number; frappe?: number; comp?: number; crit?: number; all?: number; volonte?: number }
export const MEALS: MealRecipe[] = [
  { id: 'soupe', name: 'Soupe du chef', sprite: 'food/soupe', level: 0, cost: { racine_terreuse: 2, champignon_terreux: 1 }, xp: 20, hours: 1, or: 0.6, desc: '+60 % or' },
  { id: 'steak', name: 'Steak saignant', sprite: 'food/steak', level: 4, cost: { viande_crue: 2, herbe_robuste: 2 }, xp: 30, hours: 1, frappe: 0.6, desc: '+60 % Frappe' },
  { id: 'cuisse', name: 'Cuisse rôtie', sprite: 'food/cuisse_poulet', level: 8, cost: { viande_crue: 1, graine_solaire: 2 }, xp: 35, hours: 1, comp: 0.6, desc: '+60 % dégâts des Compagnons' },
  { id: 'curry', name: 'Curry de la Croisée', sprite: 'food/curry', level: 18, cost: { fleur_lave: 1, racine_terreuse: 2, ciboulette: 1 }, xp: 60, hours: 2, crit: 0.05, desc: '+5 % critique' },
  { id: 'riz', name: 'Riz doré', sprite: 'food/riz_dore', level: 28, cost: { trefle_dore: 2, graine_solaire: 2 }, xp: 80, hours: 2, or: 1, volonte: 3, desc: '+100 % or, +3 s de Volonté' },
  { id: 'pizza', name: 'Pizza du Hameau', sprite: 'food/pizza', level: 40, cost: { tournesol_radieux: 1, viande_crue: 2, champignon_terreux: 2 }, xp: 120, hours: 3, all: 1, desc: '+100 % tous les dégâts' },
];
export const MEAL_BY_ID = Object.fromEntries(MEALS.map(m => [m.id, m]));
export const POTION_BY_ID = Object.fromEntries(POTIONS.map(p => [p.id, p]));

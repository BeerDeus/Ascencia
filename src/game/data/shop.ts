// Boutique : gemmes, bénédictions, pubs récompensées, calendrier, packs.
// Principe : le temps s'achète, la puissance permanente non.
export const GEM_ICON = 'packs/gem_pack_1';

export interface Blessing { id: 'or' | 'force' | 'mains' | 'butin'; name: string; desc: string; minutes: number; cost: number; icon: string }
export const BLESSINGS: Blessing[] = [
  { id: 'or', name: 'Bénédiction de Fortune', desc: 'Or ×2', minutes: 60, cost: 30, icon: 'obj/bourse_or' },
  { id: 'force', name: 'Bénédiction de Guerre', desc: 'Tous les dégâts ×2', minutes: 60, cost: 40, icon: 'icons/force' },
  { id: 'mains', name: 'Mains infatigables', desc: '+8 frappes automatiques/s', minutes: 30, cost: 25, icon: 'partitions/staccato_vif' },
  { id: 'butin', name: 'Œil du chasseur', desc: 'Butin ×2', minutes: 60, cost: 30, icon: 'obj/sac_a_dos' },
];

/** Récompenses publicitaires (opt-in) et plafond quotidien. */
export const AD_LIMITS: Record<string, number> = { gemmes: 5, coffre: 3, messager: 10, horsligne: 3 };
export const AD_GEMS = 5;

export const CALENDAR: { kind: 'gemmes' | 'metal' | 'coffre' | 'or'; amount: number }[] = [
  { kind: 'gemmes', amount: 10 }, { kind: 'metal', amount: 40 }, { kind: 'gemmes', amount: 15 }, { kind: 'or', amount: 200 },
  { kind: 'gemmes', amount: 20 }, { kind: 'metal', amount: 80 }, { kind: 'coffre', amount: 3 },
];

export const BAG_STEP = 10, BAG_MAX_BONUS = 40, BAG_COST = 100;
export const PARTITION_REFILL_COST = 10;
export const BOUNTY_REROLL_COST = 15;

/** Packs en argent réel (prix indicatifs ; produits à créer dans la Play Console). */
export interface Pack { id: string; name: string; icon: string; price: string; gems: number; desc: string; once?: boolean; offer?: string }
export const PACKS: Pack[] = [
  { id: 'starter', name: 'Pack du Voyageur', icon: 'packs/gem_pack_starter', price: '2,99 €', gems: 300, desc: '300 gemmes + 2 Bénédictions de Guerre', once: true, offer: 'ascension:1' },
  { id: 'fief', name: 'Pack du Jardinier', icon: 'packs/gem_pack_monthly', price: '1,99 €', gems: 150, desc: '150 gemmes, 20 graines communes et 3 h de Bénédiction de Fortune', once: true, offer: 'fief' },
  { id: 'gems_80', name: 'Poignée de gemmes', icon: 'packs/gem_pack_1', price: '0,99 €', gems: 80, desc: '80 gemmes' },
  { id: 'gems_450', name: 'Bourse de gemmes', icon: 'packs/gem_pack_5', price: '4,99 €', gems: 450, desc: '450 gemmes' },
  { id: 'gems_1000', name: 'Coffret de gemmes', icon: 'packs/gem_pack_20', price: '9,99 €', gems: 1000, desc: '1 000 gemmes' },
  { id: 'gems_2200', name: 'Trésor de gemmes', icon: 'packs/gem_pack_50', price: '19,99 €', gems: 2200, desc: '2 200 gemmes' },
  { id: 'gems_6000', name: 'Magot du dragon', icon: 'packs/gem_pack_100', price: '49,99 €', gems: 6000, desc: '6 000 gemmes' },
  { id: 'pass', name: 'Bénédiction de Lysandra', icon: 'packs/gem_pack_monthly', price: '4,99 € / mois', gems: 0, desc: '50 gemmes/jour, +4 h hors-ligne, récompenses sans pub' },
  { id: 'noads', name: 'Sans publicité', icon: 'packs/no_ads', price: '3,99 €', gems: 0, desc: 'Toutes les récompenses publicitaires sans regarder de pub', once: true },
];

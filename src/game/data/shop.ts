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
export interface Pack { id: string; name: string; icon: string; price: string; gems: number; desc: string; once?: boolean; offer?: string;
  /** Pack d'étape : pièces de l'Aube offertes, condition d'apparition. */ items?: string[]; floor?: number; fragments?: number }
export const PACKS: Pack[] = [
  { id: 'aube1', name: 'Pack de l’Aube', icon: 'equip/longue_epee_de_chevalier', price: '0,99 €', gems: 50, once: true, floor: 10, items: ['aube_lame', 'aube_talisman'],
    desc: 'Lame et Talisman de l’Aube (légendaires, niveau 35) + 50 gemmes' },
  { id: 'aube2', name: 'Pack du Zénith', icon: 'equip/espadon_de_mercenaire', price: '2,99 €', gems: 150, once: true, offer: 'ascension:1', items: ['zenith_lame', 'zenith_armure', 'zenith_anneau'],
    desc: '3 pièces légendaires du Zénith (niveau 90, record 50 requis) + 150 gemmes' },
  { id: 'aube3', name: 'Pack du Crépuscule', icon: 'equip/lame_du_crepuscule', price: '4,99 €', gems: 300, once: true, floor: 100, items: ['crep_lame', 'crep_heaume', 'crep_gants'],
    desc: '3 pièces légendaires du Crépuscule (niveau 160, record 100 requis) + 300 gemmes' },
  { id: 'aube4', name: 'Pack de la Nuit étoilée', icon: 'equip/dagues_de_l_ombre_dansante', price: '9,99 €', gems: 600, once: true, floor: 180, items: ['nuit_dagues', 'nuit_manteau', 'nuit_greves', 'nuit_sandales'],
    desc: '4 pièces mythiques de la Nuit étoilée (niveau 250, record 180 requis) + 600 gemmes' },
  { id: 'resonance', name: 'Pack de la Résonance', icon: 'packs/gem_pack_100', price: '14,99 €', gems: 1200, once: true, offer: 'resonance:1', fragments: 10,
    desc: '1 200 gemmes + 10 Fragments d’Écho' },
  { id: 'starter', name: 'Pack du Voyageur', icon: 'packs/gem_pack_starter', price: '2,99 €', gems: 300, desc: '300 gemmes + 2 Bénédictions de Guerre', once: true, offer: 'floor:26' },
  { id: 'fief', name: 'Pack du Jardinier', icon: 'packs/gem_pack_monthly', price: '1,99 €', gems: 150, desc: '150 gemmes, 20 graines communes et 3 h de Bénédiction de Fortune', once: true, offer: 'fief' },
  { id: 'gems_80', name: 'Poignée de gemmes', icon: 'packs/gem_pack_1', price: '0,99 €', gems: 80, desc: '80 gemmes' },
  { id: 'gems_450', name: 'Bourse de gemmes', icon: 'packs/gem_pack_5', price: '4,99 €', gems: 450, desc: '450 gemmes' },
  { id: 'gems_1000', name: 'Coffret de gemmes', icon: 'packs/gem_pack_20', price: '9,99 €', gems: 1000, desc: '1 000 gemmes' },
  { id: 'gems_2200', name: 'Trésor de gemmes', icon: 'packs/gem_pack_50', price: '19,99 €', gems: 2200, desc: '2 200 gemmes' },
  { id: 'gems_6000', name: 'Magot du dragon', icon: 'packs/gem_pack_100', price: '49,99 €', gems: 6000, desc: '6 000 gemmes' },
  { id: 'pass', name: 'Bénédiction de Lysandra', icon: 'packs/gem_pack_monthly', price: '4,99 € / mois', gems: 0, desc: '50 gemmes/jour, +4 h hors-ligne, récompenses sans pub' },
  { id: 'noads', name: 'Sans publicité', icon: 'packs/no_ads', price: '3,99 €', gems: 0, desc: 'Toutes les récompenses publicitaires sans regarder de pub', once: true },
];

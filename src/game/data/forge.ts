// Forgeron (Kaelen) : commandes ciblées et panoplies d'Acte.
import type { Slot, StatId } from './items';

export type SetBonus = Partial<Record<'or' | 'frappe' | 'comp' | 'crit' | 'critdmg' | 'all' | 'volonte' | 'power', number>>;
export interface SetPiece { slot: Slot; base: string; name: string }
export interface ForgeSet {
  id: string; name: string; act: string; floor: number; level: number;
  pieces: SetPiece[]; cost: Record<string, number>; metal: number;
  bonus2: SetBonus; bonus4: SetBonus; permanent: number; desc2: string; desc4: string;
}

export const SETS: ForgeSet[] = [
  { id: 'hameau', name: 'Panoplie du Hameau', act: 'Acte I', floor: 15, level: 0,
    pieces: [{ slot: 'tete', base: 'equip/casque_en_cuir_use', name: 'Casque du Hameau' }, { slot: 'torse', base: 'equip/pourpoint_en_cuir', name: 'Pourpoint du Hameau' },
      { slot: 'mains', base: 'equip/gants_de_travail', name: 'Gants du Hameau' }, { slot: 'pieds', base: 'equip/bottes_de_marche', name: 'Bottes du Hameau' }],
    cost: { peau_gobelin: 4, queue_rat: 4, croc_loup: 3, bois: 6 }, metal: 15,
    bonus2: { or: 0.5 }, bonus4: { frappe: 1 }, permanent: 0.1, desc2: '+50 % or', desc4: 'Frappe ×2' },
  { id: 'croisee', name: 'Panoplie de la Croisée', act: 'Acte II', floor: 40, level: 15,
    pieces: [{ slot: 'arme', base: 'equip/arc_de_chasseur', name: 'Arc de la Croisée' }, { slot: 'tete', base: 'equip/capuche_d_eclaireur', name: 'Capuche de la Croisée' },
      { slot: 'jambes', base: 'equip/jambieres_de_hors_la_loi', name: 'Jambières de la Croisée' }, { slot: 'anneau', base: 'equip/bague_de_lutteur', name: 'Bague de la Croisée' }],
    cost: { soie_arraignee: 4, ecaille_profond: 3, gelee_slime: 4, fougere: 4 }, metal: 40,
    bonus2: { crit: 0.05 }, bonus4: { comp: 1 }, permanent: 0.15, desc2: '+5 % critique', desc4: 'Compagnons ×2' },
  { id: 'juge', name: 'Panoplie du Juge', act: 'Acte III', floor: 70, level: 30,
    pieces: [{ slot: 'arme', base: 'equip/lame_du_crepuscule', name: 'Lame du Juge' }, { slot: 'torse', base: 'equip/manteau_de_l_illusionniste', name: 'Manteau du Juge' },
      { slot: 'amulette', base: 'equip/pendentif_spectral', name: 'Pendentif du Juge' }, { slot: 'tete', base: 'equip/masque_du_filou', name: 'Masque du Juge' }],
    cost: { essence_spectrale: 5, oeil_chimere: 2, pierre: 8, essence_dissonante_pure: 1 }, metal: 90,
    bonus2: { volonte: 5 }, bonus4: { critdmg: 1 }, permanent: 0.2, desc2: '+5 s de Volonté', desc4: 'Dégâts critiques ×2' },
  { id: 'givre', name: 'Panoplie du Givre', act: 'Acte IV', floor: 95, level: 45,
    pieces: [{ slot: 'tete', base: 'equip/heaume_du_juggernaut', name: 'Heaume du Givre' }, { slot: 'torse', base: 'equip/plastron_de_mercenaire', name: 'Plastron du Givre' },
      { slot: 'jambes', base: 'equip/greves_du_defenseur', name: 'Grèves du Givre' }, { slot: 'pieds', base: 'equip/bottes_fourrees', name: 'Bottes du Givre' }],
    cost: { totem_orc: 4, ecaille_profond: 5, gemme_verte: 3, lys_givre: 3 }, metal: 180,
    bonus2: { comp: 0.5 }, bonus4: { all: 0.5 }, permanent: 0.25, desc2: '+50 % Compagnons', desc4: 'Tous les dégâts ×1,5' },
  { id: 'breche', name: 'Panoplie de la Brèche', act: 'Acte V', floor: 150, level: 60,
    pieces: [{ slot: 'arme', base: 'equip/catalyseur_arcanique', name: 'Catalyseur de la Brèche' }, { slot: 'tete', base: 'equip/diad_me_de_l_archimage', name: 'Diadème de la Brèche' },
      { slot: 'mains', base: 'equip/gantelets_de_fureur', name: 'Gantelets de la Brèche' }, { slot: 'amulette', base: 'equip/corne_de_guerre_du_berserker', name: 'Corne de la Brèche' }],
    cost: { ame_demon: 4, essence_dissonante: 6, eclats_instables: 4, larme_archange: 1 }, metal: 320,
    bonus2: { power: 0.5 }, bonus4: { all: 1 }, permanent: 0.3, desc2: 'Partitions +50 %', desc4: 'Tous les dégâts ×2' },
];
export const SET_BY_ID = Object.fromEntries(SETS.map(s => [s.id, s]));

/** Commande ciblée : coût en métal et en matériaux selon l'étage. */
export const ORDER_COST = { bois: 3, pierre: 3 };   // (ancien coût fixe, gardé pour compatibilité)

/** Matériaux de monstre selon le palier d'étage : ce que le Chasseur ramène à ce moment-là. */
export const TIER_MATS: { from: number; mats: [string, string, string] }[] = [
  { from: 0, mats: ['peau_gobelin', 'croc_loup', 'queue_rat'] },
  { from: 50, mats: ['soie_arraignee', 'chitine', 'gelee_slime'] },
  { from: 100, mats: ['ecaille_profond', 'plume_griffon', 'totem_orc'] },
  { from: 150, mats: ['essence_spectrale', 'ame_demon', 'oeil_chimere'] },
];
/** Recette par emplacement : matériaux de monstre du palier (index 0-2) et, pour certaines pièces, d'expédition.
 *  5 pièces sur 8 ne demandent que des ressources de monstres (le Chasseur suffit). */
export const SLOT_RECIPE: Record<string, { mob: [number, number][]; exp?: [string, number] }> = {
  arme: { mob: [[1, 6], [0, 3]] },
  torse: { mob: [[0, 7], [2, 3]] },
  mains: { mob: [[1, 4], [2, 3]] },
  pieds: { mob: [[2, 5], [0, 2]] },
  anneau: { mob: [[2, 5], [1, 2]] },
  tete: { mob: [[0, 5]], exp: ['pierre', 3] },
  jambes: { mob: [[2, 5]], exp: ['bois', 3] },
  amulette: { mob: [[1, 4]], exp: ['gemme_verte', 1] },
};
/** Coût en ressources d'une commande (emplacement, étage) : grandit doucement avec l'étage. */
export function orderCost(slot: string, floor: number): Record<string, number> {
  const tier = [...TIER_MATS].reverse().find(t => floor >= t.from)!, r = SLOT_RECIPE[slot], k = 1 + floor / 120;
  const out: Record<string, number> = {};
  for (const [m, q] of r.mob) out[tier.mats[m]] = (out[tier.mats[m]] ?? 0) + Math.ceil(q * k);
  if (r.exp) out[r.exp[0]] = Math.ceil(r.exp[1] * k);
  return out;
}
export const orderMetal = (floor: number) => Math.ceil(8 * (1 + floor / 20));
export const ORDER_STATS: StatId[] = ['frappe', 'comp', 'critdmg', 'or', 'crit', 'mana', 'volonte'];

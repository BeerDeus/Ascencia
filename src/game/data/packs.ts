// Packs d'étape (« pay to fast ») : la Panoplie de l'Aube, liée au compte.
// Chaque pièce revient équipée à chaque vie (Ascension, Résonance) et suit l'étage en cours.
import type { Slot, StatId } from './items';

export interface AubePiece { id: string; set: string; slot: Slot; base: string; name: string; rarity: number; minFloor: number; cap: number; stats: StatId[] }
/** Puissance d'un légendaire normal (pas de bonus caché). */
export const AUBE_ROLL = 1;
/** Sets des packs d'étape : niveau d'objet FIXE. Très forts en début de vie, puis dépassés par le butin et la Forge
 *  (qui fabrique au niveau de l'étage actuel). Ils restent liés au compte et reviennent à chaque vie : un booster de départ. */
export const PACK_SETS: Record<string, { name: string; cap: number }> = {
  aube: { name: 'Aube', cap: 35 }, zenith: { name: 'Zénith', cap: 90 }, crepuscule: { name: 'Crépuscule', cap: 160 }, nuit: { name: 'Nuit étoilée', cap: 250 },
};
const P = (id: string, set: string, slot: Slot, base: string, name: string, rarity: number, minFloor: number, stats: StatId[]): AubePiece =>
  ({ id, set, slot, base, name, rarity, minFloor, cap: PACK_SETS[set].cap, stats });
export const AUBE: AubePiece[] = [
  P('aube_lame', 'aube', 'arme', 'equip/longue_epee_de_chevalier', 'Lame de l’Aube', 4, 0, ['frappe', 'comp', 'critdmg']),
  P('aube_talisman', 'aube', 'amulette', 'equip/amulette_de_la_fortune', 'Talisman de l’Aube', 4, 0, ['comp', 'or', 'frappe']),
  P('zenith_lame', 'zenith', 'arme', 'equip/espadon_de_mercenaire', 'Espadon du Zénith', 4, 50, ['frappe', 'comp', 'critdmg']),
  P('zenith_armure', 'zenith', 'torse', 'equip/plastron_de_mercenaire', 'Armure du Zénith', 4, 50, ['comp', 'frappe', 'volonte']),
  P('zenith_anneau', 'zenith', 'anneau', 'obj/anneau_or', 'Anneau du Zénith', 4, 50, ['critdmg', 'comp', 'or']),
  P('crep_lame', 'crepuscule', 'arme', 'equip/lame_du_crepuscule', 'Lame du Crépuscule', 4, 100, ['frappe', 'comp', 'critdmg']),
  P('crep_heaume', 'crepuscule', 'tete', 'equip/heaume_du_juggernaut', 'Heaume du Crépuscule', 4, 100, ['comp', 'crit', 'critdmg']),
  P('crep_gants', 'crepuscule', 'mains', 'equip/gantelets_de_fureur', 'Gantelets du Crépuscule', 4, 100, ['frappe', 'comp', 'crit']),
  P('nuit_dagues', 'nuit', 'arme', 'equip/dagues_de_l_ombre_dansante', 'Dagues de la Nuit étoilée', 5, 180, ['frappe', 'comp', 'critdmg', 'crit']),
  P('nuit_manteau', 'nuit', 'torse', 'equip/manteau_de_l_illusionniste', 'Manteau de la Nuit étoilée', 5, 180, ['comp', 'frappe', 'volonte', 'or']),
  P('nuit_greves', 'nuit', 'jambes', 'equip/greves_du_defenseur', 'Grèves de la Nuit étoilée', 5, 180, ['comp', 'or', 'frappe', 'volonte']),
  P('nuit_sandales', 'nuit', 'pieds', 'equip/sandales_ailees', 'Sandales de la Nuit étoilée', 5, 180, ['volonte', 'comp', 'or', 'critdmg']),
];
export const AUBE_BY_ID = Object.fromEntries(AUBE.map(p => [p.id, p]));

export interface GemItem { id: string; name: string; icon: string; cost: number; desc: string }
export const GEM_ITEMS: GemItem[] = [
  { id: 'parchemin', name: 'Parchemin des Éclats', icon: 'obj/parchemin_scelle', cost: 60, desc: '+50 % d’Éclats à la prochaine Ascension' },
  { id: 'engrais', name: 'Engrais d’Alaric', icon: 'potions/potion_etoile_verte', cost: 15, desc: 'Toutes les plantes du Jardin mûrissent' },
  { id: 'retour', name: 'Retour express', icon: 'icons/carte', cost: 20, desc: 'Les expéditions en cours rentrent tout de suite' },
  { id: 'coffre_leg', name: 'Coffre légendaire', icon: 'packs/gem_pack_starter', cost: 120, desc: 'Un objet Légendaire au niveau de l’étage actuel' },
];

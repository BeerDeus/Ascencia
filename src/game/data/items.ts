// Équipement : bases (sprites du pack), raretés, affixes.
export type Slot = 'arme' | 'tete' | 'torse' | 'mains' | 'jambes' | 'pieds' | 'amulette' | 'anneau';
export type StatId = 'frappe' | 'comp' | 'crit' | 'critdmg' | 'or' | 'mana' | 'volonte';

export const SLOTS: { id: Slot; name: string }[] = [
  { id: 'arme', name: 'Arme' }, { id: 'tete', name: 'Tête' }, { id: 'torse', name: 'Torse' }, { id: 'mains', name: 'Mains' },
  { id: 'jambes', name: 'Jambes' }, { id: 'pieds', name: 'Pieds' }, { id: 'amulette', name: 'Amulette' }, { id: 'anneau', name: 'Anneau' },
];

export const RARITIES = [
  { name: 'Commun', color: '#a39e93' },
  { name: 'Peu commun', color: '#7fb069' },
  { name: 'Rare', color: '#5b9bd5' },
  { name: 'Épique', color: '#a77bca' },
  { name: 'Légendaire', color: '#e8973a' },
  { name: 'Mythique', color: '#e05656' },
];

export interface StatDef { name: string; base: number; scales: boolean; fmt: (v: number) => string; weight: number }
export const STATS: Record<StatId, StatDef> = {
  frappe: { name: 'Frappe', base: 0.12, scales: true, fmt: v => `+${pctStr(v)} Frappe`, weight: 1 },
  comp: { name: 'Compagnons', base: 0.12, scales: true, fmt: v => `+${pctStr(v)} dégâts des Compagnons`, weight: 1.1 },
  critdmg: { name: 'Dégâts critiques', base: 0.15, scales: true, fmt: v => `+${pctStr(v)} dégâts critiques`, weight: 0.6 },
  or: { name: 'Or', base: 0.08, scales: true, fmt: v => `+${pctStr(v)} or`, weight: 0.5 },
  crit: { name: 'Critique', base: 0.006, scales: false, fmt: v => `+${(v * 100).toFixed(1)} % critique`, weight: 0.8 },
  mana: { name: 'Mana', base: 6, scales: false, fmt: v => `+${Math.round(v)} mana`, weight: 0.4 },
  volonte: { name: 'Volonté', base: 0.6, scales: false, fmt: v => `+${v.toFixed(1)} s de Volonté`, weight: 0.6 },
};
function pctStr(v: number) { return v >= 10 ? Math.round(v * 100).toLocaleString('fr-FR') + ' %' : Math.round(v * 100) + ' %'; }

/** Stat principale garantie par emplacement, puis pool d'affixes secondaires. */
export const SLOT_PRIMARY: Record<Slot, StatId> = {
  arme: 'frappe', tete: 'crit', torse: 'comp', mains: 'frappe', jambes: 'comp', pieds: 'volonte', amulette: 'or', anneau: 'critdmg',
};
export const SECONDARY: StatId[] = ['frappe', 'comp', 'critdmg', 'or', 'crit', 'mana', 'volonte'];

// Bases par emplacement, de la plus modeste à la plus prestigieuse.
export const BASES: Record<Slot, [string, string][]> = {
  arme: [['equip/epee_rouillee', 'Épée rouillée'], ['equip/dague_ebrechee', 'Dague ébréchée'], ['equip/gourdin_simple', 'Gourdin'],
    ['equip/hache_de_bucheron', 'Hache de bûcheron'], ['equip/arc_court', 'Arc court'], ['equip/sceptre_de_novice', 'Sceptre de novice'],
    ['equip/lance_de_milicien', 'Lance de milicien'], ['equip/fouet_d_initie', "Fouet d'initié"], ['equip/arc_de_chasseur', 'Arc de chasseur'],
    ['equip/espadon_de_mercenaire', 'Espadon de mercenaire'], ['equip/hache_de_guerre_en_fer', 'Hache de guerre'], ['equip/marteau_de_guerre', 'Marteau de guerre'],
    ['equip/arc_long_en_if', 'Arc long en if'], ['equip/grimoire_des_arcanes', 'Grimoire des arcanes'], ['equip/longue_epee_de_chevalier', 'Longue épée de chevalier'],
    ['equip/hallebarde_de_la_garde', 'Hallebarde de la garde'], ['equip/catalyseur_arcanique', 'Catalyseur arcanique'], ['equip/hache_de_bourreau', 'Hache de bourreau'],
    ['equip/arc_de_chasseur_d_ombres', "Arc du chasseur d'ombres"], ['equip/dagues_de_l_ombre_dansante', "Dagues de l'ombre dansante"], ['equip/lame_du_crepuscule', 'Lame du crépuscule']],
  tete: [['equip/casque_en_cuir_use', 'Casque en cuir usé'], ['equip/vieux_chapeau_pointu', 'Vieux chapeau pointu'], ['equip/capuche_de_rodeur_simple', 'Capuche de rôdeur'],
    ['equip/heaume_de_bois', 'Heaume de bois'], ['equip/casque_de_soldat', 'Casque de soldat'], ['equip/capuche_d_eclaireur', "Capuche d'éclaireur"],
    ['equip/circlet_d_apprenti', "Cercle d'apprenti"], ['equip/diadem_d_apprenti', "Diadème d'apprenti"], ['equip/casque_en_fer', 'Casque en fer'],
    ['equip/masque_du_filou', 'Masque du filou'], ['equip/masque_de_franc_tireur', 'Masque de franc-tireur'], ['equip/casque_de_soldat_du_front', 'Casque du front'],
    ['equip/heaume_du_juggernaut', 'Heaume du juggernaut'], ['equip/diad_me_de_l_archimage', "Diadème de l'archimage"]],
  torse: [['equip/tunique_dechiree', 'Tunique déchirée'], ['equip/chemise_de_lin', 'Chemise de lin'], ['equip/robe_simple', 'Robe simple'],
    ['equip/pourpoint_en_cuir', 'Pourpoint en cuir'], ['equip/armure_legere', 'Armure légère'], ['equip/plastron_de_cuir_brut', 'Plastron de cuir brut'],
    ['equip/cape_de_voyage', 'Cape de voyage'], ['equip/robe_d_adepte', "Robe d'adepte"], ['equip/plastron_de_mercenaire', 'Plastron de mercenaire'],
    ['equip/manteau_de_l_illusionniste', "Manteau de l'illusionniste"], ['equip/mantelet_du_stratege', 'Mantelet du stratège'], ['equip/robe_de_l_erudit_de_guerre', "Robe de l'érudit de guerre"]],
  mains: [['equip/gants_en_tissu', 'Gants en tissu'], ['equip/mitaines_d_apprenti', "Mitaines d'apprenti"], ['equip/gants_de_travail', 'Gants de travail'],
    ['equip/brassards_en_cuir', 'Brassards en cuir'], ['equip/gants_de_pickpocket', 'Gants de pickpocket'], ['equip/gantelets_cloutes', 'Gantelets cloutés'],
    ['equip/bracelet_de_force', 'Bracelet de force'], ['equip/gant_du_savoir', 'Gant du savoir'], ['equip/gantelets_de_fureur', 'Gantelets de fureur']],
  jambes: [['equip/pantalon_de_paysan', 'Pantalon de paysan'], ['equip/jambieres_en_tissu_rapiece', 'Jambières rapiécées'], ['equip/chausses_de_novice', 'Chausses de novice'],
    ['equip/jambieres_de_voyageur', 'Jambières de voyageur'], ['equip/protege_tibias_en_cuir', 'Protège-tibias en cuir'], ['equip/jambieres_renforcees', 'Jambières renforcées'],
    ['equip/jambieres_de_hors_la_loi', 'Jambières de hors-la-loi'], ['equip/greves_du_defenseur', 'Grèves du défenseur'], ['equip/jambieres_de_l_assassin', "Jambières de l'assassin"]],
  pieds: [['equip/sandales_usees', 'Sandales usées'], ['equip/bottes_de_paille', 'Bottes de paille'], ['equip/bottes_usagees', 'Bottes usagées'],
    ['equip/bottes_de_marche', 'Bottes de marche'], ['equip/bottes_fourrees', 'Bottes fourrées'], ['equip/bottes_de_voyageur_aguerri', 'Bottes du voyageur aguerri'],
    ['equip/sandales_ailees', 'Sandales ailées'], ['equip/bottes_de_l_echo', "Bottes de l'Écho"], ['equip/bottes_de_l_arpenteur_silencieux', "Bottes de l'arpenteur silencieux"]],
  amulette: [['equip/pendentif_en_os', 'Pendentif en os'], ['equip/pendentif_de_chance', 'Pendentif de chance'], ['equip/talisman_de_vitalite', 'Talisman de vitalité'],
    ['equip/talisman_de_mana', 'Talisman de mana'], ['equip/broche_du_diplomate', 'Broche du diplomate'], ['equip/amulette_de_l_erudit', "Amulette de l'érudit"],
    ['equip/amulette_de_la_fortune', 'Amulette de la fortune'], ['equip/pendentif_spectral', 'Pendentif spectral'], ['equip/corne_de_guerre_du_berserker', 'Corne du berserker']],
  anneau: [['obj/anneau_bois', 'Anneau de bois'], ['equip/anneau_simple', 'Anneau simple'], ['equip/bague_de_lutteur', 'Bague de lutteur'],
    ['obj/anneau_or', "Anneau d'or"], ['equip/trefle_a_quatre_feuilles', 'Trèfle à quatre feuilles']],
};

export const EPITHETS = ["de l'Écho", 'du Juge', 'de la Fracture', 'des Étoiles', 'du Silence', "d'Aubier", 'de la Symphonie', 'du Crépuscule', 'de Larry'];

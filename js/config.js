// ===== Ascencia — Constantes de configuration =====

// Navigation principale (barre basse fixe). center = bouton surélevé.
export const MAIN_NAV = [
  { id: 'profil',   label: 'Profil',   icon: 'assets/sprites/portraits/default_avatar.png' },
  { id: 'village',  label: 'Village',  icon: 'assets/sprites/icons/village.png' },
  { id: 'aventure', label: 'Aventure', icon: 'assets/sprites/icons/combat.png', center: true },
  { id: 'capitale', label: 'Aller à la Capitale', icon: 'assets/sprites/icons/capitale.png' },
  { id: 'codex',    label: 'Codex',    icon: 'assets/sprites/icons/grimoire.png' },
];

// Sous-vue d'accueil pour les vues à Hub (pas d'onglet dédié dans la subnav — on y
// retombe en cliquant l'icône de la nav principale, voir router.js navigate()).
export const HOME_SUB = { village: 'hub' };

// Sous-navigation contextuelle par vue.
export const SUBNAV = {
  village: [
    { id: 'forge',     label: 'Forge',      icon: 'assets/sprites/icons/forge.png' },
    { id: 'cuisinier', label: 'Cuisinier',  icon: 'assets/sprites/icons/cuisine.png' },
    { id: 'minage',    label: 'Minage',     icon: 'assets/sprites/objets/pioche.png' },
    { id: 'marchand',  label: 'Marchand',   icon: 'assets/sprites/objets/piece_or.png' },
  ],
  profil: [
    { id: 'personnage', label: 'Personnage', icon: 'assets/sprites/portraits/default_avatar.png' },
    { id: 'equipement', label: 'Équipement', icon: 'assets/sprites/objets/sac_a_dos.png' },
  ],
  aventure: [
    { id: 'combat',  label: 'Combat',  icon: 'assets/sprites/icons/combat.png' },
    { id: 'carte',   label: 'Carte',   icon: 'assets/sprites/icons/carte.png' },
  ],
  codex: [
    { id: 'bestiaire', label: 'Bestiaire', icon: 'assets/sprites/icons/grimoire.png' },
    { id: 'recits',    label: 'Récits',    icon: 'assets/sprites/objets/parchemin.png' },
    { id: 'maitrise',  label: 'Maîtrise',  icon: 'assets/sprites/icons/maitrise.png' },
  ],
};

// Attributs de base du joueur (vue Profil).
// alloc:false → non attribuable manuellement (Défense : équipement / +1 tous les 10 niveaux).
// more : affiché dans la modale d'info (clic icône/label — voir views/profil.js) sous
// "Comment en obtenir plus".
export const ATTRIBUTES = [
  { key: 'vie',          label: 'Vie',          icon: 'assets/sprites/icons/vie.png',    alloc: true,  desc: 'PV max (+3 PV / point).',
    more: "Se répartit manuellement : un point d'Attribut est gagné à chaque montée de niveau (bouton + ci-contre). Les bonus Vie de l'équipement s'ajoutent aussi." },
  { key: 'force',        label: 'Force',        icon: 'assets/sprites/icons/force.png',  alloc: true,  desc: 'Dégâts de compétences (Guerrier). Régén PV hors combat + Pénétration d’armure.',
    more: "Se répartit manuellement (points d'Attribut) ou via les bonus Force de l'équipement (Forge)." },
  { key: 'agilite',      label: 'Agilité',      icon: 'assets/sprites/icons/agilite.png',alloc: true,  desc: 'Dégâts de compétences (Archer). Dégâts Critiques + Chance d’Esquive.',
    more: "Se répartit manuellement (points d'Attribut) ou via les bonus Agilité de l'équipement (Forge)." },
  { key: 'chance',       label: 'Chance',       icon: 'assets/sprites/icons/chance.png', alloc: true,  desc: 'Succès des événements, qualité du butin + Chance de Coup Critique.',
    more: "Se répartit manuellement (points d'Attribut) ou via les bonus Chance de l'équipement (Forge)." },
  { key: 'intelligence', label: 'Intelligence', icon: 'assets/sprites/icons/intel.png',  alloc: true,  desc: 'Dégâts de sorts + Mana (Mage). Gain d’XP, Chance de Toucher + Résistance.',
    more: "Se répartit manuellement (points d'Attribut) ou via les bonus Intelligence de l'équipement (Forge)." },
  { key: 'defense',      label: 'Défense',      icon: 'assets/sprites/icons/defense.png',alloc: false, desc: 'Réduit les dégâts subis (−1 par point). Via équipement ou +1 tous les 10 niveaux.',
    more: "Ne se répartit PAS manuellement : +1 automatique tous les 10 niveaux, ou via les bonus Défense de l'équipement (Forge)." },
];

// Catalogue des stats dérivées (source de vérité pour l'affichage Profil).
// group : onglet cible. sub (groupe 'combat' seulement) : 'off' | 'def' — sous-titres
// Offensif/Défensif dans l'UI (views/profil.js), pour une lecture plus logique que la
// liste plate d'origine. fmt : int | pct | perSec | speed. Formules dans game/player.js.
// desc/more : contenu de la modale d'info (clic sur une ligne de stat).
export const STAT_GROUPS = [
  { id: 'combat', label: 'Combat' },
  { id: 'global', label: 'Global' },
  { id: 'traits', label: 'Traits' },
];
export const STATS = [
  // ---- Combat : Offensif ----
  { key: 'attaque',       label: 'Attaque',              group: 'combat', sub: 'off', fmt: 'int',    icon: 'assets/sprites/icons/combat.png',
    desc: "Dégâts infligés par frappe, avant réduction de la Défense adverse.",
    more: 'Augmente avec la Force (1 pour 1) et le niveau. Équipement, Codex et Maîtrise peuvent ajouter des bonus supplémentaires.' },
  { key: 'penetration',   label: "Pénétration d'armure", group: 'combat', sub: 'off', fmt: 'pct',    icon: 'assets/sprites/icons/penetration.png',
    desc: "% de la Défense adverse ignoré à chaque frappe.",
    more: 'Dérive de la Force (0,5 × √Force). Investis en Force ou équipe des objets qui en donnent.' },
  { key: 'vitesse',       label: "Vitesse d'attaque",    group: 'combat', sub: 'off', fmt: 'speed',  icon: 'assets/sprites/icons/vitesse.png',
    desc: "Vitesse de remplissage de ta jauge de Tempo — des frappes plus fréquentes.",
    more: "Dérive de l'Agilité (+3% par point). Investis en Agilité." },
  { key: 'crit',          label: 'Chance de Critique',   group: 'combat', sub: 'off', fmt: 'pct',    icon: 'assets/sprites/icons/crit.png',
    desc: "Chance qu'une frappe inflige un coup critique.",
    more: 'Dérive de la Chance (3,75 × √Chance). Investis en Chance ou équipe des objets qui en donnent.' },
  { key: 'critDmg',       label: 'Dégâts Critiques',     group: 'combat', sub: 'off', fmt: 'pct',    icon: 'assets/sprites/icons/critdmg.png',
    desc: "Multiplicateur de dégâts appliqué sur un coup critique.",
    more: "175% de base, +0,5 × √Agilité. Investis en Agilité." },
  { key: 'precision',     label: 'Chance de Toucher',    group: 'combat', sub: 'off', fmt: 'pct',    icon: 'assets/sprites/icons/precision.png',
    desc: "Chance de toucher ta cible (borné entre 25% et 95%).",
    more: "90% de base, +0,1% par point d'Agilité." },
  // ---- Combat : Défensif ----
  { key: 'defense',       label: 'Défense',              group: 'combat', sub: 'def', fmt: 'int',    icon: 'assets/sprites/icons/defense.png',
    desc: "Réduit les dégâts subis à plat, avant les %.",
    more: "Ne se répartit pas manuellement : +1 automatique tous les 10 niveaux, ou via les bonus Défense de l'équipement (Forge)." },
  { key: 'esquive',       label: "Chance d'Esquive",     group: 'combat', sub: 'def', fmt: 'pct',    icon: 'assets/sprites/icons/esquive.png',
    desc: "Chance d'éviter totalement une attaque ennemie.",
    more: "Dérive de l'Agilité (0,15 × √Agilité). Investis en Agilité." },
  { key: 'resistance',    label: 'Résistance aux dégâts',group: 'combat', sub: 'def', fmt: 'pct',    icon: 'assets/sprites/icons/resistance.png',
    desc: "Réduit en % les dégâts subis, après la réduction plate de Défense.",
    more: "Dérive de l'Intelligence (0,3 × √Intelligence). Investis en Intelligence." },
  // ---- Global (utilitaire / farming) ----
  { key: 'regenHors',     label: 'Régén. PV hors combat',group: 'global', fmt: 'perSec', icon: 'assets/sprites/icons/vie_alt.png',
    desc: "PV régénérés chaque seconde hors combat (aucune régén pendant un combat).",
    more: 'Dérive de la Force (Force ÷ 10). Investis en Force.' },
  { key: 'bonusXp',       label: "Gain d'XP",            group: 'global', fmt: 'pct',    icon: 'assets/sprites/icons/xp.png',
    desc: "Bonus % appliqué à l'XP gagnée en combat.",
    more: "Dérive de l'Intelligence (5 × √Intelligence). Investis en Intelligence." },
  { key: 'bonusOr',       label: "Trouvaille d'or",      group: 'global', fmt: 'pct',    icon: 'assets/sprites/objets/piece_or.png',
    desc: "Bonus % d'or trouvé sur les monstres vaincus.",
    more: 'Dérive de la Chance (moitié du bonus de Qualité du butin). Investis en Chance.' },
  { key: 'rarete',        label: 'Qualité du butin',     group: 'global', fmt: 'pct',    icon: 'assets/sprites/ressources/gemme_verte.png',
    desc: "Bonus % de qualité/quantité du butin obtenu.",
    more: 'Dérive de la Chance (100 × √(Chance/300), plafonné à 300 Chance). Investis en Chance.' },
  // ---- Traits (thème Harmonie / Dissonance) ----
  { key: 'harmonie',      label: 'Harmonie',             group: 'traits', fmt: 'int',    icon: 'assets/sprites/icons/harmonie.png',
    desc: "Affinité avec la Symphonie — thème Harmonie du jeu.",
    more: "Dérive de l'Intelligence et de la Chance combinées. Investis dans l'une ou l'autre." },
  { key: 'chanceNote',    label: 'Chance de note',       group: 'traits', fmt: 'pct',    icon: 'assets/sprites/icons/chance_note.png',
    desc: "Chance qu'une bulle de note apparaisse à chaque frappe réussie en combat.",
    more: '25% de base, +0,6% par point de Chance. Investis en Chance.' },
  { key: 'resDissonance', label: 'Résist. Dissonance',   group: 'traits', fmt: 'pct',    icon: 'assets/sprites/icons/dissonance.png',
    desc: "Atténue les effets négatifs liés à la Dissonance (ex : monstres sous l'Instabilité de Larry).",
    more: 'Dérive de la Défense et de l’Intelligence combinées. Investis dans l’une ou l’autre.' },
];

// ===== Zones d'aventure & progression (Phase 2) =====
// Une zone = 3 à 6 monstres + 1 boss. Nettoyer 10x chaque monstre puis vaincre
// le boss débloque la zone suivante. 10 victoires sur un monstre → auto-battle.
// Stats monstre : hp, attaque, defense, tempo (vitesse d'attaque), crit/esquive %, récompenses xp/gold.
// Zones à thème (monstres = ids du catalogue généré ; boss = id BOSSES ou monstre).
// scale = facteur d'équilibrage appliqué aux stats/récompenses (les mobs legacy sont
// calibrés pour un joueur avec points de départ ; on rééquilibre pour notre niveau 1).
export const ZONES = [
  { id: 1, name: 'Cave aux Rats',     difficulty: 'Facile',    scale: 0.25, monsters: ['rat_geant', 'araignee_de_cave', 'reine_des_rats'],          boss: 'boss_0' },
  { id: 2, name: 'Camp de Gobelins',  difficulty: 'Facile',    scale: 0.40, monsters: ['gobelin_frondeur', 'chef_gobelin', 'sanglier_furieux'],       boss: 'boss_0' },
  { id: 3, name: 'Bois Sauvages',     difficulty: 'Modéré',    scale: 0.60, monsters: ['loup_affame', 'loup_dissonant', 'araignee_geante'],           boss: 'boss_1' },
  { id: 4, name: 'Route des Bandits', difficulty: 'Modéré',    scale: 0.80, monsters: ['bandit', 'squelette_guerrier', 'chef_bandit'],                boss: 'boss_1' },
  { id: 5, name: 'Mines de Pierre',   difficulty: 'Difficile', scale: 1.00, monsters: ['insecte_mineur', 'scorpion_des_sables', 'mini_golem_pierre'], boss: 'boss_2' },
];

// Quartiers du village (structure maquette).
export const VILLAGE = [
  {
    quartier: 'Quartier des Artisans',
    cards: [
      { id: 'forge',     title: 'Forge',     icon: 'assets/sprites/icons/forge.png',  status: 'Niveau 3',   desc: 'Fabrication Rare' },
      { id: 'cuisinier', title: 'Cuisinier', icon: 'assets/sprites/icons/cuisine.png', status: 'Disponible', desc: 'Plats de récupération.', full: true },
    ],
  },
  {
    quartier: 'Quartier Minier',
    cards: [
      { id: 'minage', title: 'Minage', icon: 'assets/sprites/objets/pioche.png', status: 'Disponible', desc: 'Filons de minerai et de cristaux.', full: true },
    ],
  },
  {
    quartier: 'Quartier Commerçant',
    cards: [
      { id: 'marchand', title: 'Marchand', icon: 'assets/sprites/objets/piece_or.png', status: 'Disponible', desc: 'Échange de biens.', full: true },
    ],
  },
];

// Réglages globaux (extensibles pour les phases suivantes).
export const SETTINGS = {
  saveKey: 'ascencia.save.v1',
  mesureSize: 4,          // taille FIFO de La Mesure (Phase 3)
  symphonySlots: 3,       // emplacements d'équipement de Symphonies (objets)
  autoBattleWins: 10,     // victoires requises pour l'Auto-Battle (Phase 4)
  enduranceMax: 20,
  enduranceRegenMs: 5 * 60 * 1000, // 1 pt / 5 min
  larryChance: 0.10,      // 10% d'instabilité de Larry (Phase 5)
};

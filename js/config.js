// ===== Ascencia — Constantes de configuration =====

// Navigation principale (barre basse fixe). center = bouton surélevé.
export const MAIN_NAV = [
  { id: 'profil',   label: 'Profil',   icon: '👤' },
  { id: 'village',  label: 'Village',  icon: '🏘️' },
  { id: 'aventure', label: 'Aventure', icon: '⚔️', center: true },
  { id: 'fief',     label: 'Aller au Fief', icon: '🏰' },
  { id: 'social',   label: 'Social',   icon: '💛' },
];

// Sous-navigation contextuelle par vue.
export const SUBNAV = {
  village: [
    { id: 'hub',       label: 'Hub du Village', icon: '🏛️' },
    { id: 'forge',     label: 'Forge',      icon: '🔥' },
    { id: 'enchanteur',label: 'Enchanteur', icon: '✨' },
    { id: 'alchimiste',label: 'Alchimiste', icon: '🧪' },
    { id: 'cuisinier', label: 'Cuisinier',  icon: '🍲' },
    { id: 'primes',    label: 'Primes',     icon: '🎯' },
  ],
  profil: [
    { id: 'personnage', label: 'Personnage', icon: '👤' },
    { id: 'equipement', label: 'Équipement', icon: '🎒' },
    { id: 'codex',      label: 'Codex',      icon: '📖' },
    { id: 'maitrise',   label: 'Maîtrise',   icon: '🏆' },
  ],
  aventure: [
    { id: 'combat',  label: 'Combat',  icon: '⚔️' },
    { id: 'carte',   label: 'Carte',   icon: '🗺️' },
    { id: 'symphonie', label: 'Symphonie', icon: '🎵' },
  ],
};

// Attributs de base du joueur (vue Profil).
// alloc:false → non attribuable manuellement (Défense : équipement / +1 tous les 10 niveaux).
export const ATTRIBUTES = [
  { key: 'vie',          label: 'Vie',          icon: '❤️', alloc: true,  desc: 'PV max (+3 PV / point).' },
  { key: 'force',        label: 'Force',        icon: '💪', alloc: true,  desc: 'Dégâts de compétences (Guerrier). Régén PV hors combat + Pénétration d’armure.' },
  { key: 'agilite',      label: 'Agilité',      icon: '🤸', alloc: true,  desc: 'Dégâts de compétences (Archer). Dégâts Critiques + Chance d’Esquive.' },
  { key: 'chance',       label: 'Chance',       icon: '🍀', alloc: true,  desc: 'Succès des événements, qualité du butin + Chance de Coup Critique.' },
  { key: 'intelligence', label: 'Intelligence', icon: '🧠', alloc: true,  desc: 'Dégâts de sorts + Mana (Mage). Gain d’XP, Chance de Toucher + Résistance.' },
  { key: 'defense',      label: 'Défense',      icon: '🛡️', alloc: false, desc: 'Réduit les dégâts subis (−1 par point). Via équipement ou +1 tous les 10 niveaux.' },
];

// Catalogue des stats dérivées (source de vérité pour l'affichage Profil).
// group : onglet cible. fmt : int | pct | perSec | speed. Formules dans game/player.js.
export const STAT_GROUPS = [
  { id: 'combat', label: 'Combat' },
  { id: 'global', label: 'Global' },
  { id: 'traits', label: 'Traits' },
];
export const STATS = [
  // ---- Combat ----
  { key: 'attaque',       label: 'Attaque',              group: 'combat', fmt: 'int',    icon: '⚔️' },
  { key: 'defense',       label: 'Défense',              group: 'combat', fmt: 'int',    icon: '🛡️' },
  { key: 'penetration',   label: "Pénétration d'armure", group: 'combat', fmt: 'pct',    icon: '🗡️' },
  { key: 'vitesse',       label: "Vitesse d'attaque",    group: 'combat', fmt: 'speed',  icon: '⏱️' },
  { key: 'crit',          label: 'Chance de Critique',   group: 'combat', fmt: 'pct',    icon: '🎯' },
  { key: 'critDmg',       label: 'Dégâts Critiques',     group: 'combat', fmt: 'pct',    icon: '💥' },
  { key: 'precision',     label: 'Chance de Toucher',    group: 'combat', fmt: 'pct',    icon: '👁️' },
  { key: 'esquive',       label: "Chance d'Esquive",     group: 'combat', fmt: 'pct',    icon: '🌀' },
  { key: 'resistance',    label: 'Résistance aux dégâts',group: 'combat', fmt: 'pct',    icon: '🧱' },
  // ---- Global (utilitaire / farming) ----
  { key: 'regenHors',     label: 'Régén. PV hors combat',group: 'global', fmt: 'perSec', icon: '💚' },
  { key: 'bonusXp',       label: "Gain d'XP",            group: 'global', fmt: 'pct',    icon: '📘' },
  { key: 'bonusOr',       label: "Trouvaille d'or",      group: 'global', fmt: 'pct',    icon: '🪙' },
  { key: 'rarete',        label: 'Qualité du butin',     group: 'global', fmt: 'pct',    icon: '✨' },
  // ---- Traits (thème Harmonie / Dissonance) ----
  { key: 'harmonie',      label: 'Harmonie',             group: 'traits', fmt: 'int',    icon: '🎼' },
  { key: 'chanceNote',    label: 'Chance de note',       group: 'traits', fmt: 'pct',    icon: '🎵' },
  { key: 'resDissonance', label: 'Résist. Dissonance',   group: 'traits', fmt: 'pct',    icon: '🟣' },
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
      { id: 'forge',     title: 'Forge',     icon: '🔥', status: 'Niveau 3',   desc: 'Fabrication Rare' },
      { id: 'alchimiste',title: 'Alchimiste',icon: '🧪', status: 'Disponible', desc: 'Fabrication de potions.' },
      { id: 'cuisinier', title: 'Cuisinier', icon: '🍲', status: 'Disponible', desc: 'Plats de récupération.', full: true },
    ],
  },
  {
    quartier: 'Quartier Commerçant',
    cards: [
      { id: 'marchand', title: 'Marchand', icon: '🪙', status: 'Disponible', desc: 'Échange de biens.', full: true },
    ],
  },
  {
    quartier: 'Quartier Mystique',
    cards: [
      { id: 'primes', title: 'Primes', icon: '🎯', status: 'Disponible', desc: 'Défis quotidiens.', full: true },
    ],
  },
];

// Réglages globaux (extensibles pour les phases suivantes).
export const SETTINGS = {
  saveKey: 'ascencia.save.v1',
  mesureSize: 4,          // taille FIFO de La Mesure (Phase 3)
  accordSlots: 3,         // sorts/accords équipables
  autoBattleWins: 10,     // victoires requises pour l'Auto-Battle (Phase 4)
  enduranceMax: 20,
  enduranceRegenMs: 5 * 60 * 1000, // 1 pt / 5 min
  larryChance: 0.10,      // 10% d'instabilité de Larry (Phase 5)
};

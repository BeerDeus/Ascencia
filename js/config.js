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
  { key: 'penetration',   label: "Pénétration d'armure", group: 'combat', fmt: 'int',    icon: '🗡️' },
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
export const ZONES = [
  {
    id: 1, name: 'Clairière Résonante', difficulty: 'Facile',
    monsters: [
      { id: 'z1_lutin', name: 'Lutin Sourd',   sprite: '👺', hp: 12, attaque: 2, defense: 0, tempo: 0.9, crit: 2, esquive: 2, xp: 12, gold: 6 },
      { id: 'z1_echo',  name: 'Écho Vagabond', sprite: '👻', hp: 16, attaque: 2, defense: 0, tempo: 1.1, crit: 1, esquive: 6, xp: 14, gold: 6 },
      { id: 'z1_note',  name: 'Note Perdue',   sprite: '🎐', hp: 10, attaque: 3, defense: 1, tempo: 1.0, crit: 4, esquive: 2, xp: 13, gold: 5 },
    ],
    boss: { id: 'z1_boss', name: 'Silence Naissant', sprite: '🌑', hp: 45, attaque: 4, defense: 2, tempo: 1.0, crit: 5, esquive: 4, xp: 60, gold: 40 },
  },
  {
    id: 2, name: 'Ravin Dissonant', difficulty: 'Modéré',
    monsters: [
      { id: 'z2_zebre',  name: 'Cristal Zébré',   sprite: '🔷', hp: 45, attaque: 6, defense: 3, tempo: 1.0,  crit: 4, esquive: 3, xp: 30, gold: 18 },
      { id: 'z2_spectre',name: 'Spectre Fêlé',    sprite: '💀', hp: 40, attaque: 7, defense: 2, tempo: 1.15, crit: 6, esquive: 9, xp: 32, gold: 20 },
      { id: 'z2_golem',  name: 'Golem Muet',      sprite: '🗿', hp: 70, attaque: 5, defense: 6, tempo: 0.75, crit: 2, esquive: 1, xp: 34, gold: 22 },
      { id: 'z2_faille', name: 'Faille Vibrante', sprite: '🌀', hp: 52, attaque: 6, defense: 3, tempo: 1.05, crit: 5, esquive: 5, xp: 33, gold: 21 },
    ],
    boss: { id: 'z2_boss', name: 'Chœur Brisé', sprite: '🟣', hp: 210, attaque: 12, defense: 8, tempo: 1.05, crit: 8, esquive: 6, xp: 180, gold: 130 },
  },
  {
    id: 3, name: 'Abîme du Silence', difficulty: 'Difficile',
    monsters: [
      { id: 'z3_ombre',  name: 'Ombre Atone',          sprite: '🕷️', hp: 120, attaque: 14, defense: 8,  tempo: 1.1, crit: 7,  esquive: 7,  xp: 70, gold: 45 },
      { id: 'z3_disso',  name: 'Aberration Dissonante', sprite: '👹', hp: 150, attaque: 16, defense: 10, tempo: 1.0, crit: 9,  esquive: 5,  xp: 75, gold: 50 },
      { id: 'z3_veuve',  name: 'Veuve du Néant',        sprite: '🦂', hp: 110, attaque: 18, defense: 6,  tempo: 1.2, crit: 11, esquive: 11, xp: 78, gold: 52 },
    ],
    boss: { id: 'z3_boss', name: 'Larry, Cœur du Chaos', sprite: '☄️', hp: 650, attaque: 28, defense: 14, tempo: 1.1, crit: 11, esquive: 8, xp: 600, gold: 400 },
  },
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

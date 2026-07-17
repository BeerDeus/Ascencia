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
// Les 4 métiers de récolte (Minage/Bûcheronnage/Tissage/Résonance, voir game/gathering.js)
// tiennent sous un seul onglet "Récolte" (sub === 'recolte', voir views/village.js) —
// 4 tabs dédiés faisaient déborder la barre (5 groupes + Forge/Cuisinier/Alchimiste/
// Marchand/Primes = 9, cassait le split gauche/droite autour du notch Aventure).
// Ce sub-hub liste les 4 cartes (RECOLTE_CARDS ci-dessous) ; chaque carte navigue
// directement vers son sub dédié ('minage'/'bucheronnage'/'tissage'/'resonance'),
// qui reste géré comme avant par renderGatherStation — voir SUBNAV_PARENT pour le
// rattachement (highlight/badge de l'onglet "Récolte" quand on est sur un de ces 4 subs).
export const SUBNAV = {
  village: [
    { id: 'forge',      label: 'Forge',      icon: 'assets/sprites/icons/forge.png' },
    { id: 'cuisinier',  label: 'Cuisinier',  icon: 'assets/sprites/icons/cuisine.png' },
    { id: 'alchimiste', label: 'Alchimiste', icon: 'assets/sprites/potions/potion_violette.png' },
    { id: 'recolte',    label: 'Récolte',    icon: 'assets/sprites/objets/pioche.png' },
    { id: 'marchand',   label: 'Marchand',   icon: 'assets/sprites/objets/piece_or.png' },
    { id: 'primes',     label: 'Primes',     icon: 'assets/sprites/objets/parchemin_scelle.png' },
  ],
  profil: [
    { id: 'personnage', label: 'Personnage', icon: 'assets/sprites/portraits/default_avatar.png' },
    { id: 'equipement', label: 'Équipement', icon: 'assets/sprites/objets/sac_a_dos.png' },
    { id: 'ascension',  label: 'Ascension',  icon: 'assets/sprites/icons/next_floor.png' },
  ],
  aventure: [
    { id: 'combat',  label: 'Combat',  icon: 'assets/sprites/icons/combat.png' },
    { id: 'carte',   label: 'Carte',   icon: 'assets/sprites/icons/carte.png' },
    { id: 'donjon',  label: 'Brèche',  icon: 'assets/sprites/icons/dissonance.png' },
  ],
  codex: [
    { id: 'bestiaire', label: 'Bestiaire', icon: 'assets/sprites/icons/grimoire.png' },
    { id: 'recits',    label: 'Récits',    icon: 'assets/sprites/objets/parchemin.png' },
    { id: 'maitrise',  label: 'Maîtrise',  icon: 'assets/sprites/icons/maitrise.png' },
  ],
};

// sub (non listé dans SUBNAV, feuille) → id de l'onglet SUBNAV parent qu'il faut
// mettre en surbrillance/badger à sa place — voir components/navbar.js renderSubNav().
export const SUBNAV_PARENT = {
  minage: 'recolte', bucheronnage: 'recolte', tissage: 'recolte', resonance: 'recolte',
};

// Cartes du sub-hub "Récolte" (voir views/village.js) — réutilisées telles quelles
// pour le quartier Village > Hub (VILLAGE ci-dessous), une seule source de vérité.
export const RECOLTE_CARDS = [
  { id: 'minage',       title: 'Minage',       icon: 'assets/sprites/objets/pioche.png',                 status: 'Disponible', desc: 'Filons de minerai et de cristaux.' },
  { id: 'bucheronnage', title: 'Bûcheronnage', icon: 'assets/sprites/equipements/hache_de_bucheron.png', status: 'Disponible', desc: 'Coupes de bois, lentes mais régulières.' },
  { id: 'tissage',      title: 'Tissage',      icon: 'assets/sprites/equipements/gants_en_tissu.png',    status: 'Disponible', desc: 'Fibres et toiles, lentes mais régulières.' },
  { id: 'resonance',    title: 'Résonance',    icon: 'assets/sprites/ressources/fragment.png',           status: 'Disponible', desc: 'Échos rares chargés de Dissonance.' },
];

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
// Scale : facteur multiplicatif appliqué aux attrs bruts (ENEMIES_GEN/CUSTOM) de
// chaque monstre — voir game/monsters.js build()/deriveEnemy().
//
// RÉORGANISATION 2026-07-15 (arrivée massive de nouveaux sprites : familles Slime/
// Rat/Gobelin complètes + ~35 créatures diverses, voir data/enemies.custom.js) :
// Zone 1 devient une zone 100% Slime (demande explicite), ce qui a fait glisser les
// Rats (ex-Zone 1) en Zone 2 et les Gobelins en Zone 3 — les Zones 3-5 d'origine
// (Bois Sauvages/Route des Bandits/Mines de Pierre) glissent donc à 4-6. Au-delà,
// même ordre thématique qu'avant, juste décalé de +1, PLUS 4 zones toutes neuves en
// fin de liste (22-25) pour arriver à 25 au total. Attention si du code référençait
// un ancien numéro de zone en dur (aucun cas trouvé au moment du décalage, mais
// vérifier game/lore.js si de nouveaux Récits sont ajoutés plus tard).
//
// Courbe de scale RECALCULÉE, plus agressive que la précédente : la demande était
// explicite (« la difficulté doit monter de plus en plus vite »). Toujours pas de
// plafond à la Zone 25 : le contenu Dissonance encore en réserve après (voir plus
// bas) continuera sur la même lancée. Le choix des monstres (tiers croissants)
// porte toujours l'essentiel de la progression, `scale` affine par-dessus.
//
// Monstres/boss réutilisés d'une zone à l'autre (ex: boss_1 sur Zones 5-6) : pattern
// volontaire, un monstre peut réapparaître en zone adjacente, rescalé, sans que ce
// soit un bug. Les monstres au thème explicitement Dissonance/Larry restent en
// réserve, sauf `dieu_fou`/`juge_dissonant` désormais utilisés en toute fin de
// liste (Zones 24-25) — première incursion volontaire dans cette réserve, le reste
// (`arme_de_larry`, `harmoniste_corrompu`, `ouroboros`, `talos_reforge`,
// `horreur_dimensionnelle`, `gardien_verrouille`, `golem_pierre_mythique`,
// `dragon_corrompu`, `fragment_de_dissonance_mineur`, `heraut_du_silence`,
// `fragment_de_douleur`, `gardien_erode`) reste tenu en réserve pour plus tard.
//
// Boss qui sont des monstres RÉGULIERS (pas d'entrée BOSSES_GEN dédiée) utilisés
// via le fallback `makeBoss(id) || makeMonster(id)` (voir views/aventure.js) : la
// majorité des boss à partir de la Zone 7 — pas de réduction de variance ×0.6 des
// vrais boss sur ces combats-là, un peu plus d'aléatoire, sans gêne. `roi_slime`
// n'a pas de sprite fourni (sprite: 'placeholder', voir data/enemies.custom.js) —
// à remplacer dès que l'art sera prêt.
//
// REVUE D'ÉQUILIBRAGE v2 2026-07-15 : refonte de la courbe de difficulté (métrique
// puissance = √(vie·force)·scale). Objectifs : courbe montante stricte (boss et
// moyenne monotones), boss = pic de sa zone, PALIERS marqués tous les 10 (Z10, Z20
// = saut ~+40% vs zone précédente là où les autres montent ~+20%, forçant le farm),
// et la zone post-palier reste AU-DESSUS du palier (Z11>Z10, Z21>Z20 — on ne repart
// pas sur la trajectoire d'avant le mur). Z25 = capstone final (juge_dissonant très
// au-dessus de tout). Scales retouchés sur les 25 zones + attrs réhaussés côté data
// (rats Z2, gobelins bas Z3, chef_bandit, rat_garou, djinn Z9, archimage Z14,
// golem_pierre Z13, boss_1 Z4/5, golem_sombre Z23, juge_dissonant Z25, ver_terre Z6)
// — voir enemies.gen.js / enemies.custom.js. Bois ajouté à des mobs mid-zone (Z5/6/8/9).
// Laissés volontairement : rampes intra-zone trash→élite des zones early (Z1/Z3/Z4,
// un mob élite tanky par zone) et boss endgame Z18/20/21/22 ≈ top mob (ces boss sont
// réutilisés comme mobs de la zone suivante, écart <15%, effet domino sinon).
//
// REVUE D'ÉQUILIBRAGE v3 2026-07-17 (voir rapport_difficulte_zone10.md) : simulation
// chiffrée d'une progression normale (10x chaque monstre + boss, équipement commun/
// Peu Commun + enchant, sans farm de triche) montrant que le mur de difficulté réel
// arrivait dès la Zone 4-5, PAS à la Zone 10 comme supposé — le `scale` grimpait ×13
// sur 10 zones (0.20→2.60) pendant que la Défense/Pénétration du joueur (formules en
// √attribut, quasi non-allouables) ne suivait pas du tout ce rythme LINÉAIRE. Zones 5-10
// compressées à 50% de leur delta au-delà de la Zone 4 (scale4 + (scale_old−scale4)×0.5)
// pour ramener la Zone 10 à une marge de combat jouable (voir rapport, combiné au
// déblocage anticipé du Peu Commun + Rare auto à l'Ascension + Défense/5 niveaux).
// Zones 1-4 INCHANGÉES (déjà confortables). Ne pas re-resserrer sans rejouer la
// simulation : le rapport contient le script Python pour ça.
export const ZONES = [
  { id: 1,  name: 'Marécage de Gelée',      difficulty: 'Facile',        scale: 0.20,  monsters: ['slime_gelatineux', 'slime_vert_enerve', 'slime_bleu', 'slime_bleu_enerve', 'slime_corrosif'],                    boss: 'roi_slime' },
  { id: 2,  name: 'Cave aux Rats',          difficulty: 'Facile',        scale: 0.42,  monsters: ['rat_geant', 'reine_des_rats', 'rat_gris', 'rat_sauvage', 'rat_brun', 'gros_rat'],                                boss: 'rat_garou' },
  { id: 3,  name: 'Camp de Gobelins',       difficulty: 'Facile',        scale: 0.52,  monsters: ['gobelin_vulnerable', 'gobelin_recrue', 'gobelin_eclaireur', 'gobelin_frondeur', 'gobelin_chasseur', 'gobelin_champion'], boss: 'boss_0' },
  { id: 4,  name: 'Bois Sauvages',          difficulty: 'Modéré',        scale: 0.66,  monsters: ['loup_affame', 'loup_dissonant', 'araignee_geante', 'arbre_vivant', 'rat_infecte'],                              boss: 'boss_1' },
  { id: 5,  name: 'Route des Bandits',      difficulty: 'Modéré',        scale: 0.81,  monsters: ['bandit', 'squelette_guerrier', 'chef_bandit', 'gobelin_assassin', 'gobelin_squelette', 'rat_voleur'],           boss: 'boss_1' },
  { id: 6,  name: 'Mines de Pierre',        difficulty: 'Difficile',     scale: 0.87,  monsters: ['insecte_mineur', 'scorpion_des_sables', 'mini_golem_pierre', 'ver_terre', 'mini_golem', 'troglodyte'],          boss: 'boss_2' },
  { id: 7,  name: 'Marais Empoisonné',      difficulty: 'Difficile',     scale: 0.97,  monsters: ['ver_de_racine', 'cultiste_zelote', 'harpie', 'otyugh', 'serpent_marais', 'sangsue_geante'],                    boss: 'geant' },
  { id: 8,  name: 'Crypte des Oubliés',     difficulty: 'Difficile',     scale: 1.14,  monsters: ['necromancien_apprenti', 'spectre_gemissant', 'momie_gardienne', 'fantome', 'nuee_chauve_souris'],               boss: 'gardien_de_pierre_eterne' },
  { id: 9,  name: 'Antre Gelée',            difficulty: 'Difficile',     scale: 1.28,  monsters: ['elementaire_eau', 'esprit_glacial', 'initie_de_l_ombre', 'elementaire_glace', 'salamandre_bleue'],              boss: 'djinn' },
  { id: 10, name: 'Camp Orc',               difficulty: 'Difficile',     scale: 1.63,  monsters: ['orc_berserker', 'garde_automate', 'griffon', 'minotaure_jeune', 'moustique_geant'],                            boss: 'minotaure' },
  { id: 11, name: 'Cité Engloutie',         difficulty: 'Très difficile',scale: 3.15,  monsters: ['profond_guerrier', 'assassin_de_l_ombre', 'elementaire_de_magma', 'basilic', 'araignee_variante', 'loup_alpha'], boss: 'chimere' },
  { id: 12, name: 'Sables Hurlants',        difficulty: 'Très difficile',scale: 3.80,  monsters: ['ver_des_sables', 'demon_mineur', 'araignee_geante_variante', 'reptilien'],                                     boss: 'boss_3' },
  { id: 13, name: 'Bastion en Ruines',      difficulty: 'Très difficile',scale: 4.55,  monsters: ['profond_champion', 'maitre_de_l_ombre', 'le_collecteur', 'automate', 'mimique_coffre'],                        boss: 'golem_pierre' },
  { id: 14, name: "Repaire de l'Archimage", difficulty: 'Très difficile',scale: 5.40,  monsters: ['archere_elfe', 'esprit_ancien_tourmente', 'oeil_volant'],                                                      boss: 'archimage_dement' },
  { id: 15, name: 'Cimes des Griffons',     difficulty: 'Extrême',       scale: 6.40,  monsters: ['hydre_des_marais', 'roi_singe_esprit', 'pieuvre_violette'],                                                    boss: 'archange' },
  { id: 16, name: 'Cathédrale Silencieuse', difficulty: 'Extrême',       scale: 7.55,  monsters: ['roi_barbare', 'spectre_sombre', 'voyageur_sombre'],                                                            boss: 'boss_4' },
  { id: 17, name: 'Forge Infernale',        difficulty: 'Extrême',       scale: 8.90,  monsters: ['chevalier_eternel', 'roi_barbare', 'forgeron_demon_mineur'],                                                   boss: 'shoggoth' },
  { id: 18, name: 'Sanctuaire Corrompu',    difficulty: 'Extrême',       scale: 10.50, monsters: ['forgeron_demon', 'chevalier_eternel', 'demon_cornu'],                                                          boss: 'general_demon' },
  { id: 19, name: 'Pic du Dragon',          difficulty: 'Cauchemar',     scale: 12.40, monsters: ['general_demon', 'forgeron_demon', 'mimique_monstre'],                                                          boss: 'dragon_rouge_ancien' },
  { id: 20, name: 'Abysses Sombres',        difficulty: 'Cauchemar',     scale: 17.90, monsters: ['dragon_rouge_ancien', 'general_demon', 'chevalier_sombre'],                                                    boss: 'double_sombre' },
  { id: 21, name: 'Seuil de la Dissonance', difficulty: 'Cauchemar',     scale: 21.20, monsters: ['double_sombre', 'dragon_rouge_ancien'],                                                                         boss: 'griffon_corrompu' },
  { id: 22, name: 'Faille du Néant',        difficulty: 'Cauchemar',     scale: 26.00, monsters: ['chevalier_sombre', 'griffon_corrompu'],                                                                        boss: 'chevalier_neant' },
  { id: 23, name: 'Fournaise Abyssale',     difficulty: 'Cauchemar',     scale: 29.50, monsters: ['demon_cornu', 'chevalier_neant'],                                                                               boss: 'golem_sombre' },
  { id: 24, name: 'Cœur de la Dissonance',  difficulty: 'Cauchemar',     scale: 33.00, monsters: ['golem_sombre', 'chevalier_neant'],                                                                              boss: 'dieu_fou' },
  { id: 25, name: 'Le Silence Absolu',      difficulty: 'Cauchemar',     scale: 36.50, monsters: ['dieu_fou', 'golem_sombre'],                                                                                     boss: 'juge_dissonant' },
];

// ===== La Brèche Instable (donjon à étages, Acte IV du Lore — voir Lore Ascencia.txt) =====
// Déblocage canon : 3 "résonateurs harmoniques" = habillage narratif des boss des
// Zones 8/9/10 déjà vaincus (aucun nouveau système de quête — voir game/donjon.js
// canEnterBreche()), puis un combat unique contre le Gardien Harmonique (réutilise
// le boss 'archange', zone 15 — seul boss du catalogue à la fois thématiquement
// "entité de pure harmonie" ET pourvu d'un vrai sprite — rescalé au niveau Zone 10
// pour rester franchissable juste après la résolution de la quête ; voir donjon.js).
export const RESONATOR_ZONES = [8, 9, 10];
export const GARDIEN_HARMONIQUE_BOSS = 'archange';
export const GARDIEN_HARMONIQUE_LABEL = 'Gardien Harmonique';

// Quartiers du village (structure maquette).
export const VILLAGE = [
  {
    quartier: 'Quartier des Artisans',
    cards: [
      // status/desc réécrits dynamiquement par views/village.js (rareté réellement
      // débloquée via l'Ascension, voir game/ascension.js highestUnlockedRarity) —
      // les valeurs ci-dessous ne sont qu'un filet si jamais l'override échoue.
      { id: 'forge',      title: 'Forge',      icon: 'assets/sprites/icons/forge.png',  status: 'Commune',    desc: 'Fabrication.' },
      { id: 'cuisinier',  title: 'Cuisinier',  icon: 'assets/sprites/icons/cuisine.png', status: 'Disponible', desc: 'Plats de récupération.', full: true },
      { id: 'alchimiste', title: 'Alchimiste', icon: 'assets/sprites/potions/potion_violette.png', status: 'Disponible', desc: 'Philtres de combat.', full: true },
    ],
  },
  {
    quartier: 'Quartier des Récolteurs',
    cards: RECOLTE_CARDS,
  },
  {
    quartier: 'Quartier Commerçant',
    cards: [
      { id: 'marchand', title: 'Marchand', icon: 'assets/sprites/objets/piece_or.png', status: 'Disponible', desc: 'Échange de biens.', full: true },
      { id: 'primes',   title: 'Primes',   icon: 'assets/sprites/objets/parchemin_scelle.png', status: 'Disponible', desc: 'Défis quotidiens.', full: true },
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
  // Ascension / Constellations (Phase 6) — voir game/ascension.js.
  ascension: {
    unlockZone: 5,           // zone minimale débloquée pour pouvoir Ascender — abaissé de
    // 10 à 5 le 2026-07-17 (voir rapport_difficulte_zone10.md) : le mur de difficulté réel
    // arrivait dès la Zone 4-5 en progression normale, la Zone 10 n'était pas atteignable
    // du tout. `unlockZone` ne fait que rendre l'Ascension ÉLIGIBLE — rien n'empêche de
    // continuer à jouer au-delà (Zone 6-8) pour accumuler plus de zonePoints avant
    // d'Ascender : la formule (pointsBreakdown() ci-dessous) récompense d'ailleurs un seuil
    // BAS, chaque zone au-delà du seuil comptant pour +1 point quel que soit ce seuil.
    pointsPerZone: 1,        // points de Constellation par zone au-delà du seuil (formule extensible : + étage de donjon plus tard)
    goldPerPoint: 10000,     // +1 point de Constellation par tranche d'or accumulé au moment d'Ascender
    respecBaseEclats: 5,     // coût du 1er respec (arbre entier) — en Éclats d'Ascension, LA ressource premium (pas `fragments`, qui est une monnaie de craft courante)
    respecGrowth: 1.5,       // multiplicateur de coût à chaque respec suivant
    bagBase: 20,             // capacité de sac restaurée après reset (avant bonus Écho)
  },
  // La Brèche Instable (donjon à étages rejouable à l'infini — voir game/donjon.js).
  // Profondeur = étage courant (0 = premier, on "descend" — jamais négatif en interne,
  // le signe "-N étages" du Lore n'est qu'une convention d'affichage côté UI).
  donjon: {
    zoneEquivBase: 5,        // difficulté de l'étage 0 = Zone 5 (demande initiale : "difficulté zone 5")
    floorsPerZoneStep: 5,    // +1 zone de difficulté équivalente tous les N étages (étage 25 = Zone 10)
    checkpointInterval: 10,  // un checkpoint (sélectionnable à l'entrée) tous les N étages
    gridBaseSize: 5,         // côté de la grille à l'étage 0 (5x5)
    gridMaxSize: 13,         // plafond (au-delà, la DENSITÉ monte plutôt que la taille — DOM/pathing raisonnables)
    gridGrowthFloors: 10,    // +1 case de côté tous les N étages
    enemyBase: 4,            // nb de cases ennemi à l'étage 0
    enemyPer: 3,              // +1 ennemi tous les N étages
    eventRatio: 0.15,         // % des cases restantes (hors ennemis/boss/entrée) en case événement
    lossPenaltyPct: 50,       // % du butin de la run perdu sur sortie forcée (défaite ou bouton Retour)
    exitHpPct: 50,            // % PV max restaurés à la sortie de la Brèche (propre ou forcée)
    // Extrapolation du scale au-delà de la Zone 25 (fin du tableau ZONES) : croissance
    // géométrique dérivée de la pente réelle Z20→Z25, pour un donjon vraiment infini
    // sans dépendre d'un tableau fini — voir game/donjon.js scaleForFloor().
    scaleGrowthRate: 1.10,
  },
};

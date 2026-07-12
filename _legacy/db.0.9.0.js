// ============================================================================
// FICHIER DE BASE DE DONNÉES (DB) DU JEU
// Ce fichier contient toutes les données statiques comme les objets, 
// les ennemis, les expéditions, etc.
// ============================================================================

// ----------------------------------------------------------------------------
// SECTION: CONSTANTES ET CONFIGURATIONS GLOBALES
// ----------------------------------------------------------------------------

const SAVE_VERSION = "0.9.0"
const LEADERBOARD_SIZE = 10;
const IS_DEBUG_MODE = true;
const SPEED_UP_COST_PER_HOUR = 50;

const INVENTORY_SORT_ORDERS = {
    resources: [
        { key: 'logical', emoji: '🧠' },
        { key: 'alpha', emoji: '🔤' },
        { key: 'quantity_desc', emoji: '↘️' },
        { key: 'quantity_asc', emoji: '↗️' }
    ],
    consumables: [
        { key: 'alpha', emoji: '🔤' },
        { key: 'quantity_desc', emoji: '↘️' },
        { key: 'quantity_asc', emoji: '↗️' }
    ],
    equipment: [
        { key: 'rarity', emoji: '✨' },
        { key: 'type', emoji: '🗂️' },
        { key: 'alpha', emoji: '🔤' }
    ]
};

const CODEX_INFO_THRESHOLDS = {
    SPRITE: 1,
    DESCRIPTION: 10,
    LOCATIONS: 50,
    STATS: 100
};

const GUILD_SETTINGS = {
    CONTRIBUTION_MAX_CHARGES: 20,
    CONTRIBUTION_REGEN_MINUTES: 10,
    CONTRIBUTION_COST: 500,
    CONTRIBUTION_XP_GAIN: 5,
    CONTRIBUTION_CURRENCY_GAIN: 1
};

const GUILD_PERMISSIONS_DB = {
    permissionKeys: [
        { id: 'canInvite', defaultRanks: ['R0', 'R1'] },
        { id: 'canKick', defaultRanks: ['R0', 'R1'] },
        { id: 'canEditRanks', defaultRanks: ['R0'] },
        { id: 'canEditGuildInfo', defaultRanks: ['R0'] },
        { id: 'use_guild_money', defaultRanks: ['R0', 'R1'] },
        // NOUVELLE LIGNE
        { id: 'canManageBoss', defaultRanks: ['R0', 'R1'] } 
    ],
    editableRanks: ['R0', 'R1', 'R2', 'R3']
};

const GUILD_SHOP_DB = {
    // MON COMMENTAIRE : Refonte complète de la boutique personnelle avec de nouveaux objets et coûts.
    personal: [
        { id: 'cache_initie', itemType: 'CONSUMABLE_PACK', nameKey: 'guild_shop.items.cache_initie.name', descriptionKey: 'guild_shop.items.cache_initie.description', icon: '🎁', requiredLevel: 1, cost: 150, contents: { eclats_instables: 50, fragments: 250 } },
        { id: 'anneau_confrerie', itemType: 'EQUIPMENT', nameKey: 'items.epic.anneau_confrerie.name', descriptionKey: 'guild_shop.items.anneau_confrerie.description', icon: '💍', requiredLevel: 5, cost: 500 },
        { id: 'cadre_loyaute', itemType: 'FRAME', nameKey: 'frames.cadre_loyaute.name', descriptionKey: 'guild_shop.items.cadre_loyaute.description', icon: '🖼️', requiredLevel: 10, cost: 2500 },
    ],
    // MON COMMENTAIRE : Augmentation drastique des coûts des boosts de guilde.
    guild: [
        { id: 'guild_xp_boost_1', nameKey: 'guild_shop.items.guild_xp_boost_1.name', descriptionKey: 'guild_shop.items.guild_xp_boost_1.description', icon: '🌟', requiredLevel: 1, cost: 7500, durationHours: 2 },
        { id: 'guild_resource_boost_1', nameKey: 'guild_shop.items.guild_resource_boost_1.name', descriptionKey: 'guild_shop.items.guild_resource_boost_1.description', icon: '🌳', requiredLevel: 5, cost: 1200, durationHours: 6 },
        { id: 'guild_strength_boost_1', nameKey: 'guild_shop.items.guild_strength_boost_1.name', descriptionKey: 'guild_shop.items.guild_strength_boost_1.description', icon: '💪', requiredLevel: 10, cost: 3500, durationHours: 12 },
    ]
};

const ENEMY_LOCATIONS_DB = {
    'RAT_GEANT': ['expeditions.starters.menaceRats.title', 'expeditions.events.cimetiere_enquete.description'],
    'REINE_DES_RATS': ['expeditions.starters.menaceRats.title'],
    'BANDIT': ['expeditions.starters.escorteMarchand.title', 'expeditions.starters.laTourDeGardeAbandonnee.title'],
    'CHEF_BANDIT': ['expeditions.starters.chassePrimeBandit.title', 'expeditions.starters.laTourDeGardeAbandonnee.title'],
    'GOLEM_PIERRE': ['expeditions.starters.lesMinesDeCristal.title'],
    'MINI_GOLEM_PIERRE': ['expeditions.starters.laCiteDesAutomates.title'],
    'GARDIEN_DE_PIERRE_ETERNE': ['expeditions.starters.bibliothequeOubliee.title'],
    'ELEMENTAIRE_EAU': ['expeditions.starters.templeEnglouti.title'],
    'INSECTE_MINEUR': ['expeditions.starters.problemeMine.title'],
    'ARAIGNEE_DE_CAVE': ['expeditions.starters.nettoyageCave.title'],
    'LOUP_AFFAME': ['expeditions.starters.reparationCloture.title'],
    'SANGLIER_FURIEUX': ['expeditions.starters.leSilenceDeLaFerme.title'],
    'ARAIGNEE_GEANTE': ['expeditions.starters.lesMurmuresSousLaVille.title'],
    'GRIFFON': ['expeditions.starters.leSommetDuMonde.title'],
    'BASILIC': ['expeditions.starters.laTaniereDuBasilic.title'],
    'GOBELIN_FRONDEUR': ['expeditions.starters.problemeGobelins.title', 'expeditions.starters.siegeGobelin.title'],
    'ORC_BERSERKER': ['expeditions.starters.leTrolSousLePont.title', 'expeditions.starters.siegeGobelin.title'],
    'SQUELETTE_GUERRIER': ['expeditions.starters.bruitCimetiere.title', 'expeditions.starters.laCrypteAgitee.title'],
    'NECROMANCIEN_APPRENTI': ['expeditions.starters.leRituelDeSang.title'],
    'CULTISTE_ZELOTE': ['expeditions.starters.lesCultistesDansLesBois.title'],
    'GARDE_AUTOMATE': ['expeditions.starters.leVolDuSiecle.title', 'expeditions.starters.lePacteInfernal.title'],
    'INITIE_DE_L_OMBRE': ['expeditions.starters.laGuerreDesGuildes.title'],
    'ASSASSIN_DE_L_OMBRE': ['expeditions.starters.leSablierDuTemps.title'],
    'MAITRE_DE_L_OMBRE': ['expeditions.starters.conseilOmbres.title'],
    'SPECTRE_GEMISSANT': ['expeditions.starters.boisMurmurants.title', 'expeditions.starters.lePuitsDesSouhaits.title', 'expeditions.starters.leNavireFrequente.title'],
    'ELEMENTAIRE_DE_MAGMA': ['expeditions.starters.coeurVolcan.title'],
    'HARPIE': ['expeditions.starters.leContratDHerboriste.title'],
    'DJINN': ["expeditions.starters.loasisPerdue.title"],
    'LE_COLLECTEUR': ['expeditions.starters.laCiteDesAutomates.title'],
    'CHIMERE': ['expeditions.starters.lileDeLaChimere.title', 'expeditions.starters.leCoeurDeLaForetMonde.title'],
    'HYDRE_DES_MARAIS': ['expeditions.starters.laToisonDOr.title'],
    'OTYUGH': ['expeditions.starters.lesMurmuresSousLaVille.title'],
    'MINOTAURE': ['expeditions.starters.leLabyrintheDuMinotaure.title'],
    'PROFOND_GUERRIER': ['expeditions.starters.laGuerreContreLesProfonds.title'],
    'PROFOND_CHAMPION': ['expeditions.starters.laGuerreContreLesProfonds.title'],
    'ARCHANGE': ['expeditions.starters.reliqueDivine.title'],
    'DRAGON_ROUGE_ANCIEN': ['expeditions.starters.chasseDragon.title'],
    'ARCHIMAGE_DEMENT': ['expeditions.starters.tourSorcier.title'],
    'ROI_SINGE_ESPRIT': ['expeditions.starters.leTombeauDuRoiSinge.title'],
    'SHOGGOTH': ['expeditions.starters.laCite Engloutie.title'],
    'GOLEM_PIERRE_MYTHIQUE': ['expeditions.starters.roiEndormi.title'],
    'ROI_BARBARE': ['expeditions.starters.leTournoiDesChampionsEternels.title'],
    'ARCHERE_ELFE': ['expeditions.starters.leTournoiDesChampionsEternels.title'],
    'CHEVALIER_ETERNEL': ['expeditions.starters.leTournoiDesChampionsEternels.title'],
    'FORGERON_DEMON': ['expeditions.starters.leForgeronDesAmes.title'],
    'DEMON_MINEUR': ['expeditions.starters.lArmeeDesTenebres.title'],
    'GENERAL_DEMON': ['expeditions.starters.lArmeeDesTenebres.title'],
    'HORREUR_DIMENSIONNELLE': ['expeditions.starters.brecheDimensionnelle.title'],
    'GRIFFON_CORROMPU': ['expeditions.starters.coeurCorrompu.title'],
    'DRAGON_CORROMPU': ['expeditions.starters.coeurCorrompu.title'],
    'DIEU_FOU': ['expeditions.starters.leDernierDieu.title'],
    'DOUBLE_SOMBRE': ['expeditions.starters.leRefletBrisé.title'],
    'OUROBOROS': ['expeditions.starters.leCycleDeLaRoue.title'],
    'TALOS_REFORGE': ['expeditions.starters.leJardinDHephaistos.title'],
    'GARDIEN_ERODE': ['adventure.nodes.A1_N6_MINE.name'],
    'ESPRIT_ANCIEN_TOURMENTE': ['adventure.nodes.A3_N5_ENIGME.name'],
    'HERAUT_DU_SILENCE': ['adventure.nodes.A3_N7_HERAUT.name'],
    'JUGE_DISSONANT': ['adventure.nodes.A3_N9_BOSS.name'],
    'FRAGMENT_DE_DISSONANCE_MINEUR': ['adventure.nodes.A4_N2_FRAGMENTS.name', 'adventure.nodes.A4_N5_INTRUSION.name'],
    'GARDIEN_VERROUILLE': ['adventure.nodes.A4_N3_SEAU.name'],
    'ARME_DE_LARRY': ['adventure.nodes.A4_N8_ARME.name'],
    'HARMONISTE_CORROMPU': ['adventure.nodes.A4_N10_BOSS.name']
};

const EXPEDITION_ENERGY_COSTS = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
    mythic: 6
};
const ENERGY_REGEN_SECONDS = 60;

const SET_ITEM_COSTS = { rare: 12, epic: 30, legendary: 90, mythic: 200 };

const PATCH_NOTES_DB = {
    'v0.5.0': {
        titleKey: "patchNotes.v0_5_0.title",
        sections: [
            { titleKey: "patchNotes.v0_5_0.sections.major", pointsKey: "patchNotes.v0_5_0.points.major" },
            { titleKey: "patchNotes.v0_5_0.sections.qol", pointsKey: "patchNotes.v0_5_0.points.qol" },
            { titleKey: "patchNotes.v0_5_0.sections.bugs", pointsKey: "patchNotes.v0_5_0.points.bugs" }
        ]
    },
    'v0.6.0': {
        titleKey: "patchNotes.v0_6_0.title",
        sections: [
            { titleKey: "patchNotes.v0_6_0.sections.major", pointsKey: "patchNotes.v0_6_0.points.major" },
            { titleKey: "patchNotes.v0_6_0.sections.qol", pointsKey: "patchNotes.v0_6_0.points.qol" },
            { titleKey: "patchNotes.v0_6_0.sections.balancing", pointsKey: "patchNotes.v0_6_0.points.balancing" }
        ]
    },
    'v0.7.0': {
        titleKey: "patchNotes.v0_7_0.title",
        sections: [
            { titleKey: "patchNotes.v0_7_0.sections.major", pointsKey: "patchNotes.v0_7_0.points.major" },
            { titleKey: "patchNotes.v0_7_0.sections.balancing", pointsKey: "patchNotes.v0_7_0.points.balancing" },
            { titleKey: "patchNotes.v0_7_0.sections.bugs", pointsKey: "patchNotes.v0_7_0.points.bugs" }
        ]
    },
    'v0.8.0': {
        titleKey: "patchNotes.v0_8_0.title",
        sections: [
            { titleKey: "patchNotes.v0_8_0.sections.major", pointsKey: "patchNotes.v0_8_0.points.major" },
            { titleKey: "patchNotes.v0_8_0.sections.qol", pointsKey: "patchNotes.v0_8_0.points.qol" },
            { titleKey: "patchNotes.v0_8_0.sections.balancing", pointsKey: "patchNotes.v0_8_0.points.balancing" },
            { titleKey: "patchNotes.v0_8_0.sections.bugs", pointsKey: "patchNotes.v0_8_0.points.bugs" }
        ]
    },
    'v0.9.0': {
        titleKey: "patchNotes.v0_9_0.title",
        sections: [
            { titleKey: "patchNotes.v0_9_0.sections.major", pointsKey: "patchNotes.v0_9_0.points.major" },
            { titleKey: "patchNotes.v0_9_0.sections.garden", pointsKey: "patchNotes.v0_9_0.points.garden" },
            { titleKey: "patchNotes.v0_9_0.sections.qol", pointsKey: "patchNotes.v0_9_0.points.qol" },
            { titleKey: "patchNotes.v0_9_0.sections.balancing", pointsKey: "patchNotes.v0_9_0.points.balancing" }
        ]
    }
};

const STAT_ICONS = {
    Vie: '❤️',
    Force: '💪',
    Agilité: '🤸',
    Chance: '🍀',
    Intelligence: '🧠',
    Défense: '🛡️'
};

const STAT_NAMES = ['Vie', 'Force', 'Agilité', 'Chance', 'Intelligence', 'Défense'];
const EQUIPMENT_SLOTS = ['Tête', 'Torse', 'Jambes', 'Pieds', 'Mains', 'Arme', 'Accessoire', 'Artefact'];
const RARITY_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];

const SPRITE_PATHS = {
    // Attributs
    'Vie': 'assets/sprites/icons/vie.png',
    'Force': 'assets/sprites/icons/force.png',
    'Agilité': 'assets/sprites/icons/agilite.png',
    'Chance': 'assets/sprites/icons/chance.png',
    'Intelligence': 'assets/sprites/icons/intel.png',
    'Défense': 'assets/sprites/icons/defense.png',

    // Ressources communes
    'bois': 'assets/sprites/ressources/bois.png',
    'metal': 'assets/sprites/ressources/metal.png',
    'tissu': 'assets/sprites/ressources/tissu.png',
    'fragments': 'assets/sprites/ressources/fragment.png',
    'marques_de_chasse': 'assets/sprites/ressources/marque_chasse.png',
    'bounty_tokens': 'assets/sprites/ressources/bounty_token.png',
    'eclats_instables': 'assets/sprites/ressources/eclats_instables.png',
    'cle_de_la_breche': 'assets/sprites/ressources/cle_de_la_breche.png',

    // Mon commentaire : J'unifie ici toutes les clés des ressources d'artisanat.
    'coeur_de_golem': 'assets/sprites/ressources/coeur_golem.png',
    'essence_spectrale': 'assets/sprites/ressources/essence_spectrale.png',
    'chitine_renforcee': 'assets/sprites/ressources/chitine.png',
    'plume_de_griffon': 'assets/sprites/ressources/plume_griffon.png',
    'sang_de_basilic': 'assets/sprites/ressources/basilic_blood.png',
    'oeil_de_chimere': 'assets/sprites/ressources/oeil_chimere.png',
    'ecaille_de_profond': 'assets/sprites/ressources/ecaille_profond.png',
    'totem_orc': 'assets/sprites/ressources/totem_orc.png',
    "fragment_d_ame_de_demon": 'assets/sprites/ressources/ame_demon.png',
    'coeur_de_dragon_ancien': 'assets/sprites/ressources/coeur_dragon.png',
    "larme_d_archange": 'assets/sprites/ressources/larme_archange.png',
    'poussiere_de_vide': 'assets/sprites/ressources/poussiere_vide.png',
    'herbes_medicinales': 'assets/sprites/ressources/herbes.png',
    'essence_dissonante': 'assets/sprites/ressources/essence_dissonante.png',
    'essence_dissonante_pure': 'assets/sprites/ressources/essence_dissonante_pure.png',
    'artefact_ancien_harmonique': 'assets/sprites/ressources/artefact_harmonique.png',

    //sprite donjon
    'dungeon_combat': 'assets/sprites/icons/standard.png',
    'dungeon_elite': 'assets/sprites/icons/elite.png',
    'dungeon_event': 'assets/sprites/icons/event.png',
    'dungeon_complete': 'assets/sprites/icons/complete.png',
    'dungeon_exit': 'assets/sprites/icons/next_floor.png',
    'dungeon_start': 'assets/sprites/icons/start.png',
    'dungeon_player_token': 'assets/sprites/icons/player_token.png',
    'dungeon_rest': 'assets/sprites/icons/rest.png',
    
    // Icônes d'équipement par type
    'Tête': 'assets/sprites/icons/slot_head.png',
    'Torse': 'assets/sprites/icons/slot_torso.png',
    'Jambes': 'assets/sprites/icons/slot_legs.png',
    'Pieds': 'assets/sprites/icons/slot_feet.png',
    'Mains': 'assets/sprites/icons/slot_hands.png',
    'Arme': 'assets/sprites/icons/slot_weapon.png',
    'Accessoire': 'assets/sprites/icons/slot_accessory.png',
    'Artefact': 'assets/sprites/icons/slot_artifact.png',
    
    // Icônes diverses
    'xp': 'assets/sprites/icons/xp.png',
    'mana': 'assets/sprites/icons/mana.png',
    'Cristal de Givre': 'assets/sprites/garden/plants/cristal_givre_3.png',
    'Fleur de Lave': 'assets/sprites/garden/plants/fleur_lave_3.png',
    'Graine Solaire': 'assets/sprites/garden/plants/graine_solaire_3.png',
    'Racine Terreuse': 'assets/sprites/garden/plants/racine_terreuse_3.png',
    'Tournesol Radieux': 'assets/sprites/garden/plants/tournesol_radieux_3.png',
    'Lys de Givre': 'assets/sprites/garden/plants/lys_givre_3.png',
    'Champignon Terreux': 'assets/sprites/garden/plants/champignon_terreux_3.png',
    'Fleur de Rosée': 'assets/sprites/garden/plants/fleur_rosee_3.png',
    'Rose Sanguine': 'assets/sprites/garden/plants/rose_sanguine_3.png',
    'marques_de_guilde': 'assets/sprites/ressources/marque_guilde.png',
    'eclats_ascension': 'assets/sprites/ressources/eclats_ascension.png'
};


const CLASS_DATA_DB = {
    'Guerrier': {
        portrait: 'assets/sprites/portraits/guerrier.png'
    },
    'Archer': {
        portrait: 'assets/sprites/portraits/archer.png'
    },
    'Mage': {
        portrait: 'assets/sprites/portraits/mage.png'
    }
};

const RARITY_CONFIG = {
  common:   { nameKey: "rarity.common",   colorClass: "rarity-common", powerThreshold: 40 },
  uncommon: { nameKey: "rarity.uncommon", colorClass: "rarity-uncommon", powerThreshold: 100 },
  rare:     { nameKey: "rarity.rare",     colorClass: "rarity-rare",    powerThreshold: 300 },
  epic:     { nameKey: "rarity.epic",   colorClass: "rarity-epic",    powerThreshold: 600 },
  legendary:{ nameKey: "rarity.legendary", colorClass: "rarity-legendary", powerThreshold: 1200 },
  mythic:   { nameKey: "rarity.mythic",  colorClass: "rarity-mythic",  powerThreshold: 3000 },
};

const ENCHANTER_UNLOCK_COST_FRAGMENTS = 50;
const ENCHANTER_UPGRADE_COSTS = [
    { cost: { fragments: 150, metal: 2500, tissu: 1000 }, constructionTimeHours: 0.5 }, // Niv 2
    { cost: { fragments: 400, metal: 7500, tissu: 3000 }, constructionTimeHours: 1 }, // Niv 3
    { cost: { fragments: 1000, tissu: 15000, bois: 5000 }, constructionTimeHours: 2 }, // Niv 4
    { cost: { fragments: 2500, bois: 20000, metal: 10000 }, constructionTimeHours: 4 }, // Niv 5
    { cost: { fragments: 6000, bois: 50000, metal: 25000 }, constructionTimeHours: 6 }, // Niv 6
    { cost: { fragments: 15000, bois: 120000, metal: 60000 }, constructionTimeHours: 8 }, // Niv 7
    { cost: { fragments: 35000, bois: 250000, metal: 125000 }, constructionTimeHours: 12 }, // Niv 8
    { cost: { fragments: 75000, bois: 500000, metal: 250000 }, constructionTimeHours: 18 }, // Niv 9
    { cost: { fragments: 150000, bois: 1000000, metal: 500000 }, constructionTimeHours: 24 }, // Niv 10
];

const VILLAGE_DB = {
    'forge': {
        nameKey: "ui.village.buildings.forge",
        descriptionKey: "ui.village.buildings.forge_desc"
    },
    'enchanter': {
        nameKey: "ui.village.buildings.enchanter",
        descriptionKey: "ui.village.buildings.enchanter_desc"
    }
};
const ENCHANTER_MAX_RARITY_BY_LEVEL = [
    'uncommon', 'rare', 'epic', 'legendary', 'mythic'
];

const SKILLS_DB = {
    'Guerrier': {
        'ATTAQUE_BASIQUE': {
            nameKey: "skills.guerrier.attaque_basique.name",
            descriptionKey: "skills.guerrier.attaque_basique.description",
            scales_with: 'Force',
            damage_multiplier: 1.0,
            precision_modifier: 0,
            level_required: 1
        },
        'ATTAQUE_LOURDE': {
            nameKey: "skills.guerrier.attaque_lourde.name",
            descriptionKey: "skills.guerrier.attaque_lourde.description",
            scales_with: 'Force',
            damage_multiplier: 1.5,
            precision_modifier: -20,
            level_required: 15
        }
    },
    'Archer': {
        'TIR_SIMPLE': {
            nameKey: "skills.archer.tir_simple.name",
            descriptionKey: "skills.archer.tir_simple.description",
            scales_with: 'Agilité',
            damage_multiplier: 1.0,
            precision_modifier: 10,
            level_required: 1
        },
        'TIR_PERFORANT': {
            nameKey: "skills.archer.tir_perforant.name",
            descriptionKey: "skills.archer.tir_perforant.description",
            scales_with: 'Agilité',
            damage_multiplier: 1.2,
            precision_modifier: -10,
            effects: { armor_penetration: 25 },
            level_required: 15
        }
    },
    'Mage': {
        'ECLAIR_DE_GIVRE': {
            nameKey: "skills.mage.eclair_de_givre.name",
            descriptionKey: "skills.mage.eclair_de_givre.description",
            scales_with: 'Intelligence',
            mana_cost: 8,
            damage_multiplier: 1.2,
            precision_modifier: 5,
            level_required: 1
        },
        'BOULE_DE_FEU': {
            nameKey: "skills.mage.boule_de_feu.name",
            descriptionKey: "skills.mage.boule_de_feu.description",
            scales_with: 'Intelligence',
            mana_cost: 17,
            damage_multiplier: 0.8,
            precision_modifier: -20,
            effects: { aoe: true, aoe_multiplier: 0.6 },
            level_required: 50
        },
        'COUP_DE_BATON': {
            nameKey: "skills.mage.coup_de_baton.name",
            descriptionKey: "skills.mage.coup_de_baton.description",
            scales_with: 'Force',
            damage_multiplier: 0.4,
            is_fallback: true,
            level_required: 1
        }
    }
};


const CONSUMABLES_DB = {
    'POTION_SOIN_MINEURE': {
        id: 'POTION_SOIN_MINEURE',
        nameKey: "consumables.potion_soin_mineure.name",
        descriptionKey: "consumables.potion_soin_mineure.description",
        target: 'player',
        effect: { type: 'HEAL_FLAT', value: 50 },
    },
    'POTION_SOIN': {
        id: 'POTION_SOIN',
        nameKey: "consumables.potion_soin.name",
        descriptionKey: "consumables.potion_soin.description",
        target: 'player',
        effect: { type: 'HEAL_FLAT', value: 50 },
    },
    'POTION_MANA_MINEURE': {
        id: 'POTION_MANA_MINEURE',
        nameKey: "consumables.potion_mana_mineure.name",
        descriptionKey: "consumables.potion_mana_mineure.description",
        target: 'player',
        effect: { type: 'MANA_FLAT', value: 30 },
    },
    'POTION_MANA': {
        id: 'POTION_MANA',
        nameKey: "consumables.potion_mana.name",
        descriptionKey: "consumables.potion_mana.description",
        target: 'player',
        effect: { type: 'MANA_FLAT', value: 30 },
    },
    'ELIXIR_FORCE_FAIBLE': {
        id: 'ELIXIR_FORCE_FAIBLE',
        nameKey: "consumables.elixir_force_faible.name",
        descriptionKey: "consumables.elixir_force_faible.description",
        target: 'player',
        effect: { type: 'BUFF', stat: 'Force', value: 10, duration: 3 },
    },
    'CLE_DE_LA_BRECHE': {
        id: 'CLE_DE_LA_BRECHE',
        nameKey: "consumables.cle_de_la_breche.name",
        descriptionKey: "consumables.cle_de_la_breche.description",
        target: 'dungeon',
        effect: { type: 'UNLOCK', value: 'dungeon' },
    },
    'BAUME_DE_TRIAGE': {
        id: 'BAUME_DE_TRIAGE',
        nameKey: "consumables.baume_de_triage.name",
        descriptionKey: "consumables.baume_de_triage.description",
        target: 'player',
        effect: { type: 'HEAL_MANA_PERCENT', value: 25 },
    },
    'ELIXIR_PEAU_DE_PIERRE': {
        id: 'ELIXIR_PEAU_DE_PIERRE',
        nameKey: "consumables.elixir_peau_de_pierre.name",
        descriptionKey: "consumables.elixir_peau_de_pierre.description",
        target: 'player',
        effect: { type: 'BUFF', stat: 'Défense', value: 15, duration: 3 },
    },
    'POTION_CLAIRVOYANCE': {
        id: 'POTION_CLAIRVOYANCE',
        nameKey: "consumables.potion_clairvoyance.name",
        descriptionKey: "consumables.potion_clairvoyance.description",
        target: 'player',
        effect: { type: 'BUFF', stat: 'Chance', value: 20, duration: 5 },
    },
    'HUILE_DE_SAIGNEMENT': {
        id: 'HUILE_DE_SAIGNEMENT',
        nameKey: "consumables.huile_de_saignement.name",
        descriptionKey: "consumables.huile_de_saignement.description",
        target: 'player',
        effect: { type: 'BUFF', stat: 'bleed_chance_percent', value: 10, duration: 3 },
    },
};

const ALCHEMY_RECIPES_DB = {
    'POTION_SOIN_MINEURE': {
        id: 'POTION_SOIN_MINEURE',
        nameKey: "alchemy.potion_soin_mineure.name",
        descriptionKey: "alchemy.potion_soin_mineure.description",
        craftCost: { 'Herbes Médicinales': 8, 'tissu': 10 }
    },
    'POTION_SOIN': {
        id: 'POTION_SOIN',
        nameKey: "alchemy.potion_soin.name",
        descriptionKey: "alchemy.potion_soin.description",
        craftCost: { 'Herbes Médicinales': 20, 'tissu': 100 }
    },
    'POTION_MANA_MINEURE': {
        id: 'POTION_MANA_MINEURE',
        nameKey: "alchemy.potion_mana_mineure.name",
        descriptionKey: "alchemy.potion_mana_mineure.description",
        craftCost: { 'Herbes Médicinales': 5, 'bois': 5 }
    },
    'POTION_MANA': {
        id: 'POTION_MANA',
        nameKey: "alchemy.potion_mana.name",
        descriptionKey: "alchemy.potion_mana.description",
        craftCost: { 'Herbes Médicinales': 12, 'bois': 50 }
    },
    'ELIXIR_FORCE_FAIBLE': {
        id: 'ELIXIR_FORCE_FAIBLE',
        nameKey: "alchemy.elixir_force_faible.name",
        descriptionKey: "alchemy.elixir_force_faible.description",
        craftCost: { 'Herbes Médicinales': 15, 'metal': 20 }
    },
    'ELIXIR_PEAU_DE_PIERRE': {
        id: 'ELIXIR_PEAU_DE_PIERRE',
        nameKey: "alchemy.elixir_peau_de_pierre.name",
        descriptionKey: "alchemy.elixir_peau_de_pierre.description",
        craftCost: { 'Racine Terreuse': 3, 'Champignon Terreux': 1 },
        effect: { type: 'BUFF', stat: 'Défense', value: 15, duration: 3 }
    },
    'POTION_CLAIRVOYANCE': {
        id: 'POTION_CLAIRVOYANCE',
        nameKey: "alchemy.potion_clairvoyance.name",
        descriptionKey: "alchemy.potion_clairvoyance.description",
        craftCost: { 'Tournesol Radieux': 1, 'Fleur de Rosée': 2 },
        effect: { type: 'BUFF', stat: 'Chance', value: 20, duration: 5 }
    },
    'HUILE_DE_SAIGNEMENT': {
        id: 'HUILE_DE_SAIGNEMENT',
        nameKey: "alchemy.huile_de_saignement.name",
        descriptionKey: "alchemy.huile_de_saignement.description",
        craftCost: { 'Rose Sanguine': 1, 'Herbes Médicinales': 25 },
        effect: { type: 'BUFF', stat: 'bleed_chance_percent', value: 10, duration: 3 }
    }    
};

const COOKING_RECIPES_DB = {
    'RAGOUT_ROBORANT': {
        id: 'RAGOUT_ROBORANT',
        nameKey: "cooking.ragout_roborant.name",
        descriptionKey: "cooking.ragout_roborant.description",
        craftCost: { 'Racine Terreuse': 2, 'Herbes Médicinales': 10 },
        bonus: { stat: 'Vie_percent', value: 10, duration_in_combats: 5 }
    },
    'INFUSION_GLACIALE': {
        id: 'INFUSION_GLACIALE',
        nameKey: "cooking.infusion_glaciale.name",
        descriptionKey: "cooking.infusion_glaciale.description",
        craftCost: { 'Cristal de Givre': 1, 'Lys de Givre': 1 },
        bonus: { stat: 'mana_regen_percent', value: 25, duration_in_combats: 5 }
    },
    'SALADE_DE_ZEPHYR': {
        id: 'SALADE_DE_ZEPHYR',
        nameKey: "cooking.salade_de_zephyr.name",
        descriptionKey: "cooking.salade_de_zephyr.description",
        craftCost: { 'Fleur de Rosée': 2, 'Graine Solaire': 5 },
        bonus: { stat: 'evasion_chance_percent', value: 5, duration_in_combats: 3 }
    },
    'STEAK_ENFLAMME': {
        id: 'STEAK_ENFLAMME',
        nameKey: "cooking.steak_enflamme.name",
        descriptionKey: "cooking.steak_enflamme.description",
        craftCost: { 'Fleur de Lave': 2, 'Rose Sanguine': 1 },
        bonus: { stat: 'Force_percent', value: 10, duration_in_combats: 5 }
    },
    'SOUFFLE_DE_LA_FORTUNE': {
        id: 'SOUFFLE_DE_LA_FORTUNE',
        nameKey: "cooking.souffle_de_la_fortune.name",
        descriptionKey: "cooking.souffle_de_la_fortune.description",
        craftCost: { 'Tournesol Radieux': 1, 'Graine Solaire': 10 },
        bonus: { stat: 'LootBonusPercent', value: 10, duration_in_combats: 3 }
    }
};

const MERCHANT_DB = {
    'PEDRO_LE_VOYAGEUR': {
        nameKey: "merchants.pedro.name",
        descriptionKey: "merchants.pedro.description",
        sells: [
            { itemName: "Lot de 5 Fragments", isCurrency: true, amount: 5, price: { resource: 'bois', amount: 2500 }, stock: 2 },
            { itemName: "Amulette de la fortune", price: { resource: 'metal', amount: 1050 }, stock: 1 },
            { itemName: "Potion de Soin Mineure", price: { resource: 'tissu', amount: 40 } }
        ],
        buys: { 'bois': 0.8, 'metal': 1.2, 'tissu': 1 },
        currency: 'bois'
    },
    'VILLAGE_ARTISAN': {
        nameKey: "merchants.village_artisan.name",
        descriptionKey: "merchants.village_artisan.description",
        sells: [
            { itemName: 'Herbes Médicinales', isResource: true, price: { resource: 'bois', amount: 95 } },
            { itemName: 'Herbes Médicinales', isResource: true, price: { resource: 'metal', amount: 95 } },
            { itemName: 'Herbes Médicinales', isResource: true, price: { resource: 'tissu', amount: 95 } },
            { itemName: "Fragment d'âme", isCurrency: true, amount: 1, price: { resource: 'bois', amount: 500 }, stock: Infinity },
            { itemName: "Fragment d'âme", isCurrency: true, amount: 1, price: { resource: 'metal', amount: 500 }, stock: Infinity },
            { itemName: "Fragment d'âme", isCurrency: true, amount: 1, price: { resource: 'tissu', amount: 500 }, stock: Infinity }
        ],
        buys: {}, 
        exchangeRate: 0.7 
    }
};

// ----------------------------------------------------------------------------
// SECTION: FORGE ET ARTISANAT
// ----------------------------------------------------------------------------

const FORGE_UNLOCK_COST = 699;
const FORGE_UPGRADE_COSTS = [
    { cost: { bois: 1500 }, constructionTimeHours: 0.05 }, // Niv 2
    { cost: { bois: 4500, metal: 2500 }, constructionTimeHours: 0.1 }, // Niv 3
    { cost: { fragments: 100, bois: 8000, metal: 3500, tissu: 3000 }, constructionTimeHours: 0.25 }, // Niv 4
    { cost: { fragments: 500, metal: 20000, bois: 15000 }, constructionTimeHours: 0.5 }, // Niv 5
    { cost: { fragments: 2000, metal: 55000, bois: 45000, tissu: 15000 }, constructionTimeHours: 1 }, // Niv 6
    { cost: { fragments: 5000, metal: 120000, bois: 100000 }, constructionTimeHours: 2 }, // Niv 7
    { cost: { fragments: 12000, metal: 250000, bois: 220000 }, constructionTimeHours: 4 }, // Niv 8
    { cost: { fragments: 25000, metal: 500000, bois: 450000 }, constructionTimeHours: 8 }, // Niv 9
    { cost: { fragments: 50000, metal: 1000000, bois: 900000 }, constructionTimeHours: 12 }, // Niv 10
];
const CRAFTING_COST_IN_FRAGMENTS = {
    common: 3,
    uncommon: 20,
    rare: 300,
    epic: 650,
    legendary: 2350,
    mythic: 7600
};
const RECYCLE_YIELD_IN_FRAGMENTS = {
    common: 1,
    uncommon: 3,
    rare: 40,
    epic: 80,
    legendary: 200,
    mythic: 800
};

// ----------------------------------------------------------------------------
// SECTION: CODEX
// ----------------------------------------------------------------------------

const CODEX_THRESHOLDS = [
    { kills: 1,   bonus: { type: 'stats', textKey: 'codex.bonus.unlocked' } },
    { kills: 10,  bonus: { type: 'damage_percent', value: 2 } },
    { kills: 50,  bonus: { type: 'resistance_percent', value: 5 } },
    { kills: 100, bonus: { type: 'damage_percent', value: 5 } },
    { kills: 250, bonus: { type: 'loot_chance', value: 10 } },
];

const CODEX_MILESTONES_DB = {
    10: {
        tierNameKey: "codex.tiers.novice",
        milestones: [
            { requiredEnemies: 1, nameKey: "codex.novice.milestone1_name", reward: { type: 'stat_flat', stat: 'Force', value: 2 } },
            { requiredEnemies: 10, nameKey: "codex.novice.milestone2_name", reward: { type: 'stat_flat', stat: 'CritDamage', value: 5 } },
            { requiredEnemies: 25, nameKey: "codex.novice.milestone3_name", reward: { type: 'stat_percent', stat: 'resource_gain_percent', value: 5 } },
            { requiredEnemies: 'all', nameKey: "codex.novice.milestone4_name", reward: { type: 'special_passive', passive: 'passive_resource_find' } }
        ]
    },
    50: {
        tierNameKey: "codex.tiers.confirme",
        milestones: [
            { requiredEnemies: 1, nameKey: "codex.confirme.milestone1_name", reward: { type: 'stat_flat', stat: 'Agilité', value: 5 } },
            { requiredEnemies: 10, nameKey: "codex.confirme.milestone2_name", reward: { type: 'stat_percent', stat: 'resistance_percent', value: 3 } },
            { requiredEnemies: 25, nameKey: "codex.confirme.milestone3_name", reward: { type: 'stat_percent', stat: 'lifesteal_percent', value: 1 } },
            { requiredEnemies: 'all', nameKey: "codex.confirme.milestone4_name", reward: { type: 'special_passive', passive: 'passive_status_resist' } }
        ]
    },
    100: {
        tierNameKey: "codex.tiers.expert",
        milestones: [
            { requiredEnemies: 1, nameKey: "codex.expert.milestone1_name", reward: { type: 'stat_flat', stat: 'Vie', value: 10 } },
            { requiredEnemies: 10, nameKey: "codex.expert.milestone2_name", reward: { type: 'stat_percent', stat: 'damage_percent', value: 5 } },
            { requiredEnemies: 25, nameKey: "codex.expert.milestone3_name", reward: { type: 'stat_percent', stat: 'bleed_chance_percent', value: 3 } },
            { requiredEnemies: 'all', nameKey: "codex.expert.milestone4_name", reward: { type: 'stat_flat_all', value: 10 } }
        ]
    },
    250: {
        tierNameKey: "codex.tiers.maitre",
        milestones: [
            { requiredEnemies: 1, nameKey: "codex.maitre.milestone1_name", reward: { type: 'stat_flat', stat: 'Intelligence', value: 5 } },
            { requiredEnemies: 10, nameKey: "codex.maitre.milestone2_name", reward: { type: 'stat_percent', stat: 'lifesteal_percent', value: 2 } },
            { requiredEnemies: 25, nameKey: "codex.maitre.milestone3_name", reward: { type: 'stat_percent', stat: 'stun_chance_percent', value: 2 } },
            { requiredEnemies: 'all', nameKey: "codex.maitre.milestone4_name", reward: { type: 'special_passive', passive: 'passive_execute' } }
        ]
    }
};

// ----------------------------------------------------------------------------
// SECTION: OBJETS (ITEMS_DB)
// ----------------------------------------------------------------------------

const ITEMS_DB = [
    // ============================================================================
    // ==   COMMUNS
    // ============================================================================

    // -- Toutes les classes --
    { id: "anneau_simple", nameKey: "items.common.anneau_simple.name", type: "Accessoire", rarity: "common", stats: { Chance: 2 }, cost: { metal: 120 } },
    { id: "bottes_usagees", nameKey: "items.common.bottes_usagees.name", type: "Pieds", rarity: "common", stats: { Agilité: 1, Défense: 1 }, cost: { tissu: 120, bois: 60 } },
    { id: "bracelet_de_force", nameKey: "items.common.bracelet_de_force.name", type: "Accessoire", rarity: "common", stats: { Force: 1 }, cost: { metal: 90 } },
    { id: "casque_en_cuir_use", nameKey: "items.common.casque_en_cuir_use.name", type: "Tête", rarity: "common", stats: { Vie: 3, Défense: 1 }, cost: { tissu: 120, bois: 60 } },
    { id: "ceinture_en_corde", nameKey: "items.common.ceinture_en_corde.name", type: "Accessoire", rarity: "common", stats: { Vie: 2 }, cost: { tissu: 100 } },
    { id: "heaume_de_bois", nameKey: "items.common.heaume_de_bois.name", type: "Tête", rarity: "common", stats: { Défense: 2 }, cost: { bois: 200 } },
    { id: "jambieres_de_voyageur", nameKey: "items.common.jambieres_de_voyageur.name", type: "Jambes", rarity: "common", stats: { Vie: 3 }, cost: { tissu: 180 } },
    { id: "pantalon_de_paysan", nameKey: "items.common.pantalon_de_paysan.name", type: "Jambes", rarity: "common", stats: { Agilité: 1, Vie: 1 }, cost: { tissu: 144 } },
    { id: "protege_tibias_en_cuir", nameKey: "items.common.protege_tibias_en_cuir.name", type: "Jambes", rarity: "common", stats: { Défense: 2 }, cost: { tissu: 150, bois: 50 } },
    { id: "tunique_dechiree", nameKey: "items.common.tunique_dechiree.name", type: "Torse", rarity: "common", stats: { Vie: 4 }, cost: { tissu: 300 } },
    { id: "ceinture_en_cuir_simple", nameKey: "items.common.ceinture_en_cuir_simple.name", type: "Accessoire", rarity: "common", stats: { Vie: 3 }, cost: { tissu: 110 } },
    { id: "sandales_usees", nameKey: "items.common.sandales_usees.name", type: "Pieds", rarity: "common", stats: { Agilité: 1 }, cost: { tissu: 70 } },
    { id: "jambieres_en_tissu_rapiece", nameKey: "items.common.jambieres_en_tissu_rapiece.name", type: "Jambes", rarity: "common", stats: { Défense: 1, Vie: 1 }, cost: { tissu: 160 } },

    // -- Guerrier --
    { id: "epee_rouillee", nameKey: "items.common.epee_rouillee.name", type: "Arme", class_restriction: "Guerrier", rarity: "common", stats: { Force: 2 }, cost: { metal: 144 } },
    { id: "gourdin_simple", nameKey: "items.common.gourdin_simple.name", type: "Arme", class_restriction: "Guerrier", rarity: "common", stats: { Force: 3, Agilité: -1 }, cost: { bois: 150 } },
    { id: "gants_de_travail", nameKey: "items.common.gants_de_travail.name", type: "Mains", class_restriction: "Guerrier", rarity: "common", stats: { Force: 1, Chance: 1 }, cost: { tissu: 96, metal: 48 } },
    { id: "targe_en_bois", nameKey: "items.common.targe_en_bois.name", type: "Arme", class_restriction: "Guerrier", rarity: "common", stats: { Défense: 2, Agilité: -1 }, cost: { bois: 160 } },
    { id: "brassards_en_cuir", nameKey: "items.common.brassards_en_cuir.name", type: "Mains", class_restriction: "Guerrier", rarity: "common", stats: { Force: 1, Défense: 1 }, cost: { tissu: 130 } },
    { id: "plastron_de_cuir_brut", nameKey: "items.common.plastron_de_cuir_brut.name", type: "Torse", class_restriction: "Guerrier", rarity: "common", stats: { Force: 1, Défense: 1 }, cost: { tissu: 200, bois: 80 } },

    // -- Archer --
    { id: "dague_ebrechee", nameKey: "items.common.dague_ebrechee.name", type: "Arme", class_restriction: "Archer", rarity: "common", stats: { Agilité: 2 }, cost: { metal: 120 } },
    { id: "gants_en_tissu", nameKey: "items.common.gants_en_tissu.name", type: "Mains", class_restriction: "Archer", rarity: "common", stats: { Agilité: 1 }, cost: { tissu: 110 } },
    { id: "carquois_simple", nameKey: "items.common.carquois_simple.name", type: "Accessoire", class_restriction: "Archer", rarity: "common", stats: { Agilité: 2 }, cost: { bois: 100, tissu: 50 } },
    { id: "pourpoint_en_cuir", nameKey: "items.common.pourpoint_en_cuir.name", type: "Torse", class_restriction: "Archer", rarity: "common", stats: { Agilité: 1, Défense: 1 }, cost: { tissu: 280 } },
    { id: "capuche_de_rodeur_simple", nameKey: "items.common.capuche_de_rodeur_simple.name", type: "Tête", class_restriction: "Archer", rarity: "common", stats: { Agilité: 2 }, cost: { tissu: 160 } },

    // -- Mage --
    { id: "baton_noueux", nameKey: "items.common.baton_noueux.name", type: "Arme", class_restriction: "Mage", rarity: "common", stats: { Intelligence: 2 }, cost: { bois: 180 } },
    { id: "bottes_de_paille", nameKey: "items.common.bottes_de_paille.name", type: "Pieds", class_restriction: "Mage", rarity: "common", stats: { Intelligence: 1 }, cost: { tissu: 80 } },
    { id: "chemise_de_lin", nameKey: "items.common.chemise_de_lin.name", type: "Torse", class_restriction: "Mage", rarity: "common", stats: { Intelligence: 1, Chance: 1 }, cost: { tissu: 250 } },
    { id: "pendentif_en_os", nameKey: "items.common.pendentif_en_os.name", type: "Accessoire", class_restriction: "Mage", rarity: "common", stats: { Intelligence: 2, Vie: -1 }, cost: { bois: 90 } },
    { id: "vieux_chapeau_pointu", nameKey: "items.common.vieux_chapeau_pointu.name", type: "Tête", class_restriction: "Mage", rarity: "common", stats: { Intelligence: 2 }, cost: { tissu: 150 } },
    { id: "circlet_d_apprenti", nameKey: "items.common.circlet_d_apprenti.name", type: "Tête", class_restriction: "Mage", rarity: "common", stats: { Intelligence: 1, Vie: 1 }, cost: { metal: 130 } },
    { id: "robe_simple", nameKey: "items.common.robe_simple.name", type: "Torse", class_restriction: "Mage", rarity: "common", stats: { Intelligence: 2 }, cost: { tissu: 260 } },
    { id: "mitaines_d_apprenti", nameKey: "items.common.mitaines_d_apprenti.name", type: "Mains", class_restriction: "Mage", rarity: "common", stats: { Intelligence: 1 }, cost: { tissu: 100 } },
    { id: "chausses_de_novice", nameKey: "items.common.chausses_de_novice.name", type: "Jambes", class_restriction: "Mage", rarity: "common", stats: { Intelligence: 1, Vie: 2 }, cost: { tissu: 170 } },

    // ============================================================================
    // ==   PEU COMMUNS
    // ============================================================================

    // -- Toutes les classes --
    { id: "armure_legere", nameKey: "items.uncommon.armure_legere.name", type: "Torse", rarity: "uncommon", stats: { Vie: 6, Défense: 1 }, cost: { tissu: 500, metal: 250 } },
    { id: "bottes_de_marche", nameKey: "items.uncommon.bottes_de_marche.name", type: "Pieds", rarity: "uncommon", stats: { Agilité: 2, Défense: 1 }, cost: { tissu: 300, bois: 200 } },
    { id: "bottes_fourrees", nameKey: "items.uncommon.bottes_fourrees.name", type: "Pieds", rarity: "uncommon", stats: { Vie: 4, Agilité: -1 }, cost: { tissu: 350, bois: 150 } },
    { id: "jambieres_renforcees", nameKey: "items.uncommon.jambieres_renforcees.name", type: "Jambes", rarity: "uncommon", stats: { Vie: 3, Défense: 3 }, cost: { metal: 400, tissu: 300 } },
    { id: "potion_de_soin_mineure_item", nameKey: "items.uncommon.potion_de_soin_mineure.name", type: "Accessoire", rarity: "uncommon", stats: { Vie: 3 }, cost: { tissu: 180, bois: 120 } },
    { id: "talisman_de_vitalite", nameKey: "items.uncommon.talisman_de_vitalite.name", type: "Accessoire", rarity: "uncommon", stats: { Vie: 5 }, cost: { metal: 300, tissu: 250 } },
    { id: "trefle_a_quatre_feuilles", nameKey: "items.uncommon.trefle_a_quatre_feuilles.name", type: "Accessoire", rarity: "uncommon", stats: { Chance: 5 }, cost: { tissu: 450 } },
    { id: "pendentif_de_chance", nameKey: "items.uncommon.pendentif_de_chance.name", type: "Accessoire", rarity: "uncommon", stats: { Chance: 4, Vie: 1 }, cost: { metal: 380 } },
    { id: "bottes_de_voyageur_aguerri", nameKey: "items.uncommon.bottes_de_voyageur_aguerri.name", type: "Pieds", rarity: "uncommon", stats: { Vie: 3, Défense: 2 }, cost: { tissu: 320 } },

    // -- Guerrier --
    { id: "bouclier_de_tour_en_bois", nameKey: "items.uncommon.bouclier_de_tour_en_bois.name", type: "Arme", class_restriction: "Guerrier", rarity: "uncommon", stats: { Défense: 4, Force: -2 }, cost: { bois: 500, metal: 150 } },
    { id: "casque_en_fer", nameKey: "items.uncommon.casque_en_fer.name", type: "Tête", class_restriction: "Guerrier", rarity: "uncommon", stats: { Défense: 3, Agilité: -1 }, cost: { metal: 600 } },
    { id: "gantelets_cloutes", nameKey: "items.uncommon.gantelets_cloutes.name", type: "Mains", class_restriction: "Guerrier", rarity: "uncommon", stats: { Force: 3, Défense: 1 }, cost: { metal: 450, tissu: 150 } },
    { id: "hache_de_bucheron", nameKey: "items.uncommon.hache_de_bucheron.name", type: "Arme", class_restriction: "Guerrier", rarity: "uncommon", stats: { Force: 4, Vie: 2 }, cost: { metal: 400, bois: 200 } },
    { id: "jambieres_de_mailles", nameKey: "items.uncommon.jambieres_de_mailles.name", type: "Jambes", class_restriction: "Guerrier", rarity: "uncommon", stats: { Défense: 4 }, cost: { metal: 650 } },
    { id: "lance_de_milicien", nameKey: "items.uncommon.lance_de_milicien.name", type: "Arme", class_restriction: "Guerrier", rarity: "uncommon", stats: { Force: 3, Défense: 2 }, cost: { bois: 300, metal: 300 } },
    { id: "hache_de_guerre_en_fer", nameKey: "items.uncommon.hache_de_guerre_en_fer.name", type: "Arme", class_restriction: "Guerrier", rarity: "uncommon", stats: { Force: 5, Défense: 1 }, cost: { metal: 500, bois: 150 } },
    { id: "plastron_de_mercenaire", nameKey: "items.uncommon.plastron_de_mercenaire.name", type: "Torse", class_restriction: "Guerrier", rarity: "uncommon", stats: { Vie: 8, Défense: 2 }, cost: { metal: 700, tissu: 200 } },
    { id: "casque_de_soldat_du_front", nameKey: "items.uncommon.casque_de_soldat_du_front.name", type: "Tête", class_restriction: "Guerrier", rarity: "uncommon", stats: { Force: 3, Vie: 4 }, cost: { metal: 550, tissu: 100 } },

    // -- Archer --
    { id: "arc_court", nameKey: "items.uncommon.arc_court.name", type: "Arme", class_restriction: "Archer", rarity: "uncommon", stats: { Agilité: 4 }, cost: { bois: 550 } },
    { id: "cape_de_voyage", nameKey: "items.uncommon.cape_de_voyage.name", type: "Torse", class_restriction: "Archer", rarity: "uncommon", stats: { Agilité: 2, Chance: 2 }, cost: { tissu: 650 } },
    { id: "capuche_d_eclaireur", nameKey: "items.uncommon.capuche_d_eclaireur.name", type: "Tête", class_restriction: "Archer", rarity: "uncommon", stats: { Agilité: 3, Défense: 1 }, cost: { tissu: 450, bois: 150 } },
    { id: "gants_de_pickpocket", nameKey: "items.uncommon.gants_de_pickpocket.name", type: "Mains", class_restriction: "Archer", rarity: "uncommon", stats: { Agilité: 2, Chance: 2 }, cost: { tissu: 550 } },
    { id: "arc_de_chasseur", nameKey: "items.uncommon.arc_de_chasseur.name", type: "Arme", class_restriction: "Archer", rarity: "uncommon", stats: { Agilité: 5, Chance: 1 }, cost: { bois: 600 } },
    { id: "gants_de_traqueur", nameKey: "items.uncommon.gants_de_traqueur.name", type: "Mains", class_restriction: "Archer", rarity: "uncommon", stats: { Agilité: 3, Chance: 2 }, cost: { tissu: 500 } },
    { id: "jambieres_de_hors_la_loi", nameKey: "items.uncommon.jambieres_de_hors_la_loi.name", type: "Jambes", class_restriction: "Archer", rarity: "uncommon", stats: { Agilité: 3, Chance: 3 }, cost: { tissu: 600 } },

    // -- Mage --
    { id: "amulette_de_l_erudit", nameKey: "items.uncommon.amulette_de_l_erudit.name", type: "Accessoire", class_restriction: "Mage", rarity: "uncommon", stats: { Intelligence: 5 }, cost: { metal: 350, tissu: 200 } },
    { id: "catalyseur_arcanique", nameKey: "items.uncommon.catalyseur_arcanique.name", type: "Accessoire", class_restriction: "Mage", rarity: "uncommon", stats: { Intelligence: 3, Chance: 2 }, cost: { bois: 300, tissu: 150 } },
    { id: "fouet_d_initie", nameKey: "items.uncommon.fouet_d_initie.name", type: "Arme", class_restriction: "Mage", rarity: "uncommon", stats: { Intelligence: 4 }, cost: { tissu: 500 } },
    { id: "sceptre_de_novice", nameKey: "items.uncommon.sceptre_de_novice.name", type: "Arme", class_restriction: "Mage", rarity: "uncommon", stats: { Intelligence: 5, Vie: 1 }, cost: { bois: 450, metal: 100 } },
    { id: "robe_d_adepte", nameKey: "items.uncommon.robe_d_adepte.name", type: "Torse", class_restriction: "Mage", rarity: "uncommon", stats: { Intelligence: 3, Vie: 5 }, cost: { tissu: 750 } },
    { id: "gants_de_conjurateur", nameKey: "items.uncommon.gants_de_conjurateur.name", type: "Mains", class_restriction: "Mage", rarity: "uncommon", stats: { Intelligence: 3, 'mana_cost_percent': -2.0 }, cost: { tissu: 620 } },
    { id: "bottes_de_l_adepte", nameKey: "items.uncommon.bottes_de_l_adepte.name", type: "Pieds", class_restriction: "Mage", rarity: "uncommon", stats: { Intelligence: 3 }, cost: { tissu: 380 } },

    // ============================================================================
    // ==   RARES
    // ============================================================================

    // -- Toutes les classes --
    { id: "casque_de_soldat", nameKey: "items.rare.casque_de_soldat.name", type: "Tête", rarity: "rare", stats: { Vie: 5, Défense: 2 }, cost: { metal: 1900, tissu: 600 } },
    { id: "pendentif_du_survivant", nameKey: "items.rare.pendentif_du_survivant.name", type: "Accessoire", rarity: "rare", stats: { Vie: 10, Défense: 2 }, cost: { metal: 1600 } },
    { id: "cape_de_resistance", nameKey: "items.rare.cape_de_resistance.name", type: "Torse", rarity: "rare", stats: { 'resistance_percent': 3.0, Vie: 5 }, cost: { tissu: 3000 } },

    // -- Guerrier --
    { id: "arbalete_lourde", nameKey: "items.rare.arbalete_lourde.name", type: "Arme", class_restriction: "Guerrier", rarity: "rare", stats: { Force: 5, Agilité: -1, Chance: 3 }, cost: { metal: 2200, bois: 1500 } },
    { id: "cuirasse_de_plaques", nameKey: "items.rare.cuirasse_de_plaques.name", type: "Torse", class_restriction: "Guerrier", rarity: "rare", stats: { Vie: 5, Défense: 3, Agilité: -1 }, cost: { metal: 3200, tissu: 1000 } },
    { id: "espadon_de_mercenaire", nameKey: "items.rare.espadon_de_mercenaire.name", type: "Arme", class_restriction: "Guerrier", rarity: "rare", stats: { Force: 9, Agilité: -2 }, cost: { metal: 3800 } },
    { id: "hallebarde_de_la_garde", nameKey: "items.rare.hallebarde_de_la_garde.name", type: "Arme", class_restriction: "Guerrier", rarity: "rare", stats: { Force: 8, Défense: 1 }, cost: { metal: 2500, bois: 1300 } },
    { id: "jambieres_de_plaques", nameKey: "items.rare.jambieres_de_plaques.name", type: "Jambes", class_restriction: "Guerrier", rarity: "rare", stats: { Vie: 7, Défense: 2 }, cost: { metal: 2400, tissu: 800 } },
    { id: "jambieres_du_barbare", nameKey: "items.rare.jambieres_du_barbare.name", type: "Jambes", class_restriction: "Guerrier", rarity: "rare", stats: { Force: 5, Vie: 4 }, cost: { metal: 1800, tissu: 900 } },
    { id: "longue_epee_de_chevalier", nameKey: "items.rare.longue_epee_de_chevalier.name", type: "Arme", class_restriction: "Guerrier", rarity: "rare", stats: { Force: 7, Vie: 4 }, cost: { metal: 2800, bois: 1100 } },
    { id: "poings_americains", nameKey: "items.rare.poings_americains.name", type: "Mains", class_restriction: "Guerrier", rarity: "rare", stats: { Force: 6, Agilité: 2 }, cost: { metal: 2600 } },
    { id: "solerets_en_acier", nameKey: "items.rare.solerets_en_acier.name", type: "Pieds", class_restriction: "Guerrier", rarity: "rare", stats: { Défense: 1, Agilité: -2 }, cost: { metal: 2200 } },
    { id: "gantelets_de_gladiateur", nameKey: "items.rare.gantelets_de_gladiateur.name", type: "Mains", class_restriction: "Guerrier", rarity: "rare", stats: { Force: 7, CritChance: 2.0 }, cost: { metal: 2400, tissu: 700 } },
    { id: "marteau_de_guerre", nameKey: "items.rare.marteau_de_guerre.name", type: "Arme", class_restriction: "Guerrier", rarity: "rare", stats: { Force: 10, 'stun_chance_percent': 2.0, Agilité: -2 }, cost: { metal: 3500, bois: 1000 } },
    { id: "harnois_de_bataille", nameKey: "items.rare.harnois_de_bataille.name", type: "Torse", class_restriction: "Guerrier", rarity: "rare", stats: { Force: 7, 'armor_shred_percent': 3.0 }, cost: { metal: 2900, tissu: 900 } },
    { id: "bottes_de_marcheur_de_guerre", nameKey: "items.rare.bottes_de_marcheur_de_guerre.name", type: "Pieds", class_restriction: "Guerrier", rarity: "rare", stats: { Force: 5, Défense: 2 }, cost: { metal: 2000, tissu: 500 } },

    // -- Archer --
    { id: "bottes_d_explorateur", nameKey: "items.rare.bottes_d_explorateur.name", type: "Pieds", class_restriction: "Archer", rarity: "rare", stats: { Agilité: 5, Chance: 3 }, cost: { tissu: 2100, metal: 800 } },
    { id: "gants_du_tireur", nameKey: "items.rare.gants_du_tireur.name", type: "Mains", class_restriction: "Archer", rarity: "rare", stats: { Agilité: 4, Force: 3 }, cost: { metal: 1600, tissu: 800 } },
    { id: "masque_du_filou", nameKey: "items.rare.masque_du_filou.name", type: "Tête", class_restriction: "Archer", rarity: "rare", stats: { Chance: 7, Défense: -1 }, cost: { tissu: 1800, bois: 700 } },
    { id: "justaucorps_de_traqueur", nameKey: "items.rare.justaucorps_de_traqueur.name", type: "Torse", class_restriction: "Archer", rarity: "rare", stats: { Agilité: 8, Chance: 4 }, cost: { tissu: 3300, bois: 600 } },
    { id: "carquois_de_vitesse", nameKey: "items.rare.carquois_de_vitesse.name", type: "Accessoire", class_restriction: "Archer", rarity: "rare", stats: { Agilité: 7, CritChance: 2.0 }, cost: { bois: 1500, tissu: 1000 } },
    { id: "masque_de_franc_tireur", nameKey: "items.rare.masque_de_franc_tireur.name", type: "Tête", class_restriction: "Archer", rarity: "rare", stats: { Agilité: 7, CritChance: 2.0 }, cost: { tissu: 1900, bois: 600 } },

    // -- Mage --
    { id: "amulette_de_la_fortune", nameKey: "items.rare.amulette_de_la_fortune.name", type: "Accessoire", class_restriction: "Mage", rarity: "rare", stats: { Chance: 6, Intelligence: 2 }, cost: { metal: 1800, bois: 900 } },
    { id: "broche_du_diplomate", nameKey: "items.rare.broche_du_diplomate.name", type: "Accessoire", class_restriction: "Mage", rarity: "rare", stats: { Intelligence: 8, Chance: 4 }, cost: { metal: 1500, tissu: 1000 } },
    { id: "manteau_de_l_illusionniste", nameKey: "items.rare.manteau_de_l_illusionniste.name", type: "Torse", class_restriction: "Mage", rarity: "rare", stats: { Intelligence: 6, Agilité: 4 }, cost: { tissu: 3500, bois: 500 } },
    { id: "sceptre_du_sorcier_novice", nameKey: "items.rare.sceptre_du_sorcier_novice.name", type: "Arme", class_restriction: "Mage", rarity: "rare", stats: { Intelligence: 7, Vie: 3 }, cost: { bois: 2000, tissu: 900 } },
    { id: "sandales_de_conjurateur", nameKey: "items.rare.sandales_de_conjurateur.name", type: "Pieds", class_restriction: "Mage", rarity: "rare", stats: { Intelligence: 6, Vie: 3 }, cost: { tissu: 2000 } },
    { id: "orbe_tempetueux", nameKey: "items.rare.orbe_tempetueux.name", type: "Arme", class_restriction: "Mage", rarity: "rare", stats: { Intelligence: 9, CritDamage: 10.0 }, cost: { metal: 2800, tissu: 1200 } },
    { id: "gantelets_runiques", nameKey: "items.rare.gantelets_runiques.name", type: "Mains", class_restriction: "Mage", rarity: "rare", stats: { Intelligence: 6, 'spell_damage_percent': 2.0 }, cost: { tissu: 2200, metal: 500 } },

    // -- Guerrier & Archer --
    { id: "bague_de_lutteur", nameKey: "items.rare.bague_de_lutteur.name", type: "Accessoire", class_restriction: ["Guerrier", "Archer"], rarity: "rare", stats: { Force: 5, Agilité: 5 }, cost: { metal: 2000 } },

    // ============================================================================
    // ==   ÉPIQUES
    // ============================================================================
    // -- Toutes les classes --
    { id: "armure_du_gardien", nameKey: "items.epic.armure_du_gardien.name", type: "Torse", rarity: "epic", stats: { Vie: 18, Défense: 2, Force: 3, Intelligence: -2 }, cost: { metal: 14000, tissu: 4000 } },
    { id: "ceinture_de_puissance", nameKey: "items.epic.ceinture_de_puissance.name", type: "Accessoire", rarity: "epic", stats: { Force: 5, Vie: 8, Défense: 1 }, cost: { metal: 9500, tissu: 5500 } },
    { id: "heaume_de_champion", nameKey: "items.epic.heaume_de_champion.name", type: "Tête", rarity: "epic", stats: { Vie: 10, Défense: 2, Force: 3 }, cost: { metal: 12000, tissu: 3500 } },
    { id: "main_de_gloire", nameKey: "items.epic.main_de_gloire.name", type: "Mains", rarity: "epic", stats: { Chance: 12, Vie: -8 }, cost: { tissu: 10000, bois: 3000 } },
    { id: "anneau_du_paria", nameKey: "items.epic.anneau_du_paria.name", type: "Accessoire", rarity: "epic", stats: { Vie: 20, Force: 5, Agilité: 5, Intelligence: 5, Défense: -3 }, cost: { metal: 10000 } },
    // -- Guerrier --
    { id: "corne_de_guerre_du_berserker", nameKey: "items.epic.corne_de_guerre_du_berserker.name", type: "Accessoire", class_restriction: "Guerrier", rarity: "epic", stats: { Force: 10, Défense: -3 }, cost: { bois: 8000, metal: 8000 } },
    { id: "gantelets_de_fureur", nameKey: "items.epic.gantelets_de_fureur.name", type: "Mains", class_restriction: "Guerrier", rarity: "epic", stats: { Force: 9, Défense: 1 }, cost: { metal: 11000, tissu: 3000 } },
    { id: "greves_du_defenseur", nameKey: "items.epic.greves_du_defenseur.name", type: "Jambes", class_restriction: "Guerrier", rarity: "epic", stats: { Vie: 12, Défense: 2 }, cost: { metal: 11500, tissu: 4000 } },
    { id: "lame_du_crepuscule", nameKey: "items.epic.lame_du_crepuscule.name", type: "Arme", class_restriction: "Guerrier", rarity: "epic", stats: { Force: 12, Agilité: 7, Chance: 4 }, cost: { metal: 12000, bois: 4500 } },
    { id: "heaume_du_juggernaut", nameKey: "items.epic.heaume_du_juggernaut.name", type: "Tête", class_restriction: "Guerrier", rarity: "epic", stats: { Force: 8, Vie: 12, Défense: 2 }, cost: { metal: 12500, tissu: 3000 } },
    { id: "hache_de_bourreau", nameKey: "items.epic.hache_de_bourreau.name", type: "Arme", class_restriction: "Guerrier", rarity: "epic", stats: { Force: 20, CritChance: -5.0, 'armor_shred_percent': 8.0 }, cost: { metal: 15000, bois: 5000 } },
    // -- Archer --
    { id: "arc_de_chasseur_d_ombres", nameKey: "items.epic.arc_de_chasseur_d_ombres.name", type: "Arme", class_restriction: "Archer", rarity: "epic", stats: { Agilité: 12, Force: 4, Intelligence: 4 }, cost: { bois: 10000, tissu: 6000 } },
    { id: "bottes_de_l_echo", nameKey: "items.epic.bottes_de_l_echo.name", type: "Pieds", class_restriction: "Archer", rarity: "epic", stats: { Agilité: 8, Chance: 5 }, cost: { tissu: 9000, metal: 4500 } },
    { id: "dagues_de_l_ombre_dansante", nameKey: "items.epic.dagues_de_l_ombre_dansante.name", type: "Arme", class_restriction: "Archer", rarity: "epic", stats: { Agilité: 15, Chance: 5, Force: -3 }, cost: { metal: 13000, tissu: 4000 } },
    { id: "jambieres_de_l_assassin", nameKey: "items.epic.jambieres_de_l_assassin.name", type: "Jambes", class_restriction: "Archer", rarity: "epic", stats: { Agilité: 10, Force: 4 }, cost: { tissu: 10000, metal: 5000 } },
    { id: "sandales_ailees", nameKey: "items.epic.sandales_ailees.name", type: "Pieds", class_restriction: "Archer", rarity: "epic", stats: { Agilité: 12, Défense: -2 }, cost: { tissu: 9500, bois: 2500 } },
    { id: "arc_long_en_if", nameKey: "items.epic.arc_long_en_if.name", type: "Arme", class_restriction: "Archer", rarity: "epic", stats: { Agilité: 18, CritDamage: 15.0 }, cost: { bois: 14000, tissu: 4000 } },
    { id: "bottes_de_l_arpenteur_silencieux", nameKey: "items.epic.bottes_de_l_arpenteur_silencieux.name", type: "Pieds", class_restriction: "Archer", rarity: "epic", stats: { Agilité: 10, Chance: 8 }, cost: { tissu: 9800 } },
    { id: "main_de_precision", nameKey: "items.epic.main_de_precision.name", type: "Mains", rarity: "epic", stats: { Agilité: 12, Vie: -4, 'damage_percent': 8.0 }, cost: { tissu: 15000, bois: 5000 } },
    // -- Mage --
    { id: "diademe_de_l_archimage", nameKey: "items.epic.diademe_de_l_archimage.name", type: "Tête", class_restriction: "Mage", rarity: "epic", stats: { Intelligence: 15, Vie: -5 }, cost: { metal: 8500, tissu: 6500 } },
    { id: "grimoire_des_arcanes", nameKey: "items.epic.grimoire_des_arcanes.name", type: "Arme", class_restriction: "Mage", rarity: "epic", stats: { Intelligence: 12, Vie: 6, Chance: 4 }, cost: { tissu: 12500, bois: 5000 } },
    { id: "mantelet_du_stratege", nameKey: "items.epic.mantelet_du_stratege.name", type: "Torse", class_restriction: "Mage", rarity: "epic", stats: { Intelligence: 10, Défense: 2 }, cost: { tissu: 14000, metal: 4000 } },
    { id: "robe_de_l_erudit_de_guerre", nameKey: "items.epic.robe_de_l_erudit_de_guerre.name", type: "Torse", class_restriction: "Mage", rarity: "epic", stats: { Intelligence: 12, Défense: 4, Vie: 8 }, cost: { tissu: 15000, metal: 3500 } },
    { id: "talisman_de_mana", nameKey: "items.epic.talisman_de_mana.name", type: "Accessoire", class_restriction: "Mage", rarity: "epic", stats: { Intelligence: 10, 'healing_effectiveness_percent': 8.0 }, cost: { metal: 9000, tissu: 5000 } },
    { id: "gant_du_savoir", nameKey: "items.epic.gant_du_savoir.name", type: "Mains", rarity: "epic", stats: { Intelligence: 7, Vie: 4, 'spell_crit_damage_percent': 10.0 }, cost: { tissu: 15000, bois: 5000 } },
    // -- Guerrier & Mage (Battlemage) --
    { id: "jambieres_en_acier_runique", nameKey: "items.epic.jambieres_en_acier_runique.name", type: "Jambes", class_restriction: ["Guerrier", "Mage"], rarity: "epic", stats: { Force: 8, Intelligence: 8, Défense: 3 }, cost: { metal: 12000, tissu: 4000 } },


    // ============================================================================
    // == ITEMS DE GUILDE
    // ============================================================================

    { 
        id: "anneau_confrerie", 
        nameKey: "items.epic.anneau_confrerie.name", 
        type: "Accessoire", 
        rarity: "epic", 
        stats: { Vie: 10, Chance: 5, xp_gain_percent: 3.0 }, 
        isGuildShopItem: true // Marqueur pour indiquer qu'il n'est pas lootable/craftable
    },
    
    // ============================================================================
    // ==   LÉGENDAIRES
    // ============================================================================

    // -- Toutes les classes --
    { id: "collier_de_l_infinite", nameKey: "items.legendary.collier_de_l_infinite.name", type: "Accessoire", rarity: "legendary", stats: { Vie: 12, Force: 8, Agilité: 8, Intelligence: 8, Chance: 8, Défense: 2 }, cost: { metal: 20000, tissu: 20000, bois: 20000 } },
    { id: "talisman_du_parieur", nameKey: "items.legendary.talisman_du_parieur.name", type: "Accessoire", rarity: "legendary", stats: { Chance: 25, Force: -5, Agilité: -5 }, cost: { metal: 25000, bois: 15000 } },
    { id: "volonte_d_adamantium", nameKey: "items.legendary.volonte_d_adamantium.name", type: "Accessoire", rarity: "legendary", stats: { 'debuff_resistance_percent': 20.0, Vie: 15, Défense: 3 }, cost: { metal: 28000 } },

    // -- Guerrier --
    { id: "armure_de_sang", nameKey: "items.legendary.armure_de_sang.name", type: "Torse", class_restriction: "Guerrier", rarity: "legendary", stats: { Vie: 28, Défense: 6, Force: 6, Agilité: -3 }, cost: { metal: 38000, tissu: 15000 } },
    { id: "bottes_telluriques", nameKey: "items.legendary.bottes_telluriques.name", type: "Pieds", class_restriction: "Guerrier", rarity: "legendary", stats: { Défense: 5, Force: 8, Agilité: -5 }, cost: { metal: 32000, tissu: 10000 } },
    { id: "briselame", nameKey: "items.legendary.briselame.name", type: "Arme", class_restriction: "Guerrier", rarity: "legendary", stats: { Force: 22, Vie: 10, Défense: 2, Chance: 7 }, cost: { metal: 40000, bois: 18000 } },
    { id: "kriss_de_sacrifice", nameKey: "items.legendary.kriss_de_sacrifice.name", type: "Arme", class_restriction: "Guerrier", rarity: "legendary", stats: { Force: 25, Agilité: 15, Vie: -20 }, cost: { metal: 42000, bois: 10000 } },
    { id: "le_mur_du_roi_dechu", nameKey: "items.legendary.le_mur_du_roi_dechu.name", type: "Torse", class_restriction: "Guerrier", rarity: "legendary", stats: { Défense: 8, Vie: 20, Force: -8 }, cost: { metal: 60000 } },
    { id: "poignes_du_titan", nameKey: "items.legendary.poignes_du_titan.name", type: "Mains", class_restriction: "Guerrier", rarity: "legendary", stats: { Force: 18, Vie: 10 }, cost: { metal: 32000, tissu: 13000 } },
    { id: "marteau_meteore", nameKey: "items.legendary.marteau_meteore.name", type: "Arme", class_restriction: "Guerrier", rarity: "legendary", stats: { Force: 28, 'stun_chance_percent': 8.0, Agilité: -10 }, cost: { metal: 45000 } },
    { id: "gantelets_du_colosse", nameKey: "items.legendary.gantelets_du_colosse.name", type: "Mains", class_restriction: "Guerrier", rarity: "legendary", stats: { Force: 15, Vie: 15, Défense: 2 }, cost: { metal: 30000, tissu: 10000 } },

    // -- Archer --
    { id: "fleche_celeste", nameKey: "items.legendary.fleche_celeste.name", type: "Arme", class_restriction: "Archer", rarity: "legendary", stats: { Agilité: 22, Force: 7, Intelligence: 7, Chance: 5 }, cost: { bois: 35000, metal: 15000 } },
    { id: "griffes_de_l_ombre", nameKey: "items.legendary.griffes_de_l_ombre.name", type: "Mains", class_restriction: "Archer", rarity: "legendary", stats: { Agilité: 12, Force: 9 }, cost: { metal: 28000, tissu: 12000 } },
    { id: "sandales_de_velocite", nameKey: "items.legendary.sandales_de_velocite.name", type: "Pieds", class_restriction: "Archer", rarity: "legendary", stats: { Agilité: 15, Vie: 6 }, cost: { tissu: 28000, metal: 12000 } },
    { id: "murmure_du_vent", nameKey: "items.legendary.murmure_du_vent.name", type: "Arme", class_restriction: "Archer", rarity: "legendary", stats: { Agilité: 25, CritChance: 5.0, Chance: 10 }, cost: { bois: 40000, tissu: 12000 } },
    { id: "manteau_de_l_insaisissable", nameKey: "items.legendary.manteau_de_l_insaisissable.name", type: "Torse", class_restriction: "Archer", rarity: "legendary", stats: { Agilité: 20, Chance: 15, 'resistance_percent': 5.0 }, cost: { tissu: 35000, bois: 10000 } },

    // -- Mage --
    { id: "baton_du_sage_ancien", nameKey: "items.legendary.baton_du_sage_ancien.name", type: "Arme", class_restriction: "Mage", rarity: "legendary", stats: { Intelligence: 22, Vie: 8, Défense: 1, Chance: 7 }, cost: { bois: 30000, tissu: 18000 } },
    { id: "couronne_de_la_prophetie", nameKey: "items.legendary.couronne_de_la_prophetie.name", type: "Tête", class_restriction: "Mage", rarity: "legendary", stats: { Intelligence: 12, Vie: 8, Chance: 9 }, cost: { metal: 25000, tissu: 18000 } },
    { id: "jambieres_runiques", nameKey: "items.legendary.jambieres_runiques.name", type: "Jambes", class_restriction: "Mage", rarity: "legendary", stats: { Vie: 18, Défense: 4, Intelligence: 4 }, cost: { metal: 30000, tissu: 14000 } },
    { id: "livre_des_ombres", nameKey: "items.legendary.livre_des_ombres.name", type: "Accessoire", class_restriction: "Mage", rarity: "legendary", stats: { Intelligence: 18, Agilité: 10, Vie: -10 }, cost: { tissu: 40000, bois: 15000 } },
    { id: "masque_du_vide", nameKey: "items.legendary.masque_du_vide.name", type: "Tête", class_restriction: "Mage", rarity: "legendary", stats: { Défense: 3, Intelligence: 10, Force: 5 }, cost: { metal: 30000, tissu: 15000 } },
    { id: "baton_du_vide", nameKey: "items.legendary.baton_du_vide.name", type: "Arme", class_restriction: "Mage", rarity: "legendary", stats: { Intelligence: 25, 'armor_shred_percent': 10.0, Vie: -10 }, cost: { bois: 42000, metal: 10000 } },
    { id: "chapeau_de_l_archonte", nameKey: "items.legendary.chapeau_de_l_archonte.name", type: "Tête", class_restriction: "Mage", rarity: "legendary", stats: { Intelligence: 18, Vie: 10 }, cost: { tissu: 28000, metal: 12000 } },

    // ============================================================================
    // ==   MYTHIQUES
    // ============================================================================

    // -- Toutes les classes --
    { id: "casque_de_domination", nameKey: "items.mythic.casque_de_domination.name", type: "Tête", rarity: "mythic", stats: { Intelligence: 25, Force: 15, Vie: 15 }, cost: { metal: 55000, tissu: 35000 } },
    { id: "coeur_du_golem_primordial", nameKey: "items.mythic.coeur_du_golem_primordial.name", type: "Accessoire", rarity: "mythic", stats: { Vie: 50, Défense: 6, Agilité: -15 }, cost: { metal: 80000, tissu: 25000 } },
    { id: "gantelets_de_la_divinite", nameKey: "items.mythic.gantelets_de_la_divinite.name", type: "Mains", rarity: "mythic", stats: { Force: 25, Défense: 4, Vie: 12, Agilité: 12 }, cost: { metal: 45000, tissu: 30000, bois: 15000 } },
    { id: "jambieres_de_l_eternite", nameKey: "items.mythic.jambieres_de_l_eternite.name", type: "Jambes", rarity: "mythic", stats: { Vie: 30, Défense: 6, Agilité: 10, Chance: 10 }, cost: { tissu: 40000, metal: 35000, bois: 15000 } },
    { id: "l_oeil_du_neant", nameKey: "items.mythic.l_oeil_du_neant.name", type: "Accessoire", rarity: "mythic", stats: { Vie: 25, Force: 25, Agilité: 25, Intelligence: 25, Chance: 25, Défense: 8 }, cost: { metal: 60000, tissu: 60000, bois: 40000 } },
    { id: "le_voile_des_etoiles", nameKey: "items.mythic.le_voile_des_etoiles.name", type: "Tête", rarity: "mythic", stats: { Intelligence: 20, Vie: 15, Chance: 18, Défense: 3 }, cost: { tissu: 50000, metal: 25000, bois: 15000 } },
    { id: "les_chaussures_des_songes", nameKey: "items.mythic.les_chaussures_des_songes.name", type: "Pieds", rarity: "mythic", stats: { Agilité: 25, Vie: 15, Chance: 12 }, cost: { tissu: 60000, metal: 20000, bois: 15000 } },
    { id: "les_jambieres_du_titan", nameKey: "items.mythic.les_jambieres_du_titan.name", type: "Jambes", rarity: "mythic", stats: { Force: 20, Vie: 20, Défense: 5, Agilité: -10 }, cost: { metal: 60000, tissu: 25000 } },
    { id: "robe_du_cosmos", nameKey: "items.mythic.robe_du_cosmos.name", type: "Torse", rarity: "mythic", stats: { Vie: 50, Défense: 8, Force: 12, Agilité: 12, Intelligence: 12, Chance: 12 }, cost: { tissu: 75000, metal: 40000, bois: 25000 } },
    { id: "tunique_du_phoenix", nameKey: "items.mythic.tunique_du_phoenix.name", type: "Torse", rarity: "mythic", stats: { Vie: 40, Force: 20, Défense: 6 }, cost: { tissu: 80000, metal: 45000 } },
    { id: "bottes_de_l_errant_temporel", nameKey: "items.mythic.bottes_de_l_errant_temporel.name", type: "Pieds", rarity: "mythic", stats: { Agilité: 20, Intelligence: 20, Défense: 5, 'debuff_resistance_percent': 15.0 }, cost: { tissu: 70000, metal: 25000 } },
    { id: "garde_du_destin", nameKey: "items.mythic.garde_du_destin.name", type: "Torse", rarity: "mythic", stats: { Vie: 40, Défense: 10, 'resistance_percent': 8.0, 'thorns_damage_flat': 40 }, cost: { metal: 90000, tissu: 40000 } },
    // -- Guerrier --
    { id: "l_epee_du_destin", nameKey: "items.mythic.l_epee_du_destin.name", type: "Arme", class_restriction: "Guerrier", rarity: "mythic", stats: { Force: 40, Vie: 25, Défense: 5, Chance: 15, Agilité: 10, Intelligence: 10 }, cost: { metal: 70000, tissu: 40000, bois: 20000 } },
    { id: "cuirasse_du_colosse", nameKey: "items.mythic.cuirasse_du_colosse.name", type: "Torse", class_restriction: "Guerrier", rarity: "mythic", stats: { Vie: 60, Défense: 10, Force: 15, 'thorns_damage_flat': 30, Agilité: -20 }, cost: { metal: 95000, tissu: 30000 } },
    { id: "greves_du_titan_sismique", nameKey: "items.mythic.greves_du_titan_sismique.name", type: "Jambes", class_restriction: "Guerrier", rarity: "mythic", stats: { Force: 28, Vie: 22, 'stun_chance_percent': 5.0 }, cost: { metal: 68000, tissu: 28000 } },
    { id: "sceau_du_roi_barbare", nameKey: "items.mythic.sceau_du_roi_barbare.name", type: "Accessoire", class_restriction: "Guerrier", rarity: "mythic", stats: { Force: 30, 'lifesteal_percent': 4.0, Défense: -8 }, cost: { metal: 75000, bois: 35000 } },
    // -- Archer --
    { id: "bottes_des_sept_lieues", nameKey: "items.mythic.bottes_des_sept_lieues.name", type: "Pieds", class_restriction: "Archer", rarity: "mythic", stats: { Agilité: 35, Chance: 15, Défense: -5 }, cost: { tissu: 65000, bois: 30000 } },
    { id: "l_arc_de_la_creation", nameKey: "items.mythic.l_arc_de_la_creation.name", type: "Arme", class_restriction: "Archer", rarity: "mythic", stats: { Agilité: 40, Force: 15, Intelligence: 15, Chance: 15, Vie: 10, Défense: 3 }, cost: { bois: 70000, metal: 40000, tissu: 20000 } },
    { id: "gambison_de_l_astre_mortel", nameKey: "items.mythic.gambison_de_l_astre_mortel.name", type: "Torse", class_restriction: "Archer", rarity: "mythic", stats: { Agilité: 35, CritDamage: 25.0, Vie: -15 }, cost: { tissu: 85000, bois: 25000 } },
    { id: "gantelets_du_vif_argent", nameKey: "items.mythic.gantelets_du_vif_argent.name", type: "Mains", class_restriction: "Archer", rarity: "mythic", stats: { Agilité: 28, CritChance: 7.0 }, cost: { tissu: 50000, metal: 30000 } },
    { id: "masque_du_faucon_pelerin", nameKey: "items.mythic.masque_du_faucon_pelerin.name", type: "Tête", class_restriction: "Archer", rarity: "mythic", stats: { Agilité: 22, Chance: 15, Intelligence: 10 }, cost: { tissu: 58000, bois: 22000 } },
    // -- Mage --
    { id: "le_grimoire_final", nameKey: "items.mythic.le_grimoire_final.name", type: "Accessoire", class_restriction: "Mage", rarity: "mythic", stats: { Intelligence: 50, Défense: 6, Vie: -25 }, cost: { tissu: 90000, bois: 40000 } },
    { id: "le_livre_des_mondes", nameKey: "items.mythic.le_livre_des_mondes.name", type: "Arme", class_restriction: "Mage", rarity: "mythic", stats: { Intelligence: 40, Vie: 25, Défense: 5, Chance: 15, Force: 10, Agilité: 10 }, cost: { tissu: 70000, metal: 40000, bois: 20000 } },
    { id: "robe_du_tisseur_de_sorts", nameKey: "items.mythic.robe_du_tisseur_de_sorts.name", type: "Torse", class_restriction: "Mage", rarity: "mythic", stats: { Intelligence: 35, Vie: 20, 'debuff_resistance_percent': 20.0 }, cost: { tissu: 90000, metal: 20000 } },
    { id: "poignes_de_mana_glace", nameKey: "items.mythic.poignes_de_mana_glace.name", type: "Mains", class_restriction: "Mage", rarity: "mythic", stats: { Intelligence: 25, 'resistance_percent': 8.0, Défense: 3 }, cost: { tissu: 48000, metal: 32000 } },
    { id: "talisman_de_l_archonte", nameKey: "items.mythic.talisman_de_l_archonte.name", type: "Accessoire", class_restriction: "Mage", rarity: "mythic", stats: { Intelligence: 28, Vie: 15, 'healing_effectiveness_percent': 15.0 }, cost: { metal: 70000, tissu: 40000 } },
    // -- Classes Hybrides --
    { id: "les_etreintes_de_l_entropie", nameKey: "items.mythic.les_etreintes_de_l_entropie.name", type: "Mains", class_restriction: ["Guerrier", "Archer"], rarity: "mythic", stats: { Force: 20, Agilité: 20, Chance: 20 }, cost: { tissu: 45000, metal: 45000 } },
    { id: "gantelets_de_la_flamme_glaciale", nameKey: "items.mythic.gantelets_de_la_flamme_glaciale.name", type: "Mains", class_restriction: ["Guerrier", "Mage"], rarity: "mythic", stats: { Force: 22, Intelligence: 22, 'resistance_percent': 5.0 }, cost: { metal: 50000, tissu: 35000 } },
    { id: "diademe_de_l_oeil_arcanique", nameKey: "items.mythic.diademe_de_l_oeil_arcanique.name", type: "Tête", class_restriction: ["Archer", "Mage"], rarity: "mythic", stats: { Agilité: 20, Intelligence: 20, CritChance: 5.0 }, cost: { tissu: 52000, metal: 28000 } },
    { id: "jugement", nameKey: "items.mythic.jugement.name", type: "Arme", class_restriction: ["Guerrier", "Mage"], rarity: "mythic", stats: { Force: 35, Intelligence: 35, Vie: 20, 'healing_effectiveness_percent': 15.0 }, cost: { metal: 80000, tissu: 40000 } },
    
    // ============================================================================
    // ==   OBJETS "CRAFT-ONLY"
    // ============================================================================

    // -- Guerrier --
    { id: "plastron_de_golem", nameKey: "items.craft_only.plastron_de_golem.name", type: "Torse", class_restriction: "Guerrier", rarity: "rare", isCraftOnly: true, stats: { Vie: 10, Défense: 3, 'thorns_damage_flat': 5 }, cost: { metal: 2200, 'coeur_de_golem': 2 } },
    { id: "gantelets_de_saignement", nameKey: "items.craft_only.gantelets_de_saignement.name", type: "Mains", class_restriction: "Guerrier", rarity: "rare", isCraftOnly: true, stats: { Force: 6, 'bleed_chance_percent': 5.0 }, cost: { metal: 1900, 'totem_orc': 3 } },
    { id: "lame_petrifiante", nameKey: "items.craft_only.lame_petrifiante.name", type: "Arme", class_restriction: "Guerrier", rarity: "epic", isCraftOnly: true, stats: { Force: 15, 'stun_chance_percent': 4.0 }, cost: { metal: 9000, 'sang_de_basilic': 3 } },
    { id: "hache_du_berserker", nameKey: "items.craft_only.hache_du_berserker.name", type: "Arme", class_restriction: "Guerrier", rarity: "epic", isCraftOnly: true, stats: { Force: 18, 'lifesteal_percent': 2.5, Vie: -10 }, cost: { metal: 9500, 'totem_orc': 10 } },
    { id: "bouclier_carapace", nameKey: "items.craft_only.bouclier_carapace.name", type: "Arme", class_restriction: "Guerrier", rarity: "epic", isCraftOnly: true, stats: { Défense: 8, Vie: 10, 'thorns_damage_flat': 15 }, cost: { bois: 8500, 'chitine_renforcee': 20 } },
    { id: "brisecoeur_runique", nameKey: "items.craft_only.brisecoeur_runique.name", type: "Arme", class_restriction: "Guerrier", rarity: "legendary", isCraftOnly: true, stats: { Force: 25, 'armor_shred_percent': 15.0, 'lifesteal_percent': 3.0 }, cost: { metal: 35000, 'fragment_d_ame_de_demon': 5 } },
    // -- Archer --
    { id: "bottes_ailees", nameKey: "items.craft_only.bottes_ailees.name", type: "Pieds", class_restriction: "Archer", rarity: "rare", isCraftOnly: true, stats: { Agilité: 8, Chance: 4 }, cost: { tissu: 1800, 'plume_de_griffon': 5 } },
    { id: "cape_etheree", nameKey: "items.craft_only.cape_etheree.name", type: "Torse", class_restriction: "Archer", rarity: "epic", isCraftOnly: true, stats: { Agilité: 12, 'debuff_resistance_percent': 15.0 }, cost: { tissu: 9200, 'essence_spectrale': 12 } },
    // -- Mage --
    { id: "pendentif_spectral", nameKey: "items.craft_only.pendentif_spectral.name", type: "Accessoire", class_restriction: "Mage", rarity: "rare", isCraftOnly: true, stats: { Intelligence: 7, 'xp_gain_percent': 3.0 }, cost: { metal: 1500, 'essence_spectrale': 4 } },
    { id: "heaume_de_clairvoyance", nameKey: "items.craft_only.heaume_de_clairvoyance.name", type: "Tête", class_restriction: "Mage", rarity: "epic", isCraftOnly: true, stats: { Intelligence: 10, Chance: 8, CritChance: 3.0 }, cost: { tissu: 8000, 'oeil_de_chimere': 1 } },
    { id: "diademe_de_benediction", nameKey: "items.craft_only.diademe_de_benediction.name", type: "Tête", class_restriction: "Mage", rarity: "legendary", isCraftOnly: true, stats: { Intelligence: 15, Vie: 20, 'healing_effectiveness_percent': 20.0 }, cost: { tissu: 30000, 'larme_d_archange': 2 } },
    { id: "couronne_de_seraphin", nameKey: "items.craft_only.couronne_de_seraphin.name", type: "Tête", class_restriction: "Mage", rarity: "mythic", isCraftOnly: true, stats: { Intelligence: 25, Vie: 25, 'debuff_resistance_percent': 30.0, 'xp_gain_percent': 10.0 }, cost: { tissu: 60000, 'larme_d_archange': 8 } },
    // -- Toutes les classes --
    { id: "jambieres_en_chitine", nameKey: "items.craft_only.jambieres_en_chitine.name", type: "Jambes", rarity: "rare", isCraftOnly: true, stats: { Vie: 8, Défense: 2, 'resistance_percent': 2.0 }, cost: { tissu: 1600, 'chitine_renforcee': 8 } },
    { id: "armure_de_l_abysse", nameKey: "items.craft_only.armure_de_l_abysse.name", type: "Torse", rarity: "epic", isCraftOnly: true, stats: { Vie: 20, Défense: 5, 'healing_effectiveness_percent': 10.0 }, cost: { metal: 11000, 'ecaille_de_profond': 6 } },
    { id: "cuirasse_draconique", nameKey: "items.craft_only.cuirasse_draconique.name", type: "Torse", rarity: "legendary", isCraftOnly: true, stats: { Vie: 30, Défense: 8, 'thorns_damage_flat': 25, 'resistance_percent': 5.0 }, cost: { metal: 40000, 'coeur_de_dragon_ancien': 1 } },
    { id: "le_dernier_rempart", nameKey: "items.craft_only.le_dernier_rempart.name", type: "Torse", rarity: "mythic", isCraftOnly: true, stats: { Vie: 50, Défense: 12, 'resistance_percent': 10.0, RegenHP: 2.0 }, cost: { metal: 75000, 'coeur_de_dragon_ancien': 3 } },
    // -- Guerrier & Archer --
    { id: "entropie_lame_du_vide", nameKey: "items.craft_only.entropie_lame_du_vide.name", type: "Arme", class_restriction: ["Guerrier", "Archer"], rarity: "mythic", isCraftOnly: true, stats: { Vie: 15, Force: 30, Agilité: 30, 'bleed_chance_percent': 10.0, 'lifesteal_percent': 5.0 }, cost: { metal: 65000, 'poussiere_de_vide': 3, 'fragment_d_ame_de_demon': 10 } }
];
                        // ============================================================================
                        // ==   NOUVELLES RESSOURCES D'ARTISANAT SPÉCIFIQUES
                        // ============================================================================
                        // - Coeur de Golem: Drop par GOLEM_PIERRE, GARDIEN_DE_PIERRE_ETERNE
                        // - Essence Spectrale: Drop par SPECTRE_GEMISSANT, ROI_SINGE_ESPRIT
                        // - Chitine Renforcée: Drop par INSECTE_MINEUR, SCORPION_DES_SABLES
                        // - Plume de Griffon: Drop par GRIFFON, HARPIE
                        // - Sang de Basilic: Drop par BASILIC
                        // - Oeil de Chimère: Drop par CHIMERE
                        // - Écaille de Profond: Drop par PROFOND_GUERRIER, PROFOND_CHAMPION
                        // - Totem Orc: Drop par ORC_BERSERKER
                        // - Fragment d'Âme de Démon: Drop par DEMON_MINEUR, GENERAL_DEMON
                        // - Coeur de Dragon Ancien: Drop par DRAGON_ROUGE_ANCIEN
                        // - Larme d'Archange: Drop par ARCHANGE
                        // - Poussière de Vide: Drop par HORREUR_DIMENSIONNELLE

const SPECIAL_MATERIALS_DB = {
    'essence_dissonante': { 
        nameKey: "items.essence_dissonante.name", 
        icon: '💎', 
        descriptionKey: "items.essence_dissonante.desc" 
    },
    'essence_dissonante_pure': { 
        nameKey: "items.essence_dissonante_pure.name", 
        icon: '✨', 
        descriptionKey: "items.essence_dissonante_pure.desc" 
    },
    'artefact_ancien_harmonique': { 
        nameKey: "items.artefact_ancien_harmonique.name", 
        icon: '🛡️', 
        descriptionKey: "items.artefact_ancien_harmonique.desc" 
    }
    // Ajoutez ici d'autres futurs matériaux de quête ou d'artisanat
};

// ============================================================================
// ==   ENSEMBLES D'OBJETS (SETS)   ==
// ============================================================================

// DANS db.0.9.0.js
// REMPLACEZ TOUT L'OBJET SETS_DB PAR CELUI-CI :
const SETS_DB = {
    'ARMURE_DU_MERCENAIRE': {
        nameKey: "sets.armure_du_mercenaire.name",
        rarity: "rare", class_restriction: "Guerrier",
        bonuses: {
            2: { nameKey: "sets.armure_du_mercenaire.bonus2_name", stats: { Défense: 4, Vie: 8 } },
            5: { nameKey: "sets.armure_du_mercenaire.bonus5_name", stats: { Force: 8 } },
            7: { nameKey: "sets.armure_du_mercenaire.bonus7_name", stats: { 'thorns_damage_flat': 15 } }
        },
        items: [
            { nameKey: "sets.armure_du_mercenaire.item_head", type: "Tête", stats: { Force: 4, Défense: 2 } },
            { nameKey: "sets.armure_du_mercenaire.item_torso", type: "Torse", stats: { Vie: 10, Défense: 3 } },
            { nameKey: "sets.armure_du_mercenaire.item_legs", type: "Jambes", stats: { Force: 3, Vie: 5 } },
            { nameKey: "sets.armure_du_mercenaire.item_feet", type: "Pieds", stats: { Défense: 2, Agilité: 2 } },
            { nameKey: "sets.armure_du_mercenaire.item_hands", type: "Mains", stats: { Force: 5 } },
            { nameKey: "sets.armure_du_mercenaire.item_weapon", type: "Arme", stats: { Force: 7, Vie: 4 } },
            { nameKey: "sets.armure_du_mercenaire.item_accessory", type: "Accessoire", stats: { Vie: 6, Défense: 1 } }
        ]
    },
    'TENUE_DU_FRANC_TIREUR': {
        nameKey: "sets.tenue_du_franc_tireur.name",
        rarity: "rare", class_restriction: "Archer",
        bonuses: {
            2: { nameKey: "sets.tenue_du_franc_tireur.bonus2_name", stats: { Agilité: 8 } },
            5: { nameKey: "sets.tenue_du_franc_tireur.bonus5_name", stats: { CritChance: 5.0 } },
            7: { nameKey: "sets.tenue_du_franc_tireur.bonus7_name", stats: { CritDamage: 15.0 } }
        },
        items: [
            { nameKey: "sets.tenue_du_franc_tireur.item_head", type: "Tête", stats: { Agilité: 4, Chance: 3 } },
            { nameKey: "sets.tenue_du_franc_tireur.item_torso", type: "Torse", stats: { Agilité: 5, Vie: 5 } },
            { nameKey: "sets.tenue_du_franc_tireur.item_legs", type: "Jambes", stats: { Agilité: 6, Chance: 2 } },
            { nameKey: "sets.tenue_du_franc_tireur.item_feet", type: "Pieds", stats: { Agilité: 5 } },
            { nameKey: "sets.tenue_du_franc_tireur.item_hands", type: "Mains", stats: { Agilité: 3, CritChance: 2.0 } },
            { nameKey: "sets.tenue_du_franc_tireur.item_weapon", type: "Arme", stats: { Agilité: 8, Chance: 4 } },
            { nameKey: "sets.tenue_du_franc_tireur.item_accessory", type: "Accessoire", stats: { Chance: 6, CritDamage: 5.0 } }
        ]
    },
    'HABITS_DU_CONJURATEUR': {
        nameKey: "sets.habits_du_conjurateur.name",
        rarity: "rare", class_restriction: "Mage",
        bonuses: {
            2: { nameKey: "sets.habits_du_conjurateur.bonus2_name", stats: { Intelligence: 8 } },
            5: { nameKey: "sets.habits_du_conjurateur.bonus5_name", stats: { mana_regen_percent: 15.0 } },
            7: { nameKey: "sets.habits_du_conjurateur.bonus7_name", stats: { spell_damage_percent: 10.0 } }
        },
        items: [
            { nameKey: "sets.habits_du_conjurateur.item_head", type: "Tête", stats: { Intelligence: 5, Vie: 3 } },
            { nameKey: "sets.habits_du_conjurateur.item_torso", type: "Torse", stats: { Intelligence: 6, Défense: 2 } },
            { nameKey: "sets.habits_du_conjurateur.item_legs", type: "Jambes", stats: { Intelligence: 4, max_mana_percent: 5.0 } },
            { nameKey: "sets.habits_du_conjurateur.item_feet", type: "Pieds", stats: { Intelligence: 4 } },
            { nameKey: "sets.habits_du_conjurateur.item_hands", type: "Mains", stats: { Intelligence: 3, mana_cost_percent: -3.0 } },
            { nameKey: "sets.habits_du_conjurateur.item_weapon", type: "Arme", stats: { Intelligence: 9 } },
            { nameKey: "sets.habits_du_conjurateur.item_accessory", type: "Accessoire", stats: { Intelligence: 6, Chance: 3 } }
        ]
    },
    'PANOPLIE_DE_L_AVENTURIER': {
        nameKey: "sets.panoplie_de_l_aventurier.name",
        rarity: "rare", class_restriction: "Toutes les classes",
        bonuses: {
            2: { nameKey: "sets.panoplie_de_l_aventurier.bonus2_name", stats: { Vie: 12 } },
            5: { nameKey: "sets.panoplie_de_l_aventurier.bonus5_name", stats: { Force: 4, Agilité: 4, Intelligence: 4 } },
            7: { nameKey: "sets.panoplie_de_l_aventurier.bonus7_name", stats: { resource_gain_percent: 10.0 } }
        },
        items: [
            { nameKey: "sets.panoplie_de_l_aventurier.item_head", type: "Tête", stats: { Vie: 5, Défense: 1 } },
            { nameKey: "sets.panoplie_de_l_aventurier.item_torso", type: "Torse", stats: { Vie: 8, Défense: 2 } },
            { nameKey: "sets.panoplie_de_l_aventurier.item_legs", type: "Jambes", stats: { Vie: 6 } },
            { nameKey: "sets.panoplie_de_l_aventurier.item_feet", type: "Pieds", stats: { Agilité: 4 } },
            { nameKey: "sets.panoplie_de_l_aventurier.item_hands", type: "Mains", stats: { Force: 4 } },
            { nameKey: "sets.panoplie_de_l_aventurier.item_weapon", type: "Arme", stats: { Force: 3, Agilité: 3, Intelligence: 3 } },
            { nameKey: "sets.panoplie_de_l_aventurier.item_accessory", type: "Accessoire", stats: { Chance: 5 } }
        ]
    },
    'TENUE_DU_BELLUAIRE': {
        nameKey: "sets.tenue_du_belluaire.name", // Corrigé
        rarity: "epic", class_restriction: "Guerrier",
        bonuses: {
            2: { nameKey: "sets.tenue_du_belluaire.bonus2_name", stats: { Vie: 20, Défense: 3 } }, // Corrigé
            5: { nameKey: "sets.tenue_du_belluaire.bonus5_name", stats: { Force: 15, 'lifesteal_percent': 3.0 } }, // Corrigé
            7: { nameKey: "sets.tenue_du_belluaire.bonus7_name", stats: { 'damage_percent': 10.0, 'stun_chance_percent': 10.0 } } // Corrigé
        },
        items: [
            { nameKey: "sets.tenue_du_belluaire.item_head", type: "Tête", stats: { Force: 8, Vie: 10 } },
            { nameKey: "sets.tenue_du_belluaire.item_torso", type: "Torse", stats: { Vie: 20, Défense: 4 } },
            { nameKey: "sets.tenue_du_belluaire.item_legs", type: "Jambes", stats: { Force: 10, Défense: 2 } },
            { nameKey: "sets.tenue_du_belluaire.item_feet", type: "Pieds", stats: { Force: 6, Agilité: 6 } },
            { nameKey: "sets.tenue_du_belluaire.item_hands", type: "Mains", stats: { Force: 12, CritChance: 3.0 } },
            { nameKey: "sets.tenue_du_belluaire.item_weapon", type: "Arme", stats: { Force: 18, 'bleed_chance_percent': 5.0 } },
            { nameKey: "sets.tenue_du_belluaire.item_accessory", type: "Accessoire", stats: { Force: 8, Chance: 8 } }
        ]
    },
    'REGALIA_DU_PREDATEUR': {
        nameKey: "sets.regalia_du_predateur.name",
        rarity: "epic", class_restriction: ["Guerrier", "Archer"],
        bonuses: {
            2: { nameKey: "sets.regalia_du_predateur.bonus2_name", stats: { CritChance: 5.0, Chance: 10 } },
            5: { nameKey: "sets.regalia_du_predateur.bonus5_name", stats: { Agilité: 15, 'bleed_chance_percent': 10.0 } },
            7: { nameKey: "sets.regalia_du_predateur.bonus7_name", stats: { 'damage_percent': 15.0, Force: 20 } }
        },
        items: [
            { nameKey: "sets.regalia_du_predateur.item_head", type: "Tête", stats: { Agilité: 10, Chance: 5, CritChance: 2.0 } },
            { nameKey: "sets.regalia_du_predateur.item_torso", type: "Torse", stats: { Vie: 18, Agilité: 12, Défense: 2 } },
            { nameKey: "sets.regalia_du_predateur.item_legs", type: "Jambes", stats: { Agilité: 12, Force: 6 } },
            { nameKey: "sets.regalia_du_predateur.item_feet", type: "Pieds", stats: { Agilité: 10, Force: 4 } },
            { nameKey: "sets.regalia_du_predateur.item_hands", type: "Mains", stats: { Force: 9, Agilité: 5, CritChance: 2.0 } },
            { nameKey: "sets.regalia_du_predateur.item_weapon", type: "Arme", stats: { Force: 12, Agilité: 12, 'bleed_chance_percent': 5.0 } },
            { nameKey: "sets.regalia_du_predateur.item_accessory", type: "Accessoire", stats: { Chance: 12, CritDamage: 15.0 } }
        ]
    },
    'APPARAT_DE_L_OMBRE_FILEUSE': {
        nameKey: "sets.apparat_de_l_ombre_fileuse.name",
        rarity: "epic", class_restriction: "Archer",
        bonuses: {
            2: { nameKey: "sets.apparat_de_l_ombre_fileuse.bonus2_name", stats: { CritChance: 7.0 } },
            5: { nameKey: "sets.apparat_de_l_ombre_fileuse.bonus5_name", stats: { Agilité: 20, CritDamage: 15.0 } },
            7: { nameKey: "sets.apparat_de_l_ombre_fileuse.bonus7_name", stats: { 'damage_percent': 12.0, 'armor_shred_percent': 15.0 } }
        },
        items: [
            { nameKey: "sets.apparat_de_l_ombre_fileuse.item_head", type: "Tête", stats: { Agilité: 12, Chance: 6 } },
            { nameKey: "sets.apparat_de_l_ombre_fileuse.item_torso", type: "Torse", stats: { Agilité: 15, Vie: 10 } },
            { nameKey: "sets.apparat_de_l_ombre_fileuse.item_legs", type: "Jambes", stats: { Agilité: 14, CritChance: 3.0 } },
            { nameKey: "sets.apparat_de_l_ombre_fileuse.item_feet", type: "Pieds", stats: { Agilité: 12, Défense: 2 } },
            { nameKey: "sets.apparat_de_l_ombre_fileuse.item_hands", type: "Mains", stats: { Agilité: 10, CritDamage: 10.0 } },
            { nameKey: "sets.apparat_de_l_ombre_fileuse.item_weapon", type: "Arme", stats: { Agilité: 20, 'armor_shred_percent': 5.0 } },
            { nameKey: "sets.apparat_de_l_ombre_fileuse.item_accessory", type: "Accessoire", stats: { Agilité: 8, Chance: 8 } }
        ]
    },
    'ORNEMENTS_DE_L_ARCANISTE': {
        nameKey: "sets.ornements_de_l_arcaniste.name",
        rarity: "epic", class_restriction: "Mage",
        bonuses: {
            2: { nameKey: "sets.ornements_de_l_arcaniste.bonus2_name", stats: { Intelligence: 15 } },
            5: { nameKey: "sets.ornements_de_l_arcaniste.bonus5_name", stats: { Vie: 25, 'resistance_percent': 8.0 } },
            7: { nameKey: "sets.ornements_de_l_arcaniste.bonus7_name", stats: { 'damage_percent': 18.0, Intelligence: 20 } }
        },
        items: [
            { nameKey: "sets.ornements_de_l_arcaniste.item_head", type: "Tête", stats: { Intelligence: 12, Vie: 5 } },
            { nameKey: "sets.ornements_de_l_arcaniste.item_torso", type: "Torse", stats: { Intelligence: 15, Défense: 3 } },
            { nameKey: "sets.ornements_de_l_arcaniste.item_legs", type: "Jambes", stats: { Intelligence: 10, Vie: 10 } },
            { nameKey: "sets.ornements_de_l_arcaniste.item_feet", type: "Pieds", stats: { Intelligence: 8, Agilité: 5 } },
            { nameKey: "sets.ornements_de_l_arcaniste.item_hands", type: "Mains", stats: { Intelligence: 10, CritChance: 4.0 } },
            { nameKey: "sets.ornements_de_l_arcaniste.item_weapon", type: "Arme", stats: { Intelligence: 20, Chance: 5 } },
            { nameKey: "sets.ornements_de_l_arcaniste.item_accessory", type: "Accessoire", stats: { Intelligence: 10, 'xp_gain_percent': 5.0 } }
        ]
    },
    'ARMURE_DU_GARDIEN_IMPLACABLE': {
        nameKey: "sets.armure_du_gardien_implacable.name",
        rarity: "legendary", class_restriction: "Toutes les classes",
        bonuses: {
            2: { nameKey: "sets.armure_du_gardien_implacable.bonus2_name", stats: { Défense: 5, Vie: 25 } },
            5: { nameKey: "sets.armure_du_gardien_implacable.bonus5_name", stats: { 'resistance_percent': 10.0, 'debuff_resistance_percent': 25.0 } },
            7: { nameKey: "sets.armure_du_gardien_implacable.bonus7_name", stats: { Vie: 50, 'thorns_damage_flat': 50, RegenHP: 2.0 } }
        },
        items: [
            { nameKey: "sets.armure_du_gardien_implacable.item_head", type: "Tête", stats: { Vie: 22, Défense: 4, Force: 5 } },
            { nameKey: "sets.armure_du_gardien_implacable.item_torso", type: "Torse", stats: { Vie: 35, Défense: 6, 'resistance_percent': 3.0 } },
            { nameKey: "sets.armure_du_gardien_implacable.item_legs", type: "Jambes", stats: { Vie: 28, Défense: 5 } },
            { nameKey: "sets.armure_du_gardien_implacable.item_feet", type: "Pieds", stats: { Défense: 5, Vie: 15, Agilité: -5 } },
            { nameKey: "sets.armure_du_gardien_implacable.item_hands", type: "Mains", stats: { Force: 18, Défense: 3, Vie: 10 } },
            { nameKey: "sets.armure_du_gardien_implacable.item_weapon", type: "Arme", stats: { Défense: 12, Vie: 20, 'thorns_damage_flat': 25 } },
            { nameKey: "sets.armure_du_gardien_implacable.item_accessory", type: "Accessoire", stats: { Vie: 25, RegenHP: 1.0, Défense: 2 } }
        ]
    },
    'ARMURE_DU_TYRAN_SANGLANT': {
        nameKey: "sets.armure_du_tyran_sanglant.name",
        rarity: "legendary", class_restriction: "Guerrier",
        bonuses: {
            2: { nameKey: "sets.armure_du_tyran_sanglant.bonus2_name", stats: { Force: 25, 'lifesteal_percent': 3.0 } },
            5: { nameKey: "sets.armure_du_tyran_sanglant.bonus5_name", stats: { CritDamage: 25.0, 'bleed_chance_percent': 15.0 } },
            7: { nameKey: "sets.armure_du_tyran_sanglant.bonus7_name", stats: { 'damage_percent': 20.0, Vie: 40 } }
        },
        items: [
            { nameKey: "sets.armure_du_tyran_sanglant.item_head", type: "Tête", stats: { Force: 15, CritChance: 4.0 } },
            { nameKey: "sets.armure_du_tyran_sanglant.item_torso", type: "Torse", stats: { Force: 20, Vie: 25, Défense: 4 } },
            { nameKey: "sets.armure_du_tyran_sanglant.item_legs", type: "Jambes", stats: { Force: 18, Vie: 15 } },
            { nameKey: "sets.armure_du_tyran_sanglant.item_feet", type: "Pieds", stats: { Force: 15, Agilité: 8 } },
            { nameKey: "sets.armure_du_tyran_sanglant.item_hands", type: "Mains", stats: { Force: 20, 'lifesteal_percent': 2.0 } },
            { nameKey: "sets.armure_du_tyran_sanglant.item_weapon", type: "Arme", stats: { Force: 30, 'bleed_chance_percent': 8.0 } },
            { nameKey: "sets.armure_du_tyran_sanglant.item_accessory", type: "Accessoire", stats: { Force: 15, CritDamage: 15.0 } }
        ]
    },
    'PANOPLIE_DE_L_OEIL_DE_LYNX': {
        nameKey: "sets.panoplie_de_l_oeil_de_lynx.name",
        rarity: "legendary", class_restriction: "Archer",
        bonuses: {
            2: { nameKey: "sets.panoplie_de_l_oeil_de_lynx.bonus2_name", stats: { Agilité: 25, 'armor_shred_percent': 10.0 } },
            5: { nameKey: "sets.panoplie_de_l_oeil_de_lynx.bonus5_name", stats: { CritChance: 10.0, Chance: 20 } },
            7: { nameKey: "sets.panoplie_de_l_oeil_de_lynx.bonus7_name", stats: { 'damage_percent': 15.0, CritDamage: 30.0 } }
        },
        items: [
            { nameKey: "sets.panoplie_de_l_oeil_de_lynx.item_head", type: "Tête", stats: { Agilité: 18, Chance: 7 } },
            { nameKey: "sets.panoplie_de_l_oeil_de_lynx.item_torso", type: "Torse", stats: { Agilité: 22, Vie: 20, Défense: 3 } },
            { nameKey: "sets.panoplie_de_l_oeil_de_lynx.item_legs", type: "Jambes", stats: { Agilité: 20, CritChance: 4.0 } },
            { nameKey: "sets.panoplie_de_l_oeil_de_lynx.item_feet", type: "Pieds", stats: { Agilité: 18, Chance: 10 } },
            { nameKey: "sets.panoplie_de_l_oeil_de_lynx.item_hands", type: "Mains", stats: { Agilité: 15, CritDamage: 15.0 } },
            { nameKey: "sets.panoplie_de_l_oeil_de_lynx.item_weapon", type: "Arme", stats: { Agilité: 30, 'armor_shred_percent': 5.0 } },
            { nameKey: "sets.panoplie_de_l_oeil_de_lynx.item_accessory", type: "Accessoire", stats: { Agilité: 15, CritChance: 5.0 } }
        ]
    },
    'VESTIGES_DU_TISSEUR_DE_TEMPETES': {
        nameKey: "sets.vestiges_du_tisseur_de_tempetes.name",
        rarity: "legendary", class_restriction: "Mage",
        bonuses: {
            2: { nameKey: "sets.vestiges_du_tisseur_de_tempetes.bonus2_name", stats: { Intelligence: 25, Vie: 20 } },
            5: { nameKey: "sets.vestiges_du_tisseur_de_tempetes.bonus5_name", stats: { 'resistance_percent': 12.0, CritChance: 8.0 } },
            7: { nameKey: "sets.vestiges_du_tisseur_de_tempetes.bonus7_name", stats: { 'damage_percent': 25.0, Intelligence: 25 } }
        },
        items: [
            { nameKey: "sets.vestiges_du_tisseur_de_tempetes.item_head", type: "Tête", stats: { Intelligence: 18, Vie: 8 } },
            { nameKey: "sets.vestiges_du_tisseur_de_tempetes.item_torso", type: "Torse", stats: { Intelligence: 22, Défense: 5, Vie: 15 } },
            { nameKey: "sets.vestiges_du_tisseur_de_tempetes.item_legs", type: "Jambes", stats: { Intelligence: 20, 'resistance_percent': 4.0 } },
            { nameKey: "sets.vestiges_du_tisseur_de_tempetes.item_feet", type: "Pieds", stats: { Intelligence: 15, Agilité: 10 } },
            { nameKey: "sets.vestiges_du_tisseur_de_tempetes.item_hands", type: "Mains", stats: { Intelligence: 15, CritChance: 6.0 } },
            { nameKey: "sets.vestiges_du_tisseur_de_tempetes.item_weapon", type: "Arme", stats: { Intelligence: 30, CritDamage: 15.0 } },
            { nameKey: "sets.vestiges_du_tisseur_de_tempetes.item_accessory", type: "Accessoire", stats: { Intelligence: 18, Chance: 10 } }
        ]
    },
    'PANOPLIE_DU_SEIGNEUR_DE_GUERRE': {
        nameKey: "sets.panoplie_du_seigneur_de_guerre.name",
        rarity: "mythic", class_restriction: "Guerrier",
        bonuses: {
            2: { nameKey: "sets.panoplie_du_seigneur_de_guerre.bonus2_name", stats: { Force: 30, Vie: 30 } },
            5: { nameKey: "sets.panoplie_du_seigneur_de_guerre.bonus5_name", stats: { 'lifesteal_percent': 7.0, CritDamage: 30.0 } },
            7: { nameKey: "sets.panoplie_du_seigneur_de_guerre.bonus7_name", stats: { 'damage_percent': 25.0, Force: 40 } }
        },
        items: [
            { nameKey: "sets.panoplie_du_seigneur_de_guerre.item_head", type: "Tête", stats: { Force: 25, Défense: 5 } },
            { nameKey: "sets.panoplie_du_seigneur_de_guerre.item_torso", type: "Torse", stats: { Force: 20, Vie: 40, Défense: 8 } },
            { nameKey: "sets.panoplie_du_seigneur_de_guerre.item_legs", type: "Jambes", stats: { Force: 22, Vie: 25 } },
            { nameKey: "sets.panoplie_du_seigneur_de_guerre.item_feet", type: "Pieds", stats: { Force: 18, Agilité: 10 } },
            { nameKey: "sets.panoplie_du_seigneur_de_guerre.item_hands", type: "Mains", stats: { Force: 28, CritChance: 5.0 } },
            { nameKey: "sets.panoplie_du_seigneur_de_guerre.item_weapon", type: "Arme", stats: { Force: 45, 'armor_shred_percent': 10.0 } },
            { nameKey: "sets.panoplie_du_seigneur_de_guerre.item_accessory", type: "Accessoire", stats: { Force: 20, Vie: 20 } }
        ]
    },
    'ARMURE_DE_L_OEIL_FANTOME': {
        nameKey: "sets.armure_de_l_oeil_fantome.name",
        rarity: "mythic", class_restriction: "Archer",
        bonuses: {
            2: { nameKey: "sets.armure_de_l_oeil_fantome.bonus2_name", stats: { Agilité: 30, CritChance: 8.0 } },
            5: { nameKey: "sets.armure_de_l_oeil_fantome.bonus5_name", stats: { CritDamage: 40.0, Agilité: 25 } },
            7: { nameKey: "sets.armure_de_l_oeil_fantome.bonus7_name", stats: { 'damage_percent': 20.0, 'armor_shred_percent': 25.0 } }
        },
        items: [
            { nameKey: "sets.armure_de_l_oeil_fantome.item_head", type: "Tête", stats: { Agilité: 25, Chance: 15 } },
            { nameKey: "sets.armure_de_l_oeil_fantome.item_torso", type: "Torse", stats: { Agilité: 30, Vie: 20, Défense: 5 } },
            { nameKey: "sets.armure_de_l_oeil_fantome.item_legs", type: "Jambes", stats: { Agilité: 28, CritChance: 5.0 } },
            { nameKey: "sets.armure_de_l_oeil_fantome.item_feet", type: "Pieds", stats: { Agilité: 25, Chance: 12 } },
            { nameKey: "sets.armure_de_l_oeil_fantome.item_hands", type: "Mains", stats: { Agilité: 22, CritDamage: 20.0 } },
            { nameKey: "sets.armure_de_l_oeil_fantome.item_weapon", type: "Arme", stats: { Agilité: 45, CritChance: 7.0 } },
            { nameKey: "sets.armure_de_l_oeil_fantome.item_accessory", type: "Accessoire", stats: { Agilité: 20, Chance: 20 } }
        ]
    },
    'REGALIA_DE_L_ESPRIT_DU_MONDE': {
        nameKey: "sets.regalia_de_l_esprit_du_monde.name",
        rarity: "mythic", class_restriction: "Mage",
        bonuses: {
            2: { nameKey: "sets.regalia_de_l_esprit_du_monde.bonus2_name", stats: { Intelligence: 30, Vie: 30 } },
            5: { nameKey: "sets.regalia_de_l_esprit_du_monde.bonus5_name", stats: { 'resistance_percent': 15.0, 'debuff_resistance_percent': 40.0 } },
            7: { nameKey: "sets.regalia_de_l_esprit_du_monde.bonus7_name", stats: { 'damage_percent': 30.0, Intelligence: 40 } }
        },
        items: [
            { nameKey: "sets.regalia_de_l_esprit_du_monde.item_head", type: "Tête", stats: { Intelligence: 25, Vie: 15 } },
            { nameKey: "sets.regalia_de_l_esprit_du_monde.item_torso", type: "Torse", stats: { Intelligence: 30, Défense: 8, 'resistance_percent': 5.0 } },
            { nameKey: "sets.regalia_de_l_esprit_du_monde.item_legs", type: "Jambes", stats: { Intelligence: 22, Vie: 25 } },
            { nameKey: "sets.regalia_de_l_esprit_du_monde.item_feet", type: "Pieds", stats: { Intelligence: 18, Agilité: 15 } },
            { nameKey: "sets.regalia_de_l_esprit_du_monde.item_hands", type: "Mains", stats: { Intelligence: 28, CritChance: 5.0 } },
            { nameKey: "sets.regalia_de_l_esprit_du_monde.item_weapon", type: "Arme", stats: { Intelligence: 45, 'healing_effectiveness_percent': 10.0 } },
            { nameKey: "sets.regalia_de_l_esprit_du_monde.item_accessory", type: "Accessoire", stats: { Intelligence: 20, Vie: 20 } }
        ]
    },
    'TENUE_DE_L_ARCHON_CELESTE': {
        nameKey: "sets.tenue_de_l_archon_celeste.name",
        rarity: "mythic", class_restriction: "Toutes les classes",
        bonuses: {
            2: { nameKey: "sets.tenue_de_l_archon_celeste.bonus2_name", stats: { Vie: 25, Force: 15 } },
            5: { nameKey: "sets.tenue_de_l_archon_celeste.bonus5_name", stats: { CritChance: 10.0, CritDamage: 25.0 } },
            7: { nameKey: "sets.tenue_de_l_archon_celeste.bonus7_name", stats: { 'damage_percent': 20.0, 'lifesteal_percent': 5.0 } }
        },
        items: [
            { nameKey: "sets.tenue_de_l_archon_celeste.item_head", type: "Tête", stats: { Force: 15, Agilité: 15, Vie: 15, Intelligence: 20 } },
            { nameKey: "sets.tenue_de_l_archon_celeste.item_torso", type: "Torse", stats: { Vie: 40, Défense: 8, Force: 15, 'resistance_percent': 5.0 } },
            { nameKey: "sets.tenue_de_l_archon_celeste.item_legs", type: "Jambes", stats: { Vie: 25, Force: 12, Agilité: 12, Intelligence: 10 } },
            { nameKey: "sets.tenue_de_l_archon_celeste.item_feet", type: "Pieds", stats: { Agilité: 25, Force: 10, Chance: 10 } },
            { nameKey: "sets.tenue_de_l_archon_celeste.item_hands", type: "Mains", stats: { Force: 20, Agilité: 20, CritChance: 5.0 } },
            { nameKey: "sets.tenue_de_l_archon_celeste.item_weapon", type: "Arme", stats: { Force: 30, Agilité: 25, 'damage_percent': 5.0 } },
            { nameKey: "sets.tenue_de_l_archon_celeste.item_accessory", type: "Accessoire", stats: { Vie: 20, Force: 10, Intelligence: 15, Agilité: 10, CritDamage: 20.0 } }
        ]
    }
};

const ARTEFACTS_DB = {
    'EGIDE_DU_HERISSON': {
        id: 'EGIDE_DU_HERISSON',
        nameKey: "artefacts.egide_du_herisson.name",
        descriptionKey: "artefacts.egide_du_herisson.description",
        type: "Artefact", rarity: "rare", class_restriction: "Guerrier",
        modifiers: { thorns_damage_flat: 75, Défense: 15, damage_percent: -20.0 },
        cost: { eclats_instables: 900 }
    },
    'PACTE_DU_SANGUINAIRE': {
        id: 'PACTE_DU_SANGUINAIRE',
        nameKey: "artefacts.pacte_du_sanguinaire.name",
        descriptionKey: "artefacts.pacte_du_sanguinaire.description",
        type: "Artefact", rarity: "rare", class_restriction: "Guerrier",
        modifiers: { lifesteal_percent: 7.0, resistance_percent: -15.0 },
        cost: { eclats_instables: 950 }
    },
    'TALISMAN_DU_POINT_FAIBLE': {
        id: 'TALISMAN_DU_POINT_FAIBLE',
        nameKey: "artefacts.talisman_du_point_faible.name",
        descriptionKey: "artefacts.talisman_du_point_faible.description",
        type: "Artefact", rarity: "rare", class_restriction: "Archer",
        modifiers: { CritDamage: 50.0, Vie_percent: -20.0 },
        cost: { eclats_instables: 900 }
    },
    'DAGUE_RITUELLE_ECHANCREE': {
        id: 'DAGUE_RITUELLE_ECHANCREE',
        nameKey: "artefacts.dague_rituelle_echancree.name",
        descriptionKey: "artefacts.dague_rituelle_echancree.description",
        type: "Artefact", rarity: "rare", class_restriction: "Archer",
        modifiers: { bleed_chance_percent: 25.0, lifesteal_percent: -100.0 },
        cost: { eclats_instables: 950 }
    },
    'PIERRE_DE_FLUX': {
        id: 'PIERRE_DE_FLUX',
        nameKey: "artefacts.pierre_de_flux.name",
        descriptionKey: "artefacts.pierre_de_flux.description",
        type: "Artefact", rarity: "rare", class_restriction: "Mage",
        modifiers: { mana_regen_percent: 100, Vie_percent: -25.0 },
        cost: { eclats_instables: 1000 }
    },
    'TOGE_DU_STOIQUE': {
        id: 'TOGE_DU_STOIQUE',
        nameKey: "artefacts.toge_du_stoique.name",
        descriptionKey: "artefacts.toge_du_stoique.description",
        type: "Artefact", rarity: "rare", class_restriction: "Mage",
        modifiers: { resistance_percent: 20.0, damage_percent: -20.0 },
        cost: { eclats_instables: 850 }
    },
    'MARTEAU_DE_STASE_TEMPORELLE': {
        id: 'MARTEAU_DE_STASE_TEMPORELLE',
        nameKey: "artefacts.marteau_de_stase_temporelle.name",
        descriptionKey: "artefacts.marteau_de_stase_temporelle.description",
        type: "Artefact", rarity: "epic", class_restriction: "Guerrier",
        modifiers: { stun_chance_percent: 10.0, damage_percent: -20.0 },
        cost: { eclats_instables: 3000 }
    },
    'IDOLE_DU_MARTYR': {
        id: 'IDOLE_DU_MARTYR',
        nameKey: "artefacts.idole_du_martyr.name",
        descriptionKey: "artefacts.idole_du_martyr.description",
        type: "Artefact", rarity: "epic", class_restriction: "Guerrier",
        modifiers: { Force: 50, lifesteal_percent: 5.0, healing_effectiveness_percent: -75.0 },
        cost: { eclats_instables: 3200 }
    },
    'PLUME_DE_ZEPHYR': {
        id: 'PLUME_DE_ZEPHYR',
        nameKey: "artefacts.plume_de_zephyr.name",
        descriptionKey: "artefacts.plume_de_zephyr.description",
        type: "Artefact", rarity: "epic", class_restriction: "Archer",
        modifiers: { Agilité: 100, Force: -50 },
        cost: { eclats_instables: 2800 }
    },
    'DE_DU_DESTIN_TRUQUE': {
        id: 'DE_DU_DESTIN_TRUQUE',
        nameKey: "artefacts.de_du_destin_truque.name",
        descriptionKey: "artefacts.de_du_destin_truque.description",
        type: "Artefact", rarity: "epic", class_restriction: "Archer",
        modifiers: { CritDamage: 100.0, CritChance: -15.0 },
        cost: { eclats_instables: 3500 }
    },
    'DIADEME_DE_L_IMPRUDENT': {
        id: 'DIADEME_DE_L_IMPRUDENT',
        nameKey: "artefacts.diademe_de_l_imprudent.name",
        descriptionKey: "artefacts.diademe_de_l_imprudent.description",
        type: "Artefact", rarity: "epic", class_restriction: "Mage",
        modifiers: { Intelligence: 120, resistance_percent: -25.0 },
        cost: { eclats_instables: 3000 }
    },
    'SCEAU_DE_L_ALTRUISTE': {
        id: 'SCEAU_DE_L_ALTRUISTE',
        nameKey: "artefacts.sceau_de_l_altruiste.name",
        descriptionKey: "artefacts.sceau_de_l_altruiste.description",
        type: "Artefact", rarity: "epic", class_restriction: "Mage",
        modifiers: { healing_effectiveness_percent: 200, spell_damage_percent: -50.0 },
        cost: { eclats_instables: 2600 }
    },
    'VOEU_DU_GARDIEN': {
        id: 'VOEU_DU_GARDIEN',
        nameKey: "artefacts.voeu_du_gardien.name",
        descriptionKey: "artefacts.voeu_du_gardien.description",
        type: "Artefact", rarity: "legendary", class_restriction: "Guerrier",
        modifiers: { Défense: 40, resistance_percent: 20.0, Vie_percent: 25.0, CritChance: -100.0 },
        cost: { eclats_instables: 10000 }
    },
    'FRAGMENT_DE_FUREUR_PURE': {
        id: 'FRAGMENT_DE_FUREUR_PURE',
        nameKey: "artefacts.fragment_de_fureur_pure.name",
        descriptionKey: "artefacts.fragment_de_fureur_pure.description",
        type: "Artefact", rarity: "legendary", class_restriction: "Guerrier",
        modifiers: { damage_percent: 50.0, Vie_percent: -50.0 },
        cost: { eclats_instables: 12000 }
    },
    'AIGUILLE_DE_VERRE': {
        id: 'AIGUILLE_DE_VERRE',
        nameKey: "artefacts.aiguille_de_verre.name",
        descriptionKey: "artefacts.aiguille_de_verre.description",
        type: "Artefact", rarity: "legendary", class_restriction: "Archer",
        modifiers: { armor_shred_percent: 75.0, Vie_percent: -40.0 },
        cost: { eclats_instables: 11000 }
    },
    'CALICE_DE_MAGIE_SANGUINE': {
        id: 'CALICE_DE_MAGIE_SANGUINE',
        nameKey: "artefacts.calice_de_magie_sanguine.name",
        descriptionKey: "artefacts.calice_de_magie_sanguine.description",
        type: "Artefact", rarity: "legendary", class_restriction: "Mage",
        modifiers: { spell_lifesteal_percent: 15.0, max_mana_percent: -50.0 },
        cost: { eclats_instables: 11500 }
    },
    'COEUR_DU_BERSERKER': {
        id: 'COEUR_DU_BERSERKER',
        nameKey: "artefacts.coeur_du_berserker.name",
        descriptionKey: "artefacts.coeur_du_berserker.description",
        type: "Artefact", rarity: "mythic", class_restriction: "Guerrier",
        modifiers: { damage_percent: 100.0, resistance_percent: -50.0, Défense: -200 },
        cost: { eclats_instables: 40000 }
    },
    'VOLONTE_DU_TITAN': {
        id: 'VOLONTE_DU_TITAN',
        nameKey: "artefacts.volonte_du_titan.name",
        descriptionKey: "artefacts.volonte_du_titan.description",
        type: "Artefact", rarity: "mythic", class_restriction: "Guerrier",
        modifiers: { debuff_resistance_percent: 100, stun_resistance_percent: 100, thorns_damage_flat: 200, Agilité: -150 },
        cost: { eclats_instables: 45000 }
    },
    'OEIL_DE_LYNX_FANTOME': {
        id: 'OEIL_DE_LYNX_FANTOME',
        nameKey: "artefacts.oeil_de_lynx_fantome.name",
        descriptionKey: "artefacts.oeil_de_lynx_fantome.description",
        type: "Artefact", rarity: "mythic", class_restriction: "Archer",
        modifiers: { CritChance: 35.0, Vie_percent: -60.0 },
        cost: { eclats_instables: 42000 }
    },
    'CARQUOIS_INFINI_PARADOXAL': {
        id: 'CARQUOIS_INFINI_PARADOXAL',
        nameKey: "artefacts.carquois_infini_paradoxal.name",
        descriptionKey: "artefacts.carquois_infini_paradoxal.description",
        type: "Artefact", rarity: "mythic", class_restriction: "Archer",
        modifiers: { CritDamage: 150.0, CritChance: 20.0, LootBonusPercent: -100.0, Chance: -100 },
        cost: { eclats_instables: 50000 }
    },
    'ORBE_DE_SURCHARGE_ARCANIQUE': {
        id: 'ORBE_DE_SURCHARGE_ARCANIQUE',
        nameKey: "artefacts.orbe_de_surcharge_arcanique.name",
        descriptionKey: "artefacts.orbe_de_surcharge_arcanique.description",
        type: "Artefact", rarity: "mythic", class_restriction: "Mage",
        modifiers: { spell_damage_percent: 80, mana_cost_percent: 60 },
        cost: { eclats_instables: 38000 }
    },
    'FRAGMENT_DU_NEXUS': {
        id: 'FRAGMENT_DU_NEXUS',
        nameKey: "artefacts.fragment_du_nexus.name",
        descriptionKey: "artefacts.fragment_du_nexus.description",
        type: "Artefact", rarity: "mythic", class_restriction: "Mage",
        modifiers: { freecast_chance_percent: 25.0, spell_damage_percent: 50.0, Vie_percent: -75.0 },
        cost: { eclats_instables: 55000 }
    }
};  

// ----------------------------------------------------------------------------
// SECTION: BOSS (BOSS_DB)
// ----------------------------------------------------------------------------

const BOSS_DB = [
  { id: 0, nameKey: "bosses.grand_gobelin_grognon.name", sprite: 'assets/sprites/bosses/boss1.png', baseStats: { Vie: 50, Force: 8, Agilité: 10, Défense: 4, Intelligence: 2, Chance: 5 }, xpReward: 200, resourceReward: 50, itemDropChance: 0.3, levelRequirement: 5, bountyTokenReward: 1 },
  { id: 1, nameKey: "bosses.ogre_colossal.name", sprite: 'assets/sprites/bosses/boss2.png', baseStats: { Vie: 180, Force: 28, Agilité: 8, Défense: 18, Intelligence: 5, Chance: 8, 'stun_chance_percent': 10 }, xpReward: 800, resourceReward: 200, itemDropChance: 0.5, levelRequirement: 15, bountyTokenReward: 1 },
  { id: 2, nameKey: "bosses.dragonnet_de_feu.name", sprite: 'assets/sprites/bosses/boss3.png', baseStats: { Vie: 320, Force: 40, Agilité: 25, Défense: 22, Intelligence: 20, Chance: 12, CritChance: 15, CritDamage: 1.6 }, xpReward: 2500, resourceReward: 750, itemDropChance: 0.7, levelRequirement: 25, bountyTokenReward: 1 },
  { id: 3, nameKey: "bosses.seigneur_vampire.name", sprite: 'assets/sprites/bosses/boss4.png', baseStats: { Vie: 600, Force: 65, Agilité: 35, Défense: 40, Intelligence: 30, Chance: 15, 'lifesteal_percent': 25 }, xpReward: 5000, resourceReward: 1500, itemDropChance: 0.8, levelRequirement: 35, bountyTokenReward: 1 },
  { id: 4, nameKey: "bosses.lich_archimage.name", sprite: 'assets/sprites/bosses/boss5.png', baseStats: { Vie: 1200, Force: 80, Agilité: 25, Défense: 60, Intelligence: 50, Chance: 20, 'armor_shred_percent': 30 }, xpReward: 10000, resourceReward: 3000, itemDropChance: 0.9, levelRequirement: 45, bountyTokenReward: 1 }
];

// ============================================================================
// ============================================================================
// SECTION: BASE DE DONNÉES DES ENNEMIS (ENEMIES_DB)
// ============================================================================
// ============================================================================

// DANS db.0.9.0.js
// REMPLACEZ la constante ENEMIES_DB existante par celle-ci dans son intégralité.

const ENEMIES_DB = {
    'RAT_GEANT': { nameKey: "enemies.rat_geant.name", descriptionKey: "enemies.rat_geant.description", sprite: 'assets/sprites/mobs/rat.png', baseStats: { Vie: 25, Force: 6, Agilité: 8, Défense: 2, Intelligence: 1, Chance: 5 }, xpReward: 50, loot: { 'tissu': 10 } },
    'REINE_DES_RATS': { nameKey: "enemies.reine_des_rats.name", descriptionKey: "enemies.reine_des_rats.description", sprite: 'assets/sprites/mobs/reine_rat.png', baseStats: { Vie: 40, Force: 8, Agilité: 12, Défense: 3, Intelligence: 2, Chance: 10 }, xpReward: 100, loot: { 'tissu': 15, 'fragments': 1 } },
    'BANDIT': { nameKey: "enemies.bandit.name", descriptionKey: "enemies.bandit.description", sprite: 'assets/sprites/mobs/bandit.png', baseStats: { Vie: 60, Force: 12, Agilité: 12, Défense: 5, Intelligence: 5, Chance: 10 }, xpReward: 140, loot: { 'metal': 25, 'tissu': 15 } },
    'CHEF_BANDIT': { nameKey: "enemies.chef_bandit.name", descriptionKey: "enemies.chef_bandit.description", sprite: 'assets/sprites/mobs/chef_bandit.png', baseStats: { Vie: 110, Force: 18, Agilité: 15, Défense: 8, Intelligence: 8, Chance: 12 }, xpReward: 260, loot: { 'metal': 50, 'tissu': 30, 'fragments': 1 } },
    'GOLEM_PIERRE': { nameKey: "enemies.golem_pierre.name", descriptionKey: "enemies.golem_pierre.description", sprite: 'assets/sprites/mobs/golem_pierre.png', role: 'tank', intercept_percent: 50, baseStats: { Vie: 300, Force: 35, Agilité: 2, Défense: 25, Intelligence: 2, Chance: 1 }, xpReward: 305, loot: { 'metal': 75 } },
    'MINI_GOLEM_PIERRE': { nameKey: "enemies.mini_golem_pierre.name", descriptionKey: "enemies.mini_golem_pierre.description", sprite: 'assets/sprites/mobs/mini_golem_pierre.png', role: 'tank', intercept_percent: 50, baseStats: { Vie: 160, Force: 17, Agilité: 5, Défense: 10, Intelligence: 1, Chance: 1 }, xpReward: 205, loot: { 'metal': 40 } },
    'GARDIEN_DE_PIERRE_ETERNE': { nameKey: "enemies.gardien_de_pierre_eterne.name", descriptionKey: "enemies.gardien_de_pierre_eterne.description", sprite: 'assets/sprites/mobs/gardien_pierre_eternel.png', baseStats: { Vie: 350, Force: 45, Agilité: 10, Défense: 30, Intelligence: 20, Chance: 10 }, xpReward: 600, loot: { 'metal': 250, 'fragments': 3 }, rareLoot: [{ itemId: 'coeur_de_golem', chance: 0.35 }] },
    'ELEMENTAIRE_EAU': { nameKey: "enemies.elementaire_eau.name", descriptionKey: "enemies.elementaire_eau.description", sprite: 'assets/sprites/mobs/elementaire_eau.png', baseStats: { Vie: 150, Force: 25, Agilité: 20, Défense: 12, Intelligence: 15, Chance: 10 }, xpReward: 265, loot: { 'tissu': 50, 'fragments': 2 } },
    'INSECTE_MINEUR': { nameKey: "enemies.insecte_mineur.name", descriptionKey: "enemies.insecte_mineur.description", sprite: 'assets/sprites/mobs/insecte_mineur.png', baseStats: { Vie: 75, Force: 15, Agilité: 10, Défense: 12, Intelligence: 2, Chance: 5 }, xpReward: 142, loot: { 'metal': 40 }, rareLoot: [{ itemId: 'chitine_renforcee', chance: 0.12 }] },
    'ARAIGNEE_DE_CAVE': { nameKey: "enemies.araignee_de_cave.name", descriptionKey: "enemies.araignee_de_cave.description", sprite: 'assets/sprites/mobs/arraignee_cave.png', baseStats: { Vie: 30, Force: 7, Agilité: 10, Défense: 3, Intelligence: 1, Chance: 5 }, xpReward: 25, loot: { 'tissu': 15 } },
    'LOUP_AFFAME': { nameKey: "enemies.loup_affame.name", descriptionKey: "enemies.loup_affame.description", sprite: 'assets/sprites/mobs/loup_affame.png', baseStats: { Vie: 35, Force: 8, Agilité: 15, Défense: 3, Intelligence: 2, Chance: 5 }, xpReward: 25, loot: { 'tissu': 12 } },
    'SANGLIER_FURIEUX': { nameKey: "enemies.sanglier_furieux.name", descriptionKey: "enemies.sanglier_furieux.description", sprite: 'assets/sprites/mobs/sanglier_furieux.png', baseStats: { Vie: 50, Force: 12, Agilité: 8, Défense: 5, Intelligence: 1, Chance: 3 }, xpReward: 30, loot: { 'bois': 15 } },
    'ARAIGNEE_GEANTE': { nameKey: "enemies.araignee_geante.name", descriptionKey: "enemies.araignee_geante.description", sprite: 'assets/sprites/mobs/arraignee_geante.png', baseStats: { Vie: 80, Force: 15, Agilité: 18, Défense: 6, Intelligence: 3, Chance: 8 }, xpReward: 70, loot: { 'tissu': 40 } },
    'GRIFFON': { nameKey: "enemies.griffon.name", descriptionKey: "enemies.griffon.description", sprite: 'assets/sprites/mobs/griffon.png', baseStats: { Vie: 200, Force: 30, Agilité: 25, Défense: 12, Intelligence: 8, Chance: 10 }, xpReward: 250, loot: { 'tissu': 80, 'fragments': 3 }, rareLoot: [{ itemId: 'plume_de_griffon', chance: 0.10 }] },
    'BASILIC': { nameKey: "enemies.basilic.name", descriptionKey: "enemies.basilic.description", sprite: 'assets/sprites/mobs/basilic.png', baseStats: { Vie: 250, Force: 35, Agilité: 15, Défense: 20, Intelligence: 5, Chance: 12 }, xpReward: 350, loot: { 'metal': 120, 'fragments': 5 }, rareLoot: [{ itemId: 'sang_de_basilic', chance: 0.10 }] },
    'SCORPION_DES_SABLES': { nameKey: "enemies.scorpion_des_sables.name", descriptionKey: "enemies.scorpion_des_sables.description", sprite: 'assets/sprites/mobs/scorpion_sable.png', baseStats: { Vie: 90, Force: 18, Agilité: 14, Défense: 10, Intelligence: 2, Chance: 6 }, xpReward: 80, loot: { 'metal': 30 }, rareLoot: [{ itemId: 'chitine_renforcee', chance: 0.15 }] },
    'VER_DES_SABLES': { nameKey: "enemies.ver_des_sables.name", descriptionKey: "enemies.ver_des_sables.description", sprite: 'assets/sprites/mobs/ver_sable.png', baseStats: { Vie: 400, Force: 50, Agilité: 10, Défense: 25, Intelligence: 3, Chance: 5 }, xpReward: 500, loot: { 'metal': 200, 'fragments': 4 } },
    'GOBELIN_FRONDEUR': { nameKey: "enemies.gobelin_frondeur.name", descriptionKey: "enemies.gobelin_frondeur.description", sprite: 'assets/sprites/mobs/gobelin_frondeur.png', baseStats: { Vie: 20, Force: 5, Agilité: 12, Défense: 1, Intelligence: 3, Chance: 8 }, xpReward: 15, loot: { 'metal': 40 }, rareLoot: [{ itemId: 'chitine_renforcee', chance: 1 }] },
    'CHEF_GOBELIN': { nameKey: "enemies.chef_gobelin.name", descriptionKey: "enemies.chef_gobelin.description", sprite: 'assets/sprites/mobs/chef_gobelin.png', baseStats: { Vie: 80, Force: 12, Agilité: 18, Défense: 5, Intelligence: 5, Chance: 10 }, xpReward: 15, loot: { 'bois': 5 } },
    'ORC_BERSERKER': { nameKey: "enemies.orc_berserker.name", descriptionKey: "enemies.orc_berserker.description", sprite: 'assets/sprites/mobs/orc_berserker.png', baseStats: { Vie: 140, Force: 25, Agilité: 5, Défense: 10, Intelligence: 2, Chance: 4 }, xpReward: 90, loot: { 'metal': 35, 'bois': 20 }, rareLoot: [{ itemId: 'totem_orc', chance: 0.10 }] },
    'SQUELETTE_GUERRIER': { nameKey: "enemies.squelette_guerrier.name", descriptionKey: "enemies.squelette_guerrier.description", sprite: 'assets/sprites/mobs/squelette_guerrier.png', baseStats: { Vie: 70, Force: 14, Agilité: 12, Défense: 7, Intelligence: 3, Chance: 1 }, xpReward: 45, loot: { 'metal': 15 } },
    'NECROMANCIEN_APPRENTI': { nameKey: "enemies.necromancien_apprenti.name", descriptionKey: "enemies.necromancien_apprenti.description", sprite: 'assets/sprites/mobs/necromancien_apprenti.png', baseStats: { Vie: 70, Force: 8, Agilité: 10, Défense: 5, Intelligence: 18, Chance: 10 }, xpReward: 120, loot: { 'tissu': 50 } },
    'CULTISTE_ZELOTE': { nameKey: "enemies.cultiste_zelote.name", descriptionKey: "enemies.cultiste_zelote.description", sprite: 'assets/sprites/mobs/cultiste_zelote.png', baseStats: { Vie: 80, Force: 15, Agilité: 12, Défense: 8, Intelligence: 12, Chance: 8 }, xpReward: 150, loot: { 'tissu': 60, 'metal': 20 } },
    'GARDE_AUTOMATE': { nameKey: "enemies.garde_automate.name", descriptionKey: "enemies.garde_automate.description", sprite: 'assets/sprites/mobs/garde_automate.png', role: 'tank', intercept_percent: 40, baseStats: { Vie: 180, Force: 28, Agilité: 10, Défense: 18, Intelligence: 1, Chance: 1 }, xpReward: 200, loot: { 'metal': 150 } },
    'INITIE_DE_L_OMBRE': { nameKey: "enemies.initie_de_l_ombre.name", descriptionKey: "enemies.initie_de_l_ombre.description", sprite: 'assets/sprites/mobs/initie_ombre.png', baseStats: { Vie: 150, Force: 22, Agilité: 35, Défense: 8, Intelligence: 15, Chance: 10 }, xpReward: 250, loot: { 'tissu': 60, 'fragments': 1 } },
    'ASSASSIN_DE_L_OMBRE': { nameKey: "enemies.assassin_de_l_ombre.name", descriptionKey: "enemies.assassin_de_l_ombre.description", sprite: 'assets/sprites/mobs/assassin_ombre.png', baseStats: { Vie: 280, Force: 38, Agilité: 50, Défense: 12, Intelligence: 20, Chance: 15,CritChance: 15 }, xpReward: 450, loot: { 'tissu': 100, 'metal': 50, 'fragments': 2 }},
    'MAITRE_DE_L_OMBRE': {nameKey: "enemies.maitre_de_l_ombre.name", descriptionKey: "enemies.maitre_de_l_ombre.description", sprite: 'assets/sprites/mobs/maitre_ombre.png', baseStats: { Vie: 450, Force: 55, Agilité: 70, Défense: 18, Intelligence: 35, Chance: 20,CritChance: 25,'armor_shred_percent': 15 }, xpReward: 900, loot: { 'tissu': 200, 'metal': 100, 'fragments': 5 } },
    'SPECTRE_GEMISSANT': { nameKey: "enemies.spectre_gemissant.name", descriptionKey: "enemies.spectre_gemissant.description", sprite: 'assets/sprites/mobs/spectre_gemissant.png', baseStats: { Vie: 75, Force: 12, Agilité: 22, Défense: 6, Intelligence: 14, Chance: 10 }, xpReward: 110, loot: { 'fragments': 1 }, rareLoot: [{ itemId: 'essence_spectrale', chance: 0.04 }] },
    'ELEMENTAIRE_DE_MAGMA': { nameKey: "enemies.elementaire_de_magma.name", descriptionKey: "enemies.elementaire_de_magma.description", sprite: 'assets/sprites/mobs/elementaire_magma.png', baseStats: { Vie: 220, Force: 38, Agilité: 12, Défense: 15, Intelligence: 5, Chance: 5 }, xpReward: 300, loot: { 'metal': 100, 'fragments': 6 } },
    'HARPIE': { nameKey: "enemies.harpie.name", descriptionKey: "enemies.harpie.description", sprite: 'assets/sprites/mobs/harpie.png', baseStats: { Vie: 85, Force: 14, Agilité: 28, Défense: 7, Intelligence: 6, Chance: 12 }, xpReward: 130, loot: { 'tissu': 30 }, rareLoot: [{ itemId: 'plume_de_griffon', chance: 0.18 }] },
    'MOMIE_GARDIENNE': { nameKey: "enemies.momie_gardienne.name", descriptionKey: "enemies.momie_gardienne.description", sprite: 'assets/sprites/mobs/momie.png', baseStats: { Vie: 180, Force: 25, Agilité: 8, Défense: 14, Intelligence: 4, Chance: 8 }, xpReward: 220, loot: { 'tissu': 120 } },
    'DJINN': { nameKey: "enemies.djinn.name", descriptionKey: "enemies.djinn.description", sprite: 'assets/sprites/mobs/djinn.png', baseStats: { Vie: 300, Force: 30, Agilité: 30, Défense: 20, Intelligence: 30, Chance: 20 }, xpReward: 700, loot: { 'fragments': 25, 'tissu': 200 } },
    'LE_COLLECTEUR': { nameKey: "enemies.le_collecteur.name", descriptionKey: "enemies.le_collecteur.description", sprite: 'assets/sprites/mobs/collectionneur.png', baseStats: { Vie: 500, Force: 45, Agilité: 15, Défense: 30, Intelligence: 20, Chance: 5 }, xpReward: 1000, loot: { 'metal': 300, 'fragments': 15 } },
    'CHIMERE': { nameKey: "enemies.chimere.name", descriptionKey: "enemies.chimere.description", sprite: 'assets/sprites/mobs/chimere.png', baseStats: { Vie: 600, Force: 55, Agilité: 25, Défense: 22, Intelligence: 10, Chance: 10 }, xpReward: 1200, loot: { 'tissu': 250, 'bois': 250, 'metal': 250 }, rareLoot: [{ itemId: 'oeil_de_chimere', chance: 0.06 }] },
    'CHIMERE_RENFORCEE': { nameKey: "enemies.chimere_renforcee.name", descriptionKey: "enemies.chimere_renforcee.description", sprite: 'assets/sprites/mobs/chimere.png', baseStats: { Vie: 6000, Force: 55, Agilité: 25, Défense: 22, Intelligence: 10, Chance: 10 }, xpReward: 0, loot: {}},
    'HYDRE_DES_MARAIS': { nameKey: "enemies.hydre_des_marais.name", descriptionKey: "enemies.hydre_des_marais.description", sprite: 'assets/sprites/mobs/hydre_marais.png', baseStats: { Vie: 750, Force: 60, Agilité: 20, Défense: 28, Intelligence: 8, Chance: 15 }, xpReward: 1500, loot: { 'fragments': 30, 'tissu': 500 } },
    'OTYUGH': {nameKey: "enemies.otyugh.name", descriptionKey: "enemies.otyugh.description", sprite: 'assets/sprites/mobs/otyugh.png', role: 'tank', intercept_percent: 40,  baseStats: { Vie: 180, Force: 25, Agilité: 8, Défense: 20, Intelligence: 5, Chance: 5 }, xpReward: 220,  loot: { 'tissu': 80, 'metal': 40 } },
    'MINOTAURE': { nameKey: "enemies.minotaure.name", descriptionKey: "enemies.minotaure.description", sprite: 'assets/sprites/mobs/minotaure.png', baseStats: { Vie: 300, Force: 45, Agilité: 15, Défense: 20, Intelligence: 8, Chance: 10 }, xpReward: 450, loot: { 'bois': 100, 'metal': 50 } },
    'PROFOND_GUERRIER': { nameKey: "enemies.profond_guerrier.name", descriptionKey: "enemies.profond_guerrier.description", sprite: 'assets/sprites/mobs/profond_guerrier.png', baseStats: { Vie: 250, Force: 40, Agilité: 25, Défense: 22, Intelligence: 10, Chance: 15 }, xpReward: 380, loot: { 'metal': 120, 'tissu': 60 }, rareLoot: [{ itemId: 'ecaille_de_profond', chance: 0.03 }] },
    'PROFOND_CHAMPION': { nameKey: "enemies.profond_champion.name", descriptionKey: "enemies.profond_champion.description", sprite: 'assets/sprites/mobs/profond_champion.png', role: 'tank', intercept_percent: 25, baseStats: { Vie: 450, Force: 55, Agilité: 30, Défense: 30, Intelligence: 15, Chance: 18 }, xpReward: 600, loot: { 'metal': 200, 'fragments': 10 }, rareLoot: [{ itemId: 'ecaille_de_profond', chance: 0.05 }] },
    'ARCHANGE': { nameKey: "enemies.archange.name", descriptionKey: "enemies.archange.description", sprite: 'assets/sprites/mobs/archange.png', baseStats: { Vie: 800, Force: 70, Agilité: 60, Défense: 40, Intelligence: 50, Chance: 30 }, xpReward: 2500, loot: { 'fragments': 50, 'tissu': 300 }, rareLoot: [{ itemId: 'larme_d_archange', chance: 0.05 }] },
    'DRAGON_ROUGE_ANCIEN': { nameKey: "enemies.dragon_rouge_ancien.name", descriptionKey: "enemies.dragon_rouge_ancien.description", sprite: 'assets/sprites/mobs/dragon_ancien.png', baseStats: { Vie: 1500, Force: 120, Agilité: 40, Défense: 60, Intelligence: 45, Chance: 25 }, xpReward: 4000, loot: { 'metal': 800, 'fragments': 75 }, rareLoot: [{ itemId: 'coeur_de_dragon_ancien', chance: 0.07 }] },
    'ARCHIMAGE_DEMENT': { nameKey: "enemies.archimage_dement.name", descriptionKey: "enemies.archimage_dement.description", sprite: 'assets/sprites/mobs/archimage_dement.png', baseStats: { Vie: 650, Force: 50, Agilité: 55, Défense: 35, Intelligence: 85, Chance: 40 }, xpReward: 3200, loot: { 'tissu': 500, 'fragments': 40 } },
    'ROI_SINGE_ESPRIT': { nameKey: "enemies.roi_singe_esprit.name", descriptionKey: "enemies.roi_singe_esprit.description", sprite: 'assets/sprites/mobs/roi_singe.png', baseStats: { Vie: 700, Force: 65, Agilité: 80, Défense: 40, Intelligence: 60, Chance: 50 }, xpReward: 2800, loot: { 'bois': 400, 'tissu': 200 }, rareLoot: [{ itemId: 'essence_spectrale', chance: 0.05 }] },
    'SHOGGOTH': { nameKey: "enemies.shoggoth.name", descriptionKey: "enemies.shoggoth.description", sprite: 'assets/sprites/mobs/shoggoth.png', baseStats: { Vie: 1200, Force: 90, Agilité: 20, Défense: 50, Intelligence: 10, Chance: 5 }, xpReward: 3500, loot: { 'fragments': 100 } },
    'GOLEM_PIERRE_MYTHIQUE': { nameKey: "enemies.golem_pierre_mythique.name", descriptionKey: "enemies.golem_pierre_mythique.description", sprite: 'assets/sprites/mobs/gardien_pierre_eternel.png', baseStats: { Vie: 2000, Force: 100, Agilité: 15, Défense: 80, Intelligence: 20, Chance: 10 }, xpReward: 4500, loot: { 'metal': 1200 } },
    'ROI_BARBARE': { nameKey: "enemies.roi_barbare.name", descriptionKey: "enemies.roi_barbare.description", sprite: 'assets/sprites/mobs/roi_barbare.png', baseStats: { Vie: 900, Force: 85, Agilité: 40, Défense: 50, Intelligence: 25, Chance: 30 }, xpReward: 2000, loot: { 'metal': 300, 'bois': 200 } },
    'ARCHERE_ELFE': { nameKey: "enemies.archere_elfe.name", descriptionKey: "enemies.archere_elfe.description", sprite: 'assets/sprites/mobs/archere_elfe.png', baseStats: { Vie: 600, Force: 50, Agilité: 90, Défense: 35, Intelligence: 50, Chance: 40 }, xpReward: 2200, loot: { 'tissu': 300, 'bois': 150 } },
    'CHEVALIER_ETERNEL': { nameKey: "enemies.chevalier_eternel.name", descriptionKey: "enemies.chevalier_eternel.description", sprite: 'assets/sprites/mobs/chevalier_eternel.png', baseStats: { Vie: 1100, Force: 75, Agilité: 50, Défense: 65, Intelligence: 40, Chance: 35 }, xpReward: 2500, loot: { 'metal': 500 } },
    'FORGERON_DEMON': { nameKey: "enemies.forgeron_demon.name", descriptionKey: "enemies.forgeron_demon.description", sprite: 'assets/sprites/mobs/forgeron_demon.png', baseStats: { Vie: 1300, Force: 110, Agilité: 35, Défense: 55, Intelligence: 40, Chance: 20 }, xpReward: 3800, loot: { 'metal': 1000, 'fragments': 80 } },
    'DEMON_MINEUR': { nameKey: "enemies.demon_mineur.name", descriptionKey: "enemies.demon_mineur.description", sprite: 'assets/sprites/mobs/demon_mineur.png', baseStats: { Vie: 400, Force: 60, Agilité: 40, Défense: 30, Intelligence: 20, Chance: 15 }, xpReward: 500, loot: { 'metal': 50 }, rareLoot: [{ itemId: 'fragment_d_ame_de_demon', chance: 0.02 }] },
    'GENERAL_DEMON': { nameKey: "enemies.general_demon.name", descriptionKey: "enemies.general_demon.description", sprite: 'assets/sprites/mobs/general_demon.png', baseStats: { Vie: 1400, Force: 100, Agilité: 50, Défense: 60, Intelligence: 50, Chance: 25 }, xpReward: 4200, loot: { 'metal': 600, 'fragments': 100 }, rareLoot: [{ itemId: 'fragment_d_ame_de_demon', chance: 0.06 }] },
    'HORREUR_DIMENSIONNELLE': { nameKey: "enemies.horreur_dimensionnelle.name", descriptionKey: "enemies.horreur_dimensionnelle.description", sprite: 'assets/sprites/mobs/horreur_dimentionnelle.png', baseStats: { Vie: 1800, Force: 130, Agilité: 60, Défense: 70, Intelligence: 80, Chance: 10 }, xpReward: 6000, loot: { 'fragments': 200 }, rareLoot: [{ itemId: 'poussiere_de_vide', chance: 0.08 }] },
    'GRIFFON_CORROMPU': { nameKey: "enemies.griffon_corrompu.name", descriptionKey: "enemies.griffon_corrompu.description", sprite: 'assets/sprites/mobs/griffon_corrompu.png', baseStats: { Vie: 1600, Force: 110, Agilité: 80, Défense: 60, Intelligence: 30, Chance: 5 }, xpReward: 5000, loot: { 'tissu': 500 } },
    'DRAGON_CORROMPU': { nameKey: "enemies.dragon_corrompu.name", descriptionKey: "enemies.dragon_corrompu.description", sprite: 'assets/sprites/mobs/dragon_corrompu.png', baseStats: { Vie: 2500, Force: 150, Agilité: 50, Défense: 80, Intelligence: 20, Chance: 0 }, xpReward: 8000, loot: { 'metal': 1500, 'fragments': 150 } },
    'DIEU_FOU': { nameKey: "enemies.dieu_fou.name", descriptionKey: "enemies.dieu_fou.description", sprite: 'assets/sprites/mobs/dieu_fou.png', baseStats: { Vie: 5000, Force: 200, Agilité: 100, Défense: 100, Intelligence: 150, Chance: 50 }, xpReward: 20000, loot: { 'fragments': 500 } },
    'DOUBLE_SOMBRE': { nameKey: "enemies.double_sombre.name", descriptionKey: "enemies.double_sombre.description", sprite: 'assets/sprites/mobs/double_sombre.png', baseStats: { Vie: 1500, Force: 100, Agilité: 120, Défense: 60, Intelligence: 90, Chance: 60 }, xpReward: 7500, loot: { 'tissu': 1000 } },
    'OUROBOROS': { nameKey: "enemies.ouroboros.name", descriptionKey: "enemies.ouroboros.description", sprite: 'assets/sprites/mobs/ouroboros.png', baseStats: { Vie: 3000, Force: 140, Agilité: 90, Défense: 90, Intelligence: 110, Chance: 70 }, xpReward: 10000, loot: { 'fragments': 300 } },
    'TALOS_REFORGE': { nameKey: "enemies.talos_reforge.name", descriptionKey: "enemies.talos_reforge.description", sprite: 'assets/sprites/mobs/talos_reforge.png', baseStats: { Vie: 2800, Force: 160, Agilité: 30, Défense: 120, Intelligence: 10, Chance: 10 }, xpReward: 9000, loot: { 'metal': 2500 } },
    'SCARABEE_GOLIATH': { nameKey: "enemies.scarabee_goliath.name", descriptionKey: "enemies.scarabee_goliath.description", sprite: 'assets/sprites/mobs/garden_beetle.png', baseStats: { Vie: 50, Force: 10, Agilité: 5, Défense: 10, Intelligence: 1, Chance: 5 }, xpReward: 20, loot: { 'Chitine Renforcée': 1 } },
    'VER_DE_RACINE': { nameKey: "enemies.ver_de_racine.name", descriptionKey: "enemies.ver_de_racine.description", sprite: 'assets/sprites/mobs/garden_worm.png', baseStats: { Vie: 80, Force: 12, Agilité: 2, Défense: 15, Intelligence: 1, Chance: 2 }, xpReward: 25, loot: { 'Chitine Renforcée': 2 } },
    'TUTORIAL_DUMMY': { nameKey: "enemies.tutorial_dummy.name", descriptionKey: "enemies.tutorial_dummy.description", sprite: 'assets/sprites/mobs/dummy.png', baseStats: { Vie: 20, Force: 2, Agilité: 0, Défense: 0, Intelligence: 0, Chance: 0 }, xpReward: 0, loot: {} },
    'loup_dissonant': { nameKey: "enemies.loup_dissonant.name", descriptionKey: "enemies.loup_dissonant.description", sprite: 'assets/sprites/mobs/loup_dissonant.png', baseStats: { Vie: 35, Force: 10, Agilité: 14, Défense: 4, Intelligence: 2, Chance: 5 }, xpReward: 35, loot: { 'tissu': 15 } },
    'GARDIEN_ERODE': { nameKey: "enemies.gardien_erode.name", descriptionKey: "enemies.gardien_erode.description", sprite: 'assets/sprites/mobs/gardien_erode.png', baseStats: { Vie: 300, Force: 33, Agilité: 15, Défense: 20, Intelligence: 15, Chance: 10 }, xpReward: 1000, loot: { 'metal': 200, 'fragments': 10 } },  
    'JUGE_DISSONANT': { nameKey: "enemies.juge_dissonant.name", descriptionKey: "enemies.juge_dissonant.description", sprite: 'assets/sprites/mobs/juge_dissonant.png', baseStats: { Vie: 2500, Force: 120, Agilité: 80, Défense: 70, Intelligence: 90, Chance: 25, 'resistance_percent': 25.0 }, xpReward: 15000, loot: { 'fragments': 250, 'eclats_instables': 150 } },
    'ESPRIT_ANCIEN_TOURMENTE': { nameKey: "enemies.esprit_ancien_tourmente.name", descriptionKey: "enemies.esprit_ancien_tourmente.description", sprite: 'assets/sprites/mobs/esprit_ancien_tourmente.png', baseStats: { Vie: 450, Force: 80, Agilité: 60, Défense: 40, Intelligence: 110, Chance: 30, 'resistance_percent': 15.0 }, xpReward: 3000, loot: { 'fragments': 50, 'eclats_instables': 25 } },
    'HERAUT_DU_SILENCE': { nameKey: "enemies.heraut_du_silence.name", descriptionKey: "enemies.heraut_du_silence.description", sprite: 'assets/sprites/mobs/heraut_du_silence.png', baseStats: { Vie: 1200, Force: 100, Agilité: 70, Défense: 60, Intelligence: 80, Chance: 20 }, xpReward: 8000, loot: { 'fragments': 100, 'eclats_instables': 75 } },
    'FRAGMENT_DE_DISSONANCE_MINEUR': { nameKey: "enemies.fragment_de_dissonance_mineur.name", descriptionKey: "enemies.fragment_de_dissonance_mineur.description", sprite: 'assets/sprites/mobs/fragment_de_dissonance.png', baseStats: { Vie: 600, Force: 90, Agilité: 70, Défense: 50, Intelligence: 120, Chance: 35, 'resistance_percent': 20.0 }, xpReward: 4000, loot: { 'fragments': 75, 'eclats_instables': 30, 'essence_dissonante': 5 } },
    'GARDIEN_VERROUILLE': { nameKey: "enemies.gardien_verrouille.name", descriptionKey: "enemies.gardien_verrouille.description", sprite: 'assets/sprites/mobs/gardien_verrouille.png', baseStats: { Vie: 1800, Force: 110, Agilité: 60, Défense: 90, Intelligence: 70, Chance: 15, 'resistance_percent': 30.0 }, xpReward: 9000, loot: { 'fragments': 120, 'eclats_instables': 80, 'essence_dissonante': 15 } },
    'ARME_DE_LARRY': { nameKey: "enemies.arme_de_larry.name", descriptionKey: "enemies.arme_de_larry.description", sprite: 'assets/sprites/mobs/arme_de_larry.png', baseStats: { Vie: 3500, Force: 150, Agilité: 100, Défense: 80, Intelligence: 110, Chance: 30, 'resistance_percent': 35.0 }, xpReward: 20000, loot: { 'fragments': 300, 'eclats_instables': 200, 'essence_dissonante': 50 } },
    'HARMONISTE_CORROMPU': { nameKey: "enemies.harmoniste_corrompu.name", descriptionKey: "enemies.harmoniste_corrompu.description", sprite: 'assets/sprites/mobs/harmoniste_corrompu.png', baseStats: { Vie: 4000, Force: 160, Agilité: 110, Défense: 90, Intelligence: 130, Chance: 40, 'resistance_percent': 40.0 }, xpReward: 25000, loot: { 'fragments': 400, 'eclats_instables': 250, 'essence_dissonante_pure': 1 } },
    'larry_invincible': { nameKey: "enemies.larry_invincible.name", descriptionKey: "enemies.larry_invincible.description", sprite: 'assets/sprites/portraits/larry.png', baseStats: { Vie: 99999, Force: 40, Agilité: 0, Défense: -2000, Intelligence: 200, Chance: 0 }, xpReward: 0, loot: {} },
    'FRAGMENT_DE_DOULEUR': { 
        nameKey: "enemies.fragment_de_douleur.name", // Tu devras ajouter cette clé de traduction
        descriptionKey: "enemies.fragment_de_douleur.description", // Et celle-ci aussi
        sprite: 'assets/sprites/mobs/fragment_de_douleur.png', 
        baseStats: { Vie: 50, Force: 5, Agilité: 30, Défense: 2, Intelligence: 10, Chance: 5 }, 
        xpReward: 0, // Les créatures invoquées ne donnent généralement pas d'XP
        loot: {} 
    },
};

// ============================================================================
// ==   TABLEAU DE PRIMES QUOTIDIENNES  ==
// ============================================================================

const BOUNTIES_DB = [
    // --- Primes Faciles ---
    { id: 'BF01', nameKey: "bounties.bf01.name", powerRequirement: 10, difficulty: "Facile", targetEnemyId: 'REINE_DES_RATS', statMultiplier: 1.5, xpReward: 300, reward: { marques_de_chasse: 1 } },
    { id: 'BF02', nameKey: "bounties.bf02.name", powerRequirement: 25, difficulty: "Facile", targetEnemyId: 'SANGLIER_FURIEUX', statMultiplier: 1.8, xpReward: 400, reward: { marques_de_chasse: 1 } },
    { id: 'BF03', nameKey: "bounties.bf03.name", powerRequirement: 40, difficulty: "Facile", targetEnemyId: 'CHEF_BANDIT', statMultiplier: 1.2, xpReward: 450, reward: { marques_de_chasse: 1 } },
    { id: 'BF04', nameKey: "bounties.bf04.name", powerRequirement: 60, difficulty: "Facile", targetEnemyId: 'ARAIGNEE_GEANTE', statMultiplier: 1.6, xpReward: 600, reward: { marques_de_chasse: 2, fragments: 2 } },
    { id: 'BF05', nameKey: "bounties.bf05.name", powerRequirement: 80, difficulty: "Facile", targetEnemyId: 'SQUELETTE_GUERRIER', statMultiplier: 2.0, xpReward: 750, reward: { marques_de_chasse: 2 } },
    { id: 'BF06', nameKey: "bounties.bf06.name", powerRequirement: 20, difficulty: "Facile", targetEnemyId: 'BANDIT', statMultiplier: 2.2, xpReward: 350, reward: { marques_de_chasse: 1 } },
    { id: 'BF07', nameKey: "bounties.bf07.name", powerRequirement: 50, difficulty: "Facile", targetEnemyId: 'LOUP_AFFAME', statMultiplier: 2.0, xpReward: 500, reward: { marques_de_chasse: 2 } },
    { id: 'BF08', nameKey: "bounties.bf08.name", powerRequirement: 70, difficulty: "Facile", targetEnemyId: 'SQUELETTE_GUERRIER', statMultiplier: 1.8, xpReward: 650, reward: { marques_de_chasse: 2 } },
    { id: 'BF09', nameKey: "bounties.bf09.name", powerRequirement: 30, difficulty: "Facile", targetEnemyId: 'GOBELIN_FRONDEUR', statMultiplier: 3.0, xpReward: 420, reward: { marques_de_chasse: 1, bois: 150 } },
    { id: 'BF10', nameKey: "bounties.bf10.name", powerRequirement: 100, difficulty: "Facile", targetEnemyId: 'HARPIE', statMultiplier: 1.7, xpReward: 800, reward: { marques_de_chasse: 2, fragments: 3 } },

    // --- Primes Moyennes ---
    { id: 'BM01', nameKey: "bounties.bm01.name", powerRequirement: 150, difficulty: "Moyen", targetEnemyId: 'LOUP_AFFAME', statMultiplier: 2.5, xpReward: 1200, reward: { marques_de_chasse: 3, eclats_instables: 20 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BM02', nameKey: "bounties.bm02.name", powerRequirement: 200, difficulty: "Moyen", targetEnemyId: 'GOLEM_PIERRE', statMultiplier: 2.0, xpReward: 1800, reward: { marques_de_chasse: 4, 'coeur_de_golem': 1, eclats_instables: 18 } },
    { id: 'BM03', nameKey: "bounties.bm03.name", powerRequirement: 220, difficulty: "Moyen", targetEnemyId: 'MOMIE_GARDIENNE', statMultiplier: 1.9, xpReward: 2200, reward: { marques_de_chasse: 4 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BM04', nameKey: "bounties.bm04.name", powerRequirement: 250, difficulty: "Moyen", targetEnemyId: 'GRIFFON', statMultiplier: 1.8, xpReward: 2800, reward: { marques_de_chasse: 5, 'plume_de_griffon': 1 } },
    { id: 'BM05', nameKey: "bounties.bm05.name", powerRequirement: 280, difficulty: "Moyen", targetEnemyId: 'MINOTAURE', statMultiplier: 2.0, xpReward: 3200, reward: { marques_de_chasse: 5, fragments: 10 } },
    { id: 'BM06', nameKey: "bounties.bm06.name", powerRequirement: 180, difficulty: "Moyen", targetEnemyId: 'NECROMANCIEN_APPRENTI', statMultiplier: 2.2, xpReward: 1500, reward: { marques_de_chasse: 3, tissu: 500 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BM07', nameKey: "bounties.bm07.name", powerRequirement: 160, difficulty: "Moyen", targetEnemyId: 'SCORPION_DES_SABLES', statMultiplier: 2, xpReward: 1300, reward: { marques_de_chasse: 3, 'chitine_renforcee': 2 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BM08', nameKey: "bounties.bm08.name", powerRequirement: 240, difficulty: "Moyen", targetEnemyId: 'ORC_BERSERKER', statMultiplier: 2.8, xpReward: 2500, reward: { marques_de_chasse: 4, 'totem_orc': 2 } },
    { id: 'BM09', nameKey: "bounties.bm09.name", powerRequirement: 260, difficulty: "Moyen", targetEnemyId: 'ELEMENTAIRE_EAU', statMultiplier: 2.1, xpReward: 2900, reward: { marques_de_chasse: 5, fragments: 15 } },
    { id: 'BM10', nameKey: "bounties.bm10.name", powerRequirement: 300, difficulty: "Moyen", targetEnemyId: 'GARDE_AUTOMATE', statMultiplier: 1.9, xpReward: 3300, reward: { marques_de_chasse: 6, metal: 700 } },

    // --- Primes Difficiles ---
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BD01', nameKey: "bounties.bd01.name", powerRequirement: 400, difficulty: "Difficile", targetEnemyId: 'MAITRE_DE_L_OMBRE', statMultiplier: 1.7, xpReward: 3500, reward: { marques_de_chasse: 7, 'essence_spectrale': 2, eclats_instables: 50 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BD02', nameKey: "bounties.bd02.name", powerRequirement: 450, difficulty: "Difficile", targetEnemyId: 'BASILIC', statMultiplier: 2.0, xpReward: 4200, reward: { marques_de_chasse: 8, 'sang_de_basilic': 1 } },
    { id: 'BD03', nameKey: "bounties.bd03.name", powerRequirement: 500, difficulty: "Difficile", targetEnemyId: 'DJINN', statMultiplier: 1.8, xpReward: 4800, reward: { marques_de_chasse: 9, fragments: 50, eclats_instables: 70 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BD04', nameKey: "bounties.bd04.name", powerRequirement: 600, difficulty: "Difficile", targetEnemyId: 'PROFOND_CHAMPION', statMultiplier: 2.2, xpReward: 5500, reward: { marques_de_chasse: 10, 'ecaille_de_profond': 2 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BD05', nameKey: "bounties.bd05.name", powerRequirement: 700, difficulty: "Difficile", targetEnemyId: 'CHIMERE', statMultiplier: 2.0, xpReward: 6000, reward: { marques_de_chasse: 12, 'oeil_de_chimere': 1 } },
    { id: 'BD06', nameKey: "bounties.bd06.name", powerRequirement: 420, difficulty: "Difficile", targetEnemyId: 'HYDRE_DES_MARAIS', statMultiplier: 1.8, xpReward: 3800, reward: { marques_de_chasse: 7 } },
    { id: 'BD07', nameKey: "bounties.bd07.name", powerRequirement: 480, difficulty: "Difficile", targetEnemyId: 'VER_DES_SABLES', statMultiplier: 2.1, xpReward: 4500, reward: { marques_de_chasse: 8, metal: 1000 } },
    { id: 'BD08', nameKey: "bounties.bd08.name", powerRequirement: 550, difficulty: "Difficile", targetEnemyId: 'CHEVALIER_ETERNEL', statMultiplier: 1.6, xpReward: 5100, reward: { marques_de_chasse: 9, fragments: 60 } },
    { id: 'BD09', nameKey: "bounties.bd09.name", powerRequirement: 650, difficulty: "Difficile", targetEnemyId: 'LE_COLLECTEUR', statMultiplier: 1.9, xpReward: 5800, reward: { marques_de_chasse: 11 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BD10', nameKey: "bounties.bd10.name", powerRequirement: 800, difficulty: "Difficile", targetEnemyId: 'FORGERON_DEMON', statMultiplier: 1.5, xpReward: 6500, reward: { marques_de_chasse: 13, "fragment_d_ame_de_demon": 1 } },

    // --- Primes d'Élite ---
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BE01', nameKey: "bounties.be01.name", powerRequirement: 1000, difficulty: "Élite", targetEnemyId: 'GENERAL_DEMON', statMultiplier: 1.5, xpReward: 8000, reward: { marques_de_chasse: 15, "fragment_d_ame_de_demon": 2, eclats_instables: 300 } },
    { id: 'BE02', nameKey: "bounties.be02.name", powerRequirement: 1200, difficulty: "Élite", targetEnemyId: 'ARCHIMAGE_DEMENT', statMultiplier: 1.6, xpReward: 10000, reward: { marques_de_chasse: 18, fragments: 100, eclats_instables: 250 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BE03', nameKey: "bounties.be03.name", powerRequirement: 1500, difficulty: "Élite", targetEnemyId: 'DRAGON_ROUGE_ANCIEN', statMultiplier: 1.8, xpReward: 15000, reward: { marques_de_chasse: 25, 'coeur_de_dragon_ancien': 1 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BE04', nameKey: "bounties.be04.name", powerRequirement: 1100, difficulty: "Élite", targetEnemyId: 'ROI_SINGE_ESPRIT', statMultiplier: 1.7, xpReward: 8500, reward: { marques_de_chasse: 16, 'essence_spectrale': 5 } },
    { id: 'BE05', nameKey: "bounties.be05.name", powerRequirement: 1800, difficulty: "Élite", targetEnemyId: 'TALOS_REFORGE', statMultiplier: 1.4, xpReward: 18000, reward: { marques_de_chasse: 30, metal: 2500 } },
    { id: 'BE06', nameKey: "bounties.be06.name", powerRequirement: 1300, difficulty: "Élite", targetEnemyId: 'SHOGGOTH', statMultiplier: 1.6, xpReward: 9000, reward: { marques_de_chasse: 17, fragments: 120 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BE07', nameKey: "bounties.be07.name", powerRequirement: 1400, difficulty: "Élite", targetEnemyId: 'ARCHANGE', statMultiplier: 1.5, xpReward: 12000, reward: { marques_de_chasse: 20, 'larme_d_archange': 1 } },
    // Mon commentaire : J'unifie la clé ici.
    { id: 'BE08', nameKey: "bounties.be08.name", powerRequirement: 2200, difficulty: "Élite", targetEnemyId: 'HORREUR_DIMENSIONNELLE', statMultiplier: 1.3, xpReward: 22000, reward: { marques_de_chasse: 40, 'poussiere_de_vide': 1 } },
    { id: 'BE09', nameKey: "bounties.be09.name", powerRequirement: 1050, difficulty: "Élite", targetEnemyId: 'ROI_BARBARE', statMultiplier: 1.8, xpReward: 8200, reward: { marques_de_chasse: 15, bois: 1500 } },
    { id: 'BE10', nameKey: "bounties.be10.name", powerRequirement: 2500, difficulty: "Élite", targetEnemyId: 'OUROBOROS', statMultiplier: 1.2, xpReward: 25000, reward: { marques_de_chasse: 50, fragments: 150 } }
];


// ============================================================================
// ============================================================================
// SECTION: ÉVÉNEMENTS ALÉATOIRES D'EXPÉDITION
// ============================================================================
// ============================================================================

const EXPEDITION_RANDOM_EVENTS_DB = {
    'SAC_PERDU': {
        descriptionKey: "expeditions.random_events.sac_perdu.description",
        choices: [
            { textKey: "expeditions.random_events.sac_perdu.choice1_text", test: null, success: { textKey: "expeditions.random_events.sac_perdu.choice1_success_text", effects: [{type: 'resource_gain', kind: 'bois', amount: 10}, {type: 'resource_gain', kind: 'metal', amount: 10}, {type: 'resource_gain', kind: 'tissu', amount: 10}], nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.sac_perdu.choice2_text", test: null, success: { textKey: "expeditions.random_events.sac_perdu.choice2_success_text", effects: [{type: 'xp_gain', amount: 50}], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'MARCHAND_MYSTERE': {
        descriptionKey: "expeditions.random_events.marchand_mystere.description",
        choices: [
            {
                textKey: "expeditions.random_events.marchand_mystere.choice1_text",
                test: { stat: 'resources.bois', value: 100, stat2: 'resources.metal', value2: 100, stat3: 'resources.tissu', value3: 100 },
                success: { textKey: "expeditions.random_events.marchand_mystere.choice1_success_text", effects: [{type: 'resource_loss', kind: 'bois', amount: 100}, {type: 'resource_loss', kind: 'metal', amount: 100}, {type: 'resource_loss', kind: 'tissu', amount: 100}, {type: 'fragments_gain', amount: 2}], nextEvent: 'RESUME_EXPEDITION' },
                failure: { textKey: "expeditions.random_events.marchand_mystere.choice1_failure_text", effects: [], nextEvent: 'RESUME_EXPEDITION' }
            },
            { textKey: "expeditions.random_events.marchand_mystere.choice2_text", test: null, success: { textKey: "expeditions.random_events.marchand_mystere.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'TROUVER_COFFRE': {
        descriptionKey: "expeditions.random_events.trouver_coffre.description",
        choices: [
            { textKey: "expeditions.random_events.trouver_coffre.choice1_text", test: null, success: { textKey: "expeditions.random_events.trouver_coffre.choice1_success_text", effects: [{type: 'resource_gain', kind: 'bois', amount: 25}, {type: 'resource_gain', kind: 'tissu', amount: 15}], waitTime: 10, nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.trouver_coffre.choice2_text", test: null, success: { textKey: "expeditions.random_events.trouver_coffre.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'FILON_METAL': {
        descriptionKey: "expeditions.random_events.filon_metal.description",
        choices: [
            { textKey: "expeditions.random_events.filon_metal.choice1_text", test: { stat: 'Force', value: 5 }, success: { textKey: "expeditions.random_events.filon_metal.choice1_success_text", effects: [{type: 'resource_gain', kind: 'metal', amount: 30}], waitTime: 15, nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.filon_metal.choice1_failure_text", effects: [{type: 'hp_loss_flat', value: 5}], waitTime: 15, nextEvent: 'RESUME_EXPEDITION' }},
            { textKey: "expeditions.random_events.filon_metal.choice2_text", test: null, success: { textKey: "expeditions.random_events.filon_metal.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'PILLARDS': {
        descriptionKey: "expeditions.random_events.pillards.description",
        choices: [
            { textKey: "expeditions.random_events.pillards.choice1_text", test: { stat: 'resources.metal', value: 40 }, success: { textKey: "expeditions.random_events.pillards.choice1_success_text", effects: [{type: 'resource_loss', kind: 'metal', amount: 40}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.pillards.choice1_failure_text", effects: [{type: 'resource_loss', kind: 'bois', amount: 20}, {type: 'hp_loss_flat', value: 10}], nextEvent: 'RESUME_EXPEDITION' }},
            { textKey: "expeditions.random_events.pillards.choice2_text", test: { stat: 'Agilité', value: 10 }, success: { textKey: "expeditions.random_events.pillards.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.pillards.choice2_failure_text", effects: [{type: 'resource_loss', kind: 'tissu', amount: 15}, {type: 'hp_loss_flat', value: 20}], nextEvent: 'RESUME_EXPEDITION' }}
        ]
    },
    'SOURCE_CURATIVE': {
        descriptionKey: "expeditions.random_events.source_curative.description",
        choices: [
            { textKey: "expeditions.random_events.source_curative.choice1_text", test: null, success: { textKey: "expeditions.random_events.source_curative.choice1_success_text", effects: [{type: 'hp_gain_percent', value: 25}], nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.source_curative.choice2_text", test: null, success: { textKey: "expeditions.random_events.source_curative.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'CHAMPIGNON_ETRANGE': {
        descriptionKey: "expeditions.random_events.champignon_etrange.description",
        choices: [
            { textKey: "expeditions.random_events.champignon_etrange.choice1_text", test: { stat: 'Chance', value: 15 }, success: { textKey: "expeditions.random_events.champignon_etrange.choice1_success_text", effects: [{type: 'hp_gain_flat', value: 50}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.champignon_etrange.choice1_failure_text", effects: [{type: 'hp_loss_percent', value: 20}], nextEvent: 'RESUME_EXPEDITION' }},
            { textKey: "expeditions.random_events.champignon_etrange.choice2_text", test: null, success: { textKey: "expeditions.random_events.champignon_etrange.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'ANIMAL_BLESSE': {
        descriptionKey: "expeditions.random_events.animal_blesse.description",
        choices: [
            { textKey: "expeditions.random_events.animal_blesse.choice1_text", test: { stat: 'Intelligence', value: 12 }, success: { textKey: "expeditions.random_events.animal_blesse.choice1_success_text", effects: [{type: 'xp_gain', amount: 75}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.animal_blesse.choice1_failure_text", effects: [{type: 'hp_loss_flat', value: 15}], nextEvent: 'RESUME_EXPEDITION' }},
            { textKey: "expeditions.random_events.animal_blesse.choice2_text", test: null, success: { textKey: "expeditions.random_events.animal_blesse.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'STATUE_ANTIQUE': {
        descriptionKey: "expeditions.random_events.statue_antique.description",
        choices: [
            { textKey: "expeditions.random_events.statue_antique.choice1_text", test: { stat: 'resources.tissu', value: 20 }, success: { textKey: "expeditions.random_events.statue_antique.choice1_success_text", effects: [{type: 'resource_loss', kind: 'tissu', amount: 20}, {type: 'temp_buff', stat: 'Défense', value: 3}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.statue_antique.choice1_failure_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.statue_antique.choice2_text", test: { stat: 'Chance', value: 10 }, success: { textKey: "expeditions.random_events.statue_antique.choice2_success_text", effects: [{type: 'temp_buff', stat: 'Chance', value: 5}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.statue_antique.choice2_failure_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'METEO_CAPRICIEUSE': {
        descriptionKey: "expeditions.random_events.meteo_capricieuse.description",
        choices: [
            { textKey: "expeditions.random_events.meteo_capricieuse.choice1_text", test: null, success: { textKey: "expeditions.random_events.meteo_capricieuse.choice1_success_text", effects: [], waitTime: 10, nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.meteo_capricieuse.choice2_text", test: { stat: 'Vie', value: 15 }, success: { textKey: "expeditions.random_events.meteo_capricieuse.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.meteo_capricieuse.choice2_failure_text", effects: [{type: 'hp_loss_percent', value: 15}], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'AVENTURIER_PERDU': {
        descriptionKey: "expeditions.random_events.aventurier_perdu.description",
        choices: [
            { textKey: "expeditions.random_events.aventurier_perdu.choice1_text", test: { stat: 'resources.bois', value: 15 }, success: { textKey: "expeditions.random_events.aventurier_perdu.choice1_success_text", effects: [{type: 'resource_loss', kind: 'bois', amount: 15}, {type: 'xp_gain', amount: 40}, {type: 'fragments_gain', amount: 1}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.aventurier_perdu.choice1_failure_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.aventurier_perdu.choice2_text", test: null, success: { textKey: "expeditions.random_events.aventurier_perdu.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'REVE_ETRANGE': {
        descriptionKey: "expeditions.random_events.reve_etrange.description",
        choices: [
            { textKey: "expeditions.random_events.reve_etrange.choice1_text", test: { stat: 'Intelligence', value: 18 }, success: { textKey: "expeditions.random_events.reve_etrange.choice1_success_text", effects: [{type: 'fragments_gain', amount: 2}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.reve_etrange.choice1_failure_text", effects: [], waitTime: 8, nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.reve_etrange.choice2_text", test: null, success: { textKey: "expeditions.random_events.reve_etrange.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'OBSTACLE_NATUREL': {
        descriptionKey: "expeditions.random_events.obstacle_naturel.description",
        choices: [
            { textKey: "expeditions.random_events.obstacle_naturel.choice1_text", test: { stat: 'Force', value: 20 }, success: { textKey: "expeditions.random_events.obstacle_naturel.choice1_success_text", effects: [{type: 'resource_gain', kind: 'bois', amount: 40}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.obstacle_naturel.choice1_failure_text", effects: [{type: 'hp_loss_flat', value: 10}], nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.obstacle_naturel.choice2_text", test: { stat: 'Agilité', value: 15 }, success: { textKey: "expeditions.random_events.obstacle_naturel.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.obstacle_naturel.choice2_failure_text", effects: [{type: 'hp_loss_flat', value: 5}], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'POUPEE_ABANDONNEE': {
        descriptionKey: "expeditions.random_events.poupee_abandonnee.description",
        choices: [
            { textKey: "expeditions.random_events.poupee_abandonnee.choice1_text", test: { stat: 'Chance', value: 12 }, success: { textKey: "expeditions.random_events.poupee_abandonnee.choice1_success_text", effects: [{type: 'fragments_gain', amount: 1}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.poupee_abandonnee.choice1_failure_text", effects: [{type: 'hp_loss_percent', value: 10}], nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.poupee_abandonnee.choice2_text", test: null, success: { textKey: "expeditions.random_events.poupee_abandonnee.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'ECHO_MYSTERIEUX': {
        descriptionKey: "expeditions.random_events.echo_mysterieux.description",
        choices: [
            { textKey: "expeditions.random_events.echo_mysterieux.choice1_text", test: { stat: 'Défense', value: 10 }, success: { textKey: "expeditions.random_events.echo_mysterieux.choice1_success_text", effects: [{type: 'xp_gain', amount: 60}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.echo_mysterieux.choice1_failure_text", effects: [{type: 'hp_loss_flat', value: 25}], nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.echo_mysterieux.choice2_text", test: null, success: { textKey: "expeditions.random_events.echo_mysterieux.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'CARTE_AU_TRESOR_DECHIREE': {
        descriptionKey: "expeditions.random_events.carte_au_tresor_dechiree.description",
        choices: [
            { textKey: "expeditions.random_events.carte_au_tresor_dechiree.choice1_text", test: { stat: 'Intelligence', value: 15 }, success: { textKey: "expeditions.random_events.carte_au_tresor_dechiree.choice1_success_text", effects: [{type: 'resource_gain', kind: 'metal', amount: 25}, {type: 'resource_gain', kind: 'tissu', amount: 25}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.carte_au_tresor_dechiree.choice1_failure_text", effects: [], waitTime: 5, nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.carte_au_tresor_dechiree.choice2_text", test: null, success: { textKey: "expeditions.random_events.carte_au_tresor_dechiree.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    },
    'CONSTELLATION_ETRANGE': {
        descriptionKey: "expeditions.random_events.constellation_etrange.description",
        choices: [
            { textKey: "expeditions.random_events.constellation_etrange.choice1_text", test: { stat: 'Intelligence', value: 20 }, success: { textKey: "expeditions.random_events.constellation_etrange.choice1_success_text", effects: [{type: 'xp_gain', amount: 100}], nextEvent: 'RESUME_EXPEDITION' }, failure: { textKey: "expeditions.random_events.constellation_etrange.choice1_failure_text", effects: [{type: 'hp_loss_flat', value: 10}], nextEvent: 'RESUME_EXPEDITION' } },
            { textKey: "expeditions.random_events.constellation_etrange.choice2_text", test: null, success: { textKey: "expeditions.random_events.constellation_etrange.choice2_success_text", effects: [], nextEvent: 'RESUME_EXPEDITION' } }
        ]
    }
};


// ============================================================================
// ============================================================================
// SECTION: EXPÉDITIONS (STARTERS & EVENTS)
// ============================================================================
// ============================================================================

// ----------------------------------------------------------------------------
// SOUS-SECTION: STARTERS (EXPEDITION_STARTERS_DB)
// ----------------------------------------------------------------------------

const EXPEDITION_STARTERS_DB = {

    // ** COMMUNES (16) **
    'aventureRiviere': { titleKey: "expeditions.starters.aventureRiviere.title", flavorTextKey: "expeditions.starters.aventureRiviere.flavorText", recommendedStats: "Force, Intelligence", startEventId: 'RIVIERE_DEBUT', rarity: 'common', itemDropChance: 0.16, potentialRewards: { xp: "~150", resources: [{ kind: 'bois', amount: 25 }, { kind: 'metal', amount: 15 }] } },
    'aventureForet': { titleKey: "expeditions.starters.aventureForet.title", flavorTextKey: "expeditions.starters.aventureForet.flavorText", recommendedStats: "Agilité, Chance", startEventId: 'FORET_DEBUT', rarity: 'common', itemDropChance: 0.16, potentialRewards: { xp: "~200", resources: [{ kind: 'bois', amount: 50 }, { kind: 'tissu', amount: 20 }] }, seedDrops: [{ seedId: 'HERBE_ROBUSTE', chance: 0.05 }]},
    'enqueteVillage': { titleKey: "expeditions.starters.enqueteVillage.title", flavorTextKey: "expeditions.starters.enqueteVillage.flavorText", recommendedStats: "Intelligence, Chance", startEventId: 'ENQUETE_DEBUT', rarity: 'common', itemDropChance: 0.13, potentialRewards: { xp: "~120", resources: [{ kind: 'tissu', amount: 30 }] } },
    'livraisonUrgence': { titleKey: "expeditions.starters.livraisonUrgence.title", flavorTextKey: "expeditions.starters.livraisonUrgence.flavorText", recommendedStats: "Agilité", startEventId: 'LIVRAISON_DEBUT', rarity: 'common', itemDropChance: 0.13, potentialRewards: { xp: "~180", resources: [{ kind: 'bois', amount: 40 }] } },
    'menaceRats': { titleKey: "expeditions.starters.menaceRats.title", flavorTextKey: "expeditions.starters.menaceRats.flavorText", recommendedStats: "Force", startEventId: 'RATS_DEBUT', rarity: 'common', itemDropChance: 0.17, potentialRewards: { xp: "~160", resources: [{ kind: 'tissu', amount: 40 }] } },
    'medaillonPerdu': { titleKey: "expeditions.starters.medaillonPerdu.title", flavorTextKey: "expeditions.starters.medaillonPerdu.flavorText", recommendedStats: "Chance, Intelligence", startEventId: 'MEDAILLON_DEBUT', rarity: 'common', itemDropChance: 0.14, potentialRewards: { xp: "~130", resources: [{ kind: 'bois', amount: 30 }] } },
    'herbesGuerison': { titleKey: "expeditions.starters.herbesGuerison.title", flavorTextKey: "expeditions.starters.herbesGuerison.flavorText", recommendedStats: "Intelligence", startEventId: 'HERBES_DEBUT', rarity: 'common', itemDropChance: 0.14, potentialRewards: { xp: "~110", resources: [{ kind: 'tissu', amount: 25 }] } },
    'problemeGobelins': { titleKey: "expeditions.starters.problemeGobelins.title", flavorTextKey: "expeditions.starters.problemeGobelins.flavorText", recommendedStats: "Force", startEventId: 'GOBELINS_DEBUT', rarity: 'common', itemDropChance: 0.17, potentialRewards: { xp: "~140", resources: [{ kind: 'bois', amount: 30 }] } },
    'nettoyageCave': { titleKey: "expeditions.starters.nettoyageCave.title", flavorTextKey: "expeditions.starters.nettoyageCave.flavorText", recommendedStats: "Agilité", startEventId: 'CAVE_DEBUT', rarity: 'common', itemDropChance: 0.17, potentialRewards: { xp: "~150", resources: [{ kind: 'tissu', amount: 35 }] } },
    'lettrePerdue': { titleKey: "expeditions.starters.lettrePerdue.title", flavorTextKey: "expeditions.starters.lettrePerdue.flavorText", recommendedStats: "Chance", startEventId: 'LETTRE_DEBUT', rarity: 'common', itemDropChance: 0.13, potentialRewards: { xp: "~100", resources: [] } },
    'reparationCloture': { titleKey: "expeditions.starters.reparationCloture.title", flavorTextKey: "expeditions.starters.reparationCloture.flavorText", recommendedStats: "Force, Défense", startEventId: 'CLOTURE_DEBUT', rarity: 'common', itemDropChance: 0.16, potentialRewards: { xp: "~130", resources: [{ kind: 'bois', amount: 45 }] } },
    'leChatPerdu': { titleKey: "expeditions.starters.leChatPerdu.title", flavorTextKey: "expeditions.starters.leChatPerdu.flavorText", recommendedStats: "Agilité, Chance", startEventId: 'CHAT_DEBUT', rarity: 'common', itemDropChance: 0.13, potentialRewards: { xp: "~120", resources: [{ kind: 'tissu', amount: 40 }] } },
    'bruitCimetiere': { titleKey: "expeditions.starters.bruitCimetiere.title", flavorTextKey: "expeditions.starters.bruitCimetiere.flavorText", recommendedStats: "Vie, Intelligence", startEventId: 'CIMETIERE_DEBUT', rarity: 'common', itemDropChance: 0.17, potentialRewards: { xp: "~170", resources: [{ kind: 'metal', amount: 20 }] } },
    'livreEnRetard': { titleKey: "expeditions.starters.livreEnRetard.title", flavorTextKey: "expeditions.starters.livreEnRetard.flavorText", recommendedStats: "Intelligence", startEventId: 'LIVRE_DEBUT', rarity: 'common', itemDropChance: 0.13, potentialRewards: { xp: "~115", resources: [{ kind: 'tissu', amount: 20 }] } },
    'lePuitsEmpoisonne': { titleKey: "expeditions.starters.lePuitsEmpoisonne.title", flavorTextKey: "expeditions.starters.lePuitsEmpoisonne.flavorText", recommendedStats: "Intelligence, Vie", startEventId: 'PUITS_DEBUT', rarity: 'common', itemDropChance: 0.16, potentialRewards: { xp: "~190", resources: [{ kind: 'metal', amount: 25 }] } },
    'laPecheMiraculeuse': { titleKey: "expeditions.starters.laPecheMiraculeuse.title", flavorTextKey: "expeditions.starters.laPecheMiraculeuse.flavorText", recommendedStats: "Force, Chance", startEventId: 'PECHE_DEBUT', rarity: 'common', itemDropChance: 0.15, potentialRewards: { xp: "~160", resources: [{ kind: 'bois', amount: 35 }] } },

    // ** PEU COMMUNES (16) **
    'aventureRuines': { titleKey: "expeditions.starters.aventureRuines.title", flavorTextKey: "expeditions.starters.aventureRuines.flavorText", recommendedStats: "Chance, Défense", startEventId: 'RUINES_DEBUT', rarity: 'uncommon', itemDropChance: 0.105, potentialRewards: { xp: "~350", resources: [{ kind: 'metal', amount: 70 }] } },
    'escorteMarchand': { titleKey: "expeditions.starters.escorteMarchand.title", flavorTextKey: "expeditions.starters.escorteMarchand.flavorText", recommendedStats: "Force, Défense", startEventId: 'ESCORTE_DEBUT', rarity: 'uncommon', itemDropChance: 0.11, potentialRewards: { xp: "~400", resources: [{ kind: 'metal', amount: 50 }, { kind: 'tissu', amount: 50 }] } },
    'aventureMarais': { titleKey: "expeditions.starters.aventureMarais.title", flavorTextKey: "expeditions.starters.aventureMarais.flavorText", recommendedStats: "Intelligence, Vie", startEventId: 'MARAIS_DEBUT', rarity: 'uncommon', itemDropChance: 0.085, potentialRewards: { xp: "~300", resources: [{ kind: 'tissu', amount: 80 }] } },
    'problemeMine': { titleKey: "expeditions.starters.problemeMine.title", flavorTextKey: "expeditions.starters.problemeMine.flavorText", recommendedStats: "Force", startEventId: 'MINE_DEBUT', rarity: 'uncommon', itemDropChance: 0.12, potentialRewards: { xp: "~500", resources: [{ kind: 'metal', amount: 120 }] } },
    'boisMurmurants': { titleKey: "expeditions.starters.boisMurmurants.title", flavorTextKey: "expeditions.starters.boisMurmurants.flavorText", recommendedStats: "Intelligence, Défense", startEventId: 'BOIS_DEBUT', rarity: 'uncommon', itemDropChance: 0.115, potentialRewards: { xp: "~450", resources: [{ kind: 'bois', amount: 100 }] } },
    'pontSabote': { titleKey: "expeditions.starters.pontSabote.title", flavorTextKey: "expeditions.starters.pontSabote.flavorText", recommendedStats: "Force, Intelligence", startEventId: 'PONT_DEBUT', rarity: 'uncommon', itemDropChance: 0.10, potentialRewards: { xp: "~600", resources: [{ kind: 'metal', amount: 80 }, { kind: 'bois', amount: 80 }] } },
    'leContratDHerboriste': { titleKey: "expeditions.starters.leContratDHerboriste.title", flavorTextKey: "expeditions.starters.leContratDHerboriste.flavorText", recommendedStats: "Agilité, Chance", startEventId: 'CONTRAT_HERBO_DEBUT', rarity: 'uncommon', itemDropChance: 0.108, potentialRewards: { xp: "~400", resources: [{ kind: 'tissu', amount: 100 }] }, seedDrops: [{ seedId: 'HERBE_ROBUSTE', chance: 0.10 }] },
    'laCrypteAgitee': { titleKey: "expeditions.starters.laCrypteAgitee.title", flavorTextKey: "expeditions.starters.laCrypteAgitee.flavorText", recommendedStats: "Vie, Force", startEventId: 'CRYPTE_AGITEE_DEBUT', rarity: 'uncommon', itemDropChance: 0.115, potentialRewards: { xp: "~550", resources: [{ kind: 'metal', amount: 90 }] } },
    'laTourDeGardeAbandonnee': { titleKey: "expeditions.starters.laTourDeGardeAbandonnee.title", flavorTextKey: "expeditions.starters.laTourDeGardeAbandonnee.flavorText", recommendedStats: "Force, Défense", startEventId: 'TOUR_GARDE_DEBUT', rarity: 'uncommon', itemDropChance: 0.11, potentialRewards: { xp: "~480", resources: [{ kind: 'bois', amount: 120 }] } },
    'leGeyserInstable': { titleKey: "expeditions.starters.leGeyserInstable.title", flavorTextKey: "expeditions.starters.leGeyserInstable.flavorText", recommendedStats: "Intelligence, Défense", startEventId: 'GEYSER_DEBUT', rarity: 'uncommon', itemDropChance: 0.09, potentialRewards: { xp: "~420", resources: [{ kind: 'metal', amount: 110 }] } },
    'leTrolSousLePont': { titleKey: "expeditions.starters.leTrolSousLePont.title", flavorTextKey: "expeditions.starters.leTrolSousLePont.flavorText", recommendedStats: "Force, Intelligence", startEventId: 'TROLL_PONT_DEBUT', rarity: 'uncommon', itemDropChance: 0.118, potentialRewards: { xp: "~600", resources: [{ kind: 'bois', amount: 80 }, { kind: 'metal', amount: 80 }] } },
    'lesCultistesDansLesBois': { titleKey: "expeditions.starters.lesCultistesDansLesBois.title", flavorTextKey: "expeditions.starters.lesCultistesDansLesBois.flavorText", recommendedStats: "Agilité, Intelligence", startEventId: 'CULTISTES_BOIS_DEBUT', rarity: 'uncommon', itemDropChance: 0.12, potentialRewards: { xp: "~580", resources: [{ kind: 'tissu', amount: 150 }] } },
    'laFolieDuCollectionneur': { titleKey: "expeditions.starters.laFolieDuCollectionneur.title", flavorTextKey: "expeditions.starters.laFolieDuCollectionneur.flavorText", recommendedStats: "Agilité, Chance", startEventId: 'COLLECTIONNEUR_DEBUT', rarity: 'uncommon', itemDropChance: 0.08, potentialRewards: { xp: "~380", resources: [{ kind: 'tissu', amount: 200 }] } },
    'leSilenceDeLaFerme': { titleKey: "expeditions.starters.leSilenceDeLaFerme.title", flavorTextKey: "expeditions.starters.leSilenceDeLaFerme.flavorText", recommendedStats: "Vie, Force", startEventId: 'FERME_SILENCE_DEBUT', rarity: 'uncommon', itemDropChance: 0.105, potentialRewards: { xp: "~450", resources: [{ kind: 'bois', amount: 150 }] } },
    'lePuitsDesSouhaits': { titleKey: "expeditions.starters.lePuitsDesSouhaits.title", flavorTextKey: "expeditions.starters.lePuitsDesSouhaits.flavorText", recommendedStats: "Chance, Intelligence", startEventId: 'PUITS_SOUHAITS_DEBUT', rarity: 'uncommon', itemDropChance: 0.112, potentialRewards: { xp: "~500", resources: [{ kind: 'metal', amount: 100 }] } },
    'laBetedesPlaines': { titleKey: "expeditions.starters.laBetedesPlaines.title", flavorTextKey: "expeditions.starters.laBetedesPlaines.flavorText", recommendedStats: "Agilité, Force", startEventId: 'BETE_PLAINES_DEBUT', rarity: 'uncommon', itemDropChance: 0.11, potentialRewards: { xp: "~520", resources: [{ kind: 'tissu', amount: 130 }] } },

    // ** RARES (16) **
    'chassePrimeBandit': { titleKey: "expeditions.starters.chassePrimeBandit.title", flavorTextKey: "expeditions.starters.chassePrimeBandit.flavorText", recommendedStats: "Force, Agilité", startEventId: 'PRIME_DEBUT', rarity: 'rare', itemDropChance: 0.065, potentialRewards: { xp: "~1200", resources: [{ kind: 'metal', amount: 200 }, { kind: 'bois', amount: 150 }] } },
    'aventureMontagne': { titleKey: "expeditions.starters.aventureMontagne.title", flavorTextKey: "expeditions.starters.aventureMontagne.flavorText", recommendedStats: "Défense, Force", startEventId: 'MONTAGNE_DEBUT', rarity: 'rare', itemDropChance: 0.068, potentialRewards: { xp: "~1500", resources: [{ kind: 'metal', amount: 300 }] } },
    'artefactMaudit': { titleKey: "expeditions.starters.artefactMaudit.title", flavorTextKey: "expeditions.starters.artefactMaudit.flavorText", recommendedStats: "Intelligence, Chance", startEventId: 'CRYPTE_DEBUT', rarity: 'rare', itemDropChance: 0.07, potentialRewards: { xp: "~1000", resources: [{ kind: 'tissu', amount: 250 }] } },
    'caravaneDisparue': { titleKey: "expeditions.starters.caravaneDisparue.title", flavorTextKey: "expeditions.starters.caravaneDisparue.flavorText", recommendedStats: "Intelligence, Agilité", startEventId: 'CARAVANE_DEBUT', rarity: 'rare', itemDropChance: 0.062, potentialRewards: { xp: "~1800", resources: [{ kind: 'tissu', amount: 180 }, { kind: 'metal', amount: 180 }] } },
    'templeEnglouti': { titleKey: "expeditions.starters.templeEnglouti.title", flavorTextKey: "expeditions.starters.templeEnglouti.flavorText", recommendedStats: "Agilité, Défense", startEventId: 'TEMPLE_DEBUT', rarity: 'rare', itemDropChance: 0.068, potentialRewards: { xp: "~1600", resources: [{ kind: 'metal', amount: 250 }] } },
    'tournoiArene': { titleKey: "expeditions.starters.tournoiArene.title", flavorTextKey: "expeditions.starters.tournoiArene.flavorText", recommendedStats: "Toutes", startEventId: 'ARENE_DEBUT', rarity: 'rare', itemDropChance: 0.05, potentialRewards: { xp: "~2000", resources: [{ kind: 'tissu', amount: 300 }] } },
    'laTaniereDuBasilic': { titleKey: "expeditions.starters.laTaniereDuBasilic.title", flavorTextKey: "expeditions.starters.laTaniereDuBasilic.flavorText", recommendedStats: "Défense, Intelligence", startEventId: 'BASILIC_DEBUT', rarity: 'rare', itemDropChance: 0.07, potentialRewards: { xp: "~1700", resources: [{ kind: 'metal', amount: 400 }] } },
    'leNavireFrequente': { titleKey: "expeditions.starters.leNavireFrequente.title", flavorTextKey: "expeditions.starters.leNavireFrequente.flavorText", recommendedStats: "Chance, Vie", startEventId: 'NAVIRE_FANTOME_DEBUT', rarity: 'rare', itemDropChance: 0.065, potentialRewards: { xp: "~1500", resources: [{ kind: 'bois', amount: 300 }] } },
    'leTournoiDuFauconDeFer': { titleKey: "expeditions.starters.leTournoiDuFauconDeFer.title", flavorTextKey: "expeditions.starters.leTournoiDuFauconDeFer.flavorText", recommendedStats: "Agilité, Chance", startEventId: 'TOURNOI_ARC_DEBUT', rarity: 'rare', itemDropChance: 0.052, potentialRewards: { xp: "~1300", resources: [{ kind: 'bois', amount: 250 }, { kind: 'tissu', amount: 150 }] } },
    'lesMinesDeCristal': { titleKey: "expeditions.starters.lesMinesDeCristal.title", flavorTextKey: "expeditions.starters.lesMinesDeCristal.flavorText", recommendedStats: "Force, Défense", startEventId: 'MINES_CRISTAL_DEBUT', rarity: 'rare', itemDropChance: 0.072, potentialRewards: { xp: "~1900", resources: [{ kind: 'metal', amount: 500 }] } },
    'leVolDuSiecle': { titleKey: "expeditions.starters.leVolDuSiecle.title", flavorTextKey: "expeditions.starters.leVolDuSiecle.flavorText", recommendedStats: "Agilité, Intelligence", startEventId: 'VOL_MUSEE_DEBUT', rarity: 'rare', itemDropChance: 0.05, potentialRewards: { xp: "~1400", resources: [{ kind: 'tissu', amount: 400 }] } },
    'laGuerreDesGuildes': { titleKey: "expeditions.starters.laGuerreDesGuildes.title", flavorTextKey: "expeditions.starters.laGuerreDesGuildes.flavorText", recommendedStats: "Toutes", startEventId: 'GUERRE_GUILDES_DEBUT', rarity: 'rare', itemDropChance: 0.055, potentialRewards: { xp: "~2200", resources: [{ kind: 'metal', amount: 300 }, { kind: 'tissu', amount: 300 }] } },
    'loasisPerdue': { titleKey: "expeditions.starters.loasisPerdue.title", flavorTextKey: "expeditions.starters.loasisPerdue.flavorText", recommendedStats: "Intelligence, Vie", startEventId: 'OASIS_DEBUT', rarity: 'rare', itemDropChance: 0.075, potentialRewards: { xp: "~1800", resources: [{ kind: 'fragments', amount: 10 }] } },
    'leRituelDeSang': { titleKey: "expeditions.starters.leRituelDeSang.title", flavorTextKey: "expeditions.starters.leRituelDeSang.flavorText", recommendedStats: "Force, Intelligence", startEventId: 'RITUEL_SANG_DEBUT', rarity: 'rare', itemDropChance: 0.068, potentialRewards: { xp: "~2000", resources: [{ kind: 'tissu', amount: 350 }] } },
    'laFievreDeLOr': { titleKey: "expeditions.starters.laFievreDeLOr.title", flavorTextKey: "expeditions.starters.laFievreDeLOr.flavorText", recommendedStats: "Chance, Force", startEventId: 'FIEVRE_OR_DEBUT', rarity: 'rare', itemDropChance: 0.065, potentialRewards: { xp: "~1600", resources: [{ kind: 'metal', amount: 450 }] } },
    'lesMurmuresSousLaVille': { titleKey: "expeditions.starters.lesMurmuresSousLaVille.title", flavorTextKey: "expeditions.starters.lesMurmuresSousLaVille.flavorText", recommendedStats: "Défense, Agilité", startEventId: 'EGOUTS_DEBUT', rarity: 'rare', itemDropChance: 0.06, potentialRewards: { xp: "~1750", resources: [{ kind: 'tissu', amount: 300 }] } },
      
    // ** ÉPIQUES (16) **
    'siegeGobelin': { titleKey: "expeditions.starters.siegeGobelin.title", flavorTextKey: "expeditions.starters.siegeGobelin.flavorText", recommendedStats: "Force, Défense", startEventId: 'SIEGE_DEBUT', rarity: 'epic', itemDropChance: 0.032, potentialRewards: { xp: "~4000", resources: [{ kind: 'metal', amount: 800 }] }, seedDrops: [{ seedId: 'HERBE_ROBUSTE', chance: 0.05 }] },
    'culteSecret': { titleKey: "expeditions.starters.culteSecret.title", flavorTextKey: "expeditions.starters.culteSecret.flavorText", recommendedStats: "Agilité, Intelligence", startEventId: 'CULTE_DEBUT', rarity: 'epic', itemDropChance: 0.028, potentialRewards: { xp: "~3500", resources: [{ kind: 'tissu', amount: 700 }] } },
    'coeurVolcan': { titleKey: "expeditions.starters.coeurVolcan.title", flavorTextKey: "expeditions.starters.coeurVolcan.flavorText", recommendedStats: "Vie, Défense", startEventId: 'VOLCAN_DEBUT', rarity: 'epic', itemDropChance: 0.035, potentialRewards: { xp: "~5000", resources: [{ kind: 'metal', amount: 1000 }] } },
    'bibliothequeOubliee': { titleKey: "expeditions.starters.bibliothequeOubliee.title", flavorTextKey: "expeditions.starters.bibliothequeOubliee.flavorText", recommendedStats: "Intelligence", startEventId: 'BIBLIO_DEBUT', rarity: 'epic', itemDropChance: 0.025, potentialRewards: { xp: "~6000", resources: [{ kind: 'tissu', amount: 1200 }] } },
    'gambitPirate': { titleKey: "expeditions.starters.gambitPirate.title", flavorTextKey: "expeditions.starters.gambitPirate.flavorText", recommendedStats: "Agilité, Chance", startEventId: 'PIRATE_DEBUT', rarity: 'epic', itemDropChance: 0.038, potentialRewards: { xp: "~5500", resources: [{ kind: 'bois', amount: 800 }, { kind: 'metal', amount: 400 }] } },
    'docteursPeste': { titleKey: "expeditions.starters.docteursPeste.title", flavorTextKey: "expeditions.starters.docteursPeste.flavorText", recommendedStats: "Intelligence, Vie", startEventId: 'PESTE_DEBUT', rarity: 'epic', itemDropChance: 0.02, potentialRewards: { xp: "~7000", resources: [{ kind: 'tissu', amount: 1200 }] } },
    'laCiteDesAutomates': { titleKey: "expeditions.starters.laCiteDesAutomates.title", flavorTextKey: "expeditions.starters.laCiteDesAutomates.flavorText", recommendedStats: "Défense, Intelligence", startEventId: 'CITE_AUTOMATES_DEBUT', rarity: 'epic', itemDropChance: 0.03, potentialRewards: { xp: "~5000", resources: [{ kind: 'metal', amount: 1500 }] } },
    'leLabyrintheDuMinotaure': { titleKey: "expeditions.starters.leLabyrintheDuMinotaure.title", flavorTextKey: "expeditions.starters.leLabyrintheDuMinotaure.flavorText", recommendedStats: "Force, Intelligence", startEventId: 'LABYRINTHE_DEBUT', rarity: 'epic', itemDropChance: 0.033, potentialRewards: { xp: "~4500", resources: [{ kind: 'bois', amount: 1000 }] } },
    'laCourDesMiracles': { titleKey: "expeditions.starters.laCourDesMiracles.title", flavorTextKey: "expeditions.starters.laCourDesMiracles.flavorText", recommendedStats: "Agilité, Chance", startEventId: 'COUR_MIRACLES_DEBUT', rarity: 'epic', itemDropChance: 0.026, potentialRewards: { xp: "~4000", resources: [{ kind: 'tissu', amount: 1000 }] } },
    'lileDeLaChimere': { titleKey: "expeditions.starters.lileDeLaChimere.title", flavorTextKey: "expeditions.starters.lileDeLaChimere.flavorText", recommendedStats: "Vie, Agilité", startEventId: 'ILE_CHIMERE_DEBUT', rarity: 'epic', itemDropChance: 0.036, potentialRewards: { xp: "~6000", resources: [{ kind: 'tissu', amount: 800 }, { kind: 'bois', amount: 800 }] } },
    'lePacteInfernal': { titleKey: "expeditions.starters.lePacteInfernal.title", flavorTextKey: "expeditions.starters.lePacteInfernal.flavorText", recommendedStats: "Intelligence, Défense", startEventId: 'PACTE_INFERNAL_DEBUT', rarity: 'epic', itemDropChance: 0.029, potentialRewards: { xp: "~5500", resources: [{ kind: 'fragments', amount: 20 }] } },
    'laChasseSauvage': { titleKey: "expeditions.starters.laChasseSauvage.title", flavorTextKey: "expeditions.starters.laChasseSauvage.flavorText", recommendedStats: "Toutes", startEventId: 'CHASSE_SAUVAGE_DEBUT', rarity: 'epic', itemDropChance: 0.034, potentialRewards: { xp: "~7000", resources: [{ kind: 'metal', amount: 1200 }] } },
    'leSommetDuMonde': { titleKey: "expeditions.starters.leSommetDuMonde.title", flavorTextKey: "expeditions.starters.leSommetDuMonde.flavorText", recommendedStats: "Force, Vie", startEventId: 'SOMMET_MONDE_DEBUT', rarity: 'epic', itemDropChance: 0.027, potentialRewards: { xp: "~6500", resources: [{ kind: 'bois', amount: 1500 }] } },
    'leMaelstromArcanique': { titleKey: "expeditions.starters.leMaelstromArcanique.title", flavorTextKey: "expeditions.starters.leMaelstromArcanique.flavorText", recommendedStats: "Intelligence, Agilité", startEventId: 'MAELSTROM_DEBUT', rarity: 'epic', itemDropChance: 0.028, potentialRewards: { xp: "~5800", resources: [{ kind: 'fragments', amount: 20 }] } },
    'laGuerreContreLesProfonds': { titleKey: "expeditions.starters.laGuerreContreLesProfonds.title", flavorTextKey: "expeditions.starters.laGuerreContreLesProfonds.flavorText", recommendedStats: "Force, Défense", startEventId: 'GUERRE_PROFONDS_DEBUT', rarity: 'epic', itemDropChance: 0.04, potentialRewards: { xp: "~7500", resources: [{ kind: 'metal', amount: 1000 }, { kind: 'tissu', amount: 500 }] } },
    'leSablierDuTemps': { titleKey: "expeditions.starters.leSablierDuTemps.title", flavorTextKey: "expeditions.starters.leSablierDuTemps.flavorText", recommendedStats: "Chance, Intelligence", startEventId: 'SABLIER_TEMPS_DEBUT', rarity: 'epic', itemDropChance: 0.022, potentialRewards: { xp: "~8000", resources: [] } },

    // ** LÉGENDAIRES (15) **
    'reliqueDivine': { titleKey: "expeditions.starters.reliqueDivine.title", flavorTextKey: "expeditions.starters.reliqueDivine.flavorText", recommendedStats: "Agilité, Intelligence", startEventId: 'RELIQUE_DEBUT', rarity: 'legendary', itemDropChance: 0.011, potentialRewards: { xp: "~12000", resources: [{ kind: 'metal', amount: 1500 }, { kind: 'tissu', amount: 1500 }] } },
    'chasseDragon': { titleKey: "expeditions.starters.chasseDragon.title", flavorTextKey: "expeditions.starters.chasseDragon.flavorText", recommendedStats: "Force, Vie", startEventId: 'DRAGON_DEBUT', rarity: 'legendary', itemDropChance: 0.012, potentialRewards: { xp: "~15000", resources: [{ kind: 'metal', amount: 2500 }, { kind: 'bois', amount: 1000 }] } },
    'tourSorcier': { titleKey: "expeditions.starters.tourSorcier.title", flavorTextKey: "expeditions.starters.tourSorcier.flavorText", recommendedStats: "Intelligence, Défense", startEventId: 'TOUR_DEBUT', rarity: 'legendary', itemDropChance: 0.01, potentialRewards: { xp: "~18000", resources: [{ kind: 'tissu', amount: 2000 }, { kind: 'bois', amount: 1500 }] } },
    'forgeDieux': { titleKey: "expeditions.starters.forgeDieux.title", flavorTextKey: "expeditions.starters.forgeDieux.flavorText", recommendedStats: "Force, Défense, Intelligence", startEventId: 'FORGEDIEUX_DEBUT', rarity: 'legendary', itemDropChance: 0.015, potentialRewards: { xp: "~20000", resources: [{ kind: 'metal', amount: 3000 }] } },
    'conseilOmbres': { titleKey: "expeditions.starters.conseilOmbres.title", flavorTextKey: "expeditions.starters.conseilOmbres.flavorText", recommendedStats: "Intelligence, Agilité", startEventId: 'CONSEIL_DEBUT', rarity: 'legendary', itemDropChance: 0.008, potentialRewards: { xp: "~16000", resources: [{ kind: 'tissu', amount: 2500 }] } },
    'leTombeauDuRoiSinge': { titleKey: "expeditions.starters.leTombeauDuRoiSinge.title", flavorTextKey: "expeditions.starters.leTombeauDuRoiSinge.flavorText", recommendedStats: "Agilité, Intelligence", startEventId: 'TOMBEAU_SINGE_DEBUT', rarity: 'legendary', itemDropChance: 0.011, potentialRewards: { xp: "~15000", resources: [{ kind: 'bois', amount: 2000 }, { kind: 'tissu', amount: 2000 }] } },
    'laCite Engloutie': { titleKey: "expeditions.starters.laCite Engloutie.title", flavorTextKey: "expeditions.starters.laCite Engloutie.flavorText", recommendedStats: "Vie, Intelligence", startEventId: 'CITE_ENGLOUTIE_DEBUT', rarity: 'legendary', itemDropChance: 0.012, potentialRewards: { xp: "~18000", resources: [{ kind: 'fragments', amount: 250 }] } },
    'leDernierDesGeants': { titleKey: "expeditions.starters.leDernierDesGeants.title", flavorTextKey: "expeditions.starters.leDernierDesGeants.flavorText", recommendedStats: "Force, Défense", startEventId: 'DERNIER_GEANT_DEBUT', rarity: 'legendary', itemDropChance: 0.01, potentialRewards: { xp: "~16000", resources: [{ kind: 'metal', amount: 3000 }] } },
    'lEchiquierDesDieux': { titleKey: "expeditions.starters.lEchiquierDesDieux.title", flavorTextKey: "expeditions.starters.lEchiquierDesDieux.flavorText", recommendedStats: "Intelligence", startEventId: 'ECHIQUIER_DIEUX_DEBUT', rarity: 'legendary', itemDropChance: 0.005, potentialRewards: { xp: "~25000", resources: [] } },
    'laToisonDOr': { titleKey: "expeditions.starters.laToisonDOr.title", flavorTextKey: "expeditions.starters.laToisonDOr.flavorText", recommendedStats: "Toutes", startEventId: 'TOISON_OR_DEBUT', rarity: 'legendary', itemDropChance: 0.013, potentialRewards: { xp: "~20000", resources: [{ kind: 'tissu', amount: 5000 }] } },
    'leCoeurDeLaForetMonde': { titleKey: "expeditions.starters.leCoeurDeLaForetMonde.title", flavorTextKey: "expeditions.starters.leCoeurDeLaForetMonde.flavorText", recommendedStats: "Vie, Chance", startEventId: 'FORET_MONDE_DEBUT', rarity: 'legendary', itemDropChance: 0.009, potentialRewards: { xp: "~17000", resources: [{ kind: 'bois', amount: 4000 }] } },
    'leTournoiDesChampionsEternels': { titleKey: "expeditions.starters.leTournoiDesChampionsEternels.title", flavorTextKey: "expeditions.starters.leTournoiDesChampionsEternels.flavorText", recommendedStats: "Force, Agilité, Défense", startEventId: 'TOURNOI_CHAMPIONS_DEBUT', rarity: 'legendary', itemDropChance: 0.008, potentialRewards: { xp: "~22000", resources: [{ kind: 'metal', amount: 2500 }, { kind: 'tissu', amount: 2500 }] } },
    'laBibliothequeInfinie': { titleKey: "expeditions.starters.laBibliothequeInfinie.title", flavorTextKey: "expeditions.starters.laBibliothequeInfinie.flavorText", recommendedStats: "Intelligence, Chance", startEventId: 'BIBLIO_INFINIE_DEBUT', rarity: 'legendary', itemDropChance: 0.007, potentialRewards: { xp: "~30000", resources: [{ kind: 'tissu', amount: 6000 }] } },
    'leForgeronDesAmes': { titleKey: "expeditions.starters.leForgeronDesAmes.title", flavorTextKey: "expeditions.starters.leForgeronDesAmes.flavorText", recommendedStats: "Force, Vie", startEventId: 'FORGERON_AMES_DEBUT', rarity: 'legendary', itemDropChance: 0.012, potentialRewards: { xp: "~19000", resources: [{ kind: 'metal', amount: 5000 }] } },
    'lArmeeDesTenebres': { titleKey: "expeditions.starters.lArmeeDesTenebres.title", flavorTextKey: "expeditions.starters.lArmeeDesTenebres.flavorText", recommendedStats: "Force, Défense", startEventId: 'ARMEE_TENERBES_DEBUT', rarity: 'legendary', itemDropChance: 0.014, potentialRewards: { xp: "~28000", resources: [{ kind: 'metal', amount: 4000 }, { kind: 'fragments', amount: 100 }] } },

    // ** MYTHIQUES (14) **
    'brecheDimensionnelle': { titleKey: "expeditions.starters.brecheDimensionnelle.title", flavorTextKey: "expeditions.starters.brecheDimensionnelle.flavorText", recommendedStats: "Intelligence, Défense", startEventId: 'BRECHE_DEBUT', rarity: 'mythic', itemDropChance: 0.002, potentialRewards: { xp: "~30000", resources: [{ kind: 'tissu', amount: 5000 }, { kind: 'metal', amount: 3000 }] } },
    'coeurCorrompu': { titleKey: "expeditions.starters.coeurCorrompu.title", flavorTextKey: "expeditions.starters.coeurCorrompu.flavorText", recommendedStats: "Toutes", startEventId: 'CORRUPTION_DEBUT', rarity: 'mythic', itemDropChance: 0.0025, potentialRewards: { xp: "~50000", resources: [{ kind: 'metal', amount: 5000 }, { kind: 'bois', amount: 5000 }, { kind: 'tissu', amount: 5000 }] } },
    'etoileMourante': { titleKey: "expeditions.starters.etoileMourante.title", flavorTextKey: "expeditions.starters.etoileMourante.flavorText", recommendedStats: "Intelligence, Défense", startEventId: 'ETOILE_DEBUT', rarity: 'mythic', itemDropChance: 0.0018, potentialRewards: { xp: "~40000", resources: [{ kind: 'metal', amount: 6000 }] } },
    'roiEndormi': { titleKey: "expeditions.starters.roiEndormi.title", flavorTextKey: "expeditions.starters.roiEndormi.flavorText", recommendedStats: "Toutes", startEventId: 'ROI_DEBUT', rarity: 'mythic', itemDropChance: 0.003, potentialRewards: { xp: "~60000", resources: [{ kind: 'metal', amount: 8000 }, { kind: 'bois', amount: 8000 }, { kind: 'tissu', amount: 8000 }] } },
    'leSilenceDesEtoiles': { titleKey: "expeditions.starters.leSilenceDesEtoiles.title", flavorTextKey: "expeditions.starters.leSilenceDesEtoiles.flavorText", recommendedStats: "Intelligence, Vie", startEventId: 'SILENCE_ETOILES_DEBUT', rarity: 'mythic', itemDropChance: 0.0015, potentialRewards: { xp: "~50000", resources: [{ kind: 'fragments', amount: 500 }] } },
    'leDernierDieu': { titleKey: "expeditions.starters.leDernierDieu.title", flavorTextKey: "expeditions.starters.leDernierDieu.flavorText", recommendedStats: "Toutes", startEventId: 'TUER_DIEU_DEBUT', rarity: 'mythic', itemDropChance: 0.003, potentialRewards: { xp: "~100000", resources: [{ kind: 'metal', amount: 10000 }, { kind: 'fragments', amount: 1000 }] } },
    'leRefletBrisé': { titleKey: "expeditions.starters.leRefletBrisé.title", flavorTextKey: "expeditions.starters.leRefletBrisé.flavorText", recommendedStats: "Agilité, Intelligence", startEventId: 'REFLET_BRISE_DEBUT', rarity: 'mythic', itemDropChance: 0.002, potentialRewards: { xp: "~45000", resources: [{ kind: 'tissu', amount: 8000 }] } },
    'laMelodieDeLaCreation': { titleKey: "expeditions.starters.laMelodieDeLaCreation.title", flavorTextKey: "expeditions.starters.laMelodieDeLaCreation.flavorText", recommendedStats: "Intelligence, Chance", startEventId: 'MELODIE_CREATION_DEBUT', rarity: 'mythic', itemDropChance: 0.001, potentialRewards: { xp: "~60000", resources: [] } },
    'leCycleDeLaRoue': { titleKey: "expeditions.starters.leCycleDeLaRoue.title", flavorTextKey: "expeditions.starters.leCycleDeLaRoue.flavorText", recommendedStats: "Toutes", startEventId: 'ROUE_TEMPS_DEBUT', rarity: 'mythic', itemDropChance: 0.001, potentialRewards: { xp: "~80000", resources: [{ kind: 'fragments', amount: 700 }] } },
    'leJardinDHephaistos': { titleKey: "expeditions.starters.leJardinDHephaistos.title", flavorTextKey: "expeditions.starters.leJardinDHephaistos.flavorText", recommendedStats: "Force, Défense", startEventId: 'JARDIN_HEPHAISTOS_DEBUT', rarity: 'mythic', itemDropChance: 0.0022, potentialRewards: { xp: "~55000", resources: [{ kind: 'metal', amount: 12000 }, { 'bois': 5000 }] }, seedDrops: [{ seedId: 'HERBE_ROBUSTE', chance: 0.15 }] },
    'lEncreDuDestin': { titleKey: "expeditions.starters.lEncreDuDestin.title", flavorTextKey: "expeditions.starters.lEncreDuDestin.flavorText", recommendedStats: "Intelligence, Chance", startEventId: 'ENCRE_DESTIN_DEBUT', rarity: 'mythic', itemDropChance: 0.001, potentialRewards: { xp: "~75000", resources: [] } },
    'le ProcesDAsmodeus': { titleKey: "expeditions.starters.le ProcesDAsmodeus.title", flavorTextKey: "expeditions.starters.le ProcesDAsmodeus.flavorText", recommendedStats: "Intelligence", startEventId: 'PROCES_ASMODEUS_DEBUT', rarity: 'mythic', itemDropChance: 0.001, potentialRewards: { xp: "~90000", resources: [] } },
    'leTroneVide': { titleKey: "expeditions.starters.leTroneVide.title", flavorTextKey: "expeditions.starters.leTroneVide.flavorText", recommendedStats: "Toutes", startEventId: 'TRONE_VIDE_DEBUT', rarity: 'mythic', itemDropChance: 0.001, potentialRewards: { xp: "~85000", resources: [{ kind: 'tissu', amount: 10000 }, { 'metal': 10000 }] } },
    'le CommencementDeLaFin': { titleKey: "expeditions.starters.le CommencementDeLaFin.title", flavorTextKey: "expeditions.starters.le CommencementDeLaFin.flavorText", recommendedStats: "Vie, Défense", startEventId: 'COMMENCEMENT_FIN_DEBUT', rarity: 'mythic', itemDropChance: 0.001, potentialRewards: { xp: "~70000", resources: [{ kind: 'fragments', amount: 500 }] } },
};

const EXPEDITION_EVENTS_DB = {
    // ** COMMUNES **
    'RIVIERE_DEBUT': {
        descriptionKey: "expeditions.events.riviere_debut.description",
        choices: [
            { textKey: "expeditions.events.riviere_debut.choice1_text", test: { stat: 'Force', value: 8 }, success: { textKey: "expeditions.events.riviere_debut.choice1_success_text", effects: [{ type: 'hp_loss_percent', value: 10 }], nextEvent: 'RIVIERE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.riviere_debut.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 25 }], nextEvent: 'RIVIERE_FIN_ECHEC' } },
            { textKey: "expeditions.events.riviere_debut.choice2_text", test: { stat: 'Intelligence', value: 6 }, success: { textKey: "expeditions.events.riviere_debut.choice2_success_text", effects: [], nextEvent: 'RIVIERE_PONT_GARDE' }, failure: { textKey: "expeditions.events.riviere_debut.choice2_failure_text", effects: [], waitTime: 10, nextEvent: 'RIVIERE_FIN_ECHEC' } }
        ]
    },
    'RIVIERE_PONT_GARDE': {
        descriptionKey: "expeditions.events.riviere_pont_garde.description",
        choices: [
            { textKey: "expeditions.events.riviere_pont_garde.choice1_text", test: { stat: 'resources.bois', value: 20 }, success: { textKey: "expeditions.events.riviere_pont_garde.choice1_success_text", effects: [{ type: 'resource_loss', kind: 'bois', amount: 20 }], nextEvent: 'RIVIERE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.riviere_pont_garde.choice1_failure_text", effects: [], nextEvent: 'RIVIERE_FIN_ECHEC' } },
            { textKey: "expeditions.events.riviere_pont_garde.choice2_text", test: { stat: 'Force', value: 10 }, success: { textKey: "expeditions.events.riviere_pont_garde.choice2_success_text", effects: [], nextEvent: 'RIVIERE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.riviere_pont_garde.choice2_failure_text", effects: [{ type: 'hp_loss_flat', value: 10 }], nextEvent: 'RIVIERE_FIN_ECHEC' } }
        ]
    },
    'RIVIERE_FIN_SUCCES': { descriptionKey: "expeditions.events.riviere_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 150 }, { type: 'resource', kind: 'bois', amount: 25 }, { type: 'resource', kind: 'metal', amount: 15 }] },
    'RIVIERE_FIN_ECHEC': { descriptionKey: "expeditions.events.riviere_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 20 }] },
    'FORET_DEBUT': {
        descriptionKey: "expeditions.events.foret_debut.description",
        choices: [
            { textKey: "expeditions.events.foret_debut.choice1_text", test: null, success: { textKey: "expeditions.events.foret_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: { 'FORET_CLAIRIERE': 0.6, 'FORET_PIEGE': 0.4 } } }
        ]
    },
    'FORET_CLAIRIERE': {
        descriptionKey: "expeditions.events.foret_clairiere.description",
        choices: [
            { textKey: "expeditions.events.foret_clairiere.choice1_text", test: null, success: { textKey: "expeditions.events.foret_clairiere.choice1_success_text", effects: [], nextEvent: 'FORET_FIN_SUCCES' } }
        ]
    },
    'FORET_PIEGE': {
        descriptionKey: "expeditions.events.foret_piege.description",
        choices: [
            { textKey: "expeditions.events.foret_piege.choice1_text", test: { stat: 'Agilité', value: 8 }, success: { textKey: "expeditions.events.foret_piege.choice1_success_text", effects: [], nextEvent: 'FORET_FIN_SUCCES' }, failure: { textKey: "expeditions.events.foret_piege.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 15 }], nextEvent: 'FORET_FIN_ECHEC' } }
        ]
    },
    'FORET_FIN_SUCCES': { descriptionKey: "expeditions.events.foret_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 200 }, { type: 'resource', kind: 'bois', amount: 50 }, { type: 'resource', kind: 'tissu', amount: 20 }] },
    'FORET_FIN_ECHEC': { descriptionKey: "expeditions.events.foret_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 30 }, { type: 'resource', kind: 'bois', amount: 10 }] },
    'ENQUETE_DEBUT': {
        descriptionKey: "expeditions.events.enquete_debut.description",
        choices: [
            { textKey: "expeditions.events.enquete_debut.choice1_text", test: null, success: { textKey: "expeditions.events.enquete_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'ENQUETE_INDICES' } }
        ]
    },
    'ENQUETE_INDICES': {
        descriptionKey: "expeditions.events.enquete_indices.description",
        choices: [
            { textKey: "expeditions.events.enquete_indices.choice1_text", test: { stat: 'Intelligence', value: 5 }, success: { textKey: "expeditions.events.enquete_indices.choice1_success_text", effects: [], nextEvent: 'ENQUETE_CONFRONTATION' }, failure: { textKey: "expeditions.events.enquete_indices.choice1_failure_text", effects: [], waitTime: 15, nextEvent: 'ENQUETE_SURVEILLANCE' } },
            { textKey: "expeditions.events.enquete_indices.choice2_text", test: { stat: 'Chance', value: 5 }, success: { textKey: "expeditions.events.enquete_indices.choice2_success_text", effects: [], nextEvent: 'ENQUETE_CONFRONTATION' }, failure: { textKey: "expeditions.events.enquete_indices.choice2_failure_text", effects: [], waitTime: 15, nextEvent: 'ENQUETE_SURVEILLANCE' } }
        ]
    },
    'ENQUETE_CONFRONTATION': {
        descriptionKey: "expeditions.events.enquete_confrontation.description",
        choices: [
            { textKey: "expeditions.events.enquete_confrontation.choice1_text", test: null, success: { textKey: "expeditions.events.enquete_confrontation.choice1_success_text", effects: [], nextEvent: 'ENQUETE_FIN_BIEN' } },
            { textKey: "expeditions.events.enquete_confrontation.choice2_text", test: { stat: 'resources.tissu', value: 20 }, success: { textKey: "expeditions.events.enquete_confrontation.choice2_success_text", effects: [{ type: 'resource_loss', kind: 'tissu', amount: 20 }], nextEvent: 'ENQUETE_FIN_GENEREUX' }, failure: { textKey: "expeditions.events.enquete_confrontation.choice2_failure_text", effects: [], nextEvent: 'ENQUETE_FIN_MOYEN' } }
        ]
    },
    'ENQUETE_SURVEILLANCE': {
        descriptionKey: "expeditions.events.enquete_surveillance.description",
        choices: [
            { textKey: "expeditions.events.enquete_surveillance.choice1_text", test: null, success: { textKey: "expeditions.events.enquete_surveillance.choice1_success_text", effects: [], nextEvent: 'ENQUETE_CONFRONTATION' } }
        ]
    },
    'ENQUETE_FIN_BIEN': { descriptionKey: "expeditions.events.enquete_fin_bien.description", isEnd: true, rewards: [{ type: 'xp', amount: 120 }, { type: 'resource', kind: 'tissu', amount: 30 }] },
    'ENQUETE_FIN_GENEREUX': { descriptionKey: "expeditions.events.enquete_fin_genereux.description", isEnd: true, rewards: [{ type: 'xp', amount: 200 }] },
    'ENQUETE_FIN_MOYEN': { descriptionKey: "expeditions.events.enquete_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 80 }, { type: 'resource', kind: 'tissu', amount: 15 }] },
    'LIVRAISON_DEBUT': {
        descriptionKey: "expeditions.events.livraison_debut.description",
        choices: [
            { textKey: "expeditions.events.livraison_debut.choice1_text", test: null, success: { textKey: "expeditions.events.livraison_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'LIVRAISON_CHEMIN' } }
        ]
    },
    'LIVRAISON_CHEMIN': {
        descriptionKey: "expeditions.events.livraison_chemin.description",
        choices: [
            { textKey: "expeditions.events.livraison_chemin.choice1_text", test: { stat: 'Agilité', value: 7 }, success: { textKey: "expeditions.events.livraison_chemin.choice1_success_text", effects: [], nextEvent: 'LIVRAISON_FIN_RAPIDE' }, failure: { textKey: "expeditions.events.livraison_chemin.choice1_failure_text", effects: [], waitTime: 10, nextEvent: 'LIVRAISON_FIN_LENT' } },
            { textKey: "expeditions.events.livraison_chemin.choice2_text", test: null, success: { textKey: "expeditions.events.livraison_chemin.choice2_success_text", effects: [], waitTime: 5, nextEvent: 'LIVRAISON_FIN_LENT' } }
        ]
    },
    'LIVRAISON_FIN_RAPIDE': { descriptionKey: "expeditions.events.livraison_fin_rapide.description", isEnd: true, rewards: [{ type: 'xp', amount: 220 }, { type: 'resource', kind: 'bois', amount: 50 }] },
    'LIVRAISON_FIN_LENT': { descriptionKey: "expeditions.events.livraison_fin_lent.description", isEnd: true, rewards: [{ type: 'xp', amount: 180 }, { type: 'resource', kind: 'bois', amount: 40 }] },
    'RATS_DEBUT': {
        descriptionKey: "expeditions.events.rats_debut.description",
        choices: [
            { textKey: "expeditions.events.rats_debut.choice1_text", test: null, success: { textKey: "expeditions.events.rats_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'RATS_TUNNELS' } }
        ]
    },
    'RATS_TUNNELS': {
        descriptionKey: "expeditions.events.rats_tunnels.description",
        choices: [
            { textKey: "expeditions.events.rats_tunnels.choice1_text", test: null, success: { textKey: "expeditions.events.rats_tunnels.choice1_success_text", combat: { enemies: ['RAT_GEANT'], winEvent: 'RATS_NID', lossEvent: 'RATS_FIN_ECHEC' } } }
        ]
    },
    'RATS_NID': {
        descriptionKey: "expeditions.events.rats_nid.description",
        choices: [
            { textKey: "expeditions.events.rats_nid.choice1_text", test: null, success: { textKey: "expeditions.events.rats_nid.choice1_success_text", combat: { enemies: ['REINE_DES_RATS'], winEvent: 'RATS_FIN_SUCCES', lossEvent: 'RATS_FIN_ECHEC' } } },
            { textKey: "expeditions.events.rats_nid.choice2_text", test: null, success: { textKey: "expeditions.events.rats_nid.choice2_success_text", effects: [], nextEvent: 'RATS_FIN_ECHEC' } }
        ]
    },
    'RATS_FIN_SUCCES': { descriptionKey: "expeditions.events.rats_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 160 }, { type: 'resource', kind: 'tissu', amount: 40 }] },
    'RATS_FIN_ECHEC': { descriptionKey: "expeditions.events.rats_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -50 }] },
    'MEDAILLON_DEBUT': {
        descriptionKey: "expeditions.events.medaillon_debut.description",
        choices: [
            { textKey: "expeditions.events.medaillon_debut.choice1_text", test: null, success: { textKey: "expeditions.events.medaillon_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'MEDAILLON_RECHERCHE' } }
        ]
    },
    'MEDAILLON_RECHERCHE': {
        descriptionKey: "expeditions.events.medaillon_recherche.description",
        choices: [
            { textKey: "expeditions.events.medaillon_recherche.choice1_text", test: { stat: 'Chance', value: 10 }, success: { textKey: "expeditions.events.medaillon_recherche.choice1_success_text", effects: [], nextEvent: 'MEDAILLON_FIN_SUCCES' }, failure: { textKey: "expeditions.events.medaillon_recherche.choice1_failure_text", effects: [], nextEvent: 'MEDAILLON_FIN_ECHEC' } },
            { textKey: "expeditions.events.medaillon_recherche.choice2_text", test: { stat: 'Intelligence', value: 7 }, success: { textKey: "expeditions.events.medaillon_recherche.choice2_success_text", effects: [], nextEvent: 'MEDAILLON_FIN_SUCCES' }, failure: { textKey: "expeditions.events.medaillon_recherche.choice2_failure_text", effects: [], nextEvent: 'MEDAILLON_FIN_ECHEC' } }
        ]
    },
    'MEDAILLON_FIN_SUCCES': { descriptionKey: "expeditions.events.medaillon_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 130 }, { type: 'resource', kind: 'bois', amount: 30 }] },
    'MEDAILLON_FIN_ECHEC': { descriptionKey: "expeditions.events.medaillon_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 15 }] },
    'HERBES_DEBUT': {
        descriptionKey: "expeditions.events.herbes_debut.description",
        choices: [
            { textKey: "expeditions.events.herbes_debut.choice1_text", test: null, success: { textKey: "expeditions.events.herbes_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'HERBES_RECHERCHE' } }
        ]
    },
    'HERBES_RECHERCHE': {
        descriptionKey: "expeditions.events.herbes_recherche.description",
        choices: [
            { textKey: "expeditions.events.herbes_recherche.choice1_text", test: null, success: { textKey: "expeditions.events.herbes_recherche.choice1_success_text", effects: [], nextEvent: 'HERBES_FIN_SUCCES' } },
            { textKey: "expeditions.events.herbes_recherche.choice2_text", test: { stat: 'Intelligence', value: 5 }, success: { textKey: "expeditions.events.herbes_recherche.choice2_success_text", effects: [], waitTime: 5, nextEvent: 'HERBES_FIN_SUCCES' }, failure: { textKey: "expeditions.events.herbes_recherche.choice2_failure_text", effects: [], nextEvent: 'HERBES_FIN_SUCCES' } }
        ]
    },
    'HERBES_FIN_SUCCES': { descriptionKey: "expeditions.events.herbes_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 110 }, { type: 'resource', kind: 'tissu', amount: 25 }] },
    'GOBELINS_DEBUT': {
        descriptionKey: "expeditions.events.gobelins_debut.description",
        choices: [
            { textKey: "expeditions.events.gobelins_debut.choice1_text", test: null, success: { textKey: "expeditions.events.gobelins_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'GOBELINS_COMBAT' } }
        ]
    },
    'GOBELINS_COMBAT': {
        descriptionKey: "expeditions.events.gobelins_combat.description",
        choices: [
            { textKey: "expeditions.events.gobelins_combat.choice1_text", test: null, success: { textKey: "expeditions.events.gobelins_combat.choice1_success_text", combat: { enemies: ['GOBELIN_FRONDEUR'], winEvent: 'GOBELINS_FIN_SUCCES', lossEvent: 'GOBELINS_FIN_ECHEC' } } }
        ]
    },
    'GOBELINS_FIN_SUCCES': { descriptionKey: "expeditions.events.gobelins_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 140 }, { type: 'resource', kind: 'bois', amount: 30 }] },
    'GOBELINS_FIN_ECHEC': { descriptionKey: "expeditions.events.gobelins_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -30 }] },
    'CAVE_DEBUT': {
        descriptionKey: "expeditions.events.cave_debut.description",
        choices: [
            { textKey: "expeditions.events.cave_debut.choice1_text", test: null, success: { textKey: "expeditions.events.cave_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'CAVE_COMBAT' } }
        ]
    },
    'CAVE_COMBAT': {
        descriptionKey: "expeditions.events.cave_combat.description",
        choices: [
            { textKey: "expeditions.events.cave_combat.choice1_text", test: null, success: { textKey: "expeditions.events.cave_combat.choice1_success_text", combat: { enemies: ['ARAIGNEE_DE_CAVE'], winEvent: 'CAVE_FIN_SUCCES', lossEvent: 'CAVE_FIN_ECHEC' } } }
        ]
    },
    'CAVE_FIN_SUCCES': { descriptionKey: "expeditions.events.cave_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 150 }, { type: 'resource', kind: 'tissu', amount: 35 }] },
    'CAVE_FIN_ECHEC': { descriptionKey: "expeditions.events.cave_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 25 }] },
    'LETTRE_DEBUT': {
        descriptionKey: "expeditions.events.lettre_debut.description",
        choices: [
            { textKey: "expeditions.events.lettre_debut.choice1_text", test: null, success: { textKey: "expeditions.events.lettre_debut.choice1_success_text", nextEvent: 'LETTRE_RECHERCHE' } }
        ]
    },
    'LETTRE_RECHERCHE': {
        descriptionKey: "expeditions.events.lettre_recherche.description",
        choices: [
            { textKey: "expeditions.events.lettre_recherche.choice1_text", test: { stat: 'Chance', value: 12 }, success: { textKey: "expeditions.events.lettre_recherche.choice1_success_text", effects: [], nextEvent: 'LETTRE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.lettre_recherche.choice1_failure_text", effects: [], nextEvent: 'LETTRE_FIN_ECHEC' } },
            { textKey: "expeditions.events.lettre_recherche.choice2_text", test: { stat: 'Intelligence', value: 8 }, success: { textKey: "expeditions.events.lettre_recherche.choice2_success_text", effects: [], nextEvent: 'LETTRE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.lettre_recherche.choice2_failure_text", effects: [], nextEvent: 'LETTRE_FIN_ECHEC' } }
        ]
    },
    'LETTRE_FIN_SUCCES': { descriptionKey: "expeditions.events.lettre_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 100 }] },
    'LETTRE_FIN_ECHEC': { descriptionKey: "expeditions.events.lettre_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 10 }] },
    'CLOTURE_DEBUT': {
        descriptionKey: "expeditions.events.cloture_debut.description",
        choices: [
            { textKey: "expeditions.events.cloture_debut.choice1_text", test: null, success: { textKey: "expeditions.events.cloture_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'CLOTURE_REPARATION' } }
        ]
    },
    'CLOTURE_REPARATION': {
        descriptionKey: "expeditions.events.cloture_reparation.description",
        choices: [
            { textKey: "expeditions.events.cloture_reparation.choice1_text", test: { stat: 'Force', value: 9 }, success: { textKey: "expeditions.events.cloture_reparation.choice1_success_text", effects: [], nextEvent: 'CLOTURE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.cloture_reparation.choice1_failure_text", combat: { enemies: ['LOUP_AFFAME'], winEvent: 'CLOTURE_FIN_SUCCES', lossEvent: 'CLOTURE_FIN_ECHEC' } } },
            { textKey: "expeditions.events.cloture_reparation.choice2_text", test: { stat: 'Défense', value: 4 }, success: { textKey: "expeditions.events.cloture_reparation.choice2_success_text", effects: [], nextEvent: 'CLOTURE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.cloture_reparation.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 20 }], combat: { enemies: ['LOUP_AFFAME', 'LOUP_AFFAME'], winEvent: 'CLOTURE_FIN_SUCCES', lossEvent: 'CLOTURE_FIN_ECHEC' } } }
        ]
    },
    'CLOTURE_FIN_SUCCES': { descriptionKey: "expeditions.events.cloture_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 130 }, { type: 'resource', kind: 'bois', amount: 45 }] },
    'CLOTURE_FIN_ECHEC': { descriptionKey: "expeditions.events.cloture_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 40 }] },
    'CHAT_DEBUT': {
        descriptionKey: "expeditions.events.chat_debut.description",
        choices: [
            { textKey: "expeditions.events.chat_debut.choice1_text", test: null, success: { textKey: "expeditions.events.chat_debut.choice1_success_text", nextEvent: 'CHAT_RECHERCHE' } }
        ]
    },
    'CHAT_RECHERCHE': {
        descriptionKey: "expeditions.events.chat_recherche.description",
        choices: [
            { textKey: "expeditions.events.chat_recherche.choice1_text", test: { stat: 'Agilité', value: 9 }, success: { textKey: "expeditions.events.chat_recherche.choice1_success_text", effects: [], nextEvent: 'CHAT_FIN_SUCCES' }, failure: { textKey: "expeditions.events.chat_recherche.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 10 }], nextEvent: 'CHAT_FIN_ECHEC' } },
            { textKey: "expeditions.events.chat_recherche.choice2_text", test: { stat: 'Chance', value: 8 }, success: { textKey: "expeditions.events.chat_recherche.choice2_success_text", effects: [], nextEvent: 'CHAT_FIN_SUCCES' }, failure: { textKey: "expeditions.events.chat_recherche.choice2_failure_text", effects: [], nextEvent: 'CHAT_FIN_ECHEC' } }
        ]
    },
    'CHAT_FIN_SUCCES': { descriptionKey: "expeditions.events.chat_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 120 }, { type: 'resource', kind: 'tissu', amount: 40 }] },
    'CHAT_FIN_ECHEC': { descriptionKey: "expeditions.events.chat_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 10 }] },
    'CIMETIERE_DEBUT': {
        descriptionKey: "expeditions.events.cimetiere_debut.description",
        choices: [
            { textKey: "expeditions.events.cimetiere_debut.choice1_text", test: null, success: { textKey: "expeditions.events.cimetiere_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'CIMETIERE_ENQUETE' } }
        ]
    },
    'CIMETIERE_ENQUETE': {
        descriptionKey: "expeditions.events.cimetiere_enquete.description",
        choices: [
            { textKey: "expeditions.events.cimetiere_enquete.choice1_text", test: { stat: 'Force', value: 10 }, success: { textKey: "expeditions.events.cimetiere_enquete.choice1_success_text", combat: { enemies: ['RAT_GEANT'], winEvent: 'CIMETIERE_FIN_SUCCES', lossEvent: 'CIMETIERE_FIN_ECHEC' } }, failure: { textKey: "expeditions.events.cimetiere_enquete.choice1_failure_text", combat: { enemies: ['SQUELETTE_GUERRIER'], winEvent: 'CIMETIERE_FIN_MOYEN', lossEvent: 'CIMETIERE_FIN_ECHEC' } } },
            { textKey: "expeditions.events.cimetiere_enquete.choice2_text", test: { stat: 'Intelligence', value: 9 }, success: { textKey: "expeditions.events.cimetiere_enquete.choice2_success_text", effects: [], nextEvent: 'CIMETIERE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.cimetiere_enquete.choice2_failure_text", effects: [{ type: 'hp_loss_flat', value: 5 }], combat: { enemies: ['SQUELETTE_GUERRIER'], winEvent: 'CIMETIERE_FIN_MOYEN', lossEvent: 'CIMETIERE_FIN_ECHEC' } } }
        ]
    },
    'CIMETIERE_FIN_SUCCES': { descriptionKey: "expeditions.events.cimetiere_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 170 }, { type: 'resource', kind: 'metal', amount: 20 }] },
    'CIMETIERE_FIN_MOYEN': { descriptionKey: "expeditions.events.cimetiere_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 150 }, { type: 'resource', kind: 'metal', amount: 15 }] },
    'CIMETIERE_FIN_ECHEC': { descriptionKey: "expeditions.events.cimetiere_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -40 }] },
    'LIVRE_DEBUT': {
        descriptionKey: "expeditions.events.livre_debut.description",
        choices: [
            { textKey: "expeditions.events.livre_debut.choice1_text", test: null, success: { textKey: "expeditions.events.livre_debut.choice1_success_text", nextEvent: 'LIVRE_ERMITE' } }
        ]
    },
    'LIVRE_ERMITE': {
        descriptionKey: "expeditions.events.livre_ermite.description",
        choices: [
            { textKey: "expeditions.events.livre_ermite.choice1_text", test: { stat: 'Intelligence', value: 10 }, success: { textKey: "expeditions.events.livre_ermite.choice1_success_text", effects: [], nextEvent: 'LIVRE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.livre_ermite.choice1_failure_text", effects: [], nextEvent: 'LIVRE_FIN_ECHEC' } },
            { textKey: "expeditions.events.livre_ermite.choice2_text", test: { stat: 'resources.bois', value: 20 }, success: { textKey: "expeditions.events.livre_ermite.choice2_success_text", effects: [{ type: 'resource_loss', kind: 'bois', amount: 20 }], nextEvent: 'LIVRE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.livre_ermite.choice2_failure_text", effects: [], nextEvent: 'LIVRE_FIN_ECHEC' } }
        ]
    },
    'LIVRE_FIN_SUCCES': { descriptionKey: "expeditions.events.livre_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 115 }, { type: 'resource', kind: 'tissu', amount: 20 }] },
    'LIVRE_FIN_ECHEC': { descriptionKey: "expeditions.events.livre_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 10 }] },
    'PUITS_DEBUT': {
        descriptionKey: "expeditions.events.puits_debut.description",
        choices: [
            { textKey: "expeditions.events.puits_debut.choice1_text", test: null, success: { textKey: "expeditions.events.puits_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'PUITS_INSPECTION' } }
        ]
    },
    'PUITS_INSPECTION': {
        descriptionKey: "expeditions.events.puits_inspection.description",
        choices: [
            { textKey: "expeditions.events.puits_inspection.choice1_text", test: { stat: 'Agilité', value: 8 }, success: { textKey: "expeditions.events.puits_inspection.choice1_success_text", effects: [], nextEvent: 'PUITS_NETTOYAGE' }, failure: { textKey: "expeditions.events.puits_inspection.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 10 }], nextEvent: 'PUITS_NETTOYAGE' } }
        ]
    },
    'PUITS_NETTOYAGE': {
        descriptionKey: "expeditions.events.puits_nettoyage.description",
        choices: [
            { textKey: "expeditions.events.puits_nettoyage.choice1_text", test: { stat: 'Force', value: 12 }, success: { textKey: "expeditions.events.puits_nettoyage.choice1_success_text", effects: [], nextEvent: 'PUITS_FIN_SUCCES' }, failure: { textKey: "expeditions.events.puits_nettoyage.choice1_failure_text", effects: [], waitTime: 20, nextEvent: 'PUITS_FIN_SUCCES' } }
        ]
    },
    'PUITS_FIN_SUCCES': { descriptionKey: "expeditions.events.puits_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 190 }, { type: 'resource', kind: 'metal', amount: 25 }] },
    'PECHE_DEBUT': {
        descriptionKey: "expeditions.events.peche_debut.description",
        choices: [
            { textKey: "expeditions.events.peche_debut.choice1_text", test: null, success: { textKey: "expeditions.events.peche_debut.choice1_success_text", nextEvent: 'PECHE_MONSTRE' } }
        ]
    },
    'PECHE_MONSTRE': {
        descriptionKey: "expeditions.events.peche_monstre.description",
        choices: [
            { textKey: "expeditions.events.peche_monstre.choice1_text", test: { stat: 'Force', value: 12 }, success: { textKey: "expeditions.events.peche_monstre.choice1_success_text", effects: [], nextEvent: 'PECHE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.peche_monstre.choice1_failure_text", effects: [], nextEvent: 'PECHE_FIN_ECHEC' } },
            { textKey: "expeditions.events.peche_monstre.choice2_text", test: { stat: 'Agilité', value: 10 }, success: { textKey: "expeditions.events.peche_monstre.choice2_success_text", effects: [], nextEvent: 'PECHE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.peche_monstre.choice2_failure_text", effects: [], nextEvent: 'PECHE_FIN_ECHEC' } }
        ]
    },
    'PECHE_FIN_SUCCES': { descriptionKey: "expeditions.events.peche_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 160 }, { type: 'resource', kind: 'bois', amount: 35 }] },
    'PECHE_FIN_ECHEC': { descriptionKey: "expeditions.events.peche_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 20 }] },
  
// ** PEU COMMUNES **
    'RUINES_DEBUT': {
        descriptionKey: "expeditions.events.ruines_debut.description",
        choices: [
            { textKey: "expeditions.events.ruines_debut.choice1_text", test: { stat: 'Défense', value: 5 }, success: { textKey: "expeditions.events.ruines_debut.choice1_success_text", effects: [], nextEvent: 'RUINES_SALLE_CENTRALE' }, failure: { textKey: "expeditions.events.ruines_debut.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 20 }], nextEvent: 'RUINES_SALLE_CENTRALE' } },
            { textKey: "expeditions.events.ruines_debut.choice2_text", test: { stat: 'Chance', value: 15 }, success: { textKey: "expeditions.events.ruines_debut.choice2_success_text", effects: [], nextEvent: 'RUINES_FIN_SUCCES' }, failure: { textKey: "expeditions.events.ruines_debut.choice2_failure_text", effects: [], waitTime: 5, nextEvent: 'RUINES_SALLE_CENTRALE' } }
        ]
    },
    'RUINES_SALLE_CENTRALE': {
        descriptionKey: "expeditions.events.ruines_salle_centrale.description",
        choices: [
            { textKey: "expeditions.events.ruines_salle_centrale.choice1_text", test: null, success: { combat: { enemies: ['SQUELETTE_GUERRIER'], winEvent: 'RUINES_CHAMBRE_SECRETE', lossEvent: 'RUINES_FIN_ECHEC' } } }
        ]
    },
    'RUINES_CHAMBRE_SECRETE': {
        descriptionKey: "expeditions.events.ruines_chambre_secrete.description",
        choices: [
            { textKey: "expeditions.events.ruines_chambre_secrete.choice1_text", test: null, success: { textKey: "expeditions.events.ruines_chambre_secrete.choice1_success_text", effects: [], nextEvent: 'RUINES_FIN_SUCCES_COMPLET' } }
        ]
    },
    'RUINES_FIN_SUCCES_COMPLET': { descriptionKey: "expeditions.events.ruines_fin_succes_complet.description", isEnd: true, rewards: [{ type: 'xp', amount: 400 }, { type: 'resource', kind: 'metal', amount: 80 }, { type: 'fragments_gain', amount: 1 }] },
    'RUINES_FIN_SUCCES': { descriptionKey: "expeditions.events.ruines_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 350 }, { type: 'resource', kind: 'metal', amount: 70 }] },
    'RUINES_FIN_ECHEC': { descriptionKey: "expeditions.events.ruines_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 50 }] },
    'ESCORTE_DEBUT': {
        descriptionKey: "expeditions.events.escorte_debut.description",
        choices: [
            { textKey: "expeditions.events.escorte_debut.choice1_text", test: null, success: { textKey: "expeditions.events.escorte_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'ESCORTE_CHEMIN' } }
        ]
    },
    'ESCORTE_CHEMIN': {
        descriptionKey: "expeditions.events.escorte_chemin.description",
        choices: [
            { textKey: "expeditions.events.escorte_chemin.choice1_text", test: { stat: 'Défense', value: 8 }, success: { textKey: "expeditions.events.escorte_chemin.choice1_success_text", combat: { enemies: ['BANDIT'], winEvent: 'ESCORTE_DESTINATION', lossEvent: 'ESCORTE_FIN_ECHEC' } }, failure: { textKey: "expeditions.events.escorte_chemin.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 25 }], nextEvent: 'ESCORTE_REPARATION' } },
            { textKey: "expeditions.events.escorte_chemin.choice2_text", test: null, success: { textKey: "expeditions.events.escorte_chemin.choice2_success_text", combat: { enemies: ['BANDIT'], winEvent: 'ESCORTE_DESTINATION', lossEvent: 'ESCORTE_FIN_ECHEC' } } }
        ]
    },
    'ESCORTE_REPARATION': {
        descriptionKey: "expeditions.events.escorte_reparation.description",
        choices: [
            { textKey: "expeditions.events.escorte_reparation.choice1_text", test: { stat: 'resources.bois', value: 50 }, success: { textKey: "expeditions.events.escorte_reparation.choice1_success_text", effects: [{ type: 'resource_loss', kind: 'bois', amount: 50 }], nextEvent: 'ESCORTE_DESTINATION' }, failure: { textKey: "expeditions.events.escorte_reparation.choice1_failure_text", effects: [], nextEvent: 'ESCORTE_FIN_ECHEC' } }
        ]
    },
    'ESCORTE_DESTINATION': {
        descriptionKey: "expeditions.events.escorte_destination.description",
        choices: [
            { textKey: "expeditions.events.escorte_destination.choice1_text", test: null, success: { textKey: "expeditions.events.escorte_destination.choice1_success_text", nextEvent: 'ESCORTE_FIN_SUCCES' } }
        ]
    },
    'ESCORTE_FIN_SUCCES': { descriptionKey: "expeditions.events.escorte_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 400 }, { type: 'resource', kind: 'metal', amount: 50 }, { type: 'resource', kind: 'tissu', amount: 50 }] },
    'ESCORTE_FIN_ECHEC': { descriptionKey: "expeditions.events.escorte_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -150 }, { type: 'resource', kind: 'metal', amount: -25 }] },
    'MARAIS_DEBUT': {
        descriptionKey: "expeditions.events.marais_debut.description",
        choices: [
            { textKey: "expeditions.events.marais_debut.choice1_text", test: { stat: 'Intelligence', value: 15 }, success: { textKey: "expeditions.events.marais_debut.choice1_success_text", effects: [], nextEvent: 'MARAIS_CABANE' }, failure: { textKey: "expeditions.events.marais_debut.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 15 }], waitTime: 8, nextEvent: 'MARAIS_FIN_ECHEC' } },
            { textKey: "expeditions.events.marais_debut.choice2_text", test: { stat: 'Vie', value: 12 }, success: { textKey: "expeditions.events.marais_debut.choice2_success_text", effects: [{ type: 'hp_loss_flat', value: 25 }], nextEvent: 'MARAIS_CABANE' }, failure: { textKey: "expeditions.events.marais_debut.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 30 }], nextEvent: 'MARAIS_FIN_ECHEC' } }
        ]
    },
    'MARAIS_CABANE': {
        descriptionKey: "expeditions.events.marais_cabane.description",
        choices: [
            { textKey: "expeditions.events.marais_cabane.choice1_text", test: null, success: { textKey: "expeditions.events.marais_cabane.choice1_success_text", effects: [], nextEvent: 'MARAIS_FIN_SUCCES' } },
            { textKey: "expeditions.events.marais_cabane.choice2_text", test: null, success: { textKey: "expeditions.events.marais_cabane.choice2_success_text", effects: [], nextEvent: 'MARAIS_FIN_MOYEN' } }
        ]
    },
    'MARAIS_FIN_SUCCES': { descriptionKey: "expeditions.events.marais_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 300 }, { type: 'resource', kind: 'tissu', amount: 80 }] },
    'MARAIS_FIN_MOYEN': { descriptionKey: "expeditions.events.marais_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 150 }, { type: 'resource', kind: 'tissu', amount: 40 }] },
    'MARAIS_FIN_ECHEC': { descriptionKey: "expeditions.events.marais_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 40 }, { type: 'resource', kind: 'tissu', amount: -10 }] },
    'MINE_DEBUT': {
        descriptionKey: "expeditions.events.mine_debut.description",
        choices: [
            { textKey: "expeditions.events.mine_debut.choice1_text", test: null, success: { textKey: "expeditions.events.mine_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'MINE_DEGAGEMENT' } }
        ]
    },
    'MINE_DEGAGEMENT': {
        descriptionKey: "expeditions.events.mine_degagement.description",
        choices: [
            { textKey: "expeditions.events.mine_degagement.choice1_text", test: { stat: 'Force', value: 20 }, success: { textKey: "expeditions.events.mine_degagement.choice1_success_text", effects: [], nextEvent: 'MINE_CREATURES' }, failure: { textKey: "expeditions.events.mine_degagement.choice1_failure_text", effects: [], waitTime: 20, nextEvent: 'MINE_CREATURES' } }
        ]
    },
    'MINE_CREATURES': {
        descriptionKey: "expeditions.events.mine_creatures.description",
        choices: [
            { textKey: "expeditions.events.mine_creatures.choice1_text", test: null, success: { textKey: "expeditions.events.mine_creatures.choice1_success_text", combat: { enemies: ['INSECTE_MINEUR'], winEvent: 'MINE_FIN_SUCCES', lossEvent: 'MINE_FIN_ECHEC' } } }
        ]
    },
    'MINE_FIN_SUCCES': { descriptionKey: "expeditions.events.mine_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 500 }, { type: 'resource', kind: 'metal', amount: 120 }] },
    'MINE_FIN_ECHEC': { descriptionKey: "expeditions.events.mine_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -100 }] },
    'BOIS_DEBUT': {
        descriptionKey: "expeditions.events.bois_debut.description",
        choices: [
            { textKey: "expeditions.events.bois_debut.choice1_text", test: null, success: { textKey: "expeditions.events.bois_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'BOIS_SOURCE' } }
        ]
    },
    'BOIS_SOURCE': {
        descriptionKey: "expeditions.events.bois_source.description",
        choices: [
            { textKey: "expeditions.events.bois_source.choice1_text", test: null, success: { textKey: "expeditions.events.bois_source.choice1_success_text", combat: { enemies: ['SPECTRE_GEMISSANT'], winEvent: 'BOIS_FIN_SUCCES', lossEvent: 'BOIS_FIN_ECHEC' } } },
            { textKey: "expeditions.events.bois_source.choice2_text", test: { stat: 'Intelligence', value: 18 }, success: { textKey: "expeditions.events.bois_source.choice2_success_text", effects: [], nextEvent: 'BOIS_FIN_PURIFIE' }, failure: { textKey: "expeditions.events.bois_source.choice2_failure_text", effects: [{ type: 'hp_loss_flat', value: 20 }], combat: { enemies: ['SPECTRE_GEMISSANT'], winEvent: 'BOIS_FIN_SUCCES', lossEvent: 'BOIS_FIN_ECHEC' } } }
        ]
    },
    'BOIS_FIN_SUCCES': { descriptionKey: "expeditions.events.bois_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 450 }, { type: 'resource', kind: 'bois', amount: 100 }, { type: 'fragments_gain', amount: 1 }] },
    'BOIS_FIN_PURIFIE': { descriptionKey: "expeditions.events.bois_fin_purifie.description", isEnd: true, rewards: [{ type: 'xp', amount: 600 }, { type: 'resource', kind: 'bois', amount: 120 }] },
    'BOIS_FIN_ECHEC': { descriptionKey: "expeditions.events.bois_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 75 }] },
    'PONT_DEBUT': {
        descriptionKey: "expeditions.events.pont_debut.description",
        choices: [
            { textKey: "expeditions.events.pont_debut.choice1_text", test: { stat: 'Intelligence', value: 12 }, success: { textKey: "expeditions.events.pont_debut.choice1_success_text", effects: [], nextEvent: 'PONT_CHOIX' }, failure: { textKey: "expeditions.events.pont_debut.choice1_failure_text", effects: [], nextEvent: 'PONT_CHOIX' } }
        ]
    },
    'PONT_CHOIX': {
        descriptionKey: "expeditions.events.pont_choix.description",
        choices: [
            { textKey: "expeditions.events.pont_choix.choice1_text", test: { stat: 'Force', value: 22 }, success: { textKey: "expeditions.events.pont_choix.choice1_success_text", effects: [], nextEvent: 'PONT_FIN_REPARE' }, failure: { textKey: "expeditions.events.pont_choix.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 30 }], nextEvent: 'PONT_FIN_ECHEC' } },
            { textKey: "expeditions.events.pont_choix.choice2_text", test: { stat: 'Intelligence', value: 15 }, success: { textKey: "expeditions.events.pont_choix.choice2_success_text", effects: [], nextEvent: 'PONT_BANDITS' }, failure: { textKey: "expeditions.events.pont_choix.choice2_failure_text", effects: [], nextEvent: 'PONT_FIN_ECHEC' } }
        ]
    },
    'PONT_BANDITS': {
        descriptionKey: "expeditions.events.pont_bandits.description",
        choices: [
            { textKey: "expeditions.events.pont_bandits.choice1_text", test: null, success: { combat: { enemies: ['BANDIT'], winEvent: 'PONT_FIN_REPARE', lossEvent: 'PONT_FIN_ECHEC' } } }
        ]
    },
    'PONT_FIN_REPARE': { descriptionKey: "expeditions.events.pont_fin_repare.description", isEnd: true, rewards: [{ type: 'xp', amount: 600 }, { type: 'resource', kind: 'metal', amount: 80 }, { type: 'resource', kind: 'bois', amount: 80 }] },
    'PONT_FIN_ECHEC': { descriptionKey: "expeditions.events.pont_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -150 }] },
    'CONTRAT_HERBO_DEBUT': {
        descriptionKey: "expeditions.events.contrat_herbo_debut.description",
        choices: [
            { textKey: "expeditions.events.contrat_herbo_debut.choice1_text", test: null, success: { textKey: "expeditions.events.contrat_herbo_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'CONTRAT_HERBO_ASCENSION' } }
        ]
    },
    'CONTRAT_HERBO_ASCENSION': {
        descriptionKey: "expeditions.events.contrat_herbo_ascension.description",
        choices: [
            { textKey: "expeditions.events.contrat_herbo_ascension.choice1_text", test: { stat: 'Agilité', value: 20 }, success: { textKey: "expeditions.events.contrat_herbo_ascension.choice1_success_text", effects: [], nextEvent: 'CONTRAT_HERBO_SOMMET' }, failure: { textKey: "expeditions.events.contrat_herbo_ascension.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 25 }], nextEvent: 'CONTRAT_HERBO_SOMMET' } }
        ]
    },
    'CONTRAT_HERBO_SOMMET': {
        descriptionKey: "expeditions.events.contrat_herbo_sommet.description",
        choices: [
            { textKey: "expeditions.events.contrat_herbo_sommet.choice1_text", test: null, success: { combat: { enemies: ['HARPIE'], winEvent: 'CONTRAT_HERBO_FIN_SUCCES', lossEvent: 'CONTRAT_HERBO_FIN_ECHEC' } } },
            { textKey: "expeditions.events.contrat_herbo_sommet.choice2_text", test: { stat: 'Chance', value: 18 }, success: { textKey: "expeditions.events.contrat_herbo_sommet.choice2_success_text", effects: [], nextEvent: 'CONTRAT_HERBO_FIN_SUCCES' }, failure: { textKey: "expeditions.events.contrat_herbo_sommet.choice2_failure_text", effects: [], combat: { enemies: ['HARPIE'], winEvent: 'CONTRAT_HERBO_FIN_SUCCES', lossEvent: 'CONTRAT_HERBO_FIN_ECHEC' } } }
        ]
    },
    'CONTRAT_HERBO_FIN_SUCCES': { descriptionKey: "expeditions.events.contrat_herbo_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 400 }, { type: 'resource', kind: 'tissu', amount: 100 }] },
    'CONTRAT_HERBO_FIN_ECHEC': { descriptionKey: "expeditions.events.contrat_herbo_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 80 }] },
    'CRYPTE_AGITEE_DEBUT': {
        descriptionKey: "expeditions.events.crypte_agitee_debut.description",
        choices: [
            { textKey: "expeditions.events.crypte_agitee_debut.choice1_text", test: null, success: { textKey: "expeditions.events.crypte_agitee_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'CRYPTE_AGITEE_SALLE' } }
        ]
    },
    'CRYPTE_AGITEE_SALLE': {
        descriptionKey: "expeditions.events.crypte_agitee_salle.description",
        choices: [
            { textKey: "expeditions.events.crypte_agitee_salle.choice1_text", test: null, success: { textKey: "expeditions.events.crypte_agitee_salle.choice1_success_text", combat: { enemies: ['SQUELETTE_GUERRIER'], winEvent: 'CRYPTE_AGITEE_SOURCE', lossEvent: 'CRYPTE_AGITEE_FIN_ECHEC' } } }
        ]
    },
    'CRYPTE_AGITEE_SOURCE': {
        descriptionKey: "expeditions.events.crypte_agitee_source.description",
        choices: [
            { textKey: "expeditions.events.crypte_agitee_source.choice1_text", test: { stat: 'Force', value: 15 }, success: { textKey: "expeditions.events.crypte_agitee_source.choice1_success_text", effects: [], nextEvent: 'CRYPTE_AGITEE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.crypte_agitee_source.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 25 }], nextEvent: 'CRYPTE_AGITEE_FIN_ECHEC' } }
        ]
    },
    'CRYPTE_AGITEE_FIN_SUCCES': { descriptionKey: "expeditions.events.crypte_agitee_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 550 }, { type: 'resource', kind: 'metal', amount: 90 }, { type: 'fragments_gain', amount: 2 }] },
    'CRYPTE_AGITEE_FIN_ECHEC': { descriptionKey: "expeditions.events.crypte_agitee_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 100 }] },
    'TOUR_GARDE_DEBUT': {
        descriptionKey: "expeditions.events.tour_garde_debut.description",
        choices: [
            { textKey: "expeditions.events.tour_garde_debut.choice1_text", test: null, success: { textKey: "expeditions.events.tour_garde_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'TOUR_GARDE_APPROCHE' } }
        ]
    },
    'TOUR_GARDE_APPROCHE': {
        descriptionKey: "expeditions.events.tour_garde_approche.description",
        choices: [
            { textKey: "expeditions.events.tour_garde_approche.choice1_text", test: null, success: { textKey: "expeditions.events.tour_garde_approche.choice1_success_text", combat: { enemies: ['BANDIT'], winEvent: 'TOUR_GARDE_ETAGE', lossEvent: 'TOUR_GARDE_FIN_ECHEC' } } },
            { textKey: "expeditions.events.tour_garde_approche.choice2_text", test: { stat: 'Agilité', value: 18 }, success: { textKey: "expeditions.events.tour_garde_approche.choice2_success_text", effects: [], nextEvent: 'TOUR_GARDE_ETAGE' }, failure: { textKey: "expeditions.events.tour_garde_approche.choice2_failure_text", effects: [{ type: 'hp_loss_flat', value: 15 }], combat: { enemies: ['BANDIT', 'GOBELIN_FRONDEUR'], winEvent: 'TOUR_GARDE_ETAGE', lossEvent: 'TOUR_GARDE_FIN_ECHEC' } } }
        ]
    },
    'TOUR_GARDE_ETAGE': {
        descriptionKey: "expeditions.events.tour_garde_etage.description",
        choices: [
            { textKey: "expeditions.events.tour_garde_etage.choice1_text", test: null, success: { textKey: "expeditions.events.tour_garde_etage.choice1_success_text", combat: { enemies: ['CHEF_BANDIT'], winEvent: 'TOUR_GARDE_FIN_SUCCES', lossEvent: 'TOUR_GARDE_FIN_ECHEC' } } }
        ]
    },
    'TOUR_GARDE_FIN_SUCCES': { descriptionKey: "expeditions.events.tour_garde_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 480 }, { type: 'resource', kind: 'bois', amount: 120 }, { type: 'resource', kind: 'metal', amount: 40 }] },
    'TOUR_GARDE_FIN_ECHEC': { descriptionKey: "expeditions.events.tour_garde_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 90 }] },
    'GEYSER_DEBUT': {
        descriptionKey: "expeditions.events.geyser_debut.description",
        choices: [
            { textKey: "expeditions.events.geyser_debut.choice1_text", test: null, success: { textKey: "expeditions.events.geyser_debut.choice1_success_text", nextEvent: 'GEYSER_ETUDE' } }
        ]
    },
    'GEYSER_ETUDE': {
        descriptionKey: "expeditions.events.geyser_etude.description",
        choices: [
            { textKey: "expeditions.events.geyser_etude.choice1_text", test: { stat: 'Intelligence', value: 20 }, success: { textKey: "expeditions.events.geyser_etude.choice1_success_text", effects: [], nextEvent: 'GEYSER_ACTION' }, failure: { textKey: "expeditions.events.geyser_etude.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 30 }], nextEvent: 'GEYSER_FIN_ECHEC' } }
        ]
    },
    'GEYSER_ACTION': {
        descriptionKey: "expeditions.events.geyser_action.description",
        choices: [
            { textKey: "expeditions.events.geyser_action.choice1_text", test: { stat: 'Défense', value: 10 }, success: { textKey: "expeditions.events.geyser_action.choice1_success_text", effects: [], nextEvent: 'GEYSER_FIN_SUCCES' }, failure: { textKey: "expeditions.events.geyser_action.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 40 }], nextEvent: 'GEYSER_FIN_ECHEC' } }
        ]
    },
    'GEYSER_FIN_SUCCES': { descriptionKey: "expeditions.events.geyser_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 420 }, { type: 'resource', kind: 'metal', amount: 110 }] },
    'GEYSER_FIN_ECHEC': { descriptionKey: "expeditions.events.geyser_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 50 }] },
    'TROLL_PONT_DEBUT': {
        descriptionKey: "expeditions.events.troll_pont_debut.description",
        choices: [
            { textKey: "expeditions.events.troll_pont_debut.choice1_text", test: null, success: { textKey: "expeditions.events.troll_pont_debut.choice1_success_text", combat: { enemies: ['ORC_BERSERKER'], winEvent: 'TROLL_PONT_FIN_SUCCES', lossEvent: 'TROLL_PONT_FIN_ECHEC' } } },
            { textKey: "expeditions.events.troll_pont_debut.choice2_text", test: { stat: 'Intelligence', value: 16 }, success: { textKey: "expeditions.events.troll_pont_debut.choice2_success_text", effects: [], nextEvent: 'TROLL_PONT_FIN_DUPE' }, failure: { textKey: "expeditions.events.troll_pont_debut.choice2_failure_text", effects: [], combat: { enemies: ['ORC_BERSERKER'], winEvent: 'TROLL_PONT_FIN_SUCCES', lossEvent: 'TROLL_PONT_FIN_ECHEC' } } }
        ]
    },
    'TROLL_PONT_FIN_SUCCES': { descriptionKey: "expeditions.events.troll_pont_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 600 }, { type: 'resource', kind: 'bois', amount: 80 }, { type: 'resource', kind: 'metal', amount: 80 }] },
    'TROLL_PONT_FIN_DUPE': { descriptionKey: "expeditions.events.troll_pont_fin_dupe.description", isEnd: true, rewards: [{ type: 'xp', amount: 450 }, { type: 'resource', kind: 'bois', amount: 40 }, { type: 'resource', kind: 'metal', amount: 40 }] },
    'TROLL_PONT_FIN_ECHEC': { descriptionKey: "expeditions.events.troll_pont_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -100 }] },
    'CULTISTES_BOIS_DEBUT': {
        descriptionKey: "expeditions.events.cultistes_bois_debut.description",
        choices: [
            { textKey: "expeditions.events.cultistes_bois_debut.choice1_text", test: null, success: { textKey: "expeditions.events.cultistes_bois_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'CULTISTES_BOIS_CAMP' } }
        ]
    },
    'CULTISTES_BOIS_CAMP': {
        descriptionKey: "expeditions.events.cultistes_bois_camp.description",
        choices: [
            { textKey: "expeditions.events.cultistes_bois_camp.choice1_text", test: { stat: 'Intelligence', value: 17 }, success: { textKey: "expeditions.events.cultistes_bois_camp.choice1_success_text", effects: [], nextEvent: 'CULTISTES_BOIS_SABOTAGE' }, failure: { textKey: "expeditions.events.cultistes_bois_camp.choice1_failure_text", effects: [], combat: { enemies: ['CULTISTE_ZELOTE'], winEvent: 'CULTISTES_BOIS_FIN_SUCCES', lossEvent: 'CULTISTES_BOIS_FIN_ECHEC' } } },
            { textKey: "expeditions.events.cultistes_bois_camp.choice2_text", test: { stat: 'Agilité', value: 16 }, success: { textKey: "expeditions.events.cultistes_bois_camp.choice2_success_text", effects: [], combat: { enemies: ['CULTISTE_ZELOTE'], winEvent: 'CULTISTES_BOIS_FIN_SUCCES', lossEvent: 'CULTISTES_BOIS_FIN_ECHEC' } }, failure: { textKey: "expeditions.events.cultistes_bois_camp.choice2_failure_text", effects: [], combat: { enemies: ['CULTISTE_ZELOTE'], winEvent: 'CULTISTES_BOIS_FIN_SUCCES', lossEvent: 'CULTISTES_BOIS_FIN_ECHEC' } } }
        ]
    },
    'CULTISTES_BOIS_SABOTAGE': {
        descriptionKey: "expeditions.events.cultistes_bois_sabotage.description",
        choices: [
            { textKey: "expeditions.events.cultistes_bois_sabotage.choice1_text", test: { stat: 'Force', value: 15 }, success: { textKey: "expeditions.events.cultistes_bois_sabotage.choice1_success_text", effects: [], nextEvent: 'CULTISTES_BOIS_FIN_SUCCES' } },
            { textKey: "expeditions.events.cultistes_bois_sabotage.choice2_text", test: { stat: 'Intelligence', value: 20 }, success: { textKey: "expeditions.events.cultistes_bois_sabotage.choice2_success_text", effects: [], nextEvent: 'CULTISTES_BOIS_FIN_SUCCES' } }
        ]
    },
    'CULTISTES_BOIS_FIN_SUCCES': { descriptionKey: "expeditions.events.cultistes_bois_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 580 }, { type: 'resource', kind: 'tissu', amount: 150 }, { type: 'fragments_gain', amount: 1 }] },
    'CULTISTES_BOIS_FIN_ECHEC': { descriptionKey: "expeditions.events.cultistes_bois_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 120 }] },
    'COLLECTIONNEUR_DEBUT': {
        descriptionKey: "expeditions.events.collectionneur_debut.description",
        choices: [
            { textKey: "expeditions.events.collectionneur_debut.choice1_text", test: null, success: { textKey: "expeditions.events.collectionneur_debut.choice1_success_text", nextEvent: 'COLLECTIONNEUR_INFILTRATION' } }
        ]
    },
    'COLLECTIONNEUR_INFILTRATION': {
        descriptionKey: "expeditions.events.collectionneur_infiltration.description",
        choices: [
            { textKey: "expeditions.events.collectionneur_infiltration.choice1_text", test: { stat: 'Agilité', value: 19 }, success: { textKey: "expeditions.events.collectionneur_infiltration.choice1_success_text", effects: [], nextEvent: 'COLLECTIONNEUR_MANOIR' }, failure: { textKey: "expeditions.events.collectionneur_infiltration.choice1_failure_text", effects: [], nextEvent: 'COLLECTIONNEUR_FIN_ECHEC' } },
            { textKey: "expeditions.events.collectionneur_infiltration.choice2_text", test: { stat: 'Chance', value: 15, stat2: 'resources.tissu', value: 50 }, success: { textKey: "expeditions.events.collectionneur_infiltration.choice2_success_text", effects: [{ type: 'resource_loss', kind: 'tissu', amount: 50 }], nextEvent: 'COLLECTIONNEUR_MANOIR' }, failure: { textKey: "expeditions.events.collectionneur_infiltration.choice2_failure_text", effects: [], nextEvent: 'COLLECTIONNEUR_FIN_ECHEC' } }
        ]
    },
    'COLLECTIONNEUR_MANOIR': {
        descriptionKey: "expeditions.events.collectionneur_manoir.description",
        choices: [
            { textKey: "expeditions.events.collectionneur_manoir.choice1_text", test: { stat: 'Intelligence', value: 18 }, success: { textKey: "expeditions.events.collectionneur_manoir.choice1_success_text", effects: [], nextEvent: 'COLLECTIONNEUR_FIN_SUCCES' }, failure: { textKey: "expeditions.events.collectionneur_manoir.choice1_failure_text", effects: [], nextEvent: 'COLLECTIONNEUR_FIN_ECHEC' } }
        ]
    },
    'COLLECTIONNEUR_FIN_SUCCES': { descriptionKey: "expeditions.events.collectionneur_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 380 }, { type: 'resource', kind: 'tissu', amount: 200 }] },
    'COLLECTIONNEUR_FIN_ECHEC': { descriptionKey: "expeditions.events.collectionneur_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -200 }] },
    'FERME_SILENCE_DEBUT': {
        descriptionKey: "expeditions.events.ferme_silence_debut.description",
        choices: [
            { textKey: "expeditions.events.ferme_silence_debut.choice1_text", test: null, success: { textKey: "expeditions.events.ferme_silence_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'FERME_SILENCE_ENQUETE' } }
        ]
    },
    'FERME_SILENCE_ENQUETE': {
        descriptionKey: "expeditions.events.ferme_silence_enquete.description",
        choices: [
            { textKey: "expeditions.events.ferme_silence_enquete.choice1_text", test: null, success: { textKey: "expeditions.events.ferme_silence_enquete.choice1_success_text", nextEvent: 'FERME_SILENCE_GRANGE' } }
        ]
    },
    'FERME_SILENCE_GRANGE': {
        descriptionKey: "expeditions.events.ferme_silence_grange.description",
        choices: [
            { textKey: "expeditions.events.ferme_silence_grange.choice1_text", test: null, success: { combat: { enemies: ['SANGLIER_FURIEUX'], winEvent: 'FERME_SILENCE_FIN_SUCCES', lossEvent: 'FERME_SILENCE_FIN_ECHEC' } } }
        ]
    },
    'FERME_SILENCE_FIN_SUCCES': { descriptionKey: "expeditions.events.ferme_silence_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 450 }, { type: 'resource', kind: 'bois', amount: 150 }] },
    'FERME_SILENCE_FIN_ECHEC': { descriptionKey: "expeditions.events.ferme_silence_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 60 }] },
    'PUITS_SOUHAITS_DEBUT': {
        descriptionKey: "expeditions.events.puits_souhaits_debut.description",
        choices: [
            { textKey: "expeditions.events.puits_souhaits_debut.choice1_text", test: null, success: { textKey: "expeditions.events.puits_souhaits_debut.choice1_success_text", nextEvent: 'PUITS_SOUHAITS_ESPRIT' } }
        ]
    },
    'PUITS_SOUHAITS_ESPRIT': {
        descriptionKey: "expeditions.events.puits_souhaits_esprit.description",
        choices: [
            { textKey: "expeditions.events.puits_souhaits_esprit.choice1_text", test: null, success: { combat: { enemies: ['SPECTRE_GEMISSANT'], winEvent: 'PUITS_SOUHAITS_FIN_SUCCES', lossEvent: 'PUITS_SOUHAITS_FIN_ECHEC' } } },
            { textKey: "expeditions.events.puits_souhaits_esprit.choice2_text", test: { stat: 'Chance', value: 20 }, success: { textKey: "expeditions.events.puits_souhaits_esprit.choice2_success_text", effects: [], nextEvent: 'PUITS_SOUHAITS_FIN_MOYEN' }, failure: { textKey: "expeditions.events.puits_souhaits_esprit.choice2_failure_text", effects: [], combat: { enemies: ['SPECTRE_GEMISSANT'], winEvent: 'PUITS_SOUHAITS_FIN_SUCCES', lossEvent: 'PUITS_SOUHAITS_FIN_ECHEC' } } }
        ]
    },
    'PUITS_SOUHAITS_FIN_SUCCES': { descriptionKey: "expeditions.events.puits_souhaits_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 500 }, { type: 'resource', kind: 'metal', amount: 100 }, { type: 'fragments_gain', amount: 5 }] },
    'PUITS_SOUHAITS_FIN_MOYEN': { descriptionKey: "expeditions.events.puits_souhaits_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 350 }, { type: 'resource', kind: 'metal', amount: 70 }] },
    'PUITS_SOUHAITS_FIN_ECHEC': { descriptionKey: "expeditions.events.puits_souhaits_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 50 }] },
    'BETE_PLAINES_DEBUT': {
        descriptionKey: "expeditions.events.bete_plaines_debut.description",
        choices: [
            { textKey: "expeditions.events.bete_plaines_debut.choice1_text", test: null, success: { textKey: "expeditions.events.bete_plaines_debut.choice1_success_text", triggersRandomEvent: true, waitTime: 15, nextEvent: 'BETE_PLAINES_COMBAT' } }
        ]
    },
    'BETE_PLAINES_COMBAT': {
        descriptionKey: "expeditions.events.bete_plaines_combat.description",
        choices: [
            { textKey: "expeditions.events.bete_plaines_combat.choice1_text", test: { stat: 'Agilité', value: 22 }, success: { textKey: "expeditions.events.bete_plaines_combat.choice1_success_text", effects: [], nextEvent: 'BETE_PLAINES_FIN_SUCCES' }, failure: { textKey: "expeditions.events.bete_plaines_combat.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 35 }], nextEvent: 'BETE_PLAINES_FIN_ECHEC' } },
            { textKey: "expeditions.events.bete_plaines_combat.choice2_text", test: { stat: 'Force', value: 20, stat2: 'Défense', value: 10 }, success: { textKey: "expeditions.events.bete_plaines_combat.choice2_success_text", effects: [{ type: 'hp_loss_percent', value: 15 }], nextEvent: 'BETE_PLAINES_FIN_SUCCES' }, failure: { textKey: "expeditions.events.bete_plaines_combat.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'BETE_PLAINES_FIN_ECHEC' } }
        ]
    },
    'BETE_PLAINES_FIN_SUCCES': { descriptionKey: "expeditions.events.bete_plaines_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 520 }, { type: 'resource', kind: 'tissu', amount: 130 }] },
    'BETE_PLAINES_FIN_ECHEC': { descriptionKey: "expeditions.events.bete_plaines_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 100 }] },

// ** RARES **
    'PRIME_DEBUT': {
        descriptionKey: "expeditions.events.prime_debut.description",
        choices: [
            { textKey: "expeditions.events.prime_debut.choice1_text", test: null, success: { textKey: "expeditions.events.prime_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'PRIME_APPROCHE' } }
        ]
    },
    'PRIME_APPROCHE': {
        descriptionKey: "expeditions.events.prime_approche.description",
        choices: [
            { textKey: "expeditions.events.prime_approche.choice1_text", test: { stat: 'Agilité', value: 35 }, success: { textKey: "expeditions.events.prime_approche.choice1_success_text", effects: [{ type: 'hp_loss_percent', value: 20 }], nextEvent: 'PRIME_COMBAT_SURPRISE' }, failure: { textKey: "expeditions.events.prime_approche.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 40 }], combat: { enemies: ['BANDIT'], winEvent: 'PRIME_CHEF', lossEvent: 'PRIME_FIN_ECHEC' } } },
            { textKey: "expeditions.events.prime_approche.choice2_text", test: null, success: { textKey: "expeditions.events.prime_approche.choice2_success_text", combat: { enemies: ['BANDIT'], winEvent: 'PRIME_CHEF', lossEvent: 'PRIME_FIN_ECHEC' } } }
        ]
    },
    'PRIME_COMBAT_SURPRISE': {
        descriptionKey: "expeditions.events.prime_combat_surprise.description",
        choices: [
            { textKey: "expeditions.events.prime_combat_surprise.choice1_text", test: null, success: { textKey: "expeditions.events.prime_combat_surprise.choice1_success_text", effects: [], nextEvent: 'PRIME_CHEF' } }
        ]
    },
    'PRIME_CHEF': {
        descriptionKey: "expeditions.events.prime_chef.description",
        choices: [
            { textKey: "expeditions.events.prime_chef.choice1_text", test: { stat: 'Agilité', value: 35 }, success: { textKey: "expeditions.events.prime_chef.choice1_success_text", effects: [], nextEvent: 'PRIME_FIN_SUCCES' }, failure: { textKey: "expeditions.events.prime_chef.choice1_failure_text", combat: { enemies: ['CHEF_BANDIT'], winEvent: 'PRIME_FIN_SUCCES', lossEvent: 'PRIME_FIN_ECHEC' } } },
            { textKey: "expeditions.events.prime_chef.choice2_text", test: null, success: { textKey: "expeditions.events.prime_chef.choice2_success_text", combat: { enemies: ['CHEF_BANDIT', 'BANDIT', 'BANDIT'], winEvent: 'PRIME_FIN_SUCCES', lossEvent: 'PRIME_FIN_ECHEC' } } }
        ]
    },
    'PRIME_FIN_SUCCES': { descriptionKey: "expeditions.events.prime_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1200 }, { type: 'resource', kind: 'metal', amount: 200 }, { type: 'resource', kind: 'bois', amount: 150 }, { type: 'fragments_gain', amount: 10 }] },
    'PRIME_FIN_ECHEC': { descriptionKey: "expeditions.events.prime_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -200 }, { type: 'resource', kind: 'metal', amount: -50 }] },
    'MONTAGNE_DEBUT': {
        descriptionKey: "expeditions.events.montagne_debut.description",
        choices: [
            { textKey: "expeditions.events.montagne_debut.choice1_text", test: null, success: { textKey: "expeditions.events.montagne_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'MONTAGNE_ASCENSION' } }
        ]
    },
    'MONTAGNE_ASCENSION': {
        descriptionKey: "expeditions.events.montagne_ascension.description",
        choices: [
            { textKey: "expeditions.events.montagne_ascension.choice1_text", test: { stat: 'Défense', value: 15 }, success: { textKey: "expeditions.events.montagne_ascension.choice1_success_text", effects: [], nextEvent: 'MONTAGNE_SOMMET' }, failure: { textKey: "expeditions.events.montagne_ascension.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'MONTAGNE_SOMMET' } },
            { textKey: "expeditions.events.montagne_ascension.choice2_text", test: { stat: 'Agilité', value: 30 }, success: { textKey: "expeditions.events.montagne_ascension.choice2_success_text", effects: [], nextEvent: 'MONTAGNE_SOMMET' }, failure: { textKey: "expeditions.events.montagne_ascension.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 35 }], nextEvent: 'MONTAGNE_SOMMET' } }
        ]
    },
    'MONTAGNE_SOMMET': {
        descriptionKey: "expeditions.events.montagne_sommet.description",
        choices: [
            { textKey: "expeditions.events.montagne_sommet.choice1_text", test: null, success: { combat: { enemies: ['ORC_BERSERKER'], winEvent: 'MONTAGNE_FIN_SUCCES', lossEvent: 'MONTAGNE_FIN_ECHEC' } } }
        ]
    },
    'MONTAGNE_FIN_SUCCES': { descriptionKey: "expeditions.events.montagne_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1500 }, { type: 'resource', kind: 'metal', amount: 300 }] },
    'MONTAGNE_FIN_ECHEC': { descriptionKey: "expeditions.events.montagne_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 250 }] },
    'CRYPTE_DEBUT': {
        descriptionKey: "expeditions.events.crypte_debut.description",
        choices: [
            { textKey: "expeditions.events.crypte_debut.choice1_text", test: null, success: { textKey: "expeditions.events.crypte_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'CRYPTE_SALLE_PIEGEE' } }
        ]
    },
    'CRYPTE_SALLE_PIEGEE': {
        descriptionKey: "expeditions.events.crypte_salle_piegee.description",
        choices: [
            { textKey: "expeditions.events.crypte_salle_piegee.choice1_text", test: { stat: 'Chance', value: 30 }, success: { textKey: "expeditions.events.crypte_salle_piegee.choice1_success_text", effects: [], nextEvent: 'CRYPTE_ARTEFACT' }, failure: { textKey: "expeditions.events.crypte_salle_piegee.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 30 }], nextEvent: 'CRYPTE_ARTEFACT' } }
        ]
    },
    'CRYPTE_ARTEFACT': {
        descriptionKey: "expeditions.events.crypte_artefact.description",
        choices: [
            { textKey: "expeditions.events.crypte_artefact.choice1_text", test: null, success: { textKey: "expeditions.events.crypte_artefact.choice1_success_text", effects: [{ type: 'hp_loss_flat', value: 35 }], nextEvent: 'CRYPTE_FIN_SUCCES' } },
            { textKey: "expeditions.events.crypte_artefact.choice2_text", test: { stat: 'Intelligence', value: 35 }, success: { textKey: "expeditions.events.crypte_artefact.choice2_success_text", effects: [], nextEvent: 'CRYPTE_FIN_MOYEN' }, failure: { textKey: "expeditions.events.crypte_artefact.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'CRYPTE_FIN_ECHEC' } }
        ]
    },
    'CRYPTE_FIN_SUCCES': { descriptionKey: "expeditions.events.crypte_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1000 }, { type: 'resource', kind: 'tissu', amount: 250 }, { type: 'fragments_gain', amount: 15 }] },
    'CRYPTE_FIN_MOYEN': { descriptionKey: "expeditions.events.crypte_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 1200 }, { type: 'resource', kind: 'tissu', amount: 200 }] },
    'CRYPTE_FIN_ECHEC': { descriptionKey: "expeditions.events.crypte_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 150 }] },
    'CARAVANE_DEBUT': {
        descriptionKey: "expeditions.events.caravane_debut.description",
        choices: [
            { textKey: "expeditions.events.caravane_debut.choice1_text", test: null, success: { textKey: "expeditions.events.caravane_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'CARAVANE_PISTES' } }
        ]
    },
    'CARAVANE_PISTES': {
        descriptionKey: "expeditions.events.caravane_pistes.description",
        choices: [
            { textKey: "expeditions.events.caravane_pistes.choice1_text", test: null, success: { textKey: "expeditions.events.caravane_pistes.choice1_success_text", combat: { enemies: ['ORC_BERSERKER'], winEvent: 'CARAVANE_FIN_SUCCES', lossEvent: 'CARAVANE_FIN_ECHEC' } } },
            { textKey: "expeditions.events.caravane_pistes.choice2_text", test: { stat: 'Intelligence', value: 30 }, success: { textKey: "expeditions.events.caravane_pistes.choice2_success_text", combat: { enemies: ['CHEF_BANDIT'], winEvent: 'CARAVANE_FIN_SUCCES', lossEvent: 'CARAVANE_FIN_ECHEC' } }, failure: { textKey: "expeditions.events.caravane_pistes.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 35 }], combat: { enemies: ['BANDIT'], winEvent: 'CARAVANE_FIN_SUCCES', lossEvent: 'CARAVANE_FIN_ECHEC' } } }
        ]
    },
    'CARAVANE_FIN_SUCCES': { descriptionKey: "expeditions.events.caravane_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1800 }, { type: 'resource', kind: 'tissu', amount: 180 }, { type: 'resource', kind: 'metal', amount: 180 }] },
    'CARAVANE_FIN_ECHEC': { descriptionKey: "expeditions.events.caravane_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -500 }] },
    'TEMPLE_DEBUT': {
        descriptionKey: "expeditions.events.temple_debut.description",
        choices: [
            { textKey: "expeditions.events.temple_debut.choice1_text", test: null, success: { textKey: "expeditions.events.temple_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'TEMPLE_SALLE_PIEGEE' } }
        ]
    },
    'TEMPLE_SALLE_PIEGEE': {
        descriptionKey: "expeditions.events.temple_salle_piegee.description",
        choices: [
            { textKey: "expeditions.events.temple_salle_piegee.choice1_text", test: { stat: 'Agilité', value: 38 }, success: { textKey: "expeditions.events.temple_salle_piegee.choice1_success_text", effects: [], nextEvent: 'TEMPLE_AUTEL' }, failure: { textKey: "expeditions.events.temple_salle_piegee.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'TEMPLE_AUTEL' } }
        ]
    },
    'TEMPLE_AUTEL': {
        descriptionKey: "expeditions.events.temple_autel.description",
        choices: [
            { textKey: "expeditions.events.temple_autel.choice1_text", test: { stat: 'Intelligence', value: 35 }, success: { textKey: "expeditions.events.temple_autel.choice1_success_text", effects: [], combat: { enemies: ['ELEMENTAIRE_EAU'], winEvent: 'TEMPLE_FIN_SUCCES', lossEvent: 'TEMPLE_FIN_ECHEC' } } },
            { textKey: "expeditions.events.temple_autel.choice2_text", test: null, success: { textKey: "expeditions.events.temple_autel.choice2_success_text", combat: { enemies: ['ELEMENTAIRE_EAU'], winEvent: 'TEMPLE_FIN_SUCCES', lossEvent: 'TEMPLE_FIN_ECHEC' } } }
        ]
    },
    'TEMPLE_FIN_SUCCES': { descriptionKey: "expeditions.events.temple_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1600 }, { type: 'resource', kind: 'metal', amount: 250 }, { type: 'fragments_gain', amount: 5 }] },
    'TEMPLE_FIN_ECHEC': { descriptionKey: "expeditions.events.temple_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 200 }] },
    'ARENE_DEBUT': {
        descriptionKey: "expeditions.events.arene_debut.description",
        choices: [
            { textKey: "expeditions.events.arene_debut.choice1_text", test: null, success: { combat: { enemies: ['SANGLIER_FURIEUX'], winEvent: 'ARENE_AGILITE', lossEvent: 'ARENE_FIN_ECHEC' } } }
        ]
    },
    'ARENE_AGILITE': {
        descriptionKey: "expeditions.events.arene_agilite.description",
        choices: [
            { textKey: "expeditions.events.arene_agilite.choice1_text", test: { stat: 'Agilité', value: 32 }, success: { textKey: "expeditions.events.arene_agilite.choice1_success_text", effects: [], nextEvent: 'ARENE_FINALE' }, failure: { textKey: "expeditions.events.arene_agilite.choice1_failure_text", effects: [], nextEvent: 'ARENE_FIN_ECHEC' } }
        ]
    },
    'ARENE_FINALE': {
        descriptionKey: "expeditions.events.arene_finale.description",
        choices: [
            { textKey: "expeditions.events.arene_finale.choice1_text", test: null, success: { combat: { enemies: ['CHEF_BANDIT'], winEvent: 'ARENE_FIN_SUCCES', lossEvent: 'ARENE_FIN_MOYEN' } } }
        ]
    },
    'ARENE_FIN_SUCCES': { descriptionKey: "expeditions.events.arene_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 2000 }, { type: 'resource', kind: 'tissu', amount: 300 }, { type: 'fragments_gain', amount: 20 }] },
    'ARENE_FIN_MOYEN': { descriptionKey: "expeditions.events.arene_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 1000 }, { type: 'resource', kind: 'tissu', amount: 150 }] },
    'ARENE_FIN_ECHEC': { descriptionKey: "expeditions.events.arene_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -250 }] },
    'BASILIC_DEBUT': {
        descriptionKey: "expeditions.events.basilic_debut.description",
        choices: [
            { textKey: "expeditions.events.basilic_debut.choice1_text", test: null, success: { textKey: "expeditions.events.basilic_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'BASILIC_APPROCHE' } }
        ]
    },
    'BASILIC_APPROCHE': {
        descriptionKey: "expeditions.events.basilic_approche.description",
        choices: [
            { textKey: "expeditions.events.basilic_approche.choice1_text", test: { stat: 'Intelligence', value: 32 }, success: { textKey: "expeditions.events.basilic_approche.choice1_success_text", effects: [], nextEvent: 'BASILIC_FIN_SUCCES' }, failure: { textKey: "expeditions.events.basilic_approche.choice1_failure_text", effects: [], combat: { enemies: ['BASILIC'], winEvent: 'BASILIC_FIN_SUCCES', lossEvent: 'BASILIC_FIN_ECHEC' } } },
            { textKey: "expeditions.events.basilic_approche.choice2_text", test: { stat: 'Défense', value: 18 }, success: { textKey: "expeditions.events.basilic_approche.choice2_success_text", effects: [{ type: 'hp_loss_percent', value: 20 }], combat: { enemies: ['BASILIC'], winEvent: 'BASILIC_FIN_SUCCES', lossEvent: 'BASILIC_FIN_ECHEC' } }, failure: { textKey: "expeditions.events.basilic_approche.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], combat: { enemies: ['BASILIC'], winEvent: 'BASILIC_FIN_SUCCES', lossEvent: 'BASILIC_FIN_ECHEC' } } }
        ]
    },
    'BASILIC_FIN_SUCCES': { descriptionKey: "expeditions.events.basilic_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1700 }, { type: 'resource', kind: 'metal', amount: 400 }, { type: 'fragments_gain', amount: 10 }] },
    'BASILIC_FIN_ECHEC': { descriptionKey: "expeditions.events.basilic_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 300 }] },
    'NAVIRE_FANTOME_DEBUT': {
        descriptionKey: "expeditions.events.navire_fantome_debut.description",
        choices: [
            { textKey: "expeditions.events.navire_fantome_debut.choice1_text", test: null, success: { textKey: "expeditions.events.navire_fantome_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'NAVIRE_FANTOME_CALE' } }
        ]
    },
    'NAVIRE_FANTOME_CALE': {
        descriptionKey: "expeditions.events.navire_fantome_cale.description",
        choices: [
            { textKey: "expeditions.events.navire_fantome_cale.choice1_text", test: null, success: { combat: { enemies: ['SPECTRE_GEMISSANT'], winEvent: 'NAVIRE_FANTOME_PONT', lossEvent: 'NAVIRE_FANTOME_FIN_ECHEC' } } },
            { textKey: "expeditions.events.navire_fantome_cale.choice2_text", test: { stat: 'Intelligence', value: 30 }, success: { textKey: "expeditions.events.navire_fantome_cale.choice2_success_text", effects: [], nextEvent: 'NAVIRE_FANTOME_PONT' }, failure: { textKey: "expeditions.events.navire_fantome_cale.choice2_failure_text", effects: [], combat: { enemies: ['SPECTRE_GEMISSANT'], winEvent: 'NAVIRE_FANTOME_PONT', lossEvent: 'NAVIRE_FANTOME_FIN_ECHEC' } } }
        ]
    },
    'NAVIRE_FANTOME_PONT': {
        descriptionKey: "expeditions.events.navire_fantome_pont.description",
        choices: [
            { textKey: "expeditions.events.navire_fantome_pont.choice1_text", test: null, success: { combat: { enemies: ['SPECTRE_GEMISSANT'], winEvent: 'NAVIRE_FANTOME_FIN_SUCCES', lossEvent: 'NAVIRE_FANTOME_FIN_ECHEC' } } }
        ]
    },
    'NAVIRE_FANTOME_FIN_SUCCES': { descriptionKey: "expeditions.events.navire_fantome_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1500 }, { type: 'resource', kind: 'bois', amount: 300 }, { type: 'fragments_gain', amount: 5 }] },
    'NAVIRE_FANTOME_FIN_ECHEC': { descriptionKey: "expeditions.events.navire_fantome_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 200 }] },
    'TOURNOI_ARC_DEBUT': {
        descriptionKey: "expeditions.events.tournoi_arc_debut.description",
        choices: [
            { textKey: "expeditions.events.tournoi_arc_debut.choice1_text", test: { stat: 'Agilité', value: 30 }, success: { textKey: "expeditions.events.tournoi_arc_debut.choice1_success_text", effects: [], nextEvent: 'TOURNOI_ARC_MANCHES' }, failure: { textKey: "expeditions.events.tournoi_arc_debut.choice1_failure_text", effects: [], nextEvent: 'TOURNOI_ARC_FIN_ECHEC' } }
        ]
    },
    'TOURNOI_ARC_MANCHES': {
        descriptionKey: "expeditions.events.tournoi_arc_manches.description",
        choices: [
            { textKey: "expeditions.events.tournoi_arc_manches.choice1_text", test: { stat: 'Agilité', value: 35, stat2: 'Chance', value: 25 }, success: { textKey: "expeditions.events.tournoi_arc_manches.choice1_success_text", effects: [], nextEvent: 'TOURNOI_ARC_FINALE' }, failure: { textKey: "expeditions.events.tournoi_arc_manches.choice1_failure_text", effects: [], nextEvent: 'TOURNOI_ARC_FIN_MOYEN' } }
        ]
    },
    'TOURNOI_ARC_FINALE': {
        descriptionKey: "expeditions.events.tournoi_arc_finale.description",
        choices: [
            { textKey: "expeditions.events.tournoi_arc_finale.choice1_text", test: { stat: 'Agilité', value: 40 }, success: { textKey: "expeditions.events.tournoi_arc_finale.choice1_success_text", effects: [], nextEvent: 'TOURNOI_ARC_FIN_SUCCES' }, failure: { textKey: "expeditions.events.tournoi_arc_finale.choice1_failure_text", effects: [], nextEvent: 'TOURNOI_ARC_FIN_MOYEN' } }
        ]
    },
    'TOURNOI_ARC_FIN_SUCCES': { descriptionKey: "expeditions.events.tournoi_arc_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1300 }, { type: 'resource', kind: 'bois', amount: 250 }, { type: 'resource', kind: 'tissu', amount: 150 }] },
    'TOURNOI_ARC_FIN_MOYEN': { descriptionKey: "expeditions.events.tournoi_arc_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 700 }, { type: 'resource', kind: 'bois', amount: 100 }] },
    'TOURNOI_ARC_FIN_ECHEC': { descriptionKey: "expeditions.events.tournoi_arc_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 100 }] },
    'MINES_CRISTAL_DEBUT': {
        descriptionKey: "expeditions.events.mines_cristal_debut.description",
        choices: [
            { textKey: "expeditions.events.mines_cristal_debut.choice1_text", test: null, success: { textKey: "expeditions.events.mines_cristal_debut.choice1_success_text", combat: { enemies: ['GOLEM_PIERRE'], winEvent: 'MINES_CRISTAL_COEUR', lossEvent: 'MINES_CRISTAL_FIN_ECHEC' } } }
        ]
    },
    'MINES_CRISTAL_COEUR': {
        descriptionKey: "expeditions.events.mines_cristal_coeur.description",
        choices: [
            { textKey: "expeditions.events.mines_cristal_coeur.choice1_text", test: { stat: 'Force', value: 35 }, success: { textKey: "expeditions.events.mines_cristal_coeur.choice1_success_text", effects: [], nextEvent: 'MINES_CRISTAL_FIN_SUCCES' }, failure: { textKey: "expeditions.events.mines_cristal_coeur.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 30 }], combat: { enemies: ['GOLEM_PIERRE'], winEvent: 'MINES_CRISTAL_FIN_MOYEN', lossEvent: 'MINES_CRISTAL_FIN_ECHEC' } } }
        ]
    },
    'MINES_CRISTAL_FIN_SUCCES': { descriptionKey: "expeditions.events.mines_cristal_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1900 }, { type: 'resource', kind: 'metal', amount: 500 }, { type: 'fragments_gain', amount: 20 }] },
    'MINES_CRISTAL_FIN_MOYEN': { descriptionKey: "expeditions.events.mines_cristal_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 1200 }, { type: 'resource', kind: 'metal', amount: 300 }] },
    'MINES_CRISTAL_FIN_ECHEC': { descriptionKey: "expeditions.events.mines_cristal_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 300 }] },
    'VOL_MUSEE_DEBUT': {
        descriptionKey: "expeditions.events.vol_musee_debut.description",
        choices: [
            { textKey: "expeditions.events.vol_musee_debut.choice1_text", test: null, success: { textKey: "expeditions.events.vol_musee_debut.choice1_success_text", waitTime: 20, triggersRandomEvent: false, nextEvent: 'VOL_MUSEE_INFILTRATION' } }
        ]
    },
    'VOL_MUSEE_INFILTRATION': {
        descriptionKey: "expeditions.events.vol_musee_infiltration.description",
        choices: [
            { textKey: "expeditions.events.vol_musee_infiltration.choice1_text", test: { stat: 'Agilité', value: 35 }, success: { textKey: "expeditions.events.vol_musee_infiltration.choice1_success_text", effects: [], nextEvent: 'VOL_MUSEE_SALLE' }, failure: { textKey: "expeditions.events.vol_musee_infiltration.choice1_failure_text", effects: [], combat: { enemies: ['GARDE_AUTOMATE', 'GARDE_AUTOMATE'], winEvent: 'VOL_MUSEE_SALLE', lossEvent: 'VOL_MUSEE_FIN_ECHEC' } } }
        ]
    },
    'VOL_MUSEE_SALLE': {
        descriptionKey: "expeditions.events.vol_musee_salle.description",
        choices: [
            { textKey: "expeditions.events.vol_musee_salle.choice1_text", test: { stat: 'Intelligence', value: 38 }, success: { textKey: "expeditions.events.vol_musee_salle.choice1_success_text", effects: [], nextEvent: 'VOL_MUSEE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.vol_musee_salle.choice1_failure_text", effects: [], nextEvent: 'VOL_MUSEE_FIN_ECHEC' } }
        ]
    },
    'VOL_MUSEE_FIN_SUCCES': { descriptionKey: "expeditions.events.vol_musee_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1400 }, { type: 'resource', kind: 'tissu', amount: 400 }, { type: 'fragments_gain', amount: 30 }] },
    'VOL_MUSEE_FIN_ECHEC': { descriptionKey: "expeditions.events.vol_musee_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -400 }] },
    'GUERRE_GUILDES_DEBUT': {
        descriptionKey: "expeditions.events.guerre_guildes_debut.description",
        choices: [
            { textKey: "expeditions.events.guerre_guildes_debut.choice1_text", test: null, success: { textKey: "expeditions.events.guerre_guildes_debut.choice1_success_text", effects: [], nextEvent: 'GUERRE_GUILDES_VOLEURS' } },
            { textKey: "expeditions.events.guerre_guildes_debut.choice2_text", test: null, success: { textKey: "expeditions.events.guerre_guildes_debut.choice2_success_text", effects: [], nextEvent: 'GUERRE_GUILDES_ASSASSINS' } }
        ]
    },
    'GUERRE_GUILDES_VOLEURS': {
        descriptionKey: "expeditions.events.guerre_guildes_voleurs.description",
        choices: [
            { textKey: "expeditions.events.guerre_guildes_voleurs.choice1_text", test: { stat: 'Agilité', value: 40 }, success: { textKey: "expeditions.events.guerre_guildes_voleurs.choice1_success_text", effects: [], nextEvent: 'GUERRE_GUILDES_FIN_VOLEURS' }, failure: { textKey: "expeditions.events.guerre_guildes_voleurs.choice1_failure_text", combat: { enemies: ['INITIE_DE_L_OMBRE'], winEvent: 'GUERRE_GUILDES_FIN_VOLEURS', lossEvent: 'GUERRE_GUILDES_FIN_ECHEC' } } }
        ]
    },
    'GUERRE_GUILDES_ASSASSINS': {
        descriptionKey: "expeditions.events.guerre_guildes_assassins.description",
        choices: [
            { textKey: "expeditions.events.guerre_guildes_assassins.choice1_text", test: { stat: 'Intelligence', value: 40 }, success: { textKey: "expeditions.events.guerre_guildes_assassins.choice1_success_text", effects: [], nextEvent: 'GUERRE_GUILDES_FIN_ASSASSINS' }, failure: { textKey: "expeditions.events.guerre_guildes_assassins.choice1_failure_text", combat: { enemies: ['CHEF_BANDIT'], winEvent: 'GUERRE_GUILDES_FIN_ASSASSINS', lossEvent: 'GUERRE_GUILDES_FIN_ECHEC' } } }
        ]
    },
    'GUERRE_GUILDES_FIN_VOLEURS': { descriptionKey: "expeditions.events.guerre_guildes_fin_voleurs.description", isEnd: true, rewards: [{ type: 'xp', amount: 2200 }, { type: 'resource', kind: 'tissu', amount: 350 }, { type: 'resource', kind: 'metal', amount: 250 }] },
    'GUERRE_GUILDES_FIN_ASSASSINS': { descriptionKey: "expeditions.events.guerre_guildes_fin_assassins.description", isEnd: true, rewards: [{ type: 'xp', amount: 2200 }, { type: 'resource', kind: 'metal', amount: 350 }, { type: 'resource', kind: 'tissu', amount: 250 }] },
    'GUERRE_GUILDES_FIN_ECHEC': { descriptionKey: "expeditions.events.guerre_guildes_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -600 }] },
    'OASIS_DEBUT': {
        descriptionKey: "expeditions.events.oasis_debut.description",
        choices: [
            { textKey: "expeditions.events.oasis_debut.choice1_text", test: null, success: { textKey: "expeditions.events.oasis_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'OASIS_TRAVERSEE' } }
        ]
    },
    'OASIS_TRAVERSEE': {
        descriptionKey: "expeditions.events.oasis_traversee.description",
        choices: [
            { textKey: "expeditions.events.oasis_traversee.choice1_text", test: { stat: 'Intelligence', value: 30 }, success: { textKey: "expeditions.events.oasis_traversee.choice1_success_text", effects: [], nextEvent: 'OASIS_GARDIEN' }, failure: { textKey: "expeditions.events.oasis_traversee.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'OASIS_GARDIEN' } }
        ]
    },
    'OASIS_GARDIEN': {
        descriptionKey: "expeditions.events.oasis_gardien.description",
        choices: [
            { textKey: "expeditions.events.oasis_gardien.choice1_text", test: { stat: 'Intelligence', value: 40 }, success: { textKey: "expeditions.events.oasis_gardien.choice1_success_text", effects: [], nextEvent: 'OASIS_FIN_SUCCES' }, failure: { textKey: "expeditions.events.oasis_gardien.choice1_failure_text", combat: { enemies: ['DJINN'], winEvent: 'OASIS_FIN_SUCCES', lossEvent: 'OASIS_FIN_ECHEC' } } },
            { textKey: "expeditions.events.oasis_gardien.choice2_text", test: null, success: { combat: { enemies: ['DJINN'], winEvent: 'OASIS_FIN_SUCCES', lossEvent: 'OASIS_FIN_ECHEC' } } }
        ]
    },
    'OASIS_FIN_SUCCES': { descriptionKey: "expeditions.events.oasis_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1800 }, { type: 'fragments_gain', amount: 50 }] },
    'OASIS_FIN_ECHEC': { descriptionKey: "expeditions.events.oasis_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 350 }] },
    'RITUEL_SANG_DEBUT': {
        descriptionKey: "expeditions.events.rituel_sang_debut.description",
        choices: [
            { textKey: "expeditions.events.rituel_sang_debut.choice1_text", test: null, success: { textKey: "expeditions.events.rituel_sang_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'RITUEL_SANG_APPROCHE' } }
        ]
    },
    'RITUEL_SANG_APPROCHE': {
        descriptionKey: "expeditions.events.rituel_sang_approche.description",
        choices: [
            { textKey: "expeditions.events.rituel_sang_approche.choice1_text", test: { stat: 'Agilité', value: 32 }, success: { textKey: "expeditions.events.rituel_sang_approche.choice1_success_text", effects: [], nextEvent: 'RITUEL_SANG_COMBAT' }, failure: { textKey: "expeditions.events.rituel_sang_approche.choice1_failure_text", combat: { enemies: ['SQUELETTE_GUERRIER'], winEvent: 'RITUEL_SANG_COMBAT', lossEvent: 'RITUEL_SANG_FIN_ECHEC' } } }
        ]
    },
    'RITUEL_SANG_COMBAT': {
        descriptionKey: "expeditions.events.rituel_sang_combat.description",
        choices: [
            { textKey: "expeditions.events.rituel_sang_combat.choice1_text", test: null, success: { combat: { enemies: ['NECROMANCIEN_APPRENTI', 'SQUELETTE_GUERRIER', 'SQUELETTE_GUERRIER'], winEvent: 'RITUEL_SANG_FIN_SUCCES', lossEvent: 'RITUEL_SANG_FIN_ECHEC' } } }
        ]
    },
    'RITUEL_SANG_FIN_SUCCES': { descriptionKey: "expeditions.events.rituel_sang_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 2000 }, { type: 'resource', kind: 'tissu', amount: 350 }, { type: 'fragments_gain', amount: 20 }] },
    'RITUEL_SANG_FIN_ECHEC': { descriptionKey: "expeditions.events.rituel_sang_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 400 }] },
    'FIEVRE_OR_DEBUT': {
        descriptionKey: "expeditions.events.fievre_or_debut.description",
        choices: [
            { textKey: "expeditions.events.fievre_or_debut.choice1_text", test: null, success: { textKey: "expeditions.events.fievre_or_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'FIEVRE_OR_RECHERCHE' } }
        ]
    },
    'FIEVRE_OR_RECHERCHE': {
        descriptionKey: "expeditions.events.fievre_or_recherche.description",
        choices: [
            { textKey: "expeditions.events.fievre_or_recherche.choice1_text", test: { stat: 'Chance', value: 35 }, success: { textKey: "expeditions.events.fievre_or_recherche.choice1_success_text", effects: [], nextEvent: 'FIEVRE_OR_CONFLIT' }, failure: { textKey: "expeditions.events.fievre_or_recherche.choice1_failure_text", effects: [], nextEvent: 'FIEVRE_OR_FIN_ECHEC' } },
            { textKey: "expeditions.events.fievre_or_recherche.choice2_text", test: { stat: 'Force', value: 30 }, success: { textKey: "expeditions.events.fievre_or_recherche.choice2_success_text", effects: [], nextEvent: 'FIEVRE_OR_CONFLIT' }, failure: { textKey: "expeditions.events.fievre_or_recherche.choice2_failure_text", effects: [], nextEvent: 'FIEVRE_OR_FIN_ECHEC' } }
        ]
    },
    'FIEVRE_OR_CONFLIT': {
        descriptionKey: "expeditions.events.fievre_or_conflit.description",
        choices: [
            { textKey: "expeditions.events.fievre_or_conflit.choice1_text", test: null, success: { textKey: "expeditions.events.fievre_or_conflit.choice1_success_text", effects: [], nextEvent: 'FIEVRE_OR_FIN_MOYEN' } },
            { textKey: "expeditions.events.fievre_or_conflit.choice2_text", test: null, success: { combat: { enemies: ['BANDIT', 'OTYUGH', 'BANDIT'], winEvent: 'FIEVRE_OR_FIN_SUCCES', lossEvent: 'FIEVRE_OR_FIN_ECHEC' } } }
        ]
    },
    'FIEVRE_OR_FIN_SUCCES': { descriptionKey: "expeditions.events.fievre_or_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1600 }, { type: 'resource', kind: 'metal', amount: 450 }] },
    'FIEVRE_OR_FIN_MOYEN': { descriptionKey: "expeditions.events.fievre_or_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 1000 }, { type: 'resource', kind: 'metal', amount: 250 }] },
    'FIEVRE_OR_FIN_ECHEC': { descriptionKey: "expeditions.events.fievre_or_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 150 }] },
    'EGOUTS_DEBUT': {
        descriptionKey: "expeditions.events.egouts_debut.description",
        choices: [
            { textKey: "expeditions.events.egouts_debut.choice1_text", test: null, success: { textKey: "expeditions.events.egouts_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'EGOUTS_PISTES' } }
        ]
    },
    'EGOUTS_PISTES': {
        descriptionKey: "expeditions.events.egouts_pistes.description",
        choices: [
            { textKey: "expeditions.events.egouts_pistes.choice1_text", test: { stat: 'Intelligence', value: 28 }, success: { textKey: "expeditions.events.egouts_pistes.choice1_success_text", effects: [], nextEvent: 'EGOUTS_REPAIRE' }, failure: { textKey: "expeditions.events.egouts_pistes.choice1_failure_text", effects: [], waitTime: 15, nextEvent: 'EGOUTS_REPAIRE' } }
        ]
    },
    'EGOUTS_REPAIRE': {
        descriptionKey: "expeditions.events.egouts_repaire.description",
        choices: [
            { textKey: "expeditions.events.egouts_repaire.choice1_text", test: null, success: { combat: { enemies: ['OTYUGH', 'ARAIGNEE_GEANTE'], winEvent: 'EGOUTS_FIN_SUCCES', lossEvent: 'EGOUTS_FIN_ECHEC' } } }
        ]
    },
    'EGOUTS_FIN_SUCCES': { descriptionKey: "expeditions.events.egouts_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 1750 }, { type: 'resource', kind: 'tissu', amount: 300 }, { type: 'fragments_gain', amount: 10 }] },
    'EGOUTS_FIN_ECHEC': { descriptionKey: "expeditions.events.egouts_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 300 }] },
// ** RARES ** (Déjà convertis)
    // ...

    // ** EPIQUES **
    'SIEGE_DEBUT': {
        descriptionKey: "expeditions.events.siege_debut.description",
        choices: [
            { textKey: "expeditions.events.siege_debut.choice1_text", test: null, success: { textKey: "expeditions.events.siege_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'SIEGE_BATAILLE' } }
        ]
    },
    'SIEGE_BATAILLE': {
        descriptionKey: "expeditions.events.siege_bataille.description",
        choices: [
            { textKey: "expeditions.events.siege_bataille.choice1_text", test: { stat: 'Force', value: 45 }, success: { textKey: "expeditions.events.siege_bataille.choice1_success_text", combat: { enemies: ['MINOTAURE', 'ORC_BERSERKER', 'ORC_BERSERKER'], winEvent: 'SIEGE_CHAMAN', lossEvent: 'SIEGE_FIN_ECHEC'} }, failure: { textKey: "expeditions.events.siege_bataille.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 80 }], nextEvent: 'SIEGE_REMPARTS' } },
            { textKey: "expeditions.events.siege_bataille.choice2_text", test: { stat: 'Défense', value: 20 }, success: { textKey: "expeditions.events.siege_bataille.choice2_success_text", effects: [], nextEvent: 'SIEGE_CHAMAN' }, failure: { textKey: "expeditions.events.siege_bataille.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], combat: { enemies: ['ORC_BERSERKER', 'ORC_BERSERKER'], winEvent: 'SIEGE_CHAMAN', lossEvent: 'SIEGE_FIN_ECHEC'} } }
        ]
    },
    'SIEGE_REMPARTS': {
        descriptionKey: "expeditions.events.siege_remparts.description",
        choices: [
            { textKey: "expeditions.events.siege_remparts.choice1_text", test: null, success: { combat: { enemies: ['GOBELIN_FRONDEUR'], winEvent: 'SIEGE_CHAMAN', lossEvent: 'SIEGE_FIN_ECHEC' } } }
        ]
    },
    'SIEGE_CHAMAN': {
        descriptionKey: "expeditions.events.siege_chaman.description",
        choices: [
            { textKey: "expeditions.events.siege_chaman.choice1_text", test: { stat: 'Agilité', value: 50}, success: { textKey: "expeditions.events.siege_chaman.choice1_success_text", effects: [], nextEvent: 'SIEGE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.siege_chaman.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'SIEGE_FIN_ECHEC' } }
        ]
    },
    'SIEGE_FIN_SUCCES': { descriptionKey: "expeditions.events.siege_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 4000 }, { type: 'resource', kind: 'metal', amount: 800 }, { type: 'fragments_gain', amount: 40 }] },
    'SIEGE_FIN_ECHEC': { descriptionKey: "expeditions.events.siege_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -1000 }, { type: 'resource', kind: 'metal', amount: -200 }] },
    'CULTE_DEBUT': {
        descriptionKey: "expeditions.events.culte_debut.description",
        choices: [
            { textKey: "expeditions.events.culte_debut.choice1_text", test: null, success: { textKey: "expeditions.events.culte_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'CULTE_INFILTRATION' } }
        ]
    },
    'CULTE_INFILTRATION': {
        descriptionKey: "expeditions.events.culte_infiltration.description",
        choices: [
            { textKey: "expeditions.events.culte_infiltration.choice1_text", test: { stat: 'Intelligence', value: 48 }, success: { textKey: "expeditions.events.culte_infiltration.choice1_success_text", effects: [], nextEvent: 'CULTE_SABOTAGE' }, failure: { textKey: "expeditions.events.culte_infiltration.choice1_failure_text", effects: [], combat: { enemies: ['CULTISTE_ZELOTE'], winEvent: 'CULTE_SABOTAGE', lossEvent: 'CULTE_FIN_ECHEC' } } }
        ]
    },
    'CULTE_SABOTAGE': {
        descriptionKey: "expeditions.events.culte_sabotage.description",
        choices: [
            { textKey: "expeditions.events.culte_sabotage.choice1_text", test: { stat: 'Force', value: 40 }, success: { textKey: "expeditions.events.culte_sabotage.choice1_success_text", effects: [], nextEvent: 'CULTE_FIN_SUCCES' } },
            { textKey: "expeditions.events.culte_sabotage.choice2_text", test: { stat: 'Agilité', value: 50 }, success: { textKey: "expeditions.events.culte_sabotage.choice2_success_text", effects: [], nextEvent: 'CULTE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.culte_sabotage.choice2_failure_text", combat: { enemies: ['NECROMANCIEN_APPRENTI'], winEvent: 'CULTE_FIN_SUCCES', lossEvent: 'CULTE_FIN_ECHEC' } } }
        ]
    },
    'CULTE_FIN_SUCCES': { descriptionKey: "expeditions.events.culte_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 3500 }, { type: 'resource', kind: 'tissu', amount: 700 }, { type: 'fragments_gain', amount: 35 }] },
    'CULTE_FIN_ECHEC': { descriptionKey: "expeditions.events.culte_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 500 }] },
    'VOLCAN_DEBUT': {
        descriptionKey: "expeditions.events.volcan_debut.description",
        choices: [
            { textKey: "expeditions.events.volcan_debut.choice1_text", test: null, success: { textKey: "expeditions.events.volcan_debut.choice1_success_text", nextEvent: 'VOLCAN_ASCENSION' } }
        ]
    },
    'VOLCAN_ASCENSION': {
        descriptionKey: "expeditions.events.volcan_ascension.description",
        choices: [
            { textKey: "expeditions.events.volcan_ascension.choice1_text", test: { stat: 'Agilité', value: 45 }, success: { textKey: "expeditions.events.volcan_ascension.choice1_success_text", effects: [], nextEvent: 'VOLCAN_GARDIEN' }, failure: { textKey: "expeditions.events.volcan_ascension.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 30 }], nextEvent: 'VOLCAN_GARDIEN' } },
            { textKey: "expeditions.events.volcan_ascension.choice2_text", test: { stat: 'Défense', value: 25 }, success: { textKey: "expeditions.events.volcan_ascension.choice2_success_text", effects: [], nextEvent: 'VOLCAN_GARDIEN' }, failure: { textKey: "expeditions.events.volcan_ascension.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'VOLCAN_FIN_ECHEC' } }
        ]
    },
    'VOLCAN_GARDIEN': {
        descriptionKey: "expeditions.events.volcan_gardien.description",
        choices: [
            { textKey: "expeditions.events.volcan_gardien.choice1_text", test: null, success: { combat: { enemies: ['ELEMENTAIRE_DE_MAGMA'], winEvent: 'VOLCAN_COEUR', lossEvent: 'VOLCAN_FIN_ECHEC' } } }
        ]
    },
    'VOLCAN_COEUR': {
        descriptionKey: "expeditions.events.volcan_coeur.description",
        choices: [
            { textKey: "expeditions.events.volcan_coeur.choice1_text", test: null, success: { textKey: "expeditions.events.volcan_coeur.choice1_success_text", effects: [], nextEvent: 'VOLCAN_FIN_SUCCES' } }
        ]
    },
    'VOLCAN_FIN_SUCCES': { descriptionKey: "expeditions.events.volcan_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 5000 }, { type: 'resource', kind: 'metal', amount: 1000 }, { type: 'fragments_gain', amount: 50 }] },
    'VOLCAN_FIN_ECHEC': { descriptionKey: "expeditions.events.volcan_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -800 }] },
    'BIBLIO_DEBUT': {
        descriptionKey: "expeditions.events.biblio_debut.description",
        choices: [
            { textKey: "expeditions.events.biblio_debut.choice1_text", test: null, success: { textKey: "expeditions.events.biblio_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'BIBLIO_ENTREE' } }
        ]
    },
    'BIBLIO_ENTREE': {
        descriptionKey: "expeditions.events.biblio_entree.description",
        choices: [
            { textKey: "expeditions.events.biblio_entree.choice1_text", test: { stat: 'Intelligence', value: 50 }, success: { textKey: "expeditions.events.biblio_entree.choice1_success_text", effects: [], nextEvent: 'BIBLIO_GARDIEN' }, failure: { textKey: "expeditions.events.biblio_entree.choice1_failure_text", effects: [], nextEvent: 'BIBLIO_FIN_ECHEC' } },
            { textKey: "expeditions.events.biblio_entree.choice2_text", test: null, success: { textKey: "expeditions.events.biblio_entree.choice2_success_text", effects: [], nextEvent: 'BIBLIO_GARDIEN' } }
        ]
    },
    'BIBLIO_GARDIEN': {
        descriptionKey: "expeditions.events.biblio_gardien.description",
        choices: [
            { textKey: "expeditions.events.biblio_gardien.choice1_text", test: { stat: 'Intelligence', value: 60 }, success: { textKey: "expeditions.events.biblio_gardien.choice1_success_text", effects: [], nextEvent: 'BIBLIO_FIN_SUCCES' }, failure: { textKey: "expeditions.events.biblio_gardien.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 30 }], nextEvent: 'BIBLIO_FIN_ECHEC' } },
            { textKey: "expeditions.events.biblio_gardien.choice2_text", test: null, success: { combat: { enemies: ['GARDIEN_DE_PIERRE_ETERNE'], winEvent: 'BIBLIO_FIN_MOYEN', lossEvent: 'BIBLIO_FIN_ECHEC' } } }
        ]
    },
    'BIBLIO_FIN_SUCCES': { descriptionKey: "expeditions.events.biblio_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 6000 }, { type: 'resource', kind: 'tissu', amount: 1200 }] },
    'BIBLIO_FIN_MOYEN': { descriptionKey: "expeditions.events.biblio_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 3000 }, { type: 'resource', kind: 'tissu', amount: 600 }] },
    'BIBLIO_FIN_ECHEC': { descriptionKey: "expeditions.events.biblio_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -1500 }] },
    'PIRATE_DEBUT': {
        descriptionKey: "expeditions.events.pirate_debut.description",
        choices: [
            { textKey: "expeditions.events.pirate_debut.choice1_text", test: { stat: 'Agilité', value: 50 }, success: { textKey: "expeditions.events.pirate_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'PIRATE_CALE' }, failure: { textKey: "expeditions.events.pirate_debut.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 150 }], combat: { enemies: ['BANDIT'], winEvent: 'PIRATE_PONT', lossEvent: 'PIRATE_FIN_ECHEC' } } }
        ]
    },
    'PIRATE_CALE': {
        descriptionKey: "expeditions.events.pirate_cale.description",
        choices: [
            { textKey: "expeditions.events.pirate_cale.choice1_text", test: { stat: 'Chance', value: 45 }, success: { textKey: "expeditions.events.pirate_cale.choice1_success_text", effects: [], nextEvent: 'PIRATE_FIN_VOL' }, failure: { textKey: "expeditions.events.pirate_cale.choice1_failure_text", effects: [], combat: { enemies: ['BANDIT'], winEvent: 'PIRATE_PONT', lossEvent: 'PIRATE_FIN_ECHEC' } } },
            { textKey: "expeditions.events.pirate_cale.choice2_text", test: null, success: { textKey: "expeditions.events.pirate_cale.choice2_success_text", effects: [], nextEvent: 'PIRATE_PONT' } }
        ]
    },
    'PIRATE_PONT': {
        descriptionKey: "expeditions.events.pirate_pont.description",
        choices: [
            { textKey: "expeditions.events.pirate_pont.choice1_text", test: null, success: { combat: { enemies: ['CHEF_BANDIT'], winEvent: 'PIRATE_FIN_CAPITAINE', lossEvent: 'PIRATE_FIN_ECHEC' } } }
        ]
    },
    'PIRATE_FIN_CAPITAINE': { descriptionKey: "expeditions.events.pirate_fin_capitaine.description", isEnd: true, rewards: [{ type: 'xp', amount: 5500 }, { type: 'resource', kind: 'bois', amount: 800 }, { type: 'resource', kind: 'metal', amount: 400 }] },
    'PIRATE_FIN_VOL': { descriptionKey: "expeditions.events.pirate_fin_vol.description", isEnd: true, rewards: [{ type: 'xp', amount: 3000 }, { type: 'resource', kind: 'bois', amount: 400 }, { type: 'resource', kind: 'metal', amount: 200 }, { type: 'fragments_gain', amount: 20 }] },
    'PIRATE_FIN_ECHEC': { descriptionKey: "expeditions.events.pirate_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 500 }] },
    'PESTE_DEBUT': {
        descriptionKey: "expeditions.events.peste_debut.description",
        choices: [
            { textKey: "expeditions.events.peste_debut.choice1_text", test: null, success: { textKey: "expeditions.events.peste_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'PESTE_ALISTAIR' } },
            { textKey: "expeditions.events.peste_debut.choice2_text", test: null, success: { textKey: "expeditions.events.peste_debut.choice2_success_text", triggersRandomEvent: true, nextEvent: 'PESTE_ELARA' } }
        ]
    },
    'PESTE_ALISTAIR': {
        descriptionKey: "expeditions.events.peste_alistair.description",
        choices: [
            { textKey: "expeditions.events.peste_alistair.choice1_text", test: { stat: 'Force', value: 50, stat2: 'Défense', value: 25 }, success: { textKey: "expeditions.events.peste_alistair.choice1_success_text", effects: [], nextEvent: 'PESTE_FIN_ALISTAIR' }, failure: { textKey: "expeditions.events.peste_alistair.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'PESTE_FIN_ECHEC' } }
        ]
    },
    'PESTE_ELARA': {
        descriptionKey: "expeditions.events.peste_elara.description",
        choices: [
            { textKey: "expeditions.events.peste_elara.choice1_text", test: { stat: 'Intelligence', value: 55 }, success: { textKey: "expeditions.events.peste_elara.choice1_success_text", effects: [], nextEvent: 'PESTE_FIN_ELARA' }, failure: { textKey: "expeditions.events.peste_elara.choice1_failure_text", combat: { enemies: ['SPECTRE_GEMISSANT'], winEvent: 'PESTE_FIN_ELARA', lossEvent: 'PESTE_FIN_ECHEC' } } }
        ]
    },
    'PESTE_FIN_ALISTAIR': { descriptionKey: "expeditions.events.peste_fin_alistair.description", isEnd: true, rewards: [{ type: 'xp', amount: 6000 }, { type: 'resource', kind: 'metal', amount: 500 }] },
    'PESTE_FIN_ELARA': { descriptionKey: "expeditions.events.peste_fin_elara.description", isEnd: true, rewards: [{ type: 'xp', amount: 7000 }, { type: 'resource', kind: 'tissu', amount: 1200 }] },
    'PESTE_FIN_ECHEC': { descriptionKey: "expeditions.events.peste_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -2000 }] },
    'CITE_AUTOMATES_DEBUT': {
        descriptionKey: "expeditions.events.cite_automates_debut.description",
        choices: [
            { textKey: "expeditions.events.cite_automates_debut.choice1_text", test: { stat: 'Intelligence', value: 50 }, success: { textKey: "expeditions.events.cite_automates_debut.choice1_success_text", effects: [], nextEvent: 'CITE_AUTOMATES_INTERIEUR' }, failure: { textKey: "expeditions.events.cite_automates_debut.choice1_failure_text", effects: [], nextEvent: 'CITE_AUTOMATES_FORCE' } }
        ]
    },
    'CITE_AUTOMATES_FORCE': {
        descriptionKey: "expeditions.events.cite_automates_force.description",
        choices: [
            { textKey: "expeditions.events.cite_automates_force.choice1_text", test: { stat: 'Force', value: 60 }, success: { textKey: "expeditions.events.cite_automates_force.choice1_success_text", effects: [], combat: { enemies: ['GARDE_AUTOMATE'], winEvent: 'CITE_AUTOMATES_INTERIEUR', lossEvent: 'CITE_AUTOMATES_FIN_ECHEC' } } }
        ]
    },
    'CITE_AUTOMATES_INTERIEUR': {
        descriptionKey: "expeditions.events.cite_automates_interieur.description",
        choices: [
            { textKey: "expeditions.events.cite_automates_interieur.choice1_text", test: null, success: { textKey: "expeditions.events.cite_automates_interieur.choice1_success_text", combat: { enemies: ['GARDE_AUTOMATE'], winEvent: 'CITE_AUTOMATES_COEUR', lossEvent: 'CITE_AUTOMATES_FIN_ECHEC' } } },
            { textKey: "expeditions.events.cite_automates_interieur.choice2_text", test: { stat: 'Agilité', value: 55 }, success: { textKey: "expeditions.events.cite_automates_interieur.choice2_success_text", effects: [], nextEvent: 'CITE_AUTOMATES_COEUR' } }
        ]
    },
    'CITE_AUTOMATES_COEUR': {
        descriptionKey: "expeditions.events.cite_automates_coeur.description",
        choices: [
            { textKey: "expeditions.events.cite_automates_coeur.choice1_text", test: null, success: { textKey: "expeditions.events.cite_automates_coeur.choice1_success_text", combat: { enemies: ['LE_COLLECTEUR'], winEvent: 'CITE_AUTOMATES_FIN_SUCCES', lossEvent: 'CITE_AUTOMATES_FIN_ECHEC' } } }
        ]
    },
    'CITE_AUTOMATES_FIN_SUCCES': { descriptionKey: "expeditions.events.cite_automates_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 5000 }, { type: 'resource', kind: 'metal', amount: 1500 }, { type: 'fragments_gain', amount: 50 }] },
    'CITE_AUTOMATES_FIN_ECHEC': { descriptionKey: "expeditions.events.cite_automates_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 800 }] },
    'LABYRINTHE_DEBUT': {
        descriptionKey: "expeditions.events.labyrinthe_debut.description",
        choices: [
            { textKey: "expeditions.events.labyrinthe_debut.choice1_text", test: null, success: { textKey: "expeditions.events.labyrinthe_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'LABYRINTHE_CHEMIN' } }
        ]
    },
    'LABYRINTHE_CHEMIN': {
        descriptionKey: "expeditions.events.labyrinthe_chemin.description",
        choices: [
            { textKey: "expeditions.events.labyrinthe_chemin.choice1_text", test: { stat: 'Intelligence', value: 45 }, success: { textKey: "expeditions.events.labyrinthe_chemin.choice1_success_text", effects: [], nextEvent: 'LABYRINTHE_CENTRE' }, failure: { textKey: "expeditions.events.labyrinthe_chemin.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 20 }], waitTime: 30, nextEvent: 'LABYRINTHE_CHEMIN' } },
            { textKey: "expeditions.events.labyrinthe_chemin.choice2_text", test: { stat: 'Chance', value: 40 }, success: { textKey: "expeditions.events.labyrinthe_chemin.choice2_success_text", effects: [], nextEvent: 'LABYRINTHE_CENTRE' }, failure: { textKey: "expeditions.events.labyrinthe_chemin.choice2_failure_text", effects: [{ type: 'hp_loss_flat', value: 100 }], nextEvent: 'LABYRINTHE_CHEMIN' } }
        ]
    },
    'LABYRINTHE_CENTRE': {
        descriptionKey: "expeditions.events.labyrinthe_centre.description",
        choices: [
            { textKey: "expeditions.events.labyrinthe_centre.choice1_text", test: null, success: { combat: { enemies: ['MINOTAURE'], winEvent: 'LABYRINTHE_FIN_SUCCES', lossEvent: 'LABYRINTHE_FIN_ECHEC' } } }
        ]
    },
    'LABYRINTHE_FIN_SUCCES': { descriptionKey: "expeditions.events.labyrinthe_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 4500 }, { type: 'resource', kind: 'bois', amount: 1000 }, { type: 'fragments_gain', amount: 40 }] },
    'LABYRINTHE_FIN_ECHEC': { descriptionKey: "expeditions.events.labyrinthe_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -2000 }] },
    'COUR_MIRACLES_DEBUT': {
        descriptionKey: "expeditions.events.cour_miracles_debut.description",
        choices: [
            { textKey: "expeditions.events.cour_miracles_debut.choice1_text", test: null, success: { textKey: "expeditions.events.cour_miracles_debut.choice1_success_text", nextEvent: 'COUR_MIRACLES_EPREUVE1' } }
        ]
    },
    'COUR_MIRACLES_EPREUVE1': {
        descriptionKey: "expeditions.events.cour_miracles_epreuve1.description",
        choices: [
            { textKey: "expeditions.events.cour_miracles_epreuve1.choice1_text", test: { stat: 'Chance', value: 40 }, success: { textKey: "expeditions.events.cour_miracles_epreuve1.choice1_success_text", effects: [], nextEvent: 'COUR_MIRACLES_EPREUVE2' }, failure: { textKey: "expeditions.events.cour_miracles_epreuve1.choice1_failure_text", effects: [{ type: 'resource_loss_percent', value: 10 }], nextEvent: 'COUR_MIRACLES_EPREUVE2' } },
            { textKey: "expeditions.events.cour_miracles_epreuve1.choice2_text", test: { stat: 'Agilité', value: 55 }, success: { textKey: "expeditions.events.cour_miracles_epreuve1.choice2_success_text", effects: [], nextEvent: 'COUR_MIRACLES_EPREUVE2' }, failure: { textKey: "expeditions.events.cour_miracles_epreuve1.choice2_failure_text", combat: { enemies: ['ASSASSIN_DE_L_OMBRE'], winEvent: 'COUR_MIRACLES_EPREUVE2', lossEvent: 'COUR_MIRACLES_FIN_ECHEC' } } }
        ]
    },
    'COUR_MIRACLES_EPREUVE2': {
        descriptionKey: "expeditions.events.cour_miracles_epreuve2.description",
        choices: [
            { textKey: "expeditions.events.cour_miracles_epreuve2.choice1_text", test: { stat: 'Vie', value: 40 }, success: { textKey: "expeditions.events.cour_miracles_epreuve2.choice1_success_text", effects: [], nextEvent: 'COUR_MIRACLES_FIN_SUCCES' }, failure: { textKey: "expeditions.events.cour_miracles_epreuve2.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'COUR_MIRACLES_FIN_ECHEC' } }
        ]
    },
    'COUR_MIRACLES_FIN_SUCCES': { descriptionKey: "expeditions.events.cour_miracles_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 4000 }, { type: 'resource', kind: 'tissu', amount: 1000 }] },
    'COUR_MIRACLES_FIN_ECHEC': { descriptionKey: "expeditions.events.cour_miracles_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -500 }, { type: 'resource', kind: 'tissu', amount: -100 }] },
    'ILE_CHIMERE_DEBUT': {
        descriptionKey: "expeditions.events.ile_chimere_debut.description",
        choices: [
            { textKey: "expeditions.events.ile_chimere_debut.choice1_text", test: null, success: { textKey: "expeditions.events.ile_chimere_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'ILE_CHIMERE_LABO' } }
        ]
    },
    'ILE_CHIMERE_LABO': {
        descriptionKey: "expeditions.events.ile_chimere_labo.description",
        choices: [
            { textKey: "expeditions.events.ile_chimere_labo.choice1_text", test: { stat: 'Intelligence', value: 50 }, success: { textKey: "expeditions.events.ile_chimere_labo.choice1_success_text", effects: [], nextEvent: 'ILE_CHIMERE_COMBAT' }, failure: { textKey: "expeditions.events.ile_chimere_labo.choice1_failure_text", effects: [], nextEvent: 'ILE_CHIMERE_COMBAT' } }
        ]
    },
    'ILE_CHIMERE_COMBAT': {
        descriptionKey: "expeditions.events.ile_chimere_combat.description",
        choices: [
            { textKey: "expeditions.events.ile_chimere_combat.choice1_text", test: null, success: { combat: { enemies: ['CHIMERE'], winEvent: 'ILE_CHIMERE_FIN_SUCCES', lossEvent: 'ILE_CHIMERE_FIN_ECHEC' } } }
        ]
    },
    'ILE_CHIMERE_FIN_SUCCES': { descriptionKey: "expeditions.events.ile_chimere_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 6000 }, { type: 'resource', kind: 'tissu', amount: 800 }, { type: 'resource', kind: 'bois', amount: 800 }, { type: 'fragments_gain', amount: 60 }] },
    'ILE_CHIMERE_FIN_ECHEC': { descriptionKey: "expeditions.events.ile_chimere_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 1000 }] },
    'PACTE_INFERNAL_DEBUT': {
        descriptionKey: "expeditions.events.pacte_infernal_debut.description",
        choices: [
            { textKey: "expeditions.events.pacte_infernal_debut.choice1_text", test: null, success: { textKey: "expeditions.events.pacte_infernal_debut.choice1_success_text", nextEvent: 'PACTE_INFERNAL_CONTRAT' } }
        ]
    },
    'PACTE_INFERNAL_CONTRAT': {
        descriptionKey: "expeditions.events.pacte_infernal_contrat.description",
        choices: [
            { textKey: "expeditions.events.pacte_infernal_contrat.choice1_text", test: { stat: 'Intelligence', value: 52 }, success: { textKey: "expeditions.events.pacte_infernal_contrat.choice1_success_text", effects: [], nextEvent: 'PACTE_INFERNAL_COMBAT' }, failure: { textKey: "expeditions.events.pacte_infernal_contrat.choice1_failure_text", effects: [], combat: { enemies: ['GARDE_AUTOMATE'], winEvent: 'PACTE_INFERNAL_COMBAT', lossEvent: 'PACTE_INFERNAL_FIN_ECHEC' } } }
        ]
    },
    'PACTE_INFERNAL_COMBAT': {
        descriptionKey: "expeditions.events.pacte_infernal_combat.description",
        choices: [
            { textKey: "expeditions.events.pacte_infernal_combat.choice1_text", test: null, success: { combat: { enemies: ['DEMON_MINEUR', 'SPECTRE_GEMISSANT', 'SPECTRE_GEMISSANT'], winEvent: 'PACTE_INFERNAL_FIN_SUCCES', lossEvent: 'PACTE_INFERNAL_FIN_ECHEC' } } }
        ]
    },
    'PACTE_INFERNAL_FIN_SUCCES': { descriptionKey: "expeditions.events.pacte_infernal_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 5500 }, { type: 'fragments_gain', amount: 100 }] },
    'PACTE_INFERNAL_FIN_ECHEC': { descriptionKey: "expeditions.events.pacte_infernal_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -1200 }] },
    'CHASSE_SAUVAGE_DEBUT': {
        descriptionKey: "expeditions.events.chasse_sauvage_debut.description",
        choices: [
            { textKey: "expeditions.events.chasse_sauvage_debut.choice1_text", test: null, success: { textKey: "expeditions.events.chasse_sauvage_debut.choice1_success_text", waitTime: 10, nextEvent: 'CHASSE_SAUVAGE_CONFRONTATION' } }
        ]
    },
    'CHASSE_SAUVAGE_CONFRONTATION': {
        descriptionKey: "expeditions.events.chasse_sauvage_confrontation.description",
        choices: [
            { textKey: "expeditions.events.chasse_sauvage_confrontation.choice1_text", test: { stat: 'Force', value: 55 }, success: { textKey: "expeditions.events.chasse_sauvage_confrontation.choice1_success_text", combat: { enemies: ['SPECTRE_GEMISSANT'], winEvent: 'CHASSE_SAUVAGE_FIN_SUCCES', lossEvent: 'CHASSE_SAUVAGE_FIN_ECHEC' } } },
            { textKey: "expeditions.events.chasse_sauvage_confrontation.choice2_text", test: { stat: 'resources.metal', value: 500 }, success: { textKey: "expeditions.events.chasse_sauvage_confrontation.choice2_success_text", effects: [{ type: 'resource_loss', kind: 'metal', amount: 500 }], nextEvent: 'CHASSE_SAUVAGE_FIN_MOYEN' }, failure: { textKey: "expeditions.events.chasse_sauvage_confrontation.choice2_failure_text", effects: [], combat: { enemies: ['SPECTRE_GEMISSANT'], winEvent: 'CHASSE_SAUVAGE_FIN_SUCCES', lossEvent: 'CHASSE_SAUVAGE_FIN_ECHEC' } } }
        ]
    },
    'CHASSE_SAUVAGE_FIN_SUCCES': { descriptionKey: "expeditions.events.chasse_sauvage_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 7000 }, { type: 'resource', kind: 'metal', amount: 1200 }, { type: 'fragments_gain', amount: 70 }] },
    'CHASSE_SAUVAGE_FIN_MOYEN': { descriptionKey: "expeditions.events.chasse_sauvage_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 3500 }] },
    'CHASSE_SAUVAGE_FIN_ECHEC': { descriptionKey: "expeditions.events.chasse_sauvage_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 1000 }] },
    'SOMMET_MONDE_DEBUT': {
        descriptionKey: "expeditions.events.sommet_monde_debut.description",
        choices: [
            { textKey: "expeditions.events.sommet_monde_debut.choice1_text", test: null, success: { textKey: "expeditions.events.sommet_monde_debut.choice1_success_text", nextEvent: 'SOMMET_MONDE_EPREUVE' } }
        ]
    },
    'SOMMET_MONDE_EPREUVE': {
        descriptionKey: "expeditions.events.sommet_monde_epreuve.description",
        choices: [
            { textKey: "expeditions.events.sommet_monde_epreuve.choice1_text", test: null, success: { combat: { enemies: ['GRIFFON'], winEvent: 'SOMMET_MONDE_ORACLE', lossEvent: 'SOMMET_MONDE_FIN_ECHEC' } } },
            { textKey: "expeditions.events.sommet_monde_epreuve.choice2_text", test: { stat: 'Force', value: 50, stat2: 'Vie', value: 50 }, success: { textKey: "expeditions.events.sommet_monde_epreuve.choice2_success_text", effects: [], nextEvent: 'SOMMET_MONDE_ORACLE' }, failure: { textKey: "expeditions.events.sommet_monde_epreuve.choice2_failure_text", combat: { enemies: ['GRIFFON'], winEvent: 'SOMMET_MONDE_ORACLE', lossEvent: 'SOMMET_MONDE_FIN_ECHEC' } } }
        ]
    },
    'SOMMET_MONDE_ORACLE': {
        descriptionKey: "expeditions.events.sommet_monde_oracle.description",
        choices: [
            { textKey: "expeditions.events.sommet_monde_oracle.choice1_text", test: null, success: { textKey: "expeditions.events.sommet_monde_oracle.choice1_success_text", effects: [], nextEvent: 'SOMMET_MONDE_FIN_SUCCES' } }
        ]
    },
    'SOMMET_MONDE_FIN_SUCCES': { descriptionKey: "expeditions.events.sommet_monde_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 6500 }, { type: 'resource', kind: 'bois', amount: 1500 }] },
    'SOMMET_MONDE_FIN_ECHEC': { descriptionKey: "expeditions.events.sommet_monde_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 1200 }] },
    'MAELSTROM_DEBUT': {
        descriptionKey: "expeditions.events.maelstrom_debut.description",
        choices: [
            { textKey: "expeditions.events.maelstrom_debut.choice1_text", test: null, success: { textKey: "expeditions.events.maelstrom_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'MAELSTROM_NAVIGATION' } }
        ]
    },
    'MAELSTROM_NAVIGATION': {
        descriptionKey: "expeditions.events.maelstrom_navigation.description",
        choices: [
            { textKey: "expeditions.events.maelstrom_navigation.choice1_text", test: { stat: 'Agilité', value: 58 }, success: { textKey: "expeditions.events.maelstrom_navigation.choice1_success_text", effects: [], nextEvent: 'MAELSTROM_OEIL' }, failure: { textKey: "expeditions.events.maelstrom_navigation.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'MAELSTROM_OEIL' } }
        ]
    },
    'MAELSTROM_OEIL': {
        descriptionKey: "expeditions.events.maelstrom_oeil.description",
        choices: [
            { textKey: "expeditions.events.maelstrom_oeil.choice1_text", test: { stat: 'Intelligence', value: 55 }, success: { textKey: "expeditions.events.maelstrom_oeil.choice1_success_text", effects: [], nextEvent: 'MAELSTROM_FIN_SUCCES' }, failure: { textKey: "expeditions.events.maelstrom_oeil.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 60 }], nextEvent: 'MAELSTROM_FIN_ECHEC' } }
        ]
    },
    'MAELSTROM_FIN_SUCCES': { descriptionKey: "expeditions.events.maelstrom_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 5800 }, { type: 'fragments_gain', amount: 120 }] },
    'MAELSTROM_FIN_ECHEC': { descriptionKey: "expeditions.events.maelstrom_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 800 }] },
    'GUERRE_PROFONDS_DEBUT': {
        descriptionKey: "expeditions.events.guerre_profonds_debut.description",
        choices: [
            { textKey: "expeditions.events.guerre_profonds_debut.choice1_text", test: null, success: { textKey: "expeditions.events.guerre_profonds_debut.choice1_success_text", nextEvent: 'GUERRE_PROFONDS_VAGUE' } }
        ]
    },
    'GUERRE_PROFONDS_VAGUE': {
        descriptionKey: "expeditions.events.guerre_profonds_vague.description",
        choices: [
            { textKey: "expeditions.events.guerre_profonds_vague.choice1_text", test: { stat: 'Force', value: 50, stat2: 'Défense', value: 22 }, success: { textKey: "expeditions.events.guerre_profonds_vague.choice1_success_text", effects: [], nextEvent: 'GUERRE_PROFONDS_CHAMPION' }, failure: { textKey: "expeditions.events.guerre_profonds_vague.choice1_failure_text", effects: [], combat: { enemies: ['PROFOND_GUERRIER'], winEvent: 'GUERRE_PROFONDS_CHAMPION', lossEvent: 'GUERRE_PROFONDS_FIN_ECHEC' } } }
        ]
    },
    'GUERRE_PROFONDS_CHAMPION': {
        descriptionKey: "expeditions.events.guerre_profonds_champion.description",
        choices: [
            { textKey: "expeditions.events.guerre_profonds_champion.choice1_text", test: null, success: { combat: { enemies: ['PROFOND_CHAMPION', 'PROFOND_GUERRIER'], winEvent: 'GUERRE_PROFONDS_FIN_SUCCES', lossEvent: 'GUERRE_PROFONDS_FIN_ECHEC' } } }
        ]
    },
    'GUERRE_PROFONDS_FIN_SUCCES': { descriptionKey: "expeditions.events.guerre_profonds_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 7500 }, { type: 'resource', kind: 'metal', amount: 1000 }, { type: 'resource', kind: 'tissu', amount: 500 }] },
    'GUERRE_PROFONDS_FIN_ECHEC': { descriptionKey: "expeditions.events.guerre_profonds_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 1500 }] },
    'SABLIER_TEMPS_DEBUT': {
        descriptionKey: "expeditions.events.sablier_temps_debut.description",
        choices: [
            { textKey: "expeditions.events.sablier_temps_debut.choice1_text", test: null, success: { textKey: "expeditions.events.sablier_temps_debut.choice1_success_text", nextEvent: 'SABLIER_TEMPS_PISTE' } }
        ]
    },
    'SABLIER_TEMPS_PISTE': {
        descriptionKey: "expeditions.events.sablier_temps_piste.description",
        choices: [
            { textKey: "expeditions.events.sablier_temps_piste.choice1_text", test: { stat: 'Intelligence', value: 55, stat2: 'Chance', value: 45 }, success: { textKey: "expeditions.events.sablier_temps_piste.choice1_success_text", effects: [], nextEvent: 'SABLIER_TEMPS_COMBAT' }, failure: { textKey: "expeditions.events.sablier_temps_piste.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 30 }], nextEvent: 'SABLIER_TEMPS_COMBAT' } }
        ]
    },
    'SABLIER_TEMPS_COMBAT': {
        descriptionKey: "expeditions.events.sablier_temps_combat.description",
        choices: [
            { textKey: "expeditions.events.sablier_temps_combat.choice1_text", test: null, success: { combat: { enemies: ['ASSASSIN_DE_L_OMBRE'], winEvent: 'SABLIER_TEMPS_FIN_SUCCES', lossEvent: 'SABLIER_TEMPS_FIN_ECHEC' } } }
        ]
    },
    'SABLIER_TEMPS_FIN_SUCCES': { descriptionKey: "expeditions.events.sablier_temps_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 8000 }, { type: 'fragments_gain', amount: 80 }] },
    'SABLIER_TEMPS_FIN_ECHEC': { descriptionKey: "expeditions.events.sablier_temps_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -2500 }] },

    // ** LÉGENDAIRES **
    'RELIQUE_DEBUT': {
        descriptionKey: "expeditions.events.relique_debut.description",
        choices: [
            { textKey: "expeditions.events.relique_debut.choice1_text", test: null, success: { textKey: "expeditions.events.relique_debut.choice1_success_text", nextEvent: 'RELIQUE_ASCENSION' } }
        ]
    },
    'RELIQUE_ASCENSION': {
        descriptionKey: "expeditions.events.relique_ascension.description",
        choices: [
            { textKey: "expeditions.events.relique_ascension.choice1_text", test: { stat: 'Agilité', value: 70 }, success: { textKey: "expeditions.events.relique_ascension.choice1_success_text", effects: [], nextEvent: 'RELIQUE_GARDIEN' }, failure: { textKey: "expeditions.events.relique_ascension.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 25 }], nextEvent: 'RELIQUE_GARDIEN' } },
            { textKey: "expeditions.events.relique_ascension.choice2_text", test: { stat: 'Intelligence', value: 75 }, success: { textKey: "expeditions.events.relique_ascension.choice2_success_text", effects: [], nextEvent: 'RELIQUE_GARDIEN' }, failure: { textKey: "expeditions.events.relique_ascension.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 30 }], nextEvent: 'RELIQUE_GARDIEN' } }
        ]
    },
    'RELIQUE_GARDIEN': {
        descriptionKey: "expeditions.events.relique_gardien.description",
        choices: [
            { textKey: "expeditions.events.relique_gardien.choice1_text", test: { stat: 'Intelligence', value: 80 }, success: { textKey: "expeditions.events.relique_gardien.choice1_success_text", effects: [], nextEvent: 'RELIQUE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.relique_gardien.choice1_failure_text", combat: { enemies: ['ARCHANGE'], winEvent: 'RELIQUE_FIN_SUCCES', lossEvent: 'RELIQUE_FIN_ECHEC' } } },
            { textKey: "expeditions.events.relique_gardien.choice2_text", test: null, success: { textKey: "expeditions.events.relique_gardien.choice2_success_text", combat: { enemies: ['ARCHANGE'], winEvent: 'RELIQUE_FIN_SUCCES', lossEvent: 'RELIQUE_FIN_ECHEC' } } }
        ]
    },
    'RELIQUE_FIN_SUCCES': { descriptionKey: "expeditions.events.relique_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 12000 }, { type: 'resource', kind: 'metal', amount: 1500 }, { type: 'resource', kind: 'tissu', amount: 1500 }, { type: 'fragments_gain', amount: 150 }] },
    'RELIQUE_FIN_ECHEC': { descriptionKey: "expeditions.events.relique_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 2000 }] },
    'DRAGON_DEBUT': {
        descriptionKey: "expeditions.events.dragon_debut.description",
        choices: [
            { textKey: "expeditions.events.dragon_debut.choice1_text", test: null, success: { textKey: "expeditions.events.dragon_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'DRAGON_APPROCHE' } }
        ]
    },
    'DRAGON_APPROCHE': {
        descriptionKey: "expeditions.events.dragon_approche.description",
        choices: [
            { textKey: "expeditions.events.dragon_approche.choice1_text", test: { stat: 'Agilité', value: 70 }, success: { textKey: "expeditions.events.dragon_approche.choice1_success_text", effects: [], nextEvent: 'DRAGON_SURPRISE' }, failure: { textKey: "expeditions.events.dragon_approche.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 200 }], nextEvent: 'DRAGON_COMBAT' } },
            { textKey: "expeditions.events.dragon_approche.choice2_text", test: { stat: 'Vie', value: 150 }, success: { textKey: "expeditions.events.dragon_approche.choice2_success_text", effects: [], nextEvent: 'DRAGON_COMBAT' }, failure: { textKey: "expeditions.events.dragon_approche.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'DRAGON_FIN_ECHEC' } }
        ]
    },
    'DRAGON_SURPRISE': {
        descriptionKey: "expeditions.events.dragon_surprise.description",
        choices: [
            { textKey: "expeditions.events.dragon_surprise.choice1_text", test: null, success: { textKey: "expeditions.events.dragon_surprise.choice1_success_text", nextEvent: 'DRAGON_COMBAT' } }
        ]
    },
    'DRAGON_COMBAT': {
        descriptionKey: "expeditions.events.dragon_combat.description",
        choices: [
            { textKey: "expeditions.events.dragon_combat.choice1_text", test: null, success: { combat: { enemies: ['DRAGON_ROUGE_ANCIEN'], winEvent: 'DRAGON_FIN_SUCCES', lossEvent: 'DRAGON_FIN_ECHEC' } } }
        ]
    },
    'DRAGON_FIN_SUCCES': { descriptionKey: "expeditions.events.dragon_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 15000 }, { type: 'resource', kind: 'metal', amount: 2500 }, { type: 'resource', kind: 'bois', amount: 1000 }, { type: 'fragments_gain', amount: 200 }] },
    'DRAGON_FIN_ECHEC': { descriptionKey: "expeditions.events.dragon_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -5000 }] },
    'TOUR_DEBUT': {
        descriptionKey: "expeditions.events.tour_debut.description",
        choices: [
            { textKey: "expeditions.events.tour_debut.choice1_text", test: null, success: { textKey: "expeditions.events.tour_debut.choice1_success_text", nextEvent: 'TOUR_EPREUVE1' } }
        ]
    },
    'TOUR_EPREUVE1': {
        descriptionKey: "expeditions.events.tour_epreuve1.description",
        choices: [
            { textKey: "expeditions.events.tour_epreuve1.choice1_text", test: { stat: 'Force', value: 70 }, success: { textKey: "expeditions.events.tour_epreuve1.choice1_success_text", effects: [], nextEvent: 'TOUR_EPREUVE2' }, failure: { textKey: "expeditions.events.tour_epreuve1.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'TOUR_EPREUVE2' } }
        ]
    },
    'TOUR_EPREUVE2': {
        descriptionKey: "expeditions.events.tour_epreuve2.description",
        choices: [
            { textKey: "expeditions.events.tour_epreuve2.choice1_text", test: { stat: 'Intelligence', value: 85 }, success: { textKey: "expeditions.events.tour_epreuve2.choice1_success_text", effects: [], nextEvent: 'TOUR_SOMMET' }, failure: { textKey: "expeditions.events.tour_epreuve2.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'TOUR_SOMMET' } }
        ]
    },
    'TOUR_SOMMET': {
        descriptionKey: "expeditions.events.tour_sommet.description",
        choices: [
            { textKey: "expeditions.events.tour_sommet.choice1_text", test: null, success: { combat: { enemies: ['ARCHIMAGE_DEMENT'], winEvent: 'TOUR_FIN_SUCCES', lossEvent: 'TOUR_FIN_ECHEC' } } }
        ]
    },
    'TOUR_FIN_SUCCES': { descriptionKey: "expeditions.events.tour_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 18000 }, { type: 'resource', kind: 'tissu', amount: 2000 }, { type: 'resource', kind: 'bois', amount: 1500 }] },
    'TOUR_FIN_ECHEC': { descriptionKey: "expeditions.events.tour_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 3000 }] },
    'FORGEDIEUX_DEBUT': {
        descriptionKey: "expeditions.events.forgedieux_debut.description",
        choices: [
            { textKey: "expeditions.events.forgedieux_debut.choice1_text", test: null, success: { textKey: "expeditions.events.forgedieux_debut.choice1_success_text", nextEvent: 'FORGEDIEUX_EPREUVE_FORCE' } }
        ]
    },
    'FORGEDIEUX_EPREUVE_FORCE': {
        descriptionKey: "expeditions.events.forgedieux_epreuve_force.description",
        choices: [
            { textKey: "expeditions.events.forgedieux_epreuve_force.choice1_text", test: { stat: 'Force', value: 80, stat2: 'Défense', value: 40 }, success: { textKey: "expeditions.events.forgedieux_epreuve_force.choice1_success_text", effects: [], nextEvent: 'FORGEDIEUX_EPREUVE_INTEL' }, failure: { textKey: "expeditions.events.forgedieux_epreuve_force.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], waitTime: 30, nextEvent: 'FORGEDIEUX_EPREUVE_INTEL' } }
        ]
    },
    'FORGEDIEUX_EPREUVE_INTEL': {
        descriptionKey: "expeditions.events.forgedieux_epreuve_intel.description",
        choices: [
            { textKey: "expeditions.events.forgedieux_epreuve_intel.choice1_text", test: { stat: 'Intelligence', value: 80 }, success: { textKey: "expeditions.events.forgedieux_epreuve_intel.choice1_success_text", effects: [], nextEvent: 'FORGEDIEUX_COEUR' }, failure: { textKey: "expeditions.events.forgedieux_epreuve_intel.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'FORGEDIEUX_FIN_ECHEC' } }
        ]
    },
    'FORGEDIEUX_COEUR': {
        descriptionKey: "expeditions.events.forgedieux_coeur.description",
        choices: [
            { textKey: "expeditions.events.forgedieux_coeur.choice1_text", test: null, success: { textKey: "expeditions.events.forgedieux_coeur.choice1_success_text", nextEvent: 'FORGEDIEUX_FIN_SUCCES' } },
            { textKey: "expeditions.events.forgedieux_coeur.choice2_text", test: null, success: { textKey: "expeditions.events.forgedieux_coeur.choice2_success_text", nextEvent: 'FORGEDIEUX_FIN_SUCCES' } }
        ]
    },
    'FORGEDIEUX_FIN_SUCCES': { descriptionKey: "expeditions.events.forgedieux_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 20000 }, { type: 'resource', kind: 'metal', amount: 3000 }, { type: 'fragments_gain', amount: 300 }] },
    'FORGEDIEUX_FIN_ECHEC': { descriptionKey: "expeditions.events.forgedieux_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -8000 }] },
    'CONSEIL_DEBUT': {
        descriptionKey: "expeditions.events.conseil_debut.description",
        choices: [
            { textKey: "expeditions.events.conseil_debut.choice1_text", test: null, success: { textKey: "expeditions.events.conseil_debut.choice1_success_text", nextEvent: 'CONSEIL_ENQUETE' } }
        ]
    },
    'CONSEIL_ENQUETE': {
        descriptionKey: "expeditions.events.conseil_enquete.description",
        choices: [
            { textKey: "expeditions.events.conseil_enquete.choice1_text", test: { stat: 'Intelligence', value: 75 }, success: { textKey: "expeditions.events.conseil_enquete.choice1_success_text", effects: [], nextEvent: 'CONSEIL_PREUVES' }, failure: { textKey: "expeditions.events.conseil_enquete.choice1_failure_text", effects: [], nextEvent: 'CONSEIL_PREUVES' } },
            { textKey: "expeditions.events.conseil_enquete.choice2_text", test: { stat: 'Agilité', value: 78 }, success: { textKey: "expeditions.events.conseil_enquete.choice2_success_text", effects: [], nextEvent: 'CONSEIL_CONFRONTATION' }, failure: { textKey: "expeditions.events.conseil_enquete.choice2_failure_text", effects: [], nextEvent: 'CONSEIL_CONFRONTATION' } }
        ]
    },
    'CONSEIL_PREUVES': {
        descriptionKey: "expeditions.events.conseil_preuves.description",
        choices: [
            { textKey: "expeditions.events.conseil_preuves.choice1_text", test: { stat: 'Chance', value: 60 }, success: { textKey: "expeditions.events.conseil_preuves.choice1_success_text", effects: [], nextEvent: 'CONSEIL_CONFRONTATION' }, failure: { textKey: "expeditions.events.conseil_preuves.choice1_failure_text", effects: [], nextEvent: 'CONSEIL_FIN_ECHEC' } },
            { textKey: "expeditions.events.conseil_preuves.choice2_text", test: null, success: { textKey: "expeditions.events.conseil_preuves.choice2_success_text", effects: [], nextEvent: 'CONSEIL_FIN_MOYEN' } }
        ]
    },
    'CONSEIL_CONFRONTATION': {
        descriptionKey: "expeditions.events.conseil_confrontation.description",
        choices: [
            { textKey: "expeditions.events.conseil_confrontation.choice1_text", test: null, success: { combat: { enemies: ['MAITRE_DE_L_OMBRE'], winEvent: 'CONSEIL_FIN_SUCCES', lossEvent: 'CONSEIL_FIN_ECHEC' } } }
        ]
    },
    'CONSEIL_FIN_SUCCES': { descriptionKey: "expeditions.events.conseil_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 16000 }, { type: 'resource', kind: 'tissu', amount: 2500 }] },
    'CONSEIL_FIN_MOYEN': { descriptionKey: "expeditions.events.conseil_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 8000 }, { type: 'resource', kind: 'tissu', amount: 1000 }] },
    'CONSEIL_FIN_ECHEC': { descriptionKey: "expeditions.events.conseil_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -4000 }] },
    'TOMBEAU_SINGE_DEBUT': {
        descriptionKey: "expeditions.events.tombeau_singe_debut.description",
        choices: [
            { textKey: "expeditions.events.tombeau_singe_debut.choice1_text", test: null, success: { textKey: "expeditions.events.tombeau_singe_debut.choice1_success_text", nextEvent: 'TOMBEAU_SINGE_AGILITE' } }
        ]
    },
    'TOMBEAU_SINGE_AGILITE': {
        descriptionKey: "expeditions.events.tombeau_singe_agilite.description",
        choices: [
            { textKey: "expeditions.events.tombeau_singe_agilite.choice1_text", test: { stat: 'Agilité', value: 80 }, success: { textKey: "expeditions.events.tombeau_singe_agilite.choice1_success_text", effects: [], nextEvent: 'TOMBEAU_SINGE_INTELLIGENCE' }, failure: { textKey: "expeditions.events.tombeau_singe_agilite.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 20 }], nextEvent: 'TOMBEAU_SINGE_INTELLIGENCE' } }
        ]
    },
    'TOMBEAU_SINGE_INTELLIGENCE': {
        descriptionKey: "expeditions.events.tombeau_singe_intelligence.description",
        choices: [
            { textKey: "expeditions.events.tombeau_singe_intelligence.choice1_text", test: { stat: 'Intelligence', value: 82 }, success: { textKey: "expeditions.events.tombeau_singe_intelligence.choice1_success_text", effects: [], nextEvent: 'TOMBEAU_SINGE_ESPRIT' }, failure: { textKey: "expeditions.events.tombeau_singe_intelligence.choice1_failure_text", effects: [{ type: 'hp_loss_flat', value: 150 }], nextEvent: 'TOMBEAU_SINGE_ESPRIT' } }
        ]
    },
    'TOMBEAU_SINGE_ESPRIT': {
        descriptionKey: "expeditions.events.tombeau_singe_esprit.description",
        choices: [
            { textKey: "expeditions.events.tombeau_singe_esprit.choice1_text", test: null, success: { combat: { enemies: ['ROI_SINGE_ESPRIT'], winEvent: 'TOMBEAU_SINGE_FIN_SUCCES', lossEvent: 'TOMBEAU_SINGE_FIN_ECHEC' } } }
        ]
    },
    'TOMBEAU_SINGE_FIN_SUCCES': { descriptionKey: "expeditions.events.tombeau_singe_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 15000 }, { type: 'resource', kind: 'bois', amount: 2000 }, { type: 'resource', kind: 'tissu', amount: 2000 }] },
    'TOMBEAU_SINGE_FIN_ECHEC': { descriptionKey: "expeditions.events.tombeau_singe_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 3000 }] },
    'CITE_ENGLOUTIE_DEBUT': {
        descriptionKey: "expeditions.events.cite_engloutie_debut.description",
        choices: [
            { textKey: "expeditions.events.cite_engloutie_debut.choice1_text", test: { stat: 'Vie', value: 180 }, success: { textKey: "expeditions.events.cite_engloutie_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'CITE_ENGLOUTIE_SYMBOLES' }, failure: { textKey: "expeditions.events.cite_engloutie_debut.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'CITE_ENGLOUTIE_FIN_ECHEC' } }
        ]
    },
    'CITE_ENGLOUTIE_SYMBOLES': {
        descriptionKey: "expeditions.events.cite_engloutie_symboles.description",
        choices: [
            { textKey: "expeditions.events.cite_engloutie_symboles.choice1_text", test: { stat: 'Intelligence', value: 70 }, success: { textKey: "expeditions.events.cite_engloutie_symboles.choice1_success_text", effects: [{ type: 'xp_gain', amount: 5000 }], nextEvent: 'CITE_ENGLOUTIE_GARDIEN' }, failure: { textKey: "expeditions.events.cite_engloutie_symboles.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'CITE_ENGLOUTIE_GARDIEN' } }
        ]
    },
    'CITE_ENGLOUTIE_GARDIEN': {
        descriptionKey: "expeditions.events.cite_engloutie_gardien.description",
        choices: [
            { textKey: "expeditions.events.cite_engloutie_gardien.choice1_text", test: null, success: { textKey: "expeditions.events.cite_engloutie_gardien.choice1_success_text", combat: { enemies: ['SHOGGOTH'], winEvent: 'CITE_ENGLOUTIE_FIN_SUCCES', lossEvent: 'CITE_ENGLOUTIE_FIN_ECHEC' } } }
        ]
    },
    'CITE_ENGLOUTIE_FIN_SUCCES': { descriptionKey: "expeditions.events.cite_engloutie_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 18000 }, { type: 'fragments_gain', amount: 250 }] },
    'CITE_ENGLOUTIE_FIN_ECHEC': { descriptionKey: "expeditions.events.cite_engloutie_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -3000 }] },
    'DERNIER_GEANT_DEBUT': {
        descriptionKey: "expeditions.events.dernier_geant_debut.description",
        choices: [
            { textKey: "expeditions.events.dernier_geant_debut.choice1_text", test: null, success: { textKey: "expeditions.events.dernier_geant_debut.choice1_success_text", nextEvent: 'DERNIER_GEANT_REVEIL' } }
        ]
    },
    'DERNIER_GEANT_REVEIL': {
        descriptionKey: "expeditions.events.dernier_geant_reveil.description",
        choices: [
            { textKey: "expeditions.events.dernier_geant_reveil.choice1_text", test: { stat: 'Force', value: 75 }, success: { textKey: "expeditions.events.dernier_geant_reveil.choice1_success_text", effects: [], nextEvent: 'DERNIER_GEANT_CONVAINCRE' }, failure: { textKey: "expeditions.events.dernier_geant_reveil.choice1_failure_text", effects: [], nextEvent: 'DERNIER_GEANT_CONVAINCRE' } },
            { textKey: "expeditions.events.dernier_geant_reveil.choice2_text", test: { stat: 'Intelligence', value: 75 }, success: { textKey: "expeditions.events.dernier_geant_reveil.choice2_success_text", effects: [], nextEvent: 'DERNIER_GEANT_CONVAINCRE' } }
        ]
    },
    'DERNIER_GEANT_CONVAINCRE': {
        descriptionKey: "expeditions.events.dernier_geant_convaincre.description",
        choices: [
            { textKey: "expeditions.events.dernier_geant_convaincre.choice1_text", test: { stat: 'Intelligence', value: 85 }, success: { textKey: "expeditions.events.dernier_geant_convaincre.choice1_success_text", effects: [], nextEvent: 'DERNIER_GEANT_FIN_SUCCES' }, failure: { textKey: "expeditions.events.dernier_geant_convaincre.choice1_failure_text", effects: [], nextEvent: 'DERNIER_GEANT_EPREUVE' } },
            { textKey: "expeditions.events.dernier_geant_convaincre.choice2_text", test: null, success: { textKey: "expeditions.events.dernier_geant_convaincre.choice2_success_text", nextEvent: 'DERNIER_GEANT_EPREUVE' } }
        ]
    },
    'DERNIER_GEANT_EPREUVE': {
        descriptionKey: "expeditions.events.dernier_geant_epreuve.description",
        choices: [
            { textKey: "expeditions.events.dernier_geant_epreuve.choice1_text", test: { stat: 'Défense', value: 50, stat2: 'Vie', value: 200 }, success: { textKey: "expeditions.events.dernier_geant_epreuve.choice1_success_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'DERNIER_GEANT_FIN_SUCCES' }, failure: { textKey: "expeditions.events.dernier_geant_epreuve.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 90 }], nextEvent: 'DERNIER_GEANT_FIN_ECHEC' } }
        ]
    },
    'DERNIER_GEANT_FIN_SUCCES': { descriptionKey: "expeditions.events.dernier_geant_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 16000 }, { type: 'resource', kind: 'metal', amount: 3000 }] },
    'DERNIER_GEANT_FIN_ECHEC': { descriptionKey: "expeditions.events.dernier_geant_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 2500 }] },
    'ECHIQUIER_DIEUX_DEBUT': {
        descriptionKey: "expeditions.events.echiquier_dieux_debut.description",
        choices: [
            { textKey: "expeditions.events.echiquier_dieux_debut.choice1_text", test: null, success: { textKey: "expeditions.events.echiquier_dieux_debut.choice1_success_text", nextEvent: 'ECHIQUIER_DIEUX_PARTIE1' } }
        ]
    },
    'ECHIQUIER_DIEUX_PARTIE1': {
        descriptionKey: "expeditions.events.echiquier_dieux_partie1.description",
        choices: [
            { textKey: "expeditions.events.echiquier_dieux_partie1.choice1_text", test: { stat: 'Intelligence', value: 80 }, success: { textKey: "expeditions.events.echiquier_dieux_partie1.choice1_success_text", effects: [], nextEvent: 'ECHIQUIER_DIEUX_PARTIE2' }, failure: { textKey: "expeditions.events.echiquier_dieux_partie1.choice1_failure_text", effects: [], nextEvent: 'ECHIQUIER_DIEUX_FIN_ECHEC' } }
        ]
    },
    'ECHIQUIER_DIEUX_PARTIE2': {
        descriptionKey: "expeditions.events.echiquier_dieux_partie2.description",
        choices: [
            { textKey: "expeditions.events.echiquier_dieux_partie2.choice1_text", test: { stat: 'Intelligence', value: 85 }, success: { textKey: "expeditions.events.echiquier_dieux_partie2.choice1_success_text", effects: [], nextEvent: 'ECHIQUIER_DIEUX_PARTIE3' }, failure: { textKey: "expeditions.events.echiquier_dieux_partie2.choice1_failure_text", effects: [], nextEvent: 'ECHIQUIER_DIEUX_FIN_MOYEN' } }
        ]
    },
    'ECHIQUIER_DIEUX_PARTIE3': {
        descriptionKey: "expeditions.events.echiquier_dieux_partie3.description",
        choices: [
            { textKey: "expeditions.events.echiquier_dieux_partie3.choice1_text", test: { stat: 'Intelligence', value: 90 }, success: { textKey: "expeditions.events.echiquier_dieux_partie3.choice1_success_text", effects: [], nextEvent: 'ECHIQUIER_DIEUX_FIN_SUCCES' }, failure: { textKey: "expeditions.events.echiquier_dieux_partie3.choice1_failure_text", effects: [], nextEvent: 'ECHIQUIER_DIEUX_FIN_MOYEN' } }
        ]
    },
    'ECHIQUIER_DIEUX_FIN_SUCCES': { descriptionKey: "expeditions.events.echiquier_dieux_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 25000 }, { type: 'fragments_gain', amount: 100 }] },
    'ECHIQUIER_DIEUX_FIN_MOYEN': { descriptionKey: "expeditions.events.echiquier_dieux_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 12000 }] },
    'ECHIQUIER_DIEUX_FIN_ECHEC': { descriptionKey: "expeditions.events.echiquier_dieux_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -5000 }] },
    'TOISON_OR_DEBUT': {
        descriptionKey: "expeditions.events.toison_or_debut.description",
        choices: [
            { textKey: "expeditions.events.toison_or_debut.choice1_text", test: null, success: { textKey: "expeditions.events.toison_or_debut.choice1_success_text", nextEvent: 'TOISON_OR_SIRENES' } }
        ]
    },
    'TOISON_OR_SIRENES': {
        descriptionKey: "expeditions.events.toison_or_sirenes.description",
        choices: [
            { textKey: "expeditions.events.toison_or_sirenes.choice1_text", test: { stat: 'Défense', value: 30 }, success: { textKey: "expeditions.events.toison_or_sirenes.choice1_success_text", effects: [], nextEvent: 'TOISON_OR_HYDRE' }, failure: { textKey: "expeditions.events.toison_or_sirenes.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 25 }], nextEvent: 'TOISON_OR_HYDRE' } }
        ]
    },
    'TOISON_OR_HYDRE': {
        descriptionKey: "expeditions.events.toison_or_hydre.description",
        choices: [
            { textKey: "expeditions.events.toison_or_hydre.choice1_text", test: null, success: { combat: { enemies: ['HYDRE_DES_MARAIS'], winEvent: 'TOISON_OR_GARDIEN', lossEvent: 'TOISON_OR_FIN_ECHEC' } } }
        ]
    },
    'TOISON_OR_GARDIEN': {
        descriptionKey: "expeditions.events.toison_or_gardien.description",
        choices: [
            { textKey: "expeditions.events.toison_or_gardien.choice1_text", test: { stat: 'Intelligence', value: 75 }, success: { textKey: "expeditions.events.toison_or_gardien.choice1_success_text", effects: [], nextEvent: 'TOISON_OR_FIN_SUCCES' }, failure: { textKey: "expeditions.events.toison_or_gardien.choice1_failure_text", combat: { enemies: ['DRAGON_ROUGE_ANCIEN'], winEvent: 'TOISON_OR_FIN_SUCCES', lossEvent: 'TOISON_OR_FIN_ECHEC' } } }
        ]
    },
    'TOISON_OR_FIN_SUCCES': { descriptionKey: "expeditions.events.toison_or_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 20000 }, { type: 'resource', kind: 'tissu', amount: 5000 }] },
    'TOISON_OR_FIN_ECHEC': { descriptionKey: "expeditions.events.toison_or_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -6000 }] },
    'FORET_MONDE_DEBUT': {
        descriptionKey: "expeditions.events.foret_monde_debut.description",
        choices: [
            { textKey: "expeditions.events.foret_monde_debut.choice1_text", test: null, success: { textKey: "expeditions.events.foret_monde_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'FORET_MONDE_CORRUPTION' } }
        ]
    },
    'FORET_MONDE_CORRUPTION': {
        descriptionKey: "expeditions.events.foret_monde_corruption.description",
        choices: [
            { textKey: "expeditions.events.foret_monde_corruption.choice1_text", test: { stat: 'Vie', value: 220 }, success: { textKey: "expeditions.events.foret_monde_corruption.choice1_success_text", effects: [], nextEvent: 'FORET_MONDE_COEUR' }, failure: { textKey: "expeditions.events.foret_monde_corruption.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'FORET_MONDE_COEUR' } }
        ]
    },
    'FORET_MONDE_COEUR': {
        descriptionKey: "expeditions.events.foret_monde_coeur.description",
        choices: [
            { textKey: "expeditions.events.foret_monde_coeur.choice1_text", test: { stat: 'Intelligence', value: 80, stat2: 'Chance', value: 70 }, success: { textKey: "expeditions.events.foret_monde_coeur.choice1_success_text", effects: [], nextEvent: 'FORET_MONDE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.foret_monde_coeur.choice1_failure_text", combat: { enemies: ['CHIMERE'], winEvent: 'FORET_MONDE_FIN_MOYEN', lossEvent: 'FORET_MONDE_FIN_ECHEC' } } }
        ]
    },
    'FORET_MONDE_FIN_SUCCES': { descriptionKey: "expeditions.events.foret_monde_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 17000 }, { type: 'resource', kind: 'bois', amount: 4000 }] },
    'FORET_MONDE_FIN_MOYEN': { descriptionKey: "expeditions.events.foret_monde_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 12000 }, { type: 'resource', kind: 'bois', amount: 2000 }] },
    'FORET_MONDE_FIN_ECHEC': { descriptionKey: "expeditions.events.foret_monde_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 3000 }] },
    'TOURNOI_CHAMPIONS_DEBUT': {
        descriptionKey: "expeditions.events.tournoi_champions_debut.description",
        choices: [
            { textKey: "expeditions.events.tournoi_champions_debut.choice1_text", test: null, success: { combat: { enemies: ['ROI_BARBARE'], winEvent: 'TOURNOI_CHAMPIONS_MANCHE2', lossEvent: 'TOURNOI_CHAMPIONS_FIN_ECHEC' } } }
        ]
    },
    'TOURNOI_CHAMPIONS_MANCHE2': {
        descriptionKey: "expeditions.events.tournoi_champions_manche2.description",
        choices: [
            { textKey: "expeditions.events.tournoi_champions_manche2.choice1_text", test: null, success: { combat: { enemies: ['ARCHERE_ELFE'], winEvent: 'TOURNOI_CHAMPIONS_FINALE', lossEvent: 'TOURNOI_CHAMPIONS_FIN_MOYEN' } } }
        ]
    },
    'TOURNOI_CHAMPIONS_FINALE': {
        descriptionKey: "expeditions.events.tournoi_champions_finale.description",
        choices: [
            { textKey: "expeditions.events.tournoi_champions_finale.choice1_text", test: null, success: { combat: { enemies: ['CHEVALIER_ETERNEL'], winEvent: 'TOURNOI_CHAMPIONS_FIN_SUCCES', lossEvent: 'TOURNOI_CHAMPIONS_FIN_MOYEN' } } }
        ]
    },
    'TOURNOI_CHAMPIONS_FIN_SUCCES': { descriptionKey: "expeditions.events.tournoi_champions_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 22000 }, { type: 'resource', kind: 'metal', amount: 2500 }, { type: 'resource', kind: 'tissu', amount: 2500 }] },
    'TOURNOI_CHAMPIONS_FIN_MOYEN': { descriptionKey: "expeditions.events.tournoi_champions_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 15000 }, { type: 'resource', kind: 'metal', amount: 1500 }, { type: 'resource', kind: 'tissu', amount: 1500 }] },
    'TOURNOI_CHAMPIONS_FIN_ECHEC': { descriptionKey: "expeditions.events.tournoi_champions_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 5000 }] },
    'BIBLIO_INFINIE_DEBUT': {
        descriptionKey: "expeditions.events.biblio_infinie_debut.description",
        choices: [
            { textKey: "expeditions.events.biblio_infinie_debut.choice1_text", test: null, success: { textKey: "expeditions.events.biblio_infinie_debut.choice1_success_text", nextEvent: 'BIBLIO_INFINIE_CHERCHER' } }
        ]
    },
    'BIBLIO_INFINIE_CHERCHER': {
        descriptionKey: "expeditions.events.biblio_infinie_chercher.description",
        choices: [
            { textKey: "expeditions.events.biblio_infinie_chercher.choice1_text", test: { stat: 'Intelligence', value: 88 }, success: { textKey: "expeditions.events.biblio_infinie_chercher.choice1_success_text", effects: [], nextEvent: 'BIBLIO_INFINIE_GARDIEN' }, failure: { textKey: "expeditions.events.biblio_infinie_chercher.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 25 }], waitTime: 60, nextEvent: 'BIBLIO_INFINIE_GARDIEN' } },
            { textKey: "expeditions.events.biblio_infinie_chercher.choice2_text", test: { stat: 'Chance', value: 80 }, success: { textKey: "expeditions.events.biblio_infinie_chercher.choice2_success_text", effects: [], nextEvent: 'BIBLIO_INFINIE_GARDIEN' }, failure: { textKey: "expeditions.events.biblio_infinie_chercher.choice2_failure_text", effects: [], nextEvent: 'BIBLIO_INFINIE_FIN_ECHEC' } }
        ]
    },
    'BIBLIO_INFINIE_GARDIEN': {
        descriptionKey: "expeditions.events.biblio_infinie_gardien.description",
        choices: [
            { textKey: "expeditions.events.biblio_infinie_gardien.choice1_text", test: { stat: 'Intelligence', value: 90 }, success: { textKey: "expeditions.events.biblio_infinie_gardien.choice1_success_text", effects: [], nextEvent: 'BIBLIO_INFINIE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.biblio_infinie_gardien.choice1_failure_text", effects: [], nextEvent: 'BIBLIO_INFINIE_FIN_ECHEC' } }
        ]
    },
    'BIBLIO_INFINIE_FIN_SUCCES': { descriptionKey: "expeditions.events.biblio_infinie_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 30000 }, { type: 'resource', kind: 'tissu', amount: 6000 }] },
    'BIBLIO_INFINIE_FIN_ECHEC': { descriptionKey: "expeditions.events.biblio_infinie_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -10000 }] },
    'FORGERON_AMES_DEBUT': {
        descriptionKey: "expeditions.events.forgeron_ames_debut.description",
        choices: [
            { textKey: "expeditions.events.forgeron_ames_debut.choice1_text", test: null, success: { textKey: "expeditions.events.forgeron_ames_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'FORGERON_AMES_PRISON' } }
        ]
    },
    'FORGERON_AMES_PRISON': {
        descriptionKey: "expeditions.events.forgeron_ames_prison.description",
        choices: [
            { textKey: "expeditions.events.forgeron_ames_prison.choice1_text", test: { stat: 'Force', value: 75 }, success: { textKey: "expeditions.events.forgeron_ames_prison.choice1_success_text", effects: [], nextEvent: 'FORGERON_AMES_COMBAT' }, failure: { textKey: "expeditions.events.forgeron_ames_prison.choice1_failure_text", effects: [], nextEvent: 'FORGERON_AMES_COMBAT' } }
        ]
    },
    'FORGERON_AMES_COMBAT': {
        descriptionKey: "expeditions.events.forgeron_ames_combat.description",
        choices: [
            { textKey: "expeditions.events.forgeron_ames_combat.choice1_text", test: null, success: { combat: { enemies: ['FORGERON_DEMON'], winEvent: 'FORGERON_AMES_FIN_SUCCES', lossEvent: 'FORGERON_AMES_FIN_ECHEC' } } }
        ]
    },
    'FORGERON_AMES_FIN_SUCCES': { descriptionKey: "expeditions.events.forgeron_ames_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 19000 }, { type: 'resource', kind: 'metal', amount: 5000 }, { type: 'fragments_gain', amount: 250 }] },
    'FORGERON_AMES_FIN_ECHEC': { descriptionKey: "expeditions.events.forgeron_ames_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 4000 }] },
    'ARMEE_TENERBES_DEBUT': {
        descriptionKey: "expeditions.events.armee_tenebres_debut.description",
        choices: [
            { textKey: "expeditions.events.armee_tenebres_debut.choice1_text", test: null, success: { textKey: "expeditions.events.armee_tenebres_debut.choice1_success_text", nextEvent: 'ARMEE_TENERBES_BATAILLE' } }
        ]
    },
    'ARMEE_TENERBES_BATAILLE': {
        descriptionKey: "expeditions.events.armee_tenebres_bataille.description",
        choices: [
            { textKey: "expeditions.events.armee_tenebres_bataille.choice1_text", test: { stat: 'Intelligence', value: 70 }, success: { textKey: "expeditions.events.armee_tenebres_bataille.choice1_success_text", effects: [], nextEvent: 'ARMEE_TENERBES_COMBAT' }, failure: { textKey: "expeditions.events.armee_tenebres_bataille.choice1_failure_text", combat: { enemies: ['DEMON_MINEUR'], winEvent: 'ARMEE_TENERBES_COMBAT', lossEvent: 'ARMEE_TENERBES_FIN_ECHEC' } } },
            { textKey: "expeditions.events.armee_tenebres_bataille.choice2_text", test: { stat: 'Force', value: 80, stat2: 'Défense', value: 45 }, success: { textKey: "expeditions.events.armee_tenebres_bataille.choice2_success_text", effects: [], nextEvent: 'ARMEE_TENERBES_COMBAT' }, failure: { textKey: "expeditions.events.armee_tenebres_bataille.choice2_failure_text", effects: [], nextEvent: 'ARMEE_TENERBES_FIN_ECHEC' } }
        ]
    },
    'ARMEE_TENERBES_COMBAT': {
        descriptionKey: "expeditions.events.armee_tenebres_combat.description",
        choices: [
            { textKey: "expeditions.events.armee_tenebres_combat.choice1_text", test: null, success: { combat: { enemies: ['DEMON_MINEUR', 'GENERAL_DEMON', 'DEMON_MINEUR'], winEvent: 'ARMEE_TENERBES_FIN_SUCCES', lossEvent: 'ARMEE_TENERBES_FIN_ECHEC' } } }
        ]
    },
    'ARMEE_TENERBES_FIN_SUCCES': { descriptionKey: "expeditions.events.armee_tenebres_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 28000 }, { type: 'resource', kind: 'metal', amount: 4000 }, { type: 'fragments_gain', amount: 200 }] },
    'ARMEE_TENERBES_FIN_ECHEC': { descriptionKey: "expeditions.events.armee_tenebres_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -10000 }] },

    // ** MYTHIQUES **
    'BRECHE_DEBUT': {
        descriptionKey: "expeditions.events.breche_debut.description",
        choices: [
            { textKey: "expeditions.events.breche_debut.choice1_text", test: null, success: { textKey: "expeditions.events.breche_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'BRECHE_NAVIGATION' } }
        ]
    },
    'BRECHE_NAVIGATION': {
        descriptionKey: "expeditions.events.breche_navigation.description",
        choices: [
            { textKey: "expeditions.events.breche_navigation.choice1_text", test: { stat: 'Défense', value: 50 }, success: { textKey: "expeditions.events.breche_navigation.choice1_success_text", effects: [], nextEvent: 'BRECHE_GARDIENS' }, failure: { textKey: "expeditions.events.breche_navigation.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'BRECHE_GARDIENS' } }
        ]
    },
    'BRECHE_GARDIENS': {
        descriptionKey: "expeditions.events.breche_gardiens.description",
        choices: [
            { textKey: "expeditions.events.breche_gardiens.choice1_text", test: null, success: { combat: { enemies: ['HORREUR_DIMENSIONNELLE'], winEvent: 'BRECHE_SCEAU', lossEvent: 'BRECHE_FIN_ECHEC' } } }
        ]
    },
    'BRECHE_SCEAU': {
        descriptionKey: "expeditions.events.breche_sceau.description",
        choices: [
            { textKey: "expeditions.events.breche_sceau.choice1_text", test: { stat: 'Intelligence', value: 100 }, success: { textKey: "expeditions.events.breche_sceau.choice1_success_text", effects: [], nextEvent: 'BRECHE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.breche_sceau.choice1_failure_text", effects: [], nextEvent: 'BRECHE_FIN_ECHEC' } }
        ]
    },
    'BRECHE_FIN_SUCCES': { descriptionKey: "expeditions.events.breche_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 30000 }, { type: 'resource', kind: 'tissu', amount: 5000 }, { type: 'resource', kind: 'metal', amount: 3000 }] },
    'BRECHE_FIN_ECHEC': { descriptionKey: "expeditions.events.breche_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -15000 }] },
    'CORRUPTION_DEBUT': {
        descriptionKey: "expeditions.events.corruption_debut.description",
        choices: [
            { textKey: "expeditions.events.corruption_debut.choice1_text", test: null, success: { textKey: "expeditions.events.corruption_debut.choice1_success_text", nextEvent: 'CORRUPTION_CHEMIN' } }
        ]
    },
    'CORRUPTION_CHEMIN': {
        descriptionKey: "expeditions.events.corruption_chemin.description",
        choices: [
            { textKey: "expeditions.events.corruption_chemin.choice1_text", test: null, success: { combat: { enemies: ['GRIFFON_CORROMPU'], winEvent: 'CORRUPTION_GARDIEN', lossEvent: 'CORRUPTION_FIN_ECHEC' } } }
        ]
    },
    'CORRUPTION_GARDIEN': {
        descriptionKey: "expeditions.events.corruption_gardien.description",
        choices: [
            { textKey: "expeditions.events.corruption_gardien.choice1_text", test: null, success: { combat: { enemies: ['DRAGON_CORROMPU'], winEvent: 'CORRUPTION_COEUR', lossEvent: 'CORRUPTION_FIN_ECHEC' } } }
        ]
    },
    'CORRUPTION_COEUR': {
        descriptionKey: "expeditions.events.corruption_coeur.description",
        choices: [
            { textKey: "expeditions.events.corruption_coeur.choice1_text", test: { stat: 'Vie', value: 300 }, success: { textKey: "expeditions.events.corruption_coeur.choice1_success_text", effects: [], nextEvent: 'CORRUPTION_FIN_SUCCES' }, failure: { textKey: "expeditions.events.corruption_coeur.choice1_failure_text", effects: [], nextEvent: 'CORRUPTION_FIN_ECHEC' } },
            { textKey: "expeditions.events.corruption_coeur.choice2_text", test: { stat: 'Défense', value: 60 }, success: { textKey: "expeditions.events.corruption_coeur.choice2_success_text", effects: [{ type: 'hp_loss_percent', value: 80 }], nextEvent: 'CORRUPTION_FIN_MOYEN' } }
        ]
    },
    'CORRUPTION_FIN_SUCCES': { descriptionKey: "expeditions.events.corruption_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 50000 }, { type: 'resource', kind: 'metal', amount: 5000 }, { type: 'resource', kind: 'bois', amount: 5000 }, { type: 'resource', kind: 'tissu', amount: 5000 }] },
    'CORRUPTION_FIN_MOYEN': { descriptionKey: "expeditions.events.corruption_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 35000 }, { type: 'resource', kind: 'metal', amount: 2500 }, { type: 'resource', kind: 'bois', amount: 2500 }, { type: 'resource', kind: 'tissu', amount: 2500 }] },
    'CORRUPTION_FIN_ECHEC': { descriptionKey: "expeditions.events.corruption_fin_echec.description", isEnd: true, rewards: [] },
    'ETOILE_DEBUT': {
        descriptionKey: "expeditions.events.etoile_debut.description",
        choices: [
            { textKey: "expeditions.events.etoile_debut.choice1_text", test: null, success: { textKey: "expeditions.events.etoile_debut.choice1_success_text", nextEvent: 'ETOILE_MECANISME' } }
        ]
    },
    'ETOILE_MECANISME': {
        descriptionKey: "expeditions.events.etoile_mecanisme.description",
        choices: [
            { textKey: "expeditions.events.etoile_mecanisme.choice1_text", test: { stat: 'Intelligence', value: 110 }, success: { textKey: "expeditions.events.etoile_mecanisme.choice1_success_text", effects: [], nextEvent: 'ETOILE_FIN_SUCCES' }, failure: { textKey: "expeditions.events.etoile_mecanisme.choice1_failure_text", effects: [], nextEvent: 'ETOILE_SURCHARGE' } }
        ]
    },
    'ETOILE_SURCHARGE': {
        descriptionKey: "expeditions.events.etoile_surcharge.description",
        choices: [
            { textKey: "expeditions.events.etoile_surcharge.choice1_text", test: { stat: 'Défense', value: 55 }, success: { textKey: "expeditions.events.etoile_surcharge.choice1_success_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'ETOILE_FIN_MOYEN' }, failure: { textKey: "expeditions.events.etoile_surcharge.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 100 }], nextEvent: 'ETOILE_FIN_ECHEC' } }
        ]
    },
    'ETOILE_FIN_SUCCES': { descriptionKey: "expeditions.events.etoile_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 40000 }, { type: 'resource', kind: 'metal', amount: 6000 }] },
    'ETOILE_FIN_MOYEN': { descriptionKey: "expeditions.events.etoile_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 15000 }, { type: 'resource', kind: 'metal', amount: 1000 }] },
    'ETOILE_FIN_ECHEC': { descriptionKey: "expeditions.events.etoile_fin_echec.description", isEnd: true, rewards: [] },
    'ROI_DEBUT': {
        descriptionKey: "expeditions.events.roi_debut.description",
        choices: [
            { textKey: "expeditions.events.roi_debut.choice1_text", test: null, success: { textKey: "expeditions.events.roi_debut.choice1_success_text", triggersRandomEvent: true, nextEvent: 'ROI_GARDIENS' } }
        ]
    },
    'ROI_GARDIENS': {
        descriptionKey: "expeditions.events.roi_gardiens.description",
        choices: [
            { textKey: "expeditions.events.roi_gardiens.choice1_text", test: null, success: { combat: { enemies: ['GOLEM_PIERRE_MYTHIQUE'], winEvent: 'ROI_COEUR', lossEvent: 'ROI_FIN_ECHEC' } } }
        ]
    },
    'ROI_COEUR': {
        descriptionKey: "expeditions.events.roi_coeur.description",
        choices: [
            { textKey: "expeditions.events.roi_coeur.choice1_text", test: { stat: 'Intelligence', value: 90 }, success: { textKey: "expeditions.events.roi_coeur.choice1_success_text", effects: [], nextEvent: 'ROI_JUGEMENT' }, failure: { textKey: "expeditions.events.roi_coeur.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 60 }], nextEvent: 'ROI_FIN_ECHEC' } }
        ]
    },
    'ROI_JUGEMENT': {
        descriptionKey: "expeditions.events.roi_jugement.description",
        choices: [
            { textKey: "expeditions.events.roi_jugement.choice1_text", test: null, success: { textKey: "expeditions.events.roi_jugement.choice1_success_text", effects: [], nextEvent: 'ROI_FIN_SUCCES' } }
        ]
    },
    'ROI_FIN_SUCCES': { descriptionKey: "expeditions.events.roi_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 60000 }, { type: 'resource', kind: 'metal', amount: 8000 }, { type: 'resource', kind: 'bois', amount: 8000 }, { type: 'resource', kind: 'tissu', amount: 8000 }, { type: 'fragments_gain', amount: 500 }] },
    'ROI_FIN_ECHEC': { descriptionKey: "expeditions.events.roi_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -10000 }] },
    'SILENCE_ETOILES_DEBUT': {
        descriptionKey: "expeditions.events.silence_etoiles_debut.description",
        choices: [
            { textKey: "expeditions.events.silence_etoiles_debut.choice1_text", test: null, success: { textKey: "expeditions.events.silence_etoiles_debut.choice1_success_text", nextEvent: 'SILENCE_ETOILES_REVELATION' } }
        ]
    },
    'SILENCE_ETOILES_REVELATION': {
        descriptionKey: "expeditions.events.silence_etoiles_revelation.description",
        choices: [
            { textKey: "expeditions.events.silence_etoiles_revelation.choice1_text", test: null, success: { textKey: "expeditions.events.silence_etoiles_revelation.choice1_success_text", nextEvent: 'SILENCE_ETOILES_CHOIX' } }
        ]
    },
    'SILENCE_ETOILES_CHOIX': {
        descriptionKey: "expeditions.events.silence_etoiles_choix.description",
        choices: [
            { textKey: "expeditions.events.silence_etoiles_choix.choice1_text", test: { stat: 'Intelligence', value: 120 }, success: { textKey: "expeditions.events.silence_etoiles_choix.choice1_success_text", effects: [], nextEvent: 'SILENCE_ETOILES_FIN_SUCCES' }, failure: { textKey: "expeditions.events.silence_etoiles_choix.choice1_failure_text", effects: [], nextEvent: 'SILENCE_ETOILES_FIN_ECHEC' } },
            { textKey: "expeditions.events.silence_etoiles_choix.choice2_text", test: { stat: 'Chance', value: 100 }, success: { textKey: "expeditions.events.silence_etoiles_choix.choice2_success_text", effects: [], nextEvent: 'SILENCE_ETOILES_FIN_SUCCES' }, failure: { textKey: "expeditions.events.silence_etoiles_choix.choice2_failure_text", effects: [{ type: 'hp_loss_percent', value: 90 }], nextEvent: 'SILENCE_ETOILES_FIN_ECHEC' } }
        ]
    },
    'SILENCE_ETOILES_FIN_SUCCES': { descriptionKey: "expeditions.events.silence_etoiles_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 50000 }, { type: 'fragments_gain', amount: 400 }] },
    'SILENCE_ETOILES_FIN_ECHEC': { descriptionKey: "expeditions.events.silence_etoiles_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -20000 }] },
    'TUER_DIEU_DEBUT': {
        descriptionKey: "expeditions.events.tuer_dieu_debut.description",
        choices: [
            { textKey: "expeditions.events.tuer_dieu_debut.choice1_text", test: null, success: { textKey: "expeditions.events.tuer_dieu_debut.choice1_success_text", nextEvent: 'TUER_DIEU_ASCENSION' } }
        ]
    },
    'TUER_DIEU_ASCENSION': {
        descriptionKey: "expeditions.events.tuer_dieu_ascension.description",
        choices: [
            { textKey: "expeditions.events.tuer_dieu_ascension.choice1_text", test: { stat: 'Intelligence', value: 100 }, success: { textKey: "expeditions.events.tuer_dieu_ascension.choice1_success_text", effects: [], nextEvent: 'TUER_DIEU_COMBAT' }, failure: { textKey: "expeditions.events.tuer_dieu_ascension.choice1_failure_text", combat: { enemies: ['ARCHANGE'], winEvent: 'TUER_DIEU_COMBAT', lossEvent: 'TUER_DIEU_FIN_ECHEC' } } },
            { textKey: "expeditions.events.tuer_dieu_ascension.choice2_text", test: null, success: { textKey: "expeditions.events.tuer_dieu_ascension.choice2_success_text", combat: { enemies: ['ARCHANGE'], winEvent: 'TUER_DIEU_COMBAT', lossEvent: 'TUER_DIEU_FIN_ECHEC' } } }
        ]
    },
    'TUER_DIEU_COMBAT': {
        descriptionKey: "expeditions.events.tuer_dieu_combat.description",
        choices: [
            { textKey: "expeditions.events.tuer_dieu_combat.choice1_text", test: null, success: { combat: { enemies: ['DIEU_FOU'], winEvent: 'TUER_DIEU_FIN_SUCCES', lossEvent: 'TUER_DIEU_FIN_ECHEC' } } }
        ]
    },
    'TUER_DIEU_FIN_SUCCES': { descriptionKey: "expeditions.events.tuer_dieu_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 100000 }, { type: 'resource', kind: 'metal', amount: 10000 }, { type: 'fragments_gain', amount: 2000 }] },
    'TUER_DIEU_FIN_ECHEC': { descriptionKey: "expeditions.events.tuer_dieu_fin_echec.description", isEnd: true, rewards: [] },
    'REFLET_BRISE_DEBUT': {
        descriptionKey: "expeditions.events.reflet_brise_debut.description",
        choices: [
            { textKey: "expeditions.events.reflet_brise_debut.choice1_text", test: null, success: { textKey: "expeditions.events.reflet_brise_debut.choice1_success_text", nextEvent: 'REFLET_BRISE_MONDE_SOMBRE' } }
        ]
    },
    'REFLET_BRISE_MONDE_SOMBRE': {
        descriptionKey: "expeditions.events.reflet_brise_monde_sombre.description",
        choices: [
            { textKey: "expeditions.events.reflet_brise_monde_sombre.choice1_text", test: null, success: { textKey: "expeditions.events.reflet_brise_monde_sombre.choice1_success_text", nextEvent: 'REFLET_BRISE_COMBAT' } }
        ]
    },
    'REFLET_BRISE_COMBAT': {
        descriptionKey: "expeditions.events.reflet_brise_combat.description",
        choices: [
            { textKey: "expeditions.events.reflet_brise_combat.choice1_text", test: null, success: { combat: { enemies: ['DOUBLE_SOMBRE'], winEvent: 'REFLET_BRISE_FIN_SUCCES', lossEvent: 'REFLET_BRISE_FIN_ECHEC' } } },
            { textKey: "expeditions.events.reflet_brise_combat.choice2_text", test: { stat: 'Intelligence', value: 110 }, success: { textKey: "expeditions.events.reflet_brise_combat.choice2_success_text", effects: [], nextEvent: 'REFLET_BRISE_FIN_FUSION' }, failure: { textKey: "expeditions.events.reflet_brise_combat.choice2_failure_text", combat: { enemies: ['DOUBLE_SOMBRE'], winEvent: 'REFLET_BRISE_FIN_SUCCES', lossEvent: 'REFLET_BRISE_FIN_ECHEC' } } }
        ]
    },
    'REFLET_BRISE_FIN_SUCCES': { descriptionKey: "expeditions.events.reflet_brise_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 45000 }, { type: 'resource', kind: 'tissu', amount: 8000 }] },
    'REFLET_BRISE_FIN_FUSION': { descriptionKey: "expeditions.events.reflet_brise_fin_fusion.description", isEnd: true, rewards: [{ type: 'xp', amount: 60000 }, { type: 'resource', kind: 'tissu', amount: 4000 }, { type: 'fragments_gain', amount: 500 }] },
    'REFLET_BRISE_FIN_ECHEC': { descriptionKey: "expeditions.events.reflet_brise_fin_echec.description", isEnd: true, rewards: [] },
    'MELODIE_CREATION_DEBUT': {
        descriptionKey: "expeditions.events.melodie_creation_debut.description",
        choices: [
            { textKey: "expeditions.events.melodie_creation_debut.choice1_text", test: null, success: { textKey: "expeditions.events.melodie_creation_debut.choice1_success_text", nextEvent: 'MELODIE_CREATION_NOTE_TERRE' } }
        ]
    },
    'MELODIE_CREATION_NOTE_TERRE': {
        descriptionKey: "expeditions.events.melodie_creation_note_terre.description",
        choices: [
            { textKey: "expeditions.events.melodie_creation_note_terre.choice1_text", test: { stat: 'Force', value: 110, stat2: 'Défense', value: 55 }, success: { textKey: "expeditions.events.melodie_creation_note_terre.choice1_success_text", effects: [], nextEvent: 'MELODIE_CREATION_NOTE_EAU' } }
        ]
    },
    'MELODIE_CREATION_NOTE_EAU': {
        descriptionKey: "expeditions.events.melodie_creation_note_eau.description",
        choices: [
            { textKey: "expeditions.events.melodie_creation_note_eau.choice1_text", test: { stat: 'Chance', value: 110 }, success: { textKey: "expeditions.events.melodie_creation_note_eau.choice1_success_text", effects: [], nextEvent: 'MELODIE_CREATION_NOTE_FEU' } }
        ]
    },
    'MELODIE_CREATION_NOTE_FEU': {
        descriptionKey: "expeditions.events.melodie_creation_note_feu.description",
        choices: [
            { textKey: "expeditions.events.melodie_creation_note_feu.choice1_text", test: { stat: 'Vie', value: 250 }, success: { textKey: "expeditions.events.melodie_creation_note_feu.choice1_success_text", effects: [], nextEvent: 'MELODIE_CREATION_FINALE' } }
        ]
    },
    'MELODIE_CREATION_FINALE': {
        descriptionKey: "expeditions.events.melodie_creation_finale.description",
        choices: [
            { textKey: "expeditions.events.melodie_creation_finale.choice1_text", test: { stat: 'Intelligence', value: 115 }, success: { textKey: "expeditions.events.melodie_creation_finale.choice1_success_text", effects: [], nextEvent: 'MELODIE_CREATION_FIN_SUCCES' }, failure: { textKey: "expeditions.events.melodie_creation_finale.choice1_failure_text", effects: [], nextEvent: 'MELODIE_CREATION_FIN_ECHEC' } }
        ]
    },
    'MELODIE_CREATION_FIN_SUCCES': { descriptionKey: "expeditions.events.melodie_creation_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 60000 }] },
    'MELODIE_CREATION_FIN_ECHEC': { descriptionKey: "expeditions.events.melodie_creation_fin_echec.description", isEnd: true, rewards: [] },
    'ROUE_TEMPS_DEBUT': {
        descriptionKey: "expeditions.events.roue_temps_debut.description",
        choices: [
            { textKey: "expeditions.events.roue_temps_debut.choice1_text", test: null, success: { textKey: "expeditions.events.roue_temps_debut.choice1_success_text", nextEvent: 'ROUE_TEMPS_GARDIEN' } }
        ]
    },
    'ROUE_TEMPS_GARDIEN': {
        descriptionKey: "expeditions.events.roue_temps_gardien.description",
        choices: [
            { textKey: "expeditions.events.roue_temps_gardien.choice1_text", test: { stat: 'Intelligence', value: 125 }, success: { textKey: "expeditions.events.roue_temps_gardien.choice1_success_text", effects: [], nextEvent: 'ROUE_TEMPS_COEUR' }, failure: { textKey: "expeditions.events.roue_temps_gardien.choice1_failure_text", combat: { enemies: ['OUROBOROS'], winEvent: 'ROUE_TEMPS_COEUR', lossEvent: 'ROUE_TEMPS_FIN_ECHEC' } } }
        ]
    },
    'ROUE_TEMPS_COEUR': {
        descriptionKey: "expeditions.events.roue_temps_coeur.description",
        choices: [
            { textKey: "expeditions.events.roue_temps_coeur.choice1_text", test: { stat: 'Force', value: 120 }, success: { textKey: "expeditions.events.roue_temps_coeur.choice1_success_text", effects: [], nextEvent: 'ROUE_TEMPS_FIN_SUCCES' } },
            { textKey: "expeditions.events.roue_temps_coeur.choice2_text", test: null, success: { textKey: "expeditions.events.roue_temps_coeur.choice2_success_text", effects: [], nextEvent: 'ROUE_TEMPS_FIN_MOYEN' } }
        ]
    },
    'ROUE_TEMPS_FIN_SUCCES': { descriptionKey: "expeditions.events.roue_temps_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 80000 }, { type: 'fragments_gain', amount: 1500 }] },
    'ROUE_TEMPS_FIN_MOYEN': { descriptionKey: "expeditions.events.roue_temps_fin_moyen.description", isEnd: true, rewards: [{ type: 'xp', amount: 50000 }] },
    'ROUE_TEMPS_FIN_ECHEC': { descriptionKey: "expeditions.events.roue_temps_fin_echec.description", isEnd: true, rewards: [] },
    'JARDIN_HEPHAISTOS_DEBUT': {
        descriptionKey: "expeditions.events.jardin_hephaistos_debut.description",
        choices: [
            { textKey: "expeditions.events.jardin_hephaistos_debut.choice1_text", test: null, success: { textKey: "expeditions.events.jardin_hephaistos_debut.choice1_success_text", nextEvent: 'JARDIN_HEPHAISTOS_FAUNE' } }
        ]
    },
    'JARDIN_HEPHAISTOS_FAUNE': {
        descriptionKey: "expeditions.events.jardin_hephaistos_faune.description",
        choices: [
            { textKey: "expeditions.events.jardin_hephaistos_faune.choice1_text", test: { stat: 'Force', value: 100 }, success: { textKey: "expeditions.events.jardin_hephaistos_faune.choice1_success_text", effects: [], nextEvent: 'JARDIN_HEPHAISTOS_GARDIEN' }, failure: { textKey: "expeditions.events.jardin_hephaistos_faune.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 40 }], nextEvent: 'JARDIN_HEPHAISTOS_GARDIEN' } }
        ]
    },
    'JARDIN_HEPHAISTOS_GARDIEN': {
        descriptionKey: "expeditions.events.jardin_hephaistos_gardien.description",
        choices: [
            { textKey: "expeditions.events.jardin_hephaistos_gardien.choice1_text", test: { stat: 'Intelligence', value: 100 }, success: { textKey: "expeditions.events.jardin_hephaistos_gardien.choice1_success_text", effects: [], nextEvent: 'JARDIN_HEPHAISTOS_COMBAT' } },
            { textKey: "expeditions.events.jardin_hephaistos_gardien.choice2_text", test: null, success: { textKey: "expeditions.events.jardin_hephaistos_gardien.choice2_success_text", combat: { enemies: ['TALOS_REFORGE'], winEvent: 'JARDIN_HEPHAISTOS_FIN_SUCCES', lossEvent: 'JARDIN_HEPHAISTOS_FIN_ECHEC' } } }
        ]
    },
    'JARDIN_HEPHAISTOS_COMBAT': {
        descriptionKey: "expeditions.events.jardin_hephaistos_combat.description",
        choices: [
            { textKey: "expeditions.events.jardin_hephaistos_combat.choice1_text", test: { stat: 'Agilité', value: 100 }, success: { textKey: "expeditions.events.jardin_hephaistos_combat.choice1_success_text", effects: [], nextEvent: 'JARDIN_HEPHAISTOS_FIN_SUCCES' }, failure: { textKey: "expeditions.events.jardin_hephaistos_combat.choice1_failure_text", combat: { enemies: ['TALOS_REFORGE'], winEvent: 'JARDIN_HEPHAISTOS_FIN_SUCCES', lossEvent: 'JARDIN_HEPHAISTOS_FIN_ECHEC' } } }
        ]
    },
    'JARDIN_HEPHAISTOS_FIN_SUCCES': { descriptionKey: "expeditions.events.jardin_hephaistos_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 55000 }, { type: 'resource', kind: 'metal', amount: 12000 }, { type: 'resource', kind: 'bois', amount: 5000 }] },
    'JARDIN_HEPHAISTOS_FIN_ECHEC': { descriptionKey: "expeditions.events.jardin_hephaistos_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: 5000 }] },
    'ENCRE_DESTIN_DEBUT': {
        descriptionKey: "expeditions.events.encre_destin_debut.description",
        choices: [
            { textKey: "expeditions.events.encre_destin_debut.choice1_text", test: null, success: { textKey: "expeditions.events.encre_destin_debut.choice1_success_text", nextEvent: 'ENCRE_DESTIN_LIVRE' } }
        ]
    },
    'ENCRE_DESTIN_LIVRE': {
        descriptionKey: "expeditions.events.encre_destin_livre.description",
        choices: [
            { textKey: "expeditions.events.encre_destin_livre.choice1_text", test: { stat: 'Intelligence', value: 100 }, success: { textKey: "expeditions.events.encre_destin_livre.choice1_success_text", effects: [], nextEvent: 'ENCRE_DESTIN_ECRIRE' }, failure: { textKey: "expeditions.events.encre_destin_livre.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'ENCRE_DESTIN_FIN_ECHEC' } },
            { textKey: "expeditions.events.encre_destin_livre.choice2_text", test: null, success: { textKey: "expeditions.events.encre_destin_livre.choice2_success_text", effects: [], nextEvent: 'ENCRE_DESTIN_ECRIRE' } }
        ]
    },
    'ENCRE_DESTIN_ECRIRE': {
        descriptionKey: "expeditions.events.encre_destin_ecrire.description",
        choices: [
            { textKey: "expeditions.events.encre_destin_ecrire.choice1_text", test: { stat: 'Chance', value: 120 }, success: { textKey: "expeditions.events.encre_destin_ecrire.choice1_success_text", effects: [], nextEvent: 'ENCRE_DESTIN_FIN_SUCCES' } },
            { textKey: "expeditions.events.encre_destin_ecrire.choice2_text", test: { stat: 'Vie', value: 300 }, success: { textKey: "expeditions.events.encre_destin_ecrire.choice2_success_text", effects: [], nextEvent: 'ENCRE_DESTIN_FIN_SUCCES' } },
            { textKey: "expeditions.events.encre_destin_ecrire.choice3_text", test: null, success: { textKey: "expeditions.events.encre_destin_ecrire.choice3_success_text", effects: [], nextEvent: 'ENCRE_DESTIN_FIN_SUCCES' } }
        ]
    },
    'ENCRE_DESTIN_FIN_SUCCES': { descriptionKey: "expeditions.events.encre_destin_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 75000 }] },
    'ENCRE_DESTIN_FIN_ECHEC': { descriptionKey: "expeditions.events.encre_destin_fin_echec.description", isEnd: true, rewards: [{ type: 'xp', amount: -30000 }] },
    'PROCES_ASMODEUS_DEBUT': {
        descriptionKey: "expeditions.events.proces_asmodeus_debut.description",
        choices: [
            { textKey: "expeditions.events.proces_asmodeus_debut.choice1_text", test: null, success: { textKey: "expeditions.events.proces_asmodeus_debut.choice1_success_text", nextEvent: 'PROCES_ASMODEUS_TEMOIN1' } }
        ]
    },
    'PROCES_ASMODEUS_TEMOIN1': {
        descriptionKey: "expeditions.events.proces_asmodeus_temoin1.description",
        choices: [
            { textKey: "expeditions.events.proces_asmodeus_temoin1.choice1_text", test: { stat: 'Intelligence', value: 110 }, success: { textKey: "expeditions.events.proces_asmodeus_temoin1.choice1_success_text", effects: [], nextEvent: 'PROCES_ASMODEUS_TEMOIN2' }, failure: { textKey: "expeditions.events.proces_asmodeus_temoin1.choice1_failure_text", effects: [], nextEvent: 'PROCES_ASMODEUS_FIN_ECHEC' } }
        ]
    },
    'PROCES_ASMODEUS_TEMOIN2': {
        descriptionKey: "expeditions.events.proces_asmodeus_temoin2.description",
        choices: [
            { textKey: "expeditions.events.proces_asmodeus_temoin2.choice1_text", test: { stat: 'Chance', value: 110 }, success: { textKey: "expeditions.events.proces_asmodeus_temoin2.choice1_success_text", effects: [], nextEvent: 'PROCES_ASMODEUS_VERDICT' }, failure: { textKey: "expeditions.events.proces_asmodeus_temoin2.choice1_failure_text", effects: [], nextEvent: 'PROCES_ASMODEUS_FIN_ECHEC' } }
        ]
    },
    'PROCES_ASMODEUS_VERDICT': {
        descriptionKey: "expeditions.events.proces_asmodeus_verdict.description",
        choices: [
            { textKey: "expeditions.events.proces_asmodeus_verdict.choice1_text", test: { stat: 'Intelligence', value: 130 }, success: { textKey: "expeditions.events.proces_asmodeus_verdict.choice1_success_text", effects: [], nextEvent: 'PROCES_ASMODEUS_FIN_SUCCES' }, failure: { textKey: "expeditions.events.proces_asmodeus_verdict.choice1_failure_text", effects: [], nextEvent: 'PROCES_ASMODEUS_FIN_ECHEC' } }
        ]
    },
    'PROCES_ASMODEUS_FIN_SUCCES': { descriptionKey: "expeditions.events.proces_asmodeus_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 90000 }, { type: 'fragments_gain', amount: 1000 }] },
    'PROCES_ASMODEUS_FIN_ECHEC': { descriptionKey: "expeditions.events.proces_asmodeus_fin_echec.description", isEnd: true, rewards: [] },
    'TRONE_VIDE_DEBUT': {
        descriptionKey: "expeditions.events.trone_vide_debut.description",
        choices: [
            { textKey: "expeditions.events.trone_vide_debut.choice1_text", test: null, success: { textKey: "expeditions.events.trone_vide_debut.choice1_success_text", nextEvent: 'TRONE_VIDE_EPREUVES' } }
        ]
    },
    'TRONE_VIDE_EPREUVES': {
        descriptionKey: "expeditions.events.trone_vide_epreuves.description",
        choices: [
            { textKey: "expeditions.events.trone_vide_epreuves.choice1_text", test: { stat: 'Force', value: 120 }, success: { textKey: "expeditions.events.trone_vide_epreuves.choice1_success_text", nextEvent: 'TRONE_VIDE_EPREUVES2' } },
            { textKey: "expeditions.events.trone_vide_epreuves.choice2_text", test: { stat: 'Intelligence', value: 120 }, success: { textKey: "expeditions.events.trone_vide_epreuves.choice2_success_text", nextEvent: 'TRONE_VIDE_EPREUVES2' } }
        ]
    },
    'TRONE_VIDE_EPREUVES2': {
        descriptionKey: "expeditions.events.trone_vide_epreuves2.description",
        choices: [
            { textKey: "expeditions.events.trone_vide_epreuves2.choice1_text", test: { stat: 'Agilité', value: 120 }, success: { textKey: "expeditions.events.trone_vide_epreuves2.choice1_success_text", nextEvent: 'TRONE_VIDE_TRONE' } },
            { textKey: "expeditions.events.trone_vide_epreuves2.choice2_text", test: { stat: 'Vie', value: 300 }, success: { textKey: "expeditions.events.trone_vide_epreuves2.choice2_success_text", nextEvent: 'TRONE_VIDE_TRONE' } }
        ]
    },
    'TRONE_VIDE_TRONE': {
        descriptionKey: "expeditions.events.trone_vide_trone.description",
        choices: [
            { textKey: "expeditions.events.trone_vide_trone.choice1_text", test: null, success: { textKey: "expeditions.events.trone_vide_trone.choice1_success_text", effects: [], nextEvent: 'TRONE_VIDE_FIN_SUCCES' } },
            { textKey: "expeditions.events.trone_vide_trone.choice2_text", test: null, success: { textKey: "expeditions.events.trone_vide_trone.choice2_success_text", effects: [], nextEvent: 'TRONE_VIDE_FIN_ECHEC' } }
        ]
    },
    'TRONE_VIDE_FIN_SUCCES': { descriptionKey: "expeditions.events.trone_vide_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 85000 }, { type: 'resource', kind: 'tissu', amount: 10000 }, { type: 'resource', kind: 'metal', amount: 10000 }] },
    'TRONE_VIDE_FIN_ECHEC': { descriptionKey: "expeditions.events.trone_vide_fin_echec.description", isEnd: true, rewards: [] },
    'COMMENCEMENT_FIN_DEBUT': {
        descriptionKey: "expeditions.events.commencement_fin_debut.description",
        choices: [
            { textKey: "expeditions.events.commencement_fin_debut.choice1_text", test: null, success: { textKey: "expeditions.events.commencement_fin_debut.choice1_success_text", nextEvent: 'COMMENCEMENT_FIN_COURSE' } }
        ]
    },
    'COMMENCEMENT_FIN_COURSE': {
        descriptionKey: "expeditions.events.commencement_fin_course.description",
        choices: [
            { textKey: "expeditions.events.commencement_fin_course.choice1_text", test: { stat: 'Agilité', value: 110 }, success: { textKey: "expeditions.events.commencement_fin_course.choice1_success_text", effects: [], nextEvent: 'COMMENCEMENT_FIN_PORTE' }, failure: { textKey: "expeditions.events.commencement_fin_course.choice1_failure_text", effects: [{ type: 'hp_loss_percent', value: 50 }], nextEvent: 'COMMENCEMENT_FIN_PORTE' } }
        ]
    },
    'COMMENCEMENT_FIN_PORTE': {
        descriptionKey: "expeditions.events.commencement_fin_porte.description",
        choices: [
            { textKey: "expeditions.events.commencement_fin_porte.choice1_text", test: { stat: 'Force', value: 110, stat2: 'Défense', value: 60 }, success: { textKey: "expeditions.events.commencement_fin_porte.choice1_success_text", effects: [], nextEvent: 'COMMENCEMENT_FIN_SUCCES' }, failure: { textKey: "expeditions.events.commencement_fin_porte.choice1_failure_text", effects: [], nextEvent: 'COMMENCEMENT_FIN_ECHEC' } }
        ]
    },
    'COMMENCEMENT_FIN_SUCCES': { descriptionKey: "expeditions.events.commencement_fin_succes.description", isEnd: true, rewards: [{ type: 'xp', amount: 70000 }, { type: 'fragments_gain', amount: 500 }] },
    'COMMENCEMENT_FIN_ECHEC': { descriptionKey: "expeditions.events.commencement_fin_echec.description", isEnd: true, rewards: [] },}

// ============================================================================
// SECTION: AFFIXES (REFORGE)
// ============================================================================

const AFFIX_DB = {
    // ============================================================================
    // ==   ARMES (7 affixes)
    // ============================================================================
    'Arme': [
        {
            key: 'sangsue', nameKey: "affixes.arme.sangsue", tiers: [
                { rarity: 'common',   stats: { Vie: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Vie: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Vie: [3, 4], 'lifesteal_percent': [0.5, 0.8] }, weight: 55 }, { rarity: 'epic',     stats: { Force: [1, 2], Vie: [4, 5], 'lifesteal_percent': [0.9, 1.4] }, weight: 25 },
                { rarity: 'legendary',stats: { Force: [3, 4], Vie: [6, 8], 'lifesteal_percent': [1.5, 2.2] }, weight: 18 }, { rarity: 'mythic',   stats: { Force: [4, 6], Vie: [8, 10], 'lifesteal_percent': [2.5, 3.5] }, weight: 8 }
            ]
        },
        {
            key: 'feroce', nameKey: "affixes.arme.feroce", tiers: [
                { rarity: 'common',   stats: { Force: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Force: [2, 3] }, weight: 70 },
                { rarity: 'rare',     stats: { Force: [3, 4], CritChance: [0.5, 1.0] }, weight: 55 }, { rarity: 'epic',     stats: { Force: [5, 6], CritChance: [1.1, 1.8], CritDamage: [5, 8] }, weight: 25 },
                { rarity: 'legendary',stats: { Force: [6, 7], CritChance: [1.9, 2.8], CritDamage: [9, 14] }, weight: 18 }, { rarity: 'mythic',   stats: { Force: [8, 10], CritChance: [3.0, 4.5], CritDamage: [15, 25] }, weight: 8 }
            ]
        },
        {
            key: 'ethere', nameKey: "affixes.arme.ethere", tiers: [
                { rarity: 'common',   stats: { Intelligence: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Intelligence: [2, 3] }, weight: 70 },
                { rarity: 'rare',     stats: { Intelligence: [4, 5] }, weight: 55 }, { rarity: 'epic',     stats: { Intelligence: [6, 7], Vie: [4, 5] }, weight: 25 },
                { rarity: 'legendary',stats: { Intelligence: [8, 10], Vie: [6, 8] }, weight: 18 }, { rarity: 'mythic',   stats: { Intelligence: [11, 14], Vie: [8, 10] }, weight: 8 }
            ]
        },
        {
            key: 'perforant', nameKey: "affixes.arme.perforant", tiers: [
                { rarity: 'common',   stats: { Agilité: [1, 1] }, weight: 90 }, { rarity: 'uncommon', stats: { Agilité: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Agilité: [3, 3], 'armor_shred_percent': [3.0, 5.0] }, weight: 50 }, { rarity: 'epic',     stats: { Agilité: [4, 4], 'armor_shred_percent': [5.5, 8.0] }, weight: 22 },
                { rarity: 'legendary',stats: { Agilité: [5, 6], 'armor_shred_percent': [8.5, 12.0] }, weight: 8 }, { rarity: 'mythic',   stats: { Agilité: [7, 8], 'armor_shred_percent': [12.5, 18.0] }, weight: 7 }
            ]
        },
        {
            key: 'de_commotion', nameKey: "affixes.arme.de_commotion", tiers: [
                { rarity: 'common',   stats: { Force: [1, 1] }, weight: 90 }, { rarity: 'uncommon', stats: { Force: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Force: [3, 3], 'stun_chance_percent': [1.0, 1.5] }, weight: 50 }, { rarity: 'epic',     stats: { Force: [4, 4], 'stun_chance_percent': [1.6, 2.5] }, weight: 22 },
                { rarity: 'legendary',stats: { Force: [5, 6], 'stun_chance_percent': [2.6, 4.0] }, weight: 8 }, { rarity: 'mythic',   stats: { Force: [7, 8], 'stun_chance_percent': [4.5, 6.0] }, weight: 7 }
            ]
        },
        {
            key: 'du_conquerant', nameKey: "affixes.arme.du_conquerant", tiers: [
                { rarity: 'common',   stats: { Force: [1, 1] }, weight: 60 }, { rarity: 'uncommon', stats: { Agilité: [1, 1] }, weight: 55 },
                { rarity: 'rare',     stats: { Force: [2, 2], Agilité: [2, 2] }, weight: 30 }, { rarity: 'epic',     stats: { Force: [3, 4], Agilité: [3, 4], Vie: [3, 4] }, weight: 15 },
                { rarity: 'legendary',stats: { Force: [5, 6], Agilité: [5, 6], Vie: [5, 6] }, weight: 5 }, { rarity: 'mythic',   stats: { Force: [7, 8], Agilité: [7, 8], Vie: [7, 8] }, weight: 14 }
            ]
        }
    ],

    // ============================================================================
    // ==   TÊTE (6 affixes)
    // ============================================================================
    'Tête': [
        {
            key: 'du_sage', nameKey: "affixes.tete.du_sage", tiers: [
                { rarity: 'common',   stats: { Intelligence: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Intelligence: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Intelligence: [3, 4], 'xp_gain_percent': [1.0, 1.5] }, weight: 55 }, { rarity: 'epic',     stats: { Intelligence: [4, 5], 'xp_gain_percent': [1.6, 2.5] }, weight: 25 },
                { rarity: 'legendary',stats: { Intelligence: [6, 8], 'xp_gain_percent': [2.6, 4.0] }, weight: 18 }, { rarity: 'mythic',   stats: { Intelligence: [9, 11], 'xp_gain_percent': [4.5, 6.0] }, weight: 8 }
            ]
        },
        {
            key: 'de_laigle', nameKey: "affixes.tete.de_laigle", tiers: [
                { rarity: 'common',   stats: { Chance: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Chance: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Chance: [3, 4], CritChance: [1.0, 1.5] }, weight: 55 }, { rarity: 'epic',     stats: { Chance: [4, 5], CritChance: [1.6, 2.5] }, weight: 25 },
                { rarity: 'legendary',stats: { Chance: [6, 8], CritChance: [2.6, 4.0] }, weight: 18 }, { rarity: 'mythic',   stats: { Chance: [9, 11], CritChance: [4.5, 6.0] }, weight: 8 }
            ]
        },
        {
            key: 'du_penseur', nameKey: "affixes.tete.du_penseur", tiers: [
                { rarity: 'common',   stats: { Intelligence: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Vie: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Intelligence: [3, 3], Vie: [3, 3] }, weight: 55 }, { rarity: 'epic',     stats: { Intelligence: [4, 5], Vie: [4, 5] }, weight: 25 },
                { rarity: 'legendary',stats: { Intelligence: [6, 7], Vie: [6, 7], Défense: [1, 1] }, weight: 18 }, { rarity: 'mythic',   stats: { Intelligence: [8, 10], Vie: [8, 10], Défense: [2, 2] }, weight: 8 }
            ]
        },
        {
            key: 'de_clairvoyance', nameKey: "affixes.tete.de_clairvoyance", tiers: [
                { rarity: 'common',   stats: { Chance: [2, 2] }, weight: 90 }, { rarity: 'uncommon', stats: { Chance: [3, 3] }, weight: 70 },
                { rarity: 'rare',     stats: { Chance: [4, 4], LootBonusPercent: [1.0, 2.0] }, weight: 50 }, { rarity: 'epic',     stats: { Chance: [5, 6], LootBonusPercent: [2.1, 3.5] }, weight: 22 },
                { rarity: 'legendary',stats: { Chance: [7, 8], LootBonusPercent: [3.6, 5.0] }, weight: 8 }, { rarity: 'mythic',   stats: { Chance: [9, 11], LootBonusPercent: [5.5, 7.5] }, weight: 7 }
            ]
        },
        {
            key: 'dimpassibilite', nameKey: "affixes.tete.dimpassibilite", tiers: [
                { rarity: 'common',   stats: { Vie: [1, 1] }, weight: 90 }, { rarity: 'uncommon', stats: { Vie: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Vie: [3, 4], 'debuff_resistance_percent': [2.0, 4.0] }, weight: 50 }, { rarity: 'epic',     stats: { Vie: [5, 6], 'debuff_resistance_percent': [4.5, 7.0] }, weight: 22 },
                { rarity: 'legendary',stats: { Vie: [7, 8], 'debuff_resistance_percent': [7.5, 11.0] }, weight: 8 }, { rarity: 'mythic',   stats: { Vie: [9, 11], 'debuff_resistance_percent': [11.5, 16.0] }, weight: 7 }
            ]
        },
        {
            key: 'de_concentration', nameKey: "affixes.tete.de_concentration", tiers: [
                { rarity: 'common',   stats: { Intelligence: [1, 1] }, weight: 90 }, { rarity: 'uncommon', stats: { Vie: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Intelligence: [2, 3], 'healing_effectiveness_percent': [3.0, 5.0] }, weight: 50 }, { rarity: 'epic',     stats: { Intelligence: [4, 5], 'healing_effectiveness_percent': [5.5, 8.0] }, weight: 22 },
                { rarity: 'legendary',stats: { Intelligence: [6, 7], 'healing_effectiveness_percent': [8.5, 12.0] }, weight: 8 }, { rarity: 'mythic',   stats: { Intelligence: [8, 10], 'healing_effectiveness_percent': [12.5, 18.0] }, weight: 7 }
            ]
        }
    ],

    // ============================================================================
    // ==   TORSE (6 affixes)
    // ============================================================================
    'Torse': [
        {
            key: 'du_rempart', nameKey: "affixes.torse.du_rempart", tiers: [
                { rarity: 'common',   stats: { Défense: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Défense: [1, 1], Vie: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Défense: [2, 2], 'resistance_percent': [1.5, 2.0] }, weight: 55 }, { rarity: 'epic',     stats: { Défense: [3, 3], Vie: [3, 4], 'resistance_percent': [2.1, 3.5] }, weight: 25 },
                { rarity: 'legendary',stats: { Défense: [4, 4], Vie: [5, 6], 'resistance_percent': [3.6, 5.0] }, weight: 18 }, { rarity: 'mythic',   stats: { Défense: [5, 6], Vie: [7, 9], 'resistance_percent': [5.5, 7.0] }, weight: 8 }
            ]
        },
        {
            key: 'du_colosse', nameKey: "affixes.torse.du_colosse", tiers: [
                { rarity: 'common',   stats: { Vie: [2, 2] }, weight: 80 }, { rarity: 'uncommon', stats: { Vie: [3, 3] }, weight: 70 },
                { rarity: 'rare',     stats: { Vie: [4, 5] }, weight: 55 }, { rarity: 'epic',     stats: { Vie: [6, 7], Force: [1, 2] }, weight: 25 },
                { rarity: 'legendary',stats: { Vie: [8, 10], Force: [3, 4] }, weight: 18 }, { rarity: 'mythic',   stats: { Vie: [11, 14], Force: [4, 6] }, weight: 8 }
            ]
        },
        {
            key: 'de_vitalite', nameKey: "affixes.torse.de_vitalite", tiers: [
                { rarity: 'common',   stats: { Vie: [1,1] }, weight: 80 }, { rarity: 'uncommon', stats: { RegenHP: [0.05, 0.05] }, weight: 70 },
                { rarity: 'rare',     stats: { Vie: [3,4], RegenHP: [0.1, 0.1] }, weight: 55 }, { rarity: 'epic',     stats: { Vie: [5,6], RegenHP: [0.15, 0.2] }, weight: 25 },
                { rarity: 'legendary',stats: { Vie: [7,9], RegenHP: [0.21, 0.3] }, weight: 18 }, { rarity: 'mythic',   stats: { Vie: [10,12], RegenHP: [0.35, 0.5] }, weight: 8 }
            ]
        },
        {
            key: 'depines', nameKey: "affixes.torse.depines", tiers: [
                { rarity: 'common',   stats: { Défense: [1,1] }, weight: 90 }, { rarity: 'uncommon', stats: { 'thorns_damage_flat': [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Défense: [1,1], 'thorns_damage_flat': [1, 2] }, weight: 50 }, { rarity: 'epic',     stats: { Défense: [2,2], 'thorns_damage_flat': [3, 4] }, weight: 22 },
                { rarity: 'legendary',stats: { Défense: [3,3], 'thorns_damage_flat': [5, 7] }, weight: 8 }, { rarity: 'mythic',   stats: { Défense: [4,4], 'thorns_damage_flat': [8, 12] }, weight: 7 }
            ]
        },
        {
            key: 'du_survivant', nameKey: "affixes.torse.du_survivant", tiers: [
                { rarity: 'common',   stats: { Vie: [1,1] }, weight: 90 }, { rarity: 'uncommon', stats: { Défense: [1,1] }, weight: 70 },
                { rarity: 'rare',     stats: { Vie: [3,3], Défense: [1,1] }, weight: 50 }, { rarity: 'epic',     stats: { Vie: [4,4], Défense: [2,2] }, weight: 22 },
                { rarity: 'legendary',stats: { Vie: [5,6], Défense: [3,3] }, weight: 8 }, { rarity: 'mythic',   stats: { Vie: [7,8], Défense: [4,4] }, weight: 7 }
            ]
        },
        {
            key: 'beni', nameKey: "affixes.torse.beni", tiers: [
                { rarity: 'common',   stats: { Vie: [2,2] }, weight: 80 }, { rarity: 'uncommon', stats: { RegenHP: [0.1,0.1] }, weight: 70 },
                { rarity: 'rare',     stats: { Vie: [3,3], RegenHP: [0.1,0.1] }, weight: 55 }, { rarity: 'epic',     stats: { Vie: [4,5], RegenHP: [0.15,0.15] }, weight: 25 },
                { rarity: 'legendary',stats: { Vie: [6,7], RegenHP: [0.2,0.2] }, weight: 18 }, { rarity: 'mythic',   stats: { Vie: [8,10], RegenHP: [0.25,0.25] }, weight: 8 }
            ]
        }
    ],
    
    // ============================================================================
    // ==   JAMBES (6 affixes)
    // ============================================================================
    'Jambes': [
        {
            key: 'dacier', nameKey: "affixes.jambes.dacier", tiers: [
                { rarity: 'common',   stats: { Défense: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Défense: [1, 1], Vie: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Défense: [2, 2], Vie: [2, 3] }, weight: 55 }, { rarity: 'epic',     stats: { Défense: [3, 3], Vie: [4, 5] }, weight: 25 },
                { rarity: 'legendary',stats: { Défense: [4, 4], Vie: [6, 7] }, weight: 18 }, { rarity: 'mythic',   stats: { Défense: [5, 5], Vie: [8, 10] }, weight: 8 }
            ]
        },
        {
            key: 'de_vitesse', nameKey: "affixes.jambes.de_vitesse", tiers: [
                { rarity: 'common',   stats: { Agilité: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Agilité: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Agilité: [3, 4] }, weight: 55 }, { rarity: 'epic',     stats: { Agilité: [5, 6], Chance: [2, 3] }, weight: 25 },
                { rarity: 'legendary',stats: { Agilité: [7, 9], Chance: [4, 5] }, weight: 18 }, { rarity: 'mythic',   stats: { Agilité: [10, 12], Chance: [6, 7] }, weight: 8 }
            ]
        },
        {
            key: 'du_rempart', nameKey: "affixes.jambes.du_rempart", tiers: [
                { rarity: 'common',   stats: { Défense: [1, 1] }, weight: 90 }, { rarity: 'uncommon', stats: { Vie: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Défense: [1, 1], 'resistance_percent': [1.0, 1.5] }, weight: 50 }, { rarity: 'epic',     stats: { Défense: [2, 2], 'resistance_percent': [1.6, 2.5] }, weight: 22 },
                { rarity: 'legendary',stats: { Défense: [3, 3], 'resistance_percent': [2.6, 3.5] }, weight: 8 }, { rarity: 'mythic',   stats: { Défense: [4, 4], 'resistance_percent': [3.6, 5.0] }, weight: 7 }
            ]
        },
        {
            key: 'dancrage', nameKey: "affixes.jambes.dancrage", tiers: [
                { rarity: 'common',   stats: { Vie: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Défense: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Vie: [2, 3], Défense: [1, 1] }, weight: 55 }, { rarity: 'epic',     stats: { Vie: [4, 5], Défense: [2, 2] }, weight: 25 },
                { rarity: 'legendary',stats: { Vie: [6, 7], Défense: [3, 3] }, weight: 18 }, { rarity: 'mythic',   stats: { Vie: [8, 10], Défense: [4, 4] }, weight: 8 }
            ]
        },
        {
            key: 'du_sprinteur', nameKey: "affixes.jambes.du_sprinteur", tiers: [
                { rarity: 'common',   stats: { Agilité: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Agilité: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Agilité: [3, 3], Vie: [2, 2] }, weight: 55 }, { rarity: 'epic',     stats: { Agilité: [4, 5], Vie: [3, 4] }, weight: 25 },
                { rarity: 'legendary',stats: { Agilité: [6, 7], Vie: [5, 6] }, weight: 18 }, { rarity: 'mythic',   stats: { Agilité: [8, 10], Vie: [7, 8] }, weight: 8 }
            ]
        },
        {
            key: 'robuste', nameKey: "affixes.jambes.robuste", tiers: [
                { rarity: 'common',   stats: { Vie: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Vie: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Vie: [3, 4] }, weight: 55 }, { rarity: 'epic',     stats: { Vie: [5, 6], Force: [1, 1] }, weight: 25 },
                { rarity: 'legendary',stats: { Vie: [7, 8], Force: [2, 2] }, weight: 18 }, { rarity: 'mythic',   stats: { Vie: [9, 11], Force: [3, 3] }, weight: 8 }
            ]
        }
    ],

    // ============================================================================
    // ==   PIEDS (6 affixes)
    // ============================================================================
    'Pieds': [
        {
            key: 'de_celerite', nameKey: "affixes.pieds.de_celerite", tiers: [
                { rarity: 'common',   stats: { Agilité: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Agilité: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Agilité: [3, 4] }, weight: 55 }, { rarity: 'epic',     stats: { Agilité: [5, 6] }, weight: 25 },
                { rarity: 'legendary',stats: { Agilité: [7, 9] }, weight: 18 }, { rarity: 'mythic',   stats: { Agilité: [10, 12] }, weight: 8 }
            ]
        },
        {
            key: 'plaquees', nameKey: "affixes.pieds.plaquees", tiers: [
                { rarity: 'common',   stats: { Défense: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Défense: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Défense: [2, 2], Vie: [1, 1] }, weight: 55 }, { rarity: 'epic',     stats: { Défense: [3, 3], Vie: [2, 2] }, weight: 25 },
                { rarity: 'legendary',stats: { Défense: [4, 4], Vie: [3, 3] }, weight: 18 }, { rarity: 'mythic',   stats: { Défense: [5, 5], Vie: [4, 4] }, weight: 8 }
            ]
        },
        {
            key: 'du_rempart', nameKey: "affixes.pieds.du_rempart", tiers: [
                { rarity: 'common',   stats: { Défense: [1, 1] }, weight: 90 }, { rarity: 'uncommon', stats: { Vie: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Défense: [1, 1], 'resistance_percent': [0.5, 1.0] }, weight: 50 }, { rarity: 'epic',     stats: { Défense: [2, 2], 'resistance_percent': [1.1, 1.8] }, weight: 22 },
                { rarity: 'legendary',stats: { Défense: [2, 2], 'resistance_percent': [1.9, 2.8] }, weight: 8 }, { rarity: 'mythic',   stats: { Défense: [3, 3], 'resistance_percent': [2.9, 4.0] }, weight: 7 }
            ]
        },
        {
            key: 'legeres', nameKey: "affixes.pieds.legeres", tiers: [
                { rarity: 'common',   stats: { Agilité: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Chance: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Agilité: [2, 2], Chance: [2, 2] }, weight: 55 }, { rarity: 'epic',     stats: { Agilité: [3, 4], Chance: [3, 4] }, weight: 25 },
                { rarity: 'legendary',stats: { Agilité: [5, 6], Chance: [5, 6] }, weight: 18 }, { rarity: 'mythic',   stats: { Agilité: [7, 8], Chance: [7, 8] }, weight: 8 }
            ]
        },
        {
            key: 'dexplorateur', nameKey: "affixes.pieds.dexplorateur", tiers: [
                { rarity: 'common',   stats: { Chance: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Vie: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Chance: [2, 3], Vie: [2, 3] }, weight: 55 }, { rarity: 'epic',     stats: { Chance: [4, 5], Vie: [4, 5] }, weight: 25 },
                { rarity: 'legendary',stats: { Chance: [6, 7], Vie: [6, 7] }, weight: 18 }, { rarity: 'mythic',   stats: { Chance: [8, 10], Vie: [8, 10] }, weight: 8 }
            ]
        },
        {
            key: 'inebranlables', nameKey: "affixes.pieds.inebranlables", tiers: [
                { rarity: 'common',   stats: { Défense: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Vie: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Défense: [1, 1], Vie: [3, 3] }, weight: 55 }, { rarity: 'epic',     stats: { Défense: [2, 2], Vie: [4, 4] }, weight: 25 },
                { rarity: 'legendary',stats: { Défense: [3, 3], Vie: [5, 6] }, weight: 18 }, { rarity: 'mythic',   stats: { Défense: [4, 4], Vie: [7, 8] }, weight: 8 }
            ]
        }
    ],

    // ============================================================================
    // ==   MAINS (6 affixes)
    // ============================================================================
    'Mains': [
        {
            key: 'de_frappe', nameKey: "affixes.mains.de_frappe", tiers: [
                { rarity: 'common',   stats: { Force: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Force: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Force: [3, 4] }, weight: 55 }, { rarity: 'epic',     stats: { Force: [5, 6] }, weight: 25 },
                { rarity: 'legendary',stats: { Force: [7, 9] }, weight: 18 }, { rarity: 'mythic',   stats: { Force: [10, 12] }, weight: 8 }
            ]
        },
        {
            key: 'dadresse', nameKey: "affixes.mains.dadresse", tiers: [
                { rarity: 'common',   stats: { Agilité: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Agilité: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Agilité: [3, 3], CritChance: [1.0, 1.5] }, weight: 55 }, { rarity: 'epic',     stats: { Agilité: [4, 5], CritChance: [1.6, 2.5] }, weight: 25 },
                { rarity: 'legendary',stats: { Agilité: [6, 7], CritChance: [2.6, 4.0] }, weight: 18 }, { rarity: 'mythic',   stats: { Agilité: [8, 10], CritChance: [4.5, 6.0] }, weight: 8 }
            ]
        },
        {
            key: 'du_rempart', nameKey: "affixes.mains.du_rempart", tiers: [
                { rarity: 'common',   stats: { Défense: [1, 1] }, weight: 90 }, { rarity: 'uncommon', stats: { Vie: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Défense: [1, 1], 'resistance_percent': [0.5, 1.0] }, weight: 50 }, { rarity: 'epic',     stats: { Défense: [2, 2], 'resistance_percent': [1.1, 1.8] }, weight: 22 },
                { rarity: 'legendary',stats: { Défense: [2, 2], 'resistance_percent': [1.9, 2.8] }, weight: 8 }, { rarity: 'mythic',   stats: { Défense: [3, 3], 'resistance_percent': [2.9, 4.0] }, weight: 7 }
            ]
        },
        {
            key: 'du_pillard', nameKey: "affixes.mains.du_pillard", tiers: [
                { rarity: 'common',   stats: { Chance: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Chance: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Chance: [3, 3], LootBonusPercent: [1.0, 2.0] }, weight: 55 }, { rarity: 'epic',     stats: { Chance: [4, 5], LootBonusPercent: [2.1, 3.5] }, weight: 25 },
                { rarity: 'legendary',stats: { Chance: [6, 7], LootBonusPercent: [3.6, 5.0] }, weight: 18 }, { rarity: 'mythic',   stats: { Chance: [8, 10], LootBonusPercent: [5.5, 7.5] }, weight: 8 }
            ]
        },
        {
            key: 'precis', nameKey: "affixes.mains.precis", tiers: [
                { rarity: 'common',   stats: { Agilité: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { CritChance: [0.5, 0.8] }, weight: 70 },
                { rarity: 'rare',     stats: { Agilité: [2, 2], CritChance: [1.0, 1.5] }, weight: 55 }, { rarity: 'epic',     stats: { Agilité: [3, 4], CritChance: [1, 1.5], CritDamage: [4, 7] }, weight: 25 },
                { rarity: 'legendary',stats: { Agilité: [5, 6], CritChance: [1.6, 3.0], CritDamage: [8, 12] }, weight: 18 }, { rarity: 'mythic',   stats: { Agilité: [7, 8], CritChance: [3.1, 4.0], CritDamage: [13, 20] }, weight: 8 }
            ]
        },
        {
            key: 'poignes_de_fer', nameKey: "affixes.mains.poignes_de_fer", tiers: [
                { rarity: 'common',   stats: { Force: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Défense: [1, 1] }, weight: 70 },
                { rarity: 'rare',     stats: { Force: [2, 2], Défense: [1, 1] }, weight: 55 }, { rarity: 'epic',     stats: { Force: [3, 4], Défense: [2, 2] }, weight: 25 },
                { rarity: 'legendary',stats: { Force: [5, 6], Défense: [3, 3] }, weight: 18 }, { rarity: 'mythic',   stats: { Force: [7, 8], Défense: [4, 4] }, weight: 8 }
            ]
        }
    ],

    // ============================================================================
    // ==   ACCESSOIRE (7 affixes)
    // ============================================================================
    'Accessoire': [
        {
            key: 'de_fortune', nameKey: "affixes.accessoire.de_fortune", tiers: [
                { rarity: 'common',   stats: { Chance: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Chance: [2, 3] }, weight: 70 },
                { rarity: 'rare',     stats: { Chance: [4, 5], LootBonusPercent: [1.0, 1.5] }, weight: 55 }, { rarity: 'epic',     stats: { Chance: [6, 7], LootBonusPercent: [1.6, 2.5] }, weight: 25 },
                { rarity: 'legendary',stats: { Chance: [8, 10], LootBonusPercent: [2.6, 4.0] }, weight: 18 }, { rarity: 'mythic',   stats: { Chance: [11, 14], LootBonusPercent: [4.5, 6.0] }, weight: 8 }
            ]
        },
        {
            key: 'de_puissance', nameKey: "affixes.accessoire.de_puissance", tiers: [
                { rarity: 'common',   stats: { Force: [1, 1] }, weight: 80 }, { rarity: 'uncommon', stats: { Force: [2, 3] }, weight: 70 },
                { rarity: 'rare',     stats: { Force: [4, 5], Vie: [2, 2] }, weight: 55 }, { rarity: 'epic',     stats: { Force: [6, 7], Vie: [3, 4] }, weight: 25 },
                { rarity: 'legendary',stats: { Force: [8, 10], Vie: [5, 6] }, weight: 18 }, { rarity: 'mythic',   stats: { Force: [11, 14], Vie: [7, 9] }, weight: 8 }
            ]
        },
        {
            key: 'dharmonie', nameKey: "affixes.accessoire.dharmonie", tiers: [
                { rarity: 'common',   stats: { Vie: [1,1] }, weight: 20 }, { rarity: 'uncommon', stats: { Force: [1,1] }, weight: 15 },
                { rarity: 'rare',     stats: { Vie: [2,2], Force: [2,2] }, weight: 18 }, { rarity: 'epic',     stats: { Vie: [3,3], Force: [3,3], Agilité: [3,3] }, weight: 5 },
                { rarity: 'legendary',stats: { Vie: [4,4], Force: [4,4], Agilité: [4,4], Intelligence: [4,4] }, weight: 14 }, { rarity: 'mythic',   stats: { Vie: [5,6], Force: [5,6], Agilité: [5,6], Intelligence: [5,6], Chance: [5,6] }, weight: 5 }
            ]
        },
        {
            key: 'du_fermier', nameKey: "affixes.accessoire.du_fermier", tiers: [
                { rarity: 'common',   stats: { Chance: [1, 1] }, weight: 90 }, { rarity: 'uncommon', stats: { Chance: [2, 2] }, weight: 70 },
                { rarity: 'rare',     stats: { Chance: [3, 3], 'resource_gain_percent': [2.0, 3.0] }, weight: 50 }, { rarity: 'epic',     stats: { Chance: [4, 5], 'resource_gain_percent': [3.5, 5.0] }, weight: 22 },
                { rarity: 'legendary',stats: { Chance: [6, 7], 'resource_gain_percent': [5.5, 7.5] }, weight: 8 }, { rarity: 'mythic',   stats: { Chance: [8, 10], 'resource_gain_percent': [8.0, 12.0] }, weight: 7 }
            ]
        },
        {
            key: 'du_phenix', nameKey: "affixes.accessoire.du_phenix", tiers: [
                { rarity: 'common',   stats: { Vie: [1, 1] }, weight: 90 }, { rarity: 'uncommon', stats: { RegenHP: [0.1, 0.1] }, weight: 70 },
                { rarity: 'rare',     stats: { Vie: [3, 4], RegenHP: [0.1, 0.15] }, weight: 50 }, { rarity: 'epic',     stats: { Vie: [5, 6], RegenHP: [0.16, 0.2] }, weight: 22 },
                { rarity: 'legendary',stats: { Vie: [7, 8], RegenHP: [0.21, 0.28] }, weight: 8 }, { rarity: 'mythic',   stats: { Vie: [9, 11], RegenHP: [0.3, 0.4] }, weight: 7 }
            ]
        },
        {
            key: 'de_lerudit', nameKey: "affixes.accessoire.de_lerudit", tiers: [
                { rarity: 'common',   stats: { Intelligence: [2,2] }, weight: 80 }, { rarity: 'uncommon', stats: { Intelligence: [3,3] }, weight: 70 },
                { rarity: 'rare',     stats: { Intelligence: [4,5], 'xp_gain_percent': [1.0, 2.0] }, weight: 55 }, { rarity: 'epic',     stats: { Intelligence: [6,7], 'xp_gain_percent': [2.1, 3.5] }, weight: 25 },
                { rarity: 'legendary',stats: { Intelligence: [8,10], 'xp_gain_percent': [3.6, 5.0] }, weight: 18 }, { rarity: 'mythic',   stats: { Intelligence: [11,14], 'xp_gain_percent': [5.5, 7.5] }, weight: 8 }
            ]
        },
        {
            key: 'du_gardien', nameKey: "affixes.accessoire.du_gardien", tiers: [
                { rarity: 'common',   stats: { Défense: [1,1] }, weight: 80 }, { rarity: 'uncommon', stats: { Vie: [2,2] }, weight: 70 },
                { rarity: 'rare',     stats: { Défense: [1,1], Vie: [3,3] }, weight: 55 }, { rarity: 'epic',     stats: { Défense: [2,2], Vie: [4,5] }, weight: 25 },
                { rarity: 'legendary',stats: { Défense: [3,3], Vie: [6,7] }, weight: 18 }, { rarity: 'mythic',   stats: { Défense: [4,4], Vie: [8,10] }, weight: 8 }
            ]
        },
        {
            key: 'mortel', nameKey: "affixes.accessoire.mortel", tiers: [
                { rarity: 'common',   stats: { CritChance: [0.5, 0.8] }, weight: 90 }, { rarity: 'uncommon', stats: { CritChance: [0.9, 1.2] }, weight: 70 },
                { rarity: 'rare',     stats: { CritChance: [1.3, 2.0], CritDamage: [4, 6] }, weight: 50 }, { rarity: 'epic',     stats: { CritChance: [2.1, 3.0], CritDamage: [7, 10] }, weight: 22 },
                { rarity: 'legendary',stats: { CritChance: [3.1, 4.5], CritDamage: [11, 16] }, weight: 8 }, { rarity: 'mythic',   stats: { CritChance: [5.0, 7.0], CritDamage: [18, 28] }, weight: 7 }
            ]
        },
    ]
};

const DUNGEON_MODIFIERS_DB = {
    'horde_enragee': {
        nameKey: "dungeon.modifiers.horde_enragee.name",
        descriptionKey: "dungeon.modifiers.horde_enragee.description",
        effects: [{ type: 'stat_multiplier', stat: 'Force', value: 1.25 }]
    },
    'carapace_dense': {
        nameKey: "dungeon.modifiers.carapace_dense.name",
        descriptionKey: "dungeon.modifiers.carapace_dense.description",
        effects: [{ type: 'stat_multiplier', stat: 'Défense', value: 1.20 }]
    },
    'vitalite_anormale': {
        nameKey: "dungeon.modifiers.vitalite_anormale.name",
        descriptionKey: "dungeon.modifiers.vitalite_anormale.description",
        effects: [{ type: 'stat_multiplier', stat: 'Vie', value: 1.30 }]
    },
    'saignement_maudit': {
        nameKey: "dungeon.modifiers.saignement_maudit.name",
        descriptionKey: "dungeon.modifiers.saignement_maudit.description",
        effects: [{ type: 'add_stat', stat: 'bleed_chance_percent', value: 20 }]
    },
    'aura_vampirique': {
        nameKey: "dungeon.modifiers.aura_vampirique.name",
        descriptionKey: "dungeon.modifiers.aura_vampirique.description",
        effects: [{ type: 'add_stat', stat: 'lifesteal_percent', value: 5 }]
    }
};

const DUNGEON_EVENTS_DB = {
    'TRESOR_SIMPLE': {
        nameKey: "dungeon.events.tresor_simple.name",
        descriptionKey: "dungeon.events.tresor_simple.description",
        effects: [
            { type: 'shards_gain', amount: 5 },
            { type: 'resource_gain', kind: 'metal', amount: 100 }
        ]
    },
    'FONTAINE_DE_VIE': {
        nameKey: "dungeon.events.fontaine_de_vie.name",
        descriptionKey: "dungeon.events.fontaine_de_vie.description",
        effects: [
            { type: 'heal_percent', amount: 15 }
        ]
    },
    'PIEGE_A_FLECHETTES': {
        nameKey: "dungeon.events.piege_a_flechettes.name",
        descriptionKey: "dungeon.events.piege_a_flechettes.description",
        effects: [
            { type: 'damage_percent', amount: 10 }
        ]
    },
    'COFFRE_VERROUILLE': {
        nameKey: "dungeon.events.coffre_verrouille.name",
        descriptionKey: "dungeon.events.coffre_verrouille.description",
        choices: [
            { textKey: "dungeon.events.coffre_verrouille.choice1_text", statTest: { stat: 'Agilité', value: 30 } },
            { textKey: "dungeon.events.coffre_verrouille.choice2_text", statTest: { stat: 'Force', value: 30 } }
        ],
        success: {
            descriptionKey: "dungeon.events.coffre_verrouille.success_text",
            effects: [ { type: 'shards_gain', amount: 25 }, { type: 'resource_gain', kind: 'fragments', amount: 5 } ]
        },
        failure: {
            descriptionKey: "dungeon.events.coffre_verrouille.failure_text",
            effects: []
        }
    },
    'FONTAINE_DE_MANA': {
        nameKey: "dungeon.events.fontaine_de_mana.name",
        descriptionKey: "dungeon.events.fontaine_de_mana.description",
        effects: [
            { type: 'mana_gain_flat', amount: 40 } 
        ]
    },
    'AUTEL_ETRANGE': {
        nameKey: "dungeon.events.autel_etrange.name",
        descriptionKey: "dungeon.events.autel_etrange.description",
        choices: [
            { 
                textKey: "dungeon.events.autel_etrange.choice1_text", 
                requires: { type: 'health_cost_percent', amount: 15 },
                success: {
                    descriptionKey: "dungeon.events.autel_etrange.choice1_success_text",
                    effects: [ { type: 'temp_buff', stat: 'Force', amount: 20, duration: 5 } ]
                }
            },
            { 
                textKey: "dungeon.events.autel_etrange.choice2_text",
                success: {
                    descriptionKey: "dungeon.events.autel_etrange.choice2_success_text"
                }
            }
        ]
    },
    'AVENTURIER_MOURANT': {
        nameKey: "dungeon.events.aventurier_mourant.name",
        descriptionKey: "dungeon.events.aventurier_mourant.description",
        effects: [
            { type: 'consumable_gain', id: 'POTION_SOIN_MINEURE', amount: 1 }
        ]
    },
    'AUTEL_DE_SACRIFICE_INTELLIGENT': {
        nameKey: "dungeon.events.autel_de_sacrifice_intelligent.name",
        descriptionKey: "dungeon.events.autel_de_sacrifice_intelligent.description",
        choices: [
            { textKey: "dungeon.events.autel_de_sacrifice_intelligent.choice1_text", requires: { type: 'health_cost_percent', amount: 15 } },
            { textKey: "dungeon.events.autel_de_sacrifice_intelligent.choice2_text" }
        ],
        success: {
            descriptionKey: "dungeon.events.autel_de_sacrifice_intelligent.success_text",
            effects: [ { type: 'mana_gain_flat', amount: 100 } ]
        }
    },
    'CARTE_DU_DONJON': {
        nameKey: "dungeon.events.carte_du_donjon.name",
        descriptionKey: "dungeon.events.carte_du_donjon.description",
        effects: [
            { type: 'reveal_map', amount: 3 }
        ]
    },
    'EMBUSCADE': {
        nameKey: "dungeon.events.embuscade.name",
        descriptionKey: "dungeon.events.embuscade.description",
        isCombatEvent: true,
        powerMultiplier: 1.2
    },
};

// Pour les messages de lore, on les lie directement à leur clé de traduction.
const DUNGEON_LORE_MESSAGES_DB = [
    "dungeon.lore_messages.0", "dungeon.lore_messages.1", "dungeon.lore_messages.2", "dungeon.lore_messages.3",
    "dungeon.lore_messages.4", "dungeon.lore_messages.5", "dungeon.lore_messages.6", "dungeon.lore_messages.7",
    "dungeon.lore_messages.8", "dungeon.lore_messages.9", "dungeon.lore_messages.10", "dungeon.lore_messages.11",
    "dungeon.lore_messages.12", "dungeon.lore_messages.13", "dungeon.lore_messages.14", "dungeon.lore_messages.15",
    "dungeon.lore_messages.16", "dungeon.lore_messages.17", "dungeon.lore_messages.18", "dungeon.lore_messages.19",
    "dungeon.lore_messages.20", "dungeon.lore_messages.21", "dungeon.lore_messages.22", "dungeon.lore_messages.23",
    "dungeon.lore_messages.24", "dungeon.lore_messages.25", "dungeon.lore_messages.26", "dungeon.lore_messages.27",
    "dungeon.lore_messages.28", "dungeon.lore_messages.29", "dungeon.lore_messages.30", "dungeon.lore_messages.31"
];

// ============================================================================
// ==   SYSTÈME DE SUCCÈS (ACHIEVEMENTS)
// ============================================================================

const SUCCES_DB = {
    // ============================================================================
    // ==   Catégorie: Progression
    // ============================================================================
    'DEBUT_AVENTURE': {
        nameKey: "succes.debut_aventure.name",
        descriptionKey: "succes.debut_aventure.description",
        categoryKey: "succes.categories.progression",
        icon: "🗺️",
        paliers: [
            { nameKey: "succes.debut_aventure.tier1_name", objectif: 1, points: 5, recompense: { type: 'ressource', kind: 'fragments', amount: 10 } },
            { nameKey: "succes.debut_aventure.tier2_name", objectif: 200, points: 10, recompense: { type: 'ressource', kind: 'bois', amount: 7000 } },
            { nameKey: "succes.debut_aventure.tier3_name", objectif: 1500, points: 20, recompense: { type: 'stat_flat', stat: 'Chance', value: 2 } },
            { nameKey: "succes.debut_aventure.tier4_name", objectif: 5000, points: 50, recompense: { type: 'stat_percent', stat: 'xp_gain_percent', value: 2 } }
        ]
    },
    'BRECHE_INSTABLE': {
        nameKey: "succes.breche_instable.name",
        descriptionKey: "succes.breche_instable.description",
        categoryKey: "succes.categories.progression",
        icon: "🌀",
        paliers: [
            { nameKey: "succes.breche_instable.tier1_name", objectif: 10, points: 10, recompense: { type: 'ressource', kind: 'eclats_instables', amount: 200 } },
            { nameKey: "succes.breche_instable.tier2_name", objectif: 40, points: 25, recompense: { type: 'stat_flat', stat: 'Vie', value: 3 } },
            { nameKey: "succes.breche_instable.tier3_name", objectif: 80, points: 50, recompense: { type: 'stat_percent', stat: 'damage_percent', value: 2 } },
            // MON COMMENTAIRE : Récompense finale changée en EA
            { nameKey: "succes.breche_instable.tier4_name", objectif: 150, points: 100, recompense: { type: 'ressource', kind: 'eclats_ascension', amount: 50 } }
        ]
    },
    'ASCENSION_NIVEAU': {
        nameKey: "succes.ascension_niveau.name",
        descriptionKey: "succes.ascension_niveau.description",
        categoryKey: "succes.categories.progression",
        icon: "🌌",
        paliers: [
            { nameKey: "succes.ascension_niveau.tier1_name", objectif: 1, points: 15, recompense: { type: 'ressource', kind: 'eclats_instables', amount: 500 } },
            { nameKey: "succes.ascension_niveau.tier2_name", objectif: 5, points: 30, recompense: { type: 'stat_flat', stat: 'Chance', value: 5 } },
            { nameKey: "succes.ascension_niveau.tier3_name", objectif: 10, points: 60, recompense: { type: 'stat_percent', stat: 'damage_percent', value: 3 } },
            // MON COMMENTAIRE : Récompense finale changée en EA
            { nameKey: "succes.ascension_niveau.tier4_name", objectif: 20, points: 120, recompense: { type: 'ressource', kind: 'eclats_ascension', amount: 150 } }
        ]
    },

    // ============================================================================
    // ==   Catégorie: Classes
    // ============================================================================
    'MAITRE_GUERRIER': {
        nameKey: "succes.maitre_guerrier.name",
        descriptionKey: "succes.maitre_guerrier.description",
        categoryKey: "succes.categories.classes",
        icon: "⚔️",
        paliers: [
            { nameKey: "succes.maitre_guerrier.tier1_name", objectif: 100, points: 25, recompense: { type: 'stat_flat', stat: 'Intelligence', value: 2 } },
            { nameKey: "succes.maitre_guerrier.tier2_name", objectif: 300, points: 50, recompense: { type: 'stat_flat', stat: 'Agilité', value: 2 } },
            { nameKey: "succes.maitre_guerrier.tier3_name", objectif: 500, points: 100, recompense: { type: 'stat_percent', stat: 'damage_percent', value: 2 } }
        ]
    },
    'MAITRE_ARCHER': {
        nameKey: "succes.maitre_archer.name",
        descriptionKey: "succes.maitre_archer.description",
        categoryKey: "succes.categories.classes",
        icon: "🏹",
        paliers: [
            { nameKey: "succes.maitre_archer.tier1_name", objectif: 100, points: 25, recompense: { type: 'stat_flat', stat: 'Force', value: 2 } },
            { nameKey: "succes.maitre_archer.tier2_name", objectif: 300, points: 50, recompense: { type: 'stat_flat', stat: 'Intelligence', value: 2 } },
            { nameKey: "succes.maitre_archer.tier3_name", objectif: 500, points: 100, recompense: { type: 'stat_percent', stat: 'damage_percent', value: 2 } }
        ]
    },
    'MAITRE_MAGE': {
        nameKey: "succes.maitre_mage.name",
        descriptionKey: "succes.maitre_mage.description",
        categoryKey: "succes.categories.classes",
        icon: "🧙",
        paliers: [
            { nameKey: "succes.maitre_mage.tier1_name", objectif: 100, points: 25, recompense: { type: 'stat_flat', stat: 'Agilité', value: 2 } },
            { nameKey: "succes.maitre_mage.tier2_name", objectif: 300, points: 50, recompense: { type: 'stat_flat', stat: 'Force', value: 2 } },
            { nameKey: "succes.maitre_mage.tier3_name", objectif: 500, points: 100, recompense: { type: 'stat_percent', stat: 'damage_percent', value: 2 } }
        ]
    },

    // ============================================================================
    // ==   Catégorie: Combat
    // ============================================================================
    'EXTERMINATEUR': {
        nameKey: "succes.exterminateur.name",
        descriptionKey: "succes.exterminateur.description",
        categoryKey: "succes.categories.combat",
        icon: "💀",
        paliers: [
            { nameKey: "succes.exterminateur.tier1_name", objectif: 500, points: 10, recompense: { type: 'ressource', kind: 'fragments', amount: 500 } },
            { nameKey: "succes.exterminateur.tier2_name", objectif: 2500, points: 20, recompense: { type: 'stat_flat', stat: 'Force', value: 5 } },
            { nameKey: "succes.exterminateur.tier3_name", objectif: 10000, points: 50, recompense: { type: 'stat_flat', stat: 'Agilité', value: 5 } },
            // MON COMMENTAIRE : Récompense finale changée en EA
            { nameKey: "succes.exterminateur.tier4_name", objectif: 50000, points: 100, recompense: { type: 'ressource', kind: 'eclats_ascension', amount: 100 } }
        ]
    },
    'TUEUR_DE_BOSS': {
        nameKey: "succes.tueur_de_boss.name",
        descriptionKey: "succes.tueur_de_boss.description",
        categoryKey: "succes.categories.combat",
        icon: "🏆",
        paliers: [
            { nameKey: "succes.tueur_de_boss.tier1_name", objectif: 1, points: 10, recompense: { type: 'ressource', kind: 'bounty_tokens', amount: 1 } },
            { nameKey: "succes.tueur_de_boss.tier2_name", objectif: 10, points: 25, recompense: { type: 'stat_flat', stat: 'Vie', value: 3 } },
            { nameKey: "succes.tueur_de_boss.tier3_name", objectif: 50, points: 50, recompense: { type: 'stat_percent', stat: 'damage_percent', value: 2 } },
            // MON COMMENTAIRE : Récompense finale changée en EA
            { nameKey: "succes.tueur_de_boss.tier4_name", objectif: 100, points: 100, recompense: { type: 'ressource', kind: 'eclats_ascension', amount: 75 } }
        ]
    },

    // ============================================================================
    // ==   Catégorie: Artisanat & Économie
    // ============================================================================
    'MAITRE_ARTISAN': {
        nameKey: "succes.maitre_artisan.name",
        descriptionKey: "succes.maitre_artisan.description",
        categoryKey: "succes.categories.artisanat",
        icon: "🔨",
        paliers: [
            { nameKey: "succes.maitre_artisan.tier1_name", objectif: 50, points: 10, recompense: { type: 'ressource', kind: 'metal', amount: 5000 } },
            { nameKey: "succes.maitre_artisan.tier2_name", objectif: 250, points: 20, recompense: { type: 'ressource', kind: 'fragments', amount: 1000 } },
            { nameKey: "succes.maitre_artisan.tier3_name", objectif: 1000, points: 50, recompense: { type: 'stat_flat', stat: 'Chance', value: 3 } }
        ]
    },
    'ENCHANTEUR_NEOPHYTE': {
        nameKey: "succes.enchanteur_neophyte.name",
        descriptionKey: "succes.enchanteur_neophyte.description",
        categoryKey: "succes.categories.artisanat",
        icon: "✨",
        paliers: [
            { nameKey: "succes.enchanteur_neophyte.tier1_name", objectif: 20, points: 10, recompense: { type: 'ressource', kind: 'eclats_instables', amount: 100 } },
            { nameKey: "succes.enchanteur_neophyte.tier2_name", objectif: 100, points: 25, recompense: { type: 'stat_flat', stat: 'Intelligence', value: 2 } },
            { nameKey: "succes.enchanteur_neophyte.tier3_name", objectif: 500, points: 50, recompense: { type: 'stat_percent', stat: 'LootBonusPercent', value: 2 } }
        ]
    },
    'MAITRE_RECYCLEUR': {
        nameKey: "succes.maitre_recycleur.name",
        descriptionKey: "succes.maitre_recycleur.description",
        categoryKey: "succes.categories.artisanat",
        icon: "♻️",
        paliers: [
            { nameKey: "succes.maitre_recycleur.tier1_name", objectif: 50, points: 10, recompense: { type: 'ressource', kind: 'fragments', amount: 500 } },
            { nameKey: "succes.maitre_recycleur.tier2_name", objectif: 250, points: 20, recompense: { type: 'ressource', kind: 'eclats_instables', amount: 100 } },
            { nameKey: "succes.maitre_recycleur.tier3_name", objectif: 1000, points: 50, recompense: { type: 'stat_percent', stat: 'resource_gain_percent', value: 3 } }
        ]
    },
    'ROI_DU_FRAGMENT': {
        nameKey: "succes.roi_du_fragment.name",
        descriptionKey: "succes.roi_du_fragment.description",
        categoryKey: "succes.categories.economie",
        icon: "💠",
        paliers: [
            { nameKey: "succes.roi_du_fragment.tier1_name", objectif: 10000, points: 10, recompense: { type: 'ressource', kind: 'metal', amount: 10000 } },
            { nameKey: "succes.roi_du_fragment.tier2_name", objectif: 100000, points: 25, recompense: { type: 'stat_flat', stat: 'Chance', value: 2 } },
            { nameKey: "succes.roi_du_fragment.tier3_name", objectif: 500000, points: 50, recompense: { type: 'stat_percent', stat: 'resource_gain_percent', value: 5 } }
        ]
    },

    // ============================================================================
    // ==   Catégorie: Défis & Secrets
    // ============================================================================
    'MORT_ET_RE_MORT': {
        nameKey: "succes.mort_et_re_mort.name",
        descriptionKey: "succes.mort_et_re_mort.description",
        categoryKey: "succes.categories.defis",
        icon: "🪦",
        paliers: [
            { nameKey: "succes.mort_et_re_mort.tier1_name", objectif: 1, points: 5, recompense: { type: 'ressource', kind: 'tissu', amount: 200 } },
            { nameKey: "succes.mort_et_re_mort.tier2_name", objectif: 10, points: 10, recompense: { type: 'ressource', kind: 'fragments', amount: 100 } },
            { nameKey: "succes.mort_et_re_mort.tier3_name", objectif: 100, points: 25, recompense: { type: 'stat_flat', stat: 'Vie', value: 5 } },
            { nameKey: "succes.mort_et_re_mort.tier4_name", objectif: 500, points: 50, recompense: { type: 'stat_percent', stat: 'resistance_percent', value: 2 } }
        ]
    },
    'AU_BORD_DU_GOUFFRE': {
        nameKey: "succes.au_bord_du_gouffre.name",
        descriptionKey: "succes.au_bord_du_gouffre.description",
        categoryKey: "succes.categories.defis",
        icon: "❤️‍🩹",
        paliers: [
            { nameKey: "succes.au_bord_du_gouffre.tier1_name", objectif: 1, points: 15, recompense: { type: 'stat_flat', stat: 'Vie', value: 3 } }
        ]
    },
    'COLLECTIONNEUR_ENSEMBLE': {
        nameKey: "succes.collectionneur_ensemble.name",
        descriptionKey: "succes.collectionneur_ensemble.description",
        categoryKey: "succes.categories.defis",
        icon: "👑",
        paliers: [
            { nameKey: "succes.collectionneur_ensemble.tier1_name", objectif: 5, points: 20, recompense: { type: 'ressource', kind: 'marques_de_chasse', amount: 10 } },
            { nameKey: "succes.collectionneur_ensemble.tier2_name", objectif: 7, points: 40, recompense: { type: 'ressource', kind: 'marques_de_chasse', amount: 50 } },
            { nameKey: "succes.collectionneur_ensemble.tier3_name", objectif: 7, points: 80, recompense: { type: 'stat_flat_all', value: 2 } }
        ]
    },
    
    // ============================================================================
    // ==   Catégorie: Ascension & Constellations
    // ============================================================================
    'CONSTELLATION_DESTIN': {
        nameKey: "succes.constellation_destin.name",
        descriptionKey: "succes.constellation_destin.description",
        categoryKey: "succes.categories.constellation",
        icon: "✨",
        paliers: [
            { nameKey: "succes.constellation_destin.tier1_name", objectif: 24, points: 100, recompense: { type: 'stat_flat_all', value: 5 } }
        ]
    },
    'CONSTELLATION_GUERRIER': {
        nameKey: "succes.constellation_guerrier.name",
        descriptionKey: "succes.constellation_guerrier.description",
        categoryKey: "succes.categories.constellation",
        icon: "⚔️",
        paliers: [
            { nameKey: "succes.constellation_guerrier.tier1_name", objectif: 22, points: 100, recompense: { type: 'stat_flat', stat: 'Force', value: 15 } }
        ]
    },
    'CONSTELLATION_ARCHER': {
        nameKey: "succes.constellation_archer.name",
        descriptionKey: "succes.constellation_archer.description",
        categoryKey: "succes.categories.constellation",
        icon: "🏹",
        paliers: [
            { nameKey: "succes.constellation_archer.tier1_name", objectif: 14, points: 100, recompense: { type: 'stat_flat', stat: 'Agilité', value: 15 } }
        ]
    },
    'CONSTELLATION_MAGE': {
        nameKey: "succes.constellation_mage.name",
        descriptionKey: "succes.constellation_mage.description",
        categoryKey: "succes.categories.constellation",
        icon: "🧙",
        paliers: [
            { nameKey: "succes.constellation_mage.tier1_name", objectif: 17, points: 100, recompense: { type: 'stat_flat', stat: 'Intelligence', value: 15 } }
        ]
    },
    'MAITRE_DES_ETOILES': {
        nameKey: "succes.maitre_des_etoiles.name",
        descriptionKey: "succes.maitre_des_etoiles.description",
        categoryKey: "succes.categories.constellation",
        icon: "👑",
        paliers: [
             // MON COMMENTAIRE : Récompense finale changée en EA
            { nameKey: "succes.maitre_des_etoiles.tier1_name", objectif: 77, points: 250, recompense: { type: 'ressource', kind: 'eclats_ascension', amount: 250 } }
        ]
    }
};

const CONSTELLATIONS_DB = {
    destiny: {
        nameKey: "constellations.destiny.name", // MODIFIÉ
        nodes: {
            'destiny_start': {
                id: 'destiny_start', 
                nameKey: "constellations.destiny.nodes.destiny_start.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_start.description", // MODIFIÉ
                icon: "✨", cost: [0], maxLevel: 1, dependencies: [],
                position: { x: 43, y: 58 }, type: 'start'
            },
            'destiny_all_stats_1': {
                id: 'destiny_all_stats_1',
                nameKey: "constellations.destiny.nodes.destiny_all_stats_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_all_stats_1.description", // MODIFIÉ
                icon: "🌱", maxLevel: 5, cost: [2, 2, 3, 3, 4], dependencies: ['destiny_epic_knowledge'],
                bonus: { type: 'stat_flat_all', value: [1, 1, 1, 1, 1] },
                position: { x: 50, y: 44 }, type: 'minor'
            },
            'destiny_hp_mana_1': {
                id: 'destiny_hp_mana_1',
                nameKey: "constellations.destiny.nodes.destiny_hp_mana_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_hp_mana_1.description", // MODIFIÉ
                icon: "💧", maxLevel: 3, cost: [2, 3, 4], dependencies: ['destiny_all_stats_1'],
                bonus: { type: 'stat_percent', stat: 'Vie_percent', value: [2, 2, 2], stat2: 'max_mana_percent', value2: [2, 2, 2] },
                position: { x: 50, y: 34 }, type: 'intermediate'
            },
            'destiny_resource_1': {
                id: 'destiny_resource_1',
                nameKey: "constellations.destiny.nodes.destiny_resource_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_resource_1.description", // MODIFIÉ
                icon: "🌿", maxLevel: 5, cost: [2, 3, 4, 5, 6], dependencies: ['destiny_all_stats_1'],
                bonus: { type: 'stat_percent', stat: 'resource_gain_percent', value: [3, 3, 4, 5, 5] },
                position: { x: 38, y: 28 }, type: 'intermediate'
            },
            'destiny_fragments_1': {
                id: 'destiny_fragments_1',
                nameKey: "constellations.destiny.nodes.destiny_fragments_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_fragments_1.description", // MODIFIÉ
                icon: "💠", maxLevel: 5, cost: [3, 4, 5, 6, 8], dependencies: ['destiny_resource_1'],
                bonus: { type: 'stat_percent', stat: 'fragments_gain_percent', value: [3, 3, 4, 5, 5] },
                position: { x: 28, y: 32 }, type: 'intermediate'
            },
            'destiny_loot_1': {
                id: 'destiny_loot_1',
                nameKey: "constellations.destiny.nodes.destiny_loot_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_loot_1.description", // MODIFIÉ
                icon: "🍀", maxLevel: 5, cost: [5, 6, 8, 10, 12], dependencies: ['destiny_fragments_1'],
                bonus: { type: 'stat_percent', stat: 'LootBonusPercent', value: [2, 2, 3, 3, 5] },
                position: { x: 18, y: 25 }, type: 'intermediate'
            },
            'destiny_event_luck_1': {
                id: 'destiny_event_luck_1',
                nameKey: "constellations.destiny.nodes.destiny_event_luck_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_event_luck_1.description", // MODIFIÉ
                icon: "🎲", maxLevel: 3, cost: [10, 15, 22], dependencies: ['destiny_loot_1'],
                bonus: { type: 'stat_flat', stat: 'event_success_chance_flat', value: [2, 2, 3] },
                position: { x: 5, y: 40 }, type: 'intermediate'
            },
            'destiny_legendary_knowledge': {
                id: 'destiny_legendary_knowledge',
                nameKey: "constellations.destiny.nodes.destiny_legendary_knowledge.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_legendary_knowledge.description", // MODIFIÉ
                icon: "📙", cost: [25], maxLevel: 1, dependencies: ['destiny_loot_1'],
                unlock_conditions: ['destiny_epic_knowledge'],
                bonus: { type: 'unlock_rarity', rarity: 'legendary' },
                position: { x: 18, y: 15 }, type: 'major'
            },
            'destiny_merchant_1': {
                id: 'destiny_merchant_1',
                nameKey: "constellations.destiny.nodes.destiny_merchant_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_merchant_1.description", // MODIFIÉ
                icon: "💰", maxLevel: 3, cost: [8, 12, 16], dependencies: ['destiny_legendary_knowledge'],
                bonus: { type: 'stat_percent', stat: 'sell_price_percent', value: [5, 5, 10] },
                position: { x: 28, y: 8 }, type: 'intermediate'
            },
            'destiny_mythic_knowledge': {
                id: 'destiny_mythic_knowledge',
                nameKey: "constellations.destiny.nodes.destiny_mythic_knowledge.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_mythic_knowledge.description", // MODIFIÉ
                icon: "📕", cost: [50], maxLevel: 1, dependencies: ['destiny_merchant_1'],
                unlock_conditions: ['destiny_legendary_knowledge'],
                bonus: { type: 'unlock_rarity', rarity: 'mythic' },
                position: { x: 40, y: 5 }, type: 'major'
            },
            'destiny_resource_2': {
                id: 'destiny_resource_2',
                nameKey: "constellations.destiny.nodes.destiny_resource_2.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_resource_2.description", // MODIFIÉ
                icon: "🌳", maxLevel: 5, cost: [8, 10, 12, 15, 20], dependencies: ['destiny_fragments_1'],
                bonus: { type: 'stat_percent', stat: 'resource_gain_percent', value: [3, 3, 3, 3, 3] },
                position: { x: 25, y: 40 }, type: 'minor'
            },
            'destiny_free_craft_1': {
                id: 'destiny_free_craft_1',
                nameKey: "constellations.destiny.nodes.destiny_free_craft_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_free_craft_1.description", // MODIFIÉ
                icon: "✨", maxLevel: 3, cost: [12, 18, 25], dependencies: ['destiny_resource_2'],
                bonus: { type: 'stat_percent', stat: 'free_craft_chance_percent', value: [1, 1, 2] },
                position: { x: 15, y: 50 }, type: 'intermediate'
            },
            'destiny_merchant_2': {
                id: 'destiny_merchant_2',
                nameKey: "constellations.destiny.nodes.destiny_merchant_2.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_merchant_2.description", // MODIFIÉ
                icon: "📜", maxLevel: 3, cost: [15, 20, 25], dependencies: ['destiny_merchant_1'],
                bonus: { type: 'stat_percent', stat: 'sell_price_percent', value: [5, 5, 5] },
                position: { x: 25, y: 0 }, type: 'intermediate'
            },
            'destiny_epic_knowledge': {
                id: 'destiny_epic_knowledge',
                nameKey: "constellations.destiny.nodes.destiny_epic_knowledge.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_epic_knowledge.description", // MODIFIÉ
                icon: "📘", cost: [5], maxLevel: 1, dependencies: ['destiny_start'],
                bonus: { type: 'unlock_rarity', rarity: 'epic' },
                position: { x: 52, y: 55 }, type: 'major'
            },
            'destiny_hp_1': {
                id: 'destiny_hp_1',
                nameKey: "constellations.destiny.nodes.destiny_hp_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_hp_1.description", // MODIFIÉ
                icon: "❤️", maxLevel: 5, cost: [2, 3, 4, 5, 6], dependencies: ['destiny_epic_knowledge'],
                bonus: { type: 'stat_percent', stat: 'Vie_percent', value: [2, 2, 2, 2, 2] },
                position: { x: 50, y: 68 }, type: 'intermediate'
            },
            'destiny_def_1': {
                id: 'destiny_def_1',
                nameKey: "constellations.destiny.nodes.destiny_def_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_def_1.description", // MODIFIÉ
                icon: "🛡️", maxLevel: 5, cost: [3, 4, 5, 6, 8], dependencies: ['destiny_hp_1'],
                bonus: { type: 'stat_flat', stat: 'Défense', value: [1, 1, 1, 1, 1] },
                position: { x: 50, y: 78 }, type: 'minor'
            },
            'destiny_resistance_1': {
                id: 'destiny_resistance_1',
                nameKey: "constellations.destiny.nodes.destiny_resistance_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_resistance_1.description", // MODIFIÉ
                icon: "🔗", maxLevel: 5, cost: [5, 6, 8, 10, 12], dependencies: ['destiny_def_1'],
                bonus: { type: 'stat_percent', stat: 'resistance_percent', value: [1, 1, 1, 1, 1] },
                position: { x: 60, y: 85 }, type: 'intermediate'
            },
            'destiny_regen_1': {
                id: 'destiny_regen_1',
                nameKey: "constellations.destiny.nodes.destiny_regen_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_regen_1.description", // MODIFIÉ
                icon: "❤️‍🩹", maxLevel: 3, cost: [6, 9, 14], dependencies: ['destiny_def_1'],
                bonus: { type: 'stat_flat', stat: 'RegenHP', value: [0.25, 0.25, 0.5] },
                position: { x: 40, y: 85 }, type: 'intermediate'
            },
            'destiny_indomitable': {
                id: 'destiny_indomitable',
                nameKey: "constellations.destiny.nodes.destiny_indomitable.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_indomitable.description", // MODIFIÉ
                icon: "✊", cost: [40], maxLevel: 1, dependencies: ['destiny_resistance_1', 'destiny_regen_1'],
                bonus: { type: 'special_passive', passive: 'passive_survive_fatal_hit' },
                position: { x: 50, y: 95 }, type: 'major'
            },
            'destiny_xp_1': {
                id: 'destiny_xp_1',
                nameKey: "constellations.destiny.nodes.destiny_xp_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_xp_1.description", // MODIFIÉ
                icon: "⭐", maxLevel: 5, cost: [2, 3, 4, 5, 6], dependencies: ['destiny_all_stats_1'],
                bonus: { type: 'stat_percent', stat: 'xp_gain_percent', value: [2, 2, 3, 3, 5] },
                position: { x: 62, y: 28 }, type: 'intermediate'
            },
            'destiny_codex_1': {
                id: 'destiny_codex_1',
                nameKey: "constellations.destiny.nodes.destiny_codex_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_codex_1.description", // MODIFIÉ
                icon: "📖", maxLevel: 3, cost: [4, 6, 10], dependencies: ['destiny_xp_1'],
                bonus: { type: 'stat_percent', stat: 'codex_kill_credit_percent', value: [10, 10, 10] },
                position: { x: 72, y: 32 }, type: 'intermediate'
            },
            'destiny_stat_points_1': {
                id: 'destiny_stat_points_1',
                nameKey: "constellations.destiny.nodes.destiny_stat_points_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_stat_points_1.description", // MODIFIÉ
                icon: "✨", cost: [20], maxLevel: 1, dependencies: ['destiny_codex_1'],
                bonus: { type: 'special_passive', passive: 'passive_bonus_stat_points_per_level', value: 1, frequency: 25 },
                position: { x: 82, y: 25 }, type: 'major'
            },
            'destiny_crit_1': {
                id: 'destiny_crit_1',
                nameKey: "constellations.destiny.nodes.destiny_crit_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_crit_1.description", // MODIFIÉ
                icon: "🎯", maxLevel: 5, cost: [5, 7, 9, 12, 15], dependencies: ['destiny_stat_points_1'],
                bonus: { type: 'stat_percent', stat: 'CritChance', value: [1, 1, 1, 1, 1] },
                position: { x: 92, y: 30 }, type: 'minor'
            },
            'destiny_crit_damage_1': {
                id: 'destiny_crit_damage_1',
                nameKey: "constellations.destiny.nodes.destiny_crit_damage_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_crit_damage_1.description", // MODIFIÉ
                icon: "💥", maxLevel: 5, cost: [6, 8, 10, 14, 18], dependencies: ['destiny_crit_1'],
                bonus: { type: 'stat_percent', stat: 'CritDamage', value: [5, 5, 5, 5, 10] },
                position: { x: 82, y: 15 }, type: 'intermediate'
            },
            'destiny_ascension_mastery': {
                id: 'destiny_ascension_mastery',
                nameKey: "constellations.destiny.nodes.destiny_ascension_mastery.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_ascension_mastery.description", // MODIFIÉ
                icon: "🌌", maxLevel: 3, cost: [15, 25, 40], dependencies: ['destiny_stat_points_1'],
                bonus: { type: 'stat_percent', stat: 'ascension_pc_gain_percent', value: [5, 5, 10] },
                position: { x: 72, y: 8 }, type: 'intermediate'
            },
            'destiny_true_potential': {
                id: 'destiny_true_potential',
                nameKey: "constellations.destiny.nodes.destiny_true_potential.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_true_potential.description", // MODIFIÉ
                icon: "👑", cost: [60], maxLevel: 1, dependencies: ['destiny_ascension_mastery', 'destiny_crit_damage_1'],
                bonus: { type: 'stat_percent_all', value: 10 },
                position: { x: 60, y: 5 }, type: 'major'
            },
            'destiny_xp_2': {
                id: 'destiny_xp_2',
                nameKey: "constellations.destiny.nodes.destiny_xp_2.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_xp_2.description", // MODIFIÉ
                icon: "📜", maxLevel: 5, cost: [8, 10, 12, 15, 20], dependencies: ['destiny_codex_1'],
                bonus: { type: 'stat_percent', stat: 'xp_gain_percent', value: [2, 2, 2, 2, 2] },
                position: { x: 75, y: 40 }, type: 'minor'
            },
            'destiny_patrol_1': {
                id: 'destiny_patrol_1',
                nameKey: "constellations.destiny.nodes.destiny_patrol_1.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_patrol_1.description", // MODIFIÉ
                icon: "⏳", maxLevel: 5, cost: [8, 12, 16, 20, 25], dependencies: ['destiny_xp_2'],
                bonus: { type: 'stat_percent', stat: 'patrol_reward_percent', value: [4, 4, 4, 4, 4] },
                position: { x: 85, y: 45 }, type: 'intermediate'
            },
            'destiny_crit_damage_2': {
                id: 'destiny_crit_damage_2',
                nameKey: "constellations.destiny.nodes.destiny_crit_damage_2.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_crit_damage_2.description", // MODIFIÉ
                icon: "🔥", maxLevel: 5, cost: [18, 22, 28, 34, 40], dependencies: ['destiny_crit_damage_1'],
                bonus: { type: 'stat_percent', stat: 'CritDamage', value: [5, 5, 5, 5, 5] },
                position: { x: 88, y: 8 }, type: 'intermediate'
            },
            'destiny_ascension_mastery_2': {
                id: 'destiny_ascension_mastery_2',
                nameKey: "constellations.destiny.nodes.destiny_ascension_mastery_2.name", // MODIFIÉ
                descriptionKey: "constellations.destiny.nodes.destiny_ascension_mastery_2.description", // MODIFIÉ
                icon: "🌠", maxLevel: 3, cost: [45, 60, 75], dependencies: ['destiny_ascension_mastery'],
                bonus: { type: 'stat_percent', stat: 'ascension_pc_gain_percent', value: [5, 5, 5] },
                position: { x: 70, y: 0 }, type: 'major'
            }
        }
    },
guerrier: {
    nameKey: "constellations.guerrier.name",
    nodes: {
        'guerrier_start': {
            id: 'guerrier_start', nameKey: "constellations.guerrier.nodes.guerrier_start.name", descriptionKey: "constellations.guerrier.nodes.guerrier_start.description",
            icon: "✊", cost: [0], maxLevel: 1, dependencies: [], position: { x: 50, y: 95 }, type: 'start'
        },
        'guerrier_force_1': {
            id: 'guerrier_force_1', nameKey: "constellations.guerrier.nodes.guerrier_force_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_force_1.description",
            icon: "💪", maxLevel: 5, cost: [1, 1, 1, 2, 2], dependencies: ['guerrier_start'],
            bonus: { type: 'stat_flat', stat: 'Force', value: [2, 2, 2, 2, 3] }, position: { x: 50, y: 88 }, type: 'minor'
        },
        'guerrier_vie_1': {
            id: 'guerrier_vie_1', nameKey: "constellations.guerrier.nodes.guerrier_vie_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_vie_1.description",
            icon: "❤️", maxLevel: 5, cost: [1, 1, 1, 2, 2], dependencies: ['guerrier_force_1'],
            bonus: { type: 'stat_percent', stat: 'Vie_percent', value: [2, 2, 2, 2, 3] }, position: { x: 50, y: 80 }, type: 'minor'
        },
        'guerrier_force_vie_1': {
            id: 'guerrier_force_vie_1', nameKey: "constellations.guerrier.nodes.guerrier_force_vie_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_force_vie_1.description",
            icon: "🏋️", maxLevel: 3, cost: [2, 3, 4], dependencies: ['guerrier_vie_1'],
            bonus: { type: 'stat_flat', stat: 'Force', value: [2, 2, 3], stat2: 'Vie', value2: [2, 2, 3] }, position: { x: 50, y: 72 }, type: 'intermediate'
        },
        'guerrier_garde_base': {
            id: 'guerrier_garde_base', nameKey: "constellations.guerrier.nodes.guerrier_garde_base.name", descriptionKey: "constellations.guerrier.nodes.guerrier_garde_base.description",
            icon: "🛡️", maxLevel: 1, cost: [3], dependencies: ['guerrier_force_vie_1'],
            bonus: { type: 'stat_flat', stat: 'Défense', value: [1] }, position: { x: 50, y: 65 }, type: 'intermediate'
        },
        'guerrier_resistance_1': {
            id: 'guerrier_resistance_1', nameKey: "constellations.guerrier.nodes.guerrier_resistance_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_resistance_1.description",
            icon: "🔗", maxLevel: 3, cost: [4, 5, 6], dependencies: ['guerrier_garde_base'],
            bonus: { type: 'stat_percent', stat: 'resistance_percent', value: [1, 1, 2] }, position: { x: 38, y: 65 }, type: 'intermediate'
        },
        'guerrier_cri_1': {
            id: 'guerrier_cri_1', nameKey: "constellations.guerrier.nodes.guerrier_cri_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_cri_1.description",
            icon: "🗣️", maxLevel: 3, cost: [5, 6, 7], dependencies: ['guerrier_resistance_1'],
            bonus: { type: 'stat_percent', stat: 'armor_shred_percent', value: [2, 2, 3] }, position: { x: 26, y: 65 }, type: 'minor'
        },
        'guerrier_def_1': {
            id: 'guerrier_def_1', nameKey: "constellations.guerrier.nodes.guerrier_def_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_def_1.description",
            icon: "🛡️", maxLevel: 5, cost: [4, 6, 6, 8, 15], dependencies: ['guerrier_garde_base'],
            bonus: { type: 'stat_flat', stat: 'Défense', value: [1, 1, 1, 1, 2] }, position: { x: 62, y: 65 }, type: 'intermediate'
        },
        'guerrier_regen_1': {
            id: 'guerrier_regen_1', nameKey: "constellations.guerrier.nodes.guerrier_regen_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_regen_1.description",
            icon: "❤️‍🩹", maxLevel: 3, cost: [4, 5, 6], dependencies: ['guerrier_def_1'],
            bonus: { type: 'stat_flat', stat: 'RegenHP', value: [0.2, 0.2, 0.3] }, position: { x: 74, y: 65 }, type: 'minor'
        },
        'guerrier_degats_1': {
            id: 'guerrier_degats_1', nameKey: "constellations.guerrier.nodes.guerrier_degats_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_degats_1.description",
            icon: "💥", maxLevel: 5, cost: [3, 4, 5, 6, 8], dependencies: ['guerrier_garde_base'],
            bonus: { type: 'stat_percent', stat: 'damage_percent', value: [2, 2, 2, 2, 3] }, position: { x: 50, y: 55 }, type: 'intermediate'
        },
        'guerrier_crit_chance_1': {
            id: 'guerrier_crit_chance_1', nameKey: "constellations.guerrier.nodes.guerrier_crit_chance_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_crit_chance_1.description",
            icon: "🎯", maxLevel: 5, cost: [4, 5, 6, 7, 8], dependencies: ['guerrier_degats_1', 'guerrier_cri_1'],
            bonus: { type: 'stat_percent', stat: 'CritChance', value: [1, 1, 1, 1, 2] }, position: { x: 40, y: 48 }, type: 'minor'
        },
        'guerrier_crit_damage_1': {
            id: 'guerrier_crit_damage_1', nameKey: "constellations.guerrier.nodes.guerrier_crit_damage_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_crit_damage_1.description",
            icon: "☄️", maxLevel: 3, cost: [5, 7, 9], dependencies: ['guerrier_crit_chance_1'],
            bonus: { type: 'stat_percent', stat: 'CritDamage', value: [8, 8, 9] }, position: { x: 32, y: 42 }, type: 'minor'
        },
        'guerrier_lifesteal_1': {
            id: 'guerrier_lifesteal_1', nameKey: "constellations.guerrier.nodes.guerrier_lifesteal_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_lifesteal_1.description",
            icon: "🩸", maxLevel: 5, cost: [5, 6, 7, 8, 10], dependencies: ['guerrier_crit_damage_1'],
            bonus: { type: 'stat_percent', stat: 'lifesteal_percent', value: [0.5, 0.5, 0.5, 0.5, 1] }, position: { x: 30, y: 32 }, type: 'intermediate'
        },
        'guerrier_berserker_keystone': {
            id: 'guerrier_berserker_keystone', nameKey: "constellations.guerrier.nodes.guerrier_berserker_keystone.name", descriptionKey: "constellations.guerrier.nodes.guerrier_berserker_keystone.description",
            icon: "💀", cost: [20], maxLevel: 1, dependencies: ['guerrier_lifesteal_1'],
            bonus: { type: 'special_passive', passive: 'bonus_force_low_hp_percent', value: 50 }, position: { x: 28, y: 18 }, type: 'major'
        },
        'guerrier_stun_chance_1': {
            id: 'guerrier_stun_chance_1', nameKey: "constellations.guerrier.nodes.guerrier_stun_chance_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_stun_chance_1.description",
            icon: "💫", maxLevel: 5, cost: [4, 5, 6, 7, 8], dependencies: ['guerrier_degats_1', 'guerrier_regen_1'],
            bonus: { type: 'stat_percent', stat: 'stun_chance_percent', value: [1, 1, 1, 1, 2] }, position: { x: 60, y: 48 }, type: 'minor'
        },
        'guerrier_def_vie_1': {
            id: 'guerrier_def_vie_1', nameKey: "constellations.guerrier.nodes.guerrier_def_vie_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_def_vie_1.description",
            icon: "🏰", maxLevel: 3, cost: [5, 7, 9], dependencies: ['guerrier_stun_chance_1'],
            bonus: { type: 'stat_flat', stat: 'Défense', value: [1, 2, 2], stat2: 'Vie', value2: [3, 3, 4] }, position: { x: 68, y: 42 }, type: 'minor'
        },
        'guerrier_thorns_1': {
            id: 'guerrier_thorns_1', nameKey: "constellations.guerrier.nodes.guerrier_thorns_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_thorns_1.description",
            icon: "🌵", maxLevel: 5, cost: [5, 6, 7, 8, 10], dependencies: ['guerrier_def_vie_1'],
            bonus: { type: 'stat_flat', stat: 'thorns_damage_flat', value: [5, 5, 6, 6, 8] }, position: { x: 70, y: 32 }, type: 'intermediate'
        },
        'guerrier_juggernaut_keystone': {
            id: 'guerrier_juggernaut_keystone', nameKey: "constellations.guerrier.nodes.guerrier_juggernaut_keystone.name", descriptionKey: "constellations.guerrier.nodes.guerrier_juggernaut_keystone.description",
            icon: "🗿", cost: [20], maxLevel: 1, dependencies: ['guerrier_thorns_1'],
            bonus: { type: 'stat_percent', stat: 'stun_resistance_percent', value: 100 }, position: { x: 72, y: 18 }, type: 'major'
        },
        'guerrier_force_2': {
            id: 'guerrier_force_2', nameKey: "constellations.guerrier.nodes.guerrier_force_2.name", descriptionKey: "constellations.guerrier.nodes.guerrier_force_2.description",
            icon: "💪", maxLevel: 5, cost: [8, 9, 10, 11, 12], dependencies: ['guerrier_degats_1'],
            bonus: { type: 'stat_flat', stat: 'Force', value: [3, 4, 4, 5, 5] }, position: { x: 50, y: 42 }, type: 'intermediate'
        },
        'guerrier_force_percent_1': {
            id: 'guerrier_force_percent_1', nameKey: "constellations.guerrier.nodes.guerrier_force_percent_1.name", descriptionKey: "constellations.guerrier.nodes.guerrier_force_percent_1.description",
            icon: "🏋️", maxLevel: 5, cost: [15, 18, 22, 26, 30], dependencies: ['guerrier_force_2', 'guerrier_lifesteal_1', 'guerrier_thorns_1'],
            bonus: { type: 'stat_percent', stat: 'Force_percent', value: [2, 2, 3, 3, 5] }, position: { x: 50, y: 28 }, type: 'intermediate'
        },
        'guerrier_ultime': {
            id: 'guerrier_ultime', nameKey: "constellations.guerrier.nodes.guerrier_ultime.name", descriptionKey: "constellations.guerrier.nodes.guerrier_ultime.description",
            icon: "👑", cost: [50], maxLevel: 1, dependencies: ['guerrier_force_percent_1', 'guerrier_berserker_keystone', 'guerrier_juggernaut_keystone'],
            bonus: { type: 'stat_flat_all', value: 10 }, position: { x: 50, y: 8 }, type: 'major'
        }
    }
},
archer: {
    nameKey: "constellations.archer.name",
    nodes: {
        'archer_start': {
            id: 'archer_start', nameKey: "constellations.archer.nodes.archer_start.name", descriptionKey: "constellations.archer.nodes.archer_start.description",
            icon: "🏹", cost: [0], maxLevel: 1, dependencies: [], position: { x: 50, y: 50 }, type: 'start'
        },
        'archer_agilite_1': {
            id: 'archer_agilite_1', nameKey: "constellations.archer.nodes.archer_agilite_1.name", descriptionKey: "constellations.archer.nodes.archer_agilite_1.description",
            icon: "🤸", maxLevel: 5, cost: [1, 1, 2, 2, 3], dependencies: ['archer_start'],
            bonus: { type: 'stat_flat', stat: 'Agilité', value: [2, 2, 3, 3, 4] }, position: { x: 60, y: 50 }, type: 'minor'
        },
        'archer_crit_chance_1': {
            id: 'archer_crit_chance_1', nameKey: "constellations.archer.nodes.archer_crit_chance_1.name", descriptionKey: "constellations.archer.nodes.archer_crit_chance_1.description",
            icon: "🎯", maxLevel: 5, cost: [2, 2, 3, 3, 4], dependencies: ['archer_agilite_1'],
            bonus: { type: 'stat_percent', stat: 'CritChance', value: [1, 1, 1, 1, 2] }, position: { x: 70, y: 50 }, type: 'intermediate'
        },
        'archer_skill_damage_1': {
            id: 'archer_skill_damage_1', nameKey: "constellations.archer.nodes.archer_skill_damage_1.name", descriptionKey: "constellations.archer.nodes.archer_skill_damage_1.description",
            icon: "➹", maxLevel: 5, cost: [3, 4, 5, 6, 8], dependencies: ['archer_crit_chance_1'],
            bonus: { type: 'stat_percent', stat: 'archer_skill_damage_percent', value: [3, 3, 4, 5, 5] }, position: { x: 80, y: 50 }, type: 'intermediate'
        },
        'archer_precision_1': {
            id: 'archer_precision_1', nameKey: "constellations.archer.nodes.archer_precision_1.name", descriptionKey: "constellations.archer.nodes.archer_precision_1.description",
            icon: "🎯", maxLevel: 3, cost: [5, 7, 9], dependencies: ['archer_skill_damage_1'],
            bonus: { type: 'stat_percent', stat: 'CritChance', value: [1, 2, 2] }, position: { x: 85, y: 38 }, type: 'minor'
        },
        'archer_armor_shred_1': {
            id: 'archer_armor_shred_1', nameKey: "constellations.archer.nodes.archer_armor_shred_1.name", descriptionKey: "constellations.archer.nodes.archer_armor_shred_1.description",
            icon: "🛡️", maxLevel: 5, cost: [5, 6, 8, 10, 12], dependencies: ['archer_precision_1'],
            bonus: { type: 'stat_percent', stat: 'armor_shred_percent', value: [2, 2, 3, 3, 5] }, position: { x: 90, y: 25 }, type: 'intermediate'
        },
        'archer_crit_damage_1': {
            id: 'archer_crit_damage_1', nameKey: "constellations.archer.nodes.archer_crit_damage_1.name", descriptionKey: "constellations.archer.nodes.archer_crit_damage_1.description",
            icon: "💥", maxLevel: 5, cost: [6, 8, 11, 14, 18], dependencies: ['archer_armor_shred_1'],
            bonus: { type: 'stat_percent', stat: 'CritDamage', value: [10, 10, 12, 13, 15] }, position: { x: 85, y: 12 }, type: 'intermediate'
        },
        'archer_sniper_keystone': {
            id: 'archer_sniper_keystone', nameKey: "constellations.archer.nodes.archer_sniper_keystone.name", descriptionKey: "constellations.archer.nodes.archer_sniper_keystone.description",
            icon: "🦅", cost: [30], maxLevel: 1, dependencies: ['archer_crit_damage_1'],
            bonus: { type: 'special_passive', passive: 'passive_crit_execute' }, position: { x: 70, y: 5 }, type: 'major'
        },
        'archer_vitesse_1': {
            id: 'archer_vitesse_1', nameKey: "constellations.archer.nodes.archer_vitesse_1.name", descriptionKey: "constellations.archer.nodes.archer_vitesse_1.description",
            icon: "🤸", maxLevel: 3, cost: [5, 7, 9], dependencies: ['archer_skill_damage_1'],
            bonus: { type: 'stat_flat', stat: 'Agilité', value: [3, 4, 5] }, position: { x: 85, y: 62 }, type: 'minor'
        },
        'archer_esquive_1': {
            id: 'archer_esquive_1', nameKey: "constellations.archer.nodes.archer_esquive_1.name", descriptionKey: "constellations.archer.nodes.archer_esquive_1.description",
            icon: "💨", maxLevel: 5, cost: [5, 6, 8, 10, 12], dependencies: ['archer_vitesse_1'],
            bonus: { type: 'stat_percent', stat: 'evasion_chance_percent', value: [1, 1, 1, 2, 2] }, position: { x: 90, y: 75 }, type: 'intermediate'
        },
        'archer_saignement_1': {
            id: 'archer_saignement_1', nameKey: "constellations.archer.nodes.archer_saignement_1.name", descriptionKey: "constellations.archer.nodes.archer_saignement_1.description",
            icon: "🩸", maxLevel: 5, cost: [6, 8, 11, 14, 18], dependencies: ['archer_esquive_1'],
            bonus: { type: 'stat_percent', stat: 'bleed_chance_percent', value: [3, 3, 4, 5, 5] }, position: { x: 85, y: 88 }, type: 'intermediate'
        },
        'archer_ranger_keystone': {
            id: 'archer_ranger_keystone', nameKey: "constellations.archer.nodes.archer_ranger_keystone.name", descriptionKey: "constellations.archer.nodes.archer_ranger_keystone.description",
            icon: "🌿", cost: [30], maxLevel: 1, dependencies: ['archer_saignement_1'],
            bonus: { type: 'special_passive', passive: 'passive_post_evasion_buff' }, position: { x: 70, y: 95 }, type: 'major'
        },
        'archer_ultime': {
            id: 'archer_ultime', nameKey: "constellations.archer.nodes.archer_ultime.name", descriptionKey: "constellations.archer.nodes.archer_ultime.description",
            icon: "♾️", cost: [60], maxLevel: 1, dependencies: ['archer_sniper_keystone', 'archer_ranger_keystone'],
            bonus: { type: 'stat_flat_all', value: [10] }, position: { x: 50, y: 5 }, type: 'major'
        }
    }
},
mage: {
    nameKey: "constellations.mage.name",
    nodes: {
        'mage_start': {
            id: 'mage_start', nameKey: "constellations.mage.nodes.mage_start.name", descriptionKey: "constellations.mage.nodes.mage_start.description",
            icon: "🧙", cost: [0], maxLevel: 1, dependencies: [], position: { x: 50, y: 5 }, type: 'start'
        },
        'mage_intelligence_1': {
            id: 'mage_intelligence_1', nameKey: "constellations.mage.nodes.mage_intelligence_1.name", descriptionKey: "constellations.mage.nodes.mage_intelligence_1.description",
            icon: "🧠", maxLevel: 5, cost: [1, 1, 1, 2, 2], dependencies: ['mage_start'],
            bonus: { type: 'stat_flat', stat: 'Intelligence', value: [2, 2, 2, 2, 3] }, position: { x: 50, y: 15 }, type: 'minor'
        },
        'mage_mana_1': {
            id: 'mage_mana_1', nameKey: "constellations.mage.nodes.mage_mana_1.name", descriptionKey: "constellations.mage.nodes.mage_mana_1.description",
            icon: "💧", maxLevel: 5, cost: [1, 1, 2, 2, 3], dependencies: ['mage_intelligence_1'],
            bonus: { type: 'stat_percent', stat: 'max_mana_percent', value: [3, 3, 4, 5, 5] }, position: { x: 50, y: 25 }, type: 'minor'
        },
        'mage_siphon_1': {
            id: 'mage_siphon_1', nameKey: "constellations.mage.nodes.mage_siphon_1.name", descriptionKey: "constellations.mage.nodes.mage_siphon_1.description",
            icon: "🌀", maxLevel: 3, cost: [3, 6, 10], dependencies: ['mage_mana_1'],
            bonus: { type: 'stat_percent', stat: 'spell_lifesteal_percent', value: [0.5, 0.5, 1], stat2: 'vol_de_mana_percent', value2: [0.5, 0.5, 1] }, position: { x: 50, y: 35 }, type: 'intermediate'
        },
        'mage_spell_damage_1': {
            id: 'mage_spell_damage_1', nameKey: "constellations.mage.nodes.mage_spell_damage_1.name", descriptionKey: "constellations.mage.nodes.mage_spell_damage_1.description",
            icon: "🔥", maxLevel: 5, cost: [4, 5, 6, 8, 10], dependencies: ['mage_siphon_1'],
            bonus: { type: 'stat_percent', stat: 'spell_damage_percent', value: [3, 3, 4, 5, 5] }, position: { x: 40, y: 45 }, type: 'intermediate'
        },
        'mage_spell_crit_1': {
            id: 'mage_spell_crit_1', nameKey: "constellations.mage.nodes.mage_spell_crit_1.name", descriptionKey: "constellations.mage.nodes.mage_spell_crit_1.description",
            icon: "✨", maxLevel: 5, cost: [5, 6, 7, 9, 12], dependencies: ['mage_spell_damage_1'],
            bonus: { type: 'stat_percent', stat: 'spell_crit_chance_percent', value: [1, 1, 1, 2, 2] }, position: { x: 30, y: 55 }, type: 'intermediate'
        },
        'mage_freecast_1': {
            id: 'mage_freecast_1', nameKey: "constellations.mage.nodes.mage_freecast_1.name", descriptionKey: "constellations.mage.nodes.mage_freecast_1.description",
            icon: "🌌", maxLevel: 3, cost: [6, 8, 11], dependencies: ['mage_spell_crit_1'],
            bonus: { type: 'stat_percent', stat: 'freecast_chance_percent', value: [1, 2, 2] }, position: { x: 22, y: 65 }, type: 'intermediate'
        },
        'mage_archon_keystone': {
            id: 'mage_archon_keystone', nameKey: "constellations.mage.nodes.mage_archon_keystone.name", descriptionKey: "constellations.mage.nodes.mage_archon_keystone.description",
            icon: "💥", cost: [30], maxLevel: 1, dependencies: ['mage_freecast_1'],
            bonus: { type: 'special_passive', passive: 'passive_arcane_overload' }, position: { x: 15, y: 75 }, type: 'major'
        },
        'mage_efficiency_1': {
            id: 'mage_efficiency_1', nameKey: "constellations.mage.nodes.mage_efficiency_1.name", descriptionKey: "constellations.mage.nodes.mage_efficiency_1.description",
            icon: "📉", maxLevel: 5, cost: [4, 5, 6, 8, 10], dependencies: ['mage_siphon_1'],
            bonus: { type: 'stat_percent', stat: 'mana_cost_percent', value: [-2, -2, -3, -3, -4] }, position: { x: 60, y: 45 }, type: 'intermediate'
        },
        'mage_mana_shield_1': {
            id: 'mage_mana_shield_1', nameKey: "constellations.mage.nodes.mage_mana_shield_1.name", descriptionKey: "constellations.mage.nodes.mage_mana_shield_1.description",
            icon: "🛡️", cost: [20], maxLevel: 1, dependencies: ['mage_efficiency_1'],
            bonus: { type: 'special_passive', passive: 'passive_mana_shield' }, position: { x: 70, y: 55 }, type: 'intermediate'
        },
        'mage_mana_regen_1': {
            id: 'mage_mana_regen_1', nameKey: "constellations.mage.nodes.mage_mana_regen_1.name", descriptionKey: "constellations.mage.nodes.mage_mana_regen_1.description",
            icon: "🧘", maxLevel: 3, cost: [6, 8, 11], dependencies: ['mage_mana_shield_1'],
            bonus: { type: 'stat_percent', stat: 'mana_regen_percent', value: [10, 15, 25] }, position: { x: 78, y: 65 }, type: 'intermediate'
        },
        'mage_battlemage_keystone': {
            id: 'mage_battlemage_keystone', nameKey: "constellations.mage.nodes.mage_battlemage_keystone.name", descriptionKey: "constellations.mage.nodes.mage_battlemage_keystone.description",
            icon: "💜", cost: [40], maxLevel: 1, dependencies: ['mage_mana_regen_1'],
            bonus: { type: 'special_passive', passive: 'passive_siphon_soul' }, position: { x: 85, y: 75 }, type: 'major'
        },
        'mage_archon_edge': {
            id: 'mage_archon_edge', nameKey: "constellations.mage.nodes.mage_archon_edge.name", descriptionKey: "constellations.mage.nodes.mage_archon_edge.description",
            icon: "✨", cost: [15], maxLevel: 1, dependencies: ['mage_archon_keystone'],
            bonus: { type: 'stat_percent', stat: 'spell_crit_damage_percent', value: [10] }, position: { x: 5, y: 80 }, type: 'minor'
        },
        'mage_battlemage_edge': {
            id: 'mage_battlemage_edge', nameKey: "constellations.mage.nodes.mage_battlemage_edge.name", descriptionKey: "constellations.mage.nodes.mage_battlemage_edge.description",
            icon: "🛡️", cost: [15], maxLevel: 1, dependencies: ['mage_battlemage_keystone'],
            bonus: { type: 'stat_percent', stat: 'resistance_percent', value: [3] }, position: { x: 95, y: 80 }, type: 'minor'
        },
        'mage_mastery_1': {
            id: 'mage_mastery_1', nameKey: "constellations.mage.nodes.mage_mastery_1.name", descriptionKey: "constellations.mage.nodes.mage_mastery_1.description",
            icon: "🧠", cost: [35], maxLevel: 1, dependencies: ['mage_archon_keystone', 'mage_battlemage_keystone'],
            bonus: { type: 'stat_flat', stat: 'Intelligence', value: [20] }, position: { x: 46, y: 82 }, type: 'intermediate'
        },
        'mage_ultime': {
            id: 'mage_ultime', nameKey: "constellations.mage.nodes.mage_ultime.name", descriptionKey: "constellations.mage.nodes.mage_ultime.description",
            icon: "👑", cost: [60], maxLevel: 1, dependencies: ['mage_mastery_1'],
            bonus: { type: 'stat_flat', stat: 'Intelligence', value: [30] }, position: { x: 38, y: 92 }, type: 'major'
        }
    }
}
};

const TRAITS_DB = {
    "tier1": [
        {
            id: "T1_COLOSSE", rarity: "common", icon: "🗿", effects: { "Vie_percent": 15, "Agilité_percent": -5 },
            nameKey: "traits.cards.t1_colosse.name",
            descriptionKey: "traits.cards.t1_colosse.description",
            card: { nameKey: "traits.cards.t1_colosse.card_name", familyKey: "traits.families.titans_primordiaux", image: "assets/cards/colosse.png" }
        },
        {
            id: "T1_LOUP_STELLAIRE", rarity: "common", icon: "🐺", effects: { "CritChance": 8.0, "Vie_percent": -5 },
            nameKey: "traits.cards.t1_loup_stellaire.name",
            descriptionKey: "traits.cards.t1_loup_stellaire.description",
            card: { nameKey: "traits.cards.t1_loup_stellaire.card_name", familyKey: "traits.families.betes_celestes", image: "assets/cards/loup_stellaire.png" }
        },
        {
            id: "T1_EPEE_BRISEE", rarity: "common", icon: "脆弱", effects: { "damage_percent": 10, "Défense_percent": -15 },
            nameKey: "traits.cards.t1_epee_brisee.name",
            descriptionKey: "traits.cards.t1_epee_brisee.description",
            card: { nameKey: "traits.cards.t1_epee_brisee.card_name", familyKey: "traits.families.armes_maudites", image: "assets/cards/epee_brisee.png" }
        },
        {
            id: "T1_CHANCEUX", rarity: "common", icon: "🍀", effects: { "Chance_percent": 20, "Intelligence_percent": -5 },
            nameKey: "traits.cards.t1_chanceux.name",
            descriptionKey: "traits.cards.t1_chanceux.description",
            card: { nameKey: "traits.cards.t1_chanceux.card_name", familyKey: "traits.families.arcanes_majeurs", image: "assets/cards/fortune.png" }
        },
        {
            id: "T1_LA_FORCE", rarity: "rare", icon: "🩸", effects: { "lifesteal_percent": 3.0, "Défense_percent": -10.0 },
            nameKey: "traits.cards.t1_la_force.name",
            descriptionKey: "traits.cards.t1_la_force.description",
            card: { nameKey: "traits.cards.t1_la_force.card_name", familyKey: "traits.families.arcanes_majeurs", image: "assets/cards/force.png" }
        },
        {
            id: "T1_ZEPHYR", rarity: "common", icon: "🍃", effects: { "evasion_chance_percent": 5.0, "Force_percent": -5.0 },
            nameKey: "traits.cards.t1_zephyr.name",
            descriptionKey: "traits.cards.t1_zephyr.description",
            card: { nameKey: "traits.cards.t1_zephyr.card_name", familyKey: "traits.families.quatre_vents", image: "assets/cards/zephyr.png" }
        },
        {
            id: "T1_COURONNE_JUSTICE", rarity: "common", icon: "⚖️", effects: { "debuff_resistance_percent": 10.0, "Chance_percent": -5.0 },
            nameKey: "traits.cards.t1_couronne_justice.name",
            descriptionKey: "traits.cards.t1_couronne_justice.description",
            card: { nameKey: "traits.cards.t1_couronne_justice.card_name", familyKey: "traits.families.vertus_royales", image: "assets/cards/couronne.png" }
        },
        {
            id: "T1_PARCHEMIN_GIVRE", rarity: "common", icon: "📜", effects: { "max_mana_percent": 10.0, "Force_percent": -5.0 },
            nameKey: "traits.cards.t1_parchemin_givre.name",
            descriptionKey: "traits.cards.t1_parchemin_givre.description",
            card: { nameKey: "traits.cards.t1_parchemin_givre.card_name", familyKey: "traits.families.parchemins_oublies", image: "assets/cards/parchemin_givre.png" }
        },
        {
            id: "T1_JUGE", rarity: "rare", icon: "👨‍⚖️", effects: { "debuff_resistance_percent": 15.0, "xp_gain_percent": -5.0 },
            nameKey: "traits.cards.t1_juge.name",
            descriptionKey: "traits.cards.t1_juge.description",
            card: { nameKey: "traits.cards.t1_juge.card_name", familyKey: "traits.families.cour_celeste", image: "assets/cards/juge.png" }
        },
        {
            id: "T1_GRAIN_PASSE", rarity: "common", icon: "⏳", effects: { "xp_gain_percent": 5.0, "fragments_gain_percent": -10.0 },
            nameKey: "traits.cards.t1_grain_passe.name",
            descriptionKey: "traits.cards.t1_grain_passe.description",
            card: { nameKey: "traits.cards.t1_grain_passe.card_name", familyKey: "traits.families.sablier_du_temps", image: "assets/cards/grain_passe.png" }
        }
    ],
    "tier2": [
        {
            id: "T2_TITAN_SISMIQUE", rarity: "common", icon: "⛰️", effects: { "Force_percent": 8, "stun_chance_percent": 3.0, "Chance_percent": -10 },
            nameKey: "traits.cards.t2_titan_sismique.name",
            descriptionKey: "traits.cards.t2_titan_sismique.description",
            card: { nameKey: "traits.cards.t2_titan_sismique.card_name", familyKey: "traits.families.titans_primordiaux", image: "assets/cards/titan_sismique.png" }
        },
        {
            id: "T2_LEVIATHAN", rarity: "rare", icon: "🌊", effects: { "Défense_percent": 8, "RegenHP": 0.2, "damage_percent": -5.0 },
            nameKey: "traits.cards.t2_leviathan.name",
            descriptionKey: "traits.cards.t2_leviathan.description",
            card: { nameKey: "traits.cards.t2_leviathan.card_name", familyKey: "traits.families.titans_primordiaux", image: "assets/cards/leviathan.png" }
        },
        {
            id: "T2_GARDIEN_ANCIEN", rarity: "rare", icon: "🐢", effects: { "thorns_damage_flat": 25, "Agilité_percent": -10.0 },
            nameKey: "traits.cards.t2_gardien_ancien.name",
            descriptionKey: "traits.cards.t2_gardien_ancien.description",
            card: { nameKey: "traits.cards.t2_gardien_ancien.card_name", familyKey: "traits.families.titans_primordiaux", image: "assets/cards/gardien_ancien.png" }
        },
        {
            id: "T2_CHIMERE_NEBULEUSE", rarity: "rare", icon: "🌌", effects: { "Agilité_percent": 4, "Intelligence_percent": 4, "RegenHP": -0.2 },
            nameKey: "traits.cards.t2_chimere_nebuleuse.name",
            descriptionKey: "traits.cards.t2_chimere_nebuleuse.description",
            card: { nameKey: "traits.cards.t2_chimere_nebuleuse.card_name", familyKey: "traits.families.betes_celestes", image: "assets/cards/chimere_nebuleuse.png" }
        },
        {
            id: "T2_GRIFFON_SOLAIRE", rarity: "rare", icon: "🦅", effects: { "Agilité_percent": 10, "Vie_percent": -8 },
            nameKey: "traits.cards.t2_griffon_solaire.name",
            descriptionKey: "traits.cards.t2_griffon_solaire.description",
            card: { nameKey: "traits.cards.t2_griffon_solaire.card_name", familyKey: "traits.families.betes_celestes", image: "assets/cards/griffon_solaire.png" }
        },
        {
            id: "T2_FAUCON_COMETE", rarity: "epic", icon: "☄️", effects: { "CritDamage": 25.0, "Force_percent": -8 },
            nameKey: "traits.cards.t2_faucon_comete.name",
            descriptionKey: "traits.cards.t2_faucon_comete.description",
            card: { nameKey: "traits.cards.t2_faucon_comete.card_name", familyKey: "traits.families.betes_celestes", image: "assets/cards/faucon_comete.png" }
        },
        {
            id: "T2_EMPEREUR", rarity: "rare", icon: "👑", effects: { "Force_percent": 8, "Intelligence_percent": 8, "Chance_percent": -10 },
            nameKey: "traits.cards.t2_empereur.name",
            descriptionKey: "traits.cards.t2_empereur.description",
            card: { nameKey: "traits.cards.t2_empereur.card_name", familyKey: "traits.families.arcanes_majeurs", image: "assets/cards/empereur.png" }
        },
        {
            id: "T2_GRANDE_PRETRESSE", rarity: "rare", icon: "🌙", effects: { "max_mana_percent": 15, "resistance_percent": 5, "RegenHP": -0.3 },
            nameKey: "traits.cards.t2_grande_pretresse.name",
            descriptionKey: "traits.cards.t2_grande_pretresse.description",
            card: { nameKey: "traits.cards.t2_grande_pretresse.card_name", familyKey: "traits.families.arcanes_majeurs", image: "assets/cards/pretresse.png" }
        },
        {
            id: "T2_LE_MAGICIEN", rarity: "epic", icon: "🧙‍♂️", effects: { "mana_cost_percent": -15, "Défense_percent": -10 },
            nameKey: "traits.cards.t2_le_magicien.name",
            descriptionKey: "traits.cards.t2_le_magicien.description",
            card: { nameKey: "traits.cards.t2_le_magicien.card_name", familyKey: "traits.families.arcanes_majeurs", image: "assets/cards/magicien.png" }
        },
        {
            id: "T2_LUNE_SANG", rarity: "rare", icon: "🌙", effects: { "spell_lifesteal_percent": 3.0, "healing_effectiveness_percent": -20.0 },
            nameKey: "traits.cards.t2_lune_sang.name",
            descriptionKey: "traits.cards.t2_lune_sang.description",
            card: { nameKey: "traits.cards.t2_lune_sang.card_name", familyKey: "traits.families.astres_sombres", image: "assets/cards/lune_sang.png" }
        },
        {
            id: "T2_SOLEIL_NOIR", rarity: "rare", icon: "☀️", effects: { "spell_damage_percent": 15.0, "Vie_percent": -10.0 },
            nameKey: "traits.cards.t2_soleil_noir.name",
            descriptionKey: "traits.cards.t2_soleil_noir.description",
            card: { nameKey: "traits.cards.t2_soleil_noir.card_name", familyKey: "traits.families.astres_sombres", image: "assets/cards/soleil_noir.png" }
        },
        {
            id: "T2_BOREAS", rarity: "rare", icon: "❄️", effects: { "debuff_resistance_percent": 15.0, "RegenHP": -0.2 },
            nameKey: "traits.cards.t2_boreas.name",
            descriptionKey: "traits.cards.t2_boreas.description",
            card: { nameKey: "traits.cards.t2_boreas.card_name", familyKey: "traits.families.quatre_vents", image: "assets/cards/boreas.png" }
        },
        {
            id: "T2_EURUS", rarity: "rare", icon: "🌪️", effects: { "CritDamage": 15.0, "Défense_percent": -8.0 },
            nameKey: "traits.cards.t2_eurus.name",
            descriptionKey: "traits.cards.t2_eurus.description",
            card: { nameKey: "traits.cards.t2_eurus.card_name", familyKey: "traits.families.quatre_vents", image: "assets/cards/eurus.png" }
        },
        {
            id: "T2_BOUCLIER_FELE", rarity: "rare", icon: "🛡️", effects: { "thorns_damage_flat": 30, "resistance_percent": -10.0 },
            nameKey: "traits.cards.t2_bouclier_fele.name",
            descriptionKey: "traits.cards.t2_bouclier_fele.description",
            card: { nameKey: "traits.cards.t2_bouclier_fele.card_name", familyKey: "traits.families.armes_maudites", image: "assets/cards/bouclier_fele.png" }
        },
        {
            id: "T2_SCEPTRE_NOBLESSE", rarity: "rare", icon: "👑", effects: { "xp_gain_percent": 8.0, "Vie_percent": -5.0 },
            nameKey: "traits.cards.t2_sceptre_noblesse.name",
            descriptionKey: "traits.cards.t2_sceptre_noblesse.description",
            card: { nameKey: "traits.cards.t2_sceptre_noblesse.card_name", familyKey: "traits.families.vertus_royales", image: "assets/cards/sceptre.png" }
        },
        {
            id: "T2_PARCHEMIN_FEU", rarity: "rare", icon: "🔥", effects: { "spell_damage_percent": 8.0, "Défense_percent": -8.0 },
            nameKey: "traits.cards.t2_parchemin_feu.name",
            descriptionKey: "traits.cards.t2_parchemin_feu.description",
            card: { nameKey: "traits.cards.t2_parchemin_feu.card_name", familyKey: "traits.families.parchemins_oublies", image: "assets/cards/parchemin_feu.png" }
        },
        {
            id: "T2_MARTEAU_HEPHAISTOS", rarity: "rare", icon: "🔨", effects: { "free_craft_chance_percent": 3.0, "damage_percent": -5.0 },
            nameKey: "traits.cards.t2_marteau_hephaistos.name",
            descriptionKey: "traits.cards.t2_marteau_hephaistos.description",
            card: { nameKey: "traits.cards.t2_marteau_hephaistos.card_name", familyKey: "traits.families.forge_divine", image: "assets/cards/marteau.png" }
        },
        {
            id: "T2_GARDIEN", rarity: "rare", icon: "🛡️", effects: { "Défense_percent": 10.0, "damage_percent": -5.0 },
            nameKey: "traits.cards.t2_gardien.name",
            descriptionKey: "traits.cards.t2_gardien.description",
            card: { nameKey: "traits.cards.t2_gardien.card_name", familyKey: "traits.families.cour_celeste", image: "assets/cards/gardien.png" }
        },
        {
            id: "T2_FLUX_PRESENT", rarity: "rare", icon: "⌛", effects: { "Agilité_percent": 10.0, "Force_percent": -10.0 },
            nameKey: "traits.cards.t2_flux_present.name",
            descriptionKey: "traits.cards.t2_flux_present.description",
            card: { nameKey: "traits.cards.t2_flux_present.card_name", familyKey: "traits.families.sablier_du_temps", image: "assets/cards/flux_present.png" }
        },
        {
            id: "T2_DIEU_GUERRE", rarity: "epic", icon: "⚔️", effects: { "Force_percent": 10.0, "CritDamage": 10.0, "Vie_percent": -5.0 },
            nameKey: "traits.cards.t2_dieu_guerre.name",
            descriptionKey: "traits.cards.t2_dieu_guerre.description",
            card: { nameKey: "traits.cards.t2_dieu_guerre.card_name", familyKey: "traits.families.pantheon_dechu", image: "assets/cards/dieu_guerre.png" }
        }
    ],
    "tier3": [
        {
            id: "T3_LE_JUGEMENT", rarity: "epic", icon: "⚖️", effects: { "healing_effectiveness_percent": 15, "debuff_resistance_percent": 10 },
            nameKey: "traits.cards.t3_le_jugement.name",
            descriptionKey: "traits.cards.t3_le_jugement.description",
            card: { nameKey: "traits.cards.t3_le_jugement.card_name", familyKey: "traits.families.arcanes_majeurs", image: "assets/cards/jugement.png" }
        },
        {
            id: "T3_LE_MONDE", rarity: "legendary", icon: "🌍", effects: { "xp_gain_percent": 5, "resource_gain_percent": 5, "fragments_gain_percent": 5 },
            nameKey: "traits.cards.t3_le_monde.name",
            descriptionKey: "traits.cards.t3_le_monde.description",
            card: { nameKey: "traits.cards.t3_le_monde.card_name", familyKey: "traits.families.arcanes_majeurs", image: "assets/cards/monde.png" }
        },
        {
            id: "T3_ETOILE_MOURANTE", rarity: "epic", icon: "🌟", effects: { "spell_crit_chance_percent": 10.0, "mana_regen_percent": -20.0 },
            nameKey: "traits.cards.t3_etoile_mourante.name",
            descriptionKey: "traits.cards.t3_etoile_mourante.description",
            card: { nameKey: "traits.cards.t3_etoile_mourante.card_name", familyKey: "traits.families.astres_sombres", image: "assets/cards/etoile_mourante.png" }
        },
        {
            id: "T3_NOTOS", rarity: "epic", icon: "💨", effects: { "healing_effectiveness_percent": 25.0, "damage_percent": -5.0 },
            nameKey: "traits.cards.t3_notos.name",
            descriptionKey: "traits.cards.t3_notos.description",
            card: { nameKey: "traits.cards.t3_notos.card_name", familyKey: "traits.families.quatre_vents", image: "assets/cards/notos.png" }
        },
        {
            id: "T3_LANCE_EMPOISONNEE", rarity: "epic", icon: "☠️", effects: { "bleed_chance_percent": 10.0, "lifesteal_percent": -100.0 },
            nameKey: "traits.cards.t3_lance_empoisonnee.name",
            descriptionKey: "traits.cards.t3_lance_empoisonnee.description",
            card: { nameKey: "traits.cards.t3_lance_empoisonnee.card_name", familyKey: "traits.families.armes_maudites", image: "assets/cards/lance_empoisonnee.png" }
        },
        {
            id: "T3_ORBE_PROSPERITE", rarity: "epic", icon: "💰", effects: { "fragments_gain_percent": 10.0 },
            nameKey: "traits.cards.t3_orbe_prosperite.name",
            descriptionKey: "traits.cards.t3_orbe_prosperite.description",
            card: { nameKey: "traits.cards.t3_orbe_prosperite.card_name", familyKey: "traits.families.vertus_royales", image: "assets/cards/orbe.png" }
        },
        {
            id: "T3_PARCHEMIN_FOUDRE", rarity: "epic", icon: "⚡", effects: { "spell_crit_chance_percent": 12.0, "CritChance": -5.0 },
            nameKey: "traits.cards.t3_parchemin_foudre.name",
            descriptionKey: "traits.cards.t3_parchemin_foudre.description",
            card: { nameKey: "traits.cards.t3_parchemin_foudre.card_name", familyKey: "traits.families.parchemins_oublies", image: "assets/cards/parchemin_foudre.png" }
        },
        {
            id: "T3_ENCLUME_AMES", rarity: "epic", icon: "🔗", effects: { "Défense_percent": 10.0, "Agilité_percent": -8.0 },
            nameKey: "traits.cards.t3_enclume_ames.name",
            descriptionKey: "traits.cards.t3_enclume_ames.description",
            card: { nameKey: "traits.cards.t3_enclume_ames.card_name", familyKey: "traits.families.forge_divine", image: "assets/cards/enclume.png" }
        },
        {
            id: "T3_SOUFFLE_DRAGON", rarity: "legendary", icon: "🐲", effects: { "resistance_percent": 8.0 },
            nameKey: "traits.cards.t3_souffle_dragon.name",
            descriptionKey: "traits.cards.t3_souffle_dragon.description",
            card: { nameKey: "traits.cards.t3_souffle_dragon.card_name", familyKey: "traits.families.forge_divine", image: "assets/cards/souffle_dragon.png" }
        },
        {
            id: "T3_HERAUT", rarity: "epic", icon: "📣", effects: { "damage_percent": 10.0, "mana_cost_percent": 5.0 },
            nameKey: "traits.cards.t3_heraut.name",
            descriptionKey: "traits.cards.t3_heraut.description",
            card: { nameKey: "traits.cards.t3_heraut.card_name", familyKey: "traits.families.cour_celeste", image: "assets/cards/heraut.png" }
        },
        {
            id: "T3_VISION_FUTUR", rarity: "epic", icon: "👁️", effects: { "evasion_chance_percent": 8.0, "Défense_percent": -10.0 },
            nameKey: "traits.cards.t3_vision_futur.name",
            descriptionKey: "traits.cards.t3_vision_futur.description",
            card: { nameKey: "traits.cards.t3_vision_futur.card_name", familyKey: "traits.families.sablier_du_temps", image: "assets/cards/vision_futur.png" }
        },
        {
            id: "T3_DEESSE_NUIT", rarity: "epic", icon: "🦇", effects: { "lifesteal_percent": 8.0, "healing_effectiveness_percent": -20.0 },
            nameKey: "traits.cards.t3_deesse_nuit.name",
            descriptionKey: "traits.cards.t3_deesse_nuit.description",
            card: { nameKey: "traits.cards.t3_deesse_nuit.card_name", familyKey: "traits.families.pantheon_dechu", image: "assets/cards/deesse_nuit.png" }
        }
    ],
    "tier_max": [
        {
            id: "TMAX_VIDE_AFFAME", rarity: "legendary", icon: "⚫", effects: { "vol_de_mana_percent": 5.0, "max_mana_percent": -10.0 },
            nameKey: "traits.cards.tmax_vide_affame.name",
            descriptionKey: "traits.cards.tmax_vide_affame.description",
            card: { nameKey: "traits.cards.tmax_vide_affame.card_name", familyKey: "traits.families.astres_sombres", image: "assets/cards/vide_affame.png" }
        },
        {
            id: "TMAX_IMPERATRICE", rarity: "legendary", icon: "👑", effects: { "Vie_percent": 15.0 },
            nameKey: "traits.cards.tmax_imperatrice.name",
            descriptionKey: "traits.cards.tmax_imperatrice.description",
            card: { nameKey: "traits.cards.tmax_imperatrice.card_name", familyKey: "traits.families.cour_celeste", image: "assets/cards/imperatrice.png" }
        },
        {
            id: "TMAX_ECHO_ETERNITE", rarity: "legendary", icon: "🌀", effects: { "passive": "first_skill_free_turn_chance", "value": 25 },
            nameKey: "traits.cards.tmax_echo_eternite.name",
            descriptionKey: "traits.cards.tmax_echo_eternite.description",
            card: { nameKey: "traits.cards.tmax_echo_eternite.card_name", familyKey: "traits.families.sablier_du_temps", image: "assets/cards/echo_eternite.png" }
        },
        {
            id: "TMAX_DIEU_CHAOS", rarity: "mythic", icon: "💥", effects: { "damage_percent": 15.0, "CritChance": -10.0 },
            nameKey: "traits.cards.tmax_dieu_chaos.name",
            descriptionKey: "traits.cards.tmax_dieu_chaos.description",
            card: { nameKey: "traits.cards.tmax_dieu_chaos.card_name", familyKey: "traits.families.pantheon_dechu", image: "assets/cards/dieu_chaos.png" }
        }
    ]
};

const CARD_FAMILIES_DB = {
    "arcanes_majeurs": {
        nameKey: "traits.families.arcanes_majeurs.name",
        descriptionKey: "traits.families.arcanes_majeurs.description",
        cards: [ "Le Magicien", "La Grande Prêtresse", "L'Empereur", "La Roue de la Fortune", "La Force", "Le Jugement", "Le Monde" ],
        bonus: { "stat_flat_all": 10 }
    },
    "titans_primordiaux": {
        nameKey: "traits.families.titans_primordiaux.name",
        descriptionKey: "traits.families.titans_primordiaux.description",
        cards: [ "Le Colosse", "Le Léviathan", "Le Gardien Ancien", "Le Titan Sismique" ],
        bonus: { "Vie_percent": 15 }
    },
    "betes_celestes": {
        nameKey: "traits.families.betes_celestes.name",
        descriptionKey: "traits.families.betes_celestes.description",
        cards: [ "Le Griffon Solaire", "Le Loup Stellaire", "Le Faucon Comète", "La Chimère Nébuleuse" ],
        bonus: { "CritChance": 5.0, "CritDamage": 10.0 }
    },
    "astres_sombres": {
        nameKey: "traits.families.astres_sombres.name",
        descriptionKey: "traits.families.astres_sombres.description",
        cards: [ "La Lune de Sang", "Le Soleil Noir", "L'Étoile Mourante", "Le Vide Affamé" ],
        bonus: { "spell_lifesteal_percent": 5.0 }
    },
    "quatre_vents": {
        nameKey: "traits.families.quatre_vents.name",
        descriptionKey: "traits.families.quatre_vents.description",
        cards: [ "Zéphyr le Vent d'Ouest", "Boreas le Vent du Nord", "Eurus le Vent d'Est", "Notos le Vent du Sud" ],
        bonus: { "evasion_chance_percent": 10.0 }
    },
    "armes_maudites": {
        nameKey: "traits.families.armes_maudites.name",
        descriptionKey: "traits.families.armes_maudites.description",
        cards: [ "L'Épée Brisée", "Le Bouclier Fêlé", "La Lance Empoisonnée" ],
        bonus: { "damage_percent": 5.0 }
    },
    "vertus_royales": {
        nameKey: "traits.families.vertus_royales.name",
        descriptionKey: "traits.families.vertus_royales.description",
        cards: [ "Couronne de la Justice", "Sceptre de la Noblesse", "Orbe de la Prospérité" ],
        bonus: { "fragments_gain_percent": 10.0 }
    },
    "parchemins_oublies": {
        nameKey: "traits.families.parchemins_oublies.name",
        descriptionKey: "traits.families.parchemins_oublies.description",
        cards: [ "Parchemin de Givre", "Parchemin de Feu", "Parchemin de Foudre" ],
        bonus: { "max_mana_percent": 15.0 }
    },
    "forge_divine": {
        nameKey: "traits.families.forge_divine.name",
        descriptionKey: "traits.families.forge_divine.description",
        cards: [ "Le Marteau d'Héphaïstos", "L'Enclume des Âmes", "Le Souffle du Dragon" ],
        bonus: { "free_craft_chance_percent": 5.0 }
    },
    "cour_celeste": {
        nameKey: "traits.families.cour_celeste.name",
        descriptionKey: "traits.families.cour_celeste.description",
        cards: [ "Le Juge", "Le Gardien", "Le Héraut", "L'Impératrice" ],
        bonus: { "Force_percent": 5.0, "Agilité_percent": 5.0, "Intelligence_percent": 5.0 }
    },
    "sablier_du_temps": {
        nameKey: "traits.families.sablier_du_temps.name",
        descriptionKey: "traits.families.sablier_du_temps.description",
        cards: [ "Grain du Passé", "Flux du Présent", "Vision du Futur", "Écho de l'Éternité" ],
        bonus: { "passive": "random_buff_on_combat_start" }
    },
    "pantheon_dechu": {
        nameKey: "traits.families.pantheon_dechu.name",
        descriptionKey: "traits.families.pantheon_dechu.description",
        cards: [ "Vestige du Dieu de la Guerre", "Vestige de la Déesse de la Nuit", "Vestige du Dieu du Chaos" ],
        bonus: { "CritDamage": 15.0, "lifesteal_percent": 5.0, "resistance_percent": -10.0 }
    }
};

// ============================================================================
// ==   FIEF DU JOUEUR (BÂTIMENTS PASSIFS)
// ============================================================================

const FIEF_DB = {
    'scierie': {
        nameKey: "fief.scierie.name",
        descriptionKey: "fief.scierie.description",
        icon: "🌲", produces: 'bois',
        upgrades: [
            { cost: { metal: 250, tissu: 150, fragments: 15 }, production: 50, constructionTimeHours: 0.03 }, // ~2m
            { cost: { metal: 800, tissu: 400, fragments: 40 }, production: 110, constructionTimeHours: 0.1 }, // 6m
            { cost: { metal: 2000, tissu: 1000, fragments: 100 }, production: 220, constructionTimeHours: 0.3 }, // ~18m
            { cost: { metal: 4500, tissu: 2200, 'chitine_renforcee': 10, fragments: 250 }, production: 450, constructionTimeHours: 1 },
            { cost: { bois: 7000, metal: 7000, tissu: 3500, 'chitine_renforcee': 25, fragments: 750 }, production: 900, constructionTimeHours: 2.5 },
            { cost: { bois: 15000, metal: 15000, tissu: 7500, 'chitine_renforcee': 60, fragments: 1500 }, production: 1800, constructionTimeHours: 5 },
            { cost: { bois: 40000, metal: 40000, tissu: 20000, 'chitine_renforcee': 150, fragments: 3000 }, production: 3800, constructionTimeHours: 8 },
            { cost: { bois: 90000, metal: 90000, tissu: 45000, 'chitine_renforcee': 300, fragments: 6500 }, production: 7500, constructionTimeHours: 14 },
            { cost: { bois: 200000, metal: 200000, tissu: 100000, 'chitine_renforcee': 600, fragments: 14000 }, production: 15000, constructionTimeHours: 20 },
            { cost: { bois: 450000, metal: 450000, tissu: 225000, 'chitine_renforcee': 1200, fragments: 30000 }, production: 30000, constructionTimeHours: 30 },
        ]
    },
    'mine': {
        nameKey: "fief.mine.name",
        descriptionKey: "fief.mine.description",
        icon: "⛏️", produces: 'metal',
        upgrades: [
            { cost: { bois: 250, tissu: 150, fragments: 15 }, production: 50, constructionTimeHours: 0.03 },
            { cost: { bois: 800, tissu: 400, fragments: 40 }, production: 110, constructionTimeHours: 0.1 },
            { cost: { bois: 2000, tissu: 1000, fragments: 100 }, production: 220, constructionTimeHours: 0.3 },
            { cost: { bois: 4500, tissu: 2200, 'coeur_de_golem': 2, fragments: 250 }, production: 450, constructionTimeHours: 1 },
            { cost: { bois: 7000, metal: 3500, tissu: 7000, 'coeur_de_golem': 5, fragments: 750 }, production: 900, constructionTimeHours: 2.5 },
            { cost: { bois: 15000, metal: 7500, tissu: 15000, 'coeur_de_golem': 12, fragments: 1500 }, production: 1800, constructionTimeHours: 5 },
            { cost: { bois: 40000, metal: 20000, tissu: 40000, 'coeur_de_golem': 25, fragments: 3000 }, production: 3800, constructionTimeHours: 8 },
            { cost: { bois: 90000, metal: 45000, tissu: 90000, 'coeur_de_golem': 50, fragments: 6500 }, production: 7500, constructionTimeHours: 14 },
            { cost: { bois: 200000, metal: 100000, tissu: 200000, 'coeur_de_golem': 100, fragments: 14000 }, production: 15000, constructionTimeHours: 20 },
            { cost: { bois: 450000, metal: 225000, tissu: 450000, 'coeur_de_golem': 200, fragments: 30000 }, production: 30000, constructionTimeHours: 30 },
        ]
    },
    'atelier_tissage': {
        nameKey: "fief.atelier_tissage.name",
        descriptionKey: "fief.atelier_tissage.description",
        icon: "🧵", produces: 'tissu',
        upgrades: [
            { cost: { bois: 200, metal: 200, fragments: 15 }, production: 50, constructionTimeHours: 0.03 },
            { cost: { bois: 600, metal: 600, fragments: 40 }, production: 110, constructionTimeHours: 0.1 },
            { cost: { bois: 1500, metal: 1500, fragments: 100 }, production: 220, constructionTimeHours: 0.3 },
            { cost: { bois: 3500, metal: 3500, 'essence_spectrale': 15, fragments: 250 }, production: 450, constructionTimeHours: 1 },
            { cost: { bois: 8000, metal: 8000, 'essence_spectrale': 30, fragments: 750 }, production: 900, constructionTimeHours: 2.5 },
            { cost: { bois: 18000, metal: 18000, 'essence_spectrale': 60, fragments: 1500 }, production: 1800, constructionTimeHours: 5 },
            { cost: { bois: 45000, metal: 45000, 'essence_spectrale': 150, fragments: 3000 }, production: 3800, constructionTimeHours: 8 },
            { cost: { bois: 100000, metal: 100000, 'essence_spectrale': 300, fragments: 6500 }, production: 7500, constructionTimeHours: 14 },
            { cost: { bois: 220000, metal: 220000, 'essence_spectrale': 600, fragments: 14000 }, production: 15000, constructionTimeHours: 20 },
            { cost: { bois: 500000, metal: 500000, 'essence_spectrale': 1200, fragments: 30000 }, production: 30000, constructionTimeHours: 30 },
        ]
    },
    'tresorerie': {
        nameKey: "fief.tresorerie.name",
        descriptionKey: "fief.tresorerie.description",
        icon: "💠", produces: 'fragments',
        upgrades: [
            { cost: { bois: 7500, metal: 7500, tissu: 7500 }, production: 1, constructionTimeHours: 0.75 },
            { cost: { fragments: 800, 'essence_spectrale': 10 }, production: 3, constructionTimeHours: 1.5 },
            { cost: { fragments: 1800, 'oeil_de_chimere': 2 }, production: 7, constructionTimeHours: 3 },
            { cost: { fragments: 4000, "larme_d_archange": 3 }, production: 15, constructionTimeHours: 6 },
            { cost: { fragments: 9000, 'poussiere_de_vide': 2 }, production: 32, constructionTimeHours: 10 },
            { cost: { fragments: 20000, 'poussiere_de_vide': 5 }, production: 65, constructionTimeHours: 14 },
            { cost: { fragments: 45000, 'poussiere_de_vide': 12 }, production: 135, constructionTimeHours: 18 },
            { cost: { fragments: 100000, 'poussiere_de_vide': 25 }, production: 270, constructionTimeHours: 24 },
            { cost: { fragments: 220000, 'poussiere_de_vide': 50 }, production: 550, constructionTimeHours: 32 },
            { cost: { fragments: 500000, 'poussiere_de_vide': 100 }, production: 1100, constructionTimeHours: 48 },
        ]
    },
    'entrepot': {
        nameKey: "fief.entrepot.name",
        descriptionKey: "fief.entrepot.description",
        icon: "📦", isUtility: true,
        upgrades: [
            { cost: { bois: 1500, metal: 1500, fragments: 75 }, capacity: 25000, constructionTimeHours: 0.15 },
            { cost: { bois: 4000, metal: 4000, fragments: 150 }, capacity: 50000, constructionTimeHours: 0.3 },
            { cost: { bois: 9000, metal: 9000, fragments: 300 }, capacity: 90000, constructionTimeHours: 0.6 },
            { cost: { bois: 20000, metal: 20000, fragments: 700 }, capacity: 150000, constructionTimeHours: 1.2 },
            { cost: { bois: 45000, metal: 45000, 'chitine_renforcee': 10, fragments: 1500 }, capacity: 250000, constructionTimeHours: 2.5 },
            { cost: { bois: 100000, metal: 100000, 'coeur_de_golem': 5, fragments: 3000 }, capacity: 400000, constructionTimeHours: 5 },
            { cost: { bois: 220000, metal: 220000, 'essence_spectrale': 20, fragments: 6000 }, capacity: 600000, constructionTimeHours: 8 },
            { cost: { bois: 450000, metal: 450000, 'oeil_de_chimere': 10, fragments: 12000 }, capacity: 850000, constructionTimeHours: 12 },
            { cost: { bois: 900000, metal: 900000, "larme_d_archange": 10, fragments: 25000 }, capacity: 1200000, constructionTimeHours: 18 },
            { cost: { bois: 1800000, metal: 1800000, 'poussiere_de_vide': 5, fragments: 50000 }, capacity: 1500000, constructionTimeHours: 28 },
        ]
    },
    'infirmerie': {
        nameKey: "fief.infirmerie.name",
        descriptionKey: "fief.infirmerie.description",
        icon: "⚕️", isUtility: true,
        upgrades: [
            { cost: { bois: 7500, tissu: 5000, 'herbes_medicinales': 20, fragments: 150 }, reduction: 10, production_rate_hours: 24, production_amount: 1, constructionTimeHours: 1 },
            { cost: { bois: 15000, tissu: 10000, 'essence_spectrale': 5, fragments: 400 }, reduction: 20, production_rate_hours: 12, production_amount: 1, constructionTimeHours: 2 },
            { cost: { metal: 25000, tissu: 15000, 'sang_de_basilic': 10, fragments: 800 }, reduction: 30, production_rate_hours: 8, production_amount: 1, constructionTimeHours: 4 },
            { cost: { metal: 50000, tissu: 25000, "larme_d_archange": 5, fragments: 1500 }, reduction: 40, production_rate_hours: 8, production_amount: 2, constructionTimeHours: 8 },
            { cost: { bois: 100000, metal: 100000, "larme_d_archange": 15, fragments: 3000 }, reduction: 50, production_rate_hours: 6, production_amount: 2, constructionTimeHours: 12 }
        ]
    },
    'refectoire': {
        nameKey: "fief.refectoire.name",
        descriptionKey: "fief.refectoire.description",
        icon: "🍖",
        isUtility: true,
        upgrades: [
            { cost: { fragments: 100, eclats_instables: 50 }, bonus: { type: 'max_energy', value: 20 }, constructionTimeHours: 0.5 },
            { cost: { fragments: 1000, eclats_instables: 500 }, bonus: { type: 'max_energy', value: 20 }, constructionTimeHours: 1 },
            { cost: { fragments: 2500, eclats_instables: 1250 }, bonus: { type: 'max_energy', value: 20 }, constructionTimeHours: 2 },
            { cost: { fragments: 5000, eclats_instables: 2500 }, bonus: { type: 'max_energy', value: 20 }, constructionTimeHours: 4 },
            { cost: { fragments: 10000, eclats_instables: 5000 }, bonus: { type: 'max_energy', value: 20 }, constructionTimeHours: 6 },
            { cost: { fragments: 20000, eclats_instables: 10000 }, bonus: { type: 'max_energy', value: 30 }, constructionTimeHours: 8 },
            { cost: { fragments: 40000, eclats_instables: 20000 }, bonus: { type: 'max_energy', value: 30 }, constructionTimeHours: 12 },
            { cost: { fragments: 80000, eclats_instables: 40000 }, bonus: { type: 'max_energy', value: 30 }, constructionTimeHours: 18 },
            { cost: { fragments: 160000, eclats_instables: 80000 }, bonus: { type: 'max_energy', value: 30 }, constructionTimeHours: 24 },
            { cost: { fragments: 320000, eclats_instables: 160000 }, bonus: { type: 'max_energy', value: 40 }, constructionTimeHours: 36 },
        ]
    },
};

const SEASONS_DB = {
    PRINTEMPS: {
        nameKey: "seasons.PRINTEMPS.name",
        icon: 'assets/sprites/garden/seasons/spring.png',
        bonus_types: ['Fleur', 'Herbe'],
        malus_types: ['Givre']
    },
    ETE: {
        nameKey: "seasons.ETE.name",
        icon: 'assets/sprites/garden/seasons/summer.png',
        bonus_types: ['Feu', 'Solaire'],
        malus_types: ['Givre', 'Ombre']
    },
    AUTOMNE: {
        nameKey: "seasons.AUTOMNE.name",
        icon: 'assets/sprites/garden/seasons/autumn.png',
        bonus_types: ['Racine', 'Champignon'],
        malus_types: ['Feu']
    },
    HIVER: {
        nameKey: "seasons.HIVER.name",
        icon: 'assets/sprites/garden/seasons/winter.png',
        bonus_types: ['Givre', 'Ombre'],
        malus_types: ['Solaire', 'Fleur']
    }
};

const GARDEN_PLANTS_DB = {
    'HERBE_ROBUSTE': {
        nameKey: "garden_plants.HERBE_ROBUSTE.name",
        tier: 0, icon: "🌿", type: "Herbe",
        descriptionKey: "garden_plants.HERBE_ROBUSTE.description",
        rarity: "common", growth_time_hours: 1,
        harvest_yield: { resource: 'Herbes Médicinales', amount: 5 },
        sprites: { stage1: 'assets/sprites/garden/plants/herbe_robuste_1.png', stage2: 'assets/sprites/garden/plants/herbe_robuste_2.png', stage3: 'assets/sprites/garden/plants/herbe_robuste_3.png' }
    },
    'CRISTAL_DE_GIVRE': {
        nameKey: "garden_plants.CRISTAL_DE_GIVRE.name",
        tier: 1, icon: "❄️", type: "Givre",
        descriptionKey: "garden_plants.CRISTAL_DE_GIVRE.description",
        rarity: "uncommon", growth_time_hours: 4,
        harvest_yield: { resource: 'Cristal de Givre', amount: 1 },
        sprites: { stage1: 'assets/sprites/garden/plants/cristal_givre_1.png', stage2: 'assets/sprites/garden/plants/cristal_givre_2.png', stage3: 'assets/sprites/garden/plants/cristal_givre_3.png' },
        hintKey: "garden_plants.CRISTAL_DE_GIVRE.hint"
    },
    'FLEUR_DE_LAVE': {
        nameKey: "garden_plants.FLEUR_DE_LAVE.name",
        tier: 1, icon: "🔥", type: "Feu",
        descriptionKey: "garden_plants.FLEUR_DE_LAVE.description",
        rarity: "uncommon", growth_time_hours: 4,
        harvest_yield: { resource: 'Fleur de Lave', amount: 1 },
        infestation_chance: 0.25,
        sprites: { stage1: 'assets/sprites/garden/plants/fleur_lave_1.png', stage2: 'assets/sprites/garden/plants/fleur_lave_2.png', stage3: 'assets/sprites/garden/plants/fleur_lave_3.png' },
        hintKey: "garden_plants.FLEUR_DE_LAVE.hint"
    },
    'GRAINE_SOLAIRE': {
        nameKey: "garden_plants.GRAINE_SOLAIRE.name",
        tier: 1, icon: "☀️", type: "Solaire",
        descriptionKey: "garden_plants.GRAINE_SOLAIRE.description",
        rarity: "common", growth_time_hours: 2,
        harvest_yield: { resource: 'Graine Solaire', amount: 3 },
        sprites: { stage1: 'assets/sprites/garden/plants/graine_solaire_1.png', stage2: 'assets/sprites/garden/plants/graine_solaire_2.png', stage3: 'assets/sprites/garden/plants/graine_solaire_3.png' },
        hintKey: "garden_plants.GRAINE_SOLAIRE.hint"
    },
    'RACINE_TERREUSE': {
        nameKey: "garden_plants.RACINE_TERREUSE.name",
        tier: 1, icon: "🌰", type: "Racine",
        descriptionKey: "garden_plants.RACINE_TERREUSE.description",
        rarity: "uncommon", growth_time_hours: 3,
        harvest_yield: { resource: 'Racine Terreuse', amount: 2 },
        sprites: { stage1: 'assets/sprites/garden/plants/racine_terreuse_1.png', stage2: 'assets/sprites/garden/plants/racine_terreuse_2.png', stage3: 'assets/sprites/garden/plants/racine_terreuse_3.png' },
        hintKey: "garden_plants.RACINE_TERREUSE.hint"
    },
    'TOURNESOL_RADIEUX': {
        nameKey: "garden_plants.TOURNESOL_RADIEUX.name",
        tier: 2, icon: "🌻", type: "Solaire",
        descriptionKey: "garden_plants.TOURNESOL_RADIEUX.description",
        rarity: "rare", growth_time_hours: 6,
        harvest_yield: { resource: 'Tournesol Radieux', amount: 1 },
        sprites: { stage1: 'assets/sprites/garden/plants/tournesol_radieux_1.png', stage2: 'assets/sprites/garden/plants/tournesol_radieux_2.png', stage3: 'assets/sprites/garden/plants/tournesol_radieux_3.png' },
        hintKey: "garden_plants.TOURNESOL_RADIEUX.hint"
    },
    'LYS_DE_GIVRE': {
        nameKey: "garden_plants.LYS_DE_GIVRE.name",
        tier: 2, icon: "💮", type: "Givre",
        descriptionKey: "garden_plants.LYS_DE_GIVRE.description",
        rarity: "rare", growth_time_hours: 8,
        harvest_yield: { resource: 'Lys de Givre', amount: 1 },
        sprites: { stage1: 'assets/sprites/garden/plants/lys_givre_1.png', stage2: 'assets/sprites/garden/plants/lys_givre_2.png', stage3: 'assets/sprites/garden/plants/lys_givre_3.png' },
        hintKey: "garden_plants.LYS_DE_GIVRE.hint"
    },
    'CHAMPIGNON_TERREUX': {
        nameKey: "garden_plants.CHAMPIGNON_TERREUX.name",
        tier: 2, icon: "🍄", type: "Champignon",
        descriptionKey: "garden_plants.CHAMPIGNON_TERREUX.description",
        rarity: "rare", growth_time_hours: 5,
        harvest_yield: { resource: 'Champignon Terreux', amount: 2 },
        sprites: { stage1: 'assets/sprites/garden/plants/champignon_terreux_1.png', stage2: 'assets/sprites/garden/plants/champignon_terreux_2.png', stage3: 'assets/sprites/garden/plants/champignon_terreux_3.png' },
        hintKey: "garden_plants.CHAMPIGNON_TERREUX.hint"
    },
    'FLEUR_DE_ROSEE': {
        nameKey: "garden_plants.FLEUR_DE_ROSEE.name",
        tier: 2, icon: "💧", type: "Fleur",
        descriptionKey: "garden_plants.FLEUR_DE_ROSEE.description",
        rarity: "rare", growth_time_hours: 6,
        harvest_yield: { resource: 'Fleur de Rosée', amount: 2 },
        sprites: { stage1: 'assets/sprites/garden/plants/fleur_rosee_1.png', stage2: 'assets/sprites/garden/plants/fleur_rosee_2.png', stage3: 'assets/sprites/garden/plants/fleur_rosee_3.png' },
        hintKey: "garden_plants.FLEUR_DE_ROSEE.hint"
    },
    'TREFLE_DORE': {
        nameKey: "garden_plants.TREFLE_DORE.name",
        tier: 2, icon: "🍀", type: "Herbe",
        descriptionKey: "garden_plants.TREFLE_DORE.description",
        rarity: "rare", is_support: true, growth_time_hours: 12,
        support_effect: { type: 'mutation_chance', value: 5 },
        sprites: { stage1: 'assets/sprites/garden/plants/trefle_dore_1.png', stage2: 'assets/sprites/garden/plants/trefle_dore_2.png', stage3: 'assets/sprites/garden/plants/trefle_dore_3.png' },
        hintKey: "garden_plants.TREFLE_DORE.hint"
    },
    'RACINE_EPONGE': {
        nameKey: "garden_plants.RACINE_EPONGE.name",
        tier: 2, icon: "🧽", type: "Racine",
        descriptionKey: "garden_plants.RACINE_EPONGE.description",
        rarity: "rare", is_support: true, growth_time_hours: 24,
        support_effect: { type: 'malus_reduction', value: 50 },
        sprites: { stage1: 'assets/sprites/garden/plants/racine_eponge_1.png', stage2: 'assets/sprites/garden/plants/racine_eponge_2.png', stage3: 'assets/sprites/garden/plants/racine_eponge_3.png' },
        hintKey: "garden_plants.RACINE_EPONGE.hint"
    },
    'ROSE_SANGUINE': {
        nameKey: "garden_plants.ROSE_SANGUINE.name",
        tier: 3, icon: "🌹", type: "Fleur",
        descriptionKey: "garden_plants.ROSE_SANGUINE.description",
        rarity: "epic", growth_time_hours: 12,
        harvest_yield: { resource: 'Rose Sanguine', amount: 1 },
        sprites: { stage1: 'assets/sprites/garden/plants/rose_sanguine_1.png', stage2: 'assets/sprites/garden/plants/rose_sanguine_2.png', stage3: 'assets/sprites/garden/plants/rose_sanguine_3.png' },
        hintKey: "garden_plants.ROSE_SANGUINE.hint"
    },
    'ORCHIDEE_SILENCIEUSE': {
        nameKey: "garden_plants.ORCHIDEE_SILENCIEUSE.name",
        tier: 3, icon: "🌸", type: "Fleur",
        descriptionKey: "garden_plants.ORCHIDEE_SILENCIEUSE.description",
        rarity: "epic", is_support: true, growth_time_hours: 48,
        support_effect: { type: 'prevent_fauna_events' },
        sprites: { stage1: 'assets/sprites/garden/plants/orchidee_silencieuse_1.png', stage2: 'assets/sprites/garden/plants/orchidee_silencieuse_2.png', stage3: 'assets/sprites/garden/plants/orchidee_silencieuse_3.png' },
        hintKey: "garden_plants.ORCHIDEE_SILENCIEUSE.hint"
    }
};
const MUTATION_RECIPES_DB = [
    // --- Mutations de Base (Tier 1) ---
    { nameKey: "mutations.frost_transmutation.name", season: 'HIVER', trigger_plant_id: 'HERBE_ROBUSTE', required_neighbors: [{ id: 'HERBE_ROBUSTE' }], target_to_transform: 'HERBE_ROBUSTE', result_plant_id: 'CRISTAL_DE_GIVRE', chance: 0.10 },
    { nameKey: "mutations.fire_transmutation.name", season: 'ETE', trigger_plant_id: 'HERBE_ROBUSTE', required_neighbors: [{ id: 'HERBE_ROBUSTE' }], target_to_transform: 'HERBE_ROBUSTE', result_plant_id: 'FLEUR_DE_LAVE', chance: 0.10 },
    { nameKey: "mutations.solar_transmutation.name", season: 'PRINTEMPS', trigger_plant_id: 'HERBE_ROBUSTE', required_neighbors: [{ id: 'HERBE_ROBUSTE' }], target_to_transform: 'HERBE_ROBUSTE', result_plant_id: 'GRAINE_SOLAIRE', chance: 0.10 },
    { nameKey: "mutations.earthy_transmutation.name", season: 'AUTOMNE', trigger_plant_id: 'HERBE_ROBUSTE', required_neighbors: [{ id: 'HERBE_ROBUSTE' }], target_to_transform: 'HERBE_ROBUSTE', result_plant_id: 'RACINE_TERREUSE', chance: 0.10 },

    // --- Mutations Avancées (Tier 2) ---
    { nameKey: "mutations.winter_lily.name", season: 'HIVER', trigger_plant_id: 'CRISTAL_DE_GIVRE', required_neighbors: [{ id: 'FLEUR_DE_ROSEE' }], target_to_transform: 'CRISTAL_DE_GIVRE', result_plant_id: 'LYS_DE_GIVRE', chance: 0.15 },
    { nameKey: "mutations.summer_sunflower.name", season: 'ETE', trigger_plant_id: 'GRAINE_SOLAIRE', required_neighbors: [{ id: 'FLEUR_DE_LAVE' }], target_to_transform: 'GRAINE_SOLAIRE', result_plant_id: 'TOURNESOL_RADIEUX', chance: 0.15 },
    { nameKey: "mutations.spring_dew_flower.name", season: 'PRINTEMPS', trigger_plant_id: 'GRAINE_SOLAIRE', required_neighbors: [{ id: 'HERBE_ROBUSTE' }], target_to_transform: 'GRAINE_SOLAIRE', result_plant_id: 'FLEUR_DE_ROSEE', chance: 0.15 },
    { nameKey: "mutations.autumn_earthy_mushroom.name", season: 'AUTOMNE', trigger_plant_id: 'RACINE_TERREUSE', required_neighbors: [{ id: 'FLEUR_DE_LAVE' }], target_to_transform: 'RACINE_TERREUSE', result_plant_id: 'CHAMPIGNON_TERREUX', chance: 0.15 },

    // NOUVEAU : Recettes pour les plantes de soutien
    { nameKey: "mutations.golden_clover.name", season: 'PRINTEMPS', trigger_plant_id: 'GRAINE_SOLAIRE', required_neighbors: [{ id: 'FLEUR_DE_ROSEE' }], target_to_transform: 'GRAINE_SOLAIRE', result_plant_id: 'TREFLE_DORE', chance: 0.05 }, // Rare
    { nameKey: "mutations.sponge_root.name", season: 'AUTOMNE', trigger_plant_id: 'RACINE_TERREUSE', required_neighbors: [{ id: 'CHAMPIGNON_TERREUX' }], target_to_transform: 'RACINE_TERREUSE', result_plant_id: 'RACINE_EPONGE', chance: 0.05 }, // Rare

    // --- Mutations de Tier 3 ---
    { nameKey: "mutations.blood_rose.name", season: 'PRINTEMPS', trigger_plant_id: 'FLEUR_DE_ROSEE', required_neighbors: [{ id: 'FLEUR_DE_LAVE' }, { id: 'HERBE_ROBUSTE' }], target_to_transform: 'FLEUR_DE_ROSEE', result_plant_id: 'ROSE_SANGUINE', chance: 0.10 },
    // NOUVEAU : Recette pour la plante de soutien épique
    { nameKey: "mutations.silent_orchid.name", season: 'HIVER', trigger_plant_id: 'LYS_DE_GIVRE', required_neighbors: [{ id: 'TREFLE_DORE' }], target_to_transform: 'LYS_DE_GIVRE', result_plant_id: 'ORCHIDEE_SILENCIEUSE', chance: 0.03 } // Très rare
];

const ADVENTURE_DB = {
    // === ACTE I : L'ÉCLAT DE LA DISSONANCE ===
    'A1_N1_INTRO': {
        id: 'A1_N1_INTRO',
        nameKey: "adventure.nodes.A1_N1_INTRO.name",
        icon: "🏡",
        dependencies: [],
        position: { x: 40, y: 95 },
        act: 1,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_N1_S1" },
            { type: 'player_choice', choicesKey: "A1_N1_S1_CHOICE" },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', isResponse: true, baseKey: "adventure.dialogue.A1_N1_S2" },
            { type: 'tutorial_combat',
                tutorialDialogue: [
                    { character: 'elian', textKey: 'adventure.dialogue.A1_N1_TUTO1', trigger: 'on_start' },
                    { character: 'elian', textKey: 'adventure.dialogue.A1_N1_TUTO3', trigger: 'after_player_attack' },
                    { character: 'elian', textKey: 'adventure.dialogue.A1_N1_TUTO4', trigger: 'after_enemy_attack' }
                ]
            },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_N1_S3" }
        ]
    },
    // Branche tutoriel pour les expéditions (optionnelle)
    'A1_TUTO_EXPEDITION_1': {
        id: 'A1_TUTO_EXPEDITION_1',
        nameKey: "adventure.nodes.A1_TUTO_EXPEDITION_1.name",
        icon: "🎓",
        isTutorial: true,
        dependencies: ['A1_N1_INTRO'],
        position: { x: 75, y: 95 },
        act: 1,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_TUTO_EXPEDITION_1_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_TUTO_EXPEDITION_1_S2" },
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A1_TUTO_EXPEDITION_1_S3" },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_TUTO_EXPEDITION_1_S4" }
        ]
    },
    'A1_TUTO_EXPEDITION_2': {
        id: 'A1_TUTO_EXPEDITION_2',
        nameKey: "adventure.nodes.A1_TUTO_EXPEDITION_2.name",
        icon: "🎓",
        isTutorial: true,
        isGate: true,
        dependencies: ['A1_TUTO_EXPEDITION_1'],
        position: { x: 80, y: 80 },
        act: 1,
        steps: [
            { type: 'gate', textKey: "adventure.prerequisites.A1_TUTO_EXPEDITION_2", condition: { type: 'EXPEDITION_COMPLETED', count: 1 } },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_TUTO_EXPEDITION_2_S1" },
            { type: 'reward', rewards: [{ type: 'resource', kind: 'bois', amount: 100 }, { type: 'xp', amount: 100 }] }
        ]
    },
    'A1_N2_LOUPS': {
        id: 'A1_N2_LOUPS',
        nameKey: "adventure.nodes.A1_N2_LOUPS.name",
        icon: "🐺",
        // CORRIGÉ : La quête principale continue directement
        dependencies: ['A1_N1_INTRO'],
        position: { x: 40, y: 85 },
        act: 1,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A1_N2_S1" },
            { type: 'combat', enemies: ['loup_dissonant', 'loup_dissonant'] },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_N2_S2" },
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A1_N2_S3" }
        ]
    },
    'A1_N3_FORGERON': {
        id: 'A1_N3_FORGERON',
        nameKey: "adventure.nodes.A1_N3_FORGERON.name",
        icon: "🔨",
        dependencies: ['A1_N2_LOUPS'],
        position: { x: 60, y: 75 },
        act: 1,
        unlocks: { village: true },
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A1_N3_S0" },
            { type: 'combat', enemies: ['GOBELIN_FRONDEUR', 'CHEF_GOBELIN', 'GOBELIN_FRONDEUR'] },
            { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', textKey: "adventure.dialogue.A1_N3_S1" },
            { type: 'player_choice', choicesKey: "A1_N3_S1_CHOICE" },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_N3_S2" },
            { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', textKey: "adventure.dialogue.A1_N3_S3" }
        ]
    },
'A1_N4_PORTE_FORGE': {
    id: 'A1_N4_PORTE_FORGE',
    nameKey: "adventure.nodes.A1_N4_PORTE_FORGE.name",
    icon: "🔥",
    dependencies: ['A1_N3_FORGERON'],
    position: { x: 50, y: 65 },
    act: 1,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', textKey: "adventure.dialogue.A1_N4_S1" },
        // CORRECTION : Le type 'prerequisite' a été remplacé par 'gate' pour correspondre à la logique existante.
        { type: 'gate', textKey: "adventure.prerequisites.A1_N4", condition: { type: 'BUILDING_LEVEL', building: 'forge', level: 1 } },
        { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', textKey: "adventure.dialogue.A1_N4_S2" }
    ]
},
    // Branche tutoriel pour la forge (optionnelle)
    'A1_TUTO_FORGE_1': {
        id: 'A1_TUTO_FORGE_1',
        nameKey: "adventure.nodes.A1_TUTO_FORGE_1.name",
        icon: "🎓",
        isTutorial: true,
        dependencies: ['A1_N4_PORTE_FORGE'],
        position: { x: 25, y: 60 },
        act: 1,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', textKey: "adventure.dialogue.A1_TUTO_FORGE_1_S1" },
            { type: 'player_choice', choicesKey: "A1_TUTO_FORGE_1_CHOICE" },
            { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', isResponse: true, baseKey: "adventure.dialogue.A1_TUTO_FORGE_1_S3" },
            { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', textKey: "adventure.dialogue.A1_TUTO_FORGE_1_S4" }
        ]
    },
    'A1_TUTO_FORGE_2': {
        id: 'A1_TUTO_FORGE_2',
        nameKey: "adventure.nodes.A1_TUTO_FORGE_2.name",
        icon: "🎓",
        isTutorial: true,
        isGate: true,
        dependencies: ['A1_TUTO_FORGE_1'],
        position: { x: 20, y: 50 },
        act: 1,
        steps: [
            { type: 'gate', textKey: "adventure.prerequisites.A1_TUTO_FORGE_2", condition: { type: 'CRAFT_ITEM', count: 1 } },
            { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', textKey: "adventure.dialogue.A1_TUTO_FORGE_2_S1" },
            { type: 'reward', rewards: [{ type: 'resource', kind: 'fragments', amount: 20 }, { type: 'xp', amount: 150 }] }
        ]
    },
    'A1_N5_HEROIC_ACT': {
        id: 'A1_N5_HEROIC_ACT',
        nameKey: "adventure.nodes.A1_N5_HEROIC_ACT.name",
        icon: "🌟",
        // CORRIGÉ : La quête principale continue directement
        dependencies: ['A1_N4_PORTE_FORGE'],
        position: { x: 45, y: 55 },
        act: 1,
        unlocks: { fief: true },
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', textKey: "adventure.dialogue.A1_N5_S1" },
            { type: 'combat', enemies: ['MINI_GOLEM_PIERRE', 'MINI_GOLEM_PIERRE'] },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_N5_S2" },
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A1_N5_S3" }
        ]
    },
    // Branche tutoriel pour le Fief (optionnelle)
    'A1_TUTO_FIEF_1': {
        id: 'A1_TUTO_FIEF_1',
        nameKey: "adventure.nodes.A1_TUTO_FIEF_1.name",
        icon: "🎓",
        isTutorial: true,
        dependencies: ['A1_N5_HEROIC_ACT'],
        position: { x: 70, y: 55 },
        act: 1,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_TUTO_FIEF_1_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_TUTO_FIEF_1_S2" },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_TUTO_FIEF_1_S3" }
        ]
    },
    'A1_TUTO_FIEF_2': {
        id: 'A1_TUTO_FIEF_2',
        nameKey: "adventure.nodes.A1_TUTO_FIEF_2.name",
        icon: "🎓",
        isTutorial: true,
        isGate: true,
        dependencies: ['A1_TUTO_FIEF_1'],
        position: { x: 85, y: 40 },
        act: 1,
        steps: [
            { type: 'gate', textKey: "adventure.prerequisites.A1_TUTO_FIEF_2", condition: { type: 'BUILDING_LEVEL', building: 'scierie', level: 1 } },
            { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A1_TUTO_FIEF_2_S1" },
            { type: 'reward', rewards: [{ type: 'resource', kind: 'metal', amount: 200 }, { type: 'xp', amount: 200 }] }
        ]
    },
    'A1_N6_MINE': {
        id: 'A1_N6_MINE',
        nameKey: "adventure.nodes.A1_N6_MINE.name",
        icon: "⛏️",
        // CORRIGÉ : La quête principale continue directement
        dependencies: ['A1_N5_HEROIC_ACT'],
        position: { x: 60, y: 45 },
        act: 1,
        steps: [
             { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', textKey: "adventure.dialogue.A1_N6_S1" },
             { type: 'combat', enemies: ['GARDIEN_ERODE'] },
             { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A1_N6_S2" }
        ]
    },
    'A1_N7_FRAGMENT': {
        id: 'A1_N7_FRAGMENT',
        nameKey: "adventure.nodes.A1_N7_FRAGMENT.name",
        icon: "💎",
        dependencies: ['A1_N6_MINE'],
        position: { x: 55, y: 35 },
        act: 1,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A1_N7_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A1_N7_S2" },
            { type: 'player_choice', choicesKey: "A1_N7_S2_CHOICE" },
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', isResponse: true, baseKey: "adventure.dialogue.A1_N7_S3" }
        ]
    },
    'A1_N8_ALCHIMISTE': {
        id: 'A1_N8_ALCHIMISTE',
        nameKey: "adventure.nodes.A1_N8_ALCHIMISTE.name",
        icon: "🧪",
        dependencies: ['A1_N7_FRAGMENT'],
        position: { x: 45, y: 25 },
        act: 1,
        unlocks: { alchemist: true },
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A1_N8_S1" },
            { type: 'player_choice', choicesKey: "A1_N8_S1_CHOICE" },
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A1_N8_S2" },
            { type: 'combat', enemies: ['ELEMENTAIRE_EAU','OTYUGH', 'ARAIGNEE_GEANTE'] },
            { type: 'dialogue', characterKey: "adventure.characters.alaric", portrait: 'assets/sprites/portraits/alaric.png', textKey: "adventure.dialogue.A1_N8_S3" }
        ]
    },
    // Branche tutoriel pour l'Alchimie (optionnelle)
    'A1_TUTO_ALCHIMIE_1': {
        id: 'A1_TUTO_ALCHIMIE_1',
        nameKey: "adventure.nodes.A1_TUTO_ALCHIMIE_1.name",
        icon: "🎓",
        isTutorial: true,
        dependencies: ['A1_N8_ALCHIMISTE'],
        position: { x: 20, y: 25 },
        act: 1,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.alaric", portrait: 'assets/sprites/portraits/alaric.png', textKey: "adventure.dialogue.A1_TUTO_ALCHIMIE_1_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.alaric", portrait: 'assets/sprites/portraits/alaric.png', textKey: "adventure.dialogue.A1_TUTO_ALCHIMIE_1_S2" },
            { type: 'dialogue', characterKey: "adventure.characters.alaric", portrait: 'assets/sprites/portraits/alaric.png', textKey: "adventure.dialogue.A1_TUTO_ALCHIMIE_1_S3" }
        ]
    },
    'A1_TUTO_ALCHIMIE_2': {
        id: 'A1_TUTO_ALCHIMIE_2',
        nameKey: "adventure.nodes.A1_TUTO_ALCHIMIE_2.name",
        icon: "🎓",
        isTutorial: true,
        isGate: true,
        dependencies: ['A1_TUTO_ALCHIMIE_1'],
        position: { x: 15, y: 10 },
        act: 1,
        steps: [
            { type: 'gate', textKey: "adventure.prerequisites.A1_TUTO_ALCHIMIE_2", condition: { type: 'CRAFT_CONSUMABLE', id: 'POTION_SOIN_MINEURE', count: 1 } },
            { type: 'dialogue', characterKey: "adventure.characters.alaric", portrait: 'assets/sprites/portraits/alaric.png', textKey: "adventure.dialogue.A1_TUTO_ALCHIMIE_2_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.alaric", portrait: 'assets/sprites/portraits/alaric.png', textKey: "adventure.dialogue.A1_TUTO_ALCHIMIE_2_S2" },
            { type: 'reward', rewards: [{ type: 'resource', kind: 'Herbes Médicinales', amount: 20 }, { type: 'xp', amount: 250 }] }
        ]
    },
    'A1_N9_SANCTUAIRE': {
        id: 'A1_N9_SANCTUAIRE',
        nameKey: "adventure.nodes.A1_N9_SANCTUAIRE.name",
        icon: "🏛️",
        dependencies: ['A1_N8_ALCHIMISTE'],
        position: { x: 60, y: 15 },
        act: 1,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A1_N9_S1" },
            // Je modifie la structure du puzzle pour qu'elle soit plus flexible.
            { 
                type: 'puzzle', 
                textKey: "adventure.puzzles.A1_N9_P1", 
                answerKey: "adventure.answers.puzzleA1_N9", // Utilise une clé pour la réponse
                hintKey: "adventure.puzzles.A1_N9_HINT",     // Ajoute une clé pour l'indice
                choicesKey: "A1_N9_PUZZLE_CHOICE" 
            },
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A1_N9_S2" },
            { type: 'combat', enemies: ['SPECTRE_GEMISSANT', 'SQUELETTE_GUERRIER'] },
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A1_N9_S3" },
            { type: 'combat', enemies: ['NECROMANCIEN_APPRENTI', 'SQUELETTE_GUERRIER', 'SQUELETTE_GUERRIER'] }
        ]
    },
    'A1_N10_LARRY': {
        id: 'A1_N10_LARRY',
        nameKey: "adventure.nodes.A1_N10_LARRY.name",
        icon: "🎭",
        dependencies: ['A1_N9_SANCTUAIRE'],
        position: { x: 50, y: 5 },
        act: 1,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.larry", portrait: 'assets/sprites/portraits/larry.png', textKey: "adventure.dialogue.A1_N10_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.larry", portrait: 'assets/sprites/portraits/larry.png', textKey: "adventure.dialogue.A1_N10_S2" },
            { type: 'player_choice', choicesKey: "A1_N10_S2_CHOICE" },
            { type: 'dialogue', characterKey: "adventure.characters.larry", portrait: 'assets/sprites/portraits/larry.png', isResponse: true, baseKey: "adventure.dialogue.A1_N10_S3" },
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A1_N10_S4" }
        ]
    },
    // === ACTE II : LES FILS DU MARIONNETTISTE ===
    'A2_N1_PONT_LA_CROISEE': {
        id: 'A2_N1_PONT_LA_CROISEE',
        nameKey: "adventure.nodes.A2_N1_PONT_LA_CROISEE.name",
        icon: "🏙️",
        dependencies: ['A1_N10_LARRY'],
        position: { x: 40, y: 10 }, // CORRIGÉ : y positif, en haut de la carte
        act: 2,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A2_N1_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.gaston", portrait: 'assets/sprites/portraits/gaston.png', textKey: "adventure.dialogue.A2_N1_S2" },
            { type: 'gate', textKey: "adventure.prerequisites.A2_N1", condition: { type: 'RESOURCE', resource: "bois", amount: 1500 } }, // Type de condition clarifié
            { type: 'dialogue', characterKey: "adventure.characters.gaston", portrait: 'assets/sprites/portraits/gaston.png', textKey: "adventure.dialogue.A2_N1_S3" },
            { type: 'unlock', feature: 'cook' }
        ]
    },
    'A2_N2_RENOMMEE': {
        id: 'A2_N2_RENOMMEE',
        nameKey: "adventure.nodes.A2_N2_RENOMMEE.name",
        icon: "📜",
        dependencies: ['A2_N1_PONT_LA_CROISEE'],
        position: { x: 60, y: 20 }, // CORRIGÉ
        act: 2,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A2_N2_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.garde", portrait: 'assets/sprites/portraits/garde.png', textKey: "adventure.dialogue.A2_N2_S2" },
            { type: 'unlock', feature: 'bounties' }
        ]
    },
    'A2_N3_GATE_CHASSEUR': {
        id: 'A2_N3_GATE_CHASSEUR',
        nameKey: "adventure.nodes.A2_N3_GATE_CHASSEUR.name",
        icon: "🎯",
        isGate: true,
        dependencies: ['A2_N2_RENOMMEE'],
        position: { x: 50, y: 35 }, // CORRIGÉ
        act: 2,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A2_N3_S1" },
            { type: 'gate', textKey: "adventure.prerequisites.A2_N3", condition: { type: 'BOUNTY_COMPLETED', difficulty: 'Moyen', count: 1 } },
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A2_N3_S2" }
        ]
    },
    'A2_N4_MAITRESSE_CHASSEUSE': {
        id: 'A2_N4_MAITRESSE_CHASSEUSE',
        nameKey: "adventure.nodes.A2_N4_MAITRESSE_CHASSEUSE.name",
        icon: "🏹",
        dependencies: ['A2_N3_GATE_CHASSEUR'],
        position: { x: 45, y: 48 }, // CORRIGÉ
        act: 2,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.maitresse_chasseuse", portrait: 'assets/sprites/portraits/chasseuse.png', textKey: "adventure.dialogue.A2_N4_S1" },
            { type: 'gate', textKey: "adventure.prerequisites.A2_N4_ITEM", condition: { type: 'ITEM_HELD', itemId: 'coeur_de_golem', count: 1 } }, // Condition plus claire
            { type: 'dialogue', characterKey: "adventure.characters.maitresse_chasseuse", portrait: 'assets/sprites/portraits/chasseuse.png', textKey: "adventure.dialogue.A2_N4_S2" },
            { type: 'unlock', feature: 'bounty_master' }
        ]
    },
    'A2_N5_GATE_FORGE': {
        id: 'A2_N5_GATE_FORGE',
        nameKey: "adventure.nodes.A2_N5_GATE_FORGE.name",
        icon: "🔥",
        isGate: true,
        dependencies: ['A2_N4_MAITRESSE_CHASSEUSE'],
        position: { x: 60, y: 60 },
        act: 2,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A2_N5_S1" },
            { type: 'gate', textKey: "adventure.prerequisites.A2_N5", condition: { type: 'BUILDING_LEVEL', building: 'forge', level: 3 } },
            // ▼▼▼ ÉTAPE AJOUTÉE ▼▼▼
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A2_N5_S2" }
        ]
    },
    'A2_N6_TOUR_DE_SILAS': {
        id: 'A2_N6_TOUR_DE_SILAS',
        nameKey: "adventure.nodes.A2_N6_TOUR_DE_SILAS.name",
        icon: "✨",
        dependencies: ['A2_N5_GATE_FORGE'],
        position: { x: 50, y: 72 }, // CORRIGÉ
        act: 2,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.silas", portrait: 'assets/sprites/portraits/silas.png', textKey: "adventure.dialogue.A2_N6_S1" },
            { type: 'player_choice', choicesKey: "A2_N6_S1_CHOICE" }, // Type corrigé pour la cohérence
            { type: 'dialogue', characterKey: "adventure.characters.silas", portrait: 'assets/sprites/portraits/silas.png', isResponse: true, baseKey: "adventure.dialogue.A2_N6_S2" },
            { type: 'unlock', feature: 'enchanter' }
        ]
    },
    'A2_N7_LABO_LARRY': {
        id: 'A2_N7_LABO_LARRY',
        nameKey: "adventure.nodes.A2_N7_LABO_LARRY.name",
        icon: "🎭",
        dependencies: ['A2_N6_TOUR_DE_SILAS'],
        position: { x: 40, y: 85 },
        act: 2,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A2_N7_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.larry", portrait: 'assets/sprites/portraits/larry.png', textKey: "adventure.dialogue.A2_N7_S2" },
            { 
                type: 'survival_combat', 
                enemies: ['larry_invincible'], 
                turns: 5, 
                dialogue: {
                    start: "adventure.dialogue.A2_N7_COMBAT_START",
                    mid: [
                        // J'ajoute la clé du personnage qui parle ici
                        { turn: 4, characterKey: "adventure.characters.larry", textKey: "adventure.dialogue.A2_N7_COMBAT_MID" }
                    ],
                    end: "adventure.dialogue.A2_N7_COMBAT_END"
                } 
            }
        ]
    },
    'A2_N8_BOSS': {
        id: 'A2_N8_BOSS',
        nameKey: "adventure.nodes.A2_N8_BOSS.name",
        icon: "💀",
        dependencies: ['A2_N7_LABO_LARRY'],
        position: { x: 55, y: 95 }, // CORRIGÉ
        act: 2,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.larry", portrait: 'assets/sprites/portraits/larry.png', textKey: "adventure.dialogue.A2_N8_S1" },
            { type: 'combat', enemies: ['CHIMERE_RENFORCEE'], isStoryBoss: true },
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A2_N8_S2" }
        ]
    },
    'A2_N9_REVELATION_ASCENSION': {
        id: 'A2_N9_REVELATION_ASCENSION',
        nameKey: "adventure.nodes.A2_N9_REVELATION_ASCENSION.name",
        icon: "⭐",
        dependencies: ['A2_N8_BOSS'],
        position: { x: 50, y: 95 }, // CORRIGÉ : Un peu plus bas pour terminer
        act: 2,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A2_N9_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A2_N9_S2" },
            { type: 'unlock', feature: 'ascension_available' }
        ]
    },
    // === ACTE III : L'AUBE DE LA TRANSCENDANCE (Version Étendue) ===
    'A3_N1_RITUEL': {
        id: 'A3_N1_RITUEL',
        nameKey: "adventure.nodes.A3_N1_RITUEL.name",
        icon: "⭐",
        dependencies: ['A2_N9_REVELATION_ASCENSION'],
        position: { x: 50, y: 85 },
        act: 3,
        steps: [
            // Porte qui vérifie le niveau d'Ascension
            { type: 'gate', textKey: "adventure.prerequisites.A3_N1_ASCENSION", condition: { type: 'ASCENSION_LEVEL', level: 1 } },
            // Dialogues sur les constellations (précédemment dans A3_N2)
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N2_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N2_S2" }
        ]
    },
    'A3_N3_ETINCELLE': {
        id: 'A3_N3_ETINCELLE',
        nameKey: "adventure.nodes.A3_N3_ETINCELLE.name",
        icon: "⚔️",
        // MODIFIÉ : La dépendance pointe maintenant vers le noeud A3_N1
        dependencies: ['A3_N1_RITUEL'],
        position: { x: 40, y: 75 },
        act: 3,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N3_S1" },
            { type: 'combat', enemies: ['loup_dissonant', 'loup_dissonant', 'loup_dissonant'] },
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A3_N3_S2" }
        ]
    },
    'A3_N4_ARTIFICE': {
        id: 'A3_N4_ARTIFICE',
        nameKey: "adventure.nodes.A3_N4_ARTIFICE.name",
        icon: "🔨",
        dependencies: ['A3_N3_ETINCELLE'],
        position: { x: 60, y: 65 },
        act: 3,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N4_S1" },
            { type: 'gate', textKey: "adventure.prerequisites.A3_N4_FORGE", condition: { type: 'CRAFT_ITEM', rarity: 'rare', count: 1 } },
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N4_S2" }
        ]
    },
    'A3_N5_ENIGME': {
        id: 'A3_N5_ENIGME',
        nameKey: "adventure.nodes.A3_N5_ENIGME.name",
        icon: "❓",
        dependencies: ['A3_N4_ARTIFICE'],
        position: { x: 45, y: 55 },
        act: 3,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N5_S1" },
            // Je modifie le puzzle pour utiliser le nouveau format
            { 
                type: 'puzzle', 
                textKey: "adventure.puzzles.A3_N5_P1", 
                answerKey: "adventure.answers.puzzleA3_N5", 
                hintKey: "adventure.puzzles.A3_N5_HINT" 
            },
            { type: 'combat', enemies: ['ESPRIT_ANCIEN_TOURMENTE'] },
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N5_S2" }
        ]
    },
    'A3_N6_ANALYSE': {
        id: 'A3_N6_ANALYSE',
        nameKey: "adventure.nodes.A3_N6_ANALYSE.name",
        icon: "🔬",
        dependencies: ['A3_N5_ENIGME'],
        position: { x: 55, y: 45 },
        act: 3,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N6_S1" },
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N6_S2" }
        ]
    },
    'A3_N7_HERAUT': {
        id: 'A3_N7_HERAUT',
        nameKey: "adventure.nodes.A3_N7_HERAUT.name",
        icon: "❗",
        dependencies: ['A3_N6_ANALYSE'],
        position: { x: 50, y: 35 },
        act: 3,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.kaelen", portrait: 'assets/sprites/portraits/kaelen.png', textKey: "adventure.dialogue.A3_N7_S1" },
            { type: 'combat', enemies: ['HERAUT_DU_SILENCE'] },
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A3_N7_S2" }
        ]
    },
    'A3_N8_PISTE': {
        id: 'A3_N8_PISTE',
        nameKey: "adventure.nodes.A3_N8_PISTE.name",
        icon: "👣",
        dependencies: ['A3_N7_HERAUT'],
        position: { x: 50, y: 25 },
        act: 3,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N8_S1" }
        ]
    },
    'A3_N9_BOSS': {
        id: 'A3_N9_BOSS',
        nameKey: "adventure.nodes.A3_N9_BOSS.name",
        icon: "💀",
        dependencies: ['A3_N8_PISTE'],
        position: { x: 50, y: 15 },
        act: 3,
        steps: [
            { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A3_N9_S1" },
            { type: 'combat', enemies: ['JUGE_DISSONANT'] },
            { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A3_N9_S2" }
        ]
    },
// DANS ADVENTURE_DB
// === ACTE IV : LE RÉVEIL DU CHAOS ===
'A4_N1_EFFONREMENT': {
    id: 'A4_N1_EFFONREMENT',
    nameKey: "adventure.nodes.A4_N1_EFFONREMENT.name",
    icon: "🌪️",
    dependencies: ['A3_N9_BOSS'], // Dépend du dernier nœud de l'Acte III
    position: { x: 50, y: 95 },
    act: 4,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N1_S1" },
        { type: 'dialogue', characterKey: "adventure.characters.elian", portrait: 'assets/sprites/portraits/elian.png', textKey: "adventure.dialogue.A4_N1_S2" },
        { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A4_N1_S3" }
    ]
},
'A4_N2_FRAGMENTS': {
    id: 'A4_N2_FRAGMENTS',
    nameKey: "adventure.nodes.A4_N2_FRAGMENTS.name",
    icon: "💎",
    dependencies: ['A4_N1_EFFONREMENT'],
    position: { x: 40, y: 85 },
    act: 4,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N2_S1" },
        { type: 'combat', enemies: ['FRAGMENT_DE_DISSONANCE_MINEUR', 'FRAGMENT_DE_DISSONANCE_MINEUR'] },
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N2_S2" }
    ]
},
'A4_N3_SEAU': {
    id: 'A4_N3_SEAU',
    nameKey: "adventure.nodes.A4_N3_SEAU.name",
    icon: "🔒",
    dependencies: ['A4_N2_FRAGMENTS'],
    position: { x: 60, y: 75 },
    act: 4,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N3_S1" },
        { type: 'combat', enemies: ['GARDIEN_VERROUILLE'] },
        { type: 'dialogue', characterKey: "adventure.characters.hero_think", textKey: "adventure.dialogue.A4_N3_S2" },
        { type: 'unlock', feature: 'runes' } // Débloque les runes (nouvelle feature)
    ]
},
'A4_N4_PORTAIL': {
    id: 'A4_N4_PORTAIL',
    nameKey: "adventure.nodes.A4_N4_PORTAIL.name",
    icon: "🌀",
    dependencies: ['A4_N3_SEAU'],
    position: { x: 50, y: 65 },
    act: 4,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N4_S1" },
        { type: 'prerequisite', textKey: "adventure.prerequisites.A4_N4_RUNES", condition: { type: 'EQUIP_RUNE', count: 3 } }, // Prérequis: équiper 3 runes
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N4_S2" }
    ]
},
'A4_N5_INTRUSION': {
    id: 'A4_N5_INTRUSION',
    nameKey: "adventure.nodes.A4_N5_INTRUSION.name",
    icon: "🚨",
    dependencies: ['A4_N4_PORTAIL'],
    position: { x: 40, y: 55 },
    act: 4,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.kormac", portrait: 'assets/sprites/portraits/kormac.png', textKey: "adventure.dialogue.A4_N5_S1" }, // Nouveau personnage Kormac
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N5_S2" },
        { type: 'combat', enemies: ['FRAGMENT_DE_DISSONANCE_MINEUR', 'FRAGMENT_DE_DISSONANCE_MINEUR', 'FRAGMENT_DE_DISSONANCE_MINEUR'] },
        { type: 'dialogue', characterKey: "adventure.characters.kormac", portrait: 'assets/sprites/portraits/kormac.png', textKey: "adventure.dialogue.A4_N5_S3" }
    ]
},
'A4_N6_ANCIEN': {
    id: 'A4_N6_ANCIEN',
    nameKey: "adventure.nodes.A4_N6_ANCIEN.name",
    icon: "🗿",
    dependencies: ['A4_N5_INTRUSION'],
    position: { x: 60, y: 45 },
    act: 4,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N6_S1" },
        { type: 'quest_item_gather', itemId: 'artefact_ancien_harmonique', count: 5 }, // Quête: Collecter 5 objets
        { type: 'dialogue', characterKey: "adventure.characters.kormac", portrait: 'assets/sprites/portraits/kormac.png', textKey: "adventure.dialogue.A4_N6_S2" }
    ]
},
'A4_N7_REFLEXION': {
    id: 'A4_N7_REFLEXION',
    nameKey: "adventure.nodes.A4_N7_REFLEXION.name",
    icon: "🧠",
    dependencies: ['A4_N6_ANCIEN'],
    position: { x: 50, y: 35 },
    act: 4,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N7_S1" },
        { type: 'player_choice', choicesKey: "A4_N7_S1_CHOICE" },
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N7_S2" }
    ]
},
'A4_N8_ARME': {
    id: 'A4_N8_ARME',
    nameKey: "adventure.nodes.A4_N8_ARME.name",
    icon: "🗡️",
    dependencies: ['A4_N7_REFLEXION'],
    position: { x: 40, y: 25 },
    act: 4,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.kormac", portrait: 'assets/sprites/portraits/kormac.png', textKey: "adventure.dialogue.A4_N8_S1" },
        { type: 'combat', enemies: ['ARME_DE_LARRY'] },
        { type: 'dialogue', characterKey: "adventure.characters.kormac", portrait: 'assets/sprites/portraits/kormac.png', textKey: "adventure.dialogue.A4_N8_S2" }
    ]
},
'A4_N9_CONFRONTATION': {
    id: 'A4_N9_CONFRONTATION',
    nameKey: "adventure.nodes.A4_N9_CONFRONTATION.name",
    icon: "🔥",
    dependencies: ['A4_N8_ARME'],
    position: { x: 60, y: 15 },
    act: 4,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N9_S1" },
        { type: 'dialogue', characterKey: "adventure.characters.larry", portrait: 'assets/sprites/portraits/larry.png', textKey: "adventure.dialogue.A4_N9_S2" }
    ]
},
'A4_N10_BOSS': {
    id: 'A4_N10_BOSS',
    nameKey: "adventure.nodes.A4_N10_BOSS.name",
    icon: "☠️",
    dependencies: ['A4_N9_CONFRONTATION'],
    position: { x: 50, y: 5 },
    act: 4,
    steps: [
        { type: 'dialogue', characterKey: "adventure.characters.larry", portrait: 'assets/sprites/portraits/larry.png', textKey: "adventure.dialogue.A4_N10_S1" },
        { type: 'combat', enemies: ['HARMONISTE_CORROMPU'] },
        { type: 'dialogue', characterKey: "adventure.characters.lysandra", portrait: 'assets/sprites/portraits/lysandra.png', textKey: "adventure.dialogue.A4_N10_S2" }
    ]
}
};

// ============================================================================
// ==   BASE DE DONNÉES DU LORE DE L'AVENTURE
// ============================================================================

const ADVENTURE_LORE_DB = {
    'A1_N1_INTRO': 'adventure.lore.A1_N1_INTRO',
    'A1_N2_LOUPS': 'adventure.lore.A1_N2_LOUPS',
    'A1_N3_FORGERON': 'adventure.lore.A1_N3_FORGERON',
    'A1_N4_PORTE_FORGE': 'adventure.lore.A1_N4_PORTE_FORGE',
    'A1_TUTO_FORGE_1': 'adventure.lore.A1_TUTO_FORGE_1',
    'A1_TUTO_FORGE_2': 'adventure.lore.A1_TUTO_FORGE_2',
    'A1_N5_HEROIC_ACT': 'adventure.lore.A1_N5_HEROIC_ACT',
    'A1_N6_MINE': 'adventure.lore.A1_N6_MINE',
    'A1_N7_FRAGMENT': 'adventure.lore.A1_N7_FRAGMENT',
    'A1_N8_ALCHIMISTE': 'adventure.lore.A1_N8_ALCHIMISTE',
    'A1_N9_SANCTUAIRE': 'adventure.lore.A1_N9_SANCTUAIRE',
    'A1_N10_LARRY': 'adventure.lore.A1_N10_LARRY',
    // Lore de l'Acte 2
    'A2_N1_PONT_LA_CROISEE': 'adventure.lore.A2_N1_PONT_LA_CROISEE',
    'A2_N2_RENOMMEE': 'adventure.lore.A2_N2_RENOMMEE',
    'A2_N3_GATE_CHASSEUR': 'adventure.lore.A2_N3_GATE_CHASSEUR',
    'A2_N4_MAITRESSE_CHASSEUSE': 'adventure.lore.A2_N4_MAITRESSE_CHASSEUSE',
    'A2_N5_GATE_FORGE': 'adventure.lore.A2_N5_GATE_FORGE',
    'A2_N6_TOUR_DE_SILAS': 'adventure.lore.A2_N6_TOUR_DE_SILAS',
    'A2_N7_LABO_LARRY': 'adventure.lore.A2_N7_LABO_LARRY',
    'A2_N8_BOSS': 'adventure.lore.A2_N8_BOSS',
    'A2_N9_REVELATION_ASCENSION': 'adventure.lore.A2_N9_REVELATION_ASCENSION',
    // Lore de l'Acte 3
    'A3_N1_RITUEL': 'adventure.lore.A3_N1_RITUEL',
    'A3_N2_CONSTELLATIONS': 'adventure.lore.A3_N2_CONSTELLATIONS',
    'A3_N3_ETINCELLE': 'adventure.lore.A3_N3_ETINCELLE',
    'A3_N4_ARTIFICE': 'adventure.lore.A3_N4_ARTIFICE',
    'A3_N5_ENIGME': 'adventure.lore.A3_N5_ENIGME',
    'A3_N6_ANALYSE': 'adventure.lore.A3_N6_ANALYSE',
    'A3_N7_HERAUT': 'adventure.lore.A3_N7_HERAUT',
    'A3_N8_PISTE': 'adventure.lore.A3_N8_PISTE',
    'A3_N9_BOSS': 'adventure.lore.A3_N9_BOSS',
    // Lore de l'Acte 4
    'A4_N1_EFFONREMENT': 'adventure.lore.A4_N1_EFFONREMENT',
    'A4_N2_FRAGMENTS': 'adventure.lore.A4_N2_FRAGMENTS',
    'A4_N3_SEAU': 'adventure.lore.A4_N3_SEAU',
    'A4_N4_PORTAIL': 'adventure.lore.A4_N4_PORTAIL',
    'A4_N5_INTRUSION': 'adventure.lore.A4_N5_INTRUSION',
    'A4_N6_ANCIEN': 'adventure.lore.A4_N6_ANCIEN',
    'A4_N7_REFLEXION': 'adventure.lore.A4_N7_REFLEXION',
    'A4_N8_ARME': 'adventure.lore.A4_N8_ARME',
    'A4_N9_CONFRONTATION': 'adventure.lore.A4_N9_CONFRONTATION',
    'A4_N10_BOSS': 'adventure.lore.A4_N10_BOSS',
};


const ADVENTURE_ACT_LORE_DB = {
    1: `Votre histoire commence aux portes du Hameau d'Aubier, un village qui a oublié le goût de la tranquillité. Maître Elian, le vieil homme qui guide la communauté, voit en vous une lueur d'espoir. La forêt, autrefois nourricière, est devenue une ennemie silencieuse ; ses bêtes sont devenues folles, leurs yeux brillant d'une lueur violette et malsaine.
    Votre première mission est simple : comprendre pourquoi. La réponse vient rapidement, sous la forme des crocs d'un loup dont le pelage est zébré de cristaux dissonants. Ce n'est pas la faim qui le guide, mais une pure et simple folie.
    Votre enquête vous mène sur la piste de Kaelen, le forgeron du village, enlevé par une bande de gobelins. Vous le retrouvez, non pas torturé, mais observé. Les créatures, fascinées, tapotent ses outils, comme si elles cherchaient à accorder un instrument. Une fois libéré, Kaelen vous explique que ce manège a commencé après qu'il a découvert un étrange minerai dans la vieille mine abandonnée. En remerciement de vos actes, le village vous offre une terre, un Fief, et vous aidez Kaelen à rebâtir sa forge.
    Poussé par la curiosité, vous vous rendez à la "Mine Murmurante". À l'intérieur, la pierre elle-même semble gémir. Au plus profond, un Golem de pierre, un Gardien ancestral, se dresse, entièrement corrompu. Le combat est rude, mais à sa défaite, la créature s'effondre pour révéler son cœur : un cristal pur, un Fragment d'Écho. À son contact, une vision vous submerge : une étoile se brisant dans un silence absolu.
    Cette libération d'énergie pure attire l'attention de Lysandra, une Archiviste de l'Ordre du Silence. Elle vous trouve à Aubier et vous révèle la vérité : le monde est une symphonie, et la Dissonance est sa Fracture.
    Votre voyage vous conduit ensuite dans les marais, où son confrère, l'alchimiste Maître Alaric, est sur le point d'être submergé par la corruption qu'il étudie. Vous le sauvez, et il rejoint votre cause, installant son laboratoire au village.
    Enfin prêts, Lysandra vous guide vers un Sanctuaire Oublié. Une énigme vous barre la route, une question sur la nature du monde à laquelle seule votre vision pouvait répondre. À l'intérieur, après avoir vaincu les gardiens spectraux, vous affrontez le protecteur du lieu, une créature autrefois noble, aujourd'hui un monstre de Dissonance.
    Le combat est victorieux. Alors que vous tendez la main vers le second Fragment, des applaudissements lents et sarcastiques résonnent dans la salle silencieuse. Une silhouette svelte émerge de l'ombre, un sourire carnassier aux lèvres. "Fascinant," dit l'homme, que vous nommerez plus tard Larry. "Un nouveau jouet qui apprend vite. Mais si fragile." Il vous jauge d'un regard amusé, comme un enfant observant une fourmi. "Continue de les rassembler pour moi, veux-tu ? Ça rend les choses tellement plus... intéressantes." Dans un éclat de rire qui semble tordre la réalité, il disparaît. La Dissonance n'est pas un accident. C'est un jeu. Et vous en êtes le pion.`,
    2: `Le rire de Larry hante vos pas. Votre quête a changé : vous n'êtes plus un simple guérisseur, vous êtes un chasseur. La piste de ce marionnettiste malicieux vous mène à Pont-la-Croisée, une cité bouillonnante de vie, où votre réputation vous a précédé. C'est là que vous faites la connaissance de Gaston, le chef au cœur aussi grand que le ventre de son auberge, qui vous apprend que la bonne nourriture peut préparer un guerrier aux pires épreuves. C'est là aussi que la garde, reconnaissant votre valeur, officialise votre statut de protecteur en instaurant le premier Tableau des Primes.
    La Dissonance de Larry est plus complexe, plus intentionnelle. Il ne corrompt pas, il "améliore", créant des bêtes mutées. Pour comprendre son art impie, il vous faut un cœur de créature que seule la Maîtresse Chasseuse, une femme aussi sauvage que les bêtes qu'elle traque, peut vous aider à trouver. Elle ne respecte que la force, et ce n'est qu'après avoir prouvé votre talent sur une de ses cibles que vous gagnez le droit de commercer avec elle.
    Le composant vous mène à la source de la magie de Larry : la tour de son ancien maître, Silas l'Enchanteur. L'endroit lui-même est une œuvre de Dissonance, une flèche de pierre qui se tord sur elle-même. Silas, un homme brisé par la trahison de son élève, vous explique la folie de Larry : il ne voit pas le monde comme brisé, mais comme une toile vierge. Il ne veut pas le réparer, il veut peindre par-dessus avec les couleurs du chaos. Pour vous aider à le combattre, Silas vous enseigne les secrets de l'enchantement.
    Enfin, vous coincez Larry dans un de ses laboratoires cachés. Le sourire aux lèvres, il vous accueille comme un vieil ami. "Ah, mon petit jouet. Tu as bien grandi." Le combat est une farce. Il esquive vos coups sans effort, transforme le sol en cristal coupant, retourne vos propres forces contre vous. "Tu vois ?", dit-il en parant votre meilleure attaque d'un seul doigt, "Tu joues encore la vieille mélodie. C'est ennuyeux. Laisse-moi t'apprendre un nouveau rythme." Il disparaît, laissant derrière lui une abomination de chair et de cristal, son "chef-d'œuvre", qui vous laisse pour mort.
    La défaite est amère, totale. Lysandra vous le confirme : tant que vous resterez dans les limites de cette vie, vous ne serez qu'un jouet pour lui. L'heure de l'Ascension est venue.`,
    3: `La défaite était une blessure plus profonde que n'importe quelle lame. Le rire de Larry résonnait encore dans votre esprit, le son de votre propre impuissance. Lysandra vous a soigné, mais le mal était fait. "Cette vie a atteint ses limites", vous dit-elle d'une voix douce mais ferme. "Pour le combattre, tu ne dois pas seulement guérir. Tu dois te briser entièrement pour te reforger dans une flamme plus vive. C'est le sens de l'Ascension."
    Le choix était terrible : abandonner tout ce que vous aviez bâti, chaque niveau, chaque pièce d'équipement, pour une promesse de puissance future. Mais le souvenir du sourire de Larry ne vous laissait pas d'autre option. Vous avez accepté le rituel. Ce fut une expérience de dissolution, votre corps et votre esprit se dénouant fil par fil, votre histoire se dispersant comme de la poussière d'étoiles. Puis, le vide. Et enfin, une nouvelle étincelle. Vous étiez à nouveau au début, faible, mais pas vide. Votre légende passée était désormais gravée dans le firmament. Lysandra vous a appris à y lire, à y puiser votre force. Les Constellations étaient désormais vôtres, un pouvoir que même Larry ne pouvait vous enlever.
    Les semaines qui suivirent furent une redécouverte. Chaque combat, chaque objet forgé avait une saveur nouvelle. Vous sentiez la puissance des étoiles couler en vous, différente, plus fondamentale que la force brute de votre vie passée. Vous étiez en train de devenir l'arme que le monde attendait.
    Mais une telle lumière ne pouvait passer inaperçue. Lysandra sentit la vague avant qu'elle n'arrive, une intention froide et inquisitrice. "Il sait," murmura-t-elle, le visage blême. "Larry a senti ta renaissance. Et il n'aime pas la concurrence." L'ennemi qu'il envoya n'était pas une bête corrompue. C'était un assassin, une construction de cristal noir et de silence, le Juge Dissonant. Sa mission était simple : éteindre votre étincelle avant qu'elle ne devienne un brasier.
    Le combat se déroula aux portes mêmes d'Aubier, un duel entre la promesse de votre nouvelle destinée et la volonté malicieuse de votre tortionnaire. Chaque coup que vous portiez, chaque sort que vous lanciez, était une affirmation. Quand le Juge se brisa en un million d'éclats silencieux, vous aviez votre réponse. L'Ascension avait fonctionné. Le jeu avait changé.`,
    4: `Votre victoire sur le Juge Dissonant n'était pas une fin, mais un signal. Les cieux eux-mêmes semblent se déchirer. Des failles d'énergie dissonante apparaissent, projetant des éclats de lumière violette qui corrompent la terre. Lysandra vous met en garde : Larry est furieux. Il ne se contente plus de jouer. Il déchaîne le chaos, cherchant à vous submerger. Les Anciens le nommaient le Réveil de la Dissonance.
    Le monde devient une zone de guerre. Vous affrontez des Fragments de Dissonance Mineurs, des entités cristallines et chaotiques qui émergent des failles. Chaque fragment détruit vous révèle un peu plus sur la nature de cette énergie, mais vous n'êtes pas seul. Lysandra, aidée par Elian, cherche des moyens de "sceller" les failles, ou du moins de comprendre leur fonctionnement.
    Dans un ancien temple oublié, une immense fissure de Dissonance menace d'engloutir les ruines. Un Gardien Verrouillé, un être de pierre et de cristal sombre, défend l'accès à la faille, alimenté par la Dissonance elle-même. Après un combat acharné, vous le vainquez, et Lysandra parvient à stabiliser temporairement la faille. En l'étudiant, elle découvre des symboles ancestraux : les Runes. Elle réalise que ces inscriptions peuvent canaliser et amplifier l'énergie, et elle vous confie la tâche de les maîtriser.
    Vous vous immergez dans l'étude des Runes, cherchant à en équiper trois pour prouver votre maîtrise. Le portail dissonant que vous avez scellé semble s'ouvrir légèrement à votre contact, réagissant à votre nouvelle compréhension. C'est là que vous faites une rencontre inattendue. Kormac, un Gardien de l'Harmonie solitaire, dont le corps est marqué par la Dissonance, surgit d'un portail secondaire. Il vous met en garde : l'Ordre est tombé, et Larry est à l'origine de sa corruption.
    Kormac, un guerrier aguerri et désabusé, explique que Larry a commencé à corrompre les Anciens, des entités qui veillaient sur l'équilibre du monde. Il a besoin d'Artefacts Harmoniques Anciens, dispersés dans des lieux contaminés par la Dissonance, pour tenter de comprendre et, peut-être, de purifier ce qui reste de son Ordre. Vous collectez ces objets, affrontant des hordes de créatures mutées.
    Les artefacts révèlent des vérités dérangeantes : la Dissonance n'est pas qu'une simple énergie, c'est un langage, une mélodie inversée. Larry ne détruit pas le monde, il le "réécrit". Lysandra et Kormac débattent de la meilleure approche : chercher un moyen de le "réaccorder" (Lysandra) ou le détruire (Kormac). Vous devez faire un choix, qui orientera votre future compréhension.
    Votre décision prise, vous êtes confronté à la première "Arme de Larry", une créature humanoïde forgée de Dissonance pure, envoyée pour vous intercepter. Ce combat est un test de votre philosophie et de votre puissance. Vous la battez, mais elle vous avertit que Larry prépare sa plus grande œuvre.
    Larry vous attend dans une chambre d'Harmonie corrompue, un lieu où la Dissonance a été amplifiée à des niveaux critiques. Son sourire est plus sombre que jamais. "Tu as choisi ta voie, petit joueur," dit-il. "Maintenant, assiste à la mienne." Il révèle alors sa véritable création : l'Harmoniste Corrompu, un ancien membre de l'Ordre du Silence, transformé en un instrument de Dissonance. Le combat est épique, une confrontation entre la pureté des étoiles et le chaos fractal de Larry. En le vainquant, vous remportez une bataille majeure, mais Larry lui-même s'échappe, non sans un rire sinistre. Lysandra réalise alors l'ampleur de la menace : Larry n'est pas seulement un joueur. Il est le compositeur d'un nouveau cosmos, et vous n'êtes que le dernier obstacle à sa symphonie du chaos.`
};


const FRAMES_DB = {
    'default': {
        id: 'default',
        nameKey: 'frames.default.name',
        descriptionKey: 'frames.default.description',
        // MON COMMENTAIRE : Je m'assure que l'extension est bien .png
        image: 'assets/sprites/frames/default_1024.png',
        rarity: 'common'
    },
    'cadre_loyaute': {
        id: 'cadre_loyaute',
        nameKey: 'frames.cadre_loyaute.name',
        descriptionKey: 'frames.cadre_loyaute.description',
        image: 'assets/sprites/frames/guild_loyalty_1024.png',
        rarity: 'legendary'
    },
    'supporter': {
        id: 'supporter',
        nameKey: 'frames.supporter.name',
        descriptionKey: 'frames.supporter.description',
        // MON COMMENTAIRE : Je m'assure que l'extension est bien .png
        image: 'assets/sprites/frames/supporter_1024.png',
        rarity: 'epic'
    },
    'ascended_master': {
        id: 'ascended_master',
        nameKey: 'frames.ascended_master.name',
        descriptionKey: 'frames.ascended_master.description',
        // MON COMMENTAIRE : Je m'assure que l'extension est bien .png
        image: 'assets/sprites/frames/ascended_master_1024.png',
        rarity: 'legendary'
    }
};

const CONTEXTUAL_OFFERS_DB = {
    'ACCELERATION_PACK_1': {
        nameKey: "ui.contextual_offers.acceleration_pack_1.name",
        descriptionKey: "ui.contextual_offers.acceleration_pack_1.description",
        icon: "assets/sprites/packs/speed_up_pack.png",
        contents: {
            'eclats_ascension': 250
        },
        price: "1.99€"
    }
};

const BOUTIQUE_ITEMS_DB = {
    'MAX_LIVES_PACK_1': {
        nameKey: "ui.shop.max_lives_pack_1.name",
        descriptionKey: "ui.shop.max_lives_pack_1.description",
        cost: 250, // Coût en Éclats d'Ascension
    }
};

const DAILY_MISSIONS_DB = {
    missions: [
        { id: 'expeditions', target: 3, nameKey: 'daily_missions.expeditions.name', icon: '🗺️' },
        { id: 'bosses', target: 1, nameKey: 'daily_missions.bosses.name', icon: '👹' },
        { id: 'crafts', target: 1, nameKey: 'daily_missions.crafts.name', icon: '🔨' }
    ],
    reward: {
        eclats_ascension: 10
    }
};

const GUILD_BOSSES_DB = [
    {
        id: 'GUILD_BOSS_LVL_1',
        nameKey: 'bosses.guild_boss_1.name',
        requiredLevel: 3,
        // MON COMMENTAIRE : C'est la seule et unique source de points de vie du boss.
        hp: 7000, 
        enemyData: {
            id: 'GUILD_BOSS_LVL_1_ENEMY',
            // MON COMMENTAIRE : On supprime la statistique "Vie" qui n'est plus nécessaire ici.
            baseStats: { 
                Force: 35,
                Agilité: 20, 
                Intelligence: 20, 
                Défense: 15,
                Chance: 20 
            },
            sprite: 'assets/sprites/bosses/guild_boss_1.png',
            abilities: [
                { type: 'summon', chance: 0.25, enemyId: 'fragment_de_douleur' } 
            ]
        },
        rewards: {
            common: {
                marques_de_guilde: 20,
                eclats_ascension: 5
            },
            ranking: [
                { marques_de_guilde: 100, eclats_ascension: 50 }, // Rang 1
                { marques_de_guilde: 70, eclats_ascension: 30 }, // Rang 2
                { marques_de_guilde: 50, eclats_ascension: 20 }, // Rang 3
                { marques_de_guilde: 35, eclats_ascension: 10 },
                { marques_de_guilde: 20 }
            ]
        }
    },
    // Ajoutez d'autres boss ici pour les niveaux 7, etc.
];
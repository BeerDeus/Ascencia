const initialGameState = {
    language: 'fr',
    availablePoints: 15,
    baseStats: { Vie: 0, Force: 0, Agilité: 0, Chance: 0, Intelligence: 0, Défense: 0 },
    player: null,
    currentExpeditions: [],
    isOnExpedition: false,
    expedition: null,
    bossesKilled: 0,
    currentEnemies: [],
    inCombat: false,
    playerTargetIndex: 0,
    playerCurrentHP: 0,
    playerCurrentMana: 0,
    combatRound: 0,
    currentEvent: null,
    afterCombatEvents: null,
    // NOUVEL OBJET POUR LES BÂTIMENTS DU VILLAGE
    village: {
        forge: { level: 0, constructionEnd: 0 },
        enchanter: { level: 0, constructionEnd: 0 },
    },
    merchantStock: {},
    isResting: false,
    restEndTime: 0,
    expeditionCache: null,
    expeditionRefreshCooldownEnd: 0,
    killCount: {},
    endlessBossLevel: 0,
    isOnPatrol: false, 
    patrolEndTime: 0,
    patrolStartTime: 0,
    isBountyFight: false,
    currentBounties: [], 
    lastBountyRefresh: 0,
    playerActionLocked: false,
    consumableCooldown: 0,
    turnTimerId: null,
    isInDungeon: false,
    dungeonCurrentFloor: 0,
    dungeonHighestFloor: 0,
    dungeonLootCache: { eclats_instables: 0 },
    dungeonModifiers: [],
    lastDungeonKeyRefresh: 0,
    dungeonMap: {},
    gridSize: 0,
    playerPosition: { x: 0, y: 0 },
    dungeonPlayerHP: 0,
    dungeonPlayerMana: 0,
    dungeonMapRevealedUntilFloor: 0,
    ascensionLevel: 0,
    isPostAscension: false,
    fiefUnlocked: false,
    adventure: {
        unlocked: true,
        completedNodes: {},
        currentStepIndex: 0,
        dialogueHistory: {}
    },
    isSurvivalCombat: false,
    survivalTurns: 0,
    inventorySortState: {
        resources: 'logical',
        consumables: 'alpha',
        equipment: 'rarity'
    },
    fief: {
        buildings: {
            scierie: 0,
            mine: 0,
            atelier_tissage: 0,
            tresorerie: 0,
            infirmerie: 0,
            entrepot: 0,
        },
        // NOUVEL OBJET POUR LA FILE DE CONSTRUCTION
        constructionQueue: {},
        production: {
            scierie: { stock: 0, lastUpdate: 0 },
            mine: { stock: 0, lastUpdate: 0 },
            atelier_tissage: { stock: 0, lastUpdate: 0 },
            tresorerie: { stock: 0, lastUpdate: 0 },
            entrepot: { stock: 0, lastUpdate: 0 },
            infirmerie: { stock: 0, lastUpdate: 0 }
        },
        lastBaumeCollection: 0,
        garden: {
            plots: [
                { plant_id: null, plant_start_time: 0, pending_mutation: null }, { plant_id: null, plant_start_time: 0, pending_mutation: null },
                { plant_id: null, plant_start_time: 0, pending_mutation: null }, { plant_id: null, plant_start_time: 0, pending_mutation: null }
            ],
            current_season: 'PRINTEMPS',
            season_start_time: 0,
            seed_inventory: {} ,
            unlocked_tiers: [0]
        }
    },
    dailyAdViews: {
        energy: 0,
        bounty: 0,
        rift_key: 0,
        premium_currency: 0,
        lastReset: 0
    },
    unlockedFeatures: {
        expeditions: false,
        codex: false,
        village: false,
        fief: false,
        hasFoundRareResource: false,
        hasFoundConsumable: false,
        profile: true
    },
    constellationPoints: {
    general: 0,
    guerrier: 0,
    archer: 0,
    mage: 0
    },
    constellations: {},
    activePassives: {},
    rerollStatus: null,
    isChoosingTrait: false,
    traitSelectionOptions: null,
    stats: {
        expeditionsStarted: 0,
        expeditionsSucceeded: 0,
        expeditionsFailed: 0,
        playerDeaths: 0,
        itemsCrafted: 0,
        itemsRecycled: 0,
        itemsEnchanted: 0,
        totalFragmentsEarned: 0,
        totalXpGained: 0,
        achievementStatus: {},
        succesProgress: {},
        hasCompletedMediumOrHigherBounty: false,
        consumablesCrafted: {}
    },
    dailyMissions: {
        lastReset: 0,       // La date du dernier reset pour savoir quand en générer de nouvelles.
        claimed: false,     // Pour savoir si la récompense finale a déjà été récupérée.
        progress: {
            expeditions: 0, // Compteur pour les expéditions lancées.
            bosses: 0,      // Compteur pour les boss vaincus.
            crafts: 0       // Compteur pour les objets fabriqués.
        }
    }
};

// On clone l'état initial pour notre état de jeu actuel
let gameState = JSON.parse(JSON.stringify(initialGameState));
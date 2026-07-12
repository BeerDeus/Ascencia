document.addEventListener('DOMContentLoaded', (event) => {
    const userAgent = navigator.userAgent;
    const chromeVersionMatch = userAgent.match(/Chrome\/(\d+)/);

    if (chromeVersionMatch && chromeVersionMatch[1]) {
        const version = parseInt(chromeVersionMatch[1], 10);
        console.log('Version du moteur WebView (Chrome) :', version);

        // Un Redmi Note 7 tourne sur Android 9 ou 10. Le WebView devrait être > 70.
        // Si la version est très basse (ex: < 60), c'est probablement la cause des bugs.
        if (version < 65) {
            // On utilise ta fonction showCustomConfirm pour demander gentiment
            showCustomConfirm(
                "<h3>Mise à jour recommandée</h3><p>Il semble que le moteur d'affichage de votre téléphone ne soit pas à jour, ce qui peut causer des bugs graphiques. Voulez-vous ouvrir le Play Store pour vérifier les mises à jour ?</p>",
                "Ouvrir le Play Store",
                "Continuer quand même"
            ).then(confirmed => {
                if (confirmed) {
                    // Ouvre la page de l'app WebView sur le Play Store
                    window.open('https://play.google.com/store/apps/details?id=com.google.android.webview', '_system');
                }
            });
        }
    }
    // MON COMMENTAIRE : On attache maintenant un seul écouteur au conteneur parent de TOUTES les sub-nav.
    const subNavWrapper = document.getElementById('sub-navigation-wrapper');
    if (subNavWrapper) {
        subNavWrapper.addEventListener('click', function(e) {
            const button = e.target.closest('.sub-nav-button');
            if (!button) return;

            // La logique pour les boutons désactivés reste la même
            if (button.classList.contains('disabled')) {
                if (button.title) {
                    showToast(button.title, 'error');
                }
                return;
            }

            // La logique d'appel dynamique reste la même et fonctionnera pour tous les boutons
            const action = button.dataset.action;
            const arg = button.dataset.arg;

            if (action && typeof window[action] === 'function') {
                window[action](arg);
            }
        });
    }
});

window.showElement = function(element) {
    if (element) {
        element.classList.remove('hidden');
    }
}

window.hideElement = function(element) {
    if (element) {
        element.classList.add('hidden');
    }
}


const combatLog = document.getElementById('combat-log');
const nameInput = document.getElementById('name');
const pointsLeftSpan = document.getElementById('points-left');
let deathTimerInterval = null;
let selectedEnchanterItem = null;
let statPressTimer = null;
let statRepeatInterval = null;
let selectedForgeItem = null;
let fiefUpdateInterval = null;
let profileUpdateInterval = null;
let cropper = null;
let serverSaveTimeout = null;
let isDirty = false;
let lastActiveScreen = 'aventure';
let lastActiveSubTab = { action: 'switchAdventureTab', arg: 'aventure' };
let spendPointsFAB;
let constructionUpdateInterval = null;
let livesModalInterval = null;
let guildDataCache = null;
let contributionUpdateInterval = null;
let isContributing = false;
let selectedMemberForAction = null;
let guildListenerUnsubscribe = null;
let guildChatListenerUnsubscribe = null;
let privateChatListenerUnsubscribe = null;
let currentOpenPrivateChat = null;
let chatUserCache = {};
let oldestMessageDoc = null;
let isLoadingMoreMessages = false;
let isChatCooldown = false;
let guildBossListenerUnsubscribe = null;
let guildBossTimerInterval = null;

// =================================================================================
// SYSTÈME DE TRADUCTION (LOCALISATION)
// =================================================================================

/**
 * Récupère une chaîne de texte traduite à partir de sa clé.
 * @param {string} key - La clé de traduction (ex: 'ui.buttons.createCharacter').
 * @param {object} replacements - Un objet pour les valeurs dynamiques.
 * @returns {string|Array} Le texte traduit ou la clé si introuvable.
 */
function t(key, replacements = {}) {
  // ==================== DÉBUT DE LA MODIFICATION ====================
  if (typeof key !== 'string') {
    console.warn(`Tentative de traduction avec une clé invalide (non-string) :`, key);
    return ''; // On retourne une chaîne vide au lieu de planter.
  }
  // ===================== FIN DE LA MODIFICATION =====================

  const lang = gameState.language || 'fr';
  const keys = key.split('.');
  let text = locales[lang];
  for (const k of keys) {
    if (text && typeof text === 'object' && k in text) {
      text = text[k];
    } else {
      console.warn(`Clé de traduction introuvable : ${key}`);
      return key;
    }
  }

  if (typeof text === 'string') {
    for (const placeholder in replacements) {
      text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    }
  }

  return text;
}

function setText(selector, key, replacements = {}) {
  const element = document.querySelector(selector);
  if (element) {
    // MON COMMENTAIRE : On remplace .textContent par .innerHTML
    // pour permettre l'affichage d'icônes directement dans les traductions.
    element.innerHTML = t(key, replacements);
  }
}

function applyAllTranslations() {
  try {
    const langSelector = document.getElementById('language-selector');
    if (langSelector) {
        langSelector.value = gameState.language || 'fr';
        langSelector.querySelector('option[value="fr"]').textContent = 'Français';
        langSelector.querySelector('option[value="en"]').textContent = 'English';
        const langLabel = document.querySelector('label[for="language-selector"]');
        if (langLabel) {
            langLabel.textContent = (gameState.language === 'fr') ? 'Langue :' : 'Language:';
        }
        
        const generalPanelTitle = document.querySelector('#options-panel-general h2');
        if (generalPanelTitle) generalPanelTitle.textContent = (gameState.language === 'fr') ? 'Général' : 'General';
    }

    const generalMenuButton = document.querySelector('.options-menu li[onclick*="general"]');
    if (generalMenuButton) generalMenuButton.textContent = (gameState.language === 'fr') ? '⚙️ Général' : '⚙️ General';

    document.title = t('ui.app_title');

    const creationScreen = document.getElementById('character-creation');
    if (creationScreen && creationScreen.style.display !== 'none') {
      setText('#character-creation h1', 'ui.creation.title');
      setText('#creation-logout-button', 'ui.creation.logout_button');
      setText('label[for="name"]', 'ui.creation.name_label');
      document.getElementById('name').placeholder = t('ui.creation.name_placeholder');
      setText('#character-creation h3', 'ui.creation.class_label');
      setText('.class-choice[data-class="Guerrier"] h4', 'ui.creation.guerrier_name');
      setText('.class-choice[data-class="Guerrier"] p', 'ui.creation.guerrier_desc');
      setText('.class-choice[data-class="Archer"] h4', 'ui.creation.archer_name');
      setText('.class-choice[data-class="Archer"] p', 'ui.creation.archer_desc');
      setText('.class-choice[data-class="Mage"] h4', 'ui.creation.mage_name');
      setText('.class-choice[data-class="Mage"] p', 'ui.creation.mage_desc');
      const pointsLabel = creationScreen.querySelector('p:has(#points-left)');
      if (pointsLabel) pointsLabel.firstChild.textContent = t('ui.creation.points_label') + ' : ';
      setText('#create-button', 'ui.creation.create_button');
    }

    const gameScreen = document.getElementById('game-screen');
    if (gameScreen) {
      setText('#level-label', 'ui.char_info.level');
      setText('#hp-label', 'ui.char_info.health');
      setText('#mana-label', 'ui.char_info.mana');
      setText('#xp-label', 'ui.char_info.experience');

      // MON COMMENTAIRE : Traduction des éléments du menu hamburger
      setText('li[onclick="openProfileModal()"]', 'ui.main_menu.profile');
      setText('li[onclick="openAchievements()"]', 'ui.main_menu.achievements');
      setText('li[onclick="displayLeaderboard()"]', 'ui.main_menu.leaderboard');
      setText('li[onclick="openBoutique()"]', 'ui.main_menu.shop'); // Ajout pour la boutique
      setText('li[onclick="toggleStatsModal(true)"]', 'ui.main_menu.statistics');
      setText('li[onclick*="openOptions"]', 'ui.main_menu.options');
      setText('li[onclick="openBugReport()"]', 'ui.main_menu.bug_report_s');
      setText('#menu-logout', 'ui.main_menu.logout');

      // MON COMMENTAIRE : Traduction des nouveaux boutons de la barre de navigation
      setText('.nav-button[onclick*="aventure"] .nav-text', 'ui.expeditions.tabs.aventure');
      setText('.nav-button[data-screen="personnage"] .nav-text', 'ui.panels.bottom_tabs.character'); // Réutilisation de la clé "Profil"
      setText('.nav-button[onclick*="village"] .nav-text', 'ui.panels.bottom_tabs.village');
      setText('.nav-button[onclick*="fief"] .nav-text', 'ui.main_actions.fief_button');
      setText('.nav-button[onclick*="social"] .nav-text', 'ui.panels.bottom_tabs.social');
      
      setText('#fief-main-button', 'ui.main_actions.fief_button');
      setText('#ascension-main-button', 'ui.main_actions.ascension_button');

      setText('#personnage-subnav .sub-nav-button[data-arg="personnage"]', 'ui.panels.bottom_tabs.personnage');
      setText('#personnage-subnav .sub-nav-button[data-arg="codex"]', 'ui.panels.bottom_tabs.codex');
      setText('#personnage-subnav .sub-nav-button[data-arg="maitrise"]', 'ui.panels.bottom_tabs.mastery');

      setText('#social-subnav .sub-nav-button[data-arg="guilde"]', 'ui.guild.menu_title');
      setText('#social-subnav .sub-nav-button[data-arg="chat"]', 'ui.chat.title');
      setText('#social-subnav .sub-nav-button[data-arg="boss"]', 'ui.guild_boss.title');
      setText('#game-stats-list .collapsible-header span:first-child', 'ui.panels.attributes');
      setText('.stat-panel .collapsible-header span:first-child', 'ui.panels.detailed_stats');
      setText('.stat-tab-button[onclick*="combat"]', 'ui.panels.tabs.combat');
      setText('.stat-tab-button[onclick*="global"]', 'ui.panels.tabs.global');
      setText('.stat-tab-button[onclick*="traits"]', 'ui.panels.tabs.traits');
      setText('#equipment-section .collapsible-header span:first-child', 'ui.panels.equipment');
      setText('#inventory-section .collapsible-header span:first-child', 'ui.panels.inventory');
      setText('label[for="inventory-type-filter"]', 'ui.inventory.filter_by_type');
      setText('#inventory-type-filter option[value="none"]', 'ui.inventory.filter_none');
      setText('#inventory-type-filter option[value="all"]', 'ui.inventory.filter_all');
      setText('#recycle-all-button', 'ui.inventory.recycle_all_button');
      setText('#special-resources-section .collapsible-header span:first-child', 'ui.panels.rare_components');
      setText('#consumables-section .collapsible-header span:first-child', 'ui.panels.consumables');

      setText('#artisans-quarter-title', 'ui.village.district_artisans');
      setText('#merchants-quarter-title', 'ui.village.district_merchants');
      setText('#mystic-quarter-title', 'ui.village.district_mystic');
      setText('#forge-hub-card h3', 'ui.village.buildings.forge');
      setText('#enchanter-hub-card h3', 'ui.village.buildings.enchanter');
      setText('#alchemist-hub-card h3', 'ui.village.buildings.alchemist');
      setText('#cook-hub-card h3', 'ui.village.buildings.cook');
      setText('#merchant-hub-card h3', 'ui.village.buildings.merchant');
      setText('#bounty-master-hub-card h3', 'ui.village.buildings.bounty_master');
      setText('#bounty-hub-card h3', 'ui.village.buildings.bounties');
      setText('#oracle-hub-card h3', 'ui.village.buildings.oracle');

      setText('#aventure-subnav .sub-nav-button[data-arg="aventure"]', 'ui.expeditions.tabs.aventure');
      setText('#aventure-subnav .sub-nav-button[data-arg="expeditions"]', 'ui.expeditions.tabs.expeditions');
      setText('#aventure-subnav .sub-nav-button[data-arg="patrol"]', 'ui.expeditions.tabs.patrol');
      setText('#aventure-subnav .sub-nav-button[data-arg="dungeon"]', 'ui.expeditions.tabs.dungeon');

      setText('#codex-subnav .sub-nav-button[data-arg="codex"]', 'ui.panels.bottom_tabs.codex');
      setText('#codex-subnav .sub-nav-button[data-arg="maitrise"]', 'ui.panels.bottom_tabs.mastery');

      setText('#village-subnav .sub-nav-button[data-arg="hub"]', 'ui.village_hub.title'); // Tu auras besoin d'une nouvelle clé pour "Hub"
      setText('#village-subnav .sub-nav-button[data-arg="forge"]', 'ui.village.buildings.forge');
      setText('#village-subnav .sub-nav-button[data-arg="enchanter"]', 'ui.village.buildings.enchanter');
      setText('#village-subnav .sub-nav-button[data-arg="alchemist"]', 'ui.village.buildings.alchemist');
      setText('#village-subnav .sub-nav-button[data-arg="cook"]', 'ui.village.buildings.cook');
      setText('#village-subnav .sub-nav-button[data-arg="bounty"]', 'ui.village.buildings.bounties');

      setText('#fief-subnav .sub-nav-button[data-arg="buildings"]', 'ui.fief.tabs.buildings');
      setText('#fief-subnav .sub-nav-button[data-arg="garden"]', 'ui.fief.tabs.garden');

      const masteryPanel = document.getElementById('maitrise-panel');
      if(masteryPanel) {
        setText('#maitrise-panel h2', 'ui.mastery.title');
        setText('#maitrise-panel p', 'ui.mastery.description');
        setText('#codex-summary-bonuses h3', 'ui.mastery.active_bonuses');
        const progressTitle = masteryPanel.querySelector('#codex-milestones-progress');
        if (progressTitle && progressTitle.previousElementSibling) {
            progressTitle.previousElementSibling.textContent = t('ui.mastery.milestones_progress');
        }
      }
    }
    setText('.options-menu li[onclick*="general"]', 'ui.main_menu.options'); // Réutilisation
    setText('#options-menu-patch', 'ui.main_menu.patch_notes');
    setText('#options-menu-bug', 'ui.main_menu.bug_report_s');
    setText('#options-menu-reinitialiser', 'ui.main_menu.reset_s');
    setText('#options-menu-login', 'ui.main_menu.login');
    setText('#options-menu-logout', 'ui.main_menu.logout');

    setText('#options-general-title', 'ui.options.general.title'); // Nouvelle clé
    setText('#options-language-label', 'ui.options.general.language_label'); // Nouvelle clé
    
    setText('#options-reset-title', 'ui.modals.reset_title');
    setText('#options-reset-desc', 'ui.modals.reset_desc');
    setText('#options-erase-title', 'ui.modals.erase_progress_title');
    setText('#options-erase-desc', 'ui.modals.erase_progress_desc');
    setText('#options-erase-button', 'ui.modals.erase_progress_button');
    setText('#options-close-button', 'ui.buttons.close');
  } catch (error) {
    console.error("Erreur lors de l'application des traductions :", error);
  }
}

// =================================================================================
// FONCTIONS UTILITAIRES & FONDAMENTALES
// =================================================================================

function generateUID() {
    // Crée un identifiant unique simple basé sur la date et un nombre aléatoire
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Compte le nombre de pièces d'un set spécifique actuellement équipées par le joueur.
 * @param {string} setKey - La clé de l'ensemble (ex: 'REGALIA_DU_PREDATEUR').
 * @returns {number} Le nombre de pièces équipées.
 */
 
function generateRandomStars() {
    const container = document.querySelector('.constellation-bg');
    if (!container) return;

    const starCount = 50; 

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 4}s`;
        container.appendChild(star);
    }
}

function generateRandomConstellation() {
    const container = document.querySelector('.constellation-bg');
    if (!container) return;

    container.innerHTML = '';

    const numStars = Math.floor(Math.random() * 4) + 4; 
    const stars = [];
    const gridCells = [];
    const gridSize = 3; 

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            gridCells.push({ row: i, col: j });
        }
    }

    gridCells.sort(() => 0.5 - Math.random());

    for (let i = 0; i < numStars; i++) {
        if (i >= gridCells.length) break; 

        const cell = gridCells[i];
        const cellWidth = 100 / gridSize;
        const cellHeight = 100 / gridSize;
        
        const margin = 0.15;
        const starX = (cell.col * cellWidth) + (Math.random() * (1 - margin * 2) + margin) * cellWidth;
        const starY = (cell.row * cellHeight) + (Math.random() * (1 - margin * 2) + margin) * cellHeight;

        const starEl = document.createElement('div');
        starEl.className = `star s${i + 1}`;
        starEl.style.top = `${starY}%`;
        starEl.style.left = `${starX}%`;

        stars.push({ id: i, x: starX, y: starY, element: starEl });
        container.appendChild(starEl);
    }

    const connections = new Set();
    stars.forEach(starA => {
        const neighbors = stars
            .filter(s => s.id !== starA.id)
            .map(starB => ({
                star: starB,
                dist: Math.sqrt(Math.pow(starB.x - starA.x, 2) + Math.pow(starB.y - starA.y, 2))
            }))
            .sort((a, b) => a.dist - b.dist)
            .slice(0, 2);

        neighbors.forEach(neighbor => {
            const starB = neighbor.star;
            const connectionKey = [starA.id, starB.id].sort().join('-');

            if (!connections.has(connectionKey)) {
                connections.add(connectionKey);

                const length = neighbor.dist;
                const angle = Math.atan2(starB.y - starA.y, starB.x - starA.x) * (180 / Math.PI);

                const line = document.createElement('div');
                line.className = 'constellation-line';
                line.style.width = `${length}%`;
                line.style.top = `${starA.y}%`;
                line.style.left = `${starA.x}%`;
                line.style.transform = `rotate(${angle}deg)`;
                
                const delay = `${starA.id * 0.2}s`;
                line.style.animationDelay = delay;
                line.style.setProperty('--line-delay', delay);
                
                container.appendChild(line);
            }
        });
    });
}
function countEquippedSetPieces(setKey) {
    let count = 0;
    for (const slot of EQUIPMENT_SLOTS) {
        const item = gameState.player.equipment[slot];
        if (item && item.isSetItem && item.setKey === setKey) {
            count++;
        }
    }
    return count;
}

function resizeAndCompressImage(file, maxSize = 256) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // On convertit en JPEG avec une qualité de 80% pour une bonne compression
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', 0.8);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

/**
 * Formate un objet de statistiques en une seule chaîne de caractères.
 * @param {object} stats - L'objet de statistiques (ex: { Force: 10, Vie: 15 }).
 * @returns {string} La chaîne de caractères formatée.
 */
function formatStatsToString(stats) {
    if (!stats || Object.keys(stats).length === 0) return '';
    return Object.entries(stats).map(([key, val]) => {
        const displayName = t(`stats.displayNames.${key}`) || key;
        const suffix = String(key).includes('_percent') ? '%' : '';
        const sign = val > 0 ? '+' : '';
        return `<strong>${displayName}:</strong> ${sign}${val}${suffix}`;
    }).join(' ');
}

function showCustomAlert(message) {
    return new Promise(resolve => {
        const modal = document.getElementById('custom-alert-modal');
        const text = document.getElementById('custom-alert-text');
        const closeButton = document.getElementById('custom-alert-close');

        text.innerHTML = message;
        modal.style.display = 'flex';

        const closeAndResolve = () => {
            modal.style.display = 'none';
            // On retire l'écouteur pour éviter les doublons futurs
            modal.removeEventListener('click', handleOutsideClick);
            resolve();
        };

        const handleOutsideClick = (event) => {
            // Si le clic est sur l'overlay (la modale elle-même) et non sur son contenu
            if (event.target === modal) {
                closeAndResolve();
            }
        };

        // L'action du bouton "OK"
        closeButton.onclick = closeAndResolve;
        
        // On ajoute l'écouteur pour le clic extérieur
        modal.addEventListener('click', handleOutsideClick);
    });
}

function showCustomConfirm(message, confirmText = 'Oui', cancelText = 'Annuler') {
    return new Promise(resolve => {
        const modal = document.getElementById('custom-confirm-modal');
        const text = document.getElementById('custom-confirm-text');
        const buttonsContainer = document.getElementById('custom-confirm-buttons');
        
        buttonsContainer.innerHTML = ''; // Nettoyer les anciens boutons

        const confirmButton = document.createElement('button');
        confirmButton.textContent = confirmText;
        confirmButton.onclick = () => {
            modal.style.display = 'none';
            resolve(true);
        };
        
        const cancelButton = document.createElement('button');
        cancelButton.textContent = cancelText;
        cancelButton.onclick = () => {
            modal.style.display = 'none';
            resolve(false);
        };
        
        buttonsContainer.appendChild(confirmButton);
        buttonsContainer.appendChild(cancelButton);
        
        text.innerHTML = message;
        modal.style.display = 'flex';
    });
}

function requestServerSave(delay = 2000) {
    clearTimeout(serverSaveTimeout);
    serverSaveTimeout = setTimeout(() => {
        if (typeof saveGameToServer === 'function') {
            saveGameToServer();
            isDirty = false; // ◄◄◄ AJOUTE CETTE LIGNE : On baisse le drapeau après la sauvegarde
            console.log("Partie sauvegardée sur le serveur (action groupée).");
        }
    }, delay);
}

function saveGame() {
    localStorage.setItem('incrementalGameSave', JSON.stringify(gameState));
    isDirty = true; // ◄◄◄ AJOUTE CETTE LIGNE : On lève le drapeau à chaque sauvegarde locale
    requestServerSave();
}

function createGameStateFromSave(parsedData) {
    console.log("[Chargement] Début de la création de l'état de jeu depuis la sauvegarde.");
    let migratedData = migrateSave(parsedData);
    let newState = JSON.parse(JSON.stringify(initialGameState));

    // Migration pour la nouvelle structure village
    if (migratedData.forgeLevel !== undefined || migratedData.enchanterLevel !== undefined) {
        newState.village = {
            forge: { level: migratedData.forgeLevel || 0, constructionEnd: 0 },
            enchanter: { level: migratedData.enchanterLevel || 0, constructionEnd: 0 }
        };
        delete migratedData.forgeLevel;
        delete migratedData.enchanterLevel;
        console.log("[Migration] Données de forge/enchanteur migrées vers la structure village.");
    }

    // Fusion des propriétés de haut niveau (sauf player et fief)
    for (const key in migratedData) {
        if (key === 'player' || key === 'fief') continue;
        if (newState.hasOwnProperty(key) && typeof migratedData[key] === 'object' && migratedData[key] !== null && !Array.isArray(migratedData[key])) {
            newState[key] = { ...newState[key], ...migratedData[key] };
        } else if (migratedData.hasOwnProperty(key)) {
            newState[key] = migratedData[key];
        }
    }

    // Fusion de l'objet Fief (logique plus robuste)
    if (migratedData.fief) {
        newState.fief.buildings = { ...initialGameState.fief.buildings, ...migratedData.fief.buildings };
        newState.fief.production = { ...initialGameState.fief.production, ...migratedData.fief.production };
        // NOUVELLE LIGNE : On s'assure que la file de construction est bien présente
        newState.fief.constructionQueue = migratedData.fief.constructionQueue || {};
        if (migratedData.fief.garden) {
            newState.fief.garden = { ...initialGameState.fief.garden, ...migratedData.fief.garden };
            newState.fief.garden.seed_inventory = { ...initialGameState.fief.garden.seed_inventory, ...migratedData.fief.garden.seed_inventory };
        }
        newState.fief.lastBaumeCollection = migratedData.fief.lastBaumeCollection || 0;
    }
    
    // Fusion et hydratation de l'objet Player
    if (migratedData.player) {
        // MON COMMENTAIRE : On remplace tout le bloc de fusion des ressources par un simple appel
        // à notre nouvelle fonction. Note : on lui passe l'objet `migratedData` car `newState` n'est pas encore prêt.
        if (migratedData.player.resources) {
            // Création d'une fonction temporaire pour agir sur migratedData
            const mergeForMigration = (playerResources) => {
                const corrections = { "Coeur de Golem": "coeur_de_golem", "Essence Spectrale": "essence_spectrale", "Chitine Renforcée": "chitine_renforcee", "Plume de Griffon": "plume_de_griffon", "Sang de Basilic": "sang_de_basilic", "Oeil de Chimère": "oeil_de_chimere", "Écaille de Profond": "ecaille_de_profond", "Totem Orc": "totem_orc", "Fragment d'Âme de Démon": "fragment_d_ame_de_demon", "Coeur de Dragon Ancien": "coeur_de_dragon_ancien", "Larme d'Archange": "larme_d_archange", "Poussière de Vide": "poussiere_de_vide", "Herbes Médicinales": "herbes_medicinales" };
                for (const oldKey in corrections) {
                    if (playerResources[oldKey] !== undefined) {
                        const newKey = corrections[oldKey];
                        playerResources[newKey] = (playerResources[newKey] || 0) + playerResources[oldKey];
                        delete playerResources[oldKey];
                    }
                }
            };
            mergeForMigration(migratedData.player.resources);
        }

        const allResourceKeys = ['bois', 'metal', 'tissu', 'marques_de_chasse', 'marques_de_guilde', 'bounty_tokens', 'cle_de_la_breche', 'eclats_instables', 'eclats_ascension', 'herbes_medicinales', 'coeur_de_golem', 'chitine_renforcee', "larme_d_archange", 'sang_de_basilic', 'oeil_de_chimere', 'poussiere_de_vide', 'essence_spectrale', 'plume_de_griffon', 'ecaille_de_profond', 'totem_orc', "fragment_d_ame_de_demon", 'coeur_de_dragon_ancien', 'Cristal de Givre', 'Fleur de Lave', 'Graine Solaire', 'Racine Terreuse', 'Tournesol Radieux', 'Lys de Givre', 'Champignon Terreux', 'Fleur de Rosée', 'Rose Sanguine','essence_dissonante', 'essence_dissonante_pure'];
        const completeResources = {};
        allResourceKeys.forEach(key => {
            completeResources[key] = 0;
        });

        migratedData.player.resources = { ...completeResources, ...migratedData.player.resources };
        
        const allSetItems = [];
        for (const setKey in SETS_DB) {
            const set = SETS_DB[setKey];
            set.items.forEach(itemData => allSetItems.push({ 
                ...itemData, 
                id: itemData.nameKey,
                rarity: set.rarity, 
                isSetItem: true, 
                setKey: setKey 
            }));
        }
        const allArtefacts = Object.values(ARTEFACTS_DB);
        const ALL_ITEMS_DATABASE = [...ITEMS_DB, ...allSetItems, ...allArtefacts];
        const hydrateItem = (lightItem) => {
            if (!lightItem || !lightItem.id) return null;
            const fullItemData = ALL_ITEMS_DATABASE.find(dbItem => dbItem.id === lightItem.id);
            if (!fullItemData) { console.error(`[Hydratation ECHEC] Objet introuvable : ID "${lightItem.id}". Supprimé.`); return null; }
            return { ...fullItemData, ...lightItem };
        };

        if (typeof migratedData.player.energy === 'undefined') {
            migratedData.player.maxEnergy = 200;
            migratedData.player.energy = migratedData.player.maxEnergy;
            migratedData.player.lastEnergyRegenTime = Date.now();
        }

        newState.player = { ...migratedData.player, achievementBonuses: migratedData.player.achievementBonuses || {} };
        if (newState.player.inventory && Array.isArray(newState.player.inventory)) {
            newState.player.inventory = newState.player.inventory.map(hydrateItem).filter(item => item !== null);
        }
        if (newState.player.equipment) {
            for (const slot in newState.player.equipment) {
                const lightItem = newState.player.equipment[slot];
                if (lightItem) newState.player.equipment[slot] = hydrateItem(lightItem);
            }
        }
    }
    
    if (newState.fief && newState.fief.garden) {
        if (typeof newState.fief.garden.seed_inventory === 'undefined') {
            newState.fief.garden.seed_inventory = {};
        }
        if (newState.fief.garden.unlocked_seeds) {
            delete newState.fief.garden.unlocked_seeds;
        }
    }
    if (newState.player) {
        if (typeof newState.player.maxResources === 'undefined') {
            newState.player.maxResources = 10000;
        }
        
        // MON COMMENTAIRE : C'est ici que se trouve la correction pour les vies.
        // On vérifie si la propriété 'lives' n'existe pas (pour les anciennes sauvegardes) et on l'initialise.
        if (typeof newState.player.lives === 'undefined') {
            newState.player.lives = 3;
            newState.player.maxLives = 3;
            newState.player.lastLifeRegenTime = 0;
        }

        updatePlayerMaxResources(newState);

        EQUIPMENT_SLOTS.forEach(slot => { if (newState.player.equipment[slot] === undefined) newState.player.equipment[slot] = null; });
        if (typeof newState.player.resources === 'number') { newState.player.resources = { bois: newState.player.resources, metal: 0, tissu: 0 }; }
        if (newState.player.inventory && Array.isArray(newState.player.inventory)) { newState.player.inventory = newState.player.inventory.map(item => (item && !item.uid) ? { ...item, uid: generateUID() } : item); }
        if (newState.player.equipment) { for (const slot in newState.player.equipment) { if (newState.player.equipment[slot] && !newState.player.equipment[slot].uid) newState.player.equipment[slot].uid = generateUID(); } }
        if (!newState.player.consumables) newState.player.consumables = {};
        if (newState.player.resources && typeof newState.player.resources.cle_de_la_breche === 'undefined') newState.player.resources.cle_de_la_breche = 3;
        if (newState.player.resources && typeof newState.player.resources.eclats_instables === 'undefined') newState.player.resources.eclats_instables = 0;
        newState.player.traits = newState.player.traits || [];
        newState.player.collectedCards = newState.player.collectedCards || [];
    }

    return newState;
}

function updatePlayerMaxResources(state = gameState) {
    if (!state.player) return; // Sécurité pour ne rien faire si le joueur n'existe pas

    const entrepotLevel = state.fief.buildings.entrepot || 0;
    if (entrepotLevel > 0) {
        state.player.maxResources = FIEF_DB.entrepot.upgrades[entrepotLevel - 1].capacity;
    } else {
        state.player.maxResources = 10000; // Capacité de base
    }
}


function loadGame() {
    const savedData = localStorage.getItem('incrementalGameSave');
    if (savedData) {
        try {
            let parsedData = JSON.parse(savedData);

            if (parsedData.adventure && parsedData.adventure.completedNodes['A1_N8_ALCHIMISTE'] && (!parsedData.unlockedFeatures || !parsedData.unlockedFeatures.alchemist)) {
                if (!parsedData.unlockedFeatures) {
                    parsedData.unlockedFeatures = {}; 
                }
                parsedData.unlockedFeatures.alchemist = true;
                console.log("Correctif rétroactif (local) : Alchimiste débloqué.");
            }

            gameState = createGameStateFromSave(parsedData);

            if (gameState.stats && gameState.stats.totalFragmentsEarned < 0) {
                console.log(`[Correctif] Valeur négative détectée pour 'totalFragmentsEarned' (${gameState.stats.totalFragmentsEarned}). Inversion...`);
                gameState.stats.totalFragmentsEarned *= -1;
                checkSucces('FRAGMENTS_EARNED', { total: gameState.stats.totalFragmentsEarned });
                saveGame();
                console.log(`[Correctif] Valeurs corrigées : totalFragmentsEarned=${gameState.stats.totalFragmentsEarned}, progresSucces=${gameState.stats.succesProgress['ROI_DU_FRAGMENT']}`);
            }

        } catch (e) {
            console.error(t('alerts.parsing_error'), e);
            resetGame();
            return;
        }

        if (gameState.player) {
            // Logique d'initialisation (avant affichage)
            if (gameState.isPostAscension) {
                document.getElementById('character-creation').style.display = 'none';
                openConstellationUI(); 
                return; 
            }
            if (!gameState.player.class) showClassChoiceModal();
            checkAndResizeGardenOnLoad();
            unequipInvalidItems(); 
            recalculateTotalStats();
            generateFiefConsumable();
            generateDailyBounties();

            const maxLevel = getMaxLevelForAscension(gameState.ascensionLevel || 0);
            if (gameState.player.level > maxLevel) {
                gameState.player.level = maxLevel;
                recalculateXpToNextLevel();
                gameState.player.xp = gameState.player.xpToNextLevel;
            }
            if (gameState.isChoosingTrait && gameState.traitSelectionOptions) {
                if (window.gameLoopInterval) clearInterval(window.gameLoopInterval);
                displayTraitSelectionModal(gameState.traitSelectionOptions).then(() => {
                    startGameLoop();
                });
            }

            // Correction : On affiche l'écran de jeu principal AVANT de gérer les états spécifiques.
            document.getElementById('character-creation').style.display = 'none';
            document.getElementById('game-screen').style.display = 'block';

            // On gère les états spécifiques (rechargement en combat, en repos, etc.)
            if (gameState.inCombat) {
                // MON COMMENTAIRE : C'est ici que se trouve la correction.
                // Au lieu d'appeler directement handlePlayerDeath, on appelle endCombat avec le paramètre de défaite.
                // Cela garantit que toute la logique de fin de combat (y compris l'affichage des bonnes options de mort) est respectée.
                showCustomAlert(t('alerts.combat_quit')).then(() => {
                    endCombat(false, true); // On simule une défaite, pas une fuite.
                });
            } else if (gameState.isResting) {
                startDeathCooldownTimer();
            } else if (gameState.isOnExpedition && !gameState.isInDungeon) {
                showCustomAlert(t('alerts.expedition_quit'));
                gameState.isOnExpedition = false;
                gameState.expedition = null;
                gameState.currentEvent = null;
                gameState.expeditionCache = null;
            } else if (gameState.isInDungeon) {
                if (gameState.playerCurrentHP <= 0) {
                    handlePlayerDeath();
                    // On met un return ici car handlePlayerDeath gère déjà tout pour le donjon
                    return; 
                }
            }
            
            // On restaure les PV/Mana uniquement si le joueur n'est ni en combat, ni en repos.
            if (!gameState.isResting && !gameState.inCombat) {
                if (!(gameState.playerCurrentHP > 0)) {
                   gameState.playerCurrentHP = gameState.player.currentMaxHP;
                }
                if (!(gameState.playerCurrentMana > 0) && gameState.player.maxMana > 0) {
                    gameState.playerCurrentMana = gameState.player.maxMana;
                }
            }
            
            // Logique de fin d'initialisation de l'UI
            switchScreen('aventure');
            switchAdventureTab('aventure');

            if (gameState.currentExpeditions && gameState.currentExpeditions.length > 0) {
                displayExpeditions();
            } else {
                generateExpeditions();
            }
            
            updateGameUI();
            checkEquippedSetsForAchievement();
            checkAndGrantDailyDungeonKey();
            validateLegacyAchievements();
            updateAchievementNotification();
            setTimeout(renderAdventureMap, 100);

            if (gameState.isInDungeon) {
                // MON COMMENTAIRE : On remplace l'ancien appel par la bonne fonction
                switchAdventureTab('dungeon');
                showToast(t('alerts.dungeon_resume'), "success");
                restoreDungeonState();
            } else if (gameState.isOnPatrol) {
                // MON COMMENTAIRE : On remplace l'ancien appel par la bonne fonction
                switchAdventureTab('patrol');
            } else {
                // MON COMMENTAIRE : On remplace l'ancien appel par la bonne fonction
                switchAdventureTab('aventure');
            }
            if (gameState.unlockedFeatures.village) {
                togglePanel('village');
            } else {
                togglePanel('codex'); 
            }

            // On lance la boucle de jeu à la toute fin.
            startGameLoop();
        }
    }
}

async function resetGame() {
    const confirmed = await showResetConfirm();

    if (confirmed) {
        if (window.gameLoopInterval) {
            clearInterval(window.gameLoopInterval);
        }

        // On supprime d'abord la sauvegarde locale
        localStorage.removeItem('incrementalGameSave');
        
        const user = window.firebaseTools.auth.currentUser;
        try {
            if (user) {
                const { db, doc, deleteDoc, auth, signOut } = window.firebaseTools;
                // On attend que la suppression des données soit terminée
                await deleteDoc(doc(db, "players", user.uid));
                console.log("Sauvegarde serveur supprimée avec succès.");

                // ==================== DÉBUT DE LA MODIFICATION ====================
                // On déconnecte l'utilisateur pour assurer une réinitialisation complète
                await signOut(auth);
                console.log("Utilisateur déconnecté pour finaliser la réinitialisation.");
                // ===================== FIN DE LA MODIFICATION =====================
            }
            
            gameState = JSON.parse(JSON.stringify(initialGameState));
            await showCustomAlert(t('alerts.game_reset'));
            window.location.reload();

        } catch (error) {
            console.error("Erreur critique lors de la réinitialisation :", error);
            await showCustomAlert("La réinitialisation de la sauvegarde en ligne a échoué. Veuillez vérifier votre connexion et réessayer.");
        }
    }
}

function formatDuration(ms) {
    if (ms <= 0) return "0s";
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    let parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
    
    return parts.join(' ');
}

// =================================================================================
// BOUCLE DE JEU & LOGIQUE CENTRALE
// =================================================================================

let gameLoopInterval = null;
let autoSaveTimer = 0;

function startGameLoop() {
    if (gameLoopInterval) clearInterval(gameLoopInterval);

    gameLoopInterval = setInterval(() => {
        if (!gameState.player) return;
        checkAndResetDailyMissions();
        if (gameState.isResting) {
            return;
        }
        updateConstructionTimers();
        document.querySelectorAll('.construction-timer').forEach(timerEl => {
            const endTime = parseInt(timerEl.dataset.constructionEnd, 10);
            if (isNaN(endTime)) return;

            const timeLeftMs = Math.max(0, endTime - Date.now());
            const hours = Math.floor(timeLeftMs / 3600000).toString().padStart(2, '0');
            const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
            const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
            timerEl.textContent = `${hours}:${minutes}:${seconds}`;
        });

        updateSeason();
        const player = gameState.player;
        if (player.energy < player.maxEnergy) {
            const now = Date.now();
            const timeSinceLastRegen = now - (player.lastEnergyRegenTime || now);
            const energyToRegen = Math.floor(timeSinceLastRegen / (ENERGY_REGEN_SECONDS * 1000));

            if (energyToRegen > 0) {
                player.energy = Math.min(player.maxEnergy, player.energy + energyToRegen);
                player.lastEnergyRegenTime += energyToRegen * (ENERGY_REGEN_SECONDS * 1000);
                isDirty = true;
                updateGameUI();
            }
        }
        
        if (player.lives < player.maxLives) {
            const now = Date.now();
            const timeSinceLastLifeRegen = now - (player.lastLifeRegenTime || now);
            const lifeRegenMinutes = 20;
            const lifeRegenMs = lifeRegenMinutes * 60 * 1000;

            if (timeSinceLastLifeRegen >= lifeRegenMs) {
                const livesToRegen = Math.floor(timeSinceLastLifeRegen / lifeRegenMs);
                const previousLives = player.lives;
                player.lives = Math.min(player.maxLives, player.lives + livesToRegen);
                
                player.lastLifeRegenTime += livesToRegen * lifeRegenMs;
                
                if (player.lives > previousLives) {
                    showToast(t('alerts.death.life_regained', { count: player.lives }), 'success');
                    isDirty = true;
                    updateGameUI();
                }
            }
        } else {
            player.lastLifeRegenTime = Date.now();
        }
        
        // MON COMMENTAIRE : Mise à jour de l'affichage des vies et du minuteur
        const livesCountEl = document.getElementById('header-lives-count');
        const livesTimerEl = document.getElementById('header-lives-timer');
        if(livesCountEl && livesTimerEl) {
            livesCountEl.textContent = `${player.lives}/${player.maxLives}`;
            if (player.lives >= player.maxLives) {
                livesTimerEl.textContent = t('ui.stamina.full');
            } else {
                const now = Date.now();
                const lifeRegenMs = 20 * 60 * 1000;
                const nextRegenTime = (player.lastLifeRegenTime || now) + lifeRegenMs;
                const timeLeftMs = Math.max(0, nextRegenTime - now);
                const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
                const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
                livesTimerEl.textContent = t('ui.lives.next_in', { minutes: minutes, seconds: seconds });
            }
        }


        const timerSpan = document.getElementById('energy-timer');
        if (timerSpan) {
            if (player.energy >= player.maxEnergy) {
                timerSpan.textContent = t('ui.stamina.full');
            } else {
                const now = Date.now();
                const nextRegenTime = (player.lastEnergyRegenTime || now) + (ENERGY_REGEN_SECONDS * 1000);
                const timeLeftMs = Math.max(0, nextRegenTime - now);
                const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
                const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
                timerSpan.textContent = `(+1 in ${minutes}:${seconds})`;
            }
        }

        autoSaveTimer++;
        if (autoSaveTimer >= 30) {
            saveGame();
            autoSaveTimer = 0;
            console.log("Partie sauvegardée automatiquement.");
            checkUnreadMail();
        }

        if (gameState.isOnPatrol) {
            const now = Date.now();
            const timeLeftMs = Math.max(0, gameState.patrolEndTime - now);

            if (timeLeftMs === 0) {
                updatePatrolUI();
            } else {
                const hours = Math.floor(timeLeftMs / (1000 * 60 * 60)).toString().padStart(2, '0');
                const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000).toString().padStart(2, '0');
                
                const timerSpan = document.getElementById('patrol-time-left');
                if(timerSpan) timerSpan.textContent = `${hours}:${minutes}:${seconds}`;
            }
        }
        
        const bountyView = document.getElementById('bounty-view');
        if (bountyView && !bountyView.classList.contains('hidden')) {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let nextRefreshPoint;

            if (now.getHours() < 8) {
                nextRefreshPoint = new Date(today.setHours(8, 0, 0, 0));
            } else if (now.getHours() < 16) {
                nextRefreshPoint = new Date(today.setHours(16, 0, 0, 0));
            } else {
                nextRefreshPoint = new Date(today.setDate(today.getDate() + 1));
                nextRefreshPoint.setHours(0, 0, 0, 0);
            }

            const timeLeftMs = Math.max(0, nextRefreshPoint.getTime() - now.getTime());
            const hours = Math.floor(timeLeftMs / (1000 * 60 * 60)).toString().padStart(2, '0');
            const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000).toString().padStart(2, '0');
            
            const timerSpan = document.getElementById('bounty-time-left');
            if(timerSpan) timerSpan.textContent = `${hours}:${minutes}:${seconds}`;
        }
        
        if (!gameState.inCombat && !gameState.isOnExpedition && !gameState.isOnPatrol && !gameState.isInDungeon) {
            if (player && player.totalStats) {
                const regenAmount = player.totalStats.RegenHP || 0;

                if (player.currentMaxHP && gameState.playerCurrentHP < player.currentMaxHP) {
                    gameState.playerCurrentHP = Math.min(
                        player.currentMaxHP,
                        gameState.playerCurrentHP + regenAmount
                    );
                    const hpFill = document.getElementById('main-player-hp-fill');
                    const hpDisplay = document.getElementById('main-player-hp-display');
                    if (hpFill && hpDisplay) {
                       hpFill.style.width = `${(gameState.playerCurrentHP / player.currentMaxHP) * 100}%`;
                       hpDisplay.textContent = Math.round(gameState.playerCurrentHP);
                    }
                }

                let manaRegenAmount = 1 + Math.floor(player.totalStats.Intelligence / 10);
                if (player.totalStats.mana_regen_percent) {
                    manaRegenAmount *= (1 + player.totalStats.mana_regen_percent / 100);
                }
                manaRegenAmount = Math.floor(manaRegenAmount);

                if (player.maxMana && gameState.playerCurrentMana < player.maxMana) {
                    gameState.playerCurrentMana = Math.min(
                        player.maxMana,
                        gameState.playerCurrentMana + manaRegenAmount
                    );
                    const manaFill = document.getElementById('mana-fill');
                    const manaDisplay = document.getElementById('main-player-mana-display');
                    if (manaFill && manaDisplay) {
                    manaFill.style.width = `${(gameState.playerCurrentMana / player.maxMana) * 100}%`;
                    manaDisplay.textContent = Math.round(gameState.playerCurrentMana);
                    }
                }
            }
        }
		updateRefreshButtonUI();
        updateDungeonKeyTimer();
        checkFiefNotifications();
    }, 1000);
}

function handlePlayerDeath(durationInSeconds = 60) {
    console.log(`[DEATH] Déclenchement de handlePlayerDeath. Durée de base: ${durationInSeconds}s`);

    checkSucces('PLAYER_DEATH');
    if (gameState.isResting) {
        console.warn('[DEATH] Déjà en état de repos, annulation.');
        return;
    }

    // MON COMMENTAIRE : C'est la ligne qui corrige le bug.
    // On définit immédiatement l'état de repos. Ainsi, la fonction updateGameUI()
    // ne cachera plus l'écran de mort juste après son affichage.
    gameState.isResting = true;

    gameState.stats.playerDeaths = (gameState.stats.playerDeaths || 0) + 1;
    window.scrollTo(0, 0);

    const wasInCombat = gameState.inCombat;
    gameState.inCombat = false;
    gameState.isOnExpedition = false;

    if (wasInCombat && gameState.isInDungeon) {
        handleDungeonCombatLoss();
        return;
    }
   
    document.getElementById('expedition-event-modal').style.display = 'none';
    document.getElementById('combat-section').classList.add('hidden');
    
    document.getElementById('death-overlay').style.display = 'flex';
    
    // Met à jour l'UI de la modale de mort en fonction des vies, etc.
    updateDeathScreenUI(durationInSeconds);

    updateGameUI();
    saveGame();
}

function updateDeathScreenUI(durationInSeconds) {
    const player = gameState.player;
    const timerContainer = document.getElementById('death-timer-container');
    const optionsContainer = document.getElementById('death-options-container');
    const noLivesInfo = document.getElementById('no-lives-info'); // Nouvel élément
    const reviveWithLifeBtn = document.getElementById('revive-with-life-button');
    const reviveWithAdBtn = document.getElementById('revive-with-ad-button');
    const bypassWithEaBtn = document.getElementById('bypass-death-penalty-button');
    
    if (!timerContainer || !optionsContainer || !reviveWithLifeBtn || !reviveWithAdBtn || !bypassWithEaBtn || !noLivesInfo) {
        console.error("Un ou plusieurs éléments de l'écran de mort sont introuvables.");
        return;
    }

    setText('#death-title-text', 'ui.death.title');
    setText('#death-description-text', 'ui.death.description_options');
    checkAndResetDailyAds(); 

    timerContainer.classList.remove('hidden');

    const adsAvailable = (gameState.dailyAdViews.revive || 0) < 3;
    reviveWithAdBtn.innerHTML = t('ui.buttons.revive_with_ad', { count: 3 - (gameState.dailyAdViews.revive || 0) });
    reviveWithAdBtn.onclick = () => watchAdForRevive();
    reviveWithAdBtn.disabled = !adsAvailable;

    const cost = 25;
    const ea_icon = `<img src="assets/sprites/ressources/eclats_ascension.png" class="icon-sprite-small" alt="EA">`;
    bypassWithEaBtn.innerHTML = t('ui.buttons.bypass_death_penalty', { cost: cost, ea_icon: ea_icon });
    bypassWithEaBtn.disabled = (player.resources.eclats_ascension || 0) < cost;

    if (player.lives > 0) {
        optionsContainer.classList.remove('hidden');
        noLivesInfo.classList.add('hidden');
        bypassWithEaBtn.classList.add('hidden');
        reviveWithAdBtn.classList.remove('hidden'); // S'assure que le bouton pub est visible
        reviveWithLifeBtn.innerHTML = t('ui.buttons.revive_with_life', { count: player.lives });
        reviveWithLifeBtn.onclick = () => useLifeToRevive();
        reviveWithLifeBtn.disabled = false;
    } else {
        optionsContainer.classList.add('hidden');
        noLivesInfo.classList.remove('hidden');
        bypassWithEaBtn.classList.remove('hidden');
        reviveWithAdBtn.classList.remove('hidden'); // S'assure que le bouton pub est aussi visible ici
        
        // Logique pour le minuteur de la prochaine vie
        const nextLifeTime = (player.lastLifeRegenTime || Date.now()) + (20 * 60 * 1000);
        const timeLeftMs = Math.max(0, nextLifeTime - Date.now());
        const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
        setText('#no-lives-text', 'ui.death.no_lives_info', { minutes: minutes, seconds: seconds });
    }
    
    startDeathCooldownTimer(durationInSeconds);
}

window.useLifeToRevive = function() {
    if (gameState.player.lives > 0) {
        gameState.player.lives--;
        showToast(t('alerts.death.life_used'), 'success');
        // MON COMMENTAIRE : Appel direct à revivePlayer() pour une résurrection instantanée.
        revivePlayer();
    }
}

window.watchAdForRevive = async function() {
    checkAndResetDailyAds();
    // On ajoute une nouvelle catégorie 'revive' dans les stats de pubs
    if ((gameState.dailyAdViews.revive || 0) >= 3) {
        showToast(t('alerts.ads.limit_reached'), 'error');
        return;
    }

    showToast(t('alerts.ads.watch_prompt'), 'system-message', 4000);
    await new Promise(resolve => setTimeout(resolve, 4000)); 
    showToast(t('alerts.ads.reward_granted'), 'success');

    gameState.dailyAdViews.revive = (gameState.dailyAdViews.revive || 0) + 1;
    revivePlayer();
}


window.revivePlayer = function() {
    if (deathTimerInterval) clearInterval(deathTimerInterval);
    deathTimerInterval = null;

    gameState.isResting = false;
    gameState.playerCurrentHP = gameState.player.currentMaxHP;
    gameState.playerCurrentMana = gameState.player.maxMana;
    
    console.log("[RESTING] Joueur réanimé.");
    
    restorePreCombatUI(); 
    
    updateGameUI();
    saveGame();
}

/**
 * Gère le paiement en EA pour passer le temps de repos.
 */
window.bypassDeathPenalty = async function() {
    const cost = 25; // Coût en Éclats d'Ascension
    if ((gameState.player.resources.eclats_ascension || 0) < cost) {
        showToast(t('ui.profile.not_enough_shards'), 'error');
        return;
    }

    const confirmed = await showCustomConfirm(
        t('alerts.death.bypass_confirm', { cost: cost }),
        t('ui.buttons.confirm_generic'),
        t('ui.buttons.cancel')
    );

    if (confirmed) {
        gameState.player.resources.eclats_ascension -= cost;
        showToast(t('alerts.death.bypass_success'), 'success');
        revivePlayer(); // Appelle la nouvelle fonction centralisée
    }
}

function startDeathCooldownTimer(durationInSeconds) {
    let finalDuration = durationInSeconds;
    const infirmeryLevel = gameState.fief.buildings.infirmerie || 0;
    
    // Ne réduit pas la pénalité de 10s si on a utilisé une vie
    if (infirmeryLevel > 0 && durationInSeconds > 10) { 
        const reductionPercent = FIEF_DB.infirmerie.upgrades[infirmeryLevel - 1].reduction;
        finalDuration *= (1 - reductionPercent / 100);
        showToast(t('alerts.infirmery_bonus', { reductionPercent: reductionPercent }), 'success');
    }

    gameState.isResting = true;
    gameState.restEndTime = Date.now() + (finalDuration * 1000);

    if (deathTimerInterval) clearInterval(deathTimerInterval);

    deathTimerInterval = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.round((gameState.restEndTime - now) / 1000);

        if (timeLeft <= 0) {
            revivePlayer();
        } else {
            const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
            const seconds = (timeLeft % 60).toString().padStart(2, '0');
            const timerEl = document.getElementById('death-timer');
            if (timerEl) timerEl.textContent = `${minutes}:${seconds}`;
        }
    }, 1000);
}

function recalculateXpToNextLevel() {
    const player = gameState.player;
    if (!player) return;

    const mult = 1.36;
    const a = 0.12;
    const xpLevel10 = Math.floor(100 * Math.pow(mult, 9));

    let next_q;
    if (player.level <= 150) {
        next_q = 1.15;
    } else if (player.level <= 200) {
        next_q = 1.25;
    } else {
        next_q = 1.35;
    }

    if (player.level <= 10) {
        // Pour les premiers niveaux, on recalcule depuis le début
        let xpNeeded = 100;
        for (let i = 1; i < player.level; i++) {
            xpNeeded = Math.floor(xpNeeded * mult);
        }
        player.xpToNextLevel = xpNeeded;
    } else {
        player.xpToNextLevel = Math.floor(
            xpLevel10 * Math.pow(1 + a * (player.level - 10), next_q)
        );
    }
}

async function checkForLevelUp() {
    const player = gameState.player;
    const maxLevel = getMaxLevelForAscension();
    
    if (player.level >= maxLevel) {
        player.xp = player.xpToNextLevel;
        updateGameUI();
        return;
    }

    while (player.xp >= player.xpToNextLevel) {
        if (player.level >= maxLevel) {
            player.xp = player.xpToNextLevel;
            break;
        }

        player.level++;
        checkSucces('LEVEL_UP', { classe: player.class, niveau: player.level });
        player.xp -= player.xpToNextLevel;

        recalculateXpToNextLevel();

        player.pointsToSpend += 2;

        if (hasConstellationTalent('destiny_stat_points_1') && player.level % 25 === 0) {
            player.pointsToSpend += 3;
            // CORRECTION
            showToast(t('alerts.talent_stat_bonus', { points: 3 }), "success");
        }
        
        // CORRECTION
        let alertMessage = t('alerts.level_up', { level: player.level, points: 2 });

        if (!gameState.isInDungeon) {
            gameState.playerCurrentHP = player.currentMaxHP;
            gameState.playerCurrentMana = player.maxMana;
            // CORRECTION
            alertMessage += t('alerts.hp_mana_restored');
        }
        await showCustomAlert(alertMessage);
        if (player.level % 50 === 0 && player.level > 0 && player.level <= 500) {
            if (window.gameLoopInterval) clearInterval(window.gameLoopInterval);
            await startTraitSelection();
            startGameLoop();
        }
    }
    updateSpendPointsFAB();
}

window.startPatrol = function(durationInHours) {
    if (gameState.isOnPatrol || gameState.isOnExpedition || gameState.inCombat || gameState.isResting) {
        // CORRECTION
        showCustomAlert(t('patrol.busy_message'));
        return;
    }

    const durationInMs = durationInHours * 60 * 60 * 1000;
    gameState.isOnPatrol = true;
    gameState.patrolStartTime = Date.now();
    gameState.patrolEndTime = Date.now() + durationInMs;

    // CORRECTION
    showToast(t('patrol.start_toast', { hours: durationInHours }));
    updateGameUI();
    saveGame();
}

/**
 * Gère la fin d'une patrouille et attribue les récompenses.
 */

async function endPatrol(isCancel = false) {
    const startTime = gameState.patrolStartTime || (gameState.patrolEndTime - (1 * 60 * 60 * 1000)); 
    const totalDurationInMs = gameState.patrolEndTime - startTime;
    const elapsedDurationInMs = isCancel ? (Date.now() - startTime) : totalDurationInMs;
    const patrolDurationInHours = elapsedDurationInMs / (1000 * 60 * 60);

    const powerScore = calculatePlayerPowerScore();

    const xpPerHour = 50 + (powerScore * 0.2);
    const resourcesPerHour = 100 + (powerScore * 0.4);

    let totalXpGained = Math.floor(xpPerHour * patrolDurationInHours);
    let totalResourcesGained = Math.floor(resourcesPerHour * patrolDurationInHours);

    const patrolBonusPercent = getConstellationBonus('stat_percent', 'patrol_reward_percent');
    const resourceBonusPercent = getConstellationBonus('stat_percent', 'resource_gain_percent');

    if (patrolBonusPercent > 0) {
        totalXpGained = Math.floor(totalXpGained * (1 + patrolBonusPercent / 100));
        totalResourcesGained = Math.floor(totalResourcesGained * (1 + patrolBonusPercent / 100));
    }
    if (resourceBonusPercent > 0) {
        totalResourcesGained = Math.floor(totalResourcesGained * (1 + resourceBonusPercent / 100));
    }

    const penalty = 0.25;
    if (isCancel) {
        totalXpGained = Math.floor(totalXpGained * (1 - penalty));
        totalResourcesGained = Math.floor(totalResourcesGained * (1 - penalty));
    }

    gameState.player.xp += totalXpGained;
    gameState.stats.totalXpGained = (gameState.stats.totalXpGained || 0) + totalXpGained;

    const resourceSplit = Math.floor(totalResourcesGained / 3);
    const resourcesToAdd = { 'bois': resourceSplit, 'metal': resourceSplit, 'tissu': resourceSplit };
    const resourcesThatHitCap = [];

    for (const resource in resourcesToAdd) {
        const result = addResource(resource, resourcesToAdd[resource]);
        if (result.isFull) {
            resourcesThatHitCap.push(t(`stats.displayNames.${resource}`));
        }
    }

    // CORRECTION : Utilisation des clés de traduction
    const reportTitle = isCancel ? t('patrol.report_title_interrupted') : t('patrol.report_title_completed');
    const penaltyText = isCancel ? t('patrol.penalty_text', { penalty: penalty * 100 }) : "";
    const report = `
        <h3>${reportTitle}</h3>
        ${penaltyText}
        <div class="report-section-title">${t('patrol.summary_title')}</div>
        <p class="report-reward-line reward-xp">${t('patrol.xp_gained')} <strong>${totalXpGained}</strong></p>
        <p class="report-reward-line reward-resource bois">${t('patrol.wood_reported')} <strong>${resourceSplit}</strong></p>
        <p class="report-reward-line reward-resource metal">${t('patrol.metal_reported')} <strong>${resourceSplit}</strong></p>
        <p class="report-reward-line reward-resource tissu">${t('patrol.cloth_reported')} <strong>${resourceSplit}</strong></p>
    `;

    await showCustomAlert(report);

    gameState.isOnPatrol = false;
    gameState.patrolEndTime = 0;
    gameState.patrolStartTime = 0;
    await checkForLevelUp();
    updateGameUI();
    saveGame();
}

async function cancelPatrol() {
    // CORRECTION
    const confirmed = await showCustomConfirm(t('patrol.cancel_confirm'));
    if (!confirmed) return;

    endPatrol(true); 
}

/**
 * Met à jour l'interface de la section de patrouille.
 */
function updatePatrolUI() {
    // ==================== DÉBUT DE LA MODIFICATION ====================
    // Ajout d'une protection pour éviter une erreur si le joueur n'est pas encore créé.
    if (!gameState.player) return;
    // ===================== FIN DE LA MODIFICATION =====================
    const patrolContainer = document.getElementById('patrol-section');
    if (!patrolContainer) return;

    // Utilisation des clés de traduction pour toute l'interface
    if (gameState.isOnPatrol && Date.now() >= gameState.patrolEndTime) {
        patrolContainer.innerHTML = `
            <h4>${t('patrol.ui_completed_title')}</h4>
            <p>${t('patrol.ui_completed_text')}</p>
            <button class="action-button" style="padding: 15px; font-size: 1.2em;" onclick="endPatrol()">${t('patrol.ui_completed_button')}</button>
        `;
    } 
    else if (gameState.isOnPatrol) {
        patrolContainer.innerHTML = `
            <h4>${t('patrol.ui_inprogress_title')}</h4>
            <div id="patrol-timer">
                <p>${t('patrol.ui_inprogress_timer')} <strong id="patrol-time-left">00:00:00</strong></p>
            </div>
            <button class="secondary-action-button" onclick="cancelPatrol()">${t('patrol.ui_inprogress_button')}</button>
        `;
    } 
    else {
        let patrolChoicesHtml = '';
        const patrolOptions = [1, 4, 8];
        patrolOptions.forEach(hours => {
            patrolChoicesHtml += `<button class="action-button" onclick="startPatrol(${hours})">${t('patrol.ui_start_button', {hours: hours})}</button>`;
        });

        patrolContainer.innerHTML = `
            <h4>${t('patrol.ui_start_title')}</h4>
            <p>${t('patrol.ui_start_text')}</p>
            <div id="patrol-choices">${patrolChoicesHtml}</div>
        `;
    }
}

// =================================================================================
// GESTION DU PERSONNAGE (STATS, EQUIPEMENT, ETC.)
// =================================================================================

async function createCharacter() {
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === "") {
        // CORRECTION
        showCustomAlert(t('alerts.enter_name'));
        return;
    }

    const selectedClassEl = document.querySelector('.class-choice.selected');
    if (!selectedClassEl) {
        // CORRECTION
        showCustomAlert(t('alerts.choose_class'));
        return;
    }
    const chosenClass = selectedClassEl.dataset.class;

    const user = window.firebaseTools.auth.currentUser;

    if (user) {
        const { db, doc, getDoc } = window.firebaseTools;
        const docSnap = await getDoc(doc(db, "players", user.uid));

        if (docSnap.exists()) {
            const serverData = docSnap.data();
            // CORRECTION
            const confirmed = await showCustomConfirm(
                t('alerts.overwrite_save_confirm', { name: serverData.player.name, level: serverData.player.level })
            );
            if (confirmed) {
                finalizeCharacterCreation(user.uid, chosenClass);
            }
        } else {
            finalizeCharacterCreation(user.uid, chosenClass);
        }
    } else {
        // CORRECTION
        const confirmed = await showCustomConfirm(t('alerts.guest_save_confirm'));
        if (confirmed) {
            finalizeCharacterCreation(null, chosenClass);
        }
    }
}

function finalizeCharacterCreation(userId, chosenClass) {
    const nameInput = document.getElementById('name');
    // MON COMMENTAIRE : J'ajoute les deux nouvelles essences de l'aventure pour que l'objet soit complet.
    const allResourceKeys = ['bois', 'metal', 'tissu', 'marques_de_chasse', 'marques_de_guilde', 'bounty_tokens', 'cle_de_la_breche', 'eclats_instables', 'eclats_ascension', 'herbes_medicinales', 'coeur_de_golem', 'chitine_renforcee', "larme_d_archange", 'sang_de_basilic', 'oeil_de_chimere', 'poussiere_de_vide', 'essence_spectrale', 'plume_de_griffon', 'ecaille_de_profond', 'totem_orc', "fragment_d_ame_de_demon", 'coeur_de_dragon_ancien', 'Cristal de Givre', 'Fleur de Lave', 'Graine Solaire', 'Racine Terreuse', 'Tournesol Radieux', 'Lys de Givre', 'Champignon Terreux', 'Fleur de Rosée', 'Rose Sanguine','essence_dissonante', 'essence_dissonante_pure'];
    const initialResources = {};
    allResourceKeys.forEach(key => {
        initialResources[key] = 0;
    });

    initialResources.bois = 10;
    initialResources.bounty_tokens = 2;
    initialResources.cle_de_la_breche = 3;
    gameState.saveVersion = SAVE_VERSION;
    gameState.player = {
        guildId: null, 
        guildContributions: 0,
        uid: generateUID(),
        name: nameInput.value.trim(),
        class: chosenClass,
        energy: 200,
        maxEnergy: 200,
        lastEnergyRegenTime: Date.now(), 
        maxResources: 10000,
        mana: 0,
        maxMana: 0, 
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        resources: initialResources,
        consumables: {},
        fragments: 0,
        baseStats: { ...gameState.baseStats },
        totalStats: {},
        equipment: {},
        inventory: [],
        pointsToSpend: 0,
        currentMaxHP: 0,
        achievementBonuses: {}, 
        killCount: {},
        traits: [], 
        collectedCards: [],
        combatBuffs: [],
        userId: userId,
        lives: 3,
        maxLives: 3,
        lastLifeRegenTime: 0
    };
    gameState.constellations = {
        destiny: { 'destiny_start': 1 }
    };
    const classKey = chosenClass.toLowerCase();
    gameState.constellations[classKey] = { [`${classKey}_start`]: 1 };
    for (const slot of EQUIPMENT_SLOTS) {
        gameState.player.equipment[slot] = null;
    }
    recalculateTotalStats();
    gameState.playerCurrentHP = gameState.player.currentMaxHP;
    gameState.playerCurrentMana = gameState.player.maxMana;
    
    document.body.classList.remove('creation-mode');
    document.getElementById("character-creation").style.display = "none";
    document.getElementById("game-screen").style.display = 'block';
    switchScreen('aventure');
    generateExpeditions();
    updateGameUI();
    saveGame();
    setTimeout(renderAdventureMap, 100); 
}

// game.js -> Ajouter une nouvelle fonction de confirmation avec des choix personnalisés
function showCustomConfirmWithChoices(message, choice1Text, choice2Text) {
    return new Promise(resolve => {
        const modal = document.getElementById('custom-confirm-modal');
        const text = document.getElementById('custom-confirm-text');
        const buttonsContainer = document.getElementById('custom-confirm-buttons');
        
        buttonsContainer.innerHTML = ''; // Nettoyer les anciens boutons

        const button1 = document.createElement('button');
        button1.textContent = choice1Text;
        button1.onclick = () => {
            modal.style.display = 'none';
            resolve(choice1Text); // Renvoie le texte du bouton cliqué
        };
        
        const button2 = document.createElement('button');
        button2.textContent = choice2Text;
        button2.onclick = () => {
            modal.style.display = 'none';
            resolve(choice2Text); // Renvoie le texte du bouton cliqué
        };
        
        buttonsContainer.appendChild(button1);
        buttonsContainer.appendChild(button2);
        
        text.innerHTML = message;
        modal.style.display = 'flex';
    });
}

window.adjustStat = function(statName, amount) {
    if (gameState.player === null) {
        if (statName === 'Défense') return;
        if (amount > 0 && gameState.availablePoints > 0) {
            gameState.baseStats[statName]++;
            gameState.availablePoints--;
        } else if (amount < 0 && gameState.baseStats[statName] > 0) {
            gameState.baseStats[statName]--;
            gameState.availablePoints++;
        }
        updateCreationUI();

    } else {
        if (amount > 0 && gameState.player.pointsToSpend > 0) {
            if (statName === "Défense") {
                const allowedDefense = Math.floor(gameState.player.level / 10);
                const currentDefense = gameState.player.baseStats["Défense"];
                if (currentDefense >= allowedDefense) {
                    // CORRECTION : Utilisation de la clé de traduction
                    showCustomAlert(t('alerts.defense_cap_reached'));
                    return;
                }
            }
            gameState.player.baseStats[statName]++;
            gameState.player.pointsToSpend--;
            recalculateTotalStats();
            if (statName === "Vie") {
                gameState.playerCurrentHP += 3;
            }
            updateGameUI();
            saveGame();
        }
    }
    const spendPointsModal = document.getElementById('spend-points-modal');
    if (spendPointsModal && !spendPointsModal.classList.contains('hidden')) {
        populateSpendPointsModal();
    }
    
    // On met à jour aussi le bouton flottant
    updateSpendPointsFAB();
};

function getGlobalStatBonus(statName) {
    let totalBonus = 0;
    const allEnemiesCount = Object.keys(ENEMIES_DB).length + BOSS_DB.length;

    for (const killThreshold in CODEX_MILESTONES_DB) {
        const tier = CODEX_MILESTONES_DB[killThreshold];
        const masteredCount = countMasteredEnemies(killThreshold);

        tier.milestones.forEach(milestone => {
            let required = milestone.requiredEnemies;
            if (required === 'all') {
                required = allEnemiesCount;
            }

            if (masteredCount >= required) {
                // On vérifie si la récompense est du bon type ET correspond au bon attribut
                if (milestone.reward.type === 'stat_flat' && milestone.reward.stat === statName) {
                    totalBonus += milestone.reward.value;
                }
            }
        });
    }
    return totalBonus;
}

function getConstellationBonus(bonusType, statKey) {
    let totalBonus = 0;
    if (!gameState.constellations || !gameState.player) return 0;

    // ▼▼▼ LA CORRECTION EST ICI ▼▼▼

    // On récupère la classe actuelle du joueur, en minuscule pour la comparaison
    const playerClass = gameState.player.class ? gameState.player.class.toLowerCase() : null;

    // On parcourt chaque arbre de constellation (destiny, guerrier, etc.)
    for (const treeKey in gameState.constellations) {

        // Si l'arbre n'est PAS l'arbre du Destin ET ne correspond PAS à la classe du joueur, on l'ignore.
        if (treeKey !== 'destiny' && treeKey !== playerClass) {
            continue; // Passe à l'arbre suivant
        }
        
    // ▲▲▲ FIN DE LA CORRECTION ▲▲▲

        const unlockedNodes = gameState.constellations[treeKey];
        const treeData = CONSTELLATIONS_DB[treeKey];
        if (!unlockedNodes || !treeData) continue;

        // On parcourt chaque talent débloqué dans l'arbre
        for (const nodeId in unlockedNodes) {
            const unlockedLevel = unlockedNodes[nodeId];
            const nodeData = treeData.nodes[nodeId];

            if (nodeData && nodeData.bonus && unlockedLevel > 0) {
                const bonus = nodeData.bonus;

                // Cas 1: Le bonus correspond exactement (type et stat)
                if (bonus.type === bonusType && bonus.stat === statKey) {
                    for (let i = 0; i < unlockedLevel; i++) {
                        totalBonus += bonus.value[i] || 0;
                    }
                }
                
                // Cas 2: Le talent a un deuxième bonus (comme Vie + Mana)
                if (bonus.type === bonusType && bonus.stat2 === statKey) {
                    for (let i = 0; i < unlockedLevel; i++) {
                        totalBonus += bonus.value2[i] || 0;
                    }
                }

                // Cas 3: Bonus "à tous les attributs" (ex: +1 à tout)
                if (bonus.type === 'stat_flat_all' && bonusType === 'stat_flat' && STAT_NAMES.includes(statKey)) {
                     for (let i = 0; i < unlockedLevel; i++) {
                        // AJOUT : Règle spéciale pour la Défense
                        if (statKey === 'Défense') {
                            totalBonus += (bonus.value[i] || 0) * 0.2;
                        } else {
                            totalBonus += bonus.value[i] || 0;
                        }
                        // FIN DE L'AJOUT
                    }
                }
                
                // Cas 4: Bonus "% à tous les attributs"
                if (bonus.type === 'stat_percent_all' && bonusType === 'stat_percent' && STAT_NAMES.map(s => s + '_percent').includes(statKey)) {
                     for (let i = 0; i < unlockedLevel; i++) {
                        totalBonus += bonus.value[i] || 0;
                    }
                }
            }
        }
    }
    return totalBonus;
}

function addResource(resourceType, amountToAdd) {
    const player = gameState.player;
    const storableResources = ['bois', 'metal', 'tissu'];

    if (storableResources.includes(resourceType)) {
        const currentAmount = player.resources[resourceType] || 0;
        const maxCapacity = player.maxResources || 10000;
        const availableSpace = maxCapacity - currentAmount;

        if (availableSpace <= 0) {
            updateGameUI(); 
            return { amountAdded: 0, isFull: true };
        }

        const amountActuallyAdded = Math.min(amountToAdd, availableSpace);
        player.resources[resourceType] += amountActuallyAdded;

        const isNowFull = (player.resources[resourceType] >= maxCapacity);
        
        updateGameUI(); 
        return { amountAdded: amountActuallyAdded, isFull: isNowFull };

    } else {
        if (resourceType === 'fragments') {
            player.fragments = (player.fragments || 0) + amountToAdd;
        } else {
            player.resources[resourceType] = (player.resources[resourceType] || 0) + amountToAdd;
        }
        
        // Cet appel est crucial : il nettoie les anciennes clés à chaque ajout.
        mergeLegacyRareResources();
        
        updateGameUI();

        return { amountAdded: amountToAdd, isFull: false };
    }
}

function mergeLegacyRareResources() {
    if (!gameState.player || !gameState.player.resources) {
        return;
    }

    const playerResources = gameState.player.resources;
    const resourceKeyCorrections = {
        "Coeur de Golem": "coeur_de_golem",
        "Essence Spectrale": "essence_spectrale",
        "Chitine Renforcée": "chitine_renforcee",
        "Plume de Griffon": "plume_de_griffon",
        "Sang de Basilic": "sang_de_basilic",
        "Oeil de Chimère": "oeil_de_chimere",
        "Écaille de Profond": "ecaille_de_profond",
        "Totem Orc": "totem_orc",
        "Fragment d'Âme de Démon": "fragment_d_ame_de_demon",
        "Coeur de Dragon Ancien": "coeur_de_dragon_ancien",
        "Larme d'Archange": "larme_d_archange",
        "Poussière de Vide": "poussiere_de_vide",
        "Herbes Médicinales": "herbes_medicinales"
    };

    for (const oldKey in resourceKeyCorrections) {
        if (playerResources[oldKey] !== undefined) {
            const newKey = resourceKeyCorrections[oldKey];
            playerResources[newKey] = (playerResources[newKey] || 0) + playerResources[oldKey];
            delete playerResources[oldKey];
        }
    }
}

function recalculateTotalStats() {
    const player = gameState.player;
    if (!player) return;

    const breakdown = {};
    const allPossibleStats = [...STAT_NAMES, ...Object.keys(t('stats.displayNames'))];
    allPossibleStats.forEach(stat => {
        breakdown[stat] = { base: 0, equipment: 0, affix: 0, set: 0, codex: 0, derived: 0, succes: 0, ascension: 0, constellation: 0, trait: 0, total: 0 };
    });

    const sources = [
        { source: player.baseStats, breakdownKey: 'base' },
        { source: player.achievementBonuses, breakdownKey: 'succes' },
        { source: player.traitBonuses, breakdownKey: 'trait' }
    ];
    for (const slot of EQUIPMENT_SLOTS) {
        const item = player.equipment[slot];
        if (item) {
            if (item.stats) sources.push({ source: item.stats, breakdownKey: 'equipment' });
            if (item.enchanter?.rolledStats) sources.push({ source: item.enchanter.rolledStats, breakdownKey: 'affix' });
        }
    }
    const equippedSets = {};
    for (const slot of EQUIPMENT_SLOTS) {
        const item = player.equipment[slot];
        if (item?.isSetItem) equippedSets[item.setKey] = (equippedSets[item.setKey] || 0) + 1;
    }
    for (const setKey in equippedSets) {
        const count = equippedSets[setKey];
        if (!SETS_DB[setKey]?.bonuses) continue;
        for (const requiredCount in SETS_DB[setKey].bonuses) {
            if (count >= requiredCount) {
                sources.push({ source: SETS_DB[setKey].bonuses[requiredCount].stats, breakdownKey: 'set' });
            }
        }
    }
    sources.forEach(({ source, breakdownKey }) => {
        if (!source) return;
        for (const stat in source) {
            if (breakdown[stat]) breakdown[stat][breakdownKey] += source[stat];
        }
    });

    player.totalStats = {};
    for (const stat of STAT_NAMES) {
        let totalFlat = 0;
        totalFlat += breakdown[stat].base;
        totalFlat += getConstellationBonus('stat_flat', stat);
        totalFlat += getGlobalCodexBonus(stat);
        const ascensionBonus = Math.floor(breakdown[stat].base * ((gameState.ascensionLevel || 0) * 0.05));
        breakdown[stat].ascension = ascensionBonus;
        totalFlat += ascensionBonus;
        totalFlat += (breakdown[stat].equipment || 0) + (breakdown[stat].affix || 0) + (breakdown[stat].set || 0) + (breakdown[stat].succes || 0) + (breakdown[stat].trait || 0);
        player.totalStats[stat] = totalFlat;
    }

    for (const stat of STAT_NAMES) {
        let totalPercentBonus = 0;
        const percentStatKey = `${stat}_percent`;
        
        const traitPercentBonus = breakdown[percentStatKey]?.trait || 0;
        if (traitPercentBonus !== 0) {
            const traitFlatBonus = Math.floor(player.totalStats[stat] * (traitPercentBonus / 100));
            breakdown[stat].traitFromPercent = traitFlatBonus; 
        }

        if (breakdown[percentStatKey]) {
            totalPercentBonus += (breakdown[percentStatKey].equipment || 0) + (breakdown[percentStatKey].affix || 0) + (breakdown[percentStatKey].set || 0) + (breakdown[percentStatKey].succes || 0) + (breakdown[percentStatKey].trait || 0);
        }
        totalPercentBonus += getConstellationBonus('stat_percent', percentStatKey) + getConstellationBonus('stat_percent_all', percentStatKey);
        
        if (totalPercentBonus !== 0) {
            const bonusAmount = Math.floor(player.totalStats[stat] * (totalPercentBonus / 100));
            player.totalStats[stat] += bonusAmount;
            breakdown[stat].percentBonusTotal = bonusAmount;
        }
    }

    breakdown.RegenHP.derived = (player.totalStats.Force || 0) / 10;
    breakdown.CritChance.derived = 3.75 * Math.sqrt(player.totalStats.Chance || 0);
    breakdown.evasion_chance_percent.derived = 0.15 * Math.sqrt(player.totalStats.Agilité || 0);
    const effectiveChanceStat = Math.max(0, Math.min(player.totalStats.Chance || 0, 300));
    breakdown.LootBonusPercent.derived = 100 * Math.sqrt(effectiveChanceStat / 300);
    breakdown.xp_gain_percent.derived = 5 * Math.sqrt(player.totalStats.Intelligence || 0);
    // NOUVEAU : On sépare la base (175) du bonus dérivé de l'Agilité.
    breakdown.CritDamage.base = 175;
    breakdown.CritDamage.derived = 0.5 * Math.sqrt(player.totalStats.Agilité || 0);
    breakdown.armor_shred_percent.derived = 0.5 * Math.sqrt(player.totalStats.Force || 0);
    breakdown.resistance_percent.derived = 0.3 * Math.sqrt(player.totalStats.Intelligence || 0);
    
    // NOUVEAU : On s'assure que 'evasion_chance_percent' est bien dans la liste.
    const derivedStats = ['RegenHP', 'CritChance', 'LootBonusPercent', 'xp_gain_percent', 'CritDamage', 'armor_shred_percent', 'resistance_percent', 'evasion_chance_percent'];
    derivedStats.forEach(statKey => {
        const sources = breakdown[statKey];
        let total = 0;
        for (const source in sources) {
            if (source !== 'total' && source !== 'percentBonusTotal') total += sources[source];
        }
        player.totalStats[statKey] = total;
    });

    for (const statKey in breakdown) {
        if (player.totalStats[statKey] === undefined) {
            const sources = breakdown[statKey];
            let total = 0;
            for (const source in sources) {
                if (source !== 'total') total += sources[source];
            }
            player.totalStats[statKey] = total;
        }
    }
    
    if (player.statusEffects) {
        player.statusEffects.forEach(effect => {
            if (effect.type === 'buff') {
                if (effect.value) player.totalStats[effect.stat] = (player.totalStats[effect.stat] || 0) + effect.value;
                if (effect.value_percent) {
                    const baseValueForPercent = player.totalStats[effect.stat] || 0;
                    player.totalStats[effect.stat] += Math.floor(baseValueForPercent * (effect.value_percent / 100));
                }
            }
        });
    }
    const artefact = player.equipment['Artefact'];
    if (artefact?.modifiers) {
        for (const modifier in artefact.modifiers) player.totalStats[modifier] = (player.totalStats[modifier] || 0) + artefact.modifiers[modifier];
    }
    if (gameState.dungeonBuffs) {
        gameState.dungeonBuffs.forEach(buff => player.totalStats[buff.stat] = (player.totalStats[buff.stat] || 0) + buff.value);
    }
    if (player.combatBuffs && player.combatBuffs.length > 0) {
        player.combatBuffs.forEach(buff => {
            player.totalStats[buff.stat] = (player.totalStats[buff.stat] || 0) + buff.value;
        });
    }
    
    player.currentMaxHP = 10 + ((player.totalStats.Vie || 0) * 3);
    player.maxMana = Math.floor(10 + ((player.totalStats.Intelligence || 0) * 2));
    player.currentMaxHP *= (1 + ((player.totalStats.Vie_percent || 0) / 100));
    player.maxMana *= (1 + ((player.totalStats.max_mana_percent || 0) / 100));
    player.currentMaxHP = Math.max(1, Math.floor(player.currentMaxHP));
    player.maxMana = Math.max(0, Math.floor(player.maxMana));

    if (!gameState.inCombat && !gameState.isInDungeon) {
        gameState.playerCurrentHP = Math.min(gameState.playerCurrentHP, player.currentMaxHP);
        gameState.playerCurrentMana = player.maxMana > 0 ? Math.min(gameState.playerCurrentMana, player.maxMana) : 0;
    }

    if (hasConstellationTalent('guerrier_berserker_keystone')) {
        const hpPercent = (gameState.playerCurrentHP / player.currentMaxHP) * 100;
        if (hpPercent < 30) {
            const forceBonus = Math.floor(player.totalStats.Force * 0.50);
            player.totalStats.Force += forceBonus;
        }
    }
    
    for (const statKey in player.totalStats) {
        if(breakdown[statKey]) breakdown[statKey].total = player.totalStats[statKey];
    }
    player.statBreakdown = breakdown;
}

function calculatePlayerPowerScore(state = gameState) {
    if (!state.player || !state.player.totalStats) return 0;
    const stats = state.player.totalStats;
    const weights = { Vie: 1, Force: 1.5, Agilité: 1.5, Intelligence: 0.5, Chance: 0.75, Défense: 2.5 };
    let powerScore = 0;
    for (const stat in stats) {
        if (weights[stat]) {
            powerScore += (stats[stat] || 0) * weights[stat];
        }
    }
    return Math.round(powerScore);
}

// =================================================================================
// SYSTÈME DE SUCCÈS
// =================================================================================

const SUCCES_TRIGGERS = {
    'EXPEDITION_SUCCESS': ['DEBUT_AVENTURE'],
    'CRAFT_ITEM': ['MAITRE_ARTISAN'],
    'ENCHANT_ITEM': ['ENCHANTEUR_NEOPHYTE'],
    'RECYCLE_ITEM': ['MAITRE_RECYCLEUR'],
    'LEVEL_UP': ['MAITRE_GUERRIER', 'MAITRE_ARCHER', 'MAITRE_MAGE'],
    'KILL_ENEMY': ['EXTERMINATEUR'],
    'KILL_BOSS': ['TUEUR_DE_BOSS'],
    'DUNGEON_FLOOR_REACHED': ['BRECHE_INSTABLE'],
    'PLAYER_DEATH': ['MORT_ET_RE_MORT'],
    'LOW_HP_WIN': ['AU_BORD_DU_GOUFFRE'],
    'EQUIP_SET': ['COLLECTIONNEUR_ENSEMBLE'],
    'FRAGMENTS_EARNED': ['ROI_DU_FRAGMENT'],
    'ASCEND': ['ASCENSION_NIVEAU'],
    'UNLOCK_TALENT': ['CONSTELLATION_DESTIN', 'CONSTELLATION_GUERRIER', 'CONSTELLATION_ARCHER', 'CONSTELLATION_MAGE', 'MAITRE_DES_ETOILES']
};

function countUnlockedNodes(treeKey) {
    // On utilise l'opérateur 'optional chaining' (?.) pour plus de sécurité
    const unlockedNodes = gameState.constellations?.[treeKey];
    const treeData = CONSTELLATIONS_DB[treeKey]?.nodes;

    if (!unlockedNodes || !treeData) {
        return 0;
    }

    let maxedNodesCount = 0;
    // On parcourt chaque talent que le joueur a débloqué dans cet arbre
    for (const nodeId in unlockedNodes) {
        const nodeData = treeData[nodeId];
        const currentLevel = unlockedNodes[nodeId];

        // On vérifie si le talent existe bien et si son niveau actuel est égal à son niveau max
        if (nodeData && currentLevel >= nodeData.maxLevel) {
            maxedNodesCount++;
        }
    }
    return maxedNodesCount;
}

function validateLegacyAchievements() {
    // 1. On vérifie si la validation a déjà eu lieu pour ne pas la refaire.
    if (gameState.achievements?.constellationValidated) {
        return;
    }

    console.log("Validation rétroactive des succès de constellation et d'ascension...");

    // ... (toute la logique pour les constellations reste ici, on n'y touche pas)
    const constellationSuccesIds = [
        'CONSTELLATION_DESTIN', 
        'CONSTELLATION_GUERRIER', 
        'CONSTELLATION_ARCHER', 
        'CONSTELLATION_MAGE', 
        'MAITRE_DES_ETOILES'
    ];
    constellationSuccesIds.forEach(succesId => {
        let progress = 0;
        if (succesId === 'MAITRE_DES_ETOILES') {
            progress = countUnlockedNodes('destiny') + countUnlockedNodes('guerrier') + countUnlockedNodes('archer') + countUnlockedNodes('mage');
        } else {
            const treeKey = succesId.replace('CONSTELLATION_', '').toLowerCase();
            progress = countUnlockedNodes(treeKey);
        }
        gameState.stats.succesProgress[succesId] = progress;
    });
    checkSucces('UNLOCK_TALENT');

    // ▼▼▼ NOUVELLE SECTION POUR L'ASCENSION ▼▼▼
    const currentAscensionLevel = gameState.ascensionLevel || 0;
    if (currentAscensionLevel > 0) {
        // On met à jour la progression du succès avec le niveau d'Ascension actuel du joueur.
        gameState.stats.succesProgress['ASCENSION_NIVEAU'] = currentAscensionLevel;
        // On appelle checkSucces pour que le jeu vérifie les paliers et débloque les récompenses.
        checkSucces('ASCEND', { ascensionLevel: currentAscensionLevel });
    }
    // ▲▲▲ FIN DE LA NOUVELLE SECTION ▲▲▲

    // On place le drapeau pour indiquer que la validation est terminée.
    if (!gameState.achievements) {
        gameState.achievements = {};
    }
    gameState.achievements.constellationValidated = true;
    saveGame();
}

function grantSuccesRecompense(recompense) {
    const player = gameState.player;
    switch (recompense.type) {
        case 'ressource':
            if (recompense.kind === 'fragments') {
                player.fragments = (player.fragments || 0) + recompense.amount;
                checkSucces('FRAGMENTS_EARNED', { total: gameState.stats.totalFragmentsEarned });
            } else {
                player.resources[recompense.kind] = (player.resources[recompense.kind] || 0) + recompense.amount;
            }
            break;
        case 'stat_flat':
        case 'stat_percent':
            player.achievementBonuses[recompense.stat] = (player.achievementBonuses[recompense.stat] || 0) + recompense.value;
            recalculateTotalStats();
            break;

        // ▼▼▼ LE BLOC AJOUTÉ EST ICI ▼▼▼
        case 'stat_flat_all':
            STAT_NAMES.forEach(statName => {
                player.achievementBonuses[statName] = (player.achievementBonuses[statName] || 0) + recompense.value;
            });
            recalculateTotalStats(); // On met à jour les stats après avoir ajouté tous les bonus
            break;
        // ▲▲▲ FIN DE L'AJOUT ▲▲▲
    }
    updateGameUI(); // On rafraîchit l'UI pour voir les nouvelles ressources/stats
}

function checkSucces(typeEvenement, valeur = {}) {
    if (!gameState.stats.succesProgress) gameState.stats.succesProgress = {};
    if (!gameState.stats.achievementStatus) gameState.stats.achievementStatus = {};

    const succesToCheck = SUCCES_TRIGGERS[typeEvenement];
    if (!succesToCheck) return;

    let aRewardWasJustUnlocked = false;

    succesToCheck.forEach(succesId => {
        const succesData = SUCCES_DB[succesId];
        if (!succesData) return;

        let currentProgress = gameState.stats.succesProgress[succesId] || 0;
        let shouldUpdate = false;

        // Logique pour mettre à jour la progression en fonction de l'événement
        switch (typeEvenement) {
            case 'EXPEDITION_SUCCESS':
            case 'CRAFT_ITEM':
            case 'ENCHANT_ITEM':
            case 'KILL_ENEMY':
            case 'KILL_BOSS':
            case 'PLAYER_DEATH':
                currentProgress++;
                shouldUpdate = true;
                break;
            case 'LEVEL_UP':
                if (succesId.toUpperCase().includes(valeur.classe.toUpperCase())) {
                    currentProgress = valeur.niveau;
                    shouldUpdate = true;
                }
                break;
            case 'DUNGEON_FLOOR_REACHED':
                if (valeur.floor > currentProgress) {
                    currentProgress = valeur.floor;
                    shouldUpdate = true;
                }
                break;
            case 'LOW_HP_WIN':
                if (valeur.hpPercent < 10) {
                    currentProgress++;
                    shouldUpdate = true;
                }
                break;
            case 'FRAGMENTS_EARNED':
                currentProgress = valeur.total;
                shouldUpdate = true;
                break;
            case 'ASCEND':
                if (valeur.ascensionLevel >= currentProgress) {
                    currentProgress = valeur.ascensionLevel;
                    shouldUpdate = true;

                    // Logique de déblocage du cadre "Maître Ascensionné"
                    if (valeur.ascensionLevel >= 10) {
                        if (!gameState.player.unlockedFrames.includes('ascended_master')) {
                            gameState.player.unlockedFrames.push('ascended_master');
                            // MON COMMENTAIRE : On utilise maintenant la fonction de traduction
                            showToast(t('alerts.frames.unlocked', { frameName: t('frames.ascended_master.name') }), "success");
                        }
                    }
                }
                break;

            case 'UNLOCK_TALENT':
                // Ce cas est plus complexe car il met à jour plusieurs succès.
                if (succesId === 'MAITRE_DES_ETOILES') {
                    // Pour le succès global, on compte les talents de TOUS les arbres.
                    currentProgress = countUnlockedNodes('destiny') + countUnlockedNodes('guerrier') + countUnlockedNodes('archer') + countUnlockedNodes('mage');
                } else {
                    // Pour un succès d'arbre spécifique, on ne compte que cet arbre.
                    const treeForSucces = succesId.replace('CONSTELLATION_', '').toLowerCase();
                    currentProgress = countUnlockedNodes(treeForSucces);
                }
                shouldUpdate = true;
                break;
            case 'EQUIP_SET':
                const setRarityOrder = ['epic', 'legendary', 'mythic'];
                const currentRarityIndex = setRarityOrder.indexOf(valeur.rarity);
                if (currentRarityIndex !== -1) {
                    for (let i = 0; i <= currentRarityIndex; i++) {
                        const palierId = `${succesId}_${i}`;
                        const palierData = succesData.paliers[i];
                        if (!gameState.stats.achievementStatus[palierId] && valeur.count >= palierData.objectif) {
                            gameState.stats.achievementStatus[palierId] = 'unlocked';
                            aRewardWasJustUnlocked = true;
                        }
                    }
                }
                return; // Cas spécial, on sort
        }

        if (shouldUpdate) {
            gameState.stats.succesProgress[succesId] = currentProgress;

            succesData.paliers.forEach((palier, index) => {
                const palierId = `${succesId}_${index}`;
                // Si le palier est atteint ET qu'il n'a pas encore de statut...
                if (currentProgress >= palier.objectif && !gameState.stats.achievementStatus[palierId]) {
                    // ...on le marque comme débloqué...
                    gameState.stats.achievementStatus[palierId] = 'unlocked';
                    // ...ET on indique qu'une nouvelle récompense vient d'apparaître, SANS CONDITION.
                    aRewardWasJustUnlocked = true;
                }
            });
        }
    });

    // Si une récompense (n'importe laquelle) a été débloquée durant cette vérification, on met à jour l'UI.
    if (aRewardWasJustUnlocked) {
        showToast(t('alerts.achievement_reward_unlocked'), 'success');
        updateAchievementNotification(); // Déclenche la mise à jour visuelle
        saveGame();
    }
}

function checkEquippedSetsForAchievement() {
    if (!gameState.player || !gameState.player.equipment) return;

    // On parcourt tous les ensembles définis dans la base de données
    for (const setKey in SETS_DB) {
        const set = SETS_DB[setKey];
        const equippedCount = countEquippedSetPieces(setKey);
        
        // On déclenche la vérification avec la rareté et le nombre de pièces
        checkSucces('EQUIP_SET', { rarity: set.rarity, count: equippedCount });
    }
}

function claimAchievementReward(succesId, palierIndex) {
    const palierId = `${succesId}_${palierIndex}`;
    const status = gameState.stats.achievementStatus[palierId];

    if (status !== 'unlocked') return;

    const succesData = SUCCES_DB[succesId];
    const palier = succesData.paliers[palierIndex];
    if (!palier) return;

    grantSuccesRecompense(palier.recompense);
    gameState.stats.achievementStatus[palierId] = 'claimed';
    
    const succesName = t(palier.nameKey) || t(succesData.nameKey);
    // CORRECTION : Utilisation de la clé de traduction
    showToast(t('alerts.achievement_reward_claimed', { achievementName: succesName }), 'success');
    
    updateAchievementNotification();

    const activeButton = document.querySelector('#succes-categories .succes-category-button.active');
    const currentCategoryKey = activeButton ? activeButton.dataset.category : null;
    displaySucces(currentCategoryKey); 

    saveGame();
}

function updateAchievementNotification() {
    const succesMenuItem = document.querySelector('#main-menu-list li[onclick="openAchievements()"]');

    const claimablePalierIds = Object.keys(gameState.stats.achievementStatus || {}).filter(palierId => gameState.stats.achievementStatus[palierId] === 'unlocked');
    const hasRewards = claimablePalierIds.length > 0;

    if (succesMenuItem) {
        const badge = succesMenuItem.querySelector('.notification-badge');
        if (badge) {
            badge.classList.toggle('hidden', !hasRewards);
        }
    }

    const claimableCategories = new Set();
    if (hasRewards) {
        claimablePalierIds.forEach(palierId => {
            // ... (le reste de cette boucle est inchangé) ...
            const succesId = palierId.split('_')[0];
            const succesData = SUCCES_DB[succesId];
            if (succesData) {
                claimableCategories.add(succesData.categoryKey);
            }
        });
    }

    document.querySelectorAll('.succes-category-button').forEach(btn => {
        const categoryKey = btn.dataset.category;
        const badge = btn.querySelector('.notification-badge');
        if (badge) {
            badge.classList.toggle('hidden', !claimableCategories.has(categoryKey));
        }
    });

    updateGlobalNotifications();
}

function displaySucces(selectedCategoryKey = null) {
    const listContainer = document.getElementById('succes-list');
    const categoriesContainer = document.getElementById('succes-categories');
    if (!listContainer || !categoriesContainer) return;

    const categoryKeys = [...new Set(Object.values(SUCCES_DB).map(s => s.categoryKey))];

    const claimablePalierIds = Object.keys(gameState.stats.achievementStatus || {}).filter(palierId => gameState.stats.achievementStatus[palierId] === 'unlocked');
    const claimableCategories = new Set(claimablePalierIds.map(palierId => {
        const succesId = palierId.split('_')[0];
        return SUCCES_DB[succesId]?.categoryKey;
    }).filter(Boolean));

    if (categoriesContainer.innerHTML.trim() === '') {
        let buttonsHtml = '';
        categoryKeys.forEach(catKey => {
            const notificationClass = claimableCategories.has(catKey) ? 'has-claimable-reward' : '';
            buttonsHtml += `<button class="succes-category-button ${notificationClass}" data-category="${catKey}" onclick="displaySucces('${catKey}')">${t(catKey)}<span class="notification-badge hidden"></span></button>`;
        });
        categoriesContainer.innerHTML = buttonsHtml;
    }

    if (!selectedCategoryKey) {
        selectedCategoryKey = categoryKeys[0] || null;
    }

    document.querySelectorAll('.succes-category-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === selectedCategoryKey) {
            btn.classList.add('active');
        }
    });
    
    const succesEntries = Object.entries(SUCCES_DB);
    const filteredSucces = selectedCategoryKey
        ? succesEntries.filter(([id, data]) => data.categoryKey === selectedCategoryKey)
        : []; 
    
    listContainer.innerHTML = '';
    if (filteredSucces.length === 0) {
        // CORRECTION
        listContainer.innerHTML = `<p style="text-align: center; color: #aaa;">${t('ui.no_achievements_in_category')}</p>`;
        return;
    }

    filteredSucces.forEach(([succesId, succesData]) => {
        const currentProgress = gameState.stats.succesProgress[succesId] || 0;
        let activePalierIndex = -1;
        for (let i = 0; i < succesData.paliers.length; i++) {
            const palierId = `${succesId}_${i}`;
            if (gameState.stats.achievementStatus[palierId] !== 'claimed') {
                activePalierIndex = i;
                break;
            }
        }
        
        const isFullyCompleted = activePalierIndex === -1;
        if (isFullyCompleted) {
            activePalierIndex = succesData.paliers.length - 1;
        }
        
        const activePalier = succesData.paliers[activePalierIndex];
        const activePalierId = `${succesId}_${activePalierIndex}`;
        const status = gameState.stats.achievementStatus[activePalierId];
        
        const card = document.createElement('div');
        let cardClass = 'locked';
        if (isFullyCompleted) cardClass = 'completed';
        else if (status === 'unlocked') cardClass = 'unlocked';
        card.className = `succes-card ${cardClass}`;
        
        let progressHtml = '';
        let actionHtml = '';

        if (isFullyCompleted) {
            // CORRECTION
            actionHtml = `<div class="claimed-reward">${t('ui.achievement_claimed')}</div>`;
        } else if (status === 'unlocked') {
            // CORRECTION
            actionHtml = `<button class="claim-button" onclick="claimAchievementReward('${succesId}', ${activePalierIndex})">${t('ui.claim_button')}</button>`;
        } else {
            const objectif = activePalier.objectif;
            const progressPercent = Math.min(100, (currentProgress / objectif) * 100);
            progressHtml = `
                <div class="succes-progress-bar-bg">
                    <div class="succes-progress-bar-fill" style="width: ${progressPercent}%;"></div>
                </div>
                <p class="succes-progress-text">${Math.min(Math.floor(currentProgress), objectif)} / ${objectif}</p>
            `;
        }
        
        let unlockedRewardsHtml = '';
        const unlockedBonuses = [];
        for (let i = 0; i < activePalierIndex; i++) {
            unlockedBonuses.push(formatRewardToString(succesData.paliers[i].recompense));
        }
        if (unlockedBonuses.length > 0) {
            // CORRECTION
            unlockedRewardsHtml = `
                <div class="unlocked-rewards-summary">
                    <strong>${t('ui.unlocked_bonuses_label')}</strong> ${unlockedBonuses.join(' | ')}
                </div>
            `;
        }
        
        const cardTitle = t(activePalier.nameKey) || t(succesData.nameKey);
        const cardDescription = t(succesData.descriptionKey);

        card.innerHTML = `
            <div class="succes-icon">${succesData.icon}</div>
            <h4 class="succes-title">${cardTitle}</h4>
            <p class="succes-description">${cardDescription}</p>
            <div class="succes-progress-container">
                <div class="succes-reward">Récompense : ${formatRewardToString(activePalier.recompense)}</div>
                ${progressHtml}
            </div>
            <div class="succes-action-container">
                ${actionHtml}
            </div>
            ${unlockedRewardsHtml}
        `;
        listContainer.appendChild(card);
    });

    updateAchievementNotification();
}

function formatRewardToString(recompense) {
    // CORRECTION
    if (!recompense) return t('alerts.reward_none');

    const sign = (recompense.value && recompense.value > 0) ? '+' : '';

    switch (recompense.type) {
        case 'stat_flat':
            const statSign = (recompense.stat === 'CritDamage') ? '' : sign;
            return `<strong>${statSign}${recompense.value}</strong> ${t(`stats.displayNames.${recompense.stat}`) || recompense.stat}`;
        
        case 'stat_percent':
            return `<strong>${sign}${recompense.value}%</strong> ${t(`stats.displayNames.${recompense.stat}`) || recompense.stat}`;
        
        case 'ressource':
            const resourceName = t(`stats.displayNames.${recompense.kind}`) || recompense.kind.replace(/_/g, ' ');
            const iconHtml = SPRITE_PATHS[recompense.kind] ? `<img src="${SPRITE_PATHS[recompense.kind]}" class="icon-sprite-small">` : `(${resourceName})`;
            return `<strong>${recompense.amount}</strong> ${iconHtml}`;

        case 'stat_flat_all':
            return `<strong>+${recompense.value} à tous les attributs</strong>`;

        case 'special_passive':
            switch (recompense.passive) {
                case 'passive_resource_find': return `<strong>Passif : ${t('codex.novice.milestone4_name')}</strong>`;
                case 'passive_status_resist': return `<strong>Passif : ${t('codex.confirme.milestone4_name')}</strong>`;
                case 'passive_execute': return `<strong>Passif : ${t('codex.maitre.milestone4_name')}</strong>`;
                // CORRECTION
                default: return t('alerts.passive_special');
            }

        default:
            // CORRECTION
            console.warn(t('alerts.unknown_reward_type'), recompense);
            return t('alerts.reward_special');
    }
}

// =================================================================================
// GESTION DE L'INVENTAIRE & FORGE
// =================================================================================

function equipItem(itemUid) {
    const player = gameState.player;
    const itemIndex = player.inventory.findIndex(item => item.uid === itemUid);
    if (itemIndex === -1) {
        // CORRECTION
        console.error(t('alerts.inventory_error_not_found'));
        return;
    }
    
    const item = player.inventory[itemIndex];

    if (item.class_restriction) {
        const canEquip = Array.isArray(item.class_restriction) 
            ? item.class_restriction.includes(player.class)
            : item.class_restriction === player.class;

        if (!canEquip) {
            // CORRECTION
            const requiredClasses = [].concat(item.class_restriction).join(', ');
            showCustomAlert(t('alerts.class_restriction_error', { playerClass: player.class, requiredClasses: requiredClasses }));
            return;
        }
    }

    if (!item.type || !EQUIPMENT_SLOTS.includes(item.type)) return;

    const oldMaxHP = player.currentMaxHP;

    if (player.equipment[item.type]) {
        player.inventory.push(player.equipment[item.type]);
    }
    
    player.equipment[item.type] = item;
    player.inventory.splice(itemIndex, 1);

    recalculateTotalStats();

    const newMaxHP = player.currentMaxHP;
    if (newMaxHP > oldMaxHP) {
        gameState.playerCurrentHP += (newMaxHP - oldMaxHP);
    }
    
    updateGameUI();
    saveGame();
    checkEquippedSetsForAchievement();
}

window.unequipItem = function(slotName) {
    const player = gameState.player;
    const itemToUnequip = player.equipment[slotName];
    if (itemToUnequip) {
        player.inventory.push(itemToUnequip);
        player.equipment[slotName] = null;
        recalculateTotalStats();
        updateGameUI();
        saveGame();
    }
    checkEquippedSetsForAchievement();
}

window.recycleItem = async function(itemUid) {
    const player = gameState.player;
    const itemIndex = player.inventory.findIndex(item => item.uid === itemUid);

    if (itemIndex === -1) return;
    
    const itemToRecycle = player.inventory[itemIndex];

    if (itemToRecycle.isLocked) {
        // CORRECTION
        showToast(t('alerts.item_locked_recycle_error'), "error");
        return;
    }

    // CORRECTION
    const itemName = t(itemToRecycle.nameKey);
    const confirmation = await showCustomConfirm(t('alerts.recycle_irreversible_confirm', { itemName: itemName }));

    if (confirmation) {
        const rarity = itemToRecycle.rarity;
        const fragmentsGained = RECYCLE_YIELD_IN_FRAGMENTS[rarity] || 0;

        if (fragmentsGained > 0) {
            player.inventory.splice(itemIndex, 1);
            player.fragments = (player.fragments || 0) + fragmentsGained;
            
            gameState.stats.totalFragmentsEarned = (gameState.stats.totalFragmentsEarned || 0) + fragmentsGained;
            checkSucces('FRAGMENTS_EARNED', { total: gameState.stats.totalFragmentsEarned });
            
            gameState.stats.itemsRecycled = (gameState.stats.itemsRecycled || 0) + 1;
            checkSucces('RECYCLE_ITEM');
            
            // CORRECTION
            showToast(t('alerts.recycle_success_toast', { itemName: itemName, fragmentsGained: fragmentsGained }));
        } else {
            // CORRECTION
            showToast(t('alerts.cannot_recycle_error'), "error");
        }
        updateGameUI();
        saveGame();
    }
}

async function confirmRecycleAll() {
    const player = gameState.player;
    
    const recyclableItems = player.inventory.filter(item => !item.isLocked);

    if (recyclableItems.length === 0) {
        // CORRECTION
        showToast(t('alerts.no_unlocked_items_to_recycle'), "error");
        return;
    }
    
    let totalFragments = 0;
    recyclableItems.forEach(item => {
        totalFragments += RECYCLE_YIELD_IN_FRAGMENTS[item.rarity] || 0;
    });
    const totalItems = recyclableItems.length;

    // CORRECTION
    const confirmationMessage = t('alerts.recycle_all_confirm', { itemCount: totalItems, fragmentCount: totalFragments });
    const confirmed = await showCustomConfirm(confirmationMessage);

    if (confirmed) {
        recycleAllItems();
    }
}

function recycleAllItems() {
    const player = gameState.player;
    let fragmentsGained = 0;
    let itemsRecycledCount = 0;

    const itemsToKeep = player.inventory.filter(item => item.isLocked);
    const itemsToRecycle = player.inventory.filter(item => !item.isLocked);

    itemsToRecycle.forEach(item => {
        fragmentsGained += RECYCLE_YIELD_IN_FRAGMENTS[item.rarity] || 0;
    });
    itemsRecycledCount = itemsToRecycle.length;
    
    player.fragments = (player.fragments || 0) + fragmentsGained;
    player.inventory = itemsToKeep;

    gameState.stats.itemsRecycled = (gameState.stats.itemsRecycled || 0) + itemsRecycledCount;
    gameState.stats.totalFragmentsEarned = (gameState.stats.totalFragmentsEarned || 0) + fragmentsGained;

    const succesId = 'MAITRE_RECYCLEUR';
    const succesData = SUCCES_DB[succesId];
    let currentProgress = gameState.stats.succesProgress[succesId] || 0;

    currentProgress += itemsRecycledCount;
    gameState.stats.succesProgress[succesId] = currentProgress;

    let aRewardWasJustUnlocked = false;
    succesData.paliers.forEach((palier, index) => {
        const palierId = `${succesId}_${index}`;
        if (currentProgress >= palier.objectif && !gameState.stats.achievementStatus[palierId]) {
            gameState.stats.achievementStatus[palierId] = 'unlocked';
            aRewardWasJustUnlocked = true;
        }
    });

    if (aRewardWasJustUnlocked) {
        showToast(t('alerts.achievement_reward_unlocked'), 'success');
        updateAchievementNotification();
    }
    
    checkSucces('FRAGMENTS_EARNED', { total: gameState.stats.totalFragmentsEarned });
    
    // CORRECTION
    showToast(t('alerts.recycle_all_success_toast', { fragmentsGained: fragmentsGained }), 'success');
    updateGameUI();
    saveGame();
}

function showCustomConfirmWithTimer(message, seconds) {
    return new Promise(resolve => {
        const modal = document.getElementById('custom-confirm-modal');
        const text = document.getElementById('custom-confirm-text');
        const yesButton = document.getElementById('custom-confirm-yes');
        const noButton = document.getElementById('custom-confirm-no');

        text.innerHTML = message;
        modal.style.display = 'flex';

        let timeLeft = seconds;
        yesButton.disabled = true;
        // CORRECTION
        yesButton.textContent = `${t('ui.prompts.yes')} (${timeLeft})`;

        const timerInterval = setInterval(() => {
            timeLeft--;
            // CORRECTION
            yesButton.textContent = `${t('ui.prompts.yes')} (${timeLeft})`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                yesButton.disabled = false;
                // CORRECTION
                yesButton.textContent = t('ui.prompts.yes');
            }
        }, 1000);

        yesButton.onclick = () => {
            clearInterval(timerInterval);
            modal.style.display = 'none';
            resolve(true);
        };

        noButton.onclick = () => {
            clearInterval(timerInterval);
            modal.style.display = 'none';
            resolve(false);
        };
    });
}

window.unlockForge = function() {
    // Vérifie si une construction de forge est déjà en cours
    if (gameState.village.forge.constructionEnd > 0) {
        showToast(t('ui.fief.under_construction'), 'error');
        return;
    }

    if (gameState.player.resources.bois >= FORGE_UNLOCK_COST) {
        gameState.player.resources.bois -= FORGE_UNLOCK_COST;
        
        // On lance la construction (ici, très courte pour le déblocage)
        const constructionTimeMs = 0.01 * 3600 * 1000;
        gameState.village.forge.constructionEnd = Date.now() + constructionTimeMs;

        updateForgeDisplay();
        updateGameUI();
        saveGame();
    } else {
        showCustomAlert(t('alerts.not_enough_resources'));
    }
}

window.upgradeForge = async function() {
    const forge = gameState.village.forge;
    const nextLevel = forge.level + 1;
    const upgradeData = FORGE_UPGRADE_COSTS[forge.level];

    if (forge.constructionEnd > 0) {
        showToast(t('ui.fief.under_construction'), 'error');
        return;
    }
    if (!upgradeData) {
        showCustomAlert(t('alerts.forge_max_level'));
        return;
    }

    const requiredTalents = {
        4: 'destiny_epic_knowledge',
        5: 'destiny_legendary_knowledge',
        6: 'destiny_mythic_knowledge'
    };

    if (requiredTalents[nextLevel] && !hasConstellationTalent(requiredTalents[nextLevel])) {
        const rarityName = t(RARITY_CONFIG[RARITY_ORDER[nextLevel - 1]].nameKey);
        showCustomAlert(t('alerts.forge_talent_required', { rarityName: rarityName }));
        return;
    }

    let canAfford = true;
    let costString = [];
    for (const res in upgradeData.cost) {
        const playerResource = res === 'fragments' ? (gameState.player.fragments || 0) : (gameState.player.resources[res] || 0);
        if (playerResource < upgradeData.cost[res]) canAfford = false;
        // MON COMMENTAIRE : J'enveloppe le coût dans le span ici aussi.
        costString.push(`<span class="cost-item">${upgradeData.cost[res]} <img src="${SPRITE_PATHS[res]}" class="icon-sprite-small" alt="${res}"></span>`);
    }
    if (!canAfford) {
        showCustomAlert(t('alerts.not_enough_resources'));
        return;
    }

    const durationString = formatDuration(upgradeData.constructionTimeHours * 3600 * 1000);
    const confirmMessage = t('ui.fief.upgrade_confirm_body', {
        buildingName: t('ui.village.buildings.forge'),
        level: nextLevel,
        // MON COMMENTAIRE : Le join se fait maintenant avec ' + ' entre les spans.
        cost: costString.join(' + '),
        duration: durationString
    });

    const confirmed = await showCustomConfirm(confirmMessage, t('ui.buttons.upgrade'), t('ui.buttons.cancel'));
    if (!confirmed) return;

    for (const res in upgradeData.cost) {
        if (res === 'fragments') gameState.player.fragments -= upgradeData.cost[res];
        else gameState.player.resources[res] -= upgradeData.cost[res];
    }
    
    const constructionTimeMs = upgradeData.constructionTimeHours * 3600 * 1000;
    forge.constructionEnd = Date.now() + constructionTimeMs;
    if (upgradeData.constructionTimeHours > 2) {
        showContextualSpeedUpOffer();
    }
    
    updateForgeDisplay();
    updateGameUI();
    saveGame();
}

window.craftItem = function(itemId) {
    const player = gameState.player;
    const itemToCraft = ITEMS_DB.find(item => item.id === itemId);

    if (hasConstellationTalent('destiny_free_craft_1')) {
        const freeCraftChance = 4;
        if (Math.random() * 100 < freeCraftChance) {
            const newItem = { ...itemToCraft, uid: generateUID() };
            player.inventory.push(newItem); 
            gameState.stats.itemsCrafted = (gameState.stats.itemsCrafted || 0) + 1;
            
            showToast(t('alerts.free_craft_success_toast'), 'success');
            updateGameUI();
            checkSucces('CRAFT_ITEM', {});
            selectedForgeItem = null;
            document.getElementById('main-craft-button').disabled = true;
            displayCraftableItems();
            saveGame();
            return;
        }
    }

    if (!itemToCraft || !itemToCraft.cost) return;

    const fragmentCost = CRAFTING_COST_IN_FRAGMENTS[itemToCraft.rarity];
    let canAfford = player.fragments >= fragmentCost;
    const missing = [];

    if (!canAfford) {
        missing.push(`${fragmentCost} <img src="${SPRITE_PATHS.fragments}" class="icon-sprite-small">`);
    }

    for (const resource in itemToCraft.cost) {
        if ((player.resources[resource] || 0) < itemToCraft.cost[resource]) {
            canAfford = false;
            missing.push(`${itemToCraft.cost[resource]} <img src="${SPRITE_PATHS[resource]}" class="icon-sprite-small">`);
        }
    }

    if (!canAfford) {
        showCustomAlert(t('alerts.missing_cost', { missingResources: missing.join(' + ') }));
        return;
    }

    player.fragments -= fragmentCost;
    for (const resource in itemToCraft.cost) {
        player.resources[resource] -= itemToCraft.cost[resource];
    }

    const newItem = { ...itemToCraft, uid: generateUID() };
    player.inventory.push(newItem); 

    gameState.stats.itemsCrafted = (gameState.stats.itemsCrafted || 0) + 1;
    updateDailyMissionProgress('crafts');
    // CORRIGÉ : J'ai supprimé la ligne qui déduisait le coût du total de fragments gagnés.
    // Cette statistique ne doit que s'incrémenter.
    
    showToast(t('alerts.craft_success_toast', { itemName: t(itemToCraft.nameKey) }));
    
    updateGameUI();
    checkSucces('CRAFT_ITEM', {});
    saveGame();
}

// =================================================================================
// MISE À JOUR DE L'INTERFACE (UI)
// =================================================================================

function initializeCharacterCreationUI() {
    const user = window.firebaseTools.auth.currentUser;
    const welcomeMessageContainer = document.getElementById('creation-welcome-message');
    const logoutButton = document.getElementById('creation-logout-button');

    if (welcomeMessageContainer) {
        if (user) {
            // CORRECTION
            welcomeMessageContainer.innerHTML = t('ui.creation.welcome_back', { userName: user.displayName });
        } else {
            // CORRECTION
            welcomeMessageContainer.innerHTML = t('ui.creation.welcome_guest');
        }
    }

    if (logoutButton) {
        if (user) {
            logoutButton.classList.remove('hidden');
        } else {
            logoutButton.classList.add('hidden');
        }
    }
    const statsListContainer = document.getElementById('creation-stats-list');
    if (statsListContainer && !statsListContainer.dataset.clickListenerAttached) {
        statsListContainer.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-stat]');
            if (button) {
                const statName = button.dataset.stat;
                const amount = parseInt(button.dataset.amount, 10);
                // On s'assure de ne pas interférer avec le long-press du bouton "+"
                if (amount === -1) {
                    adjustStat(statName, amount);
                }
            }
        });
        statsListContainer.dataset.clickListenerAttached = 'true';
    }
    const statsList = document.getElementById('creation-stats-list');
    if (!statsList) return;
    
    statsList.innerHTML = '';

    STAT_NAMES.forEach(statName => {
        const isDefense = statName === 'Défense';
        const div = document.createElement('div');
        div.className = 'creation-stat-block'; 
        
        // CORRECTION : On utilise t() pour le nom de l'attribut
        div.innerHTML = `
            <div class="stat-line">
                <label>${STAT_ICONS[statName] || '❓'} ${t(`stats.displayNames.${statName}`)}</label>
                <div class="stat-controls">
                    <button data-stat="${statName}" data-amount="-1" ${isDefense ? 'disabled' : ''}>-</button>
                    <span id="value-${statName}">0</span>
                    <button data-stat="${statName}" data-amount="1" ${isDefense ? 'disabled' : ''}>+</button>
                </div>
            </div>
            <small class="stat-description">${t(`stats.descriptions.${statName}`) || ''}</small>
        `;
        statsList.appendChild(div);
    });
    updateCreationUI();
    setupStatButtonListeners('creation-stats-list');
    applyAllTranslations();
}

function updateCreationUI() {
    if (!gameState.player) {
        document.getElementById('points-left').textContent = gameState.availablePoints;
        for (const statName of STAT_NAMES) {
            const statSpan = document.getElementById(`value-${statName}`);
            if (statSpan) statSpan.textContent = gameState.baseStats[statName];
        }
    }
}

function updateVillageSubTabs() {
    // Cette fonction sert de "chef d'orchestre" pour le panneau du Village.
    // Elle s'assure que le contenu de la Forge ET de l'Enchanteur sont tous les deux mis à jour.
    updateForgeDisplay();
    updateEnchanterUI();
}

function updateGameUI() {
    if (!gameState.player) return;
    updateNavButtonsState();

    animateCounter(document.getElementById('header-res-bois'), Math.floor(gameState.player.resources.bois || 0));
    animateCounter(document.getElementById('header-res-metal'), Math.floor(gameState.player.resources.metal || 0));
    animateCounter(document.getElementById('header-res-tissu'), Math.floor(gameState.player.resources.tissu || 0));
    animateCounter(document.getElementById('header-res-fragments'), Math.floor(gameState.player.fragments || 0));
    animateCounter(document.getElementById('header-res-eclats_ascension'), Math.floor(gameState.player.resources.eclats_ascension || 0));
    
    const headerLevelDisplay = document.getElementById('header-level-display');
    if (headerLevelDisplay) {
        headerLevelDisplay.textContent = `Lvl. ${gameState.player.level}`;
    }

    const profilePlayerName = document.getElementById('profile-player-name');
    if (profilePlayerName) {
        profilePlayerName.textContent = gameState.player.name;
    }
    const profilePlayerLevel = document.getElementById('profile-player-level');
    if (profilePlayerLevel) {
        profilePlayerLevel.textContent = `Niveau ${gameState.player.level}`;
    }
    const profileClassIcon = document.getElementById('profile-class-icon');
    if (profileClassIcon && gameState.player.class) {
        profileClassIcon.src = `assets/sprites/classesicon/${gameState.player.class.toLowerCase()}.png`;
    }

    const headerAvatar = document.getElementById('header-picture-img');
    if(headerAvatar) headerAvatar.src = gameState.player.profilePictureUrl || CLASS_DATA_DB[gameState.player.class]?.portrait || 'assets/sprites/portraits/default_avatar.png';
    const headerFrame = document.getElementById('header-frame-img');
    if(headerFrame) {
        const frameId = gameState.player.equippedFrame || 'default';
        const frameData = FRAMES_DB[frameId] || FRAMES_DB['default'];
        headerFrame.src = frameData.image;
    }

    const isPlayerBusy = gameState.isInDungeon || gameState.isOnExpedition || gameState.inCombat || gameState.isOnPatrol || gameState.isResting;
    
    const villageHub = document.getElementById('village-hub-view');
    if (villageHub && !villageHub.classList.contains('hidden')) {
        updateVillageHubUI();
    }

    updateMainTabsState();
    const player = gameState.player;
    
    const hpDisplay = document.getElementById('main-player-hp-display');
    if (hpDisplay) {
        document.getElementById('main-player-max-hp-display').textContent = player.currentMaxHP;
        document.getElementById('main-player-hp-fill').style.width = `${(gameState.playerCurrentHP / player.currentMaxHP) * 100}%`;
        hpDisplay.textContent = Math.round(gameState.playerCurrentHP);
    }
    const manaDisplay = document.getElementById('main-player-mana-display');
    if(manaDisplay){
        document.getElementById('main-player-max-mana-display').textContent = player.maxMana;
        document.getElementById('mana-fill').style.width = player.maxMana > 0 ? `${(gameState.playerCurrentMana / player.maxMana) * 100}%` : '0%';
        manaDisplay.textContent = Math.round(gameState.playerCurrentMana);
    }
    const xpDisplay = document.getElementById('xp');
    if(xpDisplay){
        document.getElementById('xp-next').textContent = player.xpToNextLevel;
        document.getElementById('xp-fill').style.width = `${(player.xp / player.xpToNextLevel) * 100}%`;
        xpDisplay.textContent = player.xp;
    }
    const pointsSection = document.getElementById('points-to-spend-section');
    if(pointsSection){
        if (player.pointsToSpend > 0) {
            pointsSection.innerHTML = `${t('ui.creation.points_to_assign')} <strong id="points-to-spend">${player.pointsToSpend}</strong>`;
            pointsSection.style.display = 'block';
        } else {
            pointsSection.style.display = 'none';
        }
    }
    const statsContent = document.getElementById('player-base-stats-container');
    if(statsContent) {
        statsContent.innerHTML = '';
        STAT_NAMES.forEach(statName => {
            const totalStat = player.totalStats[statName] || 0;
            const baseStat = player.baseStats[statName] || 0;
            const statLine = document.createElement('div');
            statLine.className = 'stat-line';

            const statNameDiv = document.createElement('div');
            statNameDiv.className = 'stat-info-name';
            statNameDiv.innerHTML = `<strong><img src="${SPRITE_PATHS[statName]}" class="icon-sprite">${t(`stats.displayNames.${statName}`)} :</strong>`;
            statNameDiv.onclick = () => showDescriptionAlert(statName);

            const statValuesDiv = document.createElement('div');
            statValuesDiv.className = 'stat-values';
            const isPercent = ['CritChance', 'CritDamage', 'LootBonusPercent', 'xp_gain_percent', 'armor_shred_percent', 'resistance_percent', 'debuff_resistance_percent', 'lifesteal_percent', 'bleed_chance_percent', 'stun_chance_percent', 'healing_effectiveness_percent'].includes(statName);
            const isFloat = ['CritDamage', 'RegenHP'].includes(statName);
            const totalFormatted = totalStat.toFixed(isFloat ? 2 : 0) + (isPercent ? '%' : '');
            statValuesDiv.innerHTML = `<strong class="stat-total">${totalFormatted}</strong>`;
            statValuesDiv.onclick = () => showStatTooltip(statName);

            statLine.appendChild(statNameDiv);
            statLine.appendChild(statValuesDiv);

            if (player.pointsToSpend > 0) {
                const canUpgrade = !(statName === "Défense" && baseStat >= Math.floor(player.level / 10));
                if (canUpgrade) {
                    const plusButton = document.createElement('button');
                    plusButton.className = 'plus-button';
                    plusButton.textContent = '+';
                    plusButton.onclick = (e) => {
                        e.stopPropagation();
                        adjustStat(statName, 1);
                    };
                    statLine.appendChild(plusButton);
                }
            }
            statsContent.appendChild(statLine);
        });
    }

    document.getElementById('death-overlay').style.display = gameState.isResting ? 'flex' : 'none';
    
    document.documentElement.classList.toggle('no-scroll', gameState.isResting);
    document.body.classList.toggle('no-scroll', gameState.isResting);

    const expeditionsContent = document.getElementById('expeditions-content');
    if (expeditionsContent) {
        expeditionsContent.style.pointerEvents = isPlayerBusy ? 'none' : 'auto';
        expeditionsContent.style.opacity = isPlayerBusy ? 0.5 : 1;
    }
    const energyDisplay = document.getElementById('expedition-energy-display');
    if (energyDisplay) {
        if (gameState.unlockedFeatures.expeditions) {
            energyDisplay.classList.remove('hidden');
            document.getElementById('current-energy').textContent = gameState.player.energy;
            document.getElementById('max-energy').textContent = gameState.player.maxEnergy;
        } else {
            energyDisplay.classList.add('hidden');
        }
    }
    const bossButton = document.getElementById('boss-button');
    if(bossButton) {
         bossButton.style.display = isPlayerBusy ? 'none' : 'block';
    }
    
    updateEquipmentUI();
    updateInventoryUI();
    updateSpecialResourcesUI();
    updateConsumablesUI();
    updatePatrolUI();
    updateDungeonUI();
    updateRefreshButtonUI();
    updateCodexUI(); 
    updateMasteryUI();
    updateStatsPanels();
    updateTraitsStatsPanel();
    syncInventoryHeight();
    updateMainActionButtons();
    updateUnlockedUI();
    applyAllTranslations();
    updateSpendPointsFAB();
}

function updateUnlockedUI() {
    if (!gameState.player) return;
    const features = gameState.unlockedFeatures || {};
    const player = gameState.player;

    const specialResourcesSection = document.getElementById('special-resources-section');
    const consumablesSection = document.getElementById('consumables-section');

    const nonSpecialResources = ['bois', 'metal', 'tissu', 'marques_de_chasse', 'fragments','bounty_tokens', 'cle_de_la_breche', 'eclats_instables', 'eclats_ascension'];
    const allPlayerResourceKeys = Object.keys(player.resources);
    const hasAnySpecialResource = allPlayerResourceKeys.some(resourceKey => 
        !nonSpecialResources.includes(resourceKey) && (player.resources[resourceKey] || 0) > 0
    );

    const hasConsumables = Object.values(player.consumables || {}).some(count => count > 0);

    // MON COMMENTAIRE : On met à jour la visibilité comme avant
    specialResourcesSection.classList.toggle('hidden', !hasAnySpecialResource);
    consumablesSection.classList.toggle('hidden', !hasConsumables && !features.hasFoundConsumable);

    // MON AJOUT : On ajoute la logique de padding intelligent
    const personnageScreen = document.getElementById('personnage-screen');
    const areBothHidden = specialResourcesSection.classList.contains('hidden') && consumablesSection.classList.contains('hidden');

    if (personnageScreen) {
        // Si les deux panneaux du bas sont cachés, on ajoute la classe pour le padding.
        // Sinon, on la retire.
        personnageScreen.classList.toggle('needs-scroll-padding', areBothHidden);
    }
}

function updateEquipmentUI() {
    const player = gameState.player;
    const equipmentList = document.getElementById('equipment-list');
    equipmentList.innerHTML = '';

    EQUIPMENT_SLOTS.forEach(slot => {
        const item = player.equipment[slot];
        const li = document.createElement('li');
        // CORRECTION : Utilisation de t() pour le nom de l'emplacement
        let content = `<strong>${t(`ui.equipment_slots.${slot}`)}:</strong> `;

        if (item) {
            let displayName = t(item.nameKey);
            if (item.enchanter && item.enchanter.affixKey) {
                const affixInfo = AFFIX_DB[item.type]?.find(a => a.key === item.enchanter.affixKey);
                if (affixInfo) {
                    const affixRarity = item.enchanter.rarity || 'common';
                    displayName += ` <span class="${RARITY_CONFIG[affixRarity].colorClass}">[${t(affixInfo.nameKey)}]</span>`;
                }
            }

            const span = document.createElement('span');
            span.innerHTML = displayName;
            span.className = RARITY_CONFIG[item.rarity]?.colorClass || 'rarity-common';
            span.style.cursor = 'pointer';

            const isTouch = 'ontouchstart' in window;

            attachInteractionListener(span, {
                onTap: () => unequipItem(slot),
                onLongPress: () => showItemTooltip(item.uid),
                onHover: () => showTooltip(buildItemTooltipHTML(item), span)
            });

            if (!isTouch) {
                span.addEventListener('mouseleave', hideStatTooltip);
            }

            li.innerHTML = content;
            li.appendChild(span);
        } else {
            // CORRECTION
            li.innerHTML = content + t('ui.equipment_empty');
        }
        equipmentList.appendChild(li);
    });
}

function updateInventoryUI() {
    const player = gameState.player;
    const inventoryList = document.getElementById('inventory-list');
    const filtersContainer = document.getElementById('inventory-filters');

    // --- DÉBUT DE LA CORRECTION ---
    // On cible le menu déroulant qui existe déjà dans le HTML.
    const typeSelect = document.getElementById('inventory-type-filter');

    // On vérifie si les options dynamiques (Tête, Torse, etc.) ont déjà été ajoutées.
    // S'il n'y a que 2 options ("Aucun" et "Tous"), alors on les ajoute.
    if (typeSelect && typeSelect.options.length <= 2) {
        EQUIPMENT_SLOTS.forEach(slot => {
            // On crée une nouvelle <option> et on l'ajoute au menu déroulant.
            const option = new Option(t(`ui.equipment_slots.${slot}`), slot);
            typeSelect.add(option);
        });
    }
    // --- FIN DE LA CORRECTION ---

    inventoryList.innerHTML = ''; // On ne vide que la liste des objets

    const recycleAllButton = document.getElementById('recycle-all-button');
    if (player.inventory.length > 0) {
        recycleAllButton.style.display = 'inline-block';
    } else {
        recycleAllButton.style.display = 'none';
    }
    
    // Le reste de la fonction reste identique
    const typeFilter = typeSelect.value;
    if (typeFilter === 'none') {
        inventoryList.innerHTML = `<li style="color: #aaa; text-align: center;">${t('ui.inventory.select_filter_prompt')}</li>`;
        return;
    }

    let filteredInventory = player.inventory;
    if (typeFilter !== 'all') {
        filteredInventory = player.inventory.filter(item => item.type === typeFilter);
    }
    if (filteredInventory.length === 0) {
        inventoryList.innerHTML = `<li style="color: #aaa; text-align: center;">${t('ui.inventory.no_items_of_type')}</li>`;
        return;
    }

    const itemGroups = new Map();
    filteredInventory.forEach((item) => {
        // ==================== DÉBUT DE LA MODIFICATION ====================
        // ANCIENNE LOGIQUE
        // const uniqueId = item.isLocked + (item.enchanter ? `${item.id}_${item.enchanter.affixKey}_${item.enchanter.rarity}` : item.id);
        
        // NOUVELLE LOGIQUE
        // On utilise la 'nameKey' pour les objets de set car elle est unique, contrairement à l'ID qui n'existait pas.
        let uniqueId;
        if (item.isSetItem) {
            uniqueId = item.isLocked + (item.enchanter ? `${item.nameKey}_${item.enchanter.affixKey}_${item.enchanter.rarity}` : item.nameKey);
        } else {
            uniqueId = item.isLocked + (item.enchanter ? `${item.id}_${item.enchanter.affixKey}_${item.enchanter.rarity}` : item.id);
        }
        // ===================== FIN DE LA MODIFICATION =====================

        if (!itemGroups.has(uniqueId)) {
            itemGroups.set(uniqueId, { item: item, uids: [], count: 0 });
        }
        itemGroups.get(uniqueId).uids.push(item.uid);
        itemGroups.get(uniqueId).count++;
    });

    itemGroups.forEach(group => {
        const { item, count, uids } = group;
        const li = document.createElement('li');
        const lockButton = document.createElement('button');
        const nameSpan = document.createElement('span');
        const recycleButton = document.createElement('button');
        const isTouch = 'ontouchstart' in window;

        const isRestricted = item.class_restriction && ![].concat(item.class_restriction).includes(player.class);
        if (isRestricted) {
            li.classList.add('restricted-item');
        }

        lockButton.className = 'lock-btn';
        lockButton.innerHTML = item.isLocked ? '🔒' : '🔓';
        lockButton.title = item.isLocked ? t('ui.inventory.unlock_item_title') : t('ui.inventory.lock_item_title');
        lockButton.onclick = (event) => {
            event.stopPropagation();
            toggleItemLock(uids[0]);
        };

        if (item.isFood) {
            const bonusText = formatStatsToString({[item.bonus.stat]: item.bonus.value});
            nameSpan.title = t('ui.inventory.food_bonus_title', { bonusText: bonusText, duration: item.bonus.duration_in_combats });
            attachInteractionListener(nameSpan, {
                onTap: () => useFoodItem(uids[0])
            });
        } else {
            attachInteractionListener(nameSpan, {
                onTap: () => equipItem(uids[0]),
                onLongPress: () => showItemTooltip(uids[0]),
                onHover: () => showTooltip(buildItemTooltipHTML(item), nameSpan)
            });
            if (!isTouch) {
                nameSpan.addEventListener('mouseleave', hideStatTooltip);
            }
        }
        
        let displayName = `${t(item.nameKey)}${count > 1 ? ` (x${count})` : ''}`;
        if (item.enchanter && item.enchanter.affixKey) {
            const affixInfo = AFFIX_DB[item.type]?.find(a => a.key === item.enchanter.affixKey);
            if (affixInfo) {
                displayName += ` <span class="${RARITY_CONFIG[item.enchanter.rarity].colorClass}">[${t(affixInfo.nameKey)}]</span>`;
            }
        }
        nameSpan.innerHTML = displayName;
        nameSpan.className = RARITY_CONFIG[item.rarity]?.colorClass || 'rarity-common';
        nameSpan.style.cursor = 'pointer';

        recycleButton.className = 'recycle-btn-small';
        recycleButton.innerHTML = '♻️';
        recycleButton.disabled = item.isLocked;
        recycleButton.onclick = (event) => {
            event.stopPropagation();
            recycleItem(uids[0]);
        };

        li.appendChild(lockButton);
        li.appendChild(nameSpan);
        li.appendChild(recycleButton);
        inventoryList.appendChild(li);
    });
}

function updateForgeDisplay() {
    const player = gameState.player;
    const forge = gameState.village.forge;
    const forgeSection = document.getElementById('forge-section');
    forgeSection.innerHTML = '';

    if (forge.level === 0 && forge.constructionEnd === 0) {
        forgeSection.innerHTML = `
            <div id="forge-unlock-info">
                <p>${t('ui.forge.unlock_prompt', { cost: `<strong>${FORGE_UNLOCK_COST}</strong> 🪵` })}</p>
                <button id="unlock-forge-button" class="action-button" onclick="unlockForge()" ${player.resources.bois < FORGE_UNLOCK_COST ? 'disabled' : ''}>${t('ui.forge.unlock_button')}</button>
            </div>`;
        return;
    }
    
    if (forge.constructionEnd > 0) {
        const remainingMs = forge.constructionEnd - Date.now();
        const cost = Math.ceil((remainingMs / 3600000) * SPEED_UP_COST_PER_HOUR);
        const levelTarget = forge.level === 0 ? 1 : forge.level + 1;
        const eaIconHtml = `<img src="assets/sprites/ressources/eclats_ascension.png" class="icon-sprite-small" alt="EA">`;

        forgeSection.innerHTML = `
            <div id="forge-upgrade-section" style="text-align: center;">
                <h4>${t('ui.fief.under_construction')} (Niv. ${levelTarget})</h4>
                <p>${t('ui.fief.construction_time_left')} 
                    <strong class="construction-timer" data-construction-end="${forge.constructionEnd}">00:00:00</strong>
                </p>
                <button class="action-button" onclick="speedUpConstruction('forge', 'village')">
                    ${t('ui.fief.speed_up_button', { cost: cost, ea_icon: eaIconHtml })}
                </button>
            </div>`;
        return;
    }

    const nextLevel = forge.level + 1;
    const upgradeData = FORGE_UPGRADE_COSTS[forge.level];
    let upgradeHTML = `<p>${t('ui.forge.level_max_info', { level: `<strong>${forge.level}</strong>` })}</p>`;
    if (upgradeData) {
        let canAfford = true;
        const costParts = [];
        for (const res in upgradeData.cost) {
            const playerAmount = (res === 'fragments') ? (gameState.player.fragments || 0) : (gameState.player.resources[res] || 0);
            if (playerAmount < upgradeData.cost[res]) {
                canAfford = false;
            }
            const icon = `<img src="${SPRITE_PATHS[res]}" class="icon-sprite-small" title="${res}">`;
            // MON COMMENTAIRE : J'enveloppe chaque coût dans le span ici.
            costParts.push(`<span class="cost-item"><strong>${upgradeData.cost[res]}</strong> ${icon}</span>`);
        }
        const costString = costParts.join('');

        upgradeHTML = `
            <p>${t('ui.forge.upgrade_prompt', { level: `<strong>${forge.level}</strong>`, cost: costString })}</p>
            <button id="upgrade-forge-button" class="action-button" onclick="upgradeForge()" ${!canAfford ? 'disabled' : ''}>${t('ui.buttons.upgrade')}</button>
        `;
    }

    const filtersHTML = `
        <div id="forge-filters">
            <div class="forge-filter-group">
                <label for="forge-type-filter">${t('ui.forge.filter_type_label')}</label>
                <select id="forge-type-filter" onchange="displayCraftableItems()">
                    <option value="all">${t('ui.forge.filter_all')}</option>
                </select>
                <label for="forge-rarity-filter">${t('ui.forge.filter_rarity_label')}</label>
                <select id="forge-rarity-filter" onchange="displayCraftableItems()"></select>
            </div>
            <div class="forge-filter-group">
                <label for="forge-class-filter">${t('ui.forge.filter_class_label')}</label>
                <select id="forge-class-filter" onchange="displayCraftableItems()">
                    <option value="all">${t('ui.forge.filter_class_all')}</option>
                    <option value="Guerrier">Guerrier</option>
                    <option value="Archer">Archer</option>
                    <option value="Mage">Mage</option>
                </select>
            </div>
        </div>
    `;

    forgeSection.innerHTML = `
        <div id="forge-content">
            <div id="forge-upgrade-section">${upgradeHTML}</div>
            <hr/>
            <h3>${t('ui.forge.craftable_items_title')}</h3>
            ${filtersHTML}
            <div id="craftable-items-list"></div>
            <div class="forge-actions-footer">
                <button id="main-craft-button" class="action-button" onclick="confirmAndCraftSelectedItem()" disabled>${t('ui.forge.craft_button')}</button>
            </div>
        </div>`;

    const typeFilterSelect = document.getElementById('forge-type-filter');
    if (typeFilterSelect) {
        if (typeFilterSelect.options.length <= 1) { 
            EQUIPMENT_SLOTS.forEach(slot => {
                typeFilterSelect.add(new Option(t(`ui.equipment_slots.${slot}`), slot));
            });
        }
    }
    displayCraftableItems();
}

function selectForgeItem(itemId, element) {
    // Retire la sélection de l'ancienne carte
    const currentlySelected = document.querySelector('.craftable-item-card.selected');
    if (currentlySelected) {
        currentlySelected.classList.remove('selected');
    }

    // Si on reclique sur la même carte, on la désélectionne
    if (selectedForgeItem === itemId) {
        selectedForgeItem = null;
        document.getElementById('main-craft-button').disabled = true;
    } else {
        // Sinon, on sélectionne la nouvelle
        selectedForgeItem = itemId;
        element.classList.add('selected');
        document.getElementById('main-craft-button').disabled = false;
    }
}

async function confirmAndCraftSelectedItem() {
    if (!selectedForgeItem) return;

    const itemToCraft = ITEMS_DB.find(item => item.id === selectedForgeItem) || Object.values(ARTEFACTS_DB).find(item => item.id === selectedForgeItem);
    if (!itemToCraft) return;

    const itemName = t(itemToCraft.nameKey);
    const confirmed = await showCustomConfirm(`Êtes-vous sûr de vouloir fabriquer <strong>${itemName}</strong> ?`);

    if (confirmed) {
        // On vérifie si c'est un artefact ou un item normal
        if (itemToCraft.modifiers) {
            craftArtefact(selectedForgeItem);
        } else {
            craftItem(selectedForgeItem);
        }
    }
}

function initializeInventoryFilters() {
    const filtersContainer = document.getElementById('inventory-filters');
    // On vérifie si les filtres existent déjà pour ne pas les recréer
    if (document.getElementById('inventory-type-filter')) return;

    filtersContainer.innerHTML = `
        <label for="inventory-type-filter">${t('ui.inventory.filter_by_type')}</label>
        <select id="inventory-type-filter" onchange="updateInventoryUI()">
            <option value="none">${t('ui.inventory.filter_none')}</option>
            <option value="all">${t('ui.inventory.filter_all')}</option>
        </select>
        <button id="recycle-all-button" class="recycle-all-btn" onclick="confirmRecycleAll()">${t('ui.inventory.recycle_all_button')}</button>
    `;

    const typeSelect = document.getElementById('inventory-type-filter');
    EQUIPMENT_SLOTS.forEach(slot => { 
        typeSelect.add(new Option(t(`ui.equipment_slots.${slot}`), slot)); 
    });
}

function getHighestAllowedRarityForCrafting() {
    const forge = gameState.village.forge;
    const forgeLevelRarity = RARITY_ORDER[forge.level - 1] || 'common';

    let talentRarity = 'rare';
    if (hasConstellationTalent('destiny_mythic_knowledge')) {
        talentRarity = 'mythic';
    } else if (hasConstellationTalent('destiny_legendary_knowledge')) {
        talentRarity = 'legendary';
    } else if (hasConstellationTalent('destiny_epic_knowledge')) {
        talentRarity = 'epic';
    }
    
    const forgeIndex = RARITY_ORDER.indexOf(forgeLevelRarity);
    const talentIndex = RARITY_ORDER.indexOf(talentRarity);

    return RARITY_ORDER[Math.min(forgeIndex, talentIndex)];
}

function displayCraftableItems() {
    const typeFilterSelect = document.getElementById('forge-type-filter');
    const rarityFilterSelect = document.getElementById('forge-rarity-filter');
    const classFilterSelect = document.getElementById('forge-class-filter');
    const listContainer = document.getElementById('craftable-items-list');
    if (!listContainer || !typeFilterSelect || !rarityFilterSelect || !classFilterSelect) return;

    listContainer.innerHTML = '';
    const player = gameState.player;

    if (!classFilterSelect.dataset.initialized) {
        classFilterSelect.value = player.class;
        classFilterSelect.dataset.initialized = "true";
    }

    const classFilter = classFilterSelect.value;
    const typeFilter = typeFilterSelect.value;

    const allowedRarity = getHighestAllowedRarityForCrafting();
    const maxRarityIndex = RARITY_ORDER.indexOf(allowedRarity);

    const currentRarityValue = rarityFilterSelect.value;
    rarityFilterSelect.innerHTML = '';
    rarityFilterSelect.add(new Option(t('ui.forge.filter_rarity_all'), 'all'));
    rarityFilterSelect.add(new Option(t('ui.forge.filter_rarity_none'), 'none'));
    if (maxRarityIndex >= 0) {
        let unlockedRarities = RARITY_ORDER.slice(0, maxRarityIndex + 1);
        if (typeFilter === 'Artefact') {
            unlockedRarities = unlockedRarities.filter(r => r !== 'common' && r !== 'uncommon');
        }
        unlockedRarities.forEach(rarityKey => {
            rarityFilterSelect.add(new Option(t(RARITY_CONFIG[rarityKey].nameKey), rarityKey));
        });
    }
    rarityFilterSelect.value = currentRarityValue;
    const rarityFilter = rarityFilterSelect.value;

    if (rarityFilter === 'none') {
        listContainer.innerHTML = `<p style="text-align: center; color: #aaa;">${t('ui.forge.select_rarity_prompt')}</p>`;
        return;
    }

    let itemsToFilter = (typeFilter === 'Artefact') ? Object.values(ARTEFACTS_DB) : ITEMS_DB;

    const filteredItems = itemsToFilter.filter(item => {
        if (!item.cost && !item.craftCost) return false;

        if (item.rarity) {
            const itemRarityIndex = RARITY_ORDER.indexOf(item.rarity);
            if (itemRarityIndex > maxRarityIndex) return false;
            if (rarityFilter !== 'all' && item.rarity !== rarityFilter) return false;
        }

        if (typeFilter !== 'all' && typeFilter !== 'Artefact' && item.type !== typeFilter) return false;

        if (classFilter !== 'all') {
            if (item.class_restriction) {
                const isAllowed = [].concat(item.class_restriction).includes(classFilter);
                if (!isAllowed) return false;
            } else {
                if (item.type === 'Artefact') return false;
            }
        }

        return true;
    });

    if (filteredItems.length === 0) {
        listContainer.innerHTML = `<p style="text-align: center; color: #aaa;">${t('ui.forge.no_matching_items')}</p>`;
        return;
    }

    filteredItems.forEach(item => {
        let canAfford = true;
        let costHtml = '';
        let statsHtml = '';
        let descriptionHtml = '';
        const itemTypeForDisplay = t(`ui.equipment_slots.${item.type}`) || item.type;
        const itemName = t(item.nameKey);

        if (item.modifiers) { // C'est un Artefact
            const cost = item.cost.eclats_instables;
            if ((player.resources.eclats_instables || 0) < cost) canAfford = false;
            costHtml = `${cost} <img src="${SPRITE_PATHS.eclats_instables}" class="icon-sprite-small">`;
            statsHtml = Object.entries(item.modifiers).map(([stat, value]) => {
                const displayName = t(`stats.displayNames.${stat}`) || stat.replace(/_/g, ' ');
                return `<span>${displayName}: ${value > 0 ? '+' : ''}${value}${String(stat).includes('_percent') ? '%' : ''}</span>`;
            }).join(' ');
            descriptionHtml = `<p style="font-style: italic;">"${t(item.descriptionKey)}"</p>`;
        } else { // C'est un équipement normal
            const fragCost = CRAFTING_COST_IN_FRAGMENTS[item.rarity];
            if ((player.fragments || 0) < fragCost) canAfford = false;
            const costParts = [`${fragCost} <img src="${SPRITE_PATHS.fragments}" class="icon-sprite-small">`];
            for (const resource in item.cost) {
                if ((player.resources[resource] || 0) < item.cost[resource]) canAfford = false;
                costParts.push(`${item.cost[resource]} <img src="${SPRITE_PATHS[resource]}" class="icon-sprite-small" title="${resource}">`);
            }
            costHtml = costParts.join(' + ');
            statsHtml = Object.entries(item.stats).map(([stat, value]) => `<span>${t(`stats.displayNames.${stat}`) || stat}: ${value > 0 ? '+' : ''}${value}</span>`).join(' ');
        }

        const card = document.createElement('div');
        card.className = 'craftable-item-card';
        // ==================== DÉBUT DE LA MODIFICATION ====================
        // On change l'action de clic pour appeler la sélection
        card.onclick = () => selectForgeItem(item.id, card);
        if (!canAfford) {
            card.style.opacity = '0.5'; // Grise les objets non fabricables
        }

        // On retire le bouton de la carte
        card.innerHTML = `
            <h4 class="${RARITY_CONFIG[item.rarity]?.colorClass || 'rarity-common'}">${itemName}</h4>
            ${descriptionHtml}
            <p><strong>${t('ui.forge.item_type_label')}</strong> ${itemTypeForDisplay}</p>
            <p><strong>${t('ui.forge.item_effects_label')}</strong> ${statsHtml || t('ui.forge.item_effects_none')}</p>
            <div>
                <p><strong>${t('ui.forge.item_cost_label')}</strong> ${costHtml}</p>
            </div>
        `;
        // ===================== FIN DE LA MODIFICATION =====================
        listContainer.appendChild(card);
    });
}

window.togglePanel = function(panelId) {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.add('hidden'));
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));

    const panelToShow = document.getElementById(panelId + '-panel');
    if (panelToShow) panelToShow.classList.remove('hidden');

    const buttonToActivate = document.querySelector(`.tab-button[onclick="togglePanel('${panelId}')"]`);
    if (buttonToActivate) buttonToActivate.classList.add('active');

    // Si on ouvre le village, on initialise la vue du hub
    if (panelId === 'village') {
        showVillageHub();
    }

    // ----- LA CORRECTION EST ICI -----
    // On attend que le panneau soit visible avant de mettre à jour son contenu.
    if (panelId === 'codex') {
        setTimeout(updateCodexUI, 10); // Petit délai pour le Codex
    }
    if (panelId === 'maitrise') {
        setTimeout(updateMasteryUI, 10); // Petit délai pour la Maîtrise
    }
    // ----- FIN DE LA CORRECTION -----
}

function displayAffixDetails(itemType, affixKey) {
    const modal = document.getElementById('affix-breakdown-modal');
    const title = document.getElementById('affix-breakdown-title');
    const tiersContainer = document.getElementById('affix-breakdown-tiers');
    if (!modal || !title || !tiersContainer) return;

    const affixData = AFFIX_DB[itemType]?.find(a => a.key === affixKey);
    if (!affixData) return;

    title.textContent = t('ui.affixes.details_title', { affixName: t(affixData.nameKey) });
    tiersContainer.innerHTML = '';

    affixData.tiers.forEach(tier => {
        let statsHtml = Object.entries(tier.stats).map(([stat, range]) => {
            const displayName = t(`stats.displayNames.${stat}`) || stat;
            const suffix = String(stat).includes('_percent') ? '%' : '';
            
            if (range[0] === range[1]) {
                return `<span>${displayName}: +${range[0]}${suffix}</span>`;
            } else {
                return `<span>${displayName}: +${range[0]}${suffix} à +${range[1]}${suffix}</span>`;
            }

        }).join('<br>');

        tiersContainer.innerHTML += `
            <div class="affix-tier-details">
                <strong class="${RARITY_CONFIG[tier.rarity].colorClass}">${t(RARITY_CONFIG[tier.rarity].nameKey)}</strong>
                <div class="affix-tier-stats">${statsHtml}</div>
            </div>
        `;
    });
    
    modal.classList.remove('hidden');
}

window.closeAffixBreakdownModal = function() {
    const modal = document.getElementById('affix-breakdown-modal');
    if (modal) modal.classList.add('hidden');
}

function displayAlchemistUI() {
    const listContainer = document.getElementById('alchemist-items-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    Object.values(ALCHEMY_RECIPES_DB).forEach(recipe => {
        let canAfford = true;
        const costParts = [];
        for (const resource in recipe.craftCost) {
            const required = recipe.craftCost[resource];
            const playerAmount = (resource === 'fragments') ? (gameState.player.fragments || 0) : (gameState.player.resources[resource] || 0);
            if (playerAmount < required) canAfford = false;
            costParts.push(`${required} <img src="${SPRITE_PATHS[resource]}" class="icon-sprite-small" title="${resource}">`);
        }
        
        const card = document.createElement('div');
        card.className = 'craftable-item-card'; // On réutilise le style de la forge
        card.innerHTML = `
            <h4>${t(recipe.nameKey)}</h4>
            <p><i>"${t(recipe.descriptionKey)}"</i></p>
            <div>
                <p><strong>${t('ui.alchemist.cost_label')}</strong> ${costParts.join(' + ')}</p>
                <button onclick="craftAlchemicalItem('${recipe.id}')" ${!canAfford ? 'disabled' : ''}>${t('ui.alchemist.craft_button')}</button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function displayOracleUI() {
    const familiesContainer = document.getElementById('oracle-families-list');
    if (!familiesContainer) return;

    familiesContainer.innerHTML = '';
    const collectedCards = gameState.player.collectedCards || [];

    Object.keys(CARD_FAMILIES_DB).forEach(familyKey => {
        const familyData = CARD_FAMILIES_DB[familyKey];
        const ownedCards = familyData.cards.filter(cardName => 
            collectedCards.some(traitId => {
                let traitData = null;
                for (const tier in TRAITS_DB) {
                    const found = TRAITS_DB[tier].find(t => t.id === traitId);
                    if (found) { traitData = found; break; }
                }
                return traitData && cardName === t(traitData.card.nameKey);
            })
        );
        
        if (ownedCards.length === 0) {
            return;
        }
        
        const familyCard = document.createElement('div');
        familyCard.className = 'oracle-family-card';
        familyCard.onclick = () => openOracleFamilyModal(familyKey);
        
        const isComplete = ownedCards.length === familyData.cards.length;
        if (isComplete) {
            familyCard.classList.add('completed');
        }

        familyCard.innerHTML = `
            <h4>${t(familyData.nameKey)}</h4>
            <p>${t('ui.oracle.collection_label')} ${ownedCards.length} / ${familyData.cards.length}</p>
            <div class="family-bonus-preview ${isComplete ? 'active' : ''}">
                ${t('ui.oracle.bonus_label')} ${formatStatsToString(familyData.bonus)}
            </div>
        `;
        familiesContainer.appendChild(familyCard);
    });

    if (familiesContainer.innerHTML === '') {
        familiesContainer.innerHTML = `<p style="text-align: center; color: #aaa;">${t('ui.oracle.no_families_started')}</p>`;
    }
}

function openOracleFamilyModal(familyKey) {
    const modal = document.getElementById('oracle-family-modal');
    const title = document.getElementById('oracle-family-modal-title');
    const cardsContainer = document.getElementById('oracle-family-modal-cards');
    if (!modal || !title || !cardsContainer) return;
    
    const familyData = CARD_FAMILIES_DB[familyKey];
    title.textContent = t(familyData.nameKey);
    cardsContainer.innerHTML = '';

    const collectedCardNames = (gameState.player.collectedCards || []).map(traitId => {
        for (const tier in TRAITS_DB) {
            const found = TRAITS_DB[tier].find(t => t.id === traitId);
            if (found) return t(found.card.nameKey);
        }
        return null;
    }).filter(Boolean);

    familyData.cards.forEach(cardName => {
        const isOwned = collectedCardNames.includes(cardName);
        let cardImage = "";

        for (const tier in TRAITS_DB) {
            const found = Object.values(TRAITS_DB[tier]).find(trait => cardName === t(trait.card.nameKey));
            if (found) {
                cardImage = found.card.image;
                break;
            }
        }
        
        cardsContainer.innerHTML += `
            <div class="oracle-card ${isOwned ? '' : 'missing'}">
                <img src="${cardImage}" alt="${isOwned ? cardName : t('ui.oracle.missing_card_alt')}">
                <h4>${cardName}</h4>
                ${!isOwned ? `<p class="missing-text">${t('ui.oracle.missing_card_text')}</p>` : ''}
            </div>
        `;
    });
    
    modal.classList.remove('hidden');
}

window.closeOracleFamilyModal = function() {
    const modal = document.getElementById('oracle-family-modal');
    if (modal) modal.classList.add('hidden');
}

function switchVillageTab(tabId) {
    // Cache les deux contenus
    document.getElementById('forge-content-wrapper').classList.add('hidden');
    document.getElementById('enchanter-content-wrapper').classList.add('hidden');
    
    // Retire 'active' des deux boutons
    document.querySelectorAll('.sub-tab-button').forEach(button => button.classList.remove('active'));

    // Affiche le bon contenu et active le bon bouton
    document.getElementById(tabId + '-content-wrapper').classList.remove('hidden');
    document.querySelector(`.sub-tab-button[onclick="switchVillageTab('${tabId}')"]`).classList.add('active');
}

window.switchStatsTab = function(tabName) {
    // On cache tous les contenus
    document.querySelectorAll('.stat-tab-content').forEach(content => content.style.display = 'none');
    // On retire la classe active de tous les boutons
    document.querySelectorAll('.stat-tab-button').forEach(button => button.classList.remove('active'));

    // On affiche le bon contenu et on active le bon bouton
    document.getElementById(tabName + '-stats-content').style.display = 'block';
    document.querySelector(`.stat-tab-button[onclick="switchStatsTab('${tabName}')"]`).classList.add('active');
    if (tabName === 'traits') {
        updateTraitsStatsPanel();
    }
}

window.switchOptionsTab = function(tabId) {
    // Cacher tous les panneaux
    document.querySelectorAll('.options-panel').forEach(panel => {
        panel.style.display = 'none';
    });

    // Retirer la classe 'active' de tous les boutons du menu
    document.querySelectorAll('.options-menu li').forEach(li => {
        li.classList.remove('active');
    });

    // Afficher le panneau sélectionné
    const panelToShow = document.getElementById('options-panel-' + tabId);
    if (panelToShow) {
        panelToShow.style.display = 'block';
    }

    // Marquer le bouton du menu comme actif
    const menuItem = document.querySelector(`.options-menu li[onclick="switchOptionsTab('${tabId}')"]`);
    if (menuItem) { 
        menuItem.classList.add('active');
    }
}

function updateTraitsStatsPanel(containerId = 'traits-stats-content') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const traits = gameState.player.traits || [];

    if (traits.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #aaa;">${t('ui.traits.no_traits_acquired')}</p>`;
        return;
    }

    let html = `<h3>${t('ui.traits.active_traits_title')}</h3>`;
    traits.forEach(trait => {
        html += `<p style="margin-bottom: 10px;"><strong>${trait.icon} ${t(trait.nameKey).replace(t('ui.traits.trait_prefix'), "")}:</strong><br>`;
        const effectsParts = [];
        for (const effect in trait.effects) {
            const value = trait.effects[effect];
            const displayName = t(`stats.displayNames.${effect}`) || effect.replace(/_/g, ' ');
            const suffix = String(effect).includes('_percent') ? '%' : '';
            const sign = value > 0 ? '+' : '';
            effectsParts.push(`${displayName} ${sign}${value}${suffix}`);
        }
        html += `<small style="color: #ccc;"><i>${effectsParts.join(', ')}</i></small></p>`;
    });

    container.innerHTML = html;
}

window.toggleMainMenu = function() {
    const menu = document.getElementById('main-menu');
    const isOpening = menu.classList.toggle('hidden');

    // Si le menu est en train de s'ouvrir (c'est-à-dire que la classe 'hidden' vient d'être enlevée)
    if (!isOpening) {
        // On attend un instant pour que l'événement de clic qui a ouvert le menu se termine
        setTimeout(() => {
            window.addEventListener('click', closeMenuOnClickOutside);
        }, 0);
    } else {
        // Si on ferme le menu, on retire l'écouteur pour ne pas qu'il tourne pour rien
        window.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// AJOUTEZ CETTE NOUVELLE FONCTION juste après toggleMainMenu
/**
 * Gère la fermeture du menu si le clic a lieu à l'extérieur.
 * @param {Event} event - L'événement de clic.
 */
function closeMenuOnClickOutside(event) {
    const menu = document.getElementById('main-menu');
    const hamburgerButton = document.getElementById('hamburger-button');

    // Si le menu n'est pas ouvert, ou si le clic est sur le bouton ou à l'intérieur du menu, on ne fait rien.
    if (menu.classList.contains('hidden') || hamburgerButton.contains(event.target) || menu.contains(event.target)) {
        return;
    }

    // Sinon, on ferme le menu
    menu.classList.add('hidden');
    // Et on n'oublie pas de retirer l'écouteur !
    window.removeEventListener('click', closeMenuOnClickOutside);
}

window.toggleStatsModal = function(show) {
    const modal = document.getElementById('stats-modal');
    if (show) {
        updateStatsUI();
        modal.style.display = 'flex'; // On ajoute le style ici
        modal.classList.remove('hidden'); 
        document.getElementById('main-menu').classList.add('hidden');
    } else {
        modal.style.display = 'none'; // On cache la fenêtre ici
        modal.classList.add('hidden');
    }
}

function updateStatsUI() {
    if (!gameState || !gameState.stats) return;

    let totalKills = 0;
    if (gameState.player && gameState.player.killCount) {
        totalKills = Object.values(gameState.player.killCount).reduce((sum, count) => sum + count, 0);
    }
    
    const succeeded = gameState.stats.expeditionsSucceeded || 0;
    const failed = gameState.stats.expeditionsFailed || 0;
    const started = gameState.stats.expeditionsStarted || 0;
    let successRate = 0;
    const totalOutcomes = succeeded + failed;
    if (totalOutcomes > 0) {
        successRate = (succeeded / totalOutcomes) * 100;
    }

    // MON COMMENTAIRE : J'ai corrigé les clés de traduction ici en enlevant le préfixe "ui.".
    const statsMapping = {
        'stat-expeditions-started': { value: started, labelKey: 'stats.expeditions_started' },
        'stat-expeditions-succeeded': { value: succeeded, labelKey: 'stats.expeditions_succeeded' },
        'stat-expeditions-failed': { value: failed, labelKey: 'stats.expeditions_failed' },
        'stat-expedition-success-rate': { value: `${successRate.toFixed(1)}%`, labelKey: 'stats.expedition_success_rate' },
        'stat-player-deaths': { value: gameState.stats.playerDeaths || 0, labelKey: 'stats.player_deaths' },
        'stat-bosses-killed': { value: gameState.stats.bossesKilled || 0, labelKey: 'stats.bosses_killed' },
        'stat-enemies-killed': { value: Math.floor(totalKills), labelKey: 'stats.enemies_killed' },
        'stat-items-crafted': { value: gameState.stats.itemsCrafted || 0, labelKey: 'stats.items_crafted' },
        'stat-items-recycled': { value: gameState.stats.itemsRecycled || 0, labelKey: 'stats.items_recycled' },
        'stat-items-enchanted': { value: gameState.stats.itemsEnchanted || 0, labelKey: 'stats.items_enchanted' },
        'stat-fragments-earned': { value: Math.floor(gameState.stats.totalFragmentsEarned) || 0, labelKey: 'stats.fragments_earned' },
        'stat-xp-earned': { value: Math.floor(gameState.stats.totalXpGained) || 0, labelKey: 'stats.xp_earned' }
    };

    for (const id in statsMapping) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = statsMapping[id].value;
            const labelElement = document.getElementById(`stat-label-${id.substring(5)}`); // Cible le span par son ID
            if (labelElement) {
                labelElement.textContent = t(statsMapping[id].labelKey);
            }
        }
    }
}

window.openOptions = function(context = 'game', defaultTab = 'general') {
    // MON COMMENTAIRE : J'ai retiré les boutons de connexion/déconnexion et leur séparateur
    // de cette liste pour qu'ils soient gérés indépendamment du contexte.
    const gameOnlyItems = [
        'options-menu-patch', 'options-menu-bug', 'options-menu-reinitialiser',
        'options-menu-sep1'
    ];

    const isCreationContext = (context === 'creation');
    gameOnlyItems.forEach(id => {
        const item = document.getElementById(id);
        if (item) {
            // On cache les éléments spécifiques au jeu si on est sur l'écran de création
            item.classList.toggle('hidden', isCreationContext);
        }
    });

    const user = window.firebaseTools.auth.currentUser;
    const loginMenuItem = document.getElementById('options-menu-login');
    const logoutMenuItem = document.getElementById('options-menu-logout');
    const separator2 = document.getElementById('options-menu-sep2');
    
    // MON COMMENTAIRE : Cette logique s'applique maintenant dans tous les contextes (jeu et création).
    if (loginMenuItem && logoutMenuItem && separator2) {
        if (user) {
            loginMenuItem.classList.add('hidden');
            logoutMenuItem.classList.remove('hidden');
        } else {
            loginMenuItem.classList.remove('hidden');
            logoutMenuItem.classList.add('hidden');
        }
        // MON COMMENTAIRE : On affiche le séparateur uniquement en jeu, où il y a des
        // éléments au-dessus de la section de connexion.
        separator2.classList.toggle('hidden', isCreationContext);
    }

    // Le reste de la fonction est inchangé
    const logoutButtonInPanel = document.getElementById('creation-logout-button');
    if (logoutButtonInPanel) {
        if (context === 'game' && user) {
            logoutButtonInPanel.classList.remove('hidden');
        } else {
            logoutButtonInPanel.classList.add('hidden');
        }
    }

    toggleOptionsModal(true, defaultTab);
    const menu = document.getElementById('main-menu');
    if (menu) menu.classList.add('hidden');
};

function formatStatsTooltip(stats) {
    // MODIFIÉ
    if (!stats || Object.keys(stats).length === 0) return t('ui.stats.no_stats');
    
    return Object.entries(stats).map(([key, val]) => {
        const displayName = t(`stats.displayNames.${key}`) || key;
        const suffix = String(key).includes('_percent') ? '%' : '';
        const sign = val > 0 ? '+' : '';
        return `${displayName}: ${sign}${val}${suffix}`;
    }).join('\n');
}

function updateCodexUI() {
    if (!gameState.player) return;
    const codexList = document.getElementById('codex-list');
    if (!codexList) return;

    const allEnemies = { ...ENEMIES_DB, ...Object.fromEntries(BOSS_DB.map(b => [b.name, b])) };
    
    const discoveredEnemyKeys = Object.keys(allEnemies).filter(key => {
        return (gameState.player.killCount[key] || 0) > 0;
    }).sort((a, b) => {
        const killCountA = gameState.player.killCount[a] || 0;
        const killCountB = gameState.player.killCount[b] || 0;
        return killCountB - killCountA;
    });

    if (discoveredEnemyKeys.length === 0) {
        // MODIFIÉ
        codexList.innerHTML = `<p style="text-align: center; color: #aaa;">${t('ui.codex.no_enemies_discovered')}</p>`;
        return;
    }

    codexList.innerHTML = ''; 
    
    for (const enemyKey of discoveredEnemyKeys) {
        const enemy = allEnemies[enemyKey];
        const killCount = Math.floor(gameState.player.killCount[enemyKey] || 0); // Assure un entier
        const enemyName = t(enemy.nameKey);
        
        // MODIFIÉ
        let currentTierName = t('ui.codex.tier_new');
        let nextTierKills = 5;
        let tierColorClass = 'rarity-common';
        const sortedTiers = Object.keys(CODEX_MILESTONES_DB).map(Number).sort((a, b) => a - b);
        for (const tierKills of sortedTiers) {
            if (killCount >= tierKills) {
                currentTierName = t(CODEX_MILESTONES_DB[tierKills].tierNameKey);
            } else {
                nextTierKills = tierKills;
                break;
            }
        }
        if (killCount >= sortedTiers[sortedTiers.length - 1]) {
            nextTierKills = sortedTiers[sortedTiers.length - 1];
        }

        // Simplification en utilisant directement les clés traduites
        if (currentTierName === t('codex.tiers.maitre')) tierColorClass = 'rarity-legendary';
        else if (currentTierName === t('codex.tiers.expert')) tierColorClass = 'rarity-epic';
        else if (currentTierName === t('codex.tiers.confirme')) tierColorClass = 'rarity-rare';
        else if (currentTierName === t('codex.tiers.novice')) tierColorClass = 'rarity-uncommon';

        const entryDiv = document.createElement('div');
        entryDiv.className = 'codex-entry clickable';
        entryDiv.onclick = () => openCodexDetailModal(enemyKey);
        
        const spriteHtml = enemy.sprite 
            ? `<div class="codex-sprite-container"><img src="${enemy.sprite}" alt="${enemyName}"></div>` 
            : `<div class="codex-sprite-container">?</div>`;

        const progressPercent = Math.min(100, (killCount / nextTierKills) * 100);

        // MODIFIÉ
        entryDiv.innerHTML = `
            <div class="codex-header">
                ${spriteHtml}
                <div class="codex-info">
                    <h4 class="${tierColorClass}">${enemyName}</h4>
                    <p class="codex-tier">${t('ui.codex.tier_label')} <strong class="${tierColorClass}">${currentTierName}</strong></p>
                </div>
            </div>
            <div class="codex-progress">
                <div class="codex-progress-bar-bg">
                    <div class="codex-progress-bar-fill" style="width: ${progressPercent}%;"></div>
                </div>
                <p class="codex-progress-text">${killCount} / ${nextTierKills} ${t('ui.codex.kills_label')}</p>
            </div>
        `;
        
        codexList.appendChild(entryDiv);
    }
}

function openCodexDetailModal(enemyKey) {
    const modal = document.getElementById('codex-detail-modal');
    if (!modal) return;

    const allEnemies = { ...ENEMIES_DB, ...Object.fromEntries(BOSS_DB.map(b => [b.name, b])) };
    const enemyData = allEnemies[enemyKey];
    const killCount = gameState.player.killCount[enemyKey] || 0;

    // Mise à jour du nom (déjà correct)
    document.getElementById('codex-detail-name').textContent = t(enemyData.nameKey);

    // Section Sprite
    const spriteContainer = document.getElementById('codex-detail-sprite-container');
    if (killCount >= CODEX_INFO_THRESHOLDS.SPRITE) {
        spriteContainer.innerHTML = `<img src="${enemyData.sprite}" alt="${t(enemyData.nameKey)}">`;
    } else {
        // MON COMMENTAIRE : On utilise la clé de traduction pour le placeholder
        spriteContainer.innerHTML = `<span style="font-size: 4em; color: #444;">${t('ui.codex.modal.sprite_placeholder')}</span>`;
    }

    // Section Description
    const descriptionSection = document.getElementById('codex-detail-description');
    if (killCount >= CODEX_INFO_THRESHOLDS.DESCRIPTION) {
        // MON COMMENTAIRE : Utilisation de t() pour le titre "Description"
        descriptionSection.innerHTML = `<h4>${t('ui.codex.modal.title_description')}</h4><p>${t(enemyData.descriptionKey)}</p>`;
    } else {
        // MON COMMENTAIRE : Utilisation de t() pour le titre et le message de verrouillage
        descriptionSection.innerHTML = `<h4>${t('ui.codex.modal.title_description')}</h4><p class="locked-info">${t('ui.codex.modal.unlock_prompt', { count: CODEX_INFO_THRESHOLDS.DESCRIPTION })}</p>`;
    }

    // Section Emplacements
    const locationsSection = document.getElementById('codex-detail-locations');
    if (killCount >= CODEX_INFO_THRESHOLDS.LOCATIONS) {
        const locations = ENEMY_LOCATIONS_DB[enemyKey] || [];
        // MON COMMENTAIRE : Utilisation de t() pour le titre "Trouvé dans"
        let locationsHtml = `<h4>${t('ui.codex.modal.title_locations')}</h4>`;
        if (locations.length > 0) {
            locationsHtml += '<ul>';
            locations.forEach(locKey => {
                locationsHtml += `<li>${t(locKey)}</li>`;
            });
            locationsHtml += '</ul>';
        } else {
            // MON COMMENTAIRE : Utilisation de t() pour le message d'absence de lieux
            locationsHtml += `<p>${t('ui.codex.modal.no_locations')}</p>`;
        }
        locationsSection.innerHTML = locationsHtml;
    } else {
        // MON COMMENTAIRE : Utilisation de t() pour le titre et le message de verrouillage
        locationsSection.innerHTML = `<h4>${t('ui.codex.modal.title_locations')}</h4><p class="locked-info">${t('ui.codex.modal.unlock_prompt', { count: CODEX_INFO_THRESHOLDS.LOCATIONS })}</p>`;
    }

    // Section Statistiques
    const statsSection = document.getElementById('codex-detail-stats');
    if (killCount >= CODEX_INFO_THRESHOLDS.STATS) {
        const ascensionLevel = gameState.ascensionLevel || 0;
        // MON COMMENTAIRE : Utilisation de t() pour le titre et la note sur l'ascension
        let statsHtml = `<h4>${t('ui.codex.modal.title_stats')} <small>(${t('ui.codex.modal.stats_ascension_note', { level: ascensionLevel })})</small></h4><table>`;
        const difficultyMultiplier = getAscensionDifficultyMultiplier();
        for (const stat in enemyData.baseStats) {
            const baseStat = enemyData.baseStats[stat];
            const scaledStat = Math.floor(baseStat * difficultyMultiplier);
            const statName = t(`stats.displayNames.${stat}`) || stat;
            statsHtml += `<tr><td>${statName}</td><td>${scaledStat}</td></tr>`;
        }
        statsHtml += '</table>';
        statsSection.innerHTML = statsHtml;
    } else {
        // MON COMMENTAIRE : Utilisation de t() pour le titre et le message de verrouillage
        statsSection.innerHTML = `<h4>${t('ui.codex.modal.title_stats')}</h4><p class="locked-info">${t('ui.codex.modal.unlock_prompt', { count: CODEX_INFO_THRESHOLDS.STATS })}</p>`;
    }

    modal.classList.remove('hidden');
}

function closeCodexDetailModal() {
    const modal = document.getElementById('codex-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function getCodexBonusForEnemy(enemyName, bonusType) {
    const killCount = gameState.player.killCount[enemyName] || 0;
    let applicableBonus = 0;

    for (const threshold of CODEX_THRESHOLDS) {
        if (killCount >= threshold.kills && threshold.bonus.type === bonusType) {
            applicableBonus = threshold.bonus.value; // On prend le bonus le plus élevé atteint
        }
    }
    return applicableBonus;
}

function updateMasteryUI() {
    const bonusesList = document.getElementById('codex-bonuses-list');
    const milestonesProgress = document.getElementById('codex-milestones-progress');
    if (!bonusesList || !milestonesProgress) return;

    bonusesList.innerHTML = '';
    const bonusTypes = [
        // MODIFIÉ
        { type: 'damage_percent', labelKey: 'stats.displayNames.damage_percent', suffix: '%' },
        { type: 'resistance_percent', labelKey: 'stats.displayNames.resistance_percent', suffix: '%' },
        { type: 'xp_gain_percent', labelKey: 'stats.displayNames.xp_gain_percent', suffix: '%' },
        { type: 'lifesteal_percent', labelKey: 'stats.displayNames.lifesteal_percent', suffix: '%' },
        { type: 'bleed_chance_percent', labelKey: 'stats.displayNames.bleed_chance_percent', suffix: '%' },
        { type: 'stun_chance_percent', labelKey: 'stats.displayNames.stun_chance_percent', suffix: '%' },
        { type: 'Vie', labelKey: 'stats.displayNames.Vie', suffix: '' },
        { type: 'Force', labelKey: 'stats.displayNames.Force', suffix: '' },
        { type: 'Agilité', labelKey: 'stats.displayNames.Agilité', suffix: '' },
        { type: 'Chance', labelKey: 'stats.displayNames.Chance', suffix: '' },
        { type: 'Intelligence', labelKey: 'stats.displayNames.Intelligence', suffix: '' },
        { type: 'Défense', labelKey: 'stats.displayNames.Défense', suffix: '' },
    ];

    bonusTypes.forEach(b => {
        const value = getGlobalCodexBonus(b.type);
        if (value > 0) {
            const formattedValue = b.suffix === '%' ? value.toFixed(1) : value;
            // MODIFIÉ
            bonusesList.innerHTML += `<p>${t(b.labelKey)}: <strong>+${formattedValue}${b.suffix}</strong></p>`;
        }
    });

    milestonesProgress.innerHTML = '';
    const allEnemiesCount = Object.keys(ENEMIES_DB).length + BOSS_DB.length;

    for (const killThreshold in CODEX_MILESTONES_DB) {
        const tier = CODEX_MILESTONES_DB[killThreshold];
        const masteredCount = countMasteredEnemies(killThreshold);

        const tierContainer = document.createElement('div');
        tierContainer.className = 'milestone-tier-accordion';

        const headerButton = document.createElement('button');
        headerButton.className = 'milestone-accordion-header';
        
        // MODIFIÉ
        headerButton.innerHTML = `<span>${t('ui.mastery.tier_header', { tierName: t(tier.tierNameKey), kills: killThreshold })}</span><span class="arrow">▼</span>`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'milestone-accordion-content';

        tier.milestones.forEach(milestone => {
            let required = milestone.requiredEnemies;
            if (required === 'all') required = allEnemiesCount;
            
            const isUnlocked = masteredCount >= required;
            const progressPercent = Math.min(100, (masteredCount / required) * 100);
            const rewardText = formatRewardToString(milestone.reward);

            // MODIFIÉ
            contentDiv.innerHTML += `
                <div class="milestone-entry ${isUnlocked ? 'unlocked' : ''}">
                    <p><strong>${t(milestone.nameKey)}</strong> (${masteredCount} / ${required} ${t('ui.mastery.enemies_label')})</p>
                    <div class="milestone-progress-bar-bg"><div class="milestone-progress-bar-fill" style="width: ${progressPercent}%;"></div></div>
                    <p class="milestone-reward ${isUnlocked ? 'unlocked' : ''}">${t('ui.mastery.reward_label')} ${rewardText}</p>
                </div>
            `;
        });
        
        headerButton.onclick = () => {
            headerButton.classList.toggle('active');
            if (contentDiv.style.display === 'block') {
                contentDiv.style.display = 'none';
            } else {
                contentDiv.style.display = 'block';
            }
        };

        tierContainer.appendChild(headerButton);
        tierContainer.appendChild(contentDiv);
        milestonesProgress.appendChild(tierContainer);
    }
}

function updateSpecialResourcesUI() {
    const container = document.getElementById('special-resources-section-content');
    if (!container) return;
    const player = gameState.player;
    container.innerHTML = '';
    let hasSpecialResources = false;

    const nonSpecialResources = ['bois', 'metal', 'tissu', 'marques_de_chasse', 'fragments','bounty_tokens', 'cle_de_la_breche', 'eclats_instables', 'eclats_ascension'];
    const specialResourceKeys = Object.keys(player.resources).filter(res => !nonSpecialResources.includes(res));

    specialResourceKeys.forEach(resourceName => {
        const amount = player.resources[resourceName];
        if (amount > 0) {
            hasSpecialResources = true;
            const p = document.createElement('p');
            
            // MON COMMENTAIRE : C'est ici que la magie opère.
            // 1. On traduit le nom pour l'affichage à l'utilisateur.
            let translatedName = t(`stats.displayNames.${resourceName}`) || resourceName;
            
            // 2. On utilise la CLÉ ORIGINALE (resourceName) pour trouver l'icône, ce qui fonctionnera dans toutes les langues !
            const iconPath = SPRITE_PATHS[resourceName] || SPRITE_PATHS[translatedName]; // On garde la traduction en fallback pour les anciennes clés
            const iconHtml = iconPath ? `<img src="${iconPath}" class="icon-sprite-small"> ` : '';
            
            p.innerHTML = `<span>${iconHtml}${translatedName} :</span> <strong>${Math.floor(amount)}</strong>`;
            
            container.appendChild(p);
        }
    });

    if (!hasSpecialResources) {
        container.innerHTML = `<p class="no-special-resources">${t('ui.special_resources.none')}</p>`;
    }
}

window.toggleOptionsModal = function(show, defaultTab = 'exporter') {
    const modal = document.getElementById('options-modal');
    if (show) {
        modal.style.display = 'flex';
        // On affiche l'onglet demandé, ou 'exporter' par défaut
        switchOptionsTab(defaultTab);
    } else {
        modal.style.display = 'none';
    }
}

window.exportSave = function() {
    if (!gameState.player) {
        // MODIFIÉ
        showCustomAlert(t('alerts.export.no_character'));
        return;
    }

    const cleanSave = JSON.parse(JSON.stringify({
        saveVersion: SAVE_VERSION,
        playerCurrentHP: gameState.playerCurrentHP,
        bossesKilled: gameState.bossesKilled || 0,
        endlessBossLevel: gameState.endlessBossLevel || 0,
        forgeLevel: gameState.forgeLevel || 0,
        enchanterLevel: gameState.enchanterLevel || 0,
        stats: gameState.stats,
        player: gameState.player
    }));

    if (cleanSave.player) {
        cleanSave.player.inventory = cleanSave.player.inventory.map(item => {
            const lightItem = { id: item.id };
            if (item.enchanter) {
                lightItem.enchanter = item.enchanter;
                lightItem.enchanterAttempts = item.enchanterAttempts;
            }
            if (item.isLocked) {
                lightItem.isLocked = true;
            }
            return lightItem;
        });

        for (const slot in cleanSave.player.equipment) {
            const item = cleanSave.player.equipment[slot];
            if (item) {
                const lightItem = { id: item.id };
                if (item.enchanter) {
                    lightItem.enchanter = item.enchanter;
                    lightItem.enchanterAttempts = item.enchanterAttempts;
                }
                if (item.isLocked) {
                    lightItem.isLocked = true;
                }
                cleanSave.player.equipment[slot] = lightItem;
            }
        }
    }

    try {
        const saveData = JSON.stringify(cleanSave);
        const compressedSave = LZString.compressToBase64(saveData);

        const textarea = document.getElementById('save-export-textarea');
        textarea.value = compressedSave;
        textarea.select();
        
        navigator.clipboard.writeText(compressedSave).then(() => {
            // MODIFIÉ
            showCustomAlert(t('alerts.export.success_clipboard'));
        }).catch(() => {
            // MODIFIÉ
            showCustomAlert(t('alerts.export.success_manual'));
        });

    } catch (e) {
        console.error("Erreur lors de la création de la sauvegarde :", e);
        // MODIFIÉ
        showCustomAlert(t('alerts.export.error', { errorMessage: e.message }));
    }
}

window.importSave = async function() {
    const importTextarea = document.getElementById('save-import-textarea');
    const saveDataString = importTextarea.value.trim();
    if (!saveDataString) {
        // MODIFIÉ
        showCustomAlert(t('alerts.import.paste_code'));
        return;
    }

    let decompressedSave;
    try {
        decompressedSave = LZString.decompressFromBase64(saveDataString);

        if (!decompressedSave) {
            console.log("Décompression échouée, tentative de lecture en tant qu'ancienne sauvegarde...");
            const binaryString = atob(saveDataString);
            decompressedSave = decodeURIComponent(escape(binaryString));
        }

    } catch (e) {
        // MODIFIÉ
        await showCustomAlert(t('alerts.import.invalid_corrupt'));
        return;
    }

    try {
        let parsedSave = JSON.parse(decompressedSave);
        if (!parsedSave.player || !parsedSave.player.name) {
            // MODIFIÉ
            throw new Error(t('alerts.import.invalid_data'));
        }
        
        // MODIFIÉ
        const confirmed = await showCustomConfirm(t('alerts.import.confirm_overwrite'));

        if (confirmed) {
            const freshGameState = createGameStateFromSave(parsedSave);
            gameState = freshGameState; 
            
            const user = window.firebaseTools.auth.currentUser;
            if (user) {
                gameState.player.userId = user.uid;
                await saveGameToServer(); 
            }
            
            localStorage.setItem('incrementalGameSave', JSON.stringify(gameState));
            
            sessionStorage.setItem('justImported', 'true');

            // MODIFIÉ
            await showCustomAlert(t('alerts.import.success'));
            window.location.reload();
        }
    } catch (e) {
        // MODIFIÉ
        showCustomAlert(t('alerts.import.invalid_generic', { errorMessage: e.message }));
    }
}

function migrateSave(parsedSave) {
    const importedVersion = parsedSave.saveVersion || "0.0";

    // Si la version importée est plus ancienne que la version actuelle du jeu
    if (importedVersion < SAVE_VERSION) {
        // ▼▼▼ MODIFICATION : J'ai supprimé le console.log qui était ici. ▼▼▼
        
        if (parsedSave.player) {
            // On marque ce joueur comme "Legacy"
            parsedSave.player.isLegacy = true;
            
            // Si la sauvegarde est ancienne et n'a pas d'UID, on lui en donne un nouveau
            if (!parsedSave.player.uid) {
                parsedSave.player.uid = generateUID();
            }
        }
    }
    
    // S'assure que même les sauvegardes non-legacy sans UID en reçoivent un (sécurité)
    if (parsedSave.player && !parsedSave.player.uid) {
        parsedSave.player.uid = generateUID();
    }
    
    // On conserve l'ancienne logique de migration pour la compatibilité
    if (parsedSave.player && parsedSave.player.killCount === undefined) {
        parsedSave.player.killCount = {};
    }

    return parsedSave;
}

// =================================================================================
// NOUVELLES FONCTIONS : LOGIQUE DU CODEX GLOBAL
// =================================================================================


function countMasteredEnemies(killThreshold) {
/**
 * Compte combien d'ennemis uniques ont atteint un certain seuil de kills.
 * @param {number} killThreshold - Le nombre de kills requis (ex: 5, 25, 50, 100).
 * @returns {number} Le nombre d'ennemis maîtrisés à ce seuil.
 */
    if (!gameState.player || !gameState.player.killCount) return 0;
    
    let count = 0;
    for (const enemy in gameState.player.killCount) {
        if (gameState.player.killCount[enemy] >= killThreshold) {
            count++;
        }
    }
    return count;
}

function getGlobalCodexBonus(bonusType) {
    let totalBonus = 0;
    const allEnemiesCount = Object.keys(ENEMIES_DB).length + BOSS_DB.length;

    for (const killThreshold in CODEX_MILESTONES_DB) {
        const tier = CODEX_MILESTONES_DB[killThreshold];
        const masteredCount = countMasteredEnemies(killThreshold);

        tier.milestones.forEach(milestone => {
            let required = milestone.requiredEnemies;
            if (required === 'all') required = allEnemiesCount;

            if (masteredCount >= required) {
                // Cas 1 : Le type de bonus correspond directement (ex: 'damage_percent')
                if (milestone.reward.type === bonusType) {
                    totalBonus += milestone.reward.value;
                }
                
                // Cas 2 : On cherche une stat (ex: "Force") et on trouve un bonus "+X à toutes les stats"
                if (STAT_NAMES.includes(bonusType) && milestone.reward.type === 'stat_flat_all') {
                    totalBonus += milestone.reward.value;
                }
                
                // Cas 3 : On cherche une stat et on trouve un bonus spécifique à cette stat
                if (milestone.reward.type === 'stat_flat' && milestone.reward.stat === bonusType) {
                    totalBonus += milestone.reward.value;
                }
            }
        });
    }
    return totalBonus;
}

function hasGlobalCodexPassive(passiveName) {
/**
 * Vérifie si un passif spécial a été débloqué.
 * @param {string} passiveName - Le nom du passif à vérifier (ex: 'passive_execute').
 * @returns {boolean} Vrai si le passif est débloqué.
 */
    const allEnemiesCount = Object.keys(ENEMIES_DB).length + BOSS_DB.length;

    for (const killThreshold in CODEX_MILESTONES_DB) {
        const tier = CODEX_MILESTONES_DB[killThreshold];
        const masteredCount = countMasteredEnemies(killThreshold);

        for (const milestone of tier.milestones) {
            let required = milestone.requiredEnemies;
            if (required === 'all') {
                required = allEnemiesCount;
            }

            if (masteredCount >= required && milestone.reward.type === 'special_passive' && milestone.reward.passive === passiveName) {
                return true;
            }
        }
    }
    return false;
}

// =================================================================================
// NOUVELLE SECTION : LOGIQUE DE L'ENCHANTEUR
// =================================================================================

function getStatRoll(range) {
    // Si la stat a une plage décimale (ex: [0.5, 0.8])
    if (range[0] % 1 !== 0 || range[1] % 1 !== 0) {
        const min = range[0];
        const max = range[1];
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    }
    // Si la stat est un entier (ex: [5, 8])
    const min = Math.ceil(range[0]);
    const max = Math.floor(range[1]);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateEnchanterUI() {
    const enchanterSection = document.getElementById('enchanter-section');
    const forge = gameState.village.forge;
    const enchanter = gameState.village.enchanter;
    if (!enchanterSection) return;

    enchanterSection.innerHTML = '';

    const resourceDisplay = document.createElement('div');
    resourceDisplay.id = 'enchanter-resource-display';
    resourceDisplay.className = 'contextual-resource-display';
    const shardAmount = gameState.player.resources.eclats_instables || 0;
    resourceDisplay.innerHTML = `
        <span>${shardAmount.toLocaleString()}</span>
        <img src="assets/sprites/ressources/eclats_instables.png" class="icon-sprite-small" alt="Éclats Instables">
    `;
    enchanterSection.appendChild(resourceDisplay);

    if (forge.level < 3) {
        enchanterSection.innerHTML += `<div id="enchanter-unlock-info"><p>${t('ui.enchanter.forge_level_required')}</p></div>`;
        return;
    }

    if (enchanter.level === 0 && enchanter.constructionEnd === 0) {
        enchanterSection.innerHTML += `
            <div id="enchanter-unlock-info" class="unlock-container">
                <h3>${t('ui.enchanter.unlock_title')}</h3>
                <p>${t('ui.enchanter.unlock_description')}</p>
                <p class="cost-text">${t('ui.enchanter.unlock_cost_label')} <strong>${ENCHANTER_UNLOCK_COST_FRAGMENTS} 💠</strong></p>
                <button class="action-button" onclick="unlockEnchanter()" ${ (gameState.player.fragments || 0) < ENCHANTER_UNLOCK_COST_FRAGMENTS ? 'disabled' : ''}>${t('ui.enchanter.unlock_button')}</button>
            </div>
        `;
        return;
    }

    if (enchanter.constructionEnd > 0) {
        const remainingMs = enchanter.constructionEnd - Date.now();
        const cost = Math.ceil((remainingMs / 3600000) * SPEED_UP_COST_PER_HOUR);
        const levelTarget = enchanter.level === 0 ? 1 : enchanter.level + 1;
        const eaIconHtml = `<img src="assets/sprites/ressources/eclats_ascension.png" class="icon-sprite-small" alt="EA">`;

        enchanterSection.innerHTML += `
            <div id="enchanter-upgrade-section" style="text-align: center; margin-top: 20px;">
                <h4>${t('ui.fief.under_construction')} (Niv. ${levelTarget})</h4>
                <p>${t('ui.fief.construction_time_left')} 
                    <strong class="construction-timer" data-construction-end="${enchanter.constructionEnd}">00:00:00</strong>
                </p>
                <button class="action-button" onclick="speedUpConstruction('enchanter', 'village')">
                    ${t('ui.fief.speed_up_button', { cost: cost, ea_icon: eaIconHtml })}
                </button>
            </div>`;
        return;
    }

    enchanterSection.innerHTML += `
        <div class="village-sub-tabs">
            <button id="enchanter-tab-selection" class="sub-tab-button active" onclick="switchEnchanterTab('selection')">${t('ui.enchanter.tabs.selection')}</button>
            <button id="enchanter-tab-details" class="sub-tab-button" onclick="switchEnchanterTab('details')" disabled>${t('ui.enchanter.tabs.enchantment')}</button>
        </div>
        <div id="enchanter-selection-view" class="sub-panel"></div>
        <div id="enchanter-details-view" class="sub-panel hidden"></div>
    `;
    showEquipmentSelectionView();
}

function showEquipmentSelectionView() {
    selectedEnchanterItem = null; 
    
    const selectionView = document.getElementById('enchanter-selection-view');
    const detailsView = document.getElementById('enchanter-details-view');
    const enchanter = gameState.village.enchanter;

    selectionView.classList.remove('hidden');
    detailsView.classList.add('hidden');

    const nextLevel = enchanter.level + 1;
    const upgradeData = ENCHANTER_UPGRADE_COSTS[enchanter.level];
    let upgradeHTML = `<p>${t('ui.enchanter.level_max', { level: `<strong>${enchanter.level}</strong>` })}</p>`;

    if (upgradeData) {
        const maxRarityName = t(RARITY_CONFIG[ENCHANTER_MAX_RARITY_BY_LEVEL[enchanter.level - 1]].nameKey);
        
        let costString = '';
        let canAfford = true;
        const costParts = [];
        for (const res in upgradeData.cost) {
            const playerAmount = (res === 'fragments') ? (gameState.player.fragments || 0) : (gameState.player.resources[res] || 0);
            if (playerAmount < upgradeData.cost[res]) {
                canAfford = false;
            }
            const iconHtml = `<img src="${SPRITE_PATHS[res]}" class="icon-sprite-small" alt="${res}">`;
            costParts.push(`<strong>${upgradeData.cost[res]}</strong> ${iconHtml}`);
        }
        costString = costParts.join(' + ');

        upgradeHTML = `
            <p>${t('ui.enchanter.level_current', { level: `<strong>${enchanter.level}</strong>`, maxRarity: maxRarityName })}</p>
            <p>${t('ui.enchanter.upgrade_cost_label')} ${costString}</p> 
            <button class="action-button" onclick="upgradeEnchanter()" ${!canAfford ? 'disabled' : ''}>${t('ui.buttons.upgrade')}</button>
        `;
    }

    selectionView.innerHTML = `
        <div id="enchanter-upgrade-section">${upgradeHTML}</div>
        <hr/>
        <h3>${t('ui.enchanter.select_item_title')}</h3>
        <div id="enchanter-equipment-list"></div>
    `;
    
    populateEnchanterSelectionList();
}

// Affiche la VUE 2 : l'interface détaillée pour un objet
function showEnchantView(slot) {
    const item = gameState.player.equipment[slot];
    if (!item || item.isSetItem || RARITY_ORDER.indexOf(item.rarity) < RARITY_ORDER.indexOf('rare')) {
        // MODIFIÉ
        showCustomAlert(t('alerts.enchant.invalid_item_type'));
        return;
    }

    selectedEnchanterItem = item;
    
    switchEnchanterTab('details');

    updateEnchanterDetailsView();
}

// Remplit la liste des objets équipés dans la VUE 1
function populateEnchanterSelectionList() {
    const list = document.getElementById('enchanter-equipment-list');
    list.innerHTML = '';
    
    let hasEquippedItems = false;
    EQUIPMENT_SLOTS.forEach(slot => {
        const item = gameState.player.equipment[slot];
        if (item) {
            hasEquippedItems = true;
            
            const card = document.createElement('div');
            card.className = 'enchanter-item-card';
            
            if (item.isSetItem) {
                card.classList.add('disabled');
                // MODIFIÉ
                card.title = t('ui.enchanter.set_item_disabled_tooltip');
            } else {
                card.onclick = () => showEnchantView(slot);
            }

            // MODIFIÉ
            let affixHtml = `<p class="no-affix">${t('ui.enchanter.no_enchantment')}</p>`;
            if (item.enchanter) {
                const affixInfo = AFFIX_DB[item.type].find(a => a.key === item.enchanter.affixKey);
                affixHtml = `
                    <p class="affix-title ${RARITY_CONFIG[item.enchanter.rarity].colorClass}">[${t(affixInfo.nameKey)}]</p>
                    <div class="affix-stats">${formatStatsTooltip(item.enchanter.rolledStats).replace(/\n/g, '<br>')}</div>
                `;
            }
            
            card.innerHTML = `
                <h4 class="${RARITY_CONFIG[item.rarity].colorClass}">${t(item.nameKey)}</h4>
                <p class="item-slot-label">${t(`ui.equipment_slots.${item.type}`)}</p>
                <div class="item-affix-details">
                    ${affixHtml}
                </div>
            `;
            list.appendChild(card);
        }
    });

    if (!hasEquippedItems) {
        // MODIFIÉ
        list.innerHTML = `<p style="text-align: center; color: #aaa;">${t('ui.enchanter.no_equipped_items')}</p>`;
    }
}

// Met à jour la VUE 2 avec les détails de l'objet sélectionné
function updateEnchanterDetailsView() {
    const item = selectedEnchanterItem;
    const slotDiv = document.getElementById('enchanter-item-slot');
    const currentAffixStatsDiv = document.getElementById('current-affix-stats');
    const possibilitiesList = document.getElementById('enchanter-possibilities-list');
    const enchanterButton = document.getElementById('enchanter-button');
    const lockCheckbox = document.getElementById('enchanter-lock-affix');
    const costDisplay = document.getElementById('enchanter-cost');

    if (!item || item.isSetItem || RARITY_ORDER.indexOf(item.rarity) < RARITY_ORDER.indexOf('rare')) {
        // MODIFIÉ
        slotDiv.innerHTML = `
            <div class="enchanter-item-card disabled">
                <h4>${t('ui.enchanter.item_ineligible_title')}</h4>
                <p class="item-slot-label">
                    ${!item ? t('ui.enchanter.no_item_selected') : 
                    item.isSetItem ? t('ui.enchanter.set_item_disabled_tooltip') :
                    t('alerts.enchant.rarity_too_low')}
                </p>
            </div>
        `;
        currentAffixStatsDiv.innerHTML = '';
        possibilitiesList.innerHTML = '';
        costDisplay.innerHTML = '';
        enchanterButton.disabled = true;
        lockCheckbox.disabled = true;
        return;
    }

    slotDiv.innerHTML = `
        <div class="enchanter-item-card">
            <h4 class="${RARITY_CONFIG[item.rarity].colorClass}">${t(item.nameKey)}</h4>
            <p>${formatStatsForTooltip(item.stats).replace(/\n/g, '<br>')}</p>
        </div>
    `;

    if (item.enchanter) {
        const affixInfo = AFFIX_DB[item.type]?.find(a => a.key === item.enchanter.affixKey);
        // MODIFIÉ
        currentAffixStatsDiv.innerHTML = `
            <p class="${RARITY_CONFIG[item.enchanter.rarity].colorClass}">[${t(affixInfo?.nameKey) || t('ui.enchanter.unknown_affix')}]</p>
            <p>${formatStatsForTooltip(item.enchanter.rolledStats).replace(/\n/g, '<br>')}</p>
        `;
        lockCheckbox.disabled = false;
    } else {
        // MODIFIÉ
        currentAffixStatsDiv.innerHTML = `<p>${t('ui.enchanter.no_affix')}</p>`;
        lockCheckbox.disabled = true;
        lockCheckbox.checked = false;
    }

    possibilitiesList.innerHTML = '';
    const possibleAffixes = AFFIX_DB[selectedEnchanterItem.type] || [];
    possibleAffixes.forEach(affix => {
        const li = document.createElement('li');
        li.textContent = t(affix.nameKey);
        li.onclick = () => displayAffixDetails(item.type, affix.key);
        possibilitiesList.appendChild(li);
    });

    const cost = calculateEnchanterCost(item);
    // MODIFIÉ
    costDisplay.innerHTML = `${t('ui.enchanter.cost_label')} ${cost} <img src="${SPRITE_PATHS.eclats_instables}" class="icon-sprite-small">`;
    const canAfford = (gameState.player.resources.eclats_instables || 0) >= cost;
    enchanterButton.disabled = !canAfford;
}

function calculateEnchanterCost(item) {
    const attempts = item.enchanterAttempts || 0;
    const baseCost = 3; 
    // On ajoute un multiplicateur basé sur la rareté de l'objet
    const rarityMultipliers = { 'rare': 1, 'epic': 1.5, 'legendary': 2, 'mythic': 3 };
    const rarityMultiplier = rarityMultipliers[item.rarity] || 1;
    return Math.floor(baseCost * Math.pow(1.35, attempts) * rarityMultiplier); 
}

window.unlockEnchanter = function() {
    const enchanter = gameState.village.enchanter;
    if (enchanter.constructionEnd > 0) {
        showToast(t('ui.fief.under_construction'), 'error');
        return;
    }
    if ((gameState.player.fragments || 0) >= ENCHANTER_UNLOCK_COST_FRAGMENTS) {
        gameState.player.fragments -= ENCHANTER_UNLOCK_COST_FRAGMENTS;
        
        // On lance la construction (0.25h)
        const constructionTimeMs = 0.25 * 3600 * 1000;
        enchanter.constructionEnd = Date.now() + constructionTimeMs;
        
        updateEnchanterUI();
        saveGame();
    }
}

window.upgradeEnchanter = async function() {
    const enchanter = gameState.village.enchanter;
    const nextLevel = enchanter.level + 1;
    const upgradeData = ENCHANTER_UPGRADE_COSTS[enchanter.level];

    if (enchanter.constructionEnd > 0) {
        showToast(t('ui.fief.under_construction'), 'error');
        return;
    }
    if (!upgradeData) return;

    let canAfford = true;
    let costString = [];
    for (const res in upgradeData.cost) {
        const playerResource = res === 'fragments' ? (gameState.player.fragments || 0) : (gameState.player.resources[res] || 0);
        if (playerResource < upgradeData.cost[res]) canAfford = false;
        // MON COMMENTAIRE : J'enveloppe le coût dans le span ici aussi.
        costString.push(`<span class="cost-item">${upgradeData.cost[res]} <img src="${SPRITE_PATHS[res]}" class="icon-sprite-small" alt="${res}"></span>`);
    }

    if (!canAfford) {
        showCustomAlert(t('alerts.not_enough_resources'));
        return;
    }
    
    const durationString = formatDuration(upgradeData.constructionTimeHours * 3600 * 1000);
    const confirmMessage = t('ui.fief.upgrade_confirm_body', {
        buildingName: t('ui.village.buildings.enchanter'),
        level: nextLevel,
        // MON COMMENTAIRE : Le join se fait maintenant avec ' + ' entre les spans.
        cost: costString.join(' + '),
        duration: durationString
    });
    
    const confirmed = await showCustomConfirm(confirmMessage, t('ui.buttons.upgrade'), t('ui.buttons.cancel'));
    if (!confirmed) return;

    for (const res in upgradeData.cost) {
        if (res === 'fragments') gameState.player.fragments -= upgradeData.cost[res];
        else gameState.player.resources[res] -= upgradeData.cost[res];
    }
    
    const constructionTimeMs = upgradeData.constructionTimeHours * 3600 * 1000;
    enchanter.constructionEnd = Date.now() + constructionTimeMs;
    if (upgradeData.constructionTimeHours > 2) {
        showContextualSpeedUpOffer();
    }

    updateEnchanterUI();
    updateGameUI();
    saveGame();
}

function updateConstructionTimers() {
    const now = Date.now();
    let uiNeedsUpdate = false;

    // 1. Vérification pour le Fief
    for (const buildingId in gameState.fief.constructionQueue) {
        const endTime = gameState.fief.constructionQueue[buildingId];
        if (now >= endTime) {
            gameState.fief.buildings[buildingId]++;
            delete gameState.fief.constructionQueue[buildingId];
            showToast(t('ui.fief.upgrade_complete_toast', { buildingName: t(FIEF_DB[buildingId].nameKey), level: gameState.fief.buildings[buildingId] }), 'success');
            
            // Logique spécifique post-construction
            if (buildingId === 'entrepot') updatePlayerMaxResources();
            if (buildingId === 'refectoire') recalculateMaxEnergy();

            uiNeedsUpdate = true;
        }
    }
    if (uiNeedsUpdate) displayFiefUI(); // On met à jour l'UI du fief une seule fois

    // 2. Vérification pour la Forge
    const forge = gameState.village.forge;
    if (forge.constructionEnd > 0 && now >= forge.constructionEnd) {
        forge.level++;
        forge.constructionEnd = 0;
        showToast(t('ui.village.upgrade_complete_toast', { buildingName: t('ui.village.buildings.forge'), level: forge.level }), 'success');
        updateForgeDisplay(); // Met à jour spécifiquement la forge
    }

    // 3. Vérification pour l'Enchanteur
    const enchanter = gameState.village.enchanter;
    if (enchanter.constructionEnd > 0 && now >= enchanter.constructionEnd) {
        enchanter.level++;
        enchanter.constructionEnd = 0;
        showToast(t('ui.village.upgrade_complete_toast', { buildingName: t('ui.village.buildings.enchanter'), level: enchanter.level }), 'success');
        updateEnchanterUI(); // Met à jour spécifiquement l'enchanteur
    }
}

window.enchantSelectedItem = function() {
    if (!selectedEnchanterItem) return;

    const cost = calculateEnchanterCost(selectedEnchanterItem);
    if ((gameState.player.resources.eclats_instables || 0) < cost) {
        // MODIFIÉ
        showCustomAlert(t('alerts.enchant.not_enough_shards'));
        return;
    }
    
    gameState.player.resources.eclats_instables -= cost;
    selectedEnchanterItem.enchanterAttempts = (selectedEnchanterItem.enchanterAttempts || 0) + 1;
    gameState.stats.itemsEnchanted = (gameState.stats.itemsEnchanted || 0) + 1;
    checkSucces('ENCHANT_ITEM');

    const isLocked = document.getElementById('enchanter-lock-affix').checked;
    const maxRarityAllowed = ENCHANTER_MAX_RARITY_BY_LEVEL[gameState.enchanterLevel - 1];
    const maxRarityIndex = RARITY_ORDER.indexOf(maxRarityAllowed);

    let chosenAffixKey;
    if (isLocked && selectedEnchanterItem.enchanter) {
        chosenAffixKey = selectedEnchanterItem.enchanter.affixKey;
    } else {
        const possibleAffixes = AFFIX_DB[selectedEnchanterItem.type];
        chosenAffixKey = possibleAffixes[Math.floor(Math.random() * possibleAffixes.length)].key;
    }

    const affixData = AFFIX_DB[selectedEnchanterItem.type].find(a => a.key === chosenAffixKey);

    const availableTiers = affixData.tiers.filter(t => RARITY_ORDER.indexOf(t.rarity) <= maxRarityIndex);
    const totalWeight = availableTiers.reduce((sum, tier) => sum + tier.weight, 0);
    let random = Math.random() * totalWeight;
    let chosenTier;
    for (const tier of availableTiers) {
        if (random < tier.weight) {
            chosenTier = tier;
            break;
        }
        random -= tier.weight;
    }
    if (!chosenTier) chosenTier = availableTiers[0];

    const rolledStats = {};
    for (const stat in chosenTier.stats) {
        rolledStats[stat] = getStatRoll(chosenTier.stats[stat]);
    }

    selectedEnchanterItem.enchanter = {
        affixKey: chosenAffixKey,
        rarity: chosenTier.rarity,
        rolledStats: rolledStats
    };

    recalculateTotalStats();
    updateEnchanterDetailsView(); 
    updateGameUI();
    saveGame();
};

window.switchEnchanterTab = function(tabName) {
    const selectionView = document.getElementById('enchanter-selection-view');
    const detailsView = document.getElementById('enchanter-details-view');
    const selectionTab = document.getElementById('enchanter-tab-selection');
    const detailsTab = document.getElementById('enchanter-tab-details');

    if (tabName === 'selection') {
        selectionView.classList.remove('hidden');
        detailsView.classList.add('hidden');
        selectionTab.classList.add('active');
        detailsTab.classList.remove('active');
        detailsTab.disabled = true; // On redésactive l'onglet de détails
    } else if (tabName === 'details') {
        selectionView.classList.add('hidden');
        detailsView.classList.remove('hidden');
        selectionTab.classList.remove('active');
        detailsTab.classList.add('active');
        detailsTab.disabled = false; // On l'active quand on est dessus
    }
}

function updateStatsPanels() {
    const player = gameState.player;
    if (!player) return;
    
    const combatStatsList = document.getElementById('combat-stats-content');
    const globalStatsList = document.getElementById('global-stats-content');
    
    if(!combatStatsList || !globalStatsList) return;

    combatStatsList.innerHTML = `<h3>${t('ui.stats_panel.combat_stats_title')}</h3>`;
    globalStatsList.innerHTML = `<h3>${t('ui.stats_panel.global_stats_title')}</h3>`;

    combatStatsList.innerHTML += `<p><small>${t('ui.stats_panel.power_score_label')} <strong>${calculatePlayerPowerScore()}</strong> 💪</small></p>`;

    // MON COMMENTAIRE : Listes pour séparer les stats
    const combatStatsKeys = ['RegenHP', 'damage_percent', 'CritChance', 'CritDamage', 'evasion_chance_percent', 'lifesteal_percent', 'bleed_chance_percent', 'stun_chance_percent', 'armor_shred_percent', 'thorns_damage_flat', 'resistance_percent', 'debuff_resistance_percent'];
    const globalStatsKeys = ['xp_gain_percent', 'LootBonusPercent', 'resource_gain_percent', 'healing_effectiveness_percent'];

    // MON COMMENTAIRE : La fonction interne pour générer une ligne de stat
    const renderStatLine = (panel, statKey) => {
        if (!player.statBreakdown || !player.statBreakdown[statKey]) return;
        
        const total = player.totalStats[statKey] || 0;
        if (total === 0) return;

        const isPercent = String(statKey).includes('_percent') || statKey === 'CritChance' || statKey === 'CritDamage';
        const isFloat = ['RegenHP', 'CritDamage'].includes(statKey);
        const suffix = statKey === 'RegenHP' ? t('ui.stats_panel.hp_per_second_unit') : (isPercent ? '%' : '');
        
        const p = document.createElement('p');
        const small = document.createElement('small');
        small.innerHTML = `${t(`stats.displayNames.${statKey}`) || statKey} : `;
        
        const statBonusStrong = document.createElement('strong');
        statBonusStrong.className = 'stat-bonus';
        const sign = (total > 0) ? '+' : '';
        statBonusStrong.innerHTML = `${sign}${total.toFixed(isFloat ? 2 : 0)}${suffix}`;

        attachInteractionListener(statBonusStrong, {
            onHover: () => showStatTooltip(statKey, statBonusStrong),
            onTap: () => showStatTooltip(statKey, statBonusStrong)
        });
        statBonusStrong.addEventListener('mouseleave', hideStatTooltip);
        
        small.appendChild(statBonusStrong);
        p.appendChild(small);
        panel.appendChild(p);
    };

    // MON COMMENTAIRE : On affiche chaque stat dans le bon panneau
    combatStatsKeys.forEach(key => renderStatLine(combatStatsList, key));
    globalStatsKeys.forEach(key => renderStatLine(globalStatsList, key));
}


function getStatBonusFromAffixes(statName) {
    let bonus = 0;
    for (const slot of EQUIPMENT_SLOTS) {
        const item = gameState.player.equipment[slot];
        if (item && item.enchanter && item.enchanter.rolledStats && item.enchanter.rolledStats[statName]) {
            bonus += item.enchanter.rolledStats[statName];
        }
    }
    return bonus;
}

// =================================================================================
// NOUVELLES FONCTIONS : SYSTÈME DE BUTIN AMÉLIORÉ
// =================================================================================

function calculateFinalDropChance(baseChance) {
    if (!gameState.player) return baseChance;

    // On récupère le bonus total qui inclut DÉJÀ la Chance et les affixes grâce à recalculateTotalStats()
    const totalBonusPercent = gameState.player.totalStats.LootBonusPercent || 0;
    
    // On le convertit en multiplicateur (ex: 57% de bonus -> multiplicateur de 1.57)
    const multiplier = 1 + (totalBonusPercent / 100);

    // On applique le multiplicateur à la chance de base de l'expédition ou du boss
    const finalChance = baseChance * multiplier;

    return finalChance;
}

function determineLootRarity(sourceRarity) {
    /**
     * Détermine la rareté de l'objet qui sera trouvé, en fonction de la rareté de la source.
     * @param {string} sourceRarity - La rareté de l'expédition ou du boss.
     * @returns {string} La rareté de l'objet à générer (ex: 'rare', 'epic').
     */
    let targetRarity;
    const rand = Math.random();

    // C'est ici que l'on définit les "tables de butin" de chaque niveau de contenu
    switch (sourceRarity) {
        case 'mythic':
            if (rand < 0.65) targetRarity = 'mythic';       // 65% de chance (Jackpot)
            else targetRarity = 'legendary';                 // 35% de chance
            break;
        case 'legendary':
            if (rand < 0.50) targetRarity = 'legendary';     // 50% de chance
            else if (rand < 0.90) targetRarity = 'epic';    // 40% de chance
            else targetRarity = 'rare';                     // 10% de chance
            break;
        case 'epic':
            if (rand < 0.45) targetRarity = 'epic';          // 45% de chance
            else if (rand < 0.95) targetRarity = 'rare';    // 45% de chance
            else targetRarity = 'uncommon';                 // 10% de chance
            break;
        case 'rare':
            if (rand < 0.40) targetRarity = 'rare';          // 40% de chance
            else if (rand < 0.90) targetRarity = 'uncommon';// 50% de chance
            else targetRarity = 'common';                   // 10% de chance
            break;
        case 'uncommon':
            if (rand < 0.35) targetRarity = 'uncommon';      // 35% de chance
            else targetRarity = 'common';                   // 65% de chance
            break;
        case 'common':
        default:
            targetRarity = 'common';                        // 100% de chance
            break;
    }
    return targetRarity;
}

async function grantRandomItem(sourceRarity, sourceNameForLog) {
    let targetRarity = determineLootRarity(sourceRarity);
    const player = gameState.player;

    const allowedRarity = getHighestAllowedRarity();
    if (RARITY_ORDER.indexOf(targetRarity) > RARITY_ORDER.indexOf(allowedRarity)) {
        if (gameState.expeditionCache) {
            const rarityName = t(RARITY_CONFIG[targetRarity].nameKey);
            const colorClass = RARITY_CONFIG[targetRarity].colorClass;
            gameState.expeditionCache.log.push(t('alerts.loot.rarity_downgraded', { colorClass: colorClass, rarityName: rarityName }));
        }
        targetRarity = allowedRarity;
    }

    const allEligibleRarityItems = ITEMS_DB.filter(item => 
        item.rarity === targetRarity && !item.isCraftOnly
    );

    if (allEligibleRarityItems.length === 0) {
        return;
    }

    const playerClass = player.class;
    const allClasses = ['Guerrier', 'Archer', 'Mage'];
    const otherClasses = allClasses.filter(c => c !== playerClass);

    const playerClassItems = allEligibleRarityItems.filter(item => 
        item.class_restriction && [].concat(item.class_restriction).includes(playerClass)
    );
    const allClassItems = allEligibleRarityItems.filter(item => 
        !item.class_restriction
    );
    const otherClass1Items = allEligibleRarityItems.filter(item => 
        otherClasses[0] && item.class_restriction && [].concat(item.class_restriction).includes(otherClasses[0])
    );
    const otherClass2Items = allEligibleRarityItems.filter(item => 
        otherClasses[1] && item.class_restriction && [].concat(item.class_restriction).includes(otherClasses[1])
    );

    let finalItemPool = [];
    const hasClassSpecificItems = playerClassItems.length > 0 || otherClass1Items.length > 0 || otherClass2Items.length > 0;
    
    if (playerClass && hasClassSpecificItems) {
        const rand = Math.random();

        if (rand < 0.60 && playerClassItems.length > 0) { 
            finalItemPool = playerClassItems;
        } else if (rand < 0.80 && otherClass1Items.length > 0) { 
            finalItemPool = otherClass1Items;
        } else if (otherClass2Items.length > 0) { 
            finalItemPool = otherClass2Items;
        }

        if (finalItemPool.length === 0) {
            finalItemPool = allClassItems;
        }
        
        if (finalItemPool.length === 0) {
            finalItemPool = allEligibleRarityItems.filter(item => item.class_restriction);
        }

    }
    
    if (finalItemPool.length === 0) {
        finalItemPool = allEligibleRarityItems;
    }

    if (finalItemPool.length > 0) {
        const foundItem = { ...finalItemPool[Math.floor(Math.random() * finalItemPool.length)], uid: generateUID() };
        gameState.player.inventory.push(foundItem);
        
        if (gameState.expeditionCache) {
            gameState.expeditionCache.itemsFound.push({ name: t(foundItem.nameKey), rarity: foundItem.rarity });
        }

        const logMessage = `##ITEM_DROP##${sourceNameForLog}%%${t(foundItem.nameKey)}:${t(RARITY_CONFIG[foundItem.rarity].nameKey)}:${RARITY_CONFIG[foundItem.rarity].colorClass}##`;

        if (gameState.expeditionCache) {
            gameState.expeditionCache.log.push(logMessage);
        } else {
            // MON COMMENTAIRE : C'est ici que se trouve la correction finale.
            // On utilise la bonne expression régulière ET on construit un message propre pour la modale.
            const formattedMessage = logMessage.replace(/##ITEM_DROP##(.*?)\%%(.*?):(.*?):(.*?)\##/g, (match, source, name, rarity, color) => {
                const foundText = t('ui.report.loot_label'); // Récupère "Butin :"
                return `<div class="log-item-drop" style="text-align: center;">
                            <p>${source}</p>
                            <p>${foundText} <strong class="${color}">${name} (${rarity})</strong></p>
                        </div>`;
            });
            await showCustomAlert(formattedMessage);
        }
    }
}


let currentLeaderboardTab = 'powerScore';

// Affiche la modale et charge les données pour le premier onglet
async function displayLeaderboard() {
    document.getElementById('main-menu').classList.add('hidden'); // Ferme le menu
    const modal = document.getElementById('leaderboard-modal');
    modal.classList.remove('hidden');
    switchLeaderboardTab('powerScore'); 
}

// Change d'onglet ET recharge les données
async function switchLeaderboardTab(tabName) {
    currentLeaderboardTab = tabName;

    document.querySelectorAll('.leaderboard-tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.leaderboard-tab-button[onclick="switchLeaderboardTab('${tabName}')"]`).classList.add('active');

    // MODIFIÉ
    const descriptions = {
        powerScore: t('ui.leaderboard.description_powerScore'),
        expeditionsStarted: t('ui.leaderboard.description_expeditionsStarted'),
        bossesKilled: t('ui.leaderboard.description_bossesKilled'),
        dungeonHighestFloor: t('ui.leaderboard.description_dungeonHighestFloor'),
        totalXpGained: t('ui.leaderboard.description_totalXpGained'),
        codexScore: `${t('ui.leaderboard.description_codexScore')}<br><br>
                     <small style="line-height: 1.6;">
                         <strong>${t('ui.leaderboard.codex_score_rules_title')}</strong><br>
                         ${t('ui.leaderboard.codex_score_rule1')}<br>
                         ${t('ui.leaderboard.codex_score_rule2')}<br>
                         ${t('ui.leaderboard.codex_score_rule3')}<br>
                         ${t('ui.leaderboard.codex_score_rule4')}<br>
                         ${t('ui.leaderboard.codex_score_rule5')}
                     </small>`
    };
    document.getElementById('leaderboard-description').innerHTML = descriptions[tabName];
    
    await loadAndRenderLeaderboardData(tabName);
}

async function loadAndRenderLeaderboardData(sortBy) {
    const { auth, db, doc, getDoc, collection, getDocs, query, orderBy, limit, where } = window.firebaseTools;
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = `<li>${t('ui.leaderboard.loading')}</li>`;

    try {
        const playersRef = collection(db, "players");
        const top10Query = query(playersRef, orderBy(sortBy, "desc"), limit(LEADERBOARD_SIZE));
        const top10Snapshot = await getDocs(top10Query);

        list.innerHTML = '';
        if (top10Snapshot.empty) {
            list.innerHTML = `<li>${t('ui.leaderboard.empty')}</li>`;
            return;
        }

        let rank = 1;
        let userIsInTop10 = false; 
        const currentUser = auth.currentUser;

        for (const docSnap of top10Snapshot.docs) {
            const playerData = docSnap.data();
            const player = playerData.player;
            if (!player) continue;

            let valueToDisplay = 0;
            let valueLabel = "";

            switch(sortBy) {
                case 'powerScore': valueToDisplay = playerData.powerScore || 0; valueLabel = t('ui.leaderboard.label_powerScore'); break;
                case 'expeditionsStarted': valueToDisplay = (playerData.stats && playerData.stats.expeditionsStarted) || 0; valueLabel = t('ui.leaderboard.label_expeditions'); break;
                case 'bossesKilled': valueToDisplay = playerData.bossesKilled || 0; valueLabel = t('ui.leaderboard.label_bossesKilled'); break;
                case 'dungeonHighestFloor': valueToDisplay = playerData.dungeonHighestFloor || 0; valueLabel = t('ui.leaderboard.label_dungeonFloor'); break;
                case 'codexScore': valueToDisplay = playerData.codexScore || 0; valueLabel = t('ui.leaderboard.label_codexScore'); break;
                case 'totalXpGained': valueToDisplay = (playerData.stats && playerData.stats.totalXpGained) || 0; valueLabel = t('ui.leaderboard.label_totalXp'); break;
            }

            if (valueToDisplay > 0 || sortBy === 'powerScore') {
                const li = document.createElement('li');
                li.classList.add('clickable-rank');
                li.onclick = () => openPlayerProfileModal(docSnap.id, player.name);

                if (currentUser && docSnap.id === currentUser.uid) {
                    userIsInTop10 = true;
                    li.classList.add('current-player-rank');
                }

                let rankIcon = `#${rank}`;
                if (rank === 1) rankIcon = '🏆';
                if (rank === 2) rankIcon = '🥈';
                if (rank === 3) rankIcon = '🥉';

                let nameDisplay = `<strong>${player.name}</strong>`;
                if (playerData.ascensionLevel > 0) {
                    nameDisplay += ` <span class="ascension-tag ascension-level-${playerData.ascensionLevel}">(A${playerData.ascensionLevel})</span>`;
                }

                const profilePic = player.profilePictureUrl || CLASS_DATA_DB[player.class]?.portrait || 'assets/sprites/portraits/default_avatar.png';
                const frameId = player.equippedFrame || 'default';
                // MON COMMENTAIRE : On utilise la DB pour le chemin de l'image du cadre.
                const frameData = FRAMES_DB[frameId] || FRAMES_DB['default'];
                const framePic = frameData.image;

                li.innerHTML = `
                    <div>
                        <div class="player-avatar-leaderboard">
                            <img src="${profilePic}" class="pfp" alt="Avatar">
                            <img src="${framePic}" class="frame" alt="Cadre">
                        </div>
                        ${rankIcon} - ${nameDisplay} (${t('ui.leaderboard.player_level_abbr', { level: player.level })})
                    </div>
                    <div><span>${valueLabel}: ${valueToDisplay.toLocaleString()}</span></div>
                `;
                list.appendChild(li);
                rank++;
            }
        }

        if (list.innerHTML === '') {
             list.innerHTML = `<li>${t('ui.leaderboard.not_ranked_criteria')}</li>`;
        }
        
        if (currentUser && !userIsInTop10) {
            const playerRankLi = document.createElement('li');
            playerRankLi.style.cssText = "justify-content: center; font-style: italic; color: #aaa; margin-top: 15px; border-top: 1px solid #555; padding-top: 15px;";
            playerRankLi.textContent = t('ui.leaderboard.searching_rank');
            list.appendChild(playerRankLi);
        
            const userDocSnap = await getDoc(doc(db, "players", currentUser.uid));
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                
                let userScore = 0;
                let userValueLabel = "";
                switch(sortBy) {
                    case 'powerScore': userScore = userData.powerScore || 0; userValueLabel = t('ui.leaderboard.label_powerScore'); break;
                    case 'expeditionsStarted': userScore = (userData.stats && userData.stats.expeditionsStarted) || 0; userValueLabel = t('ui.leaderboard.label_expeditions'); break;
                    case 'bossesKilled': userScore = userData.bossesKilled || 0; userValueLabel = t('ui.leaderboard.label_bossesKilled'); break;
                    case 'dungeonHighestFloor': userScore = userData.dungeonHighestFloor || 0; userValueLabel = t('ui.leaderboard.label_dungeonFloor'); break;
                    case 'codexScore': userScore = userData.codexScore || 0; userValueLabel = t('ui.leaderboard.label_codexScore'); break;
                    case 'totalXpGained': userScore = (userData.stats && userData.stats.totalXpGained) || 0; userValueLabel = t('ui.leaderboard.label_totalXp'); break;
                }

                if (userScore > 0 || sortBy === 'powerScore') {
                    const higherRankQuery = query(playersRef, where(sortBy, '>', userScore));
                    const higherRankSnapshot = await getDocs(higherRankQuery);
                    const playerRank = higherRankSnapshot.size + 1;
                    
                    playerRankLi.classList.add('current-player-rank');
                    playerRankLi.style.cssText = '';
    
                    let nameDisplay = `<strong>${userData.player.name}</strong>`;
                    if (userData.ascensionLevel > 0) {
                        nameDisplay += ` <span class="ascension-tag">(A${userData.ascensionLevel})</span>`;
                    }

                    playerRankLi.innerHTML = `
                        <div>#${playerRank} - ${nameDisplay} (${t('ui.leaderboard.player_level_abbr', { level: userData.player.level })})</div>
                        <div><span>${userValueLabel}: ${userScore.toLocaleString()}</span></div>
                    `;
                } else {
                    playerRankLi.textContent = t('ui.leaderboard.not_ranked');
                }

            } else {
                 playerRankLi.textContent = t('ui.leaderboard.rank_data_not_found');
            }
        }

    } catch (error) {
        console.error("Erreur de chargement du leaderboard :", error);
        list.innerHTML = `<li>${t('ui.leaderboard.load_error')}</li>`;
        if (error.code === 'failed-precondition') {
            showCustomAlert(t('alerts.leaderboard.indexing_error'));
        }
    }
}

window.openAchievements = function(show = true) {
    const modal = document.getElementById('achievements-modal');
    if (show) {
        displaySucces();
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.getElementById('main-menu').classList.add('hidden'); // Ferme le menu
    } else {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

/**
 * Affiche la vue principale du hub du village et cache les vues des bâtiments.
 */
function showVillageHub() {
    document.querySelectorAll('.village-building-view').forEach(view => view.classList.add('hidden'));
    const hubView = document.getElementById('village-hub-view');
    if (hubView) {
        hubView.classList.remove('hidden');
        updateVillageHubUI(); // Rafraîchit le contenu du hub à chaque affichage
    }
}

function openBuildingView(viewName) {
    lastActiveSubTab = { action: 'openBuildingView', arg: viewName };

    // AJOUT : Logique pour gérer la classe .active
    document.querySelectorAll('#village-subnav .sub-nav-button').forEach(button => {
        button.classList.toggle('active', button.dataset.arg === viewName);
    });

    // Si on clique sur 'hub', on utilise la fonction dédiée
    if (viewName === 'hub') {
        showVillageHub();
        return;
    }
    
    // On cache le hub et les autres vues
    document.getElementById('village-hub-view').classList.add('hidden');
    document.querySelectorAll('.village-building-view').forEach(view => view.classList.add('hidden'));
    
    // On affiche la vue demandée
    const buildingView = document.getElementById(viewName + '-view');
    if (buildingView) {
        buildingView.classList.remove('hidden');
    }

    // On appelle la fonction de mise à jour APRÈS avoir affiché la vue
    if (viewName === 'forge') updateForgeDisplay();
    else if (viewName === 'enchanter') updateEnchanterUI();
    else if (viewName === 'merchant') displayVillageMerchant();
    else if (viewName === 'bounty') displayBountyBoard();
    else if (viewName === 'bounty-master') displayBountyMasterShop();
    else if (viewName === 'alchemist') displayAlchemistUI();
    else if (viewName === 'oracle') displayOracleUI();
    else if (viewName === 'cook') displayCookUI();
}

function updateVillageHubUI() {
    const features = gameState.unlockedFeatures || {};
    const player = gameState.player;
    if (!player) return; // Sécurité pour éviter les erreurs au chargement

    // --- Logique d'affichage des cartes de bâtiments ---
    document.getElementById('forge-hub-card').classList.remove('hidden');
    document.getElementById('merchant-hub-card').classList.toggle('hidden', !features.village);
    document.getElementById('alchemist-hub-card').classList.toggle('hidden', !features.alchemist);
    document.getElementById('cook-hub-card').classList.toggle('hidden', !features.cook);
    document.getElementById('bounty-hub-card').classList.toggle('hidden', !features.bounties);
    document.getElementById('bounty-master-hub-card').classList.toggle('hidden', !features.bounty_master);
    document.getElementById('oracle-hub-card').classList.toggle('hidden', (player.collectedCards || []).length === 0);

    // --- Mise à jour du contenu de la carte FORGE ---
    const forge = gameState.village.forge;
    const forgeStatusDiv = document.getElementById('forge-hub-status');
    let forgeStatusHTML = '';

    if (forge.constructionEnd > 0) {
        // NOUVEAU : Affiche le minuteur si en construction
        const timeLeftMs = Math.max(0, forge.constructionEnd - Date.now());
        const hours = Math.floor(timeLeftMs / 3600000).toString().padStart(2, '0');
        const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
        forgeStatusHTML = `<p class="building-status-inprogress">${t('ui.fief.under_construction')}</p><small class="timer">${hours}:${minutes}:${seconds}</small>`;
    } else if (forge.level === 0) {
        forgeStatusHTML = `<p class="building-status-locked">${t('ui.village_hub.status_locked')}</p><small>${t('ui.village_hub.cost_label')} ${FORGE_UNLOCK_COST} 🪵</small>`;
    } else {
        const maxRarityKey = RARITY_CONFIG[RARITY_ORDER[forge.level - 1]].nameKey;
        const maxRarity = t(maxRarityKey);
        forgeStatusHTML = `<p class="building-status-unlocked">${t('ui.village_hub.level_label')} ${forge.level}</p><small>${t('ui.village_hub.crafting_label')} ${maxRarity}</small>`;
    }
    if (forgeStatusDiv) forgeStatusDiv.innerHTML = forgeStatusHTML;


    // --- Mise à jour du contenu de la carte ENCHANTEUR ---
    const enchanter = gameState.village.enchanter;
    const enchanterCard = document.getElementById('enchanter-hub-card');
    enchanterCard.classList.toggle('hidden', !features.enchanter);

    if (features.enchanter) {
        const enchanterStatusDiv = document.getElementById('enchanter-hub-status');
        let enchanterStatusHTML = '';

        if (enchanter.constructionEnd > 0) {
            // NOUVEAU : Affiche le minuteur si en construction
            const timeLeftMs = Math.max(0, enchanter.constructionEnd - Date.now());
            const hours = Math.floor(timeLeftMs / 3600000).toString().padStart(2, '0');
            const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
            const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
            enchanterStatusHTML = `<p class="building-status-inprogress">${t('ui.fief.under_construction')}</p><small class="timer">${hours}:${minutes}:${seconds}</small>`;
        } else if (enchanter.level === 0) {
            enchanterStatusHTML = `<p class="building-status-locked">${t('ui.village_hub.status_locked')}</p><small>${t('ui.village_hub.cost_label')} ${ENCHANTER_UNLOCK_COST_FRAGMENTS} 💠</small>`;
        } else {
            const maxRarityKey = RARITY_CONFIG[ENCHANTER_MAX_RARITY_BY_LEVEL[enchanter.level - 1]].nameKey;
            const maxRarity = t(maxRarityKey);
            enchanterStatusHTML = `<p class="building-status-unlocked">${t('ui.village_hub.level_label')} ${enchanter.level}</p><small>${t('ui.village_hub.enchanter_enchants_up_to', {rarity: maxRarity})}</small>`;
        }
        if (enchanterStatusDiv) enchanterStatusDiv.innerHTML = enchanterStatusHTML;
    }

    // --- Mise à jour des autres cartes (logique inchangée) ---
    if (features.alchemist && document.getElementById('alchemist-hub-status')) {
        document.getElementById('alchemist-hub-status').innerHTML = `<p class="building-status-unlocked">${t('ui.village_hub.status_available')}</p><small>${t('ui.village_hub.alchemist_desc')}</small>`;
    }
    if (document.getElementById('merchant-hub-status')) {
        document.getElementById('merchant-hub-status').innerHTML = `<p class="building-status-unlocked">${t('ui.village_hub.status_available')}</p><small>${t('ui.village_hub.merchant_desc')}</small>`;
    }
    if (gameState.stats.hasCompletedMediumOrHigherBounty && document.getElementById('bounty-master-hub-status')) {
        document.getElementById('bounty-master-hub-status').innerHTML = `<p class="building-status-unlocked">${t('ui.village_hub.status_available')}</p><small>${t('ui.village_hub.bounty_master_desc')}</small>`;
    }
    if (document.getElementById('bounty-hub-status')) {
        document.getElementById('bounty-hub-status').innerHTML = `<p class="building-status-unlocked">${t('ui.village_hub.status_available')}</p><small>${t('ui.village_hub.bounty_desc')}</small>`;
    }
    if ((player.collectedCards || []).length > 0 && document.getElementById('oracle-hub-status')) {
        document.getElementById('oracle-hub-status').innerHTML = `<p class="building-status-unlocked">${t('ui.village_hub.status_available')}</p><small>${t('ui.village_hub.oracle_desc')}</small>`;
    }

    // Gère la visibilité du quartier mystique
    const mysticQuarter = document.getElementById('mystic-quarter-title').parentElement;
    const bountyCardVisible = !document.getElementById('bounty-hub-card').classList.contains('hidden');
    const oracleCardVisible = !document.getElementById('oracle-hub-card').classList.contains('hidden');
    if (mysticQuarter) {
        mysticQuarter.classList.toggle('hidden', !bountyCardVisible && !oracleCardVisible);
    }
}

function displayCookUI() {
    const listContainer = document.getElementById('cook-items-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    listContainer.className = 'craftable-items-list'; 

    Object.values(COOKING_RECIPES_DB).forEach(recipe => {
        let canAfford = true;
        const costParts = [];
        for (const resource in recipe.craftCost) {
            const required = recipe.craftCost[resource];
            const playerAmount = gameState.player.resources[resource] || 0;
            if (playerAmount < required) canAfford = false;
            costParts.push(`${required} <img src="${SPRITE_PATHS[resource]}" class="icon-sprite-small" title="${resource}">`);
        }
        
        const card = document.createElement('div');
        card.className = 'craftable-item-card';
        // MODIFIÉ
        card.innerHTML = `
            <h4>${t(recipe.nameKey)}</h4>
            <p><i>"${t(recipe.descriptionKey)}"</i></p>
            <p><strong>${t('ui.cook.bonus_label')}</strong> ${formatStatsToString({[recipe.bonus.stat]: recipe.bonus.value})} (${recipe.bonus.duration_in_combats} ${t('ui.cook.combats_unit')})</p>
            <div>
                <p><strong>${t('ui.cook.cost_label')}</strong> ${costParts.join(' + ')}</p>
                <button onclick="craftFoodItem('${recipe.id}')" ${!canAfford ? 'disabled' : ''}>${t('ui.cook.cook_button')}</button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function craftFoodItem(itemId) {
    const player = gameState.player;
    const recipe = COOKING_RECIPES_DB[itemId];
    if (!recipe) return;

    let canAfford = true;
    for (const resource in recipe.craftCost) {
        if ((player.resources[resource] || 0) < recipe.craftCost[resource]) {
            canAfford = false;
            break;
        }
    }

    if (!canAfford) {
        // MODIFIÉ
        showCustomAlert(t('alerts.cook.not_enough_ingredients'));
        return;
    }

    for (const resource in recipe.craftCost) {
        player.resources[resource] -= recipe.craftCost[resource];
    }

    const newItem = {
        id: recipe.id,
        uid: generateUID(),
        name: recipe.name,
        type: 'Consommable', 
        rarity: 'uncommon',
        isFood: true,
        description: recipe.description,
        bonus: recipe.bonus
    };
    player.inventory.push(newItem);

    // MODIFIÉ
    showToast(t('alerts.cook.craft_success', { itemName: recipe.name }), 'success');
    
    displayCookUI();
    updateGameUI();
    saveGame();
}
/**
 * Met à jour dynamiquement les listes déroulantes pour empêcher un échange invalide (ex: Bois contre Bois).
 */
window.updateExchangeOptions = function() {
    const fromSelect = document.getElementById('exchange-from');
    const toSelect = document.getElementById('exchange-to');
    const amountInput = document.getElementById('exchange-amount');
    const exchangeButton = document.getElementById('exchange-button');

    if (!fromSelect || !toSelect || !amountInput || !exchangeButton) return;

    const fromValue = fromSelect.value;
    for (const option of toSelect.options) {
        option.disabled = (option.value === fromValue);
    }
    if (toSelect.options[toSelect.selectedIndex].disabled) {
        for (const option of toSelect.options) {
            if (!option.disabled) {
                toSelect.value = option.value;
                break;
            }
        }
    }

    const amount = parseInt(amountInput.value, 10) || 0;
    const rate = MERCHANT_DB['VILLAGE_ARTISAN'].exchangeRate;
    const gainedAmount = Math.floor(amount * rate);
    const toResource = toSelect.value;

    // MODIFIÉ
    exchangeButton.innerHTML = `${t('ui.merchant.exchange_button_label')} (+${gainedAmount} <img src="${SPRITE_PATHS[toResource]}" class="icon-sprite-small">)`;
}

window.updateFragmentPurchaseUI = function() {
    const quantityInput = document.getElementById('fragment-quantity');
    const resourceSelect = document.getElementById('fragment-resource-select');
    const purchaseButton = document.getElementById('fragment-purchase-button');
    const costDisplay = document.getElementById('fragment-cost-display');
    if (!quantityInput || !resourceSelect || !purchaseButton || !costDisplay) return;

    const quantity = Math.max(1, parseInt(quantityInput.value, 10) || 1);
    const selectedResource = resourceSelect.value;
    const costPerFragment = 500;
    const totalCost = quantity * costPerFragment;

    // MODIFIÉ
    costDisplay.innerHTML = `${t('ui.merchant.total_cost_label')} <strong>${totalCost} <img src="${SPRITE_PATHS[selectedResource]}" class="icon-sprite-small"></strong>`;

    const canAfford = (gameState.player.resources[selectedResource] || 0) >= totalCost;
    purchaseButton.disabled = !canAfford;
}

function displayVillageMerchant() {
    const container = document.getElementById('village-merchant-section');
    const merchant = MERCHANT_DB['VILLAGE_ARTISAN'];
    const resourceOptions = ['bois', 'metal', 'tissu'];

    const buildOptions = (resources) => {
        return resources.map(r => `<option value="${r}">${t(`stats.displayNames.${r}`)}</option>`).join('');
    };

    // MODIFIÉ
    let directPurchaseHtml = `
        <div class="merchant-panel">
            <h4>${t('merchants.village_artisan.buy_components_title')}</h4>
            <div id="merchant-sells-list"></div>
        </div>`;

    let exchangeHtml = `
        <div class="merchant-panel">
            <h4>${t('merchants.village_artisan.exchange_title')}</h4>
            <p class="merchant-description">${t('merchants.village_artisan.exchange_description')}</p>
            <div class="merchant-exchange-interface">
                <label for="exchange-amount">${t('ui.merchant.amount_label')}</label>
                <input type="number" id="exchange-amount" value="10" min="10" step="10">
                <label for="exchange-from">${t('ui.merchant.from_label')}</label>
                <select id="exchange-from" onchange="updateExchangeOptions()">${buildOptions(resourceOptions)}</select>
                <label for="exchange-to">${t('ui.merchant.to_label')}</label>
                <select id="exchange-to" onchange="updateExchangeOptions()">${buildOptions(resourceOptions.slice(1).concat(resourceOptions[0]))}</select>
                <button id="exchange-button" class="action-button" onclick="exchangeResource()"></button>
            </div>
        </div>`;

    let fragmentHtml = `
        <div class="merchant-panel">
            <h4>${t('merchants.village_artisan.buy_fragments_title')}</h4>
            <p class="merchant-description">${t('merchants.village_artisan.buy_fragments_description')}</p>
            <div class="fragments-purchase-interface">
                <label for="fragment-quantity">${t('ui.merchant.quantity_label')}</label>
                <input type="number" id="fragment-quantity" value="1" min="1" oninput="updateFragmentPurchaseUI()">
                <label for="fragment-resource-select">${t('ui.merchant.pay_with_label')}</label>
                <select id="fragment-resource-select" onchange="updateFragmentPurchaseUI()">
                    ${buildOptions(resourceOptions)}
                </select>
                <div id="fragment-cost-display"></div>
                <button id="fragment-purchase-button" class="action-button" onclick="buyFragmentsFromMerchant()">${t('ui.merchant.buy_button')}</button>
            </div>
        </div>`;

    container.innerHTML = `<h3>${t(merchant.nameKey)}</h3>${directPurchaseHtml}${exchangeHtml}${fragmentHtml}`;

    const sellsList = document.getElementById('merchant-sells-list');
    sellsList.innerHTML = '';
    merchant.sells.forEach(itemForSale => {
        if (itemForSale.isResource) {
            const canAfford = (gameState.player.resources[itemForSale.price.resource] || 0) >= itemForSale.price.amount;
            const uniqueIdentifier = `${itemForSale.itemName.replace(/\s+/g, '_')}_${itemForSale.price.resource}`;
            const resourceDisplayName = t(`stats.displayNames.${itemForSale.itemName}`) || itemForSale.itemName.replace(/_/g, ' ');
            
            // MODIFIÉ
            const itemHtml = `
                <div class="merchant-item">
                    <span class="merchant-item-name">
                        <input type="number" id="buy-qty-${uniqueIdentifier}" value="1" min="1" style="width: 60px;"
                            oninput="updateBuyResourceCost(this, '${uniqueIdentifier}', '${itemForSale.price.resource}', ${itemForSale.price.amount})">
                        x <img src="${SPRITE_PATHS[itemForSale.itemName]}" class="icon-sprite-small"> ${resourceDisplayName}
                    </span>
                    <span id="buy-cost-container-${uniqueIdentifier}" class="merchant-item-controls">
                        <strong>${itemForSale.price.amount} <img src="${SPRITE_PATHS[itemForSale.price.resource]}" class="icon-sprite-small"></strong>
                        <button class="action-button" onclick="buyResourceFromMerchant('${uniqueIdentifier}', '${itemForSale.price.resource}')" ${!canAfford ? 'disabled' : ''}>${t('ui.merchant.buy_button')}</button>
                    </span>
                </div>
            `;
            sellsList.innerHTML += itemHtml;
        }
    });
    updateExchangeOptions();
    updateFragmentPurchaseUI();
    document.getElementById('exchange-amount').addEventListener('input', updateExchangeOptions);
}

function updateBuyResourceCost(inputElement, sanitizedItemName, priceResource, basePrice) {
    const quantity = parseInt(inputElement.value, 10) || 1;
    if (quantity < 1) {
        inputElement.value = 1;
        return;
    }
    
    const totalCost = quantity * basePrice;
    const canAfford = (gameState.player.resources[priceResource] || 0) >= totalCost;
    
    const costContainer = document.getElementById(`buy-cost-container-${sanitizedItemName}`);
    if (costContainer) {
        // MODIFIÉ
        costContainer.innerHTML = `
            <strong>${totalCost} <img src="${SPRITE_PATHS[priceResource]}" class="icon-sprite-small"></strong>
            <button class="action-button" onclick="buyResourceFromMerchant('${sanitizedItemName}', '${priceResource}')" ${!canAfford ? 'disabled' : ''}>${t('ui.merchant.buy_button')}</button>
        `;
    }
}

window.updateFragmentPurchaseButton = function() {
    const resourceSelect = document.getElementById('fragment-resource-select');
    const purchaseButton = document.getElementById('fragment-purchase-button');
    if (!resourceSelect || !purchaseButton) return;

    const selectedResource = resourceSelect.value;
    const cost = 500; // Coût fixe
    const canAfford = (gameState.player.resources[selectedResource] || 0) >= cost;

    purchaseButton.disabled = !canAfford;
}

/**
 * Gère l'achat de fragments avec des ressources (logique originale).
 * @param {string} resourceType - La ressource utilisée pour l'achat.
 */
window.buyFragmentsFromMerchant = function() {
    const quantityInput = document.getElementById('fragment-quantity');
    const resourceSelect = document.getElementById('fragment-resource-select');

    const quantity = Math.max(1, parseInt(quantityInput.value, 10) || 1);
    const resourceType = resourceSelect.value;
    const costPerFragment = 500;
    const totalCost = quantity * costPerFragment;

    if ((gameState.player.resources[resourceType] || 0) >= totalCost) {
        gameState.player.resources[resourceType] -= totalCost;
        gameState.player.fragments = (gameState.player.fragments || 0) + quantity;
        // MODIFIÉ
        showToast(t('alerts.merchant.buy_fragments_success', { quantity: quantity }));

        displayVillageMerchant(); 
        updateGameUI(); 
        saveGame();
    } else {
        // MODIFIÉ
        showToast(t('alerts.not_enough_resources'), 'error');
    }
}

/**
 * Gère l'échange de ressources au taux de 70%.
 */
window.exchangeResource = function() {
    const amountInput = document.getElementById('exchange-amount');
    const fromSelect = document.getElementById('exchange-from');
    const toSelect = document.getElementById('exchange-to');
    
    const amount = parseInt(amountInput.value, 10);
    const fromRes = fromSelect.value;
    const toRes = toSelect.value;

    // MODIFIÉ
    if (isNaN(amount) || amount < 10) return showCustomAlert(t('alerts.merchant.exchange_min_amount'));
    if (fromRes === toRes) {
        showCustomAlert(t('alerts.merchant.exchange_same_resource'));
        return;
    }
    if ((gameState.player.resources[fromRes] || 0) < amount) return showCustomAlert(t('alerts.merchant.exchange_not_enough', { resourceName: t(`stats.displayNames.${fromRes}`) }));

    const rate = MERCHANT_DB['VILLAGE_ARTISAN'].exchangeRate;
    const amountGained = Math.floor(amount * rate);

    gameState.player.resources[fromRes] -= amount;
    gameState.player.resources[toRes] = (gameState.player.resources[toRes] || 0) + amountGained;

    // MODIFIÉ
    showToast(t('alerts.merchant.exchange_success', { amountGained: amountGained, resourceName: t(`stats.displayNames.${toRes}`) }));
    displayVillageMerchant();
    updateGameUI();
    saveGame();
}

/**
 * Affiche une notification non-intrusive (toast) à l'écran.
 * @param {string} message - Le message à afficher.
 * @param {string} type - 'success' (vert) ou 'error' (rouge).
 * @param {number} duration - Durée en millisecondes avant la disparition.
 */
function showToast(message, type = 'success', duration = 2000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Animation d'apparition
    setTimeout(() => toast.classList.add('show'), 10);

    // Animation de disparition
    setTimeout(() => {
        toast.classList.remove('show');
        // Supprimer l'élément du DOM après la fin de la transition
        toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}


/**
 * Affiche ou cache la fenêtre modale des notes de version.
 * @param {boolean} show - Mettre à true pour afficher, false pour cacher.
 */
window.openPatchNote = function() {
    togglePatchNoteModal(true);
}

function togglePatchNoteModal(show) {
    const modal = document.getElementById('patch-notes-modal');
    if (!modal) return;

    if (show) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    } else {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

/**
 * Ouvre la fenêtre modale pour signaler un bug.
 * Attache automatiquement la version du jeu et les données de sauvegarde au formulaire.
 */
window.openBugReport = function() {
    document.getElementById('bug-report-version').value = SAVE_VERSION;

    try {
        const cleanSave = { player: gameState.player, saveVersion: SAVE_VERSION };
        const saveData = JSON.stringify(cleanSave);
        const compressedSave = LZString.compressToBase64(saveData);
        document.getElementById('bug-report-save-data').value = compressedSave;
    } catch (e) {
        // MODIFIÉ
        document.getElementById('bug-report-save-data').value = t('alerts.bug_report.save_generation_error');
    }

    toggleBugReportModal(true);
}

/**
 * Affiche ou cache la fenêtre modale de rapport de bug.
 * @param {boolean} show - Mettre à true pour afficher, false pour cacher.
 */
function toggleBugReportModal(show) {
    const modal = document.getElementById('bug-report-modal');
    if (!modal) return;

    if (show) {
        // Réinitialise le formulaire à l'ouverture
        document.getElementById('bug-report-form').reset();
        document.getElementById('bug-report-status').textContent = '';
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    } else {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

window.toggleCollapsiblePanel = function(event) {
    const header = event.currentTarget;
    
    // On bascule la classe 'active' comme avant
    header.classList.toggle('active');

    // On récupère l'ID du parent du header (ex: "equipment-section")
    const parentId = header.parentElement.id;

    // Si on a cliqué sur l'équipement OU l'inventaire...
    if (parentId === 'equipment-section' || parentId === 'inventory-section') {
        // ...on appelle notre nouvelle fonction intelligente pour tout resynchroniser.
        syncInventoryHeight();
    }
}

function formatExpeditionReportHTML(cache, finalEvent, rewardMultiplier) {
    let report = '';
    let hasGains = false;

    if (cache && cache.log && cache.log.length > 0) {
        report += `<div class="report-section-title">${t('ui.report.expedition_journal_title')}</div>`;
        
        const allCreaturesList = [...Object.values(ENEMIES_DB), ...BOSS_DB];
        
        let logContent = cache.log.join('<br>');
        
        logContent = logContent.replace(/en battant (.*?)\./g, (match, nameInLog) => {
            const creatureData = allCreaturesList.find(c => t(c.nameKey) === nameInLog);
            if (creatureData) {
                return t('ui.report.log_by_defeating', { enemyName: t(creatureData.nameKey) });
            }
            return match;
        });

        logContent = logContent.replace(/sur (.*?)\./g, (match, nameInLog) => {
            const creatureData = allCreaturesList.find(c => t(c.nameKey) === nameInLog);
            if (creatureData) {
                return t('ui.report.log_on_enemy', { enemyName: t(creatureData.nameKey) });
            }
            return match;
        });

        logContent = logContent.replace(/##DMG:(\d+)##/g, '<span class="damage-text">$1</span>');
        logContent = logContent.replace(/##HEAL:(\d+)##/g, '<span class="healing-text">$1</span>');
        logContent = logContent.replace(/%%ITEM:(.*?):(.*?):(.*?):%%/g, (match, name, rarity, color) => `<span class="${color}">${name} (${rarity})</span>`);
        logContent = logContent.replace(/##XP:(\d+)##/g, '<span class="log-highlight">$1 ⭐</span>');
        logContent = logContent.replace(/##RES:(.*?):(\d+)##/g, (match, res, amount) => {
            const iconHtml = `<img src="${SPRITE_PATHS[res]}" class="icon-sprite-small" alt="${res}">`;
            return `<span class="log-highlight">${amount} ${iconHtml}</span>`;
        });
        logContent = logContent.replace(/##ITEM_DROP##(.*?)\%%(.*?):(.*?):(.*?)\##/g, (match, source, name, rarity, color) => `<div class="log-item-drop"><span>${t('ui.report.log_item_drop_found_via', { sourceName: `<strong>${source}</strong>` })}</span><strong class="${color}">${name} (${rarity})</strong></div>`);
        report += `<div class="report-log">${logContent}</div>`;
    }

    if (rewardMultiplier < 1.0) {
        const penaltyPercentage = (1 - rewardMultiplier) * 100;
        report += `<div class="report-section-title" style="color:#ff6b6b;">${t('ui.report.overqualified_penalty_title')}</div>`;
        report += `<p style="font-size:0.9em; color:#ccc;">${t('ui.report.overqualified_penalty_desc', { penalty: penaltyPercentage.toFixed(0) })}</p>`;
    }

    report += `<div class="report-section-title">${t('ui.report.summary_title')}</div>`;

    if (cache && cache.xp && (cache.xp.base > 0 || cache.xp.combat > 0)) {
        hasGains = true;
        const baseXp = cache.xp.base || 0;
        const combatXp = cache.xp.combat || 0;
        const totalXp = baseXp + combatXp;
        const intelligenceMultiplier = 1 + ((5 * Math.sqrt(gameState.player.totalStats.Intelligence || 0) + getGlobalCodexBonus('xp_gain_percent')) / 100);
        const totalXpWithBonus = Math.round(totalXp * intelligenceMultiplier);
        const bonusAmount = totalXpWithBonus - totalXp;
        let xpString = '';
        if (baseXp > 0) xpString += `<strong>${baseXp}</strong> XP`;
        if (combatXp > 0) {
            if (xpString !== '') xpString += ' + ';
            xpString += `<strong>${combatXp}</strong> ${t('ui.report.combat_xp')}`;
        }
        if (bonusAmount > 0) xpString += ` (${t('ui.report.bonus_label')} <strong>+${bonusAmount}</strong>)`;
        report += `<p class="report-reward-line reward-xp">${xpString}</p>`;
    }

    if (cache) {
        ['bois', 'metal', 'tissu'].forEach(kind => {
            const amount = cache.resources[kind] || 0;
            if (amount !== 0) {
                hasGains = true;
                const verb = amount > 0 ? t('ui.report.verb_gained') : t('ui.report.verb_lost');
                const resourceName = t(`stats.displayNames.${kind}`);
                report += `<p class="report-reward-line reward-resource ${kind}">${resourceName}: ${verb} : <strong>${Math.abs(amount)}</strong></p>`;
            }
        });

        if (cache.fragments > 0) {
            hasGains = true;
            report += `<p class="report-reward-line reward-fragment">${t('stats.displayNames.fragments')}: ${t('ui.report.verb_gained')} : <strong>${cache.fragments}</strong></p>`;
        }

        const specialResources = Object.keys(cache.resources).filter(res => !['bois', 'metal', 'tissu'].includes(res));
        if (specialResources.length > 0) {
            specialResources.forEach(resName => {
                const amount = cache.resources[resName];
                if (amount > 0) {
                    hasGains = true;
                    // On essaie de traduire directement. Si ça échoue, on reformate et on réessaie.
                    let translatedResName = t(`stats.displayNames.${resName}`);
                    if (translatedResName === `stats.displayNames.${resName}`) {
                        const formattedKey = resName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        translatedResName = t(`stats.displayNames.${formattedKey}`) || formattedKey;
                    }
                    report += `<p class="report-components">${translatedResName}: ${t('ui.report.verb_gained')} : <strong>${amount}</strong></p>`;
                }
            });
        }
        
        if (cache.itemsFound && cache.itemsFound.length > 0) {
            hasGains = true;
            cache.itemsFound.forEach(item => {
                const colorClass = RARITY_CONFIG[item.rarity]?.colorClass || 'rarity-common';
                report += `<p class="report-special-loot">${t('ui.report.loot_label')} <strong class="${colorClass}">${item.name}</strong></p>`;
            });
        }
    }

    if (!hasGains) {
        report += `<p>${t('ui.report.no_gains')}</p>`;
    }

    return report;
}

function syncInventoryHeight() {
    const equipmentContent = document.querySelector('#equipment-section .collapsible-content');
    const inventoryHeader = document.querySelector('#inventory-section .collapsible-header');
    const inventoryContent = document.querySelector('#inventory-section .collapsible-content');

    // Si un des éléments n'existe pas, on ne fait rien.
    if (!equipmentContent || !inventoryHeader || !inventoryContent) {
        return;
    }

    // SI le panneau d'inventaire est censé être OUVERT (il a la classe .active)...
    if (inventoryHeader.classList.contains('active')) {
        // ... on mesure la hauteur réelle du contenu de l'équipement (avec scrollHeight)...
        const equipmentHeight = equipmentContent.scrollHeight;
        // ... et on l'applique comme hauteur maximale à l'inventaire.
        inventoryContent.style.maxHeight = equipmentHeight + 'px';
    } else {
        // SINON (s'il est censé être fermé), on RETIRE le style en ligne.
        // Cela permet à la règle CSS "max-height: 0" de prendre effet et de fermer le panneau.
        inventoryContent.style.maxHeight = null;
    }
}

function generateDailyBounties(forceRefresh = false) {
    // On ne vérifie le temps que si le rafraîchissement n'est pas forcé
    if (!forceRefresh) {
        const now = new Date();
        const currentHour = now.getHours();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        let lastRefreshPoint;
        if (currentHour < 8) {
            lastRefreshPoint = new Date(today);
            lastRefreshPoint.setHours(0, 0, 0, 0);
        } else if (currentHour < 16) {
            lastRefreshPoint = new Date(today);
            lastRefreshPoint.setHours(8, 0, 0, 0);
        } else {
            lastRefreshPoint = new Date(today);
            lastRefreshPoint.setHours(16, 0, 0, 0);
        }

        if ((gameState.lastBountyRefresh || 0) >= lastRefreshPoint.getTime()) {
            return;
        }
    }
    
    // ... Le reste de la fonction de génération de primes est identique ...
    console.log("Génération de nouvelles primes...");
    gameState.currentBounties = [];
    const powerScore = calculatePlayerPowerScore();

    const difficultyOrder = ['Facile', 'Moyen', 'Difficile', 'Élite'];
    let playerTier;
    if (powerScore >= 1000) playerTier = 'Élite';
    else if (powerScore >= 400) playerTier = 'Difficile';
    else if (powerScore >= 150) playerTier = 'Moyen';
    else playerTier = 'Facile';
    
    const playerTierIndex = difficultyOrder.indexOf(playerTier);
    const allowedTiers = [playerTier];
    if (playerTierIndex > 0) allowedTiers.push(difficultyOrder[playerTierIndex - 1]);
    if (playerTierIndex < difficultyOrder.length - 1) allowedTiers.push(difficultyOrder[playerTierIndex + 1]);

    const availableBounties = BOUNTIES_DB.filter(b => {
        const meetsPowerReq = (gameState.ascensionLevel > 0) || (powerScore >= b.powerRequirement);
        const isInAllowedTier = allowedTiers.includes(b.difficulty);
        return meetsPowerReq && isInAllowedTier;
    });

    const shuffled = availableBounties.sort(() => 0.5 - Math.random());
    
    for(let i = 0; i < Math.min(3, shuffled.length); i++) {
        gameState.currentBounties.push({
            id: shuffled[i].id,
            isCompleted: false
        });
    }
    
    // Si on force le refresh, on ne met pas à jour le timer pour ne pas bloquer le refresh naturel
    if (!forceRefresh) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let currentRefreshPoint;
        if (now.getHours() < 8) currentRefreshPoint = new Date(today.setHours(0,0,0,0));
        else if (now.getHours() < 16) currentRefreshPoint = new Date(today.setHours(8,0,0,0));
        else currentRefreshPoint = new Date(today.setHours(16,0,0,0));
        gameState.lastBountyRefresh = currentRefreshPoint.getTime();
    }
    saveGame();
}

window.useBountyToken = async function() {
    const tokenCount = gameState.player.resources.bounty_tokens || 0;
    if (tokenCount <= 0) {
        // MODIFIÉ
        showToast(t('alerts.bounty.no_tokens'), "error");
        return;
    }

    // MODIFIÉ
    const confirmed = await showCustomConfirm(t('alerts.bounty.use_token_confirm'));
    if (confirmed) {
        gameState.player.resources.bounty_tokens--;
        generateDailyBounties(true);
        displayBountyBoard();
        updateGameUI();
        // MODIFIÉ
        showToast(t('alerts.bounty.refresh_success'), "success");
        saveGame();
    }
}

function displayBountyBoard() {
    const container = document.getElementById('bounty-board-section');
    if (!container) {
        console.error("Conteneur 'bounty-board-section' introuvable !");
        return;
    }

    // MODIFIÉ
    const marksAmount = gameState.player.resources.marques_de_chasse || 0; // Récupère le montant
    container.innerHTML = `
        <div class="bounty-header">
            <h3>${t('ui.bounty.board_title')}</h3>

            <div class="contextual-resource-display">
                <span>${marksAmount.toLocaleString()}</span>
                <img src="assets/sprites/ressources/marque_chasse.png" class="icon-sprite-small" alt="Marques de Chasse">
            </div>
            </div>
        <p>${t('ui.bounty.board_description')}</p>
        <button id="bounty-refresh-button" class="action-button" onclick="useBountyToken()">
            ${t('ui.bounty.refresh_button_label', { tokenCount: `<span id="bounty-token-count">0</span>` })}
        </button>
        <div id="bounty-list"></div>
    `;

    const listContainer = document.getElementById('bounty-list');
    const allBountiesCompleted = gameState.currentBounties.every(b => b.isCompleted);

    if (allBountiesCompleted && gameState.currentBounties.length > 0) {
        // ▼▼▼ DÉBUT DE LA CORRECTION ▼▼▼
        listContainer.innerHTML = `
            <div class="all-bounties-completed">
                <h4>${t('ui.bounty.all_completed_title')}</h4>
                <p>${t('ui.bounty.all_completed_desc')}</p>
                <p class="bounty-timer-display">${t('ui.bounty.next_refresh_label')} <strong id="bounty-time-left">--:--:--</strong></p>
            </div>`;
        // ▲▲▲ FIN DE LA CORRECTION ▲▲▲
    } else {
        gameState.currentBounties.forEach(bountyState => {
            const bountyData = BOUNTIES_DB.find(b => b.id === bountyState.id);
            if (!bountyData) return;

            const card = document.createElement('div');
            card.className = `bounty-card ${bountyState.isCompleted ? 'completed' : ''}`;
            
            let rewardsHtml = `${bountyData.reward.marques_de_chasse} <img src="${SPRITE_PATHS['marques_de_chasse']}" class="icon-sprite-small">`;
            if (bountyData.reward.fragments) {
                rewardsHtml += ` + ${bountyData.reward.fragments} <img src="${SPRITE_PATHS['fragments']}" class="icon-sprite-small">`;
            }

            // MODIFIÉ
            card.innerHTML = `
                <h4>
                    ${t(bountyData.nameKey)}
                    <span class="bounty-difficulty difficulty-${bountyData.difficulty.toLowerCase()}">${t('ui.bounty.difficulties.' + bountyData.difficulty.toLowerCase())}</span>
                </h4>
                <div class="bounty-rewards">${t('ui.bounty.reward_label')} ${rewardsHtml}</div>
                <button class="action-button" onclick="startBounty('${bountyData.id}')" ${bountyState.isCompleted ? 'disabled' : ''}>
                    ${bountyState.isCompleted ? t('ui.bounty.button_completed') : t('ui.bounty.button_start')}
                </button>
            `;
            listContainer.appendChild(card);
        });
    }
    
    const tokenCountSpan = document.getElementById('bounty-token-count');
    const refreshButton = document.getElementById('bounty-refresh-button');
    if (tokenCountSpan && refreshButton) {
        const tokenCount = gameState.player.resources.bounty_tokens || 0;
        tokenCountSpan.textContent = tokenCount;
        refreshButton.disabled = tokenCount < 1;
    }
}

function displayBountyMasterShop(filterOverride = null) {
    const container = document.getElementById('bounty-master-section');
    if (!container) return;

    const openAccordions = new Set();
    document.querySelectorAll('#bounty-master-section .set-accordion-header.active').forEach(header => {
        openAccordions.add(header.dataset.setKey);
    });

    const playerClass = gameState.player.class;

    // MODIFIÉ
    let filterHtml = `
        <div id="set-filter-container">
            <label for="set-class-filter">${t('ui.bounty_master.filter_label')}</label>
            <select id="set-class-filter" onchange="displayBountyMasterShop(this.value)">
                <option value="current">${t('ui.bounty_master.filter_my_class')}</option>
                <option value="all">${t('ui.bounty_master.filter_all_classes')}</option>
                <option value="Guerrier">${t('ui.classes.Guerrier')}</option>
                <option value="Archer">${t('ui.classes.Archer')}</option>
                <option value="Mage">${t('ui.classes.Mage')}</option>
            </select>
        </div>
    `;

    const setItemCosts = { epic: 30, legendary: 90, mythic: 200 };
    const marksAmount = gameState.player.resources.marques_de_chasse || 0;
    let shopHtml = `
        <div class="bounty-header">
            <h3>${t('ui.bounty_master.title')}</h3>
            <div class="contextual-resource-display">
                <span>${marksAmount.toLocaleString()}</span>
                <img src="assets/sprites/ressources/marque_chasse.png" class="icon-sprite-small" alt="Marques de Chasse">
            </div>
        </div>
        <p>${t('ui.bounty_master.description')}</p>
        ${filterHtml}
    `;
    const filterValue = filterOverride || gameState.bountyShopFilter || 'current';
    gameState.bountyShopFilter = filterValue;

    for (const setKey in SETS_DB) {
        const set = SETS_DB[setKey];

        // ▼▼▼ DÉBUT DE L'AJOUT DU FILTRE DE RARETÉ ▼▼▼
        const allowedRarity = getHighestAllowedRarity();
        const setRarityIndex = RARITY_ORDER.indexOf(set.rarity);
        const allowedRarityIndex = RARITY_ORDER.indexOf(allowedRarity);

        // Si la rareté du set est supérieure à ce que le joueur peut obtenir, on passe au suivant.
        if (setRarityIndex > allowedRarityIndex) {
            continue;
        }
        // ▲▲▲ FIN DE L'AJOUT DU FILTRE DE RARETÉ ▲▲▲

        let shouldDisplay = false;
        // MODIFIÉ : Utilisation de la clé de traduction pour "Toutes les classes"
        if (filterValue === 'all') shouldDisplay = true;
        else if (filterValue === 'current') {
            if (!set.class_restriction || t(set.class_restriction) === t('ui.bounty_master.class_all') || [].concat(set.class_restriction).includes(playerClass)) shouldDisplay = true;
        } else {
            if (!set.class_restriction || t(set.class_restriction) === t('ui.bounty_master.class_all') || [].concat(set.class_restriction).includes(filterValue)) shouldDisplay = true;
        }
        
        if (!shouldDisplay) continue;

        const equippedCount = countEquippedSetPieces(setKey);
        let classRestrictionHtml = '';
        if (set.class_restriction) {
            const classText = Array.isArray(set.class_restriction) 
                ? set.class_restriction.map(c => t('ui.classes.' + c)).join(' / ') 
                : t('ui.classes.' + set.class_restriction);
            classRestrictionHtml = `<p class="set-class-restriction">${t('ui.bounty_master.set_class_label')} <strong>${classText}</strong></p>`;
        }
        
        let bonusContent = '';
        for (const count in set.bonuses) {
            const bonus = set.bonuses[count];
            const isActive = equippedCount >= count;
            const colorClass = isActive ? 'set-bonus-active' : 'set-bonus-inactive';
            const bonusStatsString = formatStatsToString(bonus.stats);
            // MODIFIÉ
            bonusContent += `<p><span class="${colorClass}">${t('ui.bounty_master.pieces_label', { count: count })} ${t(bonus.nameKey)}:</span> <span class="set-bonus-stats-text">${bonusStatsString}</span></p>`;
        }

        let itemsContent = '';
        set.items.forEach(itemData => {
            const cost = SET_ITEM_COSTS[set.rarity];
            const canAfford = (gameState.player.resources.marques_de_chasse || 0) >= cost;
            const itemName = t(itemData.nameKey);
            // MODIFIÉ
            const itemType = t(`ui.equipment_slots.${itemData.type}`) || itemData.type;
        itemsContent += `<div class="merchant-item">
                            <span class="${RARITY_CONFIG[set.rarity].colorClass}" title="${formatStatsTooltip(itemData.stats)}">${itemName} (${itemType})</span>
                            <span><strong>${cost} <img src="${SPRITE_PATHS['marques_de_chasse']}" class="icon-sprite-small"></strong><button class="action-button" onclick="buySetItem('${setKey}', '${itemData.nameKey}')" ${!canAfford ? 'disabled' : ''}>${t('ui.merchant.buy_button')}</button></span>
                        </div>`;
        });

        shopHtml += `
            <div class="set-accordion">
                <button class="set-accordion-header" data-set-key="${setKey}" onclick="this.classList.toggle('active'); this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block';">
                    <span><span class="${RARITY_CONFIG[set.rarity].colorClass}">${t(set.nameKey)}</span> <small>(${equippedCount}/${set.items.length})</small></span>
                    <span class="arrow">▼</span>
                </button>
                <div class="set-accordion-content" style="display: none;">
                    ${classRestrictionHtml} 
                    <div class="set-bonus-display">${bonusContent}</div>
                    ${itemsContent}
                </div>
            </div>`;
    }
    container.innerHTML = shopHtml;

    if (document.getElementById('set-class-filter')) {
        document.getElementById('set-class-filter').value = filterValue;
    }

    openAccordions.forEach(setKey => {
        const header = document.querySelector(`.set-accordion-header[data-set-key="${setKey}"]`);
        if (header) {
            header.classList.add('active');
            header.nextElementSibling.style.display = 'block';
        }
    });
}

// game.0.9.0.js

async function startBounty(bountyId) {
    if (gameState.isOnExpedition || gameState.inCombat || gameState.isOnPatrol || gameState.isResting) {
        showToast(t('alerts.bounty.start_busy'), 'error');
        return;
    }

    const bountyData = BOUNTIES_DB.find(b => b.id === bountyId);
    if (!bountyData) return;

    const confirmed = await showCustomConfirm(t('alerts.bounty.start_confirm', { bountyName: t(bountyData.nameKey) }));
    if (!confirmed) return;

    const baseEnemy = ENEMIES_DB[bountyData.targetEnemyId];
    const bountyEnemy = JSON.parse(JSON.stringify(baseEnemy));
    
    bountyEnemy.nameKey = bountyData.nameKey; 
    for (const stat in bountyEnemy.baseStats) {
        bountyEnemy.baseStats[stat] = Math.floor(bountyEnemy.baseStats[stat] * bountyData.statMultiplier);
    }
    // Assurer un minimum de vie
    bountyEnemy.baseStats.Vie = Math.max(1, bountyEnemy.baseStats.Vie); 

    gameState.customBountyEnemy = bountyEnemy; 
    gameState.isBountyFight = true;
    
    const afterCombatEvents = {
        win: { event: 'BOUNTY_WIN', bountyId: bountyId },
        loss: { event: 'BOUNTY_LOSS' }
    };
    
    // CORRECTION : On retire la gestion manuelle du résultat du combat ici.
    // Le système `afterCombatEvents` s'occupe déjà de déclencher la bonne fonction
    // (presentExpeditionEvent) une fois le combat terminé.
    startCombat(['CUSTOM_BOUNTY'], afterCombatEvents);
}

async function completeBounty(bountyId) {
    const bountyState = gameState.currentBounties.find(b => b.id === bountyId);
    if (bountyState) {
        bountyState.isCompleted = true;
    }

    const bountyData = BOUNTIES_DB.find(b => b.id === bountyId);
    if (!bountyData) return;
    const difficultBounties = ['Moyen', 'Difficile', 'Élite'];
    if (difficultBounties.includes(bountyData.difficulty)) {
        if (!gameState.stats.hasCompletedMediumOrHigherBounty) {
            gameState.stats.hasCompletedMediumOrHigherBounty = true;
            showToast(t('alerts.bounty.master_unlocked'), 'success');
        }
    }
    gameState.player.xp += bountyData.xpReward;

    gameState.player.resources.marques_de_chasse = (gameState.player.resources.marques_de_chasse || 0) + bountyData.reward.marques_de_chasse;
    let warehouseWasFull = false;
    for (const res in bountyData.reward) {
        if (res !== 'marques_de_chasse') {
            const result = addResource(res, bountyData.reward[res]);
            if (result.isFull) {
                warehouseWasFull = true;
            }
        }
    }
    if (warehouseWasFull) {
        showToast(t('alerts.warehouse_full', { resources: resourcesThatHitCap.join(', ') }), "error");
    }
    
    let rewardText = `${bountyData.reward.marques_de_chasse} 🎯 ${t('stats.displayNames.marques_de_chasse')}`;
    await showCustomAlert(`<h3>${t('alerts.bounty.completed_title')}</h3><p>${t('alerts.bounty.completed_desc', { bountyName: t(bountyData.nameKey), rewardText: rewardText })}</p>`);

    await checkForLevelUp();
    updateGameUI();
    
    // MODIFICATION : Le saveGame() est déplacé à la toute fin pour s'assurer que
    // tous les changements (prime complétée, ressources, XP, niveau) sont bien enregistrés.
    saveGame();
}


window.forceBountyReset = function() {
    console.log("Forçage du renouvellement des primes...");
    // On réinitialise la date du dernier rafraîchissement
    gameState.lastBountyRefresh = 0;
    // On appelle la fonction qui génère les primes (elle verra que la date est dépassée)
    generateDailyBounties();
    // On met à jour l'affichage
    displayBountyBoard();
    console.log("Nouvelles primes générées !");
}

window.forceRevive = function() {
    if (!gameState.player) {
        console.error("[DEV] Aucun joueur à ressusciter.");
        return;
    }

    if (!gameState.isResting) {
        console.warn("[DEV] Le joueur n'est pas en état de repos.");
        return;
    }

    // On annule l'état de repos
    gameState.isResting = false;
    gameState.restEndTime = 0;

    // On restaure les PV au maximum
    gameState.playerCurrentHP = gameState.player.currentMaxHP;

    // On cache l'écran de mort
    document.getElementById('death-overlay').style.display = 'none';

    // On met à jour toute l'interface du jeu
    updateGameUI();
    
    // On sauvegarde pour que le changement persiste même si on recharge la page
    saveGame();

    console.log("%c[DEV] Résurrection forcée réussie !", "color: #28a745; font-weight: bold;");
}

function showItemTooltip(itemUid) {
    const player = gameState.player;
    let item = Object.values(player.equipment).find(i => i && i.uid === itemUid);
    if (!item) {
        item = player.inventory.find(i => i.uid === itemUid);
    }

    if (!item) return;

    // MODIFIÉ
    let tooltipText = `<strong>${t(item.nameKey)}</strong><br><small>${t('ui.tooltip.item_header', { itemType: item.type, rarityName: t(RARITY_CONFIG[item.rarity].nameKey) })}</small>`;
    
    if (item.class_restriction) {
        const classText = [].concat(item.class_restriction).join(' / ');
        tooltipText += `<p style="text-align: center; color: #ffc107; font-weight: bold; margin: 10px 0;">${t('ui.tooltip.class_label')} ${classText}</p>`;
    }
    tooltipText += `<hr>`;
    
    if (item.type === 'Artefact' && item.modifiers) {
        const modifiersText = formatStatsForTooltip(item.modifiers);
        tooltipText += `<p><strong>${t('ui.tooltip.modifiers_label')}</strong><br>${modifiersText.replace(/\n/g, '<br>')}</p>`;
        tooltipText += `<hr><p style="font-style: italic; font-size: 0.9em;">"${t(item.descriptionKey)}"</p>`;
    } else {
        const baseStatsText = formatStatsForTooltip(item.stats);
        tooltipText += `<p><strong>${t('ui.tooltip.base_stats_label')}</strong><br>${baseStatsText || t('ui.tooltip.stats_none')}</p>`;

        if (item.enchanter && item.enchanter.rolledStats) {
            const affixInfo = AFFIX_DB[item.type]?.find(a => a.key === item.enchanter.affixKey);
            const affixStatsText = formatStatsForTooltip(item.enchanter.rolledStats);
            tooltipText += `<hr><p class="${RARITY_CONFIG[item.enchanter.rarity].colorClass}"><strong>${t('ui.tooltip.enchantment_label', { affixName: t(affixInfo?.nameKey) || t('ui.enchanter.unknown_affix') })}</strong><br>${affixStatsText.replace(/\n/g, '<br>')}</p>`;
        }
        
        if (item.isSetItem && SETS_DB[item.setKey]) {
            const set = SETS_DB[item.setKey];
            const equippedCount = countEquippedSetPieces(item.setKey);
            let bonusContent = '';
            for (const count in set.bonuses) {
                const bonus = set.bonuses[count];
                const isActive = equippedCount >= count;
                const colorClass = isActive ? 'set-bonus-active' : 'set-bonus-inactive';
                const bonusStatsString = formatStatsToString(bonus.stats);
                bonusContent += `<p><span class="${colorClass}">(${count}) ${t(bonus.nameKey)}:</span> <span class="set-bonus-stats-text">${bonusStatsString}</span></p>`;
            }
            tooltipText += `<hr><p><strong>${t('ui.tooltip.set_label')} ${t(set.nameKey)} (${equippedCount}/${set.items.length})</strong>${bonusContent}</p>`;
        }
    }
    
    showCustomAlert(tooltipText);
}

function attachInteractionListener(element, { onTap, onLongPress, onHover }) {
    let pressTimer = null;
    let isLongPress = false;
    let isScrolling = false; // Notre nouvel outil pour détecter le scroll
    const isTouch = 'ontouchstart' in window;

    const startHandler = (e) => {
        // AJOUT : Empêche le comportement par défaut du navigateur (scroll, sélection) sur mobile.
        if (isTouch) e.preventDefault();
        isLongPress = false;
        isScrolling = false; // On réinitialise à chaque nouvel appui
        
        pressTimer = setTimeout(() => {
            // Le timer ne se déclenche que si on n'a PAS commencé à scroller
            if (!isScrolling) {
                isLongPress = true;
                if (onLongPress) {
                    onLongPress();
                }
            }
        }, 500);
    };

    const moveHandler = (e) => {
        // Si le doigt bouge, on considère que c'est un scroll
        isScrolling = true;
        // Et on annule immédiatement le timer de l'appui long
        clearTimeout(pressTimer);
    };

    const endHandler = (e) => {
        clearTimeout(pressTimer);
        // On n'exécute l'action "onTap" QUE si ce n'était NI un appui long, NI un scroll
        if (!isLongPress && !isScrolling) {
            if (onTap) {
                onTap();
            }
        }
    };

    element.addEventListener('pointerdown', startHandler);
    element.addEventListener('pointermove', moveHandler); // On ajoute la surveillance du mouvement
    element.addEventListener('pointerup', endHandler);
    element.addEventListener('pointerleave', () => clearTimeout(pressTimer));

    if (!isTouch && onHover) {
        element.addEventListener('mouseenter', onHover);
    }
}

function showResetConfirm() {
    return new Promise(resolve => {
        const modal = document.getElementById('custom-confirm-modal');
        const text = document.getElementById('custom-confirm-text');
        const buttonsContainer = document.getElementById('custom-confirm-buttons');
        
        let message = t('alerts.reset.confirm_body');
        
        const user = window.firebaseTools.auth.currentUser;
        if (user) {
            message += t('alerts.reset.online_warning');
        }
        
        text.innerHTML = message;
        buttonsContainer.innerHTML = '';

        const confirmButton = document.createElement('button');
        confirmButton.id = 'custom-confirm-yes';
        const cancelButton = document.createElement('button');
        cancelButton.id = 'custom-confirm-no';
        
        // MODIFIÉ
        cancelButton.textContent = t('ui.prompts.cancel');
        
        let countdown = 5;
        // MODIFIÉ
        confirmButton.textContent = t('ui.prompts.yes_with_countdown', { countdown: countdown });
        confirmButton.disabled = true;

        const timerInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                // MODIFIÉ
                confirmButton.textContent = t('ui.prompts.yes_with_countdown', { countdown: countdown });
            } else {
                clearInterval(timerInterval);
                confirmButton.disabled = false;
                confirmButton.textContent = t('ui.prompts.confirm_delete');
            }
        }, 1000);

        confirmButton.onclick = () => {
            clearInterval(timerInterval);
            modal.style.display = 'none';
            resolve(true);
        };
        
        cancelButton.onclick = () => {
            clearInterval(timerInterval);
            modal.style.display = 'none';
            resolve(false);
        };
        
        buttonsContainer.appendChild(confirmButton);
        buttonsContainer.appendChild(cancelButton);
        
        modal.style.display = 'flex';
    });
}

window.buySetItem = function(setKey, itemNameKey) {
    const set = SETS_DB[setKey];
    const itemData = set.items.find(i => i.nameKey === itemNameKey); 
    if (!set || !itemData) return;

    // On récupère la rareté maximale autorisée pour le joueur.
    const allowedRarity = getHighestAllowedRarity();
    
    // On compare la rareté de l'ensemble avec la rareté autorisée.
    const requiredRarityIndex = RARITY_ORDER.indexOf(set.rarity);
    const allowedRarityIndex = RARITY_ORDER.indexOf(allowedRarity);

    // Si la rareté requise est supérieure à ce que le joueur peut avoir, on bloque.
    if (requiredRarityIndex > allowedRarityIndex) {
        const rarityName = t(`rarity.${set.rarity}`);
        showToast(t('alerts.bounty.knowledge_too_low', { rarityName: rarityName }), 'error');
        return; 
    }

    const cost = SET_ITEM_COSTS[set.rarity];

    if ((gameState.player.resources.marques_de_chasse || 0) >= cost) {
        gameState.player.resources.marques_de_chasse -= cost;

        // ==================== DÉBUT DE LA MODIFICATION ====================
        // On ajoute la 'nameKey' comme 'id' pour assurer un identifiant unique
        // lors de la sauvegarde et du chargement.
        const newItem = {
            ...itemData,
            id: itemData.nameKey, // <-- AJOUT IMPORTANT
            uid: generateUID(),
            rarity: set.rarity,
            isSetItem: true,
            setKey: setKey
        };
        // ===================== FIN DE LA MODIFICATION =====================

        gameState.player.inventory.push(newItem);
        showToast(t('alerts.bounty.buy_set_item_success', { itemName: t(itemData.nameKey) }), 'success');

        const activeFilter = document.getElementById('set-class-filter')?.value;
        displayBountyMasterShop(activeFilter);
        
        updateGameUI();
        saveGame();
    } else {
        showToast(t('alerts.bounty.not_enough_marks'), 'error');
    }
}

window.toggleItemLock = function(itemUid) {
    const item = gameState.player.inventory.find(i => i && i.uid === itemUid);
    if (item) {
        // On inverse l'état : si isLocked existe et est true, il devient false, sinon il devient true.
        item.isLocked = !item.isLocked; 
        updateInventoryUI(); // On rafraîchit l'inventaire pour voir le changement
        saveGame();
    }
}

function showClassChoiceModal() {
    const modal = document.getElementById('class-choice-modal');
    const container = document.getElementById('modal-class-selection-container');

    // ▼▼▼ CORRECTION : On s'assure que l'écouteur est bien attaché ▼▼▼
    // On utilise un attribut "data-" pour ne l'attacher qu'une seule fois.
    if (!container.dataset.listenerAttached) {
        container.addEventListener('click', (event) => {
            const button = event.target.closest('.class-choice');
            if (button) {
                container.querySelectorAll('.class-choice').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            }
        });
        container.dataset.listenerAttached = 'true';
    }
    // ▲▲▲ FIN DE LA CORRECTION ▲▲▲

    document.getElementById('finalize-class-choice-button').onclick = finalizeClassChoice;
    modal.classList.remove('hidden');
}

/**
 * Gère la réinitialisation des statistiques du joueur.
 */
function resetPlayerStats() {
    const player = gameState.player;
    let totalPoints = player.pointsToSpend;

    for (const stat in player.baseStats) {
        totalPoints += player.baseStats[stat];
        player.baseStats[stat] = 0;
    }

    player.pointsToSpend = totalPoints;
    // MODIFIÉ
    console.log(t('dev.logs.stats_reset', { totalPoints: totalPoints }));
}

function finalizeClassChoice() {
    const selectedClassEl = document.querySelector('#modal-class-selection-container .class-choice.selected');
    if (!selectedClassEl) {
        showCustomAlert(t('alerts.class.select_a_class'));
        return;
    }

    const chosenClass = selectedClassEl.dataset.class;
    gameState.player.class = chosenClass;

    const shouldResetStats = document.getElementById('stat-reset-checkbox').checked;
    if (shouldResetStats) {
        resetPlayerStats();
    }

    recalculateTotalStats();
    gameState.playerCurrentHP = gameState.player.currentMaxHP;
    gameState.playerCurrentMana = gameState.player.maxMana;

    saveGame();
    updateGameUI();
    document.getElementById('class-choice-modal').classList.add('hidden');
    // MODIFIÉ
    showCustomAlert(t('alerts.class.choice_success', { className: t(`ui.classes.${chosenClass}`) }));
}

function unequipInvalidItems() {
    if (!gameState.player || !gameState.player.class) return;

    const player = gameState.player;
    const unequippedItems = [];

    for (const slot of EQUIPMENT_SLOTS) {
        const item = player.equipment[slot];

        if (item && item.class_restriction) {
            const canEquip = Array.isArray(item.class_restriction) 
                ? item.class_restriction.includes(player.class)
                : item.class_restriction === player.class;

            if (!canEquip) {
                // MODIFIÉ : Utilisation de t() pour le nom de l'objet
                unequippedItems.push(t(item.nameKey)); 
                player.inventory.push(item);
                player.equipment[slot] = null;
            }
        }
    }

    if (unequippedItems.length > 0) {
        recalculateTotalStats();
        updateGameUI();
        
        // MODIFIÉ
        const alertMessage = `
            <h3>${t('alerts.unequip.title')}</h3>
            <p>${t('alerts.unequip.description')}</p>
            <ul>
                ${unequippedItems.map(name => `<li>${name}</li>`).join('')}
            </ul>
        `;
        showCustomAlert(alertMessage);
    }
}

function setupStatButtonListeners(containerId) {
    const container = document.getElementById(containerId);
    if (!container || container.dataset.listenersAttached === 'true') {
        return;
    }

    let pressTimer = null;
    let statRepeatInterval = null;

    // Utilise les Pointer Events pour une meilleure compatibilité
    const stopPress = () => {
        clearTimeout(pressTimer);
        clearInterval(statRepeatInterval);
        window.removeEventListener('pointerup', stopPress);
        window.removeEventListener('pointerleave', stopPress);
    };

    const startPress = (statName, event) => {
        // Ignore les clics non-principaux (ex: clic droit)
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        
        stopPress();
        adjustStat(statName, 1);

        pressTimer = setTimeout(() => {
            statRepeatInterval = setInterval(() => adjustStat(statName, 1), 75);
        }, 500);

        window.addEventListener('pointerup', stopPress);
        window.addEventListener('pointerleave', stopPress);
    };

    // Un seul écouteur pour le début de l'appui (souris ET tactile)
    container.addEventListener('pointerdown', (e) => {
        const button = e.target.closest('button[data-amount="1"]');
        if (button) {
            e.preventDefault(); // Empêche la sélection de texte ou le scroll
            startPress(button.dataset.stat, e);
        }
    });

    container.dataset.listenersAttached = 'true';
}

function attachInteractionListener(element, { onTap, onLongPress, onHover }) {
    let pressTimer = null;
    let isLongPress = false;
    let isScrolling = false;
    const isTouch = 'ontouchstart' in window;

    // NOUVEAU : On stocke les coordonnées de départ
    let startX = 0;
    let startY = 0;

    const startHandler = (e) => {
        if (isTouch) e.preventDefault();
        isLongPress = false;
        isScrolling = false; 
        
        // NOUVEAU : On enregistre la position au début du contact
        startX = e.clientX;
        startY = e.clientY;
        
        pressTimer = setTimeout(() => {
            if (!isScrolling) {
                isLongPress = true;
                if (onLongPress) {
                    onLongPress();
                }
            }
        }, 500);
    };

    const moveHandler = (e) => {
        // Si on a déjà décidé que c'est un scroll, on ne fait plus rien
        if (isScrolling) return;

        // On calcule la distance parcourue depuis le point de départ
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // MODIFIÉ : On ne considère le mouvement comme un scroll que s'il dépasse 10 pixels.
        // C'est notre "zone morte" qui pardonnera les petits tremblements du doigt.
        if (distance > 10) { 
            isScrolling = true;
            clearTimeout(pressTimer);
        }
    };

    const endHandler = (e) => {
        clearTimeout(pressTimer);
        if (!isLongPress && !isScrolling) {
            if (onTap) {
                onTap();
            }
        }
    };

    element.addEventListener('pointerdown', startHandler);
    element.addEventListener('pointermove', moveHandler);
    element.addEventListener('pointerup', endHandler);
    element.addEventListener('pointerleave', () => clearTimeout(pressTimer));

    if (!isTouch && onHover) {
        element.addEventListener('mouseenter', onHover);
    }
}

function showStatTooltip(statName) {
    const modal = document.getElementById('stat-breakdown-modal');
    const title = document.getElementById('stat-breakdown-title');
    const list = document.getElementById('stat-breakdown-list');
    if (!modal || !title || !list) return;

    const breakdown = gameState.player.statBreakdown[statName];
    if (!breakdown) return;
    
    let derivedLabel = t('ui.stats_panel.source_attribute_bonus');

    title.innerHTML = `${STAT_ICONS[statName] || ''} Détails pour ${t(`stats.displayNames.${statName}`) || statName}`;
    list.innerHTML = '';

    const totalTraitBonus = (breakdown.trait || 0) + (breakdown.traitFromPercent || 0);
    
    const sources = [
        { label: t('ui.stats_panel.source_base_points'), value: breakdown.base },
        { label: t('ui.stats_panel.source_equipment'), value: breakdown.equipment },
        { label: t('ui.stats_panel.source_affix'), value: breakdown.affix },
        { label: t('ui.stats_panel.source_set'), value: breakdown.set },
        { label: t('ui.stats_panel.source_codex'), value: breakdown.codex },
        { label: t('ui.stats_panel.source_achievement'), value: breakdown.succes },
        { label: t('ui.stats_panel.source_constellation'), value: breakdown.constellation },
        { label: t('ui.stats_panel.source_ascension'), value: breakdown.ascension },
        { label: t('ui.stats_panel.source_traits'), value: totalTraitBonus },
        { label: derivedLabel, value: breakdown.derived }
    ];

    const isPercent = String(statName).includes('_percent') || ['CritChance', 'CritDamage'].includes(statName);
    let hasDetails = false;
    
    sources.forEach(source => {
        if (source.value && source.value !== 0) {
            hasDetails = true;
            const roundedValue = Math.round(source.value * 100) / 100;
            const displayValue = `${roundedValue > 0 ? '+' : ''}${roundedValue}${isPercent ? '%' : ''}`;
            
            list.innerHTML += `<div class="stat-breakdown-line"><span>${source.label}:</span> <span>${displayValue}</span></div>`;
        }
    });

    list.innerHTML += `<div class="stat-breakdown-line total"><span>Total:</span> <span>${Math.round(breakdown.total * 100) / 100}${isPercent ? '%' : ''}</span></div>`;
    
    modal.classList.remove('hidden');
}

window.hideStatTooltip = function() {
    const modal = document.getElementById('stat-breakdown-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

/**
 * Affiche la description d'une statistique dans une alerte (pour mobile).
 */
function showDescriptionAlert(statName) {
    // MODIFIÉ
    const description = t(`stats.descriptions.${statName}`) || t('ui.tooltip.no_description');
    const title = `${STAT_ICONS[statName] || ''} ${t(`stats.displayNames.${statName}`) || statName}`;
    
    showCustomAlert(`<h3>${title}</h3><p style="text-align: left;">${description}</p>`);
}

/**
 * Cache l'infobulle des statistiques.
 */
function hideStatTooltip() {
    const tooltip = document.getElementById('stat-tooltip');
    if (tooltip) {
        tooltip.classList.add('hidden');
    }
}

/**
 * Formate un objet de statistiques pour une infobulle, avec des sauts de ligne.
 * @param {object} stats - L'objet de statistiques.
 * @returns {string} La chaîne HTML formatée.
 */
function formatStatsForTooltip(stats) {
    // MODIFIÉ
    if (!stats || Object.keys(stats).length === 0) return t('ui.tooltip.stats_none');
    return Object.entries(stats).map(([key, val]) => {
        const displayName = t(`stats.displayNames.${key}`) || key;
        const suffix = String(key).includes('_percent') ? '%' : '';
        const sign = val > 0 ? '+' : '';
        return `${displayName}: ${sign}${val}${suffix}`;
    }).join('<br>');
}

function buildItemTooltipHTML(item) {
    if (!item) return '';

    // CORRECTION : Utilisation de t(item.nameKey) et t(RARITY_CONFIG.nameKey)
    let content = `<strong class="${RARITY_CONFIG[item.rarity].colorClass}">${t(item.nameKey)}</strong><br><small>(${item.type} - ${t(RARITY_CONFIG[item.rarity].nameKey)})</small>`;
    
    if (item.class_restriction) {
        const classText = [].concat(item.class_restriction).join(' / ');
        content += `<p style="text-align: center; color: #ffc107; font-weight: bold; margin: 10px 0;">Classe : ${classText}</p>`;
    }
    content += `<hr style="border-color: #444;">`;

    if (item.type === 'Artefact' && item.modifiers) {
        const modifiersText = formatStatsForTooltip(item.modifiers);
        content += `<p><strong>Modificateurs :</strong><br>${modifiersText.replace(/\n/g, '<br>')}</p>`;
        // CORRECTION : Utilisation de t(item.descriptionKey) pour les artefacts
        content += `<hr style="border-color: #444;"><p style="font-style: italic; font-size: 0.9em;">"${t(item.descriptionKey)}"</p>`;
    } else {
        const baseStatsText = formatStatsForTooltip(item.stats);
        content += `<p><strong>Statistiques :</strong><br>${baseStatsText || 'Aucune'}</p>`;
        
        if (item.isSetItem && SETS_DB[item.setKey]) {
            const set = SETS_DB[item.setKey];
            const equippedCount = countEquippedSetPieces(item.setKey);
            let bonusContent = '';
            for (const count in set.bonuses) {
                const bonus = set.bonuses[count];
                const isActive = equippedCount >= count;
                const colorClass = isActive ? 'set-bonus-active' : 'set-bonus-inactive';
                const bonusStatsString = formatStatsToString(bonus.stats);
                // CORRECTION : Utilisation de t(bonus.nameKey) pour le nom du bonus de set
                bonusContent += `<p><span class="${colorClass}">(${count}) ${t(bonus.nameKey)}:</span> <span class="set-bonus-stats-text">${bonusStatsString}</span></p>`;
            }
            // CORRECTION : Utilisation de t(set.nameKey) pour le nom du set
            content += `<hr style="border-color: #444;"><p><strong>Set: ${t(set.nameKey)} (${equippedCount}/${set.items.length})</strong>${bonusContent}</p>`;
        }

        if (item.enchanter && item.enchanter.rolledStats) {
            const affixInfo = AFFIX_DB[item.type]?.find(a => a.key === item.enchanter.affixKey);
            const affixStatsText = formatStatsForTooltip(item.enchanter.rolledStats);
            // CORRECTION : Utilisation de t(affixInfo.nameKey) pour le nom de l'affixe
            content += `<hr style="border-color: #444;"><p class="${RARITY_CONFIG[item.enchanter.rarity].colorClass}"><strong>Enchantement [${t(affixInfo?.nameKey) || 'Inconnu'}] :</strong><br>${affixStatsText.replace(/\n/g, '<br>')}</p>`;
        }
    }

    return content;
}

/**
 * Displays and positions a generic tooltip.
 * @param {string} htmlContent - The inner HTML of the tooltip.
 * @param {HTMLElement} element - The element to position the tooltip relative to.
 */
function showTooltip(htmlContent, element) {
    const tooltip = document.getElementById('stat-tooltip');
    if (!tooltip || !element) return;

    tooltip.innerHTML = htmlContent;
    tooltip.classList.remove('hidden'); // Show it first to calculate its size

    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = rect.bottom + 8; // Default position below the element
    let left = rect.left;

    // If it overflows below the viewport, position it above
    if (top + tooltipRect.height > viewportHeight) {
        top = rect.top - tooltipRect.height - 8;
    }

    // If it overflows to the right, align its right edge with the viewport edge
    if (left + tooltipRect.width > viewportWidth) {
        left = viewportWidth - tooltipRect.width - 10;
    }

    // Ensure it doesn't overflow to the left
    if (left < 0) {
        left = 8;
    }
    
    // Ensure it doesn't overflow above
    if (top < 0) {
        top = 8;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    // Logic to close on outside click (for mobile tap)
    setTimeout(() => {
        const dismissHandler = (event) => {
            // Check if the click is outside the tooltip
            if (!tooltip.contains(event.target)) {
                hideStatTooltip();
                // Clean up listeners
                document.removeEventListener('click', dismissHandler, true);
                document.removeEventListener('touchstart', dismissHandler, true);
            }
        };
        document.addEventListener('click', dismissHandler, true);
        document.addEventListener('touchstart', dismissHandler, true);
    }, 10);
}

window.openPatchNote = function(version = null) {
    const modal = document.getElementById('patch-notes-modal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';

    if (version) {
        displayPatchNotes(version);
    } else {
        displayPatchSelection();
    }
}

/**
 * Affiche la liste des versions de patch notes disponibles.
 */
function displayPatchSelection() {
    const content = document.getElementById('patch-notes-content');
    const versions = Object.keys(PATCH_NOTES_DB).reverse();

    // MODIFIÉ
    let selectionHtml = `<h2>${t('ui.patch_notes.title')}</h2><p>${t('ui.patch_notes.select_version_prompt')}</p><div class="options-buttons">`;
    versions.forEach(version => {
        const patch = PATCH_NOTES_DB[version];
        selectionHtml += `<button onclick="openPatchNote('${version}')">${version.toUpperCase()} : ${t(patch.titleKey)}</button>`;
    });
    // MODIFIÉ
    selectionHtml += `</div><button class="modal-close-button" onclick="togglePatchNoteModal(false)">${t('ui.buttons.close')}</button>`;

    content.innerHTML = selectionHtml;
}

/**
 * Affiche le contenu détaillé d'une note de version spécifique.
 * @param {string} version - La clé de la version à afficher.
 */
function displayPatchNotes(version) {
    const content = document.getElementById('patch-notes-content');
    const patch = PATCH_NOTES_DB[version];
    if (!patch) return;

    // MODIFIÉ
    let notesHtml = `<h2>${t('ui.patch_notes.version_title', { version: version.toUpperCase(), title: t(patch.titleKey) })}</h2><div id="patch-notes-list">`;

    patch.sections.forEach(section => {
        notesHtml += `<h4>${t(section.titleKey)}</h4><ul>`;
        
        const pointsArray = t(section.pointsKey);
        if (Array.isArray(pointsArray)) {
            pointsArray.forEach(point => {
                notesHtml += `<li>${point}</li>`;
            });
        }

        notesHtml += `</ul>`;
    });

    notesHtml += '</div>';
    // MODIFIÉ
    notesHtml += `<button class="secondary-action-button" style="margin-right: auto;" onclick="openPatchNote()">${t('ui.buttons.back_to_selection')}</button>`;
    notesHtml += `<button class="modal-close-button" onclick="togglePatchNoteModal(false)">${t('ui.buttons.close')}</button>`;

    content.innerHTML = notesHtml;
}

/**
 * Fonction simple pour fermer la modale (remplace l'ancienne).
 */
window.togglePatchNoteModal = function(show) {
    const modal = document.getElementById('patch-notes-modal');
    if (show) {
        openPatchNote(); // Appelle notre nouvelle fonction principale
    } else {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

window.craftAlchemicalItem = function(itemId) {
    const player = gameState.player;
    const recipe = ALCHEMY_RECIPES_DB[itemId];
    if (!recipe) {
        console.error("Recette d'alchimie non trouvée :", itemId);
        return;
    }

    let canAfford = true;
    for (const resource in recipe.craftCost) {
        const requiredAmount = recipe.craftCost[resource];
        let playerAmount;
        
        if (resource === 'fragments') {
            playerAmount = player.fragments || 0;
        } else {
            playerAmount = player.resources[resource] || 0;
        }

        if (playerAmount < requiredAmount) {
            canAfford = false;
            break;
        }
    }

    if (!canAfford) {
        showToast(t('alerts.alchemist.not_enough_components'), "error");
        return;
    }

    for (const resource in recipe.craftCost) {
        if (resource === 'fragments') {
            player.fragments -= recipe.craftCost[resource];
        } else {
            player.resources[resource] -= recipe.craftCost[resource];
        }
    }

    player.consumables[itemId] = (player.consumables[itemId] || 0) + 1;
    if (!gameState.unlockedFeatures.hasFoundConsumable) {
        gameState.unlockedFeatures.hasFoundConsumable = true;
    }

    // On s'assure que l'objet de stats existe
    if (!gameState.stats.consumablesCrafted) {
        gameState.stats.consumablesCrafted = {};
    }
    // On incrémente le compteur pour l'objet fabriqué
    gameState.stats.consumablesCrafted[itemId] = (gameState.stats.consumablesCrafted[itemId] || 0) + 1;
    
    showToast(t('alerts.alchemist.craft_success', { itemName: t(recipe.nameKey) }), 'success');
    
    displayAlchemistUI();
    updateGameUI();
    saveGame();
}

function updateConsumablesUI() {
    const list = document.getElementById('consumables-list');
    if (!list) return;
    list.innerHTML = '';
    const player = gameState.player;

    if (!player.consumables || Object.keys(player.consumables).length === 0) {
        // MODIFIÉ
        list.innerHTML = `<li style="color: #aaa; text-align: center;">${t('ui.consumables.none')}</li>`;
        return;
    }
    
    let hasConsumables = false;
    for (const itemId in player.consumables) {
        const count = player.consumables[itemId];
        if (count > 0) {
            hasConsumables = true;
            const itemData = CONSUMABLES_DB[itemId];
            const li = document.createElement('li');
            
            li.innerHTML = `<span><strong>${t(itemData.nameKey)}</strong> (x${count})</span>`;
            li.title = t(itemData.descriptionKey);
            
            list.appendChild(li);
        }
    }
    
    if (!hasConsumables) {
        // MODIFIÉ
        list.innerHTML = `<li style="color: #aaa; text-align: center;">${t('ui.consumables.none')}</li>`;
    }
}

function giveResource(resourceId, amount) {
    if (!gameState.player) {
        console.error("Aucun joueur chargé. Créez ou chargez un personnage d'abord.");
        return;
    }
    if (typeof amount !== 'number' || amount <= 0) {
        console.error("Le montant doit être un nombre positif.");
        return;
    }

    // On vérifie si la ressource est valide
    if (!SPRITE_PATHS[resourceId]) {
        console.error(`La ressource "${resourceId}" n'existe pas. Vérifiez l'orthographe.`);
        return;
    }

    if (resourceId === 'fragments') {
        gameState.player.fragments = (gameState.player.fragments || 0) + amount;
    } else {
        gameState.player.resources[resourceId] = (gameState.player.resources[resourceId] || 0) + amount;
    }

    console.log(`%c[CHEAT] Ajout de ${amount} ${resourceId}.`, 'color: #ffc107; font-weight: bold;');
    
    // On met à jour l'UI et on sauvegarde
    updateGameUI();
    saveGame();
}

function devGiveSeed(seedId, amount = 1) {
    if (!gameState.player) {
        console.error("[DEV] Aucun joueur chargé.");
        return;
    }
    if (!GARDEN_PLANTS_DB[seedId]) {
        console.error(`[DEV] Graine introuvable : "${seedId}". Vérifiez l'ID dans db.0.8.0.js.`);
        const allSeedIds = Object.keys(GARDEN_PLANTS_DB);
        console.log("Graines disponibles :", allSeedIds.join(', '));
        return;
    }
    const numAmount = parseInt(amount, 10);
    if (isNaN(numAmount) || numAmount <= 0) {
        console.error("[DEV] Le montant doit être un nombre positif.");
        return;
    }

    const garden = gameState.fief.garden;
    garden.seed_inventory[seedId] = (garden.seed_inventory[seedId] || 0) + numAmount;

    console.log(`%c[DEV] Ajout de ${numAmount} graine(s) de "${GARDEN_PLANTS_DB[seedId].name}".`, 'color: #28a745; font-weight: bold;');
    
    // On met à jour l'UI et on sauvegarde
    if (!document.getElementById('fief-screen').classList.contains('hidden')) {
        updateGardenUI();
    }
    updateGameUI();
    saveGame();
}

// On attache la fonction à l'objet 'window' pour la rendre accessible depuis la console
window.giveSeed = devGiveSeed;

function updateMainTabsState() {
    const isPlayerBusy = gameState.isInDungeon || gameState.isOnExpedition || gameState.inCombat || gameState.isOnPatrol || gameState.isResting;

    // Onglets du bas (Village, Codex, etc.)
    const bottomTabButtons = document.querySelectorAll('#bottom-panels-container .tab-button');
    bottomTabButtons.forEach(button => {
        const tabName = button.getAttribute('onclick').match(/'([^']+)'/)[1];

        // Le Codex et la Maîtrise sont TOUJOURS accessibles
        if (tabName === 'codex' || tabName === 'maitrise') {
            button.disabled = false;
            button.style.pointerEvents = 'auto';
            button.style.opacity = 1;
        } else { // Les autres onglets (comme le Village) sont désactivés si le joueur est occupé
            button.disabled = isPlayerBusy;
            button.style.pointerEvents = isPlayerBusy ? 'none' : 'auto';
            button.style.opacity = isPlayerBusy ? 0.6 : 1;
        }
    });

    // Onglets du haut (Expéditions, Patrouille, etc.)
    const topTabButtons = document.querySelectorAll('#expedition-tabs .tab-button');
    topTabButtons.forEach(button => {
        if (isPlayerBusy) {
            button.disabled = true;
            button.style.pointerEvents = 'none';
            button.style.opacity = 0.6;
        } else {
            button.disabled = false;
            button.style.pointerEvents = 'auto';
            button.style.opacity = 1;
        }
    });

    // Cas particulier : si on est EN donjon, on veut que l'onglet "Donjon" reste "actif" visuellement
    if (gameState.isInDungeon) {
        const dungeonTabButton = document.querySelector('#expedition-tabs .tab-button[onclick="switchAdventureTab(\'dungeon\')"]');
        if (dungeonTabButton) {
            dungeonTabButton.disabled = false;
            dungeonTabButton.style.pointerEvents = 'none';
            dungeonTabButton.style.opacity = 1;
        }
    }
}

function checkAndGrantDailyDungeonKey() {
    if (!gameState.player) return;

    const now = new Date();
    const currentHour = now.getHours();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let lastRefreshPoint;
    if (currentHour < 8) {
        lastRefreshPoint = new Date(today);
        lastRefreshPoint.setHours(0, 0, 0, 0);
    } else if (currentHour < 16) {
        lastRefreshPoint = new Date(today);
        lastRefreshPoint.setHours(8, 0, 0, 0);
    } else {
        lastRefreshPoint = new Date(today);
        lastRefreshPoint.setHours(16, 0, 0, 0);
    }

    if ((gameState.lastDungeonKeyRefresh || 0) < lastRefreshPoint.getTime()) {
        gameState.lastDungeonKeyRefresh = lastRefreshPoint.getTime();

        if ((gameState.player.resources.cle_de_la_breche || 0) < 5) {
            gameState.player.resources.cle_de_la_breche++;
            isDirty = true;
            // MODIFIÉ
            showToast(t('alerts.dungeon.key_granted'), 'success');
            console.log("Clé de donjon quotidienne attribuée.");
            updateGameUI();
            saveGame();
        } else {
            console.log("Attribution de clé quotidienne annulée : stock maximum atteint.");
        }
    }
}

function updateDungeonKeyTimer() {
    // On ajoute une garde pour s'assurer que le joueur et ses ressources existent.
    // Cela empêche un crash lors de la transition pendant l'Ascension, où l'objet joueur est temporairement minimaliste.
    if (!gameState.player || !gameState.player.resources) return;

    const timerSpan = document.getElementById('dungeon-next-key-timer');
    if (!timerSpan || (gameState.player.resources.cle_de_la_breche || 0) >= 5) {
        if (timerSpan) timerSpan.textContent = t('ui.dungeon.max_stock_reached');
        return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let nextRefreshPoint;

    if (now.getHours() < 8) {
        nextRefreshPoint = new Date(today.setHours(8, 0, 0, 0));
    } else if (now.getHours() < 16) {
        nextRefreshPoint = new Date(today.setHours(16, 0, 0, 0));
    } else {
        nextRefreshPoint = new Date(today.setDate(today.getDate() + 1));
        nextRefreshPoint.setHours(0, 0, 0, 0);
    }

    const timeLeftMs = Math.max(0, nextRefreshPoint.getTime() - now.getTime());
    const hours = Math.floor(timeLeftMs / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000).toString().padStart(2, '0');
    
    timerSpan.textContent = t('ui.dungeon.next_key_in', { hours: hours, minutes: minutes, seconds: seconds });
}

window.buyResourceFromMerchant = function(uniqueIdentifier, priceResource) {
    const player = gameState.player;
    
    const originalItemNameSanitized = uniqueIdentifier.replace(`_${priceResource}`, '');
    const originalItemName = originalItemNameSanitized.replace(/_/g, ' ');
    
    const merchantItem = MERCHANT_DB['VILLAGE_ARTISAN'].sells.find(item => item.itemName === originalItemName && item.price.resource === priceResource);
    if (!merchantItem) return;
    
    const quantityInput = document.getElementById(`buy-qty-${uniqueIdentifier}`);
    const quantity = parseInt(quantityInput.value, 10) || 1;
    
    const totalCost = quantity * merchantItem.price.amount;

    if ((player.resources[priceResource] || 0) >= totalCost) {
        player.resources[priceResource] -= totalCost;
        player.resources[originalItemName] = (player.resources[originalItemName] || 0) + quantity;
        
        // MODIFIÉ
        showToast(t('alerts.merchant.buy_resource_success', { quantity: quantity, resourceName: originalItemName.replace(/_/g, ' ') }));

        displayVillageMerchant();
        updateGameUI(); 
        saveGame();
    } else {
        // MODIFIÉ
        showToast(t('alerts.merchant.not_enough_specific', { resourceName: t(`stats.displayNames.${priceResource}`) }), 'error');
    }
}

window.craftArtefact = function(itemId) {
    const player = gameState.player;
    const itemToCraft = ARTEFACTS_DB[itemId];
    if (!itemToCraft) {
        // MODIFIÉ
        console.error(t('dev.logs.artefact_not_found', { itemId: itemId }));
        return;
    }
    const cost = itemToCraft.cost.eclats_instables;
    if ((player.resources.eclats_instables || 0) < cost) {
        // MODIFIÉ
        showCustomAlert(t('alerts.enchant.not_enough_shards'));
        return;
    }

    player.resources.eclats_instables -= cost;
    const newItem = { ...itemToCraft, uid: generateUID() };
    player.inventory.push(newItem);
    // MODIFIÉ
    showToast(t('alerts.forge.craft_success_generic', { itemName: t(itemToCraft.nameKey) }), 'success');
    selectedForgeItem = null;
    document.getElementById('main-craft-button').disabled = true;
    displayCraftableItems();

    updateGameUI();
    saveGame();
}


function calculateCodexScore() {
    if (!gameState.player || !gameState.player.killCount) return 0;

    let score = 0;
    const killCounts = gameState.player.killCount;
    const thresholds = Object.keys(CODEX_MILESTONES_DB).map(Number).sort((a,b) => a-b); // [10, 50, 100, 250]
    const points = { 10: 5, 50: 15, 100: 30, 250: 50 };

    for (const enemyName in killCounts) {
        const count = killCounts[enemyName];
        if (count > 0) {
            score += 1; // 1 point pour la découverte
            for (const threshold of thresholds) {
                if (count >= threshold) {
                    score += points[threshold];
                }
            }
        }
    }
    return score;
}

// =================================================================================
// NOUVELLES FONCTIONS : SYSTÈME D'ASCENSION
// =================================================================================

/**
 * Calcule le niveau maximum actuel en fonction du niveau d'Ascension.
 */
function getMaxLevelForAscension(ascensionLevel = gameState.ascensionLevel) {
    const levelCap = 100 + (ascensionLevel * 100);
    return Math.min(500, levelCap); // On s'assure de ne jamais dépasser 500
}

function calculateAscensionRewards() {
    const player = gameState.player;
    const rewards = {
        level: 0,
        resources: 0,
        fragments: 0,
        dungeon: 0,
        bosses: 0, // NOUVEAU : On ajoute une catégorie pour les boss
        total: 0
    };

    rewards.level = Math.floor(Math.pow(player.level / 5, 1.2));

    const totalBaseResources = (player.resources.bois || 0) + (player.resources.metal || 0) + (player.resources.tissu || 0);
    rewards.resources = Math.floor(totalBaseResources / 20000);

    rewards.fragments = Math.floor((player.fragments || 0) / 2000);

    rewards.dungeon = Math.floor((gameState.dungeonHighestFloor || 0) / 5);

    // NOUVEAU : On ajoute 1 point par boss vaincu
    rewards.bosses = gameState.bossesKilled || 0;

    // MODIFIÉ : On ajoute les points des boss au total
    rewards.total = rewards.level + rewards.resources + rewards.fragments + rewards.dungeon + rewards.bosses;

    const ascensionBonusPercent = getConstellationBonus('stat_percent', 'ascension_pc_gain_percent');

    if (ascensionBonusPercent > 0) {
        const bonusAmount = Math.floor(rewards.total * (ascensionBonusPercent / 100));
        console.log(t('dev.logs.ascension_bonus', { bonusAmount: bonusAmount, bonusPercent: ascensionBonusPercent }));
        rewards.total += bonusAmount;
    }

    return rewards;
}

/**
 * Calcule le multiplicateur de difficulté basé sur le niveau d'Ascension.
 * @returns {number} Le multiplicateur à appliquer aux stats des ennemis.
 */
function getAscensionDifficultyMultiplier(ascensionLevel = gameState.ascensionLevel) {
    const limite = 4.0; 
    const rapiditeCourbe = 72;
    const pointDepartCourbe = 24;

    const multiplicateur = limite - (rapiditeCourbe / (ascensionLevel + pointDepartCourbe));

    return parseFloat(multiplicateur.toFixed(3));
}

async function ascendPlayer() {
    const playerClass = gameState.player.class; 

    const rewards = calculateAscensionRewards();

    const ascensionShardsToKeep = gameState.player.resources.eclats_ascension || 0;

    const forgeLevelToKeep = gameState.forgeLevel || 0;
    const enchanterLevelToKeep = gameState.enchanterLevel || 0;

    // MON COMMENTAIRE : On sauvegarde ici l'intégralité de l'objet stats,
    // incluant les succès et toutes les statistiques de jeu.
    const statsToKeep = gameState.stats;

    const dataToKeep = {
        name: gameState.player.name,
        killCount: gameState.player.killCount,
        achievementBonuses: gameState.player.achievementBonuses,
        collectedCards: gameState.player.collectedCards || [],
        userId: gameState.player.userId
    };
    
    const constellationsToKeep = gameState.constellations || {};
    const fiefToKeep = gameState.fief;
    const adventureToKeep = gameState.adventure;
    const featuresToKeep = gameState.unlockedFeatures;
    featuresToKeep.ascension_available = false;
    const newAscensionLevel = (gameState.ascensionLevel || 0) + 1;
    checkSucces('ASCEND', { ascensionLevel: newAscensionLevel });

    const totalNewPoints = rewards.total;
    const generalPoints = Math.floor(totalNewPoints * (2/3));
    const classPoints = totalNewPoints - generalPoints;
    
    let newGameState = JSON.parse(JSON.stringify(initialGameState));

    newGameState.forgeLevel = forgeLevelToKeep;
    newGameState.enchanterLevel = enchanterLevelToKeep;

    // MON COMMENTAIRE : On restaure l'objet stats complet.
    newGameState.stats = statsToKeep;
    // On s'assure que dungeonHighestFloor est bien reporté au plus haut niveau.
    newGameState.dungeonHighestFloor = statsToKeep.dungeonHighestFloor || 0;


    newGameState.constellationPoints.general = (gameState.constellationPoints.general || 0) + generalPoints;
    
    newGameState.constellationPoints.guerrier = gameState.constellationPoints.guerrier || 0;
    newGameState.constellationPoints.archer = gameState.constellationPoints.archer || 0;
    newGameState.constellationPoints.mage = gameState.constellationPoints.mage || 0;
    
    const currentClassKey = playerClass.toLowerCase();
    newGameState.constellationPoints[currentClassKey] = (newGameState.constellationPoints[currentClassKey] || 0) + classPoints;
    
    newGameState.ascensionLevel = newAscensionLevel;
    newGameState.isPostAscension = true;
    
    newGameState.constellations = constellationsToKeep;
    newGameState.fief = fiefToKeep;
    newGameState.adventure = adventureToKeep;
    newGameState.unlockedFeatures = featuresToKeep;

    for (const buildingId in newGameState.fief.production) {
        if (newGameState.fief.production[buildingId]) {
            newGameState.fief.production[buildingId].stock = 0;
        }
    }
    newGameState.fief.garden = JSON.parse(JSON.stringify(initialGameState.fief.garden));
    
    const initialResources = {};
    Object.keys(SPRITE_PATHS).forEach(key => { initialResources[key] = 0; });
    initialResources.bois = 10;
    initialResources.bounty_tokens = 2;
    initialResources.cle_de_la_breche = 3;

    initialResources.eclats_ascension = ascensionShardsToKeep;

    newGameState.player = {
        ...newGameState.player,
        uid: generateUID(),
        name: dataToKeep.name,
        class: null,
        energy: 200,
        maxEnergy: 200,
        lastEnergyRegenTime: Date.now(),
        maxResources: 10000,
        mana: 0,
        maxMana: 0, 
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        pointsToSpend: 10,
        killCount: dataToKeep.killCount,
        achievementBonuses: dataToKeep.achievementBonuses,
        collectedCards: dataToKeep.collectedCards,
        userId: dataToKeep.userId,
        equipment: {},
        inventory: [],
        consumables: {},
        baseStats: { ...initialGameState.baseStats },
        resources: initialResources,
        traits: [],
        combatBuffs: []
    };
    
    for (const slot of EQUIPMENT_SLOTS) {
        newGameState.player.equipment[slot] = null;
    }
    
    newGameState.lastAscendedClass = playerClass;
    
    gameState = newGameState;
    saveGame();

    await showCustomAlert(t('alerts.ascension.success', { newAscensionLevel: newGameState.ascensionLevel, totalPoints: rewards.total }));
    
    openConstellationUI();
}

async function showAscensionConfirm() {
    const player = gameState.player;
    const rewards = calculateAscensionRewards();
    const newAscensionLevel = (gameState.ascensionLevel || 0) + 1;
    const newMaxLevel = getMaxLevelForAscension(newAscensionLevel);
    
    const newDifficultyMultiplier = getAscensionDifficultyMultiplier(newAscensionLevel);
    const difficultyIncrease = Math.round((newDifficultyMultiplier - 1) * 100);

    const generalPoints = Math.floor(rewards.total * (2/3));
    const classPoints = rewards.total - generalPoints;

    let pcDetailsHtml = `<li>${t('ui.ascension.pc_source_level', { level: player.level, reward: `<strong>${rewards.level}</strong>` })}</li>`;
    if (rewards.resources > 0) {
        pcDetailsHtml += `<li>${t('ui.ascension.pc_source_resources', { reward: `<strong>${rewards.resources}</strong>` })}</li>`;
    }
    if (rewards.fragments > 0) {
        pcDetailsHtml += `<li>${t('ui.ascension.pc_source_fragments', { reward: `<strong>${rewards.fragments}</strong>` })}</li>`;
    }
    if (rewards.dungeon > 0) {
        pcDetailsHtml += `<li>${t('ui.ascension.pc_source_dungeon', { reward: `<strong>${rewards.dungeon}</strong>` })}</li>`;
    }
    // NOUVEAU : On ajoute l'affichage des points de boss s'il y en a
    if (rewards.bosses > 0) {
        pcDetailsHtml += `<li>${t('ui.ascension.pc_source_bosses', { reward: `<strong>${rewards.bosses}</strong>` })}</li>`;
    }

    const confirmationMessage = `
        <h3>${t('ui.ascension.confirm_title')}</h3>
        <p>${t('ui.ascension.irreversible_warning')}</p>
        <hr class="ascension-separator">

        <div class="ascension-confirm-section gain">
            <h4 class="ascension-section-title">${t('ui.ascension.gains_title')}</h4>
            <ul>
                <li>${t('ui.ascension.gain_level', { newAscensionLevel: `<strong>${newAscensionLevel}</strong>` })}</li>
                <li>${t('ui.ascension.gain_cap', { newMaxLevel: `<strong>${newMaxLevel}</strong>` })}</li>
                <li>${t('ui.ascension.gain_bonus')}</li>
                <li>${t('ui.ascension.gain_difficulty', { difficultyIncrease: `<strong>+${difficultyIncrease}%</strong>` })}</li>
            </ul>
            <h4 class="ascension-section-title" style="margin-top:15px; border-top: 1px solid #28a745; padding-top:10px;">${t('ui.ascension.pc_distribution_title')}</h4>
            <ul>
                ${pcDetailsHtml}
                <hr style="border-color: rgba(255,255,255,0.1); margin: 5px 0;">
                <li>${t('ui.ascension.pc_total', { total: `<strong>${rewards.total} PC</strong>` })}</li>
                <hr style="border-color: rgba(255,255,255,0.2); margin: 10px 0;">
                <li>${t('ui.ascension.pc_destiny', { points: `<strong>${generalPoints} PC</strong>` })}</li>
                <li>${t('ui.ascension.pc_vocation', { playerClass: player.class, points: `<strong>${classPoints} PC</strong>` })}</li>
            </ul>
        </div>
        
        <div class="ascension-confirm-section lose">
            <h4 class="ascension-section-title">${t('ui.ascension.losses_title')}</h4>
            <ul>
                <li>${t('ui.ascension.loss_level')}</li>
                <li>${t('ui.ascension.loss_xp_stats')}</li>
                <li>${t('ui.ascension.loss_inventory')}</li>
            </ul>
        </div>

        <div class="ascension-confirm-section keep">
            <h4 class="ascension-section-title">${t('ui.ascension.keeps_title')}</h4>
            <ul>
                <li>${t('ui.ascension.keep_adventure')}</li>
                <li>${t('ui.ascension.keep_fiefs')}</li>
                <li>${t('ui.ascension.keep_codex')}</li>
                <li>${t('ui.ascension.keep_constellations')}</li>
                <li>${t('ui.ascension.keep_destin')}</li>
            </ul>
        </div>
    `;

    const confirmed = await showCustomConfirm(confirmationMessage, t('ui.buttons.ascend'), t('ui.buttons.cancel'));
    if (confirmed) {
        ascendPlayer();
    }
}

// =================================================================================
// NOUVELLES FONCTIONS : GESTION DE L'INTERFACE DES CONSTELLATIONS
// =================================================================================

function initConstellationPanning() {
    const viewport = document.getElementById('constellation-viewport');
    const grid = document.getElementById('constellation-grid');
    if (!viewport || !grid || viewport.dataset.panningInitialized) return;

    // MON COMMENTAIRE : Variables pour gérer le pinch-to-zoom
    let pointers = []; // Stocke les points de contact actifs (doigts)
    let prevDist = -1;  // Stocke la distance précédente entre deux doigts

    let isPanning = false;
    let hasMoved = false;
    let panStart = { x: 0, y: 0 };
    let gridStart = { x: 0, y: 0 };
    let clickedNode = null;
    let scale = 1.0;

    const updateTransform = () => {
        const currentTransform = new DOMMatrix(getComputedStyle(grid).transform);
        let currentX = currentTransform.m41;
        let currentY = currentTransform.m42;
        
        const margin = 100;
        const minX = viewport.clientWidth - (grid.clientWidth * scale) - margin;
        const minY = viewport.clientHeight - (grid.clientHeight * scale) - margin;
        const maxX = margin;
        const maxY = margin;

        currentX = Math.max(minX, Math.min(currentX, maxX));
        currentY = Math.max(minY, Math.min(currentY, maxY));

        grid.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
    };
    
    const onPointerDown = (e) => {
        if (e.target.closest('button')) return; // Ignore les clics sur les boutons
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        
        // MON COMMENTAIRE : Ajout du pointeur à la liste des pointeurs actifs
        pointers.push(e);

        clickedNode = e.target.closest('.constellation-node');
        hasMoved = false;
        isPanning = true;
        panStart = { x: e.clientX, y: e.clientY };
        const transform = new DOMMatrix(getComputedStyle(grid).transform);
        gridStart = { x: transform.m41, y: transform.m42 };
        grid.style.transition = 'none';
        viewport.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!isPanning) return;
        
        // On met à jour la position du pointeur qui bouge
        const index = pointers.findIndex(p => p.pointerId === e.pointerId);
        if (index > -1) {
            pointers[index] = e;
        }

        // MON COMMENTAIRE : Gestion du zoom si on a deux doigts sur l'écran
        if (pointers.length === 2) {
            clickedNode = null; // Si on zoome, on annule l'action de clic
            hasMoved = true;
            const p1 = pointers[0];
            const p2 = pointers[1];

            const currDist = Math.hypot(p1.clientX - p2.clientX, p1.clientY - p2.clientY);

            if (prevDist > 0) {
                const oldScale = scale;
                scale *= currDist / prevDist;
                scale = Math.max(0.4, Math.min(scale, 1.5)); // Limites du zoom

                const rect = viewport.getBoundingClientRect();
                const midX = (p1.clientX + p2.clientX) / 2 - rect.left;
                const midY = (p1.clientY + p2.clientY) / 2 - rect.top;

                const transform = new DOMMatrix(getComputedStyle(grid).transform);
                let currentX = transform.m41;
                let currentY = transform.m42;

                const gridMouseX = (midX - currentX) / oldScale;
                const gridMouseY = (midY - currentY) / oldScale;

                currentX = midX - gridMouseX * scale;
                currentY = midY - gridMouseY * scale;

                grid.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
                updateTransform();
            }
            prevDist = currDist;
        } 
        // MON COMMENTAIRE : Gestion du déplacement (pan) si on a un seul doigt
        else if (pointers.length === 1) {
            const dx = e.clientX - panStart.x;
            const dy = e.clientY - panStart.y;

            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                if (!hasMoved) { clickedNode = null; }
                hasMoved = true;
                viewport.style.cursor = 'grabbing';
            }

            if (hasMoved) {
                e.preventDefault();
                let newX = gridStart.x + dx;
                let newY = gridStart.y + dy;

                const margin = 100;
                const minX = viewport.clientWidth - (grid.clientWidth * scale) - margin;
                const minY = viewport.clientHeight - (grid.clientHeight * scale) - margin;
                const maxX = margin;
                const maxY = margin;

                newX = Math.max(minX, Math.min(newX, maxX));
                newY = Math.max(minY, Math.min(newY, maxY));

                grid.style.transform = `translate(${newX}px, ${newY}px) scale(${scale})`;
            }
        }
    };

    const onPointerUp = (e) => {
        // MON COMMENTAIRE : Nettoyage des pointeurs à la fin du contact
        pointers = pointers.filter(p => p.pointerId !== e.pointerId);
        if (pointers.length < 2) {
            prevDist = -1; // On réinitialise le suivi de distance du zoom
        }
        if (pointers.length === 0) {
            isPanning = false;
        }

        viewport.style.cursor = 'grab';
        
        if (!hasMoved && clickedNode) {
            const treeKey = currentConstellationTree;
            const nodeId = clickedNode.id.replace('node-', '');
            displayTalentInfo(treeKey, nodeId);
        }
        
        viewport.releasePointerCapture(e.pointerId);
    };
    
    const onWheel = (e) => {
        e.preventDefault();
        const rect = viewport.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const transform = new DOMMatrix(getComputedStyle(grid).transform);
        let currentX = transform.m41;
        let currentY = transform.m42;
        
        const pointX = (mouseX - currentX) / scale;
        const pointY = (mouseY - currentY) / scale;

        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newScale = Math.max(0.4, Math.min(scale + delta, 1.5));

        currentX = mouseX - pointX * newScale;
        currentY = mouseY - pointY * newScale;

        scale = newScale;
        grid.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
        updateTransform();
    };

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    // MON COMMENTAIRE : On ajoute la gestion de l'annulation du contact (ex: si le navigateur prend le contrôle)
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('wheel', onWheel, { passive: false });
    
    viewport.dataset.panningInitialized = 'true';
}

function setupConstellationSwitcher() {
    const switcher = document.getElementById('constellation-switcher');
    if (switcher) {
        switcher.addEventListener('click', (event) => {
            const button = event.target.closest('.constellation-switch-btn');
            if (button && !button.disabled) {
                const treeKey = button.dataset.tree;
                switchConstellationTree(treeKey);
            }
        });
    }
}

let currentConstellationTree = 'destiny';

// REMPLACE entièrement ta fonction openConstellationUI par celle-ci
function openConstellationUI() {
    const modal = document.getElementById('constellation-modal');
    document.getElementById('game-screen').style.display = 'none';
    modal.classList.remove('hidden');
    
    // On passe à la nouvelle fonction pour gérer le changement d'arbre
    switchConstellationTree('destiny'); 
    
    initConstellationPanning();
    // On centre la vue après un court délai pour être sûr que tout est dessiné
    setTimeout(() => centerConstellationViewOnNode('destiny_start'), 50);
}

function switchConstellationTree(treeKey) {
    currentConstellationTree = treeKey;
    
    document.querySelectorAll('.constellation-switch-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tree === treeKey);
    });

    const pcCountSpan = document.getElementById('pc-count');
    let pointsToShow = 0;
    const classKey = treeKey.toLowerCase();
    
    // MON COMMENTAIRE : La logique ici est simplifiée.
    // Elle ne vérifie plus `isPostAscension` ou `pendingClassPoints`.
    // Elle regarde simplement combien de points sont dans le portefeuille demandé.
    if (classKey === 'destiny') {
        pointsToShow = gameState.constellationPoints.general || 0;
    } else {
        pointsToShow = gameState.constellationPoints[classKey] || 0;
    }
    
    pcCountSpan.textContent = pointsToShow;

    renderConstellationTree(treeKey);
    displayTalentInfo(treeKey, `${treeKey}_start`);
    setTimeout(() => centerConstellationViewOnNode(`${treeKey}_start`), 50);
}

/**
 * Ferme la fenêtre modale des constellations.
 */
async function closeConstellationUI() {
    const treesWithPoints = [];
    const player = gameState.player;

    // MON COMMENTAIRE : On utilise notre nouvelle fonction pour vérifier s'il y a des points UTILES dans l'arbre Destin.
    if (canAffordAnyUnlockableNode('destiny')) {
        treesWithPoints.push({ 
            name: t('ui.modals.constellation_trees.destiny'), 
            amount: gameState.constellationPoints.general 
        });
    }

    // MON COMMENTAIRE : On fait de même pour l'arbre de classe.
    if (player && player.class) {
        const classKey = player.class.toLowerCase();
        if (canAffordAnyUnlockableNode(classKey)) {
            treesWithPoints.push({ 
                name: t(`ui.modals.constellation_trees.${classKey}`), 
                amount: gameState.constellationPoints[classKey] 
            });
        }
    }

    if (treesWithPoints.length > 0) {
        const treeStrings = treesWithPoints.map(t => `${t.name} (${t.amount} PC)`);
        // MON COMMENTAIRE : Le message est maintenant géré par le système de traduction.
        const message = t('alerts.constellation.unspent_points_confirm', { trees: treeStrings.join(', ') });

        // MON COMMENTAIRE : Les textes des boutons sont également traduits.
        const confirmed = await showCustomConfirm(message, t('ui.buttons.leave'), t('ui.buttons.stay'));
        if (!confirmed) {
            return;
        }
    }

    document.getElementById('constellation-modal').classList.add('hidden');

    if (gameState.isPostAscension) {
        showAscensionClassChoice();
    } else {
        document.getElementById('game-screen').style.display = 'block';
    }
}

function canAffordAnyUnlockableNode(treeKey) {
    const treeData = CONSTELLATIONS_DB[treeKey];
    if (!treeData) return false;

    const unlockedNodes = gameState.constellations[treeKey] || {};
    const pointPoolKey = treeKey === 'destiny' ? 'general' : treeKey;
    const availablePoints = gameState.constellationPoints[pointPoolKey] || 0;

    if (availablePoints === 0) return false;

    for (const nodeId in treeData.nodes) {
        const node = treeData.nodes[nodeId];
        const currentLevel = unlockedNodes[nodeId] || 0;

        // Condition 1: La node n'est pas déjà au niveau maximum.
        if (currentLevel >= node.maxLevel) {
            continue;
        }

        // Condition 2: Les dépendances sont satisfaites.
        const dependenciesMet = node.dependencies.every(depId => 
            depId === `${treeKey}_start` || (unlockedNodes[depId] || 0) > 0
        );

        if (!dependenciesMet) {
            continue;
        }

        // Condition 3: Le joueur a assez de points pour le prochain niveau.
        const cost = node.cost[currentLevel];
        if (availablePoints >= cost) {
            // Si les 3 conditions sont réunies, on a trouvé une node achetable.
            return true;
        }
    }

    // Si on a parcouru toutes les nodes sans en trouver une d'achetable, on retourne false.
    return false;
}

function renderConstellationTree(treeKey) {
    const grid = document.getElementById('constellation-grid');
    const treeData = CONSTELLATIONS_DB[treeKey];
    if (!grid || !treeData) return;

    grid.innerHTML = '';
    const unlockedNodes = gameState.constellations[treeKey] || {};

    for (const nodeId in treeData.nodes) {
        const node = treeData.nodes[nodeId];
        const nodeDiv = document.createElement('div');
        nodeDiv.className = `constellation-node ${node.type || ''}`;
        nodeDiv.id = `node-${nodeId}`;
        nodeDiv.style.left = `${node.position.x}%`;
        nodeDiv.style.top = `${node.position.y}%`;
        
        const currentLevel = unlockedNodes[nodeId] || 0;
        const isMaxed = currentLevel >= node.maxLevel;
        const isUnlocked = currentLevel > 0;
        const dependenciesMet = node.dependencies.every(depId => 
            depId === `${treeKey}_start` || (unlockedNodes[depId] || 0) > 0
        );
        
        nodeDiv.innerHTML = (isUnlocked || dependenciesMet) ? node.icon : '❓';
        
        if (isMaxed) {
            nodeDiv.classList.add('maxed');
        } else if (isUnlocked) {
            nodeDiv.classList.add('unlocked');
        } else if (dependenciesMet) {
            nodeDiv.classList.add('unlockable');
        } else {
            nodeDiv.classList.add('locked');
        }
        
        // === LA CORRECTION EST ICI : On place l'indicateur à la fin ===
        // Le compteur de niveau est ajouté après le nœud principal pour qu'il ne soit pas à l'intérieur
        if (isUnlocked) {
            const levelIndicator = document.createElement('span');
            levelIndicator.className = 'level-indicator';
            // Simplification : n'affiche plus "X/Y" mais juste le niveau actuel
            levelIndicator.textContent = `${currentLevel}`; 
            nodeDiv.appendChild(levelIndicator);
        }
        // ===============================================================
        
        grid.appendChild(nodeDiv);
    }
    drawConnectionLines(treeKey);
}

/**
 * Dessine les lignes entre les talents connectés.
 * @param {string} treeKey - La clé de la constellation.
 */
function drawConnectionLines(treeKey) {
    const grid = document.getElementById('constellation-grid');
    const treeData = CONSTELLATIONS_DB[treeKey].nodes;
    const unlockedNodes = gameState.constellations[treeKey] || {}; // On récupère les talents débloqués

    for (const nodeId in treeData) {
        const node = treeData[nodeId];
        if (node.dependencies && node.dependencies.length > 0) {
            node.dependencies.forEach(depId => {
                const parentElement = document.getElementById(`node-${depId}`);
                const childElement = document.getElementById(`node-${nodeId}`);
                
                if (parentElement && childElement) {
                    const x1 = parentElement.offsetLeft + parentElement.offsetWidth / 2;
                    const y1 = parentElement.offsetTop + parentElement.offsetHeight / 2;
                    const x2 = childElement.offsetLeft + childElement.offsetWidth / 2;
                    const y2 = childElement.offsetTop + childElement.offsetHeight / 2;

                    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

                    const line = document.createElement('div');
                    line.className = 'connection-line';
                    
                    // === LA CORRECTION EST ICI : On vérifie si l'ENFANT est débloqué ===
                    if ((unlockedNodes[nodeId] || 0) > 0) {
                        line.classList.add('unlocked');
                    }
                    // =================================================================
                    
                    line.style.width = `${length}px`;
                    line.style.left = `${x1}px`;
                    line.style.top = `${y1}px`;
                    line.style.transform = `rotate(${angle}deg)`;
                    
                    grid.appendChild(line);
                }
            });
        }
    }
}

/**
 * Tente de débloquer un talent (appelé depuis le bouton du panneau d'info).
 */
function attemptUnlockTalent(treeKey, nodeId) {
    const node = CONSTELLATIONS_DB[treeKey]?.nodes[nodeId];
    if (!node) return;

    gameState.constellations[treeKey] = gameState.constellations[treeKey] || {};
    const currentLevel = gameState.constellations[treeKey][nodeId] || 0;

    if (currentLevel >= node.maxLevel) {
        showToast(t('alerts.constellation.max_level'), "error");
        return;
    }

    const cost = node.cost[currentLevel];

    // MON COMMENTAIRE : Début de la correction.
    // La logique pour trouver le bon portefeuille de points est grandement simplifiée.
    // Il n'y a plus besoin de vérifier si on est en post-ascension ou non.
    const pointPool = gameState.constellationPoints;
    const pointPoolKey = treeKey === 'destiny' ? 'general' : treeKey;
    // FIN de la correction.

    const currentPoints = pointPool[pointPoolKey] || 0;

    if (currentPoints < cost) {
        showToast(t('alerts.constellation.not_enough_pc'), "error");
        return;
    }
    
    const dependenciesMet = node.dependencies.every(depId => 
        depId === `${treeKey}_start` || (gameState.constellations[treeKey]?.[depId] || 0) > 0
    );

    if (!dependenciesMet) {
        showToast(t('alerts.constellation.dependency_not_met'), "error");
        return;
    }
    
    // On déduit les points du bon portefeuille (maintenant toujours correct).
    pointPool[pointPoolKey] -= cost;
    
    gameState.constellations[treeKey][nodeId] = currentLevel + 1;
    
    showToast(t('alerts.constellation.unlock_success', { talentName: t(node.nameKey), level: currentLevel + 1 }), "success");
    
    recalculateTotalStats();
    
    switchConstellationTree(treeKey);
    displayTalentInfo(treeKey, nodeId);
    checkSucces('UNLOCK_TALENT');
    saveGame();
}

/**
 * Détermine la rareté la plus élevée que le joueur peut trouver et équiper.
 * @returns {string} La clé de la rareté (ex: 'rare', 'epic').
 */
function getHighestAllowedRarity() {
    if (!gameState.constellations || !gameState.constellations.destiny) {
        return 'rare';
    }
    const unlocked = gameState.constellations.destiny;
    
    // ▼▼▼ DÉBUT DE LA CORRECTION ▼▼▼
    // On vérifie du plus haut au plus bas
    if ((unlocked['destiny_mythic_knowledge'] || 0) > 0) return 'mythic';
    if ((unlocked['destiny_legendary_knowledge'] || 0) > 0) return 'legendary';
    if ((unlocked['destiny_epic_knowledge'] || 0) > 0) return 'epic';
    // ▲▲▲ FIN DE LA CORRECTION ▲▲▲
    
    return 'rare'; // Rareté de base si aucun talent n'est débloqué
}

function displayTalentInfo(treeKey, nodeId) {
    const infobox = document.getElementById('infobox-content');
    const nodeData = CONSTELLATIONS_DB[treeKey]?.nodes[nodeId];
    if (!infobox || !nodeData) return;

    document.querySelectorAll('.constellation-node').forEach(n => n.classList.remove('selected'));
    const nodeElement = document.getElementById(`node-${nodeId}`);
    if (nodeElement) nodeElement.classList.add('selected');

    const unlockedNodes = gameState.constellations[treeKey] || {};
    const currentLevel = unlockedNodes[nodeId] || 0;
    const isMaxed = currentLevel >= nodeData.maxLevel;
    
    const dependenciesMet = nodeData.dependencies.every(depId => 
        depId === `${treeKey}_start` || (unlockedNodes[depId] || 0) > 0
    );

    if (!dependenciesMet && currentLevel === 0) {
        infobox.innerHTML = `<h3>${t('ui.constellation.hidden_talent_title')}</h3><p>${t('ui.constellation.hidden_talent_desc')}</p>`;
        return;
    }
    
    const talentName = t(nodeData.nameKey);
    const talentDescription = t(nodeData.descriptionKey);

    let bonusProgressionHtml = '';
    if (nodeData.bonus && Array.isArray(nodeData.bonus.value)) {
        let bonusStatName = t('ui.constellation.bonus_label');
        if (nodeData.bonus.type.includes('_all')) {
            bonusStatName = t('stats.displayNames.stat_flat_all') || "Tous les attributs";
        } else if (nodeData.bonus.stat) {
            bonusStatName = t(`stats.displayNames.${nodeData.bonus.stat}`) || nodeData.bonus.stat;
        }

        const bonusValues = nodeData.bonus.value;
        const isPercent = nodeData.bonus.type.includes('percent');

        let progressionList = bonusValues.map((val, index) => {
            const level = index + 1;
            const suffix = isPercent ? '%' : '';
            const sign = val > 0 ? '+' : '';
            const className = (level <= currentLevel) ? 'unlocked-bonus' : 'locked-bonus';
            return `<span class="${className}">${sign}${val}${suffix}</span>`;
        }).join(' / ');
        
        bonusProgressionHtml = `<div class="bonus-progression-list"><strong>${bonusStatName}:</strong> ${progressionList}</div>`;
    }

    let html = `<h3>${talentName} ${currentLevel > 0 ? t('ui.constellation.level_indicator', { currentLevel: currentLevel, maxLevel: nodeData.maxLevel }) : ''}</h3>`;
    html += `<p>${talentDescription}</p>`;
    html += bonusProgressionHtml; 
    html += `<hr class="infobox-separator">`;

    if (isMaxed) {
        html += `<p class="infobox-cost">${t('ui.constellation.max_level_reached')}</p>`;
        html += `<button id="unlock-talent-button" class="action-button" disabled>${t('ui.buttons.maxed_out')}</button>`;
    } else {
        const cost = nodeData.cost[currentLevel];
        const pointPoolKey = treeKey === 'destiny' ? 'general' : treeKey;
        const currentPoints = gameState.constellationPoints[pointPoolKey] || 0;
        const canAfford = currentPoints >= cost;
        
        html += `<p class="infobox-cost">${t('ui.constellation.upgrade_cost', { nextLevel: currentLevel + 1, cost: cost })}</p>`;
        html += `<button id="unlock-talent-button" class="action-button" onclick="attemptUnlockTalent('${treeKey}', '${nodeId}')" ${!canAfford || !dependenciesMet ? 'disabled' : ''}>
                    ${canAfford ? t('ui.buttons.upgrade') : t('ui.buttons.not_enough_pc')}
                 </button>`;
    }
    infobox.innerHTML = html;
}

function showAscensionClassChoice() {
    const modal = document.getElementById('class-choice-modal');
    const container = document.getElementById('modal-class-selection-container');
    const title = modal.querySelector('h2');
    const text = modal.querySelector('p');
    const checkbox = modal.querySelector('.stat-reset-option');
    const confirmButton = document.getElementById('finalize-class-choice-button');

    if (!container.dataset.listenerAttached) {
        container.addEventListener('click', (event) => {
            const button = event.target.closest('.class-choice');
            if (button) {
                container.querySelectorAll('.class-choice').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            }
        });
        container.dataset.listenerAttached = 'true';
    }

    title.textContent = t('ui.ascension.class_choice_title');
    text.innerHTML = t('ui.ascension.class_choice_desc');
    checkbox.style.display = 'none';

    confirmButton.textContent = t('ui.buttons.confirm_path');
    confirmButton.onclick = finalizeAscensionSetup;

    modal.classList.remove('hidden');
}

function finalizeAscensionSetup() {
    const selectedClassEl = document.querySelector('#modal-class-selection-container .class-choice.selected');
    if (!selectedClassEl) {
        showCustomAlert(t('alerts.class.select_a_class'));
        return;
    }

    const chosenClass = selectedClassEl.dataset.class;
    const classKey = chosenClass.toLowerCase();
    gameState.player.class = chosenClass;

    // MON COMMENTAIRE : Le bloc qui transférait `pendingClassPoints` a été entièrement supprimé ici.

    gameState.constellations[classKey] = gameState.constellations[classKey] || {};
    gameState.constellations[classKey][`${classKey}_start`] = 1;
    
    if (gameState.lastAscendedClass) {
        delete gameState.lastAscendedClass;
    }
    gameState.player.baseStats = { ...initialGameState.baseStats };
    gameState.player.pointsToSpend = 10;
    gameState.isPostAscension = false;

    recalculateTotalStats();
    gameState.playerCurrentHP = gameState.player.currentMaxHP;
    gameState.playerCurrentMana = gameState.player.maxMana;

    saveGame();
    updateGameUI();
    document.getElementById('class-choice-modal').classList.add('hidden');
    showToast(t('alerts.ascension.reincarnation_success', { className: t(`ui.classes.${chosenClass}`) }), "success");

    generateExpeditions();
    generateDailyBounties(true);
    document.getElementById('game-screen').style.display = 'block';
}

function centerConstellationViewOnNode(nodeId) {
    const viewport = document.getElementById('constellation-viewport');
    const grid = document.getElementById('constellation-grid');
    const nodeElement = document.getElementById(`node-${nodeId}`);
    if (!viewport || !grid || !nodeElement) return;

    const scale = parseFloat(grid.style.transform.split('scale(')[1]) || 1.0;

    const nodeCenterX = nodeElement.offsetLeft + (nodeElement.offsetWidth / 2);
    const nodeCenterY = nodeElement.offsetTop + (nodeElement.offsetHeight / 2);

    const viewportCenterX = viewport.offsetWidth / 2;
    const viewportCenterY = viewport.offsetHeight / 2;

    let targetX = viewportCenterX - (nodeCenterX * scale);
    let targetY = viewportCenterY - (nodeCenterY * scale);

    // On s'assure de ne pas sortir des limites
    const minX = viewport.clientWidth - (grid.clientWidth * scale);
    const minY = viewport.clientHeight - (grid.clientHeight * scale);
    targetX = Math.max(minX, Math.min(targetX, 0));
    targetY = Math.max(minY, Math.min(targetY, 0));

    grid.style.transition = 'transform 0.5s ease-out'; // Ajoute une transition douce
    grid.style.transform = `translate(${targetX}px, ${targetY}px) scale(${scale})`;
}

function generateMysticText(length) {
    const chars = '§±≠¤∑ΩμπøÆÐƔЖЗИѲЧШЩЪ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function hasConstellationTalent(nodeId) {
    if (!gameState.constellations) return false;

    // On cherche dans tous les arbres de constellations possibles
    for (const treeKey in gameState.constellations) {
        if (gameState.constellations[treeKey] && (gameState.constellations[treeKey][nodeId] || 0) > 0) {
            return true;
        }
    }
    return false;
}

// =================================================================================
// SYSTÈME DE TRAITS & CARTES DU DESTIN
// =================================================================================

async function startTraitSelection() {
    let tier;
    const level = gameState.player.level;

    if (level === 500) tier = "tier_max";
    else if (level >= 350) tier = "tier3";
    else if (level >= 200) tier = "tier2";
    else tier = "tier1";

    const availableTraits = getAvailableTraits(tier, 3).map(trait => ({ ...trait, tier: tier }));
    
    gameState.isChoosingTrait = true;
    gameState.traitSelectionOptions = availableTraits;
    gameState.rerollStatus = [true, true, true]; // <-- AJOUT : On réinitialise les rerolls disponibles
    saveGame();
    
    await displayTraitSelectionModal(availableTraits);
}

function getAvailableTraits(tier, count) {
    const traitPool = TRAITS_DB[tier];
    if (!traitPool) return [];

    // MODIFIÉ : On ajoute une condition pour s'assurer que le trait n'est pas déjà dans l'inventaire du joueur pour cette ascension.
    const availablePool = traitPool.filter(trait => !gameState.player.traits.some(t => t.id === trait.id));
    
    const weightedPool = [];
    availablePool.forEach(trait => {
        let weight = 10; 
        if (trait.rarity === 'rare') weight = 3;
        if (trait.rarity === 'mythic') weight = 1;
        for (let i = 0; i < weight; i++) {
            weightedPool.push(trait);
        }
    });

    const shuffled = weightedPool.sort(() => 0.5 - Math.random());
    
    const selection = [];
    const selectionIds = new Set();
    for (const trait of shuffled) {
        if (!selectionIds.has(trait.id)) {
            selection.push(trait);
            selectionIds.add(trait.id);
        }
        if (selection.length >= count) break;
    }

    return selection;
}

function displayTraitSelectionModal(traits, isFirstDisplay = true) {
    return new Promise(resolve => {
        const modal = document.getElementById('trait-selection-modal');
        const container = document.getElementById('trait-cards-container');
        const confirmButton = document.getElementById('confirm-trait-choice');
        const modalTitle = modal.querySelector('h2');
        const modalDesc = modal.querySelector('p');
        let selectedTraitId = null;

        modalTitle.textContent = t('ui.traits.selection_modal_title');
        modalDesc.textContent = t('ui.traits.selection_modal_desc');
        confirmButton.textContent = t('ui.buttons.confirm_choice');

        if (isFirstDisplay) {
            gameState.rerollStatus = [true, true, true];
        }

        container.innerHTML = '';
        confirmButton.disabled = true;

        traits.forEach((trait, index) => {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'trait-card';
            cardWrapper.dataset.traitId = trait.id;

            let glowClass = '';
            if (['rare', 'epic', 'legendary', 'mythic'].includes(trait.rarity)) {
                glowClass = `rarity-glow-${trait.rarity}`;
            }

            const rerollButtonDisabled = !(gameState.rerollStatus[index] || false);
            const tier = trait.tier || 'tier1';
            
            const traitName = t(trait.nameKey);
            const traitDescription = t(trait.descriptionKey);
            const cardName = t(trait.card.nameKey);
            // On s'assure de ne récupérer que le nom de la famille
            const familyName = t(`${trait.card.familyKey}.name`);

            cardWrapper.innerHTML = `
                <div class="trait-card-inner ${glowClass}"> 
                    <div class="trait-card-front">
                        <h3>${traitName}</h3>
                        <div class="trait-icon">${trait.icon}</div>
                        ${formatTraitEffectsToHTML(trait.effects)}
                        <p class="trait-description-small">${traitDescription}</p>
                    </div>
                    <div class="trait-card-back">
                        <img src="${trait.card.image}" alt="${t('ui.traits.missing_image_alt')}" class="trait-card-image">
                        <h4>${cardName}</h4>
                        <p>${t('ui.traits.family_label')} ${familyName}</p>
                    </div>
                </div>
                <div class="trait-card-actions">
                    <button class="trait-reroll-btn" ${rerollButtonDisabled ? 'disabled' : ''}>${t('ui.buttons.reroll')}</button>
                    <button class="trait-flip-btn">${t('ui.buttons.flip')}</button>
                </div>
            `;
            container.appendChild(cardWrapper);

            const cardInner = cardWrapper.querySelector('.trait-card-inner');
            const flipBtn = cardWrapper.querySelector('.trait-flip-btn');
            const rerollBtn = cardWrapper.querySelector('.trait-reroll-btn');

            flipBtn.onclick = (event) => {
                event.stopPropagation();
                cardInner.classList.toggle('is-flipped');
            };

            rerollBtn.onclick = (event) => {
                event.stopPropagation();
                rerollTraitCard(index, tier);
            };

            cardInner.onclick = () => {
                container.querySelectorAll('.trait-card').forEach(c => c.classList.remove('selected'));
                cardWrapper.classList.add('selected');
                selectedTraitId = cardWrapper.dataset.traitId;
                confirmButton.disabled = false;
            };
        });

        modal.classList.remove('hidden');

        confirmButton.onclick = () => {
            if (selectedTraitId) {
                selectTrait(selectedTraitId);
                modal.classList.add('hidden');
                resolve();
            }
        };
    });
}

function selectTrait(traitId) {
    let selectedTrait = null;
    for (const tier in TRAITS_DB) {
        const found = TRAITS_DB[tier].find(t => t.id === traitId);
        if (found) {
            selectedTrait = found;
            break;
        }
    }

    if (selectedTrait) {
        const traitName = t(selectedTrait.nameKey);
        const cardName = t(selectedTrait.card.nameKey);

        gameState.player.traits = gameState.player.traits || [];
        gameState.player.traits.push(selectedTrait);

        gameState.player.collectedCards = gameState.player.collectedCards || [];
        if (!gameState.player.collectedCards.includes(selectedTrait.id)) {
            gameState.player.collectedCards.push(selectedTrait.id);
            showToast(t('alerts.traits.new_card_collected', { cardName: cardName }), 'success');
        }

        applyTraitEffects(selectedTrait);
        showCustomAlert(`<h3>${t('alerts.traits.trait_acquired_title')}</h3><p>${t('alerts.traits.trait_acquired_desc', { traitName: `<strong>${traitName.replace(t('ui.traits.trait_prefix'), "")}</strong>` })}</p><p><em>${t(selectedTrait.descriptionKey)}</em></p>`);
        gameState.isChoosingTrait = false;
        gameState.traitSelectionOptions = null;
        saveGame();
    }
}

function applyTraitEffects(trait) {
    if (!trait.effects) return;

    gameState.player.traitBonuses = gameState.player.traitBonuses || {};
    const bonuses = gameState.player.traitBonuses;

    for (const effect in trait.effects) {
        if (effect === 'passive') {
            // Logique pour les mécaniques uniques à implémenter ici
        } else {
            // Pour les bonus statistiques
            bonuses[effect] = (bonuses[effect] || 0) + trait.effects[effect];
        }
    }
    recalculateTotalStats();
    updateGameUI();
    saveGame();
}

function formatTraitEffectsToHTML(effects) {
    if (!effects || Object.keys(effects).length === 0) return '';
    
    let html = '<div class="trait-effects-list">';
    for (const effect in effects) {
        const value = effects[effect];
        const displayName = t(`stats.displayNames.${effect}`) || effect.replace(/_/g, ' ');
        const suffix = String(effect).includes('_percent') ? '%' : '';
        const sign = value > 0 ? '+' : '';
        const colorClass = value > 0 ? 'positive-effect' : 'negative-effect';
        
        html += `<div class="trait-effect ${colorClass}">${displayName}: ${sign}${value}${suffix}</div>`;
    }
    html += '</div>';
    return html;
}

function isFamilyComplete(familyKey) {
    const familyData = CARD_FAMILIES_DB[familyKey];
    if (!familyData) return false;

    const collectedCardNames = (gameState.player.collectedCards || []).map(traitId => {
        for (const tier in TRAITS_DB) {
            const found = TRAITS_DB[tier].find(t => t.id === traitId);
            if (found) return found.card.name;
        }
        return null;
    }).filter(Boolean);

    return familyData.cards.every(cardName => collectedCardNames.includes(cardName));
}

/**
 * Vérifie si le joueur possède actuellement un trait actif.
 * @param {string} traitId - L'ID du trait à vérifier (ex: "TMAX_ECHO_ETERNITE").
 * @returns {boolean} - Vrai si le trait est actif, sinon faux.
 */
function hasTrait(traitId) {
    if (!gameState.player || !gameState.player.traits) return false;
    return gameState.player.traits.some(trait => trait.id === traitId);
}

window.rerollTraitCard = function(cardIndex, tier) {
    const player = gameState.player;
    const rerollCost = { tier1: 25, tier2: 75, tier3: 200, tier_max: 500 };
    const cost = rerollCost[tier] || 25;

    if ((player.fragments || 0) < cost) {
        showToast(t('alerts.reroll.not_enough_fragments', { cost: cost }), "error");
        return;
    }
    
    const currentTraitOptions = gameState.traitSelectionOptions;
    const currentTraitIds = currentTraitOptions.map(t => t.id);
    const newTraitPool = TRAITS_DB[tier].filter(trait => !currentTraitIds.includes(trait.id));
    
    if (newTraitPool.length === 0) {
        showToast(t('alerts.reroll.no_traits_left'), "system-message");
        return;
    }

    player.fragments -= cost;
    const newTrait = newTraitPool[Math.floor(Math.random() * newTraitPool.length)];
    
    currentTraitOptions[cardIndex] = newTrait;
    
    gameState.rerollStatus[cardIndex] = false;
    
    displayTraitSelectionModal(currentTraitOptions, false);
    updateGameUI();
    saveGame();
}

// =================================================================================
// GESTION DU FIEF (v2.1 - Initialisation Corrigée)
// =================================================================================

function showCharacterCreationScreen() {
    // On ajoute la classe au body pour appliquer les styles spécifiques
    document.body.classList.add('creation-mode');

    document.getElementById('main-container').style.display = 'block';
    document.getElementById('character-creation').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    
    // On s'assure que l'écran du fief est bien caché au cas où
    const fiefScreen = document.getElementById('fief-screen');
    if (fiefScreen) {
        fiefScreen.classList.add('hidden');
    }
    
    // MON COMMENTAIRE : On appelle la fonction d'initialisation ici pour garantir
    // que les textes (y compris celui du bouton "Créer") sont toujours chargés.
    initializeCharacterCreationUI();
}

window.showGameScreen = function() {
    if (fiefUpdateInterval) clearInterval(fiefUpdateInterval);

    document.getElementById('fief-screen').classList.add('hidden');
    document.getElementById('main-container').style.display = 'block';
    updateGameUI();
}

// =================================================================================
// GESTION DU FIEF (v2.2 - Logique de Production et d'Affichage Corrigée)
// =================================================================================

/**
 * Gère la navigation pour afficher l'écran du Fief.
 */
window.showFiefScreen = function() {
    // On s'assure que le sous-menu du fief est bien visible
    updateSubNavVisibility('fief'); 

    if (!gameState.fief) {
        gameState.fief = JSON.parse(JSON.stringify(initialGameState.fief));
    }
    displayFiefUI();
    updateGardenGrid();
    updateGardenUI();
    switchFiefTab('buildings');
    if (fiefUpdateInterval) clearInterval(fiefUpdateInterval);
    fiefUpdateInterval = setInterval(updateFiefTimers, 1000);
}

function checkFiefNotifications() {
    if (!gameState.fief || !gameState.unlockedFeatures.fief) {
        return; // Pas de fief, pas de notif
    }

    let shouldBlink = false;

    // Condition 1 : Vérifier si une plante est prête à être récoltée
    if (gameState.fief.garden && gameState.fief.garden.plots) {
        for (const plot of gameState.fief.garden.plots) {
            if (plot.plant_id) {
                const plantData = GARDEN_PLANTS_DB[plot.plant_id];
                // On ne notifie que pour les plantes récoltables (pas les plantes de soutien)
                if (plantData && !plantData.is_support) {
                    const growthDurationMs = getPlantGrowthDuration(plantData, gameState.fief.garden.plots.indexOf(plot));
                    if (Date.now() >= plot.plant_start_time + growthDurationMs) {
                        shouldBlink = true;
                        break; // Une seule plante suffit, on arrête de chercher
                    }
                }
            }
        }
    }

    // Condition 2 : Vérifier si un bâtiment de production est plein
    if (!shouldBlink) { // On ne vérifie que si on n'a pas déjà trouvé une raison de clignoter
        const productionBuildings = ['scierie', 'mine', 'atelier_tissage', 'tresorerie'];
        for (const buildingId of productionBuildings) {
            const currentLevel = gameState.fief.buildings[buildingId] || 0;
            if (currentLevel > 0) {
                const buildingData = FIEF_DB[buildingId];
                const productionPerHour = buildingData.upgrades[currentLevel - 1].production;
                const maxStock = productionPerHour * 8; // La limite de 8h
                const currentStock = gameState.fief.production[buildingId]?.stock || 0;

                if (currentStock >= maxStock) {
                    shouldBlink = true;
                    break; // Un seul bâtiment plein suffit
                }
            }
        }
    }

    // Appliquer ou retirer la classe CSS
    const fiefButton = document.getElementById('fief-main-button');
    if (fiefButton) {
        if (shouldBlink) {
            fiefButton.classList.add('fief-notification');
        } else {
            fiefButton.classList.remove('fief-notification');
        }
    }
}

/**
 * Gère la navigation pour retourner à l'écran de jeu principal.
 */
window.showGameScreen = function() {
    // On arrête la boucle de rafraîchissement du Fief en quittant
    if (fiefUpdateInterval) clearInterval(fiefUpdateInterval);

    document.getElementById('fief-screen').classList.add('hidden');
    document.getElementById('main-container').style.display = 'block';
    updateGameUI();
}

/**
 * Met à jour la visibilité du bouton d'accès au Fief.
 */
function updateMainActionButtons() {
    const container = document.getElementById('main-action-buttons');
    const ascensionButton = document.getElementById('ascension-main-button');

    // La visibilité du conteneur ne dépend plus que du bouton d'Ascension.
    const features = gameState.unlockedFeatures || {};
    const isAscensionAvailable = features.ascension_available && gameState.player.level >= 100;

    ascensionButton.classList.toggle('hidden', !isAscensionAvailable);

    if (isAscensionAvailable) {
        container.classList.remove('hidden');
        ascensionButton.disabled = false;
        ascensionButton.onclick = () => showAscensionConfirm();
    } else {
        container.classList.add('hidden');
    }
}

/**
 * Calcule la production hors-ligne et la met à jour dans l'état.
 */
function updateFiefProduction() {
    if (!gameState.fief || !gameState.fief.production) return;
    const now = Date.now();

    for (const buildingId in gameState.fief.production) {
        // NOUVELLE CONDITION : Si le bâtiment est en construction, on passe au suivant.
        if (gameState.fief.constructionQueue[buildingId]) {
            continue;
        }

        const buildingProd = gameState.fief.production[buildingId];
        let lastUpdate = buildingProd.lastUpdate;

        if (lastUpdate === 0) {
            buildingProd.lastUpdate = now;
            continue;
        }

        const elapsedMs = now - lastUpdate;
        if (elapsedMs <= 0) continue;

        const level = gameState.fief.buildings[buildingId] || 0;
        if (level > 0) {
            const buildingData = FIEF_DB[buildingId];
            const productionPerHour = buildingData.upgrades[level - 1].production;
            const maxStock = productionPerHour * 8;
            const elapsedHours = elapsedMs / (1000 * 60 * 60);
            const producedAmount = productionPerHour * elapsedHours;
            
            buildingProd.stock = Math.min(maxStock, buildingProd.stock + producedAmount);
        }
        buildingProd.lastUpdate = now;
    }
    isDirty = true;
}

function displayFiefUI() {
    if (!gameState.fief) return;
    updateFiefProduction(); 

    setText('#fief-title', 'ui.fief.title');
    setText('#fief-description', 'ui.fief.description');
    setText('#fief-special-resources-title', 'ui.fief.special_resources_title');
    setText('#fief-buildings-title', 'ui.fief.buildings_title');

    const rareResourcesList = document.getElementById('fief-rare-resources-list');
    const buildingsGrid = document.getElementById('fief-buildings-grid');
    if (!rareResourcesList || !buildingsGrid) return;

    rareResourcesList.innerHTML = '';
    let hasRareResources = false;
    const nonSpecialResources = ['bois', 'metal', 'tissu', 'marques_de_chasse', 'fragments','bounty_tokens', 'cle_de_la_breche', 'eclats_instables', 'eclats_ascension'];
    const specialResourceKeys = Object.keys(gameState.player.resources).filter(res => !nonSpecialResources.includes(res));

    specialResourceKeys.forEach(resourceName => {
        const amount = gameState.player.resources[resourceName];
        if (amount > 0) {
            hasRareResources = true;
            const translatedName = t(`stats.displayNames.${resourceName}`) || resourceName;
            const iconPath = SPRITE_PATHS[resourceName] || SPRITE_PATHS[translatedName];
            const iconHtml = iconPath ? `<img src="${iconPath}" class="icon-sprite-small">` : '';
            
            rareResourcesList.innerHTML += `
                <div class="fief-resource-item">
                    ${iconHtml}
                    <span>${(amount || 0).toLocaleString()}</span>
                </div>
            `;
        }
    });

    document.getElementById('fief-special-resources-display').classList.toggle('hidden', !hasRareResources);

    buildingsGrid.innerHTML = '';
    for (const buildingId in FIEF_DB) {
        const buildingData = FIEF_DB[buildingId];
        const currentLevel = gameState.fief.buildings[buildingId] || 0;
        const card = document.createElement('div');
        card.className = 'fief-building-card';
        
        const isUnderConstruction = !!gameState.fief.constructionQueue[buildingId];
        if (isUnderConstruction) {
            const endTime = gameState.fief.constructionQueue[buildingId];
            const remainingMs = endTime - Date.now();
            const cost = Math.ceil((remainingMs / 3600000) * SPEED_UP_COST_PER_HOUR);
            const nextLevel = (gameState.fief.buildings[buildingId] || 0) + 1;
            const levelDisplay = t('ui.fief.level_indicator', { currentLevel: nextLevel });

            const eaIconHtml = `<img src="assets/sprites/ressources/eclats_ascension.png" class="icon-sprite-small" alt="EA">`;
            card.innerHTML = `
                <h5>${buildingData.icon} ${t(buildingData.nameKey)} ${levelDisplay}</h5>
                <div class="building-production-info under-construction">
                    <p>${t('ui.fief.under_construction')}</p>
                    <strong class="construction-timer" data-construction-end="${endTime}">00:00:00</strong>
                </div>
                <div class="building-actions-container">
                    <button class="action-button" onclick="speedUpConstruction('${buildingId}', 'fief')">
                        ${t('ui.fief.speed_up_button', { cost: cost, ea_icon: eaIconHtml })}
                    </button>
                </div>
            `;
            
            buildingsGrid.appendChild(card);
            const titleElement = card.querySelector('h5');
            if (titleElement) {
                attachInteractionListener(titleElement, { onTap: () => openBuildingDetailsModal(buildingId) });
            }
            continue; 
        }

        let infoContent = '';
        let actionsContent = '';
        
        if (currentLevel > 0) {
            if (buildingData.isUtility) {
                // Logique pour Entrepôt et Infirmerie...
            } else {
                const productionPerHour = buildingData.upgrades[currentLevel - 1].production;
                const maxStock = productionPerHour * 8;
                const currentStock = Math.floor(gameState.fief.production[buildingId]?.stock || 0);
                const stockPercent = maxStock > 0 ? (currentStock / maxStock) * 100 : 0;
                
                infoContent = `<div class="building-production-info">
                    <div class="stock-display">
                        <span>${t('ui.fief.stock_label')}</span>
                        <span><strong id="stock-${buildingId}">${currentStock.toLocaleString()}</strong> / ${maxStock.toLocaleString()}</span>
                    </div>
                    <div class="production-bar-bg"><div class="production-bar-fill" style="width:${stockPercent}%"></div></div>
                    <div class="timer-display" id="timer-container-${buildingId}">...</div>
                </div>`;
            }
        } else {
             infoContent = `<div class="building-production-info"><p>${t('ui.fief.build_prompt')}</p></div>`;
        }

        let collectButton = '';
        if (currentLevel > 0 && !buildingData.isUtility) {
            const currentStock = Math.floor(gameState.fief.production[buildingId]?.stock || 0);
            collectButton = `<button class="action-button collect-button" onclick="collectFiefResources('${buildingId}')" ${currentStock < 1 ? 'disabled' : ''}>${t('ui.buttons.collect')}</button>`;
        }
        
        let upgradeButton = '';
        const maxLevel = buildingData.upgrades.length;
        if (currentLevel < maxLevel) {
            const upgradeInfo = buildingData.upgrades[currentLevel];
            let canAfford = true;
            let costString = [];
            for (const resource in upgradeInfo.cost) {
                const playerAmount = (resource === 'fragments') ? (gameState.player.fragments || 0) : (gameState.player.resources[resource] || 0);
                if (playerAmount < upgradeInfo.cost[resource]) canAfford = false;
                const icon = `<img src="${SPRITE_PATHS[resource]}" class="icon-sprite-small" title="${resource}">`;
                // MON COMMENTAIRE : C'est ici que j'enveloppe chaque coût dans un span.
                costString.push(`<span class="cost-item"><strong>${upgradeInfo.cost[resource]}</strong> ${icon}</span>`);
            }
            const buttonText = currentLevel === 0 ? t('ui.buttons.build') : t('ui.buttons.upgrade');
            upgradeButton = `
                <button class="action-button upgrade-button" onclick="upgradeFiefBuilding('${buildingId}')" ${!canAfford ? 'disabled' : ''}>
                    <span>${buttonText}</span>
                    <span class="upgrade-cost">${costString.join('')}</span>
                </button>`;
        } else {
            card.classList.add('max-level');
        }
        actionsContent = `<div class="building-actions-container">${collectButton}${upgradeButton}</div>`;

        const levelDisplay = t('ui.fief.level_indicator', { currentLevel: currentLevel });
        card.innerHTML = `
            <h5>${buildingData.icon} ${t(buildingData.nameKey)} ${levelDisplay}</h5>
            ${infoContent}
            ${actionsContent}
        `;
        buildingsGrid.appendChild(card);
        
        const titleElement = card.querySelector('h5');
        if (titleElement) {
            attachInteractionListener(titleElement, {
                onTap: () => openBuildingDetailsModal(buildingId)
            });
        }
    }
}

function openBuildingDetailsModal(buildingId) {
    const modal = document.getElementById('fief-building-details-modal');
    const titleEl = document.getElementById('fief-building-details-title');
    const bodyEl = document.getElementById('fief-building-details-body');
    if (!modal || !titleEl || !bodyEl) return;

    const buildingData = FIEF_DB[buildingId];
    if (!buildingData) return;

    const buildingName = t(buildingData.nameKey);
    const buildingDescription = t(buildingData.descriptionKey);
    const currentLevel = gameState.fief.buildings[buildingId] || 0;
    
    titleEl.innerHTML = `${buildingData.icon} ${buildingName}`;
    
    let content = `<p class="building-details-description">${buildingDescription}</p><hr>`;

    let specificInfo = '';
    const maxLevel = buildingData.upgrades.length;

    if (currentLevel > 0) {
        const currentUpgrade = buildingData.upgrades[currentLevel - 1];
        let nextUpgrade = null;
        if (currentLevel < maxLevel) {
            nextUpgrade = buildingData.upgrades[currentLevel];
        }

        if (buildingId === 'infirmerie') {
            specificInfo += `<p>${t('ui.fief.infirmary_penalty_reduction')} <strong>-${currentUpgrade.reduction}%</strong></p>`;
            specificInfo += `<p>${t('ui.fief.infirmary_production', { amount: `<strong>${currentUpgrade.production_amount}</strong>`, hours: `<strong>${currentUpgrade.production_rate_hours}h</strong>` })}</p>`;
            if (nextUpgrade) {
                specificInfo += `<hr style="border-color: #333; margin: 8px 0;">`;
                specificInfo += `<p style="color:#aaa; font-style: italic;">${t('ui.fief.next_level_label')}</p>`;
                specificInfo += `<p>${t('ui.fief.next_level_penalty', { reduction: `<strong>-${nextUpgrade.reduction}%</strong>` })}</p>`;
                specificInfo += `<p>${t('ui.fief.next_level_production', { amount: `<strong>${nextUpgrade.production_amount}</strong>`, hours: `<strong>${nextUpgrade.production_rate_hours}h</strong>` })}</p>`;
            }
        } else if (buildingId === 'entrepot') {
            specificInfo += `<p>${t('ui.fief.warehouse_capacity')} <strong>${currentUpgrade.capacity.toLocaleString()}</strong></p>`;
            if (nextUpgrade) {
                specificInfo += `<p>${t('ui.fief.next_level_capacity', { capacity: `<strong>→ ${nextUpgrade.capacity.toLocaleString()}</strong>` })}</p>`;
            }
        } else {
            specificInfo += `<p>${t('ui.fief.current_production_per_hour', { production: `<strong>${currentUpgrade.production.toLocaleString()}</strong>` })}</p>`;
            if (nextUpgrade) {
                specificInfo += `<p>${t('ui.fief.next_level_production_per_hour', { production: `<strong>→ ${nextUpgrade.production.toLocaleString()}</strong>` })}</p>`;
            }
        }
    } else {
        specificInfo = `<p>${t('ui.fief.not_built_yet')}</p>`;
    }

    content += `<div class="building-details-stats">${specificInfo}</div>`;
    bodyEl.innerHTML = content;
    
    modal.classList.remove('hidden');
}


// AJOUTEZ CETTE NOUVELLE FONCTION
/**
 * Ferme la modale des détails de bâtiment.
 */
window.closeBuildingDetailsModal = function() {
    const modal = document.getElementById('fief-building-details-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

/**
 * Gère la collecte des ressources pour un bâtiment.
 */
window.collectFiefResources = function(buildingId) {
    updateFiefProduction();
    
    const buildingProd = gameState.fief.production[buildingId];
    if (!buildingProd) return;

    const resourceType = FIEF_DB[buildingId].produces;
    const amountToCollect = Math.floor(buildingProd.stock || 0);

    if (amountToCollect <= 0) return;

    if (resourceType === 'fragments') {
        gameState.player.fragments = (gameState.player.fragments || 0) + amountToCollect;
        buildingProd.stock = 0;
        showToast(t('alerts.fief.fragments_collected', { amount: amountToCollect.toLocaleString() }), 'success');
    } else {
        const currentAmount = gameState.player.resources[resourceType] || 0;
        const maxAmount = gameState.player.maxResources;
        const availableSpace = maxAmount - currentAmount;

        if (availableSpace <= 0) {
            showToast(t('alerts.fief.warehouse_full_for_resource'), "error");
            return;
        }

        const amountActuallyCollected = Math.min(amountToCollect, availableSpace);

        gameState.player.resources[resourceType] += amountActuallyCollected;
        buildingProd.stock -= amountActuallyCollected;

        let toastMessage = t('alerts.fief.resource_collected', { amount: amountActuallyCollected.toLocaleString(), resourceName: t(`stats.displayNames.${resourceType}`) });
        if (amountActuallyCollected < amountToCollect) {
            toastMessage += `<br><small>${t('alerts.fief.warehouse_full_remainder_stored')}</small>`;
        }
        showToast(toastMessage, 'success');
    }
    
    // Met à jour l'UI du Fief
    displayFiefUI();
    // AJOUT : Met à jour l'UI générale (le header)
    updateGameUI();
    saveGame();
}

/**
 * Gère la logique d'amélioration d'un bâtiment.
 */
window.upgradeFiefBuilding = async function(buildingId) {
    if (gameState.fief.constructionQueue[buildingId]) {
        showToast(t('ui.fief.under_construction'), 'error');
        return;
    }

    const buildingData = FIEF_DB[buildingId];
    const currentLevel = gameState.fief.buildings[buildingId] || 0;
    const nextLevel = currentLevel + 1;
    if (nextLevel > buildingData.upgrades.length) return;

    const upgradeInfo = buildingData.upgrades[currentLevel];
    
    let canAfford = true;
    let costString = [];
    for (const resource in upgradeInfo.cost) {
        const playerAmount = (resource === 'fragments') ? (gameState.player.fragments || 0) : (gameState.player.resources[resource] || 0);
        if (playerAmount < upgradeInfo.cost[resource]) canAfford = false;
        // MON COMMENTAIRE : J'enveloppe également chaque coût dans le span ici.
        costString.push(`<span class="cost-item">${upgradeInfo.cost[resource]} <img src="${SPRITE_PATHS[resource]}" class="icon-sprite-small" alt="${resource}"></span>`);
    }

    if (!canAfford) {
        showToast(t('alerts.not_enough_resources'), 'error');
        return;
    }

    const durationString = formatDuration(upgradeInfo.constructionTimeHours * 3600 * 1000);
    const confirmMessage = t('ui.fief.upgrade_confirm_body', {
        buildingName: t(buildingData.nameKey),
        level: nextLevel,
        // MON COMMENTAIRE : Le join se fait maintenant avec ' + ' entre les spans.
        cost: costString.join(' + '),
        duration: durationString
    });
    
    const confirmed = await showCustomConfirm(confirmMessage, t('ui.buttons.upgrade'), t('ui.buttons.cancel'));
    if (!confirmed) return;

    for (const resource in upgradeInfo.cost) {
        if (resource === 'fragments') gameState.player.fragments -= upgradeInfo.cost[resource];
        else gameState.player.resources[resource] -= upgradeInfo.cost[resource];
    }
    
    const constructionTimeMs = upgradeInfo.constructionTimeHours * 3600 * 1000;
    gameState.fief.constructionQueue[buildingId] = Date.now() + constructionTimeMs;
    if (upgradeInfo.constructionTimeHours > 2) {
        showContextualSpeedUpOffer();
    }
    displayFiefUI();
    updateGameUI();
    saveGame();
}

// DANS le fichier game.0.9.0.js
function updateFiefTimers() {
    if (!gameState.fief || !gameState.fief.production) return;

    updateFiefProduction(); 

    const resourcesList = document.getElementById('fief-resources-list');
    if (resourcesList) {
        const mainResources = ['bois', 'metal', 'tissu', 'fragments', 'eclats_instables'];
        mainResources.forEach(resKey => {
            const span = resourcesList.querySelector(`#fief-res-${resKey}`);
            if (span) {
                let amount = (resKey === 'fragments') ? (gameState.player.fragments || 0) : (gameState.player.resources[resKey] || 0);
                if (amount !== undefined) span.textContent = Math.floor(amount).toLocaleString();
            }
        });
    }

    for (const buildingId in FIEF_DB) {
        const buildingData = FIEF_DB[buildingId];
        const currentLevel = gameState.fief.buildings[buildingId] || 0;

        if (buildingId === 'infirmerie') {
            if (currentLevel > 0) {
                const timerElement = document.getElementById('timer-infirmerie');
                if (timerElement) {
                    const upgradeData = FIEF_DB.infirmerie.upgrades[currentLevel - 1];
                    const cooldownMs = upgradeData.production_rate_hours * 60 * 60 * 1000;
                    let lastCollection = gameState.fief.lastBaumeCollection || 0;
                    
                    if (Date.now() > lastCollection + cooldownMs) {
                        const amount = upgradeData.production_amount;
                        gameState.player.consumables['BAUME_DE_TRIAGE'] = (gameState.player.consumables['BAUME_DE_TRIAGE'] || 0) + amount;
                        gameState.fief.lastBaumeCollection = Date.now();
                        lastCollection = gameState.fief.lastBaumeCollection;
                        
                        showToast(t('alerts.fief.balm_produced', { amount: amount }), 'success');
                        updateConsumablesUI();
                        saveGame();
                    }

                    const nextCollectionTime = lastCollection + cooldownMs;
                    const timeLeftMs = Math.max(0, nextCollectionTime - Date.now());
                    
                    if (timeLeftMs > 0) {
                        const hours = Math.floor(timeLeftMs / 3600000).toString().padStart(2, '0');
                        const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
                        const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
                        timerElement.textContent = `${hours}:${minutes}:${seconds}`;
                    } else {
                        timerElement.textContent = t('ui.fief.status_calculating'); 
                    }
                }
            }
            continue;
        }

        if (buildingData.isUtility) continue;

        if (currentLevel > 0) {
            const timerContainer = document.getElementById(`timer-container-${buildingId}`);
            const stockElement = document.getElementById(`stock-${buildingId}`);
            // ▼▼▼ CORRECTION CI-DESSOUS ▼▼▼
            // On cherche le bouton de manière plus robuste dans tout le document
            const collectButton = document.querySelector(`.collect-button[onclick*="'${buildingId}'"]`);

            // On vérifie maintenant `collectButton` séparément pour plus de souplesse
            if (!timerContainer || !stockElement) continue;

            const productionPerHour = buildingData.upgrades[currentLevel - 1].production;
            const maxStock = productionPerHour * 8;
            const currentStock = gameState.fief.production[buildingId]?.stock || 0;
            
            stockElement.textContent = Math.floor(currentStock).toLocaleString();
            
            // On s'assure que le bouton existe avant de le manipuler
            if (collectButton) {
                collectButton.disabled = (currentStock < 1);
            }
            // ▲▲▲ FIN DE LA CORRECTION ▲▲▲

            if (currentStock < maxStock) {
                const remainingCapacity = maxStock - currentStock;
                const hoursToFill = remainingCapacity / productionPerHour;
                const secondsToFill = Math.max(0, Math.floor(hoursToFill * 3600));
                
                const hours = Math.floor(secondsToFill / 3600).toString().padStart(2, '0');
                const minutes = Math.floor((secondsToFill % 3600) / 60).toString().padStart(2, '0');
                const seconds = (secondsToFill % 60).toString().padStart(2, '0');
                
                timerContainer.innerHTML = `${t('ui.fief.full_in_timer')} <strong id="timer-${buildingId}">${hours}:${minutes}:${seconds}</strong>`;
            } else {
                timerContainer.innerHTML = `<strong style="color: #ffc107;">${t('ui.fief.status_full')}</strong>`;
            }
        }
    }
    if (gameState.fief.garden && gameState.fief.garden.plots) {
        gameState.fief.garden.plots.forEach((plot, index) => {
            if (plot.plant_id) {
                const timerElement = document.getElementById(`plot-timer-${index}`);
                if (timerElement) {
                    const plantData = GARDEN_PLANTS_DB[plot.plant_id];
                    const growthEndTime = plot.plant_start_time + getPlantGrowthDuration(plantData, index);
                    const timeLeftMs = Math.max(0, growthEndTime - Date.now());

                    if (timeLeftMs > 0) {
                        const hours = Math.floor(timeLeftMs / 3600000).toString().padStart(2, '0');
                        const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
                        const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
                        timerElement.textContent = `${hours}:${minutes}:${seconds}`;
                    } else {
                        const wasGrowing = timerElement.textContent !== t('ui.garden.status_ready');
                        if (wasGrowing) {
                            const transformed = checkForTransformations(index);
                            if (!transformed) {
                                timerElement.textContent = t('ui.garden.status_ready');
                            }
                            updateGardenUI();
                        }
                    }
                }
            }
        });
    }
}

function showBuildingTooltip(buildingId, element) {
    const buildingData = FIEF_DB[buildingId];
    if (!buildingData) return;

    const buildingName = t(buildingData.nameKey);
    const buildingDescription = t(buildingData.descriptionKey);
    const currentLevel = gameState.fief.buildings[buildingId] || 0;
    
    let content = `
        <strong>${buildingName}</strong>
        <hr style="border-color: #444;">
        <p style="font-size: 0.9em; text-align: left; margin-bottom: 10px;">${buildingDescription}</p>
        <hr style="border-color: #444;">`;

    let specificInfo = '';
    const maxLevel = buildingData.upgrades.length;

    if (currentLevel > 0) {
        const currentUpgrade = buildingData.upgrades[currentLevel - 1];
        let nextUpgrade = null;
        if (currentLevel < maxLevel) {
            nextUpgrade = buildingData.upgrades[currentLevel];
        }

        if (buildingId === 'infirmerie') {
            specificInfo += `<p>${t('ui.fief.infirmary_penalty_reduction')} <strong>-${currentUpgrade.reduction}%</strong></p>`;
            specificInfo += `<p>${t('ui.fief.infirmary_production', { amount: `<strong>${currentUpgrade.production_amount}`, hours: `${currentUpgrade.production_rate_hours}h</strong>` })}</p>`;
            if (nextUpgrade) {
                specificInfo += `<hr style="border-color: #333; margin: 8px 0;">`;
                specificInfo += `<p style="color:#aaa; font-style: italic;">${t('ui.fief.next_level_label')}</p>`;
                specificInfo += `<p>${t('ui.fief.next_level_penalty', { reduction: `<strong>-${nextUpgrade.reduction}%</strong>` })}</p>`;
                specificInfo += `<p>${t('ui.fief.next_level_production', { amount: `<strong>${nextUpgrade.production_amount}`, hours: `${nextUpgrade.production_rate_hours}h</strong>` })}</p>`;
            }
        } else if (buildingId === 'entrepot') {
            specificInfo += `<p>${t('ui.fief.warehouse_capacity')} <strong>${currentUpgrade.capacity.toLocaleString()}</strong></p>`;
            if (nextUpgrade) {
                specificInfo += `<p>${t('ui.fief.next_level_capacity', { capacity: `<strong>→ ${nextUpgrade.capacity.toLocaleString()}</strong>` })}</p>`;
            }
        } else {
            specificInfo += `<p>${t('ui.fief.current_production_per_hour', { production: `<strong>${currentUpgrade.production.toLocaleString()}</strong>` })}</p>`;
            if (nextUpgrade) {
                specificInfo += `<p>${t('ui.fief.next_level_production_per_hour', { production: `<strong>→ ${nextUpgrade.production.toLocaleString()}</strong>` })}</p>`;
            }
        }
    } else {
        specificInfo = `<p style="font-size: 0.9em;">${t('ui.fief.not_built_yet')}</p>`;
    }

    content += `<div style="text-align: left; font-size: 0.85em;">${specificInfo}</div>`;
    
    showTooltip(content, element);
}

function generateFiefConsumable() {
    if (!gameState.fief) return;

    const infirmeryLevel = gameState.fief.buildings.infirmerie || 0;
    if (infirmeryLevel === 0) return;

    const upgradeData = FIEF_DB.infirmerie.upgrades[infirmeryLevel - 1];
    const cooldownMs = upgradeData.production_rate_hours * 60 * 60 * 1000;
    const now = Date.now();

    if (now > (gameState.fief.lastBaumeCollection || 0) + cooldownMs) {
        const amount = upgradeData.production_amount;
        gameState.player.consumables['BAUME_DE_TRIAGE'] = (gameState.player.consumables['BAUME_DE_TRIAGE'] || 0) + amount;
        gameState.fief.lastBaumeCollection = now;
        isDirty = true;

        showToast(t('alerts.fief.balm_produced', { amount: amount }), 'success');
        updateGameUI();
        saveGame();
    }
}

function updateSeason() {
    if (!gameState.fief || !gameState.fief.garden) return;

    const garden = gameState.fief.garden;
    const now = Date.now();
    const SEASON_DURATION_MS = 3 * 24 * 60 * 60 * 1000;

    if (garden.season_start_time === 0) {
        garden.season_start_time = now;
        isDirty = true;
        saveGame();
    }

    if (now > garden.season_start_time + SEASON_DURATION_MS) {
        const seasonOrder = ['PRINTEMPS', 'ETE', 'AUTOMNE', 'HIVER'];
        const currentSeasonIndex = seasonOrder.indexOf(garden.current_season);
        const nextSeasonIndex = (currentSeasonIndex + 1) % seasonOrder.length;

        garden.current_season = seasonOrder[nextSeasonIndex];
        garden.season_start_time = now;

        showToast(t('alerts.season.new_season', { seasonName: t(SEASONS_DB[garden.current_season].nameKey) }), 'success');
        saveGame();
    }
}

function updateGardenUI() {
    if (!gameState.fief || !gameState.fief.garden) return;
    setText('#fief-garden-title', 'ui.fief.garden_title');
    const garden = gameState.fief.garden;
    const seasonInfo = document.getElementById('garden-season-info');
    const plotsContainer = document.getElementById('garden-plots-container');
    const seedsInventory = document.getElementById('garden-seeds-inventory');

    const currentSeasonData = SEASONS_DB[garden.current_season];
    const SEASON_DURATION_MS = 3 * 24 * 60 * 60 * 1000;
    const seasonEndTime = (garden.season_start_time || 0) + SEASON_DURATION_MS;
    const timeLeftMs = Math.max(0, seasonEndTime - Date.now());
    const daysLeft = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const seasonName = t(currentSeasonData.nameKey);
    seasonInfo.innerHTML = `
        <img src="${currentSeasonData.icon}" class="season-icon" alt="${seasonName}">
        <div class="season-text-container">
            <span>${t('ui.garden.current_season', { seasonName: `<strong>${seasonName}</strong>` })}</span>
            <small>${t('ui.garden.season_change_timer', { days: daysLeft, hours: hoursLeft })}</small>
        </div>
        <button class="season-info-button" onclick="showSeasonInfo()">i</button>
    `;

    const tierIndicator = document.getElementById('garden-tier-indicator');
    if (tierIndicator) tierIndicator.remove(); 

    const newIndicator = document.createElement('div');
    newIndicator.id = 'garden-tier-indicator';
    const currentSize = garden.plots.length;
    let indicatorText = '';

    if (currentSize < 6) {
        indicatorText = t('ui.garden.tier_goal_1');
    } else if (currentSize < 9) {
        indicatorText = t('ui.garden.tier_goal_2');
    } else if (currentSize < 16) {
        indicatorText = t('ui.garden.tier_goal_3');
    } else {
        indicatorText = t('ui.garden.tier_goal_max');
    }
    newIndicator.innerHTML = indicatorText;
    seasonInfo.parentNode.insertBefore(newIndicator, seasonInfo.nextSibling);

    plotsContainer.innerHTML = '';
    garden.plots.forEach((plot, index) => {
        const plotDiv = document.createElement('div');
        plotDiv.className = 'garden-plot';

        if (plot.plant_id) {
            const plantData = GARDEN_PLANTS_DB[plot.plant_id];
            const growthDurationMs = getPlantGrowthDuration(plantData, index);
            const isReady = Date.now() >= plot.plant_start_time + growthDurationMs;
            
            // On affiche TOUJOURS la plante d'origine, même pendant la transmutation
            const currentSprite = plantData.sprites.stage3; // Toujours l'image finale
            const plantName = t(plantData.nameKey);

            plotDiv.innerHTML = `<div class="plant-sprite-container"><img src="${currentSprite}" alt="${plantName}"></div>`;
            
            if (plot.pending_mutation) {
                // NOUVELLE LOGIQUE D'AFFICHAGE POUR LA CONFIRMATION
                plotDiv.classList.add('ready'); // On la marque comme prête pour le style visuel
                plotDiv.innerHTML += `
                    <div class="transmutation-overlay">
                        <p>${t('ui.garden.transmutation_pending')}</p>
                        <p>${t('ui.garden.transmutation_confirm')}</p>
                        <div class="transmutation-buttons">
                            <button class="confirm-btn" onclick="acceptTransmutation(${index})">${t('ui.garden.confirm_yes')}</button>
                            <button class="cancel-btn" onclick="cancelTransmutation(${index})">${t('ui.garden.confirm_no')}</button>
                        </div>
                    </div>`;
            } else if (isReady) {
                // Affichage normal pour une plante prête
                plotDiv.classList.add('ready');
                plotDiv.innerHTML += `
                    <div class="plant-name">${plantName}</div>
                    <div class="garden-button-group">
                        <button class="action-button collect-button" onclick="harvestPlant(${index})">${t('ui.buttons.harvest')}</button>
                        <button class="uproot-button" onclick="uprootPlant(${index})">${t('ui.buttons.uproot')}</button>
                    </div>`;
            } else {
                // Affichage normal pour une plante en croissance
                const timeElapsedMs = Date.now() - plot.plant_start_time;
                const growthPercent = Math.min(100, (timeElapsedMs / growthDurationMs) * 100);
                
                let growthSprite = plantData.sprites.stage1;
                if (growthPercent >= 50) growthSprite = plantData.sprites.stage2;

                plotDiv.querySelector('.plant-sprite-container img').src = growthSprite; // On met à jour le sprite de croissance
                
                plotDiv.classList.add('growing');
                plotDiv.innerHTML += `
                    <div class="plant-name">${plantName}</div>
                    <div class="growth-bar-bg"><div class="growth-bar-fill" style="width: ${growthPercent}%;"></div></div>
                    <div class="plant-timer" id="plot-timer-${index}">--:--:--</div>
                    <button class="uproot-button" onclick="uprootPlant(${index})">${t('ui.buttons.uproot')}</button>`;
            }
        } else {
            plotDiv.classList.add('empty');
            plotDiv.innerHTML = `<div class="empty-plot-text">+</div><small>${t('ui.garden.empty_plot')}</small>`;
            plotDiv.onclick = () => showSeedSelection(index);
        }
        plotsContainer.appendChild(plotDiv);
    });

    seedsInventory.innerHTML = `<h4>${t('ui.garden.your_seeds_title')}</h4>`;
    const seedsContainer = document.createElement('div');
    seedsContainer.className = 'seed-list';
    const seedInventory = garden.seed_inventory;
    if (Object.keys(seedInventory).length === 0 || Object.values(seedInventory).every(count => count === 0)) {
        seedsContainer.innerHTML = `<p style="color: #aaa; font-style: italic; width: 100%;">${t('ui.garden.no_seeds')}</p>`;
    } else {
        for (const seedId in seedInventory) {
            const count = seedInventory[seedId];
            if (count > 0) {
                const seedData = GARDEN_PLANTS_DB[seedId];
                const seedDiv = document.createElement('div');
                seedDiv.className = 'seed-item';
                seedDiv.innerHTML = `${seedData.icon}<span class="seed-count">${count}</span>`;

                attachInteractionListener(seedDiv, {
                    onTap: () => showSeedTooltip(seedId, seedDiv),
                    onHover: () => showSeedTooltip(seedId, seedDiv)
                });
                seedDiv.addEventListener('mouseleave', hideStatTooltip);

                seedsContainer.appendChild(seedDiv);
            }
        }
    }
    seedsInventory.appendChild(seedsContainer);
}

function acceptTransmutation(plotIndex) {
    const garden = gameState.fief.garden;
    const plot = garden.plots[plotIndex];
    if (!plot || !plot.pending_mutation) return;

    const newPlantId = plot.pending_mutation.result_plant_id;
    const newPlantData = GARDEN_PLANTS_DB[newPlantId];
    
    // On met à jour la parcelle avec la nouvelle plante
    plot.plant_id = newPlantId;
    plot.plant_start_time = Date.now();
    plot.pending_mutation = null; // On nettoie le statut

    // On vérifie si un nouveau tier de plante a été débloqué
    const newTier = newPlantData.tier;
    if (!garden.unlocked_tiers.includes(newTier)) {
        garden.unlocked_tiers.push(newTier);
        if (newTier === 1) expandGarden(6);
        else if (newTier === 2) expandGarden(9);
        else if (newTier === 3) expandGarden(16);
    }
    
    showToast(t('alerts.garden.synergy_success', { 
        oldPlant: "Plante", // On ne connaît plus l'ancien nom, un texte générique suffit
        newPlant: t(newPlantData.nameKey) 
    }), 'success');

    updateGardenUI();
    saveGame();
}

/**
 * Annule la transmutation en attente, permettant la récolte de la plante d'origine.
 */
function cancelTransmutation(plotIndex) {
    const garden = gameState.fief.garden;
    const plot = garden.plots[plotIndex];
    if (!plot || !plot.pending_mutation) return;

    plot.pending_mutation = null; // On nettoie simplement le statut
    
    // Pas besoin de toast, l'interface se mettra à jour et montrera le bouton Récolter
    updateGardenUI();
    saveGame();
}

async function showSeedSelection(plotIndex) {
    const garden = gameState.fief.garden;
    let choicesHtml = '<div class="seed-selection-grid">';
    let hasSeeds = false;

    for (const seedId in garden.seed_inventory) {
        if (garden.seed_inventory[seedId] > 0) {
            hasSeeds = true;
            const seedData = GARDEN_PLANTS_DB[seedId];
            const seedName = t(seedData.nameKey);
            choicesHtml += `
                <div class="seed-choice-card" data-seed-id="${seedId}">
                    <div class="seed-icon">${seedData.icon}</div>
                    <strong>${seedName}</strong>
                    <small>${t('ui.garden.seed_owned', { count: garden.seed_inventory[seedId] })}</small>
                </div>`;
        }
    }

    if (!hasSeeds) {
        showToast(t('alerts.garden.no_seeds_to_plant'), "error");
        return;
    }
    choicesHtml += '</div>';

    const selectedSeed = await showCustomConfirmWithChoices(
        `<h3>${t('ui.garden.seed_select_title')}</h3><p>${t('ui.garden.seed_select_prompt')}</p>${choicesHtml}`,
        t('ui.buttons.plant'),
        t('ui.buttons.cancel')
    );

    if (selectedSeed === t('ui.buttons.plant')) {
        const selectedCard = document.querySelector('.seed-choice-card.selected');
        if (selectedCard) {
            plantSeed(plotIndex, selectedCard.dataset.seedId);
        } else {
            showToast(t('alerts.garden.no_seed_selected'), "error");
        }
    }
}

// Ajout d'un écouteur d'événement global pour la sélection dans la modale
document.body.addEventListener('click', function(event) {
    const target = event.target.closest('.seed-choice-card');
    if (target) {
        document.querySelectorAll('.seed-choice-card').forEach(card => card.classList.remove('selected'));
        target.classList.add('selected');
    }
});

/**
 * Logique de plantation d'une graine.
 * @param {number} plotIndex - L'index de la parcelle.
 * @param {string} seedId - L'ID de la graine à planter.
 */
function plantSeed(plotIndex, seedId) {
    const garden = gameState.fief.garden;
    const plot = garden.plots[plotIndex];

    if (plot && !plot.plant_id && garden.seed_inventory[seedId] > 0) {
        garden.seed_inventory[seedId]--;
        plot.plant_id = seedId;
        plot.plant_start_time = Date.now();

        showToast(t('alerts.garden.plant_success', { plantName: t(GARDEN_PLANTS_DB[seedId].nameKey) }), 'success');
        updateGardenUI();
        saveGame();
    } else {
        showToast(t('alerts.garden.action_impossible'), "error");
    }
}

async function harvestPlant(plotIndex) {
    const garden = gameState.fief.garden;
    const plot = garden.plots[plotIndex];
    if (plot.pending_mutation) {
        showToast(t('alerts.garden.action_impossible'), "error");
        return;
    }
    if (!plot || !plot.plant_id) return;

    const plantData = GARDEN_PLANTS_DB[plot.plant_id];
    const growthDurationMs = getPlantGrowthDuration(plantData, plotIndex);
    if (Date.now() < plot.plant_start_time + growthDurationMs) {
        showToast(t('alerts.garden.not_ready'), "error");
        return;
    }
    
    if (plantData.is_support) {
        showToast(t('fief.garden.support_plant_info', { plantName: t(plantData.nameKey) }), 'system-message');
        return;
    }
    
    const neighbors = getNeighbors(plotIndex);
    const isProtectedByOrchid = neighbors.some(n => n.plot.plant_id === 'ORCHIDEE_SILENCIEUSE');

    if (!isProtectedByOrchid && plantData.infestation_chance && Math.random() < plantData.infestation_chance) {
        showToast(t('fief.garden.infestation_alert', { plantName: t(plantData.nameKey) }), 'error');
        
        const afterCombatCallbacks = {
            win: () => { 
                showCustomAlert(t('alerts.garden.infestation_win'));
                performSafeHarvest(plotIndex, 1.0);
                document.getElementById('fief-screen').classList.remove('hidden');
            },
            loss: () => {
                showCustomAlert(t('alerts.garden.infestation_flee'));
                performSafeHarvest(plotIndex, 0.2);
                document.getElementById('fief-screen').classList.remove('hidden');
            }
        };

        startCombat(['SCARABEE_GOLIATH'], afterCombatCallbacks);
        return; 
    }
    
    if (isProtectedByOrchid && plantData.infestation_chance > 0) {
        showToast(t('fief.garden.orchid_protection'), 'success');
    }

    performSafeHarvest(plotIndex, 1.0);
}

function performSafeHarvest(plotIndex, yieldMultiplier) {
    const garden = gameState.fief.garden;
    const plot = garden.plots[plotIndex];
    if (!plot || !plot.plant_id) return;

    const plantData = GARDEN_PLANTS_DB[plot.plant_id];
    
    const yieldInfo = plantData.harvest_yield;
    const finalAmount = Math.floor(yieldInfo.amount * yieldMultiplier);
    const result = addResource(yieldInfo.resource, finalAmount);

    let seedsHarvested = 1;
    if (plantData.rarity === 'common' && Math.random() < 0.15) {
        seedsHarvested = 2;
    } else if (plantData.rarity === 'rare' && Math.random() < 0.25) {
        seedsHarvested = 2;
    }
    garden.seed_inventory[plot.plant_id] = (garden.seed_inventory[plot.plant_id] || 0) + seedsHarvested;
    
    let harvestMessage;
    const resourceName = t(`stats.displayNames.${yieldInfo.resource}`) || yieldInfo.resource;
    if (yieldMultiplier < 1.0) {
        // NOUVELLE LIGNE CORRIGÉE
        harvestMessage = t('alerts.garden.harvest_partial', { amount: result.amountAdded, resource: resourceName, seeds: seedsHarvested });
    } else {
        // NOUVELLE LIGNE CORRIGÉE
        harvestMessage = t('alerts.garden.harvest_success', { amount: result.amountAdded, resource: resourceName, seeds: seedsHarvested });
    }
    showToast(harvestMessage, 'success');
    
    if (result.isFull) {
        // CORRECTION : Clé de traduction
        showToast(t('fief.garden.warehouse_full'), "error");
    }

    plot.plant_id = null;
    plot.plant_start_time = 0;
    
    updateGardenUI();
    updateGameUI();
    saveGame();
}

function getNeighbors(plotIndex) {
    const garden = gameState.fief.garden;
    // On calcule la taille de la grille (ex: 9 parcelles -> grille de 3)
    const gridSize = Math.sqrt(garden.plots.length); 
    const neighbors = [];
    const x = plotIndex % gridSize;

    const potentialNeighborIndexes = [];
    if (x > 0) potentialNeighborIndexes.push(plotIndex - 1); // Gauche
    if (x < gridSize - 1) potentialNeighborIndexes.push(plotIndex + 1); // Droite
    if (plotIndex >= gridSize) potentialNeighborIndexes.push(plotIndex - gridSize); // Haut
    if (plotIndex < garden.plots.length - gridSize) potentialNeighborIndexes.push(plotIndex + gridSize); // Bas

    potentialNeighborIndexes.forEach(index => {
        const plot = garden.plots[index];
        if (plot && plot.plant_id) {
            neighbors.push({
                plot: plot,
                data: GARDEN_PLANTS_DB[plot.plant_id],
                index: index
            });
        }
    });
    return neighbors;
}

function checkForTransformations(plotIndex) {
    const garden = gameState.fief.garden;
    const triggerPlot = garden.plots[plotIndex];
    // NOUVEAU : Si une mutation est déjà en attente sur cette parcelle, on ne fait rien.
    if (triggerPlot.pending_mutation) return false;
    
    const triggerPlantId = triggerPlot.plant_id;
    const currentSeason = garden.current_season;

    const neighbors = getNeighbors(plotIndex);

    for (const recipe of MUTATION_RECIPES_DB) {
        if (recipe.trigger_plant_id !== triggerPlantId) continue;
        if (recipe.season && recipe.season !== currentSeason) continue;

        const neighborsAreValid = recipe.required_neighbors.every(req => 
            neighbors.some(neighbor => 
                (req.id && neighbor.plot.plant_id === req.id) || 
                (req.type && neighbor.data.type === req.type)
            )
        );

        if (neighborsAreValid) {
            let finalChance = recipe.chance;
            if (neighbors.some(n => n.plot.plant_id === 'TREFLE_DORE')) {
                finalChance += 0.05;
            }

            if (Math.random() < finalChance) {
                let targetPlot = null;
                if (recipe.target_to_transform === recipe.trigger_plant_id) {
                    targetPlot = triggerPlot;
                } else {
                    // Logique pour cibler un voisin (si nécessaire un jour)
                }

                if (targetPlot) {
                    // AU LIEU DE TRANSFORMER, ON MARQUE LA MUTATION EN ATTENTE
                    targetPlot.pending_mutation = {
                        recipe_id: recipe.nameKey, // On garde une trace de la recette
                        result_plant_id: recipe.result_plant_id
                    };
                    
                    console.log(`Mutation en attente sur la parcelle ${plotIndex} pour ${recipe.result_plant_id}`);
                    
                    // On ne fait PAS de "return true" ici pour que la plante reste "prête"
                    // et déclenche la notification du Fief.
                    // On arrête simplement la boucle.
                    break;
                }
            }
        }
    }
    return false; // On retourne toujours false pour que la récolte reste possible si la mutation est refusée.
}

function updateGardenGrid() {
    const garden = gameState.fief.garden;
    if (!garden) return;
    const plotsContainer = document.getElementById('garden-plots-container');
    
    // NOUVEAU : On vérifie si on est sur un écran considéré comme "mobile"
    const isMobile = window.innerWidth <= 768;

    const plotCount = garden.plots.length;
    let gridSize; // C'est le nombre de colonnes pour le bureau

    // Votre logique existante pour les grands écrans reste la même
    switch (plotCount) {
        case 6:
        case 9:
            gridSize = 3;
            break;
        case 16:
            gridSize = 4;
            break;
        case 4:
        default:
            gridSize = 2;
            break;
    }
    
    // NOUVEAU : On applique la logique mobile
    // Si on est sur mobile, on force la grille à 2 colonnes, sinon on utilise la taille calculée.
    const finalGridSize = isMobile ? 2 : gridSize;
    
    if (plotsContainer) {
        plotsContainer.style.setProperty('--grid-size', finalGridSize);
    }
}

function checkAndResizeGardenOnLoad() {
    if (!gameState.fief || !gameState.fief.garden) return;

    const garden = gameState.fief.garden;
    // NOUVELLE LIGNE
    const validSizes = [4, 6, 9, 16]; // On ajoute 6 comme taille valide

    if (!validSizes.includes(garden.plots.length)) {
        console.warn(t('dev.logs.invalid_garden_size'));
        // Cette ligne ne devrait plus s'exécuter pour un jardin de 6 parcelles
        garden.plots = Array(4).fill().map(() => ({ plant_id: null, plant_start_time: 0, pending_mutation: null }));
    }
}

function expandGarden(newPlotCount) {
    const garden = gameState.fief.garden;
    const currentPlotCount = garden.plots.length;

    if (newPlotCount > currentPlotCount) {
        const plotsToAdd = newPlotCount - currentPlotCount;
        for (let i = 0; i < plotsToAdd; i++) {
            garden.plots.push({ plant_id: null, plant_start_time: 0 });
        }
        showToast(t('alerts.garden.expansion_success'), 'success');
        updateGardenGrid();
        updateGardenUI();
    }
}

async function uprootPlant(plotIndex) {
    const plot = gameState.fief.garden.plots[plotIndex];
    if (!plot || !plot.plant_id) return;
    if (plot.pending_mutation) {
        showToast(t('alerts.garden.action_impossible'), "error");
        return;
    }
    const plantData = GARDEN_PLANTS_DB[plot.plant_id];
    const plantName = t(plantData.nameKey);
    const confirmed = await showCustomConfirm(
        t('alerts.garden.uproot_confirm', { plantName: `<strong>${plantName}</strong>` }),
        t('ui.buttons.uproot'), t('ui.buttons.cancel')
    );

    if (confirmed) {
        plot.plant_id = null;
        plot.plant_start_time = 0;
        showToast(t('alerts.garden.uproot_success', { plantName: plantName }), 'system-message');
        updateGardenUI();
        saveGame();
    }
}

function showSeedTooltip(seedId, element) {
    const seedData = GARDEN_PLANTS_DB[seedId];
    if (!seedData) return;

    const seedName = t(seedData.nameKey);
    const seedDescription = t(seedData.descriptionKey);
    const seedHint = t(seedData.hintKey);

    let content = `
        <div class="tooltip-header">
            <strong class="${RARITY_CONFIG[seedData.rarity].colorClass}">${seedName}</strong>
            <span class="plant-type type-${seedData.type.toLowerCase()}">${seedData.type}</span>
        </div>
        <hr>`;

    content += `<p style="font-size: 0.9em; font-style: italic;">"${seedDescription}"</p><hr>`;
    content += `<p><strong>${t('ui.garden.growth_time')}</strong> ${seedData.growth_time_hours} ${t('ui.units.hours')}</p>`;
    if (seedData.harvest_yield) {
        const resourceName = t(`stats.displayNames.${seedData.harvest_yield.resource}`) || seedData.harvest_yield.resource.replace(/_/g, ' ');
        content += `<p><strong>${t('ui.garden.harvest_yield')}</strong> ${seedData.harvest_yield.amount} x ${resourceName}</p>`;
    }
    if (seedHint && !MUTATION_RECIPES_DB.some(r => r.result_plant_id === seedId)) {
        content += `<p><strong>${t('ui.garden.acquisition_method')}</strong> ${seedHint}</p>`;
    }

    const recipes = MUTATION_RECIPES_DB.filter(r => r.result_plant_id === seedId);
    if (recipes.length > 0) {
        content += `<hr><h4>${t('ui.garden.synergy_acquisition_title')}</h4>`;
        recipes.forEach(recipe => {
            const triggerPlant = GARDEN_PLANTS_DB[recipe.trigger_plant_id];
            const hasDiscoveredTrigger = gameState.fief.garden.seed_inventory[recipe.trigger_plant_id] !== undefined;
            const seasonData = SEASONS_DB[recipe.season];

            let recipeHtml = `<div class="recipe-line">`;
            
            const triggerPlantName = t(triggerPlant.nameKey);
            recipeHtml += hasDiscoveredTrigger 
                ? `<div class="recipe-part discovered" title="${triggerPlantName}"><img src="${triggerPlant.sprites.stage3}" alt="${triggerPlantName}"></div>`
                : `<div class="recipe-part undiscovered" title="${t('ui.garden.undiscovered_ingredient')}">?</div>`;

            recipeHtml += `<div class="recipe-plus">+</div>`;

            recipe.required_neighbors.forEach(neighbor => {
                if (neighbor.id) {
                    const reqPlant = GARDEN_PLANTS_DB[neighbor.id];
                    const reqPlantName = t(reqPlant.nameKey);
                    const hasDiscoveredNeighbor = gameState.fief.garden.seed_inventory[neighbor.id] !== undefined;
                    recipeHtml += hasDiscoveredNeighbor
                        ? `<div class="recipe-part discovered" title="${reqPlantName}"><img src="${reqPlant.sprites.stage3}" alt="${reqPlantName}"></div>`
                        : `<div class="recipe-part undiscovered" title="${t('ui.garden.undiscovered_ingredient')}">?</div>`;
                } else if (neighbor.type) {
                    recipeHtml += `<div class="recipe-part discovered type" title="${t('ui.garden.any_plant_of_type', { type: neighbor.type })}">${neighbor.type}</div>`;
                }
            });

            const seasonName = t(seasonData.nameKey);
            recipeHtml += `<div class="recipe-season" title="${t('ui.garden.during_season', { seasonName: seasonName })}"><img src="${seasonData.icon}" alt="${seasonName}"></div>`;
            recipeHtml += `</div>`;
            content += recipeHtml;
        });
    }
    
    showTooltip(content, element);
}

function getPlantGrowthDuration(plantData, plotIndex) {
    const baseDurationMs = plantData.growth_time_hours * 3600000;
    let finalDuration = baseDurationMs;

    const currentSeason = SEASONS_DB[gameState.fief.garden.current_season];
    
    // Application des bonus/malus de saison
    if (currentSeason.bonus_types.includes(plantData.type)) {
        finalDuration *= 0.75; // Bonus de 25% (croissance plus rapide)
    } else if (currentSeason.malus_types.includes(plantData.type)) {
        finalDuration *= 1.50; // Malus de 50% (croissance plus lente)
    }

    // NOUVEAU : Application des bonus des plantes de soutien voisines
    const neighbors = getNeighbors(plotIndex);
    if (neighbors.some(n => n.plot.plant_id === 'RACINE_EPONGE')) {
        // La Racine-Éponge annule 50% du malus de saison (si malus il y a)
        if (finalDuration > baseDurationMs) {
            const malusAmount = finalDuration - baseDurationMs;
            finalDuration -= malusAmount * 0.5;
        }
    }

    return finalDuration;
}

window.showSeasonInfo = function() {
    const garden = gameState.fief.garden;
    const seasonData = SEASONS_DB[garden.current_season];
    if (!seasonData) return;

    // CORRECTION : Utilisation de clés de traduction pour tout le message
    let message = `<h3>${t('fief.garden.season_effects_title', { seasonName: t(seasonData.nameKey) })}</h3>`;

    message += `<h4>${t('fief.garden.favored_types')}</h4>`;
    if (seasonData.bonus_types.length > 0) {
        message += `<ul class="season-bonus-list">${seasonData.bonus_types.map(type => `<li>${type}</li>`).join('')}</ul>`;
    } else {
        message += `<p>${t('fief.garden.no_favored_types')}</p>`;
    }

    message += `<h4 style="margin-top: 20px;">${t('fief.garden.disfavored_types')}</h4>`;
    if (seasonData.malus_types.length > 0) {
        message += `<ul class="season-malus-list">${seasonData.malus_types.map(type => `<li>${type}</li>`).join('')}</ul>`;
    } else {
        message += `<p>${t('fief.garden.no_disfavored_types')}</p>`;
    }
    
    showCustomAlert(message);
}

window.useFoodItem = function(itemUid) {
    const player = gameState.player;
    const itemIndex = player.inventory.findIndex(i => i.uid === itemUid);
    if (itemIndex === -1) return;

    const foodItem = player.inventory[itemIndex];
    const foodData = COOKING_RECIPES_DB[foodItem.id];
    if (!foodData || !foodData.bonus) return;

    player.inventory.splice(itemIndex, 1);

    const existingBuff = player.combatBuffs.find(b => b.id === foodItem.id);
    if (existingBuff) {
        existingBuff.remaining_combats = foodData.bonus.duration_in_combats;
    } else {
        player.combatBuffs.push({
            id: foodItem.id,
            stat: foodData.bonus.stat,
            value: foodData.bonus.value,
            remaining_combats: foodData.bonus.duration_in_combats
        });
    }

    showToast(t('alerts.food.use_success', { itemName: t(foodData.nameKey), duration: foodData.bonus.duration_in_combats }), 'success');

    recalculateTotalStats();
    updateGameUI();
    saveGame();
}

function openLoreModal(actNumber) {
    const modal = document.getElementById('lore-modal');
    const title = document.getElementById('lore-modal-title');
    const contentDisplay = document.getElementById('lore-content-display');

    const loreText = ADVENTURE_ACT_LORE_DB[actNumber];

    if (loreText) {
        title.textContent = `📜 Récit de l'Acte ${actNumber}`;
        const formattedLore = loreText.split('\n').map(p => `<p>${p.trim()}</p>`).join('');
        contentDisplay.innerHTML = formattedLore;
    } else {
        title.textContent = "Erreur";
        contentDisplay.innerHTML = `<p>Le récit de cet acte n'a pas été trouvé.</p>`;
    }

    modal.classList.remove('hidden');
    // NOUVEAU : On s'assure que la modale est bien visible en changeant son style "display".
    modal.style.display = 'flex';
}

function closeLoreModal() {
    const modal = document.getElementById('lore-modal');
    if (modal) {
        modal.classList.add('hidden');
        // NOUVEAU : On cache la modale correctement.
        modal.style.display = 'none';
    }
}

// =================================================================================
// NOUVELLE FONCTION : Gestion de la langue
// =================================================================================

function fullUIUpdateAfterLanguageChange() {
    // La fonction principale qui met déjà à jour une grande partie de l'UI
    updateGameUI(); 
    
    // On force la reconstruction des panneaux qui ne sont pas forcément dans updateGameUI
    // ou qui ont leur propre logique de rendu.
    const expeditionWrapper = document.getElementById('expedition-wrapper');
    if (expeditionWrapper && expeditionWrapper.style.display !== 'none') {
        displayExpeditions();
        updatePatrolUI();
        updateDungeonUI();
        renderAdventureTabs();
        const activeActTab = document.querySelector('#aventure-tabs .act-tab.active');
        const actToShow = activeActTab ? parseInt(activeActTab.dataset.act, 10) : 1;
        renderAdventureMap(actToShow);
    }

    const villagePanel = document.getElementById('village-panel');
    if (villagePanel && !villagePanel.classList.contains('hidden')) {
        updateVillageHubUI();
        updateForgeDisplay();
        updateEnchanterUI();
        displayAlchemistUI();
        displayCookUI();
        displayBountyBoard();
        displayBountyMasterShop(gameState.bountyShopFilter);
        displayOracleUI();
    }
    
    const codexPanel = document.getElementById('codex-panel');
    if (codexPanel && !codexPanel.classList.contains('hidden')) {
        updateCodexUI();
    }
    
    const masteryPanel = document.getElementById('maitrise-panel');
    if (masteryPanel && !masteryPanel.classList.contains('hidden')) {
        updateMasteryUI();
    }
    const fiefScreen = document.getElementById('fief-screen');
    if (fiefScreen && !fiefScreen.classList.contains('hidden')) {
        // Ces deux fonctions redessineront l'intégralité du Fief avec la nouvelle langue
        displayFiefUI();
        updateGardenUI();
    }
}

/**
 * Change la langue du jeu, met à jour l'interface et sauvegarde.
 * @param {string} lang - Le code de la langue ('fr' ou 'en').
 */
window.changeLanguage = async function(lang) {
    if (lang === gameState.language) {
        return;
    }

    if (locales[lang]) {
        const startTime = Date.now();
        
        gameState.language = lang; 
        showLoading(t('ui.loading_language_change'));

        generateRandomConstellation();
        generateRandomStars();
        animateLoadingBar(1900);

        try {
            await new Promise(resolve => setTimeout(resolve, 50));

            const creationScreen = document.getElementById('character-creation');
            if (creationScreen && creationScreen.style.display !== 'none') {
                initializeCharacterCreationUI();
            }
            
            applyAllTranslations();
            fullUIUpdateAfterLanguageChange();
            
            saveGame();
            
            showToast(t('alerts.language_changed', { langName: t('language_name') }), 'success');

        } catch (error) {
            console.error(`Erreur lors du changement de langue vers '${lang}':`, error);
            showCustomAlert(t('alerts.language_change_error'));
        } finally {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 2000 - elapsedTime); 

            setTimeout(() => {
                hideLoading();
            }, remainingTime);
        }
    } else {
        console.error(`Langue non disponible : ${lang}`);
    }
}

function showLoading(message = 'Chargement...') {
    const overlay = document.getElementById('loading-overlay');
    const text = document.getElementById('loading-text');
    if (overlay) {
        if (text) {
            text.textContent = message;
        }
        overlay.classList.remove('hidden');
    }
}

/**
 * Cache l'écran de chargement.
 */
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function animateLoadingBar(duration = 2400) {
    const barFill = document.querySelector('#loading-overlay .loading-bar-fill');
    if (!barFill) return;

    // Réinitialise la barre à 0, sans transition, pour les animations futures
    barFill.style.transition = 'none';
    barFill.style.width = '0%';

    // Force le navigateur à appliquer le style "width: 0%" avant d'ajouter la transition
    setTimeout(() => {
        barFill.style.transition = `width ${duration / 1000}s ease-out`;
        barFill.style.width = '100%';
    }, 20);
}

function recalculateMaxEnergy() {
    if (!gameState.player) return;

    let maxEnergy = 200; // Capacité de base

    // MODIFICATION : On utilise le nouveau nom du bâtiment
    const buildingLevel = gameState.fief.buildings.refectoire || 0;
    if (buildingLevel > 0) {
        const buildingData = FIEF_DB.refectoire;
        for (let i = 0; i < buildingLevel; i++) {
            maxEnergy += buildingData.upgrades[i].bonus.value;
        }
    }

    gameState.player.maxEnergy = maxEnergy;
}

// =================================================================================
// GESTION DE LA BOUTIQUE
// =================================================================================

function openBoutique() {
    const boutiqueModal = document.getElementById('boutique-modal');
    if (boutiqueModal) {
        boutiqueModal.classList.remove('hidden');
        updateBoutiqueUI(); 
    }
}

function closeBoutique() {
    const boutiqueModal = document.getElementById('boutique-modal');
    if (boutiqueModal) {
        boutiqueModal.classList.add('hidden');
    }
}

function checkAndResetDailyAds() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    if (!gameState.dailyAdViews || gameState.dailyAdViews.lastReset < today) {
        gameState.dailyAdViews = {
            energy: 0,
            bounty: 0,
            rift_key: 0,
            premium_currency: 0, // AJOUTEZ CETTE LIGNE
            lastReset: today
        };
        console.log("Compteurs de publicités journalières réinitialisés.");
    }
}

// Dans la fonction updateBoutiqueUI()
function updateBoutiqueUI() {
    // AJOUT : On vérifie si la modale est visible avant de faire quoi que ce soit.
    const boutiqueModal = document.getElementById('boutique-modal');
    if (!boutiqueModal || boutiqueModal.classList.contains('hidden')) {
        return; // Si la boutique n'est pas ouverte, on ne fait rien.
    }

    if (!gameState.player || !gameState.dailyAdViews) return;

    checkAndResetDailyAds();

    // Le reste du code est identique, mais maintenant protégé.
    document.getElementById('ad-energy-count').textContent = gameState.dailyAdViews.energy;
    document.getElementById('ad-bounty-count').textContent = gameState.dailyAdViews.bounty;
    document.getElementById('ad-rift-key-count').textContent = gameState.dailyAdViews.rift_key;
    document.getElementById('ad-premium-count').textContent = gameState.dailyAdViews.premium_currency;

    document.getElementById('ad-energy-button').disabled = gameState.dailyAdViews.energy >= 3;
    document.getElementById('ad-bounty-button').disabled = gameState.dailyAdViews.bounty >= 3;
    document.getElementById('ad-rift-key-button').disabled = gameState.dailyAdViews.rift_key >= 3;
    document.getElementById('ad-premium-button').disabled = gameState.dailyAdViews.premium_currency >= 3;
    
    setText('#boutique-content h2', 'ui.shop.title');
    setText('#shop-title-upgrades', 'ui.shop.upgrades_title');
    setText('#shop-title-packs', 'ui.shop.packs_title');
    setText('#shop-title-free', 'ui.shop.free_rewards_title');
    setText('#shop-title-currency', 'ui.shop.premium_currency_title');
    setText('#boutique-modal .modal-close-button', 'ui.buttons.close');
    setText('#ad-energy-button', 'ui.shop.watch_ad_button');
    setText('#ad-bounty-button', 'ui.shop.watch_ad_button');
    setText('#ad-rift-key-button', 'ui.shop.watch_ad_button');
    setText('#ad-premium-button', 'ui.shop.watch_ad_button');
}

window.watchAdFor = function(type) {
    checkAndResetDailyAds();

    const dailyLimits = {
        energy: 3,
        bounty: 3,
        rift_key: 3,
        premium_currency: 3 // AJOUTEZ CETTE LIGNE
    };

    if (gameState.dailyAdViews[type] >= dailyLimits[type]) {
        showToast(t('alerts.ads.limit_reached'), 'error');
        return;
    }

    // --- SIMULATION DE LA PUBLICITÉ ---
    console.log(`Simulation du visionnage d'une pub pour : ${type}`);
    showToast(t('alerts.ads.reward_granted'), 'success');
    // --- FIN DE LA SIMULATION ---

    gameState.dailyAdViews[type]++;

    switch (type) {
        case 'energy':
            gameState.player.energy = Math.min(gameState.player.maxEnergy, gameState.player.energy + 20);
            break;
        case 'bounty':
            gameState.player.resources.bounty_tokens = (gameState.player.resources.bounty_tokens || 0) + 1;
            break;
        case 'rift_key':
            gameState.player.resources.cle_de_la_breche = (gameState.player.resources.cle_de_la_breche || 0) + 1;
            break;
        // AJOUTEZ CE BLOC
        case 'premium_currency':
            gameState.player.resources.eclats_ascension = (gameState.player.resources.eclats_ascension || 0) + 5;
            break;
        // FIN DE L'AJOUT
    }

    updateGameUI();
    updateBoutiqueUI();
    saveGame();
}

window.showPackDetails = function(packId) {
    const modal = document.getElementById('pack-details-modal');
    const titleEl = document.getElementById('pack-details-title');
    const contentEl = document.getElementById('pack-details-content-display');
    const buyButton = document.getElementById('pack-details-buy-button');

    if (!modal || !titleEl || !contentEl || !buyButton) return;

    // Récupération des données depuis les locales
    const title = t(`ui.shop.pack_${packId}_title`);
    const description = t(`ui.shop.pack_${packId}_description`);
    
    // Mappage des prix
    const prices = {
        starter: "2.99€",
        monthly: "9.99€"
    };

    // Remplissage de la modale
    titleEl.textContent = title;
    contentEl.innerHTML = description.replace(/\n/g, '<br>'); // Remplace les sauts de ligne par des balises <br>
    buyButton.textContent = `Acheter (${prices[packId] || '?.??€'})`;
    
    // Logique d'achat (à implémenter plus tard)
    buyButton.onclick = () => {
        alert(`Logique d'achat pour le pack "${packId}" à implémenter.`);
    };

    modal.classList.remove('hidden');
}

/**
 * Ferme la fenêtre modale des détails de pack.
 */
window.closePackDetails = function() {
    const modal = document.getElementById('pack-details-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function openProfileModal() {
    if (!window.firebaseTools.auth.currentUser) {
        // Cette ligne utilise déjà une traduction, c'est parfait.
        showToast(t('errors.login_required_profile'), "error"); 
        return;
    }
    const modal = document.getElementById('profile-modal');
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.getElementById('main-menu').classList.add('hidden');

    // Traduction des éléments statiques de la modale
    setText('#profile-title', 'ui.profile.title');
    setText('#change-avatar-button', 'ui.profile.change_avatar');
    setText('#profile-upload-limits', 'ui.profile.upload_limits');
    setText('#profile-manage-frames-btn', 'ui.profile.manage_frames');
    setText('#profile-modal .modal-close-button', 'ui.buttons.close');

    updateProfileUI();

    const uploadInput = document.getElementById('profile-picture-upload');
    uploadInput.onchange = handleProfilePictureUpload;
    document.getElementById('change-avatar-button').onclick = handleChangeAvatarClick;
    
    if (profileUpdateInterval) clearInterval(profileUpdateInterval);
    profileUpdateInterval = setInterval(updateProfileCooldown, 1000);
}

function closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    if (profileUpdateInterval) clearInterval(profileUpdateInterval);
}

function updateProfileUI() {
    if (!gameState.player) return;

    const player = gameState.player;
    const profileUsernameDisplay = document.getElementById('profile-username-display');
    const profilePictureImg = document.getElementById('profile-picture-img');
    const profileFrameImg = document.getElementById('profile-frame-img');

    if (profileUsernameDisplay) {
        profileUsernameDisplay.textContent = player.name;
    }

    if (profilePictureImg) {
        profilePictureImg.src = player.profilePictureUrl || CLASS_DATA_DB[player.class]?.portrait || 'assets/sprites/portraits/default_avatar.png';
    }

    if (profileFrameImg) {
        const frameId = player.equippedFrame || 'default';
        // MON COMMENTAIRE : On utilise maintenant la base de données pour obtenir le chemin de l'image,
        // ce qui corrige l'erreur 404 et assure la cohérence.
        const frameData = FRAMES_DB[frameId] || FRAMES_DB['default'];
        profileFrameImg.src = frameData.image;
    }

    updateProfileCooldown();
}

function updateProfileCooldown() {
    const cooldownEl = document.getElementById('profile-picture-cooldown');
    if (!cooldownEl || !gameState.player) return;

    const lastChange = gameState.player.lastProfilePictureChange || 0;
    const cooldownMs = 72 * 60 * 60 * 1000;
    const nextChangeTime = lastChange + cooldownMs;
    const timeLeftMs = Math.max(0, nextChangeTime - Date.now());

    if (timeLeftMs > 0) {
        const hours = Math.floor(timeLeftMs / 3600000).toString().padStart(2, '0');
        const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        cooldownEl.innerHTML = t('ui.profile.cooldown_active', { time: timeString }) + 
        ` <button class="link-button bypass-cost" onclick="bypassAvatarCooldown()">${t('ui.profile.bypass_cooldown', { cost: 50 })}</button>`;
    } else {
        cooldownEl.innerHTML = '';
    }
}

async function handleProfilePictureUpload() {
    const uploadInput = document.getElementById('profile-picture-upload');
    const file = uploadInput.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast(t('ui.profile.upload_invalid_type'), 'error');
        return;
    }
    if (file.size > 1 * 1024 * 1024) { // 1MB limit
        showToast(t('ui.profile.upload_too_large'), 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const modal = document.getElementById('cropper-modal');
        const image = document.getElementById('cropper-image');
        
        // Traduction des boutons du cropper
        setText('#cropper-title', 'ui.cropper_modal.title');
        setText('#cropper-cancel', 'ui.cropper_modal.cancel_button');
        setText('#cropper-confirm', 'ui.cropper_modal.confirm_button');

        image.src = e.target.result;
        modal.classList.remove('hidden');

        if (cropper) cropper.destroy();
        cropper = new Cropper(image, { aspectRatio: 1, viewMode: 1, background: false, autoCropArea: 0.8 });
        
        document.getElementById('cropper-zoom-in').onclick = () => cropper.zoom(0.1);
        document.getElementById('cropper-zoom-out').onclick = () => cropper.zoom(-0.1);
        document.getElementById('cropper-cancel').onclick = () => { modal.classList.add('hidden'); cropper.destroy(); cropper = null; };

        document.getElementById('cropper-confirm').onclick = () => {
            cropper.getCroppedCanvas({ width: 256, height: 256, imageSmoothingQuality: 'high' }).toBlob(async (blob) => {
                try {
                    const { auth, storage, ref, uploadBytes, getDownloadURL } = window.firebaseTools;
                    const userId = auth.currentUser.uid;
                    const storageRef = ref(storage, `profile-pictures/${userId}`);

                    await uploadBytes(storageRef, blob);
                    const downloadURL = await getDownloadURL(storageRef);

                    gameState.player.profilePictureUrl = downloadURL;
                    gameState.player.lastProfilePictureChange = Date.now();
                    saveGame();

                    updateProfileUI();
                    showToast(t('ui.profile.upload_success'), 'success');
                } catch (error) {
                    console.error("Upload Error:", error);
                    showToast(t('ui.profile.upload_error', { error: error.code }), 'error');
                } finally {
                    modal.classList.add('hidden');
                    cropper.destroy();
                    cropper = null;
                }
            }, 'image/jpeg', 0.85);
        };
    };
    reader.readAsDataURL(file);
    uploadInput.value = '';
}

function equipFrame(frameId) {
    if (!gameState.player) return;
    gameState.player.equippedFrame = frameId;
    saveGame();
    updateProfileUI();
    updateGameUI(); // AJOUT : Met à jour l'interface générale, y compris le header.
}

// =================================================================================
// NOUVELLES FONCTIONS : GESTION DES SIGNALEMENTS
// =================================================================================

function openReportPlayerModal(userId, userName) {
    const modal = document.getElementById('report-player-modal');
    const form = document.getElementById('report-player-form');

    // Pré-remplir les champs cachés
    document.getElementById('reported-user-id').value = userId;
    document.getElementById('reported-user-name').value = userName;

    // Réinitialiser le formulaire
    form.reset();
    document.getElementById('report-player-status').textContent = '';
    
    // On attache l'événement de soumission ici pour éviter les doublons
    form.onsubmit = handlePlayerReportSubmit;

    modal.classList.remove('hidden');
}

function closeReportPlayerModal() {
    document.getElementById('report-player-modal').classList.add('hidden');
}

async function handlePlayerReportSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const statusEl = document.getElementById('report-player-status');
    const submitButton = form.querySelector('button[type="submit"]');

    statusEl.textContent = t('ui.report_player.status_sending');
    submitButton.disabled = true;

    try {
        const response = await fetch("https://formspree.io/f/mldlvzea", { // VOTRE URL FORMSPREE
            method: "POST",
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            statusEl.textContent = t('ui.report_player.status_success');
            statusEl.style.color = "#28a745";
            setTimeout(closeReportPlayerModal, 2000);
        } else {
            statusEl.textContent = t('ui.report_player.status_error');
            statusEl.style.color = "#dc3545";
        }
    } catch (error) {
        statusEl.textContent = t('ui.report_player.status_error');
        statusEl.style.color = "#dc3545";
    } finally {
        submitButton.disabled = false;
    }
}


async function openPlayerProfileModal(userId, userName) {
    const modal = document.getElementById('player-profile-modal');
    if (!modal) return;

    // Afficher un état de chargement
    document.getElementById('player-profile-name').textContent = "Chargement...";
    document.getElementById('player-profile-level').textContent = "";
    document.getElementById('player-profile-stats').innerHTML = "";
    document.getElementById('player-profile-report-button').style.display = 'none';
    modal.classList.remove('hidden');

    const { db, doc, getDoc } = window.firebaseTools;
    try {
        const docRef = doc(db, "players", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const player = data.player;
            const totalKills = Object.values(player.killCount || {}).reduce((a, b) => a + b, 0);

            // Mise à jour de l'UI avec les données
            document.getElementById('player-profile-title').textContent = t('ui.profile.public_title', { playerName: player.name });
            document.getElementById('player-profile-name').textContent = player.name;
            document.getElementById('player-profile-level').textContent = t('ui.profile.level_display', { level: player.level, ascLvl: data.ascensionLevel || 0 });

            const profilePic = player.profilePictureUrl || CLASS_DATA_DB[player.class]?.portrait || 'assets/sprites/portraits/default_avatar.png';
            document.getElementById('player-profile-picture-img').src = profilePic;

            const frameId = player.equippedFrame || 'default';
            // MON COMMENTAIRE : C'est ici que se trouve la correction.
            // On utilise la base de données FRAMES_DB pour obtenir le chemin de l'image du cadre.
            const frameData = FRAMES_DB[frameId] || FRAMES_DB['default'];
            document.getElementById('player-profile-frame-img').src = frameData.image;

            const statsToShow = {
                powerScore: data.powerScore || 0,
                dungeonHighestFloor: data.dungeonHighestFloor || 0,
                bossesKilled: data.bossesKilled || 0,
                enemiesKilled: totalKills,
            };

            const statsContainer = document.getElementById('player-profile-stats');
            statsContainer.innerHTML = ''; // Nettoyer
            for (const statKey in statsToShow) {
                const statName = t(`ui.leaderboard.player_profile_stats.${statKey}`);
                statsContainer.innerHTML += `
                    <div class="stat-item">
                        <div class="stat-text">
                            <span>${statName}</span>
                            <strong>${statsToShow[statKey].toLocaleString()}</strong>
                        </div>
                    </div>
                `;
            }

            // Configurer le bouton de signalement
            const reportButton = document.getElementById('player-profile-report-button');
            reportButton.textContent = t('ui.report_player.button_text');
            reportButton.onclick = () => openReportPlayerModal(userId, player.name);
            reportButton.style.display = 'block';

        } else {
            document.getElementById('player-profile-name').textContent = "Joueur introuvable.";
        }

    } catch (error) {
        console.error("Erreur lors de la récupération du profil joueur :", error);
        document.getElementById('player-profile-name').textContent = "Erreur de chargement.";
    }
}

function closePlayerProfileModal() {
    const modal = document.getElementById('player-profile-modal');
    if (modal) modal.classList.add('hidden');
}


function openFramesModal() {
    const modal = document.getElementById('frames-modal');
    if (modal) {
        // Traduction des éléments statiques
        setText('#frames-title', 'ui.frames_modal.title');
        setText('#frame-select-button', 'ui.frames_modal.select_button');
        setText('#frames-modal .modal-close-button', 'ui.buttons.close');

        modal.classList.remove('hidden');
        displayFrameSelection();
    }
}

function closeFramesModal() {
    const modal = document.getElementById('frames-modal');
    if (modal) modal.classList.add('hidden');
}

function displayFrameSelection() {
    if (!gameState.player) return;

    const grid = document.getElementById('frames-grid');
    const detailsPanel = document.getElementById('frame-details-panel');
    const selectButton = document.getElementById('frame-select-button');

    grid.innerHTML = '';
    detailsPanel.classList.add('hidden');
    selectButton.disabled = true;

    const unlockedFrames = gameState.player.unlockedFrames || ['default'];
    let selectedFrameId = null;

    for (const frameId in FRAMES_DB) {
        const frameData = FRAMES_DB[frameId];
        const isOwned = unlockedFrames.includes(frameId);

        const frameDiv = document.createElement('div');
        frameDiv.className = 'frame-preview';
        if (!isOwned) frameDiv.classList.add('locked');
        frameDiv.dataset.frameId = frameId;
        frameDiv.innerHTML = `<img src="${frameData.image}" alt="${t(frameData.nameKey)}">`;

        frameDiv.onclick = () => {
            selectedFrameId = frameId;
            document.querySelectorAll('.frame-preview').forEach(f => f.classList.remove('selected'));
            frameDiv.classList.add('selected');

            setText('#frame-details-name', frameData.nameKey);
            setText('#frame-details-description', frameData.descriptionKey);

            const statusEl = document.getElementById('frame-details-status');
            if (isOwned) {
                statusEl.innerHTML = `<span class="status-owned">${t('ui.frames_modal.status_owned')}</span>`;
                selectButton.disabled = false;
            } else {
                let unlockCondition = t(`ui.frames_modal.unlock_${frameId}`) || "";
                statusEl.innerHTML = `<span class="status-locked">${unlockCondition}</span>`;
                selectButton.disabled = true;
            }
            detailsPanel.classList.remove('hidden');
        };
        grid.appendChild(frameDiv);
    }

    selectButton.onclick = () => {
        if (selectedFrameId) {
            equipFrame(selectedFrameId);
            closeFramesModal();
        }
    };
}

window.dev_setFrame = function(frameId, unlock = true) {
    if (!gameState.player) {
        console.error("Aucun joueur chargé.");
        return;
    }
    if (!FRAMES_DB[frameId]) {
        console.error(`Cadre inconnu : "${frameId}". Cadres valides : ${Object.keys(FRAMES_DB).join(', ')}`);
        return;
    }

    // Initialise le tableau s'il n'existe pas
    if (!gameState.player.unlockedFrames) {
        gameState.player.unlockedFrames = ['default'];
    }

    const frameIndex = gameState.player.unlockedFrames.indexOf(frameId);

    if (unlock) {
        if (frameIndex === -1) {
            gameState.player.unlockedFrames.push(frameId);
            console.log(`%cCadre "${frameId}" débloqué !`, 'color: #28a745; font-weight: bold;');
        } else {
            console.warn(`Cadre "${frameId}" déjà débloqué.`);
        }
    } else {
        // On ne peut pas verrouiller le cadre par défaut
        if (frameId === 'default') {
            console.error("Le cadre 'default' ne peut pas être verrouillé.");
            return;
        }
        if (frameIndex !== -1) {
            gameState.player.unlockedFrames.splice(frameIndex, 1);
            // Si on verrouille le cadre actuellement équipé, on repasse au défaut
            if (gameState.player.equippedFrame === frameId) {
                gameState.player.equippedFrame = 'default';
            }
            console.log(`%cCadre "${frameId}" verrouillé.`, 'color: #dc3545; font-weight: bold;');
        } else {
            console.warn(`Cadre "${frameId}" déjà verrouillé.`);
        }
    }

    saveGame();
    // On met à jour les interfaces si elles sont ouvertes
    if (!document.getElementById('profile-modal').classList.contains('hidden')) {
        updateProfileUI();
    }
    if (!document.getElementById('frames-modal').classList.contains('hidden')) {
        displayFrameSelection();
    }
}

async function handleChangeAvatarClick() {
    const uploadInput = document.getElementById('profile-picture-upload');
    const lastChange = gameState.player.lastProfilePictureChange || 0;
    const cooldownMs = 72 * 60 * 60 * 1000;
    const onCooldown = Date.now() < (lastChange + cooldownMs);

    if (onCooldown) {
        const nextChangeTime = lastChange + cooldownMs;
        const timeLeftMs = Math.max(0, nextChangeTime - Date.now());
        const hours = Math.floor(timeLeftMs / 3600000).toString().padStart(2, '0');
        const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        const cost = 50;

        const confirmed = await showCustomConfirm(
            t('ui.profile.bypass_confirm_body', { time: timeString, cost: cost }),
            t('ui.profile.bypass_button_label', { cost: cost }),
            t('ui.buttons.cancel')
        );

        if (confirmed) {
            bypassAvatarCooldown();
        }
    } else {
        uploadInput.onchange = handleProfilePictureUpload;
        uploadInput.click();
    }
}

function bypassAvatarCooldown() {
    const cost = 50;
    if ((gameState.player.resources.eclats_ascension || 0) < cost) {
        showToast(t('ui.profile.not_enough_shards'), 'error');
        return;
    }
    gameState.player.resources.eclats_ascension -= cost;
    gameState.player.lastProfilePictureChange = 0;

    showToast(t('ui.profile.bypass_success'), 'success');
    
    updateProfileUI();
    updateGameUI();
    saveGame();
}

function openInventoryModal() {
    const modal = document.getElementById('inventory-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        updateFullInventoryUI(); 
        updateInventorySortButton(); // Met à jour le bouton à l'ouverture

        if (!modal.dataset.listenersAttached) {
            document.querySelectorAll('.inventory-tab-button').forEach(button => {
                button.addEventListener('click', () => switchInventoryTab(button.dataset.tab));
            });
            // Les écouteurs sur les 'select' sont maintenant inutiles
            modal.dataset.listenersAttached = 'true';
        }
    }
}

function switchInventoryTab(tabName) {
    document.querySelectorAll('.inventory-tab-pane').forEach(pane => pane.classList.remove('active'));
    document.querySelectorAll('.inventory-tab-button').forEach(button => button.classList.remove('active'));

    document.getElementById(`inventory-tab-${tabName}`).classList.add('active');
    document.querySelector(`.inventory-tab-button[data-tab="${tabName}"]`).classList.add('active');

    updateFullInventoryUI();
    updateInventorySortButton(); // Met à jour le bouton à chaque changement d'onglet
}

function renderInventoryResources() {
    const listContainer = document.getElementById('inventory-resources-list');
    const sortMethod = gameState.inventorySortState.resources;
    listContainer.innerHTML = '';

    const resourceGroups = {
        base: ['bois', 'metal', 'tissu'],
        currency: ['fragments', 'eclats_ascension', 'marques_de_chasse', 'eclats_instables'],
        utility: ['bounty_tokens', 'cle_de_la_breche'],
        rare: ['coeur_de_golem', 'essence_spectrale', 'chitine_renforcee', 'plume_de_griffon', 'sang_de_basilic', 'oeil_de_chimere', 'ecaille_de_profond', 'totem_orc', "fragment_d_ame_de_demon", 'coeur_de_dragon_ancien', "larme_d_archange", 'poussiere_de_vide'],
        garden: ['herbes_medicinales', 'Cristal de Givre', 'Fleur de Lave', 'Graine Solaire', 'Racine Terreuse', 'Tournesol Radieux', 'Lys de Givre', 'Champignon Terreux', 'Fleur de Rosée', 'Rose Sanguine']
    };
    let allResources = Object.entries(gameState.player.resources).map(([key, value]) => ({ key, value })).filter(r => r.value > 0);
    
    // Logique de tri (inchangée)
    if (sortMethod === 'logical') {
        const orderedResources = [], addedKeys = new Set();
        Object.values(resourceGroups).forEach(group => {
            group.forEach(resKey => {
                const resource = allResources.find(r => r.key === resKey);
                if (resource && !addedKeys.has(resKey)) { orderedResources.push(resource); addedKeys.add(resKey); }
            });
        });
        allResources.forEach(res => { if (!addedKeys.has(res.key)) orderedResources.push(res); });
        allResources = orderedResources;
    } else if (sortMethod === 'alpha') {
        allResources.sort((a, b) => (t(`stats.displayNames.${a.key}`) || a.key).localeCompare(t(`stats.displayNames.${b.key}`) || b.key));
    } else if (sortMethod === 'quantity_desc') {
        allResources.sort((a, b) => b.value - a.value);
    } else if (sortMethod === 'quantity_asc') {
        allResources.sort((a, b) => a.value - b.value);
    }

    allResources.forEach(({ key, value }) => {
        const name = t(`stats.displayNames.${key}`) || key;
        const icon = SPRITE_PATHS[key] || SPRITE_PATHS[name];
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-grid-item';
        itemDiv.innerHTML = `
            <img src="${icon}" alt="${name}">
            <span class="inventory-item-quantity-overlay">${Math.floor(value).toLocaleString()}</span>
        `;
        
        const itemDetails = {
            icon: icon,
            nameHTML: name,
            quantity: value,
            description: t('ui.item_details.resource_desc'),
            statsHTML: ''
        };
        itemDiv.onclick = () => openItemDetailsModal(itemDetails);

        listContainer.appendChild(itemDiv);
    });
}

function renderInventoryConsumables() {
    const listContainer = document.getElementById('inventory-consumables-list');
    const sortMethod = gameState.inventorySortState.consumables;
    listContainer.innerHTML = '';

    const foodItems = gameState.player.inventory.filter(item => item.isFood);
    const potionItems = Object.entries(gameState.player.consumables).map(([id, quantity]) => (quantity > 0 ? {...CONSUMABLES_DB[id], quantity } : null)).filter(Boolean);
    let allConsumables = [
        ...foodItems.map(f => ({...f, name: t(COOKING_RECIPES_DB[f.id].nameKey), quantity: 1, description: t(COOKING_RECIPES_DB[f.id].descriptionKey)})),
        ...potionItems.map(p => ({...p, name: t(p.nameKey), description: t(p.descriptionKey)}))
    ];
    
    if (sortMethod === 'alpha') { allConsumables.sort((a, b) => a.name.localeCompare(b.name)); } 
    else if (sortMethod === 'quantity_desc') { allConsumables.sort((a, b) => b.quantity - a.quantity); } 
    else if (sortMethod === 'quantity_asc') { allConsumables.sort((a, b) => a.quantity - b.quantity); }

    allConsumables.forEach(item => {
        const isFood = !!item.isFood;
        const itemData = isFood ? COOKING_RECIPES_DB[item.id] : CONSUMABLES_DB[item.id];
        const name = t(itemData.nameKey);
        const description = t(itemData.descriptionKey);
        const icon = SPRITE_PATHS[item.id] || 'assets/sprites/icons/default_consumable.png';
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-grid-item';
        itemDiv.innerHTML = `
            <img src="${icon}" alt="${name}">
            <span class="inventory-item-quantity-overlay">x${item.quantity}</span>
        `;

        const statsHTML = isFood ? `<p><strong>${t('ui.item_details.bonus')}:</strong> ${formatStatsToString(item.bonus)}</p>` : '';
        
        const itemDetails = {
            icon: icon,
            nameHTML: name,
            quantity: item.quantity,
            description: description,
            statsHTML: statsHTML
        };
        itemDiv.onclick = () => openItemDetailsModal(itemDetails);
        
        listContainer.appendChild(itemDiv);
    });
}

function renderInventoryEquipment() {
    const listContainer = document.getElementById('inventory-equipment-list');
    const sortMethod = gameState.inventorySortState.equipment;
    listContainer.innerHTML = '';
    
    const itemGroups = new Map();
    gameState.player.inventory.filter(item => !item.isFood && item.type).forEach(item => {
        const uniqueId = `${item.id}-${item.isLocked}-${item.enchanter?.affixKey || ''}`;
        if (!itemGroups.has(uniqueId)) {
            itemGroups.set(uniqueId, { item: item, count: 0 });
        }
        itemGroups.get(uniqueId).count++;
    });

    let equipment = Array.from(itemGroups.values());

    if (sortMethod === 'rarity') { equipment.sort((a, b) => RARITY_ORDER.indexOf(b.item.rarity) - RARITY_ORDER.indexOf(a.item.rarity) || t(a.item.nameKey).localeCompare(t(b.item.nameKey))); } 
    else if (sortMethod === 'type') { equipment.sort((a, b) => t(`ui.equipment_slots.${a.item.type}`).localeCompare(t(`ui.equipment_slots.${b.item.type}`)) || RARITY_ORDER.indexOf(b.item.rarity) - RARITY_ORDER.indexOf(a.item.rarity)); } 
    else if (sortMethod === 'alpha') { equipment.sort((a, b) => t(a.item.nameKey).localeCompare(t(b.item.nameKey))); }

    equipment.forEach(({ item, count }) => {
        const name = t(item.nameKey);
        const colorClass = RARITY_CONFIG[item.rarity]?.colorClass || 'rarity-common';
        const icon = SPRITE_PATHS[item.type] || 'assets/sprites/icons/default_item.png';

        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-grid-item';
        itemDiv.innerHTML = `
            <img src="${icon}" alt="${name}">
            <div class="rarity-indicator ${colorClass}"></div>
            ${count > 1 ? `<span class="inventory-item-quantity-overlay">x${count}</span>` : ''}
        `;
        
        const itemDetails = {
            icon: icon,
            nameHTML: `<span class="${colorClass}">${name}</span>`,
            quantity: count,
            description: `${t(`ui.equipment_slots.${item.type}`)} - ${t(RARITY_CONFIG[item.rarity].nameKey)}`,
            statsHTML: `<p><strong>${t('ui.item_details.stats')}:</strong><br>${formatStatsForTooltip(item.stats)}</p>`
        };
        itemDiv.onclick = () => openItemDetailsModal(itemDetails);

        listContainer.appendChild(itemDiv);
    });
}

function closeInventoryModal() {
    const modal = document.getElementById('inventory-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

function updateFullInventoryUI() {
    const activeTab = document.querySelector('.inventory-tab-button.active').dataset.tab;
    if (activeTab === 'resources') {
        renderInventoryResources();
    } else if (activeTab === 'consumables') {
        renderInventoryConsumables();
    } else if (activeTab === 'equipment') {
        renderInventoryEquipment();
    }
}


function cycleInventorySort() {
    const activeTab = document.querySelector('.inventory-tab-button.active').dataset.tab;
    const sortOrders = INVENTORY_SORT_ORDERS[activeTab];
    
    const currentSortKey = gameState.inventorySortState[activeTab];
    const currentIndex = sortOrders.findIndex(order => order.key === currentSortKey);
    
    const nextIndex = (currentIndex + 1) % sortOrders.length;
    const nextSortKey = sortOrders[nextIndex].key;
    
    gameState.inventorySortState[activeTab] = nextSortKey;
    
    updateFullInventoryUI();
    
    // Cette ligne, maintenant que le bouton est unique, mettra bien à jour l'icône.
    updateInventorySortButton();

    saveGame();
}

function updateInventorySortButton() {
    const sortButton = document.getElementById('inventory-sort-button');
    if (!sortButton) return;

    const activeTab = document.querySelector('.inventory-tab-button.active').dataset.tab;
    const currentSortKey = gameState.inventorySortState[activeTab];
    const sortInfo = INVENTORY_SORT_ORDERS[activeTab].find(order => order.key === currentSortKey);
    
    if (sortInfo) {
        sortButton.innerHTML = sortInfo.emoji;
        sortButton.title = t(`ui.inventory_modal.sort_${sortInfo.key}`);
    }
}

function openItemDetailsModal(itemDetails) {
    const modal = document.getElementById('inventory-item-details-modal');
    if (!modal) return;

    document.getElementById('item-details-img').src = itemDetails.icon;
    document.getElementById('item-details-name').innerHTML = itemDetails.nameHTML;
    document.getElementById('item-details-quantity').textContent = `${t('ui.item_details.quantity')}: ${itemDetails.quantity.toLocaleString()}`;
    document.getElementById('item-details-description').textContent = itemDetails.description;
    document.getElementById('item-details-stats').innerHTML = itemDetails.statsHTML;

    modal.classList.remove('hidden');
}

function closeItemDetailsModal() {
    document.getElementById('inventory-item-details-modal').classList.add('hidden');
}

window.switchScreen = function(screenId, isFromCombat = false) {
    if (fiefUpdateInterval) clearInterval(fiefUpdateInterval);

    // On ne met à jour lastActiveScreen que pour les onglets principaux
    const mainScreens = ['personnage', 'village', 'aventure', 'fief', 'social'];
    if (mainScreens.includes(screenId)) {
        lastActiveScreen = screenId;
    }

    if (!isFromCombat) {
        if (screenId === 'aventure') lastActiveSubTab = { action: 'switchAdventureTab', arg: 'aventure' };
        if (screenId === 'village') lastActiveSubTab = { action: 'openBuildingView', arg: 'hub' };
        if (screenId === 'personnage') lastActiveSubTab = { action: 'switchCharacterTab', arg: 'personnage' };
        if (screenId === 'social') lastActiveSubTab = { action: 'switchSocialTab', arg: 'guilde' };
        if (screenId === 'fief') lastActiveSubTab = { action: 'switchFiefTab', arg: 'buildings' };
    }

    document.querySelectorAll('.main-screen').forEach(screen => {
        screen.classList.add('hidden');
    });

    // Pour "codex" et "maitrise", l'écran principal à afficher est "personnage-screen"
    const mainScreenId = (screenId === 'codex' || screenId === 'maitrise') ? 'personnage' : screenId;
    const screenToShow = document.getElementById(mainScreenId + '-screen');
    if (screenToShow) {
        screenToShow.classList.remove('hidden');
    }

    document.querySelectorAll('#bottom-nav .nav-button').forEach(button => {
        button.classList.remove('active');
    });
    const buttonIdToActivate = mainScreenId;
    const activeButton = document.querySelector(`#bottom-nav .nav-button[data-screen="${buttonIdToActivate}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    const subNavScreens = ['aventure', 'village', 'personnage', 'social', 'fief'];
    document.body.classList.remove('sub-nav-active', 'aventure-active', 'village-active', 'personnage-active', 'social-active', 'fief-active');

    if (subNavScreens.includes(mainScreenId)) {
        document.body.classList.add('sub-nav-active');
        document.body.classList.add(mainScreenId + '-active');
    }
    
    updateSubNavVisibility(mainScreenId);

    if (screenId === 'personnage' || screenId === 'codex' || screenId === 'maitrise') {
        switchCharacterTab(screenId);
        switchCharacterTab(screenId);
    } else if (screenId === 'village') {
        if (lastActiveSubTab.action === 'openBuildingView') {
            openBuildingView(lastActiveSubTab.arg);
        } else {
            showVillageHub();
        }
    } else if (screenId === 'social') {
        switchSocialTab(lastActiveSubTab.arg || 'guilde');
    } else if (screenId === 'aventure') {
        const highestAct = getHighestUnlockedAct();
        renderAdventureTabs(highestAct);
        renderAdventureMap(highestAct);
    } else if (screenId === 'fief') {
        showFiefScreen();
    }
};

function updateSubNavVisibility(activeScreenId) {
    document.querySelectorAll('.sub-nav').forEach(nav => nav.classList.add('hidden'));

    const activeSubNav = document.getElementById(activeScreenId + '-subnav');
    if (activeSubNav) {
        activeSubNav.classList.remove('hidden');

        const features = gameState.unlockedFeatures || {};
        activeSubNav.querySelectorAll('.sub-nav-button').forEach(button => {
            const featureId = button.dataset.featureId;
            if (featureId) {
                let isUnlocked = features[featureId] === true;

                // Logique spécifique pour le bouton du boss de guilde
                if (featureId === 'guild_boss') {
                    isUnlocked = gameState.player.guildId && guildDataCache && guildDataCache.level >= 3;
                    if (!isUnlocked) {
                        button.title = t('ui.guild.boss_unlock_level', { level: 3 });
                    }
                }

                button.classList.toggle('disabled', !isUnlocked);

                if (!isUnlocked && featureId !== 'guild_boss') {
                    button.title = t(`ui.unlock_prompts.${featureId}`) || "Fonctionnalité non débloquée";
                } else if (isUnlocked) {
                    button.title = '';
                }
            }
        });
    }
}

window.switchAdventureTab = function(tabName) {
    lastActiveSubTab = { action: 'switchAdventureTab', arg: tabName };
    // Cache tous les panneaux de contenu de cette section
    document.querySelectorAll('#aventure-screen .expedition-tab-content').forEach(content => content.classList.add('hidden'));
    
    const contentToShow = document.getElementById(tabName + '-content');
    if (contentToShow) {
        contentToShow.classList.remove('hidden');
    }

    // Retire le style "actif" de tous les boutons
    // CORRECTION : J'ai mis à jour la logique pour qu'elle corresponde à celle du Fief
    document.querySelectorAll('#aventure-subnav .sub-nav-button').forEach(button => {
        button.classList.toggle('active', button.dataset.arg === tabName);
    });

    // Si on active l'onglet aventure, on s'assure que la carte est bien dessinée
    if (tabName === 'aventure') {
        const highestAct = getHighestUnlockedAct(); // On récupère le plus haut acte débloqué.
        renderAdventureTabs(); // On s'assure que les onglets des actes sont à jour.
        
        // On active le bon onglet d'acte visuellement.
        document.querySelectorAll('.act-tab').forEach(btn => btn.classList.remove('active'));
        const newActiveTab = document.getElementById(`act-tab-${highestAct}`);
        if (newActiveTab) {
            newActiveTab.classList.add('active');
        }
        
        renderAdventureMap(highestAct); // On dessine la carte du bon acte.
    }
}

window.switchFiefTab = function(tabName) {
    lastActiveSubTab = { action: 'switchFiefTab', arg: tabName };
    // Cache tous les panneaux du Fief
    document.querySelectorAll('.fief-pane').forEach(pane => pane.classList.add('hidden'));
    
    // Affiche le panneau sélectionné
    const paneToShow = document.getElementById(`fief-${tabName}-pane`);
    if (paneToShow) {
        paneToShow.classList.remove('hidden');
    }

    // Met à jour l'état actif des boutons
    document.querySelectorAll('#fief-subnav .sub-nav-button').forEach(button => {
        button.classList.toggle('active', button.dataset.arg === tabName);
    });
}

function switchCharacterTab(tabName) {
    lastActiveSubTab = { action: 'switchCharacterTab', arg: tabName };
    
    document.getElementById('personnage-screen').classList.add('hidden');
    document.getElementById('codex-screen').classList.add('hidden');
    document.getElementById('maitrise-screen').classList.add('hidden');

    const screenToShow = document.getElementById(tabName + '-screen');
    if (screenToShow) {
        screenToShow.classList.remove('hidden');
    }

    document.querySelectorAll('#personnage-subnav .sub-nav-button').forEach(button => {
        button.classList.toggle('active', button.dataset.arg === tabName);
    });

    if(tabName === 'codex') updateCodexUI();
    if(tabName === 'maitrise') updateMasteryUI();
}

function switchSocialTab(tabName) {
    lastActiveSubTab = { action: 'switchSocialTab', arg: tabName };
    document.querySelectorAll('#social-screen > div').forEach(pane => pane.classList.add('hidden'));

    // CORRECTION : J'utilise 'let' au lieu de 'const' pour permettre la réassignation de la variable.
    let paneId = (tabName === 'guilde' || tabName === 'boss') ? 'guild-content' : `${tabName}-content`;
    if (tabName === 'boss') {
        paneId = 'guild-boss-content';
    }

    const paneToShow = document.getElementById(paneId);

    if (paneToShow) {
        paneToShow.classList.remove('hidden');
    }

    document.querySelectorAll('#social-subnav .sub-nav-button').forEach(button => {
        button.classList.toggle('active', button.dataset.arg === tabName);
    });

    if (tabName === 'guilde') {
        updateGuildUI();
    } else if (tabName === 'chat') {
        initializeChatScreen();
    } else if (tabName === 'boss') {
        updateGuildBossUI();
    }
}

function showCombatScreen(show) {
    const combatScreen = document.getElementById('combat-section');
    const mainContent = document.getElementById('main-content'); // On cible maintenant le conteneur des écrans

    if (show) {
        document.body.classList.add('in-combat');
        mainContent.style.display = 'none'; // On cache juste les écrans de jeu
        combatScreen.classList.remove('hidden');
    } else {
        document.body.classList.remove('in-combat');
        combatScreen.classList.add('hidden');
        mainContent.style.display = 'block'; // On réaffiche le conteneur des écrans
        
        // ▼▼▼ LA NOUVELLE LOGIQUE EST ICI ▼▼▼
        // On appelle notre fonction dédiée et infaillible pour restaurer l'interface
        restorePreCombatUI();
        // ▲▲▲ FIN DE LA NOUVELLE LOGIQUE ▲▲▲
    }
}

function restorePreCombatUI() {
    const preCombatState = gameState.preCombatUIState;
    if (!preCombatState) {
        // Si par hasard l'état n'a pas été sauvegardé, on retourne à l'aventure par défaut
        switchScreen('aventure');
        switchAdventureTab('aventure');
        return;
    }

    // 1. On bascule vers le bon écran principal (ex: 'aventure')
    switchScreen(preCombatState.screen, true);

    // 2. On bascule vers le bon sous-onglet (ex: 'expeditions')
    const subTab = preCombatState.subTab;
    if (subTab && typeof window[subTab.action] === 'function') {
        window[subTab.action](subTab.arg);
    }
    
    // 3. On nettoie la "photographie" pour ne pas la réutiliser par erreur
    gameState.preCombatUIState = null;
}

function updateNavButtonsState() {
    if (!gameState.player) return;

    const features = gameState.unlockedFeatures || {};
    const screenToFeatureMap = {
        'village': 'village',
        'fief': 'fief',
        'codex': 'codex' 
    };

    document.querySelectorAll('#bottom-nav .nav-button').forEach(button => {
        const screen = button.dataset.screen;
        const featureId = screenToFeatureMap[screen];

        if (featureId) {
            const isUnlocked = features[featureId] === true;
            button.classList.toggle('disabled', !isUnlocked);

            if (!isUnlocked) {
                button.title = t(`ui.unlock_prompts.${featureId}`) || "Fonctionnalité non débloquée";
            } else {
                button.title = '';
            }
        } else {
            // Pour les boutons comme Personnage et Aventure qui sont toujours débloqués
            button.classList.remove('disabled');
            button.title = '';
        }
    });
}

function updateSpendPointsFAB() {
    if (!spendPointsFAB || !gameState.player) return;

    if (gameState.player.pointsToSpend > 0) {
        spendPointsFAB.classList.remove('hidden');
    } else {
        spendPointsFAB.classList.add('hidden');
    }
}

// MON COMMENTAIRE : Nouvelle fonction pour ouvrir la modale
/**
 * Ouvre la modale d'attribution des points et la remplit avec les données actuelles.
 */
window.openSpendPointsModal = function() {
    const modal = document.getElementById('spend-points-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        populateSpendPointsModal();
    }
}

// MON COMMENTAIRE : Nouvelle fonction pour fermer la modale
window.closeSpendPointsModal = function() {
    const modal = document.getElementById('spend-points-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

// MON COMMENTAIRE : Nouvelle fonction pour remplir la modale avec les informations du joueur
function populateSpendPointsModal() {
    const player = gameState.player;
    if (!player) return;

    // ... (Mise à jour des barres HP/Mana et points à dépenser, inchangé) ...
    document.getElementById('modal-player-hp').textContent = Math.round(gameState.playerCurrentHP);
    document.getElementById('modal-player-max-hp').textContent = player.currentMaxHP;
    document.getElementById('modal-player-hp-fill').style.width = `${(gameState.playerCurrentHP / player.currentMaxHP) * 100}%`;
    
    document.getElementById('modal-player-mana').textContent = Math.round(gameState.playerCurrentMana);
    document.getElementById('modal-player-max-mana').textContent = player.maxMana;
    document.getElementById('modal-player-mana-fill').style.width = player.maxMana > 0 ? `${(gameState.playerCurrentMana / player.maxMana) * 100}%` : '0%';
    
    document.getElementById('modal-points-to-spend').textContent = player.pointsToSpend;
    
    // Génération de la liste des attributs
    const attributesList = document.getElementById('modal-attributes-list');
    attributesList.innerHTML = '';
    STAT_NAMES.forEach(statName => {
        const baseStat = player.baseStats[statName] || 0;
        const totalStat = player.totalStats[statName] || 0;
        const statLine = document.createElement('div');
        statLine.className = 'stat-line';
        
        // J'ai retiré la partie `(<small>(${baseStat})</small>)` comme demandé.
        let statDisplay = `
            <strong onclick="showDescriptionAlert('${statName}')"><img src="${SPRITE_PATHS[statName]}" class="icon-sprite">${t(`stats.displayNames.${statName}`)} :</strong> 
            <span class="stat-values" onclick="showStatTooltip('${statName}')">
                <strong class="stat-total">${totalStat}</strong>
            </span>
        `;
        
        const isDefenseCapped = statName === "Défense" && baseStat >= Math.floor(player.level / 10);
        
        if (player.pointsToSpend > 0 && !isDefenseCapped) {
            statLine.innerHTML = `
                <div class="stat-info" style="flex-grow: 1;">${statDisplay}</div>
                <button class="plus-button" data-stat="${statName}" data-amount="1">+</button>
            `;
        } else {
            statLine.innerHTML = `<div class="stat-info">${statDisplay}</div>`;
        }
        
        attributesList.appendChild(statLine);
    });

    setupStatButtonListeners('modal-attributes-list');
}

// MON COMMENTAIRE : Nouvelle fonction pour peupler les stats détaillées DANS la modale
function updateStatsPanelsForModal() {
    const player = gameState.player;
    if (!player) return;

    const combatStatsList = document.getElementById('modal-combat-stats-content-detailed');
    const globalStatsList = document.getElementById('modal-global-stats-content-detailed');
    const traitsStatsList = document.getElementById('modal-traits-stats-content-detailed');

    if (!combatStatsList || !globalStatsList || !traitsStatsList) return;

    combatStatsList.innerHTML = `<p><small>${t('ui.stats_panel.power_score_label')} <strong>${calculatePlayerPowerScore()}</strong> 💪</small></p>`;
    globalStatsList.innerHTML = '';

    const combatStatsKeys = ['RegenHP', 'damage_percent', 'CritChance', 'CritDamage', 'evasion_chance_percent', 'lifesteal_percent', 'bleed_chance_percent', 'stun_chance_percent', 'armor_shred_percent', 'thorns_damage_flat', 'resistance_percent', 'debuff_resistance_percent'];
    const globalStatsKeys = ['xp_gain_percent', 'LootBonusPercent', 'resource_gain_percent', 'healing_effectiveness_percent'];

    const renderStatLine = (panel, statKey) => {
        if (!player.statBreakdown || !player.statBreakdown[statKey]) return;
        const total = player.totalStats[statKey] || 0;
        if (total === 0 && statKey !== 'RegenHP') return;

        const isPercent = String(statKey).includes('_percent') || statKey === 'CritChance' || statKey === 'CritDamage';
        const isFloat = ['RegenHP', 'CritDamage'].includes(statKey);
        const suffix = statKey === 'RegenHP' ? t('ui.stats_panel.hp_per_second_unit') : (isPercent ? '%' : '');
        
        const p = document.createElement('p');
        p.innerHTML = `<small>${t(`stats.displayNames.${statKey}`)} : <strong class="stat-bonus">${total > 0 ? '+' : ''}${total.toFixed(isFloat ? 2 : 0)}${suffix}</strong></small>`;
        panel.appendChild(p);
    };

    combatStatsKeys.forEach(key => renderStatLine(combatStatsList, key));
    globalStatsKeys.forEach(key => renderStatLine(globalStatsList, key));

    // On utilise la fonction dédiée pour les traits
    updateTraitsStatsPanel('modal-traits-stats-content-detailed');
}

window.openDetailedStatsModal = function() {
    const modal = document.getElementById('detailed-stats-modal');
    if (modal) {
        modal.classList.remove('hidden');
        updateStatsPanelsForModal(); // On peuple la modale avec les données
        
        // On attache les écouteurs pour les onglets de cette modale
        modal.querySelectorAll('.stat-tab-button').forEach(button => {
            button.addEventListener('click', () => {
                modal.querySelectorAll('.stat-tab-button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                modal.querySelectorAll('.stat-tab-content').forEach(content => content.classList.add('hidden'));
                const target = document.querySelector(button.dataset.tabTarget);
                if (target) target.classList.remove('hidden');
            });
        });
    }
}

/**
 * Ferme la modale des statistiques détaillées.
 */
window.closeDetailedStatsModal = function() {
    const modal = document.getElementById('detailed-stats-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function animateCounter(element, end, duration) {
    if (!element) return;

    // MON COMMENTAIRE : Si aucune durée n'est spécifiée, on en choisit une au hasard entre 500 et 1000ms.
    if (duration === undefined) {
        duration = Math.floor(Math.random() * 501) + 500; // Génère un nombre entre 500 et 1000
    }

    // On récupère la valeur de départ depuis un attribut 'data-value' ou le texte actuel.
    let start = parseInt(element.dataset.value || element.textContent.replace(/\s/g, '') || '0', 10);
    // On met à jour l'attribut pour les futurs appels.
    element.dataset.value = end;

    // Si la valeur ne change pas, on ne fait rien.
    if (start === end) {
        element.textContent = end.toLocaleString();
        return;
    }

    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Formule d'accélération/décélération (ease-out) pour un effet plus doux
        const easedProgress = progress * (2 - progress);
        
        const currentValue = Math.floor(easedProgress * (end - start) + start);
        element.textContent = currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            // S'assure que la valeur finale est exacte à la fin de l'animation.
            element.textContent = end.toLocaleString();
        }
    };

    requestAnimationFrame(step);
}

// =================================================================================
// SYSTÈME D'ACCÉLÉRATION (SPEED-UP)
// =================================================================================

window.speedUpConstruction = async function(buildingId, buildingType) {
    let endTime, buildingName, buildingLevel;

    if (buildingType === 'fief') {
        endTime = gameState.fief.constructionQueue[buildingId];
        buildingName = t(FIEF_DB[buildingId].nameKey);
        buildingLevel = (gameState.fief.buildings[buildingId] || 0) + 1;
    } else {
        const villageBuilding = gameState.village[buildingId];
        endTime = villageBuilding.constructionEnd;
        buildingName = t(VILLAGE_DB[buildingId].nameKey);
        buildingLevel = villageBuilding.level + 1;
    }

    if (!endTime || endTime <= Date.now()) return;

    const remainingMs = endTime - Date.now();
    const remainingHours = remainingMs / 3600000;
    const cost = Math.ceil(remainingHours * SPEED_UP_COST_PER_HOUR);

    // MON COMMENTAIRE : C'est ici que se trouve la correction, on utilise la nouvelle clé de traduction.
    const confirmed = await showCustomConfirm(
        t('ui.fief.speed_up_confirm_body', { cost: cost, buildingName: buildingName }),
        t('ui.buttons.confirm_generic'),
        t('ui.buttons.cancel')
    );

    if (confirmed) {
        if ((gameState.player.resources.eclats_ascension || 0) < cost) {
            showToast(t('ui.fief.not_enough_ea'), 'error');
            return;
        }

        gameState.player.resources.eclats_ascension -= cost;

        if (buildingType === 'fief') {
            gameState.fief.constructionQueue[buildingId] = Date.now();
        } else {
            gameState.village[buildingId].constructionEnd = Date.now();
        }

        updateConstructionTimers();
        updateGameUI();
        saveGame();
    }
}

function showContextualSpeedUpOffer() {
    const offerId = 'ACCELERATION_PACK_1';
    const offerData = CONTEXTUAL_OFFERS_DB[offerId];
    if (!offerData) return;

    const modal = document.getElementById('contextual-offer-modal');
    
    setText('#contextual-offer-title', 'ui.contextual_offers.title');
    document.getElementById('contextual-offer-icon').src = offerData.icon;
    setText('#contextual-offer-pack-name', offerData.nameKey);
    setText('#contextual-offer-pack-description', offerData.descriptionKey);

    const contentsEl = document.getElementById('contextual-offer-pack-contents');
    let contentsHtml = '';
    for (const item in offerData.contents) {
        const amount = offerData.contents[item];
        const icon = `<img src="${SPRITE_PATHS[item]}" class="icon-sprite-small" alt="${item}">`;
        contentsHtml += `<span>+${amount.toLocaleString()} ${icon}</span>`;
    }
    contentsEl.innerHTML = contentsHtml;

    const buyButton = document.getElementById('contextual-offer-buy-button');
    buyButton.textContent = offerData.price;
    buyButton.onclick = () => {
        // MON COMMENTAIRE : La logique d'achat en argent réel sera à implémenter ici.
        alert(`Logique d'achat pour ${offerId} à implémenter.`);
        closeContextualOffer();
    };
    
    modal.classList.remove('hidden');
}

window.closeContextualOffer = function() {
    document.getElementById('contextual-offer-modal').classList.add('hidden');
}

window.openLivesModal = function() {
    const modal = document.getElementById('lives-modal');
    if (!modal) return;
    
    // On appelle la fonction de configuration complète une seule fois
    updateLivesModalUI();
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    if (livesModalInterval) clearInterval(livesModalInterval);
    // MON COMMENTAIRE : On lance un minuteur qui n'appelle QUE la fonction légère de mise à jour du temps
    livesModalInterval = setInterval(updateLivesModalTimer, 1000);
}

window.closeLivesModal = function() {
    const modal = document.getElementById('lives-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
    // MON AJOUT : C'est très important d'arrêter le minuteur à la fermeture
    // pour ne pas consommer de ressources inutilement en arrière-plan.
    if (livesModalInterval) {
        clearInterval(livesModalInterval);
        livesModalInterval = null; // On remet la variable à zéro
    }
}

function updateLivesModalTimer() {
    const player = gameState.player;
    if (!player) return;

    if (player.lives < player.maxLives) {
        const nextLifeTime = (player.lastLifeRegenTime || Date.now()) + (20 * 60 * 1000);
        const timeLeftMs = Math.max(0, nextLifeTime - Date.now());
        const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
        setText('#lives-modal-timer', 'ui.lives_modal.next_life_in', { minutes: minutes, seconds: seconds });
    } else {
        // Si les vies sont au max, on arrête le minuteur car il n'y a plus rien à mettre à jour
        if (livesModalInterval) {
            clearInterval(livesModalInterval);
            livesModalInterval = null;
        }
        setText('#lives-modal-timer', 'ui.lives_modal.lives_at_max');
    }
}

function updateLivesModalUI() {
    const player = gameState.player;
    if (!player) return;

    const purchases = player.maxLivesPurchases || 0;
    
    const costLife = 25;
    const costMaxLives = 250 + (purchases * 100);

    setText('#lives-modal-title', 'ui.lives_modal.title');
    setText('#lives-modal-count', 'ui.lives_modal.current_lives', { count: player.lives, max: player.maxLives });

    // MON COMMENTAIRE : La logique du minuteur a été déplacée dans updateLivesModalTimer()
    // On appelle la fonction une fois ici pour l'affichage initial correct.
    updateLivesModalTimer(); 

    const buyLifeButton = document.querySelector('#lives-modal-actions .action-button[onclick="buyLife()"]');
    const buyMaxLivesButton = document.querySelector('#lives-modal-actions .action-button[onclick="buyMaxLivesPack()"]');
    const closeButton = document.querySelector('#lives-modal .modal-close-button');
    const buyMaxLivesDesc = document.getElementById('buy-max-lives-desc');

    setText('#buy-life-desc', 'ui.lives_modal.buy_one_life_desc');
    if (buyLifeButton) {
        buyLifeButton.innerHTML = t('ui.lives_modal.buy_one_life_button', { cost: costLife });
    }
    
    if (purchases >= 3) {
        if (buyMaxLivesDesc) buyMaxLivesDesc.textContent = t('ui.lives_modal.buy_max_lives_limit_reached');
        if (buyMaxLivesButton) {
            buyMaxLivesButton.textContent = t('ui.buttons.maxed_out');
            buyMaxLivesButton.disabled = true;
        }
    } else {
        if (buyMaxLivesDesc) buyMaxLivesDesc.innerHTML = t('ui.shop.max_lives_pack_1.description') + ` (${purchases}/3)`;
        if (buyMaxLivesButton) {
            buyMaxLivesButton.innerHTML = t('ui.lives_modal.buy_max_lives_button', { cost: costMaxLives });
            buyMaxLivesButton.disabled = false;
        }
    }
    
    if (closeButton) {
        closeButton.textContent = t('ui.buttons.close');
    }
}

async function buyLife() {
    const cost = 25;
    const player = gameState.player;

    if (player.lives >= player.maxLives) {
        showToast(t('ui.lives_modal.already_at_max'), 'error');
        return;
    }
    if ((player.resources.eclats_ascension || 0) < cost) {
        showToast(t('ui.profile.not_enough_shards'), 'error');
        return;
    }

    const confirmed = await showCustomConfirm(t('ui.lives_modal.confirm_buy_one', { cost: cost }));
    if (confirmed) {
        player.resources.eclats_ascension -= cost;
        player.lives++;
        showToast(t('ui.lives_modal.buy_one_success'), 'success');
        updateLivesModalUI();
        updateGameUI();
        saveGame();
    }
}

async function buyMaxLivesPack() {
    const player = gameState.player;
    // MON AJOUT : On s'assure que la propriété existe, sinon on l'initialise à 0
    if (player.maxLivesPurchases === undefined) {
        player.maxLivesPurchases = 0;
    }

    // MON AJOUT : On vérifie si le joueur a déjà atteint la limite
    if (player.maxLivesPurchases >= 3) {
        showToast(t('ui.lives_modal.buy_max_lives_limit_reached'), 'error');
        return;
    }

    // MON AJOUT : Le coût est maintenant calculé en fonction du nombre d'achats précédents
    const cost = 250 + (player.maxLivesPurchases * 100);

    if ((player.resources.eclats_ascension || 0) < cost) {
        showToast(t('ui.profile.not_enough_shards'), 'error');
        return;
    }
    
    const confirmed = await showCustomConfirm(t('ui.lives_modal.confirm_buy_max', { cost: cost }));
    if (confirmed) {
        player.resources.eclats_ascension -= cost;
        player.maxLives++;
        player.lives++; // On lui donne aussi une vie en plus
        
        // MON AJOUT : On incrémente le compteur d'achats
        player.maxLivesPurchases++;

        showToast(t('ui.lives_modal.buy_max_success'), 'success');
        updateLivesModalUI();
        updateGameUI();
        saveGame();
    }
}

// =================================================================================
// SYSTÈME DE MISSIONS QUOTIDIENNES
// =================================================================================

/**
 * Ouvre la modale des missions quotidiennes et met à jour son contenu.
 */
window.openDailyMissionsModal = function() {
    const modal = document.getElementById('daily-missions-modal');
    if (modal) {
        // MON COMMENTAIRE : Je retire l'appel à checkAndResetDailyMissions() ici aussi.
        // La boucle de jeu a déjà fait le travail. On ne fait qu'afficher l'état actuel.
        updateDailyMissionsUI();
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.getElementById('main-menu').classList.add('hidden'); // Ferme le menu hamburger
    }
}

/**
 * Ferme la modale des missions quotidiennes.
 */
window.closeDailyMissionsModal = function() {
    const modal = document.getElementById('daily-missions-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

/**
 * Vérifie si une journée s'est écoulée et réinitialise les missions si nécessaire.
 */
function checkAndResetDailyMissions() {
    const now = new Date();
    // MON COMMENTAIRE : On se base maintenant sur le début de la journée en UTC.
    const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    if (!gameState.dailyMissions || gameState.dailyMissions.lastReset < todayUTC) {
        gameState.dailyMissions = {
            lastReset: todayUTC,
            claimed: false,
            progress: {
                expeditions: 0,
                bosses: 0,
                crafts: 0
            }
        };
        showToast(t('ui.daily_missions.notification_body'), 'system-message');
        console.log("Missions quotidiennes réinitialisées (UTC).");
    }
}

function updateGlobalNotifications() {
    const hamburgerButton = document.getElementById('hamburger-button');
    if (!hamburgerButton) return;

    const badge = hamburgerButton.querySelector('.notification-badge');
    if (!badge) return;

    const hasClaimableAchievements = Object.values(gameState.stats.achievementStatus || {}).includes('unlocked');

    const mailMenuItem = document.getElementById('mail-menu-item');
    const mailBadge = mailMenuItem ? mailMenuItem.querySelector('.notification-badge') : null;
    const hasUnreadMail = mailBadge ? !mailBadge.classList.contains('hidden') : false;

    // On affiche le badge (en retirant 'hidden') si l'une OU l'autre condition est vraie.
    badge.classList.toggle('hidden', !(hasClaimableAchievements || hasUnreadMail));
}

/**
 * Met à jour la progression d'une mission quotidienne.
 * @param {string} type - Le type de mission ('expeditions', 'bosses', 'crafts').
 */
function updateDailyMissionProgress(type) {
    // MON COMMENTAIRE : Je retire l'appel à checkAndResetDailyMissions() ici.
    // La boucle de jeu s'en occupe déjà en permanence.
    const missions = gameState.dailyMissions;
    if (missions.progress[type] === undefined || missions.claimed) {
        return;
    }

    const missionDef = DAILY_MISSIONS_DB.missions.find(m => m.id === type);
    if (missionDef && missions.progress[type] < missionDef.target) {
        missions.progress[type]++;
        console.log(`Progression mission quotidienne '${type}': ${missions.progress[type]}/${missionDef.target}`);
        saveGame();
    }
}

/**
 * Met à jour l'interface de la modale des missions quotidiennes.
 */
function updateDailyMissionsUI() {
    const missions = gameState.dailyMissions;
    const listContainer = document.getElementById('daily-missions-list');
    const claimButton = document.getElementById('claim-daily-reward-button');

    // MON COMMENTAIRE : Traduction des textes statiques de la modale.
    setText('#daily-missions-title', 'ui.daily_missions.modal_title');
    setText('#daily-missions-description', 'ui.daily_missions.modal_description');
    setText('#daily-missions-reward-label', 'ui.daily_missions.reward_label');
    setText('#daily-missions-modal .modal-close-button', 'ui.buttons.close');

    if (!listContainer || !claimButton) return;

    listContainer.innerHTML = '';
    let allComplete = true;

    DAILY_MISSIONS_DB.missions.forEach(mission => {
        const progress = missions.progress[mission.id] || 0;
        const target = mission.target;
        const isCompleted = progress >= target;
        if (!isCompleted) {
            allComplete = false;
        }

        const progressPercent = Math.min(100, (progress / target) * 100);

        const missionDiv = document.createElement('div');
        missionDiv.className = `mission-item ${isCompleted ? 'completed' : ''}`;
        missionDiv.innerHTML = `
            <div class="mission-icon">${mission.icon}</div>
            <div class="mission-details">
                <p class="mission-name">${t(mission.nameKey)}</p>
                <div class="mission-progress-bar-bg">
                    <div class="mission-progress-bar-fill" style="width: ${progressPercent}%;"></div>
                </div>
            </div>
            <div class="mission-progress-text">${t('ui.daily_missions.progress_label', { current: progress, target: target })}</div>
        `;
        listContainer.appendChild(missionDiv);
    });

    const rewardValueDiv = document.getElementById('daily-missions-reward-value');
    const reward = DAILY_MISSIONS_DB.reward;
    const eaIcon = `<img src="${SPRITE_PATHS['eclats_ascension']}" class="icon-sprite-small" alt="EA">`;
    rewardValueDiv.innerHTML = `${reward.eclats_ascension} ${eaIcon}`;

    if (missions.claimed) {
        claimButton.textContent = t('ui.daily_missions.already_claimed');
        claimButton.disabled = true;
    } else if (allComplete) {
        claimButton.textContent = t('ui.daily_missions.claim_button');
        claimButton.disabled = false;
    } else {
        claimButton.textContent = t('ui.daily_missions.all_missions_complete');
        claimButton.disabled = true;
    }

    claimButton.onclick = claimDailyMissionsReward;
}

/**
 * Gère le clic sur le bouton pour récupérer la récompense des missions quotidiennes.
 */
function claimDailyMissionsReward() {
    const missions = gameState.dailyMissions;
    if (missions.claimed) {
        showToast(t('ui.daily_missions.already_claimed'), 'error');
        return;
    }

    let allComplete = true;
    DAILY_MISSIONS_DB.missions.forEach(mission => {
        if ((missions.progress[mission.id] || 0) < mission.target) {
            allComplete = false;
        }
    });

    if (allComplete) {
        const reward = DAILY_MISSIONS_DB.reward.eclats_ascension;
        addResource('eclats_ascension', reward);
        missions.claimed = true;
        
        showToast(t('alerts.daily_missions.reward_claimed_success', { amount: reward }), 'success');
        updateDailyMissionsUI();
        updateGameUI();
        saveGame();
    } else {
        showToast(t('alerts.daily_missions.not_all_complete'), 'error');
    }
}

async function updateGuildUI() {
    if (!window.firebaseTools.auth.currentUser) {
        showToast(t('errors.login_required_profile'), "error"); 
        return;
    }

    // Traduction des textes statiques (déplacée depuis openGuildModal)
    setText('#guild-modal-title-find', 'ui.guild.modal_title_find');
    setText('#guild-no-guild-text', 'ui.guild.no_guild_text');
    setText('#guild-create-btn', 'ui.guild.create_button');
    setText('#guild-find-btn', 'ui.guild.find_button');
    setText('#guild-modal-title-my-guild', 'ui.guild.modal_title_my_guild');
    setText('#guild-chat-btn-text', 'ui.guild.guild_chat');
    setText('#guild-boss-btn-text', 'ui.guild.guild_boss');
    setText('#guild-shop-btn-text', 'ui.guild.guild_shop');
    setText('#guild-leave-btn', 'ui.guild.leave_button');
    setText('#guild-modal-title-create', 'ui.guild.modal_title_create');
    setText('#guild-name-label', 'ui.guild.name_label');
    setText('#guild-tag-label', 'ui.guild.tag_label');
    setText('#guild-create-cost', 'ui.guild.create_cost', { cost: 150 });
    setText('#guild-confirm-creation-btn', 'ui.guild.confirm_creation_button');
    setText('#guild-find-btn', 'ui.guild.find_button');
    setText('#guild-confirm-creation-btn', 'ui.guild.confirm_creation_button');

const searchInput = document.getElementById('guild-search-input');
    if(searchInput) searchInput.placeholder = t('ui.guild.search_placeholder');
    const searchButton = document.querySelector('#find-guild-view .action-button');
    if(searchButton) searchButton.textContent = t('ui.guild.search_button');
    const backButton = document.querySelector('#find-guild-view .modal-close-button');
    if(backButton) backButton.textContent = t('ui.guild.back_button');


    if (gameState.player.guildId) {
        showMyGuildView();
    } else {
        showNoGuildView();
    }
}

function openGuildScreen() {
    switchScreen('social');
}

function showNoGuildView() {
    document.getElementById('my-guild-view').classList.add('hidden');
    document.getElementById('create-guild-view').classList.add('hidden');
    document.getElementById('find-guild-view').classList.add('hidden'); // On cache aussi la recherche
    document.getElementById('no-guild-view').classList.remove('hidden');

    // MON COMMENTAIRE : On s'assure que le bouton est activé
    document.getElementById('guild-find-btn').disabled = false;
}

/**
 * Affiche la vue de création de guilde.
 */
function showCreateGuildView() {
    document.getElementById('no-guild-view').classList.add('hidden');
    document.getElementById('my-guild-view').classList.add('hidden');
    document.getElementById('create-guild-view').classList.remove('hidden');
}

/**
 * Affiche la vue de la guilde du joueur.
 */
async function showMyGuildView() {
    document.getElementById('no-guild-view').classList.add('hidden');
    document.getElementById('create-guild-view').classList.add('hidden');
    document.getElementById('find-guild-view').classList.add('hidden');
    document.getElementById('my-guild-view').classList.remove('hidden');

    const guildId = gameState.player.guildId;
    if (!guildId) return;

    try {
        const { db, doc, getDoc } = window.firebaseTools;
        
        const guildStaticRef = doc(db, "guilds", guildId);
        // On récupère aussi les données dynamiques
        const guildDynamicRef = doc(db, "guilds", guildId, "dynamic", "data");

        const [staticDocSnap, dynamicDocSnap] = await Promise.all([
            getDoc(guildStaticRef),
            getDoc(guildDynamicRef)
        ]);

        if (!staticDocSnap.exists()) {
            throw new Error("Guilde introuvable.");
        }

        // On fusionne les données statiques et dynamiques
        const guild = { ...staticDocSnap.data(), ...(dynamicDocSnap.data() || {}) };
        
        guildDataCache = guild;

        updateSubNavVisibility('social');

        document.getElementById('guild-name-display').textContent = `${guild.name} [${guild.tag}]`;
        setText('#guild-level-display', 'ui.guild.level', { level: guild.level });
        
        const memberCount = guild.memberCount || (guild.members ? Object.keys(guild.members).length : 0);
        setText('#guild-members-count-display', 'ui.guild.members', { count: memberCount, max: guild.maxMembers });

        const currentXP = guild.xp || 0;
        const requiredXP = guild.xpToNextLevel || 1000;
        const xpPercent = requiredXP > 0 ? (currentXP / requiredXP) * 100 : 0;
        
        const xpBar = document.getElementById('guild-xp-bar');
        if(xpBar) xpBar.style.width = `${xpPercent}%`;
        
        setText('#guild-xp-details-display', 'ui.guild.xp_details', { currentXP: currentXP.toLocaleString(), requiredXP: requiredXP.toLocaleString() });

        setText('#guild-contribute-btn-text', 'ui.guild.contribute_button');
        setText('#guild-members-btn-text', 'ui.guild.tab_members');
        // On met à jour le texte du bouton de la boutique
        setText('#guild-shop-btn-text', 'ui.guild.guild_shop');
        
        // On active le bouton de la boutique
        document.getElementById('guild-shop-button').disabled = false;

        const manageButton = document.getElementById('guild-manage-button');
        const logsButton = document.getElementById('guild-logs-button');

        if (gameState.player.guildRank === 'R0') {
            showElement(manageButton);
            setText('#guild-manage-button', 'ui.guild.manage_button');
            showElement(logsButton);
            setText('#guild-logs-btn-text', 'ui.guild.guild_logs');
        } else {
            hideElement(manageButton);
            hideElement(logsButton);
        }

        const leaveButton = document.getElementById('guild-leave-btn');
        leaveButton.textContent = t('ui.guild.leave_button');
        leaveButton.onclick = leaveGuild;

    } catch (error) {
        console.error("Erreur critique lors de l'affichage de la guilde:", error);
        showToast("Votre guilde n'existe plus ou une erreur est survenue.", "error");
        gameState.player.guildId = null;
        gameState.player.guildRank = null;
        saveGame();
        showNoGuildView();
    }
}

/**
 * Valide et confirme la création de la guilde.
 */
async function confirmGuildCreation() {
    const name = document.getElementById('guild-name-input').value.trim();
    const tag = document.getElementById('guild-tag-input').value.trim();
    const cost = 150;

    if (name.length < 3) {
        showToast(t('ui.alerts.guild.name_too_short'), 'error');
        return;
    }
    if (tag.length < 3 || tag.length > 4) {
        showToast(t('ui.alerts.guild.tag_invalid'), 'error');
        return;
    }
    if ((gameState.player.resources.eclats_ascension || 0) < cost) {
        showToast(t('ui.alerts.guild.not_enough_ea'), 'error');
        return;
    }

    const confirmed = await showCustomConfirm(t('ui.alerts.guild.confirm_create', {cost: cost, name: name, tag: tag}));

    if (confirmed) {
        try {
            const guildId = await createGuildOnServer(name, tag);
            gameState.player.guildId = guildId;
            gameState.player.guildRank = 'R0'; // La ligne qui corrige le problème !
            gameState.player.resources.eclats_ascension -= cost;
            saveGame();
            showToast(t('ui.alerts.guild.creation_success', { name: name }), 'success');
            showMyGuildView(); // Affiche la vue de la guilde
            updateGameUI(); // Met à jour l'affichage des EA
        } catch (error) {
            showToast(t('ui.alerts.guild.creation_failed', { error: error.message }), 'error');
        }
    }
}

async function getGuildDataFromServer(guildId) {
    const { db, doc, getDoc } = window.firebaseTools;
    console.log(`[Firebase] Récupération des données pour la guilde : ${guildId}`);

    try {
        const guildRef = doc(db, "guilds", guildId);
        const docSnap = await getDoc(guildRef);

        if (docSnap.exists()) {
            console.log("[Firebase] Guilde trouvée :", docSnap.data());
            return docSnap.data();
        } else {
            console.warn(`[Firebase] Guilde avec l'ID ${guildId} non trouvée.`);
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la guilde :", error);
        throw error;
    }
}

// Remplace l'ancienne fonction createGuildOnServer par celle-ci
async function createGuildOnServer(name, tag) {
    const { auth, db, runTransaction, collection, doc, query, where, getDocs, serverTimestamp } = window.firebaseTools;
    const user = auth.currentUser;
    if (!user) throw new Error("Utilisateur non connecté.");

    const cost = 150;
    const guildsRef = collection(db, "guilds");

    const nameQuery = query(guildsRef, where("name_lowercase", "==", name.toLowerCase()));
    const tagQuery = query(guildsRef, where("tag_lowercase", "==", tag.toLowerCase()));

    const nameSnapshot = await getDocs(nameQuery);
    if (!nameSnapshot.empty) {
        throw new Error(t('ui.alerts.guild.name_taken'));
    }

    const tagSnapshot = await getDocs(tagQuery);
    if (!tagSnapshot.empty) {
        throw new Error(t('ui.alerts.guild.tag_taken'));
    }

    try {
        const newGuildId = await runTransaction(db, async (transaction) => {
            const playerRef = doc(db, "players", user.uid);
            const playerDoc = await transaction.get(playerRef);

            if (!playerDoc.exists()) {
                throw new Error("Profil joueur introuvable.");
            }

            const playerData = playerDoc.data();
            if (playerData.player.guildId) {
                throw new Error(t('ui.alerts.guild.already_in_guild'));
            }

            const currentEA = playerData.player.resources.eclats_ascension || 0;
            if (currentEA < cost) {
                throw new Error(t('ui.alerts.guild.not_enough_ea'));
            }

            // On récupère les permissions par défaut
            const defaultPermissions = {};
            GUILD_PERMISSIONS_DB.editableRanks.forEach(rankKey => {
                defaultPermissions[rankKey] = {};
                GUILD_PERMISSIONS_DB.permissionKeys.forEach(perm => {
                    defaultPermissions[rankKey][perm.id] = perm.defaultRanks.includes(rankKey);
                });
            });

            const newGuildRef = doc(collection(db, "guilds"));
            
            // MON COMMENTAIRE : Les données "froides" (qui changent peu) restent ici.
            // On a retiré 'xp' et 'bank'.
            const newGuildData = {
                id: newGuildRef.id,
                name: name,
                name_lowercase: name.toLowerCase(),
                tag: tag,
                tag_lowercase: tag.toLowerCase(),
                level: 1,
                xpToNextLevel: 1000,
                members: { 
                    [user.uid]: {
                        rank: 'R0',
                        joinedAt: serverTimestamp()
                    }
                },
                memberCount: 1,
                maxMembers: 50,
                leaderId: user.uid,
                createdAt: serverTimestamp(),
                permissions: defaultPermissions
            };
            transaction.set(newGuildRef, newGuildData);
            
            // MON COMMENTAIRE : On crée une référence pour le sous-document des données "chaudes".
            const newGuildDynamicRef = doc(db, "guilds", newGuildRef.id, "dynamic", "data");
            const newGuildDynamicData = {
                xp: 0,
                bank: { marques_de_guilde: 0 }
            };
            // MON COMMENTAIRE : On crée ce sous-document dans la même transaction.
            transaction.set(newGuildDynamicRef, newGuildDynamicData);


            const newPlayerResources = { ...playerData.player.resources, eclats_ascension: currentEA - cost };
            transaction.update(playerRef, {
                "player.guildId": newGuildRef.id,
                "player.guildRank": "R0",
                "player.resources": newPlayerResources
            });

            return newGuildRef.id;
        });

        console.log(`[Firebase] Guilde créée avec succès. ID: ${newGuildId}`);
        return newGuildId;

    } catch (error) {
        console.error("Erreur transactionnelle lors de la création de la guilde :", error);
        throw error;
    }
}

function openGuildMembersModal() {
    const modal = document.getElementById('guild-members-modal');
    if (modal) {
        modal.classList.remove('hidden');
        renderGuildMembersList();
    }
}

function closeGuildMembersModal() {
    const modal = document.getElementById('guild-members-modal');
    if (modal) modal.classList.add('hidden');
}

window.openGuildContributionModal = function() {
    const modal = document.getElementById('guild-contribution-modal');
    if (modal) {
        updateContributionModalUI(); // Met à jour l'UI à l'ouverture
        modal.classList.remove('hidden');

        if (contributionUpdateInterval) clearInterval(contributionUpdateInterval);
        contributionUpdateInterval = setInterval(updateContributionModalUI, 1000);
    }
}

// MON COMMENTAIRE : Je modifie la fonction pour arrêter le minuteur à la fermeture.
window.closeGuildContributionModal = function() {
    const modal = document.getElementById('guild-contribution-modal');
    if (modal) {
        modal.classList.add('hidden');
        if (contributionUpdateInterval) clearInterval(contributionUpdateInterval);
    }
}

function updateContributionModalUI() {
    if (!gameState.player.guildData) {
        gameState.player.guildData = {
            contributionCharges: GUILD_SETTINGS.CONTRIBUTION_MAX_CHARGES,
            lastContributionChargeTime: Date.now()
        };
    }

    // Régénération des charges
    const now = Date.now();
    const elapsedMinutes = (now - gameState.player.guildData.lastContributionChargeTime) / (1000 * 60);
    const chargesToRegen = Math.floor(elapsedMinutes / GUILD_SETTINGS.CONTRIBUTION_REGEN_MINUTES);

    if (chargesToRegen > 0) {
        gameState.player.guildData.contributionCharges = Math.min(
            GUILD_SETTINGS.CONTRIBUTION_MAX_CHARGES,
            gameState.player.guildData.contributionCharges + chargesToRegen
        );
        gameState.player.guildData.lastContributionChargeTime += chargesToRegen * GUILD_SETTINGS.CONTRIBUTION_REGEN_MINUTES * 60 * 1000;
    }

    const charges = gameState.player.guildData.contributionCharges;
    const maxCharges = GUILD_SETTINGS.CONTRIBUTION_MAX_CHARGES;

    setText('#guild-contribution-title', 'ui.guild.contribution_modal_title');
    setText('#guild-contribution-desc', 'ui.guild.contribution_info', {
        cost: GUILD_SETTINGS.CONTRIBUTION_COST,
        xp: GUILD_SETTINGS.CONTRIBUTION_XP_GAIN,
        currency: GUILD_SETTINGS.CONTRIBUTION_CURRENCY_GAIN
    });
    setText('#guild-contribution-content .modal-close-button', 'ui.buttons.close');
    setText('#guild-contribution-charges-label', 'ui.guild.contribution_charges_label', { count: charges, max: maxCharges });
    
    if (charges < maxCharges) {
        const nextChargeTime = gameState.player.guildData.lastContributionChargeTime + (GUILD_SETTINGS.CONTRIBUTION_REGEN_MINUTES * 60 * 1000);
        const timeLeftMs = Math.max(0, nextChargeTime - Date.now());
        const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
        setText('#guild-contribution-next-charge-label', 'ui.guild.contribution_next_charge_label', { time: `${minutes}:${seconds}` });
    } else {
        document.getElementById('guild-contribution-next-charge-label').textContent = '';
    }

    // Mise à jour des boutons
    const canContribute = charges > 0;
    document.querySelector('#guild-contribution-buttons button[onclick*="bois"]').disabled = !canContribute || (gameState.player.resources.bois || 0) < GUILD_SETTINGS.CONTRIBUTION_COST;
    document.querySelector('#guild-contribution-buttons button[onclick*="metal"]').disabled = !canContribute || (gameState.player.resources.metal || 0) < GUILD_SETTINGS.CONTRIBUTION_COST;
    document.querySelector('#guild-contribution-buttons button[onclick*="tissu"]').disabled = !canContribute || (gameState.player.resources.tissu || 0) < GUILD_SETTINGS.CONTRIBUTION_COST;
}

window.makeGuildContribution = async function(resourceType) {
    if (isContributing) {
        showToast(t('ui.alerts.guild.contribution_in_progress'), 'system-message');
        return;
    }

    const cost = GUILD_SETTINGS.CONTRIBUTION_COST;
    const xpGain = GUILD_SETTINGS.CONTRIBUTION_XP_GAIN;
    const currencyGain = GUILD_SETTINGS.CONTRIBUTION_CURRENCY_GAIN;

    if (!gameState.player.guildData || gameState.player.guildData.contributionCharges < 1) {
        showToast(t('ui.alerts.guild.not_enough_charges'), 'error');
        return;
    }

    if ((gameState.player.resources[resourceType] || 0) < cost) {
        showToast(t('alerts.not_enough_resources'), 'error');
        return;
    }

    const { auth, db, runTransaction, doc } = window.firebaseTools;
    const user = auth.currentUser;
    const guildId = gameState.player.guildId;

    if (!user || !guildId) return;

    isContributing = true;
    document.querySelectorAll('#guild-contribution-buttons button').forEach(button => button.disabled = true);

    try {
        await runTransaction(db, async (transaction) => {
            const playerRef = doc(db, "players", user.uid);
            const guildDynamicRef = doc(db, "guilds", guildId, "dynamic", "data");

            const [playerDoc, guildDynamicDoc] = await Promise.all([
                transaction.get(playerRef),
                transaction.get(guildDynamicRef)
            ]);

            if (!playerDoc.exists() || !guildDynamicDoc.exists()) {
                throw new Error("Joueur ou Guilde introuvable.");
            }

            const playerData = playerDoc.data();
            const guildDynamicData = guildDynamicDoc.data();

            if ((playerData.player.resources[resourceType] || 0) < cost) {
                throw new Error("Ressources insuffisantes.");
            }

            const newPlayerResources = { ...playerData.player.resources };
            newPlayerResources[resourceType] -= cost;
            newPlayerResources['marques_de_guilde'] = (newPlayerResources['marques_de_guilde'] || 0) + currencyGain;

            transaction.update(playerRef, { "player.resources": newPlayerResources });

            let newGuildXp = guildDynamicData.xp + xpGain;
            let newLevel = guildDynamicData.level;
            let newXpToNext = guildDynamicData.xpToNextLevel;

            // Logique de montée de niveau
            if (newGuildXp >= newXpToNext) {
                newLevel++;
                newGuildXp -= newXpToNext;
                // Formule simple pour l'XP requise, à ajuster si besoin
                newXpToNext = Math.floor(newXpToNext * 1.5); 
                showToast(t('ui.alerts.guild.contribution_level_up', { level: newLevel }), 'success');
            }

            transaction.set(guildDynamicRef, { 
                xp: newGuildXp,
                level: newLevel,
                xpToNextLevel: newXpToNext,
                bank: {
                    ...guildDynamicData.bank,
                    marques_de_guilde: (guildDynamicData.bank?.marques_de_guilde || 0) + currencyGain
                }
            }, { merge: true });
        });

        // Mise à jour de l'état local
        gameState.player.guildData.contributionCharges--;
        gameState.player.resources[resourceType] -= cost;
        gameState.player.resources['marques_de_guilde'] = (gameState.player.resources['marques_de_guilde'] || 0) + currencyGain;
        guildDataCache = null; // Invalide le cache pour forcer un rechargement complet

        showToast(t('ui.alerts.guild.contribution_success', { amount: xpGain }), 'success');
        updateGameUI();
        showMyGuildView();

    } catch (error) {
        console.error("Erreur de contribution :", error);
        showToast(t('ui.alerts.guild.contribution_failed', { error: error.message }), 'error');
    } finally {
        isContributing = false;
        updateContributionModalUI();
    }
}

async function renderGuildMembersList() {
    const listContainer = document.getElementById('guild-members-list');
    const headerTitle = document.getElementById('guild-members-header-title');
    if (!listContainer || !guildDataCache) return;

    listContainer.innerHTML = "Chargement des membres...";

    const { db, doc, getDoc } = window.firebaseTools;
    const memberUIDs = Object.keys(guildDataCache.members); // Correction clé
    const memberDataPromises = memberUIDs.map(uid => getDoc(doc(db, "players", uid)));
    
    try {
        const memberDocs = await Promise.all(memberDataPromises);
        const members = memberDocs.map(doc => {
            if (doc.exists()) {
                const data = doc.data();
                data.player.guildRank = guildDataCache.members[doc.id].rank;
                // NOUVEAU : On stocke l'UID directement dans l'objet pour un accès facile
                data.uid = doc.id; 
                return data;
            }
            return null;
        }).filter(Boolean);

        headerTitle.textContent = t('ui.guild.members_header_title', { current: members.length, max: guildDataCache.maxMembers });

        // On trie les membres par rang
        members.sort((a, b) => (a.player.guildRank || 'R3').localeCompare(b.player.guildRank || 'R3'));

        const ranks = { R0: [], R1: [], R2: [], R3: [] };
        members.forEach(member => {
            const rank = member.player.guildRank || 'R3';
            if (ranks[rank]) ranks[rank].push(member);
        });

        let html = '';

        if (ranks.R0.length > 0) {
            html += `<div class="guild-rank-section"><h3>${t('ui.guild.rank_R0')}</h3>`;
            const leader = ranks.R0[0];
            // MODIFICATION : on passe leader.uid
            html += createMemberCardHTML(leader, leader.uid, true);
            html += `</div>`;
        }

        const rankOrder = ['R1', 'R2', 'R3'];
        rankOrder.forEach(rankKey => {
            if (ranks[rankKey].length > 0) {
                html += `
                    <div class="rank-accordion">
                        <button class="rank-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block';">
                            <span>${t('ui.guild.rank_' + rankKey)} (${ranks[rankKey].length})</span>
                            <span class="arrow">▼</span>
                        </button>
                        <div class="rank-accordion-content">
                            <div class="guild-member-grid">
                                ${ranks[rankKey].map(member => createMemberCardHTML(member, member.uid, false)).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        listContainer.innerHTML = html;

    } catch (error) {
        console.error("Erreur lors de la récupération des membres de la guilde :", error);
        listContainer.innerHTML = "Impossible de charger la liste des membres.";
    }
}

function createMemberCardHTML(memberData, memberUid, isLeader) {
    const player = memberData.player;
    const profilePic = player.profilePictureUrl || CLASS_DATA_DB[player.class]?.portrait || 'assets/sprites/portraits/default_avatar.png';
    const frameId = player.equippedFrame || 'default';
    const frameData = FRAMES_DB[frameId] || FRAMES_DB['default'];
    const framePic = frameData.image;

    // MON COMMENTAIRE : On s'assure de ne pas pouvoir cliquer sur sa propre carte.
    const isCurrentUser = memberUid === window.firebaseTools.auth.currentUser.uid;
    const clickHandler = isCurrentUser ? '' : `onclick="openMemberActionModal('${memberUid}', '${player.name}')"`;

    return `
        <div class="guild-member-card ${isLeader ? 'leader-card' : ''}" ${clickHandler}>
            <div class="guild-member-avatar">
                <img src="${profilePic}" class="pfp" alt="Avatar">
                <img src="${framePic}" class="frame" alt="Cadre">
            </div>
            <div class="guild-member-info">
                <span class="name">${player.name}</span>
                <span class="stats">
                    <strong>${(memberData.powerScore || 0).toLocaleString()}</strong> ${t('ui.guild.power_score_abbr')} | 
                    <strong>${memberData.ascensionLevel || 0}</strong> ${t('ui.guild.ascension_level_abbr')}
                </span>
            </div>
        </div>
    `;
}

function openGuildManagementModal() {
    const modal = document.getElementById('guild-management-modal');
    if (modal) {
        modal.classList.remove('hidden');
        renderGuildManagementUI();
    }
}

// Ferme la modale de gestion de la guilde.
function closeGuildManagementModal() {
    const modal = document.getElementById('guild-management-modal');
    if (modal) modal.classList.add('hidden');
}

// Construit l'interface de la grille des permissions en se basant sur les données de la guilde.
function renderGuildManagementUI() {
    if (!guildDataCache) return;

    setText('#guild-management-title', 'ui.guild.manage_permissions_title');
    setText('#guild-management-modal .modal-close-button', 'ui.buttons.close');
    setText('#guild-save-permissions-btn', 'ui.buttons.save_changes');
    document.getElementById('guild-save-permissions-btn').onclick = saveGuildPermissions;

    const grid = document.getElementById('guild-permissions-grid');
    grid.innerHTML = '';

    let headers = `<div class="permission-header"></div>`;
    // MON COMMENTAIRE : On ajoute une classe dynamique pour chaque rang dans l'en-tête.
    GUILD_PERMISSIONS_DB.editableRanks.forEach(rankKey => {
        headers += `<div class="permission-header rank-${rankKey}">${t('ui.guild.rank_' + rankKey)}</div>`;
    });
    grid.innerHTML += headers;

    const currentPermissions = guildDataCache.permissions || {};

    GUILD_PERMISSIONS_DB.permissionKeys.forEach(perm => {
        let rowHtml = `<div class="permission-label">${t('ui.guild.permission_' + perm.id)}</div>`;
        GUILD_PERMISSIONS_DB.editableRanks.forEach(rankKey => {
            const isChecked = currentPermissions[rankKey]?.[perm.id] || false;
            
            const isDisabled = rankKey === 'R0' ? 'disabled' : '';

            // MON COMMENTAIRE : On ajoute la même classe dynamique pour chaque cellule de permission.
            // Cela permet au CSS de cibler et masquer toute la colonne 'rank-R0'.
            rowHtml += `
                <div class="permission-cell rank-${rankKey}">
                    <input type="checkbox" id="perm-${perm.id}-${rankKey}" data-permission="${perm.id}" data-rank="${rankKey}" ${isChecked ? 'checked' : ''} ${isDisabled}>
                    <label for="perm-${perm.id}-${rankKey}"></label>
                </div>
            `;
        });
        grid.innerHTML += rowHtml;
    });
}

// Sauvegarde les modifications des permissions sur le serveur Firebase.
async function saveGuildPermissions() {
    const { auth, db, runTransaction, doc } = window.firebaseTools;
    const user = auth.currentUser;
    const guildId = gameState.player.guildId;

    if (!user || !guildId) return;

    // On construit le nouvel objet de permissions à partir des cases cochées dans l'UI
    const newPermissions = {};
    document.querySelectorAll('#guild-permissions-grid input[type="checkbox"]').forEach(checkbox => {
        const rank = checkbox.dataset.rank;
        const permission = checkbox.dataset.permission;
        if (!newPermissions[rank]) {
            newPermissions[rank] = {};
        }
        newPermissions[rank][permission] = checkbox.checked;
    });

    try {
        await runTransaction(db, async (transaction) => {
            const guildRef = doc(db, "guilds", guildId);
            const guildDoc = await transaction.get(guildRef);

            if (!guildDoc.exists()) {
                throw new Error("La guilde n'existe plus.");
            }
            const guildData = guildDoc.data();

            // Sécurité : on vérifie que l'utilisateur est bien le chef avant de sauvegarder
            if (guildData.leaderId !== user.uid) {
                throw new Error("Vous n'êtes pas autorisé à modifier ces permissions.");
            }

            // On met à jour le champ 'permissions' de la guilde
            transaction.update(guildRef, { permissions: newPermissions });
        });

        // Si la transaction réussit, on met à jour le cache local et on ferme
        if(guildDataCache) {
            guildDataCache.permissions = newPermissions;
        }
        showToast(t('ui.alerts.guild.permissions_saved'), 'success');
        closeGuildManagementModal();

    } catch (error) {
        console.error("Erreur lors de la sauvegarde des permissions :", error);
        showToast(t('ui.alerts.guild.permissions_save_error', { error: error.message }), 'error');
    }
}

async function leaveGuild() {
    const guildId = gameState.player.guildId;
    if (!guildId) return;

    const guildNameForConfirm = guildDataCache ? guildDataCache.name : "votre guilde";
    const isLeader = gameState.player.guildRank === 'R0';
    const memberCount = guildDataCache ? guildDataCache.memberCount : 1;

    let confirmMessageKey = 'ui.alerts.guild.leave_confirm_generic';
    if (isLeader && memberCount > 1) {
        showToast(t('ui.alerts.guild.leader_leave_error'), 'error', 5000);
        return;
    } else if (isLeader && memberCount === 1) {
        confirmMessageKey = 'ui.alerts.guild.delete_confirm';
    }

    const confirmed = await showCustomConfirm(t(confirmMessageKey, { guildName: guildNameForConfirm }));
    if (!confirmed) return;

    const { auth, db, doc, runTransaction, deleteField } = window.firebaseTools;
    const userId = auth.currentUser.uid;

    try {
        await runTransaction(db, async (transaction) => {
            const guildRef = doc(db, "guilds", guildId);
            const playerRef = doc(db, "players", userId);
            const guildDoc = await transaction.get(guildRef);

            if (!guildDoc.exists()) {
                console.warn("La guilde n'existait plus, nettoyage du profil joueur.");
                transaction.update(playerRef, { "player.guildId": null, "player.guildRank": null });
                return;
            }

            const currentMemberCount = guildDoc.data().memberCount || 0;
            
            // On enregistre l'action AVANT de supprimer le membre.
            await logGuildAction('leave');
            
            transaction.update(guildRef, {
                [`members.${userId}`]: deleteField(),
                memberCount: Math.max(0, currentMemberCount - 1)
            });
            
            transaction.update(playerRef, {
                "player.guildId": null,
                "player.guildRank": null
            });
        });

        gameState.player.guildId = null;
        gameState.player.guildRank = null;
        guildDataCache = null;
        if (guildListenerUnsubscribe) {
            guildListenerUnsubscribe();
            guildListenerUnsubscribe = null;
        }
        saveGame();

        const successMessage = (isLeader && memberCount === 1) 
            ? t('ui.alerts.guild.disband_success')
            : t('ui.alerts.guild.leave_success');
        showToast(successMessage, "success");
        
        showNoGuildView();

    } catch (error) {
        console.error("Erreur en quittant la guilde :", error);
        showToast(t('ui.alerts.guild.leave_error'), "error", 5000);
    }
}

function showFindGuildView() {
    document.getElementById('no-guild-view').classList.add('hidden');
    document.getElementById('my-guild-view').classList.add('hidden');
    document.getElementById('create-guild-view').classList.add('hidden');
    document.getElementById('find-guild-view').classList.remove('hidden');
    
    // On lance une recherche initiale pour les guildes les plus peuplées
    searchGuilds(); 
}

// MON COMMENTAIRE: Nouvelle fonction pour rechercher des guildes sur le serveur.
async function searchGuilds() {
    const { db, collection, query, where, getDocs, limit, orderBy } = window.firebaseTools;
    const resultsContainer = document.getElementById('guild-list-results');
    resultsContainer.innerHTML = `<p>${t('ui.leaderboard.loading')}</p>`;

    const searchTerm = document.getElementById('guild-search-input').value.trim();
    const guildsRef = collection(db, "guilds");
    let q;

    try {
        if (searchTerm) {
            // Recherche par nom ou par tag (insensible à la casse)
            const lowerCaseTerm = searchTerm.toLowerCase();
            q = query(guildsRef, 
                      where("name_lowercase", ">=", lowerCaseTerm),
                      where("name_lowercase", "<=", lowerCaseTerm + '\uf8ff'),
                      limit(20));
        } else {
            // MON COMMENTAIRE : C'est ici que la modification a lieu.
            // On cherche les guildes avec un nombre de membres >= 1 et on trie par les plus peuplées.
            q = query(guildsRef, 
                      where("memberCount", ">=", 1), 
                      orderBy("memberCount", "desc"), 
                      limit(10));
        }

        const querySnapshot = await getDocs(q);
        const guilds = [];
        querySnapshot.forEach(doc => {
            const guildData = doc.data();
            
            // MON COMMENTAIRE : On ajoute la vérification ici pour s'assurer que les guildes
            // pleines ne sont pas affichées, même si la requête les renvoyait.
            if (guildData.memberCount < guildData.maxMembers) {
                guilds.push(guildData);
            }
        });
        
        renderGuildList(guilds);

    } catch (error) {
        console.error("Erreur de recherche de guilde:", error);
        resultsContainer.innerHTML = `<p>${t('ui.leaderboard.load_error')}</p>`;
        // On informe l'utilisateur s'il doit créer un index manuellement
        if (error.code === 'failed-precondition') {
            // MON COMMENTAIRE : J'ai ajouté un message plus clair pour toi dans la console du navigateur.
            console.error("ACTION REQUISE : Vous devez créer un index composite. Cliquez sur le lien dans le message d'erreur complet pour le créer automatiquement dans la console Firebase.");
            showToast("La base de données doit être configurée pour cette recherche. Voir la console.", "error", 5000);
        }
    }
}

// MON COMMENTAIRE: Nouvelle fonction pour afficher la liste des guildes trouvées.
function renderGuildList(guilds) {
    const resultsContainer = document.getElementById('guild-list-results');
    if (guilds.length === 0) {
        resultsContainer.innerHTML = `<p>${t('ui.guild.no_results')}</p>`;
        return;
    }

    resultsContainer.innerHTML = guilds.map(guild => {
        const isFull = guild.memberCount >= guild.maxMembers;
        return `
            <div class="guild-list-item">
                <div class="guild-list-info">
                    <strong>${guild.name} [${guild.tag}]</strong>
                    <span>${t('ui.guild.members', { count: guild.memberCount, max: guild.maxMembers })}</span>
                </div>
                <button class="action-button" onclick="joinGuild('${guild.id}', '${guild.name}')" ${isFull ? 'disabled' : ''}>
                    ${isFull ? t('ui.guild.is_full') : t('ui.guild.join_button')}
                </button>
            </div>
        `;
    }).join('');
}

// MON COMMENTAIRE: Nouvelle fonction pour gérer la logique pour rejoindre une guilde.
async function joinGuild(guildId, guildName) {
    if (gameState.player.guildId) {
        showToast(t('ui.alerts.guild.already_in_guild'), 'error');
        return;
    }
    
    const confirmed = await showCustomConfirm(t('ui.alerts.guild.confirm_join', { guildName: guildName }));
    if (!confirmed) return;

    const { auth, db, runTransaction, doc, serverTimestamp } = window.firebaseTools;
    const user = auth.currentUser;
    const playerName = gameState.player.name; // On récupère le nom du joueur

    try {
        await runTransaction(db, async (transaction) => {
            const playerRef = doc(db, "players", user.uid);
            const guildRef = doc(db, "guilds", guildId);

            const guildDoc = await transaction.get(guildRef);
            if (!guildDoc.exists()) throw new Error("La guilde n'existe plus.");

            const guildData = guildDoc.data();
            const memberCount = Object.keys(guildData.members || {}).length;

            if (memberCount >= guildData.maxMembers) throw new Error(t('ui.guild.is_full'));

            transaction.update(guildRef, {
                [`members.${user.uid}`]: {
                    rank: 'R3',
                    joinedAt: serverTimestamp()
                },
                memberCount: memberCount + 1
            });
            
            transaction.update(playerRef, {
                "player.guildId": guildId,
                "player.guildRank": 'R3'
            });
        });
        
        // MON COMMENTAIRE : On met à jour l'état local AVANT d'appeler la fonction de log.
        gameState.player.guildId = guildId;
        gameState.player.guildRank = 'R3';
        guildDataCache = null;
        saveGame();
        
        // MON COMMENTAIRE : Maintenant que l'ID de la guilde est connu localement, on peut enregistrer l'action.
        await logGuildAction('join', { memberName: playerName });
        
        showToast(t('ui.alerts.guild.join_success', { guildName: guildName }), 'success');
        
        document.getElementById('find-guild-view').classList.add('hidden');
        showMyGuildView();

    } catch (error) {
        console.error("Erreur pour rejoindre la guilde:", error);
        showToast(t('ui.alerts.guild.join_failed', { error: error.message }), 'error');
    }
}

// =================================================================================
// NOUVELLES FONCTIONS : GESTION DES ACTIONS SUR LES MEMBRES DE GUILDE
// =================================================================================

function openMemberActionModal(memberId, memberName) {
    // On ne peut pas effectuer d'action sur soi-même
    if (memberId === window.firebaseTools.auth.currentUser.uid) {
        showToast(t('ui.guild_member_actions.cannot_change_own_rank'), 'system-message');
        return;
    }

    selectedMemberForAction = { uid: memberId, name: memberName };

    const modal = document.getElementById('member-action-modal');
    setText('#member-action-title', 'ui.guild_member_actions.modal_title', { memberName: memberName });
    setText('#member-action-friend-btn', 'ui.guild_member_actions.add_friend');
    setText('#member-action-chat-btn', 'ui.guild_member_actions.chat');
    setText('#member-action-rank-btn', 'ui.guild_member_actions.manage_rank');
    setText('#member-action-modal .modal-close-button', 'ui.buttons.close');

    const rankButton = document.getElementById('member-action-rank-btn');
    const expelButton = document.getElementById('member-action-expel-btn');
    
    const playerRank = gameState.player.guildRank;
    const targetMemberRank = guildDataCache.members[memberId]?.rank;

    // On définit une hiérarchie numérique claire pour les rangs
    const rankHierarchy = { 'R0': 0, 'R1': 1, 'R2': 2, 'R3': 3 };
    const playerHierarchy = rankHierarchy[playerRank];
    const targetHierarchy = rankHierarchy[targetMemberRank];
    const isLeader = playerRank === 'R0';

    // Logique pour le bouton "Gérer le rang"
    const hasRankPermission = isLeader || (guildDataCache.permissions[playerRank]?.canEditRanks || false);
    if (hasRankPermission && targetMemberRank !== 'R0') {
        showElement(rankButton);
    } else {
        hideElement(rankButton);
    }
    
    // Logique pour le bouton "Expulser"
    let canExpel = false;
    if (isLeader) {
        // Le Chef peut expulser n'importe qui sauf un autre Chef (impossible)
        if (targetMemberRank !== 'R0') {
            canExpel = true;
        }
    } else {
        // Un non-Chef a besoin de la permission ET d'un rang supérieur à la cible
        const hasKickPermission = guildDataCache.permissions[playerRank]?.canKick || false;
        if (hasKickPermission && playerHierarchy < targetHierarchy) {
            canExpel = true;
        }
    }

    if (canExpel) {
        // On modifie directement le style pour outrepasser le style en ligne du HTML
        expelButton.style.display = 'block';
        setText('#member-action-expel-btn', 'ui.guild_member_actions.expel_button');
        expelButton.onclick = () => expelMember(memberId, memberName);
    } else {
        expelButton.style.display = 'none';
    }

    modal.classList.remove('hidden');
}

function closeMemberActionModal() {
    document.getElementById('member-action-modal').classList.add('hidden');
    selectedMemberForAction = null;
}

function openRankManagementModal() {
    if (!selectedMemberForAction) return;

    const memberToManage = selectedMemberForAction;
    closeMemberActionModal();

    const modal = document.getElementById('rank-management-modal');
    setText('#rank-management-title', 'ui.guild_member_actions.rank_modal_title', { memberName: memberToManage.name });
    setText('#rank-management-modal .modal-close-button', 'ui.buttons.close');

    const container = document.getElementById('rank-options-container');
    container.innerHTML = '';

    const playerRank = gameState.player.guildRank;
    const playerIsLeader = playerRank === 'R0';
    const targetMemberRank = guildDataCache.members[memberToManage.uid].rank;
    
    const assignableRanks = ['R1', 'R2', 'R3'];
    
    // Seul le chef peut promouvoir un autre officier au rang de chef.
    if (playerIsLeader && targetMemberRank === 'R1') {
        assignableRanks.unshift('R0');
    }

    assignableRanks.forEach(rankKey => {
        const button = document.createElement('button');
        button.className = 'action-button rank-option-btn';
        if (rankKey === targetMemberRank) {
            button.classList.add('selected');
        }
        button.textContent = t('ui.guild.rank_' + rankKey);

        let isDisabled = true; // Par défaut, le bouton est désactivé.

        if (playerIsLeader) {
            // Le chef peut tout faire, sauf assigner à un membre son propre rang (inutile).
            if (rankKey !== targetMemberRank) {
                isDisabled = false;
            }
        } else {
            // Un non-chef (ex: Officier) ne peut gérer que les rangs inférieurs au sien.
            const rankHierarchy = { 'R0': 0, 'R1': 1, 'R2': 2, 'R3': 3 };
            const playerHierarchy = rankHierarchy[playerRank];
            const targetHierarchy = rankHierarchy[targetMemberRank];
            const newRankHierarchy = rankHierarchy[rankKey];

            // Conditions :
            // 1. La cible doit avoir un rang inférieur au joueur.
            // 2. Le nouveau rang ne peut pas être le rang actuel de la cible.
            // 3. Le nouveau rang doit être inférieur ou égal au rang du joueur (un officier ne peut pas créer un autre officier).
            if (targetHierarchy > playerHierarchy && rankKey !== targetMemberRank && newRankHierarchy >= playerHierarchy) {
                 isDisabled = false;
            }
        }

        button.disabled = isDisabled;
        button.onclick = () => changeMemberRank(memberToManage.uid, memberToManage.name, rankKey);
        container.appendChild(button);
    });

    modal.classList.remove('hidden');
}

function closeRankManagementModal() {
    document.getElementById('rank-management-modal').classList.add('hidden');
    selectedMemberForAction = null;
}

async function changeMemberRank(targetUid, targetName, newRank) {
    const guildId = gameState.player.guildId;
    const currentUser = window.firebaseTools.auth.currentUser;

    if (!targetUid || !currentUser) return;
    
    const newRankName = t('ui.guild.rank_' + newRank);

    if (newRank === 'R0') {
        const confirmed = await showCustomConfirm(t('ui.guild_member_actions.leader_transfer_confirm', { memberName: targetName }));
        if (!confirmed) return;
    } else {
        const confirmed = await showCustomConfirm(t('ui.guild_member_actions.confirm_rank_change', { memberName: targetName, newRankName: newRankName }));
        if (!confirmed) return;
    }
    
    const { db, doc, runTransaction } = window.firebaseTools;

    const oldRank = guildDataCache.members[targetUid]?.rank;

    try {
        await runTransaction(db, async (transaction) => {
            const guildRef = doc(db, "guilds", guildId);
            const guildDoc = await transaction.get(guildRef);
            if (!guildDoc.exists()) throw new Error("La guilde n'existe plus.");

            const guildData = guildDoc.data();
            
            if (guildData.leaderId === targetUid && newRank !== 'R0') {
                throw new Error(t('ui.alerts.guild.leader_demote_error'));
            }
            
            if (newRank === 'R0') {
                transaction.update(guildRef, {
                    leaderId: targetUid,
                    [`members.${targetUid}.rank`]: 'R0',
                    [`members.${currentUser.uid}.rank`]: 'R1'
                });
            } else {
                transaction.update(guildRef, {
                    [`members.${targetUid}.rank`]: newRank
                });
            }
        });

        // On enregistre l'action dans le journal.
        await logGuildAction('rank_change', { targetUid, targetName, newRank, oldRank });

        if (newRank === 'R0') {
            guildDataCache.leaderId = targetUid;
            guildDataCache.members[targetUid].rank = 'R0';
            guildDataCache.members[currentUser.uid].rank = 'R1';

            if (currentUser.uid === targetUid) {
                gameState.player.guildRank = 'R0';
            } else {
                gameState.player.guildRank = 'R1';
            }

        } else {
            guildDataCache.members[targetUid].rank = newRank;
        }
        saveGame();

        showToast(t('ui.guild_member_actions.rank_change_success', { memberName: targetName }), 'success');
        
        closeRankManagementModal();
        renderGuildMembersList();

    } catch (error) {
        console.error("Erreur lors du changement de rang:", error);
        showToast(t('ui.guild_member_actions.rank_change_error', { error: error.message }), 'error');
    }
}

async function expelMember(targetUid, targetName) {
    const guildId = gameState.player.guildId;
    if (!guildId) return;

    const confirmed = await showCustomConfirm(t('ui.guild_member_actions.expel_confirm', { memberName: targetName }));
    if (!confirmed) return;

    const { auth, db, doc, runTransaction, deleteField } = window.firebaseTools;
    const userId = auth.currentUser.uid;

    try {
        const guildRef = doc(db, "guilds", guildId);

        await runTransaction(db, async (transaction) => {
            const guildDoc = await transaction.get(guildRef);
            if (!guildDoc.exists()) throw new Error("La guilde n'existe plus.");
            
            const guildData = guildDoc.data();
            const memberCount = guildData.memberCount || 0;
            
            const playerRank = guildData.members[userId]?.rank;
            const targetRank = guildData.members[targetUid]?.rank;
            const rankHierarchy = { 'R0': 0, 'R1': 1, 'R2': 2, 'R3': 3 };

            if (!playerRank || !targetRank || rankHierarchy[playerRank] >= rankHierarchy[targetRank]) {
                 throw new Error("Vous ne pouvez pas expulser un membre de rang égal ou supérieur.");
            }

            transaction.update(guildRef, {
                [`members.${targetUid}`]: deleteField(),
                memberCount: Math.max(0, memberCount - 1)
            });
        });

        // On enregistre l'action dans le journal.
        await logGuildAction('expel', { targetUid, targetName });
        
        if (guildDataCache && guildDataCache.members[targetUid]) {
            delete guildDataCache.members[targetUid];
            guildDataCache.memberCount--;
        }

        showToast(t('ui.guild_member_actions.expel_success', { memberName: targetName }), "success");
        
        closeMemberActionModal();
        renderGuildMembersList();

    } catch (error) {
        console.error("Erreur lors de l'expulsion du membre :", error);
        showToast(t('ui.guild_member_actions.expel_error', { error: error.message }), 'error');
    }
}

function listenToGuildChanges(guildId) {
    if (guildListenerUnsubscribe) {
        guildListenerUnsubscribe();
        guildListenerUnsubscribe = null;
    }
    if (!guildId) return;

    const { db, doc, onSnapshot } = window.firebaseTools;
    const guildRef = doc(db, "guilds", guildId);

    console.log(`[Realtime] Mise en place de l'écouteur pour la guilde : ${guildId}`);

    guildListenerUnsubscribe = onSnapshot(guildRef, (docSnap) => {
        const userId = window.firebaseTools.auth.currentUser.uid;

        if (docSnap.exists()) {
            const guildData = docSnap.data();

            if (gameState.player.guildId && (!guildData.members || !guildData.members[userId])) {
                console.warn("[Realtime] Expulsion détectée. Nettoyage du profil local.");
                
                gameState.player.guildId = null;
                gameState.player.guildRank = null;
                guildDataCache = null;
                saveGame();

                showToast(t('ui.alerts.guild.expelled'), "error");
                
                showNoGuildView();
                
                if (guildListenerUnsubscribe) {
                    guildListenerUnsubscribe();
                    guildListenerUnsubscribe = null;
                }
                return;
            }

            guildDataCache = { ...(guildDataCache || {}), ...guildData };
            
            const newRank = guildData.members[userId]?.rank;
            if (newRank && gameState.player.guildRank !== newRank) {
                gameState.player.guildRank = newRank;
                saveGame();
                showToast(`Votre rang dans la guilde a été changé en : ${t('ui.guild.rank_' + newRank)}`, "system-message");
                // On force la mise à jour de l'UI pour refléter les nouvelles permissions.
                showMyGuildView();
            }

            const socialScreen = document.getElementById('social-screen');
            if (socialScreen && !socialScreen.classList.contains('hidden')) {
                updateGuildUI();
            }

        } else {
            if (gameState.player.guildId === null) return;
            console.warn("[Realtime] La guilde a été dissoute. Nettoyage...");
            gameState.player.guildId = null;
            gameState.player.guildRank = null;
            guildDataCache = null;
            saveGame();
            showToast(t('ui.alerts.guild.disband_success'), "info");
            showNoGuildView();
            if (guildListenerUnsubscribe) {
                guildListenerUnsubscribe();
                guildListenerUnsubscribe = null;
            }
        }
    }, (error) => {
        console.error("[Realtime] Erreur de l'écouteur de guilde :", error);
    });
}
async function logGuildAction(actionType, details = {}) {
    const { auth, db, collection, addDoc, serverTimestamp } = window.firebaseTools;
    const user = auth.currentUser;
    const guildId = gameState.player.guildId || guildDataCache?.id;

    if (!user || !guildId) return;

    // Partie 1: Enregistre le log pour le panneau du Chef (inchangé)
    try {
        const logCollectionRef = collection(db, 'guilds', guildId, 'logs');
        await addDoc(logCollectionRef, {
            action: actionType,
            actorUid: user.uid,
            actorName: gameState.player.name,
            timestamp: serverTimestamp(),
            ...details
        });
        console.log(`[LOG] Action de guilde '${actionType}' enregistrée.`);
    } catch (logError) {
        console.error("Erreur lors de l'enregistrement du log de guilde:", logError);
    }
    
    // Partie 2: Envoie un message de type "système" dans le chat principal
    try {
        const chatCollectionRef = collection(db, 'guilds', guildId, 'chat');
        await addDoc(chatCollectionRef, {
            type: 'system',
            action: actionType,
            actorName: gameState.player.name,
            timestamp: serverTimestamp(),
            ...details
        });
        console.log(`[CHAT LOG] Message système pour '${actionType}' envoyé.`);
    } catch (chatLogError) {
        console.error("Erreur lors de l'envoi du message système de guilde:", chatLogError);
    }
}

function openGuildLogsModal() {
    const modal = document.getElementById('guild-logs-modal');
    if (modal) {
        // MON COMMENTAIRE : On retire la classe pour les transitions CSS.
        modal.classList.remove('hidden');
        // MON COMMENTAIRE : On force l'affichage en flexbox, c'était l'instruction manquante.
        modal.style.display = 'flex';
        // MON COMMENTAIRE : On bloque le scroll de l'arrière-plan pour une meilleure expérience utilisateur.
        document.body.classList.add('modal-open');
        
        renderGuildLogs();
    }
}

/**
 * Ferme la modale du journal de guilde.
 */
function closeGuildLogsModal() {
    const modal = document.getElementById('guild-logs-modal');
    if (modal) {
        // MON COMMENTAIRE : On remet la classe pour la cohérence.
        modal.classList.add('hidden');
        // MON COMMENTAIRE : On s'assure qu'elle est bien cachée.
        modal.style.display = 'none';
        // MON COMMENTAIRE : On réactive le scroll de l'arrière-plan.
        document.body.classList.remove('modal-open');
    }
}

/**
 * Récupère et affiche les derniers événements de la guilde.
 */
async function renderGuildLogs() {
    const listContainer = document.getElementById('guild-logs-list');
    if (!listContainer) return;

    setText('#guild-logs-title', 'ui.guild.logs_modal_title');
    setText('#guild-logs-modal .modal-close-button', 'ui.buttons.close');
    listContainer.innerHTML = `<p>${t('ui.guild_logs.loading')}</p>`;

    const guildId = gameState.player.guildId;
    if (!guildId) {
        listContainer.innerHTML = `<p>${t('ui.guild_logs.empty')}</p>`;
        return;
    }

    const { db, collection, query, orderBy, limit, getDocs } = window.firebaseTools;
    
    try {
        const logsRef = collection(db, 'guilds', guildId, 'logs');
        const q = query(logsRef, orderBy("timestamp", "desc"), limit(50));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            listContainer.innerHTML = `<p>${t('ui.guild_logs.empty')}</p>`;
            return;
        }

        let logsHtml = '';
        querySnapshot.forEach(doc => {
            const log = doc.data();
            const date = log.timestamp?.toDate().toLocaleString() || 'Date inconnue';
            let message = `Action inconnue: ${log.action}`;

            switch(log.action) {
                case 'join':
                    message = t('ui.guild_logs.joined', { memberName: `<strong>${log.memberName}</strong>` });
                    break;
                case 'leave':
                    message = t('ui.guild_logs.left', { actorName: `<strong>${log.actorName}</strong>` });
                    break;
                case 'expel':
                    message = t('ui.guild_logs.expelled', { actorName: `<strong>${log.actorName}</strong>`, targetName: `<strong>${log.targetName}</strong>` });
                    break;
                case 'rank_change':
                    const newRankName = t('ui.guild.rank_' + log.newRank);
                    message = t('ui.guild_logs.rank_changed', { actorName: `<strong>${log.actorName}</strong>`, targetName: `<strong>${log.targetName}</strong>`, newRankName: `<strong>${newRankName}</strong>` });
                    break;
            }
            logsHtml += `<div class="guild-log-item"><small class="log-timestamp">${date}</small><p>${message}</p></div>`;
        });
        listContainer.innerHTML = logsHtml;

    } catch (error) {
        console.error("Erreur lors du chargement du journal de guilde:", error);
        listContainer.innerHTML = `<p>${t('ui.leaderboard.load_error')}</p>`;
    }
}


function switchChatTab(tabName) {
    // Nettoie les anciens écouteurs temps-réel avant de changer d'onglet
    cleanupChatListeners();

    document.querySelectorAll('.chat-pane').forEach(pane => pane.classList.remove('active'));
    document.querySelectorAll('.chat-tab-button').forEach(button => button.classList.remove('active'));

    document.getElementById(`${tabName}-chat-pane`).classList.add('active');
    document.querySelector(`.chat-tab-button[data-tab="${tabName}"]`).classList.add('active');

    if (tabName === 'guild') {
        listenForGuildMessages();
    } else if (tabName === 'private') {
        renderConversationsList();
        // On n'attache pas de listener ici, on attend que l'utilisateur clique sur une conversation
    }
}

// AJOUTE CETTE NOUVELLE FONCTION pour initialiser l'écran de chat
function initializeChatScreen() {
    // Traduction des textes
    setText('#chat-title', 'ui.chat.title');
    setText('.chat-tab-button[data-tab="guild"]', 'ui.chat.tab_guild');
    setText('.chat-tab-button[data-tab="private"]', 'ui.chat.tab_private');
    
    // Logique pour le chat de guilde
    const guildInput = document.getElementById('guild-chat-input');
    const guildSendBtn = document.getElementById('guild-chat-send-btn');
    guildInput.placeholder = t('ui.chat.placeholder_guild');
    guildSendBtn.textContent = t('ui.chat.send_button');
    guildSendBtn.onclick = () => sendGuildMessage();
    // Permet d'envoyer avec la touche "Entrée"
    guildInput.onkeyup = (event) => { if (event.key === 'Enter') sendGuildMessage(); };

    // Logique pour le chat privé (sera complétée plus tard)
    const privateInput = document.getElementById('private-chat-input');
    const privateSendBtn = document.getElementById('private-chat-send-btn');
    privateInput.placeholder = t('ui.chat.placeholder_private');
    privateSendBtn.textContent = t('ui.chat.send_button');

    // Par défaut, on affiche le chat de guilde
    switchChatTab('guild');
}

// Remplacez votre fonction vide par celle-ci
function listenForGuildMessages() {
    const messagesContainer = document.getElementById('guild-chat-messages');
    messagesContainer.innerHTML = `<p>${t('ui.chat.loading_chat')}</p>`;

    const guildId = gameState.player.guildId;
    if (!guildId) {
        messagesContainer.innerHTML = `<p>${t('ui.chat.chat_disabled')}</p>`;
        return;
    }

    messagesContainer.onscroll = null;

    const { db, collection, query, orderBy, onSnapshot, limit } = window.firebaseTools;
    const chatCollectionRef = collection(db, 'guilds', guildId, 'chat');
    const q = query(chatCollectionRef, orderBy("timestamp", "desc"), limit(20));

    guildChatListenerUnsubscribe = onSnapshot(q, (querySnapshot) => {
        messagesContainer.innerHTML = '';
        const docs = querySnapshot.docs;
        
        oldestMessageDoc = docs.length > 0 ? docs[docs.length - 1] : null;
        isLoadingMoreMessages = false;

        const messages = docs.map(doc => doc.data()).reverse();
        let lastTimestamp = null;

        messages.forEach(msg => {
            if (msg.timestamp) {
                const currentTimestamp = msg.timestamp.toDate();
                if (lastTimestamp && (currentTimestamp.getTime() - lastTimestamp.getTime()) > 15 * 60 * 1000) {
                    const formattedTime = currentTimestamp.toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    renderSystemMessage(`— ${formattedTime} —`, messagesContainer, false);
                }
                lastTimestamp = currentTimestamp;
            }

            // Correction de la logique de rendu pour bien distinguer les types de messages
            if (msg.type === 'system' && msg.action) {
                console.log("[Chat Listener] Message identifié comme SYSTÈME. Rendu en cours...", msg);
                renderSystemLogMessage(msg, messagesContainer, false);
            } else if (msg.message && msg.senderUid) {
                renderChatMessage(msg, messagesContainer, false);
            }
        });

        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);

        messagesContainer.onscroll = () => {
            if (messagesContainer.scrollTop === 0 && !isLoadingMoreMessages && oldestMessageDoc) {
                loadMoreGuildMessages();
            }
        };

    }, (error) => {
        console.error("Erreur d'écoute du chat de guilde:", error);
        messagesContainer.innerHTML = `<p>${t('ui.leaderboard.load_error')}</p>`;
    });
}

// AJOUTEZ cette nouvelle fonction pour afficher un message
async function renderChatMessage(msg, container, prepend = false) {
    if (!msg.timestamp || !msg.senderUid) return;

    const { db, doc, getDoc } = window.firebaseTools;
    const isMine = msg.senderUid === window.firebaseTools.auth.currentUser.uid;
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isMine ? 'mine' : 'other'}`;
    messageDiv.dataset.senderUid = msg.senderUid; 

    // NOUVELLE STRUCTURE HTML
    messageDiv.innerHTML = `
        <div class="message-avatar-container" onclick="openPlayerProfileModal('${msg.senderUid}', '${msg.senderName}')">
            <img src="assets/sprites/portraits/default_avatar.png" class="pfp" alt="Avatar">
            <img src="assets/sprites/frames/default_1024.png" class="frame" alt="Cadre">
        </div>
        <div class="message-details">
            <div class="sender-info"><strong>${msg.senderName}</strong></div>
            <div class="message-content"><p>${msg.message}</p></div>
        </div>
    `;

    if (prepend) {
        container.prepend(messageDiv);
    } else {
        container.appendChild(messageDiv);
    }

    const pfpElement = messageDiv.querySelector('.pfp');
    const frameElement = messageDiv.querySelector('.frame');

    if (chatUserCache[msg.senderUid]) {
        const userData = chatUserCache[msg.senderUid];
        pfpElement.src = userData.pfp;
        frameElement.src = userData.frame;
    } else {
        try {
            const userDoc = await getDoc(doc(db, "players", msg.senderUid));
            if (userDoc.exists()) {
                const playerData = userDoc.data().player;
                const pfp = playerData.profilePictureUrl || CLASS_DATA_DB[playerData.class]?.portrait || 'assets/sprites/portraits/default_avatar.png';
                const frameId = playerData.equippedFrame || 'default';
                const frameData = FRAMES_DB[frameId] || FRAMES_DB['default'];
                const frame = frameData.image;

                chatUserCache[msg.senderUid] = { pfp, frame };
                pfpElement.src = pfp;
                frameElement.src = frame;
            }
        } catch (error) {
            console.error("Erreur de chargement du profil pour le chat:", error);
        }
    }
}

function renderSystemMessage(text, container, prepend = false, extraClasses = []) {
    const systemMessageDiv = document.createElement('div');
    systemMessageDiv.className = 'chat-system-message';
    extraClasses.forEach(c => systemMessageDiv.classList.add(c));
    systemMessageDiv.innerHTML = text; 

    if (prepend) {
        // Si on préfixe, on cherche l'élément juste après pour insérer avant lui,
        // pour que les messages restent dans le bon ordre.
        const firstMessage = container.querySelector('.chat-message, .chat-system-message');
        if (firstMessage) {
            container.insertBefore(systemMessageDiv, firstMessage);
        } else {
            container.appendChild(systemMessageDiv);
        }
    } else {
        container.appendChild(systemMessageDiv);
    }
}

// MON COMMENTAIRE: Affiche un log de guilde comme un message système coloré.
function renderSystemLogMessage(msg, container, prepend = false) {
    let message = '';
    let colorClass = '';

    switch(msg.action) {
        case 'join':
            message = t('ui.guild_logs.joined', { memberName: `<strong>${msg.memberName}</strong>` });
            colorClass = 'log-join';
            break;
        case 'leave':
            message = t('ui.guild_logs.left', { actorName: `<strong>${msg.actorName}</strong>` });
            colorClass = 'log-leave';
            break;
        case 'expel':
            message = t('ui.guild_logs.expelled', { actorName: `<strong>${msg.actorName}</strong>`, targetName: `<strong>${msg.targetName}</strong>` });
            colorClass = 'log-leave';
            break;
        case 'rank_change':
            const newRankName = t('ui.guild.rank_' + msg.newRank);
            message = t('ui.guild_logs.rank_changed', { 
                actorName: `<strong>${msg.actorName}</strong>`, 
                targetName: `<strong>${msg.targetName}</strong>`, 
                newRankName: `<strong>${newRankName}</strong>` 
            });
            
            const rankHierarchy = { 'R0': 0, 'R1': 1, 'R2': 2, 'R3': 3 };
            const newRankValue = rankHierarchy[msg.newRank];
            const oldRankValue = rankHierarchy[msg.oldRank];
            
            if (oldRankValue !== undefined && newRankValue < oldRankValue) {
                colorClass = 'log-promote';
            } else {
                colorClass = 'log-demote';
            }
            break;
    }

    if (message) {
        renderSystemMessage(message, container, prepend, [colorClass]);
    }
}

async function sendGuildMessage() {
    // MON COMMENTAIRE : On vérifie toujours le cooldown en premier.
    if (isChatCooldown) {
        showToast(t('ui.chat.cooldown'), 'error');
        return;
    }

    const input = document.getElementById('guild-chat-input');
    const sendButton = document.getElementById('guild-chat-send-btn');
    const message = input.value.trim();

    if (!message || !gameState.player.guildId) {
        return;
    }

    isChatCooldown = true;
    input.disabled = true;
    sendButton.disabled = true;

    // MON COMMENTAIRE : J'ai remplacé `updateDoc` (qui n'était pas disponible) par `setDoc`.
    const { auth, db, collection, addDoc, serverTimestamp, doc, setDoc } = window.firebaseTools;
    const user = auth.currentUser;

    try {
        const chatCollectionRef = collection(db, 'guilds', gameState.player.guildId, 'chat');
        
        await addDoc(chatCollectionRef, {
            senderUid: user.uid,
            senderName: gameState.player.name,
            message: message,
            timestamp: serverTimestamp()
        });

        const playerRef = doc(db, "players", user.uid);
        // MON COMMENTAIRE : On utilise `setDoc` avec l'option `{ merge: true }`.
        // Cela met à jour uniquement le champ spécifié sans écraser le reste du document du joueur.
        // C'est la méthode moderne et plus sûre pour faire des mises à jour partielles.
        await setDoc(playerRef, {
            player: {
                lastGuildMessageTimestamp: serverTimestamp()
            }
        }, { merge: true });

        input.value = '';

        setTimeout(() => {
            isChatCooldown = false;
            input.disabled = false;
            sendButton.disabled = false;
        }, 5000);

    } catch (error) {
        console.error("Erreur lors de l'envoi du message de guilde :", error);
        showToast("Erreur d'envoi du message.", 'error');

        isChatCooldown = false;
        input.disabled = false;
        sendButton.disabled = false;
    }
}

// AJOUTE CETTE NOUVELLE FONCTION (vide pour l'instant) pour afficher la liste des conversations privées
function renderConversationsList() {
    const listContainer = document.getElementById('conversations-list');
    listContainer.innerHTML = `
        <p style="text-align: center; color: var(--color-text-secondary);">
            ${t('ui.chat.no_conversations')}<br>
            <small>${t('ui.chat.start_conversation_prompt')}</small>
        </p>
    `;

    // La logique Firebase pour lister les conversations existantes viendra ici
    console.log("Affichage de la liste des conversations privées...");
}

// AJOUTE CETTE NOUVELLE FONCTION pour nettoyer les écouteurs Firebase
function cleanupChatListeners() {
    if (guildChatListenerUnsubscribe) {
        console.log("Arrêt de l'écouteur du chat de guilde.");
        guildChatListenerUnsubscribe();
        guildChatListenerUnsubscribe = null;
    }
    if (privateChatListenerUnsubscribe) {
        console.log("Arrêt de l'écouteur du chat privé.");
        privateChatListenerUnsubscribe();
        privateChatListenerUnsubscribe = null;
    }
}

async function loadMoreGuildMessages() {
    isLoadingMoreMessages = true;
    const messagesContainer = document.getElementById('guild-chat-messages');
    const oldScrollHeight = messagesContainer.scrollHeight;

    const guildId = gameState.player.guildId;
    if (!guildId || !oldestMessageDoc) {
        isLoadingMoreMessages = false;
        return;
    }

    const { db, collection, query, orderBy, limit, getDocs, startAfter } = window.firebaseTools;
    const chatCollectionRef = collection(db, 'guilds', guildId, 'chat');
    const q = query(chatCollectionRef, orderBy("timestamp", "desc"), startAfter(oldestMessageDoc), limit(20));

    try {
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs;

        if (docs.length > 0) {
            const firstOldMessageTimestamp = oldestMessageDoc.data().timestamp.toDate();
            oldestMessageDoc = docs[docs.length - 1]; 

            const messages = docs.map(doc => doc.data()).reverse();
            let lastTimestamp = messages[messages.length - 1].timestamp.toDate();
            
            if ((firstOldMessageTimestamp.getTime() - lastTimestamp.getTime()) > 15 * 60 * 1000) {
                const formattedTime = firstOldMessageTimestamp.toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                renderSystemMessage(`— ${formattedTime} —`, messagesContainer, true);
            }

            // Correction de la logique de rendu (identique à la fonction précédente)
            messages.forEach(msg => {
                if (msg.type === 'system' && msg.action) {
                    renderSystemLogMessage(msg, messagesContainer, true);
                } else if (msg.message && msg.senderUid) {
                    renderChatMessage(msg, messagesContainer, true);
                }
            });
            
            messagesContainer.scrollTop = messagesContainer.scrollHeight - oldScrollHeight;
        } else {
            oldestMessageDoc = null; 
            renderSystemMessage(`— ${t('ui.guild_logs.empty')} —`, messagesContainer, true);
        }
    } catch (error) {
        console.error("Erreur lors du chargement de l'historique :", error);
    } finally {
        isLoadingMoreMessages = false;
    }
}

/**
 * Ouvre la modale de la boutique de guilde.
 */
function openGuildShopModal() {
    const modal = document.getElementById('guild-shop-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        switchGuildShopTab('personal'); // Ouvre sur l'onglet personnel par défaut
    }
}

/**
 * Ferme la modale de la boutique de guilde.
 */
function closeGuildShopModal() {
    const modal = document.getElementById('guild-shop-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

/**
 * Change l'onglet affiché dans la boutique de guilde.
 * @param {string} tabName - 'personal' ou 'guild'.
 */
function switchGuildShopTab(tabName) {
    document.querySelectorAll('.guild-shop-pane').forEach(pane => pane.classList.remove('active'));
    document.querySelectorAll('.guild-shop-tab-button').forEach(button => button.classList.remove('active'));

    document.getElementById(`guild-shop-${tabName}-pane`).classList.add('active');
    document.querySelector(`.guild-shop-tab-button[data-tab="${tabName}"]`).classList.add('active');

    renderGuildShopUI(tabName);
}

/**
 * Construit et affiche le contenu de la boutique de guilde en fonction de l'onglet actif.
 * @param {string} activeTab - 'personal' ou 'guild'.
 */
function renderGuildShopUI(activeTab) {
    if (!guildDataCache) return;

    // Traduction des éléments principaux
    setText('#guild-shop-title', 'guild_shop.title');
    setText('.guild-shop-tab-button[data-tab="personal"]', 'guild_shop.tab_personal');
    setText('.guild-shop-tab-button[data-tab="guild"]', 'guild_shop.tab_guild');
    setText('#guild-shop-modal .modal-close-button', 'ui.buttons.close');
    
    const currencyDisplay = document.getElementById('guild-shop-currency-display');
    const itemsContainer = document.getElementById(activeTab === 'personal' ? 'personal-shop-items' : 'guild-shop-items');
    const items = GUILD_SHOP_DB[activeTab];

    // Mise à jour de l'affichage de la monnaie
    if (activeTab === 'personal') {
        const personalMarks = gameState.player.resources.marques_de_guilde || 0;
        currencyDisplay.innerHTML = `${t('guild_shop.personal_marks')}: <strong>${personalMarks.toLocaleString()} <img src="${SPRITE_PATHS.marques_de_guilde}" class="icon-sprite-small"></strong>`;
    } else {
        const guildMarks = guildDataCache.bank?.marques_de_guilde || 0;
        currencyDisplay.innerHTML = `${t('guild_shop.guild_bank')}: <strong>${guildMarks.toLocaleString()} <img src="${SPRITE_PATHS.marques_de_guilde}" class="icon-sprite-small"></strong>`;
    }
    
    itemsContainer.innerHTML = '';
    const guildLevel = guildDataCache.level;
    const playerRank = gameState.player.guildRank;
    const isLeader = playerRank === 'R0';
    const canUseGuildMoney = isLeader || (guildDataCache.permissions[playerRank]?.use_guild_money || false);

    items.forEach(item => {
        const isUnlocked = guildLevel >= item.requiredLevel;
        let canAfford = false;
        
        if (activeTab === 'personal') {
            canAfford = (gameState.player.resources.marques_de_guilde || 0) >= item.cost;
        } else {
            canAfford = (guildDataCache.bank?.marques_de_guilde || 0) >= item.cost && canUseGuildMoney;
        }

        let isAlreadyOwned = false;
        if (item.itemType === 'FRAME' && gameState.player.unlockedFrames.includes(item.id)) {
            isAlreadyOwned = true;
        }
        // MON COMMENTAIRE : On cherche aussi dans l'équipement, pas seulement l'inventaire !
        if (item.itemType === 'EQUIPMENT' && (gameState.player.inventory.some(invItem => invItem.id === item.id) || Object.values(gameState.player.equipment).some(eqItem => eqItem && eqItem.id === item.id))) {
            isAlreadyOwned = true;
        }

        const card = document.createElement('div');
        card.className = 'shop-item-card';
        if (!isUnlocked || isAlreadyOwned) {
            card.classList.add('locked');
        }

        const durationHtml = item.durationHours ? `<p class="item-duration">${t('guild_shop.duration', { hours: item.durationHours })}</p>` : '';
        const buyFunction = activeTab === 'personal' ? `buyPersonalGuildItem('${item.id}')` : `buyGuildBoost('${item.id}')`;

        let iconHtml = `<div class="shop-item-icon">${item.icon}</div>`;
        if (item.itemType === 'FRAME') {
            const frameData = FRAMES_DB[item.id];
            if (frameData) {
                iconHtml = `<div class="shop-item-icon shop-item-frame"><img src="${frameData.image}" alt="${t(frameData.nameKey)}"></div>`;
            }
        }

        card.innerHTML = `
            ${iconHtml}
            <div class="shop-item-details">
                <h4>${t(item.nameKey)}</h4>
                <p>${t(item.descriptionKey)}</p>
                ${durationHtml}
            </div>
            <div class="shop-item-action">
                <button class="action-button" onclick="${buyFunction}" ${!isUnlocked || !canAfford || isAlreadyOwned ? 'disabled' : ''}>
                    ${isAlreadyOwned ? t('guild_shop.owned_button') : t('guild_shop.buy_button')}
                </button>
                <div class="shop-item-cost">
                    <span>${item.cost}</span>
                    <img src="${SPRITE_PATHS.marques_de_guilde}" class="icon-sprite-small">
                </div>
                ${!isUnlocked ? `<small>${t('guild_shop.item_level_req', { level: item.requiredLevel })}</small>` : ''}
            </div>
        `;
        itemsContainer.appendChild(card);
    });
}

// Nouvelle fonction pour l'achat personnel (placeholder)
async function buyPersonalGuildItem(itemId) {
    const itemData = GUILD_SHOP_DB.personal.find(i => i.id === itemId);
    if (!itemData) return;

    const player = gameState.player;
    if ((player.resources.marques_de_guilde || 0) < itemData.cost) {
        showToast(t('ui.alerts.guild.not_enough_marks'), 'error');
        return;
    }

    const itemName = t(itemData.nameKey);
    const confirmed = await showCustomConfirm(t('ui.alerts.guild.confirm_buy_personal', { cost: itemData.cost, itemName: itemName }));
    if (!confirmed) return;

    player.resources.marques_de_guilde -= itemData.cost;

    switch (itemData.itemType) {
        case 'CONSUMABLE_PACK':
            for (const resource in itemData.contents) {
                addResource(resource, itemData.contents[resource]);
            }
            break;
        case 'EQUIPMENT':
            const fullItemData = ITEMS_DB.find(dbItem => dbItem.id === itemData.id);
            if (fullItemData) {
                const newItem = { ...fullItemData, uid: generateUID() };
                player.inventory.push(newItem);
            }
            break;
        case 'FRAME':
            if (!player.unlockedFrames.includes(itemData.id)) {
                player.unlockedFrames.push(itemData.id);
            }
            break;
    }

    showToast(t('ui.alerts.guild.buy_success', { itemName: itemName }), 'success');
    
    renderGuildShopUI('personal'); // Met à jour la vue de la boutique
    updateGameUI(); // Met à jour l'affichage global des monnaies
    saveGame();
}

// Nouvelle fonction pour l'achat de boost de guilde (placeholder)
async function buyGuildBoost(itemId) {
    const item = GUILD_SHOP_DB.guild.find(i => i.id === itemId);
    const itemName = t(item.nameKey);
    const cost = item.cost;

    const confirmed = await showCustomConfirm(t('ui.alerts.guild.confirm_buy_guild_boost', { cost: cost, boostName: itemName }));

    if(confirmed) {
        alert(`Logique d'achat pour le boost de guilde "${itemId}" à implémenter.`);
        // Ici, tu vérifieras à nouveau les permissions et la banque côté serveur (via une transaction),
        // puis tu déduiras les marques de la banque et activeras le boost.
    }
}

// =================================================================================
// NOUVELLE SECTION : BOSS DE GUILDE
// =================================================================================

/**
 * Met à jour l'interface du boss de guilde en fonction de son état (actif/inactif).
 */
function updateGuildBossUI() {
    const inactiveView = document.getElementById('guild-boss-inactive-view');
    const activeView = document.getElementById('guild-boss-active-view');

    // J'attache l'écouteur temps réel pour le boss
    listenForGuildBossChanges();

    // Le listener mettra à jour l'UI, ici on initialise juste les textes statiques
    setText('#guild-boss-title-inactive', 'ui.guild_boss.title');
    setText('#guild-boss-no-boss-text', 'ui.guild.no_active_boss');
    setText('#start-guild-boss-btn', 'ui.guild.start_boss_fight');
    setText('#boss-leaderboard-title', 'ui.guild_boss.leaderboard_title');
}

/**
 * Met en place un écouteur temps réel sur le document du boss actif de la guilde.
 */
function listenForGuildBossChanges() {
    if (guildBossListenerUnsubscribe) guildBossListenerUnsubscribe();
    if (guildBossTimerInterval) clearInterval(guildBossTimerInterval);

    const guildId = gameState.player.guildId;
    if (!guildId) return;

    const { db, doc, onSnapshot } = window.firebaseTools;
    const bossRef = doc(db, "guilds", guildId, "activeBoss", "current");

    guildBossListenerUnsubscribe = onSnapshot(bossRef, (docSnap) => {
        if (docSnap.exists()) {
            // Un boss est actif
            // ==================== DÉBUT DE LA MODIFICATION ====================
            // On stocke les données du boss dans le cache de la guilde pour que les autres fonctions y aient accès.
            if (guildDataCache) {
                guildDataCache.activeBoss = docSnap.data();
            }
            // ===================== FIN DE LA MODIFICATION =====================
            renderActiveBossView(docSnap.data());
        } else {
            // Aucun boss actif
            // ==================== DÉBUT DE LA MODIFICATION ====================
            if (guildDataCache) {
                delete guildDataCache.activeBoss;
            }
            // ===================== FIN DE LA MODIFICATION =====================
            renderInactiveBossView();
        }
    });
}

/**
 * Affiche l'interface quand aucun boss n'est actif.
 */
function renderInactiveBossView() {
    document.getElementById('guild-boss-active-view').classList.add('hidden');
    document.getElementById('guild-boss-inactive-view').classList.remove('hidden');
    
    const startButton = document.getElementById('start-guild-boss-btn');
    const playerRank = gameState.player.guildRank;
    
    const hasPermission = guildDataCache.permissions[playerRank]?.canManageBoss;
    const isLeader = playerRank === 'R0';

    const canManage = isLeader || hasPermission === true;

    if (canManage) {
        startButton.classList.remove('hidden');
        startButton.onclick = openGuildBossSelectionModal;
    } else {
        startButton.classList.add('hidden');
    }

    // MON COMMENTAIRE : Ajout du bouton pour voir les récompenses
    const rewardsButtonContainer = document.getElementById('guild-boss-rewards-btn-container-inactive');
    rewardsButtonContainer.innerHTML = `<button class="secondary-action-button" onclick="openGuildBossRewardsModal()">${t('ui.guild_boss.rewards_button')}</button>`;
}

/**
 * Affiche et met à jour l'interface quand un boss est actif.
 * @param {object} bossData - Les données du boss depuis Firestore.
 */
function renderActiveBossView(bossData) {
    checkAndFinalizeBossFight(bossData);
    document.getElementById('guild-boss-inactive-view').classList.add('hidden');
    document.getElementById('guild-boss-active-view').classList.remove('hidden');

    const bossDef = GUILD_BOSSES_DB.find(b => b.id === bossData.bossId);
    
    // MON COMMENTAIRE : CORRECTION - On ajoute ".name" à la clé pour obtenir le nom du boss.
    setText('#guild-boss-name', `${bossDef.nameKey}`);

    const hpPercent = (bossData.currentHp / bossData.maxHp) * 100;
    document.getElementById('guild-boss-hp-fill').style.width = `${hpPercent}%`;
    document.getElementById('guild-boss-hp-text').textContent = `${Math.floor(bossData.currentHp).toLocaleString()} / ${bossData.maxHp.toLocaleString()}`;

    const totalDamage = bossData.maxHp - bossData.currentHp;
    setText('#guild-boss-total-damage', 'ui.guild_boss.total_damage', { damage: Math.floor(totalDamage).toLocaleString() });

    if (guildBossTimerInterval) clearInterval(guildBossTimerInterval);
    guildBossTimerInterval = setInterval(() => {
        const now = Date.now();
        const endTime = bossData.endTime.toDate().getTime();
        const timeLeftMs = Math.max(0, endTime - now);

        if (timeLeftMs === 0) {
            clearInterval(guildBossTimerInterval);
            setText('#guild-boss-timer', 'ui.guild_boss.fight_failed');
        } else {
            const hours = Math.floor(timeLeftMs / 3600000).toString().padStart(2, '0');
            const minutes = Math.floor((timeLeftMs % 3600000) / 60000).toString().padStart(2, '0');
            const seconds = Math.floor((timeLeftMs % 60000) / 1000).toString().padStart(2, '0');
            setText('#guild-boss-timer', 'ui.guild_boss.time_remaining', { time: `${hours}:${minutes}:${seconds}` });
        }
    }, 1000);

    const userId = window.firebaseTools.auth.currentUser.uid;
    const myStats = bossData.participants?.[userId] || { attempts: 0, bestDamage: 0 };
    setText('#player-best-damage', 'ui.guild_boss.your_best_damage', { damage: (myStats.bestDamage || 0).toLocaleString() });
    setText('#player-attempts-left', 'ui.guild_boss.attempts_left', { count: 2 - myStats.attempts < 0 ? '0' : 2 - myStats.attempts });

    const attackButton = document.getElementById('attack-guild-boss-btn');
    attackButton.onclick = () => attackGuildBoss(bossData.bossId);

    if (bossData.currentHp <= 0) {
        attackButton.disabled = true;
        attackButton.textContent = t('ui.guild_boss.boss_defeated');
    } else if (myStats.attempts < 2) {
        attackButton.disabled = false;
        attackButton.textContent = t('ui.guild_boss.attack_button');
    } else if (myStats.attempts < 4) {
        attackButton.disabled = false;
        attackButton.textContent = t('ui.guild_boss.attack_button_extra_cost', { cost: 50 });
    } else {
        attackButton.disabled = true;
        attackButton.textContent = t('ui.guild_boss.max_attempts_reached');
    }

    const rewardsButtonContainer = document.getElementById('guild-boss-rewards-btn-container');
    rewardsButtonContainer.innerHTML = `<button class="secondary-action-button" onclick="openGuildBossRewardsModal()">${t('ui.guild_boss.rewards_button')}</button>`;

    renderBossLeaderboard(bossData.participants || {});
}

/**
 * Affiche le classement des dégâts.
 */
function renderBossLeaderboard(participants) {
    const listContainer = document.getElementById('boss-leaderboard-list');
    const sortedParticipants = Object.entries(participants)
        .sort(([, a], [, b]) => (b.bestDamage || 0) - (a.bestDamage || 0));

    if (sortedParticipants.length === 0) {
        listContainer.innerHTML = `<p>${t('ui.guild_logs.empty')}</p>`;
        return;
    }

    listContainer.innerHTML = sortedParticipants.map(([uid, data], index) => {
        const isMe = uid === window.firebaseTools.auth.currentUser.uid;
        return `
            <div class="leaderboard-entry ${isMe ? 'current-player-rank' : ''}">
                <span class="rank">#${index + 1}</span>
                <span class="name">${data.name}</span>
                <span class="damage">${(data.bestDamage || 0).toLocaleString()} ${t('ui.guild_boss.damage')}</span>
            </div>
        `;
    }).join('');
}

/**
 * Fonction appelée par le chef pour démarrer un combat de boss.
 */
function openGuildBossSelectionModal() {
    const modal = document.getElementById('guild-boss-selection-modal');
    if (modal) {
        modal.classList.remove('hidden');
        renderGuildBossSelectionList();
    }
}

// Ferme la modale de sélection du boss de guilde.
function closeGuildBossSelectionModal() {
    const modal = document.getElementById('guild-boss-selection-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Remplit la liste des boss dans la modale de sélection.
function renderGuildBossSelectionList() {
    const listContainer = document.getElementById('guild-boss-list-container');
    const guildLevel = guildDataCache ? guildDataCache.level : 0;

    setText('#guild-boss-selection-title', 'ui.guild.start_boss_fight');
    setText('#guild-boss-selection-modal .modal-close-button', 'ui.buttons.close');

    listContainer.innerHTML = '';
    GUILD_BOSSES_DB.forEach(boss => {
        const isUnlocked = guildLevel >= boss.requiredLevel;
        const enemyData = boss.enemyData;

        const card = document.createElement('div');
        card.className = `guild-boss-card ${!isUnlocked ? 'locked' : ''}`;

        const bossName = t(`${boss.nameKey}.name`);
        // On sécurise l'accès aux statistiques avec des valeurs par défaut
        const hp = enemyData?.baseStats?.Vie || boss.hp || 0;
        const force = enemyData?.baseStats?.Force || 0;
        
        // On construit le HTML avec la nouvelle structure en grille
        card.innerHTML = `
            <div class="boss-card-sprite">
                <img src="${enemyData.sprite}" alt="${bossName}">
            </div>
            <div class="boss-card-header">
                <h4>${bossName}</h4>
            </div>
            <div class="boss-card-stats">
                <span><strong>Niveau Requis :</strong> ${boss.requiredLevel}</span>
                <span><strong>PV :</strong> ${hp.toLocaleString()}</span>
                <span><strong>Force :</strong> ${force.toLocaleString()}</span>
            </div>
            <p class="boss-card-description">${t(boss.descriptionKey)}</p>
            <div class="boss-card-action">
                <button class="action-button" onclick="confirmAndStartGuildBossFight('${boss.id}')" ${!isUnlocked ? 'disabled' : ''}>
                    Lancer
                </button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// Fonction appelée par le chef pour démarrer un combat de boss.
async function confirmAndStartGuildBossFight(bossId) {
    if (!guildDataCache) return;
    const guildLevel = guildDataCache.level;
    const bossDef = GUILD_BOSSES_DB.find(b => b.id === bossId);

    if (!bossDef) {
        console.error("Définition du boss introuvable pour l'ID:", bossId);
        return;
    }

    if (guildLevel < bossDef.requiredLevel) {
        showToast(t('ui.alerts.guild.guild_level_too_low', { level: bossDef.requiredLevel }), 'error');
        return;
    }

    // --- CORRECTION APPLIQUÉE ICI ---
    const bossName = t(`${bossDef.nameKey}.name`);
    const confirmed = await showCustomConfirm(t('ui.alerts.guild.boss_start_confirm', { bossName: bossName }));
    // --- FIN DE LA CORRECTION ---

    if (!confirmed) return;

    // On ferme la modale de sélection avant de lancer la transaction
    closeGuildBossSelectionModal();

    const { db, doc, runTransaction, serverTimestamp } = window.firebaseTools;
    const guildId = gameState.player.guildId;

    try {
        await runTransaction(db, async (transaction) => {
            const bossRef = doc(db, "guilds", guildId, "activeBoss", "current");
            const bossDoc = await transaction.get(bossRef);

            if (bossDoc.exists()) throw new Error(t('ui.alerts.guild.boss_already_active'));

            const startTime = serverTimestamp();
            const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

            transaction.set(bossRef, {
                bossId: bossDef.id,
                maxHp: bossDef.hp,
                currentHp: bossDef.hp,
                startTime: startTime,
                endTime: endTime,
                participants: {}
            });
        });
        // L'écouteur temps-réel (onSnapshot) s'occupera de mettre à jour l'UI automatiquement.
    } catch (error) {
        showToast(error.message, 'error');
    }
}

/**
 * Fonction appelée par un membre pour attaquer le boss.
*/
async function attackGuildBoss(bossId) {
    const userId = window.firebaseTools.auth.currentUser.uid;
    const bossData = guildDataCache.activeBoss;
    const myStats = bossData.participants?.[userId] || { attempts: 0, bestDamage: 0 };
    const cost = 50;

    if (myStats.attempts >= 4) {
        showToast(t('ui.alerts.guild.max_attempts_error'), 'error');
        return;
    }
    if (myStats.attempts >= 2) {
        const confirmedExtra = await showCustomConfirm(t('ui.alerts.guild.confirm_extra_attack', { cost: cost }));
        if (!confirmedExtra) return;
        if ((gameState.player.resources.eclats_ascension || 0) < cost) {
            showToast(t('ui.profile.not_enough_shards'), 'error');
            return;
        }
        gameState.player.resources.eclats_ascension -= cost;
        updateGameUI();
    } else {
        const confirmed = await showCustomConfirm(t('ui.alerts.guild.boss_attack_confirm'));
        if (!confirmed) return;
    }

    const bossDef = GUILD_BOSSES_DB.find(b => b.id === bossId);
    if (!bossDef) return;

    const bossEnemy = {
        ...bossDef.enemyData,
        nameKey: bossDef.nameKey,
        isGuildBoss: true,
        currentHP: bossData.currentHp,
        maxHP: bossData.maxHp
    };
    gameState.customBountyEnemy = bossEnemy;

    const afterCombatCallback = async (damageDealt) => {
        // MON COMMENTAIRE : On restaure les PV et le Mana du joueur à 100% après le combat.
        gameState.playerCurrentHP = gameState.player.currentMaxHP;
        gameState.playerCurrentMana = gameState.player.maxMana;

        await recordBossDamage(damageDealt);
        switchSocialTab('boss');
    };

    startCombat(['CUSTOM_BOUNTY'], { win: afterCombatCallback, loss: afterCombatCallback });
}

/**
 * Enregistre les dégâts d'un joueur contre le boss sur le serveur.
 * @param {number} damageDealt - Les dégâts infligés pendant le combat.
 */
async function recordBossDamage(damageDealt) {
    const { auth, db, doc, runTransaction } = window.firebaseTools;
    const user = auth.currentUser;
    const guildId = gameState.player.guildId;

    try {
        await runTransaction(db, async (transaction) => {
            const bossRef = doc(db, "guilds", guildId, "activeBoss", "current");
            const bossDoc = await transaction.get(bossRef);

            if (!bossDoc.exists()) throw new Error("Le boss n'est plus actif.");

            const bossData = bossDoc.data();
            const participantData = bossData.participants[user.uid] || { name: gameState.player.name, attempts: 0, bestDamage: 0 };

            if (participantData.attempts >= 2) throw new Error(t('alerts.guild.no_attempts_left'));

            const newBestDamage = Math.max(participantData.bestDamage, damageDealt);

            transaction.update(bossRef, {
                currentHp: Math.max(0, bossData.currentHp - damageDealt),
                [`participants.${user.uid}`]: {
                    name: gameState.player.name,
                    attempts: participantData.attempts + 1,
                    bestDamage: newBestDamage
                }
            });
        });
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function checkAndFinalizeBossFight(bossData) {
    if (!bossData || bossData.isFinalizing) return; // Sécurité pour éviter les exécutions multiples

    const endTime = bossData.endTime.toDate().getTime();
    const isTimeUp = Date.now() >= endTime;
    const isDefeated = bossData.currentHp <= 0;

    if (isTimeUp || isDefeated) {
        const { db, doc, runTransaction } = window.firebaseTools;
        const guildId = gameState.player.guildId;
        const bossRef = doc(db, "guilds", guildId, "activeBoss", "current");

        try {
            // On marque le boss comme "en cours de finalisation" pour que personne d'autre ne le fasse
            await runTransaction(db, async (transaction) => {
                const freshBossDoc = await transaction.get(bossRef);
                if (freshBossDoc.exists() && !freshBossDoc.data().isFinalizing) {
                    transaction.update(bossRef, { isFinalizing: true });
                } else {
                    throw new Error("Le combat est déjà en cours de finalisation par un autre membre.");
                }
            });

            await finalizeGuildBossFight(bossData, isDefeated);

        } catch (error) {
            console.warn(error.message);
        }
    }
}

/**
 * Calcule et distribue les récompenses du boss de guilde.
 * @param {object} bossData - Les données du boss.
 * @param {boolean} wasDefeated - True si le boss a été vaincu, false si le temps était écoulé.
 */
async function finalizeGuildBossFight(bossData, wasDefeated) {
    const { db, writeBatch, doc, deleteDoc } = window.firebaseTools;
    const guildId = gameState.player.guildId;
    
    const bossDef = GUILD_BOSSES_DB.find(b => b.id === bossData.bossId);
    const participants = bossData.participants || {};
    const participantIds = Object.keys(participants);

    if (participantIds.length === 0) {
        // Personne n'a participé, on nettoie simplement le boss
        await deleteDoc(doc(db, "guilds", guildId, "activeBoss", "current"));
        return;
    }
    
    // Prépare un batch pour écrire tous les mails et supprimer le boss en une seule opération atomique
    const batch = writeBatch(db);
    const bossName = t(bossDef.nameKey);

    // 1. Préparation des mails de récompenses
    const sortedParticipants = participantIds.sort((a, b) => (participants[b].bestDamage || 0) - (participants[a].bestDamage || 0));
    
    for (let i = 0; i < sortedParticipants.length; i++) {
        const userId = sortedParticipants[i];
        const userData = participants[userId];
        let attachments = [];
        let mailBody = `Félicitations, ${userData.name}, pour votre participation au combat contre le ${bossName}.\n\n`;
        mailBody += `Vous avez infligé un total de ${userData.bestDamage.toLocaleString()} points de dégâts.\n\nRécompenses obtenues :\n`;

        // Ajout de la récompense commune si le boss est vaincu
        if (wasDefeated && bossDef.rewards.common) {
            for (const res in bossDef.rewards.common) {
                attachments.push({ type: 'resource', id: res, amount: bossDef.rewards.common[res] });
            }
        }

        // Ajout des récompenses de classement (même si le boss n'est pas vaincu, pour les meilleurs)
        if (i < bossDef.rewards.ranking.length) {
            const rankReward = bossDef.rewards.ranking[i];
            for (const res in rankReward) {
                attachments.push({ type: 'resource', id: res, amount: rankReward[res] });
            }
        }
        
        // On n'envoie un mail que si le joueur a des récompenses à récupérer
        if (attachments.length > 0) {
            const mailData = {
                title: `Récompenses du combat contre ${bossName}`,
                body: mailBody,
                attachments: attachments
            };
            // On ajoute l'envoi du mail au batch
            await sendSystemMail(userId, mailData, batch);
        }
    }

    // 2. Suppression du boss actif de la guilde
    const bossRef = doc(db, "guilds", guildId, "activeBoss", "current");
    batch.delete(bossRef);

    // 3. Exécution de toutes les opérations
    try {
        await batch.commit();
        console.log(`[Boss Finalize] Combat contre ${bossName} terminé. ${participantIds.length} mails de récompense envoyés.`);
        
        // On informe le joueur local que le combat est terminé
        showCustomAlert(wasDefeated ? `Votre guilde a vaincu le ${bossName} ! Les récompenses ont été distribuées par messagerie.` : `Le temps est écoulé ! Le ${bossName} s'est retiré. Les récompenses de participation ont été envoyées.`);

    } catch (error) {
        console.error("Erreur lors de la finalisation du combat de boss et de l'envoi des mails :", error);
    }
}

// =================================================================================
// NOUVELLES FONCTIONS : MODALE DES RÉCOMPENSES DE BOSS DE GUILDE
// =================================================================================

function openGuildBossRewardsModal() {
    const modal = document.getElementById('guild-boss-rewards-modal');
    if (modal) {
        modal.classList.remove('hidden');

        // MON COMMENTAIRE : On attache les événements aux boutons d'onglets à chaque ouverture
        document.querySelectorAll('.rewards-tab-button').forEach(button => {
            button.onclick = () => switchGuildBossRewardsTab(button.dataset.tab);
        });

        // Affiche le premier onglet par défaut. Le listener est déjà attaché.
        switchGuildBossRewardsTab('common');
    }
}

function closeGuildBossRewardsModal() {
    const modal = document.getElementById('guild-boss-rewards-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function switchGuildBossRewardsTab(tabName) {
    document.querySelectorAll('.rewards-tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.rewards-tab-button[data-tab="${tabName}"]`).classList.add('active');
    renderGuildBossRewardsUI(tabName);
}

function renderGuildBossRewardsUI(activeTab) {
    const listContainer = document.getElementById('guild-boss-rewards-list');
    listContainer.innerHTML = '';

    // Traduction des éléments statiques de la modale
    setText('#guild-boss-rewards-title', 'ui.guild_boss.rewards_modal_title');
    setText('.rewards-tab-button[data-tab="common"]', 'ui.guild_boss.rewards_tab_common');
    setText('.rewards-tab-button[data-tab="ranking"]', 'ui.guild_boss.rewards_tab_ranking');
    setText('#guild-boss-rewards-modal .modal-close-button', 'ui.buttons.close');

    GUILD_BOSSES_DB.forEach(boss => {
        const card = document.createElement('div');
        card.className = 'boss-reward-card';

        // MON COMMENTAIRE : CORRECTION - On ajoute ".name" pour cibler la bonne chaîne de caractères dans l'objet de traduction.
        const bossName = t(`${boss.nameKey}`);
        
        let content = `<h4>${bossName}</h4>`;

        if (activeTab === 'common') {
            content += `<p class="reward-description">${t('ui.guild_boss.all_participants')}</p>`;
            for (const res in boss.rewards.common) {
                const amount = boss.rewards.common[res];
                const icon = `<img src="${SPRITE_PATHS[res]}" class="icon-sprite-small">`;
                content += `<div class="reward-item">${icon} ${amount.toLocaleString()} ${t('stats.displayNames.' + res)}</div>`;
            }
        } else if (activeTab === 'ranking') {
            content += `<p class="reward-description">${t('ui.guild_boss.leaderboard_title')}</p>`;
            boss.rewards.ranking.forEach((rankReward, index) => {
                let rewardsText = [];
                for (const res in rankReward) {
                    const amount = rankReward[res];
                    const icon = `<img src="${SPRITE_PATHS[res]}" class="icon-sprite-small">`;
                    rewardsText.push(`${amount.toLocaleString()} ${icon}`);
                }
                const rankLabel = t(`ui.guild_boss.rank_${index + 1}`);
                content += `
                    <div class="ranking-reward-tier">
                        <span class="rank-label">${rankLabel}</span>
                        <div class="reward-item">${rewardsText.join(' + ')}</div>
                    </div>`;
            });
        }
        card.innerHTML = content;
        listContainer.appendChild(card);
    });
}

// =================================================================================
// NOUVELLES FONCTIONS : SYSTÈME DE MESSAGERIE (MAIL)
// =================================================================================

async function sendSystemMail(userId, mailData, batch = null) {
    const { db, collection, addDoc, doc, serverTimestamp } = window.firebaseTools;
    
    // On s'assure que les champs essentiels sont présents
    const finalMailData = {
        isRead: false,
        attachmentsClaimed: false,
        hasAttachments: (mailData.attachments && mailData.attachments.length > 0) || false,
        sender: mailData.sender || 'Système',
        timestamp: serverTimestamp(),
        ...mailData // On ajoute le reste des données (title, body, attachments)
    };

    const mailCollectionRef = collection(db, 'players', userId, 'mailbox');
    
    // Si on utilise un batch, on ajoute l'écriture au batch. Sinon, on l'écrit directement.
    if (batch) {
        const newMailRef = doc(mailCollectionRef); // Crée une référence avec un ID unique
        batch.set(newMailRef, finalMailData);
    } else {
        await addDoc(mailCollectionRef, finalMailData);
    }
    console.log(`[Mail System] Mail envoyé à ${userId} pour : ${mailData.title}`);
}
window.sendSystemMail = sendSystemMail;

function openMailbox() {
    const modal = document.getElementById('mail-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.getElementById('main-menu').classList.add('hidden'); // Ferme le menu
        
        // Attache les écouteurs une seule fois
        if (!modal.dataset.listenersAttached) {
            document.getElementById('mail-back-btn').onclick = () => showMailListPane(true);
            document.getElementById('mail-delete-read-btn').onclick = deleteReadMails;
            modal.dataset.listenersAttached = 'true';
        }

        showMailListPane(false);
        renderMailList();
    }
}

/**
 * Ferme la modale de la messagerie.
 */
function closeMailbox() {
    const modal = document.getElementById('mail-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

/**
 * Affiche le panneau de la liste des messages et cache le détail.
 */
function showMailListPane(isAnimated) {
    const listPane = document.getElementById('mail-list-pane');
    const detailPane = document.getElementById('mail-detail-pane');
    if (!listPane || !detailPane) return;
    
    detailPane.classList.add('hidden');
    // On n'anime que si on "revient" du panneau de détail
    if (isAnimated) {
        listPane.classList.remove('hidden');
    } else {
        // Au premier affichage, on le positionne sans animation
        listPane.style.transition = 'none';
        listPane.classList.remove('hidden');
        setTimeout(() => { listPane.style.transition = ''; }, 10);
    }
}

/**
 * Récupère et affiche la liste des messages du joueur.
 */
async function renderMailList() {
    const mailList = document.getElementById('mail-list');
    mailList.innerHTML = `<p>${t('ui.guild_logs.loading')}</p>`;

    const { auth, db, collection, query, getDocs, orderBy, limit } = window.firebaseTools;
    const user = auth.currentUser;
    if (!user) {
        mailList.innerHTML = `<p>${t('errors.login_required_generic')}</p>`;
        return;
    }

    try {
        const mailCollectionRef = collection(db, 'players', user.uid, 'mailbox');
        const q = query(mailCollectionRef, orderBy("timestamp", "desc"), limit(50));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            mailList.innerHTML = `<p style="text-align:center;">${t('ui.mail.no_messages')}</p>`;
            return;
        }

        mailList.innerHTML = '';
        querySnapshot.forEach(doc => {
            const mail = doc.data();
            const mailId = doc.id;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'mail-item';
            if (!mail.isRead) {
                itemDiv.classList.add('unread');
            }
            itemDiv.onclick = () => displayMail(mailId);
            
            const icon = mail.hasAttachments ? '🎁' : '✉️';
            const date = mail.timestamp ? mail.timestamp.toDate().toLocaleDateString('fr-FR') : '';

            itemDiv.innerHTML = `
                <div class="mail-icon">${icon}</div>
                <div class="mail-summary">
                    <div class="sender">${mail.sender}</div>
                    <div class="title">${mail.title}</div>
                </div>
                <div class="mail-timestamp">${date}</div>
            `;
            mailList.appendChild(itemDiv);
        });

    } catch (error) {
        console.error("Erreur de chargement de la messagerie:", error);
        mailList.innerHTML = `<p>${t('ui.leaderboard.load_error')}</p>`;
    }
}

/**
 * Affiche le contenu détaillé d'un message et le marque comme lu.
 * @param {string} mailId - L'ID du document du message sur Firestore.
 */
async function displayMail(mailId) {
    const { auth, db, doc, getDoc, updateDoc } = window.firebaseTools;
    const user = auth.currentUser;

    const listPane = document.getElementById('mail-list-pane');
    const detailPane = document.getElementById('mail-detail-pane');
    listPane.classList.add('hidden'); // Fait glisser la liste vers la gauche
    detailPane.classList.remove('hidden'); // Fait apparaître le détail

    // Affiche un état de chargement
    document.getElementById('mail-detail-title').textContent = 'Chargement...';
    document.getElementById('mail-detail-sender').textContent = '';
    document.getElementById('mail-detail-text').textContent = '';
    document.getElementById('mail-attachments-section').classList.add('hidden');

    try {
        const mailRef = doc(db, 'players', user.uid, 'mailbox', mailId);
        const mailDoc = await getDoc(mailRef);

        if (!mailDoc.exists()) {
            document.getElementById('mail-detail-title').textContent = 'Erreur';
            document.getElementById('mail-detail-text').textContent = 'Ce message n\'existe plus.';
            return;
        }

        const mail = mailDoc.data();
        
        // Marque le message comme lu (si ce n'est pas déjà fait)
        if (!mail.isRead) {
            await updateDoc(mailRef, { isRead: true });
        }

        document.getElementById('mail-detail-title').textContent = mail.title;
        document.getElementById('mail-detail-sender').textContent = mail.sender;
        document.getElementById('mail-detail-text').textContent = mail.body;

        if (mail.hasAttachments) {
            document.getElementById('mail-attachments-section').classList.remove('hidden');
            const attachmentsList = document.getElementById('mail-attachments-list');
            attachmentsList.innerHTML = mail.attachments.map(att => {
                const icon = SPRITE_PATHS[att.id] ? `<img src="${SPRITE_PATHS[att.id]}" class="icon-sprite-small">` : '';
                const name = t(`stats.displayNames.${att.id}`) || att.id;
                return `<div class="attachment-item">${icon} ${att.amount.toLocaleString()} ${name}</div>`;
            }).join('');

            const claimButton = document.getElementById('mail-claim-btn');
            if (mail.attachmentsClaimed) {
                claimButton.disabled = true;
                claimButton.textContent = t('ui.mail.rewards_claimed');
            } else {
                claimButton.disabled = false;
                claimButton.textContent = t('ui.mail.claim_all');
                claimButton.onclick = () => claimMailAttachments(mailId);
            }
        } else {
            document.getElementById('mail-attachments-section').classList.add('hidden');
        }

    } catch (error) {
        console.error("Erreur d'affichage du mail:", error);
    }
}

/**
 * Récupère les récompenses d'un message.
 * @param {string} mailId - L'ID du document du message.
 */
async function claimMailAttachments(mailId) {
    const { auth, db, doc, runTransaction } = window.firebaseTools;
    const user = auth.currentUser;

    const claimButton = document.getElementById('mail-claim-btn');
    claimButton.disabled = true;

    try {
        const mailRef = doc(db, 'players', user.uid, 'mailbox', mailId);
        const playerRef = doc(db, 'players', user.uid);

        await runTransaction(db, async (transaction) => {
            const mailDoc = await transaction.get(mailRef);
            const playerDoc = await transaction.get(playerRef);

            if (!mailDoc.exists() || !playerDoc.exists()) {
                throw new Error("Message ou joueur introuvable.");
            }

            const mail = mailDoc.data();
            if (mail.attachmentsClaimed) {
                throw new Error("Récompenses déjà réclamées.");
            }

            const playerData = playerDoc.data();
            const playerResources = playerData.player.resources;
            
            mail.attachments.forEach(attachment => {
                if (attachment.type === 'resource') {
                    playerResources[attachment.id] = (playerResources[attachment.id] || 0) + attachment.amount;
                }
                // Ajouter ici la logique pour les 'item' si nécessaire
            });
            
            // On met à jour le joueur ET le message dans la même transaction
            transaction.update(playerRef, { "player.resources": playerResources });
            transaction.update(mailRef, { attachmentsClaimed: true });
        });

        // Succès : on met à jour l'état local du jeu
        showToast(t('ui.mail.claim_success'), 'success');
        await updateLocalStateAfterClaim(mailId);
        displayMail(mailId); // Rafraîchit la vue du mail actuel
        updateGameUI(); // Met à jour le header avec les nouvelles ressources
        
    } catch (error) {
        console.error("Erreur lors de la récupération des récompenses:", error);
        showToast(error.message, 'error');
        claimButton.disabled = false;
    }
}

/**
 * Met à jour le gameState local après avoir récupéré les récompenses,
 * pour éviter de devoir recharger depuis le serveur.
 */
async function updateLocalStateAfterClaim(mailId) {
    const { auth, db, doc, getDoc } = window.firebaseTools;
    const user = auth.currentUser;
    const mailRef = doc(db, 'players', user.uid, 'mailbox', mailId);
    const mailDoc = await getDoc(mailRef);

    if (mailDoc.exists()) {
        const mail = mailDoc.data();
        mail.attachments.forEach(attachment => {
            if (attachment.type === 'resource') {
                gameState.player.resources[attachment.id] = (gameState.player.resources[attachment.id] || 0) + attachment.amount;
            }
        });
        saveGame();
    }
}

/**
 * Supprime tous les messages qui ont été lus et dont les récompenses ont été réclamées.
 */
async function deleteReadMails() {
    const { auth, db, collection, query, where, getDocs, writeBatch } = window.firebaseTools;
    const user = auth.currentUser;
    if (!user) return;
    
    const confirmed = await showCustomConfirm(t('ui.mail.delete_confirm'));
    if (!confirmed) return;

    const mailCollectionRef = collection(db, 'players', user.uid, 'mailbox');
    // On cible les messages qui sont lus ET qui n'ont pas de pièces jointes ou dont les pièces jointes sont réclamées
    const q1 = query(mailCollectionRef, where("isRead", "==", true), where("hasAttachments", "==", false));
    const q2 = query(mailCollectionRef, where("isRead", "==", true), where("attachmentsClaimed", "==", true));

    try {
        const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
        
        if (snapshot1.empty && snapshot2.empty) {
            showToast(t('ui.mail.no_deletable_messages'), 'system-message');
            return;
        }

        const batch = writeBatch(db);
        let count = 0;
        snapshot1.forEach(doc => { batch.delete(doc.ref); count++; });
        snapshot2.forEach(doc => { batch.delete(doc.ref); count++; });
        
        await batch.commit();
        
        showToast(t('ui.mail.delete_success', { count: count }), 'success');
        renderMailList(); // Rafraîchit la liste

    } catch (error) {
        console.error("Erreur lors de la suppression des messages lus:", error);
        showToast(t('ui.leaderboard.load_error'), 'error');
    }
}

/**
 * Vérifie périodiquement s'il y a des messages non lus et met à jour le badge de notification.
 */
async function checkUnreadMail() {
    const { auth, db, collection, query, where, getDocs, limit } = window.firebaseTools;
    const user = auth.currentUser;
    const mailMenuItem = document.getElementById('mail-menu-item');

    if (!user || !mailMenuItem) return;

    const badge = mailMenuItem.querySelector('.notification-badge');

    try {
        const mailCollectionRef = collection(db, 'players', user.uid, 'mailbox');
        const q = query(mailCollectionRef, where("isRead", "==", false), limit(1));
        const querySnapshot = await getDocs(q);

        badge.classList.toggle('hidden', querySnapshot.empty);

        // On met à jour le badge global du hamburger
        updateGlobalNotifications();

    } catch (error) {
        // En cas d'erreur (ex: index manquant), on ne fait rien pour ne pas spammer la console.
    }
}
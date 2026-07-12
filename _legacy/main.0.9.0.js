// =================================================================================
// INITIALISATION DE L'APPLICATION
// =================================================================================
document.addEventListener('DOMContentLoaded', () => {

    const hideStatusBar = async () => {
        try {
            // On vérifie si l'application tourne dans un contexte natif Capacitor
            if (window.Capacitor && window.Capacitor.isNativePlatform()) {
                // On accède au plugin via Capacitor.Plugins
                const { StatusBar } = Capacitor.Plugins;
                await StatusBar.hide();
                console.log("Status Bar masquée.");
            }
        } catch (e) {
            console.error("Erreur lors du masquage de la Status Bar :", e);
        }
    };
    hideStatusBar();

    // --- Initialisation Visuelle (inchangée) ---
    animateLoadingBar(2400);
    generateRandomConstellation();
    generateRandomStars();
    setupShootingStars(); // Logique des étoiles filantes extraite pour la clarté

    // --- Listeners UI de base (inchangés) ---
    const createButton = document.getElementById('create-button');
    if (createButton) {
        createButton.addEventListener('click', createCharacter);
    }
    spendPointsFAB = document.getElementById('spend-points-fab');
    if (spendPointsFAB) {
        spendPointsFAB.onclick = openSpendPointsModal;
    }
    const classSelectionContainer = document.getElementById('class-selection-container');
    if (classSelectionContainer) {
        classSelectionContainer.addEventListener('click', (event) => {
            const button = event.target.closest('.class-choice');
            if (button) {
                document.querySelectorAll('.class-choice').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            }
        });
    }

    // --- Logique de Démarrage ---
    loadGame();
    setupAuthenticationListener(); // Un seul appel !
    if (!gameState.player) {
        showCharacterCreationScreen();
    }

    // --- Autres Listeners (inchangés) ---
    const menuList = document.getElementById('main-menu-list');
    if (menuList) {
        menuList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI' && !event.target.classList.contains('separator')) {
                document.getElementById('main-menu').classList.add('hidden');
            }
        });
    }
    setupConstellationSwitcher();
    window.addEventListener('resize', syncInventoryHeight);
    initAdventureMode();
});


// =================================================================================
// GESTION DE L'AUTHENTIFICATION (Logique principale)
// =================================================================================
function setupAuthenticationListener() {
    const { auth, onAuthStateChanged } = window.firebaseTools;

    onAuthStateChanged(auth, user => {
        console.log("onAuthStateChanged a été déclenché. Utilisateur:", user ? user.uid : 'aucun');
        
        // On met à jour l'UI et on charge les données correspondantes.
        // La persistance que nous avons activée garantit que `user` sera correct après le rechargement.
        updateUIForAuthState(user);
        handleDataSyncForAuthState(user);
    });
}

/**
 * Met à jour les éléments visuels (menus, boutons) en fonction de l'état de connexion.
 * @param {object|null} user - L'objet utilisateur de Firebase, ou null s'il est déconnecté.
 */
function updateUIForAuthState(user) {
    // Garde ton code pour cette fonction, il était correct.
    if (document.getElementById('character-creation').style.display !== 'none') {
        initializeCharacterCreationUI();
    }
    const menuLeaderboard = document.querySelector('li[onclick="displayLeaderboard()"]');
    const menuProfile = document.querySelector('li[onclick="openProfileModal()"]');
    const optionsLoginButton = document.getElementById('options-menu-login');
    const optionsLogoutButton = document.getElementById('options-menu-logout');
    const optionsSeparator = document.getElementById('options-menu-sep2');
    const isConnected = !!user;
    if (menuLeaderboard) menuLeaderboard.classList.toggle('disabled', !isConnected);
    if (menuProfile) menuProfile.classList.toggle('disabled', !isConnected);
    if (optionsLoginButton) optionsLoginButton.classList.toggle('hidden', isConnected);
    if (optionsLogoutButton) optionsLogoutButton.classList.toggle('hidden', !isConnected);
    if (optionsSeparator) optionsSeparator.classList.toggle('hidden', !isConnected);
    const optionsModal = document.getElementById('options-modal');
    if (optionsModal && optionsModal.style.display === 'flex') {
        openOptions('game');
    }
}


/**
 * Gère la sauvegarde et le chargement des données du joueur.
 * @param {object|null} user - L'objet utilisateur de Firebase.
 */
function handleDataSyncForAuthState(user) {
    const { db, doc, getDoc } = window.firebaseTools;

    // Simplification de la gestion du chargement.
    const loadingOverlay = document.getElementById('loading-overlay');
    const finishLoading = () => {
        setTimeout(() => {
            if (loadingOverlay) loadingOverlay.classList.add('hidden');
        }, 500); // On laisse un petit délai pour que l'UI se mette à jour.
    };

    if (user) {
        // ... La logique à l'intérieur de if(user) était correcte, garde la ...
        const localGuestPlayerExists = gameState.player && !gameState.player.userId;
        getDoc(doc(db, "players", user.uid)).then(docSnap => {
            const serverPlayerExists = docSnap.exists();
            if (localGuestPlayerExists && !serverPlayerExists) {
                console.log("Sauvegarde locale d'invité trouvée. Sync...");
                gameState.player.userId = user.uid;
                saveGameToServer();
                finishLoading();
            } else if (serverPlayerExists) {
                console.log("Sauvegarde serveur trouvée. Chargement...");
                loadGameFromServer(user.uid, finishLoading);
            } else {
                console.log("Aucune sauvegarde trouvée.");
                finishLoading();
            }
        });
    } else {
        // --- L'UTILISATEUR N'EST PAS CONNECTÉ ---
        console.log("Utilisateur déconnecté. Mode invité.");
        finishLoading();
    }
}
/**
 * Fonction utilitaire pour la génération des étoiles filantes (extraite de votre code original).
 */
function setupShootingStars() {
    const container = document.querySelector('.constellation-bg');
    if (container) {
        const shootingStarCount = 12;
        for (let i = 0; i < shootingStarCount; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            if (Math.random() > 0.5) {
                shootingStar.style.top = `-5px`;
                shootingStar.style.left = `${Math.random() * 100}%`;
            } else {
                shootingStar.style.top = `${Math.random() * 100}%`;
                shootingStar.style.left = `-5px`;
            }
            const randomLength = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
            shootingStar.style.setProperty('--star-length', `${randomLength}px`);
            if (Math.random() < 0.3) {
                shootingStar.classList.add('on-fire');
            }
            shootingStar.style.animationDelay = `${Math.random() * 10}s`;
            shootingStar.style.animationDuration = `${Math.random() * 3 + 4}s`;
            container.appendChild(shootingStar);
        }
    }
}



window.addEventListener('resize', syncInventoryHeight);

const bugReportForm = document.getElementById('bug-report-form');
if (bugReportForm) {
    bugReportForm.addEventListener("submit", function(e) {
        e.preventDefault();
    
        const status = document.getElementById('bug-report-status');
        const submitButton = bugReportForm.querySelector('button[type="submit"]');
        const formData = new FormData(bugReportForm);
    
        status.textContent = t('ui.bug_report.status_sending');
        submitButton.disabled = true;
    
        fetch("https://formspree.io/f/mldlvzea", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                status.textContent = t('ui.bug_report.status_success');
                status.style.color = "#28a745";
                setTimeout(() => toggleBugReportModal(false), 2000);
            } else {
                status.textContent = t('ui.bug_report.status_error');
                status.style.color = "#dc3545";
            }
        }).catch(error => {
            status.textContent = t('ui.bug_report.status_network_error');
            status.style.color = "#dc3545";
        }).finally(() => {
            submitButton.disabled = false;
        });
    });
}
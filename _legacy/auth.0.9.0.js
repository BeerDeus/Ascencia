// =================================================================================
// AUTHENTIFICATION & GESTION SERVEUR
// =================================================================================

window.signInWithGoogle = async function() {
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        console.log("Plateforme native détectée, utilisation du plugin Capacitor...");
        try {
            const result = await window.Capacitor.Plugins.FirebaseAuthentication.signInWithGoogle();

            console.log("Contenu de l'objet 'result' natif :", JSON.stringify(result, null, 2));

            console.log("Connexion native réussie, récupération du credential.");

            const { GoogleAuthProvider, signInWithCredential } = window.firebaseTools;
            
            // ▼▼▼ LA CORRECTION EST ICI ▼▼▼
            // On va chercher le idToken au bon endroit : dans result.credential.idToken
            const credential = GoogleAuthProvider.credential(result.credential.idToken);

            await signInWithCredential(window.firebaseTools.auth, credential);
            
            console.log("VICTOIRE ! Connexion du SDK JavaScript réussie !");

        } catch (error) {
            console.error("Erreur de connexion native :", error);
            if (error.message !== 'signIn canceled') {
                showCustomAlert(t('alerts.auth.login_failed'));
            }
        }
    } else {
        // ... la partie web reste inchangée
        console.log("Plateforme web détectée, utilisation de signInWithPopup...");
        const { auth, GoogleAuthProvider, signInWithPopup } = window.firebaseTools;
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log("Connexion web réussie !");
            window.location.reload();
        } catch (error) {
            console.error("Erreur de connexion web :", error);
            showCustomAlert(t('alerts.auth.login_failed'));
        }
    }
}

async function saveGameToServer() {
    const { auth, db, doc, setDoc, serverTimestamp } = window.firebaseTools;
    const user = auth.currentUser;
    if (!user || !gameState.player) return;

    if (!gameState.player.unlockedFrames) {
        gameState.player.unlockedFrames = ['default'];
        gameState.player.equippedFrame = 'default';
        gameState.player.profilePictureUrl = '';
        gameState.player.lastProfilePictureChange = 0;
    }

    const saveData = { ...gameState };

    delete saveData.currentEnemy;
    delete saveData.currentEvent;
    // ==================== DÉBUT DE LA MODIFICATION ====================
    // On supprime les fonctions de callback de combat avant de sauvegarder.
    delete saveData.afterCombatEvents;
    // ===================== FIN DE LA MODIFICATION =====================
    
    saveData.powerScore = calculatePlayerPowerScore();
    saveData.codexScore = calculateCodexScore();
    saveData.dungeonHighestFloor = saveData.dungeonHighestFloor || 0;
    
    if (saveData.stats) {
        saveData.expeditionsStarted = saveData.stats.expeditionsStarted || 0;
        saveData.totalXpGained = saveData.stats.totalXpGained || 0;
    } else {
        saveData.expeditionsStarted = 0;
        saveData.totalXpGained = 0;
    }

    if (saveData.player && saveData.player.lastGuildMessageTimestamp) {
        delete saveData.player.lastGuildMessageTimestamp;
    }

    try {
        await setDoc(doc(db, "players", user.uid), saveData, { merge: true });
        console.log("Partie sauvegardée sur le serveur (fusion).");
    } catch (error) {
        console.error("Erreur de sauvegarde serveur :", error);
    }
}

async function loadGameFromServer(uid, onCompleteCallback) {
    const { db, doc, getDoc } = window.firebaseTools;
    try {
        const docRef = doc(db, "players", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let serverData = docSnap.data();

            // Vérification rétroactive pour débloquer l'alchimiste
            if (serverData.adventure && serverData.adventure.completedNodes['A1_N8_ALCHIMISTE'] && (!serverData.unlockedFeatures || !serverData.unlockedFeatures.alchemist)) {
                if (!serverData.unlockedFeatures) {
                    serverData.unlockedFeatures = {}; // Assure que l'objet existe
                }
                serverData.unlockedFeatures.alchemist = true;
                console.log("Correctif rétroactif (serveur) : Alchimiste débloqué.");
            }
            
            gameState = createGameStateFromSave(serverData);

            if (gameState.player && gameState.player.guildId) {
                listenToGuildChanges(gameState.player.guildId);
            }
            
            if (gameState.stats && gameState.stats.totalFragmentsEarned < 0) {
                console.log(`[Correctif SERVEUR] Valeur négative détectée pour 'totalFragmentsEarned' (${gameState.stats.totalFragmentsEarned}). Inversion...`);
                // 1. On corrige la valeur source qui est négative.
                gameState.stats.totalFragmentsEarned *= -1;
                
                // 2. On force la mise à jour de la progression du succès en utilisant la valeur corrigée.
                checkSucces('FRAGMENTS_EARNED', { total: gameState.stats.totalFragmentsEarned });

                // 3. On sauvegarde immédiatement l'état corrigé (locale + serveur).
                saveGame();
                console.log(`[Correctif SERVEUR] Valeurs corrigées : totalFragmentsEarned=${gameState.stats.totalFragmentsEarned}, progresSucces=${gameState.stats.succesProgress['ROI_DU_FRAGMENT']}`);
            }

            // On force la réinitialisation de l'aventure en cours au chargement.
            if (gameState.adventure) {
                gameState.adventure.currentNode = null;
            }
            
            if (gameState.player) {
                // CORRECTION : On retire la classe 'creation-mode' du body
                document.body.classList.remove('creation-mode');

                if (!gameState.player.class) showClassChoiceModal();
                
                checkAndResizeGardenOnLoad();
                unequipInvalidItems(); 
                generateDailyBounties();
                recalculateTotalStats();

                const maxLevel = getMaxLevelForAscension(gameState.ascensionLevel || 0);
                if (gameState.player.level > maxLevel) {
                    gameState.player.level = maxLevel;
                    recalculateXpToNextLevel();
                    gameState.player.xp = gameState.player.xpToNextLevel;
                }
                
                if (gameState.isChoosingTrait && gameState.traitSelectionOptions) {
                    displayTraitSelectionModal(gameState.traitSelectionOptions);
                }
                
                if (gameState.inCombat) {
                    showCustomAlert(t('alerts.load.combat_reload'));
                    const isBoss = gameState.currentEnemies.some(e => e.hasOwnProperty('id'));
                    handlePlayerDeath(isBoss ? 60 : 30);
                    if (onCompleteCallback) onCompleteCallback();
                    return;
                }
                if (gameState.isOnExpedition && !gameState.isInDungeon) {
                    showCustomAlert(t('alerts.load.expedition_reload'));
                    gameState.isOnExpedition = false;
                    gameState.expedition = null;
                    gameState.currentEvent = null;
                    gameState.expeditionCache = null;
                }
                
                if (!gameState.isInDungeon) {
                    if (!(gameState.playerCurrentHP > 0)) {
                       gameState.playerCurrentHP = gameState.player.currentMaxHP;
                    }
                    if (!(gameState.playerCurrentMana > 0) && gameState.player.maxMana > 0) {
                        gameState.playerCurrentMana = gameState.player.maxMana;
                    }
                } else if (gameState.playerCurrentHP <= 0) {
                    handlePlayerDeath();
                    if (onCompleteCallback) onCompleteCallback();
                    return;
                }

                document.getElementById('character-creation').style.display = 'none';
                document.getElementById('game-screen').style.display = 'block';
                
                if (gameState.currentExpeditions && gameState.currentExpeditions.length > 0) {
                    displayExpeditions();
                } else {
                    generateExpeditions();
                }
                
                updateGameUI();
                checkEquippedSetsForAchievement();
                checkAndGrantDailyDungeonKey();
                validateLegacyAchievements();
                startGameLoop();
                updateAchievementNotification();

                if (gameState.isInDungeon) {
                    switchAdventureTab('dungeon');
                    showToast(t('alerts.load.dungeon_resume'), "success");
                    restoreDungeonState();
                } else if (gameState.isOnPatrol) {
                    switchAdventureTab('patrol');
                } else {
                    switchAdventureTab('aventure');
                }
                
            } else {
                initializeCharacterCreationUI();
            }
        } else {
            initializeCharacterCreationUI();
            // CORRECTION : On appelle la fonction qui gère l'affichage complet de l'écran de création.
            showCharacterCreationScreen();
        }
    } catch (error) {
        console.error("Erreur lors du chargement depuis le serveur:", error);
        initializeCharacterCreationUI();
    } finally {
        if (onCompleteCallback) {
            onCompleteCallback();
        }
    }
}


window.logout = function() {
    if (guildListenerUnsubscribe) {
        guildListenerUnsubscribe();
        guildListenerUnsubscribe = null;
        console.log("[Realtime] Écouteur de guilde arrêté à la déconnexion.");
    }
    const { auth, signOut } = window.firebaseTools;
    signOut(auth)
        .then(() => {
            console.log("Déconnexion réussie !");
            
            // MON COMMENTAIRE : On supprime la sauvegarde locale pour éviter
            // de recharger un personnage invité après la déconnexion.
            localStorage.removeItem('incrementalGameSave');
            
            // On recharge la page pour un état propre après déconnexion.
            window.location.reload(); 
        })
        .catch((error) => {
            console.error("Erreur de déconnexion :", error);
            showCustomAlert(t('alerts.auth.logout_error'));
        });
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
            // J'ajoute la nouvelle permission à la liste des clés existantes
            const permissionKeys = [...GUILD_PERMISSIONS_DB.permissionKeys, { id: 'canManageBoss', defaultRanks: ['R0', 'R1'] }];

            GUILD_PERMISSIONS_DB.editableRanks.forEach(rankKey => {
                defaultPermissions[rankKey] = {};
                permissionKeys.forEach(perm => {
                    defaultPermissions[rankKey][perm.id] = perm.defaultRanks.includes(rankKey);
                });
            });

            const newGuildRef = doc(collection(db, "guilds"));
            
            const newGuildData = {
                id: newGuildRef.id,
                name: name,
                name_lowercase: name.toLowerCase(),
                tag: tag,
                tag_lowercase: tag.toLowerCase(),
                members: { 
                    [user.uid]: {
                        rank: 'R0',
                        joinedAt: serverTimestamp()
                    }
                },
                memberCount: 1,
                maxMembers: 10,
                leaderId: user.uid,
                createdAt: serverTimestamp(),
                permissions: defaultPermissions 
            };
            transaction.set(newGuildRef, newGuildData);
            
            const newGuildDynamicRef = doc(db, "guilds", newGuildRef.id, "dynamic", "data");
            const newGuildDynamicData = {
                level: 1,
                xp: 0,
                xpToNextLevel: 1000,
                bank: { marques_de_guilde: 0 }
            };
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
let turnTimerInterval = null;
let guildBossInitialHP = 0; // Pour calculer le total des dégâts infligés.
const GUILD_BOSS_COMBAT_TURN_LIMIT = 10; // Le combat durera 10 tours maximum.

async function showAdventureStyleAlert(characterKey, textKey) {
    const character = t(characterKey);
    // Logique pour trouver le bon portrait basé sur la clé du personnage
    let portraitSrc = 'assets/sprites/portraits/default.png'; 
    if (characterKey.includes("larry")) {
        portraitSrc = 'assets/sprites/portraits/larry.png';
    } else if (characterKey.includes("hero")) {
        portraitSrc = CLASS_DATA_DB[gameState.player.class]?.portrait || 'assets/sprites/portraits/guerrier.png';
    }

    const alertHtml = `
        <div class="adventure-dialogue-display">
            <img src="${portraitSrc}" alt="Portrait PNJ">
            <div class="adventure-dialogue-box">
                <h4>${character}</h4>
                <p>"<em>${t(textKey)}</em>"</p>
            </div>
        </div>`;
    await showCustomAlert(alertHtml);
}

/**
 * Gère le changement d'onglet entre les compétences et les consommables en combat.
 */
window.switchCombatTab = function(tabName) {
    document.querySelectorAll('.combat-tab-content').forEach(content => content.style.display = 'none');
    document.querySelectorAll('.combat-tab-button').forEach(button => button.classList.remove('active'));

    document.getElementById(tabName + '-tab-content').style.display = 'flex';
    document.querySelector(`.combat-tab-button[onclick="switchCombatTab('${tabName}')"]`).classList.add('active');
}

/**
 * Fonction appelée par le bouton "Utiliser" d'un consommable en combat.
 */
window.useConsumableInCombat = function(itemId) {
    if (gameState.playerActionLocked) return;
    if (gameState.consumableCooldown > 0) {
        addCombatLog(t('combat.log.consumable_cooldown', { turns: gameState.consumableCooldown }), 'system-message');
        return;
    }

    const player = gameState.player;
    if (!player.consumables[itemId] || player.consumables[itemId] <= 0) return;

    const item = CONSUMABLES_DB[itemId];
    const effect = item.effect;

    addCombatLog(t('combat.log.turn_start', { round: gameState.combatRound }));
    addCombatLog(t('combat.log.player_uses_item', { itemName: t(item.nameKey) }), 'player-action');

    switch (effect.type) {
        case 'HEAL_FLAT':
            gameState.playerCurrentHP = Math.min(player.currentMaxHP, gameState.playerCurrentHP + effect.value);
            addCombatLog(t('combat.log.player_heals_hp', { amount: effect.value }), 'system-message');
            break;
        case 'MANA_FLAT':
            gameState.playerCurrentMana = Math.min(player.maxMana, gameState.playerCurrentMana + effect.value);
            addCombatLog(t('combat.log.player_recovers_mana', { amount: effect.value }), 'system-message');
            break;
        case 'HEAL_MANA_PERCENT':
            const healAmount = Math.floor(player.currentMaxHP * (effect.value / 100));
            const manaAmount = Math.floor(player.maxMana * (effect.value / 100));
            
            gameState.playerCurrentHP = Math.min(player.currentMaxHP, gameState.playerCurrentHP + healAmount);
            gameState.playerCurrentMana = Math.min(player.maxMana, gameState.playerCurrentMana + manaAmount);
            
            addCombatLog(t('combat.log.player_heals_hp', { amount: healAmount }), 'system-message');
            addCombatLog(t('combat.log.player_recovers_mana', { amount: manaAmount }), 'system-message');
            break;
        case 'BUFF':
            gameState.player.statusEffects = gameState.player.statusEffects || [];
            
            const existingBuff = gameState.player.statusEffects.find(e => e.type === 'buff' && e.stat === effect.stat);
            if (existingBuff) {
                existingBuff.duration = Math.max(existingBuff.duration, effect.duration);
                existingBuff.value = (existingBuff.value || 0) + effect.value;
            } else {
                gameState.player.statusEffects.push({
                    type: 'buff',
                    stat: effect.stat,
                    value: effect.value,
                    duration: effect.duration + 1
                });
            }
            
            addCombatLog(t('combat.log.player_buffed', { value: effect.value, stat: t(`stats.displayNames.${effect.stat}`), duration: effect.duration }), 'system-message');
            recalculateTotalStats();
            break;
    }

    player.consumables[itemId]--;
    gameState.consumableCooldown = 3;

    endPlayerTurnAndStartEnemyTurn();
}

function startPlayerTurn() {
    clearTimeout(gameState.turnTimerId);
    clearInterval(turnTimerInterval);
    gameState.playerActionLocked = false;
    updateCombatUI();

    const timerFill = document.getElementById('turn-timer-bar-fill');
    if (!timerFill) return;

    let duration = 10000; // 10 secondes
    let startTime = Date.now();
    timerFill.style.transition = 'none'; // On enlève la transition pour le reset
    timerFill.style.width = '100%';

    // On force un reflow pour que le navigateur prenne en compte le reset
    void timerFill.offsetWidth; 

    timerFill.style.transition = `width ${duration / 1000}s linear`;
    timerFill.style.width = '0%';

    // Le setTimeout qui déclenche la fin du tour si le joueur est inactif
    gameState.turnTimerId = setTimeout(skipPlayerTurn, duration);
}

/**
 * Exécuté quand le minuteur arrive à zéro.
 */
function skipPlayerTurn() {
    addCombatLog(t('combat.log.turn_skipped'), 'system-message');
    endPlayerTurnAndStartEnemyTurn();
}

/**
 * Termine le tour du joueur, nettoie les minuteurs et lance le tour des ennemis.
 */
async function endPlayerTurnAndStartEnemyTurn() {
    // MON COMMENTAIRE : On ajoute la vérification de la limite de tours pour le boss ici.
    if (gameState.currentEnemies[0]?.isGuildBoss && gameState.combatRound >= gameState.combatRoundLimit) {
        addCombatLog(t('combat.log.turn_limit_reached'));
        // On attend un court instant pour que le joueur puisse lire le log.
        setTimeout(() => endCombat('win'), 1500); 
        return; // On arrête l'exécution de la fonction ici.
    }

    if (gameState.playerActionLocked) return;

    gameState.playerActionLocked = true;
    clearTimeout(gameState.turnTimerId);
    clearInterval(turnTimerInterval);
    updateCombatUI();

    if (gameState.currentEnemies.every(e => e.currentHP <= 0)) {
        addCombatLog(t('combat.log.victory'));
        setTimeout(() => endCombat(false), 1500);
        return;
    }
    if (gameState.player.statusEffects && gameState.player.statusEffects.length > 0) {
        let statsChanged = false;
        gameState.player.statusEffects = gameState.player.statusEffects.map(e => {
            const newDuration = e.duration - 1;
            if (newDuration <= 0 && e.type === 'buff') {
                statsChanged = true;
            }
            return {...e, duration: newDuration};
        }).filter(e => e.duration > 0);

        if (statsChanged) {
            recalculateTotalStats();
        }
    }
    if (gameState.isTutorialCombat) {
        await displayTutorialMessage('after_player_attack');
    }
    setTimeout(enemiesTurn, 1200);
}

async function enemiesTurn() {
    addCombatLog(t('combat.log.enemy_turn_start'));

    for (const [index, enemy] of gameState.currentEnemies.entries()) {
        if (enemy.currentHP > 0) {
            
            // MON COMMENTAIRE : On ajoute un drapeau pour savoir si une action a été effectuée.
            let actionTaken = false;

            // On réduit les cooldowns de 1 à chaque début de tour de l'ennemi.
            for (const skillId in enemy.skillCooldowns) {
                if (enemy.skillCooldowns[skillId] > 0) {
                    enemy.skillCooldowns[skillId]--;
                }
            }

            const bleedEffect = (enemy.statusEffects || []).find(e => e.type === 'bleed');
            if (bleedEffect) {
                const bleedDamage = bleedEffect.damage;
                enemy.currentHP -= bleedDamage;
                addCombatLog(t('combat.log.enemy_bleed_damage', { damage: bleedDamage, enemyName: t(enemy.nameKey) }));
                const spriteContainer = document.getElementById(`enemy-sprite-container-${index}`);
                if (spriteContainer) {
                    spriteContainer.classList.add('is-taking-damage');
                    setTimeout(() => spriteContainer.classList.remove('is-taking-damage'), 300);
                }
                if(enemy.currentHP <= 0) {
                    addCombatLog(t('combat.log.enemy_bleed_death', { enemyName: t(enemy.nameKey) }));
                    enemy.isDefeated = true;
                    updateCombatUI();
                    continue; // Passe à l'ennemi suivant
                }
            }
            
            const enemyIsStunned = (enemy.statusEffects || []).find(e => e.type === 'stun');
            if (enemyIsStunned) {
                addCombatLog(t('combat.log.enemy_stunned', { enemyName: t(enemy.nameKey) }));
            } else {

                // MON COMMENTAIRE : On vérifie si l'ennemi a des "abilities" (comme l'invocation) et on tente de les utiliser en premier.
                if (enemy.abilities && enemy.abilities.length > 0) {
                    for (const ability of enemy.abilities) {
                        // On vérifie le type et la chance de l'abilité
                        if (ability.type === 'summon' && (Math.random() * 100) < ability.chance) {
                            const enemyToSummonData = ENEMIES_DB[ability.enemyId];
                            if (enemyToSummonData) {
                                // On crée une nouvelle instance de l'ennemi à invoquer
                                const newEnemy = {
                                    ...JSON.parse(JSON.stringify(enemyToSummonData)),
                                    currentHP: enemyToSummonData.baseStats.Vie,
                                    isSummon: true,
                                    statusEffects: [],
                                    skillCooldowns: {}
                                };
                                
                                // On applique le multiplicateur de difficulté de l'ascension s'il y en a un
                                const difficultyMultiplier = getAscensionDifficultyMultiplier();
                                if (difficultyMultiplier > 1.0) {
                                    for (const stat in newEnemy.baseStats) {
                                        newEnemy.baseStats[stat] = Math.floor(newEnemy.baseStats[stat] * difficultyMultiplier);
                                    }
                                    newEnemy.currentHP = newEnemy.baseStats.Vie;
                                }

                                gameState.currentEnemies.push(newEnemy);
                                addCombatLog(`${t(enemy.nameKey)} invoque un ${t(newEnemy.nameKey)} !`, 'enemy-action');
                                
                                // On met à jour l'UI pour afficher le nouvel ennemi
                                updateCombatUI();

                                actionTaken = true; // L'ennemi a agi
                                break; // On ne lance qu'une seule abilité par tour
                            }
                        }
                    }
                }

                // MON COMMENTAIRE : Si aucune abilité n'a été utilisée, on passe aux compétences normales.
                if (!actionTaken) {
                    let skillToUse = null;
                    if (enemy.skills && enemy.skills.length > 0) {
                        const potentialSkills = enemy.skills
                            .filter(s => (enemy.skillCooldowns[s.id] || 0) === 0)
                            .sort((a, b) => (b.chance || 0) - (a.chance || 0));

                        for (const skill of potentialSkills) {
                            if (Math.random() * 100 < skill.chance) {
                                skillToUse = skill;
                                break;
                            }
                        }
                    }

                    if (skillToUse) {
                        actionTaken = true; // L'ennemi a agi
                        addCombatLog(t('combat.log.enemy_uses_skill', { enemyName: t(enemy.nameKey), skillName: t(skillToUse.nameKey) }), 'enemy-action');
                        enemy.skillCooldowns[skillToUse.id] = skillToUse.cooldown;

                        switch(skillToUse.type) {
                            case 'damage':
                                let skillDamage = (enemy.baseStats.Intelligence || enemy.baseStats.Force) * (skillToUse.multiplier || 1);
                                const resistanceBonus = 1 - ((gameState.player.totalStats.resistance_percent || 0) / 100);
                                skillDamage *= resistanceBonus;
                                skillDamage = Math.floor(skillDamage);
                                gameState.playerCurrentHP -= skillDamage;
                                addCombatLog(t('combat.log.player_takes_skill_damage', { damage: skillDamage }), 'enemy-action');
                                break;
                            case 'debuff':
                                gameState.player.statusEffects.push({
                                    type: 'debuff',
                                    stat: skillToUse.stat,
                                    value_percent: skillToUse.value,
                                    duration: skillToUse.duration + 1
                                });
                                addCombatLog(t('combat.log.player_is_debuffed', { stat: t(`stats.displayNames.${skillToUse.stat}`), value: Math.abs(skillToUse.value), duration: skillToUse.duration }), 'system-message');
                                recalculateTotalStats();
                                break;
                        }
                    }
                }
                
                // MON COMMENTAIRE : Si aucune action spéciale n'a été faite, l'ennemi fait une attaque de base.
                if (!actionTaken) {
                    const enemyIntelligence = enemy.baseStats.Intelligence || 0;
                    const playerAgility = gameState.player.totalStats.Agilité || 0;
                    const enemyHitChance = Math.max(25, Math.min(85 + enemyIntelligence - playerAgility, 95));

                    if (Math.random() * 100 < enemyHitChance) {
                        const evasionChance = gameState.player.totalStats.evasion_chance_percent || 0;
                        if (Math.random() * 100 < evasionChance) {
                            addCombatLog(t('combat.log.player_evades', { enemyName: t(enemy.nameKey) }), 'player-action');
                            if (hasConstellationTalent('archer_ranger_keystone')) {
                                gameState.player.statusEffects = gameState.player.statusEffects || [];
                                const existingBuff = gameState.player.statusEffects.find(e => e.id === 'guerrilla_tactics');
                                
                                if (existingBuff) {
                                    existingBuff.duration = 3;
                                } else {
                                    gameState.player.statusEffects.push({
                                        id: 'guerrilla_tactics', type: 'buff', stat: 'Agilité',
                                        value_percent: 50, duration: 3
                                    });
                                }
                                addCombatLog(t('combat.log.guerrilla_tactics'), 'system-message');
                                recalculateTotalStats();
                            }
                        } else {
                            const enemyCritChance = enemy.baseStats.CritChance || 0;
                            const enemyCritDamage = enemy.baseStats.CritDamage || 1.5;
                            const enemyLifesteal = enemy.baseStats['lifesteal_percent'] || 0;
                            const enemyArmorShred = enemy.baseStats['armor_shred_percent'] || 0;
                            const effectivePlayerDefense = gameState.player.totalStats.Défense * (1 - (enemyArmorShred / 100));
                            let damageTaken = Math.max(1, enemy.baseStats.Force - effectivePlayerDefense);
                            const resistanceBonus = 1 - ((gameState.player.totalStats.resistance_percent || 0) / 100);
                            damageTaken *= resistanceBonus;

                            const isEnemyCrit = Math.random() * 100 < enemyCritChance;
                            if (isEnemyCrit) {
                                damageTaken *= enemyCritDamage;
                                addCombatLog(t('combat.log.enemy_crit', { enemyName: t(enemy.nameKey) }));
                            }
                            damageTaken = Math.floor(damageTaken);
                            if (hasConstellationTalent('mage_mana_shield_1') && gameState.activePassives.mana_shield && gameState.playerCurrentMana > 0) {
                                const mana_shield_ratio = 0.20;
                                let damageToMana = Math.floor(damageTaken * mana_shield_ratio);
                                damageToMana = Math.min(damageToMana, gameState.playerCurrentMana);
                                damageTaken -= damageToMana;
                                gameState.playerCurrentMana -= damageToMana;
                                addCombatLog(t('combat.log.mana_shield_absorb', { amount: damageToMana }));
                            }
                            gameState.playerCurrentHP -= damageTaken;
                            if (gameState.playerCurrentHP <= 0 && hasConstellationTalent('destiny_indomitable') && !gameState.indomitableUsedThisCombat) {
                                gameState.playerCurrentHP = 1;
                                gameState.indomitableUsedThisCombat = true;
                                addCombatLog(t('combat.log.indomitable_talent'), 'system-message');
                            }
                            addCombatLog(t('combat.log.enemy_attacks', { enemyName: t(enemy.nameKey), damage: damageTaken, chance: enemyHitChance.toFixed(0) }), 'enemy-action');

                            const thornsDamage = gameState.player.totalStats.thorns_damage_flat || 0;
                            if (thornsDamage > 0) {
                                enemy.currentHP -= thornsDamage;
                                const spriteContainer = document.getElementById(`enemy-sprite-container-${index}`);
                                if (spriteContainer) {
                                    spriteContainer.classList.add('is-taking-damage');
                                    setTimeout(() => spriteContainer.classList.remove('is-taking-damage'), 300);
                                }
                                addCombatLog(t('combat.log.thorns_damage', { damage: thornsDamage, enemyName: t(enemy.nameKey) }));
                            }
                            
                            if (enemyLifesteal > 0) {
                               const healedAmount = Math.floor(damageTaken * (enemyLifesteal / 100));
                               if (healedAmount > 0) {
                                   enemy.currentHP = Math.min(enemy.baseStats.Vie, enemy.currentHP + healedAmount);
                                   addCombatLog(t('combat.log.enemy_lifesteal', { enemyName: t(enemy.nameKey), amount: healedAmount }));
                               }
                            }
                            const enemyStunChance = enemy.baseStats.stun_chance_percent || 0;
                            if (enemyStunChance > 0 && Math.random() * 100 < enemyStunChance) {
                                gameState.player.statusEffects = gameState.player.statusEffects || [];
                                gameState.player.statusEffects.push({ type: 'stun', duration: 2 });
                                addCombatLog(t('combat.log.player_is_stunned', { enemyName: t(enemy.nameKey) }), 'system-message');
                            }
                        }
                    } else {
                         addCombatLog(t('combat.log.enemy_misses', { enemyName: t(enemy.nameKey), chance: enemyHitChance.toFixed(0) }), 'enemy-action miss');
                    }
                }
            }
            
            enemy.statusEffects = (enemy.statusEffects || []).map(e => ({...e, duration: e.duration - 1})).filter(e => e.duration > 0);
        }
    }
    
    if (gameState.isTutorialCombat) {
        await displayTutorialMessage('after_enemy_attack');
    }
    gameState.combatRound++;
    if (gameState.isSurvivalCombat && gameState.afterCombatEvents?.win?.dialogue?.mid) {
        const midCombatDialogues = gameState.afterCombatEvents.win.dialogue.mid;
        for (const dialogue of midCombatDialogues) {
            if (gameState.combatRound === dialogue.turn && !dialogue.shown) {
                await showAdventureStyleAlert(dialogue.characterKey, dialogue.textKey);
                dialogue.shown = true;
            }
        }
    }
    if (gameState.consumableCooldown > 0) {
        gameState.consumableCooldown--;
    }
    if (gameState.isSurvivalCombat && gameState.combatRound > gameState.survivalTurns) {
        addCombatLog(t('combat.log.victory'));
        updateCombatUI();
        setTimeout(() => endCombat(false), 1500);
        return;
    }
    if (gameState.playerCurrentHP <= 0) {
        addCombatLog(t('combat.log.player_defeated'));
        updateCombatUI();
        setTimeout(() => endCombat(false, true), 1500);
        return;
    }
    if (gameState.currentEnemies.every(e => e.currentHP <= 0)) {
        addCombatLog(t('combat.log.victory'));
        updateCombatUI();
        setTimeout(() => endCombat(false), 1500);
        return;
    }
    if (gameState.combatRound > 20) {
        addCombatLog(t('combat.log.stalemate'));
        setTimeout(() => endCombat(true), 1500);
        return;
    }
    startPlayerTurn();
    saveGame();
}

window.endCombat = async function(isFlee = false, isDefeat = false) {
    try {
        if (!gameState.inCombat) {
            return;
        }

        clearTimeout(gameState.turnTimerId);
        clearInterval(turnTimerInterval);
        gameState.turnTimerId = null;
        turnTimerInterval = null;
        gameState.inCombat = false;

        // MON COMMENTAIRE : C'est le nouveau bloc de code pour gérer SPÉCIFIQUEMENT le boss de guilde.
        // On le place tout au début pour qu'il agisse comme un cas spécial.
        const isGuildBossFight = gameState.currentEnemies[0]?.isGuildBoss;
        if (isGuildBossFight) {
            // On calcule les dégâts infligés en comparant la vie de départ et la vie de fin.
            const damageDealt = Math.max(0, guildBossInitialHP - gameState.currentEnemies[0].currentHP);
            
            // On récupère le callback qui a été défini dans game.0.9.0.js
            const callbacks = gameState.afterCombatEvents;
            if (callbacks && callbacks.win) {
                // On appelle la fonction `recordBossDamage` en lui passant les dégâts.
                await callbacks.win(damageDealt);
            }

            // Nettoyage final spécifique au combat de boss
            gameState.isBountyFight = false; // Assure la propreté pour les autres systèmes
            gameState.customBountyEnemy = null;
            gameState.currentEnemies = [];
            gameState.afterCombatEvents = null;
            
            showCombatScreen(false); // On cache l'écran de combat
            return; // TRÈS IMPORTANT : On arrête la fonction ici pour ne pas exécuter la logique de victoire/défaite normale.
        }

        // MON COMMENTAIRE : Tout le code ci-dessous est TA logique originale. Elle ne sera exécutée
        // que si le combat N'ÉTAIT PAS un combat de boss de guilde. Rien n'a été changé.
        const wasSurvivalCombat = gameState.isSurvivalCombat;
        const survivalVictory = wasSurvivalCombat && !isFlee && !isDefeat;
        const regularVictory = !wasSurvivalCombat && gameState.currentEnemies.every(e => e.currentHP <= 0);
        const victory = regularVictory || survivalVictory;

        const player = gameState.player;
        const lossEvent = gameState.afterCombatEvents?.loss;
        const isBossFight = gameState.currentEnemies.some(e => e.hasOwnProperty('id'));

        if (isDefeat) {
            handlePlayerDeath(isBossFight ? 60 : 30);
        } else if (isFlee) {
            await showCustomAlert(t('combat.alerts.fled_combat'));
            
            if (lossEvent?.event === 'ADVENTURE_COMBAT_LOSS') {
                gameState.inCombat = false;
                showCombatScreen(false);
                
                gameState.isBountyFight = false;
                gameState.isStoryBoss = false;
                gameState.currentEnemies = [];
                gameState.afterCombatEvents = null;
                updateGameUI();
                saveGame();
                return;
            }

            if (isBossFight) {
                await handleBossLoss(true);
                handlePlayerDeath(60);
            } else {
                if (gameState.expeditionCache) {
                    gameState.expeditionCache = {
                        xp: { base: 0, combat: 0 }, resources: {}, fragments: 0, itemsFound: [],
                        log: [t('expeditions.log.fled_and_lost_rewards')]
                    };
                    await endInteractiveExpedition({ descriptionKey: "expeditions.alerts.fled_expedition_ended", rewards: [] });
                }
            }
        } else if (victory) {
            gameState.currentEnemies.forEach(enemy => {
                let killCredit = 1;
                if (hasConstellationTalent('destiny_codex_1')) {
                    killCredit = 1 + (30 / 100);
                }
                const enemyKey = Object.keys(ENEMIES_DB).find(k => ENEMIES_DB[k].nameKey === enemy.nameKey) || enemy.id;
                if (enemyKey) {
                    player.killCount[enemyKey] = (player.killCount[enemyKey] || 0) + killCredit;
                }

                if (gameState.expeditionCache && enemy.xpReward) {
                    const xpGained = enemy.xpReward;
                    gameState.expeditionCache.xp.combat = (gameState.expeditionCache.xp.combat || 0) + xpGained;
                    gameState.expeditionCache.log.push(t('expeditions.log.xp_from_enemy', { xp: xpGained, enemyName: t(enemy.nameKey) }));
                }
                checkSucces('KILL_ENEMY');
                const hpPercent = (gameState.playerCurrentHP / player.currentMaxHP) * 100;
                checkSucces('LOW_HP_WIN', { hpPercent: hpPercent });
                grantEnemyLoot(enemy);
            });
            updateMasteryUI();

            if (player.combatBuffs && player.combatBuffs.length > 0) {
                player.combatBuffs.forEach(buff => buff.remaining_combats--);
                const expiredBuffs = player.combatBuffs.filter(buff => buff.remaining_combats <= 0);
                player.combatBuffs = player.combatBuffs.filter(buff => buff.remaining_combats > 0);
                expiredBuffs.forEach(buff => {
                    const foodData = COOKING_RECIPES_DB[buff.id];
                    showToast(t('alerts.food.food_buff_expired', { foodName: t(foodData.nameKey) }), 'system-message');
                });
                if (expiredBuffs.length > 0) recalculateTotalStats();
            }

            const winEvent = gameState.afterCombatEvents?.win;

            if (winEvent?.event === 'ADVENTURE_COMBAT_WIN') {
                if (survivalVictory && winEvent.dialogue && winEvent.dialogue.end) {
                    await showAdventureStyleAlert(winEvent.characterKey, winEvent.dialogue.end);
                }
                
                gameState.inCombat = false;
                showCombatScreen(false);

                advanceAdventure(winEvent.nodeId);
                return; 

            } else if (isBossFight) {
                await handleBossWin();
                await showCustomAlert(t('combat.alerts.boss_defeated', { bossName: t(gameState.currentEnemies[0].nameKey) }));
                generateExpeditions();
            
            } else if (winEvent === 'DUNGEON_COMBAT_WIN') {
                handleDungeonCombatWin();
                return;
            } else if (winEvent?.event === 'BOUNTY_WIN') {
                await completeBounty(winEvent.bountyId);            
            } else if (typeof winEvent === 'string' || (typeof winEvent === 'object' && winEvent && winEvent.event)) {
                gameState.inCombat = false;
                showCombatScreen(false);
                
                await new Promise(resolve => setTimeout(resolve, 50)); 
                
                presentExpeditionEvent(winEvent);
                
                gameState.isBountyFight = false;
                gameState.currentEnemies = [];
                gameState.afterCombatEvents = null;
                updateGameUI();
                saveGame();
                return;
            }
        }
        
        gameState.isSurvivalCombat = false;
        gameState.survivalTurns = 0;
        gameState.isStoryBoss = false;
        gameState.isBountyFight = false;
        gameState.currentEnemies = [];
        gameState.afterCombatEvents = null;
        
        if (!isDefeat) {
            showCombatScreen(false);
            updateGameUI();
        }

        saveGame();
    } catch (error) {
        console.error("Erreur critique dans endCombat:", error);
        gameState.inCombat = false;
        gameState.isSurvivalCombat = false;
        gameState.isStoryBoss = false;
        showCombatScreen(false);
        updateGameUI();
        saveGame();
    }
};

function getBossForCurrentLevel() {
    const bossIndex = Math.min(gameState.bossesKilled, BOSS_DB.length - 1);
    const originalBoss = BOSS_DB[bossIndex];
    const isInEndlessMode = gameState.bossesKilled >= BOSS_DB.length && (gameState.endlessBossLevel || 0) > 0;

    if (isInEndlessMode) {
        const scaledBoss = JSON.parse(JSON.stringify(originalBoss));
        const level = gameState.endlessBossLevel;

        // MON COMMENTAIRE : C'est ici que la correction principale a lieu.
        // Au lieu de modifier une propriété "name" qui n'est pas utilisée par l'affichage,
        // on crée cette propriété "name" en utilisant le nom déjà traduit (via t())
        // et on y ajoute le niveau "+X".
        scaledBoss.name = t(scaledBoss.nameKey) + ` +${level}`;
        
        const multiplier = Math.pow(1.10, level);
        for (const stat in scaledBoss.baseStats) {
            scaledBoss.baseStats[stat] = Math.floor(scaledBoss.baseStats[stat] * multiplier);
        }
        return scaledBoss;
    }
    return originalBoss;
}

// combat.0.9.0.js

window.confirmBossFight = async function() {
    if (gameState.isOnExpedition) {
        showCustomAlert(t('combat.alerts.busy_expedition'));
        return;
    }
    const nextBoss = getBossForCurrentLevel();
    if (gameState.player.level < nextBoss.levelRequirement) {
        showCustomAlert(t('combat.alerts.boss_level_too_low', { playerLevel: gameState.player.level, bossName: t(nextBoss.nameKey), requiredLevel: nextBoss.levelRequirement }));
        return;
    }

    // MON COMMENTAIRE : On modifie cette ligne pour qu'elle utilise `nextBoss.name` s'il existe.
    // Sinon, elle utilise la traduction de `nameKey` comme avant.
    const bossDisplayName = nextBoss.name || t(nextBoss.nameKey);

    const confirmed = await showCustomConfirm(
        t('combat.alerts.boss_confirm_fight_detailed', { bossName: bossDisplayName })
    );

    if (confirmed) {
        startBossFight();
    }
}

function startBossFight() {
    const boss = getBossForCurrentLevel();
    startCombat([boss], { 
        win: 'BOSS_WIN_EVENT',
        loss: 'BOSS_LOSS_EVENT'
    });
}

async function displayTutorialMessage(trigger) {
    if (!gameState.isTutorialCombat || !gameState.tutorialData) return;

    // Trouve l'INDEX du premier message qui correspond au déclencheur
    const messageIndex = gameState.tutorialData.findIndex(msg => msg.trigger === trigger);
    
    // Si on a trouvé un message (index est différent de -1)
    if (messageIndex > -1) {
        const messageData = gameState.tutorialData[messageIndex]; // On récupère les données du message
        const characterName = t('adventure.characters.' + messageData.character);
        const messageText = t(messageData.textKey);

        // Affiche une alerte et attend que le joueur clique sur "OK"
        await showCustomAlert(`<h4>${characterName}</h4><p>${messageText}</p>`);

        // TRES IMPORTANT : On retire le message de la liste pour ne pas le remontrer
        gameState.tutorialData.splice(messageIndex, 1);
    }
}

function addCombatLog(message, className = 'system-message') {
    const combatLog = document.getElementById('combat-log');
    const isScrolledToBottom = combatLog.scrollHeight - combatLog.clientHeight <= combatLog.scrollTop + 1;
    const p = document.createElement('p');
    p.innerHTML = message;
    p.className = className;
    combatLog.appendChild(p);
    if (isScrolledToBottom) {
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    while (combatLog.children.length > 100) {
        combatLog.removeChild(combatLog.firstChild);
    }
}

window.startCombat = async function(enemyDataArray, afterCombatEvents, isTutorial = false, tutorialDialogue = [], isStoryBoss = false) {
    gameState.preCombatUIState = {
        screen: lastActiveScreen,
        subTab: lastActiveSubTab
    };
    gameState.inCombat = true;
    gameState.isTutorialCombat = isTutorial;
    gameState.isStoryBoss = isStoryBoss;
    gameState.tutorialData = tutorialDialogue;
    gameState.firstSkillUsedThisCombat = false;
    gameState.indomitableUsedThisCombat = false;
    if (gameState.isInDungeon) document.body.classList.add('dungeon-active');
    gameState.afterCombatEvents = afterCombatEvents;
    gameState.combatRound = 1;
    gameState.currentEnemies = [];
    gameState.playerTargetIndex = 0;
    gameState.playerActionLocked = false;
    gameState.consumableCooldown = 0;
    guildBossInitialHP = 0;
    delete gameState.combatRoundLimit;

    if (!Array.isArray(enemyDataArray)) {
        console.error("startCombat expects an array, but received:", enemyDataArray);
        enemyDataArray = [enemyDataArray];
    }

    const difficultyMultiplier = getAscensionDifficultyMultiplier();
    const enemyContainer = document.getElementById('enemy-group-container');
    if (enemyContainer) enemyContainer.innerHTML = '';

    enemyDataArray.forEach(data => {
        let enemyData;
        const isCustomBounty = (data === 'CUSTOM_BOUNTY' && gameState.customBountyEnemy);

        if (isCustomBounty) {
            enemyData = gameState.customBountyEnemy;
        } else if (typeof data === 'object' && data !== null && data.nameKey) {
            enemyData = data;
        } else if (typeof data === 'string') {
            enemyData = ENEMIES_DB[data] || BOSS_DB.find(b => b.name === data);
        }

        if (enemyData) {
            const newEnemy = {
                ...JSON.parse(JSON.stringify(enemyData)),
                statusEffects: [],
                // ==================== DÉBUT DE LA MODIFICATION ====================
                // On initialise un objet pour suivre les temps de recharge des compétences de l'ennemi.
                skillCooldowns: {}
                // ===================== FIN DE LA MODIFICATION =====================
            };
            
            if (isCustomBounty && newEnemy.isGuildBoss) {
                newEnemy.currentHP = newEnemy.currentHP;
                newEnemy.baseStats.Vie = newEnemy.maxHP;
                guildBossInitialHP = newEnemy.currentHP;
                gameState.combatRoundLimit = GUILD_BOSS_COMBAT_TURN_LIMIT;
            } else {
                newEnemy.currentHP = newEnemy.baseStats.Vie;
                
                if (difficultyMultiplier > 1.0) {
                    for (const stat in newEnemy.baseStats) {
                        newEnemy.baseStats[stat] = Math.floor(newEnemy.baseStats[stat] * difficultyMultiplier);
                    }
                    newEnemy.currentHP = newEnemy.baseStats.Vie;
                }
            }

            gameState.currentEnemies.push(newEnemy);
        }
    });

    if (gameState.customBountyEnemy) {
        gameState.customBountyEnemy = null;
    }

    if (isFamilyComplete("Le Sablier du Temps")) {
        const buffs = [
            { stat: 'Force_percent', value: 15, name: t('stats.displayNames.Force') },
            { stat: 'Défense_percent', value: 15, name: t('stats.displayNames.Défense') },
            { stat: 'Agilité_percent', value: 15, name: t('stats.displayNames.Agilité') }
        ];
        const chosenBuff = buffs[Math.floor(Math.random() * buffs.length)];
        
        gameState.player.statusEffects = gameState.player.statusEffects || [];
        gameState.player.statusEffects.push({
            type: 'buff',
            stat: chosenBuff.stat,
            value: chosenBuff.value,
            duration: 4
        });
        recalculateTotalStats();
        addCombatLog(t('combat.log.hourglass_buff', { statName: chosenBuff.name }), 'system-message');
    }

    if (gameState.currentEnemies.length === 0) {
        console.error("Combat started without valid enemies!");
        endCombat(false);
        return;
    }
    
    showCombatScreen(true);

    document.getElementById('combat-log').innerHTML = '';
    addCombatLog(t('combat.log.combat_start'));

    switchCombatTab('skills');

    if (gameState.isTutorialCombat) {
        await displayTutorialMessage('on_start');
    }

    updateCombatUI();
    saveGame();
    document.getElementById('combat-section').scrollIntoView({ behavior: 'smooth' });

    startPlayerTurn();
}

function addCombatLog(message, className = 'system-message') {
    const combatLog = document.getElementById('combat-log');

    // On vérifie si l'utilisateur est déjà en bas du log AVANT d'ajouter le nouveau message.
    const isScrolledToBottom = combatLog.scrollHeight - combatLog.clientHeight <= combatLog.scrollTop + 1;

    const p = document.createElement('p');
    p.innerHTML = message;
    p.className = className;
    combatLog.appendChild(p);

    // On ne scroll vers le bas que si l'utilisateur y était déjà.
    if (isScrolledToBottom) {
        combatLog.scrollTop = combatLog.scrollHeight;
    }

    // On augmente la limite de messages pour un meilleur historique.
    while (combatLog.children.length > 100) { // Limite augmentée à 100
        combatLog.removeChild(combatLog.firstChild);
    }
}

function updateCombatUI() {
    if (!gameState.inCombat) return;
    const player = gameState.player;
    const combatSection = document.getElementById('combat-section');

    combatSection.querySelector('#combat-round').textContent = gameState.combatRound;
    const playerHPForDisplay = Math.max(0, gameState.playerCurrentHP);
    combatSection.querySelector('#player-hp-display').textContent = Math.round(playerHPForDisplay);
    combatSection.querySelector('#player-max-hp-display').textContent = player.currentMaxHP;
    combatSection.querySelector('#player-hp-fill').style.width = `${(playerHPForDisplay / player.currentMaxHP) * 100}%`;
    
    const manaDisplay = document.getElementById('player-mana-display-combat');
    const maxManaDisplay = document.getElementById('player-max-mana-display-combat');
    const manaFill = document.getElementById('player-mana-fill-combat');
    if(manaDisplay && maxManaDisplay && manaFill) {
        manaDisplay.textContent = Math.round(gameState.playerCurrentMana);
        maxManaDisplay.textContent = player.maxMana;
        manaFill.style.width = player.maxMana > 0 ? `${(gameState.playerCurrentMana / player.maxMana) * 100}%` : '0%';
    }
    const enemyContainer = combatSection.querySelector('#enemy-group-container');
    gameState.currentEnemies.forEach((enemy, index) => {
        let card = document.getElementById(`enemy-card-${index}`);
        if (!card) {
            card = document.createElement('div');
            card.id = `enemy-card-${index}`;
            card.className = 'enemy-card';
            if (enemy.isSummon) {
                card.classList.add('summon-card');
            }
            card.innerHTML = `
                <div id="enemy-sprite-container-${index}" class="enemy-sprite-container"></div>
                <h4 id="enemy-name-${index}"></h4>
                <div class="hp-bar boss-hp-bar">
                    <div id="enemy-hp-fill-${index}"></div>
                </div>
                <p><span id="enemy-hp-display-${index}"></span> / <span id="enemy-max-hp-display-${index}"></span> ${t('ui.char_info.health_short')}</p>
                <p id="enemy-role-${index}" class="role-indicator"></p>
            `;
            enemyContainer.appendChild(card);
        }
        const spriteContainer = document.getElementById(`enemy-sprite-container-${index}`);
        if (enemy.sprite) {
            spriteContainer.innerHTML = `<img src="${enemy.sprite}" alt="${t(enemy.nameKey)}">`;
        } else {
            spriteContainer.innerHTML = '';
        }
        if (enemy.currentHP > 0) {
            card.classList.remove('dead');
            const enemyDisplayName = enemy.name || t(enemy.nameKey);
            document.getElementById(`enemy-name-${index}`).innerHTML = `${enemyDisplayName}`;

            document.getElementById(`enemy-hp-display-${index}`).textContent = Math.round(enemy.currentHP);
            document.getElementById(`enemy-max-hp-display-${index}`).textContent = enemy.baseStats.Vie;
            document.getElementById(`enemy-role-${index}`).textContent = enemy.role === 'tank' ? `🛡️ ${t('combat.ui.role_tank')}` : '';
            const hpPercent = (enemy.currentHP / enemy.baseStats.Vie) * 100;
            document.getElementById(`enemy-hp-fill-${index}`).style.width = `${hpPercent}%`;
            card.onclick = () => selectTarget(index);
            if (index === gameState.playerTargetIndex) {
                card.classList.add('targeted');
            } else {
                card.classList.remove('targeted');
            }
        } else {
            card.classList.add('dead');
            card.classList.remove('targeted');
            
            const enemyDisplayName = enemy.name || t(enemy.nameKey);
            document.getElementById(`enemy-name-${index}`).innerHTML = `${enemyDisplayName}`;

            document.getElementById(`enemy-hp-display-${index}`).textContent = 0;
            document.getElementById(`enemy-max-hp-display-${index}`).textContent = enemy.baseStats.Vie;
            document.getElementById(`enemy-hp-fill-${index}`).style.width = `0%`;
            card.onclick = null;
        }
    });

    const skillsContainer = document.getElementById('skills-tab-content');
    const consumablesContainer = document.getElementById('consumables-tab-content');
    skillsContainer.innerHTML = '';
    consumablesContainer.innerHTML = '';

    // MON COMMENTAIRE : Début de la nouvelle logique pour l'affichage des compétences.
    const playerClass = player.class;
    if (playerClass && SKILLS_DB[playerClass]) {
        const availableSkills = [];
        let fallbackSkill = null;

        // MON COMMENTAIRE : 1. On filtre d'abord toutes les compétences par niveau et on identifie la compétence de secours.
        for (const skillId in SKILLS_DB[playerClass]) {
            const skill = SKILLS_DB[playerClass][skillId];
            if (player.level >= skill.level_required) {
                if (skill.is_fallback) {
                    fallbackSkill = { id: skillId, ...skill };
                } else {
                    availableSkills.push({ id: skillId, ...skill });
                }
            }
        }

        // MON COMMENTAIRE : 2. On vérifie quelles compétences "normales" sont utilisables (assez de mana).
        const usableSkills = availableSkills.filter(skill => {
            const manaCost = skill.mana_cost || 0;
            return gameState.playerCurrentMana >= manaCost;
        });

        let skillsToDisplay = [];
        // MON COMMENTAIRE : 3. On décide quoi afficher :
        // - Si au moins une compétence normale a assez de mana, on affiche toutes les compétences normales (certaines seront grisées).
        // - Sinon, et s'il existe une compétence de secours, on affiche uniquement celle-ci.
        if (usableSkills.length > 0) {
            skillsToDisplay = availableSkills;
        } else if (fallbackSkill) {
            skillsToDisplay.push(fallbackSkill);
        }

        // MON COMMENTAIRE : 4. On crée les boutons uniquement pour les compétences à afficher.
        skillsToDisplay.forEach(skill => {
            const button = document.createElement('button');
            button.className = 'skill-button';
            button.textContent = t(skill.nameKey);
            button.title = t(skill.descriptionKey);
            
            const manaCost = skill.mana_cost || 0;
            if (manaCost > gameState.playerCurrentMana) {
                button.disabled = true;
                button.title += ` (Mana insuffisant)`;
            }
            
            button.onclick = () => executePlayerAttack(skill.id);
            skillsContainer.appendChild(button);
        });
    }
    // MON COMMENTAIRE : Fin de la nouvelle logique.
    
    for (const itemId in player.consumables) {
        const count = player.consumables[itemId];
        if (count > 0) {
            const itemData = CONSUMABLES_DB[itemId];
            const button = document.createElement('button');
            button.textContent = `${t(itemData.nameKey)} (x${count})`;
            button.title = t(itemData.descriptionKey);
            button.className = 'consumable-button consumable-combat-item';
            button.onclick = () => useConsumableInCombat(itemId);
            consumablesContainer.appendChild(button);
        }
    }
    if (consumablesContainer.innerHTML === '') {
        consumablesContainer.innerHTML = `<p style="color: #aaa; font-style: italic;">${t('combat.ui.no_consumables')}</p>`;
    }
    const passivesContainer = document.getElementById('player-passives-container');
    passivesContainer.innerHTML = '';

    if (hasConstellationTalent('mage_mana_shield_1')) {
        const isActive = gameState.activePassives['mana_shield'] === true;
        const button = document.createElement('button');
        button.className = `passive-skill-button ${isActive ? 'active' : 'inactive'}`;
        button.innerHTML = "🛡️";
        button.title = t('combat.ui.mana_shield_tooltip', { status: isActive ? t('combat.ui.status_active') : t('combat.ui.status_inactive') });
        button.onclick = () => togglePassive('mana_shield');
        passivesContainer.appendChild(button);
    }
    const fleeButton = document.getElementById('flee-button');
    if (fleeButton) {
        fleeButton.style.display = (gameState.isBountyFight || gameState.isStoryBoss) ? 'none' : 'block';
    }
}

/**
 * Change la cible du joueur.
 * @param {number} index - L'index du nouvel ennemi à cibler.
 */
function selectTarget(index) {
    if (index >= 0 && index < gameState.currentEnemies.length && gameState.currentEnemies[index].currentHP > 0) {
        gameState.playerTargetIndex = index;
        updateCombatUI();
    }
}

async function executePlayerAttack(skillId) {
    if (gameState.playerActionLocked) return;

    if (!gameState.firstSkillUsedThisCombat) {
        gameState.firstSkillUsedThisCombat = true;
        if (hasTrait("TMAX_ECHO_ETERNITE") && Math.random() < 0.25) {
            addCombatLog(t('combat.log.echo_of_eternity'), "system-message");
            
            performAttackLogic(skillId);
            
            startPlayerTurn(); 
            return;
        }
    }
    
    const attackSuccessful = await performAttackLogic(skillId);
    if (!attackSuccessful) return;

    endPlayerTurnAndStartEnemyTurn();
    return true;
}

async function performAttackLogic(skillId) {
    if (gameState.playerActionLocked) return;
    
    const player = gameState.player;
    const skill = SKILLS_DB[player.class][skillId];

    const freecastChance = player.totalStats.freecast_chance_percent || 0;
    const isFreecast = skill.mana_cost > 0 && (Math.random() * 100 < freecastChance);

    let finalManaCost = skill.mana_cost || 0;
    if (finalManaCost > 0) {
        let manaCostModifier = 1 + ((player.totalStats.mana_cost_percent || 0) / 100);
        
        if (hasConstellationTalent('mage_archon_keystone')) {
            manaCostModifier += 0.15;
        }

        finalManaCost = Math.floor(finalManaCost * manaCostModifier);
    }
   if (finalManaCost > 0 && !isFreecast && gameState.playerCurrentMana < finalManaCost) {
        addCombatLog(t('combat.log.not_enough_mana'), "system-message");
        return false;
    }
    
    addCombatLog(t('combat.log.turn_start', { round: gameState.combatRound }));
    
    if (isFreecast) {
        addCombatLog(t('combat.log.freecast_success'), "system-message");
    } else if (finalManaCost > 0) {
        gameState.playerCurrentMana -= finalManaCost;
    }

    const playerIsStunned = (player.statusEffects || []).find(e => e.type === 'stun');
    if (playerIsStunned) {
        const stunResistance = gameState.player.totalStats.stun_resistance_percent || 0;
        if (stunResistance >= 100) {
            addCombatLog(t('combat.log.stun_resist'), 'system-message');
            gameState.player.statusEffects = gameState.player.statusEffects.filter(e => e.type !== 'stun');
        } else {
            addCombatLog(t('combat.log.player_stunned'));
            return true;
        }
    }

    const mainTargetIndex = gameState.playerTargetIndex;
    const mainTarget = gameState.currentEnemies[mainTargetIndex];
    
    addCombatLog(t('combat.log.player_uses_skill', { skillName: t(SKILLS_DB[player.class][skillId].nameKey), targetName: t(mainTarget.nameKey) }), 'player-action');

    if (skill.effects?.aoe) {
        for (const [index, enemy] of gameState.currentEnemies.entries()) {
            if (enemy.currentHP > 0) {
                const isMainTarget = (index === mainTargetIndex);
                const damageMultiplier = isMainTarget ? skill.damage_multiplier : (skill.damage_multiplier * (skill.effects.aoe_multiplier || 0.5));
                performAttackOnTarget(index, skill, damageMultiplier);
            }
        }
    } else {
        const tank = gameState.currentEnemies.find(e => e.role === 'tank' && e.currentHP > 0 && e !== mainTarget);
        const totalDamageDealt = performAttackOnTarget(mainTargetIndex, skill, skill.damage_multiplier);
        if (tank && totalDamageDealt > 0) {
            const tankIndex = gameState.currentEnemies.indexOf(tank);
            const interceptedAmount = Math.floor(totalDamageDealt * ((tank.intercept_percent || 50) / 100));
            mainTarget.currentHP += interceptedAmount;
            tank.currentHP -= interceptedAmount;
            addCombatLog(t('combat.log.tank_intercept', { tankName: t(tank.nameKey), damage: interceptedAmount }));
            const tankSprite = document.getElementById(`enemy-sprite-container-${tankIndex}`);
            if (tankSprite) {
                tankSprite.classList.add('is-taking-damage');
                setTimeout(() => tankSprite.classList.remove('is-taking-damage'), 300);
            }
        }
    }

    updateCombatUI();

    gameState.currentEnemies.forEach(enemy => {
        if (enemy.currentHP <= 0 && enemy.isDefeated !== true) {
            addCombatLog(t('combat.log.enemy_defeated', { enemyName: t(enemy.nameKey) }));
            enemy.isDefeated = true;
        }
    });
    updateCombatUI();

    if (gameState.currentEnemies[gameState.playerTargetIndex].currentHP <= 0) {
        const nextTargetIndex = gameState.currentEnemies.findIndex(e => e.currentHP > 0);
        if (nextTargetIndex !== -1) selectTarget(nextTargetIndex);
    }
    
    return true;
}

function performAttackOnTarget(targetIndex, skill, damageMultiplier) {
    const player = gameState.player;
    const target = gameState.currentEnemies[targetIndex];
    if (!target || target.currentHP <= 0) return 0;

    const playerIntelligence = player.totalStats.Intelligence || 0;
    const enemyAgility = target.baseStats.Agilité || 0;
    const calculatedHitChance = 90 + (playerIntelligence - enemyAgility) + (skill.precision_modifier || 0);
    const playerHitChance = Math.max(25, Math.min(calculatedHitChance, 95));

    if (Math.random() * 100 > playerHitChance) {
        addCombatLog(t('combat.log.player_miss', { targetName: t(target.nameKey), chance: playerHitChance.toFixed(0) }), 'player-action miss');
        return 0;
    }

    const scalingStat = skill.scales_with || 'Force';
    const scalingStatValue = player.totalStats[scalingStat] || 0;
    let baseDamage = scalingStatValue + (player.level / 1.32);

    const armorShredPercent = player.totalStats.armor_shred_percent || 0;
    const armorPenetration = skill.effects?.armor_penetration || 0;
    const effectiveEnemyDefense = target.baseStats.Défense * (1 - (armorShredPercent / 100)) * (1 - (armorPenetration / 100));
    
    let damageDealt = Math.max(1, baseDamage - effectiveEnemyDefense) * damageMultiplier;
    damageDealt *= (0.9 + Math.random() * 0.2);

    const damagePercentBonus = 1 + ((player.totalStats.damage_percent || 0) / 100);
    damageDealt *= damagePercentBonus;

    let isCrit = Math.random() * 100 < (player.totalStats.CritChance || 0);

    if (skill.mana_cost) {
        let spellDamageMultiplier = 1 + ((player.totalStats.spell_damage_percent || 0) / 100);
        if (hasConstellationTalent('mage_archon_keystone')) {
            spellDamageMultiplier += 0.25;
        }
        damageDealt *= spellDamageMultiplier;
        const spellCritChance = (player.totalStats.spell_crit_chance_percent || 0);
        isCrit = Math.random() * 100 < spellCritChance;
        if (isCrit) {
            const spellCritDamage = 1.75 + ((player.totalStats.spell_crit_damage_percent || 0) / 100);
            damageDealt *= spellCritDamage;
            addCombatLog(t('combat.log.player_spell_crit', { targetName: t(target.nameKey) }));
        }
    } else if (isCrit) {
        damageDealt *= ((player.totalStats.CritDamage || 175) / 100);
        addCombatLog(t('combat.log.player_crit', { targetName: t(target.nameKey) }));
    }
    
    const targetHpPercent = (target.currentHP / target.baseStats.Vie) * 100;
    if (targetHpPercent < 20 && hasGlobalCodexPassive('passive_execute')) {
        damageDealt *= 1.50;
        addCombatLog(t('combat.log.codex_execute'));
    }
    
    if (isCrit && hasConstellationTalent('archer_sniper_keystone')) {
        if (!target.hasOwnProperty('id') && targetHpPercent < 20 && Math.random() < 0.30) {
            addCombatLog(t('combat.log.eagle_eye_execute', { targetName: t(target.nameKey) }), 'system-message');
            damageDealt = target.currentHP;
        }
    }

    if (gameState.dungeonDebuffs) {
        const damageReductionDebuff = gameState.dungeonDebuffs.find(d => d.type === 'damage_reduction');
        if (damageReductionDebuff) {
            damageDealt *= (1 - (damageReductionDebuff.value / 100));
        }
    }
    damageDealt = Math.floor(damageDealt);
    
    target.currentHP -= damageDealt;
    const targetSprite = document.getElementById(`enemy-sprite-container-${targetIndex}`);
    if (targetSprite) {
        targetSprite.classList.add('is-taking-damage');
        setTimeout(() => targetSprite.classList.remove('is-taking-damage'), 300);
    }
    
    const isAoe = damageMultiplier < skill.damage_multiplier;
    const logKey = isAoe ? 'combat.log.target_takes_aoe_damage' : 'combat.log.target_takes_damage';
    addCombatLog(t(logKey, { targetName: t(target.nameKey), damage: damageDealt }), 'player-action');

    let lifestealPercent = 0;
    let healedAmount = 0;
    
    if (skill.mana_cost) {
        lifestealPercent = player.totalStats.spell_lifesteal_percent || 0;
    } else {
        lifestealPercent = player.totalStats.lifesteal_percent || 0;
    }

    if (lifestealPercent > 0) {
        const healingEffectiveness = 1 + ((player.totalStats.healing_effectiveness_percent || 0) / 100);
        healedAmount = Math.floor(damageDealt * (lifestealPercent / 100) * healingEffectiveness);
        if (healedAmount > 0) {
            gameState.playerCurrentHP = Math.min(player.currentMaxHP, gameState.playerCurrentHP + healedAmount);
            addCombatLog(t('combat.log.player_lifesteal', { amount: healedAmount }));
        }
    }

    const manaLeechPercent = player.totalStats.vol_de_mana_percent || 0;
    if (manaLeechPercent > 0) {
        const manaGained = Math.floor(damageDealt * (manaLeechPercent / 100));
        if (manaGained > 0) {
            gameState.playerCurrentMana = Math.min(player.maxMana, gameState.playerCurrentMana + manaGained);
            addCombatLog(t('combat.log.player_manaleech', { amount: manaGained }));
        }
    }
    
    if (healedAmount > 0 && hasConstellationTalent('mage_battlemage_keystone')) {
        const manaFromSiphon = Math.floor(healedAmount * 0.50);
        if (manaFromSiphon > 0) {
            gameState.playerCurrentMana = Math.min(player.maxMana, gameState.playerCurrentMana + manaFromSiphon);
            addCombatLog(t('combat.log.soul_siphon', { amount: manaFromSiphon }));
        }
    }

    const bleedChance = player.totalStats.bleed_chance_percent || 0;
    if (bleedChance > 0 && Math.random() * 100 < bleedChance) {
        target.statusEffects.push({ type: 'bleed', duration: 2, damage: Math.floor(damageDealt * 0.2) });
        addCombatLog(t('combat.log.enemy_bleeds', { targetName: t(target.nameKey) }));
    }

    const stunChance = player.totalStats.stun_chance_percent || 0;
    if (stunChance > 0 && Math.random() * 100 < stunChance) {
        target.statusEffects.push({ type: 'stun', duration: 1 });
        addCombatLog(t('combat.log.enemy_stunned', { targetName: t(target.nameKey) }));
    }
    
    return damageDealt;
}

async function handleBossWin() {
    updateDailyMissionProgress('bosses');
    checkSucces('KILL_BOSS');
    const player = gameState.player;
    const boss = gameState.currentEnemies[0];
    const endlessLevel = gameState.endlessBossLevel || 0;
    let finalXp = boss.xpReward;
    let bonusXp = 0;
    if (endlessLevel > 0) {
        const bonusMultiplier = 1 + (endlessLevel * 0.10);
        finalXp = Math.floor(boss.xpReward * bonusMultiplier);
        bonusXp = finalXp - boss.xpReward;
    }

    player.xp += finalXp;
    gameState.stats.totalXpGained = (gameState.stats.totalXpGained || 0) + finalXp;
    // NOUVEAU : On utilise la clé de traduction pour le nom de la ressource
    const resourceResult = addResource('bois', boss.resourceReward);
    if (resourceResult.isFull) {
        showToast(t('alerts.warehouse_full', { resources: t('stats.displayNames.bois') }), "error");
    }
    if (boss.bountyTokenReward) {
        player.resources.bounty_tokens = (player.resources.bounty_tokens || 0) + boss.bountyTokenReward;
    }
    gameState.bossesKilled++;

    if (gameState.bossesKilled > BOSS_DB.length) {
        gameState.endlessBossLevel = endlessLevel + 1;
    } else if (gameState.bossesKilled === BOSS_DB.length) {
        gameState.endlessBossLevel = 1;
    }

    let logMessage = t('combat.log.boss_xp_gain_base', { xp: boss.xpReward });
    if (bonusXp > 0) {
        logMessage += t('combat.log.boss_xp_gain_bonus', { bonus: bonusXp });
    }
    logMessage += t('combat.log.boss_resource_gain', { resources: boss.resourceReward });
    addCombatLog(logMessage);

    const finalDropChance = calculateFinalDropChance(boss.itemDropChance);
    if (Math.random() < finalDropChance) {
        const bossRarities = ['rare', 'epic', 'epic', 'legendary', 'mythic'];
        const bossRarity = bossRarities[Math.min(boss.id, bossRarities.length - 1)];
        await grantRandomItem(bossRarity, t('combat.log.from_boss', { bossName: t(boss.nameKey) }));
        updateInventoryUI();
    }
    await checkForLevelUp();
}

async function handleBossLoss(isFlee = false) {
    const player = gameState.player;
    const xpLoss = Math.floor(player.xp * 0.1);
    const resourceLoss = Math.floor(player.resources.bois * 0.1);
    player.xp = Math.max(0, player.xp - xpLoss);
    player.resources.bois = Math.max(0, player.resources.bois - resourceLoss);
    addCombatLog(t('combat.log.boss_loss_penalty', { xp: xpLoss, resources: resourceLoss }));
    if (!isFlee && Math.random() < 0.20) {
        const equippedSlots = EQUIPMENT_SLOTS.filter(slot => player.equipment[slot] !== null);
        if (equippedSlots.length > 0) {
            const randomSlot = equippedSlots[Math.floor(Math.random() * equippedSlots.length)];
            const lostItem = player.equipment[randomSlot];
            player.equipment[randomSlot] = null;
            const lostItemName = t(lostItem.nameKey);
            addCombatLog(t('combat.alerts.item_lost_on_death', { itemName: lostItemName }));
            await showCustomAlert(t('combat.alerts.item_lost_on_death', { itemName: lostItemName }))
            recalculateTotalStats();
        }
    }
}

function handleCombatWin() {
    const enemy = gameState.currentEnemy;
    const player = gameState.player;
    player.killCount[enemy.name] = (player.killCount[enemy.name] || 0) + 1;
    updateMasteryUI();
    
    // MODIFIÉ
    addCombatLog(t('combat.log.enemy_defeated_simple', { enemyName: t(enemy.nameKey) }));

    if (gameState.expeditionCache) {
        gameState.expeditionCache.xp += enemy.xpReward;

        // MODIFIÉ
        gameState.expeditionCache.log.push(t('expeditions.log.xp_gain_simple', { xp: enemy.xpReward }));

        if (enemy.loot) {
            for (const resource in enemy.loot) {
                const amount = enemy.loot[resource];
                if (resource === 'fragments') {
                    gameState.expeditionCache.fragments = (gameState.expeditionCache.fragments || 0) + amount;
                } else {
                    gameState.expeditionCache.resources[resource] = (gameState.expeditionCache.resources[resource] || 0) + amount;
                }
                // MODIFIÉ
                gameState.expeditionCache.log.push(t('expeditions.log.resource_gain_simple', { amount: amount, resource: resource }));
            }
        }
    }
}

function handleCombatLoss() {
    const enemy = gameState.currentEnemy;
    addCombatLog(`Vous avez été vaincu par ${t(enemy.nameKey)}...`);
    if (gameState.expeditionCache) {
        const xpPenalty = Math.round(enemy.xpReward * 0.5);
        gameState.expeditionCache.xp -= xpPenalty;
        gameState.expeditionCache.log.push(`Défaite au combat : -${xpPenalty} XP.`);
    }
}

function grantEnemyLoot(enemy) {
    if (!enemy || !gameState.expeditionCache) return;
    
    const resourceBonusMultiplier = 1 + (getConstellationBonus('stat_percent', 'resource_gain_percent') / 100);
    const fragmentBonusMultiplier = 1 + (getConstellationBonus('stat_percent', 'fragments_gain_percent') / 100);

    if (enemy.loot) {
        for (const resource in enemy.loot) {
            let amount = enemy.loot[resource];
            if (resource === 'fragments') {
                amount = Math.floor(amount * fragmentBonusMultiplier);
                gameState.expeditionCache.fragments = (gameState.expeditionCache.fragments || 0) + amount;
            } else {
                amount = Math.floor(amount * resourceBonusMultiplier);
                gameState.expeditionCache.resources[resource] = (gameState.expeditionCache.resources[resource] || 0) + amount;
            }
            if (amount > 0) {
                 gameState.expeditionCache.log.push(`Vous récupérez ##RES:${resource}:${amount}## sur ${t(enemy.nameKey)}.`);
            }
        }
    }

    if (enemy.rareLoot) {
        enemy.rareLoot.forEach(lootItem => {
            if (Math.random() < lootItem.chance) {
                if (!gameState.unlockedFeatures.hasFoundRareResource) {
                    gameState.unlockedFeatures.hasFoundRareResource = true;
                }
                let amount = 1; 
                amount = Math.floor(amount * resourceBonusMultiplier);
                if (amount > 0) {
                    const itemName = lootItem.itemId;
                    gameState.expeditionCache.resources[itemName] = (gameState.expeditionCache.resources[itemName] || 0) + amount;
                    
                    // CORRECTION : On utilise t() pour afficher le nom propre de la ressource rare
                    const translatedItemName = t(`stats.displayNames.${itemName}`) || itemName;
                    gameState.expeditionCache.log.push(`✨ Vous avez trouvé un objet rare : ${translatedItemName} !`);
                }
            }
        });
    }
}

window.togglePassive = function(passiveId) {
    if (gameState.playerActionLocked) return; // On ne peut pas changer pendant le tour ennemi

    // On inverse l'état du passif (true devient false, et vice-versa)
    gameState.activePassives[passiveId] = !gameState.activePassives[passiveId];

    // On rafraîchit l'UI du combat pour montrer le changement immédiatement
    updateCombatUI();
    saveGame(); // On sauvegarde l'état pour qu'il persiste si on recharge la page
}

function startGardenCombat(enemyIds, afterCombatCallbacks) {
    // 1. On cache l'écran du Fief
    document.getElementById('fief-screen').classList.add('hidden');
    
    // 2. On prépare les données des ennemis
    const enemyDataArray = enemyIds.map(id => ENEMIES_DB[id]);

    // 3. On utilise la fonction de combat existante mais avec nos callbacks personnalisés
    window.startCombat(enemyDataArray, {
        win: afterCombatCallbacks.win, // Fonction à appeler si le joueur gagne
        loss: afterCombatCallbacks.loss, // Fonction à appeler si le joueur perd ou fuit
    });
}

window.startSurvivalCombat = async function(stepData, nodeId) {
    // Initialisation de l'état de combat de survie
    gameState.inCombat = true;
    gameState.isSurvivalCombat = true;
    gameState.survivalTurns = stepData.turns;

    // On réinitialise l'état "montré" des dialogues intermédiaires
    if (stepData.dialogue && stepData.dialogue.mid) {
        stepData.dialogue.mid.forEach(d => d.shown = false);
    }

    gameState.afterCombatEvents = {
        win: { event: 'ADVENTURE_COMBAT_WIN', nodeId: nodeId, dialogue: stepData.dialogue, characterKey: 'adventure.characters.larry' },
        loss: { event: 'ADVENTURE_COMBAT_LOSS', nodeId: nodeId }
    };
    gameState.combatRound = 1;
    gameState.currentEnemies = [];
    gameState.playerTargetIndex = 0;
    gameState.playerActionLocked = false;
    gameState.consumableCooldown = 0;

    // Chargement de l'ennemi "invincible"
    const enemyData = ENEMIES_DB[stepData.enemies[0]];
    if (enemyData) {
        gameState.currentEnemies.push({
            ...JSON.parse(JSON.stringify(enemyData)),
            currentHP: enemyData.baseStats.Vie,
            statusEffects: []
        });
    }

    // Affichage de l'interface de combat
    document.getElementById('expedition-event-modal').style.display = 'none';
    document.getElementById('expedition-wrapper').style.display = 'none';
    document.getElementById('combat-section').style.display = 'block';
    document.getElementById('combat-log').innerHTML = '';
    
    // On affiche d'ABORD la modale de dialogue de début
    if (stepData.dialogue && stepData.dialogue.start) {
        await showAdventureStyleAlert('adventure.characters.larry', stepData.dialogue.start);
    }
    
    addCombatLog(t('combat.log.combat_start'));

    updateCombatUI();
    saveGame();
    document.getElementById('combat-section').scrollIntoView({ behavior: 'smooth' });

    // Démarrage du premier tour du joueur
    startPlayerTurn();
}
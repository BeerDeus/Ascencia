const locales = {
  "fr": {
    language_name: "Français",
    "alerts": {
        "daily_missions": {
            "reward_claimed_success": "Récompense récupérée ! +{amount} Éclats d'Ascension !",
            "not_all_complete": "Vous n'avez pas encore terminé tous vos objectifs quotidiens."
        },
        "frames": {
            "unlocked": "Nouveau cadre débloqué : {frameName} !"
        },
        "ads": {
            "limit_reached": "Vous avez atteint la limite journalière pour cette récompense.",
            "reward_granted": "Récompense obtenue !",
            "watch_prompt": "Lancement de la publicité...",
            "not_completed": "Publicité non terminée. Pas de récompense.",
            "error": "Erreur lors du chargement de la publicité.",
        },
        "language_changed": "Langue définie sur : {langName}",
        "language_change_error": "Une erreur est survenue lors du changement de langue.",
        "auth": {
            "welcome": "Bienvenue, {userName} ! Votre progression sera maintenant sauvegardée en ligne.",
            "login_failed": "La connexion a échoué. Veuillez réessayer.",
            "logout_success": "Vous êtes déconnecté. Votre progression locale est toujours sauvegardée.",
            "logout_error": "Erreur lors de la déconnexion. Veuillez réessayer."
        },
        "load": {
            "combat_reload": "Vous avez rechargé la page pendant un combat. C'est considéré comme une défaite par abandon !",
            "expedition_reload": "Vous avez rechargé la page pendant une expédition. L'expédition a été annulée par sécurité.",
            "dungeon_resume": "Reprise de votre session de donjon..."
        },
        "class": {
            "select_a_class": "Veuillez sélectionner une classe !",
            "choice_success": "Vous êtes maintenant un {className} ! Vos compétences sont disponibles dans l'interface de combat.",
        },
        "unequip": {
            "title": "Mise à jour de l'équipement !",
            "description": "Suite aux changements de classe, les objets suivants n'étaient plus compatibles et ont été renvoyés dans votre inventaire :"
        },
        "enchant": {
            "invalid_item_type": "Seuls les objets Rares ou de meilleure qualité (et qui ne font pas partie d'un ensemble) peuvent être enchantés.",
            "unlocked_success": "Station d'Enchantement débloquée !",
            "upgraded_success": "Station d'Enchantement améliorée au niveau {level} !",
            "not_enough_shards": "Pas assez d'Éclats Instables !",
            "rarity_too_low": "Seuls les objets Rares ou supérieurs peuvent être enchantés."
        },
        "loot": {
            "rarity_downgraded": "Un objet <span class=\"{colorClass}\">{rarityName}</span> a été trouvé, mais remplacé car votre savoir est insuffisant."
        },
        "alchemist": {
            "not_enough_components": "Vous n'avez pas assez de composants !",
            "craft_success": "Vous avez préparé : {itemName} !"
        },
        "dungeon": {
            "key_granted": "Vous avez reçu une nouvelle Clé de la Brèche !"
        },
        "merchant": {
            "buy_resource_success": "Achat réussi : +{quantity} {resourceName}",
            "not_enough_specific": "Vous n'avez pas assez de {resourceName} !"
        },
        "forge": {
            "craft_success_generic": "Vous avez forgé : {itemName} !"
        },
        "leaderboard": {
            "indexing_error": "Le classement ne peut être chargé. L'index de la base de données est en cours de création. Veuillez réessayer dans quelques minutes."
        },
        "season": {
            "new_season": "Une nouvelle saison commence : c'est l'{seasonName} !"
        },
        "fief": {
            "level_required": "Vous devez atteindre le niveau 10 pour accéder au Fief.",
            "fragments_collected": "+{amount} 💠 Fragments récolté(s) !",
            "warehouse_full_for_resource": "Votre entrepôt est plein pour cette ressource !",
            "resource_collected": "+{amount} {resourceName} récolté(s) !",
            "warehouse_full_remainder_stored": "Entrepôt plein, le reste est stocké.",
            "upgrade_success": "{buildingName} amélioré au niveau {level} !",
            "balm_produced": "Votre Infirmerie a préparé {amount} Baume(s) de Triage !",
            "warehouse_full_specific": "Entrepôt plein pour : {resources} ! Améliorez-le dans le Fief."
        },
        "garden": {
            "not_ready": "Cette plante n'est pas encore prête !",
            "infestation_win": "Vous avez vaincu les créatures ! Vous pouvez maintenant récolter en toute sécurité.",
            "infestation_flee": "Vous avez fui le combat ! Les créatures ont dévoré une partie de votre récolte.",
            "synergy_success": "✨ SYNERGIE ! {oldPlant} se transforme en {newPlant} !",
            "expansion_success": "Votre jardin s'agrandit !",
            "uproot_confirm": "Êtes-vous sûr de vouloir arracher {plantName} ?<br><br>Vous ne recevrez aucune ressource ni graine en retour.",
            "uproot_success": "{plantName} a été arraché.",
            "no_seeds_to_plant": "Vous n'avez pas de graines à planter.",
            "no_seed_selected": "Veuillez sélectionner une graine à planter.",
            "plant_success": "Vous avez planté : {plantName} !",
            "action_impossible": "Action impossible sur cette parcelle.",
            "harvest_success": "Récolte : +{amount} {resource} et {seeds} graine(s) !",
            "harvest_partial": "Récolte partielle : +{amount} {resource} et {seeds} graine(s)."
        },
        "warehouse_full": "Entrepôt plein pour : {resources}",
        "food": {
            "use_success": "Vous mangez {itemName}. L'effet durera {duration} combats."
        },
        "parsing_error": "Erreur de parsing de la sauvegarde, réinitialisation.",
        "combat_quit": "Vous avez quitté le jeu pendant un combat. C'est une défaite par abandon !",
        "expedition_quit": "Vous avez rechargé la page pendant une expédition. Par sécurité, l'expédition a été annulée.",
        "dungeon_resume": "Reprise de votre session de donjon...",
        "game_reset": "Le jeu a été réinitialisé. La page va maintenant se recharger.",
        "infirmery_bonus": "Grâce à votre Infirmerie, le temps de repos est réduit de {reductionPercent}% !",
        "talent_stat_bonus": "Talent 'Potentiel Libéré' : +{points} point de statistique bonus !",
        "level_up": "Félicitations ! Vous avez atteint le niveau {level} ! Vous gagnez {points} points de statistiques à attribuer.",
        "hp_mana_restored": " Votre vie et votre mana sont restaurés.",
        "enter_name": "Veuillez entrer un nom pour votre personnage !",
        "choose_class": "Veuillez choisir une classe pour votre personnage !",
        "overwrite_save_confirm": "Un personnage (<strong>{name}</strong> - Niv. {level}) existe déjà sur ce compte.<br><br>Voulez-vous vraiment l'écraser et en créer un nouveau ?<p class=\"online-warning\">Cette action est IRREVERSIBLE et effacera votre personnage en ligne.</p>",
        "guest_save_confirm": "Vous êtes sur le point de créer un personnage en tant qu'invité.<br><br>Sa progression ne sera sauvegardée que sur cet appareil et ne sera pas disponible en ligne.",
        "defense_cap_reached": "Vous ne pouvez augmenter la Défense qu'une fois tous les 10 niveaux.",
        "achievement_reward_unlocked": "Nouvelle récompense de succès disponible !",
        "achievement_reward_claimed": "Récompense récupérée : {achievementName} !",
        "reward_none": "Aucune",
        "reward_special": "Récompense Spéciale",
        "unknown_reward_type": "Type de récompense inconnu :",
        "passive_special": "Passif Spécial",
        "inventory_error_not_found": "Objet non trouvé dans l'inventaire !",
        "class_restriction_error": "Vous êtes un {playerClass}. Cet objet est réservé à la ou les classe(s) : {requiredClasses}.",
        "item_locked_recycle_error": "Cet objet est verrouillé et ne peut pas être recyclé.",
        "recycle_irreversible_confirm": "Êtes-vous sûr de vouloir recycler \"<strong>{itemName}</strong>\" ?<br><br>Cette action est irréversible.",
        "recycle_success_toast": "Vous avez recyclé {itemName} (+{fragmentsGained} 💠)",
        "cannot_recycle_error": "Cet objet ne peut pas être recyclé.",
        "no_unlocked_items_to_recycle": "Aucun objet non-verrouillé à recycler.",
        "recycle_all_confirm": "Êtes-vous sûr de vouloir recycler tous vos objets <strong>non-verrouillés</strong> ?<br><br>Vous allez détruire <strong>{itemCount} objet(s)</strong> pour un total de <strong>{fragmentCount} 💠 fragments</strong>.<br><br>Cette action est <strong>IRRÉVERSIBLE</strong>.",
        "recycle_all_success_toast": "Recyclage terminé ! Vous avez gagné {fragmentsGained} 💠 fragments.",
        "forge_unlocked_success": "Félicitations ! Vous avez débloqué la Forge de niveau 1.",
        "not_enough_resources": "Pas assez de ressources !",
        "forge_max_level": "La forge est déjà au niveau maximum !",
        "forge_talent_required": "Vous devez d'abord débloquer la \"Connaissance {rarityName}\" dans la constellation du Destin pour améliorer la forge à ce niveau.",
        "forge_upgraded_success": "Forge améliorée au niveau {level} !",
        "free_craft_success_toast": "🍀 Chance ! Fabrication gratuite grâce à votre talent !",
        "missing_cost": "Coût manquant: {missingResources}",
        "craft_success_toast": "Vous avez fabriqué : {itemName} !",
        "village": {
            "cook_locked": "Vous devez atteindre le niveau 15 pour accéder à la cuisine.",
            "bounty_master_locked": "Vous devez terminer une prime de difficulté 'Moyen' ou supérieure pour débloquer."
        },
        "cook": {
            "not_enough_ingredients": "Vous n'avez pas assez d'ingrédients !",
            "craft_success": "Vous avez cuisiné : {itemName} ! Retrouvez-le dans votre inventaire."
        },
        "merchant": {
            "buy_fragments_success": "Achat réussi : +{quantity} 💠 Fragment(s)",
            "exchange_min_amount": "Vous devez échanger au moins 10 ressources.",
            "exchange_same_resource": "Vous ne pouvez pas échanger une ressource contre elle-même.",
            "exchange_not_enough": "Vous n'avez pas assez de {resourceName}.",
            "exchange_success": "Échange réussi : +{amountGained} {resourceName}"
        },
        "bug_report": {
            "save_generation_error": "Erreur lors de la génération de la sauvegarde."
        },
        "bounty": {
            "no_tokens": "Vous n'avez pas de jetons de prime.",
            "use_token_confirm": "Voulez-vous utiliser 1 Jeton pour rafraîchir les primes ?",
            "refresh_success": "Les primes ont été actualisées !",
            "start_busy": "Vous ne pouvez pas faire ça maintenant, vous êtes occupé ou vous vous reposez !",
            "start_confirm": "Lancer la chasse pour <strong>{bountyName}</strong> ?<br><br>Ceci est un combat direct, sans possibilité de fuite.",
            "master_unlocked": "Vous avez prouvé votre valeur ! Le Maître Chasseur vous accorde désormais son attention.",
            "completed_title": "Prime Terminée !",
            "completed_desc": "Vous avez vaincu {bountyName} et recevez votre récompense :<br>{rewardText}",
            "buy_set_item_success": "Vous avez acheté : {itemName} !",
            "not_enough_marks": "Pas assez de Marques du Chasseur !",
            "knowledge_too_low": "Votre connaissance du monde est insuffisante pour acquérir un objet de rareté {rarityName}. Progressez dans la constellation du Destin pour le débloquer."
        },
        "reset": {
            "confirm_body": "Êtes-vous absolument sûr de vouloir réinitialiser votre progression ?<br><br><strong>Toute votre sauvegarde sera définitivement perdue.</strong>",
            "online_warning": "<p class=\"online-warning\">ATTENTION : Vous êtes connecté. Cette action effacera également votre sauvegarde en ligne de manière irréversible.</p>"
        },
        "ascension": {
            "unlocked": "L'Ascension !",
            "success": "Vous avez transcendé ! Vous êtes maintenant au niveau d'Ascension {newAscensionLevel} et avez gagné {totalPoints} Points de Constellation.",
            "level_required": "Vous devez atteindre le niveau 50 pour débloquer l'Ascension.",
            "reincarnation_success": "Vous vous réincarnez en tant que {className} !"
        },
        "constellation": {
            "max_level": "Niveau maximum déjà atteint.",
            "not_enough_pc": "Pas assez de Points de Constellation.",
            "dependency_not_met": "Vous devez débloquer le talent précédent d'abord.",
            "unlock_success": "Talent \"{talentName}\" niveau {level} débloqué !",
            "unspent_points_confirm": "Vous avez encore des points à dépenser dans le(s) arbre(s) suivant(s) :<br><strong>{trees}</strong>.<br><br>Voulez-vous vraiment quitter ?"
        },
        "reroll": {
            "not_enough_fragments": "Pas assez de fragments ! Coût : {cost} 💠",
            "no_traits_left": "Aucun autre trait disponible à tirer !"
        },
        "traits": {
            "new_card_collected": "Nouvelle carte ajoutée à votre collection : {cardName} !",
            "trait_acquired_title": "Nouveau Trait Acquis !",
            "trait_acquired_desc": "Vous avez choisi : {traitName}"
        },
        "death": {
            "life_regained": "Vous avez récupéré une vie ! ({count} vies restantes)",
            "life_used": "Vous avez utilisé une vie pour revenir plus vite au combat.",
            "bypass_confirm": "Voulez-vous dépenser {cost} Éclats d'Ascension pour vous relever immédiatement ?",
            "bypass_success": "Vous vous sentez revigoré ! La pénalité de repos a été annulée.",
            "bypass_confirm": "Voulez-vous dépenser {cost} Éclats d'Ascension pour vous relever immédiatement ?",
            "bypass_success": "Vous vous sentez revigoré ! La pénalité de repos a été annulée."
        },
    },
    
    "ui": {
        "guild_member_actions": { // NOUVEAU BLOC
            "modal_title": "Actions pour {memberName}",
            "add_friend": "Ajouter en ami",
            "chat": "Message privé",
            "manage_rank": "Gérer le rang",
            "rank_modal_title": "Changer le rang de {memberName}",
            "confirm_rank_change": "Voulez-vous vraiment changer le rang de {memberName} en {newRankName} ?",
            "leader_transfer_confirm": "Vous êtes sur le point de transférer le commandement de la guilde à {memberName}.<br><br>Vous deviendrez Officier et cette action est <strong>IRRÉVERSIBLE</strong>.<br><br>Êtes-vous absolument sûr ?",
            "rank_change_success": "Le rang de {memberName} a été mis à jour.",
            "rank_change_error": "Erreur lors du changement de rang : {error}",
            "cannot_change_own_rank": "Vous ne pouvez pas changer votre propre rang.",
            "expel_button": "Expulser le joueur",
            "expel_confirm": "Êtes-vous sûr de vouloir expulser {memberName} de la guilde ? Cette action est définitive.",
            "expel_success": "{memberName} a été expulsé(e) de la guilde.",
            "expel_error": "Erreur lors de l'expulsion : {error}",
        },
        "guild": { // NOUVEAU BLOC
            "menu_title": "🛡️ Guilde",
            "confirm_creation_button": "Confirmer la Création",
            "find_wip": "La recherche de guilde est maintenant disponible !", // Modifié
            "search_placeholder": "Rechercher par nom ou tag...", // Ajouté
            "search_button": "Rechercher", // Ajouté
            "join_button": "Rejoindre", // Ajouté
            "back_button": "Retour", // Ajouté
            "no_results": "Aucune guilde ne correspond à votre recherche.", // Ajouté
            "is_full": "Pleine",
            "contribution_title": "Contribuer à la Guilde",
            "modal_title_my_guild": "Ma Guilde",
            "modal_title_find": "Rejoindre une Guilde",
            "modal_title_create": "Créer une Guilde",
            "no_guild_text": "Vous n'appartenez à aucune guilde. Que souhaitez-vous faire ?",
            "create_button": "Créer une Guilde",
            "find_button": "Chercher une Guilde",
            "leave_button": "Quitter la Guilde",
            "name_label": "Nom de la Guilde (3-20 caractères)",
            "tag_label": "Tag (3-4 caractères)",
            "create_cost": "Coût de création : {cost} <img src=\"assets/sprites/ressources/eclats_ascension.png\" class=\"icon-sprite-small\">",
            "level": "Niveau {level}",
            "members": "Membres ({count}/{max})",
            "xp_progress": "Expérience",
            "xp_details": "{currentXP} / {requiredXP} EXP", // NOUVELLE LIGNE
            "tab_guild": "Guilde",
            "tab_members": "Membres",
            "tab_chat": "Chat",
            "contribute_button": "Contribuer",
            "contribution_modal_title": "Faire un Don à la Guilde",
            "contribution_charges_label": "Dons disponibles : {count} / {max}",
            "contribution_next_charge_label": "Prochain don dans : {time}",
            "contribution_info": "Chaque don coûte {cost} ressources et rapporte {xp} EXP à la guilde. Vous gagnez {currency} Marque de Guilde par don.",
            "contribution_desc": "Donnez des ressources pour faire gagner de l'expérience à votre guilde. 1 ressource = 1 EXP.",
            "contribute_wood": "Bois",
            "contribute_metal": "Métal",
            "contribute_cloth": "Tissu",
            "guild_chat": "Chat de Guilde",
            "guild_boss": "Boss de Guilde",
            "guild_shop": "Boutique de Guilde",
            "manage_button": "Gérer",
            "manage_permissions_title": "Gérer les Permissions",
            "rank_R0": "Chef",
            "rank_R1": "Officiers",
            "rank_R2": "Membres",
            "rank_R3": "Nouveaux",
            "power_score_abbr": "Puissance",
            "ascension_level_abbr": "Asc.",
            "permission_canInvite": "Inviter des membres",
            "permission_canKick": "Expulser des membres",
            "permission_canEditRanks": "Gérer les rangs",
            "permission_canEditGuildInfo": "Modifier les infos",
            "permission_use_guild_money": "Utiliser la banque de guilde",
            "members_header_title": "Membres de la Guilde ({current}/{max})",
            "power_score_abbr": "Puissance", // NOUVEAU
            "ascension_level_abbr": "Asc.",
            "guild_logs": "Journal de Guilde", // Nouvelle clé
            "logs_modal_title": "Journal de la Guilde",
            "tab_boss": "Boss", // NOUVELLE LIGNE
            "boss_unlock_level": "Débloqué au niveau {level} de guilde",
            "no_active_boss": "Aucun boss de guilde n'est actuellement actif.",
            "start_boss_fight": "Lancer le combat contre le Boss",
            "permission_canManageBoss": "Gérer les boss de guilde",
        },
        "guild_boss": { // NOUVEAU BLOC COMPLET
            "title": "Boss de Guilde",
            "time_remaining": "Temps restant : {time}",
            "total_damage": "Dégâts totaux de la guilde :",
            "attack_button": "Attaquer",
            "attempts_left": "Tentatives restantes : {count}",
            "your_best_damage": "Votre meilleur score : {damage}",
            "leaderboard_title": "Classement des Dégâts",
            "rank": "Rang",
            "member": "Membre",
            "damage": "Dégâts",
            "end_in_progress": "Le combat se termine, calcul des récompenses...",
            "boss_defeated": "Boss Vaincu !",
            "fight_failed": "Le temps est écoulé ! Le boss s'est échappé.",
            "rewards_button": "Voir les Récompenses", // NOUVEAU
            "rewards_modal_title": "Récompenses des Boss de Guilde", // NOUVEAU
            "rewards_tab_common": "Récompenses Communes", // NOUVEAU
            "rewards_tab_ranking": "Récompenses de Classement", // NOUVEAU
            "rewards_for": "Récompenses pour {bossName}", // NOUVEAU
            "all_participants": "Tous les participants (si vaincu)", // NOUVEAU
            "rank_1": "1ère Place",
            "rank_2": "2ème Place",
            "rank_3": "3ème Place",
            "rank_4": "4ème - 5ème Place", // NOUVEAU
            "rank_5": "6ème - 10ème Place", // NOUVEAU
            "attack_button_extra_cost": "Attaquer ({cost} EA)", // NOUVEAU
            "max_attempts_reached": "Tentatives max"
        },
        "guild_logs": { // Nouvel objet
            "joined": "{memberName} a rejoint la guilde.",
            "left": "{actorName} a quitté la guilde.",
            "expelled": "{actorName} a expulsé {targetName}.",
            "rank_changed": "{actorName} a changé le rang de {targetName} en {newRankName}.",
            "loading": "Chargement des événements...",
            "empty": "Aucun événement enregistré pour le moment."
        },
        "alerts": {
            "guild": {
                "confirm_create": "Voulez-vous vraiment dépenser {cost} Éclats d'Ascension pour créer la guilde \"{name}\" [{tag}] ?",
                "not_enough_ea": "Vous n'avez pas assez d'Éclats d'Ascension !",
                "name_too_short": "Le nom de la guilde doit faire au moins 3 caractères.",
                "tag_invalid": "Le tag doit faire entre 3 et 4 caractères.",
                "creation_success": "Guilde \"{name}\" créée avec succès !",
                "already_in_guild": "Vous êtes déjà dans une guilde.",
                "name_taken": "Ce nom de guilde est déjà pris.",
                "tag_taken": "Ce tag de guilde est déjà pris.",
                "creation_failed": "Erreur lors de la création de la guilde : {error}",
                "confirm_join": "Voulez-vous vraiment rejoindre la guilde \"{guildName}\" ?", // Ajouté
                "join_success": "Vous avez rejoint la guilde {guildName} !", // Ajouté
                "join_failed": "Impossible de rejoindre la guilde : {error}", // Ajouté
                "is_full": "Cette guilde est pleine.", // Ajouté
                "contribution_success": "Merci ! Votre guilde gagne {amount} EXP.",
                "contribution_failed": "Le don a échoué : {error}", // NOUVELLE LIGNE
                "invalid_contribution_amount": "Veuillez entrer un montant valide supérieur à zéro.",
                "not_enough_charges": "Vous n'avez plus de dons disponibles. Attendez qu'ils se rechargent.",
                "contribution_level_up": "Votre guilde passe au niveau {level} !",
                "leave_confirm": "Êtes-vous sûr de vouloir quitter la guilde \"{guildName}\" ?",
                "delete_confirm": "Vous êtes le dernier membre et le chef. Quitter la guilde la supprimera définitivement. Êtes-vous sûr ?",
                "leader_cant_leave": "Vous ne pouvez pas quitter la guilde car vous en êtes le chef. Vous devez d'abord nommer un successeur.",
                "leave_success": "Vous avez quitté la guilde.",
                "delete_success": "La guilde a été dissoute.",
                "leave_error": "Une erreur est survenue en quittant la guilde.",
                "leave_confirm_generic": "Êtes-vous sûr de vouloir quitter la guilde {guildName} ?",
                "leader_leave_error": "En tant que chef, vous ne pouvez pas abandonner votre guilde tant qu'elle a des membres. Transférez le commandement ou soyez le dernier à partir.",
                "leader_demote_error": "Le chef ne peut pas être rétrogradé. Transférez d'abord le commandement à un Officier.",
                "no_permission_manage_ranks": "Vous n'avez pas la permission de gérer les rangs.",
                "disband_success": "Vous avez dissous la guilde.",
                "contribution_in_progress": "Contribution en cours, veuillez patienter...",
                "permissions_saved": "Permissions sauvegardées avec succès!", // Clé ajoutée
                "permissions_save_error": "Erreur lors de la sauvegarde : {error}", // Clé ajoutée
                "expelled": "Vous avez été expulsé de la guilde.",
                "confirm_buy_guild_boost": "Voulez-vous dépenser {cost} Marques de la banque de guilde pour activer le boost '{boostName}' pour tous les membres ?",
                "not_enough_guild_marks": "La banque de la guilde ne possède pas assez de Marques.",
                "no_permission_buy_boost": "Vous n'avez pas la permission d'utiliser la banque de la guilde.",
                "confirm_buy_personal": "Voulez-vous dépenser {cost} Marques de Guilde pour acheter '{itemName}' ?",
                "buy_success": "Achat réussi : {itemName} !",
                "item_already_owned": "Vous possédez déjà cet objet.",
                "boss_start_confirm": "Voulez-vous vraiment invoquer le boss '{bossName}' ?\nTous les membres auront 24h pour l'attaquer.",
                "boss_already_active": "Un boss de guilde est déjà actif !",
                "no_permission_start_boss": "Vous n'avez pas la permission de lancer un combat de boss.",
                "guild_level_too_low": "Votre guilde doit être au moins niveau {level} pour lancer ce combat.",
                "no_attempts_left": "Vous avez déjà utilisé vos deux tentatives contre ce boss.",
                "boss_attack_confirm": "Vous allez utiliser une de vos deux tentatives pour attaquer le boss. Êtes-vous sûr ?",
                "confirm_extra_attack": "Vous avez déjà utilisé vos 2 attaques gratuites. Voulez-vous dépenser {cost} Éclats d'Ascension pour une attaque supplémentaire ?", // NOUVEAU
                "max_attempts_error": "Vous avez atteint le nombre maximum d'attaques pour ce boss." // NOUVEAU
            }
        },
        "lives": { // Nouvel objet
            "next_in": "(+1 dans {minutes}:{seconds})"
        },
        "lives_modal": {
            "title": "Gestion des Vies",
            "current_lives": "Vies actuelles : {count} / {max}",
            "next_life_in": "Prochaine vie dans : {minutes}:{seconds}",
            "lives_at_max": "Vos vies sont au maximum.",
            "buy_one_life_desc": "Restaurez une vie pour continuer l'aventure.",
            "buy_one_life_button": "Acheter 1 Vie ({cost} <img src='assets/sprites/ressources/eclats_ascension.png' class='icon-sprite-small'>)",
            "buy_max_lives_button": "Augmenter le max (+1) ({cost} <img src='assets/sprites/ressources/eclats_ascension.png' class='icon-sprite-small'>)",
            "confirm_buy_one": "Voulez-vous dépenser {cost} Éclats d'Ascension pour acheter une vie ?",
            "confirm_buy_max": "Voulez-vous dépenser {cost} Éclats d'Ascension pour augmenter votre maximum de vies de 1 ?",
            "buy_one_success": "Vous avez acheté une vie !",
            "buy_max_success": "Votre maximum de vies a été augmenté !",
            "buy_max_lives_limit_reached": "Vous avez atteint la limite d'achats pour cette amélioration.",
            "already_at_max": "Vos vies sont déjà au maximum !"
        },
        "stamina": {
            "full": "(Max)"
        },
        "options": { // Objet manquant
            "general": {
                "title": "Général",
                "language_label": "Langue :"
            }
        },
        "unlock_prompts": {
            "expeditions": "Débloqué via l'Aventure.",
            "patrol": "Débloqué via la Constellation du Destin.",
            "dungeon": "Débloqué via l'Aventure (Acte 4).",
            "village": "Débloqué via l'Aventure (Acte 1).",
            "fief": "Débloqué via l'Aventure (Acte 1).",
            "enchanter": "Requiert Forge Niv. 3 et déblocage via l'Aventure.",
            "alchemist": "Débloqué via l'Aventure (Acte 1).",
            "cook": "Requiert Niveau 15 et déblocage via l'Aventure.",
            "bounties": "Débloqué via l'Aventure (Acte 2)."
        },
        "item_details": {
            "quantity": "Quantité",
            "description": "Description",
            "stats": "Statistiques",
            "bonus": "Bonus",
            "resource_desc": "Une ressource de base utilisée pour l'artisanat et les améliorations."
        },
        "inventory_modal": {
            "title": "Full Inventory",
            "tab_resources": "Resources",
            "tab_consumables": "Consumables",
            "tab_equipment": "Equipment",
            "sort_by": "Sort by:",
            "sort_logical": "Logical",
            "sort_alpha": "Alphabetical",
            "sort_quantity_desc": "Quantity (Descending)",
            "sort_quantity_asc": "Quantity (Ascending)",
            "sort_rarity": "Rarity",
            "sort_type": "Type"
        },
        "shop": {
            "title": "Boutique",
            "premium_currency_title": "Éclats d'Ascension",
            "upgrades_title": "Améliorations",
            "ad_premium_reward": "+5 Éclats d'Ascension",
            "free_rewards_title": "Récompenses Gratuites",
            "watch_ad_button": "Regarder",
            "packs_title": "Packs", // AJOUTEZ CETTE LIGNE
            "pack_starter_title": "Pack de Démarrage", // AJOUTEZ CETTE LIGNE
            "pack_starter_description": "Un coup de pouce parfait pour commencer votre Ascension !\n\nContenu :\n- 300 Éclats d'Ascension\n- 5 000 Fragments\n- 10 000 de chaque ressource de base (Bois, Métal, Tissu)\n- 5 Clés de la Brèche", // AJOUTEZ CETTE LIGNE
            "pack_monthly_title": "Bénédiction Mensuelle", // AJOUTEZ CETTE LIGNE
            "pack_monthly_description": "Un soutien quotidien pour les aventuriers dévoués.\n\nEffets :\n- Recevez instantanément 500 Éclats d'Ascension.\n- Recevez 50 Éclats d'Ascension supplémentaires chaque jour à votre première connexion pendant 30 jours.\n- Total : 2 000 Éclats d'Ascension !", // AJOUTEZ CETTE LIGNE
            "max_lives_pack_1": {
                "name": "Pack de Vies Max +1",
                "description": "Augmente votre maximum de vies de façon permanente."
            },
        },
        "loading_messages": [
            "Alignement des constellations...",
            "Polissage des fragments d'écho...",
            "Tissage des fils du destin...",
            "Consultation de l'oracle...",
            "Harmonisation de la Dissonance...",
            "Réveil des anciens souvenirs..."
        ],
        loading_language_change: "Changement de langue...",
        "adventure": {
            "act1":"Acte 1",
            "act2":"Acte 2",
            "act3":"Acte 3",
            "act4":"Acte 4",
            answer_placeholder: "Votre réponse...",
            dialogue_history_title: "Historique : {nodeName}",
        },
        "bug_report": {
            "status_sending": "Envoi en cours...",
            "status_success": "Rapport envoyé avec succès ! Merci.",
            "status_error": "Erreur lors de l'envoi. Veuillez réessayer.",
            "status_network_error": "Erreur réseau. Veuillez réessayer."
        },
        "app_title": "Ascencia - Le RPG Textuel",
        "creation": {
            "title": "Création du Personnage",
            "welcome_back": "Bonjour, <strong>{userName}</strong> ! Créez un nouveau personnage pour votre compte.",
            "welcome_guest": "Déjà un compte ? <button class=\"link-button\" onclick=\"signInWithGoogle()\">Connectez-vous</button> pour charger votre personnage.",
            "points_to_spend": "Points à dépenser :",
            "points_to_assign": "Points à attribuer :",
            "logout_button": "Se déconnecter",
            "name_label": "Nom du personnage :",
            "class_label": "Choisissez votre classe :",
            "guerrier_name": "Guerrier",
            "guerrier_desc": "Maître du combat rapproché, robuste et puissant. (Recommandé)",
            "archer_name": "Archer",
            "archer_desc": "Expert de l'arc, agile et précis à distance.",
            "mage_name": "Mage",
            "mage_desc": "Manipulateur des arcanes, capable de sorts dévastateurs.",
            "points_label": "Points à distribuer",
            "create_button": "Créer le personnage",
            "name_placeholder": "Entrez un nom...",
            "reset_stats_label": "Réinitialiser mes points de statistiques (recommandé)"
        },
        "main_menu": {
            "profile": "👤 Profil",
            "achievements": "🏆 Succès",
            "daily_missions": "📅 Missions",
            "mail_menu": "✉️ Messagerie",
            "leaderboard": "🏆 Leaderboard",
            "statistics": "📜 Statistiques",
            "inventory": "🎒 Inventaire",
            "shop": "💰 Boutique",
            "login": "Connexion",
            "logout": "Déconnexion",
            "options": "⚙️ Options",
            "patch_notes": "📝 Patch Note",
            "reset_s": "⚠️ Réinitialiser",
            "bug_report_s": "🐛 Bug Report"
        },
        "mail": {
            "modal_title": "Messagerie",
            "delete_read_button": "Supprimer lus",
            "back_button": "Retour",
            "sender_label": "De :",
            "attachments_label": "Pièces jointes :",
            "claim_all": "Tout récupérer",
            "rewards_claimed": "Récompenses récupérées",
            "no_messages": "Votre boîte de réception est vide.",
            "no_deletable_messages": "Aucun message lu à supprimer.",
            "delete_success": "{count} message(s) supprimé(s).",
            "delete_confirm": "Voulez-vous vraiment supprimer tous les messages lus et sans récompenses ?",
            "claim_success": "Récompenses ajoutées à votre inventaire !",
            "notification_badge_title": "Nouveaux messages"
        },
        "daily_missions": {
            "modal_title": "Missions Journalières",
            "modal_description": "Terminez tous les objectifs quotidiens pour recevoir une récompense spéciale ! La progression est réinitialisée chaque jour à minuit.",
            "progress_label": "{current}/{target}",
            "reward_label": "Récompense Finale :",
            "claim_button": "Récupérer la Récompense",
            "all_missions_complete": "Terminez tous les objectifs pour récupérer la récompense.",
            "already_claimed": "Récompense déjà récupérée aujourd'hui. Revenez demain !",
            "notification_title": "Missions Quotidiennes",
            "notification_body": "Vos objectifs quotidiens ont été réinitialisés !"
        },
        "profile": { // NOUVEAU BLOC
            "title": "Mon Profil",
            "change_avatar": "Changer l'avatar",
            "upload_limits": "Taille max : 1Mo. Formats : JPG, PNG, WEBP.",
            "cooldown_active": "Prochain changement possible dans : {time}",
            "bypass_cooldown": "Passer pour {cost} Éclats ?",
            "frames_title": "Mes Cadres",
            "confirm_bypass": "Voulez-vous dépenser {cost} Éclats d'Ascension pour changer votre avatar maintenant ?",
            "upload_success": "Avatar mis à jour !",
            "upload_error": "Erreur lors de l'envoi : {error}",
            "upload_invalid_type": "Type de fichier invalide. Veuillez choisir une image.",
            "upload_too_large": "Le fichier est trop volumineux (max 1Mo).",
            "not_enough_shards": "Pas assez d'Éclats d'Ascension.",
            "public_title": "Profil de {playerName}",
            "level_display": "Niveau {level} (Ascension {ascLvl})",
            "manage_frames": "Gérer les cadres",
            "bypass_confirm_title": "Passer le temps d'attente ?",
            "bypass_confirm_body": "Prochain changement possible dans : {time}.<br><br>Voulez-vous dépenser {cost} Éclats d'Ascension pour passer ce délai ?",
            "bypass_button_label": "Passer ({cost} Éclats)",
            "bypass_success": "Temps d'attente annulé ! Vous pouvez maintenant changer votre avatar."
        },
        "frames_modal": { // NOUVEAU BLOC
            "title": "Choisir un Cadre",
            "select_button": "Équiper",
            "status_owned": "Possédé",
            "unlock_supporter": "Acheter n'importe quel pack dans la boutique.",
            "unlock_ascended_master": "Atteindre l'Ascension 10."
        },
        "report_player": { // NOUVEAU BLOC
            "title": "Signaler un Joueur",
            "button_text": "Report",
            "reason_label": "Raison du signalement :",
            "reasons": {
                "name": "Nom d'utilisateur inapproprié",
                "avatar": "Image de profil inappropriée",
                "other": "Autre (précisez ci-dessous)"
            },
            "details_label": "Détails (optionnel) :",
            "details_placeholder": "Donnez plus de contexte si nécessaire...",
            "submit_button": "Envoyer le Signalement",
            "status_sending": "Envoi...",
            "status_success": "Signalement envoyé. Merci.",
            "status_error": "Erreur lors de l'envoi."
        },
        "main_actions": {
            "fief_button": "🏰 Aller au Fief",
            "ascension_button": "⭐ Ascension",
            "return_to_game": "Retourner au jeu"
        },
        "panels": {
            "attributes": "Attributs",
            "detailed_stats": "Statistiques Détaillées",
            "tabs": {
                "combat": "Combat",
                "global": "Global",
                "traits": "Traits"
            },
            "equipment": "Équipement",
            "inventory": "Inventaire",
            "rare_components": "Composants Rares",
            "consumables": "Consommables",
            "bottom_tabs": {
               'character': '👤 Profil',
               'personnage': '👤 Personnage',
                "village": "🏡 Village",
                "codex": "📖 Codex",
                "mastery": "🏆 Maîtrise",
                "social": "🤝 Social",
            }
        },
        "chat": { // NOUVEAU BLOC
            "title": "Messagerie",
            "tab_guild": "Guilde",
            "tab_private": "Privés",
            "placeholder_guild": "Envoyer un message à la guilde...",
            "placeholder_private": "Écrire un message...",
            "send_button": "Envoyer",
            "no_conversations": "Vous n'avez aucune conversation privée pour le moment.",
            "start_conversation_prompt": "Commencez une discussion depuis le profil d'un joueur ou la liste des membres de guilde.",
            "loading_chat": "Chargement des messages...",
            "chat_disabled": "Le chat est désactivé.",
            "chat_disabled": "Le chat est désactivé.",
            "cooldown": "Veuillez attendre 5 secondes entre chaque message." // Ajout de cette ligne
        },
        "death": {
            "title": "Vous êtes à bout de forces !",
            "description": "On vous a ramené au village le plus proche pour vous reposer.",
            "timer_label": "Temps de repos restant",
            "description_options": "Choisissez une option pour continuer ou attendez la fin du compte à rebours.",
            "no_lives_info": "Plus de vies disponibles. Prochaine dans : {minutes}:{seconds}",
        },
        "expeditions": {
            "tabs": {
                "aventure": "📜 Aventure",
                "expeditions": "🗺️ Expéditions",
                "patrol": "⏳ Patrouille (AFK)",
                "dungeon": "🌀 Donjon"
            },
            "available_expeditions": "Expéditions disponibles",
            "refresh_button": "Actualiser",
            "boss_button": "Affronter le Boss!"
        },
        "combat": {
            "title": "Combat en cours !",
            "round_label": "Tour",
            "player_hp": "Vos PV:",
            "player_mana": "Votre Mana:",
            "tabs": {
                "skills": "Compétences",
                "consumables": "Consommables"
            },
            "flee_button": "Fuite (Perte de ressources et XP)"
        },
        "village": {
            "district_artisans": "Quartier des Artisans",
            "district_merchants": "Quartier Commerçant",
            "district_mystic": "Quartier Mystique",
            "buildings": {
                "forge": "🔥 Forge",
                "enchanter": "✨ Enchanteur",
                "alchemist": "🧪 Alchimiste",
                "cook": "🍳 Cuisinier",
                "merchant": "💰 Marchand",
                "bounty_master": "⚔️ Maître Chasseur",
                "bounties": "🎯 Primes",
                "oracle": "🔮 Oracle",
                "upgrade_complete_toast": "{buildingName} (Niv. {level}) terminé !"
            }
        },
        "cook": {
            "bonus_label": "Bonus :",
            "combats_unit": "combats",
            "cost_label": "Coût:",
            "cook_button": "Cuisiner",
            "title": "Cuisine du Fief",
            "description": "Préparez des plats qui octroient des bonus temporaires pour vos prochains combats."
        },
        "oracle": {
            "collection_label": "Collection :",
            "bonus_label": "Bonus :",
            "no_families_started": "Aucune famille de cartes commencée. Obtenez votre première carte lors de votre prochaine sélection de trait !",
            "missing_card_alt": "Carte manquante",
            "missing_card_text": "Manquante",
            "title": "Sanctuaire de l'Oracle",
            "description": "Consultez votre collection de Cartes du Destin et les bonus de famille que vous avez débloqués.",
            "families_title": "Familles de Cartes"
        },
        "mastery": {
            "tier_header": "Palier {tierName} ({kills} tués)",
            "enemies_label": "ennemis",
            "reward_label": "Récompense :",
            "title": "Paliers de Maîtrise du Codex",
            "description": "Atteignez des paliers de maîtrise sur différents ennemis pour débloquer des bonus globaux permanents.",
            "active_bonuses": "Bonus Actifs",
            "milestones_progress": "Progression des Paliers"
        },
        "modals": {
            "options_title": "Exporter la Sauvegarde",
            "options_desc": "Utilisez cette option pour copier votre progression actuelle. Conservez ce code en lieu sûr pour pouvoir le réimporter plus tard ou sur un autre appareil.",
            "options_export_placeholder": "Cliquez sur 'Exporter' pour générer votre code de sauvegarde...",
            "options_export_button": "Exporter et Copier",
            "import_title": "Importer une Sauvegarde",
            "import_desc": "Collez un code de sauvegarde valide dans le champ ci-dessous. Attention, cela écrasera votre partie actuelle sans avertissement.",
            "import_placeholder": "Collez votre code de sauvegarde ici...",
            "import_button": "Importer la partie",
            "reset_title": "Réinitialiser le jeu",
            "reset_desc": "L'action ci-dessous est irréversible et entraînera la perte totale de votre progression.",
            "erase_progress_title": "Effacer la progression",
            "erase_progress_desc": "Cette action effacera complètement votre personnage, votre inventaire et tous vos acquis. Vous recommencerez au tout début. <strong>Cette action est définitive.</strong>",
            "erase_progress_button": "Réinitialiser ma progression",
            "stats_title": "Statistiques de la partie",
            "leaderboard_title": "🏆 Classement des Champions",
            "leaderboard_tabs": {
                "power": "Puissance",
                "expeditions": "Expéditions",
                "bosses": "Boss Vaincus",
                "dungeon": "Donjon",
                "codex": "Codex",
                "xp": "XP Gagné"
            },
            "achievements_title": "🏆 Succès",
            "bug_report_title": "Signaler un Bug",
            "bug_category_label": "Catégorie du bug :",
            "bug_categories": {
                "display": "Interface / Affichage",
                "combat": "Combat",
                "expedition": "Expédition / Événement",
                "save": "Sauvegarde",
                "other": "Autre"
            },
            "bug_desc_label": "Description du bug :",
            "bug_desc_placeholder": "Veuillez décrire le problème le plus précisément possible...",
            "bug_cancel_button": "Annuler",
            "bug_submit_button": "Envoyer le rapport",
            "class_choice_title": "Choisissez votre Voie !",
            "class_choice_desc": "Votre personnage a besoin de se spécialiser. Choisissez une classe pour continuer votre aventure. Ce choix est définitif !",
            "class_choice_guerrier_desc": "Leurs attaques dépendent de la <strong>Force</strong>.",
            "class_choice_archer_desc": "Leurs attaques dépendent de l'<strong>Agilité</strong>.",
            "class_choice_mage_desc": "Leurs sorts dépendent de l'<strong>Intelligence</strong> et consomment du <strong>Mana</strong>.",
            "constellation_pc": "PC:",
            "constellation_trees": {
                "destiny": "Destin",
                "guerrier": "Guerrier",
                "archer": "Archer",
                "mage": "Mage"
            },
            "infobox_title": "Observatoire Astral",
            "infobox_desc": "Cliquez sur une constellation pour afficher ses détails ici.",
            "trait_choice_title": "Le Destin vous Propose un Choix",
            "trait_choice_desc": "Choisissez un trait qui façonnera votre Ascension. Ce choix est définitif.",
            "trait_choice_confirm": "Confirmer le Choix"
        },
        "footer": {
            "copyright": "&copy; 2025 Ascencia. Tous droits réservés.",
            "discord": "Rejoignez-nous !",
            "version": "Version 0.9.0 (Beta)",
            "contact": "Contact"
        },
        "achievement_notification_label": "Nouvelle récompense !",
        "no_achievements_in_category": "Aucun succès dans cette catégorie.",
        "achievement_claimed": "Succès Terminé",
        "claim_button": "Récupérer",
        "unlocked_bonuses_label": "Bonus déjà acquis :",
        "buttons": {
            "continue": "Continuer",
            "back_to_districts": "← Retour aux Quartiers",
            "close": "Fermer",
            "confirm": "Confirmer la classe",
            "confirm_generic": "Confirmer",
            "close": "Fermer",
            "back_to_selection": "← Retour à la sélection",
            "ascend": "Ascension !",
            "maxed_out": "Maximisé",
            "not_enough_pc": "PC Insuffisants",
            "confirm_path": "Confirmer la Voie",
            "reroll": "↺ Relancer",
            "flip": "⇆ Retourner",
            "confirm_choice": "Confirmer le Choix",
            "collect": "Récolter",
            "build": "Construire",
            "uproot": "Arracher",
            "harvest": "Récolter",
            "plant": "Planter",
            "cancel": "Annuler",
            "flee": "Fuir",
            "stay": "Rester",
            "enter": "Entrer",
            "buy": "Acheter",
            "sell": "Vendre",
            "leave":"Quitter",
            "submit":"Soumettre",
            "build": "Construire",
            "upgrade": "Améliorer",
            "bypass_death_penalty": "Passer ({cost} {ea_icon})",  
            "revive_with_life": "Utiliser une vie ({count})",
            "revive_with_ad": "Pub Gratuite ({count}/3)",
            "bypass_death_penalty": "Passer ({cost} {ea_icon})",
            "save_changes": "Sauvegarder",
        },
        "items": {
            "special": {
                "fragment_bundle": "Lot de Fragments",
                "fragment_bundle_info": "Contient {amount} fragments"
            }
        },
        "traits": {
            "missing_image_alt": "Image manquante",
            "family_label": "Famille :",
            "selection_modal_title": "Le Destin vous Propose un Choix",
            "selection_modal_desc": "Choisissez un trait qui façonnera votre Ascension. Ce choix est définitif.",
            "no_traits_acquired": "Aucun trait acquis pour cette Ascension.",
            "active_traits_title": "Traits Actifs",
            "trait_prefix": "Trait : "
        },
        "fief": {
            "title": "Votre Fief",
            "description": "Gérez et améliorez votre domaine pour obtenir des bonus et des ressources passives.",
            "special_resources_title": "Vos Ressources Rares",
            "buildings_title": "Bâtiments du Domaine",
            "garden_title": "Le Jardin Évolutif",
            "garden_wip": "Le système de jardin est en cours de développement...",
            "seeds_title": "Vos Graines",
            "resources_title": "Vos Ressources",
            "buildings_title": "Bâtiments du Domaine",
            "infirmary_penalty_reduction": "Réduction pénalité :",
            "infirmary_production": "Produit : {amount} Baume / {hours}",
            "infirmary_next_balm": "Prochain baume dans :",
            "warehouse_capacity": "Capacité actuelle :",
            "stock_label": "Stock",
            "full_in_timer": "Plein dans :",
            "level_indicator": "(Niv. {currentLevel})",
            "build_prompt": "Construisez ce bâtiment pour commencer à en profiter.",
            "next_level_label": "Au niveau suivant :",
            "next_level_penalty": "→ Réduction pénalité : {reduction}",
            "next_level_production": "→ Production : {amount} Baume / {hours}",
            "next_level_capacity": "Niveau suivant : {capacity}",
            "current_production_per_hour": "Production actuelle : {production} / heure",
            "next_level_production_per_hour": "Niveau suivant : {production} / heure",
            "not_built_yet": "Ce bâtiment n'est pas encore construit.",
            "status_full": "Plein !",
            "status_calculating": "Calcul...",
            "tabs": {
                "buildings": "Bâtiments",
                "garden": "Jardin"
            },
            "under_construction": "En construction",
            "construction_time_left": "Temps restant :",
            "upgrade_complete_toast": "{buildingName} (Niv. {level}) terminé !",
            "speed_up_button": "Accélérer ({cost} {ea_icon})",
            "speed_up_confirm_body": "Voulez-vous dépenser <strong>{cost} Éclats d'Ascension</strong> pour terminer instantanément l'amélioration de <strong>{buildingName}</strong> ?",
            "not_enough_ea": "Pas assez d'Éclats d'Ascension !",
            "upgrade_confirm_title": "Confirmer l'amélioration",
            "upgrade_confirm_body": "Voulez-vous vraiment améliorer <strong>{buildingName}</strong> au niveau <strong>{level}</strong> ?<br><br><strong>Coût :</strong> {cost}<br><strong>Durée :</strong> {duration}"
        },
        "garden": {
            "current_season": "Saison actuelle : {seasonName}",
            "season_change_timer": "Change dans {days}j {hours}h",
            "tier_goal_1": "Jardin 2x2. Prochain objectif : Débloquer une plante de <strong>Tier 1</strong>.",
            "tier_goal_2": "Jardin 2x3. Prochain objectif : Débloquer une plante de <strong>Tier 2</strong>.",
            "tier_goal_3": "Jardin 3x3. Prochain objectif : Débloquer une plante de <strong>Tier 3</strong>.",
            "tier_goal_max": "Jardin 4x4. Taille maximale atteinte !",
            "status_ready": "Prêt !",
            "empty_plot": "Parcelle vide",
            "your_seeds_title": "Vos Graines",
            "no_seeds": "Aucune graine. Explorez le monde !",
            "seed_select_title": "Choisir une graine",
            "seed_select_prompt": "Quelle graine voulez-vous planter ?",
            "seed_owned": "Possédées : {count}",
            "growth_time": "Temps de croissance :",
            "harvest_yield": "Récolte :",
            "acquisition_method": "Obtention :",
            "synergy_acquisition_title": "Obtention par Synergie :",
            "undiscovered_ingredient": "Ingrédient non découvert",
            "any_plant_of_type": "N'importe quelle plante de type '{type}'",
            "during_season": "Pendant la saison : {seasonName}",
            "transmutation_pending": "Transmutation en cours !",
            "transmutation_confirm": "Accepter la nouvelle plante ?",
            "confirm_yes": "Oui",
            "confirm_no": "Non"
        },
        "units": {
            "hours": "heure(s)"
        },
        "ascension": {
            "confirm_title": "⭐ Confirmer l'Ascension ? ⭐",
            "irreversible_warning": "Cette action est <strong>IRRÉVERSIBLE</strong>.",
            "gains_title": "Vous allez GAGNER :",
            "gain_level": "Accès au niveau d'Ascension {newAscensionLevel}",
            "gain_cap": "Nouveau cap de niveau : {newMaxLevel}",
            "gain_bonus": "Bonus permanent de <strong>+5%</strong> à vos attributs de base",
            "gain_difficulty": "Difficulté globale du jeu augmentée à {difficultyIncrease}",
            "pc_distribution_title": "Répartition des Points de Constellation :",
            "pc_source_level": "PC de Niveau (Niv. {level}) : {reward}",
            "pc_source_resources": "PC (Ressources converties) : {reward}",
            "pc_source_fragments": "PC (Fragments convertis) : {reward}",
            "pc_source_dungeon": "PC (Record Donjon) : {reward}",
            "pc_total": "Total pour cette Ascension : {total}",
            "pc_destiny": "Points de Constellation (Destin) : {points}",
            "pc_vocation": "Points de Vocation ({playerClass}) : {points}",
            "losses_title": "Vous allez PERDRE :",
            "loss_level": "Votre niveau actuel (retour au niveau 1)",
            "loss_xp_stats": "Votre expérience et vos points de stats attribués",
            "loss_inventory": "Votre inventaire, équipement et <strong>TOUTES</strong> vos ressources",
            "keeps_title": "Vous allez CONSERVER :",
            "keep_adventure": "Votre progression dans l'Aventure",
            "keep_codex": "Votre progression du Codex et de vos Succès",
            "keep_constellations": "Vos Points de Constellation et talents déjà débloqués",
            "keep_fiefs": "Vos Niveaux de bâtiments dans le Fief",
            "keep_destin": "Vos Cartes du Destin déjà débloquées",
            "class_choice_title": "Votre Voie se Redessine",
            "class_choice_desc": "Votre Ascension vous offre une nouvelle perspective. Choisissez la classe que vous incarnerez dans cette nouvelle vie.<br>Vos 10 points de statistiques de départ seront réattribués.",
            "pc_source_bosses": "PC (Boss vaincus) : {reward}",
        },
        "constellation": {
            "hidden_talent_title": "???",
            "hidden_talent_desc": "Explorez la constellation pour révéler ce talent.",
            "bonus_label": "Bonus",
            "level_indicator": "(Niveau {currentLevel}/{maxLevel})",
            "max_level_reached": "Niveau maximum atteint",
            "upgrade_cost": "Coût Nv. {nextLevel}: {cost} PC"
        },
        "report": {
            "expedition_journal_title": "--- Journal d'expédition ---",
            "log_by_defeating": "en battant {enemyName}.",
            "log_on_enemy": "sur {enemyName}.",
            "log_item_drop_found_via": "Butin trouvé via {sourceName} !",
            "overqualified_penalty_title": "--- Pénalité de Sur-qualification ---",
            "overqualified_penalty_desc": "Vous êtes trop puissant. Récompenses réduites de {penalty}%.",
            "summary_title": "--- Bilan ---",
            "combat_xp": "XP de Combat",
            "bonus_label": "Bonus:",
            "verb_gained": "Gagné",
            "verb_lost": "Perdu",
            "loot_label": "Butin :",
            "no_gains": "Vous ne rapportez rien de cette expédition."
        },
        "bounty": {
            "board_title": "Tableau des Primes",
            "next_refresh_label": "Prochain renouvellement :",
            "board_description": "De nouvelles cibles apparaissent toutes les 8 heures. Utilisez un jeton pour les actualiser immédiatement.",
            "refresh_button_label": "Actualiser (1 🎯) - Vous avez {tokenCount}",
            "all_completed_title": "Félicitations !",
            "all_completed_desc": "Vous avez terminé toutes les primes disponibles. Revenez plus tard pour de nouveaux défis !",
            "reward_label": "Récompense :",
            "button_completed": "Terminée",
            "button_start": "Lancer",
            "next_refresh_label": "Prochain renouvellement dans :",
            "difficulties": {
                "facile": "Facile",
                "moyen": "Moyen",
                "difficile": "Difficile",
                "élite": "Élite"
            }
        },
        "bounty_master": {
            "title": "Objets d'Ensemble",
            "description": "Échangez vos Marques de Chasse contre de l'équipement puissant.",
            "filter_label": "Montrer les ensembles pour :",
            "filter_my_class": "Ma classe",
            "filter_all_classes": "Toutes les classes",
            "class_all": "Toutes les classes",
            "set_class_label": "Set de classe :",
            "pieces_label": "({count} pièces)"
        },
        "tooltip": {
            "item_header": "({itemType} - {rarityName})",
            "class_label": "Classe :",
            "modifiers_label": "Modificateurs :",
            "base_stats_label": "Statistiques de base :",
            "stats_none": "Aucune",
            "enchantment_label": "Enchantement [{affixName}] :",
            "set_label": "Set:",
            "details_for": "Détails pour {statName}",
            "total_label": "Total :",
            "no_description": "Aucune description disponible."
        },
        "leaderboard": {
            "description_powerScore": "Les personnages avec le plus haut score de Puissance.",
            "description_expeditionsStarted": "Les aventuriers les plus zélés.",
            "description_bossesKilled": "Les plus grands chasseurs de boss du royaume.",
            "description_dungeonHighestFloor": "Les explorateurs les plus chevronnés de la Brèche Instable.",
            "description_totalXpGained": "Les personnages ayant accumulé le plus d'expérience.",
            "description_codexScore": "Les érudits ayant le plus complété leur Codex.",
            "codex_score_rules_title": "Barème des points :",
            "codex_score_rule1": "+1 pt / ennemi découvert",
            "codex_score_rule2": "+5 pts / palier Novice (10+ tués)",
            "codex_score_rule3": "+15 pts / palier Confirmé (50+ tués)",
            "codex_score_rule4": "+30 pts / palier Expert (100+ tués)",
            "codex_score_rule5": "+50 pts / palier Maître (250+ tués)",
            "loading": "Chargement du top 10...",
            "empty": "Ce classement est encore vide.",
            "not_ranked_criteria": "Personne ne remplit les critères pour ce classement.",
            "label_powerScore": "Puissance",
            "label_expeditions": "Expéditions",
            "label_bossesKilled": "Boss Vaincus",
            "label_dungeonFloor": "Étage Max",
            "label_codexScore": "Score Codex",
            "label_totalXp": "XP Total",
            "player_level_abbr": "Niv. {level}",
            "searching_rank": "Recherche de votre classement...",
            "not_ranked": "Vous n'êtes pas encore classé dans cette catégorie.",
            "rank_data_not_found": "Impossible de trouver vos données de classement.",
            "load_error": "Impossible de charger le classement.",
            "player_profile_stats": { // NOUVEAU
                "powerScore": "Puissance",
                "dungeonHighestFloor": "Étage max.",
                "bossesKilled": "Boss tués",
                "enemiesKilled": "Ennemis tués"
            }
        },
        "enchanter": {
            "tabs": {
                "selection": "Sélection",
                "enchantment": "Enchantement"
            },
            "possible_affixes_label": "Affixes Possibles (Cliquez pour voir les détails)",
            "current_affix_label": "Affixe Actuel",
            "lock_label": "Verrouiller 🔒",
            "enchant_reforge_button": "Enchanter / Reforger",
            "forge_level_required": "Améliorez votre Forge au niveau 3 pour débloquer l'Enchanteur.",
            "unlock_title": "Débloquer l'Enchanteur",
            "unlock_description": "Permet de modifier et d'améliorer les affixes de vos équipements.",
            "unlock_cost_label": "Coût :",
            "unlock_button": "Débloquer",
            "level_max": "Niveau d'Enchantement : {level} (Max)",
            "level_current": "Niveau d'Enchantement : {level} (Max: {maxRarity})",
            "upgrade_cost_label": "Coût d'amélioration :",
            "upgrade_button": "Améliorer",
            "select_item_title": "Choisir un objet à enchanter",
            "set_item_disabled_tooltip": "Les objets d'ensemble ne peuvent pas être enchantés.",
            "no_enchantment": "Aucun enchantement",
            "no_equipped_items": "Vous n'avez aucun objet équipé.",
            "item_ineligible_title": "Objet non éligible",
            "no_item_selected": "Aucun objet sélectionné.",
            "unknown_affix": "Inconnu",
            "no_affix": "Aucun",
            "cost_label": "Coût :"
        },
        "stats_panel": {
            "combat_stats_title": "Statistiques de Combat",
            "global_stats_title": "Statistiques Globales",
            "source_base": "Base",
            "source_equipment": "Équip.",
            "source_affix": "Affixe",
            "source_set": "Set",
            "source_codex": "Codex",
            "source_attribute_bonus": "Bonus d'Attribut",
            "source_achievement": "Succès",
            "power_score_label": "Score de Puissance :",
            "hp_per_second_unit": " PV/s",
            "source_base_points": "Points de base",
            "source_constellation": "Constellation",
            "source_ascension": "Ascension",
            "source_traits": "Traits",
        },
        "codex": {
            "no_enemies_discovered": "Aucun ennemi découvert. Partez à l'aventure pour remplir votre Codex !",
            "tier_new": "Nouveau",
            "tier_label": "Palier :",
            "kills_label": "tués",
            "modal": {
                "title_description": "Description",
                "title_locations": "Trouvé dans",
                "title_stats": "Statistiques de Base",
                "stats_ascension_note": "(échelle au niv. d'Ascension {level})",
                "no_locations": "Lieux de rencontre non répertoriés.",
                "unlock_prompt": "Tuez cet ennemi {count} fois pour débloquer cette information.",
                "sprite_placeholder": "?"
            },
        },
        "prompts": {
            "yes": "Oui",
            "cancel": "Annuler",
            "confirm": "Oui, effacer",
            "confirm_delete": "Oui, effacer",
            "yes_with_countdown": "Oui ({countdown})",
            "save_conflict": {
                "body": "Un personnage invité et une sauvegarde en ligne ont été trouvés. Lequel voulez-vous utiliser ?<br><br><div style='text-align:left; padding: 0 15px;'><p><strong>En ligne:</strong> {serverName} (Niv. {serverLevel})</p><p><strong>Local:</strong> {localName} (Niv. {localLevel})</p></div><br><strong>Cette décision est définitive.</strong>",
                "choice_online": "Charger la sauvegarde en ligne",
                "choice_local": "Écraser avec le personnage local"
            }
        },
        "equipment_slots": {
            "Tête": "Tête",
            "Torse": "Torse",
            "Jambes": "Jambes",
            "Pieds": "Pieds",
            "Mains": "Mains",
            "Arme": "Arme",
            "Accessoire": "Accessoire",
            "Artefact": "Artefact"
        },
        "equipment_empty": "Vide",
        "char_info": {
            "portrait_alt": "Portrait du personnage",
            "health_short": "PV",
            "level": "Niveau",
            "health": "PV",
            "mana": "Mana",
            "experience": "XP",
            "energy": "Endurance"
        },
        "stamina": { // NOUVEAU BLOC
            "full": "(Max)"
        },
        "inventory": {
            "filter_by_type": "Trier par type :",
            "filter_none": "Aucun",
            "filter_all": "Tous",
            "recycle_all_button": "Tout Recycler ♻️",
            "select_filter_prompt": "Sélectionnez un filtre pour voir vos objets.",
            "no_items_of_type": "Aucun objet de ce type.",
            "unlock_item_title": "Déverrouiller l'objet",
            "lock_item_title": "Verrouiller l'objet",
            "food_bonus_title": "Bonus : {bonusText} ({duration} combats)"
        },
        "forge": {
            "unlock_prompt": "Débloquez la forge pour {cost}",
            "unlock_button": "Débloquer",
            "level_max_info": "Niveau de la Forge : {level} (Max)",
            "upgrade_prompt": "Niveau : {level}. Améliorer pour {cost}",
            "upgrade_button": "Améliorer",
            "filter_type_label": "Type :",
            "filter_rarity_label": "Rareté :",
            "filter_class_label": "Classe :",
            "filter_all": "Tous",
            "filter_rarity_all": "Toutes",
            "filter_rarity_none": "Aucune",
            "filter_class_all": "Toutes",
            "craftable_items_title": "Objets à Fabriquer",
            "select_rarity_prompt": "Sélectionnez une rareté pour afficher les objets.",
            "no_matching_items": "Aucun objet ne correspond à vos filtres.",
            "item_type_label": "Type :",
            "item_effects_label": "Effets :",
            "item_effects_none": "Aucun",
            "item_cost_label": "Coût :",
            "craft_button": "Fabriquer"
        },
        "affixes": {
            "details_title": "Détails de : {affixName}"
        },
        "alchemist": {
            "title": "Laboratoire d'Alchimie",
            "description": "Préparez des potions et élixirs pour vous aider au combat.",
            "cost_label": "Coût :",
            "craft_button": "Préparer"
        },
        "special_resources": {
            "none": "Aucun composant rare pour le moment."
        },
        "village_hub": {
            "status_locked": "Bloqué",
            "status_available": "Disponible",
            "cost_label": "Coût:",
            "level_label": "Niveau",
            "crafting_label": "Fabrication",
            "enchanter_req_forge": "Requiert Forge Niv. 3",
            "enchanter_enchants_up_to": "Enchantements jusqu'à {rarity}",
            "alchemist_req_adventure": "Requiert la complétion d'une quête d'Aventure.",
            "alchemist_desc": "Fabrication de potions.",
            "cook_desc": "Prépare des plats revigorants.",
            "cook_req_level": "Requiert Niveau 15.",
            "merchant_desc": "Échange de biens.",
            "bounty_master_desc": "Échangez vos Marques.",
            "bounty_master_req": "Terminer une prime Moyenne.",
            "bounty_desc": "Défis quotidiens.",
            "oracle_desc": "Consultez vos cartes.",
            "artisans_district": "Quartier des Artisans",
            "merchants_district": "Quartier Commerçant",
            "mystic_district": "Quartier Mystique",
            "forge": "⚒️ Forge",
            "enchanter": "🧙🏻 Enchanteur",
            "alchemist": "⚗️ Alchimiste",
            "cook": "🍳 Cuisinier",
            "merchant": "💰 Marchand",
            "bounty_master": "Maître Chasseur",
            "bounty": "⚔️ Maître Chasseur",
            "oracle": "🔮 Oracle",
            "title": "Hub du Village",
        },
        "loading_text": "Chargement...",
        "merchant": {
            "exchange_button_label": "Échanger",
            "total_cost_label": "Coût total :",
            "amount_label": "Montant :",
            "from_label": "De :",
            "to_label": "Vers :",
            "quantity_label": "Quantité :",
            "pay_with_label": "Payer avec :",
            "buy_button": "Acheter"
        },
        "classes": {
            "Guerrier": "Guerrier",
            "Archer": "Archer",
            "Mage": "Mage",
            "Toutes les classes": "Toutes les classes"
        },
        "patch_notes": {
            "title": "Notes de Version",
            "select_version_prompt": "Veuillez sélectionner une version à consulter :",
            "version_title": "Notes de Version ({version}) : {title}"
        },
        "consumables": {
            "none": "Aucun consommable."
        },
        "dungeon": {
            "title": "La Brèche Instable",
            "keys_label": "Clés :",
            "description_p1": "Plongez dans un donjon aux étages infinis où la difficulté augmente à chaque niveau. Testez vos limites et récoltez des récompenses uniques !",
            "description_p2": "N'oubliez pas vos potions chez l'Alchimiste avant de partir à la conquête de la Brèche",
            "personal_best_label": "Record personnel : Étage",
            "enter_button": "Entrer",
            "explore_prompt": "Déplacez-vous sur la carte pour explorer :",
            "flee_button": "Fuir le Donjon (Malus de 50%)",
            "max_stock_reached": "Stock max atteint",
            "next_key_in": "Prochaine clé dans : {hours}:{minutes}:{seconds}"
        },
        "contextual_offers": {
            "title": "Offre Spéciale !",
            "acceleration_pack_1": {
                "name": "Pack d'Accélération",
                "description": "Terminez vos constructions et revenez plus vite dans l'action !"
            }
        },
    },
    "guild_shop": { // Nouvel objet pour la boutique
        "title": "Boutique de Guilde",
        "tab_personal": "Personnelle",
        "tab_guild": "Guilde",
        "personal_marks": "Vos Marques",
        "guild_bank": "Banque de Guilde",
        "buy_button": "Acheter",
        "owned_button": "Possédé",
        "item_level_req": "Niv. {level} requis",
        "duration": "Durée : {hours}h",
        "items": {
            "cache_initie": { "name": "Cache de l'Initié", "description": "Un petit coffre contenant 250 Fragments et 50 Éclats Instables." },
            "anneau_confrerie": { "name": "Anneau de la Confrérie", "description": "Un anneau prouvant votre allégeance. Octroie Vie, Chance et un bonus d'XP." },
            "cadre_loyaute": { "name": "Cadre de Loyauté", "description": "Un cadre de profil exclusif pour les membres dévoués." },
            "guild_xp_boost_1": { "name": "Bénédiction de Sagesse (+5% XP)", "description": "Augmente les gains d'XP de 5% pour toute la guilde." },
            "guild_resource_boost_1": { "name": "Corne d'Abondance (+10% Res.)", "description": "Augmente les gains de ressources de base de 10% pour toute la guilde." },
            "guild_strength_boost_1": { "name": "Cri de Guerre (+10% Force)", "description": "Augmente la Force de tous les membres de 10%." }
        }
    },
    "patchNotes": {
      "selection": {
        "title": "Notes de Version",
        "prompt": "Veuillez sélectionner une version à consulter :"
      },
      "v0_5_0": {
        "title": "La Voie du Chasseur",
        "sections": {
          "major": "Nouveautés & Améliorations Majeures",
          "qol": "Améliorations de l'Interface & Qualité de Vie",
          "bugs": "Corrections de Bugs"
        },
        "points": {
          "major": [
            "Introduction du <strong>Tableau des Primes Quotidiennes</strong> ! Relevez des défis contre des monstres \"Élite\" renouvelés toutes les <strong>8 heures</strong> pour gagner des récompenses uniques.",
            "Ajout d'une nouvelle monnaie, les <strong>Marques de Chasse (🎯)</strong>, obtenue en terminant des primes.",
            "Plus de 40 nouvelles cibles de primes uniques ont été ajoutées avec 4 niveaux de difficulté (Facile, Moyen, Difficile, Élite) basés sur votre <strong>Score de Puissance</strong>.",
            "Implémentation des <strong>Patrouilles (Mode AFK)</strong> pour gagner des ressources et de l'XP en étant inactif. Il est possible d'interrompre une patrouille à tout moment contre une petite pénalité.",
            "<strong>Refonte majeure de l'économie :</strong> les coûts de fabrication des objets de haut niveau ont été considérablement augmentés pour rendre la progression plus gratifiante.",
            "Ajout de <strong>Ressources d'Artisanat Spécifiques</strong> sur certains monstres, nécessaires pour créer des objets uniques qui ne peuvent être obtenus autrement.",
            "Ajout d'un emplacement pour le futur <strong>Maître Chasseur</strong> au village, qui échangera vos Marques de Chasse."
          ],
          "qol": [
            "Réorganisation complète de l'interface du personnage en <strong>deux colonnes</strong> pour une meilleure clarté sur grand écran, tout en s'adaptant parfaitement au mobile.",
            "Les rapports d'expédition et de patrouille ont été <strong>entièrement redesignés</strong> : ils sont plus visuels, colorés, scrollables et détaillent mieux les gains d'XP.",
            "Les panneaux (Inventaire, Équipement, etc.) ont maintenant une hauteur fixe et deviennent <strong>scrollables</strong> avec une barre de défilement personnalisée pour une interface plus propre.",
            "Amélioration du combat : les ennemis vaincus restent désormais à l'écran (grisés) jusqu'à la fin du combat.",
            "Les objets enchantés avec des affixes sont maintenant correctement affichés et groupés à part dans l'inventaire.",
            "Le bonus de \"Dégâts Globaux\" du Codex est maintenant bien visible dans les statistiques de combat.",
            "Les descriptions des attributs (Vie, Force, Agilité, etc.) sont désormais consultables directement dans l'interface.",
            "Le Codex est désormais trié par ordre décroissant du nombre de victimes.",
            "L'affichage du hub du Village sur mobile a été optimisé pour présenter les bâtiments sur deux colonnes.",
            "Le texte des éléments interactifs n'est plus sélectionnable pour une expérience plus propre."
          ],
          "bugs": [
            "Correction d'un bug majeur qui pouvait équiper le mauvais objet depuis l'inventaire.",
            "Correction d'un bug d'ennemi fantôme restant affiché après un combat.",
            "Le bouton de fuite est désormais correctement désactivé pendant les combats de prime.",
            "Amélioration de la robustesse du chargement de partie pour éviter les erreurs."
          ]
        }
      },
      "v0_6_0": {
        "title": "L'Ère des Héros",
        "sections": {
            "major": "Nouveautés & Améliorations Majeures",
            "qol": "Améliorations de l'Interface & Qualité de Vie",
            "balancing": "Équilibrage"
        },
        "points": {
            "major": [
                "Implémentation du <strong>système de Classes</strong> ! Choisissez entre <strong>Guerrier, Archer et Mage</strong> à la création de votre personnage pour une expérience de jeu unique.",
                "Chaque classe possède désormais ses <strong>propres compétences</strong> avec des effets uniques comme les dégâts de zone pour le Mage ou la pénétration d'armure pour l'Archer.",
                "Les dégâts des compétences dépendent maintenant de votre attribut principal : <strong>Force</strong> (Guerrier), <strong>Agilité</strong> (Archer) ou <strong>Intelligence</strong> (Mage).",
                "Ajout d'une nouvelle ressource pour le Mage : le <strong>Mana</strong>, qui se régénère hors combat et est consommé par les sorts.",
                "<strong>Plus de 50 nouveaux objets</strong> ont été ajoutés, du Commun au Mythique, avec des statistiques adaptées à chaque classe et à des styles de jeu variés.",
                "<strong>Plusieurs nouveaux ensembles d'objets</strong> spécifiques à chaque classe ont été créés pour les paliers Épique, Légendaire et Mythique, offrant des objectifs de fin de partie clairs."
            ],
            "qol": [
                "L'affichage des attributs a été entièrement repensé : laissez votre souris (PC) ou votre doigt (Mobile) sur le <strong>nom</strong> d'un attribut pour voir sa <strong>description</strong>, et sur sa <strong>valeur</strong> pour voir le <strong>détail complet</strong> de tous vos bonus.",
                "Il est maintenant possible de <strong>maintenir le clic ou l'appui</strong> sur le bouton `+` pour attribuer rapidement plusieurs points de statistiques.",
                "Le <strong>Codex</strong> et l'interface de <strong>combat</strong> affichent maintenant les <strong>sprites</strong> de chaque monstre et boss pour une meilleure immersion.",
                "Un <strong>portrait de votre personnage</strong>, basé sur votre classe, est désormais visible dans l'en-tête du jeu.",
                "Les sprites des monstres réagissent aux combats : ils s'illuminent en subissant des dégâts et deviennent grisés à leur mort.",
                "Le <strong>Maître Chasseur</strong> propose désormais un <strong>filtre</strong> pour n'afficher que les ensembles d'objets pertinents pour votre classe (ou pour toutes les voir).",
                "Les infobulles des objets affichent maintenant clairement la <strong>classe requise</strong>.",
                "Les personnages existants sans classe sont invités à en <strong>choisir une</strong> à leur prochaine connexion, avec une option pour réinitialiser leurs statistiques.",
                "Les objets équipés qui ne correspondent pas à votre classe sont <strong>automatiquement déséquipés</strong> au chargement de la partie.",
                "Le système de <strong>Notes de Version</strong> est maintenant dynamique et vous permet de consulter les archives des mises à jour."
            ],
            "balancing": [
                "L'équilibrage des attributs principaux a été revu pour renforcer l'identité de chaque classe et rendre les choix de statistiques secondaires plus stratégiques.",
                "La <strong>Force</strong> octroie désormais un léger bonus passif de <strong>Pénétration d'armure</strong>.",
                "L'<strong>Intelligence</strong> octroie désormais un léger bonus passif de <strong>Résistance aux dégâts</strong>."
            ]
        }
      },
      "v0_7_0": {
        "title": "La Brèche Instable",
        "sections": {
            "major": "Nouveauté Majeure : Le Donjon Infini",
            "balancing": "Améliorations & Équilibrage",
            "bugs": "Corrections de Bugs"
        },
        "points": {
            "major": [
                "Introduction d'un tout nouveau mode de jeu : <strong>La Brèche Instable</strong>, un donjon aux étages infinis et à la difficulté croissante.",
                "Chaque étage est une <strong>carte générée de manière procédurale</strong>, offrant une expérience unique à chaque tentative.",
                "<strong>Explorez la carte !</strong> Fini les chemins linéaires, choisissez votre route, revenez sur vos pas et découvrez ce que chaque salle vous réserve.",
                "La carte est désormais <strong>interactive</strong> : déplacez-la avec la souris ou le doigt pour planifier votre exploration.",
                "Ajout de <strong>nouvelles salles d'événements</strong> : trouvez des trésors, des fontaines de soin, ou tombez dans des pièges !",
                "Introduction de deux nouvelles ressources : la <strong>Clé de la Brèche (🗝️)</strong> pour entrer dans le donjon, et les <strong>Éclats instables (💠)</strong> comme récompense principale.",
                "Mise en place d'un <strong>système de paliers</strong> : les joueurs vétérans peuvent désormais commencer leur tentative à des étages plus élevés (tous les 20 étages) pour sauter le début."
            ],
            "balancing": [
                "<strong>Refonte de la difficulté du donjon :</strong> la puissance des monstres est désormais calculée selon un 'budget de puissance' qui augmente de manière exponentielle, garantissant des débuts en douceur et des fins de partie très difficiles.",
                "<strong>Variété des monstres accrue :</strong> le nouveau système de génération permet de rencontrer n'importe quel monstre du jeu dans le donjon, en fonction de sa puissance et de l'étage.",
                "L'interface est désormais <strong>verrouillée pendant une tentative de donjon</strong> pour éviter les abus (accès au village, etc.).",
                "Les récompenses des <strong>paliers du Codex</strong> ont été améliorées pour être plus uniques et intéressantes.",
                "Les seuils de victimes pour les paliers du Codex ont été augmentés pour s'adapter au plus grand nombre de combats générés par le donjon."
            ],
            "bugs": [
                "Correction d'un bug critique qui pouvait empêcher la fin d'un combat dans le donjon.",
                "Correction d'un bug d'interaction qui empêchait de cliquer sur les salles du donjon.",
                "Correction d'un bug qui bloquait l'interface si l'on rechargeait la page en plein donjon."
            ]
        }
      },
      "v0_8_0": {
        "title": "L'Ascension Céleste",
        "sections": {
            "major": "Nouveautés Majeures",
            "qol": "Améliorations & Qualité de Vie",
            "balancing": "Équilibrage",
            "bugs": "Corrections de Bugs"
        },
        "points": {
            "major": [
                "<strong>Le Système d'Ascension est là !</strong> Une fois le niveau 50 atteint, réinitialisez votre personnage au niveau 1 pour recommencer plus fort, avec un bonus permanent à vos attributs pour chaque niveau d'Ascension.",
                "<strong>Découvrez les Constellations Célestes !</strong> Dépensez les Points de Constellation (PC) gagnés en Ascension pour débloquer de puissants talents passifs permanents.",
                "<strong>L'Arbre du Destin :</strong> Un arbre de talents universel dont les bonus s'appliquent à tous vos personnages, vous permettant de débloquer l'accès à l'équipement de plus haute rareté.",
                "<strong>Arbres de Vocation :</strong> Chaque classe (Guerrier, Archer, Mage) possède désormais son propre arbre de talents pour spécialiser votre style de jeu et débloquer des passifs qui changent la manière de jouer."
            ],
            "qol": [
                "<strong>Comparaison d'Objets :</strong> Laissez votre souris (ou votre doigt) sur un objet dans l'inventaire pour voir instantanément une comparaison avec l'objet équipé.",
                "<strong>Filtre d'Inventaire :</strong> Une nouvelle option de filtre a été ajoutée à l'inventaire pour retrouver plus facilement vos objets.",
                "<strong>Feedback Visuel en Combat :</strong> Les passifs activables, comme le Bouclier de Mana, ont désormais une icône dédiée en combat pour savoir s'ils sont actifs.",
                "<strong>Tag d'Ascension :</strong> Votre niveau d'Ascension est maintenant fièrement affiché à côté de votre nom et dans le classement, avec une couleur évolutive pour montrer votre puissance !"
            ],
            "balancing": [
                "<strong>Difficulté d'Ascension :</strong> La puissance des ennemis dans toutes les activités (Expéditions, Donjon, Primes) augmente désormais avec votre niveau d'Ascension, garantissant un défi toujours renouvelé.",
                "Les gains en XP et en ressources sont également légèrement augmentés à chaque niveau d'Ascension.",
                "Les talents de la constellation du Guerrier ont été améliorés pour renforcer sa capacité de survie dans les niveaux d'Ascension les plus élevés."
            ],
            "bugs": [
                "Correction d'un bug où le talent '+X à tous les attributs' (`stat_flat_all`) donnait un montant de Défense incorrect.",
                "Correction d'un problème d'affichage dans l'infobulle des Succès qui pouvait masquer certaines récompenses.",
                "Correction d'un bug rare qui pouvait bloquer un combat si un ennemi mourait du saignement au début de son propre tour."
            ]
        }
      },
      "v0_9_0": {
        "title": "L'Aube du Domaine",
        "sections": {
            "major": "Nouveauté Majeure : Votre Fief Personnel",
            "garden": "Le Jardin Évolutif : Un Monde à Cultiver",
            "qol": "Améliorations & Qualité de Vie",
            "balancing": "Équilibrage"
        },
        "points": {
            "major": [
                "<strong>Le système de Fief est désormais disponible !</strong> Débloquez votre propre domaine au niveau 10 pour construire et améliorer des bâtiments qui vous octroieront des bonus passifs et de nouvelles ressources.",
                "<strong>Production Passive :</strong> Construisez et améliorez la <strong>Scierie</strong>, la <strong>Mine</strong> et l'<strong>Atelier de Tissage</strong> pour générer du bois, du métal et du tissu au fil du temps, même lorsque vous êtes hors ligne.",
                "<strong>Bâtiments Utilitaires :</strong> Améliorez l'<strong>Entrepôt</strong> pour augmenter drastiquement votre capacité de stockage de ressources, et construisez l'<strong>Infirmerie</strong> pour réduire le temps de pénalité après une défaite.",
                "<strong>Consommables Passifs :</strong> L'Infirmerie produit désormais passivement des <strong>Baumes de Triage</strong>, de puissants objets de soin utilisables en combat."
            ],
            "garden": [
                "Découvrez le <strong>Jardin Évolutif</strong> au sein de votre Fief, un système de jardinage complexe et profond.",
                "<strong>Trouvez et plantez des graines</strong> rares obtenues lors de vos expéditions pour cultiver des plantes aux propriétés uniques.",
                "<strong>Système de Saisons :</strong> Le temps passe dans votre jardin ! Chaque saison (Printemps, Été, Automne, Hiver) dure plusieurs jours et influence la croissance de vos plantes, favorisant certains types et en ralentissant d'autres.",
                "<strong>Synergies et Mutations :</strong> Découvrez des recettes secrètes ! Planter certaines plantes à côté d'autres pendant la bonne saison peut déclencher des <strong>transformations</strong>, créant des espèces rares et puissantes qui ne peuvent être obtenues autrement.",
                "<strong>Expansion du Jardin :</strong> En découvrant des plantes de paliers supérieurs, votre jardin s'agrandit, vous offrant plus de parcelles pour vos cultures."
            ],
            "qol": [
                "Une nouvelle interface dédiée au Fief est accessible depuis l'écran principal, vous permettant de gérer votre domaine à tout moment hors combat.",
                "L'interface des bâtiments du Fief affiche clairement les niveaux, les coûts d'amélioration et la production en temps réel.",
                "Ajout d'une infobulle détaillée pour chaque bâtiment du Fief, expliquant ses bonus actuels et ceux du prochain niveau.",
                "Les nouvelles ressources et consommables du Fief sont désormais intégrés dans l'économie globale du jeu."
            ],
            "balancing": [
                "Les coûts de certaines améliorations de haut niveau pour la Forge et l'Enchanteur incluent désormais des ressources rares pouvant être cultivées dans le Jardin.",
                "La capacité de stockage de base des ressources a été ajustée pour rendre l'amélioration de l'Entrepôt plus significative.",
                "Certaines recettes d'alchimie et de cuisine nécessitent maintenant des ingrédients qui ne peuvent être obtenus que via le Jardin Évolutif."
            ]
        }
      }
    },
    "stats": {
        "no_stats": "Aucune statistique",
        "expeditions_started": "Expéditions lancées",
        "expeditions_succeeded": "Expéditions réussies",
        "expeditions_failed": "Expéditions échouées",
        "expedition_success_rate": "Taux de réussite (Exp.)",
        "player_deaths": "Morts du personnage",
        "bosses_killed": "Boss vaincus",
        "enemies_killed": "Ennemis tués",
        "items_crafted": "Objets fabriqués",
        "items_recycled": "Objets recyclés",
        "items_enchanted": "Objets enchantés",
        "fragments_earned": "Fragments totaux gagnés",
        "xp_earned": "XP totale gagnée",
        "displayNames": {
            "Vie": "Vie",
            "Force": "Force",
            "Agilité": "Agilité",
            "Chance": "Chance",
            "Intelligence": "Intelligence",
            "Défense": "Défense",
        
            // --- Ressources Communes ---
            "fragments": "Fragments",
            "bois": "Bois",
            "metal": "Métal",
            "tissu": "Tissu",
            "marques_de_chasse": "Marques de Chasse",
            "bounty_tokens": "Jetons de Prime",
            "eclats_instables": "Éclats Instables",
            "cle_de_la_breche": "Clé de la Brèche",
        
            // --- Composants Rares ---
            "Coeur de Golem": "Coeur de Golem",
            "Essence Spectrale": "Essence Spectrale",
            "Chitine Renforcée": "Chitine Renforcée",
            "Plume de Griffon": "Plume de Griffon",
            "Sang de Basilic": "Sang de Basilic",
            "Oeil de Chimère": "Oeil de Chimère",
            "Écaille de Profond": "Écaille de Profond",
            "Totem Orc": "Totem Orc",
            "Fragment d'Âme de Démon": "Fragment d'Âme de Démon",
            "Coeur de Dragon Ancien": "Coeur de Dragon Ancien",
            "Larme d'Archange": "Larme d'Archange",
            "Poussière de Vide": "Poussière de Vide",
            "Herbes Médicinales": "Herbes Médicinales",
            "coeur_de_golem": "Coeur de Golem",
            "essence_spectrale": "Essence Spectrale",
            "chitine_renforcee": "Chitine Renforcée",
            "plume_de_griffon": "Plume de Griffon",
            "sang_de_basilic": "Sang de Basilic",
            "oeil_de_chimere": "Oeil de Chimère",
            "ecaille_de_profond": "Écaille de Profond",
            "totem_orc": "Totem Orc",
            "fragment_d_ame_de_demon": "Fragment d'Âme de Démon",
            "coeur_de_dragon_ancien": "Coeur de Dragon Ancien",
            "larme_d_archange": "Larme d'Archange",
            "poussiere_de_vide": "Poussière de Vide",
            "herbes_medicinales": "Herbes Médicinales",
            
            // --- NOUVEAU : Clés pour les Graines ---
            "HERBE_ROBUSTE_SEED": "Graine d'Herbe Robuste",
            "CRISTAL_DE_GIVRE_SEED": "Graine de Cristal de Givre",
            "FLEUR_DE_LAVE_SEED": "Graine de Fleur de Lave",
            "GRAINE_SOLAIRE_SEED": "Graine Solaire",
            "RACINE_TERREUSE_SEED": "Graine de Racine Terreuse",
            "TOURNESOL_RADIEUX_SEED": "Graine de Tournesol Radieux",
            "LYS_DE_GIVRE_SEED": "Graine de Lys de Givre",
            "CHAMPIGNON_TERREUX_SEED": "Graine de Champignon Terreux",
            "FLEUR_DE_ROSEE_SEED": "Graine de Fleur de Rosée",
            "TREFLE_DORE_SEED": "Graine de Trèfle Doré",
            "RACINE_EPONGE_SEED": "Graine de Racine-Éponge",
            "ROSE_SANGUINE_SEED": "Graine de Rose Sanguine",
            "ORCHIDEE_SILENCIEUSE_SEED": "Graine d'Orchidée Silencieuse",
            "marques_de_guilde": "Marques de Guilde",
        
            // --- Composants du Jardin (Ressources récoltées) ---
            "Cristal de Givre": "Cristal de Givre",
            "Fleur de Lave": "Fleur de Lave",
            "Graine Solaire": "Graine Solaire",
            "Racine Terreuse": "Racine Terreuse",
            "Tournesol Radieux": "Tournesol Radieux",
            "Lys de Givre": "Lys de Givre",
            "Champignon Terreux": "Champignon Terreux",
            "Fleur de Rosée": "Fleur de Rosée",
            "Rose Sanguine": "Rose Sanguine",
            "eclats_ascension": "Éclats d'Ascension",
            "RegenHP": "Régénération de PV",
            "CritChance": "Chance de Critique",
            "CritDamage": "Dégâts Critiques",
            "Evasion": "Esquive",
            "LootBonusPercent": "Bonus de drop d'item",
            "lifesteal_percent": "Vol de Vie",
            "bleed_chance_percent": "Chance de Saignement",
            "xp_gain_percent": "Gain d'XP",
            "resistance_percent": "Résistance aux dégâts",
            "stun_chance_percent": "Chance d'Étourdir",
            "armor_shred_percent": "Pénétration d'armure",
            "thorns_damage_flat": "Dégâts d'épines",
            "resource_gain_percent": "Gain de ressources",
            "debuff_resistance_percent": "Résistance aux malus",
            "healing_effectiveness_percent": "Efficacité des soins",
            "damage_percent": "Dégâts Globaux",
            "spell_damage_percent": "Dégâts des Sorts %",
            "mana_cost_percent": "Coût en Mana %",
            "mana_regen_percent": "Régén. Mana %",
            "bonus_force_low_hp_percent": "Bonus Force (PV bas) %",
            "Vie_percent": "Vie Max %",
            "max_mana_percent": "Mana Max %",
            "spell_lifesteal_percent": "Vol de Vie (Sorts) %",
            "stun_resistance_percent": "Résistance Étourdissement %",
            "freecast_chance_percent": "Chance de Sort Gratuit %",
            "vol_de_mana_percent": "Vol de Mana",
            "archer_skill_damage_percent": "Dégâts Compétences Archer %",
            "evasion_chance_percent": "Chance d'Esquive %",
            "spell_crit_chance_percent": "Chance Critique (Sorts) %",
            "spell_crit_damage_percent": "Dégâts Critiques (Sorts) %",
            "ascension_pc_gain_percent": "Gain de Points de Constellation %",
            "codex_kill_credit_percent": "Progression du Codex %",
            "fragments_gain_percent": "Gain de Fragments %",
            "event_success_chance_flat": "Chance de Succès (Événement)",
            "sell_price_percent": "Prix de Vente %",
            "free_craft_chance_percent": "Chance d'Artisanat Gratuit %",
            "patrol_reward_percent": "Récompenses de Patrouille %",
            "Force_percent": "Force %",
            "Agilité_percent": "Agilité %",
            "Chance_percent": "Chance %",
            "Intelligence_percent": "Intelligence %",
            "Défense_percent": "Défense %",
            "stat_flat_all": "Tous les attributs"
        },
        "descriptions": {
            "Vie": "Augmente vos points de vie maximum (PV). Essentiel pour survivre aux longs combats et aux pièges. (3 PV / point)",
            "Force": "Statistique principale du Guerrier, augmentant les dégâts de ses compétences. Pour toutes les classes, elle augmente la Régénération de PV hors combat et la Pénétration d'armure.",
            "Agilité": "Statistique principale de l'Archer, augmentant les dégâts de ses compétences. Pour toutes les classes, elle augmente les Dégâts Critiques et la Chance d'Esquive.",
            "Chance": "Augmente vos chances de succès dans les événements, la probabilité de trouver du butin de meilleure qualité, et augmente désormais votre Chance de Coup Critique.",
            "Intelligence": "Statistique principale du Mage, augmentant les dégâts de ses sorts, son Mana maximum et sa régénération. Pour toutes les classes, elle augmente le Gain d'XP, la Chance de Toucher et la Résistance aux dégâts.",
            "Défense": "Réduit directement les dégâts subis. Une statistique de survie cruciale, améliorable uniquement via l'équipement ou tous les 10 niveaux."
        }
    },
    "patrol": {
        "busy_message": "Vous ne pouvez pas lancer de patrouille maintenant.",
        "start_toast": "Patrouille de {hours}h lancée !",
        "report_title_interrupted": "Rapport de Patrouille Interrompue",
        "report_title_completed": "Rapport de Patrouille",
        "penalty_text": "<p style=\"color: #ff6b6b;\">Une pénalité de {penalty}% a été appliquée pour interruption.</p>",
        "summary_title": "--- Bilan ---",
        "xp_gained": "XP gagnée :",
        "wood_reported": "Bois rapporté :",
        "metal_reported": "Métal rapporté :",
        "cloth_reported": "Tissu rapporté :",
        "cancel_confirm": "Voulez-vous vraiment interrompre votre patrouille ?<br><br>Vous recevrez des récompenses pour le temps écoulé, mais avec une <strong>pénalité de 25%</strong>.",
        "ui_completed_title": "Patrouille Terminée !",
        "ui_completed_text": "Votre personnage attend vos ordres pour terminer sa patrouille et collecter les récompenses.",
        "ui_completed_button": "Terminer la Patrouille",
        "ui_inprogress_title": "Patrouille en cours...",
        "ui_inprogress_timer": "Fin dans :",
        "ui_inprogress_button": "Interrompre (avec pénalité)",
        "ui_start_title": "Lancer une Patrouille (Mode AFK)",
        "ui_start_text": "Envoyez votre personnage en patrouille pour gagner des ressources et de l'XP sans jouer. Les récompenses sont inférieures à une expédition active.",
        "ui_start_button": "Lancer ({hours}h)"
    },
    "village": {
    "title": "Village",
    "buildings": {
        "forge": "Forge",
        "forge_desc": "Fabriquez et recyclez de l'équipement.",
        "enchanter": "Enchanteur",
        "enchanter_desc": "Améliorez vos équipements avec de puissantes statistiques."
    },
    "upgrade_complete_toast": "{buildingName} (Niv. {level}) terminé !"
    },
    "rewards": {
        "none": "Aucune",
        "specialPassive": "<strong>Passif Spécial</strong>",
        "specialReward": "Récompense Spéciale",
        "unknownType": "Type de récompense inconnu :",
        "passives": {
            "instinct": "<strong>Passif : Instinct du Prédateur</strong>",
            "ironWill": "<strong>Passif : Volonté de Fer</strong>",
            "execution": "<strong>Passif : Exécution</strong>"
        }
    },
    "skills": {
        "guerrier": {
            "attaque_basique": {
                "name": "Attaque Basique",
                "description": "Une attaque simple et fiable. Dégâts basés sur la Force."
            },
            "attaque_lourde": {
                "name": "Attaque Lourde",
                "description": "Une attaque puissante mais moins précise. Dégâts basés sur la Force."
            }
        },
        "archer": {
            "tir_simple": {
                "name": "Tir Simple",
                "description": "Un tir rapide et précis. Dégâts basés sur l'Agilité."
            },
            "tir_perforant": {
                "name": "Tir Perforant",
                "description": "Un tir puissant qui ignore une partie de la défense adverse. Dégâts basés sur l'Agilité."
            }
        },
        "mage": {
            "eclair_de_givre": {
                "name": "Éclair de Givre",
                "description": "Un projectile de glace. Dégâts basés sur l'Intelligence."
            },
            "boule_de_feu": {
                "name": "Boule de Feu",
                "description": "Une explosion qui frappe la cible principale et inflige des dégâts réduits aux autres ennemis. Dégâts basés sur l'Intelligence."
            },
            "coup_de_baton": {
                "name": "Coup de Bâton",
                "description": "Une attaque désespérée quand le mana vient à manquer. Les dégâts sont très faibles et basés sur la Force."
            }
        },
        "guild_boss_1": {
            "corrupting_breath": { "name": "Souffle Corrupteur" },
            "abyssal_slam": { "name": "Frappe Abyssale" }
        }
    },

    "consumables": {
        "potion_soin_mineure": {
            "name": "Potion de Soin Mineure",
            "description": "Restaure 40 PV."
        },
        "potion_soin": {
            "name": "Potion de Soin",
            "description": "Restaure 90 PV."
        },
        "potion_mana_mineure": {
            "name": "Potion de Mana Mineure",
            "description": "Restaure 30 points de Mana."
        },
        "potion_mana": {
            "name": "Potion de Mana",
            "description": "Restaure 60 points de Mana."
        },
        "elixir_force_faible": {
            "name": "Élixir de Force Faible",
            "description": "Augmente la Force de 10 pendant 3 tours."
        },
        "cle_de_la_breche": {
            "name": "Clé de la Brèche",
            "description": "Ouvre l'accès au Donjon Infini pour une tentative."
        },
        "baume_de_triage": {
            "name": "Baume de Triage",
            "description": "Un baume puissant préparé au Fief. Restaure 25% des PV max et 25% du Mana max. Utilisable uniquement en combat."
        },
        "elixir_peau_de_pierre": {
            "name": "Élixir de Peau de Pierre",
            "description": "Augmente la Défense de 15 pendant 3 tours."
        },
        "potion_clairvoyance": {
            "name": "Potion de Clairvoyance",
            "description": "Augmente la Chance de 20 pendant 5 tours."
        },
        "huile_de_saignement": {
            "name": "Huile de Saignement",
            "description": "Augmente les chances de Saignement de 10% pendant 3 tours."
        }
    },
    "alchemy": {
        "potion_soin_mineure": { "name": "Potion de Soin Mineure", "description": "Restaure 50 PV." },
        "potion_soin": { "name": "Potion de Soin", "description": "Restaure 90 PV." },
        "potion_mana_mineure": { "name": "Potion de Mana Mineure", "description": "Restaure 30 points de Mana." },
        "potion_mana": { "name": "Potion de Mana", "description": "Restaure 60 points de Mana." },
        "elixir_force_faible": { "name": "Élixir de Force Faible", "description": "Augmente la Force de 10 pendant 3 tours." },
        "elixir_peau_de_pierre": { "name": "Élixir de Peau de Pierre", "description": "Augmente la Défense de 15 pendant 3 tours." },
        "potion_clairvoyance": { "name": "Potion de Clairvoyance", "description": "Augmente la Chance de 20 pendant 5 tours." },
        "huile_de_saignement": { "name": "Huile de Saignement", "description": "Enduit votre arme pour augmenter les chances de Saignement de 10% pendant 3 tours." }
    },

    "cooking": {
        "ragout_roborant": { "name": "Ragoût Roborant", "description": "Un plat simple mais réconfortant qui renforce votre constitution." },
        "infusion_glaciale": { "name": "Infusion Glaciale", "description": "Une boisson fraîche qui éclaircit l'esprit et accélère la régénération de mana." },
        "salade_de_zephyr": { "name": "Salade de Zéphyr", "description": "Une salade légère et croquante qui vous donne l'impression de flotter." },
        "steak_enflamme": { "name": "Steak Enflammé", "description": "Une viande cuite sur des pétales de Fleur de Lave. Épicé et revigorant !" },
        "souffle_de_la_fortune": { "name": "Soufflé de la Fortune", "description": "Un dessert aérien et doré qui semble attirer la chance." }
    },

    "merchants": {
        "pedro": {
            "name": "Pedro le Voyageur",
            "description": "Un homme à l'allure fatiguée mais au regard vif vous fait signe. Son chariot est rempli de babioles et de quelques trésors."
        },
        "village_artisan": {
            "name": "Artisan du Village",
            "description": "Un artisan polyvalent qui peut rééquilibrer vos stocks ou vous procurer des matériaux rares.",
            "buy_components_title": "Acheter des Composants",
            "exchange_title": "Échanger des Ressources",
            "exchange_description": "Taux : 100 de vos ressources contre 70 d'une autre.",
            "buy_fragments_title": "Acheter des Fragments",
            "buy_fragments_description": "Le prix est de 500 ressources par fragment."
        }
    },
    "codex": {
        "bonus": {
        "unlocked": "Débloqué"
        },
        "tiers": {
            "novice": "Novice",
            "confirme": "Confirmé",
            "expert": "Expert",
            "maitre": "Maître"
        },
        "novice": {
            "milestone1_name": "Apprenti Chasseur",
            "milestone2_name": "Chasseur Compétent",
            "milestone3_name": "Fléau des Bêtes",
            "milestone4_name": "Instinct du Prédateur"
        },
        "confirme": {
            "milestone1_name": "Survivant Tenace",
            "milestone2_name": "Peau de Pierre",
            "milestone3_name": "Sanguinaire",
            "milestone4_name": "Volonté de Fer"
        },
        "expert": {
            "milestone1_name": "Spécialiste",
            "milestone2_name": "Maître d'Armes",
            "milestone3_name": "Artère Sectionnée",
            "milestone4_name": "Cœur du Vétéran"
        },
        "maitre": {
            "milestone1_name": "Connaisseur",
            "milestone2_name": "Vampire Accompli",
            "milestone3_name": "Commotion",
            "milestone4_name": "Exécution"
        }
    },
    "items": {
        "essence_dissonante": { "name": "Essence Dissonante", "desc": "Énergie brute de la Dissonance, utilisée pour l'artisanat avancé." },
        "essence_dissonante_pure": { "name": "Essence Dissonante Pure", "desc": "Une essence concentrée de Dissonance, rare et puissante." },
        "artefact_ancien_harmonique": { "name": "Artefact Harmonique Ancien", "desc": "Une relique de l'ancien Ordre de l'Harmonie, altérée par la Dissonance." },
        "common": {
            "anneau_simple": { "name": "Anneau simple" },
            "bottes_usagees": { "name": "Bottes usagées" },
            "bracelet_de_force": { "name": "Bracelet de force" },
            "casque_en_cuir_use": { "name": "Casque en cuir usé" },
            "ceinture_en_corde": { "name": "Ceinture en corde" },
            "heaume_de_bois": { "name": "Heaume de bois" },
            "jambieres_de_voyageur": { "name": "Jambières de voyageur" },
            "pantalon_de_paysan": { "name": "Pantalon de paysan" },
            "protege_tibias_en_cuir": { "name": "Protège-tibias en cuir" },
            "tunique_dechiree": { "name": "Tunique déchirée" },
            "ceinture_en_cuir_simple": { "name": "Ceinture en cuir simple" },
            "sandales_usees": { "name": "Sandales usées" },
            "jambieres_en_tissu_rapiece": { "name": "Jambières en tissu rapiécé" },
            "epee_rouillee": { "name": "Épée rouillée" },
            "gourdin_simple": { "name": "Gourdin simple" },
            "gants_de_travail": { "name": "Gants de travail" },
            "targe_en_bois": { "name": "Targe en bois" },
            "brassards_en_cuir": { "name": "Brassards en cuir" },
            "plastron_de_cuir_brut": { "name": "Plastron de cuir brut" },
            "dague_ebrechee": { "name": "Dague ébréchée" },
            "gants_en_tissu": { "name": "Gants en tissu" },
            "carquois_simple": { "name": "Carquois simple" },
            "pourpoint_en_cuir": { "name": "Pourpoint en cuir" },
            "capuche_de_rodeur_simple": { "name": "Capuche de rôdeur simple" },
            "baton_noueux": { "name": "Bâton noueux" },
            "bottes_de_paille": { "name": "Bottes de paille" },
            "chemise_de_lin": { "name": "Chemise de lin" },
            "pendentif_en_os": { "name": "Pendentif en os" },
            "vieux_chapeau_pointu": { "name": "Vieux chapeau pointu" },
            "circlet_d_apprenti": { "name": "Circlet d'apprenti" },
            "robe_simple": { "name": "Robe simple" },
            "mitaines_d_apprenti": { "name": "Mitaines d'apprenti" },
            "chausses_de_novice": { "name": "Chausses de novice" }
        },
        "uncommon": {
            "armure_legere": { "name": "Armure légère" },
            "bottes_de_marche": { "name": "Bottes de marche" },
            "bottes_fourrees": { "name": "Bottes fourrées" },
            "jambieres_renforcees": { "name": "Jambières renforcées" },
            "potion_de_soin_mineure": { "name": "Potion de Soin Mineure" },
            "talisman_de_vitalite": { "name": "Talisman de vitalité" },
            "trefle_a_quatre_feuilles": { "name": "Trèfle à quatre feuilles" },
            "pendentif_de_chance": { "name": "Pendentif de chance" },
            "bottes_de_voyageur_aguerri": { "name": "Bottes de voyageur aguerri" },
            "bouclier_de_tour_en_bois": { "name": "Bouclier de tour en bois" },
            "casque_en_fer": { "name": "Casque en fer" },
            "gantelets_cloutes": { "name": "Gantelets cloutés" },
            "hache_de_bucheron": { "name": "Hache de bûcheron" },
            "jambieres_de_mailles": { "name": "Jambières de mailles" },
            "lance_de_milicien": { "name": "Lance de milicien" },
            "hache_de_guerre_en_fer": { "name": "Hache de guerre en fer" },
            "plastron_de_mercenaire": { "name": "Plastron de mercenaire" },
            "casque_de_soldat_du_front": { "name": "Casque de soldat du front" },
            "arc_court": { "name": "Arc court" },
            "cape_de_voyage": { "name": "Cape de voyage" },
            "capuche_d_eclaireur": { "name": "Capuche d'éclaireur" },
            "gants_de_pickpocket": { "name": "Gants de pickpocket" },
            "arc_de_chasseur": { "name": "Arc de chasseur" },
            "gants_de_traqueur": { "name": "Gants de traqueur" },
            "jambieres_de_hors_la_loi": { "name": "Jambières de hors-la-loi" },
            "amulette_de_l_erudit": { "name": "Amulette de l'érudit" },
            "catalyseur_arcanique": { "name": "Catalyseur arcanique" },
            "fouet_d_initie": { "name": "Fouet d'initié" },
            "sceptre_de_novice": { "name": "Sceptre de novice" },
            "robe_d_adepte": { "name": "Robe d'adepte" },
            "gants_de_conjurateur": { "name": "Gants de conjurateur" },
            "bottes_de_l_adepte": { "name": "Bottes de l'adepte" }
        },
        "rare": {
            "casque_de_soldat": { "name": "Casque de soldat" },
            "pendentif_du_survivant": { "name": "Pendentif du survivant" },
            "cape_de_resistance": { "name": "Cape de résistance" },
            "arbalete_lourde": { "name": "Arbalète lourde" },
            "cuirasse_de_plaques": { "name": "Cuirasse de plaques" },
            "espadon_de_mercenaire": { "name": "Espadon de mercenaire" },
            "hallebarde_de_la_garde": { "name": "Hallebarde de la garde" },
            "jambieres_de_plaques": { "name": "Jambières de plaques" },
            "jambieres_du_barbare": { "name": "Jambières du barbare" },
            "longue_epee_de_chevalier": { "name": "Longue épée de chevalier" },
            "poings_americains": { "name": "Poings américains" },
            "solerets_en_acier": { "name": "Solerets en acier" },
            "gantelets_de_gladiateur": { "name": "Gantelets de gladiateur" },
            "marteau_de_guerre": { "name": "Marteau de guerre" },
            "harnois_de_bataille": { "name": "Harnois de bataille" },
            "bottes_de_marcheur_de_guerre": { "name": "Bottes de marcheur de guerre" },
            "bottes_d_explorateur": { "name": "Bottes d'explorateur" },
            "gants_du_tireur": { "name": "Gants du tireur" },
            "masque_du_filou": { "name": "Masque du filou" },
            "justaucorps_de_traqueur": { "name": "Justaucorps de traqueur" },
            "carquois_de_vitesse": { "name": "Carquois de vitesse" },
            "masque_de_franc_tireur": { "name": "Masque de franc-tireur" },
            "amulette_de_la_fortune": { "name": "Amulette de la fortune" },
            "broche_du_diplomate": { "name": "Broche du diplomate" },
            "manteau_de_l_illusionniste": { "name": "Manteau de l'illusionniste" },
            "sceptre_du_sorcier_novice": { "name": "Sceptre du sorcier novice" },
            "sandales_de_conjurateur": { "name": "Sandales de conjurateur" },
            "orbe_tempetueux": { "name": "Orbe tempétueux" },
            "gantelets_runiques": { "name": "Gantelets runiques" },
            "bague_de_lutteur": { "name": "Bague de lutteur" }
        },
        "epic": {
            "armure_du_gardien": { "name": "Armure du Gardien" },
            "ceinture_de_puissance": { "name": "Ceinture de Puissance" },
            "heaume_de_champion": { "name": "Heaume de Champion" },
            "main_de_gloire": { "name": "Main de gloire" },
            "anneau_du_paria": { "name": "Anneau du paria" },
            "corne_de_guerre_du_berserker": { "name": "Corne de guerre du berserker" },
            "gantelets_de_fureur": { "name": "Gantelets de Fureur" },
            "greves_du_defenseur": { "name": "Grèves du Défenseur" },
            "lame_du_crepuscule": { "name": "Lame du crépuscule" },
            "heaume_du_juggernaut": { "name": "Heaume du Juggernaut" },
            "hache_de_bourreau": { "name": "Hache de bourreau" },
            "arc_de_chasseur_d_ombres": { "name": "Arc de chasseur d'ombres" },
            "bottes_de_l_echo": { "name": "Bottes de l'Écho" },
            "dagues_de_l_ombre_dansante": { "name": "Dagues de l'ombre dansante" },
            "jambieres_de_l_assassin": { "name": "Jambières de l'assassin" },
            "sandales_ailees": { "name": "Sandales ailées" },
            "arc_long_en_if": { "name": "Arc long en if" },
            "bottes_de_l_arpenteur_silencieux": { "name": "Bottes de l'arpenteur silencieux" },
            "main_de_precision": { "name": "Main de précision" },
            "diademe_de_l_archimage": { "name": "Diadème de l'Archimage" },
            "grimoire_des_arcanes": { "name": "Grimoire des arcanes" },
            "mantelet_du_stratege": { "name": "Mantelet du stratège" },
            "robe_de_l_erudit_de_guerre": { "name": "Robe de l'érudit de guerre" },
            "talisman_de_mana": { "name": "Talisman de mana" },
            "gant_du_savoir": { "name": "Gant du savoir" },
            "jambieres_en_acier_runique": { "name": "Jambières en acier runique" },
            "anneau_confrerie": { "name": "Anneau de la Confrérie" },
        },
        "legendary": {
            "collier_de_l_infinite": { "name": "Collier de l'Infinité" },
            "talisman_du_parieur": { "name": "Talisman du parieur" },
            "volonte_d_adamantium": { "name": "Volonté d'Adamantium" },
            "armure_de_sang": { "name": "Armure de Sang" },
            "bottes_telluriques": { "name": "Bottes telluriques" },
            "briselame": { "name": "Briselame" },
            "kriss_de_sacrifice": { "name": "Kriss de sacrifice" },
            "le_mur_du_roi_dechu": { "name": "Le Mur du Roi déchu" },
            "poignes_du_titan": { "name": "Poignes du titan" },
            "marteau_meteore": { "name": "Marteau-Météore" },
            "gantelets_du_colosse": { "name": "Gantelets du Colosse" },
            "fleche_celeste": { "name": "Flèche Céleste" },
            "griffes_de_l_ombre": { "name": "Griffes de l'Ombre" },
            "sandales_de_velocite": { "name": "Sandales de Vélocité" },
            "murmure_du_vent": { "name": "Murmure du Vent" },
            "manteau_de_l_insaisissable": { "name": "Manteau de l'insaisissable" },
            "baton_du_sage_ancien": { "name": "Bâton du Sage Ancien" },
            "couronne_de_la_prophetie": { "name": "Couronne de la Prophétie" },
            "jambieres_runiques": { "name": "Jambières Runiques" },
            "livre_des_ombres": { "name": "Livre des ombres" },
            "masque_du_vide": { "name": "Masque du Vide" },
            "baton_du_vide": { "name": "Bâton du Vide" },
            "chapeau_de_l_archonte": { "name": "Chapeau de l'Archonte" }
        },
    "mythic": {
        "casque_de_domination": { "name": "Casque de domination" },
        "coeur_du_golem_primordial": { "name": "Coeur du Golem primordial" },
        "gantelets_de_la_divinite": { "name": "Gantelets de la Divinité" },
        "jambieres_de_l_eternite": { "name": "Jambières de l'Éternité" },
        "l_oeil_du_neant": { "name": "L'Œil du Néant" },
        "le_voile_des_etoiles": { "name": "Le Voile des Étoiles" },
        "les_chaussures_des_songes": { "name": "Les Chaussures des Songes" },
        "les_jambieres_du_titan": { "name": "Les Jambières du Titan" },
        "robe_du_cosmos": { "name": "Robe du Cosmos" },
        "tunique_du_phoenix": { "name": "Tunique du Phoenix" },
        "bottes_de_l_errant_temporel": { "name": "Bottes de l'Errant Temporel" },
        "garde_du_destin": { "name": "Garde du Destin" },
        "l_epee_du_destin": { "name": "L'Épée du Destin" },
        "cuirasse_du_colosse": { "name": "Cuirasse du Colosse" },
        "greves_du_titan_sismique": { "name": "Grèves du Titan Sismique" },
        "sceau_du_roi_barbare": { "name": "Sceau du Roi Barbare" },
        "bottes_des_sept_lieues": { "name": "Bottes des Sept Lieues" },
        "l_arc_de_la_creation": { "name": "L'Arc de la Création" },
        "gambison_de_l_astre_mortel": { "name": "Gambison de l'Astre Mortel" },
        "gantelets_du_vif_argent": { "name": "Gantelets du Vif-Argent" },
        "masque_du_faucon_pelerin": { "name": "Masque du Faucon Pèlerin" },
        "le_grimoire_final": { "name": "Le Grimoire Final" },
        "le_livre_des_mondes": { "name": "Le Livre des Mondes" },
        "robe_du_tisseur_de_sorts": { "name": "Robe du Tisseur de Sorts" },
        "poignes_de_mana_glace": { "name": "Poignes de Mana-Glace" },
        "talisman_de_l_archonte": { "name": "Talisman de l'Archonte" },
        "les_etreintes_de_l_entropie": { "name": "Les Étreintes de l'entropie" },
        "gantelets_de_la_flamme_glaciale": { "name": "Gantelets de la Flamme Glaciale" },
        "diademe_de_l_oeil_arcanique": { "name": "Diadème de l'Œil Arcanique" },
        "jugement": { "name": "Jugement" }
    },
    "craft_only": {
        "plastron_de_golem": { "name": "Plastron de Golem" },
        "gantelets_de_saignement": { "name": "Gantelets de Saignement" },
        "lame_petrifiante": { "name": "Lame Pétrifiante" },
        "hache_du_berserker": { "name": "Hache du Berserker" },
        "bouclier_carapace": { "name": "Bouclier Carapace" },
        "brisecoeur_runique": { "name": "Brisecoeur Runique" },
        "bottes_ailees": { "name": "Bottes Ailées" },
        "cape_etheree": { "name": "Cape Éthérée" },
        "pendentif_spectral": { "name": "Pendentif Spectral" },
        "heaume_de_clairvoyance": { "name": "Heaume de Clairvoyance" },
        "diademe_de_benediction": { "name": "Diadème de Bénédiction" },
        "couronne_de_seraphin": { "name": "Couronne de Séraphin" },
        "jambieres_en_chitine": { "name": "Jambières en Chitine" },
        "armure_de_l_abysse": { "name": "Armure de l'Abysse" },
        "cuirasse_draconique": { "name": "Cuirasse Draconique" },
        "le_dernier_rempart": { "name": "Le Dernier Rempart" },
        "entropie_lame_du_vide": { "name": "Entropie (Lame du Vide)" }
    },
},
    "sets": {
        "armure_du_mercenaire": {
            "name": "Armure du Mercenaire Endurci",
            "bonus2_name": "Peau de Fer",
            "bonus5_name": "Force du Vétéran",
            "bonus7_name": "Représailles",
            "item_head": "Casque de Mercenaire",
            "item_torso": "Plastron de Mercenaire",
            "item_legs": "Jambières de Mercenaire",
            "item_feet": "Bottes de Mercenaire",
            "item_hands": "Gantelets de Mercenaire",
            "item_weapon": "Épée de Mercenaire",
            "item_accessory": "Talisman de Mercenaire"
        },
        "tenue_du_franc_tireur": {
            "name": "Tenue du Franc-Tireur",
            "bonus2_name": "Vivacité",
            "bonus5_name": "Œil de Faucon",
            "bonus7_name": "Point Faible",
            "item_head": "Capuche de Franc-Tireur",
            "item_torso": "Veste de Franc-Tireur",
            "item_legs": "Pantalon de Franc-Tireur",
            "item_feet": "Bottes de Franc-Tireur",
            "item_hands": "Gants de Franc-Tireur",
            "item_weapon": "Arc de Franc-Tireur",
            "item_accessory": "Carquois de Franc-Tireur"
        },
        "habits_du_conjurateur": {
            "name": "Habits du Conjurateur",
            "bonus2_name": "Esprit Vif",
            "bonus5_name": "Méditation",
            "bonus7_name": "Focalisation Arcanique",
            "item_head": "Chapeau de Conjurateur",
            "item_torso": "Robe de Conjurateur",
            "item_legs": "Chausses de Conjurateur",
            "item_feet": "Sandales de Conjurateur",
            "item_hands": "Gants de Conjurateur",
            "item_weapon": "Bâton de Conjurateur",
            "item_accessory": "Orbe de Conjurateur"
        },
        "panoplie_de_l_aventurier": {
            "name": "Panoplie de l'Aventurier",
            "bonus2_name": "Endurance du Voyageur",
            "bonus5_name": "Polyvalence",
            "bonus7_name": "Chercheur de Trésors",
            "item_head": "Chapeau d'Aventurier",
            "item_torso": "Tunique d'Aventurier",
            "item_legs": "Pantalon d'Aventurier",
            "item_feet": "Bottes d'Aventurier",
            "item_hands": "Gants d'Aventurier",
            "item_weapon": "Coutelas d'Aventurier",
            "item_accessory": "Sacoche d'Aventurier"
        },
        "tenue_du_belluaire": {
            "name": "Tenue du Belluaire",
            "bonus2_name": "Peau Épaisse",
            "bonus5_name": "Rage du Combat",
            "bonus7_name": "Instinct Sauvage",
            "item_head": "Casque en Os de Bête",
            "item_torso": "Harnois en Peau de Monstre",
            "item_legs": "Jambières de Chasseur de Primes",
            "item_feet": "Bottes de Traqueur",
            "item_hands": "Poignes en Écaille",
            "item_weapon": "Hache Déchireuse",
            "item_accessory": "Trophée de Chasse"
        },
        "regalia_du_predateur": {
            "name": "Régalia du Prédateur",
            "bonus2_name": "Instinct du Chasseur",
            "bonus5_name": "Poursuite Implacable",
            "bonus7_name": "Maître de la Traque",
            "item_head": "Heaume du Prédateur",
            "item_torso": "Cuirasse du Prédateur",
            "item_legs": "Jambières du Prédateur",
            "item_feet": "Bottes du Prédateur",
            "item_hands": "Poignes du Prédateur",
            "item_weapon": "Croc du Prédateur",
            "item_accessory": "Oeil du Prédateur"
        },
        "apparat_de_l_ombre_fileuse": {
            "name": "Apparat de l'Ombre Fileuse",
            "bonus2_name": "Précision Mortelle",
            "bonus5_name": "Tir Éclair",
            "bonus7_name": "Danse de la Mort",
            "item_head": "Capuche de l'Ombre",
            "item_torso": "Tunique de l'Ombre",
            "item_legs": "Grèves de l'Ombre",
            "item_feet": "Bottes de l'Ombre",
            "item_hands": "Gants de l'Ombre",
            "item_weapon": "Murmure (Arc)",
            "item_accessory": "Carquois de l'Ombre"
        },
        "ornements_de_l_arcaniste": {
            "name": "Ornements de l'Arcaniste",
            "bonus2_name": "Canalisation d'Énergie",
            "bonus5_name": "Savoir Ancien",
            "bonus7_name": "Maîtrise Élémentaire",
            "item_head": "Diadème de l'Arcaniste",
            "item_torso": "Robe de l'Arcaniste",
            "item_legs": "Jambières de l'Arcaniste",
            "item_feet": "Chaussons de l'Arcaniste",
            "item_hands": "Gants de l'Arcaniste",
            "item_weapon": "Bâton de l'Arcaniste",
            "item_accessory": "Tome de l'Arcaniste"
        },
        "armure_du_gardien_implacable": {
            "name": "Armure du Gardien Implacable",
            "bonus2_name": "Bastion Incassable",
            "bonus5_name": "Volonté de Fer",
            "bonus7_name": "Ancre du Monde",
            "item_head": "Grand Heaume du Gardien",
            "item_torso": "Plastron du Gardien",
            "item_legs": "Grèves du Gardien",
            "item_feet": "Solerets du Gardien",
            "item_hands": "Gantelets du Gardien",
            "item_weapon": "Le Mur (Bouclier)",
            "item_accessory": "Sceau du Gardien"
        },
        "armure_du_tyran_sanglant": {
            "name": "Armure du Tyran Sanglant",
            "bonus2_name": "Soif de Sang",
            "bonus5_name": "Marque du Tyran",
            "bonus7_name": "Domination Absolue",
            "item_head": "Visage du Tyran",
            "item_torso": "Cœur du Tyran",
            "item_legs": "Marche du Tyran",
            "item_feet": "Éperons du Tyran",
            "item_hands": "Poigne du Tyran",
            "item_weapon": "Fendoir du Tyran",
            "item_accessory": "Sceau du Tyran"
        },
        "panoplie_de_l_oeil_de_lynx": {
            "name": "Panoplie de l'Œil-de-Lynx",
            "bonus2_name": "Regard Perçant",
            "bonus5_name": "Instinct Aiguisé",
            "bonus7_name": "Flèche Tempête",
            "item_head": "Viseur de l'Œil-de-Lynx",
            "item_torso": "Harnois de l'Œil-de-Lynx",
            "item_legs": "Jambières de l'Œil-de-Lynx",
            "item_feet": "Bottes de l'Œil-de-Lynx",
            "item_hands": "Gants de l'Œil-de-Lynx",
            "item_weapon": "Arc de l'Œil-de-Lynx",
            "item_accessory": "Talisman de l'Œil-de-Lynx"
        },
        "vestiges_du_tisseur_de_tempetes": {
            "name": "Vestiges du Tisseur de Tempêtes",
            "bonus2_name": "Conduit Arcanique",
            "bonus5_name": "Esprit Calme",
            "bonus7_name": "Déchaînement Élémentaire",
            "item_head": "Cercle du Tisseur de Tempêtes",
            "item_torso": "Robe du Tisseur de Tempêtes",
            "item_legs": "Fuseau du Tisseur de Tempêtes",
            "item_feet": "Pas du Tisseur de Tempêtes",
            "item_hands": "Mains du Tisseur de Tempêtes",
            "item_weapon": "Bâton du Tisseur de Tempêtes",
            "item_accessory": "Noyau du Tisseur de Tempêtes"
        },
        "panoplie_du_seigneur_de_guerre": {
            "name": "Panoplie du Seigneur de Guerre",
            "bonus2_name": "Indomptable",
            "bonus5_name": "Fureur Sanguinaire",
            "bonus7_name": "Apocalypse",
            "item_head": "Heaume du Seigneur de Guerre",
            "item_torso": "Cuirasse du Seigneur de Guerre",
            "item_legs": "Jambières du Seigneur de Guerre",
            "item_feet": "Bottes du Seigneur de Guerre",
            "item_hands": "Poings du Seigneur de Guerre",
            "item_weapon": "Rage (Hache)",
            "item_accessory": "Étendard du Seigneur de Guerre"
        },
        "armure_de_l_oeil_fantome": {
            "name": "Armure de l'Œil Fantôme",
            "bonus2_name": "Frappe Invisible",
            "bonus5_name": "Vitesse Fantomatique",
            "bonus7_name": "Un avec les Ombres",
            "item_head": "Masque de l'Œil Fantôme",
            "item_torso": "Tunique de l'Œil Fantôme",
            "item_legs": "Jambières de l'Œil Fantôme",
            "item_feet": "Bottes de l'Œil Fantôme",
            "item_hands": "Gants de l'Œil Fantôme",
            "item_weapon": "Silence (Arc Long)",
            "item_accessory": "Broche de l'Œil Fantôme"
        },
        "regalia_de_l_esprit_du_monde": {
            "name": "Régalia de l'Esprit du Monde",
            "bonus2_name": "Écho Arcanique",
            "bonus5_name": "Barrière Arcanique",
            "bonus7_name": "Tempête Parfaite",
            "item_head": "Couronne de l'Esprit du Monde",
            "item_torso": "Manteau de l'Esprit du Monde",
            "item_legs": "Jambières de l'Esprit du Monde",
            "item_feet": "Sandales de l'Esprit du Monde",
            "item_hands": "Gants de l'Esprit du Monde",
            "item_weapon": "Sceptre de l'Esprit du Monde",
            "item_accessory": "Orbe de l'Esprit du Monde"
        },
        "tenue_de_l_archon_celeste": {
            "name": "Tenue de l'Archon Céleste",
            "bonus2_name": "Aura de Puissance",
            "bonus5_name": "Précision Divine",
            "bonus7_name": "Jugement Divin",
            "item_head": "Diadème de l'Archon",
            "item_torso": "Robe de l'Archon",
            "item_legs": "Braies de l'Archon",
            "item_feet": "Sandales de l'Archon",
            "item_hands": "Gants de l'Archon",
            "item_weapon": "Sceptre de l'Archon",
            "item_accessory": "Orbe de l'Archon"
        }
    },
    "rarity": {
    "common": "Commun",
    "uncommon": "Peu Commun",
    "rare": "Rare",
    "epic": "Épique",
    "legendary": "Légendaire",
    "mythic": "Mythique"
    },
    "artefacts": {
        "egide_du_herisson": {
            "name": "Égide du Hérisson",
            "description": "Transforme votre corps en forteresse hérissée de piques. Idéal pour ceux qui aiment que leurs ennemis s'empalent dessus."
        },
        "pacte_du_sanguinaire": {
            "name": "Pacte du Sanguinaire",
            "description": "Un pacte simple : la vitalité de vos ennemis devient la vôtre, mais votre chair est plus tendre à leurs coups."
        },
        "talisman_du_point_faible": {
            "name": "Talisman du Point Faible",
            "description": "Vous sacrifiez votre robustesse pour une connaissance parfaite des points faibles ennemis. Chaque coup critique est dévastateur."
        },
        "dague_rituelle_echancree": {
            "name": "Dague Rituelle Échancrée",
            "description": "Cette dague vous lie à l'art du saignement. Vos coups ouvrent des plaies béantes, mais vous ne pouvez plus vous soigner par l'impact."
        },
        "pierre_de_flux": {
            "name": "Pierre de Flux",
            "description": "Une gemme qui transforme votre corps en un conduit de mana pur, au détriment de votre enveloppe charnelle."
        },
        "toge_du_stoique": {
            "name": "Toge du Stoïque",
            "description": "Une robe enchantée pour endurer, non pour détruire. Vous devenez un bastion de résistance magique."
        },
        "marteau_de_stase_temporelle": {
            "name": "Marteau de Stase Temporelle",
            "description": "Chaque impact a une chance de figer l'ennemi dans le temps, mais vos coups perdent de leur force brute."
        },
        "idole_du_martyr": {
            "name": "Idole du Martyr",
            "description": "Vous refusez les soins conventionnels, ne comptant que sur le sang de vos ennemis pour survivre au cœur de la mêlée."
        },
        "plume_de_zephyr": {
            "name": "Plume de Zéphyr",
            "description": "Incarnez le vent. Votre agilité devient inégalée, mais votre force physique s'étiole."
        },
        "de_du_destin_truque": {
            "name": "Dé du Destin Truqué",
            "description": "Vous misez tout sur le coup parfait. Vos coups critiques sont surpuissants, mais il vous faudra trouver la chance ailleurs."
        },
        "diademe_de_l_imprudent": {
            "name": "Diadème de l'Imprudent",
            "description": "Un pouvoir immense en échange d'une fragilité extrême. Le summum du 'Glass Cannon'."
        },
        "sceau_de_l_altruiste": {
            "name": "Sceau de l'Altruiste",
            "description": "Vos soins deviennent divins, mais votre magie offensive s'affaiblit."
        },
        "voeu_du_gardien": {
            "name": "Vœu du Gardien",
            "description": "Devenez un mur infranchissable, mais abandonnez toute idée de finesse et de coups de chance."
        },
        "fragment_de_fureur_pure": {
            "name": "Fragment de Fureur Pure",
            "description": "Une puissance offensive inégalée, au prix d'une constitution affaiblie."
        },
        "aiguille_de_verre": {
            "name": "Aiguille de Verre",
            "description": "Vos flèches percent n'importe quelle armure, mais votre corps est aussi fragile que du verre."
        },
        "calice_de_magie_sanguine": {
            "name": "Calice de Magie Sanguine",
            "description": "Transformez votre vitalité en pouvoir arcanique. Chaque sort est une blessure et un soin."
        },
        "coeur_du_berserker": {
            "name": "Cœur du Berserker",
            "description": "Libérez une rage pure qui double vos dégâts, mais vous expose complètement."
        },
        "volonte_du_titan": {
            "name": "Volonté du Titan",
            "description": "Une force de la nature inarrêtable qui broie ses ennemis sous son poids, mais lente et maladroite."
        },
        "oeil_de_lynx_fantome": {
            "name": "Œil de Lynx Fantôme",
            "description": "Votre œil voit toutes les failles, vous offrant une chance de critique presque surnaturelle, mais votre corps frêle ne peut le supporter longtemps."
        },
        "carquois_infini_paradoxal": {
            "name": "Carquois de l'Infini Paradoxal",
            "description": "Vos coups sont d'une précision mortelle, mais cette concentration vous empêche de voir les trésors du monde."
        },
        "orbe_de_surcharge_arcanique": {
            "name": "Orbe de Surcharge Arcanique",
            "description": "Une sphère instable qui amplifie la magie brute, mais en consomme davantage. Pour les mages qui n'ont pas peur de vider leurs réserves."
        },
        "fragment_du_nexus": {
            "name": "Fragment du Nexus",
            "description": "Canalisez la magie pure, devenant un conduit de pouvoir, mais votre corps peine à contenir une telle énergie."
        }
    },
    "bosses": {
        "grand_gobelin_grognon": { "name": "Grand Gobelin Grognon" },
        "ogre_colossal": { "name": "Ogre Colossal" },
        "dragonnet_de_feu": { "name": "Dragonnet de Feu" },
        "seigneur_vampire": { "name": "Seigneur Vampire" },
        "lich_archimage": { "name": "Lich Archimage" },
        "guild_boss_1": { "name": "Titan Corrompu de la Guilde" }
    },
    "enemies": {
        "rat_geant": { "name": "Rat Géant", "description": "Un rongeur anormalement grand et agressif, souvent trouvé dans les caves et les égouts." },
        "reine_des_rats": { "name": "Reine des Rats", "description": "Une créature difforme et boursouflée qui commande des nuées de rats plus petits. Sa morsure peut transmettre des maladies." },
        "bandit": { "name": "Bandit", "description": "Un hors-la-loi opportuniste qui s'attaque aux voyageurs imprudents. N'est dangereux qu'en groupe." },
        "chef_bandit": { "name": "Chef des Bandits", "description": "Plus fort et mieux équipé qu'un bandit ordinaire, il dirige sa petite bande d'une main de fer." },
        "golem_pierre": { "name": "Golem de Pierre", "description": "Un gardien magique fait de pierre et de terre. Lent mais incroyablement résistant." },
        "mini_golem_pierre": { "name": "Mini Golem de Pierre", "description": "Une version plus petite et moins résistante du golem de pierre, mais tout aussi déterminé." },
        "gardien_de_pierre_eterne": { "name": "Gardien de Pierre Éternel", "description": "Un golem ancestral imprégné d'une magie puissante, protégeant des secrets oubliés." },
        "elementaire_eau": { "name": "Élémentaire d'Eau", "description": "Un esprit de l'eau capable de changer de forme. Ses attaques sont fluides et difficiles à parer." },
        "insecte_mineur": { "name": "Insecte Mineur", "description": "Une créature chitineuse qui creuse des galeries. Sa carapace est étonnamment solide." },
        "araignee_de_cave": { "name": "Araignée de Cave", "description": "Une araignée de taille modeste mais au venin paralysant, qui tisse ses toiles dans l'obscurité." },
        "loup_affame": { "name": "Loup Affamé", "description": "Rapide et vicieux, ce loup attaque en meute et est poussé par une faim insatiable." },
        "sanglier_furieux": { "name": "Sanglier Furieux", "description": "Une force de la nature brute, chargeant tout ce qui bouge avec ses défenses acérées." },
        "araignee_geante": { "name": "Araignée Géante", "description": "Une prédatrice bien plus grande que ses cousines des caves, capable de piéger un homme dans sa toile." },
        "griffon": { "name": "Griffon", "description": "Une créature majestueuse mi-aigle, mi-lion. Territorial et redoutable dans les airs." },
        "basilic": { "name": "Basilic", "description": "Un reptile redouté dont le regard peut pétrifier ses victimes. Sa peau est épaisse comme le roc." },
        "scorpion_des_sables": { "name": "Scorpion des Sables", "description": "Un scorpion du désert dont le venin est particulièrement virulent." },
        "ver_des_sables": { "name": "Ver des Sables Géant", "description": "Une créature colossale qui se déplace sous le sable pour surprendre ses proies." },
        "gobelin_frondeur": { "name": "Gobelin Frondeur", "description": "Faible mais agaçant, il harcèle ses ennemis à distance avec des projectiles." },
        "chef_gobelin": { "name": "Chef Gobelin Dissonant", "description": "Plus malin et plus fort qu'un gobelin normal, il est souvent corrompu par la Dissonance." },
        "orc_berserker": { "name": "Orc Berserker", "description": "Un combattant orc qui entre dans une rage aveugle au combat, ignorant la douleur." },
        "squelette_guerrier": { "name": "Squelette Guerrier", "description": "Un soldat mort-vivant animé par une magie noire. Il se bat sans peur ni pitié." },
        "necromancien_apprenti": { "name": "Nécromancien Apprenti", "description": "Un sorcier qui a touché à des arts interdits, capable de réanimer les morts." },
        "cultiste_zelote": { "name": "Cultiste Zélote", "description": "Un fanatique dévoué à une sombre entité, prêt à mourir pour sa cause." },
        "garde_automate": { "name": "Garde Automate", "description": "Un gardien mécanique infatigable, construit pour protéger des lieux anciens." },
        "initie_de_l_ombre": { "name": "Initié de l'Ombre", "description": "Un membre de bas rang d'une guilde d'assassins, rapide et furtif." },
        "assassin_de_l_ombre": { "name": "Assassin de l'Ombre", "description": "Un tueur professionnel qui utilise les ombres pour frapper sans être vu." },
        "maitre_de_l_ombre": { "name": "Maître de l'Ombre", "description": "Un chef de guilde assassin, dont la maîtrise de la furtivité et des poisons est légendaire." },
        "spectre_gemissant": { "name": "Spectre Gémissant", "description": "L'esprit tourmenté d'un défunt, dont les cris peuvent glacer le sang et affaiblir l'âme." },
        "elementaire_de_magma": { "name": "Élémentaire de Magma", "description": "Un esprit de feu et de terre en fusion, dont le simple contact peut faire fondre l'acier." },
        "harpie": { "name": "Harpie", "description": "Une créature mi-femme, mi-oiseau, dont les cris stridents sont aussi dangereux que ses serres." },
        "momie_gardienne": { "name": "Momie Gardienne", "description": "Un ancien gardien de tombeau, dont les bandelettes sont imprégnées de malédictions." },
        "djinn": { "name": "Djinn", "description": "Un puissant esprit élémentaire, capable de manipuler les vents et le sable à sa guise." },
        "le_collecteur": { "name": "Le Collecteur (Golem)", "description": "Un golem unique qui semble collectionner et absorber l'énergie des objets magiques." },
        "chimere": { "name": "Chimère", "description": "Une abomination alchimique, un mélange de plusieurs créatures en une seule entité furieuse." },
        "chimere_renforcee": { "name": "Chimère Renforcée", "description": "Le chef-d'œuvre de Larry, une version améliorée et bien plus mortelle de la Chimère classique." },
        "hydre_des_marais": { "name": "Hydre des Marais", "description": "Une créature reptilienne à plusieurs têtes, dont chaque tête coupée peut en faire repousser deux." },
        "otyugh": { "name": "Otyugh", "description": "Une créature immonde qui se cache dans les déchets et les égouts, attaquant avec ses tentacules." },
        "minotaure": { "name": "Minotaure", "description": "Une bête mi-homme, mi-taureau, dotée d'une force brute et d'un sens de l'orientation inexistant." },
        "profond_guerrier": { "name": "Guerrier Profond", "description": "Une créature amphibienne humanoïde qui sort des profondeurs de l'océan pour piller les côtes." },
        "profond_champion": { "name": "Champion Profond", "description": "Un guerrier Profond d'élite, plus grand, plus fort et lourdement armé." },
        "archange": { "name": "Archange de Lumière", "description": "Un être céleste d'une puissance immense, gardien d'un lieu ou d'un artefact divin." },
        "dragon_rouge_ancien": { "name": "Dragon Rouge Ancien", "description": "Un des dragons les plus anciens et les plus puissants, dont le souffle peut réduire une ville en cendres." },
        "archimage_dement": { "name": "Archimage Dément", "description": "Un sorcier dont l'esprit a été brisé par un savoir trop vaste, le rendant imprévisible et dangereux." },
        "roi_singe_esprit": { "name": "Esprit du Roi Singe", "description": "L'esprit facétieux et incroyablement puissant d'un ancien roi-dieu, maître de l'illusion." },
        "shoggoth": { "name": "Shoggoth", "description": "Une masse protoplasmique d'yeux et de bouches, une créature d'un autre âge dont la simple vue rend fou." },
        "golem_pierre_mythique": { "name": "Gardien de Pierre Mythique", "description": "Un golem si ancien qu'il est devenu une partie de la montagne elle-même, animé par la magie la plus primordiale." },
        "roi_barbare": { "name": "Hrothgar, le Roi Barbare", "description": "Le plus grand chef de guerre des tribus du nord, dont la force est légendaire." },
        "archere_elfe": { "name": "Lirael, l'Archère Elfe", "description": "Une archère elfe dont les flèches sont guidées par la magie et ne manquent jamais leur cible." },
        "chevalier_eternel": { "name": "Sir Gideon, le Chevalier Éternel", "description": "Un chevalier maudit à combattre pour l'éternité, dont l'expérience du combat est sans égale." },
        "forgeron_demon": { "name": "Forgeron des Âmes", "description": "Un démon qui forge des armes maudites en utilisant les âmes des mortels comme combustible." },
        "demon_mineur": { "name": "Démon Mineur", "description": "Un soldat de base des légions infernales, cruel et sans pitié." },
        "general_demon": { "name": "Général Démon", "description": "Un commandant des armées démoniaques, doté d'une force et d'une stratégie redoutables." },
        "horreur_dimensionnelle": { "name": "Horreur Dimensionnelle", "description": "Une créature issue d'une autre réalité, dont la forme défie les lois de la géométrie." },
        "griffon_corrompu": { "name": "Griffon Corrompu", "description": "Un noble griffon dont l'esprit a été tordu par la corruption, le transformant en une machine à tuer." },
        "dragon_corrompu": { "name": "Dragon Ancien Corrompu", "description": "Un dragon ancien dont la puissance a été décuplée et pervertie par une force maléfique." },
        "dieu_fou": { "name": "Malakor, le Dieu Fou", "description": "Un dieu déchu dont l'esprit a sombré dans la folie, menaçant de défaire la création." },
        "double_sombre": { "name": "Double Sombre", "description": "Votre reflet issu d'un monde miroir, incarnant tous vos pires instincts." },
        "ouroboros": { "name": "Ouroboros, Gardien du Cycle", "description": "Le serpent cosmique qui se mord la queue, gardien de l'éternel recommencement." },
        "talos_reforge": { "name": "Talos reforgé", "description": "Le colosse de bronze divin, reconstruit et amélioré avec une magie inconnue." },
        "scarabee_goliath": { "name": "Scarabée-Goliath", "description": "Un insecte géant à la carapace aussi dure que le fer, qui protège agressivement son territoire souterrain." },
        "ver_de_racine": { "name": "Ver de Racine Blindé", "description": "Une créature vermiforme massive qui se nourrit des racines des plantes les plus anciennes, dotée d'une peau épaisse." },
        "tutorial_dummy": { "name": "Effigie Corrompue", "description": "Un simple mannequin d'entraînement, animé par une faible étincelle de Dissonance. Parfait pour s'exercer." },
        "loup_dissonant": { "name": "Loup Dissonant", "description": "Un loup dont le corps est parcouru de cristaux violets. Sa fureur n'est plus naturelle, elle est alimentée par le chaos." },
        "gardien_erode": { "name": "Gardien Érodé", "description": "Un golem de pierre usé par le temps, dont la magie de protection a été affaiblie et pervertie par la Dissonance." },
        "esprit_ancien_tourmente": { "name": "Esprit Ancien Tourmenté", "description": "Le spectre d'un sage ou d'un héros, dont le repos a été troublé par la Dissonance, le rendant hostile et confus." },
        "heraut_du_silence": { "name": "Héraut du Silence", "description": "Une créature énigmatique, messagère d'une puissance supérieure, qui combat avec une précision froide et silencieuse." },
        "juge_dissonant": { "name": "Juge Dissonant", "description": "Une construction de cristal noir envoyée par Larry, conçue pour analyser et contrer les pouvoirs des êtres 'ascensionnés'." },
        "fragment_de_dissonance_mineur": { "name": "Fragment de Dissonance Mineur", "description": "Une manifestation cristalline et chaotique de la Dissonance pure, imprévisible et agressive." },
        "gardien_verrouille": { "name": "Gardien Verrouillé", "description": "Un ancien golem de protection, maintenant alimenté et corrompu par une faille de Dissonance qu'il était censé contenir." },
        "arme_de_larry": { "name": "Arme de Larry", "description": "Une créature humanoïde forgée à partir de Dissonance pure, conçue pour le combat et l'élimination de cibles précises." },
        "harmoniste_corrompu": { "name": "Harmoniste Corrompu", "description": "Un ancien membre de l'Ordre de l'Harmonie, transformé par Larry en un instrument vivant de Dissonance, capable de manipuler la mélodie du chaos." },
        "larry_invincible": { "name": "Projection de Larry", "description": "Une illusion de Larry, utilisée pour tester et tourmenter ses adversaires sans prendre le moindre risque." },
        "fragment_de_douleur": { "name": "Fragment de Douleur", "description": "Une manifestation pure de la souffrance, invoquée par le Titan." }
    },
    "bounties": {
        "bf01": { "name": "Griffe-Pourrie, le Roi des Rats" },
        "bf02": { "name": "Groin-Féroce, le Père des Sangliers" },
        "bf03": { "name": "Klarg, le Chef de Clan Gobelin" },
        "bf04": { "name": "Patte-Velue, la Matriarche Tisseuse" },
        "bf05": { "name": "Capitaine Cliquettant" },
        "bf06": { "name": "Le Maraudeur Masqué" },
        "bf07": { "name": "Le Loup Alpha Grise-Patte" },
        "bf08": { "name": "Le Fossoyeur Agité" },
        "bf09": { "name": "Le Gobelin Bricoleur Fou" },
        "bf10": { "name": "La Harpie Hurlevent" },
        "bm01": { "name": "Croc-d'Acier, la Terreur des Plaines" },
        "bm02": { "name": "Le Gardien Fracturé" },
        "bm03": { "name": "Akhen-Sut, le Seigneur Momifié" },
        "bm04": { "name": "Plume-Tempête, l'Ancien Griffon" },
        "bm05": { "name": "Astérion, le Champion du Labyrinthe" },
        "bm06": { "name": "Le Nécromancien Blême" },
        "bm07": { "name": "Le Scorpion d'Onyx" },
        "bm08": { "name": "Grog-nak, le Berserker Indomptable" },
        "bm09": { "name": "L'Élémentaire de Saumure" },
        "bm10": { "name": "Le Garde Automate Défaillant" },
        "bd01": { "name": "La Lame Silencieuse" },
        "bd02": { "name": "Regard-de-Pierre, le Roi Basilic" },
        "bd03": { "name": "Malik, le Maître des Vents" },
        "bd04": { "name": "K'tharr, le Héraut des Profondeurs" },
        "bd05": { "name": "L'Abomination Primordiale" },
        "bd06": { "name": "Hydre Mère des Marais Fétides" },
        "bd07": { "name": "Le Ver des Sables Alpha" },
        "bd08": { "name": "Le Shogun Squelette" },
        "bd09": { "name": "Le Collecteur Surchargé" },
        "bd10": { "name": "Le Démon Forgeron des Âmes" },
        "be01": { "name": "Xar'thul, le Général des Abysses" },
        "be02": { "name": "Vex'lor, l'Archiliche Immortelle" },
        "be03": { "name": "Ignis Prime, la Calamité Incarnée" },
        "be04": { "name": "L'Esprit Vengeur du Roi Singe" },
        "be05": { "name": "Talos, le Colosse Reforgé" },
        "be06": { "name": "Le Shoggoth Affamé" },
        "be07": { "name": "L'Archange Déchu" },
        "be08": { "name": "L'Horreur qui Marche" },
        "be09": { "name": "Hrothgar, le Roi Revenant" },
        "be10": { "name": "Ouroboros, la Fin des Cycles" }
    },
    "expeditions": {
        "alerts": {
            "start_busy": "Vous ne pouvez pas lancer une expédition maintenant, vous êtes occupé !",
            "bounty_lost": "Vous avez été vaincu par votre cible. La prime vous échappe pour aujourd'hui.",
            "lost_and_empty_handed": "Vous vous êtes perdu et rentrez bredouille.",
            "attempt_failed": "Votre tentative a échoué...",
            "succumbed_to_wounds": "Vous avez succombé à vos blessures... Tout est perdu.",
            "merchant_out_of_stock": "Cet article est en rupture de stock !",
            "bought_item": "Vous avez acheté {itemName} !",
            "not_enough_resources": "Pas assez de ressources !",
            "sold_resource": "Vous avez vendu {amount} {resourceName} pour {price} 💠.",
            "sell_bonus": " (Bonus : +{bonus} 💠)",
            "not_enough_to_sell": "Vous n'avez pas assez de cette ressource à vendre !",
            "fled_expedition_ended": "Vous avez fui le combat, mettant fin prématurément à votre expédition.",
            "not_enough_energy": "Vous êtes trop fatigué(e) pour cette expédition !" // MODIFIÉ
        },
        "ui": {
            "refresh_button_cooldown": "Actualiser ({time}s)",
            "refresh_button_ready": "Actualiser",
            "recommended_stats": "Stats recommandées :",
            "start_button": "Lancer l'expédition",
            "rewards": {
                "xp": "XP: ~{amount}",
                "resources": "Ressources: {resources}",
                "item_drop": "Drop d'objet: <strong class=\"rarity-uncommon\">{chance}% chance</strong>",
                "chance_breakdown": " <small class=\"chance-breakdown\">({base}% + {bonus}%)</small>"
            },
            "event": {
                "hp_display": "{hpIcon} PV: <span class=\"{hpColorClass}\">{current}</span> / {max}",
                "merchant_sells": "{merchantName} vend :",
                "player_sells": "Vous vendez :",
                "stock_info": " (Stock: {current}/{max})",
                "sell_price_for": "Pour {price} 💠",
                "risk_label": "Risque",
                "cost_label": "Coût",
                "effect_display_flat": " ({type}: -{value} {unit})",
                "effect_display_percent": " ({type}: -{value}% {unit})",
                "success_chance": " — [{chance}% de réussite]",
                "please_wait": "Veuillez patienter...",
                "action_in_progress": "Action en cours...",
                "time_remaining": "Temps restant: {time} sec"
            }
        },
        "log": {
            "damage_taken_flat": "Vous avez subi ##DMG:{amount}## points de dégâts.",
            "hp_recovered_flat": "Vous récupérez ##HEAL:{amount}## points de vie.",
            "temp_buff": "Vous recevez un bonus temporaire de +{value} en {stat}.",
            "from_expedition": "de l'expédition \"{expeditionName}\"",
            "fled_and_lost_rewards": "Fuite du combat. Toutes les récompenses de l'expédition sont perdues.",
            "xp_from_enemy": "Vous avez gagné ##XP:{xp}## en battant {enemyName}.",
            "resource_from_enemy": "Vous récupérez ##RES:{resource}:{amount}## sur {enemyName}.",
            "rare_item_found": "✨ Vous avez trouvé un objet rare : {itemName} !",
            "xp_gain_simple": "Vous gagnez {xp} XP.",
            "resource_gain_simple": "Vous récupérez {amount} de {resource}.",
            "combat_loss_penalty": "Défaite au combat : -{xp} XP."
        },
        "random_events": {
            "sac_perdu": {
                "description": "Vous tombez sur un sac de voyageur, visiblement tombé d'un chariot. Il semble contenir quelque chose.",
                "choice1_text": "L'ouvrir et prendre le contenu",
                "choice1_success_text": "Vous trouvez une poignée de matériaux divers. C'est votre jour de chance.",
                "choice2_text": "Le laisser, ce n'est pas à vous (gagne de l'XP de 'bonne action')",
                "choice2_success_text": "Votre conscience est tranquille. Vous vous sentez un peu plus sage."
            },
            "marchand_mystere": {
                "description": "Un marchand encapuchonné apparaît comme par magie. Il vous propose un seul objet, un 'Coffret Scellé', pour un prix dérisoire.",
                "choice1_text": "Acheter le coffret (coûte 100 de chaque ressource)",
                "choice1_success_text": "Vous achetez le coffret. Le marchand disparaît. À l'intérieur... une petite somme de Fragments ! Bonne affaire !",
                "choice1_failure_text": "Vous n'avez pas les fonds. Le marchand s'évapore aussi vite qu'il est apparu.",
                "choice2_text": "Refuser l'offre suspecte",
                "choice2_success_text": "Mieux vaut être prudent. Vous refusez et le marchand disparaît dans un nuage de fumée."
            },
            "trouver_coffre": {
                "description": "En chemin, vous apercevez un vieux coffre en bois à moitié enfoui.",
                "choice1_text": "Tenter de l'ouvrir (prend du temps)",
                "choice1_success_text": "Le coffre contenait quelques ressources utiles !",
                "choice2_text": "L'ignorer et continuer sa route",
                "choice2_success_text": "Vous n'avez pas de temps à perdre. Vous continuez votre chemin."
            },
            "filon_metal": {
                "description": "Vous remarquez un filon de métal brillant sur une paroi rocheuse.",
                "choice1_text": "Prendre le temps de miner (Force 5+)",
                "choice1_success_text": "Votre force vous permet d'extraire rapidement un bon morceau de métal.",
                "choice1_failure_text": "Le rocher est trop dur. Vous perdez du temps et de l'énergie pour rien.",
                "choice2_text": "L'ignorer",
                "choice2_success_text": "Vous n'êtes pas équipé pour ça. Vous continuez."
            },
            "pillards": {
                "description": "Un groupe de pillards vous barre la route et exige un tribut !",
                "choice1_text": "Leur donner 40 métals pour les calmer",
                "choice1_success_text": "Vous leur donnez ce qu'ils demandent. Ils vous laissent passer.",
                "choice1_failure_text": "'Ce n'est pas assez !' Ils vous bousculent et vous volent un peu plus.",
                "choice2_text": "Tenter de fuir (Agilité 10+)",
                "choice2_success_text": "Vous êtes plus rapide ! Vous les semez sans problème.",
                "choice2_failure_text": "Ils vous rattrapent et vous prennent de force ce qu'ils peuvent."
            },
            "source_curative": {
                "description": "Vous découvrez une petite source d'eau cristalline. L'eau semble vibrer d'une énergie apaisante.",
                "choice1_text": "Boire à la source",
                "choice1_success_text": "L'eau fraîche et pure soigne une partie de vos blessures.",
                "choice2_text": "Se méfier et continuer",
                "choice2_success_text": "Dans la nature, la prudence est mère de sûreté. Vous ignorez la source."
            },
            "champignon_etrange": {
                "description": "Vous trouvez un champignon aux couleurs psychédéliques. Il pourrait être délicieux, nutritif... ou mortel.",
                "choice1_text": "Le manger (Chance 15+)",
                "choice1_success_text": "C'est délicieux ! Vous vous sentez revigoré et plein de vie !",
                "choice1_failure_text": "Mauvaise idée. Vous êtes pris de violentes crampes d'estomac.",
                "choice2_text": "Le laisser où il est",
                "choice2_success_text": "Vous n'êtes pas un expert en mycologie. Sage décision."
            },
            "animal_blesse": {
                "description": "Vous trouvez un jeune loup, la patte prise dans un vieux piège de braconnier. Il gémit de douleur mais vous grogne dessus si vous approchez.",
                "choice1_text": "Tenter de le libérer (Intelligence 12+)",
                "choice1_success_text": "Avec douceur et patience, vous parvenez à ouvrir le piège. Le louveteau vous lèche la main avant de disparaître dans les bois. Votre acte de bonté vous apporte une grande satisfaction.",
                "choice1_failure_text": "En essayant de l'aider, l'animal paniqué vous mord avant de s'enfuir. L'ingratitude fait mal.",
                "choice2_text": "L'ignorer. La nature est cruelle.",
                "choice2_success_text": "Vous poursuivez votre chemin, le cœur un peu lourd."
            },
            "statue_antique": {
                "description": "Au milieu de nulle part, une statue moussue d'un ancien héros se dresse. On dirait qu'on peut lui faire une offrande.",
                "choice1_text": "Offrir 20 Tissu pour un vœu de protection",
                "choice1_success_text": "Vous déposez le tissu aux pieds de la statue. Vous sentez une aura protectrice vous envelopper.",
                "choice1_failure_text": "Vous n'avez pas assez de tissu pour faire une offrande digne de ce nom.",
                "choice2_text": "Prier pour la bonne fortune (Chance 10+)",
                "choice2_success_text": "Votre prière semble avoir été entendue. Vous vous sentez plus chanceux.",
                "choice2_failure_text": "La statue reste de marbre. Vos prières se perdent dans le vent."
            },
            "meteo_capricieuse": {
                "description": "Le temps change brusquement. Un orage violent éclate !",
                "choice1_text": "S'abriter dans une grotte (prend du temps)",
                "choice1_success_text": "Vous attendez que l'orage passe. Vous restez au sec mais perdez du temps.",
                "choice2_text": "Continuer malgré la pluie (Vie 15+)",
                "choice2_success_text": "Votre constitution robuste vous permet d'endurer le froid et la pluie sans tomber malade.",
                "choice2_failure_text": "Le froid glacial vous sape vos forces. Vous arrivez à destination trempé et affaibli."
            },
            "aventurier_perdu": {
                "description": "Vous rencontrez un autre aventurier, l'air perdu et désespéré. Il vous demande de la nourriture.",
                "choice1_text": "Partager un peu de vos ressources (15 Bois)",
                "choice1_success_text": "Vous lui donnez de quoi faire un feu. En remerciement, il vous donne une information cruciale sur un trésor caché à proximité.",
                "choice1_failure_text": "Vous n'avez pas grand-chose à partager. L'aventurier repart, déçu.",
                "choice2_text": "Refuser. Chacun pour soi.",
                "choice2_success_text": "Vous refusez sèchement. L'aventurier vous lance un regard noir avant de partir. Vous sentez que vous vous êtes fait un ennemi."
            },
            "reve_etrange": {
                "description": "La nuit tombe et vous vous endormez. Vous faites un rêve étrangement lucide qui semble vous guider.",
                "choice1_text": "Suivre la vision du rêve (Intelligence 18+)",
                "choice1_success_text": "Votre instinct vous dit de faire confiance au rêve. Il vous mène hors du sentier battu, vers une géode remplie de fragments brillants !",
                "choice1_failure_text": "Vous essayez de suivre la vision, mais elle était trop confuse. Vous vous perdez et perdez du temps à retrouver votre chemin.",
                "choice2_text": "Ignorer le rêve, ce n'est qu'un songe.",
                "choice2_success_text": "Vous vous réveillez et reprenez votre route, laissant les mystères de la nuit derrière vous."
            },
            "obstacle_naturel": {
                "description": "Un énorme arbre est tombé en travers du chemin, bloquant le passage.",
                "choice1_text": "Le détruire à la hache (Force 20+)",
                "choice1_success_text": "Quelques coups de hache bien placés et le passage est libre. Vous récupérez du bois au passage.",
                "choice1_failure_text": "L'arbre est trop massif. Vous gaspillez votre énergie en vain.",
                "choice2_text": "Escalader l'obstacle (Agilité 15+)",
                "choice2_success_text": "Vous grimpez par-dessus le tronc avec une agilité surprenante.",
                "choice2_failure_text": "Vous glissez et tombez de l'autre côté. Rien de cassé, mais votre fierté en prend un coup."
            },
            "poupee_abandonnee": {
                "description": "Vous trouvez une vieille poupée de chiffon, sale mais intacte, posée sur une pierre.",
                "choice1_text": "La prendre avec vous (Chance 12+)",
                "choice1_success_text": "En la ramassant, vous sentez une petite bourse cousue à l'intérieur. Elle contient un fragments ! La poupée semble vous sourire.",
                "choice1_failure_text": "Vous la prenez. Plus tard dans la nuit, vous êtes réveillé par des chuchotements. La poupée est hantée ! Vous la jetez et fuyez, terrorisé.",
                "choice2_text": "Laisser l'objet maudit où il est",
                "choice2_success_text": "Cet objet ne vous inspire pas confiance. Vous le laissez tranquille."
            },
            "echo_mysterieux": {
                "description": "Vous entendez un écho qui répète vos propres pas, mais avec un léger décalage. C'est troublant.",
                "choice1_text": "Confronter l'écho (Défense 10+)",
                "choice1_success_text": "Vous criez 'Qui est là ?'. L'écho s'arrête. Il s'agissait d'un 'Doppelganger Sonore', une créature timide. En partant, il laisse derrière lui une essence arcanique.",
                "choice1_failure_text": "La créature se manifeste et vous frappe avec une onde sonore. L'attaque vous désoriente.",
                "choice2_text": "Accélérer le pas pour le semer",
                "choice2_success_text": "Vous ne prenez aucun risque et fuyez. L'écho disparaît après quelques minutes."
            },
            "carte_au_tresor_dechiree": {
                "description": "Vous trouvez un morceau de carte au trésor sur le corps d'un squelette.",
                "choice1_text": "Suivre la carte (Intelligence 15+)",
                "choice1_success_text": "Malgré le peu d'indices, vous parvenez à localiser l'emplacement. Un petit coffre est enterré là !",
                "choice1_failure_text": "La carte est trop incomplète. Vous tournez en rond pour rien.",
                "choice2_text": "Garder la carte pour plus tard",
                "choice2_success_text": "Peut-être trouverez-vous l'autre moitié un jour. Vous la gardez précieusement."
            },
            "constellation_etrange": {
                "description": "La nuit, vous remarquez une nouvelle constellation dans le ciel. Elle semble vous appeler.",
                "choice1_text": "La méditer (Intelligence 20+)",
                "choice1_success_text": "En vous concentrant sur la constellation, vous comprenez une nouvelle vérité sur le monde, ce qui aiguise votre esprit.",
                "choice1_failure_text": "La lumière des étoiles vous donne une terrible migraine.",
                "choice2_text": "L'ignorer et dormir",
                "choice2_success_text": "Le sommeil est plus important que les étoiles. Vous vous endormez."
            }
        },
    "starters": {
        "aventureRiviere": {
            "title": "La Rivière Tumultueuse",
            "flavorText": "Un cours d'eau puissant vous barre la route."
        },
        "aventureForet": {
            "title": "La Forêt Sombre",
            "flavorText": "Une forêt ancienne et oppressante se dresse devant vous."
        },
        "enqueteVillage": {
            "title": "Le Voleur de Tartes",
            "flavorText": "Les tartes de la boulangère disparaissent mystérieusement."
        },
        "livraisonUrgence": {
            "title": "La Livraison Urgente",
            "flavorText": "L'herboriste a besoin d'herbes rares pour un remède. Le temps presse !"
        },
        "menaceRats": {
            "title": "La Menace des Rats Géants",
            "flavorText": "Le fermier se plaint d'une invasion de rats gros comme des chiens."
        },
        "medaillonPerdu": {
            "title": "Le Médaillon Perdu",
            "flavorText": "Une jeune femme a perdu un médaillon précieux près du lac."
        },
        "herbesGuerison": {
            "title": "Les Herbes de Guérison",
            "flavorText": "L'apothicaire du village a besoin d'Argenfeuille pour un patient malade."
        },
        "problemeGobelins": {
            "title": "Un Problème de Gobelins",
            "flavorText": "Des gobelins chapardeurs ont établi un petit camp près de la route commerciale."
        },
        "nettoyageCave": {
            "title": "Nettoyage de Cave",
            "flavorText": "La taverne locale est infestée d'araignées géantes dans sa cave à vin."
        },
        "lettrePerdue": {
            "title": "La Lettre Perdue",
            "flavorText": "Un facteur maladroit a perdu une lettre importante destinée au maire."
        },
        "reparationCloture": {
            "title": "Réparation de Clôture",
            "flavorText": "Le troupeau de moutons d'un fermier s'échappe à cause d'une clôture brisée par des loups."
        },
        "leChatPerdu": {
            "title": "Le Chat de la Comtesse",
            "flavorText": "Le chat persan de la comtesse s'est enfui. Elle offre une récompense."
        },
        "bruitCimetiere": {
            "title": "Bruits au Cimetière",
            "flavorText": "Le fossoyeur est effrayé par des bruits étranges la nuit."
        },
        "livreEnRetard": {
            "title": "Un Livre en Retard",
            "flavorText": "Le bibliothécaire vous charge de récupérer un livre emprunté par un ermite reclus."
        },
        "lePuitsEmpoisonne": {
            "title": "Le Puits Empoisonné",
            "flavorText": "L'eau du puits du hameau a un goût étrange et rend les gens malades."
        },
        "laPecheMiraculeuse": {
            "title": "La Pêche Miraculeuse",
            "flavorText": "Un pêcheur se plaint que quelque chose de gros effraie tous les poissons du lac."
        },
        "aventureRuines": {
            "title": "Les Ruines Oubliées",
            "flavorText": "Des ruines antiques promettent des trésors et des dangers."
        },
        "escorteMarchand": {
            "title": "L'Escorte du Marchand",
            "flavorText": "Un marchand nerveux a besoin de protection sur la route."
        },
        "aventureMarais": {
            "title": "Le Marais Brumeux",
            "flavorText": "Un marécage nauséabond où il est facile de se perdre."
        },
        "problemeMine": {
            "title": "Problème à la Mine",
            "flavorText": "Les mineurs sont bloqués par un éboulement et des créatures étranges."
        },
        "boisMurmurants": {
            "title": "Les Bois Murmurants",
            "flavorText": "Les voyageurs évitent une partie de la forêt, effrayés par des murmures spectraux."
        },
        "pontSabote": {
            "title": "Le Pont Saboté",
            "flavorText": "Le pont marchand principal est endommagé. Accident ou malveillance ?"
        },
        "leContratDHerboriste": {
            "title": "Le Contrat de l'Herboriste",
            "flavorText": "Récupérer une Fleur de Lune au sommet d'une falaise infestée de harpies."
        },
        "laCrypteAgitee": {
            "title": "La Crypte Agitée",
            "flavorText": "Les morts ne trouvent pas le repos dans la vieille crypte des fondateurs."
        },
        "laTourDeGardeAbandonnee": {
            "title": "La Tour de Garde Abandonnée",
            "flavorText": "Une vieille tour de garde serait devenue le repaire de bandits."
        },
        "leGeyserInstable": {
            "title": "Le Geyser Instable",
            "flavorText": "Un geyser menace un petit campement de mineurs avec ses éruptions imprévisibles."
        },
        "leTrolSousLePont": {
            "title": "Le Troll sous le Pont",
            "flavorText": "Un troll bloque le passage d'un pont crucial et exige un péage exorbitant."
        },
        "lesCultistesDansLesBois": {
            "title": "Les Cultistes dans les Bois",
            "flavorText": "Des rituels étranges ont lieu dans la forêt. Il faut enquêter discrètement."
        },
        "laFolieDuCollectionneur": {
            "title": "La Folie du Collectionneur",
            "flavorText": "Un noble excentrique vous engage pour 'acquérir' une statue dans un manoir rival."
        },
        "leSilenceDeLaFerme": {
            "title": "Le Silence de la Ferme",
            "flavorText": "Une ferme isolée ne donne plus de nouvelles depuis une semaine."
        },
        "lePuitsDesSouhaits": {
            "title": "Le Puits des Souhaits",
            "flavorText": "La légende dit qu'un puits exauce les vœux, mais il est gardé par un esprit avare."
        },
        "laBetedesPlaines": {
            "title": "La Bête des Plaines",
            "flavorText": "Une créature rapide et féroce attaque les voyageurs dans les plaines."
        },
        "chassePrimeBandit": {
            "title": "Prime sur les Bandits",
            "flavorText": "Le capitaine de la garde offre une récompense pour un camp de bandits."
        },
        "aventureMontagne": {
            "title": "La Montagne Glacée",
            "flavorText": "Le froid mordant de ce pic mettra votre endurance à l'épreuve."
        },
        "artefactMaudit": {
            "title": "L'Artefact de la Crypte",
            "flavorText": "Une ancienne crypte renfermerait un artefact puissant, mais maudit."
        },
        "caravaneDisparue": {
            "title": "La Caravane Disparue",
            "flavorText": "Une caravane de luxe n'est jamais arrivée à destination. Retrouvez-la."
        },
        "templeEnglouti": {
            "title": "Le Temple Englouti",
            "flavorText": "La sécheresse a révélé l'entrée d'un temple autrefois sous les eaux."
        },
        "tournoiArene": {
            "title": "Le Tournoi de l'Arène",
            "flavorText": "L'arène locale organise un tournoi pour les aventuriers. Prouvez votre valeur !"
        },
        "laTaniereDuBasilic": {
            "title": "La Tanière du Basilic",
            "flavorText": "Un basilic a élu domicile dans une carrière, pétrifiant les ouvriers."
        },
        "leNavireFrequente": {
            "title": "Le Navire Fréquenté",
            "flavorText": "L'épave d'un galion échoué serait hantée par son équipage fantomatique."
        },
        "leTournoiDuFauconDeFer": {
            "title": "Le Tournoi du Faucon de Fer",
            "flavorText": "Un tournoi d'archerie prestigieux avec une récompense de taille."
        },
        "lesMinesDeCristal": {
            "title": "Les Mines de Cristal",
            "flavorText": "Des créatures de cristal animées ont pris le contrôle d'une mine précieuse."
        },
        "leVolDuSiecle": {
            "title": "Le Vol du Siècle",
            "flavorText": "Infiltrer le musée de la capitale pour voler le 'Diamant de l'Aube'."
        },
        "laGuerreDesGuildes": {
            "title": "La Guerre des Guildes",
            "flavorText": "La guilde des voleurs et celle des assassins sont en guerre ouverte. Choisissez votre camp."
        },
        "loasisPerdue": {
            "title": "L'Oasis Perdue",
            "flavorText": "Retrouver une oasis légendaire au cœur du désert, gardée par un Djinn."
        },
        "leRituelDeSang": {
            "title": "Le Rituel de Sang",
            "flavorText": "Un groupe de nécromanciens prépare un rituel dangereux dans une citadelle en ruine."
        },
        "laFievreDeLOr": {
            "title": "La Fièvre de l'Or",
            "flavorText": "Une rumeur de veine d'or a attiré des prospecteurs... et des ennuis dans les collines."
        },
        "lesMurmuresSousLaVille": {
            "title": "Les Murmures sous la Ville",
            "flavorText": "Les égouts de la cité cachent une menace qui remonte à la surface."
        },
        "siegeGobelin": {
            "title": "Le Siège du Fortin",
            "flavorText": "Un petit fortin est assiégé par une horde de gobelins."
        },
        "culteSecret": {
            "title": "L'Infiltration du Culte",
            "flavorText": "Un culte secret opère dans les bas-fonds de la cité. Découvrez leurs plans."
        },
        "coeurVolcan": {
            "title": "Le Coeur du Volcan",
            "flavorText": "Une gemme de pouvoir se trouverait au plus profond d'un volcan actif."
        },
        "bibliothequeOubliee": {
            "title": "La Bibliothèque Oubliée",
            "flavorText": "Les légendes parlent d'une bibliothèque contenant le savoir des anciens."
        },
        "gambitPirate": {
            "title": "Le Gambit des Pirates du Ciel",
            "flavorText": "Un infâme navire pirate a été aperçu. C'est l'occasion de le piller ou de le capturer."
        },
        "docteursPeste": {
            "title": "Les Docteurs de la Peste",
            "flavorText": "Une étrange maladie se propage. Deux docteurs aux méthodes opposées proposent un remède."
        },
        "laCiteDesAutomates": {
            "title": "La Cité des Automates",
            "flavorText": "Une cité de métal oubliée, encore active et hautement défendue par ses gardiens."
        },
        "leLabyrintheDuMinotaure": {
            "title": "Le Labyrinthe du Minotaure",
            "flavorText": "Un labyrinthe antique dont personne n'est jamais revenu. On dit qu'un minotaure le hante."
        },
        "laCourDesMiracles": {
            "title": "La Cour des Miracles",
            "flavorText": "Le Roi des Mendiants vous défie de survivre une nuit dans son royaume souterrain."
        },
        "lileDeLaChimere": {
            "title": "L'Île de la Chimère",
            "flavorText": "Une île isolée abrite un laboratoire d'alchimiste abandonné et ses créations monstrueuses."
        },
        "lePacteInfernal": {
            "title": "Le Pacte Infernal",
            "flavorText": "Un duc a vendu son âme pour le pouvoir. Il faut briser le pacte avant qu'il ne soit trop tard."
        },
        "laChasseSauvage": {
            "title": "La Chasse Sauvage",
            "flavorText": "Une horde de cavaliers spectraux terrorise la campagne. Il faut les affronter ou les apaiser."
        },
        "leSommetDuMonde": {
            "title": "Le Sommet du Monde",
            "flavorText": "Gravir la plus haute montagne du monde pour y trouver la réponse à une ancienne prophétie."
        },
        "leMaelstromArcanique": {
            "title": "Le Maelstrom Arcanique",
            "flavorText": "Une tempête magique menace de tout détruire. Il faut trouver son œil pour la calmer."
        },
        "laGuerreContreLesProfonds": {
            "title": "La Guerre contre les Profonds",
            "flavorText": "Des créatures amphibiens sortent de l'océan pour attaquer les villes côtières."
        },
        "leSablierDuTemps": {
            "title": "Le Sablier du Temps",
            "flavorText": "Un artefact capable de manipuler le temps a été volé. Le retrouver avant qu'il ne cause un paradoxe."
        },
        "reliqueDivine": {
            "title": "La Relique du Temple Céleste",
            "flavorText": "Une relique perdue depuis des siècles est apparue au sommet d'un temple flottant."
        },
        "chasseDragon": {
            "title": "La Chasse au Dragon Ancien",
            "flavorText": "Un dragon terrorise la région. Seul un héros légendaire peut l'arrêter."
        },
        "tourSorcier": {
            "title": "La Tour du Sorcier Fou",
            "flavorText": "Un sorcier dément a érigé une tour qui défie les lois de la physique."
        },
        "forgeDieux": {
            "title": "La Forge des Dieux",
            "flavorText": "Une quête pour trouver la forge mythique où les premières armes furent créées."
        },
        "conseilOmbres": {
            "title": "Le Conseil des Ombres",
            "flavorText": "Un complot se trame au sein du conseil royal. Démasquez les traîtres."
        },
        "leTombeauDuRoiSinge": {
            "title": "Le Tombeau du Roi Singe",
            "flavorText": "Un tombeau rempli d'énigmes et de pièges mortels, gardé par le facétieux esprit du Roi Singe."
        },
        "laCite Engloutie": {
            "title": "La Cité Engloutie de R'lyeh",
            "flavorText": "Plonger dans les abysses pour explorer une cité non-euclidienne et ne pas y perdre la raison."
        },
        "leDernierDesGeants": {
            "title": "Le Dernier des Géants",
            "flavorText": "Trouver le dernier géant de pierre endormi et le convaincre de vous aider à repousser une invasion."
        },
        "lEchiquierDesDieux": {
            "title": "L'Échiquier des Dieux",
            "flavorText": "Participer à une partie d'échecs cosmique où les pièces sont des armées et l'enjeu, le destin du monde."
        },
        "laToisonDOr": {
            "title": "La Toison d'Or",
            "flavorText": "Naviguer sur des mers dangereuses, affronter des monstres marins pour récupérer la légendaire Toison d'Or."
        },
        "leCoeurDeLaForetMonde": {
            "title": "Le Cœur de la Forêt-Monde",
            "flavorText": "La gigantesque forêt qui recouvre un continent se meurt. Il faut trouver la source du mal."
        },
        "leTournoiDesChampionsEternels": {
            "title": "Le Tournoi des Champions Éternels",
            "flavorText": "Un tournoi secret où les plus grands héros de tous les temps s'affrontent pour l'éternité."
        },
        "laBibliothequeInfinie": {
            "title": "La Bibliothèque Infinie",
            "flavorText": "Trouver un livre spécifique dans une bibliothèque qui contient tous les livres jamais écrits ou à écrire."
        },
        "leForgeronDesAmes": {
            "title": "Le Forgeron des Âmes",
            "flavorText": "Un forgeron démoniaque capture des âmes pour forger des armes. Il faut le stopper."
        },
        "lArmeeDesTenebres": {
            "title": "L'Armée des Ténèbres",
            "flavorText": "Un portail s'est ouvert et une armée de démons déferle. Menez la contre-attaque."
        },
        "brecheDimensionnelle": {
            "title": "La Brèche Dimensionnelle",
            "flavorText": "Une faille vers un autre plan s'est ouverte, déversant des horreurs."
        },
        "coeurCorrompu": {
            "title": "Le Coeur de la Corruption",
            "flavorText": "La source de la corruption qui ronge le royaume doit être détruite."
        },
        "etoileMourante": {
            "title": "L'Étoile Mourante",
            "flavorText": "Un astre dans le ciel nocturne grandit de façon anormale, menaçant le monde."
        },
        "roiEndormi": {
            "title": "Le Réveil du Roi sous la Montagne",
            "flavorText": "Une ancienne prophétie annonce le retour du vrai roi, endormi au coeur du monde."
        },
        "leSilenceDesEtoiles": {
            "title": "Le Silence des Étoiles",
            "flavorText": "Les étoiles s'éteignent une à une. Découvrir la cause de ce phénomène cosmique."
        },
        "leDernierDieu": {
            "title": "Tuer le Dernier Dieu",
            "flavorText": "Le dernier des anciens dieux est devenu fou et menace de défaire la création. Il doit être arrêté."
        },
        "leRefletBrisé": {
            "title": "Le Reflet Brisé",
            "flavorText": "Un monde miroir, version sombre du nôtre, tente de prendre sa place. Fermer la brèche."
        },
        "laMelodieDeLaCreation": {
            "title": "La Mélodie de la Création",
            "flavorText": "La musique qui maintient l'univers en harmonie s'est arrêtée. Il faut la rejouer."
        },
        "leCycleDeLaRoue": {
            "title": "Briser le Cycle de la Roue",
            "flavorText": "Le monde est coincé dans une boucle de renaissance et de destruction. Briser la roue du temps."
        },
        "leJardinDHephaistos": {
            "title": "Le Jardin d'Héphaïstos",
            "flavorText": "Explorer le jardin mécanique du dieu forgeron, où la faune et la flore sont de métal et de feu."
        },
        "lEncreDuDestin": {
            "title": "L'Encre du Destin",
            "flavorText": "Trouver la plume et l'encre avec lesquelles le destin est écrit, et y ajouter votre propre chapitre."
        },
        "le ProcesDAsmodeus": {
            "title": "Le Procès d'Asmodéus",
            "flavorText": "Vous êtes convoqué aux enfers pour être l'avocat de l'humanité dans un procès contre le diable lui-même."
        },
        "leTroneVide": {
            "title": "Le Trône Vide",
            "flavorText": "Le trône du royaume céleste est vide, causant un déséquilibre cosmique. Il faut y trouver un nouveau dirigeant."
        },
        "le CommencementDeLaFin": {
            "title": "Le Commencement de la Fin",
            "flavorText": "Une entité du vide absolu a commencé à consommer la réalité. Ce n'est pas un combat, c'est une survie."
        }
      },
    "events": {
        "riviere_debut": {
            "description": "Votre chemin est bloqué par une rivière au courant violent.",
            "choice1_text": "Tenter la traversée à la nage (Force 8+)",
            "choice1_success_text": "Avec une puissante brassée, vous atteignez l'autre rive, épuisé mais fier.",
            "choice1_failure_text": "Le courant est trop fort ! Vous êtes emporté et vous vous échouez sur la même rive, meurtri.",
            "choice2_text": "Chercher un pont en amont (Intelligence 6+)",
            "choice2_success_text": "Votre sens de l'observation paie ! Vous découvrez un vieux pont de corde.",
            "choice2_failure_text": "Vous cherchez pendant une heure sans rien trouver."
        },
        "riviere_pont_garde": {
            "description": "Le pont de corde est gardé par un mercenaire. 'La traversée, c'est 20 bois', grogne-t-il.",
            "choice1_text": "Payer les 20 Bois",
            "choice1_success_text": "Vous payez le tribut. Le garde vous laisse passer.",
            "choice1_failure_text": "Vous n'avez pas assez. Le garde se moque et vous chasse.",
            "choice2_text": "L'intimider (Force 10+)",
            "choice2_success_text": "Vous bombez le torse. Le garde hésite et vous laisse passer.",
            "choice2_failure_text": "Votre tentative le fait rire. Il vous repousse violemment."
        },
        "riviere_fin_succes": {
            "description": "De l'autre côté, vous trouvez une caisse abandonnée remplie de matériaux !"
        },
        "riviere_fin_echec": {
            "description": "Vous avez échoué à traverser. Vous rebroussez chemin."
        },
        "foret_debut": {
            "description": "Vous pénétrez dans une forêt ancienne. Un sentier à peine visible s'enfonce dans les ténèbres.",
            "choice1_text": "Suivre le sentier",
            "choice1_success_text": "Vous avancez prudemment."
        },
        "foret_clairiere": {
            "description": "Le sentier débouche sur une clairière paisible où se trouve un coffre vermoulu.",
            "choice1_text": "Ouvrir le coffre",
            "choice1_success_text": "Le coffre contient de vieilles ressources, une belle trouvaille !"
        },
        "foret_piege": {
            "description": "Votre pied heurte un fil tendu ! C'est un piège de chasseur !",
            "choice1_text": "Tenter une esquive (Agilité 8+)",
            "choice1_success_text": "D'un bond agile, vous évitez le filet qui s'abat du ciel !",
            "choice1_failure_text": "Trop lent ! Un filet vous attrape et vous perdez du temps à vous en défaire."
        },
        "foret_fin_succes": {
            "description": "Vous trouvez la sortie de la forêt, revigoré par votre aventure."
        },
        "foret_fin_echec": {
            "description": "Vous sortez de la forêt, mais l'épreuve vous a coûté."
        },
        "enquete_debut": {
            "description": "La boulangère, en larmes, vous explique que ses fameuses tartes aux pommes disparaissent chaque nuit.",
            "choice1_text": "Accepter d'enquêter",
            "choice1_success_text": "Vous acceptez. Vous commencez par chercher des indices."
        },
        "enquete_indices": {
            "description": "Vous examinez les lieux. La fenêtre arrière est ouverte et vous remarquez de petites empreintes.",
            "choice1_text": "Suivre les empreintes (Intelligence 5+)",
            "choice1_success_text": "Les traces vous mènent au repaire d'une bande d'enfants des rues.",
            "choice1_failure_text": "Vous perdez la piste. Vous décidez de monter la garde cette nuit.",
            "choice2_text": "Interroger les voisins (Chance 5+)",
            "choice2_success_text": "Un voisin vous dit avoir vu des enfants traîner près de là. Il vous indique leur cachette.",
            "choice2_failure_text": "Personne n'a rien vu. Vous allez devoir surveiller la boulangerie."
        },
        "enquete_confrontation": {
            "description": "Vous trouvez les enfants avec un morceau de tarte. Ils expliquent qu'ils ont faim.",
            "choice1_text": "Les gronder et les ramener à la boulangère.",
            "choice1_success_text": "La boulangère les sermonne, mais touchée, leur offre un travail.",
            "choice2_text": "Leur donner 20 Tissu pour qu'ils mangent.",
            "choice2_success_text": "Touchés par votre générosité, ils promettent de ne plus voler.",
            "choice2_failure_text": "Vous n'avez rien à leur donner. Vous les ramenez de force."
        },
        "enquete_surveillance": {
            "description": "Après une longue attente, vous voyez une petite silhouette se faufiler. C'est un enfant !",
            "choice1_text": "L'attraper !",
            "choice1_success_text": "Vous attrapez le jeune voleur la main dans le sac."
        },
        "enquete_fin_bien": {
            "description": "La boulangère est ravie. Elle vous offre une belle somme et une tarte."
        },
        "enquete_fin_genereux": {
            "description": "La boulangère est touchée par votre compassion et vous remercie chaleureusement."
        },
        "enquete_fin_moyen": {
            "description": "Vous avez résolu l'affaire, mais de manière un peu brutale. La boulangère vous donne une petite récompense."
        },
        "livraison_debut": {
            "description": "L'herboriste a besoin d'herbes rares pour un remède. Le temps presse !",
            "choice1_text": "Accepter la course",
            "choice1_success_text": "Vous prenez le sac et partez au pas de course."
        },
        "livraison_chemin": {
            "description": "Un raccourci passerait par une grotte sombre, mais le chemin normal est plus sûr.",
            "choice1_text": "Prendre le raccourci (Agilité 7+)",
            "choice1_success_text": "Vous traversez la grotte sans encombre et gagnez un temps précieux !",
            "choice1_failure_text": "Vous vous perdez dans les ténèbres et ressortez au même endroit.",
            "choice2_text": "Prendre le chemin sûr",
            "choice2_success_text": "Vous optez pour la prudence. La route est plus longue."
        },
        "livraison_fin_rapide": {
            "description": "Vous arrivez en un temps record. L'herboriste, reconnaissant, double votre récompense."
        },
        "livraison_fin_lent": {
            "description": "Vous arrivez enfin. L'herboriste est soulagé mais un peu déçu par votre lenteur."
        },
        "rats_debut": {
            "description": "Le fermier Gédéon se plaint d'une invasion de rats gros comme des chiens.",
            "choice1_text": "Descendre à la cave",
            "choice1_success_text": "Vous descendez l'échelle en bois. L'odeur est pestilentielle."
        },
        "rats_tunnels": {
            "description": "La cave est un labyrinthe de tunnels. Un gros rat vous charge !",
            "choice1_text": "Le combattre !",
            "choice1_success_text": "Vous vous préparez à affronter la vermine !"
        },
        "rats_nid": {
            "description": "Vous trouvez le nid, gardé par la 'Reine des Rats', une créature boursouflée et agressive.",
            "choice1_text": "Éliminer la Reine !",
            "choice1_success_text": "La créature pousse un cri strident et vous fonce dessus !",
            "choice2_text": "Fuir la cave",
            "choice2_success_text": "C'en est trop. Vous remontez, laissant le fermier à son triste sort."
        },
        "rats_fin_succes": {
            "description": "Gédéon vous remercie mille fois et vous offre une partie de ses économies."
        },
        "rats_fin_echec": {
            "description": "Vous avez fui. Le fermier vous traite de lâche. Vous n'obtenez rien."
        },
        "medaillon_debut": {
            "description": "Une jeune femme en pleurs a perdu le médaillon de sa grand-mère près du lac.",
            "choice1_text": "Accepter de l'aider",
            "choice1_success_text": "Vous vous rendez au bord du lac pour commencer les recherches."
        },
        "medaillon_recherche": {
            "description": "La zone est boueuse. Où chercher ?",
            "choice1_text": "Chercher dans les roseaux (Chance 10+)",
            "choice1_success_text": "Un éclat métallique attire votre œil. C'est le médaillon !",
            "choice1_failure_text": "Vous cherchez en vain, ne trouvant que de la vase.",
            "choice2_text": "Parler aux pêcheurs (Intelligence 7+)",
            "choice2_success_text": "Un vieux pêcheur se souvient avoir vu quelque chose briller près du vieux ponton. Vous y trouvez le médaillon !",
            "choice2_failure_text": "Les pêcheurs n'ont rien vu et vous regardent d'un air suspicieux."
        },
        "medaillon_fin_succes": {
            "description": "Vous rendez le médaillon à la jeune femme. Folle de joie, elle vous donne tout ce qu'elle possède."
        },
        "medaillon_fin_echec": {
            "description": "Impossible de trouver le médaillon. Vous revenez annoncer la mauvaise nouvelle."
        },
        "herbes_debut": {
            "description": "L'apothicaire a besoin d'Argenfeuille. 'C'est facile à reconnaître, elle brille d'une lueur argentée', dit-il.",
            "choice1_text": "Partir à la recherche de la plante",
            "choice1_success_text": "Vous vous enfoncez dans les bois, les yeux grands ouverts."
        },
        "herbes_recherche": {
            "description": "Vous trouvez une clairière. Un cerf majestueux broute paisiblement. Près de lui, une plante qui correspond à la description.",
            "choice1_text": "Effrayer le cerf pour prendre la plante",
            "choice1_success_text": "Vous faites un grand bruit. Le cerf s'enfuit et vous cueillez la plante.",
            "choice2_text": "Attendre que le cerf s'en aille (Intelligence 5+)",
            "choice2_success_text": "Vous attendez patiemment. Le cerf finit par partir, vous laissant le champ libre.",
            "choice2_failure_text": "Votre patience a des limites. Vous faites un bruit, le cerf s'enfuit."
        },
        "herbes_fin_succes": {
            "description": "Vous ramenez l'Argenfeuille. L'apothicaire vous remercie."
        },
        "gobelins_debut": {
            "description": "Des gobelins chapardeurs ont établi un petit camp près de la route commerciale.",
            "choice1_text": "Attaquer le campement",
            "choice1_success_text": "Vous décidez de mettre un terme à leurs agissements."
        },
        "gobelins_combat": {
            "description": "Les gobelins sont surpris mais prêts à se battre.",
            "choice1_text": "Les affronter !",
            "choice1_success_text": "Vous chargez les créatures verdâtres."
        },
        "gobelins_fin_succes": {
            "description": "Vous avez nettoyé le campement. La route est plus sûre grâce à vous."
        },
        "gobelins_fin_echec": {
            "description": "Les gobelins étaient plus malins que vous. Vous battez en retraite."
        },
        "cave_debut": {
            "description": "La taverne locale est infestée d'araignées géantes dans sa cave à vin.",
            "choice1_text": "Proposer vos services",
            "choice1_success_text": "Vous descendez dans la cave sombre et humide, une torche à la main."
        },
        "cave_combat": {
            "description": "Des toiles d'araignées recouvrent les murs. Une araignée de cave vous tombe dessus !",
            "choice1_text": "Se battre contre l'araignée !",
            "choice1_success_text": "Vous engagez le combat contre la bête velue."
        },
        "cave_fin_succes": {
            "description": "Après avoir vaincu la créature, le tavernier est ravi et vous offre une récompense."
        },
        "cave_fin_echec": {
            "description": "L'araignée était trop rapide. Vous remontez en vitesse, laissant la cave aux monstres."
        },
        "lettre_debut": {
            "description": "Un facteur maladroit a perdu une lettre importante destinée au maire sur la place du marché.",
            "choice1_text": "L'aider à chercher la lettre",
            "choice1_success_text": "Vous commencez à fouiller la zone animée du marché."
        },
        "lettre_recherche": {
            "description": "Le marché est bondé. La lettre pourrait être n'importe où.",
            "choice1_text": "Chercher près des étals (Chance 12+)",
            "choice1_success_text": "Votre bonne étoile vous guide ! Vous apercevez la lettre, coincée sous une caisse de légumes.",
            "choice1_failure_text": "Malgré vos efforts, la lettre reste introuvable.",
            "choice2_text": "Demander aux marchands (Intelligence 8+)",
            "choice2_success_text": "En décrivant la lettre, un marchand se souvient l'avoir vue tomber près de la fontaine. Vous la retrouvez !",
            "choice2_failure_text": "Les marchands sont trop occupés pour vous aider."
        },
        "lettre_fin_succes": {
            "description": "Vous rendez la lettre au facteur, qui vous remercie un millier de fois."
        },
        "lettre_fin_echec": {
            "description": "La lettre a probablement été piétinée. Le facteur est dévasté."
        },
        "cloture_debut": {
            "description": "La clôture d'un fermier a été brisée par des loups. Ses moutons s'échappent.",
            "choice1_text": "Aider le fermier",
            "choice1_success_text": "Vous vous retroussez les manches et commencez à travailler."
        },
        "cloture_reparation": {
            "description": "Alors que vous réparez, un loup solitaire sort des bois et vous observe.",
            "choice1_text": "Le chasser (Force 9+)",
            "choice1_success_text": "Vous brandissez votre marteau. Le loup, surpris, s'enfuit.",
            "choice1_failure_text": "Le loup ne semble pas impressionné et vous charge !",
            "choice2_text": "L'ignorer et continuer (Défense 4+)",
            "choice2_success_text": "Vous continuez votre travail. Voyant que vous n'êtes pas une proie facile, il repart.",
            "choice2_failure_text": "Le loup voit une ouverture et vous saute dessus !"
        },
        "cloture_fin_succes": {
            "description": "La clôture est réparée et les moutons sont en sécurité. Le fermier vous paie pour votre aide."
        },
        "cloture_fin_echec": {
            "description": "Le loup vous a blessé et vous n'avez pas pu finir le travail correctement."
        },
        "chat_debut": {
            "description": "Le majordome de la comtesse vous informe que son chat persan s'est enfui. Il faut le retrouver.",
            "choice1_text": "Se lancer à la poursuite du félin",
            "choice1_success_text": "Vous partez à la recherche de ce fameux chat."
        },
        "chat_recherche": {
            "description": "Vous apercevez le chat sur un toit. Il vous nargue.",
            "choice1_text": "Grimper sur le toit (Agilité 9+)",
            "choice1_success_text": "Vous montez sur le toit avec agilité. Le chat, surpris, se laisse attraper.",
            "choice1_failure_text": "Vous glissez et tombez lourdement. Le chat s'enfuit en miaulant de rire.",
            "choice2_text": "L'appâter (Chance 8+)",
            "choice2_success_text": "Vous imitez le bruit d'un sachet de friandises. Le chat, gourmand, descend de lui-même.",
            "choice2_failure_text": "Ce chat n'est pas dupe. Il vous ignore superbement."
        },
        "chat_fin_succes": {
            "description": "Vous ramenez le chat. La comtesse est ravie et vous donne une bourse bien remplie."
        },
        "chat_fin_echec": {
            "description": "Le chat a gagné. Vous rentrez bredouille, couvert de poussière."
        },
        "cimetiere_debut": {
            "description": "Le fossoyeur, tremblant, vous parle de bruits de grattements venant d'une des tombes la nuit.",
            "choice1_text": "Enquêter sur ces bruits",
            "choice1_success_text": "Vous attendez la tombée de la nuit et vous vous rendez au cimetière."
        },
        "cimetiere_enquete": {
            "description": "Vous trouvez la tombe en question. Les bruits de grattement sont clairs.",
            "choice1_text": "Ouvrir le cercueil (Force 10+)",
            "choice1_success_text": "Vous ouvrez le lourd couvercle. Ce ne sont pas des morts-vivants, mais des rats géants qui ont fait leur nid !",
            "choice1_failure_text": "Le couvercle est trop lourd. Soudain, un squelette sort d'une tombe voisine !",
            "choice2_text": "Analyser la situation (Intelligence 9+)",
            "choice2_success_text": "En examinant la base de la tombe, vous voyez un tunnel. C'est sûrement une vermine. Vous décidez de fumer le nid.",
            "choice2_failure_text": "Vous ne voyez rien d'anormal, jusqu'à ce qu'une main osseuse sorte de terre !"
        },
        "cimetiere_fin_succes": {
            "description": "Vous avez résolu le mystère et éliminé la vermine. Le fossoyeur est soulagé et vous récompense."
        },
        "cimetiere_fin_moyen": {
            "description": "Il y avait bien un mort-vivant ! Après l'avoir vaincu, le calme revient. Le fossoyeur est terrifié mais reconnaissant."
        },
        "cimetiere_fin_echec": {
            "description": "Les horreurs du cimetière étaient trop fortes pour vous. Vous fuyez."
        },
        "livre_debut": {
            "description": "Le bibliothécaire vous charge de récupérer un livre emprunté par un ermite reclus.",
            "choice1_text": "Partir à la recherche de l'ermite",
            "choice1_success_text": "Vous suivez le chemin menant à la cabane de l'ermite."
        },
        "livre_ermite": {
            "description": "Vous trouvez l'ermite, qui refuse de rendre le livre, disant qu'il est sur le point de faire une percée.",
            "choice1_text": "Le convaincre avec logique (Intelligence 10+)",
            "choice1_success_text": "Vous lui expliquez que d'autres ont besoin du savoir. Il finit par accepter.",
            "choice1_failure_text": "Vos arguments ne le touchent pas. Il vous claque la porte au nez.",
            "choice2_text": "Lui échanger contre 20 Bois pour son feu",
            "choice2_success_text": "Il accepte le marché ! Un peu de bois contre un livre.",
            "choice2_failure_text": "Vous n'avez pas assez de bois à lui offrir."
        },
        "livre_fin_succes": {
            "description": "Vous rapportez le livre. Le bibliothécaire est satisfait et vous paie."
        },
        "livre_fin_echec": {
            "description": "L'ermite a gardé le livre. Vous rentrez les mains vides."
        },
        "puits_debut": {
            "description": "L'eau du puits d'un hameau rend les gens malades. Ils vous demandent de trouver la source du problème.",
            "choice1_text": "Inspecter le puits",
            "choice1_success_text": "Vous vous penchez au-dessus du puits. Une odeur nauséabonde en émane."
        },
        "puits_inspection": {
            "description": "Il y a quelque chose au fond. Il faut descendre pour voir.",
            "choice1_text": "Descendre avec une corde (Agilité 8+)",
            "choice1_success_text": "Vous descendez habilement. Au fond, vous trouvez la carcasse d'un sanglier.",
            "choice1_failure_text": "Vous glissez et tombez dans l'eau croupie. Beurk !"
        },
        "puits_nettoyage": {
            "description": "Maintenant, il faut sortir la carcasse de là.",
            "choice1_text": "La remonter à la force des bras (Force 12+)",
            "choice1_success_text": "Avec un effort considérable, vous parvenez à hisser la carcasse hors du puits.",
            "choice1_failure_text": "C'est trop lourd. Vous devez la démembrer, ce qui est long et dégoûtant."
        },
        "puits_fin_succes": {
            "description": "Le puits est maintenant propre. Les villageois vous remercient pour avoir sauvé leur source d'eau."
        },
        "peche_debut": {
            "description": "Un vieux pêcheur vous dit qu'un 'monstre' a élu domicile dans le lac et fait fuir tous les poissons.",
            "choice1_text": "Aller voir ce 'monstre'",
            "choice1_success_text": "Vous empruntez une barque et ramez vers le centre du lac."
        },
        "peche_monstre": {
            "description": "Une énorme créature ressemblant à un poisson-chat géant fait surface.",
            "choice1_text": "Tenter de le pêcher (Force 12+)",
            "choice1_success_text": "Après une lutte acharnée, vous ramenez la bête sur la berge. C'est le plus gros poisson que vous ayez jamais vu !",
            "choice1_failure_text": "La créature est trop forte, elle casse votre ligne et manque de faire chavirer votre barque.",
            "choice2_text": "Le chasser avec votre arme (Agilité 10+)",
            "choice2_success_text": "Vous parvenez à blesser la créature, qui décide que cet endroit est trop dangereux et s'en va.",
            "choice2_failure_text": "Le monstre plonge et vous ne le revoyez plus."
        },
        "peche_fin_succes": {
            "description": "Le monstre parti, les poissons reviennent. Le pêcheur partage une partie de sa première prise avec vous."
        },
        "peche_fin_echec": {
            "description": "Le monstre du lac a gagné. Les poissons ne sont pas près de revenir."
        },
        "ruines_debut": {
            "description": "Vous arrivez devant des ruines envahies par la végétation. Une entrée principale s'offre à vous, mais un mur effondré semble révéler un passage secret.",
            "choice1_text": "Prendre l'entrée principale (Défense 5+)",
            "choice1_success_text": "Vous entrez prudemment. Votre équipement vous protège des quelques chutes de pierres.",
            "choice1_failure_text": "Une pierre vous tombe dessus et vous sonne un peu.",
            "choice2_text": "Explorer le passage secret (Chance 15+)",
            "choice2_success_text": "La chance vous sourit ! Le passage débouche sur une petite salle au trésor oubliée.",
            "choice2_failure_text": "Le passage est un cul-de-sac. Vous perdez du temps et devez prendre l'entrée principale."
        },
        "ruines_salle_centrale": {
            "description": "La salle centrale est vaste. Des squelettes de pilleurs de tombes jonchent le sol. Soudain, une lueur malveillante les anime !",
            "choice1_text": "Combattre les morts-vivants !"
        },
        "ruines_chambre_secrete": {
            "description": "Après le combat, vous remarquez un courant d'air derrière une tapisserie. Vous la déchirez et révélez une chambre secrète.",
            "choice1_text": "Piller la chambre secrète",
            "choice1_success_text": "Vous trouvez un coffre rempli de métal ancien et de quelques objets de valeur."
        },
        "ruines_fin_succes_complet": {
            "description": "Vous quittez les ruines avec un butin bien plus conséquent que prévu. Une belle réussite !"
        },
        "ruines_fin_succes": {
            "description": "Votre chance vous a mené à un trésor inattendu, vous évitant les dangers principaux."
        },
        "ruines_fin_echec": {
            "description": "Les gardiens morts-vivants étaient trop nombreux. Vous fuyez les ruines les mains vides."
        },
        "escorte_debut": {
            "description": "Un marchand nerveux vous offre une belle somme pour l'escorter à travers la forêt, réputée pour ses bandits.",
            "choice1_text": "Accepter la mission",
            "choice1_success_text": "Vous acceptez. Le marchand semble rassuré par votre présence."
        },
        "escorte_chemin": {
            "description": "Vous avancez sur le chemin. Soudain, des bandits sortent des fourrés !",
            "choice1_text": "Protéger le chariot (Défense 8+)",
            "choice1_success_text": "Vous vous placez devant le chariot, parant les flèches. Voyant leur cible protégée, ils chargent !",
            "choice1_failure_text": "Une flèche se plante dans une roue du chariot, le brisant. Vous devez réparer en vous défendant !",
            "choice2_text": "Charger les bandits !",
            "choice2_success_text": "Vous foncez dans le tas pour les affronter directement."
        },
        "escorte_reparation": {
            "description": "La roue est cassée. Le marchand est paniqué pendant que vous repoussez les bandits.",
            "choice1_text": "Utiliser 50 bois pour réparer.",
            "choice1_success_text": "Avec vos ressources, vous bricolez une réparation solide. Vous pouvez repartir.",
            "choice1_failure_text": "Vous n'avez pas de quoi réparer. Vous abandonnez le chariot."
        },
        "escorte_destination": {
            "description": "Vous arrivez à destination. Le marchand, reconnaissant, vous paie la somme convenue.",
            "choice1_text": "Empocher la récompense",
            "choice1_success_text": "Une mission rondement menée."
        },
        "escorte_fin_succes": {
            "description": "Mission accomplie ! Le marchand vous remercie chaleureusement."
        },
        "escorte_fin_echec": {
            "description": "Vous avez échoué à protéger la cargaison. Le marchand est furieux et refuse de vous payer."
        },
        "marais_debut": {
            "description": "Vous vous enfoncez dans un marais brumeux. L'air est lourd et humide. Un sentier boueux semble être la seule voie.",
            "choice1_text": "Suivre le sentier (Intelligence 15+)",
            "choice1_success_text": "Vous analysez les traces et la consistance du sol pour ne pas vous embourber.",
            "choice1_failure_text": "Vous choisissez mal votre chemin et vous embourbez jusqu'à la taille. Vous mettez du temps à vous en sortir.",
            "choice2_text": "Couper à travers l'eau stagnante (Vie 12+)",
            "choice2_success_text": "C'est plus rapide, mais des sangsues s'accrochent à vous. Votre vitalité vous aide à supporter.",
            "choice2_failure_text": "Les sangsues et les maladies du marais vous affaiblissent considérablement."
        },
        "marais_cabane": {
            "description": "Au cœur du marais, vous trouvez une cabane délabrée sur pilotis. De la fumée s'échappe de la cheminée.",
            "choice1_text": "Frapper à la porte",
            "choice1_success_text": "Un vieil ermite vous ouvre. Touché par votre audace, il partage avec vous quelques ressources.",
            "choice2_text": "Ignorer la cabane et continuer",
            "choice2_success_text": "Prudent, vous préférez ne pas déranger et continuez votre chemin pour sortir du marais."
        },
        "marais_fin_succes": {
            "description": "L'ermite vous a bien aidé. Vous quittez le marais avec de nouvelles ressources."
        },
        "marais_fin_moyen": {
            "description": "Vous sortez du marais sans encombre, mais sans avoir trouvé de trésor particulier."
        },
        "marais_fin_echec": {
            "description": "Vous sortez enfin de ce marécage maudit, sale et épuisé."
        },
        "mine_debut": {
            "description": "Les mineurs sont paniqués. Un éboulement bloque la galerie principale, et des 'cliquetis' étranges se font entendre de l'autre côté.",
            "choice1_text": "Proposer son aide",
            "choice1_success_text": "Vous décidez d'aider. Il faut d'abord dégager le passage."
        },
        "mine_degagement": {
            "description": "Les rochers bloquent l'entrée. C'est un travail de force.",
            "choice1_text": "Dégager les rochers (Force 20+)",
            "choice1_success_text": "Votre puissance est impressionnante. Vous dégagez le passage en un temps record.",
            "choice1_failure_text": "C'est trop lourd. Vous demandez de l'aide aux mineurs, ce qui prend plus de temps."
        },
        "mine_creatures": {
            "description": "Derrière les rochers, vous découvrez une colonie de créatures insectoïdes géantes qui ont envahi la mine.",
            "choice1_text": "Exterminer les créatures !",
            "choice1_success_text": "Ces choses ne vous font pas peur. En garde !"
        },
        "mine_fin_succes": {
            "description": "Les mineurs vous acclament ! En récompense, ils vous offrent une part du premier filon de métal que vous avez libéré."
        },
        "mine_fin_echec": {
            "description": "Les créatures vous ont repoussé. Les mineurs sont déçus et vous ne recevez aucune récompense."
        },
        "bois_debut": {
            "description": "Vous entrez dans les Bois Murmurants. Des chuchotements sinistres semblent venir de toutes les directions.",
            "choice1_text": "Chercher la source des murmures",
            "choice1_success_text": "Vous vous enfoncez plus profondément, guidé par les sons étranges."
        },
        "bois_source": {
            "description": "Les murmures vous mènent à une statue de pierre ancienne. Les sons semblent émaner d'elle. Un spectre gémissant apparaît !",
            "choice1_text": "Affronter le spectre",
            "choice1_success_text": "La source du mal doit être éliminée !",
            "choice2_text": "Tenter de purifier la statue (Intelligence 18+)",
            "choice2_success_text": "Vous récitez une prière de purification. Le spectre, apaisé, disparaît en laissant derrière lui un écho de paix.",
            "choice2_failure_text": "Votre prière n'a aucun effet. Le spectre, irrité, vous attaque !"
        },
        "bois_fin_succes": {
            "description": "Vous avez vaincu le spectre. Le silence est revenu dans la forêt."
        },
        "bois_fin_purifie": {
            "description": "Vous avez apaisé l'esprit sans violence. Le bois semble vous remercier par une brise douce."
        },
        "bois_fin_echec": {
            "description": "Le spectre était trop puissant. Vous fuyez la forêt, les murmures vous poursuivant."
        },
        "pont_debut": {
            "description": "Le pont marchand principal est endommagé. Une corde principale a été sectionnée. Accident ou malveillance ?",
            "choice1_text": "Examiner les dégâts (Intelligence 12+)",
            "choice1_success_text": "La corde a été coupée net. C'est un sabotage. Il faut le réparer ou trouver les coupables.",
            "choice1_failure_text": "Vous ne voyez rien de spécial. Le pont est juste cassé. Que faire ?"
        },
        "pont_choix": {
            "description": "Que faire ? Réparer le pont vous-même ou chercher les saboteurs ?",
            "choice1_text": "Réparer le pont (Force 22+)",
            "choice1_success_text": "Avec force, vous parvenez à retendre une nouvelle corde et à stabiliser le pont.",
            "choice1_failure_text": "Vous manquez de force et glissez dangereusement. Vous vous rattrapez, mais vous êtes blessé.",
            "choice2_text": "Suivre les traces des saboteurs (Intelligence 15+)",
            "choice2_success_text": "Les traces vous mènent à un petit campement de bandits.",
            "choice2_failure_text": "Vous perdez rapidement leur piste dans la forêt."
        },
        "pont_bandits": {
            "description": "Les bandits sont surpris de vous voir. Ils brandissent leurs armes.",
            "choice1_text": "Les punir pour leur méfait"
        },
        "pont_fin_repare": {
            "description": "Le pont est de nouveau opérationnel grâce à vous. Les marchands et les villageois vous remercient."
        },
        "pont_fin_echec": {
            "description": "Vous n'avez réussi ni à réparer le pont, ni à trouver les coupables."
        },
        "contrat_herbo_debut": {
            "description": "Un herboriste vous engage pour cueillir une Fleur de Lune. Problème : elle ne pousse qu'au sommet d'une falaise infestée de harpies.",
            "choice1_text": "Accepter le contrat",
            "choice1_success_text": "Vous vous rendez au pied de la falaise. L'ascension s'annonce difficile."
        },
        "contrat_herbo_ascension": {
            "description": "Vous commencez à grimper. Les harpies vous bombardent de projectiles et tentent de vous faire tomber.",
            "choice1_text": "Grimper vite et bien (Agilité 20+)",
            "choice1_success_text": "Votre agilité vous permet d'esquiver leurs attaques et d'atteindre le sommet rapidement.",
            "choice1_failure_text": "Vous êtes touché plusieurs fois et manquez de tomber. L'ascension vous épuise."
        },
        "contrat_herbo_sommet": {
            "description": "Au sommet, la Fleur de Lune brille doucement. Mais elle est gardée par une harpie plus grande que les autres.",
            "choice1_text": "Combattre la matriarche harpie",
            "choice2_text": "Créer une diversion (Chance 18+)",
            "choice2_success_text": "Vous jetez un objet brillant au loin. La harpie, attirée par ce qui luit, quitte le nid. Vous en profitez pour cueillir la fleur et filer.",
            "choice2_failure_text": "La harpie n'est pas dupe. Elle vous attaque avec fureur !"
        },
        "contrat_herbo_fin_succes": {
            "description": "Vous ramenez la Fleur de Lune à l'herboriste, qui vous paie grassement pour cet exploit."
        },
        "contrat_herbo_fin_echec": {
            "description": "Les harpies étaient trop nombreuses et trop féroces. Vous battez en retraite, blessé et sans la fleur."
        },
        "crypte_agitee_debut": {
            "description": "La vieille crypte du village est devenue une source de peur. Des bruits d'ossements qui s'entrechoquent se font entendre la nuit.",
            "choice1_text": "Descendre dans la crypte",
            "choice1_success_text": "Une odeur de poussière et de mort vous accueille."
        },
        "crypte_agitee_salle": {
            "description": "Dans la salle principale, plusieurs squelettes se sont relevés et errent sans but.",
            "choice1_text": "Purger la crypte par la force",
            "choice1_success_text": "Il est temps de renvoyer les morts à leur sommeil éternel."
        },
        "crypte_agitee_source": {
            "description": "Après le combat, vous trouvez un orbe sombre sur l'autel. Il semble être la source de l'agitation.",
            "choice1_text": "Détruire l'orbe (Force 15+)",
            "choice1_success_text": "Vous brisez l'orbe. Un cri silencieux résonne et le calme revient.",
            "choice1_failure_text": "L'orbe résiste et vous envoie une décharge d'énergie négative."
        },
        "crypte_agitee_fin_succes": {
            "description": "Vous avez ramené la paix dans la crypte. Le village vous est reconnaissant."
        },
        "crypte_agitee_fin_echec": {
            "description": "La magie nécromantique de la crypte était trop forte pour vous."
        },
        "tour_garde_debut": {
            "description": "Une tour de garde abandonnée sur la frontière est devenue un repaire de bandits qui détroussent les voyageurs.",
            "choice1_text": "Nettoyer la tour",
            "choice1_success_text": "Vous vous approchez de la tour. Des guetteurs sont postés."
        },
        "tour_garde_approche": {
            "description": "Comment allez-vous entrer ?",
            "choice1_text": "Attaque frontale, par la porte !",
            "choice1_success_text": "Vous enfoncez la porte et surprenez les premiers gardes.",
            "choice2_text": "Escalader le mur (Agilité 18+)",
            "choice2_success_text": "Vous grimpez silencieusement jusqu'à une fenêtre et entrez sans être vu. Vous avez l'avantage de la surprise.",
            "choice2_failure_text": "Vous glissez et faites du bruit. Les bandits sont alertés et vous attendent !"
        },
        "tour_garde_etage": {
            "description": "Vous avez nettoyé le rez-de-chaussée. Le chef des bandits vous attend à l'étage.",
            "choice1_text": "Monter affronter le chef",
            "choice1_success_text": "Le chef vous attend, une hache à la main."
        },
        "tour_garde_fin_succes": {
            "description": "Le chef est vaincu et la tour est sécurisée. Vous trouvez le butin des bandits."
        },
        "tour_garde_fin_echec": {
            "description": "Les bandits étaient trop bien organisés. Vous êtes forcé de battre en retraite."
        },
        "geyser_debut": {
            "description": "Un geyser près d'un camp minier est devenu instable, crachant de l'eau bouillante et de la vapeur à des moments imprévisibles, menaçant le camp.",
            "choice1_text": "Aller voir le geyser",
            "choice1_success_text": "Vous vous approchez prudemment de la source d'eau chaude."
        },
        "geyser_etude": {
            "description": "Le sol tremble. Vous devez comprendre le cycle du geyser pour le stabiliser.",
            "choice1_text": "Étudier le cycle (Intelligence 20+)",
            "choice1_success_text": "Vous comprenez que des roches instables bloquent partiellement le conduit. Il faut les enlever au bon moment.",
            "choice1_failure_text": "Vous ne comprenez pas le schéma. Une éruption soudaine vous brûle !"
        },
        "geyser_action": {
            "description": "Vous avez une courte fenêtre pour agir entre deux éruptions.",
            "choice1_text": "Placer une charge explosive (Défense 10+)",
            "choice1_success_text": "Vous placez la charge et vous mettez à l'abri juste à temps. L'explosion dégage le conduit et le geyser se stabilise.",
            "choice1_failure_text": "Vous êtes trop lent ! Une petite éruption vous frappe pendant que vous travaillez."
        },
        "geyser_fin_succes": {
            "description": "Le geyser est maintenant prévisible et sûr. Les mineurs vous offrent une partie de leur dernière trouvaille en métal."
        },
        "geyser_fin_echec": {
            "description": "Le geyser est trop dangereux. Vous conseillez aux mineurs de déplacer leur camp."
        },
        "troll_pont_debut": {
            "description": "Un troll énorme et stupide bloque un pont. Il demande un péage : 'TOUT VOTRE METAL !' ou un combat.",
            "choice1_text": "L'affronter en combat singulier",
            "choice1_success_text": "Vous dégainez votre arme. Le troll brandit un tronc d'arbre.",
            "choice2_text": "Essayer de le duper (Intelligence 16+)",
            "choice2_success_text": "Vous lui proposez une énigme. Distrait et confus, il se gratte la tête, vous laissant le temps de passer en courant.",
            "choice2_failure_text": "Le troll ne comprend pas votre énigme et s'énerve. 'Tête fait mal ! Toi écraser !'"
        },
        "troll_pont_fin_succes": {
            "description": "Vous avez vaincu le troll ! Le pont est libre et vous trouvez le 'trésor' du troll : un tas de cailloux et quelques objets de valeur."
        },
        "troll_pont_fin_dupe": {
            "description": "Votre esprit vif vous a sauvé d'un combat brutal. Vous traversez le pont sans une égratignure."
        },
        "troll_pont_fin_echec": {
            "description": "Le troll était bien plus fort que vous ne le pensiez. Il vous jette dans la rivière."
        },
        "cultistes_bois_debut": {
            "description": "Des rumeurs parlent de rituels étranges dans les bois la nuit. Le village vous demande d'enquêter discrètement.",
            "choice1_text": "Suivre les traces dans les bois",
            "choice1_success_text": "Vous trouvez un sentier caché menant plus profondément dans la forêt."
        },
        "cultistes_bois_camp": {
            "description": "Vous trouvez un campement de cultistes encapuchonnés autour d'une pierre runique luisante.",
            "choice1_text": "Observer le rituel (Intelligence 17+)",
            "choice1_success_text": "Vous comprenez qu'ils essaient d'invoquer un esprit. Vous pouvez perturber le rituel au moment clé.",
            "choice1_failure_text": "Vous ne comprenez rien à leurs incantations, mais vous faites du bruit et êtes repéré !",
            "choice2_text": "Attaquer par surprise (Agilité 16+)",
            "choice2_success_text": "Vous surgissez de l'ombre, semant la panique parmi les cultistes.",
            "choice2_failure_text": "Ils vous entendent arriver. La surprise est gâchée."
        },
        "cultistes_bois_sabotage": {
            "description": "Vous avez le choix : surcharger la rune ou inverser les symboles.",
            "choice1_text": "Surcharger la rune (Force 15+)",
            "choice1_success_text": "Vous lancez une grosse pierre sur la rune, la faisant exploser en énergie pure, dispersant les cultistes.",
            "choice2_text": "Inverser les symboles (Intelligence 20+)",
            "choice2_success_text": "Discrètement, vous modifiez une rune. L'esprit qu'ils invoquent se retourne contre eux ! Un pur chaos."
        },
        "cultistes_bois_fin_succes": {
            "description": "Vous avez mis fin aux activités du culte. Vous récupérez leurs artéfacts."
        },
        "cultistes_bois_fin_echec": {
            "description": "Les cultistes et leur magie étaient trop puissants. Vous avez dû fuir."
        },
        "collectionneur_debut": {
            "description": "Un noble excentrique vous engage pour voler une statue de griffon en jade du manoir de son rival, Lord Harrington.",
            "choice1_text": "Accepter le cambriolage",
            "choice1_success_text": "Vous attendez la nuit pour vous infiltrer dans le domaine Harrington."
        },
        "collectionneur_infiltration": {
            "description": "Le manoir est entouré d'un haut mur. La grille principale est gardée.",
            "choice1_text": "Escalader le mur (Agilité 19+)",
            "choice1_success_text": "Vous escaladez le mur et atterrissez sans un bruit dans les jardins.",
            "choice1_failure_text": "Vous glissez et tombez bruyamment. Les gardes sont alertés, vous devez fuir.",
            "choice2_text": "Soudoyer un garde (Chance 15+ & 50 Tissu)",
            "choice2_success_text": "Le garde hésite, mais accepte le pot-de-vin et vous laisse entrer.",
            "choice2_failure_text": "Le garde est loyal. Il sonne l'alarme."
        },
        "collectionneur_manoir": {
            "description": "Vous êtes à l'intérieur. La statue est dans le grand hall, mais le sol est un damier qui semble piégé.",
            "choice1_text": "Désactiver le piège (Intelligence 18+)",
            "choice1_success_text": "Vous repérez le mécanisme et désactivez le piège. Le chemin est libre.",
            "choice1_failure_text": "Vous marchez sur la mauvaise dalle ! Un gaz soporifique remplit la pièce. Vous vous réveillez en prison."
        },
        "collectionneur_fin_succes": {
            "description": "Vous vous échappez avec la statue. Votre employeur est ravi et vous paie une somme extravagante."
        },
        "collectionneur_fin_echec": {
            "description": "Le cambriolage a mal tourné. Vous repartez les mains vides et la réputation ternie."
        },
        "ferme_silence_debut": {
            "description": "Une ferme isolée, connue pour son activité, est silencieuse depuis une semaine. Le village s'inquiète.",
            "choice1_text": "Aller voir ce qui se passe",
            "choice1_success_text": "Vous vous approchez de la ferme. Un silence de mort règne."
        },
        "ferme_silence_enquete": {
            "description": "La porte de la maison est défoncée. L'intérieur est en désordre. Dans la grange, vous entendez un grognement.",
            "choice1_text": "Entrer dans la grange",
            "choice1_success_text": "Vous ouvrez la porte de la grange avec précaution."
        },
        "ferme_silence_grange": {
            "description": "À l'intérieur, un sanglier d'une taille anormale, les yeux rouges de rage, a saccagé l'endroit. Il vous charge !",
            "choice1_text": "Affronter la bête"
        },
        "ferme_silence_fin_succes": {
            "description": "Vous avez abattu la bête enragée. Les fermiers s'étaient cachés dans la cave. Ils vous remercient de les avoir sauvés."
        },
        "ferme_silence_fin_echec": {
            "description": "Le sanglier était trop féroce. Vous avez dû fuir, laissant la ferme à son triste sort."
        },
        "puits_souhaits_debut": {
            "description": "La légende locale parle d'un puits qui exauce les vœux si on y jette une pièce. Mais récemment, ceux qui s'approchent sentent un grand froid.",
            "choice1_text": "Tenter sa chance au puits",
            "choice1_success_text": "Vous vous approchez du vieux puits en pierre."
        },
        "puits_souhaits_esprit": {
            "description": "En vous penchant, un spectre gémissant sort du puits ! 'Mon trésor !', hurle-t-il.",
            "choice1_text": "Le combattre pour libérer le puits",
            "choice2_text": "Lui jeter une pièce (Chance 20+)",
            "choice2_success_text": "Vous jetez une pièce. L'esprit, obsédé par l'or, plonge pour la rattraper, vous laissant une chance de piller une partie de son trésor.",
            "choice2_failure_text": "La pièce ne l'intéresse pas. Seule votre âme l'attire !"
        },
        "puits_souhaits_fin_succes": {
            "description": "L'esprit vaincu, le puits est libéré. Vous trouvez au fond un petit trésor accumulé."
        },
        "puits_souhaits_fin_moyen": {
            "description": "Vous avez trompé l'esprit et volé une partie de son butin. Malin !"
        },
        "puits_souhaits_fin_echec": {
            "description": "La cupidité de l'esprit était trop forte. Son contact glacial vous a presque tué."
        },
        "bete_plaines_debut": {
            "description": "Une créature rapide et féroce, que les locaux appellent le 'Démon Vif-Argent', attaque les caravanes dans les plaines.",
            "choice1_text": "Partir chasser la bête",
            "choice1_success_text": "Vous utilisez une carcasse comme appât et attendez."
        },
        "bete_plaines_combat": {
            "description": "La bête apparaît. C'est une sorte de grand félin aux écailles argentées. Elle est incroyablement rapide.",
            "choice1_text": "L'esquiver et contre-attaquer (Agilité 22+)",
            "choice1_success_text": "Vous parvenez à suivre ses mouvements et à la blesser. Elle bat en retraite.",
            "choice1_failure_text": "Elle est trop rapide. Ses griffes lacèrent votre armure et votre chair.",
            "choice2_text": "Encaisser le choc et frapper (Force 20+ & Défense 10+)",
            "choice2_success_text": "Vous encaissez sa charge et profitez de l'ouverture pour lui asséner un coup fatal.",
            "choice2_failure_text": "Votre coup est trop lent et votre défense ne suffit pas. La bête vous met en pièces."
        },
        "bete_plaines_fin_succes": {
            "description": "Vous avez vaincu le Démon Vif-Argent. Les routes sont de nouveau sûres et la guilde des marchands vous récompense."
        },
        "bete_plaines_fin_echec": {
            "description": "La vitesse de la créature était surnaturelle. Vous avez survécu, mais la bête court toujours."
        },
        "ruines_debut": {
            "description": "Vous arrivez devant des ruines envahies par la végétation. Une entrée principale s'offre à vous, mais un mur effondré semble révéler un passage secret.",
            "choice1_text": "Prendre l'entrée principale (Défense 5+)",
            "choice1_success_text": "Vous entrez prudemment. Votre équipement vous protège des quelques chutes de pierres.",
            "choice1_failure_text": "Une pierre vous tombe dessus et vous sonne un peu.",
            "choice2_text": "Explorer le passage secret (Chance 15+)",
            "choice2_success_text": "La chance vous sourit ! Le passage débouche sur une petite salle au trésor oubliée.",
            "choice2_failure_text": "Le passage est un cul-de-sac. Vous perdez du temps et devez prendre l'entrée principale."
        },
        "ruines_salle_centrale": {
            "description": "La salle centrale est vaste. Des squelettes de pilleurs de tombes jonchent le sol. Soudain, une lueur malveillante les anime !",
            "choice1_text": "Combattre les morts-vivants !"
        },
        "ruines_chambre_secrete": {
            "description": "Après le combat, vous remarquez un courant d'air derrière une tapisserie. Vous la déchirez et révélez une chambre secrète.",
            "choice1_text": "Piller la chambre secrète",
            "choice1_success_text": "Vous trouvez un coffre rempli de métal ancien et de quelques objets de valeur."
        },
        "ruines_fin_succes_complet": {
            "description": "Vous quittez les ruines avec un butin bien plus conséquent que prévu. Une belle réussite !"
        },
        "ruines_fin_succes": {
            "description": "Votre chance vous a mené à un trésor inattendu, vous évitant les dangers principaux."
        },
        "ruines_fin_echec": {
            "description": "Les gardiens morts-vivants étaient trop nombreux. Vous fuyez les ruines les mains vides."
        },
        "escorte_debut": {
            "description": "Un marchand nerveux vous offre une belle somme pour l'escorter à travers la forêt, réputée pour ses bandits.",
            "choice1_text": "Accepter la mission",
            "choice1_success_text": "Vous acceptez. Le marchand semble rassuré par votre présence."
        },
        "escorte_chemin": {
            "description": "Vous avancez sur le chemin. Soudain, des bandits sortent des fourrés !",
            "choice1_text": "Protéger le chariot (Défense 8+)",
            "choice1_success_text": "Vous vous placez devant le chariot, parant les flèches. Voyant leur cible protégée, ils chargent !",
            "choice1_failure_text": "Une flèche se plante dans une roue du chariot, le brisant. Vous devez réparer en vous défendant !",
            "choice2_text": "Charger les bandits !",
            "choice2_success_text": "Vous foncez dans le tas pour les affronter directement."
        },
        "escorte_reparation": {
            "description": "La roue est cassée. Le marchand est paniqué pendant que vous repoussez les bandits.",
            "choice1_text": "Utiliser 50 bois pour réparer.",
            "choice1_success_text": "Avec vos ressources, vous bricolez une réparation solide. Vous pouvez repartir.",
            "choice1_failure_text": "Vous n'avez pas de quoi réparer. Vous abandonnez le chariot."
        },
        "escorte_destination": {
            "description": "Vous arrivez à destination. Le marchand, reconnaissant, vous paie la somme convenue.",
            "choice1_text": "Empocher la récompense",
            "choice1_success_text": "Une mission rondement menée."
        },
        "escorte_fin_succes": {
            "description": "Mission accomplie ! Le marchand vous remercie chaleureusement."
        },
        "escorte_fin_echec": {
            "description": "Vous avez échoué à protéger la cargaison. Le marchand est furieux et refuse de vous payer."
        },
        "marais_debut": {
            "description": "Vous vous enfoncez dans un marais brumeux. L'air est lourd et humide. Un sentier boueux semble être la seule voie.",
            "choice1_text": "Suivre le sentier (Intelligence 15+)",
            "choice1_success_text": "Vous analysez les traces et la consistance du sol pour ne pas vous embourber.",
            "choice1_failure_text": "Vous choisissez mal votre chemin et vous embourbez jusqu'à la taille. Vous mettez du temps à vous en sortir.",
            "choice2_text": "Couper à travers l'eau stagnante (Vie 12+)",
            "choice2_success_text": "C'est plus rapide, mais des sangsues s'accrochent à vous. Votre vitalité vous aide à supporter.",
            "choice2_failure_text": "Les sangsues et les maladies du marais vous affaiblissent considérablement."
        },
        "marais_cabane": {
            "description": "Au cœur du marais, vous trouvez une cabane délabrée sur pilotis. De la fumée s'échappe de la cheminée.",
            "choice1_text": "Frapper à la porte",
            "choice1_success_text": "Un vieil ermite vous ouvre. Touché par votre audace, il partage avec vous quelques ressources.",
            "choice2_text": "Ignorer la cabane et continuer",
            "choice2_success_text": "Prudent, vous préférez ne pas déranger et continuez votre chemin pour sortir du marais."
        },
        "marais_fin_succes": {
            "description": "L'ermite vous a bien aidé. Vous quittez le marais avec de nouvelles ressources."
        },
        "marais_fin_moyen": {
            "description": "Vous sortez du marais sans encombre, mais sans avoir trouvé de trésor particulier."
        },
        "marais_fin_echec": {
            "description": "Vous sortez enfin de ce marécage maudit, sale et épuisé."
        },
        "mine_debut": {
            "description": "Les mineurs sont paniqués. Un éboulement bloque la galerie principale, et des 'cliquetis' étranges se font entendre de l'autre côté.",
            "choice1_text": "Proposer son aide",
            "choice1_success_text": "Vous décidez d'aider. Il faut d'abord dégager le passage."
        },
        "mine_degagement": {
            "description": "Les rochers bloquent l'entrée. C'est un travail de force.",
            "choice1_text": "Dégager les rochers (Force 20+)",
            "choice1_success_text": "Votre puissance est impressionnante. Vous dégagez le passage en un temps record.",
            "choice1_failure_text": "C'est trop lourd. Vous demandez de l'aide aux mineurs, ce qui prend plus de temps."
        },
        "mine_creatures": {
            "description": "Derrière les rochers, vous découvrez une colonie de créatures insectoïdes géantes qui ont envahi la mine.",
            "choice1_text": "Exterminer les créatures !",
            "choice1_success_text": "Ces choses ne vous font pas peur. En garde !"
        },
        "mine_fin_succes": {
            "description": "Les mineurs vous acclament ! En récompense, ils vous offrent une part du premier filon de métal que vous avez libéré."
        },
        "mine_fin_echec": {
            "description": "Les créatures vous ont repoussé. Les mineurs sont déçus et vous ne recevez aucune récompense."
        },
        "bois_debut": {
            "description": "Vous entrez dans les Bois Murmurants. Des chuchotements sinistres semblent venir de toutes les directions.",
            "choice1_text": "Chercher la source des murmures",
            "choice1_success_text": "Vous vous enfoncez plus profondément, guidé par les sons étranges."
        },
        "bois_source": {
            "description": "Les murmures vous mènent à une statue de pierre ancienne. Les sons semblent émaner d'elle. Un spectre gémissant apparaît !",
            "choice1_text": "Affronter le spectre",
            "choice1_success_text": "La source du mal doit être éliminée !",
            "choice2_text": "Tenter de purifier la statue (Intelligence 18+)",
            "choice2_success_text": "Vous récitez une prière de purification. Le spectre, apaisé, disparaît en laissant derrière lui un écho de paix.",
            "choice2_failure_text": "Votre prière n'a aucun effet. Le spectre, irrité, vous attaque !"
        },
        "bois_fin_succes": {
            "description": "Vous avez vaincu le spectre. Le silence est revenu dans la forêt."
        },
        "bois_fin_purifie": {
            "description": "Vous avez apaisé l'esprit sans violence. Le bois semble vous remercier par une brise douce."
        },
        "bois_fin_echec": {
            "description": "Le spectre était trop puissant. Vous fuyez la forêt, les murmures vous poursuivant."
        },
        "pont_debut": {
            "description": "Le pont marchand principal est endommagé. Une corde principale a été sectionnée. Accident ou malveillance ?",
            "choice1_text": "Examiner les dégâts (Intelligence 12+)",
            "choice1_success_text": "La corde a été coupée net. C'est un sabotage. Il faut le réparer ou trouver les coupables.",
            "choice1_failure_text": "Vous ne voyez rien de spécial. Le pont est juste cassé. Que faire ?"
        },
        "pont_choix": {
            "description": "Que faire ? Réparer le pont vous-même ou chercher les saboteurs ?",
            "choice1_text": "Réparer le pont (Force 22+)",
            "choice1_success_text": "Avec force, vous parvenez à retendre une nouvelle corde et à stabiliser le pont.",
            "choice1_failure_text": "Vous manquez de force et glissez dangereusement. Vous vous rattrapez, mais vous êtes blessé.",
            "choice2_text": "Suivre les traces des saboteurs (Intelligence 15+)",
            "choice2_success_text": "Les traces vous mènent à un petit campement de bandits.",
            "choice2_failure_text": "Vous perdez rapidement leur piste dans la forêt."
        },
        "pont_bandits": {
            "description": "Les bandits sont surpris de vous voir. Ils brandissent leurs armes.",
            "choice1_text": "Les punir pour leur méfait"
        },
        "pont_fin_repare": {
            "description": "Le pont est de nouveau opérationnel grâce à vous. Les marchands et les villageois vous remercient."
        },
        "pont_fin_echec": {
            "description": "Vous n'avez réussi ni à réparer le pont, ni à trouver les coupables."
        },
        "contrat_herbo_debut": {
            "description": "Un herboriste vous engage pour cueillir une Fleur de Lune. Problème : elle ne pousse qu'au sommet d'une falaise infestée de harpies.",
            "choice1_text": "Accepter le contrat",
            "choice1_success_text": "Vous vous rendez au pied de la falaise. L'ascension s'annonce difficile."
        },
        "contrat_herbo_ascension": {
            "description": "Vous commencez à grimper. Les harpies vous bombardent de projectiles et tentent de vous faire tomber.",
            "choice1_text": "Grimper vite et bien (Agilité 20+)",
            "choice1_success_text": "Votre agilité vous permet d'esquiver leurs attaques et d'atteindre le sommet rapidement.",
            "choice1_failure_text": "Vous êtes touché plusieurs fois et manquez de tomber. L'ascension vous épuise."
        },
        "contrat_herbo_sommet": {
            "description": "Au sommet, la Fleur de Lune brille doucement. Mais elle est gardée par une harpie plus grande que les autres.",
            "choice1_text": "Combattre la matriarche harpie",
            "choice2_text": "Créer une diversion (Chance 18+)",
            "choice2_success_text": "Vous jetez un objet brillant au loin. La harpie, attirée par ce qui luit, quitte le nid. Vous en profitez pour cueillir la fleur et filer.",
            "choice2_failure_text": "La harpie n'est pas dupe. Elle vous attaque avec fureur !"
        },
        "contrat_herbo_fin_succes": {
            "description": "Vous ramenez la Fleur de Lune à l'herboriste, qui vous paie grassement pour cet exploit."
        },
        "contrat_herbo_fin_echec": {
            "description": "Les harpies étaient trop nombreuses et trop féroces. Vous battez en retraite, blessé et sans la fleur."
        },
        "crypte_agitee_debut": {
            "description": "La vieille crypte du village est devenue une source de peur. Des bruits d'ossements qui s'entrechoquent se font entendre la nuit.",
            "choice1_text": "Descendre dans la crypte",
            "choice1_success_text": "Une odeur de poussière et de mort vous accueille."
        },
        "crypte_agitee_salle": {
            "description": "Dans la salle principale, plusieurs squelettes se sont relevés et errent sans but.",
            "choice1_text": "Purger la crypte par la force",
            "choice1_success_text": "Il est temps de renvoyer les morts à leur sommeil éternel."
        },
        "crypte_agitee_source": {
            "description": "Après le combat, vous trouvez un orbe sombre sur l'autel. Il semble être la source de l'agitation.",
            "choice1_text": "Détruire l'orbe (Force 15+)",
            "choice1_success_text": "Vous brisez l'orbe. Un cri silencieux résonne et le calme revient.",
            "choice1_failure_text": "L'orbe résiste et vous envoie une décharge d'énergie négative."
        },
        "crypte_agitee_fin_succes": {
            "description": "Vous avez ramené la paix dans la crypte. Le village vous est reconnaissant."
        },
        "crypte_agitee_fin_echec": {
            "description": "La magie nécromantique de la crypte était trop forte pour vous."
        },
        "tour_garde_debut": {
            "description": "Une tour de garde abandonnée sur la frontière est devenue un repaire de bandits qui détroussent les voyageurs.",
            "choice1_text": "Nettoyer la tour",
            "choice1_success_text": "Vous vous approchez de la tour. Des guetteurs sont postés."
        },
        "tour_garde_approche": {
            "description": "Comment allez-vous entrer ?",
            "choice1_text": "Attaque frontale, par la porte !",
            "choice1_success_text": "Vous enfoncez la porte et surprenez les premiers gardes.",
            "choice2_text": "Escalader le mur (Agilité 18+)",
            "choice2_success_text": "Vous grimpez silencieusement jusqu'à une fenêtre et entrez sans être vu. Vous avez l'avantage de la surprise.",
            "choice2_failure_text": "Vous glissez et faites du bruit. Les bandits sont alertés et vous attendent !"
        },
        "tour_garde_etage": {
            "description": "Vous avez nettoyé le rez-de-chaussée. Le chef des bandits vous attend à l'étage.",
            "choice1_text": "Monter affronter le chef",
            "choice1_success_text": "Le chef vous attend, une hache à la main."
        },
        "tour_garde_fin_succes": {
            "description": "Le chef est vaincu et la tour est sécurisée. Vous trouvez le butin des bandits."
        },
        "tour_garde_fin_echec": {
            "description": "Les bandits étaient trop bien organisés. Vous êtes forcé de battre en retraite."
        },
        "geyser_debut": {
            "description": "Un geyser près d'un camp minier est devenu instable, crachant de l'eau bouillante et de la vapeur à des moments imprévisibles, menaçant le camp.",
            "choice1_text": "Aller voir le geyser",
            "choice1_success_text": "Vous vous approchez prudemment de la source d'eau chaude."
        },
        "geyser_etude": {
            "description": "Le sol tremble. Vous devez comprendre le cycle du geyser pour le stabiliser.",
            "choice1_text": "Étudier le cycle (Intelligence 20+)",
            "choice1_success_text": "Vous comprenez que des roches instables bloquent partiellement le conduit. Il faut les enlever au bon moment.",
            "choice1_failure_text": "Vous ne comprenez pas le schéma. Une éruption soudaine vous brûle !"
        },
        "geyser_action": {
            "description": "Vous avez une courte fenêtre pour agir entre deux éruptions.",
            "choice1_text": "Placer une charge explosive (Défense 10+)",
            "choice1_success_text": "Vous placez la charge et vous mettez à l'abri juste à temps. L'explosion dégage le conduit et le geyser se stabilise.",
            "choice1_failure_text": "Vous êtes trop lent ! Une petite éruption vous frappe pendant que vous travaillez."
        },
        "geyser_fin_succes": {
            "description": "Le geyser est maintenant prévisible et sûr. Les mineurs vous offrent une partie de leur dernière trouvaille en métal."
        },
        "geyser_fin_echec": {
            "description": "Le geyser est trop dangereux. Vous conseillez aux mineurs de déplacer leur camp."
        },
        "troll_pont_debut": {
            "description": "Un troll énorme et stupide bloque un pont. Il demande un péage : 'TOUT VOTRE METAL !' ou un combat.",
            "choice1_text": "L'affronter en combat singulier",
            "choice1_success_text": "Vous dégainez votre arme. Le troll brandit un tronc d'arbre.",
            "choice2_text": "Essayer de le duper (Intelligence 16+)",
            "choice2_success_text": "Vous lui proposez une énigme. Distrait et confus, il se gratte la tête, vous laissant le temps de passer en courant.",
            "choice2_failure_text": "Le troll ne comprend pas votre énigme et s'énerve. 'Tête fait mal ! Toi écraser !'"
        },
        "troll_pont_fin_succes": {
            "description": "Vous avez vaincu le troll ! Le pont est libre et vous trouvez le 'trésor' du troll : un tas de cailloux et quelques objets de valeur."
        },
        "troll_pont_fin_dupe": {
            "description": "Votre esprit vif vous a sauvé d'un combat brutal. Vous traversez le pont sans une égratignure."
        },
        "troll_pont_fin_echec": {
            "description": "Le troll était bien plus fort que vous ne le pensiez. Il vous jette dans la rivière."
        },
        "cultistes_bois_debut": {
            "description": "Des rumeurs parlent de rituels étranges dans les bois la nuit. Le village vous demande d'enquêter discrètement.",
            "choice1_text": "Suivre les traces dans les bois",
            "choice1_success_text": "Vous trouvez un sentier caché menant plus profondément dans la forêt."
        },
        "cultistes_bois_camp": {
            "description": "Vous trouvez un campement de cultistes encapuchonnés autour d'une pierre runique luisante.",
            "choice1_text": "Observer le rituel (Intelligence 17+)",
            "choice1_success_text": "Vous comprenez qu'ils essaient d'invoquer un esprit. Vous pouvez perturber le rituel au moment clé.",
            "choice1_failure_text": "Vous ne comprenez rien à leurs incantations, mais vous faites du bruit et êtes repéré !",
            "choice2_text": "Attaquer par surprise (Agilité 16+)",
            "choice2_success_text": "Vous surgissez de l'ombre, semant la panique parmi les cultistes.",
            "choice2_failure_text": "Ils vous entendent arriver. La surprise est gâchée."
        },
        "cultistes_bois_sabotage": {
            "description": "Vous avez le choix : surcharger la rune ou inverser les symboles.",
            "choice1_text": "Surcharger la rune (Force 15+)",
            "choice1_success_text": "Vous lancez une grosse pierre sur la rune, la faisant exploser en énergie pure, dispersant les cultistes.",
            "choice2_text": "Inverser les symboles (Intelligence 20+)",
            "choice2_success_text": "Discrètement, vous modifiez une rune. L'esprit qu'ils invoquent se retourne contre eux ! Un pur chaos."
        },
        "cultistes_bois_fin_succes": {
            "description": "Vous avez mis fin aux activités du culte. Vous récupérez leurs artéfacts."
        },
        "cultistes_bois_fin_echec": {
            "description": "Les cultistes et leur magie étaient trop puissants. Vous avez dû fuir."
        },
        "collectionneur_debut": {
            "description": "Un noble excentrique vous engage pour voler une statue de griffon en jade du manoir de son rival, Lord Harrington.",
            "choice1_text": "Accepter le cambriolage",
            "choice1_success_text": "Vous attendez la nuit pour vous infiltrer dans le domaine Harrington."
        },
        "collectionneur_infiltration": {
            "description": "Le manoir est entouré d'un haut mur. La grille principale est gardée.",
            "choice1_text": "Escalader le mur (Agilité 19+)",
            "choice1_success_text": "Vous escaladez le mur et atterrissez sans un bruit dans les jardins.",
            "choice1_failure_text": "Vous glissez et tombez bruyamment. Les gardes sont alertés, vous devez fuir.",
            "choice2_text": "Soudoyer un garde (Chance 15+ & 50 Tissu)",
            "choice2_success_text": "Le garde hésite, mais accepte le pot-de-vin et vous laisse entrer.",
            "choice2_failure_text": "Le garde est loyal. Il sonne l'alarme."
        },
        "collectionneur_manoir": {
            "description": "Vous êtes à l'intérieur. La statue est dans le grand hall, mais le sol est un damier qui semble piégé.",
            "choice1_text": "Désactiver le piège (Intelligence 18+)",
            "choice1_success_text": "Vous repérez le mécanisme et désactivez le piège. Le chemin est libre.",
            "choice1_failure_text": "Vous marchez sur la mauvaise dalle ! Un gaz soporifique remplit la pièce. Vous vous réveillez en prison."
        },
        "collectionneur_fin_succes": {
            "description": "Vous vous échappez avec la statue. Votre employeur est ravi et vous paie une somme extravagante."
        },
        "collectionneur_fin_echec": {
            "description": "Le cambriolage a mal tourné. Vous repartez les mains vides et la réputation ternie."
        },
        "ferme_silence_debut": {
            "description": "Une ferme isolée, connue pour son activité, est silencieuse depuis une semaine. Le village s'inquiète.",
            "choice1_text": "Aller voir ce qui se passe",
            "choice1_success_text": "Vous vous approchez de la ferme. Un silence de mort règne."
        },
        "ferme_silence_enquete": {
            "description": "La porte de la maison est défoncée. L'intérieur est en désordre. Dans la grange, vous entendez un grognement.",
            "choice1_text": "Entrer dans la grange",
            "choice1_success_text": "Vous ouvrez la porte de la grange avec précaution."
        },
        "ferme_silence_grange": {
            "description": "À l'intérieur, un sanglier d'une taille anormale, les yeux rouges de rage, a saccagé l'endroit. Il vous charge !",
            "choice1_text": "Affronter la bête"
        },
        "ferme_silence_fin_succes": {
            "description": "Vous avez abattu la bête enragée. Les fermiers s'étaient cachés dans la cave. Ils vous remercient de les avoir sauvés."
        },
        "ferme_silence_fin_echec": {
            "description": "Le sanglier était trop féroce. Vous avez dû fuir, laissant la ferme à son triste sort."
        },
        "puits_souhaits_debut": {
            "description": "La légende locale parle d'un puits qui exauce les vœux si on y jette une pièce. Mais récemment, ceux qui s'approchent sentent un grand froid.",
            "choice1_text": "Tenter sa chance au puits",
            "choice1_success_text": "Vous vous approchez du vieux puits en pierre."
        },
        "puits_souhaits_esprit": {
            "description": "En vous penchant, un spectre gémissant sort du puits ! 'Mon trésor !', hurle-t-il.",
            "choice1_text": "Le combattre pour libérer le puits",
            "choice2_text": "Lui jeter une pièce (Chance 20+)",
            "choice2_success_text": "Vous jetez une pièce. L'esprit, obsédé par l'or, plonge pour la rattraper, vous laissant une chance de piller une partie de son trésor.",
            "choice2_failure_text": "La pièce ne l'intéresse pas. Seule votre âme l'attire !"
        },
        "puits_souhaits_fin_succes": {
            "description": "L'esprit vaincu, le puits est libéré. Vous trouvez au fond un petit trésor accumulé."
        },
        "puits_souhaits_fin_moyen": {
            "description": "Vous avez trompé l'esprit et volé une partie de son butin. Malin !"
        },
        "puits_souhaits_fin_echec": {
            "description": "La cupidité de l'esprit était trop forte. Son contact glacial vous a presque tué."
        },
        "bete_plaines_debut": {
            "description": "Une créature rapide et féroce, que les locaux appellent le 'Démon Vif-Argent', attaque les caravanes dans les plaines.",
            "choice1_text": "Partir chasser la bête",
            "choice1_success_text": "Vous utilisez une carcasse comme appât et attendez."
        },
        "bete_plaines_combat": {
            "description": "La bête apparaît. C'est une sorte de grand félin aux écailles argentées. Elle est incroyablement rapide.",
            "choice1_text": "L'esquiver et contre-attaquer (Agilité 22+)",
            "choice1_success_text": "Vous parvenez à suivre ses mouvements et à la blesser. Elle bat en retraite.",
            "choice1_failure_text": "Elle est trop rapide. Ses griffes lacèrent votre armure et votre chair.",
            "choice2_text": "Encaisser le choc et frapper (Force 20+ & Défense 10+)",
            "choice2_success_text": "Vous encaissez sa charge et profitez de l'ouverture pour lui asséner un coup fatal.",
            "choice2_failure_text": "Votre coup est trop lent et votre défense ne suffit pas. La bête vous met en pièces."
        },
        "bete_plaines_fin_succes": {
            "description": "Vous avez vaincu le Démon Vif-Argent. Les routes sont de nouveau sûres et la guilde des marchands vous récompense."
        },
        "bete_plaines_fin_echec": {
            "description": "La vitesse de la créature était surnaturelle. Vous avez survécu, mais la bête court toujours."
        },
        "prime_debut": {
            "description": "Le capitaine de la garde vous montre une carte menant à un camp de bandits bien organisé. 'Nettoyez-moi ça, et la récompense est à vous', dit-il.",
            "choice1_text": "Partir pour le camp",
            "choice1_success_text": "Vous vous mettez en route, direction le repaire des malandrins."
        },
        "prime_approche": {
            "description": "Vous êtes en vue du camp. Il y a des gardes postés à l'entrée, mais vous remarquez une falaise qui pourrait être escaladée sur le côté.",
            "choice1_text": "Approche furtive par la falaise (Agilité 35+)",
            "choice1_success_text": "Vous escaladez avec l'agilité d'un chat et surprenez le camp par l'arrière. Avantage tactique !",
            "choice1_failure_text": "Vous glissez à mi-chemin et vous faites repérer. L'effet de surprise est raté, ils vous attendent !",
            "choice2_text": "Attaque frontale",
            "choice2_success_text": "Pas de temps pour la finesse. Vous foncez sur les gardes !"
        },
        "prime_combat_surprise": {
            "description": "Profitant de la confusion, vous mettez hors d'état de nuire plusieurs bandits avant qu'ils ne puissent réagir. Le chef est le seul obstacle restant.",
            "choice1_text": "Affronter le chef !",
            "choice1_success_text": "Vous engagez le chef en combat singulier."
        },
        "prime_chef": {
            "description": "Le chef bandit, un colosse balafré, vous considère avec un sourire cruel. 'Tu as causé assez de problèmes. Ton aventure s'arrête ici !'",
            "choice1_text": "Tenter de le neutraliser discrètement (Agilité 35+)",
            "choice1_success_text": "Profitant d'une diversion, vous l'assommez. Les bandits restants, sans chef, se rendent.",
            "choice1_failure_text": "Il vous repère. Le combat est inévitable.",
            "choice2_text": "L'affronter en duel à mort !",
            "choice2_success_text": "Le chef brandit sa hache massive. En garde !"
        },
        "prime_fin_succes": {
            "description": "Vous retournez voir le capitaine avec la preuve de votre victoire. Il vous paie grassement, en plus de tout le butin trouvé dans le camp."
        },
        "prime_fin_echec": {
            "description": "Vous avez échoué. Les bandits se sont renforcés et la prime a été annulée. Une cuisante défaite."
        },
        "montagne_debut": {
            "description": "Vous entamez l'ascension d'une montagne au pic enneigé. Le vent glacial mord votre visage.",
            "choice1_text": "Suivre le sentier principal",
            "choice1_success_text": "Le chemin est long et exposé au froid. Vous devez faire preuve d'endurance."
        },
        "montagne_ascension": {
            "description": "Une avalanche se déclenche au-dessus de vous !",
            "choice1_text": "Se réfugier derrière un rocher (Défense 15+)",
            "choice1_success_text": "Vous vous abritez juste à temps. La neige déferle autour de vous mais vous êtes en sécurité.",
            "choice1_failure_text": "Le souffle de l'avalanche vous emporte. Vous êtes secoué mais vivant.",
            "choice2_text": "Courir pour l'éviter (Agilité 30+)",
            "choice2_success_text": "Votre vitesse vous permet de sortir de la trajectoire de l'avalanche. C'était moins une !",
            "choice2_failure_text": "Vous n'êtes pas assez rapide. La neige vous ensevelit brièvement."
        },
        "montagne_sommet": {
            "description": "Vous atteignez le sommet glacial. Un Golem de Pierre, gardien des lieux, s'anime.",
            "choice1_text": "Affronter le Gardien"
        },
        "montagne_fin_succes": {
            "description": "Le gardien vaincu, vous découvrez un riche filon de métal rare, exposé par le froid éternel."
        },
        "montagne_fin_echec": {
            "description": "La montagne et son gardien étaient trop hostiles. Vous rebroussez chemin, vaincu par les éléments."
        },
        "crypte_debut": {
            "description": "Une ancienne crypte renfermerait un artefact puissant, mais une inscription prévient qu'il est maudit.",
            "choice1_text": "Entrer dans la crypte",
            "choice1_success_text": "La porte grince en s'ouvrant sur des ténèbres poussiéreuses."
        },
        "crypte_salle_piegee": {
            "description": "Le sol est couvert de dalles. Certaines semblent instables.",
            "choice1_text": "Traverser avec précaution (Chance 30+)",
            "choice1_success_text": "Votre chance vous guide sur le bon chemin. Vous traversez sans déclencher de piège.",
            "choice1_failure_text": "Vous marchez sur une mauvaise dalle. Des dards empoisonnés sortent des murs !"
        },
        "crypte_artefact": {
            "description": "Vous trouvez l'artefact, un sceptre d'obsidienne, sur un autel. Il pulse d'une énergie sombre.",
            "choice1_text": "Prendre l'artefact maudit",
            "choice1_success_text": "En le touchant, une vague d'énergie glaciale vous parcourt. Vous vous sentez plus puissant, mais affaibli.",
            "choice2_text": "Tenter de le purifier (Intelligence 35+)",
            "choice2_success_text": "Vous effectuez un rituel rapide qui atténue la malédiction de l'artefact. Il perd un peu de sa puissance, mais devient sûr à manipuler.",
            "choice2_failure_text": "Votre rituel échoue et la malédiction se déchaîne sur vous !"
        },
        "crypte_fin_succes": {
            "description": "Vous possédez maintenant un artefact d'une grande puissance, mais son aura maléfique vous pèsera peut-être un jour."
        },
        "crypte_fin_moyen": {
            "description": "Vous repartez avec un artefact purifié, moins puissant mais sans danger. La sagesse est une récompense en soi."
        },
        "crypte_fin_echec": {
            "description": "La malédiction de l'artefact était trop forte. Vous fuyez la crypte, l'âme glacée."
        },
        "caravane_debut": {
            "description": "Une caravane de luxe n'est jamais arrivée à destination. Le syndicat des marchands offre une fortune à qui la retrouvera.",
            "choice1_text": "Mener l'enquête",
            "choice1_success_text": "Vous commencez par inspecter la dernière position connue de la caravane."
        },
        "caravane_pistes": {
            "description": "Sur la route, vous trouvez des traces de lutte. Deux pistes se dessinent : des traces d'orcs vers les montagnes, et des empreintes humaines vers une forêt dense.",
            "choice1_text": "Suivre la piste des orcs",
            "choice1_success_text": "La piste vous mène à une grotte d'orcs. Ils festoient autour des marchandises volées.",
            "choice2_text": "Suivre la piste des humains (Intelligence 30+)",
            "choice2_success_text": "Votre flair vous dit que ce sont des bandits très organisés. Vous trouvez leur camp, où ils partagent le butin.",
            "choice2_failure_text": "Vous tombez dans une embuscade tendue par les bandits."
        },
        "caravane_fin_succes": {
            "description": "Vous retournez voir le syndicat avec la marchandise récupérée. Ils sont si heureux qu'ils vous couvrent d'or."
        },
        "caravane_fin_echec": {
            "description": "Vous revenez les mains vides et blessé. Le syndicat vous regarde avec mépris. Un échec total."
        },
        "temple_debut": {
            "description": "L'entrée du temple est une arche de pierre menant dans les profondeurs sombres et humides.",
            "choice1_text": "Descendre dans le temple",
            "choice1_success_text": "L'air est frais et sent l'ozone. Des pièges anciens protègent sûrement ce lieu."
        },
        "temple_salle_piegee": {
            "description": "Le sol d'une grande salle est couvert de dalles. Certaines semblent instables.",
            "choice1_text": "Traverser avec agilité (Agilité 38+)",
            "choice1_success_text": "Tel un danseur, vous sautez de dalle en dalle, évitant tous les pièges.",
            "choice1_failure_text": "Vous marchez sur une mauvaise dalle. Des dards empoisonnés sortent des murs !"
        },
        "temple_autel": {
            "description": "Vous arrivez devant un autel submergé. Au centre, un coffre scellé par la magie de l'eau. Un élémentaire d'eau le protège.",
            "choice1_text": "Briser le sceau (Intelligence 35+)",
            "choice1_success_text": "Vous déchiffrez les runes et le sceau se dissipe, affaiblissant l'élémentaire !",
            "choice2_text": "Tenter de forcer le coffre",
            "choice2_success_text": "Votre tentative échoue et déclenche la fureur du gardien élémentaire !"
        },
        "temple_fin_succes": {
            "description": "Vous repartez avec le trésor du Temple Englouti, un exploit que peu peuvent raconter."
        },
        "temple_fin_echec": {
            "description": "Le temple et son gardien ont gardé leurs secrets. Vous repartez trempé et déçu."
        },
        "arene_debut": {
            "description": "Vous vous inscrivez au tournoi de l'Arène. La première épreuve est un combat contre des bêtes.",
            "choice1_text": "Entrer dans l'arène"
        },
        "arene_agilite": {
            "description": "Vous avez gagné ! La deuxième épreuve est une course d'obstacles piégée.",
            "choice1_text": "Tenter la course (Agilité 32+)",
            "choice1_success_text": "Vous volez au-dessus des obstacles. Votre agilité est inégalée. Vous passez à la finale !",
            "choice1_failure_text": "Vous trébuchez sur un obstacle. L'humiliation est totale. Vous êtes éliminé."
        },
        "arene_finale": {
            "description": "La finale est un duel contre le champion en titre, un guerrier redoutable.",
            "choice1_text": "Combattre pour la gloire !"
        },
        "arene_fin_succes": {
            "description": "Vous êtes le champion de l'Arène ! Vous recevez la bourse du vainqueur et l'admiration de tous."
        },
        "arene_fin_moyen": {
            "description": "Vous avez perdu en finale, mais votre performance a été remarquée. Vous recevez le prix du finaliste."
        },
        "arene_fin_echec": {
            "description": "Votre participation au tournoi fut brève et humiliante."
        },
        "basilic_debut": {
            "description": "Un basilic a élu domicile dans une carrière, pétrifiant les ouvriers. Leurs statues de pierre témoignent du danger.",
            "choice1_text": "Entrer dans la carrière",
            "choice1_success_text": "Vous avancez prudemment, en évitant de regarder directement dans les coins sombres."
        },
        "basilic_approche": {
            "description": "Vous apercevez la bête. Sa peau est aussi dure que la pierre.",
            "choice1_text": "Utiliser un bouclier poli comme miroir (Intelligence 32+)",
            "choice1_success_text": "Votre ruse fonctionne ! Le basilic croise son propre regard dans le reflet et se pétrifie lui-même.",
            "choice1_failure_text": "Le bouclier n'est pas assez poli. La bête vous repère et attaque !",
            "choice2_text": "L'attaquer de front (Défense 18+)",
            "choice2_success_text": "Vous chargez en fermant les yeux au dernier moment. Votre défense encaisse le choc initial !",
            "choice2_failure_text": "Le regard de la bête vous frôle et vos membres se raidissent. Vous êtes affaibli."
        },
        "basilic_fin_succes": {
            "description": "Vous avez vaincu le terrible basilic. La carrière peut rouvrir et vous êtes généreusement récompensé."
        },
        "basilic_fin_echec": {
            "description": "Le regard du basilic était trop puissant. Vous fuyez avant de devenir une nouvelle statue."
        },
        "navire_fantome_debut": {
            "description": "L'épave d'un galion échoué est visible à marée basse. On dit que son équipage fantomatique le protège encore.",
            "choice1_text": "Explorer l'épave maudite",
            "choice1_success_text": "Vous montez à bord. Le bois craque sous vos pieds et une brume surnaturelle vous entoure."
        },
        "navire_fantome_cale": {
            "description": "La cale est remplie de coffres. En vous approchant, des spectres gémissants apparaissent !",
            "choice1_text": "Combattre les esprits",
            "choice2_text": "Trouver et brûler leur journal de bord (Intelligence 30+)",
            "choice2_success_text": "Vous trouvez le journal du capitaine et le brûlez. Le lien des esprits au navire est rompu, et ils disparaissent.",
            "choice2_failure_text": "Vous ne trouvez pas le journal à temps. Les spectres vous attaquent."
        },
        "navire_fantome_pont": {
            "description": "Sur le pont, le capitaine fantôme vous attend. 'Personne ne pillera mon navire !', hurle-t-il.",
            "choice1_text": "Affronter le capitaine"
        },
        "navire_fantome_fin_succes": {
            "description": "Le capitaine vaincu, la malédiction est levée. Le trésor de l'équipage est à vous."
        },
        "navire_fantome_fin_echec": {
            "description": "Les fantômes du navire vous ont chassé. Leur trésor restera à jamais sous les flots."
        },
        "tournoi_arc_debut": {
            "description": "Le prestigieux tournoi du Faucon de Fer commence. La première épreuve : toucher une pomme sur une cible mouvante.",
            "choice1_text": "Tenter sa chance (Agilité 30+)",
            "choice1_success_text": "Votre flèche fend l'air et se plante au centre de la pomme ! Vous êtes qualifié pour la suite.",
            "choice1_failure_text": "Votre flèche manque la cible. Vous êtes éliminé dès la première manche."
        },
        "tournoi_arc_manches": {
            "description": "La deuxième épreuve : toucher trois cibles en un seul tir en faisant ricocher la flèche.",
            "choice1_text": "Tenter le tir incroyable (Agilité 35+ & Chance 25+)",
            "choice1_success_text": "Incroyable ! Votre flèche ricoche parfaitement et atteint les trois cibles. Vous êtes en finale !",
            "choice1_failure_text": "Votre tir est bon, mais ne touche que deux cibles. Vous finissez à une place honorable."
        },
        "tournoi_arc_finale": {
            "description": "La finale vous oppose à l'Elfe Lúthien, le champion en titre. Il faut couper une corde tenant un poids, à 200 pas.",
            "choice1_text": "Tirer pour gagner (Agilité 40+)",
            "choice1_success_text": "Votre concentration est absolue. Votre flèche coupe la corde ! Vous êtes le nouveau champion !",
            "choice1_failure_text": "Votre flèche frôle la corde mais ne la coupe pas. Lúthien, lui, ne manque pas. Vous êtes second."
        },
        "tournoi_arc_fin_succes": {
            "description": "Vous avez gagné le tournoi du Faucon de Fer ! Votre nom est sur toutes les lèvres."
        },
        "tournoi_arc_fin_moyen": {
            "description": "Vous n'avez pas gagné, mais votre performance a impressionné. Vous repartez avec le prix du finaliste."
        },
        "tournoi_arc_fin_echec": {
            "description": "Ce tournoi était d'un niveau trop élevé pour vous. Vous repartez avec une leçon d'humilité."
        },
        "mines_cristal_debut": {
            "description": "Une mine riche en cristaux de mana a été envahie par des golems de cristal animés par une force inconnue.",
            "choice1_text": "Entrer dans la mine",
            "choice1_success_text": "Les parois de la mine scintillent. Un golem vous bloque le passage."
        },
        "mines_cristal_coeur": {
            "description": "Vous atteignez le cœur de la mine. Un cristal géant pulse d'énergie et anime les golems autour de lui.",
            "choice1_text": "Détruire le cristal géant (Force 35+)",
            "choice1_success_text": "Vous frappez le cristal de toutes vos forces. Il se fissure et explose, désactivant tous les golems.",
            "choice1_failure_text": "Le cristal est trop solide. Il libère une onde de choc qui vous blesse et réveille d'autres golems !"
        },
        "mines_cristal_fin_succes": {
            "description": "La mine est libérée ! En plus des cristaux de mana, vous recevez une récompense de la guilde des mineurs."
        },
        "mines_cristal_fin_moyen": {
            "description": "Vous avez dû vous battre pour chaque centimètre, mais la mine est sécurisée."
        },
        "mines_cristal_fin_echec": {
            "description": "Les golems de cristal étaient innombrables. Vous avez été submergé."
        },
        "vol_musee_debut": {
            "description": "Votre mission, si vous l'acceptez : infiltrer le Musée Royal et voler le 'Diamant de l'Aube'.",
            "choice1_text": "Préparer le cambriolage",
            "choice1_success_text": "Vous étudiez les plans et attendez la nuit."
        },
        "vol_musee_infiltration": {
            "description": "L'accès se fait par le toit. La sécurité est maximale.",
            "choice1_text": "Crocheter une lucarne (Agilité 35+)",
            "choice1_success_text": "Vos doigts agiles déjouent la serrure. Vous êtes à l'intérieur.",
            "choice1_failure_text": "Vous cassez vos outils. Vous devez trouver un autre moyen, ce qui alerte un garde."
        },
        "vol_musee_salle": {
            "description": "Le diamant est sur un piédestal, protégé par des faisceaux lumineux magiques.",
            "choice1_text": "Désactiver les faisceaux (Intelligence 38+)",
            "choice1_success_text": "Vous comprenez la séquence et désactivez le piège. Le diamant est à vous !",
            "choice1_failure_text": "Mauvaise manipulation ! L'alarme retentit dans toute la ville. Il faut fuir !"
        },
        "vol_musee_fin_succes": {
            "description": "Un vol parfait ! Vous revendez le diamant pour une fortune."
        },
        "vol_musee_fin_echec": {
            "description": "Le vol a été un échec cuisant. Vous avez de la chance de ne pas être en prison."
        },
        "guerre_guildes_debut": {
            "description": "La Guilde des Voleurs et la Guilde des Assassins sont en guerre. Les deux camps cherchent à recruter des agents indépendants.",
            "choice1_text": "Aider les Voleurs (Agilité, Chance)",
            "choice1_success_text": "Vous contactez le maître des voleurs. Il veut que vous voliez le registre des contrats des assassins.",
            "choice2_text": "Aider les Assassins (Force, Intelligence)",
            "choice2_success_text": "Vous rencontrez le chef des assassins. Il veut que vous éliminiez le trésorier des voleurs."
        },
        "guerre_guildes_voleurs": {
            "description": "Le registre est dans leur coffre-fort.",
            "choice1_text": "Le crocheter (Agilité 40+)",
            "choice1_success_text": "Le coffre s'ouvre. Vous avez le registre !",
            "choice1_failure_text": "Vous êtes repéré par un assassin !"
        },
        "guerre_guildes_assassins": {
            "description": "Le trésorier est dans une taverne bien gardée.",
            "choice1_text": "L'empoisonner discrètement (Intelligence 40+)",
            "choice1_success_text": "Vous versez le poison sans être vu. La cible s'effondre.",
            "choice1_failure_text": "Votre subterfuge échoue. Il faut se battre !"
        },
        "guerre_guildes_fin_voleurs": {
            "description": "Les Voleurs ont maintenant un avantage décisif grâce à vous. Ils vous paient généreusement."
        },
        "guerre_guildes_fin_assassins": {
            "description": "Les Assassins ont porté un coup dur à leurs rivaux. Votre contrat est rempli et vous êtes richement payé."
        },
        "guerre_guildes_fin_echec": {
            "description": "Vous avez échoué votre mission, et vous êtes maintenant l'ennemi de l'une des guildes les plus dangereuses."
        },
        "oasis_debut": {
            "description": "Selon une vieille carte, une oasis perdue et luxuriante se cache au coeur du Désert des Cendres.",
            "choice1_text": "Traverser le désert",
            "choice1_success_text": "La chaleur est écrasante. Vous devez gérer vos forces."
        },
        "oasis_traversee": {
            "description": "Une tempête de sable se lève !",
            "choice1_text": "Trouver un abri (Intelligence 30+)",
            "choice1_success_text": "Vous repérez une formation rocheuse qui vous offre un abri précaire mais suffisant.",
            "choice1_failure_text": "La tempête vous frappe de plein fouet, vous désorientant et vous blessant."
        },
        "oasis_gardien": {
            "description": "Vous trouvez enfin l'oasis. Au centre, un Djinn de saphir flotte au-dessus de l'eau. 'Passe mon épreuve ou combats-moi, mortel.'",
            "choice1_text": "Répondre à son énigme (Intelligence 40+)",
            "choice1_success_text": "Vous répondez correctement. Impressionné, le Djinn vous autorise à boire et à prendre une partie de son trésor.",
            "choice1_failure_text": "Mauvaise réponse. Le Djinn attaque !",
            "choice2_text": "Combattre le Djinn"
        },
        "oasis_fin_succes": {
            "description": "Vous avez vaincu le Djinn, par la force ou par l'esprit. L'oasis et ses trésors sont à vous."
        },
        "oasis_fin_echec": {
            "description": "Le gardien de l'oasis était trop puissant. Vous êtes chassé du désert."
        },
        "rituel_sang_debut": {
            "description": "Une lueur rouge sang pulse du haut d'une citadelle en ruine. Un groupe de nécromanciens y prépare un rituel de grande envergure.",
            "choice1_text": "Interrompre le rituel",
            "choice1_success_text": "Vous infiltrez la citadelle. Les cultistes sont partout."
        },
        "rituel_sang_approche": {
            "description": "Le nécromancien apprenti mène le rituel. Des squelettes gardent la salle.",
            "choice1_text": "Faire diversion (Agilité 32+)",
            "choice1_success_text": "Vous créez une diversion, attirant les squelettes et vous laissant un chemin libre vers le nécromancien.",
            "choice1_failure_text": "Votre diversion échoue. Vous devez combattre les gardes d'abord."
        },
        "rituel_sang_combat": {
            "description": "Vous faites face au Nécromancien Apprenti. 'Tu ne peux arrêter le maître !', crie-t-il en levant son bâton.",
            "choice1_text": "L'arrêter !"
        },
        "rituel_sang_fin_succes": {
            "description": "Le rituel est stoppé et le nécromancien vaincu. Vous avez empêché une catastrophe."
        },
        "rituel_sang_fin_echec": {
            "description": "Le rituel est allé trop loin. Une vague d'énergie nécromantique vous submerge et vous force à fuir."
        },
        "fievre_or_debut": {
            "description": "Une rumeur de veine d'or dans les collines a attiré des dizaines de prospecteurs, et la tension monte.",
            "choice1_text": "Tenter sa chance et chercher de l'or",
            "choice1_success_text": "Vous achetez une pioche et une batée et commencez à chercher."
        },
        "fievre_or_recherche": {
            "description": "Où allez-vous chercher ?",
            "choice1_text": "Dans la rivière (Chance 35+)",
            "choice1_success_text": "Bingo ! Vous trouvez plusieurs grosses pépites d'or dans le lit de la rivière.",
            "choice1_failure_text": "Vous ne trouvez que du sable et des cailloux.",
            "choice2_text": "Dans une vieille galerie (Force 30+)",
            "choice2_success_text": "Après avoir dégagé un éboulement, vous tombez sur une veine riche !",
            "choice2_failure_text": "La galerie est vide. Vous avez perdu votre temps."
        },
        "fievre_or_conflit": {
            "description": "Votre trouvaille a attiré l'attention d'un groupe de prospecteurs rivaux et peu scrupuleux.",
            "choice1_text": "Partager votre trouvaille",
            "choice1_success_text": "Vous leur donnez une petite partie. Ils grognent mais vous laissent tranquille.",
            "choice2_text": "Défendre votre concession"
        },
        "fievre_or_fin_succes": {
            "description": "Vous avez défendu votre or et pouvez tout garder. Vous êtes riche !"
        },
        "fievre_or_fin_moyen": {
            "description": "Vous avez partagé, mais vous repartez tout de même avec un joli butin. La prudence a payé."
        },
        "fievre_or_fin_echec": {
            "description": "La fièvre de l'or ne vous a apporté que des ennuis. Vous repartez sans un sou."
        },
        "egouts_debut": {
            "description": "Des murmures et des disparitions inquiètent les habitants des bas-quartiers. Tout semble venir des égouts.",
            "choice1_text": "Descendre dans les entrailles de la ville",
            "choice1_success_text": "L'odeur est immonde, mais vous progressez dans les tunnels sombres."
        },
        "egouts_pistes": {
            "description": "Vous trouvez un cadavre à moitié dévoré. Quelque chose de gros vit ici.",
            "choice1_text": "Suivre les traces de bave (Intelligence 28+)",
            "choice1_success_text": "Les traces vous mènent directement au repaire de la créature.",
            "choice1_failure_text": "Vous vous perdez dans le labyrinthe des égouts."
        },
        "egouts_repaire": {
            "description": "Vous arrivez dans une large caverne. Un Otyugh, une créature immonde de déchets et de tentacules, garde un nid rempli d'objets volés.",
            "choice1_text": "Combattre le monstre des égouts"
        },
        "egouts_fin_succes": {
            "description": "Vous avez vaincu la bête et nettoyé les égouts. Vous récupérez les objets de valeur de son nid."
        },
        "egouts_fin_echec": {
            "description": "La créature était trop répugnante et puissante. Vous fuyez à toutes jambes."
        },
        "siege_debut": {
            "description": "Un messager épuisé vous apprend que le Fort de la Vigie est sur le point de tomber face à des vagues incessantes de gobelins menés par des Orques. Votre aide est leur dernier espoir.",
            "choice1_text": "Se rendre au fort immédiatement.",
            "choice1_success_text": "Vous ne perdez pas une seconde et foncez vers le champ de bataille."
        },
        "siege_bataille": {
            "description": "Vous arrivez en plein chaos. Les Orques utilisent des béliers pour enfoncer la porte tandis que les gobelins montent sur les remparts.",
            "choice1_text": "Détruire le bélier (Force 45+)",
            "choice1_success_text": "Vous faites une sortie héroïque et fracassez le bélier. Les Orques sont furieux.",
            "choice1_failure_text": "Vous êtes repoussé par la force brute des Orques. Vous devez vous replier sur les remparts.",
            "choice2_text": "Défendre les remparts (Défense 20+)",
            "choice2_success_text": "Vous êtes un roc. Vous repoussez les échelles et tenez la ligne contre les orcs.",
            "choice2_failure_text": "Les orcs sont trop nombreux. Vous êtes submergé."
        },
        "siege_remparts": {
            "description": "Le combat sur les remparts est un maelstrom d'acier et de cris. Vous devez tenir bon.",
            "choice1_text": "Tenir la ligne !"
        },
        "siege_chaman": {
            "description": "La bataille semble tourner en votre faveur, mais un chaman Orc sur une tour invoque une pluie de feu. Il faut l'arrêter !",
            "choice1_text": "L'abattre à distance (Agilité 50+)",
            "choice1_success_text": "D'une flèche précise, vous touchez le chaman qui s'écroule. Privés de leur magie, les assaillants paniquent et fuient.",
            "choice1_failure_text": "Vous n'arrivez pas à l'atteindre à temps. Une boule de feu vous frappe de plein fouet."
        },
        "siege_fin_succes": {
            "description": "Vous avez sauvé le fort ! Vous êtes acclamé en héros. Le commandant vous offre un accès à l'armurerie royale en récompense."
        },
        "siege_fin_echec": {
            "description": "Malgré vos efforts, le fort est tombé. Vous avez réussi à fuir, mais le poids de la défaite est lourd."
        },
        "culte_debut": {
            "description": "La garde de la cité vous engage pour infiltrer un culte secret qui gagne en influence. Leurs intentions sont obscures.",
            "choice1_text": "Accepter la mission d'infiltration",
            "choice1_success_text": "Vous trouvez un contact qui peut vous faire entrer dans le cercle intérieur."
        },
        "culte_infiltration": {
            "description": "Vous assistez à une cérémonie secrète. Le grand prêtre parle d'invoquer une entité de l'ombre.",
            "choice1_text": "Chercher des preuves de leurs plans (Intelligence 48+)",
            "choice1_success_text": "Vous trouvez leur livre de rituels et des lettres détaillant un complot. Vous avez ce qu'il vous faut.",
            "choice1_failure_text": "Vous ne trouvez rien de concret. Pour en savoir plus, vous devez passer l'épreuve du zélote : un combat rituel."
        },
        "culte_sabotage": {
            "description": "Le rituel d'invocation a commencé ! Le grand prêtre canalise l'énergie.",
            "choice1_text": "Détruire l'idole (Force 40+)",
            "choice1_success_text": "Vous fracassez l'idole, provoquant une surcharge d'énergie qui disperse le culte.",
            "choice2_text": "Interrompre l'incantation (Agilité 50+)",
            "choice2_success_text": "Vous vous faufilez et perturbez le prêtre au moment clé. Le rituel échoue lamentablement.",
            "choice2_failure_text": "Vous êtes repéré ! Le prêtre vous attaque avec sa magie noire."
        },
        "culte_fin_succes": {
            "description": "Vous avez démantelé le culte et révélé leur complot. La cité vous est reconnaissante."
        },
        "culte_fin_echec": {
            "description": "Le culte vous a démasqué et chassé. Leurs plans continuent dans l'ombre."
        },
        "volcan_debut": {
            "description": "Une ancienne légende parle d'une gemme de pouvoir, le Coeur du Magma, au plus profond du volcan actif du Mont Cendre.",
            "choice1_text": "Tenter l'expédition volcanique",
            "choice1_success_text": "La chaleur est déjà étouffante à la base du volcan. L'ascension sera rude."
        },
        "volcan_ascension": {
            "description": "Des rivières de lave bloquent le passage. Vous devez trouver un chemin.",
            "choice1_text": "Sauter par-dessus une crevasse (Agilité 45+)",
            "choice1_success_text": "D'un bond puissant, vous franchissez la crevasse de lave.",
            "choice1_failure_text": "Vous glissez ! Vous vous rattrapez de justesse, mais vos bottes sont en feu.",
            "choice2_text": "Endurer la chaleur d'un chemin étroit (Défense 25+)",
            "choice2_success_text": "Votre armure et votre volonté vous protègent de la chaleur intense. Vous passez.",
            "choice2_failure_text": "La chaleur est insoutenable. Vous êtes gravement brûlé."
        },
        "volcan_gardien": {
            "description": "L'entrée de la caverne centrale est gardée par un Élémentaire de Magma.",
            "choice1_text": "Affronter le gardien"
        },
        "volcan_coeur": {
            "description": "Vous trouvez le Coeur du Magma sur un piédestal de basalte. Le retirer va sûrement déclencher une éruption !",
            "choice1_text": "Prendre la gemme et fuir !",
            "choice1_success_text": "Vous vous emparez de la gemme. Comme prévu, le volcan gronde et la fuite commence !"
        },
        "volcan_fin_succes": {
            "description": "Vous avez échappé de justesse à l'éruption, avec la gemme en votre possession. Un trésor d'une valeur inestimable."
        },
        "volcan_fin_echec": {
            "description": "Le volcan était un adversaire trop puissant. Vous repartez avec de sévères brûlures et rien d'autre."
        },
        "biblio_debut": {
            "description": "Une vieille carte mène à une bibliothèque antique, cachée sous le désert de sel.",
            "choice1_text": "Suivre la carte",
            "choice1_success_text": "Vous vous enfoncez dans le désert, la carte à la main."
        },
        "biblio_entree": {
            "description": "Vous trouvez l'entrée, scellée par une porte de pierre gravée d'une énigme : 'Je n'ai pas de voix, mais je raconte des histoires. Qui suis-je ?'",
            "choice1_text": "Répondre 'Le Savoir' (Intelligence 50+)",
            "choice1_success_text": "La porte s'ouvre. Votre intelligence vous a ouvert la voie.",
            "choice1_failure_text": "Mauvaise réponse. La porte reste close.",
            "choice2_text": "Répondre 'Un Livre'",
            "choice2_success_text": "La porte s'ouvre. C'était la réponse la plus évidente."
        },
        "biblio_gardien": {
            "description": "À l'intérieur, un golem de pierre s'anime. 'Seuls les dignes peuvent consulter les archives. Prouvez votre valeur intellectuelle.' Il vous pose une énigme complexe.",
            "choice1_text": "Résoudre l'énigme du golem (Intelligence 60+)",
            "choice1_success_text": "Vous résolvez son énigme. Impressionné, le golem s'écarte.",
            "choice1_failure_text": "'Indigne !' crie le golem en vous attaquant. Vous devez fuir.",
            "choice2_text": "Le combattre"
        },
        "biblio_fin_succes": {
            "description": "Vous passez des heures à lire les anciens textes, accumulant un savoir immense."
        },
        "biblio_fin_moyen": {
            "description": "Vous avez vaincu le gardien par la force. Vous n'avez que peu de temps pour consulter les livres avant que la magie du lieu ne vous expulse."
        },
        "biblio_fin_echec": {
            "description": "La bibliothèque restera un mystère pour vous. Vous repartez avec le goût amer de l'échec."
        },
        "pirate_debut": {
            "description": "Le 'Serpent des Nuages', un navire pirate, accoste à une cime isolée pour se ravitailler.",
            "choice1_text": "Tenter l'abordage furtif (Agilité 50+)",
            "choice1_success_text": "Vous grimpez à bord sans un bruit, caché par la brume.",
            "choice1_failure_text": "Un vigile vous repère ! L'alarme est sonnée. Vous devez vous battre pour monter à bord."
        },
        "pirate_cale": {
            "description": "Vous êtes dans la cale. Elle est remplie de butin. Vous pouvez prendre ce que vous pouvez et fuir, ou essayer de capturer le navire.",
            "choice1_text": "Voler le trésor et fuir (Chance 45+)",
            "choice1_success_text": "Vous remplissez vos sacs et vous éclipsez avant que quiconque ne remarque votre présence. Un vol parfait.",
            "choice1_failure_text": "En voulant trop en prendre, vous faites du bruit. Les pirates vous coincent dans la cale.",
            "choice2_text": "Monter sur le pont pour affronter le capitaine",
            "choice2_success_text": "Vous laissez le butin. La gloire est plus importante."
        },
        "pirate_pont": {
            "description": "Vous arrivez sur le pont. Le capitaine pirate vous défie en duel.",
            "choice1_text": "Accepter le duel"
        },
        "pirate_fin_capitaine": {
            "description": "Vous êtes le nouveau capitaine du 'Serpent des Nuages' ! Vous décidez de vendre le navire pour une somme astronomique."
        },
        "pirate_fin_vol": {
            "description": "Vous avez pillé la cale du plus grand navire pirate des cieux. Un exploit de voleur."
        },
        "pirate_fin_echec": {
            "description": "Les pirates du ciel ne sont pas des tendres. Vous vous en sortez vivant, mais sans rien de plus."
        },
        "peste_debut": {
            "description": "Une maladie, la 'Fièvre Cendrée', se propage. Le Dr Alistair propose une purge par le feu (Force), tandis que la Dr Elara suggère un remède complexe (Intelligence).",
            "choice1_text": "Aider le Dr Alistair",
            "choice1_success_text": "Vous rejoignez Alistair. Sa méthode est directe : brûler les maisons infectées.",
            "choice2_text": "Aider la Dr Elara",
            "choice2_success_text": "Vous rejoignez Elara. Elle a besoin d'ingrédients rares pour son remède."
        },
        "peste_alistair": {
            "description": "Alistair vous demande de l'aider à maîtriser les incendies pour qu'ils ne se propagent pas.",
            "choice1_text": "Contenir les flammes (Force 50+ & Défense 25+)",
            "choice1_success_text": "Votre force et votre endurance permettent de contrôler les brasiers. La méthode est brutale, mais la maladie semble enrayée.",
            "choice1_failure_text": "Le feu devient incontrôlable et brûle une partie saine du village. C'est un désastre."
        },
        "peste_elara": {
            "description": "Elara a besoin de 'Larmes de Spectre', qui ne se trouvent que dans le cimetière hanté, gardé par des esprits.",
            "choice1_text": "Récupérer les Larmes de Spectre (Intelligence 55+)",
            "choice1_success_text": "Votre savoir vous permet de naviguer parmi les esprits et de récolter l'ingrédient.",
            "choice1_failure_text": "Les esprits vous tourmentent et vous chassent du cimetière."
        },
        "peste_fin_alistair": {
            "description": "La Fièvre Cendrée a disparu, mais à quel prix... Le village vous récompense, mais les regards sont lourds."
        },
        "peste_fin_elara": {
            "description": "Le remède d'Elara fonctionne à merveille ! Vous êtes acclamé comme un sauveur."
        },
        "peste_fin_echec": {
            "description": "Votre échec a coûté cher. La maladie continue de se propager et votre réputation est ruinée."
        },
        "cite_automates_debut": {
            "description": "Vous avez trouvé l'entrée de la légendaire Cité des Automates. La porte massive est scellée.",
            "choice1_text": "Déchiffrer la serrure (Intelligence 50+)",
            "choice1_success_text": "Les mécanismes complexes n'ont aucun secret pour vous. La porte s'ouvre.",
            "choice1_failure_text": "La serrure est trop complexe. Vous devez forcer une brèche."
        },
        "cite_automates_force": {
            "description": "Vous remarquez un mur fissuré. Peut-être pourriez-vous le briser.",
            "choice1_text": "Forcer le passage (Force 60+)",
            "choice1_success_text": "À force de coups, le mur cède. Vous êtes à l'intérieur, mais vous avez alerté les gardes."
        },
        "cite_automates_interieur": {
            "description": "La cité est un dédale de rues métalliques. Un Garde Automate patrouille.",
            "choice1_text": "Le détruire",
            "choice1_success_text": "Le Garde vous détecte et attaque !",
            "choice2_text": "L'esquiver (Agilité 55+)",
            "choice2_success_text": "Vous vous glissez dans l'ombre et évitez la patrouille."
        },
        "cite_automates_coeur": {
            "description": "Vous atteignez le coeur de la cité, la salle du 'Collecteur', un golem massif qui absorbe l'énergie de la cité.",
            "choice1_text": "Affronter le Collecteur",
            "choice1_success_text": "Le golem géant s'active pour défendre son territoire."
        },
        "cite_automates_fin_succes": {
            "description": "En battant le Collecteur, vous avez récupéré son coeur énergétique et une quantité incroyable de métal précieux."
        },
        "cite_automates_fin_echec": {
            "description": "Les défenses de la cité étaient trop parfaites. Vous repartez les mains vides."
        },
        "labyrinthe_debut": {
            "description": "Vous entrez dans le légendaire labyrinthe du Minotaure. Les murs de pierre se referment derrière vous.",
            "choice1_text": "Avancer au hasard",
            "choice1_success_text": "Vous vous enfoncez dans le dédale."
        },
        "labyrinthe_chemin": {
            "description": "Vous arrivez à une intersection. Des ossements jonchent le sol.",
            "choice1_text": "Suivre les traces de pas (Intelligence 45+)",
            "choice1_success_text": "Vous remarquez que certaines traces sont fraîches. Vous suivez la piste vers le centre.",
            "choice1_failure_text": "Vous vous perdez. Vous errez pendant des heures.",
            "choice2_text": "Utiliser une intuition (Chance 40+)",
            "choice2_success_text": "Votre instinct vous guide. Vous trouvez un passage secret qui vous rapproche du centre.",
            "choice2_failure_text": "Votre intuition vous mène à un cul-de-sac piégé."
        },
        "labyrinthe_centre": {
            "description": "Vous trouvez le centre du labyrinthe. Un Minotaure, créature mi-homme mi-taureau, attend en beuglant.",
            "choice1_text": "Affronter le monstre"
        },
        "labyrinthe_fin_succes": {
            "description": "Le Minotaure est vaincu. Vous trouvez son trésor et le chemin de la sortie."
        },
        "labyrinthe_fin_echec": {
            "description": "Le monstre était trop puissant. Vous avez fui, mais vous êtes à jamais perdu dans le labyrinthe..."
        },
        "cour_miracles_debut": {
            "description": "Le Roi des Mendiants, un personnage charismatique et dangereux, vous met au défi de survivre une nuit dans son royaume souterrain, la Cour des Miracles.",
            "choice1_text": "Accepter le défi",
            "choice1_success_text": "Vous descendez dans les bas-fonds. La règle est simple : atteindre l'aube."
        },
        "cour_miracles_epreuve1": {
            "description": "Première épreuve : traverser la 'Place des Coupe-Bourses' sans rien vous faire voler.",
            "choice1_text": "Faire diversion avec quelques pièces (Chance 40+)",
            "choice1_success_text": "Vous jetez quelques pièces. Pendant que les voleurs se battent pour elles, vous passez.",
            "choice1_failure_text": "Ils prennent vos pièces ET votre bourse. Vous perdez des ressources.",
            "choice2_text": "Se faufiler (Agilité 55+)",
            "choice2_success_text": "Vous êtes une ombre. Personne ne remarque votre passage.",
            "choice2_failure_text": "Un voleur vous repère et tente de vous poignarder !"
        },
        "cour_miracles_epreuve2": {
            "description": "Deuxième épreuve : le 'Festin du Roi'. On vous sert un ragoût suspect.",
            "choice1_text": "Le manger (Vie 40+)",
            "choice1_success_text": "Votre estomac est solide. Le ragoût est immonde, mais vous survivez.",
            "choice1_failure_text": "Vous êtes empoisonné. Vous passez le reste de la nuit à vomir."
        },
        "cour_miracles_fin_succes": {
            "description": "Le soleil se lève. Vous avez survécu. Le Roi des Mendiants, impressionné, vous nomme 'Ami de la Cour' et vous offre un tribut."
        },
        "cour_miracles_fin_echec": {
            "description": "Vous avez échoué au défi. La Cour des Miracles vous dépouille et vous jette dehors au matin."
        },
        "ile_chimere_debut": {
            "description": "Vous accostez sur une île isolée qui abritait le laboratoire d'un alchimiste fou. Ses créations errent encore ici.",
            "choice1_text": "Explorer l'île",
            "choice1_success_text": "La jungle est anormalement luxuriante et silencieuse. Vous trouvez le laboratoire en ruine."
        },
        "ile_chimere_labo": {
            "description": "Le laboratoire est rempli de notes et de cages brisées. Vous devez trouver des indices sur la créature principale de l'île.",
            "choice1_text": "Lire le journal de l'alchimiste (Intelligence 50+)",
            "choice1_success_text": "Vous apprenez que la Chimère craint le son strident du métal frappé contre le métal. Une information cruciale.",
            "choice1_failure_text": "Les notes sont trop complexes. Vous n'apprenez rien d'utile."
        },
        "ile_chimere_combat": {
            "description": "Une créature abominable, un mélange de lion, de chèvre et de serpent, la Chimère, surgit de la jungle !",
            "choice1_text": "Affronter la Chimère"
        },
        "ile_chimere_fin_succes": {
            "description": "La créature est morte. Vous avez mis fin à un cauchemar d'alchimiste et pouvez piller le laboratoire en paix."
        },
        "ile_chimere_fin_echec": {
            "description": "La Chimère est une abomination de la nature. Vous avez fui pour sauver votre peau."
        },
        "pacte_infernal_debut": {
            "description": "Le Duc Eliphas règne par la terreur. On murmure qu'il a pactisé avec un démon pour obtenir son pouvoir.",
            "choice1_text": "Infiltrer le château pour briser le pacte",
            "choice1_success_text": "Vous entrez dans le château à la faveur de la nuit."
        },
        "pacte_infernal_contrat": {
            "description": "Vous devez trouver le contrat démoniaque pour le détruire. Il est soit dans la bibliothèque, soit dans le trésor.",
            "choice1_text": "Chercher dans la bibliothèque (Intelligence 52+)",
            "choice1_success_text": "Parmi des milliers de livres, vous trouvez le parchemin en peau humaine. Vous le brûlez, affaiblissant le Duc.",
            "choice1_failure_text": "Vous ne trouvez rien. Le contrat doit être dans le trésor, qui est lourdement gardé."
        },
        "pacte_infernal_combat": {
            "description": "Le Duc Eliphas, sentant sa puissance diminuer, vous confronte. Des flammes infernales dansent autour de lui.",
            "choice1_text": "Affronter le Duc et son maître démoniaque"
        },
        "pacte_infernal_fin_succes": {
            "description": "Le pacte est brisé et le Duc vaincu. Vous avez libéré le duché de son emprise tyrannique."
        },
        "pacte_infernal_fin_echec": {
            "description": "La puissance infernale du Duc était trop grande. Vous avez été vaincu."
        },
        "chasse_sauvage_debut": {
            "description": "La Chasse Sauvage, une horde de cavaliers spectraux, traverse le ciel la nuit, enlevant des âmes. Vous devez l'arrêter.",
            "choice1_text": "Attendre leur passage sur la lande",
            "choice1_success_text": "Le cor de chasse résonne. La horde arrive."
        },
        "chasse_sauvage_confrontation": {
            "description": "Le Roi Chasseur et sa meute de chiens fantomatiques s'arrêtent devant vous. 'Qui ose défier la Chasse ?'",
            "choice1_text": "Le défier en combat singulier (Force 55+)",
            "choice1_success_text": "Impressionné par votre audace, le Roi accepte. Un duel pour le sort de la région !",
            "choice2_text": "Lui offrir un tribut digne (500 Metal)",
            "choice2_success_text": "Vous offrez un tribut de métal précieux. Le Roi, satisfait, épargne cette terre pour cette saison.",
            "choice2_failure_text": "Votre tribut est indigne. La Chasse vous prendra de force !"
        },
        "chasse_sauvage_fin_succes": {
            "description": "Vous avez vaincu le Roi Chasseur. La Chasse Sauvage disparaît, libérant les âmes captives."
        },
        "chasse_sauvage_fin_moyen": {
            "description": "Vous avez acheté la paix pour un temps. La Chasse reviendra, mais pour l'instant, la région est sauve."
        },
        "chasse_sauvage_fin_echec": {
            "description": "On ne défie pas la Chasse Sauvage impunément. Vous avez eu de la chance de survivre."
        },
        "sommet_monde_debut": {
            "description": "Vous entamez l'ascension du Pic Éternel, la plus haute montagne du monde, pour y trouver l'Oracle qui connaît la réponse à une ancienne prophétie.",
            "choice1_text": "Commencer l'ascension",
            "choice1_success_text": "Le chemin est ardu et l'air se raréfie."
        },
        "sommet_monde_epreuve": {
            "description": "Le gardien du sommet, un Griffon majestueux, vous bloque le passage.",
            "choice1_text": "Le combattre",
            "choice2_text": "Lui prouver votre valeur (Force 50+ & Vie 50+)",
            "choice2_success_text": "Vous résistez à sa charge et montrez votre force sans le tuer. Respectueux, il vous laisse passer.",
            "choice2_failure_text": "Votre démonstration de force est pathétique. Le Griffon vous attaque."
        },
        "sommet_monde_oracle": {
            "description": "Vous atteignez l'Oracle. Il vous révèle une partie de la prophétie, un savoir qui pèse lourdement sur votre esprit.",
            "choice1_text": "Accepter le fardeau du savoir",
            "choice1_success_text": "La connaissance est une arme et un fardeau. Vous redescendez, changé."
        },
        "sommet_monde_fin_succes": {
            "description": "Vous avez parlé à l'Oracle et survécu au sommet du monde. La prophétie vous guidera."
        },
        "sommet_monde_fin_echec": {
            "description": "Le gardien ou la montagne elle-même a eu raison de vous. Vous n'atteindrez pas le sommet."
        },
        "maelstrom_debut": {
            "description": "Une tempête de pure magie, le Maelstrom, menace de déchirer la réalité. Vous devez naviguer jusqu'à son œil pour la calmer.",
            "choice1_text": "Entrer dans le Maelstrom",
            "choice1_success_text": "Des éclairs de toutes les couleurs zèbrent un ciel violet. La réalité se tord autour de vous."
        },
        "maelstrom_navigation": {
            "description": "Vous devez naviguer entre des vagues d'énergie brute.",
            "choice1_text": "Esquiver les vagues (Agilité 58+)",
            "choice1_success_text": "Votre agilité vous permet de surfer sur les courants magiques jusqu'au centre.",
            "choice1_failure_text": "Une vague d'énergie chaotique vous frappe, altérant temporairement vos forces."
        },
        "maelstrom_oeil": {
            "description": "Dans l'œil calme de la tempête, vous trouvez un cristal de chaos instable, la source du problème.",
            "choice1_text": "Le stabiliser (Intelligence 55+)",
            "choice1_success_text": "Vous canalisez votre propre énergie pour stabiliser le cristal. Le Maelstrom s'apaise.",
            "choice1_failure_text": "Votre tentative surcharge le cristal ! Il explose, vous projetant hors de la tempête."
        },
        "maelstrom_fin_succes": {
            "description": "Vous avez calmé le Maelstrom. Des fragments de magie pure cristallisée pleuvent autour de vous."
        },
        "maelstrom_fin_echec": {
            "description": "La magie brute du Maelstrom vous a rejeté. La tempête continue de faire rage."
        },
        "guerre_profonds_debut": {
            "description": "Des créatures amphibiens, les Profonds, sortent de l'océan et attaquent les villes côtières. Vous êtes engagé pour défendre le port de Salterras.",
            "choice1_text": "Rejoindre la ligne de défense",
            "choice1_success_text": "Vous prenez position sur les barricades alors que la marée de monstres arrive."
        },
        "guerre_profonds_vague": {
            "description": "La première vague de Profonds est là !",
            "choice1_text": "Tenir la barricade (Force 50+ & Défense 22+)",
            "choice1_success_text": "Vous êtes un mur infranchissable. Vous repoussez la première vague presque à vous seul.",
            "choice1_failure_text": "Ils sont trop nombreux et leur force est surprenante. La barricade cède."
        },
        "guerre_profonds_champion": {
            "description": "Un Profond plus grand et plus brutal, armé d'un trident en corail, mène la deuxième vague.",
            "choice1_text": "Affronter le champion Profond"
        },
        "guerre_profonds_fin_succes": {
            "description": "Leur champion vaincu, les Profonds battent en retraite vers l'océan. Le port est sauvé grâce à vous."
        },
        "guerre_profonds_fin_echec": {
            "description": "La marée de Profonds était inarrêtable. Le port a été saccagé, et vous avez dû fuir pour survivre."
        },
        "sablier_temps_debut": {
            "description": "Le Sablier de Chronos, capable de figer le temps, a été volé au monastère du Temps par un assassin d'élite. Il faut le récupérer avant qu'il ne cause un paradoxe.",
            "choice1_text": "Se lancer à la poursuite du voleur",
            "choice1_success_text": "Vous suivez la piste du voleur, qui semble apparaître et disparaître."
        },
        "sablier_temps_piste": {
            "description": "Le voleur utilise le sablier pour créer de courtes boucles temporelles et vous semer.",
            "choice1_text": "Anticiper ses mouvements (Intelligence 55+ & Chance 45+)",
            "choice1_success_text": "Vous comprenez sa logique et anticipez sa prochaine apparition, le coinçant enfin.",
            "choice1_failure_text": "Il est trop imprévisible. Vous êtes constamment en retard, ce qui vous épuise."
        },
        "sablier_temps_combat": {
            "description": "L'Assassin de l'Ombre est acculé. Il utilise le sablier pour esquiver et attaquer à des moments impossibles.",
            "choice1_text": "L'affronter"
        },
        "sablier_temps_fin_succes": {
            "description": "Vous avez vaincu l'assassin et récupéré le Sablier. Les moines vous remercient d'avoir sauvé le cours du temps."
        },
        "sablier_temps_fin_echec": {
            "description": "Le voleur et son artefact étaient insaisissables. Il s'est échappé, et le temps lui-même est maintenant en danger."
        },
        // ** LÉGENDAIRES **
        "relique_debut": {
            "description": "Un temple ancien a émergé des nuages, flottant dans le ciel. À son sommet, une relique divine perdue depuis des millénaires vous attend.",
            "choice1_text": "Tenter l'ascension du Temple Céleste",
            "choice1_success_text": "Vous trouvez un moyen de monter sur l'île flottante. Le chemin vers le sommet est un dédale de ponts de lumière et de plateformes mouvantes."
        },
        "relique_ascension": {
            "description": "Le chemin est gardé par des énigmes célestes et des vents violents.",
            "choice1_text": "Traverser les ponts de lumière (Agilité 70+)",
            "choice1_success_text": "Votre agilité est divine. Vous dansez sur la lumière et progressez rapidement.",
            "choice1_failure_text": "Vous manquez de tomber ! Vous vous rattrapez, mais l'épreuve vous a coûté une partie de vos forces.",
            "choice2_text": "Résoudre l'énigme du Zéphyr (Intelligence 75+)",
            "choice2_success_text": "Vous comprenez les courants éoliens et les utilisez pour vous porter sans effort jusqu'à la prochaine plateforme.",
            "choice2_failure_text": "L'énigme vous échappe. Un vent violent vous frappe de plein fouet."
        },
        "relique_gardien": {
            "description": "Le sommet du temple est gardé par un Archange de Lumière. 'Seuls les purs peuvent approcher la relique', déclare-t-il.",
            "choice1_text": "Prouver votre pureté par la parole (Intelligence 80+)",
            "choice1_success_text": "Vos mots sont sages et votre cœur semble juste. L'Archange, convaincu, s'écarte.",
            "choice1_failure_text": "'Vos paroles sont vaines !' L'Archange lève son épée de lumière.",
            "choice2_text": "Le combattre",
            "choice2_success_text": "La pureté se prouve par les actes, pas par les mots."
        },
        "relique_fin_succes": {
            "description": "Vous avez obtenu la Relique Divine. Sa puissance parcourt votre corps et votre âme."
        },
        "relique_fin_echec": {
            "description": "Le gardien céleste était trop puissant. Il vous bannit du temple flottant."
        },
        "dragon_debut": {
            "description": "Un dragon rouge ancien, Ignis, terrorise la région depuis son repaire au sommet du Pic Cendré. Seul un héros légendaire peut l'arrêter.",
            "choice1_text": "Accepter la chasse au dragon.",
            "choice1_success_text": "Vous rassemblez votre courage et commencez l'ascension périlleuse du Pic Cendré."
        },
        "dragon_approche": {
            "description": "L'air devient chaud et chargé de soufre. Le repaire est proche. Vous pouvez tenter une approche furtive par les corniches ou passer par l'entrée principale, un tunnel de lave.",
            "choice1_text": "Approche furtive (Agilité 70+)",
            "choice1_success_text": "Votre discrétion est légendaire. Vous atteignez le coeur du repaire sans alerter le dragon, qui sommeille sur son trésor.",
            "choice1_failure_text": "Vous faites tomber une pierre. Le dragon ouvre un oeil reptilien et vous repère.",
            "choice2_text": "Entrée principale (Vie 150+)",
            "choice2_success_text": "La chaleur est intense, mais votre endurance vous permet de traverser. Le dragon vous attend.",
            "choice2_failure_text": "La chaleur est insoutenable. Vous êtes gravement brûlé."
        },
        "dragon_surprise": {
            "description": "Vous avez l'opportunité de frapper le premier ! C'est une chance unique.",
            "choice1_text": "Attaquer le dragon endormi !",
            "choice1_success_text": "Vous portez un coup puissant à la bête. Elle se réveille en hurlant de douleur et de fureur !"
        },
        "dragon_combat": {
            "description": "Ignis, le Dragon Ancien, se dresse devant vous. Les flammes dansent dans sa gueule et son regard promet une mort ardente.",
            "choice1_text": "COMBATTRE LA LÉGENDE !"
        },
        "dragon_fin_succes": {
            "description": "Le tyran ailé est vaincu. Son trésor est à vous, et votre nom sera chanté par les bardes pour les siècles à venir."
        },
        "dragon_fin_echec": {
            "description": "Le feu du dragon était trop puissant. Vous avez péri dans les flammes."
        },
        "tour_debut": {
            "description": "Un sorcier dément a érigé une tour qui défie les lois de la physique. Des escaliers mènent au plafond, les couloirs tournent en boucle.",
            "choice1_text": "Entrer dans la tour de la folie",
            "choice1_success_text": "À peine entré, la porte disparaît. Le seul chemin est vers le haut."
        },
        "tour_epreuve1": {
            "description": "Vous êtes dans une salle où le temps s'écoule à l'envers. Vous rajeunissez et vous affaiblissez.",
            "choice1_text": "Briser le cristal temporel (Force 70+)",
            "choice1_success_text": "Vous fracassez le cristal, restaurant le cours normal du temps.",
            "choice1_failure_text": "Vous n'êtes pas assez fort. Le temps continue de vous ronger avant que le cristal ne se surcharge et explose."
        },
        "tour_epreuve2": {
            "description": "Un sphinx mécanique vous bloque le passage. 'Réponds à mon énigme ou sois effacé.'",
            "choice1_text": "Tenter de répondre (Intelligence 85+)",
            "choice1_success_text": "Votre esprit est plus vif que ses circuits. Le sphinx, vaincu, se désactive.",
            "choice1_failure_text": "Mauvaise réponse. Le sphinx vous attaque avec un rayon d'énergie pure."
        },
        "tour_sommet": {
            "description": "Au sommet de la tour, l'Archimage Dément vous attend, jonglant avec des étoiles miniatures.",
            "choice1_text": "Mettre fin à sa folie"
        },
        "tour_fin_succes": {
            "description": "Le sorcier est vaincu et la tour commence à se stabiliser. Vous récupérez ses grimoires et ses trésors."
        },
        "tour_fin_echec": {
            "description": "La folie du sorcier et de sa tour a eu raison de vous. Vous êtes expulsé dans une explosion de paradoxes."
        },
        "forgedieux_debut": {
            "description": "Les textes anciens parlent de la Forge-Mère, où les dieux eux-mêmes façonnaient les montagnes. Elle serait cachée au cœur d'un labyrinthe élémentaire.",
            "choice1_text": "Entrer dans le labyrinthe",
            "choice1_success_text": "Vous pénétrez dans un dédale de couloirs où l'air crépite de magie brute."
        },
        "forgedieux_epreuve_force": {
            "description": "Une porte de magma bloque le chemin. 'Prouve ta Force', est-il gravé dans la roche.",
            "choice1_text": "Enfoncer la porte (Force 80+ & Défense 40+)",
            "choice1_success_text": "Vous traversez le magma comme s'il s'agissait d'eau. La première épreuve est un succès.",
            "choice1_failure_text": "La chaleur est divine. Elle vous consume. Vous devez trouver une autre voie, ce qui vous épuise."
        },
        "forgedieux_epreuve_intel": {
            "description": "Vous arrivez dans une salle où des runes flottent dans les airs. 'Prouve ton Esprit', murmure une voix.",
            "choice1_text": "Arranger les runes dans l'ordre cosmique (Intelligence 80+)",
            "choice1_success_text": "Votre connaissance des arcanes vous permet de résoudre l'énigme runique. Un passage s'ouvre.",
            "choice1_failure_text": "Les runes vous brûlent l'esprit. Vous subissez une violente migraine."
        },
        "forgedieux_coeur": {
            "description": "Vous arrivez au cœur de la Forge. Une enclume divine pulse d'une chaleur douce. Vous pouvez forger UN seul objet légendaire.",
            "choice1_text": "Forger une Arme",
            "choice1_success_text": "Vous utilisez la forge pour créer une arme d'une puissance inégalée.",
            "choice2_text": "Forger une Armure",
            "choice2_success_text": "Vous façonnez une armure qui pourrait résister au souffle d'un dieu."
        },
        "forgedieux_fin_succes": {
            "description": "Vous quittez la forge avec votre chef-d'œuvre. Votre nom entre dans la légende."
        },
        "forgedieux_fin_echec": {
            "description": "La Forge des Dieux n'est pas pour les mortels faillibles. Vous êtes rejeté, votre esprit et votre corps brisés."
        },
        "conseil_debut": {
            "description": "Vous êtes engagé par le Roi en personne. Il suspecte un traître au sein de son Conseil des Ombres. Vous devez le démasquer lors du prochain sommet.",
            "choice1_text": "Accepter la mission d'espionnage",
            "choice1_success_text": "Vous recevez une accréditation pour assister au conseil en tant que garde du corps."
        },
        "conseil_enquete": {
            "description": "Le conseil débat. Vous devez trouver des indices sans attirer l'attention.",
            "choice1_text": "Écouter les conversations (Intelligence 75+)",
            "choice1_success_text": "Vous repérez des contradictions dans le discours du Duc Valerius. Il semble nerveux.",
            "choice1_failure_text": "Tout le monde parle en langage codé. Vous ne comprenez rien.",
            "choice2_text": "Fouiller les appartements pendant une pause (Agilité 78+)",
            "choice2_success_text": "Vous trouvez une lettre codée dans les appartements du Duc Valerius. C'est la preuve !",
            "choice2_failure_text": "Vous êtes presque surpris par un garde. Vous devez rebrousser chemin sans rien."
        },
        "conseil_preuves": {
            "description": "Vous n'avez pas de preuve solide. Vous pouvez accuser sur la base de votre intuition ou attendre.",
            "choice1_text": "Accuser le Duc Valerius (Chance 60+)",
            "choice1_success_text": "Votre accusation le fait paniquer. Il se trahit en essayant de fuir !",
            "choice1_failure_text": "Votre accusation tombe à plat. Vous êtes disgracié pour cet affront.",
            "choice2_text": "Attendre une meilleure opportunité",
            "choice2_success_text": "Vous restez silencieux. La réunion se termine sans incident, mais le complot continue."
        },
        "conseil_confrontation": {
            "description": "Vous avez la preuve. Vous confrontez le Duc Valerius devant le Roi.",
            "choice1_text": "Le traître tente de fuir et sort une dague empoisonnée !"
        },
        "conseil_fin_succes": {
            "description": "Le traître est arrêté. Le Roi vous remercie pour votre loyauté et votre discrétion. Vous êtes nommé agent spécial de la couronne."
        },
        "conseil_fin_moyen": {
            "description": "Vous n'avez pas pu démasquer le traître, mais votre prudence vous a évité le déshonneur. Le Roi vous paie pour votre temps."
        },
        "conseil_fin_echec": {
            "description": "Vous avez échoué. Le traître reste impuni et vous êtes banni du royaume."
        },
        "tombeau_singe_debut": {
            "description": "Vous entrez dans le tombeau du légendaire Roi Singe. Des statues de singes rieurs vous observent.",
            "choice1_text": "Avancer dans le tombeau",
            "choice1_success_text": "Une voix rieuse résonne : 'Prouve ton agilité, mortel !'"
        },
        "tombeau_singe_agilite": {
            "description": "La salle se remplit de piliers de pierre qui montent et descendent à toute vitesse.",
            "choice1_text": "Traverser la salle (Agilité 80+)",
            "choice1_success_text": "Vous sautez de pilier en pilier avec la grâce d'un singe. La voix rieuse applaudit.",
            "choice1_failure_text": "Vous êtes trop lent. Un pilier vous heurte et vous envoie dans un tas de bananes moisies."
        },
        "tombeau_singe_intelligence": {
            "description": "'Maintenant, prouve ton esprit !', dit la voix. Trois coffres apparaissent : un en or, un en argent, un en bronze. 'Un seul contient mon trésor, les autres une mauvaise blague.' L'or dit : 'Le trésor est ici'. L'argent dit : 'Le trésor n'est pas ici'. Le bronze dit : 'Le trésor n'est pas dans le coffre d'or'. Un seul dit la vérité.",
            "choice1_text": "Choisir le coffre de bronze (Intelligence 82+)",
            "choice1_success_text": "Vous avez résolu l'énigme ! Le coffre de bronze contient le trésor.",
            "choice1_failure_text": "Mauvais choix ! Le coffre explose en une pluie de peaux de bananes, vous faisant glisser."
        },
        "tombeau_singe_esprit": {
            "description": "L'esprit du Roi Singe apparaît, impressionné. 'Tu es malin et agile ! Mais es-tu fort ?'",
            "choice1_text": "Affronter l'esprit du Roi Singe"
        },
        "tombeau_singe_fin_succes": {
            "description": "Vous avez battu le Roi Singe à son propre jeu. Respectueux, il vous offre son bâton magique et son trésor."
        },
        "tombeau_singe_fin_echec": {
            "description": "Le Roi Singe était trop imprévisible. Il vous a expulsé de son tombeau d'un coup de pied."
        },
        "cite_engloutie_debut": {
            "description": "Avec un rituel, vous ouvrez un passage vers la cité engloutie de R'lyeh. L'architecture du lieu défie la raison et une présence malsaine pèse sur votre esprit.",
            "choice1_text": "Avancer dans la folie (Vie 180+)",
            "choice1_success_text": "Votre force vitale vous ancre à la réalité. Vous progressez.",
            "choice1_failure_text": "La simple vue de la cité vous submerge. Vous perdez une partie de votre santé mentale et physique."
        },
        "cite_engloutie_symboles": {
            "description": "Des symboles impies sont gravés sur les murs. Les toucher pourrait vous apporter un grand pouvoir, ou vous détruire.",
            "choice1_text": "Tracer les symboles (Intelligence 70+)",
            "choice1_success_text": "Vous comprenez l'essence des symboles et absorbez une partie de leur pouvoir sans sombrer.",
            "choice1_failure_text": "L'énergie des symboles vous submerge. C'est une agonie mentale."
        },
        "cite_engloutie_gardien": {
            "description": "Une horreur tentaculaire, un Shoggoth, se matérialise devant vous pour garder le sanctuaire intérieur.",
            "choice1_text": "Combattre la créature indicible",
            "choice1_success_text": "Vous levez votre arme contre une créature qui ne devrait pas exister."
        },
        "cite_engloutie_fin_succes": {
            "description": "Vous avez survécu à R'lyeh et pillé un artefact du sanctuaire. Vous êtes riche, mais peut-être plus tout à fait sain d'esprit."
        },
        "cite_engloutie_fin_echec": {
            "description": "La folie vous a rattrapé. Vous fuyez la cité en hurlant, laissant une partie de votre âme derrière vous."
        },
        "dernier_geant_debut": {
            "description": "Une armée d'orcs menace le royaume. Seule une ancienne prophétie peut le sauver : le réveil du dernier Géant de Pierre.",
            "choice1_text": "Partir à la recherche du Géant endormi",
            "choice1_success_text": "Vous suivez les indications d'une vieille carte jusqu'à une vallée cachée."
        },
        "dernier_geant_reveil": {
            "description": "Vous trouvez le Géant, une montagne de pierre endormie. Il faut le réveiller.",
            "choice1_text": "Utiliser un ancien cor (Force 75+)",
            "choice1_success_text": "Vous soufflez dans un cor trouvé à proximité. Le son est si puissant qu'il réveille le Géant.",
            "choice1_failure_text": "Vous n'avez pas assez de souffle. Le son est pathétique. Il vous faut une autre solution.",
            "choice2_text": "Briser les sceaux de sommeil (Intelligence 75+)",
            "choice2_success_text": "Vous déchiffrez les runes et brisez les sceaux. Le Géant s'éveille."
        },
        "dernier_geant_convaincre": {
            "description": "Le Géant est réveillé, mais il refuse d'intervenir dans les querelles des 'petits'.",
            "choice1_text": "Le convaincre par la diplomatie (Intelligence 85+)",
            "choice1_success_text": "Vous lui parlez de l'honneur et de son ancien serment de protecteur. Il accepte d'aider.",
            "choice1_failure_text": "Il n'écoute pas vos mots. Il ne respecte que la force.",
            "choice2_text": "Le provoquer en duel",
            "choice2_success_text": "'Si tu me bats, je t'aiderai', gronde-t-il."
        },
        "dernier_geant_epreuve": {
            "description": "L'épreuve de force du Géant : survivre à un de ses coups.",
            "choice1_text": "Encaisser le coup (Défense 50+ & Vie 200+)",
            "choice1_success_text": "Le coup vous envoie voler, mais vous êtes toujours debout ! Impressionné, le Géant accepte de se battre à vos côtés.",
            "choice1_failure_text": "Son coup vous brise. Vous êtes vaincu."
        },
        "dernier_geant_fin_succes": {
            "description": "Le Géant de Pierre marche à vos côtés. L'armée d'orcs est balayée. Vous avez sauvé le royaume."
        },
        "dernier_geant_fin_echec": {
            "description": "Vous n'étiez pas à la hauteur de la légende. Le Géant se rendort, et le royaume est en grand péril."
        },
        "echiquier_dieux_debut": {
            "description": "Vous êtes transporté dans un plan astral devant un échiquier cosmique. Une entité, le Grand Stratège, vous invite à jouer. L'enjeu : une fraction de son savoir.",
            "choice1_text": "Accepter la partie",
            "choice1_success_text": "Les pièces, des armées de lumière et d'ombre, se mettent en place."
        },
        "echiquier_dieux_partie1": {
            "description": "Premier mouvement : le gambit du roi. Sacrifiez-vous une pièce mineure pour un avantage stratégique ?",
            "choice1_text": "Sacrifier le pion (Intelligence 80+)",
            "choice1_success_text": "Le Stratège hoche la tête. Votre sacrifice vous ouvre le centre de l'échiquier.",
            "choice1_failure_text": "Votre sacrifice est vain. Le Stratège prend votre pièce et renforce sa position."
        },
        "echiquier_dieux_partie2": {
            "description": "Milieu de partie : le Stratège lance une offensive sur votre flanc. Comment réagissez-vous ?",
            "choice1_text": "Contre-attaque au centre (Intelligence 85+)",
            "choice1_success_text": "Votre contre-attaque le surprend ! Il doit reculer. Vous avez l'avantage.",
            "choice1_failure_text": "Votre défense est submergée. Vous perdez plusieurs pièces majeures."
        },
        "echiquier_dieux_partie3": {
            "description": "Fin de partie : vous avez l'avantage. Il ne vous reste qu'à porter le coup de grâce.",
            "choice1_text": "Échec et mat en trois coups (Intelligence 90+)",
            "choice1_success_text": "Vous annoncez l'échec et mat. Le Stratège sourit. 'Bien joué, mortel.'",
            "choice1_failure_text": "Vous manquez l'opportunité ! Le Stratège force la nulle."
        },
        "echiquier_dieux_fin_succes": {
            "description": "Vous avez battu une entité cosmique aux échecs. Vous recevez une partie de son savoir infini."
        },
        "echiquier_dieux_fin_moyen": {
            "description": "La partie est nulle. Le Stratège, bon joueur, vous accorde une récompense mineure pour votre talent."
        },
        "echiquier_dieux_fin_echec": {
            "description": "Vous avez été surclassé. L'entité vous renvoie dans votre monde, la tête vide."
        },
        "toison_or_debut": {
            "description": "Vous embarquez sur un navire, l'Argo II, pour une quête légendaire : retrouver la Toison d'Or.",
            "choice1_text": "Lever l'ancre vers l'inconnu",
            "choice1_success_text": "Le voyage commence. Les mers sont dangereuses."
        },
        "toison_or_sirenes": {
            "description": "Vous approchez de l'île des Sirènes. Leur chant est envoûtant et mène les navires à leur perte.",
            "choice1_text": "Se boucher les oreilles avec de la cire (Défense 30+)",
            "choice1_success_text": "Vous résistez au chant et naviguez en toute sécurité.",
            "choice1_failure_text": "Le chant pénètre vos défenses. Vous luttez pour garder le cap."
        },
        "toison_or_hydre": {
            "description": "Pour atteindre l'île de la Toison, vous devez passer un détroit gardé par une terrible Hydre des Marais.",
            "choice1_text": "Combattre l'Hydre"
        },
        "toison_or_gardien": {
            "description": "Vous arrivez sur l'île. La Toison d'Or est accrochée à un arbre, gardée par un dragon qui ne dort jamais.",
            "choice1_text": "Endormir le dragon avec une potion (Intelligence 75+)",
            "choice1_success_text": "Vous versez une puissante potion de sommeil dans la source où boit le dragon. Il s'endort.",
            "choice1_failure_text": "La potion n'est pas assez forte. Le dragon vous attaque !"
        },
        "toison_or_fin_succes": {
            "description": "Vous vous emparez de la Toison d'Or. Sa magie curative vous soigne et sa valeur fera de vous une légende."
        },
        "toison_or_fin_echec": {
            "description": "Les épreuves étaient trop grandes. Votre navire sombre, et vous avec."
        },
        "foret_monde_debut": {
            "description": "La gigantesque Forêt-Monde, source de toute vie, se meurt. Une corruption sombre se propage depuis son cœur.",
            "choice1_text": "S'aventurer au cœur de la forêt",
            "choice1_success_text": "Vous entrez dans la forêt. L'air est lourd de tristesse et de corruption."
        },
        "foret_monde_corruption": {
            "description": "La corruption vous assaille, tentant de drainer votre force vitale.",
            "choice1_text": "Y résister (Vie 220+)",
            "choice1_success_text": "Votre vitalité est si forte qu'elle repousse la corruption. Vous progressez sans mal.",
            "choice1_failure_text": "La corruption vous affaiblit, rongeant votre corps et votre esprit."
        },
        "foret_monde_coeur": {
            "description": "Au cœur de la forêt, vous trouvez la source : un ancien esprit de la nature, une Licorne, corrompue par une blessure nécromantique. Elle est devenue une créature de cauchemar.",
            "choice1_text": "Tenter de la purifier (Intelligence 80+ & Chance 70+)",
            "choice1_success_text": "Vous utilisez votre savoir et votre pureté de cœur pour soigner sa blessure. La corruption s'évanouit.",
            "choice1_failure_text": "La corruption est trop profonde. La créature, dans sa douleur, vous attaque."
        },
        "foret_monde_fin_succes": {
            "description": "La Licorne est sauvée. En remerciement, elle insuffle en vous une partie de la vitalité de la Forêt-Monde."
        },
        "foret_monde_fin_moyen": {
            "description": "Vous avez dû abattre la créature pour mettre fin à ses souffrances. La forêt pleure, mais elle commencera à guérir."
        },
        "foret_monde_fin_echec": {
            "description": "La corruption vous a submergé. Vous avez fui avant d'être consumé."
        },
        "tournoi_champions_debut": {
            "description": "Vous avez été invité au Tournoi des Champions Éternels, une compétition secrète dans une arène hors du temps.",
            "choice1_text": "Accepter l'invitation et combattre",
            "choice1_success_text": "Votre premier adversaire est Hrothgar, le Roi Barbare."
        },
        "tournoi_champions_manche2": {
            "description": "Vous avez vaincu Hrothgar. Votre prochain adversaire est Lirael, l'Archère Elfe dont les flèches ne manquent jamais leur cible.",
            "choice1_text": "Combattre Lirael"
        },
        "tournoi_champions_finale": {
            "description": "Vous êtes en finale. Votre dernier adversaire est Sir Gideon, le Chevalier Éternel, le premier champion du tournoi.",
            "choice1_text": "Combattre pour le titre de Champion Éternel"
        },
        "tournoi_champions_fin_succes": {
            "description": "Vous êtes le nouveau Champion Éternel. Votre place dans la légende est assurée."
        },
        "tournoi_champions_fin_moyen": {
            "description": "Vous avez atteint la finale, un exploit en soi. Vous êtes renvoyé dans votre monde avec les honneurs et une belle récompense."
        },
        "tournoi_champions_fin_echec": {
            "description": "Le niveau était trop élevé. Vous avez été vaincu, mais vous avez appris de précieux leçons de combat."
        },
        "biblio_infinie_debut": {
            "description": "Vous cherchez le 'Livre de la Destinée'. Il se trouve dans la Bibliothèque Infinie, un lieu qui contient tous les livres possibles.",
            "choice1_text": "Entrer dans la bibliothèque",
            "choice1_success_text": "Les étagères s'étendent à l'infini dans toutes les directions. Par où commencer ?"
        },
        "biblio_infinie_chercher": {
            "description": "Comment trouver un seul livre dans l'infini ?",
            "choice1_text": "Chercher par sujet (Intelligence 88+)",
            "choice1_success_text": "Votre esprit logique vous permet de naviguer dans la structure conceptuelle de la bibliothèque. Vous vous rapprochez.",
            "choice1_failure_text": "Vous êtes submergé par la quantité d'informations. Vous errez pendant ce qui semble une éternité.",
            "choice2_text": "Suivre son instinct (Chance 80+)",
            "choice2_success_text": "Par pure coïncidence, vous tombez sur la bonne section !",
            "choice2_failure_text": "Votre instinct vous égare complètement."
        },
        "biblio_infinie_gardien": {
            "description": "La section est gardée par un Bibliothécaire Axiomatique. 'Le silence est d'or, le savoir est pouvoir. Prouve que tu mérites ce livre.'",
            "choice1_text": "Lui poser une question insoluble (Intelligence 90+)",
            "choice1_success_text": "Vous lui posez un paradoxe qui fait fumer ses circuits. Il se désactive, vous laissant passer.",
            "choice1_failure_text": "Il répond à votre question et vous bannit pour votre impertinence."
        },
        "biblio_infinie_fin_succes": {
            "description": "Vous avez trouvé le Livre de la Destinée. En le lisant, vous comprenez les fils qui régissent le monde."
        },
        "biblio_infinie_fin_echec": {
            "description": "Vous êtes perdu à jamais dans l'infini du savoir. Une fin tragique pour un aventurier."
        },
        "forgeron_ames_debut": {
            "description": "Dans les profondeurs d'un donjon infernal, un forgeron démoniaque capture les âmes de héros pour forger des armes maudites.",
            "choice1_text": "Descendre dans le donjon",
            "choice1_success_text": "Les murs sont chauds et des cris d'agonie résonnent."
        },
        "forgeron_ames_prison": {
            "description": "Vous trouvez la prison des âmes, des cristaux contenant des esprits hurlants.",
            "choice1_text": "Briser les cristaux (Force 75+)",
            "choice1_success_text": "Vous libérez les âmes. Elles vous remercient en vous offrant une partie de leur puissance avant de partir.",
            "choice1_failure_text": "Les cristaux sont trop solides. Le vacarme alerte le forgeron."
        },
        "forgeron_ames_combat": {
            "description": "Le Forgeron des Âmes, un démon de métal et de feu, apparaît. 'Une nouvelle âme pour ma collection !'",
            "choice1_text": "Affronter le démon"
        },
        "forgeron_ames_fin_succes": {
            "description": "Le démon est vaincu et son enclume maudite se brise. Vous avez libéré d'innombrables âmes."
        },
        "forgeron_ames_fin_echec": {
            "description": "Le forgeron a failli ajouter votre âme à sa collection. Vous avez fui de justesse."
        },
        "armee_tenebres_debut": {
            "description": "Un portail vers les abysses s'est ouvert sur le champ de bataille de la Plaine des Larmes. Une armée de démons déferle.",
            "choice1_text": "Mener la contre-attaque",
            "choice1_success_text": "Vous rejoignez les rangs des défenseurs. Le moral est bas."
        },
        "armee_tenebres_bataille": {
            "description": "Le Général Démon mène la charge. La ligne de défense est sur le point de rompre.",
            "choice1_text": "Rallier les troupes (Intelligence 70+)",
            "choice1_success_text": "Votre discours galvanise les soldats ! Ils tiennent bon et vous ouvrent un chemin vers le général.",
            "choice1_failure_text": "Vos mots sont perdus dans le chaos. Vous devez vous frayer un chemin vous-même.",
            "choice2_text": "Charger en solo (Force 80+ & Défense 45+)",
            "choice2_success_text": "Votre fureur est telle que vous percez les lignes démoniaques, arrivant directement face au général.",
            "choice2_failure_text": "Même pour vous, ils sont trop nombreux. Vous êtes submergé."
        },
        "armee_tenebres_combat": {
            "description": "Vous faites face au Général Démon, une montagne de muscles et de haine.",
            "choice1_text": "Combattre le chef de la horde"
        },
        "armee_tenebres_fin_succes": {
            "description": "Le général vaincu, l'armée démoniaque, privée de chef, bat en retraite dans le portail qui se referme. Vous avez sauvé le monde."
        },
        "armee_tenebres_fin_echec": {
            "description": "L'armée des ténèbres était inarrêtable. Le monde est plongé dans l'ombre."
        },

        // ** MYTHIQUES **
        "breche_debut": {
            "description": "Une faille aux couleurs impossibles déchire le ciel. Des horreurs difformes en sortent, consumant la réalité. Vous devez la sceller de l'intérieur.",
            "choice1_text": "Plonger dans la Brèche Dimensionnelle",
            "choice1_success_text": "Vous traversez le voile de la réalité. L'air est fait d'électricité statique et la géométrie est un mensonge."
        },
        "breche_navigation": {
            "description": "Le 'sol' est un chaos de possibilités fracturées. Rester ici trop longtemps est dangereux pour votre esprit.",
            "choice1_text": "Naviguer par la pure volonté (Défense 50+)",
            "choice1_success_text": "Votre armure et votre esprit vous protègent des assauts de cette réalité hostile.",
            "choice1_failure_text": "La réalité non-euclidienne vous brise. Vous subissez des dégâts mentaux et physiques."
        },
        "breche_gardiens": {
            "description": "Deux Horreurs Dimensionnelles, des amalgames de vrilles et d'yeux, gardent la source de la brèche.",
            "choice1_text": "Combattre les gardiens"
        },
        "breche_sceau": {
            "description": "La source est un cristal de néant pur. Vous devez canaliser une immense énergie pour le forcer à se refermer.",
            "choice1_text": "Tenter de sceller la brèche (Intelligence 100+)",
            "choice1_success_text": "Vous imposez votre volonté à la réalité. La brèche se referme sur elle-même dans un éclair de silence.",
            "choice1_failure_text": "L'énergie du néant vous submerge. La brèche s'élargit et vous êtes consumé."
        },
        "breche_fin_succes": {
            "description": "Vous êtes rejeté dans votre monde juste avant la fermeture complète. Vous avez sauvé la réalité... pour l'instant."
        },
        "breche_fin_echec": {
            "description": "Vous êtes devenu une partie de la brèche, un écho perdu dans le multivers."
        },
        "corruption_debut": {
            "description": "La source de la corruption qui ronge le royaume émane d'une source unique : le Cœur Noir de Xylos, un ancien dieu déchu enterré sous la capitale.",
            "choice1_text": "Descendre dans les cryptes sacrées pour l'affronter",
            "choice1_success_text": "Vous pénétrez dans les fondations du monde, là où la corruption est la plus forte."
        },
        "corruption_chemin": {
            "description": "Le chemin vers le cœur est gardé par des versions corrompues des plus nobles créatures.",
            "choice1_text": "Affronter un Griffon Corrompu"
        },
        "corruption_gardien": {
            "description": "La porte du sanctuaire est gardée par un Dragon Ancien, son esprit tordu par la haine.",
            "choice1_text": "Combattre le Dragon Corrompu"
        },
        "corruption_coeur": {
            "description": "Vous faites face au Cœur de la Corruption. Ce n'est pas une créature, mais une masse pulsante de pure malveillance. Vous ne pouvez pas le détruire par la force.",
            "choice1_text": "L'absorber et tenter de le contenir (Vie 300+)",
            "choice1_success_text": "Vous absorbez la corruption. La douleur est inimaginable, mais votre volonté est plus forte. Vous devenez son gardien éternel.",
            "choice1_failure_text": "La corruption vous consume. Vous devenez son nouvel avatar.",
            "choice2_text": "Le purifier avec votre force vitale (Défense 60+)",
            "choice2_success_text": "Vous sacrifiez une partie de votre vitalité pour purifier le cœur. Vous êtes affaibli, mais le royaume est sauvé."
        },
        "corruption_fin_succes": {
            "description": "Vous avez maîtrisé la corruption. Le royaume guérit lentement. Vous portez un lourd fardeau, mais vous avez gagné."
        },
        "corruption_fin_moyen": {
            "description": "Le royaume est sauvé, mais le prix a été élevé. Vous ne serez peut-être plus jamais le même."
        },
        "corruption_fin_echec": {
            "description": "La corruption a gagné. Le monde est condamné à pourrir de l'intérieur."
        },
        "etoile_debut": {
            "description": "Une étoile dans le ciel, 'l'Augure', a commencé à pulser d'une lumière rouge et à grandir. Les astrologues prédisent qu'elle consumera le monde d'ici une semaine.",
            "choice1_text": "Voyager jusqu'à l'Observatoire Céleste",
            "choice1_success_text": "Vous atteignez le plus haut sommet du monde, où un observatoire antique pointe vers les cieux."
        },
        "etoile_mecanisme": {
            "description": "L'observatoire est un immense mécanisme de lentilles et d'engrenages. Vous comprenez que l'étoile est une construction, une arme, qui a été déréglée.",
            "choice1_text": "Recalibrer le mécanisme (Intelligence 110+)",
            "choice1_success_text": "Votre compréhension de la mécanique céleste est sans égale. Vous recalibrez les lentilles, et la lumière de l'étoile redevient blanche et stable.",
            "choice1_failure_text": "Vous faites une erreur de calcul ! Le rayon de l'étoile se focalise sur l'observatoire !"
        },
        "etoile_surcharge": {
            "description": "L'observatoire tremble sous l'impact du rayon d'énergie. Vous devez survivre à l'effondrement.",
            "choice1_text": "Encaisser l'effondrement (Défense 55+)",
            "choice1_success_text": "Les débris rebondissent sur votre armure. Vous survivez, mais le mécanisme est détruit. Vous avez seulement retardé la fin.",
            "choice1_failure_text": "La structure s'effondre sur vous. C'est la fin."
        },
        "etoile_fin_succes": {
            "description": "Vous avez stabilisé l'Étoile Mourante, sauvant le monde d'une apocalypse de feu. Les métaux rares qui composent l'observatoire sont à vous."
        },
        "etoile_fin_moyen": {
            "description": "Vous avez survécu, mais l'arme céleste est toujours une menace. Vous n'avez fait que gagner du temps."
        },
        "etoile_fin_echec": {
            "description": "Votre histoire se termine ici, ensevelie sous les ruines d'un savoir ancien."
        },
        "roi_debut": {
            "description": "Une ancienne prophétie annonce le retour du vrai roi, endormi au coeur du monde. Les tremblements de terre sont le signe de son réveil imminent.",
            "choice1_text": "Descendre au plus profond du monde.",
            "choice1_success_text": "Vous trouvez une ancienne voie naine qui s'enfonce dans les entrailles du monde."
        },
        "roi_gardiens": {
            "description": "Le chemin est bloqué par les Gardiens de Pierre Éternels. 'Seul le digne héritier du pouvoir peut passer', grondent-ils.",
            "choice1_text": "Prouver sa valeur au combat"
        },
        "roi_coeur": {
            "description": "Vous arrivez dans une caverne colossale. Au centre, un trône de cristal où siège une silhouette titanesque, endormie. C'est le Roi Léviathan.",
            "choice1_text": "Le réveiller (Intelligence 90+)",
            "choice1_success_text": "Vous touchez le trône et canalisez votre volonté. Le Roi ouvre les yeux. Son regard contient la création.",
            "choice1_failure_text": "L'énergie brute vous submerge. La responsabilité était trop grande. Vous fuyez."
        },
        "roi_jugement": {
            "description": "Le Roi vous juge. Il sonde votre âme. 'Tu as le cœur d'un vrai protecteur', dit sa voix dans votre esprit. 'Prends ma bénédiction et unis ce monde.'",
            "choice1_text": "Accepter la bénédiction",
            "choice1_success_text": "Une puissance inimaginable afflue en vous."
        },
        "roi_fin_succes": {
            "description": "Vous avez reçu la bénédiction du Premier Roi. Vous n'êtes plus un simple aventurier, mais un mythe vivant, un guide pour les générations à venir."
        },
        "roi_fin_echec": {
            "description": "Vous n'étiez pas prêt. Personne ne l'était peut-être. L'histoire se souviendra de vous comme celui qui a fui."
        },
        "silence_etoiles_debut": {
            "description": "Les étoiles s'éteignent une à une. Les nuits deviennent plus sombres. Une horreur cosmique est à l'œuvre.",
            "choice1_text": "Chercher des réponses dans un observatoire astral",
            "choice1_success_text": "Vous utilisez un ancien portail pour voyager vers un observatoire flottant dans le vide."
        },
        "silence_etoiles_revelation": {
            "description": "Les télescopes révèlent la vérité : une entité colossale, un 'Dévoreur d'Étoiles', se nourrit de la lumière des soleils.",
            "choice1_text": "Il est impossible de le combattre. Que faire ?",
            "choice1_success_text": "Votre seule chance est de trouver un moyen de l'endormir ou de le leurrer ailleurs."
        },
        "silence_etoiles_choix": {
            "description": "Vous avez deux options : utiliser le signal de l'observatoire pour émettre une 'berceuse' hyperspatiale, ou créer un appât en faisant exploser une nébuleuse proche.",
            "choice1_text": "Composer la berceuse (Intelligence 120+)",
            "choice1_success_text": "Vous composez une mélodie de pure tranquillité. Le Dévoreur, apaisé, s'endort pour un millénaire.",
            "choice1_failure_text": "Votre mélodie est fausse. Elle irrite la créature, qui dévore trois étoiles de plus par dépit.",
            "choice2_text": "Créer l'appât (Chance 100+)",
            "choice2_success_text": "La réaction en chaîne que vous provoquez crée un phare d'énergie irrésistible. Le Dévoreur s'en va, laissant votre galaxie en paix.",
            "choice2_failure_text": "L'explosion est un échec. Vous avez seulement attiré son attention sur vous."
        },
        "silence_etoiles_fin_succes": {
            "description": "Vous avez sauvé le ciel nocturne. Les étoiles brillent de nouveau, et des fragments cosmiques pleuvent en remerciement."
        },
        "silence_etoiles_fin_echec": {
            "description": "Votre intervention a aggravé les choses. L'obscurité gagne du terrain."
        },
        "tuer_dieu_debut": {
            "description": "Le dieu déchu Malakor, le dernier de son panthéon, menace de dévorer le soleil. Vous êtes le seul à pouvoir l'atteindre dans son sanctuaire céleste.",
            "choice1_text": "Accepter le fardeau du tueur de dieu",
            "choice1_success_text": "Vous vous préparez pour le combat le plus important de votre existence."
        },
        "tuer_dieu_ascension": {
            "description": "Pour atteindre le sanctuaire, vous devez traverser le Pont de l'Aube, gardé par son Archange loyal.",
            "choice1_text": "Convaincre l'Archange (Intelligence 100+)",
            "choice1_success_text": "Vos mots sont si justes que l'Archange doute et vous laisse passer.",
            "choice1_failure_text": "Vos paroles sont vaines. Vous devez le combattre.",
            "choice2_text": "Forcer le passage",
            "choice2_success_text": "La diplomatie n'est pas une option."
        },
        "tuer_dieu_combat": {
            "description": "Vous êtes face à Malakor. Sa taille éclipse les montagnes, son regard brûle d'une lumière noire.",
            "choice1_text": "METTRE FIN À LA DIVINITÉ."
        },
        "tuer_dieu_fin_succes": {
            "description": "Le dieu est mort. Le soleil est sauvé. Vous avez accompli l'impossible. Vous n'êtes plus un héros, vous êtes une légende gravée dans la réalité."
        },
        "tuer_dieu_fin_echec": {
            "description": "On ne tue pas un dieu impunément. Votre corps et votre âme sont effacés de l'existence."
        },
        "reflet_brise_debut": {
            "description": "Des gens rapportent voir des 'doubles' d'eux-mêmes commettre des crimes. Un monde miroir, une version sombre du vôtre, est en train de fusionner avec la réalité.",
            "choice1_text": "Traverser le miroir",
            "choice1_success_text": "Vous trouvez une flaque d'eau qui ne reflète pas le ciel. Vous plongez dedans."
        },
        "reflet_brise_monde_sombre": {
            "description": "Vous êtes dans une version tordue de votre monde. Au loin, vous voyez votre propre double, une version maléfique de vous-même, qui semble être le roi de ce royaume.",
            "choice1_text": "Le confronter",
            "choice1_success_text": "Il n'y a de place que pour l'un de nous."
        },
        "reflet_brise_combat": {
            "description": "Votre double vous sourit. 'Tu es faible. Tu as de la pitié. Je vais te montrer ta vraie force.'",
            "choice1_text": "Combattre son propre reflet",
            "choice2_text": "Tenter de fusionner (Intelligence 110+)",
            "choice2_success_text": "Vous réalisez qu'il n'est pas votre ennemi, mais une partie de vous. Vous acceptez votre part d'ombre et fusionnez, devenant un être complet et bien plus puissant.",
            "choice2_failure_text": "Votre double refuse. 'Je suis le seul qui devrait exister !'"
        },
        "reflet_brise_fin_succes": {
            "description": "Vous avez détruit votre double. Le monde miroir s'efface et la réalité est sauve. Mais une partie de vous est morte aujourd'hui."
        },
        "reflet_brise_fin_fusion": {
            "description": "Vous êtes devenu un être transcendant. Vous n'êtes plus ni bon, ni mauvais, mais entier. Le monde est à vous."
        },
        "reflet_brise_fin_echec": {
            "description": "Votre double était plus fort, plus impitoyable. Il vous a effacé et a pris votre place. Personne ne saura jamais la vérité."
        },
        "melodie_creation_debut": {
            "description": "Le silence s'est abattu sur le monde. La musique de fond de la réalité, la 'Mélodie de la Création', s'est arrêtée. Les choses commencent à se défaire.",
            "choice1_text": "Partir en quête des notes perdues",
            "choice1_success_text": "Vous devez visiter les Plans Élémentaires pour retrouver les trois notes primordiales."
        },
        "melodie_creation_note_terre": {
            "description": "Au coeur du Plan de la Terre, la note est gardée par un Titan de Cristal. Il vous la donnera si vous pouvez supporter le poids du monde sur vos épaules.",
            "choice1_text": "Supporter le poids (Force 110+ & Défense 55+)",
            "choice1_success_text": "Vous tenez bon. Le Titan, impressionné, vous offre la 'Note de la Stabilité'."
        },
        "melodie_creation_note_eau": {
            "description": "Dans l'Océan des Rêves, la note est cachée dans un coquillage chantant. Il faut l'atteindre sans se perdre dans les illusions.",
            "choice1_text": "Naviguer par l'intuition (Chance 110+)",
            "choice1_success_text": "Votre chance vous guide à travers le brouillard des illusions. Vous trouvez la 'Note du Changement'."
        },
        "melodie_creation_note_feu": {
            "description": "Dans le Brasier Éternel, la note est au coeur du Phénix Immortel. Il ne vous la donnera que si vous survivez à sa flamme purificatrice.",
            "choice1_text": "Endurer la flamme (Vie 250+)",
            "choice1_success_text": "Vous traversez le feu et en ressortez indemne. Le Phénix vous offre la 'Note de la Passion'."
        },
        "melodie_creation_finale": {
            "description": "Vous avez les trois notes. Au sommet du monde, vous les jouez dans le bon ordre.",
            "choice1_text": "Jouer la Mélodie (Intelligence 115+)",
            "choice1_success_text": "La musique revient. La réalité se ressoude, plus forte qu'avant.",
            "choice1_failure_text": "Vous jouez une fausse note. La cacophonie déchire la réalité."
        },
        "melodie_creation_fin_succes": {
            "description": "Vous êtes devenu le nouveau compositeur du monde. L'univers chante votre nom."
        },
        "melodie_creation_fin_echec": {
            "description": "Le silence est maintenant éternel. Le monde s'efface lentement."
        },
        "roue_temps_debut": {
            "description": "Vous réalisez que votre monde est prisonnier d'un cycle sans fin de destruction et de renaissance. Pour le libérer, vous devez atteindre le centre de la Roue du Temps.",
            "choice1_text": "Tenter de briser le cycle",
            "choice1_success_text": "Vous méditez pour trouver le chemin vers le moyeu du temps."
        },
        "roue_temps_gardien": {
            "description": "Le Gardien du Cycle, un serpent qui se mord la queue, vous bloque le passage. 'Le cycle est la seule chose qui empêche le chaos', dit-il.",
            "choice1_text": "Le convaincre que le libre arbitre est nécessaire (Intelligence 125+)",
            "choice1_success_text": "Vos arguments sont si puissants que même un être éternel doute. Il vous laisse passer.",
            "choice1_failure_text": "Il ne voit que la nécessité du cycle. Vous devez le combattre."
        },
        "roue_temps_coeur": {
            "description": "Vous êtes au centre de la Roue. Vous pouvez la briser pour libérer le monde, ou prendre le contrôle du cycle.",
            "choice1_text": "Briser la Roue (Force 120+)",
            "choice1_success_text": "Avec une force qui transcende la physique, vous brisez la Roue. Le futur est maintenant incertain, mais libre.",
            "choice2_text": "Devenir le nouveau Gardien",
            "choice2_success_text": "Vous prenez la place du gardien, condamné à superviser le cycle pour l'éternité, mais en le guidant avec sagesse."
        },
        "roue_temps_fin_succes": {
            "description": "Vous avez offert le don du libre arbitre au monde. Nul ne sait ce que l'avenir réserve, mais il sera le leur."
        },
        "roue_temps_fin_moyen": {
            "description": "Vous êtes devenu un dieu silencieux, un gardien. Vous avez sauvé le monde de sa répétition, mais vous avez sacrifié votre propre liberté."
        },
        "roue_temps_fin_echec": {
            "description": "Vous n'étiez pas assez fort pour changer le destin. Le cycle se réinitialise, et vous êtes effacé."
        },
        "jardin_hephaistos_debut": {
            "description": "Vous avez trouvé l'entrée du Jardin d'Héphaïstos, le dieu forgeron. Ici, toute la faune et la flore sont des automates de bronze, d'argent et d'or.",
            "choice1_text": "Explorer le jardin mécanique",
            "choice1_success_text": "Des oiseaux de bronze chantent des mélodies de métal. Des fleurs d'or suivent votre passage."
        },
        "jardin_hephaistos_faune": {
            "description": "Un troupeau de cerfs d'argent mécanique vous charge, leurs bois acérés comme des lances.",
            "choice1_text": "Les démanteler (Force 100+)",
            "choice1_success_text": "Votre force est telle que vous les mettez en pièces. Vous récoltez une quantité incroyable de métal.",
            "choice1_failure_text": "Ils sont trop solides et coordonnés. Ils vous encornent et vous piétinent."
        },
        "jardin_hephaistos_gardien": {
            "description": "Le centre du jardin est gardé par Talos, un colosse de bronze forgé par le dieu lui-même.",
            "choice1_text": "Trouver son point faible (Intelligence 100+)",
            "choice1_success_text": "Vous remarquez une plaque mal vissée à son talon. Un coup bien placé le désactivera.",
            "choice2_text": "L'affronter de front",
            "choice2_success_text": "Vous chargez le colosse de bronze."
        },
        "jardin_hephaistos_combat": {
            "description": "Vous visez le talon de Talos !",
            "choice1_text": "Frapper le point faible (Agilité 100+)",
            "choice1_success_text": "Votre coup est précis ! Le colosse s'effondre, désactivé.",
            "choice1_failure_text": "Vous manquez votre cible ! Talos vous frappe de son épée géante."
        },
        "jardin_hephaistos_fin_succes": {
            "description": "Le jardin est à vous. Vous repartez avec des trésors de métal divin qui feront de vous le plus grand artisan du monde."
        },
        "jardin_hephaistos_fin_echec": {
            "description": "Les créations d'un dieu sont au-delà de vos forces. Vous avez été vaincu."
        },
        "encre_destin_debut": {
            "description": "Vous cherchez le Scriptorium où le destin de chaque être est écrit. Vous voulez y ajouter votre propre chapitre.",
            "choice1_text": "Chercher le Scriptorium hors du temps",
            "choice1_success_text": "Après une longue quête, vous trouvez la porte invisible."
        },
        "encre_destin_livre": {
            "description": "Vous trouvez votre livre, ouvert à la page d'aujourd'hui. La plume et l'encre du destin sont à côté.",
            "choice1_text": "Lire votre destin (Intelligence 100+)",
            "choice1_success_text": "Vous lisez votre fin... et la trouvez décevante. Vous êtes maintenant encore plus déterminé à la changer.",
            "choice1_failure_text": "Le savoir de votre propre fin est un fardeau trop lourd. Votre esprit est brisé.",
            "choice2_text": "Écrire sans lire",
            "choice2_success_text": "L'ignorance est une force. Vous prenez la plume, prêt à écrire un futur inconnu."
        },
        "encre_destin_ecrire": {
            "description": "Que voulez-vous écrire ?",
            "choice1_text": "Écrire '...et il devint immensément riche.' (Chance 120+)",
            "choice1_success_text": "L'encre sèche. De retour dans le monde, vous trouvez des trésors partout où vous allez.",
            "choice2_text": "Écrire '...et il apporta la paix au monde.' (Vie 300+)",
            "choice2_success_text": "Le fardeau de la paix mondiale pèse sur vos épaules. Vous y parvenez, au prix de votre propre bonheur.",
            "choice3_text": "Écrire '...et il devint libre.'",
            "choice3_success_text": "Vous vous libérez des chaînes du destin. Vous ne serez plus jamais guidé, mais vous ne recevrez plus jamais d'aide non plus."
        },
        "encre_destin_fin_succes": {
            "description": "Votre destin est maintenant le vôtre. Vous avez transcendé votre condition de simple aventurier."
        },
        "encre_destin_fin_echec": {
            "description": "On ne joue pas avec le destin. Votre tentative s'est retournée contre vous de la pire des manières."
        },
        "proces_asmodeus_debut": {
            "description": "Vous êtes convoqué par une puissance inconnue. Vous vous réveillez en enfer, dans une salle d'audience. Asmodéus, le diable, est le procureur. L'humanité est l'accusée. Et vous êtes son avocat.",
            "choice1_text": "Accepter de défendre l'humanité",
            "choice1_success_text": "Le procès commence. L'enjeu est le sort de toutes les âmes mortelles."
        },
        "proces_asmodeus_temoin1": {
            "description": "Premier témoin de l'accusation : Caïn, le premier meurtrier. 'L'humanité est née dans la violence', accuse-t-il.",
            "choice1_text": "Contre-interroger (Intelligence 110+)",
            "choice1_success_text": "Vous argumentez que le premier acte fut le choix, pas la violence. La rédemption est toujours possible. Le jury est touché.",
            "choice1_failure_text": "Vos arguments sont faibles. Le jury est convaincu de la nature violente de l'homme."
        },
        "proces_asmodeus_temoin2": {
            "description": "Deuxième témoin : Judas. 'L'humanité est cupide et traître.'",
            "choice1_text": "Présenter une preuve contraire (Chance 110+)",
            "choice1_success_text": "Vous invoquez l'âme d'un héros anonyme qui s'est sacrifié pour les autres. L'acte de bravoure éclipse la trahison de Judas.",
            "choice1_failure_text": "Vous ne trouvez pas d'âme assez pure pour témoigner. L'accusation de cupidité reste."
        },
        "proces_asmodeus_verdict": {
            "description": "C'est votre plaidoirie finale.",
            "choice1_text": "Faire appel à l'amour et au potentiel (Intelligence 130+)",
            "choice1_success_text": "'L'humanité n'est pas parfaite, mais son potentiel pour le bien est infini !' Votre discours est si puissant que les flammes de l'enfer vacillent.",
            "choice1_failure_text": "Votre plaidoirie manque de conviction. Le jury rend son verdict : Coupable."
        },
        "proces_asmodeus_fin_succes": {
            "description": "Vous avez gagné. L'humanité est acquittée. Asmodéus, furieux mais fair-play, vous renvoie avec une récompense divine."
        },
        "proces_asmodeus_fin_echec": {
            "description": "L'humanité est condamnée. Toutes les âmes appartiennent désormais à Asmodéus. Y compris la vôtre."
        },
        "trone_vide_debut": {
            "description": "Le Trône du Créateur est vide. L'univers, sans guide, commence à se désagréger. Il faut un nouveau dirigeant.",
            "choice1_text": "Monter au Royaume Céleste",
            "choice1_success_text": "Vous traversez le plan astral pour atteindre la Cité d'Argent."
        },
        "trone_vide_epreuves": {
            "description": "Pour atteindre le trône, vous devez passer les épreuves des quatre Archanges restants.",
            "choice1_text": "Passer l'Épreuve de la Force de Gabriel (Force 120+)",
            "choice1_success_text": "Vous réussissez. 'Ta force est digne', dit Gabriel.",
            "choice2_text": "Passer l'Épreuve de la Sagesse de Raphaël (Intelligence 120+)",
            "choice2_success_text": "Vous réussissez. 'Ton esprit est digne', dit Raphaël."
        },
        "trone_vide_epreuves2": {
            "description": "Vous avez passé la première épreuve. Laquelle maintenant ?",
            "choice1_text": "Passer l'Épreuve de la Vitesse de Michel (Agilité 120+)",
            "choice1_success_text": "Vous réussissez. 'Ta célérité est digne', dit Michel.",
            "choice2_text": "Passer l'Épreuve de l'Endurance d'Uriel (Vie 300+)",
            "choice2_success_text": "Vous réussissez. 'Ta vitalité est digne', dit Uriel."
        },
        "trone_vide_trone": {
            "description": "Vous avez passé les épreuves. Le Trône est devant vous. Il vous appartient.",
            "choice1_text": "Monter sur le Trône et devenir le nouveau Créateur",
            "choice1_success_text": "Vous vous asseyez. L'univers entier s'offre à votre conscience. Vous n'êtes plus un mortel.",
            "choice2_text": "Refuser le pouvoir et laisser l'univers à son sort",
            "choice2_success_text": "Ce fardeau est trop grand. Vous partez."
        },
        "trone_vide_fin_succes": {
            "description": "Vous êtes le nouveau Dieu. Votre première décision est de vous récompenser pour vos efforts passés."
        },
        "trone_vide_fin_echec": {
            "description": "Vous avez refusé le pouvoir, et le cosmos s'effondre dans le chaos."
        },
        "commencement_fin_debut": {
            "description": "Ce n'est pas un monstre. Ce n'est pas un dieu. C'est le Vide, le Néant qui existait avant la création, venu réclamer son dû. Il consume la réalité.",
            "choice1_text": "Fuir. C'est la seule option.",
            "choice1_success_text": "La fuite ne sera pas simple. Vous devez atteindre un sanctuaire de poche avant que tout ne disparaisse."
        },
        "commencement_fin_course": {
            "description": "Le sol derrière vous se désintègre. Des souvenirs de choses qui n'ont jamais existé vous assaillent l'esprit.",
            "choice1_text": "Sprinter à travers la réalité qui s'efface (Agilité 110+)",
            "choice1_success_text": "Vous courez plus vite que la fin du monde.",
            "choice1_failure_text": "Vous trébuchez sur un paradoxe. Le néant vous lèche les talons."
        },
        "commencement_fin_porte": {
            "description": "Vous voyez la porte du sanctuaire, mais elle est instable. Vous devez la maintenir ouverte assez longtemps pour passer.",
            "choice1_text": "Maintenir la porte (Force 110+ & Défense 60+)",
            "choice1_success_text": "Vous utilisez toutes vos forces pour maintenir la porte ouverte et vous glissez à travers juste avant qu'elle ne se brise.",
            "choice1_failure_text": "La pression du néant est trop forte. La porte se brise sur vous."
        },
        "commencement_fin_succes": {
            "description": "Vous êtes en sécurité dans le sanctuaire, un petit univers de poche. Vous êtes le dernier survivant de votre réalité. Mais vous êtes en vie."
        },
        "commencement_fin_echec": {
            "description": "Le Vide vous a rattrapé. Vous n'existez plus. Vous n'avez jamais existé."
        }
    },
},
    "affixes": {
        "arme": {
            "sangsue": "Sangsue",
            "feroce": "Féroce",
            "ethere": "Éthéré",
            "perforant": "Perforant",
            "de_commotion": "de Commotion",
            "du_conquerant": "du Conquérant"
        },
        "tete": {
            "du_sage": "du Sage",
            "de_laigle": "de l'Aigle",
            "du_penseur": "du Penseur",
            "de_clairvoyance": "de Clairvoyance",
            "dimpassibilite": "d'Impassibilité",
            "de_concentration": "de Concentration"
        },
        "torse": {
            "du_rempart": "du Rempart",
            "du_colosse": "du Colosse",
            "de_vitalite": "de Vitalité",
            "depines": "d'Épines",
            "du_survivant": "du Survivant",
            "beni": "Béni"
        },
        "jambes": {
            "dacier": "d'Acier",
            "de_vitesse": "de Vitesse",
            "du_rempart": "du Rempart",
            "dancrage": "d'Ancrage",
            "du_sprinteur": "du Sprinteur",
            "robuste": "Robuste"
        },
        "pieds": {
            "de_celerite": "de Célérité",
            "plaquees": "Plaquées",
            "du_rempart": "du Rempart",
            "legeres": "Légères",
            "dexplorateur": "d'Explorateur",
            "inebranlables": "Inébranlables"
        },
        "mains": {
            "de_frappe": "de Frappe",
            "dadresse": "d'Adresse",
            "du_rempart": "du Rempart",
            "du_pillard": "du Pillard",
            "precis": "Précis",
            "poignes_de_fer": "Poignes de fer"
        },
        "accessoire": {
            "de_fortune": "de Fortune",
            "de_puissance": "de Puissance",
            "dharmonie": "d'Harmonie",
            "du_fermier": "du Fermier",
            "du_phenix": "du Phénix",
            "de_lerudit": "de l'Érudit",
            "du_gardien": "du Gardien",
            "mortel": "Mortel"
        }
    },
    "dungeon": {
        "modifiers": {
            "horde_enragee": {
                "name": "Horde enragée",
                "description": "Les ennemis ont +25% de Force."
            },
            "carapace_dense": {
                "name": "Carapace dense",
                "description": "Les ennemis ont +20% de Défense."
            },
            "vitalite_anormale": {
                "name": "Vitalité anormale",
                "description": "Les ennemis ont +30% de Vie."
            },
            "saignement_maudit": {
                "name": "Saignement maudit",
                "description": "Les ennemis ont 20% de chance de saignement."
            },
            "aura_vampirique": {
                "name": "Aura vampirique",
                "description": "Les ennemis ont 5% de vol de vie."
            }
        },
        "events": {
            "tresor_simple": {
                "name": "Trésor simple",
                "description": "Vous trouvez un coffre en bois non verrouillé. À l'intérieur, une petite récompense vous attend !"
            },
            "fontaine_de_vie": {
                "name": "Fontaine de Vie",
                "description": "Une fontaine d'eau claire et lumineuse. En boire pourrait vous revigorer."
            },
            "piege_a_flechettes": {
                "name": "Piège à fléchettes",
                "description": "Vous marchez sur une dalle instable ! Des fléchettes sortent des murs."
            },
            "coffre_verrouille": {
                "name": "Coffre verrouillé",
                "description": "Un coffre solide et bien verrouillé se trouve au centre de la pièce.",
                "choice1_text": "Le crocheter (Agilité)",
                "choice2_text": "Le forcer (Force)",
                "success_text": "Le coffre cède ! Vous trouvez un butin bien plus conséquent.",
                "failure_text": "Votre tentative échoue. Le mécanisme du coffre se bloque définitivement."
            },
            "fontaine_de_mana": {
                "name": "Fontaine de Mana",
                "description": "Une source d'énergie pure et bleue ondoie doucement. Elle semble pouvoir restaurer votre mana."
            },
            "autel_etrange": {
                "name": "Autel étrange",
                "description": "Un autel de pierre couvert de runes vous propose un pacte : un sacrifice contre un pouvoir temporaire.",
                "choice1_text": "Sacrifier 15% de vos PV max",
                "choice1_success_text": "L'autel accepte votre sacrifice et vous octroie une bénédiction de puissance !",
                "choice2_text": "Ignorer l'autel",
                "choice2_success_text": "Vous ignorez l'autel et poursuivez votre chemin."
            },
            "aventurier_mourant": {
                "name": "Aventurier mourant",
                "description": "Vous trouvez un aventurier gravement blessé. Il vous tend une potion. 'Prenez... ne la gaspillez pas...'"
            },
            "autel_de_sacrifice_intelligent": {
                "name": "Autel de Sacrifice Intelligent",
                "description": "Un autel ancien vous propose un choix : sacrifier une partie de votre vitalité pour restaurer votre esprit.",
                "choice1_text": "Sacrifier 10% de vos PV pour 100 Mana",
                "choice2_text": "Ignorer l'autel",
                "success_text": "L'autel accepte votre sacrifice. Vous sentez votre énergie magique revenir."
            },
            "carte_du_donjon": {
                "name": "Une carte oubliée",
                "description": "Sur le corps d'un aventurier malchanceux, vous trouvez une carte détaillée. Elle révèle la composition complète des 3 prochains étages !"
            },
            "embuscade": {
                "name": "Embuscade !",
                "description": "C'était un piège ! Des monstres surgissent de l'ombre !"
            }
        },
        "lore_messages": [
            "D'anciennes runes brillent d'une faible lueur sur les murs avant de s'éteindre.",
            "Une fissure dans le plafond laisse filtrer une lumière blafarde venue d'on ne sait où.",
            "Le sol est couvert d'une fine couche de poussière qui semble n'avoir pas été dérangée depuis des siècles.",
            "Des chaînes rouillées pendent du plafond, se balançant doucement.",
            "Les ombres dans cette pièce semblent danser et se tordre quand vous ne les regardez pas directement.",
            "Une étrange fresque murale dépeint une bataille oubliée entre des créatures célestes et démoniaques.",
            "Le sol est anormalement lisse et froid sous vos pieds, comme du verre poli.",
            "Des cristaux ternes sont incrustés dans les parois, absorbant la lumière de votre torche.",
            "Un symbole arcanique complexe est gravé au centre de la pièce, son pouvoir dissipé depuis longtemps.",
            "Des statues de guerriers inconnus montent la garde, leurs visages érodés par le temps.",
            "Le silence oppressant n'est brisé que par le goutte-à-goutte de l'eau dans un coin sombre.",
            "Un écho lointain de chaînes qui se traînent vous glace le sang pendant un instant.",
            "Vous entendez un murmure incompréhensible qui s'éteint juste au moment où vous tendez l'oreille.",
            "Le vent s'engouffre dans un conduit invisible, créant une plainte lugubre.",
            "Un craquement sonore retentit au-dessus de vous, mais rien ne tombe.",
            "Le seul son est celui de votre propre respiration, étrangement forte dans ce silence.",
            "Une odeur de terre humide et de décomposition flotte lourdement dans l'air.",
            "Un courant d'air glacial et soudain vous parcourt l'échine.",
            "L'air est chargé d'une énergie magique stagnante, comme l'électricité avant un orage.",
            "Une bouffée de chaleur vous surprend, venant d'une fissure dans le sol.",
            "L'air est si sec et vicié qu'il irrite votre gorge.",
            "Le squelette d'un aventurier malchanceux gît dans un coin, une dague encore serrée dans sa main osseuse.",
            "Un sac à dos déchiré a été abandonné ici, son contenu pillé depuis longtemps.",
            "Des marques de griffes profondes zèbrent les murs de pierre, témoignant d'un combat féroce.",
            "Un feu de camp éteint depuis des lustres se trouve au centre de la salle.",
            "Vous marchez sur une flèche brisée. Quelqu'un s'est battu ici.",
            "Le message 'Fuyez !' est maladroitement gravé sur le sol avec ce qui semble être du sang séché.",
            "Une unique pièce d'or, étrangement brillante, est posée au sol. Vous n'osez pas y toucher.",
            "Une petite fleur phosphorescente a réussi à pousser entre deux dalles, créant une minuscule oasis de lumière.",
            "Cette salle semble étrangement plus propre et plus sûre que les précédentes.",
            "Une petite source d'eau claire s'écoule d'un mur. Elle n'a pas l'air magique, juste rafraîchissante.",
            "La structure de cette pièce est remarquablement intacte, comme si elle était protégée."
        ]
    },
    "succes": {
        "categories": {
            "progression": "Progression",
            "classes": "Classes",
            "combat": "Combat",
            "artisanat": "Artisanat",
            "economie": "Économie",
            "defis": "Défis",
            "constellation": "Constellation"
        },
        "debut_aventure": {
            "name": "Le Début de l'Aventure",
            "description": "Terminer des expéditions avec succès.",
            "tier1_name": "Premiers Pas",
            "tier2_name": "Aventurier Novice",
            "tier3_name": "Explorateur chevronné",
            "tier4_name": "Maître du Voyage"
        },
        "breche_instable": {
            "name": "Explorateur de la Brèche",
            "description": "Atteindre des étages élevés dans la Brèche Instable.",
            "tier1_name": "Plongeon",
            "tier2_name": "Spéléologue",
            "tier3_name": "Maître des Profondeurs",
            "tier4_name": "Légende du Néant"
        },
        "maitre_guerrier": {
            "name": "Maîtrise du Guerrier",
            "description": "Atteindre des paliers de niveau élevés avec la classe Guerrier.",
            "tier1_name": "Vétéran Guerrier",
            "tier2_name": "Légende du Guerrier",
            "tier3_name": "Dieu de la Guerre"
        },
        "maitre_archer": {
            "name": "Maîtrise de l'Archer",
            "description": "Atteindre des paliers de niveau élevés avec la classe Archer.",
            "tier1_name": "Vétéran Archer",
            "tier2_name": "Légende de l'Archer",
            "tier3_name": "Œil Céleste"
        },
        "maitre_mage": {
            "name": "Maîtrise du Mage",
            "description": "Atteindre des paliers de niveau élevés avec la classe Mage.",
            "tier1_name": "Vétéran Mage",
            "tier2_name": "Légende du Mage",
            "tier3_name": "Archonte Arcanique"
        },
        "exterminateur": {
            "name": "Exterminateur",
            "description": "Tuer un grand nombre d'ennemis.",
            "tier1_name": "Exterminateur I",
            "tier2_name": "Exterminateur II",
            "tier3_name": "Exterminateur III",
            "tier4_name": "Exterminateur IV"
        },
        "tueur_de_boss": {
            "name": "Tueur de Géants",
            "description": "Vaincre des boss.",
            "tier1_name": "Tueur de Géants I",
            "tier2_name": "Tueur de Géants II",
            "tier3_name": "Tueur de Géants III",
            "tier4_name": "Tueur de Géants IV"
        },
        "maitre_artisan": {
            "name": "Maître Artisan",
            "description": "Fabriquer des objets à la forge.",
            "tier1_name": "Artisan I",
            "tier2_name": "Artisan II",
            "tier3_name": "Artisan III"
        },
        "enchanteur_neophyte": {
            "name": "Enchanteur Néophyte",
            "description": "Enchanter des objets.",
            "tier1_name": "Enchanteur I",
            "tier2_name": "Enchanteur II",
            "tier3_name": "Enchanteur III"
        },
        "roi_du_fragment": {
            "name": "Roi du Fragment",
            "description": "Accumuler des fragments.",
            "tier1_name": "Roi du Fragment I",
            "tier2_name": "Roi du Fragment II",
            "tier3_name": "Roi du Fragment III"
        },
        "maitre_recycleur": {
            "name": "Maître Recycleur",
            "description": "Recycler des objets pour en extraire des fragments.",
            "tier1_name": "Recycleur I",
            "tier2_name": "Recycleur II",
            "tier3_name": "Recycleur III"
        },
        "mort_et_re_mort": {
            "name": "La Mort vous va si bien",
            "description": "Mourir au combat.",
            "tier1_name": "Premiers Pas... Trébuchants",
            "tier2_name": "Habitué du Cimetière",
            "tier3_name": "Client Fidèle de la Faucheuse",
            "tier4_name": "Immortel... ou presque"
        },
        "au_bord_du_gouffre": {
            "name": "Au Bord du Gouffre",
            "description": "Gagner un combat avec moins de 10% de vos PV restants.",
            "tier1_name": "Au Bord du Gouffre"
        },
        "collectionneur_ensemble": {
            "name": "Collectionneur d'Ensemble",
            "description": "Équiper un ensemble d'objets complet.",
            "tier1_name": "Ensemble Épique",
            "tier2_name": "Ensemble Légendaire",
            "tier3_name": "Ensemble Mythique"
        },
        "ascension_niveau": {
            "name": "Cycle Éternel",
            "description": "Atteindre de nouveaux niveaux d'Ascension.",
            "tier1_name": "Transcendance",
            "tier2_name": "Pèlerin des Étoiles",
            "tier3_name": "Marcheur de Plans",
            "tier4_name": "Entité Cosmique"
        },
        "constellation_destin": {
            "name": "Maître du Destin",
            "description": "Débloquer tous les talents de l'arbre de Constellation du Destin.",
            "tier1_name": "Maître du Destin"
        },
        "constellation_guerrier": {
            "name": "Avatar de la Guerre",
            "description": "Débloquer tous les talents de l'arbre de Constellation du Guerrier.",
            "tier1_name": "Avatar de la Guerre"
        },
        "constellation_archer": {
            "name": "Œil Céleste",
            "description": "Débloquer tous les talents de l'arbre de Constellation de l'Archer.",
            "tier1_name": "Œil Céleste"
        },
        "constellation_mage": {
            "name": "Archonte Arcanique",
            "description": "Débloquer tous les talents de l'arbre de Constellation du Mage.",
            "tier1_name": "Archonte Arcanique"
        },
        "maitre_des_etoiles": {
            "name": "Maître des Étoiles",
            "description": "Débloquer TOUS les talents de TOUTES les constellations.",
            "tier1_name": "Maître des Étoiles"
        }
    },
    "constellations": {
        "destiny": {
            "name": "Constellation du Destin",
            "nodes": {
                "destiny_start": {
                    "name": "Étincelle du Destin",
                    "description": "Le point de départ de toutes vos futures Ascensions. Chaque point dépensé ici profite à tous vos personnages."
                },
                "destiny_all_stats_1": {
                    "name": "Éveil du Potentiel",
                    "description": "Augmente légèrement tous vos attributs de base."
                },
                "destiny_hp_mana_1": {
                    "name": "Flux Vital",
                    "description": "Augmente vos points de vie et votre mana maximum de base."
                },
                "destiny_resource_1": {
                    "name": "Corne d'Abondance",
                    "description": "Augmente tous les gains de ressources de base (bois, métal, tissu)."
                },
                "destiny_fragments_1": {
                    "name": "Alchimie du Pauvre",
                    "description": "Augmente vos gains de Fragments de toutes sources."
                },
                "destiny_loot_1": {
                    "name": "Bribes de Fortune",
                    "description": "Augmente le bonus de découverte d'objets."
                },
                "destiny_event_luck_1": {
                    "name": "Destrier Ailé",
                    "description": "Votre bonne étoile vous guide, augmentant vos chances de succès dans les événements à choix."
                },
                "destiny_legendary_knowledge": {
                    "name": "Connaissances Légendaires",
                    "description": "Permet de trouver, fabriquer et équiper des objets de rareté Légendaire."
                },
                "destiny_merchant_1": {
                    "name": "Chasseur de Bonnes Affaires",
                    "description": "Améliore les prix de vente chez les marchands."
                },
                "destiny_mythic_knowledge": {
                    "name": "Connaissances Mythiques",
                    "description": "Permet de trouver, fabriquer et équiper des objets de rareté Mythique."
                },
                "destiny_resource_2": {
                    "name": "Abondance de la Nature",
                    "description": "Augmente encore les gains de ressources de base."
                },
                "destiny_free_craft_1": {
                    "name": "Mains Habiles",
                    "description": "Vous avez une petite chance de ne pas consommer de ressources lors de la fabrication d'un objet."
                },
                "destiny_merchant_2": {
                    "name": "Guilde des Marchands",
                    "description": "Votre réputation vous précède, améliorant encore les prix de vente."
                },
                "destiny_epic_knowledge": {
                    "name": "Connaissances Épiques",
                    "description": "Permet de trouver, fabriquer et équiper des objets de rareté Épique."
                },
                "destiny_hp_1": {
                    "name": "Endurance Accrue",
                    "description": "Augmente vos points de vie maximum de base."
                },
                "destiny_def_1": {
                    "name": "Peau de Pierre",
                    "description": "Ajoute de la Défense de base."
                },
                "destiny_resistance_1": {
                    "name": "Volonté de Fer",
                    "description": "Augmente votre résistance à tous les types de dégâts."
                },
                "destiny_regen_1": {
                    "name": "Régénération Vitale",
                    "description": "Augmente votre régénération de PV hors-combat."
                },
                "destiny_indomitable": {
                    "name": "Indomptable",
                    "description": "Une fois par combat, si vous subissez un coup qui devrait vous tuer, vous survivez avec 1 PV."
                },
                "destiny_xp_1": {
                    "name": "Sagesse Précipitée",
                    "description": "Augmente tous les gains d'XP."
                },
                "destiny_codex_1": {
                    "name": "Érudit de Combat",
                    "description": "Accélère la progression de votre Codex en augmentant le nombre de 'victimes' comptabilisées."
                },
                "destiny_stat_points_1": {
                    "name": "Potentiel Libéré",
                    "description": "Octroie des points de statistiques supplémentaires tous les 25 niveaux."
                },
                "destiny_crit_1": {
                    "name": "Précision chirurgicale",
                    "description": "Augmente votre chance de coup critique."
                },
                "destiny_crit_damage_1": {
                    "name": "Frappes Dévastatrices",
                    "description": "Augmente les dégâts de vos coups critiques."
                },
                "destiny_ascension_mastery": {
                    "name": "Maîtrise de l'Ascension",
                    "description": "Augmente le nombre de Points de Constellation gagnés lors de chaque Ascension."
                },
                "destiny_true_potential": {
                    "name": "Véritable Potentiel",
                    "description": "Débloque le véritable potentiel de votre lignée, octroyant un bonus massif à tous les attributs."
                },
                "destiny_xp_2": {
                    "name": "Savoir Ancestral",
                    "description": "Augmente encore tous les gains d'XP."
                },
                "destiny_patrol_1": {
                    "name": "Œil du Veilleur",
                    "description": "Vos patrouilles sont plus efficaces, rapportant plus de récompenses."
                },
                "destiny_crit_damage_2": {
                    "name": "Coup de Maître",
                    "description": "Augmente encore les dégâts de vos coups critiques."
                },
                "destiny_ascension_mastery_2": {
                    "name": "Héritage Céleste",
                    "description": "Augmente encore le nombre de Points de Constellation gagnés lors de chaque Ascension."
                }
            }
        },
        "guerrier": {
            "name": "Constellation du Guerrier",
            "nodes": {
                "guerrier_start": {
                    "name": "Pommeau du Héros",
                    "description": "Le début de la voie du guerrier."
                },
                "guerrier_force_1": {
                    "name": "Poigne de Fer",
                    "description": "Augmente votre Force de base."
                },
                "guerrier_vie_1": {
                    "name": "Constitution de Fer",
                    "description": "Augmente votre vitalité maximale."
                },
                "guerrier_force_vie_1": {
                    "name": "Fondations du Combattant",
                    "description": "Augmente la Force et la Vie."
                },
                "guerrier_garde_base": {
                    "name": "Posture de Combat",
                    "description": "Le point de départ des techniques défensives et utilitaires."
                },
                "guerrier_resistance_1": {
                    "name": "Peau Endurcie",
                    "description": "Augmente votre résistance à tous les types de dégâts."
                },
                "guerrier_cri_1": {
                    "name": "Cri d'Intimidation",
                    "description": "Vos coups ont une chance de briser l'armure de l'ennemi."
                },
                "guerrier_def_1": {
                    "name": "Maîtrise du Bouclier",
                    "description": "Améliore votre Défense de base."
                },
                "guerrier_regen_1": {
                    "name": "Second Souffle",
                    "description": "Améliore votre régénération de PV hors combat."
                },
                "guerrier_degats_1": {
                    "name": "Fureur du Combat",
                    "description": "Augmente tous vos dégâts infligés."
                },
                "guerrier_crit_chance_1": {
                    "name": "Point Faible",
                    "description": "Augmente vos chances de coup critique."
                },
                "guerrier_crit_damage_1": {
                    "name": "Frappe Brutale",
                    "description": "Augmente les dégâts de vos coups critiques."
                },
                "guerrier_lifesteal_1": {
                    "name": "Soif de Sang",
                    "description": "Vous soigne pour un pourcentage des dégâts que vous infligez."
                },
                "guerrier_berserker_keystone": {
                    "name": "Au Seuil de la Mort",
                    "description": "Votre Force est augmentée de 50% lorsque vos PV sont inférieurs à 30%."
                },
                "guerrier_stun_chance_1": {
                    "name": "Impact Lourd",
                    "description": "Augmente vos chances d'étourdir les ennemis."
                },
                "guerrier_def_vie_1": {
                    "name": "Bastion Vivant",
                    "description": "Augmente la Défense et la Vie."
                },
                "guerrier_thorns_1": {
                    "name": "Armure d'Épines",
                    "description": "Inflige des dégâts fixes aux ennemis qui vous attaquent."
                },
                "guerrier_juggernaut_keystone": {
                    "name": "Inébranlable",
                    "description": "Vous devenez insensible aux étourdissements."
                },
                "guerrier_force_2": {
                    "name": "Puissance Brute",
                    "description": "Une augmentation significative de votre Force."
                },
                "guerrier_force_percent_1": {
                    "name": "Force Colossale",
                    "description": "Augmente votre Force totale en pourcentage."
                },
                "guerrier_ultime": {
                    "name": "Avatar de Guerre",
                    "description": "Votre maîtrise du combat atteint son paroxysme, augmentant tous vos attributs."
                }
            }
        },
        "archer": {
            "name": "Constellation de l'Archer",
            "nodes": {
                "archer_start": {
                    "name": "Poignée de l'Archer",
                    "description": "Le point de départ de la voie de l'archer."
                },
                "archer_agilite_1": {
                    "name": "Corde Tissée",
                    "description": "Augmente votre Agilité de base."
                },
                "archer_crit_chance_1": {
                    "name": "Œil Vif",
                    "description": "Augmente vos chances de coup critique."
                },
                "archer_skill_damage_1": {
                    "name": "Tir Instinctif",
                    "description": "Augmente les dégâts de base de toutes vos compétences d'archer."
                },
                "archer_precision_1": {
                    "name": "Visée Calibrée",
                    "description": "Augmente encore vos chances de coup critique."
                },
                "archer_armor_shred_1": {
                    "name": "Flèche Brise-Garde",
                    "description": "Vos tirs ignorent une plus grande partie de l'armure ennemie."
                },
                "archer_crit_damage_1": {
                    "name": "Point Vital",
                    "description": "Augmente massivement les dégâts de vos coups critiques."
                },
                "archer_sniper_keystone": {
                    "name": "Œil de l'Aigle",
                    "description": "Vos coups critiques ont 30% de chance d'exécuter instantanément les ennemis non-boss ayant moins de 20% de leurs PV."
                },
                "archer_vitesse_1": {
                    "name": "Pied Léger",
                    "description": "Augmente encore votre Agilité."
                },
                "archer_esquive_1": {
                    "name": "Insaisissable",
                    "description": "Augmente vos chances d'esquiver les attaques ennemies."
                },
                "archer_saignement_1": {
                    "name": "Flèches Barbelées",
                    "description": "Augmente vos chances d'infliger un saignement à l'impact."
                },
                "archer_ranger_keystone": {
                    "name": "Tactiques de Guérilla",
                    "description": "Après avoir esquivé une attaque, votre Agilité est augmentée de 50% pendant 2 tours."
                },
                "archer_ultime": {
                    "name": "Flèche de l'Infini",
                    "description": "Votre maîtrise de l'arc est absolue, augmentant tous vos attributs."
                }
            }
        },
        "mage": {
            "name": "Constellation du Mage",
            "nodes": {
                "mage_start": {
                    "name": "Couronne du Chapeau",
                    "description": "Le début de la voie du mage."
                },
                "mage_intelligence_1": {
                    "name": "Tissage Subtil",
                    "description": "Augmente votre Intelligence de base."
                },
                "mage_mana_1": {
                    "name": "Réservoir Profond",
                    "description": "Augmente votre mana maximum en pourcentage."
                },
                "mage_siphon_1": {
                    "name": "Siphon Mineur",
                    "description": "Vous drainez un peu de vie et de mana avec vos sorts."
                },
                "mage_spell_damage_1": {
                    "name": "Focalisation Destructrice",
                    "description": "Augmente les dégâts de tous vos sorts."
                },
                "mage_spell_crit_1": {
                    "name": "Précision Arcanique",
                    "description": "Donne à vos sorts une chance d'infliger un coup critique."
                },
                "mage_freecast_1": {
                    "name": "Écho du Nexus",
                    "description": "Augmente vos chances de lancer un sort gratuitement."
                },
                "mage_archon_keystone": {
                    "name": "Surcharge Arcanique",
                    "description": "Vos sorts coûtent 15% de mana en plus, mais infligent 25% de dégâts supplémentaires."
                },
                "mage_efficiency_1": {
                    "name": "Canalisation Efficace",
                    "description": "Réduit le coût en mana de tous vos sorts."
                },
                "mage_mana_shield_1": {
                    "name": "Bouclier de Mana",
                    "description": "Un passif activable. Quand il est actif, 20% des dégâts subis sont absorbés par votre mana avant d'affecter vos PV."
                },
                "mage_mana_regen_1": {
                    "name": "Clarté d'Esprit",
                    "description": "Augmente votre régénération de mana hors combat."
                },
                "mage_battlemage_keystone": {
                    "name": "Siphon d'Âme",
                    "description": "Votre Vol de Vie des sorts vous rend également une quantité de Mana égale à 50% des PV drainés."
                },
                "mage_archon_edge": {
                    "name": "Finition d'Archonte",
                    "description": "Augmente légèrement les dégâts de vos coups critiques magiques."
                },
                "mage_battlemage_edge": {
                    "name": "Garde du Mage de Bataille",
                    "description": "Augmente légèrement votre résistance aux dégâts."
                },
                "mage_mastery_1": {
                    "name": "Maîtrise Arcanique",
                    "description": "Une compréhension profonde des arcanes qui augmente drastiquement votre Intelligence."
                },
                "mage_ultime": {
                    "name": "Tisseur de Destin",
                    "description": "Vous ne faites qu'un avec la magie. Augmente massivement votre Intelligence."
                }
            }
        }
    },
    "traits": {
        "families": {
            "arcanes_majeurs": {
                "name": "Famille des Arcanes Majeurs",
                "description": "En réunissant les sept arcanes majeurs, vous maîtrisez votre propre destin et transcendez vos limites."
            },
            "titans_primordiaux": {
                "name": "Famille des Titans Primordiaux",
                "description": "La puissance des créatures originelles coule en vous, vous rendant incroyablement résistant."
            },
            "betes_celestes": {
                "name": "Famille des Bêtes Célestes",
                "description": "L'agilité et la précision des créatures du firmament guident vos coups."
            },
            "astres_sombres": {
                "name": "Famille des Astres Sombres",
                "description": "Vous puisez votre pouvoir dans les recoins sombres du cosmos, transformant la douleur en puissance."
            },
            "quatre_vents": {
                "name": "Famille des Quatre Vents",
                "description": "Insaisissable comme le vent, vous esquivez les coups qui devraient vous atteindre."
            },
            "armes_maudites": {
                "name": "Famille des Armes Maudites",
                "description": "La soif de sang de ces armes maudites augmente votre propre férocité au combat."
            },
            "vertus_royales": {
                "name": "Famille des Vertus Royales",
                "description": "Les qualités d'un bon dirigeant vous permettent d'amasser plus de richesses."
            },
            "parchemins_oublies": {
                "name": "Famille des Parchemins Oubliés",
                "description": "La lecture de ces anciens parchemins a élargi votre réservoir d'énergie magique."
            },
            "forge_divine": {
                "name": "Famille de la Forge Divine",
                "description": "Les secrets du forgeron des dieux vous permettent de fabriquer des équipements avec une efficacité redoutable."
            },
            "cour_celeste": {
                "name": "Famille de la Cour Céleste",
                "description": "Les figures divines de la Cour Céleste vous accordent une puissance équilibrée et inégalée."
            },
            "sablier_du_temps": {
                "name": "Famille du Sablier du Temps",
                "description": "La maîtrise du temps vous offre un avantage tactique imprévisible au début de chaque bataille."
            },
            "pantheon_dechu": {
                "name": "Famille du Panthéon Déchu",
                "description": "La puissance des dieux morts coule en vous, vous rendant mortellement dangereux, mais aussi vulnérable."
            }
        },
        "cards": {
            "t1_colosse": {
                "name": "Trait : Peau de Colosse",
                "description": "Votre peau est un roc. Augmente la Vie, mais réduit l'Agilité.",
                "card_name": "Le Colosse"
            },
            "t1_loup_stellaire": {
                "name": "Trait : Instinct du Loup",
                "description": "Augmente la chance de critique, mais réduit votre endurance.",
                "card_name": "Le Loup Stellaire"
            },
            "t1_epee_brisee": {
                "name": "Trait : Lame Brisée",
                "description": "Vous infligez plus de dégâts, mais votre corps est fragile.",
                "card_name": "L'Épée Brisée"
            },
            "t1_chanceux": {
                "name": "Trait : Roue de la Fortune",
                "description": "La fortune vous sourit, mais la magie vous échappe un peu.",
                "card_name": "La Roue de la Fortune"
            },
            "t1_la_force": {
                "name": "Trait : La Force",
                "description": "Votre Vol de Vie est augmenté, au détriment de votre défense.",
                "card_name": "La Force"
            },
            "t1_zephyr": {
                "name": "Trait : Souffle de Zéphyr",
                "description": "Une brise légère vous aide à éviter les coups.",
                "card_name": "Zéphyr le Vent d'Ouest"
            },
            "t1_couronne_justice": {
                "name": "Trait : Couronne de Justice",
                "description": "Votre esprit juste résiste aux influences néfastes.",
                "card_name": "Couronne de la Justice"
            },
            "t1_parchemin_givre": {
                "name": "Trait : Parchemin de Givre",
                "description": "Un savoir glacial qui augmente votre réserve de mana.",
                "card_name": "Parchemin de Givre"
            },
            "t1_juge": {
                "name": "Trait : Regard du Juge",
                "description": "Votre droiture vous protège des malus, mais ralentit votre apprentissage.",
                "card_name": "Le Juge"
            },
            "t1_grain_passe": {
                "name": "Trait : Grain du Passé",
                "description": "Vous apprenez plus vite des leçons du passé, mais amassez moins de richesses.",
                "card_name": "Grain du Passé"
            },
            "t2_titan_sismique": {
                "name": "Trait : Force Sismique",
                "description": "Votre force peut étourdir, mais vous rend moins chanceux.",
                "card_name": "Le Titan Sismique"
            },
            "t2_leviathan": {
                "name": "Trait : Peau du Léviathan",
                "description": "Votre peau épaisse vous protège et se régénère lentement.",
                "card_name": "Le Léviathan"
            },
            "t2_gardien_ancien": {
                "name": "Trait : Carapace du Gardien",
                "description": "Votre armure d'épines renvoie les dégâts à vos attaquants.",
                "card_name": "Le Gardien Ancien"
            },
            "t2_chimere_nebuleuse": {
                "name": "Trait : Sang de Chimère",
                "description": "Mélange de vitesse et de ruse qui affaiblit votre régénération.",
                "card_name": "La Chimère Nébuleuse"
            },
            "t2_griffon_solaire": {
                "name": "Trait : Vitesse du Griffon",
                "description": "Vous êtes rapide comme le vent, augmentant votre agilité.",
                "card_name": "Le Griffon Solaire"
            },
            "t2_faucon_comete": {
                "name": "Trait : Œil du Faucon",
                "description": "Votre regard perçant augmente les dégâts de vos coups critiques.",
                "card_name": "Le Faucon Comète"
            },
            "t2_empereur": {
                "name": "Trait : L'Empereur",
                "description": "Votre autorité naturelle renforce votre corps et votre esprit.",
                "card_name": "L'Empereur"
            },
            "t2_grande_pretresse": {
                "name": "Trait : La Grande Prêtresse",
                "description": "Votre sagesse augmente votre mana et votre résistance magique.",
                "card_name": "La Grande Prêtresse"
            },
            "t2_le_magicien": {
                "name": "Trait : Le Magicien",
                "description": "Votre affinité avec la magie réduit le coût de vos sorts.",
                "card_name": "Le Magicien"
            },
            "t2_lune_sang": {
                "name": "Trait : Pacte de la Lune de Sang",
                "description": "Vos sorts se nourrissent de la vitalité de vos ennemis.",
                "card_name": "La Lune de Sang"
            },
            "t2_soleil_noir": {
                "name": "Trait : Éclat du Soleil Noir",
                "description": "Puisez dans une magie interdite qui consume votre corps.",
                "card_name": "Le Soleil Noir"
            },
            "t2_boreas": {
                "name": "Trait : Givre de Boreas",
                "description": "Le vent glacial du nord vous rend résistant aux malus.",
                "card_name": "Boreas le Vent du Nord"
            },
            "t2_eurus": {
                "name": "Trait : Rafale d'Eurus",
                "description": "Le vent d'est, vif et perçant, guide vos coups critiques.",
                "card_name": "Eurus le Vent d'Est"
            },
            "t2_bouclier_fele": {
                "name": "Trait : Égide Fêlée",
                "description": "Un bouclier qui renvoie les dégâts, mais offre peu de protection.",
                "card_name": "Le Bouclier Fêlé"
            },
            "t2_sceptre_noblesse": {
                "name": "Trait : Sceptre de Noblesse",
                "description": "Votre noble posture vous octroie un gain d'expérience supérieur.",
                "card_name": "Sceptre de la Noblesse"
            },
            "t2_parchemin_feu": {
                "name": "Trait : Parchemin de Feu",
                "description": "Un savoir ardent qui augmente la puissance de vos sorts.",
                "card_name": "Parchemin de Feu"
            },
            "t2_marteau_hephaistos": {
                "name": "Trait : Marteau d'Héphaïstos",
                "description": "Le marteau divin facilite l'artisanat mais n'est pas fait pour le combat.",
                "card_name": "Le Marteau d'Héphaïstos"
            },
            "t2_gardien": {
                "name": "Trait : Posture du Gardien",
                "description": "Vous vous concentrez sur la défense, au détriment de l'attaque.",
                "card_name": "Le Gardien"
            },
            "t2_flux_present": {
                "name": "Trait : Flux du Présent",
                "description": "Vous vivez dans l'instant, privilégiant la vitesse à la force brute.",
                "card_name": "Flux du Présent"
            },
            "t2_dieu_guerre": {
                "name": "Trait : Vestige du Dieu de la Guerre",
                "description": "Une puissance offensive brute qui affaiblit votre constitution.",
                "card_name": "Vestige du Dieu de la Guerre"
            },
            "t3_le_jugement": {
                "name": "Trait : Le Jugement",
                "description": "Vos coups ont une chance de purger les malus et de soigner.",
                "card_name": "Le Jugement"
            },
            "t3_le_monde": {
                "name": "Trait : Le Monde",
                "description": "Votre maîtrise du monde augmente tous vos gains.",
                "card_name": "Le Monde"
            },
            "t3_etoile_mourante": {
                "name": "Trait : Lueur de l'Étoile Mourante",
                "description": "La lueur d'une étoile mourante guide vos coups magiques.",
                "card_name": "L'Étoile Mourante"
            },
            "t3_notos": {
                "name": "Trait : Caresse de Notos",
                "description": "Le vent chaud du sud améliore l'efficacité de vos soins.",
                "card_name": "Notos le Vent du Sud"
            },
            "t3_lance_empoisonnee": {
                "name": "Trait : Pointe Empoisonnée",
                "description": "Vos coups ont une chance d'infliger un saignement durable.",
                "card_name": "La Lance Empoisonnée"
            },
            "t3_orbe_prosperite": {
                "name": "Trait : Orbe de Prospérité",
                "description": "Cet orbe attire la richesse, augmentant vos gains de fragments.",
                "card_name": "Orbe de la Prospérité"
            },
            "t3_parchemin_foudre": {
                "name": "Trait : Parchemin de Foudre",
                "description": "L'énergie de ce parchemin augmente vos critiques magiques.",
                "card_name": "Parchemin de Foudre"
            },
            "t3_enclume_ames": {
                "name": "Trait : Enclume des Âmes",
                "description": "Cette enclume mythique renforce votre armure et votre corps.",
                "card_name": "L'Enclume des Âmes"
            },
            "t3_souffle_dragon": {
                "name": "Trait : Souffle du Dragon",
                "description": "Le feu du dragon infuse votre être d'une grande résistance.",
                "card_name": "Le Souffle du Dragon"
            },
            "t3_heraut": {
                "name": "Trait : Voix du Héraut",
                "description": "Votre parole divine augmente vos dégâts, mais consomme plus d'énergie.",
                "card_name": "Le Héraut"
            },
            "t3_vision_futur": {
                "name": "Trait : Vision du Futur",
                "description": "Anticiper les coups vous aide à esquiver, mais vous prépare moins à l'impact.",
                "card_name": "Vision du Futur"
            },
            "t3_deesse_nuit": {
                "name": "Trait : Vestige de la Déesse de la Nuit",
                "description": "Vous drainez la vie de vos ennemis, mais les soins externes vous sont moins efficaces.",
                "card_name": "Vestige de la Déesse de la Nuit"
            },
            "tmax_vide_affame": {
                "name": "Trait : Étreinte du Vide",
                "description": "Vos sorts siphonnent l'énergie magique de votre cible.",
                "card_name": "Le Vide Affamé"
            },
            "tmax_imperatrice": {
                "name": "Trait : Bénédiction de l'Impératrice",
                "description": "La bienveillance de l'Impératrice Céleste renforce votre vitalité.",
                "card_name": "L'Impératrice"
            },
            "tmax_echo_eternite": {
                "name": "Trait : Écho de l'Éternité",
                "description": "Votre première compétence de chaque combat a 25% de chance de ne pas consommer votre tour.",
                "card_name": "Écho de l'Éternité"
            },
            "tmax_dieu_chaos": {
                "name": "Trait : Vestige du Dieu du Chaos",
                "description": "Une puissance brute et chaotique qui augmente vos dégâts au détriment de votre précision.",
                "card_name": "Vestige du Dieu du Chaos"
            }
        }
    },
    "fief": {
        "scierie": {
            "name": "Scierie",
            "description": "Produit du bois passivement au fil du temps."
        },
        "mine": {
            "name": "Mine de Fer",
            "description": "Extrait du métal passivement au fil du temps."
        },
        "atelier_tissage": {
            "name": "Atelier de Tissage",
            "description": "Produit du tissu passivement au fil du temps."
        },
        "tresorerie": {
            "name": "Trésorerie",
            "description": "Génère des fragments passivement. Requiert un investissement de départ conséquent."
        },
        "entrepot": {
            "name": "Entrepôt",
            "description": "Augmente votre capacité de stockage maximale pour le bois, le métal et le tissu."
        },
        "infirmerie": {
            "name": "Infirmerie",
            "description": "Soigne vos blessures plus rapidement après une défaite et permet de préparer des baumes de secours pour vos aventures."
        },
        "refectoire": { // NOUVEAU
            "name": "Réfectoire",
            "description": "Prépare des repas consistants qui augmentent votre endurance maximale et votre capacité à enchaîner les expéditions."
        }
    },
    "seasons": {
        "PRINTEMPS": { "name": "Printemps" },
        "ETE": { "name": "Été" },
        "AUTOMNE": { "name": "Automne" },
        "HIVER": { "name": "Hiver" }
    },
    "garden": {
        "alerts": {
            "seed_found": "✨ Vous avez trouvé une graine rare : {seedName} !"
        },
        "support_plant_info": "{plantName} continue de soutenir votre jardin.",
        "infestation_alert": "Des créatures émergent de la terre autour de la {plantName} !",
        "orchid_protection": "L'Orchidée Silencieuse a repoussé les créatures !",
        "harvest_success": "Récolte : +{amount} {resource} et {seeds} graine(s) !",
        "harvest_partial": "Récolte partielle : +{amount} {resource} et {seeds} graine(s).",
        "warehouse_full": "Votre entrepôt est plein !",
        "season_effects_title": "Effets de la Saison : {seasonName}",
        "favored_types": "Types favorisés (+25% vitesse de croissance)",
        "disfavored_types": "Types désavantagés (-50% vitesse de croissance)",
        "no_favored_types": "Aucun type de plante n'est favorisé cette saison.",
        "no_disfavored_types": "Aucun type de plante n'est désavantagé cette saison."
    },
    "garden_plants": {
        "HERBE_ROBUSTE": {
            "name": "Herbe Robuste",
            "description": "Une herbe simple et résistante. La base de toute alchimie végétale.",
            "hint": ""
        },
        "CRISTAL_DE_GIVRE": {
            "name": "Cristal de Givre",
            "description": "Une formation cristalline qui semble absorber la chaleur ambiante.",
            "hint": "S'obtient par transformation de l'Herbe Robuste en Hiver."
        },
        "FLEUR_DE_LAVE": {
            "name": "Fleur de Lave",
            "description": "Une fleur qui ne pousse que dans les climats les plus chauds. Ses pétales brûlent au toucher.",
            "hint": "S'obtient par transformation de l'Herbe Robuste en Été."
        },
        "GRAINE_SOLAIRE": {
            "name": "Graine Solaire",
            "description": "Une graine qui emmagasine la lumière du soleil. Elle dégage une douce chaleur.",
            "hint": "S'obtient par transformation de l'Herbe Robuste au Printemps."
        },
        "RACINE_TERREUSE": {
            "name": "Racine Terreuse",
            "description": "Une racine noueuse qui puise profondément les minéraux du sol.",
            "hint": "S'obtient par transformation de l'Herbe Robuste en Automne."
        },
        "TOURNESOL_RADIEUX": {
            "name": "Tournesol Radieux",
            "description": "Une fleur qui rayonne d'une lumière intense, fruit du feu et du soleil.",
            "hint": "Synergie d'une Graine Solaire et d'une plante de type Feu en Été."
        },
        "LYS_DE_GIVRE": {
            "name": "Lys de Givre",
            "description": "Une fleur d'une beauté glaciale, née de la rencontre du froid et de la lumière.",
            "hint": "Synergie d'un Cristal de Givre et d'une plante Solaire en Hiver."
        },
        "CHAMPIGNON_TERREUX": {
            "name": "Champignon Terreux",
            "description": "Ce champignon dense pousse sur les sols riches en minéraux. Il a absorbé l'essence pierreuse de la terre.",
            "hint": "Synergie d'une Racine Terreuse et d'une plante de type Feu en Automne."
        },
        "FLEUR_DE_ROSEE": {
            "name": "Fleur de Rosée",
            "description": "Ne s'ouvre qu'à l'aube pour capturer la rosée du matin, dont on dit qu'elle possède des propriétés curatives.",
            "hint": "Synergie d'une Graine Solaire et d'une Herbe Robuste au Printemps."
        },
        "TREFLE_DORE": {
            "name": "Trèfle Doré",
            "description": "Un trèfle à quatre feuilles dont les nervures sont d'or pur. Sa présence altère les lois de la nature, augmentant les chances de mutation des plantes voisines.",
            "hint": "Synergie d'une Graine Solaire et d'une Fleur de Rosée au Printemps."
        },
        "RACINE_EPONGE": {
            "name": "Racine-Éponge",
            "description": "Cette racine poreuse absorbe les énergies néfastes du sol, protégeant les plantes voisines des rigueurs des mauvaises saisons.",
            "hint": "Synergie d'une Racine Terreuse et d'un Champignon Terreux en Automne."
        },
        "ROSE_SANGUINE": {
            "name": "Rose Sanguine",
            "description": "Une rose d'un rouge profond qui ne pousserait que là où le sang d'une créature magique a été versé.",
            "hint": "Synergie d'une Fleur de Rosée, d'une Fleur de Lave et d'une Herbe Robuste au Printemps."
        },
        "ORCHIDEE_SILENCIEUSE": {
            "name": "Orchidée Silencieuse",
            "description": "Cette orchidée n'émet aucun parfum, mais une vibration apaisante qui perturbe les créatures agressives et les tient à l'écart du jardin.",
            "hint": "Synergie d'un Lys de Givre et d'un Trèfle Doré en Hiver."
        }
    },
    "dev": {
        "logs": {
            "stats_reset": "Statistiques réinitialisées. {totalPoints} points à dépenser.",
            "artefact_not_found": "Artefact introuvable avec l'ID: {itemId}",
            "ascension_bonus": "Bonus d'Ascension : +{bonusAmount} PC ({bonusPercent}%)",
            "invalid_garden_size": "Taille de jardin invalide détectée. Réinitialisation à 2x2.",
            "new_tier_unlocked": "Nouveau tier de plante débloqué : {tier}"
        }
    },
    "dungeon": {
        "alerts": {
            "no_key": "Vous n'avez pas de Clé de la Brèche !",
            "busy": "Vous êtes déjà occupé.",
            "debuff_faded": "Le malus \"{debuffName}\" s'est estompé.",
            "new_modifier": "Nouvel affixe : {modifierName}",
            "buff_faded": "Le buff \"{buffName}\" s'est estompé.",
            "rest_full_success": "Repos complet ! Vous récupérez {heal} PV et {mana} Mana, mais vous subissez un malus.",
            "rest_partial_success": "Repos partiel. Vous récupérez {heal} PV et {mana} Mana.",
            "elite_bonus": "Bonus d'élite ! Récompenses augmentées !",
            "xp_gain": "Vous gagnez {xp} points d'expérience.",
            "shards_gain": "Vous trouvez {shards} Éclats instables.",
            "resources_gain": "Vous récupérez : {resources}.",
            "defeat_in_breach": "Vous avez été vaincu dans la Brèche...",
            "enter_breach": "Vous entrez dans la Brèche Instable à l'étage {floor}...",
            "not_enough_hp_sacrifice": "Vous n'avez pas assez de vie pour ce sacrifice !",
            "hp_sacrificed": "Vous sacrifiez {amount} PV...",
            "temp_buff_gain": "Vous recevez un bonus de +{amount} en {stat} !",
            "event_shards_gain": "+{amount} Éclats instables",
            "event_resource_gain": "+{amount} {resourceName}",
            "event_heal_gain": "Vous récupérez {amount} PV !",
            "event_mana_gain": "Vous récupérez du mana !",
            "event_mana_gain_flat": "Vous récupérez {amount} points de mana !",
            "event_damage_loss": "Vous perdez {amount} PV !",
            "event_consumable_gain": "Vous avez trouvé : {itemName} !",
            "event_map_reveal": "La carte révèle les étages jusqu'au niveau {floor} !"
        },
        "ui": {
            "floor_choice_classic": "Étage 1 (Classique)",
            "floor_choice": "Étage {floor}",
            "start_floor_prompt": "À quel étage souhaitez-vous commencer votre tentative ?",
            "rest_prompt": "Vous trouvez une source de repos apaisante. Comment souhaitez-vous l'utiliser ?",
            "rest_choice_full": "Pleinement (-20% Dégâts / 3 étages)",
            "rest_choice_partial": "Partiellement (Aucun malus)",
            "enter_room_confirm": "Voulez-vous entrer dans cette salle ? ({roomType})",
            "floor_title": "Étage {floor}",
            "last_floor": "dernier étage",
            "floors_remaining_single": "{count} étage restant",
            "floors_remaining_plural": "{count} étages restants",
            "buff_display": "<span>{buffName} (+{value} {stat}) - ({duration} salles restantes)</span>",
            "loot_display": "Butin : <strong id=\"dungeon-shard-count\">{count}</strong> <img src=\"assets/sprites/ressources/eclats_instables.png\" class=\"icon-sprite-small\">",
            "tier_guardian": "Gardien de Palier ({bossName})",
            "exit_prompt": "Vous avez trouvé la sortie de l'étage {floor} !<br><br>Butin actuel : {shards} <img src=\"assets/sprites/ressources/eclats_instables.png\" class=\"icon-sprite-small\">.<br><br>Que voulez-vous faire ?",
            "exit_choice_continue": "Continuer (Étage suivant)",
            "exit_choice_leave": "Partir (Garder 100% du butin)",
            "flee_confirm_prompt": "Êtes-vous sûr de vouloir fuir le donjon ?<br><br>Vous ne conserverez que <strong>50%</strong> des éclats instables que vous avez amassés.",
            "map_alt": {
                "start": "Départ",
                "cleared": "Salle terminée",
                "encounter": "Rencontre",
                "player": "Joueur"
            }
        },
        "debuffs": {
            "rest_fatigue": "Fatigue du repos, -20% de dégats"
        },
        "buffs": {
            "blessing_of": "Bénédiction de {stat}"
        },
        "report": {
            "title": "Sortie de la Brèche",
            "defeat_penalty": "Vous avez été vaincu ! Vous ne conservez que 50% de vos ressources et éclats. L'XP acquise est conservée.",
            "leave_safe": "Vous quittez la Brèche sain et sauf.",
            "max_floor_session": "Étage max atteint cette session : <strong>{floor}</strong>",
            "xp_gained_label": "XP acquise :",
            "basic_resources_title": "Ressources de base",
            "rare_components_title": "Composants rares"
        }
    },
    "combat": {
        "alerts": {
            "fled_combat": "Vous avez pris la fuite. Le combat est terminé.",
            "item_lost_on_death": "Oh non ! Vous avez perdu votre {itemName} !",
            "boss_defeated": "Vous avez vaincu {bossName} ! 🎉",
            "busy_expedition": "Vous êtes déjà en expédition ! Attendez la fin pour affronter un boss.",
            "boss_level_too_low": "Votre niveau ({playerLevel}) est trop faible pour affronter le {bossName} (Niveau requis: {requiredLevel}).",
            "boss_confirm_fight_detailed": "Êtes-vous sûr de vouloir affronter <strong>{bossName}</strong> ?<br><br>Vaincre ce boss vous donnera accès à des expéditions de raretés supérieures.<br><br><p class='warning-text'>En cas de défaite ou de fuite, vous perdrez de l'XP et des ressources, et vous avez 20% de chance de perdre un équipement !</p>",
            "food_buff_expired": "L'effet de \"{foodName}\" s'est estompé."
        },
        "log": {
            "consumable_cooldown": "Vous devez encore attendre {turns} tour(s) avant d'utiliser un autre objet.",
            "turn_start": "--- Début du tour {round} ---",
            "player_uses_item": "Vous utilisez {itemName}.",
            "player_heals_hp": "💚 Vous récupérez <strong class=\"damage-number\">{amount}</strong> PV.",
            "player_recovers_mana": "🌀 Vous récupérez <strong class=\"damage-number\">{amount}</strong> points de mana.",
            "player_buffed": "💪 Vous vous sentez plus puissant ! (+{value} {stat} pendant {duration} tours)",
            "turn_skipped": "Vous avez mis trop de temps à réagir, votre tour est passé !",
            "victory": "🎉 Victoire ! Tous les ennemis ont été vaincus.",
            "enemy_turn_start": "--- Tour des ennemis ---",
            "enemy_bleed_damage": "🩸 L'hémorragie inflige {damage} dégâts à {enemyName}.",
            "enemy_bleed_death": "☠️ {enemyName} succombe à ses blessures !",
            "enemy_stunned": "💫 {enemyName} est étourdi et ne peut pas attaquer !",
            "player_evades": "💨 Vous esquivez l'attaque de {enemyName} !",
            "guerrilla_tactics": "🌿 Tactiques de Guérilla ! Votre Agilité augmente !",
            "enemy_crit": "💥 Le coup de {enemyName} est CRITIQUE !",
            "mana_shield_absorb": "🛡️ Votre Bouclier de Mana absorbe <strong class=\"damage-number\">{amount}</strong> dégâts.",
            "indomitable_talent": "✊ Talent 'Indomptable' ! Vous survivez de justesse à un coup fatal !",
            "enemy_attacks": "🔴 {enemyName} vous attaque et inflige <strong class=\"damage-number\">{damage}</strong> dégâts. <span class=\"chance-display\">({chance}% chance)</span>",
            "thorns_damage": "🛡️ Vos épines infligent <strong class=\"damage-number\">{damage}</strong> dégâts à {enemyName}.",
            "enemy_lifesteal": "💚 {enemyName} draine {amount} points de vie.",
            "player_is_stunned": "💫 L'attaque de {enemyName} vous a étourdi !",
            "enemy_misses": "🟢 {enemyName} vous manque ! <span class=\"chance-display\">({chance}% chance)</span>",
            "player_defeated": "Vous avez été vaincu...",
            "stalemate": "Le combat s'éternise... Vous battez en retraite.",
            "combat_start": "Le combat commence !",
            "hourglass_buff": "⌛ Le Sablier du Temps vous accorde un bonus de +15% de {statName} !",
            "echo_of_eternity": "🌀 Écho de l'Éternité ! Vous pouvez rejouer immédiatement !",
            "not_enough_mana": "🌀 Vous n'avez pas assez de mana pour lancer ce sort !",
            "stun_resist": "🗿 Inébranlable ! Vous résistez à l'étourdissement !",
            "player_stunned": "Vous êtes étourdi et ne pouvez pas attaquer !",
            "player_uses_skill": "⚔️ Vous utilisez {skillName} sur {targetName}.",
            "tank_intercept": "🛡️ {tankName} intercepte et subit <strong class=\"damage-number\">{damage}</strong> dégâts !",
            "enemy_defeated": "☠️ {enemyName} a été vaincu !",
            "player_miss": "💨 Votre attaque sur {targetName} manque ! <span class=\"chance-display\">({chance}% chance)</span>",
            "player_spell_crit": "✨ COUP CRITIQUE MAGIQUE sur {targetName} !",
            "player_crit": "💥 COUP CRITIQUE sur {targetName} !",
            "codex_execute": "💀 Exécution ! Vos dégâts sont augmentés sur une cible affaiblie !",
            "eagle_eye_execute": "🦅 Œil de l'Aigle ! Votre coup critique exécute {targetName} !",
            "aoe_damage": "dégâts de zone",
            "damage": "dégâts",
            "target_takes_damage": "⚔️ {targetName} subit <strong class=\"damage-number\">{damage}</strong> dégâts.",
            "target_takes_aoe_damage": "⚔️ {targetName} subit <strong class=\"damage-number\">{damage}</strong> dégâts de zone.",
            "player_lifesteal": "💚 Vous drainez {amount} points de vie.",
            "player_manaleech": "🌀 Vous drainez <strong class=\"damage-number\">{amount}</strong> points de mana.",
            "soul_siphon": "💜 Siphon d'Âme ! Vous convertissez la vie drainée en <strong class=\"damage-number\">{amount}</strong> points de mana.",
            "enemy_bleeds": "🩸 {targetName} subit une hémorragie !",
            "enemy_stunned": "💫 Vous avez étourdi {targetName} !",
            "boss_xp_gain_base": "Vous gagnez {xp}",
            "boss_xp_gain_bonus": " (+{bonus} bonus)",
            "boss_resource_gain": " XP et {resources} ressources.",
            "boss_loss_penalty": "Vous avez perdu {xp} XP et {resources} ressources.",
            "defeated_by": "Vous avez été vaincu par {enemyName}...",
            "enemy_defeated_simple": "Vous avez vaincu {enemyName} !",
            "from_boss": "Butin sur {bossName}",
            "turn_limit_reached": "Limite de tours atteinte ! Le combat se termine.",
            "enemy_uses_skill": "🔴 {enemyName} utilise {skillName} !",
            "player_takes_skill_damage": "Vous subissez <strong class=\"damage-number\">{damage}</strong> points de dégâts magiques.",
            "player_is_debuffed": "📉 Votre {stat} est réduite de {value}% pour {duration} tours.",
            "enemy_summons": "{enemyName} invoque un {summonedName} !"
        },
        "ui": {
            "role_tank": "TANK",
            "no_consumables": "Aucun consommable.",
            "status_active": "ACTIF",
            "status_inactive": "INACTIF",
            "mana_shield_tooltip": "Bouclier de Mana ({status})\nCliquez pour activer/désactiver."
        }
    },
    "mutations": {
        "frost_transmutation": { "name": "Transmutation de Givre" },
        "fire_transmutation": { "name": "Transmutation de Feu" },
        "solar_transmutation": { "name": "Transmutation Solaire" },
        "earthy_transmutation": { "name": "Transmutation Terreuse" },
        "winter_lily": { "name": "Lys d'Hiver" },
        "summer_sunflower": { "name": "Tournesol d'Été" },
        "spring_dew_flower": { "name": "Fleur de Rosée Printanière" },
        "autumn_earthy_mushroom": { "name": "Champignon Terreux d'Automne" },
        "golden_clover": { "name": "Trèfle Doré" },
        "sponge_root": { "name": "Racine-Éponge" },
        "blood_rose": { "name": "Rose Sanguine" },
        "silent_orchid": { "name": "Orchidée Silencieuse" }
    },
    "adventure": {
        "nodes": {
            "A1_N1_INTRO": { "name": "Le Hameau d'Aubier" },
            "A1_N2_LOUPS": { "name": "La Piste des Bêtes" },
            "A1_N3_FORGERON": { "name": "Le Sauvetage de Kaelen" },
            "A1_N4_PORTE_FORGE": { "name": "Le Cœur du Village" },
            "A1_N5_HEROIC_ACT": { "name": "Un Acte Héroïque" },
            "A1_N6_MINE": { "name": "La Mine Murmurante" },
            "A1_N7_FRAGMENT": { "name": "Le Premier Fragment" },
            "A1_N8_ALCHIMISTE": { "name": "Le Laboratoire d'Alaric" },
            "A1_N9_SANCTUAIRE": { "name": "Le Sanctuaire Oublié" },
            "A1_N10_LARRY": { "name": "Une Rencontre Inattendue" },
            "A1_TUTO_FORGE_1": { "name": "L'Art de la Forge" },
            "A1_TUTO_FORGE_2": { "name": "Première Pièce" },
            "A1_TUTO_EXPEDITION_1": { "name": "Le Monde Extérieur" },
            "A1_TUTO_EXPEDITION_2": { "name": "Premier Rapport" },
            "A1_TUTO_FIEF_1": { "name": "Bâtir son Avenir" },
            "A1_TUTO_FIEF_2": { "name": "Première Pierre" },
            "A1_TUTO_ALCHIMIE_1": { "name": "L'Art des Potions" },
            "A1_TUTO_ALCHIMIE_2": { "name": "Première Concoction" },
        // Node Acte 2
            "A2_N1_PONT_LA_CROISEE": { "name": "Pont-la-Croisée" },
            "A2_N2_RENOMMEE": { "name": "Une Réputation Grandissante" },
            "A2_N3_GATE_CHASSEUR": { "name": "Le Défi de la Chasse" },
            "A2_N4_MAITRESSE_CHASSEUSE": { "name": "La Maîtresse des Bêtes" },
            "A2_N5_GATE_FORGE": { "name": "La Tour Scellée" },
            "A2_N6_TOUR_DE_SILAS": { "name": "Le Maître de l'Enchanteur" },
            "A2_N7_LABO_LARRY": { "name": "Le Marionnettiste" },
            "A2_N8_BOSS": { "name": "Le Chef-d'œuvre" },
            "A2_N9_REVELATION_ASCENSION": { "name": "La Limite Atteinte" },
            // Nodes Acte 3
            "A3_N1_RITUEL": { "name": "Le Rituel de l'Ascension" },
            "A3_N2_CONSTELLATIONS": { "name": "Dessiner sa Destinée" },
            "A3_N3_ETINCELLE": { "name": "La Première Étincelle" },
            "A3_N4_ARTIFICE": { "name": "La Main de l'Artificier" },
            "A3_N5_ENIGME": { "name": "L'Énigme Silencieuse" },
            "A3_N6_ANALYSE": { "name": "Le Poids de la Légende" },
            "A3_N7_HERAUT": { "name": "Le Héraut du Juge" },
            "A3_N8_PISTE": { "name": "La Piste du Silence" },
            "A3_N9_BOSS": { "name": "Le Juge Dissonant" },
            // Nodes Acte 4
            "A4_N1_EFFONREMENT": { "name": "L'Effondrement du Réel" },
            "A4_N2_FRAGMENTS": { "name": "La Chasse aux Fragments" },
            "A4_N3_SEAU": { "name": "Le Gardien Verrouillé" },
            "A4_N4_PORTAIL": { "name": "La Voix des Runes" },
            "A4_N5_INTRUSION": { "name": "Une Alliance Imprévue" },
            "A4_N6_ANCIEN": { "name": "Les Échos des Anciens" },
            "A4_N7_REFLEXION": { "name": "Un Choix Philosophique" },
            "A4_N8_ARME": { "name": "L'Arme de Larry" },
            "A4_N9_CONFRONTATION": { "name": "Le Compositeur du Chaos" },
            "A4_N10_BOSS": { "name": "L'Harmoniste Corrompu" }
        },
        "characters": {
            "elian": "Maître Elian",
            "player": "{playerName}",
            "kaelen": "Kaelen",
            "lysandra": "Lysandra",
            "alaric": "Maître Alaric",
            "larry": "Larry", // Vous pouvez mettre son vrai nom ici
            "hero_think": "Pensées",
            "gaston": "Gaston",
            "garde": "Garde de la Cité",
            "maitresse_chasseuse": "Maîtresse Chasseuse",
            "silas": "Silas l'Enchanteur",
            "eliana": "Eliana", // Assurez-vous d'avoir une entrée pour elle si elle parle
            "kormac": "Kormac, Gardien de l'Harmonie"
        },
        "dialogue": {
            "A1_N1_S1": "Bienvenue à Aubier, étranger. Je regrette que les circonstances de votre arrivée soient si sombres. Notre hameau était un havre de paix, mais une ombre s'est étendue sur la forêt. Une... Dissonance. Les bêtes sont devenues folles, leurs yeux brillant d'une lueur violette malsaine.",
            "A1_N1_S2_BRAVE": "Votre bravoure est admirable, mais elle doit être prouvée. Avant de vous envoyer dans les bois, montrez-moi ce que vous valez. Voyez cette vieille effigie d'entraînement ? Elle a été touchée par la corruption. Frappez-la.",
            "A1_N1_S2_PRUDENT": "La prudence est une grande qualité. Avant de vous envoyer chercher des réponses, montrez-moi votre force. Voyez cette vieille effigie d'entraînement ? Elle a été touchée par la corruption. Frappez-la.",
            "A1_N1_S2_SILENT": "Un esprit silencieux est souvent un esprit concentré. Bien. Mais les actes parlent plus fort. Montrez-moi ce que vous valez. Voyez cette vieille effigie d'entraînement ? Elle a été touchée par la corruption. Frappez-la.",
            "A1_N1_S3": "Hmm. Vous avez du potentiel. Très bien. Mais ce n'est qu'un début. Vous devez vous endurcir. Partez en Expédition, explorez le monde et revenez plus fort. Je vous ai débloqué l'accès au Codex pour que vous puissiez étudier vos ennemis.",
            "A1_N1_TUTO1": "Regardez l'interface. Votre santé (PV) est la barre verte. Gardez-la à l'œil.<br><br>En bas, ce sont vos compétences. Choisissez-en une et sélectionnez votre cible. Allez-y.",
            "A1_N1_TUTO3": "Parfait ! Vous voyez, vos dégâts s'affichent en rouge. L'ennemi a aussi une barre de vie. Votre but est de la vider avant qu'il ne vide la vôtre.",
            "A1_N1_TUTO4": "Attention ! Vous avez subi des dégâts. La survie est aussi importante que l'attaque. Maintenant, achevez-la !",
            "A1_TUTO_EXPEDITION_1_S1": "Vous avez bien géré ce mannequin corrompu, mais le monde est bien plus vaste. Il est temps que vous appreniez à y naviguer seul.",
            "A1_TUTO_EXPEDITION_1_S2": "L'onglet 'Expéditions' est votre porte d'entrée vers cet inconnu. Vous y trouverez des missions de difficultés et de récompenses variées. Chaque succès vous apportera expérience et ressources.",
            "A1_TUTO_EXPEDITION_1_S3": "(C'est donc comme ça que je vais m'équiper et gagner en expérience... Chaque expédition semble avoir ses propres défis et nécessitera peut-être des attributs différents.)",
            "A1_TUTO_EXPEDITION_1_S4": "Allez. Lancez-en une, n'importe laquelle. Revenez me voir quand vous aurez terminé. Montrez-moi que vous n'avez pas peur de l'inconnu.",
            "A1_TUTO_EXPEDITION_2_S1": "Excellent. Vous avez survécu à votre première épreuve en solitaire. Chaque aventure vous endurcira et affinera vos compétences. Le chemin est encore long, mais c'est un bon début. Prenez ceci pour vous aider à continuer.",
            "A1_TUTO_FIEF_1_S1": "Ce Fief est à vous maintenant. C'est plus qu'un simple lopin de terre, c'est le symbole de votre influence grandissante et un refuge sûr.",
            "A1_TUTO_FIEF_1_S2": "Vous pouvez y construire des bâtiments qui généreront des ressources passivement, même lorsque vous ne jouez pas. C'est la clé pour devenir une véritable puissance et financer vos futures entreprises.",
            "A1_TUTO_FIEF_1_S3": "Commencez par une Scierie. Le bois est la base de tout développement. Allez-y, et revenez me voir quand la première planche aura été posée.",
            "A1_TUTO_FIEF_2_S1": "Parfait. Votre domaine commence à prendre forme. Chaque bâtiment amélioré renforcera votre position et votre économie. Continuez sur cette voie et vous deviendrez une force avec laquelle il faudra compter. Voici de quoi vous aider pour la suite.",
            "A1_TUTO_ALCHIMIE_1_S1": "Ah, vous voilà ! Prêt à titiller les secrets des fioles et des alambics ? La Dissonance n'est pas qu'une force brute, elle s'infiltre comme un poison. Mes potions peuvent vous aider à survivre là où la simple force échoue.",
            "A1_TUTO_ALCHIMIE_1_S2": "Chaque ingrédient a une propriété, chaque mélange une possibilité. La nature elle-même est un grimoire ouvert pour qui sait lire entre les lignes... ou les feuilles !",
            "A1_TUTO_ALCHIMIE_1_S3": "Allez dans mon atelier, je vous ai laissé tout ce qu'il faut pour préparer une Potion de Soin Mineure. C'est la base, mais même la plus grande des tours commence par une simple pierre. Montrez-moi ce que vous savez faire !",
            "A1_TUTO_ALCHIMIE_2_S1": "Ha ! Vous avez du talent ! Cette potion est parfaitement dosée. Regardez cette couleur, cette clarté ! Magnifique ! On sent presque les herbes chanter !",
            "A1_TUTO_ALCHIMIE_2_S2": "Gardez-la précieusement, elle pourrait vous sauver la vie. Prenez ces herbes, vous en aurez besoin. La route qui vous attend est pavée d'embûches, et de merveilles alchimiques à découvrir !",
            "A1_N2_S1": "(Une lueur violette... Ce n'est pas une maladie ordinaire. C'est comme si la nature elle-même était désaccordée. Elian avait raison, ce n'est pas la faim qui les guide, mais une pure et simple folie.)",
            "A1_N2_S2": "Vous avez vu ? C'est de cela que je parle. La piste semble mener vers le nord-ouest, en direction des anciennes mines. C'est là que notre forgeron, Kaelen, a été vu pour la dernière fois... enlevé par une bande de gobelins. Je crains le pire.",
            "A1_N2_S3": "(Les gobelins ne sont généralement pas si organisés. Quelque chose a changé. Je dois retrouver ce forgeron.)",
            "A1_N3_S0": "(Les gobelins ne le torturaient pas. Ils étaient... fascinés. Ils tapotaient ses outils, comme s'ils essayaient d'accorder un instrument. Étrange.)",
            "A1_N3_S1": "Par le marteau et l'enclume, merci ! Ces petites pestes étaient bizarres. Elles n'arrêtaient pas de faire tinter mes pinces. Cette folie a commencé juste après que j'ai trouvé un étrange minerai dans la vieille mine.",
            "A1_N3_S2": "Vous avez sauvé l'un des nôtres, un acte de bravoure qui mérite reconnaissance. Le village d'Aubier vous ouvre ses portes. Allez voir nos artisans, ils vous aideront dans votre quête.",
            "A1_N3_S3": "Le village, hein ? J'apprécie. Mais aidez-moi d'abord à reconstruire ma forge ! Sans elle, je suis inutile. Et je pourrai peut-être analyser ce maudit minerai.",
            "A1_N4_S1": "Je ne peux rien faire sans mes outils et mon foyer. La forêt environnante regorge de bois, mais il nous en faut une bonne quantité. Aidez-nous à rassembler ce qu'il faut. La forge est le cœur battant de ce village ; la rallumer est la première étape pour comprendre ce qui arrive à notre monde.",
            "A1_N4_S2": "Magnifique ! Le feu crépite à nouveau ! Merci, aventurier. Maintenant, parlons de ce qui nous préoccupe vraiment...",
            "A1_TUTO_FORGE_1_S1": "Ah, le doux son de l'enclume ! Maintenant que tout est en ordre, que dirais-tu d'apprendre les bases ? La forge est ton meilleur allié pour créer l'équipement qui te gardera en vie.",
            "A1_TUTO_FORGE_1_S2_Q1": "Comment ça fonctionne ?",
            "A1_TUTO_FORGE_1_S2_Q2": "Où trouver les matériaux ?",
            "A1_TUTO_FORGE_1_S3_A1_TUTO_FORGE_1_S2_Q1": "C'est simple ! Tu choisis un type d'objet, une rareté, et si tu as les matériaux et les fragments, tu peux le forger. Plus ma forge est améliorée, plus la qualité des objets que tu peux créer est grande.",
            "A1_TUTO_FORGE_1_S3_A1_TUTO_FORGE_1_S2_Q2": "Partout ! Les expéditions, les monstres... Le monde regorge de ressources pour qui sait regarder. Le plus important, ce sont les Fragments, que tu obtiens en recyclant les objets dont tu ne veux plus.",
            "A1_TUTO_FORGE_1_S4": "Le meilleur moyen d'apprendre, c'est de pratiquer. Va jeter un œil à l'interface, et reviens me voir quand tu auras fabriqué ton premier objet. N'importe lequel fera l'affaire pour commencer.",
            "A1_TUTO_FORGE_2_S1": "Voilà qui est mieux ! Ce n'est peut-être pas une lame légendaire, mais c'est TA création. Continue comme ça, et bientôt, ton nom résonnera dans les armureries de tout le royaume. Tu as gagné ça pour tes efforts.",
            "A1_N5_S1": "Maintenant que la forge est active, je peux vous dire la vérité. Les gobelins n'étaient qu'une distraction. La Dissonance dans la mine est forte. Elle a réveillé quelque chose de bien plus ancien... des Gardiens de pierre. Ils bloquent l'accès aux veines les plus profondes. Si vous pouviez les neutraliser, le village vous en serait éternellement reconnaissant.",
            "A1_N5_S2": "Incroyable ! Vous avez vaincu les Gardiens que nos meilleurs guerriers craignaient. Vous n'êtes pas un simple aventurier. Vous êtes un protecteur. Le conseil du village a décidé de vous octroyer le vieux Fief abandonné, sur la colline. C'est à vous de le rebâtir.",
            "A1_N5_S3": "(Un Fief... C'est une grande responsabilité. Mais aussi une base d'opérations. Je pourrai le développer pour m'aider dans ma quête. Il est temps de retourner voir Kaelen.)",
            "A1_N6_S1": "Un Fief, rien que ça ! Votre réputation n'est plus à faire. Écoutez, maintenant que vous avez nettoyé l'entrée de la mine, pourriez-vous y retourner pour moi ? J'ai besoin d'un échantillon de ce minerai étrange. Mais soyez prudent... les anciens récits parlent d'un Gardien Érodé bien plus puissant qui sommeille dans les profondeurs. Il protège sûrement le filon.",
            "A1_N6_S2": "Le gardien est vaincu. Et là... il protégeait ce filon de minerai luisant. Ce doit être ça que Kaelen cherchait. Il... fredonne avec une énergie étrange.",
            "A1_N7_S1": "(Au contact du cristal, mon esprit est emporté. Je ne vois ni le ciel, ni la terre, seulement un vide infini. Au centre, une étoile d'une blancheur éclatante pulse en harmonie. Puis, une fissure. Pas de son, juste une onde de... tristesse. L'étoile se brise dans un silence absolu, projetant des milliers d'éclats à travers le cosmos.)",
            "A1_N7_S2": "Cette libération d'énergie ! Je ne pensais pas en trouver un ici. Je suis Lysandra, Archiviste de l'Ordre du Silence. Ce que vous tenez n'est pas un simple minerai. C'est un Fragment d'Écho, un vestige de la Fracture qui a créé la Dissonance qui empoisonne ce monde.",
            "A1_N7_S3_BRAVE": "C'est normal d'être confus. L'Harmonie est la grande musique de l'univers. La Dissonance est sa fausse note. Ce fragment est une partie de cette note brisée. Nous devons comprendre pourquoi elle résonne si fort ici.",
            "A1_N7_S3_PRUDENT": "Une excellente question. Le Fragment que vous portez résonne avec un autre, caché non loin. Mais avant cela, une vision m'indique qu'un de mes confrères est en grand danger à cause de cette même corruption.",
            "A1_N8_S1": "Votre arrivée n'est pas un hasard. Mon confrère, l'alchimiste Maître Alaric, étudie la corruption dans les marais proches. Mes visions me disent qu'il est sur le point d'être submergé par ses propres sujets d'étude. Nous devons l'aider, son savoir est précieux !",
            "A1_N8_S2": "(Un laboratoire en plein milieu d'un marais fétide... Cet Alaric doit être soit un génie, soit un fou.)",
            "A1_N8_S3": "Par les fioles ! Vous m'avez sauvé ! Cette corruption est tenace et... fascinante ! Pour vous remercier, permettez-moi d'installer mon laboratoire dans votre village. Mes potions vous seront utiles, car votre chemin s'annonce bien plus dangereux.",
            "A1_N9_S1": "Alaric est en sécurité. Maintenant, le Fragment que vous portez résonne avec un autre. Il se trouve dans un Sanctuaire Oublié, un lieu d'Harmonie ancienne. Mais son entrée est scellée par une énigme, une question sur la nature même du monde.",
            "A1_N9_S2": "(La porte s'ouvre... L'air ici est pur, comme si la Dissonance n'osait pas entrer. Mais je sens une présence ancienne... et corrompue.)",
            "A1_N9_S3": "(Les gardiens spectraux ne sont plus que des pantins. La corruption a atteint le cœur de ce lieu. Je dois affronter la source.)",
            "A1_N10_S1": "Fascinant. Un nouveau jouet qui apprend vite. Mais si fragile.",
            "A1_N10_S2": "J'avoue, je ne m'attendais pas à ce que tu arrives jusqu'ici. Mes petites expériences deviennent plus divertissantes grâce à toi. Continue de rassembler ces fragments pour moi, veux-tu ? Ça rend les choses tellement plus... intéressantes.",
            "A1_N10_S3_BRAVE": "Ah, la fureur ! Adorable. Mais tu ne comprends pas. Ce n'est pas une question de bien ou de mal. C'est une question d'art. Et le monde est ma toile vierge.",
            "A1_N10_S3_PRUDENT": "Ma 'logique' ? La symphonie de ce monde est si... ennuyeuse. Toujours les mêmes notes, la même mélodie. J'ai simplement décidé d'introduire un nouvel instrument. Un peu de chaos rend les choses tellement plus belles.",
            "A1_N10_S4": "Par les étoiles... Ce n'était pas un accident. C'était un jeu. Et nous en sommes les pions.",
            // === NOUVEAU DIALOGUE - ACTE 2 ===
            "A2_N1_S1": "La piste de ce 'Larry' est froide, mais mes visions indiquent qu'il est passé par Pont-la-Croisée, la plus grande cité de la région. C'est un nid de vipères, mais nous y trouverons peut-être des réponses.",
            "A2_N1_S2": "Hé là, l'ami ! Vous avez l'air d'avoir vu des jours meilleurs. Je suis Gaston, le patron du 'Sanglier Rieur'. Un aventurier a besoin d'un bon repas pour tenir le coup ! Mais mes réserves de bois de chauffage sont à sec. Aidez-moi à remplir mon stock, et je vous apprendrai les secrets d'un bon plat revigorant !",
            "A2_N1_S3": "Magnifique ! Grâce à vous, mes soupes seront chaudes pour des semaines ! Comme promis, je vous donne accès à ma cuisine. Un ventre plein est la meilleure des armures !",
            "A2_N2_S1": "(Depuis que j'ai aidé Gaston, ma réputation s'est répandue en ville. Les gens me saluent, me demandent des conseils... C'est nouveau.)",
            "A2_N2_S2": "Vous êtes l'aventurier dont tout le monde parle ? La garde de Pont-la-Croisée a besoin de gens comme vous. Nous avons mis en place un Tableau de Primes pour les menaces que nous ne pouvons gérer. Jetez-y un œil, si le cœur vous en dit. La justice et la gloire vous attendent.",
            "A2_N3_S1": "J'ai trouvé quelque chose ! Larry utilise une forme de Dissonance bien plus complexe. Il ne corrompt pas les créatures, il les... 'améliore', il les mute. Pour comprendre comment, il nous faut un cœur de créature mutée. Seule la Maîtresse Chasseuse sait où les trouver, mais elle ne parle qu'aux chasseurs accomplis.",
            "A2_N3_S2": "(La Maîtresse Chasseuse m'a enfin accordé une audience. Il est temps de voir si elle est à la hauteur de sa réputation.)",
            "A2_N4_S1": "Alors c'est toi qui fais tout ce bruit en ville. Tu as tué quelques bêtes, et tu penses que ça fait de toi un chasseur ? Prouve-le. Montre-moi que tu as le cœur d'un vrai prédateur. Montre-moi le cœur d'un Golem.",
            "A2_N4_S2": "Hmpf. Pas mal. Tu as du cran. Très bien, je t'aiderai à trouver ta bestiole mutée. Et puisque tu es là, jette un œil à ma collection. Mes équipements sont faits pour les vrais chasseurs, pas pour les gamins qui jouent avec des épées.",
            "A2_N5_S1": "La piste nous mène à cette tour tordue. Elle appartient à Silas, l'Enchanteur. L'énergie dissonante qui en émane est puissante. Mais la porte est scellée par une magie qui réagit à la qualité de l'artisanat. Seul un forgeron compétent pourrait la briser.",
            "A2_N5_S2": "Parfait. Le sceau s'est brisé. L'énergie dissonante à l'intérieur est... puissante. Sois sur tes gardes.", 
            "A2_N6_S1": "Qui va là ? Ah... C'est donc toi. Tu portes l'odeur de la Dissonance. L'odeur de mon échec. L'odeur de Larry. Que veux-tu de moi ?",
            "A2_N6_S2_COMPASSION": "Mon apprenti... Il était un génie. Il voyait l'Harmonie du monde non pas comme une perfection, mais comme une toile inachevée. Il voulait y ajouter ses propres couleurs, la Dissonance. Je l'ai banni, mais sa folie a grandi bien au-delà de mes peurs. Pour le combattre, il te faudra plus que la force brute. Il te faudra... réécrire les règles. Laisse-moi t'enseigner mon art, l'Enchantement.",
            "A2_N6_S2_MENACE": "La force ? Contre lui ? Tu es naïf. Il ne se bat pas avec ses poings, mais avec les lois de la réalité. Il était mon apprenti. Un génie qui voyait le monde comme une toile inachevée, et la Dissonance comme sa peinture. Je l'ai banni. Grossière erreur. Pour le combattre, il te faudra plier les règles. Je vais t'apprendre comment. L'Enchantement.",
            "A2_N7_S1": "(Silas avait raison. Ce laboratoire secret... l'air y est saturé de Dissonance. C'est ici. Je le sens.)",
            "A2_N7_S2": "Ah, mon petit jouet. Tu as bien grandi. Tu as appris de nouveaux tours, je vois. L'Enchantement... une discipline si rigide. Laisse-moi t'apprendre un nouveau rythme.",
            "A2_N7_COMBAT_START": "Allez, danse pour moi !",
            "A2_N7_COMBAT_MID": "Tu te débrouilles bien... pour un jouet.",
            "A2_N7_COMBAT_END": "Impressionnant. Mais la véritable pièce de théâtre ne fait que commencer.",
            "A2_N8_S1": "Ce n'était qu'un échauffement. Un test. Et tu l'as lamentablement échoué. Tu n'es pas prêt à comprendre mon art. Tiens, amuse-toi avec mon dernier chef-d'œuvre. J'ai d'autres symphonies à composer.",
            "A2_N8_S2": "(Quel défaite cuisante... Que faire...)",
            "A2_N9_S1": "(Vaincu... humilié. Il s'est joué de moi du début à la fin. Je ne suis pas assez fort. Je ne serai jamais assez fort comme ça.)",
            "A2_N9_S2": "Relève-toi. Ta défaite n'est pas une fin, mais une leçon. Pour le vaincre, tu dois renaître, plus fort. L'Ascension te fera revivre ton périple depuis le début, mais ta légende, gravée dans les étoiles, te donnera une puissance qu'il ne peut imaginer. Tu perdras tes biens, mais tu garderas ton savoir. C'est la seule voie.",
            // === NOUVEAU DIALOGUE - ACTE 3 ===
            "A3_N1_S1": "Te voilà. La défaite était une blessure nécessaire. Tu as atteint les limites de cette vie. Pour combattre Larry, tu ne dois pas seulement guérir. Tu dois te briser entièrement pour te reforger dans une flamme plus vive. C'est le sens de l'Ascension.",
            "A3_N1_S2": "Alors que le rituel commence, tu sens ton corps et ton esprit se dénouer fil par fil, ton histoire se dispersant comme de la poussière d'étoiles. Puis, le vide. Et enfin, une nouvelle étincelle. Tu es à nouveau au début, faible, mais pas vide.",
            "A3_N2_S1": "Tu es de retour. Différent. Ta légende passée est désormais gravée dans le firmament. Regarde. Les Constellations sont désormais tiennes, un pouvoir que même Larry ne peut t'enlever. Dépense tes premiers points, dessine ta nouvelle destinée.",
            "A3_N2_S2": "Bien. Les semaines qui suivront seront une redécouverte. Chaque combat, chaque objet forgé aura une saveur nouvelle. Va, et deviens l'arme que ce monde attend.",
            "A3_N3_S1": "Ta nouvelle puissance est brute, instinctive. Il faut la tester. Retourne dans la forêt près d'Aubier, là où tout a commencé. Affronte les créatures qui y rôdent. Montre-moi que ta flamme ne s'est pas éteinte, mais qu'elle s'est ravivée.",
            "A3_N3_S2": "(Je le sens... La force des étoiles guide mes coups. C'est la même force qu'avant, mais... plus pure. Plus fondamentale.)",
            "A3_N4_S1": "Le combat est une chose, mais la création en est une autre. Pour comprendre la Dissonance de Larry, je dois l'analyser. J'ai besoin d'un 'Boîtier de Résonance Harmonique'. Kaelen a les plans, mais seuls les artisans les plus doués peuvent le fabriquer. Prouve que tu maîtrises l'art de la forge.",
            "A3_N4_S2": "Parfait. Cet objet nous sera précieux. Tu n'es pas seulement une force de destruction, mais aussi de création. C'est important.",
            "A3_N5_S1": "La force et l'artisanat sont maîtrisés. Reste l'esprit. Un ancien sanctuaire a été scellé par une énigme. Personne n'a pu y entrer depuis des siècles. À l'intérieur se trouve une tablette de lore qui pourrait nous éclairer sur la nature des Échos. Va, et que ta nouvelle sagesse te guide.",
            "A3_N5_S2": "L'esprit... il a été corrompu par la solitude et la Dissonance résiduelle. Tu l'as libéré. Et la tablette... oui, c'est exactement ce que je cherchais. Bien joué.",
            "A3_N6_S1": "J'ai tout ce qu'il me faut. Le boîtier que tu as forgé, la tablette de ce sanctuaire... Tes actions ne sont plus de simples quêtes, elles pèsent sur la réalité. Ta légende grandit, et je... oh non.",
            "A3_N6_S2": "Par les étoiles... Je le sens. Une vague de Dissonance, froide et inquisitrice, se dirige droit sur Aubier. Ce n'est pas une corruption chaotique... c'est une intention. C'est une réponse.",
            "A3_N7_S1": "À l'aide ! Une créature... elle ne ressemble à rien de ce qu'on a vu ! Elle est apparue au centre du village et détruit tout sur son passage ! Elle... elle semble vous chercher !",
            "A3_N7_S2": "(Ce n'était qu'un avant-goût. Une simple fraction de sa puissance. Il sait que je suis là. Et il m'attend.)",
            "A3_N8_S1": "La créature a laissé une traînée de Dissonance pure, une piste glaciale qui mène vers les pics des Montagnes du Givre Éternel. C'est là que le Juge t'attend. C'est un duel inévitable. Sois prêt.",
            "A3_N9_S1": "(Cette créature... elle est faite de cristal noir et de silence. Elle ne dégage aucune haine, seulement le poids d'un verdict. C'est le Juge Dissonant. C'est un duel entre ma nouvelle destinée et la volonté de mon tortionnaire.)",
            "A3_N9_S2": "Tu as réussi ! Le Juge s'est brisé en un million d'éclats silencieux. L'Ascension... c'était la bonne décision. Le jeu a changé. Maintenant, la vraie guerre commence.",
            // === NOUVEAU DIALOGUE - ACTE 3 ===
            "A4_N1_S1": "Les cieux se déchirent. Larry ne joue plus. Ton acte d'Ascension l'a provoqué au-delà de ses limites. C'est le Réveil de la Dissonance.",
            "A4_N1_S2": "Des failles s'ouvrent, ici même à Aubier ! Des créatures... non, des fragments d'énergie pure en émergent ! Le monde se tord !",
            "A4_N1_S3": "(C'est une guerre totale. Il ne me cherche plus, il cherche à détruire tout ce que je protège.)",
            "A4_N2_S1": "Ces entités cristallines sont des manifestations pures de la Dissonance. Chaque fragment que tu détruis nous en apprendra plus sur la composition de cette force impie. Va, et recueille-les.",
            "A4_N2_S2": "Intéressant... La Dissonance n'est pas si chaotique qu'il n'y paraît. Il y a une structure, un rythme... inversé.",
            "A4_N3_S1": "Une immense faille menace d'engloutir les ruines d'un ancien temple. Un gardien, transformé par cette énergie, la défend. Nous devons le vaincre pour étudier la faille de plus près.",
            "A4_N3_S2": "(Cette créature... elle était un scellement, pas une sentinelle. Larry a perverti sa fonction.)",
            "A4_N4_S1": "Ces symboles sur le sceau... ce sont des Runes ! Elles peuvent canaliser et amplifier les énergies. Larry les utilise. Tu dois les apprendre, les équiper, les faire tiennes pour comprendre comment le contrer.",
            "A4_N4_S2": "Bien. Je sens la résonance des Runes en toi. Le portail réagit. Tu comprends maintenant la mélodie que Larry veut corrompre.",
            "A4_N5_S1": "Qui êtes-vous ?! Un autre des pantins de Larry ?! Non... Vos constellations... Par l'Harmonie, vous êtes un Ascensionné ! Mais l'Ordre... Il est tombé ! Larry l'a corrompu !",
            "A4_N5_S2": "Kormac ?! Un Gardien de l'Harmonie ? Je pensais que vous aviez tous péri. La Dissonance est plus complexe que je ne le pensais.",
            "A4_N5_S3": "Je l'ai vu corrompre mes frères. Il les a transformés en instruments. Je dois comprendre comment. Je dois les purifier... ou les libérer." ,
            "A4_N6_S1": "Kormac a raison. Larry ne détruit pas, il transforme. Pour comprendre comment purifier, nous avons besoin d'artefacts harmoniques anciens. Ils sont dispersés dans ces zones corrompues, gardés par ses créations.",
            "A4_N6_S2": "Chaque artefact est une note de l'ancienne mélodie. Larry les réécrit. Nous devons trouver la partition originale pour le contrer.",
            "A4_N7_S1": "Alors, Ascensionné. Kormac veut anéantir la Dissonance de Larry. Moi, je crois qu'elle peut être réaccordée, ramenée à l'Harmonie. Quel est ton choix ? Vois-tu en Larry un destructeur pur, ou un compositeur aveugle ?",
            "A4_N7_S1_CHOICE_DETRUIRE": "Larry est un destructeur. Je l'anéantirai.",
            "A4_N7_S1_CHOICE_REACCORDER": "Larry est un compositeur. Je le forcerai à réaccorder sa mélodie.",
            "A4_N7_S2": "Ton choix est fait. Il façonnera notre approche. Larry sent ton intention, quelle qu'elle soit. Il envoie déjà sa réponse.",
            "A4_N8_S1": "Une Arme de Larry ! Une créature humanoïde forgée de la Dissonance même. Elle est là pour t'intercepter. Montre-lui la force de ton choix, Ascensionné !",
            "A4_N8_S2": "Impressionnant. Son arme s'est brisée. Larry sait que tu es puissant, mais il ne comprend pas ton choix. Cela le rendra imprudent.",
            "A4_N9_S1": "Je l'ai localisé ! Il se trouve dans une de ses chambres d'Harmonie corrompues, là où il amplifie la Dissonance. Il est temps de la confrontation finale de cet acte.",
            "A4_N9_S2": "Bienvenue, mon petit jouet. Tu as choisi ta voie. Maintenant, assiste à la mienne. Voici ma plus grande œuvre, mon chef-d'œuvre. L'Harmoniste Corrompu !",
            "A4_N10_S1": "Tu pensais me vaincre ? Tu n'as fait qu'éteindre une note. La symphonie continue. Je suis le compositeur de ce nouveau cosmos, et tu n'es qu'un dissonant. Mais je dois admettre, tu es un dissonant intéressant.",
            "A4_N10_S2": "Il s'est enfui... mais nous avons gagné une bataille majeure. Larry n'est pas seulement un joueur. Il est le compositeur d'un nouveau cosmos, et nous ne sommes que les derniers obstacles à sa symphonie du chaos."
        },
        "lore": {
            "A1_N1_INTRO": "Votre histoire commence au Hameau d'Aubier, un village paisible troublé par une 'Dissonance' qui rend les bêtes folles. Maître Elian, le sage du village, vous met à l'épreuve avant de vous confier la tâche de découvrir l'origine de cette corruption.",
            "A1_N2_LOUPS": "Votre première incursion dans la forêt confirme les dires d'Elian. Vous affrontez des loups dont les yeux brillent d'une lueur violette, non pas guidés par la faim, mais par une folie pure qui semble désaccorder la nature elle-même.",
            "A1_N3_FORGERON": "La piste vous mène à Kaelen, le forgeron du village, enlevé par des gobelins. Étrangement, ceux-ci ne le torturent pas mais semblent fascinés par ses outils. En remerciement de son sauvetage, le village vous ouvre ses portes.",
            "A1_N4_PORTE_FORGE": "Avant de pouvoir analyser le mystérieux minerai qu'il a trouvé, Kaelen a besoin de son atelier. Votre première tâche est de l'aider à rassembler les matériaux pour reconstruire sa forge, le cœur battant du village.",
            "A1_TUTO_FORGE_1": "Après avoir aidé Kaelen à reconstruire sa forge, celui-ci vous propose de vous enseigner les bases de l'artisanat, une compétence essentielle pour tout aventurier qui souhaite survivre aux dangers de ce monde.",
            "A1_TUTO_FORGE_2": "La théorie ne suffit pas. Kaelen vous met au défi de mettre vos nouvelles connaissances en pratique en forgeant votre tout premier équipement.",
            "A1_N5_HEROIC_ACT": "La forge rallumée, Kaelen vous révèle que les gobelins n'étaient qu'une diversion. La vraie menace vient de la mine : d'anciens Gardiens de pierre ont été réveillés par la Dissonance. En les vainquant, votre acte héroïque vous vaut l'octroi du Fief abandonné par le conseil du village.",
            "A1_N6_MINE": "Maintenant que le Fief est à vous, Kaelen vous demande de retourner dans la mine sécurisée pour enfin récupérer un échantillon du minerai. Un dernier gardien, érodé par la corruption, protège le filon.",
            "A1_N7_FRAGMENT": "En battant le Gardien, vous découvrez un Fragment d'Écho qui vous donne une vision étrange. Son énergie a attiré Lysandra, une archiviste qui vous révèle l'ampleur du problème.",
            "A1_N8_ALCHIMISTE": "Vous aidez Lysandra à secourir son ami Alaric, un alchimiste, dans les marais. Il rejoint votre cause et s'installe au village, débloquant l'Alchimie.",
            "A1_N9_SANCTUAIRE": "Guidé par Lysandra, vous résolvez l'énigme du Sanctuaire Oublié et vainquez son gardien corrompu pour obtenir un second Fragment d'Écho.",
            "A1_N10_LARRY": "Au moment de votre victoire, un individu nommé Larry apparaît. Il révèle que la Dissonance est son œuvre, un simple jeu pour lui. La menace est bien plus grande que vous ne l'imaginais.",
            // === NOUVEAU LORE - ACTE 2 ===
            "A2_N1_PONT_LA_CROISEE": "La traque de Larry vous mène à la cité de Pont-la-Croisée. Vous y faites la connaissance de Gaston, le chaleureux patron de l'auberge du 'Sanglier Rieur', qui vous enseigne les bases de la cuisine en échange d'un service.",
            "A2_N2_RENOMMEE": "Votre réputation grandissante attire l'attention de la garde de la cité. Reconnaissant votre valeur, ils instaurent le Tableau des Primes, vous donnant accès à de nouveaux défis et récompenses.",
            "A2_N3_GATE_CHASSEUR": "Lysandra découvre que Larry ne se contente pas de corrompre, il 'mute' les créatures. Pour comprendre ce processus, il vous faut un composant rare. Cela vous force à prouver votre valeur en tant que chasseur en réussissant une prime de difficulté 'Moyen'.",
            "A2_N4_MAITRESSE_CHASSEUSE": "Votre succès vous ouvre les portes de la Maîtresse Chasseuse. En lui prouvant que vous pouvez obtenir les composants les plus rares, elle accepte de vous aider et vous donne accès à sa boutique d'équipement de set exclusif.",
            "A2_N5_GATE_FORGE": "La piste de Larry vous mène à une tour d'enchanteur, scellée par une magie ancienne qui ne peut être brisée que par un artisanat de haut niveau. Vous devez améliorer votre forge au niveau 3 pour continuer.",
            "A2_N6_TOUR_DE_SILAS": "Vous rencontrez Silas, l'ancien maître de Larry. Il vous révèle la nature de la folie de son apprenti : Larry ne veut pas détruire le monde, mais le 'parfaire' avec la Dissonance. Pour vous aider, Silas vous enseigne les secrets de l'Enchantement.",
            "A2_N7_LABO_LARRY": "Vous coincez enfin Larry. Le combat est une humiliation : il se joue de vous, démontrant une maîtrise de la Dissonance qui dépasse votre entendement. Il vous force à survivre à ses assauts sans que vous ne puissiez le toucher.",
            "A2_N8_BOSS": "Après vous avoir montré votre impuissance, Larry s'échappe en vous laissant un 'cadeau' : une de ses créations mutées les plus puissantes, une Chimère, qui vous sert de boss de fin d'acte.",
            "A2_N9_REVELATION_ASCENSION": "Vaincu et meurtri, vous comprenez que vous avez atteint les limites de votre pouvoir actuel. Lysandra vous le confirme : pour avoir une chance contre Larry, vous devez transcender votre condition mortelle. L'Ascension est votre seule option.",
            //Lore Acte 3
            "A3_N1_RITUEL": "Après votre défaite, vous acceptez le terrible choix de l'Ascension : abandonner toute votre progression pour une promesse de puissance future. Le rituel vous réinitialise au niveau 1, mais votre légende passée n'est pas oubliée.",
            "A3_N2_CONSTELLATIONS": "Votre renaissance vous donne accès aux Constellations Célestes. Guidé par Lysandra, vous apprenez à puiser dans la force de votre vie passée pour débloquer de puissants talents permanents.",
            "A3_N3_ETINCELLE": "Votre première mission en tant qu'Ascensionné est un test. Lysandra vous envoie nettoyer un bosquet corrompu pour que vous puissiez mesurer l'étendue de votre nouvelle puissance.",
            "A3_N4_ARTIFICE": "Pour avancer dans sa recherche, Lysandra a besoin d'un objet complexe. Cette quête vous pousse à vous réinvestir dans l'artisanat, prouvant que votre nouvelle vie n'est pas que destruction.",
            "A3_N5_ENIGME": "La force et l'artisanat ne suffisent pas. Cette mission teste votre esprit, vous forçant à résoudre une énigme pour accéder à un savoir ancien, gardé par un esprit tourmenté.",
            "A3_N6_ANALYSE": "Avec les fruits de vos efforts, Lysandra commence à analyser la nature profonde de la Dissonance. Mais c'est votre puissance grandissante qui attire une attention non désirée.",
            "A3_N7_HERAUT": "Larry a senti votre 'lueur' d'Ascension et n'est pas content. Il envoie un Héraut, une créature puissante, pour attaquer Aubier et vous lancer un défi direct.",
            "A3_N8_PISTE": "Après avoir repoussé le Héraut, une piste de Dissonance pure vous mène vers les montagnes. Le message est clair : ce n'était qu'un avertissement, le véritable juge vous attend.",
            "A3_N9_BOSS": "Le Juge Dissonant est une créature conçue par Larry pour contrer les pouvoirs des êtres 'ascensionnés'. Le combat est le véritable test de votre nouvelle puissance et des choix de constellations que vous avez faits.",
            //Lore Acte 4
            "A4_N1_EFFONREMENT": "Votre victoire sur le Juge Dissonant a été le signal du début d'une guerre totale. Larry, furieux, déchaîne le Réveil de la Dissonance, ouvrant des failles dans la réalité et submergeant le monde sous des vagues de chaos.",
            "A4_N2_FRAGMENTS": "Des fragments d'énergie dissonante pure émergent des failles. Vous devez les chasser et les détruire pour comprendre leur nature, aidé par Lysandra qui cherche à percer les secrets de cette énergie tordue.",
            "A4_N3_SEAU": "Un Gardien Verrouillé, corrompu par la Dissonance, protège une faille majeure dans un ancien temple. En le vainquant, vous stabilisez la faille et Lysandra découvre les Runes, des symboles ancestraux capables de canaliser l'énergie.",
            "A4_N4_PORTAIL": "Lysandra vous confie la tâche de maîtriser les Runes. En équipant trois d'entre elles, vous prouvez votre compréhension et sentez le portail que vous avez scellé réagir à votre nouvelle puissance. C'est le premier pas vers une nouvelle forme de magie.",
            "A4_N5_INTRUSION": "Kormac, un Gardien de l'Harmonie survivant, surgit d'un portail secondaire. Il vous révèle la corruption de son Ordre par Larry et vous met en garde contre la puissance grandissante du 'compositeur'. Une alliance inattendue se forge.",
            "A4_N6_ANCIEN": "Guidé par Kormac, vous collectez d'anciens Artefacts Harmoniques. Ces reliques pourraient détenir la clé pour comprendre comment Larry transforme et corrompt les êtres, plutôt que de simplement les détruire.",
            "A4_N7_REFLEXION": "Les découvertes mènent à un débat philosophique : Larry est-il un destructeur à anéantir, ou un compositeur dont la mélodie peut être réaccordée ? Votre choix façonne votre approche et prépare le terrain pour la suite.",
            "A4_N8_ARME": "Larry réagit à votre progression en envoyant une 'Arme' forgée de Dissonance pure pour vous intercepter. Ce combat est un test de votre philosophie et de votre puissance, montrant à Larry que vous êtes un adversaire redoutable.",
            "A4_N9_CONFRONTATION": "Lysandra localise Larry dans une chambre d'Harmonie corrompue. Il vous y attend, non plus avec amusement, mais avec une sinistre anticipation. Il est prêt à vous montrer sa 'plus grande œuvre'.",
            "A4_N10_BOSS": "Le combat final de l'acte vous oppose à l'Harmoniste Corrompu, un ancien de l'Ordre de Kormac, transformé en un monstre de Dissonance. Larry s'échappe, mais votre victoire prouve que vous êtes bien plus qu'un simple pion ; vous êtes désormais un contre-compositeur dans sa symphonie du chaos."
        },
        "choices": {
        "A1_N1_S1_CHOICE": {
            "title": "Que répondez-vous ?",
            "options": [
                { "textKey": "adventure.choices.A1_N1_S1_CHOICE_BRAVE", "value": "BRAVE" },
                { "textKey": "adventure.choices.A1_N1_S1_CHOICE_PRUDENT", "value": "PRUDENT" },
                { "textKey": "adventure.choices.A1_N1_S1_CHOICE_SILENT", "value": "SILENT" }
            ]
        },
        "A1_N1_S1_CHOICE_BRAVE": "Je n'ai pas peur. Dites-moi où trouver ces bêtes.",
        "A1_N1_S1_CHOICE_PRUDENT": "Que savez-vous de cette corruption ?",
        "A1_N1_S1_CHOICE_SILENT": "(Observer Elian et attendre qu'il continue.)",

        "A1_TUTO_FORGE_1_CHOICE": {
            "title": "Poser une question à Kaelen",
            "options": [
                { "textKey": "adventure.choices.A1_TUTO_FORGE_1_S2_Q1", "value": "A1_TUTO_FORGE_1_S2_Q1" },
                { "textKey": "adventure.choices.A1_TUTO_FORGE_1_S2_Q2", "value": "A1_TUTO_FORGE_1_S2_Q2" }
            ]
        },
        "A1_TUTO_FORGE_1_S2_Q1": "Comment ça fonctionne ?",
        "A1_TUTO_FORGE_1_S2_Q2": "Où trouver les matériaux ?",
        
        "A1_N3_S1_CHOICE": {
            "title": "Que répondre à Kaelen ?",
            "options": [
                { "textKey": "adventure.choices.A1_N3_S1_CHOICE_PRAGMATIQUE", "value": "PRAGMATIQUE" },
                { "textKey": "adventure.choices.A1_N3_S1_CHOICE_CURIEUX", "value": "CURIEUX" }
            ]
        },
        "A1_N3_S1_CHOICE_PRAGMATIQUE": "L'important est que vous soyez sain et sauf, Kaelen.",
        "A1_N3_S1_CHOICE_CURIEUX": "Parlez-moi de ce minerai que vous avez trouvé.",
        
        "A1_N7_S2_CHOICE": {
            "title": "Que répondre à Lysandra ?",
            "options": [
                { "textKey": "adventure.choices.A1_N7_S2_CHOICE_BRAVE", "value": "BRAVE" },
                { "textKey": "adventure.choices.A1_N7_S2_CHOICE_PRUDENT", "value": "PRUDENT" }
            ]
        },
        "A1_N7_S2_CHOICE_BRAVE": "Une... Fracture ? Une Dissonance ? Je ne comprends rien.",
        "A1_N7_S2_CHOICE_PRUDENT": "Que devons-nous faire maintenant ?",

        "A1_N8_S1_CHOICE": {
            "title": "Comment réagir ?",
            "options": [
                { "textKey": "adventure.choices.A1_N8_S1_CHOICE_HEROIQUE", "value": "HEROIQUE" },
                { "textKey": "adventure.choices.A1_N8_S1_CHOICE_STRATEGIQUE", "value": "STRATEGIQUE" }
            ]
        },
        "A1_N8_S1_CHOICE_HEROIQUE": "Un de vos alliés est en danger. Allons-y.",
        "A1_N8_S1_CHOICE_STRATEGIQUE": "Ses connaissances pourraient nous être utiles.",

        "A1_N9_PUZZLE_CHOICE": {
            "title": "Quelle est votre réponse à l'énigme ?",
            "options": [
                { "textKey": "adventure.choices.A1_N9_PUZZLE_CHOICE_1", "value": "1" },
                { "textKey": "adventure.choices.A1_N9_PUZZLE_CHOICE_2", "value": "2" },
                { "textKey": "adventure.choices.A1_N9_PUZZLE_CHOICE_3", "value": "3" }
            ]
        },
        "A1_N9_PUZZLE_CHOICE_1": "Silence",
        "A1_N9_PUZZLE_CHOICE_2": "Symphonie",
        "A1_N9_PUZZLE_CHOICE_3": "Dissonance",

        "A1_N10_S2_CHOICE": {
            "title": "Comment confronter Larry ?",
            "options": [
                { "textKey": "adventure.choices.A1_N10_S2_CHOICE_BRAVE", "value": "BRAVE" },
                { "textKey": "adventure.choices.A1_N10_S2_CHOICE_PRUDENT", "value": "PRUDENT" }
            ]
        },
        "A1_N10_S2_CHOICE_BRAVE": "(Rage) Qui que tu sois, tu paieras pour ça !",
        "A1_N10_S2_CHOICE_PRUDENT": "Quelle est votre logique ? Pourquoi faire tout ça ?",

        "A2_N6_S1_CHOICE": {
            "title": "Que répondre à Silas ?",
            "options": [
                { "textKey": "adventure.choices.A2_N6_S1_CHOICE_COMPASSION", "value": "COMPASSION" },
                { "textKey": "adventure.choices.A2_N6_S1_CHOICE_MENACE", "value": "MENACE" }
            ]
        },
        "A2_N6_S1_CHOICE_COMPASSION": "Je cherche à arrêter la folie qu'il propage. Aidez-moi.",
        "A2_N6_S1_CHOICE_MENACE": "Vous êtes son maître. Dites-moi comment le trouver, ou je considérerai que vous êtes son complice.",
        "A3_N1_S1_CHOICE_ACCEPTER": "Je suis prêt. Je ferai ce qu'il faut.",
        "A3_N1_S1_CHOICE_HESITER": "Tout perdre... c'est un lourd fardeau.",
        "A4_N7_S1_CHOICE": {
            "title": "Comment vois-tu Larry ?",
            "options": [
                { "text": "Larry est un destructeur. Je l'anéantirai.", "value": "A4_N7_S1_CHOICE_DETRUIRE" },
                { "text": "Larry est un compositeur. Je le forcerai à réaccorder sa mélodie.", "value": "A4_N7_S1_CHOICE_REACCORDER" }
            ]
        }
    },
        "prerequisites": {
            "A1_N4": "Kaelen est reconnaissant, mais il ne peut rien faire sans sa forge. Allez dans l'onglet 'Village' et construisez la Forge (Niveau 1).",
            "A1_TUTO_FORGE_2": "Pour terminer ce tutoriel, rendez-vous dans l'onglet 'Village' -> 'Forge' et fabriquez n'importe quel objet de qualité 'Commune'.",
            "A1_TUTO_EXPEDITION_2": "Elian attend votre retour. Allez dans l'onglet 'Expéditions' et terminez n'importe quelle expédition pour continuer.",
            "A1_TUTO_FIEF_2": "Elian vous a conseillé de développer votre domaine. Allez dans l'onglet 'Fief' et construisez une Scierie (Niveau 1).",
            "A1_TUTO_ALCHIMIE_2": "Alaric veut tester vos compétences. Allez dans l'onglet 'Village' -> 'Alchimiste' et préparez une Potion de Soin Mineure.",
            // === NOUVEAUX PREREQUIS - ACTE 2 ===
            "A2_N1": "Gaston a besoin de 1500 Bois pour son stock. Vous pouvez les obtenir via les Expéditions ou votre Fief.",
            "A2_N3": "La Maîtresse Chasseuse ne reçoit que les chasseurs aguerris. Prouvez votre valeur en terminant au moins une prime de difficulté 'Moyen' ou supérieure.",
            "A2_N4_ITEM": "Pour analyser la mutation, la Chasseuse a besoin d'un cœur de Golem. Vous pouvez en trouver sur les Golems de Pierre.",
            "A2_N5": "La tour de Silas est protégée par un sceau arcanique puissant. Seul un maître forgeron peut créer un outil capable de le briser. Améliorez votre Forge au niveau 3.",
            // === NOUVEAUX PREREQUIS - ACTE 3 ===
            "A3_N1_ASCENSION": "Vous devez avoir atteint le niveau d'Ascension 1 pour commencer cet acte. Utilisez la fonction Ascension (⭐) depuis l'écran principal une fois le niveau 100 atteint.",
            "A3_N4_FORGE": "Objectif : Forger un objet de qualité 'Rare' ou supérieure pour prouver votre maîtrise.",
            // === NOUVEAUX PREREQUIS - ACTE 4 ===
            "A4_N4_RUNES": "Objectif : Équiper au moins 3 Runes sur vos objets pour maîtriser cette nouvelle puissance."
        },
        "answers": {
            "puzzleA1_N9": "dissonance",
            "puzzleA3_N5": ["écho", "echo", "l'echo", "l'écho"] // <-- AJOUTER
        },
        "puzzles": {
            "A1_N9_P1": "La porte est scellée par une magie ancienne. Une inscription est gravée : 'Le monde est une mélodie grandiose, mais sa beauté naît de sa fragilité. Quel est le nom de sa... ?'",
            "A1_N9_HINT": "Indice : Rappelez-vous des premiers mots de Maître Elian.",
            "A3_N5_P1": "Une voix résonne dans les ruines : 'Je n'ai pas de corps, mais je réponds. Je n'ai pas de poumons, mais je voyage avec le vent. Qui suis-je ?'", // <-- J'ai inventé un texte pour l'énigme
            "A3_N5_HINT": "Indice : Pensez à un son qui se répète dans les montagnes ou les grandes salles." // <-- AJOUTER
        },
        "alerts": {
            "fief_unlocked": "Le Fief est maintenant disponible ! Accédez-y depuis l'écran principal.",
            "alchemist_unlocked": "L'Alchimiste a rejoint votre village !",
            "village_unlocked": "Le Village vous ouvre ses portes ! Explorez-le depuis le panneau du bas.",
            "prerequisite_not_met": "La condition n'est pas encore remplie.",
            "puzzle_success": "La réponse est correcte !",
            "puzzle_failure": "La porte reste scellée...",
            "no_dialogue_history": "Ce lieu ne contient aucun dialogue à revoir.",
            "no_lore_available": "Aucun contexte d'histoire n'est disponible pour ce chapitre.",
            "act_1_completed": "Félicitations ! Vous avez terminé l'Acte 1."
        },
        "ui": {
            "answer_placeholder": "Votre réponse...",
            "dialogue_history_title": "Historique : {nodeName}",
            "history_tab": "Historique",
            "lore_tab": "Contexte",
            "act1": "Acte 1",
            "act2": "Acte 2",
        }
    },
    "frames": { // NOUVEAU BLOC
        "default": {
            "name": "Cadre par Défaut",
            "description": "Le cadre de base pour tout aventurier."
        },
        "cadre_loyaute": {
            "name": "Cadre de Loyauté",
            "description": "Un cadre obtenu en signe de dévouement à sa guilde."
        },
        "supporter": {
            "name": "Cadre du Mécène",
            "description": "Un cadre spécial pour ceux qui soutiennent le jeu."
        },
        "ascended_master": {
            "name": "Cadre de Maître Ascensionné",
            "description": "Débloqué en atteignant le niveau d'Ascension 10."
        }
    },
    "daily_missions": { // MON COMMENTAIRE : Ajout d'un bloc racine pour les noms de missions
        "expeditions": {
            "name": "Lancer 3 expéditions"
        },
        "bosses": {
            "name": "Vaincre 1 boss"
        },
        "crafts": {
            "name": "Fabriquer 1 objet"
        }
    },

}, //fr





































  "en": {
    language_name: "English",
    "frames": {
        "unlocked": "New frame unlocked: {frameName}!"
    },
    "alerts": {
        "daily_missions": {
            "reward_claimed_success": "Reward claimed! +{amount} Ascension Shards!",
            "not_all_complete": "You have not yet completed all your daily objectives."
        },
        "ads": {
            "limit_reached": "You have reached the daily limit for this reward.",
            "reward_granted": "Reward granted!",
            "watch_prompt": "Starting ad...",
            "not_completed": "Ad not completed. No reward.",
            "error": "Error loading ad.",
        },
      language_changed: "Language set to: {langName}", // <-- AJOUTEZ CETTE LIGNE
      language_change_error: "An error occurred while changing the language.",
      "auth": {
        "welcome": "Welcome, {userName}! Your progress will now be saved online.",
        "login_failed": "Login failed. Please try again.",
        "logout_success": "You have been logged out. Your local progress is still saved.",
        "logout_error": "Error during logout. Please try again."
      },
      "load": {
        "combat_reload": "You reloaded the page during a combat. This is considered a defeat by forfeit!",
        "expedition_reload": "You reloaded the page during an expedition. The expedition has been canceled for safety.",
        "dungeon_resume": "Resuming your dungeon session..."
      },
      "class": {
        "select_a_class": "Please select a class!",
        "choice_success": "You are now a {className}! Your skills are available in the combat interface."
      },
      "unequip": {
        "title": "Equipment Update!",
        "description": "Following class changes, the following items were no longer compatible and have been returned to your inventory:"
      },
      "enchant": {
        "invalid_item_type": "Only Rare or better quality items (that are not part of a set) can be enchanted.",
        "unlocked_success": "Enchanting Station unlocked!",
        "upgraded_success": "Enchanting Station upgraded to level {level}!",
        "not_enough_shards": "Not enough Unstable Shards!",
        "rarity_too_low": "Only Rare or higher items can be enchanted."
      },
      "loot": {
        "rarity_downgraded": "A <span class=\"{colorClass}\">{rarityName}</span> item was found, but replaced because your knowledge is insufficient."
      },
      "alchemist": {
        "not_enough_components": "You don't have enough components!",
        "craft_success": "You have prepared: {itemName}!"
      },
      "dungeon": {
        "key_granted": "You have received a new Rift Key!"
      },
      "merchant": {
        "buy_resource_success": "Purchase successful: +{quantity} {resourceName}",
        "not_enough_specific": "You don't have enough {resourceName}!"
      },
      "forge": {
        "craft_success_generic": "You have forged: {itemName}!"
      },
      "leaderboard": {
        "indexing_error": "The leaderboard cannot be loaded. The database index is being created. Please try again in a few minutes."
      },
      "season": {
        "new_season": "A new season begins: it's the {seasonName}!"
      },
      "fief": {
        "level_required": "You must reach level 10 to access the Fief.",
        "fragments_collected": "+{amount} 💠 Fragment(s) collected!",
        "warehouse_full_for_resource": "Your warehouse is full for this resource!",
        "resource_collected": "+{amount} {resourceName} collected!",
        "warehouse_full_remainder_stored": "Warehouse full, the rest is stored.",
        "upgrade_success": "{buildingName} upgraded to level {level}!",
        "balm_produced": "Your Infirmary has prepared {amount} Triage Balm(s)!",
        "warehouse_full_specific": "Warehouse full for: {resources}! Upgrade it in the Fief."
      },
      "garden": {
        "not_ready": "This plant is not ready yet!",
        "infestation_win": "You have defeated the creatures! You can now harvest safely.",
        "infestation_flee": "You fled the combat! The creatures devoured part of your harvest.",
        "synergy_success": "✨ SYNERGY! {oldPlant} transforms into {newPlant}!",
        "expansion_success": "Your garden is expanding!",
        "uproot_confirm": "Are you sure you want to uproot {plantName}?<br><br>You will not receive any resources or seeds in return.",
        "uproot_success": "{plantName} has been uprooted.",
        "no_seeds_to_plant": "You have no seeds to plant.",
        "no_seed_selected": "Please select a seed to plant.",
        "plant_success": "You have planted: {plantName}!",
        "action_impossible": "Action impossible on this plot.",
        "harvest_success": "Harvest: +{amount} {resource} and {seeds} seed(s)!",
        "harvest_partial": "Partial Harvest: +{amount} {resource} and {seeds} seed(s)."
      },
      "warehouse_full": "Warehouse full for: {resources}",
      "food": {
        "use_success": "You eat {itemName}. The effect will last for {duration} combats."
      },
      "parsing_error": "Save parsing error, resetting.",
      "combat_quit": "You quit the game during a combat. This is a defeat by forfeit!",
      "expedition_quit": "You reloaded the page during an expedition. For safety, the expedition has been canceled.",
      "dungeon_resume": "Resuming your dungeon session...",
      "game_reset": "The game has been reset. The page will now reload.",
      "infirmery_bonus": "Thanks to your Infirmary, the rest time is reduced by {reductionPercent}%!",
      "talent_stat_bonus": "'Potential Unleashed' Talent: +{points} bonus stat point(s)!",
      "level_up": "Congratulations! You have reached level {level}! You gain {points} stat points to assign.",
      "hp_mana_restored": " Your health and mana are restored.",
      "enter_name": "Please enter a name for your character!",
      "choose_class": "Please choose a class for your character!",
      "overwrite_save_confirm": "A character (<strong>{name}</strong> - Lvl. {level}) already exists on this account.<br><br>Do you really want to overwrite it and create a new one?<p class=\"online-warning\">This action is IRREVERSIBLE and will delete your online character.</p>",
      "guest_save_confirm": "You are about to create a character as a guest.<br><br>Its progress will only be saved on this device and will not be available online.",
      "defense_cap_reached": "You can only increase Defense once every 10 levels.",
      "achievement_reward_unlocked": "New achievement reward available!",
      "achievement_reward_claimed": "Reward claimed: {achievementName}!",
      "reward_none": "None",
      "reward_special": "Special Reward",
      "unknown_reward_type": "Unknown reward type:",
      "passive_special": "Special Passive",
      "inventory_error_not_found": "Item not found in inventory!",
      "class_restriction_error": "You are a {playerClass}. This item is reserved for the following class(es): {requiredClasses}.",
      "item_locked_recycle_error": "This item is locked and cannot be recycled.",
      "recycle_irreversible_confirm": "Are you sure you want to recycle \"<strong>{itemName}</strong>\"?<br><br>This action is irreversible.",
      "recycle_success_toast": "You have recycled {itemName} (+{fragmentsGained} 💠)",
      "cannot_recycle_error": "This item cannot be recycled.",
      "no_unlocked_items_to_recycle": "No unlocked items to recycle.",
      "recycle_all_confirm": "Are you sure you want to recycle all your <strong>unlocked</strong> items?<br><br>You will destroy <strong>{itemCount} item(s)</strong> for a total of <strong>{fragmentCount} 💠 fragments</strong>.<br><br>This action is <strong>IRREVERSIBLE</strong>.",
      "recycle_all_success_toast": "Recycling complete! You have gained {fragmentsGained} 💠 fragments.",
      "forge_unlocked_success": "Congratulations! You have unlocked the Level 1 Forge.",
      "not_enough_resources": "Not enough resources!",
      "forge_max_level": "The forge is already at its maximum level!",
      "forge_talent_required": "You must first unlock the \"{rarityName} Knowledge\" talent in the Destiny constellation to upgrade the forge to this level.",
      "forge_upgraded_success": "Forge upgraded to level {level}!",
      "free_craft_success_toast": "🍀 Lucky! Free craft thanks to your talent!",
      "missing_cost": "Missing cost: {missingResources}",
      "craft_success_toast": "You have crafted: {itemName}!",
      "village": {
        "cook_locked": "You must reach level 15 to access the kitchen.",
        "bounty_master_locked": "You must complete a 'Medium' difficulty bounty or higher to unlock."
      },
      "cook": {
        "not_enough_ingredients": "You don't have enough ingredients!",
        "craft_success": "You have cooked: {itemName}! Find it in your inventory."
      },
      "merchant": {
        "buy_fragments_success": "Purchase successful: +{quantity} 💠 Fragment(s)",
        "exchange_min_amount": "You must exchange at least 10 resources.",
        "exchange_same_resource": "You cannot exchange a resource for itself.",
        "exchange_not_enough": "You don't have enough {resourceName}.",
        "exchange_success": "Exchange successful: +{amountGained} {resourceName}"
      },
      "bug_report": {
        "save_generation_error": "Error during save generation."
      },
      "bounty": {
        "no_tokens": "You don't have any bounty tokens.",
        "use_token_confirm": "Do you want to use 1 Token to refresh the bounties?",
        "refresh_success": "The bounties have been refreshed!",
        "start_busy": "You can't do that right now, you are busy or resting!",
        "start_confirm": "Start the hunt for <strong>{bountyName}</strong>?<br><br>This is a direct combat, with no possibility of escape.",
        "master_unlocked": "You have proven your worth! The Bounty Master now grants you his attention.",
        "completed_title": "Bounty Completed!",
        "completed_desc": "You have defeated {bountyName} and receive your reward:<br>{rewardText}",
        "buy_set_item_success": "You have purchased: {itemName}!",
        "not_enough_marks": "Not enough Hunter's Marks!",
        "knowledge_too_low": "Your knowledge of the world is insufficient to acquire an item of {rarityName} rarity. Progress in the Destiny constellation to unlock it."
      },
      "reset": {
        "confirm_body": "Are you absolutely sure you want to reset your progress?<br><br><strong>All your save data will be permanently lost.</strong>",
        "online_warning": "<p class=\"online-warning\">WARNING: You are logged in. This action will also irreversibly delete your online save.</p>"
      },
      "ascension": {
        "unlocked": "Ascension !",
        "success": "You have transcended! You are now at Ascension level {newAscensionLevel} and have gained {totalPoints} Constellation Points.",
        "level_required": "You must reach level 50 to unlock Ascension.",
        "reincarnation_success": "You are reincarnated as a {className}!"
      },
      "constellation": {
        "max_level": "Maximum level already reached.",
        "not_enough_pc": "Not enough Constellation Points.",
        "dependency_not_met": "You must unlock the previous talent first.",
        "unlock_success": "Talent \"{talentName}\" level {level} unlocked!",
        "unspent_points_confirm": "You still have points to spend in the following tree(s):<br><strong>{trees}</strong>.<br><br>Are you sure you want to quit?"
      },
      "reroll": {
        "not_enough_fragments": "Not enough fragments! Cost: {cost} 💠",
        "no_traits_left": "No other traits available to draw!"
      },
      "traits": {
        "new_card_collected": "New card added to your collection: {cardName}!",
        "trait_acquired_title": "New Trait Acquired!",
        "trait_acquired_desc": "You have chosen: {traitName}"
      },
    "death": {
        "life_regained": "You have regained a life! ({count} lives remaining)",
        "life_used": "You used a life to get back into the fight faster.",
        "bypass_confirm": "Do you want to spend {cost} Ascension Shards to revive immediately?",
        "bypass_success": "You feel reinvigorated! The rest penalty has been canceled.",
    },
    },
    "ui": {
        "guild": {
            "menu_title": "🛡️ Guild",
            "contribution_title": "Contribute to the Guild",
            "modal_title_my_guild": "My Guild",
            "modal_title_find": "Join a Guild",
            "modal_title_create": "Create a Guild",
            "no_guild_text": "You are not in a guild. What would you like to do?",
            "create_button": "Create Guild",
            "find_button": "Find a Guild",
            "leave_button": "Leave Guild",
            "name_label": "Guild Name (3-20 characters)",
            "tag_label": "Tag (3-4 characters)",
            "create_cost": "Creation cost: {cost} <img src=\"assets/sprites/ressources/eclats_ascension.png\" class=\"icon-sprite-small\">",
            "confirm_creation_button": "Confirm Creation",
            "find_wip": "Guild search is now available!", // Modified
            "search_placeholder": "Search by name or tag...", // Added
            "search_button": "Search", // Added
            "join_button": "Join", // Added
            "back_button": "Back", // Added
            "no_results": "No guilds match your search.", // Added
            "is_full": "Full",
            "level": "Level {level}",
            "members": "Members ({count}/{max})",
            "xp_progress": "Experience",
            "xp_details": "{currentXP} / {requiredXP} EXP", // NEW LINE
            "tab_guild": "Guild",
            "tab_members": "Members",
            "tab_chat": "Chat",
            "contribute_button": "Contribute",
            "contribution_modal_title": "Donate to the Guild",
            "contribution_charges_label": "Donations available: {count} / {max}",
            "contribution_next_charge_label": "Next donation in: {time}",
            "contribution_info": "Each donation costs {cost} resources and provides {xp} EXP to the guild. You earn {currency} Guild Mark per donation.",
            "contribution_title": "Contribute to the Guild",
            "contribution_desc": "Donate resources to earn experience for your guild. 1 resource = 1 EXP.",
            "contribute_wood": "Wood",
            "contribute_metal": "Metal",
            "contribute_cloth": "Cloth",
            "guild_chat": "Guild Chat",
            "guild_boss": "Guild Boss",
            "guild_shop": "Guild Shop",
            "manage_button": "Manage",
            "manage_permissions_title": "Manage Permissions",
            "rank_R0": "Leader",
            "rank_R1": "Officers",
            "rank_R2": "Members",
            "rank_R3": "Recruits",
            "permission_canInvite": "Invite members",
            "permission_canKick": "Kick members",
            "permission_canEditRanks": "Manage ranks",
            "permission_canEditGuildInfo": "Edit guild info",
            "permission_use_guild_money": "Use Guild Bank",
            "power_score_abbr": "Power",
            "ascension_level_abbr": "Asc.",
            "members_header_title": "Guild Members ({current}/{max})",
            "power_score_abbr": "Power", // NEW
            "permission_canInvite": "Invite members",
            "permission_canKick": "Kick members",
            "permission_canEditRanks": "Manage ranks",
            "permission_canEditGuildInfo": "Edit guild info",
            "guild_logs": "Guild Log", // New key
            "logs_modal_title": "Guild Log",
            "tab_boss": "Boss", // NEW LINE
            "boss_unlock_level": "Unlocked at guild level {level}",
            "no_active_boss": "No guild boss is currently active.",
            "start_boss_fight": "Start Boss Fight",
            "permission_canManageBoss": "Manage Guild Bosses",
        },
        "guild_boss": { // ENTIRE NEW BLOCK
            "title": "Guild Boss",
            "time_remaining": "Time remaining: {time}",
            "total_damage": "Total Guild Damage:",
            "attack_button": "Attack",
            "attempts_left": "Attempts left: {count}",
            "your_best_damage": "Your best score: {damage}",
            "leaderboard_title": "Damage Ranking",
            "rank": "Rank",
            "member": "Member",
            "damage": "Damage",
            "end_in_progress": "The fight is ending, calculating rewards...",
            "boss_defeated": "Boss Defeated!",
            "fight_failed": "Time is up! The boss escaped."
        },
        "guild_shop": { // New object for the shop
            "title": "Guild Shop",
            "tab_personal": "Personal",
            "tab_guild": "Guild",
            "personal_marks": "Your Marks",
            "guild_bank": "Guild Bank",
            "buy_button": "Buy",
            "owned_button": "Owned",
            "item_level_req": "Lvl. {level} required",
            "duration": "Duration: {hours}h",
            "items": {
                "cache_initie": { "name": "Initiate's Cache", "description": "A small chest containing 250 Fragments and 50 Unstable Shards." },
                "anneau_confrerie": { "name": "Ring of the Brotherhood", "description": "A ring proving your allegiance. Grants Health, Luck, and an XP bonus." },
                "cadre_loyaute": { "name": "Frame of Loyalty", "description": "An exclusive profile frame for dedicated members." },
                "guild_xp_boost_1": { "name": "Blessing of Wisdom (+5% XP)", "description": "Increases XP gains by 5% for the entire guild." },
                "guild_resource_boost_1": { "name": "Horn of Plenty (+10% Res.)", "description": "Increases base resource gains by 10% for the entire guild." },
                "guild_strength_boost_1": { "name": "War Cry (+10% Strength)", "description": "Increases Strength for all members by 10%." }
            }
        },
        "guild_logs": { // New object
            "joined": "{memberName} has joined the guild.",
            "left": "{actorName} has left the guild.",
            "expelled": "{actorName} has expelled {targetName}.",
            "rank_changed": "{actorName} has changed {targetName}'s rank to {newRankName}.",
            "loading": "Loading events...",
            "empty": "No events recorded yet."
        },
        "guild_member_actions": { // NEW BLOCK
            "modal_title": "Actions for {memberName}",
            "add_friend": "Add as friend",
            "chat": "Private message",
            "manage_rank": "Manage Rank",
            "rank_modal_title": "Change {memberName}'s rank",
            "confirm_rank_change": "Are you sure you want to change {memberName}'s rank to {newRankName}?",
            "leader_transfer_confirm": "You are about to transfer leadership of the guild to {memberName}.<br><br>You will become an Officer, and this action is <strong>IRREVERSIBLE</strong>.<br><br>Are you absolutely sure?",
            "rank_change_success": "{memberName}'s rank has been updated.",
            "rank_change_error": "Error changing rank : {error}",
            "cannot_change_own_rank": "You cannot change your own rank.",
            "expel_button": "Expel Player",
            "expel_confirm": "Are you sure you want to expel {memberName} from the guild? This action is final.",
            "expel_success": "{memberName} has been expelled from the guild.",
            "expel_error": "Error during expulsion: {error}"
        },
        "alerts": {
            "guild": {
                "confirm_create": "Are you sure you want to spend {cost} Ascension Shards to create the guild \"{name}\" [{tag}]?",
                "not_enough_ea": "You don't have enough Ascension Shards!",
                "name_too_short": "Guild name must be at least 3 characters long.",
                "tag_invalid": "Tag must be between 3 and 4 characters.",
                "creation_success": "Guild \"{name}\" created successfully!",
                "already_in_guild": "You are already in a guild.",
                "name_taken": "This guild name is already taken.",
                "tag_taken": "This guild tag is already taken.",
                "creation_failed": "Error creating guild: {error}",
                "confirm_join": "Are you sure you want to join the guild \"{guildName}\"?", // Added
                "join_success": "You have joined the guild {guildName}!", // Added
                "join_failed": "Failed to join guild: {error}", // Added
                "is_full": "This guild is full.", // Added
                "contribution_success": "Thank you! Your guild gains {amount} EXP.",
                "contribution_failed": "Donation failed: {error}", // NEW LINE
                "invalid_contribution_amount": "Please enter a valid amount greater than zero.",
                "not_enough_charges": "You have no more donations available. Wait for them to recharge.",
                "contribution_level_up": "Your guild has reached level {level}!",
                "leave_confirm": "Êtes-vous sûr de vouloir quitter la guilde \"{guildName}\" ?","leave_confirm": "Are you sure you want to leave the guild \"{guildName}\"?",
                "delete_confirm": "You are the last member and the leader. Leaving the guild will permanently delete it. Are you sure?",
                "leader_cant_leave": "You cannot leave the guild as you are the leader. You must first appoint a successor.",
                "leave_success": "You have left the guild.",
                "delete_success": "The guild has been disbanded.",
                "leave_error": "An error occurred while leaving the guild.",
                "leave_confirm_generic": "Are you sure you want to leave the guild {guildName}?",
                "leader_leave_error": "As the leader, you cannot abandon your guild while it has members. Transfer leadership or be the last one to leave.",
                "leader_demote_error": "The leader cannot be demoted. Transfer leadership to an Officer first.", // NEW LINE
                "no_permission_manage_ranks": "You do not have permission to manage ranks.",
                "permissions_saved": "Permissions saved successfully!", // Clé ajoutée
                "permissions_save_error": "Error while saving: {error}", // Clé ajoutée
                "disband_success": "You have disbanded the guild.",
                "contribution_in_progress": "Contribution in progress, please wait...",
                "expelled": "You have been kicked from the guild.",
                "confirm_buy_guild_boost": "Are you sure you want to spend {cost} Marks from the guild bank to activate the '{boostName}' boost for all members?",
                "not_enough_guild_marks": "The guild bank does not have enough Marks.",
                "no_permission_buy_boost": "You do not have permission to use the guild bank.",
                "confirm_buy_personal": "Are you sure you want to spend {cost} Guild Marks to buy '{itemName}'?",
                "buy_success": "Purchase successful: {itemName}!",
                "item_already_owned": "You already own this item.",
                "boss_start_confirm": "Are you sure you want to summon the boss '{bossName}'?\nAll members will have 24 hours to attack it.",
                "boss_already_active": "A guild boss is already active!",
                "no_permission_start_boss": "You do not have permission to start a boss fight.",
                "guild_level_too_low": "Your guild must be at least level {level} to start this fight.",
                "no_attempts_left": "You have already used your two attempts against this boss.",
                "boss_attack_confirm": "You are about to use one of your two attempts to attack the boss. Are you sure?",
            }
        },
        "lives": { // Nouvel objet
            "next_in": "(+1 in {minutes}:{seconds})"
        },
        "lives_modal": {
            "title": "Lives Management",
            "current_lives": "Current Lives: {count} / {max}",
            "next_life_in": "Next life in: {minutes}:{seconds}",
            "lives_at_max": "Your lives are at maximum.",
            "buy_one_life_desc": "Restore one life to continue the adventure.",
            "buy_one_life_button": "Buy 1 Life ({cost} AS)",
            "buy_max_lives_button": "Buy (+{cost} AS)",
            "buy_one_life_button": "Buy 1 Life ({cost} <img src='assets/sprites/ressources/eclats_ascension.png' class='icon-sprite-small'>)",
            "buy_max_lives_button": "Increase Max (+1) ({cost} <img src='assets/sprites/ressources/eclats_ascension.png' class='icon-sprite-small'>)",
            "buy_one_success": "You have bought a life!",
            "buy_max_success": "Your maximum lives has been increased!",
            "buy_max_lives_limit_reached": "You have reached the purchase limit for this upgrade.",
            "already_at_max": "Your lives are already at maximum!",
        },
        "stamina": {
            "full": "(Max)"
        },
        "options": { // Missing object
            "general": {
                "title": "General",
                "language_label": "Language:"
            }
        },
        "unlock_prompts": {
            "expeditions": "Unlocked through Adventure.",
            "patrol": "Unlocked via the Destiny Constellation.",
            "dungeon": "Unlocked via Adventure (Act 4).",
            "village": "Unlocked through Adventure (Act 1).",
            "fief": "Unlocked through Adventure (Act 1).",
            "enchanter": "Requires Forge Lvl 3 and unlocked via Adventure.",
            "alchemist": "Unlocked through Adventure (Act 1).",
            "cook": "Requires Level 15 and unlocked via Adventure.",
            "bounties": "Unlocked through Adventure (Act 2)."
        },
        "item_details": {
            "quantity": "Quantity",
            "description": "Description",
            "stats": "Statistics",
            "bonus": "Bonus",
            "resource_desc": "A basic resource used for crafting and upgrades."
        },
        "inventory_modal": {
            "title": "Full Inventory",
            "tab_resources": "Resources",
            "tab_consumables": "Consumables",
            "tab_equipment": "Equipment",
            "sort_by": "Sort by:",
            "sort_logical": "Logical",
            "sort_alpha": "Alphabetical",
            "sort_quantity_desc": "Quantity (Descending)",
            "sort_quantity_asc": "Quantity (Ascending)",
            "sort_rarity": "Rarity",
            "sort_type": "Type"
        },
        "shop": {
            "title": "Shop",
            "premium_currency_title": "Ascension Shards",
            "upgrades_title": "Upgrades",
            "ad_premium_reward": "+5 Ascension Shards",
            "free_rewards_title": "Free Rewards",
            "watch_ad_button": "Watch",
            "packs_title": "Packs", // ADD THIS LINE
            "pack_starter_title": "Starter Pack", // ADD THIS LINE
            "pack_starter_description": "A perfect boost to begin your Ascension!\n\nContains:\n- 300 Ascension Shards\n- 5,000 Fragments\n- 10,000 of each basic resource (Wood, Metal, Cloth)\n- 5 Rift Keys", // ADD THIS LINE
            "pack_monthly_title": "Monthly Blessing", // ADD THIS LINE
            "pack_monthly_description": "Daily support for dedicated adventurers.\n\nEffects:\n- Instantly receive 500 Ascension Shards.\n- Receive an additional 50 Ascension Shards on your first login each day for 30 days.\n- Total: 2,000 Ascension Shards!", // ADD THIS LINE
            "max_lives_pack_1": {
                "name": "Max Lives +1 Pack",
                "description": "Permanently increases your maximum number of lives."
            },
        },
        "loading_messages": [
            "Aligning the constellations...",
            "Polishing the echo shards...",
            "Weaving the threads of fate...",
            "Consulting the oracle...",
            "Harmonizing the Dissonance...",
            "Awakening ancient memories..."
        ],
      loading_language_change: "Changing language...",
      "adventure": {
        
        "act1":"Act 1",
        "act2":"Act 2",
        "act3":"Act 3",
        "act4":"Act 4",
        "answer_placeholder": "Your answer...",
        "dialogue_history_title": "History: {nodeName}"
      },
      "bug_report": {
        "status_sending": "Sending...",
        "status_success": "Report sent successfully! Thank you.",
        "status_error": "Error while sending. Please try again.",
        "status_network_error": "Network error. Please try again."
      },
      "app_title": "Ascencia - The Text RPG",
      "creation": {
        "title": "Character Creation",
        "welcome_back": "Hello, <strong>{userName}</strong>! Create a new character for your account.",
        "welcome_guest": "Already have an account? <button class=\"link-button\" onclick=\"signInWithGoogle()\">Log in</button> to load your character.",
        "points_to_spend": "Points to spend:",
        "points_to_assign": "Points to assign:",
        "logout_button": "Logout",
        "name_label": "Character name:",
        "class_label": "Choose your class:",
        "guerrier_name": "Warrior",
        "guerrier_desc": "Master of close combat, sturdy and powerful. (Recommended)",
        "archer_name": "Archer",
        "archer_desc": "Expert of the bow, agile and precise at a distance.",
        "mage_name": "Mage",
        "mage_desc": "Manipulator of the arcane, capable of devastating spells.",
        "points_label": "Points to distribute",
        "create_button": "Create Character",
        "name_placeholder": "Enter a name...",
        "reset_stats_label": "Reset my stat points (recommended)"
      },
      "main_menu": {
        "profile": "👤 Profile",
        "achievements": "🏆 Achievements",
        "daily_missions": "📅 Missions",
        "mail_menu": "✉️ Mailbox",
        "leaderboard": "🏆 Leaderboard",
        "statistics": "📜 Statistics",
        "inventory": "🎒 Inventory",
        "shop":"💰 Shop",
        "login": "Login",
        "logout": "Logout",
        "options": "⚙️ Options",
        "patch_notes": "📝 Patch Notes",
        "reset_s": "⚠️ Reset",
        "bug_report_s": "🐛 Bug Report"
      },
    "mail": {
        "modal_title": "Mailbox",
        "delete_read_button": "Delete Read",
        "back_button": "Back",
        "sender_label": "From:",
        "attachments_label": "Attachments:",
        "claim_all": "Claim All",
        "rewards_claimed": "Rewards Claimed",
        "no_messages": "Your inbox is empty.",
        "no_deletable_messages": "No read messages to delete.",
        "delete_success": "{count} message(s) deleted.",
        "delete_confirm": "Are you sure you want to delete all read messages without rewards?",
        "claim_success": "Rewards have been added to your inventory!",
        "notification_badge_title": "New messages"
    },
    "daily_missions": {
        "modal_title": "Daily Missions",
        "modal_description": "Complete all daily objectives to receive a special reward! Progress resets daily at midnight.",
        "progress_label": "{current}/{target}",
        "reward_label": "Final Reward:",
        "claim_button": "Claim Reward",
        "all_missions_complete": "Complete all objectives to claim the reward.",
        "already_claimed": "Reward already claimed today. Come back tomorrow!",
        "notification_title": "Daily Missions",
        "notification_body": "Your daily objectives have been reset!"
    },
    "profile": { // NEW BLOCK
        "title": "My Profile",
        "change_avatar": "Change Avatar",
        "upload_limits": "Max size: 1MB. Formats: JPG, PNG, WEBP.",
        "cooldown_active": "Next change available in: {time}",
        "bypass_cooldown": "Bypass for {cost} Shards?",
        "frames_title": "My Frames",
        "confirm_bypass": "Do you want to spend {cost} Ascension Shards to change your avatar now?",
        "upload_success": "Avatar updated!",
        "upload_error": "Upload error: {error}",
        "upload_invalid_type": "Invalid file type. Please choose an image.",
        "upload_too_large": "File is too large (max 1MB).",
        "not_enough_shards": "Not enough Ascension Shards.",
        "public_title": "{playerName}'s Profile",
        "level_display": "Level {level} (Ascension {ascLvl})",
        "manage_frames": "Manage Frames",
        "bypass_confirm_title": "Skip the wait?",
        "bypass_confirm_body": "Next possible change in: {time}.<br><br>Do you want to spend {cost} Ascension Shards to skip this time?",
        "bypass_button_label": "Skip ({cost} Shards)",
        "bypass_success": "Wait canceled! You can now change your avatar."
    },
    "frames_modal": { // NEW BLOCK
        "title": "Choose a Frame",
        "select_button": "Equip",
        "status_owned": "Owned",
        "unlock_supporter": "Purchase any pack in the shop."
    },
    "report_player": { // NEW BLOCK
        "title": "Report a Player",
        "button_text": "Report",
        "reason_label": "Reason for reporting:",
        "reasons": {
            "name": "Inappropriate username",
            "avatar": "Inappropriate profile picture",
            "other": "Other (specify below)"
        },
        "details_label": "Details (optional):",
        "details_placeholder": "Provide more context if necessary...",
        "submit_button": "Send Report",
        "status_sending": "Sending...",
        "status_success": "Report sent. Thank you.",
        "status_error": "Error sending report."
    },
      "main_actions": {
        "fief_button": "🏰 Go to Fief",
        "ascension_button": "⭐ Ascension",
        "return_to_game": "Return to game"
      },
      "panels": {
        "attributes": "Attributes",
        "detailed_stats": "Detailed Stats",
        "tabs": {
          "combat": "Combat",
          "global": "Global",
          "traits": "Traits"
        },
        "equipment": "Equipment",
        "inventory": "Inventory",
        "rare_components": "Rare Components",
        "consumables": "Consumables",
        "bottom_tabs": {
          'character': '👤 Profil',
          'personnage': '👤 Character',
          "village": "🏡 Village",
          "codex": "📖 Codex",
          "mastery": "🏆 Mastery",
            "social": "🤝 Social"
        }
      },
      "chat": { // NEW BLOCK
            "title": "Messaging",
            "tab_guild": "Guild",
            "tab_private": "Private",
            "placeholder_guild": "Send a message to the guild...",
            "placeholder_private": "Write a message...",
            "send_button": "Send",
            "no_conversations": "You don't have any private conversations at the moment.",
            "start_conversation_prompt": "Start a chat from a player's profile or guild member list.",
            "loading_chat": "Loading messages...",
            "chat_disabled": "Chat is disabled.",
            "chat_disabled": "Chat is disabled.",
            "cooldown": "Please wait 5 seconds between messages." // Added this line
        },
      "death": {
        "title": "You are out of strength!",
        "description": "You have been brought back to the nearest village to rest.",
        "timer_label": "Remaining rest time",
        "description_options": "Choose an option to continue or wait for the countdown to end.",
        "no_lives_info": "No lives available. Next one in: {minutes}:{seconds}",
      },
      "expeditions": {
        "tabs": {
          "aventure": "📜 Aventure",
          "expeditions": "🗺️ Expeditions",
          "patrol": "⏳ Patrol (AFK)",
          "dungeon": "🌀 Dungeon"
        },
        "available_expeditions": "Available Expeditions",
        "refresh_button": "Refresh",
        "boss_button": "Face the Boss!"
      },
      "combat": {
        "title": "Combat in progress!",
        "round_label": "Round:",
        "player_hp": "Your HP:",
        "player_mana": "Your Mana:",
        "tabs": {
          "skills": "Skills",
          "consumables": "Consumables"
        },
        "flee_button": "Flee (Loss of resources and XP)"
      },
      "village": {
        "district_artisans": "Artisans' Quarter",
        "district_merchants": "Merchants' Quarter",
        "district_mystic": "Mystic Quarter",
        "buildings": {
          "forge": "🔥 Forge",
          "enchanter": "✨ Enchanter",
          "alchemist": "🧪 Alchemist",
          "cook": "🍳 Cook",
          "merchant": "💰 Merchant",
          "bounty_master": "⚔️ Bounty Master",
          "bounties": "🎯 Bounties",
          "oracle": "🔮 Oracle",
          "upgrade_complete_toast": "{buildingName} (Lvl {level}) finished!"
        }
      },
      "cook": {
        "bonus_label": "Bonus:",
        "combats_unit": "combats",
        "cost_label": "Cost:",
        "cook_button": "Cook",
        "title": "Fief's Kitchen",
        "description": "Prepare dishes that grant temporary bonuses for your next combats."
      },
      "oracle": {
        "collection_label": "Collection:",
        "bonus_label": "Bonus:",
        "no_families_started": "No card families started. Get your first card during your next trait selection!",
        "missing_card_alt": "Missing card",
        "missing_card_text": "Missing",
        "title": "Oracle's Sanctuary",
        "description": "View your collection of Destiny Cards and the family bonuses you have unlocked.",
        "families_title": "Card Families"
      },
      "mastery": {
        "tier_header": "Tier {tierName} ({kills} kills)",
        "enemies_label": "enemies",
        "reward_label": "Reward:",
        "title": "Codex Mastery Tiers",
        "description": "Reach mastery tiers on different enemies to unlock permanent global bonuses.",
        "active_bonuses": "Active Bonuses",
        "milestones_progress": "Milestones Progress"
      },
      "modals": {
        "options_title": "Export Save",
        "options_desc": "Use this option to copy your current progress. Keep this code in a safe place so you can re-import it later or on another device.",
        "options_export_placeholder": "Click 'Export' to generate your save code...",
        "options_export_button": "Export and Copy",
        "import_title": "Import Save",
        "import_desc": "Paste a valid save code in the field below. Be careful, this will overwrite your current game without warning.",
        "import_placeholder": "Paste your save code here...",
        "import_button": "Import Game",
        "reset_title": "Reset Game",
        "reset_desc": "The action below is irreversible and will result in the total loss of your progress.",
        "erase_progress_title": "Erase Progress",
        "erase_progress_desc": "This action will completely erase your character, your inventory, and all your achievements. You will start over from the very beginning. <strong>This action is final.</strong>",
        "erase_progress_button": "Reset My Progress",
        "stats_title": "Game Statistics",
        "leaderboard_title": "🏆 Champions' Leaderboard",
        "leaderboard_tabs": {
          "power": "Power",
          "expeditions": "Expeditions",
          "bosses": "Bosses Defeated",
          "dungeon": "Dungeon",
          "codex": "Codex",
          "xp": "XP Gained"
        },
        "achievements_title": "🏆 Achievements",
        "bug_report_title": "Report a Bug",
        "bug_category_label": "Bug category:",
        "bug_categories": {
          "display": "Interface / Display",
          "combat": "Combat",
          "expedition": "Expedition / Event",
          "save": "Save",
          "other": "Other"
        },
        "bug_desc_label": "Bug description:",
        "bug_desc_placeholder": "Please describe the problem as precisely as possible...",
        "bug_cancel_button": "Cancel",
        "bug_submit_button": "Send Report",
        "class_choice_title": "Choose Your Path!",
        "class_choice_desc": "Your character needs to specialize. Choose a class to continue your adventure. This choice is final!",
        "class_choice_guerrier_desc": "Their attacks depend on <strong>Strength</strong>.",
        "class_choice_archer_desc": "Their attacks depend on <strong>Agility</strong>.",
        "class_choice_mage_desc": "Their spells depend on <strong>Intelligence</strong> and consume <strong>Mana</strong>.",
        "constellation_pc": "CP:",
        "constellation_trees": {
          "destiny": "Destiny",
          "guerrier": "Warrior",
          "archer": "Archer",
          "mage": "Mage"
        },
        "infobox_title": "Astral Observatory",
        "infobox_desc": "Click on a constellation to display its details here.",
        "trait_choice_title": "Destiny Offers You a Choice",
        "trait_choice_desc": "Choose a trait that will shape your Ascension. This choice is final.",
        "trait_choice_confirm": "Confirm Choice"
      },
      "footer": {
        "copyright": "&copy; 2025 Ascencia. All rights reserved.",
        "discord": "Join us!",
        "version": "Version 0.9.0 (Beta)",
        "contact": "Contact"
      },
      "achievement_notification_label": "New reward!",
      "no_achievements_in_category": "No achievements in this category.",
      "achievement_claimed": "Achievement Completed",
      "claim_button": "Claim",
      "unlocked_bonuses_label": "Bonuses already acquired:",
      "buttons": {
        "continue": "Continue",
        "back_to_districts": "← Back to Quarters",
        "close": "Close",
        "confirm": "Confirm class",
        "confirm_generic": "Confirm",
        "back_to_selection": "← Back to selection",
        "ascend": "Ascend!",
        "maxed_out": "Maxed Out",
        "not_enough_pc": "Not Enough CP",
        "confirm_path": "Confirm Path",
        "reroll": "↺ Reroll",
        "flip": "⇆ Flip",
        "confirm_choice": "Confirm Choice",
        "collect": "Collect",
        "build": "Build",
        "uproot": "Uproot",
        "harvest": "Harvest",
        "plant": "Plant",
        "cancel": "Cancel",
        "flee": "Flee",
        "stay": "Stay",
        "enter": "Enter",
        "buy": "Buy",
        "sell": "Sell",
        "leave":"Leave",
        "submit":"Submit",
        "build": "Build",
        "upgrade": "Upgrade",
        "save_changes": "Save Changes",
        "bypass_death_penalty": "Bypass ({cost} {ea_icon})",
        "revive_with_life": "Use a Life ({count})",
        "revive_with_ad": "Watch Ad ({count}/3)",
        "bypass_death_penalty": "Bypass ({cost} {ea_icon})",
      },
      "items": {
        "special": {
          "fragment_bundle": "Fragment Bundle",
          "fragment_bundle_info": "Contains {amount} fragments"
        }
      },
      "traits": {
        "missing_image_alt": "Missing image",
        "family_label": "Family:",
        "selection_modal_title": "Destiny Offers You a Choice",
        "selection_modal_desc": "Choose a trait that will shape your Ascension. This choice is final.",
        "no_traits_acquired": "No traits acquired for this Ascension.",
        "active_traits_title": "Active Traits",
        "trait_prefix": "Trait: "
      },
      "fief": {
        "title": "Your Fief",
        "description": "Manage and upgrade your domain to obtain passive bonuses and resources.",
        "special_resources_title": "Your Rare Resources",
        "buildings_title": "Domain Buildings",
        "garden_title": "The Evolving Garden",
        "garden_wip": "The garden system is under development...",
        "seeds_title": "Your Seeds",
        "infirmary_penalty_reduction": "Penalty reduction:",
        "infirmary_production": "Produces: {amount} Balm / {hours}",
        "infirmary_next_balm": "Next balm in:",
        "warehouse_capacity": "Current capacity:",
        "stock_label": "Stock",
        "full_in_timer": "Full in:",
        "level_indicator": "(Lvl. {currentLevel})",
        "build_prompt": "Build this building to start benefiting from it.",
        "next_level_label": "At the next level:",
        "next_level_penalty": "→ Penalty reduction: {reduction}",
        "next_level_production": "→ Production: {amount} Balm / {hours}",
        "next_level_capacity": "Next level: {capacity}",
        "current_production_per_hour": "Current production: {production} / hour",
        "next_level_production_per_hour": "Next level: {production} / hour",
        "not_built_yet": "This building is not yet built.",
        "status_full": "Full!",
        "status_calculating": "Calculating...",
        "tabs": { // Missing object
            "buildings": "Buildings",
            "garden": "Garden"
        },
        "under_construction": "Under Construction",
        "construction_time_left": "Time left:",
        "upgrade_complete_toast": "{buildingName} (Lvl {level}) finished!",
        "speed_up_button": "Speed Up ({cost} {ea_icon})",
        "speed_up_confirm_body": "Do you want to spend <strong>{cost} Ascension Shards</strong> to instantly complete the upgrade of <strong>{buildingName}</strong>?",
        "not_enough_ea": "Not enough Ascension Shards!",
        "upgrade_confirm_title": "Confirm Upgrade",
        "upgrade_confirm_body": "Do you really want to upgrade <strong>{buildingName}</strong> to level <strong>{level}</strong>?<br><br><strong>Cost:</strong> {cost}<br><strong>Duration:</strong> {duration}"
      },
    "garden": {
        "current_season": "Current season: {seasonName}",
        "season_change_timer": "Changes in {days}d {hours}h",
        "tier_goal_1": "2x2 Garden. Next goal: Unlock a <strong>Tier 1</strong> plant.",
        "tier_goal_2": "2x3 Garden. Next goal: Unlock a <strong>Tier 2</strong> plant.",
        "tier_goal_3": "3x3 Garden. Next goal: Unlock a <strong>Tier 3</strong> plant.",
        "tier_goal_max": "4x4 Garden. Maximum size reached!",
        "status_ready": "Ready!",
        "empty_plot": "Empty plot",
        "your_seeds_title": "Your Seeds",
        "no_seeds": "No seeds. Explore the world!",
        "seed_select_title": "Choose a seed",
        "seed_select_prompt": "Which seed do you want to plant?",
        "seed_owned": "Owned: {count}",
        "growth_time": "Growth time:",
        "harvest_yield": "Harvest yield:",
        "acquisition_method": "How to get:",
        "synergy_acquisition_title": "Obtained through Synergy:",
        "undiscovered_ingredient": "Undiscovered ingredient",
        "any_plant_of_type": "Any plant of type '{type}'",
        "during_season": "During season: {seasonName}",
        "transmutation_pending": "Transmutation pending!",
        "transmutation_confirm": "Accept the new plant?",
        "confirm_yes": "Yes",
        "confirm_no": "No"
    },
    "units": {
        "hours": "hour(s)"
    },
    "ascension": {
        "confirm_title": "⭐ Confirm Ascension? ⭐",
        "irreversible_warning": "This action is <strong>IRREVERSIBLE</strong>.",
        "gains_title": "You will GAIN:",
        "gain_level": "Access to Ascension level {newAscensionLevel}",
        "gain_cap": "New level cap: {newMaxLevel}",
        "gain_bonus": "Permanent <strong>+5%</strong> bonus to your base attributes",
        "gain_difficulty": "Overall game difficulty increased to {difficultyIncrease}",
        "pc_distribution_title": "Constellation Points Distribution:",
        "pc_source_level": "Level CP (Lvl {level}): {reward}",
        "pc_source_resources": "CP (Converted Resources): {reward}",
        "pc_source_fragments": "CP (Converted Fragments): {reward}",
        "pc_source_dungeon": "CP (Dungeon Record): {reward}",
        "pc_total": "Total for this Ascension: {total}",
        "pc_destiny": "Constellation Points (Destiny): {points}",
        "pc_vocation": "Vocation Points ({playerClass}): {points}",
        "losses_title": "You will LOSE:",
        "loss_level": "Your current level (back to level 1)",
        "loss_xp_stats": "Your experience and assigned stat points",
        "loss_inventory": "Your inventory, equipment, and <strong>all</strong> your resources",
        "keeps_title": "You will KEEP:",
        "keep_adventure": "Your Adventure progress",
        "keep_codex": "Your Codex and Achievements progress",
        "keep_constellations": "Your Constellation Points and talents already unlocked",
        "keep_fiefs": "Your building levels in the Fief",
        "keep_destin": "Your Destiny Cards already unlocked",
        "class_choice_title": "Your Path is Redrawn",
        "class_choice_desc": "Your Ascension offers a new perspective. Choose the class you will embody in this new life.<br>Your 10 starting stat points will be reassigned.",
        "pc_source_bosses": "CP (Bosses Defeated): {reward}",
    },
    "constellation": {
        "hidden_talent_title": "???",
        "hidden_talent_desc": "Explore the constellation to reveal this talent.",
        "bonus_label": "Bonus",
        "level_indicator": "(Level {currentLevel}/{maxLevel})",
        "max_level_reached": "Maximum level reached",
        "upgrade_cost": "Cost Lvl {nextLevel}: {cost} CP"
    },
    "report": {
        "expedition_journal_title": "--- Expedition Log ---",
        "log_by_defeating": "by defeating {enemyName}.",
        "log_on_enemy": "on {enemyName}.",
        "log_item_drop_found_via": "Loot found via {sourceName}!",
        "overqualified_penalty_title": "--- Overleveled Penalty ---",
        "overqualified_penalty_desc": "You are too powerful. Rewards reduced by {penalty}%.",
        "summary_title": "--- Summary ---",
        "combat_xp": "Combat XP",
        "bonus_label": "Bonus:",
        "verb_gained": "Gained",
        "verb_lost": "Lost",
        "loot_label": "Loot:",
        "no_gains": "You bring nothing back from this expedition."
    },
    "bounty": {
        "board_title": "Bounty Board",
        "next_refresh_label": "Next refresh:",
        "board_description": "New targets appear every 8 hours. Use a token to refresh them immediately.",
        "refresh_button_label": "Refresh (1 🎯) - You have {tokenCount}",
        "all_completed_title": "Congratulations!",
        "all_completed_desc": "You have completed all available bounties. Come back later for new challenges!",
        "reward_label": "Reward:",
        "button_completed": "Completed",
        "button_start": "Start",
        "next_refresh_label": "Next refresh in:",
        "difficulties": {
            "facile": "Easy",
            "moyen": "Medium",
            "difficile": "Hard",
            "élite": "Elite"
        }
    },
    "bounty_master": {
        "title": "Set Items",
        "description": "Exchange your Hunt Marks for powerful equipment.",
        "filter_label": "Show sets for:",
        "filter_my_class": "My class",
        "filter_all_classes": "All classes",
        "class_all": "All classes",
        "set_class_label": "Class Set:",
        "pieces_label": "({count} pieces)"
    },
    "tooltip": {
        "item_header": "({itemType} - {rarityName})",
        "class_label": "Class:",
        "modifiers_label": "Modifiers:",
        "base_stats_label": "Base Stats:",
        "stats_none": "None",
        "enchantment_label": "Enchantment [{affixName}]:",
        "set_label": "Set:",
        "details_for": "Details for {statName}",
        "total_label": "Total:",
        "no_description": "No description available."
    },
    "leaderboard": {
        "description_powerScore": "Characters with the highest Power Score.",
        "description_expeditionsStarted": "The most zealous adventurers.",
        "description_bossesKilled": "The greatest boss hunters in the realm.",
        "description_dungeonHighestFloor": "The most seasoned explorers of the Unstable Rift.",
        "description_totalXpGained": "Characters who have accumulated the most experience.",
        "description_codexScore": "Scholars who have completed their Codex the most.",
        "codex_score_rules_title": "Point scale:",
        "codex_score_rule1": "+1 pt / enemy discovered",
        "codex_score_rule2": "+5 pts / Novice tier (10+ kills)",
        "codex_score_rule3": "+15 pts / Adept tier (50+ kills)",
        "codex_score_rule4": "+30 pts / Expert tier (100+ kills)",
        "codex_score_rule5": "+50 pts / Master tier (250+ kills)",
        "loading": "Loading top 10...",
        "empty": "This leaderboard is still empty.",
        "not_ranked_criteria": "No one meets the criteria for this ranking.",
        "label_powerScore": "Power",
        "label_expeditions": "Expeditions",
        "label_bossesKilled": "Bosses Defeated",
        "label_dungeonFloor": "Max Floor",
        "label_codexScore": "Codex Score",
        "label_totalXp": "Total XP",
        "player_level_abbr": "Lvl {level}",
        "searching_rank": "Searching for your rank...",
        "not_ranked": "You are not yet ranked in this category.",
        "rank_data_not_found": "Could not find your ranking data.",
        "load_error": "Could not load the leaderboard.",
        "player_profile_stats": { // NEW
            "powerScore": "Power Score",
            "dungeonHighestFloor": "Max Floor",
            "bossesKilled": "Bosses Killed",
            "enemiesKilled": "Enemies Killed"
        }
    },
    "enchanter": {
        "tabs": {
            "selection": "Selection",
            "enchantment": "Enchantment"
        },
        "possible_affixes_label": "Possible Affixes (Click to see details)",
        "current_affix_label": "Current Affix",
        "lock_label": "Lock 🔒",
        "enchant_reforge_button": "Enchant / Reforge",
        "forge_level_required": "Upgrade your Forge to level 3 to unlock the Enchanter.",
        "unlock_title": "Unlock the Enchanter",
        "unlock_description": "Allows you to modify and improve the affixes on your equipment.",
        "unlock_cost_label": "Cost:",
        "unlock_button": "Unlock",
        "level_max": "Enchantment Level: {level} (Max)",
        "level_current": "Enchantment Level: {level} (Max: {maxRarity})",
        "upgrade_cost_label": "Upgrade cost:",
        "upgrade_button": "Upgrade",
        "select_item_title": "Choose an item to enchant",
        "set_item_disabled_tooltip": "Set items cannot be enchanted.",
        "no_enchantment": "No enchantment",
        "no_equipped_items": "You have no equipped items.",
        "item_ineligible_title": "Ineligible item",
        "no_item_selected": "No item selected.",
        "unknown_affix": "Unknown",
        "no_affix": "None",
        "cost_label": "Cost:"
    },
    "stats_panel": {
        "combat_stats_title": "Combat Stats",
        "global_stats_title": "Global Stats",
        "source_base": "Base",
        "source_equipment": "Equip.",
        "source_affix": "Affix",
        "source_set": "Set",
        "source_codex": "Codex",
        "source_attribute_bonus": "Attribute Bonus",
        "source_achievement": "Achievement",
        "power_score_label": "Power Score:",
        "hp_per_second_unit": " HP/s",
        "source_base_points": "Base points",
        "source_constellation": "Constellation",
        "source_ascension": "Ascension",
        "source_traits": "Traits",
    },
    "codex": {
        "no_enemies_discovered": "No enemies discovered. Go on an adventure to fill your Codex!",
        "tier_new": "New",
        "tier_label": "Tier:",
        "kills_label": "kills",
        "modal": {
            "title_description": "Description",
            "title_locations": "Found In",
            "title_stats": "Base Statistics",
            "stats_ascension_note": "(scales with Ascension lvl {level})",
            "no_locations": "Spawn locations not listed.",
            "unlock_prompt": "Kill this enemy {count} times to unlock this information.",
            "sprite_placeholder": "?"
        },
    },
    "prompts": {
        "yes": "Yes",
        "cancel": "Cancel",
        "confirm": "Yes, delete",
        "confirm_delete": "Yes, delete",
        "yes_with_countdown": "Yes ({countdown})",
        "save_conflict": {
            "body": "A guest character and an online save have been found. Which one do you want to use?<br><br><div style='text-align:left; padding: 0 15px;'><p><strong>Online:</strong> {serverName} (Lvl {serverLevel})</p><p><strong>Local:</strong> {localName} (Lvl {localLevel})</p></div><br><strong>This decision is final.</strong>",
            "choice_online": "Load online save",
            "choice_local": "Overwrite with local character"
        }
    },
    "equipment_slots": {
        "Tête": "Head",
        "Torse": "Chest",
        "Jambes": "Legs",
        "Pieds": "Feet",
        "Mains": "Hands",
        "Arme": "Weapon",
        "Accessoire": "Accessory",
        "Artefact": "Artifact"
    },
    "equipment_empty": "Empty",
    "char_info": {
        "portrait_alt": "Character portrait",
        "health_short": "HP",
        "level": "Level",
        "health": "HP",
        "mana": "Mana",
        "experience": "XP",
        "energy": "Stamina"
    },
    "stamina": { // NEW BLOCK
        "full": "(Max)"
    },
    "inventory": {
        "filter_by_type": "Sort by type:",
        "filter_none": "None",
        "filter_all": "All",
        "recycle_all_button": "Recycle All ♻️",
        "select_filter_prompt": "Select a filter to see your items.",
        "no_items_of_type": "No items of this type.",
        "unlock_item_title": "Unlock item",
        "lock_item_title": "Lock item",
        "food_bonus_title": "Bonus: {bonusText} ({duration} fights)"
    },
    "forge": {
        "unlock_prompt": "Unlock the forge for {cost}",
        "unlock_button": "Unlock",
        "level_max_info": "Forge Level: {level} (Max)",
        "upgrade_prompt": "Level: {level}. Upgrade for {cost}",
        "upgrade_button": "Upgrade",
        "filter_type_label": "Type:",
        "filter_rarity_label": "Rarity:",
        "filter_class_label": "Class:",
        "filter_all": "All",
        "filter_rarity_all": "All",
        "filter_rarity_none": "None",
        "filter_class_all": "All",
        "craftable_items_title": "Craftable Items",
        "select_rarity_prompt": "Select a rarity to display items.",
        "no_matching_items": "No items match your filters.",
        "item_type_label": "Type:",
        "item_effects_label": "Effects:",
        "item_effects_none": "None",
        "item_cost_label": "Cost:",
        "craft_button": "Craft"
    },
    "affixes": {
        "details_title": "Details for: {affixName}"
    },
    "alchemist": {
        "title": "Alchemy Lab",
        "description": "Brew potions and elixirs to help you in combat.",
        "cost_label": "Cost:",
        "craft_button": "Brew"
    },
    "special_resources": {
        "none": "No rare components at the moment."
    },
    "village_hub": {
        "status_locked": "Locked",
        "status_available": "Available",
        "cost_label": "Cost:",
        "level_label": "Level",
        "crafting_label": "Crafting",
        "enchanter_req_forge": "Requires Forge Lvl 3",
        "enchanter_enchants_up_to": "Enchants up to {rarity}",
        "alchemist_req_adventure": "Requires completion of an Adventure quest.",
        "alchemist_desc": "Potion crafting.",
        "cook_desc": "Prepares invigorating dishes.",
        "cook_req_level": "Requires Level 15.",
        "merchant_desc": "Trade goods.",
        "bounty_master_desc": "Exchange your Marks.",
        "bounty_master_req": "Complete a Medium bounty.",
        "bounty_desc": "Daily challenges.",
        "oracle_desc": "Consult your cards.",
        "artisans_district": "Artisans' District",
        "merchants_district": "Merchants' District",
        "mystic_district": "Mystic District",
        "forge": "Forge",
        "enchanter": "Enchanter",
        "alchemist": "Alchemist",
        "cook": "Cook",
        "merchant": "Merchant",
        "bounty_master": "Bounty Master",
        "bounty": "Bounties",
        "oracle": "Oracle",
        "title": "Village Hub",
    },
    "loading_text": "Loading...",
    "merchant": {
        "exchange_button_label": "Exchange",
        "total_cost_label": "Total cost:",
        "amount_label": "Amount:",
        "from_label": "From:",
        "to_label": "To:",
        "quantity_label": "Quantity:",
        "pay_with_label": "Pay with:",
        "buy_button": "Buy"
    },
    "classes": {
        "Guerrier": "Warrior",
        "Archer": "Archer",
        "Mage": "Mage",
        "Toutes les classes": "All classes"
    },
    "patch_notes": {
        "title": "Patch Notes",
        "select_version_prompt": "Please select a version to view:",
        "version_title": "Patch Notes ({version}): {title}"
    },
    "consumables": {
        "none": "No consumables."
    },
    "dungeon": {
        "title": "The Unstable Rift",
        "keys_label": "Keys:",
        "description_p1": "Dive into an infinite-floor dungeon where difficulty increases with each level. Test your limits and reap unique rewards!",
        "description_p2": "Don't forget your potions at the Alchemist before setting out to conquer the Rift",
        "personal_best_label": "Personal best: Floor",
        "enter_button": "Enter",
        "explore_prompt": "Move on the map to explore:",
        "flee_button": "Flee the Dungeon (50% Penalty)",
        "max_stock_reached": "Max stock reached",
        "next_key_in": "Next key in: {hours}:{minutes}:{seconds}"
    },
    "contextual_offers": {
        "title": "Special Offer!",
        "acceleration_pack_1": {
            "name": "Speed-Up Pack",
            "description": "Finish your constructions and get back into the action faster!"
        }
    },
},
    "patchNotes": {
        "selection": {
            "title": "Patch Notes",
            "prompt": "Please select a version to view:"
        },
        "v0_5_0": {
            "title": "The Way of the Hunter",
            "sections": {
                "major": "New Features & Major Improvements",
                "qol": "UI & Quality of Life Improvements",
                "bugs": "Bug Fixes"
            },
            "points": {
                "major": [
                    "Introducing the <strong>Daily Bounty Board</strong>! Take on challenges against \"Elite\" monsters, refreshed every <strong>8 hours</strong>, to earn unique rewards.",
                    "Added a new currency, <strong>Hunt Marks (🎯)</strong>, obtained by completing bounties.",
                    "Over 40 new unique bounty targets have been added with 4 difficulty levels (Easy, Medium, Hard, Elite) based on your <strong>Power Score</strong>.",
                    "Implemented <strong>Patrols (AFK Mode)</strong> to earn resources and XP while inactive. A patrol can be interrupted at any time for a small penalty.",
                    "<strong>Major economy overhaul:</strong> crafting costs for high-level items have been significantly increased to make progression more rewarding.",
                    "Added <strong>Specific Crafting Resources</strong> on certain monsters, required to create unique items that cannot be obtained otherwise.",
                    "Added a location for the future <strong>Bounty Master</strong> in the village, who will exchange your Hunt Marks."
                ],
                "qol": [
                    "Complete reorganization of the character interface into <strong>two columns</strong> for better clarity on large screens, while adapting perfectly to mobile.",
                    "Expedition and patrol reports have been <strong>completely redesigned</strong>: they are more visual, colorful, scrollable, and provide better details on XP gains.",
                    "Panels (Inventory, Equipment, etc.) now have a fixed height and are <strong>scrollable</strong> with a custom scrollbar for a cleaner interface.",
                    "Combat improvement: defeated enemies now remain on screen (grayed out) until the end of the fight.",
                    "Items enchanted with affixes are now correctly displayed and grouped separately in the inventory.",
                    "The \"Global Damage\" bonus from the Codex is now clearly visible in the combat stats.",
                    "Attribute descriptions (Health, Strength, Agility, etc.) can now be viewed directly in the interface.",
                    "The Codex is now sorted in descending order of kill count.",
                    "The Village hub display on mobile has been optimized to present buildings in two columns.",
                    "Text in interactive elements is no longer selectable for a cleaner experience."
                ],
                "bugs": [
                    "Fixed a major bug that could equip the wrong item from the inventory.",
                    "Fixed a ghost enemy bug where it remained displayed after a fight.",
                    "The flee button is now correctly disabled during bounty fights.",
                    "Improved the robustness of game loading to prevent errors."
                ]
            }
        },
        "v0_6_0": {
            "title": "The Age of Heroes",
            "sections": {
                "major": "New Features & Major Improvements",
                "qol": "UI & Quality of Life Improvements",
                "balancing": "Balancing"
            },
            "points": {
                "major": [
                    "Implementation of the <strong>Class system</strong>! Choose between <strong>Warrior, Archer, and Mage</strong> when creating your character for a unique gameplay experience.",
                    "Each class now has its <strong>own skills</strong> with unique effects like area-of-effect damage for the Mage or armor penetration for the Archer.",
                    "Skill damage now depends on your main attribute: <strong>Strength</strong> (Warrior), <strong>Agility</strong> (Archer), or <strong>Intelligence</strong> (Mage).",
                    "Added a new resource for the Mage: <strong>Mana</strong>, which regenerates out of combat and is consumed by spells.",
                    "<strong>Over 50 new items</strong> have been added, from Common to Mythic, with stats tailored to each class and various playstyles.",
                    "<strong>Several new class-specific item sets</strong> have been created for the Epic, Legendary, and Mythic tiers, offering clear end-game goals."
                ],
                "qol": [
                    "The attribute display has been completely redesigned: hover your mouse (PC) or hold your finger (Mobile) on an attribute's <strong>name</strong> to see its <strong>description</strong>, and on its <strong>value</strong> to see a <strong>full breakdown</strong> of all your bonuses.",
                    "It is now possible to <strong>hold click or tap</strong> on the `+` button to quickly assign multiple stat points.",
                    "The <strong>Codex</strong> and the <strong>combat</strong> interface now display the <strong>sprites</strong> of each monster and boss for better immersion.",
                    "A <strong>portrait of your character</strong>, based on your class, is now visible in the game header.",
                    "Monster sprites now react to combat: they light up when taking damage and turn gray upon death.",
                    "The <strong>Bounty Master</strong> now offers a <strong>filter</strong> to show only item sets relevant to your class (or to see all of them).",
                    "Item tooltips now clearly display the <strong>required class</strong>.",
                    "Existing characters without a class are prompted to <strong>choose one</strong> on their next login, with an option to reset their stats.",
                    "Equipped items that do not match your class are <strong>automatically unequipped</strong> when loading the game.",
                    "The <strong>Patch Notes</strong> system is now dynamic and allows you to view update archives."
                ],
                "balancing": [
                    "The balancing of main attributes has been revised to strengthen each class's identity and make secondary stat choices more strategic.",
                    "<strong>Strength</strong> now grants a slight passive bonus to <strong>Armor Penetration</strong>.",
                    "<strong>Intelligence</strong> now grants a slight passive bonus to <strong>Damage Resistance</strong>."
                ]
            }
        },
        "v0_7_0": {
            "title": "The Unstable Rift",
            "sections": {
                "major": "Major New Feature: The Infinite Dungeon",
                "balancing": "Improvements & Balancing",
                "bugs": "Bug Fixes"
            },
            "points": {
                "major": [
                    "Introducing a brand new game mode: <strong>The Unstable Rift</strong>, an infinite-floor dungeon with increasing difficulty.",
                    "Each floor is a <strong>procedurally generated map</strong>, offering a unique experience with every attempt.",
                    "<strong>Explore the map!</strong> No more linear paths—choose your route, retrace your steps, and discover what each room holds.",
                    "The map is now <strong>interactive</strong>: move it with your mouse or finger to plan your exploration.",
                    "Added <strong>new event rooms</strong>: find treasures, healing fountains, or fall into traps!",
                    "Introducing two new resources: the <strong>Rift Key (🗝️)</strong> to enter the dungeon, and <strong>Unstable Shards (💠)</strong> as the main reward.",
                    "Implemented a <strong>tier system</strong>: veteran players can now start their runs at higher floors (every 20 floors) to skip the beginning."
                ],
                "balancing": [
                    "<strong>Dungeon difficulty overhaul:</strong> monster power is now calculated based on a 'power budget' that increases exponentially, ensuring smooth starts and very challenging end-games.",
                    "<strong>Increased monster variety:</strong> the new generation system allows for encountering any monster from the game in the dungeon, based on its power and the floor level.",
                    "The interface is now <strong>locked during a dungeon run</strong> to prevent abuse (accessing the village, etc.).",
                    "<strong>Codex tier</strong> rewards have been improved to be more unique and interesting.",
                    "Kill thresholds for Codex tiers have been increased to accommodate the larger number of fights generated by the dungeon."
                ],
                "bugs": [
                    "Fixed a critical bug that could prevent the end of a fight in the dungeon.",
                    "Fixed an interaction bug that prevented clicking on dungeon rooms.",
                    "Fixed a bug that froze the interface if the page was reloaded in the middle of a dungeon."
                ]
            }
        },
        "v0_8_0": {
            "title": "The Celestial Ascension",
            "sections": {
                "major": "Major New Features",
                "qol": "Improvements & Quality of Life",
                "balancing": "Balancing",
                "bugs": "Bug Fixes"
            },
            "points": {
                "major": [
                    "<strong>The Ascension System is here!</strong> Once you reach level 50, reset your character to level 1 to start over stronger, with a permanent bonus to your attributes for each Ascension level.",
                    "<strong>Discover the Celestial Constellations!</strong> Spend Constellation Points (CP) earned through Ascension to unlock powerful permanent passive talents.",
                    "<strong>The Destiny Tree:</strong> A universal talent tree whose bonuses apply to all your characters, allowing you to unlock access to the highest rarity equipment.",
                    "<strong>Vocation Trees:</strong> Each class (Warrior, Archer, Mage) now has its own talent tree to specialize your playstyle and unlock game-changing passives."
                ],
                "qol": [
                    "<strong>Item Comparison:</strong> Hover your mouse (or your finger) over an item in the inventory to instantly see a comparison with the equipped item.",
                    "<strong>Inventory Filter:</strong> A new filter option has been added to the inventory to find your items more easily.",
                    "<strong>Visual Feedback in Combat:</strong> Activable passives, like Mana Shield, now have a dedicated icon in combat to show if they are active.",
                    "<strong>Ascension Tag:</strong> Your Ascension level is now proudly displayed next to your name and in the leaderboards, with an evolving color to show your power!"
                ],
                "balancing": [
                    "<strong>Ascension Difficulty:</strong> The power of enemies in all activities (Expeditions, Dungeon, Bounties) now increases with your Ascension level, ensuring an ever-renewing challenge.",
                    "XP and resource gains are also slightly increased with each Ascension level.",
                    "The Warrior's constellation talents have been improved to enhance his survivability in the highest Ascension levels."
                ],
                "bugs": [
                    "Fixed a bug where the '+X to all attributes' talent (`stat_flat_all`) gave an incorrect amount of Defense.",
                    "Fixed a display issue in the Achievement tooltip that could hide some rewards.",
                    "Fixed a rare bug that could stall a fight if an enemy died from bleed at the start of its own turn."
                ]
            }
        },
        "v0_9_0": {
            "title": "The Dawn of the Domain",
            "sections": {
                "major": "Major New Feature: Your Personal Fief",
                "garden": "The Evolving Garden: A World to Cultivate",
                "qol": "Improvements & Quality of Life",
                "balancing": "Balancing"
            },
            "points": {
                "major": [
                    "<strong>The Fief system is now available!</strong> Unlock your own domain at level 10 to build and upgrade buildings that will grant you passive bonuses and new resources.",
                    "<strong>Passive Production:</strong> Build and upgrade the <strong>Sawmill</strong>, the <strong>Mine</strong>, and the <strong>Weaving Mill</strong> to generate wood, metal, and cloth over time, even when you are offline.",
                    "<strong>Utility Buildings:</strong> Upgrade the <strong>Warehouse</strong> to drastically increase your resource storage capacity, and build the <strong>Infirmary</strong> to reduce the penalty time after a defeat.",
                    "<strong>Passive Consumables:</strong> The Infirmary now passively produces <strong>Triage Balms</strong>, powerful healing items usable in combat."
                ],
                "garden": [
                    "Discover the <strong>Evolving Garden</strong> within your Fief, a complex and deep gardening system.",
                    "<strong>Find and plant</strong> rare seeds obtained during your expeditions to grow plants with unique properties.",
                    "<strong>Seasons System:</strong> Time passes in your garden! Each season (Spring, Summer, Autumn, Winter) lasts for several days and influences the growth of your plants, favoring some types and slowing down others.",
                    "<strong>Synergies and Mutations:</strong> Discover secret recipes! Planting certain plants next to others during the right season can trigger <strong>transformations</strong>, creating rare and powerful species that cannot be obtained otherwise.",
                    "<strong>Garden Expansion:</strong> By discovering higher-tier plants, your garden expands, offering you more plots for your crops."
                ],
                "qol": [
                    "A new interface dedicated to the Fief is accessible from the main screen, allowing you to manage your domain at any time outside of combat.",
                    "The Fief building interface clearly displays levels, upgrade costs, and real-time production.",
                    "Added a detailed tooltip for each Fief building, explaining its current bonuses and those of the next level.",
                    "The new resources and consumables from the Fief are now integrated into the overall game economy."
                ],
                "balancing": [
                    "The costs of some high-level upgrades for the Forge and Enchanter now include rare resources that can be grown in the Garden.",
                    "The base resource storage capacity has been adjusted to make upgrading the Warehouse more significant.",
                    "Some alchemy and cooking recipes now require ingredients that can only be obtained through the Evolving Garden."
                ]
            }
        }
    },
    "stats": {
        "no_stats": "No statistics",
        "expeditions_started": "Expeditions started",
        "expeditions_succeeded": "Expeditions succeeded",
        "expeditions_failed": "Expeditions failed",
        "expedition_success_rate": "Success rate (Exp.)",
        "player_deaths": "Character deaths",
        "bosses_killed": "Bosses killed",
        "enemies_killed": "Enemies killed",
        "items_crafted": "Items crafted",
        "items_recycled": "Items recycled",
        "items_enchanted": "Items enchanted",
        "fragments_earned": "Total fragments earned",
        "xp_earned": "Total XP earned",
        "displayNames": {
            "Vie": "Health",
            "Force": "Strength",
            "Agilité": "Agility",
            "Chance": "Luck",
            "Intelligence": "Intelligence",
            "Défense": "Defense",
        
            // --- Common Resources ---
            "fragments": "Fragments",
            "bois": "Wood",
            "metal": "Metal",
            "tissu": "Cloth",
            "marques_de_chasse": "Hunt Marks",
            "bounty_tokens": "Bounty Tokens",
            "eclats_instables": "Unstable Shards",
            "cle_de_la_breche": "Rift Key",
        
            // --- Rare Components ---
            "Coeur de Golem": "Golem Heart",
            "Essence Spectrale": "Spectral Essence",
            "Chitine Renforcée": "Reinforced Chitin",
            "Plume de Griffon": "Gryphon Feather",
            "Sang de Basilic": "Basilisk Blood",
            "Oeil de Chimère": "Chimera Eye",
            "Écaille de Profond": "Deep One Scale",
            "Totem Orc": "Orc Totem",
            "Fragment d'Âme de Démon": "Demon Soul Fragment",
            "Coeur de Dragon Ancien": "Ancient Dragon Heart",
            "Larme d'Archange": "Archangel's Tear",
            "Poussière de Vide": "Void Dust",
            "Herbes Médicinales": "Medicinal Herbs",
            "coeur_de_golem": "Golem Heart",
            "essence_spectrale": "Spectral Essence",
            "chitine_renforcee": "Reinforced Chitin",
            "plume_de_griffon": "Gryphon Feather",
            "sang_de_basilic": "Basilisk Blood",
            "oeil_de_chimere": "Chimera Eye",
            "ecaille_de_profond": "Deep One Scale",
            "totem_orc": "Orc Totem",
            "fragment_d_ame_de_demon": "Demon Soul Fragment",
            "coeur_de_dragon_ancien": "Ancient Dragon Heart",
            "larme_d_archange": "Archangel's Tear",
            "poussiere_de_vide": "Void Dust",
            "herbes_medicinales": "Medicinal Herbs",
            "marques_de_guilde": "Guild Marks",
            
            // --- NEW: Keys for Seeds ---
            "HERBE_ROBUSTE": "Sturdy Grass Seed",
            "CRISTAL_DE_GIVRE": "Frost Crystal Seed",
            "FLEUR_DE_LAVE": "Lava Flower Seed",
            "GRAINE_SOLAIRE": "Sun Seed",
            "RACINE_TERREUSE": "Earthen Root Seed",
            "TOURNESOL_RADIEUX": "Radiant Sunflower Seed",
            "LYS_DE_GIVRE": "Frost Lily Seed",
            "CHAMPIGNON_TERREUX": "Earthen Mushroom Seed",
            "FLEUR_DE_ROSEE": "Dewdrop Flower Seed",
            "TREFLE_DORE": "Golden Clover Seed",
            "RACINE_EPONGE": "Sponge-Root Seed",
            "ROSE_SANGUINE": "Blood Rose Seed",
            "ORCHIDEE_SILENCIEUSE": "Silent Orchid Seed",
        
            // --- Garden Components (Harvested Resources) ---
            "Cristal de Givre": "Frost Crystal",
            "Fleur de Lave": "Lava Flower",
            "Graine Solaire": "Sun Seed",
            "Racine Terreuse": "Earthen Root",
            "Tournesol Radieux": "Radiant Sunflower",
            "Lys de Givre": "Frost Lily",
            "Champignon Terreux": "Earthen Mushroom",
            "Fleur de Rosée": "Dewdrop Flower",
            "Rose Sanguine": "Blood Rose",
            "eclats_ascension": "Ascension Shards",
            "RegenHP": "HP Regeneration",
            "CritChance": "Critical Chance",
            "CritDamage": "Critical Damage",
            "Evasion": "Evasion",
            "LootBonusPercent": "Item Drop Bonus",
            "lifesteal_percent": "Lifesteal",
            "bleed_chance_percent": "Bleed Chance",
            "xp_gain_percent": "XP Gain",
            "resistance_percent": "Damage Resistance",
            "stun_chance_percent": "Stun Chance",
            "armor_shred_percent": "Armor Penetration",
            "thorns_damage_flat": "Thorns Damage",
            "resource_gain_percent": "Resource Gain",
            "debuff_resistance_percent": "Debuff Resistance",
            "healing_effectiveness_percent": "Healing Effectiveness",
            "damage_percent": "Global Damage",
            "spell_damage_percent": "Spell Damage %",
            "mana_cost_percent": "Mana Cost %",
            "mana_regen_percent": "Mana Regen %",
            "bonus_force_low_hp_percent": "Strength Bonus (Low HP) %",
            "Vie_percent": "Max Health %",
            "max_mana_percent": "Max Mana %",
            "spell_lifesteal_percent": "Spell Lifesteal %",
            "stun_resistance_percent": "Stun Resistance %",
            "freecast_chance_percent": "Freecast Chance %",
            "vol_de_mana_percent": "Mana Steal",
            "archer_skill_damage_percent": "Archer Skill Damage %",
            "evasion_chance_percent": "Evasion Chance %",
            "spell_crit_chance_percent": "Spell Crit Chance %",
            "spell_crit_damage_percent": "Spell Crit Damage %",
            "ascension_pc_gain_percent": "Constellation Point Gain %",
            "codex_kill_credit_percent": "Codex Progression %",
            "fragments_gain_percent": "Fragment Gain %",
            "event_success_chance_flat": "Event Success Chance",
            "sell_price_percent": "Sell Price %",
            "free_craft_chance_percent": "Free Craft Chance %",
            "patrol_reward_percent": "Patrol Rewards %",
            "Force_percent": "Strength %",
            "Agilité_percent": "Agility %",
            "Chance_percent": "Luck %",
            "Intelligence_percent": "Intelligence %",
            "Défense_percent": "Defense %",
            "stat_flat_all": "All Stats"
        },
        "descriptions": {
            "Vie": "Increases your maximum health points (HP). Essential for surviving long fights and traps. (3 HP / point)",
            "Force": "The Warrior's main stat, increasing their skill damage. For all classes, it increases out-of-combat HP Regeneration and Armor Penetration.",
            "Agilité": "The Archer's main stat, increasing their skill damage. For all classes, it increases Critical Damage and Evasion Chance.",
            "Chance": "Increases your chances of success in choice-based events, the probability of finding better quality loot, and now also increases your Critical Strike Chance.",
            "Intelligence": "The Mage's main stat, increasing their spell damage, maximum Mana, and regeneration. For all classes, it increases XP Gain, Hit Chance, and Damage Resistance.",
            "Défense": "Directly reduces incoming damage. A crucial survival stat, only improvable through equipment or every 10 levels."
        }
    },
    "village": {
    "title": "Village",
    "buildings": {
        "forge": "Forge",
        "forge_desc": "Craft and recycle equipment.",
        "enchanter": "Enchanter",
        "enchanter_desc": "Enhance your equipment with powerful stats."
    },
    "upgrade_complete_toast": "{buildingName} (Lvl {level}) finished!"
    },
    "patrol": {
        "busy_message": "You cannot start a patrol right now.",
        "start_toast": "{hours}h patrol started!",
        "report_title_interrupted": "Interrupted Patrol Report",
        "report_title_completed": "Patrol Report",
        "penalty_text": "<p style=\"color: #ff6b6b;\">A {penalty}% penalty has been applied for interruption.</p>",
        "summary_title": "--- Summary ---",
        "xp_gained": "XP gained:",
        "wood_reported": "Wood reported:",
        "metal_reported": "Metal reported:",
        "cloth_reported": "Cloth reported:",
        "cancel_confirm": "Are you sure you want to interrupt your patrol?<br><br>You will receive rewards for the elapsed time, but with a <strong>25% penalty</strong>.",
        "ui_completed_title": "Patrol Completed!",
        "ui_completed_text": "Your character is awaiting your orders to finish their patrol and collect the rewards.",
        "ui_completed_button": "Finish Patrol",
        "ui_inprogress_title": "Patrol in progress...",
        "ui_inprogress_timer": "Ends in:",
        "ui_inprogress_button": "Interrupt (with penalty)",
        "ui_start_title": "Start a Patrol (AFK Mode)",
        "ui_start_text": "Send your character on patrol to earn resources and XP without playing. The rewards are lower than an active expedition.",
        "ui_start_button": "Start ({hours}h)"
    },
    "rewards": {
        "none": "None",
        "specialPassive": "<strong>Special Passive</strong>",
        "specialReward": "Special Reward",
        "unknownType": "Unknown reward type:",
        "passives": {
            "instinct": "<strong>Passive: Predator's Instinct</strong>",
            "ironWill": "<strong>Passive: Iron Will</strong>",
            "execution": "<strong>Passive: Execution</strong>"
        }
    },
    "skills": {
        "guerrier": {
            "attaque_basique": {
                "name": "Basic Attack",
                "description": "A simple and reliable attack. Damage based on Strength."
            },
            "attaque_lourde": {
                "name": "Heavy Attack",
                "description": "A powerful but less accurate attack. Damage based on Strength."
            }
        },
        "archer": {
            "tir_simple": {
                "name": "Simple Shot",
                "description": "A quick and accurate shot. Damage based on Agility."
            },
            "tir_perforant": {
                "name": "Piercing Shot",
                "description": "A powerful shot that ignores part of the enemy's defense. Damage based on Agility."
            }
        },
        "mage": {
            "eclair_de_givre": {
                "name": "Frostbolt",
                "description": "A projectile of ice. Damage based on Intelligence."
            },
            "boule_de_feu": {
                "name": "Fireball",
                "description": "An explosion that hits the main target and deals reduced damage to other enemies. Damage based on Intelligence."
            },
            "coup_de_baton": {
                "name": "Staff Strike",
                "description": "A desperate attack when mana runs out. Damage is very low and based on Strength."
            }
        },
        "guild_boss_1": {
            "corrupting_breath": { "name": "Corrupting Breath" },
            "abyssal_slam": { "name": "Abyssal Slam" }
        }
    },
    "consumables": {
        "potion_soin_mineure": {
            "name": "Minor Healing Potion",
            "description": "Restores 40 HP."
        },
        "potion_soin": {
            "name": "Healing Potion",
            "description": "Restores 90 HP."
        },
        "potion_mana_mineure": {
            "name": "Minor Mana Potion",
            "description": "Restores 30 Mana points."
        },
        "potion_mana": {
            "name": "Mana Potion",
            "description": "Restores 60 Mana points."
        },
        "elixir_force_faible": {
            "name": "Weak Elixir of Strength",
            "description": "Increases Strength by 10 for 3 turns."
        },
        "cle_de_la_breche": {
            "name": "Rift Key",
            "description": "Opens access to the Infinite Dungeon for one attempt."
        },
        "baume_de_triage": {
            "name": "Triage Balm",
            "description": "A powerful balm prepared at the Fief. Restores 25% of max HP and 25% of max Mana. Usable only in combat."
        },
        "elixir_peau_de_pierre": {
            "name": "Stoneskin Elixir",
            "description": "Increases Defense by 15 for 3 turns."
        },
        "potion_clairvoyance": {
            "name": "Clairvoyance Potion",
            "description": "Increases Luck by 20 for 5 turns."
        },
        "huile_de_saignement": {
            "name": "Bleeding Oil",
            "description": "Increases Bleed chance by 10% for 3 turns."
        }
    },
    "alchemy": {
        "potion_soin_mineure": { "name": "Minor Healing Potion", "description": "Restores 50 HP." },
        "potion_soin": { "name": "Healing Potion", "description": "Restores 90 HP." },
        "potion_mana_mineure": { "name": "Minor Mana Potion", "description": "Restores 30 Mana points." },
        "potion_mana": { "name": "Mana Potion", "description": "Restores 60 Mana points." },
        "elixir_force_faible": { "name": "Weak Elixir of Strength", "description": "Increases Strength by 10 for 3 turns." },
        "elixir_peau_de_pierre": { "name": "Stoneskin Elixir", "description": "Increases Defense by 15 for 3 turns." },
        "potion_clairvoyance": { "name": "Clairvoyance Potion", "description": "Increases Luck by 20 for 5 turns." },
        "huile_de_saignement": { "name": "Bleeding Oil", "description": "Coats your weapon to increase Bleed chance by 10% for 3 turns." }
    },
    "cooking": {
        "ragout_roborant": { "name": "Invigorating Stew", "description": "A simple but comforting dish that strengthens your constitution." },
        "infusion_glaciale": { "name": "Icy Infusion", "description": "A cool drink that clears the mind and speeds up mana regeneration." },
        "salade_de_zephyr": { "name": "Zephyr Salad", "description": "A light and crisp salad that makes you feel like you're floating." },
        "steak_enflamme": { "name": "Flaming Steak", "description": "Meat cooked on Lava Flower petals. Spicy and invigorating!" },
        "souffle_de_la_fortune": { "name": "Fortune's Soufflé", "description": "A light and golden dessert that seems to attract luck." }
    },
    "merchants": {
        "pedro": {
            "name": "Pedro the Traveler",
            "description": "A man with a tired look but a sharp gaze beckons you. His cart is filled with trinkets and a few treasures."
        },
        "village_artisan": {
            "name": "Village Artisan",
            "description": "A versatile artisan who can rebalance your stocks or provide you with rare materials.",
            "buy_components_title": "Buy Components",
            "exchange_title": "Exchange Resources",
            "exchange_description": "Rate: 100 of your resources for 70 of another.",
            "buy_fragments_title": "Buy Fragments",
            "buy_fragments_description": "The price is 500 resources per fragment."
        }
    },
    "codex": {
        "bonus": {
            "unlocked": "Unlocked"
        },
        "tiers": {
            "novice": "Novice",
            "confirme": "Adept",
            "expert": "Expert",
            "maitre": "Master"
        },
        "novice": {
            "milestone1_name": "Apprentice Hunter",
            "milestone2_name": "Competent Hunter",
            "milestone3_name": "Scourge of Beasts",
            "milestone4_name": "Predator's Instinct"
        },
        "confirme": {
            "milestone1_name": "Tenacious Survivor",
            "milestone2_name": "Stoneskin",
            "milestone3_name": "Bloodthirsty",
            "milestone4_name": "Iron Will"
        },
        "expert": {
            "milestone1_name": "Specialist",
            "milestone2_name": "Weapon Master",
            "milestone3_name": "Severed Artery",
            "milestone4_name": "Veteran's Heart"
        },
        "maitre": {
            "milestone1_name": "Connoisseur",
            "milestone2_name": "Accomplished Vampire",
            "milestone3_name": "Concussion",
            "milestone4_name": "Execution"
        }
    },
    "items": {
        "essence_dissonante": { "name": "Dissonant Essence", "desc": "Raw energy from the Dissonance, used for advanced crafting." },
        "essence_dissonante_pure": { "name": "Pure Dissonant Essence", "desc": "A concentrated essence of Dissonance, rare and powerful." },
        "artefact_ancien_harmonique": { "name": "Ancient Harmonic Artifact", "desc": "A relic from the ancient Order of Harmony, altered by the Dissonance." },
        "common": {
            "anneau_simple": { "name": "Simple Ring" },
            "bottes_usagees": { "name": "Worn Boots" },
            "bracelet_de_force": { "name": "Bracelet of Strength" },
            "casque_en_cuir_use": { "name": "Worn Leather Helm" },
            "ceinture_en_corde": { "name": "Rope Belt" },
            "heaume_de_bois": { "name": "Wooden Helm" },
            "jambieres_de_voyageur": { "name": "Traveler's Leggings" },
            "pantalon_de_paysan": { "name": "Peasant Trousers" },
            "protege_tibias_en_cuir": { "name": "Leather Shin Guards" },
            "tunique_dechiree": { "name": "Torn Tunic" },
            "ceinture_en_cuir_simple": { "name": "Simple Leather Belt" },
            "sandales_usees": { "name": "Worn Sandals" },
            "jambieres_en_tissu_rapiece": { "name": "Patched Cloth Leggings" },
            "epee_rouillee": { "name": "Rusty Sword" },
            "gourdin_simple": { "name": "Simple Club" },
            "gants_de_travail": { "name": "Work Gloves" },
            "targe_en_bois": { "name": "Wooden Targe" },
            "brassards_en_cuir": { "name": "Leather Bracers" },
            "plastron_de_cuir_brut": { "name": "Crude Leather Breastplate" },
            "dague_ebrechee": { "name": "Chipped Dagger" },
            "gants_en_tissu": { "name": "Cloth Gloves" },
            "carquois_simple": { "name": "Simple Quiver" },
            "pourpoint_en_cuir": { "name": "Leather Jerkin" },
            "capuche_de_rodeur_simple": { "name": "Simple Ranger Hood" },
            "baton_noueux": { "name": "Gnarled Staff" },
            "bottes_de_paille": { "name": "Straw Boots" },
            "chemise_de_lin": { "name": "Linen Shirt" },
            "pendentif_en_os": { "name": "Bone Pendant" },
            "vieux_chapeau_pointu": { "name": "Old Pointy Hat" },
            "circlet_d_apprenti": { "name": "Apprentice's Circlet" },
            "robe_simple": { "name": "Simple Robe" },
            "mitaines_d_apprenti": { "name": "Apprentice's Mitts" },
            "chausses_de_novice": { "name": "Novice's Chausses" }
        },
        "uncommon": {
            "armure_legere": { "name": "Light Armor" },
            "bottes_de_marche": { "name": "Walking Boots" },
            "bottes_fourrees": { "name": "Fur-lined Boots" },
            "jambieres_renforcees": { "name": "Reinforced Leggings" },
            "potion_de_soin_mineure": { "name": "Minor Healing Potion" },
            "talisman_de_vitalite": { "name": "Talisman of Vitality" },
            "trefle_a_quatre_feuilles": { "name": "Four-Leaf Clover" },
            "pendentif_de_chance": { "name": "Pendant of Luck" },
            "bottes_de_voyageur_aguerri": { "name": "Seasoned Traveler's Boots" },
            "bouclier_de_tour_en_bois": { "name": "Wooden Tower Shield" },
            "casque_en_fer": { "name": "Iron Helm" },
            "gantelets_cloutes": { "name": "Studded Gauntlets" },
            "hache_de_bucheron": { "name": "Lumberjack's Axe" },
            "jambieres_de_mailles": { "name": "Mail Leggings" },
            "lance_de_milicien": { "name": "Militia Spear" },
            "hache_de_guerre_en_fer": { "name": "Iron War Axe" },
            "plastron_de_mercenaire": { "name": "Mercenary's Breastplate" },
            "casque_de_soldat_du_front": { "name": "Frontline Soldier's Helm" },
            "arc_court": { "name": "Shortbow" },
            "cape_de_voyage": { "name": "Traveling Cape" },
            "capuche_d_eclaireur": { "name": "Scout's Hood" },
            "gants_de_pickpocket": { "name": "Pickpocket's Gloves" },
            "arc_de_chasseur": { "name": "Hunter's Bow" },
            "gants_de_traqueur": { "name": "Tracker's Gloves" },
            "jambieres_de_hors_la_loi": { "name": "Outlaw's Leggings" },
            "amulette_de_l_erudit": { "name": "Scholar's Amulet" },
            "catalyseur_arcanique": { "name": "Arcane Catalyst" },
            "fouet_d_initie": { "name": "Initiate's Whip" },
            "sceptre_de_novice": { "name": "Novice's Scepter" },
            "robe_d_adepte": { "name": "Adept's Robe" },
            "gants_de_conjurateur": { "name": "Conjurer's Gloves" },
            "bottes_de_l_adepte": { "name": "Adept's Boots" }
        },
        "rare": {
            "casque_de_soldat": { "name": "Soldier's Helmet" },
            "pendentif_du_survivant": { "name": "Survivor's Pendant" },
            "cape_de_resistance": { "name": "Cape of Resistance" },
            "arbalete_lourde": { "name": "Heavy Crossbow" },
            "cuirasse_de_plaques": { "name": "Plate Cuirass" },
            "espadon_de_mercenaire": { "name": "Mercenary's Greatsword" },
            "hallebarde_de_la_garde": { "name": "Guard's Halberd" },
            "jambieres_de_plaques": { "name": "Plate Leggings" },
            "jambieres_du_barbare": { "name": "Barbarian's Leggings" },
            "longue_epee_de_chevalier": { "name": "Knight's Longsword" },
            "poings_americains": { "name": "Brass Knuckles" },
            "solerets_en_acier": { "name": "Steel Solerets" },
            "gantelets_de_gladiateur": { "name": "Gladiator's Gauntlets" },
            "marteau_de_guerre": { "name": "Warhammer" },
            "harnois_de_bataille": { "name": "Battle Harness" },
            "bottes_de_marcheur_de_guerre": { "name": "War-Walker Boots" },
            "bottes_d_explorateur": { "name": "Explorer's Boots" },
            "gants_du_tireur": { "name": "Marksman's Gloves" },
            "masque_du_filou": { "name": "Trickster's Mask" },
            "justaucorps_de_traqueur": { "name": "Tracker's Jerkin" },
            "carquois_de_vitesse": { "name": "Quiver of Speed" },
            "masque_de_franc_tireur": { "name": "Sharpshooter's Mask" },
            "amulette_de_la_fortune": { "name": "Amulet of Fortune" },
            "broche_du_diplomate": { "name": "Diplomat's Brooch" },
            "manteau_de_l_illusionniste": { "name": "Illusionist's Mantle" },
            "sceptre_du_sorcier_novice": { "name": "Novice Sorcerer's Scepter" },
            "sandales_de_conjurateur": { "name": "Conjurer's Sandals" },
            "orbe_tempetueux": { "name": "Stormy Orb" },
            "gantelets_runiques": { "name": "Runic Gauntlets" },
            "bague_de_lutteur": { "name": "Wrestler's Ring" }
        },
        "epic": {
            "armure_du_gardien": { "name": "Guardian's Armor" },
            "ceinture_de_puissance": { "name": "Belt of Power" },
            "heaume_de_champion": { "name": "Champion's Helm" },
            "main_de_gloire": { "name": "Hand of Glory" },
            "anneau_du_paria": { "name": "Outcast's Ring" },
            "corne_de_guerre_du_berserker": { "name": "Berserker's War Horn" },
            "gantelets_de_fureur": { "name": "Gauntlets of Fury" },
            "greves_du_defenseur": { "name": "Defender's Greaves" },
            "lame_du_crepuscule": { "name": "Dusk Blade" },
            "heaume_du_juggernaut": { "name": "Juggernaut's Helm" },
            "hache_de_bourreau": { "name": "Executioner's Axe" },
            "arc_de_chasseur_d_ombres": { "name": "Shadowhunter's Bow" },
            "bottes_de_l_echo": { "name": "Boots of the Echo" },
            "dagues_de_l_ombre_dansante": { "name": "Daggers of the Dancing Shadow" },
            "jambieres_de_l_assassin": { "name": "Assassin's Leggings" },
            "sandales_ailees": { "name": "Winged Sandals" },
            "arc_long_en_if": { "name": "Yew Longbow" },
            "bottes_de_l_arpenteur_silencieux": { "name": "Silent Strider's Boots" },
            "main_de_precision": { "name": "Hand of Precision" },
            "diademe_de_l_archimage": { "name": "Archmage's Diadem" },
            "grimoire_des_arcanes": { "name": "Grimoire of Arcana" },
            "mantelet_du_stratege": { "name": "Strategist's Mantle" },
            "robe_de_l_erudit_de_guerre": { "name": "War Scholar's Robe" },
            "talisman_de_mana": { "name": "Talisman of Mana" },
            "gant_du_savoir": { "name": "Glove of Knowledge" },
            "jambieres_en_acier_runique": { "name": "Runesteel Leggings" },
            "anneau_confrerie": { "name": "Ring of the Brotherhood" },
        },
        "legendary": {
            "collier_de_l_infinite": { "name": "Necklace of Infinity" },
            "talisman_du_parieur": { "name": "Gambler's Talisman" },
            "volonte_d_adamantium": { "name": "Adamantium Will" },
            "armure_de_sang": { "name": "Blood Armor" },
            "bottes_telluriques": { "name": "Telluric Boots" },
            "briselame": { "name": "Bladebreaker" },
            "kriss_de_sacrifice": { "name": "Sacrificial Kris" },
            "le_mur_du_roi_dechu": { "name": "The Fallen King's Wall" },
            "poignes_du_titan": { "name": "Titan's Grips" },
            "marteau_meteore": { "name": "Meteor Hammer" },
            "gantelets_du_colosse": { "name": "Colossus Gauntlets" },
            "fleche_celeste": { "name": "Celestial Arrow" },
            "griffes_de_l_ombre": { "name": "Shadow Claws" },
            "sandales_de_velocite": { "name": "Sandals of Velocity" },
            "murmure_du_vent": { "name": "Wind's Whisper" },
            "manteau_de_l_insaisissable": { "name": "Cloak of the Elusive" },
            "baton_du_sage_ancien": { "name": "Staff of the Ancient Sage" },
            "couronne_de_la_prophetie": { "name": "Crown of Prophecy" },
            "jambieres_runiques": { "name": "Runic Leggings" },
            "livre_des_ombres": { "name": "Book of Shadows" },
            "masque_du_vide": { "name": "Void Mask" },
            "baton_du_vide": { "name": "Void Staff" },
            "chapeau_de_l_archonte": { "name": "Archon's Hat" }
        },
        "mythic": {
            "casque_de_domination": { "name": "Helm of Domination" },
            "coeur_du_golem_primordial": { "name": "Heart of the Primordial Golem" },
            "gantelets_de_la_divinite": { "name": "Gauntlets of Divinity" },
            "jambieres_de_l_eternite": { "name": "Leggings of Eternity" },
            "l_oeil_du_neant": { "name": "The Eye of the Void" },
            "le_voile_des_etoiles": { "name": "The Veil of Stars" },
            "les_chaussures_des_songes": { "name": "The Shoes of Dreams" },
            "les_jambieres_du_titan": { "name": "The Titan's Leggings" },
            "robe_du_cosmos": { "name": "Robe of the Cosmos" },
            "tunique_du_phoenix": { "name": "Tunic of the Phoenix" },
            "bottes_de_l_errant_temporel": { "name": "Boots of the Time Wanderer" },
            "garde_du_destin": { "name": "Fate's Guard" },
            "l_epee_du_destin": { "name": "The Sword of Destiny" },
            "cuirasse_du_colosse": { "name": "Cuirass of the Colossus" },
            "greves_du_titan_sismique": { "name": "Greaves of the Seismic Titan" },
            "sceau_du_roi_barbare": { "name": "Seal of the Barbarian King" },
            "bottes_des_sept_lieues": { "name": "Seven-League Boots" },
            "l_arc_de_la_creation": { "name": "The Bow of Creation" },
            "gambison_de_l_astre_mortel": { "name": "Gambeson of the Mortal Star" },
            "gantelets_du_vif_argent": { "name": "Gauntlets of Quicksilver" },
            "masque_du_faucon_pelerin": { "name": "Mask of the Peregrine Falcon" },
            "le_grimoire_final": { "name": "The Final Grimoire" },
            "le_livre_des_mondes": { "name": "The Book of Worlds" },
            "robe_du_tisseur_de_sorts": { "name": "Robe of the Spellweaver" },
            "poignes_de_mana_glace": { "name": "Mana-Frost Grips" },
            "talisman_de_l_archonte": { "name": "Talisman of the Archon" },
            "les_etreintes_de_l_entropie": { "name": "The Grasps of Entropy" },
            "gantelets_de_la_flamme_glaciale": { "name": "Gauntlets of the Frostfire" },
            "diademe_de_l_oeil_arcanique": { "name": "Diadem of the Arcane Eye" },
            "jugement": { "name": "Judgment" }
        },
        "craft_only": {
            "plastron_de_golem": { "name": "Golem's Breastplate" },
            "gantelets_de_saignement": { "name": "Gauntlets of Bleeding" },
            "lame_petrifiante": { "name": "Petrifying Blade" },
            "hache_du_berserker": { "name": "Berserker's Axe" },
            "bouclier_carapace": { "name": "Carapace Shield" },
            "brisecoeur_runique": { "name": "Runic Heartbreaker" },
            "bottes_ailees": { "name": "Winged Boots" },
            "cape_etheree": { "name": "Ethereal Cape" },
            "pendentif_spectral": { "name": "Spectral Pendant" },
            "heaume_de_clairvoyance": { "name": "Helm of Clairvoyance" },
            "diademe_de_benediction": { "name": "Diadem of Blessing" },
            "couronne_de_seraphin": { "name": "Seraph's Crown" },
            "jambieres_en_chitine": { "name": "Chitin Leggings" },
            "armure_de_l_abysse": { "name": "Armor of the Abyss" },
            "cuirasse_draconique": { "name": "Draconic Cuirass" },
            "le_dernier_rempart": { "name": "The Last Bastion" },
            "entropie_lame_du_vide": { "name": "Entropy (Blade of the Void)" }
        }
    },
    "sets": {
        "armure_du_mercenaire": {
            "name": "Hardened Mercenary's Armor",
            "bonus2_name": "Iron Skin",
            "bonus5_name": "Veteran's Strength",
            "bonus7_name": "Retaliation",
            "item_head": "Mercenary's Helm",
            "item_torso": "Mercenary's Breastplate",
            "item_legs": "Mercenary's Legguards",
            "item_feet": "Mercenary's Boots",
            "item_hands": "Mercenary's Gauntlets",
            "item_weapon": "Mercenary's Sword",
            "item_accessory": "Mercenary's Talisman"
        },
        "tenue_du_franc_tireur": {
            "name": "Sharpshooter's Attire",
            "bonus2_name": "Alacrity",
            "bonus5_name": "Hawkeye",
            "bonus7_name": "Weak Point",
            "item_head": "Sharpshooter's Hood",
            "item_torso": "Sharpshooter's Jacket",
            "item_legs": "Sharpshooter's Trousers",
            "item_feet": "Sharpshooter's Boots",
            "item_hands": "Sharpshooter's Gloves",
            "item_weapon": "Sharpshooter's Bow",
            "item_accessory": "Sharpshooter's Quiver"
        },
        "habits_du_conjurateur": {
            "name": "Conjurer's Garments",
            "bonus2_name": "Quick Mind",
            "bonus5_name": "Meditation",
            "bonus7_name": "Arcane Focus",
            "item_head": "Conjurer's Hat",
            "item_torso": "Conjurer's Robe",
            "item_legs": "Conjurer's Breeches",
            "item_feet": "Conjurer's Sandals",
            "item_hands": "Conjurer's Gloves",
            "item_weapon": "Conjurer's Staff",
            "item_accessory": "Conjurer's Orb"
        },
        "panoplie_de_l_aventurier": {
            "name": "Adventurer's Panoply",
            "bonus2_name": "Traveler's Endurance",
            "bonus5_name": "Versatility",
            "bonus7_name": "Treasure Hunter",
            "item_head": "Adventurer's Hat",
            "item_torso": "Adventurer's Tunic",
            "item_legs": "Adventurer's Trousers",
            "item_feet": "Adventurer's Boots",
            "item_hands": "Adventurer's Gloves",
            "item_weapon": "Adventurer's Cutlass",
            "item_accessory": "Adventurer's Satchel"
        },
        "tenue_du_belluaire": {
            "name": "Beastmaster's Garb",
            "bonus2_name": "Thick Skin",
            "bonus5_name": "Rage of Combat",
            "bonus7_name": "Savage Instinct",
            "item_head": "Beast Bone Helm",
            "item_torso": "Monster Hide Harness",
            "item_legs": "Bounty Hunter's Leggings",
            "item_feet": "Tracker's Boots",
            "item_hands": "Scale Grips",
            "item_weapon": "Rending Axe",
            "item_accessory": "Hunting Trophy"
        },
        "regalia_du_predateur": {
            "name": "Predator's Regalia",
            "bonus2_name": "Hunter's Instinct",
            "bonus5_name": "Relentless Pursuit",
            "bonus7_name": "Master of the Hunt",
            "item_head": "Predator's Helm",
            "item_torso": "Predator's Cuirass",
            "item_legs": "Predator's Leggings",
            "item_feet": "Predator's Boots",
            "item_hands": "Predator's Grips",
            "item_weapon": "Predator's Fang",
            "item_accessory": "Predator's Eye"
        },
        "apparat_de_l_ombre_fileuse": {
            "name": "Shadow-Spinner's Attire",
            "bonus2_name": "Deadly Precision",
            "bonus5_name": "Swift Shot",
            "bonus7_name": "Dance of Death",
            "item_head": "Hood of the Shadow",
            "item_torso": "Tunic of the Shadow",
            "item_legs": "Greaves of the Shadow",
            "item_feet": "Boots of the Shadow",
            "item_hands": "Gloves of the Shadow",
            "item_weapon": "Whisper (Bow)",
            "item_accessory": "Quiver of the Shadow"
        },
        "ornements_de_l_arcaniste": {
            "name": "Arcanist's Ornaments",
            "bonus2_name": "Energy Channeling",
            "bonus5_name": "Ancient Knowledge",
            "bonus7_name": "Elemental Mastery",
            "item_head": "Arcanist's Diadem",
            "item_torso": "Arcanist's Robe",
            "item_legs": "Arcanist's Leggings",
            "item_feet": "Arcanist's Slippers",
            "item_hands": "Arcanist's Gloves",
            "item_weapon": "Arcanist's Staff",
            "item_accessory": "Arcanist's Tome"
        },
        "armure_du_gardien_implacable": {
            "name": "Armor of the Unrelenting Guardian",
            "bonus2_name": "Unbreakable Bastion",
            "bonus5_name": "Iron Will",
            "bonus7_name": "Anchor of the World",
            "item_head": "Guardian's Greathelm",
            "item_torso": "Guardian's Breastplate",
            "item_legs": "Guardian's Greaves",
            "item_feet": "Guardian's Solerets",
            "item_hands": "Guardian's Gauntlets",
            "item_weapon": "The Wall (Shield)",
            "item_accessory": "Guardian's Seal"
        },
        "armure_du_tyran_sanglant": {
            "name": "Armor of the Bloodthirsty Tyrant",
            "bonus2_name": "Bloodlust",
            "bonus5_name": "Tyrant's Mark",
            "bonus7_name": "Absolute Domination",
            "item_head": "Face of the Tyrant",
            "item_torso": "Heart of the Tyrant",
            "item_legs": "March of the Tyrant",
            "item_feet": "Spurs of the Tyrant",
            "item_hands": "Grip of the Tyrant",
            "item_weapon": "Tyrant's Cleaver",
            "item_accessory": "Seal of the Tyrant"
        },
        "panoplie_de_l_oeil_de_lynx": {
            "name": "Hawkeye's Panoply",
            "bonus2_name": "Piercing Gaze",
            "bonus5_name": "Sharpened Instinct",
            "bonus7_name": "Arrow Storm",
            "item_head": "Hawkeye's Visor",
            "item_torso": "Hawkeye's Harness",
            "item_legs": "Hawkeye's Leggings",
            "item_feet": "Hawkeye's Boots",
            "item_hands": "Hawkeye's Gloves",
            "item_weapon": "Hawkeye's Bow",
            "item_accessory": "Hawkeye's Talisman"
        },
        "vestiges_du_tisseur_de_tempetes": {
            "name": "Vestiges of the Stormweaver",
            "bonus2_name": "Arcane Conduit",
            "bonus5_name": "Calm Spirit",
            "bonus7_name": "Elemental Unleashing",
            "item_head": "Stormweaver's Circlet",
            "item_torso": "Stormweaver's Robe",
            "item_legs": "Stormweaver's Breeches",
            "item_feet": "Stormweaver's Steps",
            "item_hands": "Stormweaver's Hands",
            "item_weapon": "Stormweaver's Staff",
            "item_accessory": "Stormweaver's Core"
        },
        "panoplie_du_seigneur_de_guerre": {
            "name": "Warlord's Panoply",
            "bonus2_name": "Indomitable",
            "bonus5_name": "Bloodthirsty Fury",
            "bonus7_name": "Apocalypse",
            "item_head": "Warlord's Helm",
            "item_torso": "Warlord's Cuirass",
            "item_legs": "Warlord's Leggings",
            "item_feet": "Warlord's Boots",
            "item_hands": "Warlord's Fists",
            "item_weapon": "Rage (Axe)",
            "item_accessory": "Warlord's Standard"
        },
        "armure_de_l_oeil_fantome": {
            "name": "Armor of the Phantom Eye",
            "bonus2_name": "Invisible Strike",
            "bonus5_name": "Ghostly Speed",
            "bonus7_name": "One with the Shadows",
            "item_head": "Mask of the Phantom Eye",
            "item_torso": "Tunic of the Phantom Eye",
            "item_legs": "Leggings of the Phantom Eye",
            "item_feet": "Boots of the Phantom Eye",
            "item_hands": "Gloves of the Phantom Eye",
            "item_weapon": "Silence (Longbow)",
            "item_accessory": "Brooch of the Phantom Eye"
        },
        "regalia_de_l_esprit_du_monde": {
            "name": "Regalia of the World Spirit",
            "bonus2_name": "Arcane Echo",
            "bonus5_name": "Arcane Barrier",
            "bonus7_name": "Perfect Storm",
            "item_head": "Crown of the World Spirit",
            "item_torso": "Mantle of the World Spirit",
            "item_legs": "Leggings of the World Spirit",
            "item_feet": "Sandals of the World Spirit",
            "item_hands": "Gloves of the World Spirit",
            "item_weapon": "Scepter of the World Spirit",
            "item_accessory": "Orb of the World Spirit"
        },
        "tenue_de_l_archon_celeste": {
            "name": "Garb of the Celestial Archon",
            "bonus2_name": "Aura of Power",
            "bonus5_name": "Divine Precision",
            "bonus7_name": "Divine Judgment",
            "item_head": "Diadem of the Archon",
            "item_torso": "Robe of the Archon",
            "item_legs": "Breeches of the Archon",
            "item_feet": "Sandals of the Archon",
            "item_hands": "Gloves of the Archon",
            "item_weapon": "Scepter of the Archon",
            "item_accessory": "Orb of the Archon"
        }
    },
    "rarity": {
        "common": "Common",
        "uncommon": "Uncommon",
        "rare": "Rare",
        "epic": "Epic",
        "legendary": "Legendary",
        "mythic": "Mythic"
    },
    "artefacts": {
        "egide_du_herisson": {
            "name": "Hedgehog's Aegis",
            "description": "Transforms your body into a fortress bristling with spikes. Ideal for those who like their enemies to impale themselves on it."
        },
        "pacte_du_sanguinaire": {
            "name": "Bloodfiend's Pact",
            "description": "A simple pact: the vitality of your enemies becomes yours, but your flesh is more tender to their blows."
        },
        "talisman_du_point_faible": {
            "name": "Weak Point Talisman",
            "description": "You sacrifice your sturdiness for perfect knowledge of enemy weak points. Every critical hit is devastating."
        },
        "dague_rituelle_echancree": {
            "name": "Notched Ritual Dagger",
            "description": "This dagger binds you to the art of bleeding. Your strikes open gaping wounds, but you can no longer heal on impact."
        },
        "pierre_de_flux": {
            "name": "Flowstone",
            "description": "A gem that transforms your body into a conduit of pure mana, at the expense of your physical shell."
        },
        "toge_du_stoique": {
            "name": "Stoic's Toga",
            "description": "An enchanted robe to endure, not to destroy. You become a bastion of magical resistance."
        },
        "marteau_de_stase_temporelle": {
            "name": "Temporal Stasis Hammer",
            "description": "Each impact has a chance to freeze the enemy in time, but your blows lose their brute force."
        },
        "idole_du_martyr": {
            "name": "Martyr's Idol",
            "description": "You refuse conventional healing, relying only on the blood of your enemies to survive in the heart of the melee."
        },
        "plume_de_zephyr": {
            "name": "Zephyr's Feather",
            "description": "Embody the wind. Your agility becomes unparalleled, but your physical strength wanes."
        },
        "de_du_destin_truque": {
            "name": "Loaded Die of Destiny",
            "description": "You bet everything on the perfect strike. Your critical hits are overpowered, but you'll have to find your luck elsewhere."
        },
        "diademe_de_l_imprudent": {
            "name": "Diadem of the Reckless",
            "description": "Immense power in exchange for extreme fragility. The epitome of the 'Glass Cannon'."
        },
        "sceau_de_l_altruiste": {
            "name": "Altruist's Seal",
            "description": "Your healing becomes divine, but your offensive magic weakens."
        },
        "voeu_du_gardien": {
            "name": "Guardian's Vow",
            "description": "Become an impassable wall, but abandon all notion of finesse and lucky shots."
        },
        "fragment_de_fureur_pure": {
            "name": "Shard of Pure Fury",
            "description": "Unmatched offensive power, at the cost of a weakened constitution."
        },
        "aiguille_de_verre": {
            "name": "Glass Needle",
            "description": "Your arrows pierce any armor, but your body is as fragile as glass."
        },
        "calice_de_magie_sanguine": {
            "name": "Chalice of Blood Magic",
            "description": "Transform your vitality into arcane power. Every spell is both a wound and a heal."
        },
        "coeur_du_berserker": {
            "name": "Berserker's Heart",
            "description": "Unleash a pure rage that doubles your damage, but leaves you completely exposed."
        },
        "volonte_du_titan": {
            "name": "Titan's Will",
            "description": "An unstoppable force of nature that crushes enemies under its weight, but is slow and clumsy."
        },
        "oeil_de_lynx_fantome": {
            "name": "Phantom Lynx Eye",
            "description": "Your eye sees all flaws, giving you an almost supernatural chance to crit, but your frail body cannot withstand it for long."
        },
        "carquois_infini_paradoxal": {
            "name": "Quiver of the Paradoxical Infinite",
            "description": "Your shots are deadly accurate, but this focus prevents you from seeing the world's treasures."
        },
        "orbe_de_surcharge_arcanique": {
            "name": "Orb of Arcane Overload",
            "description": "An unstable sphere that amplifies raw magic, but consumes more of it. For mages who aren't afraid to empty their reserves."
        },
        "fragment_du_nexus": {
            "name": "Nexus Shard",
            "description": "Channel pure magic, becoming a conduit of power, but your body struggles to contain such energy."
        }
    },
    "bosses": {
        "grand_gobelin_grognon": { "name": "Grumpy Great Goblin" },
        "ogre_colossal": { "name": "Colossal Ogre" },
        "dragonnet_de_feu": { "name": "Fire Drake" },
        "seigneur_vampire": { "name": "Vampire Lord" },
        "lich_archimage": { "name": "Archmage Lich" },
        "guild_boss_1": { "name": "Corrupted Guild Titan" }
    },
    "enemies": {
        "rat_geant": { "name": "Giant Rat", "description": "An abnormally large and aggressive rodent, often found in cellars and sewers." },
        "reine_des_rats": { "name": "Rat Queen", "description": "A deformed, bloated creature that commands swarms of smaller rats. Its bite can transmit diseases." },
        "bandit": { "name": "Bandit", "description": "An opportunistic outlaw who preys on unwary travelers. Only dangerous in groups." },
        "chef_bandit": { "name": "Bandit Chief", "description": "Stronger and better equipped than a regular bandit, he leads his small gang with an iron fist." },
        "golem_pierre": { "name": "Stone Golem", "description": "A magical guardian made of rock and earth. Slow but incredibly resilient." },
        "mini_golem_pierre": { "name": "Mini Stone Golem", "description": "A smaller, less resilient version of the stone golem, but just as determined." },
        "gardien_de_pierre_eterne": { "name": "Eternal Stone Guardian", "description": "An ancient golem imbued with powerful magic, protecting forgotten secrets." },
        "elementaire_eau": { "name": "Water Elemental", "description": "A spirit of water capable of changing its form. Its attacks are fluid and hard to parry." },
        "insecte_mineur": { "name": "Minor Insect", "description": "A chitinous creature that digs tunnels. Its carapace is surprisingly strong." },
        "araignee_de_cave": { "name": "Cave Spider", "description": "A modestly sized but venomous spider that weaves its webs in the darkness." },
        "loup_affame": { "name": "Starving Wolf", "description": "Fast and vicious, this wolf attacks in packs and is driven by an insatiable hunger." },
        "sanglier_furieux": { "name": "Furious Boar", "description": "A raw force of nature, charging everything that moves with its sharp tusks." },
        "araignee_geante": { "name": "Giant Spider", "description": "A predator much larger than its cellar-dwelling cousins, capable of trapping a man in its web." },
        "griffon": { "name": "Griffin", "description": "A majestic half-eagle, half-lion creature. Territorial and formidable in the air." },
        "basilic": { "name": "Basilisk", "description": "A feared reptile whose gaze can petrify its victims. Its skin is as thick as rock." },
        "scorpion_des_sables": { "name": "Sand Scorpion", "description": "A desert scorpion with particularly virulent venom." },
        "ver_des_sables": { "name": "Giant Sandworm", "description": "A colossal creature that moves beneath the sand to surprise its prey." },
        "gobelin_frondeur": { "name": "Goblin Slinger", "description": "Weak but annoying, it harasses its enemies from a distance with projectiles." },
        "chef_gobelin": { "name": "Dissonant Goblin Chief", "description": "Smarter and stronger than a normal goblin, it is often corrupted by Dissonance." },
        "orc_berserker": { "name": "Orc Berserker", "description": "An orc warrior who enters a blind rage in combat, ignoring pain." },
        "squelette_guerrier": { "name": "Skeleton Warrior", "description": "An undead soldier animated by dark magic. It fights without fear or pity." },
        "necromancien_apprenti": { "name": "Apprentice Necromancer", "description": "A sorcerer who has dabbled in forbidden arts, capable of reanimating the dead." },
        "cultiste_zelote": { "name": "Zealot Cultist", "description": "A fanatic devoted to a dark entity, willing to die for their cause." },
        "garde_automate": { "name": "Automaton Guard", "description": "A tireless mechanical guardian, built to protect ancient places." },
        "initie_de_l_ombre": { "name": "Shadow Initiate", "description": "A low-ranking member of an assassins' guild, fast and stealthy." },
        "assassin_de_l_ombre": { "name": "Shadow Assassin", "description": "A professional killer who uses the shadows to strike unseen." },
        "maitre_de_l_ombre": { "name": "Shadow Master", "description": "An assassin guild leader, whose mastery of stealth and poisons is legendary." },
        "spectre_gemissant": { "name": "Wailing Spectre", "description": "The tormented spirit of a deceased person, whose cries can chill the blood and weaken the soul." },
        "elementaire_de_magma": { "name": "Magma Elemental", "description": "A spirit of fire and molten earth, whose mere touch can melt steel." },
        "harpie": { "name": "Harpy", "description": "A half-woman, half-bird creature, whose shrill cries are as dangerous as its talons." },
        "momie_gardienne": { "name": "Guardian Mummy", "description": "An ancient tomb guardian, whose wrappings are imbued with curses." },
        "djinn": { "name": "Djinn", "description": "A powerful elemental spirit, capable of manipulating winds and sand at will." },
        "le_collecteur": { "name": "The Collector (Golem)", "description": "A unique golem that seems to collect and absorb the energy of magical items." },
        "chimere": { "name": "Chimera", "description": "An alchemical abomination, a mixture of several creatures into a single furious entity." },
        "chimere_renforcee": { "name": "Reinforced Chimera", "description": "Larry's masterpiece, an enhanced and much deadlier version of the classic Chimera." },
        "hydre_des_marais": { "name": "Swamp Hydra", "description": "A multi-headed reptilian creature, where each severed head can grow back two more." },
        "otyugh": { "name": "Otyugh", "description": "A foul creature that lurks in waste and sewers, attacking with its tentacles." },
        "minotaure": { "name": "Minotaur", "description": "A half-man, half-bull beast, possessing brute strength and a non-existent sense of direction." },
        "profond_guerrier": { "name": "Deep One Warrior", "description": "A humanoid amphibious creature that emerges from the ocean depths to plunder the coasts." },
        "profond_champion": { "name": "Deep One Champion", "description": "An elite Deep One warrior, larger, stronger, and heavily armed." },
        "archange": { "name": "Archangel of Light", "description": "A celestial being of immense power, guardian of a divine place or artifact." },
        "dragon_rouge_ancien": { "name": "Ancient Red Dragon", "description": "One of the oldest and most powerful dragons, whose breath can reduce a city to ashes." },
        "archimage_dement": { "name": "Demented Archmage", "description": "A sorcerer whose mind has been broken by too much knowledge, making him unpredictable and dangerous." },
        "roi_singe_esprit": { "name": "Monkey King Spirit", "description": "The mischievous and incredibly powerful spirit of an ancient king-god, a master of illusion." },
        "shoggoth": { "name": "Shoggoth", "description": "A protoplasmic mass of eyes and mouths, a creature from another age whose mere sight drives one mad." },
        "golem_pierre_mythique": { "name": "Mythical Stone Guardian", "description": "A golem so ancient it has become part of the mountain itself, animated by the most primordial magic." },
        "roi_barbare": { "name": "Hrothgar, the Barbarian King", "description": "The greatest war chief of the northern tribes, whose strength is legendary." },
        "archere_elfe": { "name": "Lirael, the Elf Archer", "description": "An elven archer whose arrows are guided by magic and never miss their mark." },
        "chevalier_eternel": { "name": "Sir Gideon, the Eternal Knight", "description": "A knight cursed to fight for eternity, whose combat experience is unparalleled." },
        "forgeron_demon": { "name": "Soul Forger", "description": "A demon who forges cursed weapons using mortal souls as fuel." },
        "demon_mineur": { "name": "Lesser Demon", "description": "A basic soldier of the infernal legions, cruel and merciless." },
        "general_demon": { "name": "Demon General", "description": "A commander of the demonic armies, possessing formidable strength and strategy." },
        "horreur_dimensionnelle": { "name": "Dimensional Horror", "description": "A creature from another reality, whose form defies the laws of geometry." },
        "griffon_corrompu": { "name": "Corrupted Griffin", "description": "A noble griffin whose mind has been twisted by corruption, turning it into a killing machine." },
        "dragon_corrompu": { "name": "Corrupted Ancient Dragon", "description": "An ancient dragon whose power has been amplified and perverted by an evil force." },
        "dieu_fou": { "name": "Malakor, the Mad God", "description": "A fallen god whose mind has succumbed to madness, threatening to undo creation." },
        "double_sombre": { "name": "Dark Double", "description": "Your reflection from a mirror world, embodying all your worst instincts." },
        "ouroboros": { "name": "Ouroboros, Guardian of the Cycle", "description": "The cosmic serpent that bites its own tail, guardian of the eternal recurrence." },
        "talos_reforge": { "name": "Reforged Talos", "description": "The divine bronze colossus, rebuilt and enhanced with unknown magic." },
        "scarabee_goliath": { "name": "Goliath Beetle", "description": "A giant insect with a carapace as hard as iron, aggressively protecting its underground territory." },
        "ver_de_racine": { "name": "Armored Rootworm", "description": "A massive worm-like creature that feeds on the roots of the oldest plants, equipped with thick skin." },
        "tutorial_dummy": { "name": "Corrupted Effigy", "description": "A simple training dummy, animated by a faint spark of Dissonance. Perfect for practice." },
        "loup_dissonant": { "name": "Dissonant Wolf", "description": "A wolf whose body is streaked with purple crystals. Its fury is no longer natural; it is fueled by chaos." },
        "gardien_erode": { "name": "Eroded Guardian", "description": "A time-worn stone golem, whose protective magic has been weakened and perverted by Dissonance." },
        "esprit_ancien_tourmente": { "name": "Tormented Ancient Spirit", "description": "The specter of a sage or hero, whose rest has been disturbed by Dissonance, making it hostile and confused." },
        "heraut_du_silence": { "name": "Herald of Silence", "description": "An enigmatic creature, a messenger of a higher power, which fights with cold and silent precision." },
        "juge_dissonant": { "name": "Dissonant Judge", "description": "A black crystal construct sent by Larry, designed to analyze and counter the powers of 'ascended' beings." },
        "fragment_de_dissonance_mineur": { "name": "Minor Dissonance Shard", "description": "A crystalline and chaotic manifestation of pure Dissonance, unpredictable and aggressive." },
        "gardien_verrouille": { "name": "Locked Guardian", "description": "An ancient protective golem, now powered and corrupted by a Dissonance rift it was meant to contain." },
        "arme_de_larry": { "name": "Larry's Weapon", "description": "A humanoid creature forged from pure Dissonance, designed for combat and the elimination of specific targets." },
        "harmoniste_corrompu": { "name": "Corrupted Harmonist", "description": "A former member of the Order of Harmony, transformed by Larry into a living instrument of Dissonance, capable of manipulating the melody of chaos." },
        "larry_invincible": { "name": "Larry's Projection", "description": "An illusion of Larry, used to test and torment his opponents without taking any risks." },

    },
    "bounties": {
        "bf01": { "name": "Rot-Claw, the Rat King" },
        "bf02": { "name": "Fierce-Snout, the Father of Boars" },
        "bf03": { "name": "Klarg, the Goblin Clan Chief" },
        "bf04": { "name": "Fuzzy-Paw, the Weaver Matriarch" },
        "bf05": { "name": "Captain Rattlebones" },
        "bf06": { "name": "The Masked Marauder" },
        "bf07": { "name": "The Gray-Paw Alpha Wolf" },
        "bf08": { "name": "The Restless Gravedigger" },
        "bf09": { "name": "The Mad Goblin Tinker" },
        "bf10": { "name": "The Wind-Howler Harpy" },
        "bm01": { "name": "Steel-Fang, the Terror of the Plains" },
        "bm02": { "name": "The Fractured Guardian" },
        "bm03": { "name": "Akhen-Sut, the Mummified Lord" },
        "bm04": { "name": "Storm-Feather, the Elder Griffin" },
        "bm05": { "name": "Asterion, the Labyrinth's Champion" },
        "bm06": { "name": "The Pale Necromancer" },
        "bm07": { "name": "The Onyx Scorpion" },
        "bm08": { "name": "Grog-nak, the Untamable Berserker" },
        "bm09": { "name": "The Brine Elemental" },
        "bm10": { "name": "The Malfunctioning Automaton Guard" },
        "bd01": { "name": "The Silent Blade" },
        "bd02": { "name": "Stone-Gaze, the Basilisk King" },
        "bd03": { "name": "Malik, the Master of Winds" },
        "bd04": { "name": "K'tharr, the Herald of the Depths" },
        "bd05": { "name": "The Primordial Abomination" },
        "bd06": { "name": "Fetid Swamp Hydra Mother" },
        "bd07": { "name": "The Alpha Sandworm" },
        "bd08": { "name": "The Skeleton Shogun" },
        "bd09": { "name": "The Overloaded Collector" },
        "bd10": { "name": "The Demon Soul Forger" },
        "be01": { "name": "Xar'thul, the Abyss General" },
        "be02": { "name": "Vex'lor, the Immortal Archlich" },
        "be03": { "name": "Ignis Prime, the Incarnate Calamity" },
        "be04": { "name": "The Vengeful Spirit of the Monkey King" },
        "be05": { "name": "Talos, the Reforged Colossus" },
        "be06": { "name": "The Famished Shoggoth" },
        "be07": { "name": "The Fallen Archangel" },
        "be08": { "name": "The Walking Horror" },
        "be09": { "name": "Hrothgar, the Revenant King" },
        "be10": { "name": "Ouroboros, the End of Cycles" }
    },
    "expeditions": {
        "alerts": {
            "start_busy": "You can't start an expedition now, you are busy!",
            "bounty_lost": "You were defeated by your target. The bounty escapes you for today.",
            "lost_and_empty_handed": "You got lost and are returning empty-handed.",
            "attempt_failed": "Your attempt failed...",
            "succumbed_to_wounds": "You succumbed to your wounds... All is lost.",
            "merchant_out_of_stock": "This item is out of stock!",
            "bought_item": "You bought {itemName}!",
            "not_enough_resources": "Not enough resources!",
            "sold_resource": "You sold {amount} {resourceName} for {price} 💠.",
            "sell_bonus": " (Bonus: +{bonus} 💠)",
            "not_enough_to_sell": "You don't have enough of this resource to sell!",
            "fled_expedition_ended": "You fled the fight, ending your expedition prematurely.",
            "not_enough_energy": "You are too tired for this expedition!" // MODIFIED
        },
        "ui": {
            "refresh_button_cooldown": "Refresh ({time}s)",
            "refresh_button_ready": "Refresh",
            "recommended_stats": "Recommended Stats:",
            "start_button": "Start Adventure",
            "rewards": {
                "xp": "XP: ~{amount}",
                "resources": "Resources: {resources}",
                "item_drop": "Item Drop: <strong class=\"rarity-uncommon\">{chance}% chance</strong>",
                "chance_breakdown": " <small class=\"chance-breakdown\">({base}% + {bonus}%)</small>"
            },
            "event": {
                "hp_display": "{hpIcon} HP: <span class=\"{hpColorClass}\">{current}</span> / {max}",
                "merchant_sells": "{merchantName} sells:",
                "player_sells": "You sell:",
                "stock_info": " (Stock: {current}/{max})",
                "sell_price_for": "For {price} 💠",
                "risk_label": "Risk",
                "cost_label": "Cost",
                "effect_display_flat": " ({type}: -{value} {unit})",
                "effect_display_percent": " ({type}: -{value}% {unit})",
                "success_chance": " — [{chance}% success]",
                "please_wait": "Please wait...",
                "action_in_progress": "Action in progress...",
                "time_remaining": "Time remaining: {time} sec"
            }
        },
        "log": {
            "damage_taken_flat": "You took ##DMG:{amount}## damage.",
            "hp_recovered_flat": "You recover ##HEAL:{amount}## health points.",
            "temp_buff": "You receive a temporary bonus of +{value} to {stat}.",
            "from_expedition": "from the \"{expeditionName}\" expedition",
            "fled_and_lost_rewards": "Fled from combat. All expedition rewards are lost.",
            "xp_from_enemy": "You gained ##XP:{xp}## by defeating {enemyName}.",
            "resource_from_enemy": "You recover ##RES:{resource}:{amount}## from {enemyName}.",
            "rare_item_found": "✨ You found a rare item: {itemName}!",
            "xp_gain_simple": "You gain {xp} XP.",
            "resource_gain_simple": "You gather {amount} of {resource}.",
            "combat_loss_penalty": "Defeated in combat: -{xp} XP."
        },
        "random_events": {
            "sac_perdu": {
                "description": "You come across a traveler's bag, obviously fallen from a cart. It seems to contain something.",
                "choice1_text": "Open it and take the contents",
                "choice1_success_text": "You find a handful of various materials. It's your lucky day.",
                "choice2_text": "Leave it, it's not yours (gain 'good deed' XP)",
                "choice2_success_text": "Your conscience is clear. You feel a little wiser."
            },
            "marchand_mystere": {
                "description": "A hooded merchant appears as if by magic. He offers you a single item, a 'Sealed Casket', for a ridiculously low price.",
                "choice1_text": "Buy the casket (costs 100 of each resource)",
                "choice1_success_text": "You buy the casket. The merchant vanishes. Inside... a small amount of Shards! Good deal!",
                "choice1_failure_text": "You don't have the funds. The merchant vanishes as quickly as he appeared.",
                "choice2_text": "Refuse the suspicious offer",
                "choice2_success_text": "Better safe than sorry. You refuse and the merchant disappears in a puff of smoke."
            },
            "trouver_coffre": {
                "description": "On your way, you spot an old, half-buried wooden chest.",
                "choice1_text": "Try to open it (takes time)",
                "choice1_success_text": "The chest contained some useful resources!",
                "choice2_text": "Ignore it and continue on your way",
                "choice2_success_text": "You have no time to lose. You continue on your path."
            },
            "filon_metal": {
                "description": "You notice a vein of shiny metal on a rock face.",
                "choice1_text": "Take the time to mine it (Strength 5+)",
                "choice1_success_text": "Your strength allows you to quickly extract a good chunk of metal.",
                "choice1_failure_text": "The rock is too hard. You waste time and energy for nothing.",
                "choice2_text": "Ignore it",
                "choice2_success_text": "You're not equipped for this. You move on."
            },
            "pillards": {
                "description": "A group of raiders blocks your path and demands a tribute!",
                "choice1_text": "Give them 40 metal to calm them down",
                "choice1_success_text": "You give them what they ask for. They let you pass.",
                "choice1_failure_text": "'That's not enough!' They push you around and steal a little more.",
                "choice2_text": "Try to flee (Agility 10+)",
                "choice2_success_text": "You're faster! You lose them without a problem.",
                "choice2_failure_text": "They catch you and take what they can by force."
            },
            "source_curative": {
                "description": "You discover a small spring of crystal-clear water. The water seems to vibrate with a soothing energy.",
                "choice1_text": "Drink from the spring",
                "choice1_success_text": "The cool, pure water heals some of your wounds.",
                "choice2_text": "Be wary and continue on",
                "choice2_success_text": "In the wild, caution is the mother of safety. You ignore the spring."
            },
            "champignon_etrange": {
                "description": "You find a mushroom with psychedelic colors. It could be delicious, nutritious... or deadly.",
                "choice1_text": "Eat it (Luck 15+)",
                "choice1_success_text": "It's delicious! You feel invigorated and full of life!",
                "choice1_failure_text": "Bad idea. You are seized by violent stomach cramps.",
                "choice2_text": "Leave it where it is",
                "choice2_success_text": "You're not an expert in mycology. Wise decision."
            },
            "animal_blesse": {
                "description": "You find a young wolf with its paw caught in an old poacher's trap. It whimpers in pain but growls at you if you approach.",
                "choice1_text": "Try to free it (Intelligence 12+)",
                "choice1_success_text": "With gentleness and patience, you manage to open the trap. The wolf cub licks your hand before disappearing into the woods. Your act of kindness brings you great satisfaction.",
                "choice1_failure_text": "While trying to help, the panicked animal bites you before fleeing. Ingratitude hurts.",
                "choice2_text": "Ignore it. Nature is cruel.",
                "choice2_success_text": "You continue on your way, with a slightly heavy heart."
            },
            "statue_antique": {
                "description": "In the middle of nowhere, a mossy statue of an ancient hero stands. It looks like you can make an offering to it.",
                "choice1_text": "Offer 20 Cloth for a wish of protection",
                "choice1_success_text": "You place the cloth at the statue's feet. You feel a protective aura envelop you.",
                "choice1_failure_text": "You don't have enough cloth to make a worthy offering.",
                "choice2_text": "Pray for good fortune (Luck 10+)",
                "choice2_success_text": "Your prayer seems to have been heard. You feel luckier.",
                "choice2_failure_text": "The statue remains stone-cold. Your prayers are lost in the wind."
            },
            "meteo_capricieuse": {
                "description": "The weather changes abruptly. A violent storm breaks out!",
                "choice1_text": "Take shelter in a cave (takes time)",
                "choice1_success_text": "You wait for the storm to pass. You stay dry but lose time.",
                "choice2_text": "Continue despite the rain (Vitality 15+)",
                "choice2_success_text": "Your robust constitution allows you to endure the cold and rain without getting sick.",
                "choice2_failure_text": "The freezing cold saps your strength. You arrive at your destination soaked and weakened."
            },
            "aventurier_perdu": {
                "description": "You meet another adventurer, looking lost and desperate. He asks you for food.",
                "choice1_text": "Share some of your resources (15 Wood)",
                "choice1_success_text": "You give him enough to make a fire. In thanks, he gives you crucial information about a nearby hidden treasure.",
                "choice1_failure_text": "You don't have much to share. The adventurer leaves, disappointed.",
                "choice2_text": "Refuse. Every man for himself.",
                "choice2_success_text": "You refuse curtly. The adventurer gives you a dark look before leaving. You feel you've made an enemy."
            },
            "reve_etrange": {
                "description": "Night falls and you fall asleep. You have a strangely lucid dream that seems to guide you.",
                "choice1_text": "Follow the dream's vision (Intelligence 18+)",
                "choice1_success_text": "Your instinct tells you to trust the dream. It leads you off the beaten path to a geode filled with shining shards!",
                "choice1_failure_text": "You try to follow the vision, but it was too confusing. You get lost and waste time finding your way back.",
                "choice2_text": "Ignore the dream, it's just a dream.",
                "choice2_success_text": "You wake up and resume your journey, leaving the mysteries of the night behind."
            },
            "obstacle_naturel": {
                "description": "A huge tree has fallen across the path, blocking the way.",
                "choice1_text": "Destroy it with an axe (Strength 20+)",
                "choice1_success_text": "A few well-placed axe swings and the path is clear. You gather some wood in the process.",
                "choice1_failure_text": "The tree is too massive. You waste your energy in vain.",
                "choice2_text": "Climb over the obstacle (Agility 15+)",
                "choice2_success_text": "You climb over the trunk with surprising agility.",
                "choice2_failure_text": "You slip and fall on the other side. Nothing broken, but your pride takes a hit."
            },
            "poupee_abandonnee": {
                "description": "You find an old rag doll, dirty but intact, sitting on a stone.",
                "choice1_text": "Take it with you (Luck 12+)",
                "choice1_success_text": "As you pick it up, you feel a small pouch sewn inside. It contains a shard! The doll seems to smile at you.",
                "choice1_failure_text": "You take it. Later that night, you are awakened by whispers. The doll is haunted! You throw it away and flee, terrified.",
                "choice2_text": "Leave the cursed object where it is",
                "choice2_success_text": "This object doesn't inspire confidence. You leave it alone."
            },
            "echo_mysterieux": {
                "description": "You hear an echo that repeats your own footsteps, but with a slight delay. It's unsettling.",
                "choice1_text": "Confront the echo (Defense 10+)",
                "choice1_success_text": "You shout 'Who's there?'. The echo stops. It was a 'Sonic Doppelganger', a shy creature. As it leaves, it leaves behind an arcane essence.",
                "choice1_failure_text": "The creature manifests and hits you with a sound wave. The attack disorients you.",
                "choice2_text": "Pick up the pace to lose it",
                "choice2_success_text": "You take no chances and flee. The echo disappears after a few minutes."
            },
            "carte_au_tresor_dechiree": {
                "description": "You find a piece of a treasure map on a skeleton's body.",
                "choice1_text": "Follow the map (Intelligence 15+)",
                "choice1_success_text": "Despite the few clues, you manage to locate the spot. A small chest is buried there!",
                "choice1_failure_text": "The map is too incomplete. You walk in circles for nothing.",
                "choice2_text": "Keep the map for later",
                "choice2_success_text": "Maybe you'll find the other half one day. You keep it safe."
            },
            "constellation_etrange": {
                "description": "At night, you notice a new constellation in the sky. It seems to be calling to you.",
                "choice1_text": "Meditate on it (Intelligence 20+)",
                "choice1_success_text": "By focusing on the constellation, you understand a new truth about the world, which sharpens your mind.",
                "choice1_failure_text": "The starlight gives you a terrible migraine.",
                "choice2_text": "Ignore it and sleep",
                "choice2_success_text": "Sleep is more important than the stars. You fall asleep."
            }
        },
        "starters": {
            "aventureRiviere": {
                "title": "The Raging River",
                "flavorText": "A powerful stream blocks your path."
            },
            "aventureForet": {
                "title": "The Dark Forest",
                "flavorText": "An ancient and oppressive forest stands before you."
            },
            "enqueteVillage": {
                "title": "The Pie Thief",
                "flavorText": "The baker's pies are mysteriously disappearing."
            },
            "livraisonUrgence": {
                "title": "The Urgent Delivery",
                "flavorText": "The herbalist needs rare herbs for a remedy. Time is running out!"
            },
            "menaceRats": {
                "title": "The Giant Rat Menace",
                "flavorText": "The farmer complains of an invasion of rats as big as dogs."
            },
            "medaillonPerdu": {
                "title": "The Lost Locket",
                "flavorText": "A young woman has lost a precious locket near the lake."
            },
            "herbesGuerison": {
                "title": "The Healing Herbs",
                "flavorText": "The village apothecary needs Silverleaf for a sick patient."
            },
            "problemeGobelins": {
                "title": "A Goblin Problem",
                "flavorText": "Thieving goblins have set up a small camp near the trade route."
            },
            "nettoyageCave": {
                "title": "Cellar Cleaning",
                "flavorText": "The local tavern is infested with giant spiders in its wine cellar."
            },
            "lettrePerdue": {
                "title": "The Lost Letter",
                "flavorText": "A clumsy postman has lost an important letter intended for the mayor."
            },
            "reparationCloture": {
                "title": "Fence Repair",
                "flavorText": "A farmer's sheep flock is escaping due to a fence broken by wolves."
            },
            "leChatPerdu": {
                "title": "The Countess's Cat",
                "flavorText": "The countess's Persian cat has run away. She is offering a reward."
            },
            "bruitCimetiere": {
                "title": "Noises in the Cemetery",
                "flavorText": "The gravedigger is scared by strange noises at night."
            },
            "livreEnRetard": {
                "title": "An Overdue Book",
                "flavorText": "The librarian tasks you with retrieving a book borrowed by a reclusive hermit."
            },
            "lePuitsEmpoisonne": {
                "title": "The Poisoned Well",
                "flavorText": "The water from the hamlet's well tastes strange and is making people sick."
            },
            "laPecheMiraculeuse": {
                "title": "The Miraculous Catch",
                "flavorText": "A fisherman complains that something big is scaring away all the fish in the lake."
            },
            "aventureRuines": {
                "title": "The Forgotten Ruins",
                "flavorText": "Ancient ruins promise treasures and dangers."
            },
            "escorteMarchand": {
                "title": "The Merchant's Escort",
                "flavorText": "A nervous merchant needs protection on the road."
            },
            "aventureMarais": {
                "title": "The Misty Swamp",
                "flavorText": "A foul-smelling swamp where it's easy to get lost."
            },
            "problemeMine": {
                "title": "Trouble at the Mine",
                "flavorText": "Miners are trapped by a cave-in and strange creatures."
            },
            "boisMurmurants": {
                "title": "The Whispering Woods",
                "flavorText": "Travelers avoid a part of the forest, frightened by spectral whispers."
            },
            "pontSabote": {
                "title": "The Sabotaged Bridge",
                "flavorText": "The main merchant bridge is damaged. Accident or malice?"
            },
            "leContratDHerboriste": {
                "title": "The Herbalist's Contract",
                "flavorText": "Retrieve a Moonflower from the top of a harpy-infested cliff."
            },
            "laCrypteAgitee": {
                "title": "The Restless Crypt",
                "flavorText": "The dead find no rest in the old founders' crypt."
            },
            "laTourDeGardeAbandonnee": {
                "title": "The Abandoned Watchtower",
                "flavorText": "An old watchtower is said to have become a bandits' hideout."
            },
            "leGeyserInstable": {
                "title": "The Unstable Geyser",
                "flavorText": "A geyser threatens a small mining camp with its unpredictable eruptions."
            },
            "leTrolSousLePont": {
                "title": "The Troll Under the Bridge",
                "flavorText": "A troll is blocking a crucial bridge and demanding an exorbitant toll."
            },
            "lesCultistesDansLesBois": {
                "title": "The Cultists in the Woods",
                "flavorText": "Strange rituals are taking place in the forest. A discreet investigation is needed."
            },
            "laFolieDuCollectionneur": {
                "title": "The Collector's Madness",
                "flavorText": "An eccentric nobleman hires you to 'acquire' a statue from a rival mansion."
            },
            "leSilenceDeLaFerme": {
                "title": "The Silence of the Farm",
                "flavorText": "An isolated farm has not been heard from for a week."
            },
            "lePuitsDesSouhaits": {
                "title": "The Wishing Well",
                "flavorText": "Legend says a well grants wishes, but it is guarded by a greedy spirit."
            },
            "laBetedesPlaines": {
                "title": "The Beast of the Plains",
                "flavorText": "A fast and ferocious creature is attacking travelers on the plains."
            },
            "chassePrimeBandit": {
                "title": "Bandit Bounty",
                "flavorText": "The captain of the guard is offering a reward for a bandit camp."
            },
            "aventureMontagne": {
                "title": "The Icy Mountain",
                "flavorText": "The biting cold of this peak will test your endurance."
            },
            "artefactMaudit": {
                "title": "The Crypt's Artifact",
                "flavorText": "An ancient crypt is said to hold a powerful, but cursed, artifact."
            },
            "caravaneDisparue": {
                "title": "The Vanished Caravan",
                "flavorText": "A luxury caravan never reached its destination. Find it."
            },
            "templeEnglouti": {
                "title": "The Sunken Temple",
                "flavorText": "A drought has revealed the entrance to a temple once underwater."
            },
            "tournoiArene": {
                "title": "The Arena Tournament",
                "flavorText": "The local arena is hosting a tournament for adventurers. Prove your worth!"
            },
            "laTaniereDuBasilic": {
                "title": "The Basilisk's Lair",
                "flavorText": "A basilisk has taken up residence in a quarry, petrifying the workers."
            },
            "leNavireFrequente": {
                "title": "The Frequented Ship",
                "flavorText": "The wreck of a grounded galleon is said to be haunted by its ghostly crew."
            },
            "leTournoiDuFauconDeFer": {
                "title": "The Iron Falcon Tournament",
                "flavorText": "A prestigious archery tournament with a hefty prize."
            },
            "lesMinesDeCristal": {
                "title": "The Crystal Mines",
                "flavorText": "Animated crystal creatures have taken over a precious mine."
            },
            "leVolDuSiecle": {
                "title": "The Heist of the Century",
                "flavorText": "Infiltrate the capital's museum to steal the 'Dawn Diamond'."
            },
            "laGuerreDesGuildes": {
                "title": "The Guild War",
                "flavorText": "The thieves' guild and the assassins' guild are in open war. Choose your side."
            },
            "loasisPerdue": {
                "title": "The Lost Oasis",
                "flavorText": "Find a legendary oasis in the heart of the desert, guarded by a Djinn."
            },
            "leRituelDeSang": {
                "title": "The Blood Ritual",
                "flavorText": "A group of necromancers is preparing a dangerous ritual in a ruined citadel."
            },
            "laFievreDeLOr": {
                "title": "Gold Fever",
                "flavorText": "A rumor of a gold vein has attracted prospectors... and trouble in the hills."
            },
            "lesMurmuresSousLaVille": {
                "title": "The Whispers Beneath the City",
                "flavorText": "The city's sewers hide a threat that is rising to the surface."
            },
            "siegeGobelin": {
                "title": "The Siege of the Fort",
                "flavorText": "A small fort is under siege by a horde of goblins."
            },
            "culteSecret": {
                "title": "Infiltrating the Cult",
                "flavorText": "A secret cult is operating in the city's underbelly. Uncover their plans."
            },
            "coeurVolcan": {
                "title": "The Heart of the Volcano",
                "flavorText": "A power gem is said to be found in the depths of an active volcano."
            },
            "bibliothequeOubliee": {
                "title": "The Forgotten Library",
                "flavorText": "Legends speak of a library containing the knowledge of the ancients."
            },
            "gambitPirate": {
                "title": "The Sky Pirates' Gambit",
                "flavorText": "An infamous pirate ship has been sighted. This is the chance to plunder or capture it."
            },
            "docteursPeste": {
                "title": "The Plague Doctors",
                "flavorText": "A strange disease is spreading. Two doctors with opposing methods propose a cure."
            },
            "laCiteDesAutomates": {
                "title": "The City of Automatons",
                "flavorText": "A forgotten city of metal, still active and heavily defended by its guardians."
            },
            "leLabyrintheDuMinotaure": {
                "title": "The Minotaur's Labyrinth",
                "flavorText": "An ancient labyrinth from which no one has ever returned. It is said that a minotaur haunts it."
            },
            "laCourDesMiracles": {
                "title": "The Court of Miracles",
                "flavorText": "The Beggar King challenges you to survive one night in his underground kingdom."
            },
            "lileDeLaChimere": {
                "title": "The Chimera's Island",
                "flavorText": "A remote island is home to an abandoned alchemist's laboratory and its monstrous creations."
            },
            "lePacteInfernal": {
                "title": "The Infernal Pact",
                "flavorText": "A duke has sold his soul for power. The pact must be broken before it's too late."
            },
            "laChasseSauvage": {
                "title": "The Wild Hunt",
                "flavorText": "A horde of spectral horsemen terrorizes the countryside. They must be confronted or appeased."
            },
            "leSommetDuMonde": {
                "title": "The Summit of the World",
                "flavorText": "Climb the highest mountain in the world to find the answer to an ancient prophecy."
            },
            "leMaelstromArcanique": {
                "title": "The Arcane Maelstrom",
                "flavorText": "A magical storm threatens to destroy everything. Its eye must be found to calm it."
            },
            "laGuerreContreLesProfonds": {
                "title": "The War Against the Deep Ones",
                "flavorText": "Amphibious creatures are emerging from the ocean to attack coastal cities."
            },
            "leSablierDuTemps": {
                "title": "The Hourglass of Time",
                "flavorText": "An artifact capable of manipulating time has been stolen. It must be recovered before it causes a paradox."
            },
            "reliqueDivine": {
                "title": "The Relic of the Celestial Temple",
                "flavorText": "A relic lost for centuries has appeared at the top of a floating temple."
            },
            "chasseDragon": {
                "title": "The Hunt for the Ancient Dragon",
                "flavorText": "A dragon is terrorizing the region. Only a legendary hero can stop it."
            },
            "tourSorcier": {
                "title": "The Mad Sorcerer's Tower",
                "flavorText": "A demented sorcerer has erected a tower that defies the laws of physics."
            },
            "forgeDieux": {
                "title": "The Forge of the Gods",
                "flavorText": "A quest to find the mythical forge where the first weapons were created."
            },
            "conseilOmbres": {
                "title": "The Council of Shadows",
                "flavorText": "A conspiracy is brewing within the royal council. Unmask the traitors."
            },
            "leTombeauDuRoiSinge": {
                "title": "The Tomb of the Monkey King",
                "flavorText": "A tomb filled with deadly riddles and traps, guarded by the mischievous spirit of the Monkey King."
            },
            "laCite Engloutie": {
                "title": "The Sunken City of R'lyeh",
                "flavorText": "Dive into the abyss to explore a non-Euclidean city and not lose your sanity."
            },
            "leDernierDesGeants": {
                "title": "The Last of the Giants",
                "flavorText": "Find the last sleeping stone giant and convince him to help you repel an invasion."
            },
            "lEchiquierDesDieux": {
                "title": "The Gods' Chessboard",
                "flavorText": "Participate in a cosmic chess game where the pieces are armies and the stake is the fate of the world."
            },
            "laToisonDOr": {
                "title": "The Golden Fleece",
                "flavorText": "Sail dangerous seas, face sea monsters to retrieve the legendary Golden Fleece."
            },
            "leCoeurDeLaForetMonde": {
                "title": "The Heart of the World-Forest",
                "flavorText": "The gigantic forest that covers a continent is dying. The source of the evil must be found."
            },
            "leTournoiDesChampionsEternels": {
                "title": "The Tournament of Eternal Champions",
                "flavorText": "A secret tournament where the greatest heroes of all time compete for eternity."
            },
            "laBibliothequeInfinie": {
                "title": "The Infinite Library",
                "flavorText": "Find a specific book in a library that contains every book ever written or to be written."
            },
            "leForgeronDesAmes": {
                "title": "The Soul Forger",
                "flavorText": "A demonic blacksmith captures souls to forge weapons. He must be stopped."
            },
            "lArmeeDesTenebres": {
                "title": "The Army of Darkness",
                "flavorText": "A portal has opened and an army of demons is pouring out. Lead the counter-attack."
            },
            "brecheDimensionnelle": {
                "title": "The Dimensional Breach",
                "flavorText": "A rift to another plane has opened, spewing horrors."
            },
            "coeurCorrompu": {
                "title": "The Heart of Corruption",
                "flavorText": "The source of the corruption gnawing at the kingdom must be destroyed."
            },
            "etoileMourante": {
                "title": "The Dying Star",
                "flavorText": "A star in the night sky is growing abnormally, threatening the world."
            },
            "roiEndormi": {
                "title": "The Awakening of the King under the Mountain",
                "flavorText": "An ancient prophecy foretells the return of the true king, asleep in the heart of the world."
            },
            "leSilenceDesEtoiles": {
                "title": "The Silence of the Stars",
                "flavorText": "The stars are going out one by one. Discover the cause of this cosmic phenomenon."
            },
            "leDernierDieu": {
                "title": "To Kill the Last God",
                "flavorText": "The last of the old gods has gone mad and threatens to undo creation. He must be stopped."
            },
            "leRefletBrisé": {
                "title": "The Broken Reflection",
                "flavorText": "A mirror world, a dark version of ours, is trying to take its place. Close the breach."
            },
            "laMelodieDeLaCreation": {
                "title": "The Melody of Creation",
                "flavorText": "The music that keeps the universe in harmony has stopped. It must be played again."
            },
            "leCycleDeLaRoue": {
                "title": "Breaking the Cycle of the Wheel",
                "flavorText": "The world is stuck in a loop of rebirth and destruction. Break the wheel of time."
            },
            "leJardinDHephaistos": {
                "title": "The Garden of Hephaestus",
                "flavorText": "Explore the mechanical garden of the blacksmith god, where fauna and flora are made of metal and fire."
            },
            "lEncreDuDestin": {
                "title": "The Ink of Destiny",
                "flavorText": "Find the pen and ink with which destiny is written, and add your own chapter to it."
            },
            "le ProcesDAsmodeus": {
                "title": "The Trial of Asmodeus",
                "flavorText": "You are summoned to the underworld to be humanity's lawyer in a trial against the devil himself."
            },
            "leTroneVide": {
                "title": "The Empty Throne",
                "flavorText": "The throne of the celestial kingdom is empty, causing a cosmic imbalance. A new ruler must be found."
            },
            "le CommencementDeLaFin": {
                "title": "The Beginning of the End",
                "flavorText": "An entity from the absolute void has begun to consume reality. This is not a fight, it is a survival."
            }
        },
    "events": {
        "riviere_debut": {
            "description": "Your path is blocked by a river with a strong current.",
            "choice1_text": "Attempt to swim across (Strength 8+)",
            "choice1_success_text": "With a powerful stroke, you reach the other side, exhausted but proud.",
            "choice1_failure_text": "The current is too strong! You are swept away and wash up on the same bank, bruised.",
            "choice2_text": "Look for a bridge upstream (Intelligence 6+)",
            "choice2_success_text": "Your observation skills pay off! You discover an old rope bridge.",
            "choice2_failure_text": "You search for an hour without finding anything."
        },
        "riviere_pont_garde": {
            "description": "The rope bridge is guarded by a mercenary. 'Crossing costs 20 wood,' he growls.",
            "choice1_text": "Pay the 20 Wood",
            "choice1_success_text": "You pay the toll. The guard lets you pass.",
            "choice1_failure_text": "You don't have enough. The guard scoffs and shoos you away.",
            "choice2_text": "Intimidate him (Strength 10+)",
            "choice2_success_text": "You puff out your chest. The guard hesitates and lets you pass.",
            "choice2_failure_text": "Your attempt makes him laugh. He shoves you away violently."
        },
        "riviere_fin_succes": {
            "description": "On the other side, you find an abandoned crate full of materials!"
        },
        "riviere_fin_echec": {
            "description": "You failed to cross. You turn back."
        },
        "foret_debut": {
            "description": "You enter an ancient forest. A barely visible path sinks into the darkness.",
            "choice1_text": "Follow the path",
            "choice1_success_text": "You proceed cautiously."
        },
        "foret_clairiere": {
            "description": "The path leads to a peaceful clearing where a rotten chest sits.",
            "choice1_text": "Open the chest",
            "choice1_success_text": "The chest contains old resources, a nice find!"
        },
        "foret_piege": {
            "description": "Your foot hits a tripwire! It's a hunter's trap!",
            "choice1_text": "Try to dodge (Agility 8+)",
            "choice1_success_text": "With an agile leap, you avoid the net that falls from the sky!",
            "choice1_failure_text": "Too slow! A net catches you and you waste time freeing yourself."
        },
        "foret_fin_succes": {
            "description": "You find the exit of the forest, invigorated by your adventure."
        },
        "foret_fin_echec": {
            "description": "You exit the forest, but the ordeal has taken its toll."
        },
        "enquete_debut": {
            "description": "The baker, in tears, explains that her famous apple pies disappear every night.",
            "choice1_text": "Agree to investigate",
            "choice1_success_text": "You agree. You start by looking for clues."
        },
        "enquete_indices": {
            "description": "You examine the scene. The back window is open and you notice small footprints.",
            "choice1_text": "Follow the footprints (Intelligence 5+)",
            "choice1_success_text": "The tracks lead you to the hideout of a gang of street children.",
            "choice1_failure_text": "You lose the trail. You decide to stand guard tonight.",
            "choice2_text": "Question the neighbors (Luck 5+)",
            "choice2_success_text": "A neighbor tells you he saw some kids hanging around. He points you to their hideout.",
            "choice2_failure_text": "Nobody saw anything. You'll have to watch the bakery."
        },
        "enquete_confrontation": {
            "description": "You find the children with a piece of pie. They explain that they are hungry.",
            "choice1_text": "Scold them and take them back to the baker.",
            "choice1_success_text": "The baker scolds them, but touched, offers them a job.",
            "choice2_text": "Give them 20 Cloth so they can eat.",
            "choice2_success_text": "Touched by your generosity, they promise not to steal anymore.",
            "choice2_failure_text": "You have nothing to give them. You take them back by force."
        },
        "enquete_surveillance": {
            "description": "After a long wait, you see a small figure sneak in. It's a child!",
            "choice1_text": "Catch him!",
            "choice1_success_text": "You catch the young thief red-handed."
        },
        "enquete_fin_bien": {
            "description": "The baker is delighted. She offers you a handsome sum and a pie."
        },
        "enquete_fin_genereux": {
            "description": "The baker is touched by your compassion and thanks you warmly."
        },
        "enquete_fin_moyen": {
            "description": "You solved the case, but in a somewhat brutal manner. The baker gives you a small reward."
        },
        "livraison_debut": {
            "description": "The herbalist needs rare herbs for a remedy. Time is running out!",
            "choice1_text": "Accept the errand",
            "choice1_success_text": "You take the bag and set off at a run."
        },
        "livraison_chemin": {
            "description": "A shortcut would go through a dark cave, but the normal path is safer.",
            "choice1_text": "Take the shortcut (Agility 7+)",
            "choice1_success_text": "You cross the cave without any trouble and save precious time!",
            "choice1_failure_text": "You get lost in the darkness and come out at the same spot.",
            "choice2_text": "Take the safe path",
            "choice2_success_text": "You opt for caution. The road is longer."
        },
        "livraison_fin_rapide": {
            "description": "You arrive in record time. The herbalist, grateful, doubles your reward."
        },
        "livraison_fin_lent": {
            "description": "You finally arrive. The herbalist is relieved but a little disappointed by your slowness."
        },
        "rats_debut": {
            "description": "Farmer Gideon complains of an invasion of rats as big as dogs.",
            "choice1_text": "Go down to the cellar",
            "choice1_success_text": "You climb down the wooden ladder. The smell is foul."
        },
        "rats_tunnels": {
            "description": "The cellar is a maze of tunnels. A large rat charges you!",
            "choice1_text": "Fight it!",
            "choice1_success_text": "You prepare to face the vermin!"
        },
        "rats_nid": {
            "description": "You find the nest, guarded by the 'Rat Queen', a bloated and aggressive creature.",
            "choice1_text": "Eliminate the Queen!",
            "choice1_success_text": "The creature lets out a shrill cry and rushes at you!",
            "choice2_text": "Flee the cellar",
            "choice2_success_text": "This is too much. You climb back up, leaving the farmer to his fate."
        },
        "rats_fin_succes": {
            "description": "Gideon thanks you a thousand times and offers you a part of his savings."
        },
        "rats_fin_echec": {
            "description": "You fled. The farmer calls you a coward. You get nothing."
        },
        "medaillon_debut": {
            "description": "A weeping young woman has lost her grandmother's locket near the lake.",
            "choice1_text": "Agree to help her",
            "choice1_success_text": "You go to the lake shore to start searching."
        },
        "medaillon_recherche": {
            "description": "The area is muddy. Where to look?",
            "choice1_text": "Search in the reeds (Luck 10+)",
            "choice1_success_text": "A metallic glint catches your eye. It's the locket!",
            "choice1_failure_text": "You search in vain, finding only mud.",
            "choice2_text": "Talk to the fishermen (Intelligence 7+)",
            "choice2_success_text": "An old fisherman remembers seeing something shiny near the old pier. You find the locket there!",
            "choice2_failure_text": "The fishermen saw nothing and look at you suspiciously."
        },
        "medaillon_fin_succes": {
            "description": "You return the locket to the young woman. Overjoyed, she gives you everything she has."
        },
        "medaillon_fin_echec": {
            "description": "Impossible to find the locket. You return to deliver the bad news."
        },
        "herbes_debut": {
            "description": "The apothecary needs Silverleaf. 'It's easy to recognize, it glows with a silver light,' he says.",
            "choice1_text": "Go in search of the plant",
            "choice1_success_text": "You venture into the woods, with your eyes wide open."
        },
        "herbes_recherche": {
            "description": "You find a clearing. A majestic stag is grazing peacefully. Near it, a plant that matches the description.",
            "choice1_text": "Scare the stag to take the plant",
            "choice1_success_text": "You make a loud noise. The stag flees and you pick the plant.",
            "choice2_text": "Wait for the stag to leave (Intelligence 5+)",
            "choice2_success_text": "You wait patiently. The stag eventually leaves, leaving the field clear for you.",
            "choice2_failure_text": "Your patience has its limits. You make a noise, the stag flees."
        },
        "herbes_fin_succes": {
            "description": "You bring back the Silverleaf. The apothecary thanks you."
        },
        "gobelins_debut": {
            "description": "Thieving goblins have set up a small camp near the trade route.",
            "choice1_text": "Attack the camp",
            "choice1_success_text": "You decide to put an end to their activities."
        },
        "gobelins_combat": {
            "description": "The goblins are surprised but ready to fight.",
            "choice1_text": "Face them!",
            "choice1_success_text": "You charge the greenish creatures."
        },
        "gobelins_fin_succes": {
            "description": "You've cleared out the camp. The road is safer thanks to you."
        },
        "gobelins_fin_echec": {
            "description": "The goblins were smarter than you. You retreat."
        },
        "cave_debut": {
            "description": "The local tavern is infested with giant spiders in its wine cellar.",
            "choice1_text": "Offer your services",
            "choice1_success_text": "You descend into the dark, damp cellar, torch in hand."
        },
        "cave_combat": {
            "description": "Cobwebs cover the walls. A cave spider drops on you!",
            "choice1_text": "Fight the spider!",
            "choice1_success_text": "You engage in combat with the hairy beast."
        },
        "cave_fin_succes": {
            "description": "After defeating the creature, the innkeeper is thrilled and offers you a reward."
        },
        "cave_fin_echec": {
            "description": "The spider was too fast. You quickly go back up, leaving the cellar to the monsters."
        },
        "lettre_debut": {
            "description": "A clumsy postman has lost an important letter for the mayor in the market square.",
            "choice1_text": "Help him look for the letter",
            "choice1_success_text": "You start searching the busy market area."
        },
        "lettre_recherche": {
            "description": "The market is crowded. The letter could be anywhere.",
            "choice1_text": "Search near the stalls (Luck 12+)",
            "choice1_success_text": "Your lucky star guides you! You spot the letter, stuck under a crate of vegetables.",
            "choice1_failure_text": "Despite your efforts, the letter remains unfound.",
            "choice2_text": "Ask the merchants (Intelligence 8+)",
            "choice2_success_text": "By describing the letter, a merchant remembers seeing it fall near the fountain. You find it!",
            "choice2_failure_text": "The merchants are too busy to help you."
        },
        "lettre_fin_succes": {
            "description": "You return the letter to the postman, who thanks you a thousand times."
        },
        "lettre_fin_echec": {
            "description": "The letter was probably trampled. The postman is devastated."
        },
        "cloture_debut": {
            "description": "A farmer's fence has been broken by wolves. His sheep are escaping.",
            "choice1_text": "Help the farmer",
            "choice1_success_text": "You roll up your sleeves and get to work."
        },
        "cloture_reparation": {
            "description": "As you repair, a lone wolf emerges from the woods and watches you.",
            "choice1_text": "Chase it away (Strength 9+)",
            "choice1_success_text": "You brandish your hammer. The wolf, surprised, flees.",
            "choice1_failure_text": "The wolf doesn't seem impressed and charges you!",
            "choice2_text": "Ignore it and continue (Defense 4+)",
            "choice2_success_text": "You continue your work. Seeing that you are not an easy prey, it leaves.",
            "choice2_failure_text": "The wolf sees an opening and pounces on you!"
        },
        "cloture_fin_succes": {
            "description": "The fence is repaired and the sheep are safe. The farmer pays you for your help."
        },
        "cloture_fin_echec": {
            "description": "The wolf injured you and you couldn't finish the job properly."
        },
        "chat_debut": {
            "description": "The countess's butler informs you that her Persian cat has run away. You must find it.",
            "choice1_text": "Go after the feline",
            "choice1_success_text": "You set off in search of this famous cat."
        },
        "chat_recherche": {
            "description": "You spot the cat on a roof. It's taunting you.",
            "choice1_text": "Climb onto the roof (Agility 9+)",
            "choice1_success_text": "You climb onto the roof with agility. The cat, surprised, lets itself be caught.",
            "choice1_failure_text": "You slip and fall heavily. The cat runs away, meowing with laughter.",
            "choice2_text": "Lure it (Luck 8+)",
            "choice2_success_text": "You mimic the sound of a bag of treats. The greedy cat comes down on its own.",
            "choice2_failure_text": "This cat is no fool. It ignores you completely."
        },
        "chat_fin_succes": {
            "description": "You bring the cat back. The countess is delighted and gives you a full purse."
        },
        "chat_fin_echec": {
            "description": "The cat won. You return empty-handed, covered in dust."
        },
        "cimetiere_debut": {
            "description": "The gravedigger, trembling, tells you about scratching noises coming from one of the graves at night.",
            "choice1_text": "Investigate these noises",
            "choice1_success_text": "You wait for nightfall and go to the cemetery."
        },
        "cimetiere_enquete": {
            "description": "You find the grave in question. The scratching sounds are clear.",
            "choice1_text": "Open the coffin (Strength 10+)",
            "choice1_success_text": "You open the heavy lid. It's not the undead, but giant rats that have made their nest!",
            "choice1_failure_text": "The lid is too heavy. Suddenly, a skeleton rises from a nearby grave!",
            "choice2_text": "Analyze the situation (Intelligence 9+)",
            "choice2_success_text": "Examining the base of the grave, you see a tunnel. It's probably vermin. You decide to smoke out the nest.",
            "choice2_failure_text": "You don't see anything unusual, until a bony hand emerges from the ground!"
        },
        "cimetiere_fin_succes": {
            "description": "You solved the mystery and eliminated the vermin. The gravedigger is relieved and rewards you."
        },
        "cimetiere_fin_moyen": {
            "description": "There really was an undead! After defeating it, calm returns. The gravedigger is terrified but grateful."
        },
        "cimetiere_fin_echec": {
            "description": "The horrors of the cemetery were too much for you. You flee."
        },
        "livre_debut": {
            "description": "The librarian tasks you with retrieving a book borrowed by a reclusive hermit.",
            "choice1_text": "Go in search of the hermit",
            "choice1_success_text": "You follow the path to the hermit's cabin."
        },
        "livre_ermite": {
            "description": "You find the hermit, who refuses to return the book, saying he is on the verge of a breakthrough.",
            "choice1_text": "Convince him with logic (Intelligence 10+)",
            "choice1_success_text": "You explain to him that others need the knowledge. He finally agrees.",
            "choice1_failure_text": "Your arguments don't move him. He slams the door in your face.",
            "choice2_text": "Trade it for 20 Wood for his fire",
            "choice2_success_text": "He accepts the deal! A little wood for a book.",
            "choice2_failure_text": "You don't have enough wood to offer him."
        },
        "livre_fin_succes": {
            "description": "You bring back the book. The librarian is satisfied and pays you."
        },
        "livre_fin_echec": {
            "description": "The hermit kept the book. You return empty-handed."
        },
        "puits_debut": {
            "description": "The water from a hamlet's well is making people sick. They ask you to find the source of the problem.",
            "choice1_text": "Inspect the well",
            "choice1_success_text": "You lean over the well. A foul smell emanates from it."
        },
        "puits_inspection": {
            "description": "There is something at the bottom. You have to go down to see.",
            "choice1_text": "Descend with a rope (Agility 8+)",
            "choice1_success_text": "You descend skillfully. At the bottom, you find the carcass of a boar.",
            "choice1_failure_text": "You slip and fall into the stagnant water. Yuck!"
        },
        "puits_nettoyage": {
            "description": "Now, you have to get the carcass out of there.",
            "choice1_text": "Haul it up by force of arms (Strength 12+)",
            "choice1_success_text": "With considerable effort, you manage to lift the carcass out of the well.",
            "choice1_failure_text": "It's too heavy. You have to dismember it, which is long and disgusting."
        },
        "puits_fin_succes": {
            "description": "The well is now clean. The villagers thank you for saving their water source."
        },
        "peche_debut": {
            "description": "An old fisherman tells you that a 'monster' has taken up residence in the lake and is scaring all the fish away.",
            "choice1_text": "Go see this 'monster'",
            "choice1_success_text": "You borrow a boat and row towards the center of the lake."
        },
        "peche_monstre": {
            "description": "A huge creature resembling a giant catfish surfaces.",
            "choice1_text": "Try to fish it (Strength 12+)",
            "choice1_success_text": "After a fierce struggle, you bring the beast to shore. It's the biggest fish you've ever seen!",
            "choice1_failure_text": "The creature is too strong, it breaks your line and almost capsizes your boat.",
            "choice2_text": "Hunt it with your weapon (Agility 10+)",
            "choice2_success_text": "You manage to injure the creature, which decides this place is too dangerous and leaves.",
            "choice2_failure_text": "The monster dives and you don't see it again."
        },
        "peche_fin_succes": {
            "description": "With the monster gone, the fish return. The fisherman shares part of his first catch with you."
        },
        "peche_fin_echec": {
            "description": "The lake monster won. The fish are not coming back anytime soon."
        },
        "ruines_debut": {
            "description": "You arrive at ruins overgrown with vegetation. A main entrance is available, but a collapsed wall seems to reveal a secret passage.",
            "choice1_text": "Take the main entrance (Defense 5+)",
            "choice1_success_text": "You enter cautiously. Your gear protects you from a few falling stones.",
            "choice1_failure_text": "A stone falls on you and stuns you a bit.",
            "choice2_text": "Explore the secret passage (Luck 15+)",
            "choice2_success_text": "Luck is on your side! The passage leads to a small, forgotten treasure room.",
            "choice2_failure_text": "The passage is a dead end. You waste time and have to take the main entrance."
        },
        "ruines_salle_centrale": {
            "description": "The central hall is vast. Skeletons of tomb raiders litter the floor. Suddenly, a malevolent glow animates them!",
            "choice1_text": "Fight the undead!"
        },
        "ruines_chambre_secrete": {
            "description": "After the fight, you notice a draft behind a tapestry. You tear it down and reveal a secret chamber.",
            "choice1_text": "Loot the secret chamber",
            "choice1_success_text": "You find a chest filled with ancient metal and a few valuables."
        },
        "ruines_fin_succes_complet": {
            "description": "You leave the ruins with much more loot than expected. A great success!"
        },
        "ruines_fin_succes": {
            "description": "Your luck led you to an unexpected treasure, avoiding the main dangers."
        },
        "ruines_fin_echec": {
            "description": "The undead guardians were too numerous. You flee the ruins empty-handed."
        },
        "escorte_debut": {
            "description": "A nervous merchant offers you a handsome sum to escort him through the forest, known for its bandits.",
            "choice1_text": "Accept the mission",
            "choice1_success_text": "You accept. The merchant seems reassured by your presence."
        },
        "escorte_chemin": {
            "description": "You proceed along the path. Suddenly, bandits emerge from the bushes!",
            "choice1_text": "Protect the cart (Defense 8+)",
            "choice1_success_text": "You stand in front of the cart, parrying the arrows. Seeing their target protected, they charge!",
            "choice1_failure_text": "An arrow hits a wheel of the cart, breaking it. You have to repair it while defending yourself!",
            "choice2_text": "Charge the bandits!",
            "choice2_success_text": "You rush into the fray to confront them directly."
        },
        "escorte_reparation": {
            "description": "The wheel is broken. The merchant is panicking while you fight off the bandits.",
            "choice1_text": "Use 50 wood to repair it.",
            "choice1_success_text": "With your resources, you cobble together a sturdy repair. You can set off again.",
            "choice1_failure_text": "You don't have what you need to repair it. You abandon the cart."
        },
        "escorte_destination": {
            "description": "You arrive at your destination. The merchant, grateful, pays you the agreed sum.",
            "choice1_text": "Pocket the reward",
            "choice1_success_text": "A mission well done."
        },
        "escorte_fin_succes": {
            "description": "Mission accomplished! The merchant thanks you warmly."
        },
        "escorte_fin_echec": {
            "description": "You failed to protect the cargo. The merchant is furious and refuses to pay you."
        },
        "marais_debut": {
            "description": "You venture into a misty swamp. The air is heavy and humid. A muddy path seems to be the only way.",
            "choice1_text": "Follow the path (Intelligence 15+)",
            "choice1_success_text": "You analyze the tracks and the consistency of the soil to avoid getting stuck.",
            "choice1_failure_text": "You choose the wrong path and get stuck up to your waist. It takes you a while to get out.",
            "choice2_text": "Cut through the stagnant water (Vitality 12+)",
            "choice2_success_text": "It's faster, but leeches cling to you. Your vitality helps you endure.",
            "choice2_failure_text": "The leeches and swamp diseases weaken you considerably."
        },
        "marais_cabane": {
            "description": "In the heart of the swamp, you find a dilapidated cabin on stilts. Smoke is coming from the chimney.",
            "choice1_text": "Knock on the door",
            "choice1_success_text": "An old hermit opens the door. Touched by your boldness, he shares some resources with you.",
            "choice2_text": "Ignore the cabin and continue",
            "choice2_success_text": "Cautiously, you prefer not to disturb and continue on your way out of the swamp."
        },
        "marais_fin_succes": {
            "description": "The hermit was a great help. You leave the swamp with new resources."
        },
        "marais_fin_moyen": {
            "description": "You get out of the swamp without any trouble, but without finding any particular treasure."
        },
        "marais_fin_echec": {
            "description": "You finally get out of this cursed swamp, dirty and exhausted."
        },
        "mine_debut": {
            "description": "The miners are in a panic. A cave-in is blocking the main gallery, and strange 'clicking' sounds are heard from the other side.",
            "choice1_text": "Offer your help",
            "choice1_success_text": "You decide to help. First, you need to clear the passage."
        },
        "mine_degagement": {
            "description": "Boulders are blocking the entrance. It's a job of strength.",
            "choice1_text": "Clear the boulders (Strength 20+)",
            "choice1_success_text": "Your power is impressive. You clear the passage in record time.",
            "choice1_failure_text": "It's too heavy. You ask the miners for help, which takes more time."
        },
        "mine_creatures": {
            "description": "Behind the rocks, you discover a colony of giant insectoid creatures that have invaded the mine.",
            "choice1_text": "Exterminate the creatures!",
            "choice1_success_text": "These things don't scare you. On guard!"
        },
        "mine_fin_succes": {
            "description": "The miners cheer for you! As a reward, they offer you a share of the first metal vein you've cleared."
        },
        "mine_fin_echec": {
            "description": "The creatures pushed you back. The miners are disappointed and you receive no reward."
        },
        "bois_debut": {
            "description": "You enter the Whispering Woods. Sinister whispers seem to come from all directions.",
            "choice1_text": "Search for the source of the whispers",
            "choice1_success_text": "You delve deeper, guided by the strange sounds."
        },
        "bois_source": {
            "description": "The whispers lead you to an ancient stone statue. The sounds seem to emanate from it. A wailing spectre appears!",
            "choice1_text": "Confront the spectre",
            "choice1_success_text": "The source of the evil must be eliminated!",
            "choice2_text": "Try to purify the statue (Intelligence 18+)",
            "choice2_success_text": "You recite a prayer of purification. The spectre, soothed, disappears, leaving behind an echo of peace.",
            "choice2_failure_text": "Your prayer has no effect. The spectre, irritated, attacks you!"
        },
        "bois_fin_succes": {
            "description": "You have defeated the spectre. Silence has returned to the forest."
        },
        "bois_fin_purifie": {
            "description": "You have appeased the spirit without violence. The woods seem to thank you with a gentle breeze."
        },
        "bois_fin_echec": {
            "description": "The spectre was too powerful. You flee the forest, the whispers pursuing you."
        },
        "pont_debut": {
            "description": "The main merchant bridge is damaged. A main rope has been severed. Accident or malice?",
            "choice1_text": "Examine the damage (Intelligence 12+)",
            "choice1_success_text": "The rope was cut cleanly. It's sabotage. It must be repaired, or the culprits found.",
            "choice1_failure_text": "You don't see anything special. The bridge is just broken. What to do?"
        },
        "pont_choix": {
            "description": "What to do? Repair the bridge yourself or look for the saboteurs?",
            "choice1_text": "Repair the bridge (Strength 22+)",
            "choice1_success_text": "With strength, you manage to tighten a new rope and stabilize the bridge.",
            "choice1_failure_text": "You lack the strength and slip dangerously. You catch yourself, but you are injured.",
            "choice2_text": "Follow the saboteurs' tracks (Intelligence 15+)",
            "choice2_success_text": "The tracks lead you to a small bandit camp.",
            "choice2_failure_text": "You quickly lose their trail in the forest."
        },
        "pont_bandits": {
            "description": "The bandits are surprised to see you. They draw their weapons.",
            "choice1_text": "Punish them for their misdeed"
        },
        "pont_fin_repare": {
            "description": "The bridge is operational again thanks to you. The merchants and villagers thank you."
        },
        "pont_fin_echec": {
            "description": "You managed neither to repair the bridge nor to find the culprits."
        },
        "contrat_herbo_debut": {
            "description": "An herbalist hires you to pick a Moonflower. The problem: it only grows at the top of a harpy-infested cliff.",
            "choice1_text": "Accept the contract",
            "choice1_success_text": "You go to the foot of the cliff. The ascent looks difficult."
        },
        "contrat_herbo_ascension": {
            "description": "You start climbing. Harpies bombard you with projectiles and try to make you fall.",
            "choice1_text": "Climb quickly and well (Agility 20+)",
            "choice1_success_text": "Your agility allows you to dodge their attacks and reach the summit quickly.",
            "choice1_failure_text": "You are hit several times and almost fall. The climb exhausts you."
        },
        "contrat_herbo_sommet": {
            "description": "At the summit, the Moonflower glows softly. But it is guarded by a harpy larger than the others.",
            "choice1_text": "Fight the harpy matriarch",
            "choice2_text": "Create a diversion (Luck 18+)",
            "choice2_success_text": "You throw a shiny object into the distance. The harpy, attracted by the gleam, leaves the nest. You take the opportunity to pick the flower and flee.",
            "choice2_failure_text": "The harpy is not fooled. It attacks you with fury!"
        },
        "contrat_herbo_fin_succes": {
            "description": "You bring the Moonflower back to the herbalist, who pays you handsomely for this feat."
        },
        "contrat_herbo_fin_echec": {
            "description": "The harpies were too numerous and too fierce. You retreat, injured and without the flower."
        },
        "crypte_agitee_debut": {
            "description": "The old village crypt has become a source of fear. The sounds of clattering bones are heard at night.",
            "choice1_text": "Descend into the crypt",
            "choice1_success_text": "A smell of dust and death greets you."
        },
        "crypte_agitee_salle": {
            "description": "In the main hall, several skeletons have risen and are wandering aimlessly.",
            "choice1_text": "Purge the crypt by force",
            "choice1_success_text": "It is time to return the dead to their eternal slumber."
        },
        "crypte_agitee_source": {
            "description": "After the fight, you find a dark orb on the altar. It seems to be the source of the unrest.",
            "choice1_text": "Destroy the orb (Strength 15+)",
            "choice1_success_text": "You shatter the orb. A silent scream echoes and calm returns.",
            "choice1_failure_text": "The orb resists and sends a jolt of negative energy through you."
        },
        "crypte_agitee_fin_succes": {
            "description": "You have brought peace back to the crypt. The village is grateful."
        },
        "crypte_agitee_fin_echec": {
            "description": "The necromantic magic of the crypt was too strong for you."
        },
        "tour_garde_debut": {
            "description": "An abandoned watchtower on the border has become a den for bandits who rob travelers.",
            "choice1_text": "Clear out the tower",
            "choice1_success_text": "You approach the tower. Lookouts are posted."
        },
        "tour_garde_approche": {
            "description": "How will you get in?",
            "choice1_text": "Frontal assault, through the door!",
            "choice1_success_text": "You break down the door and surprise the first guards.",
            "choice2_text": "Climb the wall (Agility 18+)",
            "choice2_success_text": "You silently climb to a window and enter unseen. You have the element of surprise.",
            "choice2_failure_text": "You slip and make a noise. The bandits are alerted and are waiting for you!"
        },
        "tour_garde_etage": {
            "description": "You have cleared the ground floor. The bandit chief is waiting for you upstairs.",
            "choice1_text": "Go up to face the chief",
            "choice1_success_text": "The chief awaits you, axe in hand."
        },
        "tour_garde_fin_succes": {
            "description": "The chief is defeated and the tower is secured. You find the bandits' loot."
        },
        "tour_garde_fin_echec": {
            "description": "The bandits were too well organized. You are forced to retreat."
        },
        "geyser_debut": {
            "description": "A geyser near a mining camp has become unstable, spewing boiling water and steam at unpredictable times, threatening the camp.",
            "choice1_text": "Go see the geyser",
            "choice1_success_text": "You cautiously approach the hot spring."
        },
        "geyser_etude": {
            "description": "The ground trembles. You must understand the geyser's cycle to stabilize it.",
            "choice1_text": "Study the cycle (Intelligence 20+)",
            "choice1_success_text": "You realize that unstable rocks are partially blocking the conduit. They must be removed at the right moment.",
            "choice1_failure_text": "You don't understand the pattern. A sudden eruption burns you!"
        },
        "geyser_action": {
            "description": "You have a short window to act between eruptions.",
            "choice1_text": "Place an explosive charge (Defense 10+)",
            "choice1_success_text": "You place the charge and take cover just in time. The explosion clears the conduit and the geyser stabilizes.",
            "choice1_failure_text": "You are too slow! A small eruption hits you while you work."
        },
        "geyser_fin_succes": {
            "description": "The geyser is now predictable and safe. The miners offer you a part of their latest metal find."
        },
        "geyser_fin_echec": {
            "description": "The geyser is too dangerous. You advise the miners to move their camp."
        },
        "troll_pont_debut": {
            "description": "A huge, stupid troll is blocking a bridge. He demands a toll: 'ALL YOUR METAL!' or a fight.",
            "choice1_text": "Face him in single combat",
            "choice1_success_text": "You draw your weapon. The troll brandishes a tree trunk.",
            "choice2_text": "Try to trick him (Intelligence 16+)",
            "choice2_success_text": "You offer him a riddle. Distracted and confused, he scratches his head, giving you time to run past.",
            "choice2_failure_text": "The troll doesn't understand your riddle and gets angry. 'Head hurt! Me smash you!'"
        },
        "troll_pont_fin_succes": {
            "description": "You have defeated the troll! The bridge is clear and you find the troll's 'treasure': a pile of rocks and a few valuable items."
        },
        "troll_pont_fin_dupe": {
            "description": "Your quick wit saved you from a brutal fight. You cross the bridge without a scratch."
        },
        "troll_pont_fin_echec": {
            "description": "The troll was much stronger than you thought. He throws you into the river."
        },
        "cultistes_bois_debut": {
            "description": "Rumors speak of strange rituals in the woods at night. The village asks you to investigate discreetly.",
            "choice1_text": "Follow the tracks in the woods",
            "choice1_success_text": "You find a hidden path leading deeper into the forest."
        },
        "cultistes_bois_camp": {
            "description": "You find a camp of hooded cultists around a glowing runestone.",
            "choice1_text": "Observe the ritual (Intelligence 17+)",
            "choice1_success_text": "You understand they are trying to summon a spirit. You can disrupt the ritual at the key moment.",
            "choice1_failure_text": "You don't understand their incantations, but you make a noise and are spotted!",
            "choice2_text": "Attack by surprise (Agility 16+)",
            "choice2_success_text": "You emerge from the shadows, causing panic among the cultists.",
            "choice2_failure_text": "They hear you coming. The element of surprise is lost."
        },
        "cultistes_bois_sabotage": {
            "description": "You have a choice: overload the rune or reverse the symbols.",
            "choice1_text": "Overload the rune (Strength 15+)",
            "choice1_success_text": "You throw a large stone at the rune, causing it to explode with pure energy, scattering the cultists.",
            "choice2_text": "Reverse the symbols (Intelligence 20+)",
            "choice2_success_text": "Discreetly, you alter a rune. The spirit they summon turns against them! Pure chaos."
        },
        "cultistes_bois_fin_succes": {
            "description": "You have put an end to the cult's activities. You recover their artifacts."
        },
        "cultistes_bois_fin_echec": {
            "description": "The cultists and their magic were too powerful. You had to flee."
        },
        "collectionneur_debut": {
            "description": "An eccentric nobleman hires you to steal a jade griffin statue from the mansion of his rival, Lord Harrington.",
            "choice1_text": "Accept the burglary",
            "choice1_success_text": "You wait for nightfall to infiltrate the Harrington estate."
        },
        "collectionneur_infiltration": {
            "description": "The mansion is surrounded by a high wall. The main gate is guarded.",
            "choice1_text": "Climb the wall (Agility 19+)",
            "choice1_success_text": "You scale the wall and land silently in the gardens.",
            "choice1_failure_text": "You slip and fall noisily. The guards are alerted, you must flee.",
            "choice2_text": "Bribe a guard (Luck 15+ & 50 Cloth)",
            "choice2_success_text": "The guard hesitates, but accepts the bribe and lets you in.",
            "choice2_failure_text": "The guard is loyal. He sounds the alarm."
        },
        "collectionneur_manoir": {
            "description": "You are inside. The statue is in the great hall, but the floor is a checkerboard that seems trapped.",
            "choice1_text": "Disable the trap (Intelligence 18+)",
            "choice1_success_text": "You spot the mechanism and disable the trap. The path is clear.",
            "choice1_failure_text": "You step on the wrong tile! Sleeping gas fills the room. You wake up in prison."
        },
        "collectionneur_fin_succes": {
            "description": "You escape with the statue. Your employer is delighted and pays you an extravagant sum."
        },
        "collectionneur_fin_echec": {
            "description": "The burglary went wrong. You leave empty-handed with a tarnished reputation."
        },
        "ferme_silence_debut": {
            "description": "An isolated, usually busy farm has been silent for a week. The village is worried.",
            "choice1_text": "Go see what's happening",
            "choice1_success_text": "You approach the farm. A deadly silence reigns."
        },
        "ferme_silence_enquete": {
            "description": "The house door is broken down. The inside is a mess. In the barn, you hear a growl.",
            "choice1_text": "Enter the barn",
            "choice1_success_text": "You open the barn door cautiously."
        },
        "ferme_silence_grange": {
            "description": "Inside, an abnormally large boar, its eyes red with rage, has trashed the place. It charges you!",
            "choice1_text": "Face the beast"
        },
        "ferme_silence_fin_succes": {
            "description": "You've slain the enraged beast. The farmers were hiding in the cellar. They thank you for saving them."
        },
        "ferme_silence_fin_echec": {
            "description": "The boar was too fierce. You had to flee, leaving the farm to its grim fate."
        },
        "puits_souhaits_debut": {
            "description": "Local legend speaks of a well that grants wishes if you throw a coin in. But recently, those who approach feel a great cold.",
            "choice1_text": "Try your luck at the well",
            "choice1_success_text": "You approach the old stone well."
        },
        "puits_souhaits_esprit": {
            "description": "As you lean over, a wailing spectre emerges from the well! 'My treasure!' it screams.",
            "choice1_text": "Fight it to free the well",
            "choice2_text": "Throw it a coin (Luck 20+)",
            "choice2_success_text": "You throw a coin. The spirit, obsessed with gold, dives to catch it, giving you a chance to plunder some of its treasure.",
            "choice2_failure_text": "The coin doesn't interest it. Only your soul attracts it!"
        },
        "puits_souhaits_fin_succes": {
            "description": "With the spirit defeated, the well is freed. You find a small accumulated treasure at the bottom."
        },
        "puits_souhaits_fin_moyen": {
            "description": "You tricked the spirit and stole some of its loot. Clever!"
        },
        "puits_souhaits_fin_echec": {
            "description": "The spirit's greed was too strong. Its icy touch almost killed you."
        },
        "bete_plaines_debut": {
            "description": "A fast and ferocious creature, which the locals call the 'Quicksilver Demon', attacks caravans on the plains.",
            "choice1_text": "Go hunt the beast",
            "choice1_success_text": "You use a carcass as bait and wait."
        },
        "bete_plaines_combat": {
            "description": "The beast appears. It's a kind of large cat with silvery scales. It is incredibly fast.",
            "choice1_text": "Dodge and counter-attack (Agility 22+)",
            "choice1_success_text": "You manage to follow its movements and injure it. It retreats.",
            "choice1_failure_text": "It's too fast. Its claws tear through your armor and flesh.",
            "choice2_text": "Take the hit and strike (Strength 20+ & Defense 10+)",
            "choice2_success_text": "You take its charge and use the opening to deliver a fatal blow.",
            "choice2_failure_text": "Your blow is too slow and your defense is not enough. The beast tears you to pieces."
        },
        "bete_plaines_fin_succes": {
            "description": "You have defeated the Quicksilver Demon. The roads are safe again and the merchants' guild rewards you."
        },
        "bete_plaines_fin_echec": {
            "description": "The creature's speed was supernatural. You survived, but the beast is still at large."
        },
        "prime_debut": {
            "description": "The captain of the guard shows you a map leading to a well-organized bandit camp. 'Clear this out, and the reward is yours,' he says.",
            "choice1_text": "Head to the camp",
            "choice1_success_text": "You set off towards the scoundrels' den."
        },
        "prime_approche": {
            "description": "You are within sight of the camp. There are guards posted at the entrance, but you notice a cliff that could be climbed on the side.",
            "choice1_text": "Stealthy approach via the cliff (Agility 35+)",
            "choice1_success_text": "You climb with the agility of a cat and surprise the camp from behind. Tactical advantage!",
            "choice1_failure_text": "You slip halfway and get spotted. The element of surprise is lost, they are waiting for you!",
            "choice2_text": "Frontal assault",
            "choice2_success_text": "No time for finesse. You charge the guards!"
        },
        "prime_combat_surprise": {
            "description": "Taking advantage of the confusion, you disable several bandits before they can react. The chief is the only remaining obstacle.",
            "choice1_text": "Face the chief!",
            "choice1_success_text": "You engage the chief in single combat."
        },
        "prime_chef": {
            "description": "The bandit chief, a scarred colossus, regards you with a cruel smile. 'You've caused enough trouble. Your adventure ends here!'",
            "choice1_text": "Try to neutralize him discreetly (Agility 35+)",
            "choice1_success_text": "Taking advantage of a diversion, you knock him out. The remaining bandits, without a leader, surrender.",
            "choice1_failure_text": "He spots you. The fight is inevitable.",
            "choice2_text": "Face him in a duel to the death!",
            "choice2_success_text": "The chief brandishes his massive axe. On guard!"
        },
        "prime_fin_succes": {
            "description": "You return to the captain with proof of your victory. He pays you handsomely, in addition to all the loot found in the camp."
        },
        "prime_fin_echec": {
            "description": "You failed. The bandits have reinforced their numbers and the bounty has been canceled. A crushing defeat."
        },
        "montagne_debut": {
            "description": "You begin the ascent of a snow-capped mountain. The icy wind bites your face.",
            "choice1_text": "Follow the main path",
            "choice1_success_text": "The path is long and exposed to the cold. You must show endurance."
        },
        "montagne_ascension": {
            "description": "An avalanche starts above you!",
            "choice1_text": "Take refuge behind a rock (Defense 15+)",
            "choice1_success_text": "You take cover just in time. The snow rushes around you but you are safe.",
            "choice1_failure_text": "The blast of the avalanche carries you away. You are shaken but alive.",
            "choice2_text": "Run to avoid it (Agility 30+)",
            "choice2_success_text": "Your speed allows you to get out of the avalanche's path. That was a close one!",
            "choice2_failure_text": "You are not fast enough. The snow briefly buries you."
        },
        "montagne_sommet": {
            "description": "You reach the icy summit. A Stone Golem, guardian of the place, comes to life.",
            "choice1_text": "Face the Guardian"
        },
        "montagne_fin_succes": {
            "description": "With the guardian defeated, you discover a rich vein of rare metal, exposed by the eternal cold."
        },
        "montagne_fin_echec": {
            "description": "The mountain and its guardian were too hostile. You turn back, defeated by the elements."
        },
        "crypte_debut": {
            "description": "An ancient crypt is said to hold a powerful artifact, but an inscription warns that it is cursed.",
            "choice1_text": "Enter the crypt",
            "choice1_success_text": "The door creaks open to dusty darkness."
        },
        "crypte_salle_piegee": {
            "description": "The floor is covered with tiles. Some seem unstable.",
            "choice1_text": "Cross with caution (Luck 30+)",
            "choice1_success_text": "Your luck guides you on the right path. You cross without triggering any traps.",
            "choice1_failure_text": "You step on a wrong tile. Poisoned darts shoot out from the walls!"
        },
        "crypte_artefact": {
            "description": "You find the artifact, an obsidian scepter, on an altar. It pulses with dark energy.",
            "choice1_text": "Take the cursed artifact",
            "choice1_success_text": "As you touch it, a wave of icy energy flows through you. You feel more powerful, but weakened.",
            "choice2_text": "Try to purify it (Intelligence 35+)",
            "choice2_success_text": "You perform a quick ritual that lessens the artifact's curse. It loses some of its power, but becomes safe to handle.",
            "choice2_failure_text": "Your ritual fails and the curse is unleashed upon you!"
        },
        "crypte_fin_succes": {
            "description": "You now possess an artifact of great power, but its evil aura may one day weigh on you."
        },
        "crypte_fin_moyen": {
            "description": "You leave with a purified artifact, less powerful but safe. Wisdom is its own reward."
        },
        "crypte_fin_echec": {
            "description": "The artifact's curse was too strong. You flee the crypt, your soul chilled."
        },
        "caravane_debut": {
            "description": "A luxury caravan never reached its destination. The merchants' guild is offering a fortune to whoever finds it.",
            "choice1_text": "Investigate",
            "choice1_success_text": "You start by inspecting the caravan's last known position."
        },
        "caravane_pistes": {
            "description": "On the road, you find signs of a struggle. Two trails emerge: orc tracks towards the mountains, and human footprints towards a dense forest.",
            "choice1_text": "Follow the orc trail",
            "choice1_success_text": "The trail leads you to an orc cave. They are feasting on the stolen goods.",
            "choice2_text": "Follow the human trail (Intelligence 30+)",
            "choice2_success_text": "Your gut tells you these are highly organized bandits. You find their camp, where they are dividing the loot.",
            "choice2_failure_text": "You fall into an ambush set by the bandits."
        },
        "caravane_fin_succes": {
            "description": "You return to the guild with the recovered goods. They are so happy they shower you with gold."
        },
        "caravane_fin_echec": {
            "description": "You return empty-handed and injured. The guild looks at you with contempt. A total failure."
        },
        "temple_debut": {
            "description": "The temple entrance is a stone arch leading into the dark, damp depths.",
            "choice1_text": "Descend into the temple",
            "choice1_success_text": "The air is cool and smells of ozone. Ancient traps surely protect this place."
        },
        "temple_salle_piegee": {
            "description": "The floor of a large hall is covered with tiles. Some seem unstable.",
            "choice1_text": "Cross with agility (Agility 38+)",
            "choice1_success_text": "Like a dancer, you leap from tile to tile, avoiding all the traps.",
            "choice1_failure_text": "You step on a wrong tile. Poisoned darts shoot out from the walls!"
        },
        "temple_autel": {
            "description": "You arrive at a submerged altar. In the center, a chest sealed by water magic. A water elemental protects it.",
            "choice1_text": "Break the seal (Intelligence 35+)",
            "choice1_success_text": "You decipher the runes and the seal dissipates, weakening the elemental!",
            "choice2_text": "Try to force the chest open",
            "choice2_success_text": "Your attempt fails and triggers the fury of the elemental guardian!"
        },
        "temple_fin_succes": {
            "description": "You leave with the treasure of the Sunken Temple, a feat few can tell of."
        },
        "temple_fin_echec": {
            "description": "The temple and its guardian have kept their secrets. You leave, soaked and disappointed."
        },
        "arene_debut": {
            "description": "You enter the Arena tournament. The first trial is a fight against beasts.",
            "choice1_text": "Enter the arena"
        },
        "arene_agilite": {
            "description": "You won! The second trial is a trapped obstacle course.",
            "choice1_text": "Attempt the course (Agility 32+)",
            "choice1_success_text": "You fly over the obstacles. Your agility is unmatched. You're on to the finals!",
            "choice1_failure_text": "You stumble on an obstacle. The humiliation is total. You are eliminated."
        },
        "arene_finale": {
            "description": "The final is a duel against the reigning champion, a formidable warrior.",
            "choice1_text": "Fight for glory!"
        },
        "arene_fin_succes": {
            "description": "You are the Arena champion! You receive the winner's purse and the admiration of all."
        },
        "arene_fin_moyen": {
            "description": "You lost in the final, but your performance was noticed. You receive the runner-up prize."
        },
        "arene_fin_echec": {
            "description": "Your participation in the tournament was brief and humiliating."
        },
        "basilic_debut": {
            "description": "A basilisk has taken up residence in a quarry, petrifying the workers. Their stone statues testify to the danger.",
            "choice1_text": "Enter the quarry",
            "choice1_success_text": "You advance cautiously, avoiding looking directly into dark corners."
        },
        "basilic_approche": {
            "description": "You spot the beast. Its skin is as hard as stone.",
            "choice1_text": "Use a polished shield as a mirror (Intelligence 32+)",
            "choice1_success_text": "Your ruse works! The basilisk meets its own gaze in the reflection and petrifies itself.",
            "choice1_failure_text": "The shield is not polished enough. The beast spots you and attacks!",
            "choice2_text": "Attack it head-on (Defense 18+)",
            "choice2_success_text": "You charge, closing your eyes at the last moment. Your defense absorbs the initial shock!",
            "choice2_failure_text": "The beast's gaze grazes you and your limbs stiffen. You are weakened."
        },
        "basilic_fin_succes": {
            "description": "You have defeated the terrible basilisk. The quarry can reopen and you are generously rewarded."
        },
        "basilic_fin_echec": {
            "description": "The basilisk's gaze was too powerful. You flee before becoming a new statue."
        },
        "navire_fantome_debut": {
            "description": "The wreck of a grounded galleon is visible at low tide. It is said that its ghostly crew still protects it.",
            "choice1_text": "Explore the cursed wreck",
            "choice1_success_text": "You climb aboard. The wood creaks under your feet and a supernatural mist surrounds you."
        },
        "navire_fantome_cale": {
            "description": "The hold is full of chests. As you approach, wailing spectres appear!",
            "choice1_text": "Fight the spirits",
            "choice2_text": "Find and burn their logbook (Intelligence 30+)",
            "choice2_success_text": "You find the captain's log and burn it. The spirits' bond to the ship is broken, and they disappear.",
            "choice2_failure_text": "You don't find the log in time. The spectres attack you."
        },
        "navire_fantome_pont": {
            "description": "On the deck, the ghost captain awaits you. 'No one will plunder my ship!' he screams.",
            "choice1_text": "Face the captain"
        },
        "navire_fantome_fin_succes": {
            "description": "With the captain defeated, the curse is lifted. The crew's treasure is yours."
        },
        "navire_fantome_fin_echec": {
            "description": "The ship's ghosts have driven you away. Their treasure will forever remain beneath the waves."
        },
        "tournoi_arc_debut": {
            "description": "The prestigious Iron Falcon tournament begins. The first trial: hitting an apple on a moving target.",
            "choice1_text": "Try your luck (Agility 30+)",
            "choice1_success_text": "Your arrow splits the air and lands in the center of the apple! You've qualified for the next round.",
            "choice1_failure_text": "Your arrow misses the target. You are eliminated in the first round."
        },
        "tournoi_arc_manches": {
            "description": "The second trial: hitting three targets with a single shot by ricocheting the arrow.",
            "choice1_text": "Attempt the incredible shot (Agility 35+ & Luck 25+)",
            "choice1_success_text": "Incredible! Your arrow ricochets perfectly and hits all three targets. You're in the final!",
            "choice1_failure_text": "Your shot is good, but only hits two targets. You finish in an honorable place."
        },
        "tournoi_arc_finale": {
            "description": "The final pits you against the Elf Lúthien, the reigning champion. You must cut a rope holding a weight, from 200 paces.",
            "choice1_text": "Shoot to win (Agility 40+)",
            "choice1_success_text": "Your focus is absolute. Your arrow cuts the rope! You are the new champion!",
            "choice1_failure_text": "Your arrow grazes the rope but doesn't cut it. Lúthien, however, does not miss. You are second."
        },
        "tournoi_arc_fin_succes": {
            "description": "You won the Iron Falcon tournament! Your name is on everyone's lips."
        },
        "tournoi_arc_fin_moyen": {
            "description": "You didn't win, but your performance was impressive. You leave with the runner-up prize."
        },
        "tournoi_arc_fin_echec": {
            "description": "This tournament was on a level too high for you. You leave with a lesson in humility."
        },
        "mines_cristal_debut": {
            "description": "A mine rich in mana crystals has been overrun by crystal golems animated by an unknown force.",
            "choice1_text": "Enter the mine",
            "choice1_success_text": "The mine walls sparkle. A golem blocks your path."
        },
        "mines_cristal_coeur": {
            "description": "You reach the heart of the mine. A giant crystal pulses with energy and animates the golems around it.",
            "choice1_text": "Destroy the giant crystal (Strength 35+)",
            "choice1_success_text": "You strike the crystal with all your might. It cracks and explodes, deactivating all the golems.",
            "choice1_failure_text": "The crystal is too strong. It releases a shockwave that injures you and awakens more golems!"
        },
        "mines_cristal_fin_succes": {
            "description": "The mine is liberated! In addition to the mana crystals, you receive a reward from the miners' guild."
        },
        "mines_cristal_fin_moyen": {
            "description": "You had to fight for every inch, but the mine is secured."
        },
        "mines_cristal_fin_echec": {
            "description": "The crystal golems were innumerable. You were overwhelmed."
        },
        "vol_musee_debut": {
            "description": "Your mission, should you choose to accept it: infiltrate the Royal Museum and steal the 'Dawn Diamond'.",
            "choice1_text": "Prepare the heist",
            "choice1_success_text": "You study the plans and wait for night."
        },
        "vol_musee_infiltration": {
            "description": "Access is through the roof. Security is maximal.",
            "choice1_text": "Pick a skylight lock (Agility 35+)",
            "choice1_success_text": "Your nimble fingers bypass the lock. You are inside.",
            "choice1_failure_text": "You break your tools. You must find another way, which alerts a guard."
        },
        "vol_musee_salle": {
            "description": "The diamond is on a pedestal, protected by magical light beams.",
            "choice1_text": "Disable the beams (Intelligence 38+)",
            "choice1_success_text": "You understand the sequence and disable the trap. The diamond is yours!",
            "choice1_failure_text": "Wrong move! The alarm sounds throughout the city. You must flee!"
        },
        "vol_musee_fin_succes": {
            "description": "A perfect heist! You sell the diamond for a fortune."
        },
        "vol_musee_fin_echec": {
            "description": "The heist was a resounding failure. You are lucky not to be in prison."
        },
        "guerre_guildes_debut": {
            "description": "The Thieves' Guild and the Assassins' Guild are at war. Both sides are looking to recruit independent agents.",
            "choice1_text": "Help the Thieves (Agility, Luck)",
            "choice1_success_text": "You contact the master of thieves. He wants you to steal the assassins' contract ledger.",
            "choice2_text": "Help the Assassins (Strength, Intelligence)",
            "choice2_success_text": "You meet the leader of the assassins. He wants you to eliminate the thieves' treasurer."
        },
        "guerre_guildes_voleurs": {
            "description": "The ledger is in their safe.",
            "choice1_text": "Pick the lock (Agility 40+)",
            "choice1_success_text": "The safe opens. You have the ledger!",
            "choice1_failure_text": "You are spotted by an assassin!"
        },
        "guerre_guildes_assassins": {
            "description": "The treasurer is in a well-guarded tavern.",
            "choice1_text": "Poison him discreetly (Intelligence 40+)",
            "choice1_success_text": "You pour the poison unseen. The target collapses.",
            "choice1_failure_text": "Your subterfuge fails. You have to fight!"
        },
        "guerre_guildes_fin_voleurs": {
            "description": "The Thieves now have a decisive advantage thanks to you. They pay you generously."
        },
        "guerre_guildes_fin_assassins": {
            "description": "The Assassins have dealt a severe blow to their rivals. Your contract is fulfilled and you are richly paid."
        },
        "guerre_guildes_fin_echec": {
            "description": "You failed your mission, and you are now the enemy of one of the most dangerous guilds."
        },
        "oasis_debut": {
            "description": "According to an old map, a lost and lush oasis is hidden in the heart of the Ash Desert.",
            "choice1_text": "Cross the desert",
            "choice1_success_text": "The heat is crushing. You must manage your strength."
        },
        "oasis_traversee": {
            "description": "A sandstorm is rising!",
            "choice1_text": "Find shelter (Intelligence 30+)",
            "choice1_success_text": "You spot a rock formation that offers you precarious but sufficient shelter.",
            "choice1_failure_text": "The storm hits you head-on, disorienting and injuring you."
        },
        "oasis_gardien": {
            "description": "You finally find the oasis. In the center, a sapphire Djinn floats above the water. 'Pass my test or fight me, mortal.'",
            "choice1_text": "Answer his riddle (Intelligence 40+)",
            "choice1_success_text": "You answer correctly. Impressed, the Djinn allows you to drink and take some of his treasure.",
            "choice1_failure_text": "Wrong answer. The Djinn attacks!",
            "choice2_text": "Fight the Djinn"
        },
        "oasis_fin_succes": {
            "description": "You have defeated the Djinn, by force or by wit. The oasis and its treasures are yours."
        },
        "oasis_fin_echec": {
            "description": "The guardian of the oasis was too powerful. You are driven from the desert."
        },
        "rituel_sang_debut": {
            "description": "A blood-red glow pulses from the top of a ruined citadel. A group of necromancers is preparing a large-scale ritual there.",
            "choice1_text": "Interrupt the ritual",
            "choice1_success_text": "You infiltrate the citadel. Cultists are everywhere."
        },
        "rituel_sang_approche": {
            "description": "The apprentice necromancer is leading the ritual. Skeletons guard the room.",
            "choice1_text": "Create a diversion (Agility 32+)",
            "choice1_success_text": "You create a diversion, luring the skeletons away and leaving a clear path to the necromancer.",
            "choice1_failure_text": "Your diversion fails. You must fight the guards first."
        },
        "rituel_sang_combat": {
            "description": "You face the Apprentice Necromancer. 'You cannot stop the master!' he shouts, raising his staff.",
            "choice1_text": "Stop him!"
        },
        "rituel_sang_fin_succes": {
            "description": "The ritual is stopped and the necromancer defeated. You have prevented a catastrophe."
        },
        "rituel_sang_fin_echec": {
            "description": "The ritual went too far. A wave of necromantic energy overwhelms you and forces you to flee."
        },
        "fievre_or_debut": {
            "description": "A rumor of a gold vein in the hills has attracted dozens of prospectors, and tension is rising.",
            "choice1_text": "Try your luck and look for gold",
            "choice1_success_text": "You buy a pickaxe and a pan and start searching."
        },
        "fievre_or_recherche": {
            "description": "Where will you look?",
            "choice1_text": "In the river (Luck 35+)",
            "choice1_success_text": "Bingo! You find several large gold nuggets in the riverbed.",
            "choice1_failure_text": "You only find sand and pebbles.",
            "choice2_text": "In an old gallery (Strength 30+)",
            "choice2_success_text": "After clearing a cave-in, you hit a rich vein!",
            "choice2_failure_text": "The gallery is empty. You've wasted your time."
        },
        "fievre_or_conflit": {
            "description": "Your find has attracted the attention of a group of rival and unscrupulous prospectors.",
            "choice1_text": "Share your find",
            "choice1_success_text": "You give them a small part. They grumble but leave you alone.",
            "choice2_text": "Defend your claim"
        },
        "fievre_or_fin_succes": {
            "description": "You defended your gold and get to keep it all. You are rich!"
        },
        "fievre_or_fin_moyen": {
            "description": "You shared, but you still leave with a nice haul. Caution paid off."
        },
        "fievre_or_fin_echec": {
            "description": "Gold fever only brought you trouble. You leave without a penny."
        },
        "egouts_debut": {
            "description": "Whispers and disappearances are worrying the inhabitants of the slums. Everything seems to be coming from the sewers.",
            "choice1_text": "Descend into the city's bowels",
            "choice1_success_text": "The smell is foul, but you proceed through the dark tunnels."
        },
        "egouts_pistes": {
            "description": "You find a half-eaten corpse. Something big lives here.",
            "choice1_text": "Follow the slime trails (Intelligence 28+)",
            "choice1_success_text": "The trails lead you directly to the creature's lair.",
            "choice1_failure_text": "You get lost in the labyrinthine sewers."
        },
        "egouts_repaire": {
            "description": "You arrive in a large cavern. An Otyugh, a foul creature of waste and tentacles, guards a nest filled with stolen items.",
            "choice1_text": "Fight the sewer monster"
        },
        "egouts_fin_succes": {
            "description": "You have defeated the beast and cleaned out the sewers. You recover the valuable items from its nest."
        },
        "egouts_fin_echec": {
            "description": "The creature was too repulsive and powerful. You flee at top speed."
        },
        "siege_debut": {
            "description": "An exhausted messenger informs you that the Watcher's Fort is about to fall to relentless waves of goblins led by Orcs. Your help is their last hope.",
            "choice1_text": "Go to the fort immediately.",
            "choice1_success_text": "You don't waste a second and rush to the battlefield."
        },
        "siege_bataille": {
            "description": "You arrive in the midst of chaos. Orcs are using battering rams to break down the gate while goblins scale the ramparts.",
            "choice1_text": "Destroy the battering ram (Strength 45+)",
            "choice1_success_text": "You make a heroic sortie and smash the battering ram. The Orcs are furious.",
            "choice1_failure_text": "You are pushed back by the brute force of the Orcs. You must fall back to the ramparts.",
            "choice2_text": "Defend the ramparts (Defense 20+)",
            "choice2_success_text": "You are a rock. You push back the ladders and hold the line against the orcs.",
            "choice2_failure_text": "The orcs are too numerous. You are overwhelmed."
        },
        "siege_remparts": {
            "description": "The fight on the ramparts is a maelstrom of steel and screams. You must hold on.",
            "choice1_text": "Hold the line!"
        },
        "siege_chaman": {
            "description": "The battle seems to be turning in your favor, but an Orc shaman on a tower is summoning a rain of fire. He must be stopped!",
            "choice1_text": "Take him down from a distance (Agility 50+)",
            "choice1_success_text": "With a precise arrow, you hit the shaman who collapses. Deprived of their magic, the attackers panic and flee.",
            "choice1_failure_text": "You can't reach him in time. A fireball hits you head-on."
        },
        "siege_fin_succes": {
            "description": "You have saved the fort! You are hailed as a hero. The commander offers you access to the royal armory as a reward."
        },
        "siege_fin_echec": {
            "description": "Despite your efforts, the fort has fallen. You managed to escape, but the weight of defeat is heavy."
        },
        "culte_debut": {
            "description": "The city guard hires you to infiltrate a secret cult that is gaining influence. Their intentions are obscure.",
            "choice1_text": "Accept the infiltration mission",
            "choice1_success_text": "You find a contact who can get you into the inner circle."
        },
        "culte_infiltration": {
            "description": "You are attending a secret ceremony. The high priest speaks of summoning a shadow entity.",
            "choice1_text": "Look for evidence of their plans (Intelligence 48+)",
            "choice1_success_text": "You find their ritual book and letters detailing a plot. You have what you need.",
            "choice1_failure_text": "You find nothing concrete. To learn more, you must pass the zealot's trial: a ritual combat."
        },
        "culte_sabotage": {
            "description": "The summoning ritual has begun! The high priest is channeling energy.",
            "choice1_text": "Destroy the idol (Strength 40+)",
            "choice1_success_text": "You shatter the idol, causing an energy overload that disperses the cult.",
            "choice2_text": "Interrupt the incantation (Agility 50+)",
            "choice2_success_text": "You sneak in and disturb the priest at the key moment. The ritual fails miserably.",
            "choice2_failure_text": "You've been spotted! The priest attacks you with his dark magic."
        },
        "culte_fin_succes": {
            "description": "You have dismantled the cult and exposed their plot. The city is grateful to you."
        },
        "culte_fin_echec": {
            "description": "The cult has unmasked and hunted you down. Their plans continue in the shadows."
        },
        "volcan_debut": {
            "description": "An ancient legend speaks of a gem of power, the Magma Heart, deep within the active volcano of Mount Ash.",
            "choice1_text": "Attempt the volcanic expedition",
            "choice1_success_text": "The heat is already stifling at the base of the volcano. The ascent will be tough."
        },
        "volcan_ascension": {
            "description": "Rivers of lava block the passage. You must find a way.",
            "choice1_text": "Jump over a crevasse (Agility 45+)",
            "choice1_success_text": "With a powerful leap, you cross the lava crevasse.",
            "choice1_failure_text": "You slip! You catch yourself just in time, but your boots are on fire.",
            "choice2_text": "Endure the heat of a narrow path (Defense 25+)",
            "choice2_success_text": "Your armor and your will protect you from the intense heat. You pass.",
            "choice2_failure_text": "The heat is unbearable. You are severely burned."
        },
        "volcan_gardien": {
            "description": "The entrance to the central cave is guarded by a Magma Elemental.",
            "choice1_text": "Confront the guardian"
        },
        "volcan_coeur": {
            "description": "You find the Magma Heart on a basalt pedestal. Removing it will surely trigger an eruption!",
            "choice1_text": "Take the gem and run!",
            "choice1_success_text": "You seize the gem. As expected, the volcano rumbles and the escape begins!"
        },
        "volcan_fin_succes": {
            "description": "You narrowly escaped the eruption, with the gem in your possession. A treasure of inestimable value."
        },
        "volcan_fin_echec": {
            "description": "The volcano was too powerful an adversary. You leave with severe burns and nothing else."
        },
        "biblio_debut": {
            "description": "An old map leads to an ancient library, hidden beneath the salt desert.",
            "choice1_text": "Follow the map",
            "choice1_success_text": "You venture into the desert, map in hand."
        },
        "biblio_entree": {
            "description": "You find the entrance, sealed by a stone door engraved with a riddle: 'I have no voice, but I tell stories. Who am I?'",
            "choice1_text": "Answer 'Knowledge' (Intelligence 50+)",
            "choice1_success_text": "The door opens. Your intelligence has cleared the way.",
            "choice1_failure_text": "Wrong answer. The door remains closed.",
            "choice2_text": "Answer 'A Book'",
            "choice2_success_text": "The door opens. It was the most obvious answer."
        },
        "biblio_gardien": {
            "description": "Inside, a stone golem comes to life. 'Only the worthy may consult the archives. Prove your intellectual worth.' It poses a complex riddle to you.",
            "choice1_text": "Solve the golem's riddle (Intelligence 60+)",
            "choice1_success_text": "You solve its riddle. Impressed, the golem steps aside.",
            "choice1_failure_text": "'Unworthy!' shouts the golem as it attacks you. You must flee.",
            "choice2_text": "Fight it"
        },
        "biblio_fin_succes": {
            "description": "You spend hours reading ancient texts, accumulating immense knowledge."
        },
        "biblio_fin_moyen": {
            "description": "You defeated the guardian by force. You have little time to consult the books before the magic of the place expels you."
        },
        "biblio_fin_echec": {
            "description": "The library will remain a mystery to you. You leave with the bitter taste of failure."
        },
        "pirate_debut": {
            "description": "The 'Cloud Serpent', a pirate ship, has docked at an isolated peak to resupply.",
            "choice1_text": "Attempt a stealthy boarding (Agility 50+)",
            "choice1_success_text": "You climb aboard without a sound, hidden by the mist.",
            "choice1_failure_text": "A lookout spots you! The alarm is sounded. You must fight your way on board."
        },
        "pirate_cale": {
            "description": "You are in the hold. It is filled with loot. You can take what you can and flee, or try to capture the ship.",
            "choice1_text": "Steal the treasure and flee (Luck 45+)",
            "choice1_success_text": "You fill your bags and slip away before anyone notices your presence. A perfect theft.",
            "choice1_failure_text": "Trying to take too much, you make noise. The pirates corner you in the hold.",
            "choice2_text": "Go up to the deck to face the captain",
            "choice2_success_text": "You leave the loot. Glory is more important."
        },
        "pirate_pont": {
            "description": "You arrive on the deck. The pirate captain challenges you to a duel.",
            "choice1_text": "Accept the duel"
        },
        "pirate_fin_capitaine": {
            "description": "You are the new captain of the 'Cloud Serpent'! You decide to sell the ship for an astronomical sum."
        },
        "pirate_fin_vol": {
            "description": "You have plundered the hold of the greatest pirate ship in the skies. A thief's feat."
        },
        "pirate_fin_echec": {
            "description": "Sky pirates are not to be trifled with. You get out alive, but with nothing more."
        },
        "peste_debut": {
            "description": "A disease, the 'Ashen Fever', is spreading. Dr. Alistair proposes a purge by fire (Strength), while Dr. Elara suggests a complex remedy (Intelligence).",
            "choice1_text": "Help Dr. Alistair",
            "choice1_success_text": "You join Alistair. His method is direct: burn the infected houses.",
            "choice2_text": "Help Dr. Elara",
            "choice2_success_text": "You join Elara. She needs rare ingredients for her remedy."
        },
        "peste_alistair": {
            "description": "Alistair asks you to help him control the fires so they don't spread.",
            "choice1_text": "Contain the flames (Strength 50+ & Defense 25+)",
            "choice1_success_text": "Your strength and endurance allow you to control the blazes. The method is brutal, but the disease seems to be contained.",
            "choice1_failure_text": "The fire gets out of control and burns a healthy part of the village. It's a disaster."
        },
        "peste_elara": {
            "description": "Elara needs 'Specter's Tears', which are only found in the haunted cemetery, guarded by spirits.",
            "choice1_text": "Retrieve the Specter's Tears (Intelligence 55+)",
            "choice1_success_text": "Your knowledge allows you to navigate among the spirits and collect the ingredient.",
            "choice1_failure_text": "The spirits torment you and chase you from the cemetery."
        },
        "peste_fin_alistair": {
            "description": "The Ashen Fever is gone, but at what cost... The village rewards you, but the stares are heavy."
        },
        "peste_fin_elara": {
            "description": "Elara's remedy works wonderfully! You are hailed as a savior."
        },
        "peste_fin_echec": {
            "description": "Your failure has cost dearly. The disease continues to spread and your reputation is ruined."
        },
        "cite_automates_debut": {
            "description": "You have found the entrance to the legendary City of Automatons. The massive door is sealed.",
            "choice1_text": "Decipher the lock (Intelligence 50+)",
            "choice1_success_text": "The complex mechanisms hold no secrets for you. The door opens.",
            "choice1_failure_text": "The lock is too complex. You must force a breach."
        },
        "cite_automates_force": {
            "description": "You notice a cracked wall. Perhaps you could break it.",
            "choice1_text": "Force the passage (Strength 60+)",
            "choice1_success_text": "With repeated blows, the wall gives way. You are inside, but you have alerted the guards."
        },
        "cite_automates_interieur": {
            "description": "The city is a maze of metallic streets. An Automaton Guard is patrolling.",
            "choice1_text": "Destroy it",
            "choice1_success_text": "The Guard detects you and attacks!",
            "choice2_text": "Dodge it (Agility 55+)",
            "choice2_success_text": "You slip into the shadows and avoid the patrol."
        },
        "cite_automates_coeur": {
            "description": "You reach the heart of the city, the 'Collector's' room, a massive golem that absorbs the city's energy.",
            "choice1_text": "Confront the Collector",
            "choice1_success_text": "The giant golem activates to defend its territory."
        },
        "cite_automates_fin_succes": {
            "description": "By defeating the Collector, you have recovered its energy core and an incredible amount of precious metal."
        },
        "cite_automates_fin_echec": {
            "description": "The city's defenses were too perfect. You leave empty-handed."
        },
        "labyrinthe_debut": {
            "description": "You enter the legendary labyrinth of the Minotaur. The stone walls close behind you.",
            "choice1_text": "Advance randomly",
            "choice1_success_text": "You delve deeper into the maze."
        },
        "labyrinthe_chemin": {
            "description": "You arrive at an intersection. Bones litter the ground.",
            "choice1_text": "Follow the footprints (Intelligence 45+)",
            "choice1_success_text": "You notice that some tracks are fresh. You follow the trail towards the center.",
            "choice1_failure_text": "You get lost. You wander for hours.",
            "choice2_text": "Use intuition (Luck 40+)",
            "choice2_success_text": "Your instinct guides you. You find a secret passage that brings you closer to the center.",
            "choice2_failure_text": "Your intuition leads you to a trapped dead-end."
        },
        "labyrinthe_centre": {
            "description": "You find the center of the labyrinth. A Minotaur, a creature half-man, half-bull, awaits, bellowing.",
            "choice1_text": "Confront the monster"
        },
        "labyrinthe_fin_succes": {
            "description": "The Minotaur is defeated. You find its treasure and the way out."
        },
        "labyrinthe_fin_echec": {
            "description": "The monster was too powerful. You fled, but you are forever lost in the labyrinth..."
        },
        "cour_miracles_debut": {
            "description": "The King of Beggars, a charismatic and dangerous character, challenges you to survive one night in his underground kingdom, the Court of Miracles.",
            "choice1_text": "Accept the challenge",
            "choice1_success_text": "You descend into the slums. The rule is simple: make it to dawn."
        },
        "cour_miracles_epreuve1": {
            "description": "First trial: cross the 'Cutpurse Square' without having anything stolen.",
            "choice1_text": "Create a diversion with a few coins (Luck 40+)",
            "choice1_success_text": "You toss a few coins. While the thieves fight over them, you pass.",
            "choice1_failure_text": "They take your coins AND your purse. You lose resources.",
            "choice2_text": "Sneak through (Agility 55+)",
            "choice2_success_text": "You are a shadow. No one notices you passing.",
            "choice2_failure_text": "A thief spots you and tries to stab you!"
        },
        "cour_miracles_epreuve2": {
            "description": "Second trial: the 'King's Feast'. You are served a suspicious stew.",
            "choice1_text": "Eat it (Health 40+)",
            "choice1_success_text": "Your stomach is strong. The stew is vile, but you survive.",
            "choice1_failure_text": "You are poisoned. You spend the rest of the night vomiting."
        },
        "cour_miracles_fin_succes": {
            "description": "The sun rises. You have survived. The King of Beggars, impressed, names you 'Friend of the Court' and offers you a tribute."
        },
        "cour_miracles_fin_echec": {
            "description": "You failed the challenge. The Court of Miracles strips you of your belongings and throws you out in the morning."
        },
        "ile_chimere_debut": {
            "description": "You land on an isolated island that housed the laboratory of a mad alchemist. His creations still roam here.",
            "choice1_text": "Explore the island",
            "choice1_success_text": "The jungle is unnaturally lush and silent. You find the ruined laboratory."
        },
        "ile_chimere_labo": {
            "description": "The laboratory is filled with notes and broken cages. You must find clues about the island's main creature.",
            "choice1_text": "Read the alchemist's journal (Intelligence 50+)",
            "choice1_success_text": "You learn that the Chimera fears the shrill sound of metal striking metal. A crucial piece of information.",
            "choice1_failure_text": "The notes are too complex. You learn nothing useful."
        },
        "ile_chimere_combat": {
            "description": "An abominable creature, a mix of lion, goat, and serpent, the Chimera, emerges from the jungle!",
            "choice1_text": "Confront the Chimera"
        },
        "ile_chimere_fin_succes": {
            "description": "The creature is dead. You have put an end to an alchemist's nightmare and can now loot the laboratory in peace."
        },
        "ile_chimere_fin_echec": {
            "description": "The Chimera is an abomination of nature. You fled to save your skin."
        },
        "pacte_infernal_debut": {
            "description": "Duke Eliphas reigns through terror. It is whispered that he made a pact with a demon to obtain his power.",
            "choice1_text": "Infiltrate the castle to break the pact",
            "choice1_success_text": "You enter the castle under the cover of night."
        },
        "pacte_infernal_contrat": {
            "description": "You must find the demonic contract to destroy it. It is either in the library or the treasury.",
            "choice1_text": "Search the library (Intelligence 52+)",
            "choice1_success_text": "Among thousands of books, you find the parchment of human skin. You burn it, weakening the Duke.",
            "choice1_failure_text": "You find nothing. The contract must be in the treasury, which is heavily guarded."
        },
        "pacte_infernal_combat": {
            "description": "Duke Eliphas, feeling his power wane, confronts you. Infernal flames dance around him.",
            "choice1_text": "Confront the Duke and his demonic master"
        },
        "pacte_infernal_fin_succes": {
            "description": "The pact is broken and the Duke is defeated. You have freed the duchy from his tyrannical grip."
        },
        "pacte_infernal_fin_echec": {
            "description": "The Duke's infernal power was too great. You were defeated."
        },
        "chasse_sauvage_debut": {
            "description": "The Wild Hunt, a horde of spectral horsemen, crosses the sky at night, snatching souls. You must stop it.",
            "choice1_text": "Wait for them on the moor",
            "choice1_success_text": "The hunting horn sounds. The horde is coming."
        },
        "chasse_sauvage_confrontation": {
            "description": "The Hunter King and his pack of ghostly hounds stop before you. 'Who dares defy the Hunt?'",
            "choice1_text": "Challenge him to single combat (Strength 55+)",
            "choice1_success_text": "Impressed by your audacity, the King accepts. A duel for the fate of the region!",
            "choice2_text": "Offer him a worthy tribute (500 Metal)",
            "choice2_success_text": "You offer a tribute of precious metal. The King, satisfied, spares this land for this season.",
            "choice2_failure_text": "Your tribute is unworthy. The Hunt will take you by force!"
        },
        "chasse_sauvage_fin_succes": {
            "description": "You have defeated the Hunter King. The Wild Hunt disappears, freeing the captive souls."
        },
        "chasse_sauvage_fin_moyen": {
            "description": "You have bought peace for a time. The Hunt will return, but for now, the region is safe."
        },
        "chasse_sauvage_fin_echec": {
            "description": "One does not defy the Wild Hunt with impunity. You were lucky to survive."
        },
        "sommet_monde_debut": {
            "description": "You begin the ascent of the Eternal Peak, the highest mountain in the world, to find the Oracle who knows the answer to an ancient prophecy.",
            "choice1_text": "Begin the ascent",
            "choice1_success_text": "The path is arduous and the air grows thin."
        },
        "sommet_monde_epreuve": {
            "description": "The guardian of the summit, a majestic Griffin, blocks your path.",
            "choice1_text": "Fight it",
            "choice2_text": "Prove your worth to it (Strength 50+ & Health 50+)",
            "choice2_success_text": "You withstand its charge and show your strength without killing it. Respectful, it lets you pass.",
            "choice2_failure_text": "Your show of strength is pathetic. The Griffin attacks you."
        },
        "sommet_monde_oracle": {
            "description": "You reach the Oracle. He reveals a part of the prophecy to you, a knowledge that weighs heavily on your mind.",
            "choice1_text": "Accept the burden of knowledge",
            "choice1_success_text": "Knowledge is both a weapon and a burden. You descend, changed."
        },
        "sommet_monde_fin_succes": {
            "description": "You have spoken to the Oracle and survived the summit of the world. The prophecy will guide you."
        },
        "sommet_monde_fin_echec": {
            "description": "The guardian or the mountain itself got the better of you. You will not reach the summit."
        },
        "maelstrom_debut": {
            "description": "A storm of pure magic, the Maelstrom, threatens to tear reality apart. You must navigate to its eye to calm it.",
            "choice1_text": "Enter the Maelstrom",
            "choice1_success_text": "Lightning of all colors streaks across a purple sky. Reality twists around you."
        },
        "maelstrom_navigation": {
            "description": "You must navigate between waves of raw energy.",
            "choice1_text": "Dodge the waves (Agility 58+)",
            "choice1_success_text": "Your agility allows you to surf the magical currents to the center.",
            "choice1_failure_text": "A wave of chaotic energy hits you, temporarily altering your strengths."
        },
        "maelstrom_oeil": {
            "description": "In the calm eye of the storm, you find an unstable crystal of chaos, the source of the problem.",
            "choice1_text": "Stabilize it (Intelligence 55+)",
            "choice1_success_text": "You channel your own energy to stabilize the crystal. The Maelstrom calms.",
            "choice1_failure_text": "Your attempt overloads the crystal! It explodes, throwing you out of the storm."
        },
        "maelstrom_fin_succes": {
            "description": "You have calmed the Maelstrom. Shards of pure crystallized magic rain down around you."
        },
        "maelstrom_fin_echec": {
            "description": "The raw magic of the Maelstrom has rejected you. The storm continues to rage."
        },
        "guerre_profonds_debut": {
            "description": "Amphibious creatures, the Deep Ones, are emerging from the ocean and attacking coastal cities. You are hired to defend the port of Salterras.",
            "choice1_text": "Join the defense line",
            "choice1_success_text": "You take your position on the barricades as the tide of monsters arrives."
        },
        "guerre_profonds_vague": {
            "description": "The first wave of Deep Ones is here!",
            "choice1_text": "Hold the barricade (Strength 50+ & Defense 22+)",
            "choice1_success_text": "You are an impassable wall. You repel the first wave almost single-handedly.",
            "choice1_failure_text": "They are too numerous and their strength is surprising. The barricade gives way."
        },
        "guerre_profonds_champion": {
            "description": "A larger, more brutal Deep One, armed with a coral trident, leads the second wave.",
            "choice1_text": "Confront the Deep One champion"
        },
        "guerre_profonds_fin_succes": {
            "description": "With their champion defeated, the Deep Ones retreat to the ocean. The port is saved thanks to you."
        },
        "guerre_profonds_fin_echec": {
            "description": "The tide of Deep Ones was unstoppable. The port was sacked, and you had to flee to survive."
        },
        "sablier_temps_debut": {
            "description": "The Hourglass of Chronos, capable of freezing time, has been stolen from the Monastery of Time by an elite assassin. It must be recovered before it causes a paradox.",
            "choice1_text": "Pursue the thief",
            "choice1_success_text": "You follow the thief's trail, who seems to appear and disappear."
        },
        "sablier_temps_piste": {
            "description": "The thief uses the hourglass to create short time loops to throw you off.",
            "choice1_text": "Anticipate his movements (Intelligence 55+ & Luck 45+)",
            "choice1_success_text": "You understand his logic and anticipate his next appearance, finally cornering him.",
            "choice1_failure_text": "He is too unpredictable. You are constantly late, which exhausts you."
        },
        "sablier_temps_combat": {
            "description": "The Shadow Assassin is cornered. He uses the hourglass to dodge and attack at impossible moments.",
            "choice1_text": "Confront him"
        },
        "sablier_temps_fin_succes": {
            "description": "You have defeated the assassin and recovered the Hourglass. The monks thank you for saving the course of time."
        },
        "sablier_temps_fin_echec": {
            "description": "The thief and his artifact were elusive. He has escaped, and time itself is now in danger."
        },
        "relique_debut": {
            "description": "An ancient temple has emerged from the clouds, floating in the sky. At its summit, a divine relic lost for millennia awaits you.",
            "choice1_text": "Attempt the ascent of the Celestial Temple",
            "choice1_success_text": "You find a way to climb onto the floating island. The path to the summit is a maze of light bridges and moving platforms."
        },
        "relique_ascension": {
            "description": "The path is guarded by celestial riddles and strong winds.",
            "choice1_text": "Cross the light bridges (Agility 70+)",
            "choice1_success_text": "Your agility is divine. You dance on the light and progress quickly.",
            "choice1_failure_text": "You almost fall! You catch yourself, but the trial has cost you some of your strength.",
            "choice2_text": "Solve the Zephyr's riddle (Intelligence 75+)",
            "choice2_success_text": "You understand the wind currents and use them to carry you effortlessly to the next platform.",
            "choice2_failure_text": "The riddle eludes you. A strong wind hits you head-on."
        },
        "relique_gardien": {
            "description": "The summit of the temple is guarded by an Archangel of Light. 'Only the pure may approach the relic,' he declares.",
            "choice1_text": "Prove your purity through speech (Intelligence 80+)",
            "choice1_success_text": "Your words are wise and your heart seems just. The Archangel, convinced, steps aside.",
            "choice1_failure_text": "'Your words are in vain!' The Archangel raises his sword of light.",
            "choice2_text": "Fight him",
            "choice2_success_text": "Purity is proven by deeds, not words."
        },
        "relique_fin_succes": {
            "description": "You have obtained the Divine Relic. Its power flows through your body and soul."
        },
        "relique_fin_echec": {
            "description": "The celestial guardian was too powerful. He banishes you from the floating temple."
        },
        "dragon_debut": {
            "description": "An ancient red dragon, Ignis, terrorizes the region from its lair at the top of the Ashen Peak. Only a legendary hero can stop it.",
            "choice1_text": "Accept the dragon hunt.",
            "choice1_success_text": "You gather your courage and begin the perilous ascent of the Ashen Peak."
        },
        "dragon_approche": {
            "description": "The air grows hot and heavy with sulfur. The lair is near. You can attempt a stealthy approach along the ledges or go through the main entrance, a lava tunnel.",
            "choice1_text": "Stealthy approach (Agility 70+)",
            "choice1_success_text": "Your discretion is legendary. You reach the heart of the lair without alerting the dragon, who slumbers on its treasure.",
            "choice1_failure_text": "You drop a stone. The dragon opens a reptilian eye and spots you.",
            "choice2_text": "Main entrance (Health 150+)",
            "choice2_success_text": "The heat is intense, but your endurance allows you to pass through. The dragon awaits you.",
            "choice2_failure_text": "The heat is unbearable. You are severely burned."
        },
        "dragon_surprise": {
            "description": "You have the opportunity to strike first! This is a unique chance.",
            "choice1_text": "Attack the sleeping dragon!",
            "choice1_success_text": "You deal a powerful blow to the beast. It awakens, howling in pain and fury!"
        },
        "dragon_combat": {
            "description": "Ignis, the Ancient Dragon, stands before you. Flames dance in its maw and its gaze promises a fiery death.",
            "choice1_text": "FIGHT THE LEGEND!"
        },
        "dragon_fin_succes": {
            "description": "The winged tyrant is defeated. Its treasure is yours, and your name will be sung by bards for centuries to come."
        },
        "dragon_fin_echec": {
            "description": "The dragon's fire was too powerful. You perished in the flames."
        },
        "tour_debut": {
            "description": "A mad wizard has erected a tower that defies the laws of physics. Stairs lead to the ceiling, corridors loop endlessly.",
            "choice1_text": "Enter the tower of madness",
            "choice1_success_text": "As soon as you enter, the door disappears. The only way is up."
        },
        "tour_epreuve1": {
            "description": "You are in a room where time flows backwards. You are getting younger and weaker.",
            "choice1_text": "Shatter the time crystal (Strength 70+)",
            "choice1_success_text": "You shatter the crystal, restoring the normal flow of time.",
            "choice1_failure_text": "You are not strong enough. Time continues to gnaw at you before the crystal overloads and explodes."
        },
        "tour_epreuve2": {
            "description": "A mechanical sphinx blocks your path. 'Answer my riddle or be erased.'",
            "choice1_text": "Attempt to answer (Intelligence 85+)",
            "choice1_success_text": "Your mind is sharper than its circuits. The sphinx, defeated, deactivates.",
            "choice1_failure_text": "Wrong answer. The sphinx attacks you with a beam of pure energy."
        },
        "tour_sommet": {
            "description": "At the top of the tower, the Mad Archmage awaits, juggling miniature stars.",
            "choice1_text": "End his madness"
        },
        "tour_fin_succes": {
            "description": "The wizard is defeated and the tower begins to stabilize. You recover his grimoires and treasures."
        },
        "tour_fin_echec": {
            "description": "The madness of the wizard and his tower got the better of you. You are expelled in an explosion of paradoxes."
        },
        "forgedieux_debut": {
            "description": "Ancient texts speak of the Mother-Forge, where the gods themselves shaped the mountains. It is said to be hidden in the heart of an elemental labyrinth.",
            "choice1_text": "Enter the labyrinth",
            "choice1_success_text": "You enter a maze of corridors where the air crackles with raw magic."
        },
        "forgedieux_epreuve_force": {
            "description": "A door of magma blocks the path. 'Prove your Strength,' is engraved in the rock.",
            "choice1_text": "Break down the door (Strength 80+ & Defense 40+)",
            "choice1_success_text": "You walk through the magma as if it were water. The first trial is a success.",
            "choice1_failure_text": "The heat is divine. It consumes you. You must find another way, which exhausts you."
        },
        "forgedieux_epreuve_intel": {
            "description": "You arrive in a room where runes float in the air. 'Prove your Mind,' whispers a voice.",
            "choice1_text": "Arrange the runes in cosmic order (Intelligence 80+)",
            "choice1_success_text": "Your knowledge of the arcane allows you to solve the runic puzzle. A passage opens.",
            "choice1_failure_text": "The runes burn your mind. You suffer a violent migraine."
        },
        "forgedieux_coeur": {
            "description": "You arrive at the heart of the Forge. A divine anvil pulses with a gentle heat. You can forge ONE legendary item.",
            "choice1_text": "Forge a Weapon",
            "choice1_success_text": "You use the forge to create a weapon of unparalleled power.",
            "choice2_text": "Forge an Armor",
            "choice2_success_text": "You shape an armor that could withstand the breath of a god."
        },
        "forgedieux_fin_succes": {
            "description": "You leave the forge with your masterpiece. Your name enters into legend."
        },
        "forgedieux_fin_echec": {
            "description": "The Forge of the Gods is not for fallible mortals. You are rejected, your mind and body broken."
        },
        "conseil_debut": {
            "description": "You are hired by the King himself. He suspects a traitor within his Shadow Council. You must unmask him at the next summit.",
            "choice1_text": "Accept the espionage mission",
            "choice1_success_text": "You receive accreditation to attend the council as a bodyguard."
        },
        "conseil_enquete": {
            "description": "The council is in session. You must find clues without drawing attention.",
            "choice1_text": "Listen to conversations (Intelligence 75+)",
            "choice1_success_text": "You spot contradictions in Duke Valerius's speech. He seems nervous.",
            "choice1_failure_text": "Everyone is speaking in code. You understand nothing.",
            "choice2_text": "Search the apartments during a break (Agility 78+)",
            "choice2_success_text": "You find a coded letter in Duke Valerius's apartments. This is the proof!",
            "choice2_failure_text": "You are almost caught by a guard. You have to turn back with nothing."
        },
        "conseil_preuves": {
            "description": "You have no solid proof. You can accuse based on your intuition or wait.",
            "choice1_text": "Accuse Duke Valerius (Luck 60+)",
            "choice1_success_text": "Your accusation makes him panic. He betrays himself by trying to flee!",
            "choice1_failure_text": "Your accusation falls flat. You are disgraced for this affront.",
            "choice2_text": "Wait for a better opportunity",
            "choice2_success_text": "You remain silent. The meeting ends without incident, but the plot continues."
        },
        "conseil_confrontation": {
            "description": "You have the proof. You confront Duke Valerius before the King.",
            "choice1_text": "The traitor tries to flee and pulls out a poisoned dagger!"
        },
        "conseil_fin_succes": {
            "description": "The traitor is arrested. The King thanks you for your loyalty and discretion. You are appointed a special agent of the crown."
        },
        "conseil_fin_moyen": {
            "description": "You couldn't unmask the traitor, but your prudence saved you from dishonor. The King pays you for your time."
        },
        "conseil_fin_echec": {
            "description": "You have failed. The traitor remains unpunished and you are banished from the kingdom."
        },
        "tombeau_singe_debut": {
            "description": "You enter the tomb of the legendary Monkey King. Statues of laughing monkeys observe you.",
            "choice1_text": "Advance into the tomb",
            "choice1_success_text": "A laughing voice resonates: 'Prove your agility, mortal!'"
        },
        "tombeau_singe_agilite": {
            "description": "The room fills with stone pillars that rise and fall at high speed.",
            "choice1_text": "Cross the room (Agility 80+)",
            "choice1_success_text": "You jump from pillar to pillar with the grace of a monkey. The laughing voice applauds.",
            "choice1_failure_text": "You are too slow. A pillar hits you and sends you into a pile of moldy bananas."
        },
        "tombeau_singe_intelligence": {
            "description": "'Now, prove your mind!' says the voice. Three chests appear: one of gold, one of silver, one of bronze. 'Only one contains my treasure, the others a bad joke.' The gold one says: 'The treasure is here.' The silver one says: 'The treasure is not here.' The bronze one says: 'The treasure is not in the gold chest.' Only one tells the truth.",
            "choice1_text": "Choose the bronze chest (Intelligence 82+)",
            "choice1_success_text": "You solved the riddle! The bronze chest contains the treasure.",
            "choice1_failure_text": "Wrong choice! The chest explodes in a shower of banana peels, making you slip."
        },
        "tombeau_singe_esprit": {
            "description": "The spirit of the Monkey King appears, impressed. 'You are clever and agile! But are you strong?'",
            "choice1_text": "Confront the spirit of the Monkey King"
        },
        "tombeau_singe_fin_succes": {
            "description": "You have beaten the Monkey King at his own game. Respectfully, he offers you his magic staff and his treasure."
        },
        "tombeau_singe_fin_echec": {
            "description": "The Monkey King was too unpredictable. He kicked you out of his tomb."
        },
        "cite_engloutie_debut": {
            "description": "With a ritual, you open a passage to the sunken city of R'lyeh. The architecture of the place defies reason and an unhealthy presence weighs on your mind.",
            "choice1_text": "Advance into madness (Health 180+)",
            "choice1_success_text": "Your life force anchors you to reality. You progress.",
            "choice1_failure_text": "The mere sight of the city overwhelms you. You lose a part of your mental and physical health."
        },
        "cite_engloutie_symboles": {
            "description": "Unholy symbols are engraved on the walls. Touching them could bring you great power, or destroy you.",
            "choice1_text": "Trace the symbols (Intelligence 70+)",
            "choice1_success_text": "You understand the essence of the symbols and absorb some of their power without sinking into madness.",
            "choice1_failure_text": "The energy of the symbols overwhelms you. It is mental agony."
        },
        "cite_engloutie_gardien": {
            "description": "A tentacled horror, a Shoggoth, materializes before you to guard the inner sanctuary.",
            "choice1_text": "Fight the unspeakable creature",
            "choice1_success_text": "You raise your weapon against a creature that should not exist."
        },
        "cite_engloutie_fin_succes": {
            "description": "You have survived R'lyeh and plundered an artifact from the sanctuary. You are rich, but perhaps no longer entirely sane."
        },
        "cite_engloutie_fin_echec": {
            "description": "Madness has caught up with you. You flee the city screaming, leaving a part of your soul behind."
        },
        "dernier_geant_debut": {
            "description": "An army of orcs threatens the kingdom. Only an ancient prophecy can save it: the awakening of the last Stone Giant.",
            "choice1_text": "Go in search of the sleeping Giant",
            "choice1_success_text": "You follow the directions on an old map to a hidden valley."
        },
        "dernier_geant_reveil": {
            "description": "You find the Giant, a sleeping mountain of stone. You must awaken it.",
            "choice1_text": "Use an ancient horn (Strength 75+)",
            "choice1_success_text": "You blow into a horn found nearby. The sound is so powerful it awakens the Giant.",
            "choice1_failure_text": "You don't have enough breath. The sound is pathetic. You need another solution.",
            "choice2_text": "Break the seals of sleep (Intelligence 75+)",
            "choice2_success_text": "You decipher the runes and break the seals. The Giant awakens."
        },
        "dernier_geant_convaincre": {
            "description": "The Giant is awake, but he refuses to intervene in the quarrels of 'the little ones'.",
            "choice1_text": "Convince him through diplomacy (Intelligence 85+)",
            "choice1_success_text": "You speak to him of honor and his ancient oath as a protector. He agrees to help.",
            "choice1_failure_text": "He does not listen to your words. He only respects strength.",
            "choice2_text": "Challenge him to a duel",
            "choice2_success_text": "'If you beat me, I will help you,' he rumbles."
        },
        "dernier_geant_epreuve": {
            "description": "The Giant's test of strength: survive one of his blows.",
            "choice1_text": "Take the hit (Defense 50+ & Health 200+)",
            "choice1_success_text": "The blow sends you flying, but you are still standing! Impressed, the Giant agrees to fight by your side.",
            "choice1_failure_text": "His blow shatters you. You are defeated."
        },
        "dernier_geant_fin_succes": {
            "description": "The Stone Giant walks by your side. The orc army is swept away. You have saved the kingdom."
        },
        "dernier_geant_fin_echec": {
            "description": "You were not up to the legend. The Giant falls back asleep, and the kingdom is in great peril."
        },
        "echiquier_dieux_debut": {
            "description": "You are transported to an astral plane before a cosmic chessboard. An entity, the Grand Strategist, invites you to play. The stake: a fraction of his knowledge.",
            "choice1_text": "Accept the game",
            "choice1_success_text": "The pieces, armies of light and shadow, move into place."
        },
        "echiquier_dieux_partie1": {
            "description": "First move: the king's gambit. Do you sacrifice a minor piece for a strategic advantage?",
            "choice1_text": "Sacrifice the pawn (Intelligence 80+)",
            "choice1_success_text": "The Strategist nods. Your sacrifice opens up the center of the board.",
            "choice1_failure_text": "Your sacrifice is in vain. The Strategist takes your piece and strengthens his position."
        },
        "echiquier_dieux_partie2": {
            "description": "Mid-game: the Strategist launches an offensive on your flank. How do you react?",
            "choice1_text": "Counter-attack in the center (Intelligence 85+)",
            "choice1_success_text": "Your counter-attack surprises him! He has to retreat. You have the advantage.",
            "choice1_failure_text": "Your defense is overwhelmed. You lose several major pieces."
        },
        "echiquier_dieux_partie3": {
            "description": "Endgame: you have the advantage. All you have to do is deliver the final blow.",
            "choice1_text": "Checkmate in three moves (Intelligence 90+)",
            "choice1_success_text": "You announce checkmate. The Strategist smiles. 'Well played, mortal.'",
            "choice1_failure_text": "You miss the opportunity! The Strategist forces a draw."
        },
        "echiquier_dieux_fin_succes": {
            "description": "You have beaten a cosmic entity at chess. You receive a part of its infinite knowledge."
        },
        "echiquier_dieux_fin_moyen": {
            "description": "The game is a draw. The Strategist, a good sport, grants you a minor reward for your skill."
        },
        "echiquier_dieux_fin_echec": {
            "description": "You were outclassed. The entity sends you back to your world, empty-headed."
        },
        "toison_or_debut": {
            "description": "You embark on a ship, the Argo II, for a legendary quest: to find the Golden Fleece.",
            "choice1_text": "Set sail into the unknown",
            "choice1_success_text": "The journey begins. The seas are dangerous."
        },
        "toison_or_sirenes": {
            "description": "You are approaching the island of the Sirens. Their song is enchanting and leads ships to their doom.",
            "choice1_text": "Plug your ears with wax (Defense 30+)",
            "choice1_success_text": "You resist the song and sail safely.",
            "choice1_failure_text": "The song penetrates your defenses. You struggle to stay on course."
        },
        "toison_or_hydre": {
            "description": "To reach the island of the Fleece, you must pass through a strait guarded by a terrible Marsh Hydra.",
            "choice1_text": "Fight the Hydra"
        },
        "toison_or_gardien": {
            "description": "You arrive on the island. The Golden Fleece is hanging from a tree, guarded by a dragon that never sleeps.",
            "choice1_text": "Put the dragon to sleep with a potion (Intelligence 75+)",
            "choice1_success_text": "You pour a powerful sleeping potion into the spring where the dragon drinks. It falls asleep.",
            "choice1_failure_text": "The potion is not strong enough. The dragon attacks you!"
        },
        "toison_or_fin_succes": {
            "description": "You seize the Golden Fleece. Its healing magic cures you and its value will make you a legend."
        },
        "toison_or_fin_echec": {
            "description": "The trials were too great. Your ship sinks, and you with it."
        },
        "foret_monde_debut": {
            "description": "The gigantic World-Forest, the source of all life, is dying. A dark corruption is spreading from its heart.",
            "choice1_text": "Venture into the heart of the forest",
            "choice1_success_text": "You enter the forest. The air is heavy with sadness and corruption."
        },
        "foret_monde_corruption": {
            "description": "The corruption assails you, trying to drain your life force.",
            "choice1_text": "Resist it (Health 220+)",
            "choice1_success_text": "Your vitality is so strong that it repels the corruption. You progress without difficulty.",
            "choice1_failure_text": "The corruption weakens you, gnawing at your body and mind."
        },
        "foret_monde_coeur": {
            "description": "At the heart of the forest, you find the source: an ancient nature spirit, a Unicorn, corrupted by a necromantic wound. It has become a nightmare creature.",
            "choice1_text": "Try to purify it (Intelligence 80+ & Luck 70+)",
            "choice1_success_text": "You use your knowledge and purity of heart to heal its wound. The corruption vanishes.",
            "choice1_failure_text": "The corruption is too deep. The creature, in its pain, attacks you."
        },
        "foret_monde_fin_succes": {
            "description": "The Unicorn is saved. In gratitude, it infuses you with a part of the World-Forest's vitality."
        },
        "foret_monde_fin_moyen": {
            "description": "You had to put the creature down to end its suffering. The forest weeps, but it will begin to heal."
        },
        "foret_monde_fin_echec": {
            "description": "The corruption has overwhelmed you. You fled before being consumed."
        },
        "tournoi_champions_debut": {
            "description": "You have been invited to the Tournament of Eternal Champions, a secret competition in an arena outside of time.",
            "choice1_text": "Accept the invitation and fight",
            "choice1_success_text": "Your first opponent is Hrothgar, the Barbarian King."
        },
        "tournoi_champions_manche2": {
            "description": "You have defeated Hrothgar. Your next opponent is Lirael, the Elven Archer whose arrows never miss their mark.",
            "choice1_text": "Fight Lirael"
        },
        "tournoi_champions_finale": {
            "description": "You are in the final. Your last opponent is Sir Gideon, the Eternal Knight, the first champion of the tournament.",
            "choice1_text": "Fight for the title of Eternal Champion"
        },
        "tournoi_champions_fin_succes": {
            "description": "You are the new Eternal Champion. Your place in legend is assured."
        },
        "tournoi_champions_fin_moyen": {
            "description": "You reached the final, an achievement in itself. You are sent back to your world with honors and a handsome reward."
        },
        "tournoi_champions_fin_echec": {
            "description": "The level was too high. You were defeated, but you learned valuable combat lessons."
        },
        "biblio_infinie_debut": {
            "description": "You are searching for the 'Book of Destiny'. It is located in the Infinite Library, a place that contains every possible book.",
            "choice1_text": "Enter the library",
            "choice1_success_text": "The shelves stretch to infinity in all directions. Where to begin?"
        },
        "biblio_infinie_chercher": {
            "description": "How do you find a single book in infinity?",
            "choice1_text": "Search by subject (Intelligence 88+)",
            "choice1_success_text": "Your logical mind allows you to navigate the conceptual structure of the library. You are getting closer.",
            "choice1_failure_text": "You are overwhelmed by the amount of information. You wander for what seems like an eternity.",
            "choice2_text": "Follow your gut (Luck 80+)",
            "choice2_success_text": "By pure coincidence, you stumble upon the right section!",
            "choice2_failure_text": "Your gut leads you completely astray."
        },
        "biblio_infinie_gardien": {
            "description": "The section is guarded by an Axiomatic Librarian. 'Silence is golden, knowledge is power. Prove you deserve this book.'",
            "choice1_text": "Ask it an unsolvable question (Intelligence 90+)",
            "choice1_success_text": "You pose a paradox that makes its circuits smoke. It deactivates, letting you pass.",
            "choice1_failure_text": "It answers your question and banishes you for your impertinence."
        },
        "biblio_infinie_fin_succes": {
            "description": "You have found the Book of Destiny. By reading it, you understand the threads that govern the world."
        },
        "biblio_infinie_fin_echec": {
            "description": "You are lost forever in the infinity of knowledge. A tragic end for an adventurer."
        },
        "forgeron_ames_debut": {
            "description": "In the depths of an infernal dungeon, a demonic blacksmith captures the souls of heroes to forge cursed weapons.",
            "choice1_text": "Descend into the dungeon",
            "choice1_success_text": "The walls are warm and screams of agony echo."
        },
        "forgeron_ames_prison": {
            "description": "You find the soul prison, crystals containing screaming spirits.",
            "choice1_text": "Shatter the crystals (Strength 75+)",
            "choice1_success_text": "You free the souls. They thank you by offering you a part of their power before they depart.",
            "choice1_failure_text": "The crystals are too strong. The noise alerts the blacksmith."
        },
        "forgeron_ames_combat": {
            "description": "The Soul Forger, a demon of metal and fire, appears. 'A new soul for my collection!'",
            "choice1_text": "Confront the demon"
        },
        "forgeron_ames_fin_succes": {
            "description": "The demon is defeated and its cursed anvil shatters. You have freed countless souls."
        },
        "forgeron_ames_fin_echec": {
            "description": "The blacksmith almost added your soul to his collection. You barely escaped."
        },
        "armee_tenebres_debut": {
            "description": "A portal to the abyss has opened on the battlefield of the Plain of Tears. An army of demons is pouring out.",
            "choice1_text": "Lead the counter-attack",
            "choice1_success_text": "You join the ranks of the defenders. Morale is low."
        },
        "armee_tenebres_bataille": {
            "description": "The Demon General leads the charge. The line of defense is about to break.",
            "choice1_text": "Rally the troops (Intelligence 70+)",
            "choice1_success_text": "Your speech galvanizes the soldiers! They hold firm and open a path for you to the general.",
            "choice1_failure_text": "Your words are lost in the chaos. You must fight your way through yourself.",
            "choice2_text": "Charge in solo (Strength 80+ & Defense 45+)",
            "choice2_success_text": "Your fury is such that you break through the demonic lines, coming face to face with the general.",
            "choice2_failure_text": "Even for you, they are too many. You are overwhelmed."
        },
        "armee_tenebres_combat": {
            "description": "You face the Demon General, a mountain of muscle and hate.",
            "choice1_text": "Fight the leader of the horde"
        },
        "armee_tenebres_fin_succes": {
            "description": "With the general defeated, the demon army, leaderless, retreats into the closing portal. You have saved the world."
        },
        "armee_tenebres_fin_echec": {
            "description": "The army of darkness was unstoppable. The world is plunged into shadow."
        },
        "breche_debut": {
            "description": "A rift of impossible colors tears the sky. Misshapen horrors emerge, consuming reality. You must seal it from the inside.",
            "choice1_text": "Plunge into the Dimensional Breach",
            "choice1_success_text": "You cross the veil of reality. The air is made of static electricity and geometry is a lie."
        },
        "breche_navigation": {
            "description": "The 'ground' is a chaos of fractured possibilities. Staying here too long is dangerous for your mind.",
            "choice1_text": "Navigate by sheer will (Defense 50+)",
            "choice1_success_text": "Your armor and your mind protect you from the assaults of this hostile reality.",
            "choice1_failure_text": "The non-Euclidean reality breaks you. You suffer mental and physical damage."
        },
        "breche_gardiens": {
            "description": "Two Dimensional Horrors, amalgams of tendrils and eyes, guard the source of the breach.",
            "choice1_text": "Fight the guardians"
        },
        "breche_sceau": {
            "description": "The source is a crystal of pure nothingness. You must channel immense energy to force it to close.",
            "choice1_text": "Attempt to seal the breach (Intelligence 100+)",
            "choice1_success_text": "You impose your will on reality. The breach closes in on itself in a flash of silence.",
            "choice1_failure_text": "The energy of the void overwhelms you. The breach widens and you are consumed."
        },
        "breche_fin_succes": {
            "description": "You are thrown back into your world just before the complete closure. You have saved reality... for now."
        },
        "breche_fin_echec": {
            "description": "You have become a part of the breach, a lost echo in the multiverse."
        },
        "corruption_debut": {
            "description": "The source of the corruption that plagues the kingdom emanates from a single source: the Black Heart of Xylos, an ancient fallen god buried beneath the capital.",
            "choice1_text": "Descend into the sacred crypts to confront it",
            "choice1_success_text": "You enter the foundations of the world, where the corruption is strongest."
        },
        "corruption_chemin": {
            "description": "The path to the heart is guarded by corrupted versions of the noblest creatures.",
            "choice1_text": "Confront a Corrupted Griffin"
        },
        "corruption_chemin": {
            "description": "The path to the heart is guarded by corrupted versions of the noblest creatures.",
            "choice1_text": "Face a Corrupted Gryphon"
        },
        "corruption_gardien": {
            "description": "The sanctuary gate is guarded by an Ancient Dragon, its mind twisted by hatred.",
            "choice1_text": "Fight the Corrupted Dragon"
        },
        "corruption_coeur": {
            "description": "You face the Heart of Corruption. It is not a creature, but a pulsating mass of pure malevolence. You cannot destroy it by force.",
            "choice1_text": "Absorb it and try to contain it (Health 300+)",
            "choice1_success_text": "You absorb the corruption. The pain is unimaginable, but your will is stronger. You become its eternal guardian.",
            "choice1_failure_text": "The corruption consumes you. You become its new avatar.",
            "choice2_text": "Purify it with your life force (Defense 60+)",
            "choice2_success_text": "You sacrifice a part of your vitality to purify the heart. You are weakened, but the kingdom is saved."
        },
        "corruption_fin_succes": {
            "description": "You have mastered the corruption. The kingdom is slowly healing. You carry a heavy burden, but you have won."
        },
        "corruption_fin_moyen": {
            "description": "The kingdom is saved, but the price was high. You may never be the same again."
        },
        "corruption_fin_echec": {
            "description": "The corruption has won. The world is doomed to rot from within."
        },
        "etoile_debut": {
            "description": "A star in the sky, 'the Augur,' has begun to pulse with a red light and grow. Astrologers predict it will consume the world within a week.",
            "choice1_text": "Travel to the Celestial Observatory",
            "choice1_success_text": "You reach the highest peak in the world, where an ancient observatory points to the heavens."
        },
        "etoile_mecanisme": {
            "description": "The observatory is an immense mechanism of lenses and gears. You understand that the star is a construct, a weapon, that has been deregulated.",
            "choice1_text": "Recalibrate the mechanism (Intelligence 110+)",
            "choice1_success_text": "Your understanding of celestial mechanics is unparalleled. You recalibrate the lenses, and the star's light turns white and stable again.",
            "choice1_failure_text": "You made a calculation error! The star's ray focuses on the observatory!"
        },
        "etoile_surcharge": {
            "description": "The observatory trembles under the impact of the energy beam. You must survive the collapse.",
            "choice1_text": "Withstand the collapse (Defense 55+)",
            "choice1_success_text": "Debris bounces off your armor. You survive, but the mechanism is destroyed. You have only delayed the end.",
            "choice1_failure_text": "The structure collapses on you. This is the end."
        },
        "etoile_fin_succes": {
            "description": "You have stabilized the Dying Star, saving the world from a fiery apocalypse. The rare metals that make up the observatory are yours."
        },
        "etoile_fin_moyen": {
            "description": "You survived, but the celestial weapon is still a threat. You have only bought time."
        },
        "etoile_fin_echec": {
            "description": "Your story ends here, buried under the ruins of ancient knowledge."
        },
        "roi_debut": {
            "description": "An ancient prophecy foretells the return of the true king, asleep in the heart of the world. The earthquakes are a sign of his imminent awakening.",
            "choice1_text": "Descend to the deepest part of the world.",
            "choice1_success_text": "You find an ancient dwarven path that goes deep into the bowels of the world."
        },
        "roi_gardiens": {
            "description": "The path is blocked by the Eternal Stone Guardians. 'Only the worthy heir to power may pass,' they rumble.",
            "choice1_text": "Prove your worth in combat"
        },
        "roi_coeur": {
            "description": "You arrive in a colossal cavern. In the center, a crystal throne where a titanic, sleeping figure sits. It is the Leviathan King.",
            "choice1_text": "Awaken him (Intelligence 90+)",
            "choice1_success_text": "You touch the throne and channel your will. The King opens his eyes. His gaze contains creation.",
            "choice1_failure_text": "The raw energy overwhelms you. The responsibility was too great. You flee."
        },
        "roi_jugement": {
            "description": "The King judges you. He probes your soul. 'You have the heart of a true protector,' his voice says in your mind. 'Take my blessing and unite this world.'",
            "choice1_text": "Accept the blessing",
            "choice1_success_text": "Unimaginable power flows into you."
        },
        "roi_fin_succes": {
            "description": "You have received the blessing of the First King. You are no longer a mere adventurer, but a living myth, a guide for generations to come."
        },
        "roi_fin_echec": {
            "description": "You were not ready. Perhaps no one was. History will remember you as the one who fled."
        },
        "silence_etoiles_debut": {
            "description": "The stars are going out one by one. The nights are getting darker. A cosmic horror is at work.",
            "choice1_text": "Seek answers in an astral observatory",
            "choice1_success_text": "You use an ancient portal to travel to an observatory floating in the void."
        },
        "silence_etoiles_revelation": {
            "description": "The telescopes reveal the truth: a colossal entity, a 'Star Devourer,' is feeding on the light of suns.",
            "choice1_text": "It is impossible to fight it. What to do?",
            "choice1_success_text": "Your only chance is to find a way to put it to sleep or lure it elsewhere."
        },
        "silence_etoiles_choix": {
            "description": "You have two options: use the observatory's signal to broadcast a hyperspatial 'lullaby,' or create a bait by exploding a nearby nebula.",
            "choice1_text": "Compose the lullaby (Intelligence 120+)",
            "choice1_success_text": "You compose a melody of pure tranquility. The Devourer, soothed, falls asleep for a millennium.",
            "choice1_failure_text": "Your melody is off-key. It irritates the creature, which devours three more stars out of spite.",
            "choice2_text": "Create the bait (Luck 100+)",
            "choice2_success_text": "The chain reaction you cause creates an irresistible beacon of energy. The Devourer leaves, leaving your galaxy in peace.",
            "choice2_failure_text": "The explosion is a failure. You have only drawn its attention to you."
        },
        "silence_etoiles_fin_succes": {
            "description": "You have saved the night sky. The stars shine again, and cosmic fragments rain down in thanks."
        },
        "silence_etoiles_fin_echec": {
            "description": "Your intervention has made things worse. The darkness is gaining ground."
        },
        "tuer_dieu_debut": {
            "description": "The fallen god Malakor, the last of his pantheon, threatens to devour the sun. You are the only one who can reach him in his celestial sanctuary.",
            "choice1_text": "Accept the burden of the god slayer",
            "choice1_success_text": "You prepare for the most important fight of your existence."
        },
        "tuer_dieu_ascension": {
            "description": "To reach the sanctuary, you must cross the Dawn Bridge, guarded by his loyal Archangel.",
            "choice1_text": "Convince the Archangel (Intelligence 100+)",
            "choice1_success_text": "Your words are so true that the Archangel doubts and lets you pass.",
            "choice1_failure_text": "Your words are in vain. You must fight him.",
            "choice2_text": "Force your way through",
            "choice2_success_text": "Diplomacy is not an option."
        },
        "tuer_dieu_combat": {
            "description": "You are facing Malakor. His size eclipses mountains, his gaze burns with a black light.",
            "choice1_text": "END THE DIVINITY."
        },
        "tuer_dieu_fin_succes": {
            "description": "The god is dead. The sun is saved. You have accomplished the impossible. You are no longer a hero; you are a legend etched into reality."
        },
        "tuer_dieu_fin_echec": {
            "description": "One does not kill a god with impunity. Your body and soul are erased from existence."
        },
        "reflet_brise_debut": {
            "description": "People report seeing 'doubles' of themselves committing crimes. A mirror world, a dark version of yours, is merging with reality.",
            "choice1_text": "Cross through the mirror",
            "choice1_success_text": "You find a puddle of water that doesn't reflect the sky. You dive in."
        },
        "reflet_brise_monde_sombre": {
            "description": "You are in a twisted version of your world. In the distance, you see your own double, an evil version of yourself, who seems to be the king of this realm.",
            "choice1_text": "Confront him",
            "choice1_success_text": "There's only room for one of us."
        },
        "reflet_brise_combat": {
            "description": "Your double smiles at you. 'You are weak. You have pity. I will show you your true strength.'",
            "choice1_text": "Fight your own reflection",
            "choice2_text": "Attempt to merge (Intelligence 110+)",
            "choice2_success_text": "You realize he is not your enemy, but a part of you. You accept your shadow self and merge, becoming a complete and much more powerful being.",
            "choice2_failure_text": "Your double refuses. 'I am the only one who should exist!'"
        },
        "reflet_brise_fin_succes": {
            "description": "You have destroyed your double. The mirror world fades and reality is safe. But a part of you died today."
        },
        "reflet_brise_fin_fusion": {
            "description": "You have become a transcendent being. You are no longer good, nor evil, but whole. The world is yours."
        },
        "reflet_brise_fin_echec": {
            "description": "Your double was stronger, more ruthless. He erased you and took your place. No one will ever know the truth."
        },
        "melodie_creation_debut": {
            "description": "Silence has fallen upon the world. The background music of reality, the 'Melody of Creation,' has stopped. Things are beginning to unravel.",
            "choice1_text": "Go on a quest for the lost notes",
            "choice1_success_text": "You must visit the Elemental Planes to find the three primordial notes."
        },
        "melodie_creation_note_terre": {
            "description": "In the heart of the Plane of Earth, the note is guarded by a Crystal Titan. He will give it to you if you can bear the weight of the world on your shoulders.",
            "choice1_text": "Bear the weight (Strength 110+ & Defense 55+)",
            "choice1_success_text": "You hold firm. The Titan, impressed, offers you the 'Note of Stability'."
        },
        "melodie_creation_note_eau": {
            "description": "In the Ocean of Dreams, the note is hidden in a singing shell. You must reach it without getting lost in the illusions.",
            "choice1_text": "Navigate by intuition (Luck 110+)",
            "choice1_success_text": "Your luck guides you through the fog of illusions. You find the 'Note of Change'."
        },
        "melodie_creation_note_feu": {
            "description": "In the Eternal Blaze, the note is at the heart of the Immortal Phoenix. It will only give it to you if you survive its purifying flame.",
            "choice1_text": "Endure the flame (Health 250+)",
            "choice1_success_text": "You walk through the fire and emerge unscathed. The Phoenix offers you the 'Note of Passion'."
        },
        "melodie_creation_finale": {
            "description": "You have the three notes. At the top of the world, you play them in the correct order.",
            "choice1_text": "Play the Melody (Intelligence 115+)",
            "choice1_success_text": "The music returns. Reality knits itself back together, stronger than before.",
            "choice1_failure_text": "You play a wrong note. The cacophony tears reality apart."
        },
        "melodie_creation_fin_succes": {
            "description": "You have become the world's new composer. The universe sings your name."
        },
        "melodie_creation_fin_echec": {
            "description": "The silence is now eternal. The world slowly fades away."
        },
        "roue_temps_debut": {
            "description": "You realize that your world is trapped in an endless cycle of destruction and rebirth. To free it, you must reach the center of the Wheel of Time.",
            "choice1_text": "Attempt to break the cycle",
            "choice1_success_text": "You meditate to find the path to the hub of time."
        },
        "roue_temps_gardien": {
            "description": "The Guardian of the Cycle, a serpent biting its own tail, blocks your path. 'The cycle is the only thing that prevents chaos,' it says.",
            "choice1_text": "Convince it that free will is necessary (Intelligence 125+)",
            "choice1_success_text": "Your arguments are so powerful that even an eternal being doubts. It lets you pass.",
            "choice1_failure_text": "It only sees the necessity of the cycle. You must fight it."
        },
        "roue_temps_coeur": {
            "description": "You are at the center of the Wheel. You can either break it to free the world, or take control of the cycle.",
            "choice1_text": "Break the Wheel (Strength 120+)",
            "choice1_success_text": "With a force that transcends physics, you shatter the Wheel. The future is now uncertain, but free.",
            "choice2_text": "Become the new Guardian",
            "choice2_success_text": "You take the guardian's place, condemned to oversee the cycle for eternity, but guiding it with wisdom."
        },
        "roue_temps_fin_succes": {
            "description": "You have given the gift of free will to the world. No one knows what the future holds, but it will be theirs."
        },
        "roue_temps_fin_moyen": {
            "description": "You have become a silent god, a guardian. You have saved the world from its repetition, but you have sacrificed your own freedom."
        },
        "roue_temps_fin_echec": {
            "description": "You were not strong enough to change fate. The cycle resets, and you are erased."
        },
        "jardin_hephaistos_debut": {
            "description": "You have found the entrance to the Garden of Hephaestus, the blacksmith god. Here, all the fauna and flora are automatons of bronze, silver, and gold.",
            "choice1_text": "Explore the mechanical garden",
            "choice1_success_text": "Bronze birds sing melodies of metal. Golden flowers follow your path."
        },
        "jardin_hephaistos_faune": {
            "description": "A herd of mechanical silver stags charges you, their antlers as sharp as spears.",
            "choice1_text": "Dismantle them (Strength 100+)",
            "choice1_success_text": "Your strength is such that you tear them to pieces. You collect an incredible amount of metal.",
            "choice1_failure_text": "They are too strong and coordinated. They gore and trample you."
        },
        "jardin_hephaistos_gardien": {
            "description": "The center of the garden is guarded by Talos, a bronze colossus forged by the god himself.",
            "choice1_text": "Find its weak point (Intelligence 100+)",
            "choice1_success_text": "You notice a loosely screwed plate on its heel. A well-placed blow will disable it.",
            "choice2_text": "Face it head-on",
            "choice2_success_text": "You charge the bronze colossus."
        },
        "jardin_hephaistos_combat": {
            "description": "You aim for Talos's heel!",
            "choice1_text": "Strike the weak point (Agility 100+)",
            "choice1_success_text": "Your blow is precise! The colossus collapses, deactivated.",
            "choice1_failure_text": "You miss your target! Talos strikes you with his giant sword."
        },
        "jardin_hephaistos_fin_succes": {
            "description": "The garden is yours. You leave with treasures of divine metal that will make you the greatest craftsman in the world."
        },
        "jardin_hephaistos_fin_echec": {
            "description": "The creations of a god are beyond your strength. You have been defeated."
        },
        "encre_destin_debut": {
            "description": "You are searching for the Scriptorium where the fate of every being is written. You want to add your own chapter.",
            "choice1_text": "Seek the Scriptorium outside of time",
            "choice1_success_text": "After a long quest, you find the invisible door."
        },
        "encre_destin_livre": {
            "description": "You find your book, open to today's page. The quill and ink of destiny are beside it.",
            "choice1_text": "Read your destiny (Intelligence 100+)",
            "choice1_success_text": "You read your end... and find it disappointing. You are now even more determined to change it.",
            "choice1_failure_text": "The knowledge of your own end is too heavy a burden. Your mind is broken.",
            "choice2_text": "Write without reading",
            "choice2_success_text": "Ignorance is a strength. You take the quill, ready to write an unknown future."
        },
        "encre_destin_ecrire": {
            "description": "What do you want to write?",
            "choice1_text": "Write '...and he became immensely rich.' (Luck 120+)",
            "choice1_success_text": "The ink dries. Back in the world, you find treasures wherever you go.",
            "choice2_text": "Write '...and he brought peace to the world.' (Health 300+)",
            "choice2_success_text": "The burden of world peace weighs on your shoulders. You achieve it, at the cost of your own happiness.",
            "choice3_text": "Write '...and he became free.'",
            "choice3_success_text": "You break free from the chains of destiny. You will never be guided again, but you will never receive help either."
        },
        "encre_destin_fin_succes": {
            "description": "Your destiny is now your own. You have transcended your condition as a mere adventurer."
        },
        "encre_destin_fin_echec": {
            "description": "One does not play with fate. Your attempt backfired in the worst possible way."
        },
        "proces_asmodeus_debut": {
            "description": "You are summoned by an unknown power. You awaken in hell, in a courtroom. Asmodeus, the devil, is the prosecutor. Humanity is the accused. And you are its lawyer.",
            "choice1_text": "Agree to defend humanity",
            "choice1_success_text": "The trial begins. The fate of all mortal souls is at stake."
        },
        "proces_asmodeus_temoin1": {
            "description": "First witness for the prosecution: Cain, the first murderer. 'Humanity was born in violence,' he accuses.",
            "choice1_text": "Cross-examine (Intelligence 110+)",
            "choice1_success_text": "You argue that the first act was choice, not violence. Redemption is always possible. The jury is moved.",
            "choice1_failure_text": "Your arguments are weak. The jury is convinced of man's violent nature."
        },
        "proces_asmodeus_temoin2": {
            "description": "Second witness: Judas. 'Humanity is greedy and treacherous.'",
            "choice1_text": "Present counter-evidence (Luck 110+)",
            "choice1_success_text": "You summon the soul of an anonymous hero who sacrificed himself for others. The act of bravery overshadows Judas's betrayal.",
            "choice1_failure_text": "You cannot find a soul pure enough to testify. The accusation of greed stands."
        },
        "proces_asmodeus_verdict": {
            "description": "This is your closing statement.",
            "choice1_text": "Appeal to love and potential (Intelligence 130+)",
            "choice1_success_text": "'Humanity is not perfect, but its potential for good is infinite!' Your speech is so powerful that the flames of hell flicker.",
            "choice1_failure_text": "Your plea lacks conviction. The jury returns its verdict: Guilty."
        },
        "proces_asmodeus_fin_succes": {
            "description": "You have won. Humanity is acquitted. Asmodeus, furious but a good sport, sends you back with a divine reward."
        },
        "proces_asmodeus_fin_echec": {
            "description": "Humanity is condemned. All souls now belong to Asmodeus. Including yours."
        },
        "trone_vide_debut": {
            "description": "The Creator's Throne is empty. The universe, without a guide, begins to fall apart. A new ruler is needed.",
            "choice1_text": "Ascend to the Celestial Kingdom",
            "choice1_success_text": "You cross the astral plane to reach the Silver City."
        },
        "trone_vide_epreuves": {
            "description": "To reach the throne, you must pass the trials of the four remaining Archangels.",
            "choice1_text": "Pass Gabriel's Trial of Strength (Strength 120+)",
            "choice1_success_text": "You succeed. 'Your strength is worthy,' says Gabriel.",
            "choice2_text": "Pass Raphael's Trial of Wisdom (Intelligence 120+)",
            "choice2_success_text": "You succeed. 'Your mind is worthy,' says Raphael."
        },
        "trone_vide_epreuves2": {
            "description": "You have passed the first trial. Which one now?",
            "choice1_text": "Pass Michael's Trial of Speed (Agility 120+)",
            "choice1_success_text": "You succeed. 'Your swiftness is worthy,' says Michael.",
            "choice2_text": "Pass Uriel's Trial of Endurance (Health 300+)",
            "choice2_success_text": "You succeed. 'Your vitality is worthy,' says Uriel."
        },
        "trone_vide_trone": {
            "description": "You have passed the trials. The Throne is before you. It is yours.",
            "choice1_text": "Ascend the Throne and become the new Creator",
            "choice1_success_text": "You sit down. The entire universe opens up to your consciousness. You are no longer mortal.",
            "choice2_text": "Refuse the power and leave the universe to its fate",
            "choice2_success_text": "This burden is too great. You leave."
        },
        "trone_vide_fin_succes": {
            "description": "You are the new God. Your first decision is to reward yourself for your past efforts."
        },
        "trone_vide_fin_echec": {
            "description": "You refused power, and the cosmos collapses into chaos."
        },
        "commencement_fin_debut": {
            "description": "It's not a monster. It's not a god. It is the Void, the Nothingness that existed before creation, come to claim its due. It is consuming reality.",
            "choice1_text": "Run. It's the only option.",
            "choice1_success_text": "Fleeing will not be easy. You must reach a pocket dimension before everything disappears."
        },
        "commencement_fin_course": {
            "description": "The ground behind you disintegrates. Memories of things that never existed assault your mind.",
            "choice1_text": "Sprint through fading reality (Agility 110+)",
            "choice1_success_text": "You run faster than the end of the world.",
            "choice1_failure_text": "You stumble on a paradox. The void is nipping at your heels."
        },
        "commencement_fin_porte": {
            "description": "You see the sanctuary door, but it's unstable. You must hold it open long enough to get through.",
            "choice1_text": "Hold the door (Strength 110+ & Defense 60+)",
            "choice1_success_text": "You use all your strength to hold the door open and slip through just before it shatters.",
            "choice1_failure_text": "The pressure of the void is too strong. The door shatters on you."
        },
        "commencement_fin_succes": {
            "description": "You are safe in the sanctuary, a small pocket universe. You are the last survivor of your reality. But you are alive."
        },
        "commencement_fin_echec": {
            "description": "The Void has caught up with you. You no longer exist. You never existed."
        },
    },
    },
    "affixes": {
        "arme": {
            "sangsue": "Leeching",
            "feroce": "Fierce",
            "ethere": "Ethereal",
            "perforant": "Piercing",
            "de_commotion": "of Concussion",
            "du_conquerant": "of the Conqueror"
        },
        "tete": {
            "du_sage": "of the Sage",
            "de_laigle": "of the Eagle",
            "du_penseur": "of the Thinker",
            "de_clairvoyance": "of Clairvoyance",
            "dimpassibilite": "of Impassiveness",
            "de_concentration": "of Concentration"
        },
        "torse": {
            "du_rempart": "of the Bulwark",
            "du_colosse": "of the Colossus",
            "de_vitalite": "of Vitality",
            "depines": "of Thorns",
            "du_survivant": "of the Survivor",
            "beni": "Blessed"
        },
        "jambes": {
            "dacier": "of Steel",
            "de_vitesse": "of Speed",
            "du_rempart": "of the Bulwark",
            "dancrage": "of Anchoring",
            "du_sprinteur": "of the Sprinter",
            "robuste": "Sturdy"
        },
        "pieds": {
            "de_celerite": "of Celerity",
            "plaquees": "Plated",
            "du_rempart": "of the Bulwark",
            "legeres": "Light",
            "dexplorateur": "of the Explorer",
            "inebranlables": "Unwavering"
        },
        "mains": {
            "de_frappe": "of Striking",
            "dadresse": "of Dexterity",
            "du_rempart": "of the Bulwark",
            "du_pillard": "of the Pillager",
            "precis": "Precise",
            "poignes_de_fer": "Iron Grips"
        },
        "accessoire": {
            "de_fortune": "of Fortune",
            "de_puissance": "of Power",
            "dharmonie": "of Harmony",
            "du_fermier": "of the Farmer",
            "du_phenix": "of the Phoenix",
            "de_lerudit": "of the Scholar",
            "du_gardien": "of the Guardian",
            "mortel": "Deadly"
        }
    },
    "dungeon": {
        "modifiers": {
            "horde_enragee": {
                "name": "Enraged Horde",
                "description": "Enemies have +25% Strength."
            },
            "carapace_dense": {
                "name": "Dense Carapace",
                "description": "Enemies have +20% Defense."
            },
            "vitalite_anormale": {
                "name": "Abnormal Vitality",
                "description": "Enemies have +30% Health."
            },
            "saignement_maudit": {
                "name": "Cursed Bleed",
                "description": "Enemies have a 20% chance to cause bleeding."
            },
            "aura_vampirique": {
                "name": "Vampiric Aura",
                "description": "Enemies have 5% life steal."
            }
        },
        "events": {
            "tresor_simple": {
                "name": "Simple Treasure",
                "description": "You find an unlocked wooden chest. Inside, a small reward awaits you!"
            },
            "fontaine_de_vie": {
                "name": "Fountain of Life",
                "description": "A fountain of clear, glowing water. Drinking from it might reinvigorate you."
            },
            "piege_a_flechettes": {
                "name": "Dart Trap",
                "description": "You step on an unstable tile! Darts shoot out from the walls."
            },
            "coffre_verrouille": {
                "name": "Locked Chest",
                "description": "A solid, well-locked chest sits in the center of the room.",
                "choice1_text": "Pick the lock (Agility)",
                "choice2_text": "Force it open (Strength)",
                "success_text": "The chest gives way! You find a much more substantial loot.",
                "failure_text": "Your attempt fails. The chest's mechanism locks permanently."
            },
            "fontaine_de_mana": {
                "name": "Fountain of Mana",
                "description": "A source of pure blue energy gently ripples. It seems it can restore your mana."
            },
            "autel_etrange": {
                "name": "Strange Altar",
                "description": "A stone altar covered in runes offers you a pact: a sacrifice for temporary power.",
                "choice1_text": "Sacrifice 15% of your max HP",
                "choice1_success_text": "The altar accepts your sacrifice and grants you a blessing of power!",
                "choice2_text": "Ignore the altar",
                "choice2_success_text": "You ignore the altar and continue on your way."
            },
            "aventurier_mourant": {
                "name": "Dying Adventurer",
                "description": "You find a critically injured adventurer. He hands you a potion. 'Take it... don't waste it...'"
            },
            "autel_de_sacrifice_intelligent": {
                "name": "Intelligent Sacrificial Altar",
                "description": "An ancient altar offers you a choice: sacrifice a portion of your vitality to restore your spirit.",
                "choice1_text": "Sacrifice 10% of your HP for 100 Mana",
                "choice2_text": "Ignore the altar",
                "success_text": "The altar accepts your sacrifice. You feel your magical energy returning."
            },
            "carte_du_donjon": {
                "name": "A Forgotten Map",
                "description": "On the body of an unlucky adventurer, you find a detailed map. It reveals the complete layout of the next 3 floors!"
            },
            "embuscade": {
                "name": "Ambush!",
                "description": "It was a trap! Monsters emerge from the shadows!"
            }
        },
        "lore_messages": [
            "Ancient runes glow faintly on the walls before fading.",
            "A crack in the ceiling lets in a pale light from an unknown source.",
            "The floor is covered with a fine layer of dust that seems undisturbed for centuries.",
            "Rusted chains hang from the ceiling, swinging gently.",
            "The shadows in this room seem to dance and twist when you're not looking directly at them.",
            "A strange mural depicts a forgotten battle between celestial and demonic creatures.",
            "The floor is unusually smooth and cold under your feet, like polished glass.",
            "Dull crystals are embedded in the walls, absorbing the light from your torch.",
            "A complex arcane symbol is carved in the center of the room, its power long dissipated.",
            "Statues of unknown warriors stand guard, their faces eroded by time.",
            "The oppressive silence is broken only by the dripping of water in a dark corner.",
            "A distant echo of dragging chains chills your blood for a moment.",
            "You hear an incomprehensible whisper that fades just as you strain to listen.",
            "The wind howls through an unseen passage, creating a mournful wail.",
            "A loud crack echoes from above, but nothing falls.",
            "The only sound is your own breathing, strangely loud in the silence.",
            "A smell of damp earth and decay hangs heavily in the air.",
            "A sudden, cold draft runs down your spine.",
            "The air is charged with stagnant magical energy, like electricity before a storm.",
            "A blast of heat surprises you, coming from a crack in the floor.",
            "The air is so dry and stale that it irritates your throat.",
            "The skeleton of an unlucky adventurer lies in a corner, a dagger still clutched in its bony hand.",
            "A torn backpack has been abandoned here, its contents looted long ago.",
            "Deep claw marks scar the stone walls, evidence of a fierce battle.",
            "A long-extinguished campfire is in the center of the room.",
            "You step on a broken arrow. Someone fought here.",
            "The message 'Flee!' is clumsily carved on the floor with what looks like dried blood.",
            "A single, strangely shiny gold coin lies on the ground. You dare not touch it.",
            "A small phosphorescent flower has managed to grow between two tiles, creating a tiny oasis of light.",
            "This room feels strangely cleaner and safer than the previous ones.",
            "A small spring of clear water flows from a wall. It doesn't seem magical, just refreshing.",
            "The structure of this room is remarkably intact, as if protected."
        ]
    },
    "succes": {
        "categories": {
            "progression": "Progression",
            "classes": "Classes",
            "combat": "Combat",
            "artisanat": "Crafting",
            "economie": "Economy",
            "defis": "Challenges",
            "constellation": "Constellation"
        },
        "debut_aventure": {
            "name": "The Beginning of the Adventure",
            "description": "Successfully complete expeditions.",
            "tier1_name": "First Steps",
            "tier2_name": "Novice Adventurer",
            "tier3_name": "Seasoned Explorer",
            "tier4_name": "Master of Travel"
        },
        "breche_instable": {
            "name": "Rift Explorer",
            "description": "Reach high floors in the Unstable Rift.",
            "tier1_name": "The Dive",
            "tier2_name": "Spelunker",
            "tier3_name": "Master of the Depths",
            "tier4_name": "Legend of the Void"
        },
        "maitre_guerrier": {
            "name": "Warrior Mastery",
            "description": "Reach high level milestones with the Warrior class.",
            "tier1_name": "Veteran Warrior",
            "tier2_name": "Warrior Legend",
            "tier3_name": "God of War"
        },
        "maitre_archer": {
            "name": "Archer Mastery",
            "description": "Reach high level milestones with the Archer class.",
            "tier1_name": "Veteran Archer",
            "tier2_name": "Archer Legend",
            "tier3_name": "Celestial Eye"
        },
        "maitre_mage": {
            "name": "Mage Mastery",
            "description": "Reach high level milestones with the Mage class.",
            "tier1_name": "Veteran Mage",
            "tier2_name": "Mage Legend",
            "tier3_name": "Arcane Archon"
        },
        "exterminateur": {
            "name": "Exterminator",
            "description": "Kill a large number of enemies.",
            "tier1_name": "Exterminator I",
            "tier2_name": "Exterminator II",
            "tier3_name": "Exterminator III",
            "tier4_name": "Exterminator IV"
        },
        "tueur_de_boss": {
            "name": "Giant Slayer",
            "description": "Defeat bosses.",
            "tier1_name": "Giant Slayer I",
            "tier2_name": "Giant Slayer II",
            "tier3_name": "Giant Slayer III",
            "tier4_name": "Giant Slayer IV"
        },
        "maitre_artisan": {
            "name": "Master Craftsman",
            "description": "Craft items at the forge.",
            "tier1_name": "Craftsman I",
            "tier2_name": "Craftsman II",
            "tier3_name": "Craftsman III"
        },
        "enchanteur_neophyte": {
            "name": "Neophyte Enchanter",
            "description": "Enchant items.",
            "tier1_name": "Enchanter I",
            "tier2_name": "Enchanter II",
            "tier3_name": "Enchanter III"
        },
        "roi_du_fragment": {
            "name": "Fragment King",
            "description": "Accumulate fragments.",
            "tier1_name": "Fragment King I",
            "tier2_name": "Fragment King II",
            "tier3_name": "Fragment King III"
        },
        "maitre_recycleur": {
            "name": "Master Recycler",
            "description": "Recycle items to extract fragments.",
            "tier1_name": "Recycler I",
            "tier2_name": "Recycler II",
            "tier3_name": "Recycler III"
        },
        "mort_et_re_mort": {
            "name": "Death Becomes You",
            "description": "Die in combat.",
            "tier1_name": "First... Stumbling Steps",
            "tier2_name": "Cemetery Regular",
            "tier3_name": "The Reaper's Favorite Customer",
            "tier4_name": "Immortal... Almost"
        },
        "au_bord_du_gouffre": {
            "name": "On the Edge",
            "description": "Win a fight with less than 10% of your HP remaining.",
            "tier1_name": "On the Edge"
        },
        "collectionneur_ensemble": {
            "name": "Set Collector",
            "description": "Equip a full set of items.",
            "tier1_name": "Epic Set",
            "tier2_name": "Legendary Set",
            "tier3_name": "Mythic Set"
        },
        "ascension_niveau": {
            "name": "Eternal Cycle",
            "description": "Reach new Ascension levels.",
            "tier1_name": "Transcendence",
            "tier2_name": "Star Pilgrim",
            "tier3_name": "Plane Walker",
            "tier4_name": "Cosmic Entity"
        },
        "constellation_destin": {
            "name": "Master of Fate",
            "description": "Unlock all talents in the Destiny Constellation tree.",
            "tier1_name": "Master of Fate"
        },
        "constellation_guerrier": {
            "name": "Avatar of War",
            "description": "Unlock all talents in the Warrior Constellation tree.",
            "tier1_name": "Avatar of War"
        },
        "constellation_archer": {
            "name": "Celestial Eye",
            "description": "Unlock all talents in the Archer Constellation tree.",
            "tier1_name": "Celestial Eye"
        },
        "constellation_mage": {
            "name": "Arcane Archon",
            "description": "Unlock all talents in the Mage Constellation tree.",
            "tier1_name": "Arcane Archon"
        },
        "maitre_des_etoiles": {
            "name": "Master of the Stars",
            "description": "Unlock ALL talents from ALL constellations.",
            "tier1_name": "Master of the Stars"
        }
    },
    "constellations": {
        "destiny": {
            "name": "Constellation of Destiny",
            "nodes": {
                "destiny_start": {
                    "name": "Spark of Destiny",
                    "description": "The starting point of all your future Ascensions. Every point spent here benefits all your characters."
                },
                "destiny_all_stats_1": {
                    "name": "Awakening of Potential",
                    "description": "Slightly increases all your base attributes."
                },
                "destiny_hp_mana_1": {
                    "name": "Vital Flux",
                    "description": "Increases your base maximum health and mana."
                },
                "destiny_resource_1": {
                    "name": "Horn of Plenty",
                    "description": "Increases all base resource gains (wood, metal, cloth)."
                },
                "destiny_fragments_1": {
                    "name": "Poor Man's Alchemy",
                    "description": "Increases your Fragment gains from all sources."
                },
                "destiny_loot_1": {
                    "name": "Scraps of Fortune",
                    "description": "Increases the item discovery bonus."
                },
                "destiny_event_luck_1": {
                    "name": "Winged Steed",
                    "description": "Your lucky star guides you, increasing your chances of success in choice-based events."
                },
                "destiny_legendary_knowledge": {
                    "name": "Legendary Knowledge",
                    "description": "Allows you to find, craft, and equip items of Legendary rarity."
                },
                "destiny_merchant_1": {
                    "name": "Bargain Hunter",
                    "description": "Improves selling prices at merchants."
                },
                "destiny_mythic_knowledge": {
                    "name": "Mythic Knowledge",
                    "description": "Allows you to find, craft, and equip items of Mythic rarity."
                },
                "destiny_resource_2": {
                    "name": "Nature's Abundance",
                    "description": "Further increases base resource gains."
                },
                "destiny_free_craft_1": {
                    "name": "Deft Hands",
                    "description": "You have a small chance not to consume resources when crafting an item."
                },
                "destiny_merchant_2": {
                    "name": "Merchant's Guild",
                    "description": "Your reputation precedes you, further improving selling prices."
                },
                "destiny_epic_knowledge": {
                    "name": "Epic Knowledge",
                    "description": "Allows you to find, craft, and equip items of Epic rarity."
                },
                "destiny_hp_1": {
                    "name": "Increased Endurance",
                    "description": "Increases your base maximum health."
                },
                "destiny_def_1": {
                    "name": "Stone Skin",
                    "description": "Adds base Defense."
                },
                "destiny_resistance_1": {
                    "name": "Iron Will",
                    "description": "Increases your resistance to all damage types."
                },
                "destiny_regen_1": {
                    "name": "Vital Regeneration",
                    "description": "Increases your out-of-combat HP regeneration."
                },
                "destiny_indomitable": {
                    "name": "Indomitable",
                    "description": "Once per combat, if you take a hit that should kill you, you survive with 1 HP."
                },
                "destiny_xp_1": {
                    "name": "Hasty Wisdom",
                    "description": "Increases all XP gains."
                },
                "destiny_codex_1": {
                    "name": "Combat Scholar",
                    "description": "Speeds up your Codex progression by increasing the number of 'kills' counted."
                },
                "destiny_stat_points_1": {
                    "name": "Unleashed Potential",
                    "description": "Grants additional stat points every 25 levels."
                },
                "destiny_crit_1": {
                    "name": "Surgical Precision",
                    "description": "Increases your critical strike chance."
                },
                "destiny_crit_damage_1": {
                    "name": "Devastating Strikes",
                    "description": "Increases your critical strike damage."
                },
                "destiny_ascension_mastery": {
                    "name": "Ascension Mastery",
                    "description": "Increases the number of Constellation Points earned with each Ascension."
                },
                "destiny_true_potential": {
                    "name": "True Potential",
                    "description": "Unlocks the true potential of your lineage, granting a massive bonus to all attributes."
                },
                "destiny_xp_2": {
                    "name": "Ancestral Knowledge",
                    "description": "Further increases all XP gains."
                },
                "destiny_patrol_1": {
                    "name": "Watcher's Eye",
                    "description": "Your patrols are more effective, yielding more rewards."
                },
                "destiny_crit_damage_2": {
                    "name": "Masterstroke",
                    "description": "Further increases your critical strike damage."
                },
                "destiny_ascension_mastery_2": {
                    "name": "Celestial Heritage",
                    "description": "Further increases the number of Constellation Points earned with each Ascension."
                }
            }
        },
        "guerrier": {
            "name": "Warrior Constellation",
            "nodes": {
                "guerrier_start": {
                    "name": "Hero's Pommel",
                    "description": "The beginning of the warrior's path."
                },
                "guerrier_force_1": {
                    "name": "Iron Grip",
                    "description": "Increases your base Strength."
                },
                "guerrier_vie_1": {
                    "name": "Iron Constitution",
                    "description": "Increases your maximum vitality."
                },
                "guerrier_force_vie_1": {
                    "name": "Fighter's Foundations",
                    "description": "Increases Strength and Health."
                },
                "guerrier_garde_base": {
                    "name": "Combat Stance",
                    "description": "The starting point for defensive and utility techniques."
                },
                "guerrier_resistance_1": {
                    "name": "Toughened Skin",
                    "description": "Increases your resistance to all damage types."
                },
                "guerrier_cri_1": {
                    "name": "Intimidating Shout",
                    "description": "Your hits have a chance to break the enemy's armor."
                },
                "guerrier_def_1": {
                    "name": "Shield Mastery",
                    "description": "Improves your base Defense."
                },
                "guerrier_regen_1": {
                    "name": "Second Wind",
                    "description": "Improves your out-of-combat HP regeneration."
                },
                "guerrier_degats_1": {
                    "name": "Battle Fury",
                    "description": "Increases all your damage dealt."
                },
                "guerrier_crit_chance_1": {
                    "name": "Weak Point",
                    "description": "Increases your critical strike chance."
                },
                "guerrier_crit_damage_1": {
                    "name": "Brutal Strike",
                    "description": "Increases your critical strike damage."
                },
                "guerrier_lifesteal_1": {
                    "name": "Bloodthirst",
                    "description": "Heals you for a percentage of the damage you deal."
                },
                "guerrier_berserker_keystone": {
                    "name": "On Death's Door",
                    "description": "Your Strength is increased by 50% when your HP is below 30%."
                },
                "guerrier_stun_chance_1": {
                    "name": "Heavy Impact",
                    "description": "Increases your chance to stun enemies."
                },
                "guerrier_def_vie_1": {
                    "name": "Living Bastion",
                    "description": "Increases Defense and Health."
                },
                "guerrier_thorns_1": {
                    "name": "Armor of Thorns",
                    "description": "Deals fixed damage to enemies who attack you."
                },
                "guerrier_juggernaut_keystone": {
                    "name": "Unstoppable",
                    "description": "You become immune to stuns."
                },
                "guerrier_force_2": {
                    "name": "Raw Power",
                    "description": "A significant increase to your Strength."
                },
                "guerrier_force_percent_1": {
                    "name": "Colossal Strength",
                    "description": "Increases your total Strength by a percentage."
                },
                "guerrier_ultime": {
                    "name": "Avatar of War",
                    "description": "Your mastery of combat reaches its peak, increasing all your attributes."
                }
            }
        },
        "archer": {
            "name": "Archer Constellation",
            "nodes": {
                "archer_start": {
                    "name": "Archer's Grip",
                    "description": "The starting point of the archer's path."
                },
                "archer_agilite_1": {
                    "name": "Woven String",
                    "description": "Increases your base Agility."
                },
                "archer_crit_chance_1": {
                    "name": "Keen Eye",
                    "description": "Increases your critical strike chance."
                },
                "archer_skill_damage_1": {
                    "name": "Instinctive Shot",
                    "description": "Increases the base damage of all your archer skills."
                },
                "archer_precision_1": {
                    "name": "Calibrated Aim",
                    "description": "Further increases your critical strike chance."
                },
                "archer_armor_shred_1": {
                    "name": "Guardbreaker Arrow",
                    "description": "Your shots ignore a larger portion of enemy armor."
                },
                "archer_crit_damage_1": {
                    "name": "Vital Point",
                    "description": "Massively increases your critical strike damage."
                },
                "archer_sniper_keystone": {
                    "name": "Eagle Eye",
                    "description": "Your critical strikes have a 30% chance to instantly execute non-boss enemies with less than 20% of their HP."
                },
                "archer_vitesse_1": {
                    "name": "Lightfoot",
                    "description": "Further increases your Agility."
                },
                "archer_esquive_1": {
                    "name": "Elusive",
                    "description": "Increases your chance to dodge enemy attacks."
                },
                "archer_saignement_1": {
                    "name": "Barbed Arrows",
                    "description": "Increases your chance to inflict bleeding on hit."
                },
                "archer_ranger_keystone": {
                    "name": "Guerrilla Tactics",
                    "description": "After dodging an attack, your Agility is increased by 50% for 2 turns."
                },
                "archer_ultime": {
                    "name": "Arrow of Infinity",
                    "description": "Your mastery of the bow is absolute, increasing all your attributes."
                }
            }
        },
        "mage": {
            "name": "Mage Constellation",
            "nodes": {
                "mage_start": {
                    "name": "Crown of the Hat",
                    "description": "The beginning of the mage's path."
                },
                "mage_intelligence_1": {
                    "name": "Subtle Weaving",
                    "description": "Increases your base Intelligence."
                },
                "mage_mana_1": {
                    "name": "Deep Reservoir",
                    "description": "Increases your maximum mana by a percentage."
                },
                "mage_siphon_1": {
                    "name": "Minor Siphon",
                    "description": "You drain a small amount of health and mana with your spells."
                },
                "mage_spell_damage_1": {
                    "name": "Destructive Focus",
                    "description": "Increases the damage of all your spells."
                },
                "mage_spell_crit_1": {
                    "name": "Arcane Precision",
                    "description": "Gives your spells a chance to critically strike."
                },
                "mage_freecast_1": {
                    "name": "Echo of the Nexus",
                    "description": "Increases your chance to cast a spell for free."
                },
                "mage_archon_keystone": {
                    "name": "Arcane Overload",
                    "description": "Your spells cost 15% more mana, but deal 25% more damage."
                },
                "mage_efficiency_1": {
                    "name": "Efficient Channeling",
                    "description": "Reduces the mana cost of all your spells."
                },
                "mage_mana_shield_1": {
                    "name": "Mana Shield",
                    "description": "A togglable passive. When active, 20% of damage taken is absorbed by your mana before affecting your HP."
                },
                "mage_mana_regen_1": {
                    "name": "Clarity of Mind",
                    "description": "Increases your out-of-combat mana regeneration."
                },
                "mage_battlemage_keystone": {
                    "name": "Soul Siphon",
                    "description": "Your spell lifesteal also restores an amount of Mana equal to 50% of the HP drained."
                },
                "mage_archon_edge": {
                    "name": "Archon's Finish",
                    "description": "Slightly increases the damage of your magical critical strikes."
                },
                "mage_battlemage_edge": {
                    "name": "Battlemage's Guard",
                    "description": "Slightly increases your damage resistance."
                },
                "mage_mastery_1": {
                    "name": "Arcane Mastery",
                    "description": "A deep understanding of the arcane that drastically increases your Intelligence."
                },
                "mage_ultime": {
                    "name": "Fate Weaver",
                    "description": "You are one with magic. Massively increases your Intelligence."
                }
            }
        }
    },
    "traits": {
        "families": {
            "arcanes_majeurs": {
                "name": "Major Arcana Family",
                "description": "By uniting the seven major arcana, you master your own destiny and transcend your limits."
            },
            "titans_primordiaux": {
                "name": "Primordial Titans Family",
                "description": "The power of the original creatures flows in you, making you incredibly resilient."
            },
            "betes_celestes": {
                "name": "Celestial Beasts Family",
                "description": "The agility and precision of the creatures of the firmament guide your strikes."
            },
            "astres_sombres": {
                "name": "Dark Stars Family",
                "description": "You draw your power from the dark corners of the cosmos, turning pain into power."
            },
            "quatre_vents": {
                "name": "Four Winds Family",
                "description": "Elusive as the wind, you dodge blows that should hit you."
            },
            "armes_maudites": {
                "name": "Cursed Weapons Family",
                "description": "The bloodlust of these cursed weapons increases your own ferocity in combat."
            },
            "vertus_royales": {
                "name": "Royal Virtues Family",
                "description": "The qualities of a good leader allow you to amass more wealth."
            },
            "parchemins_oublies": {
                "name": "Forgotten Scrolls Family",
                "description": "Reading these ancient scrolls has expanded your reservoir of magical energy."
            },
            "forge_divine": {
                "name": "Divine Forge Family",
                "description": "The secrets of the blacksmith of the gods allow you to craft equipment with formidable efficiency."
            },
            "cour_celeste": {
                "name": "Celestial Court Family",
                "description": "The divine figures of the Celestial Court grant you balanced and unparalleled power."
            },
            "sablier_du_temps": {
                "name": "Hourglass of Time Family",
                "description": "Mastery of time gives you an unpredictable tactical advantage at the start of each battle."
            },
            "pantheon_dechu": {
                "name": "Fallen Pantheon Family",
                "description": "The power of dead gods flows in you, making you deadly dangerous, but also vulnerable."
            }
        },
        "cards": {
            "t1_colosse": {
                "name": "Trait: Colossus Skin",
                "description": "Your skin is like a rock. Increases Health, but reduces Agility.",
                "card_name": "The Colossus"
            },
            "t1_loup_stellaire": {
                "name": "Trait: Wolf's Instinct",
                "description": "Increases critical chance, but reduces your endurance.",
                "card_name": "The Star Wolf"
            },
            "t1_epee_brisee": {
                "name": "Trait: Broken Blade",
                "description": "You deal more damage, but your body is fragile.",
                "card_name": "The Broken Sword"
            },
            "t1_chanceux": {
                "name": "Trait: Wheel of Fortune",
                "description": "Fortune smiles upon you, but magic eludes you a bit.",
                "card_name": "The Wheel of Fortune"
            },
            "t1_la_force": {
                "name": "Trait: Strength",
                "description": "Your Lifesteal is increased, at the expense of your defense.",
                "card_name": "Strength"
            },
            "t1_zephyr": {
                "name": "Trait: Zephyr's Breath",
                "description": "A light breeze helps you avoid blows.",
                "card_name": "Zephyr the West Wind"
            },
            "t1_couronne_justice": {
                "name": "Trait: Crown of Justice",
                "description": "Your righteous spirit resists harmful influences.",
                "card_name": "Crown of Justice"
            },
            "t1_parchemin_givre": {
                "name": "Trait: Frost Scroll",
                "description": "A chilling knowledge that increases your mana pool.",
                "card_name": "Frost Scroll"
            },
            "t1_juge": {
                "name": "Trait: The Judge's Gaze",
                "description": "Your righteousness protects you from debuffs, but slows your learning.",
                "card_name": "The Judge"
            },
            "t1_grain_passe": {
                "name": "Trait: Grain of the Past",
                "description": "You learn faster from past lessons, but accumulate less wealth.",
                "card_name": "Grain of the Past"
            },
            "t2_titan_sismique": {
                "name": "Trait: Seismic Force",
                "description": "Your strength can stun, but makes you less lucky.",
                "card_name": "The Seismic Titan"
            },
            "t2_leviathan": {
                "name": "Trait: Leviathan's Skin",
                "description": "Your thick skin protects you and regenerates slowly.",
                "card_name": "The Leviathan"
            },
            "t2_gardien_ancien": {
                "name": "Trait: Guardian's Carapace",
                "description": "Your armor of thorns reflects damage back to your attackers.",
                "card_name": "The Ancient Guardian"
            },
            "t2_chimere_nebuleuse": {
                "name": "Trait: Chimera's Blood",
                "description": "A mix of speed and cunning that weakens your regeneration.",
                "card_name": "The Nebulous Chimera"
            },
            "t2_griffon_solaire": {
                "name": "Trait: Gryphon's Speed",
                "description": "You are as fast as the wind, increasing your agility.",
                "card_name": "The Solar Gryphon"
            },
            "t2_faucon_comete": {
                "name": "Trait: Falcon's Eye",
                "description": "Your piercing gaze increases your critical strike damage.",
                "card_name": "The Comet Falcon"
            },
            "t2_empereur": {
                "name": "Trait: The Emperor",
                "description": "Your natural authority strengthens your body and mind.",
                "card_name": "The Emperor"
            },
            "t2_grande_pretresse": {
                "name": "Trait: The High Priestess",
                "description": "Your wisdom increases your mana and magic resistance.",
                "card_name": "The High Priestess"
            },
            "t2_le_magicien": {
                "name": "Trait: The Magician",
                "description": "Your affinity with magic reduces the cost of your spells.",
                "card_name": "The Magician"
            },
            "t2_lune_sang": {
                "name": "Trait: Blood Moon Pact",
                "description": "Your spells feed on the vitality of your enemies.",
                "card_name": "The Blood Moon"
            },
            "t2_soleil_noir": {
                "name": "Trait: Black Sun's Glare",
                "description": "Tap into forbidden magic that consumes your body.",
                "card_name": "The Black Sun"
            },
            "t2_boreas": {
                "name": "Trait: Boreas's Frost",
                "description": "The icy north wind makes you resistant to debuffs.",
                "card_name": "Boreas the North Wind"
            },
            "t2_eurus": {
                "name": "Trait: Eurus's Gust",
                "description": "The sharp, piercing east wind guides your critical strikes.",
                "card_name": "Eurus the East Wind"
            },
            "t2_bouclier_fele": {
                "name": "Trait: Cracked Aegis",
                "description": "A shield that reflects damage but offers little protection.",
                "card_name": "The Cracked Shield"
            },
            "t2_sceptre_noblesse": {
                "name": "Trait: Scepter of Nobility",
                "description": "Your noble posture grants you superior experience gain.",
                "card_name": "Scepter of Nobility"
            },
            "t2_parchemin_feu": {
                "name": "Trait: Fire Scroll",
                "description": "A fiery knowledge that increases the power of your spells.",
                "card_name": "Fire Scroll"
            },
            "t2_marteau_hephaistos": {
                "name": "Trait: Hammer of Hephaestus",
                "description": "The divine hammer makes crafting easier but is not made for combat.",
                "card_name": "The Hammer of Hephaestus"
            },
            "t2_gardien": {
                "name": "Trait: Guardian's Stance",
                "description": "You focus on defense, at the expense of attack.",
                "card_name": "The Guardian"
            },
            "t2_flux_present": {
                "name": "Trait: Flow of the Present",
                "description": "You live in the moment, prioritizing speed over brute force.",
                "card_name": "Flow of the Present"
            },
            "t2_dieu_guerre": {
                "name": "Trait: Vestige of the God of War",
                "description": "Raw offensive power that weakens your constitution.",
                "card_name": "Vestige of the God of War"
            },
            "t3_le_jugement": {
                "name": "Trait: Judgment",
                "description": "Your hits have a chance to purge debuffs and heal.",
                "card_name": "Judgment"
            },
            "t3_le_monde": {
                "name": "Trait: The World",
                "description": "Your mastery of the world increases all your gains.",
                "card_name": "The World"
            },
            "t3_etoile_mourante": {
                "name": "Trait: Glow of the Dying Star",
                "description": "The glow of a dying star guides your magic strikes.",
                "card_name": "The Dying Star"
            },
            "t3_notos": {
                "name": "Trait: Notos's Caress",
                "description": "The warm south wind improves the effectiveness of your heals.",
                "card_name": "Notos the South Wind"
            },
            "t3_lance_empoisonnee": {
                "name": "Trait: Poisoned Tip",
                "description": "Your hits have a chance to inflict a lasting bleed.",
                "card_name": "The Poisoned Spear"
            },
            "t3_orbe_prosperite": {
                "name": "Trait: Orb of Prosperity",
                "description": "This orb attracts wealth, increasing your fragment gains.",
                "card_name": "Orb of Prosperity"
            },
            "t3_parchemin_foudre": {
                "name": "Trait: Lightning Scroll",
                "description": "The energy of this scroll increases your magic criticals.",
                "card_name": "Lightning Scroll"
            },
            "t3_enclume_ames": {
                "name": "Trait: Anvil of Souls",
                "description": "This mythical anvil strengthens your armor and your body.",
                "card_name": "The Anvil of Souls"
            },
            "t3_souffle_dragon": {
                "name": "Trait: Dragon's Breath",
                "description": "The dragon's fire infuses your being with great resistance.",
                "card_name": "The Dragon's Breath"
            },
            "t3_heraut": {
                "name": "Trait: The Herald's Voice",
                "description": "Your divine word increases your damage, but consumes more energy.",
                "card_name": "The Herald"
            },
            "t3_vision_futur": {
                "name": "Trait: Vision of the Future",
                "description": "Anticipating blows helps you dodge, but prepares you less for impact.",
                "card_name": "Vision of the Future"
            },
            "t3_deesse_nuit": {
                "name": "Trait: Vestige of the Goddess of Night",
                "description": "You drain life from your enemies, but external healing is less effective on you.",
                "card_name": "Vestige of the Goddess of Night"
            },
            "tmax_vide_affame": {
                "name": "Trait: Embrace of the Void",
                "description": "Your spells siphon magical energy from your target.",
                "card_name": "The Starving Void"
            },
            "tmax_imperatrice": {
                "name": "Trait: The Empress's Blessing",
                "description": "The benevolence of the Celestial Empress strengthens your vitality.",
                "card_name": "The Empress"
            },
            "tmax_echo_eternite": {
                "name": "Trait: Echo of Eternity",
                "description": "Your first skill in each combat has a 25% chance not to consume your turn.",
                "card_name": "Echo of Eternity"
            },
            "tmax_dieu_chaos": {
                "name": "Trait: Vestige of the God of Chaos",
                "description": "Raw, chaotic power that increases your damage at the expense of your precision.",
                "card_name": "Vestige of the God of Chaos"
            }
        }
    },
    "fief": {
        "scierie": {
            "name": "Sawmill",
            "description": "Passively produces wood over time."
        },
        "mine": {
            "name": "Iron Mine",
            "description": "Passively extracts metal over time."
        },
        "atelier_tissage": {
            "name": "Weaving Workshop",
            "description": "Passively produces cloth over time."
        },
        "tresorerie": {
            "name": "Treasury",
            "description": "Passively generates fragments. Requires a significant initial investment."
        },
        "entrepot": {
            "name": "Warehouse",
            "description": "Increases your maximum storage capacity for wood, metal, and cloth."
        },
        "infirmerie": {
            "name": "Infirmary",
            "description": "Heals your wounds faster after a defeat and allows you to prepare rescue balms for your adventures."
        },
        "refectoire": { // NEW NAME
            "name": "Refectory",
            "description": "Prepares hearty meals that increase your maximum stamina and your ability to go on multiple expeditions."
        }
    },
    "seasons": {
        "PRINTEMPS": { "name": "Spring" },
        "ETE": { "name": "Summer" },
        "AUTOMNE": { "name": "Autumn" },
        "HIVER": { "name": "Winter" }
    },
    "garden": {
        "alerts": {
            "seed_found": "✨ You found a rare seed: {seedName}!"
        },
        "support_plant_info": "{plantName} continues to support your garden.",
        "infestation_alert": "Creatures are emerging from the ground around the {plantName}!",
        "orchid_protection": "The Silent Orchid has repelled the creatures!",
        "harvest_success": "Harvest: +{amount} {resource} and {seeds} seed(s)!",
        "harvest_partial": "Partial Harvest: +{amount} {resource} and {seeds} seed(s).",
        "warehouse_full": "Your warehouse is full!",
        "season_effects_title": "Season Effects: {seasonName}",
        "favored_types": "Favored types (+25% growth speed)",
        "disfavored_types": "Disfavored types (-50% growth speed)",
        "no_favored_types": "No plant types are favored this season.",
        "no_disfavored_types": "No plant types are disfavored this season."
    },
    "garden_plants": {
        "HERBE_ROBUSTE": {
            "name": "Sturdy Grass",
            "description": "A simple and resilient grass. The basis of all plant alchemy.",
            "hint": ""
        },
        "CRISTAL_DE_GIVRE": {
            "name": "Frost Crystal",
            "description": "A crystalline formation that seems to absorb ambient heat.",
            "hint": "Obtained by transforming Sturdy Grass in Winter."
        },
        "FLEUR_DE_LAVE": {
            "name": "Lava Flower",
            "description": "A flower that only grows in the hottest climates. Its petals burn to the touch.",
            "hint": "Obtained by transforming Sturdy Grass in Summer."
        },
        "GRAINE_SOLAIRE": {
            "name": "Sun Seed",
            "description": "A seed that stores sunlight. It gives off a gentle warmth.",
            "hint": "Obtained by transforming Sturdy Grass in Spring."
        },
        "RACINE_TERREUSE": {
            "name": "Earthy Root",
            "description": "A gnarled root that draws minerals deep from the soil.",
            "hint": "Obtained by transforming Sturdy Grass in Autumn."
        },
        "TOURNESOL_RADIEUX": {
            "name": "Radiant Sunflower",
            "description": "A flower that radiates intense light, born of fire and sun.",
            "hint": "Synergy of a Sun Seed and a Fire-type plant in Summer."
        },
        "LYS_DE_GIVRE": {
            "name": "Frost Lily",
            "description": "A flower of icy beauty, born from the meeting of cold and light.",
            "hint": "Synergy of a Frost Crystal and a Solar plant in Winter."
        },
        "CHAMPIGNON_TERREUX": {
            "name": "Earthy Mushroom",
            "description": "This dense mushroom grows on mineral-rich soils. It has absorbed the stony essence of the earth.",
            "hint": "Synergy of an Earthy Root and a Fire-type plant in Autumn."
        },
        "FLEUR_DE_ROSEE": {
            "name": "Dewdrop Flower",
            "description": "Opens only at dawn to capture the morning dew, said to have healing properties.",
            "hint": "Synergy of a Sun Seed and Sturdy Grass in Spring."
        },
        "TREFLE_DORE": {
            "name": "Golden Clover",
            "description": "A four-leaf clover whose veins are pure gold. Its presence alters the laws of nature, increasing the mutation chances of nearby plants.",
            "hint": "Synergy of a Sun Seed and a Dewdrop Flower in Spring."
        },
        "RACINE_EPONGE": {
            "name": "Sponge-Root",
            "description": "This porous root absorbs harmful energies from the soil, protecting neighboring plants from the harshness of bad seasons.",
            "hint": "Synergy of an Earthy Root and an Earthy Mushroom in Autumn."
        },
        "ROSE_SANGUINE": {
            "name": "Blood Rose",
            "description": "A deep red rose said to grow only where the blood of a magical creature has been spilled.",
            "hint": "Synergy of a Dewdrop Flower, a Lava Flower, and Sturdy Grass in Spring."
        },
        "ORCHIDEE_SILENCIEUSE": {
            "name": "Silent Orchid",
            "description": "This orchid emits no fragrance, but a soothing vibration that disturbs aggressive creatures and keeps them away from the garden.",
            "hint": "Synergy of a Frost Lily and a Golden Clover in Winter."
        }
    },
    "dev": {
        "logs": {
            "stats_reset": "Stats reset. {totalPoints} points to spend.",
            "artefact_not_found": "Artifact not found with ID: {itemId}",
            "ascension_bonus": "Ascension Bonus: +{bonusAmount} CP ({bonusPercent}%)",
            "invalid_garden_size": "Invalid garden size detected. Resetting to 2x2.",
            "new_tier_unlocked": "New plant tier unlocked: {tier}"
        }
    },
    "dungeon": {
        "alerts": {
            "no_key": "You don't have a Rift Key!",
            "busy": "You are already busy.",
            "debuff_faded": "The \"{debuffName}\" debuff has faded.",
            "new_modifier": "New affix: {modifierName}",
            "buff_faded": "The \"{buffName}\" buff has faded.",
            "rest_full_success": "Full rest! You recover {heal} HP and {mana} Mana, but you suffer a debuff.",
            "rest_partial_success": "Partial rest. You recover {heal} HP and {mana} Mana.",
            "elite_bonus": "Elite bonus! Increased rewards!",
            "xp_gain": "You gain {xp} experience points.",
            "shards_gain": "You find {shards} Unstable Shards.",
            "resources_gain": "You recover: {resources}.",
            "defeat_in_breach": "You have been defeated in the Rift...",
            "enter_breach": "You enter the Unstable Rift on floor {floor}...",
            "not_enough_hp_sacrifice": "You don't have enough health for this sacrifice!",
            "hp_sacrificed": "You sacrifice {amount} HP...",
            "temp_buff_gain": "You receive a +{amount} bonus to {stat}!",
            "event_shards_gain": "+{amount} Unstable Shards",
            "event_resource_gain": "+{amount} {resourceName}",
            "event_heal_gain": "You recover {amount} HP!",
            "event_mana_gain": "You recover mana!",
            "event_mana_gain_flat": "You recover {amount} mana points!",
            "event_damage_loss": "You lose {amount} HP!",
            "event_consumable_gain": "You found: {itemName}!",
            "event_map_reveal": "The map reveals the floors up to level {floor}!"
        },
        "ui": {
            "floor_choice_classic": "Floor 1 (Classic)",
            "floor_choice": "Floor {floor}",
            "start_floor_prompt": "On which floor do you wish to start your attempt?",
            "rest_prompt": "You find a soothing resting spot. How do you wish to use it?",
            "rest_choice_full": "Fully (-20% Damage / 3 floors)",
            "rest_choice_partial": "Partially (No debuff)",
            "enter_room_confirm": "Do you want to enter this room? ({roomType})",
            "floor_title": "Floor {floor}",
            "last_floor": "last floor",
            "floors_remaining_single": "{count} floor remaining",
            "floors_remaining_plural": "{count} floors remaining",
            "buff_display": "<span>{buffName} (+{value} {stat}) - ({duration} rooms remaining)</span>",
            "loot_display": "Loot: <strong id=\"dungeon-shard-count\">{count}</strong> <img src=\"assets/sprites/ressources/eclats_instables.png\" class=\"icon-sprite-small\">",
            "tier_guardian": "Tier Guardian ({bossName})",
            "exit_prompt": "You have found the exit of floor {floor}!<br><br>Current Loot: {shards} <img src=\"assets/sprites/ressources/eclats_instables.png\" class=\"icon-sprite-small\">.<br><br>What do you want to do?",
            "exit_choice_continue": "Continue (Next Floor)",
            "exit_choice_leave": "Leave (Keep 100% of loot)",
            "flee_confirm_prompt": "Are you sure you want to flee the dungeon?<br><br>You will only keep <strong>50%</strong> of the unstable shards you have collected.",
            "map_alt": {
                "start": "Start",
                "cleared": "Cleared Room",
                "encounter": "Encounter",
                "player": "Player"
            }
        },
        "debuffs": {
            "rest_fatigue": "Rest Fatigue, -20% damage"
        },
        "buffs": {
            "blessing_of": "Blessing of {stat}"
        },
        "report": {
            "title": "Exiting the Rift",
            "defeat_penalty": "You have been defeated! You only keep 50% of your resources and shards. Acquired XP is kept.",
            "leave_safe": "You leave the Rift safe and sound.",
            "max_floor_session": "Max floor reached this session: <strong>{floor}</strong>",
            "xp_gained_label": "XP Gained:",
            "basic_resources_title": "Basic Resources",
            "rare_components_title": "Rare Components"
        }
    },
    "combat": {
        "alerts": {
            "fled_combat": "You have fled. The combat is over.",
            "item_lost_on_death": "Oh no! You lost your {itemName}!",
            "boss_defeated": "You have defeated {bossName}! 🎉",
            "busy_expedition": "You are already on an expedition! Wait for it to end before facing a boss.",
            "boss_level_too_low": "Your level ({playerLevel}) is too low to face {bossName} (Required level: {requiredLevel}).",
            "boss_confirm_fight_detailed": "Are you sure you want to fight <strong>{bossName}</strong>?<br><br>Defeating this boss will grant you access to higher rarity expeditions.<br><br><p class='warning-text'>In case of defeat or fleeing, you will lose XP and resources, and you have a 20% chance of losing a piece of equipment!</p>",
            "food_buff_expired": "The effect of \"{foodName}\" has worn off."
        },
    "log": {
        "consumable_cooldown": "You must wait another {turns} turn(s) before using another item.",
        "turn_start": "--- Turn {round} starts ---",
        "player_uses_item": "You use {itemName}.",
        "player_heals_hp": "💚 You recover <strong class=\"damage-number\">{amount}</strong> HP.",
        "player_recovers_mana": "🌀 You recover <strong class=\"damage-number\">{amount}</strong> mana points.",
        "player_buffed": "💪 You feel more powerful! (+{value} {stat} for {duration} turns)",
        "turn_skipped": "You took too long to react, your turn has been skipped!",
        "victory": "🎉 Victory! All enemies have been defeated.",
        "enemy_turn_start": "--- Enemies' turn ---",
        "enemy_bleed_damage": "🩸 Bleed deals {damage} damage to {enemyName}.",
        "enemy_bleed_death": "☠️ {enemyName} succumbs to their wounds!",
        "enemy_stunned": "💫 {enemyName} is stunned and cannot attack!",
        "player_evades": "💨 You dodge {enemyName}'s attack!",
        "guerrilla_tactics": "🌿 Guerrilla Tactics! Your Agility increases!",
        "enemy_crit": "💥 {enemyName}'s hit is CRITICAL!",
        "mana_shield_absorb": "🛡️ Your Mana Shield absorbs <strong class=\"damage-number\">{amount}</strong> damage.",
        "indomitable_talent": "✊ 'Indomitable' Talent! You barely survive a fatal blow!",
        "enemy_attacks": "🔴 {enemyName} attacks you and deals <strong class=\"damage-number\">{damage}</strong> damage. <span class=\"chance-display\">({chance}% chance)</span>",
        "thorns_damage": "🛡️ Your thorns deal <strong class=\"damage-number\">{damage}</strong> damage to {enemyName}.",
        "enemy_lifesteal": "💚 {enemyName} drains {amount} health.",
        "player_is_stunned": "💫 {enemyName}'s attack has stunned you!",
        "enemy_misses": "🟢 {enemyName} misses you! <span class=\"chance-display\">({chance}% chance)</span>",
        "player_defeated": "You have been defeated...",
        "stalemate": "The fight drags on... You retreat.",
        "combat_start": "The fight begins!",
        "hourglass_buff": "⌛ The Hourglass of Time grants you a +15% bonus to {statName}!",
        "echo_of_eternity": "🌀 Echo of Eternity! You can take another turn immediately!",
        "not_enough_mana": "🌀 You don't have enough mana to cast this spell!",
        "stun_resist": "🗿 Unshakable! You resist the stun!",
        "player_stunned": "You are stunned and cannot attack!",
        "player_uses_skill": "⚔️ You use {skillName} on {targetName}.",
        "tank_intercept": "🛡️ {tankName} intercepts and takes <strong class=\"damage-number\">{damage}</strong> damage!",
        "enemy_defeated": "☠️ {enemyName} has been defeated!",
        "player_miss": "💨 Your attack on {targetName} misses! <span class=\"chance-display\">({chance}% chance)</span>",
        "player_spell_crit": "✨ MAGIC CRITICAL HIT on {targetName}!",
        "player_crit": "💥 CRITICAL HIT on {targetName}!",
        "codex_execute": "💀 Execute! Your damage is increased on a weakened target!",
        "eagle_eye_execute": "🦅 Eagle Eye! Your critical hit executes {targetName}!",
        "aoe_damage": "area of effect damage",
        "damage": "damage",
        "target_takes_damage": "⚔️ {targetName} takes <strong class=\"damage-number\">{damage}</strong> damage.",
        "target_takes_aoe_damage": "⚔️ {targetName} takes <strong class=\"damage-number\">{damage}</strong> area of effect damage.",
        "player_lifesteal": "💚 You drain {amount} health.",
        "player_manaleech": "🌀 You drain <strong class=\"damage-number\">{amount}</strong> mana.",
        "soul_siphon": "💜 Soul Siphon! You convert the drained life into <strong class=\"damage-number\">{amount}</strong> mana.",
        "enemy_bleeds": "🩸 {targetName} is bleeding!",
        "enemy_stunned": "💫 You have stunned {targetName}!",
        "boss_xp_gain_base": "You gain {xp}",
        "boss_xp_gain_bonus": " (+{bonus} bonus)",
        "boss_resource_gain": " XP and {resources} resources.",
        "boss_loss_penalty": "You lost {xp} XP and {resources} resources.",
        "defeated_by": "You were defeated by {enemyName}...",
        "enemy_defeated_simple": "You have defeated {enemyName}!",
        "from_boss": "Loot from {bossName}",
        "turn_limit_reached": "Turn limit reached! The combat is ending.",
        "enemy_uses_skill": "🔴 {enemyName} uses {skillName}!",
        "player_takes_skill_damage": "You take <strong class=\"damage-number\">{damage}</strong> points of magic damage.",
        "player_is_debuffed": "📉 Your {stat} is reduced by {value}% for {duration} turns.",
        
    },
    "ui": {
        "role_tank": "TANK",
        "no_consumables": "No consumables.",
        "status_active": "ACTIVE",
        "status_inactive": "INACTIVE",
        "mana_shield_tooltip": "Mana Shield ({status})\nClick to toggle."
    },
    "mutations": {
        "frost_transmutation": { "name": "Frost Transmutation" },
        "fire_transmutation": { "name": "Fire Transmutation" },
        "solar_transmutation": { "name": "Solar Transmutation" },
        "earthy_transmutation": { "name": "Earthy Transmutation" },
        "winter_lily": { "name": "Winter Lily" },
        "summer_sunflower": { "name": "Summer Sunflower" },
        "spring_dew_flower": { "name": "Spring Dew Flower" },
        "autumn_earthy_mushroom": { "name": "Autumn Earthy Mushroom" },
        "golden_clover": { "name": "Golden Clover" },
        "sponge_root": { "name": "Sponge-Root" },
        "blood_rose": { "name": "Blood Rose" },
        "silent_orchid": { "name": "Silent Orchid" }
    },
    },
    "adventure": {
        "nodes": {
            "A1_N1_INTRO": { "name": "Sapwood Hamlet" },
            "A1_N2_LOUPS": { "name": "The Beast's Trail" },
            "A1_N3_FORGERON": { "name": "Rescuing Kaelen" },
            "A1_N4_PORTE_FORGE": { "name": "The Heart of the Village" },
            "A1_TUTO_FORGE_1": { "name": "The Art of the Forge" },
            "A1_TUTO_FORGE_2": { "name": "First Piece" },
            "A1_TUTO_EXPEDITION_1": { "name": "The Outside World" },
            "A1_TUTO_EXPEDITION_2": { "name": "First Report" },
            "A1_TUTO_FIEF_1": { "name": "Building a Future" },
            "A1_TUTO_FIEF_2": { "name": "First Stone" },
            "A1_TUTO_ALCHIMIE_1": { "name": "The Art of Potions" },
            "A1_TUTO_ALCHIMIE_2": { "name": "First Concoction" },
            "A1_N5_HEROIC_ACT": { "name": "A Heroic Act" },
            "A1_N6_MINE": { "name": "The Whispering Mine" },
            "A1_N7_FRAGMENT": { "name": "The First Fragment" },
            "A1_N8_ALCHIMISTE": { "name": "Alaric's Laboratory" },
            "A1_N9_SANCTUAIRE": { "name": "The Forgotten Sanctuary" },
            "A1_N10_LARRY": { "name": "An Unexpected Encounter" },
            "A2_N1_PONT_LA_CROISEE": { "name": "Crossbridge" },
            "A2_N2_RENOMMEE": { "name": "A Growing Reputation" },
            "A2_N3_GATE_CHASSEUR": { "name": "The Hunter's Challenge" },
            "A2_N4_MAITRESSE_CHASSEUSE": { "name": "The Beast Mistress" },
            "A2_N5_GATE_FORGE": { "name": "The Sealed Tower" },
            "A2_N6_TOUR_DE_SILAS": { "name": "The Enchanter's Master" },
            "A2_N7_LABO_LARRY": { "name": "The Puppeteer" },
            "A2_N8_BOSS": { "name": "The Masterpiece" },
            "A2_N9_REVELATION_ASCENSION": { "name": "The Limit Reached" },
            "A3_N1_RITUEL": { "name": "The Ritual of Ascension" },
            "A3_N2_CONSTELLATIONS": { "name": "Drawing One's Destiny" },
            "A3_N3_ETINCELLE": { "name": "The First Spark" },
            "A3_N4_ARTIFICE": { "name": "The Artificer's Hand" },
            "A3_N5_ENIGME": { "name": "The Silent Enigma" },
            "A3_N6_ANALYSE": { "name": "The Weight of Legend" },
            "A3_N7_HERAUT": { "name": "The Judge's Herald" },
            "A3_N8_PISTE": { "name": "The Trail of Silence" },
            "A3_N9_BOSS": { "name": "The Dissonant Judge" },
            "A4_N1_EFFONREMENT": { "name": "The Collapse of Reality" },
            "A4_N2_FRAGMENTS": { "name": "The Fragment Hunt" },
            "A4_N3_SEAU": { "name": "The Locked Guardian" },
            "A4_N4_PORTAIL": { "name": "The Voice of the Runes" },
            "A4_N5_INTRUSION": { "name": "An Unforeseen Alliance" },
            "A4_N6_ANCIEN": { "name": "The Echoes of the Ancients" },
            "A4_N7_REFLEXION": { "name": "A Philosophical Choice" },
            "A4_N8_ARME": { "name": "Larry's Weapon" },
            "A4_N9_CONFRONTATION": { "name": "The Composer of Chaos" },
            "A4_N10_BOSS": { "name": "The Corrupted Harmonist" }
        },
        "characters": {
            "elian": "Master Elian",
            "player": "{playerName}",
            "kaelen": "Kaelen",
            "lysandra": "Lysandra",
            "alaric": "Master Alaric",
            "larry": "Larry",
            "hero_think": "Thoughts",
            "gaston": "Gaston",
            "garde": "City Guard",
            "maitresse_chasseuse": "Huntress Master",
            "silas": "Silas the Enchanter",
            "eliana": "Eliana",
            "kormac": "Kormac, Guardian of Harmony"
        },
        "dialogue": {
            "A1_N1_S1": "Welcome to Sapwood, stranger. I regret the circumstances of your arrival are so dark. Our hamlet was a haven of peace, but a shadow has fallen over the forest. A... Dissonance. The beasts have gone mad, their eyes glowing with an unhealthy purple light.",
            "A1_N1_S2_BRAVE": "Your bravery is admirable, but it must be proven. Before sending you into the woods, show me what you're made of. See this old training dummy? It has been touched by the corruption. Strike it.",
            "A1_N1_S2_PRUDENT": "Prudence is a great quality. Before sending you to seek answers, show me your strength. See this old training dummy? It has been touched by the corruption. Strike it.",
            "A1_N1_S2_SILENT": "A silent mind is often a focused one. Good. But actions speak louder. Show me what you're made of. See this old training dummy? It has been touched by the corruption. Strike it.",
            "A1_N1_S3": "Hmm. You have potential. Very well. But this is just the beginning. You must toughen up. Go on Expeditions, explore the world, and come back stronger. I've unlocked the Codex for you so you can study your enemies.",
            "A1_N1_TUTO1": "Look at the interface. Your health (HP) is the green bar. Keep an eye on it.<br><br>At the bottom are your skills. Choose one and select your target. Go ahead.",
            "A1_N1_TUTO3": "Perfect! You see, your damage is displayed in red. The enemy also has a health bar. Your goal is to empty it before it empties yours.",
            "A1_N1_TUTO4": "Watch out! You've taken damage. Survival is as important as offense. Now, finish it off!",
            "A1_N2_S1": "(A purple glow... This isn't an ordinary sickness. It's as if nature itself is out of tune. Elian was right, it's not hunger that drives them, but pure madness.)",
            "A1_N2_S2": "Did you see? That's what I'm talking about. The trail seems to lead northwest, towards the old mines. That's where our blacksmith, Kaelen, was last seen... abducted by a band of goblins. I fear the worst.",
            "A1_N2_S3": "(Goblins aren't usually this organized. Something has changed. I must find this blacksmith.)",
            "A1_N3_S0": "(The goblins weren't torturing him. They were... fascinated. They were tapping his tools, as if trying to tune an instrument. Strange.)",
            "A1_N3_S1": "By the hammer and anvil, thank you! Those little pests were weird. They kept clinking my tongs. This madness started right after I found a strange ore in the old mine.",
            "A1_N3_S2": "You saved one of our own, an act of bravery that deserves recognition. The village of Sapwood opens its gates to you. Go see our artisans, they will help you in your quest.",
            "A1_N3_S3": "The village, huh? I appreciate it. But first, help me rebuild my forge! Without it, I'm useless. And maybe I can analyze this damn ore.",
            "A1_N4_S1": "I can't do anything without my tools and my hearth. The surrounding forest is full of wood, but we need a good amount. Help us gather what's needed. The forge is the beating heart of this village; relighting it is the first step to understanding what is happening to our world.",
            "A1_N4_S2": "Wonderful! The fire is crackling again! Thank you, adventurer. Now, let's talk about what really concerns us...",
            "A1_TUTO_FORGE_1_S1": "Ah, the sweet sound of the anvil! Now that everything is in order, how about you learn the basics? The forge is your best ally for creating the equipment that will keep you alive.",
            "A1_TUTO_FORGE_1_S2_Q1": "How does it work?",
            "A1_TUTO_FORGE_1_S2_Q2": "Where do I find materials?",
            "A1_TUTO_FORGE_1_S3_A1_TUTO_FORGE_1_S2_Q1": "It's simple! You choose an item type, a rarity, and if you have the materials and fragments, you can forge it. The more my forge is upgraded, the higher the quality of the items you can create.",
            "A1_TUTO_FORGE_1_S3_A1_TUTO_FORGE_1_S2_Q2": "Everywhere! Expeditions, monsters... The world is full of resources for those who know where to look. The most important things are Fragments, which you get by recycling items you no longer want.",
            "A1_TUTO_FORGE_1_S4": "The best way to learn is by doing. Go take a look at the interface, and come back to me when you've crafted your first item. Any one will do to start.",
            "A1_TUTO_FORGE_2_S1": "That's more like it! It may not be a legendary blade, but it's YOUR creation. Keep it up, and soon your name will echo in armories throughout the kingdom. You've earned this for your efforts.",        
            "A1_TUTO_EXPEDITION_1_S1": "You handled those wolves well, but the world is much vaster. It's time for you to learn to navigate it alone.",
            "A1_TUTO_EXPEDITION_1_S2": "The 'Expeditions' tab is your gateway to this unknown. There you will find missions of varying difficulties and rewards. Each success will bring you experience and resources.",
            "A1_TUTO_EXPEDITION_1_S3": "(So this is how I'll get gear and experience... Each expedition seems to have its own challenges and may require different attributes.)",
            "A1_TUTO_EXPEDITION_1_S4": "Go on. Launch one, any one. Come back to me when you're done. Show me that you are not afraid of the unknown.",
            "A1_TUTO_EXPEDITION_2_S1": "Excellent. You survived your first solo trial. Each adventure will harden you and hone your skills. The road is still long, but this is a good start. Take this to help you continue.",
            "A1_TUTO_FIEF_1_S1": "This Fief is yours now. It is more than just a piece of land; it is a symbol of your growing influence and a safe haven.",
            "A1_TUTO_FIEF_1_S2": "You can build structures there that will passively generate resources, even when you are not playing. This is the key to becoming a true power and financing your future endeavors.",
            "A1_TUTO_FIEF_1_S3": "Start with a Sawmill. Wood is the foundation of all development. Go on, and come back to me when the first plank has been laid.",
            "A1_TUTO_FIEF_2_S1": "Perfect. Your domain is beginning to take shape. Each upgraded building will strengthen your position and your economy. Continue on this path, and you will become a force to be reckoned with. Here is something to help you along the way.",
            "A1_TUTO_ALCHIMIE_1_S1": "Ah, there you are! Ready to dabble in the secrets of vials and alembics? Dissonance is not just a brute force; it seeps in like a poison. My potions can help you survive where mere strength fails.",
            "A1_TUTO_ALCHIMIE_1_S2": "Every ingredient has a property, every mixture a possibility. Nature itself is an open grimoire for those who can read between the lines... or the leaves!",
            "A1_TUTO_ALCHIMIE_1_S3": "Go to my workshop; I've left you everything you need to brew a Minor Healing Potion. It's basic, but even the greatest tower begins with a single stone. Show me what you can do!",
            "A1_TUTO_ALCHIMIE_2_S1": "Ha! You have a talent for this! This potion is perfectly measured. Look at that color, that clarity! Magnificent! You can almost hear the herbs singing!",
            "A1_TUTO_ALCHIMIE_2_S2": "Keep it safe; it might save your life. Take these herbs, you'll need them. The road ahead is paved with dangers, and with alchemical wonders to discover!",

            "A1_N5_S1": "Now that the forge is active, I can tell you the truth. The goblins were just a distraction. The Dissonance in the mine is strong. It has awakened something much older... stone Guardians. They are blocking access to the deepest veins. If you could neutralize them, the village would be eternally grateful.",
            "A1_N5_S2": "Incredible! You defeated the Guardians that our best warriors feared. You are no mere adventurer. You are a protector. The village council has decided to grant you the old abandoned Fief on the hill. It is yours to rebuild.",
            "A1_N5_S3": "(A Fief... That's a great responsibility. But also a base of operations. I can develop it to help me on my quest. It's time to go back to Kaelen.)",
            "A1_N6_S1": "A Fief, no less! Your reputation is well-established. Listen, now that you've cleared the mine entrance, could you go back for me? I need a sample of that strange ore. But be careful... old tales speak of a much more powerful Eroded Guardian sleeping in the depths. It's surely protecting the lode.",
            "A1_N6_S2": "The guardian is defeated. And there... it was protecting this vein of glowing ore. This must be what Kaelen was looking for. It's... humming with a strange energy.",
            "A1_N7_S1": "(Upon touching the crystal, my mind is swept away. I see neither sky nor earth, only an infinite void. In the center, a star of dazzling whiteness pulses in harmony. Then, a crack. No sound, just a wave of... sadness. The star shatters in absolute silence, casting thousands of shards across the cosmos.)",
            "A1_N7_S2": "That release of energy! I didn't expect to find one here. I am Lysandra, Archivist of the Order of Silence. What you hold is not a mere ore. It is an Echo Fragment, a remnant of the Fracture that created the Dissonance poisoning this world.",
            "A1_N7_S3_BRAVE": "It's normal to be confused. Harmony is the great music of the universe. Dissonance is its false note. This fragment is a part of that broken note. We must understand why it resonates so strongly here.",
            "A1_N7_S3_PRUDENT": "An excellent question. The Fragment you carry resonates with another, hidden not far from here. But before that, a vision tells me that one of my colleagues is in great danger because of this same corruption.",
            "A1_N8_S1": "Your arrival is no coincidence. My colleague, the alchemist Master Alaric, is studying the corruption in the nearby swamps. My visions tell me he is about to be overwhelmed by his own subjects of study. We must help him, his knowledge is precious!",
            "A1_N8_S2": "(A laboratory in the middle of a fetid swamp... This Alaric must be either a genius or a madman.)",
            "A1_N8_S3": "By the vials! You saved me! This corruption is tenacious and... fascinating! To thank you, allow me to set up my laboratory in your village. My potions will be useful to you, for your path is about to become much more dangerous.",
            "A1_N9_S1": "Alaric is safe. Now, the Fragment you carry resonates with another. It is in a Forgotten Sanctuary, a place of ancient Harmony. But its entrance is sealed by a riddle, a question about the very nature of the world.",
            "A1_N9_S2": "(The door opens... The air here is pure, as if the Dissonance dares not enter. But I feel an ancient... and corrupted presence.)",
            "A1_N9_S3": "(The spectral guardians are now mere puppets. The corruption has reached the heart of this place. I must confront the source.)",
            "A1_N10_S1": "Fascinating. A new toy that learns quickly. But so fragile.",
            "A1_N10_S2": "I admit, I didn't expect you to make it this far. My little experiments are becoming more entertaining thanks to you. Keep gathering these fragments for me, will you? It makes things so much more... interesting.",
            "A1_N10_S3_BRAVE": "Ah, the fury! Adorable. But you don't understand. It's not a matter of good or evil. It's a matter of art. And the world is my blank canvas.",
            "A1_N10_S3_PRUDENT": "My 'logic'? The symphony of this world is so... boring. Always the same notes, the same melody. I simply decided to introduce a new instrument. A little chaos makes things so much more beautiful.",
            "A1_N10_S4": "By the stars... It wasn't an accident. It was a game. And we are its pawns.",
            "A2_N1_S1": "The trail of this 'Larry' is cold, but my visions indicate he passed through Crossbridge, the largest city in the region. It's a den of vipers, but we might find answers there.",
            "A2_N1_S2": "Hey there, friend! You look like you've seen better days. I'm Gaston, owner of the 'Laughing Boar'. An adventurer needs a good meal to keep going! But my firewood supplies are empty. Help me restock, and I'll teach you the secrets of a good, hearty meal!",
            "A2_N1_S3": "Wonderful! Thanks to you, my soups will be hot for weeks! As promised, I'm giving you access to my kitchen. A full stomach is the best armor!",
            "A2_N2_S1": "(Since I helped Gaston, my reputation has spread through town. People greet me, ask for advice... It's new.)",
            "A2_N2_S2": "You're the adventurer everyone's talking about? The Crossbridge guard needs people like you. We've set up a Bounty Board for threats we can't handle. Take a look, if you're up for it. Justice and glory await.",
            "A2_N3_S1": "I've found something! Larry is using a much more complex form of Dissonance. He doesn't corrupt creatures, he... 'enhances' them, he mutates them. To understand how, we need the heart of a mutated creature. Only the Huntress Master knows where to find them, but she only speaks to accomplished hunters.",
            "A2_N3_S2": "(The Huntress Master has finally granted me an audience. It's time to see if she lives up to her reputation.)",
            "A2_N4_S1": "So you're the one making all the noise in town. You've killed a few beasts, and you think that makes you a hunter? Prove it. Show me you have the heart of a true predator. Show me the heart of a Golem.",
            "A2_N4_S2": "Hmph. Not bad. You've got guts. Very well, I'll help you find your mutated beast. And since you're here, take a look at my collection. My gear is made for real hunters, not for kids playing with swords.",
            "A2_N5_S1": "The trail leads us to this twisted tower. It belongs to Silas, the Enchanter. The dissonant energy emanating from it is powerful. But the door is sealed by a magic that reacts to the quality of craftsmanship. Only a skilled blacksmith could break it.",
            "A2_N5_S2": "Perfect. The seal has broken. The dissonant energy inside is... powerful. Be on your guard.",
            "A2_N6_S1": "Who goes there? Ah... So it's you. You carry the stench of Dissonance. The stench of my failure. The stench of Larry. What do you want from me?",
            "A2_N6_S2_COMPASSION": "My apprentice... He was a genius. He saw the world's Harmony not as perfection, but as an unfinished canvas. He wanted to add his own colors, Dissonance. I banished him, but his madness grew far beyond my fears. To fight him, you'll need more than brute force. You'll need... to rewrite the rules. Let me teach you my art, Enchanting.",
            "A2_N6_S2_MENACE": "Strength? Against him? You're naive. He doesn't fight with his fists, but with the laws of reality. He was my apprentice. A genius who saw the world as an unfinished canvas, and Dissonance as his paint. I banished him. A grave mistake. To fight him, you'll need to bend the rules. I will teach you how. Enchanting.",
            "A2_N7_S1": "(Silas was right. This secret laboratory... the air is saturated with Dissonance. This is it. I can feel it.)",
            "A2_N7_S2": "Ah, my little toy. You've grown. You've learned new tricks, I see. Enchanting... such a rigid discipline. Let me teach you a new rhythm.",
            "A2_N7_COMBAT_START": "Come on, dance for me!",
            "A2_N7_COMBAT_MID": "You're doing well... for a toy.",
            "A2_N7_COMBAT_END": "Impressive. But the real show is just beginning.",
            "A2_N8_S1": "That was just a warm-up. A test. And you failed it miserably. You are not ready to understand my art. Here, have fun with my latest masterpiece. I have other symphonies to compose.",
            "A2_N8_S2": "What a crushing defeat... What to do...",
            "A2_N9_S1": "(Defeated... humiliated. He played me from the start. I'm not strong enough. I'll never be strong enough like this.)",
            "A2_N9_S2": "Get up. Your defeat is not an end, but a lesson. To defeat him, you must be reborn, stronger. Ascension will make you relive your journey from the beginning, but your legend, engraved in the stars, will give you a power he cannot imagine. You will lose your possessions, but you will keep your knowledge. It is the only way.",
            "A3_N1_S1": "There you are. Defeat was a necessary wound. You have reached the limits of this life. To fight Larry, you must not only heal. You must break yourself completely to be reforged in a brighter flame. This is the meaning of Ascension.",
            "A3_N1_S1_POST_ASCENSION": "You are back. Different. I feel the glow of your first Ascension. You made the right choice. Your past legend is not forgotten; it is etched in the firmament.",
            "A3_N1_S2": "As the ritual begins, you feel your body and mind unravel thread by thread, your history scattering like stardust. Then, the void. And finally, a new spark. You are at the beginning again, weak, but not empty.",
            "A3_N2_S1": "You are back. Different. Your past legend is now engraved in the firmament. Look. The Constellations are now yours, a power that not even Larry can take from you. Spend your first points, draw your new destiny.",
            "A3_N2_S2": "Good. The weeks to come will be a rediscovery. Every fight, every forged item will have a new flavor. Go, and become the weapon this world awaits.",
            "A3_N3_S1": "Your new power is raw, instinctive. It must be tested. Return to the forest near Sapwood, where it all began. Face the creatures that roam there. Show me that your flame has not died, but has been rekindled.",
            "A3_N3_S2": "(I feel it... The strength of the stars guides my strikes. It's the same strength as before, but... purer. More fundamental.)",
            "A3_N4_S1": "Combat is one thing, but creation is another. To understand Larry's Dissonance, I need to analyze it. I need a 'Harmonic Resonance Casing'. Kaelen has the plans, but only the most gifted artisans can craft it. Prove that you master the art of the forge.",
            "A3_N4_S2": "Perfect. This item will be invaluable to us. You are not only a force of destruction, but also of creation. This is important.",
            "A3_N5_S1": "Strength and craftsmanship are mastered. The mind remains. An ancient sanctuary was sealed by a riddle. No one has been able to enter for centuries. Inside is a lore tablet that could enlighten us on the nature of the Echoes. Go, and let your new wisdom guide you.",
            "A3_N5_S2": "The spirit... it was corrupted by loneliness and residual Dissonance. You have freed it. And the tablet... yes, this is exactly what I was looking for. Well done.",
            "A3_N6_S1": "I have everything I need. The casing you forged, the tablet from this sanctuary... Your actions are no longer simple quests, they weigh on reality. Your legend grows, and I... oh no.",
            "A3_N6_S2": "By the stars... I feel it. A wave of Dissonance, cold and inquisitive, is heading straight for Sapwood. It's not chaotic corruption... it's intention. It's a response.",
            "A3_N7_S1": "Help! A creature... it's unlike anything we've seen! It appeared in the center of the village and is destroying everything in its path! It... it seems to be looking for you!",
            "A3_N7_S2": "(This was just a taste. A mere fraction of his power. He knows I'm here. And he's waiting for me.)",
            "A3_N8_S1": "The creature has left a trail of pure Dissonance, a glacial path that leads to the peaks of the Everfrost Mountains. That is where the Judge awaits you. It is an inevitable duel. Be ready.",
            "A3_N9_S1": "(This creature... it is made of black crystal and silence. It exudes no hatred, only the weight of a verdict. It is the Dissonant Judge. This is a duel between my new destiny and the will of my tormentor.)",
            "A3_N9_S2": "You did it! The Judge has shattered into a million silent shards. The Ascension... it was the right decision. The game has changed. Now, the real war begins.",
            "A4_N1_S1": "The heavens are tearing apart. Larry is no longer playing. Your act of Ascension has provoked him beyond his limits. This is the Awakening of Dissonance.",
            "A4_N1_S2": "Rifts are opening, right here in Sapwood! Creatures... no, fragments of pure energy are emerging from them! The world is twisting!",
            "A4_N1_S3": "(This is total war. He's not looking for me anymore, he's trying to destroy everything I protect.)",
            "A4_N2_S1": "These crystalline entities are pure manifestations of Dissonance. Every fragment you destroy will teach us more about the composition of this unholy force. Go, and collect them.",
            "A4_N2_S2": "Interesting... The Dissonance is not as chaotic as it seems. There is a structure, a rhythm... reversed.",
            "A4_N3_S1": "A huge rift threatens to engulf the ruins of an ancient temple. A guardian, transformed by this energy, defends it. We must defeat it to study the rift more closely.",
            "A4_N3_S2": "(This creature... it was a seal, not a sentinel. Larry has perverted its function.)",
            "A4_N4_S1": "These symbols on the seal... they are Runes! They can channel and amplify energies. Larry is using them. You must learn them, equip them, make them your own to understand how to counter him.",
            "A4_N4_S2": "Good. I feel the resonance of the Runes within you. The portal is reacting. You now understand the melody that Larry wants to corrupt.",
            "A4_N5_S1": "Who are you?! Another of Larry's puppets?! No... Your constellations... By the Harmony, you are an Ascended! But the Order... It has fallen! Larry has corrupted it!",
            "A4_N5_S2": "Kormac?! A Guardian of Harmony? I thought you all perished. The Dissonance is more complex than I thought.",
            "A4_N5_S3": "I saw him corrupt my brothers. He turned them into instruments. I must understand how. I must purify them... or free them.",
            "A4_N6_S1": "Kormac is right. Larry doesn't destroy, he transforms. To understand how to purify, we need ancient harmonic artifacts. They are scattered in these corrupted zones, guarded by his creations.",
            "A4_N6_S2": "Each artifact is a note of the ancient melody. Larry is rewriting them. We must find the original score to counter him.",
            "A4_N7_S1": "So, Ascended. Kormac wants to annihilate Larry's Dissonance. I, however, believe it can be retuned, brought back to Harmony. What is your choice? Do you see Larry as a pure destroyer, or a blind composer?",
            "A4_N7_S1_CHOICE_DETRUIRE": "Larry is a destroyer. I will annihilate him.",
            "A4_N7_S1_CHOICE_REACCORDER": "Larry is a composer. I will force him to retune his melody.",
            "A4_N7_S2": "Your choice is made. It will shape our approach. Larry feels your intention, whatever it may be. He is already sending his response.",
            "A4_N8_S1": "A Weapon of Larry! A humanoid creature forged from Dissonance itself. It is here to intercept you. Show it the strength of your choice, Ascended!",
            "A4_N8_S2": "Impressive. His weapon has shattered. Larry knows you are powerful, but he does not understand your choice. This will make him reckless.",
            "A4_N9_S1": "I've located him! He is in one of his corrupted Harmony chambers, where he amplifies the Dissonance. It is time for the final confrontation of this act.",
            "A4_N9_S2": "Welcome, my little toy. You have chosen your path. Now, witness mine. Behold my greatest work, my masterpiece. The Corrupted Harmonist!",
            "A4_N10_S1": "You thought you could defeat me? You have merely silenced a single note. The symphony continues. I am the composer of this new cosmos, and you are but a dissonant. But I must admit, you are an interesting dissonant.",
            "A4_N10_S2": "He escaped... but we have won a major battle. Larry is not just a player. He is the composer of a new cosmos, and we are but the final obstacles to his symphony of chaos."
        },
        "lore": {
            "A1_N1_INTRO": "Your story begins in Sapwood Hamlet, a peaceful village troubled by a 'Dissonance' that drives beasts mad. Master Elian, the village sage, tests you before entrusting you with the task of discovering the origin of this corruption.",
            "A1_N2_LOUPS": "Your first foray into the forest confirms Elian's words. You face wolves whose eyes glow with a purple light, not driven by hunger, but by a pure madness that seems to throw nature itself out of tune.",
            "A1_N3_FORGERON": "The trail leads you to Kaelen, the village blacksmith, abducted by goblins. Strangely, they are not torturing him but seem fascinated by his tools. As thanks for his rescue, the village opens its gates to you.",
            "A1_N4_PORTE_FORGE": "Before he can analyze the mysterious ore he found, Kaelen needs his workshop. Your first task is to help him gather the materials to rebuild his forge, the beating heart of the village.",
            "A1_TUTO_FORGE_1": "After helping Kaelen rebuild his forge, he offers to teach you the basics of crafting, an essential skill for any adventurer wishing to survive the dangers of this world.",
            "A1_TUTO_FORGE_2": "Theory is not enough. Kaelen challenges you to put your new knowledge into practice by forging your very first piece of equipment.",    
            "A1_N5_HEROIC_ACT": "With the forge relit, Kaelen reveals that the goblins were just a diversion. The real threat comes from the mine: ancient stone Guardians have been awakened by the Dissonance. By defeating them, your heroic act earns you the grant of the abandoned Fief by the village council.",
            "A1_N6_MINE": "Now that the Fief is yours, Kaelen asks you to return to the secured mine to finally retrieve a sample of the ore. A final guardian, eroded by corruption, protects the lode.",
            "A1_N7_FRAGMENT": "By defeating the Guardian, you discover an Echo Fragment that gives you a strange vision. Its energy has attracted Lysandra, an archivist who reveals the scale of the problem.",
            "A1_N8_ALCHIMISTE": "You help Lysandra rescue her friend Alaric, an alchemist, in the swamps. He joins your cause and settles in the village, unlocking Alchemy.",
            "A1_N9_SANCTUAIRE": "Guided by Lysandra, you solve the riddle of the Forgotten Sanctuary and defeat its corrupted guardian to obtain a second Echo Fragment.",
            "A1_N10_LARRY": "At the moment of your victory, an individual named Larry appears. He reveals that the Dissonance is his work, a mere game for him. The threat is much greater than you imagined.",
            "A2_N1_PONT_LA_CROISEE": "The hunt for Larry leads you to the city of Crossbridge. There you meet Gaston, the warm-hearted owner of the 'Laughing Boar' inn, who teaches you the basics of cooking in exchange for a favor.",
            "A2_N2_RENOMMEE": "Your growing reputation attracts the attention of the city guard. Recognizing your worth, they establish the Bounty Board, giving you access to new challenges and rewards.",
            "A2_N3_GATE_CHASSEUR": "Lysandra discovers that Larry doesn't just corrupt, he 'mutates' creatures. To understand this process, you need a rare component. This forces you to prove your worth as a hunter by completing a 'Medium' difficulty bounty.",
            "A2_N4_MAITRESSE_CHASSEUSE": "Your success opens the doors to the Huntress Master. By proving you can obtain the rarest components, she agrees to help you and gives you access to her exclusive set equipment shop.",
            "A2_N5_GATE_FORGE": "Larry's trail leads you to an enchanter's tower, sealed by ancient magic that can only be broken by high-level craftsmanship. You must upgrade your forge to level 3 to continue.",
            "A2_N6_TOUR_DE_SILAS": "You meet Silas, Larry's former master. He reveals the nature of his apprentice's madness: Larry doesn't want to destroy the world, but to 'perfect' it with Dissonance. To help you, Silas teaches you the secrets of Enchanting.",
            "A2_N7_LABO_LARRY": "You finally corner Larry. The fight is a humiliation: he toys with you, demonstrating a mastery of Dissonance that is beyond your comprehension. He forces you to survive his assaults without being able to touch him.",
            "A2_N8_BOSS": "After showing you your powerlessness, Larry escapes, leaving you a 'gift': one of his most powerful mutated creations, a Chimera, which serves as the act's final boss.",
            "A2_N9_REVELATION_ASCENSION": "Defeated and battered, you understand that you have reached the limits of your current power. Lysandra confirms it: to have a chance against Larry, you must transcend your mortal condition. Ascension is your only option.",
            "A3_N1_RITUEL": "After your defeat, you accept the terrible choice of Ascension: abandoning all your progress for a promise of future power. The ritual resets you to level 1, but your past legend is not forgotten.",
            "A3_N2_CONSTELLATIONS": "Your rebirth gives you access to the Celestial Constellations. Guided by Lysandra, you learn to draw on the strength of your past life to unlock powerful permanent talents.",
            "A3_N3_ETINCELLE": "Your first mission as an Ascended is a test. Lysandra sends you to clear a corrupted grove so you can measure the extent of your new power.",
            "A3_N4_ARTIFICE": "To advance her research, Lysandra needs a complex object. This quest pushes you to reinvest in craftsmanship, proving that your new life is not just about destruction.",
            "A3_N5_ENIGME": "Strength and craftsmanship are not enough. This mission tests your mind, forcing you to solve a riddle to access ancient knowledge, guarded by a tormented spirit.",
            "A3_N6_ANALYSE": "With the fruits of your efforts, Lysandra begins to analyze the deep nature of Dissonance. But it is your growing power that attracts unwanted attention.",
            "A3_N7_HERAUT": "Larry has sensed your 'glow' of Ascension and is not pleased. He sends a Herald, a powerful creature, to attack Sapwood and issue a direct challenge to you.",
            "A3_N8_PISTE": "After repelling the Herald, a trail of pure Dissonance leads you towards the mountains. The message is clear: this was just a warning, the real judge awaits you.",
            "A3_N9_BOSS": "The Dissonant Judge is a creature designed by Larry to counter the powers of 'ascended' beings. The fight is the true test of your new power and the constellation choices you have made.",
            "A4_N1_EFFONREMENT": "Your victory over the Dissonant Judge signaled the start of an all-out war. Larry, furious, unleashes the Awakening of Dissonance, opening rifts in reality and overwhelming the world with waves of chaos.",
            "A4_N2_FRAGMENTS": "Fragments of pure dissonant energy emerge from the rifts. You must hunt and destroy them to understand their nature, aided by Lysandra who seeks to unlock the secrets of this twisted energy.",
            "A4_N3_SEAU": "A Locked Guardian, corrupted by Dissonance, protects a major rift in an ancient temple. By defeating it, you stabilize the rift and Lysandra discovers Runes, ancient symbols capable of channeling energy.",
            "A4_N4_PORTAIL": "Lysandra entrusts you with the task of mastering the Runes. By equipping three of them, you prove your understanding and feel the portal you sealed react to your new power. This is the first step towards a new form of magic.",
            "A4_N5_INTRUSION": "Kormac, a surviving Guardian of Harmony, emerges from a secondary portal. He reveals the corruption of his Order by Larry and warns you of the 'composer's' growing power. An unexpected alliance is forged.",
            "A4_N6_ANCIEN": "Guided by Kormac, you collect ancient Harmonic Artifacts. These relics could hold the key to understanding how Larry transforms and corrupts beings, rather than simply destroying them.",
            "A4_N7_REFLEXION": "The discoveries lead to a philosophical debate: is Larry a destroyer to be annihilated, or a composer whose melody can be retuned? Your choice shapes your approach and sets the stage for what comes next.",
            "A4_N8_ARME": "Larry reacts to your progress by sending a 'Weapon' forged of pure Dissonance to intercept you. This fight is a test of your philosophy and power, showing Larry that you are a formidable opponent.",
            "A4_N9_CONFRONTATION": "Lysandra locates Larry in a corrupted Harmony chamber. He awaits you there, no longer with amusement, but with sinister anticipation. He is ready to show you his 'greatest work'.",
            "A4_N10_BOSS": "The final battle of the act pits you against the Corrupted Harmonist, an elder of Kormac's Order, transformed into a monster of Dissonance. Larry escapes, but your victory proves you are much more than a mere pawn; you are now a counter-composer in his symphony of chaos."
        },
"choices": {
    "A1_N1_S1_CHOICE": {
        "title": "What is your reply?",
        "options": [
            { "textKey": "adventure.choices.A1_N1_S1_CHOICE_BRAVE", "value": "BRAVE" },
            { "textKey": "adventure.choices.A1_N1_S1_CHOICE_PRUDENT", "value": "PRUDENT" },
            { "textKey": "adventure.choices.A1_N1_S1_CHOICE_SILENT", "value": "SILENT" }
        ]
    },
    "A1_N1_S1_CHOICE_BRAVE": "I'm not afraid. Tell me where to find these beasts.",
    "A1_N1_S1_CHOICE_PRUDENT": "What do you know about this corruption?",
    "A1_N1_S1_CHOICE_SILENT": "(Observe Elian and wait for him to continue.)",

    "A1_TUTO_FORGE_1_CHOICE": {
        "title": "Ask Kaelen a question",
        "options": [
            { "textKey": "adventure.choices.A1_TUTO_FORGE_1_S2_Q1", "value": "A1_TUTO_FORGE_1_S2_Q1" },
            { "textKey": "adventure.choices.A1_TUTO_FORGE_1_S2_Q2", "value": "A1_TUTO_FORGE_1_S2_Q2" }
        ]
    },
    "A1_TUTO_FORGE_1_S2_Q1": "How does it work?",
    "A1_TUTO_FORGE_1_S2_Q2": "Where do I find the materials?",
    
    "A1_N3_S1_CHOICE": {
        "title": "What to say to Kaelen?",
        "options": [
            { "textKey": "adventure.choices.A1_N3_S1_CHOICE_PRAGMATIC", "value": "PRAGMATIC" },
            { "textKey": "adventure.choices.A1_N3_S1_CHOICE_CURIOUS", "value": "CURIOUS" }
        ]
    },
    "A1_N3_S1_CHOICE_PRAGMATIC": "The important thing is that you are safe and sound, Kaelen.",
    "A1_N3_S1_CHOICE_CURIOUS": "Tell me about this ore you found.",
    
    "A1_N7_S2_CHOICE": {
        "title": "What to say to Lysandra?",
        "options": [
            { "textKey": "adventure.choices.A1_N7_S2_CHOICE_BRAVE", "value": "BRAVE" },
            { "textKey": "adventure.choices.A1_N7_S2_CHOICE_PRUDENT", "value": "PRUDENT" }
        ]
    },
    "A1_N7_S2_CHOICE_BRAVE": "A... Fracture? A Dissonance? I don't understand any of this.",
    "A1_N7_S2_CHOICE_PRUDENT": "What should we do now?",

    "A1_N8_S1_CHOICE": {
        "title": "How to react?",
        "options": [
            { "textKey": "adventure.choices.A1_N8_S1_CHOICE_HEROIC", "value": "HEROIC" },
            { "textKey": "adventure.choices.A1_N8_S1_CHOICE_STRATEGIC", "value": "STRATEGIC" }
        ]
    },
    "A1_N8_S1_CHOICE_HEROIC": "One of your allies is in danger. Let's go.",
    "A1_N8_S1_CHOICE_STRATEGIC": "His knowledge could be useful to us.",

    "A1_N9_PUZZLE_CHOICE": {
        "title": "What is your answer to the riddle?",
        "options": [
            { "textKey": "adventure.choices.A1_N9_PUZZLE_CHOICE_1", "value": "1" },
            { "textKey": "adventure.choices.A1_N9_PUZZLE_CHOICE_2", "value": "2" },
            { "textKey": "adventure.choices.A1_N9_PUZZLE_CHOICE_3", "value": "3" }
        ]
    },
    "A1_N9_PUZZLE_CHOICE_1": "Silence",
    "A1_N9_PUZZLE_CHOICE_2": "Symphony",
    "A1_N9_PUZZLE_CHOICE_3": "Dissonance",

    "A1_N10_S2_CHOICE": {
        "title": "How to confront Larry?",
        "options": [
            { "textKey": "adventure.choices.A1_N10_S2_CHOICE_BRAVE", "value": "BRAVE" },
            { "textKey": "adventure.choices.A1_N10_S2_CHOICE_PRUDENT", "value": "PRUDENT" }
        ]
    },
    "A1_N10_S2_CHOICE_BRAVE": "(Rage) Whoever you are, you will pay for this!",
    "A1_N10_S2_CHOICE_PRUDENT": "What is your logic? Why do all this?",

    "A2_N6_S1_CHOICE": {
        "title": "What to say to Silas?",
        "options": [
            { "textKey": "adventure.choices.A2_N6_S1_CHOICE_COMPASSION", "value": "COMPASSION" },
            { "textKey": "adventure.choices.A2_N6_S1_CHOICE_MENACE", "value": "MENACE" }
        ]
    },
    "A2_N6_S1_CHOICE_COMPASSION": "I seek to stop the madness he is spreading. Help me.",
    "A2_N6_S1_CHOICE_MENACE": "You are his master. Tell me how to find him, or I will consider you his accomplice.",
    "A3_N1_S1_CHOICE_ACCEPTER": "I am ready. I will do what it takes.",
    "A3_N1_S1_CHOICE_HESITER": "To lose everything... that is a heavy burden.",
    "A4_N7_S1_CHOICE": {
        "title": "How do you see Larry?",
        "options": [
            { "text": "Larry is a destroyer. I will annihilate him.", "value": "A4_N7_S1_CHOICE_DETRUIRE" },
            { "text": "Larry is a composer. I will force him to retune his melody.", "value": "A4_N7_S1_CHOICE_REACCORDER" }
        ]
    }
},
        "prerequisites": {
            "A1_N4": "Kaelen is grateful, but he can't do anything without his forge. Go to the 'Village' tab and build the Forge (Level 1).",
            "A1_TUTO_EXPEDITION_2": "Elian awaits your return. Go to the 'Expeditions' tab and complete any expedition to continue.",
            "A1_TUTO_FIEF_2": "Elian has advised you to develop your domain. Go to the 'Fief' tab and build a Sawmill (Level 1).",
            "A1_TUTO_ALCHIMIE_2": "Alaric wants to test your skills. Go to the 'Village' -> 'Alchemist' tab and brew a Minor Healing Potion.",
            "A1_TUTO_FORGE_2": "To complete this tutorial, go to the 'Village' -> 'Forge' tab and craft any 'Common' quality item.",
            "A2_N1": "Gaston needs 1500 Wood for his stock. You can get it from Expeditions or your Fief.",
            "A2_N3": "The Huntress Master only receives seasoned hunters. Prove your worth by completing at least one 'Medium' difficulty bounty or higher.",
            "A2_N4_ITEM": "To analyze the mutation, the Huntress needs a Golem's heart. You can find them on Stone Golems.",
            "A2_N5": "Silas's tower is protected by a powerful arcane seal. Only a master blacksmith can create a tool capable of breaking it. Upgrade your Forge to level 3.",
            "A3_N1_ASCENSION": "You must reach Ascension Level 1 to begin this act. Use the Ascension (⭐) feature from the main screen once you reach level 100.",
            "A3_N4_FORGE": "Objective: Forge an item of 'Rare' quality or higher to prove your mastery.",
            "A4_N4_RUNES": "Objectiv: Equip at least 3 Runes on your items to master this new power."
        },
        "answers": {
            "puzzleA1_N9": "dissonance",
            "puzzleA3_N5": "the echo" // <-- AJOUTER
        },
        "puzzles": {
            "A1_N9_P1": "The door is sealed by ancient magic. An inscription is engraved: 'The world is a grand melody, but its beauty is born from its fragility. What is the name of its...?'",
            "A1_N9_HINT": "Hint: Remember Master Elian's first words.",
            "A3_N5_P1": "A voice resonates in the ruins: 'I have no body, but I answer. I have no lungs, but I travel with the wind. What am I?'", // <-- J'ai inventé un texte pour l'énigme
            "A3_N5_HINT": "Hint: Think of a sound that repeats in mountains or large halls." // <-- AJOUTER
        },
        "alerts": {
            "fief_unlocked": "The Fief is now available! Access it from the main screen.",
            "alchemist_unlocked": "The Alchemist has joined your village!",
            "village_unlocked": "The Village opens its gates to you! Explore it from the bottom panel.",
            "prerequisite_not_met": "The condition is not yet met.",
            "puzzle_success": "The answer is correct!",
            "puzzle_failure": "The door remains sealed...",
            "no_dialogue_history": "This place contains no dialogue to review.",
            "no_lore_available": "No story context is available for this chapter.",
            "act_1_completed": "Congratulations! You have completed Act 1."
        },
        "ui": {
            "answer_placeholder": "Your answer...",
            "dialogue_history_title": "History: {nodeName}",
            "history_tab": "History",
            "lore_tab": "Lore",
            "act1": "Act 1",
            "act2": "Act 2"
        }
    },
    "frames": { // NEW BLOCK
        "default": {
            "name": "Default Frame",
            "description": "The basic frame for any adventurer."
        },
        "cadre_loyaute": {
            "name": "Frame of Loyalty",
            "description": "A frame obtained as a sign of dedication to one's guild."
        },
        "supporter": {
            "name": "Patron's Frame",
            "description": "A special frame for those who support the game."
        },
        "ascended_master": {
            "name": "Ascended Master Frame",
            "description": "Unlocked by reaching Ascension Level 10."
        }
    },
    "daily_missions": {
        "expeditions": {
            "name": "Launch 3 expeditions"
        },
        "bosses": {
            "name": "Defeat 1 boss"
        },
        "crafts": {
            "name": "Craft 1 item"
        }
    }
  } // en
}; //locales
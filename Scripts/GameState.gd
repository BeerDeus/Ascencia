extends Node

# Dictionnaire centralisant toutes les ressources d'objets préchargées
var item_database: Dictionary = {}

# --- STATS DU JOUEUR ---
var joueur_nom: String = "Aventurier"
var joueur_pv_max: int = 100
var joueur_pv_actuels: int = 100
var or_actuel: int = 0

# Variables pour la régénération (2 PV toutes les 60 secondes)
var temps_regeneration: float = 0.0
const INTERVALLE_REGENT: float = 60.0
const VALEUR_REGENT: int = 2

# --- COMPÉTENCES & EXP ---
var combat_niveau: int = 1
var combat_xp: int = 0
var minage_niveau: int = 1
var minage_xp: int = 0

# --- INVENTAIRE ---
var inventaire: Dictionary = {
	"eclats_pierre": 5,
	"viande_crue": 0
}

# Capacité de base de la grille d'inventaire
var max_emplacements: int = 10

# Slots d'équipement actifs du joueur (Clé = Emplacement, Valeur = ID de l'objet)
var equipement: Dictionary = {
	"casque": "",
	"consommable": "", # Slot en haut à droite pour la nourriture rapide
	"arme": "",
	"plastron": "",
	"bouclier": "",
	"anneau_1": "",
	"jambieres": "",
	"anneau_2": "",
	"bottes": "",
	"amulette": "",
	"acc_1": "",
	"acc_2": "",
	"acc_3": ""
}

# --- PROGRESSION ET AUTO-BATTLE (Cahier des charges V2.1) ---
var monstres_kills: Dictionary = {
	"slime_seve": 0,
	"jeune_loup": 0,
	"gobelin_eclaireur": 0,
	"chauve_souris_cristal": 0
}

var endurance_max: int = 100
var endurance_actuelle: int = 100

# Fichier: res://Scripts/GameState.gd
func _ready() -> void:
	print("--- ASCENCIA ---")
	# Scan automatique et performant de tous les sous-dossiers d'items
	_charger_items_dossier_rec("res://Donnees/Items")
	print("Base de données d'items initialisée : ", item_database.size(), " objets chargés.")
	
	print("GameState initialisé avec succès. Prêt pour l'aventure.")
	
	var mon_slime = load("res://Donnees/Monstres/SlimeSeve.tres")
	
	print("\n--- SIMULATION DE COMBAT ---")
	for i in range(10):
		print("\n--- Combat numéro ", i + 1, " ---")
		# Simulation de mort
		enregistrer_mort_monstre(mon_slime, false)

# Fonction récursive optimisée pour scanner les dossiers, compatible export mobile (.remap)
# Fichier: res://Scripts/GameState.gd
# Fonction récursive optimisée pour scanner les dossiers, compatible export mobile (.remap)
func _charger_items_dossier_rec(chemin: String) -> void:
	var dir = DirAccess.open(chemin)
	if dir:
		dir.list_dir_begin()
		var file_name = dir.get_next()
		while file_name != "":
			if dir.current_is_dir():
				if not file_name.begins_with("."):
					_charger_items_dossier_rec(chemin + "/" + file_name)
			else:
				if file_name.ends_with(".tres") or file_name.ends_with(".tres.remap"):
					var clean_name = file_name.replace(".tres.remap", "").replace(".tres", "")
					var chemin_complet = chemin + "/" + clean_name + ".tres"
					
					var res = load(chemin_complet)
					# FIX : On utilise res.id (ex: "peau_slime") au lieu de clean_name
					if res is ItemResource and res.id != "":
						item_database[res.id] = res
			file_name = dir.get_next()
		dir.list_dir_end()
		
# Gère l'ajout/retrait d'items et nettoie immédiatement les entrées à 0
func modifier_quantite_item(item_id: String, montant: int) -> void:
	if not inventaire.has(item_id):
		inventaire[item_id] = 0
		
	inventaire[item_id] += montant
	
	# Règle d'optimisation mobile : si quantité <= 0, on libère la mémoire
	if inventaire[item_id] <= 0:
		inventaire.erase(item_id)
		
# --- NOUVELLE FONCTION _PROCESS POUR LA RÉGÉNÉRATION PASSIVE ---
func _process(delta: float) -> void:
	# La régénération s'active seulement si le joueur est blessé et vivant
	if joueur_pv_actuels > 0 and joueur_pv_actuels < joueur_pv_max:
		temps_regeneration += delta
		if temps_regeneration >= INTERVALLE_REGENT:
			temps_regeneration = 0.0
			recevoir_soins(VALEUR_REGENT)

# --- NOUVELLES FONCTIONS DE GESTION DES PV ---
func recevoir_degats(montant: int) -> void:
	joueur_pv_actuels -= montant
	joueur_pv_actuels = clamp(joueur_pv_actuels, 0, joueur_pv_max)
	print("🩸 PV du joueur mis à jour : ", joueur_pv_actuels, "/", joueur_pv_max)
	if joueur_pv_actuels <= 0:
		print("💀 Le joueur est KO !")

func recevoir_soins(montant: int) -> void:
	joueur_pv_actuels += montant
	joueur_pv_actuels = clamp(joueur_pv_actuels, 0, joueur_pv_max)
	print("💚 Régénération passive : +", montant, " PV (Total: ", joueur_pv_actuels, ")")


# --- TES FONCTIONS DE BASE INCHANGÉES ---
# Fichier: res://Scripts/GameState.gd
func enregistrer_mort_monstre(monstre: MonstreResource, est_un_boss: bool) -> void:
	print("Bravo ! Vous avez vaincu : ", monstre.nom)
	
	combat_xp += monstre.xp_donnee
	print("XP de Combat actuelle : ", combat_xp)
	
	for loot_entry in monstre.table_loot:
		if loot_entry == null or loot_entry.item == null:
			continue
			
		if randf_range(0.0, 100.0) <= loot_entry.chance_pourcentage:
			var quantite_gagnee = randi_range(1, loot_entry.quantite_max)
			var item_id = loot_entry.item.id
			
			# Utilisation du helper pour un inventaire propre et compact
			modifier_quantite_item(item_id, quantite_gagnee)
			
			# Utilise une valeur de secours si l'inventaire vient d'être nettoyé ou n'a pas la clé
			var total_actuel = inventaire.get(item_id, 0)
			print("Loot obtenu ! ", loot_entry.item.nom, " x", quantite_gagnee, " (Total : ", total_actuel, ")")
	
	if not est_un_boss:
		if monstres_kills.has(monstre.id):
			monstres_kills[monstre.id] += 1
		else:
			monstres_kills[monstre.id] = 1
			
		print("Nombre de kills pour ", monstre.nom, " : ", monstres_kills[monstre.id])
		
		if monstres_kills[monstre.id] == 10:
			print("🔥 AUTO-BATTLE DÉBLOQUÉ pour le monstre : ", monstre.nom, " !")
	else:
		print("👑 Boss vaincu ! Zone complétée.")

# Fichier: res://Scripts/GameState.gd
# Gère l'équipement d'un objet et renvoie l'ancien équipement dans l'inventaire
# Équipe un objet dans un emplacement précis et gère le remplacement
func equiper_item(item_id: String, slot_cible: String) -> void:
	if not item_database.has(item_id): return
	var item: ItemResource = item_database[item_id]
	
	# Si un objet occupe déjà l'emplacement, on le déséquipe proprement d'abord
	if equipement.has(slot_cible) and equipement[slot_cible] != "":
		desequiper_item(slot_cible)
		
	# Installation du nouvel équipement
	equipement[slot_cible] = item_id
	
	# ARCHITECTURE MOBILE : Les consommables agissent comme des raccourcis pointant vers l'inventaire.
	# On ne réduit la quantité (-1) que pour les équipements uniques (Armes, Armures...).
	if item.type_item != ItemResource.TypeItem.CONSOMMABLE:
		modifier_quantite_item(item_id, -1)
		
	print("🛡️ Équipement mis à jour : ", item.nom, " placé dans le slot : ", slot_cible)
	
func desequiper_item(slot: String) -> void:
	if not equipement.has(slot) or equipement[slot] == "": return
	
	var item_id = equipement[slot]
	var item: ItemResource = item_database.get(item_id)
	
	equipement[slot] = ""
	
	# On ne réinjecte l'objet (+1) dans l'inventaire que s'il n'était pas un simple raccourci
	if item and item.type_item != ItemResource.TypeItem.CONSOMMABLE:
		modifier_quantite_item(item_id, 1)
		
	print("🔓 Objet retiré du slot : ", slot)
	
func vendre_item(item_id: String, quantite: int) -> void:
	if not inventaire.has(item_id): return
	var quantite_dispo = inventaire[item_id]
	var quantite_a_vendre = clamp(quantite, 1, quantite_dispo)
	
	if item_database.has(item_id):
		var item: ItemResource = item_database[item_id]
		or_actuel += item.valeur_or * quantite_a_vendre
		modifier_quantite_item(item_id, -quantite_a_vendre)
		print("🪙 Transaction effectuée : Vente de ", quantite_a_vendre, "x ", item.nom)

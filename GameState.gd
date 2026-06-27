extends Node

# --- STATS DU JOUEUR ---
var joueur_nom: String = "Aventurier"
var joueur_pv_max: int = 100
var joueur_pv_actuels: int = 100
var or_actuel: int = 0

# --- COMPÉTENCES & EXP ---
var combat_niveau: int = 1
var combat_xp: int = 0
var minage_niveau: int = 1
var minage_xp: int = 0

# --- INVENTAIRE ---
# Structure : {"nom_item": quantite}
var inventaire: Dictionary = {
	"eclats_pierre": 5,
	"viande_crue": 0
}

# --- PROGRESSION ET AUTO-BATTLE (Cahier des charges V2.1) ---
# Compteur de kills par monstre pour valider les paliers et l'auto-battle
var monstres_kills: Dictionary = {
	"slime_seve": 0,
	"jeune_loup": 0,
	"gobelin_eclaireur": 0,
	"chauve_souris_cristal": 0
}

# Système d'endurance pour l'Auto-Battle
var endurance_max: int = 100
var endurance_actuelle: int = 100

func _ready() -> void:
	print("--- ASCENCIA ---")
	print("GameState initialisé avec succès. Prêt pour l'aventure.")
	
	# On charge ton fichier de slime pour le test
	var mon_slime = load("res://Donnees/Monstres/SlimeSeve.tres")
	
	# On simule 10 kills d'affilée pour tester ton palier de cahier des charges !
	print("\n--- SIMULATION DE COMBAT ---")
	for i in range(10):
		print("\n--- Combat numéro ", i + 1, " ---")
		enregistrer_mort_monstre(mon_slime, false)
	
# Fonction appelée par le système de combat à la mort d'un monstre
func enregistrer_mort_monstre(monstre: MonstreResource, est_un_boss: bool) -> void:
	print("Bravo ! Vous avez vaincu : ", monstre.nom)
	
	# 1. Donner l'XP
	combat_xp += monstre.xp_donnee
	print("XP de Combat actuelle : ", combat_xp)
	
	# 2. Gérer le butin (Loot) - Version V2.2 (Ressources d'Items)
	for loot_entry in monstre.table_loot:
		if loot_entry == null or loot_entry.item == null:
			continue
			
		# On jette le dé pour le pourcentage
		if randf_range(0.0, 100.0) <= loot_entry.chance_pourcentage:
			# On détermine la quantité aléatoire entre 1 et le max défini
			var quantite_gagnee = randi_range(1, loot_entry.quantite_max)
			var item_id = loot_entry.item.id
			
			if not inventaire.has(item_id):
				inventaire[item_id] = 0
			inventaire[item_id] += quantite_gagnee
			
			print("Loot obtenu ! ", loot_entry.item.nom, " x", quantite_gagnee, " (Total : ", inventaire[item_id], ")")
	
	# 3. Mettre à jour le dictionnaire de progression (Paliers V2.1)
	if not est_un_boss:
		if monstres_kills.has(monstre.id):
			monstres_kills[monstre.id] += 1
		else:
			monstres_kills[monstre.id] = 1
			
		print("Nombre de kills pour ", monstre.nom, " : ", monstres_kills[monstre.id])
		
		# Vérifier si l'Auto-battle vient de se débloquer
		if monstres_kills[monstre.id] == 10:
			print("🔥 AUTO-BATTLE DÉBLOQUÉ pour le monstre : ", monstre.nom, " !")
	else:
		print("👑 Boss vaincu ! Zone complétée.")
		# Ici on ajoutera la logique pour débloquer la zone suivante

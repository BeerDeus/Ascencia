extends Node

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

# --- PROGRESSION ET AUTO-BATTLE (Cahier des charges V2.1) ---
var monstres_kills: Dictionary = {
	"slime_seve": 0,
	"jeune_loup": 0,
	"gobelin_eclaireur": 0,
	"chauve_souris_cristal": 0
}

var endurance_max: int = 100
var endurance_actuelle: int = 100

func _ready() -> void:
	print("--- ASCENCIA ---")
	print("GameState initialisé avec succès. Prêt pour l'aventure.")
	
	var mon_slime = load("res://Donnees/Monstres/SlimeSeve.tres")
	
	print("\n--- SIMULATION DE COMBAT ---")
	for i in range(10):
		print("\n--- Combat numéro ", i + 1, " ---")
		enregistrer_mort_monstre(mon_slime, false)

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
			
			if not inventaire.has(item_id):
				inventaire[item_id] = 0
			inventaire[item_id] += quantite_gagnee
			
			print("Loot obtenu ! ", loot_entry.item.nom, " x", quantite_gagnee, " (Total : ", inventaire[item_id], ")")
	
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

extends Control

# On crée des références vers nos 3 écrans (les variables débutent par @onready)
@onready var ecran_combat: Control = $VBoxContainer/ZoneContenu/EcranCombat
@onready var ecran_minage: Control = $VBoxContainer/ZoneContenu/EcranMinage
@onready var ecran_inventaire: Control = $VBoxContainer/ZoneContenu/EcranInventaire

func _ready() -> void:
	# Au lancement du jeu, on affiche par défaut l'écran de combat
	changer_onglet("combat")

# Fonction générique pour basculer d'un écran à un autre
func changer_onglet(nom_onglet: String) -> void:
	# Étape 1 : On cache absolument tout
	ecran_combat.visible = false
	ecran_minage.visible = false
	ecran_inventaire.visible = false
	
	# Étape 2 : On affiche uniquement l'onglet demandé
	match nom_onglet:
		"combat":
			ecran_combat.visible = true
		"minage":
			ecran_minage.visible = true
		"inventaire":
			ecran_inventaire.visible = true


func _on_bouton_combat_pressed() -> void:
	changer_onglet("combat")


func _on_bouton_minage_pressed() -> void:
	changer_onglet("minage")


func _on_bouton_inventaire_pressed() -> void:
	changer_onglet("inventaire")

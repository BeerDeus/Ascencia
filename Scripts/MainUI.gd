extends Control

@onready var zone_contenu: PanelContainer = $VBoxContainer/ZoneContenu
@onready var nav_bar: VBoxContainer = $VBoxContainer/NavBar

var ecran_actuel: Node = null

# Chemins mis à jour pour cibler le dossier Scènes
var scene_combat = preload("res://Scènes/EcranCombat.tscn")
var scene_minage = preload("res://Scènes/EcranMinage.tscn")
var scene_inventaire = preload("res://Scènes/EcranInventaire.tscn")

func _ready() -> void:
	nav_bar.menu_change.connect(_on_menu_change)
	nav_bar.sous_menu_change.connect(changer_ecran)
	
	# Lancement par défaut sur l'Aventure -> Combat
	nav_bar.afficher_sous_menu_aventure()
	changer_ecran("combat")

func changer_ecran(nom_ecran: String) -> void:
	# Nettoie l'écran précédent
	if ecran_actuel != null:
		ecran_actuel.queue_free()
		
	# Instancie le nouvel écran en fonction du choix
	match nom_ecran:
		"combat":
			ecran_actuel = scene_combat.instantiate()
		"minage":
			ecran_actuel = scene_minage.instantiate()
		"inventaire":
			ecran_actuel = scene_inventaire.instantiate()
			
	if ecran_actuel != null:
		zone_contenu.add_child(ecran_actuel)

func _on_menu_change(nom_menu: String) -> void:
	# Ici tu pourras gérer ce qu'il se passe si on clique sur Village, Social, etc.
	print("Changement de menu principal vers : ", nom_menu)

extends VBoxContainer

signal menu_change(nom_menu: String)
signal sous_menu_change(nom_sous_menu: String)

@onready var sous_menu = $SousMenu

func _ready() -> void:
	# On vide le sous-menu au démarrage
	vider_sous_menu()

func vider_sous_menu() -> void:
	for enfant in sous_menu.get_children():
		enfant.queue_free()

func afficher_sous_menu_aventure() -> void:
	vider_sous_menu()
	
	# Création dynamique des boutons du sous-menu Aventure
	var btn_combat = Button.new()
	btn_combat.text = "Combat"
	btn_combat.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	btn_combat.pressed.connect(func(): emit_signal("sous_menu_change", "combat"))
	
	var btn_minage = Button.new()
	btn_minage.text = "Minage"
	btn_minage.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	btn_minage.pressed.connect(func(): emit_signal("sous_menu_change", "minage"))
	
	sous_menu.add_child(btn_combat)
	sous_menu.add_child(btn_minage)
	
func afficher_sous_menu_profil() -> void:
	vider_sous_menu()
	
	var btn_inventaire = Button.new()
	btn_inventaire.text = "Inventaire"
	btn_inventaire.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	btn_inventaire.pressed.connect(func(): emit_signal("sous_menu_change", "inventaire"))
	sous_menu.add_child(btn_inventaire)
	
	var btn_equipement = Button.new()
	btn_equipement.text = "Équipement"
	btn_equipement.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	btn_equipement.pressed.connect(func(): emit_signal("sous_menu_change", "equipement"))
	sous_menu.add_child(btn_equipement)
	
func afficher_sous_menu_village() -> void:
	vider_sous_menu()
	
	var btn_forge = Button.new()
	btn_forge.text = "Forge"
	btn_forge.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	btn_forge.pressed.connect(func(): emit_signal("sous_menu_change", "forge"))
	sous_menu.add_child(btn_forge)
	
	var btn_cuisine = Button.new()
	btn_cuisine.text = "Cuisine"
	btn_cuisine.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	btn_cuisine.pressed.connect(func(): emit_signal("sous_menu_change", "cuisine"))
	sous_menu.add_child(btn_cuisine)

# IMPORTANT : N'oublie pas d'aller dans NavBar.tscn, de cliquer sur ton BoutonVillage,
# et de connecter son signal "pressed" à cette fonction !
func _on_bouton_village_pressed() -> void:
	afficher_sous_menu_village()
	emit_signal("menu_change", "village")

# IMPORTANT : N'oublie pas d'aller dans NavBar.tscn, de cliquer sur ton BoutonProfil,
# et de connecter son signal "pressed" à cette fonction !
func _on_bouton_profil_pressed() -> void:
	afficher_sous_menu_profil()
	emit_signal("menu_change", "profil")

# N'oublie pas de connecter le signal "pressed" de ton BoutonAventure 
# depuis l'éditeur vers cette fonction !
func _on_bouton_aventure_pressed() -> void:
	afficher_sous_menu_aventure()
	emit_signal("menu_change", "aventure")

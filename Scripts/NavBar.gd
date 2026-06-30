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

# N'oublie pas de connecter le signal "pressed" de ton BoutonAventure 
# depuis l'éditeur vers cette fonction !
func _on_bouton_aventure_pressed() -> void:
	afficher_sous_menu_aventure()
	emit_signal("menu_change", "aventure")

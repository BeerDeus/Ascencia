extends Control

@onready var grille: GridContainer = $CenterContainer/GrilleEquipement

# Références pour la Modale
@onready var modal: PanelContainer = $ModalSelection
@onready var titre_modal: Label = $ModalSelection/VBoxModal/TitreModal
@onready var grille_modal: GridContainer = $ModalSelection/VBoxModal/ScrollModal/GrilleModal
@onready var btn_fermer: Button = $ModalSelection/VBoxModal/HBoxActions/BtnFermer
# NOUVEAU : Référence à la zone de défilement
@onready var scroll_modal: ScrollContainer = $ModalSelection/VBoxModal/ScrollModal

const LAYOUT_GRILLE = [
	"vide", "casque", "consommable",
	"arme", "plastron", "bouclier",
	"anneau_1", "jambieres", "anneau_2",
	"bottes", "amulette", "vide",
	"acc_1", "acc_2", "acc_3"
]

const TEXTES_SLOTS = {
	"casque": "CAS", "consommable": "CON",
	"arme": "ARM", "plastron": "PLA", "bouclier": "BOU",
	"anneau_1": "ANN", "jambieres": "JAM", "anneau_2": "ANN",
	"bottes": "BOT", "amulette": "AMU",
	"acc_1": "ACC", "acc_2": "ACC", "acc_3": "ACC"
}

var slot_en_cours_edition: String = ""

func _ready() -> void:
	modal.hide()
	
	# --- FIX UI : Forcer l'affichage du ScrollContainer et centrer la Modale ---
	scroll_modal.custom_minimum_size = Vector2(0, 250) # Force une hauteur de 250 pixels
	scroll_modal.size_flags_vertical = Control.SIZE_EXPAND_FILL # Prend l'espace disponible
	modal.set_anchors_and_offsets_preset(Control.PRESET_CENTER) # Centre proprement la modale au milieu de l'écran
	
	btn_fermer.pressed.connect(func(): modal.hide())
	afficher_equipement()

func afficher_equipement() -> void:
	for enfant in grille.get_children():
		enfant.queue_free()
		
	for slot_nom in LAYOUT_GRILLE:
		if slot_nom == "vide":
			var espace = Control.new()
			espace.custom_minimum_size = Vector2(60, 60)
			grille.add_child(espace)
			continue
			
		var btn_slot = Button.new()
		btn_slot.custom_minimum_size = Vector2(60, 60)
		btn_slot.clip_contents = true
		
		var item_id = GameState.equipement.get(slot_nom, "")
		
		if item_id != "" and GameState.item_database.has(item_id):
			var item_res: ItemResource = GameState.item_database[item_id]
			if item_res.icone_texture != null:
				var tex_rect = TextureRect.new()
				tex_rect.texture = item_res.icone_texture
				tex_rect.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
				tex_rect.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
				tex_rect.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
				btn_slot.add_child(tex_rect)
				
			# NOUVEAU : On affiche la quantité dynamique si l'objet est un Raccourci Consommable
			if item_res.type_item == ItemResource.TypeItem.CONSOMMABLE:
				var quantite = GameState.inventaire.get(item_id, 0)
				var lbl_qty = Label.new()
				lbl_qty.text = str(quantite)
				lbl_qty.add_theme_font_size_override("font_size", 12)
				lbl_qty.set_anchors_and_offsets_preset(Control.PRESET_BOTTOM_RIGHT)
				lbl_qty.position += Vector2(-4, -2)
				btn_slot.add_child(lbl_qty)
		else:
			btn_slot.text = TEXTES_SLOTS.get(slot_nom, "")
			btn_slot.modulate = Color(0.6, 0.6, 0.6, 0.8)
			
		btn_slot.pressed.connect(_ouvrir_modal_pour_slot.bind(slot_nom))
		grille.add_child(btn_slot)
		
# Convertit l'ID du slot (ex: anneau_1) en catégorie de recherche (ex: anneau)
func get_categorie_recherche(slot: String) -> String:
	if slot.begins_with("anneau"): return "anneau"
	if slot.begins_with("acc"): return "accessoire"
	return slot

func _ouvrir_modal_pour_slot(slot_nom: String) -> void:
	slot_en_cours_edition = slot_nom
	titre_modal.text = "Équiper : " + slot_nom.capitalize()
	
	var item_actuellement_equipe = GameState.equipement.get(slot_nom, "")
	
	var cat_recherche = get_categorie_recherche(slot_nom)
	
	for enfant in grille_modal.get_children():
		enfant.queue_free()
		
	# --- NOUVEAU : Fusionner l'inventaire avec l'objet déjà équipé ---
	# On ajoute un .duplicate() ici pour modifier le tableau en toute sécurité
	var items_a_afficher = GameState.inventaire.keys().duplicate()
	
	if item_actuellement_equipe != "" and not items_a_afficher.has(item_actuellement_equipe):
		items_a_afficher.append(item_actuellement_equipe)
		
	for item_id in items_a_afficher:
		var item: ItemResource = GameState.item_database.get(item_id)
		if item:
			# Tolérance d'erreur : On accepte l'objet s'il valide la catégorie OU son type global
			var est_compatible = false
			if item.categorie_equipement == cat_recherche:
				est_compatible = true
			elif cat_recherche == "consommable" and item.type_item == ItemResource.TypeItem.CONSOMMABLE:
				est_compatible = true
				
			if est_compatible:
				var btn_item = Button.new()
				btn_item.custom_minimum_size = Vector2(60, 60)
				btn_item.clip_contents = true # Indispensable pour que la bordure ne bave pas
				
				if item.icone_texture != null:
					# Création d'un TextureRect pour garder l'icône propre sous la bordure
					var tex_rect = TextureRect.new()
					tex_rect.texture = item.icone_texture
					tex_rect.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
					tex_rect.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
					tex_rect.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
					btn_item.add_child(tex_rect)
				else:
					btn_item.text = item.nom.substr(0, 3) 
					
				# Affichage de la quantité pour les consommables
				if item.type_item == ItemResource.TypeItem.CONSOMMABLE:
					var quantite = GameState.inventaire.get(item_id, 0)
					var lbl_qty = Label.new()
					lbl_qty.text = str(quantite)
					lbl_qty.add_theme_font_size_override("font_size", 12)
					lbl_qty.set_anchors_and_offsets_preset(Control.PRESET_BOTTOM_RIGHT)
					lbl_qty.position += Vector2(-4, -2)
					btn_item.add_child(lbl_qty)
					
				# --- NOUVEAU : Encadrer visuellement l'objet actuellement équipé ---
				if item_id == item_actuellement_equipe:
					var stylebox = StyleBoxFlat.new()
					stylebox.bg_color = Color(0, 0, 0, 0) # Fond transparent
					stylebox.border_color = Color(0.2, 0.8, 0.3, 1.0) # Bordure verte fluo
					stylebox.border_width_bottom = 4
					stylebox.border_width_top = 4
					stylebox.border_width_left = 4
					stylebox.border_width_right = 4
					
					btn_item.add_theme_stylebox_override("normal", stylebox)
					btn_item.add_theme_stylebox_override("hover", stylebox)
					
					# NOUVEAU : Si on clique sur l'objet déjà équipé, ça agit comme le bouton "Retirer"
					btn_item.pressed.connect(_on_desequiper_presse)
				else:
					btn_item.pressed.connect(_on_selection_modal_item.bind(item_id))
					
				grille_modal.add_child(btn_item)
				
	modal.show()
	
func _on_selection_modal_item(item_id: String) -> void:
	GameState.equiper_item(item_id, slot_en_cours_edition)
	modal.hide()
	afficher_equipement()

func _on_desequiper_presse() -> void:
	GameState.desequiper_item(slot_en_cours_edition)
	modal.hide()
	afficher_equipement()

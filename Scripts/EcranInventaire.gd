# Fichier: res://Scripts/EcranInventaire.gd
extends Control

# Références UI adaptées au mode portrait et aux nouvelles fonctionnalités tactiles
@onready var inventaire_grid: GridContainer = $MainVBox/InventairePanel/VBoxInventaire/ScrollGrid/InventaireGrid
@onready var label_or: Label = $MainVBox/StatsPanel/StatsHBox/OrLabel

@onready var details_panel: PanelContainer = $MainVBox/DetailsPanel
@onready var nom_item_label: Label = $MainVBox/DetailsPanel/VBoxDetails/NomItemLabel
@onready var desc_item_label: Label = $MainVBox/DetailsPanel/VBoxDetails/DescItemLabel
@onready var effet_item_label: Label = $MainVBox/DetailsPanel/VBoxDetails/EffetItemLabel

@onready var slider_vente: HSlider = $MainVBox/DetailsPanel/VBoxDetails/HBoxVente/SliderVente
@onready var label_slider_quantite: Label = $MainVBox/DetailsPanel/VBoxDetails/HBoxVente/LabelSliderQuantite
@onready var btn_vendre: Button = $MainVBox/DetailsPanel/VBoxDetails/BtnVendre
@onready var btn_equiper: Button = $MainVBox/DetailsPanel/VBoxDetails/BtnEquiper

func _ready() -> void:
	details_panel.visible = false
	desc_item_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	desc_item_label.custom_minimum_size = Vector2(100, 10)
	mettre_a_jour_stats()
	afficher_inventaire()

func mettre_a_jour_stats() -> void:
	label_or.text = "Fortune : %d 🪙" % GameState.or_actuel

# Génère les cases remplies avec icônes ainsi que les cases vides configurées pour le mobile
func afficher_inventaire() -> void:
	for enfant in inventaire_grid.get_children():
		enfant.queue_free()
		
	var slots_occupes = 0
	for item_id in GameState.inventaire.keys():
		var quantite = GameState.inventaire[item_id]
		if quantite <= 0: continue
		
		# NOUVEAU : Masquer visuellement le stack s'il est équipé en consommable
		if GameState.equipement.get("consommable", "") == item_id:
			continue # On saute cet objet, il a migré dans l'onglet Équipement !
		
		var btn_slot = Button.new()
		btn_slot.custom_minimum_size = Vector2(60, 60)
		btn_slot.clip_contents = true 
		
		if GameState.item_database.has(item_id):
			var item_res: ItemResource = GameState.item_database[item_id]
			if item_res.icone_texture != null:
				var tex_rect = TextureRect.new()
				tex_rect.texture = item_res.icone_texture
				tex_rect.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
				tex_rect.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
				tex_rect.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
				btn_slot.add_child(tex_rect)
		
		var lbl_qty = Label.new()
		lbl_qty.text = str(quantite)
		lbl_qty.add_theme_font_size_override("font_size", 12)
		lbl_qty.set_anchors_and_offsets_preset(Control.PRESET_BOTTOM_RIGHT)
		lbl_qty.position += Vector2(-4, -2) 
		btn_slot.add_child(lbl_qty)
		
		btn_slot.pressed.connect(_on_item_clique.bind(item_id))
		inventaire_grid.add_child(btn_slot)
		slots_occupes += 1
		
	var slots_restants = max(0, GameState.max_emplacements - slots_occupes)
	for i in range(slots_restants):
		var btn_vide = Button.new()
		btn_vide.custom_minimum_size = Vector2(60, 60)
		btn_vide.disabled = true
		btn_vide.modulate.a = 0.25 
		inventaire_grid.add_child(btn_vide)
		
# Sélectionne un objet, affiche ses effets uniques et configure le curseur de vente numérique
func _on_item_clique(item_id: String) -> void:
	details_panel.visible = true
	var quantite = GameState.inventaire.get(item_id, 0)
	if not GameState.item_database.has(item_id): return
	var item: ItemResource = GameState.item_database[item_id]
	
	nom_item_label.text = item.nom
	desc_item_label.text = item.description
	
	match item.type_item:
		ItemResource.TypeItem.ARME:
			effet_item_label.text = "⚔️ Dégâts : %d" % item.valeur_effet
			btn_equiper.text = "Équiper"
			btn_equiper.visible = true
		ItemResource.TypeItem.ARMURE:
			effet_item_label.text = "🛡️ Défense : %d" % item.valeur_effet
			btn_equiper.text = "Équiper"
			btn_equiper.visible = true
		ItemResource.TypeItem.CONSOMMABLE:
			effet_item_label.text = "❤️ Soin : %d" % item.valeur_effet
			btn_equiper.text = "Équiper" # Modification appliquée ici
			btn_equiper.visible = true
		_:
			effet_item_label.text = ""
			btn_equiper.visible = false
			
	slider_vente.min_value = 1
	slider_vente.max_value = quantite
	slider_vente.value = 1
	
	if slider_vente.value_changed.is_connected(_on_slider_change): slider_vente.value_changed.disconnect(_on_slider_change)
	slider_vente.value_changed.connect(_on_slider_change.bind(item))
	_on_slider_change(1, item)
	
	if btn_vendre.pressed.is_connected(_on_vendre_presse): btn_vendre.pressed.disconnect(_on_vendre_presse)
	btn_vendre.pressed.connect(_on_vendre_presse.bind(item_id))
	
	if btn_equiper.pressed.is_connected(_on_equiper_presse): btn_equiper.pressed.disconnect(_on_equiper_presse)
	btn_equiper.pressed.connect(_on_equiper_presse.bind(item_id))
	
# Met à jour en temps réel l'estimation de vente lors de la manipulation du Slider
func _on_slider_change(valeur: float, item: ItemResource) -> void:
	var qte = int(valeur)
	label_slider_quantite.text = "%d / %d" % [qte, slider_vente.max_value]
	btn_vendre.text = "Vendre (%d 🪙)" % (item.valeur_or * qte)

func _on_vendre_presse(item_id: String) -> void:
	GameState.vendre_item(item_id, int(slider_vente.value))
	details_panel.visible = false
	mettre_a_jour_stats()
	afficher_inventaire()

func _on_equiper_presse(item_id: String) -> void:
	var item: ItemResource = GameState.item_database[item_id]
	
	if item.type_item == ItemResource.TypeItem.CONSOMMABLE:
		# Les consommables vont dans le slot rapide en haut à droite
		GameState.equiper_item(item_id, "consommable")
	else:
		# On déduit le slot cible d'après la catégorie de l'objet
		var slot_cible = item.categorie_equipement
		
		# Gestion des cas particuliers (emplacements multiples)
		if slot_cible == "anneau":
			slot_cible = "anneau_1" # Par défaut, on équipe sur le slot 1
		elif slot_cible == "accessoire":
			slot_cible = "acc_1"
			
		# On appelle enfin la fonction avec ses DEUX arguments !
		GameState.equiper_item(item_id, slot_cible)
		
	details_panel.visible = false
	mettre_a_jour_stats()
	afficher_inventaire()

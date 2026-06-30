extends Control

@onready var liste_recettes: VBoxContainer = $VBoxMain/ScrollRecettes/ListeRecettes

func _ready() -> void:
	afficher_recettes()

func afficher_recettes() -> void:
	# Nettoyage de la liste avant de la rafraîchir
	for enfant in liste_recettes.get_children():
		enfant.queue_free()
		
	# On boucle sur toutes les recettes chargées dans le jeu
	for recette_id in GameState.recipe_database.keys():
		var recette: RecipeResource = GameState.recipe_database[recette_id]
		
		# On filtre pour ne garder que les recettes du forgeron
		if recette.artisan_assigne == RecipeResource.Artisan.FORGERON:
			_creer_carte_recette(recette)

func _creer_carte_recette(recette: RecipeResource) -> void:
	# Panel de fond pour séparer les recettes
	var panel = PanelContainer.new()
	var margin_container = MarginContainer.new()
	margin_container.add_theme_constant_override("margin_left", 10)
	margin_container.add_theme_constant_override("margin_top", 10)
	margin_container.add_theme_constant_override("margin_right", 10)
	margin_container.add_theme_constant_override("margin_bottom", 10)
	panel.add_child(margin_container)
	
	var vbox = VBoxContainer.new()
	margin_container.add_child(vbox)
	
	# En-tête : Nom de l'objet et quantité produite
	var lbl_titre = Label.new()
	lbl_titre.text = "🔨 " + recette.nom_recette + " (x" + str(recette.quantite_produite) + ")"
	lbl_titre.add_theme_font_size_override("font_size", 16)
	lbl_titre.add_theme_color_override("font_color", Color(0.9, 0.6, 0.2)) # Orange feu
	vbox.add_child(lbl_titre)
	
	# Liste des composants requis
	var bool_peut_crafter = true
	for ing in recette.ingredients:
		var qte_possedee = GameState.inventaire.get(ing.item_requis.id, 0)
		var qte_requise = ing.quantite
		
		var lbl_ing = Label.new()
		lbl_ing.text = "- " + ing.item_requis.nom + " : " + str(qte_possedee) + " / " + str(qte_requise)
		
		# Code couleur Rouge/Vert selon ce que possède le joueur
		if qte_possedee >= qte_requise:
			lbl_ing.add_theme_color_override("font_color", Color(0.2, 0.8, 0.2))
		else:
			lbl_ing.add_theme_color_override("font_color", Color(0.8, 0.2, 0.2))
			bool_peut_crafter = false
			
		vbox.add_child(lbl_ing)
		
	# Bouton de Fabrication
	var btn_craft = Button.new()
	btn_craft.text = "Forger (" + str(recette.cout_or) + " Or)"
	
	# Désactive le bouton si les conditions ne sont pas remplies (or ou composants)
	if not bool_peut_crafter or GameState.or_actuel < recette.cout_or:
		btn_craft.disabled = true
		
	btn_craft.pressed.connect(_on_bouton_craft_presse.bind(recette.id_recette))
	vbox.add_child(btn_craft)
	
	liste_recettes.add_child(panel)

func _on_bouton_craft_presse(recette_id: String) -> void:
	if GameState.crafter_recette(recette_id):
		# Si le craft a réussi, on rafraîchit l'interface pour mettre à jour les jauges et les boutons
		afficher_recettes()

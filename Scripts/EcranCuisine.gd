extends Control

@onready var liste_recettes: VBoxContainer = $VBoxMain/ScrollRecettes/ListeRecettes

func _ready() -> void:
	afficher_recettes()

func afficher_recettes() -> void:
	# Nettoyage de la liste avant de la rafraîchir pour éviter les doublons UI
	for enfant in liste_recettes.get_children():
		enfant.queue_free()
		
	# Parcours de la base de données centrale des recettes
	for recette_id in GameState.recipe_database.keys():
		var recette: RecipeResource = GameState.recipe_database[recette_id]
		
		# VARIATION : On ne garde strictement que les recettes du cuisinier
		if recette.artisan_assigne == RecipeResource.Artisan.CUISINIER:
			_creer_carte_recette(recette)

func _creer_carte_recette(recette: RecipeResource) -> void:
	# Conteneur de fond pour isoler visuellement chaque plat sur mobile
	var panel = PanelContainer.new()
	var margin_container = MarginContainer.new()
	margin_container.add_theme_constant_override("margin_left", 10)
	margin_container.add_theme_constant_override("margin_top", 10)
	margin_container.add_theme_constant_override("margin_right", 10)
	margin_container.add_theme_constant_override("margin_bottom", 10)
	panel.add_child(margin_container)
	
	var vbox = VBoxContainer.new()
	margin_container.add_child(vbox)
	
	# En-tête de la carte : Nom du plat et volume produit
	var lbl_titre = Label.new()
	lbl_titre.text = "🍳 " + recette.nom_recette + " (x" + str(recette.quantite_produite) + ")"
	lbl_titre.add_theme_font_size_override("font_size", 16)
	lbl_titre.add_theme_color_override("font_color", Color(0.2, 0.7, 0.9)) # Teinte turquoise/frais pour la cuisine
	vbox.add_child(lbl_titre)
	
	# Évaluation dynamique des ingrédients disponibles dans le dictionnaire joueur
	var bool_peut_cuisiner = true
	for ing in recette.ingredients:
		var qte_possedee = GameState.inventaire.get(ing.item_requis.id, 0)
		var qte_requise = ing.quantite
		
		var lbl_ing = Label.new()
		lbl_ing.text = "- " + ing.item_requis.nom + " : " + str(qte_possedee) + " / " + str(qte_requise)
		
		# Feedback coloré immédiat selon l'état du stock
		if qte_possedee >= qte_requise:
			lbl_ing.add_theme_color_override("font_color", Color(0.2, 0.8, 0.2)) # Vert
		else:
			lbl_ing.add_theme_color_override("font_color", Color(0.8, 0.2, 0.2)) # Rouge
			bool_peut_cuisiner = false
			
		vbox.add_child(lbl_ing)
		
	# Bouton d'action contextuel
	var btn_craft = Button.new()
	btn_craft.text = "Cuisiner (" + str(recette.cout_or) + " Or)"
	
	# Sécurité de validation : bloque l'interaction si manque d'or ou de composants
	if not bool_peut_cuisiner or GameState.or_actuel < recette.cout_or:
		btn_craft.disabled = true
		
	btn_craft.pressed.connect(_on_bouton_cuisine_presse.bind(recette.id_recette))
	vbox.add_child(btn_craft)
	
	liste_recettes.add_child(panel)

func _on_bouton_cuisine_presse(recette_id: String) -> void:
	# Appel de la méthode transactionnelle centralisée du GameState
	if GameState.crafter_recette(recette_id):
		# Rafraîchissement de l'UI pour mettre à jour les jauges et les verrous de boutons
		afficher_recettes()

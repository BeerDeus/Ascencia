# Fichier: res://Scripts/EcranInventaire.gd
extends Control

# Liaisons UI adaptées aux conteneurs du mode portrait mobile
@onready var inventaire_grid: GridContainer = $MainVBox/InventairePanel/VBoxInventaire/ScrollGrid/InventaireGrid
@onready var label_or: Label = $MainVBox/StatsPanel/StatsHBox/OrLabel
@onready var details_panel: PanelContainer = $MainVBox/DetailsPanel
@onready var nom_item_label: Label = $MainVBox/DetailsPanel/VBoxDetails/NomItemLabel
@onready var desc_item_label: Label = $MainVBox/DetailsPanel/VBoxDetails/DescItemLabel

func _ready() -> void:
	# Règle UI : Masquage initial du panneau de détails pour libérer l'espace visuel mobile
	details_panel.visible = false
	mettre_a_jour_stats()
	afficher_inventaire()

# Rafraîchit les indicateurs économiques de l'en-tête
func mettre_a_jour_stats() -> void:
	label_or.text = "Fortune : %d 🪙" % GameState.or_actuel

# Instancie dynamiquement les boutons de grille optimisés pour le tactile
func afficher_inventaire() -> void:
	for enfant in inventaire_grid.get_children():
		enfant.queue_free()
		
	for item_id in GameState.inventaire.keys():
		var quantite = GameState.inventaire[item_id]
		
		# On n'affiche le slot que si l'Harmoniste possède au moins un exemplaire
		if quantite > 0:
			var btn_slot = Button.new()
			btn_slot.custom_minimum_size = Vector2(60, 60) # Zone de saisie tactile minimale recommandée
			btn_slot.text = str(quantite)
			
			# Association de l'identifiant via un Callable lié (bind)
			btn_slot.pressed.connect(_on_item_clique.bind(item_id))
			inventaire_grid.add_child(btn_slot)

# Déclenché lors du clic sur un slot d'inventaire
func _on_item_clique(item_id: String) -> void:
	# Révèle le panneau de description basse suite à l'action du joueur
	details_panel.visible = true
	
	# Interrogation sécurisée de la base de données préchargée
	if GameState.item_database.has(item_id):
		var item_resource: ItemResource = GameState.item_database[item_id]
		nom_item_label.text = item_resource.nom
		desc_item_label.text = item_resource.description
	else:
		# Sécurité i18n/debug si la ressource .tres n'a pas été déclarée dans GameState
		nom_item_label.text = "Objet d'ID: " + item_id
		desc_item_label.text = "Ressource manquante dans la base de données globale."

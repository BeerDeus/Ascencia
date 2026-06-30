extends PanelContainer

signal lancer_combat_manuel(monstre: MonstreResource)
signal lancer_combat_auto(monstre: MonstreResource)

@onready var icone_monstre = $VBoxContainer/BoutonManuel/VBoxContainer/Icone
@onready var nom_label = $VBoxContainer/BoutonManuel/VBoxContainer/NomLabel
@onready var label_kills = $VBoxContainer/LabelKills
@onready var bouton_auto = $VBoxContainer/BoutonAuto

var monstre_lie: MonstreResource

func initialiser(monstre: MonstreResource) -> void:
	monstre_lie = monstre
	nom_label.text = monstre.nom
	if monstre.icone_texture:
		icone_monstre.texture = monstre.icone_texture
	
	mettre_a_jour_stats()

func mettre_a_jour_stats() -> void:
	var nb_kills = GameState.monstres_kills.get(monstre_lie.id, 0)
	label_kills.text = "💀 " + str(nb_kills) + " tués"
	
	if nb_kills >= 10:
		bouton_auto.text = "🔁 Auto-Battle"
		bouton_auto.disabled = false
	else:
		bouton_auto.text = "🔁 " + str(nb_kills) + "/10"
		bouton_auto.disabled = true

func _on_bouton_manuel_pressed() -> void:
	emit_signal("lancer_combat_manuel", monstre_lie)

func _on_bouton_auto_pressed() -> void:
	emit_signal("lancer_combat_auto", monstre_lie)

extends PanelContainer

@onready var nom_label: Label = $HBoxContainer/NomLabel
@onready var pv_label: Label = $HBoxContainer/PvLabel
@onready var endurance_label: Label = $HBoxContainer/EnduranceLabel
@onready var or_label: Label = $HBoxContainer/OrLabel

func _process(_delta: float) -> void:
	nom_label.text = GameState.joueur_nom
	pv_label.text = "❤️ %d / %d" % [GameState.joueur_pv_actuels, GameState.joueur_pv_max]
	endurance_label.text = "⚡ %d / %d" % [GameState.endurance_actuelle, GameState.endurance_max]
	or_label.text = "🪙 %d" % GameState.or_actuel

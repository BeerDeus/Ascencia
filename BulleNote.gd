extends Button
class_name BulleNote

var vitesse_montee: float = 180.0 
var amplitude_zigzag: float = 1.2 
var vitesse_zigzag: float = 4.0
var temps_vecu: float = 0.0
var direction_aleatoire: float = 1.0

func _ready() -> void:
	direction_aleatoire = randf_range(-1.0, 1.0)
	
	var tween = create_tween()
	tween.tween_property(self, "modulate:a", 1.0, 4.0) 
	tween.tween_property(self, "modulate:a", 0.0, 1.5) 
	tween.tween_callback(queue_free) 

func _process(delta: float) -> void:
	temps_vecu += delta
	
	position.y -= vitesse_montee * delta
	position.x += sin(temps_vecu * vitesse_zigzag) * amplitude_zigzag * direction_aleatoire

# --- FONCTION À RAJOUTER TOUT EN BAS ---
func _gui_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.pressed:
		if event.button_index == MOUSE_BUTTON_LEFT:
			print("🎵 Note capturée avec succès : ", text)
			
			# ON TROUVE L'ÉCRAN DE COMBAT POUR LUI DONNER LA NOTE
			# Comme MainUI a EcranCombat en enfant, on peut chercher la scène de combat
			var ecran_combat = get_tree().current_scene.find_child("EcranCombat", true, false)
			if ecran_combat:
				ecran_combat.ajouter_note_dans_mesure(text)
			
			accept_event() 
			queue_free()

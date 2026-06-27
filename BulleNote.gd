extends Button
class_name BulleNote

var vitesse_montee: float = 180.0 # Vitesse augmentée pour qu'elle grimpe bien jusqu'en haut
var amplitude_zigzag: float = 1.2 # Zigzag plus serré pour ne pas dériver hors de l'écran
var vitesse_zigzag: float = 4.0
var temps_vecu: float = 0.0
var direction_aleatoire: float = 1.0

func _ready() -> void:
	direction_aleatoire = randf_range(-1.0, 1.0)
	
	# L'effet d'estompage commence plus tard pour qu'elle reste visible pendant sa montée
	var tween = create_tween()
	tween.tween_property(self, "modulate:a", 1.0, 4.0) # Reste opaque pendant 4s
	tween.tween_property(self, "modulate:a", 0.0, 1.5) # S'estompe sur les 1.5s restantes
	tween.tween_callback(queue_free) # Se détruit après ~5.5 secondes

func _process(delta: float) -> void:
	temps_vecu += delta
	
	# 1. Montée continue vers le haut de l'écran (Y=0)
	position.y -= vitesse_montee * delta
	
	# 2. Léger balancement sinusoïdal
	position.x += sin(temps_vecu * vitesse_zigzag) * amplitude_zigzag * direction_aleatoire

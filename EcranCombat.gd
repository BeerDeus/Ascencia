extends Control

# --- RÉFÉRENCES VERS L'UI ---
@onready var nom_monstre_text: Label = $VBoxContainer/EncadréMonstre/VBoxContainer/NomMonstreText
@onready var barre_vie_monstre: ProgressBar = $VBoxContainer/EncadréMonstre/VBoxContainer/BarreVieMonstre
@onready var barre_tempo_monstre: TextureProgressBar = $VBoxContainer/EncadréMonstre/VBoxContainer/BarreTempoMonstre
@onready var sprite_monstre: TextureRect = %SpriteMonstre

# --- VARIABLES DU COMBAT ---
var monstre_actif: MonstreResource = null
var pv_actuels_monstre: int = 0
var combat_en_cours: bool = false
var temps_ecoule_monstre: float = 0.0
var bulle_note_scene = preload("res://BulleNote.tscn")

func _ready() -> void:
	# On s'assure que les jauges sont vides ou masquées au début
	barre_vie_monstre.value = 0
	barre_tempo_monstre.value = 0

func _process(delta: float) -> void:
	# Cette fonction tourne à chaque image par seconde (60fps)
	if not combat_en_cours or monstre_actif == null:
		return
		
	# Gestion du Tempo du monstre (la jauge d'attaque qui se remplit)
	temps_ecoule_monstre += delta
	
	# On calcule le pourcentage de remplissage de la jauge
	var pourcentage_tempo = (temps_ecoule_monstre / monstre_actif.tempo_attaque) * 100
	barre_tempo_monstre.value = pourcentage_tempo
	
	# Quand la jauge atteint 100%, le monstre attaque !
	if temps_ecoule_monstre >= monstre_actif.tempo_attaque:
		monstre_frappe()

# --- MÉCANIQUES DE COMBAT ---

func lancer_combat(monstre: MonstreResource) -> void:
	monstre_actif = monstre
	pv_actuels_monstre = monstre.pv_max
	temps_ecoule_monstre = 0.0
	combat_en_cours = true
	
	# Mise à jour des textes et maximums de l'UI
	nom_monstre_text.text = monstre.nom
	barre_vie_monstre.max_value = monstre.pv_max
	barre_vie_monstre.value = pv_actuels_monstre
	barre_tempo_monstre.value = 0
	sprite_monstre.texture = monstre.icone_texture
	
	print("⚔️ Le combat commence contre : ", monstre.nom)

func monstre_frappe() -> void:
	temps_ecoule_monstre = 0.0 # On réinitialise sa jauge
	print("💥 Le ", monstre_actif.nom, " vous inflige ", monstre_actif.points_attaque, " dégâts !")
	# Ici on viendra déduire les PV du joueur dans le GameState plus tard

# Fonction temporaire simulant une frappe du JOUEUR (quand on va lier ton arme)
# Pour l'instant, on va imaginer que tu lui mets 5 dégâts par clic de test
func joueur_frappe() -> void:
	if not combat_en_cours or monstre_actif == null:
		return
		
	pv_actuels_monstre -= 5
	barre_vie_monstre.value = pv_actuels_monstre
	print("⚔️ Vous frappez le monstre ! PV restants : ", pv_actuels_monstre)
	
	# --- APPARITION DE LA BULLE DE NOTE ---
	var nouvelle_bulle = bulle_note_scene.instantiate()
	nouvelle_bulle.text = "DO" 
	add_child(nouvelle_bulle)
	
	# Fenêtre de 720 de large : on fait apparaître la bulle entre X=100 et X=620 
	# pour éviter qu'elle ne frôle trop les bords de l'écran du téléphone
	var position_x_aleatoire = randf_range(100.0, 620.0)
	
	# On la positionne tout en bas du contenu (juste au-dessus des boutons, vers Y=1100)
	nouvelle_bulle.position = Vector2(position_x_aleatoire, 1100.0)
	
	if pv_actuels_monstre <= 0:
		victoire_combat()
		
func victoire_combat() -> void:
	combat_en_cours = false
	barre_tempo_monstre.value = 0
	nom_monstre_text.text = "Victoire ! Sélectionnez un adversaire."
	
	# On envoie l'information au GameState global pour donner l'XP et les loots !
	GameState.enregistrer_mort_monstre(monstre_actif, false)
	monstre_actif = null


func _on_bouton_slime_pressed() -> void:
	# On charge dynamiquement la ressource du slime qu'on a créé
	var slime = load("res://Donnees/Monstres/SlimeSeve.tres")
	lancer_combat(slime)


func _on_button_pressed() -> void:
	joueur_frappe()

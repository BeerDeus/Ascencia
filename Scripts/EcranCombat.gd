extends Control

# --- RÉFÉRENCES VERS L'UI ---
@onready var nom_monstre_text: Label = $VBoxContainer/EncadréMonstre/VBoxContainer/NomMonstreText
@onready var barre_vie_monstre: ProgressBar = $VBoxContainer/EncadréMonstre/VBoxContainer/BarreVieMonstre
@onready var barre_tempo_monstre: ProgressBar = $VBoxContainer/EncadréMonstre/VBoxContainer/BarreTempoMonstre
@onready var sprite_monstre: TextureRect = %SpriteMonstre

# Références Tempo Joueur & Mesure
@onready var barre_vie_joueur: ProgressBar = $VBoxContainer/EncadréMonstre/VBoxContainer/BarreVieJoueur
@onready var barre_tempo_joueur: ProgressBar = $VBoxContainer/EncadréMonstre/VBoxContainer/BarreTempoJoueur
@onready var labels_mesure: Array = [
	$VBoxContainer/ConteneurMesure/Note1,
	$VBoxContainer/ConteneurMesure/Note2,
	$VBoxContainer/ConteneurMesure/Note3,
	$VBoxContainer/ConteneurMesure/Note4
]

# --- VARIABLES DU COMBAT ---
var monstre_actif: MonstreResource = null
var pv_actuels_monstre: int = 0
var combat_en_cours: bool = false

var temps_ecoule_monstre: float = 0.0
var bulle_note_scene = preload("res://scènes/BulleNote.tscn")

# Stats du joueur (Le Métronome)
var joueur_tempo_attaque: float = 2.0 # Attaque de base toutes les 2s
var temps_ecoule_joueur: float = 0.0
var joueur_note_arme: String = "DO" 

# La Mesure (File de 4 notes max)
var la_mesure: Array = []
const TAILLE_MAX_MESURE: int = 4

# Liste des sorts connus (On charge notre premier sort)
var sort_equipe: SortResource = preload("res:///Donnees/Sorts/HarmonieBrulante.tres")

func _ready() -> void:
	barre_vie_monstre.value = 0
	barre_tempo_monstre.value = 0
	barre_tempo_joueur.value = 0
	mettre_a_jour_ui_mesure()
	mettre_a_jour_ui_joueur()

func _process(delta: float) -> void:
	if not combat_en_cours or monstre_actif == null:
		return
		
	# 1. Gestion du Tempo du MONSTRE
	temps_ecoule_monstre += delta
	var pourcentage_tempo_m = (temps_ecoule_monstre / monstre_actif.tempo_attaque) * 100
	barre_tempo_monstre.value = pourcentage_tempo_m
	
	if temps_ecoule_monstre >= monstre_actif.tempo_attaque:
		monstre_frappe()
		
	# 2. Gestion visuelle et logique du Tempo du JOUEUR
	temps_ecoule_joueur += delta
	var pourcentage_tempo_j = (temps_ecoule_joueur / joueur_tempo_attaque) * 100
	barre_tempo_joueur.value = clamp(pourcentage_tempo_j, 0, 100)
	
	if temps_ecoule_joueur >= joueur_tempo_attaque:
		joueur_attaque_automatique()
	mettre_a_jour_ui_joueur()

# --- MÉCANIQUES DE COMBAT ---

func lancer_combat(monstre: MonstreResource) -> void:
	monstre_actif = monstre
	pv_actuels_monstre = monstre.pv_max
	temps_ecoule_monstre = 0.0
	temps_ecoule_joueur = 0.0 
	combat_en_cours = true
	
	la_mesure.clear()
	mettre_a_jour_ui_mesure()
	mettre_a_jour_ui_joueur()
	
	nom_monstre_text.text = monstre.nom
	barre_vie_monstre.max_value = monstre.pv_max
	barre_vie_monstre.value = pv_actuels_monstre
	barre_tempo_monstre.value = 0
	barre_tempo_joueur.value = 0
	
	if monstre.icone_texture != null:
		sprite_monstre.texture = monstre.icone_texture
	
	print("⚔️ Le combat commence contre : ", monstre.nom)

func mettre_a_jour_ui_joueur() -> void:
	barre_vie_joueur.max_value = GameState.joueur_pv_max
	barre_vie_joueur.value = GameState.joueur_pv_actuels
	
func monstre_frappe() -> void:
	temps_ecoule_monstre = 0.0 
	
	# Le monstre inflige ses dégâts au GameState global
	GameState.recevoir_degats(monstre_actif.points_attaque)
	mettre_a_jour_ui_joueur()
	
	print("💥 Le ", monstre_actif.nom, " vous inflige ", monstre_actif.points_attaque, " dégâts !")
	
	# ICI : On remplace GameState.pv_actuels par GameState.joueur_pv_actuels
	if GameState.joueur_pv_actuels <= 0:
		defaite_combat()

func defaite_combat() -> void:
	combat_en_cours = false
	barre_tempo_monstre.value = 0
	barre_tempo_joueur.value = 0
	nom_monstre_text.text = "Vous avez perdu... Soignez-vous avant de revenir !"
	monstre_actif = null

func joueur_attaque_automatique() -> void:
	temps_ecoule_joueur = 0.0 
	
	# Petite attaque automatique de base (5 dégâts)
	pv_actuels_monstre -= 5 
	barre_vie_monstre.value = pv_actuels_monstre
	
	# Fait s'envoler une bulle de note que le joueur peut intercepter !
	generer_bulle_note(joueur_note_arme)
	
	if pv_actuels_monstre <= 0:
		victoire_combat()

func generer_bulle_note(nom_note: String) -> void:
	var nouvelle_bulle = bulle_note_scene.instantiate()
	nouvelle_bulle.text = nom_note 
	get_tree().current_scene.add_child(nouvelle_bulle)
	
	var taille_ecran = get_viewport_rect().size
	var position_x_aleatoire = randf_range(taille_ecran.x * 0.15, taille_ecran.x * 0.85)
	var position_y_bas = taille_ecran.y * 0.85
	nouvelle_bulle.position = Vector2(position_x_aleatoire, position_y_bas)

# --- GESTION DE LA MESURE & DES SORTS ---

func ajouter_note_dans_mesure(nom_note: String) -> void:
	if la_mesure.size() >= TAILLE_MAX_MESURE:
		la_mesure.pop_front()
	la_mesure.append(nom_note)
	mettre_a_jour_ui_mesure()

func mettre_a_jour_ui_mesure() -> void:
	for i in range(TAILLE_MAX_MESURE):
		if i < la_mesure.size():
			labels_mesure[i].text = la_mesure[i]
		else:
			labels_mesure[i].text = "-"

# Déclenché par l'ancien bouton "ATTACK" (renommé en "Lancer Sort")
func executer_sort_equipe() -> void:
	if not combat_en_cours or sort_equipe == null:
		return
		
	# ÉTAPE DE VÉRIFICATION : Est-ce que la mesure contient l'accord requis ?
	# Exemple simple : On transforme notre tableau en texte pour comparer facilement
	var string_mesure = ",".join(la_mesure)
	var string_accord_requis = ",".join(sort_equipe.combinaison_notes)
	
	# Si l'accord requis est inclus dans notre suite de notes accumulées :
	if string_accord_requis in string_mesure:
		print("🎵 ACCORD MAJEUR CONFIGURÉ ! Lancement de : ", sort_equipe.nom)
		
		# Application de l'effet selon le Template Resource
		if sort_equipe.type_effet == SortResource.TypeEffet.DEGATS:
			pv_actuels_monstre -= sort_equipe.valeur_effet
			barre_vie_monstre.value = pv_actuels_monstre
			print("🔥 Le sort inflige ", sort_equipe.valeur_effet, " dégâts au monstre !")
		elif sort_equipe.type_effet == SortResource.TypeEffet.SOIN:
			print("💚 Le sort vous soigne de ", sort_equipe.valeur_effet, " PV !")
			# Plus tard : GameState.soigner_joueur(sort_equipe.valeur_effet)
			
		# Le sort a réussi : on vide la mesure pour consommer les notes !
		la_mesure.clear()
		mettre_a_jour_ui_mesure()
		
		if pv_actuels_monstre <= 0:
			victoire_combat()
	else:
		print("❌ Échec : Les notes actuelles ne forment pas l'accord pour ", sort_equipe.nom, " (Requis: ", string_accord_requis, ")")

func victoire_combat() -> void:
	combat_en_cours = false
	barre_tempo_monstre.value = 0
	barre_tempo_joueur.value = 0
	nom_monstre_text.text = "Victoire ! Sélectionnez un adversaire."
	GameState.enregistrer_mort_monstre(monstre_actif, false)
	monstre_actif = null

func _on_bouton_slime_pressed() -> void:
	var slime = load("res://Donnees/Monstres/SlimeSeve.tres")
	lancer_combat(slime)

# Clic sur le bouton de sort
func _on_button_pressed() -> void:
	executer_sort_equipe()

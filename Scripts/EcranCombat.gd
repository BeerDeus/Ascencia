extends Control

# --- RÉFÉRENCES VERS L'UI ---
@onready var zone_combat_actif: VBoxContainer = $VBoxContainer/ZoneCombatActif
@onready var scroll_zones: ScrollContainer = $VBoxContainer/ScrollZones

# Monstre
@onready var nom_monstre_text: Label = $VBoxContainer/ZoneCombatActif/ZoneMonstre/VBoxContainer/NomMonstreText
@onready var barre_vie_monstre: ProgressBar = $VBoxContainer/ZoneCombatActif/ZoneMonstre/VBoxContainer/BarreVieMonstre
@onready var barre_tempo_monstre: ProgressBar = $VBoxContainer/ZoneCombatActif/ZoneMonstre/VBoxContainer/BarreTempoMonstre
@onready var sprite_monstre: TextureRect = %SpriteMonstre

# Joueur
@onready var nom_joueur_text: Label = $VBoxContainer/ZoneCombatActif/ZoneJoueur/VBoxContainer/NomJoueurText
@onready var barre_vie_joueur: ProgressBar = $VBoxContainer/ZoneCombatActif/ZoneJoueur/VBoxContainer/BarreVieJoueur
@onready var barre_tempo_joueur: ProgressBar = $VBoxContainer/ZoneCombatActif/ZoneJoueur/VBoxContainer/BarreTempoJoueur
@onready var bouton_quitter_auto: Button = $VBoxContainer/ZoneCombatActif/BoutonQuitterAuto

# La Mesure (les 4 labels de notes)
@onready var labels_mesure: Array = [
	$VBoxContainer/ZoneCombatActif/ZoneJoueur/VBoxContainer/ConteneurMesure/Note1,
	$VBoxContainer/ZoneCombatActif/ZoneJoueur/VBoxContainer/ConteneurMesure/Note2,
	$VBoxContainer/ZoneCombatActif/ZoneJoueur/VBoxContainer/ConteneurMesure/Note3,
	$VBoxContainer/ZoneCombatActif/ZoneJoueur/VBoxContainer/ConteneurMesure/Note4
]

var carte_monstre_scene = preload("res://Scènes/CarteMonstre.tscn")
@onready var liste_zones_conteneur: VBoxContainer = $VBoxContainer/ScrollZones/ListeZonesConteneur

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

var auto_battle_actif: bool = false

# Liste des sorts connus (On charge notre premier sort)
var sort_equipe: SortResource = preload("res:///Donnees/Sorts/HarmonieBrulante.tres")

func _ready() -> void:
	barre_vie_monstre.value = 0
	barre_tempo_monstre.value = 0
	barre_tempo_joueur.value = 0
	mettre_a_jour_ui_mesure()
	mettre_a_jour_ui_joueur()
	
	# Masque tout le bloc de combat et affiche les zones
	zone_combat_actif.visible = false
	scroll_zones.visible = true
	
	nom_joueur_text.text = GameState.joueur_nom # Affiche "Harmoniste" ou le nom du joueur
	
	afficher_zones()

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

func lancer_combat(monstre: MonstreResource, est_auto: bool = false) -> void:
	monstre_actif = monstre
	auto_battle_actif = est_auto
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
	
	# On affiche la zone de combat globale
	zone_combat_actif.visible = true
	scroll_zones.visible = false
	
	bouton_quitter_auto.visible = auto_battle_actif
	
	var mode_texte = "en Auto-Battle" if auto_battle_actif else "en Manuel"
	print("⚔️ Le combat commence contre : ", monstre.nom, " ", mode_texte)
	
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
	
	await get_tree().create_timer(2.0).timeout
	zone_combat_actif.visible = false
	scroll_zones.visible = true
	afficher_zones()
	
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
	
	# Relance le combat uniquement si l'auto-battle n'a pas été désactivé entre-temps
	if auto_battle_actif and GameState.endurance_actuelle >= 1:
		GameState.endurance_actuelle -= 1
		print("⚡ Auto-Battle actif ! Endurance restante : ", GameState.endurance_actuelle)
		
		await get_tree().create_timer(1.0).timeout
		lancer_combat(monstre_actif, true)
	else:
		if auto_battle_actif:
			print("❌ Plus d'endurance ou mode auto désactivé.")
			auto_battle_actif = false
		monstre_actif = null
		
		# Retour propre à la sélection des zones
		zone_combat_actif.visible = false
		scroll_zones.visible = true
		afficher_zones()
		
func afficher_zones() -> void:
	for enfant in liste_zones_conteneur.get_children():
		enfant.queue_free()

	var prochaines_zones = []
	for z_id in GameState.zones_debloquees:
		var z: ZoneResource = GameState.zone_database.get(z_id)
		if z and z.zone_suivante_id != "":
			prochaines_zones.append(z.zone_suivante_id)

	# Création d'une file d'attente pour forcer les zones verrouillées en bas de l'UI
	var zones_verrouillees_ui = []

	for zone_id in GameState.zone_database.keys():
		var zone: ZoneResource = GameState.zone_database[zone_id]
		if zone == null: continue

		var est_debloquee = GameState.zones_debloquees.has(zone_id)
		var est_prochaine = prochaines_zones.has(zone_id)

		if not est_debloquee and not est_prochaine:
			continue 

		# Placement des zones grisées dans la file d'attente
		if est_prochaine and not est_debloquee:
			zones_verrouillees_ui.append(zone)
			continue

		# Génération exclusive des zones actives
		var btn_header = Button.new()
		btn_header.custom_minimum_size = Vector2(0, 50)
		btn_header.text = zone.nom_zone + " [" + zone.difficulte.to_upper() + "] ▼"
		btn_header.add_theme_font_size_override("font_size", 18)
		btn_header.add_theme_color_override("font_color", Color(0.6, 0.2, 0.8))
		liste_zones_conteneur.add_child(btn_header)

		var conteneur_zone = VBoxContainer.new()
		conteneur_zone.visible = false
		liste_zones_conteneur.add_child(conteneur_zone)

		btn_header.pressed.connect(func():
			conteneur_zone.visible = !conteneur_zone.visible
			btn_header.text = zone.nom_zone + " [" + zone.difficulte.to_upper() + "] " + ("▲" if conteneur_zone.visible else "▼")
		)

		var grille = GridContainer.new()
		grille.columns = 2
		grille.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		grille.add_theme_constant_override("h_separation", 10)
		grille.add_theme_constant_override("v_separation", 10)
		conteneur_zone.add_child(grille)

		var monstres_requis_pour_boss = true

		for monstre in zone.liste_monstres:
			if monstre == null: continue
			var carte = carte_monstre_scene.instantiate()
			carte.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			grille.add_child(carte)
			carte.initialiser(monstre)

			carte.lancer_combat_manuel.connect(func(m): lancer_combat(m, false))
			carte.lancer_combat_auto.connect(func(m): lancer_combat(m, true))

			if GameState.monstres_kills.get(monstre.id, 0) < 10:
				monstres_requis_pour_boss = false

		if zone.monstre_boss != null:
			var boss_bouton = Button.new()
			boss_bouton.custom_minimum_size = Vector2(0, 50)
			
			# Activation du retour à la ligne intelligent pour éviter les débordements horizontaux
			boss_bouton.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
			
			var boss_kills = GameState.monstres_kills.get(zone.monstre_boss.id, 0)

			if boss_kills > 0:
				boss_bouton.text = "✅ " + zone.monstre_boss.nom + " [VAINCU]"
				boss_bouton.disabled = false 
				boss_bouton.add_theme_color_override("font_color", Color(0.2, 0.8, 0.2))
				boss_bouton.pressed.connect(func(): lancer_combat(zone.monstre_boss, false))
			elif monstres_requis_pour_boss:
				boss_bouton.text = "👑 " + zone.monstre_boss.nom + " [BOSS D'ACTE]"
				boss_bouton.disabled = false
				boss_bouton.add_theme_color_override("font_color", Color(1, 0.8, 0))
				boss_bouton.pressed.connect(func(): lancer_combat(zone.monstre_boss, false))
			else:
				boss_bouton.text = "🔒 " + zone.monstre_boss.nom + " [REQUIS : 10 VICTOIRES/MONSTRE]"
				boss_bouton.disabled = true
				
			conteneur_zone.add_child(boss_bouton)

	# Instanciation finale des zones verrouillées pour garantir leur position en bas de liste
	for zone_verrouillee in zones_verrouillees_ui:
		var btn_verrou = Button.new()
		btn_verrou.custom_minimum_size = Vector2(0, 50)
		btn_verrou.text = "🔒 " + zone_verrouillee.nom_zone + " [À DÉBLOQUER]"
		btn_verrou.disabled = true
		liste_zones_conteneur.add_child(btn_verrou)


# Clic sur le bouton de sort
func _on_button_pressed() -> void:
	executer_sort_equipe()


func _on_bouton_quitter_auto_pressed() -> void:
	auto_battle_actif = false
	bouton_quitter_auto.visible = false
	print("🛑 Arrêt de l'Auto-Battle demandé. Fin du cycle après le monstre actuel.")

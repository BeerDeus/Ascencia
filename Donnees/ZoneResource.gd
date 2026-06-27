extends Resource
class_name ZoneResource

@export var id: String = ""               # Exemple : "zone_facile_1"
@export var nom_zone: String = ""         # Exemple : "Les Périphéries d'Aubier"
@export var difficulte: String = "Facile" # Facile, Intermédiaire, Difficile...

# Liste de monstres ordinaires (tu pourras y glisser tes 5-6 monstres)
@export var liste_monstres: Array[MonstreResource] = []

# Le Boss unique de fin de zone
@export var monstre_boss: MonstreResource

# L'ID de la zone suivante que la mort du boss va débloquer
@export var zone_suivante_id: String = ""

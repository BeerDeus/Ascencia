extends Resource
class_name MonstreResource

@export var icone_texture: Texture2D # Permettra de glisser une image PNG
@export var id: String = ""
@export var nom: String = ""
@export var pv_max: int = 20
@export var points_attaque: int = 2
@export var tempo_attaque: float = 2.0
@export var xp_donnee: int = 10

# Nouveau système : un tableau de structures LootItem configurables
@export var table_loot: Array[LootItem] = []

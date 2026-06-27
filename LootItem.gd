extends Resource
class_name LootItem

@export var item: ItemResource       # Ici tu glisseras ton item (ex: peau_slime.tres)
@export_range(0, 100) var chance_pourcentage: float = 50.0
@export var quantite_max: int = 1

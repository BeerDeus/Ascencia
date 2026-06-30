extends Resource
class_name RecipeIngredient

# L'objet spécifique requis (peut être un minerai, une épée, une viande...)
@export var item_requis: ItemResource
@export var quantite: int = 1

extends Resource
class_name RecipeResource

# Permet de filtrer facilement quelle interface affiche la recette
enum Artisan { FORGERON, CUISINIER }

@export var id_recette: String = ""
@export var nom_recette: String = "Nouvelle Recette"
@export var artisan_assigne: Artisan = Artisan.FORGERON

@export_group("Résultat de la fabrication")
@export var item_produit: ItemResource
@export var quantite_produite: int = 1

@export_group("Coûts de fabrication")
# Le coût en pièces d'or (optionnel)
@export var cout_or: int = 0
# Le tableau d'ingrédients (utilise la classe qu'on vient de créer)
@export var ingredients: Array[RecipeIngredient] = []

extends Resource
class_name SortResource

# Permet de choisir le type d'effet dans un menu déroulant très propre
enum TypeEffet { DEGATS, SOIN }

@export var nom: String = "Slam"
@export var combinaison_notes: Array[String] = ["DO", "DO"] # L'accord requis
@export var type_effet: TypeEffet = TypeEffet.DEGATS
@export var valeur_effet: int = 25 # Dégâts infligés ou PV soignés

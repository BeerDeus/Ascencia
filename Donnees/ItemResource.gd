# Fichier: res://Donnees/ItemResource.gd
extends Resource
class_name ItemResource

enum TypeItem { COMPOSANT, ARME, ARMURE, CONSOMMABLE }

@export var id: String = ""
@export var nom: String = ""
@export_multiline var description: String = ""
@export var valeur_or: int = 5
@export var icone_texture: Texture2D
@export var type_item: TypeItem = TypeItem.COMPOSANT

# NOUVEAU : Définition exacte de l'emplacement (Menu déroulant dans l'éditeur Godot)
@export_enum("aucun", "arme", "casque", "plastron", "jambieres", "bottes", "bouclier", "amulette", "anneau", "accessoire", "consommable") var categorie_equipement: String = "aucun"

@export var valeur_effet: int = 0

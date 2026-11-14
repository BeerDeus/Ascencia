# Jardin & Métiers (v1 en jeu)

> **Décisions du 15/11** : propositions validées ; Mineur + Bûcheron fusionnés en **Expéditionnaire** ;
> **forgemagie / Enchanteur abandonnés** pour l'instant. Équipement fabriqué : perdu à l'Ascension comme le butin,
> panoplies complètes = bonus permanent (à venir avec le Forgeron).
>
> **En jeu (v1)** : Coffre, drops par famille de monstres (Chasseur), Jardin (grille 3×3→6×6, saisons hebdo,
> 8 croisements + Graine-Cœur = Ancre de la Création, traits, Dissonance contagieuse, nuisibles, Herbier),
> Alchimiste (10 potions), Cuisinier (6 repas aux ingrédients), Expéditions (5 zones, 1/4/8 h).
> Le Jardin s'ouvre en plein écran : le combat continue en arrière-plan (dégâts automatiques seulement).
> Forgeron (Kaelen) : commandes ciblées (emplacement + stat principale) et 5 panoplies d’Acte (bonus 2/4 pièces + bonus permanent de collection : +10 à +30 % de dégâts chacune).

> Inspiration Dofus / Wakfu : **métiers de récolte** qui alimentent des **métiers de fabrication**, chacun avec son niveau,
> des ressources liées aux familles de monstres, des panoplies, la forgemagie.
> Adaptation : **pas de personnage qui se déplace**. Les métiers vivent dans le **Fief**, la récolte se fait par
> **le combat** (butin), **le Jardin** (grille tactile) et **les Expéditions** (les compagnons partent récolter, en idle).

---

## 1. Vue d'ensemble

```
        RÉCOLTE                               FABRICATION                    EFFET EN JEU
 Combat (Chasseur) ── peaux, crocs, gelées ─┐
 Jardin (Jardinier) ─ plantes, graines ─────┼─► Alchimiste (Alaric) ─► potions (bonus 10–30 min)
 Expéditions (Mineur / Bûcheron) ─ minerai, │   Cuisinier (Gaston)  ─► repas (bonus 1–4 h, hors-ligne)
   bois, pierre, gemmes ────────────────────┘   Forgeron (Kaelen)   ─► équipement choisi + panoplies
                                                Enchanteur (Silas)  ─► brisage en runes, forgemagie
```

- **7 métiers**, niveaux **1 → 100**, jamais remis à zéro (ni Ascension, ni Résonance) : une progression parallèle au prestige.
- Tous les 10 niveaux : nouvelles recettes / nouvelles plantes / meilleurs rendements.
- Les ressources vont dans un **Coffre** (piles illimitées, séparé du Sac d'équipement).

---

## 2. Métiers de récolte

### Chasseur (avec la Maîtresse Chasseuse) — passif
- Chaque famille de monstres lâche **sa** ressource (comme Dofus) : rats → queue de rat, loups → croc, gobelins → peau, slimes → gelée,
  araignées → soie, golems → pierre/cœur de golem, griffons → plume, démons → âme, dragons → cœur de dragon, etc.
- Le niveau de Chasseur augmente les chances de drop. XP gagnée en tuant.
- Les boss lâchent des ressources rares (cœur de golem, larme d'archange, cœur de dragon…).

### Mineur & Bûcheron — Expéditions (idle)
- Depuis la **Caserne** : envoyer 1 à 3 compagnons en expédition **1 h / 4 h / 8 h** vers la Mine Murmurante, la Forêt d'Aubier,
  les Montagnes du Givre… → minerai, pierre, gemmes, bois.
- Les compagnons les plus montés rapportent plus. Retour = notification + petite cinématique de butin.
- Zones débloquées par l'histoire (Actes).

### Jardinier — le Jardin (voir §4, le gros morceau)

---

## 3. Métiers de fabrication

| Métier | PNJ | Produit | Pourquoi c'est utile |
|---|---|---|---|
| **Alchimiste** | Alaric | Potions : ×2 or, Frappe, critique, mana, Volonté… (10–30 min) ; Élixir de pureté ; essences | Pics de puissance pour passer un mur, nettoyer la Dissonance du Jardin |
| **Cuisinier** | Gaston | Repas (1–4 h, actifs hors-ligne) | Les repas actuels deviennent des **recettes à ingrédients** (plus d'or) |
| **Forgeron** | Kaelen | Équipement **choisi** (emplacement + stat principale) au niveau d'étage actuel ; **panoplies** | Viser l'objet voulu au lieu d'espérer un drop |
| **Enchanteur** | Silas | **Brisage** : un objet → runes de ses stats ; **Forgemagie** : appliquer une rune | Personnaliser l'équipement, avec un peu de risque |

### Forgemagie (version mobile du système Dofus)
- Rune appliquée sur un objet : **réussite** (stat +), **réussite critique** (stat ++), **échec** (rien, rune perdue) ou
  **échec critique** (une autre stat baisse un peu). Chances affichées clairement.
- Le niveau d'Enchanteur améliore les chances. Une rune « Dissonante » rare : énorme bonus, gros risque.

### Panoplies
- Une panoplie par Acte (6 pièces), fabriquée avec les ressources des monstres de l'Acte.
- Porter 2/4/6 pièces = bonus de set. Voir la question 1 sur ce qui survit à l'Ascension.

### Fabrication sur mobile
- Fiche de recette : ingrédients (icônes + quantités possédées), bouton **Fabriquer** / **×10** / **Max**.
- Petits temps de fabrication (5 s à 2 min, en file d'attente) ou instantané selon l'atelier, XP de métier à chaque fabrication.
- Les recettes inconnues apparaissent en silhouette avec un indice.

---

## 4. Le Jardin

### Base
- Une **grille de parcelles** dans le Fief : **3×3 au départ**, agrandissable jusqu'à **6×6** (niveau de Jardinier, métal, gemmes).
- Toucher une parcelle vide → planter une graine. Les plantes poussent **en temps réel** (3 stades, sprites existants),
  même hors-ligne : de 15 min (plantes simples) à 12 h (rares). Notification quand c'est prêt.
- Récolte : ingrédients + chance de récupérer des graines + XP de Jardinier. Bouton « Tout récolter ».

### Saisons (les 4 Esprits)
- Une saison par **semaine réelle** : Printemps, Été, Automne, Hiver.
- Chaque plante a sa saison préférée (pousse plus vite, rend plus) et peut souffrir hors saison.
- Certaines mutations **n'arrivent qu'en une saison** (ex. le Cristal de givre en hiver) → raison de revenir chaque semaine.

### Mutations par voisinage (le cœur du système)
Quand deux plantes **mûres** sont **côte à côte** (haut/bas/gauche/droite) et qu'une **parcelle vide** les touche toutes les deux,
il y a chaque heure une chance qu'une **pousse mutante** apparaisse sur cette parcelle vide.

| Rang | Plantes | Obtention |
|---|---|---|
| **I — communes** | Herbe robuste, Fleur rosée, Racine terreuse, Champignon terreux, Graine solaire | Achetables / butin |
| **II — croisées** | Trèfle doré, Rose sanguine, Lys de givre, Racine éponge, Fleur de lave | Mutation de deux rang I |
| **III — rares** | Tournesol radieux, Cristal de givre, Orchidée silencieuse | Mutation de deux rang II (+ saison) |
| **IV — légendaire** | **Graine-Cœur d'Yggdrasil** | Une parcelle **entourée de 4 rang III** différents, au printemps |

Exemples de croisements (à équilibrer) :
- Herbe robuste + Fleur rosée → **Trèfle doré**
- Graine solaire + Racine terreuse → **Fleur de lave**
- Fleur rosée + Racine terreuse (hiver) → **Lys de givre**
- Champignon terreux + Herbe robuste → **Racine éponge**
- Fleur rosée + Champignon terreux → **Rose sanguine**
- Graine solaire + Trèfle doré (été) → **Tournesol radieux**
- Lys de givre + Racine éponge (hiver) → **Cristal de givre**
- Rose sanguine + Champignon terreux (nuit / automne) → **Orchidée silencieuse**

→ La Graine-Cœur devient **l'aboutissement du Jardin** et remplace la version simple actuelle de l'**Ancre de la Création**.

### Ce qui pimente la grille
- **Effets de voisinage** : le Trèfle doré augmente les chances de mutation autour de lui, la Racine éponge arrose ses voisines (pousse +25 %),
  le Champignon aime l'ombre d'une Orchidée…
- **Traits aléatoires** sur une plante : *Géante* (×2 récolte), *Dorée* (vend cher / gemmes), *Lumineuse* (XP ×2).
- **La Dissonance** (risque, optionnel) : rarement, une plante devient *Dissonante* (violette). Ingrédient très puissant pour Alaric…
  mais elle peut **contaminer ses voisines**. Il faut la récolter vite ou la soigner (Élixir de pureté). Tension et décision.
- **Nuisibles** (sprites existants) : scarabées et vers apparaissent parfois sur les plantes → on les tapote pour les chasser (petit bonus).
- **Herbier** : collection de toutes les plantes et mutations découvertes (recettes cachées, indices d'Alaric) → % de complétion, Hauts faits.

---

## 5. Équilibrage & monétisation
- Les bonus de fabrication restent **temporaires** (potions, repas) ou **bornés** (équipement de la vie en cours) pour ne pas casser l'équilibrage du prestige.
  → nouvelle passe du simulateur une fois en place.
- Monétisation « temps » uniquement : engrais (accélère une parcelle), parcelles supplémentaires, **Pack du Jardinier** au déblocage du Jardin
  (graines rares + engrais), places d'expédition. Jamais de mutation garantie achetable.

## 6. Découpage proposé
1. Coffre de ressources + drops par famille de monstres (Chasseur).
2. Jardin : grille, pousse en temps réel, saisons, récolte, Herbier.
3. Mutations par voisinage + Graine-Cœur (Ancre de la Création).
4. Alchimiste + Cuisinier (recettes, XP de métier) ; les repas actuels passent aux ingrédients.
5. Expéditions (Mineur / Bûcheron).
6. Forgeron (fabrication ciblée, panoplies) + Enchanteur (brisage, forgemagie).
7. Dissonance, nuisibles, traits ; équilibrage.

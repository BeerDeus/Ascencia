> **Implémenté le 2026-07-17** — voir `config.js` (unlockZone=5, scale Zones 5-10 compressé), `game/player.js` (Défense/5 niveaux), `game/ascension.js` (Peu Commun dès le début, Rare auto à la 1ère Ascension), `data/constellations.js` (harmonie_08 remplacé par un nœud Pénétration/Défense, TRUNK gratuit). Ce rapport reste la référence du diagnostic et du calcul ; le statut "recommandation" ci-dessous est désormais du passé.

# Rapport d'équilibrage — Zone 10 / Déblocage de l'Ascension

Date : 2026-07-16. Méthode : simulation numérique (pas d'estimation à l'œil) à partir des formules réelles de `game/player.js` (derive/baseStats), `game/monsters.js` (deriveEnemy/build), `game/combat.js` (strike) et des données brutes de `data/enemies.gen.js` / `data/enemies.custom.js` / `data/items.gen.js`. Script conservé si besoin de le rejouer avec d'autres hypothèses.

## Verdict

**Non, un joueur en progression normale ne bat pas le boss de la Zone 10 — et il ne bat déjà plus de façon fiable le boss de la Zone 5.** Le mur de difficulté apparaît dès la **Zone 4** (combat à pile ou face) et devient **infranchissable à partir de la Zone 5**. Baisser le seuil d'Ascension à la Zone 5 ne suffit donc pas : il faudrait soit le baisser beaucoup plus bas (Zone 3, seul palier où la marge est confortable), soit corriger la courbe de difficulté elle-même. Les deux leviers sont détaillés plus bas.

Sur les Constellations : oui, la récompense actuelle d'une première Ascension est trop faible pour "donner un vrai plus" — le calcul est détaillé en section 4.

## 1. Hypothèse de simulation ("progression normale")

- Le joueur nettoie chaque monstre d'une zone **10 fois** (WIN_REQ) + le boss, zone par zone, dans l'ordre — c'est la condition mécanique du jeu pour déverrouiller la zone suivante ET pour débloquer le bouton du boss (`allCleared`, voir `views/aventure.js`).
- Répartition des points d'attribut par niveau (3/niveau) testée sous 2 hypothèses : **répartition égale** (Vie/Force/Agilité/Chance/Intelligence à parts égales) et **priorité DPS** (45% Force, 30% Vie, 25% le reste) — la Défense n'est jamais allouable manuellement (+1 automatique tous les 10 niveaux seulement).
- Équipement : **un objet commun par emplacement** (8/9 emplacements — voir constat ci-dessous) + enchantement à l'Enchanteur (Capitale), rareté commune.
- Bonus Codex/Maîtrise inclus (dérivés automatiquement des kills réels de ce parcours — voir détail).
- Combat résolu en **espérance mathématique** (dégâts moyens, pas de tirage aléatoire) : légitime ici car Ascencia est un combat automatique en arrière-plan, sans exécution "skill" du joueur au-delà du choix d'équipement/attributs et de quelques consommables — la comparaison de stats brutes est donc plus prédictive que dans un RPG à contrôle actif.

## 2. Constat n°1 — le plafond "Commun" n'est pas une hypothèse, c'est une règle du jeu

Avant la toute première Ascension, **seule la rareté "Commune" est crafta​ble à la Forge**. Le nœud `trunk_uncommon` (Constellations) qui débloque le Peu Commun ne peut être acheté qu'avec des points de Constellation — qui n'existent qu'après avoir Ascendé au moins une fois. Et comme il n'y a **aucun loot d'équipement** dans le jeu (tout passe par le craft, cf. mémoire déjà actée), il n'existe **aucun moyen de sortir du Commun avant la première Ascension**, quelle que soit la durée du farm.

Ajout : le catalogue `items.gen.js` ne contient **aucun objet de type "artefact"** (0 sur 192 items). L'emplacement Artefact reste donc vide toute la partie pré-Ascension — un joueur "en progression normale" n'équipe que **8 des 9 emplacements**, pas 9.

Chiffrage de ce que rapporte l'équipement + enchantement communs sur les 8 emplacements (moyenne des objets communs propres à chaque emplacement, plus espérance de l'enchantement à budget fixe [1,1]) :

| Source | Vie | Force | Agilité | Chance | Intelligence | Défense |
|---|---|---|---|---|---|---|
| Objets communs (8 pièces) | +5.25 | +1.95 | +2.22 | +0.95 | +2.88 | +2.58 |
| Enchantement commun (8 pièces) | +1.50 | +1.00 | +1.75 | +1.25 | +1.17 | +1.33 |
| **Total** | **+6.75** | **+2.95** | **+3.97** | **+2.20** | **+4.05** | **+3.92** |

Soit environ **24 points d'attribut au total**, répartis sur 6 attributs. À titre de comparaison, à la Zone 10 le personnage a gagné **105 points d'attribut par le niveau seul** (voir section suivante) — l'équipement pèse pour moins de 20% du total, et son poids RELATIF continue de baisser à mesure qu'on avance (la Forge ne progresse pas, le niveau si). **L'équipement n'est structurellement pas le levier de puissance avant l'Ascension : c'est presque un cosmétique.**

## 3. Constat n°2 — simulation zone par zone

Progression XP réelle du parcours "10x chaque monstre + boss, zone par zone" (courbe `xpForLevel = round(100 × 1.15^(niveau-1))`) :

| Zone atteinte | Niveau | Points d'attribut cumulés | Kills cumulés |
|---|---|---|---|
| 5 | 22 | 63 | ~192 |
| 10 | 36 | 105 | 559 |

Résultat du combat contre le boss de chaque zone (répartition **priorité DPS**, la plus favorable des deux testées, bonus Codex/Maîtrise inclus) :

| Zone | Boss | Niv. | ATK joueur | DÉF joueur | PV joueur | PV boss | ATK boss | Temps pour tuer le boss | Temps pour être tué | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Roi Slime | 6 | 15.2 | 4.9 | 47 | 64 | 6 | 10.0s | 121.3s | **Large victoire (×12)** |
| 2 | Ratman | 11 | 25.8 | 5.9 | 66 | 101 | 14 | 9.2s | 20.5s | **Victoire confortable (×2.2)** |
| 3 | Grand Gobelin Grognon | 14 | 32.1 | 5.9 | 74 | 114 | 14 | 7.8s | 25.2s | **Victoire confortable (×3.2)** |
| 4 | Ogre Colossal | 18 | 40.5 | 7.9 | 85 | 198 | 26 | 13.2s | 13.6s | **Pile ou face (×1.03)** |
| 5 | Ogre Colossal (rescale) | 22 | 49.0 | 8.9 | 96 | 285 | 38 | 16.8s | 9.6s | **Perte sans intervention (×0.57)** |
| 6 | Dragonnet de Feu | 25 | 57.3 | 8.9 | 104 | 346 | 43 | 17.9s | 7.3s | **Perte (×0.41)** |
| 7 | Géant du Marais | 29 | 65.7 | 8.9 | 130 | 486 | 54 | 17.8s | 8.4s | **Perte (×0.47)** |
| 8 | Gardien de Pierre Éternel | 31 | 69.9 | 9.9 | 135 | 567 | 73 | 42.1s | 6.1s | **Écrasant (×0.14)** |
| 9 | Djinn | 34 | 76.3 | 9.9 | 143 | 722 | 76 | 30.0s | 4.9s | **Écrasant (×0.16)** |
| 10 | Minotaure | 36 | 80.5 | 9.9 | 149 | 780 | 117 | 41.5s | 3.7s | **Écrasant (×0.09)** |

(la répartition "égale" est systématiquement pire — la Zone 4 y est déjà perdante, ×0.53).

Lecture : dès que le ratio de droite tombe sous ×1, le boss tue le joueur plus vite que l'inverse — en combat automatique sans échappatoire, c'est une défaite mathématiquement garantie (les potions/consommables ajoutent des PV ponctuels, pas un DPS soutenu ; ils peuvent faire basculer un ×0.9-1.0, pas un ×0.1).

**Conséquence pratique : un joueur qui suit les règles du jeu ne "traverse" pas les Zones 6 à 10 pour ensuite échouer au bout — il reste bloqué dès la Zone 4-5**, avant même d'avoir une chance d'atteindre la Zone 10. La question posée ("est-ce que la Zone 10 est jouable") a donc une réponse encore plus radicale que prévu : elle n'est pas *accessible* dans des conditions normales.

## 4. Pourquoi ça casse : Défense/Pénétration ne suivent pas le `scale` de zone

Le `scale` des zones grimpe de ×0.20 (Zone 1) à ×2.60 (Zone 10), soit ×13 — et il s'applique **linéairement** aux PV/Attaque/Défense des monstres (voir "REVUE D'ÉQUILIBRAGE v2" dans `config.js`, courbe volontairement de plus en plus raide).

Côté joueur, l'Attaque suit à peu près ce rythme (Force ≈ linéaire avec le niveau). Mais :
- La **Défense** n'est quasiment pas indexée sur le niveau (+1 tous les 10 niveaux seulement, pas allouable) ni sur l'équipement commun (+3.9 en tout sur 8 pièces). Résultat : Défense ≈ 8-10 du début à la fin, pendant que l'Attaque des boss passe de 6 à 117 (×19). Comme les dégâts subis = `Attaque ennemie − Défense` (réduction PLATE, pas en %), la Défense devient statistiquement nulle dès la Zone 5-6.
- La **Pénétration d'armure** (`0.5 × √Force`) et la **Résistance** (`0.3 × √Intelligence`) sont en **racine carrée** d'un attribut qui grossit linéairement — donc elles-mêmes grossissent en gros comme √niveau, alors que la Défense/l'Attaque adverses grossissent linéairement avec `scale`. Au Zone 10, l'Attaque du joueur (80.5) est quasiment absorbée telle quelle par la Défense du Minotaure (52 après scale) — la pénétration (~7%) n'entame presque rien.

C'est une **incohérence structurelle entre deux courbes** (scale linéaire des monstres vs. mitigation en racine carrée du joueur), pas un simple manque de points de vie. Tant que cette mécanique reste telle quelle, reculer le seuil d'Ascension déplace le mur sans le supprimer.

## 5. Recommandations

### A. Sur le seuil de déblocage de l'Ascension

- **Zone 5 ne suffit pas** (déjà perdant, ×0.57 dans le meilleur des cas testés). Le seul palier avec une marge confortable est la **Zone 3** (×3.2).
- Deux options, non exclusives :
  1. **Corriger la courbe** plutôt que déplacer le seuil : ralentir la croissance de `scale` entre Zone 4 et Zone 10 (actuellement 0.66→2.60, ×3.9 sur 6 zones — c'est le vrai point de rupture), et/ou rendre la Défense allouable ou scalante (ex : Défense += fonction du niveau, pas seulement tous les 10 niveaux), et/ou donner à la Pénétration/Résistance une composante linéaire en plus de la racine carrée.
  2. Si on préfère ne toucher qu'au seuil sans retoucher les formules : le fixer à la **Zone 3-4** (Zone 4 = pile ou face, jouable avec un peu de marge grâce aux potions/Symphonies). Zone 5+ resterait un mur tant que le point 1 n'est pas traité.
- Recommandation : **traiter le point 1 (courbe) est prioritaire** — sinon, même après avoir baissé le seuil, la première branche de Constellation ("Harmonie", qui débloque le Peu Commun) ne suffira toujours pas à passer la Zone 5, et le joueur se retrouvera bloqué à un mur simplement décalé de quelques zones.

### B. Sur les récompenses de Constellation

Calcul des points gagnés à la **toute première** Ascension (`game/ascension.js pointsBreakdown`) : `zonePoints = max(0, zone_atteinte − (seuil−1)) × 1` + `goldPoints = or_accumulé ÷ 10000`.

- Ascender pile au seuil (quel que soit le seuil choisi, Zone 5 ou Zone 10) ne rapporte que **+1 zonePoint** — la formule est relative au seuil, donc ce problème ne se résout pas en changeant le seuil.
- Or accumulé sur tout un run (or non dépensé par le craft, qui ne consomme que bois/métal/tissu) : de l'ordre de 20 000 à 45 000 sur un parcours zone1→9, soit **+2 à +4 goldPoints** selon ce qui a été dépensé en consommables/emplacements de sac entre-temps.
- Total réaliste à la première Ascension : **~3 à 5 points**.
- Or, le nœud `trunk_uncommon` (obligatoire, aucun bonus de combat, juste le déverrouillage du Peu Commun) coûte **1 point**, et le premier nœud utile d'une branche (`harmonie_01`, par ex.) en coûte encore **1**, puis 2, puis 3... Le premier "Éclat" (nœud majeur, +3 attribut ou +4% palier) est à la position 4 d'une branche et nécessite d'avoir acheté les 3 nœuds mineurs précédents — **~5-6 points cumulés** rien que pour l'atteindre. La première jauge de rareté supérieure (Rare, position 8) coûte à elle seule **12 points**.

**Conclusion : la première Ascension (et probablement la deuxième) ne permet d'acheter qu'un nœud mineur isolé, sans set de bonus cohérent — le sentiment de "vrai plus" ne peut pas apparaître avant la 3e-4e Ascension au mieux.** C'est un problème de **rythme d'acquisition**, pas de magnitude des bonus par nœud (un "Éclat" +3 Force ou +4% à un stat, en 1 seul point de Constellation dépensé, est déjà comparable à ~1-2 niveaux de jeu — l'échelle des bonus eux-mêmes est correcte).

Pistes concrètes, cumulables :
1. **Rendre `trunk_uncommon` gratuit** (0 point) — c'est un péage obligatoire, pas un choix, il ne devrait pas taxer le tout premier point gagné.
2. **Augmenter `pointsPerZone`** (actuellement 1) à 2 ou 3 — accélère toutes les Ascensions suivantes, pas seulement la première.
3. **Bonus de bienvenue** à la première Ascension uniquement (+3 à +5 points flat), pour garantir un premier "vrai" choix (un Éclat ou 2-3 étoiles) dès le premier run.
4. Alternative plus légère : baisser le coût des 3 premiers nœuds de chaque branche à 1 point fixe (au lieu de 1/2/3 cumulés) pour que le premier "set" de bonus soit accessible en 3-4 points au lieu de 6+.

## 6. Annexe (2026-07-16) — Test chiffré des 5 pistes proposées

Même méthode, mêmes hypothèses. Répartition "priorité DPS" uniquement (la plus favorable). Marge = temps pour être tué ÷ temps pour tuer le boss (>1 = victoire).

| Scénario | Z4 | Z5 | Z6 | Z7 | Z8 | Z9 | Z10 |
|---|---|---|---|---|---|---|---|
| Base actuelle | ×1.03 | ×0.57 | ×0.41 | ×0.47 | ×0.14 | ×0.16 | ×0.09 |
| (2) Peu Commun dès le début | ×2.31 | ×1.07 | ×0.72 | ×0.76 | ×0.23 | ×0.25 | ×0.13 |
| (5) Défense +1/5 niveaux | ×1.16 | ×0.61 | ×0.45 | ×0.51 | ×0.15 | ×0.17 | ×0.09 |
| (2)+(5) combinées | ×2.73 | ×1.17 | ×0.81 | ×0.82 | ×0.24 | ×0.26 | ×0.14 |
| (3) Courbe zone5-10 compressée ×0.5 | ×1.03 | ×0.93 | ×0.75 | ×0.95 | ×0.52 | ×0.51 | ×0.39 |
| **(2)+(3)+(5) combinées** | **×2.73** | **×2.07** | **×1.64** | **×1.80** | ×0.92 | ×0.87 | ×0.63 |
| Après 1ère Ascension : Rare auto + secondaires + (3)+(5) | ×5.27 | ×3.81 | ×2.89 | ×2.94 | ×1.63 | ×1.42 | **×1.04** |

### Avis détaillé par proposition

**Baisser le seuil à la Zone 5** — Insuffisant seul (×0.57, toujours perdant). Devient un bon seuil *si* combiné à (2)+(3)+(5) — dans ce cas Zone 5 est confortable (×2.07) et Zone 7-8 marque la vraie limite. Sans les autres correctifs, ne pas s'arrêter à Zone 5 : ça ne fait que déplacer le mur de 4 à 5.

**Peu Commun dès le début + Rare obligatoire à l'Ascension** — Idée qui cible juste. Deux effets bien distincts à ne pas confondre : le "Peu Commun dès le début" aide le **premier run pré-Ascension** (repousse le mur de Zone 4 à Zone 5-6, ×1.07-2.31) ; le "Rare auto-débloqué" n'aide, par construction, que le **run suivant** (après avoir Ascendé une première fois) — c'est lui qui, combiné aux corrections de courbe/Défense, ramène la Zone 10 à une marge de ×1.04 (limite juste, difficile mais gagnable — exactement ce qu'on veut d'un boss de fin de contenu). Remplacer le nœud de déblocage Rare actuel par autre chose est une bonne idée : ce nœud ne rapportait qu'un déverrouillage, pas un bonus de combat, autant garder le slot de points pour un vrai choix. Un bon candidat pour le remplacer : un nœud qui **redonne un peu de la Défense/Pénétration manquante** (voir plus bas), puisque c'est le vrai goulot d'étranglement identifié en section 4.

**Compresser la courbe Zone 5-10** — C'est le levier qui rapporte le plus, seul (Zone 10 passe de ×0.09 à ×0.39 avec une compression à 50%) et c'est lui qui permet à la combinaison finale d'atteindre l'équilibre. Garde bien l'esprit "ça grind" (Zone 8-9 restent les zones où ça commence à se tendre, cf. tableau) sans être un mur artificiel. Recommandé en priorité n°1.

**Défense +1 tous les 5 niveaux (au lieu de 10)** — Effet réel mais faible isolément (Zone 5 : ×0.57→×0.61 seulement) : la Défense n'est qu'une partie du problème (l'autre moitié, c'est que l'Attaque adverse grossit plus vite que l'Attaque du joueur ET que sa Pénétration). À garder — c'est gratuit et sans risque — mais ne pas en attendre plus qu'un appoint. Il serait plus impactant de le coupler à une **Pénétration qui grossisse un peu plus vite** (par ex. linéaire en Force plutôt qu'en √Force), pour attaquer le problème des deux côtés à la fois.

**Améliorer les bonus de Constellation pour Ascension+1, +2...** — Non testé numériquement ici (effet cumulatif sur plusieurs runs, pas un simple calcul de combat instantané), mais l'idée est saine et complémentaire — elle ne remplace pas la correction de courbe (section 4), elle sert la rejouabilité long terme. Piste concrète : indexer un petit bonus % (attaque/défense/résistance, façon capstone actuel) sur `state.ascension.count`, pour que chaque run recommence légèrement plus fort que le précédent, en plus des Constellations achetées — et régler l'économie de points (section 5.B du rapport) pour que ça se ressente dès la 2e-3e Ascension, pas seulement après en avoir fait dix.

### Recommandation finale

Combiner (2) Peu Commun dès le début + (3) courbe compressée (~50%) Zone 5-10 + (5) Défense/5 niveaux **avant** la première Ascension ; garder le seuil de déblocage à une zone où la marge tombe autour de ×1 dans cette configuration (**Zone 7-8**, pas Zone 5 — Zone 5 devient trop facile une fois ces trois correctifs appliqués) ; puis, au moment de l'Ascension, débloquer Rare automatiquement (en remplaçant le nœud dédié par autre chose, idéalement un bonus Défense/Pénétration) pour que la Zone 10 redevienne un vrai boss de fin de run difficile mais gagnable (×1.04) plutôt qu'un mur.

## 7. Limites du modèle

- Combat résolu en espérance (pas de tirage aléatoire ni de variance monstre ±8-30%, ni d'Instabilité de Larry) : la réalité aura plus de variance dans les deux sens, mais les écarts observés (×0.09 à ×0.57 dès la Zone 5) sont bien trop larges pour être comblés par de la chance ou des potions ponctuelles.
- Symphonies (Accords) non modélisées : apportent un burst occasionnel (buff, soin, dégâts) mais dépendent d'un drop aléatoire sur les 5 vrais boss (`boss_0` à `boss_4`) — inexistantes pour les boss "de repli" (Géant, Djinn, Minotaure...) qui ne les droppent pas, donc non disponibles de façon fiable au moment voulu.
- Répartition d'attributs testée sur 2 stratégies simples (égale / priorité DPS) — une stratégie plus fine (ex. investir uniquement Force+Chance pour maximiser le critique) a été esquissée mais ne change pas l'ordre de grandeur du problème (le goulot est la Défense/Pénétration, pas le choix d'attribut offensif).

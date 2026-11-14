# ASCENCIA — Game Design Document (v0.1, concept)

> RPG incrémental narratif pour Android (web + Capacitor).
> Grimpe étage par étage, tombe face au mur, **ascensionne**, renais plus fort, va plus loin.
> *« Le monde est une symphonie. Chaque frappe est une note. »*

---

## Sommaire
1. Pitch & piliers
2. Boucles de jeu (30 s → 1 mois)
3. Écran principal & combat
4. Le Héros : classes, Frappe, Partitions
5. Compagnons
6. Équipement, Forge, Enchantement
7. Couche 1 — Ascension (Éclats, Constellations, Arcanes)
8. Couche 2 — Résonance (Ancres, Symphonie)
9. Couche 3 — Éternité (post-game infini)
10. Le Fief (méta-base persistante)
11. Les Profondeurs (mode roguelite textuel)
12. Progression narrative : Actes I → X, Sagas
13. Contenu infini & live (Sagas, saisons, boss hebdo)
14. Machine à dopamine : feedbacks & rétention
15. Hors-ligne & notifications
16. Monétisation (F2P, sans pay-to-win toxique)
17. Économie & formules (v0, simulées)
18. Technique (web → Capacitor → Play Store)
19. Assets : utilisation & demandes
20. Roadmap
21. Questions ouvertes

---

## 1. Pitch & piliers

**Pitch** : un *tapper/idle* à la Tap Titans, habillé en RPG textuel. On frappe des monstres en pixel-art, une **Chronique** raconte chaque coup, chaque loot, chaque réplique de Larry. Quand le mur arrive, on **ascensionne** : on perd tout sauf sa **légende**, qui rend la vie suivante plus rapide et plus puissante. L'histoire *elle-même* est construite autour de ce cycle de mort et renaissance.

**Piliers**
- **Toujours un chiffre qui monte** : une barre se remplit à tout instant (vague, Ferveur, XP, Ascension, Acte).
- **Le reset est une récompense, pas une punition** : chaque Ascension = une vie plus rapide + nouveau contenu + morceau d'histoire.
- **Narration par fragments** : textes courts, dialogues, choix, lore à collectionner. Jamais de mur de texte imposé.
- **Sessions courtes, retours fréquents** : 2–5 min suffisent, l'idle fait le reste.
- **Collection** : Bestiaire, Arcanes, Jardin, Chroniques, Hauts Faits → toujours un % à compléter.
- **Signature sonore** : chaque frappe joue une note dans la gamme de l'Acte ; les combos composent une mélodie (cohérent avec le lore « monde = symphonie »).

---

## 2. Boucles de jeu

| Échelle | Boucle | Récompense |
|---|---|---|
| **30 s** | Taper, tuer 10 monstres, battre le boss d'étage | Or, loot, étage +1, notes de musique |
| **5 min** | Améliorer Héros/Compagnons, lancer Partitions, passer un palier de Compagnon | Pic de DPS visible, saut d'étages |
| **1 session (15–60 min)** | Grimper jusqu'au mur → **Ascension** | Éclats → Constellations / Arcanes, run suivant plus rapide |
| **1 jour** | Primes quotidiennes, Jardin, Patrouilles, clés de Profondeurs, calendrier de connexion | Ressources Fief, gemmes, lore |
| **1 semaine** | Boss Cicatrice hebdo, Défi d'Ascension hebdo, saison du Jardin | Arcanes rares, cosmétiques |
| **1 mois+** | Actes de l'histoire, Seuils Harmoniques, **Résonance** | Nouvelle couche de méta, nouvelle classe, automatisations |
| **∞** | Éternité, Incursions du Statique (saisons) | Rangs de Gardien, classements, cadres de profil |

**Règle d'or** : à tout moment, le joueur doit avoir *au moins 3* objectifs visibles à moins de 5 min (prochain palier de compagnon, prochain boss, prochaine Prime, prochaine récolte…).

---

## 3. Écran principal & combat

### Layout (portrait 9:16)
```
┌──────────────────────────────────┐
│ Acte II · Étage 37      💰 4.2M  💎 120 │  ← en-tête
│ ●●●●●●○○○○  [BOSS]                │  ← 10 vagues + boss
│                                  │
│      [ fond vertical qui défile  │  ← le fond (550×1536) monte
│        à chaque étage ]          │     d'un cran par étage
│          ╔══════════╗            │
│          ║  SPRITE  ║  -1.2K     │  ← cible tapable, chiffres de dégâts
│          ║ MONSTRE  ║  CRIT!     │
│          ╚══════════╝            │
│   PV ████████████░░░░  62%       │
│   Volonté (boss) ███████░ 21s    │
│   Ferveur ▓▓▓▓▓▓▓░░░ → Crescendo │
├──────────────────────────────────┤
│ CHRONIQUE                        │  ← log textuel (4 lignes, extensible)
│ › Vous frappez le Loup Dissonant  │
│   (1 240, CRITIQUE)               │
│ › Kaelen martèle : 830            │
│ › Larry : « Joli. Pour un insecte.»│
├──────────────────────────────────┤
│ [♪1][♪2][♪3][♪4][♪5]  Partitions  │
├──────────────────────────────────┤
│ Héros│Compag.│Équip.│Fief│Ascens.│⋯ │
└──────────────────────────────────┘
```

### Règles de combat
- **10 monstres par étage**, puis un **boss**. Le boss a une barre de **Volonté** (≈ timer de 30 s) : à 0, le héros recule à l'étage précédent en mode *farm* ; bouton **« Défier »** pour retenter.
- Les boss lancent des **attaques spéciales** (texte + flash) qui retirent des secondes de Volonté → on peut les **parer** en tapant une icône bouclier qui apparaît 0,8 s (skill + interaction).
- **Dégâts** = Frappe (tap) + DPS Compagnons + auto-attaque du héros (idle).
- **Ferveur** : chaque tap remplit la jauge, elle redescend si on arrête. Pleine → **Crescendo** (×2 dégâts, musique qui s'emballe, 10 s).
- **Monstres spéciaux** (dopamine aléatoire) :
  - *Gobelin Vulnérable* (doré) : fuit en 6 s, ×20 or si tué.
  - *Mimique* : coffre piégé, gros loot d'équipement.
  - *Rat Voleur* : vole 5 % de l'or s'il s'échappe — urgence.
  - *Écho errant* : donne 1 Fragment d'Écho (post-Résonance).
- **Élan (saut d'étages)** : si l'overkill d'un boss dépasse X, on saute 1 à N étages d'un coup (« FULGURANCE ! +4 étages »). Les débuts de run deviennent une avalanche.
- **Auto-progression** : toggle « Avancer automatiquement » (on peut le couper pour farmer).

### La Chronique (le côté « RPG textuel »)
- Log coloré : dégâts (blanc), crits (or), loot (couleur de rareté), dialogues (italique, portrait mini), lore (violet).
- Variantes de texte par famille de monstre (« Le slime se dédouble… puis se ravise »), par arme, par classe.
- **Interventions de Larry** : 1 réplique toutes les ~10 min ou sur événement (crit énorme, échec de boss). Il commente, se moque, encourage parfois — fil rouge comique et menaçant.
- Le log est **sauvegardé par étage** → onglet « Chronique de la run » relisible (souvenirs, screenshots partageables).

---

## 4. Le Héros

### Classes (choix à chaque Ascension)
| Classe | Style | Mécanique propre |
|---|---|---|
| **Guerrier** | Actif, tapper | Ferveur ×1,5 plus rapide ; *Rage* : chaque 100 taps = coup lourd (×25) |
| **Archer** | Critique, idle | Auto-tirs (taps automatiques/s) ; *Œil du Faucon* : crits en chaîne |
| **Mage** | Burst, Partitions | Mana max/régén +, Partitions plus fortes ; *Surcharge* : lancer 2 Partitions d'affilée = combo |
| **Harmoniste** *(débloqué via Résonance)* | Musique, hybride | *Portée* : enchaîner les Partitions dans un ordre (mélodie) = bonus croissant |

- **Maîtrise de classe** (persistante) : chaque étage atteint avec une classe donne de l'XP de Maîtrise → bonus passifs globaux. Incite à jouer les 3 classes.
- La classe ouvre une **branche dédiée** dans les Constellations.

### Frappe (niveau du héros)
- Acheté avec l'or (`coût = 5 × 1,07^niv`), paliers tous les 25 niveaux.
- La Frappe inclut aussi **3 % du DPS des Compagnons** (le tap reste pertinent tout le jeu).

### Partitions (compétences actives — sprites « symphonie »)
| Partition | Effet | Recharge |
|---|---|---|
| **Trille Foudroyant** | Burst : X s de DPS instantané en éclairs | 1 min |
| **Staccato Vif** | +10 taps auto/s pendant 30 s | 5 min |
| **Crescendo de Fureur** | Frappe ×3 pendant 30 s | 10 min |
| **Cantique de Soin** | Restaure 50 % de Volonté + immunise aux attaques de boss 10 s | 10 min |
| **Accord Parfait** | Ultime : tous dégâts ×5, 30 s | 30 min |

- Coût en **Mana** (régénération passive). Améliorables avec l'or (run) puis via la **Symphonie** (permanent).
- **Combo harmonique** : lancer 3 Partitions en < 5 s → « ACCORD ! » bonus.

---

## 5. Compagnons

- **~30 compagnons** recrutés dans l'ordre, chacun ≈ 6× plus fort que le précédent, coûtant ≈ 8×.
- **Paliers de niveau** (10, 25, 50, 75, 100, 150, 200, 300…1000) : multiplicateur ×2,5 puis ×3 → flash + son + texte « Kaelen atteint le rang **Maître-Forgeron** ! ».
- Chaque compagnon a un **type** (Mêlée / Distance / Magie) → synergies avec la classe et les Arcanes.
- Chaque compagnon a **1 compétence passive** débloquée aux paliers (ex. Gaston : +10 % durée des repas ; Chasseuse : +dégâts vs Bêtes).
- Achat **×1 / ×10 / ×25 / Max**.

**Compagnons issus du lore** (débloqués par l'histoire) : Garde d'Aubier, Maître Elian, Kaelen, Lysandra, Maître Alaric, Gaston, la Maîtresse Chasseuse, Silas. Le reste : mercenaires, Exilés (Saga II), créatures apaisées (la Chimère, le Forgeron Fantôme…) → *sprites à demander*.

---

## 6. Équipement, Forge, Enchantement

- **8 emplacements** : Arme, Tête, Torse, Jambes, Pieds, Mains, Amulette, Anneau.
- **Raretés** : Commun · Peu commun · Rare · Épique · Légendaire · Mythique · *Dissonant* (affixes puissants mais à double tranchant, ex. +80 % Frappe / −20 % or).
- **Niveau d'objet = étage du drop** → le loot se renouvelle naturellement pendant la run.
- **Affixes** : Frappe %, DPS Compagnons %, Crit %, Dégâts crit %, Or %, Mana, Volonté, Élan, dégâts vs famille…
- **Sets d'Acte** (légendaires) : 2/4/6 pièces = bonus (ex. *Set du Juge* : les crits retirent 1 s… au boss).
- **Forge de Kaelen** : fusion 3 → 1 (rareté +1), recyclage → métal.
- **Tour de Silas** : enchantement (reroll d'un affixe) contre *Essence Dissonante*.
- **Ascension = perte de l'équipement** (fidèle au lore), **sauf l'emplacement Héritage** (1 objet conservé, +1 slot via Constellations/Résonance). → vraie décision à chaque Ascension.

---

## 7. Couche 1 — Ascension

### Déclencheur
- **1re Ascension = scénarisée** : fin de l'Acte II, le *chef-d'œuvre* de Larry est imbattable → défaite, Lysandra explique l'Ascension. Tutoriel émotionnel.
- Ensuite : disponible dès l'étage 50, à tout moment.

### Ce qui est perdu / conservé
| Perdu | Conservé |
|---|---|
| Étage, or, niveaux Héros/Compagnons/Partitions (run), équipement (sauf Héritage), buffs temporaires | Fief, Constellations, Arcanes, Bestiaire, Maîtrises, Chroniques, gemmes, Hauts Faits, progression d'histoire |

### Gains
- **Éclats d'Ascension** = `f(étage max de la run)` (exponentiel doux, cf. §17).
- **Légende** = total d'Éclats gagnés depuis le début (compteur, jamais dépensé) → **+5 % dégâts par point** + sert de « poids » pour franchir les **Seuils Harmoniques**.
- Les Éclats (monnaie) se dépensent dans :

### Constellations (arbre permanent, fond `skill_bg`)
5 constellations, nœuds qui s'allument (animation d'étoile qui s'embrase) :
- **Le Glaive** — Frappe, Ferveur, crits, branche Guerrier.
- **La Meute** — Compagnons, paliers, branche Archer.
- **Le Grimoire** — Mana, Partitions, branche Mage.
- **La Bourse** — Or, hors-ligne, coffres.
- **Le Sentier** — vitesse de run : *Mémoire du chemin* (démarrer à 5→25 % de l'étage max), *Élan*, auto-achat, +1 slot Héritage.

### Arcanes (cartes à collectionner — `assets/cards`)
- ~40 cartes à effets permanents (style « artefacts » de Tap Titans), **piochées avec des Éclats** (coût croissant à chaque carte possédée), puis **améliorées** avec des Éclats.
- **Familles** avec bonus de set : *Tarot* (Magicien, Impératrice, Empereur, Force, Fortune, Jugement, Monde…), *Vents* (Notos, Borée, Zéphyr, Eurus), *Astres* (Lune de sang, Soleil noir, Étoile mourante), *Temps* (Grain du passé, Flux du présent, Vision du futur, Écho d'éternité), *Bêtes célestes* (Griffon solaire, Loup stellaire, Faucon comète, Léviathan…), *Reliques* (Couronne, Sceptre, Enclume, Épée brisée…).
- Animation de pioche : carte retournée, lueur selon rareté, son. **Taux affichés** (obligation Play Store), et **jamais achetables en argent réel directement**.

### UX Ascension (essentiel pour l'addiction)
- Bouton permanent : **« Ascensionner : +347 Éclats (+23 % vs dernière) »**, valeur qui grimpe en direct.
- Indicateur **« Rendement »** (Éclats/heure) + conseil de Lysandra quand le rendement baisse (« Ta lumière vacille. Il est temps. »).
- **Rituel** : écran qui se dissout en particules → étoiles → la constellation se reforme → compteur d'Éclats qui défile → retour au Hameau. 5 s, skippable après la 3e fois.

---

## 8. Couche 2 — Résonance (« l'Ascension Finale »)

### Le mur
Vers l'étage ~300 (Noyau du Silence), la couche 1 plafonne (confirmé par simulation, §17). Le lore l'explique : *« il te faut une dernière renaissance »*.

### Débloquer : les 3 Ancres (Acte VIII)
| Ancre | Système | Épreuve |
|---|---|---|
| **Création** | Jardin | Faire éclore la *Graine-Cœur d'Yggdrasil* (plante légendaire, plusieurs jours, fleurs rares + 4 saisons) |
| **Chaos** | Chasse | Traquer les 3 Bêtes Primordiales : Léviathan, Phénix Cendré, Loup-Comète |
| **Destinée** | Profondeurs | Assembler le *Compas Stellaire* (pièces aux profondeurs 25 / 50 / 75) |

→ Mélange volontaire des systèmes : l'endgame oblige à toucher à tout le jeu.

### Résonance
- **Reset** : tout ce que l'Ascension reset + Éclats, Constellations, niveaux d'Arcanes (les cartes restent possédées).
- **Gain** : **Fragments d'Écho** = `f(Légende accumulée dans le cycle)`.
- **La Symphonie** (arbre de couche 2) :
  - **Harmoniques** : multiplicateurs globaux ×2, ×3…
  - **Mouvements** : améliorations permanentes des Partitions (nouveaux effets).
  - **Automatisations** (récompense reine des incrémentaux) : auto-Partitions, auto-achat Compagnons, **auto-Ascension** (paramétrable : à l'étage X / quand rendement < Y).
  - Déblocages : classe **Harmoniste**, +slots Héritage, plafonds de Constellations relevés, nouvelles Arcanes.
- Chaque Résonance rend les premières Ascensions **ultra rapides** (étages 1–200 en quelques minutes) → sentiment de toute-puissance.

---

## 9. Couche 3 — Éternité (post-game)

Après la fin (Acte X), le jeu continue :
- **Étages infinis 401+** : *Mouvements* (I, II, III…) de 100 étages, monstres recombinés + **affixes** (Blindé, Rapide, Statique, Miroir…).
- **Rang de Gardien** : chaque nouveau record d'étage donne des **Notes Éternelles** → arbre infini à petits gains (+1 %/niveau, sans plafond). Jamais de reset.
- **Cycle (NG+ optionnel)** : rejouer l'histoire avec des modificateurs (« Cycle II : le Statique ronge les couleurs ») contre des cosmétiques et un multiplicateur de Notes.

---

## 10. Le Fief (méta-base persistante, jamais reset)

Hub de retour quotidien. Bâtiments débloqués par l'histoire, améliorables (or + ressources + temps réel).

| Bâtiment | PNJ | Rôle | Hook de retour |
|---|---|---|---|
| **Forge** | Kaelen | Fusion, recyclage, craft d'équipement | Crafts à minuteur |
| **Laboratoire** | Alaric | Potions (buffs 30 min : ×2 or, ×2 Frappe, +crit) | Distillation à minuteur |
| **Auberge** | Gaston | Repas = buffs longs (2–8 h, actifs même hors-ligne) | « Le ragoût est prêt ! » |
| **Jardin** | — | 12 plantes × 3 stades, **saisons** réelles (1 semaine chacune), croisements → graines rares | Récoltes 2–12 h |
| **Tableau des Primes** | Garde | 3 Primes/jour + 1/semaine → jetons → boutique | Reset quotidien |
| **Pavillon de Chasse** | Chasseuse | Chasses ciblées (boss spéciaux), **Bestiaire** (paliers de kills = +dégâts vs famille) | Chasses quotidiennes |
| **Tour de Silas** | Silas | Enchantement, recherche d'Arcanes | — |
| **Observatoire** | Lysandra | Constellations, Chroniques (lore) | — |
| **Caserne** *(Acte IV)* | — | **Patrouilles** : envoyer des compagnons 1/4/8/12 h → loot | Retour de patrouille |

Le Fief s'affiche comme une illustration du village qui **s'embellit** visuellement à chaque amélioration (dopamine de construction).

---

## 11. Les Profondeurs (mode roguelite textuel)

Le contrepoint de l'Ascension : on **descend**.
- Coûte une **Clé de Brèche** (3/jour, recharge, + achetables en gemmes).
- **Carte à nœuds** (icônes existantes) : ⚔ Combat · 💀 Élite · ❓ Événement · 🔥 Repos · ⚒ Forge · 👑 Boss.
- Combat **au tour par tour simplifié** : héros avec PV, 3 actions (Frapper / Partition / Objet). Ici c'est un vrai *RPG textuel* : choix tactiques, pas de tap.
- **Événements à choix** (cœur narratif) — exemples :
  - *Autel dissonant* : « Offrir 20 % de tes PV pour une relique ? » [Offrir] [Profaner] [Ignorer]
  - *Le marchand masqué* (Larry déguisé ?) : objets à prix suspect.
  - *Chronique cristalline* : un souvenir de la guerre Harmonie/Silencieux (lore à collectionner).
  - *Le Double* : combat contre une copie de soi.
- **Récompenses** : Éclats d'Arcane (cible une carte précise), Essence Dissonante, Fragments, pièces du Compas Stellaire, records de profondeur (classement).
- Les buffs pris pendant la descente ne durent que la descente (roguelite pur).

---

## 12. Progression narrative

L'histoire **suit les étages ET les prestiges**. Le lore existant colle presque parfaitement à la structure.

| Acte | Étages | Lieux / Fond | Boss clés | Débloque |
|---|---|---|---|---|
| **I — L'Éveil** | 1–25 | Hameau d'Aubier, forêt, Mine Murmurante (`acte1_bg`) | Chef gobelin (10), Golem corrompu (20), Gardien spectral (25) + apparition de Larry | Compagnons, Forge, Partitions 1–2 |
| **II — Le Jouet** | 26–50 | Pont-la-Croisée, marais, tour de Silas (`acte2_bg`) | Hydre des marais (40), **Chef-d'œuvre de Larry (50, imbattable)** | Auberge, Primes, Chasse, Enchantement → **1re Ascension** |
| **III — Renaissance** | 51–75 | Retour à Aubier (`acte3_bg`) | **Juge Dissonant** (75) | Constellations, Arcanes |
| **IV — La Grande Brèche** | 76–100 | Montagnes du Givre, temple sous-marin (`acte4_bg`) | Hydre dissonante (90), **Gardien du Seuil** (100) | Caserne/Patrouilles, Profondeurs |
| **V — Les Seuils** | 101–180 | Brèche Instable (fond à demander) | Champion Dissonant (170), **Gardien Harmonique (180) = Seuil** | Chroniques cristallines |
| **VI — Le Chef-d'œuvre** | 181–250 | Réalité en décomposition | **Dragon Ancien** (250) | — |
| **VII — Le Noyau** | 251–300 | Noyau du Silence | « Pièces de théâtre » : Kaelen & Elian corrompus, fuite | Étages à **règles tordues** |
| **VIII — Les Ancres** | (mur ~300) | Fief, chasse, Profondeurs | Bêtes Primordiales | **Résonance** |
| **IX — Le Miroir** | 301–400 | Sanctuaire déformé, tour de cristal noir | Boss du passé remixés, **Larry (400)** | Classe Harmoniste |
| **X — Le Chant** | 400 | Le vide | **L'Écho Oublié** | Choix final, Éternité |
| **Sagas** | 401+ | Île céleste, forge naine, Incursions | Cicatrices, Statique | Live / saisons |

### Moments forts scénarisés
- **Acte VII — étages à règles** : chaque étage est une « pièce » de Larry avec un modificateur (taps inversés, compagnons qui t'attaquent, timer à rebours caché…). Rupture de rythme mémorable.
- **Seuil Harmonique (180)** : le Gardien a un bouclier de *Certitude* : dégâts quasi nuls tant que la **Légende** < seuil. Une barre « Poids de Légende : 74 % » = objectif clair → « encore 2 Ascensions ».
- **Acte X — Le Chant** (combat final unique) :
  1. *Vagues de Néant* qui effacent l'écran (la Volonté chute).
  2. *Îlots de mémoire* : taper les portraits des PNJ rencontrés (Kaelen, Gaston, Lysandra…) pour regagner de la Volonté.
  3. *Le Chant* : rejouer des séquences de Partitions affichées (mini-jeu de mélodie avec les 5 icônes symphonie) = dégâts.
  4. **Choix final** : **Sceller** (Voie du Geôlier : bonus idle/hors-ligne/défense) ou **Lier** (Voie du Compagnon : l'Écho devient un compagnon, bonus actifs). **Modifiable à chaque Résonance** → rejouabilité.

### Écriture
- Dialogues courts (≤ 3 bulles), portrait + effet machine à écrire, skippables.
- Chaque Acte se termine sur un **cliffhanger** (raison de revenir).
- Codex « Chroniques » : tout le lore relisible, avec % de complétion.

---

## 13. Contenu infini & live

- **Cicatrices (Saga I)** — boss hebdomadaire en rotation (Chimère céleste, Forgeron Fantôme, Double Sombre, + Liche, Vampire, Ogre, Géant, Dragonnet) : 3 essais/semaine, paliers de dégâts → récompenses.
- **Incursions du Statique (Saga II)** — saisons de 4–6 semaines :
  - Échelle séparée avec modificateurs ; **l'interface se désature** progressivement (le Statique « efface les couleurs ») et chaque victoire **recolore** le monde. Mécanique visuelle très satisfaisante.
  - Pass de saison, cadre de profil exclusif (`frames/`), classement.
- **Défi d'Ascension hebdo** : une run avec règle imposée (« Compagnons ×10, taps ×0 »).
- **Événements** saisonniers (Jardin d'hiver, Fête de Pont-la-Croisée…).

---

## 14. Machine à dopamine

### Feedbacks immédiats
- Chiffres de dégâts qui jaillissent, **taille/couleur selon l'ampleur**, crits avec léger *screen shake* + **vibration** (Haptics).
- **Musique procédurale** : chaque tap = note (gamme pentatonique → jamais faux), crit = accord, Crescendo = tempo qui accélère. Monstres corrompus → légère dissonance qui se « résout » à leur mort.
- Loot qui tombe avec **faisceau de couleur** par rareté ; légendaire = pause de 0,3 s + son unique.
- **Level-up / palier** : flash, texte qui pulse, compteur qui défile.
- Notation des grands nombres lisible (K, M, B, T, aa, ab…) ; option scientifique.

### Barres qui se remplissent (toujours ≥ 3 visibles)
Vague (10 pastilles) · PV monstre · Volonté · Ferveur · Mana · XP de Maîtrise · Progression d'Acte · **Éclats d'Ascension en direct** · Poids de Légende · minuteurs du Fief · Primes · Collection %.

### Récompenses variables
- Monstres spéciaux aléatoires (§3), **Messager de Lysandra** qui traverse l'écran (tap = cadeau, option pub ×2).
- Coffres avec révélation (tremblement → couleur), Arcanes retournées.
- *Near-miss* : boss raté à < 5 % → « Si près ! » + conseil ciblé + bouton retenter.

### Rétention
- Calendrier de connexion 28 jours (jour 7/14/28 = gros lots), **série de jours**.
- Primes quotidiennes/hebdo, boss hebdo, saisons du Jardin.
- **Écran de retour** « Pendant votre absence… » : gros chiffres, étages gagnés, récoltes prêtes.
- Cliffhangers d'Acte, Larry qui « attend » le joueur.
- **Hauts Faits** (~150) avec toasts, titres affichables.

### Garde-fous (éthique & Play Store)
- Pas d'énergie/stamina sur la boucle principale (frustration = désinstallation).
- Notifications limitées (≤ 2/jour, opt-in), pas de FOMO agressif sur les achats.
- Taux de drop affichés.

---

## 15. Hors-ligne & notifications

- **Gains hors-ligne** : or = DPS × durée × efficacité (25 % de base → 100 % via Constellations/Pass), plafond 8 h (→ 24 h).
- **Escalade somnambule** (Constellation) : le héros **monte des étages hors-ligne** jusqu'au premier boss qu'il ne peut pas battre (calcul analytique, pas de simulation tick par tick).
- Repas de Gaston actifs hors-ligne, Patrouilles, Jardin.
- **Notifications locales** (Capacitor) : jardin prêt, patrouille revenue, coffre hors-ligne plein, boss hebdo. Opt-in, réglables.
- Horloge : clamp des écarts suspects (anti-triche de base), sauvegarde horodatée.

---

## 16. Monétisation (F2P)

| Levier | Détail |
|---|---|
| **Gemmes** (packs 1/5/20/50/100, `assets/sprites/packs`) | Bénédictions (×2 or 1 h…), clés de Profondeurs, accélération de minuteurs du Fief, slots Héritage, cosmétiques |
| **Starter pack** | Une fois, très rentable (gemmes + compagnon cosmétique + Arcane garantie) |
| **Pass mensuel « Bénédiction de Lysandra »** | Gemmes quotidiennes, +4 h hors-ligne, Ferveur auto, sans pub |
| **Sans pub** | Retire les pubs interstitielles (s'il y en a) — on recommande **0 interstitielle**, seulement des pubs récompensées |
| **Pubs récompensées** (opt-in) | ×2 gains hors-ligne, Messager ×2, coffre gratuit, +10 s de Volonté sur boss |
| **Pass de saison** (Incursions) | Piste gratuite + piste premium (cosmétiques, ressources) |

Principe : **le temps s'achète, la puissance non** (aucun stat exclusif payant, aucune Arcane en vente directe).

**Packs d'étape** (en jeu) : proposés une fois au palier atteint, puis visibles au Marché. Sets liés au compte à niveau fixe
(Aube 0,99 €, Zénith 2,99 €, Crépuscule 4,99 €, Nuit étoilée 9,99 €) : un booster de départ à chaque vie, que le butin et
la Forge dépassent ensuite. Détails et mesures : `docs/EQUILIBRAGE.md`. Objets en gemmes : Parchemin des Éclats, Engrais,
Retour express, Coffre légendaire. Mode test : ouvrir le jeu avec `?achats=test` (achats simulés).

---

## 17. Économie & formules
Réglages centralisés dans `src/game/tuning.ts`, validés par simulation (`tools/balance.ts`).
Méthode, problèmes corrigés et résultats détaillés : **[docs/EQUILIBRAGE.md](EQUILIBRAGE.md)**.

```
PV monstre(e)   = 10 × 1.34^(e−1) (e ≤ 140), puis × 1.30 par étage
PV boss         = 8 × PV(e) ; Volonté = 30 s
Or / monstre    = 10 % des PV ; boss = ×1,5
Compagnon k     = recrutement 40 × 8^k ; DPS de base 3 × 3.5^k ; niveau ×1,075 ; paliers ×2,5 puis ×3
Frappe niv      = coût 5 × 1.07^niv
Éclats(e)       = 0.12 × (e/10)^2.5   (e ≥ 30)
Légende         = +3 % dégâts par Éclat cumulé
Seuil (180)     = part des dégâts qui passe = (Légende / 4000)^1.5
```
Rythme simulé (joueur engagé, 48 min/j) : étage 100 à J3, Seuil 180 à J12, ~290 à J30.

## 18. Technique

- **Stack proposée** : Vite + TypeScript + **Svelte** (léger, réactif, idéal pour une UI DOM riche en texte). Rendu des sprites en DOM/CSS (`image-rendering: pixelated`) ; canvas uniquement pour particules/chiffres si besoin.
- **Grands nombres** : `break_eternity.js` (au-delà de 1e308 pour l'infini).
- **Boucle** : logique à tick fixe (10/s) découplée du rendu ; **hors-ligne calculé analytiquement**.
- **Données** : tout le contenu en tables (monstres, étages, objets, Arcanes, dialogues, événements) → équilibrage sans toucher au code.
- **Sauvegarde** : JSON versionné + migrations, compressé, Capacitor Preferences + sauvegarde auto ; plus tard **Google Play Games Saved Games** (cloud).
- **Capacitor** : Haptics, Local Notifications, App (pause/reprise = calcul hors-ligne), Preferences, Status Bar, Splash Screen, AdMob (pubs récompensées), achats in-app (Play Billing via plugin).
- « Sur navigateur mais pas jouable sur navigateur » : le web sert au dev uniquement, pas d'hébergement public.
- **Play Store** : un compte développeur *personnel* récent doit faire un **test fermé de 12 testeurs pendant 14 jours** avant la prod → à prévoir dans le planning. Déclarer les taux de loot, classification IARC, politique de confidentialité (pubs).

---

## 19. Assets

Le dossier `assets/` est un **pack** : on pioche ce qui sert, on ne cherche pas à tout utiliser.

**Utilisations prévues**
- `mobs/`, `bosses/` → monstres d'étage par Acte, Cicatrices.
- `cards/` → Arcanes.
- `symphonie/` → Partitions.
- `equipements/`, `potions/`, `nourriture/`, `ressources/`, `objets/` → loot, Alaric, Gaston, Fief.
- `garden/` → Jardin (3 stades + 4 saisons).
- `portraits/` → PNJ & compagnons du lore ; `classesicon/` → classes ; `frames/` → cadres de profil.
- `icons/` → stats, nœuds des Profondeurs, menus ; `background/` → fonds d'Actes I–IV, Constellations, Profondeurs.
- `packs/` → boutique.

**À demander (par priorité)**
1. Fonds verticaux : Brèche Instable (V–VI), Noyau du Silence (VII–IX), Le Vide (X), Statique (Sagas).
2. Portraits compagnons (~20) dans le style existant.
3. Boss narratifs : Chef-d'œuvre de Larry, Juge Dissonant, Gardien du Seuil, Gardien Harmonique, Larry (forme de combat), **Écho Oublié**, Phénix Cendré.
4. Classe Harmoniste (icône + portrait), Messager de Lysandra (petit sprite volant).
5. Illustration du Fief (bâtiments à 3 niveaux d'évolution).
6. UI : boutons, panneaux, barres, cadres de rareté (cohérents pixel-art).

---

## 20. Roadmap

| Phase | Contenu | Objectif |
|---|---|---|
| **0 — Prototype** | Combat tap, Compagnons, étages 1–50, Chronique, sauvegarde, hors-ligne | Valider le *feel* (est-ce qu'on a envie de taper ?) |
| **1 — Vertical slice** | Actes I–III, Ascension + Constellations + Arcanes, Forge, Partitions, musique procédurale | Valider la boucle de prestige |
| **2 — Alpha (test fermé Play)** | Fief complet, Primes, Jardin, Actes IV–VI, Seuils, Profondeurs | 12 testeurs × 14 j, télémétrie de rythme |
| **3 — Lancement 1.0** | Actes VII–X, Résonance, fin, monétisation, cloud save | Sortie Play Store |
| **4 — Live** | Éternité, Cicatrices, Incursions (saisons), événements | Rétention long terme |

---

## 21. Décisions validées (14/11/2026)
- **Stack** : Svelte 5 + TypeScript + Vite, nombres natifs (`number`), Capacitor 8.
- **Classes** : changement possible à chaque Ascension.
- **Monétisation** : gratuit + pubs récompensées (double récompense, gemmes x fois/jour) + micro-transactions « pay-to-fast » et packs de déblocage contextuels (ex. pack Jardin à son déblocage). **Aucune pub forcée.**
- **Hors-ligne** : or + montée d'étages via la Constellation *Somnambule*.
- **En ligne** : Firebase (sauvegarde cloud, auth) — jeu jouable hors connexion d'abord.
- **Profondeurs** : reporté (post-1.0).
- **Ton** : Larry sarcastique en fil rouge, dialogues courts.
- **Lore** : on *monte* la Brèche (Ascension) ; les Profondeurs sont la descente.
- **Play Store** : compte personnel (test fermé 12 testeurs × 14 j avant prod).
- **Rythme** : Résonance ≈ 1 mois, fin de l'histoire ≈ 2–3 mois.
- **Site** : ascencia.manaorbit.app (Hostinger, déployé depuis la branche `hostinger`).

## 22. À discuter
- **Jardin** (demande du 14/11) : un vrai système de plantations à terme (semis, croissance en temps réel, saisons, croisements, récoltes utilisées par Alaric/Gaston, Graine-Cœur d'Yggdrasil). À concevoir ensemble avant développement — sprites dispo : `garden/plants` (12 plantes × 3 stades), `garden/seasons`.

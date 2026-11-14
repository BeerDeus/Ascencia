# Équilibrage — méthode et résultats (v1, 14/11/2026)

## Outil
`tools/balance.ts` fait jouer un bot avec **le vrai moteur du jeu**, journée par journée :
sessions actives (frappes, parades, Partitions, achats optimisés, équipement, Forge, Primes, repas),
absences hors-ligne entre les sessions, Ascension quand le record ne bouge plus depuis 4 min,
dépense des Éclats (Constellations + Arcanes).

```bash
npx vite-node tools/balance.ts 30 engage guerrier      # jours, profil, classe
TRACE=1 npx vite-node tools/balance.ts 2 engage         # détail étage par étage
TUNE='{"eclatsK":0.15}' npx vite-node tools/balance.ts  # tester une variante sans toucher au code
```
Profils : `casual` 2 × 10 min/j · `engage` 4 × 12 min/j · `hardcore` 6 × 20 min/j.
Tous les réglages sont dans `src/game/tuning.ts`.

## Objectifs (GDD)
| Jalon | Cible (joueur engagé) |
|---|---|
| 1re Ascension (étage 50, scénarisée) | 1re session |
| Étage 100 (fin Acte IV) | J2–J3 |
| Seuil Harmonique (180) | ~J10–J14 |
| Étage ~300 (Noyau → Résonance) | ~1 mois |

## Problèmes trouvés et corrections
1. **Aucun mur dans une vie** : chaque compagnon coûtait ×8 et frappait ×6,2 → la puissance achetable suivait la croissance des PV ;
   le bot atteignait l'étage 300 en 24 min. → compagnons **×3,5** : le retard sur les PV s'accumule (~×1,09/étage),
   ce sont les bonus permanents qui font avancer d'une vie à l'autre.
2. **Prestige qui s'emballe** : Éclats ∝ 1,03^étage → gains explosifs. → Éclats **polynomiaux** `0,12 × (étage/10)^2,5`
   et Légende à **+3 %** par Éclat (au lieu de 5 %).
3. **Équipement trop fort tôt** (×4–5 à l'étage 50) → affixes divisés par 2, croissance par niveau d'objet ralentie (÷12).
4. **Crescendo actif ~70 % du temps** → Ferveur +2/frappe (Guerrier +3), Crescendo 8 s : ~40 % du temps.
5. **Après l'étage 140**, PV ×1,22 → accélération artificielle → ×1,30.
6. **Seuil Harmonique** : bouclier ×0,001 contourné en force brute. Remplacé par la **Certitude du Gardien** :
   la part de dégâts qui passe vaut `(Légende / 4000)^1,5` (jamais invincible, justifié dans la Chronique).
7. **Classes déséquilibrées** (Archer +30 % sur le Guerrier à J7) → Guerrier Frappe ×2 et Rage ×40 ;
   Archer 1 tir auto/s (+1 / 150 niveaux) et critiques ×1,3.

## Résultats (réglages actuels)
Record d'étage selon le jour :

| Jour | Guerrier engagé | Archer engagé | Mage engagé | Guerrier occasionnel | Guerrier hardcore* |
|---|---|---|---|---|---|
| 1 | 74 | 75 | 80 | 50 | 98 |
| 3 | 100 | 106 | 112 | 75 | 157 |
| 7 | 147 | 158 | 170 | 85 | 227 |
| 14 | 205 | 234 | 244 | 110 | 271 |
| 20 | 250 | 258 | 269 | 127 | 299 |
| 30 | 286 | — | 284 | 140 | 314 |

\* hardcore mesuré avant le renfort du Guerrier.

Première arrivée (Guerrier engagé) : étage 50 → J1 (12 min de jeu) · 100 → J3 · 180 → J12 · 250 → J20.
La courbe ralentit doucement vers 280–300 : c'est le palier prévu pour la Résonance (couche 2).

## Couche 2 : Ancres et Résonance (ajout du 15/11)
- Ancres visibles après l'étage 250 : Graine-Cœur (400 métal + 48 h réelles), 3 chasses (boss de puissance ≈ étages 258/266/274),
  Compas Stellaire (boss des étages 255/265/275). La Porte du Noyau (300) est scellée jusqu'à la 1re Résonance.
- Fragments d'Écho = `6 × √(Légende / 1000)` ; Harmoniques : tous les dégâts **×3 par niveau**, coût ×1,25 par niveau.
- Le bot résonne quand le gain atteint au moins le total de Fragments déjà obtenus (doublement).

Simulation 90 jours (Guerrier engagé) :

| | Jour |
|---|---|
| Ancres terminées | ~J35 |
| 1re Résonance (record 282) | J37 |
| Étage 300 franchi | J43 |
| 2e Résonance (record 328) | J49 |
| Étage 350 | J61 |
| 3e Résonance (record 366) | J68 |
| Record au J90 | 394 → Larry (400) vers J90–95 |

Écarté : Fragments `3 × √` et Harmoniques ×2 (coût ×1,6) — après la remise à zéro, il fallait plus de 20 jours pour retrouver son record.

## Bot « vrai joueur » et métiers (ajout du 15/11)
Le bot joue désormais comme un humain : **5–9 frappes/s** (10–15 contre les boss, pauses dans les menus ; occasionnel 5–7,
très actif 6–10), Jardin en damier qui vise les croisements jusqu'à la **Graine-Cœur réelle** (plus d'hypothèse),
cultures « garde-manger », Alchimie (préparer/boire), Cuisine, Expéditions avant chaque absence, Forge (panoplies, commandes).

Avec les métiers bien exploités, la progression allait ~25 % plus vite (Larry au J61). Corrections :
PV après 140 : ×1,305 (au lieu de 1,30) ; Harmoniques ×2,7 (au lieu de ×3) ; XP de Chasseur réduite (1/ressource, 4/boss).

| Guerrier engagé (avec métiers) | Jour |
|---|---|
| Rang III au Jardin | J5–J8 |
| Ancres terminées / Graine-Cœur | J26–J31 |
| 1re Résonance | J31 |
| Étage 350 | J54 |
| Larry (400) | J89 |

Fin de partie au J90 : Chasseur ~70, Jardinier ~50, Alchimiste ~20, Forgeron ~30, Cuisinier ~15 ; 2–3 panoplies complètes.

## Packs d'étape (pay to fast) — ajout du 15/11
Sets liés au compte, **niveau d'objet fixe** : forts en début de vie, puis dépassés par le butin et la Forge
(qui fabrique au niveau de l'étage actuel) ; ils reviennent à chaque vie pour réaccélérer le départ.

| Pack | Prix | Apparaît | Contenu |
|---|---|---|---|
| Aube | 0,99 € | étage 10 | 2 légendaires niv. 35 + 50 gemmes |
| Zénith | 2,99 € | 1re Ascension | 3 légendaires niv. 90 (record 50) + 150 gemmes |
| Crépuscule | 4,99 € | étage 100 | 3 légendaires niv. 160 (record 100) + 300 gemmes |
| Nuit étoilée | 9,99 € | étage 180 | 4 mythiques niv. 250 (record 180) + 600 gemmes |
| Résonance | 14,99 € | 1re Résonance | 1 200 gemmes + 10 Fragments |

Effet mesuré (Guerrier engagé, 2 tirages) :
- Pack de l'Aube seul : **+8 à +9 étages le jour 1** (80/79 contre 71), écart nul vers J10–J14.
- Tous les packs : +18 étages le jour 1, ~+35 au J10, **aucun écart au J30** (302 / 302).

### Tests de vitesse par budget (16/11, 60 jours, Guerrier engagé, médiane de 3 tirages)
Les bots réclament succès / calendrier / pubs à gemmes et entretiennent les bénédictions Guerre + Fortune.
Résonance quand le record stagne (< 5 étages en 2 jours actifs).

| Profil | Dépense | J1 | J7 | J14 | J30 | J60 | 300 | 350 | R1 |
|---|---|---|---|---|---|---|---|---|---|
| Gratuit | 0 € | 87 | 173 | 241 | 292 | 359 | j31 | j47 | j27 |
| Aube seul | 0,99 € | 93 | 172 | 240 | 299 | 375 | j31 | j45 | j27 |
| 20 € optimisé (4 packs d'étape) | 18,96 € | 107 | 246 | 286 | 302 | 391 | j17 | j40 | j23 |
| 20 € en gemmes (bénédictions, parchemins) | 19,98 € | 96 | 198 | 223 | 273 | 352 | j41 | j59 | j35 |
| Tout acheter | 102,89 € | 111 | 249 | 284 | 358 | 411 | j18 | j27 | j20 |

Lecture :
- **0,99 €** : petit coup de pouce les premières heures, puis bruit statistique. Bien pour un premier achat.
- **20 € en packs d'étape** : la meilleure dépense ; ~2 semaines d'avance sur l'étage 300, l'écart retombe à ~+30 étages au J60.
- **20 € en gemmes** : avance au J7 (+25), puis plus rien une fois les gemmes brûlées en bénédictions (temporaires) ;
  dans la marge de bruit ensuite. Les gemmes valent surtout pour le confort (sauter la Graine-Cœur, parchemins).
- **Baleine** : ~20 jours d'avance sur 350, mais le gratuit atteint tout le contenu (fin d'histoire comprise).
- Correctifs du bot trouvés pendant ces tests : il gardait les pièces liées équipées à vie (panoplie), et résonnait dès les Ancres
  finies (trop tôt, peu de Fragments) — ce qui faisait passer les payeurs derrière le gratuit.
- Simulateur ~2× plus rapide (cache de `stats()` activé par le bot seulement) : 15 sims de 60 jours ≈ 10 min sur 4 cœurs.

## Points à surveiller
- La 1re Ascension arrive vite (~12–25 min) : bon pour l'accroche, à confirmer en test réel.
- Le joueur occasionnel progresse ~2× moins vite ; la Constellation *Somnambule* (montée hors-ligne) est son meilleur levier.
- Le bot lance les Partitions parfaitement : le Mage est un peu surestimé.
- Les potions sont bues en continu par le bot (≈ 500 en 60 jours) : c'est un plafond haut ; un vrai joueur en boira moins.
- À refaire quand la Résonance, les gemmes et le Jardin seront en place.

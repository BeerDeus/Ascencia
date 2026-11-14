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

## Points à surveiller
- La 1re Ascension arrive vite (~12–25 min) : bon pour l'accroche, à confirmer en test réel.
- Le joueur occasionnel progresse ~2× moins vite ; la Constellation *Somnambule* (montée hors-ligne) est son meilleur levier.
- Le bot lance les Partitions parfaitement : le Mage est un peu surestimé.
- À refaire quand la Résonance, les gemmes et le Jardin seront en place.

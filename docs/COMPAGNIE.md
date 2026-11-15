# La Compagnie (escouade de 3)

Différence voulue avec Tap Titans & co : on ne monte pas une liste infinie d'alliés, on **compose une escouade**.

## Règles
- **Roster** : les 30 compagnons rejoignent la Compagnie à des étages clés de l'histoire (`COMP_UNLOCK`), puis se recrutent et se montent avec l'or (à chaque vie). On peut monter un compagnon sur le banc pour préparer un remplaçant.
- **Escouade** : 3 places, toutes combattent.
  - Meneur ×1,6 · Bras droit ×1,3 · Soutien ×1,1 (dégâts) — réglages `slotLead/slotRight/slotSupport`.
- **Renommée** : chaque compagnon recruté (banc compris) donne +4 % aux dégâts de l'escouade (`renownPer`) : toute la Compagnie compte, seuls 3 combattent.
  - **Bonus de place** propre à chaque compagnon (3 par compagnon, un par place) : Frappe, Dégâts des compagnons, Or, Critique, Dégâts critiques, Volonté, Partitions. Valeur = base × (1 + paliers de niveau atteints). Permet des escouades « tout Frappe », « tout compagnons », « Or »…
  - Composition libre et gratuite, sauf pendant un combat de boss. Bouton « Composer au mieux » (teste toutes les compositions des 6 plus forts).
- **Niveau d'escouade** = somme des 3 niveaux. Paliers 50 → 5 000 : dégâts ×1,15, bonus du Meneur +25 %, Frappe +20 %, bonus du Soutien +25 %, Or +25 %…
- **Relations** : amis (♥) ou rivaux (⚔). Cohésion = +1 par paire d'amis, −1 par paire de rivaux ; les paliers valent ×(1 + 25 % × cohésion). Les rivaux donnent en échange l'**émulation** (Frappe +15 % par paire).
- **Synergies d'histoire** (duos, trios : Aubier, Chœur du Silence, La Traque, Tir croisé…) et **combinaisons de rôles** (équilibrée, 3 Mêlée, 3 Distance, 3 Magie).
- **Affinité** (permanente) : +1 par boss vaincu dans l'escouade (+2 en Meneur) ; +2,5 % de dégâts par niveau (10 niveaux) ; souvenirs aux niveaux 2, 5 et 10.
- Talents (100/200/300/400) inchangés.

## Équilibrage (Guerrier engagé, 4 tirages, bot reproductible)
| | J1 | J3 | J7 | J14 | J30 |
|---|---|---|---|---|---|
| Avant (tous les alliés combattent) | 94 | 125 | 189 | 252 | 303 |
| Escouade (×1,6/×1,3/×1,1, Renommée 4 %) | 99 | 138 | 197 | 265 | 307 |

Début ~+5 %, puis même rythme. Pièges trouvés en route : il y a 30 compagnons (pas 24) ; sans eux la fin de partie s'effondrait ;
le Jardin tirait au hasard sans graine (simulations non reproductibles) — corrigé.

// AUTO-GÉNÉRÉ depuis _legacy (db + locales). Ne pas éditer à la main.
// EXCEPTIONS corrigées manuellement (si régénération depuis _legacy, ré-appliquer) :
//  - 2026-07-15  BOSSES_GEN.boss_0 : vie 50→220, force 8→26, agilite 10→14, defense 4→8.
//  - 2026-07-15 (revue d'équilibrage v2, courbe de difficulté — voir config.js ZONES) :
//     rat_geant 25/6→45/10 (xp50→75), reine_des_rats 40/8→70/13 (xp100→140),
//     chef_bandit 110/18→135/22, golem_pierre 300/35→620/60 (xp305→900, metal75→160),
//     djinn 300/30→380/40, archimage_dement 650/50→820/85,
//     juge_dissonant 2500/120→6000/260 (def70→90, boss final), BOSSES_GEN.boss_1 180/28→300/40 (def18→20).
//     Bois ajouté : squelette_guerrier (+6), momie_gardienne (+15).
export const ENEMIES_GEN = {
 "rat_geant": {
  "id": "rat_geant",
  "name": "Rat Géant",
  "sprite": "assets/sprites/mobs/rat.png",
  "attrs": {
   "vie": 45,
   "force": 10,
   "agilite": 8,
   "defense": 2,
   "intelligence": 1,
   "chance": 5
  },
  "crit": 0,
  "xp": 75,
  "resourceLoot": {
   "tissu": 10
  },
  "loot": [],
  "desc": "Un rongeur difforme, gonflé par les miasmes des caves oubliées."
 },
 "reine_des_rats": {
  "id": "reine_des_rats",
  "name": "Reine des Rats",
  "sprite": "assets/sprites/mobs/reine_rat.png",
  "attrs": {
   "vie": 70,
   "force": 13,
   "agilite": 12,
   "defense": 3,
   "intelligence": 2,
   "chance": 10
  },
  "crit": 0,
  "xp": 140,
  "resourceLoot": {
   "tissu": 15,
   "fragments": 1
  },
  "loot": [],
  "desc": "Matriarche vorace régnant sur les nids grouillants des sous-sols."
 },
 "bandit": {
  "id": "bandit",
  "name": "Bandit",
  "sprite": "assets/sprites/mobs/bandit.png",
  "attrs": {
   "vie": 60,
   "force": 12,
   "agilite": 12,
   "defense": 5,
   "intelligence": 5,
   "chance": 10
  },
  "crit": 0,
  "xp": 140,
  "resourceLoot": {
   "metal": 25,
   "tissu": 15
  },
  "loot": [],
  "desc": "Un hors-la-loi opportuniste qui s'attaque aux voyageurs imprudents. N'est dangereux qu'en groupe."
 },
 "chef_bandit": {
  "id": "chef_bandit",
  "name": "Chef des Bandits",
  "sprite": "assets/sprites/mobs/chef_bandit.png",
  "attrs": {
   "vie": 135,
   "force": 22,
   "agilite": 15,
   "defense": 8,
   "intelligence": 8,
   "chance": 12
  },
  "crit": 0,
  "xp": 260,
  "resourceLoot": {
   "metal": 50,
   "tissu": 30,
   "fragments": 1
  },
  "loot": [],
  "desc": "Meneur impitoyable, il ne recule jamais devant plus faible que lui."
 },
 "golem_pierre": {
  "id": "golem_pierre",
  "name": "Golem de Pierre",
  "sprite": "assets/sprites/mobs/golem_pierre.png",
  "attrs": {
   "vie": 620,
   "force": 60,
   "agilite": 2,
   "defense": 40,
   "intelligence": 2,
   "chance": 1
  },
  "crit": 0,
  "xp": 900,
  "resourceLoot": {
   "metal": 160
  },
  "loot": []
 },
 "mini_golem_pierre": {
  "id": "mini_golem_pierre",
  "name": "Mini Golem de Pierre",
  "sprite": "assets/sprites/mobs/mini_golem_pierre.png",
  "attrs": {
   "vie": 160,
   "force": 17,
   "agilite": 5,
   "defense": 10,
   "intelligence": 1,
   "chance": 1
  },
  "crit": 0,
  "xp": 205,
  "resourceLoot": {
   "metal": 40
  },
  "loot": [],
  "desc": "Fragment animé d'une ancienne statue gardienne, lent mais increvable."
 },
 "gardien_de_pierre_eterne": {
  "id": "gardien_de_pierre_eterne",
  "name": "Gardien de Pierre Éternel",
  "sprite": "assets/sprites/mobs/gardien_pierre_eternel.png",
  "attrs": {
   "vie": 350,
   "force": 45,
   "agilite": 10,
   "defense": 30,
   "intelligence": 20,
   "chance": 10
  },
  "crit": 0,
  "xp": 600,
  "resourceLoot": {
   "metal": 250,
   "fragments": 3
  },
  "loot": [
   {
    "tid": "coeur_de_golem",
    "chance": 0.35,
    "min": 1,
    "max": 1
   }
  ]
 },
 "elementaire_eau": {
  "id": "elementaire_eau",
  "name": "Élémentaire d'Eau",
  "sprite": "assets/sprites/mobs/elementaire_eau.png",
  "attrs": {
   "vie": 150,
   "force": 25,
   "agilite": 20,
   "defense": 12,
   "intelligence": 15,
   "chance": 10
  },
  "crit": 0,
  "xp": 265,
  "resourceLoot": {
   "tissu": 50,
   "fragments": 2
  },
  "loot": []
 },
 "insecte_mineur": {
  "id": "insecte_mineur",
  "name": "Insecte Mineur",
  "sprite": "assets/sprites/mobs/insecte_mineur.png",
  "attrs": {
   "vie": 75,
   "force": 15,
   "agilite": 10,
   "defense": 12,
   "intelligence": 2,
   "chance": 5
  },
  "crit": 0,
  "xp": 142,
  "resourceLoot": {
   "metal": 40
  },
  "loot": [
   {
    "tid": "chitine_renforcee",
    "chance": 0.12,
    "min": 1,
    "max": 1
   }
  ],
  "desc": "Carapace dure comme la roche, il creuse sans relâche les galeries."
 },
 "araignee_de_cave": {
  "id": "araignee_de_cave",
  "name": "Araignée de Cave",
  "sprite": "assets/sprites/mobs/arraignee_cave.png",
  "attrs": {
   "vie": 30,
   "force": 7,
   "agilite": 10,
   "defense": 3,
   "intelligence": 1,
   "chance": 5
  },
  "crit": 0,
  "xp": 25,
  "resourceLoot": {
   "tissu": 15
  },
  "loot": [],
  "desc": "Tisse ses toiles dans l'obscurité, guettant le moindre pas imprudent."
 },
 "loup_affame": {
  "id": "loup_affame",
  "name": "Loup Affamé",
  "sprite": "assets/sprites/mobs/loup_affame.png",
  "attrs": {
   "vie": 35,
   "force": 8,
   "agilite": 15,
   "defense": 3,
   "intelligence": 2,
   "chance": 5
  },
  "crit": 0,
  "xp": 25,
  "resourceLoot": {
   "tissu": 12
  },
  "loot": [],
  "desc": "Chasse en solitaire depuis que sa meute a déserté la forêt."
 },
 "sanglier_furieux": {
  "id": "sanglier_furieux",
  "name": "Sanglier Furieux",
  "sprite": "assets/sprites/mobs/sanglier_furieux.png",
  "attrs": {
   "vie": 50,
   "force": 12,
   "agilite": 8,
   "defense": 5,
   "intelligence": 1,
   "chance": 3
  },
  "crit": 0,
  "xp": 30,
  "resourceLoot": {
   "bois": 15
  },
  "loot": [],
  "desc": "Charge tout ce qui bouge, sans distinction entre ami et ennemi."
 },
 "araignee_geante": {
  "id": "araignee_geante",
  "name": "Araignée Géante",
  "sprite": "assets/sprites/mobs/arraignee_geante.png",
  "attrs": {
   "vie": 80,
   "force": 15,
   "agilite": 18,
   "defense": 6,
   "intelligence": 3,
   "chance": 8
  },
  "crit": 0,
  "xp": 70,
  "resourceLoot": {
   "tissu": 40
  },
  "loot": [],
  "desc": "Cousine monstrueuse des araignées de cave, tisseuse de pièges mortels."
 },
 "griffon": {
  "id": "griffon",
  "name": "Griffon",
  "sprite": "assets/sprites/mobs/griffon.png",
  "attrs": {
   "vie": 200,
   "force": 30,
   "agilite": 25,
   "defense": 12,
   "intelligence": 8,
   "chance": 10
  },
  "crit": 0,
  "xp": 250,
  "resourceLoot": {
   "tissu": 80,
   "fragments": 3
  },
  "loot": [
   {
    "tid": "plume_de_griffon",
    "chance": 0.1,
    "min": 1,
    "max": 1
   }
  ]
 },
 "basilic": {
  "id": "basilic",
  "name": "Basilic",
  "sprite": "assets/sprites/mobs/basilic.png",
  "attrs": {
   "vie": 250,
   "force": 35,
   "agilite": 15,
   "defense": 20,
   "intelligence": 5,
   "chance": 12
  },
  "crit": 0,
  "xp": 350,
  "resourceLoot": {
   "metal": 120,
   "fragments": 5
  },
  "loot": [
   {
    "tid": "sang_de_basilic",
    "chance": 0.1,
    "min": 1,
    "max": 1
   }
  ]
 },
 "scorpion_des_sables": {
  "id": "scorpion_des_sables",
  "name": "Scorpion des Sables",
  "sprite": "assets/sprites/mobs/scorpion_sable.png",
  "attrs": {
   "vie": 90,
   "force": 18,
   "agilite": 14,
   "defense": 10,
   "intelligence": 2,
   "chance": 6
  },
  "crit": 0,
  "xp": 80,
  "resourceLoot": {
   "metal": 30
  },
  "loot": [
   {
    "tid": "chitine_renforcee",
    "chance": 0.15,
    "min": 1,
    "max": 1
   }
  ],
  "desc": "Son dard distille un venin qui trouble les sens et le rythme."
 },
 "ver_des_sables": {
  "id": "ver_des_sables",
  "name": "Ver des Sables Géant",
  "sprite": "assets/sprites/mobs/ver_sable.png",
  "attrs": {
   "vie": 400,
   "force": 50,
   "agilite": 10,
   "defense": 25,
   "intelligence": 3,
   "chance": 5
  },
  "crit": 0,
  "xp": 500,
  "resourceLoot": {
   "metal": 200,
   "fragments": 4
  },
  "loot": []
 },
 "gobelin_frondeur": {
  "id": "gobelin_frondeur",
  "name": "Gobelin Frondeur",
  "sprite": "assets/sprites/mobs/gobelin_frondeur.png",
  "attrs": {
   "vie": 20,
   "force": 5,
   "agilite": 12,
   "defense": 1,
   "intelligence": 3,
   "chance": 8
  },
  "crit": 0,
  "xp": 15,
  "resourceLoot": {
   "metal": 40
  },
  "loot": [
   {
    "tid": "chitine_renforcee",
    "chance": 1,
    "min": 1,
    "max": 1
   }
  ],
  "desc": "Lâche mais précis, il harcèle ses proies à distance avant de fuir."
 },
 "chef_gobelin": {
  "id": "chef_gobelin",
  "name": "Chef Gobelin Dissonant",
  "sprite": "assets/sprites/mobs/chef_gobelin.png",
  "attrs": {
   "vie": 80,
   "force": 12,
   "agilite": 18,
   "defense": 5,
   "intelligence": 5,
   "chance": 10
  },
  "crit": 0,
  "xp": 15,
  "resourceLoot": {
   "bois": 5
  },
  "loot": [],
  "desc": "Un chef de guerre corrompu par le silence, hurlant des ordres discordants."
 },
 "orc_berserker": {
  "id": "orc_berserker",
  "name": "Orc Berserker",
  "sprite": "assets/sprites/mobs/orc_berserker.png",
  "attrs": {
   "vie": 140,
   "force": 25,
   "agilite": 5,
   "defense": 10,
   "intelligence": 2,
   "chance": 4
  },
  "crit": 0,
  "xp": 90,
  "resourceLoot": {
   "metal": 35,
   "bois": 20
  },
  "loot": [
   {
    "tid": "totem_orc",
    "chance": 0.1,
    "min": 1,
    "max": 1
   }
  ]
 },
 "squelette_guerrier": {
  "id": "squelette_guerrier",
  "name": "Squelette Guerrier",
  "sprite": "assets/sprites/mobs/squelette_guerrier.png",
  "attrs": {
   "vie": 70,
   "force": 14,
   "agilite": 12,
   "defense": 7,
   "intelligence": 3,
   "chance": 1
  },
  "crit": 0,
  "xp": 45,
  "resourceLoot": {
   "metal": 15,
   "bois": 6
  },
  "loot": [],
  "desc": "Ossements ranimés par une volonté qui refuse le repos éternel."
 },
 "necromancien_apprenti": {
  "id": "necromancien_apprenti",
  "name": "Nécromancien Apprenti",
  "sprite": "assets/sprites/mobs/necromancien_apprenti.png",
  "attrs": {
   "vie": 70,
   "force": 8,
   "agilite": 10,
   "defense": 5,
   "intelligence": 18,
   "chance": 10
  },
  "crit": 0,
  "xp": 120,
  "resourceLoot": {
   "tissu": 50
  },
  "loot": []
 },
 "cultiste_zelote": {
  "id": "cultiste_zelote",
  "name": "Cultiste Zélote",
  "sprite": "assets/sprites/mobs/cultiste_zelote.png",
  "attrs": {
   "vie": 80,
   "force": 15,
   "agilite": 12,
   "defense": 8,
   "intelligence": 12,
   "chance": 8
  },
  "crit": 0,
  "xp": 150,
  "resourceLoot": {
   "tissu": 60,
   "metal": 20
  },
  "loot": []
 },
 "garde_automate": {
  "id": "garde_automate",
  "name": "Garde Automate",
  "sprite": "assets/sprites/mobs/garde_automate.png",
  "attrs": {
   "vie": 180,
   "force": 28,
   "agilite": 10,
   "defense": 18,
   "intelligence": 1,
   "chance": 1
  },
  "crit": 0,
  "xp": 200,
  "resourceLoot": {
   "metal": 150
  },
  "loot": []
 },
 "initie_de_l_ombre": {
  "id": "initie_de_l_ombre",
  "name": "Initié de l'Ombre",
  "sprite": "assets/sprites/mobs/initie_ombre.png",
  "attrs": {
   "vie": 150,
   "force": 22,
   "agilite": 35,
   "defense": 8,
   "intelligence": 15,
   "chance": 10
  },
  "crit": 0,
  "xp": 250,
  "resourceLoot": {
   "tissu": 60,
   "fragments": 1
  },
  "loot": []
 },
 "assassin_de_l_ombre": {
  "id": "assassin_de_l_ombre",
  "name": "Assassin de l'Ombre",
  "sprite": "assets/sprites/mobs/assassin_ombre.png",
  "attrs": {
   "vie": 280,
   "force": 38,
   "agilite": 50,
   "defense": 12,
   "intelligence": 20,
   "chance": 15
  },
  "crit": 15,
  "xp": 450,
  "resourceLoot": {
   "tissu": 100,
   "metal": 50,
   "fragments": 2
  },
  "loot": []
 },
 "maitre_de_l_ombre": {
  "id": "maitre_de_l_ombre",
  "name": "Maître de l'Ombre",
  "sprite": "assets/sprites/mobs/maitre_ombre.png",
  "attrs": {
   "vie": 450,
   "force": 55,
   "agilite": 70,
   "defense": 18,
   "intelligence": 35,
   "chance": 20
  },
  "crit": 25,
  "xp": 900,
  "resourceLoot": {
   "tissu": 200,
   "metal": 100,
   "fragments": 5
  },
  "loot": []
 },
 "spectre_gemissant": {
  "id": "spectre_gemissant",
  "name": "Spectre Gémissant",
  "sprite": "assets/sprites/mobs/spectre_gemissant.png",
  "attrs": {
   "vie": 75,
   "force": 12,
   "agilite": 22,
   "defense": 6,
   "intelligence": 14,
   "chance": 10
  },
  "crit": 0,
  "xp": 110,
  "resourceLoot": {
   "fragments": 1
  },
  "loot": [
   {
    "tid": "essence_spectrale",
    "chance": 0.04,
    "min": 1,
    "max": 1
   }
  ]
 },
 "elementaire_de_magma": {
  "id": "elementaire_de_magma",
  "name": "Élémentaire de Magma",
  "sprite": "assets/sprites/mobs/elementaire_magma.png",
  "attrs": {
   "vie": 220,
   "force": 38,
   "agilite": 12,
   "defense": 15,
   "intelligence": 5,
   "chance": 5
  },
  "crit": 0,
  "xp": 300,
  "resourceLoot": {
   "metal": 100,
   "fragments": 6
  },
  "loot": []
 },
 "harpie": {
  "id": "harpie",
  "name": "Harpie",
  "sprite": "assets/sprites/mobs/harpie.png",
  "attrs": {
   "vie": 85,
   "force": 14,
   "agilite": 28,
   "defense": 7,
   "intelligence": 6,
   "chance": 12
  },
  "crit": 0,
  "xp": 130,
  "resourceLoot": {
   "tissu": 30
  },
  "loot": [
   {
    "tid": "plume_de_griffon",
    "chance": 0.18,
    "min": 1,
    "max": 1
   }
  ]
 },
 "momie_gardienne": {
  "id": "momie_gardienne",
  "name": "Momie Gardienne",
  "sprite": "assets/sprites/mobs/momie.png",
  "attrs": {
   "vie": 180,
   "force": 25,
   "agilite": 8,
   "defense": 14,
   "intelligence": 4,
   "chance": 8
  },
  "crit": 0,
  "xp": 220,
  "resourceLoot": {
   "tissu": 120,
   "bois": 15
  },
  "loot": []
 },
 "djinn": {
  "id": "djinn",
  "name": "Djinn",
  "sprite": "assets/sprites/mobs/djinn.png",
  "attrs": {
   "vie": 380,
   "force": 40,
   "agilite": 30,
   "defense": 20,
   "intelligence": 30,
   "chance": 20
  },
  "crit": 0,
  "xp": 700,
  "resourceLoot": {
   "fragments": 25,
   "tissu": 200
  },
  "loot": []
 },
 "le_collecteur": {
  "id": "le_collecteur",
  "name": "Le Collecteur (Golem)",
  "sprite": "assets/sprites/mobs/collectionneur.png",
  "attrs": {
   "vie": 500,
   "force": 45,
   "agilite": 15,
   "defense": 30,
   "intelligence": 20,
   "chance": 5
  },
  "crit": 0,
  "xp": 1000,
  "resourceLoot": {
   "metal": 300,
   "fragments": 15
  },
  "loot": []
 },
 "chimere": {
  "id": "chimere",
  "name": "Chimère",
  "sprite": "assets/sprites/mobs/chimere.png",
  "attrs": {
   "vie": 600,
   "force": 55,
   "agilite": 25,
   "defense": 22,
   "intelligence": 10,
   "chance": 10
  },
  "crit": 0,
  "xp": 1200,
  "resourceLoot": {
   "tissu": 250,
   "bois": 250,
   "metal": 250
  },
  "loot": [
   {
    "tid": "oeil_de_chimere",
    "chance": 0.06,
    "min": 1,
    "max": 1
   }
  ]
 },
 "chimere_renforcee": {
  "id": "chimere_renforcee",
  "name": "Chimère Renforcée",
  "sprite": "assets/sprites/mobs/chimere.png",
  "attrs": {
   "vie": 6000,
   "force": 55,
   "agilite": 25,
   "defense": 22,
   "intelligence": 10,
   "chance": 10
  },
  "crit": 0,
  "xp": 0,
  "resourceLoot": {},
  "loot": []
 },
 "hydre_des_marais": {
  "id": "hydre_des_marais",
  "name": "Hydre des Marais",
  "sprite": "assets/sprites/mobs/hydre_marais.png",
  "attrs": {
   "vie": 750,
   "force": 60,
   "agilite": 20,
   "defense": 28,
   "intelligence": 8,
   "chance": 15
  },
  "crit": 0,
  "xp": 1500,
  "resourceLoot": {
   "fragments": 30,
   "tissu": 500
  },
  "loot": []
 },
 "otyugh": {
  "id": "otyugh",
  "name": "Otyugh",
  "sprite": "assets/sprites/mobs/otyugh.png",
  "attrs": {
   "vie": 180,
   "force": 25,
   "agilite": 8,
   "defense": 20,
   "intelligence": 5,
   "chance": 5
  },
  "crit": 0,
  "xp": 220,
  "resourceLoot": {
   "tissu": 80,
   "metal": 40
  },
  "loot": []
 },
 "minotaure": {
  "id": "minotaure",
  "name": "Minotaure",
  "sprite": "assets/sprites/mobs/minotaure.png",
  "attrs": {
   "vie": 300,
   "force": 45,
   "agilite": 15,
   "defense": 20,
   "intelligence": 8,
   "chance": 10
  },
  "crit": 0,
  "xp": 450,
  "resourceLoot": {
   "bois": 100,
   "metal": 50
  },
  "loot": []
 },
 "profond_guerrier": {
  "id": "profond_guerrier",
  "name": "Guerrier Profond",
  "sprite": "assets/sprites/mobs/profond_guerrier.png",
  "attrs": {
   "vie": 250,
   "force": 40,
   "agilite": 25,
   "defense": 22,
   "intelligence": 10,
   "chance": 15
  },
  "crit": 0,
  "xp": 380,
  "resourceLoot": {
   "metal": 120,
   "tissu": 60
  },
  "loot": [
   {
    "tid": "ecaille_de_profond",
    "chance": 0.03,
    "min": 1,
    "max": 1
   }
  ]
 },
 "profond_champion": {
  "id": "profond_champion",
  "name": "Champion Profond",
  "sprite": "assets/sprites/mobs/profond_champion.png",
  "attrs": {
   "vie": 450,
   "force": 55,
   "agilite": 30,
   "defense": 30,
   "intelligence": 15,
   "chance": 18
  },
  "crit": 0,
  "xp": 600,
  "resourceLoot": {
   "metal": 200,
   "fragments": 10
  },
  "loot": [
   {
    "tid": "ecaille_de_profond",
    "chance": 0.05,
    "min": 1,
    "max": 1
   }
  ]
 },
 "archange": {
  "id": "archange",
  "name": "Archange de Lumière",
  "sprite": "assets/sprites/mobs/archange.png",
  "attrs": {
   "vie": 800,
   "force": 70,
   "agilite": 60,
   "defense": 40,
   "intelligence": 50,
   "chance": 30
  },
  "crit": 0,
  "xp": 2500,
  "resourceLoot": {
   "fragments": 50,
   "tissu": 300
  },
  "loot": [
   {
    "tid": "larme_d_archange",
    "chance": 0.05,
    "min": 1,
    "max": 1
   }
  ]
 },
 "dragon_rouge_ancien": {
  "id": "dragon_rouge_ancien",
  "name": "Dragon Rouge Ancien",
  "sprite": "assets/sprites/mobs/dragon_ancien.png",
  "attrs": {
   "vie": 1500,
   "force": 120,
   "agilite": 40,
   "defense": 60,
   "intelligence": 45,
   "chance": 25
  },
  "crit": 0,
  "xp": 4000,
  "resourceLoot": {
   "metal": 800,
   "fragments": 75
  },
  "loot": [
   {
    "tid": "coeur_de_dragon_ancien",
    "chance": 0.07,
    "min": 1,
    "max": 1
   }
  ]
 },
 "archimage_dement": {
  "id": "archimage_dement",
  "name": "Archimage Dément",
  "sprite": "assets/sprites/mobs/archimage_dement.png",
  "attrs": {
   "vie": 820,
   "force": 85,
   "agilite": 55,
   "defense": 35,
   "intelligence": 85,
   "chance": 40
  },
  "crit": 0,
  "xp": 3200,
  "resourceLoot": {
   "tissu": 500,
   "fragments": 40
  },
  "loot": []
 },
 "roi_singe_esprit": {
  "id": "roi_singe_esprit",
  "name": "Esprit du Roi Singe",
  "sprite": "assets/sprites/mobs/roi_singe.png",
  "attrs": {
   "vie": 700,
   "force": 65,
   "agilite": 80,
   "defense": 40,
   "intelligence": 60,
   "chance": 50
  },
  "crit": 0,
  "xp": 2800,
  "resourceLoot": {
   "bois": 400,
   "tissu": 200
  },
  "loot": [
   {
    "tid": "essence_spectrale",
    "chance": 0.05,
    "min": 1,
    "max": 1
   }
  ]
 },
 "shoggoth": {
  "id": "shoggoth",
  "name": "Shoggoth",
  "sprite": "assets/sprites/mobs/shoggoth.png",
  "attrs": {
   "vie": 1200,
   "force": 90,
   "agilite": 20,
   "defense": 50,
   "intelligence": 10,
   "chance": 5
  },
  "crit": 0,
  "xp": 3500,
  "resourceLoot": {
   "fragments": 100
  },
  "loot": []
 },
 "golem_pierre_mythique": {
  "id": "golem_pierre_mythique",
  "name": "Gardien de Pierre Mythique",
  "sprite": "assets/sprites/mobs/gardien_pierre_eternel.png",
  "attrs": {
   "vie": 2000,
   "force": 100,
   "agilite": 15,
   "defense": 80,
   "intelligence": 20,
   "chance": 10
  },
  "crit": 0,
  "xp": 4500,
  "resourceLoot": {
   "metal": 1200
  },
  "loot": []
 },
 "roi_barbare": {
  "id": "roi_barbare",
  "name": "Hrothgar, le Roi Barbare",
  "sprite": "assets/sprites/mobs/roi_barbare.png",
  "attrs": {
   "vie": 900,
   "force": 85,
   "agilite": 40,
   "defense": 50,
   "intelligence": 25,
   "chance": 30
  },
  "crit": 0,
  "xp": 2000,
  "resourceLoot": {
   "metal": 300,
   "bois": 200
  },
  "loot": []
 },
 "archere_elfe": {
  "id": "archere_elfe",
  "name": "Lirael, l'Archère Elfe",
  "sprite": "assets/sprites/mobs/archere_elfe.png",
  "attrs": {
   "vie": 600,
   "force": 50,
   "agilite": 90,
   "defense": 35,
   "intelligence": 50,
   "chance": 40
  },
  "crit": 0,
  "xp": 2200,
  "resourceLoot": {
   "tissu": 300,
   "bois": 150
  },
  "loot": []
 },
 "chevalier_eternel": {
  "id": "chevalier_eternel",
  "name": "Sir Gideon, le Chevalier Éternel",
  "sprite": "assets/sprites/mobs/chevalier_eternel.png",
  "attrs": {
   "vie": 1100,
   "force": 75,
   "agilite": 50,
   "defense": 65,
   "intelligence": 40,
   "chance": 35
  },
  "crit": 0,
  "xp": 2500,
  "resourceLoot": {
   "metal": 500
  },
  "loot": []
 },
 "forgeron_demon": {
  "id": "forgeron_demon",
  "name": "Forgeron des Âmes",
  "sprite": "assets/sprites/mobs/forgeron_demon.png",
  "attrs": {
   "vie": 1300,
   "force": 110,
   "agilite": 35,
   "defense": 55,
   "intelligence": 40,
   "chance": 20
  },
  "crit": 0,
  "xp": 3800,
  "resourceLoot": {
   "metal": 1000,
   "fragments": 80
  },
  "loot": []
 },
 "demon_mineur": {
  "id": "demon_mineur",
  "name": "Démon Mineur",
  "sprite": "assets/sprites/mobs/demon_mineur.png",
  "attrs": {
   "vie": 400,
   "force": 60,
   "agilite": 40,
   "defense": 30,
   "intelligence": 20,
   "chance": 15
  },
  "crit": 0,
  "xp": 500,
  "resourceLoot": {
   "metal": 50
  },
  "loot": [
   {
    "tid": "fragment_d_ame_de_demon",
    "chance": 0.02,
    "min": 1,
    "max": 1
   }
  ]
 },
 "general_demon": {
  "id": "general_demon",
  "name": "Général Démon",
  "sprite": "assets/sprites/mobs/general_demon.png",
  "attrs": {
   "vie": 1400,
   "force": 100,
   "agilite": 50,
   "defense": 60,
   "intelligence": 50,
   "chance": 25
  },
  "crit": 0,
  "xp": 4200,
  "resourceLoot": {
   "metal": 600,
   "fragments": 100
  },
  "loot": [
   {
    "tid": "fragment_d_ame_de_demon",
    "chance": 0.06,
    "min": 1,
    "max": 1
   }
  ]
 },
 "horreur_dimensionnelle": {
  "id": "horreur_dimensionnelle",
  "name": "Horreur Dimensionnelle",
  "sprite": "assets/sprites/mobs/horreur_dimentionnelle.png",
  "attrs": {
   "vie": 1800,
   "force": 130,
   "agilite": 60,
   "defense": 70,
   "intelligence": 80,
   "chance": 10
  },
  "crit": 0,
  "xp": 6000,
  "resourceLoot": {
   "fragments": 200
  },
  "loot": [
   {
    "tid": "poussiere_de_vide",
    "chance": 0.08,
    "min": 1,
    "max": 1
   }
  ]
 },
 "griffon_corrompu": {
  "id": "griffon_corrompu",
  "name": "Griffon Corrompu",
  "sprite": "assets/sprites/mobs/griffon_corrompu.png",
  "attrs": {
   "vie": 1600,
   "force": 110,
   "agilite": 80,
   "defense": 60,
   "intelligence": 30,
   "chance": 5
  },
  "crit": 0,
  "xp": 5000,
  "resourceLoot": {
   "tissu": 500
  },
  "loot": []
 },
 "dragon_corrompu": {
  "id": "dragon_corrompu",
  "name": "Dragon Ancien Corrompu",
  "sprite": "assets/sprites/mobs/dragon_corrompu.png",
  "attrs": {
   "vie": 2500,
   "force": 150,
   "agilite": 50,
   "defense": 80,
   "intelligence": 20,
   "chance": 0
  },
  "crit": 0,
  "xp": 8000,
  "resourceLoot": {
   "metal": 1500,
   "fragments": 150
  },
  "loot": []
 },
 "dieu_fou": {
  "id": "dieu_fou",
  "name": "Malakor, le Dieu Fou",
  "sprite": "assets/sprites/mobs/dieu_fou.png",
  "attrs": {
   "vie": 5000,
   "force": 200,
   "agilite": 100,
   "defense": 100,
   "intelligence": 150,
   "chance": 50
  },
  "crit": 0,
  "xp": 20000,
  "resourceLoot": {
   "fragments": 500
  },
  "loot": []
 },
 "double_sombre": {
  "id": "double_sombre",
  "name": "Double Sombre",
  "sprite": "assets/sprites/mobs/double_sombre.png",
  "attrs": {
   "vie": 1500,
   "force": 100,
   "agilite": 120,
   "defense": 60,
   "intelligence": 90,
   "chance": 60
  },
  "crit": 0,
  "xp": 7500,
  "resourceLoot": {
   "tissu": 1000
  },
  "loot": []
 },
 "ouroboros": {
  "id": "ouroboros",
  "name": "Ouroboros, Gardien du Cycle",
  "sprite": "assets/sprites/mobs/ouroboros.png",
  "attrs": {
   "vie": 3000,
   "force": 140,
   "agilite": 90,
   "defense": 90,
   "intelligence": 110,
   "chance": 70
  },
  "crit": 0,
  "xp": 10000,
  "resourceLoot": {
   "fragments": 300
  },
  "loot": []
 },
 "talos_reforge": {
  "id": "talos_reforge",
  "name": "Talos reforgé",
  "sprite": "assets/sprites/mobs/talos_reforge.png",
  "attrs": {
   "vie": 2800,
   "force": 160,
   "agilite": 30,
   "defense": 120,
   "intelligence": 10,
   "chance": 10
  },
  "crit": 0,
  "xp": 9000,
  "resourceLoot": {
   "metal": 2500
  },
  "loot": []
 },
 "scarabee_goliath": {
  "id": "scarabee_goliath",
  "name": "Scarabée-Goliath",
  "sprite": "assets/sprites/mobs/garden_beetle.png",
  "attrs": {
   "vie": 50,
   "force": 10,
   "agilite": 5,
   "defense": 10,
   "intelligence": 1,
   "chance": 5
  },
  "crit": 0,
  "xp": 20,
  "resourceLoot": {},
  "loot": [
   {
    "tid": "chitine_renforcee",
    "chance": 1.0,
    "min": 1,
    "max": 1
   }
  ]
 },
 "ver_de_racine": {
  "id": "ver_de_racine",
  "name": "Ver de Racine Blindé",
  "sprite": "assets/sprites/mobs/garden_worm.png",
  "attrs": {
   "vie": 80,
   "force": 12,
   "agilite": 2,
   "defense": 15,
   "intelligence": 1,
   "chance": 2
  },
  "crit": 0,
  "xp": 25,
  "resourceLoot": {},
  "loot": [
   {
    "tid": "chitine_renforcee",
    "chance": 1.0,
    "min": 2,
    "max": 2
   }
  ]
 },
 "tutorial_dummy": {
  "id": "tutorial_dummy",
  "name": "Effigie Corrompue",
  "sprite": "assets/sprites/mobs/dummy.png",
  "attrs": {
   "vie": 20,
   "force": 2,
   "agilite": 0,
   "defense": 0,
   "intelligence": 0,
   "chance": 0
  },
  "crit": 0,
  "xp": 0,
  "resourceLoot": {},
  "loot": []
 },
 "loup_dissonant": {
  "id": "loup_dissonant",
  "name": "Loup Dissonant",
  "sprite": "assets/sprites/mobs/loup_dissonant.png",
  "attrs": {
   "vie": 35,
   "force": 10,
   "agilite": 14,
   "defense": 4,
   "intelligence": 2,
   "chance": 5
  },
  "crit": 0,
  "xp": 35,
  "resourceLoot": {
   "tissu": 15
  },
  "loot": [],
  "desc": "Un loup dont le hurlement déchire l'harmonie environnante."
 },
 "gardien_erode": {
  "id": "gardien_erode",
  "name": "Gardien Érodé",
  "sprite": "assets/sprites/mobs/gardien_erode.png",
  "attrs": {
   "vie": 300,
   "force": 33,
   "agilite": 15,
   "defense": 20,
   "intelligence": 15,
   "chance": 10
  },
  "crit": 0,
  "xp": 1000,
  "resourceLoot": {
   "metal": 200,
   "fragments": 10
  },
  "loot": []
 },
 "juge_dissonant": {
  "id": "juge_dissonant",
  "name": "Juge Dissonant",
  "sprite": "assets/sprites/mobs/maitre_ombre.png",
  "attrs": {
   "vie": 6000,
   "force": 260,
   "agilite": 80,
   "defense": 90,
   "intelligence": 90,
   "chance": 25
  },
  "crit": 0,
  "xp": 15000,
  "resourceLoot": {
   "fragments": 250
  },
  "loot": [
   {
    "tid": "eclats_instables",
    "chance": 1.0,
    "min": 150,
    "max": 150
   }
  ]
 },
 "esprit_ancien_tourmente": {
  "id": "esprit_ancien_tourmente",
  "name": "Esprit Ancien Tourmenté",
  "sprite": "assets/sprites/mobs/esprit_ancien_tourmente.png",
  "attrs": {
   "vie": 450,
   "force": 80,
   "agilite": 60,
   "defense": 40,
   "intelligence": 110,
   "chance": 30
  },
  "crit": 0,
  "xp": 3000,
  "resourceLoot": {
   "fragments": 50
  },
  "loot": [
   {
    "tid": "eclats_instables",
    "chance": 1.0,
    "min": 25,
    "max": 25
   }
  ]
 },
 "heraut_du_silence": {
  "id": "heraut_du_silence",
  "name": "Héraut du Silence",
  "sprite": "assets/sprites/mobs/heraut_du_silence.png",
  "attrs": {
   "vie": 1200,
   "force": 100,
   "agilite": 70,
   "defense": 60,
   "intelligence": 80,
   "chance": 20
  },
  "crit": 0,
  "xp": 8000,
  "resourceLoot": {
   "fragments": 100
  },
  "loot": [
   {
    "tid": "eclats_instables",
    "chance": 1.0,
    "min": 75,
    "max": 75
   }
  ]
 },
 "fragment_de_dissonance_mineur": {
  "id": "fragment_de_dissonance_mineur",
  "name": "Fragment de Dissonance Mineur",
  "sprite": "assets/sprites/mobs/fragment_de_dissonance.png",
  "attrs": {
   "vie": 600,
   "force": 90,
   "agilite": 70,
   "defense": 50,
   "intelligence": 120,
   "chance": 35
  },
  "crit": 0,
  "xp": 4000,
  "resourceLoot": {
   "fragments": 75
  },
  "loot": [
   {
    "tid": "eclats_instables",
    "chance": 1.0,
    "min": 30,
    "max": 30
   },
   {
    "tid": "essence_dissonante",
    "chance": 1.0,
    "min": 5,
    "max": 5
   }
  ]
 },
 "gardien_verrouille": {
  "id": "gardien_verrouille",
  "name": "Gardien Verrouillé",
  "sprite": "assets/sprites/mobs/gardien_verrouille.png",
  "attrs": {
   "vie": 1800,
   "force": 110,
   "agilite": 60,
   "defense": 90,
   "intelligence": 70,
   "chance": 15
  },
  "crit": 0,
  "xp": 9000,
  "resourceLoot": {
   "fragments": 120
  },
  "loot": [
   {
    "tid": "eclats_instables",
    "chance": 1.0,
    "min": 80,
    "max": 80
   },
   {
    "tid": "essence_dissonante",
    "chance": 1.0,
    "min": 15,
    "max": 15
   }
  ]
 },
 "arme_de_larry": {
  "id": "arme_de_larry",
  "name": "Arme de Larry",
  "sprite": "assets/sprites/mobs/arme_de_larry.png",
  "attrs": {
   "vie": 3500,
   "force": 150,
   "agilite": 100,
   "defense": 80,
   "intelligence": 110,
   "chance": 30
  },
  "crit": 0,
  "xp": 20000,
  "resourceLoot": {
   "fragments": 300
  },
  "loot": [
   {
    "tid": "eclats_instables",
    "chance": 1.0,
    "min": 200,
    "max": 200
   },
   {
    "tid": "essence_dissonante",
    "chance": 1.0,
    "min": 50,
    "max": 50
   }
  ]
 },
 "harmoniste_corrompu": {
  "id": "harmoniste_corrompu",
  "name": "Harmoniste Corrompu",
  "sprite": "assets/sprites/mobs/harmoniste_corrompu.png",
  "attrs": {
   "vie": 4000,
   "force": 160,
   "agilite": 110,
   "defense": 90,
   "intelligence": 130,
   "chance": 40
  },
  "crit": 0,
  "xp": 25000,
  "resourceLoot": {
   "fragments": 400
  },
  "loot": [
   {
    "tid": "eclats_instables",
    "chance": 1.0,
    "min": 250,
    "max": 250
   },
   {
    "tid": "essence_dissonante_pure",
    "chance": 1.0,
    "min": 1,
    "max": 1
   }
  ]
 },
 "larry_invincible": {
  "id": "larry_invincible",
  "name": "Projection de Larry",
  "sprite": "assets/sprites/mobs/arme_de_larry.png",
  "attrs": {
   "vie": 99999,
   "force": 40,
   "agilite": 0,
   "defense": -2000,
   "intelligence": 200,
   "chance": 0
  },
  "crit": 0,
  "xp": 0,
  "resourceLoot": {},
  "loot": []
 },
 "fragment_de_douleur": {
  "id": "fragment_de_douleur",
  "name": "Fragment de Douleur",
  "sprite": "assets/sprites/mobs/fragment_de_dissonance.png",
  "attrs": {
   "vie": 50,
   "force": 5,
   "agilite": 30,
   "defense": 2,
   "intelligence": 10,
   "chance": 5
  },
  "crit": 0,
  "xp": 0,
  "resourceLoot": {},
  "loot": []
 }
};
export const BOSSES_GEN = [
 {
  "id": "boss_0",
  "name": "Grand Gobelin Grognon",
  "sprite": "assets/sprites/mobs/gobelin.png",
  "attrs": {
   "vie": 220,
   "force": 26,
   "agilite": 14,
   "defense": 8,
   "intelligence": 2,
   "chance": 5
  },
  "crit": 0,
  "xp": 200,
  "resourceReward": 50,
  "itemDropChance": 0.3,
  "levelRequirement": 5,
  "loot": [
   {
    "tid": "vif",
    "chance": 0.15,
    "min": 1,
    "max": 1
   }
  ],
  "desc": "Chef incontesté des tribus gobelines locales, aussi bruyant que dangereux."
 },
 {
  "id": "boss_1",
  "name": "Ogre Colossal",
  "sprite": "assets/sprites/bosses/ogre.png",
  "attrs": {
   "vie": 300,
   "force": 40,
   "agilite": 8,
   "defense": 20,
   "intelligence": 5,
   "chance": 8
  },
  "crit": 0,
  "xp": 800,
  "resourceReward": 200,
  "itemDropChance": 0.5,
  "levelRequirement": 15,
  "loot": [
   {
    "tid": "soin",
    "chance": 0.2,
    "min": 1,
    "max": 1
   }
  ],
  "desc": "Une montagne de muscles qui écrase tout sur son passage sans réfléchir."
 },
 {
  "id": "boss_2",
  "name": "Dragonnet de Feu",
  "sprite": "assets/sprites/bosses/dragonnet.png",
  "attrs": {
   "vie": 320,
   "force": 40,
   "agilite": 25,
   "defense": 22,
   "intelligence": 20,
   "chance": 12
  },
  "crit": 15,
  "xp": 2500,
  "resourceReward": 750,
  "itemDropChance": 0.7,
  "levelRequirement": 25,
  "loot": [
   {
    "tid": "foudre",
    "chance": 0.25,
    "min": 1,
    "max": 1
   }
  ],
  "desc": "Jeune dragon impétueux, déjà capable de cracher des flammes ravageuses."
 },
 {
  "id": "boss_3",
  "name": "Seigneur Vampire",
  "sprite": "assets/sprites/bosses/vampire.png",
  "attrs": {
   "vie": 600,
   "force": 65,
   "agilite": 35,
   "defense": 40,
   "intelligence": 30,
   "chance": 15
  },
  "crit": 0,
  "xp": 5000,
  "resourceReward": 1500,
  "itemDropChance": 0.8,
  "levelRequirement": 35,
  "loot": [
   {
    "tid": "fureur",
    "chance": 0.3,
    "min": 1,
    "max": 1
   }
  ]
 },
 {
  "id": "boss_4",
  "name": "Lich Archimage",
  "sprite": "assets/sprites/bosses/liche.png",
  "attrs": {
   "vie": 1200,
   "force": 80,
   "agilite": 25,
   "defense": 60,
   "intelligence": 50,
   "chance": 20
  },
  "crit": 0,
  "xp": 10000,
  "resourceReward": 3000,
  "itemDropChance": 0.9,
  "levelRequirement": 45,
  "loot": [
   {
    "tid": "parfait",
    "chance": 0.35,
    "min": 1,
    "max": 1
   }
  ]
 }
];

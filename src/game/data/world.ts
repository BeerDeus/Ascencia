// Monde : Actes, pools de monstres, boss scénarisés.

export const MONSTER_NAMES: Record<string, string> = {
  rat: 'Rat', rat_gris: 'Rat gris', rat_brun: 'Rat brun', gros_rat: 'Gros rat', rat_sauvage: 'Rat sauvage',
  rat_agile: 'Rat agile', rat_infecte: 'Rat infecté', rat_mutant: 'Rat mutant', rat_ancien: 'Rat ancien',
  rat_garou: 'Rat-garou', reine_rat: 'Reine des rats', rat_voleur: 'Rat voleur',
  slime_vert: 'Slime vert', slime_bleu: 'Slime bleu', slime_poison: 'Slime venimeux',
  slime_vert_enerve: 'Slime vert enragé', slime_bleu_enerve: 'Slime bleu enragé',
  loup_affame: 'Loup affamé', loup_affame_variant: 'Loup efflanqué', loup_dissonant: 'Loup dissonant', loup_garou: 'Loup-garou',
  gobelin: 'Gobelin', gobelin_recrue: 'Gobelin recrue', gobelin_eclaireur: 'Gobelin éclaireur', gobelin_frondeur: 'Gobelin frondeur',
  gobelin_soldat: 'Gobelin soldat', gobelin_guerrier: 'Gobelin guerrier', gobelin_chasseur: 'Gobelin chasseur',
  gobelin_garde: 'Gobelin garde', gobelin_brigand: 'Gobelin brigand', gobelin_assassin: 'Gobelin assassin',
  gobelin_champion: 'Champion gobelin', chef_gobelin: 'Chef gobelin', gobelin_squelette: 'Gobelin squelette',
  gobelin_vulnerable: 'Gobelin doré',
  arraignee: 'Araignée', arraignee_cave: 'Araignée des cavernes', arraignee_cave_variant: 'Araignée pâle',
  arraignee_geante: 'Araignée géante', arraignee_geante_variant: 'Tisseuse géante',
  champignon_ambulant: 'Champignon ambulant', nuee_chauve_souris: 'Nuée de chauves-souris', sanglier_furieux: 'Sanglier furieux',
  insecte_piqueur: 'Insecte piqueur', insecte_mineur: 'Insecte mineur', ver_terre: 'Ver de terre', arbre_vivant: 'Arbre vivant',
  mini_golem: 'Mini-golem', mini_golem_pierre: 'Mini-golem de pierre', golem_pierre: 'Golem de pierre corrompu',
  gardien_erode: 'Gardien érodé', spectre_gemissant: 'Spectre gémissant',
  bandit: 'Bandit', chef_bandit: 'Chef bandit', serpent_marais: 'Serpent des marais', sangsue_geante: 'Sangsue géante',
  harpie: 'Harpie', moustique_geant: 'Moustique géant', pieuvre_violette: 'Pieuvre violette', pieuvre_terrestre: 'Pieuvre terrestre',
  troglodyte: 'Troglodyte', voleur_ombre: "Voleur d'ombre", hydre_marais: 'Hydre des marais', basilic: 'Basilic',
  minotaure_jeune: 'Jeune minotaure', minotaure: 'Minotaure', archimage_dement: 'Archimage dément', chimere: 'Le Chef-d’œuvre',
  squelette_guerrier: 'Squelette guerrier', fantome: 'Fantôme', spectre_sombre: 'Spectre sombre', initie_ombre: "Initié de l'ombre",
  cultiste_zelote: 'Cultiste zélote', assassin_ombre: "Assassin d'ombre", golem_sombre: 'Golem sombre', momie: 'Momie',
  necromancien_apprenti: 'Nécromancien apprenti', oeil_volant: 'Œil volant', maitre_ombre: "Maître de l'ombre",
  chevalier_sombre: 'Chevalier sombre', chevalier_neant: 'Le Juge Dissonant',
  elementaire_glace: 'Élémentaire de glace', esprit_glacial: 'Esprit glacial', elementaire_eau: "Élémentaire d'eau",
  profond_guerrier: 'Guerrier des profondeurs', profond_champion: 'Champion des profondeurs', reptilien: 'Reptilien',
  salamandre_bleue: 'Salamandre bleue', griffon: 'Griffon', lion_corrompu: 'Lion corrompu', orc_berserker: 'Orc berserker',
  automate: 'Automate', garde_automate: 'Garde automate', shoggoth: 'Hydre dissonante', gardien_pierre_eternel: 'Le Gardien du Seuil',
  demon_mineur: 'Démon mineur', demon_cornu: 'Démon cornu', forgeron_demon_mineur: 'Forgeron démoniaque',
  forgeron_demon: 'Grand forgeron démon', horreur_dimentionnelle: 'Horreur dimensionnelle',
  fragment_de_dissonance: 'Fragment de Dissonance', fragment_de_douleur: 'Fragment de douleur', larve_magique: 'Larve magique',
  moustique_ethere: 'Moustique éthéré', djinn: 'Djinn', elementaire_magma: 'Élémentaire de magma',
  harmoniste_corrompu: 'Harmoniste corrompu', talos_reforge: 'Talos reforgé', otyugh: 'Otyugh', ver_sable: 'Ver des sables',
  scorpion_sable: 'Scorpion des sables', general_demon: 'Général démon', double_sombre: 'Le Champion Dissonant',
  archange: 'Le Gardien Harmonique', dragon_corrompu: 'Dragon corrompu', griffon_corrompu: 'Griffon corrompu',
  chevalier_eternel: 'Chevalier éternel', esprit_ancien_tourmente: 'Esprit ancien tourmenté', ouroboros: 'Ouroboros',
  voyageur_sombre: 'Voyageur sombre', collectionneur: 'Le Collectionneur', dieu_fou: 'Le Dieu fou', dragon_ancien: 'Le Dragon Ancien',
  mimique_monstre: 'Mimique', mimique_coffre: 'Coffre mimique', arme_de_larry: 'Arme de Larry', heraut_du_silence: 'Héraut du Silence',
  roi_barbare: 'Roi barbare', roi_singe: 'Roi singe',
};

export interface Act {
  id: number;
  title: string;
  subtitle: string;
  from: number;
  to: number;
  bg: string;
  key: number;           // note fondamentale (Hz) pour la musique de l'Acte
  mobs: string[];
  bosses: string[];
}

export const ACTS: Act[] = [
  { id: 1, title: 'Acte I', subtitle: "L'Éveil", from: 1, to: 25, bg: 'acte1', key: 261.63,
    mobs: ['rat', 'rat_gris', 'rat_brun', 'slime_vert', 'slime_bleu', 'loup_affame', 'gobelin_recrue', 'gobelin_eclaireur',
      'arraignee', 'champignon_ambulant', 'nuee_chauve_souris', 'sanglier_furieux', 'insecte_piqueur', 'gros_rat', 'gobelin_frondeur'],
    bosses: ['gobelin_champion', 'loup_dissonant', 'reine_rat', 'arbre_vivant', 'slime_vert_enerve'] },
  { id: 2, title: 'Acte II', subtitle: 'Le Jouet', from: 26, to: 50, bg: 'acte2', key: 293.66,
    mobs: ['bandit', 'gobelin_brigand', 'serpent_marais', 'sangsue_geante', 'slime_poison', 'harpie', 'moustique_geant',
      'rat_infecte', 'arraignee_geante', 'pieuvre_violette', 'troglodyte', 'voleur_ombre', 'gobelin_assassin', 'rat_mutant'],
    bosses: ['chef_bandit', 'basilic', 'minotaure_jeune', 'loup_garou', 'pieuvre_terrestre'] },
  { id: 3, title: 'Acte III', subtitle: 'Renaissance', from: 51, to: 75, bg: 'acte3', key: 246.94,
    mobs: ['squelette_guerrier', 'fantome', 'spectre_sombre', 'initie_ombre', 'cultiste_zelote', 'assassin_ombre',
      'golem_sombre', 'momie', 'necromancien_apprenti', 'gobelin_squelette', 'oeil_volant', 'rat_garou'],
    bosses: ['maitre_ombre', 'chevalier_sombre', 'roi_barbare', 'esprit_ancien_tourmente'] },
  { id: 4, title: 'Acte IV', subtitle: 'La Grande Brèche', from: 76, to: 100, bg: 'acte4', key: 220,
    mobs: ['elementaire_glace', 'esprit_glacial', 'elementaire_eau', 'profond_guerrier', 'reptilien', 'salamandre_bleue',
      'griffon', 'lion_corrompu', 'orc_berserker', 'automate', 'arraignee_geante_variant'],
    bosses: ['profond_champion', 'minotaure', 'roi_singe', 'garde_automate'] },
  { id: 5, title: 'Acte V', subtitle: 'Les Seuils', from: 101, to: 180, bg: 'dungeon', key: 196,
    mobs: ['demon_mineur', 'demon_cornu', 'forgeron_demon_mineur', 'horreur_dimentionnelle', 'fragment_de_dissonance',
      'fragment_de_douleur', 'larve_magique', 'moustique_ethere', 'djinn', 'elementaire_magma', 'harmoniste_corrompu',
      'talos_reforge', 'otyugh', 'ver_sable', 'scorpion_sable'],
    bosses: ['general_demon', 'forgeron_demon', 'mimique_monstre'] },
  { id: 6, title: 'Acte VI', subtitle: 'Le Chef-d’œuvre', from: 181, to: 250, bg: 'dungeon', key: 233.08,
    mobs: ['dragon_corrompu', 'griffon_corrompu', 'chevalier_eternel', 'esprit_ancien_tourmente', 'voyageur_sombre',
      'horreur_dimentionnelle', 'arme_de_larry', 'fragment_de_dissonance'],
    bosses: ['ouroboros', 'collectionneur', 'dieu_fou'] },
  { id: 7, title: 'Acte VII', subtitle: 'Le Noyau du Silence', from: 251, to: Infinity, bg: 'dungeon', key: 207.65,
    mobs: ['heraut_du_silence', 'arme_de_larry', 'mimique_monstre', 'double_sombre', 'chevalier_neant', 'dieu_fou'],
    bosses: ['dieu_fou', 'collectionneur', 'heraut_du_silence'] },
];

export interface StoryBoss { floor: number; id: string; sprite: string; name: string; hpMult: number }

export const STORY_BOSSES: StoryBoss[] = [
  { floor: 10, id: 'chef_gobelin', sprite: 'mobs/chef_gobelin', name: 'Chef gobelin', hpMult: 1.5 },
  { floor: 20, id: 'golem_mine', sprite: 'mobs/golem_pierre', name: 'Gardien de la Mine', hpMult: 1.6 },
  { floor: 25, id: 'gardien_sanctuaire', sprite: 'mobs/gardien_erode', name: 'Protecteur du Sanctuaire', hpMult: 1.6 },
  { floor: 40, id: 'hydre', sprite: 'mobs/hydre_marais', name: 'Hydre des marais', hpMult: 1.6 },
  { floor: 50, id: 'chef_doeuvre', sprite: 'mobs/chimere', name: 'Le Chef-d’œuvre de Larry', hpMult: 2 },
  { floor: 75, id: 'juge', sprite: 'mobs/chevalier_neant', name: 'Le Juge Dissonant', hpMult: 2 },
  { floor: 90, id: 'hydre_dissonante', sprite: 'mobs/shoggoth', name: 'Hydre dissonante', hpMult: 1.8 },
  { floor: 100, id: 'gardien_seuil', sprite: 'mobs/gardien_pierre_eternel', name: 'Le Gardien du Seuil', hpMult: 2.2 },
  { floor: 170, id: 'champion', sprite: 'mobs/double_sombre', name: 'Le Champion Dissonant', hpMult: 2 },
  { floor: 180, id: 'seuil_harmonique', sprite: 'mobs/archange', name: 'Le Gardien Harmonique', hpMult: 2.5 },
  { floor: 250, id: 'dragon', sprite: 'mobs/dragon_ancien', name: 'Le Dragon Ancien', hpMult: 3 },
];

/** Poids de Légende requis pour percer le Seuil Harmonique. */
export const SEUIL_HARMONIQUE = { floor: 180, legende: 1500 };

export function actFor(floor: number): Act {
  return ACTS.find(a => floor >= a.from && floor <= a.to) ?? ACTS[ACTS.length - 1];
}

export function storyBossAt(floor: number): StoryBoss | undefined {
  return STORY_BOSSES.find(b => b.floor === floor);
}

export function monsterName(sprite: string): string {
  const id = sprite.split('/').pop()!;
  return MONSTER_NAMES[id] || id.replace(/_/g, ' ');
}

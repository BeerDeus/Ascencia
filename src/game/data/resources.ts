// Ressources du Coffre (récolte) et métiers.
export type JobId = 'chasseur' | 'jardinier' | 'expedition' | 'alchimiste' | 'cuisinier';

export const JOBS: Record<JobId, { name: string; icon: string; npc: string; desc: string }> = {
  chasseur: { name: 'Chasseur', icon: 'res/marque_chasse', npc: 'portraits/chasseuse', desc: 'Les monstres lâchent leurs ressources plus souvent.' },
  jardinier: { name: 'Jardinier', icon: 'res/plante_sauvage', npc: 'portraits/elian', desc: 'Plus de parcelles, de récoltes et de mutations.' },
  expedition: { name: 'Expéditionnaire', icon: 'icons/carte', npc: 'portraits/garde', desc: 'Expéditions plus fructueuses, plus de places.' },
  alchimiste: { name: 'Alchimiste', icon: 'icons/naturaliste', npc: 'portraits/alaric', desc: 'Nouvelles potions, potions plus longues.' },
  cuisinier: { name: 'Cuisinier', icon: 'icons/cuisine', npc: 'portraits/gaston', desc: 'Nouveaux plats, repas plus longs.' },
};
export const JOB_MAX = 100;

export interface ResDef { name: string; sprite: string; kind: 'monstre' | 'plante' | 'recolte' | 'rare' }
export const RESOURCES: Record<string, ResDef> = {
  // monstres
  queue_rat: { name: 'Queue de rat', sprite: 'res/queue_rat', kind: 'monstre' },
  croc_loup: { name: 'Croc de loup', sprite: 'res/croc_loup', kind: 'monstre' },
  peau_gobelin: { name: 'Peau de gobelin', sprite: 'res/peau_gobelin', kind: 'monstre' },
  gelee_slime: { name: 'Gelée de slime', sprite: 'res/gelee_slime', kind: 'monstre' },
  soie_arraignee: { name: 'Soie d’araignée', sprite: 'res/soie_arraignee', kind: 'monstre' },
  chitine: { name: 'Chitine', sprite: 'res/chitine', kind: 'monstre' },
  defense_sanglier: { name: 'Défense de sanglier', sprite: 'res/defense_sanglier', kind: 'monstre' },
  viande_crue: { name: 'Viande crue', sprite: 'food/viande_crue', kind: 'monstre' },
  plume_griffon: { name: 'Plume de griffon', sprite: 'res/plume_griffon', kind: 'monstre' },
  ecaille_profond: { name: 'Écaille des profondeurs', sprite: 'res/ecaille_profond', kind: 'monstre' },
  totem_orc: { name: 'Totem orc', sprite: 'res/totem_orc', kind: 'monstre' },
  basilic_blood: { name: 'Sang de basilic', sprite: 'res/basilic_blood', kind: 'monstre' },
  essence_spectrale: { name: 'Essence spectrale', sprite: 'res/essence_spectrale', kind: 'monstre' },
  essence_dissonante: { name: 'Essence dissonante', sprite: 'res/essence_dissonante', kind: 'monstre' },
  ame_demon: { name: 'Âme de démon', sprite: 'res/ame_demon', kind: 'monstre' },
  oeil_chimere: { name: 'Œil de chimère', sprite: 'res/oeil_chimere', kind: 'monstre' },
  poussiere_vide: { name: 'Poussière du vide', sprite: 'res/poussiere_vide', kind: 'monstre' },
  // rares (boss)
  coeur_golem: { name: 'Cœur de golem', sprite: 'res/coeur_golem', kind: 'rare' },
  larme_archange: { name: 'Larme d’archange', sprite: 'res/larme_archange', kind: 'rare' },
  coeur_dragon: { name: 'Cœur de dragon', sprite: 'res/coeur_dragon', kind: 'rare' },
  essence_dissonante_pure: { name: 'Essence dissonante pure', sprite: 'res/essence_dissonante_pure', kind: 'rare' },
  // expéditions
  bois: { name: 'Bois', sprite: 'res/bois', kind: 'recolte' },
  herbes: { name: 'Herbes', sprite: 'res/herbes', kind: 'recolte' },
  fougere: { name: 'Fougère', sprite: 'res/fougere', kind: 'recolte' },
  pierre: { name: 'Pierre', sprite: 'res/pierre', kind: 'recolte' },
  gemme_verte: { name: 'Gemme verte', sprite: 'res/gemme_verte', kind: 'recolte' },
  goutte_eau: { name: 'Goutte d’eau pure', sprite: 'res/goutte_eau', kind: 'recolte' },
  fleur_blanche: { name: 'Fleur blanche', sprite: 'res/fleur_blanche', kind: 'recolte' },
  ciboulette: { name: 'Ciboulette', sprite: 'res/ciboulette', kind: 'recolte' },
  eclats_instables: { name: 'Éclats instables', sprite: 'res/eclats_instables', kind: 'recolte' },
};

/** Ressource lâchée par une famille de monstres (mot-clé dans le nom du sprite). */
export const FAMILY_DROPS: [RegExp, string][] = [
  [/rat/, 'queue_rat'], [/loup/, 'croc_loup'], [/sanglier/, 'viande_crue'], [/gobelin|bandit|voleur|troglodyte/, 'peau_gobelin'],
  [/slime|larve|sangsue|pieuvre|otyugh|shoggoth/, 'gelee_slime'], [/arraignee|araign/, 'soie_arraignee'],
  [/insecte|moustique|scorpion|nuee|ver_|champignon/, 'chitine'], [/griffon|harpie|lion/, 'plume_griffon'],
  [/profond|reptilien|salamandre|serpent|hydre|elementaire_eau/, 'ecaille_profond'], [/orc|minotaure|barbare|singe/, 'totem_orc'],
  [/basilic/, 'basilic_blood'], [/spectre|fantome|esprit|momie|squelette|necromancien/, 'essence_spectrale'],
  [/demon|forgeron/, 'ame_demon'], [/chimere|oeil/, 'oeil_chimere'],
  [/fragment|horreur|heraut|dissonant|arme_de_larry|dieu_fou|ouroboros/, 'essence_dissonante'],
  [/golem|automate|talos|gardien/, 'pierre'], [/dragon/, 'essence_dissonante'],
];
export const DEFAULT_DROP = 'poussiere_vide';
export const STORY_RARES: Record<string, string> = {
  golem_mine: 'coeur_golem', seuil_harmonique: 'larme_archange', dragon: 'coeur_dragon', larry: 'essence_dissonante_pure', juge: 'essence_dissonante_pure',
};

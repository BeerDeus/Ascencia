// Jardin : plantes, saisons, croisements.
export type Season = 0 | 1 | 2 | 3;  // printemps, été, automne, hiver
export const SEASONS = [
  { name: 'Printemps', sprite: 'seasons/spring', color: '#86b25c' },
  { name: 'Été', sprite: 'seasons/summer', color: '#e6b64a' },
  { name: 'Automne', sprite: 'seasons/autumn', color: '#e7793a' },
  { name: 'Hiver', sprite: 'seasons/winter', color: '#6fa6d6' },
];

export interface PlantDef { id: string; name: string; tier: 1 | 2 | 3 | 4; season: Season; minutes: number; aura?: 'mutation' | 'pousse'; desc: string }
export const PLANTS: PlantDef[] = [
  { id: 'herbe_robuste', name: 'Herbe robuste', tier: 1, season: 0, minutes: 15, desc: 'Pousse partout, même entre les pavés d’Aubier.' },
  { id: 'fleur_rosee', name: 'Fleur rosée', tier: 1, season: 0, minutes: 20, desc: 'Elle boit la rosée du matin, et rien d’autre.' },
  { id: 'racine_terreuse', name: 'Racine terreuse', tier: 1, season: 2, minutes: 25, desc: 'Gaston en met dans toutes ses soupes.' },
  { id: 'champignon_terreux', name: 'Champignon terreux', tier: 1, season: 2, minutes: 30, desc: 'Comestible. Probablement.' },
  { id: 'graine_solaire', name: 'Graine solaire', tier: 1, season: 1, minutes: 30, desc: 'Tiède au toucher, même la nuit.' },
  { id: 'trefle_dore', name: 'Trèfle doré', tier: 2, season: 0, minutes: 60, aura: 'mutation', desc: 'Porte chance à ses voisines : les mutations autour de lui sont plus fréquentes.' },
  { id: 'rose_sanguine', name: 'Rose sanguine', tier: 2, season: 1, minutes: 75, desc: 'Ses épines piquent comme des remords.' },
  { id: 'lys_givre', name: 'Lys de givre', tier: 2, season: 3, minutes: 90, desc: 'Il ne fond jamais, même en plein été.' },
  { id: 'racine_eponge', name: 'Racine éponge', tier: 2, season: 2, minutes: 60, aura: 'pousse', desc: 'Retient l’eau et arrose ses voisines : elles poussent plus vite.' },
  { id: 'fleur_lave', name: 'Fleur de lave', tier: 2, season: 1, minutes: 90, desc: 'À ne pas cueillir à mains nues.' },
  { id: 'tournesol_radieux', name: 'Tournesol radieux', tier: 3, season: 1, minutes: 240, desc: 'Il suit le soleil… et parfois les gens.' },
  { id: 'cristal_givre', name: 'Cristal de givre', tier: 3, season: 3, minutes: 300, desc: 'Une plante ? Un minéral ? Alaric hésite encore.' },
  { id: 'orchidee_silencieuse', name: 'Orchidée silencieuse', tier: 3, season: 2, minutes: 360, desc: 'Autour d’elle, plus aucun son.' },
  { id: 'yggdrasil', name: 'Graine-Cœur d’Yggdrasil', tier: 4, season: 0, minutes: 720, desc: 'Le cœur du monde, en germe. Ancre de la Création.' },
];
export const PLANT_BY_ID = Object.fromEntries(PLANTS.map(p => [p.id, p]));

/** Croisements : deux plantes mûres voisines d'une parcelle vide → pousse mutante. */
export const MUTATIONS: { a: string; b: string; result: string; hint: string }[] = [
  { a: 'herbe_robuste', b: 'fleur_rosee', result: 'trefle_dore', hint: 'L’herbe la plus têtue et la fleur la plus douce…' },
  { a: 'fleur_rosee', b: 'champignon_terreux', result: 'rose_sanguine', hint: 'Une fleur qui a trop fréquenté les sous-bois…' },
  { a: 'fleur_rosee', b: 'racine_terreuse', result: 'lys_givre', hint: 'La rosée, gelée au pied d’une racine…' },
  { a: 'champignon_terreux', b: 'herbe_robuste', result: 'racine_eponge', hint: 'Le champignon boit, l’herbe s’enracine…' },
  { a: 'graine_solaire', b: 'racine_terreuse', result: 'fleur_lave', hint: 'Le soleil enfoui sous la terre…' },
  { a: 'graine_solaire', b: 'trefle_dore', result: 'tournesol_radieux', hint: 'Le soleil et la chance, côte à côte…' },
  { a: 'lys_givre', b: 'racine_eponge', result: 'cristal_givre', hint: 'Une éponge qui boirait du givre…' },
  { a: 'rose_sanguine', b: 'champignon_terreux', result: 'orchidee_silencieuse', hint: 'Une rose qui se tait, à l’ombre…' },
];
export const YGGDRASIL_HINT = 'Une parcelle vide entourée de quatre plantes rares, dont les trois différentes…';
export const MUTATION_CHANCE: Record<number, number> = { 2: 0.2, 3: 0.08, 4: 0.05 }; // par heure
export const SEED_PRICE_KILLS = 15; // prix d'une graine commune = 15 monstres de l'étage courant
export const PEST_CHANCE = 0.1, DISSONANCE_CHANCE = 0.01, INFECT_CHANCE = 0.2, WITHER_HOURS = 24;
export const plantSprite = (id: string, stage: number) => (id === 'yggdrasil' ? (stage < 3 ? 'garden/seed' : 'res/plante_sauvage') : `garden/${id}_${stage}`);

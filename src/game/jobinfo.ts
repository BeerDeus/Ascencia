// Fiches des métiers : comment les monter, ce qu'ils apportent (valeurs actuelles), paliers.
import type { GameState } from './types';
import type { JobId } from './data/resources';
import { level } from './jobs';
import { JOB_STAT } from './data/resources';
import { POTIONS, MEALS } from './data/crafting';
import { SETS } from './data/forge';
import { RARITIES } from './data/items';
import { ZONES } from './data/expeditions';
import { gridSize } from './garden';
import { slots } from './expeditions';
import { minRarity } from './forge';

export interface JobInfo {
  /** Rôle du métier, en une phrase. */
  goal: string;
  /** Sources d'expérience. */
  how: string[];
  /** Bonus actuels. */
  perks: (s: GameState) => { label: string; value: string }[];
  /** Paliers (niveau → effet). */
  milestones: { lv: number; text: string }[];
  /** Compteurs d'activité. */
  stats: (s: GameState) => { label: string; value: number }[];
}

const pct = (x: number) => `+${Math.round(x * 100)} %`;

/** Bonus permanent du métier (affiché en tête des bonus). */
export const permanentPerk = (s: GameState, j: JobId) => ({ label: `${JOB_STAT[j].label} (permanent)`, value: pct(level(s, j) * JOB_STAT[j].per) });

export const JOB_INFO: Record<JobId, JobInfo> = {
  chasseur: {
    goal: 'Récupérer sur les monstres les ressources dont le Jardin et les ateliers ont besoin. Chaque famille lâche la sienne : rats, loups, gobelins, slimes…',
    how: ['+1 XP par ressource ramassée sur un monstre', '+4 XP par ressource de boss', 'Passif : il suffit de combattre (même hors-ligne)'],
    perks: s => [
      { label: 'Chance de ressource (monstre)', value: `${(8 * (1 + level(s, 'chasseur') * 0.02)).toFixed(1)} %` },
      { label: 'Ressources par boss', value: `${2 + Math.floor(level(s, 'chasseur') / 25)}` },
    ],
    milestones: [25, 50, 75, 100].map(lv => ({ lv, text: '+1 ressource sur chaque boss' })),
    stats: s => [{ label: 'Monstres vaincus', value: s.stats.kills }, { label: 'Ressources récoltées', value: s.stats.gathered }],
  },
  jardinier: {
    goal: 'Cultiver plantes et graines au Jardin, provoquer des mutations, et faire éclore la Graine-Cœur d’Yggdrasil.',
    how: ['Récolter : 15 XP × rang de la plante (×2 si Lumineuse)', 'Chasser un nuisible : +5 XP', 'Graine-Cœur d’Yggdrasil : +1 000 XP'],
    perks: s => {
      const l = level(s, 'jardinier'), n = gridSize(s);
      return [
        { label: 'Parcelles', value: `${n} × ${n}` },
        { label: 'Vitesse de pousse', value: pct(l * 0.005) },
        { label: 'Chance de mutation', value: pct(l * 0.01) },
        { label: 'Récolte', value: `+${Math.floor(l / 25)} par plante` },
      ];
    },
    milestones: [
      { lv: 5, text: 'La Dissonance peut toucher vos plantes (ingrédient rare… et contagieux)' },
      { lv: 20, text: 'Jardin 4 × 4' }, { lv: 25, text: '+1 récolte par plante' },
      { lv: 40, text: 'Jardin 5 × 5' }, { lv: 50, text: '+1 récolte par plante' },
      { lv: 60, text: 'Jardin 6 × 6' }, { lv: 75, text: '+1 récolte par plante' }, { lv: 100, text: '+1 récolte par plante' },
    ],
    stats: s => [{ label: 'Récoltes', value: s.stats.harvests }, { label: 'Mutations', value: s.stats.mutations }, { label: 'Plantes découvertes', value: s.garden.known.length }],
  },
  expedition: {
    goal: 'Envoyer vos alliés récolter bois, pierre, herbes et métal, même quand vous ne jouez pas.',
    how: ['+30 XP par heure d’expédition terminée'],
    perks: s => [
      { label: 'Butin des expéditions', value: pct(level(s, 'expedition') * 0.02) },
      { label: 'Expéditions simultanées', value: `${slots(s)}` },
      { label: 'Zones ouvertes', value: `${ZONES.filter(z => s.bestFloor >= z.floor).length} / ${ZONES.length}` },
    ],
    milestones: [{ lv: 20, text: '2e expédition simultanée' }, { lv: 50, text: '3e expédition simultanée' }],
    stats: s => [{ label: 'Expéditions terminées', value: s.stats.expeditions }],
  },
  alchimiste: {
    goal: 'Transformer récoltes et ressources de monstres en potions : de gros bonus pendant quelques minutes.',
    how: ['Chaque potion préparée rapporte de l’XP (15 à 140 selon la recette)'],
    perks: s => [
      { label: 'Durée des potions', value: pct(level(s, 'alchimiste') * 0.01) },
      { label: 'Recettes connues', value: `${POTIONS.filter(p => level(s, 'alchimiste') >= p.level).length} / ${POTIONS.length}` },
    ],
    milestones: POTIONS.filter(p => p.level > 0).map(p => ({ lv: p.level, text: `${p.name} — ${p.desc}` })),
    stats: s => [{ label: 'Potions préparées', value: s.stats.brewed }, { label: 'Potions bues', value: s.stats.drunk }],
  },
  forgeron: {
    goal: 'Commander à Kaelen l’objet de votre choix au niveau de l’étage actuel, et forger les panoplies d’Acte.',
    how: ['Commande : 20 XP + 15 par rang de rareté', 'Pièce de panoplie : +80 XP'],
    perks: s => [
      { label: 'Rareté minimale des commandes', value: RARITIES[minRarity(s)].name },
      { label: 'Panoplies disponibles', value: `${SETS.filter(d => level(s, 'forgeron') >= d.level).length} / ${SETS.length}` },
    ],
    milestones: [
      ...SETS.filter(d => d.level > 0).map(d => ({ lv: d.level, text: `${d.name} (${d.act})` })),
      { lv: 25, text: `Commandes au moins ${RARITIES[2].name}` }, { lv: 50, text: `Commandes au moins ${RARITIES[3].name}` },
      { lv: 80, text: '10 % de chance d’une commande Légendaire' },
    ].sort((a, b) => a.lv - b.lv),
    stats: s => [{ label: 'Commandes', value: s.stats.orders }, { label: 'Pièces de panoplie', value: s.stats.pieces }],
  },
  cuisinier: {
    goal: 'Cuisiner chez Gaston des repas qui durent des heures, et restent actifs hors-ligne.',
    how: ['Chaque repas cuisiné rapporte de l’XP (20 à 120 selon le plat)'],
    perks: s => [
      { label: 'Durée des repas', value: pct(level(s, 'cuisinier') * 0.01) },
      { label: 'Plats connus', value: `${MEALS.filter(m => level(s, 'cuisinier') >= m.level).length} / ${MEALS.length}` },
    ],
    milestones: MEALS.filter(m => m.level > 0).map(m => ({ lv: m.level, text: `${m.name} — ${m.desc}` })),
    stats: s => [{ label: 'Repas cuisinés', value: s.stats.meals }],
  },
};

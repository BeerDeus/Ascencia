// Quêtes de Lysandra : 3 par jour + 1 par semaine, sur tous les systèmes du jeu.
// Progression = écart des statistiques depuis la création de la quête (rien à brancher ailleurs).
import type { GameState } from './types';
import { now } from './clock';
import { dayKey } from './fief';
import { fiefTabOpen } from './data/fief';
import { PLANTS } from './data/garden';
import { QUEST_TOKENS } from './events';

type Stat = keyof GameState['stats'];
export interface QuestDef { stat: Stat; text: (n: number) => string; min: number; max: number; open: (s: GameState) => boolean }
export interface Quest { stat: Stat; target: number; base: number; gems: number; seeds?: number; claimed: boolean }
export interface Quests { day: string; week: string; daily: Quest[]; weekly: Quest | null }

const always = () => true;
// Objectifs calés sur ~30 min de jeu actif d'un joueur engagé (mesuré au simulateur, hors-ligne exclu).
export const QUEST_DEFS: QuestDef[] = [
  { stat: 'kills', text: n => `Vaincre ${n} monstres`, min: 1200, max: 2000, open: always },
  { stat: 'bossKills', text: n => `Abattre ${n} boss`, min: 100, max: 160, open: always },
  { stat: 'goldenKills', text: n => `Attraper ${n} Gobelins dorés`, min: 30, max: 50, open: s => s.bestFloor >= 10 },
  { stat: 'partitions', text: n => `Jouer ${n} Partitions`, min: 60, max: 100, open: s => s.bestFloor >= 15 },
  { stat: 'parries', text: n => `Parer ${n} attaques de boss`, min: 20, max: 35, open: s => s.bestFloor >= 10 },
  { stat: 'items', text: n => `Ramasser ${n} objets`, min: 40, max: 70, open: s => s.bestFloor > 10 },
  { stat: 'harvests', text: n => `Récolter ${n} plantes`, min: 10, max: 18, open: s => fiefTabOpen(s, 'jardin') },
  { stat: 'expeditions', text: n => `Terminer ${n} expéditions`, min: 2, max: 4, open: s => fiefTabOpen(s, 'expeditions') },
  { stat: 'meals', text: n => `Cuisiner ${n} repas`, min: 2, max: 3, open: s => fiefTabOpen(s, 'cuisine') },
  { stat: 'brewed', text: n => `Préparer ${n} potions`, min: 4, max: 8, open: s => fiefTabOpen(s, 'alchimie') },
  { stat: 'orders', text: n => `Passer ${n} commandes à Kaelen`, min: 3, max: 5, open: s => fiefTabOpen(s, 'forge') },
];
// La quête de la semaine : ~5 jours de jeu engagé.
const WEEKLY: QuestDef[] = [
  { stat: 'bossKills', text: n => `Abattre ${n} boss cette semaine`, min: 1000, max: 1400, open: always },
  { stat: 'kills', text: n => `Vaincre ${n} monstres cette semaine`, min: 10000, max: 14000, open: always },
  { stat: 'partitions', text: n => `Jouer ${n} Partitions cette semaine`, min: 600, max: 800, open: s => s.bestFloor >= 15 },
  { stat: 'harvests', text: n => `Récolter ${n} plantes cette semaine`, min: 90, max: 120, open: s => fiefTabOpen(s, 'jardin') },
  { stat: 'mutations', text: n => `Obtenir ${n} mutations cette semaine`, min: 20, max: 30, open: s => fiefTabOpen(s, 'jardin') },
  { stat: 'expeditions', text: n => `Terminer ${n} expéditions cette semaine`, min: 18, max: 25, open: s => fiefTabOpen(s, 'expeditions') },
];
export const defFor = (q: Quest, weekly = false) => (weekly ? WEEKLY : QUEST_DEFS).find(d => d.stat === q.stat)!;

export function weekKey(t = now()) { return String(Math.floor((t / 86_400_000 + 3) / 7)); } // semaine commençant le lundi
function seeded(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}
const target = (d: QuestDef, r: () => number) => { const v = d.min + r() * (d.max - d.min); return v >= 50 ? Math.round(v / 10) * 10 : Math.round(v); };

export function questsCheck(s: GameState) {
  const day = dayKey(), week = weekKey();
  const q = (s.quests ??= { day: '', week: '', daily: [], weekly: null });
  if (q.day !== day) {
    const r = seeded('q' + day);
    const pool = QUEST_DEFS.filter(d => d.open(s)).sort(() => r() - 0.5).slice(0, 3);
    q.day = day;
    q.daily = pool.map(d => ({ stat: d.stat, target: target(d, r), base: s.stats[d.stat] as number, gems: 15 + Math.round(r() * 2) * 5, claimed: false }));
  }
  // un nouveau joueur n'a pas encore tout débloqué : on complète à 3 quêtes dès qu'une activité s'ouvre
  if (q.daily.length < 3) {
    const r = seeded('q+' + day + q.daily.length);
    const more = QUEST_DEFS.filter(d => d.open(s) && !q.daily.some(x => x.stat === d.stat)).sort(() => r() - 0.5).slice(0, 3 - q.daily.length);
    for (const d of more) q.daily.push({ stat: d.stat, target: target(d, r), base: s.stats[d.stat] as number, gems: 15 + Math.round(r() * 2) * 5, claimed: false });
  }
  if (q.week !== week) {
    const r = seeded('w' + week);
    const opts = WEEKLY.filter(d => d.open(s));
    const d = opts[Math.floor(r() * opts.length)];
    q.week = week;
    q.weekly = { stat: d.stat, target: target(d, r), base: s.stats[d.stat] as number, gems: 120, seeds: 3, claimed: false };
  }
}

export const progress = (s: GameState, q: Quest) => Math.min(q.target, (s.stats[q.stat] as number) - q.base);
export const questDone = (s: GameState, q: Quest) => !q.claimed && progress(s, q) >= q.target;
export const questsClaimable = (s: GameState) => !!s.quests && [...s.quests.daily, ...(s.quests.weekly ? [s.quests.weekly] : [])].some(q => questDone(s, q));

/** Encaisse une quête ; la semaine offre aussi des graines rares (rang 2). Renvoie le nom de la graine éventuelle. */
export function claimQuest(s: GameState, q: Quest, rnd: () => number = Math.random): { gems: number; seed?: string } | null {
  if (!questDone(s, q)) return null;
  q.claimed = true;
  s.gems += q.gems;
  if (s.event) s.event.tokens += QUEST_TOKENS; // les quêtes rapportent aussi des jetons de saison
  let seed: string | undefined;
  if (q.seeds) {
    const rares = PLANTS.filter(p => p.tier === 2);
    const p = rares[Math.floor(rnd() * rares.length)];
    s.garden.seeds[p.id] = (s.garden.seeds[p.id] ?? 0) + q.seeds;
    seed = p.name;
  }
  return { gems: q.gems, seed };
}

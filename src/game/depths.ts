// Les Profondeurs : une descente à part (3 clés/jour), un adversaire par profondeur avec un modificateur aléatoire.
// Chaque profondeur franchie rapporte des Éclats d'abysse (arbre de bonus permanents), des gemmes et du métal.
import type { GameState } from './types';
import { dayKey } from './fief';

export const DEPTHS_UNLOCK = 250;          // record d'étage requis
export const KEYS_PER_DAY = 3;
export const KEY_GEMS = 30;                 // clé supplémentaire

export interface Modifier { id: string; name: string; desc: string; hp: number; time: number }
export const MODIFIERS: Modifier[] = [
  { id: 'normal', name: 'Calme plat', desc: 'Aucun effet', hp: 1, time: 0 },
  { id: 'cuirasse', name: 'Cuirassé', desc: 'PV ×2', hp: 2, time: 0 },
  { id: 'hate', name: 'Hâte', desc: 'Volonté -40 %', hp: 1, time: -0.4 },
  { id: 'nuee', name: 'Nuée', desc: 'PV ×1,6, Volonté -20 %', hp: 1.6, time: -0.2 },
  { id: 'gardien', name: 'Gardien', desc: 'PV ×3, Volonté +50 %', hp: 3, time: 0.5 },
  { id: 'faille', name: 'Faille', desc: 'PV ×0,5 : profitez-en !', hp: 0.5, time: 0 },
];
/** Adversaires des profondeurs (sprites existants). */
export const ABYSS_MOBS = ['mobs/shoggoth', 'mobs/horreur_dimentionnelle', 'mobs/oeil_volant', 'mobs/chevalier_neant', 'mobs/fragment_de_dissonance', 'bosses/geant'];

export interface DepthNode { id: string; name: string; desc: (v: number) => string; per: number; max: number; base: number; step: number }
export const DEPTH_NODES: DepthNode[] = [
  { id: 'degats', name: 'Cœur d’abysse', desc: v => `+${Math.round(v * 100)} % tous les dégâts`, per: 0.05, max: 20, base: 3, step: 2 },
  { id: 'or', name: 'Veine d’or noir', desc: v => `+${Math.round(v * 100)} % or`, per: 0.05, max: 20, base: 3, step: 2 },
  { id: 'volonte', name: 'Souffle des fonds', desc: v => `+${v} s de Volonté`, per: 0.5, max: 10, base: 5, step: 3 },
  { id: 'butin', name: 'Œil de l’abîme', desc: v => `+${Math.round(v * 100)} % de butin`, per: 0.05, max: 10, base: 5, step: 3 },
  { id: 'cles', name: 'Trousseau noir', desc: v => `+${v} clé${v > 1 ? 's' : ''} par jour`, per: 1, max: 2, base: 25, step: 25 },
];
export const nodeCost = (n: DepthNode, lv: number) => n.base + n.step * lv;

export interface DepthsState { day: string; keys: number; depth: number; best: number; shards: number; nodes: Record<string, number>; mod: string; ref?: number }

export const depthsUnlocked = (s: GameState) => s.bestFloor >= DEPTHS_UNLOCK;
export const depthNode = (s: GameState, id: string) => (s.depths?.nodes[id] ?? 0) * (DEPTH_NODES.find(n => n.id === id)?.per ?? 0);
export const keysPerDay = (s: GameState) => KEYS_PER_DAY + depthNode(s, 'cles');

export function depthsCheck(s: GameState) {
  const day = dayKey();
  const d = (s.depths ??= { day, keys: KEYS_PER_DAY, depth: 0, best: 0, shards: 0, nodes: {}, mod: 'normal' });
  if (d.day !== day) { d.day = day; d.keys = Math.max(d.keys, keysPerDay(s)); }
}

/** Difficulté relative à la puissance au moment de descendre : la profondeur 1 tombe en ~3 s, puis +25 % de PV par profondeur.
 *  Aller plus loin = plus de Volonté (arbre, Constellations), Partitions, frappes rapides, critiques. */
export const DEPTH_SECONDS = 3, DEPTH_GROWTH = 1.25;
export const depthHp = (ref: number, depth: number) => ref * DEPTH_SECONDS * DEPTH_GROWTH ** (depth - 1);
/** Récompense d'une profondeur franchie. */
export function depthReward(depth: number) {
  return { shards: 1 + (depth % 5 === 0 ? 4 : 0), gems: depth % 5 === 0 ? 10 : 2, metal: 10 + depth * 3 };
}
export function pickModifier(depth: number, rnd: () => number): Modifier {
  if (depth % 10 === 0) return MODIFIERS.find(m => m.id === 'gardien')!;
  const pool = MODIFIERS.filter(m => m.id !== 'gardien'); // le Gardien n'apparaît que toutes les 10 profondeurs
  return pool[Math.floor(rnd() * pool.length)];
}

export function buyDepthNode(s: GameState, id: string): boolean {
  const n = DEPTH_NODES.find(x => x.id === id), d = s.depths;
  if (!n || !d) return false;
  const lv = d.nodes[id] ?? 0;
  if (lv >= n.max || d.shards < nodeCost(n, lv)) return false;
  d.shards -= nodeCost(n, lv); d.nodes[id] = lv + 1;
  if (id === 'cles') d.keys += 1;
  return true;
}
export function buyKey(s: GameState): boolean {
  if (!s.depths || s.gems < KEY_GEMS) return false;
  s.gems -= KEY_GEMS; s.depths.keys++;
  return true;
}

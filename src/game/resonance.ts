// Ancres (Création, Chaos, Destinée) et Résonance.
import type { GameState } from './types';
import { now } from './clock';
import { T } from './tuning';
import { ANCHOR_FLOOR, SEED_HOURS, SEED_SKIP_GEMS_PER_HOUR, SYMPHONY, symCost, souvenirEclats, HUNTS } from './data/resonance';

export interface Anchors { seedPlanted: number; seedDone: boolean; hunts: Record<string, boolean>; compass: Record<number, boolean> }
export interface Resonance { count: number; fragments: number; total: number; nodes: Record<string, number>;
  auto: { buy: boolean; partitions: boolean; ascend: boolean } }

export const newAnchors = (): Anchors => ({ seedPlanted: 0, seedDone: false, hunts: {}, compass: {} });
export const newResonance = (): Resonance => ({ count: 0, fragments: 0, total: 0, nodes: {}, auto: { buy: true, partitions: true, ascend: false } });

export const anchorsVisible = (s: GameState) => s.bestFloor >= ANCHOR_FLOOR || s.resonance.count > 0;
export const creationDone = (s: GameState) => s.anchors.seedDone;
export const chaosDone = (s: GameState) => HUNTS.every(h => s.anchors.hunts[h.id]);
export const destinyDone = (s: GameState) => Object.values(s.anchors.compass).filter(Boolean).length >= 3;
export const anchorsDone = (s: GameState) => creationDone(s) && chaosDone(s) && destinyDone(s);

// ---- Graine-Cœur d'Yggdrasil
export const seedReadyAt = (s: GameState) => s.anchors.seedPlanted + SEED_HOURS * 3600_000;
export const seedProgress = (s: GameState) => (s.anchors.seedPlanted ? Math.min(1, (now() - s.anchors.seedPlanted) / (SEED_HOURS * 3600_000)) : 0);
export function plantSeed(s: GameState): boolean {
  if (s.anchors.seedPlanted || s.metal < T.seedMetal || !anchorsVisible(s)) return false;
  s.metal -= T.seedMetal; s.anchors.seedPlanted = now();
  return true;
}
export const seedSkipCost = (s: GameState) => Math.ceil(Math.max(0, seedReadyAt(s) - now()) / 3600_000) * SEED_SKIP_GEMS_PER_HOUR;
export function skipSeed(s: GameState): boolean {
  const c = seedSkipCost(s);
  if (!s.anchors.seedPlanted || s.anchors.seedDone || c > s.gems) return false;
  s.gems -= c; s.anchors.seedPlanted = now() - SEED_HOURS * 3600_000;
  return true;
}
export function harvestSeed(s: GameState): boolean {
  if (s.anchors.seedDone || !s.anchors.seedPlanted || seedProgress(s) < 1) return false;
  s.anchors.seedDone = true;
  return true;
}

// ---- Résonance
export const sym = (s: GameState, id: string) => s.resonance?.nodes[id] ?? 0;
export const harmonicMult = (s: GameState) => T.harmMult ** sym(s, 'harmonique');
export const symGoldMult = (s: GameState) => 1 + 0.5 * sym(s, 'echo_or');
export const symEclatsMult = (s: GameState) => 1 + 0.25 * sym(s, 'echo_eclats');
export const departFloor = (s: GameState) => [1, 10, 25, 50, 100][sym(s, 'depart')] ?? 1;

/** Fragments d'Écho gagnés en résonnant maintenant : selon la Légende accumulée dans le cycle. */
export function fragmentsFor(s: GameState) { return Math.floor(T.fragK * Math.sqrt(s.legende / 1000)); }
export const resonanceUnlocked = (s: GameState) => s.resonance.count > 0 || anchorsDone(s);
export const canResonate = (s: GameState) => resonanceUnlocked(s) && fragmentsFor(s) >= 5;

export function buySym(s: GameState, id: string): boolean {
  const n = SYMPHONY.find(x => x.id === id);
  if (!n) return false;
  const lv = sym(s, id);
  if (lv >= n.max) return false;
  const c = symCost(n, lv);
  if (c > s.resonance.fragments) return false;
  s.resonance.fragments -= c;
  s.resonance.nodes[id] = lv + 1;
  return true;
}
export const startEclats = (s: GameState) => souvenirEclats(sym(s, 'souvenir'));

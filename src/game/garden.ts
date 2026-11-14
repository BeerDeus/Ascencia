// Jardin : pousse en temps réel, saisons, mutations par voisinage, traits, Dissonance, nuisibles.
import type { GameState } from './types';
import { now } from './clock';
import { PLANTS, PLANT_BY_ID, MUTATIONS, MUTATION_CHANCE, PEST_CHANCE, DISSONANCE_CHANCE, INFECT_CHANCE, WITHER_HOURS, SEED_PRICE_KILLS, type Season } from './data/garden';
import { addXp, give, level } from './jobs';
import { mobGold } from './formulas';

export type Trait = 'geante' | 'doree' | 'lumineuse';
export interface Plot { plant: string; progress: number; trait?: Trait; dissonantSince?: number; pest?: boolean; mutant?: boolean }
export interface Garden { plots: (Plot | null)[]; lastTick: number; known: string[]; seeds: Record<string, number> }

export const newGarden = (): Garden => ({ plots: Array(36).fill(null), lastTick: 0, known: [], seeds: { herbe_robuste: 3, fleur_rosee: 3 } });
export const gardenUnlocked = (s: GameState) => s.bestFloor >= 26 || s.ascensions > 0;
export const gridSize = (s: GameState) => Math.min(6, 3 + Math.floor(level(s, 'jardinier') / 20));
export const season = (t = now()): Season => (Math.floor(t / (7 * 86_400_000)) % 4) as Season;
export const seasonEndsIn = (t = now()) => 7 * 86_400_000 - (t % (7 * 86_400_000));

let rnd: () => number = Math.random;
export function setGardenRandom(fn: () => number) { rnd = fn; }

const idx = (x: number, y: number) => y * 6 + x;
export function neighbors(s: GameState, i: number): number[] {
  const n = gridSize(s), x = i % 6, y = Math.floor(i / 6), out: number[] = [];
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < n && ny < n) out.push(idx(nx, ny));
  }
  return out;
}
export const inGrid = (s: GameState, i: number) => i % 6 < gridSize(s) && Math.floor(i / 6) < gridSize(s);
export const mature = (p: Plot | null | undefined): boolean => !!p && p.progress >= 1;
export const stage = (p: Plot) => (p.progress >= 1 ? 3 : p.progress >= 0.4 ? 2 : 1);

function seasonMult(s: GameState, plant: string) {
  const d = PLANT_BY_ID[plant], cur = season();
  if (d.season === cur) return 1.5;
  return Math.abs(d.season - cur) === 2 ? 0.6 : 1;
}
export function growSpeed(s: GameState, i: number): number {
  const p = s.garden.plots[i]!;
  if (p.dissonantSince) return 0;
  let m = seasonMult(s, p.plant) * (1 + level(s, 'jardinier') * 0.005);
  const sponges = neighbors(s, i).filter(j => s.garden.plots[j]?.plant === 'racine_eponge').length;
  m *= Math.min(1.5, 1 + 0.25 * sponges);
  if (p.pest) m *= 0.5;
  return m;
}

/** Résultat d'un croisement possible sur une parcelle vide. */
export function mutationFor(s: GameState, i: number): { result: string; chance: number } | null {
  const g = s.garden.plots, around = neighbors(s, i).map(j => g[j]).filter((p): p is Plot => mature(p) && !p!.dissonantSince);
  const trefles = around.filter(p => p.plant === 'trefle_dore').length;
  const bonus = (1 + 0.5 * trefles) * (1 + level(s, 'jardinier') * 0.01);
  const t3 = around.filter(p => PLANT_BY_ID[p.plant].tier === 3);
  if (around.length === 4 && t3.length === 4 && new Set(t3.map(p => p.plant)).size >= 3) {
    return { result: 'yggdrasil', chance: MUTATION_CHANCE[4] * bonus * (season() === 0 ? 3 : 1) };
  }
  for (const m of MUTATIONS) {
    const hasA = around.some(p => p.plant === m.a), hasB = around.some(p => p.plant === m.b);
    if (hasA && hasB) {
      const d = PLANT_BY_ID[m.result];
      return { result: m.result, chance: MUTATION_CHANCE[d.tier] * bonus * (d.season === season() ? 2 : 0.75) };
    }
  }
  return null;
}

function rollTrait(): Trait | undefined {
  const x = rnd();
  return x < 0.05 ? 'geante' : x < 0.08 ? 'doree' : x < 0.12 ? 'lumineuse' : undefined;
}

export interface GardenEvent { kind: 'mutation' | 'dissonance' | 'fletri'; plant: string; at: number }

/** Avance le jardin jusqu'à maintenant (fonctionne aussi après une longue absence). */
export function gardenTick(s: GameState): GardenEvent[] {
  const g = s.garden, t = now(), events: GardenEvent[] = [];
  if (!g.lastTick) { g.lastTick = t; return events; }
  let left = Math.min(t - g.lastTick, 72 * 3600_000);
  g.lastTick = t;
  while (left > 0) {
    const step = Math.min(left, 3600_000), h = step / 3600_000;
    left -= step;
    // 1re passe : pousse, nuisibles, Dissonance
    for (let i = 0; i < 36; i++) {
      const p = g.plots[i];
      if (!p || !inGrid(s, i)) continue;
      if (p.progress < 1) {
        p.progress = Math.min(1, p.progress + (step / (PLANT_BY_ID[p.plant].minutes * 60_000)) * growSpeed(s, i));
        if (!p.pest && p.progress < 1 && rnd() < PEST_CHANCE * h) p.pest = true;
      } else if (!p.dissonantSince && level(s, 'jardinier') >= 5 && rnd() < DISSONANCE_CHANCE * h) {
        p.dissonantSince = t - left; events.push({ kind: 'dissonance', plant: p.plant, at: i });
      }
      if (p.dissonantSince) {
        if (rnd() < INFECT_CHANCE * h) {
          const victims = neighbors(s, i).filter(j => g.plots[j] && !g.plots[j]!.dissonantSince);
          if (victims.length) g.plots[victims[Math.floor(rnd() * victims.length)]]!.dissonantSince = t - left;
        }
        if (t - left - p.dissonantSince > WITHER_HOURS * 3600_000) {
          g.plots[i] = null; give(s, 'essence_dissonante', 2); events.push({ kind: 'fletri', plant: p.plant, at: i });
        }
      }
    }
    // 2e passe : mutations sur les parcelles vides
    for (let i = 0; i < 36; i++) {
      if (g.plots[i] || !inGrid(s, i)) continue;
      const m = mutationFor(s, i);
      if (m && rnd() < 1 - (1 - Math.min(0.95, m.chance)) ** h) {
        g.plots[i] = { plant: m.result, progress: 0, trait: rollTrait(), mutant: true };
        if (!g.known.includes(m.result)) g.known.push(m.result);
        events.push({ kind: 'mutation', plant: m.result, at: i });
        if (s.stats) s.stats.mutations++;
      }
    }
  }
  return events;
}

export function plant(s: GameState, i: number, id: string): boolean {
  const g = s.garden;
  if (!inGrid(s, i) || g.plots[i] || (g.seeds[id] ?? 0) <= 0 || id === 'yggdrasil') return false;
  g.seeds[id]--;
  g.plots[i] = { plant: id, progress: 0, trait: rollTrait() };
  if (!g.known.includes(id)) g.known.push(id);
  return true;
}

export const seedPrice = (s: GameState) => mobGold(s.run.floor) * SEED_PRICE_KILLS;
export function buySeed(s: GameState, id: string, n = 1): boolean {
  const d = PLANT_BY_ID[id];
  if (!d || d.tier !== 1) return false;
  const c = seedPrice(s) * n;
  if (c > s.run.gold) return false;
  s.run.gold -= c;
  s.garden.seeds[id] = (s.garden.seeds[id] ?? 0) + n;
  return true;
}

export function removePest(s: GameState, i: number): boolean {
  const p = s.garden.plots[i];
  if (!p?.pest) return false;
  p.pest = false; give(s, 'chitine', 1); addXp(s, 'jardinier', 5);
  return true;
}

export function cure(s: GameState, i: number): boolean {
  const p = s.garden.plots[i];
  if (!p?.dissonantSince || (s.potions.purete ?? 0) <= 0) return false;
  s.potions.purete--; p.dissonantSince = undefined;
  return true;
}

export interface HarvestResult { plant: string; qty: number; seeds: number; gems: number; essence: number; xp: number; anchor?: boolean }
export function harvest(s: GameState, i: number): HarvestResult | null {
  const g = s.garden, p = g.plots[i];
  if (!p || !mature(p)) return null;
  s.stats.harvests++;
  const d = PLANT_BY_ID[p.plant];
  g.plots[i] = null;
  if (d.id === 'yggdrasil') {
    s.anchors.seedDone = true;
    addXp(s, 'jardinier', 1000);
    return { plant: d.id, qty: 0, seeds: 0, gems: 0, essence: 0, xp: 1000, anchor: true };
  }
  let qty = 1 + Math.floor(rnd() * 2) + (d.season === season() ? 1 : 0) + Math.floor(level(s, 'jardinier') / 25);
  if (p.trait === 'geante') qty *= 2;
  let essence = 0;
  if (p.dissonantSince) { essence = d.tier * 2; qty = Math.max(1, Math.floor(qty / 2)); give(s, 'essence_dissonante', essence); }
  give(s, d.id, qty);
  const seeds = (d.tier === 1 ? 1 : rnd() < 0.6 ? 1 : 0) + (rnd() < 0.3 ? 1 : 0);
  g.seeds[d.id] = (g.seeds[d.id] ?? 0) + seeds;
  const gems = p.trait === 'doree' ? d.tier : 0;
  s.gems += gems;
  const xp = d.tier * 15 * (p.trait === 'lumineuse' ? 2 : 1);
  addXp(s, 'jardinier', xp);
  return { plant: d.id, qty, seeds, gems, essence, xp };
}

export function harvestAll(s: GameState): HarvestResult[] {
  const out: HarvestResult[] = [];
  for (let i = 0; i < 36; i++) if (inGrid(s, i) && mature(s.garden.plots[i]) && s.garden.plots[i]!.plant !== 'yggdrasil') { const r = harvest(s, i); if (r) out.push(r); }
  return out;
}

export const commonPlants = PLANTS.filter(p => p.tier === 1);

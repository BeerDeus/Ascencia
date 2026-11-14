// Logique d'équipement : génération, bonus, Forge, Héritage.
import type { GameState, Item } from './types';
import { arc } from './arcanes';
import { BASES, EPITHETS, RARITIES, SECONDARY, SLOTS, SLOT_PRIMARY, STATS, type Slot, type StatId } from './data/items';

export const INVENTORY_MAX = 40;
export const PLUS_MAX = 10;
const RARITY_MULT = [1, 1.4, 1.9, 2.6, 3.5, 5];
const AFFIX_COUNT = [1, 2, 2, 3, 3, 4];

export function lootUnlocked(s: GameState) { return s.bestFloor > 10 || s.ascensions > 0; }

export function affixValue(stat: StatId, ilvl: number, rarity: number, roll: number) {
  const d = STATS[stat];
  return d.base * (d.scales ? 1 + ilvl / 8 : 1) * RARITY_MULT[rarity] * roll;
}
export const effective = (it: Item, v: number) => v * (1 + 0.12 * it.plus);

export function rollRarity(floor: number, rnd: () => number, min = 0): number {
  const luck = Math.min(0.8, floor / 300);
  const w = [62, 24, 9.5, 3.6, 0.8, 0.1].map((x, i) => x * (1 + luck * i * 1.6));
  let t = rnd() * w.reduce((a, b) => a + b, 0), r = 0;
  for (; r < w.length - 1; r++) { if ((t -= w[r]) < 0) break; }
  return Math.max(min, r);
}

export function makeItem(s: GameState, ilvl: number, rarity: number, rnd: () => number, slot?: Slot): Item {
  const sl = slot ?? SLOTS[Math.floor(rnd() * SLOTS.length)].id;
  const bases = BASES[sl];
  const bi = Math.max(0, Math.min(bases.length - 1, Math.floor((ilvl / 250) * bases.length + rarity * 0.8 + rnd() * 2 - 1)));
  const [base, baseName] = bases[bi];
  const stats: StatId[] = [SLOT_PRIMARY[sl]];
  while (stats.length < AFFIX_COUNT[rarity]) {
    const st = SECONDARY[Math.floor(rnd() * SECONDARY.length)];
    if (!stats.includes(st)) stats.push(st);
  }
  const affixes = stats.map((stat, i) => ({ stat, v: affixValue(stat, ilvl, rarity, (i === 0 ? 1 : 0.6) * (0.85 + rnd() * 0.3)) }));
  const name = rarity >= 4 ? `${baseName} ${EPITHETS[Math.floor(rnd() * EPITHETS.length)]}` : baseName;
  return { id: ++s.itemSeq, slot: sl, base, name, rarity, ilvl, plus: 0, affixes };
}

export function score(it: Item): number {
  return it.affixes.reduce((a, x) => a + STATS[x.stat].weight * effective(it, x.v) / STATS[x.stat].base, 0);
}

export function gearTotals(s: GameState): Record<StatId, number> {
  const t: Record<StatId, number> = { frappe: 0, comp: 0, crit: 0, critdmg: 0, or: 0, mana: 0, volonte: 0 };
  const r = s.run;
  if (!r?.equipped) return t;
  for (const id of Object.values(r.equipped)) {
    const it = r.inventory.find(i => i.id === id);
    if (it) for (const a of it.affixes) t[a.stat] += effective(it, a.v);
  }
  return t;
}

export const equippedIn = (s: GameState, slot: Slot) => s.run.inventory.find(i => i.id === s.run.equipped[slot]);
export const isEquipped = (s: GameState, it: Item) => s.run.equipped[it.slot] === it.id;

export function addItem(s: GameState, it: Item): Item | null {
  const inv = s.run.inventory;
  inv.push(it);
  let dropped: Item | null = null;
  if (inv.length > INVENTORY_MAX) {
    const cands = inv.filter(i => !isEquipped(s, i) && i.id !== s.heritage).sort((a, b) => score(a) - score(b));
    if (cands[0]) { dropped = cands[0]; recycle(s, dropped.id); }
  }
  if (!s.run.equipped[it.slot]) s.run.equipped[it.slot] = it.id; // emplacement vide : équipe d'office
  return dropped;
}

export function equip(s: GameState, id: number) {
  const it = s.run.inventory.find(i => i.id === id);
  if (it) s.run.equipped[it.slot] = id;
}

export function equipBest(s: GameState): number {
  let n = 0;
  for (const { id: slot } of SLOTS) {
    const best = s.run.inventory.filter(i => i.slot === slot).sort((a, b) => score(b) - score(a))[0];
    if (best && s.run.equipped[slot] !== best.id) { s.run.equipped[slot] = best.id; n++; }
  }
  return n;
}

export function recycleValue(it: Item) { return Math.round((it.rarity + 1) ** 2 * (1 + it.ilvl / 25) * (1 + it.plus * 0.5)); }

export function recycle(s: GameState, id: number): number {
  const inv = s.run.inventory, i = inv.findIndex(x => x.id === id);
  if (i < 0) return 0;
  const it = inv[i];
  if (isEquipped(s, it) || it.id === s.heritage) return 0;
  inv.splice(i, 1);
  const v = Math.round(recycleValue(it) * (1 + arc(s, 'metal')));
  s.metal += v;
  return v;
}

export function recycleBelow(s: GameState, rarity: number): number {
  let total = 0;
  for (const it of [...s.run.inventory]) if (it.rarity < rarity) total += recycle(s, it.id);
  return total;
}

export function upgradeCost(it: Item) { return Math.ceil(6 * (it.plus + 1) ** 1.5 * (it.rarity + 1) * (1 + it.ilvl / 50)); }
export function upgrade(s: GameState, id: number): boolean {
  const it = s.run.inventory.find(i => i.id === id);
  if (!it || it.plus >= PLUS_MAX) return false;
  const c = upgradeCost(it);
  if (c > s.metal) return false;
  s.metal -= c; it.plus++;
  return true;
}

export function setHeritage(s: GameState, id: number | null) { s.heritage = s.heritage === id ? null : id; }

export const rarityName = (r: number) => RARITIES[r].name;

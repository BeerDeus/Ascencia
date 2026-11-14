// Forgeron : fabrication ciblée et panoplies (bonus de set portés + bonus permanent de collection).
import type { GameState, Item } from './types';
import { SETS, SET_BY_ID, ORDER_COST, orderMetal, type SetBonus } from './data/forge';
import { STATS, type Slot, type StatId } from './data/items';
import { addXp, canPay, level, take } from './jobs';
import { addItem, affixValue, rollRarity, makeItem } from './items';

export const minRarity = (s: GameState) => { const l = level(s, 'forgeron'); return l >= 50 ? 3 : l >= 25 ? 2 : 1; };
export const setUnlocked = (s: GameState, id: string) => { const d = SET_BY_ID[id]; return s.bestFloor >= d.floor && level(s, 'forgeron') >= d.level; };

/** Commande à Kaelen : emplacement et stat principale au choix, au niveau de l'étage actuel. */
export function order(s: GameState, slot: Slot, stat: StatId, rnd: () => number = Math.random): Item | null {
  const metal = orderMetal(s.run.floor);
  if (s.metal < metal || !canPay(s, ORDER_COST)) return null;
  s.metal -= metal; take(s, ORDER_COST);
  let rar = Math.max(minRarity(s), rollRarity(s.run.floor, rnd));
  if (level(s, 'forgeron') >= 80 && rnd() < 0.1) rar = Math.max(rar, 4);
  const it = makeItem(s, s.run.floor, rar, rnd, slot);
  // la stat choisie devient la stat principale
  it.affixes[0] = { stat, v: affixValue(stat, it.ilvl, rar, 1) };
  it.affixes = it.affixes.filter((a, i) => i === 0 || a.stat !== stat);
  addItem(s, it);
  addXp(s, 'forgeron', 20 + rar * 15);
  return it;
}

/** Forge une pièce de panoplie (rareté Épique, niveau de l'étage actuel). */
export function forgePiece(s: GameState, setId: string, slot: Slot, rnd: () => number = Math.random): Item | null {
  const d = SET_BY_ID[setId], p = d?.pieces.find(x => x.slot === slot);
  if (!d || !p || !setUnlocked(s, setId) || s.metal < d.metal || !canPay(s, d.cost)) return null;
  s.metal -= d.metal; take(s, d.cost);
  const it = makeItem(s, s.run.floor, 3, rnd, slot);
  it.base = p.base; it.name = p.name; it.set = setId;
  addItem(s, it);
  const got = (s.forge.sets[setId] ??= []);
  if (!got.includes(slot)) got.push(slot);
  addXp(s, 'forgeron', 80);
  return it;
}

export const setComplete = (s: GameState, id: string) => (s.forge?.sets[id]?.length ?? 0) >= SET_BY_ID[id].pieces.length;
/** Bonus permanent de collection : tous les dégâts. */
export const permanentSetMult = (s: GameState) => 1 + SETS.filter(d => setComplete(s, d.id)).reduce((a, d) => a + d.permanent, 0);

/** Bonus des panoplies portées. */
export function wornSetBonus(s: GameState): Required<SetBonus> {
  const out = { or: 0, frappe: 0, comp: 0, crit: 0, critdmg: 0, all: 0, volonte: 0, power: 0 };
  const r = s.run;
  if (!r?.equipped) return out;
  const counts: Record<string, number> = {};
  for (const id of Object.values(r.equipped)) {
    const it = r.inventory.find(i => i.id === id);
    if (it?.set) counts[it.set] = (counts[it.set] ?? 0) + 1;
  }
  for (const [id, n] of Object.entries(counts)) {
    const d = SET_BY_ID[id];
    if (!d) continue;
    for (const b of [n >= 2 ? d.bonus2 : {}, n >= 4 ? d.bonus4 : {}]) for (const [k, v] of Object.entries(b)) out[k as keyof SetBonus] += v!;
  }
  return out;
}
export { SETS, STATS };

// ===== Objets : catalogue, inventaire, équipement, loot, craft (Phase 5) =====
// Les stats d'un item utilisent les mêmes clés que derive() (attaque, defense,
// maxHp, crit, esquive, precision, resistance, penetration, vitesse, critDmg…).
// Elles alimentent player.bonuses.flat via recomputeBonuses().
import { state, setState } from '../state.js';

// ---- Catalogue ----
export const ITEMS = {
  // Matériaux (kind: 'materiau')
  eclat_pierre:  { name: 'Éclat de Pierre',  icon: '🪨', kind: 'materiau', sell: 2 },
  fil_echo:      { name: "Fil d'Écho",       icon: '🧵', kind: 'materiau', sell: 4 },
  herbe_calme:   { name: 'Herbe Apaisante',  icon: '🌿', kind: 'materiau', sell: 2 },
  essence_note:  { name: 'Essence de Note',  icon: '🎶', kind: 'materiau', sell: 8 },

  // Armes
  lame_pierre:   { name: 'Lame de Pierre', icon: '🗡️', kind: 'arme', rarity: 'common', stats: { attaque: 12 }, weapon: { tempo: 2.5, note: 'RÉ' }, sell: 30, desc: 'Grossièrement taillée, mais suffisamment lourde pour écraser des crânes.' },

  // Armures / accessoires
  casque_cuir:    { name: 'Casque de Cuir',    icon: '🪖', kind: 'casque',    stats: { defense: 2 },            sell: 12, desc: 'Un capuchon renforcé de lamelles.' },
  plastron_cuir:  { name: 'Plastron de Cuir',  icon: '🦺', kind: 'plastron',  stats: { defense: 3, maxHp: 5 },  sell: 20, desc: "Protège l'essentiel." },
  jambieres_cuir: { name: 'Jambières de Cuir', icon: '👖', kind: 'jambieres', stats: { defense: 2 },            sell: 14, desc: 'Souples et discrètes.' },
  bottes_cuir:    { name: 'Bottes de Cuir',    icon: '🥾', kind: 'bottes',    stats: { esquive: 2 },            sell: 12, desc: 'Légères, pour esquiver.' },
  bouclier_bois:  { name: 'Bouclier de Bois',  icon: '🛡️', kind: 'bouclier',  stats: { defense: 3, resistance: 2 }, sell: 18, desc: 'Un rondache éraflé.' },
  anneau_chance:  { name: 'Anneau de Chance',  icon: '💍', kind: 'anneau',    stats: { crit: 3 },               sell: 22, desc: 'Le métal murmure la fortune.' },
  amulette_echo:  { name: "Amulette d'Écho",   icon: '📿', kind: 'amulette',  stats: { precision: 3, maxHp: 3 },sell: 24, desc: 'Vibre au rythme des combats.' },
  talisman_vif:   { name: 'Talisman Vif',      icon: '🔆', kind: 'accessoire',stats: { critDmg: 6, vitesse: 0.05 }, sell: 20, desc: 'Accélère le geste.' },

  // Consommables (kind: 'conso') — heal en combat
  pain:   { name: 'Pain',        icon: '🍞', kind: 'conso', heal: 8,  sell: 3, desc: 'Restaure 8 PV. Remet le Tempo à 0.' },
  ragout: { name: 'Ragoût Chaud',icon: '🍲', kind: 'conso', heal: 20, sell: 6, desc: 'Restaure 20 PV. Remet le Tempo à 0.' },
};
export const getItem = (tid) => ITEMS[tid];

// ---- Emplacements d'équipement (paperdoll ; ordre = maquette) ----
export const SLOTS = [
  { id: 'casque',      ab: 'CAS', label: 'Casque',      kind: 'casque' },
  { id: 'conso',       ab: 'CON', label: 'Consommable', kind: 'conso' },
  { id: 'arme',        ab: 'ARM', label: 'Arme',        kind: 'arme' },
  { id: 'plastron',    ab: 'PLA', label: 'Plastron',    kind: 'plastron' },
  { id: 'bouclier',    ab: 'BOU', label: 'Bouclier',    kind: 'bouclier' },
  { id: 'anneau1',     ab: 'ANN', label: 'Anneau',      kind: 'anneau' },
  { id: 'jambieres',   ab: 'JAM', label: 'Jambières',   kind: 'jambieres' },
  { id: 'anneau2',     ab: 'ANN', label: 'Anneau',      kind: 'anneau' },
  { id: 'bottes',      ab: 'BOT', label: 'Bottes',      kind: 'bottes' },
  { id: 'amulette',    ab: 'AMU', label: 'Amulette',    kind: 'amulette' },
  { id: 'accessoire1', ab: 'ACC', label: 'Accessoire',  kind: 'accessoire' },
  { id: 'accessoire2', ab: 'ACC', label: 'Accessoire',  kind: 'accessoire' },
  { id: 'accessoire3', ab: 'ACC', label: 'Accessoire',  kind: 'accessoire' },
];
// Disposition en lignes (comme la maquette).
export const SLOT_ROWS = [
  ['casque', 'conso'],
  ['arme', 'plastron', 'bouclier'],
  ['anneau1', 'jambieres', 'anneau2'],
  ['bottes', 'amulette'],
  ['accessoire1', 'accessoire2', 'accessoire3'],
];
export const emptyEquipment = () => Object.fromEntries(SLOTS.map((s) => [s.id, null]));
const slotsForKind = (kind) => SLOTS.filter((s) => s.kind === kind).map((s) => s.id);

// ---- Loot par monstre ----
export const LOOT = {
  z1_lutin: [{ tid: 'eclat_pierre', chance: 0.6, min: 1, max: 2 }, { tid: 'herbe_calme', chance: 0.35, min: 1, max: 1 }],
  z1_echo:  [{ tid: 'herbe_calme', chance: 0.5, min: 1, max: 2 }, { tid: 'fil_echo', chance: 0.22, min: 1, max: 1 }],
  z1_note:  [{ tid: 'eclat_pierre', chance: 0.5, min: 1, max: 1 }, { tid: 'essence_note', chance: 0.1, min: 1, max: 1 }],
  z1_boss:  [{ tid: 'casque_cuir', chance: 1, min: 1, max: 1 }, { tid: 'eclat_pierre', chance: 1, min: 3, max: 5 }],
  z2_zebre:  [{ tid: 'fil_echo', chance: 0.5, min: 1, max: 2 }, { tid: 'eclat_pierre', chance: 0.4, min: 1, max: 2 }],
  z2_spectre:[{ tid: 'fil_echo', chance: 0.45, min: 1, max: 1 }, { tid: 'essence_note', chance: 0.2, min: 1, max: 1 }],
  z2_golem:  [{ tid: 'eclat_pierre', chance: 0.7, min: 2, max: 3 }, { tid: 'bouclier_bois', chance: 0.08, min: 1, max: 1 }],
  z2_faille: [{ tid: 'essence_note', chance: 0.3, min: 1, max: 2 }, { tid: 'fil_echo', chance: 0.4, min: 1, max: 1 }],
  z2_boss:   [{ tid: 'plastron_cuir', chance: 1, min: 1, max: 1 }, { tid: 'essence_note', chance: 1, min: 2, max: 3 }],
  z3_ombre:  [{ tid: 'essence_note', chance: 0.5, min: 1, max: 2 }, { tid: 'fil_echo', chance: 0.5, min: 1, max: 2 }],
  z3_disso:  [{ tid: 'essence_note', chance: 0.5, min: 1, max: 2 }, { tid: 'anneau_chance', chance: 0.06, min: 1, max: 1 }],
  z3_veuve:  [{ tid: 'essence_note', chance: 0.6, min: 2, max: 3 }, { tid: 'talisman_vif', chance: 0.06, min: 1, max: 1 }],
  z3_boss:   [{ tid: 'lame_pierre', chance: 1, min: 1, max: 1 }, { tid: 'essence_note', chance: 1, min: 4, max: 6 }],
};

// ---- Recettes (Forge / Cuisine) ----
// cost : { coinA:<or>, <tid matériau>:<n> }
export const RECIPES = {
  forge: [
    { out: 'lame_pierre',    cost: { coinA: 15, eclat_pierre: 3 } },
    { out: 'casque_cuir',    cost: { coinA: 10, eclat_pierre: 2 } },
    { out: 'plastron_cuir',  cost: { coinA: 20, eclat_pierre: 4 } },
    { out: 'jambieres_cuir', cost: { coinA: 14, eclat_pierre: 2, fil_echo: 1 } },
    { out: 'bottes_cuir',    cost: { coinA: 12, fil_echo: 2 } },
    { out: 'bouclier_bois',  cost: { coinA: 16, eclat_pierre: 3 } },
    { out: 'anneau_chance',  cost: { coinA: 25, fil_echo: 2, essence_note: 1 } },
    { out: 'amulette_echo',  cost: { coinA: 28, fil_echo: 2, essence_note: 1 } },
    { out: 'talisman_vif',   cost: { coinA: 30, essence_note: 2, fil_echo: 1 } },
  ],
  cuisine: [
    { out: 'pain',   cost: { coinA: 5,  herbe_calme: 2 } },
    { out: 'ragout', cost: { coinA: 15, herbe_calme: 3, eclat_pierre: 1 } },
  ],
};

// ---- Inventaire (stacks {tid,count}) ----
export const invCount = (tid) => { const s = state.inventory.find((x) => x.tid === tid); return s ? s.count : 0; };
function _add(inv, tid, n) { const s = inv.find((x) => x.tid === tid); if (s) s.count += n; else inv.push({ tid, count: n }); }
function _remove(inv, tid, n) { const i = inv.findIndex((x) => x.tid === tid); if (i < 0) return false; if (inv[i].count < n) return false; inv[i].count -= n; if (inv[i].count <= 0) inv.splice(i, 1); return true; }

export function addItem(tid, n = 1) { setState((s) => _add(s.inventory, tid, n)); }
export function sellItem(tid, n = 1) {
  const it = ITEMS[tid]; if (!it) return false;
  if (invCount(tid) < n) return false;
  setState((s) => { _remove(s.inventory, tid, n); s.resources.coinA += (it.sell || 0) * n; });
  return true;
}

// ---- Équipement ----
export function recomputeBonuses(p = state.player) {
  const flat = {};
  for (const s of SLOTS) {
    const inst = p.equipment && p.equipment[s.id];
    if (!inst) continue;
    const it = ITEMS[inst.tid];
    if (!it || it.kind === 'conso' || !it.stats) continue;
    for (const [k, v] of Object.entries(it.stats)) flat[k] = (flat[k] || 0) + v;
  }
  p.bonuses = p.bonuses || { flat: {}, pct: {} };
  p.bonuses.flat = flat;
  if (!p.bonuses.pct) p.bonuses.pct = {};
}

// Équipe un item. slotId optionnel (sinon 1er emplacement compatible / libre).
export function equip(tid, slotId = null) {
  const it = ITEMS[tid]; if (!it) return false;
  if (invCount(tid) < 1) return false;

  if (it.kind === 'conso') { // consommable : on équipe TOUT le stack
    setState((s) => {
      const cur = s.player.equipment.conso;
      if (cur) _add(s.inventory, cur.tid, cur.count); // renvoie l'ancien stack
      const st = s.inventory.find((x) => x.tid === tid);
      const count = st ? st.count : 0;
      _remove(s.inventory, tid, count);
      s.player.equipment.conso = { tid, count };
    });
    return true;
  }

  // Équipement : on équipe 1 unité
  const candidates = slotsForKind(it.kind);
  if (!candidates.length) return false;
  const target = slotId && candidates.includes(slotId)
    ? slotId
    : (candidates.find((id) => !state.player.equipment[id]) || candidates[0]);
  setState((s) => {
    const prev = s.player.equipment[target];
    _remove(s.inventory, tid, 1);
    if (prev) _add(s.inventory, prev.tid, 1); // l'ancien retourne au sac
    s.player.equipment[target] = { tid };
    recomputeBonuses(s.player);
  });
  return true;
}

export function unequip(slotId) {
  const inst = state.player.equipment[slotId]; if (!inst) return false;
  setState((s) => {
    const cur = s.player.equipment[slotId];
    if (!cur) return;
    _add(s.inventory, cur.tid, cur.count || 1); // conso: rend le stack
    s.player.equipment[slotId] = null;
    recomputeBonuses(s.player);
  });
  return true;
}

// ---- Loot à la victoire ----
export function rollLoot(monsterId) {
  const table = LOOT[monsterId]; if (!table) return [];
  const drops = [];
  for (const d of table) {
    if (Math.random() <= d.chance) {
      const n = d.min + Math.floor(Math.random() * (d.max - d.min + 1));
      if (n > 0) drops.push({ tid: d.tid, n });
    }
  }
  if (drops.length) setState((s) => { for (const d of drops) _add(s.inventory, d.tid, d.n); });
  return drops;
}

// ---- Craft ----
export function canCraft(recipe) {
  for (const [k, v] of Object.entries(recipe.cost)) {
    if (k === 'coinA') { if ((state.resources.coinA || 0) < v) return false; }
    else if (invCount(k) < v) return false;
  }
  return true;
}
export function craft(recipe) {
  if (!canCraft(recipe)) return false;
  setState((s) => {
    for (const [k, v] of Object.entries(recipe.cost)) {
      if (k === 'coinA') s.resources.coinA -= v;
      else _remove(s.inventory, k, v);
    }
    _add(s.inventory, recipe.out, 1);
  });
  return true;
}

export const itemsApi = { ITEMS, SLOTS, LOOT, RECIPES, addItem, sellItem, equip, unequip, craft, rollLoot, invCount, recomputeBonuses };

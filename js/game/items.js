// ===== Objets : catalogue (généré + manuel), inventaire, équipement, craft =====
// Les items d'équipement donnent des ATTRIBUTS (vie, force…) → appliqués via
// player.bonuses.flat (couche attributs), puis derive() calcule les stats.
import { state, setState } from '../state.js';
import { ITEMS_GEN, MATERIALS_GEN } from '../data/items.gen.js';

// Ressources "vrac" (en-tête) vs matériaux (inventaire, stackés).
export const RESOURCE_KEYS = ['or', 'bois', 'metal', 'tissu', 'fragments'];

// Consommables (soin en combat).
const CONSUMABLES = {
  pain:        { id: 'pain',        name: 'Pain',            icon: '🍞', kind: 'conso', heal: 15, sell: 3,  desc: 'Restaure 15 PV. Remet le Tempo à 0.' },
  ragout:      { id: 'ragout',      name: 'Ragoût Chaud',    icon: '🍲', kind: 'conso', heal: 45, sell: 6,  desc: 'Restaure 45 PV. Remet le Tempo à 0.' },
  potion_soin: { id: 'potion_soin', name: 'Potion de Soin',  icon: '🧪', kind: 'conso', heal: 90, sell: 12, desc: 'Restaure 90 PV. Remet le Tempo à 0.' },
};

// Matériaux spécifiques aux monstres (drops de famille).
const MONSTER_MATS = {
  peau_de_gobelin:    { id: 'peau_de_gobelin',    name: 'Peau de Gobelin',     icon: '🟩', kind: 'materiau', sell: 4 },
  queue_de_rat:       { id: 'queue_de_rat',       name: 'Queue de Rat',        icon: '🐀', kind: 'materiau', sell: 3 },
  soie_araignee:      { id: 'soie_araignee',      name: "Soie d'Araignée",     icon: '🕸️', kind: 'materiau', sell: 4 },
  croc_de_loup:       { id: 'croc_de_loup',       name: 'Croc de Loup',        icon: '🦷', kind: 'materiau', sell: 4 },
  defense_sanglier:   { id: 'defense_sanglier',   name: 'Défense de Sanglier', icon: '🐗', kind: 'materiau', sell: 5 },
  gelee_de_slime:     { id: 'gelee_de_slime',     name: 'Gelée de Slime',      icon: '🫧', kind: 'materiau', sell: 3 },
  herbes_medicinales: { id: 'herbes_medicinales', name: 'Herbes Médicinales',  icon: '🌿', kind: 'materiau', sell: 3 },
};

export const ITEMS = { ...ITEMS_GEN, ...MATERIALS_GEN, ...MONSTER_MATS, ...CONSUMABLES };
export const getItem = (tid) => ITEMS[tid];

// ---- Emplacements (taxo legacy) ----
export const SLOTS = [
  { id: 'tete',       ab: 'TÊT', label: 'Tête',        kind: 'tete' },
  { id: 'conso',      ab: 'CON', label: 'Consommable', kind: 'conso' },
  { id: 'arme',       ab: 'ARM', label: 'Arme',        kind: 'arme' },
  { id: 'torse',      ab: 'TOR', label: 'Torse',       kind: 'torse' },
  { id: 'mains',      ab: 'MAI', label: 'Mains',       kind: 'mains' },
  { id: 'jambes',     ab: 'JAM', label: 'Jambes',      kind: 'jambes' },
  { id: 'pieds',      ab: 'PIE', label: 'Pieds',       kind: 'pieds' },
  { id: 'accessoire', ab: 'ACC', label: 'Accessoire',  kind: 'accessoire' },
  { id: 'artefact',   ab: 'ART', label: 'Artefact',    kind: 'artefact' },
];
export const SLOT_ROWS = [
  ['tete', 'conso'],
  ['arme', 'torse', 'mains'],
  ['jambes', 'pieds'],
  ['accessoire', 'artefact'],
];
export const emptyEquipment = () => Object.fromEntries(SLOTS.map((s) => [s.id, null]));
const slotsForKind = (kind) => SLOTS.filter((s) => s.kind === kind).map((s) => s.id);

// ---- Recettes (Forge / Cuisine) ----
const forgeIds = ['epee_rouillee', 'casque_en_cuir_use', 'tunique_dechiree', 'protege_tibias_en_cuir', 'bottes_usagees', 'heaume_de_bois', 'anneau_simple', 'baton_noueux', 'dague_ebrechee'];
export const RECIPES = {
  forge: forgeIds.filter((id) => ITEMS[id]).map((id) => ({ out: id, cost: ITEMS[id].cost || {} })),
  cuisine: [
    { out: 'pain',        cost: { herbes_medicinales: 2 } },
    { out: 'ragout',      cost: { herbes_medicinales: 3, tissu: 20 } },
    { out: 'potion_soin', cost: { herbes_medicinales: 5, fragments: 1 } },
  ],
};

// ---- Inventaire ----
export const invCount = (tid) => { const s = state.inventory.find((x) => x.tid === tid); return s ? s.count : 0; };
function _add(inv, tid, n) { const s = inv.find((x) => x.tid === tid); if (s) s.count += n; else inv.push({ tid, count: n }); }
function _remove(inv, tid, n) { const i = inv.findIndex((x) => x.tid === tid); if (i < 0) return false; if (inv[i].count < n) return false; inv[i].count -= n; if (inv[i].count <= 0) inv.splice(i, 1); return true; }

export function addItem(tid, n = 1) { setState((s) => _add(s.inventory, tid, n)); }
export function sellItem(tid, n = 1) {
  const it = ITEMS[tid]; if (!it) return false;
  if (invCount(tid) < n) return false;
  setState((s) => { _remove(s.inventory, tid, n); s.resources.or = (s.resources.or || 0) + (it.sell || 0) * n; });
  return true;
}

// ---- Bonus d'équipement (couche ATTRIBUTS) ----
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

// ---- Équipement ----
export function equip(tid, slotId = null) {
  const it = ITEMS[tid]; if (!it) return false;
  if (invCount(tid) < 1) return false;

  if (it.kind === 'conso') { // consommable : on équipe TOUT le stack
    setState((s) => {
      const cur = s.player.equipment.conso;
      if (cur) _add(s.inventory, cur.tid, cur.count);
      const st = s.inventory.find((x) => x.tid === tid);
      const count = st ? st.count : 0;
      _remove(s.inventory, tid, count);
      s.player.equipment.conso = { tid, count };
    });
    return true;
  }

  const candidates = slotsForKind(it.kind);
  if (!candidates.length) return false;
  const target = slotId && candidates.includes(slotId) ? slotId : (candidates.find((id) => !state.player.equipment[id]) || candidates[0]);
  setState((s) => {
    const prev = s.player.equipment[target];
    _remove(s.inventory, tid, 1);
    if (prev) _add(s.inventory, prev.tid, 1);
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
    _add(s.inventory, cur.tid, cur.count || 1);
    s.player.equipment[slotId] = null;
    recomputeBonuses(s.player);
  });
  return true;
}

// ---- Craft ----
export function canCraft(recipe) {
  for (const [k, v] of Object.entries(recipe.cost)) {
    if (RESOURCE_KEYS.includes(k)) { if ((state.resources[k] || 0) < v) return false; }
    else if (invCount(k) < v) return false;
  }
  return true;
}
export function craft(recipe) {
  if (!canCraft(recipe)) return false;
  setState((s) => {
    for (const [k, v] of Object.entries(recipe.cost)) {
      if (RESOURCE_KEYS.includes(k)) s.resources[k] -= v;
      else _remove(s.inventory, k, v);
    }
    _add(s.inventory, recipe.out, 1);
  });
  return true;
}

export const itemsApi = { ITEMS, SLOTS, RECIPES, RESOURCE_KEYS, addItem, sellItem, equip, unequip, craft, canCraft, invCount, recomputeBonuses };

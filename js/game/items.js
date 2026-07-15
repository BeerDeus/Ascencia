// ===== Objets : catalogue (généré + manuel), inventaire, équipement, craft =====
// Les items d'équipement donnent des ATTRIBUTS (vie, force…) → appliqués via
// player.bonuses.flat (couche attributs), puis derive() calcule les stats.
import { state, setState } from '../state.js';
import { ITEMS_GEN, MATERIALS_GEN } from '../data/items.gen.js';
import { ACCORDS } from './symphony.js';
import { restore as restoreEndurance } from './endurance.js';
import { incrementMetric } from './primes.js';

// Ressources "vrac" (en-tête) vs matériaux (inventaire, stackés).
export const RESOURCE_KEYS = ['or', 'bois', 'metal', 'tissu', 'fragments', 'eclats_ascension'];

// Consommables (soin en combat).
const CONSUMABLES = {
  pain:        { id: 'pain',        name: 'Pain',            icon: 'assets/sprites/nourriture/pain.png', kind: 'conso', heal: 15, sell: 3,  desc: 'Restaure 15 PV. Remet le Tempo à 0.' },
  ragout:      { id: 'ragout',      name: 'Ragoût Chaud',    icon: 'assets/sprites/nourriture/soupe.png', kind: 'conso', heal: 45, sell: 6,  desc: 'Restaure 45 PV. Remet le Tempo à 0.' },
  potion_soin: { id: 'potion_soin', name: 'Potion de Soin',  icon: 'assets/sprites/potions/potion_rouge_1.png', kind: 'conso', heal: 90, sell: 12, desc: 'Restaure 90 PV. Remet le Tempo à 0.' },
};

// Consommable d'Endurance (Cuisine) — hors combat uniquement (voir useConsumable
// ci-dessous) : contrairement aux CONSUMABLES de soin, pas d'équipement au slot
// CON (celui-ci reste dédié au heal en combat, voir combat.js consume()).
const ENERGY_ITEMS = {
  infusion_tonique: {
    id: 'infusion_tonique', name: 'Infusion Tonique',
    icon: 'assets/sprites/packs/stamina_regen.png', kind: 'energie',
    endurance: 5, sell: 10, desc: "Restaure 5 points d'Endurance. Se consomme depuis le sac, hors combat.",
  },
};

// Potions (Alchimiste, Phase 5.2) : buff temporaire en % sur une stat dérivée (voir
// game/player.js potionBonuses()/derive()). Un seul buff actif par stat à la fois —
// boire à nouveau la même potion écrase juste la durée, jamais de stack. Bues depuis
// le sac (drinkPotion, hors combat comme l'Infusion Tonique — la vue Combat plein
// écran masque de toute façon la nav pendant un combat, donc de facto pré-combat).
// Cumul : reboire une potion pendant qu'elle est active ADDITIONNE le temps restant à
// la nouvelle durée (2:30 restant + 5:00 = 7:30), plafonné haut (1h) pour éviter un
// stock illimité tout en récompensant l'anticipation (décision produit, cf. discussion).
export const POTION_BUFF_CAP_MS = 60 * 60 * 1000;
const POTIONS = {
  potion_force:     { id: 'potion_force',     name: 'Philtre de Force',     icon: 'assets/sprites/potions/potion_orange.png',   kind: 'potion', stat: 'attaque', pct: 25, ms: 5 * 60 * 1000, sell: 15, desc: '+25% Attaque pendant 5 min.' },
  potion_precision: { id: 'potion_precision', name: 'Philtre de Précision', icon: 'assets/sprites/potions/potion_jaune.png',    kind: 'potion', stat: 'crit',    pct: 20, ms: 5 * 60 * 1000, sell: 15, desc: '+20% Critique pendant 5 min.' },
  potion_esquive:   { id: 'potion_esquive',   name: 'Philtre de Fuite',     icon: 'assets/sprites/potions/potion_sarcelle.png', kind: 'potion', stat: 'esquive', pct: 20, ms: 5 * 60 * 1000, sell: 15, desc: '+20% Esquive pendant 5 min.' },
};

// Matériaux spécifiques aux monstres (drops de famille).
const MONSTER_MATS = {
  peau_de_gobelin:    { id: 'peau_de_gobelin',    name: 'Peau de Gobelin',     icon: 'assets/sprites/ressources/peau_gobelin.png',   kind: 'materiau', sell: 4 },
  queue_de_rat:       { id: 'queue_de_rat',       name: 'Queue de Rat',        icon: 'assets/sprites/ressources/queue_rat.png',       kind: 'materiau', sell: 3 },
  soie_araignee:      { id: 'soie_araignee',      name: "Soie d'Araignée",     icon: 'assets/sprites/ressources/soie_arraignee.png',  kind: 'materiau', sell: 4 },
  croc_de_loup:       { id: 'croc_de_loup',       name: 'Croc de Loup',        icon: 'assets/sprites/ressources/croc_loup.png',       kind: 'materiau', sell: 4 },
  defense_sanglier:   { id: 'defense_sanglier',   name: 'Défense de Sanglier', icon: 'assets/sprites/ressources/defense_sanglier.png',kind: 'materiau', sell: 5 },
  gelee_de_slime:     { id: 'gelee_de_slime',     name: 'Gelée de Slime',      icon: 'assets/sprites/ressources/gelee_slime.png',     kind: 'materiau', sell: 3 },
  herbes_medicinales: { id: 'herbes_medicinales', name: 'Herbes Médicinales',  icon: 'assets/sprites/ressources/herbes.png',          kind: 'materiau', sell: 3 },
  // Matériau Dissonance haut-palier (drop des monstres liés à Larry — voir enemies.gen.js).
  eclats_instables:   { id: 'eclats_instables',   name: 'Éclats Instables',    icon: 'assets/sprites/ressources/eclats_instables.png',kind: 'materiau', sell: 8 },
};

// Icônes des matériaux auto-générés (MATERIALS_GEN, voir data/items.gen.js — fichier
// "ne pas éditer à la main") : override appliqué après le merge, jamais sur le fichier
// généré lui-même. Noms de fichiers déduits de assets/sprites/ressources/ (mêmes concepts,
// libellés parfois différents entre le générateur legacy et les sprites).
const MATERIAL_ICON_OVERRIDES = {
  essence_dissonante:          'assets/sprites/ressources/essence_dissonante.png',
  essence_dissonante_pure:     'assets/sprites/ressources/essence_dissonante_pure.png',
  artefact_ancien_harmonique:  'assets/sprites/ressources/artefact_ancien_harmonique.png',
  coeur_de_golem:              'assets/sprites/ressources/coeur_golem.png',
  chitine_renforcee:           'assets/sprites/ressources/chitine.png',
  plume_de_griffon:            'assets/sprites/ressources/plume_griffon.png',
  sang_de_basilic:             'assets/sprites/ressources/basilic_blood.png',
  totem_orc:                   'assets/sprites/ressources/totem_orc.png',
  essence_spectrale:           'assets/sprites/ressources/essence_spectrale.png',
  oeil_de_chimere:             'assets/sprites/ressources/oeil_chimere.png',
  ecaille_de_profond:          'assets/sprites/ressources/ecaille_profond.png',
  larme_d_archange:            'assets/sprites/ressources/larme_archange.png',
  coeur_de_dragon_ancien:      'assets/sprites/ressources/coeur_dragon.png',
  fragment_d_ame_de_demon:     'assets/sprites/ressources/ame_demon.png',
  poussiere_de_vide:           'assets/sprites/ressources/poussiere_vide.png',
};

// Symphonies (Phase 3+) : objets équipables générés depuis le catalogue d'Accords.
// Drop des 5 boss de zone (voir BOSSES_GEN.loot dans enemies.gen.js — un type par
// boss, chance croissante avec la difficulté) ; non vendables (sell: 0). L'inventaire
// de départ fournit aussi 1 exemplaire de chaque pour tester sans dépendre du drop.
const SYMPHONY_ITEMS = Object.fromEntries(ACCORDS.map((a) => [a.id, {
  id: a.id, name: a.name, icon: a.icon, kind: 'symphonie', rarity: 'special', sell: 0, desc: a.desc,
}]));

export const ITEMS = { ...ITEMS_GEN, ...MATERIALS_GEN, ...MONSTER_MATS, ...CONSUMABLES, ...ENERGY_ITEMS, ...POTIONS, ...SYMPHONY_ITEMS };
for (const [tid, icon] of Object.entries(MATERIAL_ICON_OVERRIDES)) { if (ITEMS[tid]) ITEMS[tid].icon = icon; }
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
  // Symphonies : 3 emplacements dédiés, équipés comme un équipement normal (equip()/unequip()).
  { id: 'symphonie1', ab: 'SY1', label: 'Symphonie 1', kind: 'symphonie' },
  { id: 'symphonie2', ab: 'SY2', label: 'Symphonie 2', kind: 'symphonie' },
  { id: 'symphonie3', ab: 'SY3', label: 'Symphonie 3', kind: 'symphonie' },
];
export const SLOT_ROWS = [
  ['tete', 'conso'],
  ['arme', 'torse', 'mains'],
  ['jambes', 'pieds'],
  ['accessoire', 'artefact'],
  ['symphonie1', 'symphonie2', 'symphonie3'],
];
export const emptyEquipment = () => Object.fromEntries(SLOTS.map((s) => [s.id, null]));
const slotsForKind = (kind) => SLOTS.filter((s) => s.kind === kind).map((s) => s.id);

// ---- Recettes (Forge / Cuisine) ----
// Forge : TOUT l'équipement du catalogue généré (armes/armures, tous kinds "gear")
// qui a un coût renseigné — dérivé automatiquement d'ITEMS_GEN, donc tout nouvel
// item ajouté au générateur apparaît en Forge sans retouche ici. Les items sans
// cost (ex: anneau_confrerie) restent hors Forge (objets spéciaux, pas un craft
// standard). Voir village.js pour les filtres Type/Rareté (dropdowns).
const GEAR_KINDS = ['tete', 'arme', 'torse', 'mains', 'jambes', 'pieds', 'accessoire', 'artefact'];
const forgeIds = Object.values(ITEMS_GEN)
  .filter((it) => GEAR_KINDS.includes(it.kind) && it.cost && Object.keys(it.cost).length)
  .map((it) => it.id);
export const RECIPES = {
  forge: forgeIds.map((id) => ({ out: id, cost: ITEMS[id].cost || {} })),
  cuisine: [
    { out: 'pain',        cost: { herbes_medicinales: 2 } },
    { out: 'ragout',      cost: { herbes_medicinales: 3, tissu: 20 } },
    { out: 'potion_soin', cost: { herbes_medicinales: 5, fragments: 1 } },
  ],
  // Alchimiste (Phase 5.2) : potions de buff temporaire + Infusion Tonique (déplacée
  // depuis Cuisine — un tonique d'Endurance a plus sa place ici qu'un plat).
  alchimie: [
    { out: 'infusion_tonique', cost: { herbes_medicinales: 4, fragments: 2 } },
    { out: 'potion_force',     cost: { herbes_medicinales: 3, metal: 15, fragments: 1 } },
    { out: 'potion_precision', cost: { herbes_medicinales: 3, tissu: 15, fragments: 1 } },
    { out: 'potion_esquive',   cost: { herbes_medicinales: 3, bois: 15, fragments: 1 } },
  ],
};

// ---- Inventaire ----
export const invCount = (tid) => { const s = state.inventory.find((x) => x.tid === tid); return s ? s.count : 0; };
// _add = ajout brut, toujours réussi (usage interne : retours d'équipement/déséquipement —
// on ne doit JAMAIS perdre un objet qu'on retire du paperdoll, même sac plein).
function _add(inv, tid, n) { const s = inv.find((x) => x.tid === tid); if (s) s.count += n; else inv.push({ tid, count: n }); }
function _remove(inv, tid, n) { const i = inv.findIndex((x) => x.tid === tid); if (i < 0) return false; if (inv[i].count < n) return false; inv[i].count -= n; if (inv[i].count <= 0) inv.splice(i, 1); return true; }

// ---- Capacité du sac (emplacements achetables) ----
export const inventoryCapacity = (s = state) => s.inventorySlots || 20;
// Une nouvelle pile ne rentre que s'il reste de la place ; empiler sur une pile
// déjà existante est toujours possible (ne consomme pas d'emplacement en plus).
export const hasRoomFor = (tid, s = state) => s.inventory.some((x) => x.tid === tid) || s.inventory.length < inventoryCapacity(s);
// Ajout capacity-aware : utilisé pour toute NOUVELLE acquisition (loot, craft, achat,
// debug). Renvoie false et n'ajoute rien si le sac est plein (l'objet est perdu).
export function tryAddItem(inv, tid, n, capacity) {
  const s = inv.find((x) => x.tid === tid);
  if (s) { s.count += n; return true; }
  if (inv.length >= capacity) return false;
  inv.push({ tid, count: n });
  return true;
}

export function addItem(tid, n = 1) { setState((s) => tryAddItem(s.inventory, tid, n, inventoryCapacity(s))); }

// Consommation directe depuis le sac (hors combat) — pour l'instant réservé aux
// items d'Énergie (kind 'energie', ex: Infusion Tonique). Retire 1 du stack puis
// crédite l'Endurance via endurance.js (regenAt géré là-bas, pas ici).
export function useConsumable(tid) {
  const it = ITEMS[tid];
  if (!it || !it.endurance) return false;
  if (invCount(tid) < 1) return false;
  setState((s) => { _remove(s.inventory, tid, 1); });
  restoreEndurance(it.endurance);
  return true;
}
// Boit une Potion (kind 'potion') : retire 1 du stack, pose/CUMULE le buff temporaire
// sur la stat visée (voir state.player.potionBuffs + game/player.js potionBonuses()).
// Le temps restant s'additionne à la nouvelle durée, plafonné à POTION_BUFF_CAP_MS.
export function drinkPotion(tid) {
  const it = ITEMS[tid];
  if (!it || it.kind !== 'potion') return false;
  if (invCount(tid) < 1) return false;
  setState((s) => {
    _remove(s.inventory, tid, 1);
    s.player.potionBuffs = s.player.potionBuffs || {};
    const now = Date.now();
    const cur = s.player.potionBuffs[it.stat];
    const remaining = cur && cur.until > now ? cur.until - now : 0;
    const totalMs = Math.min(remaining + it.ms, POTION_BUFF_CAP_MS);
    s.player.potionBuffs[it.stat] = { pct: it.pct, until: now + totalMs, name: it.name, icon: it.icon, baseMs: it.ms };
  });
  return true;
}

export function sellItem(tid, n = 1) {
  const it = ITEMS[tid]; if (!it) return false;
  if (invCount(tid) < n) return false;
  setState((s) => { _remove(s.inventory, tid, n); s.resources.or = (s.resources.or || 0) + (it.sell || 0) * n; });
  return true;
}

// Coût du prochain emplacement de sac (croissant) + achat.
const SLOT_BASE_COST = 50, SLOT_GROWTH = 1.18, SLOT_BASE = 20;
export const nextSlotCost = (s = state) => Math.round(SLOT_BASE_COST * Math.pow(SLOT_GROWTH, inventoryCapacity(s) - SLOT_BASE));
export function buyInventorySlot() {
  const cost = nextSlotCost();
  if ((state.resources.or || 0) < cost) return false;
  setState((s) => { s.resources.or -= cost; s.inventorySlots = inventoryCapacity(s) + 1; });
  return true;
}

// ---- Marchand (Village) : catalogue d'achat + prix (markup sur la valeur de vente) ----
export const BUY_CATALOG = ['pain', 'ragout', 'potion_soin', 'infusion_tonique', 'herbes_medicinales'];
const BUY_MARKUP = 3;
export const buyPrice = (it) => Math.max(1, Math.round((it.sell || 1) * BUY_MARKUP));
export function buyItem(tid, n = 1) {
  const it = ITEMS[tid]; if (!it) return false;
  const price = buyPrice(it) * n;
  if ((state.resources.or || 0) < price) return false;
  if (!hasRoomFor(tid)) return false; // sac plein : on ne débite pas l'or pour rien
  setState((s) => { s.resources.or -= price; tryAddItem(s.inventory, tid, n, inventoryCapacity(s)); });
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

// ---- Symphonies : équipées via les slots symphonie1-3 (equip()/unequip() génériques ci-dessus) ----
export function equippedSymphonyIds(p = state.player) {
  return SLOTS.filter((s) => s.kind === 'symphonie')
    .map((s) => p.equipment && p.equipment[s.id])
    .filter(Boolean)
    .map((inst) => inst.tid);
}

// ---- Craft ----
// n = quantité (craft multiple) ; le coût de la recette est simplement multiplié par n.
export function canCraft(recipe, n = 1) {
  if (n < 1) return false;
  for (const [k, v] of Object.entries(recipe.cost)) {
    const need = v * n;
    if (RESOURCE_KEYS.includes(k)) { if ((state.resources[k] || 0) < need) return false; }
    else if (invCount(k) < need) return false;
  }
  return true;
}
// Quantité maximale craftable dans l'instant (limitée par les ressources/matériaux
// disponibles) — sert au bouton "Max" du stepper de quantité (village.js).
export function maxCraftable(recipe) {
  let max = Infinity;
  for (const [k, v] of Object.entries(recipe.cost)) {
    if (v <= 0) continue;
    const have = RESOURCE_KEYS.includes(k) ? (state.resources[k] || 0) : invCount(k);
    max = Math.min(max, Math.floor(have / v));
  }
  return Number.isFinite(max) ? Math.max(0, max) : 0;
}
export function craft(recipe, n = 1) {
  if (!canCraft(recipe, n)) return false;
  if (!hasRoomFor(recipe.out)) return false; // sac plein : on ne consomme pas les matériaux pour rien
  setState((s) => {
    for (const [k, v] of Object.entries(recipe.cost)) {
      const amt = v * n;
      if (RESOURCE_KEYS.includes(k)) s.resources[k] -= amt;
      else _remove(s.inventory, k, amt);
    }
    tryAddItem(s.inventory, recipe.out, n, inventoryCapacity(s));
  });
  incrementMetric('craftCount', n); // Primes (game/primes.js) — Forge + Cuisine
  return true;
}

export const itemsApi = { ITEMS, SLOTS, RECIPES, RESOURCE_KEYS, BUY_CATALOG, addItem, useConsumable, drinkPotion, POTION_BUFF_CAP_MS, sellItem, buyItem, buyPrice, equip, unequip, craft, canCraft, maxCraftable, invCount, recomputeBonuses, equippedSymphonyIds, inventoryCapacity, hasRoomFor, tryAddItem, nextSlotCost, buyInventorySlot };

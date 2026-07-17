// ===== Ascension / Prestige (Phase 6) =====
// Déblocée à partir de SETTINGS.ascension.unlockZone (zone 5 depuis le 2026-07-17,
// voir rapport_difficulte_zone10.md — abaissé de 10). Reset la
// run (niveau/attributs/équipement/inventaire/or-matériaux/zones/sac) contre des
// points de Constellation dépensables dans l'arbre (data/constellations.js) —
// bonus permanents dérivés à la volée (même pattern que codexBonuses/masteryBonuses,
// voir game/codex.js), jamais stockés en dur sur le joueur.
// Restent INTACTS au reset : Codex/Maîtrise (state.monsterWins), Récits (dérivés de la
// progression réelle), Compétences (state.skills), fragments/eclats_ascension, et bien
// sûr l'arbre de Constellations lui-même (state.constellations.spent).
import { state, setState, defaultPlayer, defaultInventory, defaultResources } from '../state.js';
import { SETTINGS } from '../config.js';
import { recomputeBonuses } from './items.js';
import { ALL_NODES, RARITY_UNLOCK_NODES, RARITY_ORDER, nodeById } from '../data/constellations.js';

// ---- Lecture de l'arbre ----
export const ownedLevel = (nodeId, spent = state.constellations.spent) => (spent && spent[nodeId]) || 0;
export const isNodeOwned = (nodeId, spent = state.constellations.spent) => ownedLevel(nodeId, spent) > 0;

function depsMet(node, spent) {
  return (node.dependencies || []).every((id) => ownedLevel(id, spent) > 0);
}
// 'maxed' | 'locked' (dépendance manquante) | 'available' (peut recevoir un point si assez de points)
export function nodeStatus(node, spent = state.constellations.spent) {
  const lvl = ownedLevel(node.id, spent);
  if (lvl >= node.maxLevel) return 'maxed';
  if (!depsMet(node, spent)) return 'locked';
  return 'available';
}
export function nextCost(node, spent = state.constellations.spent) {
  const lvl = ownedLevel(node.id, spent);
  return lvl < node.cost.length ? node.cost[lvl] : null;
}
export function canSpend(nodeId) {
  const node = nodeById(nodeId);
  if (!node) return false;
  if (nodeStatus(node) !== 'available') return false;
  const cost = nextCost(node);
  return cost != null && (state.constellations.points || 0) >= cost;
}
export function spendPoint(nodeId) {
  if (!canSpend(nodeId)) return false;
  const node = nodeById(nodeId);
  const cost = nextCost(node);
  setState((s) => {
    s.constellations.points -= cost;
    s.constellations.spent[nodeId] = (s.constellations.spent[nodeId] || 0) + 1;
  });
  return true;
}

// ---- Rareté Forge débloquée par l'arbre ----
// Rééquilibrage 2026-07-17 (voir rapport_difficulte_zone10.md) : le Peu Commun est
// désormais débloqué dès le début (plus besoin du nœud `trunk_uncommon`, devenu
// gratuit — voir data/constellations.js TRUNK), et le Rare s'ouvre automatiquement
// dès la 1ère Ascension (hasAscendedOnce ci-dessous), sans dépenser de point : le
// nœud qui le débloquait auparavant (harmonie_08) a été remplacé par un nœud de
// combat dédié (Pénétration/Défense — voir data/constellations.js armorPierceNode).
// Épique/Légendaire/Mythique restent des jauges de rareté classiques à acheter.
export function unlockedRarities(spent = state.constellations.spent) {
  const owned = new Set(['common', 'uncommon']);
  if (hasAscendedOnce()) owned.add('rare');
  for (const n of RARITY_UNLOCK_NODES) if (isNodeOwned(n.id, spent)) owned.add(n.unlockRarity);
  return owned;
}
export function isRarityUnlocked(rarity, spent = state.constellations.spent) {
  if (!rarity || rarity === 'common') return true;
  return unlockedRarities(spent).has(rarity);
}
export const RARITY_TIERS = RARITY_ORDER;
// Rareté la plus haute débloquée (pour l'affichage Forge — voir views/village.js).
export function highestUnlockedRarity(spent = state.constellations.spent) {
  const owned = unlockedRarities(spent);
  for (let i = RARITY_ORDER.length - 1; i >= 0; i--) if (owned.has(RARITY_ORDER[i])) return RARITY_ORDER[i];
  return 'common';
}

// A ascendé au moins une fois : conditionne l'affichage de l'arbre (voir
// views/ascension.js — pas de "spoil" du contenu avant la 1ère Ascension).
export const hasAscendedOnce = () => (state.ascension.count || 0) > 0;

// ---- Bonus permanents dérivés à la volée (jamais stockés — voir game/player.js derive()) ----
export function constellationBonuses(spent = state.constellations.spent) {
  const flat = {}, pct = {};
  const special = { startingResourcePct: 0, ascensionGainPct: 0, bagBaseBonus: 0 };
  for (const n of ALL_NODES) {
    const lvl = ownedLevel(n.id, spent);
    if (!lvl || !n.bonus) continue;
    if (n.bonus.flat) for (const [k, v] of Object.entries(n.bonus.flat)) flat[k] = (flat[k] || 0) + v * lvl;
    if (n.bonus.pct) for (const [k, v] of Object.entries(n.bonus.pct)) pct[k] = (pct[k] || 0) + v * lvl;
    if (n.bonus.special) for (const [k, v] of Object.entries(n.bonus.special)) special[k] = (special[k] || 0) + v * lvl;
  }
  return { flat, pct, special };
}

// ---- Déblocage / gain ----
export function canAscend() {
  return (state.progress.unlocked || 1) >= SETTINGS.ascension.unlockZone;
}
// Détail du calcul de points, affiché tel quel dans la carte "Prochaine Ascension"
// (voir views/ascension.js) — chaque terme correspond à une ligne de la carte.
// zonePoints : 1 pt / zone au-delà du seuil de déblocage (× pointsPerZone, tunable ;
// terme "étage de donjon" à ajouter ici plus tard sans migration de save, voir
// state.ascension.bestFloorAllTime). goldPoints : bonus pour l'or accumulé au moment
// d'Ascender (encourage à ne pas tout dépenser juste avant) — 1 pt / SETTINGS.
// ascension.goldPerPoint (10 000 par défaut). bonusPct : Sillage Ascensionnel (Écho).
export function pointsBreakdown() {
  const zone = state.progress.unlocked || 1;
  const zonePoints = Math.max(0, zone - (SETTINGS.ascension.unlockZone - 1)) * (SETTINGS.ascension.pointsPerZone || 1);
  const goldPoints = Math.floor((state.resources.or || 0) / SETTINGS.ascension.goldPerPoint);
  const base = zonePoints + goldPoints;
  const bonusPct = constellationBonuses().special.ascensionGainPct || 0;
  const total = Math.round(base * (1 + bonusPct / 100));
  return { zone, zonePoints, goldPoints, bonusPct, base, total };
}
export function previewPoints() { return pointsBreakdown().total; }

// ---- Ascension : reset de run contre des points ----
export function ascend() {
  if (!canAscend()) return false;
  const gained = previewPoints();
  const bonus = constellationBonuses(); // AVANT reset — les nodes déjà possédés s'appliquent à CETTE ascension

  setState((s) => {
    const zoneReached = s.progress.unlocked || 1;
    s.ascension = s.ascension || { count: 0, bestZoneAllTime: 0, bestFloorAllTime: 0 };
    s.ascension.count += 1;
    s.ascension.bestZoneAllTime = Math.max(s.ascension.bestZoneAllTime || 0, zoneReached);

    s.constellations.points = (s.constellations.points || 0) + gained;
    s.constellations.totalEarned = (s.constellations.totalEarned || 0) + gained;

    // ---- Reset (tout sauf Codex/Maîtrise/Récits/Compétences/fragments/Constellations) ----
    s.player = defaultPlayer();
    s.inventory = defaultInventory();

    const startRes = defaultResources();
    const pct = bonus.special.startingResourcePct || 0;
    for (const k of ['or', 'bois', 'metal', 'tissu']) startRes[k] = Math.round(startRes[k] * (1 + pct / 100));
    startRes.fragments = s.resources.fragments || 0;               // conservés
    startRes.eclats_ascension = s.resources.eclats_ascension || 0; // conservés
    s.resources = startRes;

    s.progress = { unlocked: 1, selected: 1, bossDefeated: {} };
    s.inventorySlots = SETTINGS.ascension.bagBase + (bonus.special.bagBaseBonus || 0);
    s.mesure = [];
    s.endurance = { cur: SETTINGS.enduranceMax, max: SETTINGS.enduranceMax, regenAt: null };
    // monsterWins, skills, primes/primeStats, notifications, constellations : intacts.

    recomputeBonuses(s.player);
  });
  return true;
}

// ---- Respec (payant, arbre entier, en Éclats d'Ascension — LA ressource premium du
// jeu, pas `fragments` qui est une monnaie de craft courante ; voir SETTINGS.ascension.
// respecBaseEclats/Growth) ----
export function respecCost() {
  const n = state.constellations.respecCount || 0;
  return Math.round(SETTINGS.ascension.respecBaseEclats * Math.pow(SETTINGS.ascension.respecGrowth, n));
}
export function respec() {
  const cost = respecCost();
  if ((state.resources.eclats_ascension || 0) < cost) return false;
  setState((s) => {
    s.resources.eclats_ascension -= cost;
    let refunded = 0;
    for (const [id, lvl] of Object.entries(s.constellations.spent)) {
      const node = nodeById(id);
      if (!node) continue;
      for (let i = 0; i < lvl; i++) refunded += node.cost[i] || 0;
    }
    s.constellations.points = (s.constellations.points || 0) + refunded;
    s.constellations.spent = {};
    s.constellations.respecCount = (s.constellations.respecCount || 0) + 1;
    s.inventorySlots = SETTINGS.ascension.bagBase; // les bonus Écho qui l'augmentaient viennent d'être respec
    recomputeBonuses(s.player);
  });
  return true;
}

// ---- Debug console (test sans farm de points) ---- Ascencia.debugAddPoints(20) crédite
// directement des points de Constellation (n'affecte pas totalEarned/count, purement
// pour tester l'arbre) ; Ascencia.debugResetConstellations() vide l'arbre + les points
// sans passer par le respec payant (différent de respec() : gratuit, pas d'Éclats d'Ascension).
export function debugAddPoints(n = 10) {
  setState((s) => { s.constellations.points = (s.constellations.points || 0) + n; });
  return state.constellations.points;
}
export function debugResetConstellations() {
  setState((s) => { s.constellations.points = 0; s.constellations.totalEarned = 0; s.constellations.spent = {}; s.constellations.respecCount = 0; s.ascension.count = 0; recomputeBonuses(s.player); });
  return true;
}

export const ascensionApi = {
  canAscend, previewPoints, pointsBreakdown, ascend, respec, respecCost,
  ownedLevel, isNodeOwned, nodeStatus, nextCost, canSpend, spendPoint,
  unlockedRarities, isRarityUnlocked, RARITY_TIERS, highestUnlockedRarity, hasAscendedOnce,
  constellationBonuses, debugAddPoints, debugResetConstellations,
};

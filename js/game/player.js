// ===== Logique joueur : XP, level-up, attributs, stats dérivées, ressources =====
// L'état brut vit dans state.js ; ici = règles de jeu. Les attributs sont la
// source de vérité ; toutes les stats de combat en découlent (recalcul auto).
import { state, setState } from '../state.js';
import { codexBonuses, masteryBonuses } from './codex.js';
import { loreBonuses } from './lore.js';

const r2 = (n) => Math.round(n * 100) / 100;

// Courbe d'XP : coût du niveau L pour passer au suivant.
export const xpForLevel = (lvl) => Math.round(100 * Math.pow(1.15, lvl - 1));

// Montée de niveau : points d'attribut à répartir (pas d'auto-distribution).
export const ATTR_POINTS_PER_LEVEL = 3;
const DEF_PER_10_LVL = 1; // Défense +1 tous les 10 niveaux (seule voie hors équipement)
export const ALLOCATABLE = ['vie', 'force', 'agilite', 'chance', 'intelligence']; // pas 'defense'

// ---- Attributs de base + attributs d'équipement (couche attributs) ----
// L'équipement donne des ATTRIBUTS (Vie, Force…) via bonuses.flat ; les stats
// détaillées en découlent. Clés attributs : vie, force, agilite, chance, intelligence, defense.
export const ATTR_KEYS = ['vie', 'force', 'agilite', 'chance', 'intelligence', 'defense'];
// Bonus additifs combinés : équipement (player.bonuses) + Codex + Maîtrise (dérivés
// à la volée depuis monsterWins, jamais stockés — voir game/codex.js).
export function effectiveAttributes(player = state.player) {
  const a = { ...player.attributes };
  const eq = (player.bonuses && player.bonuses.flat) || {};
  const cx = codexBonuses().flat;
  const ms = masteryBonuses().flat;
  const lr = loreBonuses().flat;
  for (const k of ATTR_KEYS) a[k] = (a[k] || 0) + (eq[k] || 0) + (cx[k] || 0) + (ms[k] || 0) + (lr[k] || 0);
  return a;
}

// ---- Stats de base (formules portées du legacy 0.9.0) ----
//  Vie → PV=10+Vie*3 | Force → Attaque(+niv/1.32), Pénétration=0.5√F, Régén=F/10
//  Agilité → CritDmg=175+0.5√A, Esquive=0.15√A | Chance → Crit=3.75√C, Butin=100√(C/300)
//  Intelligence → Résist=0.3√I, XP=5√I | Défense → réduction PLATE
const sq = Math.sqrt;
function baseStats(a, level = 1) {
  const lootPct = 100 * sq(Math.min(a.chance, 300) / 300);
  return {
    maxHp:         10 + a.vie * 3,
    attaque:       a.force + level / 1.32,           // stat principale = Force (classes plus tard)
    defense:       a.defense,                         // réduction PLATE
    penetration:   0.5 * sq(a.force),                 // % d'armure ignorée (armor_shred)
    regenHors:     a.force / 10,                       // PV/s hors combat
    vitesse:       1 + a.agilite * 0.03,              // remplissage Tempo (notre système)
    critDmg:       175 + 0.5 * sq(a.agilite),         // %
    esquive:       0.15 * sq(a.agilite),              // %
    crit:          3.75 * sq(a.chance),               // %
    rarete:        lootPct,                            // % (LootBonus)
    bonusOr:       lootPct * 0.5,                      // % (trouvaille d'or)
    precision:     90 + a.agilite * 0.1,              // % chance de toucher
    resistance:    0.3 * sq(a.intelligence),          // %
    bonusXp:       5 * sq(a.intelligence),            // %
    // Symphonie / thème
    harmonie:      a.intelligence * 0.5 + a.chance * 0.3,
    chanceNote:    25 + a.chance * 0.6,               // % apparition de bulles
    resDissonance: a.defense * 0.2 + a.intelligence * 0.2,
  };
}

// Poids pour le Score de Puissance (agrégat global).
const POWER_W = {
  attaque: 3, defense: 2, penetration: 1.5, maxHp: 0.5, crit: 2, critDmg: 0.4,
  precision: 0.3, esquive: 2, resistance: 2, harmonie: 1, resDissonance: 1,
};

// ---- Stats dérivées = baseStats(attributs effectifs incl. équipement) ----
export function derive(player = state.player) {
  const a = effectiveAttributes(player);
  const out = baseStats(a, player.level || 1);
  const pct = { ...((player.bonuses && player.bonuses.pct) || {}) };
  const cxPct = codexBonuses().pct, msPct = masteryBonuses().pct, lrPct = loreBonuses().pct;
  for (const k of Object.keys(cxPct)) pct[k] = (pct[k] || 0) + cxPct[k];
  for (const k of Object.keys(msPct)) pct[k] = (pct[k] || 0) + msPct[k];
  for (const k of Object.keys(lrPct)) pct[k] = (pct[k] || 0) + lrPct[k];
  for (const k of Object.keys(out)) if (pct[k]) out[k] *= (1 + pct[k] / 100); // bonus % (équipement + Codex + Maîtrise)
  out.maxHp = Math.round(out.maxHp);
  out.attaque = Math.round(out.attaque);
  out.puissance = Math.round(
    Object.entries(POWER_W).reduce((s, [k, w]) => s + (out[k] || 0) * w, 0)
  );
  return out;
}

// Formate une valeur brute selon le type de stat (fmt du catalogue STATS).
export function formatStat(fmt, v) {
  switch (fmt) {
    case 'int':    return String(Math.round(v));
    case 'pct':    return `+${r2(v)}%`;
    case 'perSec': return `+${v.toFixed(2)} PV/s`;
    case 'speed':  return `×${v.toFixed(2)}`;
    default:       return String(v);
  }
}

// Map { key: valeur formatée } pour l'affichage (Profil).
export function displayStats(player = state.player) {
  const d = derive(player);
  const out = { puissance: d.puissance };
  for (const [k, v] of Object.entries(d)) {
    if (k === 'puissance' || k === 'maxHp') { out[k] = v; continue; }
    out[k] = v; // valeurs brutes ; le formatage se fait via STATS.fmt + formatStat
  }
  return out;
}

// ---- Actions ----
export function addXp(amount) {
  setState((s) => {
    const p = s.player;
    p.xp.cur += Math.round(amount * (1 + derive(p).bonusXp / 100)); // Intelligence → Gain d'XP
    while (p.xp.cur >= p.xp.max) {
      p.xp.cur -= p.xp.max;
      p.level += 1;
      p.attrPoints = (p.attrPoints || 0) + ATTR_POINTS_PER_LEVEL;
      if (p.level % 10 === 0) p.attributes.defense += DEF_PER_10_LVL; // +1 Défense tous les 10 niv
      p.xp.max = xpForLevel(p.level);
    }
    syncCombatHp(p); // recalage du max ; PAS de heal auto (aucune régén en combat)
  });
}

// Répartition d'un point d'attribut (Défense exclue).
export function allocate(key, n = 1) {
  if (!ALLOCATABLE.includes(key)) return false;
  if ((state.player.attrPoints || 0) < n) return false;
  setState((s) => {
    s.player.attributes[key] += n;
    s.player.attrPoints -= n;
    syncCombatHp(s.player);
  });
  return true;
}

export function addAttribute(key, n = 1) { // usage debug/console
  setState((s) => {
    if (s.player.attributes[key] == null) return;
    s.player.attributes[key] = Math.max(0, s.player.attributes[key] + n);
    syncCombatHp(s.player);
  });
}

export function addResource(key, n) {
  setState((s) => { if (s.resources[key] != null) s.resources[key] += n; });
}

export function spendResource(key, n) {
  if ((state.resources[key] ?? 0) < n) return false;
  setState((s) => { s.resources[key] -= n; });
  return true;
}

export function damage(n) {
  setState((s) => { s.player.combatHp.cur = Math.max(0, s.player.combatHp.cur - n); });
}

export function heal(n) {
  setState((s) => {
    const max = derive(s.player).maxHp;
    s.player.combatHp.cur = Math.min(max, s.player.combatHp.cur + n);
  });
}

// Recalage du pool PV de combat quand les attributs changent.
function syncCombatHp(p, full = false) {
  const max = derive(p).maxHp;
  if (!p.combatHp) p.combatHp = { cur: max, max };
  p.combatHp.max = max;
  if (full) p.combatHp.cur = max;
  else p.combatHp.cur = Math.min(p.combatHp.cur, max);
}

// ---- Régénération de PV HORS combat (Force → PV/s, voir baseStats.regenHors) ----
// Aucune régén pendant un combat (retirée) ; la vie est globale et persiste entre
// les combats (voir game/combat.js: start() reprend combatHp.cur, onLoss() n'en
// restaure qu'une fraction). `lastRegenTick` = horloge de session, non persistée ;
// le rattrapage hors-ligne passe par `regenSince(ts)` avec meta.lastSeen (main.js).
let lastRegenTick = Date.now();

function applyRegen(elapsedSec) {
  if (elapsedSec <= 0) return;
  // Garde en amont : si déjà pleine vie, on ne déclenche même pas de setState
  // (évite d'écrire en storage / de notifier l'UI à chaque tick pour rien —
  // important maintenant que le tick tourne toutes les ~1s, voir main.js).
  const max0 = derive(state.player).maxHp;
  if (!state.player.combatHp || state.player.combatHp.cur >= max0) return;
  setState((s) => {
    const max = derive(s.player).maxHp;
    if (!s.player.combatHp) s.player.combatHp = { cur: max, max };
    if (s.player.combatHp.cur >= max) return;
    const rate = derive(s.player).regenHors; // PV/s
    const gained = rate * elapsedSec;
    if (gained <= 0) return;
    s.player.combatHp.cur = Math.min(max, s.player.combatHp.cur + gained);
  });
}

// Tick appelé périodiquement pendant que l'app est ouverte (voir main.js).
export function regenTick(now = Date.now()) {
  const elapsedSec = Math.max(0, (now - lastRegenTick) / 1000);
  lastRegenTick = now;
  applyRegen(elapsedSec);
}

// Rattrapage hors-ligne : à appeler une fois au boot avec l'ancien meta.lastSeen.
export function regenSince(sinceTs, now = Date.now()) {
  const elapsedSec = Math.max(0, (now - (sinceTs || now)) / 1000);
  lastRegenTick = now;
  applyRegen(elapsedSec);
}

// API console pour tester (voir aussi main.js -> window.Ascencia).
export const playerApi = { addXp, allocate, addAttribute, addResource, spendResource, damage, heal, derive, displayStats, formatStat, xpForLevel, regenTick, regenSince, ALLOCATABLE, ATTR_POINTS_PER_LEVEL };

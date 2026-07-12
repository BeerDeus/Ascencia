// ===== Logique joueur : XP, level-up, attributs, stats dérivées, ressources =====
// L'état brut vit dans state.js ; ici = règles de jeu. Les attributs sont la
// source de vérité ; toutes les stats de combat en découlent (recalcul auto).
import { state, setState } from '../state.js';

const r2 = (n) => Math.round(n * 100) / 100;

// Courbe d'XP : coût du niveau L pour passer au suivant.
export const xpForLevel = (lvl) => Math.round(100 * Math.pow(1.15, lvl - 1));

// Montée de niveau : points d'attribut à répartir (pas d'auto-distribution).
export const ATTR_POINTS_PER_LEVEL = 3;
const DEF_PER_10_LVL = 1; // Défense +1 tous les 10 niveaux (seule voie hors équipement)
export const ALLOCATABLE = ['vie', 'force', 'agilite', 'chance', 'intelligence']; // pas 'defense'

// ---- Stats de base (formules brutes, source = attributs) ----
// Effets d'attributs (cf. Cahier) :
//  ❤️ Vie  → PV max (+3/pt)   💪 Force → Attaque, Pénétration (plate), Régén hors combat
//  🤸 Agilité → Dégâts Crit, Esquive, Vitesse   🍀 Chance → Crit, Qualité butin, Or
//  🧠 Intelligence → Gain XP, Toucher, Résistance   🛡️ Défense → réduction plate (−1/pt)
function baseStats(a) {
  return {
    maxHp:         7 + a.vie * 3,                    // 10 PV au niveau 1 (vie=1)
    attaque:       1 + a.force * 1,                  // dégâts d'auto-attaque
    defense:       a.defense,                        // réduction PLATE des dégâts (−1/pt)
    penetration:   a.force * 0.15,                   // ignore X points d'armure (plat)
    regenHors:     a.force * 0.1,                    // PV/s HORS combat (consommables/attente)
    vitesse:       1 + a.agilite * 0.03,             // remplissage Tempo
    critDmg:       150 + a.agilite * 2,              // %
    esquive:       a.agilite * 0.5,                  // %
    crit:          5 + a.chance * 1,                 // %
    rarete:        a.chance * 1,                     // % qualité du butin
    bonusOr:       a.chance * 0.8,                   // %
    precision:     90 + a.intelligence * 0.5,        // % chance de toucher
    resistance:    a.intelligence * 0.3,             // % réduction supplémentaire
    bonusXp:       a.intelligence * 1,               // %
    // Traits (thème Harmonie / Dissonance)
    harmonie:      a.intelligence * 0.5 + a.chance * 0.3,
    chanceNote:    25 + a.chance * 0.6,              // % apparition de bulles (Phase 3)
    resDissonance: a.defense * 0.2 + a.intelligence * 0.2, // % résist. Larry
  };
}

// Poids pour le Score de Puissance (agrégat global).
const POWER_W = {
  attaque: 3, defense: 2, penetration: 2, maxHp: 0.5, crit: 2, critDmg: 0.4,
  precision: 0.3, esquive: 2, resistance: 2, harmonie: 1, resDissonance: 1,
};

// ---- Stats dérivées = base(attributs) + bonus (flat puis pct) ----
export function derive(player = state.player) {
  const b = baseStats(player.attributes);
  const bon = player.bonuses || { flat: {}, pct: {} };
  const out = {};
  for (const k of Object.keys(b)) {
    const flat = (bon.flat && bon.flat[k]) || 0;
    const pct  = (bon.pct  && bon.pct[k])  || 0;
    out[k] = (b[k] + flat) * (1 + pct / 100);
  }
  out.maxHp = Math.round(out.maxHp);
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

// API console pour tester (voir aussi main.js -> window.Ascencia).
export const playerApi = { addXp, allocate, addAttribute, addResource, spendResource, damage, heal, derive, displayStats, formatStat, xpForLevel, ALLOCATABLE, ATTR_POINTS_PER_LEVEL };

// ===== Codex (Bestiaire) + Maîtrise (Phase 5) =====
// Le compteur de référence est state.monsterWins (illimité, y compris les boss —
// voir game/combat.js onWin). Aucune donnée persistée en plus : tout est dérivé.
import { state } from '../state.js';
import { ZONES, ATTRIBUTES } from '../config.js';
import { ENEMIES, BOSSES, familyMat } from './monsters.js';
import { ITEMS } from './items.js';

export const ATTR_LABEL = Object.fromEntries(ATTRIBUTES.map((a) => [a.key, a.label]));

// Paliers de déblocage d'une fiche Codex (kills du monstre concerné).
export const CODEX_TIERS = [
  { id: 'trouve',    kills: 50,   label: 'Trouvé dans' },
  { id: 'stats',     kills: 100,  label: 'Statistiques de Base' },
  { id: 'ressource', kills: 500,  label: 'Ressource Premium' },
  { id: 'bonus',     kills: 1000, label: 'Bonus' },
];

function allEntries() {
  const list = Object.values(ENEMIES).map((e) => ({ ...e, isBoss: false }));
  for (const b of BOSSES) list.push({ ...b, isBoss: true });
  return list;
}

export function codexEntry(id) {
  return allEntries().find((e) => e.id === id) || null;
}

// Univers "atteignable" actuellement (monstres + boss réellement branchés dans une Zone).
export function discoverableIds() {
  const ids = new Set();
  for (const z of ZONES) { for (const m of z.monsters) ids.add(m); if (z.boss) ids.add(z.boss); }
  return [...ids];
}

// Zone(s) où le monstre apparaît.
export function foundIn(id) {
  const names = [];
  for (const z of ZONES) {
    if (z.monsters.includes(id)) names.push(z.name);
    if (z.boss === id) names.push(`Boss · ${z.name}`);
  }
  return names;
}

// Attribut dominant d'un monstre (hors Vie, pour varier les récompenses) — sert au
// palier "Bonus" (1000 kills) : générique, s'applique à tout futur monstre sans curation.
const DOM_KEYS = ['force', 'agilite', 'intelligence', 'chance', 'defense'];
export function dominantAttr(attrs = {}) {
  let best = DOM_KEYS[0], bv = -1;
  for (const k of DOM_KEYS) { const v = attrs[k] || 0; if (v > bv) { bv = v; best = k; } }
  return best;
}

export const kills = (id, wins = state.monsterWins) => (wins && wins[id]) || 0;
export const tierDone = (id, killsReq, wins) => kills(id, wins) >= killsReq;

export function discoveredIds(wins = state.monsterWins) {
  return allEntries().map((e) => e.id).filter((id) => kills(id, wins) > 0);
}
export function masteredIds(wins = state.monsterWins) {
  return discoveredIds(wins).filter((id) => kills(id, wins) >= 1000);
}

// ---- Bonus permanents du Codex (dérivés à la volée, jamais stockés) ----
// 500 kills → +1% Trouvaille d'or (par monstre) ; 1000 kills → +1 à l'attribut dominant.
export function codexBonuses(wins = state.monsterWins) {
  const flat = {}, pct = {};
  for (const e of allEntries()) {
    const k = kills(e.id, wins);
    if (k >= 500) pct.bonusOr = (pct.bonusOr || 0) + 1;
    if (k >= 1000) { const d = dominantAttr(e.attrs || {}); flat[d] = (flat[d] || 0) + 1; }
  }
  return { flat, pct };
}

// Ressources associées à un monstre (matériau de famille + resourceLoot + loot d'objets).
export function resourceInfoFor(id) {
  const e = codexEntry(id);
  if (!e) return { lines: [] };
  const lines = [];
  const mat = familyMat(id);
  if (mat) { const mi = ITEMS[mat]; lines.push(`Matériau : ${mi ? mi.name : mat}`); }
  for (const [k, v] of Object.entries(e.resourceLoot || {})) lines.push(`${k} ×${v}`);
  for (const d of (e.loot || [])) { const it = ITEMS[d.tid]; lines.push(`${it ? it.name : d.tid} (${Math.round(d.chance * 100)}% de chance)`); }
  return { lines };
}

// ---- Maîtrise : 4 voies, paliers cumulatifs (chaque palier atteint reste actif) ----
const totalKills = (wins) => Object.values(wins || {}).reduce((s, v) => s + v, 0);
// Boss DIFFÉRENTS vaincus au moins 1 fois (pas le total de kills) : sinon on peut
// farmer le boss de zone 1 à l'infini pour remplir ce compteur. Seuils calés sur
// le nombre de boss existants dans BOSSES_GEN (5 pour l'instant).
const distinctBossKills = (wins) => BOSSES.filter((b) => kills(b.id, wins) > 0).length;

export const MASTERY_TRACKS = [
  {
    id: 'chasseur', name: 'Voie du Chasseur', icon: 'assets/sprites/classesicon/archer.png',
    desc: 'Progresse en tuant des monstres, tous types confondus.',
    counter: totalKills,
    tiers: [
      { req: 300,   label: 'Apprenti Chasseur',    reward: { flat: { force: 2 } },                          txt: '+2 Force' },
      { req: 2000,  label: 'Chasseur Aguerri',     reward: { pct: { attaque: 3 } },                         txt: '+3% Dégâts' },
      { req: 10000, label: 'Fléau des Bêtes',      reward: { pct: { rarete: 5 } },                          txt: '+5% Qualité du butin' },
      { req: 50000, label: 'Instinct du Prédateur', reward: { flat: { force: 5 }, pct: { critDmg: 5 } },    txt: '+5 Force, +5% Dégâts Critiques' },
    ],
  },
  {
    id: 'veteran', name: 'Voie du Vétéran', icon: 'assets/sprites/classesicon/guerrier.png',
    desc: 'Progresse en vainquant des boss différents (chaque espèce ne compte qu\'une fois — pas de farm).',
    counter: distinctBossKills,
    tiers: [
      { req: 1, label: 'Survivant',       reward: { flat: { vie: 2 } },                                txt: '+2 Vie' },
      { req: 2, label: 'Peau de Pierre',  reward: { pct: { resistance: 3 } },                          txt: '+3% Résistance aux dégâts' },
      { req: 3, label: 'Brise-Titans',    reward: { flat: { defense: 2 } },                            txt: '+2 Défense' },
      { req: 5, label: 'Cœur du Vétéran', reward: { flat: { vie: 5 }, pct: { resistance: 5 } },        txt: '+5 Vie, +5% Résistance' },
    ],
  },
  {
    id: 'naturaliste', name: 'Voie du Naturaliste', icon: 'assets/sprites/icons/naturaliste.png',
    desc: 'Progresse en découvrant de nouvelles espèces (Codex).',
    counter: (wins) => discoveredIds(wins).length,
    tiers: [
      { req: 3,  label: 'Connaisseur',        reward: { flat: { intelligence: 2 } },                     txt: '+2 Intelligence' },
      { req: 8,  label: 'Œil Analytique',     reward: { pct: { bonusXp: 5 } },                            txt: "+5% Gain d'XP" },
      { req: 15, label: 'Cartographe',        reward: { pct: { chanceNote: 2 } },                         txt: '+2% Chance de note' },
      { req: 25, label: 'Naturaliste Émérite', reward: { flat: { intelligence: 5 }, pct: { bonusXp: 5 } }, txt: "+5 Intelligence, +5% XP" },
    ],
  },
  {
    id: 'bestiaire', name: 'Voie du Bestiaire', icon: 'assets/sprites/icons/bestiaire.png',
    desc: 'Progresse en maîtrisant des espèces (1000 kills chacune).',
    counter: (wins) => masteredIds(wins).length,
    tiers: [
      { req: 1,  label: 'Spécialiste',     reward: { flat: { chance: 2 } },                              txt: '+2 Chance' },
      { req: 3,  label: "Maître d'Armes",  reward: { pct: { bonusOr: 5 } },                               txt: "+5% Trouvaille d'or" },
      { req: 6,  label: 'Grand Bestiaire', reward: { pct: { rarete: 5 } },                                txt: '+5% Qualité du butin' },
      { req: 12, label: 'Légende Vivante', reward: { flat: { vie: 3, force: 3, agilite: 3, chance: 3, intelligence: 3 } }, txt: '+3 à tous les attributs' },
    ],
  },
];

export function masteryBonuses(wins = state.monsterWins) {
  const flat = {}, pct = {};
  for (const t of MASTERY_TRACKS) {
    const c = t.counter(wins);
    for (const tier of t.tiers) {
      if (c < tier.req) continue;
      for (const [k, v] of Object.entries(tier.reward.flat || {})) flat[k] = (flat[k] || 0) + v;
      for (const [k, v] of Object.entries(tier.reward.pct || {})) pct[k] = (pct[k] || 0) + v;
    }
  }
  return { flat, pct };
}

export const codexApi = { codexEntry, discoverableIds, foundIn, dominantAttr, kills, discoveredIds, masteredIds, codexBonuses, resourceInfoFor, MASTERY_TRACKS, masteryBonuses, CODEX_TIERS, ATTR_LABEL };

// ===== Monstres : dérivation des stats depuis les attributs + loot (Phase 5) =====
// Données brutes auto-générées depuis le legacy (js/data/enemies.gen.js).
// Stats ennemi = attributs → PV=Vie, Attaque=Force, Défense=Défense (modèle legacy).
import { state, setState } from '../state.js';
import { ENEMIES_GEN, BOSSES_GEN } from '../data/enemies.gen.js';

export const ENEMIES = ENEMIES_GEN;
export const BOSSES = BOSSES_GEN;
const sq = Math.sqrt;

// Matériau signature par famille de monstre (ressource spécifique).
const MAT_BY_FAMILY = [
  [/gobelin/, 'peau_de_gobelin'],
  [/rat/, 'queue_de_rat'],
  [/araignee|insecte|scorpion/, 'soie_araignee'],
  [/loup/, 'croc_de_loup'],
  [/sanglier/, 'defense_sanglier'],
  [/slime|gelee/, 'gelee_de_slime'],
];
const familyMat = (id) => { for (const [re, mat] of MAT_BY_FAMILY) if (re.test(id)) return mat; return null; };

// Stats de combat dérivées des attributs d'un ennemi.
export function deriveEnemy(attrs = {}, crit = 0) {
  return {
    hp:      Math.max(1, Math.round(attrs.vie || 1)),
    attaque: Math.max(1, Math.round(attrs.force || 1)),
    defense: Math.round(attrs.defense || 0),
    crit:    crit || +(3.75 * sq(attrs.chance || 0)).toFixed(1),
    esquive: +(0.15 * sq(attrs.agilite || 0)).toFixed(1),
    tempo:   Math.min(1.5, Math.max(0.6, 0.8 + (attrs.agilite || 0) * 0.01)),
  };
}

function build(e, scale, isBoss) {
  const d = deriveEnemy(e.attrs, e.crit);
  return {
    id: e.id, name: e.name, sprite: e.sprite, isBoss: !!isBoss,
    hp:      Math.max(1, Math.round(d.hp * scale)),
    attaque: Math.max(1, Math.round(d.attaque * scale)),
    defense: Math.round(d.defense * scale),
    crit: d.crit, esquive: d.esquive, tempo: d.tempo,
    xp:   Math.max(1, Math.round((e.xp || 1) * scale)),
    gold: Math.max(1, Math.round((e.xp || 1) * 0.5 * scale)),
    _loot: e.loot || [], _resLoot: e.resourceLoot || {}, _mat: familyMat(e.id),
  };
}

// Monstre prêt au combat depuis un id (scale = facteur d'équilibrage de zone).
export function makeMonster(enemyId, scale = 1) {
  const e = ENEMIES[enemyId];
  return e ? build(e, scale, false) : null;
}
export function makeBoss(bossId, scale = 1) {
  const b = BOSSES.find((x) => x.id === bossId);
  return b ? build(b, scale, true) : null;
}

// Butin à la victoire : ressources garanties + drops d'items + matériau de famille + or.
export function rollLoot(monster) {
  const drops = [];
  for (const d of (monster._loot || [])) {
    if (Math.random() <= d.chance) {
      const n = d.min + Math.floor(Math.random() * (d.max - d.min + 1));
      if (n > 0) drops.push({ tid: d.tid, n });
    }
  }
  if (monster._mat && Math.random() < 0.5) drops.push({ tid: monster._mat, n: 1 + Math.floor(Math.random() * 2) });

  setState((s) => {
    for (const [k, v] of Object.entries(monster._resLoot || {})) s.resources[k] = (s.resources[k] || 0) + v;
    if (monster.gold) s.resources.or = (s.resources.or || 0) + monster.gold;
    for (const d of drops) {
      const st = s.inventory.find((x) => x.tid === d.tid);
      if (st) st.count += d.n; else s.inventory.push({ tid: d.tid, count: d.n });
    }
  });
  return { drops, res: monster._resLoot || {} };
}

export const monstersApi = { ENEMIES, BOSSES, makeMonster, makeBoss, deriveEnemy, rollLoot };

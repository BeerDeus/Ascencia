// ===== Monstres : dérivation des stats depuis les attributs + loot (Phase 5) =====
// Données brutes auto-générées depuis le legacy (js/data/enemies.gen.js).
// Stats ennemi = attributs → PV=Vie, Attaque=Force, Défense=Défense (modèle legacy).
import { state, setState } from '../state.js';
import { SETTINGS, ZONES } from '../config.js';
import { ENEMIES_GEN, BOSSES_GEN } from '../data/enemies.gen.js';
import { tryAddItem, inventoryCapacity } from './items.js';

export const ENEMIES = ENEMIES_GEN;
export const BOSSES = BOSSES_GEN;
const sq = Math.sqrt;

// ---- Rolls PV/Dégâts (plage propre à chaque monstre) ----
// Variance dérivée du `scale` de la zone (progression) : ±8% en zone facile jusqu'à
// ±30% en zone difficile. Les boss sont plus stables (×0.6) pour rester équitables.
export function varianceFor(scale, isBoss) {
  const v = Math.min(0.30, 0.08 + (scale || 1) * 0.22);
  return isBoss ? v * 0.6 : v;
}
export function statRange(base, variance) {
  const lo = Math.max(1, Math.round(base * (1 - variance)));
  const hi = Math.max(lo, Math.round(base * (1 + variance)));
  return [lo, hi];
}
const rollInRange = ([lo, hi]) => lo + Math.floor(Math.random() * (hi - lo + 1));

// Plage affichable (Codex) pour un monstre donné, à partir de la zone où il apparaît.
export function statRangeFor(id) {
  const e = ENEMIES[id] || BOSSES.find((b) => b.id === id);
  if (!e) return null;
  let scale = 1, isBoss = BOSSES.some((b) => b.id === id);
  for (const z of ZONES) {
    if (z.monsters.includes(id)) { scale = z.scale; isBoss = false; break; }
    if (z.boss === id) { scale = z.scale; isBoss = true; break; }
  }
  const d = deriveEnemy(e.attrs, e.crit);
  const variance = varianceFor(scale, isBoss);
  return {
    hp: statRange(d.hp * scale, variance),
    atk: statRange(d.attaque * scale, variance),
    defense: Math.round(d.defense * scale),
    tempo: d.tempo,
  };
}

// Matériau signature par famille de monstre (ressource spécifique).
const MAT_BY_FAMILY = [
  [/gobelin/, 'peau_de_gobelin'],
  [/rat/, 'queue_de_rat'],
  [/araignee|insecte|scorpion/, 'soie_araignee'],
  [/loup/, 'croc_de_loup'],
  [/sanglier/, 'defense_sanglier'],
  [/slime|gelee/, 'gelee_de_slime'],
];
export const familyMat = (id) => { for (const [re, mat] of MAT_BY_FAMILY) if (re.test(id)) return mat; return null; };

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
  const variance = varianceFor(scale, isBoss);
  const hpRange = statRange(d.hp * scale, variance);
  const atkRange = statRange(d.attaque * scale, variance);
  return {
    id: e.id, name: e.name, sprite: e.sprite, isBoss: !!isBoss,
    hp:      rollInRange(hpRange),
    attaque: rollInRange(atkRange),
    defense: Math.round(d.defense * scale),
    crit: d.crit, esquive: d.esquive, tempo: d.tempo,
    xp:   Math.max(1, Math.round((e.xp || 1) * scale)),
    gold: Math.max(1, Math.round((e.xp || 1) * 0.5 * scale)),
    // Copies (jamais les tableaux/objets d'ENEMIES_GEN directement) : un affixe de
    // Larry (voir applyLarryAffix ci-dessous) mute _loot/_resLoot du monstre — sans
    // clone ici, ça corromprait la donnée générée partagée par tous les spawns futurs.
    _loot: [...(e.loot || [])], _resLoot: { ...(e.resourceLoot || {}) }, _mat: familyMat(e.id),
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

// ---- Instabilité de Larry (affixes aléatoires — Cahier des Charges §7) ----
// SETTINGS.larryChance (10%) de chances qu'un monstre RÉGULIER (jamais les boss —
// on ne bloque pas une progression de zone derrière un coup de malchance) apparaisse
// sous une variante corrompue par Larry : stats altérées, butin de Dissonance en plus.
// Le roll se fait à chaque lancement de combat (voir combat.js start()), jamais à
// l'affichage de la carte Zone (game/monsters.js n'y touche pas) — un même monstre
// peut donc être normal une fois puis corrompu la suivante.
export const LARRY_AFFIXES = [
  {
    id: 'dissonant', label: 'Dissonant',
    desc: 'Statistiques et résistance accrues, butin de Dissonance renforcé.',
    apply(m) {
      m.hp = Math.round(m.hp * 1.35);
      m.attaque = Math.round(m.attaque * 1.2);
      m.defense = Math.round(m.defense * 1.5) + 2;
      m.xp = Math.round(m.xp * 1.3);
      m.gold = Math.round(m.gold * 1.3);
      m._resLoot.fragments = (m._resLoot.fragments || 0) + 1 + Math.floor(Math.random() * 2);
      m._loot.push({ tid: 'essence_dissonante', chance: 1, min: 1, max: 1 });
    },
  },
  {
    id: 'zebre', label: 'Zébré',
    desc: 'Tempo erratique et esquive accrue — combat imprévisible.',
    apply(m) {
      m.tempo = Math.min(2.2, m.tempo * (1.4 + Math.random() * 0.4));
      m.esquive = (m.esquive || 0) + 12;
      m.xp = Math.round(m.xp * 1.15);
      m.gold = Math.round(m.gold * 1.15);
      m._resLoot.fragments = (m._resLoot.fragments || 0) + 1;
    },
  },
  {
    id: 'instable', label: 'Instable',
    desc: 'Frappe très fort mais encaisse mal — combat court et risqué.',
    apply(m) {
      m.attaque = Math.round(m.attaque * 1.6);
      m.crit = (m.crit || 0) + 15;
      m.hp = Math.round(m.hp * 0.7);
      m.xp = Math.round(m.xp * 1.25);
      m.gold = Math.round(m.gold * 1.25);
      m._resLoot.fragments = (m._resLoot.fragments || 0) + 2;
      m._loot.push({ tid: 'eclats_instables', chance: 1, min: 1, max: 1 });
    },
  },
];

export function rollLarryAffix() {
  return Math.random() < SETTINGS.larryChance ? LARRY_AFFIXES[Math.floor(Math.random() * LARRY_AFFIXES.length)] : null;
}
// Mute le monstre en place (nom suffixé, stats/loot ajustés) — appelé une seule
// fois par combat, sur un monstre déjà "frais" (voir combat.js start()).
export function applyLarryAffix(monster, affix) {
  affix.apply(monster);
  monster.name = `${monster.name} ${affix.label}`;
  monster.larryAffix = affix.id;
  monster.larryLabel = affix.label;
  return monster;
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

  // Sac plein → l'objet dropé est perdu (tryAddItem renvoie false, aucune pile
  // n'est créée) ; empiler sur un stack déjà existant reste toujours possible.
  const lost = [];
  setState((s) => {
    for (const [k, v] of Object.entries(monster._resLoot || {})) s.resources[k] = (s.resources[k] || 0) + v;
    if (monster.gold) s.resources.or = (s.resources.or || 0) + monster.gold;
    for (const d of drops) { if (!tryAddItem(s.inventory, d.tid, d.n, inventoryCapacity(s))) lost.push(d); }
  });
  return { drops, res: monster._resLoot || {}, lost };
}

export const monstersApi = { ENEMIES, BOSSES, makeMonster, makeBoss, deriveEnemy, rollLoot, statRangeFor, LARRY_AFFIXES, rollLarryAffix, applyLarryAffix };

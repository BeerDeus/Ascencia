// ===== Constellations (Ascension / Prestige, Phase 6) =====
// Inspiré de _legacy/db.0.9.0.js (CONSTELLATIONS_DB, un arbre par CLASSE). Ascencia
// n'a plus de classes : on garde l'esprit (chaîne de nodes à coût croissant, paliers
// "majeurs" qui débloquent quelque chose plutôt qu'un simple %) mais réorganisé en 4
// branches THÉMATIQUES + un tronc commun + un capstone final. Généré ici par une
// petite fonction plutôt que tapé à la main node par node (même logique que
// items.gen.js pour le catalogue Forge) — pour retoucher le contenu, modifie les
// POOLS/constantes ci-dessous plutôt que les objets individuels.
//
// Gating de rareté Forge (voir game/ascension.js isRarityUnlocked, views/village.js) :
// avant toute Ascension seule la rareté "common" est craftable. Le tronc commun
// débloque "uncommon" (prérequis obligatoire pour investir n'importe où dans l'arbre).
// Les rareté suivantes sont réparties DANS chaque branche (pas en bout de chaîne, pour
// ne pas forcer à finir toute une branche) MAIS chaînées entre elles en CROISÉ : le
// node "epic" (Dissonance) dépend du node "rare" (Harmonie), "legendary" (Résonance)
// dépend d'"epic", "mythic" (Écho) dépend de "legendary" — impossible de sauter un
// palier de rareté même en rushant une seule branche. Le capstone débloque "special".
import { ATTRIBUTES, STATS } from '../config.js';

export const RARITY_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'special'];

// Libellés/icônes réutilisés depuis les catalogues existants (Profil) — une seule
// source de vérité pour ne pas dupliquer les textes FR à chaque nouveau node.
const LABEL = {}, ICON = {};
for (const a of ATTRIBUTES) { LABEL[a.key] = a.label; ICON[a.key] = a.icon; }
for (const s of STATS) { LABEL[s.key] = s.label; ICON[s.key] = s.icon; }
LABEL.maxHp = 'PV Max';
ICON.maxHp = 'assets/sprites/icons/vie_alt.png';

const GEM_ICON = 'assets/sprites/ressources/gemme_verte.png'; // déjà utilisée pour "Qualité du butin" — un node de rareté, c'est littéralement ça

// ---- Définition des 4 branches (pools de stats + rareté débloquée + angle du viewport) ----
// angleDeg : degrés depuis la verticale (0 = plein haut), sens horaire. Les 4 branches
// s'ouvrent en éventail vers le haut depuis le tronc (voir views/ascension.js, viewport
// pannable au doigt) — le capstone continue dans l'axe vertical (angle 0) au-delà de
// toutes les branches, indépendamment de sa dépendance réelle (echo_08).
const BRANCH_DEFS = [
  {
    id: 'harmonie', name: 'Harmonie', rarity: 'rare', crossDep: null, angleDeg: -65,
    icon: 'assets/sprites/icons/harmonie.png',
    desc: 'Voie offensive — dégâts, critique, vitesse de frappe.',
    pctPool: ['attaque', 'crit', 'critDmg', 'vitesse', 'penetration'],
    flatPool: ['force', 'agilite'],
  },
  {
    id: 'dissonance', name: 'Dissonance', rarity: 'epic', crossDep: 'harmonie_08', angleDeg: -22,
    icon: 'assets/sprites/icons/dissonance.png',
    desc: 'Voie de survie — PV, défense, résistance aux dégâts.',
    pctPool: ['maxHp', 'esquive', 'resistance', 'resDissonance'],
    flatPool: ['vie', 'defense'],
  },
  {
    id: 'resonance', name: 'Résonance', rarity: 'legendary', crossDep: 'dissonance_08', angleDeg: 22,
    icon: 'assets/sprites/icons/stamina.png',
    desc: 'Voie utilitaire — butin, or, XP, notes de Symphonie.',
    pctPool: ['bonusOr', 'rarete', 'bonusXp', 'chanceNote'],
    flatPool: ['chance', 'intelligence'],
  },
  {
    id: 'echo', name: 'Écho', rarity: 'mythic', crossDep: 'resonance_08', angleDeg: 65,
    icon: 'assets/sprites/icons/amelioration.png',
    desc: 'Voie méta — ce qui survit à la prochaine Ascension.',
    pctPool: ['bonusXp', 'rarete'],
    flatPool: ['chance', 'intelligence'],
  },
];

// ---- Layout du viewport (coordonnées relatives à l'origine = le tronc, en px) ----
const RADIUS_BASE = 90, RADIUS_STEP = 58, LANE_OFFSET = 30;
function computePos(angleDeg, depth, lane = 0) {
  const rad = angleDeg * Math.PI / 180;
  const radius = RADIUS_BASE + depth * RADIUS_STEP;
  const perp = angleDeg + 90;
  const perpRad = perp * Math.PI / 180;
  const x = Math.sin(rad) * radius + Math.sin(perpRad) * (lane * LANE_OFFSET);
  const y = -Math.cos(rad) * radius - Math.cos(perpRad) * (lane * LANE_OFFSET);
  return { x: Math.round(x), y: Math.round(y) };
}

const RARITY_GATE_LABEL = {
  uncommon: 'Éveil de la Forge', rare: 'Souffle Harmonique', epic: 'Fracture Dissonante',
  legendary: 'Convergence Résonante', mythic: 'Sceau Ancestral', special: 'Apothéose',
};
const RARITY_GATE_DESC = {
  uncommon: 'Débloque le craft en rareté Peu Commune à la Forge.',
  rare: 'Débloque le craft en rareté Rare à la Forge.',
  epic: 'Débloque le craft en rareté Épique à la Forge.',
  legendary: 'Débloque le craft en rareté Légendaire à la Forge.',
  mythic: 'Débloque le craft en rareté Mythique à la Forge.',
  special: 'Débloque le craft en rareté Spéciale à la Forge.',
};

// ---- Nodes spéciaux Écho (déblocages fonctionnels / méta, pas de simple %) ----
// Valeurs = PAR NIVEAU investi (maxLevel 3 → jusqu'à ×3 à plein). Appliqués dans
// game/ascension.js ascend() (constellationBonuses().special).
const ECHO_SPECIALS = {
  5:  {
    id: 'starting_resources', label: 'Legs du Prestige',
    desc: '+15% de ressources de départ (or/bois/métal/tissu) par niveau, après chaque Ascension.',
    icon: 'assets/sprites/objets/piece_or.png', key: 'startingResourcePct', perLevel: 15,
  },
  12: {
    id: 'ascension_gain', label: 'Sillage Ascensionnel',
    desc: '+8% de points de Constellation gagnés par niveau, à la prochaine Ascension.',
    icon: 'assets/sprites/icons/next_floor.png', key: 'ascensionGainPct', perLevel: 8,
  },
  18: {
    id: 'bag_base', label: 'Sac Ancestral',
    desc: '+4 emplacements de sac de base par niveau, conservés après Ascension.',
    icon: 'assets/sprites/objets/sac_a_dos.png', key: 'bagBaseBonus', perLevel: 4,
  },
};

const pad = (n) => String(n).padStart(2, '0');

function statNode(def, i, statKey, poolKind) {
  const depth = i;
  const isKeystone = i % 4 === 0;
  const maxLevel = isKeystone ? 1 : 3;
  const baseCost = 1 + Math.floor(depth / 3);
  const cost = Array.from({ length: maxLevel }, (_, lvl) => baseCost + lvl);
  const perLevel = poolKind === 'pct' ? (isKeystone ? 4 : 1.5) : (isKeystone ? 3 : 1);
  const label = LABEL[statKey] || statKey;
  return {
    id: `${def.id}_${pad(i)}`, branch: def.id, depth, lane: i % 3 === 0 ? 1 : i % 3 === 1 ? -1 : 0,
    kind: isKeystone ? 'major' : 'minor',
    label: `${isKeystone ? 'Éclat' : 'Étoile'} — ${label}`,
    desc: `+${perLevel}${poolKind === 'pct' ? '%' : ''} ${label} par niveau (max ${maxLevel}).`,
    icon: ICON[statKey] || def.icon,
    maxLevel, cost,
    dependencies: [i === 1 ? 'trunk_uncommon' : `${def.id}_${pad(i - 1)}`],
    bonus: poolKind === 'pct' ? { pct: { [statKey]: perLevel } } : { flat: { [statKey]: perLevel } },
  };
}

function specialNode(def, i, spec) {
  const depth = i;
  return {
    id: `${def.id}_${pad(i)}`, branch: def.id, depth, lane: i % 3 === 0 ? 1 : i % 3 === 1 ? -1 : 0,
    kind: 'special',
    label: spec.label, desc: spec.desc, icon: spec.icon,
    maxLevel: 3, cost: [4, 6, 9],
    dependencies: [`${def.id}_${pad(i - 1)}`],
    bonus: { special: { [spec.key]: spec.perLevel } },
  };
}

function rarityNode(def, i) {
  const depth = i;
  const prevId = `${def.id}_${pad(i - 1)}`;
  const dependencies = def.crossDep ? [prevId, def.crossDep] : [prevId];
  return {
    id: `${def.id}_${pad(i)}`, branch: def.id, depth, lane: 0, kind: 'rarity',
    label: RARITY_GATE_LABEL[def.rarity], desc: RARITY_GATE_DESC[def.rarity],
    icon: GEM_ICON, maxLevel: 1, cost: [8 + Math.floor(depth / 2)],
    dependencies, unlockRarity: def.rarity,
  };
}

// Remplace l'ancienne jauge de rareté "Rare" (branche Harmonie uniquement — voir
// buildBranch ci-dessous) depuis le rééquilibrage du 2026-07-17 : le Rare est
// désormais auto-débloqué à la 1ère Ascension (game/ascension.js unlockedRarities),
// donc ce point de Constellation ne doit plus être "gaspillé" sur un simple
// déverrouillage. Cible directement le goulot d'étranglement identifié dans
// rapport_difficulte_zone10.md §4 (Pénétration/Défense qui ne suivent pas le
// `scale` linéaire des zones) plutôt qu'un bonus générique de plus. Même coût que
// l'ancienne jauge (12, cf. rarityNode) et même id (`harmonie_08`) — les nœuds des
// autres branches qui en dépendent en croisé (dissonance_08 via crossDep) n'ont
// besoin de rien d'autre pour continuer à fonctionner.
function armorPierceNode(def, i) {
  const depth = i;
  return {
    id: `${def.id}_${pad(i)}`, branch: def.id, depth, lane: 0, kind: 'major',
    label: 'Éclat — Perce-Armure',
    desc: '+2 Pénétration d\'armure et +2 Défense (max 1).',
    icon: ICON.penetration || GEM_ICON,
    maxLevel: 1, cost: [8 + Math.floor(depth / 2)],
    dependencies: [`${def.id}_${pad(i - 1)}`],
    bonus: { flat: { penetration: 2, defense: 2 } },
  };
}

function buildBranch(def) {
  const nodes = [];
  for (let i = 1; i <= 20; i++) {
    if (i === 8) {
      // Seule la branche Harmonie portait la jauge "Rare" (voir BRANCH_DEFS) — les
      // 3 autres (Épique/Légendaire/Mythique) restent des rarityNode classiques.
      if (def.rarity === 'rare') { nodes.push(armorPierceNode(def, i)); continue; }
      nodes.push(rarityNode(def, i)); continue;
    }
    const echoSpecial = def.id === 'echo' ? ECHO_SPECIALS[i] : null;
    if (echoSpecial) { nodes.push(specialNode(def, i, echoSpecial)); continue; }
    const poolKind = i % 2 === 0 ? 'pct' : 'flat';
    const pool = poolKind === 'pct' ? def.pctPool : def.flatPool;
    const statKey = pool[Math.floor(i / 2) % pool.length];
    nodes.push(statNode(def, i, statKey, poolKind));
  }
  for (const n of nodes) n.pos = computePos(def.angleDeg, n.depth, n.lane);
  return nodes;
}

// Gratuit depuis le 2026-07-17 (voir rapport_difficulte_zone10.md) : le Peu Commun est
// désormais débloqué dès le début (game/ascension.js unlockedRarities), donc ce nœud ne
// "déverrouille" plus rien — il reste le prérequis structurel obligatoire de tout
// l'arbre (chaque branche en dépend), mais ne doit plus taxer le tout premier point
// gagné par le joueur. Conserve un petit bonus direct (+1 Défense) pour que le clic
// reste un vrai gain, pas juste un rituel de démarrage.
const TRUNK = {
  id: 'trunk_uncommon', branch: 'trunk', depth: 0, lane: 0, kind: 'start', pos: { x: 0, y: 0 },
  label: 'Éveil de la Forge', desc: "Ouvre l'arbre des Constellations. Gratuit — le Peu Commun est débloqué dès le début, et le Rare s'ouvre automatiquement à la 1ère Ascension.",
  icon: 'assets/sprites/icons/start.png', maxLevel: 1, cost: [0], dependencies: [],
  bonus: { flat: { defense: 1 } },
};

const CAPSTONE = {
  id: 'capstone_special', branch: 'capstone', depth: 21, lane: 0, kind: 'capstone', pos: computePos(0, 21, 0),
  label: RARITY_GATE_LABEL.special, desc: RARITY_GATE_DESC.special + ' +8% à toutes les statistiques de combat majeures.',
  icon: 'assets/sprites/icons/complete.png', maxLevel: 1, cost: [30], dependencies: ['echo_08'], unlockRarity: 'special',
  bonus: { pct: { attaque: 8, defense: 8, crit: 8, critDmg: 8, esquive: 8, resistance: 8, vitesse: 8, maxHp: 8 } },
};

export const BRANCHES = BRANCH_DEFS.map((d) => ({ id: d.id, name: d.name, icon: d.icon, desc: d.desc, rarity: d.rarity }));

export const CONSTELLATIONS = {
  trunk: [TRUNK],
  harmonie: buildBranch(BRANCH_DEFS[0]),
  dissonance: buildBranch(BRANCH_DEFS[1]),
  resonance: buildBranch(BRANCH_DEFS[2]),
  echo: buildBranch(BRANCH_DEFS[3]),
  capstone: [CAPSTONE],
};

export const ALL_NODES = Object.values(CONSTELLATIONS).flat();
export const nodeById = (id) => ALL_NODES.find((n) => n.id === id);
export const RARITY_UNLOCK_NODES = ALL_NODES.filter((n) => n.unlockRarity);

export const constellationsDataApi = { RARITY_ORDER, BRANCHES, CONSTELLATIONS, ALL_NODES, nodeById, RARITY_UNLOCK_NODES };

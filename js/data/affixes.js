// ===== Pool d'Affixes de l'Enchanteur (Phase 9+, refonte du 2026-07-16, ajustée le
// 2026-07-17, stats secondaires ajoutées le 2026-07-17) =====
// Système à 2 rolls façon loot aléatoire (inspiré d'AFFIX_DB, _legacy/db.0.9.0.js
// lignes 3883-4170) :
//   Roll 1 (affixe)      → une clé tirée dans AFFIX_POOL[kind] + une rareté pondérée
//                           par RARITY_WEIGHT, PLAFONNÉE par la rareté de l'OBJET
//                           équipé (un objet 'common' ne peut jamais rouler un
//                           affixe 'mythic').
//   Roll 2 (chance note) → une rareté tirée INDÉPENDAMMENT du roll 1, plafonnée à
//                           rareté de l'objet + NOTE_RARITY_HEADROOM paliers (2 par
//                           défaut) : un objet 'common' peut donc rouler une chance
//                           de note de rareté 'rare'. La chance de note doit rester
//                           intéressante même sur du matériel de base, contrairement
//                           aux stats d'affixe (qui doivent justifier de looter/crafter
//                           mieux).
// Les DEUX rolls piochent leur valeur dans la MÊME table d'échelle (RARITY_ROLL_RANGE,
// un [min,max] par palier — jamais une valeur fixe) : roll 1 en fait un budget de
// points d'attribut (splitBudget), roll 2 en fait directement un %.
//
// ---- Stats secondaires (2026-07-17) ----
// Comme AFFIX_DB legacy, un affixe peut porter une STAT SECONDAIRE en plus de son
// attribut primaire — mais elle ne roule qu'à partir d'un certain palier de rareté
// (`secondary.from`, quasi-systématiquement 'rare' dans legacy, repris tel quel ici
// pour rester simple : sous 'rare', un affixe ne donne QUE son attribut primaire).
// Contrairement à legacy qui saisit un [min,max] par PALIER x PAR AFFIXE (6 tiers x
// 54 affixes), la fourchette de chaque stat secondaire est saisie UNE FOIS par STAT
// (SECONDARY_STATS ci-dessous, 4 paliers rare→mythic — pas commun/peu commun, ils
// n'y ont jamais accès) et réutilisée par tous les affixes qui la portent. Écart
// assumé (moins de saisie manuelle) mais les ordres de grandeur sont repris tels
// quels depuis legacy quand le stat existait déjà là-bas (lifesteal, CritChance,
// CritDamage, armor_shred, stun_chance, xp_gain, resistance, debuff_resistance,
// healing_effectiveness, thorns, RegenHP, LootBonus).
//
// IMPORTANT — portée de cette passe : les stats secondaires sont ROULÉES, STOCKÉES
// (sur l'instance équipée, comme le reste de l'enchant) et AFFICHÉES (Enchanteur), et
// poussées dans player.bonuses.flat comme le reste (voir game/items.js
// recomputeBonuses()) — mais AUCUNE des 12 clés ci-dessous n'est encore LUE par
// game/player.js derive() ou game/combat.js. Elles n'ont donc aucun effet en jeu pour
// l'instant : la logique de combat (vol de vie qui soigne réellement, étourdissement
// qui saute un tour ennemi, épines qui renvoient des dégâts...) est la PROCHAINE tâche,
// explicitement mise de côté à la demande de l'utilisateur du 2026-07-17.
export const RARITIES = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
export const RARITY_LABEL = {
  common: 'Commun', uncommon: 'Peu commun', rare: 'Rare', epic: 'Épique', legendary: 'Légendaire', mythic: 'Mythique',
};
export const rarityIndex = (r) => Math.max(0, RARITIES.indexOf(r));

// Poids relatif de chaque palier au moment du roll (parmi les paliers <= plafond
// applicable) — plus c'est haut, plus c'est fréquent. Mêmes proportions que AFFIX_DB legacy.
export const RARITY_WEIGHT = { common: 100, uncommon: 70, rare: 45, epic: 25, legendary: 12, mythic: 5 };

// Paliers de rareté au-dessus de celle de l'objet que le roll 2 (chance de note) peut
// encore atteindre — voir game/items.js rollEnchant(). Le roll 1 (affixe, y compris sa
// stat secondaire) n'a PAS ce headroom, il reste strictement plafonné par la rareté
// de l'objet.
export const NOTE_RARITY_HEADROOM = 2;

// Fourchette [min, max] par palier — utilisée pour l'attribut primaire (roll 1, budget
// de points entier) ET la chance de note (roll 2, %, 1 décimale). "Pas toujours fix" —
// même un palier Rare varie (3 à 4, par ex.). common/uncommon restent à valeur unique
// ([x,x]) comme dans AFFIX_DB legacy (la variance n'y apparaît qu'à partir de rare) ;
// 8 emplacements non-arme enchantables × 12% (haut de la fourchette mythic) = 96,
// plafonné à 95 (ENCHANT_NOTE_CHANCE_CAP) — jamais 100%, même full mythique partout.
export const RARITY_ROLL_RANGE = {
  common: [1, 1], uncommon: [2, 2], rare: [3, 4], epic: [5, 6], legendary: [7, 9], mythic: [10, 12],
};

// Catalogue des stats secondaires (roll 1, à partir de 'rare' seulement) — fmt pilote
// le formatage d'affichage (voir formatSecondary ci-dessous) : 'pct' = %, 'flat' =
// nombre brut, 'perSec' = valeur/seconde. Ranges repris des ordres de grandeur AFFIX_DB
// (voir en-tête de fichier) là où la stat y existait déjà.
export const SECONDARY_STATS = {
  vol_vie:           { label: 'Vol de Vie',                  fmt: 'pct',    range: { rare: [0.5, 0.8], epic: [0.9, 1.4],  legendary: [1.5, 2.2],  mythic: [2.5, 3.5] } },
  crit_bonus:        { label: 'Critique (bonus)',            fmt: 'pct',    range: { rare: [0.5, 1.0], epic: [1.1, 1.8],  legendary: [1.9, 2.8],  mythic: [3.0, 4.5] } },
  critdmg_bonus:     { label: 'Dégâts Critiques (bonus)',    fmt: 'pct',    range: { rare: [4, 7],     epic: [8, 12],     legendary: [13, 18],    mythic: [19, 25] } },
  perforation_bonus: { label: 'Perforation (bonus)',         fmt: 'pct',    range: { rare: [3.0, 5.0], epic: [5.5, 8.0],  legendary: [8.5, 12.0], mythic: [12.5, 18.0] } },
  etourdissement:    { label: 'Étourdissement',              fmt: 'pct',    range: { rare: [1.0, 1.5], epic: [1.6, 2.5],  legendary: [2.6, 4.0],  mythic: [4.5, 6.0] } },
  xp_bonus:          { label: 'XP (bonus)',                  fmt: 'pct',    range: { rare: [1.0, 1.5], epic: [1.6, 2.5],  legendary: [2.6, 4.0],  mythic: [4.5, 6.0] } },
  resistance_bonus:  { label: 'Résistance (bonus)',          fmt: 'pct',    range: { rare: [1.5, 2.0], epic: [2.1, 3.5],  legendary: [3.6, 5.0],  mythic: [5.5, 7.0] } },
  resist_alteration: { label: 'Résistance aux Altérations',  fmt: 'pct',    range: { rare: [2.0, 4.0], epic: [4.5, 7.0],  legendary: [7.5, 11.0], mythic: [11.5, 16.0] } },
  soin_bonus:        { label: 'Efficacité des Soins',        fmt: 'pct',    range: { rare: [3.0, 5.0], epic: [5.5, 8.0],  legendary: [8.5, 12.0], mythic: [12.5, 18.0] } },
  epines:            { label: 'Épines',                      fmt: 'flat',   range: { rare: [1, 2],     epic: [3, 4],      legendary: [5, 7],      mythic: [8, 12] } },
  regen_combat:      { label: 'Régénération en Combat',      fmt: 'perSec', range: { rare: [0.10, 0.10], epic: [0.15, 0.20], legendary: [0.21, 0.30], mythic: [0.35, 0.50] } },
  butin_bonus:       { label: 'Butin (bonus)',                fmt: 'pct',    range: { rare: [1.0, 2.0], epic: [2.1, 3.5],  legendary: [3.6, 5.0],  mythic: [5.5, 7.5] } },
};

// Tire une valeur dans une fourchette [min,max] (continue, pas juste les 2 bornes).
export function rollInRange([min, max], rng = Math.random) {
  return min + rng() * (max - min);
}

// Roule la stat secondaire d'un affixe (roll 1) si sa rareté atteint le seuil requis —
// null sinon (affixe sans secondaire, ou rareté insuffisante). `rarity` = la rareté du
// roll 1 (même palier que l'attribut primaire, PAS un roll séparé).
export function rollSecondary(def, rarity, rng = Math.random) {
  if (!def.secondary) return null;
  const stat = SECONDARY_STATS[def.secondary.key];
  if (!stat) return null;
  if (rarityIndex(rarity) < rarityIndex(def.secondary.from)) return null;
  const range = stat.range[rarity];
  if (!range) return null;
  const raw = rollInRange(range, rng);
  const value = stat.fmt === 'flat' ? Math.round(raw) : Math.round(raw * 100) / 100;
  return { key: def.secondary.key, label: stat.label, fmt: stat.fmt, value };
}

// Formate une stat secondaire rollée pour l'affichage (voir views/capitale.js).
export function formatSecondary(sec) {
  if (!sec) return '';
  if (sec.fmt === 'flat') return `+${sec.value} ${sec.label}`;
  if (sec.fmt === 'perSec') return `+${sec.value.toFixed(2)}/s ${sec.label}`;
  return `+${sec.value}% ${sec.label}`;
}

// Coût en fragments : ENCHANT_BASE_COST x RARITY_COST_MULT[objet] x GROWTH^rerollCount
// (voir game/items.js enchantCost()) — reprend les mêmes proportions que l'ancien
// ENCHANT_RARITY_MULT (pièces plus rares = plus chères à enchanter/reforger). Basé sur
// la rareté de l'OBJET (pas sur le roll), donc indépendant des rolls ci-dessus.
export const RARITY_COST_MULT = { common: 1, uncommon: 1.5, rare: 2.25, epic: 3.5, legendary: 5, mythic: 7.5 };

// Répartit un budget de points entier entre 1-2 attributs pondérés. Si le budget est
// trop petit pour toucher chaque attribut (ex: budget=1 sur un affixe à 2 attributs),
// on tire UN SEUL attribut (pondéré) plutôt que d'arrondir chacun vers le haut et
// dépasser le budget — garantit un total exact à chaque roll.
export function splitBudget(attrs, budget, rng = Math.random) {
  const entries = Object.entries(attrs);
  if (entries.length === 1 || budget < entries.length) {
    const totalW = entries.reduce((s, [, w]) => s + w, 0);
    let r = rng() * totalW, pick = entries[0][0];
    for (const [k, w] of entries) { if (r < w) { pick = k; break; } r -= w; }
    return { [pick]: budget };
  }
  const totalW = entries.reduce((s, [, w]) => s + w, 0);
  const out = {}; let assigned = 0;
  entries.forEach(([k, w], i) => {
    if (i === entries.length - 1) { out[k] = budget - assigned; return; }
    const v = Math.max(1, Math.round((budget * w) / totalW));
    out[k] = v; assigned += v;
  });
  return out;
}

// ---- Pool par emplacement (9 kinds, mêmes que GEAR_KINDS — voir game/items.js) ----
// attrs : { attributKey: poids } — poids relatifs utilisés par splitBudget() pour les
// affixes à 2 attributs ; un seul attribut = poids ignoré (tout le budget dessus).
// Attributs valides : vie, force, agilite, chance, intelligence, defense (ATTR_KEYS).
// secondary (optionnel) : { key: clé SECONDARY_STATS, from: palier minimum } — voir
// rollSecondary() ci-dessus. Beaucoup d'affixes n'en ont pas (comme dans legacy où
// 'ethere'/'du_colosse'/'de_frappe' etc. ne scalent QUE leur attribut primaire).
export const AFFIX_POOL = {
  arme: [
    { key: 'sangsue',        name: 'Sangsue',         attrs: { vie: 1 },              secondary: { key: 'vol_vie',     from: 'rare' } },
    { key: 'feroce',         name: 'Féroce',          attrs: { force: 1 },            secondary: { key: 'crit_bonus',  from: 'rare' } },
    { key: 'ethere',         name: 'Éthéré',          attrs: { intelligence: 1 } },
    { key: 'preste',         name: 'Preste',          attrs: { agilite: 1 } },
    { key: 'chanceux',       name: 'Chanceux',        attrs: { chance: 1 },           secondary: { key: 'butin_bonus', from: 'rare' } },
    { key: 'du_conquerant',  name: 'du Conquérant',   attrs: { force: 1, agilite: 1 } },
  ],
  tete: [
    { key: 'du_sage',        name: 'du Sage',         attrs: { intelligence: 1 },     secondary: { key: 'xp_bonus',          from: 'rare' } },
    { key: 'de_laigle',      name: "de l'Aigle",      attrs: { agilite: 1 },          secondary: { key: 'crit_bonus',        from: 'rare' } },
    { key: 'du_penseur',     name: 'du Penseur',      attrs: { intelligence: 1 } },
    { key: 'de_clairvoyance',name: 'de Clairvoyance', attrs: { chance: 1 },           secondary: { key: 'butin_bonus',       from: 'rare' } },
    { key: 'dimpassibilite', name: "d'Impassibilité", attrs: { defense: 1 },          secondary: { key: 'resist_alteration', from: 'rare' } },
    { key: 'de_concentration', name: 'de Concentration', attrs: { force: 1, intelligence: 1 }, secondary: { key: 'soin_bonus', from: 'rare' } },
  ],
  torse: [
    { key: 'du_rempart',     name: 'du Rempart',      attrs: { defense: 1 },          secondary: { key: 'resistance_bonus', from: 'rare' } },
    { key: 'du_colosse',     name: 'du Colosse',      attrs: { force: 1 } },
    { key: 'de_vitalite',    name: 'de Vitalité',     attrs: { vie: 1 },              secondary: { key: 'regen_combat', from: 'rare' } },
    { key: 'depines',        name: "d'Épines",        attrs: { defense: 1 },          secondary: { key: 'epines',       from: 'rare' } },
    { key: 'du_survivant',   name: 'du Survivant',    attrs: { vie: 1 } },
    { key: 'beni',           name: 'Béni',            attrs: { vie: 1, defense: 1 },  secondary: { key: 'regen_combat', from: 'rare' } },
  ],
  mains: [
    { key: 'de_frappe',      name: 'de Frappe',       attrs: { force: 1 } },
    { key: 'dadresse',       name: "d'Adresse",       attrs: { agilite: 1 },          secondary: { key: 'crit_bonus',    from: 'rare' } },
    { key: 'du_pillard',     name: 'du Pillard',      attrs: { chance: 1 },           secondary: { key: 'butin_bonus',   from: 'rare' } },
    { key: 'precis',         name: 'Précis',          attrs: { agilite: 1 },          secondary: { key: 'critdmg_bonus', from: 'rare' } },
    { key: 'poignes_de_fer', name: 'Poignes de Fer',  attrs: { defense: 1 } },
    { key: 'du_bourreau',    name: 'du Bourreau',     attrs: { force: 1, chance: 1 } },
  ],
  jambes: [
    { key: 'dacier',         name: "d'Acier",         attrs: { defense: 1 },          secondary: { key: 'resistance_bonus', from: 'rare' } },
    { key: 'de_vitesse',     name: 'de Vitesse',      attrs: { agilite: 1 } },
    { key: 'dancrage',       name: "d'Ancrage",       attrs: { vie: 1 } },
    { key: 'du_sprinteur',   name: 'du Sprinteur',    attrs: { agilite: 1 } },
    { key: 'robuste',        name: 'Robuste',         attrs: { vie: 1 } },
    { key: 'du_fuyard',      name: 'du Fuyard',       attrs: { agilite: 1, chance: 1 } },
  ],
  ceinture: [
    { key: 'de_cuir_renforce', name: 'de Cuir Renforcé', attrs: { defense: 1 },       secondary: { key: 'resistance_bonus', from: 'rare' } },
    { key: 'de_fortune',     name: 'de Fortune',      attrs: { chance: 1 },           secondary: { key: 'butin_bonus',      from: 'rare' } },
    { key: 'dendurance',     name: "d'Endurance",     attrs: { vie: 1 },              secondary: { key: 'regen_combat',     from: 'rare' } },
    { key: 'dagilite',       name: "d'Agilité",       attrs: { agilite: 1 } },
    { key: 'du_bourlingueur',name: 'du Bourlingueur', attrs: { intelligence: 1 },     secondary: { key: 'xp_bonus',         from: 'rare' } },
    { key: 'de_stabilite',   name: 'de Stabilité',    attrs: { vie: 1, defense: 1 },  secondary: { key: 'resist_alteration',from: 'rare' } },
  ],
  pieds: [
    { key: 'de_celerite',    name: 'de Célérité',     attrs: { agilite: 1 } },
    { key: 'plaquees',       name: 'Plaquées',        attrs: { defense: 1 } },
    { key: 'legeres',        name: 'Légères',         attrs: { agilite: 1 } },
    { key: 'dexplorateur',   name: "d'Explorateur",   attrs: { chance: 1 },           secondary: { key: 'butin_bonus',      from: 'rare' } },
    { key: 'inebranlables',  name: 'Inébranlables',   attrs: { vie: 1 },              secondary: { key: 'resistance_bonus', from: 'rare' } },
    { key: 'du_messager',    name: 'du Messager',     attrs: { agilite: 1, intelligence: 1 } },
  ],
  accessoire: [
    { key: 'de_fortune',     name: 'de Fortune',      attrs: { chance: 1 },           secondary: { key: 'butin_bonus',   from: 'rare' } },
    { key: 'de_puissance',   name: 'de Puissance',    attrs: { force: 1 },            secondary: { key: 'crit_bonus',    from: 'rare' } },
    { key: 'dharmonie',      name: "d'Harmonie",      attrs: { intelligence: 1 },     secondary: { key: 'soin_bonus',    from: 'rare' } },
    { key: 'du_phenix',      name: 'du Phénix',       attrs: { vie: 1 },              secondary: { key: 'regen_combat',  from: 'rare' } },
    { key: 'de_lerudit',     name: "de l'Érudit",     attrs: { intelligence: 1 },     secondary: { key: 'xp_bonus',      from: 'rare' } },
    { key: 'mortel',         name: 'Mortel',          attrs: { chance: 1, force: 1 }, secondary: { key: 'critdmg_bonus', from: 'rare' } },
  ],
  artefact: [
    { key: 'dharmonie_pure', name: "d'Harmonie Pure", attrs: { intelligence: 1 },     secondary: { key: 'soin_bonus',   from: 'rare' } },
    { key: 'de_dissonance',  name: 'de Dissonance',   attrs: { chance: 1 },           secondary: { key: 'etourdissement', from: 'rare' } },
    { key: 'cosmique',       name: 'Cosmique',        attrs: { intelligence: 1, chance: 1 } },
    { key: 'ancestral',      name: 'Ancestral',       attrs: { vie: 1 },              secondary: { key: 'regen_combat', from: 'rare' } },
    { key: 'de_resonance',   name: 'de Résonance',    attrs: { defense: 1 },          secondary: { key: 'resistance_bonus', from: 'rare' } },
    { key: 'divin',          name: 'Divin',           attrs: { vie: 1, intelligence: 1 }, secondary: { key: 'critdmg_bonus', from: 'rare' } },
  ],
};

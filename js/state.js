// ===== État du jeu + persistance (base ; save complète en Phase 6) =====
import { SETTINGS } from './config.js';

const listeners = new Set();

// Sous-objets extraits (réutilisés tels quels par l'Ascension — voir game/ascension.js
// ascend() : le reset de run reconstruit player/inventory/resources depuis ces MÊMES
// fabriques plutôt que de dupliquer les valeurs, pour ne jamais diverger).
export function defaultPlayer() {
  return {
    name: 'Héros',
    level: 1,
    xp: { cur: 0, max: 100 },        // progression vers le niveau suivant
    hp: { cur: 4, max: 4 },          // "vies" / tentatives (header)
    combatHp: { cur: 10, max: 10 },  // pool PV en combat (dérivé de Vie : 7 + vie*3)
    attributes: { vie: 1, force: 1, agilite: 1, chance: 1, intelligence: 1, defense: 1 },
    attrPoints: 0,                   // points d'attribut à répartir (montée de niveau)
    // Les stats de combat détaillées sont dérivées des attributs (voir game/player.js).
    // Bonus additifs (flat) et multiplicatifs (pct, en %) par clé de stat.
    // flat est recalculé depuis l'équipement (game/items.js) ; pct réservé (Codex/Maîtrise/
    // Récits/Constellations, dérivés à la volée — jamais stockés ici, voir player.js derive()).
    bonuses: { flat: {}, pct: {} },
    // Buffs de Potion (Alchimiste, Phase 5.2) : { [statKey]: { pct, until, name } }.
    // Un seul buff actif par stat (boire à nouveau la même potion prolonge/écrase,
    // pas de stack) ; expiration lue par timestamp dans game/player.js potionBonuses(),
    // jamais purgée activement (poignée de clés max, coût négligeable).
    potionBuffs: {},
    // Emplacements d'équipement (taxo legacy). null = vide. conso = { tid, count }.
    // symphonie1-3 : Symphonies équipées, gérées comme un équipement normal
    // (paperdoll Profil > Équipement, sous Accessoire/Artefact). ceinture : slot dédié
    // depuis le 2026-07-16 (avant : les ceintures étaient kind 'accessoire' — voir
    // game/items.js migrateCeintureEquip() pour les sauvegardes plus anciennes).
    // Une pièce équipée peut porter `.enchant` (voir game/items.js, Enchanteur Phase 9+) :
    // { affixKey, name, rarity, attrs: {statKey:val}, noteChance, rerollCount }.
    equipment: {
      tete: null, conso: null, arme: null, torse: null, mains: null,
      jambes: null, ceinture: null, pieds: null, accessoire: null, artefact: null,
      symphonie1: null, symphonie2: null, symphonie3: null,
    },
    // Note favorisée par l'Enchanteur (voir game/items.js) : influence quelle note
    // apparaît dans les bulles en combat (game/combat.js pickNote()), en plus du %
    // de chance de note apporté par les rolls d'enchantement (2nd roll).
    chosenNote: 'DO',
  };
}

export function defaultInventory() {
  return [
    { tid: 'herbes_medicinales', count: 6 },
    { tid: 'pain',               count: 2 },
    // Symphonies de départ (pas encore de source de drop — voir game/items.js).
    { tid: 'soin',    count: 1 },
    { tid: 'foudre',  count: 1 },
    { tid: 'fureur',  count: 1 },
    { tid: 'vif',     count: 1 },
    { tid: 'parfait', count: 1 },
  ];
}

// fragments/eclats_ascension ne font PAS partie du reset d'Ascension (voir
// game/ascension.js ascend()) : la fabrique les initialise à 0 pour une toute
// nouvelle sauvegarde, ascend() les reporte explicitement par-dessus.
export function defaultResources() {
  return {
    or: 50,          // monnaie principale
    bois: 300, metal: 300, tissu: 300, // matériaux de craft de base
    fragments: 0,    // monnaie premium / enchantement
    eclats_ascension: 0, // ressource Codex "Ressource Premium" (500 kills/monstre) — voir game/combat.js onWin()
    eclats_breche: 0, // ressource dédiée à la Brèche Instable (voir game/donjon.js) — sink futur
  };
}

// État initial (valeurs alignées sur les maquettes).
function defaultState() {
  return {
    meta: { lastSeen: Date.now() },
    player: defaultPlayer(),
    resources: defaultResources(),
    endurance: { cur: SETTINGS.enduranceMax, max: SETTINGS.enduranceMax, regenAt: null }, // regenAt = ts prochain point (Phase 4)
    mesure: [],            // FIFO notes (Phase 3)
    monsterWins: {},       // { monsterId: count } — nettoyage + déblocage auto-battle
    progress: {            // progression par zones (Phase 2)
      unlocked: 1,         // zone max débloquée
      selected: 1,         // zone actuellement consultée
      bossDefeated: {},    // { zoneId: true }
    },
    inventorySlots: 20,    // capacité du sac (nb de piles distinctes) — extensible, voir game/items.js
    inventory: defaultInventory(),
    // Primes (Phase 5.2) : 3 défis tirés chaque jour dans le pool (game/primes.js).
    // date = jour de génération (YYYY-MM-DD) → régénération auto au changement de jour.
    // primeStats = compteurs du jour (kills, gold, miningCycles, craftCount, larryKills,
    // bossKills), remis à zéro à chaque régénération ; la progression d'une Prime se lit
    // à la volée depuis primeStats (jamais dupliquée dans `list`).
    primes: { date: null, list: [] },
    primeStats: {},
    // Constellations (Phase 6, Ascension/Prestige) : arbre de bonus permanents payé en
    // `points` (gagnés à chaque Ascension, voir game/ascension.js). `spent` = { [nodeId]:
    // niveau investi }, jamais remis à zéro par un reset de run (persiste à travers les
    // Ascensions — seul un respec payant le vide, voir ascension.js respec()).
    constellations: { points: 0, totalEarned: 0, spent: {}, respecCount: 0 },
    // Ascension : compteurs hors reset (voir game/ascension.js ascend()). bestFloorAllTime
    // réservé à un futur système de donjon (non implémenté) — le calcul de gain de points
    // sait déjà l'additionner sans migration de save le jour venu.
    ascension: { count: 0, bestZoneAllTime: 0, bestFloorAllTime: 0 },
    // La Brèche Instable (donjon à étages, voir game/donjon.js) : gardienVaincu = le
    // Gardien Harmonique (combat unique, gate d'entrée) a été vaincu au moins une fois.
    // `active` = run en cours (persistée comme le reste — un refresh en pleine Brèche
    // reprend là où on était) | null hors run. bestFloorAllTime (au-dessus, state.ascension)
    // sert de référence pour les checkpoints déblocés — jamais reset par ascend().
    dungeon: { gardienVaincu: false, active: null },
    // Compétences façon "Minage" (progression XP/niveau dédiée, moteur commun voir
    // game/gathering.js). `active` = filon en cours { nodeId, startedAt } | null —
    // persisté pour permettre le rattrapage hors-ligne (voir game/offlineReport.js).
    // bucheronnage/tissage/resonance = métiers dérivés (bois/tissu/fragments, voir
    // game/bucheronnage.js, tissage.js, resonance.js).
    skills: {
      mining: { level: 1, xp: 0, active: null },
      bucheronnage: { level: 1, xp: 0, active: null },
      tissage: { level: 1, xp: 0, active: null },
      resonance: { level: 1, xp: 0, active: null },
    },
    ui: { view: 'village', sub: 'hub' },
    // Badges nav (mainnav/subnav) — clé `${view}:${sub}`, voir game/notifications.js.
    notifications: {},
  };
}

// Fusionne la sauvegarde sur l'état par défaut → les nouvelles clés (progress,
// bonuses…) existent même pour d'anciennes sauvegardes.
function withDefaults(saved) {
  const base = defaultState();
  migrateLegacy(saved);
  return saved ? deepMerge(base, saved) : base;
}

// Migrations ponctuelles de forme (clé qui change de type entre deux versions du
// jeu) : deepMerge écrase récursivement objet-sur-objet mais REMPLACE tout court
// si la clé sauvegardée n'est pas un objet — une ancienne save avec `constellations: 0`
// (placeholder numérique d'avant l'Ascension, voir Roadmap Tâche 6.2) écraserait donc
// le nouvel objet { points, totalEarned, spent, respecCount } par un simple 0. On
// supprime la clé obsolète ici pour laisser le default object de defaultState() faire
// foi sur une save qui n'a jamais eu de vraie donnée de Constellations à préserver.
function migrateLegacy(saved) {
  if (saved && typeof saved.constellations === 'number') delete saved.constellations;
  // Ancien Enchantement (Phase 9, avant le 2026-07-16) : `.enchant` était un NIVEAU
  // (number, 0-5). Le nouveau système stocke un objet de roll ({ affixKey, rarity,
  // attrs, noteChance, rerollCount }, voir game/items.js) — un ancien niveau numérique
  // n'a pas d'équivalent direct (le roll d'affixe est aléatoire), donc on le retire
  // plutôt que de le faire planter : la pièce redevient "jamais enchantée", à
  // ré-enchanter au nouveau système (les fragments dépensés ne sont pas remboursés,
  // décision assumée — sauvegardes de dev, pas de joueurs en prod à ce stade).
  const eq = saved && saved.player && saved.player.equipment;
  if (eq) for (const slotId of Object.keys(eq)) { if (eq[slotId] && typeof eq[slotId].enchant === 'number') delete eq[slotId].enchant; }
}
// Capturé UNE FOIS avant toute mutation : distingue "vraie sauvegarde locale" de
// "état par défaut tout neuf" (les deux ont un meta.lastSeen ~= maintenant, donc ce
// booléen est le seul moyen fiable de savoir si `state.meta.lastSeen` reflète une
// vraie session passée ou juste l'instant du boot — voir main.js hydrateFromCloud().
export const hadLocalSave = !!load();
export let state = withDefaults(load());

export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
function emit() { for (const fn of listeners) fn(state); }

// Mutation + notification. patch = objet partiel OU fonction(state)=>void.
export function setState(patch) {
  if (typeof patch === 'function') patch(state);
  else deepMerge(state, patch);
  emit();
  save();
}

function deepMerge(target, src) {
  for (const k of Object.keys(src)) {
    if (src[k] && typeof src[k] === 'object' && !Array.isArray(src[k])) {
      target[k] = deepMerge(target[k] || {}, src[k]);
    } else target[k] = src[k];
  }
  return target;
}

// ---- Persistance ----
export function save() {
  try {
    state.meta.lastSeen = Date.now();
    localStorage.setItem(SETTINGS.saveKey, JSON.stringify(state));
  } catch (e) { console.warn('Save échouée', e); }
}

export function load() {
  try {
    const raw = localStorage.getItem(SETTINGS.saveKey);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { console.warn('Load échouée', e); return null; }
}

export function resetSave() {
  localStorage.removeItem(SETTINGS.saveKey);
  state = defaultState();
  emit();
}

// ---- Cloud (Firebase) ----
// Fusionne une sauvegarde distante sur l'état courant. Ne notifie PAS `save()` ici
// volontairement : l'appelant (boot, voir main.js) doit d'abord régler le rattrapage
// hors-ligne (régén PV, minage — voir game/offlineReport.js) en utilisant le
// `meta.lastSeen` distant AVANT qu'il ne soit écrasé par un save() local. Le premier
// save() qui suit se chargera de re-persister l'état une fois tout rattrapé.
export function hydrateFromCloud(cloudData) {
  if (!cloudData || typeof cloudData !== 'object') return;
  migrateLegacy(cloudData);
  deepMerge(state, cloudData);
  emit();
}

// Snapshot sérialisable de l'état courant (ce qui part vers Firestore). Actuellement
// l'état entier : structure plate, taille modeste, pas besoin de découpage par doc.
export function snapshotState() { return JSON.parse(JSON.stringify(state)); }


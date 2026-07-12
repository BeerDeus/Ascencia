// ===== État du jeu + persistance (base ; save complète en Phase 6) =====
import { SETTINGS } from './config.js';

const listeners = new Set();

// État initial (valeurs alignées sur les maquettes).
function defaultState() {
  return {
    meta: { lastSeen: Date.now() },
    player: {
      name: 'Héros',
      level: 1,
      xp: { cur: 0, max: 100 },        // progression vers le niveau suivant
      hp: { cur: 4, max: 4 },          // "vies" / tentatives (header)
      combatHp: { cur: 10, max: 10 },  // pool PV en combat (dérivé de Vie : 7 + vie*3)
      attributes: { vie: 1, force: 1, agilite: 1, chance: 1, intelligence: 1, defense: 1 },
      attrPoints: 0,                   // points d'attribut à répartir (montée de niveau)
      // Les stats de combat détaillées sont dérivées des attributs (voir game/player.js).
      // Bonus additifs (flat) et multiplicatifs (pct, en %) par clé de stat.
      // flat est recalculé depuis l'équipement (game/items.js) ; pct réservé (Constellations).
      bonuses: { flat: {}, pct: {} },
      // Emplacements d'équipement (paperdoll). null = vide. conso = { tid, count }.
      equipment: {
        casque: null, conso: null, arme: null, plastron: null, bouclier: null,
        anneau1: null, jambieres: null, anneau2: null, bottes: null, amulette: null,
        accessoire1: null, accessoire2: null, accessoire3: null,
      },
    },
    resources: {
      crystalA: 20015, crystalB: 15440,
      coinA: 40460, coinB: 50741,
      premium: 49900, // Fragments d'Écho / monnaie premium
    },
    endurance: { cur: SETTINGS.enduranceMax, max: SETTINGS.enduranceMax },
    mesure: [],            // FIFO notes (Phase 3)
    accords: [],           // sorts équipés (Phase 3)
    monsterWins: {},       // { monsterId: count } — nettoyage + déblocage auto-battle
    progress: {            // progression par zones (Phase 2)
      unlocked: 1,         // zone max débloquée
      selected: 1,         // zone actuellement consultée
      bossDefeated: {},    // { zoneId: true }
    },
    inventory: [           // stacks { tid, count } — matériaux de départ pour crafter
      { tid: 'eclat_pierre', count: 5 },
      { tid: 'herbe_calme',  count: 4 },
      { tid: 'pain',         count: 1 },
    ],
    constellations: 0,     // prestige (Phase 6)
    ui: { view: 'village', sub: 'hub' },
  };
}

// Fusionne la sauvegarde sur l'état par défaut → les nouvelles clés (progress,
// bonuses…) existent même pour d'anciennes sauvegardes.
function withDefaults(saved) {
  const base = defaultState();
  return saved ? deepMerge(base, saved) : base;
}
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

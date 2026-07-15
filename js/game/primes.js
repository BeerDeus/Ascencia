// ===== Primes (Village) : défis quotidiens — Phase 5.2 =====
// 3 défis tirés chaque jour dans PRIME_POOL, remis à zéro à minuit (comparaison de
// date, pas de setInterval dédié — voir ensureToday()). La progression n'est jamais
// stockée par Prime : elle se lit à la volée depuis state.primeStats (compteurs du
// jour, incrémentés par les modules concernés — combat.js/mining.js/items.js), sur
// le même principe que les bonus dérivés du Codex (jamais de double source de vérité).
import { state, setState } from '../state.js';
import { setNotification } from './notifications.js';

const PRIMES_SUB = 'primes'; // clé de badge : notifications['village:primes']

// metric = clé de state.primeStats incrémentée par incrementMetric() ailleurs dans le code.
export const PRIME_POOL = [
  { id: 'kills10',  metric: 'kills',        target: 10,  icon: 'assets/sprites/icons/combat.png',
    label: 'Chasseur du jour',       desc: 'Vaincre 10 monstres.',                                    reward: { or: 40 } },
  { id: 'kills25',  metric: 'kills',        target: 25,  icon: 'assets/sprites/icons/combat.png',
    label: 'Grande chasse',          desc: 'Vaincre 25 monstres.',                                    reward: { or: 90, fragments: 1 } },
  { id: 'mine5',    metric: 'miningCycles', target: 5,   icon: 'assets/sprites/objets/pioche.png',
    label: 'Piocheur assidu',        desc: 'Compléter 5 cycles de minage.',                           reward: { or: 30 } },
  { id: 'craft3',   metric: 'craftCount',   target: 3,   icon: 'assets/sprites/icons/forge.png',
    label: 'Artisan du jour',        desc: 'Fabriquer 3 objets (Forge, Cuisine ou Alchimiste).',      reward: { or: 35 } },
  { id: 'gold200',  metric: 'gold',         target: 200, icon: 'assets/sprites/objets/piece_or.png',
    label: 'Petit trésor',           desc: 'Récolter 200 or en combat.',                              reward: { fragments: 1 } },
  { id: 'larry1',   metric: 'larryKills',   target: 1,   icon: 'assets/sprites/icons/dissonance.png',
    label: 'Chasseur de Dissonance', desc: "Vaincre 1 monstre sous l'Instabilité de Larry.",           reward: { or: 25, fragments: 1 } },
  { id: 'boss1',    metric: 'bossKills',    target: 1,   icon: 'assets/sprites/icons/elite.png',
    label: 'Traqueur de Boss',       desc: 'Vaincre 1 boss de zone.',                                  reward: { or: 60 } },
];
const primeDef = (id) => PRIME_POOL.find((p) => p.id === id);

const todayStr = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function pickThree() {
  const pool = [...PRIME_POOL];
  const picked = [];
  while (picked.length < 3 && pool.length) picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return picked.map((d) => ({ id: d.id, claimed: false }));
}

// Régénère la liste du jour si le jour a changé (self-healing : appelé en tête de
// chaque fonction exportée, aucun setInterval dédié nécessaire).
function ensureToday() {
  const t = todayStr();
  if (state.primes.date === t) return;
  setState((s) => {
    s.primes = { date: t, list: pickThree() };
    s.primeStats = {};
  });
  setNotification('village', PRIMES_SUB, false); // liste fraîche → rien de complété
}

// Liste enrichie pour l'UI : def + progress (dérivée de primeStats) + claimed.
export function list() {
  ensureToday();
  return state.primes.list.map((p) => {
    const def = primeDef(p.id);
    const progress = Math.min(def.target, state.primeStats[def.metric] || 0);
    return { ...def, claimed: p.claimed, progress, ready: progress >= def.target && !p.claimed };
  });
}

function syncBadge() {
  setNotification('village', PRIMES_SUB, list().some((p) => p.ready));
}

// Incrémente un compteur du jour (appelé par combat.js/mining.js/items.js aux
// endroits pertinents) puis resynchronise le badge Village > Primes.
export function incrementMetric(key, n = 1) {
  if (!n) return;
  ensureToday();
  setState((s) => { s.primeStats[key] = (s.primeStats[key] || 0) + n; });
  syncBadge();
}

export function claim(id) {
  ensureToday();
  const p = state.primes.list.find((x) => x.id === id);
  const def = primeDef(id);
  if (!p || !def || p.claimed) return false;
  const progress = Math.min(def.target, state.primeStats[def.metric] || 0);
  if (progress < def.target) return false;
  setState((s) => {
    const sp = s.primes.list.find((x) => x.id === id);
    sp.claimed = true;
    for (const [k, v] of Object.entries(def.reward || {})) s.resources[k] = (s.resources[k] || 0) + v;
  });
  syncBadge();
  return true;
}

export const primesApi = { PRIME_POOL, list, claim, incrementMetric };

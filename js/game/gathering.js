// ===== Moteur générique des métiers de récolte façon Minage. =====
// Extrait de game/mining.js (qui l'utilise désormais aussi, voir plus bas) pour
// être réutilisé par Bûcheronnage/Tissage/Résonance sans dupliquer le modèle
// temporel paresseux : on stocke `{ nodeId, startedAt }` dans state.skills[key],
// le nombre de cycles complétés se déduit du temps écoulé (Date.now() - startedAt),
// crédité à la demande (creditPending). C'est ce qui permet le rattrapage hors-ligne
// (voir game/offlineReport.js) pour n'importe quel métier construit sur cette factory.
import { state, setState } from '../state.js';
import { incrementMetric } from './primes.js';

export const xpForLevel = (lvl) => Math.floor(100 * Math.pow(1.15, lvl - 1));

const DEFAULT_BOOST_PCT = 8; // clic manuel sur le filon déjà actif = coup de pioche (+8% instantané)

// Registre de tous les métiers construits sur cette factory (Minage/Bûcheronnage/
// Tissage/Résonance) — permet l'exclusivité mutuelle (un seul métier actif à la fois,
// voir start() ci-dessous) sans imports circulaires entre les modules de métier
// (mining.js n'a pas besoin de connaître bucheronnage.js et inversement).
const REGISTRY = [];

// `key` = clé sous state.skills (ex: 'mining', 'bucheronnage'). `nodes` = filons
// (mêmes champs que MINING_NODES : id/name/icon/levelReq/duration/xp/resource/amount/desc).
// `metric` (optionnel) = clé Primes incrémentée par cycle crédité (voir game/primes.js).
// `opts.boostPct` (optionnel) = % du coup de pioche manuel pour CE métier — permet de
// désamorcer le farm au clic sur un métier précis (ex: Résonance, voir resonance.js)
// sans toucher aux 3 autres qui gardent le défaut historique.
export function createGatheringSkill(key, nodes, metric, opts = {}) {
  const BOOST_PCT = opts.boostPct != null ? opts.boostPct : DEFAULT_BOOST_PCT;
  const level = (s = state) => (s.skills && s.skills[key] ? s.skills[key].level : 1);
  const xp = (s = state) => (s.skills && s.skills[key] ? s.skills[key].xp : 0);
  const canGather = (node, s = state) => level(s) >= node.levelReq;

  const activeSession = (s = state) => (s.skills && s.skills[key] && s.skills[key].active) || null;
  const currentNode = (s = state) => { const a = activeSession(s); return a ? nodes.find((n) => n.id === a.nodeId) || null : null; };
  const isActive = (s = state) => !!activeSession(s);

  function getProgress(s = state) {
    const a = activeSession(s), node = currentNode(s);
    if (!a || !node) return 0;
    return Math.min(100, ((Date.now() - a.startedAt) % node.duration) / node.duration * 100) || 0;
  }

  function creditPending() {
    const a = activeSession();
    if (!a) return null;
    const node = nodes.find((n) => n.id === a.nodeId);
    if (!node) { setState((s) => { if (s.skills && s.skills[key]) s.skills[key].active = null; }); return null; }

    const cycles = Math.floor((Date.now() - a.startedAt) / node.duration);
    if (cycles <= 0) return null;

    let leveledTo = null;
    setState((s) => {
      const sk = s.skills[key];
      s.resources[node.resource] = (s.resources[node.resource] || 0) + node.amount * cycles;
      sk.xp += node.xp * cycles;
      let req = xpForLevel(sk.level);
      while (sk.xp >= req) { sk.xp -= req; sk.level += 1; leveledTo = sk.level; req = xpForLevel(sk.level); }
      if (sk.active) sk.active.startedAt += cycles * node.duration; // garde le reliquat sous la durée d'un cycle
    });
    if (metric) incrementMetric(metric, cycles);

    return { nodeId: node.id, nodeName: node.name, icon: node.icon, cycles, resource: node.resource, resourceGained: node.amount * cycles, xpGained: node.xp * cycles, leveledTo };
  }

  function start(nodeId) {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !canGather(node)) return false;

    const a = activeSession();
    if (a && a.nodeId === nodeId) {
      setState((s) => { s.skills[key].active.startedAt -= node.duration * (BOOST_PCT / 100); });
      return true;
    }

    // Un seul métier de récolte actif à la fois : en démarrer un autre coupe celui(x)
    // en cours ailleurs (crédite d'abord ses cycles pleins, comme le bouton "Arrêter"
    // — voir stop() ci-dessous). Demande explicite du 2026-07-17.
    for (const other of REGISTRY) { if (other.key !== key && other.isActive()) other.stop(); }

    creditPending();
    setState((s) => {
      if (!s.skills) s.skills = {};
      if (!s.skills[key]) s.skills[key] = { level: 1, xp: 0, active: null };
      s.skills[key].active = { nodeId, startedAt: Date.now() };
    });
    return true;
  }

  function stop() {
    creditPending();
    setState((s) => { if (s.skills && s.skills[key]) s.skills[key].active = null; });
  }

  const api = { key, NODES: nodes, isActive, currentNode, activeSession, getProgress, canGather, start, stop, creditPending, level, xp };
  REGISTRY.push(api);
  return api;
}

// Stoppe tout métier de récolte actif (crédite ses cycles pleins) — appelé en entrée
// d'un combat (voir game/combat.js start()), généralisation du stopMining() historique
// (qui ne couvrait que le Minage) aux 4 métiers. Demande explicite du 2026-07-17.
export function stopAllGathering() {
  for (const skill of REGISTRY) { if (skill.isActive()) skill.stop(); }
}

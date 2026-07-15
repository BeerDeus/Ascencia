// ===== Minage (Village > Minage) : filons à progression temporisée, persistants. =====
// Modèle temporel paresseux plutôt qu'un setInterval qui égrène des ticks : on stocke
// juste `{ nodeId, startedAt }` dans le state (sauvegardé — localStorage + Firestore).
// Le nombre de cycles complétés se déduit du temps écoulé (`Date.now() - startedAt`),
// crédité à la demande (creditPending) — démarrage/arrêt d'un filon, boot de l'app,
// retour au premier plan, ou tick périodique léger pendant que la vue est ouverte.
// Cette conception est ce qui permet le minage "hors-ligne" : fermer l'app puis
// revenir 3h plus tard calcule exactement les mêmes cycles que rester sur l'écran
// (voir game/offlineReport.js pour le rapport affiché à la reconnexion).
import { state, setState } from '../state.js';
import { incrementMetric } from './primes.js';

export const MINING_NODES = [
  { id: 'eclat_pierre',     name: 'Éclat de Pierre',  icon: 'assets/sprites/ressources/pierre.png',           levelReq: 1,  duration: 6000,  xp: 8,  resource: 'metal',     amount: 3,  desc: 'Un simple éclat arraché à la roche. Rapide à extraire.' },
  { id: 'filon_cuivre',     name: 'Filon de Cuivre',  icon: 'assets/sprites/ressources/metal.png',            levelReq: 8,  duration: 12000, xp: 20, resource: 'metal',     amount: 10, desc: 'Une veine plus riche, mais plus longue à travailler.' },
  { id: 'veine_dissonante', name: 'Veine Dissonante', icon: 'assets/sprites/ressources/eclats_instables.png', levelReq: 20, duration: 25000, xp: 45, resource: 'fragments', amount: 1,  desc: 'La roche murmure encore. Instable, précieuse.' },
];

const BOOST_PCT = 8; // clic manuel sur le filon déjà actif = coup de pioche (+8% instantané)

export const xpForLevel = (lvl) => Math.floor(100 * Math.pow(1.15, lvl - 1));
export const miningLevel = (s = state) => (s.skills && s.skills.mining ? s.skills.mining.level : 1);
export const miningXp = (s = state) => (s.skills && s.skills.mining ? s.skills.mining.xp : 0);
export const canMine = (node, s = state) => miningLevel(s) >= node.levelReq;

export const activeSession = (s = state) => (s.skills && s.skills.mining && s.skills.mining.active) || null;
export const currentNode = (s = state) => { const a = activeSession(s); return a ? MINING_NODES.find((n) => n.id === a.nodeId) || null : null; };
export const isMining = (s = state) => !!activeSession(s);

// Progression du cycle EN COURS (0-100), dérivée du temps — reste correcte sans
// qu'aucun tick n'ait tourné (le modulo absorbe les cycles non encore crédités).
export function getProgress(s = state) {
  const a = activeSession(s), node = currentNode(s);
  if (!a || !node) return 0;
  return Math.min(100, ((Date.now() - a.startedAt) % node.duration) / node.duration * 100) || 0;
}

// ---- Crédit paresseux : ressources + XP + niveaux pour tous les cycles pleins
// écoulés depuis `startedAt`. Renvoie un résumé (ou null si rien à créditer) —
// utilisé aussi bien pour l'affichage en direct que pour le rapport hors-ligne.
export function creditPending() {
  const a = activeSession();
  if (!a) return null;
  const node = MINING_NODES.find((n) => n.id === a.nodeId);
  if (!node) { setState((s) => { if (s.skills && s.skills.mining) s.skills.mining.active = null; }); return null; }

  const cycles = Math.floor((Date.now() - a.startedAt) / node.duration);
  if (cycles <= 0) return null;

  let leveledTo = null;
  setState((s) => {
    const sk = s.skills.mining;
    s.resources[node.resource] = (s.resources[node.resource] || 0) + node.amount * cycles;
    sk.xp += node.xp * cycles;
    let req = xpForLevel(sk.level);
    while (sk.xp >= req) { sk.xp -= req; sk.level += 1; leveledTo = sk.level; req = xpForLevel(sk.level); }
    if (sk.active) sk.active.startedAt += cycles * node.duration; // garde le reliquat sous la durée d'un cycle
  });
  incrementMetric('miningCycles', cycles); // Primes (game/primes.js)

  return { nodeId: node.id, nodeName: node.name, icon: node.icon, cycles, resource: node.resource, resourceGained: node.amount * cycles, xpGained: node.xp * cycles, leveledTo };
}

// Démarre un filon (encaisse d'abord l'ancien s'il y en avait un), ou donne un coup
// de pioche manuel (avance la barre de BOOST_PCT) si le même filon est déjà actif.
export function startMining(nodeId) {
  const node = MINING_NODES.find((n) => n.id === nodeId);
  if (!node || !canMine(node)) return false;

  const a = activeSession();
  if (a && a.nodeId === nodeId) {
    setState((s) => { s.skills.mining.active.startedAt -= node.duration * (BOOST_PCT / 100); });
    return true;
  }

  creditPending();
  setState((s) => {
    if (!s.skills) s.skills = {};
    if (!s.skills.mining) s.skills.mining = { level: 1, xp: 0, active: null };
    s.skills.mining.active = { nodeId, startedAt: Date.now() };
  });
  return true;
}

// Arrêt volontaire (bouton "Arrêter") : encaisse les cycles pleins puis libère le filon.
export function stopMining() {
  creditPending();
  setState((s) => { if (s.skills && s.skills.mining) s.skills.mining.active = null; });
}

export const miningApi = { MINING_NODES, isMining, currentNode, activeSession, getProgress, canMine, startMining, stopMining, creditPending, xpForLevel, miningLevel, miningXp };

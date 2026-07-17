// ===== Résonance (Village > Résonance) : même moteur que le Minage =====
// (voir game/gathering.js). Métier dédié aux fragments — ATTENTION : fragments est
// une monnaie de craft courante (drop fréquent, coût Cuisine/Alchimie/Forge), PAS la
// ressource premium du jeu (c'est eclats_ascension, voir feedback_eclats_ascension_is_premium
// en mémoire) — donc mêmes paliers 1/8/20 que Minage/Bûcheronnage/Tissage, pas de
// sur-gating. Le "autre" taux (vs 5% Bûcheronnage/Tissage) vient de l'amount plafonné
// à 1/cycle à tous les paliers (au lieu de scaler 3/10/20 comme le bois/tissu) — donc
// c'est la DURÉE qui progresse, et elle doit DIMINUER avec le niveau (palier plus haut
// = plus rapide pour le même 1 fragment), pas grimper : un palier lvl20 plus lent que
// le lvl1 pour le même gain n'aurait aucun sens (bug corrigé le 2026-07-16, durées
// inversées par rapport à la 1ère version).
import { createGatheringSkill, xpForLevel } from './gathering.js';

export const RESONANCE_NODES = [
  { id: 'echo_leger',      name: 'Écho Léger',      icon: 'assets/sprites/ressources/fragment.png', levelReq: 1,  duration: 500000, xp: 8,  resource: 'fragments', amount: 1, desc: 'Un murmure ténu, presque inaudible. Long à capter.' },
  { id: 'echo_discordant', name: 'Écho Discordant', icon: 'assets/sprites/ressources/fragment.png', levelReq: 8,  duration: 240000, xp: 20, resource: 'fragments', amount: 1, desc: 'Une résonance plus nette, plus rapide à saisir.' },
  { id: 'echo_profond',    name: 'Écho Profond',    icon: 'assets/sprites/ressources/fragment.png', levelReq: 20, duration: 120000, xp: 45, resource: 'fragments', amount: 1, desc: 'Un écho chargé de Dissonance, maîtrisé et rapide.' },
];

// boostPct réduit à 3 (au lieu du défaut 8) : farm au clic jugé trop efficace sur les
// fragments (monnaie d'enchantement) vs les 3 autres métiers — décision produit du
// 2026-07-16, voir demande utilisateur. La durée du cycle (temps passif) ne change pas.
const skill = createGatheringSkill('resonance', RESONANCE_NODES, 'resonanceCycles', { boostPct: 3 });

export { xpForLevel };
export const resonanceLevel = skill.level;
export const resonanceXp = skill.xp;
export const canResonate = skill.canGather;
export const activeSession = skill.activeSession;
export const currentNode = skill.currentNode;
export const isResonating = skill.isActive;
export const getProgress = skill.getProgress;
export const startResonance = skill.start;
export const stopResonance = skill.stop;
export const creditPending = skill.creditPending;

export const resonanceApi = { RESONANCE_NODES, isResonating, currentNode, activeSession, getProgress, canResonate, startResonance, stopResonance, creditPending, xpForLevel, resonanceLevel, resonanceXp };
// Forme uniforme — voir views/village.js renderGatherStation().
export const skillApi = skill;

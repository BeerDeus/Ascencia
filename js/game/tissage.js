// ===== Tissage (Village > Tissage) : même moteur que le Minage =====
// (voir game/gathering.js), rendements réduits à 5% de ceux du Minage (durées ×20
// pour un amount/xp identique par palier) — même logique que Bûcheronnage.
import { createGatheringSkill, xpForLevel } from './gathering.js';

export const WEAVING_NODES = [
  { id: 'fibres_effilochees', name: 'Fibres Effilochées', icon: 'assets/sprites/ressources/tissu_brut.png', levelReq: 1,  duration: 120000, xp: 8,  resource: 'tissu', amount: 3,  desc: 'Des restes de toile. Faciles à récupérer.' },
  { id: 'toile_tramee',       name: 'Toile Tramée',       icon: 'assets/sprites/ressources/tissu.png',      levelReq: 8,  duration: 240000, xp: 20, resource: 'tissu', amount: 10, desc: 'Un tissage serré, plus long à démêler.' },
  { id: 'etoffe_chantante',   name: 'Étoffe Chantante',   icon: 'assets/sprites/ressources/tissu.png',      levelReq: 20, duration: 500000, xp: 45, resource: 'tissu', amount: 20, desc: 'La trame semble fredonner. Précieuse, patience requise.' },
];

const skill = createGatheringSkill('tissage', WEAVING_NODES, 'tissageCycles');

export { xpForLevel };
export const weavingLevel = skill.level;
export const weavingXp = skill.xp;
export const canWeave = skill.canGather;
export const activeSession = skill.activeSession;
export const currentNode = skill.currentNode;
export const isWeaving = skill.isActive;
export const getProgress = skill.getProgress;
export const startWeaving = skill.start;
export const stopWeaving = skill.stop;
export const creditPending = skill.creditPending;

export const tissageApi = { WEAVING_NODES, isWeaving, currentNode, activeSession, getProgress, canWeave, startWeaving, stopWeaving, creditPending, xpForLevel, weavingLevel, weavingXp };
// Forme uniforme — voir views/village.js renderGatherStation().
export const skillApi = skill;

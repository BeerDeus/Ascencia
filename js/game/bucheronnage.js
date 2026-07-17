// ===== Bûcheronnage (Village > Bûcheronnage) : même moteur que le Minage =====
// (voir game/gathering.js), rendements réduits à 5% de ceux du Minage (durées ×20
// pour un amount/xp identique par palier) — le bois reste un matériau courant, pas
// besoin d'un débit comparable au filon dédié.
import { createGatheringSkill, xpForLevel } from './gathering.js';

export const WOODCUTTING_NODES = [
  { id: 'bois_mort',        name: 'Bois Mort',        icon: 'assets/sprites/ressources/bois_brut.png', levelReq: 1,  duration: 120000, xp: 8,  resource: 'bois', amount: 3,  desc: 'Des branches sèches. Faciles à ramasser, longues à sécher.' },
  { id: 'chene_noueux',     name: 'Chêne Noueux',     icon: 'assets/sprites/ressources/bois.png',       levelReq: 8,  duration: 240000, xp: 20, resource: 'bois', amount: 10, desc: 'Un tronc dense. Bien plus long à débiter.' },
  { id: 'frene_discordant', name: 'Frêne Discordant', icon: 'assets/sprites/ressources/bois.png',       levelReq: 20, duration: 500000, xp: 45, resource: 'bois', amount: 20, desc: "L'écorce vibre d'un écho sourd. Rare, très long à abattre." },
];

const skill = createGatheringSkill('bucheronnage', WOODCUTTING_NODES, 'bucheronnageCycles');

export { xpForLevel };
export const woodcuttingLevel = skill.level;
export const woodcuttingXp = skill.xp;
export const canChop = skill.canGather;
export const activeSession = skill.activeSession;
export const currentNode = skill.currentNode;
export const isChopping = skill.isActive;
export const getProgress = skill.getProgress;
export const startChopping = skill.start;
export const stopChopping = skill.stop;
export const creditPending = skill.creditPending;

export const bucheronnageApi = { WOODCUTTING_NODES, isChopping, currentNode, activeSession, getProgress, canChop, startChopping, stopChopping, creditPending, xpForLevel, woodcuttingLevel, woodcuttingXp };
// Forme uniforme — voir views/village.js renderGatherStation().
export const skillApi = skill;

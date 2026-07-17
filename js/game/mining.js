// ===== Minage (Village > Minage) : filons à progression temporisée, persistants. =====
// Modèle temporel paresseux plutôt qu'un setInterval qui égrène des ticks : on stocke
// juste `{ nodeId, startedAt }` dans le state (sauvegardé — localStorage + Firestore).
// Le nombre de cycles complétés se déduit du temps écoulé (`Date.now() - startedAt`),
// crédité à la demande (creditPending) — démarrage/arrêt d'un filon, boot de l'app,
// retour au premier plan, ou tick périodique léger pendant que la vue est ouverte.
// Cette conception est ce qui permet le minage "hors-ligne" : fermer l'app puis
// revenir 3h plus tard calcule exactement les mêmes cycles que rester sur l'écran
// (voir game/offlineReport.js pour le rapport affiché à la reconnexion).
// Le moteur temporel lui-même vit dans game/gathering.js (createGatheringSkill),
// réutilisé par Bûcheronnage/Tissage/Résonance — voir ces fichiers pour les métiers
// dérivés (bois/tissu/fragments, mêmes mécaniques, rendements réduits).
import { createGatheringSkill, xpForLevel } from './gathering.js';

// veine_dissonante donnait des fragments à l'origine — désormais réservés au métier
// dédié Résonance (voir game/resonance.js), pour ne pas dupliquer la même ressource
// sur deux métiers différents. Le 3ème palier du Minage reste du metal (plus riche).
export const MINING_NODES = [
  { id: 'eclat_pierre',     name: 'Éclat de Pierre',  icon: 'assets/sprites/ressources/pierre.png',           levelReq: 1,  duration: 6000,  xp: 8,  resource: 'metal', amount: 3,  desc: 'Un simple éclat arraché à la roche. Rapide à extraire.' },
  { id: 'filon_cuivre',     name: 'Filon de Cuivre',  icon: 'assets/sprites/ressources/metal.png',            levelReq: 8,  duration: 12000, xp: 20, resource: 'metal', amount: 10, desc: 'Une veine plus riche, mais plus longue à travailler.' },
  { id: 'veine_dissonante', name: 'Veine Dissonante', icon: 'assets/sprites/ressources/eclats_instables.png', levelReq: 20, duration: 25000, xp: 45, resource: 'metal', amount: 25, desc: 'La roche murmure encore. Instable, mais riche en métal.' },
];

const skill = createGatheringSkill('mining', MINING_NODES, 'miningCycles');

export { xpForLevel };
export const miningLevel = skill.level;
export const miningXp = skill.xp;
export const canMine = skill.canGather;
export const activeSession = skill.activeSession;
export const currentNode = skill.currentNode;
export const isMining = skill.isActive;
export const getProgress = skill.getProgress;
export const startMining = skill.start;
export const stopMining = skill.stop;
export const creditPending = skill.creditPending;

export const miningApi = { MINING_NODES, isMining, currentNode, activeSession, getProgress, canMine, startMining, stopMining, creditPending, xpForLevel, miningLevel, miningXp };
// Forme uniforme (mêmes noms de champs pour les 4 métiers) — voir views/village.js
// renderGatherStation(), qui affiche Minage/Bûcheronnage/Tissage/Résonance avec un
// seul renderer générique plutôt que 4 copies quasi identiques.
export const skillApi = skill;

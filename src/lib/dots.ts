// Pastilles « il y a quelque chose à faire » : onglets et sous-onglets.
import type { GameState } from '../game/types';
import { chestReady, fiefUnlocked } from '../game/fief';
import { fiefTabOpen } from '../game/data/fief';
import { claimable } from '../game/achievements';
import { mature, gardenUnlocked } from '../game/garden';
import { isDone } from '../game/expeditions';
import { MEALS } from '../game/data/crafting';
import { canCook } from '../game/crafting';
import { drawCost, owned } from '../game/arcanes';
import { ARCANES } from '../game/data/arcanes';
import { canResonate, anchorsVisible } from '../game/resonance';
import { STARS, starCost } from '../game/data/constellations';
import { questsClaimable } from '../game/quests';

export const dots = {
  village: (s: GameState) => fiefUnlocked(s) && (chestReady(s) || questsClaimable(s) || !!s.daily?.bounties.some(b => !b.claimed && s.daily.c[b.c] >= b.target)),
  jardin: (s: GameState) => gardenUnlocked(s) && s.garden.plots.some(p => mature(p)),
  expeditions: (s: GameState) => fiefTabOpen(s, 'expeditions') && s.expeditions.some(isDone),
  cuisine: (s: GameState) => fiefUnlocked(s) && MEALS.some(m => canCook(s, m)), // aucun repas actif et un plat faisable
  hf: (s: GameState) => claimable(s).length > 0,
  // seulement s'il y a quelque chose à acheter (une Constellation abordable), pas « on peut ascensionner » en permanence
  rituel: (s: GameState) => s.ascensions > 0 && STARS.some(n => { const lv = s.constellations[n.id] ?? 0; return lv < n.max && (!n.requires || s.constellations[n.requires] > 0) && starCost(n, lv) <= s.eclats; }),
  arcanes: (s: GameState) => s.ascensions > 0 && owned(s) < ARCANES.length && s.eclats >= drawCost(s),
  resonance: (s: GameState) => anchorsVisible(s) && canResonate(s),
};
export const ateliersDot = (s: GameState) => dots.cuisine(s);
export const fiefDot = (s: GameState) => dots.village(s) || dots.jardin(s) || dots.expeditions(s) || ateliersDot(s);
// onglet principal : seulement Rituel et Résonance (les Arcanes gardent leur pastille de sous-onglet, sans clignoter en permanence)
export const ascDot = (s: GameState) => dots.rituel(s) || dots.arcanes(s) || dots.resonance(s);

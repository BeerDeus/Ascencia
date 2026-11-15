// La Compagnie : ce qui distingue les alliés d'une simple liste à monter.
//  • Meneur : un allié choisi mène la Compagnie (dégâts renforcés + aura selon son rôle).
//  • Harmonie : les trois rôles (Mêlée, Distance, Magie) montés de façon équilibrée renforcent toute la Compagnie.
//  • Affinité : chaque boss vaincu avec un allié renforce votre lien (permanent) et débloque ses souvenirs.
import type { GameState, CompType } from './types';
import { COMPANIONS } from './data/heroes';
import { T } from './tuning';

export const ROLES: CompType[] = ['melee', 'distance', 'magie'];
export const ROLE_NAME: Record<CompType, string> = { melee: 'Mêlée', distance: 'Distance', magie: 'Magie' };
export const AURA: Record<CompType, string> = {
  melee: '+2 s de Volonté face aux boss',
  distance: '+3 % de chance de critique',
  magie: 'Partitions +25 % de puissance',
};

// ---- Meneur
export const leaderOf = (s: GameState) => {
  const l = s.company?.leader ?? -1;
  return l >= 0 && (s.run?.companions[l] ?? 0) > 0 ? l : -1;
};
export function setLeader(s: GameState, i: number): boolean {
  if (!(s.run.companions[i] > 0)) return false;
  (s.company ??= { leader: -1, affinity: {} }).leader = i;
  return true;
}
/** Aura du meneur (selon son rôle). */
export function aura(s: GameState) {
  const l = leaderOf(s), t = l >= 0 ? COMPANIONS[l].type : null;
  return { volonte: t === 'melee' ? 2 : 0, crit: t === 'distance' ? 0.03 : 0, power: t === 'magie' ? 0.25 : 0 };
}

// ---- Harmonie : rapport entre le rôle le moins monté et le plus monté (niveau du meilleur allié de chaque rôle)
export function roleTops(s: GameState): Record<CompType, number> {
  const out = { melee: 0, distance: 0, magie: 0 } as Record<CompType, number>;
  s.run?.companions.forEach((l, i) => { const t = COMPANIONS[i].type; if (l > out[t]) out[t] = l; });
  return out;
}
export function harmony(s: GameState): number {
  const v = ROLES.map(r => roleTops(s)[r]), max = Math.max(...v);
  return max > 0 ? Math.min(...v) / max : 0;
}
export const harmonyMult = (s: GameState) => 1 + T.harmonyMax * harmony(s);

// ---- Affinité (permanente)
export const AFFINITY_STEPS = [15, 50, 120, 250, 450, 750, 1150, 1700, 2400, 3300];
export const affinityPts = (s: GameState, i: number) => s.company?.affinity[i] ?? 0;
export const affinityLevel = (pts: number) => AFFINITY_STEPS.filter(k => pts >= k).length;
/** Un boss vaincu : +1 d'Affinité pour chaque allié présent dans la Compagnie. */
export function gainAffinity(s: GameState, n = 1) {
  const c = (s.company ??= { leader: -1, affinity: {} });
  s.run.companions.forEach((l, i) => { if (l > 0) c.affinity[i] = (c.affinity[i] ?? 0) + n; });
}
/** Multiplicateur propre d'un allié : Affinité, et Meneur. */
export function memberMult(s: GameState, i: number) {
  return (1 + T.affinityPer * affinityLevel(affinityPts(s, i))) * (leaderOf(s) === i ? T.leaderMult : 1);
}

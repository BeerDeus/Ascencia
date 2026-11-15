// Talents des alliés : aux niveaux 100, 200, 300, 400, chaque allié offre un choix entre 2 talents.
// Le choix est définitif pour le compte (il revient à chaque vie quand l'allié repasse ce niveau).
import type { GameState } from './types';

export const TALENT_TIERS = [100, 200, 300, 400];
export interface TalentDef { name: string; desc: string }
/** A : renforce cet allié · B : bonus d'équipe. */
export const TALENTS: [TalentDef, TalentDef][] = [
  [{ name: 'Lame affûtée', desc: 'Cet allié : dégâts ×1,5' }, { name: 'Inspiration', desc: 'Frappe +10 %' }],
  [{ name: 'Maîtrise', desc: 'Cet allié : dégâts ×1,5' }, { name: 'Œil de lynx', desc: '+1 % de chance de critique' }],
  [{ name: 'Fureur', desc: 'Cet allié : dégâts ×1,5' }, { name: 'Cri de ralliement', desc: 'Tous les alliés +10 %' }],
  [{ name: 'Légende vivante', desc: 'Cet allié : dégâts ×1,5' }, { name: 'Bouclier', desc: '+1 s de Volonté face aux boss' }],
];

export const talentsOf = (s: GameState, i: number) => s.talents?.[i] ?? [];
/** Paliers atteints dans cette vie dont le choix n'a pas encore été fait. */
export function pendingTalent(s: GameState, i: number): number {
  const lv = s.run.companions[i] ?? 0, got = talentsOf(s, i);
  const k = TALENT_TIERS.findIndex((t, j) => lv >= t && !got[j]);
  return k;
}
export const anyPendingTalent = (s: GameState) => s.run.companions.some((_, i) => pendingTalent(s, i) >= 0);
export function chooseTalent(s: GameState, i: number, tier: number, pick: 'a' | 'b'): boolean {
  if (pendingTalent(s, i) !== tier) return false;
  const t = ((s.talents ??= {})[i] ??= []);
  t[tier] = pick;
  return true;
}
/** Talents actifs de l'allié i (palier atteint dans cette vie). */
const active = (s: GameState, i: number) => talentsOf(s, i).map((p, k) => ((s.run.companions[i] ?? 0) >= TALENT_TIERS[k] ? p : undefined));
/** Multiplicateur propre de l'allié i (talents « A »). */
export const ownMult = (s: GameState, i: number) => active(s, i).reduce((m, p) => (p === 'a' ? m * 1.5 : m), 1);
/** Bonus d'équipe (talents « B ») : nombre de talents actifs par palier. */
export function teamBonus(s: GameState) {
  const n = [0, 0, 0, 0];
  if (s.run?.companions) s.run.companions.forEach((_, i) => active(s, i).forEach((p, k) => { if (p === 'b') n[k]++; }));
  return { frappe: 0.1 * n[0], crit: 0.01 * n[1], comp: 0.1 * n[2], volonte: n[3] };
}

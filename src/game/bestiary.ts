// Bestiaire : chaque monstre vaincu s'inscrit ; étoiles à 10 / 100 / 1 000 victoires ; +0,25 % de dégâts par étoile.
import type { GameState } from './types';
import { ACTS, MONSTER_NAMES } from './data/world';

export const STAR_KILLS = [10, 100, 1000];
export const PER_STAR = 0.0025;
export const starsOf = (n: number) => STAR_KILLS.filter(k => n >= k).length;
export function bestiaryRecord(s: GameState, sprite: string) {
  const id = sprite.split('/').pop()!;
  (s.bestiary ??= {})[id] = (s.bestiary[id] ?? 0) + 1;
}
export const totalStars = (s: GameState) => Object.values(s.bestiary ?? {}).reduce((t, n) => t + starsOf(n), 0);
export const bestiaryMult = (s: GameState) => 1 + PER_STAR * totalStars(s);
/** Monstres par Acte (sans doublon). */
export const BESTIARY = ACTS.map(a => ({ act: a, mobs: [...new Set([...a.mobs, ...a.bosses])] }));
export const monsterName = (id: string) => MONSTER_NAMES[id] ?? id.replace(/_/g, ' ');
export const BESTIARY_SIZE = new Set(BESTIARY.flatMap(b => b.mobs)).size;

// Hauts Faits : paliers de succès récompensés en gemmes.
import type { GameState } from '../types';
import { owned, completeFamilies } from '../arcanes';

export interface Achievement { id: string; name: string; desc: string; icon: string; target: number; gems: number; value: (s: GameState) => number }

function tiers(base: string, name: (n: number) => string, desc: (n: number) => string, icon: string, value: (s: GameState) => number,
  targets: number[], gems: number[]): Achievement[] {
  return targets.map((t, i) => ({ id: `${base}_${t}`, name: name(i), desc: desc(t), icon, target: t, gems: gems[i] ?? gems[gems.length - 1], value }));
}
const R = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const fr = (n: number) => n.toLocaleString('fr-FR');

export const ACHIEVEMENTS: Achievement[] = [
  ...tiers('etage', i => `Grimpeur ${R[i]}`, n => `Atteindre l’étage ${n}`, 'icons/next_floor', s => s.bestFloor,
    [25, 50, 75, 100, 140, 180, 250, 300], [5, 10, 10, 20, 20, 40, 50, 80]),
  ...tiers('kills', i => `Chasseur ${R[i]}`, n => `Vaincre ${fr(n)} monstres`, 'icons/combat', s => s.stats.kills,
    [100, 1000, 10000, 100000, 1000000], [5, 10, 20, 40, 80]),
  ...tiers('boss', i => `Tueur de géants ${R[i]}`, n => `Abattre ${fr(n)} boss`, 'icons/elite', s => s.stats.bossKills,
    [10, 100, 1000, 10000], [5, 15, 30, 60]),
  ...tiers('taps', i => `Infatigable ${R[i]}`, n => `Porter ${fr(n)} frappes`, 'icons/force', s => s.stats.taps,
    [1000, 10000, 100000, 1000000], [5, 10, 25, 50]),
  ...tiers('asc', i => `Renaissance ${R[i]}`, n => `Accomplir ${n} Ascension${n > 1 ? 's' : ''}`, 'icons/harmonie', s => s.ascensions,
    [1, 5, 10, 25, 50, 100], [10, 15, 25, 40, 60, 100]),
  ...tiers('dore', i => `Chercheur d’or ${R[i]}`, n => `Attraper ${n} Gobelins dorés`, 'obj/bourse_or', s => s.stats.goldenKills,
    [10, 100, 1000], [5, 15, 40]),
  ...tiers('parade', i => `Bouclier vivant ${R[i]}`, n => `Réussir ${n} parades`, 'icons/defense', s => s.stats.parries,
    [10, 100, 1000], [5, 15, 40]),
  ...tiers('partition', i => `Virtuose ${R[i]}`, n => `Jouer ${fr(n)} Partitions`, 'partitions/accord_parfait', s => s.stats.partitions,
    [50, 500, 5000], [5, 15, 40]),
  ...tiers('butin', i => `Collectionneur ${R[i]}`, n => `Ramasser ${n} objets`, 'obj/sac_a_dos', s => s.stats.items,
    [25, 250, 2500], [5, 15, 40]),
  { id: 'legendaire', name: 'Éclat de légende', desc: 'Trouver un objet Légendaire', icon: 'obj/grimoire_ancien', target: 4, gems: 20, value: s => s.stats.bestRarity },
  { id: 'mythique', name: 'Le mythe', desc: 'Trouver un objet Mythique', icon: 'obj/grimoire_ancien', target: 5, gems: 50, value: s => s.stats.bestRarity },
  ...tiers('compagnons', i => `Rassembleur ${R[i]}`, n => `Recruter ${n} compagnons dans une vie`, 'icons/standard', s => s.run.companions.filter(Boolean).length,
    [5, 15, 30], [5, 15, 40]),
  ...tiers('arcanes', i => `Lecteur d’Arcanes ${R[i]}`, n => `Posséder ${n} Arcanes`, 'icons/grimoire', s => owned(s),
    [5, 20, 41], [10, 25, 60]),
  { id: 'famille', name: 'Jeu complet', desc: 'Compléter une famille d’Arcanes', icon: 'icons/chance', target: 1, gems: 25, value: s => completeFamilies(s).length },
  ...tiers('primes', i => `Chasseur de primes ${R[i]}`, n => `Encaisser ${n} primes`, 'icons/capitale', s => s.stats.bounties,
    [10, 50, 200], [10, 20, 40]),
  ...tiers('repas', i => `Gourmet ${R[i]}`, n => `Manger ${n} plats chez Gaston`, 'icons/cuisine', s => s.stats.meals,
    [5, 30], [10, 20]),
  ...tiers('lettres', i => `Correspondant ${R[i]}`, n => `Ouvrir ${n} lettres de Lysandra`, 'obj/lettre', s => s.stats.letters,
    [10, 100], [10, 25]),
];

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

// ---- Métiers, Jardin, ateliers, couche 2, fin du jeu (ajout)
import { JOBS, type JobId } from './resources';
import { PLANTS } from './garden';
import { SETS } from './forge';
import { FAMILIES } from './arcanes';
import { level } from '../jobs';
import { setComplete } from '../forge';

const jobTiers: Achievement[] = (Object.keys(JOBS) as JobId[]).flatMap(j =>
  tiers(`metier_${j}`, i => `${JOBS[j].name} ${R[i]}`, n => `${JOBS[j].name} niveau ${n}`, JOBS[j].icon, s => level(s, j), [10, 25, 50, 100], [10, 20, 40, 100]));

ACHIEVEMENTS.push(
  ...jobTiers,
  ...tiers('maitres', i => `Maître artisan ${R[i]}`, n => n === 6 ? 'Tous les métiers au niveau 100' : `${n} métier${n > 1 ? 's' : ''} au niveau 100`, 'icons/maitrise',
    s => (Object.keys(JOBS) as JobId[]).filter(j => level(s, j) >= 100).length, [1, 3, 6], [50, 100, 300]),
  ...tiers('kills2', i => `Fléau ${R[i]}`, n => `Vaincre ${fr(n)} monstres`, 'icons/combat', s => s.stats.kills, [10_000_000], [150]),
  ...tiers('or', i => `Fortune ${R[i]}`, n => `Gagner ${n.toExponential(0).replace('e+', '×10^')} or au total`, 'obj/bourse_or', s => s.stats.goldEarned, [1e6, 1e12, 1e24, 1e48], [5, 15, 30, 60]),
  ...tiers('recoltes', i => `Main verte ${R[i]}`, n => `Récolter ${fr(n)} plantes`, 'res/plante_sauvage', s => s.stats.harvests, [50, 500, 5000], [10, 25, 60]),
  ...tiers('mutations', i => `Croiseur ${R[i]}`, n => `Obtenir ${fr(n)} mutation${n > 1 ? 's' : ''}`, 'icons/naturaliste', s => s.stats.mutations, [1, 25, 250, 2500], [5, 15, 40, 100]),
  { id: 'herbier', name: 'Herbier complet', desc: `Découvrir les ${PLANTS.length} plantes`, icon: 'icons/bestiaire', target: PLANTS.length, gems: 80, value: s => s.garden?.known.length ?? 0 },
  ...tiers('potions', i => `Apprenti sorcier ${R[i]}`, n => `Préparer ${fr(n)} potions`, 'potions/potion_violette', s => s.stats.brewed, [10, 100, 1000], [10, 25, 60]),
  ...tiers('bues', i => `Gosier d’acier ${R[i]}`, n => `Boire ${fr(n)} potions`, 'potions/potion_rouge_1', s => s.stats.drunk, [10, 100, 1000], [5, 20, 50]),
  ...tiers('repas2', i => `Fin gourmet ${R[i]}`, n => `Manger ${fr(n)} plats chez Gaston`, 'food/pizza', s => s.stats.meals, [100, 500], [30, 60]),
  ...tiers('expeditions', i => `Explorateur ${R[i]}`, n => `Terminer ${fr(n)} expéditions`, 'icons/carte', s => s.stats.expeditions, [10, 100, 500], [10, 30, 70]),
  ...tiers('ressources', i => `Collecteur ${R[i]}`, n => `Ramasser ${fr(n)} ressources`, 'obj/caisse', s => s.stats.gathered, [100, 1000, 10000, 100000], [5, 15, 40, 80]),
  ...tiers('commandes', i => `Client de Kaelen ${R[i]}`, n => `Passer ${fr(n)} commandes à la Forge`, 'icons/forge', s => s.stats.orders, [10, 100, 1000], [10, 25, 60]),
  ...tiers('panoplies', i => `Panoplie ${R[i]}`, n => n === SETS.length ? 'Compléter toutes les panoplies' : `Compléter ${n} panoplie${n > 1 ? 's' : ''}`, 'equip/heaume_du_juggernaut',
    s => SETS.filter(d => s.forge && setComplete(s, d.id)).length, [1, 3, SETS.length], [20, 50, 120]),
  { id: 'familles', name: 'Grand jeu', desc: 'Compléter toutes les familles d’Arcanes', icon: 'icons/chance', target: Object.keys(FAMILIES).length, gems: 120,
    value: s => completeFamilies(s).length },
  ...tiers('etoiles', i => `Astronome ${R[i]}`, n => `Atteindre ${n} niveaux de Constellations au total`, 'icons/xp', s => Object.values(s.constellations).reduce((a, b) => a + b, 0), [50, 200, 400], [15, 40, 80]),
  ...tiers('calendrier', i => `Fidèle ${R[i]}`, n => `Ouvrir ${n} présents du jour`, 'obj/caisse', s => s.stats.calendar, [7, 30, 100, 365], [10, 30, 70, 200]),
  ...tiers('chasses', i => `Traqueur primordial`, n => `Vaincre les ${n} Bêtes Primordiales`, 'portraits/chasseuse', s => s.stats.hunts, [3], [60]),
  ...tiers('ancres', i => `Ancré ${R[i]}`, n => `Réunir ${n} Ancre${n > 1 ? 's' : ''}`, 'res/plante_sauvage',
    s => [s.anchors?.seedDone, s.anchors && Object.keys(s.anchors.hunts).length >= 3, s.anchors && Object.keys(s.anchors.compass).length >= 3].filter(Boolean).length, [1, 3], [20, 60]),
  ...tiers('resonances', i => `Résonant ${R[i]}`, n => `Accomplir ${n} Résonance${n > 1 ? 's' : ''}`, 'icons/harmonie', s => s.resonance?.count ?? 0, [1, 5, 10, 25], [50, 100, 200, 400]),
  { id: 'seuil', name: 'Plus lourd que la Certitude', desc: 'Franchir le Seuil Harmonique (étage 180)', icon: 'mobs/archange', target: 181, gems: 40, value: s => s.bestFloor },
  { id: 'larry', name: 'Rideau !', desc: 'Vaincre Larry', icon: 'portraits/larry', target: 1, gems: 150, value: s => (s.seenStory.includes('kill:larry') ? 1 : 0) },
  { id: 'echo', name: 'Le Chant', desc: 'Apaiser l’Écho Oublié', icon: 'partitions/accord_parfait', target: 1, gems: 300, value: s => (s.ending?.done ? 1 : 0) },
  ...tiers('silence', i => `Gardien éternel ${R[i]}`, n => `Atteindre l’étage ${n}`, 'icons/next_floor', s => s.bestFloor, [500, 750, 1000], [100, 200, 500]),
);

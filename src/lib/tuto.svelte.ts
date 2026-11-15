// Tutoriel en bulles : une étape à la fois, qui guide vers l'onglet puis vers l'élément (attribut data-tuto).
import type { GameState } from '../game/types';
import * as E from '../game/engine';
import { lootUnlocked } from '../game/items';
import { fiefUnlocked } from '../game/fief';
import { fiefTabOpen } from '../game/data/fief';
import { claimable } from '../game/achievements';
import { owned, drawCost } from '../game/arcanes';
import { anchorsVisible } from '../game/resonance';
import { depthsUnlocked } from '../game/depths';
import { anyPendingTalent } from '../game/talents';
import { G, ui, paused, moment } from './game.svelte';

type SubKey = 'heroTab' | 'fiefTab' | 'ascTab' | 'atelier';
const PREFIX: Record<SubKey, string> = { heroTab: 'hero', fiefTab: 'fief', ascTab: 'asc', atelier: 'atelier' };

export interface Step {
  id: string;
  /** Déclencheur. */
  when: (s: GameState) => boolean;
  /** Onglet et sous-onglets à ouvrir avant d'afficher la bulle finale. */
  tab?: typeof ui.tab; sub?: [SubKey, string][];
  target: string;
  text: string;
  /** Bulle affichée pendant le trajet vers l'onglet (sinon `text`). */
  nav?: string;
  /** Bouton « Compris » sur la bulle finale. */
  ok?: boolean;
  /** Fin automatique. */
  done?: (s: GameState) => boolean;
  /** Déjà connu (anciennes sauvegardes) : passé sans être montré. */
  skip?: (s: GameState) => boolean;
}

const parryOpen = (s: GameState) => s.run.parryUntil > 0 && s.time <= s.run.parryUntil;

export const STEPS: Step[] = [
  { id: 'frappe', when: s => !!s.classId, target: 'battle', text: 'Touchez le monstre pour frapper !',
    done: s => s.stats.taps >= 10 },
  { id: 'heros', when: s => s.run.gold >= E.heroCostN(s, 1), tab: 'compagnons', target: 'hero-up',
    nav: 'Vous avez de l’or ! Ouvrez les Alliés.', text: 'Montez votre héros : chaque niveau rend vos frappes plus fortes.',
    done: s => s.run.heroLevel >= 2, skip: s => s.ascensions > 0 || s.run.heroLevel >= 5 },
  { id: 'allie', when: s => s.run.gold >= E.compCostN(s, 0, 1), tab: 'compagnons', target: 'comp-0',
    text: 'Recrutez un allié : il attaque tout seul, même quand vous ne touchez pas l’écran.',
    done: s => s.run.companions[0] > 0, skip: s => s.ascensions > 0 || s.run.companions.some(l => l > 0) },
  { id: 'compagnie', when: s => s.run.companions.filter(l => l > 0).length >= 3, tab: 'compagnons', target: 'company', ok: true,
    nav: 'Votre escouade est au complet !',
    text: 'Seuls 3 compagnons combattent : le Meneur (♛, aura), le Bras droit et le Soutien (bonus d’équipe). Amis ou rivaux, synergies d’histoire… touchez une place pour composer votre escouade.' },
  { id: 'boss', when: s => s.run.monster.kind === 'boss', target: 'hud', ok: true,
    text: 'Un boss ! Battez-le avant que la Volonté tombe à zéro. Sinon, renforcez-vous et retentez.',
    done: s => s.run.monster.kind !== 'boss', skip: s => s.stats.bossKills > 0 },
  { id: 'partition', when: s => E.partitionUnlocked(s, 0), target: 'partition-0',
    text: 'Nouvelle Partition ! Touchez-la pour lancer un sort. Elle coûte du mana (la barre bleue).',
    done: s => s.stats.partitions > 0 },
  { id: 'parade', when: parryOpen, target: 'parry', text: 'Le boss prépare un coup : touchez « Parer » à temps !',
    done: s => s.stats.parries > 0 || !parryOpen(s) },
  { id: 'sac', when: lootUnlocked, tab: 'heros', sub: [['heroTab', 'sac']], target: 'doll', ok: true,
    nav: 'Kaelen est libre ! Les monstres lâchent maintenant de l’équipement : ouvrez le Sac.',
    text: 'Votre équipement. Touchez un objet pour l’équiper ou le recycler en métal ; le métal sert à l’améliorer (+1, +2…).' },
  { id: 'hautsfaits', when: s => s.bestFloor >= 12 && claimable(s).length > 0, tab: 'heros', sub: [['heroTab', 'hf']], target: 'hero-hf', ok: true,
    nav: 'Haut fait accompli !', text: 'Les Hauts faits rapportent des gemmes : réclamez-les ici.' },
  { id: 'marche', when: s => s.gems >= 30, target: 'gems', text: 'Vos gemmes. Touchez ici pour ouvrir le Marché : bénédictions, objets, récompenses.',
    done: () => ui.shop },
  { id: 'ascension', when: s => E.canAscend(s), tab: 'ascension', target: 'ascend', ok: true,
    nav: 'L’Ascension est possible !',
    text: 'Vous repartez de l’étage 1, mais vos Éclats renforcent tous vos dégâts, pour toujours. Faites-la quand vous bloquez.',
    skip: s => s.ascensions > 0 },
  { id: 'etoiles', when: s => s.ascensions > 0 && s.eclats > 0, tab: 'ascension', sub: [['ascTab', 'rituel']], target: 'stars', ok: true,
    nav: 'Des Éclats à dépenser !', text: 'Les Constellations : dépensez vos Éclats en bonus permanents.', skip: s => s.ascensions > 1,
    done: s => Object.values(s.constellations).some(v => v > 0) },
  { id: 'arcanes', when: s => s.ascensions > 0 && s.eclats >= drawCost(s), tab: 'ascension', sub: [['ascTab', 'arcanes']], target: 'asc-arcanes', ok: true,
    nav: 'Les Arcanes sont ouverts !', text: 'Tirez des cartes d’Arcane avec vos Éclats : des effets permanents à collectionner.', skip: s => owned(s) > 0, done: s => owned(s) > 0 },
  { id: 'fief', when: fiefUnlocked, tab: 'fief', sub: [['fiefTab', 'village']], target: 'fief-village', ok: true,
    nav: 'Pont-la-Croisée vous ouvre ses portes : le Fief est débloqué !',
    text: 'Le Village : primes du jour et coffre quotidien. D’autres lieux ouvriront plus haut.' },
  { id: 'cuisine', when: fiefUnlocked, tab: 'fief', sub: [['fiefTab', 'ateliers'], ['atelier', 'cuisine']], target: 'atelier-cuisine', ok: true,
    nav: 'Gaston ouvre ses fourneaux dans les Ateliers !', text: 'Cuisinez un repas : son bonus dure des heures, même hors-ligne. Les ingrédients viennent des monstres, du Jardin et des expéditions.' },
  { id: 'metiers', when: fiefUnlocked, tab: 'fief', sub: [['fiefTab', 'metiers']], target: 'fief-metiers', ok: true,
    nav: 'Vos métiers vous attendent au Fief.', text: 'Touchez un métier pour voir comment le monter et ce qu’il rapporte. Ils ne se perdent jamais.' },
  { id: 'coffre', when: s => fiefTabOpen(s, 'coffre') && Object.values(s.res).some(v => v > 0), tab: 'fief', sub: [['fiefTab', 'coffre']], target: 'fief-coffre', ok: true,
    nav: 'Des ressources dans le Coffre !', text: 'Le Coffre garde les ressources lâchées par les monstres. Elles servent au Jardin et aux ateliers.' },
  { id: 'jardin', when: s => fiefTabOpen(s, 'jardin'), tab: 'fief', sub: [['fiefTab', 'jardin']], target: 'fief-jardin', ok: true,
    nav: 'Nouveau dans le Fief : le Jardin !',
    text: 'Plantez, récoltez… et placez deux plantes mûres côte à côte : une mutation peut naître sur la case vide voisine. Le combat continue en arrière-plan.' },
  { id: 'expeditions', when: s => fiefTabOpen(s, 'expeditions'), tab: 'fief', sub: [['fiefTab', 'expeditions']], target: 'fief-expeditions', ok: true,
    nav: 'Nouveau dans le Fief : les Expéditions !', text: 'Vos alliés partent récolter bois, pierre et métal, même quand vous ne jouez pas.' },
  { id: 'alchimie', when: s => fiefTabOpen(s, 'alchimie'), tab: 'fief', sub: [['fiefTab', 'ateliers'], ['atelier', 'alchimie']], target: 'atelier-alchimie', ok: true,
    nav: 'Nouveau dans le Fief : l’atelier d’Alaric !', text: 'Alaric transforme vos récoltes en potions : de gros bonus pendant quelques minutes.' },
  { id: 'forge', when: s => fiefTabOpen(s, 'forge'), tab: 'fief', sub: [['fiefTab', 'ateliers'], ['atelier', 'forge']], target: 'atelier-forge', ok: true,
    nav: 'Kaelen ouvre sa forge !', text: 'Commandez l’objet de votre choix, au niveau de l’étage actuel, et forgez les panoplies d’Acte.' },
  { id: 'talent', when: s => anyPendingTalent(s), tab: 'compagnons', target: 'talent', ok: true,
    nav: 'Un compagnon peut choisir un talent !', text: 'Au niveau 100, 200, 300 et 400, choisissez : renforcer ce compagnon, ou donner un bonus à toute l’équipe. Le choix est définitif.' },
  { id: 'bestiaire', when: s => s.bestFloor >= 12 && Object.keys(s.bestiary ?? {}).length >= 6, tab: 'heros', sub: [['heroTab', 'bestiaire']], target: 'hero-bestiaire', ok: true,
    nav: 'Votre Bestiaire se remplit.', text: 'Chaque monstre gagne des étoiles à 10, 100 et 1 000 victoires : +0,25 % de dégâts par étoile, pour toujours.' },
  { id: 'evenement', when: s => fiefUnlocked(s) && !!s.event, tab: 'fief', sub: [['fiefTab', 'village']], target: 'event', ok: true,
    nav: 'Un événement de saison a commencé !', text: 'Affrontez le boss de saison (3 fois par jour) pour gagner des jetons, et échangez-les à la boutique : le trophée donne +3 % de dégâts pour toujours.' },
  { id: 'synergies', when: s => s.ascensions > 0 && owned(s) >= 3, tab: 'ascension', sub: [['ascTab', 'arcanes']], target: 'syn', ok: true,
    nav: 'Vos Arcanes ont des affinités…', text: 'Chaque classe a deux familles d’Arcanes favorites : complétez-les pour un bonus propre à la classe jouée.' },
  { id: 'profondeurs', when: s => depthsUnlocked(s) && s.ascensions > 0, tab: 'ascension', sub: [['ascTab', 'profondeurs']], target: 'asc-profondeurs', ok: true,
    nav: 'Quelque chose respire sous les étages…', text: 'Les Profondeurs : 3 clés par jour, une descente sans fin. Chaque profondeur rapporte des Éclats d’abysse pour des bonus permanents.' },
  { id: 'resonance', when: anchorsVisible, tab: 'ascension', sub: [['ascTab', 'resonance']], target: 'asc-resonance', ok: true,
    nav: 'Les Ancres se révèlent…', text: 'Réunissez les trois Ancres pour la Résonance : un nouveau cycle, bien plus puissant.' },
];

export const tuto = $state({ id: '' as string, target: '', text: '', ok: false });

const OFFER_AFTER = ['sac', 'jardin'];
const isDone = (s: GameState, id: string) => s.tuto.includes(id);
function finish(id: string) {
  if (!isDone(G.s, id)) G.s.tuto.push(id);
  tuto.id = ''; tuto.target = '';
  if (OFFER_AFTER.includes(id)) moment('palier'); // l'offre attendait la fin de ce tuto (Pack de l'Aube, Pack du Jardinier)
}
export function acknowledge() { if (tuto.id) finish(tuto.id); }

/** Appelé ~4 fois par seconde. */
export function tutoTick() {
  const s = G.s;
  if (!s.tuto || !s.classId) return;
  let step = tuto.id ? STEPS.find(x => x.id === tuto.id) : undefined;
  // fin : condition de fin atteinte, ou déclencheur retombé (ex. Éclats tous dépensés) → l'étape ne revient pas en boucle
  if (step && (step.done?.(s) || !step.when(s))) { finish(step.id); step = undefined; }
  if (!step) {
    for (const x of STEPS) {
      if (isDone(s, x.id) || !x.when(s)) continue;
      if (x.skip?.(s) || x.done?.(s)) { s.tuto.push(x.id); continue; }
      step = x; break;
    }
    if (!step) { tuto.id = ''; return; }
    tuto.id = step.id;
  }
  if (paused() || (ui.shop && step.id !== 'marche')) { tuto.target = ''; return; }
  // trajet : onglet, puis sous-onglets, puis l'élément
  if (step.tab && ui.tab !== step.tab) return show(`nav-${step.tab}`, step.nav ?? step.text, false);
  for (const [k, v] of step.sub ?? []) if (ui[k] !== v) return show(`${PREFIX[k]}-${v}`, step.nav ?? step.text, false);
  show(step.target, step.text, !!step.ok);
}
function show(target: string, text: string, ok: boolean) { tuto.target = target; tuto.text = text; tuto.ok = ok; }

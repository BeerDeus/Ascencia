// Couche 2 : Ancres et Résonance (« l'Ascension Finale »).
import { T } from '../tuning';
export const ANCHOR_FLOOR = 250;          // les Ancres se révèlent après le Dragon Ancien
export const SEED_HOURS = 48;
export const SEED_SKIP_GEMS_PER_HOUR = 6;
export const NOYAU_FLOOR = 300;           // la Porte du Noyau : verrouillée avant la 1re Résonance

export interface HuntDef { id: 'leviathan' | 'phenix' | 'loup'; name: string; sprite: string; tint: string; floor: number; hpMult: number; quote: string }
export const HUNTS: HuntDef[] = [
  { id: 'leviathan', name: 'Le Léviathan des Abysses', sprite: 'mobs/shoggoth', tint: 'hue-rotate(170deg) saturate(1.4)', floor: 258, hpMult: 6,
    quote: 'Il dort sous la mer depuis la Fracture. Réveille-le, et frappe avant qu’il ne t’emporte.' },
  { id: 'phenix', name: 'Le Phénix Cendré', sprite: 'mobs/griffon_corrompu', tint: 'sepia(1) saturate(4) hue-rotate(-20deg) brightness(1.1)', floor: 266, hpMult: 6,
    quote: 'Chaque fois qu’on le tue, il renaît de ses cendres. Toi aussi, non ? Vous allez bien vous entendre.' },
  { id: 'loup', name: 'Le Loup-Comète', sprite: 'mobs/loup_dissonant', tint: 'hue-rotate(190deg) saturate(1.6) brightness(1.2)', floor: 274, hpMult: 6,
    quote: 'Il court plus vite que la lumière qu’il laisse derrière lui. Ne cligne pas des yeux.' },
];
export const HUNT_TIME = 40;
export const COMPASS_FLOORS = [255, 265, 275];

// ---- Symphonie (arbre de la Résonance, payé en Fragments d'Écho)
export interface SymNode { id: string; name: string; max: number; base: number; growth: number; desc: (lv: number) => string }
export const SYMPHONY: SymNode[] = [
  { id: 'harmonique', name: 'Harmoniques', max: 200, base: 1, growth: 1.6, desc: lv => { const m = T.harmMult ** lv; return `Tous les dégâts ×${m >= 1e6 ? m.toExponential(1) : Math.round(m).toLocaleString('fr-FR')}`; } },
  { id: 'echo_eclats', name: 'Écho des Éclats', max: 20, base: 2, growth: 1.5, desc: lv => `+${lv * 25} % d’Éclats d’Ascension` },
  { id: 'echo_or', name: 'Pluie d’or', max: 30, base: 1, growth: 1.45, desc: lv => `Or ×${(1 + lv * 0.5).toFixed(1)}` },
  { id: 'depart', name: 'Départ éclair', max: 4, base: 3, growth: 3, desc: lv => `Chaque vie commence à l’étage ${[1, 10, 25, 50, 100][lv]}` },
  { id: 'souvenir', name: 'Souvenir des étoiles', max: 10, base: 2, growth: 1.8, desc: lv => `Chaque cycle commence avec ${souvenirEclats(lv)} Éclats` },
  { id: 'auto_achat', name: 'Mains de Kaelen', max: 1, base: 2, growth: 1, desc: lv => (lv ? 'Achat automatique des compagnons : débloqué' : 'Débloque l’achat automatique des compagnons') },
  { id: 'auto_partitions', name: 'Partitions vivantes', max: 1, base: 3, growth: 1, desc: lv => (lv ? 'Lancement automatique des Partitions : débloqué' : 'Débloque le lancement automatique des Partitions') },
  { id: 'auto_ascension', name: 'Cycle éternel', max: 1, base: 5, growth: 1, desc: lv => (lv ? 'Ascension automatique : débloquée' : 'Débloque l’Ascension automatique quand la progression stagne') },
];
export function souvenirEclats(lv: number) { return lv ? Math.round(20 * lv ** 2.2) : 0; }
export const symCost = (n: SymNode, lv: number) => Math.ceil(n.id === 'harmonique' ? T.harmBase * T.harmGrowth ** lv : n.base * n.growth ** lv);

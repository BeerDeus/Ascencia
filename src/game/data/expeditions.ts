// Expéditions (métier Expéditionnaire) : les compagnons partent récolter pendant qu'on joue — ou qu'on dort.
export interface Zone { id: string; name: string; floor: number; icon: string; perHour: Record<string, number>; metal?: number; desc: string }
export const ZONES: Zone[] = [
  { id: 'foret', name: 'Forêt d’Aubier', floor: 1, icon: 'res/bois', perHour: { bois: 3, herbes: 2, fougere: 1, viande_crue: 0.6 }, desc: 'Bois, herbes et gibier.' },
  { id: 'mine', name: 'Mine Murmurante', floor: 20, icon: 'res/pierre', perHour: { pierre: 3, gemme_verte: 0.3 }, metal: 6, desc: 'Pierre, gemmes et métal.' },
  { id: 'marais', name: 'Marais d’Alaric', floor: 40, icon: 'res/goutte_eau', perHour: { goutte_eau: 2, ciboulette: 2, fleur_blanche: 1 }, desc: 'Eau pure, ciboulette, fleurs blanches.' },
  { id: 'givre', name: 'Montagnes du Givre', floor: 80, icon: 'res/essence_spectrale', perHour: { pierre: 2, goutte_eau: 1, essence_spectrale: 0.6 }, metal: 4, desc: 'Essences spectrales et pierre gelée.' },
  { id: 'breche', name: 'Brèche Instable', floor: 120, icon: 'res/eclats_instables', perHour: { eclats_instables: 1, poussiere_vide: 1, essence_dissonante: 0.5 }, desc: 'Fragments de réalité… et de Dissonance.' },
];
export const DURATIONS = [1, 4, 8];
export const DURATION_BONUS: Record<number, number> = { 1: 1, 4: 1.1, 8: 1.25 };

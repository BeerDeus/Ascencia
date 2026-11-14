export type Branch = 'glaive' | 'meute' | 'grimoire' | 'bourse' | 'sentier';

export interface StarNode {
  id: string;
  branch: Branch;
  name: string;
  max: number;
  base: number;    // coût du niveau 1 (Éclats)
  growth: number;  // multiplicateur de coût par niveau
  per: number;     // valeur par niveau
  desc: (v: number) => string;
  requires?: string;
}

export const BRANCHES: Record<Branch, { name: string; color: string }> = {
  glaive: { name: 'Le Glaive', color: '#ff7a59' },
  meute: { name: 'La Meute', color: '#5fd39a' },
  grimoire: { name: 'Le Grimoire', color: '#7aa8ff' },
  bourse: { name: 'La Bourse', color: '#ffd166' },
  sentier: { name: 'Le Sentier', color: '#c59bff' },
};

const pct = (v: number) => `+${Math.round(v * 100)} %`;

export const STARS: StarNode[] = [
  { id: 'glaive_frappe', branch: 'glaive', name: 'Lame stellaire', max: 100, base: 1, growth: 1.18, per: 0.5, desc: v => `${pct(v)} Frappe` },
  { id: 'glaive_crit', branch: 'glaive', name: 'Œil du Lion', max: 20, base: 3, growth: 1.35, per: 0.01, desc: v => `${pct(v)} chance de critique`, requires: 'glaive_frappe' },
  { id: 'glaive_critdmg', branch: 'glaive', name: 'Coup du Destin', max: 50, base: 4, growth: 1.25, per: 0.25, desc: v => `${pct(v)} dégâts critiques`, requires: 'glaive_crit' },
  { id: 'glaive_ferveur', branch: 'glaive', name: 'Cœur ardent', max: 10, base: 5, growth: 1.6, per: 1, desc: v => `Crescendo +${v} s`, requires: 'glaive_frappe' },

  { id: 'meute_dps', branch: 'meute', name: 'Hurlement', max: 100, base: 1, growth: 1.18, per: 0.5, desc: v => `${pct(v)} dégâts des Compagnons` },
  { id: 'meute_cout', branch: 'meute', name: 'Loyauté', max: 20, base: 3, growth: 1.4, per: 0.02, desc: v => `-${Math.round(v * 100)} % coût des Compagnons`, requires: 'meute_dps' },
  { id: 'meute_frappe', branch: 'meute', name: 'Instinct de meute', max: 25, base: 5, growth: 1.35, per: 0.01, desc: v => `La Frappe inclut ${pct(v)} du DPS`, requires: 'meute_dps' },

  { id: 'grimoire_mana', branch: 'grimoire', name: 'Source', max: 20, base: 2, growth: 1.3, per: 10, desc: v => `+${v} mana max et régénération`, },
  { id: 'grimoire_cd', branch: 'grimoire', name: 'Tempo', max: 20, base: 3, growth: 1.35, per: 0.025, desc: v => `-${Math.round(v * 100)} % recharge des Partitions`, requires: 'grimoire_mana' },
  { id: 'grimoire_puissance', branch: 'grimoire', name: 'Virtuose', max: 50, base: 3, growth: 1.25, per: 0.2, desc: v => `${pct(v)} puissance des Partitions`, requires: 'grimoire_mana' },

  { id: 'bourse_or', branch: 'bourse', name: 'Pièce d’étoile', max: 100, base: 1, growth: 1.18, per: 0.25, desc: v => `${pct(v)} or` },
  { id: 'bourse_offline', branch: 'bourse', name: 'Rêve doré', max: 7, base: 4, growth: 1.7, per: 0.1, desc: v => `${pct(v)} gains hors-ligne`, requires: 'bourse_or' },
  { id: 'bourse_dore', branch: 'bourse', name: 'Fortune', max: 20, base: 3, growth: 1.35, per: 0.005, desc: v => `+${(v * 100).toFixed(1)} % de Gobelins dorés`, requires: 'bourse_or' },

  { id: 'sentier_volonte', branch: 'sentier', name: 'Volonté de fer', max: 15, base: 2, growth: 1.4, per: 2, desc: v => `+${v} s de Volonté face aux boss` },
  { id: 'sentier_memoire', branch: 'sentier', name: 'Mémoire du chemin', max: 5, base: 6, growth: 2.2, per: 0.05, desc: v => `Commencer à ${Math.round(v * 100)} % du record`, requires: 'sentier_volonte' },
  { id: 'sentier_elan', branch: 'sentier', name: 'Élan', max: 10, base: 5, growth: 1.6, per: 0.04, desc: v => `${Math.round(v * 100)} % de chance de sauter des étages`, requires: 'sentier_volonte' },
  { id: 'sentier_somnambule', branch: 'sentier', name: 'Somnambule', max: 1, base: 25, growth: 1, per: 1, desc: () => 'Gravir des étages hors-ligne', requires: 'sentier_memoire' },
];

export const STAR_BY_ID = Object.fromEntries(STARS.map(s => [s.id, s]));

export function starCost(s: StarNode, level: number): number {
  return Math.ceil(s.base * s.growth ** level);
}

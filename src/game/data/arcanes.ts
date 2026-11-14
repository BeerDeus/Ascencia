// Arcanes : cartes permanentes (assets/cards), piochées et améliorées avec les Éclats.
export type ArcEffect =
  | 'frappe' | 'comp' | 'all' | 'or' | 'crit' | 'critdmg' | 'bosshp' | 'bosstime' | 'mana' | 'regen' | 'cd'
  | 'offline' | 'golden' | 'eclats' | 'loot' | 'power' | 'start' | 'ferveur' | 'elan' | 'metal';

export type Family = 'tarot' | 'vents' | 'astres' | 'temps' | 'betes' | 'reliques' | 'divins';

export const FAMILIES: Record<Family, { name: string; color: string }> = {
  tarot: { name: 'Tarot', color: '#d9b45b' },
  vents: { name: 'Quatre Vents', color: '#8fc4c9' },
  astres: { name: 'Astres', color: '#a487d6' },
  temps: { name: 'Temps', color: '#c9a27a' },
  betes: { name: 'Bêtes célestes', color: '#86b25c' },
  reliques: { name: 'Reliques', color: '#b9c2c9' },
  divins: { name: 'Divins', color: '#e05656' },
};

/** Bonus de famille complète : tous les dégâts ×1,5 par famille. */
export const FAMILY_BONUS = 0.5;

interface EffDef { per: number; max: number; fmt: (v: number) => string }
const p = (v: number) => `${Math.round(v * 100)} %`;
export const EFFECTS: Record<ArcEffect, EffDef> = {
  frappe: { per: 0.25, max: 9999, fmt: v => `+${p(v)} Frappe` },
  comp: { per: 0.25, max: 9999, fmt: v => `+${p(v)} dégâts des Compagnons` },
  all: { per: 0.1, max: 9999, fmt: v => `+${p(v)} tous les dégâts` },
  or: { per: 0.2, max: 9999, fmt: v => `+${p(v)} or` },
  crit: { per: 0.005, max: 20, fmt: v => `+${(v * 100).toFixed(1)} % critique` },
  critdmg: { per: 0.2, max: 100, fmt: v => `+${p(v)} dégâts critiques` },
  bosshp: { per: 0.02, max: 25, fmt: v => `-${p(v)} PV des boss` },
  bosstime: { per: 0.5, max: 20, fmt: v => `+${v.toFixed(1)} s de Volonté` },
  mana: { per: 5, max: 40, fmt: v => `+${v} mana max` },
  regen: { per: 0.1, max: 20, fmt: v => `+${p(v)} régénération de mana` },
  cd: { per: 0.015, max: 20, fmt: v => `-${p(v)} recharge des Partitions` },
  offline: { per: 0.05, max: 10, fmt: v => `+${p(v)} gains hors-ligne` },
  golden: { per: 0.003, max: 20, fmt: v => `+${(v * 100).toFixed(1)} % de Gobelins dorés` },
  eclats: { per: 0.05, max: 50, fmt: v => `+${p(v)} Éclats d’Ascension` },
  loot: { per: 0.05, max: 40, fmt: v => `+${p(v)} chances de butin` },
  power: { per: 0.1, max: 50, fmt: v => `+${p(v)} puissance des Partitions` },
  start: { per: 0.01, max: 10, fmt: v => `Commencer à +${p(v)} du record` },
  ferveur: { per: 0.05, max: 20, fmt: v => `+${p(v)} gain de Ferveur` },
  elan: { per: 0.01, max: 10, fmt: v => `+${p(v)} chance de Fulgurance` },
  metal: { per: 0.1, max: 20, fmt: v => `+${p(v)} métal au recyclage` },
};

export interface ArcaneDef { id: string; name: string; family: Family; effect: ArcEffect; quote: string }
export const ARCANES: ArcaneDef[] = [
  { id: 'magicien', name: 'Le Magicien', family: 'tarot', effect: 'power', quote: 'Tout est déjà sur la table.' },
  { id: 'pretresse', name: 'La Prêtresse', family: 'tarot', effect: 'regen', quote: 'Le silence, aussi, est une note.' },
  { id: 'imperatrice', name: 'L’Impératrice', family: 'tarot', effect: 'comp', quote: 'Ce qui est nourri grandit.' },
  { id: 'empereur', name: 'L’Empereur', family: 'tarot', effect: 'frappe', quote: 'La main qui frappe gouverne.' },
  { id: 'force', name: 'La Force', family: 'tarot', effect: 'critdmg', quote: 'Dompter, puis déchaîner.' },
  { id: 'fortune', name: 'La Roue de Fortune', family: 'tarot', effect: 'or', quote: 'Elle tourne. Toujours.' },
  { id: 'jugement', name: 'Le Jugement', family: 'tarot', effect: 'bosshp', quote: 'Chaque faute sera pesée.' },
  { id: 'monde', name: 'Le Monde', family: 'tarot', effect: 'all', quote: 'La boucle se referme.' },
  { id: 'heraut', name: 'Le Héraut', family: 'tarot', effect: 'ferveur', quote: 'Sonnez, trompettes !' },
  { id: 'notos', name: 'Notos', family: 'vents', effect: 'or', quote: 'Le vent du sud apporte l’or.' },
  { id: 'boreas', name: 'Borée', family: 'vents', effect: 'bosstime', quote: 'Le froid fige le temps.' },
  { id: 'zephyr', name: 'Zéphyr', family: 'vents', effect: 'cd', quote: 'Léger. Rapide. Encore.' },
  { id: 'eurus', name: 'Eurus', family: 'vents', effect: 'elan', quote: 'Le vent d’est pousse vers le haut.' },
  { id: 'lune_sang', name: 'Lune de sang', family: 'astres', effect: 'crit', quote: 'Les nuits rouges ne pardonnent pas.' },
  { id: 'soleil_noir', name: 'Soleil noir', family: 'astres', effect: 'all', quote: 'Une lumière qui brûle à l’envers.' },
  { id: 'etoile_mourante', name: 'Étoile mourante', family: 'astres', effect: 'eclats', quote: 'Sa mort éclaire mille vies.' },
  { id: 'orbe', name: 'L’Orbe', family: 'astres', effect: 'mana', quote: 'Un monde dans la paume.' },
  { id: 'deesse_nuit', name: 'Déesse de la Nuit', family: 'astres', effect: 'offline', quote: 'Dors. Je veille.' },
  { id: 'grain_passe', name: 'Grain du passé', family: 'temps', effect: 'start', quote: 'Le chemin se souvient de toi.' },
  { id: 'flux_present', name: 'Flux du présent', family: 'temps', effect: 'regen', quote: 'Maintenant. Et maintenant.' },
  { id: 'vision_futur', name: 'Vision du futur', family: 'temps', effect: 'loot', quote: 'J’ai vu ce que tu trouveras.' },
  { id: 'echo_eternite', name: 'Écho d’éternité', family: 'temps', effect: 'eclats', quote: 'Rien ne se perd vraiment.' },
  { id: 'griffon_solaire', name: 'Griffon solaire', family: 'betes', effect: 'frappe', quote: 'Il plonge avec le soleil.' },
  { id: 'loup_stellaire', name: 'Loup stellaire', family: 'betes', effect: 'comp', quote: 'La meute court entre les étoiles.' },
  { id: 'faucon_comete', name: 'Faucon-comète', family: 'betes', effect: 'crit', quote: 'Il ne rate jamais deux fois.' },
  { id: 'chimere_nebuleuse', name: 'Chimère nébuleuse', family: 'betes', effect: 'golden', quote: 'Elle attire ce qui brille.' },
  { id: 'leviathan', name: 'Léviathan', family: 'betes', effect: 'bosshp', quote: 'Les abysses dévorent les géants.' },
  { id: 'titan_sismique', name: 'Titan sismique', family: 'betes', effect: 'critdmg', quote: 'Le sol tremble à chaque coup.' },
  { id: 'colosse', name: 'Le Colosse', family: 'betes', effect: 'bosstime', quote: 'Immobile. Inébranlable.' },
  { id: 'gardien', name: 'Le Gardien', family: 'betes', effect: 'comp', quote: 'Nul ne touche aux miens.' },
  { id: 'bouclier_fele', name: 'Bouclier fêlé', family: 'reliques', effect: 'bosstime', quote: 'Fêlé, pas brisé.' },
  { id: 'epee_brisee', name: 'Épée brisée', family: 'reliques', effect: 'frappe', quote: 'Même brisée, elle coupe.' },
  { id: 'couronne', name: 'La Couronne', family: 'reliques', effect: 'or', quote: 'Lourde est la tête…' },
  { id: 'sceptre', name: 'Le Sceptre', family: 'reliques', effect: 'power', quote: 'Il dirige la mélodie.' },
  { id: 'enclume', name: 'L’Enclume', family: 'reliques', effect: 'metal', quote: 'Kaelen l’aurait adorée.' },
  { id: 'marteau', name: 'Le Marteau', family: 'reliques', effect: 'loot', quote: 'Frappe, et le butin tombe.' },
  { id: 'souffle_dragon', name: 'Souffle du dragon', family: 'reliques', effect: 'all', quote: 'Une flamme sans fin.' },
  { id: 'dieu_guerre', name: 'Dieu de la Guerre', family: 'divins', effect: 'frappe', quote: 'Il n’y a que la bataille.' },
  { id: 'dieu_chaos', name: 'Dieu du Chaos', family: 'divins', effect: 'all', quote: 'Larry prie devant lui.' },
  { id: 'vide_affame', name: 'Le Vide affamé', family: 'divins', effect: 'eclats', quote: 'Il a faim de légendes.' },
  { id: 'gardien_ancien', name: 'Gardien ancien', family: 'divins', effect: 'bosshp', quote: 'Le premier, le dernier.' },
];
export const ARCANE_BY_ID = Object.fromEntries(ARCANES.map(a => [a.id, a]));

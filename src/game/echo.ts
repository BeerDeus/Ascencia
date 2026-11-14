// Combat final : le Chant contre l'Écho Oublié.
// Alternance de « Néant » (la Volonté fond, on touche les îlots de mémoire pour tenir)
// et de « Chant » (une mélodie de Partitions s'affiche, il faut la rejouer). 6 couplets.

export const ROUNDS = [
  { len: 3, ms: 750 }, { len: 3, ms: 700 }, { len: 4, ms: 650 }, { len: 4, ms: 600 }, { len: 5, ms: 560 }, { len: 6, ms: 520 },
];
export const VOID_SECONDS = 5;
export const MEMORIES = [
  { sprite: 'portraits/kaelen', text: 'Le visage de Kaelen, penché sur son enclume.' },
  { sprite: 'portraits/gaston', text: 'Le goût d’un ragoût de Gaston, un soir de pluie.' },
  { sprite: 'portraits/lysandra', text: 'La voix de Lysandra : « Le monde est une symphonie. »' },
  { sprite: 'portraits/elian', text: 'Maître Elian aux portes d’Aubier, le premier jour.' },
  { sprite: 'portraits/alaric', text: 'Une fiole qui explose chez Alaric. Tout le monde avait ri.' },
  { sprite: 'portraits/chasseuse', text: 'Le regard de la Chasseuse : enfin, du respect.' },
  { sprite: 'portraits/silas', text: 'Silas, qui pardonne enfin à son élève… presque.' },
];
export const VERSES = [
  'Vous chantez la rage de vos combats. L’Écho tressaille.',
  'Vous chantez la chaleur d’Aubier. Le Néant recule d’un pas.',
  'Vous chantez la douleur de la défaite. L’Écho écoute.',
  'Vous chantez la joie de votre première Ascension. Quelque chose répond.',
  'Vous chantez tous ceux qui vous attendent. Le Silence se fissure.',
  'Vous chantez l’histoire imparfaite et magnifique du monde. L’Écho se souvient.',
];

export interface Island { id: number; x: number; y: number; mem: number; until: number }
export interface EchoFight {
  phase: 'intro' | 'show' | 'input' | 'void' | 'won' | 'lost';
  round: number; silence: number; volonte: number;
  seq: number[]; shown: number; input: number; t: number;
  islands: Island[]; nextIsland: number; islandId: number; lines: string[];
}

export function newFight(): EchoFight {
  return { phase: 'intro', round: 0, silence: 100, volonte: 100, seq: [], shown: 0, input: 0, t: 0, islands: [], nextIsland: 0, islandId: 0,
    lines: ['Des vagues de Néant déferlent. Tenez bon, puis chantez.'] };
}

function startVoid(f: EchoFight) { f.phase = 'void'; f.t = 0; f.nextIsland = 0.3; }
function startSong(f: EchoFight, rnd: () => number) {
  const r = ROUNDS[f.round];
  f.seq = Array.from({ length: r.len }, () => Math.floor(rnd() * 5));
  f.phase = 'show'; f.shown = 0; f.input = 0; f.t = 0; f.islands = [];
}
export function begin(f: EchoFight) { if (f.phase === 'intro') startVoid(f); }

/** Partition allumée pendant la démonstration (ou -1). */
export function lit(f: EchoFight): number {
  if (f.phase !== 'show') return -1;
  const ms = ROUNDS[f.round].ms / 1000, k = Math.floor(f.t / ms) - 1;
  return k >= 0 && k < f.seq.length && f.t - (k + 1) * ms < ms * 0.7 ? f.seq[k] : -1;
}

export function tick(f: EchoFight, dt: number, rnd: () => number) {
  if (f.phase === 'intro' || f.phase === 'won' || f.phase === 'lost') return;
  f.t += dt;
  if (f.phase === 'void') {
    f.volonte -= (5 + f.round * 1.2) * dt;
    f.islands = f.islands.filter(i => i.until > f.t);
    if (f.t >= f.nextIsland) {
      f.islands.push({ id: ++f.islandId, x: 0.1 + rnd() * 0.75, y: 0.15 + rnd() * 0.6, mem: Math.floor(rnd() * MEMORIES.length), until: f.t + 1.5 });
      f.nextIsland = f.t + 0.55 + rnd() * 0.35;
    }
    if (f.t >= VOID_SECONDS) startSong(f, rnd);
  } else if (f.phase === 'show') {
    const ms = ROUNDS[f.round].ms / 1000;
    if (f.t >= ms * (f.seq.length + 1)) { f.phase = 'input'; f.t = 0; }
  } else if (f.phase === 'input') {
    f.volonte -= 1.5 * dt;
  }
  if (f.volonte <= 0) { f.volonte = 0; f.phase = 'lost'; }
}

export function tapIsland(f: EchoFight, id: number): number {
  const i = f.islands.findIndex(x => x.id === id);
  if (i < 0 || f.phase !== 'void') return -1;
  const mem = f.islands[i].mem;
  f.islands.splice(i, 1);
  f.volonte = Math.min(100, f.volonte + 12);
  return mem;
}

/** Le joueur joue une Partition pendant le Chant. */
export function press(f: EchoFight, i: number): 'ok' | 'fail' | 'verse' | 'won' | null {
  if (f.phase !== 'input') return null;
  if (f.seq[f.input] !== i) {
    f.volonte -= 20;
    if (f.volonte <= 0) { f.volonte = 0; f.phase = 'lost'; return 'fail'; }
    f.phase = 'show'; f.shown = 0; f.input = 0; f.t = 0;
    return 'fail';
  }
  f.input++;
  if (f.input < f.seq.length) return 'ok';
  f.silence = Math.max(0, f.silence - 100 / ROUNDS.length);
  f.lines.push(VERSES[f.round]);
  f.round++;
  if (f.round >= ROUNDS.length) { f.phase = 'won'; return 'won'; }
  startVoid(f);
  return 'verse';
}

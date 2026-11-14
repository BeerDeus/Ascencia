// Musique procédurale : chaque frappe est une note (gamme pentatonique de l'Acte).
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = true;
let key = 261.63;
let step = 0;
let lastNote = 0;
const PENTA = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2];

export function setSound(on: boolean) { enabled = on; }
export function setKey(hz: number) { key = hz; }

function ac(): AudioContext | null {
  if (!enabled) return null;
  if (!ctx) {
    const C = window.AudioContext || (window as any).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
    master = ctx.createGain();
    master.gain.value = 0.32;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}
export function unlockAudio() { ac(); }

function tone(freq: number, dur: number, type: OscillatorType, vol: number, delay = 0) {
  const c = ac(); if (!c || !master) return;
  const t = c.currentTime + delay;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master);
  o.start(t); o.stop(t + dur + 0.02);
}

/** Frappe : marche aléatoire dans la gamme → mélodie. */
export function noteTap(crit: boolean) {
  const now = performance.now();
  if (now - lastNote < 45) return; // limite la polyphonie
  lastNote = now;
  step = Math.max(0, Math.min(PENTA.length - 1, step + [-2, -1, 1, 1, 2][Math.floor(Math.random() * 5)]));
  const f = key * PENTA[step];
  tone(f, 0.22, 'triangle', 0.35);
  tone(f * 2, 0.08, 'sine', 0.08);
  if (crit) { tone(f * 5 / 4, 0.35, 'triangle', 0.2); tone(f * 3 / 2, 0.4, 'sine', 0.2); }
}
export function sfxKill() { tone(key * 4, 0.3, 'sine', 0.12); }
export function sfxGold() { [3, 4, 5].forEach((m, i) => tone(key * PENTA[m] * 2, 0.15, 'square', 0.04, i * 0.05)); }
export function sfxBoss() { [0, 2, 3, 5, 7].forEach((m, i) => tone(key * PENTA[m], 0.5, 'triangle', 0.25, i * 0.08)); }
export function sfxUp() { [0, 2, 4, 5].forEach((m, i) => tone(key * PENTA[m] * 2, 0.25, 'sine', 0.18, i * 0.06)); }
export function sfxCrescendo() { [0, 1, 2, 3, 4, 5, 6, 7].forEach((m, i) => tone(key * PENTA[m], 0.2, 'sawtooth', 0.06, i * 0.035)); }
export function sfxAttack() { tone(key / 2, 0.5, 'sawtooth', 0.12); tone(key / 2 * Math.SQRT2, 0.5, 'sawtooth', 0.1); }
export function sfxParry() { tone(key * 3, 0.15, 'square', 0.12); tone(key * 4.5, 0.25, 'triangle', 0.15, 0.03); }
export function sfxFail() { [5, 3, 1, 0].forEach((m, i) => tone(key * PENTA[m] / 2, 0.35, 'triangle', 0.2, i * 0.12)); }
export function sfxPartition() { tone(key * 2, 0.6, 'sine', 0.2); tone(key * 3, 0.6, 'sine', 0.15, 0.05); tone(key * 5 / 2, 0.6, 'sine', 0.12, 0.1); }
export function sfxAscend() { for (let i = 0; i < 12; i++) tone(key * PENTA[i % 8] * (1 + Math.floor(i / 8)), 0.8, 'sine', 0.14, i * 0.09); }

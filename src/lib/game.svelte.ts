import * as E from '../game/engine';
import type { GameEvent, GameState } from '../game/types';
import type { OfflineReport } from '../game/engine';
import { actFor } from '../game/data/world';
import * as A from './audio';
import { buzz, storeSave, readSaves, onAppState, setHaptics } from './native';
import { account, initCloud, onAuth, pullSave, pushSave, type CloudSave } from './cloud.svelte';
import { RARITIES } from '../game/data/items';
import { PARTITIONS } from '../game/data/heroes';
import { dailyCheck, fiefUnlocked } from '../game/fief';
import { questsCheck } from '../game/quests';
import { eventCheck } from '../game/events';
import { JOBS, JOB_STAT, type JobId } from '../game/data/resources';
import { level } from '../game/jobs';
import { JOB_INFO } from '../game/jobinfo';
import { shopCheck, calendarReady, pendingOffer, stuckOffer } from '../game/shop';
import type { Pack } from '../game/data/shop';
import { adUi } from './ads.svelte';
import { newlyDone } from '../game/achievements';
import { gardenTick, gardenUnlocked } from '../game/garden';
import { PLANT_BY_ID } from '../game/data/garden';
import { askNotifications, scheduleReturnHooks, cancelReturnHooks } from './notify';

export const G = $state<{ s: GameState }>({ s: E.newGame() });

export const ui = $state({
  ready: false,
  tab: 'compagnons' as 'chronique' | 'heros' | 'compagnons' | 'fief' | 'ascension' | 'options',
  heroTab: 'heros' as 'heros' | 'sac' | 'bestiaire' | 'hf',
  ascTab: 'rituel' as 'rituel' | 'arcanes' | 'resonance',
  atelier: 'cuisine' as 'cuisine' | 'alchimie' | 'forge',
  fiefTab: 'village' as 'village' | 'jardin' | 'ateliers' | 'expeditions' | 'coffre' | 'metiers',
  buyMult: 1 as 1 | 10 | 25 | 0, // 0 = Max
  scenes: [] as string[],
  offline: null as OfflineReport | null,
  classPicker: null as null | 'start' | 'ascension',
  ritual: 0,
  conflict: null as CloudSave | null,
  shop: false,
  echo: false,
  calendar: false,
  offer: null as Pack | null,
  messenger: false,
  spell: null as number | null, // fiche d'une Partition (appui long ou déblocage)
  spellNew: false,
  talent: null as number | null, // choix de talent d'un allié
  job: null as null | import('../game/data/resources').JobId, // fiche d'un métier
  info: null as null | { kind: 'res' | 'potion' | 'meal'; id: string }, // fiche d'un objet (appui long)
  toasts: [] as { id: number; text: string; kind: string }[],
  banner: null as null | { id: number; title: string; sub: string; kind: 'victoire' | 'crescendo' | 'record' | 'metier' },
});

type Listener = (e: GameEvent) => void;
const listeners = new Set<Listener>();
export function onGameEvent(fn: Listener) { listeners.add(fn); return () => listeners.delete(fn); }

let toastId = 0, lastCrescendo = -1e9; // la bannière Crescendo au plus toutes les 20 s
/** Grande bannière non bloquante pour les moments forts. */
export function banner(title: string, sub: string, kind: NonNullable<typeof ui.banner>['kind']) {
  const id = ++toastId;
  ui.banner = { id, title, sub, kind };
  setTimeout(() => { if (ui.banner?.id === id) ui.banner = null; }, kind === 'crescendo' ? 1400 : 2400);
}
export function toast(text: string, kind = 'info') {
  const id = ++toastId;
  ui.toasts.push({ id, text, kind });
  if (ui.toasts.length > 3) ui.toasts.shift();
  setTimeout(() => { const i = ui.toasts.findIndex(t => t.id === id); if (i >= 0) ui.toasts.splice(i, 1); }, 2600);
}

export const paused = () => ui.scenes.length > 0 || !!ui.classPicker || !!ui.offline || ui.ritual > 0 || !!ui.conflict
  || ui.calendar || !!ui.offer || ui.messenger || adUi.open || ui.echo || ui.spell !== null || ui.job !== null || ui.info !== null || ui.talent !== null;

// ---------------------------------------------------------------- effets des événements
function handle(e: GameEvent) {
  const s = G.s;
  switch (e.type) {
    case 'hit': if (e.tap || e.crit) A.noteTap(e.crit); if (e.crit) buzz('light'); break;
    case 'kill':
      if (e.monster.kind === 'boss') { A.sfxBoss(); buzz('medium'); if (e.monster.story) banner('Victoire !', e.monster.name, 'victoire'); }
      else if (e.monster.kind === 'golden') { A.sfxGold(); buzz('medium'); toast('Gobelin doré ! Or ×20', 'gold'); }
      else A.sfxKill();
      break;
    case 'floor': A.setKey(actFor(e.floor).key); bossFails = 0; spellUnlockCheck(s);
      if (e.floor === s.bestFloor && e.floor % 25 === 0 && e.floor > 25) banner(`Étage ${e.floor}`, 'Nouveau record !', 'record'); if (MOMENT_FLOORS.some(f => e.floor >= f && e.floor - e.skipped - 1 < f)) moment('palier'); break;
    case 'boss-attack': A.sfxAttack(); buzz('heavy'); break;
    case 'parry': A.sfxParry(); buzz('medium'); break;
    case 'boss-fail': A.sfxFail(); if (++bossFails >= 3) { bossFails = 0; moment('bloque'); } break;
    case 'crescendo': A.sfxCrescendo(); buzz('heavy'); if (performance.now() - lastCrescendo > 20000) { lastCrescendo = performance.now(); banner('Crescendo !', 'Frappes ×2', 'crescendo'); } break;
    case 'partition': A.sfxPartition(); break;
    case 'milestone': A.sfxUp(); toast(`Palier ${e.level} atteint !`, 'up'); break;
    case 'heavy': buzz('heavy'); break;
    case 'loot': if (e.item.rarity >= 3) { toast(`${RARITIES[e.item.rarity].name} : ${e.item.name}`, e.item.rarity >= 4 ? 'crit' : 'up'); A.sfxUp(); } break;
    case 'story': ui.scenes.push(e.id); if (/^(kill:|ascension:|resonance:|defeat:)/.test(e.id)) moment('histoire'); break;
    case 'hunt':
      if (e.id === 'saison') { if (e.won) banner('Victoire !', 'Boss de saison : +15 jetons', 'victoire'); else toast('Le boss de saison s’échappe…', 'info'); }
      else toast(e.won ? 'Bête Primordiale vaincue !' : 'La Bête s’échappe…', e.won ? 'crit' : 'info');
      if (e.won) A.sfxBoss(); break;
    case 'auto-ascend': toast(`Ascension automatique : +${e.gain} Éclats`, 'up'); A.sfxAscend(); break;
  }
  if (e.type === 'story' && e.id === 'defeat:chef_doeuvre') ui.tab = 'ascension';
  void s;
}

function flush() {
  for (const e of E.drainEvents()) { handle(e); listeners.forEach(l => l(e)); }
}

// ---------------------------------------------------------------- actions (passent par ici pour vider les événements)
export function act<T>(fn: (s: GameState) => T): T {
  const r = fn(G.s);
  flush();
  return r;
}

// ---------------------------------------------------------------- sauvegarde
let lastPersist = 0;
export async function persist() {
  lastPersist = performance.now();
  const json = E.serialize(G.s);
  await storeSave(json);
  if (account.user && Date.now() - lastCloud > 120_000) cloudPush(json);
}

// ---------------------------------------------------------------- cloud
let lastCloud = 0;
const summary = () => ({ bestFloor: G.s.bestFloor, legende: G.s.legende, ascensions: G.s.ascensions, playSeconds: G.s.stats.playSeconds, lastSave: G.s.lastSave });
export async function cloudPush(json = E.serialize(G.s)) {
  lastCloud = Date.now();
  try { await pushSave(json, summary()); } catch (e: any) { account.error = 'Synchro impossible : ' + (e?.code ?? e?.message ?? e); }
}
async function reconcile() {
  try {
    const cloud = await pullSave();
    const local = G.s;
    const fresh = local.bestFloor <= 1 && local.ascensions === 0;
    if (!cloud) { await cloudPush(); return; }
    if (fresh) { useCloud(cloud); return; }
    if (cloud.lastSave > local.lastSave + 5000 && (cloud.bestFloor !== local.bestFloor || cloud.legende !== local.legende)) ui.conflict = cloud;
    else await cloudPush();
  } catch (e: any) { account.error = 'Synchro impossible : ' + (e?.code ?? e?.message ?? e); }
}
export function useCloud(c: CloudSave) {
  const g = E.deserialize(c.data);
  if (g) { G.s = g; ui.classPicker = g.classId ? null : 'start'; ui.scenes = []; applySettings(); storeSave(E.serialize(G.s)); }
  ui.conflict = null;
}
export function keepLocal() { ui.conflict = null; cloudPush(); }

function applySettings() {
  A.setSound(G.s.settings.sound);
  setHaptics(G.s.settings.haptics);
  A.setKey(actFor(G.s.run.floor).key);
}

function checkOffline() {
  const away = (Date.now() - G.s.lastSave) / 1000;
  const rep = E.applyOffline(G.s, away);
  if (rep && (rep.gold > 0 || rep.floors > 0)) ui.offline = rep;
  G.s.lastSave = Date.now();
  flush();
}

// ---------------------------------------------------------------- quotidien, offres
function daily() {
  for (const a of newlyDone(G.s)) toast(`Haut fait : ${a.name} !`, 'crit');
  if (gardenUnlocked(G.s)) for (const e of gardenTick(G.s)) {
    if (e.kind === 'mutation') toast(`Mutation au Jardin : ${PLANT_BY_ID[e.plant].name} !`, 'crit');
    else if (e.kind === 'dissonance') toast('Une plante du Jardin devient dissonante…', 'info');
  }
  const pass = shopCheck(G.s);
  if (pass) toast(`Bénédiction de Lysandra : +${pass} gemmes`, 'gold');
  if (paused() || !G.s.classId) return;
  if (calendarReady(G.s) && G.s.bestFloor >= 5) { ui.calendar = true; return; }
}

// ---------------------------------------------------------------- offres au bon moment
// Une offre ne surgit jamais au hasard : seulement après un moment marquant (boss de l'histoire, palier franchi,
// Ascension, Résonance) une fois les dialogues fermés, ou en « coup de pouce » après 3 échecs de suite contre un boss.
const MOMENT_FLOORS = [10, 26, 50, 100, 180, 300];
let bossFails = 0;
let pendingMoment: null | { kind: 'palier' | 'histoire' | 'bloque'; at: number } = null;
/** Nouvelle Partition débloquée : sa fiche s'ouvre une fois. */
function spellUnlockCheck(s: GameState) {
  if (ui.spell !== null || !s.tuto) return;
  const i = PARTITIONS.findIndex((p, k) => E.partitionUnlocked(s, k) && !s.tuto.includes('sort:' + p.id));
  if (i >= 0) { s.tuto.push('sort:' + PARTITIONS[i].id); ui.spellNew = true; ui.spell = i; }
}
export function moment(kind: 'palier' | 'histoire' | 'bloque') {
  if (!pendingMoment || kind !== 'bloque') pendingMoment = { kind, at: performance.now() };
}
function offerMomentCheck(now: number) {
  if (!pendingMoment || paused() || now - pendingMoment.at < 1200) return;
  const kind = pendingMoment.kind;
  pendingMoment = null;
  const fief = gardenUnlocked(G.s);
  const offer = pendingOffer(G.s, fief) ?? (kind === 'bloque' ? stuckOffer(G.s, fief, Date.now()) : undefined);
  if (offer) { (G.s.shop.offersShownAt ??= {})[offer.id] = Date.now(); ui.offer = offer; }
}

// ---------------------------------------------------------------- boucle
const STEP = 0.1;
let acc = 0, last = 0, hiddenAt = 0;
function frame(now: number) {
  const dt = Math.min(1, (now - last) / 1000);
  last = now;
  if (!paused()) {
    acc += dt;
    while (acc >= STEP) { E.tick(G.s, STEP); acc -= STEP; }
    flush();
  }
  offerMomentCheck(now);
  jobWatch(now);
  if (now - lastPersist > 10000) { dailyCheck(G.s); questsCheck(G.s); eventCheck(G.s); daily(); persist(); }
  requestAnimationFrame(frame);
}

// Métiers : annonce chaque niveau, en grand quand un palier se débloque
const jobSeen: Partial<Record<JobId, number>> = {};
let lastJobCheck = 0;
function jobWatch(now: number) {
  if (now - lastJobCheck < 1000) return;
  lastJobCheck = now;
  for (const j of Object.keys(JOBS) as JobId[]) {
    const lv = level(G.s, j), before = jobSeen[j];
    jobSeen[j] = lv;
    if (before === undefined || lv <= before) continue;
    const ms = JOB_INFO[j].milestones.find(m => m.lv > before && m.lv <= lv);
    if (ms) banner(`${JOBS[j].name} niv. ${lv}`, ms.text, 'metier');
    else toast(`${JOBS[j].name} niv. ${lv} · +${Math.round(lv * JOB_STAT[j].per * 100)} % ${JOB_STAT[j].label.toLowerCase()}`, 'up');
  }
}

export async function boot() {
  const saves = (await readSaves()).map(E.deserialize).filter((x): x is GameState => !!x);
  saves.sort((a, b) => b.lastSave - a.lastSave);
  if (saves[0]) G.s = saves[0];
  applySettings();
  if (!G.s.classId) {
    if (!G.s.seenStory.includes('start')) { G.s.seenStory.push('start'); ui.scenes.push('start'); }
    ui.classPicker = 'start';
  } else {
    checkOffline();
  }
  onAppState(active => {
    if (!active) { hiddenAt = Date.now(); lastCloud = 0; persist(); scheduleReturnHooks(G.s); }
    else {
      cancelReturnHooks();
      if (hiddenAt && Date.now() - hiddenAt > 60_000) { G.s.lastSave = hiddenAt; checkOffline(); }
    }
  });
  window.addEventListener('pagehide', () => persist());
  onAuth(u => { if (u) reconcile(); });
  initCloud();
  ui.ready = true;
  last = performance.now();
  requestAnimationFrame(frame);
}

export function chooseClass(id: 'guerrier' | 'archer' | 'mage') {
  const mode = ui.classPicker;
  ui.classPicker = null;
  if (mode === 'start') {
    G.s.classId = id;
    E.newRun(G.s, 1);
    E.log(G.s, 'story', '— Acte I : L’Éveil —');
    askNotifications();
  } else if (mode === 'ascension') {
    ui.ritual = E.ascensionGain(G.s);
    A.sfxAscend();
    buzz('heavy');
    E.ascend(G.s, id);
    setTimeout(() => { ui.ritual = 0; flush(); moment('histoire'); }, 2800);
  }
  A.setKey(actFor(G.s.run.floor).key);
  persist();
}

export function updateSettings() { applySettings(); persist(); }

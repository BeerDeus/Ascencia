import { now } from './clock';
import type { ClassId, GameEvent, GameState, Monster, RunState, ChronicleKind } from './types';
import * as F from './formulas';
import { T } from './tuning';
import { COMPANIONS, PARTITIONS, MILESTONE_TITLES, MILESTONES } from './data/heroes';
import { actFor, monsterName, storyBossAt, SEUIL_HARMONIQUE } from './data/world';
import { STAR_BY_ID, starCost } from './data/constellations';
import { fmt } from './format';
import * as I from './items';
import { arc, familyMult, synergy } from './arcanes';
import * as Fi from './fief';
import * as Sh from './shop';
import * as Rz from './resonance';
import * as Jb from './jobs';
import * as Q from './quests';
import * as Tl from './talents';
import * as Be from './bestiary';
import * as Dp from './depths';
import * as Co from './company';
import * as Ev from './events';
import { potion } from './crafting';
import { wornSetBonus, permanentSetMult } from './forge';
import { newGarden, harvest as harvestPlot } from './garden';
import { FAMILY_DROPS, DEFAULT_DROP, STORY_RARES } from './data/resources';
import { AUBE_BY_ID, AUBE_ROLL, GEM_ITEMS } from './data/packs';
import { PACKS, BLESSINGS } from './data/shop';
import { POTION_BY_ID } from './data/crafting';
import { HUNTS, HUNT_TIME, COMPASS_FLOORS, NOYAU_FLOOR } from './data/resonance';
import { CALENDAR, PARTITION_REFILL_COST, BOUNTY_REROLL_COST } from './data/shop';
import { RARITIES } from './data/items';
import { SCENE_BY_ID, LARRY_QUIPS, LARRY_ON, KILL_LINES, BOSS_LINES } from './data/story';

export const SAVE_VERSION = 1;
const CHRONICLE_MAX = 60;
const GOLDEN_FROM = 3;
const GOLDEN_TIME = 6;
export const OFFLINE_CAP_SECONDS = 8 * 3600;
const OFFLINE_CAP = OFFLINE_CAP_SECONDS;

// ---------------------------------------------------------------- événements
let queue: GameEvent[] = [];
export function drainEvents(): GameEvent[] { const q = queue; queue = []; return q; }
function emit(e: GameEvent) { queue.push(e); if (queue.length > 200) queue.shift(); }

let rnd: () => number = Math.random;
export function setRandom(fn: () => number) { rnd = fn; }
const pick = <T,>(a: T[]): T => a[Math.floor(rnd() * a.length)];

// ---------------------------------------------------------------- création
export function newGame(): GameState {
  const s: GameState = {
    version: SAVE_VERSION, time: 0, lastSave: now(), classId: null,
    run: null as unknown as RunState,
    eclats: 0, legende: 0, ascensions: 0, ascensionUnlocked: false, bestFloor: 1,
    mastery: { guerrier: 0, archer: 0, mage: 0 },
    constellations: {}, seenStory: [], chronicle: [],
    settings: { sound: true, haptics: true, notation: 'lettres', autoAdvance: true, notifications: true },
    stats: { kills: 0, bossKills: 0, taps: 0, goldEarned: 0, playSeconds: 0, goldenKills: 0, partitions: 0, items: 0, bestRarity: -1, bounties: 0, meals: 0, letters: 0, parries: 0,
      harvests: 0, mutations: 0, brewed: 0, drunk: 0, expeditions: 0, orders: 0, pieces: 0, gathered: 0, calendar: 0, hunts: 0 },
    ending: { done: false, path: null, attempts: 0 },
    achievements: {}, achSeen: [],
    nextLarryAt: 600, metal: 0, itemSeq: 0, heritage: null,
    arcanes: {}, daily: null as unknown as Fi.Daily, meal: null,
    gems: 0, shop: Sh.newShop(), messenger: null, nextMessengerAt: 240,
    anchors: Rz.newAnchors(), resonance: Rz.newResonance(),
    jobs: {}, res: {}, garden: newGarden(), potions: {}, buffs: {}, expeditions: [], forge: { sets: {} }, vault: [], tuto: [],
  };
  s.run = newRun(s, 1);
  Fi.dailyCheck(s); Q.questsCheck(s); Ev.eventCheck(s); Dp.depthsCheck(s);
  return s;
}

export function newRun(s: GameState, startFloor: number): RunState {
  const run: RunState = {
    floor: startFloor, wave: 0, maxFloor: startFloor, gold: 0, heroLevel: 1,
    companions: COMPANIONS.map(() => 0), mana: 0, farming: false,
    monster: null as unknown as Monster, bossTime: 0, bossAttackIn: 0, parryUntil: 0,
    ferveur: 0, lastTapAt: -10, crescendoUntil: 0,
    cooldowns: PARTITIONS.map(() => 0), activeUntil: PARTITIONS.map(() => 0),
    tapsTotal: 0, scriptedDefeat: false, inventory: [], equipped: {},
  };
  s.run = run;
  restoreVault(s);
  run.mana = stats(s).manaMax;
  run.monster = spawnMob(s);
  return run;
}

// ---------------------------------------------------------------- stats dérivées
export const star = (s: GameState, id: string) => (s.constellations[id] ?? 0) * (STAR_BY_ID[id]?.per ?? 0);
const active = (s: GameState, id: string) => {
  const i = PARTITIONS.findIndex(p => p.id === id);
  return s.time < s.run.activeUntil[i];
};

export interface Stats {
  tap: number; dps: number; critChance: number; critMult: number; goldMult: number;
  manaMax: number; manaRegen: number; bossTime: number; autoTaps: number; power: number;
  global: number; seuilBlocked: boolean;
}

export function masteryBonus(s: GameState): number {
  return 1 + 0.02 * (F.masteryLevel(s.mastery.guerrier) + F.masteryLevel(s.mastery.archer) + F.masteryLevel(s.mastery.mage));
}

export function companionsDps(s: GameState): number {
  let d = 0;
  s.run.companions.forEach((l, i) => { d += F.compDps(i, l) * Tl.ownMult(s, i) * Co.memberMult(s, i); });
  return d * (1 + star(s, 'meute_dps')) * Co.harmonyMult(s);
}

// Cache optionnel (simulateur uniquement) : valable tant que la vie, l'heure de jeu et l'étage ne changent pas.
let statsCacheOn = false, cacheKey: [unknown, number, number] | null = null, cacheVal: Stats | null = null;
export function setStatsCache(on: boolean) { statsCacheOn = on; cacheKey = null; }
export function invalidateStats() { cacheKey = null; }

export function stats(s: GameState): Stats {
  if (statsCacheOn) {
    if (cacheKey && cacheVal && cacheKey[0] === s.run && cacheKey[1] === s.time && cacheKey[2] === s.run.floor) return cacheVal;
    cacheVal = computeStats(s); cacheKey = [s.run, s.time, s.run.floor];
    return cacheVal;
  }
  return computeStats(s);
}

function computeStats(s: GameState): Stats {
  const r = s.run, c = s.classId;
  const g = I.gearTotals(s), sb = wornSetBonus(s), tb = Tl.teamBonus(s), sy = synergy(s), au = Co.aura(s);
  const meal = Fi.mealActive(s);
  const power = (1 + sy.power + au.power + star(s, 'grimoire_puissance') + arc(s, 'power') + sb.power + (s.ending?.path === 'lier' ? 0.5 : 0)) * (c === 'mage' ? 1.5 : 1);
  let global = F.legendeMult(s.legende) * masteryBonus(s) * (1 + arc(s, 'all')) * familyMult(s) * (1 + (meal?.all ?? 0)) * (s.shop && Sh.blessing(s, 'force') ? 2 : 1) * (s.shop && Sh.blessing(s, 'furie') ? 3 : 1) * (s.resonance ? Rz.harmonicMult(s) : 1) * (1 + potion(s, 'all')) * (1 + potion(s, 'all3')) * (1 + sb.all) * (s.forge ? permanentSetMult(s) : 1) * (s.ending?.path === 'lier' ? 3 : 1) * Jb.jobMult(s, 'chasseur') * Be.bestiaryMult(s) * Ev.trophyMult(s) * (1 + Dp.depthNode(s, 'degats'));
  if (r && active(s, 'accord')) global *= 1 + 4 * power;
  const comp = r ? companionsDps(s) * Jb.jobMult(s, 'expedition') * (1 + tb.comp) * (1 + g.comp) * (1 + arc(s, 'comp')) * (1 + (meal?.comp ?? 0)) * (1 + potion(s, 'comp')) * (1 + sb.comp) : 0;
  let tapMult = Jb.jobMult(s, 'forgeron') * (1 + tb.frappe) * (1 + sy.frappe) * (1 + star(s, 'glaive_frappe')) * (1 + g.frappe) * (1 + arc(s, 'frappe')) * (1 + (meal?.frappe ?? 0)) * (1 + potion(s, 'frappe')) * (1 + sb.frappe) * (c === 'guerrier' ? 2 : 1);
  if (r && active(s, 'crescendo')) tapMult *= 1 + 2 * power;
  if (r && s.time < r.crescendoUntil) tapMult *= T.crescendoMult;
  const share = 0.03 + star(s, 'meute_frappe');
  const tap = ((r ? F.frappeBase(r.heroLevel) : 1) * tapMult + share * comp) * global;
  const seuilBlocked = !!r && r.floor === SEUIL_HARMONIQUE.floor && r.wave === 10 && s.legende < T.seuilLegende;
  return {
    tap, dps: comp * global, power, global, seuilBlocked,
    critChance: Math.min(0.75, 0.02 + tb.crit + sy.crit + au.crit + g.crit + arc(s, 'crit') + (meal?.crit ?? 0) + potion(s, 'crit') + sb.crit + star(s, 'glaive_crit') + (c === 'archer' ? 0.08 : 0)),
    critMult: 4 * Jb.jobMult(s, 'alchimiste') * (1 + sy.critdmg) * (1 + star(s, 'glaive_critdmg')) * (1 + g.critdmg) * (1 + arc(s, 'critdmg')) * (1 + sb.critdmg) * (c === 'archer' ? 1.3 : 1),
    goldMult: Jb.jobMult(s, 'jardinier') * (1 + Dp.depthNode(s, 'or')) * (1 + star(s, 'bourse_or')) * (1 + g.or) * (1 + arc(s, 'or')) * (1 + (meal?.or ?? 0)) * (s.shop && Sh.blessing(s, 'or') ? 2 : 1) * (s.resonance ? Rz.symGoldMult(s) : 1) * (1 + potion(s, 'or')) * (1 + sb.or) * (s.ending?.path === 'sceller' ? 3 : 1),
    manaMax: Math.round(100 + g.mana + arc(s, 'mana') + star(s, 'grimoire_mana')) + (c === 'mage' ? 50 : 0),
    manaRegen: (1 + star(s, 'grimoire_mana') / 100 + arc(s, 'regen')) * (1 + potion(s, 'regen')) * (c === 'mage' ? 2 : 1),
    bossTime: Math.round((T.bossTime + tb.volonte + au.volonte + Dp.depthNode(s, 'volonte') + star(s, 'sentier_volonte') + g.volonte + arc(s, 'bosstime') + (meal?.volonte ?? 0) + potion(s, 'volonte') + sb.volonte + (s.ending?.path === 'sceller' ? 10 : 0)) * 10) / 10,
    autoTaps: (c === 'archer' ? 1 + Math.floor((r?.heroLevel ?? 0) / 150) : 0) + (r && active(s, 'staccato') ? 10 * power : 0) + (s.shop && Sh.blessing(s, 'mains') ? 8 : 0) + (s.shop && Sh.blessing(s, 'frenesie') ? 20 : 0),
  };
}

// ---------------------------------------------------------------- chronique
export function log(s: GameState, kind: ChronicleKind, text: string) {
  const id = (s.chronicle[s.chronicle.length - 1]?.id ?? 0) + 1;
  s.chronicle.push({ id, kind, text });
  if (s.chronicle.length > CHRONICLE_MAX) s.chronicle.splice(0, s.chronicle.length - CHRONICLE_MAX);
}
function story(s: GameState, id: string) {
  if (!SCENE_BY_ID[id] || s.seenStory.includes(id)) return;
  s.seenStory.push(id);
  emit({ type: 'story', id });
}
function larry(s: GameState, lines: string[], chance = 1) {
  if (rnd() < chance) log(s, 'larry', `Larry : « ${pick(lines)} »`);
}

// ---------------------------------------------------------------- monstres
function spawnMob(s: GameState): Monster {
  const r = s.run, act = actFor(r.floor);
  const goldenChance = r.floor >= GOLDEN_FROM ? 0.03 + star(s, 'bourse_dore') + arc(s, 'golden') : 0;
  if (rnd() < goldenChance) {
    const hp = F.mobHp(r.floor) * 1.5;
    return { sprite: 'mobs/gobelin_vulnerable', name: 'Gobelin doré', kind: 'golden', hp, maxHp: hp, fleeAt: s.time + GOLDEN_TIME };
  }
  const sprite = 'mobs/' + pick(act.mobs);
  const hp = F.mobHp(r.floor) * (0.9 + rnd() * 0.2);
  return { sprite, name: monsterName(sprite), kind: 'mob', hp, maxHp: hp };
}

/** Part des dégâts qui traverse la Certitude du Gardien Harmonique (1 = tout passe). */
export function certitude(s: GameState): number {
  return Math.min(1, (s.legende / T.seuilLegende) ** 1.5);
}

export const bossHpMult = (s: GameState) => 1 - Math.min(0.5, arc(s, 'bosshp'));

function spawnBoss(s: GameState): Monster {
  const r = s.run, st = stats(s), sb = storyBossAt(r.floor);
  r.bossTime = st.bossTime;
  r.bossAttackIn = 6 + rnd() * 4;
  story(s, `boss:${r.floor}`);
  if (r.floor === SEUIL_HARMONIQUE.floor && certitude(s) < 1)
    log(s, 'fail', `La Certitude du Gardien absorbe ${Math.round((1 - certitude(s)) * 100)} % de vos coups. Votre légende ne pèse pas encore assez.`);
  if (sb) {
    // défaite scénarisée une seule fois (elle débloque l'Ascension) ; ensuite, boss normal (PV ×2)
    if (sb.id === 'chef_doeuvre' && s.ascensions === 0 && !s.ascensionUnlocked) {
      r.scriptedDefeat = true;
      r.bossTime = 15;
      return { sprite: sb.sprite, name: sb.name, kind: 'boss', hp: Infinity, maxHp: Infinity, story: sb.id };
    }
    const hp = F.bossFloorHp(r.floor) * bossHpMult(s);
    const locked = sb.id === 'porte_noyau' && s.resonance.count === 0;
    if (locked) log(s, 'fail', 'La Porte du Noyau est scellée de l’intérieur. Vos coups glissent sur elle sans laisser de trace.');
    return { sprite: sb.sprite, name: sb.name, kind: 'boss', hp, maxHp: hp, story: sb.id, locked };
  }
  const sprite = 'mobs/' + pick(actFor(r.floor).bosses);
  const hp = F.bossFloorHp(r.floor) * bossHpMult(s);
  return { sprite, name: monsterName(sprite), kind: 'boss', hp, maxHp: hp };
}

// ---------------------------------------------------------------- dégâts
export function damage(s: GameState, amount: number, crit = false, isTap = false, auto = false) {
  const m = s.run.monster;
  if (!m || m.hp <= 0) return;
  if (m.locked) amount = 0;
  else if (m.kind === 'boss' && !m.hunt && s.run.floor === SEUIL_HARMONIQUE.floor) amount *= certitude(s); // la Certitude du Gardien absorbe les coups
  m.hp -= amount;
  emit({ type: 'hit', amount, crit, tap: isTap, auto });
  if (m.hp <= 0) kill(s);
}

function rollTap(s: GameState, st: Stats, mult = 1, isTap = true) {
  const crit = rnd() < st.critChance;
  damage(s, st.tap * mult * (crit ? st.critMult : 1), crit, isTap);
}

export function tap(s: GameState) {
  const r = s.run;
  if (!s.classId) return;
  const st = stats(s);
  r.tapsTotal++; s.stats.taps++; Fi.count(s, 'taps');
  r.lastTapAt = s.time;
  if (s.time >= r.crescendoUntil) {
    r.ferveur += (s.classId === 'guerrier' ? T.ferveurGainWar : T.ferveurGain) * (1 + arc(s, 'ferveur') + synergy(s).ferveur);
    if (r.ferveur >= 100) {
      r.ferveur = 0; cacheKey = null;
      r.crescendoUntil = s.time + T.crescendoDur + star(s, 'glaive_ferveur');
      emit({ type: 'crescendo' });
      log(s, 'crit', 'CRESCENDO ! La Ferveur double vos frappes.');
    }
  }
  if (s.classId === 'guerrier' && r.tapsTotal % 100 === 0) {
    emit({ type: 'heavy' });
    rollTap(s, st, 40);
    return;
  }
  rollTap(s, st);
}

function kill(s: GameState) {
  const r = s.run, m = r.monster, st = stats(s);
  cacheKey = null;
  s.stats.kills++; Fi.count(s, 'kills'); if (m.kind !== 'golden') Be.bestiaryRecord(s, m.sprite);
  if (m.hunt) { endHunt(s, true); return; }
  resourceDrop(s, m);
  if (m.kind === 'boss') {
    const gold = F.bossGold(r.floor) * st.goldMult;
    addGold(s, gold);
    s.stats.bossKills++; Fi.count(s, 'bosses'); Co.gainAffinity(s);
    log(s, 'boss', pick(BOSS_LINES).replace('{m}', m.name) + ` (+${fmt(gold)} or)`);
    emit({ type: 'kill', monster: m, gold });
    if (m.story) story(s, `kill:${m.story}`);
    const ci = COMPASS_FLOORS.indexOf(r.floor);
    if (ci >= 0 && !s.anchors.compass[r.floor] && Rz.anchorsVisible(s)) {
      s.anchors.compass[r.floor] = true;
      log(s, 'story', `Pièce du Compas Stellaire (${Object.values(s.anchors.compass).filter(Boolean).length}/3)`);
      if (Rz.destinyDone(s)) story(s, 'ancre:destinee');
    }
    if (I.lootUnlocked(s) && (m.story || rnd() < 0.5 * lootMult(s))) drop(s, m.story ? 2 : 0, m.story ? 1 : 0);
    advanceFloor(s);
    return;
  }
  let gold = F.mobGold(r.floor) * st.goldMult;
  if (m.kind === 'golden') {
    gold *= 20; s.stats.goldenKills++; Fi.count(s, 'golden');
    if (I.lootUnlocked(s) && rnd() < 0.3) drop(s, 1);
    log(s, 'gold', `Le Gobelin doré lâche sa bourse : +${fmt(gold)} or !`);
    larry(s, LARRY_ON.golden, 0.4);
  } else if (rnd() < 0.18) {
    log(s, 'kill', pick(KILL_LINES).replace('{m}', m.name));
  }
  addGold(s, gold);
  emit({ type: 'kill', monster: m, gold });
  if (m.kind === 'mob' && I.lootUnlocked(s) && rnd() < 0.03 * lootMult(s)) drop(s);
  r.wave++;
  if (r.farming) {
    if (r.wave >= F.MOBS_PER_FLOOR) {
      r.wave = 0;
      if (s.settings.autoAdvance && !r.scriptedDefeat) { challengeBoss(s); return; }
    }
    r.monster = spawnMob(s);
  } else if (r.wave >= F.MOBS_PER_FLOOR) {
    r.wave = F.MOBS_PER_FLOOR;
    r.monster = spawnBoss(s);
  } else {
    r.monster = spawnMob(s);
  }
}

/** Ressources de monstres (métier Chasseur). */
function resourceDrop(s: GameState, m: Monster) {
  if (!s.res) return;
  const lv = Jb.level(s, 'chasseur');
  if (m.story && STORY_RARES[m.story]) { Jb.give(s, STORY_RARES[m.story], 1); log(s, 'loot', `Ressource rare : ${STORY_RARES[m.story].replace(/_/g, ' ')}`); }
  const chance = m.kind === 'boss' ? 1 : m.kind === 'golden' ? 0 : 0.08 * (1 + lv * 0.02);
  if (rnd() >= chance) return;
  const id = m.sprite.split('/').pop()!;
  const res = FAMILY_DROPS.find(([re]) => re.test(id))?.[1] ?? DEFAULT_DROP;
  Jb.give(s, res, m.kind === 'boss' ? 2 + Math.floor(lv / 25) : 1);
  Jb.addXp(s, 'chasseur', m.kind === 'boss' ? 4 : 1);
}

const lootMult = (s: GameState) => (1 + arc(s, 'loot') + Dp.depthNode(s, 'butin')) * (Sh.blessing(s, 'butin') ? 2 : 1);

function drop(s: GameState, minRarity = 0, bonus = 0) {
  const rar = Math.min(5, I.rollRarity(s.run.floor, rnd, minRarity) + (rnd() < 0.25 ? bonus : 0));
  const it = I.makeItem(s, s.run.floor, rar, rnd);
  const lost = I.addItem(s, it);
  Fi.count(s, 'loot'); s.stats.items++; s.stats.bestRarity = Math.max(s.stats.bestRarity, it.rarity);
  emit({ type: 'loot', item: it });
  log(s, rar >= 3 ? 'crit' : 'loot', `Butin : ${it.name} [${RARITIES[rar].name}]`);
  if (lost) log(s, 'info', `Sac plein : ${lost.name} recyclé en métal.`);
}

function addGold(s: GameState, g: number) { s.run.gold += g; s.stats.goldEarned += g; }

function advanceFloor(s: GameState) {
  const r = s.run;
  let skip = 0;
  const elan = star(s, 'sentier_elan') + arc(s, 'elan');
  if (elan && rnd() < elan) skip = 1 + Math.floor(rnd() * Math.min(5, 1 + ((s.constellations['sentier_elan'] ?? 0) + (s.arcanes['eurus'] ?? 0)) / 2));
  // on ne saute jamais un boss scénarisé
  for (let k = 1; k <= skip; k++) if (storyBossAt(r.floor + k)) { skip = k - 1; break; }
  const from = r.floor;
  r.floor += 1 + skip;
  r.wave = 0; r.farming = false; r.scriptedDefeat = false;
  s.mastery[s.classId!] += 1 + skip;
  if (r.floor > r.maxFloor) r.maxFloor = r.floor;
  for (let f = from + 1; f <= r.floor; f++) {
    if (f > s.bestFloor) { s.bestFloor = f; story(s, `floor:${f}`); }
    const act = actFor(f);
    if (f === act.from) log(s, 'story', `— ${act.title} : ${act.subtitle} —`);
  }
  emit({ type: 'floor', floor: r.floor, skipped: skip });
  if (skip) log(s, 'up', `FULGURANCE ! Vous gravissez ${skip + 1} étages d'un coup.`);
  r.monster = spawnMob(s);
}

export function challengeBoss(s: GameState) {
  const r = s.run;
  if (r.wave === F.MOBS_PER_FLOOR && r.monster.kind === 'boss') return;
  r.farming = false;
  r.wave = F.MOBS_PER_FLOOR;
  r.monster = spawnBoss(s);
}

function bossFailed(s: GameState) {
  const r = s.run, m = r.monster;
  emit({ type: 'boss-fail' });
  if (m.hunt) { endHunt(s, false); return; }
  if (m.locked) story(s, 'noyau');
  if (r.scriptedDefeat) {
    r.scriptedDefeat = false;
    s.ascensionUnlocked = true;
    story(s, 'defeat:chef_doeuvre');
    log(s, 'fail', `${m.name} vous écrase. L'Ascension est désormais possible.`);
  } else {
    log(s, 'fail', `Votre Volonté flanche face à ${m.name}. Repli à l'entraînement.`);
    if (r.floor === SEUIL_HARMONIQUE.floor && s.legende < T.seuilLegende) story(s, 'seuil');
    else larry(s, LARRY_ON.bossFail, 0.5);
  }
  r.farming = true;
  r.wave = 0;
  r.monster = spawnMob(s);
}

export function parry(s: GameState): boolean {
  const r = s.run;
  if (!r.parryUntil || s.time > r.parryUntil) return false;
  r.parryUntil = 0; s.stats.parries++;
  emit({ type: 'parry' });
  log(s, 'crit', 'Parade ! Riposte dévastatrice.');
  rollTap(s, stats(s), 10, false);
  return true;
}

// ---------------------------------------------------------------- boucle
export function tick(s: GameState, dt: number) {
  if (!s.classId) return;
  const r = s.run;
  s.time += dt;
  s.stats.playSeconds += dt;
  const st = stats(s);

  r.mana = Math.min(st.manaMax, r.mana + st.manaRegen * dt);
  if (s.time - r.lastTapAt > 1 && r.ferveur > 0) r.ferveur = Math.max(0, r.ferveur - T.ferveurDecay * dt);

  // dégâts continus (compagnons + tirs auto)
  if (st.dps > 0) damage(s, st.dps * dt);
  if (st.autoTaps > 0) {
    const n = st.autoTaps * dt;
    const crit = rnd() < st.critChance;
    damage(s, st.tap * n * (crit ? st.critMult : 1), crit, false, true);
  }

  const m = r.monster;
  if (m.kind === 'golden' && m.fleeAt && s.time >= m.fleeAt) {
    emit({ type: 'golden-escape' });
    log(s, 'info', 'Le Gobelin doré s’échappe en ricanant…');
    larry(s, LARRY_ON.goldenEscape, 0.3);
    r.monster = spawnMob(s);
  }
  if (m.kind === 'boss') {
    r.bossTime -= dt;
    // attaques spéciales parables
    if (r.parryUntil && s.time > r.parryUntil) {
      r.parryUntil = 0;
      r.bossTime -= 3;
      log(s, 'fail', `${m.name} frappe : -3 s de Volonté.`);
    }
    const immune = s.time < r.activeUntil[PARTITIONS.findIndex(p => p.id === 'cantique')];
    r.bossAttackIn -= dt;
    if (r.bossAttackIn <= 0 && !immune && !r.parryUntil) {
      r.bossAttackIn = 7 + rnd() * 4;
      r.parryUntil = s.time + 1.1;
      emit({ type: 'boss-attack' });
    }
    if (r.bossTime <= 0) bossFailed(s);
  }

  if (r.maxFloor !== r.lastRecord) { r.lastRecord = r.maxFloor; r.lastRecordAt = s.time; }
  if (Math.floor(s.time / 2) !== Math.floor((s.time - dt) / 2)) automate(s);

  // Messager de Lysandra : une lettre traverse l'écran de temps en temps
  if (s.messenger && s.time > s.messenger.until) { s.messenger = null; s.nextMessengerAt = s.time + 150 + rnd() * 150; }
  if (!s.messenger && s.time >= s.nextMessengerAt && s.bestFloor >= 5) { s.messenger = { until: s.time + 9 }; emit({ type: 'messenger' }); }

  if (s.time >= s.nextLarryAt) {
    s.nextLarryAt = s.time + 480 + rnd() * 360;
    if (s.bestFloor >= 26) larry(s, LARRY_QUIPS);
  }
}

// ---------------------------------------------------------------- achats
export function heroCostN(s: GameState, n: number) { return F.heroCost(s.run.heroLevel, n); }
export function heroMax(s: GameState) {
  return F.geomMax(F.HERO_COST_BASE * F.HERO_COST_GROWTH ** s.run.heroLevel, F.HERO_COST_GROWTH, s.run.gold);
}
export function buyHero(s: GameState, n: number): boolean {
  const c = heroCostN(s, n);
  if (n <= 0 || c > s.run.gold) return false;
  s.run.gold -= c; s.run.heroLevel += n;
  return true;
}

export const compDiscount = (s: GameState) => star(s, 'meute_cout');
export function compUnlocked(s: GameState, i: number) { return i === 0 || s.run.companions[i - 1] > 0; }
export function compCostN(s: GameState, i: number, n: number) {
  return F.compCost(i, s.run.companions[i], n, compDiscount(s));
}
export function compMax(s: GameState, i: number) {
  const first = F.compRecruit(i) * F.COMP_COST_GROWTH ** s.run.companions[i] * (1 - compDiscount(s));
  return F.geomMax(first, F.COMP_COST_GROWTH, s.run.gold);
}
export function buyComp(s: GameState, i: number, n: number): boolean {
  if (n <= 0 || !compUnlocked(s, i)) return false;
  const c = compCostN(s, i, n);
  if (c > s.run.gold) return false;
  const before = s.run.companions[i];
  s.run.gold -= c; s.run.companions[i] += n;
  if (before === 0) log(s, 'up', `${COMPANIONS[i].name} rejoint votre cause : « ${COMPANIONS[i].quote} »`);
  if (Co.leaderOf(s) < 0) Co.setLeader(s, i);           // premier recruté = meneur par défaut
  for (let k = 0; k < MILESTONES.length; k++) {
    const t = MILESTONES[k];
    if (before < t && s.run.companions[i] >= t) {
      emit({ type: 'milestone', comp: i, level: t });
      log(s, 'up', `${COMPANIONS[i].name} atteint le rang ${MILESTONE_TITLES[k]} ! Dégâts ×${t < 200 ? 2.5 : 3}`);
    }
  }
  return true;
}

// ---------------------------------------------------------------- Partitions
export function partitionUnlocked(s: GameState, i: number) { return s.bestFloor >= PARTITIONS[i].unlock; }
export function castPartition(s: GameState, i: number): boolean {
  const r = s.run, p = PARTITIONS[i], st = stats(s);
  if (!partitionUnlocked(s, i) || s.time < r.cooldowns[i] || r.mana < p.mana) return false;
  r.mana -= p.mana; cacheKey = null;
  r.cooldowns[i] = s.time + p.cd * Math.max(0.3, 1 - star(s, 'grimoire_cd') - arc(s, 'cd') - synergy(s).cd);
  const dur = p.duration * (s.classId === 'mage' ? 1.5 : 1);
  if (dur) r.activeUntil[i] = s.time + dur;
  emit({ type: 'partition', index: i }); Fi.count(s, 'partitions'); s.stats.partitions++;
  log(s, 'info', `♪ ${p.name} !`);
  if (p.id === 'trille') {
    damage(s, 10 * (st.dps + st.tap * 5) * st.power * (s.classId === 'mage' ? 2 : 1), true, false);
  } else if (p.id === 'cantique' && r.monster.kind === 'boss') {
    r.bossTime = Math.min(st.bossTime, r.bossTime + st.bossTime * 0.5);
    r.parryUntil = 0;
  }
  return true;
}

// ---------------------------------------------------------------- Messager, boutique
export type MessengerReward = { kind: 'or' | 'metal' | 'gemmes' | 'mana'; amount: number };
/** Ouvre la lettre du Messager. `mult` = 3 si le joueur a regardé une pub. */
export function claimMessenger(s: GameState, mult = 1): MessengerReward | null {
  if (!s.messenger) return null;
  s.messenger = null; s.stats.letters++;
  s.nextMessengerAt = s.time + 150 + rnd() * 150;
  const x = rnd();
  let rw: MessengerReward;
  if (x < 0.55) rw = { kind: 'or', amount: F.mobGold(s.run.floor) * 60 * stats(s).goldMult * mult };
  else if (x < 0.75) rw = { kind: 'mana', amount: stats(s).manaMax };
  else if (x < 0.93) rw = { kind: 'metal', amount: Math.round((10 + s.bestFloor / 5) * mult) };
  else rw = { kind: 'gemmes', amount: 2 * mult };
  if (rw.kind === 'or') addGold(s, rw.amount);
  else if (rw.kind === 'mana') s.run.mana = rw.amount;
  else if (rw.kind === 'metal') s.metal += rw.amount;
  else s.gems += rw.amount;
  log(s, 'gold', `Une lettre de Lysandra : ${rw.kind === 'mana' ? 'mana restauré' : `+${fmt(rw.amount)} ${rw.kind === 'or' ? 'or' : rw.kind === 'metal' ? 'métal' : 'gemmes'}`}.`);
  return rw;
}

/** Coffre du marchand (récompense publicitaire) : un objet rare ou mieux. */
export function merchantChest(s: GameState) {
  const it = I.makeItem(s, s.run.floor, I.rollRarity(s.run.floor + 40, rnd, 2), rnd);
  I.addItem(s, it);
  log(s, 'loot', `Coffre du marchand : ${it.name} [${RARITIES[it.rarity].name}]`);
  return it;
}

export function refillPartitions(s: GameState): boolean {
  if (s.gems < PARTITION_REFILL_COST) return false;
  s.gems -= PARTITION_REFILL_COST;
  s.run.cooldowns = s.run.cooldowns.map(() => 0);
  s.run.mana = stats(s).manaMax;
  return true;
}

export function rerollBounties(s: GameState): boolean {
  if (s.gems < BOUNTY_REROLL_COST || s.daily.bounties.every(b => b.claimed)) return false;
  s.gems -= BOUNTY_REROLL_COST;
  Fi.rerollBounties(s, '#' + Math.floor(rnd() * 1e9));
  return true;
}

export function claimCalendar(s: GameState): string | null {
  if (!Sh.calendarReady(s)) return null;
  const rw = CALENDAR[s.shop.calIndex % CALENDAR.length];
  s.shop.calLast = Fi.dayKey(); s.stats.calendar++;
  s.shop.calIndex++;
  if (rw.kind === 'gemmes') { s.gems += rw.amount; return `+${rw.amount} gemmes`; }
  if (rw.kind === 'metal') { s.metal += rw.amount; return `+${rw.amount} métal`; }
  if (rw.kind === 'or') { const g = F.mobGold(s.run.floor) * rw.amount; addGold(s, g); return `+${fmt(g)} or`; }
  const it = I.makeItem(s, s.run.floor, I.rollRarity(s.run.floor + 80, rnd, rw.amount), rnd);
  I.addItem(s, it);
  return `${it.name} [${RARITIES[it.rarity].name}]`;
}

// ---------------------------------------------------------------- Fief
export function claimChest(s: GameState) {
  if (!Fi.chestReady(s)) return null;
  s.daily.chestClaimed = true;
  const it = I.makeItem(s, s.run.floor, I.rollRarity(s.run.floor + 60, rnd, 2), rnd);
  I.addItem(s, it);
  log(s, 'loot', `Coffre des Primes : ${it.name} [${RARITIES[it.rarity].name}]`);
  return it;
}

// ---------------------------------------------------------------- Chasses primordiales (Ancre du Chaos)
export function startHunt(s: GameState, id: string): boolean {
  const h = HUNTS.find(x => x.id === id), r = s.run;
  if (!h || s.anchors.hunts[id] || r.monster.hunt || !Rz.anchorsVisible(s)) return false;
  r.huntBack = { floor: r.floor, wave: r.wave === 10 ? 0 : r.wave, farming: r.farming };
  const hp = F.bossHp(h.floor) * T.huntHpMult * bossHpMult(s);
  r.monster = { sprite: h.sprite, name: h.name, kind: 'boss', hp, maxHp: hp, hunt: id, tint: h.tint };
  r.wave = 10; r.bossTime = HUNT_TIME; r.bossAttackIn = 5;
  log(s, 'story', `Chasse : ${h.name}`);
  return true;
}
// ---------------------------------------------------------------- Les Profondeurs
function spawnAbyss(s: GameState) {
  const r = s.run, d = s.depths!, mod = Dp.pickModifier(d.depth, rnd);
  d.mod = mod.id;
  const hp = Dp.depthHp(d.ref ?? 1, d.depth) * mod.hp;
  r.monster = { sprite: pick(Dp.ABYSS_MOBS), name: `Profondeur ${d.depth} · ${mod.name}`, kind: 'boss', hp, maxHp: hp, hunt: 'abysse' };
  r.wave = 10; r.bossTime = Math.max(8, stats(s).bossTime * (1 + mod.time)); r.bossAttackIn = 6;
}
/** Descendre : coûte une clé ; on enchaîne les profondeurs jusqu'à la défaite (ou l'abandon). */
export function startDepths(s: GameState): boolean {
  Dp.depthsCheck(s);
  const r = s.run, d = s.depths!;
  if (!Dp.depthsUnlocked(s) || d.keys <= 0 || r.monster.hunt) return false;
  d.keys--; d.depth = 1;
  const st = stats(s);
  d.ref = st.dps + st.tap * (5 + st.autoTaps);                // dégâts/s de référence (5 frappes/s)
  r.huntBack = { floor: r.floor, wave: r.wave === 10 ? 0 : r.wave, farming: r.farming };
  spawnAbyss(s);
  log(s, 'story', 'Vous descendez dans les Profondeurs…');
  return true;
}
/** Remonter de soi-même (les récompenses déjà gagnées sont gardées). */
export function leaveDepths(s: GameState): boolean {
  if (s.run.monster.hunt !== 'abysse') return false;
  endHunt(s, false);
  return true;
}

/** Boss de l'événement de saison : 3 essais par jour, 15 jetons par victoire. */
export function startSeasonBoss(s: GameState): boolean {
  Ev.eventCheck(s);
  const r = s.run, e = s.event!, ev = Ev.currentEvent();
  if (!Ev.eventOpen(s) || e.tries <= 0 || r.monster.hunt) return false;
  e.tries--;
  r.huntBack = { floor: r.floor, wave: r.wave === 10 ? 0 : r.wave, farming: r.farming };
  const hp = F.bossFloorHp(Math.max(10, s.bestFloor - 2)) * 1.5 * bossHpMult(s);
  r.monster = { sprite: ev.boss, name: ev.bossName, kind: 'boss', hp, maxHp: hp, hunt: 'saison' };
  r.wave = 10; r.bossTime = stats(s).bossTime + 10; r.bossAttackIn = 6;
  log(s, 'story', `Événement : ${ev.bossName} vous défie !`);
  return true;
}
function endHunt(s: GameState, won: boolean) {
  const r = s.run, id = r.monster.hunt!, h = HUNTS.find(x => x.id === id)!;
  const back = r.huntBack ?? { floor: r.floor, wave: 0, farming: false };
  r.huntBack = null; r.floor = back.floor; r.wave = back.wave; r.farming = back.farming;
  r.monster = spawnMob(s);
  emit({ type: 'hunt', id, won });
  if (id === 'abysse') {
    const d = s.depths!;
    if (won) {
      const rw = Dp.depthReward(d.depth);
      d.shards += rw.shards; s.gems += rw.gems; s.metal += rw.metal;
      d.best = Math.max(d.best, d.depth);
      log(s, 'boss', `Profondeur ${d.depth} franchie : +${rw.shards} Éclat${rw.shards > 1 ? 's' : ''} d’abysse, +${rw.gems} gemmes.`);
      d.depth++;
      r.huntBack = back; spawnAbyss(s);          // on continue la descente
    } else {
      log(s, 'fail', `Vous remontez des Profondeurs. Record : ${d.best}.`);
      d.depth = 0;
    }
    return;
  }
  if (id === 'saison') {
    const ev = Ev.currentEvent();
    if (won) { Ev.eventCheck(s); s.event!.tokens += Ev.BOSS_TOKENS; s.event!.wins++; log(s, 'boss', `${ev.bossName} est vaincu : +${Ev.BOSS_TOKENS} jetons de saison.`); }
    else log(s, 'fail', `${ev.bossName} s’en sort… cette fois.`);
    return;
  }
  if (won) {
    s.anchors.hunts[id] = true; s.stats.hunts++;
    log(s, 'boss', `${h.name} est vaincu. Sa fureur s’ancre en vous.`);
    if (Rz.chaosDone(s)) story(s, 'ancre:chaos');
  } else log(s, 'fail', `${h.name} vous échappe. La Chasseuse hausse les épaules : « Reviens plus fort. »`);
}

/** Récolte au Jardin (déclenche l'Ancre de la Création pour la Graine-Cœur). */
export function gardenHarvest(s: GameState, i: number) {
  const r = harvestPlot(s, i);
  if (r?.anchor) { story(s, 'ancre:creation'); log(s, 'story', 'La Graine-Cœur a éclos : Ancre de la Création.'); }
  return r;
}

export function harvestSeed(s: GameState): boolean {
  if (!Rz.harvestSeed(s)) return false;
  story(s, 'ancre:creation');
  log(s, 'story', 'La Graine-Cœur a éclos : Ancre de la Création.');
  return true;
}

// ---------------------------------------------------------------- Équipement lié au compte (packs d'étape)
function restoreVault(s: GameState) {
  if (!s.vault) return;
  for (const it of s.vault) {
    if (!s.run.inventory.some(x => x.id === it.id)) s.run.inventory.push(it);
    const cur = I.equippedIn(s, it.slot);
    if (I.canWear(s, it) && (!cur || I.score(it, s) >= I.score(cur, s))) s.run.equipped[it.slot] = it.id;
  }
}
export function makeAube(s: GameState, pieceId: string) {
  const p = AUBE_BY_ID[pieceId];
  const affixes = p.stats.map((stat, i) => ({ stat, v: 0, r: (i === 0 ? 1 : 0.6) * AUBE_ROLL }));
  const it = { id: ++s.itemSeq, slot: p.slot, base: p.base, name: p.name, rarity: p.rarity, ilvl: p.cap, plus: 0, affixes, set: p.set, bound: true, minFloor: p.minFloor || undefined, cap: p.cap };
  s.vault.push(it);
  restoreVault(s);
  return it;
}
/** Accorde un achat (après validation du paiement) : gemmes, bénédictions, pièces de l'Aube, Fragments. */
export function grantPurchase(s: GameState, id: string): boolean {
  if (!Sh.grantPack(s, id)) return false;
  const p = PACKS.find(x => x.id === id)!;
  for (const piece of p.items ?? []) if (!s.vault.some(v => v.name === AUBE_BY_ID[piece].name)) makeAube(s, piece);
  if (p.fragments) { s.resonance.fragments += p.fragments; s.resonance.total += p.fragments; }
  log(s, 'gold', `Merci ! ${p.name} reçu.`);
  return true;
}
/** Articles achetables en gemmes. */
export function buyGemItem(s: GameState, id: string): boolean {
  const g = GEM_ITEMS.find(x => x.id === id);
  if (!g || s.gems < g.cost) return false;
  if (id === 'parchemin' && s.shop.eclatsBoost) return false;
  if (id === 'retour' && !s.expeditions.length) return false;
  s.gems -= g.cost;
  if (id === 'parchemin') s.shop.eclatsBoost = true;
  else if (id === 'engrais') s.garden.plots.forEach(p => { if (p && !p.dissonantSince) p.progress = 1; });
  else if (id === 'retour') s.expeditions.forEach(e => (e.start = now() - e.hours * 3600_000));
  else if (id === 'coffre_leg') { const it = I.makeItem(s, s.run.floor, 4, rnd); I.addItem(s, it); log(s, 'loot', `Coffre légendaire : ${it.name}`); }
  return true;
}

// ---------------------------------------------------------------- Fin du jeu : l'Écho Oublié
export const echoAvailable = (s: GameState) => s.bestFloor > 400 && !s.ending.done;
/** Victoire au Chant : la voie choisie donne un bonus permanent (modifiable à chaque Résonance). */
export function finishEcho(s: GameState, path: 'sceller' | 'lier') {
  const first = !s.ending.done;
  s.ending.done = true; s.ending.path = path;
  log(s, 'story', path === 'lier' ? 'Vous vous liez à l’Écho Oublié : la Voie du Compagnon.' : 'Vous scellez l’Écho Oublié : la Voie du Geôlier.');
  if (first) story(s, 'epilogue');
}
export function setPath(s: GameState, path: 'sceller' | 'lier') { if (s.ending.done) s.ending.path = path; }

// ---------------------------------------------------------------- Résonance (couche 2)
export function resonate(s: GameState, classId: ClassId = s.classId ?? 'guerrier'): number {
  if (!Rz.canResonate(s)) return 0;
  const gain = Rz.fragmentsFor(s);
  const first = s.resonance.count === 0;
  s.resonance.fragments += gain; s.resonance.total += gain; s.resonance.count++;
  s.eclats = Rz.startEclats(s); s.legende = 0;
  s.constellations = {};
  for (const id in s.arcanes) if (s.arcanes[id] > 0) s.arcanes[id] = 1;
  s.classId = classId;
  const keep = s.run.inventory.find(i => i.id === s.heritage);
  newRun(s, startFloor(s));
  if (keep) { s.run.inventory.push(keep); s.run.equipped[keep.slot] = keep.id; }
  log(s, 'story', `✧ Résonance n°${s.resonance.count} : +${gain} Fragments d’Écho.`);
  if (first) story(s, 'resonance:1');
  return gain;
}

// ---------------------------------------------------------------- Automatisations (Symphonie)
/** Achat automatique : meilleur rapport dégâts/coût entre Frappe et compagnons. */
export function autoBuy(s: GameState) {
  const st = stats(s);
  const raw = s.run.companions.reduce((a, l, i) => a + F.compDps(i, l), 0);
  const compMult = raw > 0 ? st.dps / raw : st.global;
  const tapUnit = st.tap / F.frappeBase(s.run.heroLevel);
  for (let guard = 0; guard < 40; guard++) {
    let best: null | { ratio: number; act: () => boolean } = null;
    const L = s.run.heroLevel, hc = heroCostN(s, 1);
    if (hc <= s.run.gold) best = { ratio: (F.frappeBase(L + 1) - F.frappeBase(L)) * tapUnit * 3 / hc, act: () => buyHero(s, 1) };
    s.run.companions.forEach((l, i) => {
      if (!compUnlocked(s, i)) return;
      const nm = F.nextMilestone(l) ?? l + 1;
      for (const n of [1, nm - l]) {
        const c = compCostN(s, i, n);
        if (n <= 0 || c > s.run.gold) continue;
        const g = (F.compDps(i, l + n) - F.compDps(i, l)) * compMult + (l === 0 ? 1e-9 : 0);
        if (!best || g / c > best.ratio) best = { ratio: g / c, act: () => buyComp(s, i, n) };
      }
    });
    if (!best || !best.act()) break;
  }
}
function automate(s: GameState) {
  const a = s.resonance.auto, r = s.run;
  if (a.buy && Rz.sym(s, 'auto_achat')) autoBuy(s);
  if (a.partitions && Rz.sym(s, 'auto_partitions')) PARTITIONS.forEach((_, i) => castPartition(s, i));
  if (a.ascend && Rz.sym(s, 'auto_ascension') && canAscend(s) && s.ascensions > 0 && !r.monster.hunt
    && s.time - (r.lastRecordAt ?? s.time) > 180) {
    const gain = ascend(s, s.classId!);
    emit({ type: 'auto-ascend', gain });
  }
}

// ---------------------------------------------------------------- Ascension
export function ascensionGain(s: GameState): number {
  return Math.floor(F.eclatsFor(s.run.maxFloor) * (1 + arc(s, 'eclats')) * Rz.symEclatsMult(s) * (1 + potion(s, 'eclats')) * (s.shop?.eclatsBoost ? 1.5 : 1)) + (s.ascensions === 0 ? 6 : 0);
}
export function canAscend(s: GameState) { return s.ascensionUnlocked && s.run.maxFloor >= 30; }
export function startFloor(s: GameState): number {
  return Math.max(1, Rz.departFloor(s), Math.floor(s.bestFloor * Math.min(0.5, star(s, 'sentier_memoire') + arc(s, 'start'))));
}
export function ascend(s: GameState, classId: ClassId): number {
  if (!canAscend(s)) return 0;
  const gain = ascensionGain(s);
  s.eclats += gain; s.legende += gain; s.ascensions++;
  s.shop.eclatsBoost = false;
  s.classId = classId;
  const keep = s.run.inventory.find(i => i.id === s.heritage);
  newRun(s, startFloor(s));
  if (keep && !keep.bound) { s.run.inventory.push(keep); s.run.equipped[keep.slot] = keep.id; }
  else if (!keep) s.heritage = null;
  log(s, 'story', `✦ Ascension n°${s.ascensions} : +${gain} Éclats. Votre légende pèse désormais ${s.legende}.`);
  if (s.ascensions === 1) story(s, 'ascension:1');
  else larry(s, LARRY_ON.ascension, 0.5);
  return gain;
}
export function buyStar(s: GameState, id: string): boolean {
  const node = STAR_BY_ID[id];
  if (!node) return false;
  const lv = s.constellations[id] ?? 0;
  if (lv >= node.max) return false;
  if (node.requires && !(s.constellations[node.requires] > 0)) return false;
  const c = starCost(node, lv);
  if (c > s.eclats) return false;
  s.eclats -= c;
  s.constellations[id] = lv + 1;
  return true;
}

// ---------------------------------------------------------------- hors-ligne
export interface OfflineReport { seconds: number; gold: number; floors: number; kills: number; items: number; bestRarity: number; metal: number; res: Record<string, number> }
export function applyOffline(s: GameState, seconds: number): OfflineReport | null {
  if (!s.classId || seconds < 60) return null;
  const r = s.run;
  const secs = Math.min(seconds, OFFLINE_CAP);
  const eff = (0.25 + star(s, 'bourse_offline') + arc(s, 'offline') + (s.ending?.path === 'sceller' ? 0.5 : 0)) * Jb.jobMult(s, 'cuisinier');
  const saved = { activeUntil: r.activeUntil, crescendo: r.crescendoUntil };
  r.activeUntil = r.activeUntil.map(() => 0); r.crescendoUntil = 0;
  const st = stats(s);
  r.activeUntil = saved.activeUntil; r.crescendoUntil = saved.crescendo;
  const dmg = st.dps + st.autoTaps * st.tap;
  if (dmg <= 0) return null;
  let left = secs, gold = 0, floors = 0;
  const somnambule = (s.constellations['sentier_somnambule'] ?? 0) > 0;
  if (somnambule) {
    while (left > 0 && floors < 2000) {
      const f = r.floor, sb = storyBossAt(f);
      const bHp = F.bossFloorHp(f) * bossHpMult(s);
      const bDmg = dmg * (f === SEUIL_HARMONIQUE.floor ? certitude(s) : 1);
      if (bHp / bDmg > st.bossTime || (sb?.id === 'chef_doeuvre' && s.ascensions === 0 && !s.ascensionUnlocked)) break;
      const t = F.MOBS_PER_FLOOR * (F.mobHp(f) / dmg + 0.4) + bHp / bDmg;
      if (t > left) break;
      left -= t;
      gold += (F.MOBS_PER_FLOOR * F.mobGold(f) + F.bossGold(f)) * st.goldMult;
      if (sb) story(s, `kill:${sb.id}`);
      r.floor++; floors++;
      s.mastery[s.classId] += 1;
      if (r.floor > r.maxFloor) r.maxFloor = r.floor;
      if (r.floor > s.bestFloor) { s.bestFloor = r.floor; story(s, `floor:${r.floor}`); }
    }
    if (floors) { r.wave = 0; r.farming = false; r.monster = spawnMob(s); }
  }
  const f = r.floor;
  const farmKills = Math.floor(left / (F.mobHp(f) / dmg + 0.4));
  gold += left * F.mobGold(f) * st.goldMult / (F.mobHp(f) / dmg + 0.4);
  gold *= eff;
  addGold(s, gold);
  // butin ramassé pendant l'absence (objets, ressources de Chasseur), au même rendement que les gains
  const kills = Math.floor((floors * (F.MOBS_PER_FLOOR + 1) + farmKills) * eff);
  if (floors) Co.gainAffinity(s, floors);
  s.stats.kills += kills;
  let items = 0, bestRarity = -1, metal = 0;
  if (I.lootUnlocked(s)) {
    const n = Math.min(20, Math.floor((floors * 0.5 + kills * 0.03) * lootMult(s)));
    const m0 = s.metal;
    for (let k = 0; k < n; k++) {
      const it = I.makeItem(s, r.floor, I.rollRarity(r.floor, rnd), rnd);
      I.addItem(s, it); items++; s.stats.items++; bestRarity = Math.max(bestRarity, it.rarity);
    }
    metal = s.metal - m0; // sac plein : le moins bon est recyclé
  }
  const res: Record<string, number> = {};
  if (s.res) {
    const id = r.monster.sprite.split('/').pop()!;
    const rid = FAMILY_DROPS.find(([re]) => re.test(id))?.[1] ?? DEFAULT_DROP;
    const nRes = Math.min(200, Math.floor(kills * 0.08 * (1 + Jb.level(s, 'chasseur') * 0.02)));
    if (nRes > 0) { Jb.give(s, rid, nRes); Jb.addXp(s, 'chasseur', nRes); res[rid] = nRes; }
  }
  return { seconds: secs, gold, floors, kills, items, bestRarity, metal, res };
}

// ---------------------------------------------------------------- sauvegarde
export function serialize(s: GameState): string {
  s.lastSave = now();
  return JSON.stringify(s, (_k, v) => (v === Infinity ? '__inf' : v));
}
export function deserialize(json: string): GameState | null {
  try {
    const raw = JSON.parse(json, (_k, v) => (v === '__inf' ? Infinity : v));
    if (!raw || typeof raw !== 'object' || !raw.run) return null;
    return migrate(raw);
  } catch { return null; }
}
function migrate(raw: any): GameState {
  const base = newGame();
  const s: GameState = { ...base, ...raw, settings: { ...base.settings, ...raw.settings }, stats: { ...base.stats, ...raw.stats } };
  // compagnons ajoutés après coup
  while (s.run.companions.length < COMPANIONS.length) s.run.companions.push(0);
  s.run.inventory ??= []; s.run.equipped ??= {};
  s.achievements ??= {}; s.achSeen ??= [];
  s.anchors = { ...Rz.newAnchors(), ...(s.anchors ?? {}) };
  s.forge ??= { sets: {} };
  s.vault ??= [];
  s.tuto ??= [];
  // La Compagnie (ajout) : meneur = l'allié le plus monté, affinité rétroactive selon les boss déjà vaincus
  if (!s.company) {
    let best = -1; s.run.companions.forEach((l, i) => { if (l > 0 && (best < 0 || l >= s.run.companions[best])) best = i; });
    const aff: Record<number, number> = {};
    s.run.companions.forEach((l, i) => { if (l > 0) aff[i] = Math.floor((s.stats.bossKills ?? 0) / 2); });
    s.company = { leader: best, affinity: aff };
  }
  // offres refusées avant la vitrine : elles y reviennent pour 3 jours
  s.shop.offerUntil ??= Object.fromEntries(s.shop.offersSeen.filter(id => !s.shop.owned.includes(id)).map(id => [id, now() + Sh.OFFER_STANDS_MS]));
  // une seule instance par objet lié au compte (le Sac de la vie en cours pointe sur le coffre)
  s.run.inventory = s.run.inventory.map(it => (it.bound ? s.vault.find(v => v.id === it.id) ?? it : it));
  s.ending = Object.assign({ done: false, path: null, attempts: 0 }, s.ending);
  s.jobs ??= {}; s.res ??= {}; s.potions ??= {}; s.buffs ??= {}; s.expeditions ??= [];
  s.garden = { ...newGarden(), ...(s.garden ?? {}) };
  s.resonance = { ...Rz.newResonance(), ...(s.resonance ?? {}) };
  s.arcanes ??= {}; s.meal ??= null; s.gems ??= 0; s.shop = { ...Sh.newShop(), ...(s.shop ?? {}) };
  s.messenger = null; s.nextMessengerAt ??= s.time + 240;
  Fi.dailyCheck(s); Q.questsCheck(s); Ev.eventCheck(s); Dp.depthsCheck(s);
  while (s.run.cooldowns.length < PARTITIONS.length) { s.run.cooldowns.push(0); s.run.activeUntil.push(0); }
  s.version = SAVE_VERSION;
  return s;
}

// ---------------------------------------------------------------- Lecture : d'où vient la puissance (écran Héros)
/** Multiplicateurs de « tous les dégâts », source par source (seulement ceux qui comptent). */
export function powerBreakdown(s: GameState): { label: string; mult: number }[] {
  const out: { label: string; mult: number }[] = [
    { label: 'Légende', mult: F.legendeMult(s.legende) },
    { label: 'Maîtrises', mult: masteryBonus(s) },
    { label: 'Arcanes', mult: (1 + arc(s, 'all')) * familyMult(s) },
    { label: 'Harmoniques (Résonance)', mult: s.resonance ? Rz.harmonicMult(s) : 1 },
    { label: 'Panoplies forgées', mult: s.forge ? permanentSetMult(s) : 1 },
    { label: 'Chasseur (métier)', mult: Jb.jobMult(s, 'chasseur') },
    { label: 'Bestiaire', mult: Be.bestiaryMult(s) },
    { label: 'Trophées de saison', mult: Ev.trophyMult(s) },
    { label: 'Profondeurs', mult: 1 + Dp.depthNode(s, 'degats') },
    { label: 'Voie du Compagnon', mult: s.ending?.path === 'lier' ? 3 : 1 },
    { label: 'Bénédictions', mult: (s.shop && Sh.blessing(s, 'force') ? 2 : 1) * (s.shop && Sh.blessing(s, 'furie') ? 3 : 1) },
    { label: 'Potions et repas', mult: (1 + (Fi.mealActive(s)?.all ?? 0)) * (1 + potion(s, 'all')) * (1 + potion(s, 'all3')) },
  ];
  return out.filter(x => x.mult > 1.0001);
}
/** Effets temporaires actifs (bénédictions, potions, repas) avec leur fin (horodatage réel). */
export function activeEffects(s: GameState): { name: string; icon: string; until: number }[] {
  const out: { name: string; icon: string; until: number }[] = [];
  const t = now();
  for (const b of BLESSINGS) { const u = s.shop?.blessings[b.id] ?? 0; if (u > t) out.push({ name: `${b.name} · ${b.desc}`, icon: b.icon, until: u }); }
  for (const [id, u] of Object.entries(s.buffs ?? {})) { const p = POTION_BY_ID[id]; if (p && u > t) out.push({ name: `${p.name} · ${p.desc}`, icon: p.sprite, until: u }); }
  const m = Fi.mealActive(s); if (m && s.meal) out.push({ name: `${m.name} · ${m.desc}`, icon: m.sprite, until: s.meal.until });
  return out.sort((a, b) => a.until - b.until);
}

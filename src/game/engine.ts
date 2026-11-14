import type { ClassId, GameEvent, GameState, Monster, RunState, ChronicleKind } from './types';
import * as F from './formulas';
import { COMPANIONS, PARTITIONS, MILESTONE_TITLES, MILESTONES } from './data/heroes';
import { actFor, monsterName, storyBossAt, SEUIL_HARMONIQUE } from './data/world';
import { STAR_BY_ID, starCost } from './data/constellations';
import { fmt } from './format';
import * as I from './items';
import { arc, familyMult } from './arcanes';
import * as Fi from './fief';
import { RARITIES } from './data/items';
import { SCENE_BY_ID, LARRY_QUIPS, LARRY_ON, KILL_LINES, BOSS_LINES } from './data/story';

export const SAVE_VERSION = 1;
const CHRONICLE_MAX = 60;
const GOLDEN_FROM = 3;
const GOLDEN_TIME = 6;
const OFFLINE_CAP = 8 * 3600;

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
    version: SAVE_VERSION, time: 0, lastSave: Date.now(), classId: null,
    run: null as unknown as RunState,
    eclats: 0, legende: 0, ascensions: 0, ascensionUnlocked: false, bestFloor: 1,
    mastery: { guerrier: 0, archer: 0, mage: 0 },
    constellations: {}, seenStory: [], chronicle: [],
    settings: { sound: true, haptics: true, notation: 'lettres', autoAdvance: true },
    stats: { kills: 0, bossKills: 0, taps: 0, goldEarned: 0, playSeconds: 0, goldenKills: 0 },
    nextLarryAt: 600, metal: 0, itemSeq: 0, heritage: null,
    arcanes: {}, daily: null as unknown as Fi.Daily, meal: null,
  };
  s.run = newRun(s, 1);
  Fi.dailyCheck(s);
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
  s.run.companions.forEach((l, i) => { d += F.compDps(i, l); });
  return d * (1 + star(s, 'meute_dps'));
}

export function stats(s: GameState): Stats {
  const r = s.run, c = s.classId;
  const g = I.gearTotals(s);
  const meal = Fi.mealActive(s);
  const power = (1 + star(s, 'grimoire_puissance') + arc(s, 'power')) * (c === 'mage' ? 1.5 : 1);
  let global = F.legendeMult(s.legende) * masteryBonus(s) * (1 + arc(s, 'all')) * familyMult(s) * (1 + (meal?.all ?? 0));
  if (r && active(s, 'accord')) global *= 1 + 4 * power;
  const comp = r ? companionsDps(s) * (1 + g.comp) * (1 + arc(s, 'comp')) * (1 + (meal?.comp ?? 0)) : 0;
  let tapMult = (1 + star(s, 'glaive_frappe')) * (1 + g.frappe) * (1 + arc(s, 'frappe')) * (1 + (meal?.frappe ?? 0)) * (c === 'guerrier' ? 1.5 : 1);
  if (r && active(s, 'crescendo')) tapMult *= 1 + 2 * power;
  if (r && s.time < r.crescendoUntil) tapMult *= 2;
  const share = 0.03 + star(s, 'meute_frappe');
  const tap = ((r ? F.frappeBase(r.heroLevel) : 1) * tapMult + share * comp) * global;
  const seuilBlocked = !!r && r.floor === SEUIL_HARMONIQUE.floor && r.wave === 10 && s.legende < SEUIL_HARMONIQUE.legende;
  return {
    tap, dps: comp * global, power, global, seuilBlocked,
    critChance: Math.min(0.75, 0.02 + g.crit + arc(s, 'crit') + (meal?.crit ?? 0) + star(s, 'glaive_crit') + (c === 'archer' ? 0.08 : 0)),
    critMult: 4 * (1 + star(s, 'glaive_critdmg')) * (1 + g.critdmg) * (1 + arc(s, 'critdmg')) * (c === 'archer' ? 1.5 : 1),
    goldMult: (1 + star(s, 'bourse_or')) * (1 + g.or) * (1 + arc(s, 'or')) * (1 + (meal?.or ?? 0)),
    manaMax: Math.round(100 + g.mana + arc(s, 'mana') + star(s, 'grimoire_mana')) + (c === 'mage' ? 50 : 0),
    manaRegen: (1 + star(s, 'grimoire_mana') / 100 + arc(s, 'regen')) * (c === 'mage' ? 2 : 1),
    bossTime: Math.round((F.BOSS_TIME + star(s, 'sentier_volonte') + g.volonte + arc(s, 'bosstime') + (meal?.volonte ?? 0)) * 10) / 10,
    autoTaps: (c === 'archer' ? 2 + Math.floor((r?.heroLevel ?? 0) / 100) : 0) + (r && active(s, 'staccato') ? 10 * power : 0),
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

export const bossHpMult = (s: GameState) => 1 - Math.min(0.5, arc(s, 'bosshp'));

function spawnBoss(s: GameState): Monster {
  const r = s.run, st = stats(s), sb = storyBossAt(r.floor);
  r.bossTime = st.bossTime;
  r.bossAttackIn = 6 + rnd() * 4;
  story(s, `boss:${r.floor}`);
  if (sb) {
    if (sb.id === 'chef_doeuvre' && s.ascensions === 0) {
      r.scriptedDefeat = true;
      r.bossTime = 15;
      return { sprite: sb.sprite, name: sb.name, kind: 'boss', hp: Infinity, maxHp: Infinity, story: sb.id };
    }
    const hp = F.bossHp(r.floor) * sb.hpMult * bossHpMult(s);
    return { sprite: sb.sprite, name: sb.name, kind: 'boss', hp, maxHp: hp, story: sb.id };
  }
  const sprite = 'mobs/' + pick(actFor(r.floor).bosses);
  const hp = F.bossHp(r.floor) * bossHpMult(s);
  return { sprite, name: monsterName(sprite), kind: 'boss', hp, maxHp: hp };
}

// ---------------------------------------------------------------- dégâts
export function damage(s: GameState, amount: number, crit = false, isTap = false) {
  const m = s.run.monster;
  if (!m || m.hp <= 0) return;
  if (m.kind === 'boss' && stats(s).seuilBlocked) amount *= 0.001; // bouclier de Certitude
  m.hp -= amount;
  emit({ type: 'hit', amount, crit, tap: isTap });
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
    r.ferveur += (s.classId === 'guerrier' ? 6 : 4) * (1 + arc(s, 'ferveur'));
    if (r.ferveur >= 100) {
      r.ferveur = 0;
      r.crescendoUntil = s.time + 10 + star(s, 'glaive_ferveur');
      emit({ type: 'crescendo' });
      log(s, 'crit', 'CRESCENDO ! La Ferveur double vos frappes.');
    }
  }
  if (s.classId === 'guerrier' && r.tapsTotal % 100 === 0) {
    emit({ type: 'heavy' });
    rollTap(s, st, 25);
    return;
  }
  rollTap(s, st);
}

function kill(s: GameState) {
  const r = s.run, m = r.monster, st = stats(s);
  s.stats.kills++; Fi.count(s, 'kills');
  if (m.kind === 'boss') {
    const gold = F.bossGold(r.floor) * st.goldMult;
    addGold(s, gold);
    s.stats.bossKills++; Fi.count(s, 'bosses');
    log(s, 'boss', pick(BOSS_LINES).replace('{m}', m.name) + ` (+${fmt(gold)} or)`);
    emit({ type: 'kill', monster: m, gold });
    if (m.story) story(s, `kill:${m.story}`);
    if (I.lootUnlocked(s) && (m.story || rnd() < 0.4 * (1 + arc(s, 'loot')))) drop(s, m.story ? 2 : 0, m.story ? 1 : 0);
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
  if (m.kind === 'mob' && I.lootUnlocked(s) && rnd() < 0.012 * (1 + arc(s, 'loot'))) drop(s);
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

function drop(s: GameState, minRarity = 0, bonus = 0) {
  const rar = Math.min(5, I.rollRarity(s.run.floor, rnd, minRarity) + (rnd() < 0.5 ? bonus : 0));
  const it = I.makeItem(s, s.run.floor, rar, rnd);
  const lost = I.addItem(s, it);
  Fi.count(s, 'loot');
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
  if (r.scriptedDefeat) {
    r.scriptedDefeat = false;
    s.ascensionUnlocked = true;
    story(s, 'defeat:chef_doeuvre');
    log(s, 'fail', `${m.name} vous écrase. L'Ascension est désormais possible.`);
  } else {
    log(s, 'fail', `Votre Volonté flanche face à ${m.name}. Repli à l'entraînement.`);
    if (r.floor === SEUIL_HARMONIQUE.floor && s.legende < SEUIL_HARMONIQUE.legende) story(s, 'seuil');
    else larry(s, LARRY_ON.bossFail, 0.5);
  }
  r.farming = true;
  r.wave = 0;
  r.monster = spawnMob(s);
}

export function parry(s: GameState): boolean {
  const r = s.run;
  if (!r.parryUntil || s.time > r.parryUntil) return false;
  r.parryUntil = 0;
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
  if (s.time - r.lastTapAt > 1 && r.ferveur > 0) r.ferveur = Math.max(0, r.ferveur - 20 * dt);

  // dégâts continus (compagnons + tirs auto)
  if (st.dps > 0) damage(s, st.dps * dt);
  if (st.autoTaps > 0) {
    const n = st.autoTaps * dt;
    const crit = rnd() < st.critChance;
    damage(s, st.tap * n * (crit ? st.critMult : 1), crit, false);
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
  r.mana -= p.mana;
  r.cooldowns[i] = s.time + p.cd * Math.max(0.3, 1 - star(s, 'grimoire_cd') - arc(s, 'cd'));
  const dur = p.duration * (s.classId === 'mage' ? 1.5 : 1);
  if (dur) r.activeUntil[i] = s.time + dur;
  emit({ type: 'partition', index: i }); Fi.count(s, 'partitions');
  log(s, 'info', `♪ ${p.name} !`);
  if (p.id === 'trille') {
    damage(s, 10 * (st.dps + st.tap * 5) * st.power * (s.classId === 'mage' ? 2 : 1), true, false);
  } else if (p.id === 'cantique' && r.monster.kind === 'boss') {
    r.bossTime = Math.min(st.bossTime, r.bossTime + st.bossTime * 0.5);
    r.parryUntil = 0;
  }
  return true;
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

// ---------------------------------------------------------------- Ascension
export function ascensionGain(s: GameState): number {
  return Math.floor(F.eclatsFor(s.run.maxFloor) * (1 + arc(s, 'eclats'))) + (s.ascensions === 0 ? 6 : 0);
}
export function canAscend(s: GameState) { return s.ascensionUnlocked && s.run.maxFloor >= 30; }
export function startFloor(s: GameState): number {
  return Math.max(1, Math.floor(s.bestFloor * Math.min(0.5, star(s, 'sentier_memoire') + arc(s, 'start'))));
}
export function ascend(s: GameState, classId: ClassId): number {
  if (!canAscend(s)) return 0;
  const gain = ascensionGain(s);
  s.eclats += gain; s.legende += gain; s.ascensions++;
  s.classId = classId;
  const keep = s.run.inventory.find(i => i.id === s.heritage);
  newRun(s, startFloor(s));
  if (keep) { s.run.inventory.push(keep); s.run.equipped[keep.slot] = keep.id; }
  else s.heritage = null;
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
export interface OfflineReport { seconds: number; gold: number; floors: number }
export function applyOffline(s: GameState, seconds: number): OfflineReport | null {
  if (!s.classId || seconds < 60) return null;
  const r = s.run;
  const secs = Math.min(seconds, OFFLINE_CAP);
  const eff = 0.25 + star(s, 'bourse_offline') + arc(s, 'offline');
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
      const bHp = F.bossHp(f) * (sb?.hpMult ?? 1) * bossHpMult(s);
      if (bHp / dmg > st.bossTime || (sb?.id === 'chef_doeuvre' && s.ascensions === 0)) break;
      if (f === SEUIL_HARMONIQUE.floor && s.legende < SEUIL_HARMONIQUE.legende) break;
      const t = F.MOBS_PER_FLOOR * (F.mobHp(f) / dmg + 0.4) + bHp / dmg;
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
  gold += left * F.mobGold(f) * st.goldMult / (F.mobHp(f) / dmg + 0.4);
  gold *= eff;
  addGold(s, gold);
  return { seconds: secs, gold, floors };
}

// ---------------------------------------------------------------- sauvegarde
export function serialize(s: GameState): string {
  s.lastSave = Date.now();
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
  s.arcanes ??= {}; s.meal ??= null;
  Fi.dailyCheck(s);
  while (s.run.cooldowns.length < PARTITIONS.length) { s.run.cooldowns.push(0); s.run.activeUntil.push(0); }
  s.version = SAVE_VERSION;
  return s;
}

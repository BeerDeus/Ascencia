// Simulateur d'équilibrage : un bot joue avec le VRAI moteur, journée par journée.
// Usage : npx vite-node tools/balance.ts [jours=30] [profil=engage] [classe=guerrier]
//   profils : engage (4 × 12 min/j), casual (2 × 10 min/j), hardcore (6 × 20 min/j)
import * as E from '../src/game/engine';
import * as F from '../src/game/formulas';
import * as I from '../src/game/items';
import * as Ar from '../src/game/arcanes';
import * as Fi from '../src/game/fief';
import { setClock } from '../src/game/clock';
import { applyTuning, T } from '../src/game/tuning';
import { COMPANIONS, PARTITIONS, MILESTONES } from '../src/game/data/heroes';
import { STARS, starCost } from '../src/game/data/constellations';
import { MEALS } from '../src/game/data/fief';
import type { ClassId, GameState } from '../src/game/types';

const DAYS = Number(process.argv[2] ?? 30);
const PROFILE = (process.argv[3] ?? 'engage') as keyof typeof PROFILES;
const CLASS = (process.argv[4] ?? 'guerrier') as ClassId;
const PROFILES = {
  casual: { sessions: 2, minutes: 10, tps: 3, parry: 0.5 },
  engage: { sessions: 4, minutes: 12, tps: 4, parry: 0.75 },
  hardcore: { sessions: 6, minutes: 20, tps: 5, parry: 0.9 },
};
const P = PROFILES[PROFILE];
if (process.env.TUNE) applyTuning(JSON.parse(process.env.TUNE));
const DT = 0.2;
const STALL_ASCEND = 240; // s actives sans nouveau record → Ascension

let wall = Date.UTC(2026, 10, 16, 7, 0, 0);
setClock(() => wall);
let seed = 12345;
const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
E.setRandom(rnd);

const s: GameState = E.newGame();
s.classId = CLASS;
E.newRun(s, 1);

let active = 0, runStart = 0, lastRecordAt = 0, lastRecord = 0;
const firstReach: Record<number, string> = {};
const MARKS = [10, 26, 50, 75, 100, 140, 180, 220, 250, 300];
const ascLog: string[] = [];
const h = (sec: number) => (sec / 3600).toFixed(1) + 'h';

function shop() {
  const st = E.stats(s);
  const raw = s.run.companions.reduce((a, l, i) => a + F.compDps(i, l), 0);
  const compMult = raw > 0 ? st.dps / raw : st.global;
  const tapUnit = st.tap / F.frappeBase(s.run.heroLevel);
  for (let guard = 0; guard < 60; guard++) {
    let best: null | { ratio: number; act: () => boolean } = null;
    const L = s.run.heroLevel;
    for (const n of [1, 10]) {
      const c = E.heroCostN(s, n);
      if (c <= s.run.gold) {
        const g = (F.frappeBase(L + n) - F.frappeBase(L)) * tapUnit * P.tps;
        if (!best || g / c > best.ratio) best = { ratio: g / c, act: () => E.buyHero(s, n) };
      }
    }
    COMPANIONS.forEach((_, i) => {
      if (!E.compUnlocked(s, i)) return;
      const l = s.run.companions[i];
      const nm = F.nextMilestone(l) ?? l + 1;
      for (const n of [1, nm - l]) {
        if (n <= 0) continue;
        const c = E.compCostN(s, i, n);
        if (c > s.run.gold) continue;
        const g = (F.compDps(i, l + n) - F.compDps(i, l)) * compMult + (l === 0 ? 1e-9 : 0);
        if (!best || g / c > best.ratio) best = { ratio: g / c, act: () => E.buyComp(s, i, n) };
      }
    });
    if (!best || !best.act()) break;
  }
}

function gear() {
  if (!I.lootUnlocked(s)) return;
  I.equipBest(s);
  if (s.run.inventory.length > 28) I.recycleBelow(s, 3);
  // Forge : améliore l'objet équipé le moins cher à forger
  for (let k = 0; k < 5; k++) {
    const eq = Object.values(s.run.equipped).map(id => s.run.inventory.find(i => i.id === id)!).filter(Boolean)
      .filter(i => i.plus < I.PLUS_MAX).sort((a, b) => I.upgradeCost(a) - I.upgradeCost(b))[0];
    if (!eq || !I.upgrade(s, eq.id)) break;
  }
  const best = [...s.run.inventory].sort((a, b) => I.score(b) - I.score(a))[0];
  if (best) s.heritage = best.id;
}

function fief() {
  Fi.dailyCheck(s);
  s.daily.bounties.forEach((_, i) => Fi.claimBounty(s, i));
  E.claimChest(s);
  if (!Fi.mealActive(s)) {
    const m = [...MEALS].reverse().find(x => Fi.mealUnlocked(s, x) && Fi.mealCost(s, x) < s.run.gold * 0.3);
    if (m) Fi.eat(s, m.id);
  }
}

function spendEclats() {
  const prio = ['glaive_frappe', 'meute_dps', 'bourse_or', 'sentier_volonte', 'sentier_memoire', 'glaive_crit', 'glaive_critdmg',
    'meute_frappe', 'meute_cout', 'grimoire_mana', 'grimoire_puissance', 'grimoire_cd', 'sentier_elan', 'bourse_offline', 'sentier_somnambule'];
  for (let guard = 0; guard < 500; guard++) {
    const opts: { c: number; act: () => boolean }[] = [];
    for (const id of prio) {
      const n = STARS.find(x => x.id === id)!;
      const lv = s.constellations[id] ?? 0;
      if (lv < n.max && (!n.requires || s.constellations[n.requires] > 0)) opts.push({ c: starCost(n, lv), act: () => E.buyStar(s, id) });
    }
    if (Ar.arcanesUnlocked(s)) {
      opts.push({ c: Ar.drawCost(s) * 0.6, act: () => !!Ar.draw(s, rnd) });
      for (const id in s.arcanes) if (!Ar.isMaxed(s, id)) opts.push({ c: Ar.upgradeCost(s, id), act: () => Ar.upgradeArcane(s, id) });
    }
    const pick = opts.filter(o => o.c <= s.eclats).sort((a, b) => a.c - b.c)[0];
    if (!pick || !pick.act()) break;
  }
}

function ascend() {
  const gain = E.ascensionGain(s);
  ascLog.push(`A${s.ascensions + 1} j${day} ${h(active)} étage ${s.run.maxFloor} +${gain}`);
  E.ascend(s, CLASS);
  E.drainEvents();
  spendEclats();
  runStart = active; lastRecordAt = active; lastRecord = s.run.floor;
}

function playSession(seconds: number) {
  let acc = 0;
  for (let t = 0; t < seconds; t += DT) {
    const taps = P.tps * DT;
    for (let k = 0; k < Math.floor(taps) + (rnd() < taps % 1 ? 1 : 0); k++) E.tap(s);
    if (s.run.parryUntil && rnd() < P.parry * DT * 3) E.parry(s);
    PARTITIONS.forEach((_, i) => E.castPartition(s, i));
    E.tick(s, DT);
    active += DT; wall += DT * 1000; acc += DT;
    if (acc >= 2) { acc = 0; shop(); }
    if (Math.floor(active) % 30 === 0 && t % 30 < DT) { gear(); fief(); }
    const evs = E.drainEvents();
    for (const e of evs) if (e.type === 'story' && e.id === 'defeat:chef_doeuvre') { ascend(); }
    if (s.run.maxFloor > lastRecord) {
      if (process.env.TRACE && Math.floor(s.run.maxFloor / 20) > Math.floor(lastRecord / 20)) {
        const st = E.stats(s), g = I.gearTotals(s);
        console.log(`  [A${s.ascensions}] ét.${s.run.maxFloor} +${((active - runStart) / 60).toFixed(1)}min tap ${st.tap.toExponential(1)} dps ${st.dps.toExponential(1)} glob ${st.global.toExponential(1)} PV ${F.mobHp(s.run.floor).toExponential(1)} héros ${s.run.heroLevel} comp ${s.run.companions.map(x => x).filter(Boolean).length}/${s.run.companions.reduce((a, b) => Math.max(a, b), 0)} gear f${(g.frappe * 100) | 0}% c${(g.comp * 100) | 0}%`);
      }
      lastRecord = s.run.maxFloor; lastRecordAt = active;
    }
    if (s.bestFloor > (Object.keys(firstReach).length ? 0 : 0)) for (const m of MARKS) if (!firstReach[m] && s.bestFloor >= m) firstReach[m] = `j${day} (${h(active)})`;
    if (E.canAscend(s) && s.ascensions > 0 && active - lastRecordAt > STALL_ASCEND) ascend();
  }
}

let day = 1;
console.log('TUNE', process.env.TUNE ?? '(défaut)');
console.log(`Profil ${PROFILE} (${P.sessions} × ${P.minutes} min/j, ${P.tps} frappes/s), classe ${CLASS}, ${DAYS} jours\n`);
console.log('jour | actif | record | asc | légende | arcanes | étoiles');
for (; day <= DAYS; day++) {
  const gap = (16 * 3600) / P.sessions;
  for (let k = 0; k < P.sessions; k++) {
    playSession(P.minutes * 60);
    const off = k === P.sessions - 1 ? 8 * 3600 + (gap - P.minutes * 60) : gap - P.minutes * 60;
    wall += off * 1000;
    const rep = E.applyOffline(s, off);
    if (process.env.TRACE && rep) console.log(`  hors-ligne ${(off / 3600).toFixed(1)}h : +${rep.gold.toExponential(1)} or, +${rep.floors} ét. (or en poche avant achats)`);
    E.drainEvents();
    shop();
  }
  const stars = Object.values(s.constellations).reduce((a, b) => a + b, 0);
  if ([1, 2, 3, 5, 7, 10, 14, 20, 25, 30, 40, 45, 60].includes(day)) console.log(`${String(day).padStart(4)} | ${h(active).padStart(5)} | ${String(s.bestFloor).padStart(6)} | ${String(s.ascensions).padStart(3)} | ${String(s.legende).padStart(7)} | ${String(Ar.owned(s)).padStart(7)} | ${stars}`);
}
console.log('\nPremière arrivée :', MARKS.map(m => `${m}→${firstReach[m] ?? '—'}`).join('  '));
console.log('\nAscensions :\n' + ascLog.slice(0, 12).join('\n') + (ascLog.length > 12 ? `\n… (${ascLog.length})\n` + ascLog.slice(-4).join('\n') : ''));

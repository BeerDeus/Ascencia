// Simulateur d'équilibrage : un bot joue avec le VRAI moteur, journée par journée.
// Usage : npx vite-node tools/balance.ts [jours=30] [profil=engage] [classe=guerrier]
//   profils : engage (4 × 12 min/j), casual (2 × 10 min/j), hardcore (6 × 20 min/j)
// Le bot joue « comme un humain » : frappes variables (5–9/s, 10–15/s contre les boss, pauses dans les menus),
// Jardin (croisements visés jusqu'à la Graine-Cœur), Alchimie, Cuisine, Expéditions, Forge et panoplies.
import * as E from '../src/game/engine';
import * as F from '../src/game/formulas';
import * as I from '../src/game/items';
import * as Ar from '../src/game/arcanes';
import * as Fi from '../src/game/fief';
import { setClock } from '../src/game/clock';
import { applyTuning, T } from '../src/game/tuning';
import * as Rz from '../src/game/resonance';
import { SYMPHONY, symCost, HUNTS } from '../src/game/data/resonance';
import { COMPANIONS, PARTITIONS, MILESTONES } from '../src/game/data/heroes';
import { STARS, starCost } from '../src/game/data/constellations';
import { MEALS, POTIONS } from '../src/game/data/crafting';
import { canPay, level, has } from '../src/game/jobs';
import * as Gd from '../src/game/garden';
import * as Cr from '../src/game/crafting';
import * as Ex from '../src/game/expeditions';
import * as Fo from '../src/game/forge';
import * as Sh from '../src/game/shop';
import { MUTATIONS, PLANT_BY_ID } from '../src/game/data/garden';
import { ZONES } from '../src/game/data/expeditions';
import { SETS, ORDER_STATS, orderMetal } from '../src/game/data/forge';
import { SLOTS, SLOT_PRIMARY } from '../src/game/data/items';
import type { ClassId, GameState } from '../src/game/types';

const DAYS = Number(process.argv[2] ?? 30);
const PROFILE = (process.argv[3] ?? 'engage') as keyof typeof PROFILES;
const CLASS = (process.argv[4] ?? 'guerrier') as ClassId;
const PROFILES = {
  casual: { sessions: 2, minutes: 10, cps: [5, 7], boss: [8, 11], pause: 0.2, parry: 0.5 },
  engage: { sessions: 4, minutes: 12, cps: [5, 9], boss: [10, 13], pause: 0.15, parry: 0.75 },
  hardcore: { sessions: 6, minutes: 20, cps: [6, 10], boss: [12, 15], pause: 0.1, parry: 0.9 },
};
const P = PROFILES[PROFILE];
if (process.env.TUNE) applyTuning(JSON.parse(process.env.TUNE));
const DT = 0.2;
const STALL_ASCEND = 240; // s actives sans nouveau record → Ascension

let wall = Date.UTC(2026, 10, 16, 7, 0, 0);
setClock(() => wall);
let seed = Number(process.env.SEED ?? 12345);
const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
E.setRandom(rnd);

const s: GameState = E.newGame();
s.classId = CLASS;
E.newRun(s, 1);

let active = 0, runStart = 0, lastRecordAt = 0, lastRecord = 0;
const firstReach: Record<number, string> = {};
const MARKS = [10, 26, 50, 75, 100, 140, 180, 220, 250, 300, 350, 400];
const resLog: string[] = [];
let nextHuntTry = 0;
const ascLog: string[] = [];
const h = (sec: number) => (sec / 3600).toFixed(1) + 'h';
const between = ([a, b]: number[]) => a + rnd() * (b - a);
let cps = 6;                       // frappes/s du moment
const craftLog = { potions: 0, bues: 0, repas: 0, mutations: 0, recoltes: 0, expeditions: 0, commandes: 0, pieces: 0 };
const firstMutation: Record<string, string> = {};
// PAYER=aube1 : n'achète que le pack à 0,99 € ; PAYER=tout : achète chaque pack d'étape proposé
const PAYER = process.env.PAYER ?? '';
const payLog: string[] = [];
function buyOffers() {
  if (!PAYER) return;
  const o = Sh.pendingOffer(s, Fi.fiefUnlocked(s));
  if (!o) return;
  s.shop.offersSeen.push(o.id);
  if (PAYER === 'tout' || o.id === PAYER) { E.grantPurchase(s, o.id); payLog.push(`${o.id} j${day} ét.${s.bestFloor}`); }
}

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
        const g = (F.frappeBase(L + n) - F.frappeBase(L)) * tapUnit * cps;
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
  // panoplies : porter les pièces d'un même set dès qu'on en a 2
  const bySet: Record<string, typeof s.run.inventory> = {};
  for (const it of s.run.inventory) if (it.set) (bySet[it.set] ??= []).push(it);
  for (const items of Object.values(bySet)) if (new Set(items.map(i => i.slot)).size >= 2) for (const it of items) I.equip(s, it.id);
  const best = s.run.inventory.filter(i => !i.bound).sort((a, b) => I.score(b) - I.score(a))[0];
  if (best) s.heritage = best.id;
}

function fief() {
  Fi.dailyCheck(s);
  s.daily.bounties.forEach((_, i) => Fi.claimBounty(s, i));
  E.claimChest(s);
  if (!Fi.mealActive(s)) {
    const m = [...MEALS].reverse().find(x => Fi.mealUnlocked(s, x) && canPay(s, x.cost));
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

const anchorDay: Record<string, string> = {};
function anchors() {
  if (!Rz.anchorsVisible(s)) return;
  for (const [k, ok] of [['création', Rz.creationDone(s)], ['chaos', Rz.chaosDone(s)], ['destinée', Rz.destinyDone(s)]] as const)
    if (ok && !anchorDay[k]) anchorDay[k] = `j${day}`;
  // le Chant (jeu de mémoire) n'est pas simulé : un joueur le réussit en quelques essais
  if (E.echoAvailable(s)) { E.finishEcho(s, 'lier'); anchorDay['écho'] = `j${day}`; }
  if (!Rz.chaosDone(s) && active > nextHuntTry && !s.run.monster.hunt) {
    const h = HUNTS.find(x => !s.anchors.hunts[x.id]);
    if (h) E.startHunt(s, h.id);
    nextHuntTry = active + 900;
  }
}

// ---------------------------------------------------------------- Jardin
const TARGETS = ['trefle_dore', 'racine_eponge', 'rose_sanguine', 'lys_givre', 'fleur_lave', 'tournesol_radieux', 'cristal_givre', 'orchidee_silencieuse'];
function gardenGoal(): { a: string; b: string } | 'ygg' | null {
  const g = s.garden;
  const t3 = ['tournesol_radieux', 'cristal_givre', 'orchidee_silencieuse'];
  if (!s.anchors.seedDone && Rz.anchorsVisible(s) && t3.every(id => (g.seeds[id] ?? 0) >= 1) && t3.reduce((a, id) => a + (g.seeds[id] ?? 0), 0) >= 4) return 'ygg';
  // garde-manger : un cycle sur trois pour la cuisine quand les réserves sont basses
  if (rnd() < 0.34 && (has(s, 'racine_terreuse') < 6 || has(s, 'champignon_terreux') < 4)) return { a: 'racine_terreuse', b: 'champignon_terreux' };
  if (rnd() < 0.2 && has(s, 'graine_solaire') < 6) return { a: 'graine_solaire', b: 'herbe_robuste' };
  for (const id of TARGETS) {
    const m = MUTATIONS.find(x => x.result === id)!;
    if ((g.seeds[id] ?? 0) >= 4 && g.known.includes(id)) continue;   // assez de graines de ce résultat
    const tier1 = (x: string) => PLANT_BY_ID[x].tier === 1;
    const ok = (x: string) => tier1(x) || (g.seeds[x] ?? 0) >= 2;
    if (ok(m.a) && ok(m.b)) return { a: m.a, b: m.b };
  }
  return { a: 'herbe_robuste', b: 'fleur_rosee' };
}
function seedFor(id: string): boolean {
  if ((s.garden.seeds[id] ?? 0) > 0) return true;
  return PLANT_BY_ID[id].tier === 1 && Gd.buySeed(s, id, 3);
}
function garden() {
  if (!Gd.gardenUnlocked(s)) return;
  for (const e of Gd.gardenTick(s)) if (e.kind === 'mutation') { craftLog.mutations++; firstMutation[e.plant] ??= `j${day}`; }
  const g = s.garden, n = Gd.gridSize(s);
  // soins, nuisibles, récoltes
  for (let i = 0; i < 36; i++) {
    const p = g.plots[i];
    if (!p || !Gd.inGrid(s, i)) continue;
    if (p.pest) Gd.removePest(s, i);
    if (p.dissonantSince) {
      if ((s.potions.purete ?? 0) > 0) Gd.cure(s, i);
      else if (!Gd.mature(p)) { g.plots[i] = null; continue; }
    }
    if (Gd.mature(p)) { if (E.gardenHarvest(s, i)) craftLog.recoltes++; }
  }
  // replanter selon l'objectif
  const goal = gardenGoal();
  if (goal === 'ygg') {
    // croix autour de la parcelle (1,1) avec les plantes de rang III
    const cross = [1, 6, 8, 13], t3 = ['tournesol_radieux', 'cristal_givre', 'orchidee_silencieuse', 'tournesol_radieux', 'cristal_givre', 'orchidee_silencieuse'];
    if (g.plots[7] && g.plots[7]!.plant !== 'yggdrasil') g.plots[7] = null;
    let k = 0;
    for (const i of cross) {
      if (g.plots[i]) continue;
      while (k < t3.length && !(g.seeds[t3[k]] > 0)) k++;
      if (k < t3.length) Gd.plant(s, i, t3[k++]);
    }
    return;
  }
  if (!goal) return;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const i = y * 6 + x;
    if ((x + y) % 2 === 0 || g.plots[i]) continue;   // damier : une case sur deux reste vide pour les mutations
    const id = y % 2 === 0 ? goal.a : goal.b;
    if (seedFor(id)) Gd.plant(s, i, id);
  }
}

// ---------------------------------------------------------------- Ateliers
function workshops() {
  // Alchimie : préparer ce qui est possible (2 de chaque au plus), boire les potions de combat
  const dissonant = s.garden.plots.some(p => p?.dissonantSince);
  for (const p of POTIONS) {
    if (!Cr.potionUnlocked(s, p.id)) continue;
    const want = p.effect === 'purete' ? (dissonant ? 2 : 0) : p.effect === 'eclats' ? 1 : 2;
    while ((s.potions[p.id] ?? 0) < want && Cr.brew(s, p.id, 1)) craftLog.potions++;
  }
  for (const p of POTIONS) {
    if (['purete', 'eclats'].includes(p.effect) || (s.potions[p.id] ?? 0) <= 0 || (s.buffs[p.id] ?? 0) > wall) continue;
    if (Cr.drink(s, p.id)) craftLog.bues++;
  }
  // Cuisine
  if (!Fi.mealActive(s)) {
    const m = [...MEALS].reverse().find(x => Fi.mealUnlocked(s, x) && canPay(s, x.cost));
    if (m && Fi.eat(s, m.id)) craftLog.repas++;
  }
  // Forge : pièces de panoplie manquantes, puis commandes pour l'emplacement le plus faible
  for (const d of SETS) {
    if (!Fo.setUnlocked(s, d.id)) continue;
    for (const p of d.pieces) if (!(s.forge.sets[d.id] ?? []).includes(p.slot) && Fo.forgePiece(s, d.id, p.slot, rnd)) craftLog.pieces++;
  }
  if (s.metal >= orderMetal(s.run.floor) * 3) {
    const weakest = SLOTS.map(x => ({ x: x.id, sc: I.equippedIn(s, x.id) ? I.score(I.equippedIn(s, x.id)!) : -1 })).sort((a, b) => a.sc - b.sc)[0];
    const stat = ['torse', 'jambes'].includes(weakest.x) ? 'comp' : SLOT_PRIMARY[weakest.x] === 'crit' ? 'frappe' : SLOT_PRIMARY[weakest.x];
    if (ORDER_STATS.includes(stat) && Fo.order(s, weakest.x, stat, rnd)) craftLog.commandes++;
  }
}

// ---------------------------------------------------------------- Expéditions (avant de poser le téléphone)
function expeditions(gapSeconds: number) {
  s.expeditions.forEach((_, i) => {});
  for (let i = s.expeditions.length - 1; i >= 0; i--) if (Ex.isDone(s.expeditions[i])) { Ex.claim(s, i); }
  const hours = gapSeconds >= 8 * 3600 ? 8 : gapSeconds >= 4 * 3600 ? 4 : 1;
  const open = ZONES.filter(z => Ex.zoneOpen(s, z.id));
  while (s.expeditions.length < Ex.slots(s) && open.length) {
    // zone dont la ressource principale manque le plus (la mine pour le métal en priorité)
    const z = [...open].sort((a, b) => (has(s, Object.keys(a.perHour)[0]) + (a.metal ? -50 : 0)) - (has(s, Object.keys(b.perHour)[0]) + (b.metal ? -50 : 0)))[0];
    if (!Ex.send(s, z.id, hours)) break;
    craftLog.expeditions++;
    open.splice(open.indexOf(z), 1);
  }
}

function spendFragments() {
  const prio = ['auto_achat', 'harmonique', 'depart', 'echo_eclats', 'auto_partitions', 'echo_or', 'souvenir', 'auto_ascension'];
  for (let g = 0; g < 200; g++) {
    const opts = prio.map(id => SYMPHONY.find(n => n.id === id)!).filter(n => Rz.sym(s, n.id) < n.max)
      .map(n => ({ id: n.id, c: symCost(n, Rz.sym(s, n.id)) })).filter(o => o.c <= s.resonance.fragments).sort((a, b) => a.c - b.c);
    if (!opts.length || !Rz.buySym(s, opts[0].id)) break;
  }
}

function resonateMaybe(): boolean {
  if (!Rz.canResonate(s) || Rz.fragmentsFor(s) < Math.max(5, s.resonance.total)) return false;
  const gain = E.resonate(s, CLASS);
  resLog.push(`R${s.resonance.count} j${day} ${h(active)} record ${s.bestFloor} +${gain} fragments`);
  E.drainEvents();
  spendFragments(); spendEclats();
  runStart = active; lastRecordAt = active; lastRecord = s.run.floor;
  return true;
}

function ascend() {
  if (resonateMaybe()) return;
  if ((s.potions.brume ?? 0) > 0) Cr.drink(s, 'brume');
  const gain = E.ascensionGain(s);
  ascLog.push(`A${s.ascensions + 1} j${day} ${h(active)} étage ${s.run.maxFloor} +${gain}`);
  E.ascend(s, CLASS);
  E.drainEvents();
  spendEclats();
  runStart = active; lastRecordAt = active; lastRecord = s.run.floor;
}

function playSession(seconds: number) {
  let acc = 0, base = between(P.cps), paused = 0;
  garden(); workshops();
  for (let t = 0; t < seconds; t += DT) {
    // rythme humain : variations, rafales contre les boss, pauses dans les menus
    if (Math.floor(t) !== Math.floor(t - DT)) {
      if (paused > 0) paused--;
      else if (rnd() < P.pause / 10) paused = 3 + Math.floor(rnd() * 8);
      base = Math.min(P.cps[1], Math.max(P.cps[0], base + (rnd() - 0.5)));
    }
    cps = paused > 0 ? 0 : s.run.monster.kind === 'boss' ? between(P.boss) : base;
    const taps = cps * DT;
    for (let k = 0; k < Math.floor(taps) + (rnd() < taps % 1 ? 1 : 0); k++) E.tap(s);
    if (s.run.parryUntil && rnd() < P.parry * DT * 3) E.parry(s);
    PARTITIONS.forEach((_, i) => E.castPartition(s, i));
    E.tick(s, DT);
    active += DT; wall += DT * 1000; acc += DT;
    if (acc >= 2) { acc = 0; shop(); }
    if (Math.floor(active) % 30 === 0 && t % 30 < DT) { buyOffers(); gear(); fief(); anchors(); }
    if (Math.floor(active) % 120 === 0 && t % 120 < DT) { garden(); workshops(); }
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
const sessionFloors: number[] = [];
console.log('TUNE', process.env.TUNE ?? '(défaut)');
console.log(`Profil ${PROFILE} (${P.sessions} × ${P.minutes} min/j, ${P.cps.join('–')} frappes/s, ${P.boss.join('–')} contre les boss), classe ${CLASS}, ${DAYS} jours\n`);
console.log('jour | actif | record | asc | légende | arcanes | étoiles');
for (; day <= DAYS; day++) {
  const gap = (16 * 3600) / P.sessions;
  for (let k = 0; k < P.sessions; k++) {
    playSession(P.minutes * 60);
    if (day === 1) sessionFloors.push(s.bestFloor);
    const off = k === P.sessions - 1 ? 8 * 3600 + (gap - P.minutes * 60) : gap - P.minutes * 60;
    expeditions(off); garden();
    wall += off * 1000;
    const rep = E.applyOffline(s, off);
    if (process.env.TRACE && rep) console.log(`  hors-ligne ${(off / 3600).toFixed(1)}h : +${rep.gold.toExponential(1)} or, +${rep.floors} ét. (or en poche avant achats)`);
    E.drainEvents();
    shop();
  }
  const stars = Object.values(s.constellations).reduce((a, b) => a + b, 0);
  if ([1, 2, 3, 5, 7, 10, 14, 20, 25, 30, 40, 45, 50, 60, 75, 90, 120].includes(day)) console.log(`${String(day).padStart(4)} | ${h(active).padStart(5)} | ${String(s.bestFloor).padStart(6)} | ${String(s.ascensions).padStart(3)} | ${String(s.legende).padStart(7)} | ${String(Ar.owned(s)).padStart(7)} | ${stars}`);
}
console.log('\nJour 1, record à la fin de chaque session :', sessionFloors.join(' → '), PAYER ? `· achats : ${payLog.join(', ')}` : '');
console.log('\nPremière arrivée :', MARKS.map(m => `${m}→${firstReach[m] ?? '—'}`).join('  '));
console.log('\nRésonances :\n' + (resLog.join('\n') || '—'));
console.log('Ancres terminées :', JSON.stringify(anchorDay));
console.log('\nMétiers :', Object.entries(s.jobs).map(([j, x]) => `${j} ${level(s, j as never)}`).join(' · '));
console.log('Artisanat :', JSON.stringify(craftLog));
console.log('Mutations (1re fois) :', JSON.stringify(firstMutation));
console.log('Panoplies complètes :', SETS.filter(d => Fo.setComplete(s, d.id)).map(d => d.id).join(', ') || '—');
console.log('\nAscensions :\n' + ascLog.slice(0, 12).join('\n') + (ascLog.length > 12 ? `\n… (${ascLog.length})\n` + ascLog.slice(-4).join('\n') : ''));

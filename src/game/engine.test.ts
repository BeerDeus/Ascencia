import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import * as E from './engine';
import { ACTS, STORY_BOSSES } from './data/world';
import { COMPANIONS, PARTITIONS, CLASSES } from './data/heroes';
import { SPEAKERS } from './data/story';
import { mobHp, eclatsFor, geomMax, geomSum } from './formulas';
import { fmt } from './format';
import * as I from './items';
import * as Ar from './arcanes';
import * as Fi from './fief';
import * as Sh from './shop';
import { ARCANES } from './data/arcanes';

const gfx = (k: string) => `public/gfx/${k}.webp`;

function bot(s: ReturnType<typeof E.newGame>, seconds: number, tps = 4) {
  const dt = 0.1;
  for (let t = 0; t < seconds; t += dt) {
    if (Math.random() < tps * dt) E.tap(s);
    if (s.run.parryUntil) E.parry(s);
    PARTITIONS.forEach((_, i) => E.castPartition(s, i));
    // achat glouton : compagnon le moins cher sinon héros
    for (let k = 0; k < 50; k++) {
      let best = -1, cost = Infinity;
      COMPANIONS.forEach((_, i) => { if (E.compUnlocked(s, i)) { const c = E.compCostN(s, i, 1); if (c < cost) { cost = c; best = i; } } });
      const hc = E.heroCostN(s, 1);
      if (hc < cost && hc <= s.run.gold) { E.buyHero(s, 1); continue; }
      if (best >= 0 && cost <= s.run.gold) { E.buyComp(s, best, 1); continue; }
      break;
    }
    E.tick(s, dt);
    E.drainEvents();
  }
}

describe('données', () => {
  it('tous les sprites référencés existent', () => {
    const sprites = [
      ...ACTS.flatMap(a => [...a.mobs, ...a.bosses].map(m => 'mobs/' + m)), ...ACTS.map(a => 'bg/' + a.bg),
      ...STORY_BOSSES.map(b => b.sprite), ...COMPANIONS.map(c => c.sprite), ...PARTITIONS.map(p => p.icon),
      ...CLASSES.flatMap(c => [c.icon, c.portrait]), ...Object.values(SPEAKERS).flatMap(s => s.sprite ? [s.sprite] : []),
      'mobs/gobelin_vulnerable', ...ARCANES.map(a => 'cards/' + a.id),
    ];
    const missing = sprites.filter(k => !existsSync(gfx(k)));
    expect(missing).toEqual([]);
  });
});

describe('formules', () => {
  it('courbes', () => {
    expect(mobHp(1)).toBe(10);
    expect(eclatsFor(29)).toBe(0);
    expect(eclatsFor(50)).toBe(6);
    expect(eclatsFor(100)).toBe(37);
    expect(geomMax(10, 1.07, geomSum(10, 1.07, 7) + 0.01)).toBe(7);
    expect(fmt(1234)).toBe('1.23K');
    expect(fmt(1e15)).toBe('1.00aa');
  });
});

describe('moteur', () => {
  it('frapper tue et rapporte de l’or', () => {
    const s = E.newGame(); s.classId = 'guerrier';
    for (let i = 0; i < 200; i++) E.tap(s);
    expect(s.stats.kills).toBeGreaterThan(5);
    expect(s.run.gold).toBeGreaterThan(0);
  });
  it('sérialisation aller-retour', () => {
    const s = E.newGame(); s.classId = 'mage'; s.run.monster.hp = Infinity;
    const back = E.deserialize(E.serialize(s))!;
    expect(back.classId).toBe('mage');
    expect(back.run.monster.hp).toBe(Infinity);
  });
  it('défaite scénarisée au 50 puis Ascension', () => {
    const s = E.newGame(); s.classId = 'archer';
    E.newRun(s, 50); s.bestFloor = 50; s.run.maxFloor = 50;
    E.challengeBoss(s);
    expect(s.run.monster.hp).toBe(Infinity);
    for (let i = 0; i < 200; i++) E.tick(s, 0.1);
    expect(s.ascensionUnlocked).toBe(true);
    expect(s.run.farming).toBe(true);
    const gain = E.ascend(s, 'mage');
    expect(gain).toBe(12);
    expect(s.legende).toBe(12);
    expect(s.run.floor).toBe(1);
    expect(E.buyStar(s, 'glaive_frappe')).toBe(true);
  });
  it('rythme : un bot atteint l’étage 25 en < 25 min et progresse hors-ligne', () => {
    const s = E.newGame(); s.classId = 'guerrier';
    const marks: Record<number, number> = {};
    for (let m = 1; m <= 25; m++) { bot(s, 60); marks[m] = s.run.floor; }
    console.log('étage par minute :', Object.values(marks).join(' '));
    expect(s.run.floor).toBeGreaterThanOrEqual(25);
    const g = s.run.gold;
    const rep = E.applyOffline(s, 3600)!;
    expect(rep.gold).toBeGreaterThan(0);
    expect(s.run.gold).toBeGreaterThan(g);
  });

  it('équipement : butin, bonus, Forge et Héritage', () => {
    const s = E.newGame(); s.classId = 'guerrier'; s.bestFloor = 40;
    E.newRun(s, 40);
    const base = E.stats(s).tap;
    const it = I.makeItem(s, 40, 3, Math.random, 'arme');
    I.addItem(s, it);
    expect(s.run.equipped.arme).toBe(it.id);
    expect(E.stats(s).tap).toBeGreaterThan(base * 1.5);
    s.metal = 1e6;
    expect(I.upgrade(s, it.id)).toBe(true);
    expect(it.plus).toBe(1);
    const junk = I.makeItem(s, 40, 0, Math.random, 'tete'); I.addItem(s, junk);
    const junk2 = I.makeItem(s, 40, 0, Math.random, 'tete'); I.addItem(s, junk2);
    expect(I.recycle(s, junk2.id)).toBeGreaterThan(0);
    I.setHeritage(s, it.id);
    s.ascensionUnlocked = true; s.run.maxFloor = 60;
    E.ascend(s, 'mage');
    expect(s.run.inventory.map(i => i.id)).toEqual([it.id]);
    expect(s.run.equipped.arme).toBe(it.id);
  });

  it('Arcanes : pioche, amélioration, effets', () => {
    const s = E.newGame(); s.classId = 'guerrier'; s.ascensions = 1; s.eclats = 1000;
    const base = E.stats(s).tap;
    s.arcanes.empereur = 1;
    expect(E.stats(s).tap).toBeGreaterThan(base * 1.2);
    const id = Ar.draw(s, () => 0)!;
    expect(s.arcanes[id]).toBe(1);
    expect(Ar.upgradeArcane(s, id)).toBe(true);
    expect(s.arcanes[id]).toBe(2);
  });
  it('Fief : primes quotidiennes et repas', () => {
    const s = E.newGame(); s.classId = 'guerrier'; s.bestFloor = 40; E.newRun(s, 40);
    Fi.dailyCheck(s);
    expect(s.daily.bounties).toHaveLength(3);
    const b = s.daily.bounties[0];
    s.daily.c[b.c] = b.target;
    expect(Fi.claimBounty(s, 0)).toBe(true);
    expect(Fi.claimBounty(s, 0)).toBe(false);
    s.run.gold = 1e30;
    const before = E.stats(s).goldMult;
    expect(Fi.eat(s, 'soupe')).toBe(true);
    expect(E.stats(s).goldMult).toBeCloseTo(before * 1.6);
    expect(Fi.eat(s, 'steak')).toBe(false);
  });

  it('Boutique : bénédictions, quotas de pub, calendrier, Messager, packs', () => {
    const s = E.newGame(); s.classId = 'guerrier'; s.bestFloor = 30; E.newRun(s, 30);
    Sh.shopCheck(s);
    s.gems = 100;
    const dmg = E.stats(s).tap;
    expect(Sh.buyBlessing(s, 'force')).toBe(true);
    expect(s.gems).toBe(60);
    expect(E.stats(s).tap).toBeCloseTo(dmg * 2);
    for (let i = 0; i < 5; i++) expect(Sh.adGems(s)).toBe(true);
    expect(Sh.adGems(s)).toBe(false);
    expect(E.claimCalendar(s)).toBe('+10 gemmes');
    expect(E.claimCalendar(s)).toBeNull();
    s.messenger = { until: s.time + 5 };
    expect(E.claimMessenger(s, 3)).not.toBeNull();
    expect(s.messenger).toBeNull();
    expect(Sh.grantPack(s, 'noads')).toBe(true);
    expect(Sh.grantPack(s, 'noads')).toBe(false);
    expect(Sh.noAds(s)).toBe(true);
    const migrated = E.deserialize(JSON.stringify({ ...JSON.parse(E.serialize(s)), shop: undefined, gems: undefined }))!;
    expect(migrated.gems).toBe(0);
    expect(migrated.shop.ads).toEqual({});
  });
});

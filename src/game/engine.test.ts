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
import * as Ach from './achievements';
import * as Rz from './resonance';
import { setClock } from './clock';
import * as Gd from './garden';
import * as Cr from './crafting';
import * as Ex from './expeditions';
import * as Jb from './jobs';
import * as Fo from './forge';
import * as Ec from './echo';
import { AUBE } from './data/packs';
import { SETS } from './data/forge';
import { PLANTS, plantSprite } from './data/garden';
import { RESOURCES } from './data/resources';
import { POTIONS, MEALS } from './data/crafting';
import { ZONES } from './data/expeditions';
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
      ...PLANTS.flatMap(p => [1, 2, 3].map(k => plantSprite(p.id, k))), ...Object.values(RESOURCES).map(r => r.sprite),
      ...SETS.flatMap(d => d.pieces.map(p => p.base)), ...AUBE.map(a => a.base), ...POTIONS.map(p => p.sprite), ...MEALS.map(m => m.sprite), ...ZONES.map(z => z.icon), 'mobs/garden_beetle', 'mobs/garden_worm',
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
    const before = E.stats(s).goldMult;
    expect(Fi.eat(s, 'soupe')).toBe(false);          // pas d'ingrédients
    Jb.give(s, 'racine_terreuse', 2); Jb.give(s, 'champignon_terreux', 1);
    expect(Fi.eat(s, 'soupe')).toBe(true);
    expect(s.res.racine_terreuse).toBe(0);
    expect(E.stats(s).goldMult).toBeCloseTo(before * 1.6);
    expect(Fi.eat(s, 'soupe')).toBe(false);          // un plat à la fois
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

  it('Hauts faits : détection, annonce unique, encaissement', () => {
    const s = E.newGame(); s.classId = 'guerrier';
    s.bestFloor = 60; s.stats.kills = 1500;
    const ready = Ach.claimable(s).map(a => a.id);
    expect(ready).toEqual(expect.arrayContaining(['etage_25', 'etage_50', 'kills_100', 'kills_1000']));
    expect(Ach.newlyDone(s).length).toBe(ready.length);
    expect(Ach.newlyDone(s).length).toBe(0);
    const g = s.gems;
    expect(Ach.claimAch(s, 'etage_50')).toBe(10);
    expect(s.gems).toBe(g + 10);
    expect(Ach.claimAch(s, 'etage_50')).toBe(0);
  });

  it('Ancres, Porte du Noyau et Résonance', () => {
    let t = Date.UTC(2026, 10, 20);
    setClock(() => t);
    const s = E.newGame(); s.classId = 'archer'; s.bestFloor = 299; s.ascensions = 30; s.ascensionUnlocked = true;
    s.legende = 90000; s.eclats = 500; s.constellations = { glaive_frappe: 10 }; s.arcanes = { empereur: 7 };
    E.newRun(s, 300); s.run.maxFloor = 300;
    // Porte du Noyau : scellée avant la 1re Résonance
    E.challengeBoss(s);
    expect(s.run.monster.locked).toBe(true);
    E.damage(s, 1e300);
    expect(s.run.monster.hp).toBeGreaterThan(0);
    // Création
    s.metal = 1000;
    expect(Rz.plantSeed(s)).toBe(true);
    expect(E.harvestSeed(s)).toBe(false);
    t += 49 * 3600_000;
    expect(E.harvestSeed(s)).toBe(true);
    // Chaos : on gagne les trois chasses
    for (const id of ['leviathan', 'phenix', 'loup']) {
      expect(E.startHunt(s, id)).toBe(true);
      E.damage(s, 1e300);
      expect(s.anchors.hunts[id]).toBe(true);
      expect(s.run.floor).toBe(300);
    }
    // Destinée
    s.anchors.compass = { 255: true, 265: true, 275: true };
    expect(Rz.anchorsDone(s)).toBe(true);
    const frag = E.resonate(s);
    expect(frag).toBe(Math.floor(6 * Math.sqrt(90)));
    expect(s.legende).toBe(0);
    expect(s.constellations).toEqual({});
    expect(s.arcanes.empereur).toBe(1);
    expect(s.resonance.count).toBe(1);
    // Harmoniques : ×2,7 par niveau
    const before = E.stats(s).tap;
    expect(Rz.buySym(s, 'harmonique')).toBe(true);
    expect(E.stats(s).tap).toBeCloseTo(before * 2.7);
    // Porte du Noyau franchissable après la Résonance
    E.newRun(s, 300); E.challengeBoss(s);
    expect(s.run.monster.locked).toBe(false);
    setClock(() => Date.now());
  });

  it('Jardin : pousse, mutation par voisinage, récolte, Graine-Cœur', () => {
    let t = Date.UTC(2026, 10, 2, 12);  // printemps
    setClock(() => t);
    Gd.setGardenRandom(() => 0.01);       // tous les jets réussissent
    const s = E.newGame(); s.classId = 'mage'; s.bestFloor = 30;
    Gd.gardenTick(s);
    s.garden.seeds = { herbe_robuste: 1, fleur_rosee: 1 };
    expect(Gd.plant(s, 0, 'herbe_robuste')).toBe(true);   // (0,0)
    expect(Gd.plant(s, 2, 'fleur_rosee')).toBe(true);     // (2,0) — la case (1,0) les touche toutes les deux
    t += 3600_000; Gd.gardenTick(s);
    expect(Gd.mature(s.garden.plots[0])).toBe(true);
    expect(s.garden.plots[1]?.plant).toBe('trefle_dore');  // mutation sur la case vide du milieu
    expect(s.garden.known).toContain('trefle_dore');
    s.garden.plots[0]!.pest = true;
    expect(Gd.removePest(s, 0)).toBe(true);
    const r = E.gardenHarvest(s, 0)!;
    expect(r.qty).toBeGreaterThan(0);
    expect(s.res.herbe_robuste).toBe(r.qty);
    // Graine-Cœur : parcelle (1,1) entourée de 4 plantes de rang III
    s.garden.plots = Array(36).fill(null);
    for (const [i, id] of [[1, 'tournesol_radieux'], [6, 'cristal_givre'], [8, 'orchidee_silencieuse'], [13, 'tournesol_radieux']] as const)
      s.garden.plots[i] = { plant: id, progress: 1 };
    expect(Gd.mutationFor(s, 7)?.result).toBe('yggdrasil');
    t += 3600_000; Gd.gardenTick(s);
    expect(s.garden.plots[7]?.plant).toBe('yggdrasil');
    s.garden.plots[7]!.progress = 1;
    expect(E.gardenHarvest(s, 7)?.anchor).toBe(true);
    expect(s.anchors.seedDone).toBe(true);
    Gd.setGardenRandom(Math.random); setClock(() => Date.now());
  });
  it('Alchimie, expéditions et ressources de monstres', () => {
    let t = Date.UTC(2026, 10, 20);
    setClock(() => t);
    const s = E.newGame(); s.classId = 'guerrier'; s.bestFloor = 50; E.newRun(s, 40);
    Jb.give(s, 'herbe_robuste', 3); Jb.give(s, 'gelee_slime', 1);
    expect(Cr.brew(s, 'tisane', 2)).toBe(1);
    expect(s.jobs.alchimiste).toBeGreaterThan(0);
    const tap = E.stats(s).tap;
    expect(Cr.drink(s, 'tisane')).toBe(true);
    expect(E.stats(s).tap).toBeCloseTo(tap * 1.5);
    expect(Ex.send(s, 'mine', 4)).toBe(true);
    expect(Ex.send(s, 'foret', 1)).toBe(false);   // une seule place au début
    expect(Ex.claim(s, 0)).toBeNull();
    t += 4 * 3600_000;
    const loot = Ex.claim(s, 0)!;
    expect(loot.res.pierre).toBeGreaterThan(0);
    expect(s.metal).toBe(loot.metal);
    // ressources de monstres : boss = 100 %
    E.challengeBoss(s); E.damage(s, 1e300);
    expect(Object.values(s.res).reduce((a, b) => a + b, 0)).toBeGreaterThan(0);
    setClock(() => Date.now());
  });

  it('Forge : commande ciblée, panoplie portée et bonus permanent', () => {
    const s = E.newGame(); s.classId = 'guerrier'; s.bestFloor = 20; E.newRun(s, 20);
    s.metal = 1000;
    for (const [id, n] of Object.entries({ bois: 50, pierre: 50, peau_gobelin: 50, queue_rat: 50, croc_loup: 50 })) Jb.give(s, id, n);
    const it = Fo.order(s, 'anneau', 'comp')!;
    expect(it.slot).toBe('anneau');
    expect(it.affixes[0].stat).toBe('comp');
    expect(it.rarity).toBeGreaterThanOrEqual(1);
    const base = E.stats(s);
    for (const sl of ['tete', 'torse', 'mains', 'pieds'] as const) { const p = Fo.forgePiece(s, 'hameau', sl)!; expect(p.set).toBe('hameau'); I.equip(s, p.id); }
    expect(Fo.setComplete(s, 'hameau')).toBe(true);
    expect(Fo.permanentSetMult(s)).toBeCloseTo(1.1);
    expect(E.stats(s).goldMult).toBeGreaterThan(base.goldMult * 1.4);   // 2 pièces : +50 % or
    // le bonus permanent survit à l'Ascension
    s.ascensionUnlocked = true; s.run.maxFloor = 40; E.ascend(s, 'mage');
    expect(Fo.permanentSetMult(s)).toBeCloseTo(1.1);
  });

  it('Le Chant : néant, îlots de mémoire, mélodie, victoire et voie', () => {
    const f = Ec.newFight(); let x = 0.3;
    const rnd = () => (x = (x * 9301 + 49297) % 233280 / 233280);
    Ec.begin(f);
    let islands = 0;
    for (let k = 0; k < 6; k++) {
      while ((f.phase as string) === 'void') { Ec.tick(f, 0.1, rnd); for (const i of [...f.islands]) if (Ec.tapIsland(f, i.id) >= 0) islands++; }
      expect(f.phase).toBe('show');
      while ((f.phase as string) === 'show') Ec.tick(f, 0.1, rnd);
      expect(Ec.press(f, (f.seq[0] + 1) % 5)).toBe('fail');   // erreur : on rejoue la démonstration
      while ((f.phase as string) === 'show') Ec.tick(f, 0.1, rnd);
      for (const n of f.seq) Ec.press(f, n);
    }
    expect(islands).toBeGreaterThan(5);
    expect(f.phase).toBe('won');
    expect(f.silence).toBeCloseTo(0);
    const s = E.newGame(); s.classId = 'mage'; s.bestFloor = 401;
    expect(E.echoAvailable(s)).toBe(true);
    const base = E.stats(s).tap;
    E.finishEcho(s, 'lier');
    expect(E.stats(s).tap).toBeCloseTo(base * 3);
    expect(E.echoAvailable(s)).toBe(false);
    // sans toucher les îlots, le Néant finit par gagner
    const g = Ec.newFight(); Ec.begin(g);
    for (let k = 0; k < 400 && g.phase !== 'lost'; k++) { Ec.tick(g, 0.1, rnd); if (g.phase === 'input') Ec.press(g, (g.seq[g.input] + 1) % 5); }
    expect(g.phase).toBe('lost');
  });

  it('Packs d’étape : Aube liée au compte, record requis, survit à l’Ascension, niveau fixe', () => {
    const s = E.newGame(); s.classId = 'guerrier'; s.bestFloor = 12; E.newRun(s, 12);
    expect(Sh.pendingOffer(s, false)?.id).toBe('aube1');
    const tap = E.stats(s).tap;
    expect(E.grantPurchase(s, 'aube1')).toBe(true);
    expect(E.grantPurchase(s, 'aube1')).toBe(false);          // achat unique
    expect(s.vault).toHaveLength(2);
    expect(s.run.equipped.arme).toBe(s.vault[0].id);
    expect(E.stats(s).tap).toBeGreaterThan(tap * 1.5);
    expect(I.recycle(s, s.vault[1].id)).toBe(0);              // jamais recyclable
    // pièces à record minimum : visibles mais pas portables avant le record 50
    E.grantPurchase(s, 'aube2');
    const armure = s.vault.find(v => v.slot === 'torse')!;
    expect(I.canWear(s, armure)).toBe(false);
    expect(s.run.equipped.torse).not.toBe(armure.id);
    // l'Ascension rend les pièces et elles suivent l'étage
    s.bestFloor = 60; s.ascensionUnlocked = true; s.run.maxFloor = 60;
    E.ascend(s, 'archer');
    expect(s.run.inventory.filter(i => i.bound)).toHaveLength(5);
    expect(s.run.equipped.torse).toBe(armure.id);
    const lame = s.vault[0];
    const low = I.affixNow(s, lame, lame.affixes[0]);
    E.newRun(s, 120);
    expect(I.affixNow(s, lame, lame.affixes[0])).toBe(low);           // niveau fixe : la Forge le dépasse plus haut
    s.metal = 1e5; for (const [id, n] of Object.entries({ bois: 9, pierre: 9 })) Jb.give(s, id, n);
    const forged = Fo.order(s, 'arme', 'frappe')!;
    expect(I.affixNow(s, forged, forged.affixes[0])).toBeGreaterThan(low);
    // sérialisation : une seule instance (la Forge +1 se retrouve dans le coffre)
    const back = E.deserialize(E.serialize(s))!;
    const it = back.run.inventory.find(i => i.id === lame.id)!;
    back.metal = 1e6; I.upgrade(back, it.id);
    expect(back.vault.find(v => v.id === lame.id)!.plus).toBe(1);
    // objets en gemmes
    s.gems = 500;
    expect(E.buyGemItem(s, 'parchemin')).toBe(true);
    expect(E.buyGemItem(s, 'parchemin')).toBe(false);
    s.run.maxFloor = 100; const g1 = E.ascensionGain(s); s.shop.eclatsBoost = false;
    expect(g1).toBeGreaterThan(E.ascensionGain(s) * 1.4);
  });
});

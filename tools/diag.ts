// Diagnostic : décompose la puissance du héros au fil de la 1re run.
import * as E from '../src/game/engine';
import * as F from '../src/game/formulas';
import * as I from '../src/game/items';
import { COMPANIONS, PARTITIONS } from '../src/game/data/heroes';
const s = E.newGame(); s.classId = 'guerrier'; E.newRun(s, 1);
let t = 0, next = 5;
const useParts = process.argv[2] !== 'noparts', useGear = process.argv[3] !== 'nogear';
while (t < 3600 && s.run.floor < 120) {
  if (Math.random() < 0.8) E.tap(s);
  if (s.run.parryUntil) E.parry(s);
  if (useParts) PARTITIONS.forEach((_, i) => E.castPartition(s, i));
  E.tick(s, 0.2); t += 0.2;
  if (Math.round(t * 5) % 10 === 0) {
    for (let k = 0; k < 40; k++) {
      let best = -1, c = Infinity;
      COMPANIONS.forEach((_, i) => { if (E.compUnlocked(s, i)) { const x = E.compCostN(s, i, 1); if (x < c) { c = x; best = i; } } });
      if (E.heroCostN(s, 1) < c && E.heroCostN(s, 1) <= s.run.gold) E.buyHero(s, 1); else if (c <= s.run.gold) E.buyComp(s, best, 1); else break;
    }
    if (useGear) I.equipBest(s); else s.run.equipped = {};
  }
  E.drainEvents();
  if (s.run.floor >= next) {
    const st = E.stats(s), g = I.gearTotals(s);
    console.log(`ét.${s.run.floor} ${(t / 60).toFixed(1)}min héros ${s.run.heroLevel} comp ${s.run.companions.filter(x => x).length} tap ${st.tap.toExponential(1)} dps ${st.dps.toExponential(1)} mobHP ${F.mobHp(s.run.floor).toExponential(1)} gear frappe+${(g.frappe * 100).toFixed(0)}% comp+${(g.comp * 100).toFixed(0)}% or ${s.run.gold.toExponential(1)}`);
    next += 5;
  }
}

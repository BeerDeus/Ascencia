<script lang="ts">
  import { G, ui, act } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { COMPANIONS, MILESTONES } from '../game/data/heroes';
  import { compDps, nextMilestone } from '../game/formulas';
  import { gearTotals } from '../game/items';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import BuyMult from './BuyMult.svelte';
  import { sfxUp } from '../lib/audio';

  const s = $derived(G.s);
  const st = $derived(E.stats(G.s));
  const N = (x: number) => fmt(x, s.settings.notation);
  const visible = $derived(COMPANIONS.map((_, i) => i).filter(i => i === 0 || s.run.companions[i - 1] > 0 || s.run.companions[i] > 0));
  const mult = $derived(st.global * (1 + E.star(s, 'meute_dps')) * (1 + gearTotals(s).comp));
  const TYPE = { melee: 'Mêlée', distance: 'Distance', magie: 'Magie' };
  function count(i: number) { return ui.buyMult || Math.max(1, E.compMax(s, i)); }
  function buy(i: number) { if (act(g => E.buyComp(g, i, count(i)))) sfxUp(); }
</script>

<div class="top"><span class="label">Alliés · {N(st.dps)} DPS</span><BuyMult /></div>
<div class="scroll list">
  {#each visible as i (i)}
    {@const c = COMPANIONS[i]}
    {@const lv = s.run.companions[i]}
    {@const n = count(i)}
    {@const cost = E.compCostN(s, i, n)}
    {@const nm = nextMilestone(lv)}
    {@const prev = [...MILESTONES].reverse().find(t => t <= lv) ?? 0}
    <div class="c frame" class:hired={lv > 0}>
      <div class="pic slot"><img src={gfx(c.sprite)} alt="" /></div>
      <div class="mid">
        <div class="nm">{c.name}{#if lv}<b> {lv}</b>{/if}</div>
        <div class="tt"><span class="t-{c.type}">{TYPE[c.type]}</span> · {c.title}</div>
        <div class="dps">{lv ? N(compDps(i, lv) * mult) + ' DPS' : '+' + N(compDps(i, 1) * mult) + ' DPS'}</div>
        {#if lv && nm}<div class="ms"><div class="bar"><i style="width:{((lv - prev) / (nm - prev)) * 100}%"></i></div><span>{nm} : ×{nm < 200 ? '2,5' : '3'}</span></div>{/if}
      </div>
      <button class="btn" disabled={cost > s.run.gold} onclick={() => buy(i)}>
        <span class="b1">{lv ? '+' + n : 'Recruter'}</span><span class="b2">{N(cost)}</span>
      </button>
    </div>
  {/each}
  {#if visible.length < COMPANIONS.length}
    <div class="c frame ghost"><div class="pic slot">?</div><div class="mid"><div class="nm">???</div><div class="tt">Recrutez le précédent pour le découvrir.</div></div></div>
  {/if}
</div>

<style>
  .top { display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; }
  .list { flex: 1; padding: 0 8px 8px; display: flex; flex-direction: column; gap: 5px; }
  .c { display: flex; align-items: center; gap: 8px; padding: 5px 6px; }
  .c.hired { background: var(--stone-2); }
  .pic { width: 50px; height: 50px; flex: none; display: grid; place-items: center; overflow: hidden; color: var(--text-3); font-size: 20px; }
  .pic img { width: 46px; height: 46px; object-fit: contain; object-position: top; }
  .mid { flex: 1; min-width: 0; }
  .nm { font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nm b { color: var(--gold); }
  .tt { font-size: 11px; color: var(--text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .t-melee { color: #e3907a; } .t-distance { color: var(--moss); } .t-magie { color: var(--sky); }
  .dps { font-size: 12px; color: var(--text-2); }
  .ms { display: flex; align-items: center; gap: 6px; margin-top: 2px; }
  .ms .bar { flex: 1; height: 6px; border-width: 1px; }
  .ms .bar > i { background: var(--arcane); }
  .ms span { font-size: 10px; color: var(--text-3); }
  .btn { flex-direction: column; gap: 1px; min-width: 82px; padding: 5px 6px; }
  .b1 { font-size: 12px; } .b2 { font-size: 13px; }
  .ghost { opacity: .5; }
</style>

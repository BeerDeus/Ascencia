<script lang="ts">
  import { G, ui, act } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { COMPANIONS, MILESTONES } from '../game/data/heroes';
  import { compDps, nextMilestone } from '../game/formulas';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import BuyMult from './BuyMult.svelte';
  import { sfxUp } from '../lib/audio';

  const s = $derived(G.s);
  const st = $derived(E.stats(G.s));
  const N = (x: number) => fmt(x, s.settings.notation);
  const visible = $derived(COMPANIONS.map((_, i) => i).filter(i => i === 0 || s.run.companions[i - 1] > 0 || s.run.companions[i] > 0));
  function count(i: number) { return ui.buyMult || Math.max(1, E.compMax(s, i)); }
  function buy(i: number) { if (act(g => E.buyComp(g, i, count(i)))) sfxUp(); }
  const mult = $derived(st.global * (1 + E.star(s, 'meute_dps')));
</script>

<div class="top"><span class="title">Compagnons</span><BuyMult /></div>
<div class="scroll list">
  {#each visible as i (i)}
    {@const c = COMPANIONS[i]}
    {@const lv = s.run.companions[i]}
    {@const n = count(i)}
    {@const cost = E.compCostN(s, i, n)}
    {@const nm = nextMilestone(lv)}
    {@const prev = [...MILESTONES].reverse().find(t => t <= lv) ?? 0}
    <div class="c" class:hired={lv > 0}>
      <img class="px" src={gfx(c.sprite)} alt="" />
      <div class="mid">
        <div class="nm">{c.name} <span class="lv num">{lv ? 'niv. ' + lv : ''}</span></div>
        <div class="tt">{c.title} · <span class="t-{c.type}">{c.type}</span></div>
        <div class="dps num">{lv ? N(compDps(i, lv) * mult) + ' DPS' : '+' + N(compDps(i, 1) * mult) + ' DPS au recrutement'}</div>
        {#if lv && nm}<div class="bar ms"><i style="width:{((lv - prev) / (nm - prev)) * 100}%"></i></div><div class="msl">Palier {nm} : ×{nm < 200 ? '2,5' : '3'}</div>{/if}
      </div>
      <button class="btn" disabled={cost > s.run.gold} onclick={() => buy(i)}>
        <span>{lv ? '+' + n : 'Recruter'}</span><span class="num">{N(cost)}</span>
      </button>
    </div>
  {/each}
  {#if visible.length < COMPANIONS.length}
    <div class="c ghost"><div class="sil">?</div><div class="mid"><div class="nm">Compagnon inconnu</div><div class="tt">Recrutez le précédent pour le découvrir.</div></div></div>
  {/if}
</div>

<style>
  .top { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; }
  .top .title { font-size: 13px; color: var(--ink-3); }
  .list { flex: 1; padding: 0 10px 10px; display: flex; flex-direction: column; gap: 6px; }
  .c { display: flex; align-items: center; gap: 10px; background: var(--panel); border-radius: 12px; padding: 7px 8px; box-shadow: inset 0 0 0 1px var(--line); }
  .c.hired { background: linear-gradient(90deg, #22193f, var(--panel)); }
  .c > img { width: 48px; height: 52px; object-fit: contain; flex: none; }
  .mid { flex: 1; min-width: 0; }
  .nm { font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .lv { color: var(--gold); font-size: 13px; }
  .tt { font-size: 11px; color: var(--ink-3); }
  .t-melee { color: #ff9a7a; } .t-distance { color: #8fe3a5; } .t-magie { color: #9fb8ff; }
  .dps { font-size: 12px; color: var(--ink-2); }
  .ms { height: 4px; margin-top: 3px; }
  .ms > i { background: var(--violet); }
  .msl { font-size: 10px; color: var(--ink-3); }
  .btn { flex-direction: column; gap: 0; min-width: 84px; padding: 6px 8px; font-size: 12px; line-height: 1.15; }
  .ghost { opacity: .5; }
  .sil { width: 48px; height: 52px; display: grid; place-items: center; font-size: 26px; color: var(--ink-3); }
</style>

<script lang="ts">
  import { G, ui, act } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { CLASSES } from '../game/data/heroes';
  import { masteryLevel } from '../game/formulas';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { legendeMult } from '../game/formulas';

  const s = $derived(G.s);
  const st = $derived(E.stats(G.s));
  const pb = $derived(E.powerBreakdown(G.s));
  const cls = $derived(CLASSES.find(c => c.id === s.classId)!);
  const N = (x: number) => fmt(x, s.settings.notation);
</script>

<div class="scroll body">
  {#if cls}
    <div class="card frame">
      <img class="portrait" src={gfx(cls.portrait)} alt="" />
      <div class="info">
        <div class="cname gothic">{cls.name}</div>
        <div class="label">{cls.style}</div>
        <ul>{#each cls.perks as p}<li>{p}</li>{/each}</ul>
      </div>
    </div>
  {/if}

  <div class="up frame">
    <div>
      <div class="label">Frappe · niveau {s.run.heroLevel}</div>
      <div class="val">{N(st.tap)} <small>par coup</small></div>
    </div>
    <button class="btn stone go-allies" onclick={() => (ui.tab = 'compagnons')}>Améliorer<small>dans Alliés</small></button>
  </div>

  <div class="grid">
    <div class="slot"><span class="label">DPS alliés</span><b>{N(st.dps)}</b></div>
    <div class="slot"><span class="label">Critique</span><b>{(st.critChance * 100).toFixed(1)} % · ×{st.critMult.toFixed(1)}</b></div>
    <div class="slot"><span class="label">Or</span><b>×{st.goldMult.toFixed(2)}</b></div>
    <div class="slot"><span class="label">Volonté</span><b>{st.bossTime} s</b></div>
    {#if st.autoTaps > 0}<div class="slot"><span class="label">Tirs automatiques</span><b>{st.autoTaps.toFixed(1)}/s · {N(st.autoTaps * st.tap)}/s</b></div>{/if}
    <div class="slot"><span class="label">Légende</span><b>{N(s.legende)} (×{N(legendeMult(s.legende))})</b></div>
    <div class="slot"><span class="label">Record</span><b>Étage {s.bestFloor}</b></div>
  </div>

  {#if pb.length}
    <div class="label sub">Sources de puissance · tous les dégâts ×{N(pb.reduce((t, x) => t * x.mult, 1))}</div>
    <div class="pb">
      {#each pb as x}<div><span>{x.label}</span><b>×{x.mult >= 100 ? N(x.mult) : x.mult.toFixed(2)}</b></div>{/each}
    </div>
  {/if}

  <div class="label sub">Maîtrises — +2 % de dégâts par niveau</div>
  {#each CLASSES as c}
    {@const lv = masteryLevel(s.mastery[c.id])}
    {@const lo = 20 * lv ** 2}
    {@const hi = 20 * (lv + 1) ** 2}
    <div class="m">
      <img src={gfx(c.icon)} alt="" />
      <span class="mn">{c.name}</span>
      <div class="bar"><i style="width:{((s.mastery[c.id] - lo) / (hi - lo)) * 100}%"></i></div>
      <span class="ml">niv. {lv}</span>
    </div>
  {/each}
</div>

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 8px; }
  .card { display: flex; gap: 10px; padding: 8px; }
  .portrait { width: 70px; height: 92px; object-fit: contain; }
  .cname { font-size: 30px; line-height: 1; color: var(--gold); }
  ul { margin: 4px 0 0; padding-left: 14px; font-size: 13px; color: var(--text-2); }
  .up { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 8px 10px; }
  .val { font-size: 22px; font-weight: 700; }
  .val small { font-size: 12px; color: var(--text-3); font-weight: 500; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .grid .slot { padding: 5px 8px; display: flex; flex-direction: column; background: var(--stone-2); }
  .grid b { font-size: 14px; }
  .sub { margin-top: 4px; }
  .m { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  .m img { width: 24px; height: 24px; }
  .mn { width: 64px; }
  .m .bar { flex: 1; height: 8px; }
  .m .bar > i { background: var(--arcane); }
  .ml { width: 46px; text-align: right; color: var(--text-2); }
  .go-allies { display: flex; flex-direction: column; align-items: center; gap: 0; padding: 6px 10px; font-size: 13px; }
  .go-allies small { font-size: 10px; font-weight: 400; color: var(--text-3); }
  .pb { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 6px; }
  .pb div { display: flex; justify-content: space-between; gap: 4px; padding: 3px 6px; font-size: 11.5px; background: var(--stone-2); color: var(--text-2); }
  .pb b { color: var(--moss); }
</style>

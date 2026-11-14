<script lang="ts">
  import { G, ui, act } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { CLASSES } from '../game/data/heroes';
  import { masteryLevel } from '../game/formulas';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import BuyMult from './BuyMult.svelte';
  import { sfxUp } from '../lib/audio';

  const s = $derived(G.s);
  const st = $derived(E.stats(G.s));
  const cls = $derived(CLASSES.find(c => c.id === s.classId)!);
  const n = $derived(ui.buyMult || Math.max(1, E.heroMax(s)));
  const cost = $derived(E.heroCostN(s, n));
  const N = (x: number) => fmt(x, s.settings.notation);
  function buy() { if (act(g => E.buyHero(g, n))) sfxUp(); }
</script>

<div class="scroll body">
  {#if cls}
    <div class="card">
      <img class="px portrait" src={gfx(cls.portrait)} alt="" />
      <div class="info">
        <div class="cname title"><img class="px" src={gfx(cls.icon)} alt="" />{cls.name}</div>
        <div class="style">{cls.style}</div>
        <ul>{#each cls.perks as p}<li>{p}</li>{/each}</ul>
      </div>
    </div>
  {/if}

  <div class="row up">
    <div>
      <div class="label">Frappe · niveau <b class="num">{s.run.heroLevel}</b></div>
      <div class="val num">{N(st.tap)} <small>dégâts / coup</small></div>
    </div>
    <div class="right">
      <BuyMult />
      <button class="btn" disabled={cost > s.run.gold} onclick={buy}>+{n} · <span class="num">{N(cost)}</span></button>
    </div>
  </div>

  <div class="grid">
    <div><span>DPS Compagnons</span><b class="num">{N(st.dps)}</b></div>
    <div><span>Critique</span><b class="num">{(st.critChance * 100).toFixed(0)} % · ×{st.critMult.toFixed(1)}</b></div>
    <div><span>Bonus d’or</span><b class="num">×{st.goldMult.toFixed(2)}</b></div>
    <div><span>Volonté (boss)</span><b class="num">{st.bossTime} s</b></div>
    <div><span>Légende</span><b class="num">{N(s.legende)} · ×{N(1 + 0.05 * s.legende)}</b></div>
    <div><span>Record</span><b class="num">Étage {s.bestFloor}</b></div>
  </div>

  <div class="sub title">Maîtrises</div>
  <div class="mast">
    {#each CLASSES as c}
      {@const lv = masteryLevel(s.mastery[c.id])}
      {@const next = 20 * (lv + 1) ** 2}
      <div class="m">
        <img class="px" src={gfx(c.icon)} alt="" />
        <div class="mi"><span>{c.name} · niv. <b class="num">{lv}</b></span>
          <div class="bar"><i style="width:{(s.mastery[c.id] - 20 * lv ** 2) / (next - 20 * lv ** 2) * 100}%; background: var(--violet)"></i></div></div>
      </div>
    {/each}
  </div>
  <p class="note">Chaque niveau de Maîtrise donne +2 % de dégâts, quelle que soit la classe jouée.</p>
</div>

<style>
  .body { flex: 1; padding: 12px; }
  .card { display: flex; gap: 12px; background: var(--panel); border-radius: 14px; padding: 10px; box-shadow: inset 0 0 0 1px var(--line); }
  .portrait { width: 74px; height: 96px; object-fit: contain; }
  .cname { display: flex; align-items: center; gap: 6px; font-size: 18px; color: var(--gold); }
  .cname img { width: 24px; height: 24px; }
  .style { font-size: 12px; color: var(--ink-3); }
  ul { margin: 6px 0 0; padding-left: 16px; font-size: 12.5px; color: var(--ink-2); }
  .row.up { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin: 12px 0; background: var(--panel); border-radius: 14px; padding: 10px 12px; box-shadow: inset 0 0 0 1px var(--line); }
  .label { font-size: 12px; color: var(--ink-3); }
  .val { font-size: 22px; font-weight: 700; color: var(--ink); }
  .val small { font-size: 11px; color: var(--ink-3); font-family: var(--font-body); }
  .right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .grid div { background: var(--panel); border-radius: 10px; padding: 7px 10px; display: flex; flex-direction: column; }
  .grid span { font-size: 11px; color: var(--ink-3); }
  .grid b { font-size: 14px; }
  .sub { margin: 14px 0 6px; font-size: 13px; color: var(--ink-3); }
  .mast { display: flex; flex-direction: column; gap: 6px; }
  .m { display: flex; gap: 8px; align-items: center; }
  .m img { width: 28px; height: 28px; }
  .mi { flex: 1; font-size: 12.5px; }
  .note { font-size: 11.5px; color: var(--ink-3); }
</style>

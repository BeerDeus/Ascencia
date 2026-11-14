<script lang="ts">
  import { G } from '../lib/game.svelte';
  import { actFor } from '../game/data/world';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  const s = $derived(G.s);
  const act = $derived(actFor(s.run.floor));
  const N = (x: number) => fmt(x, s.settings.notation);
</script>

<header>
  <div class="where">
    <span class="act book">{act.title} · {act.subtitle}</span>
    <span class="floor outline">Étage {s.run.floor}{#if s.run.farming}<em> ↺</em>{/if}</span>
  </div>
  <div class="res">
    <span class="gold outline"><img src={gfx('obj/piece_or')} alt="Or" />{N(s.run.gold)}</span>
    {#if s.ascensions > 0 || s.eclats > 0}<span class="ecl outline"><img src={gfx('res/eclats_ascension')} alt="Éclats" />{N(s.eclats)}</span>{/if}
    {#if s.metal > 0}<span class="met outline"><img src={gfx('res/metal')} alt="Métal" />{N(s.metal)}</span>{/if}
  </div>
</header>

<style>
  header { flex: none; height: 50px; display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 4px 10px;
    background: var(--stone-1); border-bottom: 2px solid var(--ink-0); box-shadow: inset 0 -2px 0 var(--lo), inset 0 2px 0 var(--hi); }
  .where { display: flex; flex-direction: column; line-height: 1; min-width: 0; }
  .act { font-size: 13px; font-style: italic; color: var(--parch-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .floor { font-size: 19px; font-weight: 700; color: var(--text); margin-top: 2px; }
  .floor em { font-style: normal; color: var(--sky); font-size: 15px; }
  .res { display: flex; gap: 9px; align-items: center; }
  .res span { display: inline-flex; align-items: center; gap: 3px; font-size: 16px; font-weight: 700; }
  .res img { width: 22px; height: 22px; }
  .gold { color: var(--gold); }
  .ecl { color: #f08b80; }
  .met { color: #b9c2c9; }
</style>

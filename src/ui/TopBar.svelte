<script lang="ts">
  import { G } from '../lib/game.svelte';
  import { actFor } from '../game/data/world';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  const s = $derived(G.s);
  const act = $derived(actFor(s.run.floor));
</script>

<header>
  <div class="where">
    <span class="act title">{act.title} · {act.subtitle}</span>
    <span class="floor num">Étage {s.run.floor}</span>
  </div>
  <div class="res">
    <span class="gold num"><img src={gfx('obj/piece_or')} alt="" />{fmt(s.run.gold, s.settings.notation)}</span>
    {#if s.ascensions > 0 || s.eclats > 0}
      <span class="ecl num"><img src={gfx('res/eclats_ascension')} alt="" />{fmt(s.eclats, s.settings.notation)}</span>
    {/if}
  </div>
</header>

<style>
  header { display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; background: linear-gradient(180deg, #1c1436, #120d22); border-bottom: 1px solid var(--line); height: 48px; flex: none; }
  .where { display: flex; flex-direction: column; line-height: 1.1; }
  .act { font-size: 11px; color: var(--ink-3); }
  .floor { font-size: 18px; font-weight: 700; color: var(--ink); }
  .res { display: flex; gap: 10px; }
  .res span { display: inline-flex; align-items: center; gap: 4px; font-size: 17px; font-weight: 700; }
  .res img { width: 22px; height: 22px; image-rendering: pixelated; }
  .gold { color: var(--gold); }
  .ecl { color: #ff8a8a; }
</style>

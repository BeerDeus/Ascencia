<script lang="ts">
  import { G, ui } from '../lib/game.svelte';
  import { actFor } from '../game/data/world';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { GEM_ICON } from '../game/data/shop';
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
    <button class="gem outline" data-tuto="gems" onclick={() => (ui.shop = true)} aria-label="Marché"><img src={gfx(GEM_ICON)} alt="" />{s.gems}</button>
    {#if s.metal > 0}<span class="met outline"><img src={gfx('res/metal')} alt="Métal" />{N(s.metal)}</span>{/if}
    <button class="opt" class:on={ui.tab === 'options'} onclick={() => (ui.tab = ui.tab === 'options' ? 'chronique' : 'options')} aria-label="Options"><img src={gfx('obj/cle')} alt="" /></button>
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
  .gem { display: inline-flex; align-items: center; gap: 3px; font-size: 16px; font-weight: 700; color: #8fc8ff; padding: 1px 4px; background: var(--stone-2); border: 2px solid var(--ink-0); }
  .res .gem img { width: 20px; height: 20px; }
  .opt { width: 32px; height: 32px; display: grid; place-items: center; background: var(--stone-3); border: 2px solid var(--ink-0); box-shadow: inset 2px 2px 0 var(--hi), inset -2px -2px 0 var(--lo); }
  .opt.on { background: var(--parch-2); }
  .floor { white-space: nowrap; }
  @media (max-width: 390px) {
    header { padding: 4px 6px; gap: 4px; }
    .res { gap: 5px; }
    .res span, .gem { font-size: 13px !important; }
    .res img { width: 17px !important; height: 17px !important; }
    .floor { font-size: 16px; }
    .opt { width: 28px; height: 28px; }
  }
  .res .opt img { width: 20px; height: 20px; }
</style>

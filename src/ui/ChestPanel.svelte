<script lang="ts">
  import { G, ui } from '../lib/game.svelte';
  import { longpress } from '../lib/guard';
  import { resInfo } from '../game/resinfo';
  import { RESOURCES } from '../game/data/resources';
  import { PLANT_BY_ID } from '../game/data/garden';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  const s = $derived(G.s);
  const groups = $derived.by(() => {
    const ids = Object.keys(s.res).filter(id => s.res[id] > 0);
    const kind = (id: string) => (PLANT_BY_ID[id] ? 'Plantes' : RESOURCES[id]?.kind === 'rare' ? 'Rares' : RESOURCES[id]?.kind === 'recolte' ? 'Expéditions' : 'Monstres');
    const out: Record<string, string[]> = {};
    for (const id of ids) (out[kind(id)] ??= []).push(id);
    return out;
  });
</script>

<div class="scroll body">
  {#each Object.entries(groups) as [g, ids]}
    <div class="label">{g}</div>
    <div class="grid">
      {#each ids as id}<button class="c slot" title={resInfo(id).name} onclick={() => (ui.info = { kind: 'res', id })} use:longpress={() => (ui.info = { kind: 'res', id })}><img src={gfx(resInfo(id).sprite)} alt="" /><b class="outline">{fmt(s.res[id])}</b><small>{resInfo(id).name}</small></button>{/each}
    </div>
  {/each}
  {#if !Object.keys(groups).length}<p class="tip book">Le Coffre est vide. Les monstres, le Jardin et les expéditions le rempliront.</p>{/if}
</div>

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 6px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(62px, 1fr)); gap: 4px; }
  .c { position: relative; display: flex; flex-direction: column; align-items: center; padding: 4px 2px; background: var(--stone-2); }
  .c img { width: 32px; height: 32px; object-fit: contain; }
  .c b { position: absolute; right: 4px; top: 2px; font-size: 12px; }
  .c small { font-size: 9.5px; color: var(--text-3); text-align: center; line-height: 1.1; }
  .tip { font-size: 13px; color: var(--text-3); font-style: italic; }
</style>

<script lang="ts">
  import { G } from '../lib/game.svelte';
  import { resInfo } from '../game/resinfo';
  import { gfx } from '../lib/gfx';
  let { cost }: { cost: Record<string, number> } = $props();
</script>
<span class="cost">
  {#each Object.entries(cost) as [id, n]}
    {@const have = G.s.res[id] ?? 0}
    <span class="c" class:miss={have < n} title={resInfo(id).name}><img src={gfx(resInfo(id).sprite)} alt="" />{have}/{n}</span>
  {/each}
</span>
<style>
  .cost { display: inline-flex; flex-wrap: wrap; gap: 3px 8px; }
  .c { display: inline-flex; align-items: center; gap: 2px; font-size: 12px; color: var(--moss); }
  .c.miss { color: #d98a80; }
  .c img { width: 18px; height: 18px; object-fit: contain; }
</style>

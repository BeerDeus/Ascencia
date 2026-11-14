<script lang="ts">
  import { ui } from '../lib/game.svelte';
  const opts = [1, 10, 25, 0] as const;
</script>
<div class="mult">
  {#each opts as o}<button class:on={ui.buyMult === o} onclick={() => (ui.buyMult = o)}>{o ? '×' + o : 'Max'}</button>{/each}
</div>
<style>
  .mult { display: flex; background: var(--panel); border-radius: 9px; padding: 2px; box-shadow: inset 0 0 0 1px var(--line); }
  button { padding: 4px 9px; border-radius: 7px; font-size: 12px; font-weight: 700; color: var(--ink-3); }
  button.on { background: var(--violet); color: #fff; }
</style>

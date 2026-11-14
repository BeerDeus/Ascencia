<script lang="ts">
  import { ui } from '../lib/game.svelte';
  const opts = [1, 10, 25, 0] as const;
</script>
<div class="mult">
  {#each opts as o}<button class:on={ui.buyMult === o} onclick={() => (ui.buyMult = o)}>{o ? '×' + o : 'Max'}</button>{/each}
</div>
<style>
  .mult { display: flex; gap: 2px; padding: 2px; background: var(--ink-0); }
  button { padding: 4px 8px; font-size: 12px; font-weight: 700; color: var(--text-3); background: var(--stone-2); }
  button.on { color: var(--parch-ink); background: var(--parch-2); }
</style>

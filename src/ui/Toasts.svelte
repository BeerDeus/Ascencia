<script lang="ts">
  import { ui } from '../lib/game.svelte';
</script>
<div class="toasts">
  {#each ui.toasts as t (t.id)}<div class="t {t.kind}">{t.text}</div>{/each}
</div>
<style>
  /* à droite, sous le compteur de vague (qui reste visible) */
  .toasts { position: fixed; top: calc(94px + var(--safe-top)); right: max(8px, calc((100vw - 560px) / 2 + 8px)); max-width: 68%; z-index: 30; display: flex; flex-direction: column; align-items: flex-end; gap: 4px; pointer-events: none; }
  .t { text-align: right; padding: 5px 12px; font-weight: 700; font-size: 13px; color: var(--text); background: var(--stone-1); border: 2px solid var(--ink-0); box-shadow: inset 0 2px 0 var(--hi);
    animation: tin .2s steps(3), tout .3s 2.25s steps(3) forwards; }
  .t.gold { color: var(--gold); }
  .t.crit { color: var(--ember); }
  .t.up { color: var(--moss); }
  @keyframes tin { from { opacity: 0; transform: translateY(-8px); } }
  @keyframes tout { to { opacity: 0; } }
</style>

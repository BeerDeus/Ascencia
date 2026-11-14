<script lang="ts">
  import { ui } from '../lib/game.svelte';
</script>
<div class="toasts">
  {#each ui.toasts as t (t.id)}<div class="t {t.kind}">{t.text}</div>{/each}
</div>
<style>
  .toasts { position: fixed; top: calc(56px + var(--safe-top)); left: 0; right: 0; z-index: 30; display: flex; flex-direction: column; align-items: center; gap: 6px; pointer-events: none; }
  .t { padding: 6px 14px; border-radius: 99px; background: rgba(20,14,38,.92); box-shadow: inset 0 0 0 1px var(--line); font-weight: 700; font-size: 13px; animation: tin .3s ease-out, tout .4s 2.2s forwards; }
  .t.gold { color: var(--gold); box-shadow: inset 0 0 0 1px var(--gold); }
  .t.crit { color: #ff8a5c; box-shadow: inset 0 0 0 1px #ff8a5c; font-family: var(--font-title); }
  .t.up { color: var(--green); }
  @keyframes tin { from { opacity: 0; transform: translateY(-10px) scale(.9); } }
  @keyframes tout { to { opacity: 0; transform: translateY(-8px); } }
</style>

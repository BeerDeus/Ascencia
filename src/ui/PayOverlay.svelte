<script lang="ts">
  import { payUi } from '../lib/billing.svelte';
</script>
<div class="veil">
  <div class="box frame">
    <div class="label">Paiement simulé · mode test</div>
    <p class="what">{payUi.label}</p>
    {#if payUi.done}<div class="ok">✓ Validé</div>{:else}<div class="spin"></div><p class="book">Validation en cours…</p>{/if}
    <small>Aucun paiement réel. Dans l’application, Google Play s’affichera ici.</small>
  </div>
</div>
<style>
  .veil { position: fixed; inset: 0; z-index: 72; background: rgba(5,3,8,.85); display: grid; place-items: center; padding: 16px; }
  .box { width: 100%; max-width: 320px; padding: 16px; text-align: center; display: flex; flex-direction: column; gap: 8px; align-items: center; }
  .what { margin: 0; font-weight: 700; color: var(--gold); }
  .spin { width: 28px; height: 28px; border: 4px solid var(--stone-3); border-top-color: var(--gold); animation: rot .6s steps(8) infinite; }
  @keyframes rot { to { transform: rotate(360deg); } }
  .ok { font-size: 26px; color: var(--moss); font-weight: 700; }
  p.book { margin: 0; font-style: italic; color: var(--text-2); }
  small { font-size: 11px; color: var(--text-3); }
</style>

<script lang="ts">
  import { adUi, finish } from '../lib/ads.svelte';
</script>
<div class="veil">
  <div class="box frame">
    <div class="label">Publicité de test</div>
    <div class="cd">{adUi.left}</div>
    <p class="book">Ici s’affichera une vraie publicité (AdMob) dans l’application Android.</p>
    <button class="later" onclick={() => finish(false)}>Annuler (pas de récompense)</button>
  </div>
</div>
<style>
  .veil { position: fixed; inset: 0; z-index: 70; background: #050308; display: grid; place-items: center; padding: 16px; }
  .box { width: 100%; max-width: 320px; padding: 16px; text-align: center; }
  .cd { font-size: 64px; font-weight: 700; color: var(--sky); }
  p { color: var(--text-2); font-style: italic; }
  .later { font-size: 12px; color: var(--text-3); text-decoration: underline; }
</style>

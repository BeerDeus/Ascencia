<script lang="ts">
  import { ui } from '../lib/game.svelte';
</script>

{#if ui.banner}
  {#key ui.banner.id}
    <div class="banner {ui.banner.kind}" aria-live="polite">
      {#if ui.banner.kind === 'crescendo'}<div class="edge"></div>{/if}
      <div class="ribbon">
        <div class="t gothic">{ui.banner.title}</div>
        <div class="s">{ui.banner.sub}</div>
      </div>
    </div>
  {/key}
{/if}

<style>
  .banner { position: fixed; inset: 0; z-index: 44; pointer-events: none; display: grid; place-items: start center; padding-top: 22dvh; }
  .ribbon { min-width: 70%; max-width: 92%; padding: 8px 20px 10px; text-align: center; background: linear-gradient(90deg, transparent, rgba(22,19,28,.92) 15%, rgba(22,19,28,.92) 85%, transparent);
    border-top: 2px solid var(--gold); border-bottom: 2px solid var(--gold); animation: slam .45s cubic-bezier(.2, 1.6, .4, 1), out .4s 2s forwards; }
  .t { font-size: 44px; line-height: 1; color: var(--gold-hi); text-shadow: 0 3px 0 #000, 0 0 18px rgba(230,182,74,.6); }
  .s { margin-top: 4px; font-size: 14px; font-weight: 700; color: var(--text); }
  .record .ribbon { border-color: var(--sky); } .record .t { color: #bfe0ff; text-shadow: 0 3px 0 #000, 0 0 18px rgba(111,166,214,.7); }
  .metier .ribbon { border-color: var(--moss); } .metier .t { font-size: 34px; color: #cfe8b5; }
  .crescendo { place-items: center; padding: 0; }
  .crescendo .ribbon { background: none; border: 0; animation: slam .35s cubic-bezier(.2, 1.6, .4, 1), out .3s 1.1s forwards; }
  .crescendo .t { font-size: 56px; color: #ffb347; text-shadow: 0 4px 0 #000, 0 0 30px rgba(255,120,40,.9); }
  .edge { position: absolute; inset: 0; box-shadow: inset 0 0 60px 20px rgba(255,120,40,.55); animation: out .5s .9s forwards; }
  @keyframes slam { from { transform: scale(1.8); opacity: 0; } }
  @keyframes out { to { opacity: 0; transform: translateY(-10px); } }
</style>

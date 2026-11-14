<script lang="ts">
  import { ui, G } from '../lib/game.svelte';
  import { fmt, fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxGold } from '../lib/audio';
  const r = $derived(ui.offline!);
  let shown = $state(0);
  $effect(() => {
    const target = r.gold, t0 = performance.now();
    let raf = 0;
    const step = (t: number) => { const k = Math.min(1, (t - t0) / 1200); shown = target * (1 - (1 - k) ** 3); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  });
  function close() { sfxGold(); ui.offline = null; }
</script>

<div class="veil">
  <div class="card">
    <img class="px logo" src={gfx('portraits/lysandra')} alt="" />
    <h2 class="title">Pendant votre absence…</h2>
    <p class="sub">{fmtTime(r.seconds)} se sont écoulées. Vos compagnons ont continué le combat.</p>
    <div class="gold num"><img class="px" src={gfx('obj/bourse_or')} alt="" />+{fmt(shown, G.s.settings.notation)}</div>
    {#if r.floors}<div class="floors num">+{r.floors} étages gravis en somnambule</div>{/if}
    <button class="btn go" onclick={close}>Récupérer</button>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 45; background: rgba(5,3,12,.85); display: grid; place-items: center; padding: 20px; animation: fade .25s; }
  @keyframes fade { from { opacity: 0; } }
  .card { width: 100%; max-width: 380px; background: var(--bg-2); border-radius: 20px; padding: 20px; text-align: center; box-shadow: inset 0 0 0 1px var(--line), 0 0 60px -20px var(--gold); }
  .logo { height: 90px; }
  h2 { margin: 6px 0 2px; color: var(--gold); font-size: 20px; }
  .sub { font-size: 13px; color: var(--ink-2); margin: 0 0 12px; }
  .gold { font-size: 34px; color: var(--gold); display: flex; align-items: center; justify-content: center; gap: 8px; text-shadow: 0 0 20px rgba(255,207,90,.5); }
  .gold img { width: 40px; height: 40px; }
  .floors { color: var(--cyan); margin-top: 4px; }
  .go { margin-top: 16px; width: 100%; padding: 12px; font-size: 16px; }
</style>

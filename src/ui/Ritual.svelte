<script lang="ts">
  import { ui } from '../lib/game.svelte';
  import { gfx } from '../lib/gfx';
  const stars = Array.from({ length: 70 }, () => ({ x: Math.random() * 100, y: Math.random() * 100, d: Math.random() * 1.6, s: Math.random() < 0.2 ? 4 : 2 }));
</script>

<div class="ritual">
  {#each stars as st}<i style="left:{st.x}%; top:{st.y}%; animation-delay:{st.d}s; width:{st.s}px; height:{st.s}px"></i>{/each}
  <div class="center">
    <p class="gothic t">Ascension</p>
    <div class="gain outline"><img src={gfx('res/eclats_ascension')} alt="" />+{ui.ritual}</div>
    <p class="book sub">Votre légende est gravée dans le firmament.</p>
  </div>
</div>

<style>
  .ritual { position: fixed; inset: 0; z-index: 60; background: #0a0812; overflow: hidden; animation: fade 2.8s steps(14) forwards; }
  @keyframes fade { 0% { opacity: 0; } 12% { opacity: 1; } 85% { opacity: 1; } 100% { opacity: 0; } }
  i { position: absolute; background: var(--parch); opacity: 0; animation: star 1.4s steps(6) forwards; }
  @keyframes star { to { opacity: 1; } }
  .center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .t { font-size: 64px; color: var(--parch); margin: 0; line-height: 1; animation: in 1.2s steps(8); }
  @keyframes in { from { opacity: 0; transform: translateY(12px); } }
  .gain { display: flex; align-items: center; gap: 8px; margin: 10px 0; font-size: 38px; font-weight: 700; color: #f08b80; animation: in .6s 1s both steps(4); }
  .gain img { width: 40px; }
  .sub { color: var(--text-2); font-size: 16px; font-style: italic; animation: in 1s 1.4s both steps(6); }
</style>

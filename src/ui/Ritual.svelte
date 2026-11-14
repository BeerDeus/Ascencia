<script lang="ts">
  import { ui } from '../lib/game.svelte';
  import { gfx } from '../lib/gfx';
  const stars = Array.from({ length: 60 }, () => ({ x: Math.random() * 100, y: Math.random() * 100, d: Math.random() * 1.5, s: 1 + Math.random() * 3 }));
</script>

<div class="ritual">
  {#each stars as st}<i style="left:{st.x}%; top:{st.y}%; animation-delay:{st.d}s; width:{st.s}px; height:{st.s}px"></i>{/each}
  <div class="center">
    <p class="title">Ascension</p>
    <div class="gain num"><img class="px" src={gfx('res/eclats_ascension')} alt="" />+{ui.ritual}</div>
    <p class="sub">Votre légende est gravée dans le firmament.</p>
  </div>
</div>

<style>
  .ritual { position: fixed; inset: 0; z-index: 60; background: radial-gradient(circle at 50% 45%, #2a1a5c, #05030c 70%); overflow: hidden; animation: dissolve 2.8s ease-in-out forwards; }
  @keyframes dissolve { 0% { opacity: 0; } 12% { opacity: 1; } 85% { opacity: 1; } 100% { opacity: 0; } }
  i { position: absolute; border-radius: 50%; background: #fff; box-shadow: 0 0 6px #b892ff, 0 0 12px #6fd8ff; opacity: 0; animation: star 1.6s ease-out forwards; }
  @keyframes star { from { opacity: 0; transform: translateY(40px) scale(.2); } to { opacity: 1; transform: none; } }
  .center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .title { font-size: 34px; color: #fff; margin: 0; text-shadow: 0 0 30px #b892ff; animation: rise 1.4s ease-out; letter-spacing: .2em; }
  @keyframes rise { from { opacity: 0; letter-spacing: .8em; } }
  .gain { font-size: 40px; color: #ff9a9a; display: flex; align-items: center; gap: 8px; margin: 12px 0; animation: pop .6s 1s both cubic-bezier(.3,1.6,.5,1); }
  .gain img { width: 44px; height: 44px; }
  @keyframes pop { from { opacity: 0; transform: scale(.3); } }
  .sub { color: var(--ink-2); font-size: 14px; animation: rise 1s 1.4s both; }
</style>

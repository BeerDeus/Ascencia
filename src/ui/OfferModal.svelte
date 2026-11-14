<script lang="ts">
  import { guard } from '../lib/guard';
  import { G, ui, toast } from '../lib/game.svelte';
  import { billingReady, purchase } from '../lib/billing';
  import { grantPack } from '../game/shop';
  import { gfx } from '../lib/gfx';
  const p = $derived(ui.offer!);
  function close() { G.s.shop.offersSeen.push(p.id); ui.offer = null; }
  async function buy() {
    if (!billingReady) { toast('Achats disponibles dans l’appli Play Store', 'info'); close(); return; }
    if (await purchase(p.id)) grantPack(G.s, p.id);
    close();
  }
</script>

<div class="veil" use:guard>
  <div class="box frame">
    <div class="label">Offre unique</div>
    <img src={gfx(p.icon)} alt="" />
    <div class="gothic h">{p.name}</div>
    <p>{p.desc}</p>
    <button class="btn go" onclick={buy}>{p.price}</button>
    <button class="later" onclick={close}>Plus tard</button>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 47; background: rgba(8,6,12,.82); display: grid; place-items: center; padding: 16px; }
  .box { width: 100%; max-width: 340px; padding: 14px; text-align: center; }
  .box img { width: 96px; height: 96px; object-fit: contain; }
  .h { font-size: 34px; line-height: 1; color: var(--gold); }
  p { color: var(--text-2); font-size: 14px; }
  .go { width: 100%; padding: 10px; font-size: 16px; }
  .later { margin-top: 8px; font-size: 13px; color: var(--text-3); text-decoration: underline; }
</style>

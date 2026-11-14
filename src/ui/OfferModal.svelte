<script lang="ts">
  import { guard } from '../lib/guard';
  import { G, ui, toast, act, persist } from '../lib/game.svelte';
  import { billingReady, purchase } from '../lib/billing.svelte';
  import * as E from '../game/engine';
  import { AUBE_BY_ID } from '../game/data/packs';
  import { sfxGold } from '../lib/audio';
  import { gfx } from '../lib/gfx';
  const p = $derived(ui.offer!);
  function close() { G.s.shop.offersSeen.push(p.id); ui.offer = null; }
  async function buy() {
    if (!billingReady) { toast('Achats disponibles dans l’appli Play Store', 'info'); close(); return; }
    if (await purchase(p.id, `${p.name} (${p.price})`)) { act(g => E.grantPurchase(g, p.id)); persist(); sfxGold(); toast(`${p.name} reçu !`, 'crit'); }
    close();
  }
</script>

<div class="veil" use:guard>
  <div class="box frame">
    <div class="label">{G.s.shop.offersSeen.includes(p.id) ? 'Un coup de pouce ?' : 'Nouvelle offre'}</div>
    <img src={gfx(p.icon)} alt="" />
    <div class="gothic h">{p.name}</div>
    <p>{p.desc}</p>
    {#if p.items}
      <div class="items">{#each p.items as id}{@const a = AUBE_BY_ID[id]}<div class="it slot"><img src={gfx(a.base)} alt="" /><small>{a.name}</small>{#if a.minFloor}<em>record {a.minFloor}</em>{/if}</div>{/each}</div>
      <p class="bound">Liés au compte : ils reviennent au début de chaque vie pour accélérer le départ. Plus haut, le butin et la Forge prennent le relais.</p>
    {/if}
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
  .items { display: flex; gap: 6px; justify-content: center; margin-bottom: 4px; }
  .it { display: flex; flex-direction: column; align-items: center; padding: 4px 6px; background: var(--stone-2); box-shadow: inset 0 0 0 2px #e8973a; }
  .it img { width: 48px; height: 48px; object-fit: contain; }
  .it small { font-size: 10px; color: var(--text); }
  .it em { font-size: 9.5px; color: var(--text-3); font-style: normal; }
  .bound { font-size: 11.5px; color: var(--ember); margin: 4px 0 8px; }
  .later { margin-top: 8px; font-size: 13px; color: var(--text-3); text-decoration: underline; }
</style>

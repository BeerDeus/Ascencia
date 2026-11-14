<script lang="ts">
  import { G, ui, act, toast } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { CALENDAR, GEM_ICON } from '../game/data/shop';
  import { gfx } from '../lib/gfx';
  import { sfxGold } from '../lib/audio';
  const idx = $derived(G.s.shop.calIndex % CALENDAR.length);
  const ICON = { gemmes: GEM_ICON, metal: 'res/metal', or: 'obj/bourse_or', coffre: 'obj/caisse' };
  const LBL = { gemmes: 'gemmes', metal: 'métal', or: 'or', coffre: 'coffre' };
  function claim() { const r = act(E.claimCalendar); if (r) { sfxGold(); toast(r, 'gold'); } ui.calendar = false; }
</script>

<div class="veil">
  <div class="box frame">
    <div class="gothic h">Présents du jour</div>
    <p class="book">Gaston a laissé un panier à ta porte. Reviens chaque jour : le septième est le meilleur.</p>
    <div class="days">
      {#each CALENDAR as d, i}
        <div class="d slot" class:done={i < idx} class:today={i === idx}>
          <span class="n">J{i + 1}</span>
          <img src={gfx(ICON[d.kind])} alt="" />
          <span class="a">{d.kind === 'coffre' ? 'Coffre' : d.kind === 'or' ? 'Or' : d.amount}</span>
          <span class="k">{d.kind === 'coffre' || d.kind === 'or' ? '' : LBL[d.kind]}</span>
        </div>
      {/each}
    </div>
    <button class="btn go" onclick={claim}>Récupérer</button>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 48; background: rgba(8,6,12,.82); display: grid; place-items: center; padding: 14px; }
  .box { width: 100%; max-width: 420px; padding: 14px; text-align: center; }
  .h { font-size: 38px; line-height: 1; color: var(--parch); }
  p { font-size: 15px; color: var(--text-2); font-style: italic; }
  .days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
  .d { display: flex; flex-direction: column; align-items: center; padding: 4px 0; background: var(--stone-2); }
  .d img { width: 28px; height: 28px; }
  .n { font-size: 10px; color: var(--text-3); }
  .a { font-size: 12px; font-weight: 700; }
  .k { font-size: 9px; color: var(--text-3); min-height: 10px; }
  .d.done { opacity: .35; }
  .d.today { background: #3b3020; box-shadow: inset 0 0 0 2px var(--gold); animation: pulse .6s steps(2) infinite; }
  @keyframes pulse { 50% { box-shadow: inset 0 0 0 2px var(--gold-hi); } }
  .go { width: 100%; margin-top: 12px; padding: 10px; font-size: 15px; }
</style>

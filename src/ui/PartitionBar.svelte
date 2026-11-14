<script lang="ts">
  import { G, act } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { PARTITIONS } from '../game/data/heroes';
  import { gfx } from '../lib/gfx';
  const s = $derived(G.s);
  const st = $derived(E.stats(G.s));
</script>

<div class="wrap">
  <div class="bar mana"><i style="width:{(s.run.mana / st.manaMax) * 100}%"></i><span class="outline">{Math.floor(s.run.mana)}/{st.manaMax}</span></div>
  <div class="row">
    {#each PARTITIONS as p, i}
      {@const unlocked = E.partitionUnlocked(s, i)}
      {@const cdLeft = Math.max(0, s.run.cooldowns[i] - s.time)}
      {@const isActive = s.time < s.run.activeUntil[i]}
      {@const noMana = s.run.mana < p.mana}
      <button class="p slot" class:active={isActive} class:dim={unlocked && !cdLeft && noMana}
        disabled={!unlocked} onclick={() => act(g => E.castPartition(g, i))} aria-label={p.name}>
        {#if unlocked}
          <img src={gfx(p.icon)} alt="" />
          {#if cdLeft > 0}<span class="cd" style="height:{(cdLeft / p.cd) * 100}%"></span><span class="cdt outline">{Math.ceil(cdLeft)}</span>{/if}
          <span class="cost outline">{p.mana}</span>
        {:else}
          <span class="lock">Ét. {p.unlock}</span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .wrap { flex: none; padding: 5px 8px 6px; background: var(--stone-2); border-bottom: 2px solid var(--ink-0); }
  .mana { height: 12px; margin-bottom: 5px; }
  .mana > i { background: var(--sky-lo); box-shadow: inset 0 2px 0 #4f86bb; }
  .mana span { position: absolute; inset: 0; z-index: 1; text-align: center; font-size: 9px; line-height: 8px; color: #d8ecff; }
  .row { display: flex; justify-content: space-between; gap: 6px; }
  .p { position: relative; flex: 1; aspect-ratio: 1; max-width: 60px; display: grid; place-items: center; overflow: hidden; }
  .p img { width: 82%; height: 82%; object-fit: contain; }
  .p.active { background: #5a4a26; outline: 2px solid var(--gold); outline-offset: -4px; animation: on .4s steps(2) infinite; }
  @keyframes on { 50% { outline-color: var(--gold-hi); } }
  .p.dim img { filter: grayscale(1) brightness(.55); }
  .p:disabled { background: var(--stone-1); }
  .lock { font-size: 11px; color: var(--text-3); }
  .cd { position: absolute; left: 0; right: 0; top: 0; background: rgba(12,10,16,.72); }
  .cdt { position: absolute; font-size: 17px; font-weight: 700; }
  .cost { position: absolute; right: 3px; bottom: 1px; font-size: 11px; color: #a9d4ff; }
</style>

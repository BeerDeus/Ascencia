<script lang="ts">
  import { G, act } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { PARTITIONS } from '../game/data/heroes';
  import { gfx } from '../lib/gfx';
  const s = $derived(G.s);
  const st = $derived(E.stats(G.s));
</script>

<div class="wrap">
  <div class="mana" title="Mana"><i style="width:{(s.run.mana / st.manaMax) * 100}%"></i></div>
  <div class="row">
    {#each PARTITIONS as p, i}
      {@const unlocked = E.partitionUnlocked(s, i)}
      {@const cdLeft = Math.max(0, s.run.cooldowns[i] - s.time)}
      {@const isActive = s.time < s.run.activeUntil[i]}
      {@const ready = unlocked && !cdLeft && s.run.mana >= p.mana}
      <button class="p" class:active={isActive} class:ready class:dim={unlocked && !ready && !cdLeft}
        disabled={!unlocked} onclick={() => act(g => E.castPartition(g, i))} aria-label={p.name}>
        {#if unlocked}
          <img src={gfx(p.icon)} alt="" />
          {#if cdLeft > 0}<span class="cd" style="width:{(cdLeft / p.cd) * 100}%"></span><span class="t outline">{Math.ceil(cdLeft)}s</span>
          {:else}<span class="t cost outline">{p.mana}</span>{/if}
        {:else}
          <span class="lock">Ét.{p.unlock}</span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .wrap { flex: none; background: var(--stone-2); border-bottom: 2px solid var(--ink-0); }
  .mana { height: 5px; background: #0f0d13; }
  .mana i { display: block; height: 100%; background: var(--sky); transition: width .12s linear; }
  .row { display: flex; gap: 3px; padding: 3px 4px 4px; }
  .p { position: relative; flex: 1; height: 40px; display: flex; align-items: center; justify-content: center; gap: 2px; overflow: hidden;
    background: var(--stone-1); border: 2px solid var(--ink-0); box-shadow: inset 0 2px 0 var(--hi); }
  .p img { width: 30px; height: 30px; object-fit: contain; position: relative; z-index: 1; }
  .p.ready { background: #2f2a3d; box-shadow: inset 0 0 0 1px var(--sky), inset 0 2px 0 var(--hi); }
  .p.active { background: #5a4a26; box-shadow: inset 0 0 0 2px var(--gold); animation: on .4s steps(2) infinite; }
  @keyframes on { 50% { box-shadow: inset 0 0 0 2px var(--gold-hi); } }
  .p.dim img { filter: grayscale(1) brightness(.55); }
  .p:disabled { opacity: .55; }
  .lock { font-size: 11px; color: var(--text-3); }
  .cd { position: absolute; right: 0; top: 0; bottom: 0; background: rgba(12,10,16,.75); z-index: 2; }
  .t { position: relative; z-index: 3; font-size: 11px; font-weight: 700; }
  .cost { color: #a9d4ff; }
</style>

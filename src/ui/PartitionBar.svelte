<script lang="ts">
  import { G, act } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { PARTITIONS } from '../game/data/heroes';
  import { gfx } from '../lib/gfx';
  const s = $derived(G.s);
  const st = $derived(E.stats(G.s));
</script>

<div class="bar-wrap">
  <div class="mana"><i style="width:{(s.run.mana / st.manaMax) * 100}%"></i><span class="num">{Math.floor(s.run.mana)} / {st.manaMax}</span></div>
  <div class="row">
    {#each PARTITIONS as p, i}
      {@const unlocked = E.partitionUnlocked(s, i)}
      {@const cdLeft = Math.max(0, s.run.cooldowns[i] - s.time)}
      {@const cdFrac = cdLeft / (p.cd || 1)}
      {@const isActive = s.time < s.run.activeUntil[i]}
      {@const noMana = s.run.mana < p.mana}
      <button class="p" class:locked={!unlocked} class:active={isActive} class:nomana={unlocked && !cdLeft && noMana}
        disabled={!unlocked} onclick={() => act(g => E.castPartition(g, i))} aria-label={p.name}>
        {#if unlocked}
          <img class="px" src={gfx(p.icon)} alt="" />
          {#if cdLeft > 0}<span class="cd" style="--f:{cdFrac * 360}deg"></span><span class="cdt num">{Math.ceil(cdLeft)}</span>{/if}
          <span class="cost num">{p.mana}</span>
        {:else}
          <span class="lock num">É{p.unlock}</span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .bar-wrap { flex: none; background: #0f0a1e; padding: 4px 10px 6px; border-top: 1px solid var(--line); }
  .mana { position: relative; height: 10px; border-radius: 99px; background: rgba(255,255,255,.07); overflow: hidden; margin-bottom: 5px; }
  .mana i { position: absolute; inset: 0 auto 0 0; background: linear-gradient(90deg, #3d6bff, #6fd8ff); transition: width .1s linear; }
  .mana span { position: relative; display: block; text-align: center; font-size: 9px; line-height: 10px; color: #dff4ff; text-shadow: 0 1px 0 #000; }
  .row { display: flex; justify-content: space-between; gap: 6px; }
  .p { position: relative; flex: 1; aspect-ratio: 1; max-width: 62px; border-radius: 12px; background: var(--panel); box-shadow: inset 0 0 0 1px var(--line); overflow: hidden; display: grid; place-items: center; }
  .p img { width: 78%; height: 78%; object-fit: contain; }
  .p.active { box-shadow: inset 0 0 0 2px var(--gold), 0 0 14px rgba(255,207,90,.6); animation: glow .8s infinite alternate; }
  @keyframes glow { to { box-shadow: inset 0 0 0 2px #fff3c4, 0 0 22px rgba(255,207,90,.9); } }
  .p.nomana img { filter: grayscale(.8) brightness(.6); }
  .p.locked { opacity: .5; }
  .lock { font-size: 12px; color: var(--ink-3); }
  .cd { position: absolute; inset: 0; background: conic-gradient(rgba(5,3,12,.78) var(--f), transparent 0); }
  .cdt { position: absolute; font-size: 16px; font-weight: 700; text-shadow: 0 2px 0 #000; }
  .cost { position: absolute; right: 3px; bottom: 1px; font-size: 10px; color: #9fd9ff; text-shadow: 0 1px 0 #000; }
</style>

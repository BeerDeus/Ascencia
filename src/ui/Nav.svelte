<script lang="ts">
  import { G, ui } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { gfx } from '../lib/gfx';
  const tabs = [
    { id: 'chronique', label: 'Chronique', icon: 'icons/grimoire' },
    { id: 'heros', label: 'Héros', icon: 'icons/force' },
    { id: 'compagnons', label: 'Compagnons', icon: 'icons/combat' },
    { id: 'ascension', label: 'Ascension', icon: 'icons/harmonie' },
    { id: 'options', label: 'Options', icon: 'icons/standard' },
  ] as const;
  const canAsc = $derived(E.canAscend(G.s));
  const cheapComp = $derived(G.s.run.companions.some((_, i) => E.compUnlocked(G.s, i) && E.compCostN(G.s, i, 1) <= G.s.run.gold));
  const cheapHero = $derived(E.heroCostN(G.s, 1) <= G.s.run.gold);
</script>

<nav>
  {#each tabs as t}
    <button class:on={ui.tab === t.id} onclick={() => (ui.tab = t.id)}>
      <img class="px" src={gfx(t.icon)} alt="" />
      <span>{t.label}</span>
      {#if (t.id === 'compagnons' && cheapComp) || (t.id === 'heros' && cheapHero) || (t.id === 'ascension' && canAsc)}<i class="dot"></i>{/if}
    </button>
  {/each}
</nav>

<style>
  nav { flex: none; display: flex; background: #0c0818; border-top: 1px solid var(--line); padding-bottom: var(--safe-bottom); }
  button { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 5px 0 6px; color: var(--ink-3); font-size: 10px; }
  button img { width: 28px; height: 28px; filter: grayscale(.6) brightness(.8); transition: transform .15s; }
  button.on { color: var(--gold); }
  button.on img { filter: none; transform: translateY(-2px) scale(1.08); }
  .dot { position: absolute; top: 4px; right: calc(50% - 20px); width: 9px; height: 9px; border-radius: 50%; background: var(--red); box-shadow: 0 0 6px var(--red); }
</style>

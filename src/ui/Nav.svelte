<script lang="ts">
  import { G, ui } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { fiefUnlocked, chestReady } from '../game/fief';
  import { claimable } from '../game/achievements';
  import { mature } from '../game/garden';
  import { isDone } from '../game/expeditions';
  import { gfx } from '../lib/gfx';
  const s = $derived(G.s);
  const tabs = $derived([
    { id: 'chronique', label: 'Chronique', icon: 'icons/grimoire', dot: false },
    { id: 'heros', label: 'Héros', icon: 'classes/' + (s.classId ?? 'guerrier'), dot: E.heroCostN(s, 1) <= s.run.gold || claimable(s).length > 0 },
    { id: 'compagnons', label: 'Alliés', icon: 'icons/standard',
      dot: s.run.companions.some((_, i) => E.compUnlocked(s, i) && E.compCostN(s, i, 1) <= s.run.gold) },
    { id: 'fief', label: 'Fief', icon: 'icons/village', locked: !fiefUnlocked(s),
      dot: fiefUnlocked(s) && (chestReady(s) || s.daily?.bounties.some(b => !b.claimed && s.daily.c[b.c] >= b.target)
        || s.garden.plots.some(p => mature(p)) || s.expeditions.some(isDone)) },
    { id: 'ascension', label: 'Ascension', icon: 'icons/harmonie', dot: E.canAscend(s) },
  ] as { id: typeof ui.tab; label: string; icon: string; dot: boolean; locked?: boolean }[]);
</script>

<nav>
  {#each tabs as t}
    <button class:on={ui.tab === t.id} class:locked={t.locked} onclick={() => (ui.tab = t.id)}>
      <img src={gfx(t.icon)} alt="" />
      <span>{t.label}</span>
      {#if t.dot}<i class="dot"></i>{/if}
    </button>
  {/each}
</nav>

<style>
  nav { flex: none; display: flex; gap: 2px; padding: 3px 3px calc(3px + var(--safe-bottom)); background: var(--ink-0); }
  button { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 5px 0 4px;
    color: var(--text-3); font-size: 10.5px; background: var(--stone-1); box-shadow: inset 0 2px 0 var(--hi), inset 0 -2px 0 var(--lo); }
  button img { width: 26px; height: 26px; filter: saturate(.3) brightness(.75); }
  button.on { color: var(--parch-ink); background: var(--parch-2); box-shadow: inset 0 2px 0 var(--parch), inset 0 -2px 0 var(--parch-3); }
  button.on img { filter: none; }
  button.locked img { filter: grayscale(1) brightness(.4); }
  .dot { position: absolute; top: 4px; right: calc(50% - 19px); width: 8px; height: 8px; background: var(--blood); box-shadow: 0 0 0 2px var(--ink-0); }
</style>

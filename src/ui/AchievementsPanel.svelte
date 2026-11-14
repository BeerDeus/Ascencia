<script lang="ts">
  import { G, act, toast } from '../lib/game.svelte';
  import { ACHIEVEMENTS } from '../game/data/achievements';
  import { achDone, claimAch } from '../game/achievements';
  import { GEM_ICON } from '../game/data/shop';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxGold } from '../lib/audio';
  const s = $derived(G.s);
  // à encaisser d'abord, puis en cours (le prochain palier de chaque série), puis terminés
  const list = $derived.by(() => {
    const done = ACHIEVEMENTS.filter(a => s.achievements[a.id]);
    const ready = ACHIEVEMENTS.filter(a => !s.achievements[a.id] && achDone(s, a));
    const seen = new Set<string>();
    const next = ACHIEVEMENTS.filter(a => {
      if (s.achievements[a.id] || achDone(s, a)) return false;
      const serie = a.id.replace(/_[\d.e+]+$/, '');
      if (seen.has(serie)) return false;
      seen.add(serie); return true;
    });
    return { done, ready, next };
  });
  function claim(id: string) { const g = act(x => claimAch(x, id)); if (g) { sfxGold(); toast(`+${g} gemmes`, 'gold'); } }
</script>

<div class="scroll body">
  <div class="label">{list.done.length} / {ACHIEVEMENTS.length} hauts faits</div>
  {#each list.ready as a (a.id)}
    <div class="a frame ready">
      <img src={gfx(a.icon)} alt="" />
      <div class="mi"><b>{a.name}</b><span>{a.desc}</span></div>
      <button class="btn" onclick={() => claim(a.id)}><img src={gfx(GEM_ICON)} alt="" />{a.gems}</button>
    </div>
  {/each}
  {#each list.next as a (a.id)}
    {@const v = Math.max(0, a.value(s))}
    <div class="a frame">
      <img src={gfx(a.icon)} alt="" />
      <div class="mi"><b>{a.name}</b><span>{a.desc}</span>
        <div class="bar"><i style="width:{Math.min(100, (v / a.target) * 100)}%"></i></div></div>
      <span class="rw"><img src={gfx(GEM_ICON)} alt="" />{a.gems}<small>{fmt(Math.min(v, a.target))}/{fmt(a.target)}</small></span>
    </div>
  {/each}
  {#if list.done.length}<div class="label">Accomplis</div>
    <div class="done">{#each list.done as a}<span title={a.desc}>✓ {a.name}</span>{/each}</div>{/if}
</div>

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 5px; }
  .a { display: flex; align-items: center; gap: 8px; padding: 6px 8px; }
  .a.ready { background: #2f2a1a; box-shadow: inset 0 0 0 2px var(--gold); }
  .a > img { width: 34px; height: 34px; object-fit: contain; flex: none; }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: 12px; color: var(--text-3); }
  .mi b { font-size: 14px; color: var(--text); }
  .mi .bar { height: 6px; margin-top: 3px; border-width: 1px; }
  .mi .bar > i { background: var(--moss); }
  .rw { display: flex; flex-direction: column; align-items: flex-end; font-weight: 700; color: #8fc8ff; font-size: 13px; }
  .rw img { width: 16px; height: 16px; vertical-align: middle; }
  .rw small { font-weight: 500; color: var(--text-3); font-size: 10px; }
  .btn { gap: 3px; font-size: 13px; }
  .btn img { width: 16px; height: 16px; }
  .done { display: flex; flex-wrap: wrap; gap: 4px; }
  .done span { font-size: 11px; color: var(--moss); background: var(--stone-1); border: 1px solid var(--ink-0); padding: 2px 5px; }
</style>

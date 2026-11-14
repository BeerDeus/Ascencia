<script lang="ts">
  import { guard } from '../lib/guard';
  import { G, ui } from '../lib/game.svelte';
  import { JOBS, JOB_MAX } from '../game/data/resources';
  import { jobLevel, xpForLevel } from '../game/jobs';
  import { JOB_INFO } from '../game/jobinfo';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  const id = $derived(ui.job!);
  const J = $derived(JOBS[id]);
  const info = $derived(JOB_INFO[id]);
  const xp = $derived(G.s.jobs[id] ?? 0);
  const lv = $derived(jobLevel(xp));
  const lo = $derived(xpForLevel(lv)), hi = $derived(xpForLevel(lv + 1));
  const pct = $derived(lv >= JOB_MAX ? 100 : ((xp - lo) / (hi - lo)) * 100);
  const next = $derived(info.milestones.find(m => m.lv > lv));
</script>

<div class="veil" use:guard>
  <div class="box frame" role="dialog" aria-label={J.name}>
    <div class="hd">
      <img class="npc" src={gfx(J.npc)} alt="" />
      <div class="mi">
        <div class="gothic h">{J.name}</div>
        <div class="lv"><b>Niveau {lv}</b><span>{lv >= JOB_MAX ? 'Maître' : `${fmt(xp - lo)} / ${fmt(hi - lo)} XP`}</span></div>
        <div class="bar"><i style="width:{pct}%"></i></div>
      </div>
    </div>
    <div class="scroll">
      <p class="book goal">{info.goal}</p>

      <div class="label">Ce qu’il vous apporte</div>
      <div class="perks">
        {#each info.perks(G.s) as p}<div class="perk"><span>{p.label}</span><b>{p.value}</b></div>{/each}
      </div>

      <div class="label">Comment le monter</div>
      <ul>{#each info.how as h}<li>{h}</li>{/each}</ul>

      {#if info.milestones.length}
        <div class="label">Paliers {#if next}<em>· prochain au niveau {next.lv}</em>{/if}</div>
        <div class="ms">
          {#each info.milestones as m}
            <div class="m" class:done={lv >= m.lv} class:next={m === next}><b>{m.lv}</b><span>{m.text}</span></div>
          {/each}
        </div>
      {/if}

      <div class="label">Statistiques</div>
      <div class="perks">
        {#each info.stats(G.s) as p}<div class="perk"><span>{p.label}</span><b>{fmt(p.value)}</b></div>{/each}
      </div>
    </div>
    <button class="btn go" onclick={() => (ui.job = null)}>Fermer</button>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 47; background: rgba(8,6,12,.82); display: grid; place-items: center; padding: 12px; }
  .box { width: 100%; max-width: 420px; max-height: 88dvh; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
  .hd { display: flex; gap: 10px; align-items: center; }
  .npc { width: 56px; height: 70px; object-fit: contain; object-position: top; }
  .mi { flex: 1; display: flex; flex-direction: column; gap: 2px; }
  .h { font-size: 32px; line-height: .9; color: var(--gold); }
  .lv { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; color: var(--text-3); }
  .lv b { font-size: 15px; color: var(--text); }
  .bar { height: 8px; }
  .bar > i { background: var(--moss); }
  .scroll { overflow-y: auto; min-height: 0; display: flex; flex-direction: column; gap: 6px; }
  .goal { margin: 0; font-size: 15px; color: var(--text-2); }
  .label em { font-style: normal; color: var(--text-3); text-transform: none; letter-spacing: 0; }
  .perks { display: flex; flex-direction: column; gap: 2px; }
  .perk { display: flex; justify-content: space-between; gap: 8px; padding: 4px 6px; font-size: 13px; background: var(--stone-2); }
  .perk b { color: var(--gold); white-space: nowrap; }
  ul { margin: 0; padding-left: 18px; font-size: 13px; color: var(--text-2); display: flex; flex-direction: column; gap: 2px; }
  .ms { display: flex; flex-direction: column; gap: 2px; }
  .m { display: flex; gap: 8px; align-items: baseline; padding: 3px 6px; font-size: 12.5px; color: var(--text-3); }
  .m b { flex: none; width: 30px; text-align: right; color: var(--text-3); }
  .m.done { color: var(--text-2); }
  .m.done b { color: var(--moss); }
  .m.next { background: var(--stone-2); color: var(--text); box-shadow: inset 2px 0 0 var(--gold); }
  .m.next b { color: var(--gold); }
  .go { padding: 9px; }
</style>

<script lang="ts">
  import { G, ui } from '../lib/game.svelte';
  import { JOBS, JOB_STAT, type JobId } from '../game/data/resources';
  import { jobLevel, xpForLevel } from '../game/jobs';
  import { gfx } from '../lib/gfx';
  let { job }: { job: JobId } = $props();
  const xp = $derived(G.s.jobs[job] ?? 0);
  const lv = $derived(jobLevel(xp));
  const pct = $derived(lv >= 100 ? 100 : ((xp - xpForLevel(lv)) / (xpForLevel(lv + 1) - xpForLevel(lv))) * 100);
</script>
<button class="job" onclick={() => (ui.job = job)} aria-label="Métier : {JOBS[job].name}">
  <img src={gfx(JOBS[job].npc)} alt="" />
  <div class="mi">
    <div class="t"><b>{JOBS[job].name}</b><span>niv. {lv}</span></div>
    <div class="bar"><i style="width:{pct}%"></i></div>
    <small><b class="pb">+{lv} % {JOB_STAT[job].label.toLowerCase()}</b> · {JOBS[job].desc}</small>
  </div>
  <span class="more">i</span>
</button>
<style>
  .job { width: 100%; display: flex; align-items: center; gap: 8px; text-align: left; }
  .more { flex: none; width: 20px; height: 20px; display: grid; place-items: center; font-size: 12px; font-weight: 700; color: var(--parch-ink); background: var(--gold); border: 1px solid var(--ink-0); }
  .job img { width: 38px; height: 48px; object-fit: contain; object-position: top; }
  .mi { flex: 1; }
  .t { display: flex; justify-content: space-between; font-size: 14px; }
  .t span { color: var(--gold); font-weight: 700; }
  .bar { height: 7px; margin: 2px 0; }
  .bar > i { background: var(--moss); }
  small { font-size: 11px; color: var(--text-3); }
  .pb { color: var(--moss); font-weight: 700; }
</style>

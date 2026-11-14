<script lang="ts">
  import { G, act, toast, ui } from '../lib/game.svelte';
  import * as Cr from '../game/crafting';
  import { POTIONS } from '../game/data/crafting';
  import { level } from '../game/jobs';
  import { fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp, sfxPartition } from '../lib/audio';
  import Cost from './Cost.svelte';
  import JobBar from './JobBar.svelte';
  const s = $derived(G.s);
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 1000); return () => clearInterval(t); });
  function brew(id: string, n: number) { const k = act(g => Cr.brew(g, id, n)); if (k) { sfxUp(); toast(`+${k} potion${k > 1 ? 's' : ''}`, 'up'); } }
  function drink(id: string) { if (act(g => Cr.drink(g, id))) { sfxPartition(); toast('Glou glou…', 'crit'); } }
</script>

<div class="scroll body">
  <section class="frame"><JobBar job="alchimiste" /></section>
  {#each POTIONS as p}
    {@const ok = Cr.potionUnlocked(s, p.id)}
    {@const own = s.potions[p.id] ?? 0}
    {@const left = Math.max(0, ((s.buffs[p.id] ?? 0) - now) / 1000)}
    <div class="r frame" class:dim={!ok} class:on={left > 0}>
      <button class="ic slot" onclick={() => (ui.info = { kind: 'potion', id: p.id })}><img src={gfx(p.sprite)} alt="" />{#if own}<b class="outline">{own}</b>{/if}</button>
      <div class="mi">
        <b>{p.name}</b>
        <span>{p.desc}{p.minutes ? ` · ${Math.round(Cr.potionMinutes(s, p.id))} min` : ''}{#if left > 0} · <em>actif {fmtTime(left)}</em>{/if}</span>
        {#if ok}<Cost cost={p.cost} />{/if}
      </div>
      {#if ok}
        <div class="bt">
          <button class="btn" onclick={() => brew(p.id, 1)}>Préparer</button>
          {#if own && p.effect !== 'purete'}<button class="btn sky" onclick={() => drink(p.id)}>Boire</button>{/if}
        </div>
      {:else}<span class="lk">Alchimiste {p.level}</span>{/if}
    </div>
  {/each}
  <p class="tip">Les potions s’ajoutent aux autres bonus. Une même potion bue deux fois prolonge sa durée.</p>
</div>

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 5px; }
  section { padding: 8px; }
  .r { display: flex; align-items: center; gap: 8px; padding: 6px 8px; }
  .r.dim { opacity: .45; }
  .r.on { box-shadow: inset 0 0 0 2px var(--sky); }
  .ic { position: relative; width: 42px; height: 42px; display: grid; place-items: center; flex: none; }
  .ic img { width: 32px; height: 32px; object-fit: contain; }
  .ic b { position: absolute; right: 2px; bottom: 0; font-size: 12px; color: var(--gold); }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; font-size: 12px; color: var(--text-3); }
  .mi b { font-size: 14px; color: var(--text); }
  .mi em { font-style: normal; color: var(--sky); }
  .bt { display: flex; flex-direction: column; gap: 4px; }
  .bt .btn { font-size: 12px; padding: 5px 8px; }
  .lk { font-size: 11px; color: var(--text-3); }
  .tip { font-size: 12px; color: var(--text-3); margin: 4px 2px; }
</style>

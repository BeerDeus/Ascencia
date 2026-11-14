<script lang="ts">
  import { G, act, toast, ui } from '../lib/game.svelte';
  import * as Ex from '../game/expeditions';
  import { ZONES, DURATIONS } from '../game/data/expeditions';
  import { resInfo } from '../game/resinfo';
  import { fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp, sfxGold } from '../lib/audio';
  import JobBar from './JobBar.svelte';
  const s = $derived(G.s);
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 1000); return () => clearInterval(t); });
  let hours = $state(4);
  function send(z: string) { if (act(g => Ex.send(g, z, hours))) { sfxUp(); toast('L’expédition est partie', 'up'); } }
  function claim(i: number) { const l = act(g => Ex.claim(g, i)); if (l) { sfxGold(); toast(`Expédition de retour : ${Object.values(l.res).reduce((a, b) => a + b, 0)} ressources${l.metal ? ` · +${l.metal} métal` : ''}`, 'gold'); } }
  const free = $derived(Ex.slots(s) - s.expeditions.length);
</script>

<div class="scroll body">
  <section class="frame"><JobBar job="expedition" /></section>

  <div class="label">En cours · {s.expeditions.length}/{Ex.slots(s)} places</div>
  {#each s.expeditions as e, i}
    {@const z = ZONES.find(x => x.id === e.zone)!}
    {@const left = Math.max(0, (Ex.doneAt(e) - now) / 1000)}
    <div class="r frame" class:done={left <= 0}>
      <img src={gfx(z.icon)} alt="" />
      <div class="mi"><b>{z.name}</b>
        <div class="bar"><i style="width:{Math.min(100, ((now - e.start) / (e.hours * 3600_000)) * 100)}%"></i></div>
        <span>{left > 0 ? `Retour dans ${fmtTime(left)}` : 'De retour !'}</span></div>
      <button class="btn" disabled={left > 0} onclick={() => claim(i)}>Récupérer</button>
    </div>
  {/each}
  {#if !s.expeditions.length}<p class="tip book">Personne n’est parti. Envoyez une équipe !</p>{/if}

  <div class="label">Partir</div>
  <div class="dur">{#each DURATIONS as d}<button class:on={hours === d} onclick={() => (hours = d)}>{d} h</button>{/each}</div>
  {#each ZONES as z}
    {@const open = Ex.zoneOpen(s, z.id)}
    {@const loot = Ex.lootFor(s, { zone: z.id, start: 0, hours })}
    <div class="r frame" class:dim={!open}>
      <img src={gfx(z.icon)} alt="" />
      <div class="mi"><b>{z.name}</b><span>{z.desc}</span>
        {#if open}<span class="loot">{#each Object.entries(loot.res) as [id, n]}<button class="lt" onclick={() => (ui.info = { kind: 'res', id })}><img src={gfx(resInfo(id).sprite)} alt="" />{n}</button>{/each}{#if loot.metal}<span><img src={gfx('res/metal')} alt="" />{loot.metal}</span>{/if}</span>{/if}
      </div>
      {#if open}<button class="btn sky" disabled={free <= 0} onclick={() => send(z.id)}>Envoyer</button>
      {:else}<span class="lk">Étage {z.floor}</span>{/if}
    </div>
  {/each}
</div>

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 5px; }
  section { padding: 8px; }
  .r { display: flex; align-items: center; gap: 8px; padding: 6px 8px; }
  .r.dim { opacity: .45; }
  .r.done { box-shadow: inset 0 0 0 2px var(--gold); }
  .r > img { width: 34px; height: 34px; object-fit: contain; flex: none; }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; font-size: 12px; color: var(--text-3); }
  .mi b { font-size: 14px; color: var(--text); }
  .mi .bar { height: 7px; }
  .mi .bar > i { background: var(--sky); }
  .loot { display: flex; flex-wrap: wrap; gap: 6px; color: var(--moss); }
  .loot .lt { display: inline-flex; align-items: center; gap: 2px; color: var(--moss); font-size: inherit; }
  .loot img { width: 16px; height: 16px; object-fit: contain; }
  .r .btn { font-size: 12px; padding: 6px 8px; }
  .dur { display: flex; gap: 2px; padding: 2px; background: var(--ink-0); align-self: flex-start; }
  .dur button { padding: 4px 12px; font-size: 12px; font-weight: 700; color: var(--text-3); background: var(--stone-2); }
  .dur button.on { color: var(--parch-ink); background: var(--parch-2); }
  .lk { font-size: 11px; color: var(--text-3); }
  .tip { font-size: 13px; color: var(--text-3); margin: 0 2px; font-style: italic; }
</style>

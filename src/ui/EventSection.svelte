<script lang="ts">
  import { G, act, toast } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import * as Ev from '../game/events';
  import { PLANT_BY_ID, plantSprite, SEASONS } from '../game/data/garden';
  import { season } from '../game/garden';
  import { fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp, sfxGold } from '../lib/audio';
  const s = $derived(G.s);
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 1000); return () => clearInterval(t); });
  const ev = $derived(Ev.currentEvent(now));
  const sea = $derived(season(now));
  const e = $derived(s.event);
  const ends = $derived.by(() => { const t = Ev.eventEndsIn(now) / 1000, d = Math.floor(t / 86400); return d ? `${d} j ${Math.floor((t % 86400) / 3600)} h` : fmtTime(t); });
  function fight() { if (act(E.startSeasonBoss)) { sfxUp(); toast(`${ev.bossName} apparaît !`, 'crit'); } }
  function buy(id: string) { if (act(g => Ev.buyEventItem(g, id))) { sfxGold(); toast('Acheté !', 'gold'); } }
  const icon = (id: string) => (id === 'trophee' ? 'icons/complete' : id === 'graines' ? plantSprite(ev.seed, 3) : id === 'gemmes' ? 'packs/gem_pack_1' : 'partitions/crescendo_de_fureur');
</script>

{#if e}
  <section class="frame ev" style="--c:{ev.color}" data-tuto="event">
    <div class="hd">
      <img class="boss" src={gfx(ev.boss)} alt="" />
      <div class="mi">
        <div class="label">Événement · {SEASONS[sea].name} · fin dans {ends}</div>
        <div class="gothic h">{ev.name}</div>
        <div class="tk"><b>{e.tokens}</b> jetons de saison <small>(+{Ev.BOSS_TOKENS} par victoire, +{Ev.QUEST_TOKENS} par quête)</small></div>
      </div>
    </div>
    <button class="btn blood fight" disabled={e.tries <= 0 || !!s.run.monster.hunt} onclick={fight}>
      Défier {ev.bossName} · {e.tries}/{Ev.EVENT_TRIES}
    </button>
    <div class="shop">
      {#each Ev.EVENT_SHOP as it}
        {@const n = e.bought[it.id] ?? 0}
        {@const owned = it.id === 'trophee' && s.trophies?.includes(sea)}
        <div class="it slot" class:done={owned || n >= it.max}>
          <img src={gfx(icon(it.id))} alt="" />
          <div class="mi"><b>{it.name}</b><span>{it.id === 'graines' ? `3 graines : ${PLANT_BY_ID[ev.seed].name}` : it.desc}</span></div>
          {#if owned}<span class="ok">✓</span>
          {:else}<button class="btn" disabled={n >= it.max || e.tokens < it.cost} onclick={() => buy(it.id)}>{it.cost}<small>{it.max > 1 ? ` · ${n}/${it.max}` : ''}</small></button>{/if}
        </div>
      {/each}
    </div>
    <div class="tr">Trophées : {#each Ev.EVENTS as x, k}<span class:got={s.trophies?.includes(k)} style="--t:{x.color}" title={x.name}>◆</span>{/each}
      <small>+{(Ev.TROPHY_BONUS * 100 * (s.trophies?.length ?? 0)).toFixed(0)} % de dégâts</small></div>
  </section>
{/if}

<style>
  .ev { padding: 8px; display: flex; flex-direction: column; gap: 6px; box-shadow: inset 0 0 0 2px var(--c); }
  .hd { display: flex; gap: 8px; align-items: center; }
  .boss { width: 56px; height: 56px; object-fit: contain; }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .h { font-size: 26px; line-height: .95; color: var(--c); }
  .tk { font-size: 12px; color: var(--text-2); }
  .tk b { color: var(--gold); font-size: 15px; }
  .tk small { color: var(--text-3); font-size: 10.5px; }
  .fight { padding: 8px; font-size: 14px; }
  .shop { display: flex; flex-direction: column; gap: 3px; }
  .it { display: flex; align-items: center; gap: 8px; padding: 4px 6px; background: var(--stone-2); }
  .it.done { opacity: .5; }
  .it img { width: 30px; height: 30px; object-fit: contain; }
  .it .mi b { font-size: 13px; }
  .it .mi span { font-size: 11px; color: var(--text-3); }
  .it .btn { font-size: 12px; padding: 5px 8px; min-width: 66px; }
  .it .btn small { font-size: 9px; }
  .ok { color: var(--moss); padding: 0 12px; }
  .tr { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--text-3); }
  .tr span { color: var(--stone-3); font-size: 14px; }
  .tr span.got { color: var(--t); }
  .tr small { margin-left: auto; color: var(--moss); }
</style>

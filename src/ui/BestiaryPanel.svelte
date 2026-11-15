<script lang="ts">
  import { G } from '../lib/game.svelte';
  import { BESTIARY, BESTIARY_SIZE, STAR_KILLS, PER_STAR, starsOf, totalStars, monsterName } from '../game/bestiary';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  const s = $derived(G.s);
  const b = $derived(s.bestiary ?? {});
  const seen = $derived(Object.keys(b).length);
  const stars = $derived(totalStars(s));
</script>

<div class="scroll body">
  <section class="frame head">
    <div><div class="gothic h">Bestiaire</div><span class="label">{seen}/{BESTIARY_SIZE} monstres · {stars} ★</span></div>
    <div class="bonus"><b>+{(stars * PER_STAR * 100).toFixed(2)} %</b><span>tous les dégâts</span></div>
  </section>
  <p class="tip book">Une étoile à {STAR_KILLS.join(', ')} victoires contre un même monstre : +{PER_STAR * 100} % de dégâts chacune, pour toujours.</p>
  {#each BESTIARY as g}
    {#if g.act.from <= s.bestFloor}
      <div class="label">{g.act.title} · {g.act.subtitle}</div>
      <div class="grid">
        {#each g.mobs as id}
          {@const n = b[id] ?? 0}
          <div class="m slot" class:unknown={!n} title={n ? monsterName(id) : '???'}>
            <img src={gfx('mobs/' + id)} alt="" />
            <small>{n ? monsterName(id) : '???'}</small>
            {#if n}<span class="st">{'★'.repeat(starsOf(n))}<i>{'★'.repeat(3 - starsOf(n))}</i></span><b class="outline">{fmt(n)}</b>{/if}
          </div>
        {/each}
      </div>
    {/if}
  {/each}
</div>

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 6px; }
  .head { display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; }
  .h { font-size: 30px; line-height: .9; color: var(--gold); }
  .bonus { display: flex; flex-direction: column; align-items: flex-end; }
  .bonus b { font-size: 18px; color: var(--moss); }
  .bonus span { font-size: 11px; color: var(--text-3); }
  .tip { margin: 0; font-size: 12.5px; color: var(--text-3); }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
  .m { position: relative; display: flex; flex-direction: column; align-items: center; padding: 4px 2px 3px; background: var(--stone-2); }
  .m img { width: 44px; height: 44px; object-fit: contain; }
  .m.unknown img { filter: brightness(0) opacity(.45); }
  .m small { font-size: 9.5px; color: var(--text-3); text-align: center; line-height: 1.1; min-height: 21px; }
  .st { font-size: 10px; color: var(--gold); letter-spacing: -1px; }
  .st i { font-style: normal; color: var(--stone-3); }
  .m b { position: absolute; right: 3px; top: 1px; font-size: 10px; }
</style>

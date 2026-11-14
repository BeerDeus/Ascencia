<script lang="ts">
  import { guard } from '../lib/guard';
  import { G, ui } from '../lib/game.svelte';
  import { resInfo, resKind, resSources, resUses } from '../game/resinfo';
  import { POTION_BY_ID, MEAL_BY_ID } from '../game/data/crafting';
  import { potionMinutes } from '../game/crafting';
  import { level } from '../game/jobs';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import Cost from './Cost.svelte';
  const s = $derived(G.s);
  const inf = $derived(ui.info!);
  const pot = $derived(inf.kind === 'potion' ? POTION_BY_ID[inf.id] : null);
  const meal = $derived(inf.kind === 'meal' ? MEAL_BY_ID[inf.id] : null);
  const res = $derived(inf.kind === 'res' ? resInfo(inf.id) : null);
  const mins = (m: number) => (m >= 60 ? `${Math.round((m / 60) * 10) / 10} h` : `${Math.round(m)} min`);
</script>

<div class="veil" use:guard>
  <div class="box frame" role="dialog">
    {#if res}
      <div class="hd"><img src={gfx(res.sprite)} alt="" /><div class="mi"><div class="gothic h">{res.name}</div><span>{resKind(inf.id)}</span></div></div>
      <div class="row"><span>Au Coffre</span><b>{fmt(s.res[inf.id] ?? 0)}</b></div>
      <div class="label">Où la trouver</div>
      <ul>{#each resSources(inf.id) as l}<li>{l}</li>{/each}</ul>
      {@const uses = resUses(inf.id)}
      {#if uses.length}<div class="label">Sert à</div><ul>{#each uses as l}<li>{l}</li>{/each}</ul>{/if}
    {:else if pot}
      <div class="hd"><img src={gfx(pot.sprite)} alt="" /><div class="mi"><div class="gothic h">{pot.name}</div><span>Potion · Alchimiste niv. {pot.level}</span></div></div>
      <p class="book desc">{pot.desc}</p>
      <div class="row"><span>En réserve</span><b>{s.potions[pot.id] ?? 0}</b></div>
      {#if pot.minutes}<div class="row"><span>Durée</span><b>{mins(potionMinutes(s, pot.id))}</b></div>{/if}
      <div class="row"><span>XP d’Alchimiste</span><b>{pot.xp}</b></div>
      <div class="label">Ingrédients</div><Cost cost={pot.cost} />
      {#if level(s, 'alchimiste') < pot.level}<p class="lock">Recette apprise au niveau {pot.level} d’Alchimiste.</p>{/if}
    {:else if meal}
      <div class="hd"><img src={gfx(meal.sprite)} alt="" /><div class="mi"><div class="gothic h">{meal.name}</div><span>Repas · Cuisinier niv. {meal.level}</span></div></div>
      <p class="book desc">{meal.desc}</p>
      <div class="row"><span>Durée (actif hors-ligne)</span><b>{mins(meal.hours * 60 * (1 + level(s, 'cuisinier') * 0.01))}</b></div>
      <div class="row"><span>XP de Cuisinier</span><b>{meal.xp}</b></div>
      <div class="label">Ingrédients</div><Cost cost={meal.cost} />
      {#if level(s, 'cuisinier') < meal.level}<p class="lock">Plat appris au niveau {meal.level} de Cuisinier.</p>{/if}
    {/if}
    <button class="btn go" onclick={() => (ui.info = null)}>Fermer</button>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 48; background: rgba(8,6,12,.82); display: grid; place-items: center; padding: 14px; }
  .box { width: 100%; max-width: 360px; max-height: 86dvh; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 6px; }
  .hd { display: flex; gap: 10px; align-items: center; }
  .hd img { width: 56px; height: 56px; object-fit: contain; }
  .mi { display: flex; flex-direction: column; font-size: 12px; color: var(--text-3); }
  .h { font-size: 28px; line-height: .95; color: var(--gold); }
  .desc { margin: 0; font-size: 15px; color: var(--text); }
  .row { display: flex; justify-content: space-between; padding: 4px 6px; font-size: 13px; background: var(--stone-2); }
  .row b { color: var(--gold); }
  ul { margin: 0; padding-left: 18px; font-size: 13px; color: var(--text-2); display: flex; flex-direction: column; gap: 2px; }
  .lock { margin: 0; font-size: 12px; color: var(--ember); }
  .go { margin-top: 4px; padding: 9px; }
</style>

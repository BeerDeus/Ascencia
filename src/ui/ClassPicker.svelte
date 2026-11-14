<script lang="ts">
  import { ui, chooseClass, G } from '../lib/game.svelte';
  import { CLASSES } from '../game/data/heroes';
  import { masteryLevel } from '../game/formulas';
  import { gfx } from '../lib/gfx';
  import * as E from '../game/engine';
  let sel = $state(G.s.classId ?? 'guerrier');
  const asc = $derived(ui.classPicker === 'ascension');
</script>

<div class="veil">
  <div class="sheet frame">
    <h2 class="gothic">{asc ? 'Renaître en…' : 'Choisis ta voie'}</h2>
    {#if asc}<p class="sub">+{E.ascensionGain(G.s)} Éclats. La classe peut changer à chaque Ascension.</p>{/if}
    <div class="list">
      {#each CLASSES as c}
        <button class="c" class:on={sel === c.id} onclick={() => (sel = c.id)}>
          <img src={gfx(c.portrait)} alt="" />
          <div class="mid">
            <div class="nm"><img src={gfx(c.icon)} alt="" />{c.name}</div>
            <div class="label">{c.style} · maîtrise {masteryLevel(G.s.mastery[c.id])}</div>
            <ul>{#each c.perks as p}<li>{p}</li>{/each}</ul>
          </div>
        </button>
      {/each}
    </div>
    <div class="row">
      {#if asc}<button class="btn stone" onclick={() => (ui.classPicker = null)}>Annuler</button>{/if}
      <button class="btn go" onclick={() => chooseClass(sel)}>{asc ? 'Ascensionner' : 'Commencer'}</button>
    </div>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 40; background: rgba(8,6,12,.82); display: flex; align-items: flex-end; justify-content: center; }
  .sheet { width: 100%; max-width: 560px; padding: 12px 10px calc(12px + var(--safe-bottom)); background: var(--stone-1); max-height: 94dvh; overflow-y: auto; clip-path: none; }
  h2 { margin: 0; text-align: center; color: var(--parch); font-size: 38px; line-height: 1; }
  .sub { text-align: center; font-size: 12px; color: var(--text-3); margin: 2px 0 0; }
  .list { display: flex; flex-direction: column; gap: 6px; margin: 10px 0; }
  .c { display: flex; gap: 10px; text-align: left; padding: 6px; background: var(--stone-2); border: 2px solid var(--ink-0); box-shadow: inset 0 2px 0 var(--hi); }
  .c.on { background: #3b3020; box-shadow: inset 0 0 0 2px var(--gold); }
  .c > img { width: 60px; height: 80px; object-fit: contain; }
  .nm { display: flex; align-items: center; gap: 6px; font-size: 18px; font-weight: 700; }
  .nm img { width: 22px; height: 22px; }
  ul { margin: 3px 0 0; padding-left: 14px; font-size: 12.5px; color: var(--text-2); }
  .row { display: flex; gap: 6px; }
  .go { flex: 1; padding: 11px; font-size: 16px; }
</style>

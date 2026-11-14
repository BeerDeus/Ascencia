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
  <div class="sheet">
    <h2 class="title">{asc ? 'Renaître en…' : 'Choisis ta voie'}</h2>
    {#if asc}<p class="sub">+{E.ascensionGain(G.s)} Éclats · tu pourras changer de classe à chaque Ascension.</p>{/if}
    <div class="list">
      {#each CLASSES as c}
        <button class="c" class:on={sel === c.id} onclick={() => (sel = c.id)}>
          <img class="px" src={gfx(c.portrait)} alt="" />
          <div class="mid">
            <div class="nm title"><img class="px" src={gfx(c.icon)} alt="" />{c.name}</div>
            <div class="st">{c.style} · Maîtrise {masteryLevel(G.s.mastery[c.id])}</div>
            <ul>{#each c.perks as p}<li>{p}</li>{/each}</ul>
          </div>
        </button>
      {/each}
    </div>
    <div class="row">
      {#if asc}<button class="btn ghost" onclick={() => (ui.classPicker = null)}>Annuler</button>{/if}
      <button class="btn violet go" onclick={() => chooseClass(sel)}>{asc ? 'Ascensionner' : 'Commencer'}</button>
    </div>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 40; background: rgba(5,3,12,.85); display: flex; align-items: flex-end; justify-content: center; animation: fade .2s; }
  @keyframes fade { from { opacity: 0; } }
  .sheet { width: 100%; max-width: 560px; background: var(--bg-2); border-radius: 20px 20px 0 0; padding: 18px 14px calc(16px + var(--safe-bottom)); box-shadow: 0 -10px 40px rgba(0,0,0,.5); max-height: 92dvh; overflow-y: auto; }
  h2 { margin: 0; text-align: center; color: var(--gold); font-size: 22px; }
  .sub { text-align: center; font-size: 12px; color: var(--ink-3); margin: 4px 0 0; }
  .list { display: flex; flex-direction: column; gap: 8px; margin: 14px 0; }
  .c { display: flex; gap: 10px; text-align: left; background: var(--panel); border-radius: 14px; padding: 8px; box-shadow: inset 0 0 0 1px var(--line); transition: transform .1s; }
  .c.on { box-shadow: inset 0 0 0 2px var(--gold), 0 0 20px -6px var(--gold); transform: scale(1.01); }
  .c > img { width: 64px; height: 84px; object-fit: contain; }
  .nm { display: flex; align-items: center; gap: 6px; font-size: 17px; }
  .nm img { width: 22px; height: 22px; }
  .st { font-size: 11px; color: var(--ink-3); }
  ul { margin: 4px 0 0; padding-left: 16px; font-size: 12px; color: var(--ink-2); }
  .row { display: flex; gap: 8px; }
  .go { flex: 1; padding: 12px; font-size: 16px; font-family: var(--font-title); }
</style>

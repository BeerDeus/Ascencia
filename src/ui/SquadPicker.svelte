<script lang="ts">
  import { guard } from '../lib/guard';
  import { G, ui, act, toast } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import * as Co from '../game/company';
  import { COMPANIONS } from '../game/data/heroes';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp } from '../lib/audio';
  const s = $derived(G.s);
  const slot = $derived(ui.squadPick ?? 0);
  const squad = $derived(Co.squadOf(s));
  const others = $derived(squad.filter((x, k) => k !== slot && x >= 0 && s.run.companions[x] > 0));
  const hired = $derived(COMPANIONS.map((_, i) => i).filter(i => s.run.companions[i] > 0).sort((a, b) => E.memberRaw(s, b) - E.memberRaw(s, a)));
  /** Synergies qu'activerait ce compagnon à cette place. */
  const wouldSyn = (i: number) => Co.SYNERGIES.filter(x => x.ids.includes(i) && x.ids.every(id => id === i || others.includes(id)));
  function pick(i: number) {
    if (!Co.canChangeSquad(s)) { toast('Pas pendant un combat de boss', 'info'); return; }
    if (act(g => Co.setSlot(g, slot, i))) { sfxUp(); ui.squadPick = null; }
  }
</script>

<div class="veil" use:guard>
  <div class="box frame" role="dialog" aria-label="Choisir">
    <div class="hd"><div class="gothic h">{slot === 0 ? '♛ ' : ''}{Co.SLOTS[slot]}</div><span>{Co.SLOT_DESC[slot]}</span></div>
    <div class="list">
      {#each hired as i}
        {@const c = COMPANIONS[i]}
        {@const at = squad.indexOf(i)}
        {@const rel = others.map(o => Co.relation(i, o))}
        <button class="row slot" class:cur={at === slot} onclick={() => pick(i)}>
          <img src={gfx(c.sprite)} alt="" />
          <div class="mi">
            <b>{c.name} <em>{s.run.companions[i]}</em></b>
            <span><i class="t-{c.type}">{Co.ROLE_NAME[c.type]}</i> · <b class="bon">{Co.fmtStat(Co.SLOT_BONUS[i][slot], Co.slotBonusValue(i, slot, s.run.companions[i]))}</b></span>
            <span class="rel">
              {#each others as o, k}{#if rel[k] > 0}<em class="pos">♥ {COMPANIONS[o].name}</em>{:else if rel[k] < 0}<em class="neg">⚔ {COMPANIONS[o].name}</em>{/if}{/each}
              {#each wouldSyn(i) as x}<em class="syn">✦ {x.name}</em>{/each}
              {#if at >= 0 && at !== slot}<em>actuellement {Co.SLOTS[at]}</em>{/if}
            </span>
          </div>
        </button>
      {/each}
      {#if !hired.length}<p class="empty">Recrutez d’abord un compagnon dans le roster.</p>{/if}
    </div>
    <div class="acts">
      {#if squad[slot] >= 0}<button class="btn stone" onclick={() => { act(g => Co.setSlot(g, slot, -1)); ui.squadPick = null; }}>Laisser vide</button>{/if}
      <button class="btn" onclick={() => (ui.squadPick = null)}>Fermer</button>
    </div>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 47; background: rgba(8,6,12,.82); display: grid; place-items: center; padding: 12px; }
  .box { width: 100%; max-width: 400px; max-height: 86dvh; padding: 10px; display: flex; flex-direction: column; gap: 6px; }
  .hd { display: flex; flex-direction: column; }
  .h { font-size: 28px; line-height: 1; color: var(--gold); }
  .hd span { font-size: 12px; color: var(--text-3); }
  .list { overflow-y: auto; min-height: 0; display: flex; flex-direction: column; gap: 4px; }
  .row { display: flex; gap: 8px; align-items: center; padding: 5px 6px; text-align: left; background: var(--stone-2); }
  .row.cur { box-shadow: inset 0 0 0 2px var(--gold); }
  .row img { flex: none; width: 40px; height: 40px; object-fit: contain; object-position: top; }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: 11px; color: var(--text-3); }
  .mi b { font-size: 13px; color: var(--text); }
  .mi b em { font-style: normal; color: var(--gold); }
  .mi i { font-style: normal; }
  .t-melee { color: #e3907a; } .t-distance { color: var(--moss); } .t-magie { color: var(--sky); }
  .rel { display: flex; flex-wrap: wrap; gap: 2px 6px; }
  .rel em { font-style: normal; font-size: 10.5px; }
  .rel .pos { color: var(--moss); } .rel .neg { color: #e07a6f; } .rel .syn { color: var(--gold-hi); }
  .empty { margin: 8px 0; font-size: 13px; color: var(--text-3); text-align: center; }
  .acts { display: flex; gap: 6px; justify-content: flex-end; }
  .bon { font-size: 11px; color: var(--moss); }
</style>

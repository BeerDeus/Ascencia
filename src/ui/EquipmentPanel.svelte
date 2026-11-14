<script lang="ts">
  import { G, act, toast } from '../lib/game.svelte';
  import * as I from '../game/items';
  import { invMax } from '../game/shop';
  import { SLOTS, RARITIES, STATS } from '../game/data/items';
  import type { Item } from '../game/types';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp, sfxGold } from '../lib/audio';

  const s = $derived(G.s);
  const inv = $derived([...s.run.inventory].sort((a, b) => b.rarity - a.rarity || I.score(b, s) - I.score(a, s)));
  let selId = $state<number | null>(null);
  const sel = $derived(s.run.inventory.find(i => i.id === selId) ?? null);
  const cur = $derived(sel ? I.equippedIn(s, sel.slot) : undefined);
  const better = (it: Item) => { const e = I.equippedIn(s, it.slot); return I.canWear(s, it) && (!e || (e.id !== it.id && I.score(it, s) > I.score(e, s))); };
  const N = (x: number) => fmt(x, s.settings.notation);

  function equipBest() { const n = act(I.equipBest); toast(n ? `${n} objet(s) équipé(s)` : 'Déjà au mieux', 'up'); }
  function recycleCommon() { const v = act(g => I.recycleBelow(g, 2)); if (v) { sfxGold(); toast(`+${v} métal`, 'gold'); } }
  function forge(it: Item) { if (act(g => I.upgrade(g, it.id))) sfxUp(); }
  function recycle(it: Item) { const v = act(g => I.recycle(g, it.id)); if (v) { sfxGold(); toast(`+${v} métal`, 'gold'); selId = null; } }
</script>

{#if !I.lootUnlocked(s)}
  <div class="locked">
    <img src={gfx('portraits/kaelen')} alt="" />
    <p class="book">« Libère-moi de ces gobelins, et je forgerai pour toi. »</p>
    <span class="label">Battez le boss de l’étage 10</span>
  </div>
{:else}
  <div class="scroll body">
    <div class="doll">
      {#each SLOTS as sl}
        {@const it = I.equippedIn(s, sl.id)}
        <button class="cell slot" style="--r:{it ? RARITIES[it.rarity].color : 'transparent'}" class:filled={!!it} onclick={() => it && (selId = it.id)}>
          {#if it}<img src={gfx(it.base)} alt="" />{#if it.plus}<b class="outline">+{it.plus}</b>{/if}{#if it.id === s.heritage}<i class="her">★</i>{/if}
          {:else}<span>{sl.name}</span>{/if}
        </button>
      {/each}
    </div>

    <div class="tools">
      <span class="metal"><img src={gfx('res/metal')} alt="" />{N(s.metal)}</span>
      <button class="btn stone" onclick={recycleCommon}>Recycler &lt; Rare</button>
      <button class="btn" onclick={equipBest}>Équiper le mieux</button>
    </div>

    <div class="label">Sac · {s.run.inventory.length}/{invMax(s)}</div>
    <div class="inv">
      {#each inv as it (it.id)}
        <button class="cell slot" class:sel={selId === it.id} class:eq={I.isEquipped(s, it)} style="--r:{RARITIES[it.rarity].color}" onclick={() => (selId = it.id)}>
          <img src={gfx(it.base)} alt="" />
          {#if it.plus}<b class="outline">+{it.plus}</b>{/if}
          {#if better(it)}<i class="up">▲</i>{/if}
          {#if it.id === s.heritage}<i class="her">★</i>{/if}
          {#if it.bound}<i class="bnd">◆</i>{/if}
          {#if !I.canWear(s, it)}<i class="lock">🔒</i>{/if}
        </button>
      {/each}
      {#if !inv.length}<p class="empty">Rien pour l’instant. Les boss lâchent du butin.</p>{/if}
    </div>
  </div>

  {#if sel}
    <div class="sheet frame">
      <button class="x" onclick={() => (selId = null)} aria-label="Fermer">✕</button>
      <div class="hd">
        <div class="big slot" style="--r:{RARITIES[sel.rarity].color}"><img src={gfx(sel.base)} alt="" /></div>
        <div>
          <div class="iname" style="color:{RARITIES[sel.rarity].color}">{sel.name}{sel.plus ? ' +' + sel.plus : ''}</div>
          <div class="label">{RARITIES[sel.rarity].name} · {SLOTS.find(x => x.id === sel.slot)?.name} · niv. {sel.ilvl}{sel.set ? ' · panoplie' : ''}</div>
          {#if sel.bound}<div class="bound">◆ Lié au compte : revient à chaque vie{sel.minFloor ? ` · record ${sel.minFloor} requis` : ''}</div>{/if}
        </div>
      </div>
      <ul>
        {#each sel.affixes as a}
          {@const v = I.affixNow(s, sel, a)}
          {@const other = cur && cur.id !== sel.id ? cur.affixes.filter(x => x.stat === a.stat).reduce((t, x) => t + I.affixNow(s, cur, x), 0) : null}
          <li>{STATS[a.stat].fmt(v)}{#if other !== null}<em class:pos={v >= other} class:neg={v < other}>{v >= other ? '▲' : '▼'}</em>{/if}</li>
        {/each}
      </ul>
      <div class="acts">
        {#if !I.isEquipped(s, sel)}<button class="btn" disabled={!I.canWear(s, sel)} onclick={() => act(g => I.equip(g, sel.id))}>{I.canWear(s, sel) ? 'Équiper' : `Record ${sel.minFloor} requis`}</button>{/if}
        <button class="btn sky" disabled={sel.plus >= I.PLUS_MAX || I.upgradeCost(sel) > s.metal} onclick={() => forge(sel)}>
          Forger {sel.plus >= I.PLUS_MAX ? 'max' : '· ' + N(I.upgradeCost(sel))}<img src={gfx('res/metal')} alt="" /></button>
        {#if !sel.bound}<button class="btn stone" onclick={() => act(g => I.setHeritage(g, sel.id))}>{s.heritage === sel.id ? '★ Héritage' : '☆ Héritage'}</button>{/if}
        {#if !I.isEquipped(s, sel) && sel.id !== s.heritage && !sel.bound}<button class="btn blood" onclick={() => recycle(sel)}>Recycler +{I.recycleValue(sel)}</button>{/if}
      </div>
      <p class="hint">Héritage : cet objet survit à l’Ascension (1 seul).</p>
    </div>
  {/if}
{/if}

<style>
  .locked { text-align: center; padding: 18px; color: var(--text-2); }
  .locked img { height: 110px; }
  .locked p { font-size: 16px; font-style: italic; }
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 8px; }
  .doll { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
  .inv { display: grid; grid-template-columns: repeat(auto-fill, minmax(54px, 1fr)); gap: 5px; }
  .cell { position: relative; aspect-ratio: 1; display: grid; place-items: center; box-shadow: inset 0 0 0 2px var(--r), inset 2px 2px 0 4px var(--lo); }
  .cell img { width: 74%; height: 74%; object-fit: contain; }
  .cell span { font-size: 10px; color: var(--text-3); }
  .cell.sel { outline: 2px solid var(--gold-hi); outline-offset: -2px; }
  .cell.eq::after { content: 'E'; position: absolute; left: 3px; top: 1px; font-size: 10px; color: var(--gold); }
  .cell b { position: absolute; right: 3px; bottom: 1px; font-size: 11px; color: var(--sky); }
  .up { position: absolute; right: 3px; top: 1px; font-size: 10px; color: var(--moss); font-style: normal; }
  .bnd { position: absolute; right: 3px; top: 1px; font-size: 10px; color: var(--ember); font-style: normal; }
  .lock { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 16px; font-style: normal; }
  .bound { font-size: 11px; color: var(--ember); }
  .her { position: absolute; left: 3px; bottom: 0; font-size: 11px; color: var(--gold); font-style: normal; }
  .tools { display: flex; align-items: center; gap: 6px; }
  .metal { display: inline-flex; align-items: center; gap: 3px; margin-right: auto; font-weight: 700; color: #b9c2c9; }
  .metal img { width: 22px; height: 22px; }
  .tools .btn { font-size: 12px; padding: 6px 8px; }
  .empty { grid-column: 1 / -1; font-family: var(--f-book); font-style: italic; color: var(--text-3); }
  .sheet { position: absolute; left: 6px; right: 6px; bottom: 6px; z-index: 5; padding: 10px; background: var(--stone-2); animation: up .18s steps(3); }
  @keyframes up { from { transform: translateY(30px); opacity: 0; } }
  .x { position: absolute; right: 8px; top: 6px; color: var(--text-3); font-size: 16px; }
  .hd { display: flex; gap: 10px; align-items: center; }
  .big { width: 56px; height: 56px; display: grid; place-items: center; box-shadow: inset 0 0 0 2px var(--r); }
  .big img { width: 46px; height: 46px; object-fit: contain; }
  .iname { font-weight: 700; font-size: 16px; }
  ul { margin: 8px 0; padding-left: 16px; font-size: 14px; color: var(--text); }
  li em { font-style: normal; margin-left: 6px; font-size: 11px; }
  .pos { color: var(--moss); } .neg { color: var(--blood); }
  .acts { display: flex; flex-wrap: wrap; gap: 6px; }
  .acts .btn { font-size: 12px; padding: 6px 9px; }
  .acts img { width: 16px; height: 16px; }
  .hint { margin: 6px 0 0; font-size: 11px; color: var(--text-3); }
</style>

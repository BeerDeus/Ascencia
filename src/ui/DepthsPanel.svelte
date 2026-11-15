<script lang="ts">
  import { G, ui, act, toast } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import * as Dp from '../game/depths';
  import { gfx } from '../lib/gfx';
  import { GEM_ICON } from '../game/data/shop';
  import { sfxUp } from '../lib/audio';
  const s = $derived(G.s);
  const d = $derived(s.depths);
  const inRun = $derived(s.run.monster.hunt === 'abysse');
  const mod = $derived(Dp.MODIFIERS.find(m => m.id === d?.mod));
  function go() { if (act(E.startDepths)) { sfxUp(); ui.tab = 'compagnons'; } }
  function leave() { if (act(E.leaveDepths)) toast('Vous remontez à la surface.', 'info'); }
  function buy(id: string) { if (act(g => Dp.buyDepthNode(g, id))) sfxUp(); }
</script>

<div class="scroll body">
  {#if !Dp.depthsUnlocked(s)}
    <div class="locked frame"><img src={gfx('mobs/horreur_dimentionnelle')} alt="" /><p class="book">« Sous les étages, ça respire. Reviens quand tu auras vu l’étage {Dp.DEPTHS_UNLOCK}. »</p></div>
  {:else if d}
    <section class="frame head">
      <img src={gfx('mobs/shoggoth')} alt="" />
      <div class="mi">
        <div class="gothic h">Les Profondeurs</div>
        <span>Record : profondeur <b>{d.best}</b> · Éclats d’abysse : <b class="sh">{d.shards}</b></span>
        <span>Chaque profondeur : un adversaire et un effet au hasard. Toutes les 5 : gros butin. Toutes les 10 : un Gardien.</span>
      </div>
    </section>
    {#if inRun}
      <section class="frame run">
        <b>Profondeur {d.depth}</b><span>{mod?.name} · {mod?.desc}</span>
        <button class="btn stone" onclick={leave}>Remonter</button>
      </section>
    {:else}
      <div class="keys">
        <span>Clés : <b>{d.keys}</b> ({Dp.keysPerDay(s)}/jour)</span>
        <button class="btn stone" disabled={s.gems < Dp.KEY_GEMS} onclick={() => act(Dp.buyKey) && sfxUp()}>+1 clé · {Dp.KEY_GEMS}<img src={gfx(GEM_ICON)} alt="" /></button>
      </div>
      <button class="btn blood go" disabled={d.keys <= 0 || !!s.run.monster.hunt} onclick={go}>Descendre (1 clé)</button>
    {/if}
    <div class="label">Arbre des abysses</div>
    {#each Dp.DEPTH_NODES as n}
      {@const lv = d.nodes[n.id] ?? 0}
      {@const c = Dp.nodeCost(n, lv)}
      <div class="node slot" class:max={lv >= n.max}>
        <div class="mi"><b>{n.name} <small>{lv}/{n.max}</small></b><span>{lv ? n.desc(lv * n.per) : '—'}{#if lv < n.max} <em>→ {n.desc((lv + 1) * n.per)}</em>{/if}</span></div>
        {#if lv < n.max}<button class="btn" disabled={d.shards < c} onclick={() => buy(n.id)}>{c}</button>{:else}<span class="ok">max</span>{/if}
      </div>
    {/each}
  {/if}
</div>

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 6px; }
  .locked { padding: 14px; text-align: center; color: var(--text-2); }
  .locked img { height: 90px; }
  .head { display: flex; gap: 8px; align-items: center; padding: 8px; box-shadow: inset 0 0 0 2px #6b4fa0; }
  .head img { width: 56px; height: 56px; object-fit: contain; }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: 12px; color: var(--text-3); }
  .h { font-size: 28px; line-height: .95; color: #c59bff; }
  .mi b { color: var(--text); }
  .sh { color: #c59bff !important; }
  .run { display: flex; align-items: center; gap: 8px; padding: 8px; }
  .run span { flex: 1; font-size: 12px; color: var(--text-2); }
  .keys { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--text-2); }
  .keys b { color: var(--gold); }
  .keys .btn { font-size: 12px; gap: 3px; }
  .keys img { width: 14px; height: 14px; }
  .go { padding: 10px; font-size: 15px; }
  .node { display: flex; align-items: center; gap: 8px; padding: 6px 8px; background: var(--stone-2); }
  .node.max { opacity: .6; }
  .node .mi b { font-size: 13px; }
  .node .mi small { color: var(--text-3); font-weight: 400; }
  .node .mi em { font-style: normal; color: var(--moss); }
  .node .btn { min-width: 54px; color: #c59bff; }
  .ok { color: var(--moss); padding: 0 10px; font-size: 12px; }
</style>

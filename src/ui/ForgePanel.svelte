<script lang="ts">
  import { G, act, toast } from '../lib/game.svelte';
  import * as Fo from '../game/forge';
  import { SETS, ORDER_STATS, orderMetal, orderCost } from '../game/data/forge';
  import { SLOTS, STATS, RARITIES, BASES, type Slot, type StatId } from '../game/data/items';
  import { affixValue, rarityOdds, AFFIX_COUNT } from '../game/items';
  import { canPay } from '../game/jobs';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp } from '../lib/audio';
  import Cost from './Cost.svelte';
  import JobBar from './JobBar.svelte';
  const s = $derived(G.s);
  let slot = $state<Slot>('arme');
  let stat = $state<StatId>('frappe');
  const metal = $derived(orderMetal(s.run.floor));
  const cost = $derived(orderCost(slot, s.run.floor));
  const minR = $derived(Fo.minRarity(s));
  const odds = $derived(rarityOdds(s.run.floor, minR));
  const can = $derived(s.metal >= metal && canPay(s, cost));
  const icon = (sl: Slot) => BASES[sl][Math.min(3, BASES[sl].length - 1)][0];
  // valeur de la stat garantie (qualité 100 %) selon la rareté obtenue
  const valAt = (r: number) => STATS[stat].fmt(affixValue(stat, s.run.floor, r, Fo.ORDER_ROLL));
  const extra = (r: number) => AFFIX_COUNT[r] - 1;
  function order() { const it = act(g => Fo.order(g, slot, stat)); if (it) { sfxUp(); toast(`Forgé : ${it.name} [${RARITIES[it.rarity].name}]`, it.rarity >= 3 ? 'crit' : 'up'); } }
  function piece(setId: string, sl: Slot) { const it = act(g => Fo.forgePiece(g, setId, sl)); if (it) { sfxUp(); toast(`Forgé : ${it.name}`, 'crit'); } }
  const permanent = $derived(Fo.permanentSetMult(s));
</script>

<div class="scroll body">
  <section class="frame"><JobBar job="forgeron" /></section>

  <section class="frame order">
    <div class="gothic h">Commande à Kaelen</div>
    <p class="tip">Choisissez la pièce et sa stat principale : elle sera <b>garantie à 100 %</b>. Les autres stats (selon la rareté) sont tirées au hasard. Niveau d’objet : étage actuel ({s.run.floor}).</p>
    <div class="label">1 · La pièce</div>
    <div class="slots">
      {#each SLOTS as x}<button class="sl slot" class:on={slot === x.id} onclick={() => (slot = x.id)}><img src={gfx(icon(x.id))} alt="" /><small>{x.name}</small></button>{/each}
    </div>
    <div class="label">2 · La stat garantie</div>
    <div class="chips">{#each ORDER_STATS as x}<button class:on={stat === x} onclick={() => (stat = x)}>{STATS[x].name}</button>{/each}</div>
    <div class="label">3 · Aperçu</div>
    <div class="preview">
      <img src={gfx(icon(slot))} alt="" />
      <div class="pv">
        <b>{SLOTS.find(x => x.id === slot)?.name} · {STATS[stat].name} <em>niv. {s.run.floor}</em></b>
        <span>Garanti : <strong>{valAt(minR)}</strong> en {RARITIES[minR].name.toLowerCase()}, jusqu’à {valAt(5)} en mythique</span>
        <span>+ {extra(minR)} à {extra(5)} stat{extra(5) > 1 ? 's' : ''} aléatoire{extra(5) > 1 ? 's' : ''} selon la rareté</span>
      </div>
    </div>
    <div class="odds">
      {#each odds as p, r}{#if p >= 0.005}<span style="--c:{RARITIES[r].color}; flex:{Math.max(p, 0.06)}"><i>{RARITIES[r].name}</i><b>{p >= 0.1 ? Math.round(p * 100) : (p * 100).toFixed(1).replace('.', ',')} %</b></span>{/if}{/each}
    </div>
    <div class="label">4 · Coût</div>
    <div class="row">
      <span class="cost"><Cost cost={cost} /><span class="m" class:miss={s.metal < metal}><img src={gfx('res/metal')} alt="" />{fmt(s.metal)}/{fmt(metal)}</span></span>
      <button class="btn go" disabled={!can} onclick={order}>Forger</button>
    </div>
    {#if !can}<p class="tip">Il manque des ressources : appui long sur une ressource pour savoir où la trouver.</p>{/if}
  </section>

  <div class="label">Panoplies · bonus permanent actuel : tous les dégâts ×{permanent.toFixed(2)}</div>
  {#each SETS as d}
    {@const open = Fo.setUnlocked(s, d.id)}
    {@const got = s.forge.sets[d.id] ?? []}
    <section class="frame set" class:dim={!open} class:done={Fo.setComplete(s, d.id)}>
      <div class="sh"><b>{d.name}</b><span>{d.act} · {got.length}/4 forgées</span></div>
      <div class="bon">2 pièces : {d.desc2} · 4 pièces : {d.desc4} · Collection complète : +{Math.round(d.permanent * 100)} % tous les dégâts, pour toujours</div>
      {#if open}
        <div class="pieces">
          {#each d.pieces as p}
            <button class="pc slot" class:have={got.includes(p.slot)} onclick={() => piece(d.id, p.slot)} title={p.name}>
              <img src={gfx(p.base)} alt="" /><small>{p.name.split(' ')[0]}</small>{#if got.includes(p.slot)}<i>✓</i>{/if}
            </button>
          {/each}
        </div>
        <div class="row"><Cost cost={d.cost} /><span class="m" class:miss={s.metal < d.metal}><img src={gfx('res/metal')} alt="" />{d.metal}</span></div>
      {:else}<span class="lk">Étage {d.floor} · Forgeron {d.level}</span>{/if}
    </section>
  {/each}
</div>

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 6px; }
  section { padding: 8px; display: flex; flex-direction: column; gap: 6px; }
  .h { font-size: 26px; line-height: .9; color: var(--parch); }
  .tip { margin: 0; font-size: 12px; color: var(--text-3); }
  .chips { display: flex; flex-wrap: wrap; gap: 3px; }
  .chips button { padding: 4px 7px; font-size: 11.5px; font-weight: 700; color: var(--text-3); background: var(--stone-2); border: 2px solid var(--ink-0); }
  .chips button.on { color: var(--parch-ink); background: var(--parch-2); }
  .row { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
  .cost { display: inline-flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .m { display: inline-flex; align-items: center; gap: 2px; font-size: 12px; color: var(--moss); }
  .m.miss { color: #d98a80; }
  .m img { width: 18px; height: 18px; }
  .set.dim { opacity: .5; }
  .set.done { box-shadow: inset 0 0 0 2px var(--gold); }
  .sh { display: flex; justify-content: space-between; align-items: baseline; font-size: 14px; }
  .sh span { font-size: 11.5px; color: var(--text-3); }
  .bon { font-size: 11.5px; color: var(--text-2); }
  .pieces { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
  .pc { position: relative; display: flex; flex-direction: column; align-items: center; padding: 4px 2px; background: var(--stone-2); }
  .pc img { width: 38px; height: 38px; object-fit: contain; }
  .pc small { font-size: 9.5px; color: var(--text-3); }
  .pc.have { box-shadow: inset 0 0 0 2px var(--moss); }
  .pc i { position: absolute; top: 1px; right: 4px; font-style: normal; color: var(--moss); font-size: 12px; }
  .lk { font-size: 11px; color: var(--text-3); }
  .order .label { margin-top: 2px; }
  .slots { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
  .sl { display: flex; flex-direction: column; align-items: center; padding: 3px 2px; background: var(--stone-2); }
  .sl img { width: 32px; height: 32px; object-fit: contain; }
  .sl small { font-size: 10px; color: var(--text-3); }
  .sl.on { box-shadow: inset 0 0 0 2px var(--gold); background: #3d3423; }
  .sl.on small { color: var(--text); }
  .preview { display: flex; gap: 8px; align-items: center; padding: 6px; background: var(--stone-2); }
  .preview img { width: 48px; height: 48px; object-fit: contain; }
  .pv { display: flex; flex-direction: column; font-size: 11.5px; color: var(--text-3); }
  .pv b { font-size: 13.5px; color: var(--text); }
  .pv em { font-style: normal; color: var(--gold); font-size: 11px; }
  .pv strong { color: var(--moss); }
  .odds { display: flex; gap: 2px; }
  .odds span { min-width: 0; display: flex; flex-direction: column; align-items: center; padding: 2px 1px; background: color-mix(in srgb, var(--c) 30%, var(--stone-1)); border-bottom: 2px solid var(--c); }
  .odds i { font-style: normal; font-size: 8.5px; color: var(--text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
  .odds b { font-size: 10px; }
  .go { min-width: 90px; }
</style>

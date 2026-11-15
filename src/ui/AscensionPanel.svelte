<script lang="ts">
  import { G, ui, act } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { STARS, BRANCHES, starCost, type Branch } from '../game/data/constellations';
  import { eclatsFor, legendeMult } from '../game/formulas';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp } from '../lib/audio';

  const s = $derived(G.s);
  const N = (x: number) => fmt(x, s.settings.notation);
  const gain = $derived(E.ascensionGain(s));
  // gain réel de puissance (la Légende multiplie tous les dégâts)
  const boost = $derived(legendeMult(s.legende + gain) / legendeMult(s.legende) - 1);
  const nextAt = $derived.by(() => { let f = s.run.maxFloor + 1; const g = eclatsFor(s.run.maxFloor); while (eclatsFor(f) <= g && f < s.run.maxFloor + 50) f++; return f; });
  const branches = Object.keys(BRANCHES) as Branch[];
  let branch = $state<Branch>('glaive');
  function buy(id: string) { if (act(g => E.buyStar(g, id))) sfxUp(); }
</script>

<div class="scroll body" style="background-image: linear-gradient(rgba(22,19,28,.86), rgba(22,19,28,.94)), url({gfx('bg/skill')})">
  {#if !s.ascensionUnlocked}
    <div class="locked">
      <img src={gfx('portraits/lysandra')} alt="" />
      <p class="book">« Un jour, cette vie atteindra ses limites. Ce jour-là, je t’apprendrai à renaître. »</p>
      <span class="label">Se débloque pendant l’Acte II</span>
    </div>
  {:else}
    <div class="asc frame">
      <div class="label">Ascensionner maintenant</div>
      <div class="gain outline"><img src={gfx('res/eclats_ascension')} alt="" />+{N(gain)}</div>
      <div class="small">Record de cette vie : étage {s.run.maxFloor} · prochain Éclat à l’étage {nextAt}</div>
      {#if gain > 0}
        <div class="advice" class:good={boost >= 0.5}>Après le rituel : <b>tous les dégâts +{Math.round(boost * 100)} %</b> (Légende {N(s.legende)} → {N(s.legende + gain)}){boost >= 0.5 ? ' · conseillé !' : boost < 0.15 ? ' · encore un peu de patience' : ''}</div>
      {/if}
      <button class="btn go" data-tuto="ascend" disabled={!E.canAscend(s)} onclick={() => (ui.classPicker = 'ascension')}>
        {E.canAscend(s) ? 'Entamer le rituel' : 'Atteindre l’étage 30'}
      </button>
      <div class="small">Perdu : étage, or, niveaux, équipement (sauf Héritage). Gardé : Éclats, Légende, Constellations, Maîtrises, métal.</div>
      <div class="kv">
        <span>Légende <b>{N(s.legende)}</b></span><span>Ascensions <b>{s.ascensions}</b></span><span>Éclats <b>{N(s.eclats)}</b></span>
      </div>
    </div>

    <div class="tabs" data-tuto="stars">
      {#each branches as b}
        <button class:on={branch === b} style="--c:{BRANCHES[b].color}" onclick={() => (branch = b)}>{BRANCHES[b].name}</button>
      {/each}
    </div>
    <div class="stars">
      {#each STARS.filter(x => x.branch === branch) as node (node.id)}
        {@const lv = s.constellations[node.id] ?? 0}
        {@const maxed = lv >= node.max}
        {@const locked = !!node.requires && !(s.constellations[node.requires] > 0)}
        {@const cost = starCost(node, lv)}
        <div class="star frame" class:lit={lv > 0} class:locked style="--c:{BRANCHES[branch].color}">
          <div class="gem"><i></i></div>
          <div class="mid">
            <div class="nm">{node.name} <span>{lv}/{node.max}</span></div>
            <div class="ef">{lv ? node.desc(lv * node.per) : '—'}{#if !maxed} <em>→ {node.desc((lv + 1) * node.per)}</em>{/if}</div>
            {#if locked}<div class="req">Requiert : {STARS.find(x => x.id === node.requires)?.name}</div>{/if}
          </div>
          {#if !maxed}
            <button class="btn" disabled={locked || cost > s.eclats} onclick={() => buy(node.id)}>{N(cost)}<img src={gfx('res/eclats_ascension')} alt="" /></button>
          {:else}<span class="max">Max</span>{/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .body { flex: 1; padding: 8px; background-size: cover; background-position: center; display: flex; flex-direction: column; gap: 8px; }
  .locked { text-align: center; padding: 16px; color: var(--text-2); }
  .locked img { height: 110px; }
  .locked p { font-size: 16px; font-style: italic; }
  .asc { padding: 10px; text-align: center; }
  .gain { display: inline-flex; align-items: center; gap: 6px; font-size: 34px; font-weight: 700; color: #f08b80; margin: 2px 0; }
  .gain img { width: 34px; height: 34px; }
  .small { font-size: 11.5px; color: var(--text-3); }
  .go { width: 100%; margin: 8px 0 6px; padding: 11px; font-size: 16px; }
  .kv { display: flex; justify-content: center; gap: 14px; margin-top: 6px; font-size: 12px; color: var(--text-3); }
  .kv b { color: var(--text); }
  .tabs { display: flex; gap: 3px; overflow-x: auto; }
  .tabs button { flex: none; padding: 6px 9px; font-size: 12px; font-weight: 700; color: var(--text-3); background: var(--stone-2); border: 2px solid var(--ink-0); }
  .tabs button.on { color: var(--ink-0); background: var(--c); }
  .stars { display: flex; flex-direction: column; gap: 5px; }
  .star { display: flex; align-items: center; gap: 9px; padding: 7px 8px; }
  .star.locked { opacity: .5; }
  .gem { width: 22px; height: 22px; display: grid; place-items: center; flex: none; }
  .gem i { width: 10px; height: 10px; background: var(--stone-4); transform: rotate(45deg); box-shadow: 0 0 0 2px var(--ink-0); }
  .star.lit .gem i { background: var(--c); box-shadow: 0 0 0 2px var(--ink-0), 0 0 0 4px color-mix(in srgb, var(--c) 35%, transparent); animation: tw 1.6s steps(2) infinite; }
  @keyframes tw { 50% { transform: rotate(45deg) scale(.8); } }
  .mid { flex: 1; min-width: 0; }
  .nm { font-weight: 700; font-size: 14px; }
  .nm span { color: var(--text-3); font-size: 12px; font-weight: 500; }
  .ef { font-size: 12.5px; color: var(--text-2); }
  .ef em { font-style: normal; color: var(--moss); }
  .req { font-size: 11px; color: var(--blood); }
  .star .btn { font-size: 13px; padding: 6px 8px; gap: 3px; }
  .star .btn img { width: 16px; height: 16px; }
  .max { font-size: 12px; color: var(--gold); font-weight: 700; text-transform: uppercase; }
  .advice { margin: 4px 0; padding: 4px 6px; font-size: 12px; color: var(--text-2); background: var(--stone-2); }
  .advice b { color: var(--text); }
  .advice.good { background: #2c3a24; box-shadow: inset 2px 0 0 var(--moss); }
  .advice.good b { color: var(--moss); }
</style>

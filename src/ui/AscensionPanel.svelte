<script lang="ts">
  import { G, ui, act } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { STARS, BRANCHES, starCost, type Branch } from '../game/data/constellations';
  import { eclatsFor } from '../game/formulas';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp } from '../lib/audio';

  const s = $derived(G.s);
  const N = (x: number) => fmt(x, s.settings.notation);
  const gain = $derived(E.ascensionGain(s));
  const nextAt = $derived.by(() => { let f = s.run.maxFloor + 1; const g = eclatsFor(s.run.maxFloor); while (eclatsFor(f) <= g && f < s.run.maxFloor + 50) f++; return f; });
  const branches = Object.keys(BRANCHES) as Branch[];
  let branch = $state<Branch>('glaive');
  function buy(id: string) { if (act(g => E.buyStar(g, id))) sfxUp(); }
</script>

<div class="scroll body" style="background-image: linear-gradient(rgba(19,14,36,.82), rgba(19,14,36,.95)), url({gfx('bg/skill')})">
  {#if !s.ascensionUnlocked}
    <div class="locked">
      <img class="px" src={gfx('portraits/lysandra')} alt="" />
      <p class="title">L’Ascension</p>
      <p>« Un jour, cette vie atteindra ses limites. Ce jour-là, je t’apprendrai à renaître. »</p>
      <p class="hint">Se débloque pendant l’Acte II (étage 50).</p>
    </div>
  {:else}
    <div class="asc">
      <div class="gain">
        <span>Ascensionner maintenant</span>
        <b class="num">+{N(gain)} <img class="px" src={gfx('res/eclats_ascension')} alt="" /></b>
        <small>Étage max de cette vie : {s.run.maxFloor} · prochain Éclat à l’étage {nextAt}</small>
      </div>
      <button class="btn violet big" disabled={!E.canAscend(s)} onclick={() => (ui.classPicker = 'ascension')}>
        {E.canAscend(s) ? 'Ascension' : 'Atteindre l’étage 30'}
      </button>
      <p class="warn">Vous perdez : étage, or, niveaux du héros et des compagnons. Vous gardez : Éclats, Légende, Constellations, Maîtrises.</p>
      <div class="leg"><span>Légende</span><b class="num">{N(s.legende)}</b><span>Ascensions</span><b class="num">{s.ascensions}</b><span>Éclats</span><b class="num">{N(s.eclats)}</b></div>
    </div>

    <div class="title sub">Constellations</div>
    <div class="tabs">
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
        <div class="star" class:lit={lv > 0} class:locked style="--c:{BRANCHES[branch].color}">
          <div class="dot">✦</div>
          <div class="mid">
            <div class="nm">{node.name} <span class="num">{lv}/{node.max}</span></div>
            <div class="ef">{lv ? node.desc(lv * node.per) : '—'}{#if !maxed} → <b>{node.desc((lv + 1) * node.per)}</b>{/if}</div>
            {#if locked}<div class="req">Requiert : {STARS.find(x => x.id === node.requires)?.name}</div>{/if}
          </div>
          {#if !maxed}
            <button class="btn" disabled={locked || cost > s.eclats} onclick={() => buy(node.id)}><span class="num">{N(cost)}</span></button>
          {:else}<span class="max">MAX</span>{/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .body { flex: 1; padding: 12px; background-size: cover; background-position: center; }
  .locked { text-align: center; padding: 20px 10px; color: var(--ink-2); }
  .locked img { height: 110px; }
  .locked .title { font-size: 20px; color: var(--gold); margin: 6px 0; }
  .hint { color: var(--ink-3); font-size: 12px; }
  .asc { background: rgba(26,19,48,.85); border-radius: 16px; padding: 14px; box-shadow: inset 0 0 0 1px var(--line), 0 0 30px -10px var(--violet); text-align: center; }
  .gain span { font-size: 12px; color: var(--ink-3); display: block; }
  .gain b { font-size: 32px; color: #ff9a9a; display: inline-flex; align-items: center; gap: 6px; text-shadow: 0 0 18px rgba(255,90,110,.6); }
  .gain b img { width: 30px; height: 30px; }
  .gain small { display: block; font-size: 11px; color: var(--ink-3); }
  .big { margin: 10px 0 6px; width: 100%; padding: 12px; font-size: 17px; font-family: var(--font-title); }
  .warn { font-size: 11px; color: var(--ink-3); margin: 4px 0 8px; }
  .leg { display: grid; grid-template-columns: auto auto auto auto auto auto; gap: 2px 6px; justify-content: center; align-items: baseline; font-size: 11px; color: var(--ink-3); }
  .leg b { color: var(--ink); font-size: 14px; margin-right: 8px; }
  .sub { margin: 16px 0 8px; font-size: 14px; color: var(--ink-2); }
  .tabs { display: flex; gap: 4px; overflow-x: auto; padding-bottom: 6px; }
  .tabs button { flex: none; padding: 6px 10px; border-radius: 99px; font-size: 12px; font-weight: 700; color: var(--ink-3); background: var(--panel); }
  .tabs button.on { color: #120d22; background: var(--c); }
  .stars { display: flex; flex-direction: column; gap: 6px; }
  .star { display: flex; align-items: center; gap: 10px; background: rgba(26,19,48,.85); border-radius: 12px; padding: 8px 10px; box-shadow: inset 0 0 0 1px var(--line); }
  .star.locked { opacity: .55; }
  .dot { font-size: 22px; color: #4a3d70; width: 26px; text-align: center; }
  .star.lit .dot { color: var(--c); text-shadow: 0 0 10px var(--c), 0 0 22px var(--c); animation: twinkle 2s infinite alternate; }
  @keyframes twinkle { to { opacity: .7; transform: scale(.9); } }
  .mid { flex: 1; min-width: 0; }
  .nm { font-weight: 700; font-size: 14px; }
  .nm span { color: var(--ink-3); font-size: 12px; }
  .ef { font-size: 12px; color: var(--ink-2); }
  .ef b { color: var(--green); font-weight: 600; }
  .req { font-size: 11px; color: var(--red); }
  .max { font-size: 12px; color: var(--gold); font-weight: 700; }
</style>

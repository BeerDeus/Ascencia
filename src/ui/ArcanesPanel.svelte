<script lang="ts">
  import { G, act } from '../lib/game.svelte';
  import * as Ar from '../game/arcanes';
  import { ARCANES, ARCANE_BY_ID, EFFECTS, FAMILIES, FAMILY_BONUS, type Family } from '../game/data/arcanes';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp, sfxAscend } from '../lib/audio';

  const s = $derived(G.s);
  const N = (x: number) => fmt(x, s.settings.notation);
  const cost = $derived(Ar.drawCost(s));
  const complete = $derived(Ar.completeFamilies(s));
  let selId = $state<string | null>(null);
  let reveal = $state<string | null>(null);
  const sel = $derived(selId ? ARCANE_BY_ID[selId] : null);
  const fams = Object.keys(FAMILIES) as Family[];

  function draw() {
    const id = act(g => Ar.draw(g, Math.random));
    if (id) { sfxAscend(); reveal = id; }
  }
  function up(id: string) { if (act(g => Ar.upgradeArcane(g, id))) sfxUp(); }
</script>

<div class="scroll body">
  <div class="top frame">
    <div>
      <div class="gothic h">Arcanes</div>
      <div class="label">{Ar.owned(s)} / {ARCANES.length} cartes · familles complètes : {complete.length} (×{(1 + FAMILY_BONUS * complete.length).toFixed(1)} dégâts)</div>
    </div>
    <button class="btn" disabled={Ar.owned(s) >= ARCANES.length || cost > s.eclats} onclick={draw}>
      Piocher · {N(cost)}<img src={gfx('res/eclats_ascension')} alt="" />
    </button>
  </div>

  {#each fams as f}
    {@const cards = ARCANES.filter(a => a.family === f)}
    <div class="fam" style="--c:{FAMILIES[f].color}">
      <div class="fh"><span>{FAMILIES[f].name}</span>{#if complete.includes(f)}<em>complète ✓</em>{/if}</div>
      <div class="grid">
        {#each cards as a (a.id)}
          {@const lv = s.arcanes[a.id] ?? 0}
          <button class="card" class:own={lv > 0} class:sel={selId === a.id} onclick={() => (selId = lv ? a.id : null)}>
            {#if lv}<img src={gfx('cards/' + a.id)} alt={a.name} /><b class="outline">{lv}</b>{:else}<span class="back"></span>{/if}
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>

{#if sel}
  {@const lv = s.arcanes[sel.id] ?? 0}
  {@const eff = EFFECTS[sel.effect]}
  {@const maxed = Ar.isMaxed(s, sel.id)}
  <div class="sheet frame">
    <button class="x" onclick={() => (selId = null)} aria-label="Fermer">✕</button>
    <div class="sh">
      <img src={gfx('cards/' + sel.id)} alt="" />
      <div>
        <div class="nm" style="color:{FAMILIES[sel.family].color}">{sel.name} <span>niv. {lv}{eff.max < 9999 ? '/' + eff.max : ''}</span></div>
        <div class="q book">« {sel.quote} »</div>
        <div class="ef">{eff.fmt(Math.min(lv, eff.max) * eff.per)}{#if !maxed} <em>→ {eff.fmt((lv + 1) * eff.per)}</em>{/if}</div>
      </div>
    </div>
    {#if !maxed}<button class="btn" disabled={Ar.upgradeCost(s, sel.id) > s.eclats} onclick={() => up(sel.id)}>Améliorer · {N(Ar.upgradeCost(s, sel.id))}<img src={gfx('res/eclats_ascension')} alt="" /></button>
    {:else}<span class="label">Niveau maximal</span>{/if}
  </div>
{/if}

{#if reveal}
  {@const a = ARCANE_BY_ID[reveal]}
  <div class="veil" onclick={() => (reveal = null)} onkeydown={() => (reveal = null)} role="button" tabindex="0">
    <div class="flip"><img src={gfx('cards/' + a.id)} alt="" /></div>
    <div class="gothic rn" style="color:{FAMILIES[a.family].color}">{a.name}</div>
    <div class="book rq">« {a.quote} »</div>
    <div class="re">{EFFECTS[a.effect].fmt(EFFECTS[a.effect].per)}</div>
    <div class="label">Touchez pour continuer</div>
  </div>
{/if}

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 8px; }
  .top { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px; }
  .h { font-size: 30px; line-height: .9; color: var(--parch); }
  .top .btn { gap: 3px; font-size: 13px; flex: none; }
  .btn img { width: 16px; height: 16px; }
  .fh { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: var(--c); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 3px; }
  .fh em { font-style: normal; color: var(--moss); }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(56px, 1fr)); gap: 5px; }
  .card { position: relative; aspect-ratio: 1; display: grid; place-items: center; background: var(--stone-2); border: 2px solid var(--ink-0); box-shadow: inset 0 0 0 2px var(--stone-3); }
  .card.own { box-shadow: inset 0 0 0 2px var(--c); }
  .card.sel { outline: 2px solid var(--gold-hi); outline-offset: -2px; }
  .card img { width: 88%; height: 88%; object-fit: contain; }
  .card b { position: absolute; right: 3px; bottom: 1px; font-size: 12px; color: var(--gold); }
  .back { width: 60%; height: 70%; background: repeating-linear-gradient(45deg, #2a2333 0 4px, #332a3e 4px 8px); border: 2px solid #4a4054; }
  .sheet { position: absolute; left: 6px; right: 6px; bottom: 6px; z-index: 5; padding: 10px; background: var(--stone-2); display: flex; flex-direction: column; gap: 8px; animation: up .18s steps(3); }
  @keyframes up { from { transform: translateY(30px); opacity: 0; } }
  .x { position: absolute; right: 8px; top: 6px; color: var(--text-3); font-size: 16px; }
  .sh { display: flex; gap: 10px; }
  .sh img { width: 64px; height: 64px; }
  .nm { font-weight: 700; font-size: 16px; }
  .nm span { font-size: 12px; color: var(--text-3); font-weight: 500; }
  .q { font-style: italic; color: var(--text-2); font-size: 14px; }
  .ef { font-size: 13px; }
  .ef em { font-style: normal; color: var(--moss); }
  .sheet .btn { gap: 3px; }
  .veil { position: fixed; inset: 0; z-index: 58; background: rgba(8,6,12,.9); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 20px; text-align: center; }
  .flip { width: 150px; height: 150px; display: grid; place-items: center; background: var(--stone-2); border: 2px solid var(--ink-0); box-shadow: inset 0 0 0 3px var(--gold); animation: flip .7s steps(7); }
  .flip img { width: 130px; height: 130px; }
  @keyframes flip { 0% { transform: scaleX(0); } 50% { transform: scaleX(.1); } }
  .rn { font-size: 40px; line-height: 1; }
  .rq { font-style: italic; color: var(--text-2); font-size: 16px; }
  .re { color: var(--moss); font-size: 15px; }
</style>

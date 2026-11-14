<script lang="ts">
  import { G, ui, act, toast } from '../lib/game.svelte';
  import * as Gd from '../game/garden';
  import * as E from '../game/engine';
  import { PLANTS, PLANT_BY_ID, SEASONS, MUTATIONS, YGGDRASIL_HINT, plantSprite } from '../game/data/garden';
  import { fmt, fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp, sfxGold } from '../lib/audio';
  import JobBar from './JobBar.svelte';

  const s = $derived(G.s);
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => { now = Date.now(); act(Gd.gardenTick); }, 2000); return () => clearInterval(t); });
  const n = $derived(Gd.gridSize(s));
  const cells = $derived(Array.from({ length: n * n }, (_, k) => (k % n) + Math.floor(k / n) * 6));
  const sea = $derived(SEASONS[Gd.season(now)]);
  let sel = $state<number | null>(null);
  let herbier = $state(false);
  const plot = $derived(sel !== null ? s.garden.plots[sel] : null);
  const TRAIT = { geante: 'Géante ×2', doree: 'Dorée', lumineuse: 'Lumineuse ×2 XP' };

  function tap(i: number) {
    const p = s.garden.plots[i];
    if (p?.pest) { if (act(g => Gd.removePest(g, i))) { sfxUp(); toast('Nuisible chassé !', 'up'); } return; }
    if (p && Gd.mature(p) && !p.dissonantSince && p.plant !== 'yggdrasil') { doHarvest(i); return; }
    sel = i;
  }
  function doHarvest(i: number) {
    const r = act(g => E.gardenHarvest(g, i));
    if (!r) return;
    sfxGold();
    if (r.anchor) toast('La Graine-Cœur éclôt : Ancre de la Création !', 'crit');
    else toast(`+${r.qty} ${PLANT_BY_ID[r.plant].name}${r.seeds ? ` · +${r.seeds} graine${r.seeds > 1 ? 's' : ''}` : ''}${r.gems ? ` · +${r.gems} gemmes` : ''}`, 'gold');
    sel = null;
  }
  function plantIt(id: string) { if (sel !== null && act(g => Gd.plant(g, sel!, id))) { sfxUp(); sel = null; } }
  function harvestAll() { const r = act(Gd.harvestAll); if (r.length) { sfxGold(); toast(`${r.length} récolte${r.length > 1 ? 's' : ''}`, 'gold'); } }
  const timeLeft = (i: number) => {
    const p = s.garden.plots[i]!, sp = Gd.growSpeed(s, i);
    return sp ? ((1 - p.progress) * PLANT_BY_ID[p.plant].minutes * 60) / sp : Infinity;
  };
  const hintFor = (id: string) => (id === 'yggdrasil' ? YGGDRASIL_HINT : MUTATIONS.find(m => m.result === id)?.hint ?? 'Graine commune, vendue au marché.');
  const known = (id: string) => s.garden.known.includes(id);
</script>

<div class="scroll body">
  <div class="top frame">
    <img class="sea" src={gfx(sea.sprite)} alt="" />
    <div class="mi">
      <div class="gothic h" style="color:{sea.color}">{sea.name}</div>
      <span>Fin de saison dans {fmtTime(Gd.seasonEndsIn(now) / 1000)}</span>
      <span>Le combat continue en arrière-plan (dégâts automatiques).</span>
    </div>
    <div class="acts">
      <button class="btn blood" onclick={() => (ui.tab = 'chronique')}><img src={gfx('icons/combat')} alt="" />Combat</button>
      <button class="btn" onclick={harvestAll}>Tout récolter</button>
      <button class="btn stone" onclick={() => (herbier = true)}>Herbier {s.garden.known.length}/{PLANTS.length}</button>
    </div>
  </div>

  <div class="grid" style="--n:{n}">
    {#each cells as i (i)}
      {@const p = s.garden.plots[i]}
      <button class="cell" class:ripe={Gd.mature(p)} class:dis={!!p?.dissonantSince} class:sel={sel === i} onclick={() => tap(i)}>
        {#if p}
          <img class="pl" src={gfx(plantSprite(p.plant, Gd.stage(p)))} alt="" />
          {#if !Gd.mature(p)}<span class="pg"><i style="width:{p.progress * 100}%"></i></span>{/if}
          {#if p.trait}<span class="tr t-{p.trait}">★</span>{/if}
          {#if p.mutant}<span class="mu">M</span>{/if}
          {#if p.pest}<img class="pest" src={gfx(i % 2 ? 'mobs/garden_beetle' : 'mobs/garden_worm')} alt="nuisible" />{/if}
        {:else}<span class="empty">+</span>{/if}
      </button>
    {/each}
  </div>
  <p class="tip book">Deux plantes mûres voisines d’une parcelle vide peuvent y faire pousser une mutation. Touchez une plante mûre pour la récolter.</p>

  <section class="frame"><JobBar job="jardinier" /></section>

  <section class="frame">
    <div class="label">Graines communes · {fmt(Gd.seedPrice(s), s.settings.notation)} or l’unité</div>
    <div class="seeds">
      {#each Gd.commonPlants as c}
        <button class="sd slot" disabled={Gd.seedPrice(s) > s.run.gold} onclick={() => act(g => Gd.buySeed(g, c.id)) && sfxUp()}>
          <img src={gfx(plantSprite(c.id, 3))} alt="" /><b>{s.garden.seeds[c.id] ?? 0}</b><small>+1</small>
        </button>
      {/each}
    </div>
  </section>
</div>

{#if sel !== null}
  <div class="sheet frame">
    <button class="x" onclick={() => (sel = null)} aria-label="Fermer">✕</button>
    {#if !plot}
      <div class="label">Planter</div>
      <div class="pick">
        {#each PLANTS.filter(x => (s.garden.seeds[x.id] ?? 0) > 0) as x}
          <button class="sd slot" onclick={() => plantIt(x.id)}><img src={gfx(plantSprite(x.id, 3))} alt="" /><b>{s.garden.seeds[x.id]}</b><small>{x.name}</small></button>
        {/each}
        {#if !PLANTS.some(x => (s.garden.seeds[x.id] ?? 0) > 0)}<p class="tip">Aucune graine : achetez-en ci-dessous.</p>{/if}
      </div>
      {@const m = Gd.mutationFor(s, sel)}
      {#if m}<p class="tip">Mutation possible ici : <b>{known(m.result) ? PLANT_BY_ID[m.result].name : '???'}</b> ({Math.round(Math.min(0.95, m.chance) * 100)} %/h) — laissez la parcelle vide !</p>{/if}
    {:else}
      {@const d = PLANT_BY_ID[plot.plant]}
      <div class="ph">
        <img src={gfx(plantSprite(plot.plant, Gd.stage(plot)))} alt="" />
        <div class="mi"><b>{d.name}</b><span>Rang {d.tier} · saison : {SEASONS[d.season].name}{plot.trait ? ' · ' + TRAIT[plot.trait] : ''}</span>
          <span>{Gd.mature(plot) ? 'Mûre' : `Mûre dans ${fmtTime(timeLeft(sel))}`}</span>
          {#if plot.dissonantSince}<span class="dis-t">Dissonante : elle contamine ses voisines ! Récoltez-la ou soignez-la.</span>{/if}
        </div>
      </div>
      <p class="tip book">{d.desc}</p>
      <div class="row">
        {#if Gd.mature(plot)}<button class="btn" onclick={() => doHarvest(sel!)}>Récolter</button>{/if}
        {#if plot.dissonantSince}<button class="btn sky" disabled={!(s.potions.purete > 0)} onclick={() => act(g => Gd.cure(g, sel!)) && sfxUp()}>Soigner (Élixir de pureté : {s.potions.purete ?? 0})</button>{/if}
        {#if !Gd.mature(plot) && !plot.dissonantSince}<button class="btn blood" onclick={() => { s.garden.plots[sel!] = null; sel = null; }}>Arracher</button>{/if}
      </div>
    {/if}
  </div>
{/if}

{#if herbier}
  <div class="veil" onclick={() => (herbier = false)} onkeydown={() => {}} role="presentation">
    <div class="herb frame">
      <div class="gothic h">Herbier</div>
      {#each [1, 2, 3, 4] as t}
        <div class="label">Rang {t}</div>
        {#each PLANTS.filter(p => p.tier === t) as p}
          <div class="hrow" class:unknown={!known(p.id)}>
            <img src={gfx(plantSprite(p.id, 3))} alt="" />
            <div class="mi"><b>{known(p.id) ? p.name : '???'}</b><span>{known(p.id) ? p.desc : hintFor(p.id)}</span></div>
          </div>
        {/each}
      {/each}
    </div>
  </div>
{/if}

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 8px; }
  .top { display: flex; align-items: center; gap: 8px; padding: 6px 8px; }
  .sea { width: 44px; height: 44px; }
  .h { font-size: 28px; line-height: .9; }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: 12px; color: var(--text-3); }
  .mi b { font-size: 14px; color: var(--text); }
  .acts { display: flex; flex-direction: column; gap: 4px; }
  .acts .btn { font-size: 11.5px; padding: 5px 7px; gap: 3px; }
  .acts .btn img { width: 14px; height: 14px; }
  .grid { display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 4px; padding: 6px; background: #3a2a1c; border: 2px solid var(--ink-0);
    box-shadow: inset 0 0 0 2px #5a412a; }
  .cell { position: relative; aspect-ratio: 1; display: grid; place-items: center; background: #5b4029; border: 2px solid #2b1d12;
    box-shadow: inset 2px 2px 0 rgba(0,0,0,.35), inset -2px -2px 0 rgba(255,220,170,.08); }
  .cell.ripe { box-shadow: inset 0 0 0 2px var(--gold), inset 2px 2px 0 rgba(0,0,0,.35); animation: ripe 1s steps(2) infinite; }
  @keyframes ripe { 50% { box-shadow: inset 0 0 0 2px var(--gold-hi), inset 2px 2px 0 rgba(0,0,0,.35); } }
  .cell.dis { background: #4a2a52; }
  .cell.dis .pl { filter: hue-rotate(250deg) saturate(1.6); }
  .cell.sel { outline: 2px solid var(--sky); outline-offset: -2px; }
  .pl { width: 82%; height: 82%; object-fit: contain; }
  .pg { position: absolute; left: 4px; right: 4px; bottom: 3px; height: 4px; background: rgba(0,0,0,.5); }
  .pg i { display: block; height: 100%; background: var(--moss); }
  .tr { position: absolute; top: 1px; right: 3px; font-size: 11px; color: var(--gold); }
  .t-lumineuse { color: var(--sky); } .t-geante { color: var(--moss); }
  .mu { position: absolute; top: 1px; left: 3px; font-size: 10px; color: #c59bff; font-weight: 700; }
  .pest { position: absolute; width: 50%; height: 50%; right: 0; bottom: 6px; animation: wig .3s steps(2) infinite; }
  @keyframes wig { 50% { transform: translateX(-2px); } }
  .empty { font-size: 18px; color: rgba(255,220,170,.25); }
  .tip { margin: 0; font-size: 12.5px; color: var(--text-3); }
  section { padding: 8px; }
  .seeds, .pick { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; margin-top: 4px; }
  .sd { position: relative; display: flex; flex-direction: column; align-items: center; padding: 3px 0; background: var(--stone-2); }
  .sd img { width: 34px; height: 34px; object-fit: contain; }
  .sd b { font-size: 13px; }
  .sd small { font-size: 9.5px; color: var(--text-3); text-align: center; line-height: 1.1; }
  .sheet { position: absolute; left: 6px; right: 6px; bottom: 6px; z-index: 5; padding: 10px; background: var(--stone-2); display: flex; flex-direction: column; gap: 6px; animation: up .18s steps(3); }
  @keyframes up { from { transform: translateY(30px); opacity: 0; } }
  .x { position: absolute; right: 8px; top: 6px; color: var(--text-3); font-size: 16px; }
  .ph { display: flex; gap: 10px; align-items: center; }
  .ph img { width: 56px; height: 56px; object-fit: contain; }
  .dis-t { color: #c59bff; }
  .row { display: flex; gap: 6px; flex-wrap: wrap; }
  .row .btn { font-size: 12.5px; }
  .veil { position: fixed; inset: 0; z-index: 40; background: rgba(8,6,12,.8); display: grid; place-items: center; padding: 12px; }
  .herb { width: 100%; max-width: 440px; max-height: 86dvh; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 4px; }
  .hrow { display: flex; gap: 8px; align-items: center; padding: 3px 0; border-bottom: 1px solid var(--stone-3); }
  .hrow img { width: 36px; height: 36px; object-fit: contain; }
  .hrow.unknown img { filter: brightness(0) opacity(.45); }
  .hrow .mi span { font-style: italic; }
</style>

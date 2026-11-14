<script lang="ts">
  import { G, ui, act, toast } from '../lib/game.svelte';
  import * as Gd from '../game/garden';
  import * as E from '../game/engine';
  import { PLANTS, PLANT_BY_ID, SEASONS, MUTATIONS, YGGDRASIL_HINT, plantSprite } from '../game/data/garden';
  import { fmt, fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp, sfxGold } from '../lib/audio';
  import JobBar from './JobBar.svelte';
  import { longpress } from '../lib/guard';
  import { level } from '../game/jobs';

  const s = $derived(G.s);
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => { now = Date.now(); act(Gd.gardenTick); }, 2000); return () => clearInterval(t); });
  const n = $derived(Gd.gridSize(s));
  const cells = $derived(Array.from({ length: n * n }, (_, k) => (k % n) + Math.floor(k / n) * 6));
  const sea = $derived(SEASONS[Gd.season(now)]);
  const seasonLeft = $derived.by(() => { const t = Gd.seasonEndsIn(now) / 1000, d = Math.floor(t / 86400), h = Math.floor((t % 86400) / 3600); return d ? `${d} j ${h} h` : fmtTime(t); });
  let sel = $state<number | null>(null);           // fiche d'une parcelle (appui long)
  let mode = $state<'planter' | 'acheter'>('planter');
  let seed = $state<string | null>(null);          // graine sélectionnée
  let seedInfo = $state<string | null>(null);      // fiche d'une graine (appui long)
  const jl = $derived(level(s, 'jardinier'));
  const owned = $derived(PLANTS.filter(x => x.id !== 'yggdrasil' && (x.tier === 1 || (s.garden.seeds[x.id] ?? 0) > 0)));
  $effect(() => { if (!seed || !(s.garden.seeds[seed] > 0)) { const f = owned.find(x => (s.garden.seeds[x.id] ?? 0) > 0); if (f && !seed) seed = f.id; } });
  let herbier = $state(false);
  const plot = $derived(sel !== null ? s.garden.plots[sel] : null);
  const TRAIT = { geante: 'Géante ×2', doree: 'Dorée', lumineuse: 'Lumineuse ×2 XP' };

  function tap(i: number) {
    const p = s.garden.plots[i];
    if (p?.pest) { if (act(g => Gd.removePest(g, i))) { sfxUp(); toast('Nuisible chassé !', 'up'); } return; }
    if (p) { if (Gd.mature(p) && !p.dissonantSince && p.plant !== 'yggdrasil') doHarvest(i); return; }
    if (!seed) { toast('Choisissez d’abord une graine ci-dessous', 'info'); return; }
    if (!(s.garden.seeds[seed] > 0)) { toast(`Plus de graines : ${PLANT_BY_ID[seed].name}${PLANT_BY_ID[seed].tier === 1 ? ' (mode Acheter)' : ''}`, 'info'); return; }
    if (act(g => Gd.plant(g, i, seed!))) sfxUp();
  }
  function seedTap(id: string) {
    if (mode === 'acheter') {
      if (PLANT_BY_ID[id].tier !== 1) { toast('Seules les graines communes s’achètent', 'info'); return; }
      if (act(g => Gd.buySeed(g, id))) sfxUp(); else toast('Pas assez d’or', 'info');
      return;
    }
    seed = id;
  }
  // ---- infos selon le niveau de Jardinier
  const growMin = (id: string) => PLANT_BY_ID[id].minutes / (Gd.seasonMult(s, id) * (1 + jl * 0.005));
  const yieldRange = (id: string) => { const b = 1 + (PLANT_BY_ID[id].season === Gd.season(now) ? 1 : 0) + Math.floor(jl / 25); return `${b} à ${b + 1}`; };
  const crosses = (id: string) => MUTATIONS.filter(m => m.a === id || m.b === id);
  function doHarvest(i: number) {
    const r = act(g => E.gardenHarvest(g, i));
    if (!r) return;
    sfxGold();
    if (r.anchor) toast('La Graine-Cœur éclôt : Ancre de la Création !', 'crit');
    else toast(`+${r.qty} ${PLANT_BY_ID[r.plant].name}${r.seeds ? ` · +${r.seeds} graine${r.seeds > 1 ? 's' : ''}` : ''}${r.gems ? ` · +${r.gems} gemmes` : ''}`, 'gold');
    sel = null;
  }
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
      <span>encore {seasonLeft}</span>
    </div>
    <div class="acts">
      <button class="btn" onclick={harvestAll}>Récolter</button>
      <button class="btn stone" onclick={() => (herbier = true)}>Herbier<small>{s.garden.known.length}/{PLANTS.length}</small></button>
      <button class="btn blood" onclick={() => (ui.tab = 'compagnons')} aria-label="Retour au combat"><img src={gfx('icons/combat')} alt="" /></button>
    </div>
  </div>

  <div class="grid" style="--n:{n}">
    {#each cells as i (i)}
      {@const p = s.garden.plots[i]}
      <button class="cell" class:ripe={Gd.mature(p)} class:dis={!!p?.dissonantSince} class:sel={sel === i} onclick={() => tap(i)} use:longpress={() => (sel = i)}>
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
  <section class="frame tools">
    <div class="switch" role="tablist">
      <button class:on={mode === 'planter'} onclick={() => (mode = 'planter')}><img src={gfx('res/plante_sauvage')} alt="" />Planter</button>
      <button class:on={mode === 'acheter'} onclick={() => (mode = 'acheter')}><img src={gfx('obj/bourse_or')} alt="" />Acheter</button>
    </div>
    <div class="hint">
      {#if mode === 'planter'}
        {seed ? `Touchez une case vide pour planter : ${PLANT_BY_ID[seed].name}` : 'Choisissez une graine'} · appui long = infos
      {:else}
        Touchez une graine commune pour l’acheter · <b class="price">{fmt(Gd.seedPrice(s), s.settings.notation)} or</b> l’unité
      {/if}
    </div>
    <div class="seeds">
      {#each (mode === 'acheter' ? Gd.commonPlants : owned) as c (c.id)}
        {@const nb = s.garden.seeds[c.id] ?? 0}
        <button class="sd slot" class:picked={mode === 'planter' && seed === c.id} class:none={mode === 'planter' && !nb}
          class:poor={mode === 'acheter' && Gd.seedPrice(s) > s.run.gold} onclick={() => seedTap(c.id)} use:longpress={() => (seedInfo = c.id)}>
          <img src={gfx(plantSprite(c.id, 3))} alt="" /><b>{nb}</b><small>{mode === 'acheter' ? '+1' : c.name}</small>
        </button>
      {/each}
    </div>
  </section>
  <p class="tip book">Deux plantes mûres voisines d’une case vide peuvent y faire naître une mutation : laissez-lui de la place !</p>

  <section class="frame"><JobBar job="jardinier" /></section>
</div>

{#if seedInfo}
  {@const d = PLANT_BY_ID[seedInfo]}
  <div class="veil" role="presentation">
    <div class="herb frame info">
      <div class="ph">
        <img src={gfx(plantSprite(d.id, 3))} alt="" />
        <div class="mi"><b>{known(d.id) ? d.name : '???'}</b><span>Rang {d.tier} · {s.garden.seeds[d.id] ?? 0} graine(s)</span></div>
      </div>
      <p class="tip book">{known(d.id) ? d.desc : hintFor(d.id)}</p>
      <div class="facts">
        <div><span>Temps de pousse</span><b>{fmtTime(growMin(d.id) * 60)}</b></div>
        {#if jl >= 10}<div><span>Saison préférée</span><b style="color:{SEASONS[d.season].color}">{SEASONS[d.season].name}</b></div>{/if}
        {#if jl >= 20}<div><span>Récolte attendue</span><b>{yieldRange(d.id)} · {d.tier * 15} XP</b></div>{/if}
        {#if d.aura}<div><span>Effet de voisinage</span><b>{d.aura === 'mutation' ? 'Mutations +50 %' : 'Pousse +25 %'}</b></div>{/if}
      </div>
      {#if jl >= 30}
        {#if crosses(d.id).length}
          <div class="label">Croisements</div>
          {#each crosses(d.id) as m}
            {@const other = m.a === d.id ? m.b : m.a}
            <div class="cross"><span>+ {known(other) ? PLANT_BY_ID[other].name : '???'}</span><b>→ {known(m.result) ? PLANT_BY_ID[m.result].name : '???'}</b></div>
          {/each}
        {/if}
      {/if}
      {#if jl < 30}<p class="lock">Plus d’infos aux niveaux {[10, 20, 30].filter(x => x > jl).join(', ')} de Jardinier.</p>{/if}
      <button class="btn" onclick={() => (seedInfo = null)}>Fermer</button>
    </div>
  </div>
{/if}

{#if sel !== null}
  <div class="sheet frame">
    <button class="x" onclick={() => (sel = null)} aria-label="Fermer">✕</button>
    {#if !plot}
      <div class="label">Case vide</div>
      {@const m = Gd.mutationFor(s, sel)}
      {#if m}<p class="tip">Mutation possible ici : <b>{known(m.result) ? PLANT_BY_ID[m.result].name : '???'}</b>{#if jl >= 30} ({Math.round(Math.min(0.95, m.chance) * 100)} %/h){/if} — laissez-la vide !</p>
      {:else}<p class="tip">Aucune mutation possible ici pour l’instant. Il faut deux plantes mûres voisines.</p>{/if}
    {:else}
      {@const d = PLANT_BY_ID[plot.plant]}
      <div class="ph">
        <img src={gfx(plantSprite(plot.plant, Gd.stage(plot)))} alt="" />
        <div class="mi"><b>{d.name}</b><span>Rang {d.tier} · saison : {SEASONS[d.season].name}{plot.trait ? ' · ' + TRAIT[plot.trait] : ''}</span>
          <span>{Gd.mature(plot) ? 'Mûre' : `Mûre dans ${fmtTime(timeLeft(sel))}`}{#if jl >= 10 && !Gd.mature(plot)} · vitesse ×{Gd.growSpeed(s, sel).toFixed(2)}{/if}</span>
          {#if jl >= 20}<span>Récolte attendue : {yieldRange(plot.plant)}{plot.trait === 'geante' ? ' (×2)' : ''} · {d.tier * 15 * (plot.trait === 'lumineuse' ? 2 : 1)} XP</span>{/if}
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
  .body { flex: 1; padding: 6px 8px; display: flex; flex-direction: column; gap: 6px; }
  .top { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 6px; padding: 4px 6px; }
  .top .mi { min-width: 120px; }
  .sea { width: 30px; height: 30px; }
  .h { font-size: 24px; line-height: .9; }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: 12px; color: var(--text-3); }
  .mi b { font-size: 14px; color: var(--text); }
  .acts { display: flex; gap: 4px; flex: none; }
  .acts .btn { font-size: 11.5px; padding: 6px 7px; gap: 3px; }
  .acts .btn img { width: 16px; height: 16px; }
  .acts .btn small { font-size: 10px; opacity: .8; }
  .top .mi span { white-space: nowrap; }
  /* la grille garde de la place pour les graines sous elle, même sur petit écran */
  .grid { width: min(100%, max(230px, calc(100dvh - 400px))); margin: 0 auto; display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 4px; padding: 6px; background: #3a2a1c; border: 2px solid var(--ink-0);
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
  .tools { display: flex; flex-direction: column; gap: 6px; }
  .switch { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; padding: 2px; background: var(--ink-0); }
  .switch button { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 7px; font-weight: 700; font-size: 14px; color: var(--text-3); background: var(--stone-1); }
  .switch button img { width: 20px; height: 20px; filter: grayscale(1) brightness(.6); }
  .switch button.on { color: var(--parch-ink); background: var(--gold); box-shadow: inset 0 2px 0 var(--gold-hi); }
  .switch button.on img { filter: none; }
  .hint { font-size: 12px; color: var(--text-3); min-height: 15px; }
  .price { color: var(--gold); }
  .sd.picked { box-shadow: 0 0 0 2px var(--gold), 0 0 10px rgba(230,182,74,.6); background: #3d3423; }
  .sd.none img { filter: grayscale(1) brightness(.55); }
  .sd.poor { opacity: .5; }
  .info { gap: 6px; }
  .facts { display: flex; flex-direction: column; gap: 2px; }
  .facts div, .cross { display: flex; justify-content: space-between; gap: 8px; padding: 4px 6px; font-size: 13px; background: var(--stone-2); }
  .facts b, .cross b { color: var(--gold); }
  .lock { margin: 0; font-size: 12px; color: var(--ember); }
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

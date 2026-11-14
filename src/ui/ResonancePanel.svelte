<script lang="ts">
  import { G, ui, act, toast, persist } from '../lib/game.svelte';
  import * as Rz from '../game/resonance';
  import * as E from '../game/engine';
  import { HUNTS, COMPASS_FLOORS, SEED_HOURS, SYMPHONY, symCost } from '../game/data/resonance';
  import { T } from '../game/tuning';
  const SEED_COST_METAL = T.seedMetal;
  import { GEM_ICON } from '../game/data/shop';
  import { fmt, fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp, sfxAscend } from '../lib/audio';

  const s = $derived(G.s);
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 1000); return () => clearInterval(t); });
  const seedLeft = $derived(Math.max(0, (Rz.seedReadyAt(s) - now) / 1000));
  const hunting = $derived(!!s.run.monster.hunt);
  let confirm = $state(false);

  function hunt(id: string) { if (act(g => E.startHunt(g, id))) { ui.tab = 'chronique'; toast('La chasse commence !', 'crit'); } }
  function resonate() {
    const gain = act(g => E.resonate(g));
    if (gain) { sfxAscend(); ui.ritual = gain; setTimeout(() => (ui.ritual = 0), 2800); confirm = false; persist(); }
  }
</script>

<div class="scroll body" style="background-image: linear-gradient(rgba(22,19,28,.88), rgba(22,19,28,.95)), url({gfx('bg/skill')})">
  <section class="frame">
    <div class="gothic h">Les trois Ancres</div>
    <p class="book intro">« Pour entrer dans le Noyau, tu dois devenir la clé. » — Lysandra</p>

    <div class="anchor" class:ok={Rz.creationDone(s)}>
      <img src={gfx('res/plante_sauvage')} alt="" />
      <div class="mi"><b>Création · la Graine-Cœur d’Yggdrasil</b>
        {#if Rz.creationDone(s)}<span>Ancrée ✓</span>
        {:else if !s.anchors.seedPlanted}<span>Planter coûte {SEED_COST_METAL} métal, puis {SEED_HOURS} h de croissance réelle (même hors-ligne).</span>
        {:else}<div class="bar"><i style="width:{Rz.seedProgress(s) * 100}%"></i></div><span>{seedLeft > 0 ? 'Éclosion dans ' + fmtTime(seedLeft) : 'Prête à éclore !'}</span>{/if}
      </div>
      {#if !Rz.creationDone(s)}
        {#if !s.anchors.seedPlanted}<button class="btn" disabled={s.metal < SEED_COST_METAL} onclick={() => act(Rz.plantSeed) && sfxUp()}>Planter<img src={gfx('res/metal')} alt="" /></button>
        {:else if seedLeft > 0}<button class="btn sky" disabled={Rz.seedSkipCost(s) > s.gems} onclick={() => act(Rz.skipSeed) && sfxUp()}>Hâter <img src={gfx(GEM_ICON)} alt="" />{Rz.seedSkipCost(s)}</button>
        {:else}<button class="btn" onclick={() => act(E.harvestSeed) && sfxUp()}>Récolter</button>{/if}
      {/if}
    </div>

    <div class="anchor" class:ok={Rz.chaosDone(s)}>
      <img src={gfx('portraits/chasseuse')} alt="" />
      <div class="mi"><b>Chaos · les Bêtes Primordiales</b><span>{HUNTS.filter(h => s.anchors.hunts[h.id]).length}/3 traquées</span></div>
    </div>
    {#if !Rz.chaosDone(s)}
      <div class="hunts">
        {#each HUNTS as h}
          <div class="hunt slot" class:done={s.anchors.hunts[h.id]}>
            <img src={gfx(h.sprite)} alt="" style="filter:{h.tint}" />
            <b>{h.name}</b>
            <small>Puissance ~ étage {h.floor}</small>
            {#if s.anchors.hunts[h.id]}<span class="ok">✓</span>
            {:else}<button class="btn blood" disabled={hunting} onclick={() => hunt(h.id)}>Traquer</button>{/if}
          </div>
        {/each}
      </div>
    {/if}

    <div class="anchor" class:ok={Rz.destinyDone(s)}>
      <img src={gfx('portraits/silas')} alt="" />
      <div class="mi"><b>Destinée · le Compas Stellaire</b>
        <span>Pièces : {#each COMPASS_FLOORS as f}<em class:got={s.anchors.compass[f]}>{s.anchors.compass[f] ? '◆' : '◇'} ét. {f}</em>{/each}</span>
        <span>Les boss de ces étages portent les pièces.</span></div>
    </div>
  </section>

  <section class="frame res">
    <div class="gothic h">Résonance</div>
    {#if !Rz.resonanceUnlocked(s)}
      <p class="book intro">Réunis les trois Ancres pour accomplir l’Ascension Finale.</p>
    {:else}
      <div class="gain outline">+{Rz.fragmentsFor(s)} <small>Fragments d’Écho</small></div>
      <div class="small">Selon votre Légende ({fmt(s.legende)}). Fragments en réserve : {s.resonance.fragments} · Résonances : {s.resonance.count}</div>
      {#if !confirm}
        <button class="btn go" disabled={!Rz.canResonate(s)} onclick={() => (confirm = true)}>{Rz.canResonate(s) ? (s.resonance.count ? 'Résonner' : 'L’Ascension Finale') : 'Il faut au moins 5 Fragments'}</button>
      {:else}
        <p class="warn">Tout redémarre : Éclats, Légende, Constellations, niveaux d’Arcanes (les cartes restent), équipement (sauf Héritage). Gardés : Fragments, Symphonie, Fief, gemmes, Hauts faits, Maîtrises.</p>
        <div class="row"><button class="btn blood" onclick={resonate}>Confirmer</button><button class="btn stone" onclick={() => (confirm = false)}>Annuler</button></div>
      {/if}
    {/if}
  </section>

  {#if s.resonance.total > 0}
    <section class="frame">
      <div class="gothic h">La Symphonie</div>
      {#each SYMPHONY as n}
        {@const lv = Rz.sym(s, n.id)}
        {@const maxed = lv >= n.max}
        <div class="node">
          <div class="mi"><b>{n.name} <span>{lv}/{n.max}</span></b><span>{n.desc(lv)}{#if !maxed && n.max > 1} <em>→ {n.desc(lv + 1)}</em>{/if}</span></div>
          {#if !maxed}<button class="btn" disabled={symCost(n, lv) > s.resonance.fragments} onclick={() => act(g => Rz.buySym(g, n.id)) && sfxUp()}>{symCost(n, lv)} ✧</button>
          {:else}<span class="max">Max</span>{/if}
        </div>
      {/each}
      {#if Rz.sym(s, 'auto_achat') || Rz.sym(s, 'auto_partitions') || Rz.sym(s, 'auto_ascension')}
        <div class="label">Automatisations</div>
        {#if Rz.sym(s, 'auto_achat')}<label><span>Acheter les compagnons automatiquement</span><input type="checkbox" bind:checked={s.resonance.auto.buy} /></label>{/if}
        {#if Rz.sym(s, 'auto_partitions')}<label><span>Lancer les Partitions automatiquement</span><input type="checkbox" bind:checked={s.resonance.auto.partitions} /></label>{/if}
        {#if Rz.sym(s, 'auto_ascension')}<label><span>Ascension automatique (après 3 min sans record)</span><input type="checkbox" bind:checked={s.resonance.auto.ascend} /></label>{/if}
      {/if}
    </section>
  {/if}
</div>

<style>
  .body { flex: 1; padding: 8px; background-size: cover; display: flex; flex-direction: column; gap: 8px; }
  section { padding: 8px; display: flex; flex-direction: column; gap: 6px; }
  .h { font-size: 30px; line-height: .95; color: var(--parch); }
  .intro { margin: 0; font-style: italic; color: var(--text-2); font-size: 14.5px; }
  .anchor { display: flex; align-items: center; gap: 8px; padding: 6px; background: var(--stone-2); border: 2px solid var(--ink-0); }
  .anchor.ok { box-shadow: inset 0 0 0 2px var(--moss); }
  .anchor > img { width: 38px; height: 46px; object-fit: contain; object-position: top; flex: none; }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; font-size: 12px; color: var(--text-3); }
  .mi b { font-size: 14px; color: var(--text); }
  .mi b span { color: var(--text-3); font-size: 12px; font-weight: 500; }
  .mi em { font-style: normal; margin-right: 8px; }
  .mi em.got { color: var(--gold); }
  .mi .bar { height: 8px; }
  .mi .bar > i { background: var(--moss); }
  .anchor .btn, .node .btn { gap: 3px; font-size: 12.5px; padding: 6px 8px; flex: none; }
  .btn img { width: 16px; height: 16px; }
  .hunts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
  .hunt { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 5px 3px; text-align: center; background: var(--stone-2); }
  .hunt img { width: 54px; height: 54px; object-fit: contain; }
  .hunt b { font-size: 11px; line-height: 1.1; }
  .hunt small { font-size: 10px; color: var(--text-3); }
  .hunt .btn { font-size: 12px; padding: 5px 8px; }
  .hunt.done { opacity: .55; }
  .ok { color: var(--moss); font-size: 18px; }
  .res { text-align: center; }
  .gain { font-size: 30px; font-weight: 700; color: #b9a6ff; }
  .gain small { font-size: 13px; color: var(--text-2); }
  .small { font-size: 11.5px; color: var(--text-3); }
  .go { width: 100%; padding: 10px; font-size: 15px; }
  .warn { font-size: 12px; color: var(--text-2); margin: 0; }
  .row { display: flex; gap: 6px; justify-content: center; }
  .node { display: flex; align-items: center; gap: 8px; padding: 5px 0; border-bottom: 1px solid var(--stone-3); }
  .node .mi em { color: var(--moss); }
  .max { font-size: 12px; color: var(--gold); text-transform: uppercase; }
  label { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 13px; }
  input[type=checkbox] { width: 20px; height: 20px; accent-color: var(--gold); }
</style>

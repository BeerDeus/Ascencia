<script lang="ts">
  import { TALENTS, TALENT_TIERS, talentsOf, pendingTalent } from '../game/talents';
  import * as Co from '../game/company';
  import { G, ui, act, toast } from '../lib/game.svelte';
  import { longpress } from '../lib/guard';
  import * as E from '../game/engine';
  import { COMPANIONS, MILESTONES, CLASSES } from '../game/data/heroes';
  import { nextMilestone, frappeBase } from '../game/formulas';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import BuyMult from './BuyMult.svelte';
  import UpButton from './UpButton.svelte';
  import { sfxUp } from '../lib/audio';
  import { T } from '../game/tuning';

  const s = $derived(G.s);
  const st = $derived(E.stats(G.s));
  const N = (x: number) => fmt(x, s.settings.notation);
  // roster : compagnons déjà rejoints par l'histoire, + le prochain (verrouillé)
  const unlocked = $derived(COMPANIONS.map((_, i) => i).filter(i => E.compUnlocked(s, i)));
  const nextLocked = $derived(COMPANIONS.findIndex((_, i) => !E.compUnlocked(s, i)));
  const cls = $derived(CLASSES.find(c => c.id === s.classId));
  const count = (i: number) => ui.buyMult || Math.max(1, E.compMax(s, i));
  const hn = $derived(ui.buyMult || Math.max(1, E.heroMax(s)));
  const hcost = $derived(E.heroCostN(s, hn));
  function buyHero() { if (act(g => E.buyHero(g, hn))) sfxUp(); }
  function buy(i: number) { if (act(g => E.buyComp(g, i, count(i)))) sfxUp(); }

  const squad = $derived(Co.activeSquad(s));
  const slotMults = [T.slotLead, T.slotRight, T.slotSupport];
  // dégâts réels d'un membre (part du DPS total) ; gains estimés avec l'escouade recomposée au mieux
  const squadRaw = $derived(squad.reduce((t, i, k) => t + (i >= 0 ? E.memberRaw(s, i) * slotMults[k] : 0), 0));
  const scale = $derived(squadRaw > 0 ? st.dps / squadRaw : st.global);
  const dpsOf = (i: number) => { const k = squad.indexOf(i); return k >= 0 ? E.memberRaw(s, i) * slotMults[k] * scale : 0; };
  const gainOf = (i: number) => E.squadDeltaIf(s, i, count(i)) * scale;
  const heroGain = $derived(st.tap * (frappeBase(s.run.heroLevel + hn) / frappeBase(s.run.heroLevel) - 1) * 5);
  const best = $derived.by(() => {
    let b = -2, r = hcost > 0 ? heroGain / hcost : 0;
    if (r > 0) b = -1;
    for (const i of unlocked) { const c = E.compCostN(s, i, count(i)); const v = gainOf(i) / c; if (c > 0 && v > r) { r = v; b = i; } }
    return b;
  });

  const lvl = $derived(Co.squadLevel(s));
  const nextTier = $derived(Co.SQUAD_TIERS.find(t => t.lv > lvl));
  const prevTier = $derived([...Co.SQUAD_TIERS].reverse().find(t => t.lv <= lvl)?.lv ?? 0);
  const coh = $derived(Co.cohesion(s));
  const syn = $derived(Co.activeSynergies(s));
  const combo = $derived(Co.activeCombo(s));
  function auto() {
    if (!Co.canChangeSquad(s)) { toast('Pas pendant un combat de boss', 'info'); return; }
    act(g => Co.bestSquad(g, i => E.memberRaw(g, i), () => { const x = E.stats(g); return x.dps + x.tap * 5; })); sfxUp(); toast('Escouade composée au mieux', 'up');
  }
  const SLOT_TAG = ['♛ Meneur', 'Bras droit', 'Soutien'];
</script>

<div class="top"><span class="label">Escouade · {N(st.dps)} DPS</span><BuyMult /></div>
<div class="scroll list">
  <!-- L'escouade : 3 places -->
  <div class="squad frame" data-tuto="company">
    <div class="slots">
      {#each [0, 1, 2] as k}
        {@const i = squad[k]}
        <button class="slot-b slot" class:lead={k === 0} onclick={() => (ui.squadPick = k)} aria-label={Co.SLOTS[k]}>
          {#if i >= 0}
            <img src={gfx(COMPANIONS[i].sprite)} alt="" />
            <span class="sl-n">{COMPANIONS[i].name}</span>
            <span class="sl-l"><b class="t-{COMPANIONS[i].type}">{s.run.companions[i]}</b></span>
            <span class="sl-b">{Co.fmtStat(Co.SLOT_BONUS[i][k], Co.slotBonusValue(i, k, s.run.companions[i]))}</span>
          {:else}<span class="plus">+</span>{/if}
          <span class="sl-t">{k === 0 ? '♛ ' : ''}{Co.SLOTS[k]}</span>
        </button>
      {/each}
    </div>
    <div class="lv">
      <span>Escouade niv. <b>{lvl}</b></span>
      {#if nextTier}<div class="bar"><i style="width:{((lvl - prevTier) / (nextTier.lv - prevTier)) * 100}%"></i></div><span class="nt">{nextTier.lv} : {nextTier.label}</span>{/if}
    </div>
    <div class="chips">
      <span class="chip" class:pos={coh > 0} class:neg={coh < 0}>Cohésion {coh > 0 ? '+' : ''}{coh} · paliers ×{Co.cohesionMult(s).toFixed(2).replace('.', ',')}</span>
      {#if Co.rivalPairs(s)}<span class="chip neg">Émulation : frappe +{15 * Co.rivalPairs(s)} %</span>{/if}
      {#each syn as x}<span class="chip syn">✦ {x.name} · {x.desc}</span>{/each}
      {#if combo}<span class="chip syn">◆ {combo.name} · {combo.desc}</span>{/if}
    </div>
    <button class="auto" onclick={auto}>Composer au mieux</button>
  </div>

  <div class="c frame hero" class:best={best === -1}>
    <div class="pic slot"><img src={gfx(cls?.portrait ?? 'portraits/guerrier')} alt="" /></div>
    <div class="mid">
      <div class="nm">Frappe du héros&nbsp;<b>{s.run.heroLevel}</b>{#if best === -1}<em class="tag">Meilleur choix</em>{/if}</div>
      <div class="tt">{cls?.name} · chaque coup</div>
      <div class="dps">{N(st.tap)} par frappe <span class="gain">+{N(st.tap * (frappeBase(s.run.heroLevel + hn) / frappeBase(s.run.heroLevel) - 1))}</span></div>
    </div>
    <UpButton label={'+' + hn + ' niv.'} cost={N(hcost)} can={hcost <= s.run.gold} onclick={buyHero} tuto="hero-up" />
  </div>

  <div class="label roster">Roster · {unlocked.length}/{COMPANIONS.length}</div>
  {#each unlocked as i (i)}
    {@const c = COMPANIONS[i]}
    {@const lv = s.run.companions[i]}
    {@const n = count(i)}
    {@const cost = E.compCostN(s, i, n)}
    {@const nm = nextMilestone(lv)}
    {@const prev = [...MILESTONES].reverse().find(t => t <= lv) ?? 0}
    {@const aff = Co.affinityLevel(Co.affinityPts(s, i))}
    {@const k = squad.indexOf(i)}
    <div class="c frame" class:hired={lv > 0} class:best={best === i} class:insq={k >= 0}>
      <button class="pic slot" onclick={() => (ui.ally = i)} use:longpress={() => (ui.ally = i)} aria-label="Fiche de {c.name}">
        <img src={gfx(c.sprite)} alt="" />
        {#if aff}<span class="aff">♥{aff}</span>{/if}
      </button>
      <div class="mid">
        <div class="nm">{c.name}{#if lv}&nbsp;<b>{lv}</b>{/if}{#each talentsOf(s, i) as p, t}{#if p && lv >= TALENT_TIERS[t]}<i class="tl" title={TALENTS[t][p === 'a' ? 0 : 1].name}>★</i>{/if}{/each}{#if best === i}<em class="tag">Meilleur choix</em>{/if}</div>
        {#if pendingTalent(s, i) >= 0}<button class="talent" onclick={() => (ui.talent = i)}>★ Talent à choisir</button>
        {:else}<div class="tt">{#if k >= 0}<span class="sq">{SLOT_TAG[k]}</span>{:else if lv}<span class="bench">Banc</span>{/if} <span class="t-{c.type}">{Co.ROLE_NAME[c.type]}</span> · {c.title}</div>{/if}
        <div class="dps">{#if k >= 0}{N(dpsOf(i))} DPS{:else if lv}ne combat pas{/if} <span class="gain">{gainOf(i) > 0 ? '+' + N(gainOf(i)) : ''}</span></div>
        {#if lv && nm}<div class="ms"><div class="bar"><i style="width:{((lv - prev) / (nm - prev)) * 100}%"></i></div><span>niv. {nm} : ×{nm < 200 ? '2,5' : '3'}</span></div>{/if}
      </div>
      <UpButton label={lv ? '+' + n + ' niv.' : 'Recruter'} cost={N(cost)} can={cost <= s.run.gold} onclick={() => buy(i)} tuto={'comp-' + i} />
    </div>
  {/each}
  {#if nextLocked >= 0}
    <div class="c frame ghost"><div class="pic slot"><img src={gfx(COMPANIONS[nextLocked].sprite)} alt="" /></div><div class="mid"><div class="nm">{COMPANIONS[nextLocked].name}</div><div class="tt">Rejoint la Compagnie à l’étage {Co.COMP_UNLOCK[nextLocked]}</div></div></div>
  {/if}
  <p class="hint">Seuls les 3 de l’escouade combattent. Touchez une place pour la changer, un portrait pour la fiche.</p>
</div>

<style>
  .top { display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; }
  .list { flex: 1; padding: 0 8px 8px; display: flex; flex-direction: column; gap: 5px; }
  .squad { padding: 6px; display: flex; flex-direction: column; gap: 5px; background: #241f2c; box-shadow: inset 0 0 0 2px #4a3d5c; }
  .slots { display: grid; grid-template-columns: 1.15fr 1fr 1fr; gap: 5px; }
  .slot-b { position: relative; display: flex; flex-direction: column; align-items: center; padding: 4px 2px 3px; min-height: 96px; background: var(--stone-2); }
  .slot-b.lead { box-shadow: inset 0 0 0 2px var(--gold); background: #2f2818; }
  .slot-b img { width: 44px; height: 44px; object-fit: contain; object-position: top; }
  .plus { flex: 1; display: grid; place-items: center; font-size: 26px; color: var(--text-3); }
  .sl-n { max-width: 100%; font-size: 10.5px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sl-l { position: absolute; right: 4px; top: 2px; font-size: 11px; }
  .sl-b { max-width: 100%; font-size: 9.5px; color: var(--moss); line-height: 1.1; text-align: center; }
  .sl-t { font-size: 9.5px; color: var(--text-3); text-transform: uppercase; letter-spacing: .04em; }
  .lead .sl-t { color: var(--gold); }
  .lv { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-3); }
  .lv b { color: var(--text); }
  .lv .bar { flex: 1; height: 6px; border-width: 1px; }
  .lv .bar > i { background: var(--gold); }
  .nt { font-size: 10px; white-space: nowrap; }
  .chips { display: flex; flex-wrap: wrap; gap: 3px; }
  .chip { padding: 1px 5px; font-size: 10px; color: var(--text-2); background: var(--stone-2); border: 1px solid var(--ink-0); }
  .chip.pos { color: var(--moss); } .chip.neg { color: #e07a6f; } .chip.syn { color: var(--gold-hi); }
  .auto { align-self: flex-end; padding: 3px 8px; font-size: 11px; font-weight: 700; color: var(--text-2); background: var(--stone-3); border: 1px solid var(--ink-0); }
  .roster { margin-top: 2px; }
  .c { display: flex; align-items: center; gap: 8px; padding: 5px 6px; }
  .c.hired { background: var(--stone-2); }
  .c.insq { box-shadow: inset 2px 0 0 var(--gold); }
  .c.best { box-shadow: inset 0 0 0 2px var(--moss); }
  .pic { position: relative; width: 50px; height: 50px; flex: none; display: grid; place-items: center; overflow: hidden; color: var(--text-3); font-size: 20px; }
  .pic img { width: 46px; height: 46px; object-fit: contain; object-position: top; }
  .aff { position: absolute; right: 1px; bottom: 0; font-size: 9px; font-weight: 700; color: #f08b80; text-shadow: 1px 1px 0 #000; }
  .mid { flex: 1; min-width: 0; }
  .nm { font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nm b { color: var(--gold); }
  .tag { margin-left: 5px; padding: 0 4px; font-size: 9.5px; font-style: normal; color: var(--parch-ink); background: var(--moss); vertical-align: 2px; }
  .tt { font-size: 11px; color: var(--text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sq { color: var(--gold); font-weight: 700; }
  .bench { color: var(--text-3); font-style: italic; }
  .t-melee { color: #e3907a; } .t-distance { color: var(--moss); } .t-magie { color: var(--sky); }
  .dps { font-size: 12px; color: var(--text-2); }
  .gain { color: var(--moss); font-size: 11px; }
  .ms { display: flex; align-items: center; gap: 6px; margin-top: 2px; }
  .ms .bar { flex: 1; height: 6px; border-width: 1px; }
  .ms .bar > i { background: var(--arcane); }
  .ms span { font-size: 10px; color: var(--text-3); }
  .hero { background: #2a2333; box-shadow: inset 0 0 0 2px var(--gold-lo); }
  .hero.best { box-shadow: inset 0 0 0 2px var(--moss); }
  .ghost { opacity: .45; }
  .ghost img { filter: brightness(0) opacity(.6); }
  .tl { margin-left: 3px; font-style: normal; font-size: 11px; color: var(--gold); }
  .talent { margin: 2px 0; padding: 2px 6px; font-size: 11px; font-weight: 700; color: var(--parch-ink); background: var(--gold); border: 1px solid var(--ink-0); animation: tpulse 1s steps(2) infinite; }
  @keyframes tpulse { 50% { background: var(--gold-hi); } }
  .hint { margin: 2px 0 0; font-size: 11px; color: var(--text-3); text-align: center; }
</style>

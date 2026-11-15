<script lang="ts">
  import { TALENTS, TALENT_TIERS, talentsOf, pendingTalent, ownMult } from '../game/talents';
  import * as Co from '../game/company';
  import { G, ui, act } from '../lib/game.svelte';
  import { longpress } from '../lib/guard';
  import * as E from '../game/engine';
  import { COMPANIONS, MILESTONES, CLASSES } from '../game/data/heroes';
  import { compDps, nextMilestone, frappeBase } from '../game/formulas';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import BuyMult from './BuyMult.svelte';
  import UpButton from './UpButton.svelte';
  import { sfxUp } from '../lib/audio';
  import { T } from '../game/tuning';
  const pct = (x: number) => String(x).replace('.', ',');

  const s = $derived(G.s);
  const st = $derived(E.stats(G.s));
  const N = (x: number) => fmt(x, s.settings.notation);
  const visible = $derived(COMPANIONS.map((_, i) => i).filter(i => i === 0 || s.run.companions[i - 1] > 0 || s.run.companions[i] > 0));
  const cls = $derived(CLASSES.find(c => c.id === s.classId));
  const count = (i: number) => ui.buyMult || Math.max(1, E.compMax(s, i));
  const hn = $derived(ui.buyMult || Math.max(1, E.heroMax(s)));
  const hcost = $derived(E.heroCostN(s, hn));
  function buyHero() { if (act(g => E.buyHero(g, hn))) sfxUp(); }
  function buy(i: number) { if (act(g => E.buyComp(g, i, count(i)))) sfxUp(); }

  // Dégâts réels d'un allié : part de son « brut » (talents, affinité, meneur) dans le DPS total
  const raw = (i: number, lv: number) => compDps(i, lv) * ownMult(s, i) * Co.memberMult(s, i);
  const rawSum = $derived(s.run.companions.reduce((t, l, i) => t + raw(i, l), 0));
  const scale = $derived(rawSum > 0 ? st.dps / rawSum : st.global);
  const dpsOf = (i: number) => raw(i, s.run.companions[i]) * scale;
  const gainOf = (i: number) => (raw(i, s.run.companions[i] + count(i)) - raw(i, s.run.companions[i])) * scale;
  const heroGain = $derived(st.tap * (frappeBase(s.run.heroLevel + hn) / frappeBase(s.run.heroLevel) - 1) * 5); // ~5 frappes/s

  // Meilleur achat : le plus de dégâts gagnés par pièce d'or (parmi ce qui est abordable ou presque)
  const best = $derived.by(() => {
    let b = -2, r = 0;
    if (hcost > 0) { r = heroGain / hcost; b = -1; }
    for (const i of visible) { const c = E.compCostN(s, i, count(i)); const v = gainOf(i) / c; if (c > 0 && v > r) { r = v; b = i; } }
    return b;
  });

  const tops = $derived(Co.roleTops(s));
  const harm = $derived(Co.harmony(s));
  const leader = $derived(Co.leaderOf(s));
</script>

<div class="top"><span class="label">Compagnie · {N(st.dps)} DPS</span><BuyMult /></div>
<div class="scroll list">
  <!-- La Compagnie : meneur + harmonie des rôles -->
  <div class="company frame" data-tuto="company">
    <button class="lead" onclick={() => leader >= 0 && (ui.ally = leader)} aria-label="Meneur">
      {#if leader >= 0}<img src={gfx(COMPANIONS[leader].sprite)} alt="" /><span class="crown">♛</span>{:else}<span class="none">?</span>{/if}
    </button>
    <div class="cmid">
      <div class="crow"><b>Meneur</b><span>{leader >= 0 ? `${COMPANIONS[leader].name} · ×${pct(T.leaderMult)} · ${Co.AURA[COMPANIONS[leader].type]}` : 'Recrutez un allié'}</span></div>
      <div class="harm">
        <b>Harmonie {Math.round(harm * 100)} %</b>
        {#each Co.ROLES as r}
          <span class="role t-{r}"><i style="width:{Math.max(4, (tops[r] / Math.max(1, ...Object.values(tops))) * 100)}%"></i><em>{Co.ROLE_NAME[r]} {tops[r]}</em></span>
        {/each}
        <span class="hb">+{Math.round(harm * T.harmonyMax * 100)} %</span>
      </div>
    </div>
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

  {#each visible as i (i)}
    {@const c = COMPANIONS[i]}
    {@const lv = s.run.companions[i]}
    {@const n = count(i)}
    {@const cost = E.compCostN(s, i, n)}
    {@const nm = nextMilestone(lv)}
    {@const prev = [...MILESTONES].reverse().find(t => t <= lv) ?? 0}
    {@const aff = Co.affinityLevel(Co.affinityPts(s, i))}
    <div class="c frame" class:hired={lv > 0} class:best={best === i} class:leader={leader === i}>
      <button class="pic slot" onclick={() => (ui.ally = i)} use:longpress={() => (ui.ally = i)} aria-label="Fiche de {c.name}">
        <img src={gfx(c.sprite)} alt="" />
        {#if leader === i}<span class="crown">♛</span>{/if}
        {#if aff}<span class="aff">♥{aff}</span>{/if}
      </button>
      <div class="mid">
        <div class="nm">{c.name}{#if lv}&nbsp;<b>{lv}</b>{/if}{#each talentsOf(s, i) as p, k}{#if p && lv >= TALENT_TIERS[k]}<i class="tl" title={TALENTS[k][p === 'a' ? 0 : 1].name}>★</i>{/if}{/each}{#if best === i}<em class="tag">Meilleur choix</em>{/if}</div>
        {#if pendingTalent(s, i) >= 0}<button class="talent" onclick={() => (ui.talent = i)}>★ Talent à choisir</button>
        {:else}<div class="tt"><span class="t-{c.type}">{Co.ROLE_NAME[c.type]}</span> · {c.title}</div>{/if}
        <div class="dps">{lv ? N(dpsOf(i)) + ' DPS' : ''} <span class="gain">+{N(gainOf(i))}</span></div>
        {#if lv && nm}<div class="ms"><div class="bar"><i style="width:{((lv - prev) / (nm - prev)) * 100}%"></i></div><span>niv. {nm} : ×{nm < 200 ? '2,5' : '3'}</span></div>{/if}
      </div>
      <UpButton label={lv ? '+' + n + ' niv.' : 'Recruter'} cost={N(cost)} can={cost <= s.run.gold} onclick={() => buy(i)} tuto={'comp-' + i} />
    </div>
  {/each}
  {#if visible.length < COMPANIONS.length}
    <div class="c frame ghost"><div class="pic slot">?</div><div class="mid"><div class="nm">???</div><div class="tt">Recrutez le précédent pour le découvrir.</div></div></div>
  {/if}
  <p class="hint">Touchez un portrait : fiche, souvenirs, choix du meneur.</p>
</div>

<style>
  .top { display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; }
  .list { flex: 1; padding: 0 8px 8px; display: flex; flex-direction: column; gap: 5px; }
  .company { display: flex; align-items: center; gap: 8px; padding: 6px; background: #241f2c; box-shadow: inset 0 0 0 2px #4a3d5c; }
  .lead { position: relative; flex: none; width: 46px; height: 46px; display: grid; place-items: center; background: var(--stone-2); border: 2px solid var(--gold); }
  .lead img { width: 40px; height: 40px; object-fit: contain; object-position: top; }
  .none { color: var(--text-3); }
  .cmid { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
  .crow { display: flex; gap: 6px; align-items: baseline; font-size: 11px; color: var(--text-3); white-space: nowrap; overflow: hidden; }
  .crow b { color: var(--gold); font-size: 12px; }
  .crow span { overflow: hidden; text-overflow: ellipsis; }
  .harm { display: grid; grid-template-columns: auto 1fr 1fr 1fr auto; gap: 4px; align-items: center; font-size: 10px; }
  .harm b { font-size: 11px; color: var(--text); white-space: nowrap; }
  .role { position: relative; height: 13px; background: var(--ink-0); overflow: hidden; }
  .role i { position: absolute; left: 0; top: 0; bottom: 0; background: currentColor; opacity: .45; }
  .role em { position: relative; padding-left: 3px; font-style: normal; color: var(--text); white-space: nowrap; font-size: 9.5px; line-height: 13px; }
  .hb { color: var(--moss); font-weight: 700; }
  .c { display: flex; align-items: center; gap: 8px; padding: 5px 6px; }
  .c.hired { background: var(--stone-2); }
  .c.best { box-shadow: inset 0 0 0 2px var(--moss); }
  .c.leader .pic { box-shadow: inset 0 0 0 2px var(--gold); }
  .pic { position: relative; width: 50px; height: 50px; flex: none; display: grid; place-items: center; overflow: hidden; color: var(--text-3); font-size: 20px; }
  .pic img { width: 46px; height: 46px; object-fit: contain; object-position: top; }
  .crown { position: absolute; left: 2px; top: -1px; font-size: 13px; color: var(--gold-hi); text-shadow: 1px 1px 0 #000; }
  .aff { position: absolute; right: 1px; bottom: 0; font-size: 9px; font-weight: 700; color: #f08b80; text-shadow: 1px 1px 0 #000; }
  .mid { flex: 1; min-width: 0; }
  .nm { font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nm b { color: var(--gold); }
  .tag { margin-left: 5px; padding: 0 4px; font-size: 9.5px; font-style: normal; color: var(--parch-ink); background: var(--moss); vertical-align: 2px; }
  .tt { font-size: 11px; color: var(--text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .t-melee { color: #e3907a; } .t-distance { color: var(--moss); } .t-magie { color: var(--sky); }
  .dps { font-size: 12px; color: var(--text-2); }
  .gain { color: var(--moss); font-size: 11px; }
  .ms { display: flex; align-items: center; gap: 6px; margin-top: 2px; }
  .ms .bar { flex: 1; height: 6px; border-width: 1px; }
  .ms .bar > i { background: var(--arcane); }
  .ms span { font-size: 10px; color: var(--text-3); }
  .hero { background: #2a2333; box-shadow: inset 0 0 0 2px var(--gold-lo); }
  .hero.best { box-shadow: inset 0 0 0 2px var(--moss); }
  .ghost { opacity: .5; }
  .tl { margin-left: 3px; font-style: normal; font-size: 11px; color: var(--gold); }
  .talent { margin: 2px 0; padding: 2px 6px; font-size: 11px; font-weight: 700; color: var(--parch-ink); background: var(--gold); border: 1px solid var(--ink-0); animation: tpulse 1s steps(2) infinite; }
  @keyframes tpulse { 50% { background: var(--gold-hi); } }
  .hint { margin: 2px 0 0; font-size: 11px; color: var(--text-3); text-align: center; }
</style>

<script lang="ts">
  import { guard } from '../lib/guard';
  import { G, ui } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import * as Co from '../game/company';
  import { ownMult } from '../game/talents';
  import { COMPANIONS } from '../game/data/heroes';
  import { compDps } from '../game/formulas';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { T } from '../game/tuning';

  const s = $derived(G.s);
  const st = $derived(E.stats(G.s));
  const N = (x: number) => fmt(x, s.settings.notation);
  const x2 = (v: number) => (v >= 100 ? N(v) : v.toFixed(2).replace('.', ','));
  const SM = [T.slotLead, T.slotRight, T.slotSupport];

  // 1) membres : base → talents → affinité → place
  const members = $derived(Co.activeSquad(s).map((i, k) => {
    if (i < 0) return null;
    const l = s.run.companions[i], base = compDps(i, l), tal = ownMult(s, i), aff = Co.affinityMult(s, i);
    return { i, k, l, base, tal, aff, place: SM[k], total: base * tal * aff * SM[k] };
  }));
  const sum = $derived(members.reduce((t, m) => t + (m?.total ?? 0), 0));
  const fx = $derived(Co.effects(s));
  const meute = $derived(1 + E.star(s, 'meute_dps'));
  const comp = $derived(sum * meute * (1 + fx.squad) * (1 + fx.comp));
  const others = $derived(comp > 0 ? st.dps / comp : 1);

  // 2) bonus regroupés par effet
  const sources = $derived(Co.effectSources(s));
  const LABEL: Record<string, string> = { squad: 'Dégâts de l’escouade', comp: 'Dégâts des compagnons', frappe: 'Frappe', gold: 'Or', crit: 'Critique', critdmg: 'Dégâts critiques', volonte: 'Volonté', power: 'Partitions', regen: 'Mana', aura: 'Bonus du Meneur', support: 'Bonus du Soutien' };
  const val = (k: string, v: number) => (k === 'volonte' ? `+${v.toFixed(1).replace('.', ',')} s` : k === 'crit' ? `+${(v * 100).toFixed(1).replace('.', ',')} %` : `+${Math.round(v * 100)} %`);
  const byStat = $derived.by(() => {
    const m: Record<string, { label: string; v: number }[]> = {};
    for (const src of sources) for (const [k, v] of Object.entries(src.fx)) if (v) (m[k] ??= []).push({ label: src.label, v: v as number });
    return Object.entries(m).sort((a, b) => Object.keys(LABEL).indexOf(a[0]) - Object.keys(LABEL).indexOf(b[0]));
  });
  const lvl = $derived(Co.squadLevel(s));
  const coh = $derived(Co.cohesion(s));
</script>

<div class="veil" use:guard>
  <div class="box frame" role="dialog" aria-label="Escouade">
    <div class="gothic h">L’escouade</div>
    <div class="scroll">
      <div class="label">1 · Dégâts de chaque membre</div>
      {#each members as m}
        {#if m}
          <div class="mem">
            <img src={gfx(COMPANIONS[m.i].sprite)} alt="" />
            <div class="mi">
              <b>{m.k === 0 ? '♛ ' : ''}{Co.SLOTS[m.k]} · {COMPANIONS[m.i].name} <em>niv. {m.l}</em></b>
              <span>{N(m.base)} de base × {x2(m.tal)} talents × {x2(m.aff)} affinité × {x2(m.place)} place = <strong>{N(m.total)}</strong></span>
            </div>
          </div>
        {/if}
      {/each}
      {#if !members.some(Boolean)}<p class="note">Aucun membre : touchez une place pour composer l’escouade.</p>{/if}

      <div class="label">2 · Du total au DPS</div>
      <div class="calc">
        <div><span>Somme des membres</span><b>{N(sum)}</b></div>
        {#if meute > 1}<div><span>× Constellations (meute)</span><b>×{x2(meute)}</b></div>{/if}
        <div><span>× Dégâts de l’escouade</span><b>×{x2(1 + fx.squad)}</b></div>
        <div><span>× Dégâts des compagnons</span><b>×{x2(1 + fx.comp)}</b></div>
        <div><span>× Autres bonus <small>(Légende, Arcanes, équipement, métiers… voir Héros)</small></span><b>×{x2(others)}</b></div>
        <div class="tot"><span>= DPS de l’escouade</span><b>{N(st.dps)}</b></div>
      </div>

      <div class="label">3 · D’où viennent les bonus</div>
      {#each byStat as [k, list]}
        <div class="stat">
          <div class="sh"><b>{LABEL[k] ?? k}</b><em>{val(k, list.reduce((t, x) => t + x.v, 0))}</em></div>
          {#each list as x}<div class="src"><span>{x.label}</span><span>{val(k, x.v)}</span></div>{/each}
        </div>
      {/each}

      <div class="label">4 · Niveau d’escouade {lvl} · paliers</div>
      <p class="note">Somme des niveaux des 3 membres. Cohésion {coh > 0 ? '+' : ''}{coh} ({coh > 0 ? 'amis' : coh < 0 ? 'rivaux' : 'neutres'}) : chaque palier vaut <b>×{x2(Co.cohesionMult(s))}</b>.</p>
      <div class="tiers">
        {#each Co.SQUAD_TIERS as t}<div class:ok={lvl >= t.lv}><b>{t.lv}</b><span>{t.label}</span></div>{/each}
      </div>

      <div class="label">5 · Comment ça marche</div>
      <ul>
        <li><b>Seuls les 3 de l’escouade combattent.</b> Meneur ×{x2(T.slotLead)}, Bras droit ×{x2(T.slotRight)}, Soutien ×{x2(T.slotSupport)}.</li>
        <li>Chaque compagnon a <b>un bonus différent selon sa place</b> (voir sa fiche) ; il grandit à chaque palier de niveau (10, 25, 50…).</li>
        <li><b>Renommée</b> : chaque compagnon recruté, même sur le banc, ajoute +{Math.round(T.renownPer * 100)} % aux dégâts de l’escouade.</li>
        <li><b>Amis</b> (♥) dans l’escouade : paliers plus forts. <b>Rivaux</b> (⚔) : paliers plus faibles, mais Frappe +15 % par paire.</li>
        <li><b>Synergies</b> d’histoire (duos, trios) et <b>combinaisons de rôles</b> (équilibrée, 3 Mêlée…) s’ajoutent.</li>
        <li><b>Affinité</b> : +1 par boss vaincu dans l’escouade (+2 en Meneur), +{(T.affinityPer * 100).toString().replace('.', ',')} % de dégâts par niveau, pour toujours.</li>
        <li>Changer d’escouade est gratuit, sauf pendant un boss. « Composer au mieux » essaie toutes les compositions.</li>
      </ul>
    </div>
    <button class="btn go" onclick={() => (ui.squadInfo = false)}>Fermer</button>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 47; background: rgba(8,6,12,.82); display: grid; place-items: center; padding: 10px; }
  .box { width: 100%; max-width: 420px; max-height: 90dvh; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; }
  .h { font-size: 30px; line-height: 1; color: var(--gold); }
  .scroll { overflow-y: auto; min-height: 0; display: flex; flex-direction: column; gap: 5px; }
  .mem { display: flex; gap: 8px; align-items: center; padding: 4px 6px; background: var(--stone-2); }
  .mem img { flex: none; width: 36px; height: 36px; object-fit: contain; object-position: top; }
  .mi { display: flex; flex-direction: column; font-size: 11px; color: var(--text-3); }
  .mi b { font-size: 12.5px; color: var(--text); }
  .mi em { font-style: normal; color: var(--gold); }
  .mi strong { color: var(--moss); }
  .calc { display: flex; flex-direction: column; gap: 2px; }
  .calc div { display: flex; justify-content: space-between; gap: 8px; padding: 4px 6px; font-size: 12.5px; background: var(--stone-2); }
  .calc small { font-size: 10px; color: var(--text-3); }
  .calc b { color: var(--gold); white-space: nowrap; }
  .calc .tot { background: #2c3a24; box-shadow: inset 2px 0 0 var(--moss); }
  .calc .tot b { color: var(--moss); }
  .stat { padding: 4px 6px; background: var(--stone-2); }
  .sh { display: flex; justify-content: space-between; font-size: 12.5px; }
  .sh em { font-style: normal; color: var(--moss); font-weight: 700; }
  .src { display: flex; justify-content: space-between; gap: 8px; padding-left: 8px; font-size: 11px; color: var(--text-3); }
  .note { margin: 0; font-size: 12px; color: var(--text-3); }
  .note b { color: var(--text); }
  .tiers { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .tiers div { display: flex; gap: 6px; padding: 3px 6px; font-size: 11px; color: var(--text-3); background: var(--stone-1); }
  .tiers div b { width: 34px; text-align: right; }
  .tiers div.ok { color: var(--text); background: var(--stone-2); }
  .tiers div.ok b { color: var(--moss); }
  ul { margin: 0; padding-left: 16px; font-size: 12px; color: var(--text-2); display: flex; flex-direction: column; gap: 3px; }
  ul b { color: var(--text); }
  .go { padding: 9px; }
</style>

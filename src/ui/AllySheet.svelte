<script lang="ts">
  import { guard } from '../lib/guard';
  import { G, ui, act, toast } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import * as Co from '../game/company';
  import { COMPANIONS } from '../game/data/heroes';
  import { MEMORIES, MEMORY_LEVELS } from '../game/data/memories';
  import { TALENTS, TALENT_TIERS, talentsOf, pendingTalent, ownMult } from '../game/talents';
  import { compDps, nextMilestone, milestoneMult } from '../game/formulas';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp } from '../lib/audio';
  import { T } from '../game/tuning';
  const s = $derived(G.s);
  const i = $derived(ui.ally ?? 0);
  const c = $derived(COMPANIONS[i]);
  const lv = $derived(s.run.companions[i]);
  const N = (x: number) => fmt(x, s.settings.notation);
  const pts = $derived(Co.affinityPts(s, i));
  const aff = $derived(Co.affinityLevel(pts));
  const lo = $derived(aff ? Co.AFFINITY_STEPS[aff - 1] : 0), hi = $derived(Co.AFFINITY_STEPS[aff] ?? lo);
  const at = $derived(Co.slotOf(s, i));
  const nm = $derived(nextMilestone(lv));
  function place(k: number) {
    if (!Co.canChangeSquad(s)) { toast('Pas pendant un combat de boss', 'info'); return; }
    if (act(g => Co.setSlot(g, k, i))) { sfxUp(); toast(`${c.name} : ${Co.SLOTS[k]}`, 'crit'); }
  }
</script>

<div class="veil" use:guard>
  <div class="box frame" role="dialog" aria-label={c.name}>
    <div class="hd">
      <div class="pic slot" class:lead={at === 0}><img src={gfx(c.sprite)} alt="" />{#if at === 0}<span class="crown">♛</span>{/if}</div>
      <div class="mi">
        <div class="gothic h">{c.name}</div>
        <span><b class="t-{c.type}">{Co.ROLE_NAME[c.type]}</b> · {c.title}</span>
        <em class="book">« {c.quote} »</em>
      </div>
    </div>
    <div class="scroll">
      <div class="rows">
        <div><span>Niveau</span><b>{lv || 'non recruté'}</b></div>
        {#if lv}
          <div><span>Paliers atteints</span><b>×{N(milestoneMult(lv))}{#if nm} · prochain au niv. {nm}{/if}</b></div>
          <div><span>Talents</span><b>×{ownMult(s, i).toFixed(2)}</b></div>
          <div><span>Affinité</span><b>×{(1 + T.affinityPer * aff).toFixed(3).replace(/0$/, '')}</b></div>
          {#if at >= 0}<div><span>Place</span><b>{Co.SLOTS[at]} · ×{String([T.slotLead, T.slotRight, T.slotSupport][at]).replace('.', ',')}</b></div>{/if}
        {/if}
      </div>

      <div class="label">Escouade</div>
      <div class="places">
        {#each [0, 1, 2] as k}<button class="btn" class:stone={at !== k} disabled={!lv || at === k} onclick={() => place(k)}>{k === 0 ? '♛ ' : ''}{Co.SLOTS[k]}</button>{/each}
      </div>
      <div class="sb">
        {#each [0, 1, 2] as k}<div class:on={at === k}><span>{k === 0 ? '♛ ' : ''}{Co.SLOTS[k]}</span><b>{Co.fmtStat(Co.SLOT_BONUS[i][k], Co.slotBonusValue(i, k, Math.max(1, lv)))}</b></div>{/each}
      </div>
      <p class="note">Bonus de place : grandit à chaque palier de niveau du compagnon.{lv ? '' : ' Recrutez-le d’abord.'}</p>
      {#if Co.friendsOf(i).length || Co.rivalsOf(i).length}
        <div class="label">Relations</div>
        <p class="note">{#each Co.friendsOf(i) as j}<em class="pos">♥ {COMPANIONS[j].name}</em> {/each}{#each Co.rivalsOf(i) as j}<em class="neg">⚔ {COMPANIONS[j].name}</em> {/each}</p>
        <p class="note">Amis dans la même escouade : paliers d’escouade ×1,25 par paire. Rivaux : paliers ×0,75 mais frappe +15 % (émulation).</p>
      {/if}
      {#if Co.SYNERGIES.some(x => x.ids.includes(i))}
        <div class="label">Synergies</div>
        {#each Co.SYNERGIES.filter(x => x.ids.includes(i)) as x}
          <div class="syn"><b>✦ {x.name}</b><span>{x.ids.map(id => COMPANIONS[id].name).join(' + ')} · {x.desc}</span></div>
        {/each}
      {/if}

      <div class="label">Affinité · niveau {aff}/{Co.AFFINITY_STEPS.length}</div>
      <div class="bar aff"><i style="width:{aff >= Co.AFFINITY_STEPS.length ? 100 : ((pts - lo) / Math.max(1, hi - lo)) * 100}%"></i></div>
      <p class="note">{aff >= Co.AFFINITY_STEPS.length ? 'Lien indéfectible.' : `${pts - lo} / ${hi - lo} · +1 par boss vaincu dans l’escouade (+2 en Meneur). Chaque niveau : +${(T.affinityPer * 100).toString().replace('.', ',')} % de dégâts, pour toujours.`}</p>

      <div class="label">Souvenirs</div>
      {#each MEMORY_LEVELS as m, k}
        <div class="mem" class:locked={aff < m}>{aff >= m ? MEMORIES[i][k] : `Affinité ${m} requise`}</div>
      {/each}

      {#if lv >= TALENT_TIERS[0] || talentsOf(s, i).length}
        <div class="label">Talents</div>
        {#each TALENT_TIERS as t, k}
          {@const p = talentsOf(s, i)[k]}
          <div class="tal" class:on={!!p && lv >= t}><b>{t}</b><span>{p ? TALENTS[k][p === 'a' ? 0 : 1].name + ' — ' + TALENTS[k][p === 'a' ? 0 : 1].desc : lv >= t ? 'À choisir' : '—'}</span></div>
        {/each}
        {#if pendingTalent(s, i) >= 0}<button class="btn" onclick={() => { ui.talent = i; ui.ally = null; }}>★ Choisir un talent</button>{/if}
      {/if}
    </div>
    <button class="btn stone go" onclick={() => (ui.ally = null)}>Fermer</button>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 47; background: rgba(8,6,12,.82); display: grid; place-items: center; padding: 12px; }
  .box { width: 100%; max-width: 400px; max-height: 88dvh; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
  .hd { display: flex; gap: 10px; align-items: center; }
  .pic { position: relative; flex: none; width: 64px; height: 64px; display: grid; place-items: center; }
  .pic.lead { box-shadow: inset 0 0 0 2px var(--gold); }
  .pic img { width: 58px; height: 58px; object-fit: contain; object-position: top; }
  .crown { position: absolute; left: 3px; top: 0; color: var(--gold-hi); font-size: 15px; text-shadow: 1px 1px 0 #000; }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; font-size: 12px; color: var(--text-3); }
  .h { font-size: 30px; line-height: .95; color: var(--gold); }
  .mi em { font-size: 13px; color: var(--text-2); }
  .t-melee { color: #e3907a; } .t-distance { color: var(--moss); } .t-magie { color: var(--sky); }
  .scroll { overflow-y: auto; min-height: 0; display: flex; flex-direction: column; gap: 6px; }
  .rows { display: flex; flex-direction: column; gap: 2px; }
  .rows div, .tal { display: flex; justify-content: space-between; gap: 8px; padding: 4px 6px; font-size: 12.5px; background: var(--stone-2); }
  .rows b { color: var(--gold); }
  .note { margin: 0; font-size: 12px; color: var(--text-3); }
  .places { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
  .places .btn { font-size: 12px; padding: 6px 2px; }
  .note em { font-style: normal; margin-right: 6px; }
  .note .pos { color: var(--moss); } .note .neg { color: #e07a6f; }
  .syn { display: flex; flex-direction: column; padding: 4px 6px; font-size: 12px; background: var(--stone-2); }
  .syn b { color: var(--gold-hi); }
  .syn span { color: var(--text-3); font-size: 11px; }
  .bar.aff { height: 8px; }
  .bar.aff > i { background: #f08b80; }
  .mem { padding: 6px 8px; font-family: var(--f-book); font-size: 14px; font-style: italic; color: var(--text); background: #2b2433; box-shadow: inset 2px 0 0 #f08b80; }
  .mem.locked { font-family: var(--f-pixel); font-style: normal; font-size: 11.5px; color: var(--text-3); background: var(--stone-1); box-shadow: none; }
  .tal { justify-content: flex-start; color: var(--text-3); }
  .tal b { width: 30px; color: var(--text-3); }
  .tal.on { color: var(--text); }
  .tal.on b { color: var(--gold); }
  .go { padding: 9px; }
  .sb { display: flex; flex-direction: column; gap: 2px; }
  .sb div { display: flex; justify-content: space-between; gap: 6px; padding: 4px 6px; font-size: 12px; color: var(--text-3); background: var(--stone-2); }
  .sb div.on { color: var(--text); box-shadow: inset 2px 0 0 var(--gold); }
  .sb b { color: var(--moss); }
</style>

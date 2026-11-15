<script lang="ts">
  import { guard } from '../lib/guard';
  import { G, ui, act, toast } from '../lib/game.svelte';
  import { COMPANIONS } from '../game/data/heroes';
  import { TALENTS, TALENT_TIERS, pendingTalent, chooseTalent, talentsOf } from '../game/talents';
  import { gfx } from '../lib/gfx';
  import { sfxUp } from '../lib/audio';
  const i = $derived(ui.talent ?? 0);
  const c = $derived(COMPANIONS[i]);
  const tier = $derived(pendingTalent(G.s, i));
  const got = $derived(talentsOf(G.s, i));
  function pick(p: 'a' | 'b') {
    if (act(g => chooseTalent(g, i, tier, p))) { sfxUp(); toast(`${c.name} : ${TALENTS[tier][p === 'a' ? 0 : 1].name}`, 'crit'); }
    ui.talent = pendingTalent(G.s, i) >= 0 ? i : null;
  }
</script>

<div class="veil" use:guard>
  <div class="box frame" role="dialog" aria-label="Talent">
    <div class="hd"><img src={gfx(c.sprite)} alt="" /><div><div class="label">Talent · niveau {TALENT_TIERS[tier] ?? ''}</div><div class="gothic h">{c.name}</div></div></div>
    {#if tier >= 0}
      <p class="book">Choisissez sa voie. Le choix est définitif et revient à chaque vie, dès que {c.name} repasse ce niveau.</p>
      <div class="opts">
        {#each TALENTS[tier] as t, k}
          <button class="opt frame" onclick={() => pick(k === 0 ? 'a' : 'b')}>
            <b>{t.name}</b><span>{t.desc}</span><em>{k === 0 ? 'Renforce cet allié' : 'Bonus d’équipe'}</em>
          </button>
        {/each}
      </div>
    {/if}
    {#if got.length}
      <div class="label">Talents choisis</div>
      <div class="got">{#each got as p, k}{#if p}<span>{TALENT_TIERS[k]} : {TALENTS[k][p === 'a' ? 0 : 1].name}</span>{/if}{/each}</div>
    {/if}
    <button class="btn stone" onclick={() => (ui.talent = null)}>Plus tard</button>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 47; background: rgba(8,6,12,.82); display: grid; place-items: center; padding: 14px; }
  .box { width: 100%; max-width: 380px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
  .hd { display: flex; gap: 10px; align-items: center; }
  .hd img { width: 54px; height: 54px; object-fit: contain; object-position: top; }
  .h { font-size: 30px; line-height: .95; color: var(--gold); }
  p { margin: 0; font-size: 14px; color: var(--text-2); }
  .opts { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .opt { display: flex; flex-direction: column; gap: 3px; padding: 10px 8px; text-align: left; }
  .opt:active { background: var(--stone-3); }
  .opt b { font-size: 15px; color: var(--gold-hi); }
  .opt span { font-size: 13px; color: var(--text); }
  .opt em { font-size: 11px; font-style: normal; color: var(--text-3); }
  .got { display: flex; flex-direction: column; gap: 2px; font-size: 12px; color: var(--text-2); }
</style>

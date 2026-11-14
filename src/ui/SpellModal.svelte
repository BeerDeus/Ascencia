<script lang="ts">
  import { guard } from '../lib/guard';
  import { G, ui } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { PARTITIONS } from '../game/data/heroes';
  import { gfx } from '../lib/gfx';
  const i = $derived(ui.spell ?? 0);
  const p = $derived(PARTITIONS[i]);
  const unlocked = $derived(E.partitionUnlocked(G.s, i));
  const dur = $derived(p.duration * (G.s.classId === 'mage' ? 1.5 : 1));
  function close() { ui.spell = null; ui.spellNew = false; }
</script>

<div class="veil" use:guard>
  <div class="box frame" role="dialog" aria-label={p.name}>
    <div class="label">{ui.spellNew ? 'Nouvelle Partition !' : 'Partition'}</div>
    <img class:off={!unlocked} src={gfx(p.icon)} alt="" />
    <div class="gothic h">{p.name}</div>
    <p class="book desc">{p.desc}</p>
    <div class="facts">
      <span><b class="mana">{p.mana}</b> mana</span>
      <span>Recharge <b>{p.cd >= 60 ? `${p.cd / 60} min` : `${p.cd} s`}</b></span>
      <span>{dur ? `Dure ${dur} s` : 'Instantané'}</span>
    </div>
    {#if !unlocked}<p class="lock">Se débloque à l’étage {p.unlock}.</p>
    {:else if ui.spellNew}<p class="hint">Touchez-la pour la lancer. Appui long sur une Partition : revoir sa fiche.</p>{/if}
    <button class="btn go" onclick={close}>{ui.spellNew ? 'À l’attaque !' : 'Fermer'}</button>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 47; background: rgba(8,6,12,.82); display: grid; place-items: center; padding: 16px; }
  .box { width: 100%; max-width: 320px; padding: 14px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .box img { width: 84px; height: 84px; object-fit: contain; }
  .box img.off { filter: grayscale(1) brightness(.6); }
  .h { font-size: 32px; line-height: 1; color: var(--gold); }
  .desc { margin: 2px 0; font-size: 16px; color: var(--text); }
  .facts { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 12px; font-size: 13px; color: var(--text-2); }
  .mana { color: #a9d4ff; }
  .lock { margin: 4px 0 0; font-size: 13px; color: var(--ember); }
  .hint { margin: 4px 0 0; font-size: 12px; color: var(--text-3); }
  .go { width: 100%; margin-top: 8px; padding: 10px; font-size: 16px; }
</style>

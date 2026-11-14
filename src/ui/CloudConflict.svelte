<script lang="ts">
  import { guard } from '../lib/guard';
  import { ui, G, useCloud, keepLocal } from '../lib/game.svelte';
  import { fmt, fmtTime } from '../game/format';
  const c = $derived(ui.conflict!);
  const when = (t: number) => new Date(t).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
</script>

<div class="veil" use:guard>
  <div class="box frame">
    <h3 class="gothic">Deux sauvegardes</h3>
    <p class="book">La sauvegarde en ligne est plus récente que celle de cet appareil. Laquelle garder ?</p>
    <div class="cols">
      <div class="col slot">
        <div class="label">En ligne</div>
        <b>Étage {c.bestFloor}</b><span>Légende {fmt(c.legende)}</span><span>{c.ascensions} Ascension(s)</span><span>{fmtTime(c.playSeconds)} de jeu</span><small>{when(c.lastSave)}</small>
        <button class="btn" onclick={() => useCloud(c)}>Garder celle-ci</button>
      </div>
      <div class="col slot">
        <div class="label">Cet appareil</div>
        <b>Étage {G.s.bestFloor}</b><span>Légende {fmt(G.s.legende)}</span><span>{G.s.ascensions} Ascension(s)</span><span>{fmtTime(G.s.stats.playSeconds)} de jeu</span><small>{when(G.s.lastSave)}</small>
        <button class="btn stone" onclick={keepLocal}>Garder celle-ci</button>
      </div>
    </div>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 55; background: rgba(8,6,12,.85); display: grid; place-items: center; padding: 14px; }
  .box { width: 100%; max-width: 420px; padding: 14px; }
  h3 { margin: 0; font-size: 34px; color: var(--parch); text-align: center; line-height: 1; }
  p { font-size: 15px; color: var(--text-2); text-align: center; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .col { display: flex; flex-direction: column; gap: 2px; padding: 8px; background: var(--stone-2); font-size: 13px; color: var(--text-2); }
  .col b { font-size: 16px; color: var(--text); }
  .col small { font-size: 11px; color: var(--text-3); margin-bottom: 6px; }
  .col .btn { margin-top: auto; font-size: 12px; }
</style>

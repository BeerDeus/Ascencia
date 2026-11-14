<script lang="ts">
  import { G, updateSettings, persist, ui } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { clearSaves } from '../lib/native';
  import { fmtTime, fmt } from '../game/format';
  const s = $derived(G.s);
  let confirmReset = $state(false);
  let io = $state('');
  let msg = $state('');
  function exportSave() { io = btoa(unescape(encodeURIComponent(E.serialize(G.s)))); msg = 'Sauvegarde copiée ci-dessous.'; navigator.clipboard?.writeText(io).catch(() => {}); }
  function importSave() {
    try { const g = E.deserialize(decodeURIComponent(escape(atob(io.trim())))); if (!g) throw 0; G.s = g; persist(); msg = 'Sauvegarde importée !'; }
    catch { msg = 'Code invalide.'; }
  }
  async function reset() { await clearSaves(); G.s = E.newGame(); ui.classPicker = 'start'; G.s.seenStory.push('start'); ui.scenes.push('start'); confirmReset = false; persist(); }
</script>

<div class="scroll body">
  <div class="title sub">Réglages</div>
  <label><span>Sons & musique des frappes</span><input type="checkbox" bind:checked={s.settings.sound} onchange={updateSettings} /></label>
  <label><span>Vibrations</span><input type="checkbox" bind:checked={s.settings.haptics} onchange={updateSettings} /></label>
  <label><span>Réessayer le boss automatiquement</span><input type="checkbox" bind:checked={s.settings.autoAdvance} onchange={updateSettings} /></label>
  <label><span>Notation scientifique</span><input type="checkbox" checked={s.settings.notation === 'scientifique'}
    onchange={(e) => { s.settings.notation = e.currentTarget.checked ? 'scientifique' : 'lettres'; updateSettings(); }} /></label>

  <div class="title sub">Statistiques</div>
  <div class="stats">
    <span>Temps de jeu</span><b>{fmtTime(s.stats.playSeconds)}</b>
    <span>Monstres vaincus</span><b>{fmt(s.stats.kills)}</b>
    <span>Boss vaincus</span><b>{fmt(s.stats.bossKills)}</b>
    <span>Frappes</span><b>{fmt(s.stats.taps)}</b>
    <span>Gobelins dorés</span><b>{fmt(s.stats.goldenKills)}</b>
    <span>Or gagné</span><b>{fmt(s.stats.goldEarned)}</b>
  </div>

  <div class="title sub">Sauvegarde</div>
  <div class="row"><button class="btn ghost" onclick={exportSave}>Exporter</button><button class="btn ghost" onclick={importSave}>Importer</button></div>
  <textarea bind:value={io} placeholder="Code de sauvegarde"></textarea>
  {#if msg}<p class="msg">{msg}</p>{/if}
  {#if !confirmReset}<button class="btn ghost danger" onclick={() => (confirmReset = true)}>Effacer la partie…</button>
  {:else}<div class="row"><button class="btn danger" onclick={reset}>Oui, tout effacer</button><button class="btn ghost" onclick={() => (confirmReset = false)}>Annuler</button></div>{/if}
  <p class="ver">Ascencia v{__APP_VERSION__} · prototype</p>
</div>

<style>
  .body { flex: 1; padding: 12px 14px; }
  .sub { font-size: 13px; color: var(--ink-3); margin: 10px 0 6px; }
  label { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid var(--line); font-size: 14px; }
  input[type=checkbox] { width: 20px; height: 20px; accent-color: var(--violet); }
  .stats { display: grid; grid-template-columns: 1fr auto; gap: 4px 10px; font-size: 13px; color: var(--ink-2); }
  .stats b { color: var(--ink); font-family: var(--font-num); }
  .row { display: flex; gap: 8px; margin-bottom: 6px; }
  textarea { width: 100%; height: 54px; background: var(--panel); color: var(--ink); border: 1px solid var(--line); border-radius: 8px; font-size: 11px; padding: 6px; user-select: text; -webkit-user-select: text; }
  .msg { font-size: 12px; color: var(--green); }
  .danger { color: #fff; background: #8c2738; box-shadow: none; margin-top: 8px; }
  .btn.ghost.danger { background: transparent; color: var(--red); box-shadow: inset 0 0 0 1px #5a2030; }
  .ver { font-size: 11px; color: var(--ink-3); text-align: center; margin-top: 16px; }
</style>

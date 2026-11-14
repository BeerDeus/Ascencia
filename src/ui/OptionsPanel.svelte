<script lang="ts">
  import { G, updateSettings, persist, ui, cloudPush } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { clearSaves } from '../lib/native';
  import { account, googleAvailable, signInGoogle, signInEmail, signUpEmail, resetPassword, signOut } from '../lib/cloud.svelte';
  import { fmtTime, fmt } from '../game/format';
  const s = $derived(G.s);
  let confirmReset = $state(false);
  let io = $state('');
  let msg = $state('');
  let email = $state('');
  let pw = $state('');
  let mode = $state<'in' | 'up'>('in');
  function exportSave() { io = btoa(unescape(encodeURIComponent(E.serialize(G.s)))); msg = 'Code copié.'; navigator.clipboard?.writeText(io).catch(() => {}); }
  function importSave() {
    try { const g = E.deserialize(decodeURIComponent(escape(atob(io.trim())))); if (!g) throw 0; G.s = g; persist(); msg = 'Sauvegarde importée.'; }
    catch { msg = 'Code invalide.'; }
  }
  async function reset() { await clearSaves(); G.s = E.newGame(); G.s.seenStory.push('start'); ui.scenes.push('start'); ui.classPicker = 'start'; confirmReset = false; persist(); }
  async function sync() { await cloudPush(); if (!account.error) account.info = 'Sauvegarde envoyée.'; }
  const ago = $derived(account.lastSync ? new Date(account.lastSync).toLocaleTimeString('fr-FR', { timeStyle: 'short' }) : '—');
</script>

<div class="scroll body">
  <section class="frame">
    <div class="label">Compte & sauvegarde en ligne</div>
    {#if account.user}
      <p class="who">Connecté : <b>{account.user.email || account.user.name}</b></p>
      <p class="small">Dernier envoi : {ago} · synchro automatique toutes les 2 min</p>
      <div class="row"><button class="btn" disabled={account.busy} onclick={sync}>Synchroniser</button><button class="btn stone" disabled={account.busy} onclick={signOut}>Se déconnecter</button></div>
    {:else}
      <p class="small">Connecte-toi pour retrouver ta progression sur un autre appareil.</p>
      {#if googleAvailable}<button class="btn google" disabled={account.busy} onclick={signInGoogle}>Continuer avec Google</button>{/if}
      <div class="form">
        <input type="email" placeholder="E-mail" autocomplete="email" bind:value={email} />
        <input type="password" placeholder="Mot de passe" autocomplete={mode === 'in' ? 'current-password' : 'new-password'} bind:value={pw} />
        <div class="row">
          {#if mode === 'in'}<button class="btn" disabled={account.busy} onclick={() => signInEmail(email, pw)}>Se connecter</button>
          {:else}<button class="btn" disabled={account.busy} onclick={() => signUpEmail(email, pw)}>Créer le compte</button>{/if}
          <button class="link" onclick={() => (mode = mode === 'in' ? 'up' : 'in')}>{mode === 'in' ? 'Créer un compte' : 'J’ai déjà un compte'}</button>
        </div>
        {#if mode === 'in'}<button class="link" onclick={() => resetPassword(email)}>Mot de passe oublié ?</button>{/if}
      </div>
    {/if}
    {#if account.error}<p class="err">{account.error}</p>{/if}
    {#if account.info}<p class="ok">{account.info}</p>{/if}
  </section>

  <section class="frame">
    <div class="label">Réglages</div>
    <label><span>Sons et notes des frappes</span><input type="checkbox" bind:checked={s.settings.sound} onchange={updateSettings} /></label>
    <label><span>Vibrations</span><input type="checkbox" bind:checked={s.settings.haptics} onchange={updateSettings} /></label>
    <label><span>Retenter le boss automatiquement</span><input type="checkbox" bind:checked={s.settings.autoAdvance} onchange={updateSettings} /></label>
    <label><span>Notation scientifique</span><input type="checkbox" checked={s.settings.notation === 'scientifique'}
      onchange={(e) => { s.settings.notation = e.currentTarget.checked ? 'scientifique' : 'lettres'; updateSettings(); }} /></label>
  </section>

  <section class="frame">
    <div class="label">Statistiques</div>
    <div class="stats">
      <span>Temps de jeu</span><b>{fmtTime(s.stats.playSeconds)}</b>
      <span>Monstres vaincus</span><b>{fmt(s.stats.kills)}</b>
      <span>Boss vaincus</span><b>{fmt(s.stats.bossKills)}</b>
      <span>Frappes</span><b>{fmt(s.stats.taps)}</b>
      <span>Gobelins dorés</span><b>{fmt(s.stats.goldenKills)}</b>
      <span>Or gagné</span><b>{fmt(s.stats.goldEarned)}</b>
    </div>
  </section>

  <section class="frame">
    <div class="label">Sauvegarde manuelle</div>
    <div class="row"><button class="btn stone" onclick={exportSave}>Exporter</button><button class="btn stone" onclick={importSave}>Importer</button></div>
    <textarea bind:value={io} placeholder="Code de sauvegarde"></textarea>
    {#if msg}<p class="ok">{msg}</p>{/if}
    {#if !confirmReset}<button class="link danger" onclick={() => (confirmReset = true)}>Effacer la partie…</button>
    {:else}<div class="row"><button class="btn blood" onclick={reset}>Oui, tout effacer</button><button class="btn stone" onclick={() => (confirmReset = false)}>Annuler</button></div>{/if}
  </section>
  <p class="ver">Ascencia v{__APP_VERSION__} · <a href="https://ascencia.manaorbit.app/politique-confidentialite.html" target="_blank" rel="noopener">Confidentialité</a></p>
</div>

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 8px; }
  section { padding: 8px 10px; display: flex; flex-direction: column; gap: 6px; }
  .who { margin: 0; font-size: 14px; }
  .small { margin: 0; font-size: 12px; color: var(--text-3); }
  .row { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
  .form { display: flex; flex-direction: column; gap: 6px; }
  input[type=email], input[type=password] { padding: 8px; color: var(--text); background: var(--ink-0); border: 2px solid var(--stone-4); font-size: 15px; user-select: text; -webkit-user-select: text; }
  .google { background: #f2efe8; color: #222; box-shadow: inset 2px 2px 0 #fff, inset -2px -3px 0 #b8b2a4; }
  .link { font-size: 13px; color: var(--sky); text-decoration: underline; align-self: flex-start; }
  .err { margin: 0; font-size: 13px; color: #e8776e; }
  .ok { margin: 0; font-size: 13px; color: var(--moss); }
  label { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 14px; padding: 3px 0; }
  input[type=checkbox] { appearance: none; width: 34px; height: 18px; flex: none; background: var(--ink-0); border: 2px solid var(--stone-4); position: relative; }
  input[type=checkbox]::after { content: ''; position: absolute; top: 2px; left: 2px; width: 10px; height: 10px; background: var(--text-3); }
  input[type=checkbox]:checked { border-color: var(--gold-lo); }
  input[type=checkbox]:checked::after { left: 18px; background: var(--gold); }
  .stats { display: grid; grid-template-columns: 1fr auto; gap: 3px 10px; font-size: 13px; color: var(--text-2); }
  .stats b { color: var(--text); }
  textarea { width: 100%; height: 50px; padding: 6px; color: var(--text); background: var(--ink-0); border: 2px solid var(--stone-4); font-size: 11px; user-select: text; -webkit-user-select: text; }
  .danger { color: #e8776e; }
  .ver { text-align: center; font-size: 11px; color: var(--text-3); }
  .ver a { color: var(--text-2); }
</style>

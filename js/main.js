// ===== Point d'entrée Ascencia =====
// Boot en 4 étapes visibles (voir components/bootScreen.js) : app -> connexion
// internet -> compte (Google/email, écran de login si nécessaire) -> synchronisation
// cloud (chargement Firestore + rattrapage hors-ligne : Vie, Endurance, Minage).
import { state, subscribe, resetSave, hydrateFromCloud, save, hadLocalSave } from './state.js';
import { renderHeader } from './components/header.js';
import { renderMainNav } from './components/navbar.js';
import { renderFab } from './components/fab.js';
import { initRouter, navigate, rerender } from './router.js';
import { playerApi } from './game/player.js';
import { recomputeBonuses, migrateCeintureEquip, itemsApi } from './game/items.js';
import { tick as enduranceTick, enduranceApi } from './game/endurance.js';
import { isActive as combatActive, combatApi } from './game/combat.js';
import { miningApi } from './game/mining.js';
import { bucheronnageApi } from './game/bucheronnage.js';
import { tissageApi } from './game/tissage.js';
import { resonanceApi } from './game/resonance.js';
import { ascensionApi } from './game/ascension.js';
import { donjonApi } from './game/donjon.js';
import { buildOfflineReport } from './game/offlineReport.js';
import { waitForAuthState, signOutUser, authApi } from './firebase/auth.js';
import { loadCloudSave, startAutoSync, flushNow, syncApi } from './firebase/sync.js';
import { mountBootScreen } from './components/bootScreen.js';
import { mountLoginScreen } from './components/loginScreen.js';
import { showOfflineReportModal } from './components/offlineReportModal.js';
import { mountToasts } from './components/toast.js';
import { notificationsApi } from './game/notifications.js';

async function start() {
  const overlay = document.getElementById('boot-overlay');
  let boot = mountBootScreen(overlay);
  boot.setStep('app', 'done');

  // ---- Connectivité ----
  boot.setStep('net', 'active');
  if (!navigator.onLine) {
    boot.setStep('net', 'error');
    boot.showError(
      "Pas de connexion internet détectée. Ascencia a besoin d'être en ligne pour se connecter et synchroniser ta progression.",
      'Réessayer', () => location.reload(),
    );
    window.addEventListener('online', () => location.reload(), { once: true });
    return;
  }
  boot.setStep('net', 'done');

  // ---- Compte (Google ou Email/Mot de passe) ----
  boot.setStep('auth', 'active');
  let user = await waitForAuthState();
  if (!user) {
    user = await new Promise((resolve) => {
      mountLoginScreen(overlay, () => { waitForAuthState().then(resolve); });
    });
    // Le login a remplacé le contenu de l'overlay : on réaffiche l'écran de
    // progression pour la suite (étape "sync").
    boot = mountBootScreen(overlay);
    boot.setStep('app', 'done');
    boot.setStep('net', 'done');
  }
  boot.setStep('auth', 'done');

  // ---- Synchronisation cloud + rattrapage hors-ligne ----
  boot.setStep('sync', 'active');
  let report = null;
  try {
    const cloudData = await loadCloudSave(user.uid);
    const cloudLastSeen = (cloudData && cloudData.meta && cloudData.meta.lastSeen) || 0;
    const localLastSeen = state.meta.lastSeen; // capturé AVANT hydratation (state = local, voir state.js)
    const isFirstSync = !cloudData;
    // Ne fusionner le cloud QUE s'il est réellement plus récent que le local, ou s'il
    // n'existe aucune sauvegarde locale (nouvel appareil). Sinon un cloud périmé
    // (autosave toutes les 25s, voir firebase/sync.js) peut écraser un état local plus
    // frais — ex : minage arrêté puis rafraîchissement de page avant le prochain push
    // cloud, le deepMerge ressuscitait `skills.mining.active` depuis le cloud. Bug
    // corrigé le 2026-07-15.
    const shouldHydrate = !hadLocalSave || cloudLastSeen > localLastSeen;
    if (shouldHydrate) hydrateFromCloud(cloudData); // fusionne la sauvegarde distante AVANT tout rattrapage
    report = buildOfflineReport(shouldHydrate ? cloudLastSeen : localLastSeen); // Vie + Endurance + Minage, voir game/offlineReport.js
    save(); // re-persiste l'état rattrapé (nouveau meta.lastSeen) avant de démarrer l'auto-sync
    startAutoSync(user.uid);
    if (isFirstSync) flushNow(); // 1ère sauvegarde cloud immédiate (pas d'attente du minuteur de 25s)
  } catch (err) {
    console.warn('[boot] synchronisation initiale échouée — poursuite en local uniquement pour cette session', err);
  }
  boot.setStep('sync', 'done');

  overlay.remove();
  mountApp();
  if (report) showOfflineReportModal(report);
}

function mountApp() {
  const app = document.getElementById('app');
  const header = document.getElementById('game-header');
  const viewRoot = document.getElementById('view-root');
  const subnav = document.getElementById('subnav');
  const mainnav = document.getElementById('mainnav');

  const drawMainNav = (view) => renderMainNav(mainnav, view, navigate);
  const drawFab = () => renderFab(app, state, navigate);

  migrateCeintureEquip(); // ceinture équipée dans l'ancien slot accessoire (voir game/items.js) — idempotent
  recomputeBonuses(state.player); // resync des bonus d'équipement (rattrapage hors-ligne déjà fait dans start())

  mountToasts(app);
  renderHeader(header);
  drawMainNav(state.ui.view);
  initRouter({ viewRoot, subnav, app, onViewChange: drawMainNav });
  drawFab();

  // Toute mutation d'état rafraîchit le header + la vue courante + le FAB.
  subscribe(() => { renderHeader(header); rerender(); drawFab(); });

  // Régénération d'Endurance en continu pendant la session.
  setInterval(() => enduranceTick(Date.now()), 30 * 1000);

  // Régénération de Vie hors combat (jamais pendant un combat actif, ni pendant une
  // run active dans la Brèche Instable — "sa vie ne régénère pas du tout", voir
  // game/donjon.js. La régén reprend normalement dès la sortie de la Brèche).
  setInterval(() => { if (!combatActive() && !state.dungeon.active) playerApi.regenTick(Date.now()); }, 1000);

  // Métiers de récolte (Minage/Bûcheronnage/Tissage/Résonance) : créditent les cycles
  // pleins pendant que l'app reste ouverte, quelle que soit la vue active (même calcul
  // que le rattrapage hors-ligne — voir game/gathering.js + game/offlineReport.js).
  setInterval(() => {
    if (miningApi.isMining()) miningApi.creditPending();
    if (bucheronnageApi.isChopping()) bucheronnageApi.creditPending();
    if (tissageApi.isWeaving()) tissageApi.creditPending();
    if (resonanceApi.isResonating()) resonanceApi.creditPending();
  }, 5000);

  window.Ascencia = Object.assign({}, playerApi, itemsApi, enduranceApi, combatApi, miningApi, bucheronnageApi, tissageApi, resonanceApi, authApi, syncApi, notificationsApi, ascensionApi, donjonApi, { state, resetSave, signOut: doSignOut });

  console.log('[Ascencia] Prêt. Test console : Ascencia.addXp(250), Ascencia.addAttribute("force",10), Ascencia.resetSave(), Ascencia.signOut()');
  console.log('[Ascencia] Symphonies (en combat) : Ascencia.debugTestAccord("soin"|"foudre"|"fureur"|"vif"|"parfait"). Ascencia.debugPushNote("DO"|"RE"|"MI"|"FA"|"SOL"|"LA"|"SI").');
  console.log('[Ascencia] Ascension : Ascencia.debugSetZone(10), Ascencia.debugUnlockAllZones(), Ascencia.debugAddPoints(20), Ascencia.debugResetConstellations(), Ascencia.ascend(), Ascencia.respec().');
  console.log('[Ascencia] Brèche Instable : Ascencia.debugUnlockResonators(), Ascencia.debugSetBestFloor(30), Ascencia.launchGardien(), Ascencia.startRun(0).');
}

// Déconnexion volontaire (bouton menu — voir components/header.js) : on force une
// dernière écriture cloud avant de couper, pour ne rien perdre depuis le dernier
// autosave (jusqu'à 25s de progression sinon).
export async function doSignOut() {
  await flushNow();
  await signOutUser();
  location.reload();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();

// ---- PWA (temporaire, test d'affichage mobile hors Capacitor — voir sw.js/manifest.json) ----
// Enregistrement best-effort : un échec (hébergement sans HTTPS, navigateur sans
// support) ne doit jamais bloquer le boot du jeu.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => console.warn('[PWA] Service Worker non enregistré', err));
  });
}

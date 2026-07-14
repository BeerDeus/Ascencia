// ===== Point d'entrée Ascencia =====
// Boot en 4 étapes visibles (voir components/bootScreen.js) : app -> connexion
// internet -> compte (Google/email, écran de login si nécessaire) -> synchronisation
// cloud (chargement Firestore + rattrapage hors-ligne : Vie, Endurance, Minage).
import { state, subscribe, resetSave, hydrateFromCloud, save } from './state.js';
import { renderHeader } from './components/header.js';
import { renderMainNav } from './components/navbar.js';
import { renderFab } from './components/fab.js';
import { initRouter, navigate, rerender } from './router.js';
import { playerApi } from './game/player.js';
import { recomputeBonuses, itemsApi } from './game/items.js';
import { tick as enduranceTick, enduranceApi } from './game/endurance.js';
import { isActive as combatActive, combatApi } from './game/combat.js';
import { miningApi } from './game/mining.js';
import { buildOfflineReport } from './game/offlineReport.js';
import { waitForAuthState, signOutUser, authApi } from './firebase/auth.js';
import { loadCloudSave, startAutoSync, flushNow, syncApi } from './firebase/sync.js';
import { mountBootScreen } from './components/bootScreen.js';
import { mountLoginScreen } from './components/loginScreen.js';
import { showOfflineReportModal } from './components/offlineReportModal.js';
import { mountToasts } from './components/toast.js';
import { setNotification, notificationsApi } from './game/notifications.js';

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
    const cloudLastSeen = (cloudData && cloudData.meta && cloudData.meta.lastSeen) || state.meta.lastSeen;
    const isFirstSync = !cloudData;
    hydrateFromCloud(cloudData); // fusionne la sauvegarde distante AVANT tout rattrapage
    report = buildOfflineReport(cloudLastSeen); // Vie + Endurance + Minage, voir game/offlineReport.js
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

  recomputeBonuses(state.player); // resync des bonus d'équipement (rattrapage hors-ligne déjà fait dans start())

  // Notification de TEST (badge Village + Forge) — les vraies conditions de
  // déclenchement (quête dispo, craft prêt, etc.) seront branchées plus tard ; pour
  // l'instant ça démontre juste le système (voir game/notifications.js). À retirer
  // une fois de vrais triggers en place.
  setNotification('village', 'forge');

  mountToasts(app);
  renderHeader(header);
  drawMainNav(state.ui.view);
  initRouter({ viewRoot, subnav, app, onViewChange: drawMainNav });
  drawFab();

  // Toute mutation d'état rafraîchit le header + la vue courante + le FAB.
  subscribe(() => { renderHeader(header); rerender(); drawFab(); });

  // Régénération d'Endurance en continu pendant la session.
  setInterval(() => enduranceTick(Date.now()), 30 * 1000);

  // Régénération de Vie hors combat (jamais pendant un combat actif — voir combat.js).
  setInterval(() => { if (!combatActive()) playerApi.regenTick(Date.now()); }, 1000);

  // Minage : crédite les cycles pleins pendant que l'app reste ouverte, quelle que
  // soit la vue active (même calcul que le rattrapage hors-ligne — voir game/mining.js).
  setInterval(() => { if (miningApi.isMining()) miningApi.creditPending(); }, 5000);

  window.Ascencia = Object.assign({}, playerApi, itemsApi, enduranceApi, combatApi, miningApi, authApi, syncApi, notificationsApi, { state, resetSave, signOut: doSignOut });

  console.log('[Ascencia] Prêt. Test console : Ascencia.addXp(250), Ascencia.addAttribute("force",10), Ascencia.resetSave(), Ascencia.signOut()');
  console.log('[Ascencia] Symphonies (en combat) : Ascencia.debugTestAccord("soin"|"foudre"|"fureur"|"vif"|"parfait"). Ascencia.debugPushNote("DO"|"RE"|"MI"|"FA"|"SOL"|"LA"|"SI").');
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

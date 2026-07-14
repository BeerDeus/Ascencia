// ===== Synchronisation Firestore : lecture au login, écriture débattue (dirty-flag). =====
// But : ne JAMAIS écrire à chaque setState (bien trop fréquent — combat, minage,
// navigation...). Un flag "dirty" est levé localement (gratuit, aucun réseau) à chaque
// mutation via state.subscribe() ; un minuteur périodique + quelques points de sortie
// (onglet caché, fermeture) vident ce flag par un unique setDoc groupé.
// localStorage reste la sauvegarde instantanée de secours dans tous les cas (voir
// state.js) — Firestore est un miroir best-effort, pas le seul filet de sécurité.
import { doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js';
import { db } from './config.js';
import { subscribe, snapshotState } from '../state.js';

const AUTOSAVE_MS = 25 * 1000;

let uid = null;
let dirty = false;
let unsubscribeState = null;
let timerId = null;
let pushing = false; // évite deux écritures concurrentes qui se chevauchent

const saveRef = (u) => doc(db, 'saves', u);

export async function loadCloudSave(u) {
  try {
    const snap = await getDoc(saveRef(u));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.warn('[sync] lecture Firestore échouée', err);
    return null;
  }
}

async function pushNow() {
  if (!uid || pushing) return;
  pushing = true;
  try {
    await setDoc(saveRef(uid), { ...snapshotState(), _syncedAt: serverTimestamp() });
    dirty = false;
  } catch (err) {
    console.warn('[sync] écriture Firestore échouée — retentera au prochain cycle', err);
    // `dirty` reste true : flushIfDirty() retentera au prochain minuteur/déclencheur.
  } finally {
    pushing = false;
  }
}

function flushIfDirty() { if (dirty) pushNow(); }
function onVisibilityChange() { if (document.hidden) flushIfDirty(); }
function onBeforeUnload() { if (dirty) pushNow(); } // best-effort, non garanti par le navigateur

// À appeler une fois l'utilisateur connecté et l'état hydraté (voir main.js).
export function startAutoSync(userUid) {
  stopAutoSync();
  uid = userUid;
  dirty = false;

  unsubscribeState = subscribe(() => { dirty = true; });
  timerId = setInterval(flushIfDirty, AUTOSAVE_MS);

  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('beforeunload', onBeforeUnload);
}

// Écriture immédiate forcée (déconnexion volontaire, changement de compte...).
export async function flushNow() { await pushNow(); }

export function stopAutoSync() {
  if (unsubscribeState) unsubscribeState();
  if (timerId) clearInterval(timerId);
  document.removeEventListener('visibilitychange', onVisibilityChange);
  window.removeEventListener('beforeunload', onBeforeUnload);
  unsubscribeState = null; timerId = null; uid = null; dirty = false;
}

export const syncApi = { loadCloudSave, startAutoSync, stopAutoSync, flushNow };

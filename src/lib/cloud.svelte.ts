// Compte & sauvegarde cloud (Firebase Auth + Firestore Lite), chargés à la demande.
import type { FirebaseApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore/lite';
import { isNative } from './native';

const CONFIG = {
  apiKey: 'AIzaSyBK_CgYKg8mMqT9jgXHE3BfEg1PY269o78',
  authDomain: 'ascencia-app-off.firebaseapp.com',
  projectId: 'ascencia-app-off',
  storageBucket: 'ascencia-app-off.firebasestorage.app',
  messagingSenderId: '1034405292687',
  appId: '1:1034405292687:web:4825a50e55a608b4831efa',
};
const FLAG = 'ascencia.cloud';

export interface CloudSummary { bestFloor: number; legende: number; ascensions: number; playSeconds: number; lastSave: number }
export interface CloudSave extends CloudSummary { data: string }

export const account = $state({
  user: null as null | { uid: string; email: string; name: string },
  busy: false,
  error: '',
  info: '',
  lastSync: 0,
});

let app: FirebaseApp, auth: Auth, db: Firestore;
let A: typeof import('firebase/auth');
let FS: typeof import('firebase/firestore/lite');
let loading: Promise<void> | null = null;
let authListeners: ((u: User | null) => void)[] = [];

function load(): Promise<void> {
  if (loading) return loading;
  loading = (async () => {
    const [fa, fauth, ffs] = await Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore/lite')]);
    A = fauth; FS = ffs;
    app = fa.initializeApp(CONFIG);
    auth = A.initializeAuth(app, { persistence: [A.indexedDBLocalPersistence, A.browserLocalPersistence] });
    auth.languageCode = 'fr';
    db = FS.getFirestore(app);
    await new Promise<void>(res => {
      let first = true;
      A.onAuthStateChanged(auth, u => {
        account.user = u ? { uid: u.uid, email: u.email ?? '', name: u.displayName ?? u.email?.split('@')[0] ?? 'Joueur' } : null;
        try { u ? localStorage.setItem(FLAG, '1') : localStorage.removeItem(FLAG); } catch { /* ignoré */ }
        authListeners.forEach(fn => fn(u));
        if (first) { first = false; res(); }
      });
    });
  })();
  return loading;
}

export function onAuth(fn: (u: User | null) => void) { authListeners.push(fn); }

/** Au démarrage : ne charge Firebase que si le joueur s'était déjà connecté. */
export async function initCloud() {
  let was = false;
  try { was = localStorage.getItem(FLAG) === '1'; } catch { /* ignoré */ }
  if (was) await load().catch(() => {});
}

const MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'Adresse e-mail invalide.',
  'auth/missing-password': 'Mot de passe manquant.',
  'auth/weak-password': 'Mot de passe trop court (6 caractères minimum).',
  'auth/email-already-in-use': 'Un compte existe déjà avec cette adresse.',
  'auth/invalid-credential': 'E-mail ou mot de passe incorrect.',
  'auth/user-not-found': 'Aucun compte avec cette adresse.',
  'auth/wrong-password': 'Mot de passe incorrect.',
  'auth/too-many-requests': 'Trop de tentatives, réessayez plus tard.',
  'auth/popup-closed-by-user': 'Connexion annulée.',
  'auth/network-request-failed': 'Pas de connexion internet.',
  'permission-denied': 'Accès refusé par le serveur.',
  unavailable: 'Serveur injoignable.',
};
async function run<T>(fn: () => Promise<T>, ok?: string): Promise<T | undefined> {
  account.busy = true; account.error = ''; account.info = '';
  try {
    await load();
    const r = await fn();
    if (ok) account.info = ok;
    return r;
  } catch (e: any) {
    account.error = MESSAGES[e?.code] ?? 'Erreur : ' + (e?.code ?? e?.message ?? e);
  } finally { account.busy = false; }
}

export const googleAvailable = !isNative; // natif : branché via @capacitor-firebase/authentication (à venir)
export const signInGoogle = () => run(() => A.signInWithPopup(auth, new A.GoogleAuthProvider(), A.browserPopupRedirectResolver));
export const signInEmail = (email: string, pw: string) => run(() => A.signInWithEmailAndPassword(auth, email.trim(), pw));
export const signUpEmail = (email: string, pw: string) => run(() => A.createUserWithEmailAndPassword(auth, email.trim(), pw));
export const resetPassword = (email: string) => run(() => A.sendPasswordResetEmail(auth, email.trim()), 'E-mail de réinitialisation envoyé.');
export const signOut = () => run(() => A.signOut(auth));

export async function pullSave(): Promise<CloudSave | null> {
  if (!account.user) return null;
  const snap = await FS.getDoc(FS.doc(db, 'saves', account.user.uid));
  return snap.exists() ? (snap.data() as CloudSave) : null;
}

export async function pushSave(json: string, sum: CloudSummary) {
  if (!account.user) return;
  await FS.setDoc(FS.doc(db, 'saves', account.user.uid), {
    data: json, version: 1, updatedAt: FS.serverTimestamp(),
    bestFloor: Math.floor(sum.bestFloor), legende: sum.legende, ascensions: Math.floor(sum.ascensions),
    playSeconds: sum.playSeconds, lastSave: Math.floor(sum.lastSave),
  });
  account.lastSync = Date.now();
}

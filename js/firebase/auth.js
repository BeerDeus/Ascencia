// ===== Authentification (Google + Email/Mot de passe) =====
import {
  GoogleAuthProvider, signInWithPopup,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendPasswordResetEmail, signOut, onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js';
import { auth } from './config.js';

const googleProvider = new GoogleAuthProvider();

// Traduit les codes d'erreur Firebase en messages FR lisibles (UI login).
function friendlyError(err) {
  const code = err && err.code || '';
  const map = {
    'auth/invalid-email':          'Adresse email invalide.',
    'auth/user-not-found':         'Aucun compte avec cet email.',
    'auth/wrong-password':         'Mot de passe incorrect.',
    'auth/invalid-credential':     'Email ou mot de passe incorrect.',
    'auth/email-already-in-use':   'Un compte existe déjà avec cet email.',
    'auth/weak-password':          'Mot de passe trop faible (6 caractères minimum).',
    'auth/too-many-requests':      'Trop de tentatives — réessaie dans quelques instants.',
    'auth/popup-closed-by-user':   'Fenêtre Google fermée avant la fin de la connexion.',
    'auth/network-request-failed': 'Connexion impossible — vérifie ta connexion internet.',
  };
  return map[code] || `Erreur de connexion (${code || 'inconnue'}).`;
}

export async function signInGoogle() {
  try { await signInWithPopup(auth, googleProvider); return { ok: true }; }
  catch (err) { return { ok: false, error: friendlyError(err) }; }
}

export async function signUpEmail(email, password) {
  try { await createUserWithEmailAndPassword(auth, email, password); return { ok: true }; }
  catch (err) { return { ok: false, error: friendlyError(err) }; }
}

export async function signInEmail(email, password) {
  try { await signInWithEmailAndPassword(auth, email, password); return { ok: true }; }
  catch (err) { return { ok: false, error: friendlyError(err) }; }
}

export async function resetPassword(email) {
  try { await sendPasswordResetEmail(auth, email); return { ok: true }; }
  catch (err) { return { ok: false, error: friendlyError(err) }; }
}

export async function signOutUser() {
  try { await signOut(auth); return { ok: true }; }
  catch (err) { return { ok: false, error: friendlyError(err) }; }
}

// Résolu une seule fois avec l'utilisateur courant (null si déconnecté) — l'appelant
// n'a pas à se soucier du délai de restauration de session au démarrage du SDK.
export function waitForAuthState() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => { unsub(); resolve(user); });
  });
}

// Abonnement continu (déconnexions/connexions ultérieures pendant la session).
export function onAuthChange(cb) { return onAuthStateChanged(auth, cb); }

export const authApi = { signInGoogle, signUpEmail, signInEmail, resetPassword, signOutUser, waitForAuthState, onAuthChange };

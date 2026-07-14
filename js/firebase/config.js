// ===== Initialisation Firebase (SDK modulaire, imports CDN — pas de build step) =====
// Projet "ascenciaoff". Toutes les valeurs ci-dessous sont publiques par design (la
// sécurité réelle est assurée par les règles Firestore, voir rules.txt à la racine —
// ne jamais s'appuyer sur le secret de cette config).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js';
import { getAnalytics, isSupported as analyticsSupported } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyC4If5MiboivY4AqDrY21TO2Wp6kII0EBI',
  authDomain: 'ascenciaoff.firebaseapp.com',
  projectId: 'ascenciaoff',
  storageBucket: 'ascenciaoff.firebasestorage.app',
  messagingSenderId: '568392411269',
  appId: '1:568392411269:web:4ea30015bb04c3d8f7a1ec',
  measurementId: 'G-33XT717GJF',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics : optionnel (échoue silencieusement en environnement non supporté —
// webview Capacitor, navigateur sans mesure, etc.). Jamais bloquant pour le boot.
export let analytics = null;
analyticsSupported().then((ok) => { if (ok) analytics = getAnalytics(app); }).catch(() => {});

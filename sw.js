// ===== Service Worker Ascencia — PWA temporaire (test d'affichage mobile, cf.
// portage Capacitor futur) =====
// Rôle : uniquement rendre l'app installable (critère PWA) + accélérer les
// chargements suivants via un cache du shell statique. AUCUN mode hors-ligne
// complet n'est visé : le boot (js/main.js) exige déjà navigator.onLine et une
// synchronisation Firebase, donc toute requête cross-origin (Firebase, Google
// Fonts) passe toujours en direct au réseau, jamais interceptée ci-dessous.
const CACHE_NAME = 'ascencia-shell-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './css/variables.css',
  './css/base.css',
  './css/components.css',
  './css/views.css',
  './css/boot.css',
  './js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => {}) // un asset manquant ne doit jamais bloquer l'install
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// Stale-while-revalidate pour le shell MÊME ORIGINE (JS/CSS/HTML/assets locaux) :
// sert le cache instantanément si présent, revalide en tâche de fond. Ignore tout
// ce qui n'est pas un GET même-origine (Firebase/Firestore, fonts Google...).
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(req);
      const network = fetch(req).then((res) => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});

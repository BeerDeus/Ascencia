// Déploie les règles Firestore et les domaines autorisés de Firebase Auth via les API REST
// (évite firebase-tools, qui exige des droits Service Usage que la clé admin n'a pas).
// Utilise GOOGLE_APPLICATION_CREDENTIALS (compte de service firebase-adminsdk).
import { GoogleAuth } from 'google-auth-library';
import { readFileSync } from 'node:fs';

const PROJECT = process.env.FIREBASE_PROJECT || 'ascencia-app-off';
const RULES_FILE = process.argv[2] || 'firestore.rules';
const DOMAINS = ['localhost', 'ascencia.manaorbit.app', `${PROJECT}.firebaseapp.com`, `${PROJECT}.web.app`];

const client = await new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] }).getClient();
const api = (url, opts = {}) => client.request({ url, ...opts }).then(r => r.data);

// 1. Règles Firestore : nouveau ruleset puis mise à jour de la release cloud.firestore
const base = `https://firebaserules.googleapis.com/v1/projects/${PROJECT}`;
const ruleset = await api(`${base}/rulesets`, { method: 'POST', data: { source: { files: [{ name: 'firestore.rules', content: readFileSync(RULES_FILE, 'utf8') }] } } });
const release = { name: `projects/${PROJECT}/releases/cloud.firestore`, rulesetName: ruleset.name };
try {
  await api(`${base}/releases/cloud.firestore`, { method: 'PATCH', data: { release } });
} catch (e) {
  if (e?.response?.status !== 404) throw e;
  await api(`${base}/releases`, { method: 'POST', data: release });
}
console.log('Règles Firestore déployées :', ruleset.name);

// 2. Domaines autorisés de Firebase Auth
try {
  const cfgUrl = `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT}/config`;
  const cfg = await api(cfgUrl);
  const cur = cfg.authorizedDomains ?? [];
  const merged = [...new Set([...cur, ...DOMAINS])];
  if (merged.length !== cur.length) await api(`${cfgUrl}?updateMask=authorizedDomains`, { method: 'PATCH', data: { authorizedDomains: merged } });
  console.log('Domaines autorisés :', merged.join(', '));
} catch (e) {
  console.log(`::warning::Domaines autorisés non modifiés (${e?.response?.status ?? e.message}). À ajouter à la main : ${DOMAINS[1]}`);
}

// Ajoute les domaines du jeu aux « domaines autorisés » de Firebase Auth (Identity Toolkit Admin API).
// Utilise GOOGLE_APPLICATION_CREDENTIALS (compte de service).
import { GoogleAuth } from 'google-auth-library';

const PROJECT = process.env.FIREBASE_PROJECT || 'ascencia-app-off';
const WANTED = ['localhost', 'ascencia.manaorbit.app', `${PROJECT}.firebaseapp.com`, `${PROJECT}.web.app`];
const url = `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT}/config`;

const client = await new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] }).getClient();
const { data } = await client.request({ url });
const current = data.authorizedDomains ?? [];
const merged = [...new Set([...current, ...WANTED])];
if (merged.length === current.length) {
  console.log('Domaines déjà autorisés :', current.join(', '));
} else {
  await client.request({ url: `${url}?updateMask=authorizedDomains`, method: 'PATCH', data: { authorizedDomains: merged } });
  console.log('Domaines autorisés :', merged.join(', '));
}

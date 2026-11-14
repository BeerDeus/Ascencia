// Achats intégrés. Google Play Billing sera branché pour la version Play Store.
// Mode test (phase de test, version web / PWA) : paiement simulé, validé automatiquement (comme les pubs de test).
// Actif par défaut hors appli native ; « ?achats=off » le coupe, « ?achats=test » le rétablit.
// ⚠ À retirer avant la sortie Play Store (sinon achats gratuits sur le web, récupérables via la sauvegarde cloud).
import { isNative } from './native';
const KEY = 'ascencia.achats-test';
function testMode(): boolean {
  try {
    if (typeof location !== 'undefined' && /[?&]achats=test/.test(location.search)) localStorage.setItem(KEY, '1');
    if (typeof location !== 'undefined' && /[?&]achats=off/.test(location.search)) localStorage.setItem(KEY, '0');
    const v = localStorage.getItem(KEY);
    return v === '1' || (v !== '0' && !isNative);
  } catch { return !isNative; }
}
export const billingTest = testMode();
export const billingReady = billingTest;
export const payUi = $state({ open: false, label: '', done: false });

export async function purchase(_packId: string, label = _packId): Promise<boolean> {
  if (!billingTest) return false;
  payUi.open = true; payUi.label = label; payUi.done = false;
  await new Promise(r => setTimeout(r, 1200));
  payUi.done = true;
  await new Promise(r => setTimeout(r, 600));
  payUi.open = false;
  return true;
}

// Achats intégrés. Google Play Billing sera branché pour la version Play Store.
// Mode test : ouvrir le jeu avec « ?achats=test » → paiement simulé, validé automatiquement (comme les pubs de test).
const KEY = 'ascencia.achats-test';
function testMode(): boolean {
  try {
    if (typeof location !== 'undefined' && /[?&]achats=test/.test(location.search)) localStorage.setItem(KEY, '1');
    if (typeof location !== 'undefined' && /[?&]achats=off/.test(location.search)) localStorage.removeItem(KEY);
    return localStorage.getItem(KEY) === '1';
  } catch { return false; }
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

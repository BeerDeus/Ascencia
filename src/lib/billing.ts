// Achats intégrés. Google Play Billing sera branché pour la version Play Store.
// Mode test : ouvrir le jeu avec « ?achats=test » dans l'adresse → les achats sont simulés (rien n'est débité).
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
export async function purchase(packId: string, label = packId): Promise<boolean> {
  if (!billingTest) return false;
  return confirm(`Achat SIMULÉ (mode test) : ${label}\n\nAucun paiement réel. Continuer ?`);
}

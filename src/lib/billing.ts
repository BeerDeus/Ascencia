// Achats intégrés. À brancher sur Google Play Billing (produits à créer dans la Play Console).
// En attendant, aucun achat réel n'est possible : on l'indique au joueur.
export const billingReady = false;
export async function purchase(_packId: string): Promise<boolean> {
  return false;
}

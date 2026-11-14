// Pubs récompensées. Pour l'instant : pub de TEST (compte à rebours) — AdMob sera branché pour la version Play Store.
import { noAds, useAd, adsLeft } from '../game/shop';
import type { GameState } from '../game/types';

export const adUi = $state({ open: false, left: 0, placement: '' });
let resolver: ((ok: boolean) => void) | null = null;

/** Montre une pub récompensée ; renvoie true si la récompense doit être donnée. Consomme le quota du jour. */
export async function rewarded(s: GameState, placement: string): Promise<boolean> {
  if (adsLeft(s, placement) <= 0) return false;
  if (noAds(s)) return useAd(s, placement);
  const ok = await new Promise<boolean>(res => {
    resolver = res;
    adUi.open = true; adUi.placement = placement; adUi.left = 3;
    const t = setInterval(() => { adUi.left--; if (adUi.left <= 0) { clearInterval(t); finish(true); } }, 1000);
  });
  return ok && useAd(s, placement);
}
export function finish(ok: boolean) { adUi.open = false; resolver?.(ok); resolver = null; }

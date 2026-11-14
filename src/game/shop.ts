// Boutique : gemmes, bénédictions, pubs récompensées (plafonnées), calendrier, packs, offres.
import type { GameState } from './types';
import { now } from './clock';
import { dayKey } from './fief';
import { AD_LIMITS, AD_GEMS, BLESSINGS, CALENDAR, BAG_STEP, BAG_MAX_BONUS, BAG_COST, PACKS, type Blessing } from './data/shop';

export interface ShopState {
  day: string;
  ads: Record<string, number>;
  calIndex: number;
  calLast: string;
  blessings: Record<string, number>;   // fin (horodatage réel)
  offersSeen: string[];
  owned: string[];                      // achats définitifs (noads, starter…)
  passUntil: number;
  passLastDay: string;
  bagBonus: number;
}

export const newShop = (): ShopState => ({
  day: '', ads: {}, calIndex: 0, calLast: '', blessings: {}, offersSeen: [], owned: [], passUntil: 0, passLastDay: '', bagBonus: 0,
});

export const passActive = (s: GameState) => s.shop.passUntil > now();
export const noAds = (s: GameState) => s.shop.owned.includes('noads') || passActive(s);

/** Changement de jour : remet les compteurs de pubs à zéro, verse les gemmes du Pass. Renvoie les gemmes du Pass versées. */
export function shopCheck(s: GameState): number {
  const day = dayKey();
  if (s.shop.day !== day) { s.shop.day = day; s.shop.ads = {}; }
  if (passActive(s) && s.shop.passLastDay !== day) { s.shop.passLastDay = day; s.gems += 50; return 50; }
  return 0;
}

// ---- Bénédictions
export const blessing = (s: GameState, id: Blessing['id']) => (s.shop.blessings[id] ?? 0) > now();
export function buyBlessing(s: GameState, id: Blessing['id']): boolean {
  const b = BLESSINGS.find(x => x.id === id);
  if (!b || s.gems < b.cost) return false;
  s.gems -= b.cost;
  addBlessing(s, id, b.minutes);
  return true;
}
export function addBlessing(s: GameState, id: Blessing['id'], minutes: number) {
  s.shop.blessings[id] = Math.max(now(), s.shop.blessings[id] ?? 0) + minutes * 60_000;
}

// ---- Pubs récompensées
export const adsLeft = (s: GameState, placement: string) => Math.max(0, (AD_LIMITS[placement] ?? 0) - (s.shop.ads[placement] ?? 0));
export function useAd(s: GameState, placement: string): boolean {
  if (adsLeft(s, placement) <= 0) return false;
  s.shop.ads[placement] = (s.shop.ads[placement] ?? 0) + 1;
  return true;
}
export function adGems(s: GameState): boolean {
  if (!useAd(s, 'gemmes')) return false;
  s.gems += AD_GEMS;
  return true;
}

// ---- Calendrier de connexion (7 jours qui bouclent)
export const calendarReady = (s: GameState) => s.shop.calLast !== dayKey();
export const calendarReward = (s: GameState) => CALENDAR[s.shop.calIndex % CALENDAR.length];

// ---- Sac
export const invMax = (s: GameState) => 40 + (s.shop?.bagBonus ?? 0);
export function buyBag(s: GameState): boolean {
  if (s.shop.bagBonus >= BAG_MAX_BONUS || s.gems < BAG_COST) return false;
  s.gems -= BAG_COST; s.shop.bagBonus += BAG_STEP;
  return true;
}

// ---- Packs (accordés après validation du paiement par le Play Store)
export function grantPack(s: GameState, id: string): boolean {
  const p = PACKS.find(x => x.id === id);
  if (!p || (p.once && s.shop.owned.includes(id))) return false;
  s.gems += p.gems;
  if (id === 'starter') addBlessing(s, 'force', 120);
  if (id === 'fief') {
    addBlessing(s, 'or', 180);
    for (const p of ['herbe_robuste', 'fleur_rosee', 'racine_terreuse', 'champignon_terreux', 'graine_solaire']) s.garden.seeds[p] = (s.garden.seeds[p] ?? 0) + 4;
  }
  if (id === 'pass') s.shop.passUntil = Math.max(now(), s.shop.passUntil) + 30 * 86_400_000;
  if (p.once) s.shop.owned.push(id);
  return true;
}

/** Offre contextuelle à présenter (une seule fois), ex. le Pack du Fief à son déblocage. */
export function pendingOffer(s: GameState, fiefOpen: boolean) {
  return PACKS.find(p => p.offer && !s.shop.offersSeen.includes(p.id) && !s.shop.owned.includes(p.id)
    && (p.offer === 'fief' ? fiefOpen : s.seenStory.includes(p.offer)));
}

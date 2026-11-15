// Événements de saison (une semaine réelle chacun, calés sur les saisons du Jardin) :
// boss de saison (3 essais/jour), jetons, boutique d'événement, trophées permanents à collectionner.
import type { GameState } from './types';
import { now } from './clock';
import { dayKey, fiefUnlocked } from './fief';
import { season } from './garden';
import { addBlessing } from './shop';

export interface SeasonEvent { name: string; boss: string; bossName: string; seed: string; color: string }
export const EVENTS: SeasonEvent[] = [
  { name: 'Fête des Semailles', boss: 'bosses/ogre', bossName: 'L’Ogre des Semailles', seed: 'trefle_dore', color: '#86b25c' },
  { name: 'Brasier d’Été', boss: 'bosses/dragonnet', bossName: 'Le Dragonnet solaire', seed: 'tournesol_radieux', color: '#e6b64a' },
  { name: 'Nuit des Brumes', boss: 'bosses/vampire', bossName: 'La Comtesse des Brumes', seed: 'orchidee_silencieuse', color: '#e7793a' },
  { name: 'Veillée du Givre', boss: 'bosses/liche', bossName: 'La Liche du Givre', seed: 'cristal_givre', color: '#6fa6d6' },
];
export const EVENT_TRIES = 3, BOSS_TOKENS = 15, QUEST_TOKENS = 5, TROPHY_BONUS = 0.03;

export interface EventShopItem { id: string; name: string; cost: number; max: number; desc: string }
export const EVENT_SHOP: EventShopItem[] = [
  { id: 'trophee', name: 'Trophée de saison', cost: 150, max: 1, desc: `+${TROPHY_BONUS * 100} % de dégâts pour toujours (4 à collectionner)` },
  { id: 'graines', name: 'Graines de saison', cost: 40, max: 3, desc: '3 graines de la plante rare de la saison' },
  { id: 'gemmes', name: 'Bourse de gemmes', cost: 30, max: 5, desc: '50 gemmes' },
  { id: 'furie', name: 'Fiole de Furie', cost: 25, max: 3, desc: 'Furie des Anciens 30 min (dégâts ×3)' },
];

export interface EventState { key: string; tokens: number; day: string; tries: number; wins: number; bought: Record<string, number> }

export const eventOpen = (s: GameState) => fiefUnlocked(s);
export const currentEvent = (t = now()) => EVENTS[season(t)];
const eventKey = (t = now()) => String(Math.floor(t / (7 * 86_400_000)));
/** Fin de l'événement en cours (ms). */
export const eventEndsIn = (t = now()) => 7 * 86_400_000 - (t % (7 * 86_400_000));

export function eventCheck(s: GameState) {
  const key = eventKey(), day = dayKey();
  if (!s.event || s.event.key !== key) s.event = { key, tokens: 0, day, tries: EVENT_TRIES, wins: 0, bought: {} }; // les jetons expirent avec la saison
  if (s.event.day !== day) { s.event.day = day; s.event.tries = EVENT_TRIES; }
}
export const trophyMult = (s: GameState) => 1 + TROPHY_BONUS * (s.trophies?.length ?? 0);
export const triesLeft = (s: GameState) => (s.event ? s.event.tries : 0);

export function buyEventItem(s: GameState, id: string): boolean {
  eventCheck(s);
  const it = EVENT_SHOP.find(x => x.id === id), e = s.event!, sea = season();
  if (!it || e.tokens < it.cost || (e.bought[id] ?? 0) >= it.max) return false;
  if (id === 'trophee' && s.trophies?.includes(sea)) return false;
  e.tokens -= it.cost; e.bought[id] = (e.bought[id] ?? 0) + 1;
  if (id === 'trophee') (s.trophies ??= []).push(sea);
  else if (id === 'graines') { const p = EVENTS[sea].seed; s.garden.seeds[p] = (s.garden.seeds[p] ?? 0) + 3; }
  else if (id === 'gemmes') s.gems += 50;
  else if (id === 'furie') addBlessing(s, 'furie', 30);
  return true;
}

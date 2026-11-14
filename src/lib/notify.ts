// Notifications locales (Android) : rappels de retour, programmés quand l'appli passe en arrière-plan.
import { LocalNotifications } from '@capacitor/local-notifications';
import { isNative } from './native';
import type { GameState } from '../game/types';
import { mealActive } from '../game/fief';
import { OFFLINE_CAP_SECONDS } from '../game/engine';
import { passActive } from '../game/shop';
import { SEED_HOURS } from '../game/data/resonance';

/** Décale hors de la nuit (22 h – 9 h) pour ne réveiller personne. */
function daytime(t: number) {
  const d = new Date(t);
  if (d.getHours() >= 22) { d.setDate(d.getDate() + 1); d.setHours(9, 7, 0, 0); }
  else if (d.getHours() < 9) d.setHours(9, 7, 0, 0);
  return d;
}

export async function askNotifications() {
  if (!isNative) return;
  try {
    const p = await LocalNotifications.checkPermissions();
    if (p.display === 'prompt' || p.display === 'prompt-with-rationale') await LocalNotifications.requestPermissions();
  } catch { /* ignoré */ }
}

export async function cancelReturnHooks() {
  if (!isNative) return;
  try {
    const { notifications } = await LocalNotifications.getPending();
    if (notifications.length) await LocalNotifications.cancel({ notifications: notifications.map(n => ({ id: n.id })) });
  } catch { /* ignoré */ }
}

export async function scheduleReturnHooks(s: GameState) {
  if (!isNative || !s.settings.notifications || !s.classId) return;
  try {
    if ((await LocalNotifications.checkPermissions()).display !== 'granted') return;
    await cancelReturnHooks();
    const now = Date.now();
    const list: { id: number; title: string; body: string; at: Date }[] = [];
    const cap = OFFLINE_CAP_SECONDS + (passActive(s) ? 4 * 3600 : 0);
    list.push({ id: 1, title: 'Les sacs sont pleins', body: 'Tes compagnons ne peuvent plus rien porter. Viens récupérer ton or !', at: daytime(now + cap * 1000) });
    const meal = mealActive(s);
    if (meal && s.meal) list.push({ id: 2, title: 'L’Auberge de Gaston', body: `« ${meal.name} : plus une miette. Je t’en prépare un autre ? »`, at: daytime(s.meal.until) });
    const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(10, 7, 0, 0);
    list.push({ id: 3, title: 'Nouvelles primes', body: 'Le Tableau des Primes a été renouvelé, et un présent t’attend.', at: tomorrow });
    if (s.anchors?.seedPlanted && !s.anchors.seedDone) {
      list.push({ id: 4, title: 'La Graine-Cœur', body: 'Quelque chose a éclos dans ton Fief…', at: daytime(s.anchors.seedPlanted + SEED_HOURS * 3600_000) });
    }
    await LocalNotifications.schedule({
      notifications: list.filter(n => n.at.getTime() > now + 60_000).map(n => ({ id: n.id, title: n.title, body: n.body, schedule: { at: n.at, allowWhileIdle: true } })),
    });
  } catch { /* ignoré */ }
}


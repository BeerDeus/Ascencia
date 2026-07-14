// ===== Notifications de nav (badges mainnav/subnav) =====
// Clé = `${view}:${sub}` (voir config.js SUBNAV). Un badge sur un subnav-item se
// répercute automatiquement sur le mainnav-item parent (hasAnyNotification), et les
// deux disparaissent ensemble puisqu'ils lisent le même state — pas de synchro à gérer
// à la main. Les raisons de déclenchement (quête dispo, craft prêt...) seront branchées
// plus tard ; router.js clearNotification() est déjà appelé à la navigation (vue "lue").
import { state, setState } from '../state.js';

export function setNotification(view, sub, on = true) {
  setState((s) => {
    s.notifications = s.notifications || {};
    const key = `${view}:${sub}`;
    if (on) s.notifications[key] = true;
    else delete s.notifications[key];
  });
}
export const clearNotification = (view, sub) => setNotification(view, sub, false);

export const hasNotification = (view, sub) => !!(state.notifications && state.notifications[`${view}:${sub}`]);
export const hasAnyNotification = (view) => {
  const n = state.notifications;
  if (!n) return false;
  const prefix = `${view}:`;
  return Object.keys(n).some((k) => k.startsWith(prefix) && n[k]);
};

export const notificationsApi = { setNotification, clearNotification, hasNotification, hasAnyNotification };

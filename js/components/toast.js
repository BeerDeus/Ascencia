// ===== Notifications flottantes (loot, alertes) — coin haut-droit, sous le header. =====
import { el, iconNode } from '../utils/dom.js';

let stack = null;
const DURATION_MS = 3200;

// Monté une fois au boot (voir main.js) dans #app — même convention que
// components/fab.js (position:absolute ancrée à la colonne du jeu, pas au viewport).
export function mountToasts(app) {
  stack = el('div.toast-stack');
  app.append(stack);
}

// type: 'loot' (défaut, doré) | 'warning' (rouge, ex: inventaire plein)
export function showToast(text, { icon = null, type = 'loot' } = {}) {
  if (!stack) return;
  const node = el('div.toast' + (type === 'warning' ? '.toast-warning' : ''), {}, [
    icon ? iconNode(icon, 'toast-icon') : null,
    el('span.toast-text', { text }),
  ]);
  stack.append(node);
  requestAnimationFrame(() => node.classList.add('in'));
  setTimeout(() => {
    node.classList.remove('in');
    node.classList.add('out');
    setTimeout(() => node.remove(), 250);
  }, DURATION_MS);
}

export const toastApi = { mountToasts, showToast };

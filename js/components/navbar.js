// ===== Barres de navigation (principale + contextuelle) =====
// Montées une seule fois puis patchées (classe .active) : évite le clear()+rebuild
// à chaque setState, qui provoquait un flash visible sur toute la nav.
import { el, iconNode } from '../utils/dom.js';
import { MAIN_NAV, SUBNAV } from '../config.js';
import { hasNotification, hasAnyNotification } from '../game/notifications.js';

let mainR = null;   // { root, buttons: {id: node}, badges: {id: node} }
let subR = null;    // { root, view, buttons: {id: node}, badges: {id: node} }

export function renderMainNav(root, activeView, onNav) {
  if (!mainR || mainR.root !== root) mainR = buildMainNav(root, onNav);
  for (const [id, btn] of Object.entries(mainR.buttons)) btn.classList.toggle('active', id === activeView);
  // Badge agrégé : allumé si une notification existe sur N'IMPORTE quel sub de cette
  // vue (ex: Forge → Village) — voir game/notifications.js hasAnyNotification().
  for (const [id, badge] of Object.entries(mainR.badges)) badge.classList.toggle('show', hasAnyNotification(id));
}

function buildMainNav(root, onNav) {
  const buttons = {}, badges = {};
  for (const item of MAIN_NAV) {
    const badge = el('span.nav-badge');
    badges[item.id] = badge;
    const iconEl = item.center
      ? el('div.icon-wrap', {}, [iconNode(item.icon), badge])
      : el('span.nav-icon-wrap', {}, [iconNode(item.icon, 'icon'), badge]);
    const btn = el('button.mainnav-item' + (item.center ? '.center' : ''), {
      onclick: () => onNav(item.id),
    }, [iconEl, el('span.label', { text: item.label })]);
    buttons[item.id] = btn;
    root.append(btn);
  }
  return { root, buttons, badges };
}

export function renderSubNav(root, view, activeSub, onSub) {
  const items = SUBNAV[view];
  if (!items) {
    subR = null;
    root.replaceChildren();
    root.style.display = 'none';
    return;
  }
  root.style.display = 'flex';
  if (!subR || subR.root !== root || subR.view !== view) subR = buildSubNav(root, view, items, onSub);
  for (const [id, btn] of Object.entries(subR.buttons)) btn.classList.toggle('active', id === activeSub);
  for (const [id, badge] of Object.entries(subR.badges)) badge.classList.toggle('show', hasNotification(view, id));
}

function buildSubNav(root, view, items, onSub) {
  const buttons = {}, badges = {};
  // Deux groupes à 50% de part et d'autre d'un notch central → le notch reste
  // toujours aligné sur l'icon-wrap Aventure (centré), quel que soit le nb d'onglets.
  const mid = Math.ceil(items.length / 2);
  const left = el('div.subnav-group');
  const right = el('div.subnav-group.right');
  items.forEach((item, i) => {
    const badge = el('span.nav-badge');
    badges[item.id] = badge;
    const btn = el('button.subnav-item', {
      onclick: () => onSub(item.id),
    }, [el('span.nav-icon-wrap', {}, [iconNode(item.icon, 'icon'), badge]), el('span', { text: item.label })]);
    buttons[item.id] = btn;
    (i < mid ? left : right).append(btn);
  });
  root.replaceChildren(left, el('div.subnav-notch'), right);
  return { root, view, buttons, badges };
}

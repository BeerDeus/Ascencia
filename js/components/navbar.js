// ===== Barres de navigation (principale + contextuelle) =====
import { el, clear } from '../utils/dom.js';
import { MAIN_NAV, SUBNAV } from '../config.js';

export function renderMainNav(root, activeView, onNav) {
  clear(root);
  for (const item of MAIN_NAV) {
    const active = item.id === activeView;
    const icon = item.center
      ? el('div.icon-wrap', {}, [el('span', { text: item.icon })])
      : el('span.icon', { text: item.icon });
    root.append(
      el('button.mainnav-item' + (item.center ? '.center' : '') + (active ? '.active' : ''), {
        onclick: () => onNav(item.id),
      }, [icon, el('span.label', { text: item.label })])
    );
  }
}

export function renderSubNav(root, view, activeSub, onSub) {
  clear(root);
  const items = SUBNAV[view];
  if (!items) { root.style.display = 'none'; return; }
  root.style.display = 'flex';
  // Deux groupes à 50% de part et d'autre d'un notch central → le notch reste
  // toujours aligné sur l'icon-wrap Aventure (centré), quel que soit le nb d'onglets.
  const mid = Math.ceil(items.length / 2);
  const left = el('div.subnav-group');
  const right = el('div.subnav-group.right');
  items.forEach((item, i) => {
    const btn = el('button.subnav-item' + (item.id === activeSub ? '.active' : ''), {
      onclick: () => onSub(item.id),
    }, [el('span.icon', { text: item.icon }), el('span', { text: item.label })]);
    (i < mid ? left : right).append(btn);
  });
  root.append(left, el('div.subnav-notch'), right);
}

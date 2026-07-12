// ===== En-tête : avatar/niveau, PV, ressources, monnaie premium =====
import { el, clear, fmt } from '../utils/dom.js';
import { state } from '../state.js';

export function renderHeader(root) {
  clear(root);
  const p = state.player, r = state.resources;

  root.append(
    el('button.hdr-btn', { text: '☰', 'aria-label': 'Menu' }),

    el('div.hdr-avatar', {}, [
      el('span', { text: '🜁' }),
      el('span.lvl', { text: 'Lvl. ' + p.level }),
    ]),

    el('div.hp-pill', {}, [
      el('span.icon', { text: '❤️' }),
      el('span', { text: `${p.hp.cur}/${p.hp.max}` }),
    ]),

    el('div.hdr-res', {}, [
      el('div.res', {}, [el('span.icon', { text: '🪵' }), el('span', { text: fmt(r.bois) })]),
      el('div.res', {}, [el('span.icon', { text: '⛏️' }), el('span', { text: fmt(r.metal) })]),
      el('div.res', {}, [el('span.icon', { text: '🧵' }), el('span', { text: fmt(r.tissu) })]),
      el('div.res', {}, [el('span.icon', { text: '🔩' }), el('span', { text: fmt(r.fragments) })]),
    ]),

    el('div.hdr-premium', {}, [
      el('span.icon', { text: '🪙' }),
      el('span', { text: fmt(r.or) }),
    ]),
  );
}

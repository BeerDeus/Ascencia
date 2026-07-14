// ===== Composant carte de menu (Forge, Alchimiste, Marchand...) =====
import { el, iconNode } from '../utils/dom.js';

// menuCard({id,title,icon,status,desc,full,locked}, onClick)
export function menuCard(data, onClick) {
  const cls = 'button.menu-card' + (data.full ? '.full' : '') + (data.locked ? '.locked' : '');
  return el(cls, {
    dataset: { id: data.id },
    onclick: () => onClick && onClick(data),
  }, [
    el('div.mc-title', {}, [
      iconNode(data.icon, 'icon'),
      el('span', { text: data.title }),
    ]),
    el('div.mc-sep'),
    data.status ? el('div.mc-status', { text: data.status }) : null,
    data.desc ? el('div.mc-desc', { text: data.desc }) : null,
  ]);
}

// panel({ title }, children) — bloc de quartier avec titre doré
export function panel(title, children, { collapsible = false, collapsed = false } = {}) {
  const head = el('div.panel-head', {}, [
    el('h2.section-title', { text: title }),
    collapsible ? el('span.panel-toggle', { text: collapsed ? '▼' : '▲' }) : null,
  ]);
  const body = el('div.body', {}, children);
  const p = el('section.panel' + (collapsible ? '.collapse-card' : '') + (collapsed ? '.collapsed' : ''), {}, [head, body]);

  if (collapsible) {
    head.style.cursor = 'pointer';
    head.addEventListener('click', () => {
      const isCol = p.classList.toggle('collapsed');
      const t = head.querySelector('.panel-toggle');
      if (t) t.textContent = isCol ? '▼' : '▲';
      body.style.maxHeight = isCol ? '0' : body.scrollHeight + 'px';
    });
    // init maxHeight pour transition fluide
    requestAnimationFrame(() => { if (!collapsed) body.style.maxHeight = body.scrollHeight + 'px'; });
  }
  return p;
}

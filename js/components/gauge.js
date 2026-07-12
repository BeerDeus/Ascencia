// ===== Composant jauge de progression réutilisable =====
import { el, clamp } from '../utils/dom.js';

// gauge({ type:'hp'|'tempo'|'xp'|'', value, max, label, showValue })
export function gauge({ type = '', value = 0, max = 100, label = null, showValue = false } = {}) {
  const pct = max > 0 ? clamp((value / max) * 100, 0, 100) : 0;
  const fill = el('div.fill');
  fill.style.width = pct + '%';

  const bar = el('div.gauge' + (type ? '.' + type : ''), {}, [fill]);
  bar._fill = fill;

  if (!label && !showValue) return bar;

  const head = el('div.gauge-label', {}, [
    el('span', { text: label || '' }),
    showValue ? el('span', { text: `${Math.round(value)}/${max}` }) : null,
  ]);
  const wrap = el('div', {}, [head, bar]);
  wrap._fill = fill;
  return wrap;
}

// Met à jour une jauge existante (retournée par gauge()).
export function setGauge(node, value, max) {
  const fill = node._fill;
  if (!fill) return;
  const pct = max > 0 ? clamp((value / max) * 100, 0, 100) : 0;
  fill.style.width = pct + '%';
}

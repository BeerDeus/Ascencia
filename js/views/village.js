// ===== Vue Village (Hub + Forge + Cuisine) =====
import { el } from '../utils/dom.js';
import { VILLAGE, SUBNAV } from '../config.js';
import { menuCard, panel } from '../components/card.js';
import { navigateSub } from '../router.js';
import { ITEMS, RECIPES, RESOURCE_KEYS, craft, canCraft, invCount } from '../game/items.js';
import { state } from '../state.js';

const VILLAGE_SUBS = new Set(SUBNAV.village.map((s) => s.id));
const RES_ICON = { or: '🪙', bois: '🪵', metal: '⛏️', tissu: '🧵', fragments: '🔩' };
const STAT_ABR = { vie: 'Vie', force: 'For', agilite: 'Agi', chance: 'Cha', intelligence: 'Int', defense: 'Déf' };

export function renderVillage(root, sub = 'hub') {
  const view = el('div.view');

  if (sub === 'forge')     { renderCraft(view, 'forge',   'Forge du Forgeron', 'Forger'); root.append(view); return; }
  if (sub === 'cuisinier') { renderCraft(view, 'cuisine', 'Cuisine',           'Cuisiner'); root.append(view); return; }
  if (sub !== 'hub')       { view.append(comingSoon(sub)); root.append(view); return; }

  for (const q of VILLAGE) {
    const grid = el('div.card-grid', {}, q.cards.map((c) => menuCard(c, (d) => { if (VILLAGE_SUBS.has(d.id)) navigateSub(d.id); })));
    view.append(panel(q.quartier, [grid]));
  }
  root.append(view);
}

// ---------- Atelier de craft (Forge / Cuisine) ----------
function renderCraft(view, station, title, verb) {
  view.append(el('h2.section-title', { text: title }));
  const r = state.resources;
  view.append(el('div.craft-gold', { text: `🪙 ${r.or}  ·  🪵 ${r.bois}  ⛏️ ${r.metal}  🧵 ${r.tissu}  🔩 ${r.fragments}` }));

  for (const recipe of RECIPES[station]) {
    const out = ITEMS[recipe.out];
    const ok = canCraft(recipe);

    const costRow = el('div.craft-cost', {}, Object.entries(recipe.cost).map(([k, v]) => {
      if (RESOURCE_KEYS.includes(k)) return costChip(RES_ICON[k] || '•', v, state.resources[k] || 0);
      const it = ITEMS[k];
      return costChip(it ? it.icon : '•', v, invCount(k));
    }));

    const stats = out.weapon
      ? `${Object.entries(out.stats).map(([k, v]) => `+${v} ${STAT_ABR[k] || k}`).join(' · ')} · Tempo ${out.weapon.tempo}s · Note ${out.weapon.note}`
      : out.heal ? `+${out.heal} PV`
      : out.stats ? Object.entries(out.stats).map(([k, v]) => `+${v} ${STAT_ABR[k] || k}`).join(' · ')
      : '';

    view.append(el('div.craft-card' + (ok ? '' : '.disabled'), {}, [
      el('div.craft-head', {}, [
        el('span.craft-icon', { text: out.icon }),
        el('div.craft-info', {}, [
          el('div.craft-name', { text: out.name }),
          stats ? el('div.craft-stats', { text: stats }) : null,
        ]),
      ]),
      costRow,
      el('button.btn-craft', { disabled: ok ? null : 'true', text: `${verb} (${out.name})`, onclick: () => { craft(recipe); } }),
    ]));
  }
}

function costChip(icon, need, have) {
  const enough = have >= need;
  return el('span.cost-chip' + (enough ? '' : '.miss'), {}, [
    el('span', { text: icon }),
    el('span', { text: `${need}` }),
    el('span.cost-have', { text: `(${have})` }),
  ]);
}

function comingSoon(id) {
  return el('div', {}, [
    el('h2.section-title', { text: id }),
    el('div.placeholder-note', { text: 'Module « ' + id + ' » — à venir (Phase 5).' }),
  ]);
}

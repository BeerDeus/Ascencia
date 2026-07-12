// ===== Vue Profil (Personnage / Équipement / Codex / Maîtrise) =====
import { el, clamp } from '../utils/dom.js';
import { ATTRIBUTES, STAT_GROUPS, STATS } from '../config.js';
import { state } from '../state.js';
import { rerender } from '../router.js';
import { panel } from '../components/card.js';
import { gauge } from '../components/gauge.js';
import { derive, formatStat, allocate } from '../game/player.js';
import { ITEMS, SLOTS, SLOT_ROWS, equip, unequip, sellItem, invCount } from '../game/items.js';

// État UI local de l'onglet Équipement (persiste entre les re-renders).
let selectedTid = null;
let openSlot = null;
const PCT_KEYS = ['crit', 'critDmg', 'esquive', 'precision', 'resistance'];
const STAT_LBL = {
  vie: 'Vie', force: 'Force', agilite: 'Agilité', chance: 'Chance', intelligence: 'Intelligence', defense: 'Défense',
  attaque: 'Attaque', maxHp: 'PV', crit: 'Crit', critDmg: 'Dég.Crit', esquive: 'Esquive', precision: 'Toucher', resistance: 'Résist.', penetration: 'Pénét.', vitesse: 'Vitesse',
};

export function renderProfil(root, sub = 'personnage') {
  const view = el('div.view');
  if (sub === 'equipement') { renderEquipement(view); root.append(view); return; }
  if (sub === 'codex')   { view.append(placeholder('Codex', 'Bestiaire & lore — Phase 5.')); root.append(view); return; }
  if (sub === 'maitrise'){ view.append(placeholder('Maîtrise', 'Arbre de talents — Phase 6.')); root.append(view); return; }

  const p = state.player;

  // Carte niveau + XP
  view.append(el('section.card', { style: 'margin-bottom:16px;' }, [
    el('div', { style: 'display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;' }, [
      el('span', { class: 'power-score', text: `Niveau ${p.level}`, style: 'margin:0;' }),
      el('span.text-muted', { text: `${p.xp.cur} / ${p.xp.max} XP` }),
    ]),
    gauge({ type: 'xp', value: p.xp.cur, max: p.xp.max }),
  ]));

  // Attributs (repliable) — bouton + si des points sont à répartir
  const pts = p.attrPoints || 0;
  const attrRows = ATTRIBUTES.map((a) => {
    const right = [];
    if (a.alloc && pts > 0) right.push(el('button.attr-plus', { text: '+', title: `+1 ${a.label}`, onclick: () => allocate(a.key) }));
    right.push(el('span.value', { text: p.attributes[a.key] }));
    return el('div.stat-row', {}, [
      el('span.icon', { text: a.icon }),
      el('span.label', { text: a.label + ' :' }),
      el('span.attr-right', {}, right),
    ]);
  });
  const attrChildren = [];
  if (pts > 0) attrChildren.push(el('div.attr-points', { text: `Points à répartir : ${pts}` }));
  attrChildren.push(...attrRows);
  view.append(panel('Attributs', attrChildren, { collapsible: true }));

  // Statistiques détaillées (onglets pilotés par le catalogue STATS)
  const tabRoot = el('div');
  const tabContent = el('div');
  let activeTab = STAT_GROUPS[0].id;

  function renderTabs() {
    tabRoot.replaceChildren(el('div.tabs', {}, STAT_GROUPS.map((g) =>
      el('div.tab' + (g.id === activeTab ? '.active' : ''), {
        text: g.label,
        onclick: () => { activeTab = g.id; renderTabs(); renderContent(); },
      })
    )));
  }
  function renderContent() {
    const d = derive(p);
    const rows = STATS.filter((s) => s.group === activeTab).map((s) =>
      el('div.detail-row', {}, [
        el('span.k', {}, [el('span.icon', { text: s.icon }), el('span', { text: ' ' + s.label + ' :' })]),
        el('span.v', { text: formatStat(s.fmt, d[s.key]) }),
      ])
    );
    const children = [];
    if (activeTab === 'combat') {
      children.push(el('div.power-score', { text: 'Score de Puissance : ' + d.puissance + ' 💪' }));
    }
    children.push(...rows);
    tabContent.replaceChildren(...children);
  }
  renderTabs(); renderContent();
  view.append(panel('Statistiques détaillées', [tabRoot, tabContent], { collapsible: true }));

  root.append(view);
}

// ---------- Onglet Équipement ----------
function renderEquipement(view) {
  const p = state.player;

  // Paperdoll (emplacements)
  view.append(el('h2.section-title', { text: 'Équipement' }));
  const doll = el('div.paperdoll');
  for (const row of SLOT_ROWS) {
    const r = el('div.doll-row');
    for (const sid of row) {
      const slot = SLOTS.find((s) => s.id === sid);
      const inst = p.equipment[sid];
      const it = inst ? ITEMS[inst.tid] : null;
      r.append(el('button.doll-slot' + (it ? '.filled' : ''), {
        title: slot.label, onclick: () => { openSlot = sid; selectedTid = null; rerender(); },
      }, [
        it ? el('span.ds-icon', { text: it.icon }) : el('span.ds-ab', { text: slot.ab }),
        (it && inst.count > 1) ? el('span.ds-count', { text: String(inst.count) }) : null,
      ]));
    }
    doll.append(r);
  }
  view.append(doll);

  // Sacs & Sacoches
  view.append(el('h2.section-title', { text: 'Sacs & Sacoches' }));
  const grid = el('div.bag-grid');
  const stacks = state.inventory;
  const cells = Math.max(16, Math.ceil((stacks.length + 1) / 8) * 8);
  for (let i = 0; i < cells; i++) {
    const st = stacks[i];
    if (st && ITEMS[st.tid]) {
      const it = ITEMS[st.tid];
      grid.append(el('button.bag-cell.filled' + (selectedTid === st.tid ? '.sel' : ''), {
        onclick: () => { selectedTid = st.tid; openSlot = null; rerender(); },
      }, [
        el('span.bc-icon', { text: it.icon }),
        st.count > 1 ? el('span.bc-count', { text: String(st.count) }) : null,
      ]));
    } else grid.append(el('div.bag-cell.empty'));
  }
  view.append(grid);

  if (selectedTid && ITEMS[selectedTid] && invCount(selectedTid) > 0) view.append(itemDetail(selectedTid));
  if (openSlot) view.append(slotModal(openSlot));
}

function statChips(stats) {
  return Object.entries(stats || {}).map(([k, v]) => chip('', (v > 0 ? '+' : '') + v + (PCT_KEYS.includes(k) ? '%' : '') + ' ' + (STAT_LBL[k] || k)));
}
function itemChips(it) {
  if (it.weapon) return [...statChips(it.stats), chip('⏱️', 'Tempo ' + it.weapon.tempo + 's'), chip('🎵', 'Note ' + it.weapon.note)];
  if (it.kind === 'conso') return [chip('💚', '+' + it.heal + ' PV')];
  const chips = statChips(it.stats);
  if (!chips.length) chips.push(chip('📦', 'Matériau'));
  return chips;
}
const chip = (ic, txt) => el('span.stat-chip', {}, [ic ? el('span.sc-ic', { text: ic }) : null, el('span', { text: txt })]);

function equipTargetName(it) {
  if (it.kind === 'conso') { const c = state.player.equipment.conso; return c ? ITEMS[c.tid].name : null; }
  const cands = SLOTS.filter((s) => s.kind === it.kind);
  if (!cands.length) return null;
  const target = cands.find((s) => !state.player.equipment[s.id]) || cands[0];
  const cur = state.player.equipment[target.id];
  return cur ? ITEMS[cur.tid].name : null;
}

function itemDetail(tid) {
  const it = ITEMS[tid];
  const card = el('div.item-detail');
  card.append(el('div.id-head', {}, [
    el('span.id-icon', { text: it.icon }),
    el('span.id-name', { text: it.name }),
  ]));
  card.append(el('div.id-chips', {}, itemChips(it)));

  if (it.kind !== 'materiau') {
    const repl = equipTargetName(it);
    card.append(el('div.id-equip-row', {}, [
      el('button.btn-equip', { text: "Équiper l'objet", onclick: () => { equip(tid); } }),
      el('span.id-replace', {}, [el('span', { text: 'Remplacera : ' }), el('span.repl' + (repl ? '' : '.none'), { text: repl || 'Rien' })]),
    ]));
  }

  // Vente (quantité réglable)
  const max = invCount(tid);
  const range = el('input.sell-range', { type: 'range', min: '1', max: String(max), value: '1' });
  const sellBtn = el('button.btn-sell', { text: `Vendre (${it.sell} 🪙)`, onclick: () => { const q = clamp(parseInt(range.value, 10) || 1, 1, invCount(tid)); sellItem(tid, q); } });
  const qtyLbl = el('span.sell-qty', { text: `1 / ${max}` });
  const sync = () => { const q = parseInt(range.value, 10) || 1; qtyLbl.textContent = `${q} / ${max}`; sellBtn.textContent = `Vendre (${it.sell * q} 🪙)`; };
  range.addEventListener('input', sync);
  card.append(el('div.id-sell-row', {}, [range, qtyLbl, el('button.btn-max', { text: 'Max', onclick: () => { range.value = String(max); sync(); } })]));
  card.append(sellBtn);
  if (it.desc) card.append(el('div.id-desc', { text: it.desc }));
  return card;
}

function slotModal(slotId) {
  const slot = SLOTS.find((s) => s.id === slotId);
  const overlay = el('div.modal-overlay', { onclick: (e) => { if (e.target === overlay) { openSlot = null; rerender(); } } });
  const box = el('div.modal-box');
  box.append(el('div.modal-title', { text: slot.label }));

  const cur = state.player.equipment[slotId];
  if (cur) box.append(el('button.modal-item.current', { onclick: () => { openSlot = null; unequip(slotId); } }, [
    el('span.mi-icon', { text: ITEMS[cur.tid].icon }),
    el('span.mi-name', { text: 'Déséquiper — ' + ITEMS[cur.tid].name }),
  ]));

  const compat = state.inventory.filter((st) => ITEMS[st.tid] && ITEMS[st.tid].kind === slot.kind);
  if (!compat.length && !cur) box.append(el('div.placeholder-note', { text: 'Aucun objet compatible dans le sac.' }));
  for (const st of compat) {
    const it = ITEMS[st.tid];
    box.append(el('button.modal-item', { onclick: () => { openSlot = null; equip(st.tid, slotId); } }, [
      el('span.mi-icon', { text: it.icon }),
      el('span.mi-name', { text: it.name + (st.count > 1 ? ` ×${st.count}` : '') }),
      el('span.mi-chips', {}, itemChips(it)),
    ]));
  }
  box.append(el('button.modal-close', { text: 'Fermer', onclick: () => { openSlot = null; rerender(); } }));
  overlay.append(box);
  return overlay;
}

function placeholder(title, txt) {
  return el('div', {}, [el('h2.section-title', { text: title }), el('div.placeholder-note', { text: txt })]);
}

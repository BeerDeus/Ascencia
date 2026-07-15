// ===== Vue Profil (Personnage / Équipement) =====
import { el, clamp, iconNode } from '../utils/dom.js';
import { ATTRIBUTES, STAT_GROUPS, STATS } from '../config.js';
import { state } from '../state.js';
import { rerender } from '../router.js';
import { panel } from '../components/card.js';
import { gauge, setGauge } from '../components/gauge.js';
import { derive, formatStat, allocate, activePotionBuffs } from '../game/player.js';
import { ITEMS, SLOTS, SLOT_ROWS, equip, unequip, useConsumable, drinkPotion, sellItem, invCount, inventoryCapacity, nextSlotCost, buyInventorySlot } from '../game/items.js';
import { ACCORDS, noteById } from '../game/symphony.js';
import { showInfoModal } from '../components/infoModal.js';

const SUB_LABEL = { off: 'Offensif', def: 'Défensif' };

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
  if (sub === 'equipement') { const upd = renderEquipement(view); root.append(view); return upd; }

  const update = renderPersonnage(view);
  root.append(view);
  return update; // le routeur patchera via update() tant qu'on reste sur cette vue (pas de flash)
}

// ---------- Onglet Personnage (Vie / XP / Attributs / Stats) ----------
// Construit le DOM une seule fois et garde des refs vers chaque noeud dynamique ;
// update() ne fait que patcher texte/gauges — jamais de rebuild (évite le flash
// à chaque setState : régén de Vie, allocation de points, etc.).
function renderPersonnage(view) {
  const refs = {};
  let activeTab = STAT_GROUPS[0].id;

  // Vie (persistante hors combat — pas de pleine régén entre les combats)
  const hpGauge = gauge({ type: 'hp', value: 0, max: 1 });
  refs.hpTxt = el('span.text-muted', { text: '' });
  view.append(el('section.card', { style: 'margin-bottom:16px;' }, [
    el('div', { style: 'display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;' }, [
      el('span', { class: 'power-score', text: 'Vie', style: 'margin:0;' }),
      refs.hpTxt,
    ]),
    hpGauge,
  ]));
  refs.hpGauge = hpGauge;

  // Effets actifs (Potions, Alchimiste) — masqué si aucun buff en cours. Rafraîchi
  // par update() (tout setState) + un tick local 1s tant que la vue reste montée
  // (même pattern que la boucle d'affichage du Minage, village.js) pour que le
  // compte à rebours ne reste pas figé entre deux mutations d'état.
  refs.buffsBox = el('div.id-chips', { style: 'margin-bottom:16px;' });
  view.append(refs.buffsBox);

  // Niveau + XP
  const xpGauge = gauge({ type: 'xp', value: 0, max: 1 });
  refs.lvlTxt = el('span', { class: 'power-score', text: '', style: 'margin:0;' });
  refs.xpTxt = el('span.text-muted', { text: '' });
  view.append(el('section.card', { style: 'margin-bottom:16px;' }, [
    el('div', { style: 'display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;' }, [
      refs.lvlTxt, refs.xpTxt,
    ]),
    xpGauge,
  ]));
  refs.xpGauge = xpGauge;

  // Attributs (repliable) — bouton + si des points sont à répartir
  refs.attrPointsEl = el('div.attr-points', { text: '' });
  refs.attrRows = {};
  const attrRows = ATTRIBUTES.map((a) => {
    const plus = a.alloc ? el('button.attr-plus', { text: '+', title: `+1 ${a.label}`, onclick: () => allocate(a.key) }) : null;
    const value = el('span.value', { text: '' });
    refs.attrRows[a.key] = { plus, value };
    // Icône + label cliquables (une seule cible tap) : ouvre la modale d'info
    // (description + comment en obtenir plus, voir config.js ATTRIBUTES.desc/more).
    const trigger = el('button.stat-row-trigger', {
      onclick: () => showInfoModal({
        icon: a.icon, title: a.label,
        value: `Valeur actuelle : ${state.player.attributes[a.key]}`,
        desc: a.desc, more: a.more,
      }),
    }, [iconNode(a.icon, 'icon'), el('span.label', { text: a.label + ' :' })]);
    return el('div.stat-row', {}, [
      trigger,
      el('span.attr-right', {}, [plus, value].filter(Boolean)),
    ]);
  });
  view.append(panel('Attributs', [refs.attrPointsEl, ...attrRows], { collapsible: true }));

  // Statistiques détaillées (onglets pilotés par le catalogue STATS)
  const tabRoot = el('div');
  const tabContent = el('div');
  refs.statRows = {};
  refs.powerScoreEl = null;

  function renderTabs() {
    tabRoot.replaceChildren(el('div.tabs', {}, STAT_GROUPS.map((g) =>
      el('div.tab' + (g.id === activeTab ? '.active' : ''), {
        text: g.label,
        onclick: () => { activeTab = g.id; renderTabs(); renderContent(); syncStats(); },
      })
    )));
  }
  // Sous-titres Offensif/Défensif (groupe Combat uniquement, voir config.js STATS[].sub)
  // — regroupe les stats par intention plutôt que la liste plate d'origine.
  function renderContent() {
    refs.statRows = {};
    refs.powerScoreEl = null;
    const rows = [];
    let lastSub;
    for (const s of STATS.filter((x) => x.group === activeTab)) {
      if (s.sub && s.sub !== lastSub) { rows.push(el('div.stat-subhead', { text: SUB_LABEL[s.sub] || s.sub })); lastSub = s.sub; }
      const v = el('span.v', { text: '' });
      refs.statRows[s.key] = v;
      // Clic sur icône/label : modale d'info (description + comment en obtenir plus).
      const trigger = el('button.stat-row-trigger', {
        onclick: () => {
          const d = derive(state.player);
          showInfoModal({ icon: s.icon, title: s.label, value: `Valeur actuelle : ${formatStat(s.fmt, d[s.key])}`, desc: s.desc, more: s.more });
        },
      }, [iconNode(s.icon, 'icon'), el('span', { text: ' ' + s.label + ' :' })]);
      rows.push(el('div.detail-row', {}, [trigger, v]));
    }
    const children = [];
    if (activeTab === 'combat') {
      refs.powerScoreEl = el('div.power-score', { text: '' });
      children.push(refs.powerScoreEl);
    }
    children.push(...rows);
    tabContent.replaceChildren(...children);
  }
  renderTabs(); renderContent();
  view.append(panel('Statistiques détaillées', [tabRoot, tabContent], { collapsible: true }));

  function syncVie() {
    const p = state.player;
    const d = derive(p);
    const regenPerMin = Math.round(d.regenHors * 60 * 10) / 10;
    refs.hpTxt.textContent = `${Math.ceil(p.combatHp.cur)} / ${d.maxHp}  ·  +${regenPerMin} PV/min`;
    setGauge(refs.hpGauge, p.combatHp.cur, d.maxHp);
  }
  function syncXp() {
    const p = state.player;
    refs.lvlTxt.textContent = `Niveau ${p.level}`;
    refs.xpTxt.textContent = `${p.xp.cur} / ${p.xp.max} XP`;
    setGauge(refs.xpGauge, p.xp.cur, p.xp.max);
  }
  function syncAttrs() {
    const p = state.player;
    const pts = p.attrPoints || 0;
    refs.attrPointsEl.textContent = pts > 0 ? `Points à répartir : ${pts}` : '';
    refs.attrPointsEl.style.display = pts > 0 ? '' : 'none';
    for (const a of ATTRIBUTES) {
      const r = refs.attrRows[a.key];
      r.value.textContent = p.attributes[a.key];
      if (r.plus) r.plus.style.display = pts > 0 ? '' : 'none';
    }
  }
  function syncStats() {
    const d = derive(state.player);
    if (refs.powerScoreEl) refs.powerScoreEl.textContent = 'Score de Puissance : ' + d.puissance;
    for (const [k, node] of Object.entries(refs.statRows)) {
      const s = STATS.find((x) => x.key === k);
      node.textContent = formatStat(s.fmt, d[k]);
    }
  }
  function syncBuffs() {
    const buffs = activePotionBuffs(state.player);
    refs.buffsBox.style.display = buffs.length ? '' : 'none';
    refs.buffsBox.replaceChildren(...buffs.map((b) =>
      chip('', `${STAT_LBL[b.stat] || b.stat} +${b.pct}% — ${Math.ceil(b.msLeft / 1000)}s`)
    ));
  }

  function update() { syncVie(); syncXp(); syncAttrs(); syncStats(); syncBuffs(); }
  update();
  // Tick local (1s) tant que la vue reste montée : fait vivre le compte à rebours
  // des buffs sans dépendre d'un setState externe (voir commentaire plus haut).
  const buffTimer = setInterval(() => {
    if (!document.body.contains(view)) { clearInterval(buffTimer); return; }
    syncBuffs();
  }, 1000);
  return update;
}

// ---------- Onglet Équipement ----------
// Reconstruction interne complète (paperdoll + sac + modale), mais seulement
// quand quelque chose de pertinent a changé (signature) — pas à chaque tick de
// régén de Vie/Endurance qui ne touche ni l'équipement ni l'inventaire.
function renderEquipement(view) {
  let sig = null;

  function computeSig() {
    return JSON.stringify(state.player.equipment) + '|' + JSON.stringify(state.inventory) + '|' + state.inventorySlots + '|' + state.resources.or + '|' + selectedTid + '|' + openSlot;
  }

  function build() {
    view.replaceChildren();
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
          it ? iconNode(it.icon, 'ds-icon') : el('span.ds-ab', { text: slot.ab }),
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
    const capacity = inventoryCapacity();
    const cells = Math.max(capacity, stacks.length); // sauvegardes antérieures éventuellement au-delà du cap
    for (let i = 0; i < cells; i++) {
      const st = stacks[i];
      if (st && ITEMS[st.tid]) {
        const it = ITEMS[st.tid];
        grid.append(el('button.bag-cell.filled' + (selectedTid === st.tid ? '.sel' : ''), {
          onclick: () => { selectedTid = st.tid; openSlot = null; rerender(); },
        }, [
          iconNode(it.icon, 'bc-icon'),
          st.count > 1 ? el('span.bc-count', { text: String(st.count) }) : null,
        ]));
      } else if (i < capacity) grid.append(el('div.bag-cell.empty'));
    }
    view.append(grid);

    const slotCost = nextSlotCost();
    const canAfford = state.resources.or >= slotCost;
    view.append(el('div.bag-buy-row', {}, [
      el('div.bag-capacity', { text: `${stacks.length} / ${capacity} emplacements` }),
      el('button.btn-buy-slot', {
        text: `+1 emplacement (${slotCost} or)`,
        disabled: canAfford ? null : 'true',
        onclick: () => buyInventorySlot(),
      }),
    ]));

    if (selectedTid && ITEMS[selectedTid] && invCount(selectedTid) > 0) view.append(itemDetail(selectedTid));
    if (openSlot) view.append(slotModal(openSlot));

    sig = computeSig();
  }

  build();
  function update() {
    if (computeSig() === sig) return; // rien de pertinent n'a changé (ex: tick de régén) — pas de rebuild
    build();
  }
  return update;
}

function statChips(stats) {
  return Object.entries(stats || {}).map(([k, v]) => chip('', (v > 0 ? '+' : '') + v + (PCT_KEYS.includes(k) ? '%' : '') + ' ' + (STAT_LBL[k] || k)));
}
function itemChips(it) {
  if (it.weapon) return [...statChips(it.stats), chip('', 'Tempo ' + it.weapon.tempo + 's'), chip('', 'Note ' + it.weapon.note)];
  if (it.kind === 'conso') return [chip('assets/sprites/icons/vie.png', '+' + it.heal + ' PV')];
  if (it.kind === 'energie') return [chip('assets/sprites/icons/stamina.png', '+' + it.endurance + ' Endurance')];
  if (it.kind === 'potion') return [chip('', `+${it.pct}% ${STAT_LBL[it.stat] || it.stat}`), chip('', `${Math.round(it.ms / 1000)}s`)];
  if (it.kind === 'symphonie') {
    const a = ACCORDS.find((x) => x.id === it.id);
    const motif = a ? a.pattern.map((nid) => noteById(nid).label).join(' · ') : '';
    return [chip('', motif ? `Motif : ${motif}` : 'Symphonie')];
  }
  const chips = statChips(it.stats);
  if (!chips.length) chips.push(chip('', 'Matériau'));
  return chips;
}
const chip = (ic, txt) => el('span.stat-chip', {}, [ic ? iconNode(ic, 'sc-ic icon') : null, el('span', { text: txt })]);

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
    iconNode(it.icon, 'id-icon'),
    el('span.id-name', { text: it.name }),
  ]));
  card.append(el('div.id-chips', {}, itemChips(it)));

  if (it.kind === 'energie') {
    // Pas d'équipement (aucun slot dédié) : consommation immédiate depuis le sac.
    card.append(el('div.id-equip-row', {}, [
      el('button.btn-equip', { text: `Consommer (+${it.endurance} Endurance)`, onclick: () => { useConsumable(tid); } }),
    ]));
  } else if (it.kind === 'potion') {
    // Idem : pas de slot dédié, buff temporaire posé immédiatement (voir game/player.js
    // potionBonuses() — un seul buff actif par stat, boire à nouveau prolonge la durée).
    card.append(el('div.id-equip-row', {}, [
      el('button.btn-equip', { text: `Boire (+${it.pct}% ${STAT_LBL[it.stat] || it.stat}, ${Math.round(it.ms / 1000)}s)`, onclick: () => { drinkPotion(tid); } }),
    ]));
  } else if (it.kind !== 'materiau') {
    const repl = equipTargetName(it);
    card.append(el('div.id-equip-row', {}, [
      el('button.btn-equip', { text: "Équiper l'objet", onclick: () => { equip(tid); } }),
      el('span.id-replace', {}, [el('span', { text: 'Remplacera : ' }), el('span.repl' + (repl ? '' : '.none'), { text: repl || 'Rien' })]),
    ]));
  }

  // Vente (quantité réglable) — masquée pour les objets non vendables (ex: Symphonies)
  if (it.sell > 0) {
    const max = invCount(tid);
    const range = el('input.sell-range', { type: 'range', min: '1', max: String(max), value: '1' });
    const sellBtn = el('button.btn-sell', { text: `Vendre (${it.sell} or)`, onclick: () => { const q = clamp(parseInt(range.value, 10) || 1, 1, invCount(tid)); sellItem(tid, q); } });
    const qtyLbl = el('span.sell-qty', { text: `1 / ${max}` });
    const sync = () => { const q = parseInt(range.value, 10) || 1; qtyLbl.textContent = `${q} / ${max}`; sellBtn.textContent = `Vendre (${it.sell * q} or)`; };
    range.addEventListener('input', sync);
    card.append(el('div.id-sell-row', {}, [range, qtyLbl, el('button.btn-max', { text: 'Max', onclick: () => { range.value = String(max); sync(); } })]));
    card.append(sellBtn);
  }
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
    iconNode(ITEMS[cur.tid].icon, 'mi-icon'),
    el('span.mi-name', { text: 'Déséquiper — ' + ITEMS[cur.tid].name }),
  ]));

  const compat = state.inventory.filter((st) => ITEMS[st.tid] && ITEMS[st.tid].kind === slot.kind);
  if (!compat.length && !cur) box.append(el('div.placeholder-note', { text: 'Aucun objet compatible dans le sac.' }));
  for (const st of compat) {
    const it = ITEMS[st.tid];
    box.append(el('button.modal-item', { onclick: () => { openSlot = null; equip(st.tid, slotId); } }, [
      iconNode(it.icon, 'mi-icon'),
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

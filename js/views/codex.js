// ===== Vue Codex : Bestiaire (fiches monstres) + Maîtrise (voies de progression) =====
import { el, iconNode } from '../utils/dom.js';
import { state } from '../state.js';
import { STATS } from '../config.js';
import { statRangeFor } from '../game/monsters.js';
import {
  codexEntry, discoverableIds, foundIn, dominantAttr, kills, resourceInfoFor,
  MASTERY_TRACKS, masteryBonuses, ATTR_LABEL,
} from '../game/codex.js';
import { LORE_FRAGMENTS, isUnlocked } from '../game/lore.js';

const STAT_LABEL = Object.fromEntries(STATS.map((s) => [s.key, s.label]));

export function renderCodex(root, sub = 'bestiaire') {
  const view = el('div.view');
  const upd = sub === 'maitrise' ? renderMaitrise(view) : sub === 'recits' ? renderRecits(view) : renderBestiaire(view);
  root.append(view);
  return upd;
}

// ---------- Sprite (image ou emoji), même logique que views/aventure.js ----------
function spriteNode(sprite, cls = 'sprite-img') {
  if (sprite && (sprite === 'placeholder' || sprite.includes('/') || sprite.endsWith('.png'))) {
    return el('img.' + cls, { src: sprite === 'placeholder' ? 'assets/sprites/placeholder.png' : sprite, alt: '' });
  }
  return el('img.' + cls, { src: 'assets/sprites/placeholder.png', alt: '' });
}

// ---------- Bestiaire : grille + modale — signature-guard sur monsterWins ----------
function renderBestiaire(view) {
  const head = el('div');
  const grid = el('div.codex-grid');
  const modalSlot = el('div');
  view.append(head, grid, modalSlot);

  let openId = null;
  let sig = null;
  const computeSig = () => JSON.stringify(state.monsterWins);

  function buildGrid() {
    sig = computeSig();
    const ids = discoverableIds();
    const discovered = ids.filter((id) => kills(id) > 0);
    head.replaceChildren(
      el('h2.section-title', { text: 'Codex' }),
      el('div.codex-progress', { text: `${discovered.length} / ${ids.length} espèces découvertes` }),
    );
    grid.replaceChildren(...ids.map((id) => buildCard(id)));
  }

  function buildCard(id) {
    const k = kills(id);
    if (k <= 0) {
      return el('div.codex-card.locked', {}, [
        el('img.sprite-img', { src: 'assets/sprites/placeholder.png', alt: '' }),
        el('div.codex-card-name', { text: '???' }),
      ]);
    }
    const e = codexEntry(id);
    return el('div.codex-card', { onclick: () => { openId = id; syncModal(); } }, [
      spriteNode(e.sprite),
      el('div.codex-card-name', { text: e.name }),
      el('div.codex-card-kills', { text: `${k} tués` }),
    ]);
  }

  function syncModal() {
    modalSlot.replaceChildren(...(openId ? [buildModal(openId, () => { openId = null; syncModal(); })] : []));
  }

  function update() {
    const s = computeSig();
    if (s !== sig) { buildGrid(); if (openId) syncModal(); }
  }
  buildGrid();
  return update;
}

// ---- Modale de fiche : Description (dès la découverte) + 4 paliers verrouillables ----
function buildModal(id, onClose) {
  const e = codexEntry(id);
  const k = kills(id);
  const overlay = el('div.modal-overlay', { onclick: (ev) => { if (ev.target === overlay) onClose(); } });
  const box = el('div.modal-box.codex-modal', {}, [
    el('div.codex-modal-head', {}, [
      spriteNode(e.sprite, 'codex-modal-sprite'),
      el('div', {}, [
        el('div.codex-modal-name', { text: e.name }),
        el('div.codex-modal-kills', { text: `Tué ${k} fois` }),
      ]),
    ]),
    el('div.codex-section', {}, [
      el('div.codex-sec-title', { text: 'Description' }),
      el('div.codex-sec-body', { text: e.desc || 'Aucune description enregistrée.' }),
    ]),
    lockedSection('Trouvé dans', 50, k, () => el('div.codex-sec-body', { text: foundIn(id).join(' · ') || 'Inconnu' })),
    lockedSection('Statistiques de Base', 100, k, () => statsNode(id)),
    lockedSection('Ressource Premium', 500, k, () => resourceNode(id)),
    lockedSection('Bonus', 1000, k, () => bonusNode(e)),
    el('button.modal-close', { text: 'Fermer', onclick: onClose }),
  ]);
  overlay.append(box);
  return overlay;
}

function lockedSection(title, req, k, buildContent) {
  const unlocked = k >= req;
  return el('div.codex-section', {}, [
    el('div.codex-sec-title', { text: title }),
    unlocked
      ? buildContent()
      : el('div.codex-locked', { text: `Tuez cet ennemi ${req} fois pour débloquer cette information. (${Math.min(k, req)} / ${req})` }),
  ]);
}

function statsNode(id) {
  const r = statRangeFor(id);
  if (!r) return el('div.codex-sec-body', { text: '—' });
  return el('div.codex-sec-body', { text: `PV ${r.hp[0]}-${r.hp[1]} · Attaque ${r.atk[0]}-${r.atk[1]} · Défense ${r.defense} · Tempo ${r.tempo.toFixed(2)}s` });
}

function resourceNode(id) {
  const { lines } = resourceInfoFor(id);
  return el('div', {}, [
    el('div.codex-sec-body', { text: lines.length ? lines.join(' · ') : 'Aucune ressource spécifique.' }),
    el('div.codex-sec-bonus', { text: "Passif actif : +1% Trouvaille d'or" }),
  ]);
}

function bonusNode(e) {
  const d = dominantAttr(e.attrs || {});
  return el('div.codex-sec-bonus', { text: `+1 ${ATTR_LABEL[d] || d} (permanent, actif)` });
}

// ---------- Maîtrise : 4 voies, paliers cumulatifs — signature-guard sur monsterWins ----------
function renderMaitrise(view) {
  const head = el('div', {}, [el('h2.section-title', { text: 'Maîtrise' })]);
  const bonusBox = el('div.mastery-bonus-box');
  const tracksBox = el('div');
  view.append(head, bonusBox, tracksBox);

  let sig = null;
  const computeSig = () => JSON.stringify(state.monsterWins);

  function build() {
    sig = computeSig();
    const wins = state.monsterWins;
    const { flat, pct } = masteryBonuses(wins);
    const chips = [
      ...Object.entries(flat).map(([k, v]) => `+${v} ${ATTR_LABEL[k] || k}`),
      ...Object.entries(pct).map(([k, v]) => `+${v}% ${STAT_LABEL[k] || k}`),
    ];
    bonusBox.replaceChildren(
      el('div.mastery-bonus-title', { text: 'Bonus Actifs' }),
      chips.length
        ? el('div.mastery-bonus-chips', {}, chips.map((c) => el('span.cost-chip', { text: c })))
        : el('div.placeholder-note', { text: 'Aucun bonus actif pour le moment — pars à la chasse !' }),
    );
    tracksBox.replaceChildren(...MASTERY_TRACKS.map((t) => buildTrack(t, wins)));
  }

  function buildTrack(t, wins) {
    const c = t.counter(wins);
    const rows = t.tiers.map((tier) => {
      const done = c >= tier.req;
      return el('div.mastery-tier' + (done ? '.done' : ''), {}, [
        el('div.mt-label', { text: tier.label }),
        el('div.mt-req', { text: `${Math.min(c, tier.req)} / ${tier.req}` }),
        el('div.mt-reward', { text: tier.txt }),
      ]);
    });
    return el('div.mastery-track', {}, [
      el('div.mastery-track-head', {}, [
        iconNode(t.icon, 'mastery-track-icon'),
        el('div', {}, [
          el('div.mastery-track-name', { text: t.name }),
          el('div.mastery-track-desc', { text: t.desc }),
        ]),
      ]),
      ...rows,
    ]);
  }

  function update() { if (computeSig() !== sig) build(); }
  build();
  return update;
}

// ---------- Récits (Fragments d'Écho) : liste + panneau de lecture, façon Codex ----------
function renderRecits(view) {
  const head = el('h2.section-title', { text: 'Récits' });
  const layout = el('div.recits-layout');
  view.append(head, layout);

  let openId = null;
  let sig = null;
  const computeSig = () => JSON.stringify(state.monsterWins) + '|' + state.progress.unlocked + '|' + JSON.stringify(state.progress.bossDefeated);

  function build() {
    sig = computeSig();
    const sidebar = el('div.recits-sidebar', {}, LORE_FRAGMENTS.map((f) => {
      const unlocked = isUnlocked(f, state);
      return el('button.recit-entry' + (unlocked ? '' : '.locked') + (openId === f.id ? '.active' : ''), {
        disabled: unlocked ? null : 'true',
        onclick: () => { if (unlocked) { openId = f.id; build(); } },
      }, [
        el('div.recit-entry-title', { text: unlocked ? f.title : 'Fragment Inconnu' }),
        el('div.recit-entry-sub', { text: unlocked ? `Chapitre ${f.chapter}` : f.unlockLabel }),
      ]);
    }));

    const f = openId ? LORE_FRAGMENTS.find((x) => x.id === openId) : null;
    const content = (f && isUnlocked(f, state))
      ? el('div.recits-content', {}, [
          el('div.recit-chapter', { text: `Chapitre ${f.chapter}` }),
          el('h3.recit-title', { text: f.title }),
          el('p.recit-text', { text: f.text }),
          el('div.recit-reward', { text: `Bonus permanent actif : ${f.rewardTxt}` }),
        ])
      : el('div.recits-content.empty', { text: "Sélectionnez un fragment d'écho pour écouter sa résonance..." });

    layout.replaceChildren(sidebar, content);
  }

  function update() { if (computeSig() !== sig) build(); }
  build();
  return update;
}

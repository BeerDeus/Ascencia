// ===== Vue Ascension (Profil > Ascension) — Constellations / Prestige (Phase 6) =====
// Deux modes : normal (résumé + CTA, dans le flux Profil habituel) et plein écran
// (viewport pannable + HUD points, masque header/subnav/mainnav — voir router.js
// #app.constellation-mode, même principe que le Combat plein écran). Le plein écran
// s'ouvre automatiquement après une Ascension confirmée, ou manuellement via le
// bouton "Voir les Constellations" une fois débloqué. isAscensionFullscreen() est
// exporté pour que router.js sache quand appliquer la classe sur #app — le toggle
// de la classe se fait AUSSI directement ici (voir setFullscreen) car ascend()
// déclenche un setState/rerender AVANT que le flag local ne soit mis à jour ;
// compter uniquement sur le rerender de router.js raterait le tout premier frame.
//
// "Brouillard" de l'arbre : le contenu (icône/label/description) d'un node reste
// masqué tant qu'il n'est pas à la frontière du déjà débloqué (nodeStatus() !==
// 'locked' — un node 'locked' est par construction celui dont la dépendance n'est
// pas encore possédée, donc jamais adjacent à un node possédé). Voir isRevealed().
import { el, iconNode } from '../utils/dom.js';
import { state } from '../state.js';
import { SETTINGS } from '../config.js';
import { ALL_NODES, nodeById } from '../data/constellations.js';
import {
  canAscend, previewPoints, pointsBreakdown, ascend, respec, respecCost,
  ownedLevel, nodeStatus, nextCost, spendPoint, hasAscendedOnce,
} from '../game/ascension.js';

// Éclats d'Ascension = LA ressource premium (pas `fragments`, qui est une monnaie de
// craft courante — voir game/ascension.js respec()).
const ECLATS_ICON = 'assets/sprites/ressources/eclats_ascension.png';
const OR_ICON = 'assets/sprites/objets/piece_or.png';
const MYSTERY_ICON = 'assets/sprites/icons/rest.png'; // étoile endormie, pas encore révélée
const STATUS_LABEL = { maxed: 'Maîtrisé' };
const DRAG_THRESHOLD = 8; // px — au-delà, un pointerup est un pan, pas un tap sur un node

const isRevealed = (node) => nodeStatus(node) !== 'locked';

// ---- Viewport pannable (pointer events — souris ET tactile) ----
function makeViewport() {
  const canvas = el('div.constellation-canvas');
  const viewport = el('div.constellation-viewport', {}, [canvas]);

  let panX = 0, panY = 0, dragging = false, moved = 0, sx = 0, sy = 0, spx = 0, spy = 0;

  function applyTransform() { canvas.style.transform = `translate(${panX}px, ${panY}px)`; }

  function recenter() {
    panX = viewport.clientWidth / 2;
    panY = viewport.clientHeight * 0.85;
    applyTransform();
  }

  viewport.addEventListener('pointerdown', (e) => {
    dragging = true; moved = 0;
    sx = e.clientX; sy = e.clientY; spx = panX; spy = panY;
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    moved = Math.max(moved, Math.hypot(dx, dy));
    panX = spx + dx; panY = spy + dy;
    applyTransform();
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    if (moved > DRAG_THRESHOLD) {
      // C'était un pan : avale le prochain click pour ne pas déclencher le node qui
      // se trouvait sous le doigt/curseur au moment du relâchement.
      const swallow = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
      canvas.addEventListener('click', swallow, { capture: true, once: true });
    }
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  return { viewport, canvas, recenter };
}

function lineEl(a, b) {
  const dx = b.pos.x - a.pos.x, dy = b.pos.y - a.pos.y;
  const len = Math.hypot(dx, dy);
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  const line = el('div.cn-line');
  line.style.left = a.pos.x + 'px';
  line.style.top = a.pos.y + 'px';
  line.style.width = len + 'px';
  line.style.transform = `rotate(${ang}deg)`;
  return line;
}

function starButton(node, onTap) {
  const status = nodeStatus(node);
  const revealed = isRevealed(node);
  const btn = el('button.cn-star.' + status + '.kind-' + node.kind + (revealed ? '' : '.mystery'), {
    onclick: () => onTap(node),
  }, [iconNode(revealed ? node.icon : MYSTERY_ICON, 'cn-star-icon')]);
  btn.style.left = node.pos.x + 'px';
  btn.style.top = node.pos.y + 'px';
  return btn;
}

// Flag plein écran — hors de renderAscension() pour que router.js puisse le lire
// indépendamment du montage courant de la vue (voir isAscensionFullscreen()).
let fullscreenFlag = false;
export function isAscensionFullscreen() { return fullscreenFlag; }

export function renderAscension(view) {
  fullscreenFlag = false; // reset à chaque montage frais de l'onglet (navigation)
  const refs = {};
  let detailNode = null;
  let confirmOpen = false;
  let vp = null;

  function setFullscreen(v) {
    fullscreenFlag = v;
    const app = document.getElementById('app');
    if (app) app.classList.toggle('constellation-mode', v);
    update();
  }

  // ---- Shell normal (résumé + CTA) ----
  const title = el('h2.section-title', { text: 'Ascension' });
  refs.summary = el('section.card', { style: 'margin-bottom:16px;' });
  refs.cta = el('div');
  refs.normal = el('div', {}, [title, refs.summary, refs.cta]);
  view.append(refs.normal);

  // ---- Shell plein écran (HUD + viewport) ----
  refs.hud = el('div.constellation-hud');
  refs.fsWrap = el('div.constellation-fullscreen', { style: 'display:none;' }, [refs.hud]);
  view.append(refs.fsWrap);

  refs.modal = el('div');
  view.append(refs.modal);

  function syncSummary() {
    const c = state.constellations, a = state.ascension;
    refs.summary.replaceChildren(
      el('div.stat-row', {}, [el('span', { text: 'Points disponibles' }), el('span.value', { text: String(c.points || 0) })]),
      el('div.stat-row', {}, [el('span', { text: 'Points cumulés' }), el('span.value', { text: String(c.totalEarned || 0) })]),
      el('div.stat-row', {}, [el('span', { text: 'Ascensions effectuées' }), el('span.value', { text: String(a.count || 0) })]),
      el('div.stat-row', {}, [el('span', { text: 'Meilleure zone atteinte' }), el('span.value', { text: String(a.bestZoneAllTime || 0) })]),
    );
  }

  function syncCta() {
    const blocks = [];
    if (canAscend()) {
      blocks.push(nextAscensionCard());
    } else {
      blocks.push(el('div.placeholder-note', {
        text: `Ascension débloquée à la zone ${SETTINGS.ascension.unlockZone} (zone actuelle : ${state.progress.unlocked || 1}).`,
      }));
    }
    if (hasAscendedOnce()) {
      blocks.push(el('button.btn-secondary', { text: 'Voir les Constellations', onclick: () => setFullscreen(true) }));
    }
    refs.cta.replaceChildren(...blocks);
  }

  // Carte "Prochaine Ascension" — détail des sources de points (voir
  // game/ascension.js pointsBreakdown()) plutôt qu'un simple total opaque.
  function nextAscensionCard() {
    const b = pointsBreakdown();
    const rows = [
      el('div.pb-row', {}, [
        iconNode('assets/sprites/icons/carte.png', 'icon'),
        el('span', { text: `Zone atteinte (${b.zone})` }),
        el('span.pb-val', { text: `+${b.zonePoints}` }),
      ]),
      el('div.pb-row', {}, [
        iconNode(OR_ICON, 'icon'),
        el('span', { text: `Or accumulé (${state.resources.or || 0} / ${SETTINGS.ascension.goldPerPoint} par point)` }),
        el('span.pb-val', { text: `+${b.goldPoints}` }),
      ]),
    ];
    if (b.bonusPct > 0) {
      rows.push(el('div.pb-row', {}, [
        iconNode('assets/sprites/icons/next_floor.png', 'icon'),
        el('span', { text: `Sillage Ascensionnel` }),
        el('span.pb-val', { text: `×${(1 + b.bonusPct / 100).toFixed(2)}` }),
      ]));
    }
    return el('section.card.next-ascension-card', { style: 'margin-top:16px;' }, [
      el('div.nac-head', {}, [
        iconNode('assets/sprites/icons/next_floor.png', 'nac-icon'),
        el('div', {}, [
          el('div.nac-title', { text: 'Prochaine Ascension' }),
          el('div.nac-total', { text: `+${b.total} point${b.total > 1 ? 's' : ''} de Constellation` }),
        ]),
      ]),
      el('div.pb-list', {}, rows),
      el('button.btn-craft', { text: 'Ascender', onclick: () => { confirmOpen = true; update(); } }),
    ]);
  }

  // Contenu du viewport (lignes + étoiles) — seulement reconstruit tant que le plein
  // écran est ouvert (pas de travail perdu pendant que refs.fsWrap est masqué). `vp`
  // n'est créé qu'une fois : le recentrage auto ne joue qu'à cette création, pour ne
  // pas écraser le pan de l'utilisateur à chaque réouverture.
  function syncCanvas() {
    if (!hasAscendedOnce() || !fullscreenFlag) return;
    if (!vp) {
      vp = makeViewport();
      refs.hud.after(vp.viewport);
      requestAnimationFrame(vp.recenter);
    }
    const lines = [];
    for (const n of ALL_NODES) for (const depId of (n.dependencies || [])) {
      const dep = nodeById(depId);
      if (dep) lines.push(lineEl(dep, n));
    }
    const stars = ALL_NODES.map((n) => starButton(n, (node) => { detailNode = node; confirmOpen = false; update(); }));
    vp.canvas.replaceChildren(...lines, ...stars);
  }

  function syncHud() {
    const c = state.constellations;
    const rc = respecCost();
    const canRespec = (state.resources.eclats_ascension || 0) >= rc && Object.keys(c.spent || {}).length > 0;
    refs.hud.replaceChildren(
      el('div.hud-points', {}, [el('span', { text: 'Points : ' }), el('span.value', { text: String(c.points || 0) })]),
      el('div.hud-actions', {}, [
        el('button.hud-btn', { text: '◎', title: 'Recentrer', onclick: () => vp && vp.recenter() }),
        el('button.hud-btn', {
          disabled: canRespec ? null : 'true',
          onclick: () => { respec(); update(); },
        }, [el('span', { text: `Respec (${rc} ` }), iconNode(ECLATS_ICON, 'icon'), el('span', { text: ')' })]),
        el('button.hud-btn.hud-close', { text: '✕ Fermer', onclick: () => setFullscreen(false) }),
      ]),
    );
  }

  function syncFullscreenVisibility() {
    refs.normal.style.display = fullscreenFlag ? 'none' : '';
    refs.fsWrap.style.display = fullscreenFlag ? 'flex' : 'none';
  }

  function nodeDetailModal(node) {
    const status = nodeStatus(node);
    const revealed = isRevealed(node);
    const overlay = el('div.modal-overlay', { onclick: (e) => { if (e.target === overlay) { detailNode = null; update(); } } });

    if (!revealed) {
      overlay.append(el('div.modal-box', {}, [
        el('div.modal-title', { text: 'Constellation scellée' }),
        el('div.id-desc', { text: 'Débloquez la constellation précédente pour révéler son contenu.' }),
        el('button.modal-close', { text: 'Fermer', onclick: () => { detailNode = null; update(); } }),
      ]));
      return overlay;
    }

    const lvl = ownedLevel(node.id);
    const cost = nextCost(node);
    const children = [
      el('div.modal-title', { text: node.label }),
      el('div.id-desc', { text: node.desc }),
      el('div.cn-level', { text: `Niveau ${lvl} / ${node.maxLevel}` }),
    ];
    if (status === 'maxed') children.push(el('div.cn-status-txt', { text: STATUS_LABEL.maxed }));
    else {
      const canAfford = cost != null && (state.constellations.points || 0) >= cost;
      children.push(el('button.btn-craft', {
        text: `Investir (${cost} pt${cost > 1 ? 's' : ''})`,
        disabled: canAfford ? null : 'true',
        onclick: () => { spendPoint(node.id); detailNode = null; update(); },
      }));
    }
    children.push(el('button.modal-close', { text: 'Fermer', onclick: () => { detailNode = null; update(); } }));
    overlay.append(el('div.modal-box', {}, children));
    return overlay;
  }

  function confirmAscendModal() {
    const gain = previewPoints();
    const overlay = el('div.modal-overlay', { onclick: (e) => { if (e.target === overlay) { confirmOpen = false; update(); } } });
    overlay.append(el('div.modal-box', {}, [
      el('div.modal-title', { text: 'Confirmer l’Ascension' }),
      el('div.id-desc', { text: `Gain : +${gain} point${gain > 1 ? 's' : ''} de Constellation.` }),
      el('div.id-desc', { text: 'Réinitialise niveau, attributs, équipement, sac, or/matériaux et progression de zones. Codex, Maîtrise, Récits, Compétences, Éclats d’Ascension, fragments et l’arbre de Constellations sont conservés.' }),
      el('button.btn-craft', { text: 'Ascender', onclick: () => { ascend(); confirmOpen = false; setFullscreen(true); } }),
      el('button.modal-close', { text: 'Annuler', onclick: () => { confirmOpen = false; update(); } }),
    ]));
    return overlay;
  }

  function syncModal() {
    const overlay = confirmOpen ? confirmAscendModal() : detailNode ? nodeDetailModal(detailNode) : null;
    refs.modal.replaceChildren(...(overlay ? [overlay] : []));
  }

  function update() {
    syncSummary(); syncCta(); syncHud(); syncCanvas(); syncFullscreenVisibility(); syncModal();
  }
  update();
  return update;
}

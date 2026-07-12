// ===== Routeur interne SPA (sans rechargement) =====
import { clear } from './utils/dom.js';
import { state, setState } from './state.js';
import { SUBNAV } from './config.js';
import { renderSubNav } from './components/navbar.js';
import { renderVillage } from './views/village.js';
import { renderProfil } from './views/profil.js';
import { renderAventure } from './views/aventure.js';

const VIEWS = {
  village: renderVillage,
  profil: renderProfil,
  aventure: renderAventure,
};

// Vues non encore implémentées (menu principal).
const STUBS = {
  fief: 'Le Fief — Phase 5+.',
  social: 'Social — Phase 6+.',
};

let refs = {};
let lastKey = null; // vue+sub du dernier rendu (pour ne réinitialiser le scroll qu'au changement)

export function initRouter({ viewRoot, subnav, onViewChange }) {
  refs = { viewRoot, subnav, onViewChange };
  render();
}

export function navigate(view) {
  const first = SUBNAV[view] ? SUBNAV[view][0].id : null;
  setState((s) => { s.ui.view = view; s.ui.sub = first; }); // déclenche le re-render via l'abonnement (main.js)
}

export function navigateSub(sub) {
  setState((s) => { s.ui.sub = sub; });
}

function render() {
  const { view, sub } = state.ui;
  const { viewRoot, subnav, onViewChange } = refs;

  renderSubNav(subnav, view, sub, navigateSub);
  clear(viewRoot);

  const key = view + '/' + sub;
  if (key !== lastKey) { viewRoot.scrollTop = 0; lastKey = key; } // scroll conservé si simple refresh de données

  const fn = VIEWS[view];
  if (fn) fn(viewRoot, sub);
  else {
    const div = document.createElement('div');
    div.className = 'placeholder-note';
    div.style.marginTop = '24px';
    div.textContent = STUBS[view] || 'Vue inconnue.';
    viewRoot.append(div);
  }

  onViewChange && onViewChange(view);
}

export { render as rerender };

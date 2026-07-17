// ===== Routeur interne SPA (sans rechargement) =====
import { clear } from './utils/dom.js';
import { state, setState } from './state.js';
import { SUBNAV, HOME_SUB } from './config.js';
import { renderSubNav } from './components/navbar.js';
import { renderVillage } from './views/village.js';
import { renderProfil } from './views/profil.js';
import { renderAventure } from './views/aventure.js';
import { renderCodex } from './views/codex.js';
import { renderCapitale } from './views/capitale.js';
import { isActive as combatActive } from './game/combat.js';
import { isAscensionFullscreen } from './views/ascension.js';
import { isDonjonFullscreen } from './views/donjon.js';

const VIEWS = {
  village: renderVillage,
  profil: renderProfil,
  aventure: renderAventure,
  codex: renderCodex,
  capitale: renderCapitale,
};

// Vues non encore implémentées (menu principal).
const STUBS = {};

let refs = {};
let lastKey = null;      // vue+sub du dernier rendu (pour ne réinitialiser le scroll qu'au changement)
let mountedUpdate = null; // hook update() de la vue actuellement montée (patch sans rebuild), si fournie

export function initRouter({ viewRoot, subnav, app, onViewChange }) {
  refs = { viewRoot, subnav, app, onViewChange };
  render();
}

export function navigate(view) {
  // Hub (village) : pas d'onglet dédié dans la subnav, on y retombe systématiquement
  // en cliquant l'icône de la nav principale — voir config.js HOME_SUB.
  const first = HOME_SUB[view] || (SUBNAV[view] ? SUBNAV[view][0].id : null);
  setState((s) => {
    s.ui.view = view; s.ui.sub = first;
    // Écran visité → notification "lue" (badges mainnav/subnav, voir game/notifications.js).
    // Fait dans le MÊME setState que la nav (pas un setState séparé) pour éviter un
    // aller-retour de rerender redondant.
    if (s.notifications) delete s.notifications[`${view}:${first}`];
  });
}

export function navigateSub(sub) {
  setState((s) => {
    s.ui.sub = sub;
    if (s.notifications) delete s.notifications[`${s.ui.view}:${sub}`];
  });
}

// Une vue peut retourner une fonction update() : tant que view+sub ne changent
// pas, les re-renders déclenchés par setState (régén, XP, etc.) appellent juste
// update() au lieu de clear()+rebuild — évite le flash visuel sur toute la vue.
// Les vues qui ne retournent rien gardent l'ancien comportement (rebuild complet).
function render() {
  const { view, sub } = state.ui;
  const { viewRoot, subnav, app, onViewChange } = refs;

  // Combat plein écran : masque header/subnav/mainnav (voir css/base.css #app.combat-mode).
  if (app) app.classList.toggle('combat-mode', view === 'aventure' && sub === 'combat' && combatActive());
  // Constellations plein écran (Ascension) : même principe, voir css/base.css
  // #app.constellation-mode + views/ascension.js isAscensionFullscreen().
  if (app) app.classList.toggle('constellation-mode', view === 'profil' && sub === 'ascension' && isAscensionFullscreen());
  // Brèche Instable plein écran (voir views/donjon.js isDonjonFullscreen()) — même
  // principe que combat-mode/constellation-mode, masque tout le chrome (voir base.css).
  if (app) app.classList.toggle('donjon-mode', view === 'aventure' && sub === 'donjon' && isDonjonFullscreen());

  renderSubNav(subnav, view, sub, navigateSub);

  const key = view + '/' + sub;
  const navigated = key !== lastKey;
  if (navigated) { viewRoot.scrollTop = 0; lastKey = key; }

  if (!navigated && mountedUpdate) {
    mountedUpdate();
  } else {
    clear(viewRoot);
    const fn = VIEWS[view];
    if (fn) {
      mountedUpdate = fn(viewRoot, sub) || null;
    } else {
      mountedUpdate = null;
      const div = document.createElement('div');
      div.className = 'placeholder-note';
      div.style.marginTop = '24px';
      div.textContent = STUBS[view] || 'Vue inconnue.';
      viewRoot.append(div);
    }
  }

  onViewChange && onViewChange(view);
}

export { render as rerender };

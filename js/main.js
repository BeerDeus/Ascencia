// ===== Point d'entrée Ascencia =====
import { state, subscribe, resetSave } from './state.js';
import { renderHeader } from './components/header.js';
import { renderMainNav } from './components/navbar.js';
import { renderFab } from './components/fab.js';
import { initRouter, navigate, rerender } from './router.js';
import { playerApi } from './game/player.js';
import { recomputeBonuses, itemsApi } from './game/items.js';
import { tick as enduranceTick, enduranceApi } from './game/endurance.js';

function boot() {
  const app = document.getElementById('app');
  const header = document.getElementById('game-header');
  const viewRoot = document.getElementById('view-root');
  const subnav = document.getElementById('subnav');
  const mainnav = document.getElementById('mainnav');

  const drawMainNav = (view) => renderMainNav(mainnav, view, navigate);
  const drawFab = () => renderFab(app, state, navigate);

  recomputeBonuses(state.player); // resync des bonus d'équipement au démarrage
  enduranceTick(Date.now());      // rattrapage de la régénération hors-ligne (Phase 4)
  renderHeader(header);
  drawMainNav(state.ui.view);
  initRouter({ viewRoot, subnav, onViewChange: drawMainNav });
  drawFab();

  // Toute mutation d'etat rafraichit le header + la vue courante + le FAB.
  subscribe(() => { renderHeader(header); rerender(); drawFab(); });

  // Régénération d'Endurance en continu pendant la session (setState ne déclenche
  // le rerender que si un point est effectivement gagné — voir game/endurance.js).
  setInterval(() => enduranceTick(Date.now()), 30 * 1000);

  // API console pour tester le state joueur (ex: Ascencia.addXp(250)).
  window.Ascencia = Object.assign({}, playerApi, itemsApi, enduranceApi, { state, resetSave });

  console.log('[Ascencia] Phases 1-4 prêtes. Test console : Ascencia.addXp(250), Ascencia.addAttribute("force",10), Ascencia.addResource("premium",1000), Ascencia.spend(5), Ascencia.resetSave()');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

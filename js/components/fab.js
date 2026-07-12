// ===== Bouton flottant : répartition des points d'attribut =====
// Visible partout SAUF sur Profil/Personnage (où se trouvent déjà les boutons +).
import { el } from '../utils/dom.js';

export function renderFab(app, state, navigate) {
  let fab = document.getElementById('attr-fab');
  const pts = state.player.attrPoints || 0;
  const onPerso = state.ui.view === 'profil' && state.ui.sub === 'personnage';

  if (pts <= 0 || onPerso) { if (fab) fab.remove(); return; }

  if (!fab) {
    fab = el('button#attr-fab.attr-fab', { title: 'Répartir vos points', onclick: () => navigate('profil') });
    app.append(fab);
  }
  fab.replaceChildren(
    el('span.fab-plus', { text: '+' }),
    el('span.fab-label', { text: 'Attributs' }),
    el('span.fab-badge', { text: String(pts) }),
  );
}

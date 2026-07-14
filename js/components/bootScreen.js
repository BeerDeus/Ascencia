// ===== Écran de chargement : étapes séquentielles (app, réseau, compte, sync). =====
import { el } from '../utils/dom.js';

const STEPS = [
  { id: 'app',  label: "Chargement de l'application" },
  { id: 'net',  label: 'Vérification de la connexion internet' },
  { id: 'auth', label: 'Connexion au compte' },
  { id: 'sync', label: 'Synchronisation des données' },
];

// status : 'pending' | 'active' | 'done' | 'error'
export function mountBootScreen(container) {
  const rows = {};
  const list = el('div.boot-steps', {}, STEPS.map((s) => {
    const dot = el('span.boot-dot');
    const row = el('div.boot-step', {}, [dot, el('span.boot-label', { text: s.label })]);
    rows[s.id] = row;
    return row;
  }));

  const errorBox = el('div.boot-error', { style: 'display:none;' });

  container.replaceChildren(
    el('div.boot-screen', {}, [
      el('img.boot-logo-img', { src: 'logo.png', alt: 'Ascencia' }),
      list,
      errorBox,
    ]),
  );

  function setStep(id, status) {
    const row = rows[id];
    if (!row) return;
    row.classList.remove('active', 'done', 'error');
    if (status !== 'pending') row.classList.add(status);
  }

  function showError(msg, retryLabel, retryFn) {
    errorBox.replaceChildren(
      el('div.boot-error-msg', { text: msg }),
      retryFn ? el('button.btn-craft', { text: retryLabel || 'Réessayer', onclick: retryFn }) : null,
    );
    errorBox.style.display = '';
  }
  function clearError() { errorBox.style.display = 'none'; errorBox.replaceChildren(); }

  return { setStep, showError, clearError, root: container };
}

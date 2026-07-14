// ===== Modale d'info générique (description + "comment en obtenir plus") =====
// Réutilisée pour les Attributs et les Statistiques détaillées (voir views/profil.js).
// Même squelette que components/offlineReportModal.js (.modal-overlay/.modal-box),
// montée directement dans document.body (pas dans l'arbre de vue du routeur).
import { el, iconNode } from '../utils/dom.js';

export function showInfoModal({ icon, title, value, desc, more }) {
  const overlay = el('div.modal-overlay', { onclick: (e) => { if (e.target === overlay) overlay.remove(); } }, [
    el('div.modal-box.info-modal', {}, [
      el('div.info-modal-head', {}, [
        icon ? iconNode(icon, 'info-modal-icon') : null,
        el('div.modal-title', { text: title }),
      ]),
      value != null ? el('div.info-modal-value', { text: value }) : null,
      desc ? el('div.info-modal-desc', { text: desc }) : null,
      more ? el('div.info-modal-sub', { text: 'Comment en obtenir plus' }) : null,
      more ? el('div.info-modal-desc', { text: more }) : null,
      el('button.modal-close', { text: 'Fermer', onclick: () => overlay.remove() }),
    ]),
  ]);
  document.body.append(overlay);
  return overlay;
}

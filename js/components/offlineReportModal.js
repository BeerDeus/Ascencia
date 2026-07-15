// ===== Modale de reconnexion : résume ce qui s'est passé pendant l'absence. =====
import { el } from '../utils/dom.js';

const RES_LABEL = { metal: 'Métal', fragments: 'Fragments', or: 'Or', bois: 'Bois', tissu: 'Tissu', eclats_ascension: "Éclats d'Ascension" };

function fmtDuration(ms) {
  const totalMin = Math.round(ms / 60000);
  if (totalMin < 60) return `${totalMin} min`;
  const h = Math.floor(totalMin / 60), m = totalMin % 60;
  return `${h} h${m ? ' ' + m + ' min' : ''}`;
}

export function showOfflineReportModal(report) {
  const lines = [el('div.report-elapsed', { text: `Absent(e) pendant ${fmtDuration(report.elapsedMs)}.` })];

  if (report.mining) {
    const m = report.mining;
    lines.push(el('div.report-line', {
      text: `Minage (${m.nodeName}) : ${m.cycles} cycle${m.cycles > 1 ? 's' : ''} — +${m.resourceGained} ${RES_LABEL[m.resource] || m.resource}, +${m.xpGained} XP de Minage`,
    }));
    if (m.leveledTo) lines.push(el('div.report-line.report-highlight', { text: `Niveau de Minage ${m.leveledTo} atteint !` }));
  }
  if (report.hpGained > 0) lines.push(el('div.report-line', { text: `Vie régénérée : +${report.hpGained} PV` }));
  if (report.enduranceGained > 0) lines.push(el('div.report-line', { text: `Endurance régénérée : +${report.enduranceGained}` }));

  const overlay = el('div.modal-overlay', {}, [
    el('div.modal-box.report-modal', {}, [
      el('div.modal-title', { text: 'Pendant ton absence...' }),
      ...lines,
      el('button.modal-close', { text: 'Fermer', onclick: () => overlay.remove() }),
    ]),
  ]);
  document.body.append(overlay);
}

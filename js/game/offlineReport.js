// ===== Rapport de reconnexion : ce qui s'est passé pendant l'absence. =====
// N'implémente AUCUN calcul propre — appelle les rattrapages déjà existants (les 4
// métiers de récolte, Vie, Endurance, tous basés sur des timestamps persistés) et
// observe les deltas pour construire un résumé affichable (voir components/
// offlineReportModal.js). Point d'entrée UNIQUE pour ces rattrapages au boot — voir
// main.js (ne pas les rappeler séparément ailleurs, sous peine de double application).
import { state } from '../state.js';
import { regenSince } from './player.js';
import { tick as enduranceTick } from './endurance.js';
import { miningApi } from './mining.js';
import { bucheronnageApi } from './bucheronnage.js';
import { tissageApi } from './tissage.js';
import { resonanceApi } from './resonance.js';

const REPORT_THRESHOLD_MS = 60 * 1000; // écart négligeable en dessous (reload rapide etc.) → pas de rapport

// Un rattrapage par métier de récolte, chacun avec le libellé affiché dans la modale
// (voir components/offlineReportModal.js) — ajouter un métier ici suffit, pas besoin
// de toucher buildOfflineReport() ni la modale.
const GATHERING_REPORTERS = [
  { key: 'mining',       label: 'Minage',       credit: miningApi.creditPending },
  { key: 'bucheronnage', label: 'Bûcheronnage', credit: bucheronnageApi.creditPending },
  { key: 'tissage',      label: 'Tissage',      credit: tissageApi.creditPending },
  { key: 'resonance',    label: 'Résonance',    credit: resonanceApi.creditPending },
];

export function buildOfflineReport(sinceTs, now = Date.now()) {
  const elapsedMs = Math.max(0, now - (sinceTs || now));

  const hpBefore = state.player.combatHp.cur;
  const enduranceBefore = state.endurance.cur;

  // { nodeName, cycles, resource, resourceGained, xpGained, leveledTo, icon } | null par métier
  const gathering = GATHERING_REPORTERS
    .map((g) => ({ label: g.label, result: g.credit() }))
    .filter((g) => g.result);

  regenSince(sinceTs, now);
  enduranceTick(now);

  const hpGained = Math.round(state.player.combatHp.cur - hpBefore);
  const enduranceGained = state.endurance.cur - enduranceBefore;

  if (elapsedMs < REPORT_THRESHOLD_MS) return null;
  if (!gathering.length && hpGained <= 0 && enduranceGained <= 0) return null; // rien à raconter

  return { elapsedMs, gathering, hpGained, enduranceGained };
}

export const offlineReportApi = { buildOfflineReport };

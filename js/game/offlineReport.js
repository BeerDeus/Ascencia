// ===== Rapport de reconnexion : ce qui s'est passé pendant l'absence. =====
// N'implémente AUCUN calcul propre — appelle les rattrapages déjà existants (Minage,
// Vie, Endurance, tous basés sur des timestamps persistés) et observe les deltas pour
// construire un résumé affichable (voir components/offlineReportModal.js). Point
// d'entrée UNIQUE pour ces trois rattrapages au boot — voir main.js (ne pas les
// rappeler séparément ailleurs, sous peine de double application).
import { state } from '../state.js';
import { regenSince } from './player.js';
import { tick as enduranceTick } from './endurance.js';
import { creditPending } from './mining.js';

const REPORT_THRESHOLD_MS = 60 * 1000; // écart négligeable en dessous (reload rapide etc.) → pas de rapport

export function buildOfflineReport(sinceTs, now = Date.now()) {
  const elapsedMs = Math.max(0, now - (sinceTs || now));

  const hpBefore = state.player.combatHp.cur;
  const enduranceBefore = state.endurance.cur;

  const mining = creditPending(); // { nodeName, cycles, resource, resourceGained, xpGained, leveledTo, icon } | null
  regenSince(sinceTs, now);
  enduranceTick(now);

  const hpGained = Math.round(state.player.combatHp.cur - hpBefore);
  const enduranceGained = state.endurance.cur - enduranceBefore;

  if (elapsedMs < REPORT_THRESHOLD_MS) return null;
  if (!mining && hpGained <= 0 && enduranceGained <= 0) return null; // rien à raconter

  return { elapsedMs, mining, hpGained, enduranceGained };
}

export const offlineReportApi = { buildOfflineReport };

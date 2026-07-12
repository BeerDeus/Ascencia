// ===== Endurance (Phase 4) : jauge, dépense, régénération basée sur Timestamp =====
// regenAt = timestamp du prochain point régénéré (null si pleine). Permet le calcul
// de rattrapage hors-ligne (tick() rejoue tous les points manqués depuis regenAt).
import { state, setState } from '../state.js';
import { SETTINGS } from '../config.js';

export const hasEndurance = (n = 1) => state.endurance.cur >= n;

// Dépense n points. Retourne false (aucune mutation) si insuffisant.
export function spend(n = 1) {
  if (state.endurance.cur < n) return false;
  setState((s) => {
    s.endurance.cur -= n;
    if (s.endurance.regenAt == null) s.endurance.regenAt = Date.now() + SETTINGS.enduranceRegenMs;
  });
  return true;
}

// Recharge n points (consommables Cuisine/Alchimie — Phase 5). Plafonne à max.
export function restore(n) {
  setState((s) => {
    s.endurance.cur = Math.min(s.endurance.max, s.endurance.cur + n);
    if (s.endurance.cur >= s.endurance.max) s.endurance.regenAt = null;
  });
}

// Rejoue la régénération écoulée depuis regenAt (en ligne comme hors-ligne, via
// meta.lastSeen -> Date.now() au chargement). Boucle bornée par le plafond.
export function tick(now = Date.now()) {
  const e = state.endurance;
  if (e.cur >= e.max || e.regenAt == null) return false;
  let gained = 0;
  let regenAt = e.regenAt;
  while (regenAt <= now && e.cur + gained < e.max) {
    gained += 1;
    regenAt += SETTINGS.enduranceRegenMs;
  }
  if (!gained) return false;
  setState((s) => {
    s.endurance.cur = Math.min(s.endurance.max, s.endurance.cur + gained);
    s.endurance.regenAt = s.endurance.cur >= s.endurance.max ? null : regenAt;
  });
  return true;
}

// Temps restant (ms) avant le prochain point — pour un éventuel countdown UI.
export function msToNext(now = Date.now()) {
  const e = state.endurance;
  if (e.cur >= e.max || e.regenAt == null) return 0;
  return Math.max(0, e.regenAt - now);
}

export const enduranceApi = { hasEndurance, spend, restore, tick, msToNext };

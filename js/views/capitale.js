// ===== Vue Capitale (ex-"Fief") : hub d'optimisation avancée (Phase 5+) =====
// Pour l'instant, une seule fonctionnalité prévue (l'Enchanteur), verrouillée
// jusqu'à une progression suffisante. D'autres quartiers viendront s'ajouter ici
// au même titre — structure volontairement extensible (panel + menuCard, comme village.js).
import { el } from '../utils/dom.js';
import { state } from '../state.js';
import { menuCard, panel } from '../components/card.js';

// Seuil de déblocage de l'Enchanteur (ajustable — l'utilisateur a suggéré "zone 5-10").
const ENCHANTEUR_UNLOCK_ZONE = 5;

export function renderCapitale(root) {
  const view = el('div.view');
  const head = el('div');
  const body = el('div');
  view.append(head, body);
  root.append(view);

  let sig = null;
  const computeSig = () => state.progress.unlocked;

  function build() {
    sig = computeSig();
    head.replaceChildren(
      el('h2.section-title', { text: 'La Capitale' }),
      el('div.view-intro', { text: "Loin des villages, la Capitale abrite les artisans capables de repousser les limites de l'équipement — pour qui a fait ses preuves sur le terrain." }),
    );

    const unlocked = state.progress.unlocked >= ENCHANTEUR_UNLOCK_ZONE;
    const grid = el('div.card-grid', {}, [
      menuCard({
        id: 'enchanteur',
        title: 'Enchanteur',
        icon: 'assets/sprites/icons/enchanteur.png',
        locked: !unlocked,
        status: unlocked ? 'Disponible' : `Débloqué à la Zone ${ENCHANTEUR_UNLOCK_ZONE}`,
        desc: unlocked
          ? "Enchante l'équipement : bonus de stats supplémentaires, et une chance de faire apparaître une note à chaque coup encaissé une fois enchanté."
          : `Nettoie tes zones et progresse jusqu'à la Zone ${ENCHANTEUR_UNLOCK_ZONE} pour débloquer l'Enchanteur.`,
        full: true,
      }, () => { /* Enchanteur : à venir — interface seule pour l'instant */ }),
    ]);
    body.replaceChildren(panel('Quartier des Artisans Royaux', [grid]));
  }

  build();
  function update() {
    if (computeSig() === sig) return;
    build();
  }
  return update;
}

// ===== Vue Capitale (ex-"Fief") : hub d'optimisation avancée (Phase 5+) =====
// Pour l'instant, une seule fonctionnalité prévue (l'Enchanteur), verrouillée
// jusqu'à une progression suffisante. D'autres quartiers viendront s'ajouter ici
// au même titre — structure volontairement extensible (panel + menuCard, comme village.js).
// Pas de sub-navigation dédiée (SUBNAV, voir config.js) : la Capitale reste assez
// petite pour gérer son propre écran interne (activeQuartier, closure) plutôt que
// de passer par le routeur — même limitation que le Hub Village avant l'ajout de
// la sub-nav complète, mais suffisant ici vu le nombre de quartiers (1 pour l'instant).
import { el, iconNode } from '../utils/dom.js';
import { state } from '../state.js';
import { menuCard, panel } from '../components/card.js';
import { dropdown } from '../components/dropdown.js';
import {
  SLOTS, GEAR_KINDS, ITEMS, enchantCost, canEnchant, enchantItem, enchantAtCap,
  noteOnHitChance, weaponNoteChance, getChosenNote, setChosenNote,
} from '../game/items.js';
import { NOTES } from '../game/symphony.js';
import { RARITY_LABEL, formatSecondary } from '../data/affixes.js';
import { showToast } from '../components/toast.js';

// Seuil de déblocage de l'Enchanteur (ajustable — l'utilisateur a suggéré "zone 5-10").
const ENCHANTEUR_UNLOCK_ZONE = 5;
const FRAGMENT_ICON = 'assets/sprites/ressources/fragment.png';
const STAT_ABR = { vie: 'Vie', force: 'For', agilite: 'Agi', chance: 'Cha', intelligence: 'Int', defense: 'Déf' };
// Slots enchantables = les 9 emplacements de gear (mêmes kinds que la Forge, incl.
// Ceinture depuis le 2026-07-16), dans l'ordre du paperdoll (voir game/items.js
// SLOTS/SLOT_ROWS).
const ENCHANT_SLOTS = SLOTS.filter((s) => GEAR_KINDS.includes(s.kind));
const NOTE_OPTIONS = NOTES.map((n) => ({ value: n.id, label: n.label }));

export function renderCapitale(root) {
  const view = el('div.view');
  const head = el('div');
  const body = el('div');
  view.append(head, body);
  root.append(view);

  let activeQuartier = null; // null = hub (liste des quartiers) | 'enchanteur'
  let sig = null;
  const computeSig = () => activeQuartier + '|' + state.progress.unlocked + '|' + state.resources.fragments + '|' + state.player.chosenNote + '|' + JSON.stringify(state.player.equipment);

  function build() {
    sig = computeSig();
    if (activeQuartier === 'enchanteur') return buildEnchanteur();

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
          ? "Enchante l'équipement : un affixe aléatoire et une chance de faire apparaître une note en combat, cumulés pièce par pièce."
          : `Nettoie tes zones et progresse jusqu'à la Zone ${ENCHANTEUR_UNLOCK_ZONE} pour débloquer l'Enchanteur.`,
        full: true,
      }, () => { if (unlocked) { activeQuartier = 'enchanteur'; build(); } }),
    ]);
    body.replaceChildren(panel('Quartier des Artisans Royaux', [grid]));
  }

  // ---------- Enchanteur : 2 rolls par enchant (voir game/items.js) — un affixe
  // aléatoire (attributs) + une chance de note, plafonnée par la rareté de l'objet.
  // L'arme alimente la chance de note OFFENSIVE (coups portés) ; le reste de
  // l'équipement alimente la chance DÉFENSIVE (coups encaissés). ----------
  function buildEnchanteur() {
    head.replaceChildren(
      el('div.section-title-row', {}, [
        el('button.btn-back', { text: '← Retour', onclick: () => { activeQuartier = null; build(); } }),
        el('h2.section-title', { text: 'Enchanteur' }),
      ]),
      el('div.view-intro', { text: "Chaque enchantement roule un affixe aléatoire (bonus d'attribut) et une chance de note, sur une rareté plafonnée par celle de l'objet. Ré-enchanter une pièce REMPLACE son roll précédent — le coût grimpe à chaque reforge." }),
    );

    const noteRow = el('div.enchant-note-row', {}, [
      iconNode('assets/sprites/icons/dissonance.png', 'icon'),
      el('span', { text: 'Note favorisée : ' }),
      dropdown(NOTE_OPTIONS, getChosenNote(), (v) => { setChosenNote(v); build(); }).root,
    ]);

    const chanceLines = el('div.enchant-chance-lines', {}, [
      el('div.craft-gold', {}, [
        el('span', { text: `Chance de note (coups encaissés) : ${noteOnHitChance()}%` }),
      ]),
      el('div.craft-gold', {}, [
        el('span', { text: `Chance de note (coups portés, arme) : +${weaponNoteChance()}%` }),
      ]),
    ]);

    const list = el('div.craft-list');
    for (const slot of ENCHANT_SLOTS) list.append(enchantRow(slot));
    body.replaceChildren(noteRow, chanceLines, list);
  }

  function enchantRow(slot) {
    const inst = state.player.equipment[slot.id];
    const it = inst ? ITEMS[inst.tid] : null;
    const enchant = inst && inst.enchant;
    const cost = it ? enchantCost(slot.id) : null;
    const atCap = it ? enchantAtCap(slot.id) : false;

    const baseStats = it && it.stats
      ? Object.entries(it.stats).map(([k, v]) => `+${v} ${STAT_ABR[k] || k}`).join(' · ')
      : '';

    // Note : rareté indépendante de celle de l'affixe (peut être plus haute, voir
    // NOTE_RARITY_HEADROOM dans data/affixes.js) — badge séparé quand elle diffère,
    // pour mettre en avant un roll de note chanceux sur une pièce autrement modeste.
    // Stat secondaire (voir data/affixes.js rollSecondary()) : présente seulement à
    // partir de 'rare' — inactive en jeu pour l'instant (stockée/affichée seulement,
    // pas encore lue par le combat), donc marquée "(bientôt actif)" pour ne pas laisser
    // croire qu'elle a déjà un effet.
    const affixBlock = enchant
      ? el('div.enchant-affix', {}, [
          el('span.rarity-badge.rarity-' + enchant.rarity, { text: RARITY_LABEL[enchant.rarity] }),
          el('span.enchant-affix-name', { text: enchant.name }),
          el('span.enchant-affix-stats', {
            text: Object.entries(enchant.attrs).map(([k, v]) => `+${v} ${STAT_ABR[k] || k}`).join(' · '),
          }),
          enchant.secondary ? el('span.enchant-affix-secondary', { text: `${formatSecondary(enchant.secondary)} (bientôt actif)` }) : null,
          el('span.rarity-badge.rarity-' + enchant.noteRarity, { text: RARITY_LABEL[enchant.noteRarity] }),
          el('span.enchant-affix-stats', {
            text: `+${enchant.noteChance}% note${slot.kind === 'arme' ? ' (portée)' : ' (encaissée)'}`,
          }),
        ])
      : el('div.enchant-affix.empty', { text: it ? 'Pas encore enchanté' : '' });

    const btnLabel = !it ? 'Emplacement vide'
      : cost == null ? 'Non enchantable'
      : enchant ? `Reforger (${cost} Fragments)`
      : `Enchanter (${cost} Fragments)`;

    const btn = el('button.btn-craft', {
      text: btnLabel,
      disabled: (!it || cost == null || !canEnchant(slot.id)) ? 'true' : null,
      onclick: () => {
        if (!it) return;
        const apply = (confirmed) => {
          const res = enchantItem(slot.id, { confirmed });
          if (res.ok) showToast(`${it.name} — ${res.roll.name} (${RARITY_LABEL[res.roll.rarity]})`, { icon: FRAGMENT_ICON });
          build();
        };
        if (atCap) {
          showConfirmModal(
            `${it.name} est déjà au palier de rareté maximum pour cet objet (${RARITY_LABEL[it.rarity]}). Reforger changera l'affixe mais pas la rareté. Continuer ?`,
            () => apply(true),
          );
        } else apply(false);
      },
    });

    return el('div.craft-card' + (!it ? '.disabled' : ''), {}, [
      el('div.craft-head', {}, [
        iconNode(it ? it.icon : 'assets/sprites/objets/sac_a_dos.png', 'craft-icon'),
        el('div.craft-info', {}, [
          el('div.craft-name', { text: it ? it.name : slot.label }),
          el('div.craft-stats', { text: it ? (baseStats || 'Aucune stat de base') : `Équipe un objet (${slot.label}) pour l'enchanter` }),
        ]),
      ]),
      affixBlock,
      btn,
    ]);
  }

  build();
  function update() {
    if (computeSig() === sig) return;
    build();
  }
  return update;
}

// Modale de confirmation (rareté déjà max — voir enchantRow ci-dessus), même squelette
// que components/infoModal.js (.modal-overlay/.modal-box), montée hors de l'arbre de vue.
function showConfirmModal(text, onConfirm) {
  const overlay = el('div.modal-overlay', { onclick: (e) => { if (e.target === overlay) overlay.remove(); } }, [
    el('div.modal-box', {}, [
      el('div.modal-title', { text: 'Rareté déjà maximale' }),
      el('div.info-modal-desc', { text }),
      el('div.confirm-row', {}, [
        el('button.modal-close', { text: 'Annuler', onclick: () => overlay.remove() }),
        el('button.btn-craft', { text: 'Reforger quand même', onclick: () => { overlay.remove(); onConfirm(); } }),
      ]),
    ]),
  ]);
  document.body.append(overlay);
  return overlay;
}

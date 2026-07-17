// ===== Vue Village (Hub + Forge + Cuisine) =====
import { el, iconNode } from '../utils/dom.js';
import { VILLAGE, SUBNAV, RECOLTE_CARDS } from '../config.js';
import { menuCard, panel } from '../components/card.js';
import { dropdown } from '../components/dropdown.js';
import { navigateSub } from '../router.js';
import { ITEMS, RECIPES, RESOURCE_KEYS, BUY_CATALOG, craft, canCraft, maxCraftable, invCount, buyItem, buyPrice, sellItem } from '../game/items.js';
import { skillApi as miningSkill } from '../game/mining.js';
import { skillApi as bucheronnageSkill } from '../game/bucheronnage.js';
import { skillApi as tissageSkill } from '../game/tissage.js';
import { skillApi as resonanceSkill } from '../game/resonance.js';
import { xpForLevel } from '../game/gathering.js';
import { list as primesList, claim as claimPrime } from '../game/primes.js';
import { isRarityUnlocked, highestUnlockedRarity, unlockedRarities } from '../game/ascension.js';
import { RARITY_ORDER } from '../data/constellations.js';
import { showToast } from '../components/toast.js';
import { state } from '../state.js';

// + RECOLTE_CARDS : les 4 métiers de récolte sont des cartes du Hub (quartier
// "Récolteurs") mais des feuilles (pas des onglets directs, voir SUBNAV.village
// et config.js SUBNAV_PARENT) — sans cet ajout, cliquer leur carte depuis le Hub
// ne ferait rien (VILLAGE_SUBS.has() les raterait).
const VILLAGE_SUBS = new Set([...SUBNAV.village.map((s) => s.id), ...RECOLTE_CARDS.map((c) => c.id)]);
const OR_ICON = 'assets/sprites/objets/piece_or.png';
const RES_ICON = {
  or: OR_ICON,
  bois: 'assets/sprites/ressources/bois.png',
  metal: 'assets/sprites/ressources/metal.png',
  tissu: 'assets/sprites/ressources/tissu.png',
  fragments: 'assets/sprites/ressources/fragment.png',
  eclats_ascension: 'assets/sprites/ressources/eclats_ascension.png',
};
const STAT_ABR = { vie: 'Vie', force: 'For', agilite: 'Agi', chance: 'Cha', intelligence: 'Int', defense: 'Déf' };
const POTION_STAT_LABEL = { attaque: 'Attaque', crit: 'Critique', esquive: 'Esquive' };
// Libellés des filtres de tri (Forge/Cuisine) — clé = `kind` de l'item produit par la recette.
const KIND_LABEL = {
  tete: 'Tête', arme: 'Arme', torse: 'Torse', mains: 'Mains', jambes: 'Jambes', ceinture: 'Ceinture', pieds: 'Pieds',
  accessoire: 'Accessoire', artefact: 'Artefact', conso: 'Soins', energie: 'Énergie', materiau: 'Matériaux', potion: 'Philtres',
};
const RARITY_LABEL = {
  common: 'Commun', uncommon: 'Peu commun', rare: 'Rare', epic: 'Épique',
  legendary: 'Légendaire', mythic: 'Mythique', special: 'Spécial',
};
const GEM_ICON = 'assets/sprites/ressources/gemme_verte.png'; // même icône que les nodes de rareté (Ascension)
// Statut/desc de la carte Forge (hub Village) : remplace le placeholder statique
// "Niveau 3 / Fabrication Rare" par la rareté RÉELLEMENT débloquée via l'Ascension
// (voir game/ascension.js). Le hub ne se re-render qu'à la navigation (voir
// renderVillage — "100% statique" une fois monté), donc calculé une fois au build.
function forgeCardData(c) {
  const owned = unlockedRarities();
  const n = owned.size, total = RARITY_ORDER.length;
  return { ...c, status: RARITY_LABEL[highestUnlockedRarity()], desc: `${n}/${total} raretés débloquées` };
}
// Statut dynamique des cartes Récolte (hub Village ET sub-hub Récolte, même source
// RECOLTE_CARDS) : "Actif" si ce métier a un filon en cours (skill.isActive()), sinon
// le "Disponible" statique du config. Un seul métier actif à la fois (voir
// game/gathering.js REGISTRY/start()) — pas besoin de désactiver les autres cartes,
// juste refléter lequel tourne. Demande explicite du 2026-07-17.
const RECOLTE_SKILL = { minage: miningSkill, bucheronnage: bucheronnageSkill, tissage: tissageSkill, resonance: resonanceSkill };
function recolteCardData(c) {
  const skill = RECOLTE_SKILL[c.id];
  return skill ? { ...c, status: skill.isActive() ? 'Actif' : c.status } : c;
}
// Stat dominante d'une pièce (plus haute valeur absolue dans `stats`) — 3ème filtre,
// utile pour viser une build (Force/Guerrier, Agilité/Archer, Intelligence/Mage...).
const STAT_FULL_LABEL = { vie: 'Vie', force: 'Force', agilite: 'Agilité', chance: 'Chance', intelligence: 'Intelligence', defense: 'Défense' };
function primaryStat(out) {
  const entries = Object.entries(out.stats || {});
  if (!entries.length) return null;
  entries.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  return entries[0][0];
}

// dropdown() : extrait vers components/dropdown.js le 2026-07-16 (réutilisé par
// l'Enchanteur, voir views/capitale.js) — voir ce fichier pour l'implémentation.
// options[].locked (optionnel) : rendu grisé, le clic déclenche onLockedClick(option)
// au lieu de sélectionner l'option — voir le filtre Rareté de la Forge (renderCraft)
// qui masque les paliers pas encore débloqués via l'Ascension, sauf le tout prochain
// (visible mais verrouillé, pour donner un objectif sans tout spoiler).

// Stepper de quantité (−/qty/+/Max) — réutilisé Forge/Cuisine (craft multiple) et
// Marchand (achat multiple). getMax() est réévalué à chaque interaction (ressources/or
// changent en continu) ; onChange(qty) repatche le coût/bouton du seul row concerné.
function qtyStepper(getMax, onChange) {
  let qty = 1;
  const val = el('span.qty-val', { text: '1' });
  const clampQty = (n) => Math.max(1, Math.min(n, Math.max(1, getMax())));
  const set = (n) => { qty = clampQty(n); val.textContent = String(qty); onChange(qty); };
  const root = el('div.qty-stepper', {}, [
    el('button.qty-btn', { text: '−', onclick: () => set(qty - 1) }),
    val,
    el('button.qty-btn', { text: '+', onclick: () => set(qty + 1) }),
    el('button.qty-max', { text: 'Max', onclick: () => set(getMax()) }),
  ]);
  return { root, get: () => qty };
}

export function renderVillage(root, sub = 'hub') {
  const view = el('div.view');

  if (sub === 'forge')      { const upd = renderCraft(view, 'forge',    'Forge du Forgeron', 'Forger'); root.append(view); return upd; }
  if (sub === 'cuisinier')  { const upd = renderCraft(view, 'cuisine',  'Cuisine',            'Cuisiner'); root.append(view); return upd; }
  if (sub === 'alchimiste') { const upd = renderCraft(view, 'alchimie', 'Alchimiste',         'Distiller'); root.append(view); return upd; }
  if (sub === 'minage')       { const upd = renderGatherStation(view, miningSkill,       'Minage',       'Niveau de Minage',       'Miner'); root.append(view); return upd; }
  if (sub === 'bucheronnage') { const upd = renderGatherStation(view, bucheronnageSkill, 'Bûcheronnage', 'Niveau de Bûcheronnage', 'Couper'); root.append(view); return upd; }
  if (sub === 'tissage')      { const upd = renderGatherStation(view, tissageSkill,      'Tissage',      'Niveau de Tissage',      'Tisser'); root.append(view); return upd; }
  if (sub === 'resonance')    { const upd = renderGatherStation(view, resonanceSkill,    'Résonance',    'Niveau de Résonance',    'Écouter'); root.append(view); return upd; }
  if (sub === 'marchand')  { const upd = renderMarchand(view); root.append(view); return upd; }
  if (sub === 'primes')    { const upd = renderPrimes(view); root.append(view); return upd; }
  if (sub === 'recolte')   { renderRecolteHub(view); root.append(view); return () => {}; }
  if (sub !== 'hub')       { view.append(comingSoon(sub)); root.append(view); return () => {}; }

  for (const q of VILLAGE) {
    const cards = q.cards.map((c) => c.id === 'forge' ? forgeCardData(c) : recolteCardData(c));
    const grid = el('div.card-grid', {}, cards.map((c) => menuCard(c, (d) => { if (VILLAGE_SUBS.has(d.id)) navigateSub(d.id); })));
    view.append(panel(q.quartier, [grid]));
  }
  root.append(view);
  return () => {}; // pas d'update() : recalculé à chaque navigation (voir router.js), rien à rafraîchir en direct pendant que l'écran reste monté
}

// ---------- Atelier de craft (Forge / Cuisine) — refs + update, pas de rebuild à chaque tick ----------
// Filtres Type + Rareté + Stat dominante (dropdowns custom, voir dropdown() ci-dessus) :
// la Forge couvre tout le catalogue généré (191 pièces d'équipement, voir game/items.js)
// — un mur de blocs sans filtre. Les dropdowns sont déduits des recettes présentes,
// donc aucune retouche nécessaire à chaque nouvel ajout au catalogue. Le filtre Type
// démarre sur la 1ère catégorie (pas "Tous") pour que l'écran reste court dès l'entrée ;
// "Tous les types" reste choisissable pour qui veut la liste complète.
function renderCraft(view, station, title, verb) {
  if (station === 'forge') {
    const badge = el('span.rarity-badge.rarity-' + highestUnlockedRarity(), { text: RARITY_LABEL[highestUnlockedRarity()] });
    view.append(el('div.section-title-row', {}, [el('h2.section-title', { text: title }), badge]));
  } else {
    view.append(el('h2.section-title', { text: title }));
  }
  const goldLine = el('div.craft-gold');
  view.append(goldLine);

  const kinds = [], rarities = [], statFocuses = [];
  for (const recipe of RECIPES[station]) {
    const out = ITEMS[recipe.out];
    if (!kinds.includes(out.kind)) kinds.push(out.kind);
    if (out.rarity && !rarities.includes(out.rarity)) rarities.push(out.rarity);
    const ps = primaryStat(out);
    if (ps && !statFocuses.includes(ps)) statFocuses.push(ps);
  }
  rarities.sort((a, b) => RARITY_ORDER.indexOf(a) - RARITY_ORDER.indexOf(b));
  statFocuses.sort();

  let kindFilter = kinds.length > 1 ? kinds[0] : 'tous';
  let rarityFilter = 'tous';
  let statFilter = 'tous';

  const filterBar = el('div.craft-filters');
  const hasFilters = kinds.length > 1 || rarities.length > 1 || statFocuses.length > 1;
  if (hasFilters) view.append(filterBar);

  const list = el('div.craft-list');
  view.append(list);

  const rows = [];
  for (const recipe of RECIPES[station]) {
    const out = ITEMS[recipe.out];
    const stats = out.weapon
      ? `${Object.entries(out.stats).map(([k, v]) => `+${v} ${STAT_ABR[k] || k}`).join(' · ')} · Tempo ${out.weapon.tempo}s · Note ${out.weapon.note}`
      : out.heal ? `+${out.heal} PV`
      : out.endurance ? `+${out.endurance} Endurance`
      : out.kind === 'potion' ? `+${out.pct}% ${POTION_STAT_LABEL[out.stat] || out.stat} · ${Math.round(out.ms / 1000)}s`
      : out.stats ? Object.entries(out.stats).map(([k, v]) => `+${v} ${STAT_ABR[k] || k}`).join(' · ')
      : '';

    const costRow = el('div.craft-cost');
    const craftBtn = el('button.btn-craft', { onclick: () => { craft(recipe, stepper.get()); syncRow(row); } });
    const stepper = qtyStepper(() => maxCraftable(recipe), () => syncRow(row));
    const card = el('div.craft-card', {}, [
      el('div.craft-head', {}, [
        iconNode(out.icon, 'craft-icon'),
        el('div.craft-info', {}, [
          el('div.craft-name' + (out.rarity ? '.rarity-' + out.rarity : ''), { text: out.name }),
          stats ? el('div.craft-stats', { text: stats }) : null,
        ]),
      ]),
      costRow,
      stepper.root,
      craftBtn,
    ]);
    list.append(card);
    const row = { recipe, out, kind: out.kind, rarity: out.rarity, statFocus: primaryStat(out), card, costRow, craftBtn, stepper };
    rows.push(row);
  }

  function syncFilters() {
    const kids = [];
    if (kinds.length > 1) {
      kids.push(dropdown(
        [{ value: 'tous', label: 'Tous les types' }, ...kinds.map((k) => ({ value: k, label: KIND_LABEL[k] || k }))],
        kindFilter, (v) => { kindFilter = v; applyFilters(); },
      ).root);
    }
    if (rarities.length > 1) {
      // Options visibles : les raretés débloquées + la toute prochaine (grisée, pas
      // sélectionnable) — les paliers plus loin restent invisibles dans ce menu, pas
      // de spoil au-delà de l'objectif immédiat (voir dropdown() ci-dessus).
      const unlockedSet = unlockedRarities();
      const visible = [];
      for (const r of RARITY_ORDER) {
        if (!rarities.includes(r)) continue;
        const locked = !unlockedSet.has(r);
        visible.push({ value: r, label: RARITY_LABEL[r] || r, locked });
        if (locked) break;
      }
      kids.push(dropdown(
        [{ value: 'tous', label: 'Toutes raretés' }, ...visible],
        rarityFilter, (v) => { rarityFilter = v; applyFilters(); },
        { onLockedClick: (o) => showToast(`${o.label} — déblocable dans l'Ascension`, { icon: GEM_ICON }) },
      ).root);
    }
    if (statFocuses.length > 1) {
      kids.push(dropdown(
        [{ value: 'tous', label: 'Toute stat' }, ...statFocuses.map((s) => ({ value: s, label: STAT_FULL_LABEL[s] || s }))],
        statFilter, (v) => { statFilter = v; applyFilters(); },
      ).root);
    }
    filterBar.replaceChildren(...kids);
  }
  function applyFilters() {
    for (const row of rows) {
      const passKind = kindFilter === 'tous' || row.kind === kindFilter;
      // "Toutes raretés" ne doit montrer QUE les raretés débloquées (voir Ascension,
      // game/ascension.js isRarityUnlocked) — sélectionner une rareté précise dans le
      // dropdown reste possible seulement pour les raretés débloquées + la toute
      // prochaine (visible grisée dans syncFilters, non sélectionnable).
      const passRarity = rarityFilter === 'tous' ? (!row.rarity || isRarityUnlocked(row.rarity)) : row.rarity === rarityFilter;
      const passStat = statFilter === 'tous' || row.statFocus === statFilter;
      row.card.style.display = (passKind && passRarity && passStat) ? '' : 'none';
    }
  }

  function syncRow(row) {
    const q = row.stepper.get();
    // Gating de rareté (Ascension, voir game/ascension.js) : n'affecte que les items
    // avec un `rarity` non débloqué (Forge) — no-op pour Cuisine/Alchimiste (out.rarity
    // absent, isRarityUnlocked(undefined) === true).
    const rarityLocked = row.rarity && !isRarityUnlocked(row.rarity);
    const ok = !rarityLocked && canCraft(row.recipe, q);
    row.card.classList.toggle('disabled', !ok);
    row.card.classList.toggle('locked', rarityLocked);
    row.craftBtn.disabled = !ok;
    row.craftBtn.textContent = rarityLocked ? 'Rareté verrouillée (Ascension)' : `${verb} ×${q}`;
    row.costRow.replaceChildren(...(rarityLocked ? [] : Object.entries(row.recipe.cost).map(([k, v]) => {
      const need = v * q;
      if (RESOURCE_KEYS.includes(k)) return costChip(RES_ICON[k] || '•', need, state.resources[k] || 0);
      const it = ITEMS[k];
      return costChip(it ? it.icon : '•', need, invCount(k));
    })));
  }

  function update() {
    const r = state.resources;
    goldLine.replaceChildren(...['or', 'bois', 'metal', 'tissu', 'fragments'].map((k) =>
      el('span.craft-gold-res', {}, [iconNode(RES_ICON[k], 'icon'), el('span', { text: String(r[k] || 0) })])
    ));
    for (const row of rows) syncRow(row);
  }
  if (hasFilters) syncFilters();
  applyFilters();
  update();
  return update;
}

// ---------- Marchand : Acheter / Vendre — signature-guard (rebuild seulement si or/inventaire change) ----------
function renderMarchand(view) {
  view.append(el('h2.section-title', { text: 'Marchand' }));
  const goldLine = el('div.craft-gold');
  view.append(goldLine);

  const tabs = el('div.tabs');
  const tabBuy = el('button.tab.active', { text: 'Acheter', onclick: () => { activeTab = 'buy'; syncTabs(); build(); } });
  const tabSell = el('button.tab', { text: 'Vendre', onclick: () => { activeTab = 'sell'; syncTabs(); build(); } });
  tabs.append(tabBuy, tabSell);
  view.append(tabs);

  const listBox = el('div');
  view.append(listBox);

  let activeTab = 'buy';
  let sig = null;

  function syncTabs() {
    tabBuy.classList.toggle('active', activeTab === 'buy');
    tabSell.classList.toggle('active', activeTab === 'sell');
  }

  function computeSig() { return activeTab + '|' + state.resources.or + '|' + JSON.stringify(state.inventory); }

  function build() {
    sig = computeSig();
    goldLine.replaceChildren(iconNode(OR_ICON, 'icon'), el('span', { text: String(state.resources.or) }));
    listBox.replaceChildren();

    if (activeTab === 'buy') {
      for (const tid of BUY_CATALOG) {
        const it = ITEMS[tid]; if (!it) continue;
        const price = buyPrice(it);
        const costRow = el('div.craft-cost');
        const buyBtn = el('button.btn-craft');
        const stepper = qtyStepper(() => Math.max(0, Math.floor(state.resources.or / price)), () => syncBuyRow());
        function syncBuyRow() {
          const q = stepper.get();
          const ok = state.resources.or >= price * q;
          card.classList.toggle('disabled', !ok);
          buyBtn.disabled = !ok;
          buyBtn.textContent = `Acheter ×${q}`;
          costRow.replaceChildren(costChip(OR_ICON, price * q, state.resources.or));
        }
        buyBtn.onclick = () => buyItem(tid, stepper.get());
        const card = el('div.craft-card', {}, [
          el('div.craft-head', {}, [
            iconNode(it.icon, 'craft-icon'),
            el('div.craft-info', {}, [
              el('div.craft-name', { text: it.name }),
              it.heal ? el('div.craft-stats', { text: `+${it.heal} PV` }) : it.endurance ? el('div.craft-stats', { text: `+${it.endurance} Endurance` }) : null,
            ]),
          ]),
          costRow,
          stepper.root,
          buyBtn,
        ]);
        syncBuyRow();
        listBox.append(card);
      }
    } else {
      const stacks = state.inventory.filter((s) => { const it = ITEMS[s.tid]; return it && (it.sell || 0) > 0; });
      if (!stacks.length) listBox.append(el('div.placeholder-note', { text: 'Rien à vendre.' }));
      for (const s of stacks) {
        const it = ITEMS[s.tid];
        listBox.append(el('div.craft-card', {}, [
          el('div.craft-head', {}, [
            iconNode(it.icon, 'craft-icon'),
            el('div.craft-info', {}, [
              el('div.craft-name', { text: `${it.name} (${s.count})` }),
              el('div.craft-stats', { text: `${it.sell} or / unité` }),
            ]),
          ]),
          el('button.btn-craft', { text: 'Vendre 1', onclick: () => sellItem(s.tid, 1) }),
        ]));
      }
    }
  }

  function update() { if (computeSig() !== sig) build(); }
  build();
  return update;
}

// ---------- Primes : 3 défis quotidiens (voir game/primes.js) — signature-guard ----------
function renderPrimes(view) {
  view.append(el('h2.section-title', { text: 'Primes' }));
  view.append(el('div.placeholder-note', { text: 'Renouvelées chaque jour. Progression suivie automatiquement.' }));

  const list = el('div.craft-list');
  view.append(list);

  let sig = null;
  const computeSig = () => JSON.stringify(primesList());

  function build() {
    sig = computeSig();
    list.replaceChildren();
    for (const p of primesList()) {
      const bar = el('div.fill');
      const claimBtn = el('button.btn-craft', {
        text: p.claimed ? 'Réclamée' : p.ready ? 'Réclamer' : `${p.progress} / ${p.target}`,
        disabled: !p.ready || p.claimed ? 'true' : null,
        onclick: () => { claimPrime(p.id); build(); },
      });
      list.append(el('div.craft-card' + (p.claimed ? '.disabled' : ''), {}, [
        el('div.craft-head', {}, [
          iconNode(p.icon, 'craft-icon'),
          el('div.craft-info', {}, [
            el('div.craft-name', { text: p.label }),
            el('div.craft-stats', { text: p.desc }),
          ]),
        ]),
        el('div.mini-gauge', {}, [bar]),
        el('div.craft-stats', {}, [
          el('span', { text: `${p.progress} / ${p.target}` }),
          ...Object.entries(p.reward || {}).flatMap(([k, v]) => [el('span', { text: '  ·  ' }), iconNode(RES_ICON[k] || '', 'icon'), el('span', { text: `+${v}` })]),
        ]),
        claimBtn,
      ]));
      bar.style.width = Math.min(100, (p.progress / p.target) * 100) + '%';
    }
  }

  function update() { if (computeSig() !== sig) build(); }
  build();
  return update;
}

function costChip(icon, need, have) {
  const enough = have >= need;
  return el('span.cost-chip' + (enough ? '' : '.miss'), {}, [
    iconNode(icon, 'icon'),
    el('span', { text: `${need}` }),
    el('span.cost-have', { text: `(${have})` }),
  ]);
}

// ---------- Sub-hub "Récolte" : regroupe les 4 métiers sous un seul onglet subnav
// (voir config.js RECOLTE_CARDS/SUBNAV_PARENT) pour ne pas faire déborder la barre. ----------
function renderRecolteHub(view) {
  view.append(el('h2.section-title', { text: 'Récolte' }));
  const grid = el('div.card-grid', {}, RECOLTE_CARDS.map((c) => menuCard(recolteCardData(c), (d) => navigateSub(d.id))));
  view.append(grid);
}

// ---------- Métiers de récolte (Minage/Bûcheronnage/Tissage/Résonance) : filons à
// progression temporisée et PERSISTANTE (voir game/gathering.js) ----------
// La progression tient au temps écoulé (state.skills[key].active.startedAt), pas à
// un minuteur local : elle continue même si on quitte l'onglet, ferme l'app ou se
// déconnecte (rattrapage au retour — voir game/offlineReport.js). La boucle rAF ici
// ne sert qu'à l'affichage (barre fluide + crédit régulier pendant que l'onglet est
// ouvert) ; elle s'arrête d'elle-même dès que la vue quitte le DOM. Un seul renderer
// pour les 4 métiers (skill = skillApi exporté par mining.js/bucheronnage.js/tissage.js/
// resonance.js, tous construits sur la même factory) plutôt que 4 copies quasi
// identiques — `actionVerb` est le seul texte qui change sur le bouton d'un filon actif.
function renderGatherStation(view, skill, title, levelLabel, actionVerb = 'Récolter') {
  view.append(el('div.section-title-row', {}, [
    el('button.btn-back', { text: '← Retour', onclick: () => navigateSub('recolte') }),
    el('h2.section-title', { text: title }),
  ]));
  const lvlBox = el('div.mining-level');
  view.append(lvlBox);

  const grid = el('div.mining-grid');
  view.append(grid);

  const stopBtn = el('button.btn-stop.mining-stop', { text: "Arrêter le filon actif", onclick: () => skill.stop() });
  view.append(stopBtn);

  const nodeRefs = {};
  for (const node of skill.NODES) {
    const bar = el('div.fill');
    const btn = el('button.btn-craft', { onclick: () => { skill.start(node.id); } });
    const card = el('div.craft-card.mining-card', {}, [
      el('div.craft-head', {}, [
        iconNode(node.icon, 'craft-icon'),
        el('div.craft-info', {}, [
          el('div.craft-name', { text: node.name }),
          el('div.craft-stats', { text: node.desc }),
        ]),
      ]),
      el('div.mining-yield', {}, [
        iconNode(RES_ICON[node.resource] || node.icon, 'icon'),
        el('span', { text: `+${node.amount} · +${node.xp} XP · ${fmtNodeDuration(node.duration)}` }),
      ]),
      el('div.mini-gauge', {}, [bar]),
      btn,
    ]);
    grid.append(card);
    nodeRefs[node.id] = { card, bar, btn };
  }

  function syncNodes() {
    const active = skill.currentNode();
    const lvl = skill.level(), xp = skill.xp(), req = xpForLevel(lvl);
    lvlBox.textContent = `${levelLabel} ${lvl} — ${Math.floor(xp)} / ${req} XP`;
    stopBtn.style.display = active ? '' : 'none';
    for (const node of skill.NODES) {
      const r = nodeRefs[node.id];
      const unlocked = skill.canGather(node);
      const isActiveNode = !!active && active.id === node.id;
      r.card.classList.toggle('locked', !unlocked);
      r.bar.style.width = (isActiveNode ? skill.getProgress() : 0) + '%';
      r.btn.disabled = unlocked ? null : 'true';
      r.btn.textContent = !unlocked ? `Niveau ${node.levelReq} requis` : isActiveNode ? `${actionVerb} (clic = accélère)` : actionVerb;
      r.btn.classList.toggle('active', isActiveNode);
    }
  }

  // Premier check différé via rAF : à cet instant `view` n'est pas encore attaché au
  // DOM (root.append(view) n'est appelé qu'après le retour de renderGatherStation —
  // voir renderVillage) ; un appel synchrone ferait échouer document.body.contains()
  // et tuerait la boucle avant même le premier frame.
  function loop() {
    if (!document.body.contains(view)) return; // vue démontée → arrêt de la boucle visuelle
    skill.creditPending(); // encaisse les cycles pleins en direct pendant que l'onglet est ouvert
    syncNodes();
    requestAnimationFrame(loop);
  }
  syncNodes();
  requestAnimationFrame(loop);

  return syncNodes; // update() : re-sync immédiat sur setState (récompense/level-up)
}

// Affichage de la durée d'un filon : secondes en dessous d'une minute (Minage,
// cycles courts), minutes au-dessus (Bûcheronnage/Tissage/Résonance, cycles longs
// — voir leurs fichiers game/*.js pour le detail des taux réduits).
function fmtNodeDuration(ms) {
  return ms < 60000 ? `${Math.round(ms / 1000)}s` : `${Math.round(ms / 60000)}min`;
}

function comingSoon(id) {
  return el('div', {}, [
    el('h2.section-title', { text: id }),
    el('div.placeholder-note', { text: 'Module « ' + id + ' » — à venir (Phase 5).' }),
  ]);
}

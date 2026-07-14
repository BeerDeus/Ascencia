// ===== Vue Village (Hub + Forge + Cuisine) =====
import { el, iconNode } from '../utils/dom.js';
import { VILLAGE, SUBNAV } from '../config.js';
import { menuCard, panel } from '../components/card.js';
import { navigateSub } from '../router.js';
import { ITEMS, RECIPES, RESOURCE_KEYS, BUY_CATALOG, craft, canCraft, maxCraftable, invCount, buyItem, buyPrice, sellItem } from '../game/items.js';
import { MINING_NODES, currentNode, getProgress, canMine, startMining, stopMining, creditPending, miningLevel, miningXp, xpForLevel } from '../game/mining.js';
import { state } from '../state.js';

const VILLAGE_SUBS = new Set(SUBNAV.village.map((s) => s.id));
const OR_ICON = 'assets/sprites/objets/piece_or.png';
const RES_ICON = {
  or: OR_ICON,
  bois: 'assets/sprites/ressources/bois.png',
  metal: 'assets/sprites/ressources/metal.png',
  tissu: 'assets/sprites/ressources/tissu.png',
  fragments: 'assets/sprites/ressources/fragment.png',
};
const STAT_ABR = { vie: 'Vie', force: 'For', agilite: 'Agi', chance: 'Cha', intelligence: 'Int', defense: 'Déf' };
// Libellés des filtres de tri (Forge/Cuisine) — clé = `kind` de l'item produit par la recette.
const KIND_LABEL = {
  tete: 'Tête', arme: 'Arme', torse: 'Torse', mains: 'Mains', jambes: 'Jambes', pieds: 'Pieds',
  accessoire: 'Accessoire', artefact: 'Artefact', conso: 'Soins', energie: 'Énergie', materiau: 'Matériaux',
};
const RARITY_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'special'];
const RARITY_LABEL = {
  common: 'Commun', uncommon: 'Peu commun', rare: 'Rare', epic: 'Épique',
  legendary: 'Légendaire', mythic: 'Mythique', special: 'Spécial',
};
// Stat dominante d'une pièce (plus haute valeur absolue dans `stats`) — 3ème filtre,
// utile pour viser une build (Force/Guerrier, Agilité/Archer, Intelligence/Mage...).
const STAT_FULL_LABEL = { vie: 'Vie', force: 'Force', agilite: 'Agilité', chance: 'Chance', intelligence: 'Intelligence', defense: 'Défense' };
function primaryStat(out) {
  const entries = Object.entries(out.stats || {});
  if (!entries.length) return null;
  entries.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  return entries[0][0];
}

// ---- Dropdown custom (façon DA Ascencia) — un <select> natif ne peut pas être
// stylé dans le thème sombre/or (menu déroulant = chrome du navigateur). Bouton +
// panneau flottant, mêmes couleurs que le reste de l'UI. Un seul ouvert à la fois.
let openDropdown = null;
function dropdown(options, value, onChange) {
  const labelFor = (v) => (options.find((o) => o.value === v) || {}).label || '';
  const labelEl = el('span.dd-label', { text: labelFor(value) });
  const btn = el('button.dd-btn', { onclick: (e) => { e.stopPropagation(); toggle(); } }, [
    labelEl, el('span.dd-chevron', { text: '▾' }),
  ]);
  const panelEl = el('div.dd-panel');
  panelEl.style.display = 'none';
  const root = el('div.dd', {}, [btn, panelEl]);

  function renderPanel() {
    panelEl.replaceChildren(...options.map((o) => el('button.dd-item' + (o.value === value ? '.sel' : ''), {
      text: o.label, onclick: (e) => { e.stopPropagation(); value = o.value; labelEl.textContent = o.label; close(); onChange(value); },
    })));
  }
  function open() {
    if (openDropdown && openDropdown !== closeFn) openDropdown();
    renderPanel();
    panelEl.style.display = '';
    btn.classList.add('open');
    openDropdown = closeFn;
    document.addEventListener('click', onDocClick, true);
  }
  function close() {
    panelEl.style.display = 'none';
    btn.classList.remove('open');
    if (openDropdown === closeFn) openDropdown = null;
    document.removeEventListener('click', onDocClick, true);
  }
  function closeFn() { close(); }
  function toggle() { panelEl.style.display === 'none' ? open() : close(); }
  function onDocClick(e) { if (!root.contains(e.target)) close(); }

  return { root, get: () => value };
}

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

  if (sub === 'forge')     { const upd = renderCraft(view, 'forge',   'Forge du Forgeron', 'Forger'); root.append(view); return upd; }
  if (sub === 'cuisinier') { const upd = renderCraft(view, 'cuisine', 'Cuisine',           'Cuisiner'); root.append(view); return upd; }
  if (sub === 'minage')    { const upd = renderMinage(view); root.append(view); return upd; }
  if (sub === 'marchand')  { const upd = renderMarchand(view); root.append(view); return upd; }
  if (sub !== 'hub')       { view.append(comingSoon(sub)); root.append(view); return () => {}; }

  for (const q of VILLAGE) {
    const grid = el('div.card-grid', {}, q.cards.map((c) => menuCard(c, (d) => { if (VILLAGE_SUBS.has(d.id)) navigateSub(d.id); })));
    view.append(panel(q.quartier, [grid]));
  }
  root.append(view);
  return () => {}; // hub 100% statique (aucune donnée dynamique affichée)
}

// ---------- Atelier de craft (Forge / Cuisine) — refs + update, pas de rebuild à chaque tick ----------
// Filtres Type + Rareté + Stat dominante (dropdowns custom, voir dropdown() ci-dessus) :
// la Forge couvre tout le catalogue généré (191 pièces d'équipement, voir game/items.js)
// — un mur de blocs sans filtre. Les dropdowns sont déduits des recettes présentes,
// donc aucune retouche nécessaire à chaque nouvel ajout au catalogue. Le filtre Type
// démarre sur la 1ère catégorie (pas "Tous") pour que l'écran reste court dès l'entrée ;
// "Tous les types" reste choisissable pour qui veut la liste complète.
function renderCraft(view, station, title, verb) {
  view.append(el('h2.section-title', { text: title }));
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
      kids.push(dropdown(
        [{ value: 'tous', label: 'Toutes raretés' }, ...rarities.map((r) => ({ value: r, label: RARITY_LABEL[r] || r }))],
        rarityFilter, (v) => { rarityFilter = v; applyFilters(); },
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
      const passRarity = rarityFilter === 'tous' || row.rarity === rarityFilter;
      const passStat = statFilter === 'tous' || row.statFocus === statFilter;
      row.card.style.display = (passKind && passRarity && passStat) ? '' : 'none';
    }
  }

  function syncRow(row) {
    const q = row.stepper.get();
    const ok = canCraft(row.recipe, q);
    row.card.classList.toggle('disabled', !ok);
    row.craftBtn.disabled = !ok;
    row.craftBtn.textContent = `${verb} ×${q}`;
    row.costRow.replaceChildren(...Object.entries(row.recipe.cost).map(([k, v]) => {
      const need = v * q;
      if (RESOURCE_KEYS.includes(k)) return costChip(RES_ICON[k] || '•', need, state.resources[k] || 0);
      const it = ITEMS[k];
      return costChip(it ? it.icon : '•', need, invCount(k));
    }));
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

function costChip(icon, need, have) {
  const enough = have >= need;
  return el('span.cost-chip' + (enough ? '' : '.miss'), {}, [
    iconNode(icon, 'icon'),
    el('span', { text: `${need}` }),
    el('span.cost-have', { text: `(${have})` }),
  ]);
}

// ---------- Minage : filons à progression temporisée et PERSISTANTE (voir game/mining.js) ----------
// La progression tient au temps écoulé (state.skills.mining.active.startedAt), pas à
// un minuteur local : elle continue même si on quitte l'onglet, ferme l'app ou se
// déconnecte (rattrapage au retour — voir game/offlineReport.js). La boucle rAF ici
// ne sert qu'à l'affichage (barre fluide + crédit régulier pendant que l'onglet est
// ouvert) ; elle s'arrête d'elle-même dès que la vue quitte le DOM.
function renderMinage(view) {
  view.append(el('h2.section-title', { text: 'Minage' }));
  const lvlBox = el('div.mining-level');
  view.append(lvlBox);

  const grid = el('div.mining-grid');
  view.append(grid);

  const stopBtn = el('button.btn-stop.mining-stop', { text: "Arrêter le filon actif", onclick: () => stopMining() });
  view.append(stopBtn);

  const nodeRefs = {};
  for (const node of MINING_NODES) {
    const bar = el('div.fill');
    const btn = el('button.btn-craft', { onclick: () => { startMining(node.id); } });
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
        el('span', { text: `+${node.amount} · +${node.xp} XP · ${Math.round(node.duration / 1000)}s` }),
      ]),
      el('div.mini-gauge', {}, [bar]),
      btn,
    ]);
    grid.append(card);
    nodeRefs[node.id] = { card, bar, btn };
  }

  function syncNodes() {
    const active = currentNode();
    const lvl = miningLevel(), xp = miningXp(), req = xpForLevel(lvl);
    lvlBox.textContent = `Niveau de Minage ${lvl} — ${Math.floor(xp)} / ${req} XP`;
    stopBtn.style.display = active ? '' : 'none';
    for (const node of MINING_NODES) {
      const r = nodeRefs[node.id];
      const unlocked = canMine(node);
      const isActiveNode = !!active && active.id === node.id;
      r.card.classList.toggle('locked', !unlocked);
      r.bar.style.width = (isActiveNode ? getProgress() : 0) + '%';
      r.btn.disabled = unlocked ? null : 'true';
      r.btn.textContent = !unlocked ? `Niveau ${node.levelReq} requis` : isActiveNode ? 'Miner (clic = coup de pioche)' : 'Miner';
      r.btn.classList.toggle('active', isActiveNode);
    }
  }

  // Premier check différé via rAF : à cet instant `view` n'est pas encore attaché au
  // DOM (root.append(view) n'est appelé qu'après le retour de renderMinage — voir
  // renderVillage) ; un appel synchrone ferait échouer document.body.contains() et
  // tuerait la boucle avant même le premier frame.
  function loop() {
    if (!document.body.contains(view)) return; // vue démontée → arrêt de la boucle visuelle
    creditPending(); // encaisse les cycles pleins en direct pendant que l'onglet est ouvert
    syncNodes();
    requestAnimationFrame(loop);
  }
  syncNodes();
  requestAnimationFrame(loop);

  return syncNodes; // update() : re-sync immédiat sur setState (récompense/level-up)
}

function comingSoon(id) {
  return el('div', {}, [
    el('h2.section-title', { text: id }),
    el('div.placeholder-note', { text: 'Module « ' + id + ' » — à venir (Phase 5).' }),
  ]);
}

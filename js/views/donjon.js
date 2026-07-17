// ===== Vue Brèche Instable (Aventure > Brèche) =====
// Deux temps : écran d'entrée normal (résonateurs / Gardien Harmonique / choix du
// checkpoint, dans le flux Aventure habituel) et plein écran (labyrinthe + HUD, masque
// header/subnav/mainnav — voir css/base.css #app.donjon-mode, même principe que
// #app.combat-mode/#app.constellation-mode, voir router.js). Le plein écran masquant
// TOUTE navigation externe, le bouton "Retour" (+ confirmation, perte de 50% du butin
// de la run) est volontairement le SEUL chemin de sortie — pas de garde de navigation
// séparée à écrire, la même mécanique que le Combat/l'Ascension le fait déjà gratuitement.
//
// Rendu du labyrinthe : viewport fixe + canvas transformé (translate) recentré sur le
// joueur à CHAQUE déplacement, avec transition CSS — caméra qui "suit" le personnage
// (retour utilisateur 2026-07-17), pas une grille statique qu'on scrolle à la main.
import { el, iconNode } from '../utils/dom.js';
import { state } from '../state.js';
import { ZONES } from '../config.js';
import { dropdown } from '../components/dropdown.js';
import {
  resonatorStatus, canEnterBreche, gardienVaincu, launchGardien,
  zoneEquivForFloor, checkpoints, runMaxHp, isRunActive, currentRun, currentTile,
  startRun, advanceFloor, endRun, moveDir, reachableNeighbors, acceptEvent, declineEvent, dismissStairsPrompt,
} from '../game/donjon.js';
import { isActive as combatActive, current as combatCurrent, stop as combatStop, consume as combatConsume, renderInto as combatRenderInto, setChangeHook } from '../game/combat.js';
import { ENEMIES, BOSSES } from '../game/monsters.js';
import { ITEMS } from '../game/items.js';
import { eventById } from '../data/donjon_events.js';

const CELL = 56; // px — taille fixe d'une case du labyrinthe (voir mountGrid())
const TILE_ICON = {
  entry: 'assets/sprites/icons/start.png',
  empty: null,
  event: 'assets/sprites/icons/event.png',
  boss: 'assets/sprites/icons/elite.png',
  stairs: 'assets/sprites/icons/next_floor.png',
};
const DPAD_LABEL = { N: '▲', S: '▼', E: '▶', W: '◀' };
const RES_ZONE_NAME = (id) => (ZONES.find((z) => z.id === id) || {}).name || `Zone ${id}`;

let fullscreenFlag = false;
export function isDonjonFullscreen() { return fullscreenFlag; }

export function renderDonjon(view) {
  // Reprise après refresh en pleine run : direct en plein écran (voir commentaire
  // en-tête — la run est persistée comme le reste de state.js).
  fullscreenFlag = isRunActive();
  const refs = {};
  let floorPick = null;                 // checkpoint sélectionné sur l'écran d'entrée
  let retourConfirm = false;            // modale de confirmation "Retour" (perte 50%)
  let mode = combatActive() ? 'combat' : 'grid';
  let combatRefs = null;

  function setFullscreen(v) { fullscreenFlag = v; const app = document.getElementById('app'); if (app) app.classList.toggle('donjon-mode', v); update(); }

  // ---- Shell normal (gate) ----
  refs.gate = el('div');
  view.append(refs.gate);
  // ---- Shell plein écran ----
  refs.hud = el('div.donjon-hud');
  refs.body = el('div.donjon-body');
  refs.fsWrap = el('div.donjon-fullscreen', { style: 'display:none;' }, [refs.hud, refs.body]);
  view.append(refs.fsWrap);
  refs.modal = el('div');
  view.append(refs.modal);

  // ================= Écran d'entrée =================
  function syncGate() {
    if (fullscreenFlag) { refs.gate.replaceChildren(); return; }
    const res = resonatorStatus();
    const resRows = res.map((r) => el('div.stat-row', {}, [
      el('span', { text: `Résonateur — ${RES_ZONE_NAME(r.zone)} (Zone ${r.zone})` }),
      el('span.value', { text: r.done ? 'Récupéré' : 'Manquant' }),
    ]));

    const blocks = [
      el('h2.section-title', { text: 'La Brèche Instable' }),
      el('div.view-intro', {
        text: "Une faille scellée par trois résonateurs harmoniques. Vaincre les gardiens des Zones 8, 9 et 10 en révèle l'emplacement — le Gardien Harmonique en garde le seuil.",
      }),
      el('section.card', {}, resRows),
    ];

    if (!canEnterBreche()) {
      blocks.push(el('div.placeholder-note', { text: 'Récupère les 3 résonateurs (boss des Zones 8, 9 et 10) pour révéler la Brèche.' }));
    } else if (!gardienVaincu()) {
      blocks.push(el('section.card', {}, [
        el('div.nac-title', { text: 'Gardien Harmonique' }),
        el('div.view-intro', { text: "Une entité de pure harmonie garde le seuil de la Brèche (difficulté proche du boss de la Zone 10). La vaincre l'ouvre pour de bon." }),
        el('button.btn-craft', { text: 'Affronter le Gardien Harmonique', onclick: () => { launchGardien(); setFullscreen(true); } }),
      ]));
    } else {
      const cps = checkpoints();
      if (floorPick == null) floorPick = cps[cps.length - 1];
      // Dropdown custom (voir components/dropdown.js — pas de <select> natif, DA
      // sombre/or incompatible avec le chrome navigateur, cf. Forge). Le bouton
      // "Descendre" garde son libellé à jour via la ref directe (onChange ne
      // reconstruit pas tout l'écran d'entrée, juste la variable + ce libellé).
      const btnDescendre = el('button.btn-craft', {
        text: `Descendre à l'étage ${floorPick}`,
        style: 'margin-top:14px;',
        onclick: () => { startRun(floorPick); setFullscreen(true); },
      });
      const dd = dropdown(
        cps.map((f) => ({ value: f, label: `Étage ${f} (~Zone ${zoneEquivForFloor(f)})` })),
        floorPick,
        (v) => { floorPick = v; btnDescendre.textContent = `Descendre à l'étage ${floorPick}`; },
      );
      // Padding sous le dropdown (retour utilisateur 2026-07-17 : trop collé au bouton
      // "Descendre") + l'encadré entier légèrement plus bas (margin-top augmenté).
      dd.root.style.marginBottom = '12px';
      blocks.push(el('section.card', { style: 'margin-top:22px;' }, [
        el('div.nac-title', { text: 'Entrer dans la Brèche' }),
        el('div.view-intro', { text: 'Choisis ton étage de départ (checkpoints débloqués tous les 10 étages).' }),
        dd.root,
        btnDescendre,
      ]));
    }
    refs.gate.replaceChildren(...blocks);
  }

  // ================= HUD plein écran =================
  function syncHud() {
    if (!fullscreenFlag) { refs.hud.replaceChildren(); return; }
    const run = currentRun();
    if (!run) return;
    const max = runMaxHp();
    const cur = Math.min(max, state.player.combatHp.cur);
    refs.hud.replaceChildren(
      el('div.donjon-hud-row', {}, [
        el('div.hud-points', { text: `Étage ${run.floor} · ${run.zoneName} (~Zone ${zoneEquivForFloor(run.floor)})` }),
        el('button.hud-btn.hud-close', { text: 'Retour', onclick: () => { retourConfirm = true; update(); } }),
      ]),
      el('div.hpbar.player.donjon-hpbar', {}, [
        el('div.fill', { style: `width:${Math.max(0, Math.min(100, (cur / max) * 100))}%` }),
        el('span.hpbar-txt', { text: `${Math.ceil(cur)} / ${max}` }),
      ]),
      el('div.donjon-hud-row', {}, [
        el('span.text-muted', { text: `Éclats de Brèche : ${state.resources.eclats_breche || 0}` }),
        run.reviveCharges > 0 ? el('span.text-positive', { text: `Bénédiction ×${run.reviveCharges}` }) : null,
        run.buffs && run.buffs.atkPct ? el('span.text-muted', { text: `Pacte : +${run.buffs.atkPct}% dégâts / ${run.buffs.maxHpPct}% PV max` }) : null,
      ]),
    );
  }

  // ================= Corps plein écran : labyrinthe OU combat =================
  // Bordures = murs (voir game/donjon.js carveMaze : N/S/E/W = true -> mur). Cellules
  // en CSS grid absolu de taille fixe (CELL px) ; la caméra ne bouge pas la grille par
  // scroll mais par transform:translate sur le canvas englobant (voir plus bas).
  function wallStyle(t) {
    if (!t) return '';
    const w = (blocked) => blocked ? '3px solid var(--border-gold)' : '3px solid transparent';
    return `border-top:${w(t.N)};border-right:${w(t.E)};border-bottom:${w(t.S)};border-left:${w(t.W)};`;
  }

  // Contenu d'une case (sprite ennemi/boss ou icône de type) — extrait car patché
  // indépendamment de la case elle-même (voir patchGrid()) quand une case change de
  // type SANS que l'étage change (ennemi vaincu -> 'empty', boss vaincu -> 'stairs',
  // événement résolu -> 'empty'), afin de ne jamais reconstruire le canvas pour ça.
  // Brouillard de guerre (retour utilisateur 2026-07-17 : "le joueur ne doit pas savoir
  // vers où aller pour affronter le boss") : `explored` vient de run.explored (voir
  // game/donjon.js revealAround()) — tant qu'une case n'a jamais été adjacente au
  // joueur, son CONTENU reste un "?" quel que soit son vrai type (les murs, eux,
  // restent toujours dessinés — voir wallStyle() — seul le contenu est masqué).
  function buildCellContent(iconBox, t, explored) {
    iconBox.replaceChildren();
    if (!t) return;
    if (!explored) {
      iconBox.append(el('span.donjon-fog-mark', { text: '?' }));
      return;
    }
    if (t.type === 'enemy') {
      const e = ENEMIES[t.enemyId];
      if (e) iconBox.append(el('img.sprite-img', { src: e.sprite === 'placeholder' ? 'assets/sprites/placeholder.png' : e.sprite, alt: '' }));
    } else if (t.type === 'boss') {
      const b = BOSSES.find((x2) => x2.id === t.enemyId) || ENEMIES[t.enemyId];
      if (b) iconBox.append(el('img.sprite-img', { src: b.sprite === 'placeholder' ? 'assets/sprites/placeholder.png' : b.sprite, alt: '' }));
    } else if (TILE_ICON[t.type]) {
      iconBox.append(iconNode(TILE_ICON[t.type], 'donjon-cell-icon'));
    }
  }

  // Construit le canvas/les cases UNE SEULE FOIS par étage (identité de `run.tiles` —
  // toujours un nouvel objet à chaque generateFloor(), voir game/donjon.js — sert de
  // clé de cache : startRun()/advanceFloor() invalident naturellement, un simple aller-
  // retour combat->grille sur le MÊME étage ne reconstruit rien). Retour utilisateur
  // 2026-07-17 : reconstruire le canvas à chaque déplacement cassait la transition CSS
  // (nouveau noeud = pas d'état "avant" à animer -> saut visible dans le coin).
  function ensureGrid() {
    const run = currentRun();
    if (!run) return;
    if (refs.canvas && refs.gridTiles === run.tiles) {
      // Canvas déjà construit pour cet étage (aucun rebuild nécessaire) MAIS un aller-
      // retour par le combat a pu détacher viewport/dpad de refs.body entre-temps
      // (mountCombat() fait refs.body.replaceChildren(stage, ...), qui VIDE refs.body
      // sans jamais restaurer la grille au retour) — bug constaté : après une victoire,
      // syncBody() repasse bien en mode 'grid' mais l'écran restait figé sur le combat
      // car ce retour anticipé ne réattachait rien. replaceChildren est idempotent si
      // déjà en place, donc gratuit dans le cas normal.
      refs.body.replaceChildren(refs.viewport, refs.dpadEl);
      return;
    }
    refs.cellNodes = {};
    // transition:none inline au montage : sans ça le canvas apparaît un instant à
    // translate(0,0) (coin haut-gauche, avant que patchGrid() calcule la position
    // centrée sur le joueur via rAF) PUIS la transition CSS anime ce saut jusqu'au
    // centre — c'est le "décale en haut à gauche puis se recentre" remonté par
    // l'utilisateur (2026-07-17). patchGrid() retire ce transition:none une fois le
    // tout premier positionnement posé, pour que les VRAIS déplacements restent animés.
    const canvas = el('div.donjon-canvas', {
      style: `width:${run.size * CELL}px;height:${run.size * CELL}px;grid-template-columns:repeat(${run.size},${CELL}px);grid-template-rows:repeat(${run.size},${CELL}px);transition:none;`,
    });
    for (let y = 0; y < run.size; y++) {
      for (let x = 0; x < run.size; x++) {
        const key = `${x},${y}`;
        const t = run.tiles[key];
        const explored = !!(run.explored && run.explored[key]);
        const iconBox = el('div.donjon-cell-icon-box');
        buildCellContent(iconBox, t, explored);
        const dot = el('div.donjon-player-dot', { style: 'display:none;' });
        const cell = el('div.donjon-cell', { style: wallStyle(t) }, [iconBox, dot]);
        refs.cellNodes[key] = { cell, iconBox, dot, type: t ? t.type : 'empty', explored };
        canvas.append(cell);
      }
    }
    const viewport = el('div.donjon-viewport', {}, [canvas]);
    const dpadEl = dpad([]);
    refs.body.replaceChildren(viewport, dpadEl);
    refs.canvas = canvas; refs.viewport = viewport; refs.dpadEl = dpadEl;
    refs.gridTiles = run.tiles;
    refs.freshCanvas = true; // voir patchGrid() : 1er positionnement sans transition (anti-flash)
  }

  // Patch léger appelé à CHAQUE render en mode grille (déplacement, retour de combat,
  // résolution d'événement...) : ne touche que les classes/onclick des cases + la
  // position de la caméra, jamais le canvas lui-même — voir ensureGrid() ci-dessus.
  function patchGrid() {
    const run = currentRun();
    if (!run || !refs.canvas) return;
    const reachable = reachableNeighbors();
    for (const key of Object.keys(refs.cellNodes)) {
      const node = refs.cellNodes[key];
      const [xs, ys] = key.split(',');
      const x = +xs, y = +ys;
      const t = run.tiles[key];
      const explored = !!(run.explored && run.explored[key]);
      // Rebuild du contenu si le TYPE a changé (ennemi vaincu, événement résolu...) OU
      // si la case vient tout juste d'être révélée (transition fog -> contenu réel).
      if (t && (t.type !== node.type || explored !== node.explored)) {
        buildCellContent(node.iconBox, t, explored);
        node.type = t.type;
        node.explored = explored;
      }
      const isPlayer = run.playerPos.x === x && run.playerPos.y === y;
      const target = reachable.find((n) => n.x === x && n.y === y);
      // Tant que non explorée : classe CSS générique 'fog' plutôt que le vrai type —
      // sinon .donjon-cell.boss (halo Dissonance) trahirait la position du boss à
      // travers le brouillard même avec l'icône masquée.
      const displayType = explored ? node.type : 'fog';
      node.cell.className = 'donjon-cell ' + displayType + (isPlayer ? ' player' : '') + (target ? ' reachable' : '');
      node.cell.onclick = target ? () => { moveDir(target.dir); update(); } : null;
      node.dot.style.display = isPlayer ? '' : 'none';
    }
    const newDpad = dpad(reachable);
    refs.dpadEl.replaceWith(newDpad);
    refs.dpadEl = newDpad;
    // Caméra centrée sur le joueur — recalculée à chaque patch ; le MÊME noeud
    // `.donjon-canvas` (jamais recréé) porte la transition CSS (voir views.css), d'où
    // le suivi fluide plutôt qu'un saut sec.
    requestAnimationFrame(() => {
      if (!refs.viewport || !refs.canvas) return;
      const vw = refs.viewport.clientWidth, vh = refs.viewport.clientHeight;
      const px = (run.playerPos.x + 0.5) * CELL, py = (run.playerPos.y + 0.5) * CELL;
      refs.canvas.style.transform = `translate(${vw / 2 - px}px, ${vh / 2 - py}px)`;
      // Canvas tout juste (re)construit (voir ensureGrid()) : ce premier positionnement
      // vient d'être posé SANS transition (transition:none inline) — on la réactive
      // seulement maintenant, au frame suivant, pour que ce cadrage initial ne soit
      // jamais animé (anti-flash) mais que les déplacements ultérieurs le restent.
      if (refs.freshCanvas) {
        refs.freshCanvas = false;
        requestAnimationFrame(() => { if (refs.canvas) refs.canvas.style.transition = ''; });
      }
    });
  }

  function mountGrid() { ensureGrid(); patchGrid(); }

  function dpad(reachable) {
    const has = (dir) => reachable.some((n) => n.dir === dir);
    const btn = (dir) => el('button.donjon-dpad-btn', {
      text: DPAD_LABEL[dir], disabled: has(dir) ? null : 'true',
      onclick: () => { moveDir(dir); update(); },
    });
    return el('div.donjon-dpad', {}, [
      el('div'), btn('N'), el('div'),
      btn('W'), el('div.donjon-dpad-center'), btn('E'),
      el('div'), btn('S'), el('div'),
    ]);
  }

  function mountCombat() {
    const stage = el('div.combat-screen');
    combatRenderInto(stage);
    const consumeBox = el('div');
    const controlsBox = el('div');
    refs.body.replaceChildren(stage, consumeBox, controlsBox);
    combatRefs = { consumeBox, controlsBox };
    syncCombatControls();
    setChangeHook(() => syncCombatControls());
  }

  function syncCombatControls() {
    const rt = combatCurrent();
    if (!rt || !combatRefs) return;
    const conso = state.player.equipment.conso;
    // replaceChildren(null) insère littéralement le texte "null" (ToString() sur
    // l'argument, pas un no-op) — il faut spreader un tableau vide, jamais passer
    // `null` tel quel. Bug constaté : "null" affiché sous le combat-screen dès que
    // rt.phase quitte 'fighting' (donc à CHAQUE victoire, voir onWin() combat.js).
    const consumeChild = rt.phase === 'fighting' && conso && conso.count > 0 && ITEMS[conso.tid]
      ? el('div.combat-consume', {}, [el('button.btn-consume', { onclick: () => combatConsume() }, [
          iconNode(ITEMS[conso.tid].icon, 'icon'), el('span', { text: ` ${ITEMS[conso.tid].name} (${conso.count})` }),
        ])])
      : null;
    combatRefs.consumeBox.replaceChildren(...(consumeChild ? [consumeChild] : []));
    combatRefs.controlsBox.replaceChildren(el('div.combat-controls', {}, [
      el('button.btn-quit', { text: 'Fuir le combat', onclick: () => { combatStop(); update(); } }),
    ]));
  }

  // Labyrinthe : canvas monté une fois par étage puis patché (voir ensureGrid()/
  // patchGrid() ci-dessus) — même principe que le combat (renderInto, bulles/pool)
  // monté une fois et seulement patché, comme dans views/aventure.js.
  //
  // Combat de Gardien Harmonique (gate, hors run) : une fois résolu, il n'existe
  // PLUS ni combat actif ni run active — on referme le plein écran pour retomber sur
  // l'écran d'entrée (qui reflète alors gardienVaincu()/checkpoints() à jour). Sans ce
  // garde-fou l'écran restait figé sur le dernier frame du combat (bug rapporté).
  function syncBody() {
    if (!fullscreenFlag) return;
    if (!combatActive() && !isRunActive()) { setFullscreen(false); return; }
    // combat.js onWin()/onLoss() déclenchent PLUSIEURS setState() successifs (butin,
    // monsterWins, XP, puis le hook donjon en tout dernier — voir game/donjon.js
    // handleWin()) : rt.active passe à false dès le 1er de ces setState, donc BIEN
    // avant que handleWin() n'ait résolu la case (type + combatTileKey). Basculer sur
    // la grille dans cette fenêtre affichait un état incohérent (case encore 'enemy',
    // combat qui semble ne "jamais se finir") — retour utilisateur 2026-07-17. On reste
    // en mode combat tant que la case n'a pas été résolue par le hook donjon.
    const run = currentRun();
    // Uniquement pour SORTIR du combat, jamais pour y entrer : combatTileKey est déjà
    // posé un instant AVANT combatStart() (voir game/donjon.js launchTileCombat()) —
    // s'appuyer dessus pour ENTRER planterait (rt encore null à ce moment précis, voir
    // combat.js renderInto()). Le garde `mode === 'combat'` restreint donc bien à la
    // fenêtre post-victoire/défaite en attente du hook donjon.
    const pendingDonjonResolve = mode === 'combat' && !combatActive() && !!(run && run.combatTileKey);
    const wantMode = (combatActive() || pendingDonjonResolve) ? 'combat' : 'grid';
    if (wantMode !== mode) { mode = wantMode; if (mode === 'combat') { mountCombat(); return; } }
    if (mode === 'combat') syncCombatControls(); else mountGrid();
  }

  // ================= Modales =================
  function retourModal() {
    const overlay = el('div.modal-overlay', { onclick: (e) => { if (e.target === overlay) { retourConfirm = false; update(); } } });
    overlay.append(el('div.modal-box', {}, [
      el('div.modal-title', { text: 'Quitter la Brèche ?' }),
      el('div.info-modal-desc', { text: "Tu perdras 50% du butin accumulé pendant cette run (or, ressources, matériaux). Confirmer ?" }),
      el('div.confirm-row', {}, [
        el('button.modal-close', { text: 'Rester', onclick: () => { retourConfirm = false; update(); } }),
        el('button.btn-craft', {
          text: 'Sortir (perte 50%)',
          onclick: () => { if (combatActive()) combatStop(); endRun(false); retourConfirm = false; setFullscreen(false); },
        }),
      ]),
    ]));
    return overlay;
  }

  function stairsModal() {
    const overlay = el('div.modal-overlay');
    overlay.append(el('div.modal-box', {}, [
      el('div.modal-title', { text: 'Le boss est vaincu' }),
      el('div.info-modal-desc', { text: "Un escalier s'ouvre vers l'étage suivant. Tu peux aussi rester explorer cet étage (repasse sur cette case pour rouvrir ce choix), ou quitter la Brèche avec la totalité de ton butin." }),
      el('div.confirm-row', {}, [
        el('button.modal-close', { text: 'Rester ici', onclick: () => { dismissStairsPrompt(); update(); } }),
        el('button.btn-secondary', { text: 'Quitter (loot complet)', onclick: () => { endRun(true); setFullscreen(false); } }),
        el('button.btn-craft', { text: "Descendre à l'étage suivant", onclick: () => { advanceFloor(); update(); } }),
      ]),
    ]));
    return overlay;
  }

  function eventModal() {
    const t = currentTile();
    const ev = t && eventById(t.eventId);
    // Les événements forcés (pièges) se résolvent tout seuls dès l'atterrissage — voir
    // game/donjon.js resolveTile()/resolveForcedEvent() — la case n'est donc normalement
    // plus 'event' à ce stade ; garde défensive si jamais appelée entre-temps.
    if (!ev || ev.forced) return null;
    const overlay = el('div.modal-overlay');
    overlay.append(el('div.modal-box', {}, [
      el('div.modal-title', {}, [iconNode(ev.icon, 'icon'), el('span', { text: ' ' + ev.label })]),
      el('div.info-modal-desc', { text: ev.desc }),
      el('div.confirm-row', {}, [
        el('button.modal-close', { text: 'Ignorer', onclick: () => { declineEvent(); update(); } }),
        el('button.btn-craft', { text: 'Prendre', onclick: () => { acceptEvent(); update(); } }),
      ]),
    ]));
    return overlay;
  }

  function syncModal() {
    const run = currentRun();
    const inGrid = fullscreenFlag && !combatActive() && run;
    const t = inGrid ? currentTile() : null;
    const showStairs = inGrid && run.promptStairs;
    const showEvent = inGrid && t && t.type === 'event';
    const overlay = retourConfirm ? retourModal() : showStairs ? stairsModal() : showEvent ? eventModal() : null;
    refs.modal.replaceChildren(...(overlay ? [overlay] : []));
  }

  function syncFullscreenVisibility() {
    refs.gate.style.display = fullscreenFlag ? 'none' : '';
    refs.fsWrap.style.display = fullscreenFlag ? 'flex' : 'none';
  }

  function update() {
    syncGate(); syncHud(); syncBody(); syncFullscreenVisibility(); syncModal();
    if (fullscreenFlag) { const app = document.getElementById('app'); if (app) app.classList.add('donjon-mode'); }
  }
  update();
  return update;
}

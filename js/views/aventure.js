// ===== Vue Aventure : interface de Zone <-> interface de Combat (Phase 2) =====
import { el, iconNode } from '../utils/dom.js';
import { state, setState } from '../state.js';
import { ZONES } from '../config.js';
import { rerender } from '../router.js';
import { isActive, current, start, stop, toggleAuto, consume, renderInto, WIN_REQ } from '../game/combat.js';
import { ITEMS } from '../game/items.js';
import { makeMonster, makeBoss } from '../game/monsters.js';

// Sprite : image (placeholder / chemin) ou emoji.
export function spriteImg(sprite) {
  const isPath = sprite && (sprite === 'placeholder' || sprite.includes('/') || sprite.endsWith('.png'));
  const src = isPath && sprite !== 'placeholder' ? sprite : 'assets/sprites/placeholder.png';
  return el('img.sprite-img', { src, alt: '' });
}

export function renderAventure(root, sub = 'combat') {
  const view = el('div.view');
  if (sub === 'carte')     { view.append(placeholder('Carte', 'Vue carte des zones — Phase 5.')); root.append(view); return () => {}; }

  // ---- sub 'combat' : bascule Zone <-> Combat, avec mount persistant du combat ----
  // Le combat (bulles/pool/animations, voir game/combat.js) ne doit être monté
  // qu'UNE FOIS par bataille : les setState pendant le combat (loot, XP, level-up)
  // ne doivent patcher que les contrôles, jamais reconstruire la scène.
  let mode = isActive() ? 'combat' : 'zone';
  let zoneUpdate = null;
  let combatRefs = null;

  mountMode();
  root.append(view);

  function mountMode() {
    view.replaceChildren();
    if (mode === 'zone') zoneUpdate = renderZone(view);
    else combatRefs = mountCombatShell(view);
  }

  function update() {
    const wantMode = isActive() ? 'combat' : 'zone';
    if (wantMode !== mode) { mode = wantMode; mountMode(); return; }
    if (mode === 'zone') zoneUpdate && zoneUpdate();
    else combatRefs && syncCombatControls(combatRefs);
  }
  return update;
}

// ---------- Interface de Zone (refs + update ; rebuild interne seulement si la zone change) ----------
function renderZone(view) {
  let zone = currentZone();
  const refs = {};
  build();

  function currentZone() {
    return ZONES.find((z) => z.id === state.progress.selected) || ZONES[0];
  }

  function build() {
    view.replaceChildren();
    refs.monsterCards = {};

    view.append(el('div.zone-head', {}, [
      refs.prevBtn = el('button.zone-arrow', { text: '‹', onclick: () => switchZone(zone.id - 1) }),
      el('div.zone-title', {}, [
        el('div.zone-name', { text: zone.name }),
        el('div.zone-diff', { text: `${zone.difficulty} · Zone ${zone.id}` }),
      ]),
      refs.nextBtn = el('button.zone-arrow', { text: '›', onclick: () => switchZone(zone.id + 1) }),
    ]));
    refs.progressTxt = el('div.zone-progress');
    view.append(refs.progressTxt);

    const grid = el('div.monster-grid');
    for (const id of zone.monsters) {
      const m = makeMonster(id, zone.scale);
      if (!m) continue;
      const cr = {
        bar: el('div.fill'),
        winsTxt: el('div.mc-wins'),
        actions: el('div.mc-actions'),
      };
      cr.root = el('div.monster-card', {}, [
        el('div.mc-sprite', {}, [spriteImg(m.sprite)]),
        el('div.mc-name', { text: m.name }),
        cr.winsTxt,
        el('div.mini-gauge', {}, [cr.bar]),
        cr.actions,
      ]);
      refs.monsterCards[id] = cr;
      grid.append(cr.root);
    }
    view.append(grid);

    const boss = makeBoss(zone.boss, zone.scale) || makeMonster(zone.boss, zone.scale);
    refs.bossCard = null;
    if (boss) {
      refs.bossWins = el('div.mc-wins');
      refs.bossAction = el('div');
      refs.bossCard = el('div.boss-card', {}, [
        el('div.mc-sprite', {}, [spriteImg(boss.sprite)]),
        el('div.mc-name', { text: `Boss · ${boss.name}` }),
        refs.bossWins,
        refs.bossAction,
      ]);
      view.append(refs.bossCard);
    }
    refs.unlockNote = el('div.zone-unlock');
    view.append(refs.unlockNote);

    syncDynamic();
  }

  function syncDynamic() {
    const prog = state.progress;
    const wins = state.monsterWins;
    const cleared = zone.monsters.filter((id) => (wins[id] || 0) >= WIN_REQ).length;
    const allCleared = cleared === zone.monsters.length;
    const bossDone = !!prog.bossDefeated[zone.id];

    refs.prevBtn.disabled = !ZONES.some((z) => z.id === zone.id - 1);
    refs.nextBtn.disabled = !(zone.id + 1 <= prog.unlocked);
    refs.progressTxt.textContent = `Monstres nettoyés : ${cleared} / ${zone.monsters.length}`;

    for (const id of zone.monsters) {
      const cr = refs.monsterCards[id];
      if (!cr) continue;
      const w = wins[id] || 0;
      const done = w >= WIN_REQ;
      cr.root.classList.toggle('cleared', done);
      cr.winsTxt.textContent = `${w} / ${WIN_REQ} victoires`;
      cr.bar.style.width = Math.min(100, (w / WIN_REQ) * 100) + '%';
      const actions = [el('button.btn-fight', { text: 'Affronter', onclick: () => launch(makeMonster(id, zone.scale), { zoneId: zone.id }) })];
      if (done) {
        const noEnd = state.endurance.cur <= 0;
        actions.push(el('button.btn-auto', {
          text: noEnd ? 'Épuisé' : 'Auto',
          disabled: noEnd ? 'true' : null,
          onclick: () => launch(makeMonster(id, zone.scale), { zoneId: zone.id, auto: true }),
        }));
      }
      cr.actions.replaceChildren(...actions);
    }

    if (refs.bossCard) {
      refs.bossCard.classList.toggle('done', bossDone);
      refs.bossCard.classList.toggle('locked', !bossDone && !allCleared);
      refs.bossWins.textContent = bossDone ? 'Vaincu' : allCleared ? 'Prêt au combat' : `Nettoie les ${zone.monsters.length} monstres (10x)`;
      refs.bossAction.replaceChildren(
        allCleared || bossDone
          ? el('button.btn-boss', { text: bossDone ? 'Réaffronter le boss' : 'Affronter le boss', onclick: () => launch(makeBoss(zone.boss, zone.scale) || makeMonster(zone.boss, zone.scale), { zoneId: zone.id, isBoss: true }) })
          : el('div.placeholder-note', { text: 'Boss verrouillé.' }),
      );
    }

    refs.unlockNote.textContent = bossDone && zone.id + 1 <= prog.unlocked ? `Zone ${zone.id + 1} débloquée !` : '';
  }

  function update() {
    const z = currentZone();
    if (z.id !== zone.id) { zone = z; build(); return; }
    syncDynamic();
  }
  return update;
}

// ---------- Interface de Combat : mount unique + patch des contrôles ----------
function mountCombatShell(view) {
  const stage = el('div.combat-screen');
  renderInto(stage); // construit bulles/pool/refs internes — UNE seule fois par combat
  const consumeBox = el('div');
  const controlsBox = el('div');
  view.append(stage, consumeBox, controlsBox);
  const refs = { consumeBox, controlsBox };
  syncCombatControls(refs);
  return refs;
}

function syncCombatControls(refs) {
  const rt = current();
  if (!rt) return;

  const conso = state.player.equipment.conso;
  const consumeChild = rt.phase === 'fighting' && conso && conso.count > 0 && ITEMS[conso.tid]
    ? el('div.combat-consume', {}, [
        el('button.btn-consume', { onclick: () => consume() }, [
          iconNode(ITEMS[conso.tid].icon, 'icon'),
          el('span', { text: ` ${ITEMS[conso.tid].name} (${conso.count})` }),
        ]),
      ])
    : null;
  refs.consumeBox.replaceChildren(...(consumeChild ? [consumeChild] : []));

  const unlocked = (state.monsterWins[rt.enemyId] || 0) >= WIN_REQ;
  const controls = el('div.combat-controls');
  if (rt.auto) {
    controls.append(el('button.btn-stop', { text: "Arrêter l'auto-battle", onclick: () => stop() }));
  } else {
    controls.append(el('button.btn-quit', { text: 'Quitter', onclick: () => stop() }));
    if (unlocked && !rt.isBoss) {
      const noEnd = state.endurance.cur <= 0;
      controls.append(el('button.btn-auto', {
        text: noEnd ? 'Endurance épuisée' : "Activer l'auto-battle",
        disabled: noEnd ? 'true' : null,
        onclick: () => { toggleAuto(); rerender(); },
      }));
    }
  }
  refs.controlsBox.replaceChildren(controls);
}

// ---------- Actions ----------
function launch(monster, opts) { start(monster, opts); rerender(); }
function switchZone(id) { if (ZONES.some((z) => z.id === id)) setState((s) => { s.progress.selected = id; }); }

function placeholder(title, txt) {
  return el('div', {}, [el('h2.section-title', { text: title }), el('div.placeholder-note', { text: txt })]);
}

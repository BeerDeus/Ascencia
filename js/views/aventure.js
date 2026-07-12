// ===== Vue Aventure : interface de Zone <-> interface de Combat (Phase 2) =====
import { el } from '../utils/dom.js';
import { state, setState } from '../state.js';
import { ZONES } from '../config.js';
import { rerender } from '../router.js';
import { isActive, current, start, stop, toggleAuto, consume, renderInto, WIN_REQ } from '../game/combat.js';
import { ITEMS } from '../game/items.js';
import { ACCORDS, noteById, MAX_ACCORDS } from '../game/symphony.js';

export function renderAventure(root, sub = 'combat') {
  const view = el('div.view');
  if (sub === 'carte')     { view.append(placeholder('Carte', 'Vue carte des zones — Phase 5.')); root.append(view); return; }
  if (sub === 'symphonie') { renderSymphonie(view); root.append(view); return; }

  if (isActive()) renderCombat(view);
  else            renderZone(view);
  root.append(view);
}

// ---------- Interface de Zone ----------
function renderZone(view) {
  const prog = state.progress;
  const zone = ZONES.find((z) => z.id === prog.selected) || ZONES[0];
  const wins = state.monsterWins;
  const cleared = zone.monsters.filter((m) => (wins[m.id] || 0) >= WIN_REQ).length;
  const allCleared = cleared === zone.monsters.length;
  const bossDone = !!prog.bossDefeated[zone.id];

  // En-tête zone + sélecteur
  const canPrev = ZONES.some((z) => z.id === zone.id - 1);
  const canNext = zone.id + 1 <= prog.unlocked;
  view.append(el('div.zone-head', {}, [
    el('button.zone-arrow', { text: '‹', disabled: canPrev ? null : 'true', onclick: () => switchZone(zone.id - 1) }),
    el('div.zone-title', {}, [
      el('div.zone-name', { text: zone.name }),
      el('div.zone-diff', { text: `${zone.difficulty} · Zone ${zone.id}` }),
    ]),
    el('button.zone-arrow', { text: '›', disabled: canNext ? null : 'true', onclick: () => switchZone(zone.id + 1) }),
  ]));
  view.append(el('div.zone-progress', { text: `Monstres nettoyés : ${cleared} / ${zone.monsters.length}` }));

  // Cartes monstres
  const grid = el('div.monster-grid');
  for (const m of zone.monsters) {
    const w = wins[m.id] || 0;
    const done = w >= WIN_REQ;
    const bar = el('div.mini-gauge', {}, [el('div.fill', { style: `width:${Math.min(100, w / WIN_REQ * 100)}%` })]);
    const actions = [ el('button.btn-fight', { text: 'Affronter', onclick: () => launch(m, { zoneId: zone.id }) }) ];
    if (done) actions.push(el('button.btn-auto', { text: '▶ Auto', onclick: () => launch(m, { zoneId: zone.id, auto: true }) }));
    grid.append(el('div.monster-card' + (done ? '.cleared' : ''), {}, [
      el('div.mc-sprite', { text: m.sprite }),
      el('div.mc-name', { text: m.name }),
      el('div.mc-wins', { text: `${done ? '✓ ' : ''}${w} / ${WIN_REQ} victoires` }),
      bar,
      el('div.mc-actions', {}, actions),
    ]));
  }
  view.append(grid);

  // Boss
  const b = zone.boss;
  const bossCard = el('div.boss-card' + (bossDone ? '.done' : allCleared ? '' : '.locked'), {}, [
    el('div.mc-sprite', { text: b.sprite }),
    el('div.mc-name', { text: `Boss · ${b.name}` }),
    el('div.mc-wins', { text: bossDone ? '✓ Vaincu' : allCleared ? 'Prêt au combat' : `Nettoie les ${zone.monsters.length} monstres (10x)` }),
    allCleared || bossDone
      ? el('button.btn-boss', { text: bossDone ? 'Réaffronter le boss' : 'Affronter le boss', onclick: () => launch(b, { zoneId: zone.id, isBoss: true }) })
      : el('div.placeholder-note', { text: 'Boss verrouillé.' }),
  ]);
  view.append(bossCard);

  if (bossDone && zone.id + 1 <= prog.unlocked) {
    view.append(el('div.zone-unlock', { text: `⭐ Zone ${zone.id + 1} débloquée !` }));
  }
}

// ---------- Interface de Combat ----------
function renderCombat(view) {
  const rt = current();
  const stage = el('div.combat-screen');
  renderInto(stage);
  view.append(stage);

  // Consommable équipé : utilisable en combat (soigne + Tempo joueur à 0)
  const conso = state.player.equipment.conso;
  if (rt.phase === 'fighting' && conso && conso.count > 0) {
    const it = ITEMS[conso.tid];
    view.append(el('div.combat-consume', {}, [
      el('button.btn-consume', { text: `${it.icon} ${it.name} (${conso.count})`, onclick: () => consume() }),
    ]));
  }

  const unlocked = (state.monsterWins[rt.enemyId] || 0) >= WIN_REQ;
  const controls = el('div.combat-controls');
  if (rt.auto) {
    controls.append(el('button.btn-stop', { text: "⏹ Arrêter l'auto-battle", onclick: () => stop() }));
  } else {
    controls.append(el('button.btn-quit', { text: 'Quitter', onclick: () => stop() }));
    if (unlocked && !rt.isBoss) {
      controls.append(el('button.btn-auto', { text: "▶ Activer l'auto-battle", onclick: () => { toggleAuto(); rerender(); } }));
    }
  }
  view.append(controls);
}

// ---------- Interface Symphonie (gestion des Accords) ----------
function renderSymphonie(view) {
  const equipped = state.accords;
  view.append(el('h2.section-title', { text: 'Accords' }));
  view.append(el('div.accord-info', { text: `Équipe jusqu'à ${MAX_ACCORDS} accords. En combat, remplis La Mesure (clique les bulles de notes) : dès qu'elle finit par le motif d'un accord, l'effet se déclenche.` }));
  view.append(el('div.accord-count', { text: `Accords équipés : ${equipped.length} / ${MAX_ACCORDS}` }));

  for (const a of ACCORDS) {
    const on = equipped.includes(a.id);
    const full = equipped.length >= MAX_ACCORDS;
    view.append(el('div.accord-card' + (on ? '.on' : ''), {}, [
      el('div.accord-head', {}, [
        el('span.accord-icon', { text: a.icon }),
        el('span.accord-name', { text: a.name }),
      ]),
      el('div.accord-pattern', {}, a.pattern.map((nid) => {
        const n = noteById(nid);
        const chip = el('span.note-mini', { text: n.label }); chip.style.setProperty('--nc', n.color); return chip;
      })),
      el('div.accord-desc', { text: a.desc }),
      el('button.btn-accord' + (on ? '.equipped' : ''), {
        text: on ? 'Retirer' : (full ? 'Emplacements pleins' : 'Équiper'),
        disabled: (!on && full) ? 'true' : null,
        onclick: () => toggleAccord(a.id),
      }),
    ]));
  }
}
function toggleAccord(id) {
  setState((s) => {
    const i = s.accords.indexOf(id);
    if (i >= 0) s.accords.splice(i, 1);
    else if (s.accords.length < MAX_ACCORDS) s.accords.push(id);
  });
}

// ---------- Actions ----------
function launch(monster, opts) { start(monster, opts); rerender(); }
function switchZone(id) { if (ZONES.some((z) => z.id === id)) setState((s) => { s.progress.selected = id; }); }

function placeholder(title, txt) {
  return el('div', {}, [el('h2.section-title', { text: title }), el('div.placeholder-note', { text: txt })]);
}

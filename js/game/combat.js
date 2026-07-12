// ===== Moteur de combat (Phase 2) : boucle Tempo, dégâts, log, auto-battle =====
// Runtime hors-state (aucune persistance par frame). Les récompenses / victoires
// sont commitées dans le state à la mort de l'ennemi (déclenche un rerender).
import { el, clear, clamp } from '../utils/dom.js';
import { state, setState } from '../state.js';
import { SETTINGS, ZONES } from '../config.js';
import { derive, addXp } from './player.js';
import { ITEMS } from './items.js';
import { rollLoot, makeMonster } from './monsters.js';
import { NOTES, noteById, noteByLabel, pushNote, matchAccord, MESURE_SIZE } from './symphony.js';

const TEMPO_RATE  = 42;    // points de Tempo / seconde à vitesse 1 (jauge = 100)
const RELAUNCH_MS = 1200;  // délai avant relance en auto-battle
const LOG_MAX     = 40;
export const WIN_REQ = SETTINGS.autoBattleWins;

let rt = null; // état runtime du combat en cours (null = aucun)
const rand100 = () => Math.random() * 100;

export const isActive = () => !!rt && rt.active;
export const current   = () => rt;

// ---- Démarrage / relance ----
export function start(monster, { auto = false, isBoss = false, zoneId = 1 } = {}) {
  stopLoop();
  const p = derive(state.player);
  const pHp = rt && rt.active && rt.pHp > 0 ? Math.min(rt.pHp, p.maxHp) : p.maxHp;
  state.mesure.length = 0; // Mesure fraîche à chaque combat
  rt = {
    active: true, auto: auto && !isBoss, isBoss, zoneId,
    enemy: { ...monster }, enemyId: monster.id,
    eMax: monster.hp, eHp: monster.hp,
    pMax: p.maxHp, pHp,
    pTempo: 0, eTempo: 0,
    pStats: p,
    phase: 'fighting',
    log: rt ? rt.log : [],
    last: now(), rafId: null, relaunchTimer: null,
    refs: rt ? rt.refs : {},
    mesure: state.mesure,          // Symphonie : file FIFO (partagée avec le state)
    bubbles: new Set(),            // bulles actives
    bubblePool: [],                // object pooling des noeuds DOM
    atkMult: null, critNext: false, // buffs d'accords
    weaponNote: weaponNoteId(),
  };
  pushLog(`⚔️ ${monster.name} apparaît !`);
  paint();
  loop();
}

function relaunch() {
  if (!rt) return;
  const z = ZONES.find((z) => z.id === rt.zoneId);
  const m = z && z.monsters.includes(rt.enemyId) ? makeMonster(rt.enemyId, z.scale) : null;
  if (!m) { toZones(); return; }
  start(m, { auto: true, isBoss: false, zoneId: rt.zoneId });
}

// ---- Boucle ----
function loop() {
  rt.rafId = requestAnimationFrame(loop);
  const t = now();
  let dt = (t - rt.last) / 1000;
  rt.last = t;
  if (dt > 0.25) dt = 0.25; // clamp (onglet inactif)
  if (rt.phase !== 'fighting') { paint(); return; }

  rt.pTempo += TEMPO_RATE * rt.pStats.vitesse * dt;
  rt.eTempo += TEMPO_RATE * rt.enemy.tempo * dt;
  // Pas de régénération de PV en combat (les soins passent par les consommables — Cuisine, Phase 5).

  while (rt.pTempo >= 100 && rt.phase === 'fighting') { rt.pTempo -= 100; playerHit(); }
  while (rt.eTempo >= 100 && rt.phase === 'fighting') { rt.eTempo -= 100; enemyHit(); }
  paint();
}

// ---- Calcul de frappe ----
function strike(atk, def) {
  const hit = clamp((atk.precision ?? 90) - (def.dodge || 0), 25, 95); // toucher borné (legacy)
  if (rand100() > hit) return { miss: true };
  const effDef = Math.max(0, (def.def || 0) * (1 - Math.min(90, atk.pen || 0) / 100)); // pénétration = % d'armure ignorée
  let dmg = Math.max(1, atk.atk - effDef);
  dmg *= (0.9 + Math.random() * 0.2);                 // variance ±10 % (legacy)
  const crit = rand100() <= (atk.crit || 0);
  if (crit) dmg *= (atk.critDmg || 175) / 100;
  dmg *= (1 - (def.resist || 0) / 100);
  return { dmg: Math.max(1, Math.round(dmg)), crit };
}

function playerHit() {
  const s = rt.pStats, e = rt.enemy;
  let atk = s.attaque;
  if (rt.atkMult && now() < rt.atkMult.until) atk = Math.round(atk * rt.atkMult.mult); // buff Fureur
  const forceCrit = rt.critNext; rt.critNext = false;                                  // Accord Parfait
  const r = strike({ atk, crit: forceCrit ? 100 : s.crit, critDmg: s.critDmg, pen: s.penetration, precision: forceCrit ? 999 : s.precision },
                   { def: e.defense, dodge: forceCrit ? 0 : e.esquive, resist: 0 });
  if (r.miss) { spawnMaybe(false); return pushLog(`Vous manquez ${e.name}.`); }
  rt.eHp -= r.dmg;
  pushLog(`Vous infligez ${r.dmg}${r.crit ? ' ✦CRIT' : ''} à ${e.name}.`);
  spawnMaybe(r.crit); // chance de bulle (garantie sur un critique)
  if (rt.eHp <= 0) { rt.eHp = 0; onWin(); }
}

// ---- Symphonie : bulles de notes (object pooling) ----
function spawnMaybe(crit) {
  if (!rt.refs.bubbleLayer) return;
  const chance = clamp(rt.pStats.chanceNote, 5, 95);
  if (crit || Math.random() * 100 < chance) spawnBubble();
}
function weaponNoteId() {
  const w = state.player.equipment && state.player.equipment.arme;
  if (!w) return null;
  const it = ITEMS[w.tid];
  const n = it && it.weapon && noteByLabel(it.weapon.note);
  return n ? n.id : null;
}
function pickNote() {
  // biais léger vers la note de l'arme équipée, sinon aléatoire
  if (rt.weaponNote && Math.random() < 0.4) return rt.weaponNote;
  return NOTES[Math.floor(Math.random() * NOTES.length)].id;
}
function acquireBubble() {
  let n = rt.bubblePool.pop();
  if (!n) { n = el('button.note-bubble'); rt.refs.bubbleLayer.append(n); }
  return n;
}
function releaseBubble(node) {
  if (node._anim) { try { node._anim.cancel(); } catch (e) {} node._anim = null; }
  node.onclick = null;
  node.style.display = 'none';
  rt.bubbles.delete(node);
  rt.bubblePool.push(node);
}
function spawnBubble() {
  const id = pickNote();
  const n = noteById(id);
  const node = acquireBubble();
  node.textContent = n.label;
  node.dataset.note = id;
  node.style.setProperty('--nc', n.color);
  node.style.left = (8 + Math.random() * 74) + '%';
  node.style.display = '';
  node.onclick = () => onBubbleClick(node);
  const anim = node.animate([
    { transform: 'translateY(10px) scale(0.6)', opacity: 0, offset: 0 },
    { transform: 'translateY(0) scale(1)', opacity: 1, offset: 0.12 },
    { transform: 'translateY(-150px) scale(1)', opacity: 1, offset: 0.82 },
    { transform: 'translateY(-178px) scale(0.7)', opacity: 0, offset: 1 },
  ], { duration: 4200, easing: 'cubic-bezier(.25,.6,.3,1)' });
  node._anim = anim;
  anim.onfinish = () => releaseBubble(node);
  rt.bubbles.add(node);
}
function onBubbleClick(node) {
  const id = node.dataset.note;
  releaseBubble(node);
  pushNote(rt.mesure, id);
  const acc = matchAccord(rt.mesure, state.accords);
  if (acc) { rt.mesure.splice(rt.mesure.length - acc.pattern.length); applyAccord(acc); }
  paintMesure();
}
function applyAccord(acc) {
  const e = acc.effect;
  if (e.type === 'heal') { const h = Math.round(rt.pMax * e.frac); rt.pHp = Math.min(rt.pMax, rt.pHp + h); pushLog(`🎼 ${acc.name} : +${h} PV.`); }
  else if (e.type === 'damage') { const dmg = Math.max(1, Math.round(rt.pStats.attaque * e.mult)); rt.eHp -= dmg; pushLog(`🎼 ${acc.name} : ${dmg} dégâts !`); if (rt.eHp <= 0) { rt.eHp = 0; onWin(); return; } }
  else if (e.type === 'buff') { rt.atkMult = { mult: e.mult, until: now() + e.ms }; pushLog(`🎼 ${acc.name} : Attaque ×${e.mult} (${e.ms / 1000}s).`); }
  else if (e.type === 'tempoEnemy') { rt.eTempo = 0; pushLog(`🎼 ${acc.name} : Tempo ennemi réinitialisé.`); }
  else if (e.type === 'critNext') { rt.critNext = true; pushLog(`🎼 ${acc.name} : prochaine attaque critique !`); }
  paint();
}
function paintMesure() {
  const slots = rt.refs.mesureSlots;
  if (!slots) return;
  for (let i = 0; i < MESURE_SIZE; i++) {
    const id = rt.mesure[i];
    const s = slots[i];
    if (id) { const n = noteById(id); s.textContent = n.label; s.style.setProperty('--nc', n.color); s.classList.add('filled'); }
    else { s.textContent = ''; s.classList.remove('filled'); }
  }
}

function enemyHit() {
  const s = rt.pStats, e = rt.enemy;
  const r = strike({ atk: e.attaque, crit: e.crit || 0, critDmg: 150, pen: 0, precision: 90 },
                   { def: s.defense, dodge: s.esquive, resist: s.resistance });
  if (r.miss) return pushLog(`${e.name} vous manque.`);
  rt.pHp -= r.dmg;
  pushLog(`${e.name} vous inflige ${r.dmg}${r.crit ? ' ✦CRIT' : ''}.`);
  if (rt.pHp <= 0) { rt.pHp = 0; onLoss(); }
}

// ---- Issues ----
function onWin() {
  rt.phase = 'won';
  stopLoop();
  const e = rt.enemy, zoneId = rt.zoneId, isBoss = rt.isBoss;
  pushLog(`✅ ${e.name} vaincu ! +${e.xp} XP, +${e.gold} or.`);
  const willAuto = rt.auto && !isBoss && rt.pHp > 0;

  if (!willAuto) rt.active = false; // retour aux zones au prochain rerender

  setState((s) => {
    if (!isBoss) s.monsterWins[e.id] = (s.monsterWins[e.id] || 0) + 1;
    if (isBoss) {
      s.progress.bossDefeated[zoneId] = true;
      if (ZONES.some((z) => z.id === zoneId + 1)) s.progress.unlocked = Math.max(s.progress.unlocked, zoneId + 1);
    }
  });
  const { drops, res } = rollLoot(e); // ressources + items + or (game/monsters.js)
  const resTxt = Object.entries(res).map(([k, v]) => `${k} ×${v}`).join(', ');
  if (resTxt || e.gold) pushLog(`💰 +${e.gold} or${resTxt ? ', ' + resTxt : ''}`);
  if (drops.length) pushLog('🎁 Butin : ' + drops.map((d) => `${ITEMS[d.tid] ? ITEMS[d.tid].icon + ' ' + ITEMS[d.tid].name : d.tid} ×${d.n}`).join(', '));
  addXp(e.xp); // gère le level-up (rerender)

  if (willAuto) {
    rt.phase = 'relaunching';
    pushLog('… relance auto …');
    rt.relaunchTimer = setTimeout(relaunch, RELAUNCH_MS);
    paint();
  }
}

function onLoss() {
  rt.phase = 'dead';
  stopLoop();
  rt.active = false;
  pushLog('💀 Vous êtes vaincu. Retour à la zone.');
  setState((s) => { s.player.combatHp.cur = derive(s.player).maxHp; }); // rerender -> zones
}

// Arrêt total → retour aux zones (bouton Quitter / Arrêter l'auto-battle).
export function stop() {
  if (!rt) return;
  stopLoop();
  if (rt.relaunchTimer) clearTimeout(rt.relaunchTimer);
  rt.active = false;
  toZones();
}

// Consomme le stack équipé (slot CON) : soigne et remet le Tempo joueur à 0.
export function consume() {
  if (!rt || rt.phase !== 'fighting') return;
  const c = state.player.equipment.conso;
  if (!c || c.count <= 0) return;
  const it = ITEMS[c.tid];
  if (!it) return;
  const heal = it.heal || 0;
  rt.pHp = Math.min(rt.pMax, rt.pHp + heal);
  rt.pTempo = 0;
  pushLog(`🍽️ ${it.name} : +${heal} PV (Tempo remis à 0).`);
  setState((s) => { const cc = s.player.equipment.conso; if (cc) { cc.count -= 1; if (cc.count <= 0) s.player.equipment.conso = null; } });
  paint();
}

export function toggleAuto() {
  if (!rt || rt.isBoss) return;
  rt.auto = !rt.auto;
  if (!rt.auto && rt.phase === 'relaunching') { stop(); return; }
  paint();
}

function toZones() {
  const cur = rt ? rt.pHp : null;
  setState((s) => { if (cur != null) s.player.combatHp.cur = Math.max(0, Math.round(cur)); });
}

function stopLoop() { if (rt && rt.rafId) { cancelAnimationFrame(rt.rafId); rt.rafId = null; } }
const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

// ---- Log ----
function pushLog(line) {
  if (!rt) return;
  rt.log.push(line);
  if (rt.log.length > LOG_MAX) rt.log.splice(0, rt.log.length - LOG_MAX);
  const box = rt.refs.logEl;
  if (box) {
    box.append(el('div.log-line', { text: line }));
    while (box.childElementCount > LOG_MAX) box.removeChild(box.firstChild);
    box.scrollTop = box.scrollHeight;
  }
}

// ---- Rendu : construit l'interface de combat dans `parent` et lie les refs ----
export function renderInto(parent) {
  clear(parent);
  const r = rt.refs = {};
  rt.bubbles = new Set(); rt.bubblePool = []; // pool lié au nouveau conteneur

  r.bubbleLayer = el('div.bubble-layer'); // couche des bulles (par-dessus la scène)
  const stage = el('div.combat-stage', {}, [
    r.eSprite = el('div.enemy-sprite'),
    r.eName   = el('div.enemy-name', { text: rt.enemy.name }),
    el('div.hpbar.enemy', {}, [ r.eHpFill = el('div.fill'), r.eHpTxt = el('span.hpbar-txt') ]),
    r.bubbleLayer,
  ]);

  // Barre de Mesure (4 emplacements FIFO)
  r.mesureSlots = [];
  const mesure = el('div.mesure-bar', {}, Array.from({ length: MESURE_SIZE }, () => {
    const s = el('div.mesure-slot'); r.mesureSlots.push(s); return s;
  }));

  const gauges = el('div.tempo-wrap', {}, [
    el('div.hpbar.player', {}, [ r.pHpFill = el('div.fill'), r.pHpTxt = el('span.hpbar-txt') ]),
    labeledBar('Tempo Joueur', 'tempo player', (o) => (r.pTempoFill = o)),
    labeledBar('Tempo Ennemi', 'tempo enemy',  (o) => (r.eTempoFill = o)),
  ]);

  r.logEl = el('div.combat-log');
  for (const line of rt.log) r.logEl.append(el('div.log-line', { text: line }));

  parent.append(stage, mesure, gauges, r.logEl);
  paint();
  paintMesure();
  r.logEl.scrollTop = r.logEl.scrollHeight;
  return parent;
}

function labeledBar(label, cls, setFill) {
  const fill = el('div.fill');
  setFill(fill);
  return el('div.gaugeblock', {}, [
    el('div.gauge-label', {}, [el('span', { text: label })]),
    el('div.gauge.' + cls, {}, [fill]),
  ]);
}

// Mise à jour légère des jauges (aucune reconstruction DOM).
function paint() {
  if (!rt) return;
  const r = rt.refs;
  if (!r.pHpFill) return;
  const pw = pct(rt.pHp, rt.pMax), ew = pct(rt.eHp, rt.eMax);
  r.eHpFill.style.width = ew + '%';
  r.pHpFill.style.width = pw + '%';
  r.eHpTxt.textContent = `${Math.ceil(rt.eHp)} / ${rt.eMax}`;
  r.pHpTxt.textContent = `${Math.ceil(rt.pHp)} / ${rt.pMax}`;
  if (r.pTempoFill) r.pTempoFill.style.width = clamp(rt.pTempo, 0, 100) + '%';
  if (r.eTempoFill) r.eTempoFill.style.width = clamp(rt.eTempo, 0, 100) + '%';
  if (r.eName)   r.eName.textContent = rt.enemy.name;
  if (r.eSprite && r._spriteVal !== rt.enemy.sprite) { setSprite(r.eSprite, rt.enemy.sprite); r._spriteVal = rt.enemy.sprite; }
}
const pct = (v, max) => Math.max(0, Math.min(100, (v / max) * 100));

// Rend un sprite (image placeholder/chemin, sinon emoji) dans un noeud.
function setSprite(node, sprite) {
  node.textContent = '';
  if (sprite && (sprite === 'placeholder' || sprite.includes('/') || sprite.endsWith('.png'))) {
    node.append(el('img.sprite-img', { src: sprite === 'placeholder' ? 'assets/sprites/placeholder.png' : sprite, alt: '' }));
  } else node.textContent = sprite || '❓';
}

export const combatApi = { isActive, current, start, stop, toggleAuto, consume, renderInto, WIN_REQ };

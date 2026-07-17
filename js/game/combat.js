// ===== Moteur de combat (Phase 2) : boucle Tempo, dégâts, log, auto-battle =====
// Runtime hors-state (aucune persistance par frame). Les récompenses / victoires
// sont commitées dans le state à la mort de l'ennemi (déclenche un rerender).
import { el, clear, clamp, iconNode } from '../utils/dom.js';
import { state, setState } from '../state.js';
import { SETTINGS, ZONES } from '../config.js';
import { derive, addXp, activePotionBuffs } from './player.js';
import { ITEMS, equippedSymphonyIds, noteOnHitChance } from './items.js';
import { rollLoot, makeMonster, rollLarryAffix, applyLarryAffix } from './monsters.js';
import { NOTES, accordById, noteById, noteByLabel, pushNote, accordMatches, accordProgress, MESURE_SIZE } from './symphony.js';
import { hasEndurance, spend as spendEndurance } from './endurance.js';
import { incrementMetric } from './primes.js';
import { PREMIUM_TIER_KILLS, ECLATS_PER_KILL } from './codex.js';
import { stopAllGathering } from './gathering.js';
import { showToast } from '../components/toast.js';

// Icônes + libellés des ressources vrac pour les toasts de loot (mêmes chemins que
// header.js/village.js — pas de source commune pour l'instant, cf. leur RES_ICON).
const RES_ICON = {
  or: 'assets/sprites/objets/piece_or.png',
  bois: 'assets/sprites/ressources/bois.png',
  metal: 'assets/sprites/ressources/metal.png',
  tissu: 'assets/sprites/ressources/tissu.png',
  fragments: 'assets/sprites/ressources/fragment.png',
  eclats_ascension: 'assets/sprites/ressources/eclats_ascension.png',
};
const RES_LABEL = { or: 'Or', bois: 'Bois', metal: 'Métal', tissu: 'Tissu', fragments: 'Fragments', eclats_ascension: "Éclats d'Ascension" };
// Libellés courts pour le tooltip des badges de buff (voir buildBuffRow ci-dessous).
const BUFF_STAT_LABEL = { attaque: 'Attaque', crit: 'Critique', esquive: 'Esquive' };
const BUFF_LOW_MS = 30_000; // seuil d'alerte (anneau rouge pulsant) — dernières 30s

const TEMPO_RATE  = 42;    // points de Tempo / seconde à vitesse 1 (jauge = 100)
const RELAUNCH_MS = 1200;  // délai avant relance en auto-battle
const LOG_MAX     = 40;
// ---- Stats secondaires d'Enchantement (Phase 9.4, câblage effet réel 2026-07-16) ----
// STUN_MS : durée de pause du remplissage de Tempo (joueur OU ennemi) quand étourdi.
// BASE_ENEMY_STUN_CHANCE : chance de base (%) qu'un coup CRITIQUE ennemi étourdisse le
// joueur — réduite par la Résistance aux Altérations (resist_alteration, jamais sous 0).
// Aucune des deux ne préexistait : design nouveau pour donner un effet à `etourdissement`
// (offensif, coup PORTÉ, pas besoin d'un crit) et `resistAlteration` (défensif, ne
// réagit qu'aux crits ENCAISSÉS — cf. data/affixes.js SECONDARY_STATS).
const STUN_MS = 1500;
const BASE_ENEMY_STUN_CHANCE = 20;
export const WIN_REQ = SETTINGS.autoBattleWins;

let rt = null; // état runtime du combat en cours (null = aucun)
const rand100 = () => Math.random() * 100;

export const isActive = () => !!rt && rt.active;
export const current   = () => rt;

// Hook de patch des contrôles externes (consommable/boutons auto-battle, gérés par
// aventure.js hors de renderInto). Nécessaire car relaunch() est déclenché par un
// setTimeout (pas un setState) : sans ce hook, syncCombatControls() ne serait plus
// jamais rappelé après la 1ère relance auto-battle, et le bouton consommable/les
// contrôles resteraient figés sur l'état du combat précédent (bug constaté : le
// consommable n'apparaît plus après le 1er monstre en auto-battle).
let onChange = null;
export function setChangeHook(fn) { onChange = fn; }

// Hooks Brèche Instable (voir game/donjon.js) : combat.js ne connaît RIEN de donjon.js
// (pas d'import — évite un cycle donjon.js <-> combat.js, donjon.js important déjà
// start()/stop() d'ici). donjon.js s'enregistre via setDonjonHooks() et start() prend
// `donjon:true` pour les combats déclenchés depuis une case de la grille : onWin/onLoss
// appellent alors ces hooks au lieu (onWin) ou en plus (onLoss) du comportement zone
// normal — voir onWin()/onLoss() ci-dessous.
let donjonHooks = null;
export function setDonjonHooks(hooks) { donjonHooks = hooks; }

// ---- Démarrage / relance ----
// extraPct : buffs/malus TEMPORAIRES de la run en cours (Pacte du Diable — voir
// data/donjon_events.js), appliqués une seule fois sur les stats dérivées de CE combat,
// jamais persistés sur state.player (rt est un runtime hors-state, voir en-tête fichier).
export function start(monster, { auto = false, isBoss = false, zoneId = 1, donjon = false, extraPct = null } = {}) {
  // Lancer un combat interrompt tout métier de récolte en cours (crédite d'abord les
  // cycles pleins déjà écoulés, comme le bouton "Arrêter le filon" — voir
  // game/gathering.js stopAllGathering(), généralisé aux 4 métiers le 2026-07-17
  // (ne couvrait que le Minage auparavant). Pattern à reproduire pour toute future
  // activité exclusive (donjons...).
  stopAllGathering();
  // Instabilité de Larry : roll à CHAQUE lancement (initial ou relance auto-battle),
  // jamais sur les boss — voir game/monsters.js LARRY_AFFIXES. `monster` est toujours
  // une instance fraîche (makeMonster/makeBoss), donc pas de risque de double-affixe.
  if (!isBoss) {
    const affix = rollLarryAffix();
    if (affix) applyLarryAffix(monster, affix);
  }
  stopLoop();
  const p = derive(state.player);
  // Pacte du Diable (Brèche Instable) : multiplie/réduit une stat dérivée pour CE
  // combat uniquement (p est une copie fraîche de derive(), jamais l'objet persisté).
  if (extraPct) for (const [k, v] of Object.entries(extraPct)) if (p[k] != null) p[k] = Math.max(1, Math.round(p[k] * (1 + v / 100)));
  // Vie persistante : reprend le pool PV sauvegardé (pas de pleine régén à chaque combat).
  const pHp = rt && rt.active && rt.pHp > 0 ? Math.min(rt.pHp, p.maxHp) : Math.min(state.player.combatHp.cur, p.maxHp);
  state.mesure.length = 0; // Mesure fraîche à chaque combat
  // Chaque lancement d'auto-battle (initial ou relance) consomme 1 pt d'Endurance ;
  // à sec, le combat démarre en mode manuel (le mode s'arrête faute d'Endurance).
  // Jamais d'auto-battle en Brèche (pas demandé, et relaunch() ne sait pas régénérer
  // une case de grille) — donjon.js n'appelle jamais start() avec auto:true.
  const wantsAuto = auto && !isBoss;
  const autoGranted = wantsAuto && spendEndurance(1);
  rt = {
    active: true, auto: autoGranted, isBoss, zoneId, donjon,
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
  pushLog(`${monster.name} apparaît !`);
  if (wantsAuto && !autoGranted) pushLog('Endurance épuisée — combat lancé en mode manuel.');
  paint();
  loop();
  onChange && onChange(); // resync consommable/contrôles (voir setChangeHook) — couvre la relance auto
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

  // Étourdissement : suspend le remplissage du Tempo du camp touché tant que
  // pStunUntil/eStunUntil n'est pas dépassé (posé par playerHit/enemyHit ci-dessous).
  if (!rt.pStunUntil || t >= rt.pStunUntil) rt.pTempo += TEMPO_RATE * rt.pStats.vitesse * dt;
  if (!rt.eStunUntil || t >= rt.eStunUntil) rt.eTempo += TEMPO_RATE * rt.enemy.tempo * dt;
  // Pas de régénération de PV en combat par défaut (les soins passent par les consommables
  // — Cuisine, Phase 5) — SAUF Régénération en Combat (stat secondaire d'Enchantement,
  // 0 par défaut = comportement inchangé).
  if (rt.pStats.regenCombat > 0 && rt.pHp < rt.pMax) rt.pHp = Math.min(rt.pMax, rt.pHp + rt.pStats.regenCombat * dt);

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
  pushLog(`Vous infligez ${r.dmg}${r.crit ? ' (CRIT)' : ''} à ${e.name}.`);
  // Vol de Vie (stat secondaire d'Enchantement) : % des dégâts infligés rendus en PV.
  if (s.volVie > 0) {
    const heal = Math.round(r.dmg * s.volVie / 100);
    if (heal > 0) { rt.pHp = Math.min(rt.pMax, rt.pHp + heal); pushLog(`Vol de Vie : +${heal} PV.`); }
  }
  spawnMaybe(r.crit); // chance de bulle (garantie sur un critique)
  if (rt.eHp <= 0) { rt.eHp = 0; onWin(); return; }
  // Étourdissement (stat secondaire d'Enchantement) : chance d'étourdir l'ennemi à
  // chaque coup PORTÉ (pas besoin d'un critique, contrairement au subi — voir enemyHit).
  if (s.etourdissement > 0 && Math.random() * 100 < s.etourdissement) {
    rt.eStunUntil = now() + STUN_MS;
    pushLog(`${e.name} est étourdi !`);
  }
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
  // Note favorisée (Enchanteur, voir game/items.js getChosenNote/setChosenNote) : 50%
  // de sortir telle quelle — priorité sur le biais arme ci-dessous, réponse utilisateur
  // du 2026-07-16 ("dans 50% des cas ce sera la note sélectionnée"). S'applique aux
  // bulles offensives (coups portés) ET défensives (coups encaissés) : même fonction,
  // même mécanique de tirage pour les deux déclencheurs (spawnMaybe/spawnOnHitTaken).
  const chosen = state.player.chosenNote;
  if (chosen && Math.random() < 0.5) return chosen;
  // sinon, biais existant vers la note de l'arme équipée, sinon aléatoire
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
// Le clic sur une bulle remplit juste la Mesure — le cast est manuel (boutons de
// Symphonies, voir castAccord ci-dessous), plus d'auto-déclenchement à la complétion.
function onBubbleClick(node) {
  const id = node.dataset.note;
  releaseBubble(node);
  pushNote(rt.mesure, id);
  paintMesure();
}

// Cast manuel d'une Symphonie équipée : ne fait rien si son motif n'est pas
// satisfait par la Mesure actuelle (sous-séquence, voir accordMatches, symphony.js).
// La Mesure est entièrement vidée au cast (les notes n'étant plus forcément la
// fin exacte du buffer depuis le matching en sous-séquence, un splice partiel
// n'aurait plus de sens sûr — repartir à zéro est plus simple et prévisible).
export function castAccord(accordId) {
  if (!rt || rt.phase !== 'fighting') return false;
  if (!equippedSymphonyIds().includes(accordId)) return false;
  const a = accordById(accordId);
  if (!a || !accordMatches(rt.mesure, a)) return false;
  rt.mesure.length = 0;
  applyAccord(a);
  paintMesure();
  return true;
}

// ---- Debug console (test des Symphonies sans attendre les bulles aléatoires) ----
// Ascencia.debugPushNote('DO') pousse une note dans la Mesure ; Ascencia.debugTestAccord('soin')
// pousse le motif complet puis caste la Symphonie équipée correspondante.
// Doit être appelé pendant un combat actif (rt existe).
export function debugPushNote(noteId) {
  if (!rt || rt.phase !== 'fighting') return false;
  const n = noteById(noteId) || noteByLabel(noteId);
  if (!n) return false;
  pushNote(rt.mesure, n.id);
  paintMesure();
  return true;
}
export function debugTestAccord(accordId) {
  const a = accordById(accordId);
  if (!a) return false;
  for (const noteId of a.pattern) debugPushNote(noteId);
  return castAccord(accordId);
}

// ---- Debug console (test de progression de zones, ex: pour valider l'Ascension sans
// farm) ---- Ascencia.debugSetZone(10) débloque + sélectionne directement la zone 10 ;
// Ascencia.debugUnlockAllZones() va jusqu'à la dernière zone existante (ZONES.length).
export function debugSetZone(n) {
  const id = Math.max(1, Math.min(ZONES.length, Math.round(n)));
  setState((s) => { s.progress.unlocked = id; s.progress.selected = id; });
  return id;
}
export function debugUnlockAllZones() { return debugSetZone(ZONES.length); }
function applyAccord(acc) {
  const e = acc.effect;
  if (e.type === 'heal') { const h = Math.round(rt.pMax * e.frac * (1 + (rt.pStats.soinBonus || 0) / 100)); rt.pHp = Math.min(rt.pMax, rt.pHp + h); pushLog(`${acc.name} : +${h} PV.`); }
  else if (e.type === 'damage') { const dmg = Math.max(1, Math.round(rt.pStats.attaque * e.mult)); rt.eHp -= dmg; pushLog(`${acc.name} : ${dmg} dégâts !`); if (rt.eHp <= 0) { rt.eHp = 0; onWin(); return; } }
  else if (e.type === 'buff') { rt.atkMult = { mult: e.mult, until: now() + e.ms }; pushLog(`${acc.name} : Attaque ×${e.mult} (${e.ms / 1000}s).`); }
  else if (e.type === 'tempoEnemy') { rt.eTempo = 0; pushLog(`${acc.name} : Tempo ennemi réinitialisé.`); }
  else if (e.type === 'critNext') { rt.critNext = true; pushLog(`${acc.name} : prochaine attaque critique !`); }
  paint();
}
function paintMesure() {
  const slots = rt.refs.mesureSlots;
  if (slots) {
    for (let i = 0; i < MESURE_SIZE; i++) {
      const id = rt.mesure[i];
      const s = slots[i];
      if (id) { const n = noteById(id); s.textContent = n.label; s.style.setProperty('--nc', n.color); s.classList.add('filled'); }
      else { s.textContent = ''; s.classList.remove('filled'); }
    }
  }
  paintSymphonyBar();
}

// Colore chaque note du motif d'une Symphonie selon sa progression en sous-séquence
// dans la Mesure (voir accordProgress, symphony.js — plus besoin d'être consécutif).
function paintSymphonyBar() {
  for (const s of (rt.refs.symphonyBtns || [])) {
    const { lit, ready } = accordProgress(rt.mesure, s.acc.pattern);
    lit.forEach((on, i) => {
      s.noteEls[i].classList.toggle('lit', on);
      s.noteEls[i].style.setProperty('--nc', noteById(s.acc.pattern[i]).color);
    });
    s.btn.classList.toggle('ready', ready);
    s.btn.disabled = !ready;
  }
}

function enemyHit() {
  const s = rt.pStats, e = rt.enemy;
  const r = strike({ atk: e.attaque, crit: e.crit || 0, critDmg: 150, pen: 0, precision: 90 },
                   { def: s.defense, dodge: s.esquive, resist: s.resistance });
  if (r.miss) return pushLog(`${e.name} vous manque.`);
  rt.pHp -= r.dmg;
  pushLog(`${e.name} vous inflige ${r.dmg}${r.crit ? ' (CRIT)' : ''}.`);
  spawnOnHitTaken(); // Enchanteur (Capitale) : chance de note à chaque coup ENCAISSÉ
  // Épines (stat secondaire d'Enchantement) : dégâts fixes renvoyés à l'ennemi à
  // CHAQUE coup encaissé (hors miss) — indépendant du Vol de Vie/dégâts normaux.
  if (s.epines > 0) {
    rt.eHp -= s.epines;
    pushLog(`Vos épines renvoient ${s.epines} dégâts à ${e.name}.`);
    if (rt.eHp <= 0) { rt.eHp = 0; onWin(); return; }
  }
  // Résistance aux Altérations (stat secondaire d'Enchantement) : réduit la chance
  // d'être étourdi quand l'ennemi porte un coup CRITIQUE — jamais sur un coup normal.
  if (r.crit) {
    const stunChance = Math.max(0, BASE_ENEMY_STUN_CHANCE - (s.resistAlteration || 0));
    if (Math.random() * 100 < stunChance) {
      rt.pStunUntil = now() + STUN_MS;
      pushLog('Vous êtes étourdi !');
    }
  }
  if (rt.pHp <= 0) { rt.pHp = 0; onLoss(); }
}

// Chance de bulle de note à chaque coup encaissé — indépendante de spawnMaybe()
// (déclenchée par les coups PORTÉS, chanceNote) : vient de l'Enchantement (voir
// game/items.js noteOnHitChance(), amplifié par player.equipment[slot].enchant).
// 0% par défaut (aucune pièce enchantée) — pas de coût perf/appel setState, un simple
// lookup dérivé à la volée sur l'équipement courant.
function spawnOnHitTaken() {
  if (!rt.refs.bubbleLayer) return;
  const chance = noteOnHitChance();
  if (chance > 0 && Math.random() * 100 < chance) spawnBubble();
}

// ---- Issues ----
function onWin() {
  rt.phase = 'won';
  stopLoop();
  const e = rt.enemy, zoneId = rt.zoneId, isBoss = rt.isBoss;
  // Butin (stat secondaire d'Enchantement) : rollLoot() remonté ici (avant, en fin de
  // fonction) pour disposer de `gold` (or réellement crédité, post-bonus) dès le 1er
  // log — voir monsters.js rollLoot(). Toujours utiliser `gold`, jamais e.gold, pour
  // tout affichage désormais.
  const { drops, res, gold, lost } = rollLoot(e, rt.pStats.butinBonus);
  pushLog(`${e.name} vaincu ! +${e.xp} XP, +${gold} or.`);
  const willAuto = rt.auto && !isBoss && rt.pHp > 0;

  if (!willAuto) rt.active = false; // retour aux zones au prochain rerender

  // Codex : compteur de kills illimité (monsterWins), y compris les boss — sert au
  // déblocage de fiche + aux paliers de Maîtrise. Première victoire → ligne de log dédiée.
  const firstKill = !(state.monsterWins[e.id] > 0);
  // Palier "Ressource Premium" (game/codex.js CODEX_TIERS, 500 kills) : une fois
  // atteint sur CE monstre, chaque victoire supplémentaire rapporte aussi des
  // Éclats d'Ascension — petit montant fixe (ECLATS_PER_KILL), pas de scale zone.
  let eclatsGained = 0;
  setState((s) => {
    s.monsterWins[e.id] = (s.monsterWins[e.id] || 0) + 1;
    if (s.monsterWins[e.id] >= PREMIUM_TIER_KILLS) {
      eclatsGained = ECLATS_PER_KILL;
      s.resources.eclats_ascension = (s.resources.eclats_ascension || 0) + eclatsGained;
    }
    // Progression de zone : uniquement pour un vrai combat de zone (zoneId numérique
    // 1-25). Les combats de la Brèche Instable passent un zoneId virtuel (voir
    // game/donjon.js, ex: 'donjon:12') — écrire dedans serait inoffensif (clé
    // surnuméraire dans bossDefeated) mais sémantiquement faux, donc explicitement exclu.
    if (isBoss && typeof zoneId === 'number') {
      s.progress.bossDefeated[zoneId] = true;
      if (ZONES.some((z) => z.id === zoneId + 1)) s.progress.unlocked = Math.max(s.progress.unlocked, zoneId + 1);
    }
  });
  if (firstKill) pushLog(`Nouvelle entrée du Codex : ${e.name} !`);
  if (eclatsGained) {
    pushLog(`+${eclatsGained} Éclats d'Ascension (Ressource Premium).`);
    showToast(`+${eclatsGained} ${RES_LABEL.eclats_ascension}`, { icon: RES_ICON.eclats_ascension });
  }
  // Primes (défis quotidiens, voir game/primes.js) : compteurs du jour.
  incrementMetric('kills', 1);
  incrementMetric('gold', gold || 0);
  if (isBoss) incrementMetric('bossKills', 1);
  if (e.larryAffix) incrementMetric('larryKills', 1);
  const resTxt = Object.entries(res).map(([k, v]) => `${k} ×${v}`).join(', ');
  if (resTxt || gold) pushLog(`+${gold} or${resTxt ? ', ' + resTxt : ''}`);
  if (drops.length) pushLog('Butin : ' + drops.map((d) => `${ITEMS[d.tid] ? ITEMS[d.tid].name : d.tid} ×${d.n}`).join(', '));
  announceLoot(gold, res, drops, lost);
  addXp(e.xp); // gère le level-up (rerender)

  if (willAuto) {
    rt.phase = 'relaunching';
    pushLog('… relance auto …');
    rt.relaunchTimer = setTimeout(relaunch, RELAUNCH_MS);
    paint();
  }
  // Brèche Instable : la case de grille correspondante doit être "consommée" (vidée
  // si monstre régulier, transformée en escalier si boss) — géré par donjon.js, jamais
  // ici (combat.js reste agnostique du contenu de la grille).
  if (rt.donjon) donjonHooks && donjonHooks.onWin && donjonHooks.onWin({ enemyId: e.id, isBoss, zoneId });
}

// Toasts de loot (coin haut-droit, sous le header — voir components/toast.js) :
// un toast par ressource/objet gagné, + un avertissement si le sac plein a fait
// perdre un drop (lost, voir monsters.js rollLoot).
function announceLoot(gold, res, drops, lost) {
  if (gold) showToast(`+${gold} Or`, { icon: RES_ICON.or });
  for (const [k, v] of Object.entries(res)) { if (v) showToast(`+${v} ${RES_LABEL[k] || k}`, { icon: RES_ICON[k] }); }
  for (const d of drops) {
    const it = ITEMS[d.tid];
    showToast(`+${d.n} ${it ? it.name : d.tid}`, { icon: it ? it.icon : null });
  }
  if (lost.length) showToast('Inventaire plein — objet perdu', { type: 'warning' });
}

function onLoss() {
  rt.phase = 'dead';
  stopLoop();
  rt.active = false;
  // Brèche Instable : une défaite met fin à la RUN (pénalité de butin gérée par
  // donjon.js), ce n'est PAS une "vie" perdue au sens zone normale — pas de -1
  // hp-pill, pas de plafond 20% PV (donjon.js remet un pool de PV sûr à la sortie).
  if (rt.donjon) {
    pushLog('Vous êtes vaincu…');
    donjonHooks && donjonHooks.onLoss && donjonHooks.onLoss();
    return;
  }
  pushLog('Vous êtes vaincu. Retour à la zone.');
  setState((s) => {
    // Défaite : PV partiels (20 %, pas de pleine régén) + 1 vie perdue (hp-pill du header).
    const max = derive(s.player).maxHp;
    s.player.combatHp.cur = Math.max(1, Math.round(max * 0.2));
    s.player.hp.cur = Math.max(0, (s.player.hp.cur || 0) - 1);
  }); // rerender -> zones
}

// Arrêt total → retour aux zones (bouton Quitter / Arrêter l'auto-battle).
export function stop() {
  if (!rt) return;
  stopLoop();
  if (rt.relaunchTimer) clearTimeout(rt.relaunchTimer);
  rt.active = false;
  toZones();
  onChange = null;
}

// Consomme le stack équipé (slot CON) : soigne et remet le Tempo joueur à 0.
export function consume() {
  if (!rt || rt.phase !== 'fighting') return;
  const c = state.player.equipment.conso;
  if (!c || c.count <= 0) return;
  const it = ITEMS[c.tid];
  if (!it) return;
  // Efficacité des Soins (stat secondaire d'Enchantement) : bonus % sur le soin du
  // consommable, comme pour la Symphonie (voir applyAccord ci-dessus, type 'heal').
  const heal = Math.round((it.heal || 0) * (1 + (rt.pStats.soinBonus || 0) / 100));
  rt.pHp = Math.min(rt.pMax, rt.pHp + heal);
  rt.pTempo = 0;
  pushLog(`${it.name} : +${heal} PV (Tempo remis à 0).`);
  setState((s) => { const cc = s.player.equipment.conso; if (cc) { cc.count -= 1; if (cc.count <= 0) s.player.equipment.conso = null; } });
  paint();
}

export function toggleAuto() {
  if (!rt || rt.isBoss) return;
  if (!rt.auto && !hasEndurance(1)) { pushLog('Endurance insuffisante pour activer l’auto-battle.'); paint(); return; }
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

  // Buffs de Potion actifs (Alchimiste) : icône + anneau chrono, construits UNE
  // fois au montage (comme les boutons de Symphonie — un combat ne peut pas voir
  // de nouveau buff apparaître en cours de route, la nav est masquée pendant qu'il
  // tourne). paint() ne fait que patcher la fraction de l'anneau et masquer à expiration.
  r.buffRow = el('div.combat-buffs');
  r.buffBadges = buildBuffBadges(r.buffRow);

  const gauges = el('div.tempo-wrap', {}, [
    r.buffRow,
    el('div.hpbar.player', {}, [ r.pHpFill = el('div.fill'), r.pHpTxt = el('span.hpbar-txt') ]),
    labeledBar('Tempo Joueur', 'tempo player', (o) => (r.pTempoFill = o)),
    labeledBar('Tempo Ennemi', 'tempo enemy',  (o) => (r.eTempoFill = o)),
  ]);

  r.logEl = el('div.combat-log');
  for (const line of rt.log) r.logEl.append(el('div.log-line', { text: line }));

  parent.append(stage, mesure, gauges, r.logEl);

  // Boutons de cast des Symphonies équipées (0 à 3, une seule rangée compacte —
  // pas de scrollbar dans le combat plein écran). Construits une fois ; la
  // coloration des notes + l'état prêt/grisé sont patchés par paintSymphonyBar().
  r.symphonyBtns = [];
  const equipped = equippedSymphonyIds().map((id) => accordById(id)).filter(Boolean);
  if (equipped.length) {
    const bar = el('div.symphony-bar');
    for (const acc of equipped) {
      const noteEls = acc.pattern.map((nid) => el('span.sy-note', { text: noteById(nid).label }));
      const btn = el('button.symphony-btn', { title: acc.desc, onclick: () => castAccord(acc.id) }, [
        iconNode(acc.icon, 'sy-icon'),
        el('span.sy-notes', {}, noteEls),
      ]);
      bar.append(btn);
      r.symphonyBtns.push({ acc, btn, noteEls });
    }
    parent.append(bar);
  }

  paint();
  paintMesure();
  r.logEl.scrollTop = r.logEl.scrollHeight;
  return parent;
}

// Construit les badges (icône + anneau) pour les buffs de Potion actifs à l'instant
// du montage — voir commentaire d'appel ci-dessus. Renvoie les refs à patcher par
// paint() : { until, baseMs, ring, badge }.
function buildBuffBadges(row) {
  const buffs = activePotionBuffs(state.player);
  const badges = buffs.map((b) => {
    const ring = el('div.buff-ring');
    const badge = el('div.buff-badge', {
      title: `${b.name} — +${b.pct}% ${BUFF_STAT_LABEL[b.stat] || b.stat}`,
    }, [ring, iconNode(b.icon, 'buff-icon')]);
    return { until: b.until, baseMs: b.baseMs, ring, badge };
  });
  row.replaceChildren(...badges.map((b) => b.badge));
  row.style.display = badges.length ? '' : 'none';
  return badges;
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
  if (r.eName) {
    r.eName.textContent = rt.enemy.name;
    r.eName.classList.toggle('larry-name', !!rt.enemy.larryAffix); // Instabilité de Larry (halo violet)
  }
  if (r.eSprite) {
    if (r._spriteVal !== rt.enemy.sprite) { setSprite(r.eSprite, rt.enemy.sprite); r._spriteVal = rt.enemy.sprite; }
    r.eSprite.classList.toggle('larry-sprite', !!rt.enemy.larryAffix);
  }
  if (r.buffBadges && r.buffBadges.length) {
    // Date.now() ici, PAS le now() du module (performance.now(), horloge relative au
    // chargement de la page) — b.until vient de state.player.potionBuffs, posé en
    // epoch ms par game/items.js drinkPotion().
    const t = Date.now();
    for (const b of r.buffBadges) {
      const left = b.until - t;
      if (left <= 0) { b.badge.style.display = 'none'; continue; }
      const frac = Math.min(100, (left / b.baseMs) * 100);
      b.ring.style.setProperty('--frac', frac.toFixed(1));
      b.badge.classList.toggle('low', left < BUFF_LOW_MS);
    }
  }
}
const pct = (v, max) => Math.max(0, Math.min(100, (v / max) * 100));

// Rend un sprite (image placeholder/chemin, sinon emoji) dans un noeud.
function setSprite(node, sprite) {
  node.textContent = '';
  const isPath = sprite && (sprite === 'placeholder' || sprite.includes('/') || sprite.endsWith('.png'));
  const src = isPath && sprite !== 'placeholder' ? sprite : 'assets/sprites/placeholder.png';
  node.append(el('img.sprite-img', { src, alt: '' }));
}

export const combatApi = { isActive, current, start, stop, toggleAuto, consume, renderInto, WIN_REQ, castAccord, debugPushNote, debugTestAccord, debugSetZone, debugUnlockAllZones, setChangeHook, setDonjonHooks };

// ===== La Brèche Instable : donjon à étages procédural, infini (Acte IV du Lore) =====
// Déblocage canon (voir Lore Ascencia.txt Acte IV + config.js RESONATOR_ZONES) : les
// 3 "résonateurs harmoniques" = habillage narratif des boss des Zones 8/9/10 déjà
// vaincus (aucune nouvelle quête à tracker) ; le Gardien Harmonique est un combat
// unique (réutilise le boss 'archange', seul boss du catalogue à la fois thématique
// et pourvu d'un vrai sprite — rescalé Zone 10) qui déverrouille la Brèche pour de bon.
//
// Une "run" (state.dungeon.active) traverse plusieurs étages sans se réinitialiser :
// le snapshot de ressources/inventaire posé à startRun() sert de référence pour TOUTE
// la run (pénalité de sortie forcée = 50% du gain CUMULÉ depuis l'entrée, pas juste
// l'étage courant). Grille = champ ouvert (aucun mur) : chaque case est accessible dès
// qu'elle est adjacente, la génération procédurale ne fait que placer des CONTENUS
// (ennemi/événement/boss), pas un labyrinthe — volontairement simple pour rester
// solvable à 100% sans pathfinding, voir échanges de design du 2026-07-17.
import { state, setState } from '../state.js';
import { SETTINGS, ZONES, RESONATOR_ZONES, GARDIEN_HARMONIQUE_BOSS, GARDIEN_HARMONIQUE_LABEL } from '../config.js';
import { makeMonster, makeBoss, ENEMIES } from './monsters.js';
import { derive } from './player.js';
import { start as combatStart, stop as combatStop, isActive as combatIsActive, setDonjonHooks } from './combat.js';
import { removeItemQty } from './items.js';
import { rollEvent, eventById } from '../data/donjon_events.js';
import { showToast } from '../components/toast.js';

const D = () => SETTINGS.donjon;
const tkey = (x, y) => `${x},${y}`;
const DIR_VECT = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] };
const OPPOSITE = { N: 'S', S: 'N', E: 'W', W: 'E' };

// ---- Déblocage ----
export function resonatorStatus() {
  return RESONATOR_ZONES.map((z) => ({ zone: z, done: !!state.progress.bossDefeated[z] }));
}
export const canEnterBreche = () => RESONATOR_ZONES.every((z) => !!state.progress.bossDefeated[z]);
export const gardienVaincu = () => !!state.dungeon.gardienVaincu;

// Combat unique de gate — lancé avec donjon:true (voir game/combat.js) pour passer
// par les mêmes hooks que les combats de grille, mais zoneId:'gardien-gate' permet à
// handleWin/handleLoss ci-dessous de le distinguer d'un vrai combat de case.
//
// Rééquilibrage 2026-07-17 (retour utilisateur : "trop fort") : 'archange' est
// hand-tuné pour la Zone 15 (attrs bruts vie=800/force=70), très au-dessus du boss
// RÉEL de la Zone 10 ('minotaure', vie=300/force=45) — appliquer juste le SCALE de la
// Zone 10 (1.63) à des attrs bruts de tier Zone 15 restait bien trop dur. On calcule
// donc un scale qui ÉGALISE la "puissance" (métrique √(vie·force)·scale déjà utilisée
// pour l'équilibrage des zones, voir config.js) du Gardien sur celle du VRAI boss de
// Zone 10, plutôt que de réutiliser tel quel le scale de zone.
function powerMetric(attrs, scale) { return Math.sqrt((attrs.vie || 1) * (attrs.force || 1)) * scale; }

export function launchGardien() {
  if (!canEnterBreche() || gardienVaincu()) return false;
  const z10 = ZONES.find((z) => z.id === 10) || ZONES[ZONES.length - 1];
  const z10Boss = ENEMIES[z10.boss];
  const gardienBase = ENEMIES[GARDIEN_HARMONIQUE_BOSS];
  let scale = z10.scale;
  if (z10Boss && gardienBase) {
    const targetPower = powerMetric(z10Boss.attrs, z10.scale);
    const gardienRaw = Math.sqrt((gardienBase.attrs.vie || 1) * (gardienBase.attrs.force || 1));
    scale = targetPower / gardienRaw;
  }
  const g = makeBoss(GARDIEN_HARMONIQUE_BOSS, scale) || makeMonster(GARDIEN_HARMONIQUE_BOSS, scale);
  if (!g) return false;
  g.name = GARDIEN_HARMONIQUE_LABEL; // reskin d'affichage seulement (sprite/stats archange réels)
  combatStart(g, { isBoss: true, zoneId: 'gardien-gate', donjon: true });
  return true;
}

// ---- Difficulté / contenu par étage (formule infinie, découplée du tableau ZONES) ----
export function zoneEquivForFloor(floor) {
  return D().zoneEquivBase + Math.floor(floor / D().floorsPerZoneStep);
}
function zoneForFloor(floor) {
  const eq = Math.max(1, Math.min(25, zoneEquivForFloor(floor)));
  return ZONES.find((z) => z.id === eq) || ZONES[ZONES.length - 1];
}
export function scaleForFloor(floor) {
  const eq = zoneEquivForFloor(floor);
  const z = zoneForFloor(floor);
  let scale = z.scale;
  if (eq > 25) scale *= Math.pow(D().scaleGrowthRate, eq - 25); // au-delà de la Zone 25 : extrapolation géométrique
  return scale;
}
function gridSize(floor) {
  return Math.min(D().gridMaxSize, D().gridBaseSize + Math.floor(floor / D().gridGrowthFloors));
}

// ---- Checkpoints (tous les N étages, jusqu'au meilleur étage déjà atteint) ----
// state.ascension.bestFloorAllTime : déjà réservé (voir state.js), jamais reset par
// ascend() — la progression de la Brèche survit aux Ascensions.
export function checkpoints() {
  const best = state.ascension.bestFloorAllTime || 0;
  const n = Math.floor(best / D().checkpointInterval);
  const list = [];
  for (let i = 0; i <= n; i++) list.push(i * D().checkpointInterval);
  return list;
}

// ---- Génération procédurale d'un étage (labyrinthe) ----
// Retour utilisateur 2026-07-17 : l'ancienne grille en "champ ouvert" (toute case
// adjacente franchissable) ressemblait juste à un carré vide, pas à un donjon. On
// carve maintenant un VRAI labyrinthe (recursive backtracker = DFS randomisé qui
// abat des murs entre cases adjacentes non visitées) : arbre couvrant parfait, donc
// UN SEUL chemin possible entre deux cases quelconques — solvable par construction,
// pas de pathfinding nécessaire côté déplacement (voir moveDir()), et le boss ni le
// contenu ne sont plus alignés sur des lignes droites.
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr;
}

// cells[y][x] = { N,S,E,W } — true = mur (bloqué), false = passage ouvert.
function carveMaze(size) {
  const cells = Array.from({ length: size }, () => Array.from({ length: size }, () => ({ N: true, S: true, E: true, W: true })));
  const visited = Array.from({ length: size }, () => Array(size).fill(false));
  const stack = [{ x: 0, y: 0 }];
  visited[0][0] = true;
  while (stack.length) {
    const cur = stack[stack.length - 1];
    const dirs = shuffle(['N', 'S', 'E', 'W']);
    let carved = false;
    for (const dir of dirs) {
      const [dx, dy] = DIR_VECT[dir];
      const nx = cur.x + dx, ny = cur.y + dy;
      if (nx < 0 || ny < 0 || nx >= size || ny >= size || visited[ny][nx]) continue;
      cells[cur.y][cur.x][dir] = false;
      cells[ny][nx][OPPOSITE[dir]] = false;
      visited[ny][nx] = true;
      stack.push({ x: nx, y: ny });
      carved = true;
      break;
    }
    if (!carved) stack.pop();
  }
  return cells;
}

// BFS depuis l'entrée : distances + pointeurs parent (pour reconstruire LE chemin
// unique vers n'importe quelle case, l'arbre couvrant garantit son unicité).
function bfs(cells, size, start) {
  const dist = Array.from({ length: size }, () => Array(size).fill(-1));
  const parent = Array.from({ length: size }, () => Array(size).fill(null));
  dist[start.y][start.x] = 0;
  const queue = [start];
  while (queue.length) {
    const cur = queue.shift();
    const c = cells[cur.y][cur.x];
    for (const dir of ['N', 'S', 'E', 'W']) {
      if (c[dir]) continue; // mur
      const [dx, dy] = DIR_VECT[dir];
      const nx = cur.x + dx, ny = cur.y + dy;
      if (nx < 0 || ny < 0 || nx >= size || ny >= size || dist[ny][nx] !== -1) continue;
      dist[ny][nx] = dist[cur.y][cur.x] + 1;
      parent[ny][nx] = cur;
      queue.push({ x: nx, y: ny });
    }
  }
  return { dist, parent };
}

function generateFloor(floor) {
  const size = gridSize(floor);
  const z = zoneForFloor(floor);
  const scale = scaleForFloor(floor);
  const entry = { x: 0, y: 0 };
  const cells = carveMaze(size);
  const { dist, parent } = bfs(cells, size, entry);

  // Boss : position ALÉATOIRE parmi les cases les plus lointaines (≥70% de la distance
  // maximale) — jamais figé dans un coin, mais toujours une vraie traversée du labyrinthe.
  let maxDist = 0;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (dist[y][x] > maxDist) maxDist = dist[y][x];
  const threshold = Math.max(1, Math.floor(maxDist * 0.7));
  const farCells = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (dist[y][x] >= threshold) farCells.push({ x, y });
  const bossPos = farCells[Math.floor(Math.random() * farCells.length)] || { x: size - 1, y: size - 1 };

  // Reconstruction du chemin unique entrée -> boss (hors case boss elle-même) — sert
  // à garantir au moins un monstre SUR le trajet obligatoire.
  const path = [];
  let cur = parent[bossPos.y] ? { x: bossPos.x, y: bossPos.y } : null;
  while (cur && !(cur.x === entry.x && cur.y === entry.y)) { path.push(cur); cur = parent[cur.y][cur.x]; }
  const pathNoBoss = path.filter((p) => !(p.x === bossPos.x && p.y === bossPos.y));

  const tiles = {};
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    tiles[tkey(x, y)] = { x, y, N: cells[y][x].N, S: cells[y][x].S, E: cells[y][x].E, W: cells[y][x].W, type: 'empty' };
  }
  tiles[tkey(entry.x, entry.y)].type = 'entry';
  tiles[tkey(bossPos.x, bossPos.y)].type = 'boss';
  tiles[tkey(bossPos.x, bossPos.y)].enemyId = z.boss;

  const others = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    if ((x === entry.x && y === entry.y) || (x === bossPos.x && y === bossPos.y)) continue;
    others.push({ x, y });
  }
  shuffle(others);
  const enemyCount = Math.min(D().enemyBase + Math.floor(floor / D().enemyPer), others.length);
  const eventCount = Math.min(others.length - enemyCount, Math.round(others.length * D().eventRatio));
  let idx = 0;
  for (let i = 0; i < enemyCount; i++, idx++) {
    const c = others[idx];
    const t = tiles[tkey(c.x, c.y)];
    t.type = 'enemy';
    t.enemyId = z.monsters[Math.floor(Math.random() * z.monsters.length)];
  }
  for (let i = 0; i < eventCount; i++, idx++) {
    const c = others[idx];
    const t = tiles[tkey(c.x, c.y)];
    t.type = 'event';
    t.eventId = rollEvent();
  }

  // Garantie : au moins 1 monstre sur le chemin obligatoire vers le boss (demande
  // explicite) — si le tirage aléatoire ci-dessus n'en a placé aucun dessus, on force.
  const hasEnemyOnPath = pathNoBoss.some((p) => tiles[tkey(p.x, p.y)].type === 'enemy');
  if (!hasEnemyOnPath && pathNoBoss.length) {
    const p = pathNoBoss[Math.floor(Math.random() * pathNoBoss.length)];
    const t = tiles[tkey(p.x, p.y)];
    t.type = 'enemy';
    t.enemyId = z.monsters[Math.floor(Math.random() * z.monsters.length)];
  }

  return { size, tiles, scale, zoneName: z.name };
}

// ---- PV max courant (PV max de base + Pacte du Diable actif, voir data/donjon_events.js) ----
export function runMaxHp(s = state, run = s.dungeon.active) {
  const base = derive(s.player).maxHp;
  const pct = (run && run.buffs && run.buffs.maxHpPct) || 0;
  return Math.max(1, Math.round(base * (1 + pct / 100)));
}

// ---- Cycle de vie d'une run ----
export const isRunActive = () => !!state.dungeon.active;
export const currentRun = () => state.dungeon.active;
export function currentTile() {
  const run = state.dungeon.active;
  if (!run) return null;
  return run.tiles[tkey(run.playerPos.x, run.playerPos.y)] || null;
}

// ---- Brouillard de guerre (retour utilisateur 2026-07-17 : "le joueur ne doit pas
// savoir vers où aller pour affronter le boss") : run.explored = Set (objet clé->true)
// des cases DÉJÀ révélées, jamais purgé (mémoire permanente une fois vue — revenir en
// arrière ne re-cache rien). Révélée = la case elle-même + tout voisin ATTEIGNABLE
// (mur ouvert) au moment où le joueur s'y trouve, même règle que reachableNeighbors()
// mais utilisable sur n'importe quelle position (génération d'étage, pas seulement la
// position courante de state.dungeon.active). Le contenu (icône ennemi/boss/événement/
// escalier) n'est affiché par la vue QUE pour les cases explorées — voir
// views/donjon.js buildCellContent() ; les murs, eux, restent toujours visibles.
function revealAround(run, x, y) {
  run.explored = run.explored || {};
  run.explored[tkey(x, y)] = true;
  const t = run.tiles[tkey(x, y)];
  if (!t) return;
  for (const dir of ['N', 'S', 'E', 'W']) {
    if (t[dir]) continue;
    const [dx, dy] = DIR_VECT[dir];
    const nx = x + dx, ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= run.size || ny >= run.size) continue;
    run.explored[tkey(nx, ny)] = true;
  }
}

export function startRun(floor) {
  if (!gardienVaincu()) return false;
  const cps = checkpoints();
  const f = cps.includes(floor) ? floor : cps[cps.length - 1];
  const gen = generateFloor(f);
  const snapshot = {
    resources: { ...state.resources },
    inventory: Object.fromEntries(state.inventory.map((i) => [i.tid, i.count])),
  };
  setState((s) => {
    s.dungeon.active = {
      floor: f, size: gen.size, tiles: gen.tiles, scale: gen.scale, zoneName: gen.zoneName,
      playerPos: { x: 0, y: 0 },
      buffs: { atkPct: 0, maxHpPct: 0 },
      reviveCharges: 0,
      bossAlive: true,
      combatTileKey: null,
      promptStairs: false, // true dès qu'on ATTERRIT sur l'escalier (voir moveDir()) — reprompt à chaque retour
      explored: {},
      snapshot,
    };
    revealAround(s.dungeon.active, 0, 0);
  });
  return true;
}

// Passe à l'étage suivant SANS clore la run (snapshot/buffs/reviveCharges conservés —
// la pénalité de sortie forcée porte sur le gain cumulé depuis startRun(), pas depuis
// le dernier étage). N'est permis qu'une fois le boss de l'étage courant vaincu.
export function advanceFloor() {
  const run = state.dungeon.active;
  if (!run || run.bossAlive !== false) return false;
  const nextFloor = run.floor + 1;
  const gen = generateFloor(nextFloor);
  setState((s) => {
    const r = s.dungeon.active;
    if (!r) return;
    s.ascension.bestFloorAllTime = Math.max(s.ascension.bestFloorAllTime || 0, r.floor); // checkpoint validé
    r.floor = nextFloor; r.size = gen.size; r.tiles = gen.tiles; r.scale = gen.scale; r.zoneName = gen.zoneName;
    r.playerPos = { x: 0, y: 0 };
    r.bossAlive = true;
    r.combatTileKey = null;
    r.promptStairs = false;
    r.explored = {}; // nouvel étage = nouveau brouillard (voir revealAround())
    revealAround(r, 0, 0);
  });
  return true;
}

// Termine la run. clean=true (bouton "Quitter", à un changement d'étage) : loot
// intégral, checkpoint validé pour l'étage courant. clean=false (défaite sans
// Bénédiction, ou "Retour" forcé) : reprend 50% du GAIN de cette run sur ressources +
// inventaire (jamais en-dessous du solde de départ — voir snapshot dans startRun()).
export function endRun(clean) {
  const run = state.dungeon.active;
  if (!run) return;
  setState((s) => {
    if (!clean) {
      const snap = run.snapshot;
      const pct = D().lossPenaltyPct;
      for (const k of Object.keys(snap.resources)) {
        const gained = (s.resources[k] || 0) - (snap.resources[k] || 0);
        if (gained > 0) s.resources[k] -= Math.floor(gained * pct / 100);
      }
      for (const item of [...s.inventory]) { // copie : removeItemQty peut spliceer s.inventory
        const gained = item.count - (snap.inventory[item.tid] || 0);
        if (gained > 0) removeItemQty(s.inventory, item.tid, Math.floor(gained * pct / 100));
      }
    } else {
      s.ascension.bestFloorAllTime = Math.max(s.ascension.bestFloorAllTime || 0, run.floor);
    }
    const max = derive(s.player).maxHp;
    s.player.combatHp.cur = Math.max(1, Math.round(max * (D().exitHpPct / 100))); // régén reprend hors Brèche
    s.dungeon.active = null;
  });
}

// ---- Déplacement (contraint par les murs du labyrinthe — clic case atteignable OU
// pavé directionnel, voir reachableNeighbors()) ----
// Cases atteignables DEPUIS la case courante (mur ouvert dans cette direction) — sert
// à la fois à la vue (surbrillance/activation des cases cliquables + pavé directionnel)
// et à moveDir() qui revalide indépendamment (jamais confiance aveugle dans l'UI).
export function reachableNeighbors() {
  const run = state.dungeon.active;
  if (!run) return [];
  const t = run.tiles[tkey(run.playerPos.x, run.playerPos.y)];
  if (!t) return [];
  const out = [];
  for (const dir of ['N', 'S', 'E', 'W']) {
    if (t[dir]) continue; // mur
    const [dx, dy] = DIR_VECT[dir];
    const nx = run.playerPos.x + dx, ny = run.playerPos.y + dy;
    if (nx < 0 || ny < 0 || nx >= run.size || ny >= run.size) continue;
    out.push({ x: nx, y: ny, dir });
  }
  return out;
}

// "Rester ici" (modale escalier, voir views/donjon.js) — ne masque la modale QUE pour
// cette visite : moveDir() remet promptStairs à true tout seul si le joueur repart
// puis revient sur la case, pas besoin de retenir un état de "dismiss" côté vue.
export function dismissStairsPrompt() {
  setState((s) => { if (s.dungeon.active) s.dungeon.active.promptStairs = false; });
}

export function moveDir(dir) {
  const run = state.dungeon.active;
  if (!run || combatIsActive()) return false;
  const t = run.tiles[tkey(run.playerPos.x, run.playerPos.y)];
  if (!t || t[dir]) return false; // mur dans cette direction
  const [dx, dy] = DIR_VECT[dir];
  const nx = run.playerPos.x + dx, ny = run.playerPos.y + dy;
  if (nx < 0 || ny < 0 || nx >= run.size || ny >= run.size) return false;
  const landing = run.tiles[tkey(nx, ny)];
  setState((s) => {
    const r = s.dungeon.active;
    if (!r) return;
    r.playerPos = { x: nx, y: ny };
    // Escalier : reprompt AUTOMATIQUE à chaque atterrissage (pas seulement la 1ère
    // fois) — retour utilisateur : quitter puis revenir sur la case doit rouvrir le
    // choix Rester/Descendre/Quitter sans avoir à recliquer dessus.
    r.promptStairs = !!(landing && landing.type === 'stairs');
    revealAround(r, nx, ny); // brouillard de guerre — voir revealAround()
  });
  resolveTile(nx, ny);
  return true;
}

function resolveTile(x, y) {
  const run = state.dungeon.active;
  if (!run) return;
  const t = run.tiles[tkey(x, y)];
  if (!t) return;
  if (t.type === 'enemy') {
    const m = makeMonster(t.enemyId, run.scale);
    if (m) launchTileCombat(tkey(x, y), m, false);
  } else if (t.type === 'boss') {
    const m = makeBoss(t.enemyId, run.scale) || makeMonster(t.enemyId, run.scale);
    if (m) launchTileCombat(tkey(x, y), m, true);
  } else if (t.type === 'event') {
    const ev = eventById(t.eventId);
    // Pièges (ev.forced, voir data/donjon_events.js) : pas de choix, résolution
    // immédiate — retour utilisateur 2026-07-17 ("le joueur n'a pas le choix de le
    // prendre"). Les autres événements restent optionnels (modale accepter/ignorer,
    // voir acceptEvent()/declineEvent() ci-dessous, tant que le joueur est dessus).
    if (ev && ev.forced) resolveForcedEvent(x, y, ev);
  }
  // 'empty'/'entry'/'stairs' : rien d'automatique ici (stairs = promptStairs ci-dessus).
}

// Événement forcé (piège) : apply() tourne tout de suite, sans passer par la modale.
// ev.ambush (ex: Embuscade) : en plus de l'effet éventuel, lance un combat immédiat
// contre un monstre aléatoire de la zone courante — même mécanique qu'une case 'enemy'
// normale (launchTileCombat), la case ayant déjà été vidée en 'empty' juste avant.
function resolveForcedEvent(x, y, ev) {
  let message = '';
  setState((s) => {
    const r = s.dungeon.active;
    if (!r) return;
    message = ev.apply(s, r, (ds) => runMaxHp(ds, ds.dungeon.active));
    const tile = r.tiles[tkey(x, y)];
    if (tile) tile.type = 'empty';
  });
  if (message) showToast(message, { icon: ev.icon, type: ev.toastType || 'loot' });
  if (ev.ambush) {
    const run = state.dungeon.active;
    if (!run) return;
    const z = zoneForFloor(run.floor);
    const enemyId = z.monsters[Math.floor(Math.random() * z.monsters.length)];
    const m = makeMonster(enemyId, run.scale);
    if (m) launchTileCombat(tkey(x, y), m, false);
  }
}

function launchTileCombat(tileKey, monster, isBoss) {
  setState((s) => { if (s.dungeon.active) s.dungeon.active.combatTileKey = tileKey; });
  const run = state.dungeon.active;
  const extraPct = { attaque: (run.buffs && run.buffs.atkPct) || 0, maxHp: (run.buffs && run.buffs.maxHpPct) || 0 };
  combatStart(monster, { isBoss, zoneId: `donjon:${run.floor}`, donjon: true, extraPct });
}

// ---- Événements : modale de choix côté vue (voir views/donjon.js eventModal()) —
// apply() n'est appelée QUE si le joueur accepte ; dans les deux cas la case est
// consommée (redevient 'empty'), pas de re-déclenchement en revisitant plus tard.
// Les événements `forced` (pièges) ne passent JAMAIS par ici — voir resolveForcedEvent().
export function acceptEvent() {
  const run = state.dungeon.active;
  const t = run && run.tiles[tkey(run.playerPos.x, run.playerPos.y)];
  if (!t || t.type !== 'event') return false;
  const ev = eventById(t.eventId);
  if (!ev || ev.forced) return false;
  let message = '';
  setState((s) => {
    const r = s.dungeon.active;
    if (!r) return;
    message = ev.apply(s, r, (ds) => runMaxHp(ds, ds.dungeon.active));
    const tile = r.tiles[tkey(run.playerPos.x, run.playerPos.y)];
    if (tile) tile.type = 'empty';
  });
  if (message) showToast(message, { icon: ev.icon, type: ev.toastType || 'loot' });
  return true;
}
export function declineEvent() {
  const run = state.dungeon.active;
  const t = run && run.tiles[tkey(run.playerPos.x, run.playerPos.y)];
  if (!t || t.type !== 'event') return false;
  const ev = eventById(t.eventId);
  if (ev && ev.forced) return false;
  setState((s) => {
    const r = s.dungeon.active;
    if (!r) return;
    const tile = r.tiles[tkey(run.playerPos.x, run.playerPos.y)];
    if (tile) tile.type = 'empty';
  });
  return true;
}

// ---- Hooks combat.js (voir game/combat.js setDonjonHooks — pas d'import inverse) ----
function handleWin({ isBoss, zoneId }) {
  if (zoneId === 'gardien-gate') {
    setState((s) => { s.dungeon.gardienVaincu = true; s.player.combatHp.cur = Math.max(1, Math.round(derive(s.player).maxHp * (D().exitHpPct / 100))); });
    showToast('Le Gardien Harmonique est vaincu — la Brèche Instable est ouverte.', { icon: 'assets/sprites/icons/dissonance.png' });
    return;
  }
  const run = state.dungeon.active;
  if (!run || !run.combatTileKey) return;
  const gain = isBoss ? 5 + Math.floor(run.floor / 5) : 1; // Éclats de Brèche — voir SETTINGS.donjon
  setState((s) => {
    const r = s.dungeon.active;
    if (!r) return;
    const t = r.tiles[r.combatTileKey];
    if (t) { t.type = isBoss ? 'stairs' : 'empty'; if (isBoss) { r.bossAlive = false; r.promptStairs = true; } }
    r.combatTileKey = null;
    s.resources.eclats_breche = (s.resources.eclats_breche || 0) + gain;
  });
  showToast(`+${gain} Éclats de Brèche`, { icon: 'assets/sprites/ressources/cle_de_la_breche.png' });
}

function handleLoss() {
  const run = state.dungeon.active;
  if (!run) { // défaite hors run (Gardien Harmonique) — pas de pénalité, pas de run à clore
    setState((s) => { s.player.combatHp.cur = Math.max(1, Math.round(derive(s.player).maxHp * (D().exitHpPct / 100))); });
    return;
  }
  if ((run.reviveCharges || 0) > 0) {
    setState((s) => {
      const r = s.dungeon.active;
      if (!r) return;
      r.reviveCharges -= 1;
      r.combatTileKey = null;
      s.player.combatHp.cur = Math.max(1, Math.round(runMaxHp(s, r) * 0.3));
    });
    showToast('Bénédiction consommée — vous êtes sauvé !', { icon: 'assets/sprites/icons/harmonie.png' });
    return;
  }
  endRun(false);
  showToast(`Défaite — ${D().lossPenaltyPct}% du butin de la run perdu.`, { type: 'warning' });
}

setDonjonHooks({ onWin: handleWin, onLoss: handleLoss });

// ---- Debug console (voir main.js window.Ascencia) ----
export function debugUnlockResonators() {
  setState((s) => { for (const z of RESONATOR_ZONES) s.progress.bossDefeated[z] = true; });
  return true;
}
export function debugSetBestFloor(n) {
  setState((s) => { s.ascension.bestFloorAllTime = Math.max(0, Math.round(n)); });
  return state.ascension.bestFloorAllTime;
}

export const donjonApi = {
  resonatorStatus, canEnterBreche, gardienVaincu, launchGardien,
  zoneEquivForFloor, scaleForFloor, checkpoints, runMaxHp,
  isRunActive, currentRun, currentTile, startRun, advanceFloor, endRun,
  moveDir, reachableNeighbors, acceptEvent, declineEvent, dismissStairsPrompt,
  debugUnlockResonators, debugSetBestFloor,
};

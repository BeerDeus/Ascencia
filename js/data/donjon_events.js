// ===== Événements aléatoires de la Brèche Instable (voir game/donjon.js) =====
// Pattern calqué sur game/monsters.js LARRY_AFFIXES : chaque événement expose
// apply(s, run) — s = draft state (à l'intérieur d'un setState), run = s.dungeon.active
// (draft) — et renvoie une ligne de log/toast.
//
// `forced` (retour utilisateur 2026-07-17 : "le joueur n'a pas le choix de le prendre")
// : les pièges se résolvent immédiatement à l'atterrissage (voir game/donjon.js
// resolveTile()/resolveForcedEvent()), sans passer par la modale accepter/ignorer —
// contrairement aux événements optionnels ci-dessous, qui restent proposés via la
// modale (views/donjon.js eventModal(), acceptEvent()/declineEvent() de game/donjon.js).
// `ambush` (Embuscade) : en plus de son effet, déclenche un combat immédiat contre un
// monstre aléatoire de la zone courante — voir resolveForcedEvent().
// `toastType` (optionnel, 'loot' par défaut) : passé tel quel à components/toast.js
// (ex: 'warning' pour un événement négatif).
// `desc` = texte affiché dans la modale de choix AVANT résolution (voir views/donjon.js
// eventModal()) — accepter/ignorer déclenche acceptEvent()/declineEvent() (game/donjon.js),
// `apply()` n'est appelée QUE si le joueur accepte (ou toujours, pour un `forced`).

export const DONJON_EVENTS = [
  // ---- Pièges (forced — pas de choix) ----
  {
    id: 'piege',
    label: 'Piège',
    forced: true,
    toastType: 'warning',
    desc: 'Un mécanisme suspect. Le déclencher inflige des dégâts immédiats basés sur tes PV actuels.',
    icon: 'assets/sprites/icons/vie_brisee.png',
    weight: 3,
    apply(s, run, deriveMaxHp) {
      const pct = 5 + Math.random() * 10; // -5% à -15% des PV ACTUELS (pas du max)
      const cur = s.player.combatHp.cur;
      const lost = Math.max(1, Math.round(cur * (pct / 100)));
      s.player.combatHp.cur = Math.max(1, cur - lost);
      return `Un piège se déclenche ! -${lost} PV.`;
    },
  },
  {
    id: 'fosse_instable',
    label: 'Fosse Instable',
    forced: true,
    toastType: 'warning',
    desc: 'Le sol cède sous tes pas — une poche de Dissonance draine tes Éclats de Brèche.',
    icon: 'assets/sprites/ressources/cle_de_la_breche.png',
    weight: 2,
    apply(s) {
      const have = s.resources.eclats_breche || 0;
      if (have <= 0) return "Le sol cède sous tes pas... mais tu n'avais rien à perdre.";
      const lost = Math.min(have, 1 + Math.floor(Math.random() * 3));
      s.resources.eclats_breche = have - lost;
      return `Fosse instable ! -${lost} Éclats de Brèche.`;
    },
  },
  {
    id: 'embuscade',
    label: 'Embuscade',
    forced: true,
    ambush: true,
    toastType: 'warning',
    desc: "Une présence hostile jaillit de l'ombre sans prévenir.",
    icon: 'assets/sprites/icons/combat.png',
    weight: 2,
    apply() {
      return 'Embuscade ! Un ennemi surgit.';
    },
  },

  // ---- Événements optionnels (modale accepter/ignorer) ----
  {
    id: 'fontaine',
    label: 'Fontaine de Résonance',
    desc: 'Une eau chargée d’harmonie. Boire soigne une partie de tes PV (25% de ton max).',
    icon: 'assets/sprites/icons/vie_alt_b.png',
    weight: 3,
    apply(s, run, deriveMaxHp) {
      const max = deriveMaxHp(s);
      const heal = Math.round(max * 0.25);
      const before = s.player.combatHp.cur;
      s.player.combatHp.cur = Math.min(max, before + heal);
      return `Fontaine de Résonance : +${s.player.combatHp.cur - before} PV.`;
    },
  },
  {
    id: 'pacte_diable',
    label: 'Pacte du Diable',
    desc: 'Une présence te propose un marché : +20% de dégâts pour le reste de la run, contre -10% de PV max pour le reste de la run.',
    icon: 'assets/sprites/icons/dissonance.png',
    weight: 2,
    apply(s, run, deriveMaxHp) {
      run.buffs.atkPct = (run.buffs.atkPct || 0) + 20;
      run.buffs.maxHpPct = (run.buffs.maxHpPct || 0) - 10;
      const max = deriveMaxHp(s);
      s.player.combatHp.cur = Math.min(s.player.combatHp.cur, max);
      return `Un pacte scelle votre destin : +20% dégâts, -10% PV max pour le reste de la run.`;
    },
  },
  {
    id: 'benediction',
    label: 'Bénédiction',
    desc: 'Une lueur bienveillante t’accompagne. Accorde une charge de survie : la prochaine défaite de cette run sera pardonnée.',
    icon: 'assets/sprites/icons/harmonie.png',
    weight: 2,
    apply(s, run) {
      run.reviveCharges = (run.reviveCharges || 0) + 1;
      return `Bénédiction reçue : une défaite sera pardonnée cette run (${run.reviveCharges} charge${run.reviveCharges > 1 ? 's' : ''}).`;
    },
  },
  {
    id: 'coffre_resonance',
    label: 'Coffre de Résonance',
    desc: "Un petit coffre scellé, chargé d'harmonie résiduelle.",
    icon: 'assets/sprites/objets/caisse.png',
    weight: 3,
    apply(s) {
      const gold = 15 + Math.floor(Math.random() * 30);
      s.resources.or = (s.resources.or || 0) + gold;
      const mats = ['bois', 'metal', 'tissu'];
      const mat = mats[Math.floor(Math.random() * mats.length)];
      const n = 5 + Math.floor(Math.random() * 15);
      s.resources[mat] = (s.resources[mat] || 0) + n;
      return `Coffre ouvert : +${gold} or, +${n} ${mat}.`;
    },
  },
  {
    id: 'autel_dissonant',
    label: 'Autel Dissonant',
    desc: "Une offrande d'or contre un sursaut de puissance : +15% de dégâts pour le reste de la run, contre 30% de ton or actuel.",
    icon: 'assets/sprites/objets/grimoire_ancien.png',
    weight: 2,
    apply(s, run) {
      const cost = Math.floor((s.resources.or || 0) * 0.3);
      s.resources.or = (s.resources.or || 0) - cost;
      run.buffs.atkPct = (run.buffs.atkPct || 0) + 15;
      return `L'autel accepte ton offrande (-${cost} or) : +15% dégâts pour le reste de la run.`;
    },
  },
  {
    id: 'relique_muette',
    label: 'Relique Muette',
    desc: "Un fragment de reliquaire, silencieux mais chargé d'échos de la Brèche.",
    icon: 'assets/sprites/objets/anneau_or.png',
    weight: 2,
    apply(s) {
      const n = 2 + Math.floor(Math.random() * 3);
      s.resources.eclats_breche = (s.resources.eclats_breche || 0) + n;
      return `Relique récupérée : +${n} Éclats de Brèche.`;
    },
  },
];

export function eventById(id) { return DONJON_EVENTS.find((e) => e.id === id) || null; }

// Tirage pondéré — un seul id par case événement, décidé à la génération de l'étage
// (voir game/donjon.js generateFloor()), pas à chaque visite.
export function rollEvent() {
  const total = DONJON_EVENTS.reduce((s, e) => s + e.weight, 0);
  let r = Math.random() * total;
  for (const e of DONJON_EVENTS) { r -= e.weight; if (r <= 0) return e.id; }
  return DONJON_EVENTS[0].id;
}

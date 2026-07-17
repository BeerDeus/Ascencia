// ===== Récits (Fragments d'Écho) — Actes I à III (ouverture), adapté de "Lore Ascencia.txt" =====
// MAJ 2026-07-17 (Tâche 7.4 Roadmap) : extension à l'Acte II (ch8-11, Pont-la-Croisée/
// Silas l'Enchanteur/premier affrontement avec Larry) + ouverture de l'Acte III (ch12-13,
// rituel d'Ascension + 2e Ascension) — ces deux Actes ne demandaient AUCUN nouveau
// système, juste des conditions de déblocage sur de l'état déjà réel (zone, enchant
// posé, ascension.count). La suite de l'Acte III (Gardien Harmonique, étages 70/80 de
// la Brèche) et les Actes IV+ (résonateurs, donjon de la Brèche Instable) restent
// bloqués tant qu'un système d'étages/donjon n'existe pas en jeu — pas de contenu
// factice pour l'instant, on attend le vrai système (voir state.ascension.bestFloorAllTime,
// déjà réservé). Chaque fragment se débloque via une condition vérifiable sur l'état
// courant et octroie un bonus permanent — même logique que Maîtrise (game/codex.js) :
// bonus dérivés à la volée, jamais stockés.
import { state } from '../state.js';

const totalKills = (wins) => Object.values(wins || {}).reduce((s, v) => s + v, 0);
const killsOf = (wins, ids) => ids.reduce((s, id) => s + ((wins && wins[id]) || 0), 0);

export const LORE_FRAGMENTS = [
  {
    id: 'ch1_portes_aubier',
    chapter: 1,
    title: "Les Portes d'Aubier",
    unlockLabel: 'Toujours disponible',
    check: () => true,
    text: "Votre histoire commence aux portes du Hameau d'Aubier, un village qui a oublié le goût de la tranquillité. Maître Elian, le vieil homme qui guide la communauté, voit en vous une lueur d'espoir. La forêt alentour, autrefois nourricière, est devenue une menace silencieuse : ses créatures ont sombré dans la folie, leurs regards brillant d'une lueur violette et malsaine. Votre première mission est simple — comprendre pourquoi.",
    reward: { flat: { vie: 1 } }, rewardTxt: '+1 Vie',
  },
  {
    id: 'ch2_traque_loup',
    chapter: 2,
    title: 'La Traque du Loup Dissonant',
    unlockLabel: 'Éliminer 30 loups (Bois Sauvages)',
    check: (s) => killsOf(s.monsterWins, ['loup_affame', 'loup_dissonant']) >= 30,
    text: "En vous enfonçant dans les Bois Sauvages, vous croisez la source du mal : des loups au pelage zébré de cristaux dissonants, les yeux voilés d'une transe malsaine. Ce n'est pas la faim qui les guide, mais une pure et simple folie. Chaque bête abattue vous rapproche d'une vérité que le village entier redoute déjà.",
    reward: { flat: { agilite: 1 } }, rewardTxt: '+1 Agilité',
  },
  {
    id: 'ch3_forgeron_disparu',
    chapter: 3,
    title: 'Le Forgeron Disparu',
    unlockLabel: 'Vaincre le Grand Gobelin Grognon',
    // Décalé à >=4 le 2026-07-15 (réorg zones : boss_0 "Grand Gobelin Grognon" est
    // maintenant exclusivement en Zone 3 "Camp de Gobelins", pas Zone 2 — voir
    // config.js ZONES). unlocked>=4 = zone 3 (donc son boss) déjà vaincue.
    check: (s) => (s.progress.unlocked || 1) >= 4,
    text: "Kaelen, le forgeron du village, a disparu — enlevé par une bande de gobelins. Vous le retrouvez au cœur de leur camp, non pas torturé, mais observé : les créatures, fascinées, tripotent ses outils comme si elles cherchaient à accorder un instrument. Une fois leur chef abattu et Kaelen libéré, celui-ci vous explique que ce manège a commencé après la découverte d'un étrange minerai dans une mine abandonnée.",
    reward: { flat: { force: 1 } }, rewardTxt: '+1 Force',
  },
  {
    id: 'ch4_mine_murmurante',
    chapter: 4,
    title: 'La Mine Murmurante',
    unlockLabel: 'Atteindre les Mines de Pierre (Zone 6)',
    // Décalé à >=6 le 2026-07-15 (Mines de Pierre est maintenant Zone 6, pas 5).
    check: (s) => (s.progress.unlocked || 1) >= 6,
    text: "Poussé par la curiosité de Kaelen, vous vous enfoncez dans la Mine Murmurante. À l'intérieur, la pierre elle-même semble gémir. Plus vous progressez, plus l'air se charge d'une énergie ancienne, comme si quelque chose de très vieux et de très puissant montait la garde tout au fond des galeries.",
    reward: { flat: { defense: 1 } }, rewardTxt: '+1 Défense',
  },
  {
    id: 'ch5_fragment_echo',
    chapter: 5,
    title: "Le Fragment d'Écho",
    unlockLabel: 'Vaincre le Dragonnet de Feu',
    // Décalé à [6] le 2026-07-15 (Dragonnet de Feu, boss_2, est maintenant le boss
    // de la Zone 6, pas 5).
    check: (s) => !!(s.progress.bossDefeated && s.progress.bossDefeated[6]),
    text: "Au plus profond de la mine, un gardien ancestral se dresse, entièrement corrompu par la Dissonance. Le combat est rude, mais à sa défaite, la créature s'effondre et révèle en son cœur un cristal pur : un Fragment d'Écho. À son contact, une vision vous submerge — celle d'une étoile se brisant dans un silence absolu.",
    reward: { flat: { intelligence: 1 } }, rewardTxt: '+1 Intelligence',
  },
  {
    id: 'ch6_lysandra',
    chapter: 6,
    title: "Lysandra, l'Archiviste",
    unlockLabel: 'Vaincre 500 monstres au total',
    check: (s) => totalKills(s.monsterWins) >= 500,
    text: "Cette libération d'énergie pure n'est pas passée inaperçue. Lysandra, une Archiviste de l'Ordre du Silence, vous retrouve et vous révèle une vérité vertigineuse : le monde entier est une symphonie, et la Dissonance en est la fracture. Votre légende commence tout juste à s'écrire.",
    reward: { pct: { chanceNote: 2 } }, rewardTxt: '+2% Chance de note',
  },
  {
    id: 'ch7_ombre_qui_rit',
    chapter: 7,
    title: "L'Ombre qui Rit",
    unlockLabel: 'Vaincre 1000 monstres au total',
    check: (s) => totalKills(s.monsterWins) >= 1000,
    text: "Vous avez nettoyé chaque recoin des terres connues, vaincu chaque garde-frontière de la Dissonance. Et pourtant, dans le silence de votre victoire, un rire résonne — lent, sarcastique, familier d'une manière que vous ne saviez pas encore redouter. « Continue de les rassembler pour moi, veux-tu ? » murmure une voix dans l'ombre. « Ça rend les choses tellement plus... intéressantes. » La Dissonance n'est pas un accident. C'est un jeu. Et vous venez d'apprendre que vous en êtes le pion.",
    reward: { pct: { resDissonance: 2 } }, rewardTxt: '+2% Résist. Dissonance',
  },
  // ---- Acte II : la traque de Larry (Pont-la-Croisée / Capitale) ----
  {
    id: 'ch8_pont_la_croisee',
    chapter: 8,
    title: 'Pont-la-Croisée',
    unlockLabel: 'Atteindre le Marais Empoisonné (Zone 7)',
    check: (s) => (s.progress.unlocked || 1) >= 7,
    text: "Le rire de Larry hante vos pas. Vous n'êtes plus un simple guérisseur : vous êtes un chasseur. Sa piste vous mène à Pont-la-Croisée, une cité bouillonnante où votre réputation vous précède déjà. Gaston, le cuisinier de l'auberge, vous apprend qu'un guerrier bien nourri affronte mieux les pires épreuves. La garde, reconnaissant votre valeur, instaure en votre honneur le premier Tableau des Primes.",
    reward: { pct: { bonusOr: 1 } }, rewardTxt: "+1% Trouvaille d'or",
  },
  {
    id: 'ch9_maitresse_chasseuse',
    chapter: 9,
    title: 'La Maîtresse Chasseuse',
    unlockLabel: 'Atteindre la Crypte des Oubliés (Zone 8)',
    check: (s) => (s.progress.unlocked || 1) >= 8,
    text: "La Dissonance de Larry est plus intentionnelle qu'un simple chaos : il ne corrompt pas, il « améliore », créant des bêtes mutées. Pour comprendre son art impie, il vous faut un cœur de créature que seule la Maîtresse Chasseuse peut vous aider à trouver. Femme aussi sauvage que les bêtes qu'elle traque, elle ne respecte que la force — et ce n'est qu'après avoir prouvé votre talent qu'elle accepte enfin de commercer avec vous.",
    reward: { flat: { chance: 1 } }, rewardTxt: '+1 Chance',
  },
  {
    id: 'ch10_tour_de_silas',
    chapter: 10,
    title: 'La Tour de Silas',
    unlockLabel: 'Enchanter une pièce d’équipement',
    check: (s) => Object.values((s.player && s.player.equipment) || {}).some((e) => e && e.enchant),
    text: "Le composant vous mène à la source de la magie de Larry : la tour de son ancien maître, Silas l'Enchanteur. Brisé par la trahison de son élève, Silas vous explique sa folie — Larry ne voit pas le monde comme brisé, mais comme une toile vierge à repeindre aux couleurs du chaos. Pour vous aider à le combattre, Silas vous enseigne les secrets de l'enchantement.",
    reward: { pct: { crit: 1 } }, rewardTxt: '+1% Critique',
  },
  {
    id: 'ch11_chef_doeuvre_larry',
    chapter: 11,
    title: "Le Chef-d'œuvre de Larry",
    unlockLabel: 'Ascender pour la première fois',
    check: (s) => ((s.ascension && s.ascension.count) || 0) >= 1,
    text: "Vous coincez enfin Larry dans un de ses laboratoires cachés. Le combat est une farce : il esquive vos coups sans effort, retourne vos propres forces contre vous. « Tu joues encore la vieille mélodie, dit-il. Laisse-moi t'apprendre un nouveau rythme. » Il disparaît, laissant derrière lui une abomination de chair et de cristal qui vous laisse pour mort. Lysandra vous le confirme : tant que vous resterez dans les limites de cette vie, vous ne serez qu'un jouet pour lui. L'heure de l'Ascension est venue.",
    reward: { pct: { resistance: 1 } }, rewardTxt: '+1% Résistance aux dégâts',
  },
  // ---- Acte III (ouverture) : la première Ascension ----
  {
    id: 'ch12_se_briser_pour_renaitre',
    chapter: 12,
    title: 'Se Briser pour Renaître',
    unlockLabel: 'Ascender pour la première fois',
    check: (s) => ((s.ascension && s.ascension.count) || 0) >= 1,
    text: "Le choix était terrible : abandonner tout ce que vous aviez bâti pour une promesse de puissance future. Mais le sourire de Larry ne vous laissait pas d'autre option. Le rituel fut une dissolution — votre corps et votre esprit se dénouant fil par fil, votre histoire se dispersant comme de la poussière d'étoiles. Puis le vide. Et enfin, une nouvelle étincelle. Votre légende passée était désormais gravée dans le firmament : les Constellations étaient vôtres, un pouvoir que même Larry ne pouvait vous arracher.",
    reward: { flat: { intelligence: 1 } }, rewardTxt: '+1 Intelligence',
  },
  {
    id: 'ch13_juge_silencieux',
    chapter: 13,
    title: 'Le Juge Silencieux',
    unlockLabel: 'Ascender une deuxième fois',
    check: (s) => ((s.ascension && s.ascension.count) || 0) >= 2,
    text: "Une telle lumière ne pouvait passer inaperçue. « Il sait, murmura Lysandra, le visage blême. Larry a senti ta renaissance, et il n'aime pas la concurrence. » L'ennemi qu'il envoya n'était pas une bête corrompue, mais un assassin de cristal noir et de silence, chargé d'éteindre votre étincelle avant qu'elle ne devienne un brasier. Quand il se brisa en un million d'éclats silencieux, vous aviez votre réponse : l'Ascension avait fonctionné. Le jeu avait changé.",
    reward: { pct: { critDmg: 2 } }, rewardTxt: '+2% Dégâts Critiques',
  },
];

export const isUnlocked = (frag, s = state) => frag.check(s);
export const unlockedFragments = (s = state) => LORE_FRAGMENTS.filter((f) => isUnlocked(f, s));

// ---- Bonus permanents des Récits (même pattern que Codex/Maîtrise — jamais stockés) ----
export function loreBonuses(s = state) {
  const flat = {}, pct = {};
  for (const f of LORE_FRAGMENTS) {
    if (!isUnlocked(f, s)) continue;
    for (const [k, v] of Object.entries(f.reward.flat || {})) flat[k] = (flat[k] || 0) + v;
    for (const [k, v] of Object.entries(f.reward.pct || {})) pct[k] = (pct[k] || 0) + v;
  }
  return { flat, pct };
}

export const loreApi = { LORE_FRAGMENTS, isUnlocked, unlockedFragments, loreBonuses };

// ===== Récits (Fragments d'Écho) — Acte I, adapté de "Lore Ascencia.txt" =====
// Contenu volontairement limité à l'Acte I : le jeu ne propose actuellement que les
// Zones 1-5 (voir config.js ZONES). Chaque fragment se débloque via une condition
// vérifiable sur l'état courant et octroie un bonus permanent — même logique que
// Maîtrise (game/codex.js) : bonus dérivés à la volée, jamais stockés.
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
    check: (s) => (s.progress.unlocked || 1) >= 3,
    text: "Kaelen, le forgeron du village, a disparu — enlevé par une bande de gobelins. Vous le retrouvez au cœur de leur camp, non pas torturé, mais observé : les créatures, fascinées, tripotent ses outils comme si elles cherchaient à accorder un instrument. Une fois leur chef abattu et Kaelen libéré, celui-ci vous explique que ce manège a commencé après la découverte d'un étrange minerai dans une mine abandonnée.",
    reward: { flat: { force: 1 } }, rewardTxt: '+1 Force',
  },
  {
    id: 'ch4_mine_murmurante',
    chapter: 4,
    title: 'La Mine Murmurante',
    unlockLabel: 'Atteindre les Mines de Pierre (Zone 5)',
    check: (s) => (s.progress.unlocked || 1) >= 5,
    text: "Poussé par la curiosité de Kaelen, vous vous enfoncez dans la Mine Murmurante. À l'intérieur, la pierre elle-même semble gémir. Plus vous progressez, plus l'air se charge d'une énergie ancienne, comme si quelque chose de très vieux et de très puissant montait la garde tout au fond des galeries.",
    reward: { flat: { defense: 1 } }, rewardTxt: '+1 Défense',
  },
  {
    id: 'ch5_fragment_echo',
    chapter: 5,
    title: "Le Fragment d'Écho",
    unlockLabel: 'Vaincre le Dragonnet de Feu',
    check: (s) => !!(s.progress.bossDefeated && s.progress.bossDefeated[5]),
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

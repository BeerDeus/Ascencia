// Dialogues courts (≤ 3 répliques). Déclencheurs :
//  'start' | 'floor:N' (1re arrivée) | 'boss:N' (avant le boss) | 'kill:ID' (boss scénarisé vaincu)
//  'defeat:chef_doeuvre' | 'ascension:1' | 'seuil'

export interface Speaker { name: string; sprite?: string; color: string }
export const SPEAKERS: Record<string, Speaker> = {
  narrateur: { name: '', color: '#cbbfe8' },
  elian: { name: 'Maître Elian', sprite: 'portraits/elian', color: '#e9d8a6' },
  kaelen: { name: 'Kaelen', sprite: 'portraits/kaelen', color: '#ffb07a' },
  lysandra: { name: 'Lysandra', sprite: 'portraits/lysandra', color: '#9ec5ff' },
  alaric: { name: 'Maître Alaric', sprite: 'portraits/alaric', color: '#9be3a6' },
  gaston: { name: 'Gaston', sprite: 'portraits/gaston', color: '#ffd38a' },
  chasseuse: { name: 'La Chasseuse', sprite: 'portraits/chasseuse', color: '#d6a36b' },
  silas: { name: 'Silas', sprite: 'portraits/silas', color: '#c7a6ff' },
  larry: { name: 'Larry', sprite: 'portraits/larry', color: '#ff6fae' },
};

export interface Line { who: keyof typeof SPEAKERS; text: string }
export interface Scene { id: string; title?: string; lines: Line[] }

export const SCENES: Scene[] = [
  { id: 'start', title: 'Acte I — L’Éveil', lines: [
    { who: 'narrateur', text: 'Le Hameau d’Aubier a oublié le goût de la tranquillité. Dans la forêt, les bêtes ont les yeux violets.' },
    { who: 'elian', text: 'Te voilà enfin. Je ne sais pas ce qui rend la forêt folle… mais toi, tu pourrais le découvrir.' },
    { who: 'elian', text: 'Choisis ta voie. Et frappe : chaque coup compte.' },
  ] },
  { id: 'floor:5', lines: [
    { who: 'elian', text: 'Tu sens cette vibration quand tu frappes ? Les anciens appelaient ça une Partition.' },
    { who: 'narrateur', text: 'Partition débloquée : Trille Foudroyant.' },
  ] },
  { id: 'boss:10', lines: [
    { who: 'narrateur', text: 'Des gobelins retiennent Kaelen, le forgeron. Ils tapotent ses outils… comme on accorde un instrument.' },
  ] },
  { id: 'kill:chef_gobelin', lines: [
    { who: 'kaelen', text: 'Merci ! Ce manège a commencé quand j’ai trouvé un minerai étrange dans la vieille mine. Il… chante.' },
    { who: 'kaelen', text: 'Si tu y descends, compte sur mon marteau.' },
  ] },
  { id: 'boss:20', lines: [
    { who: 'narrateur', text: 'La Mine Murmurante. La pierre elle-même gémit. Au fond, un Gardien ancestral, entièrement corrompu.' },
  ] },
  { id: 'kill:golem_mine', lines: [
    { who: 'narrateur', text: 'Le Golem s’effondre et révèle son cœur : un cristal pur, un Fragment d’Écho.' },
    { who: 'narrateur', text: 'À son contact, une vision : une étoile qui se brise dans un silence absolu.' },
  ] },
  { id: 'floor:21', lines: [
    { who: 'lysandra', text: 'Tu as libéré un Fragment d’Écho. Je l’ai senti depuis l’autre bout de la vallée.' },
    { who: 'lysandra', text: 'Le monde est une symphonie. La Dissonance est sa Fracture. Et toi, tu l’entends.' },
  ] },
  { id: 'kill:gardien_sanctuaire', lines: [
    { who: 'larry', text: '*applaudissements lents* Fascinant. Un nouveau jouet qui apprend vite. Mais si fragile.' },
    { who: 'larry', text: 'Continue de les rassembler pour moi, veux-tu ? Ça rend les choses tellement plus… intéressantes.' },
    { who: 'narrateur', text: 'La Dissonance n’est pas un accident. C’est un jeu. Et vous en êtes le pion.' },
  ] },
  { id: 'floor:26', title: 'Acte II — Le Jouet', lines: [
    { who: 'narrateur', text: 'Pont-la-Croisée. Une cité qui bouillonne de vie… et de rumeurs sur un homme au sourire carnassier.' },
    { who: 'gaston', text: 'Toi ! Tu as la tête de quelqu’un qui va se battre. On ne se bat pas le ventre vide !' },
  ] },
  { id: 'floor:35', lines: [
    { who: 'chasseuse', text: 'Les bêtes de Larry ne sont pas corrompues. Elles sont « améliorées ». Je ne respecte que la force. Montre-moi.' },
  ] },
  { id: 'kill:hydre', lines: [
    { who: 'alaric', text: 'Tu m’as tiré du marais juste à temps. J’étudiais la corruption… elle a failli m’étudier, moi.' },
  ] },
  { id: 'floor:45', lines: [
    { who: 'silas', text: 'Larry était mon élève. Il ne veut pas réparer le monde. Il veut peindre par-dessus, avec les couleurs du chaos.' },
  ] },
  { id: 'boss:50', lines: [
    { who: 'larry', text: 'Ah, mon petit jouet. Tu as bien grandi.' },
    { who: 'larry', text: 'Tu joues encore la vieille mélodie. C’est ennuyeux. Laisse-moi t’apprendre un nouveau rythme.' },
  ] },
  { id: 'defeat:chef_doeuvre', title: 'La défaite', lines: [
    { who: 'narrateur', text: 'Larry disparaît dans un éclat de rire. Son chef-d’œuvre de chair et de cristal vous laisse pour mort.' },
    { who: 'lysandra', text: 'Tant que tu resteras dans les limites de cette vie, tu ne seras qu’un jouet pour lui.' },
    { who: 'lysandra', text: 'Tu dois te briser entièrement pour te reforger dans une flamme plus vive. L’heure de l’Ascension est venue.' },
  ] },
  { id: 'ascension:1', title: 'Acte III — Renaissance', lines: [
    { who: 'narrateur', text: 'Dissolution. Le vide. Puis une nouvelle étincelle. Faible… mais pas vide.' },
    { who: 'lysandra', text: 'Ta légende est désormais gravée dans le firmament. Apprends à y lire : les Constellations sont tiennes.' },
  ] },
  { id: 'floor:51', lines: [
    { who: 'lysandra', text: 'Il sait. Larry a senti ta renaissance… et il n’aime pas la concurrence.' },
  ] },
  { id: 'boss:75', lines: [
    { who: 'narrateur', text: 'Une construction de cristal noir et de silence se dresse aux portes d’Aubier : le Juge Dissonant.' },
  ] },
  { id: 'kill:juge', lines: [
    { who: 'narrateur', text: 'Le Juge se brise en un million d’éclats silencieux. Parmi les débris, un cristal noir pulse. Une clé.' },
  ] },
  { id: 'floor:76', title: 'Acte IV — La Grande Brèche', lines: [
    { who: 'lysandra', text: 'Une cicatrice sur le monde, figée dans la glace. Une Grande Brèche, datant de la Fracture elle-même.' },
  ] },
  { id: 'kill:gardien_seuil', lines: [
    { who: 'narrateur', text: 'Un Grand Fragment d’Écho. La vision est totale : l’Harmonie bannit son frère, l’Écho Oublié, dans le silence éternel.' },
    { who: 'lysandra', text: 'Larry ne veut pas contrôler la Dissonance. Il veut libérer son créateur.' },
  ] },
  { id: 'floor:101', title: 'Acte V — Les Seuils', lines: [
    { who: 'lysandra', text: 'Plus bas, la réalité refuse de te laisser passer. Pour franchir les Seuils, ta légende doit peser plus lourd.' },
  ] },
  { id: 'boss:180', lines: [
    { who: 'narrateur', text: 'Une statue de lumière et de musique, haute comme une montagne. « Nul ne passe. »' },
  ] },
  { id: 'seuil', lines: [
    { who: 'lysandra', text: 'Pour vaincre une idée, il faut en devenir une plus forte. Renais encore, jusqu’à ce que ta légende plie la réalité.' },
  ] },
  { id: 'floor:181', title: 'Acte VI — Le Chef-d’œuvre', lines: [
    { who: 'narrateur', text: 'Le Gardien s’incline. Au-delà, des paysages impossibles, peuplés d’ébauches de créatures.' },
  ] },
  { id: 'kill:dragon', lines: [
    { who: 'larry', text: 'Pile à l’heure. Je n’aurais pas voulu commencer le concert sans mon premier spectateur. Après vous.' },
  ] },
  { id: 'floor:251', title: 'Acte VII — Le Noyau du Silence', lines: [
    { who: 'larry', text: 'Bienvenue dans la salle de montage. Ici, le script n’existe pas encore. Et c’est moi qui tiens la plume.' },
  ] },
  { id: 'floor:255', title: 'Les Ancres', lines: [
    { who: 'lysandra', text: 'Larry s’est enfermé dans le Noyau. Pour y entrer, frapper ne suffira pas : tu dois devenir la clé.' },
    { who: 'lysandra', text: 'Il te faut trois Ancres. La Création, le Chaos, la Destinée. Ton Fief, la Chasseuse et les étoiles t’y aideront.' },
  ] },
  { id: 'noyau', lines: [
    { who: 'larry', text: '*toc toc* Qui est là ? Ah, c’est toi. Non. C’est fermé. Reviens quand tu seras… autre chose.' },
    { who: 'lysandra', text: 'La Porte est scellée de l’intérieur. Réunis les trois Ancres (onglet Ascension) : l’Ascension Finale fera de toi la clé.' },
  ] },
  { id: 'ancre:creation', lines: [
    { who: 'narrateur', text: 'La Graine-Cœur éclôt. Pas d’arbre : une vague de pure vitalité, qui s’ancre en vous. Ancre de la Création.' },
  ] },
  { id: 'ancre:chaos', lines: [
    { who: 'chasseuse', text: 'Les trois Bêtes Primordiales. Toutes. Bon. Je crois que je te respecte, maintenant.' },
    { who: 'narrateur', text: 'Leur fureur indomptable s’ancre en vous. Ancre du Chaos.' },
  ] },
  { id: 'ancre:destinee', lines: [
    { who: 'silas', text: 'Le Compas Stellaire est complet. Il ne montre pas le nord : il montre ce que tu pourrais devenir. Ancre de la Destinée.' },
  ] },
  { id: 'resonance:1', title: 'Acte VIII — L’Ascension Finale', lines: [
    { who: 'narrateur', text: 'Pas d’explosion de lumière, pas de dissolution. Juste un sentiment de plénitude.' },
    { who: 'lysandra', text: 'Tu n’es plus un héros, ni même une légende. Tu es une certitude. Les Fragments d’Écho résonnent en toi : écoute la Symphonie.' },
  ] },
  { id: 'floor:301', title: 'Acte IX — Le Miroir', lines: [
    { who: 'larry', text: 'Reprenons depuis le début, tu ne crois pas ? Mais cette fois, c’est moi qui écris le scénario.' },
  ] },
  { id: 'boss:350', lines: [
    { who: 'narrateur', text: 'Le Lieutenant. Vous l’avez déjà vaincu. Mais cette fois, il se démultiplie.' },
  ] },
  { id: 'boss:400', lines: [
    { who: 'larry', text: 'Assez joué. Tu n’es pas un simple jouet. Tu es une erreur. Une fausse note dans ma symphonie.' },
    { who: 'larry', text: 'Il est temps de t’effacer.' },
  ] },
  { id: 'kill:larry', title: 'Le Final', lines: [
    { who: 'larry', text: '*un filet de sang noir* Le public a adoré… mais chaque pièce doit avoir un final grandiose.' },
    { who: 'larry', text: 'Si je ne peux pas réécrire la chanson… ALORS IL N’Y AURA PLUS DE MUSIQUE !' },
    { who: 'narrateur', text: 'La prison de l’Écho Oublié se fissure, puis explose dans une vague de silence absolu.' },
  ] },
  { id: 'floor:401', title: 'Acte X — Le Silence', lines: [
    { who: 'narrateur', text: 'Les étoiles ne meurent pas : elles s’effacent, comme une aquarelle sous la pluie. La réalité se dissout.' },
    { who: 'lysandra', text: '…chante pour lui… Tes Fragments d’Écho sont une mélodie. Raconte-lui ton histoire.' },
    { who: 'narrateur', text: '(Touchez « Chanter » en haut de l’écran de combat quand vous serez prêt.)' },
  ] },
  { id: 'echo:victoire', title: 'Le Chant', lines: [
    { who: 'narrateur', text: 'Lentement, la tempête de néant se calme. L’Écho, qui n’avait connu que la solitude, se souvient. Il se souvient de la beauté du bruit.' },
    { who: 'narrateur', text: 'Apaisé, il flotte devant vous : une entité de pur potentiel, aussi dangereuse qu’innocente. Le choix vous revient.' },
  ] },
  { id: 'epilogue', title: 'Épilogue — Le Gardien Éternel', lines: [
    { who: 'narrateur', text: 'Quel que fût votre choix, la musique revint dans le cosmos. La Dissonance s’apaisa, les Brèches se stabilisèrent.' },
    { who: 'lysandra', text: 'Ta quête est terminée. Ta garde, elle, ne fait que commencer. Le Silence s’étend encore, étage après étage.' },
    { who: 'narrateur', text: 'Votre voie peut changer à chaque Résonance. Le jeu continue, car la garde d’un Gardien est éternelle.' },
  ] },
];

export const SCENE_BY_ID = Object.fromEntries(SCENES.map(s => [s.id, s]));

export const LARRY_QUIPS = [
  'Joli coup. Pour un insecte.',
  'Tu tapes en rythme ? Non ? Dommage.',
  'Je parie trois royaumes que tu ne passes pas le prochain boss.',
  'Continue, continue. J’adore regarder.',
  'Ton Kaelen martèle comme un métronome cassé.',
  'Tu sais ce qui est plus beau qu’une symphonie ? Une symphonie qui s’effondre.',
  'Encore toi ? Tu ne te lasses jamais ?',
  'Ah, la persévérance. Le talent de ceux qui n’en ont pas.',
  'Chaque monstre que tu tues, je le refais. En mieux.',
  'Psst. Ton héros a une tache sur sa cape.',
  'Lysandra t’a dit que j’étais méchant ? Elle exagère. Un peu.',
  'Je compte tes coups. 1 042… 1 043… ennuyeux.',
  'Le monde est une toile. Toi, tu es… une rature.',
  'Et si tu essayais de perdre, pour changer ?',
  'Ta légende ? J’en ai lu des meilleures sur des étiquettes de potion.',
];

export const LARRY_ON = {
  bossFail: ['Oh ! Si près. Enfin… non, pas vraiment.', 'Le temps file, petit jouet. Comme toi.', 'Rejoue. J’ai des pop-corn.'],
  golden: ['Il était à moi, ce gobelin.', 'Tu voles mes jouets dorés ? Charmant.'],
  goldenEscape: ['Hahaha ! Trop lent.', 'Il est parti avec ton or. Et ma bénédiction.'],
  ascension: ['Tu t’effaces et tu reviens. Comme une tache tenace.', 'Renais autant que tu veux. Je serai là.'],
};

export const KILL_LINES = [
  '{m} s’effondre.', 'Vous terrassez {m}.', '{m} se disloque dans un accord grinçant.', 'Un dernier cri, et {m} se tait.',
  '{m} retourne au silence.', '{m} vacille… puis tombe.',
];
export const BOSS_LINES = [
  '{m} est vaincu ! La Dissonance recule.', '{m} s’écroule dans un fracas de cristal.', 'Victoire sur {m} !',
];

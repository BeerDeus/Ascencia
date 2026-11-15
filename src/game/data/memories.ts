// Souvenirs des alliés : débloqués aux niveaux d’Affinité 2, 5 et 10 (un court récit chacun).
export const MEMORY_LEVELS = [2, 5, 10];
export const MEMORIES: string[][] = [
  // Garde d’Aubier
  ['« Avant toi, je montais la garde pour la forme. Les loups, on les entendait. On n’en parlait pas. »',
   '« Ma fille dessine ton épée sur les murs de la grange. Je n’ai pas eu le cœur de l’effacer. »',
   '« Le jour où Aubier tombera, ce sera par-dessus mon corps. Mais avec toi devant… ce jour n’existe pas. »'],
  // Maître Elian
  ['« Quand j’étais enfant, la forêt fredonnait. On ne s’en rendait compte qu’en l’entendant se taire. »',
   '« J’ai vu passer trois générations de héros. Tu es le premier à revenir plus fort de chaque chute. »',
   '« Si je n’entends plus la forêt avant de mourir, ce n’est pas grave. Toi, tu l’entendras. »'],
  // Kaelen
  ['« Les gobelins ne m’ont pas torturé. Ils écoutaient mon marteau. Comme si chaque coup leur rendait quelque chose. »',
   '« Ce minerai chante, je te dis. Je l’ai fondu, et il s’est mis à pleurer. J’ai gardé un éclat. »',
   '« Je t’ai forgé une lame qui n’existe pas encore. Elle t’attendra dans la prochaine vie. »'],
  // Arbalétrière
  ['« À Pont-la-Croisée, on vise la tête. Ici, je vise la fausse note. C’est plus petit, et ça bouge plus. »',
   '« J’ai raté un tir une fois. Une seule. L’homme que j’aurais dû sauver jouait du luth. »',
   '« Mes carreaux portent ton nom gravé. Pas pour la chance. Pour qu’ils sachent qui les envoie. »'],
  // Lysandra
  ['« L’Ordre du Silence n’a pas fait vœu de se taire. Il a fait vœu d’écouter. »',
   '« Chaque fois que tu renais, j’entends ta note changer. Plus grave. Plus juste. »',
   '« S’il fallait choisir entre le monde et ta mélodie… ne me pose pas cette question. »'],
  // Maître Alaric
  ['« Cette fiole ? Un remède contre la Dissonance. Ou un poison. Le marais n’a pas encore tranché. »',
   '« J’étudiais la corruption. Elle m’a étudié en retour. Sans toi, je serais devenu une note dans son chœur. »',
   '« Ma meilleure potion n’a pas de nom. Elle est faite de tes retours au village. »'],
  // Gaston
  ['« On ne se bat pas le ventre vide ! Et on ne revient pas sans appétit, compris ? »',
   '« J’ai cuisiné pour des rois, une fois. Ils mangeaient moins bien que toi, et remerciaient moins. »',
   '« Ta table est réservée. Pour toujours. Même si tu reviens dans mille vies. »'],
  // La Chasseuse
  ['« Je ne respecte que la force. Toi, tu as la pire : celle qui revient. »',
   '« Les Bêtes Primordiales ont un nom. Je ne le prononce pas. Toi, tu pourras. »',
   '« Si un jour je tombe, tu porteras ma marque de chasse. Ce n’est pas un honneur. C’est une dette. »'],
  // Silas
  ['« Larry était mon élève. Le plus doué. Le plus seul. J’aurais dû écouter ce qu’il ne disait pas. »',
   '« Ma tour se tord sur elle-même parce que je l’ai laissée faire. La culpabilité, aussi, a une architecture. »',
   '« Quand tu le vaincras, ne le hais pas. Termine sa mélodie. C’est tout ce qu’il voulait. »'],
  // Lame errante
  ['« L’or d’abord, la gloire ensuite. Toi, tu paies en histoires. C’est moins lourd à porter. »',
   '« J’ai servi douze seigneurs. Aucun ne m’a demandé mon nom. Tu me l’as demandé deux fois. »',
   '« Garde ton or. Cette fois, je me bats pour la fin du morceau. »'],
  // Pyromancienne
  ['« Tout brûle, à la fin. Autant que ce soit dans le bon ordre. »',
   '« Le feu de la Dissonance est froid. Le mien chante. Écoute bien la différence. »',
   '« J’ai appris à ne brûler que ce qui doit l’être. C’est toi qui m’as appris la mesure. »'],
  // Archère elfe
  ['« Mon peuple entend la fausse note avant qu’elle ne sonne. Je la vise avant qu’elle n’existe. »',
   '« Les forêts elfiques se sont tues les premières. J’ai suivi le silence jusqu’à toi. »',
   '« Quand les arbres chanteront à nouveau, je rentrerai. Pas avant. Pas sans toi. »'],
  // Mini-golem
  ['« …grrm. » (Il pose une petite pierre lisse à vos pieds.)',
   '« …grrm grrm. » (Il a gravé votre silhouette sur son bras.)',
   '« …ami. » (Le premier mot qu’il prononce. Le seul qui compte.)'],
  // Automate
  ['« PROTOCOLE : PROTÉGER. CIBLE : TOI. RAISON : NON SPÉCIFIÉE. »',
   '« ERREUR : ATTACHEMENT DÉTECTÉ. CORRECTION : REFUSÉE. »',
   '« NOUVEAU PROTOCOLE : RESTER. DURÉE : INDÉFINIE. »'],
  // Djinn lié
  ['« Trois vœux ? Non. Trois coups. C’est plus honnête. »',
   '« Mon dernier maître voulait l’éternité. Il l’a eue, dans une bouteille. Toi, tu ne demandes rien. C’est suspect. »',
   '« Je ne suis plus lié par un sort. Je suis lié par toi. C’est pire, et c’est mieux. »'],
  // Griffon
  ['« Kreee ! » (Il vous offre la moitié d’un poisson. La bonne moitié.)',
   '« Krr… » (Il se couche contre vous pendant la nuit, ailes déployées contre le vent.)',
   '« KREEEE ! » (Il ne laisse plus personne vous approcher. Même Gaston, avec un plateau.)'],
  // Chevalier repenti
  ['« J’ai servi le chaos. Il m’appelait par un numéro. Toi, tu m’appelles chevalier. »',
   '« Je connais les pièges de Larry. Je les ai posés. Laisse-moi les défaire. »',
   '« Mon armure est noire de ce que j’ai fait. Mon épée sera blanche de ce que je ferai. »'],
  // Esprit glacial
  ['« Le froid aussi a sa musique. Lente. Patiente. Elle ne s’arrête jamais vraiment. »',
   '« Les Montagnes du Givre se souviennent de la Fracture. Je suis ce souvenir. »',
   '« Je fondrai un jour. Ce jour-là, je serai une rivière, et je passerai par Aubier. »'],
  // Profond renégat
  ['« Les abysses se souviennent. De tout. Même de ceux qui ont fui. »',
   '« En bas, on chante pour l’Écho Oublié. J’ai arrêté de chanter. Ils ne me l’ont pas pardonné. »',
   '« Si tu descends un jour dans les Profondeurs, je serai devant. Je connais le chemin. »'],
  // Talos reforgé
  ['« *grincement solennel* » (Il incline sa tête de bronze en signe de respect.)',
   '« *long grondement* » (Kaelen a remplacé son cœur. Il bat au rythme de son marteau.)',
   '« *carillon* » (Pour la première fois depuis des siècles, il chante.)'],
  // Harmoniste déchu
  ['« J’ai joué pour Larry. Chaque note était juste, et chaque note était fausse. »',
   '« Je rejoue enfin juste. Mes doigts tremblent encore. Ils apprennent. »',
   '« Quand tout sera fini, je composerai ta mélodie. Elle n’aura pas de fin. »'],
  // Chevalier éternel
  ['« Le temps ne me touche pas. Les gens, si. Toi, tu me touches. »',
   '« J’ai vu l’Harmonie bannir l’Écho. J’étais là. J’ai obéi. J’aurais dû hésiter. »',
   '« Mon éternité avait un but : garder. Elle en a un nouveau : te suivre. »'],
  // Archange errant
  ['« Nul ne passe… sauf toi. Je n’ai jamais dit cela à personne. »',
   '« L’Harmonie m’a créé pour la certitude. Tu m’as appris le doute. C’est un plus beau cadeau. »',
   '« Quand on écrira cette histoire, je veux être la note qui te suit. »'],
  // Ouroboros
  ['« Tout recommence. Toi aussi. Moi aussi. C’est la seule promesse qui tienne. »',
   '« Je t’ai vu dans mille boucles. Dans chacune, tu choisis de te relever. »',
   '« Cette fois, la boucle se ferme sur une fin heureuse. Je m’en souviendrai. Toujours. »'],
];

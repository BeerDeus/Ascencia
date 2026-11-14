import type { ClassId, CompType } from '../types';

export interface Companion { name: string; title: string; sprite: string; type: CompType; quote: string }

// ~6x plus fort que le précédent, ~8x plus cher (cf. GDD §17)
export const COMPANIONS: Companion[] = [
  { name: "Garde d'Aubier", title: 'Milicien', sprite: 'portraits/garde', type: 'melee', quote: 'Personne ne touche au Hameau.' },
  { name: 'Maître Elian', title: 'Ancien du village', sprite: 'portraits/elian', type: 'magie', quote: 'La forêt chantait, autrefois.' },
  { name: 'Kaelen', title: 'Forgeron', sprite: 'portraits/kaelen', type: 'melee', quote: 'Ce minerai… il chante.' },
  { name: 'Arbalétrière', title: 'Garde de Pont-la-Croisée', sprite: 'portraits/archer', type: 'distance', quote: 'Un carreau, une note.' },
  { name: 'Lysandra', title: "Archiviste de l'Ordre du Silence", sprite: 'portraits/lysandra', type: 'magie', quote: 'Le monde est une symphonie.' },
  { name: 'Maître Alaric', title: 'Alchimiste', sprite: 'portraits/alaric', type: 'magie', quote: 'Ne touche pas à cette fiole.' },
  { name: 'Gaston', title: "Chef de l'auberge", sprite: 'portraits/gaston', type: 'melee', quote: 'On ne se bat pas le ventre vide !' },
  { name: 'La Chasseuse', title: 'Maîtresse de la traque', sprite: 'portraits/chasseuse', type: 'distance', quote: 'Je ne respecte que la force.' },
  { name: 'Silas', title: "L'Enchanteur", sprite: 'portraits/silas', type: 'magie', quote: 'Larry était mon élève…' },
  { name: 'Lame errante', title: 'Mercenaire', sprite: 'portraits/guerrier', type: 'melee', quote: "L'or d'abord, la gloire ensuite." },
  { name: 'Pyromancienne', title: 'Mage de guerre', sprite: 'portraits/mage', type: 'magie', quote: 'Tout brûle, à la fin.' },
  { name: 'Archère elfe', title: 'Rôdeuse', sprite: 'mobs/archere_elfe', type: 'distance', quote: 'Je vise le cœur de la fausse note.' },
  { name: 'Mini-golem', title: 'Gardien apaisé', sprite: 'mobs/mini_golem_pierre', type: 'melee', quote: '…grrm.' },
  { name: 'Automate', title: 'Construct réparé', sprite: 'mobs/automate', type: 'melee', quote: 'PROTOCOLE : PROTÉGER.' },
  { name: 'Djinn lié', title: 'Esprit du désert', sprite: 'mobs/djinn', type: 'magie', quote: 'Trois vœux ? Non. Trois coups.' },
  { name: 'Griffon', title: 'Monture céleste', sprite: 'mobs/griffon', type: 'distance', quote: 'Kreee !' },
  { name: 'Chevalier repenti', title: 'Ancien serviteur de Larry', sprite: 'mobs/chevalier_sombre', type: 'melee', quote: "J'ai servi le chaos. Plus jamais." },
  { name: 'Esprit glacial', title: 'Écho des Montagnes', sprite: 'mobs/esprit_glacial', type: 'magie', quote: 'Le froid aussi a sa musique.' },
  { name: 'Profond renégat', title: 'Exilé des abysses', sprite: 'mobs/profond_guerrier', type: 'melee', quote: 'Les abysses se souviennent.' },
  { name: 'Talos reforgé', title: 'Colosse de bronze', sprite: 'mobs/talos_reforge', type: 'melee', quote: '*grincement solennel*' },
  { name: 'Harmoniste déchu', title: 'Musicien racheté', sprite: 'mobs/harmoniste_corrompu', type: 'magie', quote: 'Je rejoue enfin juste.' },
  { name: 'Chevalier éternel', title: 'Sentinelle sans âge', sprite: 'mobs/chevalier_eternel', type: 'melee', quote: 'Le temps ne me touche pas.' },
  { name: 'Archange errant', title: "Messager de l'Harmonie", sprite: 'mobs/archange', type: 'magie', quote: 'Nul ne passe… sauf toi.' },
  { name: 'Ouroboros', title: 'Le Cycle', sprite: 'mobs/ouroboros', type: 'magie', quote: 'Tout recommence. Toi aussi.' },
  { name: 'Le Collectionneur', title: 'Marchand de reliques', sprite: 'mobs/collectionneur', type: 'distance', quote: 'Tout a un prix. Même toi.' },
  { name: 'Dragonnet', title: 'Petit feu', sprite: 'bosses/dragonnet', type: 'magie', quote: '*crache une étincelle fière*' },
  { name: 'Géant des cimes', title: 'Titan des neiges', sprite: 'bosses/geant', type: 'melee', quote: 'PETIT. MAIS. FORT.' },
  { name: 'Liche repentie', title: 'Savant immortel', sprite: 'bosses/liche', type: 'magie', quote: "La mort m'ennuie." },
  { name: 'La Chimère', title: 'Créature apaisée', sprite: 'mobs/chimere', type: 'distance', quote: '*des larmes de saphir*' },
  { name: 'Forgeron Fantôme', title: 'Artisan libéré', sprite: 'mobs/forgeron_demon', type: 'melee', quote: 'Je forge à nouveau du son.' },
];

export const MILESTONES = [10, 25, 50, 75, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
export const MILESTONE_TITLES = ['Initié', 'Aguerri', 'Vétéran', 'Expert', 'Maître', 'Grand maître', 'Héroïque', 'Légendaire',
  'Mythique', 'Céleste', 'Astral', 'Divin', 'Éternel', 'Primordial', 'Absolu'];

export interface ClassDef { id: ClassId; name: string; icon: string; portrait: string; style: string; perks: string[] }
export const CLASSES: ClassDef[] = [
  { id: 'guerrier', name: 'Guerrier', icon: 'classes/guerrier', portrait: 'portraits/guerrier', style: 'Actif · Frappe',
    perks: ['Frappe ×2', 'Ferveur ×1,5 plus rapide', 'Rage : tous les 100 coups, un coup lourd ×40'] },
  { id: 'archer', name: 'Archer', icon: 'classes/archer', portrait: 'portraits/archer', style: 'Critique · Idle',
    perks: ['+8 % chance de critique', 'Tirs automatiques (1/s, +1 tous les 150 niveaux)', 'Dégâts critiques ×1,3'] },
  { id: 'mage', name: 'Mage', icon: 'classes/mage', portrait: 'portraits/mage', style: 'Burst · Partitions',
    perks: ['Mana max +50, régénération ×2', 'Effets des Partitions +50 %', 'Trille Foudroyant ×2'] },
];

export interface PartitionDef { id: string; name: string; icon: string; unlock: number; mana: number; cd: number; duration: number; desc: string }
export const PARTITIONS: PartitionDef[] = [
  { id: 'trille', name: 'Trille Foudroyant', icon: 'partitions/trille_foudroyant', unlock: 5, mana: 20, cd: 30, duration: 0,
    desc: 'Inflige instantanément 10 s de dégâts.' },
  { id: 'staccato', name: 'Staccato Vif', icon: 'partitions/staccato_vif', unlock: 15, mana: 35, cd: 120, duration: 30,
    desc: '+10 frappes automatiques par seconde.' },
  { id: 'crescendo', name: 'Crescendo de Fureur', icon: 'partitions/crescendo_de_fureur', unlock: 30, mana: 45, cd: 180, duration: 30,
    desc: 'Frappe ×3.' },
  { id: 'cantique', name: 'Cantique de Soin', icon: 'partitions/cantique_de_soin', unlock: 40, mana: 40, cd: 180, duration: 10,
    desc: '+50 % de Volonté et immunité aux attaques de boss.' },
  { id: 'accord', name: 'Accord Parfait', icon: 'partitions/accord_parfait', unlock: 60, mana: 80, cd: 600, duration: 30,
    desc: 'Tous les dégâts ×5.' },
];

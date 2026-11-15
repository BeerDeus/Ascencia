import type { Slot, StatId } from './data/items';
import type { Daily } from './fief';
import type { ShopState } from './shop';
import type { Anchors, Resonance } from './resonance';
import type { Garden } from './garden';
import type { Expedition } from './expeditions';
import type { JobId } from './data/resources';

export type ClassId = 'guerrier' | 'archer' | 'mage';
export type CompType = 'melee' | 'distance' | 'magie';
export type MonsterKind = 'mob' | 'boss' | 'golden';

export interface Monster {
  sprite: string;       // ex. 'mobs/rat'
  name: string;
  kind: MonsterKind;
  hp: number;
  maxHp: number;
  story?: string;       // id de boss scénarisé
  fleeAt?: number;      // temps de jeu où le monstre doré s'enfuit
  hunt?: string;        // chasse primordiale en cours
  tint?: string;        // filtre CSS (variantes de sprite)
  locked?: boolean;     // invulnérable (Porte du Noyau avant la Résonance)
}

export interface Item {
  id: number;
  slot: Slot;
  base: string;          // sprite
  name: string;
  rarity: number;        // 0..5
  ilvl: number;
  plus: number;          // améliorations de Forge
  affixes: { stat: StatId; v: number; r?: number }[];
  set?: string;          // pièce de panoplie
  bound?: boolean;       // lié au compte : revient à chaque vie et suit l'étage
  minFloor?: number;     // record d'étage requis pour le porter
  cap?: number;          // étage au-delà duquel l'objet lié ne progresse plus
  locked?: boolean;      // verrouillé par le joueur : jamais recyclé
}

export interface RunState {
  floor: number;
  wave: number;           // 0..9 = monstres, 10 = boss
  maxFloor: number;
  gold: number;
  heroLevel: number;
  companions: number[];   // niveau par compagnon
  mana: number;
  farming: boolean;       // bloqué avant le boss
  monster: Monster;
  bossTime: number;       // Volonté restante (s)
  bossAttackIn: number;   // s avant prochaine attaque spéciale
  parryUntil: number;     // fenêtre de parade (temps de jeu)
  ferveur: number;
  lastTapAt: number;
  crescendoUntil: number;
  cooldowns: number[];    // fin de recharge par Partition (temps de jeu)
  activeUntil: number[];  // fin d'effet par Partition
  tapsTotal: number;
  scriptedDefeat: boolean;
  huntBack?: { floor: number; wave: number; farming: boolean } | null;
  lastRecord?: number;     // dernier record de la vie (détection de stagnation)
  lastRecordAt?: number;
  inventory: Item[];
  equipped: Partial<Record<Slot, number>>;
}

export interface Settings {
  sound: boolean;
  haptics: boolean;
  notation: 'lettres' | 'scientifique';
  autoAdvance: boolean;
  notifications: boolean;
}

export interface GameState {
  version: number;
  time: number;            // temps de jeu cumulé (s)
  lastSave: number;        // Date.now()
  classId: ClassId | null;
  run: RunState;
  eclats: number;          // monnaie dépensable
  legende: number;         // Éclats gagnés depuis toujours
  ascensions: number;
  ascensionUnlocked: boolean;
  bestFloor: number;
  mastery: Record<ClassId, number>;
  constellations: Record<string, number>;
  seenStory: string[];
  chronicle: ChronicleEntry[];
  settings: Settings;
  stats: { kills: number; bossKills: number; taps: number; goldEarned: number; playSeconds: number; goldenKills: number;
    partitions: number; items: number; bestRarity: number; bounties: number; meals: number; letters: number; parries: number;
    harvests: number; mutations: number; brewed: number; drunk: number; expeditions: number; orders: number; pieces: number;
    gathered: number; calendar: number; hunts: number };
  ending: { done: boolean; path: 'sceller' | 'lier' | null; attempts: number };
  achievements: Record<string, 1>;   // hauts faits encaissés
  achSeen: string[];                  // hauts faits déjà annoncés
  nextLarryAt: number;
  metal: number;
  itemSeq: number;
  heritage: number | null;   // id de l'objet conservé à l'Ascension
  arcanes: Record<string, number>;
  daily: Daily;
  meal: { id: string; until: number } | null;
  gems: number;
  shop: ShopState;
  messenger: { until: number } | null;   // Messager de Lysandra à l'écran (temps de jeu)
  nextMessengerAt: number;
  anchors: Anchors;
  resonance: Resonance;
  jobs: Partial<Record<JobId, number>>;   // XP par métier
  res: Record<string, number>;            // Coffre de ressources
  garden: Garden;
  potions: Record<string, number>;
  buffs: Record<string, number>;          // potions actives (fin, horodatage réel)
  expeditions: Expedition[];
  forge: { sets: Record<string, string[]> };
  vault: Item[];          // équipements liés au compte (packs)
  tuto: string[];         // étapes du tutoriel terminées
  quests?: import('./quests').Quests; // quêtes de Lysandra
  talents?: Record<number, ('a' | 'b')[]>; // talents choisis par allié (définitifs)
  bestiary?: Record<string, number>;      // victoires par monstre
}

export type ChronicleKind = 'loot' | 'kill' | 'boss' | 'crit' | 'gold' | 'story' | 'larry' | 'info' | 'fail' | 'up';
export interface ChronicleEntry { id: number; kind: ChronicleKind; text: string }

export type GameEvent =
  | { type: 'hit'; amount: number; crit: boolean; tap: boolean; auto?: boolean }
  | { type: 'kill'; monster: Monster; gold: number }
  | { type: 'floor'; floor: number; skipped: number }
  | { type: 'boss-attack' }
  | { type: 'parry' }
  | { type: 'boss-fail' }
  | { type: 'crescendo' }
  | { type: 'partition'; index: number }
  | { type: 'milestone'; comp: number; level: number }
  | { type: 'golden-escape' }
  | { type: 'story'; id: string }
  | { type: 'heavy' }
  | { type: 'loot'; item: Item }
  | { type: 'messenger' }
  | { type: 'auto-ascend'; gain: number }
  | { type: 'hunt'; id: string; won: boolean };

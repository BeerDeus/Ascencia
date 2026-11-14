import { RESOURCES } from './data/resources';
import { PLANT_BY_ID, plantSprite } from './data/garden';
/** Nom et sprite d'une ressource du Coffre (ressources de récolte ou plantes du Jardin). */
export function resInfo(id: string): { name: string; sprite: string } {
  const p = PLANT_BY_ID[id];
  if (p) return { name: p.name, sprite: plantSprite(id, 3) };
  return RESOURCES[id] ?? { name: id.replace(/_/g, ' '), sprite: 'res/fragment' };
}

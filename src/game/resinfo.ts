import { RESOURCES } from './data/resources';
import { PLANT_BY_ID, plantSprite } from './data/garden';
/** Nom et sprite d'une ressource du Coffre (ressources de récolte ou plantes du Jardin). */
export function resInfo(id: string): { name: string; sprite: string } {
  const p = PLANT_BY_ID[id];
  if (p) return { name: p.name, sprite: plantSprite(id, 3) };
  return RESOURCES[id] ?? { name: id.replace(/_/g, ' '), sprite: 'res/fragment' };
}

import { FAMILY_DROPS, DEFAULT_DROP, STORY_RARES } from './data/resources';
import { STORY_BOSSES } from './data/world';
import { ZONES } from './data/expeditions';
import { POTIONS, MEALS } from './data/crafting';
import { SETS, TIER_MATS, SLOT_RECIPE } from './data/forge';
import { SLOTS } from './data/items';

const KIND_LABEL = { monstre: 'Ressource de monstre', plante: 'Plante', recolte: 'Récolte d’expédition', rare: 'Ressource rare' } as const;
export function resKind(id: string): string {
  if (PLANT_BY_ID[id]) return `Plante du Jardin · rang ${PLANT_BY_ID[id].tier}`;
  return KIND_LABEL[RESOURCES[id]?.kind ?? 'monstre'];
}

/** D'où vient une ressource. */
export function resSources(id: string): string[] {
  const out: string[] = [];
  const p = PLANT_BY_ID[id];
  if (p) out.push(p.tier === 1 ? 'Jardin : graine commune, s’achète au Jardin' : 'Jardin : naît d’une mutation entre deux plantes voisines');
  const fam = FAMILY_DROPS.filter(([, r]) => r === id).flatMap(([re]) => re.source.split('|').map(w => w.replace(/_$/, '').replace(/_/g, ' ')));
  if (fam.length) out.push(`Monstres (Chasseur) : ${[...new Set(fam)].join(', ')}`);
  if (id === DEFAULT_DROP) out.push('Monstres sans famille particulière (Chasseur)');
  for (const [boss, r] of Object.entries(STORY_RARES)) if (r === id) out.push(`Boss : ${STORY_BOSSES.find(b => b.id === boss)?.name ?? boss}`);
  for (const z of ZONES) if (z.perHour[id]) out.push(`Expédition : ${z.name} (étage ${z.floor})`);
  if (id === 'chitine') out.push('Jardin : chasser un nuisible');
  if (id === 'essence_dissonante') out.push('Jardin : récolter une plante dissonante');
  return out.length ? out : ['Rare : gardez l’œil ouvert…'];
}

/** À quoi sert une ressource. */
export function resUses(id: string): string[] {
  const out: string[] = [];
  for (const r of POTIONS) if (r.cost[id]) out.push(`Potion : ${r.name} (×${r.cost[id]})`);
  for (const m of MEALS) if (m.cost[id]) out.push(`Repas : ${m.name} (×${m.cost[id]})`);
  for (const d of SETS) if (d.cost[id]) out.push(`Panoplie : ${d.name} (×${d.cost[id]})`);
  // commandes à la Forge : matériau d'expédition (tous paliers) ou de monstre (un palier)
  const slotsExp = SLOTS.filter(x => SLOT_RECIPE[x.id].exp === id).map(x => x.name);
  if (slotsExp.length) out.push(`Forge : ${slotsExp.join(', ')}`);
  for (const t of TIER_MATS) {
    const sl = SLOTS.filter(x => t.mats[SLOT_RECIPE[x.id].mob] === id).map(x => x.name);
    if (sl.length) out.push(`Forge (dès l’étage ${t.from}) : ${sl.join(', ')}`);
  }
  return out;
}

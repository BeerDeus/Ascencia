import { state, setState } from './state.js';
import { derive } from './game/player.js';
import { spendPoint, canSpend, nodeStatus, debugAddPoints } from './game/ascension.js';
import { ALL_NODES } from './data/constellations.js';

console.log('trunk_uncommon status:', nodeStatus(ALL_NODES.find(n=>n.id==='trunk_uncommon')));
debugAddPoints(50);
console.log('points:', state.constellations.points);

const before = derive(state.player);
console.log('BEFORE attaque/defense/maxHp:', before.attaque, before.defense, before.maxHp);

console.log('spend trunk_uncommon:', spendPoint('trunk_uncommon'));
const h1 = ALL_NODES.find(n => n.id === 'harmonie_01');
console.log('harmonie_01:', JSON.stringify(h1));
console.log('canSpend harmonie_01:', canSpend('harmonie_01'));
console.log('spend harmonie_01:', spendPoint('harmonie_01'));

const after = derive(state.player);
console.log('AFTER attaque/defense/maxHp:', after.attaque, after.defense, after.maxHp);
console.log('spent:', JSON.stringify(state.constellations.spent));

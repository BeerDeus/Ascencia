globalThis.localStorage = { getItem: () => null, setItem: () => {} };
globalThis.window = { addEventListener: () => {} };
const m = await import('./js/game/items.js');
console.log('forge recipes:', m.RECIPES.forge.length);
console.log('cuisine recipes:', m.RECIPES.cuisine.length);
console.log('sample forge[0]:', JSON.stringify(m.RECIPES.forge[0]));
console.log('maxCraftable:', typeof m.maxCraftable);
console.log('useConsumable:', typeof m.useConsumable);
console.log('infusion in ITEMS:', !!m.ITEMS.infusion_tonique);

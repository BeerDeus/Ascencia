// Horloge murale injectable (le simulateur d'équilibrage avance le temps lui-même).
let source: () => number = () => Date.now();
export const now = () => source();
export function setClock(fn: () => number) { source = fn; }

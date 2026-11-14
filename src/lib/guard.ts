// Protège une fenêtre contre les frappes « en rafale » : elle ignore les touches pendant `ms` après son apparition.
export function guard(node: HTMLElement, ms = 600) {
  node.style.pointerEvents = 'none';
  const t = setTimeout(() => { node.style.pointerEvents = ''; }, ms);
  return { destroy() { clearTimeout(t); } };
}

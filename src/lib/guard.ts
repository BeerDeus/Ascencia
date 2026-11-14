// Protège une fenêtre contre les frappes « en rafale » : elle ignore les touches pendant `ms` après son apparition.
export function guard(node: HTMLElement, ms = 600) {
  node.style.pointerEvents = 'none';
  const t = setTimeout(() => { node.style.pointerEvents = ''; }, ms);
  return { destroy() { clearTimeout(t); } };
}

/** Appui long (≈ 0,45 s) : appelle `cb` et neutralise le clic qui suit. */
export function longpress(node: HTMLElement, cb: () => void) {
  let t: ReturnType<typeof setTimeout> | undefined, fired = false, x = 0, y = 0;
  const clear = () => { clearTimeout(t); t = undefined; };
  const down = (e: PointerEvent) => { fired = false; x = e.clientX; y = e.clientY; clear(); t = setTimeout(() => { fired = true; t = undefined; cb(); }, 450); };
  const move = (e: PointerEvent) => { if (t && Math.hypot(e.clientX - x, e.clientY - y) > 12) clear(); };
  const click = (e: MouseEvent) => { if (fired) { e.stopImmediatePropagation(); e.preventDefault(); fired = false; } };
  node.addEventListener('pointerdown', down);
  node.addEventListener('pointermove', move);
  for (const ev of ['pointerup', 'pointerleave', 'pointercancel'] as const) node.addEventListener(ev, clear);
  node.addEventListener('click', click, true);
  return { update(next: () => void) { cb = next; }, destroy() { clear(); node.removeEventListener('pointerdown', down); node.removeEventListener('pointermove', move);
    for (const ev of ['pointerup', 'pointerleave', 'pointercancel'] as const) node.removeEventListener(ev, clear); node.removeEventListener('click', click, true); } };
}

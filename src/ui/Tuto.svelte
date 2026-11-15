<script lang="ts">
  import { onMount } from 'svelte';
  import { tuto, tutoTick, acknowledge } from '../lib/tuto.svelte';
  import { gfx } from '../lib/gfx';

  let rect = $state<{ x: number; y: number; w: number; h: number } | null>(null);
  let vw = $state(360), vh = $state(640);

  onMount(() => {
    let raf = 0, lastTick = 0;
    const loop = (t: number) => {
      if (t - lastTick > 250) { lastTick = t; tutoTick(); }
      const el = tuto.target ? document.querySelector<HTMLElement>(`[data-tuto="${tuto.target}"]`) : null;
      if (el) {
        const r = el.getBoundingClientRect();
        rect = r.width && r.height ? { x: r.left, y: r.top, w: r.width, h: r.height } : null;
      } else rect = null;
      vw = innerWidth; vh = innerHeight;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  });

  const W = $derived(Math.min(300, vw - 24));
  const pos = $derived.by(() => {
    if (!rect) return null;
    const cx = rect.x + rect.w / 2;
    const left = Math.max(12, Math.min(vw - W - 12, cx - W / 2));
    const below = rect.y + rect.h / 2 < vh / 2;
    return { left, below, arrow: Math.max(14, Math.min(W - 14, cx - left)),
      top: below ? rect.y + rect.h + 12 : undefined, bottom: below ? undefined : vh - rect.y + 12 };
  });
</script>

{#if tuto.target && rect && pos}
  <div class="ring" style="left:{rect.x - 4}px; top:{rect.y - 4}px; width:{rect.w + 8}px; height:{rect.h + 8}px"></div>
  {#key tuto.text}
    <div class="bubble" class:below={pos.below} style="left:{pos.left}px; width:{W}px; {pos.below ? `top:${pos.top}px` : `bottom:${pos.bottom}px`}; --ax:{pos.arrow}px">
      <img src={gfx('portraits/lysandra')} alt="" />
      <div class="txt">
        <p class="book">{tuto.text}</p>
        {#if tuto.ok}<button class="btn" onclick={acknowledge}>Compris</button>{/if}
      </div>
    </div>
  {/key}
{:else if tuto.target && tuto.ok && !tuto.target.startsWith('nav-')}
  <!-- élément introuvable : bulle centrée, pour pouvoir quand même la fermer -->
  <div class="bubble center" style="left:{(vw - W) / 2}px; width:{W}px; bottom:96px">
    <img src={gfx('portraits/lysandra')} alt="" />
    <div class="txt">
      <p class="book">{tuto.text}</p>
      <button class="btn" onclick={acknowledge}>Compris</button>
    </div>
  </div>
{/if}

<style>
  .ring { position: fixed; z-index: 44; pointer-events: none; border: 3px solid var(--gold-hi); box-shadow: 0 0 0 2px var(--ink-0), 0 0 14px var(--gold);
    animation: pulse 1.1s steps(4) infinite; }
  @keyframes pulse { 50% { border-color: var(--gold); box-shadow: 0 0 0 2px var(--ink-0), 0 0 4px var(--gold); } }
  .bubble { position: fixed; z-index: 45; pointer-events: none; display: flex; gap: 8px; align-items: flex-start; padding: 8px 10px;
    background: var(--parch); color: var(--parch-ink); border: 2px solid var(--ink-0); box-shadow: inset 0 0 0 2px var(--parch-3), 0 4px 0 rgba(0,0,0,.4);
    animation: pop .2s steps(3); }
  @keyframes pop { from { transform: scale(.85); opacity: 0; } }
  .bubble::after { content: ''; position: absolute; left: calc(var(--ax) - 8px); width: 0; height: 0; border: 8px solid transparent; }
  .bubble.below::after { top: -18px; border-bottom-color: var(--ink-0); }
  .bubble:not(.below)::after { bottom: -18px; border-top-color: var(--ink-0); }
  .bubble.center::after { display: none; }
  img { flex: none; width: 36px; height: 36px; object-fit: contain; image-rendering: pixelated; }
  .txt { flex: 1; display: flex; flex-direction: column; gap: 6px; }
  p { margin: 0; font-size: 15px; line-height: 1.25; }
  .btn { pointer-events: auto; align-self: flex-end; padding: 5px 12px; font-size: 13px; }
</style>

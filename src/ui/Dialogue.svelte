<script lang="ts">
  import { ui } from '../lib/game.svelte';
  import { SCENE_BY_ID, SPEAKERS } from '../game/data/story';
  import { gfx } from '../lib/gfx';
  import { unlockAudio } from '../lib/audio';

  const scene = $derived(SCENE_BY_ID[ui.scenes[0]]);
  let idx = $state(0);
  let shown = $state(0);
  const line = $derived(scene?.lines[idx]);
  const sp = $derived(line ? SPEAKERS[line.who] : null);

  $effect(() => {
    const text = line?.text ?? '';
    shown = 0;
    const t = window.setInterval(() => { shown += 1; if (shown >= text.length) clearInterval(t); }, 22);
    return () => clearInterval(t);
  });

  function next() {
    unlockAudio();
    if (!line) return;
    if (shown < line.text.length) { shown = line.text.length; return; }
    if (idx < scene.lines.length - 1) idx++;
    else { idx = 0; ui.scenes.shift(); }
  }
  function skip(ev: Event) { ev.stopPropagation(); idx = 0; ui.scenes.shift(); }
</script>

{#if scene && line}
  <div class="veil" onclick={next} onkeydown={next} role="button" tabindex="0">
    {#if scene.title && idx === 0}<div class="act gothic outline">{scene.title}</div>{/if}
    <div class="box" class:narr={line.who === 'narrateur'}>
      {#if sp?.sprite}<img class="who" src={gfx(sp.sprite)} alt="" />{/if}
      {#if sp?.name}<div class="plate" style="color:{sp.color}">{sp.name}</div>{/if}
      <p class="book">{line.text.slice(0, shown)}{#if shown >= line.text.length}<span class="caret">▼</span>{/if}</p>
    </div>
    <button class="skip" onclick={skip}>Passer »</button>
  </div>
{/if}

<style>
  .veil { position: fixed; inset: 0; z-index: 50; background: rgba(8,6,12,.55); display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding: 0 10px calc(16px + var(--safe-bottom)); }
  .act { position: absolute; top: 20%; left: 0; right: 0; text-align: center; font-size: 46px; color: var(--parch); animation: actin 1.4s steps(10); }
  @keyframes actin { from { opacity: 0; transform: translateY(-10px); } }
  .box { position: relative; width: 100%; max-width: 540px; min-height: 120px; padding: 14px 14px 12px; background: #13101b;
    border: 2px solid var(--ink-0); box-shadow: inset 0 0 0 2px #d9cdb3, inset 0 0 0 4px var(--ink-0), inset 0 0 0 6px #4a4054; }
  .box.narr { background: #1b1612; }
  .who { position: absolute; bottom: calc(100% - 6px); left: 14px; height: 116px; }
  .plate { position: absolute; top: -14px; left: 96px; padding: 3px 10px; font-weight: 700; font-size: 14px; background: #13101b; border: 2px solid #d9cdb3; outline: 2px solid var(--ink-0); }
  .box:not(:has(.who)) .plate { left: 14px; }
  p { margin: 6px 4px 0; font-size: 17px; line-height: 1.45; color: #efe6d2; }
  .narr p { font-style: italic; color: var(--parch-2); }
  .caret { display: inline-block; margin-left: 6px; font-size: 11px; color: var(--gold); animation: bob .5s steps(2) infinite; }
  @keyframes bob { 50% { transform: translateY(3px); } }
  .skip { position: absolute; top: calc(10px + var(--safe-top)); right: 10px; font-size: 13px; color: var(--text-2); padding: 5px 9px; background: var(--stone-1); border: 2px solid var(--ink-0); }
</style>

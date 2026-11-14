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
  let timer = 0;

  $effect(() => {
    // effet machine à écrire
    const text = line?.text ?? '';
    shown = 0;
    clearInterval(timer);
    timer = window.setInterval(() => { shown += 2; if (shown >= text.length) clearInterval(timer); }, 18);
    return () => clearInterval(timer);
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
    {#if scene.title && idx === 0}<div class="act title">{scene.title}</div>{/if}
    <div class="box" class:narr={line.who === 'narrateur'} style="--c:{sp?.color}">
      {#if sp?.sprite}<img class="px who" src={gfx(sp.sprite)} alt="" />{/if}
      {#if sp?.name}<div class="name title">{sp.name}</div>{/if}
      <p>{line.text.slice(0, shown)}<span class="caret">{shown >= line.text.length ? '▼' : ''}</span></p>
    </div>
    <button class="skip" onclick={skip}>Passer ⏭</button>
  </div>
{/if}

<style>
  .veil { position: fixed; inset: 0; z-index: 50; background: linear-gradient(180deg, rgba(5,3,12,.35), rgba(5,3,12,.9) 60%); display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding: 0 12px calc(24px + var(--safe-bottom)); animation: fade .25s; }
  @keyframes fade { from { opacity: 0; } }
  .act { position: absolute; top: 22%; left: 0; right: 0; text-align: center; font-size: 26px; color: var(--gold); text-shadow: 0 0 24px rgba(255,207,90,.6), 0 2px 0 #000; animation: actin 1.2s ease-out; }
  @keyframes actin { from { opacity: 0; letter-spacing: .5em; } }
  .box { position: relative; width: 100%; max-width: 540px; background: rgba(20,14,38,.96); border-radius: 16px; padding: 16px 16px 14px; box-shadow: inset 0 0 0 1px var(--c), 0 10px 40px rgba(0,0,0,.6); min-height: 110px; }
  .box.narr { font-style: italic; box-shadow: inset 0 0 0 1px var(--line), 0 10px 40px rgba(0,0,0,.6); }
  .who { position: absolute; bottom: calc(100% - 14px); left: 10px; height: 120px; filter: drop-shadow(0 4px 8px rgba(0,0,0,.7)); }
  .name { color: var(--c); font-size: 15px; margin-bottom: 6px; padding-left: 0; }
  .box:has(.who) .name { padding-left: 0; }
  p { margin: 0; font-size: 15.5px; line-height: 1.5; color: var(--ink); }
  .caret { color: var(--c); margin-left: 4px; animation: blink 1s infinite; font-size: 11px; }
  @keyframes blink { 50% { opacity: 0; } }
  .skip { position: absolute; top: calc(12px + var(--safe-top)); right: 12px; font-size: 12px; color: var(--ink-3); padding: 6px 10px; border-radius: 99px; background: rgba(0,0,0,.4); }
</style>

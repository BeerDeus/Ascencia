<script lang="ts">
  import { G } from '../lib/game.svelte';
  let box: HTMLDivElement;
  const entries = $derived(G.s.chronicle);
  $effect(() => { entries.length; queueMicrotask(() => box && (box.scrollTop = box.scrollHeight)); });
</script>

<div class="page scroll" bind:this={box}>
  <div class="head gothic">Chronique</div>
  {#each entries as e (e.id)}
    {#if e.kind === 'story'}<p class="story gothic">{e.text.replace(/—/g, '').trim()}</p>
    {:else}<p class={e.kind}>{e.text}</p>{/if}
  {/each}
  {#if !entries.length}<p class="info">Votre légende reste à écrire…</p>{/if}
</div>

<style>
  .page { flex: 1; margin: 6px; padding: 8px 14px 14px; color: var(--parch-ink);
    background:
      radial-gradient(ellipse at 20% 10%, rgba(255,255,255,.25), transparent 50%),
      radial-gradient(ellipse at 80% 90%, rgba(120,80,30,.18), transparent 55%),
      var(--parch);
    border: 2px solid var(--ink-0); box-shadow: inset 0 0 0 2px var(--parch-3), inset 0 0 24px rgba(106,82,54,.35); clip-path: var(--notch); }
  .head { font-size: 26px; text-align: center; color: var(--parch-ink-2); border-bottom: 2px solid var(--parch-3); margin-bottom: 8px; line-height: 1.1; }
  p { margin: 0 0 5px; font-family: var(--f-book); font-size: 15.5px; line-height: 1.38; }
  .kill, .info { color: var(--parch-ink-2); }
  .boss { color: #7a1f1a; font-weight: 700; }
  .crit { color: #8a4b00; font-weight: 700; }
  .gold { color: #7a5600; }
  .loot { color: #2f4f6f; }
  .larry { color: #6b2a5e; font-style: italic; }
  .fail { color: #8e2b25; font-style: italic; }
  .up { color: #2f5d2a; }
  .story { font-size: 22px; text-align: center; color: var(--parch-ink); margin: 10px 0 6px; }
</style>

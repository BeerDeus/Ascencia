<script lang="ts">
  import { G } from '../lib/game.svelte';
  let box: HTMLDivElement;
  const entries = $derived(G.s.chronicle);
  $effect(() => { entries.length; queueMicrotask(() => box && (box.scrollTop = box.scrollHeight)); });
</script>

<div class="head title">Chronique</div>
<div class="list scroll" bind:this={box}>
  {#each entries as e (e.id)}
    <p class={e.kind}>› {e.text}</p>
  {/each}
  {#if !entries.length}<p class="info">Votre légende reste à écrire…</p>{/if}
</div>

<style>
  .head { padding: 8px 14px 4px; font-size: 13px; color: var(--ink-3); }
  .list { flex: 1; padding: 0 14px 10px; }
  p { margin: 0 0 6px; font-size: 13.5px; line-height: 1.4; color: var(--ink-2); animation: in .3s ease-out; }
  @keyframes in { from { opacity: 0; transform: translateY(6px); } }
  .boss { color: #ff9db0; font-weight: 600; }
  .crit { color: var(--crit); }
  .gold { color: var(--gold); }
  .story { color: #d8c6ff; font-family: var(--font-title); font-size: 13px; text-align: center; margin: 10px 0; }
  .larry { color: #ff7fbf; font-style: italic; }
  .fail { color: #ff8080; }
  .up { color: var(--green); }
</style>

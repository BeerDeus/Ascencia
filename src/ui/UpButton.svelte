<script lang="ts">
  import { gfx } from '../lib/gfx';
  let { label, cost, can, onclick }: { label: string; cost: string; can: boolean; onclick: () => void } = $props();
</script>

<button class="up" class:can disabled={!can} {onclick}>
  <img src={gfx('icons/amelioration')} alt="" />
  <span class="txt"><b>{label}</b><span>{cost}</span></span>
</button>

<style>
  .up { position: relative; flex: none; display: flex; align-items: center; gap: 4px; min-width: 104px; height: 46px; padding: 0 8px 0 4px; overflow: hidden;
    font-family: var(--f-pixel); color: var(--text-3); background: var(--stone-2); border: 2px solid var(--ink-0);
    box-shadow: inset 2px 2px 0 var(--hi), inset -2px -3px 0 var(--lo); clip-path: var(--notch); }
  .up img { width: 28px; height: 28px; filter: grayscale(1) brightness(.5); }
  .txt { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.05; }
  .txt b { font-size: 13px; }
  .txt span { font-size: 14px; font-weight: 700; color: #b9877c; }
  .up.can { color: #2b1b06; background: var(--gold); box-shadow: inset 2px 2px 0 var(--gold-hi), inset -2px -3px 0 var(--gold-lo); }
  .up.can img { filter: none; animation: hop .7s steps(2) infinite; }
  .up.can .txt span { color: #2b1b06; }
  .up.can::after { content: ''; position: absolute; top: 0; bottom: 0; width: 18px; left: -30px; background: rgba(255,255,255,.45); transform: skewX(-20deg); animation: shine 2.4s steps(12) infinite; }
  .up.can:active { box-shadow: inset 2px 3px 0 var(--gold-lo), inset -2px -2px 0 var(--gold-hi); }
  @keyframes hop { 50% { transform: translateY(-2px); } }
  @keyframes shine { 0%, 60% { left: -30px; } 100% { left: 120%; } }
</style>

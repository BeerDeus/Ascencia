<script lang="ts">
  let { value = $bindable(), tabs }: { value: string; tabs: { id: string; label: string }[] } = $props();
</script>
<div class="sub">
  {#each tabs as t}<button class:on={value === t.id} onclick={() => (value = t.id)}>{t.label}</button>{/each}
</div>
<style>
  .sub { flex: none; display: flex; gap: 2px; padding: 2px; background: var(--ink-0); }
  button { flex: 1; padding: 6px 4px; font-size: 12.5px; font-weight: 700; color: var(--text-3); background: var(--stone-1); box-shadow: inset 0 -2px 0 var(--lo); }
  button.on { color: var(--text); background: var(--stone-3); box-shadow: inset 0 2px 0 var(--hi); }
</style>

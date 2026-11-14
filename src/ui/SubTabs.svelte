<script lang="ts">
  let { value = $bindable(), tabs, name = '' }: { value: string; tabs: { id: string; label: string; locked?: string }[]; name?: string } = $props();
</script>
<div class="sub">
  {#each tabs as t}
    <button class:on={value === t.id} class:locked={!!t.locked} disabled={!!t.locked} data-tuto={name ? `${name}-${t.id}` : undefined}
      onclick={() => (value = t.id)}>{t.label}{#if t.locked}<small>{t.locked}</small>{/if}</button>
  {/each}
</div>
<style>
  .sub { flex: none; display: flex; gap: 2px; padding: 2px; background: var(--ink-0); }
  button { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 6px 4px; font-size: 12.5px; font-weight: 700; line-height: 1.1;
    color: var(--text-3); background: var(--stone-1); box-shadow: inset 0 -2px 0 var(--lo); }
  button.on { color: var(--text); background: var(--stone-3); box-shadow: inset 0 2px 0 var(--hi); }
  button.locked { opacity: .45; }
  small { font-size: 9.5px; font-weight: 400; }
</style>

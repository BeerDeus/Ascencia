<script lang="ts">
  import JobBar from './JobBar.svelte';
  import { JOBS, type JobId } from '../game/data/resources';
</script>
<div class="scroll body">
  <p class="tip book">Les métiers ne se perdent jamais, ni à l’Ascension ni à la Résonance. Touchez un métier pour tout savoir.</p>
  {#each Object.keys(JOBS) as j}<section class="frame"><JobBar job={j as JobId} /></section>{/each}
</div>
<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 6px; }
  section { padding: 6px 8px; }
  .tip { margin: 0; font-size: 13px; color: var(--text-3); }
</style>

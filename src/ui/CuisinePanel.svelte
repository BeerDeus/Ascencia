<script lang="ts">
  import { G, act, toast, ui } from '../lib/game.svelte';
  import * as Fi from '../game/fief';
  import { MEALS } from '../game/data/crafting';
  import * as Cr from '../game/crafting';
  import Cost from './Cost.svelte';
  import JobBar from './JobBar.svelte';
  import { fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp } from '../lib/audio';
  const s = $derived(G.s);
  const meal = $derived(Fi.mealActive(s));
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 1000); return () => clearInterval(t); });
  function cook(id: string) { if (act(g => Fi.eat(g, id))) { sfxUp(); toast('Bon appétit !', 'up'); } }
</script>

<div class="scroll body">
    <section class="frame">
      <div class="hd">
        <img class="pt" src={gfx('portraits/gaston')} alt="" />
        <div>
          <div class="gothic h">L’Auberge de Gaston</div>
          <div class="label">Un plat à la fois · ingrédients du Jardin, des monstres et des expéditions · l’effet continue hors-ligne</div>
        </div>
      </div>
      {#if meal && s.meal}
        <div class="active slot"><img src={gfx(meal.sprite)} alt="" /><div><b>{meal.name}</b><span>{meal.desc} · encore {fmtTime((s.meal.until - now) / 1000)}</span></div></div>
      {/if}
      <JobBar job="cuisinier" />
      {#each MEALS as m}
        {@const unlocked = Cr.mealUnlocked(s, m)}
        <div class="meal" class:dim={!unlocked}>
          <button class="ic slot" onclick={() => (ui.info = { kind: 'meal', id: m.id })}><img src={gfx(m.sprite)} alt="" /></button>
          <div class="mi"><b>{m.name}</b><span>{m.desc} · {m.hours} h</span>{#if unlocked}<Cost cost={m.cost} />{/if}</div>
          {#if unlocked}<button class="btn" disabled={!Cr.canCook(s, m)} onclick={() => cook(m.id)}>Cuisiner</button>
          {:else}<span class="lk">Cuisinier {m.level}</span>{/if}
        </div>
      {/each}
    </section>
</div>

<style>
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 8px; }
  section { padding: 8px; display: flex; flex-direction: column; gap: 6px; }
  .hd { display: flex; align-items: center; gap: 8px; }
  .pt { width: 40px; height: 52px; object-fit: contain; object-position: top; }
  .h { font-size: 28px; line-height: .9; color: var(--parch); }
  .meal .btn { gap: 3px; font-size: 12px; padding: 5px 7px; min-width: 74px; }
  @keyframes shake { 50% { transform: rotate(-6deg); } }
  .active { display: flex; gap: 8px; align-items: center; padding: 6px; background: #3b3020; }
  .active img { width: 34px; height: 34px; }
  .active div { display: flex; flex-direction: column; font-size: 12px; color: var(--text-2); }
  .active b { color: var(--gold); font-size: 14px; }
  .meal { display: flex; align-items: center; gap: 8px; }
  .meal.dim { opacity: .45; }
  .ic { width: 40px; height: 40px; display: grid; place-items: center; flex: none; }
  .ic img { width: 30px; height: 30px; }
  .mi { flex: 1; display: flex; flex-direction: column; font-size: 12px; color: var(--text-3); }
  .mi b { font-size: 14px; color: var(--text); }
  .lk { font-size: 11px; color: var(--text-3); }
</style>

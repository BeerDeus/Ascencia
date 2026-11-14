<script lang="ts">
  import { G, act, toast } from '../lib/game.svelte';
  import * as Fi from '../game/fief';
  import * as E from '../game/engine';
  import { BOUNTY_TYPES, MEALS } from '../game/data/fief';
  import { RARITIES } from '../game/data/items';
  import { fmt, fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxUp, sfxGold } from '../lib/audio';

  const s = $derived(G.s);
  const N = (x: number) => fmt(x, s.settings.notation);
  const d = $derived(s.daily);
  const meal = $derived(Fi.mealActive(s));
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 1000); return () => clearInterval(t); });
  const nextReset = $derived.by(() => { const t = new Date(now); t.setHours(24, 0, 0, 0); return (t.getTime() - now) / 1000; });
  const ICON = { or: 'obj/piece_or', metal: 'res/metal', eclats: 'res/eclats_ascension' };

  function claim(i: number) { if (act(g => Fi.claimBounty(g, i))) { sfxGold(); toast('Prime encaissée !', 'gold'); } }
  function chest() { const it = act(E.claimChest); if (it) { sfxUp(); toast(`Coffre : ${it.name} [${RARITIES[it.rarity].name}]`, 'crit'); } }
  function cook(id: string) { if (act(g => Fi.eat(g, id))) { sfxUp(); toast('Bon appétit !', 'up'); } }
</script>

{#if !Fi.fiefUnlocked(s)}
  <div class="locked">
    <img src={gfx('portraits/gaston')} alt="" />
    <p class="book">« Pont-la-Croisée t’attend, avec ses primes et ma cuisine. »</p>
    <span class="label">Se débloque à l’Acte II (étage 26)</span>
  </div>
{:else}
  <div class="scroll body">
    <section class="frame">
      <div class="hd">
        <img class="pt" src={gfx('portraits/garde')} alt="" />
        <div>
          <div class="gothic h">Tableau des Primes</div>
          <div class="label">Nouvelles primes dans {fmtTime(nextReset)}{#if d.streak} · série {d.streak} j{/if}</div>
        </div>
      </div>
      {#each d.bounties as b, i}
        {@const def = BOUNTY_TYPES.find(t => t.c === b.c)!}
        {@const cur = Math.min(b.target, d.c[b.c])}
        {@const done = cur >= b.target}
        <div class="bounty" class:claimed={b.claimed}>
          <div class="bt">
            <span>{def.text(b.target)}</span>
            <div class="bar"><i style="width:{(cur / b.target) * 100}%"></i></div>
            <span class="pr">{N(cur)} / {N(b.target)}</span>
          </div>
          {#if b.claimed}<span class="ok">✓</span>
          {:else}<button class="btn" disabled={!done} onclick={() => claim(i)}><img src={gfx(ICON[b.reward.kind])} alt="" />{N(Fi.rewardValue(s, b))}</button>{/if}
        </div>
      {/each}
      <div class="chest" class:ready={Fi.chestReady(s)}>
        <img src={gfx('obj/caisse')} alt="" />
        <span>{d.chestClaimed ? 'Coffre de la garde ouvert. Revenez demain !' : 'Coffre de la garde : terminez les 3 primes.'}</span>
        {#if Fi.chestReady(s)}<button class="btn" onclick={chest}>Ouvrir</button>{/if}
      </div>
    </section>

    <section class="frame">
      <div class="hd">
        <img class="pt" src={gfx('portraits/gaston')} alt="" />
        <div>
          <div class="gothic h">L’Auberge de Gaston</div>
          <div class="label">Un plat à la fois · l’effet continue hors-ligne</div>
        </div>
      </div>
      {#if meal && s.meal}
        <div class="active slot"><img src={gfx(meal.sprite)} alt="" /><div><b>{meal.name}</b><span>{meal.desc} · encore {fmtTime((s.meal.until - now) / 1000)}</span></div></div>
      {/if}
      {#each MEALS as m}
        {@const unlocked = Fi.mealUnlocked(s, m)}
        {@const cost = Fi.mealCost(s, m)}
        <div class="meal" class:dim={!unlocked}>
          <div class="ic slot"><img src={gfx(m.sprite)} alt="" /></div>
          <div class="mi"><b>{m.name}</b><span>{m.desc} · {m.hours} h</span></div>
          {#if unlocked}<button class="btn" disabled={!!meal || cost > s.run.gold} onclick={() => cook(m.id)}><img src={gfx('obj/piece_or')} alt="" />{N(cost)}</button>
          {:else}<span class="lk">Étage {m.unlock}</span>{/if}
        </div>
      {/each}
    </section>

    <section class="frame soon">
      <div class="hd"><img class="pt" src={gfx('res/plante_sauvage')} alt="" />
        <div><div class="gothic h">Le Jardin</div><div class="label">Bientôt · semis, saisons, récoltes</div></div></div>
    </section>
  </div>
{/if}

<style>
  .locked { text-align: center; padding: 16px; color: var(--text-2); }
  .locked img { height: 110px; }
  .locked p { font-size: 16px; font-style: italic; }
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 8px; }
  section { padding: 8px; display: flex; flex-direction: column; gap: 6px; }
  .hd { display: flex; align-items: center; gap: 8px; }
  .pt { width: 40px; height: 52px; object-fit: contain; object-position: top; }
  .h { font-size: 28px; line-height: .9; color: var(--parch); }
  .bounty { display: flex; align-items: center; gap: 8px; padding: 5px 6px; background: var(--stone-2); border: 2px solid var(--ink-0); }
  .bounty.claimed { opacity: .55; }
  .bt { flex: 1; min-width: 0; display: grid; grid-template-columns: 1fr auto; gap: 2px 6px; font-size: 13px; }
  .bt .bar { grid-column: 1 / -1; grid-row: 2; height: 8px; }
  .bt .bar > i { background: var(--moss); }
  .pr { font-size: 11px; color: var(--text-3); }
  .bounty .btn, .meal .btn { gap: 3px; font-size: 12px; padding: 5px 7px; min-width: 74px; }
  .btn img { width: 16px; height: 16px; }
  .ok { color: var(--moss); font-size: 18px; padding: 0 12px; }
  .chest { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-3); }
  .chest img { width: 34px; height: 34px; filter: grayscale(.8) brightness(.6); }
  .chest.ready { color: var(--gold); }
  .chest.ready img { filter: none; animation: shake .5s steps(2) infinite; }
  @keyframes shake { 50% { transform: rotate(-6deg); } }
  .chest .btn { margin-left: auto; }
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
  .soon { opacity: .6; }
</style>

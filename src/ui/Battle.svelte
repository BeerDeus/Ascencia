<script lang="ts">
  import { onMount } from 'svelte';
  import { G, act, onGameEvent, paused } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { actFor, SEUIL_HARMONIQUE } from '../game/data/world';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { unlockAudio } from '../lib/audio';

  const s = $derived(G.s);
  const r = $derived(G.s.run);
  const m = $derived(G.s.run.monster);
  const st = $derived(E.stats(G.s));
  const actNow = $derived(actFor(r.floor));
  const span = $derived(isFinite(actNow.to) ? actNow.to - actNow.from + 1 : 50);
  const progress = $derived(Math.min(1, ((r.floor - actNow.from) % span + r.wave / 11) / span));
  const hpPct = $derived(isFinite(m.maxHp) ? Math.max(0, m.hp / m.maxHp) * 100 : 100);
  const parryOpen = $derived(r.parryUntil > 0 && s.time <= r.parryUntil);
  const crescendo = $derived(s.time < r.crescendoUntil);
  const goldenLeft = $derived(m.kind === 'golden' && m.fleeAt ? Math.max(0, m.fleeAt - s.time) : 0);
  const certitude = $derived(r.floor === SEUIL_HARMONIQUE.floor && m.kind === 'boss' && s.legende < SEUIL_HARMONIQUE.legende);

  type Pop = { id: number; x: number; y: number; text: string; cls: string };
  let pops = $state<Pop[]>([]);
  let popId = 0;
  let sprite: HTMLImageElement | undefined = $state();
  let zone: HTMLDivElement;
  let lastPt = { x: 0.5, y: 0.45 };
  let dpsAcc = 0, dpsTimer = 0;

  function addPop(text: string, cls: string, x = lastPt.x, y = lastPt.y) {
    const id = ++popId;
    pops.push({ id, x: x + (Math.random() - 0.5) * 0.12, y: y + (Math.random() - 0.5) * 0.06, text, cls });
    if (pops.length > 24) pops.shift();
    setTimeout(() => { const i = pops.findIndex(p => p.id === id); if (i >= 0) pops.splice(i, 1); }, 950);
  }

  function shake(strong = false) {
    sprite?.animate([
      { transform: 'scale(1)', filter: 'brightness(1)' },
      { transform: `scale(${strong ? 0.86 : 0.93}) translateY(3px)`, filter: 'brightness(2.2)' },
      { transform: 'scale(1)', filter: 'brightness(1)' },
    ], { duration: strong ? 180 : 110 });
  }

  onMount(() => {
    const off = onGameEvent(e => {
      const n = G.s.settings.notation;
      if (e.type === 'hit') {
        if (e.tap) { addPop(fmt(e.amount, n), e.crit ? 'crit' : 'tap'); shake(e.crit); }
        else if (e.crit) { addPop(fmt(e.amount, n), 'crit', 0.5, 0.42); shake(true); }
        else dpsAcc += e.amount;
      } else if (e.type === 'kill') {
        addPop('+' + fmt(e.gold, n), 'gold', 0.5, 0.5);
      } else if (e.type === 'floor' && e.skipped) {
        addPop(`FULGURANCE +${e.skipped + 1}`, 'up', 0.5, 0.35);
      } else if (e.type === 'parry') {
        addPop('PARADE !', 'up', 0.5, 0.35);
      } else if (e.type === 'heavy') {
        addPop('RAGE !', 'crit', 0.5, 0.3);
      }
    });
    dpsTimer = window.setInterval(() => {
      if (dpsAcc > 0) { addPop(fmt(dpsAcc, G.s.settings.notation), 'dps', 0.5 + (Math.random() - 0.5) * 0.4, 0.55); dpsAcc = 0; }
    }, 600);
    return () => { off(); clearInterval(dpsTimer); };
  });

  function onDown(ev: PointerEvent) {
    unlockAudio();
    if (paused()) return;
    const rect = zone.getBoundingClientRect();
    lastPt = { x: (ev.clientX - rect.left) / rect.width, y: (ev.clientY - rect.top) / rect.height };
    act(E.tap);
  }
  function onParry(ev: PointerEvent) { ev.stopPropagation(); act(E.parry); }
  function onChallenge(ev: PointerEvent) { ev.stopPropagation(); act(E.challengeBoss); }
</script>

<div class="battle" bind:this={zone} onpointerdown={onDown} role="button" tabindex="-1" aria-label="Frapper"
  style="background-image: url({gfx('bg/' + actNow.bg)}); background-position: 50% {(1 - progress) * 100}%;">
  <div class="shade"></div>

  <div class="waves">
    {#each Array(10) as _, i}<i class:on={r.farming ? false : i < r.wave}></i>{/each}
    <b class:on={r.wave === 10} class:farm={r.farming}>{r.farming ? '↺' : '☠'}</b>
  </div>

  {#if r.farming}
    <button class="challenge btn violet" onpointerdown={onChallenge}>Défier le boss</button>
  {/if}

  <div class="stage" class:crescendo>
    {#key m}
      <img bind:this={sprite} class="px monster" class:boss={m.kind === 'boss'} class:golden={m.kind === 'golden'}
        src={gfx(m.sprite)} alt={m.name} draggable="false" />
    {/key}
  </div>

  {#if parryOpen}
    <button class="parry" onpointerdown={onParry} aria-label="Parer"><img src={gfx('icons/defense')} alt="" />PARER</button>
  {/if}

  {#each pops as p (p.id)}
    <span class="pop num {p.cls}" style="left:{p.x * 100}%; top:{p.y * 100}%">{p.text}</span>
  {/each}

  <div class="hud">
    <div class="name" class:boss={m.kind === 'boss'} class:golden={m.kind === 'golden'}>
      {m.name}{#if certitude}<em> · Certitude</em>{/if}
    </div>
    <div class="bar hp"><i style="width:{hpPct}%"></i></div>
    <div class="hpnum num">{isFinite(m.hp) ? fmt(Math.max(0, m.hp), s.settings.notation) : '∞'}</div>
    {#if m.kind === 'boss'}
      <div class="bar will"><i style="width:{Math.max(0, r.bossTime / st.bossTime) * 100}%"></i></div>
      <div class="hint num">Volonté {Math.max(0, r.bossTime).toFixed(1)} s</div>
    {:else if m.kind === 'golden'}
      <div class="bar will golden"><i style="width:{(goldenLeft / 6) * 100}%"></i></div>
      <div class="hint">Vite, il s’enfuit !</div>
    {/if}
    {#if certitude}
      <div class="hint seuil">Poids de Légende {Math.floor((s.legende / SEUIL_HARMONIQUE.legende) * 100)} % — dégâts presque nuls</div>
    {/if}
  </div>

  <div class="ferveur" class:full={crescendo}>
    <i style="width:{crescendo ? ((r.crescendoUntil - s.time) / 10) * 100 : r.ferveur}%"></i>
    <span>{crescendo ? 'CRESCENDO ×2' : 'Ferveur'}</span>
  </div>
</div>

<style>
  .battle { position: relative; flex: 0 0 44%; min-height: 250px; overflow: hidden; background-size: cover; background-repeat: no-repeat;
    transition: background-position .6s ease-out; touch-action: none; cursor: pointer; outline: none; }
  .shade { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 55%, transparent 30%, rgba(11,8,22,.75) 100%); pointer-events: none; }
  .waves { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 4px; align-items: center; z-index: 2; }
  .waves i { width: 14px; height: 6px; border-radius: 3px; background: rgba(255,255,255,.18); }
  .waves i.on { background: var(--gold); box-shadow: 0 0 6px var(--gold); }
  .waves b { font-size: 14px; color: rgba(255,255,255,.4); margin-left: 4px; }
  .waves b.on { color: var(--red); text-shadow: 0 0 8px var(--red); }
  .waves b.farm { color: var(--cyan); }
  .challenge { position: absolute; top: 26px; right: 10px; z-index: 3; padding: 6px 10px; font-size: 13px; }
  .stage { position: absolute; inset: 22px 0 76px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
  .stage.crescendo::before { content: ''; position: absolute; width: 70%; aspect-ratio: 1; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,120,60,.45), transparent 65%); animation: pulse .5s infinite alternate; }
  .monster { height: min(78%, 190px); max-width: 70%; object-fit: contain; filter: drop-shadow(0 8px 10px rgba(0,0,0,.6)); animation: spawn .25s ease-out; }
  .monster.boss { height: min(92%, 230px); filter: drop-shadow(0 0 14px rgba(255,60,90,.55)) drop-shadow(0 8px 10px rgba(0,0,0,.6)); }
  .monster.golden { filter: sepia(1) saturate(5) hue-rotate(-8deg) brightness(1.15) drop-shadow(0 0 16px #ffcf5a); }
  @keyframes spawn { from { transform: scale(.4) translateY(30px); opacity: 0; } to { transform: none; opacity: 1; } }
  @keyframes pulse { to { transform: scale(1.12); opacity: .7; } }
  .pop { position: absolute; transform: translate(-50%, -50%); pointer-events: none; font-weight: 700; font-size: 18px; color: #fff;
    text-shadow: 0 2px 0 #000, 0 0 6px rgba(0,0,0,.8); animation: rise .95s ease-out forwards; z-index: 4; white-space: nowrap; }
  .pop.crit { color: var(--crit); font-size: 28px; animation-name: critrise; }
  .pop.gold { color: var(--gold); font-size: 16px; }
  .pop.dps { color: #c9bcff; font-size: 14px; opacity: .85; }
  .pop.up { color: var(--cyan); font-size: 22px; font-family: var(--font-title); }
  @keyframes rise { 0% { opacity: 0; transform: translate(-50%, -30%) scale(.7); } 15% { opacity: 1; transform: translate(-50%, -60%) scale(1.1); }
    100% { opacity: 0; transform: translate(-50%, -260%) scale(1); } }
  @keyframes critrise { 0% { opacity: 0; transform: translate(-50%, -40%) scale(.5) rotate(-6deg); } 20% { opacity: 1; transform: translate(-50%, -70%) scale(1.35) rotate(3deg); }
    100% { opacity: 0; transform: translate(-50%, -240%) scale(1.05); } }
  .parry { position: absolute; left: 50%; top: 46%; transform: translate(-50%, -50%); z-index: 5; display: flex; flex-direction: column; align-items: center;
    font-family: var(--font-title); font-weight: 700; color: #fff; font-size: 13px; text-shadow: 0 2px 0 #000;
    width: 92px; height: 92px; border-radius: 50%; justify-content: center; background: radial-gradient(circle, rgba(111,216,255,.55), rgba(40,60,140,.6));
    box-shadow: 0 0 0 3px #bfefff, 0 0 26px #6fd8ff; animation: parry 1.1s linear forwards; }
  .parry img { width: 44px; height: 44px; image-rendering: pixelated; }
  @keyframes parry { from { box-shadow: 0 0 0 3px #bfefff, 0 0 26px #6fd8ff; } to { box-shadow: 0 0 0 46px rgba(191,239,255,0), 0 0 26px #6fd8ff; } }
  .hud { position: absolute; left: 12px; right: 12px; bottom: 26px; pointer-events: none; z-index: 2; }
  .name { font-family: var(--font-title); font-size: 14px; font-weight: 700; text-shadow: 0 2px 0 #000; margin-bottom: 3px; }
  .name.boss { color: #ff8fa0; }
  .name.golden { color: var(--gold); }
  .name em { color: var(--cyan); font-style: normal; font-size: 11px; }
  .hp { height: 10px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.6); background: rgba(0,0,0,.5); }
  .hp > i { background: linear-gradient(90deg, #ff4d6d, #ff8a5c); }
  .hpnum { position: absolute; right: 0; top: 0; font-size: 12px; color: var(--ink-2); text-shadow: 0 1px 0 #000; }
  .will { height: 6px; margin-top: 4px; background: rgba(0,0,0,.5); }
  .will > i { background: linear-gradient(90deg, #6fd8ff, #b892ff); }
  .will.golden > i { background: var(--gold); }
  .hint { font-size: 11px; color: var(--ink-2); margin-top: 2px; text-shadow: 0 1px 0 #000; }
  .hint.seuil { color: var(--cyan); }
  .ferveur { position: absolute; left: 12px; right: 12px; bottom: 6px; height: 14px; border-radius: 99px; background: rgba(0,0,0,.55); overflow: hidden; pointer-events: none; z-index: 2; }
  .ferveur i { position: absolute; inset: 0 auto 0 0; background: linear-gradient(90deg, #ff9a3c, #ff5a3c); transition: width .1s linear; }
  .ferveur.full i { background: linear-gradient(90deg, #ffdd55, #ff5a3c, #ffdd55); background-size: 200% 100%; animation: flow .6s linear infinite; }
  @keyframes flow { to { background-position: -200% 0; } }
  .ferveur span { position: relative; display: block; text-align: center; font-size: 10px; line-height: 14px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; text-shadow: 0 1px 0 #000; }
</style>

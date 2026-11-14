<script lang="ts">
  import { onMount } from 'svelte';
  import { G, ui, act, onGameEvent, paused } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { actFor, SEUIL_HARMONIQUE } from '../game/data/world';
  import { RARITIES } from '../game/data/items';
  import { fmt } from '../game/format';
  import { T } from '../game/tuning';
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
  const certitude = $derived(r.floor === SEUIL_HARMONIQUE.floor && m.kind === 'boss' && E.certitude(s) < 1);
  const N = (x: number) => fmt(x, s.settings.notation);

  type Pop = { id: number; x: number; y: number; text: string; cls: string; color?: string };
  let pops = $state<Pop[]>([]);
  let popId = 0;
  let sprite: HTMLImageElement | undefined = $state();
  let zone: HTMLDivElement;
  let lastPt = { x: 0.5, y: 0.45 };
  let dpsAcc = 0, autoAcc = 0, autoCrit = false;

  function addPop(text: string, cls: string, x = lastPt.x, y = lastPt.y, color?: string) {
    const id = ++popId;
    pops.push({ id, x: x + (Math.random() - 0.5) * 0.14, y: y + (Math.random() - 0.5) * 0.06, text, cls, color });
    if (pops.length > 22) pops.shift();
    setTimeout(() => { const i = pops.findIndex(p => p.id === id); if (i >= 0) pops.splice(i, 1); }, 1000);
  }

  function knock(strong = false) {
    sprite?.animate([
      { transform: 'translate(0,0)', filter: 'brightness(1)' },
      { transform: `translate(${strong ? 5 : 3}px, ${strong ? -3 : -1}px)`, filter: 'brightness(1.9) contrast(1.2)' },
      { transform: `translate(${strong ? -4 : -2}px, 1px)`, filter: 'brightness(1)' },
      { transform: 'translate(0,0)' },
    ], { duration: strong ? 160 : 100, easing: 'steps(3)' });
  }

  onMount(() => {
    const off = onGameEvent(e => {
      if (e.type === 'hit') {
        if (e.tap) { addPop(N(e.amount), e.crit ? 'crit' : 'tap'); knock(e.crit); }
        else if (e.auto) { autoAcc += e.amount; if (e.crit) autoCrit = true; }
        else if (e.crit) { addPop(N(e.amount), 'crit', 0.5, 0.42); knock(true); }
        else dpsAcc += e.amount;
      } else if (e.type === 'kill') addPop('+' + N(e.gold), 'gold', 0.5, 0.52);
      else if (e.type === 'floor' && e.skipped) addPop(`Fulgurance +${e.skipped + 1}`, 'word', 0.5, 0.32);
      else if (e.type === 'parry') addPop('Parade !', 'word', 0.5, 0.32);
      else if (e.type === 'heavy') addPop('Rage !', 'crit', 0.5, 0.3);
      else if (e.type === 'loot') addPop(e.item.name, 'loot', 0.5, 0.62, RARITIES[e.item.rarity].color);
    });
    const t = window.setInterval(() => {
      if (autoAcc > 0) { addPop('➶ ' + N(autoAcc), autoCrit ? 'auto crit' : 'auto', 0.62, 0.48); knock(autoCrit); autoAcc = 0; autoCrit = false; }
      if (dpsAcc > 0) { addPop(N(dpsAcc), 'dps', 0.5 + (Math.random() - 0.5) * 0.45, 0.58); dpsAcc = 0; }
    }, 650);
    return () => { off(); clearInterval(t); };
  });

  function onDown(ev: PointerEvent) {
    unlockAudio();
    if (paused()) return;
    const rect = zone.getBoundingClientRect();
    lastPt = { x: (ev.clientX - rect.left) / rect.width, y: (ev.clientY - rect.top) / rect.height };
    act(E.tap);
  }
  const stop = (fn: () => void) => (ev: PointerEvent) => { ev.stopPropagation(); fn(); };
</script>

<div class="battle" bind:this={zone} onpointerdown={onDown} role="button" tabindex="-1" aria-label="Frapper"
  style="background-image: url({gfx('bg/' + actNow.bg)}); background-position: 50% {(1 - progress) * 100}%;">

  <div class="waves">
    {#each Array(10) as _, i}<i class:on={!r.farming && i < r.wave}></i>{/each}
    <img class:on={r.wave === 10} src={gfx('icons/elite')} alt="Boss" />
  </div>

  {#if E.echoAvailable(s)}
    <button class="echo btn" onpointerdown={stop(() => (ui.echo = true))}>✧ Chanter pour l’Écho</button>
  {/if}

  {#if r.farming}
    <button class="challenge btn blood" onpointerdown={stop(() => act(E.challengeBoss))}>Défier le boss</button>
  {/if}

  <div class="stage" class:crescendo>
    <span class="shadow" class:big={m.kind === 'boss'}></span>
    {#key m}
      <img bind:this={sprite} class="monster" class:boss={m.kind === 'boss'} class:golden={m.kind === 'golden'}
        src={gfx(m.sprite)} alt={m.name} draggable="false" style={m.tint ? `filter:${m.tint}` : ''} />
    {/key}
  </div>

  {#if s.messenger}
    <button class="messenger" onpointerdown={stop(() => (ui.messenger = true))} aria-label="Lettre de Lysandra"><img src={gfx('obj/lettre')} alt="" /></button>
  {/if}

  {#if parryOpen}
    <button class="parry" onpointerdown={stop(() => act(E.parry))} aria-label="Parer"><img src={gfx('icons/defense')} alt="" /><span class="outline">Parer !</span></button>
  {/if}

  {#each pops as p (p.id)}
    <span class="pop outline {p.cls}" style="left:{p.x * 100}%; top:{p.y * 100}%; {p.color ? 'color:' + p.color : ''}">{p.text}</span>
  {/each}

  <div class="hud frame">
    <div class="line">
      <span class="name" class:boss={m.kind === 'boss'} class:golden={m.kind === 'golden'}>{m.name}{#if m.locked} · scellée{/if}{#if m.hunt} · chasse{/if}</span>
      <span class="hpnum">{isFinite(m.hp) ? N(Math.max(0, m.hp)) : '∞'}</span>
    </div>
    <div class="bar hp"><i style="width:{hpPct}%"></i></div>
    {#if m.kind === 'boss'}
      <div class="ferveur"><span class="lbl">Volonté {Math.max(0, r.bossTime).toFixed(1)} s</span>
        <div class="bar will"><i style="width:{Math.max(0, r.bossTime / st.bossTime) * 100}%"></i></div></div>
      {#if certitude}<div class="seuil">Certitude du Gardien : {Math.round((1 - E.certitude(s)) * 100)} % de vos coups absorbés · Légende {Math.floor((s.legende / T.seuilLegende) * 100)} %</div>{/if}
    {:else if m.kind === 'golden'}
      <div class="ferveur"><span class="lbl">Fuite {goldenLeft.toFixed(1)} s</span>
        <div class="bar will golden"><i style="width:{(goldenLeft / 6) * 100}%"></i></div></div>
    {/if}
    <div class="ferveur" class:full={crescendo}>
      <span class="lbl">{crescendo ? 'Crescendo ×2' : 'Ferveur'}</span>
      <div class="bar"><i style="width:{crescendo ? ((r.crescendoUntil - s.time) / 10) * 100 : r.ferveur}%"></i></div>
    </div>
  </div>
</div>

<style>
  .battle { position: relative; flex: 0 0 34dvh; min-height: 215px; overflow: hidden; background-size: cover; background-repeat: no-repeat;
    transition: background-position .8s steps(8); touch-action: none; cursor: pointer; outline: none; border-bottom: 2px solid var(--ink-0); }
  .battle::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(12,10,16,.35), transparent 30%, transparent 55%, rgba(12,10,16,.6)); pointer-events: none; }
  .waves { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 3px; align-items: center; z-index: 2;
    padding: 4px 6px; background: rgba(12,10,16,.7); border: 2px solid var(--ink-0); }
  .waves i { width: 10px; height: 10px; background: var(--stone-3); box-shadow: inset 2px 2px 0 var(--lo); }
  .waves i.on { background: var(--gold); box-shadow: inset -2px -2px 0 var(--gold-lo), inset 2px 2px 0 var(--gold-hi); }
  .waves img { width: 18px; height: 18px; margin-left: 3px; filter: grayscale(1) brightness(.5); }
  .waves img.on { filter: none; animation: throb .6s steps(2) infinite; }
  @keyframes throb { 50% { transform: scale(1.2); } }
  .echo { position: absolute; top: 38px; left: 8px; z-index: 3; font-size: 13px; padding: 6px 10px; animation: call 1s steps(2) infinite; }
  @keyframes call { 50% { filter: brightness(1.3); } }
  .challenge { position: absolute; top: 38px; right: 8px; z-index: 3; font-size: 13px; padding: 6px 10px; }
  .stage { position: absolute; inset: 28px 0 76px; display: flex; align-items: flex-end; justify-content: center; pointer-events: none; }
  .shadow { position: absolute; bottom: 2px; width: 120px; height: 16px; background: rgba(0,0,0,.45); border-radius: 50%; }
  .shadow.big { width: 170px; height: 20px; }
  .stage.crescendo .shadow { background: rgba(231,121,58,.5); box-shadow: 0 0 0 6px rgba(231,121,58,.2); }
  .monster { position: relative; height: min(92%, 165px); max-width: 72%; object-fit: contain; object-position: bottom; animation: spawn .3s steps(4); }
  .monster.boss { height: min(100%, 190px); }
  .monster.golden { filter: sepia(1) saturate(4) hue-rotate(-10deg) brightness(1.15); }
  @keyframes spawn { from { transform: translateY(24px); opacity: 0; } }
  .pop { position: absolute; transform: translate(-50%, -50%); pointer-events: none; font-weight: 700; font-size: 18px; color: #fff; animation: rise 1s steps(14) forwards; z-index: 4; white-space: nowrap; }
  .pop.crit { color: #ffe066; font-size: 27px; }
  .pop.gold { color: var(--gold); font-size: 15px; }
  .pop.dps { color: #cfc4e8; font-size: 13px; }
  .pop.auto { color: #9fe07a; font-size: 15px; }
  .pop.auto.crit { color: #d6ff7a; font-size: 22px; }
  .pop.word { color: var(--sky); font-size: 21px; }
  .pop.loot { font-size: 14px; }
  @keyframes rise { 0% { opacity: 0; transform: translate(-50%, -20%); } 10% { opacity: 1; transform: translate(-50%, -70%); }
    75% { opacity: 1; } 100% { opacity: 0; transform: translate(-50%, -250%); } }
  .messenger { position: absolute; top: 34%; left: -50px; z-index: 6; width: 46px; height: 46px; animation: fly 9s linear forwards; }
  .messenger img { width: 100%; height: 100%; filter: drop-shadow(0 0 0 #fff) drop-shadow(2px 2px 0 #000); animation: flap .3s steps(2) infinite; }
  @keyframes fly { 0% { left: -50px; top: 30%; } 25% { top: 22%; } 50% { top: 34%; } 75% { top: 24%; } 100% { left: calc(100% + 10px); top: 30%; } }
  @keyframes flap { 50% { transform: translateY(-4px) rotate(-6deg); } }
  .parry { position: absolute; left: 50%; top: 42%; transform: translate(-50%, -50%); z-index: 5; display: flex; flex-direction: column; align-items: center; gap: 2px;
    font-weight: 700; font-size: 14px; color: #fff; padding: 8px 12px; background: var(--sky-lo); border: 2px solid var(--ink-0);
    box-shadow: inset 2px 2px 0 #4f86bb, inset -2px -3px 0 #1b3a5a; clip-path: var(--notch); animation: blink .22s steps(2) infinite; }
  .parry img { width: 46px; height: 46px; }
  @keyframes blink { 50% { background: #3f78ad; } }
  .hud { position: absolute; left: 6px; right: 6px; bottom: 6px; z-index: 2; padding: 4px 7px 5px; pointer-events: none; background: rgba(33,28,40,.94); }
  .line { display: flex; justify-content: space-between; align-items: baseline; font-size: 14px; }
  .line.sub { font-size: 11px; color: var(--text-3); margin-top: 4px; text-transform: uppercase; letter-spacing: .06em; }
  .name { font-weight: 700; color: var(--text); }
  .name.boss { color: #ff9b8f; }
  .name.golden { color: var(--gold); }
  .hpnum { font-size: 12px; color: var(--text-2); }
  .hp { height: 10px; margin-top: 1px; }
  .hp > i { background: var(--blood); box-shadow: inset 0 2px 0 #e06a5f; }
  .will { height: 8px; }
  .will > i { background: var(--sky); box-shadow: inset 0 2px 0 #9cc6ea; }
  .will.golden > i { background: var(--gold); }
  .seuil { font-size: 11px; color: var(--sky); margin-top: 3px; }
  .ferveur { display: flex; align-items: center; gap: 8px; margin-top: 3px; }
  .ferveur .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: .06em; color: var(--text-3); width: 104px; flex: none; white-space: nowrap; }
  .ferveur .bar { flex: 1; height: 8px; }
  .ferveur .bar > i { background: var(--ember); box-shadow: inset 0 2px 0 #f5a46e; }
  .ferveur.full .lbl { color: var(--ember); }
  .ferveur.full .bar > i { animation: flick .2s steps(2) infinite; }
  @keyframes flick { 50% { background: #ffcf5a; } }
</style>

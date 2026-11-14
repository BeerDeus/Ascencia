<script lang="ts">
  import { onMount } from 'svelte';
  import { G, ui, act, persist } from '../lib/game.svelte';
  import * as Ec from '../game/echo';
  import * as E from '../game/engine';
  import { PARTITIONS } from '../game/data/heroes';
  import { gfx } from '../lib/gfx';
  import { sfxNote, sfxVoid, sfxFail, sfxAscend, sfxParry, unlockAudio } from '../lib/audio';
  import { buzz } from '../lib/native';

  let f = $state(Ec.newFight());
  let flash = $state(-1);
  let shake = $state(false);
  let memText = $state('');
  let lastLit = -1;
  G.s.ending.attempts++;

  onMount(() => {
    let raf = 0, last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      const before = f.phase;
      Ec.tick(f, dt, Math.random);
      const l = Ec.lit(f);
      if (l >= 0 && l !== lastLit) sfxNote(l);
      lastLit = l;
      if (before !== 'void' && f.phase === 'void') sfxVoid();
      if (before !== 'lost' && f.phase === 'lost') { sfxFail(); buzz('heavy'); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  });

  function play(i: number) {
    unlockAudio();
    const r = Ec.press(f, i);
    if (!r) return;
    flash = i; setTimeout(() => (flash = -1), 160);
    if (r === 'fail') { sfxFail(); buzz('heavy'); shake = true; setTimeout(() => (shake = false), 300); }
    else { sfxNote(i); buzz('light'); }
    if (r === 'verse') sfxParry();
    if (r === 'won') sfxAscend();
  }
  function island(id: number) {
    const m = Ec.tapIsland(f, id);
    if (m >= 0) { memText = Ec.MEMORIES[m].text; sfxParry(); buzz('light'); }
  }
  function choose(path: 'sceller' | 'lier') {
    act(g => { if (!g.seenStory.includes('echo:victoire')) g.seenStory.push('echo:victoire'); E.finishEcho(g, path); });
    persist(); ui.echo = false;
  }
  function retry() { f = Ec.newFight(); G.s.ending.attempts++; }
</script>

<div class="void" class:shake class:calm={f.phase === 'won'}>
  <div class="top">
    <div class="gothic name">L’Écho Oublié</div>
    <div class="bar silence"><i style="width:{f.silence}%"></i><span class="outline">Silence {Math.ceil(f.silence)} %</span></div>
  </div>

  <div class="stage">
    <img class="echo" src={gfx('mobs/fragment_de_dissonance')} alt="" style="opacity:{0.35 + f.silence / 160}" />
    {#each f.islands as i (i.id)}
      <button class="island" style="left:{i.x * 100}%; top:{i.y * 100}%" onpointerdown={() => island(i.id)} aria-label="Souvenir">
        <img src={gfx(Ec.MEMORIES[i.mem].sprite)} alt="" />
      </button>
    {/each}
    <div class="msg book">
      {#if f.phase === 'intro'}Le Néant efface tout. Touchez les <b>souvenirs</b> qui surgissent pour garder votre Volonté, puis <b>rejouez la mélodie</b> de l’Écho.
      {:else if f.phase === 'void'}{memText || 'Le Néant déferle… touchez les souvenirs !'}
      {:else if f.phase === 'show'}Écoutez…
      {:else if f.phase === 'input'}À vous : rejouez la mélodie ({f.input}/{f.seq.length})
      {:else if f.phase === 'lost'}Le Silence vous engloutit. Lysandra vous ramène, à bout de souffle.
      {:else}{f.lines[f.lines.length - 1]}{/if}
    </div>
  </div>

  <div class="bar will"><i style="width:{f.volonte}%"></i><span class="outline">Volonté {Math.ceil(f.volonte)} %</span></div>

  {#if f.phase === 'won'}
    <div class="choice">
      <p class="book">Apaisé, l’Écho flotte devant vous, aussi dangereux qu’innocent. Que faites-vous ?</p>
      <button class="path frame" onclick={() => choose('sceller')}>
        <b class="gothic">Sceller</b><span>La Voie du Geôlier : or ×3, +10 s de Volonté, gains hors-ligne +50 %.</span>
      </button>
      <button class="path frame" onclick={() => choose('lier')}>
        <b class="gothic">Se lier</b><span>La Voie du Compagnon : tous les dégâts ×3, Partitions +50 %.</span>
      </button>
      <small>La voie pourra changer à chaque Résonance.</small>
    </div>
  {:else if f.phase === 'intro'}
    <div class="row"><button class="btn go" onclick={() => { unlockAudio(); Ec.begin(f); }}>Chanter</button><button class="btn stone" onclick={() => (ui.echo = false)}>Plus tard</button></div>
  {:else if f.phase === 'lost'}
    <div class="row"><button class="btn go" onclick={retry}>Réessayer</button><button class="btn stone" onclick={() => (ui.echo = false)}>Revenir</button></div>
  {:else}
    <div class="pads">
      {#each PARTITIONS as p, i}
        <button class="pad slot" class:lit={Ec.lit(f) === i} class:hit={flash === i} disabled={f.phase !== 'input'} onpointerdown={() => play(i)} aria-label={p.name}>
          <img src={gfx(p.icon)} alt="" />
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .void { position: fixed; inset: 0; z-index: 65; display: flex; flex-direction: column; gap: 8px; padding: calc(10px + var(--safe-top)) 10px calc(12px + var(--safe-bottom));
    background: radial-gradient(ellipse at 50% 40%, #1c1530 0%, #07050c 70%); color: var(--text); transition: background 1.5s; }
  .void.calm { background: radial-gradient(ellipse at 50% 40%, #3a3150 0%, #120d1c 70%); }
  .void.shake { animation: shake .3s steps(3); }
  @keyframes shake { 33% { transform: translateX(-6px); } 66% { transform: translateX(6px); } }
  .top { display: flex; flex-direction: column; gap: 4px; }
  .name { font-size: 34px; line-height: 1; text-align: center; color: #d9cfe8; }
  .bar { position: relative; height: 16px; }
  .bar span { position: absolute; inset: 0; z-index: 1; text-align: center; font-size: 11px; line-height: 12px; }
  .silence > i { background: #6b6380; }
  .will > i { background: var(--sky); box-shadow: inset 0 2px 0 #9cc6ea; }
  .stage { position: relative; flex: 1; min-height: 0; }
  .echo { position: absolute; left: 50%; top: 42%; transform: translate(-50%, -50%); width: 46%; max-width: 220px; filter: grayscale(1) brightness(1.6) drop-shadow(0 0 30px #b8aee0);
    animation: breathe 3s ease-in-out infinite; }
  @keyframes breathe { 50% { transform: translate(-50%, -52%) scale(1.06); } }
  .island { position: absolute; width: 64px; height: 64px; transform: translate(-50%, -50%); display: grid; place-items: center; border-radius: 50%;
    background: radial-gradient(circle, rgba(230,182,74,.45), rgba(230,182,74,0) 70%); animation: pop .25s steps(3); }
  .island img { width: 46px; height: 56px; object-fit: contain; }
  @keyframes pop { from { transform: translate(-50%, -50%) scale(.3); } }
  .msg { position: absolute; left: 0; right: 0; bottom: 4px; text-align: center; font-size: 16px; font-style: italic; color: #d9cfe8; padding: 0 8px; }
  .pads { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
  .pad { aspect-ratio: 1; display: grid; place-items: center; background: var(--stone-1); }
  .pad img { width: 76%; height: 76%; object-fit: contain; }
  .pad:disabled { opacity: .55; }
  .pad.lit { background: #5a4a26; box-shadow: inset 0 0 0 3px var(--gold-hi); opacity: 1; }
  .pad.hit { background: #2f4f6f; }
  .row { display: flex; gap: 8px; }
  .go { flex: 1; padding: 12px; font-size: 16px; }
  .choice { display: flex; flex-direction: column; gap: 6px; text-align: center; }
  .choice p { margin: 0; font-size: 15px; color: #d9cfe8; font-style: italic; }
  .path { display: flex; flex-direction: column; padding: 10px; text-align: left; }
  .path b { font-size: 28px; line-height: 1; color: var(--gold); }
  .path span { font-size: 13px; color: var(--text-2); }
  .choice small { font-size: 11px; color: var(--text-3); }
</style>

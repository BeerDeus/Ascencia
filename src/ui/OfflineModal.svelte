<script lang="ts">
  import { guard } from '../lib/guard';
  import { ui, G } from '../lib/game.svelte';
  import { fmt, fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxGold } from '../lib/audio';
  import { rewarded } from '../lib/ads.svelte';
  import { adsLeft, noAds } from '../game/shop';
  import { act, toast } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import * as Gd from '../game/garden';
  import * as Ex from '../game/expeditions';
  import { RARITIES } from '../game/data/items';
  import { resInfo } from '../game/resinfo';
  const r = $derived(ui.offline!);
  let shown = $state(0);
  $effect(() => {
    const target = r.gold, t0 = performance.now();
    let raf = 0;
    const step = (t: number) => { const k = Math.min(1, (t - t0) / 1300); shown = target * (1 - (1 - k) ** 3); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  });
  let doubled = $state(false);
  const ripe = $derived(Gd.gardenUnlocked(G.s) ? G.s.garden.plots.filter(p => Gd.mature(p) && !p!.dissonantSince && p!.plant !== 'yggdrasil').length : 0);
  const expDone = $derived(G.s.expeditions.filter(Ex.isDone).length);
  function close() { sfxGold(); ui.offline = null; }
  /** Récupère aussi les récoltes mûres et les expéditions terminées. */
  function all() {
    let h = 0, e = 0;
    act(g => {
      for (let i = 0; i < 36; i++) { const p = g.garden.plots[i]; if (p && Gd.mature(p) && !p.dissonantSince && p.plant !== 'yggdrasil' && E.gardenHarvest(g, i)) h++; }
      for (let i = g.expeditions.length - 1; i >= 0; i--) if (Ex.isDone(g.expeditions[i]) && Ex.claim(g, i)) e++;
    });
    if (h || e) toast(`${h ? `${h} récolte${h > 1 ? 's' : ''}` : ''}${h && e ? ' · ' : ''}${e ? `${e} expédition${e > 1 ? 's' : ''}` : ''}`, 'gold');
    close();
  }
  async function double() {
    if (await rewarded(G.s, 'horsligne')) { G.s.run.gold += r.gold; G.s.stats.goldEarned += r.gold; doubled = true; shown = r.gold * 2; sfxGold(); }
  }
</script>

<div class="veil" use:guard>
  <div class="letter">
    <img class="seal" src={gfx('obj/lettre')} alt="" />
    <p class="book">Pendant ton absence — {fmtTime(r.seconds)} — Kaelen et les autres ont tenu la ligne.
      {#if r.floors}Tu as même gravi <b>{r.floors} étages</b> en dormant, ce qui m’inquiète un peu.{/if}
      Voici ce qu’ils ont ramassé :</p>
    <div class="gold outline"><img src={gfx('obj/bourse_or')} alt="" />+{fmt(shown, G.s.settings.notation)}</div>
    <div class="rows">
      {#if r.floors}<div><span>Étages gravis</span><b>+{r.floors}</b></div>{/if}
      {#if r.kills}<div><span>Monstres vaincus</span><b>{fmt(r.kills)}</b></div>{/if}
      {#if r.items}<div><span>Objets ramassés</span><b>{r.items}{#if r.bestRarity >= 2} · dont <em style="color:{RARITIES[r.bestRarity].color}">{RARITIES[r.bestRarity].name}</em>{/if}</b></div>{/if}
      {#if r.metal}<div><span>Sac plein : recyclé en métal</span><b>+{fmt(r.metal)}</b></div>{/if}
      {#each Object.entries(r.res) as [id, n]}<div><span>{resInfo(id).name}</span><b>+{n}</b></div>{/each}
      {#if ripe}<div class="todo"><span>Plantes mûres au Jardin</span><b>{ripe}</b></div>{/if}
      {#if expDone}<div class="todo"><span>Expéditions de retour</span><b>{expDone}</b></div>{/if}
    </div>
    <p class="sign book">— Lysandra</p>
    {#if !doubled && adsLeft(G.s, 'horsligne')}<button class="btn sky go" onclick={double}>{noAds(G.s) ? 'Doubler' : '▶ Doubler avec une pub'}</button>{/if}
    <button class="btn go" onclick={ripe || expDone ? all : close}>{ripe || expDone ? 'Tout récupérer' : 'Récupérer'}</button>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 45; background: rgba(8,6,12,.8); display: grid; place-items: center; padding: 18px; }
  .letter { position: relative; width: 100%; max-width: 380px; padding: 26px 20px 16px; color: var(--parch-ink);
    background: radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.3), transparent 60%), var(--parch);
    border: 2px solid var(--ink-0); box-shadow: inset 0 0 0 3px var(--parch-3), inset 0 0 30px rgba(106,82,54,.4); animation: drop .3s steps(4); }
  @keyframes drop { from { transform: translateY(-30px) rotate(-2deg); opacity: 0; } }
  .seal { position: absolute; top: -22px; left: 50%; transform: translateX(-50%); width: 48px; }
  p { margin: 0; font-size: 16.5px; line-height: 1.45; }
  .gold { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 14px 0 6px; font-size: 32px; font-weight: 700; color: var(--gold); }
  .gold img { width: 38px; }
  .sign { text-align: right; font-style: italic; }
  .rows { display: flex; flex-direction: column; gap: 2px; margin-bottom: 6px; font-family: var(--f-pixel); }
  .rows div { display: flex; justify-content: space-between; gap: 8px; padding: 3px 6px; font-size: 13px; background: rgba(106,82,54,.15); }
  .rows b { color: var(--parch-ink); }
  .rows em { font-style: normal; font-weight: 700; }
  .rows .todo { background: rgba(230,182,74,.3); }
  .go { width: 100%; margin-top: 12px; padding: 10px; font-size: 15px; }
</style>

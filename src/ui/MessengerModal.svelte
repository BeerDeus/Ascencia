<script lang="ts">
  import { guard } from '../lib/guard';
  import { G, ui, act, toast } from '../lib/game.svelte';
  import * as E from '../game/engine';
  import { adsLeft, noAds } from '../game/shop';
  import { AD_LIMITS } from '../game/data/shop';
  import { rewarded } from '../lib/ads.svelte';
  import { fmt } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxGold } from '../lib/audio';
  const LBL = { or: 'or', metal: 'métal', gemmes: 'gemmes', mana: '' };
  function show(r: E.MessengerReward | null) {
    ui.messenger = false;
    if (!r) return;
    sfxGold();
    toast(r.kind === 'mana' ? 'Mana restauré !' : `+${fmt(r.amount, G.s.settings.notation)} ${LBL[r.kind]}`, 'gold');
  }
  async function triple() { show((await rewarded(G.s, 'messager')) ? act(g => E.claimMessenger(g, 3)) : act(g => E.claimMessenger(g, 1))); }
</script>

<div class="veil" use:guard>
  <div class="letter">
    <img class="seal" src={gfx('obj/lettre')} alt="" />
    <p class="book">« Un petit quelque chose pour la route. Ne le dépense pas en potions douteuses chez Alaric. »</p>
    <p class="sign book">— L.</p>
    <div class="acts">
      <button class="btn" onclick={() => show(act(g => E.claimMessenger(g, 1)))}>Ouvrir</button>
      <button class="btn sky" disabled={!adsLeft(G.s, 'messager')} onclick={triple}>{noAds(G.s) ? 'Ouvrir ×3' : '▶ ×3'} ({adsLeft(G.s, 'messager')}/{AD_LIMITS.messager})</button>
    </div>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 46; background: rgba(8,6,12,.75); display: grid; place-items: center; padding: 18px; }
  .letter { position: relative; width: 100%; max-width: 340px; padding: 26px 18px 14px; color: var(--parch-ink);
    background: radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.3), transparent 60%), var(--parch);
    border: 2px solid var(--ink-0); box-shadow: inset 0 0 0 3px var(--parch-3); animation: drop .25s steps(4); }
  @keyframes drop { from { transform: translateY(-24px); opacity: 0; } }
  .seal { position: absolute; top: -22px; left: 50%; transform: translateX(-50%); width: 46px; }
  p { margin: 0; font-size: 16px; line-height: 1.4; }
  .sign { text-align: right; font-style: italic; }
  .acts { display: flex; gap: 6px; margin-top: 12px; }
  .acts .btn { flex: 1; font-size: 13px; padding: 9px 6px; }
</style>

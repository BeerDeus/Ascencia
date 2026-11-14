<script lang="ts">
  import { G, ui, act, toast } from '../lib/game.svelte';
  import * as Sh from '../game/shop';
  import * as E from '../game/engine';
  import { BLESSINGS, PACKS, AD_LIMITS, AD_GEMS, BAG_COST, BAG_MAX_BONUS, PARTITION_REFILL_COST, BOUNTY_REROLL_COST, GEM_ICON } from '../game/data/shop';
  import { fiefUnlocked } from '../game/fief';
  import { rewarded } from '../lib/ads.svelte';
  import { purchase, billingReady } from '../lib/billing';
  import { fmtTime } from '../game/format';
  import { gfx } from '../lib/gfx';
  import { sfxGold, sfxUp } from '../lib/audio';

  const s = $derived(G.s);
  let now = $state(Date.now());
  $effect(() => { const t = setInterval(() => (now = Date.now()), 1000); return () => clearInterval(t); });
  const left = (id: string) => Math.max(0, ((s.shop.blessings[id] ?? 0) - now) / 1000);

  async function freeGems() { if (await rewarded(s, 'gemmes')) { s.gems += AD_GEMS; sfxGold(); toast(`+${AD_GEMS} gemmes`, 'gold'); } }
  async function freeChest() {
    if (await rewarded(s, 'coffre')) {
      const it = act(E.merchantChest);
      sfxUp(); toast(`Coffre : ${it.name}`, 'crit');
    }
  }
  function bless(id: Parameters<typeof Sh.buyBlessing>[1]) { if (act(g => Sh.buyBlessing(g, id))) { sfxUp(); toast('Bénédiction active', 'up'); } }
  async function buy(id: string) {
    if (!billingReady) { toast('Achats disponibles dans l’appli Play Store', 'info'); return; }
    if (await purchase(id)) act(g => Sh.grantPack(g, id));
  }
</script>

<div class="veil" onclick={() => (ui.shop = false)} onkeydown={() => {}} role="presentation">
  <div class="sheet frame" onclick={(e) => e.stopPropagation()} onkeydown={() => {}} role="dialog" tabindex="-1">
    <div class="hd">
      <span class="gothic h">Marché</span>
      <span class="gems outline"><img src={gfx(GEM_ICON)} alt="" />{s.gems}</span>
      <button class="x" onclick={() => (ui.shop = false)} aria-label="Fermer">✕</button>
    </div>
    <div class="scroll body">
      <div class="label">Gratuit</div>
      <div class="row frame">
        <img src={gfx('packs/gem_pack_5')} alt="" />
        <div class="mi"><b>{AD_GEMS} gemmes</b><span>Une courte publicité · {Sh.adsLeft(s, 'gemmes')}/{AD_LIMITS.gemmes} aujourd’hui</span></div>
        <button class="btn sky" disabled={!Sh.adsLeft(s, 'gemmes')} onclick={freeGems}>{Sh.noAds(s) ? 'Prendre' : '▶ Voir'}</button>
      </div>
      <div class="row frame">
        <img src={gfx('obj/caisse')} alt="" />
        <div class="mi"><b>Coffre du marchand</b><span>Un objet rare ou mieux · {Sh.adsLeft(s, 'coffre')}/{AD_LIMITS.coffre} aujourd’hui</span></div>
        <button class="btn sky" disabled={!Sh.adsLeft(s, 'coffre')} onclick={freeChest}>{Sh.noAds(s) ? 'Prendre' : '▶ Voir'}</button>
      </div>

      <div class="label">Bénédictions</div>
      {#each BLESSINGS as b}
        {@const l = left(b.id)}
        <div class="row frame" class:on={l > 0}>
          <img src={gfx(b.icon)} alt="" />
          <div class="mi"><b>{b.name}</b><span>{b.desc} · {b.minutes} min{#if l > 0} · <em>encore {fmtTime(l)}</em>{/if}</span></div>
          <button class="btn" disabled={s.gems < b.cost} onclick={() => bless(b.id)}><img src={gfx(GEM_ICON)} alt="" />{b.cost}</button>
        </div>
      {/each}

      <div class="label">Services</div>
      <div class="row frame">
        <img src={gfx('partitions/accord_parfait')} alt="" />
        <div class="mi"><b>Recharger les Partitions</b><span>Mana plein, recharges remises à zéro</span></div>
        <button class="btn" disabled={s.gems < PARTITION_REFILL_COST} onclick={() => act(E.refillPartitions) && sfxUp()}><img src={gfx(GEM_ICON)} alt="" />{PARTITION_REFILL_COST}</button>
      </div>
      {#if fiefUnlocked(s)}
        <div class="row frame">
          <img src={gfx('portraits/garde')} alt="" />
          <div class="mi"><b>Nouvelles primes</b><span>Remplace les primes non encaissées</span></div>
          <button class="btn" disabled={s.gems < BOUNTY_REROLL_COST} onclick={() => act(E.rerollBounties) && sfxUp()}><img src={gfx(GEM_ICON)} alt="" />{BOUNTY_REROLL_COST}</button>
        </div>
      {/if}
      <div class="row frame">
        <img src={gfx('obj/sac_a_dos')} alt="" />
        <div class="mi"><b>Agrandir le sac</b><span>+10 emplacements · {Sh.invMax(s)}/{40 + BAG_MAX_BONUS}</span></div>
        <button class="btn" disabled={s.gems < BAG_COST || s.shop.bagBonus >= BAG_MAX_BONUS} onclick={() => act(Sh.buyBag) && sfxUp()}><img src={gfx(GEM_ICON)} alt="" />{BAG_COST}</button>
      </div>

      <div class="label">Packs</div>
      {#each PACKS.filter(p => !(p.once && s.shop.owned.includes(p.id))) as p}
        <div class="row frame pack">
          <img src={gfx(p.icon)} alt="" />
          <div class="mi"><b>{p.name}</b><span>{p.desc}</span></div>
          <button class="btn stone" onclick={() => buy(p.id)}>{p.price}</button>
        </div>
      {/each}
      <p class="note">Les achats réels seront activés dans l’application Android (Google Play). Aucun bonus permanent de puissance n’est vendu.</p>
    </div>
  </div>
</div>

<style>
  .veil { position: fixed; inset: 0; z-index: 35; background: rgba(8,6,12,.7); display: flex; align-items: flex-end; justify-content: center; }
  .sheet { width: 100%; max-width: 560px; max-height: 86dvh; display: flex; flex-direction: column; background: var(--stone-1); clip-path: none; padding-bottom: var(--safe-bottom); animation: up .2s steps(4); }
  @keyframes up { from { transform: translateY(40px); opacity: 0; } }
  .hd { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-bottom: 2px solid var(--ink-0); }
  .h { font-size: 32px; line-height: 1; color: var(--parch); }
  .gems { display: inline-flex; align-items: center; gap: 4px; margin-left: auto; font-size: 18px; font-weight: 700; color: #8fc8ff; }
  .gems img { width: 24px; height: 24px; }
  .x { font-size: 18px; color: var(--text-3); padding: 0 4px; }
  .body { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 5px; }
  .label { margin-top: 6px; }
  .row { display: flex; align-items: center; gap: 8px; padding: 6px 8px; }
  .row.on { background: #3b3020; }
  .row > img { width: 38px; height: 38px; object-fit: contain; flex: none; }
  .mi { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: 12px; color: var(--text-3); }
  .mi b { font-size: 14px; color: var(--text); }
  .mi em { font-style: normal; color: var(--gold); }
  .row .btn { gap: 3px; font-size: 12.5px; padding: 6px 8px; min-width: 70px; }
  .btn img { width: 16px; height: 16px; }
  .note { font-size: 11px; color: var(--text-3); margin: 8px 2px; }
</style>

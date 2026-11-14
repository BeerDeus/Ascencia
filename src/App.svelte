<script lang="ts">
  import { G, ui } from './lib/game.svelte';
  import TopBar from './ui/TopBar.svelte';
  import Battle from './ui/Battle.svelte';
  import PartitionBar from './ui/PartitionBar.svelte';
  import Nav from './ui/Nav.svelte';
  import Chronicle from './ui/Chronicle.svelte';
  import HeroPanel from './ui/HeroPanel.svelte';
  import CompanionsPanel from './ui/CompanionsPanel.svelte';
  import AscensionPanel from './ui/AscensionPanel.svelte';
  import EquipmentPanel from './ui/EquipmentPanel.svelte';
  import FiefPanel from './ui/FiefPanel.svelte';
  import GardenPanel from './ui/GardenPanel.svelte';
  import AlchemyPanel from './ui/AlchemyPanel.svelte';
  import ExpeditionsPanel from './ui/ExpeditionsPanel.svelte';
  import ChestPanel from './ui/ChestPanel.svelte';
  import ForgePanel from './ui/ForgePanel.svelte';
  import { fiefUnlocked } from './game/fief';
  import { FIEF_TABS, fiefTabOpen } from './game/data/fief';
  import Tuto from './ui/Tuto.svelte';
  import SpellModal from './ui/SpellModal.svelte';
  import JobsPanel from './ui/JobsPanel.svelte';
  import CuisinePanel from './ui/CuisinePanel.svelte';
  import JobModal from './ui/JobModal.svelte';
  import InfoModal from './ui/InfoModal.svelte';
  const FIEF_LABELS = { village: 'Village', metiers: 'Métiers', jardin: 'Jardin', expeditions: 'Expéd.', ateliers: 'Ateliers', coffre: 'Coffre' } as const;
  const lockAt = (id: keyof typeof FIEF_TABS) => (fiefTabOpen(G.s, id) ? undefined : `étage ${FIEF_TABS[id]}`);
  const fiefTabs = $derived((Object.keys(FIEF_LABELS) as (keyof typeof FIEF_LABELS)[]).map(id => ({ id, label: FIEF_LABELS[id],
    locked: fiefTabOpen(G.s, id) ? undefined : `étage ${FIEF_TABS[id]}` })));
  import ArcanesPanel from './ui/ArcanesPanel.svelte';
  import SubTabs from './ui/SubTabs.svelte';
  import AchievementsPanel from './ui/AchievementsPanel.svelte';
  import ResonancePanel from './ui/ResonancePanel.svelte';
  import { anchorsVisible } from './game/resonance';
  import { claimable } from './game/achievements';
  import ShopSheet from './ui/ShopSheet.svelte';
  import CalendarModal from './ui/CalendarModal.svelte';
  import OfferModal from './ui/OfferModal.svelte';
  import AdOverlay from './ui/AdOverlay.svelte';
  import MessengerModal from './ui/MessengerModal.svelte';
  import EchoFight from './ui/EchoFight.svelte';
  import { adUi } from './lib/ads.svelte';
  import { payUi } from './lib/billing.svelte';
  import PayOverlay from './ui/PayOverlay.svelte';
  import CloudConflict from './ui/CloudConflict.svelte';
  import OptionsPanel from './ui/OptionsPanel.svelte';
  import Dialogue from './ui/Dialogue.svelte';
  import ClassPicker from './ui/ClassPicker.svelte';
  import OfflineModal from './ui/OfflineModal.svelte';
  import Ritual from './ui/Ritual.svelte';
  import Toasts from './ui/Toasts.svelte';
</script>

{#if ui.ready}
  <main>
    <TopBar />
    <!-- Jardin en plein écran : le combat continue en arrière-plan (dégâts automatiques seulement) -->
    {#if !(ui.tab === 'fief' && ui.fiefTab === 'jardin' && fiefTabOpen(G.s, 'jardin'))}
      <Battle />
      <PartitionBar />
    {/if}
    <section class="panel">
      {#if ui.tab === 'chronique'}<Chronicle />
      {:else if ui.tab === 'heros'}
        <SubTabs name="hero" bind:value={ui.heroTab} tabs={[{ id: 'heros', label: 'Héros' }, { id: 'sac', label: 'Sac & Forge' }, { id: 'hf', label: 'Hauts faits' + (claimable(G.s).length ? ` (${claimable(G.s).length})` : '') }]} />
        {#if ui.heroTab === 'heros'}<HeroPanel />{:else if ui.heroTab === 'sac'}<EquipmentPanel />{:else}<AchievementsPanel />{/if}
      {:else if ui.tab === 'compagnons'}<CompanionsPanel />
      {:else if ui.tab === 'fief'}
        {#if fiefUnlocked(G.s)}<SubTabs name="fief" bind:value={ui.fiefTab} tabs={fiefTabs} />{/if}
        {#if !fiefUnlocked(G.s) || ui.fiefTab === 'village' || !fiefTabOpen(G.s, ui.fiefTab)}<FiefPanel />
        {:else if ui.fiefTab === 'jardin'}<GardenPanel />
        {:else if ui.fiefTab === 'ateliers'}
          <SubTabs name="atelier" bind:value={ui.atelier} tabs={[{ id: 'cuisine', label: 'Cuisine' }, { id: 'alchimie', label: 'Alchimie', locked: lockAt('alchimie') }, { id: 'forge', label: 'Forge', locked: lockAt('forge') }]} />
          {#if ui.atelier === 'forge' && fiefTabOpen(G.s, 'forge')}<ForgePanel />{:else if ui.atelier === 'alchimie' && fiefTabOpen(G.s, 'alchimie')}<AlchemyPanel />{:else}<CuisinePanel />{/if}
        {:else if ui.fiefTab === 'expeditions'}<ExpeditionsPanel />
        {:else if ui.fiefTab === 'metiers'}<JobsPanel />
        {:else}<ChestPanel />{/if}
      {:else if ui.tab === 'ascension'}
        {#if G.s.ascensions > 0}<SubTabs name="asc" bind:value={ui.ascTab} tabs={[{ id: 'rituel', label: 'Rituel' }, { id: 'arcanes', label: 'Arcanes' }, ...(anchorsVisible(G.s) ? [{ id: 'resonance', label: 'Résonance' }] : [])]} />{/if}
        {#if ui.ascTab === 'arcanes' && G.s.ascensions > 0}<ArcanesPanel />{:else if ui.ascTab === 'resonance' && anchorsVisible(G.s)}<ResonancePanel />{:else}<AscensionPanel />{/if}
      {:else}<OptionsPanel />{/if}
    </section>
    <Nav />
  </main>
  <Tuto />
  <Toasts />
  {#if ui.shop}<ShopSheet />{/if}
  {#if ui.ritual}<Ritual />
  {:else if ui.scenes.length}<Dialogue />
  {:else if ui.classPicker}<ClassPicker />
  {:else if ui.conflict}<CloudConflict />
  {:else if ui.offline}<OfflineModal />
  {:else if ui.messenger}<MessengerModal />
  {:else if ui.calendar}<CalendarModal />
  {:else if ui.spell !== null}<SpellModal />
  {:else if ui.job}<JobModal />
  {:else if ui.info}<InfoModal />
  {:else if ui.offer}<OfferModal />{/if}
  {#if ui.echo && !ui.scenes.length}<EchoFight />{/if}
  {#if adUi.open}<AdOverlay />{/if}
  {#if payUi.open}<PayOverlay />{/if}
{/if}

<style>
  main { height: 100%; display: flex; flex-direction: column; padding-top: var(--safe-top); }
  .panel { flex: 1 1 0; min-height: 0; background: var(--night); position: relative; display: flex; flex-direction: column; }
</style>

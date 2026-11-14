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
    {#if !(ui.tab === 'fief' && ui.fiefTab === 'jardin' && fiefUnlocked(G.s))}
      <Battle />
      <PartitionBar />
    {/if}
    <section class="panel">
      {#if ui.tab === 'chronique'}<Chronicle />
      {:else if ui.tab === 'heros'}
        <SubTabs bind:value={ui.heroTab} tabs={[{ id: 'heros', label: 'Héros' }, { id: 'sac', label: 'Sac & Forge' }, { id: 'hf', label: 'Hauts faits' + (claimable(G.s).length ? ` (${claimable(G.s).length})` : '') }]} />
        {#if ui.heroTab === 'heros'}<HeroPanel />{:else if ui.heroTab === 'sac'}<EquipmentPanel />{:else}<AchievementsPanel />{/if}
      {:else if ui.tab === 'compagnons'}<CompanionsPanel />
      {:else if ui.tab === 'fief'}
        {#if fiefUnlocked(G.s)}<SubTabs bind:value={ui.fiefTab} tabs={[{ id: 'village', label: 'Village' }, { id: 'jardin', label: 'Jardin' }, { id: 'alchimie', label: 'Ateliers' }, { id: 'expeditions', label: 'Expéd.' }, { id: 'coffre', label: 'Coffre' }]} />{/if}
        {#if !fiefUnlocked(G.s) || ui.fiefTab === 'village'}<FiefPanel />
        {:else if ui.fiefTab === 'jardin'}<GardenPanel />
        {:else if ui.fiefTab === 'alchimie'}
          <SubTabs bind:value={ui.atelier} tabs={[{ id: 'alchimie', label: 'Alchimie (Alaric)' }, { id: 'forge', label: 'Forge (Kaelen)' }]} />
          {#if ui.atelier === 'forge'}<ForgePanel />{:else}<AlchemyPanel />{/if}
        {:else if ui.fiefTab === 'expeditions'}<ExpeditionsPanel />
        {:else}<ChestPanel />{/if}
      {:else if ui.tab === 'ascension'}
        {#if G.s.ascensions > 0}<SubTabs bind:value={ui.ascTab} tabs={[{ id: 'rituel', label: 'Rituel' }, { id: 'arcanes', label: 'Arcanes' }, ...(anchorsVisible(G.s) ? [{ id: 'resonance', label: 'Résonance' }] : [])]} />{/if}
        {#if ui.ascTab === 'arcanes' && G.s.ascensions > 0}<ArcanesPanel />{:else if ui.ascTab === 'resonance' && anchorsVisible(G.s)}<ResonancePanel />{:else}<AscensionPanel />{/if}
      {:else}<OptionsPanel />{/if}
    </section>
    <Nav />
  </main>
  <Toasts />
  {#if ui.shop}<ShopSheet />{/if}
  {#if ui.ritual}<Ritual />
  {:else if ui.scenes.length}<Dialogue />
  {:else if ui.classPicker}<ClassPicker />
  {:else if ui.conflict}<CloudConflict />
  {:else if ui.offline}<OfflineModal />
  {:else if ui.messenger}<MessengerModal />
  {:else if ui.calendar}<CalendarModal />
  {:else if ui.offer}<OfferModal />{/if}
  {#if ui.echo && !ui.scenes.length}<EchoFight />{/if}
  {#if adUi.open}<AdOverlay />{/if}
  {#if payUi.open}<PayOverlay />{/if}
{/if}

<style>
  main { height: 100%; display: flex; flex-direction: column; padding-top: var(--safe-top); }
  .panel { flex: 1 1 0; min-height: 0; background: var(--night); position: relative; display: flex; flex-direction: column; }
</style>

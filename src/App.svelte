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
  import ArcanesPanel from './ui/ArcanesPanel.svelte';
  import SubTabs from './ui/SubTabs.svelte';
  import ShopSheet from './ui/ShopSheet.svelte';
  import CalendarModal from './ui/CalendarModal.svelte';
  import OfferModal from './ui/OfferModal.svelte';
  import AdOverlay from './ui/AdOverlay.svelte';
  import MessengerModal from './ui/MessengerModal.svelte';
  import { adUi } from './lib/ads.svelte';
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
    <Battle />
    <PartitionBar />
    <section class="panel">
      {#if ui.tab === 'chronique'}<Chronicle />
      {:else if ui.tab === 'heros'}
        <SubTabs bind:value={ui.heroTab} tabs={[{ id: 'heros', label: 'Héros' }, { id: 'sac', label: 'Sac & Forge' }]} />
        {#if ui.heroTab === 'heros'}<HeroPanel />{:else}<EquipmentPanel />{/if}
      {:else if ui.tab === 'compagnons'}<CompanionsPanel />
      {:else if ui.tab === 'fief'}<FiefPanel />
      {:else if ui.tab === 'ascension'}
        {#if G.s.ascensions > 0}<SubTabs bind:value={ui.ascTab} tabs={[{ id: 'rituel', label: 'Rituel & Constellations' }, { id: 'arcanes', label: 'Arcanes' }]} />{/if}
        {#if ui.ascTab === 'arcanes' && G.s.ascensions > 0}<ArcanesPanel />{:else}<AscensionPanel />{/if}
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
  {#if adUi.open}<AdOverlay />{/if}
{/if}

<style>
  main { height: 100%; display: flex; flex-direction: column; padding-top: var(--safe-top); }
  .panel { flex: 1 1 0; min-height: 0; background: var(--night); position: relative; display: flex; flex-direction: column; }
</style>

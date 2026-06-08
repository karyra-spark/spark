<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { walletBridgeStages } from '$lib/advanced/advanced-model';
  import { learningState } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  function markWalletReady() {
    learningState.walletStatus = 'ready';
    pushToast({ title: 'Wallet readiness dicatat', copy: 'Koneksi wallet asli akan masuk melalui StarknetKit pada tahap terpisah.', tone: 'info' });
  }

  function resetWalletReadiness() {
    learningState.walletStatus = 'not-required';
    pushToast({ title: 'Wallet kembali opsional', copy: 'Pemula tetap bisa lanjut tanpa wallet.', tone: 'info' });
  }
</script>

<SparkCard class="spark-wallet-placeholder">
  <span class="wallet-placeholder-icon"><SparkIcon name="wallet" size={23} /></span>
  <div>
    <div class="wallet-title-row">
      <span class="spark-eyebrow">Starknet Wallet Bridge</span>
      <SparkTrustBadge label="Placeholder aman" tone="safe" copy="Belum mengaktifkan koneksi wallet produksi." />
    </div>
    <h2>{learningState.walletStatus === 'ready' ? 'Wallet readiness siap' : 'Wallet masih opsional'}</h2>
    <p>Panel ini menyiapkan ruang untuk StarknetKit tanpa mengaktifkan real wallet integration sebelum grant/backend siap.</p>
    <div class="wallet-stage-list">
      {#each walletBridgeStages as stage}
        <article><strong>{stage.title}</strong><small>{stage.copy}</small></article>
      {/each}
    </div>
  </div>
  <div class="wallet-placeholder-actions">
    {#if learningState.walletStatus === 'ready'}
      <SparkButton onclick={resetWalletReadiness} variant="secondary">Reset Status</SparkButton>
    {:else}
      <SparkButton onclick={markWalletReady}>Tandai Siap Wallet</SparkButton>
    {/if}
  </div>
</SparkCard>

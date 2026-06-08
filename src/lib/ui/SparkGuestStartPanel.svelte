<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';
</script>

{#if !betaSession.user}
  <SparkCard class="spark-guest-start-panel">
    <span><SparkIcon name="login" size={22} /></span>
    <div>
      <div class="guest-start-head">
        <span class="spark-eyebrow">Coba sebagai pengguna</span>
        <SparkTrustBadge label="Akun contoh lokal" tone="local" />
      </div>
      <h2>Masuk dulu agar Spark terasa seperti aplikasi nyata.</h2>
      <p>Setelah masuk, kamu akan diarahkan ke Dashboard, lalu bisa lanjut ke Core, Lesson, Lab, Passport, Community, dan Hub.</p>
    </div>
    <div class="guest-start-actions">
      <SparkButton href="/login">Masuk dengan Akun Contoh</SparkButton>
      <SparkButton href="/core" variant="secondary">Lihat Core dulu</SparkButton>
    </div>
  </SparkCard>
{/if}

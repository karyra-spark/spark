<script lang="ts">
  import type { Snippet } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';

  type Props = {
    children: Snippet;
    title?: string;
    copy?: string;
  };

  let {
    children,
    title = 'Masuk untuk membuka halaman ini',
    copy = 'Area ini menyimpan progres, Passport, pesan, dan pengaturan belajar kamu.'
  }: Props = $props();

  let redirecting = $state(false);
  const nextHref = $derived(`${page.url.pathname}${page.url.search}`);
  const loginHref = $derived(`/login?next=${encodeURIComponent(nextHref)}`);
  const checkingSession = $derived(betaSession.hydrating && !betaSession.user);

  $effect(() => {
    if (!betaSession.ready || betaSession.hydrating || betaSession.user || redirecting) return;
    redirecting = true;
    setTimeout(() => {
      void goto(loginHref, { replaceState: true });
    }, 120);
  });
</script>

{#if betaSession.user}
  {@render children()}
{:else if checkingSession}
  <section class="spark-auth-gate pass35-auth-gate" aria-live="polite">
    <div>
      <span><SparkIcon name="shield" size={22} /></span>
      <p class="spark-eyebrow">Memeriksa akun</p>
      <h1>Menghubungkan ruang belajarmu</h1>
      <p>Kami sedang memastikan akunmu masih bisa dilanjutkan dengan aman.</p>
    </div>
  </section>
{:else}
  <section class="spark-auth-gate pass35-auth-gate" aria-live="polite">
    <div>
      <span><SparkIcon name="lock" size={22} /></span>
      <p class="spark-eyebrow">Akses pribadi</p>
      <h1>{title}</h1>
      <p>{copy}</p>
      <div class="pass35-auth-gate-actions">
        <SparkButton href={loginHref}>Masuk untuk Lanjutkan</SparkButton>
        <SparkButton href="/" variant="secondary">Kembali ke Beranda</SparkButton>
      </div>
    </div>
  </section>
{/if}

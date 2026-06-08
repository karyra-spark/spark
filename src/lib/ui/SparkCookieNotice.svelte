<script lang="ts">
  import { onMount } from 'svelte';
  import SparkIcon from './SparkIcon.svelte';

  const CONSENT_KEY = 'karyra-spark-cookie-choice-v1';
  let visible = $state(false);

  function getCookie(name: string) {
    if (typeof document === 'undefined') return '';
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1] ?? '';
  }

  onMount(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY) || getCookie(CONSENT_KEY);
    visible = stored !== 'essential' && stored !== 'accepted';
  });

  function saveChoice(value: 'essential' | 'accepted') {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CONSENT_KEY, value);
      document.cookie = `${CONSENT_KEY}=${value}; Max-Age=31536000; Path=/; SameSite=Lax`;
    }
    visible = false;
  }
</script>

{#if visible}
  <aside class="spark-cookie-notice" aria-label="Pilihan cookie">
    <span><SparkIcon name="shield" size={17} /></span>
    <div>
      <strong>Cookie penting untuk pengalaman belajar</strong>
      <p>Spark memakai cookie penting untuk tema, akses akun, dan preferensi tampilan. Spark tidak pernah meminta seed phrase atau private key.</p>
      <a href="/terms">Baca ketentuan</a>
    </div>
    <div class="spark-cookie-actions">
      <button type="button" onclick={() => saveChoice('essential')}>Pakai yang penting saja</button>
      <button type="button" class="primary" onclick={() => saveChoice('accepted')}>Setuju dan lanjutkan</button>
    </div>
  </aside>
{/if}

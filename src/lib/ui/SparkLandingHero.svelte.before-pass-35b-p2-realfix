<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';

  const primaryHref = $derived(betaSession.user ? '/dashboard' : '/login');
  const primaryLabel = $derived(betaSession.user ? 'Buka Dashboard' : 'Masuk dan mulai belajar');
</script>

<section class="landing-hero-v26 pass35b2-hero">
  <div class="landing-hero-copy pass35b2-hero-copy">
    <div class="landing-kicker-row pass35b2-kicker-row">
      <SparkTrustBadge label="Readiness-first" tone="safe" />
      <span>Core · Lab · Passport · Community · Hub</span>
    </div>

    <h1>Belajar blockchain dengan jalur yang aman, jelas, dan bertahap.</h1>

    <p>Spark membantu pengguna lokal mulai dari pemahaman dasar, latihan aman, Passport kesiapan, lalu eksplorasi Starknet tanpa terburu-buru masuk transaksi.</p>

    <div class="landing-hero-actions pass35b2-hero-actions">
      <SparkButton href={primaryHref}>{primaryLabel}</SparkButton>
      <SparkButton href="/core" variant="secondary">Lihat jalur belajar</SparkButton>
    </div>

    <div class="landing-hero-trust pass35b2-trust-chips">
      <span><SparkIcon name="shield" size={14} /> Tanpa seed phrase</span>
      <span><SparkIcon name="flask-conical" size={14} /> Simulasi aman</span>
      <span><SparkIcon name="users" size={14} /> Komunitas lokal</span>
    </div>
  </div>

  <aside class="pass35b2-product-preview" aria-label="Preview jalur belajar Spark">
    <div class="preview-main-step">
      <span><SparkIcon name="book-open" size={24} /></span>
      <div>
        <small>Lesson pertama</small>
        <strong>Apa itu blockchain?</strong>
        <p>Mulai dari bahasa sederhana sebelum wallet, transaksi, atau coding.</p>
      </div>
    </div>

    <div class="preview-step-grid" aria-label="Jalur utama">
      <a href="/core"><SparkIcon name="book-open" size={15} /> Belajar dasar</a>
      <a href="/lab"><SparkIcon name="flask-conical" size={15} /> Latihan aman</a>
      <a href="/profile"><SparkIcon name="badge" size={15} /> Cek Passport</a>
      <a href="/hub"><SparkIcon name="compass" size={15} /> Jelajah Hub</a>
    </div>

    <div class="preview-caption">
      <strong>Fondasi → Praktik → Siap jelajah</strong>
      <p>Satu jalur bertahap untuk pengguna lokal yang baru mengenal Web3 dan Starknet.</p>
    </div>
  </aside>
</section>

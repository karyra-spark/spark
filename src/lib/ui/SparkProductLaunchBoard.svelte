<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getReadinessScore,
    getRecommendedLessonSlug,
    learningState
  } from '$state/learning-state.svelte';

  const primaryHref = $derived(betaSession.user ? '/dashboard' : '/login');
  const primaryLabel = $derived(betaSession.user ? 'Buka Dashboard' : 'Masuk Mode coba');

  const steps = [
    { title: 'Core', copy: 'Fondasi blockchain, crypto, Web3, dan Starknet.', href: '/core', icon: 'book-open' },
    { title: 'Lab', copy: 'Simulasi aman sebelum praktik teknis.', href: '/lab', icon: 'flask-conical' },
    { title: 'Passport', copy: 'Bukti readiness dari belajar, praktik, dan komunitas.', href: '/profile', icon: 'badge' },
    { title: 'Hub', copy: 'Gateway resource dan eksplorasi ekosistem.', href: '/hub', icon: 'compass' }
  ];
</script>

<section class="spark-launch-board">
  <div class="launch-left">
    <span class="spark-eyebrow">Karyra Spark</span>
    <h1>Satu alur untuk belajar, praktik, komunitas, Passport, dan Hub.</h1>
    <p>
      Spark membantu pengguna lokal memahami blockchain dan Starknet secara bertahap:
      mulai dari fondasi, masuk simulasi aman, membangun readiness, lalu menjelajah ekosistem.
    </p>

    <div class="launch-actions">
      <SparkButton href={primaryHref}>{primaryLabel}</SparkButton>
      <SparkButton href={`/lesson/${getRecommendedLessonSlug()}`} variant="secondary">Mulai materi</SparkButton>
    </div>

    <div class="launch-proof-strip">
      <div><strong>{getCompletedLessonCount()}</strong><span>lesson</span></div>
      <div><strong>{learningState.completedLabIds.length}</strong><span>lab</span></div>
      <div><strong>{gatewayState.registeredWorkshopIds.length}</strong><span>workshop</span></div>
      <div><strong>{getReadinessScore()}%</strong><span>readiness</span></div>
    </div>
  </div>

  <aside class="launch-console">
    <div class="launch-console-head">
      <SparkTrustBadge label={betaSession.user ? 'Session aktif' : 'Mode coba tersedia'} tone={betaSession.user ? 'safe' : 'beta'} />
      <span>{getLearningProgressPercent()}% progress</span>
    </div>

    <div class="launch-readiness-orbit">
      <div class="launch-orbit-ring" style={`--value:${getReadinessScore()}`}>
        <strong>{getReadinessScore()}%</strong>
        <span>Passport</span>
      </div>
      <div class="launch-orbit-copy">
        <h2>Belajar → Praktik → Terbukti.</h2>
        <p>Dashboard memberi langkah harian, Core memberi kurikulum, Lab memberi proof, dan Hub memberi arah eksplorasi.</p>
      </div>
    </div>

    <div class="launch-flow-grid">
      {#each steps as step}
        <a href={step.href}>
          <span><SparkIcon name={step.icon} size={17} /></span>
          <div><strong>{step.title}</strong><small>{step.copy}</small></div>
        </a>
      {/each}
    </div>
  </aside>
</section>

<section class="spark-launch-mission">
  <SparkCard class="mission-card primary">
    <div>
      <span class="spark-eyebrow">Langkah terbaik sekarang</span>
      <h2>{getCompletedLessonCount() === 0 ? 'Mulai dari Core, bukan langsung Hub.' : learningState.completedLabIds.length === 0 ? 'Ubah pemahaman menjadi praktik.' : 'Lihat langkah agar siap dan lanjut ke Hub.'}</h2>
      <p>
        {getCompletedLessonCount() === 0
          ? 'Pengguna pemula butuh fondasi dulu agar tidak bingung dengan wallet, testnet, atau Cairo.'
          : learningState.completedLabIds.length === 0
            ? 'Lab membuat proses belajar terasa nyata lewat simulasi dan checklist aman.'
            : 'Passport membantu menentukan apakah pengguna siap menjelajah resource lanjutan.'}
      </p>
    </div>
    <SparkButton href={getCompletedLessonCount() === 0 ? '/core' : learningState.completedLabIds.length === 0 ? '/lab' : '/profile'}>Lanjutkan</SparkButton>
  </SparkCard>

  <div class="mission-mini-grid">
    <SparkCard><SparkIcon name="messages" size={18} /><strong>Inbox aktif</strong><small>Pesan sistem dan arahan belajar tersedia.</small></SparkCard>
    <SparkCard><SparkIcon name="users" size={18} /><strong>Komunitas</strong><small>Workshop dan cohort menjadi jembatan offline.</small></SparkCard>
    <SparkCard><SparkIcon name="shield" size={18} /><strong>Guardrail</strong><small>Penjelajah teknis tetap diberi peringatan risiko.</small></SparkCard>
  </div>
</section>

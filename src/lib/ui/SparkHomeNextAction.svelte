<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import { getCompletedLessonCount, getReadinessScore, learningState } from '$state/learning-state.svelte';

  const nextAction = $derived.by(() => {
    if (!betaSession.user) {
      return {
        href: '/login',
        label: 'Masuk dengan akun contoh',
        copy: 'Coba pengalaman aplikasi nyata: dashboard, belajar, praktik, Passport, komunitas, dan Hub.',
        icon: 'login',
        tone: 'blue'
      };
    }

    if (getCompletedLessonCount() === 0) {
      return {
        href: '/core',
        label: 'Mulai dari Spark Core',
        copy: 'Bangun fondasi blockchain, Web3, dan Starknet dari jalur belajar utama.',
        icon: 'book-open',
        tone: 'blue'
      };
    }

    if (learningState.completedLabIds.length === 0) {
      return {
        href: '/lab',
        label: 'Lanjut Praktik di Lab',
        copy: 'Ubah pemahaman menjadi praktik aman dan proof-of-practice.',
        icon: 'flask-conical',
        tone: 'purple'
      };
    }

    if (gatewayState.registeredWorkshopIds.length === 0) {
      return {
        href: '/community',
        label: 'Ikut Aktivasi Komunitas',
        copy: 'Sambungkan proses belajar dengan workshop, cohort, dan fasilitator lokal.',
        icon: 'users',
        tone: 'pink'
      };
    }

    if (getReadinessScore() < 75) {
      return {
        href: '/profile',
        label: 'Bangun Passport',
        copy: 'Lengkapi sinyal readiness sebelum masuk eksplorasi Hub lebih jauh.',
        icon: 'badge',
        tone: 'green'
      };
    }

    return {
      href: '/hub',
      label: 'Masuk Spark Hub',
      copy: 'Readiness sudah cukup untuk mulai menjelajahi resource dan ekosistem.',
      icon: 'compass',
      tone: 'blue'
    };
  });
</script>

<SparkCard class="spark-home-next-action">
  <div class="next-action-main">
    <span class={`next-action-icon ${nextAction.tone}`}>
      <SparkIcon name={nextAction.icon} size={20} />
    </span>
    <div>
      <span class="spark-eyebrow">Langkah berikutnya</span>
      <h2>{nextAction.label}</h2>
      <p>{nextAction.copy}</p>
    </div>
  </div>

  <SparkButton href={nextAction.href}>Lanjutkan</SparkButton>
</SparkCard>

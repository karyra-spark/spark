<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkPassportBadge from './SparkPassportBadge.svelte';

  const previewSteps = [
    {
      title: 'Selesaikan Core Beginner',
      copy: 'Bangun pemahaman dasar sebelum masuk ke latihan praktik.',
      href: '/core',
      cta: 'Mulai Core Beginner',
      icon: 'book-open'
    },
    {
      title: 'Coba Lab Beginner',
      copy: 'Latihan aman membantu membuktikan bahwa kamu tidak hanya membaca, tapi juga bisa mengambil keputusan.',
      href: '/lab',
      cta: 'Mulai Simulasi Aman',
      icon: 'flask-conical'
    },
    {
      title: 'Bangun Passport',
      copy: 'Setelah cukup bukti belajar dan praktik, Passport menampilkan kesiapanmu secara ringkas.',
      href: '/register',
      cta: 'Buat Akun Gratis',
      icon: 'passport'
    }
  ];
</script>

<section class="passport-guest-preview-shell" data-pass68e-passport-preview="guest">
  <section class="passport-guest-hero">
    <div class="passport-guest-copy">
      <span class="spark-eyebrow">Preview Passport</span>
      <h1>Lihat seperti apa kesiapanmu akan terbaca.</h1>
      <p>
        Passport Spark merangkum pelajaran, latihan aman, dan partisipasi komunitas menjadi gambaran kesiapan yang mudah dipahami. Kamu bisa melihat nilai Passport sebelum membuat akun.
      </p>
      <div class="passport-guest-actions">
        <SparkButton href="/register">Daftar Gratis & Mulai Bangun Passport</SparkButton>
        <SparkButton href="/core" variant="secondary">Coba Lesson Pertama</SparkButton>
      </div>
      <small>Contoh ini hanya preview. Passport milikmu akan dibuat dari progres yang benar-benar kamu selesaikan.</small>
    </div>

    <aside class="passport-guest-badge" aria-label="Contoh tampilan Passport Spark">
      <div class="passport-guest-sample-label">Contoh</div>
      <SparkPassportBadge
        levelLabel="Beginner"
        statusLabel="Contoh"
        verificationLabel="Belajar mandiri"
        proofCode="SPK-CONTOH"
        locked={false}
      />
    </aside>
  </section>

  <section class="passport-guest-value-grid" aria-label="Nilai Passport untuk pengguna">
    <article>
      <span><SparkIcon name="checklist" size={18} /></span>
      <strong>Apa yang sudah kamu kuasai</strong>
      <p>Core dan Lab membantu Passport membaca pemahaman dasar, praktik aman, dan kesiapan awal.</p>
    </article>
    <article>
      <span><SparkIcon name="target" size={18} /></span>
      <strong>Apa langkah berikutnya</strong>
      <p>Passport tidak hanya menampilkan angka. Ia menunjukkan langkah yang paling dekat untuk kamu selesaikan.</p>
    </article>
    <article>
      <span><SparkIcon name="shield" size={18} /></span>
      <strong>Bukti tanpa data berlebihan</strong>
      <p>Jawaban mentah dan catatan pribadi tidak ditampilkan. Yang dirangkum hanya sinyal kesiapan belajar.</p>
    </article>
  </section>

  <section class="passport-guest-roadmap-card">
    <div>
      <span class="spark-eyebrow">Mulai dari tiga langkah</span>
      <h2>Bangun Passport dari aktivitas nyata, bukan klaim manual.</h2>
      <p>Ikuti jalur ini agar Passport punya alasan yang jelas saat menampilkan status kesiapanmu.</p>
    </div>

    <div class="passport-guest-step-list">
      {#each previewSteps as step, index}
        <a href={step.href}>
          <span>{index + 1}</span>
          <div>
            <small><SparkIcon name={step.icon} size={14} /> {step.cta}</small>
            <strong>{step.title}</strong>
            <p>{step.copy}</p>
          </div>
        </a>
      {/each}
    </div>
  </section>
</section>

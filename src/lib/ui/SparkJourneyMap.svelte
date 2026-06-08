<script lang="ts">
  const productSteps = [
    {
      label: '01',
      title: 'Learn',
      copy: 'Core, lesson, checkpoint, glossary, notes.',
      href: '/core',
      focus: 'learn'
    },
    {
      label: '02',
      title: 'Practice',
      copy: 'Lab aman, bridge warning, proof of practice.',
      href: '/lab',
      focus: 'practice'
    },
    {
      label: '03',
      title: 'Community',
      copy: 'Workshop, cohort, fasilitator lokal.',
      href: '/community',
      focus: 'community'
    },
    {
      label: '04',
      title: 'Passport',
      copy: 'Progress, readiness, bukti perjalanan.',
      href: '/profile',
      focus: 'passport'
    },
    {
      label: '05',
      title: 'Hub',
      copy: 'Resource, apps, tools, komunitas.',
      href: '/hub',
      focus: 'hub'
    }
  ];
</script>

<section class="spark-journey-map">
  <div class="journey-head">
    <span class="spark-eyebrow">Perjalanan Spark</span>
    <h2>Belajar sampai siap menjelajah ekosistem.</h2>
    <p>Alur natural Spark: Core, Lab, Community, Passport, lalu Hub.</p>
  </div>

  <div class="journey-rail">
    {#each productSteps as step}
      <a href={step.href} class={`journey-step ${step.focus}`}>
        <span>{step.label}</span>
        <strong>{step.title}</strong>
        <small>{step.copy}</small>
      </a>
    {/each}
  </div>
</section>

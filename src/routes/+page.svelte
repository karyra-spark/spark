<script lang="ts">
  import SparkLandingAudience from '$ui/SparkLandingAudience.svelte';
  import SparkLandingCTA from '$ui/SparkLandingCTA.svelte';
  import SparkLandingDifference from '$ui/SparkLandingDifference.svelte';
  import SparkLandingFeaturePreview from '$ui/SparkLandingFeaturePreview.svelte';
  import SparkLandingFlow from '$ui/SparkLandingFlow.svelte';
  import SparkLandingHero from '$ui/SparkLandingHero.svelte';
  import SparkLandingProblem from '$ui/SparkLandingProblem.svelte';
  import SparkGuestLandingRedirect from '$ui/SparkGuestLandingRedirect.svelte';
</script>

<svelte:head>
  <title>Karyra Spark — Belajar blockchain dan Starknet bertahap</title>
  <meta
    name="description"
    content="Karyra Spark membantu pemula belajar blockchain, keamanan dompet, praktik aman, komunitas, dan jalur Starknet secara bertahap."
  />
</svelte:head>

<SparkGuestLandingRedirect />

<div class="landing-page-v26 pass35b-public-home">
  <SparkLandingHero />
  <SparkLandingProblem />
  <SparkLandingFlow />
  <SparkLandingAudience />
  <SparkLandingDifference />
  <SparkLandingFeaturePreview />
  <SparkLandingCTA />
</div>

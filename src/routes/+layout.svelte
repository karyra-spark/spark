<script lang="ts">
  import '../app.css';
  import '$lib/styles/theme-assets.css';
  import '$lib/styles/learning-experience.css';
  import '$lib/styles/gateway-surfaces.css';
  import '$lib/styles/starknet-theme.css';
  import '$lib/styles/production-flow.css';
  import '$lib/styles/mobile-ux.css';
  import '$lib/styles/navigation-surfaces.css';
  import '$lib/styles/core-lesson-experience.css';
  import '$lib/styles/profile-navigation.css';
  import '$lib/styles/community-hub.css';
  import '$lib/styles/home-lab.css';
  import '$lib/styles/guided-safety-ux.css';
  import '$lib/styles/trust-labels.css';
  import '$lib/styles/public-navigation-beta.css';
  import '$lib/styles/dashboard-app-flow.css';
  import '$lib/styles/app-navigation-flow.css';
  import '$lib/styles/learning-completion-flow.css';
  import '$lib/styles/dashboard-profile-layout.css';
  import '$lib/styles/readiness-qa.css';
  import '$lib/styles/notifications-messaging.css';
  import '$lib/styles/lab-community-profile.css';
  import '$lib/styles/hub-dashboard-settings.css';
  import '$lib/styles/mobile-density.css';
  import '$lib/styles/product-composition.css';
  import '$lib/styles/landing-identity-footer.css';
  import '$lib/styles/learning-center.css';
  import '$lib/styles/profile-passport-account.css';
  import '$lib/styles/profile-passport-notifications.css';
  import '$lib/styles/surface-foundation.css';
  import '$lib/styles/auth-public-surface.css';
  import '$lib/styles/foundation-ui.css';
  import '$lib/styles/surface-rhythm.css';
  import '$lib/styles/public-trust-copy.css';
  import '$lib/styles/journey-copy.css';
  import '$lib/styles/core-lab-flow.css';
  import '$lib/styles/passport-explainability.css';
  import '$lib/styles/desktop-layout.css';
  import '$lib/styles/beta-signal.css';
  import SparkAppShell from '$shell/SparkAppShell.svelte';

  let { children } = $props();
</script>

<SparkAppShell>
  {@render children()}
</SparkAppShell>

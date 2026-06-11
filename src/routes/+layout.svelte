<script lang="ts">
  import { page } from '$app/state';
  import '../app.css';
  import '$lib/styles/pass-2-integration-theme-assets.css';
  import '$lib/styles/pass-3-learning-experience.css';
  import '$lib/styles/pass-4-gateway-surfaces.css';
  import '$lib/styles/pass-5-starknet-theme.css';
  import '$lib/styles/pass-6-natural-production-flow.css';
  import '$lib/styles/pass-7-mobile-ux-production-cleanup.css';
  import '$lib/styles/pass-8-asset-nav-surface-unification.css';
  import '$lib/styles/pass-9-core-lesson-experience.css';
  import '$lib/styles/pass-10-profile-navigation-recovery.css';
  import '$lib/styles/pass-11-community-hub-recovery.css';
  import '$lib/styles/pass-12-home-lab-recovery.css';
  import '$lib/styles/pass-13ad-safe-advanced-guided-ux.css';
  import '$lib/styles/pass-14-production-label-trust-cleanup.css';
  import '$lib/styles/pass-15-public-navigation-beta-access.css';
  import '$lib/styles/pass-16-user-dashboard-real-app-flow.css';
  import '$lib/styles/pass-17-app-navigation-flow-polish.css';
  import '$lib/styles/pass-18-learning-flow-completion-polish.css';
  import '$lib/styles/pass-19-dashboard-profile-separation.css';
  import '$lib/styles/pass-20-frontend-readiness-qa-polish.css';
  import '$lib/styles/pass-21-visual-parity-notifications-messaging.css';
  import '$lib/styles/pass-22-lab-community-profile-richness.css';
  import '$lib/styles/pass-23-hub-dashboard-settings-richness.css';
  import '$lib/styles/pass-24-mobile-density-product-feel.css';
  import '$lib/styles/pass-25-aggressive-product-composition.css';
  import '$lib/styles/pass-26-home-landing-identity-footer.css';
  import '$lib/styles/pass-27-core-learn-learning-center.css';
  import '$lib/styles/pass-28-profile-passport-account-center.css';
  import '$lib/styles/pass-32-profile-passport-notification-repair.css';
  import '$lib/styles/pass-34-production-surface-foundation.css';
  import '$lib/styles/pass-35-auth-public-surface-cleanup.css';
  import '$lib/styles/pass-35b-foundation-ui-consolidation.css';
  import '$lib/styles/pass-35b-patch-1-surface-rhythm-repair.css';
  import '$lib/styles/pass-68a-public-trust-copy-contract.css';
  import '$lib/styles/pass-68c-main-journey-copy-sweep.css';
  import '$lib/styles/pass-68d-core-lab-flow-cleanup.css';
  import '$lib/styles/pass-68e-passport-explainability-preview.css';
  import '$lib/styles/pass-68k-desktop-layout-repair.css';
  import '$lib/styles/pass-68l-beta-signal.css';
  import SparkAppShell from '$shell/SparkAppShell.svelte';

  let { children } = $props();
</script>

{#if page.url.pathname.startsWith('/admin')}
  {@render children()}
{:else}
  <SparkAppShell>
    {@render children()}
  </SparkAppShell>
{/if}

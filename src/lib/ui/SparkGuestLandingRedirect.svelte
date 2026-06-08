<script lang="ts">
  import { goto } from '$app/navigation';
  import { betaSession } from '$state/beta-session-state.svelte';

  let redirecting = $state(false);

  $effect(() => {
    if (!betaSession.ready || !betaSession.user || redirecting) return;
    redirecting = true;
    void goto('/dashboard', { replaceState: true });
  });
</script>

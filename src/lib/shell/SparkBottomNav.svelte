<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { isNavActive, primaryMobileNavItems } from '$lib/content/spark-navigation';
  import SparkIcon from '$ui/SparkIcon.svelte';

  let hidden = $state(false);

  const mobileItems = primaryMobileNavItems.map((item) => ({
    href: item.href,
    shortLabel: item.shortLabel,
    icon: item.icon
  }));

  onMount(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function updateVisibility() {
      const nextY = Math.max(0, window.scrollY);
      const diff = nextY - lastY;

      if (Math.abs(diff) > 8) {
        hidden = diff > 0 && nextY > 116;
        lastY = nextY;
      }

      if (nextY < 24) hidden = false;
      ticking = false;
    }

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav class:hidden class="spark-bottom-nav pass35b-bottom-nav" aria-label="Navigasi mobile">
  {#each mobileItems as item}
    <a href={item.href} class:active={isNavActive(page.url.pathname, item.href)}>
      <SparkIcon name={item.icon} size={18} />
      <span>{item.shortLabel}</span>
    </a>
  {/each}
</nav>

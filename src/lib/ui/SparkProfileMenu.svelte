<script lang="ts">
  import SparkIcon from './SparkIcon.svelte';
  import { profileMenuItems } from '$lib/profile/profile-model';
</script>

<nav class="spark-profile-menu" aria-label="Menu profil">
  {#each profileMenuItems as item}
    <a href={item.href}>
      <span><SparkIcon name={item.icon} size={18} /></span>
      <div>
        <strong>{item.label}</strong>
        <small>{item.copy}</small>
      </div>
      <em>›</em>
    </a>
  {/each}
</nav>

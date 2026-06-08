<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { getHubAccessCopy } from '$lib/profile/profile-model';
  import { getReadinessScore } from '$state/learning-state.svelte';

  const access = $derived(getHubAccessCopy(getReadinessScore()));
</script>

<SparkCard class={`spark-home-hub-preview ${access.unlocked ? 'unlocked' : 'locked'}`}>
  <span><SparkIcon name={access.unlocked ? 'compass' : 'lock'} size={23} /></span>
  <div>
    <span class="spark-eyebrow">Spark Hub</span>
    <h3>{access.unlocked ? 'Hub sudah terbuka' : 'Gateway setelah Passport cukup'}</h3>
    <p>{access.copy}</p>
  </div>
  <SparkButton href={access.href} variant="secondary">{access.unlocked ? 'Masuk Hub' : 'Progress'}</SparkButton>
</SparkCard>

<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { labPositionCopy } from '$lib/lab/lab-model';
</script>

<SparkCard class="spark-lab-position-card">
  <span class="lab-position-icon"><SparkIcon name="flask-conical" size={24} /></span>
  <div>
    <span class="spark-eyebrow">Peran Lab</span>
    <h2>{labPositionCopy.title}</h2>
    <p>{labPositionCopy.copy}</p>
  </div>
  <SparkButton href="/core" variant="secondary">Review Core</SparkButton>
</SparkCard>

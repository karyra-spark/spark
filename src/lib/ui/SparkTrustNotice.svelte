<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { trustLabels } from '$lib/trust/trust-model';

  type Props = {
    type?: 'beta' | 'localData' | 'targetMetric' | 'placeholder';
    title?: string;
    copy?: string;
  };

  let { type = 'beta', title = '', copy = '' }: Props = $props();
  const data = $derived(trustLabels[type]);
</script>

<SparkCard class={`spark-trust-notice ${data.tone}`}>
  <span><SparkIcon name={type === 'placeholder' ? 'shield' : type === 'targetMetric' ? 'target' : 'sparkles'} size={19} /></span>
  <div>
    <SparkTrustBadge label={data.label} copy={data.copy} tone={data.tone} />
    <strong>{title || data.label}</strong>
    <p>{copy || data.copy}</p>
  </div>
</SparkCard>

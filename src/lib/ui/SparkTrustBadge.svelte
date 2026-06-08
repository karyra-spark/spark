<script lang="ts">
  import type { TrustLabelTone } from '$lib/trust/trust-model';

  type Props = {
    label: string;
    copy?: string;
    tone?: TrustLabelTone;
  };

  let { label, copy = '', tone = 'neutral' }: Props = $props();
</script>

<span class={`spark-trust-badge ${tone}`} title={copy}>
  {label}
</span>

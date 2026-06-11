<script lang="ts">
  type Tone = 'success' | 'warning' | 'danger' | 'neutral' | 'info';
  let { label, tone = 'neutral' }: { label: string; tone?: Tone } = $props();
</script>

<span class="admin-status-badge" data-tone={tone}>{label}</span>

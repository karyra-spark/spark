<script lang="ts">
  type Props = {
    eyebrow: string;
    title: string;
    copy?: string;
  };

  let { eyebrow, title, copy = '' }: Props = $props();
</script>

<div class="spark-section-head unified">
  <div>
    <span class="spark-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {#if copy}
      <p>{copy}</p>
    {/if}
  </div>
</div>

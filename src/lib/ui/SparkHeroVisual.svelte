<script lang="ts">
  type Props = {
    mode?: 'gateway' | 'learn' | 'practice' | 'community' | 'hub' | 'profile';
  };

  let { mode = 'gateway' }: Props = $props();
</script>

<div class={`spark-hero-visual ${mode}`} aria-hidden="true">
  <div class="orbit orbit-one"></div>
  <div class="orbit orbit-two"></div>
  <div class="node node-one"></div>
  <div class="node node-two"></div>
  <div class="node node-three"></div>
  <div class="spark-core-glyph">✦</div>
</div>

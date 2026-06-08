<script lang="ts">
  import { sparkPalette, sparkThemeDirection } from '$lib/theme/spark-palette';
</script>

<section class="spark-palette-preview">
  <div class="palette-head">
    <span class="spark-eyebrow">Theme direction</span>
    <h2>{sparkThemeDirection.label}</h2>
    <p>{sparkThemeDirection.copy}</p>
  </div>

  <div class="palette-grid">
    {#each sparkPalette as color}
      <article class="palette-token">
        <span class="palette-swatch" style={`--light: ${color.light}; --dark: ${color.dark}`}></span>
        <div>
          <strong>{color.name}</strong>
          <small>{color.token}</small>
          <p>{color.usage}</p>
        </div>
      </article>
    {/each}
  </div>
</section>

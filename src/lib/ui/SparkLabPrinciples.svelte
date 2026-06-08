<script lang="ts">
  import { labPrinciples } from '$lib/lab/lab-model';
</script>

<div class="spark-lab-principles">
  {#each labPrinciples as item}
    <article>
      <h3>{item.title}</h3>
      <p>{item.copy}</p>
    </article>
  {/each}
</div>

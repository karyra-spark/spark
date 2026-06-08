<script lang="ts">
  import { afterNavigate, beforeNavigate } from '$app/navigation';

  let active = $state(false);
  let value = $state(0);
  let timer: ReturnType<typeof setInterval> | undefined;

  function clearTimer() {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
  }

  function start() {
    clearTimer();
    active = true;
    value = 10;

    timer = setInterval(() => {
      value = Math.min(88, value + Math.max(2, Math.round((90 - value) / 8)));
    }, 110);
  }

  function finish() {
    clearTimer();
    value = 100;

    setTimeout(() => {
      active = false;
      value = 0;
    }, 220);
  }

  beforeNavigate(() => {
    start();
  });

  afterNavigate(() => {
    finish();
  });
</script>

{#if active}
  <div class="spark-route-progress" aria-hidden="true">
    <span style={`width: ${value}%`}></span>
  </div>
{/if}

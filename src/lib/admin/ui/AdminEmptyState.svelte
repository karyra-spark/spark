<script lang="ts">
  type State = 'empty' | 'loading' | 'error' | 'locked';
  let {
    title,
    detail,
    state = 'empty'
  }: { title: string; detail: string; state?: State } = $props();
</script>

<div class="admin-empty-state" data-state={state} aria-live="polite" aria-busy={state === 'loading'}>
  <span>{state === 'loading' ? 'Loading' : state === 'error' ? 'Error' : state === 'locked' ? 'Protected' : 'No records'}</span>
  <strong>{title}</strong>
  <p>{detail}</p>
</div>

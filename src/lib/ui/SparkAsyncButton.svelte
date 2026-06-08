<script lang="ts">
  import type { Snippet } from 'svelte';
  import SparkButton from './SparkButton.svelte';
  import { appState, clearPendingAction, pushToast, setPendingAction } from '$state/app-state.svelte';

  type MaybePromise<T> = T | Promise<T>;

  type Props = {
    id: string;
    successTitle?: string;
    successCopy?: string;
    errorTitle?: string;
    onrun?: () => MaybePromise<void>;
    children: Snippet;
  };

  let {
    id,
    successTitle = 'Aksi selesai',
    successCopy = 'Perubahan berhasil diproses.',
    errorTitle = 'Aksi gagal',
    onrun,
    children
  }: Props = $props();

  const loading = $derived(appState.pendingAction === id);

  async function run() {
    if (loading) return;

    setPendingAction(id);

    try {
      if (onrun) {
        await onrun();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 720));
      }

      pushToast({
        title: successTitle,
        copy: successCopy,
        tone: 'success'
      });
    } catch (error) {
      pushToast({
        title: errorTitle,
        copy: error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses aksi.',
        tone: 'error'
      });
    } finally {
      clearPendingAction();
    }
  }
</script>

<SparkButton loading={loading} onclick={run}>
  {@render children()}
</SparkButton>

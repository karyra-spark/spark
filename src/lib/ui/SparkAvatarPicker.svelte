<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { pushToast } from '$state/app-state.svelte';

  let fileInput: HTMLInputElement | undefined = $state();
  let avatarPreview = $state<string | null>(null);
  let avatarMessage = $state('Foto profil belum diunggah. Placeholder Spark digunakan sementara.');

  const maxAvatarSize = 2 * 1024 * 1024;

  function openAvatarPicker() {
    fileInput?.click();
  }

  function onAvatarSelected(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      avatarMessage = 'Format belum didukung. Gunakan JPG, PNG, atau WebP.';
      input.value = '';
      pushToast({ title: 'Format foto belum didukung', copy: avatarMessage, tone: 'warning' });
      return;
    }

    if (file.size > maxAvatarSize) {
      avatarMessage = 'Ukuran foto terlalu besar. Maksimal 2MB.';
      input.value = '';
      pushToast({ title: 'Foto terlalu besar', copy: avatarMessage, tone: 'warning' });
      return;
    }

    if (avatarPreview?.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview);
    }

    avatarPreview = URL.createObjectURL(file);
    avatarMessage = 'Preview foto berhasil dibuat. Penyimpanan permanen akan dihubungkan saat backend siap.';
    pushToast({ title: 'Preview foto dibuat', copy: 'Foto profil tampil secara lokal di perangkat ini.', tone: 'success' });
  }

  function removeAvatar() {
    if (avatarPreview?.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview);
    }

    avatarPreview = null;
    avatarMessage = 'Foto profil dihapus dari preview. Placeholder Spark digunakan kembali.';
    if (fileInput) fileInput.value = '';
    pushToast({ title: 'Foto dihapus', copy: avatarMessage, tone: 'info' });
  }
</script>

<div class="spark-avatar-picker">
  <div class="avatar-shell">
    {#if avatarPreview}
      <img src={avatarPreview} alt="Foto profil pengguna" />
    {:else}
      <div class="avatar-placeholder" aria-label="Placeholder foto profil Karyra Spark">
        <SparkIcon name="sparkles" size={42} />
        <span>SPARK</span>
      </div>
    {/if}
    <span class="avatar-status" aria-hidden="true"></span>
  </div>

  <input
    bind:this={fileInput}
    class="avatar-input"
    type="file"
    accept="image/png,image/jpeg,image/webp"
    onchange={onAvatarSelected}
  />

  <div class="avatar-actions">
    <SparkButton variant="secondary" onclick={openAvatarPicker}>Ubah Foto</SparkButton>
    {#if avatarPreview}
      <button class="text-action" type="button" onclick={removeAvatar}>Hapus</button>
    {/if}
  </div>

  <p>{avatarMessage}</p>
</div>

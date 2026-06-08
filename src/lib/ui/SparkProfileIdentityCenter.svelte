<script lang="ts">
  import { onMount } from 'svelte';
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { betaSession, getModeLabel } from '$state/beta-session-state.svelte';
  import { pushToast } from '$state/app-state.svelte';
  import { getBackendProfile, updateBackendProfile } from '$lib/api/spark-profile-api';
  import {
    profileState,
    restoreProfileState,
    setAvatarImageData,
    updateProfileIdentity,
    applyBackendProfileSnapshot,
    createProfileUpdatePayload,
    type SparkProfileVisibility
  } from '$state/profile-state.svelte';

  let editOpen = $state(false);
  let editName = $state('');
  let editHandle = $state('');
  let editBio = $state('');
  let editLocation = $state('');
  let editVisibility = $state<SparkProfileVisibility>('community');
  let profileLoading = $state(false);
  let profileSaving = $state(false);
  let profileError = $state('');

  onMount(() => {
    void hydrateProfile();
  });

  async function hydrateProfile() {
    restoreProfileState();
    profileLoading = true;
    profileError = '';

    try {
      const profile = await getBackendProfile();
      if (profile) applyBackendProfileSnapshot(profile);
    } catch (error) {
      profileError = error instanceof Error ? error.message : 'Profil belum bisa dibaca dari Spark API.';
    } finally {
      profileLoading = false;
    }
  }

  const displayName = $derived(profileState.displayName || betaSession.user?.name || 'Pengguna Karyra');
  const handle = $derived(profileState.handle || betaSession.user?.handle || '@karyra');
  const bio = $derived(profileState.bio || 'Belajar blockchain dan Starknet secara bertahap.');
  const location = $derived(profileState.location || 'Komunitas lokal');
  const modeLabel = $derived(betaSession.user ? getModeLabel(betaSession.user.mode) : 'Pemula');
  const visibilityText = $derived(
    profileState.visibility === 'private' ? 'Pribadi' : profileState.visibility === 'public' ? 'Publik' : 'Komunitas'
  );

  function openEditor() {
    editName = displayName;
    editHandle = handle;
    editBio = bio;
    editLocation = location;
    editVisibility = profileState.visibility;
    editOpen = true;
  }

  async function saveEditor() {
    profileSaving = true;
    profileError = '';

    updateProfileIdentity({ displayName: editName, handle: editHandle, bio: editBio, location: editLocation, visibility: editVisibility });

    try {
      const profile = await updateBackendProfile(createProfileUpdatePayload());
      applyBackendProfileSnapshot(profile);
      editOpen = false;
      pushToast({ title: 'Profil diperbarui', copy: 'Perubahan profil sudah disimpan ke akun kamu.', tone: 'success' });
    } catch (error) {
      profileError = error instanceof Error ? error.message : 'Profil belum bisa disimpan ke Spark API.';
      pushToast({ title: 'Profil belum tersimpan', copy: profileError, tone: 'warning' });
    } finally {
      profileSaving = false;
    }
  }

  function handleAvatarUpload(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      pushToast({ title: 'File tidak didukung', copy: 'Gunakan gambar PNG, JPG, atau WebP.', tone: 'warning' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarImageData(reader.result);
        pushToast({ title: 'Foto diperbarui', copy: 'Foto profil sudah disimpan.', tone: 'success' });
      }
    };
    reader.readAsDataURL(file);
  }
</script>

<section class="profile-identity-hero">
  <div class="profile-avatar-card">
    <div class="profile-avatar">
      {#if profileState.avatarImageData}
        <img src={profileState.avatarImageData} alt={`Foto profil ${displayName}`} />
      {:else}
        <span>{displayName.slice(0, 1)}</span>
      {/if}
      <label aria-label="Unggah foto profil">
        <SparkIcon name="camera" size={14} />
        <input type="file" accept="image/png,image/jpeg,image/webp" onchange={handleAvatarUpload} />
      </label>
    </div>

    <div>
      <SparkTrustBadge label="Profil" tone="beta" />
      <h1>{displayName}</h1>
      <p>{handle} · {visibilityText}</p>
      {#if profileLoading}<small>Sedang memuat profil akun...</small>{/if}
    </div>
  </div>

  <aside class="profile-account-card">
    <span><SparkIcon name="user-round" size={22} /></span>
    <div>
      <strong>Akun pribadi</strong>
      <p>Profil berisi identitas akun. Passport Spark dipisahkan sebagai bukti kesiapan belajar dan latihan.</p>
      <div class="profile-actions">
        <SparkButton onclick={openEditor}>Edit profil</SparkButton>
        <SparkButton href="/passport" variant="secondary">Lihat Passport Saya</SparkButton>
      </div>
    </div>
  </aside>
</section>

<section class="profile-info-grid">
  <div class="profile-info-card">
    <span><SparkIcon name="mail" size={18} /></span>
    <div>
      <small>Email</small>
      <strong>{betaSession.user?.email ?? 'Belum tersedia'}</strong>
    </div>
  </div>
  <div class="profile-info-card">
    <span><SparkIcon name="sparkles" size={18} /></span>
    <div>
      <small>Ritme belajar</small>
      <strong>{modeLabel}</strong>
    </div>
  </div>
  <div class="profile-info-card">
    <span><SparkIcon name="users" size={18} /></span>
    <div>
      <small>Lokasi komunitas</small>
      <strong>{location}</strong>
    </div>
  </div>
</section>

<section class="profile-bio-card">
  <div>
    <span class="spark-eyebrow">Tentang kamu</span>
    <h2>Profil singkat</h2>
    <p>{bio}</p>
  </div>
  <SparkButton href="/settings" variant="secondary">Buka Pengaturan</SparkButton>
</section>

{#if editOpen}
  <button class="profile-modal-scrim" type="button" aria-label="Tutup dialog" onclick={() => (editOpen = false)}></button>
  <div class="profile-edit-dialog" role="dialog" aria-modal="true" aria-label="Edit profil">
    <div class="profile-edit-head">
      <div>
        <span class="spark-eyebrow">Profil</span>
        <h2>Edit identitas akun</h2>
      </div>
      <button type="button" aria-label="Tutup" onclick={() => (editOpen = false)}><SparkIcon name="x" size={17} /></button>
    </div>

    {#if profileError}
      <div class="profile-form-error" role="alert">{profileError}</div>
    {/if}

    <label>
      <span>Nama</span>
      <input bind:value={editName} />
    </label>
    <label>
      <span>Handle</span>
      <input bind:value={editHandle} />
    </label>
    <label>
      <span>Lokasi</span>
      <input bind:value={editLocation} />
    </label>
    <label>
      <span>Bio singkat</span>
      <textarea bind:value={editBio}></textarea>
    </label>
    <label>
      <span>Visibilitas</span>
      <select bind:value={editVisibility}>
        <option value="private">Pribadi</option>
        <option value="community">Komunitas</option>
        <option value="public">Publik</option>
      </select>
    </label>

    <div class="profile-edit-actions">
      <SparkButton variant="ghost" onclick={() => (editOpen = false)}>Batal</SparkButton>
      <SparkButton onclick={() => void saveEditor()} loading={profileSaving} disabled={profileSaving}>Simpan perubahan</SparkButton>
    </div>
  </div>
{/if}

<style>
  .profile-identity-hero,
  .profile-info-grid,
  .profile-bio-card {
    display: grid;
    gap: 14px;
  }

  .profile-identity-hero {
    grid-template-columns: minmax(0, 1fr) minmax(280px, .42fr);
    align-items: stretch;
  }

  .profile-avatar-card,
  .profile-account-card,
  .profile-info-card,
  .profile-bio-card {
    border: 1px solid var(--spark-line);
    border-radius: 24px;
    background: var(--spark-card);
    box-shadow: 0 12px 30px rgba(5, 9, 78, 0.06);
  }

  .profile-avatar-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 16px;
    align-items: center;
    padding: clamp(16px, 4vw, 28px);
  }

  .profile-avatar {
    position: relative;
    display: grid;
    place-items: center;
    width: 96px;
    height: 96px;
    border-radius: 28px;
    overflow: hidden;
    color: #fff;
    background: linear-gradient(135deg, var(--spark-blue-strong), #ff7a1a);
  }

  .profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-avatar > span {
    font-size: 38px;
    font-weight: 840;
  }

  .profile-avatar label {
    position: absolute;
    right: 8px;
    bottom: 8px;
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: var(--spark-blue-strong);
    background: #fff;
    box-shadow: 0 6px 18px rgba(15,23,42,.16);
    cursor: pointer;
  }

  .profile-avatar input {
    display: none;
  }

  .profile-avatar-card h1,
  .profile-bio-card h2,
  .profile-form-error {
    padding: 10px 12px;
    border: 1px solid rgba(239, 68, 68, .22);
    border-radius: 14px;
    color: #991b1b;
    background: rgba(254, 226, 226, .72);
    font-size: 13px;
    line-height: 1.45;
  }

  .profile-edit-dialog h2 {
    margin: 6px 0 0;
    color: var(--spark-navy);
    line-height: 1.08;
  }

  .profile-avatar-card h1 {
    font-size: clamp(30px, 6vw, 48px);
    letter-spacing: -.045em;
  }

  :global([data-theme='dark']) .profile-avatar-card h1,
  :global([data-theme='dark']) .profile-account-card strong,
  :global([data-theme='dark']) .profile-info-card strong,
  :global([data-theme='dark']) .profile-bio-card h2,
  :global([data-theme='dark']) .profile-edit-dialog h2 {
    color: #fff;
  }

  .profile-avatar-card p,
  .profile-account-card p,
  .profile-bio-card p,
  .profile-info-card small {
    margin: 0;
    color: var(--spark-muted);
    line-height: 1.55;
  }

  .profile-account-card {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    padding: 16px;
  }

  .profile-account-card > span,
  .profile-info-card > span {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 15px;
    color: var(--spark-blue-strong);
    background: rgba(31,117,255,.1);
  }

  .profile-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }

  .profile-info-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .profile-info-card {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    padding: 14px;
  }

  .profile-info-card strong,
  .profile-info-card small {
    display: block;
  }

  .profile-info-card strong {
    color: var(--spark-navy);
  }

  .profile-bio-card {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    padding: 16px;
  }

  .profile-modal-scrim {
    position: fixed;
    inset: 0;
    z-index: 72;
    border: 0;
    border-radius: 0;
    background: rgba(2, 6, 23, .46);
  }

  .profile-edit-dialog {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 73;
    display: grid;
    width: min(92vw, 520px);
    max-height: 90vh;
    gap: 12px;
    padding: 16px;
    overflow: auto;
    transform: translate(-50%, -50%);
    border: 1px solid var(--spark-line);
    border-radius: 24px;
    background: var(--spark-card);
    box-shadow: 0 26px 80px rgba(2, 6, 23, .26);
  }

  .profile-edit-head,
  .profile-edit-actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
  }

  .profile-edit-head button {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--spark-line);
    border-radius: 50%;
    background: transparent;
    color: var(--spark-muted);
  }

  .profile-edit-dialog label {
    display: grid;
    gap: 6px;
    color: var(--spark-muted);
    font-size: 12px;
    font-weight: 760;
  }

  .profile-edit-dialog input,
  .profile-edit-dialog textarea,
  .profile-edit-dialog select {
    width: 100%;
    border: 1px solid var(--spark-line);
    border-radius: 14px;
    padding: 11px 12px;
    background: rgba(255,255,255,.68);
    color: var(--spark-ink);
    font: inherit;
  }

  .profile-edit-dialog textarea {
    min-height: 92px;
    resize: vertical;
  }

  @media (max-width: 760px) {
    .profile-identity-hero,
    .profile-info-grid,
    .profile-bio-card {
      grid-template-columns: 1fr;
    }

    .profile-avatar-card {
      grid-template-columns: 1fr;
      text-align: left;
    }

    .profile-avatar {
      width: 82px;
      height: 82px;
      border-radius: 24px;
    }
  }
</style>

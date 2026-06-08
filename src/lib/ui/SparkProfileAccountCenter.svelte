<script lang="ts">
  import { onMount } from 'svelte';
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkPassportGauge from './SparkPassportGauge.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import {
    createBadgeRows,
    createProfileActivities,
    profileAvatarPresets,
    profileFriendSuggestions,
    profileTabs,
    visibilityLabel,
    type SparkProfileTab
  } from '$lib/profile/profile-account-model';
  import { betaSession, logoutBetaSession } from '$state/beta-session-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import {
    acceptFriendRequest,
    declineFriendRequest,
    profileState,
    restoreProfileState,
    setAvatarImageData,
    setAvatarPreset,
    toggleFriend,
    updateProfileIdentity,
    type SparkProfileAvatarPreset,
    type SparkProfileVisibility
  } from '$state/profile-state.svelte';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getReadinessScore,
    getRecommendedLessonSlug,
    getTotalLessonCount,
    learningState,
    setExperience,
    type ExperienceLevel
  } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  let activeTab = $state<SparkProfileTab>('passport');
  let editOpen = $state(false);
  let editName = $state('');
  let editHandle = $state('');
  let editBio = $state('');
  let editLocation = $state('');
  let editVisibility = $state<SparkProfileVisibility>('community');

  onMount(() => {
    restoreProfileState();
  });

  const displayName = $derived(profileState.displayName || betaSession.user?.name || 'Pengguna Karyra');
  const handle = $derived(profileState.handle || betaSession.user?.handle || '@karyra');
  const bio = $derived(profileState.bio || 'Belajar blockchain dan Starknet pelan-pelan, mulai dari keamanan, praktik, lalu eksplorasi.');
  const location = $derived(profileState.location || 'Komunitas lokal');
  const readiness = $derived(getReadinessScore());
  const learningProgress = $derived(getLearningProgressPercent());
  const completedLessons = $derived(getCompletedLessonCount());
  const completedLabs = $derived(learningState.completedLabIds.length);
  const savedResources = $derived(gatewayState.savedHubResourceIds.length);
  const registeredWorkshops = $derived(gatewayState.registeredWorkshopIds.length);
  const activePreset = $derived(profileAvatarPresets.find((item) => item.id === profileState.avatarPreset) ?? profileAvatarPresets[0]);
  const activeModeLabel = $derived(learningState.experience === 'explorer' ? 'Penjelajah' : learningState.experience === 'guided' ? 'Terarah' : 'Pemula');

  const readinessStage = $derived(
    readiness >= 75
      ? { title: 'Siap jelajah', copy: 'Fondasi belajarmu cukup untuk mulai membuka Hub dengan tetap hati-hati.', tone: 'safe' as const }
      : readiness >= 45
        ? { title: 'Mulai terbentuk', copy: 'Lanjutkan Learn dan Lab agar Passport makin kuat.', tone: 'target' as const }
        : { title: 'Langkah awal', copy: 'Mulai dari pelajaran dasar dan latihan aman terlebih dahulu.', tone: 'target' as const }
  );

  const nextHref = $derived(readiness >= 75 ? '/hub' : completedLabs === 0 ? '/lab' : `/lesson/${getRecommendedLessonSlug()}`);
  const nextLabel = $derived(readiness >= 75 ? 'Jelajahi Resource Saat Siap' : completedLabs === 0 ? 'Mulai Simulasi Aman' : 'Lanjut belajar');
  const nextCopy = $derived(readiness >= 75 ? 'Jelajahi resource Starknet yang sudah diberi label keamanan.' : completedLabs === 0 ? 'Latihan singkat membantu kamu memahami praktik tanpa risiko.' : 'Satu pelajaran kecil cukup untuk hari ini.');

  const activities = $derived(createProfileActivities({ completedLessons, completedLabs, workshops: registeredWorkshops, resources: savedResources, bookmarks: learningState.bookmarkSlugs.length }));
  const badges = $derived(createBadgeRows({ completedLessons, completedLabs, workshops: registeredWorkshops, resources: savedResources, readiness }));
  const passportSignals = $derived([
    { label: 'Belajar', value: `${completedLessons}/${getTotalLessonCount()}`, copy: 'Pelajaran selesai', icon: 'book-open', href: '/core' },
    { label: 'Latihan', value: `${completedLabs}`, copy: 'Lab selesai', icon: 'flask-conical', href: '/lab' },
    { label: 'Komunitas', value: `${registeredWorkshops}`, copy: 'Workshop tersimpan', icon: 'users', href: '/community' },
    { label: 'Hub', value: `${savedResources}`, copy: 'Resource disimpan', icon: 'compass', href: '/hub' }
  ]);
  const passportSteps = $derived([
    { label: 'Fondasi', done: completedLessons > 0, href: '/core', copy: 'Selesaikan pelajaran awal.' },
    { label: 'Keamanan', done: completedLabs > 0, href: '/lab', copy: 'Coba latihan dompet/transaksi.' },
    { label: 'Komunitas', done: registeredWorkshops > 0, href: '/community', copy: 'Ikuti atau simpan workshop.' },
    { label: 'Eksplorasi', done: readiness >= 75 || savedResources > 0, href: '/hub', copy: 'Buka resource Starknet.' }
  ]);

  function openEditor() {
    editName = displayName;
    editHandle = handle;
    editBio = bio;
    editLocation = location;
    editVisibility = profileState.visibility;
    editOpen = true;
  }

  function saveEditor() {
    updateProfileIdentity({ displayName: editName, handle: editHandle, bio: editBio, location: editLocation, visibility: editVisibility });
    editOpen = false;
    pushToast({ title: 'Ruang Saya diperbarui', copy: 'Profil dan Passport sudah disimpan.', tone: 'success' });
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
        pushToast({ title: 'Foto diperbarui', copy: 'Foto profil sudah masuk ke Ruang Saya.', tone: 'success' });
      }
    };
    reader.readAsDataURL(file);
  }

  function choosePreset(id: SparkProfileAvatarPreset) {
    setAvatarPreset(id);
    pushToast({ title: 'Avatar dipilih', copy: 'Tampilan Ruang Saya diperbarui.', tone: 'success' });
  }

  function acceptRequest(id: string) {
    acceptFriendRequest(id);
    pushToast({ title: 'Koneksi diterima', copy: 'Teman komunitas masuk ke Ruang Saya.', tone: 'success' });
  }

  function changeMode(level: ExperienceLevel) {
    setExperience(level);
    pushToast({ title: 'Cara belajar diganti', copy: `Mode sekarang: ${level === 'beginner' ? 'Pemula' : level === 'guided' ? 'Terarah' : 'Penjelajah'}.`, tone: 'success' });
  }
</script>

<section class="my-space-hero">
  <div class="my-space-profile-card">
    <div class="my-space-avatar" style={`--avatar-a:${activePreset.gradientA};--avatar-b:${activePreset.gradientB}`}>
      {#if profileState.avatarImageData}
        <img src={profileState.avatarImageData} alt={`Foto profil ${displayName}`} />
      {:else}
        <SparkIcon name={activePreset.icon} size={38} />
      {/if}
      <label aria-label="Unggah foto profil">
        <SparkIcon name="camera" size={14} />
        <input type="file" accept="image/png,image/jpeg,image/webp" onchange={handleAvatarUpload} />
      </label>
    </div>

    <div class="my-space-copy">
      <div class="my-space-badges">
        <SparkTrustBadge label="Ruang Saya" tone="beta" />
        <SparkTrustBadge label={readinessStage.title} tone={readinessStage.tone} />
      </div>
      <h1>{displayName}</h1>
      <p class="my-space-handle">{handle} · {visibilityLabel(profileState.visibility)} · {location}</p>
      <p>{bio}</p>
      <div class="my-space-actions">
        <SparkButton onclick={openEditor}>Edit profil</SparkButton>
        <SparkButton href={nextHref} variant="secondary">{nextLabel}</SparkButton>
      </div>
    </div>
  </div>

  <aside class="my-space-passport-card">
    <SparkPassportGauge value={readiness} label="Passport" copy="Kesiapan" />
    <div>
      <span class="spark-eyebrow">Passport</span>
      <strong>{readiness}% kesiapan</strong>
      <p>{readinessStage.copy}</p>
      <small>{learningProgress}% progress belajar · Mode {activeModeLabel}</small>
    </div>
  </aside>
</section>

<section class="my-space-next-card">
  <div>
    <span class="spark-eyebrow">Langkah berikutnya</span>
    <h2>{nextLabel}</h2>
    <p>{nextCopy}</p>
  </div>
  <SparkButton href={nextHref}>Mulai sekarang</SparkButton>
</section>

<section class="my-space-tabs">
  <div class="my-space-tab-list" role="tablist" aria-label="Bagian Ruang Saya">
    {#each profileTabs as tab}
      <button type="button" role="tab" aria-selected={activeTab === tab.key} class:active={activeTab === tab.key} onclick={() => (activeTab = tab.key)}>
        <SparkIcon name={tab.icon} size={15} />
        <span>{tab.label}</span>
      </button>
    {/each}
  </div>

  <div class="my-space-panel">
    {#if activeTab === 'passport'}
      <section class="my-passport-layout">
        <div class="my-passport-signals">
          {#each passportSignals as signal}
            <a href={signal.href}>
              <SparkCard>
                <span><SparkIcon name={signal.icon} size={17} /></span>
                <div><strong>{signal.value}</strong><small>{signal.label}</small><p>{signal.copy}</p></div>
              </SparkCard>
            </a>
          {/each}
        </div>
        <SparkCard class="my-passport-steps">
          <span class="spark-eyebrow">Tanda kesiapan</span>
          <h2>Bangun Passport dari langkah kecil.</h2>
          <div>
            {#each passportSteps as step}
              <a href={step.href} class:done={step.done}>
                <span>{step.done ? '✓' : '•'}</span>
                <div><strong>{step.label}</strong><small>{step.copy}</small></div>
              </a>
            {/each}
          </div>
        </SparkCard>
      </section>
    {:else if activeTab === 'activity'}
      <section class="my-activity-list">
        {#each activities as item}
          <a href={item.href}>
            <SparkCard>
              <span><SparkIcon name={item.icon} size={16} /></span>
              <div><strong>{item.title}</strong><small>{item.copy}</small></div>
              <em>›</em>
            </SparkCard>
          </a>
        {/each}
      </section>
    {:else if activeTab === 'badges'}
      <section class="my-badge-grid">
        {#each badges as badge}
          <SparkCard class={`my-badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}>
            <span><SparkIcon name={badge.icon} size={19} /></span>
            <strong>{badge.title}</strong>
            <p>{badge.copy}</p>
            <SparkTrustBadge label={badge.unlocked ? 'Terbuka' : 'Berikutnya'} tone={badge.unlocked ? 'safe' : 'target'} />
          </SparkCard>
        {/each}
      </section>
    {:else if activeTab === 'friends'}
      <section class="my-community-grid">
        <SparkCard class="my-community-card">
          <span class="spark-eyebrow">Komunitas</span>
          <h2>{profileState.friendRequestIds.length} permintaan baru</h2>
          <p>Koneksi komunitas akan muncul di sini saat fitur sosial aktif untuk akun kamu.</p>
          <div class="my-request-list">
            {#each profileFriendSuggestions.filter((friend) => profileState.friendRequestIds.includes(friend.id)) as friend}
              <div>
                <span><SparkIcon name={friend.icon} size={15} /></span>
                <div><strong>{friend.name}</strong><small>{friend.role}</small></div>
                <button type="button" onclick={() => acceptRequest(friend.id)}>Terima</button>
                <button type="button" class="ghost" onclick={() => declineFriendRequest(friend.id)}>Tolak</button>
              </div>
            {/each}
            {#if profileState.friendRequestIds.length === 0}<p>Belum ada permintaan baru.</p>{/if}
          </div>
        </SparkCard>
        <div class="my-friend-list">
          {#each profileFriendSuggestions as friend}
            {@const connected = profileState.friendIds.includes(friend.id)}
            <SparkCard class={`my-friend-card ${connected ? 'connected' : ''}`}>
              <span><SparkIcon name={friend.icon} size={17} /></span>
              <div><strong>{friend.name}</strong><small>{friend.handle} · {friend.role}</small><p>{friend.copy}</p></div>
              <button type="button" onclick={() => toggleFriend(friend.id)}>{connected ? 'Terhubung' : 'Tambah'}</button>
            </SparkCard>
          {/each}
        </div>
      </section>
    {:else}
      <section class="my-account-grid">
        <SparkCard><span><SparkIcon name="user-round" size={17} /></span><div><strong>Identitas</strong><small>{displayName} · {handle}</small></div></SparkCard>
        <SparkCard><span><SparkIcon name="shield" size={17} /></span><div><strong>Visibilitas</strong><small>{visibilityLabel(profileState.visibility)}</small></div></SparkCard>
        <SparkCard><span><SparkIcon name="settings" size={17} /></span><div><strong>Pengaturan</strong><small>Tampilan dan cara belajar.</small></div><a href="/settings">Buka</a></SparkCard>
        <SparkCard><span><SparkIcon name="logout" size={17} /></span><div><strong>Akses</strong><small>{betaSession.user ? 'Akun belajar aktif.' : 'Belum masuk.'}</small></div><button type="button" onclick={logoutBetaSession}>Keluar</button></SparkCard>
      </section>
      <section class="profile-mode-grid my-mode-grid">
        {#each [
          { key: 'beginner', label: 'Pemula', copy: 'Bahasa paling sederhana dan aman.' },
          { key: 'guided', label: 'Terarah', copy: 'Ringkas, tetap ada arahan.' },
          { key: 'explorer', label: 'Penjelajah', copy: 'Lebih siap untuk teknis.' }
        ] as mode}
          <button type="button" class:active={learningState.experience === mode.key} onclick={() => changeMode(mode.key as ExperienceLevel)}>
            <strong>{mode.label}</strong><small>{mode.copy}</small>
          </button>
        {/each}
      </section>
    {/if}
  </div>
</section>

{#if editOpen}
  <button class="my-editor-scrim" type="button" aria-label="Tutup editor profil" onclick={() => (editOpen = false)}></button>
  <div class="my-editor-panel" role="dialog" aria-modal="true" aria-labelledby="profile-editor-title">
    <SparkCard>
      <div class="my-editor-head">
        <div><span class="spark-eyebrow">Edit Ruang Saya</span><h2 id="profile-editor-title">Atur nama, avatar, dan bio singkat.</h2></div>
        <button type="button" aria-label="Tutup editor profil" onclick={() => (editOpen = false)}><SparkIcon name="x" size={18} /></button>
      </div>
      <div class="my-avatar-picker">
        {#each profileAvatarPresets as preset}
          <button type="button" class:active={profileState.avatarPreset === preset.id && !profileState.avatarImageData} style={`--avatar-a:${preset.gradientA};--avatar-b:${preset.gradientB}`} onclick={() => choosePreset(preset.id)}>
            <SparkIcon name={preset.icon} size={18} /><span>{preset.label}</span>
          </button>
        {/each}
      </div>
      <div class="my-form-grid">
        <label><span>Nama tampil</span><input bind:value={editName} type="text" maxlength="40" placeholder="Nama kamu" /></label>
        <label><span>Handle</span><input bind:value={editHandle} type="text" maxlength="32" placeholder="@karyra" /></label>
        <label><span>Lokasi / komunitas</span><input bind:value={editLocation} type="text" maxlength="48" placeholder="Komunitas lokal" /></label>
        <label><span>Visibilitas</span><select bind:value={editVisibility}><option value="private">Privat</option><option value="community">Komunitas</option><option value="public">Publik</option></select></label>
        <label class="my-form-wide"><span>Bio singkat</span><textarea bind:value={editBio} maxlength="160" rows="3" placeholder="Ceritakan perjalanan belajar kamu."></textarea></label>
      </div>
      <div class="my-editor-actions">
        <SparkButton onclick={saveEditor}>Simpan perubahan</SparkButton>
        <SparkButton variant="secondary" onclick={() => (editOpen = false)}>Batal</SparkButton>
      </div>
    </SparkCard>
  </div>
{/if}

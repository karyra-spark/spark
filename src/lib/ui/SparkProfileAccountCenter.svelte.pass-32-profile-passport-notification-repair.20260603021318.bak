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

  const displayName = $derived(profileState.displayName || betaSession.user?.name || 'Karyra Learner');
  const handle = $derived(profileState.handle || betaSession.user?.handle || '@spark-learner');
  const bio = $derived(profileState.bio || 'Sedang membangun kesiapan blockchain lewat Core, Lab, Passport, Community, dan Hub.');
  const location = $derived(profileState.location || 'Komunitas lokal');
  const readiness = $derived(getReadinessScore());
  const learningProgress = $derived(getLearningProgressPercent());
  const activePreset = $derived(profileAvatarPresets.find((item) => item.id === profileState.avatarPreset) ?? profileAvatarPresets[0]);
  const activeModeLabel = $derived(betaSession.user?.mode === 'explorer' || learningState.experience === 'explorer' ? 'Penjelajah' : betaSession.user?.mode === 'guided' || learningState.experience === 'guided' ? 'Terarah' : 'Baru mulai');

  const activities = $derived(createProfileActivities({ completedLessons: getCompletedLessonCount(), completedLabs: learningState.completedLabIds.length, workshops: gatewayState.registeredWorkshopIds.length, resources: gatewayState.savedHubResourceIds.length, bookmarks: learningState.bookmarkSlugs.length }));
  const badges = $derived(createBadgeRows({ completedLessons: getCompletedLessonCount(), completedLabs: learningState.completedLabIds.length, workshops: gatewayState.registeredWorkshopIds.length, resources: gatewayState.savedHubResourceIds.length, readiness }));
  const passportSignals = $derived([
    { label: 'Learning', value: `${getCompletedLessonCount()}/${getTotalLessonCount()}`, copy: 'Lesson selesai', icon: 'book-open', href: '/core' },
    { label: 'Practice', value: `${learningState.completedLabIds.length}`, copy: 'Lab selesai', icon: 'flask-conical', href: '/lab' },
    { label: 'Community', value: `${gatewayState.registeredWorkshopIds.length}`, copy: 'Workshop tersimpan', icon: 'users', href: '/community' },
    { label: 'Hub', value: `${gatewayState.savedHubResourceIds.length}`, copy: 'Resource tersimpan', icon: 'compass', href: '/hub' }
  ]);
  const nextHref = $derived(readiness >= 75 ? '/hub' : learningState.completedLabIds.length === 0 ? '/lab' : `/lesson/${getRecommendedLessonSlug()}`);
  const nextLabel = $derived(readiness >= 75 ? 'Buka Hub' : learningState.completedLabIds.length === 0 ? 'Coba Lab' : 'Lanjut Lesson');

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
    pushToast({ title: 'Profile tersimpan', copy: 'Identitas lokal dan Passport diperbarui.', tone: 'success' });
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
        pushToast({ title: 'Foto profil diperbarui', copy: 'Preview foto tersimpan di perangkat ini.', tone: 'success' });
      }
    };
    reader.readAsDataURL(file);
  }

  function choosePreset(id: SparkProfileAvatarPreset) {
    setAvatarPreset(id);
    pushToast({ title: 'Avatar dipilih', copy: 'Avatar lokal diperbarui.', tone: 'success' });
  }

  function acceptRequest(id: string) {
    acceptFriendRequest(id);
    pushToast({ title: 'Koneksi diterima', copy: 'Teman komunitas masuk ke profil.', tone: 'success' });
  }

  function changeMode(level: ExperienceLevel) {
    setExperience(level);
    pushToast({ title: 'Mode belajar diperbarui', copy: `Mode sekarang: ${level === 'beginner' ? 'Baru mulai' : level === 'guided' ? 'Terarah' : level === 'explorer' ? 'Penjelajah' : 'Belum dipilih'}.`, tone: 'success' });
  }
</script>

<section class="profile-account-center">
  <div class="profile-cover-card">
    <div class="profile-cover-glow"></div>
    <div class="profile-identity-row">
      <div class="profile-avatar-shell" style={`--avatar-a:${activePreset.gradientA};--avatar-b:${activePreset.gradientB}`}>
        {#if profileState.avatarImageData}
          <img src={profileState.avatarImageData} alt={`Foto profil ${displayName}`} />
        {:else}
          <SparkIcon name={activePreset.icon} size={42} />
        {/if}
        <label class="avatar-upload-button" aria-label="Unggah foto profil">
          <SparkIcon name="camera" size={15} />
          <input type="file" accept="image/png,image/jpeg,image/webp" onchange={handleAvatarUpload} />
        </label>
      </div>

      <div class="profile-identity-copy">
        <div class="profile-label-row">
          <SparkTrustBadge label="Profile & Passport" tone="beta" />
          <SparkTrustBadge label={readiness >= 75 ? 'Hub siap' : 'Bertahap'} tone={readiness >= 75 ? 'safe' : 'target'} />
        </div>
        <h1>{displayName}</h1>
        <p class="profile-handle">{handle} · {visibilityLabel(profileState.visibility)} · {location}</p>
        <p>{bio}</p>
        <div class="profile-action-row">
          <SparkButton onclick={openEditor}>Edit Profile</SparkButton>
          <SparkButton href={nextHref} variant="secondary">{nextLabel}</SparkButton>
        </div>
      </div>
    </div>
  </div>

  <aside class="profile-passport-card">
    <SparkPassportGauge value={readiness} label="Passport" copy="Readiness" />
    <div>
      <strong>{readiness}% readiness</strong>
      <small>{learningProgress}% progress belajar · {activeModeLabel}</small>
    </div>
  </aside>
</section>

<section class="profile-tab-shell">
  <div class="profile-tab-list" role="tablist" aria-label="Profile sections">
    {#each profileTabs as tab}
      <button type="button" role="tab" aria-selected={activeTab === tab.key} class:active={activeTab === tab.key} onclick={() => (activeTab = tab.key)}>
        <SparkIcon name={tab.icon} size={16} />
        <span>{tab.label}</span>
      </button>
    {/each}
  </div>

  <div class="profile-tab-panel">
    {#if activeTab === 'passport'}
      <section class="profile-passport-grid">
        {#each passportSignals as signal}
          <a href={signal.href}>
            <SparkCard>
              <span><SparkIcon name={signal.icon} size={18} /></span>
              <strong>{signal.value}</strong>
              <h3>{signal.label}</h3>
              <p>{signal.copy}</p>
            </SparkCard>
          </a>
        {/each}
      </section>
      <SparkCard class="profile-passport-summary">
        <div>
          <span class="spark-eyebrow">Passport summary</span>
          <h2>{readiness >= 75 ? 'Readiness cukup untuk masuk Hub.' : 'Bangun readiness dari Core dan Lab dulu.'}</h2>
          <p>Passport membaca sinyal belajar, praktik, komunitas, dan Hub. Saat backend siap, sinyal ini bisa disimpan sebagai profil pengguna yang lebih permanen.</p>
        </div>
        <SparkButton href={nextHref}>{nextLabel}</SparkButton>
      </SparkCard>
    {:else if activeTab === 'activity'}
      <section class="profile-activity-list">
        {#each activities as item}
          <a href={item.href}>
            <SparkCard>
              <span><SparkIcon name={item.icon} size={17} /></span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.copy}</small>
              </div>
              <em>›</em>
            </SparkCard>
          </a>
        {/each}
      </section>
    {:else if activeTab === 'friends'}
      <section class="profile-social-grid">
        <SparkCard class="profile-social-card">
          <span class="spark-eyebrow">Request</span>
          <h2>{profileState.friendRequestIds.length} request komunitas</h2>
          <p>Simulasi pertemanan ini membantu menyiapkan arah social/community layer sebelum backend aktif.</p>
          <div class="friend-request-list">
            {#each profileFriendSuggestions.filter((friend) => profileState.friendRequestIds.includes(friend.id)) as friend}
              <div>
                <span><SparkIcon name={friend.icon} size={16} /></span>
                <div><strong>{friend.name}</strong><small>{friend.role}</small></div>
                <button type="button" onclick={() => acceptRequest(friend.id)}>Terima</button>
                <button type="button" class="ghost" onclick={() => declineFriendRequest(friend.id)}>Tolak</button>
              </div>
            {/each}
            {#if profileState.friendRequestIds.length === 0}
              <p class="empty-social-copy">Belum ada request baru.</p>
            {/if}
          </div>
        </SparkCard>
        <div class="friend-card-list">
          {#each profileFriendSuggestions as friend}
            {@const connected = profileState.friendIds.includes(friend.id)}
            <SparkCard class={`friend-suggestion-card ${connected ? 'connected' : ''}`}>
              <span><SparkIcon name={friend.icon} size={18} /></span>
              <div><strong>{friend.name}</strong><small>{friend.handle} · {friend.role}</small><p>{friend.copy}</p></div>
              <button type="button" onclick={() => toggleFriend(friend.id)}>{connected ? 'Terhubung' : 'Tambah'}</button>
            </SparkCard>
          {/each}
        </div>
      </section>
    {:else if activeTab === 'badges'}
      <section class="profile-badge-grid">
        {#each badges as badge}
          <SparkCard class={`profile-badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}>
            <span><SparkIcon name={badge.icon} size={20} /></span>
            <strong>{badge.title}</strong>
            <p>{badge.copy}</p>
            <SparkTrustBadge label={badge.unlocked ? 'Terbuka' : 'Terkunci'} tone={badge.unlocked ? 'safe' : 'target'} />
          </SparkCard>
        {/each}
      </section>
    {:else}
      <section class="profile-account-grid">
        <SparkCard><span><SparkIcon name="user-round" size={18} /></span><div><strong>Identitas</strong><small>{displayName} · {handle}</small></div></SparkCard>
        <SparkCard><span><SparkIcon name="shield" size={18} /></span><div><strong>Visibilitas</strong><small>{visibilityLabel(profileState.visibility)}</small></div></SparkCard>
        <SparkCard><span><SparkIcon name="settings" size={18} /></span><div><strong>Settings penuh</strong><small>Tema, preview mode, dan reset data lokal.</small></div><a href="/settings">Buka</a></SparkCard>
        <SparkCard><span><SparkIcon name="logout" size={18} /></span><div><strong>Session</strong><small>{betaSession.user ? 'Session mode coba aktif.' : 'Belum masuk.'}</small></div><button type="button" onclick={logoutBetaSession}>Logout</button></SparkCard>
      </section>
      <section class="profile-mode-grid">
        {#each [
          { key: 'beginner', label: 'Baru mulai', copy: 'Bahasa paling sederhana dan aman.' },
          { key: 'guided', label: 'Terarah', copy: 'Ringkas, tetap ada guardrail.' },
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
  <section class="profile-editor-panel" aria-labelledby="profile-editor-title">
    <SparkCard>
      <div class="profile-editor-head">
        <div><span class="spark-eyebrow">Edit Profile</span><h2 id="profile-editor-title">Atur identitas lokal dan avatar.</h2></div>
        <button type="button" aria-label="Tutup editor profil" onclick={() => (editOpen = false)}><SparkIcon name="x" size={18} /></button>
      </div>
      <div class="profile-avatar-picker">
        {#each profileAvatarPresets as preset}
          <button type="button" class:active={profileState.avatarPreset === preset.id && !profileState.avatarImageData} style={`--avatar-a:${preset.gradientA};--avatar-b:${preset.gradientB}`} onclick={() => choosePreset(preset.id)}>
            <SparkIcon name={preset.icon} size={19} /><span>{preset.label}</span>
          </button>
        {/each}
      </div>
      <div class="profile-form-grid">
        <label><span>Nama tampil</span><input bind:value={editName} type="text" maxlength="40" placeholder="Nama kamu" /></label>
        <label><span>Handle</span><input bind:value={editHandle} type="text" maxlength="32" placeholder="@spark-learner" /></label>
        <label><span>Lokasi / komunitas</span><input bind:value={editLocation} type="text" maxlength="48" placeholder="Komunitas lokal" /></label>
        <label><span>Visibilitas</span><select bind:value={editVisibility}><option value="private">Privat</option><option value="community">Komunitas</option><option value="public">Publik</option></select></label>
        <label class="profile-form-wide"><span>Bio singkat</span><textarea bind:value={editBio} maxlength="160" rows="3" placeholder="Ceritakan perjalanan belajar kamu."></textarea></label>
      </div>
      <div class="profile-editor-actions">
        <SparkButton onclick={saveEditor}>Simpan Profile</SparkButton>
        <SparkButton variant="secondary" onclick={() => (editOpen = false)}>Batal</SparkButton>
      </div>
    </SparkCard>
  </section>
{/if}

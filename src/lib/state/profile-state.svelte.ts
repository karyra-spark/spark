export type SparkProfileAvatarPreset = 'spark' | 'trophy' | 'coffee' | 'explorer' | 'mentor';
export type SparkProfileVisibility = 'private' | 'community' | 'public';

const STORAGE_KEY = 'karyra-spark-profile-state-v1';
const LEGACY_CONNECTION_IDS = new Set(['mentor-spark', 'facilitator-ayu', 'starknet-guide']);

export const profileState = $state({
  displayName: '',
  handle: '',
  bio: '',
  location: '',
  avatarPreset: 'spark' as SparkProfileAvatarPreset,
  avatarImageData: '',
  visibility: 'community' as SparkProfileVisibility,
  friendIds: [] as string[],
  friendRequestIds: [] as string[],
  lastSavedAt: ''
});

function sanitizeConnectionIds(ids: unknown) {
  if (!Array.isArray(ids)) return [];
  return ids.filter((id): id is string => typeof id === 'string' && !LEGACY_CONNECTION_IDS.has(id));
}

export function restoreProfileState() {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const snapshot = JSON.parse(raw) as Partial<typeof profileState>;
    if (typeof snapshot.displayName === 'string') profileState.displayName = snapshot.displayName;
    if (typeof snapshot.handle === 'string') profileState.handle = snapshot.handle;
    if (typeof snapshot.bio === 'string') profileState.bio = snapshot.bio;
    if (typeof snapshot.location === 'string') profileState.location = snapshot.location;
    if (snapshot.avatarPreset) profileState.avatarPreset = snapshot.avatarPreset;
    if (typeof snapshot.avatarImageData === 'string') profileState.avatarImageData = snapshot.avatarImageData;
    if (snapshot.visibility) profileState.visibility = snapshot.visibility;
    profileState.friendIds = sanitizeConnectionIds(snapshot.friendIds);
    profileState.friendRequestIds = sanitizeConnectionIds(snapshot.friendRequestIds);
    if (typeof snapshot.lastSavedAt === 'string') profileState.lastSavedAt = snapshot.lastSavedAt;
  } catch {
    // Ignore corrupted local profile state.
  }
}

export function saveProfileState() {
  if (typeof window === 'undefined') return;
  profileState.lastSavedAt = new Date().toISOString();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      displayName: profileState.displayName,
      handle: profileState.handle,
      bio: profileState.bio,
      location: profileState.location,
      avatarPreset: profileState.avatarPreset,
      avatarImageData: profileState.avatarImageData,
      visibility: profileState.visibility,
      friendIds: profileState.friendIds,
      friendRequestIds: profileState.friendRequestIds,
      lastSavedAt: profileState.lastSavedAt
    })
  );
}

export function updateProfileIdentity(input: {
  displayName?: string;
  handle?: string;
  bio?: string;
  location?: string;
  visibility?: SparkProfileVisibility;
}) {
  if (typeof input.displayName === 'string') profileState.displayName = input.displayName.trim();
  if (typeof input.handle === 'string') {
    const normalized = input.handle.trim();
    profileState.handle = normalized.startsWith('@') ? normalized : `@${normalized}`;
  }
  if (typeof input.bio === 'string') profileState.bio = input.bio.trim();
  if (typeof input.location === 'string') profileState.location = input.location.trim();
  if (input.visibility) profileState.visibility = input.visibility;
  saveProfileState();
}

export function setAvatarPreset(preset: SparkProfileAvatarPreset) {
  profileState.avatarPreset = preset;
  profileState.avatarImageData = '';
  saveProfileState();
}

export function setAvatarImageData(data: string) {
  profileState.avatarImageData = data;
  saveProfileState();
}

export function toggleFriend(friendId: string) {
  if (profileState.friendIds.includes(friendId)) {
    profileState.friendIds = profileState.friendIds.filter((id) => id !== friendId);
  } else {
    profileState.friendIds = [...profileState.friendIds, friendId];
  }
  saveProfileState();
}

export function acceptFriendRequest(friendId: string) {
  profileState.friendRequestIds = profileState.friendRequestIds.filter((id) => id !== friendId);
  if (!profileState.friendIds.includes(friendId)) {
    profileState.friendIds = [...profileState.friendIds, friendId];
  }
  saveProfileState();
}

export function declineFriendRequest(friendId: string) {
  profileState.friendRequestIds = profileState.friendRequestIds.filter((id) => id !== friendId);
  saveProfileState();
}

export type BackendProfileSnapshot = {
  display_name?: string | null;
  handle?: string | null;
  bio?: string | null;
  location?: string | null;
  visibility?: SparkProfileVisibility | string | null;
  avatar_preset?: SparkProfileAvatarPreset | string | null;
  avatar_url?: string | null;
  updated_at?: string | null;
};

function isProfileVisibility(value: unknown): value is SparkProfileVisibility {
  return value === 'private' || value === 'community' || value === 'public';
}

function isAvatarPreset(value: unknown): value is SparkProfileAvatarPreset {
  return value === 'spark' || value === 'trophy' || value === 'coffee' || value === 'explorer' || value === 'mentor';
}

export function applyBackendProfileSnapshot(profile: BackendProfileSnapshot) {
  if (typeof profile.display_name === 'string') profileState.displayName = profile.display_name;
  if (typeof profile.handle === 'string') profileState.handle = profile.handle;
  if (typeof profile.bio === 'string') profileState.bio = profile.bio;
  if (typeof profile.location === 'string') profileState.location = profile.location;
  if (isProfileVisibility(profile.visibility)) profileState.visibility = profile.visibility;
  if (isAvatarPreset(profile.avatar_preset)) profileState.avatarPreset = profile.avatar_preset;
  if (typeof profile.avatar_url === 'string') profileState.avatarImageData = profile.avatar_url;
  if (typeof profile.updated_at === 'string') profileState.lastSavedAt = profile.updated_at;
  saveProfileState();
}

export function createProfileUpdatePayload() {
  return {
    display_name: profileState.displayName,
    handle: profileState.handle,
    bio: profileState.bio,
    location: profileState.location,
    visibility: profileState.visibility,
    avatar_preset: profileState.avatarPreset,
    avatar_url: profileState.avatarImageData.startsWith('http') ? profileState.avatarImageData : ''
  };
}


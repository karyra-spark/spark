import {
  cancelBackendWorkshop,
  getBackendSavedHubResources,
  getBackendWorkshopRegistrations,
  registerBackendWorkshop,
  saveBackendHubResource,
  unsaveBackendHubResource
} from '$lib/api/spark-gateway-api';
import { enqueueSyncEvent } from '$lib/sync/sync-event-queue.svelte';

const STORAGE_KEY = 'karyra-spark-gateway-state-v1';

export const gatewayState = $state({
  registeredWorkshopIds: [] as string[],
  savedHubResourceIds: [] as string[],
  dismissedBridgeIds: [] as string[],
  lastSavedAt: '',
  backendReady: false,
  backendSyncing: false,
  backendError: ''
});

function unique(ids: string[]) {
  return Array.from(new Set(ids.filter(Boolean)));
}

export async function hydrateGatewayStateFromBackend() {
  if (typeof window === 'undefined') return;

  restoreGatewaySnapshot();
  gatewayState.backendSyncing = true;
  gatewayState.backendError = '';

  try {
    const [workshops, resources] = await Promise.all([
      getBackendWorkshopRegistrations(),
      getBackendSavedHubResources()
    ]);

    if (workshops) {
      gatewayState.registeredWorkshopIds = unique(workshops.items.map((item) => item.workshop_id));
      gatewayState.backendReady = true;
    }

    if (resources) {
      gatewayState.savedHubResourceIds = unique(resources.items.map((item) => item.resource_id));
      gatewayState.backendReady = true;
    }

    saveGatewaySnapshot();
  } catch (error) {
    gatewayState.backendError = error instanceof Error ? error.message : 'Sinyal perjalanan belum bisa disinkronkan.';
  } finally {
    gatewayState.backendSyncing = false;
  }
}

export async function toggleWorkshopRegistration(id: string) {
  const wasSaved = gatewayState.registeredWorkshopIds.includes(id);

  if (wasSaved) {
    gatewayState.registeredWorkshopIds = gatewayState.registeredWorkshopIds.filter((item) => item !== id);
  } else {
    gatewayState.registeredWorkshopIds = unique([...gatewayState.registeredWorkshopIds, id]);
  }
  saveGatewaySnapshot();

  enqueueSyncEvent({
    name: 'community.workshop.saved',
    entity: 'community',
    action: 'workshop.saved',
    subjectId: id,
    payload: { id, saved: !wasSaved }
  });

  try {
    if (wasSaved) {
      await cancelBackendWorkshop(id);
    } else {
      await registerBackendWorkshop(id);
    }
    gatewayState.backendReady = true;
    gatewayState.backendError = '';
  } catch (error) {
    gatewayState.backendError = error instanceof Error ? error.message : 'Workshop belum bisa disinkronkan.';
  }
}

export async function toggleHubResource(id: string) {
  const wasSaved = gatewayState.savedHubResourceIds.includes(id);

  if (wasSaved) {
    gatewayState.savedHubResourceIds = gatewayState.savedHubResourceIds.filter((item) => item !== id);
  } else {
    gatewayState.savedHubResourceIds = unique([...gatewayState.savedHubResourceIds, id]);
  }
  saveGatewaySnapshot();

  enqueueSyncEvent({
    name: 'hub.resource.saved',
    entity: 'hub',
    action: 'resource.saved',
    subjectId: id,
    payload: { id, saved: !wasSaved }
  });

  try {
    if (wasSaved) {
      await unsaveBackendHubResource(id);
    } else {
      await saveBackendHubResource(id);
    }
    gatewayState.backendReady = true;
    gatewayState.backendError = '';
  } catch (error) {
    gatewayState.backendError = error instanceof Error ? error.message : 'Resource belum bisa disinkronkan.';
  }
}

export function dismissBridge(id: string) {
  if (!gatewayState.dismissedBridgeIds.includes(id)) {
    gatewayState.dismissedBridgeIds = [...gatewayState.dismissedBridgeIds, id];
  }
}

export function restoreGatewaySnapshot() {
  if (typeof window === 'undefined') return;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const snapshot = JSON.parse(raw) as Partial<typeof gatewayState>;

    if (Array.isArray(snapshot.registeredWorkshopIds)) gatewayState.registeredWorkshopIds = snapshot.registeredWorkshopIds;
    if (Array.isArray(snapshot.savedHubResourceIds)) gatewayState.savedHubResourceIds = snapshot.savedHubResourceIds;
    if (Array.isArray(snapshot.dismissedBridgeIds)) gatewayState.dismissedBridgeIds = snapshot.dismissedBridgeIds;
    if (snapshot.lastSavedAt) gatewayState.lastSavedAt = snapshot.lastSavedAt;
  } catch {
    // Ignore corrupted local gateway snapshot.
  }
}

export function saveGatewaySnapshot() {
  if (typeof window === 'undefined') return;

  gatewayState.lastSavedAt = new Date().toISOString();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      registeredWorkshopIds: gatewayState.registeredWorkshopIds,
      savedHubResourceIds: gatewayState.savedHubResourceIds,
      dismissedBridgeIds: gatewayState.dismissedBridgeIds,
      lastSavedAt: gatewayState.lastSavedAt
    })
  );
}

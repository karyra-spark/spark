export type PreviewMode = 'auto' | 'desktop' | 'mobile';

export const appState = $state({
  previewMode: 'auto' as PreviewMode,
  mobileMenuOpen: false,
  pendingAction: '',
  persistenceReady: false,
  toast: null as null | { title: string; copy: string; tone: 'success' | 'info' | 'warning' | 'error' }
});

export function setPreviewMode(mode: PreviewMode) {
  appState.previewMode = mode;
}

export function setPendingAction(id: string) {
  appState.pendingAction = id;
}

export function clearPendingAction() {
  appState.pendingAction = '';
}

export function markPersistenceReady() {
  appState.persistenceReady = true;
}

export function pushToast(toast: NonNullable<typeof appState.toast>) {
  appState.toast = toast;
  setTimeout(() => {
    if (appState.toast?.title === toast.title) appState.toast = null;
  }, 2600);
}

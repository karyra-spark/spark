/**
 * Karyra Spark — Pass 36 visual rhythm tokens.
 *
 * This file is intentionally not imported automatically.
 * Use these class names as a reference when refactoring components directly.
 */
export const pass36Rhythm = {
  shells: [
    'page-shell',
    'route-shell',
    'dashboard-shell',
    'home-shell',
    'content-shell',
  ],
  grids: [
    'card-grid',
    'feature-grid',
    'metric-grid',
    'route-grid',
    'lesson-grid',
    'lab-grid',
    'community-grid',
    'hub-grid',
  ],
  cards: [
    'card',
    'panel',
    'surface',
    'metric-card',
    'route-card',
    'feature-card',
    'lesson-card',
    'module-card',
    'lab-card',
    'community-card',
    'hub-card',
  ],
  copy: {
    notificationEmpty: 'Belum ada notifikasi baru.',
    drawerTitle: 'Menu',
    logout: 'Keluar',
  },
  iconIntent: {
    notification: 'bell',
    inbox: 'message',
    safety: 'shield',
    lesson: 'book',
    lab: 'flask',
    hub: 'compass',
    readiness: 'badge-check',
    success: 'check',
  },
} as const;

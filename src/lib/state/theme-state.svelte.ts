export type ThemePreference = 'light' | 'dark' | 'system';

const THEME_KEY = 'karyra-spark-theme-v2';

export const themeState = $state({
  preference: 'system' as ThemePreference,
  resolved: 'light' as 'light' | 'dark',
  mounted: false
});

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme() {
  const resolved = themeState.preference === 'system' ? getSystemTheme() : themeState.preference;
  themeState.resolved = resolved;
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = themeState.preference;
  }
}

export function initTheme() {
  if (typeof window === 'undefined') return;

  const saved = window.localStorage.getItem(THEME_KEY) as ThemePreference | null;
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    themeState.preference = saved;
  }

  applyTheme();
  themeState.mounted = true;

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themeState.preference === 'system') applyTheme();
  });
}

export function setThemePreference(preference: ThemePreference) {
  themeState.preference = preference;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_KEY, preference);
  }
  applyTheme();
}

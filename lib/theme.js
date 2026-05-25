export const THEME_STORAGE_KEY = 'support-copilot-theme'

export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})();`

export function getStoredTheme() {
  if (typeof window === 'undefined') return 'light'
  return localStorage.getItem(THEME_STORAGE_KEY) || 'system'
}

export function resolveDark(theme) {
  if (theme === 'dark') return true
  if (theme === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyTheme(theme) {
  const dark = resolveDark(theme)
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

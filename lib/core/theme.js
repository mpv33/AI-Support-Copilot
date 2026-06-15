export const THEME_STORAGE_KEY = 'support-copilot-theme'

export const themeInitScript = `(function(){try{var k='${THEME_STORAGE_KEY}';var t=localStorage.getItem(k);var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches);var r=document.documentElement;if(d){r.classList.add('dark');r.dataset.theme='dark'}else{r.classList.remove('dark');r.dataset.theme='light'}}catch(e){}})();`

export function getStoredTheme() {
  if (typeof window === 'undefined') return 'system'
  return localStorage.getItem(THEME_STORAGE_KEY) || 'system'
}

export function resolveDark(theme) {
  if (theme === 'dark') return true
  if (theme === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return
  const dark = resolveDark(theme)
  const root = document.documentElement
  root.classList.toggle('dark', dark)
  root.dataset.theme = dark ? 'dark' : 'light'
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* private browsing */
  }
}

export function isDarkMode() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

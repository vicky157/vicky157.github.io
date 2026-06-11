/**
 * Light/dark theme toggle. Light is the default; the choice persists in
 * localStorage and is applied to <html data-theme="..."> (a tiny inline
 * script in index.html applies it pre-paint to avoid a flash).
 */

const STORAGE_KEY = 'theme';

function currentTheme(): 'light' | 'dark' {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export function initThemeToggle(): void {
  // Ensure the attribute exists even if the inline pre-paint script was removed
  if (!document.documentElement.hasAttribute('data-theme')) {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    document.documentElement.setAttribute('data-theme', stored === 'dark' ? 'dark' : 'light');
  }

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const sync = (): void => {
    btn.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
  };
  sync();

  btn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
    sync();
  });
}

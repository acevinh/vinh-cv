import { useCallback, useEffect } from 'react';
import { usePersistentState } from './usePersistentState';

export type Theme = 'dark' | 'light';

const isTheme = (v: string): v is Theme => v === 'dark' || v === 'light';

function systemTheme(): Theme {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

/**
 * Theme state, mirrored onto `<html data-theme>` so the CSS token layer can
 * swap. Defaults to the OS preference; an explicit choice is remembered.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = usePersistentState<Theme>('vinh-cv:theme', systemTheme(), isTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggle = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme],
  );

  return { theme, toggle };
}

import { useCallback, useState } from 'react';

/**
 * State backed by localStorage, with every access wrapped in try/catch.
 *
 * localStorage throws in a private window, with site data blocked, and inside
 * some embedded contexts. The page must render correctly when it is unavailable,
 * so a failed read falls back to `initial` and a failed write is swallowed.
 *
 * The write happens in the setter, never in an effect on mount. Persisting a
 * resolved default would record a choice the visitor never made — a theme
 * derived from `prefers-color-scheme` would be frozen at whatever the OS said
 * on the first visit and stop following it afterwards.
 */
export function usePersistentState<T extends string>(
  key: string,
  initial: T,
  isValid: (value: string) => value is T,
): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null && isValid(stored)) return stored;
    } catch {
      /* unavailable — fall through to the default */
    }
    return initial;
  });

  const set = useCallback((next: T) => {
    setValue(next);
    try {
      window.localStorage.setItem(key, next);
    } catch {
      /* unavailable — the page still works, the choice just is not remembered */
    }
  }, [key]);

  return [value, set];
}

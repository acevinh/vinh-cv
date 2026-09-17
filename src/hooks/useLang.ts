import { useEffect } from 'react';
import type { L, LL, Lang } from '../content';
import { usePersistentState } from './usePersistentState';

const isLang = (v: string): v is Lang => v === 'en' || v === 'vi';

/** Read one translated string. */
export const t = (value: L, lang: Lang): string => value[lang];

/** Read one translated list. */
export const tl = (value: LL, lang: Lang): string[] => value[lang];

/**
 * Language state, mirrored onto `<html lang>` so screen readers and the
 * browser's own translation prompt behave correctly.
 */
export function useLang(): { lang: Lang; setLang: (next: Lang) => void } {
  const [lang, setLang] = usePersistentState<Lang>('vinh-cv:lang', 'en', isLang);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  return { lang, setLang };
}

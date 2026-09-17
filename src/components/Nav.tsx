import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { NAV, UI } from '../content';
import type { Lang } from '../content';
import { t } from '../hooks/useLang';
import type { Theme } from '../hooks/useTheme';
import './Nav.css';

interface NavProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  /** `origin` is where the theme bloom starts — see useTheme. */
  toggleTheme: (origin?: DOMRect) => void;
}

/** Both language codes, derived from the `Lang` union rather than typed as copy. */
const LANGS: Lang[] = ['en', 'vi'];

/** Where the indicator sits, in pixels, relative to the link list. */
interface Indicator {
  x: number;
  w: number;
}

/* ---- icons: 20×20, 1.6 stroke, currentColor (DESIGN.md — no icon library) -- */

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path
        d="M16.2 12.3A6.6 6.6 0 0 1 7.7 3.8a6.6 6.6 0 1 0 8.5 8.5Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="10" cy="10" r="3.6" />
      <path
        d="M10 1.8v1.8M10 16.4v1.8M3.8 10H2M18 10h-1.8M5.6 5.6 4.3 4.3M15.7 15.7l-1.3-1.3M14.4 5.6l1.3-1.3M4.3 15.7l1.3-1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M6 7.5V2.8h8V7.5" strokeLinejoin="round" />
      <path
        d="M6 14H4.2A1.7 1.7 0 0 1 2.5 12.3V9.2A1.7 1.7 0 0 1 4.2 7.5h11.6a1.7 1.7 0 0 1 1.7 1.7v3.1a1.7 1.7 0 0 1-1.7 1.7H14"
        strokeLinejoin="round"
      />
      <path d="M6 11.8h8v5.4H6z" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The floating glass pill (DESIGN.md §7, §8).
 *
 * Top of the screen on desktop, bottom on mobile — thumb reach, the ColorOS /
 * iOS idiom this page is quoting. The active section is tracked by one
 * IntersectionObserver over the section ids; the indicator is a single pill
 * that slides with `transform`, so switching section never re-renders a border
 * or reflows the list.
 */
export default function Nav({ lang, setLang, theme, toggleTheme }: NavProps): JSX.Element {
  const [active, setActive] = useState<string>('');
  const [indicator, setIndicator] = useState<Indicator | null>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const listRef = useRef<HTMLUListElement | null>(null);

  /* ---- which section are we in ------------------------------------------ */
  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // NAV order is document order, so the first match is the topmost section
        // inside the band — stable when two sections overlap it.
        const next = NAV.find((item) => visible.has(item.id));
        setActive(next ? next.id : '');
      },
      // A thin band across the middle of the viewport: a section is "active"
      // only while it owns the reader's eye line.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ---- where the sliding indicator goes ---------------------------------- */
  const measure = useCallback(() => {
    const el = active ? linkRefs.current.get(active) : undefined;
    setIndicator(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active]);

  // `lang` is a dependency because the labels — and therefore the widths — change.
  useLayoutEffect(measure, [measure, lang]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  /* ---- keep the active link visible inside the mobile scroller ------------ *
     On a phone the pill cannot hold six labels plus three controls, so the link
     row scrolls horizontally. Left alone, five of the six links sit off-screen
     and the indicator tracks a link the reader cannot see — the nav quietly
     stops answering "where am I". Centring the active link turns the scroller
     back into a position display. */
  useEffect(() => {
    const list = listRef.current;
    const el = active ? linkRefs.current.get(active) : undefined;
    if (!list || !el) return;
    if (list.scrollWidth <= list.clientWidth) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    list.scrollTo({
      left: Math.max(0, el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2),
      behavior: reduced ? 'auto' : 'smooth',
    });
  }, [active]);

  const isLight = theme === 'light';

  return (
    <nav className="nav">
      <div className="nav__pill glass glass--interactive">
        <ul className="nav__links" ref={listRef}>
          <li
            className={`nav__indicator${indicator ? ' is-on' : ''}`}
            aria-hidden="true"
            style={
              {
                '--ind-x': `${indicator?.x ?? 0}px`,
                '--ind-w': `${indicator?.w ?? 0}px`,
              } as CSSProperties
            }
          />
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                className={`nav__link${active === item.id ? ' is-active' : ''}`}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                ref={(el) => {
                  if (el) linkRefs.current.set(item.id, el);
                  else linkRefs.current.delete(item.id);
                }}
              >
                {t(item.label, lang)}
              </a>
            </li>
          ))}
        </ul>

        <span className="nav__divider" aria-hidden="true" />

        <div className="controls">
          <button
            type="button"
            className={`toggle${isLight ? ' is-light' : ''}`}
            aria-pressed={isLight}
            aria-label={t(UI.themeLabel, lang)}
            // The rect, not the pointer: a keyboard activation has no
            // coordinates, and the bloom should start from the control either
            // way. The nav is `fixed`, so this is already viewport-relative.
            onClick={(e) => toggleTheme(e.currentTarget.getBoundingClientRect())}
          >
            <span className="toggle__track" aria-hidden="true">
              <span className="toggle__knob">
                <span className="toggle__icon toggle__icon--moon">
                  <MoonIcon />
                </span>
                <span className="toggle__icon toggle__icon--sun">
                  <SunIcon />
                </span>
              </span>
            </span>
          </button>

          <div className={`seg${lang === 'vi' ? ' is-second' : ''}`} role="group" aria-label={t(UI.langLabel, lang)}>
            <span className="seg__thumb" aria-hidden="true" />
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                className="seg__btn"
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="ctrl-btn"
            aria-label={t(UI.print, lang)}
            onClick={() => window.print()}
          >
            <PrintIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}

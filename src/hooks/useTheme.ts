import { useCallback, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { usePersistentState } from './usePersistentState';

export type Theme = 'dark' | 'light';

/**
 * `startViewTransition` is not in TypeScript's DOM lib yet, and only Chromium
 * ships it. Narrow, local, and feature-detected rather than asserted.
 */
interface ViewTransitionLike {
  finished: Promise<void>;
}
type DocumentWithVT = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

const isTheme = (v: string): v is Theme => v === 'dark' || v === 'light';

function systemTheme(): Theme {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/**
 * Theme state, mirrored onto `<html data-theme>` so the CSS token layer can
 * swap. Defaults to the OS preference; an explicit choice is remembered.
 *
 * ## Why the toggle is not just `setTheme`
 *
 * Flipping `data-theme` swaps sixty-odd custom properties in one frame. `body`
 * had a 600ms transition on `background-color` and `color`, but nothing else
 * did — and most of the page's colour does not live in those two properties.
 * The glass fill is a `linear-gradient` plus a scrim colour, and gradients do
 * not interpolate on `background-color`; the aurora blobs, the hairlines, the
 * rims and the grain all simply snap. So two thirds of the page changed
 * instantly while the backdrop faded underneath it: the flash.
 *
 * Fading every one of those properties separately is not the fix — it would be
 * dozens of transitions, several of them on non-animatable values, and it still
 * would not look like anything. The platform has the right primitive: take the
 * old frame, paint the new one over it, and bring it in as a soft bloom. It
 * changes the whole scene rather than decorating the button that triggered it.
 *
 * `origin` is where that bloom starts — the rect of the control that was
 * pressed, written out as viewport percentages for the mask in base.css. It is
 * optional because the theme can also change without a click, and the mask
 * falls back to the top centre.
 *
 * The bloom's duration is `--d-theme`, and so is the toggle knob's travel, so
 * the control and the page move as one gesture (base.css, Nav.css).
 *
 * Non-Chromium engines and `prefers-reduced-motion` get the plain swap.
 */
export function useTheme(): { theme: Theme; toggle: (origin?: DOMRect) => void } {
  const [theme, setTheme] = usePersistentState<Theme>('vinh-cv:theme', systemTheme(), isTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggle = useCallback(
    (origin?: DOMRect) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';
      const doc = document as DocumentWithVT;

      if (typeof doc.startViewTransition !== 'function' || prefersReducedMotion()) {
        setTheme(next);
        return;
      }

      const root = document.documentElement;

      // Percentages, not pixels: the mask box is the viewport, so the same two
      // numbers place the bloom correctly at any size, and nothing has to be
      // recomputed if the window changes during the 560ms. A zero-width rect
      // means the control is not laid out — keep the previous origin instead of
      // writing a nonsense one.
      if (origin && origin.width > 0 && window.innerWidth > 0 && window.innerHeight > 0) {
        const x = ((origin.left + origin.width / 2) / window.innerWidth) * 100;
        const y = ((origin.top + origin.height / 2) / window.innerHeight) * 100;
        root.style.setProperty('--vt-x', `${x.toFixed(2)}%`);
        root.style.setProperty('--vt-y', `${y.toFixed(2)}%`);
      }

      // Scopes every ::view-transition rule in base.css to THIS transition, so
      // adding a view transition anywhere else later cannot inherit the bloom.
      root.dataset.vt = 'theme';

      try {
        // `::view-transition-new(root)` renders the live DOM, not a snapshot, so
        // React has to have committed before the browser captures — hence
        // flushSync. Without it the "new" layer is still the old theme.
        const transition = doc.startViewTransition(() => {
          flushSync(() => setTheme(next));
        });
        void transition.finished.finally(() => {
          delete root.dataset.vt;
        });
      } catch {
        delete root.dataset.vt;
        setTheme(next);
      }
    },
    [theme, setTheme],
  );

  return { theme, toggle };
}

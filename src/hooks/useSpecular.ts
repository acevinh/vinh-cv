import { useEffect } from 'react';

/**
 * Pointer-tracked specular highlight on glass surfaces (DESIGN.md §4a).
 *
 * One delegated `pointermove` listener on the document, coalesced through a
 * single requestAnimationFrame. It writes only the `--mx` / `--my` custom
 * properties — never inline geometry — so the browser stays on the compositor
 * and nothing triggers layout.
 *
 * Skipped entirely on coarse pointers (phones have no hover) and under reduced
 * motion.
 */
export function useSpecular(): void {
  useEffect(() => {
    const coarse =
      typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduced) return;

    let frame = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      pending = null;
      el.style.setProperty('--mx', `${x}%`);
      el.style.setProperty('--my', `${y}%`);
    };

    const onMove = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>('.glass--interactive');
      if (!el) return;

      const rect = el.getBoundingClientRect();
      pending = {
        el,
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      };
      if (frame === 0) frame = requestAnimationFrame(flush);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);
}

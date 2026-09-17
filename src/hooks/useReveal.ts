import { useEffect } from 'react';

/**
 * Scroll reveal (DESIGN.md §6).
 *
 * One observer for the whole page rather than one per element. Elements opt in
 * with `className="reveal"`; the observer adds `is-visible` once and then stops
 * watching them, so nothing re-animates on scroll-back.
 *
 * Under reduced motion the CSS already renders `.reveal` at rest, so this is a
 * no-op that still marks everything visible for safety.
 */
export function useReveal(): void {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (nodes.length === 0) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}

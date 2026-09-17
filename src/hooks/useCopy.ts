import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copy to clipboard with a confirmation window.
 *
 * `navigator.clipboard` is unavailable on insecure origins and in some embedded
 * browsers, so there is a `execCommand` fallback. A recruiter who cannot copy
 * the email address is the whole failure mode this guards against.
 */
export function useCopy(resetAfterMs = 1600): { copied: boolean; copy: (text: string) => void } {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const confirm = useCallback(() => {
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), resetAfterMs);
  }, [resetAfterMs]);

  const copy = useCallback(
    (text: string) => {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(confirm, () => fallback(text, confirm));
        return;
      }
      fallback(text, confirm);
    },
    [confirm],
  );

  return { copied, copy };
}

function fallback(text: string, onDone: () => void): void {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  area.style.pointerEvents = 'none';
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand('copy');
    onDone();
  } catch {
    /* nothing more we can do — the address is still visible as text */
  } finally {
    document.body.removeChild(area);
  }
}

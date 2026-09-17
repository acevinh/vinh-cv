import type { CSSProperties } from 'react';

import { HERO, IDENTITY } from '../content';
import type { Lang } from '../content';
import { t } from '../hooks/useLang';
import './Hero.css';

interface HeroProps {
  lang: Lang;
}

/**
 * Entrance stagger. The step itself lives in CSS (`--hero-step`), so what
 * crosses the style prop is an index, not a hard-coded duration.
 */
const enter = (step: number): CSSProperties =>
  ({ '--hero-delay': `calc(var(--hero-step) * ${step})` }) as CSSProperties;

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M10 3.5v13M5.2 11.8 10 16.5l4.8-4.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The first screen (DESIGN.md §7.1).
 *
 * Deliberately asymmetric: the text block is capped at seven of twelve columns
 * and sits left of centre, leaving the right third as open space for the
 * aurora to move through. Nothing here is centred.
 *
 * The entrance is a CSS animation rather than the scroll `reveal` class — the
 * hero is above the fold, so there is no intersection to wait for.
 */
export default function Hero({ lang }: HeroProps): JSX.Element {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow mono dim hero__enter" style={enter(0)}>
            {t(HERO.eyebrow, lang)}
          </p>

          <h1 className="hero__name hero__enter" style={enter(1)}>
            {IDENTITY.displayName}
          </h1>

          <p className="hero__legal mono dim hero__enter" style={enter(2)}>
            {IDENTITY.fullName}
          </p>

          <p className="hero__lede muted hero__enter" style={enter(3)}>
            {t(HERO.lede, lang)}
          </p>

          <div className="hero__actions hero__enter" style={enter(4)}>
            <a className="btn btn--accent" href="#contact">
              {t(HERO.ctaContact, lang)}
            </a>

            <button
              type="button"
              className="btn btn--glass no-print"
              onClick={() => window.print()}
            >
              {t(HERO.ctaResume, lang)}
            </button>

            <a
              className="btn btn--glass"
              href={IDENTITY.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(HERO.ctaGithub, lang)}
            </a>
          </div>
        </div>
      </div>

      <div className="container hero__foot">
        <a className="hero__scroll hero__enter" href="#about" style={enter(5)}>
          <span className="mono">{t(HERO.scrollHint, lang)}</span>
          <ArrowDownIcon />
        </a>
      </div>
    </section>
  );
}

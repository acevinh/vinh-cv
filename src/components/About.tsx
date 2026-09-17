import type { CSSProperties } from 'react';

import { ABOUT, FACTS, type Lang } from '../content';
import { t, tl } from '../hooks/useLang';

import './About.css';

/** Section 01 — two paragraphs of positioning plus the hard facts a recruiter scans for. */
export default function About({ lang }: { lang: Lang }): JSX.Element {
  const paragraphs = tl(ABOUT.paragraphs, lang);

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section__head reveal">
          <span className="section__index">01</span>
          <h2>{t(ABOUT.heading, lang)}</h2>
          <span className="section__rule" />
        </div>

        <div className="about__prose">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="reveal about__paragraph"
              style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="facts">
          {FACTS.map((fact, i) => (
            <div
              key={fact.id}
              className="facts__item reveal"
              style={{ '--reveal-delay': `${(i + 2) * 60}ms` } as CSSProperties}
            >
              <dt className="facts__label mono">{t(fact.label, lang)}</dt>
              <dd className="facts__value">{t(fact.value, lang)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

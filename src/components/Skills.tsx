import type { CSSProperties } from 'react';

import { SKILLS, type Lang } from '../content';
import { t } from '../hooks/useLang';

import './Skills.css';

/** Section 03 — four glass groups laid out 7/5 · 5/7 so they never read as equal boxes. */
export default function Skills({ lang }: { lang: Lang }): JSX.Element {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section__head reveal">
          <span className="section__index">03</span>
          <h2>{t(SKILLS.heading, lang)}</h2>
          <span className="section__rule" />
        </div>

        <div className="skills__grid">
          {SKILLS.groups.map((group, i) => (
            <article
              key={group.id}
              className="skills__group glass glass--interactive reveal"
              style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties}
            >
              <header className="skills__head">
                <h3 className="skills__label mono">{t(group.label, lang)}</h3>
                <span className="skills__count mono">{group.items.length}</span>
              </header>

              <ul className="skills__items">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
